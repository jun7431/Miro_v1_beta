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
  walk: { applied: 'Loop tightened — walking now ~12 min total.', undo: 'Restored original walking distance.' },
  local: { applied: 'Swapped photo cafe for a backstreet local-only spot.', undo: 'Reverted local-mix change.' },
  cheap: { applied: 'Replaced stop 1 with a ₩9k handmade noodle counter.', undo: 'Restored original stop 1.' },
  cafe: { applied: 'Added a second tiny cafe before the record shop.', undo: 'Removed the extra cafe.' },
  quiet: { applied: 'Routing around Saturday-busy streets — side lanes only.', undo: 'Allowing busier streets again.' },
  open: { applied: 'Hiding 1 stop that\'s closed right now. Replaced with a late-night ramen counter.', undo: 'Showing all stops regardless of hours.' },
};

const ASK_RESPONSES = {
  why: route => route.ask.why,
  crowd: route => route.ask.crowd,
  time: route => `Yes — for ${route.label}, cut stop 4 and trim the longest stay. You can keep the first three stops to about 90 minutes.`,
  cafe: route => route.ask.cafe,
  cheap: route => `I can keep ${route.label} budget-friendly by making stop 1 the main spend and turning the last stop into a browse-only stop.`,
  open: route => `For this mock route, I am not checking live hours yet. Before going, verify ${route.stops.map(stop => stop.name).slice(0, 2).join(' and ')} first.`,
};

// ========== State ==========
const state = {
  area: 'Hongdae',
  time: '2 hours',
  mood: 'Local food',
  applied: new Set(),
  activeStop: null,
  routeKey: 'hongdae',
};

let currentRoute = ROUTES[state.routeKey];

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
  currentRoute = ROUTES[state.routeKey];
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
  rsSummary.textContent = `${currentRoute.label} · ${state.time} · ${state.mood}`;
  document.getElementById('map-location-label').textContent = currentRoute.mapLabel;
  document.getElementById('why-body').textContent = currentRoute.why;

  const metaValues = document.querySelectorAll('.route-meta strong');
  if (metaValues[0]) metaValues[0].textContent = String(currentRoute.stops.length);
  if (metaValues[1]) metaValues[1].textContent = currentRoute.meta.total;
  if (metaValues[2]) metaValues[2].textContent = currentRoute.meta.walking;
}

function renderStops() {
  const list = document.getElementById('stops');
  list.innerHTML = '';
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
    item.innerHTML = `
      <div class="stop-num-col">
        <div class="stop-num">${s.num}</div>
        <div class="stop-line"></div>
      </div>
      <div class="stop-body">
        <div class="stop-name">${s.name}</div>
        <div class="stop-type">${s.type}</div>
        <div class="stop-meta">
          <span class="stop-tag">⏱ ${s.stay} min</span>
          ${s.tags.map(t => `<span class="stop-tag">${t}</span>`).join('')}
        </div>
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
  return (window.MIRO_NAVER_MAPS_NCP_KEY_ID || '').trim();
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
  hideFloatCard();
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

function ensureNaverMap() {
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

      const mapEl = getMapElement();
      if (!mapEl) {
        logNaverMapError('Naver map container missing');
        return;
      }

      const center = new window.naver.maps.LatLng(currentRoute.center.lat, currentRoute.center.lng);
      naverMapState.map = new window.naver.maps.Map(mapEl, {
        center,
        zoom: 14,
      });

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

  const path = currentRoute.stops.map(stop => (
    new window.kakao.maps.LatLng(stop.coords.lat, stop.coords.lng)
  ));

  kakaoMapState.polyline = new window.kakao.maps.Polyline({
    path,
    strokeWeight: 5,
    strokeColor: '#2563EB',
    strokeOpacity: 0.95,
    strokeStyle: 'shortdash',
  });
  kakaoMapState.polyline.setMap(kakaoMapState.map);

  kakaoMapState.markers = currentRoute.stops.map((stop, idx) => {
    const position = path[idx];
    const content = createKakaoMarkerElement(stop, idx);
    const overlay = new window.kakao.maps.CustomOverlay({
      position,
      content,
      xAnchor: 0.5,
      yAnchor: 1.05,
      zIndex: 100 + idx,
    });

    overlay.setMap(kakaoMapState.map);
    return { overlay, element: content, position };
  });

  updateMarkerActive();
  if (fit) fitKakaoRouteBounds();
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

  const path = currentRoute.stops.map(stop => (
    new window.naver.maps.LatLng(stop.coords.lat, stop.coords.lng)
  ));

  naverMapState.polyline = new window.naver.maps.Polyline({
    map: naverMapState.map,
    path,
    strokeWeight: 5,
    strokeColor: '#2563EB',
    strokeOpacity: 0.95,
    strokeStyle: 'shortdash',
  });

  naverMapState.markers = currentRoute.stops.map((stop, idx) => {
    const marker = new window.naver.maps.Marker({
      map: naverMapState.map,
      position: path[idx],
      icon: createNaverMarkerIcon(stop, idx, state.activeStop === idx),
      zIndex: 100 + idx,
    });

    window.naver.maps.Event.addListener(marker, 'click', () => {
      activateStop(idx, { source: 'marker' });
    });

    return { marker, position: path[idx] };
  });

  updateMarkerActive();
  if (fit) fitNaverRouteBounds();
}

function clearKakaoRouteObjects() {
  if (kakaoMapState.polyline) {
    kakaoMapState.polyline.setMap(null);
    kakaoMapState.polyline = null;
  }

  kakaoMapState.markers.forEach(marker => marker.overlay.setMap(null));
  kakaoMapState.markers = [];
}

function clearNaverRouteObjects() {
  if (naverMapState.polyline) {
    naverMapState.polyline.setMap(null);
    naverMapState.polyline = null;
  }

  naverMapState.markers.forEach(marker => marker.marker.setMap(null));
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

function fitKakaoRouteBounds() {
  if (!kakaoMapState.map || !window.kakao || !window.kakao.maps) return;

  const bounds = new window.kakao.maps.LatLngBounds();
  currentRoute.stops.forEach(stop => {
    bounds.extend(new window.kakao.maps.LatLng(stop.coords.lat, stop.coords.lng));
  });

  try {
    kakaoMapState.map.setBounds(bounds, 64, 64, 104, 64);
  } catch (error) {
    kakaoMapState.map.setBounds(bounds);
  }
}

function fitNaverRouteBounds() {
  if (!naverMapState.map || !window.naver || !window.naver.maps) return;

  const lats = currentRoute.stops.map(stop => stop.coords.lat);
  const lngs = currentRoute.stops.map(stop => stop.coords.lng);
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
    const isActive = state.activeStop === idx;
    marker.element.classList.toggle('active', isActive);
    if (typeof marker.overlay.setZIndex === 'function') {
      marker.overlay.setZIndex(isActive ? 1000 : 100 + idx);
    }
  });

  naverMapState.markers.forEach((marker, idx) => {
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
    const key = chip.dataset.refine;
    if (state.applied.has(key)) {
      state.applied.delete(key);
      chip.classList.remove('applied');
      showToast(REFINE_TEXTS[key].undo);
    } else {
      state.applied.add(key);
      chip.classList.add('applied');
      showToast(REFINE_TEXTS[key].applied);
      flashWhy();
    }
  });
});

function flashWhy() {
  const why = document.getElementById('why-body');
  why.style.transition = 'background 0.4s';
  why.style.background = 'rgba(20, 184, 166, 0.14)';
  setTimeout(() => { why.style.background = 'transparent'; }, 700);
}

// ========== Action bar ==========
document.querySelectorAll('.act-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const a = btn.dataset.action;
    if (a === 'save') showToast('✓ Route saved to your guide');
    if (a === 'share') showToast('✓ Link copied to clipboard');
    if (a === 'map') showToast(`Opening ${currentRoute.label} route in your map app…`);
  });
});

document.getElementById('saved-btn').addEventListener('click', () => {
  showToast('No saved routes yet — save this one to start your guide.');
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
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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
    applyRouteForCurrentSelection();
    syncBuilderChips();

    setBuilderCollapsed(true);
    loadingState.classList.remove('active');

    this.loadingEl.classList.remove('active');
    this.loadingEl.setAttribute('aria-hidden', 'true');
    document.getElementById('main-app').classList.remove('hidden');

    window.setTimeout(() => {
      ensureActiveMap();
    }, 0);
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
applyRouteForCurrentSelection();
bindMapProviderControls();
bindMapControls();
onboarding.init();
preloadKakaoSdk();
