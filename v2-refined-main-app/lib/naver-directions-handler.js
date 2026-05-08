const DIRECTIONS_ENDPOINT = 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving';
const MAX_DIRECTIONS_5_WAYPOINTS = 5;
const SAFE_ERROR_FIELDS = [
  'code',
  'message',
  'errorCode',
  'errorMessage',
  'details',
];

function sendJson(response, statusCode, payload) {
  response.status(statusCode);
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.send(JSON.stringify(payload));
}

function getQueryParam(request, name) {
  const queryValue = request.query && request.query[name];
  if (Array.isArray(queryValue)) return queryValue[0];
  if (queryValue !== undefined) return queryValue;

  const url = new URL(request.url || '', 'http://localhost');
  return url.searchParams.get(name);
}

function parseCoordinate(value, fieldName) {
  if (value === undefined || value === null || String(value).trim() === '') {
    throw new Error(`${fieldName} is required`);
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${fieldName} must be numeric`);
  }

  return parsed;
}

function parseWaypoints(value) {
  if (!value) return [];

  const rawWaypoints = String(value)
    .split('|')
    .map(item => item.trim())
    .filter(Boolean);

  return rawWaypoints.map((item, index) => {
    const [lng, lat, extra] = item.split(',').map(part => part.trim());
    if (extra !== undefined || !lng || !lat) {
      throw new Error(`waypoints[${index}] must use lng,lat format`);
    }

    return {
      lng: parseCoordinate(lng, `waypoints[${index}].lng`),
      lat: parseCoordinate(lat, `waypoints[${index}].lat`),
    };
  }).slice(0, MAX_DIRECTIONS_5_WAYPOINTS);
}

function formatDuration(durationMs) {
  const totalMinutes = Math.max(1, Math.round(durationMs / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (!hours) return `${totalMinutes} min`;
  if (!minutes) return `${hours}h`;
  return `${hours}h ${String(minutes).padStart(2, '0')}m`;
}

function formatDistance(distanceMeters) {
  if (distanceMeters < 1000) return `${Math.round(distanceMeters)} m`;
  return `${(distanceMeters / 1000).toFixed(1)} km`;
}

function coordinateParam(point) {
  return `${point.lng},${point.lat}`;
}

function buildNaverDirectionsUrl(start, goal, waypoints) {
  const url = new URL(DIRECTIONS_ENDPOINT);
  url.searchParams.set('start', coordinateParam(start));
  url.searchParams.set('goal', coordinateParam(goal));
  url.searchParams.set('option', 'trafast');

  if (waypoints.length) {
    url.searchParams.set('waypoints', waypoints.map(coordinateParam).join('|'));
  }

  return url;
}

function getNaverEnv() {
  return {
    keyId: String(
      process.env.NAVER_MAPS_NCP_KEY_ID ||
      process.env.VITE_NAVER_MAPS_NCP_KEY_ID ||
      ''
    ).trim(),
    secret: String(process.env.NAVER_MAPS_NCP_SECRET || '').trim(),
  };
}

function buildDiagnostics(directionsUrl, keyId, secret, waypoints) {
  return {
    endpointHost: directionsUrl.host,
    keyIdPresent: Boolean(keyId),
    keyIdLength: keyId.length,
    keyIdPrefix: keyId.slice(0, 3),
    secretPresent: Boolean(secret),
    secretLength: secret.length,
    requestHasWaypoints: waypoints.length > 0,
  };
}

function pickSafeUpstreamError(payload) {
  if (!payload || typeof payload !== 'object') {
    return {};
  }

  const result = {};
  SAFE_ERROR_FIELDS.forEach(field => {
    if (payload[field] !== undefined) {
      result[field] = payload[field];
    }
  });

  if (payload.error && typeof payload.error === 'object') {
    SAFE_ERROR_FIELDS.forEach(field => {
      if (payload.error[field] !== undefined && result[field] === undefined) {
        result[field] = payload.error[field];
      }
    });
  }

  return result;
}

function parseNaverDirectionsPayload(payload) {
  const route = payload && payload.route && payload.route.trafast && payload.route.trafast[0];
  if (!route) {
    throw new Error('Naver Directions trafast route was not returned');
  }

  const summary = route.summary || {};
  const distanceMeters = Number(summary.distance);
  const durationMs = Number(summary.duration);
  const path = Array.isArray(route.path)
    ? route.path
      .map(point => {
        if (!Array.isArray(point) || point.length < 2) return null;
        const lng = Number(point[0]);
        const lat = Number(point[1]);
        if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
        return { lng, lat };
      })
      .filter(Boolean)
    : [];

  if (!Number.isFinite(distanceMeters) || !Number.isFinite(durationMs)) {
    throw new Error('Naver Directions summary is missing distance or duration');
  }

  if (path.length < 2) {
    throw new Error('Naver Directions path is missing or too short');
  }

  return {
    ok: true,
    provider: 'naver',
    option: 'trafast',
    distanceMeters,
    durationMs,
    durationText: formatDuration(durationMs),
    distanceText: formatDistance(distanceMeters),
    path,
    rawSummary: summary,
  };
}

module.exports = async function handler(request, response) {
  if (request.method && request.method !== 'GET') {
    sendJson(response, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  let start;
  let goal;
  let waypoints;

  try {
    start = {
      lng: parseCoordinate(getQueryParam(request, 'startLng'), 'startLng'),
      lat: parseCoordinate(getQueryParam(request, 'startLat'), 'startLat'),
    };
    goal = {
      lng: parseCoordinate(getQueryParam(request, 'goalLng'), 'goalLng'),
      lat: parseCoordinate(getQueryParam(request, 'goalLat'), 'goalLat'),
    };
    waypoints = parseWaypoints(getQueryParam(request, 'waypoints'));
  } catch (error) {
    sendJson(response, 400, { ok: false, error: error.message });
    return;
  }

  const { keyId, secret } = getNaverEnv();
  const directionsUrl = buildNaverDirectionsUrl(start, goal, waypoints);
  const diagnostics = buildDiagnostics(directionsUrl, keyId, secret, waypoints);

  console.log(`Naver Directions upstream endpoint host: ${diagnostics.endpointHost}`);
  console.log(`Naver Directions env present: keyId ${diagnostics.keyIdPresent}, secret ${diagnostics.secretPresent}`);

  if (!keyId || !secret) {
    sendJson(response, 500, {
      ok: false,
      error: 'Naver Directions environment variables are not configured',
      diagnostics,
    });
    return;
  }

  try {
    const naverResponse = await fetch(directionsUrl, {
      method: 'GET',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': keyId,
        'X-NCP-APIGW-API-KEY': secret,
      },
    });
    const payload = await naverResponse.json().catch(() => null);
    console.log(`Naver Directions upstream status: ${naverResponse.status}`);

    if (!naverResponse.ok) {
      const upstreamError = pickSafeUpstreamError(payload);
      sendJson(response, naverResponse.status, {
        ok: false,
        error: 'Naver Directions request failed',
        status: naverResponse.status,
        upstreamErrorCode: upstreamError.code || upstreamError.errorCode || '',
        upstreamMessage: upstreamError.message || upstreamError.errorMessage || '',
        ...upstreamError,
        diagnostics,
      });
      return;
    }

    sendJson(response, 200, parseNaverDirectionsPayload(payload));
  } catch (error) {
    sendJson(response, 502, {
      ok: false,
      error: 'Naver Directions response could not be processed',
    });
  }
};
