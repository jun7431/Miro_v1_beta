const TMAP_PEDESTRIAN_ENDPOINT = 'https://apis.openapi.sk.com/tmap/routes/pedestrian';
const SAFE_ERROR_FIELDS = [
  'error',
  'message',
  'errorMessage',
  'code',
  'status',
];

function sendJson(response, statusCode, payload) {
  response.status(statusCode);
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.send(JSON.stringify(payload));
}

function readRequestBody(request) {
  if (request.body && typeof request.body === 'object') {
    return Promise.resolve(request.body);
  }

  if (typeof request.body === 'string') {
    return Promise.resolve(request.body.trim() ? JSON.parse(request.body) : {});
  }

  return new Promise((resolve, reject) => {
    let rawBody = '';
    request.on('data', chunk => {
      rawBody += chunk;
    });
    request.on('end', () => {
      if (!rawBody.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch (error) {
        reject(new Error('Request body must be valid JSON'));
      }
    });
    request.on('error', reject);
  });
}

function parseCoordinate(value, fieldName) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${fieldName} must be a finite number`);
  }
  return parsed;
}

function parsePoint(value, fieldName) {
  if (!value || typeof value !== 'object') {
    throw new Error(`${fieldName} is required`);
  }

  return {
    lng: parseCoordinate(value.lng, `${fieldName}.lng`),
    lat: parseCoordinate(value.lat, `${fieldName}.lat`),
    name: safeName(value.name, fieldName === 'start' ? 'Start' : 'End'),
  };
}

function safeName(value, fallback) {
  const name = String(value || '').trim();
  return name || fallback;
}

function buildTmapBody(start, end) {
  return {
    startX: start.lng,
    startY: start.lat,
    endX: end.lng,
    endY: end.lat,
    startName: encodeURIComponent(start.name),
    endName: encodeURIComponent(end.name),
    reqCoordType: 'WGS84GEO',
    resCoordType: 'WGS84GEO',
    searchOption: '0',
    sort: 'index',
  };
}

function toFiniteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function appendCoordinate(path, coordinate) {
  if (!Array.isArray(coordinate) || coordinate.length < 2) return;

  const lng = toFiniteNumber(coordinate[0]);
  const lat = toFiniteNumber(coordinate[1]);
  if (lng === null || lat === null) return;

  const previous = path[path.length - 1];
  if (previous && previous[0] === lng && previous[1] === lat) return;
  path.push([lng, lat]);
}

function pickSafeUpstreamMessage(payload) {
  if (!payload || typeof payload !== 'object') return '';

  for (const field of SAFE_ERROR_FIELDS) {
    if (payload[field] !== undefined) return String(payload[field]);
  }

  if (payload.error && typeof payload.error === 'object') {
    for (const field of SAFE_ERROR_FIELDS) {
      if (payload.error[field] !== undefined) return String(payload.error[field]);
    }
  }

  return '';
}

function parseTmapPayload(payload) {
  const features = Array.isArray(payload?.features) ? payload.features : [];
  const path = [];
  let lineStringCount = 0;
  let summedDistanceMeters = 0;
  let summedDurationSeconds = 0;
  let totalDistanceMeters = null;
  let totalDurationSeconds = null;

  features.forEach(feature => {
    const properties = feature && typeof feature.properties === 'object' ? feature.properties : {};
    const featureTotalDistance = toFiniteNumber(properties.totalDistance);
    const featureTotalTime = toFiniteNumber(properties.totalTime);

    if (totalDistanceMeters === null && featureTotalDistance !== null) {
      totalDistanceMeters = featureTotalDistance;
    }

    if (totalDurationSeconds === null && featureTotalTime !== null) {
      totalDurationSeconds = featureTotalTime;
    }

    if (feature?.geometry?.type !== 'LineString') return;

    const coordinates = Array.isArray(feature.geometry.coordinates)
      ? feature.geometry.coordinates
      : [];
    lineStringCount += 1;
    coordinates.forEach(coordinate => appendCoordinate(path, coordinate));

    const segmentDistance = toFiniteNumber(properties.distance);
    const segmentTime = toFiniteNumber(properties.time);
    if (segmentDistance !== null) summedDistanceMeters += segmentDistance;
    if (segmentTime !== null) summedDurationSeconds += segmentTime;
  });

  if (path.length < 2) {
    throw new Error('TMAP pedestrian response did not include a usable LineString path');
  }

  return {
    ok: true,
    provider: 'tmap',
    mode: 'walk',
    distanceMeters: totalDistanceMeters !== null ? totalDistanceMeters : summedDistanceMeters,
    durationSeconds: totalDurationSeconds !== null ? totalDurationSeconds : summedDurationSeconds,
    path,
    rawSummary: {
      featureCount: features.length,
      lineStringCount,
    },
  };
}

module.exports = async function handler(request, response) {
  if (request.method && request.method !== 'POST') {
    sendJson(response, 405, { ok: false, error: 'Method not allowed', status: 405 });
    return;
  }

  const appKey = String(process.env.TMAP_APP_KEY || '').trim();
  if (!appKey) {
    sendJson(response, 500, {
      ok: false,
      error: 'TMAP pedestrian environment variable is not configured',
      status: 500,
    });
    return;
  }

  let start;
  let end;

  try {
    const body = await readRequestBody(request);
    start = parsePoint(body.start, 'start');
    end = parsePoint(body.end, 'end');
  } catch (error) {
    sendJson(response, 400, { ok: false, error: error.message, status: 400 });
    return;
  }

  const upstreamUrl = new URL(TMAP_PEDESTRIAN_ENDPOINT);
  upstreamUrl.searchParams.set('version', '1');

  try {
    const tmapResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        appKey,
      },
      body: JSON.stringify(buildTmapBody(start, end)),
    });
    const payload = await tmapResponse.json().catch(() => null);

    if (!tmapResponse.ok) {
      sendJson(response, tmapResponse.status, {
        ok: false,
        error: 'TMAP pedestrian request failed',
        status: tmapResponse.status,
        upstreamMessage: pickSafeUpstreamMessage(payload),
      });
      return;
    }

    sendJson(response, 200, parseTmapPayload(payload));
  } catch (error) {
    sendJson(response, 502, {
      ok: false,
      error: 'TMAP pedestrian response could not be processed',
      status: 502,
      upstreamMessage: error.message,
    });
  }
};
