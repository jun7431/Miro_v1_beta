// ---- Mock data ----
const STOPS = [
  {
    num: 1,
    name: 'Yeonnam Galmaegisal',
    type: 'Backstreet BBQ · Korean',
    stay: 50,
    walk: 0,
    why: 'Locals-only spot tucked behind the main drag. Skin-on pork belly, simple banchan.',
    next: 'Walk 6 min west into the residential lanes',
    tags: ['🍴 locals', '🤫 quiet', '💸 ₩12k pp'],
  },
  {
    num: 2,
    name: 'Yeonnam-dong Backstreets',
    type: 'Quiet residential walk',
    stay: 25,
    walk: 6,
    why: 'A real neighborhood, not a photo spot. Old houses, hand-painted shutters, neighborhood cats.',
    next: 'Cut through Yeontral Park — 5 min',
    tags: ['🌳 green', '🤫 quiet', '🚶 easy'],
  },
  {
    num: 3,
    name: 'Cafe Slow Steps',
    type: 'Tiny dessert cafe · 10 seats',
    stay: 30,
    walk: 5,
    why: 'No Instagram tag. One seasonal dessert. Owner roasts on-site.',
    next: 'One last hidden stop, 7 min',
    tags: ['☕ on-site roast', '💸 ₩8k', '🪑 10 seats'],
  },
  {
    num: 4,
    name: 'Gimbap Records',
    type: 'Hidden record shop',
    stay: 15,
    walk: 7,
    why: 'A vinyl shop the size of a closet, run by a 90s indie-club veteran.',
    next: 'Route complete · subway 4 min away',
    tags: ['🎵 indie', '🗝️ hidden', '🆓 free to browse'],
  },
];

const LOADING_STEPS = [
  'Reading the streets of Hongdae',
  'Asking who\'s actually there',
  'Skipping the busy main strip',
  'Picking 4 stops that fit your time',
  'Drawing your route',
];

// ---- State ----
const state = {
  area: 'Hongdae / Yeonnam',
  time: '2–3 hours',
  mood: 'Local food',
  applied: new Set(),
  activeStop: null,
};

// ---- Builder overlay ----
const builderOverlay = document.getElementById('builder-overlay');
document.getElementById('edit-builder').addEventListener('click', () => builderOverlay.classList.add('open'));
document.getElementById('builder-close').addEventListener('click', () => builderOverlay.classList.remove('open'));

// ---- Chip / time selection ----
document.querySelectorAll('[data-group]').forEach(row => {
  row.addEventListener('click', e => {
    const btn = e.target.closest('.chip, .time-tile');
    if (!btn) return;
    row.querySelectorAll('.chip, .time-tile').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
    state[row.dataset.group] = btn.dataset.value;
  });
});

// ---- Build button ----
const buildBtn = document.getElementById('build-btn');
const loadingOverlay = document.getElementById('loading-overlay');
const loaderStep = document.getElementById('loader-step');

buildBtn.addEventListener('click', () => {
  builderOverlay.classList.remove('open');
  triggerBuild();
});

function triggerBuild() {
  loadingOverlay.classList.add('active');
  let i = 0;
  loaderStep.textContent = LOADING_STEPS[0];
  const interval = setInterval(() => {
    i++;
    if (i >= LOADING_STEPS.length) {
      clearInterval(interval);
      loadingOverlay.classList.remove('active');
      renderItinerary();
      updateTopMeta();
    } else {
      loaderStep.textContent = LOADING_STEPS[i];
    }
  }, 460);
}

function updateTopMeta() {
  const meta = document.getElementById('top-meta');
  meta.querySelector('[data-key="area"]').textContent = state.area;
  meta.querySelector('[data-key="time"]').textContent = state.time;
  meta.querySelector('[data-key="mood"]').textContent = state.mood;
}

// ---- Itinerary render ----
function renderItinerary() {
  const list = document.getElementById('itinerary-list');
  list.innerHTML = '';
  STOPS.forEach((s, idx) => {
    const item = document.createElement('div');
    item.className = 'itin-stop';
    item.dataset.idx = idx;
    item.innerHTML = `
      <div class="itin-num-col">
        <div class="itin-num">${s.num}</div>
        <div class="itin-line"></div>
      </div>
      <div class="itin-body">
        <div class="itin-name">${s.name}</div>
        <div class="itin-type">${s.type}</div>
        <div class="itin-meta">
          <span>⏱ ${s.stay} min</span>
          ${s.walk > 0 ? `<span>🚶 ${s.walk} min walk</span>` : '<span>📍 start</span>'}
          ${s.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>
    `;
    item.addEventListener('click', () => activateStop(idx));
    list.appendChild(item);
  });

  // also render mobile sheet
  const ms = document.getElementById('ms-cards');
  if (ms) {
    ms.innerHTML = '';
    STOPS.forEach((s, idx) => {
      const c = document.createElement('div');
      c.className = 'itin-stop';
      c.dataset.idx = idx;
      c.innerHTML = `
        <div class="itin-num-col"><div class="itin-num">${s.num}</div></div>
        <div class="itin-body">
          <div class="itin-name">${s.name}</div>
          <div class="itin-type">${s.type} · ⏱ ${s.stay} min</div>
        </div>
      `;
      c.addEventListener('click', () => activateStop(idx));
      ms.appendChild(c);
    });
  }
}

// ---- Stop activation (sync map + list) ----
function activateStop(idx) {
  state.activeStop = idx;
  document.querySelectorAll('.itin-stop').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.idx) === idx);
  });
  document.querySelectorAll('.map-pin').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.stop) === idx);
  });
  // float card
  const s = STOPS[idx];
  const card = document.getElementById('float-card');
  document.getElementById('float-num').textContent = s.num;
  document.getElementById('float-name').textContent = s.name;
  document.getElementById('float-type').textContent = s.type;
  document.getElementById('float-stay').textContent = `⏱ ${s.stay} min stay`;
  document.getElementById('float-walk').textContent = s.walk > 0 ? `🚶 ${s.walk} min walk` : '📍 starting point';
  card.classList.add('show');

  // scroll active item into view in left pane
  const activeEl = document.querySelector(`.left-pane .itin-stop[data-idx="${idx}"]`);
  if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ---- Map pin clicks ----
document.querySelectorAll('.map-pin').forEach(pin => {
  pin.addEventListener('click', () => activateStop(parseInt(pin.dataset.stop)));
});

// click outside float card to dismiss
document.getElementById('map-stage').addEventListener('click', e => {
  if (!e.target.closest('.map-pin') && !e.target.closest('.float-card')) {
    document.getElementById('float-card').classList.remove('show');
  }
});

// ---- Refine ----
const REFINE_TEXTS = {
  walk: 'Loop tightened — walking now ~12 min total.',
  local: 'Swapped photo cafe for a backstreet local-only spot.',
  cheap: 'Replaced stop 1 with a ₩9k noodle counter.',
  cafe: 'Added a second tiny cafe before the record shop.',
  quiet: 'Avoided the busy Saturday main strip.',
  open: 'Hiding 1 stop that\'s closed right now.',
};
document.querySelectorAll('.refine-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const key = chip.dataset.refine;
    if (state.applied.has(key)) {
      state.applied.delete(key);
      chip.classList.remove('applied');
    } else {
      state.applied.add(key);
      chip.classList.add('applied');
      showToast(REFINE_TEXTS[key]);
      flashWhy();
    }
  });
});
function flashWhy() {
  const why = document.getElementById('why-body');
  const original = why.style.background;
  why.style.transition = 'background 0.4s';
  why.style.background = 'rgba(20, 184, 166, 0.12)';
  setTimeout(() => { why.style.background = original; }, 700);
}

// ---- Action buttons ----
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const a = btn.dataset.action;
    if (a === 'save') showToast('✓ Route saved to your guide');
    if (a === 'share') showToast('✓ Link copied to clipboard');
    if (a === 'map') showToast('Opening route in your map app…');
  });
});

// ---- Toast ----
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ---- Initial render ----
renderItinerary();
