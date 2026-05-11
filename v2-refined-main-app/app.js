// ========== Area-specific mock route data ==========
const ROUTES = {
  hongdae: {
    label: 'Hongdae',
    mapLabel: 'Hongdae · Yeonnam-dong, Mapo-gu',
    center: { lat: 37.5613, lng: 126.9254 },
    defaultMood: 'Local food',
    meta: { total: '2h 05m', walking: '18 min' },
    why: '홍대 메인 거리는 지금 붐빌 수 있어서, 연남 쪽으로 살짝 빼서 걷기 좋은 루트로 잡았어요. We skip the strip and route you through Yeonnam\'s lived-in lanes — backstreet BBQ, residential walk, ten-seat cafe, hidden record shop.',
    ask: {
      why: 'You picked quiet local food, so I skipped the main Hongdae strip and used Yeonnam\'s calmer lanes. The four stops stay walkable while still feeling like places neighbors actually use.',
      crowd: 'Done — I would keep this on Yeonnam side streets and avoid Hongdae\'s main club/shop strip.',
      cafe: 'I can swap the record stop for another tiny Yeonnam cafe if you want this to lean more coffee-led.',
    },
    stops: [
      {
        num: 1,
        name: 'Yeonnam Galmaegisal',
        type: 'Backstreet BBQ · Korean',
        stay: 50,
        walk: 0,
        coords: { lat: 37.56225, lng: 126.92396 },
        why: 'Locals-only spot tucked behind the main drag. Skin-on pork belly, three banchan, no English menu.',
        next: 'Walk 6 min west into the residential lanes →',
        tags: ['🍴 locals', '🤫 quiet', '💸 ₩12k'],
      },
      {
        num: 2,
        name: 'Yeonnam-dong Backstreets',
        type: 'Quiet residential walk',
        stay: 25,
        walk: 6,
        coords: { lat: 37.56136, lng: 126.92612 },
        why: 'A working neighborhood — single-story houses, hand-painted shutters, neighborhood cats. Phone away.',
        next: 'Cut through Yeontral Park — 5 min →',
        tags: ['🌳 green', '🤫 quiet', '🚶 easy'],
      },
      {
        num: 3,
        name: 'Cafe Slow Steps',
        type: 'Tiny dessert cafe · 10 seats',
        stay: 30,
        walk: 5,
        coords: { lat: 37.56048, lng: 126.92878 },
        why: 'No Instagram tag. One seasonal dessert. Owner roasts on-site every morning.',
        next: 'One last hidden stop, 7 min →',
        tags: ['☕ roast', '💸 ₩8k', '🪑 10 seats'],
      },
      {
        num: 4,
        name: 'Gimbap Records',
        type: 'Hidden record shop',
        stay: 15,
        walk: 7,
        coords: { lat: 37.55819, lng: 126.92585 },
        why: 'A vinyl shop the size of a closet, run by a 90s indie-club veteran. Free to browse.',
        next: 'Route complete · subway 4 min away',
        tags: ['🎵 indie', '🗝️ hidden', '🆓 browse'],
      },
    ],
  },
  seongsu: {
    label: 'Seongsu',
    mapLabel: 'Seongsu · Seoul Forest + Ttukseom',
    center: { lat: 37.5447, lng: 127.0546 },
    defaultMood: 'Cafes',
    meta: { total: '2h 10m', walking: '20 min' },
    why: '성수는 한 번에 많이 넣으면 피곤해져서, 서울숲 가장자리에서 시작해 디자인 블록과 카페 골목, 저녁 골목으로 자연스럽게 이어지게 잡았어요. It keeps the warehouse-cafe texture without turning the route into a shopping crawl.',
    ask: {
      why: 'Seongsu works best as a light sequence: green edge, design block, cafe lane, then dinner. The route keeps you near Seoul Forest and Ttukseom instead of bouncing across the neighborhood.',
      crowd: 'Done — I would keep you one block off the largest cafe queues and use side streets near Ttukseom.',
      cafe: 'This route already leans cafe-forward; I can make the dinner stop a bakery-cafe if you want a softer finish.',
    },
    stops: [
      {
        num: 1,
        name: 'Seoul Forest East Gate Walk',
        type: 'Green walk · soft start',
        stay: 25,
        walk: 0,
        coords: { lat: 37.54418, lng: 127.04361 },
        why: 'A low-pressure start that gives the route space before you step into the busier cafe blocks.',
        next: 'Walk 7 min toward the design stores →',
        tags: ['🌳 green', '🚶 easy', '📍 anchor'],
      },
      {
        num: 2,
        name: 'LCDC Seoul Block',
        type: 'Design retail · browse',
        stay: 35,
        walk: 7,
        coords: { lat: 37.54473, lng: 127.05418 },
        why: 'A compact design stop with enough to browse, but not so much that it traps the whole route.',
        next: 'Drift 5 min north toward Ttukseom →',
        tags: ['🧩 design', '🛍️ browse', '📷 visual'],
      },
      {
        num: 3,
        name: 'Ttukseom Cafe Row',
        type: 'Converted-space cafes',
        stay: 40,
        walk: 5,
        coords: { lat: 37.54718, lng: 127.05546 },
        why: 'Several cafe backups sit within one block, so you do not need to commit to a single queue.',
        next: 'Cut back 8 min into the dinner lanes →',
        tags: ['☕ cafes', '🏭 warehouse', '🪑 backup'],
      },
      {
        num: 4,
        name: 'Seongsu Dinner Alley',
        type: 'Casual dinner · local',
        stay: 30,
        walk: 8,
        coords: { lat: 37.54338, lng: 127.05892 },
        why: 'A practical food close: enough options for a real meal without leaving the area.',
        next: 'Route complete · Ttukseom Station nearby',
        tags: ['🍜 dinner', '🌙 evening', '🚇 close'],
      },
    ],
  },
  anguk: {
    label: 'Anguk',
    mapLabel: 'Anguk · Bukchon + Insadong',
    center: { lat: 37.5783, lng: 126.9853 },
    defaultMood: 'Hidden spots',
    meta: { total: '2h 20m', walking: '22 min' },
    why: '안국은 사진 스팟만 따라가면 금방 지치니까, 북촌의 조용한 한옥길에서 시작해 미술관, 찻집, 익선동 골목으로 천천히 내려오게 했어요. The route keeps the historic mood but gives you real pauses.',
    ask: {
      why: 'Anguk can become a photo checklist fast, so this route spaces out the hanok lanes with a museum pause, tea, and an easy Ikseon-dong close.',
      crowd: 'Done — I would avoid the steepest Bukchon photo lane and keep you closer to quieter side streets.',
      cafe: 'For Anguk, I would make the tea house the main rest stop instead of adding another generic cafe.',
    },
    stops: [
      {
        num: 1,
        name: 'Bukchon Quiet Hanok Lane',
        type: 'Historic walk · low-noise',
        stay: 30,
        walk: 0,
        coords: { lat: 37.58274, lng: 126.98484 },
        why: 'A slower hanok lane that gives you the historic texture without starting in the densest photo crowd.',
        next: 'Walk 8 min down toward Samcheong →',
        tags: ['🏯 hanok', '🤫 quiet', '📷 gentle'],
      },
      {
        num: 2,
        name: 'MMCA Seoul Garden Edge',
        type: 'Museum area · design pause',
        stay: 40,
        walk: 8,
        coords: { lat: 37.57961, lng: 126.98047 },
        why: 'A culture anchor that lets the route breathe before moving back into narrower lanes.',
        next: 'Walk 6 min toward Insadong →',
        tags: ['🖼️ art', '🌿 courtyard', '🧭 anchor'],
      },
      {
        num: 3,
        name: 'Insadong Tea House Pause',
        type: 'Tea + rest',
        stay: 35,
        walk: 6,
        coords: { lat: 37.57492, lng: 126.98538 },
        why: 'A warm recovery stop after the hanok and gallery stretch, better matched to Anguk than another coffee queue.',
        next: 'Continue 8 min to a livelier close →',
        tags: ['🍵 tea', '🪑 rest', '💬 calm'],
      },
      {
        num: 4,
        name: 'Ikseon-dong Hanok Alley',
        type: 'Food + small lanes',
        stay: 35,
        walk: 8,
        coords: { lat: 37.57357, lng: 126.98979 },
        why: 'A livelier finish that still keeps the old-Seoul lane feeling, with easy dinner and dessert backups.',
        next: 'Route complete · Jongno 3-ga nearby',
        tags: ['🍡 snacks', '🌙 lively', '🚇 close'],
      },
    ],
  },
  euljiro: {
    label: 'Euljiro',
    mapLabel: 'Euljiro · Cheonggyecheon + print alleys',
    center: { lat: 37.5668, lng: 126.9931 },
    defaultMood: 'Night energy',
    meta: { total: '1h 55m', walking: '16 min' },
    why: '을지로는 큰길보다 골목의 밀도가 매력이라, 청계천에서 방향을 잡고 인쇄 골목, 노가리 골목, 세운상가 쪽으로 짧게 이어지게 했어요. It keeps the vintage night texture compact and walkable.',
    ask: {
      why: 'Euljiro rewards a compact route. This starts with the stream for orientation, then moves through print alleys, food/drink energy, and a rooftop-style city view.',
      crowd: 'Done — I would keep you off the most packed Nogari lane edges and use parallel print alleys.',
      cafe: 'For Euljiro, I would swap the night alley for a retro coffee stop if you want a daytime version.',
    },
    stops: [
      {
        num: 1,
        name: 'Cheonggyecheon Stream Start',
        type: 'Urban walk · orientation',
        stay: 20,
        walk: 0,
        coords: { lat: 37.56812, lng: 126.99083 },
        why: 'A clear first line through central Seoul before entering the denser workshop blocks.',
        next: 'Slip 4 min south into the print alleys →',
        tags: ['💧 stream', '🧭 easy', '🚶 flat'],
      },
      {
        num: 2,
        name: 'Euljiro Print Alley',
        type: 'Old Seoul texture',
        stay: 25,
        walk: 4,
        coords: { lat: 37.56668, lng: 126.99191 },
        why: 'Working-city signs, shutters, and print shops give the area its real visual identity.',
        next: 'Walk 5 min toward the food lights →',
        tags: ['🖨️ print', '📷 texture', '🗝️ hidden'],
      },
      {
        num: 3,
        name: 'Nogari Alley Edge',
        type: 'Beer street · lively',
        stay: 35,
        walk: 5,
        coords: { lat: 37.56535, lng: 126.99123 },
        why: 'You get the famous Euljiro night energy while staying at the edge, not trapped in the busiest center.',
        next: 'Walk 7 min toward Sewoon →',
        tags: ['🍻 night', '🍢 snack', '🌃 lively'],
      },
      {
        num: 4,
        name: 'Sewoon Rooftop Walk',
        type: 'Retro city view',
        stay: 25,
        walk: 7,
        coords: { lat: 37.57007, lng: 126.99577 },
        why: 'A distinctive finish with rooftops, old electronics blocks, and a little distance from the crowd.',
        next: 'Route complete · Euljiro 3-ga nearby',
        tags: ['🏙️ view', '🔌 retro', '🚇 close'],
      },
    ],
  },
  gangnam: {
    label: 'Gangnam',
    mapLabel: 'Gangnam · Station + Sinnonhyeon',
    center: { lat: 37.5011, lng: 127.0278 },
    defaultMood: 'Local food',
    meta: { total: '2h 00m', walking: '17 min' },
    why: '강남은 큰길 위주로 움직이면 너무 바쁘게 느껴져서, 역 뒤쪽 식당 골목에서 시작해 신논현 카페와 작은 전시/디저트 포인트로 이어지게 했어요. It keeps the polished area useful without sending you into only malls and chains.',
    ask: {
      why: 'Gangnam can feel too broad and chain-heavy, so this route stays around the station and Sinnonhyeon backstreets with one food anchor, one cafe pause, and one polished close.',
      crowd: 'Done — I would avoid the main Gangnam-daero sidewalk and use backstreets behind the station.',
      cafe: 'I can make the Sinnonhyeon cafe the longer anchor and shorten the first food stop.',
    },
    stops: [
      {
        num: 1,
        name: 'Gangnam Station Noodle Counter',
        type: 'Quick local meal',
        stay: 35,
        walk: 0,
        coords: { lat: 37.49952, lng: 127.02723 },
        why: 'A practical food-first anchor behind the station, less polished than the main-road chains.',
        next: 'Walk 5 min north off the main road →',
        tags: ['🍜 food', '💸 ₩10k', '🚇 close'],
      },
      {
        num: 2,
        name: 'Sinnonhyeon Backstreet Cafe',
        type: 'Quiet cafe · reset',
        stay: 35,
        walk: 5,
        coords: { lat: 37.50419, lng: 127.02548 },
        why: 'A calmer pause just far enough from Gangnam-daero to feel like a real break.',
        next: 'Walk 4 min toward a small visual stop →',
        tags: ['☕ cafe', '🤫 quieter', '🪑 rest'],
      },
      {
        num: 3,
        name: 'Teheran Pocket Gallery',
        type: 'Small exhibit · design',
        stay: 25,
        walk: 4,
        coords: { lat: 37.50218, lng: 127.03163 },
        why: 'A compact visual stop that gives the route more shape than food-and-cafe only.',
        next: 'Walk 8 min toward the dessert close →',
        tags: ['🖼️ design', '📍 compact', '💼 polished'],
      },
      {
        num: 4,
        name: 'Gangnam Dessert Bar',
        type: 'Dessert · easy finish',
        stay: 30,
        walk: 8,
        coords: { lat: 37.49789, lng: 127.02986 },
        why: 'A clean finish near transit, useful if you want one more stop without extending the route.',
        next: 'Route complete · Gangnam Station nearby',
        tags: ['🍰 dessert', '🌙 evening', '🚇 close'],
      },
    ],
  },
};

// ========== Curated Naver bookmark place data ==========
const CURATED_PLACES_URL = 'data/miro_places.json';
const MOCK_ROUTES_ENABLED = new URLSearchParams(window.location.search).get('mock') === '1';

const AREA_FILTERS = {
  hongdae: {
    label: 'Hongdae',
    mapLabel: 'Hongdae · curated saved places',
    center: { lat: 37.5613, lng: 126.9254 },
    terms: ['홍대', '연남', '서교', '동교', '합정', '상수', '망원', '마포구'],
    radiusKm: 4,
  },
  seongsu: {
    label: 'Seongsu',
    mapLabel: 'Seongsu · curated saved places',
    center: { lat: 37.5447, lng: 127.0546 },
    terms: ['성수', '서울숲', '뚝섬', '성동구'],
    radiusKm: 4,
  },
  anguk: {
    label: 'Anguk',
    mapLabel: 'Anguk · curated saved places',
    center: { lat: 37.5783, lng: 126.9853 },
    terms: ['안국', '북촌', '삼청', '인사', '익선', '운니', '계동', '가회', '종로구'],
    radiusKm: 4,
  },
  euljiro: {
    label: 'Euljiro',
    mapLabel: 'Euljiro · curated saved places',
    center: { lat: 37.5668, lng: 126.9931 },
    terms: ['을지로', '충무로', '명동', '청계', '종로', '중구'],
    radiusKm: 4,
  },
  gangnam: {
    label: 'Gangnam',
    mapLabel: 'Gangnam · curated saved places',
    center: { lat: 37.5011, lng: 127.0278 },
    terms: ['강남', '역삼', '신논현', '논현', '신사', '압구정', '잠원', '강남구', '서초구'],
    radiusKm: 5,
  },
};

const ROUTE_TEMPLATES = {
  balanced: ['see', 'eat', 'walk', 'cafe'],
  'food-focused': ['eat', 'walk', 'cafe', 'eat'],
  'cafe-slow-walk': ['cafe', 'walk', 'see', 'cafe'],
  'culture-local-streets': ['see', 'walk', 'cafe', 'shop'],
  'shopping-browsing': ['shop', 'cafe', 'walk', 'eat'],
  'do-something-fun': ['activity', 'cafe', 'walk', 'eat'],
  'night-energy': ['eat', 'night', 'walk', 'eat'],
};

const MOOD_TO_ROUTE_MODE = {
  'local food': 'food-focused',
  'quiet walk': 'cafe-slow-walk',
  cafes: 'cafe-slow-walk',
  'night energy': 'night-energy',
  'hidden spots': 'culture-local-streets',
};

const MIRO_CATEGORY_LABELS = {
  eat: 'Food',
  cafe: 'Cafe',
  see: 'See',
  walk: 'Walk',
  shop: 'Shop',
  activity: 'Activity',
  night: 'Night',
  practical: 'Practical',
  unknown: 'Saved place',
};

const CATEGORY_STAY_MINUTES = {
  eat: 45,
  cafe: 35,
  see: 35,
  walk: 25,
  shop: 30,
  activity: 45,
  night: 45,
  practical: 20,
  unknown: 25,
};

const curatedPlaceState = {
  loaded: false,
  failed: false,
  meta: null,
  places: [],
};

function normalizeCuratedPlacesPayload(payload) {
  const rawPlaces = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.places)
      ? payload.places
      : [];

  const places = rawPlaces
    .filter(place => place && typeof place === 'object')
    .map(place => normalizeRealPlace(place));

  return {
    meta: payload && !Array.isArray(payload) && payload.meta ? payload.meta : null,
    places,
  };
}

function normalizeRealPlace(place) {
  const sourceFile = String(place.sourceFile || '').trim();
  const source = String(place.source || 'naver').trim() || 'naver';
  const categoryCode = String(place.categoryCode || '').trim();
  const categoryName = String(place.categoryName || '').trim();

  return {
    ...place,
    id: String(place.id || ''),
    placeId: String(place.placeId || ''),
    name: String(place.name || place.displayName || '').trim(),
    lng: numberOrNull(place.lng),
    lat: numberOrNull(place.lat),
    address: String(place.address || ''),
    categoryCode,
    categoryName,
    miroCategory: inferMiroCategory({ ...place, categoryCode, categoryName }),
    source,
    sourceFile,
    sourceKind: String(place.sourceKind || source || 'naver'),
    sourceList: String(place.sourceList || sourceFile),
    sourceType: String(place.sourceType || source),
    sourcePriority: Number.isFinite(Number(place.sourcePriority)) ? Number(place.sourcePriority) : 0,
    available: typeof place.available === 'boolean' ? place.available : null,
    isMatched: typeof place.isMatched === 'boolean' ? place.isMatched : null,
  };
}

function numberOrNull(value) {
  if (value === undefined || value === null || String(value).trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function inferMiroCategory(place) {
  const code = String(place.miroCategory || place.categoryCode || '').toUpperCase();
  const name = String(place.categoryName || '').toLowerCase();

  if (place.miroCategory && MIRO_CATEGORY_LABELS[place.miroCategory]) return place.miroCategory;
  if (code.includes('CAFE') || name.includes('카페') || name.includes('coffee')) return 'cafe';
  if (code.includes('DINING') || code.includes('FOOD') || code.includes('RESTAURANT') || name.includes('음식') || name.includes('맛집')) return 'eat';
  if (code.includes('BAR') || name.includes('바') || name.includes('술') || name.includes('pub')) return 'night';
  if (code.includes('SHOP') || name.includes('쇼핑') || name.includes('상점')) return 'shop';
  if (code.includes('LIFE_CULTURE') || code.includes('ACTIVITY') || name.includes('생활') || name.includes('문화')) return 'activity';
  if (name.includes('전시') || name.includes('미술') || name.includes('박물')) return 'see';
  return 'unknown';
}

function loadCuratedPlaces() {
  if (curatedPlaceState.loaded) {
    return Promise.resolve(curatedPlaceState.places);
  }

  if (typeof fetch !== 'function') {
    console.warn('Miro real places dataset could not be loaded because fetch is unavailable.');
    curatedPlaceState.loaded = true;
    curatedPlaceState.failed = true;
    return Promise.resolve([]);
  }

  console.log(`Miro real places dataset URL: ${CURATED_PLACES_URL}`);
  return fetch(CURATED_PLACES_URL, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) {
        throw new Error(`miro_places.json returned ${response.status}`);
      }
      return response.json();
    })
    .then(payload => {
      const normalized = normalizeCuratedPlacesPayload(payload);
      curatedPlaceState.loaded = true;
      curatedPlaceState.failed = false;
      curatedPlaceState.meta = normalized.meta;
      curatedPlaceState.places = normalized.places;
      console.log(`Miro real places loaded: ${normalized.places.length}`);
      return normalized.places;
    })
    .catch(error => {
      curatedPlaceState.loaded = true;
      curatedPlaceState.failed = true;
      curatedPlaceState.meta = null;
      curatedPlaceState.places = [];
      console.warn('Miro real places dataset failed to load; not using mock fallback.', error);
      return [];
    });
}

function ensureRealPlacesLoaded() {
  if (!realPlacesLoadPromise) {
    realPlacesLoadPromise = loadCuratedPlaces();
  }
  return realPlacesLoadPromise;
}

function hasValidCoords(place) {
  if (!place) return false;
  if (place.lat === undefined || place.lat === null || place.lat === '') return false;
  if (place.lng === undefined || place.lng === null || place.lng === '') return false;
  return Number.isFinite(Number(place.lat)) && Number.isFinite(Number(place.lng));
}

function getRouteMode(mood) {
  return MOOD_TO_ROUTE_MODE[String(mood || '').trim().toLowerCase()] || 'balanced';
}

function getAreaConfig(routeKey) {
  return AREA_FILTERS[routeKey] || AREA_FILTERS.hongdae;
}

function addressMatchesArea(place, areaConfig) {
  const address = String(place.address || '');
  return areaConfig.terms.some(term => address.includes(term));
}

function distanceKm(a, b) {
  if (!hasValidCoords(a) || !hasValidCoords(b)) return Infinity;
  const earthRadiusKm = 6371;
  const latDelta = toRadians(Number(b.lat) - Number(a.lat));
  const lngDelta = toRadians(Number(b.lng) - Number(a.lng));
  const lat1 = toRadians(Number(a.lat));
  const lat2 = toRadians(Number(b.lat));
  const h =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function toRadians(value) {
  return value * Math.PI / 180;
}

function getAreaCandidates(places, areaConfig) {
  const usablePlaces = places.filter(place => place.name && hasValidCoords(place));
  const addressMatches = usablePlaces.filter(place => addressMatchesArea(place, areaConfig));
  const nearbyMatches = usablePlaces.filter(place => (
    distanceKm(place, areaConfig.center) <= areaConfig.radiusKm
  ));
  const merged = dedupeRuntimePlaces([...addressMatches, ...nearbyMatches]);
  return merged.length ? merged : usablePlaces;
}

function dedupeRuntimePlaces(places) {
  const byKey = new Map();
  places.forEach(place => {
    const key = getRuntimePlaceKey(place);
    if (!byKey.has(key)) byKey.set(key, place);
  });
  return Array.from(byKey.values());
}

function getRuntimePlaceKey(place) {
  if (place.placeId) return `place:${place.placeId}`;
  if (place.id) return `bookmark:${place.id}`;
  return `name-address:${place.name}|${place.address}`;
}

function sourceListMatchesMode(sourceList, mode) {
  const value = String(sourceList || '').toLowerCase();
  if (mode === 'food-focused') return value.includes('맛집') || value.includes('식당') || value.includes('food');
  if (mode === 'cafe-slow-walk') return value.includes('카페') || value.includes('커피') || value.includes('cafe') || value.includes('coffee');
  if (mode === 'night-energy') return value.includes('술') || value.includes('bar') || value.includes('night');
  if (mode === 'culture-local-streets') return value.includes('데이트') || value.includes('전시') || value.includes('문화');
  if (mode === 'shopping-browsing') return value.includes('쇼핑') || value.includes('shop');
  if (mode === 'do-something-fun') return value.includes('체험') || value.includes('activity');
  return false;
}

function getRouteTemplate(mode, refinementKey = null) {
  return REFINEMENT_TEMPLATES[refinementKey] || ROUTE_TEMPLATES[mode] || ROUTE_TEMPLATES.balanced;
}

function getPlaceSearchText(place) {
  return [
    place.name,
    place.displayName,
    place.categoryName,
    place.categoryCode,
    place.address,
    place.sourceList,
    place.sourceFile,
    place.sourceType,
  ].filter(Boolean).join(' ').toLowerCase();
}

function textHasAnyTerm(text, terms) {
  return terms.some(term => text.includes(term));
}

function getOpenNowValue(place) {
  for (const path of OPEN_NOW_FIELD_PATHS) {
    let value = place;
    for (const key of path) {
      value = value && value[key];
    }
    if (typeof value === 'boolean') return value;
  }
  return null;
}

function hasOpenNowDataForCandidates(candidates) {
  return candidates.some(place => getOpenNowValue(place) !== null);
}

function filterCandidatesForRefinement(candidates, refinementKey) {
  if (refinementKey === 'open') {
    return candidates.filter(place => getOpenNowValue(place) === true);
  }
  return candidates;
}

function getRefinementScore(place, context) {
  const refinementKey = context.refinementKey;
  if (!refinementKey) return 0;

  const category = place.miroCategory || 'unknown';
  const text = getPlaceSearchText(place);
  let score = 0;

  if (refinementKey === 'walk') {
    const previousDistance = context.previousPlace ? distanceKm(place, context.previousPlace) : null;
    const centerDistance = distanceKm(place, context.areaConfig.center);
    if (Number.isFinite(previousDistance)) score -= Math.min(previousDistance * 35, 45);
    if (Number.isFinite(centerDistance)) score -= Math.min(centerDistance * 7, 28);
    if (['walk', 'cafe', 'eat'].includes(category)) score += 8;
  }

  if (refinementKey === 'local') {
    if (textHasAnyTerm(text, LOCAL_TERMS)) score += 24;
    if (place.sourcePriority > 0) score += Math.min(Number(place.sourcePriority), 12);
    if (place.isMatched === true) score += 8;
    if (category !== 'night') score += 5;
  }

  if (refinementKey === 'cheap') {
    if (['walk', 'cafe', 'see', 'shop', 'practical'].includes(category)) score += 18;
    if (textHasAnyTerm(text, BUDGET_CATEGORY_NAMES)) score += 20;
    if (['night', 'activity'].includes(category) || textHasAnyTerm(text, PREMIUM_CATEGORY_NAMES)) score -= 24;
  }

  if (refinementKey === 'cafe') {
    if (category === 'cafe') score += 36;
    if (text.includes('카페') || text.includes('coffee') || text.includes('cafe')) score += 16;
  }

  if (refinementKey === 'quiet') {
    if (['walk', 'cafe', 'see', 'shop'].includes(category)) score += 14;
    if (textHasAnyTerm(text, QUIET_TERMS)) score += 20;
    if (category === 'night' || textHasAnyTerm(text, TOURIST_HEAVY_TERMS)) score -= 28;
  }

  return score;
}

function scorePlace(place, context) {
  let score = 0;
  const category = place.miroCategory || 'unknown';

  if (context.targetCategory && category === context.targetCategory) score += 30;
  if (addressMatchesArea(place, context.areaConfig)) score += 20;
  if (sourceListMatchesMode(place.sourceList, context.mode)) score += 15;
  if (place.available === true) score += 10;
  if (place.isMatched === true) score += 10;
  if (hasValidCoords(place)) score += 10;
  score += Number(place.sourcePriority || 0);

  if (place.available === false) score -= 20;
  if (category === 'unknown') score -= 10;

  const categoryCount = context.categoryCounts[category] || 0;
  if (context.mode !== 'food-focused' && categoryCount > 0) {
    score -= categoryCount * 12;
  }

  const distanceFromArea = distanceKm(place, context.areaConfig.center);
  if (Number.isFinite(distanceFromArea)) {
    score -= Math.min(distanceFromArea * 2, 18);
  }

  score += getRefinementScore(place, context);

  return score;
}

function selectBestPlace(candidates, context, selectedKeys) {
  let best = null;
  let bestScore = -Infinity;

  candidates.forEach(place => {
    const key = getRuntimePlaceKey(place);
    if (selectedKeys.has(key)) return;
    const score = scorePlace(place, context);
    if (score > bestScore) {
      best = place;
      bestScore = score;
    }
  });

  return best;
}

function buildCuratedRoute(routeKey, mood, refinementKey = null) {
  const places = curatedPlaceState.places;
  if (!places.length) return null;

  const areaConfig = getAreaConfig(routeKey);
  const mode = getRouteMode(mood);
  const template = getRouteTemplate(mode, refinementKey);
  const candidates = filterCandidatesForRefinement(getAreaCandidates(places, areaConfig), refinementKey);
  if (!candidates.length) return null;

  const selected = [];
  const selectedKeys = new Set();
  const categoryCounts = {};
  const maxStops = Math.min(refinementKey === 'walk' ? 3 : 4, candidates.length);

  template.slice(0, maxStops).forEach(targetCategory => {
    const exactMatches = candidates.filter(place => place.miroCategory === targetCategory);
    const pool = exactMatches.length ? exactMatches : candidates;
    const place = selectBestPlace(pool, {
      areaConfig,
      mode,
      targetCategory,
      categoryCounts,
      refinementKey,
      previousPlace: selected[selected.length - 1] || null,
    }, selectedKeys);

    if (!place) return;
    selected.push(place);
    selectedKeys.add(getRuntimePlaceKey(place));
    categoryCounts[place.miroCategory] = (categoryCounts[place.miroCategory] || 0) + 1;
  });

  while (selected.length < maxStops) {
    const place = selectBestPlace(candidates, {
      areaConfig,
      mode,
      targetCategory: null,
      categoryCounts,
      refinementKey,
      previousPlace: selected[selected.length - 1] || null,
    }, selectedKeys);
    if (!place) break;
    selected.push(place);
    selectedKeys.add(getRuntimePlaceKey(place));
    categoryCounts[place.miroCategory] = (categoryCounts[place.miroCategory] || 0) + 1;
  }

  if (!selected.length) return null;

  const stops = selected.map((place, index) => placeToRouteStop(place, index, selected[index - 1], selected.length));
  const walkingMinutes = stops.reduce((sum, stop) => sum + Number(stop.walk || 0), 0);
  const stayMinutes = stops.reduce((sum, stop) => sum + Number(stop.stay || 0), 0);

  return {
    label: areaConfig.label,
    mapLabel: areaConfig.mapLabel,
    center: getRouteCenter(stops) || areaConfig.center,
    defaultMood: state.mood,
    meta: {
      total: formatMinutes(stayMinutes + walkingMinutes),
      walking: `${walkingMinutes} min`,
    },
    why: buildRouteWhy(areaConfig.label, refinementKey),
    ask: {
      why: `This route uses processed Naver place data first, then ranks places for ${areaConfig.label} and your selected mood.`,
      crowd: 'I can prefer quieter categories and nearby side-street matches, but this static version does not check live crowd levels.',
      cafe: 'I can prioritize cafe-category saved places when the curated list has enough nearby candidates.',
    },
    sourceKind: 'processed',
    sourceLabel: 'Real Naver places',
    mode,
    refinementKey,
    stops,
  };
}

function buildRouteWhy(areaLabel, refinementKey = null) {
  const base = `Built from the processed Naver place dataset for ${areaLabel}. Stops are ranked by category fit, area match, availability, and saved-list priority.`;
  if (!refinementKey) return base;
  const refinements = {
    walk: ' This version adds a compactness preference using stop coordinates.',
    local: ' This version gives extra weight to local, hidden, and saved-list signals.',
    cheap: ' This version leans toward budget-friendly categories without estimating prices.',
    cafe: ' This version gives extra weight to cafe-category places.',
    quiet: ' This version de-prioritizes tourist-heavy and nightlife-heavy signals where identifiable.',
    open: ' This version only uses places with an explicit open-now field marked true.',
  };
  return `${base}${refinements[refinementKey] || ''}`;
}

function placeToRouteStop(place, index, previousPlace, totalStops = 4) {
  const category = place.miroCategory || 'unknown';
  const categoryLabel = place.categoryName || MIRO_CATEGORY_LABELS[category] || 'Saved place';
  const walk = index === 0 ? 0 : estimateWalkMinutes(previousPlace, place);
  const addressTag = getShortAddress(place.address);
  const sourceTag = place.sourceFile
    ? place.sourceFile.replace(/\.json$/i, '')
    : 'Naver saved place';

  return {
    num: index + 1,
    name: place.displayName || place.name,
    type: place.address ? `${categoryLabel} · ${place.address}` : categoryLabel,
    stay: CATEGORY_STAY_MINUTES[category] || CATEGORY_STAY_MINUTES.unknown,
    walk,
    coords: { lat: Number(place.lat), lng: Number(place.lng) },
    why: buildPlaceWhy(place, sourceTag),
    next: index === totalStops - 1 ? 'Route complete' : 'Continue to the next saved place',
    tags: [sourceTag, categoryLabel, addressTag].filter(Boolean),
    place,
  };
}

function buildPlaceWhy(place, sourceTag) {
  const category = place.categoryName || MIRO_CATEGORY_LABELS[place.miroCategory] || 'saved place';
  const status = place.available === false ? ' It is marked unavailable in the source export.' : '';
  return `${sourceTag} · ${category}${place.address ? ` near ${place.address}` : ''}.${status}`;
}

function getShortAddress(address) {
  const parts = String(address || '').split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).join(' ');
}

function estimateWalkMinutes(previousPlace, place) {
  const km = distanceKm(previousPlace, place);
  if (!Number.isFinite(km)) return 6;
  return Math.max(3, Math.min(18, Math.round(km * 13)));
}

function getRouteCenter(stops) {
  const validStops = stops.filter(stop => hasValidCoords(stop.coords));
  if (!validStops.length) return null;
  return {
    lat: validStops.reduce((sum, stop) => sum + stop.coords.lat, 0) / validStops.length,
    lng: validStops.reduce((sum, stop) => sum + stop.coords.lng, 0) / validStops.length,
  };
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${String(remainder).padStart(2, '0')}m` : `${hours}h`;
}

function getStopsWithCoords() {
  if (!currentRoute || !Array.isArray(currentRoute.stops)) return [];
  return currentRoute.stops
    .map((stop, index) => ({ stop, index }))
    .filter(item => hasValidCoords(item.stop.coords));
}

function buildMockFallbackRoute(routeKey) {
  const fallback = ROUTES[routeKey] || ROUTES.hongdae;
  console.warn('Miro route source: mock');
  return {
    ...fallback,
    sourceKind: 'mock',
    sourceLabel: 'Prototype fallback',
  };
}

function buildEmptyRealRoute(routeKey, message) {
  const areaConfig = getAreaConfig(routeKey);
  return {
    label: areaConfig.label,
    mapLabel: areaConfig.mapLabel,
    center: areaConfig.center,
    defaultMood: state.mood,
    meta: {
      total: '0 min',
      walking: '0 min',
    },
    why: message,
    ask: {
      why: message,
      crowd: message,
      cafe: message,
    },
    sourceKind: 'processed',
    sourceLabel: 'Real Naver places',
    mode: getRouteMode(state.mood),
    stops: [],
  };
}

function resolveRouteForCurrentSelection(routeKey, refinementKey = state.activeRefinement) {
  const realRoute = buildCuratedRoute(routeKey, state.mood, refinementKey);
  if (realRoute) {
    console.log('Miro route source: real');
    return realRoute;
  }

  if (MOCK_ROUTES_ENABLED) {
    return buildMockFallbackRoute(routeKey);
  }

  console.warn('No matching real places found; not using mock fallback');

  if (curatedPlaceState.failed) {
    return buildEmptyRealRoute(routeKey, 'Real place data could not be loaded. Check that the processed places file is deployed.');
  }

  if (!curatedPlaceState.places.length) {
    return buildEmptyRealRoute(routeKey, 'No real places are loaded yet.');
  }

  return buildEmptyRealRoute(routeKey, 'No matching real places found for this area and mood.');
}

const AREA_KEY_BY_LABEL = Object.values(ROUTES).reduce((acc, route) => {
  acc[route.label.toLowerCase()] = route.label.toLowerCase();
  return acc;
}, {});

const LOADING_STEPS = [
  'Reading the streets of {area}',
  'Asking who\'s actually there',
  'Skipping the busy main strip',
  'Picking 4 stops that fit your time',
  'Drawing your route',
];

const REFINE_TEXTS = {
  walk: { applied: 'Refined for a more compact route.', undo: 'Removed the compact-route refinement.' },
  local: { applied: 'Refined toward local and saved-list signals.', undo: 'Removed the local-first refinement.' },
  cheap: { applied: 'Refined toward budget-friendly categories.', undo: 'Removed the budget-friendly refinement.' },
  cafe: { applied: 'Refined toward more cafe stops.', undo: 'Removed the cafe-forward refinement.' },
  quiet: { applied: 'Refined toward quieter and less tourist-heavy stops.', undo: 'Removed the quiet-route refinement.' },
  open: {
    applied: 'Refined to places marked open now.',
    undo: 'Removed the open-now refinement.',
    unavailable: 'Open-now data is not available for these saved places yet.',
  },
};

const SAVED_ROUTES_STORAGE_KEY = 'kandid_spot_saved_routes';

const REFINEMENT_TEMPLATES = {
  walk: ['cafe', 'walk', 'eat'],
  cheap: ['walk', 'cafe', 'eat', 'see'],
  cafe: ['cafe', 'cafe', 'walk', 'cafe'],
  quiet: ['walk', 'cafe', 'see', 'shop'],
  local: ['eat', 'cafe', 'walk', 'shop'],
};

const BUDGET_CATEGORY_NAMES = ['분식', '김밥', '국수', '라면', '라멘', '만두', '백반', '시장', '카페', 'coffee', 'cafe'];
const PREMIUM_CATEGORY_NAMES = ['오마카세', '파인다이닝', '스테이크', '와인', '칵테일', 'bar', 'pub'];
const LOCAL_TERMS = ['골목', '동네', '로컬', 'local', 'hidden', '숨은', '찐', '노포', '시장', 'backstreet'];
const QUIET_TERMS = ['조용', 'quiet', 'calm', '한적', '골목', '산책', '공원', 'walk', 'garden'];
const TOURIST_HEAVY_TERMS = ['핫플', '명소', '랜드마크', '관광', 'tour', 'tourist', 'famous', 'club', '클럽', '대형', '몰', '백화점'];
const OPEN_NOW_FIELD_PATHS = [
  ['openNow'],
  ['isOpenNow'],
  ['currentlyOpen'],
  ['isOpen'],
  ['openingHours', 'openNow'],
  ['openingHours', 'isOpen'],
  ['hours', 'openNow'],
  ['hours', 'isOpen'],
];

const ASK_RESPONSES = {
  why: route => route.ask.why,
  crowd: route => route.ask.crowd,
  time: route => `Yes — for ${route.label}, cut stop 4 and trim the longest stay. You can keep the first three stops to about 90 minutes.`,
  cafe: route => route.ask.cafe,
  cheap: route => `I can keep ${route.label} budget-friendly by making stop 1 the main spend and turning the last stop into a browse-only stop.`,
  open: route => `For this real saved-place route, I am not checking live hours yet. Before going, verify ${route.stops.map(stop => stop.name).slice(0, 2).join(' and ')} first.`,
};

// ========== State ==========
const state = {
  area: 'Hongdae',
  time: '2 hours',
  mood: 'Local food',
  applied: new Set(),
  activeRefinement: null,
  activeStop: null,
  routeKey: 'hongdae',
};

let currentRoute = null;
let realPlacesLoadPromise = null;

// ========== Builder collapse ==========
const builderToggle = document.getElementById('builder-toggle');
const builder = document.getElementById('builder');
const builderToggleLabel = document.getElementById('rs-toggle-label');

function setBuilderCollapsed(collapsed) {
  builder.classList.toggle('collapsed', collapsed);
  builderToggle.classList.toggle('collapsed', collapsed);
  builderToggle.setAttribute('aria-expanded', String(!collapsed));
  if (builderToggleLabel) {
    builderToggleLabel.textContent = collapsed ? 'Edit' : 'Hide';
  }
}

builderToggle.addEventListener('click', () => {
  const willCollapse = !builder.classList.contains('collapsed');
  setBuilderCollapsed(willCollapse);
});

// ========== Chip selection ==========
document.querySelectorAll('[data-group]').forEach(row => {
  row.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    row.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
    state[row.dataset.group] = btn.dataset.value;
  });
});

// ========== Build new route ==========
const buildBtn = document.getElementById('build-btn');
const loadingState = document.getElementById('loading-state');
const loadingStep = document.getElementById('loading-step');
const rsSummary = document.getElementById('rs-summary');

buildBtn.addEventListener('click', () => {
  document.querySelectorAll('#main-app .builder [data-group]').forEach(group => {
    const sel = group.querySelector('.chip.selected');
    if (sel) state[group.dataset.group] = sel.dataset.value;
  });

  loadingState.classList.add('active');
  const steps = LOADING_STEPS.map(s => s.replace('{area}', state.area));
  let i = 0;
  loadingStep.textContent = steps[0];
  const interval = setInterval(() => {
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      loadingState.classList.remove('active');
      finishBuild();
    } else {
      loadingStep.textContent = steps[i];
    }
  }, 460);
});

function finishBuild() {
  applyRouteForCurrentSelection();
  const why = document.querySelector('.why-card');
  why.style.transition = 'transform 0.3s, box-shadow 0.3s';
  why.style.transform = 'scale(1.015)';
  why.style.boxShadow = '0 8px 20px -6px rgba(245, 158, 11, 0.35)';
  setTimeout(() => {
    why.style.transform = '';
    why.style.boxShadow = '';
  }, 350);
  showToast(`✓ New route built for ${currentRoute.label}`);
}

// ========== Route state + rendering ==========
function getRouteKey(area) {
  const normalized = String(area || '').trim().toLowerCase();
  return AREA_KEY_BY_LABEL[normalized] || 'hongdae';
}

function applyRouteForCurrentSelection() {
  state.routeKey = getRouteKey(state.area);
  applyResolvedRoute(resolveRouteForCurrentSelection(state.routeKey));
}

function applyResolvedRoute(route) {
  currentRoute = route;
  state.area = currentRoute.label;
  state.activeStop = null;

  updateRouteCopy();
  renderStops();
  hideFloatCard();
  updateMarkerActive();

  if (kakaoMapState.map || naverMapState.map) {
    renderActiveMapRoute({ fit: true });
  }
}

function updateRouteCopy() {
  const sourceLabel = currentRoute.sourceLabel;
  rsSummary.textContent = [currentRoute.label, state.time, state.mood, sourceLabel].filter(Boolean).join(' · ');
  document.getElementById('map-location-label').textContent = currentRoute.mapLabel;
  document.getElementById('why-body').textContent = currentRoute.why;

  setRouteMetaDefault();
}

function setRouteMetaItem(index, value, label) {
  const metaValues = document.querySelectorAll('.route-meta strong');
  const valueEl = metaValues[index];
  if (!valueEl) return;

  valueEl.textContent = value;

  const item = valueEl.parentElement;
  if (!item) return;

  const textNode = Array.from(item.childNodes).find(node => node.nodeType === 3);
  if (textNode) {
    textNode.nodeValue = ` ${label}`;
  }
}

function setRouteMetaDefault() {
  setRouteMetaItem(0, String(currentRoute.stops.length), 'stops');
  setRouteMetaItem(1, currentRoute.meta.total, 'total');
  setRouteMetaItem(2, currentRoute.meta.walking, 'walking');
}

function setNaverDirectionsMeta(directions) {
  setRouteMetaItem(0, String(currentRoute.stops.length), 'stops');
  setRouteMetaItem(1, directions.durationText, 'Naver ETA');
  setRouteMetaItem(2, directions.distanceText, 'real route');
}

function renderStops() {
  const list = document.getElementById('stops');
  list.innerHTML = '';
  const activeProvider = getActiveMapProvider();

  if (!currentRoute.stops.length) {
    const item = document.createElement('div');
    item.className = 'stop';
    item.innerHTML = `
      <div class="stop-body">
        <div class="stop-name">No matching real places found</div>
        <div class="stop-type">Try another area or mood once the real places dataset is loaded.</div>
      </div>
    `;
    list.appendChild(item);
    return;
  }

  currentRoute.stops.forEach((s, idx) => {
    if (s.walk > 0) {
      const w = document.createElement('div');
      w.className = 'stop-walk';
      w.innerHTML = `<span>${s.walk} min walk</span>`;
      list.appendChild(w);
    }
    const item = document.createElement('div');
    item.className = 'stop';
    item.dataset.idx = idx;

    const place = s.place || {};
    const roleLabel =
      MIRO_CATEGORY_LABELS[place.miroCategory] ||
      place.categoryName ||
      'Stop';
    const why = String(s.why || '').trim();

    const actions = [];
    const providerOpenAction = renderProviderOpenButton(place, s.name, activeProvider);
    if (providerOpenAction) actions.push(providerOpenAction);
    actions.push(
      `<button class="ks-stop-link ks-stop-replace" type="button" disabled aria-disabled="true" title="Coming soon">↻ Replace</button>`
    );

    item.innerHTML = `
      <div class="stop-num-col">
        <div class="stop-num">${s.num}</div>
        <div class="stop-line"></div>
      </div>
      <div class="stop-body">
        <span class="ks-stop-role">${escapeHtml(roleLabel)}</span>
        <div class="stop-name">${escapeHtml(s.name)}</div>
        <div class="stop-type">${escapeHtml(s.type)}</div>
        ${why ? `<div class="ks-stop-why">${escapeHtml(why)}</div>` : ''}
        <div class="stop-meta">
          <span class="stop-tag">⏱ ${s.stay} min</span>
          ${(s.tags || []).map(t => `<span class="stop-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <div class="ks-stop-actions">${actions.join('')}</div>
      </div>
    `;
    item.addEventListener('click', () => activateStop(idx));
    list.appendChild(item);
  });
}

// ========== Map Providers ==========
const MAP_PROVIDER_STORAGE_KEY = 'miro_map_provider';
const MAP_PROVIDERS = new Set(['kakao', 'naver']);

function getInitialMapProvider() {
  try {
    const storedProvider = window.localStorage.getItem(MAP_PROVIDER_STORAGE_KEY);
    if (MAP_PROVIDERS.has(storedProvider)) return storedProvider;
  } catch (error) {
    // Remembering the provider is optional.
  }
  return 'kakao';
}

const mapProviderState = {
  active: getInitialMapProvider(),
};

function getActiveMapProvider() {
  return MAP_PROVIDERS.has(mapProviderState.active) ? mapProviderState.active : 'kakao';
}

function getProviderOpenLink(place = {}, fallbackName, provider = getActiveMapProvider()) {
  if (provider === 'naver') {
    const naverUrl = typeof place.naverMapUrl === 'string' ? place.naverMapUrl.trim() : '';
    return naverUrl ? { source: 'naver', mark: 'N', label: 'Open in Naver', url: naverUrl } : null;
  }

  const lat = Number(place.lat);
  const lng = Number(place.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const placeLabel = place.displayName || place.name || fallbackName || 'Place';
  return {
    source: 'kakao',
    mark: 'K',
    label: 'Open in Kakao',
    url: `https://map.kakao.com/link/map/${encodeURIComponent(placeLabel)},${lat},${lng}`,
  };
}

function renderProviderOpenButton(place = {}, fallbackName, provider = getActiveMapProvider()) {
  const link = getProviderOpenLink(place, fallbackName, provider);
  if (!link) return '';

  return (
    `<a class="ks-stop-link" data-source="${link.source}" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">` +
      `<span class="ks-link-mark">${link.mark}</span>${link.label}</a>`
  );
}

const kakaoMapState = {
  map: null,
  sdkPromise: null,
  markers: [],
  polyline: null,
  requested: false,
};

const naverMapState = {
  map: null,
  sdkPromise: null,
  markers: [],
  polyline: null,
  requested: false,
  directionsKey: '',
  directions: null,
  directionsPromise: null,
};

const mapStage = document.getElementById('map-stage');
const mapStatus = document.getElementById('map-status');
const kakaoMapLoggedErrors = new Set();
const naverMapLoggedErrors = new Set();
let mapSwitchToken = 0;

function logKakaoMapError(message) {
  if (kakaoMapLoggedErrors.has(message)) return;
  console.error(message);
  kakaoMapLoggedErrors.add(message);
}

function logNaverMapError(message) {
  if (naverMapLoggedErrors.has(message)) return;
  console.error(message);
  naverMapLoggedErrors.add(message);
}

// Static prototype config: Vercel runtime global, then local development fallbacks.
function getKakaoAppKey() {
  const configuredKey = (window.MIRO_KAKAO_APP_KEY || '').trim();
  if (configuredKey) return configuredKey;

  const params = new URLSearchParams(window.location.search);
  const queryKey = params.get('kakao_app_key') || params.get('kakaoKey');
  if (queryKey) {
    try {
      window.localStorage.setItem('miro_kakao_app_key', queryKey.trim());
    } catch (error) {
      // localStorage persistence is optional for the static prototype.
    }
    return queryKey.trim();
  }

  const windowKey = (window.KAKAO_JAVASCRIPT_KEY || '').trim();
  if (windowKey) return windowKey;

  const metaKey = (document.querySelector('meta[name="miro-kakao-app-key"]')?.content || '').trim();
  if (metaKey) return metaKey;

  try {
    return (window.localStorage.getItem('miro_kakao_app_key') || '').trim();
  } catch (error) {
    return '';
  }
}

function getNaverMapsKeyId() {
  const candidates = [
    {
      source: 'window',
      value: window.MIRO_NAVER_MAPS_NCP_KEY_ID,
    },
    {
      source: 'meta',
      value: document.querySelector('meta[name="miro-naver-maps-ncp-key-id"]')?.content,
    },
    {
      source: 'localStorage',
      value: (() => {
        try {
          return window.localStorage.getItem('miro_naver_maps_ncp_key_id');
        } catch (error) {
          return '';
        }
      })(),
    },
    {
      source: 'query',
      value: new URLSearchParams(window.location.search).get('naver_maps_ncp_key_id'),
    },
  ];

  const match = candidates.find(candidate => String(candidate.value || '').trim());
  const key = match ? String(match.value).trim() : '';

  if (key) {
    window.MIRO_NAVER_MAPS_NCP_KEY_ID = key;
    console.log(`Naver key source: ${match.source}`);
  }
  console.log(`Resolved Naver key exists: ${Boolean(key)}`);

  return key;
}

function ensureActiveMap() {
  if (mapProviderState.active === 'naver') {
    ensureNaverMap();
    return;
  }
  ensureKakaoMap();
}

function renderActiveMapRoute({ fit = false } = {}) {
  if (mapProviderState.active === 'naver') {
    renderNaverRoute({ fit });
    return;
  }
  renderKakaoRoute({ fit });
}

function setMapProvider(provider) {
  if (!MAP_PROVIDERS.has(provider)) return;

  if (mapProviderState.active !== provider) {
    mapSwitchToken++;
    clearRenderedMaps();
    mapProviderState.active = provider;
    try {
      window.localStorage.setItem(MAP_PROVIDER_STORAGE_KEY, provider);
    } catch (error) {
      // Remembering the provider is optional.
    }
  }

  syncMapProviderButtons();
  renderStops();
  hideFloatCard();
  if (provider !== 'naver') {
    setRouteMetaDefault();
  }
  ensureActiveMap();
}

function syncMapProviderButtons() {
  document.querySelectorAll('[data-map-provider]').forEach(button => {
    const isActive = button.dataset.mapProvider === mapProviderState.active;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function clearRenderedMaps() {
  clearKakaoRouteObjects();
  clearNaverRouteObjects();
  kakaoMapState.map = null;
  naverMapState.map = null;
  resetMapContainer();
}

function getMapElement() {
  return document.getElementById('kakao-map');
}

function resetMapContainer() {
  const mapEl = getMapElement();
  if (!mapEl) return;

  const freshMapEl = document.createElement('div');
  freshMapEl.id = 'kakao-map';
  freshMapEl.className = 'kakao-map';
  freshMapEl.setAttribute('role', mapEl.getAttribute('role') || 'application');
  freshMapEl.setAttribute(
    'aria-label',
    mapEl.getAttribute('aria-label') || 'Kakao map showing the selected route'
  );
  mapEl.replaceWith(freshMapEl);
}

function ensureKakaoMap() {
  kakaoMapState.requested = true;

  const mapEl = getMapElement();
  if (!mapEl) {
    logKakaoMapError('map container missing');
    return;
  }

  if (kakaoMapState.map) {
    relayoutKakaoMap();
    renderKakaoRoute({ fit: true });
    return;
  }

  const appKey = getKakaoAppKey();
  if (!appKey) {
    logKakaoMapError('Missing window.MIRO_KAKAO_APP_KEY');
    setMapStatus('Kakao map needs a JavaScript key. Set window.MIRO_KAKAO_APP_KEY, the meta tag, localStorage key miro_kakao_app_key, or add ?kakao_app_key=YOUR_KEY.', 'warning');
    return;
  }

  const renderToken = mapSwitchToken;
  setMapStatus('Loading Kakao Map…', 'loading');
  loadKakaoSdk(appKey)
    .then(() => {
      if (renderToken !== mapSwitchToken) return;
      if (mapProviderState.active !== 'kakao') return;

      const mapEl = getMapElement();
      if (!mapEl) {
        logKakaoMapError('map container missing');
        return;
      }

      const center = new window.kakao.maps.LatLng(currentRoute.center.lat, currentRoute.center.lng);
      kakaoMapState.map = new window.kakao.maps.Map(mapEl, {
        center,
        level: 4,
      });

      window.kakao.maps.event.addListener(kakaoMapState.map, 'click', () => {
        hideFloatCard();
      });

      hideMapStatus();
      window.requestAnimationFrame(() => {
        if (renderToken !== mapSwitchToken || mapProviderState.active !== 'kakao') return;
        relayoutKakaoMap();
        renderKakaoRoute({ fit: true });
      });
    })
    .catch(() => {
      kakaoMapState.sdkPromise = null;
      if (renderToken !== mapSwitchToken || mapProviderState.active !== 'kakao') return;
      setMapStatus('Kakao Map could not load. Check the JavaScript key, allowed domains, and network access.', 'error');
    });
}

function loadKakaoSdk(appKey = getKakaoAppKey()) {
  if (!appKey) {
    logKakaoMapError('Missing window.MIRO_KAKAO_APP_KEY');
    return Promise.reject(new Error('Missing window.MIRO_KAKAO_APP_KEY'));
  }

  if (window.kakao && window.kakao.maps) {
    return new Promise(resolve => {
      window.kakao.maps.load(() => resolve(window.kakao));
    });
  }

  if (kakaoMapState.sdkPromise) {
    return kakaoMapState.sdkPromise;
  }

  kakaoMapState.sdkPromise = new Promise((resolve, reject) => {
    const finishLoad = () => {
      if (!window.kakao) {
        logKakaoMapError('window.kakao missing after SDK script load');
        reject(new Error('window.kakao missing after SDK script load'));
        return;
      }

      if (!window.kakao.maps) {
        logKakaoMapError('window.kakao.maps missing after SDK script load');
        reject(new Error('window.kakao.maps missing after SDK script load'));
        return;
      }

      window.kakao.maps.load(() => resolve(window.kakao));
    };

    const failLoad = () => {
      logKakaoMapError('SDK script failed to load');
      reject(new Error('SDK script failed to load'));
    };

    let script = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]');
    let shouldAppendScript = false;

    if (!script) {
      script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false&libraries=services`;
      script.async = true;
      shouldAppendScript = true;
    }

    script.addEventListener('load', finishLoad, { once: true });
    script.addEventListener('error', failLoad, { once: true });

    if (shouldAppendScript) {
      document.head.appendChild(script);
    }
  });

  return kakaoMapState.sdkPromise;
}

function getMapContainerSize(mapEl) {
  if (!mapEl) return { width: 0, height: 0 };

  const rect = mapEl.getBoundingClientRect();
  return {
    width: Math.round(rect.width || mapEl.offsetWidth || mapEl.clientWidth || 0),
    height: Math.round(rect.height || mapEl.offsetHeight || mapEl.clientHeight || 0),
  };
}

function getLoggedNaverMapContainerSize(mapEl) {
  const size = getMapContainerSize(mapEl);
  console.log(`Naver map container size: ${size.width} ${size.height}`);
  return size;
}

function scheduleNaverMapRetry(renderToken, attempt) {
  if (attempt >= 10) {
    setMapStatus('Naver map is waiting for the map container to become visible.', 'warning');
    return;
  }

  const retry = () => {
    if (renderToken !== mapSwitchToken) return;
    if (mapProviderState.active !== 'naver') return;
    if (naverMapState.map) return;
    ensureNaverMap(attempt + 1);
  };

  if (attempt < 2) {
    window.requestAnimationFrame(retry);
    return;
  }

  window.setTimeout(retry, 120);
}

function ensureNaverMap(attempt = 0) {
  naverMapState.requested = true;

  const mapEl = getMapElement();
  if (!mapEl) {
    logNaverMapError('Naver map container missing');
    return;
  }

  if (naverMapState.map) {
    relayoutNaverMap();
    renderNaverRoute({ fit: true });
    return;
  }

  const ncpKeyId = getNaverMapsKeyId();
  if (!ncpKeyId) {
    logNaverMapError('Missing window.MIRO_NAVER_MAPS_NCP_KEY_ID');
    setMapStatus('Naver map needs an NCP Key ID. Set window.MIRO_NAVER_MAPS_NCP_KEY_ID via Vercel environment variables.', 'warning');
    return;
  }

  const renderToken = mapSwitchToken;
  setMapStatus('Loading Naver Map…', 'loading');
  loadNaverSdk(ncpKeyId)
    .then(() => {
      if (renderToken !== mapSwitchToken) return;
      if (mapProviderState.active !== 'naver') return;
      if (!window.naver || !window.naver.maps) return;
      if (naverMapState.map) {
        relayoutNaverMap();
        renderNaverRoute({ fit: true });
        return;
      }

      const mapEl = getMapElement();
      if (!mapEl) {
        logNaverMapError('Naver map container missing');
        return;
      }

      const size = getLoggedNaverMapContainerSize(mapEl);
      if (!size.width || !size.height) {
        scheduleNaverMapRetry(renderToken, attempt);
        return;
      }

      const center = new window.naver.maps.LatLng(currentRoute.center.lat, currentRoute.center.lng);
      naverMapState.map = new window.naver.maps.Map(mapEl, {
        center,
        zoom: 14,
      });
      console.log('Naver map initialized');

      window.naver.maps.Event.addListener(naverMapState.map, 'click', () => {
        hideFloatCard();
      });

      hideMapStatus();
      window.requestAnimationFrame(() => {
        if (renderToken !== mapSwitchToken || mapProviderState.active !== 'naver') return;
        relayoutNaverMap();
        renderNaverRoute({ fit: true });
      });
    })
    .catch(() => {
      naverMapState.sdkPromise = null;
      if (renderToken !== mapSwitchToken || mapProviderState.active !== 'naver') return;
      setMapStatus('Naver Map could not load. Check the NCP Key ID, allowed domains, and network access.', 'error');
    });
}

function loadNaverSdk(ncpKeyId = getNaverMapsKeyId()) {
  if (!ncpKeyId) {
    logNaverMapError('Missing window.MIRO_NAVER_MAPS_NCP_KEY_ID');
    return Promise.reject(new Error('Missing window.MIRO_NAVER_MAPS_NCP_KEY_ID'));
  }

  if (window.naver && window.naver.maps) {
    console.log('Naver SDK already loaded');
    return Promise.resolve(window.naver);
  }

  if (naverMapState.sdkPromise) {
    return naverMapState.sdkPromise;
  }

  naverMapState.sdkPromise = new Promise((resolve, reject) => {
    const finishLoad = () => {
      if (!window.naver) {
        logNaverMapError('window.naver missing after SDK load');
        reject(new Error('window.naver missing after SDK load'));
        return;
      }

      if (!window.naver.maps) {
        logNaverMapError('window.naver.maps missing after SDK load');
        reject(new Error('window.naver.maps missing after SDK load'));
        return;
      }

      console.log('Naver SDK loaded');
      resolve(window.naver);
    };

    const failLoad = () => {
      logNaverMapError('Naver SDK script failed to load');
      reject(new Error('Naver SDK script failed to load'));
    };

    let script = document.querySelector('script[src*="oapi.map.naver.com/openapi/v3/maps.js"]');
    let shouldAppendScript = false;

    if (!script) {
      script = document.createElement('script');
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(ncpKeyId)}`;
      script.async = true;
      shouldAppendScript = true;
    }
    console.log('Naver SDK load start');

    script.addEventListener('load', finishLoad, { once: true });
    script.addEventListener('error', failLoad, { once: true });

    if (shouldAppendScript) {
      document.head.appendChild(script);
    }
  });

  return naverMapState.sdkPromise;
}

function renderKakaoRoute({ fit = false } = {}) {
  if (!kakaoMapState.map) {
    ensureKakaoMap();
    return;
  }

  if (!window.kakao || !window.kakao.maps) {
    loadKakaoSdk()
      .then(() => renderKakaoRoute({ fit }))
      .catch(() => {
        kakaoMapState.sdkPromise = null;
      });
    return;
  }

  clearKakaoRouteObjects();

  const stopsWithCoords = getStopsWithCoords();
  if (!stopsWithCoords.length) return;

  const directRoutePoints = stopsWithCoords.map(({ stop }) => ({
    lat: stop.coords.lat,
    lng: stop.coords.lng,
  }));
  const directionsPoints = getNaverDirectionsPoints(stopsWithCoords);
  const directionsKey = getNaverDirectionsKey(directionsPoints);
  const renderToken = mapSwitchToken;

  if (directRoutePoints.length > 1) {
    renderKakaoPolyline(directRoutePoints);
  }

  kakaoMapState.markers = currentRoute.stops.map(() => null);
  stopsWithCoords.forEach(({ stop, index }, markerIndex) => {
    const position = new window.kakao.maps.LatLng(stop.coords.lat, stop.coords.lng);
    const content = createKakaoMarkerElement(stop, index);
    const overlay = new window.kakao.maps.CustomOverlay({
      position,
      content,
      xAnchor: 0.5,
      yAnchor: 1.05,
      zIndex: 100 + index,
    });

    overlay.setMap(kakaoMapState.map);
    kakaoMapState.markers[index] = { overlay, element: content, position };
  });

  updateMarkerActive();
  if (fit) fitKakaoRouteBounds();

  getNaverDirections(directionsPoints).then(directions => {
    if (!directions || mapProviderState.active !== 'kakao' || !kakaoMapState.map) return;
    if (renderToken !== mapSwitchToken || directionsKey !== naverMapState.directionsKey) return;

    renderKakaoPolyline(directions.path, { realRoute: true });
    if (fit) fitKakaoRouteBounds(directions.path);
  });
}

function getNaverDirectionsPoints(stopsWithCoords) {
  return stopsWithCoords.map(({ stop }) => ({
    lat: stop.coords.lat,
    lng: stop.coords.lng,
  })).slice(0, 7);
}

function getNaverDirectionsKey(points) {
  return points.map(point => `${point.lng},${point.lat}`).join('|');
}

function buildNaverDirectionsUrl(points) {
  const params = new URLSearchParams();
  const start = points[0];
  const goal = points[points.length - 1];
  const waypoints = points.slice(1, -1).slice(0, 5);

  params.set('startLng', start.lng);
  params.set('startLat', start.lat);
  params.set('goalLng', goal.lng);
  params.set('goalLat', goal.lat);

  if (waypoints.length) {
    params.set('waypoints', waypoints.map(point => `${point.lng},${point.lat}`).join('|'));
  }

  return `/api/naver-directions?${params.toString()}`;
}

function getNaverDirections(points) {
  if (points.length < 2) return Promise.resolve(null);

  const directionsKey = getNaverDirectionsKey(points);
  if (naverMapState.directionsKey === directionsKey && naverMapState.directions) {
    return Promise.resolve(naverMapState.directions);
  }

  if (naverMapState.directionsKey === directionsKey && naverMapState.directionsPromise) {
    return naverMapState.directionsPromise;
  }

  naverMapState.directionsKey = directionsKey;
  naverMapState.directions = null;
  console.log('Naver Directions request start');

  naverMapState.directionsPromise = fetch(buildNaverDirectionsUrl(points))
    .then(response => {
      if (!response.ok) {
        throw new Error(`Naver Directions returned ${response.status}`);
      }
      return response.json();
    })
    .then(payload => {
      if (!payload || !payload.ok || !Array.isArray(payload.path) || payload.path.length < 2) {
        throw new Error('Naver Directions response did not include a usable path');
      }

      naverMapState.directions = payload;
      console.log('Naver Directions response ok');
      console.log(`Naver real route path points: ${payload.path.length}`);
      return payload;
    })
    .catch(error => {
      if (naverMapState.directionsKey === directionsKey) {
        naverMapState.directions = null;
      }
      console.warn('Naver real route unavailable; using straight-line fallback');
      return null;
    })
    .finally(() => {
      if (naverMapState.directionsKey === directionsKey) {
        naverMapState.directionsPromise = null;
      }
    });

  return naverMapState.directionsPromise;
}

function toNaverLatLngPath(points) {
  return points.map(point => new window.naver.maps.LatLng(point.lat, point.lng));
}

function toKakaoLatLngPath(points) {
  return points.map(point => new window.kakao.maps.LatLng(point.lat, point.lng));
}

function renderKakaoPolyline(points, { realRoute = false } = {}) {
  if (!points.length || !kakaoMapState.map || !window.kakao || !window.kakao.maps) return;

  if (kakaoMapState.polyline) {
    kakaoMapState.polyline.setMap(null);
    kakaoMapState.polyline = null;
  }

  kakaoMapState.polyline = new window.kakao.maps.Polyline({
    path: toKakaoLatLngPath(points),
    strokeWeight: 5,
    strokeColor: '#2563EB',
    strokeOpacity: 0.95,
    strokeStyle: 'shortdash',
  });
  kakaoMapState.polyline.setMap(kakaoMapState.map);

  if (realRoute) {
    console.log('Kakao real route polyline rendered');
  }
}

function renderNaverPolyline(points, { realRoute = false } = {}) {
  if (!points.length || !naverMapState.map || !window.naver || !window.naver.maps) return;

  if (naverMapState.polyline) {
    naverMapState.polyline.setMap(null);
    naverMapState.polyline = null;
  }

  naverMapState.polyline = new window.naver.maps.Polyline({
    map: naverMapState.map,
    path: toNaverLatLngPath(points),
    strokeWeight: 5,
    strokeColor: '#2563EB',
    strokeOpacity: 0.95,
    strokeStyle: 'shortdash',
  });

  if (realRoute) {
    console.log('Naver real route polyline rendered');
  }
}

function renderNaverRoute({ fit = false } = {}) {
  if (!naverMapState.map) {
    ensureNaverMap();
    return;
  }

  if (!window.naver || !window.naver.maps) {
    loadNaverSdk()
      .then(() => renderNaverRoute({ fit }))
      .catch(() => {
        naverMapState.sdkPromise = null;
      });
    return;
  }

  clearNaverRouteObjects();

  const stopsWithCoords = getStopsWithCoords();
  if (!stopsWithCoords.length) return;

  const directRoutePoints = stopsWithCoords.map(({ stop }) => ({
    lat: stop.coords.lat,
    lng: stop.coords.lng,
  }));
  const directionsPoints = getNaverDirectionsPoints(stopsWithCoords);
  const directionsKey = getNaverDirectionsKey(directionsPoints);

  if (directRoutePoints.length > 1) {
    renderNaverPolyline(directRoutePoints);
  }

  naverMapState.markers = currentRoute.stops.map(() => null);
  stopsWithCoords.forEach(({ stop, index }, markerIndex) => {
    const marker = new window.naver.maps.Marker({
      map: naverMapState.map,
      position: new window.naver.maps.LatLng(stop.coords.lat, stop.coords.lng),
      icon: createNaverMarkerIcon(stop, index, state.activeStop === index),
      zIndex: 100 + index,
    });

    window.naver.maps.Event.addListener(marker, 'click', () => {
      activateStop(index, { source: 'marker' });
    });

    naverMapState.markers[index] = {
      marker,
      position: new window.naver.maps.LatLng(stop.coords.lat, stop.coords.lng),
    };
  });

  updateMarkerActive();
  if (fit) fitNaverRouteBounds();

  getNaverDirections(directionsPoints).then(directions => {
    if (!directions || mapProviderState.active !== 'naver' || !naverMapState.map) {
      setRouteMetaDefault();
      return;
    }

    if (directionsKey !== naverMapState.directionsKey) return;

    renderNaverPolyline(directions.path, { realRoute: true });
    setNaverDirectionsMeta(directions);
    if (fit) fitNaverRouteBounds(directions.path);
  });
}

function clearKakaoRouteObjects() {
  if (kakaoMapState.polyline) {
    kakaoMapState.polyline.setMap(null);
    kakaoMapState.polyline = null;
  }

  kakaoMapState.markers.forEach(marker => {
    if (marker) marker.overlay.setMap(null);
  });
  kakaoMapState.markers = [];
}

function clearNaverRouteObjects() {
  if (naverMapState.polyline) {
    naverMapState.polyline.setMap(null);
    naverMapState.polyline = null;
  }

  naverMapState.markers.forEach(marker => {
    if (marker) marker.marker.setMap(null);
  });
  naverMapState.markers = [];
}

function createKakaoMarkerElement(stop, idx) {
  const marker = document.createElement('button');
  marker.type = 'button';
  marker.className = 'kakao-route-marker';
  marker.dataset.stop = String(idx);
  marker.setAttribute('aria-label', `Show stop ${stop.num}: ${stop.name}`);
  marker.textContent = String(stop.num);
  marker.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    activateStop(idx, { source: 'marker' });
  });
  return marker;
}

function createNaverMarkerIcon(stop, idx, isActive = false) {
  return {
    content: `<button class="kakao-route-marker${isActive ? ' active' : ''}" type="button" aria-label="Show route stop ${stop.num}">${stop.num}</button>`,
    anchor: new window.naver.maps.Point(17, 34),
  };
}

function fitKakaoRouteBounds(routePoints = null) {
  if (!kakaoMapState.map || !window.kakao || !window.kakao.maps) return;

  const bounds = new window.kakao.maps.LatLngBounds();
  const points = Array.isArray(routePoints) && routePoints.length
    ? routePoints
    : getStopsWithCoords().map(({ stop }) => stop.coords);
  if (!points.length) return;
  points.forEach(point => {
    bounds.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
  });

  try {
    kakaoMapState.map.setBounds(bounds, 64, 64, 104, 64);
  } catch (error) {
    kakaoMapState.map.setBounds(bounds);
  }
}

function fitNaverRouteBounds(routePoints = null) {
  if (!naverMapState.map || !window.naver || !window.naver.maps) return;

  const points = Array.isArray(routePoints) && routePoints.length
    ? routePoints
    : getStopsWithCoords().map(({ stop }) => stop.coords);
  if (!points.length) return;

  const lats = points.map(point => point.lat);
  const lngs = points.map(point => point.lng);
  const bounds = new window.naver.maps.LatLngBounds(
    new window.naver.maps.LatLng(Math.min(...lats), Math.min(...lngs)),
    new window.naver.maps.LatLng(Math.max(...lats), Math.max(...lngs))
  );

  try {
    naverMapState.map.fitBounds(bounds, { top: 64, right: 64, bottom: 104, left: 64 });
  } catch (error) {
    naverMapState.map.fitBounds(bounds);
  }
}

function relayoutKakaoMap() {
  if (!kakaoMapState.map) return;
  kakaoMapState.map.relayout();
}

function relayoutNaverMap() {
  if (!naverMapState.map || !window.naver || !window.naver.maps) return;
  window.naver.maps.Event.trigger(naverMapState.map, 'resize');
}

function setMapStatus(message, mode = 'info') {
  if (!mapStatus) return;
  mapStatus.textContent = message;
  mapStatus.dataset.mode = mode;
  mapStatus.hidden = false;
}

function hideMapStatus() {
  if (!mapStatus) return;
  mapStatus.hidden = true;
}

function preloadKakaoSdk() {
  const appKey = getKakaoAppKey();
  if (!appKey) {
    logKakaoMapError('Missing window.MIRO_KAKAO_APP_KEY');
    return;
  }

  loadKakaoSdk(appKey).catch(() => {
    kakaoMapState.sdkPromise = null;
  });
}

function bindMapProviderControls() {
  document.querySelectorAll('[data-map-provider]').forEach(button => {
    button.addEventListener('click', () => {
      setMapProvider(button.dataset.mapProvider);
    });
  });
  syncMapProviderButtons();
}

function bindMapControls() {
  document.getElementById('map-zoom-in').addEventListener('click', () => {
    if (mapProviderState.active === 'naver') {
      if (!naverMapState.map) {
        ensureNaverMap();
        return;
      }
      naverMapState.map.setZoom(naverMapState.map.getZoom() + 1);
      return;
    }

    if (!kakaoMapState.map) {
      ensureKakaoMap();
      return;
    }
    kakaoMapState.map.setLevel(Math.max(1, kakaoMapState.map.getLevel() - 1));
  });

  document.getElementById('map-zoom-out').addEventListener('click', () => {
    if (mapProviderState.active === 'naver') {
      if (!naverMapState.map) {
        ensureNaverMap();
        return;
      }
      naverMapState.map.setZoom(Math.max(1, naverMapState.map.getZoom() - 1));
      return;
    }

    if (!kakaoMapState.map) {
      ensureKakaoMap();
      return;
    }
    kakaoMapState.map.setLevel(kakaoMapState.map.getLevel() + 1);
  });

  document.getElementById('map-center-route').addEventListener('click', () => {
    if (mapProviderState.active === 'naver') {
      if (!naverMapState.map) {
        ensureNaverMap();
        return;
      }
      relayoutNaverMap();
      fitNaverRouteBounds();
      showToast(`Centered on ${currentRoute.label}`);
      return;
    }

    if (!kakaoMapState.map) {
      ensureKakaoMap();
      return;
    }
    relayoutKakaoMap();
    fitKakaoRouteBounds();
    showToast(`Centered on ${currentRoute.label}`);
  });
}

// ========== Sync activation (list ↔ map ↔ floating card) ==========
function activateStop(idx, options = {}) {
  const s = currentRoute.stops[idx];
  if (!s) return;

  state.activeStop = idx;
  document.querySelectorAll('.stop').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.idx) === idx);
  });
  updateMarkerActive();

  const card = document.getElementById('float-card');
  document.getElementById('fc-num').textContent = s.num;
  document.getElementById('fc-name').textContent = s.name;
  document.getElementById('fc-type').textContent = s.type;
  document.getElementById('fc-stay').textContent = `⏱ ${s.stay} min stay`;
  document.getElementById('fc-walk').textContent = s.walk > 0 ? `🚶 ${s.walk} min walk` : '📍 Start here';
  document.getElementById('fc-why').textContent = s.why;
  card.classList.add('show');

  if (
    mapProviderState.active === 'naver' &&
    naverMapState.map &&
    naverMapState.markers[idx] &&
    options.pan !== false
  ) {
    naverMapState.map.panTo(naverMapState.markers[idx].position);
  } else if (kakaoMapState.map && kakaoMapState.markers[idx] && options.pan !== false) {
    kakaoMapState.map.panTo(kakaoMapState.markers[idx].position);
  }

  const activeEl = document.querySelector(`.left-pane .stop[data-idx="${idx}"]`);
  if (activeEl && options.scroll !== false) {
    activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function updateMarkerActive() {
  kakaoMapState.markers.forEach((marker, idx) => {
    if (!marker) return;
    const isActive = state.activeStop === idx;
    marker.element.classList.toggle('active', isActive);
    if (typeof marker.overlay.setZIndex === 'function') {
      marker.overlay.setZIndex(isActive ? 1000 : 100 + idx);
    }
  });

  naverMapState.markers.forEach((marker, idx) => {
    if (!marker) return;
    const isActive = state.activeStop === idx;
    marker.marker.setIcon(createNaverMarkerIcon(currentRoute.stops[idx], idx, isActive));
    if (typeof marker.marker.setZIndex === 'function') {
      marker.marker.setZIndex(isActive ? 1000 : 100 + idx);
    }
  });
}

function clearActiveStop() {
  state.activeStop = null;
  document.querySelectorAll('.stop').forEach(el => el.classList.remove('active'));
  updateMarkerActive();
  hideFloatCard();
}

function hideFloatCard() {
  document.getElementById('float-card').classList.remove('show');
}

document.getElementById('fc-close').addEventListener('click', clearActiveStop);

mapStage.addEventListener('click', e => {
  if (
    !e.target.closest('.kakao-route-marker') &&
    !e.target.closest('.float-card') &&
    !e.target.closest('.ask-fab') &&
    !e.target.closest('.map-status')
  ) {
    hideFloatCard();
  }
});

// ========== Refine ==========
document.querySelectorAll('.refine-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    applyRefinement(chip.dataset.refine);
  });
});

function syncRefineChips() {
  document.querySelectorAll('.refine-chip').forEach(chip => {
    chip.classList.toggle('applied', chip.dataset.refine === state.activeRefinement);
  });
}

function setActiveRefinement(key) {
  state.activeRefinement = key || null;
  state.applied.clear();
  if (state.activeRefinement) state.applied.add(state.activeRefinement);
  syncRefineChips();
}

function getCurrentAreaCandidates() {
  return getAreaCandidates(curatedPlaceState.places, getAreaConfig(getRouteKey(state.area)));
}

function applyRefinement(key) {
  if (!REFINE_TEXTS[key]) return;

  ensureRealPlacesLoaded().then(() => {
    if (state.activeRefinement === key) {
      setActiveRefinement(null);
      applyRouteForCurrentSelection();
      showToast(REFINE_TEXTS[key].undo);
      return;
    }

    const routeKey = getRouteKey(state.area);
    const candidates = getCurrentAreaCandidates();
    if (key === 'open' && !hasOpenNowDataForCandidates(candidates)) {
      showToast(REFINE_TEXTS.open.unavailable);
      return;
    }

    const refinedRoute = buildCuratedRoute(routeKey, state.mood, key);
    if (!refinedRoute || !refinedRoute.stops.length) {
      showToast('Not enough matching saved places for that refinement yet.');
      return;
    }

    state.routeKey = routeKey;
    setActiveRefinement(key);
    applyResolvedRoute(refinedRoute);
    showToast(REFINE_TEXTS[key].applied);
    flashWhy();
  });
}

function flashWhy() {
  const why = document.getElementById('why-body');
  why.style.transition = 'background 0.4s';
  why.style.background = 'rgba(20, 184, 166, 0.14)';
  setTimeout(() => { why.style.background = 'transparent'; }, 700);
}

// ========== Action bar ==========
function getSavedRoutes() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(SAVED_ROUTES_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function getRouteSnapshot() {
  const stops = (currentRoute?.stops || []).map(stop => ({
    id: stop.place?.placeId || stop.place?.id || '',
    name: stop.name,
    type: stop.type,
    coords: stop.coords,
    naverMapUrl: stop.place?.naverMapUrl || '',
  }));

  return {
    timestamp: new Date().toISOString(),
    area: state.area,
    time: state.time,
    vibe: state.mood,
    activeRefinement: state.activeRefinement,
    activeMapProvider: getActiveMapProvider(),
    summary: {
      label: currentRoute?.label || '',
      mapLabel: currentRoute?.mapLabel || '',
      total: currentRoute?.meta?.total || '',
      walking: currentRoute?.meta?.walking || '',
      source: currentRoute?.sourceLabel || '',
    },
    stops,
  };
}

function getRouteSnapshotKey(snapshot) {
  return [
    snapshot.area,
    snapshot.time,
    snapshot.vibe,
    snapshot.activeRefinement || '',
    snapshot.stops.map(stop => stop.id || stop.name).join('>'),
  ].join('|');
}

function setActionButtonTemporaryLabel(button, label, restoreLabel) {
  if (!button) return;
  const textNode = Array.from(button.childNodes).find(node => node.nodeType === 3 && node.nodeValue.trim());
  if (!textNode) return;

  textNode.nodeValue = ` ${label} `;
  window.setTimeout(() => {
    textNode.nodeValue = ` ${restoreLabel} `;
  }, 1800);
}

function saveCurrentRoute(button) {
  if (!currentRoute || !currentRoute.stops.length) {
    showToast('There is no route to save yet.');
    return;
  }

  const snapshot = getRouteSnapshot();
  const snapshotKey = getRouteSnapshotKey(snapshot);
  const savedRoutes = getSavedRoutes();
  const existingIndex = savedRoutes.findIndex(route => getRouteSnapshotKey(route) === snapshotKey);

  if (existingIndex >= 0) {
    savedRoutes[existingIndex] = { ...savedRoutes[existingIndex], ...snapshot };
  } else {
    savedRoutes.unshift(snapshot);
  }

  try {
    window.localStorage.setItem(SAVED_ROUTES_STORAGE_KEY, JSON.stringify(savedRoutes.slice(0, 25)));
    setActionButtonTemporaryLabel(button, 'Saved', 'Save');
    showToast(existingIndex >= 0 ? '✓ Saved route updated' : '✓ Route saved to this browser');
  } catch (error) {
    showToast('Could not save this route in localStorage.');
  }
}

function buildShareText() {
  const stopLines = (currentRoute?.stops || [])
    .map((stop, index) => `${index + 1}. ${stop.name}`)
    .join('\n');
  const pageUrl = window.location.href.split('#')[0];

  return [
    'Kandid Spot',
    `${state.area} · ${state.time} · ${state.mood}`,
    currentRoute?.mapLabel || currentRoute?.label || 'Route',
    state.activeRefinement ? `Refinement: ${state.activeRefinement}` : '',
    stopLines,
    pageUrl,
  ].filter(Boolean).join('\n');
}

async function shareCurrentRoute() {
  if (!currentRoute || !currentRoute.stops.length) {
    showToast('There is no route to share yet.');
    return;
  }

  const text = buildShareText();

  try {
    if (navigator.share) {
      await navigator.share({ title: 'Kandid Spot route', text });
      showToast('✓ Route shared');
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      showToast('✓ Route copied to clipboard');
      return;
    }

    window.prompt('Copy this route:', text);
    showToast('Copy the route from the prompt.');
  } catch (error) {
    if (error && error.name === 'AbortError') {
      showToast('Share cancelled.');
      return;
    }
    showToast('Could not share this route.');
  }
}

function getPrimaryRouteStop() {
  if (!currentRoute || !currentRoute.stops.length) return null;
  if (Number.isInteger(state.activeStop) && currentRoute.stops[state.activeStop]) {
    return currentRoute.stops[state.activeStop];
  }
  return currentRoute.stops[0];
}

function getKakaoStopUrl(stop) {
  if (!stop || !hasValidCoords(stop.coords)) return '';
  return `https://map.kakao.com/link/map/${encodeURIComponent(stop.name)},${stop.coords.lat},${stop.coords.lng}`;
}

function getNaverStopUrl(stop) {
  if (!stop) return '';
  const naverUrl = typeof stop.place?.naverMapUrl === 'string' ? stop.place.naverMapUrl.trim() : '';
  if (naverUrl) return naverUrl;

  const query = [stop.name, stop.place?.address || ''].filter(Boolean).join(' ');
  return query ? `https://map.naver.com/p/search/${encodeURIComponent(query)}` : '';
}

function openCurrentRouteInMap() {
  const stop = getPrimaryRouteStop();
  if (!stop) {
    showToast('There is no route stop to open yet.');
    return;
  }

  const provider = getActiveMapProvider();
  const url = provider === 'naver' ? getNaverStopUrl(stop) : getKakaoStopUrl(stop);
  if (!url) {
    showToast(`No ${provider === 'naver' ? 'Naver' : 'Kakao'} map link is available for this stop.`);
    return;
  }

  const opened = window.open(url, '_blank');
  if (!opened) {
    showToast('Allow popups to open this map link.');
    return;
  }
  opened.opener = null;

  showToast(`Opening ${provider === 'naver' ? 'Naver' : 'Kakao'} Map for ${stop.name}…`);
}

document.querySelectorAll('.act-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const a = btn.dataset.action;
    if (a === 'save') saveCurrentRoute(btn);
    if (a === 'share') shareCurrentRoute();
    if (a === 'map') openCurrentRouteInMap();
  });
});

document.getElementById('saved-btn').addEventListener('click', () => {
  const savedRoutes = getSavedRoutes();
  showToast(savedRoutes.length ? `${savedRoutes.length} saved route${savedRoutes.length === 1 ? '' : 's'} in this browser.` : 'No saved routes yet — save this one to start your guide.');
});

// ========== Ask Miro drawer ==========
const askDrawer = document.getElementById('ask-drawer');
const askThread = document.getElementById('ask-thread');
const askInput = document.getElementById('ask-input');
const askSend = document.getElementById('ask-send');

document.getElementById('ask-fab').addEventListener('click', () => openAsk());
document.getElementById('ask-close').addEventListener('click', () => closeAsk());
document.getElementById('ask-overlay').addEventListener('click', () => closeAsk());

function openAsk() {
  askDrawer.classList.add('open');
  askDrawer.setAttribute('aria-hidden', 'false');
  setTimeout(() => askInput.focus(), 280);
}
function closeAsk() {
  askDrawer.classList.remove('open');
  askDrawer.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.ask-suggest').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.dataset.q;
    askWith(btn.textContent.trim(), getAskResponse(q));
  });
});

askSend.addEventListener('click', sendAskInput);
askInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendAskInput(); });

function sendAskInput() {
  const v = askInput.value.trim();
  if (!v) return;
  askInput.value = '';
  const lower = v.toLowerCase();
  let key = 'why';
  if (lower.includes('crowd') || lower.includes('busy') || lower.includes('quiet')) key = 'crowd';
  else if (lower.match(/\d+\s?(min|hour|hr)/) || lower.includes('time') || lower.includes('shorter')) key = 'time';
  else if (lower.includes('cafe') || lower.includes('coffee')) key = 'cafe';
  else if (lower.includes('cheap') || lower.includes('₩') || lower.includes('budget')) key = 'cheap';
  else if (lower.includes('open') || lower.includes('closed') || lower.includes('now')) key = 'open';
  askWith(v, getAskResponse(key));
}

function getAskResponse(key) {
  const response = ASK_RESPONSES[key] || ASK_RESPONSES.why;
  return typeof response === 'function' ? response(currentRoute) : response;
}

function askWith(question, answer) {
  const suggHead = askThread.querySelector('.ask-suggest-head');
  const suggList = askThread.querySelector('.ask-suggestions');
  if (suggHead) suggHead.remove();
  if (suggList) suggList.remove();

  const userMsg = document.createElement('div');
  userMsg.className = 'ask-msg from-user';
  userMsg.innerHTML = `<div class="ask-bubble">${escapeHtml(question)}</div>`;
  askThread.appendChild(userMsg);
  scrollAsk();

  const typing = document.createElement('div');
  typing.className = 'ask-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  askThread.appendChild(typing);
  scrollAsk();

  setTimeout(() => {
    typing.remove();
    const reply = document.createElement('div');
    reply.className = 'ask-msg from-miro';
    reply.innerHTML = `<div class="ask-bubble">${answer}</div>`;
    askThread.appendChild(reply);
    scrollAsk();
  }, 800);
}

function scrollAsk() {
  setTimeout(() => { askThread.scrollTop = askThread.scrollHeight; }, 40);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ========== Toast ==========
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ========== Esc key handlers ==========
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (askDrawer.classList.contains('open')) closeAsk();
    else if (document.getElementById('float-card').classList.contains('show')) {
      hideFloatCard();
    }
  }
});

// ========== Onboarding (3-step first-use flow) ==========
const OB_LOADING_STEPS = [
  'Reading the streets of {area}',
  'Checking walking time',
  'Matching your mood',
  'Avoiding obvious tourist traps',
  'Finding a route you can start now',
];

const onboarding = {
  el: document.getElementById('onboarding'),
  loadingEl: document.getElementById('ob-loading'),
  loadingStepEl: document.getElementById('ob-loading-step'),
  currentEl: document.getElementById('ob-current'),
  step: 1,
  selections: { area: null, time: null, mood: null },

  init() {
    this.el.querySelectorAll('.ob-options').forEach(group => {
      const groupKey = group.dataset.group;
      group.addEventListener('click', e => {
        const btn = e.target.closest('.ob-option');
        if (!btn) return;
        group.querySelectorAll('.ob-option').forEach(o => o.classList.remove('selected'));
        btn.classList.add('selected');
        this.selections[groupKey] = btn.dataset.value;
        this.updateNextEnabled();
      });
    });

    this.el.querySelectorAll('.ob-screen').forEach(screen => {
      screen.querySelector('.ob-next').addEventListener('click', () => this.nextStep());
      screen.querySelector('.ob-back').addEventListener('click', () => this.prevStep());
    });

    document.addEventListener('keydown', e => {
      if (!this.el.classList.contains('active')) return;
      if (e.key !== 'Enter') return;
      const screen = this.el.querySelector(`.ob-screen[data-step="${this.step}"]`);
      const nextBtn = screen?.querySelector('.ob-next');
      if (nextBtn && !nextBtn.disabled) nextBtn.click();
    });
  },

  goToStep(n) {
    this.step = n;
    this.el.querySelectorAll('.ob-screen').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.step) === n);
    });
    this.el.querySelectorAll('.ob-step').forEach(s => {
      const sn = parseInt(s.dataset.step);
      s.classList.toggle('done', sn < n);
      s.classList.toggle('active', sn === n);
    });
    this.currentEl.textContent = n;
    this.el.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateNextEnabled();
  },

  updateNextEnabled() {
    const screen = this.el.querySelector(`.ob-screen[data-step="${this.step}"]`);
    if (!screen) return;
    const groupKey = screen.querySelector('.ob-options').dataset.group;
    screen.querySelector('.ob-next').disabled = !this.selections[groupKey];
  },

  nextStep() {
    if (this.step < 3) {
      this.goToStep(this.step + 1);
    } else {
      this.triggerBuild();
    }
  },

  prevStep() {
    if (this.step > 1) this.goToStep(this.step - 1);
  },

  triggerBuild() {
    this.el.classList.remove('active');
    this.loadingEl.classList.add('active');
    this.loadingEl.setAttribute('aria-hidden', 'false');

    const stepsForArea = OB_LOADING_STEPS.map(s => s.replace('{area}', this.selections.area));
    let i = 0;
    this.loadingStepEl.textContent = stepsForArea[0];
    const interval = setInterval(() => {
      i++;
      if (i >= stepsForArea.length) {
        clearInterval(interval);
        this.reveal();
      } else {
        this.loadingStepEl.textContent = stepsForArea[i];
      }
    }, 480);
  },

  reveal() {
    Object.assign(state, this.selections);
    syncBuilderChips();

    setBuilderCollapsed(true);
    loadingState.classList.remove('active');
    this.loadingStepEl.textContent = 'Loading real places...';

    ensureRealPlacesLoaded().then(() => {
      applyRouteForCurrentSelection();

      this.loadingEl.classList.remove('active');
      this.loadingEl.setAttribute('aria-hidden', 'true');
      document.getElementById('main-app').classList.remove('hidden');

      window.setTimeout(() => {
        ensureActiveMap();
      }, 0);
    });
  },

  restart(preserveSelections = true) {
    if (preserveSelections) {
      ['area', 'time', 'mood'].forEach(key => {
        const value = state[key];
        const group = this.el.querySelector(`.ob-options[data-group="${key}"]`);
        if (group) {
          group.querySelectorAll('.ob-option').forEach(o => {
            o.classList.toggle('selected', o.dataset.value === value);
          });
          this.selections[key] = value;
        }
      });
    } else {
      this.selections = { area: null, time: null, mood: null };
      this.el.querySelectorAll('.ob-option').forEach(o => o.classList.remove('selected'));
    }
    document.getElementById('main-app').classList.add('hidden');
    this.loadingEl.classList.remove('active');
    this.el.classList.add('active');
    this.goToStep(1);
  },
};

function syncBuilderChips() {
  ['area', 'time', 'mood'].forEach(key => {
    const group = document.querySelector(`#main-app .builder [data-group="${key}"]`);
    if (!group) return;
    const value = state[key];
    group.querySelectorAll('.chip').forEach(c => {
      c.classList.toggle('selected', c.dataset.value === value);
    });
  });
}

document.getElementById('new-btn').addEventListener('click', () => {
  onboarding.restart(true);
  showToast('Pick again — your previous choices are pre-filled.');
});

// ========== Init ==========
bindMapProviderControls();
bindMapControls();
onboarding.init();
preloadKakaoSdk();
if (!MOCK_ROUTES_ENABLED) {
  console.log('Miro mock fallback disabled');
}
ensureRealPlacesLoaded();
