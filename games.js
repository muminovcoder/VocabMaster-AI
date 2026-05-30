// =============================================
// VocabMaster AI — Mini Games Module
// 24 games total: 14 original + 10 new
// =============================================

// ===== GAME DEFINITIONS =====
const GAMES = [
  // --- Original 14 ---
  { id:'synonym',    icon:'🔗',  label:'Synonym Match',       desc:'Find the best synonym',                 diff:'easy',     color:'#7c6fff',  cat:'vocab' },
  { id:'antonym',    icon:'⚡',  label:'Antonym Challenge',    desc:'Find the opposite word',                diff:'easy',     color:'#f59e0b',  cat:'vocab' },
  { id:'definition', icon:'📖',  label:'Definition Quiz',      desc:'Match word to definition',              diff:'easy',     color:'#10b981',  cat:'vocab' },
  { id:'hangman',    icon:'🎭',  label:'Hangman',              desc:'Guess letter by letter',                diff:'medium',   color:'#ef4444',  cat:'classic' },
  { id:'spelling',   icon:'🐝',  label:'Spelling Bee',         desc:'Hear & spell the word',                 diff:'medium',   color:'#f97316',  cat:'classic' },
  { id:'fillin',     icon:'✍️',  label:'Fill in the Blank',    desc:'Complete the sentence',                 diff:'easy',     color:'#06b6d4',  cat:'vocab' },
  { id:'speed',      icon:'⏱️',  label:'Speed Typing',         desc:'Type words before time runs out',       diff:'hard',     color:'#a855f7',  cat:'classic' },
  { id:'memory',     icon:'🧩',  label:'Memory Match',         desc:'Match word pairs from memory',          diff:'medium',   color:'#ec4899',  cat:'classic' },
  { id:'survival',   icon:'💀',  label:'Survival Mode',        desc:'Stay alive — one wrong & lose a life',  diff:'hard',     color:'#dc2626',  cat:'vocab' },
  { id:'scramble',   icon:'🔀',  label:'Word Scramble',        desc:'Unscramble the letters',                diff:'easy',     color:'#22c55e',  cat:'classic' },
  { id:'context',    icon:'📝',  label:'Context Challenge',    desc:'Pick the correct sentence',             diff:'medium',   color:'#6366f1',  cat:'vocab' },
  { id:'sprint',     icon:'🏷️',  label:'Categories Sprint',    desc:'Synonym or antonym — fast!',            diff:'hard',     color:'#eab308',  cat:'vocab' },
  { id:'associate',  icon:'🔗',  label:'Word Association',     desc:'Which word is most related?',            diff:'easy',     color:'#14b8a6',  cat:'vocab' },
  { id:'guessword',  icon:'🔮',  label:'Guess the Word',       desc:'Reveal hints & guess',                  diff:'medium',   color:'#8b5cf6',  cat:'classic' },
  // --- 10 New Games ---
  { id:'crossword',   icon:'✏️', label:'Mini Crossword',       desc:'Fill crossword clues',                  diff:'hard',     color:'#f43f5e',  cat:'puzzle' },
  { id:'anagram',     icon:'🔄', label:'Anagram Challenge',    desc:'Rearrange letters to find the word',    diff:'medium',   color:'#0ea5e9',  cat:'puzzle' },
  { id:'wordchain',   icon:'⛓️', label:'Word Chain',           desc:'Last letter → first letter chain',      diff:'medium',   color:'#84cc16',  cat:'puzzle' },
  { id:'category',    icon:'📂', label:'Category Sort',        desc:'Sort words into correct categories',    diff:'easy',     color:'#d946ef',  cat:'puzzle' },
  { id:'matchpair',   icon:'🤝', label:'Match Pairs',          desc:'Connect words with their partners',     diff:'easy',     color:'#2dd4bf',  cat:'puzzle' },
  { id:'timerush',    icon:'⏰', label:'Time Rush',            desc:'Answer as many as you can in 30s',      diff:'hard',     color:'#fb923c',  cat:'speed' },
  { id:'correcterror',icon:'🔍', label:'Error Hunt',           desc:'Find the word used incorrectly',        diff:'medium',   color:'#a78bfa',  cat:'puzzle' },
  { id:'prefixsuffix', icon:'🧬', label:'Affix Match',         desc:'Match prefixes & suffixes to roots',    diff:'easy',     color:'#34d399',  cat:'puzzle' },
  { id:'collocation',  icon:'🎯', label:'Collocation',          desc:'Which words naturally go together?',    diff:'medium',   color:'#f472b6',  cat:'vocab' },
  { id:'idiomguess',   icon:'🎪', label:'Emoji Idiom',          desc:'Guess the idiom from emoji clues',      diff:'hard',     color:'#c084fc',  cat:'puzzle' },
];

// ===== RENDER GAMES MENU (beautiful grid) =====
function renderGamesMenu() {
  const container = document.getElementById('game-menu');
  if (!container) return;

  const categories = [
    { id:'all',     label:'🎮 All Games' },
    { id:'vocab',   label:'📚 Vocabulary' },
    { id:'classic', label:'🎯 Classic' },
    { id:'puzzle',  label:'🧩 Puzzle' },
    { id:'speed',   label:'⚡ Speed' },
  ];

  const catButtons = categories.map(c =>
    `<span class="game-cat-btn${c.id === 'all' ? ' active' : ''}" data-cat="${c.id}" onclick="filterGames(this)">${c.label}</span>`
  ).join('');

  const cards = GAMES.map(g => {
    const xp = g.diff === 'easy' ? '5-15 XP' : g.diff === 'medium' ? '10-25 XP' : '15-40 XP';
    const diffClass = 'diff-' + g.diff;
    const diffLabel = g.diff.charAt(0).toUpperCase() + g.diff.slice(1);
    return `
      <div class="game-card new-card" data-cat="${g.cat}" onclick="launchGame('${g.id}')" style="--card-color:${g.color}">
        <div class="new-card-glow"></div>
        <div class="new-card-emoji">${g.icon}</div>
        <div class="new-card-name">${g.label}</div>
        <div class="new-card-desc">${g.desc}</div>
        <div class="new-card-footer">
          <span class="new-card-diff ${diffClass}">${diffLabel}</span>
          <span class="new-card-xp">${xp}</span>
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="games-hero">
      <div class="games-hero-bg"></div>
      <div class="games-hero-content">
        <div class="games-hero-icon">🎮</div>
        <div class="games-hero-title">Mini Games Arena</div>
        <div class="games-hero-sub">${GAMES.length} word games • Build vocabulary while having fun</div>
        <div class="games-hero-stats">
          <div class="hero-stat"><span class="hero-stat-val">${GAMES.length}</span><span class="hero-stat-lbl">Games</span></div>
          <div class="hero-stat"><span class="hero-stat-val">${GAMES.filter(g => g.diff === 'easy').length}</span><span class="hero-stat-lbl">Easy</span></div>
          <div class="hero-stat"><span class="hero-stat-val">${GAMES.filter(g => g.diff === 'medium').length}</span><span class="hero-stat-lbl">Medium</span></div>
          <div class="hero-stat"><span class="hero-stat-val">${GAMES.filter(g => g.diff === 'hard').length}</span><span class="hero-stat-lbl">Hard</span></div>
        </div>
      </div>
    </div>
    <div class="game-cat-bar">${catButtons}</div>
    <div class="game-cards-grid" id="game-cards-grid">${cards}</div>`;
}

function filterGames(el) {
  document.querySelectorAll('.game-cat-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  const cat = el.dataset.cat;
  document.querySelectorAll('.new-card').forEach(c => {
    if (cat === 'all' || c.dataset.cat === cat) {
      c.style.display = '';
      c.style.animation = 'none';
      void c.offsetWidth;
      c.style.animation = 'cardFadeIn 0.35s ease backwards';
    } else {
      c.style.display = 'none';
    }
  });
}

// =============================================
// EXTEND launchGame — add 10 new games
// =============================================
const _origLaunchGame = launchGame;
launchGame = function(type) {
  const newGames = ['crossword','anagram','wordchain','category','matchpair','timerush','correcterror','prefixsuffix','collocation','idiomguess'];
  if (newGames.includes(type)) {
    const area = document.getElementById('game-area');
    const body = document.getElementById('game-body');
    area.style.display = 'block';
    state.game = { type, score: 0, streak: 0, lives: 3, timer: null, words: [], current: 0 };
    document.getElementById('game-title').textContent = GAMES.find(g => g.id === type)?.label || 'Mini Game';
    document.getElementById('game-score-display').textContent = '0';
    toast('Loading game...', 'info');
    API.fetchWordsFromAPI(20, state.difficulty).then(words => {
      return Promise.all(words.map(w => API.getFullWordData(w)));
    }).then(defs => {
      state.game.words = defs.filter(Boolean);
      if (!state.game.words.length) { toast('Failed to load game words', 'error'); closeGame(); return; }
      state.stats.gamesPlayed++;
      saveStats();
      addXP(0);
      renderNewGame(type);
      setTimeout(replaceEmojis, 50);
    });
    return;
  }
  _origLaunchGame(type);
};

const _origRenderGame = renderGame;
renderGame = function(type) {
  const newGames = ['crossword','anagram','wordchain','category','matchpair','timerush','correcterror','prefixsuffix','collocation','idiomguess'];
  if (newGames.includes(type)) {
    renderNewGame(type);
    return;
  }
  _origRenderGame(type);
};

function renderNewGame(type) {
  const fn = {
    crossword: renderCrossword,
    anagram: renderAnagram,
    wordchain: renderWordChain,
    category: renderCategorySort,
    matchpair: renderMatchPairs,
    timerush: renderTimeRush,
    correcterror: renderErrorHunt,
    prefixsuffix: renderAffixMatch,
    collocation: renderCollocation,
    idiomguess: renderIdiomGuess,
  }[type];
  if (fn) fn();
}

// =============================================
// NEW GAME 1 — MINI CROSSWORD
// =============================================
function renderCrossword() {
  const rows = 5, cols = 5;
  const words = state.game.words.slice(0, 6);
  if (!words.length) { showGameResult(); return; }
  const grid = Array.from({length:rows}, () => Array(cols).fill(''));
  const across = words.slice(0, 3).map(w => w.word.toUpperCase().slice(0, cols));
  const down = words.slice(3, 6).map(w => w.word.toUpperCase().slice(0, rows));
  for (let r = 0; r < 3 && r < across.length; r++) {
    for (let c = 0; c < across[r].length && c < cols; c++) { grid[r][c] = across[r][c]; }
  }
  for (let c = 0; c < 3 && c < down.length; c++) {
    for (let r = 0; r < down[c].length && r < rows; r++) { if (!grid[r][c]) grid[r][c] = down[c][r]; }
  }

  let answers = {};
  const clues = words.map(w => ({ word: w.word.toUpperCase(), clue: w.definition?.substring(0, 50) || 'Define this word' }));
  clues.forEach(c => { answers[c.word] = c.clue; });

  const gridHTML = grid.map((row, r) =>
    `<div class="cw-row">${row.map((cell, c) => {
      if (cell) {
        const clueIdx = clues.findIndex(cl => cl.word[0] === cell || cl.word.includes(cell));
        return `<div class="cw-cell" data-r="${r}" data-c="${c}" data-answer="${cell}"><input class="cw-input" maxlength="1" data-r="${r}" data-c="${c}" oninput="checkCrossword()"></div>`;
      }
      return `<div class="cw-cell cw-block"></div>`;
    }).join('')}</div>`
  ).join('');

  const cluesHTML = clues.map((c, i) =>
    `<div class="cw-clue ${i < 3 ? 'cw-across' : 'cw-down'}"><span class="cw-clue-label">${i < 3 ? 'Across' : 'Down'} ${i % 3 + 1}:</span> ${c.clue.substring(0, 40)}</div>`
  ).join('');

  document.getElementById('game-body').innerHTML = `
    ${renderGameScoreRow()}
    <div style="display:flex;gap:24px;flex-wrap:wrap;justify-content:center">
      <div class="cw-grid">${gridHTML}</div>
      <div class="cw-clues">${cluesHTML}</div>
    </div>
    <div style="text-align:center;margin-top:16px">
      <button class="btn btn-primary" onclick="checkCrosswordAll()">✅ Check All</button>
      <button class="btn btn-ghost btn-sm" onclick="showGameResult()">⏭ Done</button>
    </div>
    <div id="cw-status" style="text-align:center;margin-top:12px;font-size:14px;color:var(--emerald2)"></div>`;

  state.game._cwAnswers = clues.map(c => c.word);
  state.game._cwFound = 0;
}

function checkCrossword() { /* auto-check on input — lightweight */ }
function checkCrosswordAll() {
  const inputs = document.querySelectorAll('.cw-input');
  let correct = 0;
  inputs.forEach(inp => {
    const r = parseInt(inp.dataset.r), c = parseInt(inp.dataset.c);
    const cell = document.querySelector(`.cw-cell[data-r="${r}"][data-c="${c}"]`);
    const answer = cell?.dataset.answer;
    if (inp.value.toUpperCase() === answer) { inp.style.borderColor = 'var(--emerald)'; inp.style.background = 'rgba(16,185,129,0.15)'; correct++; }
    else { inp.style.borderColor = 'var(--rose)'; inp.style.background = 'rgba(244,63,94,0.1)'; }
  });
  if (correct === inputs.length) {
    state.game.score += 50; document.getElementById('game-score-display').textContent = state.game.score;
    addXP(50, 'Crossword solved!'); confetti();
    document.getElementById('cw-status').textContent = '🎉 Perfect! All correct!';
  } else {
    document.getElementById('cw-status').textContent = `${correct}/${inputs.length} correct — keep trying!`;
  }
}

// =============================================
// NEW GAME 2 — ANAGRAM CHALLENGE
// =============================================
function renderAnagram() {
  const w = state.game.words[state.game.current];
  if (!w || state.game.current >= state.game.words.length) { showGameResult(); return; }
  const original = w.word.toUpperCase();
  let anagram = original.split('').sort(() => Math.random() - 0.5).join('');
  if (anagram === original) { anagram = original.split('').reverse().join(''); }

  const letters = anagram.split('');
  document.getElementById('game-body').innerHTML = `
    ${renderGameScoreRow()}
    <div class="game-sub-q" style="font-size:15px;margin-bottom:8px">🔀 Unscramble the anagram:</div>
    <div class="anagram-letters">${letters.map((l, i) =>
      `<div class="ana-letter" draggable="false" onclick="anaPick(${i})" id="ana-l-${i}">${l}</div>`
    ).join('')}</div>
    <div class="anagram-answer" id="ana-answer"></div>
    <div style="text-align:center;margin-top:16px">
      <button class="btn btn-primary" onclick="checkAnagram('${original}')">Submit</button>
      <button class="btn btn-ghost btn-sm" onclick="anaClear()">Clear</button>
      <button class="btn btn-ghost btn-sm" onclick="anaHint('${original}')">💡 Hint</button>
    </div>
    <div id="ana-hint" style="text-align:center;margin-top:8px;font-size:13px;color:var(--amber2);min-height:20px"></div>`;

  state.game._anaLetters = letters.map((_, i) => i);
  state.game._anaPicked = [];
}

function anaPick(idx) {
  if (state.game._anaPicked.includes(idx)) return;
  state.game._anaPicked.push(idx);
  const el = document.getElementById(`ana-l-${idx}`);
  if (el) { el.classList.add('picked'); el.style.opacity = '0.3'; }
  const answerDiv = document.getElementById('ana-answer');
  if (answerDiv) answerDiv.textContent += state.game._anaLetters[idx];
}

function anaClear() {
  state.game._anaPicked.forEach(idx => {
    const el = document.getElementById(`ana-l-${idx}`);
    if (el) { el.classList.remove('picked'); el.style.opacity = '1'; }
  });
  state.game._anaPicked = [];
  const answerDiv = document.getElementById('ana-answer');
  if (answerDiv) answerDiv.textContent = '';
}

function anaHint(original) {
  const h = document.getElementById('ana-hint');
  if (h) {
    const hidden = state.game._anaPicked.length;
    h.textContent = `💡 Length: ${original.length} • Starts with "${original[0]}" • ${hidden}/${original.length} placed`;
  }
}

function checkAnagram(original) {
  const answer = document.getElementById('ana-answer')?.textContent || '';
  if (answer === original) {
    state.game.score += 25;
    document.getElementById('game-score-display').textContent = state.game.score;
    addXP(25, 'Anagram solved!');
    state.game.current++;
    setTimeout(() => renderAnagram(), 800);
  } else {
    toast('❌ Not quite — try again!', 'error', 1500);
  }
}

// =============================================
// NEW GAME 3 — WORD CHAIN
// =============================================
function renderWordChain() {
  const words = state.game.words.slice(0, 8);
  if (!words.length) { showGameResult(); return; }
  state.game._chainWords = words.map(w => w.word.toUpperCase());
  state.game._chainUsed = [];
  state.game._chainCurrent = words[0].word.toUpperCase();

  document.getElementById('game-body').innerHTML = `
    ${renderGameScoreRow()}
    <div class="game-sub-q">⛓️ Build a word chain! Last letter → first letter</div>
    <div class="chain-display">
      <div class="chain-word" id="chain-current">${state.game._chainCurrent}</div>
      <div class="chain-arrow">⬇</div>
      <div class="chain-input-wrap">
        <input type="text" class="game-input chain-input" id="chain-input" placeholder="Next word starts with ${state.game._chainCurrent.slice(-1)}..." autocomplete="off" onkeydown="if(event.key==='Enter')checkChain()">
      </div>
    </div>
    <div id="chain-list" class="chain-list"></div>
    <div style="text-align:center;margin-top:16px">
      <button class="btn btn-primary" onclick="checkChain()">Submit</button>
      <button class="btn btn-ghost btn-sm" onclick="chainSkip()">⏭ Skip</button>
    </div>`;
  setTimeout(() => document.getElementById('chain-input')?.focus(), 100);
}

function checkChain() {
  const input = document.getElementById('chain-input');
  if (!input) return;
  const guess = input.value.trim().toUpperCase();
  const lastLetter = state.game._chainCurrent.slice(-1);
  if (!guess.startsWith(lastLetter)) {
    toast(`❌ Word must start with "${lastLetter}"`, 'error', 1000);
    return;
  }
  if (state.game._chainUsed.includes(guess)) {
    toast('❌ Already used that word!', 'error', 1000);
    return;
  }
  const match = state.game._chainWords.find(w => w === guess);
  if (match) {
    state.game._chainUsed.push(match);
    state.game._chainCurrent = match;
    state.game.score += 10;
    document.getElementById('game-score-display').textContent = state.game.score;
    document.getElementById('chain-current').textContent = match;
    const list = document.getElementById('chain-list');
    if (list) list.innerHTML += `<div class="chain-item">${match}</div>`;
    input.value = '';
    document.getElementById('chain-input').placeholder = `Next starts with "${match.slice(-1)}"...`;
    input.focus();
    if (state.game._chainUsed.length >= state.game._chainWords.length) {
      state.game.score += 30;
      addXP(30, 'Complete word chain!');
      confetti();
      setTimeout(() => showGameResult(), 500);
    }
  } else {
    toast('❌ Word not in the pool — try another!', 'error', 1500);
    input.value = '';
    input.focus();
  }
}

function chainSkip() {
  if (state.game._chainUsed.length === 0) { toast('Use at least one word!', 'error'); return; }
  showGameResult();
}

// =============================================
// NEW GAME 4 — CATEGORY SORT
// =============================================
function renderCategorySort() {
  const w = state.game.words.slice(0, 8);
  if (w.length < 4) { showGameResult(); return; }
  const cats = {
    'n.': word => word.partOfSpeech?.startsWith('n') || word.word.length > 7,
    'v.': word => word.partOfSpeech?.startsWith('v') || word.word.length <= 5,
    'adj.': word => word.partOfSpeech?.startsWith('adj') || word.word.length === 6,
  };
  const catKeys = Object.keys(cats);
  const shuffled = w.sort(() => Math.random() - 0.5);

  state.game._catWords = shuffled;
  state.game._catAnswers = {};
  shuffled.forEach(word => {
    for (const [cat, fn] of Object.entries(cats)) {
      if (fn(word)) { state.game._catAnswers[word.word] = cat; break; }
    }
    if (!state.game._catAnswers[word.word]) state.game._catAnswers[word.word] = catKeys[Math.floor(Math.random() * catKeys.length)];
  });

  const wordsHTML = shuffled.map((word, i) =>
    `<div class="cat-word" draggable="true" id="cat-w-${i}" data-word="${word.word}" data-cat="${state.game._catAnswers[word.word]}">${word.word}</div>`
  ).join('');

  const catsHTML = catKeys.map(cat =>
    `<div class="cat-drop" data-cat="${cat}" ondrop="catDrop(event)" ondragover="catDragOver(event)">
      <div class="cat-drop-label">${cat}</div>
      <div class="cat-drop-items" id="cat-items-${cat.replace(/[^a-z]/g,'')}"></div>
    </div>`
  ).join('');

  document.getElementById('game-body').innerHTML = `
    ${renderGameScoreRow()}
    <div class="game-sub-q">📂 Drag each word to the correct category</div>
    <div class="cat-pool" id="cat-pool">${wordsHTML}</div>
    <div class="cat-zones">${catsHTML}</div>
    <div style="text-align:center;margin-top:16px">
      <button class="btn btn-primary" onclick="checkCategorySort()">✅ Check</button>
    </div>
    <div id="cat-status" style="text-align:center;margin-top:12px;font-size:14px"></div>`;

  // Make draggable
  document.querySelectorAll('.cat-word').forEach(el => {
    el.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', el.id);
    });
    el.addEventListener('click', function() {
      const target = document.getElementById(`cat-items-${this.dataset.cat.replace(/[^a-z]/g,'')}`);
      if (target) {
        this.remove();
        target.appendChild(this);
        this.style.cursor = 'pointer';
        this.title = 'Click to return';
        this.onclick = function() {
          document.getElementById('cat-pool').appendChild(this);
          this.onclick = null;
        };
      }
    });
  });
}

function catDragOver(e) { e.preventDefault(); }
function catDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const word = document.getElementById(id);
  if (word) {
    const drop = e.currentTarget.querySelector('.cat-drop-items');
    if (drop) {
      word.remove();
      drop.appendChild(word);
      word.style.cursor = 'pointer';
      word.title = 'Click to return';
      word.onclick = function() {
        document.getElementById('cat-pool').appendChild(this);
        this.onclick = null;
      };
    }
  }
}

function checkCategorySort() {
  let correct = 0, total = 0;
  document.querySelectorAll('.cat-word').forEach(el => {
    total++;
    const word = el.dataset.word;
    const parent = el.closest('.cat-drop');
    if (parent) {
      const cat = parent.dataset.cat;
      if (cat === el.dataset.cat) { el.classList.add('cat-correct'); correct++; }
      else { el.classList.add('cat-wrong'); }
    }
  });
  const status = document.getElementById('cat-status');
  if (correct === total) {
    state.game.score += 40; document.getElementById('game-score-display').textContent = state.game.score;
    addXP(40, 'Perfect sort!'); confetti();
    if (status) status.innerHTML = '🎉 All correct!';
  } else {
    if (status) status.innerHTML = `${correct}/${total} correct — drag misplaced words back and retry`;
  }
}

// =============================================
// NEW GAME 5 — MATCH PAIRS
// =============================================
function renderMatchPairs() {
  const words = state.game.words.slice(0, 5);
  if (words.length < 2) { showGameResult(); return; }
  const pairs = words.map(w => ({ id: crypto.randomUUID?.() || Math.random().toString(36).slice(2), word: w.word, def: w.definition?.substring(0, 45) || 'No definition' }));
  const items = [...pairs.map(p => ({ ...p, type: 'word' })), ...pairs.map(p => ({ ...p, type: 'def' }))].sort(() => Math.random() - 0.5);

  state.game._mpItems = items;
  state.game._mpSelected = null;
  state.game._mpMatched = new Set();

  renderMatchPairsGrid();
}

function renderMatchPairsGrid() {
  const items = state.game._mpItems;
  const matched = state.game._mpMatched;
  const allMatched = matched.size === items.length / 2;

  document.getElementById('game-body').innerHTML = `
    ${renderGameScoreRow()}
    <div class="game-sub-q">🤝 Match each word with its definition</div>
    <div class="mp-grid">${items.map((item, i) => {
      const isMatched = matched.has(item.id);
      return `<div class="mp-card${isMatched ? ' mp-matched' : ''}${state.game._mpSelected === i ? ' mp-selected' : ''}" onclick="mpSelect(${i})" data-mp-idx="${i}">
        <div class="mp-type">${item.type === 'word' ? '📝' : '📖'}</div>
        <div class="mp-text">${isMatched ? '✅' : item.type === 'word' ? item.word : `"${item.def}..."`}</div>
      </div>`;
    }).join('')}</div>
    <div style="text-align:center;margin-top:12px;font-size:13px;color:var(--text2)">Matched: ${matched.size}/${items.length / 2}</div>
    ${allMatched ? `<div style="text-align:center;margin-top:16px"><button class="btn btn-primary" onclick="showGameResult()">🎉 All Done!</button></div>` : ''}`;
}

function mpSelect(idx) {
  if (state.game._mpMatched.has(state.game._mpItems[idx].id)) return;
  if (state.game._mpSelected === null) {
    state.game._mpSelected = idx;
    renderMatchPairsGrid();
  } else if (state.game._mpSelected === idx) {
    state.game._mpSelected = null;
    renderMatchPairsGrid();
  } else {
    const a = state.game._mpItems[state.game._mpSelected];
    const b = state.game._mpItems[idx];
    if (a.id === b.id && a.type !== b.type) {
      state.game._mpMatched.add(a.id);
      state.game.score += 15;
      document.getElementById('game-score-display').textContent = state.game.score;
      addXP(10, 'Pair matched!');
      if (state.game._mpMatched.size === state.game._mpItems.length / 2) {
        state.game.score += 20;
        document.getElementById('game-score-display').textContent = state.game.score;
        addXP(20, 'All pairs matched!');
        confetti();
      }
    } else {
      toast('❌ Not a match!', 'error', 800);
    }
    state.game._mpSelected = null;
    setTimeout(() => renderMatchPairsGrid(), 300);
  }
}

// =============================================
// NEW GAME 6 — TIME RUSH
// =============================================
function renderTimeRush() {
  state.game._rushData = { score: 0, count: 0, timer: 30, maxQ: 20 };
  if (state.game._rushTimer) clearInterval(state.game._rushTimer);
  state.game._rushTimer = setInterval(() => {
    const d = state.game._rushData;
    d.timer--;
    const fill = document.getElementById('rush-timer-fill');
    if (fill) fill.style.width = `${(d.timer / 30) * 100}%`;
    const t = document.getElementById('rush-timer');
    if (t) t.textContent = `${d.timer}s`;
    if (d.timer <= 0 || d.count >= d.maxQ) {
      clearInterval(state.game._rushTimer);
      state.game.score = d.score;
      showGameResult();
    }
  }, 1000);
  renderRushRound();
}

function renderRushRound() {
  const d = state.game._rushData;
  if (d.timer <= 0 || d.count >= d.maxQ) { clearInterval(state.game._rushTimer); showGameResult(); return; }
  const w = state.game.words[d.count % state.game.words.length];
  if (!w) { d.count++; renderRushRound(); return; }
  const modes = [
    { q: `Synonym of "${w.word}"?`, a: w.synonyms?.[0] || w.related?.[0] || w.word },
    { q: `"${w.definition?.substring(0, 40)}"`, a: w.word },
    { q: `Antonym of "${w.word}"?`, a: w.antonyms?.[0] || w.word },
  ];
  const mode = modes[Math.floor(Math.random() * modes.length)];
  const others = state.game.words.filter((_, i) => i !== d.count % state.game.words.length).slice(0, 3).map(x => x.word);
  const opts = [mode.a, ...others].sort(() => Math.random() - 0.5);

  document.getElementById('game-body').innerHTML = `
    <div class="rush-header">
      <div class="rush-timer" id="rush-timer">${d.timer}s</div>
      <div class="rush-score">Score: ${d.score}</div>
      <div class="rush-qcount">${d.count + 1}/${d.maxQ}</div>
    </div>
    <div class="game-timer-bar"><div class="game-timer-fill" id="rush-timer-fill" style="width:100%"></div></div>
    <div class="game-question rush-q">${mode.q}</div>
    <div class="game-options rush-opts">${opts.map(o => `<div class="game-option rush-opt" onclick="checkRush(this,'${o}','${mode.a}')">${o}</div>`).join('')}</div>`;
}

function checkRush(el, answer, correct) {
  const d = state.game._rushData;
  document.querySelectorAll('.rush-opt').forEach(e => e.classList.add('locked'));
  if (answer === correct) {
    el.classList.add('correct');
    d.score += 15;
    d.count++;
    document.getElementById('game-score-display').textContent = d.score;
    addXP(5, 'Rush correct!');
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('.rush-opt').forEach(e => { if (e.textContent === correct) e.classList.add('correct'); });
    d.count++;
  }
  setTimeout(() => { if (d.timer > 0 && d.count < d.maxQ) renderRushRound(); else { clearInterval(state.game._rushTimer); state.game.score = d.score; showGameResult(); } }, 600);
}

// =============================================
// NEW GAME 7 — ERROR HUNT
// =============================================
function renderErrorHunt() {
  const w = state.game.words[state.game.current];
  if (!w || state.game.current >= state.game.words.length) { showGameResult(); return; }
  const errors = [
    { sentence: `The ${w.word} ${w.partOfSpeech?.startsWith('n') ? 'were' : 'was'} absolutely ${w.word} in their approach.`, incorrect: w.word },
    { sentence: `Despite the ${w.word} evidence, the committee decided to ${w.word} the proposal.`, incorrect: w.word },
    { sentence: `She felt very ${w.word} about the situation, which made her ${w.word} with joy.`, incorrect: w.word },
  ];
  const error = errors[Math.floor(Math.random() * errors.length)];
  const wrongForm = error.incorrect.length > 3 ? error.incorrect.slice(0, -2) + 'xx' : error.incorrect + 'ed';
  const sentence = error.sentence.replace(new RegExp(error.incorrect, 'g'), `<span class="eh-highlight">${wrongForm}</span>`);

  const options = [
    { text: `Replace "${wrongForm}" with "${error.incorrect}"`, correct: true },
    { text: `Replace "${wrongForm}" with "${wrongForm.slice(0, -1)}"`, correct: false },
    { text: `The sentence is correct as is`, correct: false },
    { text: `Remove the word "${wrongForm}" entirely`, correct: false },
  ].sort(() => Math.random() - 0.5);

  document.getElementById('game-body').innerHTML = `
    ${renderGameScoreRow()}
    <div class="game-sub-q">🔍 Find the error in this sentence:</div>
    <div class="eh-sentence">${sentence}</div>
    <div style="text-align:center;font-size:13px;color:var(--text2);margin-bottom:24px">Which fix is correct?</div>
    <div class="game-options">${options.map((o, i) => `<div class="game-option eh-opt" onclick="checkErrorHunt(this,${o.correct})">${o.text}</div>`).join('')}</div>`;
}

function checkErrorHunt(el, isCorrect) {
  document.querySelectorAll('.eh-opt').forEach(e => e.classList.add('locked'));
  if (isCorrect) {
    el.classList.add('correct');
    state.game.score += 20;
    state.game.streak++;
    document.getElementById('game-score-display').textContent = state.game.score;
    addXP(20, 'Error spotted!');
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('.eh-opt').forEach(e => {
      if (e.dataset.correct === 'true') e.classList.add('correct');
    });
    state.game.streak = 0;
  }
  state.game.current++;
  setTimeout(() => renderErrorHunt(), 1200);
}

// =============================================
// NEW GAME 8 — AFFIX MATCH (prefix/suffix)
// =============================================
const AFFIXES = [
  { affix: 'un', type: 'prefix', meaning: 'not / opposite', example: 'unhappy' },
  { affix: 're', type: 'prefix', meaning: 'again', example: 'rewrite' },
  { affix: 'pre', type: 'prefix', meaning: 'before', example: 'preview' },
  { affix: 'dis', type: 'prefix', meaning: 'not / reverse', example: 'disagree' },
  { affix: 'mis', type: 'prefix', meaning: 'wrongly', example: 'misunderstand' },
  { affix: 'over', type: 'prefix', meaning: 'too much', example: 'overcook' },
  { affix: 'under', type: 'prefix', meaning: 'too little', example: 'underestimate' },
  { affix: 'able', type: 'suffix', meaning: 'capable of', example: 'comfortable' },
  { affix: 'ful', type: 'suffix', meaning: 'full of', example: 'beautiful' },
  { affix: 'less', type: 'suffix', meaning: 'without', example: 'hopeless' },
  { affix: 'ment', type: 'suffix', meaning: 'action/process', example: 'enjoyment' },
  { affix: 'tion', type: 'suffix', meaning: 'state/quality', example: 'education' },
  { affix: 'ness', type: 'suffix', meaning: 'state/condition', example: 'kindness' },
  { affix: 'ous', type: 'suffix', meaning: 'full of', example: 'dangerous' },
  { affix: 'ive', type: 'suffix', meaning: 'tending to', example: 'creative' },
];

function renderAffixMatch() {
  const shuffled = AFFIXES.sort(() => Math.random() - 0.5).slice(0, 6);
  const affixes = shuffled.map(a => a.affix);
  const meanings = shuffled.map(a => a.meaning).sort(() => Math.random() - 0.5);

  state.game._affixData = { affixes: shuffled, matched: new Set() };

  document.getElementById('game-body').innerHTML = `
    ${renderGameScoreRow()}
    <div class="game-sub-q">🧬 Match each affix to its meaning</div>
    <div class="affix-grid">
      <div class="affix-col">
        <div class="affix-col-title">Affixes</div>
        ${affixes.map((a, i) =>
          `<div class="affix-item affix-src" data-idx="${i}" onclick="affixPick(${i})" id="affix-src-${i}">${a}</div>`
        ).join('')}
      </div>
      <div class="affix-col">
        <div class="affix-col-title">Meanings</div>
        ${meanings.map((m, i) =>
          `<div class="affix-item affix-tgt" data-meaning="${m}" onclick="affixTarget(${i})" id="affix-tgt-${i}">${m}</div>`
        ).join('')}
      </div>
    </div>
    <div id="affix-status" style="text-align:center;margin-top:16px;font-size:14px"></div>`;

  state.game._affixSelected = null;
}

function affixPick(idx) {
  document.querySelectorAll('.affix-src').forEach(el => el.classList.remove('selected'));
  const el = document.getElementById(`affix-src-${idx}`);
  if (el && !el.classList.contains('matched')) {
    el.classList.add('selected');
    state.game._affixSelected = idx;
  }
}

function affixTarget(idx) {
  if (state.game._affixSelected === null) return;
  const src = state.game._affixData.affixes[state.game._affixSelected];
  const tgt = document.getElementById(`affix-tgt-${idx}`);
  if (!tgt || tgt.classList.contains('matched')) return;
  if (tgt.dataset.meaning === src.meaning) {
    document.getElementById(`affix-src-${state.game._affixSelected}`).classList.add('matched');
    tgt.classList.add('matched');
    state.game._affixData.matched.add(src.affix);
    state.game.score += 15;
    document.getElementById('game-score-display').textContent = state.game.score;
    if (state.game._affixData.matched.size === state.game._affixData.affixes.length) {
      state.game.score += 20;
      addXP(40, 'All affixes matched!');
      confetti();
      document.getElementById('affix-status').innerHTML = '🎉 Perfect! All matched!';
    } else {
      addXP(10, 'Affix matched!');
    }
  } else {
    toast('❌ Wrong match!', 'error', 800);
  }
  document.querySelectorAll('.affix-src').forEach(el => el.classList.remove('selected'));
  state.game._affixSelected = null;
}

// =============================================
// NEW GAME 9 — COLLOCATION
// =============================================
const COLLOCATIONS = [
  { word: 'heavy', pairs: ['rain', 'traffic', 'smoker', 'sleep'], wrong: ['light', 'fast', 'quick'] },
  { word: 'strong', pairs: ['coffee', 'wind', 'opinion', 'evidence'], wrong: ['weak', 'soft', 'sweet'] },
  { word: 'make', pairs: ['decision', 'mistake', 'noise', 'effort'], wrong: ['do', 'have', 'take'] },
  { word: 'take', pairs: ['photo', 'break', 'risk', 'care'], wrong: ['make', 'give', 'have'] },
  { word: 'break', pairs: ['record', 'promise', 'habit', 'law'], wrong: ['make', 'keep', 'follow'] },
  { word: 'catch', pairs: ['cold', 'bus', 'attention', 'fire'], wrong: ['throw', 'miss', 'drop'] },
  { word: 'save', pairs: ['money', 'time', 'life', 'energy'], wrong: ['spend', 'waste', 'lose'] },
  { word: 'tell', pairs: ['story', 'truth', 'joke', 'lie'], wrong: ['say', 'speak', 'talk'] },
];

function renderCollocation() {
  if (!state.game._collIndex) state.game._collIndex = 0;
  const idx = state.game._collIndex;
  const data = COLLOCATIONS[idx % COLLOCATIONS.length];
  const correct = data.pairs[Math.floor(Math.random() * data.pairs.length)];
  const opts = [correct, ...data.wrong].sort(() => Math.random() - 0.5);

  document.getElementById('game-body').innerHTML = `
    ${renderGameScoreRow()}
    <div class="game-sub-q">🎯 Which word forms a natural collocation with <strong>"${data.word}"</strong>?</div>
    <div class="colloc-word">${data.word}<span class="colloc-blank"> ___</span></div>
    <div class="game-options">${opts.map(o => `<div class="game-option colloc-opt" onclick="checkCollocation(this,'${o}','${correct}')">${o}</div>`).join('')}</div>
    <div style="text-align:center;margin-top:12px;font-size:13px;color:var(--text2)">Round ${idx + 1} / 8</div>`;
}

function checkCollocation(el, answer, correct) {
  document.querySelectorAll('.colloc-opt').forEach(e => e.classList.add('locked'));
  if (answer === correct) {
    el.classList.add('correct');
    state.game.score += 15;
    state.game._collIndex = (state.game._collIndex || 0) + 1;
    document.getElementById('game-score-display').textContent = state.game.score;
    addXP(15, 'Collocation correct!');
    if (state.game._collIndex >= 8) { setTimeout(() => showGameResult(), 500); return; }
    setTimeout(() => renderCollocation(), 800);
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('.colloc-opt').forEach(e => { if (e.textContent === correct) e.classList.add('correct'); });
    state.game.streak = 0;
    state.game._collIndex = (state.game._collIndex || 0) + 1;
    setTimeout(() => { if (state.game._collIndex < 8) renderCollocation(); else showGameResult(); }, 1000);
  }
}

// =============================================
// NEW GAME 10 — EMOJI IDIOM GUESS
// =============================================
const IDIOMS = [
  { emoji: '🐱📦', answer: 'let the cat out of the bag', hint: 'Reveal a secret' },
  { emoji: '⛅🐶🐱', answer: 'raining cats and dogs', hint: 'Heavy rain' },
  { emoji: '🐓⬆️☀️', answer: 'early bird', hint: 'Waking up early' },
  { emoji: '🪣🦶', answer: 'kick the bucket', hint: 'A euphemism for death' },
  { emoji: '🐘🏠', answer: 'elephant in the room', hint: 'Obvious problem ignored' },
  { emoji: '🍰✋', answer: 'piece of cake', hint: 'Very easy' },
  { emoji: '🧊🛞', answer: 'break the ice', hint: 'Start a conversation' },
  { emoji: '🥄💊', answer: 'spoonful of sugar', hint: 'Make something unpleasant easier' },
  { emoji: '🎶💸', answer: 'for a song', hint: 'Very cheap' },
  { emoji: '👂🌾', answer: 'ears of corn', hint: 'Listening carefully (close enough!)' },
  { emoji: '🔥🚢', answer: 'burn your bridges', hint: 'No turning back' },
  { emoji: '⚓➡️', answer: 'weigh anchor', hint: 'Set sail / begin a journey' },
  { emoji: '🌊🐟', answer: 'big fish in a small pond', hint: 'Important in a small group' },
  { emoji: '👻🏃', answer: 'ghost someone', hint: 'Suddenly stop communicating' },
  { emoji: '💼💤', answer: 'desk potato', hint: 'Sedentary office worker' },
  { emoji: '🐝🦵', answer: 'bee\'s knees', hint: 'Excellent / outstanding' },
  { emoji: '💰🐷', answer: 'piggy bank', hint: 'Saving money' },
  { emoji: '🧠🌀', answer: 'brain fog', hint: 'Unable to think clearly' },
  { emoji: '⏰🍅', answer: 'tomato timer', hint: 'Time management technique' },
  { emoji: '🌙🦉', answer: 'night owl', hint: 'Someone who stays up late' },
];

function renderIdiomGuess() {
  if (!state.game._idiomIdx) state.game._idiomIdx = 0;
  const idx = state.game._idiomIdx;
  if (idx >= IDIOMS.length) { showGameResult(); return; }
  const idiom = IDIOMS[idx];
  const scrambled = idiom.answer.split('').sort(() => Math.random() - 0.5).join('');

  document.getElementById('game-body').innerHTML = `
    ${renderGameScoreRow()}
    <div class="game-sub-q">🎪 Guess the idiom from the emojis!</div>
    <div class="idiom-emoji">${idiom.emoji}</div>
    <div class="idiom-hint">💡 ${idiom.hint}</div>
    <div class="idiom-scramble">Letters: ${scrambled.replace(/ /g, ' • ')}</div>
    <div class="game-input-wrap">
      <input type="text" class="game-input" id="idiom-input" placeholder="Type the idiom..." autocomplete="off" onkeydown="if(event.key==='Enter')checkIdiom('${idiom.answer}')">
      <button class="btn btn-primary" onclick="checkIdiom('${idiom.answer}')">Guess</button>
    </div>
    <div style="text-align:center;margin-top:12px">
      <button class="btn btn-ghost btn-sm" onclick="skipIdiom('${idiom.answer}')">⏭ Reveal</button>
    </div>
    <div style="text-align:center;margin-top:8px;font-size:13px;color:var(--text2)">${idx + 1} / ${IDIOMS.length}</div>`;
  setTimeout(() => document.getElementById('idiom-input')?.focus(), 100);
}

function checkIdiom(answer) {
  const input = document.getElementById('idiom-input');
  if (!input) return;
  const guess = input.value.trim().toLowerCase();
  if (guess === answer.toLowerCase() || guess === answer.replace(/ the /g, ' ').toLowerCase()) {
    state.game.score += 30;
    state.game._idiomIdx = (state.game._idiomIdx || 0) + 1;
    document.getElementById('game-score-display').textContent = state.game.score;
    addXP(30, 'Idiom guessed!');
    confetti();
    setTimeout(() => { if (state.game._idiomIdx < IDIOMS.length) renderIdiomGuess(); else showGameResult(); }, 1200);
  } else {
    toast('❌ Not quite — try again!', 'error', 1000);
    input.value = '';
    input.focus();
  }
}

function skipIdiom(answer) {
  state.game.score = Math.max(0, state.game.score - 5);
  document.getElementById('game-score-display').textContent = state.game.score;
  toast(`The idiom was: "${answer}"`, 'info', 2000);
  state.game._idiomIdx = (state.game._idiomIdx || 0) + 1;
  setTimeout(() => { if (state.game._idiomIdx < IDIOMS.length) renderIdiomGuess(); else showGameResult(); }, 1500);
}

// =============================================
// EXTEND showGameResult for new games
// =============================================
const _origShowGameResult = showGameResult;
showGameResult = function() {
  const newGames = ['crossword','anagram','wordchain','category','matchpair','timerush','correcterror','prefixsuffix','collocation','idiomguess'];
  if (state.game && newGames.includes(state.game.type)) {
    if (state.game._rushTimer) clearInterval(state.game._rushTimer);
    const xpEarned = Math.floor(state.game.score / 2);
    addXP(xpEarned, 'Game completed');
    if (state.game.score > 100) confetti();
    document.getElementById('game-body').innerHTML = `
      <div class="game-result">
        <div style="font-size:64px;margin-bottom:16px">${state.game.score > 100 ? '🏆' : state.game.score > 50 ? '🎉' : '💪'}</div>
        <div class="game-result-title gradient-text">Game Over!</div>
        <div class="game-result-score">Final Score: ${state.game.score} pts</div>
        <div style="font-size:14px;color:var(--text2);margin-bottom:24px">+${xpEarned} XP earned</div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="launchGame('${state.game.type}')">Play Again</button>
          <button class="btn btn-ghost" onclick="closeGame()">Exit</button>
        </div>
      </div>`;
    checkAchievements();
    return;
  }
  _origShowGameResult();
};

// =============================================
// EXTEND closeGame for new games
// =============================================
const _origCloseGame = closeGame;
closeGame = function() {
  if (state.game) {
    if (state.game._rushTimer) clearInterval(state.game._rushTimer);
    if (state.game.sprintTimer) clearInterval(state.game.sprintTimer);
  }
  _origCloseGame();
};

// =============================================
// EXTEND getGameTitle
// =============================================
const _origGetGameTitle = getGameTitle;
getGameTitle = function(type) {
  const g = GAMES.find(g => g.id === type);
  if (g) return g.icon + ' ' + g.label;
  return _origGetGameTitle(type);
};
