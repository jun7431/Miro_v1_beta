// ---- Mock data ----
const STOPS = [
  {
    num: 1,
    emoji: '🥩',
    name: 'Yeonnam Galmaegisal',
    type: 'Backstreet BBQ · Korean',
    stay: 50,
    walk: 0,
    quote: '"This is where neighbors actually eat — not where guidebooks send you."',
    why: 'You said quiet local food, so I\'m skipping the main strip entirely. This is a tiny pork-belly grill behind the BBQ alley. Skin-on cuts, three banchan, no English menu. The grandma who runs it remembers regulars after one visit.',
    next: 'Then we walk 6 minutes west — into the lanes',
    cx: 60, cy: 130,
  },
  {
    num: 2,
    emoji: '🚶',
    name: 'Yeonnam-dong Backstreets',
    type: 'Quiet residential walk',
    stay: 25,
    walk: 6,
    quote: '"Phone in pocket. Eyes up. This is the part of Hongdae most visitors never see."',
    why: 'A working neighborhood — single-story houses, hand-painted shutters, neighborhood cats. There\'s no destination here, that\'s the point. Walk slow.',
    next: 'I\'ll route you through Yeontral Park — 5 min',
    cx: 130, cy: 100,
  },
  {
    num: 3,
    emoji: '☕',
    name: 'Cafe Slow Steps',
    type: 'Tiny dessert cafe · 10 seats',
    stay: 30,
    walk: 5,
    quote: '"Ten seats. One seasonal dessert. The owner roasts every morning."',
    why: 'You wanted quiet — this place doesn\'t have a hashtag. They make one dessert that changes by season, and the coffee is roasted on-site. Read a book here.',
    next: 'One last hidden spot, 7 min away',
    cx: 230, cy: 80,
  },
  {
    num: 4,
    emoji: '🎵',
    name: 'Gimbap Records',
    type: 'Hidden record shop',
    stay: 15,
    walk: 7,
    quote: '"A vinyl shop the size of a closet. Run by a 90s indie-club guy."',
    why: 'You don\'t need to buy anything. Flip through a few crates, talk music if you feel like it. It closes at 10. Subway is a 4-minute walk after.',
    next: 'Route complete. You\'ve seen the real Hongdae.',
    cx: 280, cy: 145,
  },
];

const REFINE_TEXTS = {
  walk: { applied: 'Got it — pulling the loop tighter. Walking time now ~12 min total. Same vibe, less ground covered.', undo: 'Restored full walking distance.' },
  local: { applied: 'Even more locals-only — I\'m removing the photo cafe and adding a backstreet noodle counter.', undo: 'Reverted to the original mix.' },
  cheap: { applied: 'Swapped stop 1 for a ₩9k handmade noodle place. Same alley, half the price.', undo: 'Restored original stop 1.' },
  cafe: { applied: 'Added a second tiny cafe before the record shop — you\'ll have two coffee moments.', undo: 'Removed the extra cafe.' },
  quiet: { applied: 'Routing you around the busy Saturday strip. Side streets only.', undo: 'Allowing the busier streets again.' },
  open: { applied: 'Hiding 1 stop that\'s closed right now. Replaced with a ramen counter that\'s open till 11.', undo: 'Showing all stops regardless of hours.' },
};

const state = {
  area: null,
  time: null,
  mood: null,
  step: 'greet',
  applied: new Set(),
  routeShown: false,
};

const thread = document.getElementById('thread');
const quickReplies = document.getElementById('quick-replies');
const msgInput = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');

// ---- Utility ----
function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function scrollToBottom() {
  setTimeout(() => { thread.scrollTop = thread.scrollHeight; }, 50);
}

function addMsg(text, from = 'miro', delay = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      const msg = document.createElement('div');
      msg.className = `msg from-${from}`;
      msg.innerHTML = `
        <div class="msg-bubble">${text}</div>
        <div class="msg-time">${nowTime()}</div>
      `;
      thread.appendChild(msg);
      scrollToBottom();
      resolve();
    }, delay);
  });
}

function showTyping(duration = 900) {
  return new Promise(resolve => {
    const t = document.createElement('div');
    t.className = 'typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    thread.appendChild(t);
    scrollToBottom();
    setTimeout(() => {
      t.remove();
      resolve();
    }, duration);
  });
}

function setQuickReplies(items) {
  quickReplies.innerHTML = '';
  items.forEach(it => {
    const btn = document.createElement('button');
    btn.className = 'quick-reply';
    btn.textContent = it.label;
    if (it.applied) btn.classList.add('applied');
    btn.addEventListener('click', () => {
      if (it.onClick) it.onClick(btn);
    });
    quickReplies.appendChild(btn);
  });
}

function clearQuickReplies() { quickReplies.innerHTML = ''; }

// ---- Conversation flow ----
async function startConversation() {
  thread.innerHTML = '';
  clearQuickReplies();
  state.area = state.time = state.mood = null;
  state.routeShown = false;
  state.applied.clear();
  state.step = 'greet';

  await showTyping(700);
  await addMsg("Hey, I'm Miro 👋 I'll plan one local route for you — not a list, just one route you can start walking right now.");
  await showTyping(800);
  await addMsg("Where are you, or where do you want to go?");
  state.step = 'area';
  setQuickReplies([
    { label: 'Hongdae', onClick: () => pickArea('Hongdae') },
    { label: 'Seongsu', onClick: () => pickArea('Seongsu') },
    { label: 'Itaewon', onClick: () => pickArea('Itaewon') },
    { label: 'Bukchon', onClick: () => pickArea('Bukchon') },
    { label: 'Yeonnam', onClick: () => pickArea('Yeonnam') },
  ]);
}

async function pickArea(area) {
  state.area = area;
  clearQuickReplies();
  await addMsg(area, 'user');
  await showTyping(700);
  await addMsg(`Nice, ${area}. ⏱ How much time do you actually have?`);
  state.step = 'time';
  setQuickReplies([
    { label: '1 hour', onClick: () => pickTime('1 hour') },
    { label: '2 hours', onClick: () => pickTime('2 hours') },
    { label: '3 hours', onClick: () => pickTime('3 hours') },
    { label: 'Half day', onClick: () => pickTime('Half day') },
  ]);
}

async function pickTime(time) {
  state.time = time;
  clearQuickReplies();
  await addMsg(time, 'user');
  await showTyping(800);
  await addMsg("Last thing — what's the vibe? Be honest, I won't judge a midnight ramen run.");
  state.step = 'mood';
  setQuickReplies([
    { label: '🍜 Local food + quiet walk', onClick: () => pickMood('Local food + quiet walk') },
    { label: '☕ Cafe hopping', onClick: () => pickMood('Cafe hopping') },
    { label: '🗝️ Hidden spots', onClick: () => pickMood('Hidden spots') },
    { label: '🌇 Sunset stroll', onClick: () => pickMood('Sunset stroll') },
    { label: '🌙 Night vibe', onClick: () => pickMood('Night vibe') },
  ]);
}

async function pickMood(mood) {
  state.mood = mood;
  clearQuickReplies();
  await addMsg(mood, 'user');
  await showTyping(800);
  await addMsg("Got it. Give me a sec — I'm pulling out the routes locals actually take…");
  await showTyping(1500);
  await addMsg("Okay. This one's good. Here you go ↓");
  await renderRoute();
}

// ---- Route render ----
async function renderRoute() {
  state.routeShown = true;

  // Summary card
  const summary = buildCard(`
    <div class="rs-stamp">A Miro route ✦</div>
    <div class="rs-title">A quiet Hongdae plate-and-walk</div>
    <div class="rs-tags">
      <span class="rs-tag">🚶 walkable</span>
      <span class="rs-tag">🤫 quiet</span>
      <span class="rs-tag">🍴 locals eat here</span>
      <span class="rs-tag">💸 ~₩28k pp</span>
    </div>
    <div class="rs-stats">
      <div class="rs-stat"><strong>4</strong><span>stops</span></div>
      <div class="rs-stat"><strong>2h 05m</strong><span>total</span></div>
      <div class="rs-stat"><strong>18 min</strong><span>walking</span></div>
    </div>
  `, 'route-summary');
  thread.appendChild(summary);
  scrollToBottom();
  await wait(400);

  // Mini map
  const mapHTML = `
    <div class="mini-map-head"><strong>Map preview</strong><span>${state.area} · ${state.time}</span></div>
    <svg class="mini-map-svg" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-v3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="320" height="200" fill="#F8FAFC"/>
      <rect width="320" height="200" fill="url(#grid-v3)"/>
      <path d="M 0 130 L 320 130" stroke="#E5E7EB" stroke-width="6"/>
      <path d="M 120 0 L 120 200" stroke="#E5E7EB" stroke-width="6"/>
      <rect x="40" y="20" width="60" height="40" rx="6" fill="#D1FAE5" opacity="0.7"/>
      <text x="70" y="44" text-anchor="middle" font-size="9" fill="#047857" font-family="Inter">Yeonnam Park</text>
      <path d="M ${STOPS[0].cx} ${STOPS[0].cy} Q ${STOPS[1].cx} ${STOPS[1].cy-10} ${STOPS[1].cx} ${STOPS[1].cy} T ${STOPS[2].cx} ${STOPS[2].cy} T ${STOPS[3].cx} ${STOPS[3].cy}" fill="none" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 5"/>
      ${STOPS.map((s, i) => `
        <g class="pin" data-stop="${i}">
          <circle cx="${s.cx}" cy="${s.cy}" r="11" fill="#2563EB"/>
          <text x="${s.cx}" y="${s.cy + 4}" text-anchor="middle" font-size="11" fill="white" font-weight="700" font-family="Inter">${s.num}</text>
        </g>
      `).join('')}
    </svg>
  `;
  const mapCard = buildCard(mapHTML, 'mini-map-card');
  thread.appendChild(mapCard);
  mapCard.querySelectorAll('.pin').forEach(pin => {
    pin.addEventListener('click', () => openPlace(parseInt(pin.dataset.stop)));
  });
  scrollToBottom();
  await wait(450);

  await showTyping(900);
  await addMsg("Here's why I picked this — and the four stops.");
  await wait(200);

  // Why card
  const whyCard = buildCard(`
    <div class="wc-head">💡 Why this route?</div>
    <div class="wc-body" id="why-body">You said <em>quiet local food</em>, so I skipped the main Hongdae strip entirely. We start with a backstreet BBQ where neighborhood families eat, then walk you through Yeonnam's residential lanes. Dessert is at a ten-seat cafe locals don't post about. Last stop is a tiny vinyl shop — optional, but worth the detour.</div>
  `, 'why-card');
  thread.appendChild(whyCard);
  scrollToBottom();
  await wait(400);

  // Place cards
  for (let i = 0; i < STOPS.length; i++) {
    const s = STOPS[i];
    const card = buildCard(`
      <div class="pc-num-col">
        <div class="pc-num">${s.num}</div>
        <div class="pc-emoji">${s.emoji}</div>
      </div>
      <div class="pc-body">
        <div class="pc-name">${s.name}</div>
        <div class="pc-type">${s.type}</div>
        <div class="pc-quote">${s.quote}</div>
        <div class="pc-meta">
          <span>⏱ ${s.stay} min stay</span>
          ${s.walk > 0 ? `<span>🚶 ${s.walk} min walk</span>` : '<span>📍 start here</span>'}
        </div>
      </div>
    `, 'place-card');
    card.dataset.idx = i;
    card.addEventListener('click', () => openPlace(i));
    thread.appendChild(card);
    scrollToBottom();
    await wait(280);
  }

  // Action card
  const actions = buildCard(`
    <button class="act-btn" data-action="save">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
      Save
    </button>
    <button class="act-btn" data-action="share">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      Share
    </button>
    <button class="act-btn primary" data-action="map">Open in map →</button>
  `, 'actions-card');
  thread.appendChild(actions);
  actions.querySelectorAll('.act-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.dataset.action;
      if (a === 'save') showToast('✓ Saved to your guide');
      if (a === 'share') showToast('✓ Link copied');
      if (a === 'map') showToast('Opening route in your map app…');
    });
  });
  scrollToBottom();
  await wait(450);

  await showTyping(900);
  await addMsg("Want me to tweak it? Try one of these — or just type what you'd change.");

  // Refine quick replies
  setQuickReplies([
    { label: '🚶 Less walking', onClick: btn => applyRefine('walk', btn) },
    { label: '🏘️ More local', onClick: btn => applyRefine('local', btn) },
    { label: '💸 Cheaper', onClick: btn => applyRefine('cheap', btn) },
    { label: '☕ More cafes', onClick: btn => applyRefine('cafe', btn) },
    { label: '🤫 Avoid crowds', onClick: btn => applyRefine('quiet', btn) },
    { label: '🟢 Open now only', onClick: btn => applyRefine('open', btn) },
  ]);
}

async function applyRefine(key, btn) {
  const isApplied = state.applied.has(key);
  if (isApplied) {
    state.applied.delete(key);
    btn.classList.remove('applied');
    await addMsg(`Undo: ${btn.textContent.trim()}`, 'user');
    await showTyping(600);
    await addMsg(REFINE_TEXTS[key].undo);
  } else {
    state.applied.add(key);
    btn.classList.add('applied');
    await addMsg(btn.textContent.trim(), 'user');
    await showTyping(750);
    await addMsg(REFINE_TEXTS[key].applied);
    flashWhy();
  }
}

function flashWhy() {
  const why = document.getElementById('why-body');
  if (!why) return;
  why.style.transition = 'background 0.4s, padding 0.2s';
  const original = why.style.background;
  why.style.background = 'rgba(20, 184, 166, 0.15)';
  setTimeout(() => { why.style.background = original; }, 800);
}

function buildCard(html, extraClass = '') {
  const card = document.createElement('div');
  card.className = `chat-card ${extraClass}`.trim();
  card.innerHTML = html;
  return card;
}

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

// ---- Place modal ----
const placeModal = document.getElementById('place-modal');
const pmBody = document.getElementById('pm-body');
document.getElementById('pm-overlay').addEventListener('click', closePlace);

function openPlace(idx) {
  const s = STOPS[idx];
  pmBody.innerHTML = `
    <div class="pm-emoji">${s.emoji}</div>
    <div class="pm-name">${s.name}</div>
    <div class="pm-type">Stop ${s.num} · ${s.type}</div>
    <div class="pm-quote">${s.quote}</div>
    <div class="pm-stats">
      <div class="pm-stat"><strong>${s.stay} min</strong><span>Suggested stay</span></div>
      <div class="pm-stat"><strong>${s.walk > 0 ? s.walk + ' min' : 'Start'}</strong><span>${s.walk > 0 ? 'Walk to here' : 'You begin here'}</span></div>
    </div>
    <div class="pm-why-block">
      <div class="pm-why-head">Why it fits</div>
      <div class="pm-why-body">${s.why}</div>
    </div>
    <div class="pm-next"><span>→</span> ${s.next}</div>
  `;
  placeModal.classList.add('open');
  placeModal.setAttribute('aria-hidden', 'false');
}
function closePlace() {
  placeModal.classList.remove('open');
  placeModal.setAttribute('aria-hidden', 'true');
}

// ---- Free text input ----
function handleInput() {
  const v = msgInput.value.trim();
  if (!v) return;
  msgInput.value = '';
  handleFreeText(v);
}
sendBtn.addEventListener('click', handleInput);
msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(); });

async function handleFreeText(text) {
  await addMsg(text, 'user');
  await showTyping(700);

  const lower = text.toLowerCase();

  if (state.step === 'area' && !state.area) {
    pickArea(text);
    return;
  }
  if (state.step === 'time' && !state.time) {
    pickTime(text);
    return;
  }
  if (state.step === 'mood' && !state.mood) {
    pickMood(text);
    return;
  }

  // After route shown — interpret refine hints
  if (state.routeShown) {
    if (lower.includes('walk')) return triggerRefineByText('walk');
    if (lower.includes('local') || lower.includes('hidden')) return triggerRefineByText('local');
    if (lower.includes('cheap') || lower.includes('budget') || lower.includes('₩')) return triggerRefineByText('cheap');
    if (lower.includes('cafe') || lower.includes('coffee')) return triggerRefineByText('cafe');
    if (lower.includes('crowd') || lower.includes('quiet') || lower.includes('busy')) return triggerRefineByText('quiet');
    if (lower.includes('open') || lower.includes('closed') || lower.includes('now')) return triggerRefineByText('open');
    await addMsg("Got it — I'm tweaking the route. (In the real app this would route through your refinement.)");
    return;
  }

  await addMsg("Hmm, let me think — try one of the buttons above to keep going.");
}

async function triggerRefineByText(key) {
  const btn = [...quickReplies.querySelectorAll('.quick-reply')]
    .find(b => b.textContent.toLowerCase().includes(key) || (key === 'walk' && b.textContent.toLowerCase().includes('walk')));
  if (btn && !state.applied.has(key)) {
    state.applied.add(key);
    btn.classList.add('applied');
  }
  await addMsg(REFINE_TEXTS[key].applied);
  flashWhy();
}

// ---- Toast ----
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ---- Restart ----
document.getElementById('restart-btn').addEventListener('click', startConversation);

// ---- Boot ----
startConversation();
