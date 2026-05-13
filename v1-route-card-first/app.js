// ---- Mock data ----
const STOPS = [
  {
    num: 1,
    name: 'Yeonnam Galmaegisal',
    type: 'Backstreet BBQ · Korean',
    stay: 50,
    walk: 0,
    why: 'Locals-only spot tucked behind the main drag. Skin-on pork belly, simple banchan, no tourist menu. The grandma running it remembers regulars.',
    next: 'Walk 6 min west into the residential lanes →'
  },
  {
    num: 2,
    name: 'Yeonnam-dong Backstreets',
    type: 'Quiet residential walk',
    stay: 25,
    walk: 6,
    why: 'A real neighborhood, not a photo spot. Old single-story houses, hand-painted shutters, neighborhood cats. Phone away, eyes up.',
    next: 'Cut through Yeontral Park — 5 min →'
  },
  {
    num: 3,
    name: 'Cafe Slow Steps',
    type: 'Tiny dessert cafe · 10 seats',
    stay: 30,
    walk: 5,
    why: 'You picked quiet — this place has no Instagram tag and a single seasonal dessert. Owner roasts on-site. The kind of café you remember.',
    next: 'One last hidden stop, 7 min →'
  },
  {
    num: 4,
    name: 'Gimbap Records',
    type: 'Hidden record shop',
    stay: 15,
    walk: 7,
    why: 'A vinyl shop the size of a closet, run by a guy who used to play indie clubs in the 90s. You don\'t need to buy anything — just flip through.',
    next: 'Route complete. Subway 4 min away.'
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
};

// ---- Chip selection ----
document.querySelectorAll('.chip-row').forEach(row => {
  row.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    row.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
    const group = row.dataset.group;
    state[group] = btn.dataset.value;
  });
});

// ---- Build button ----
const buildBtn = document.getElementById('build-btn');
const builderView = document.getElementById('builder-view');
const loadingView = document.getElementById('loading-view');
const resultView = document.getElementById('result-view');
const loaderStep = document.getElementById('loader-step');

function showScreen(screen) {
  [builderView, loadingView, resultView].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

buildBtn.addEventListener('click', () => {
  showScreen(loadingView);
  let i = 0;
  loaderStep.textContent = LOADING_STEPS[0];
  const interval = setInterval(() => {
    i++;
    if (i >= LOADING_STEPS.length) {
      clearInterval(interval);
      renderResult();
      showScreen(resultView);
    } else {
      loaderStep.textContent = LOADING_STEPS[i];
    }
  }, 480);
});

document.getElementById('back-to-builder').addEventListener('click', () => {
  showScreen(builderView);
});

// ---- Render result ----
function renderResult() {
  document.getElementById('result-tag').textContent =
    `${state.area} · ${state.time} · ${state.mood}`;

  const stopsEl = document.getElementById('stops');
  stopsEl.innerHTML = '';
  STOPS.forEach((s, idx) => {
    if (s.walk > 0) {
      const seg = document.createElement('div');
      seg.className = 'stop-walk-segment';
      seg.innerHTML = `<span>↓</span> ${s.walk} min walk`;
      stopsEl.appendChild(seg);
    }
    const card = document.createElement('div');
    card.className = 'stop-card';
    card.dataset.idx = idx;
    card.innerHTML = `
      <div class="stop-card-num">${s.num}</div>
      <div class="stop-card-body">
        <div class="stop-card-name">${s.name}</div>
        <div class="stop-card-type">${s.type}</div>
        <div class="stop-card-meta">
          <span>⏱ ${s.stay} min stay</span>
          ${s.walk > 0 ? `<span>🚶 ${s.walk} min walk</span>` : ''}
        </div>
      </div>
      <svg class="stop-card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    `;
    card.addEventListener('click', () => openSheet(idx));
    stopsEl.appendChild(card);
  });
}

// ---- Pin click (map) ----
document.querySelectorAll('.pin').forEach(pin => {
  pin.addEventListener('click', () => {
    const idx = parseInt(pin.dataset.stop);
    openSheet(idx);
  });
});

// ---- Sheet (place detail) ----
const sheet = document.getElementById('sheet');
const sheetBody = document.getElementById('sheet-body');
document.getElementById('sheet-overlay').addEventListener('click', closeSheet);

function openSheet(idx) {
  const s = STOPS[idx];
  sheetBody.innerHTML = `
    <div class="detail-num">${s.num}</div>
    <div class="detail-name">${s.name}</div>
    <div class="detail-type">${s.type}</div>
    <div class="detail-stats">
      <div class="detail-stat">
        <div class="detail-stat-num">${s.stay} min</div>
        <div class="detail-stat-lbl">Suggested stay</div>
      </div>
      <div class="detail-stat">
        <div class="detail-stat-num">${s.walk > 0 ? s.walk + ' min' : 'Start'}</div>
        <div class="detail-stat-lbl">${s.walk > 0 ? 'Walk to here' : 'You begin here'}</div>
      </div>
    </div>
    <div class="detail-why">
      <div class="detail-why-head">Why it fits</div>
      <div class="detail-why-body">${s.why}</div>
    </div>
    <div class="detail-next">
      <span>→</span> ${s.next}
    </div>
  `;
  sheet.classList.add('open');
  sheet.setAttribute('aria-hidden', 'false');
}
function closeSheet() {
  sheet.classList.remove('open');
  sheet.setAttribute('aria-hidden', 'true');
}

// ---- Refine chips ----
const REFINE_TEXTS = {
  walk: 'Adjusted: Miro pulled the loop tighter — total walking now 12 min.',
  local: 'Adjusted: Even more locals-only spots, fewer photo cafes.',
  cheap: 'Adjusted: Swapped stop 1 for a ₩9k noodle counter.',
  cafe: 'Adjusted: Added a second tiny cafe at the end.',
  quiet: 'Adjusted: Avoided the main exit area and Saturday-busy streets.',
  open: 'Adjusted: Hiding 1 stop that\'s closed right now.',
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
      flashWhy(key);
    }
  });
});

function flashWhy(key) {
  const why = document.getElementById('why-body');
  why.style.transition = 'background 0.4s';
  why.style.background = 'rgba(20, 184, 166, 0.12)';
  setTimeout(() => { why.style.background = 'transparent'; }, 800);
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
