const TOPICS = ['science','nature','art','music','technology','food','travel','history','business','medicine','law','politics','sport','literature','philosophy','psychology'];

// =============================================
// API UTILITIES
// =============================================
const API = {
  dictBase: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
  datamuseBase: 'https://api.datamuse.com/words',

  async fetchWithCache(url) {
    if (state.apiCache[url]) return state.apiCache[url];
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      const d = await r.json();
      state.apiCache[url] = d;
      return d;
    } catch { return null; }
  },

  async getDefinition(word) {
    const data = await this.fetchWithCache(this.dictBase + encodeURIComponent(word));
    if (!data || !data[0]) return null;
    const entry = data[0];
    const meaning = entry.meanings?.[0] || {};
    const def = meaning.definitions?.[0] || {};
    const phonetic = entry.phonetics?.find(p => p.text)?.text || entry.phonetic || '';
    return {
      word: entry.word,
      phonetic,
      partOfSpeech: meaning.partOfSpeech || 'word',
      definition: def.definition || 'No definition available',
      example: def.example || '',
      synonyms: [...(def.synonyms || []), ...(meaning.synonyms || [])].slice(0, 8),
      antonyms: [...(def.antonyms || []), ...(meaning.antonyms || [])].slice(0, 6),
      allMeanings: entry.meanings || []
    };
  },

  async datamuse(params) {
    const qs = new URLSearchParams({ ...params, max: params.max || 8 });
    const data = await this.fetchWithCache(`${this.datamuseBase}?${qs}`);
    return (data || []).map(w => w.word);
  },

  async getSynonyms(word) { return this.datamuse({ rel_syn: word }); },
  async getAntonyms(word) { return this.datamuse({ rel_ant: word }); },
  async getRelated(word) { return this.datamuse({ rel_trg: word }); },
  async getRhymes(word) { return this.datamuse({ rel_rhy: word }); },
  async getByMeaning(q) { return this.datamuse({ ml: q, max: 20 }); },
  async getByTopic(t) { return this.datamuse({ topics: t, max: 20 }); },
  async getSimilarSpelling(w) { return this.datamuse({ sp: w + '*', max: 10 }); },

  async getFullWordData(word) {
    const [def, syns, ants, rel, rhy] = await Promise.all([
      this.getDefinition(word),
      this.getSynonyms(word),
      this.getAntonyms(word),
      this.getRelated(word),
      this.getRhymes(word)
    ]);
    if (!def) return null;
    return {
      ...def,
      synonyms: [...new Set([...def.synonyms, ...syns])].slice(0, 10),
      antonyms: [...new Set([...def.antonyms, ...ants])].slice(0, 8),
      related: rel.slice(0, 8),
      rhymes: rhy.slice(0, 8)
    };
  },

  async fetchWordsFromAPI(count, difficulty) {
    const seeds = {
      beginner: ['common', 'simple', 'basic', 'easy', 'gentle', 'mild', 'plain', 'pure', 'calm', 'fair'],
      intermediate: ['complex', 'advance', 'refined', 'subtle', 'vivid', 'candid', 'keen', 'noble', 'earnest', 'prudent'],
      advanced: ['sophisticated', 'intricate', 'elaborate', 'profound', 'exquisite', 'esoteric', 'eloquent', 'abstract'],
      academic: ['academic', 'scientific', 'theoretical', 'empirical', 'rational', 'systematic', 'analytical', 'hypothetical'],
      sat: ['challenging', 'difficult', 'rigorous', 'formidable', 'arduous', 'complex', 'demanding', 'daunting']
    };
    const pool = seeds[difficulty] || seeds.intermediate;
    const seen = new Set();
    const words = [];
    for (const seed of pool) {
      if (words.length >= count) break;
      const result = await this.datamuse({ ml: seed, max: 15 });
      for (const w of result) {
        const clean = w.toLowerCase();
        if (!seen.has(clean) && clean.length > 2 && !clean.includes(' ') && !clean.includes('-')) {
          seen.add(clean);
          words.push(w);
          if (words.length >= count) break;
        }
      }
    }
    return this.shuffle(words);
  },

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};


// =============================================
// WORD OF THE DAY
// =============================================
async function loadWordOfDay() {
  const todayKey = 'wotd_' + new Date().toDateString();
  const cached = localStorage.getItem(todayKey);
  if (cached) { state.wotd = JSON.parse(cached); renderWOTD(); return; }
  const words = await API.fetchWordsFromAPI(5, state.difficulty);
  if (!words.length) { renderWOTD(); return; }
  const word = words[Math.floor(Math.random() * words.length)];
  const data = await API.getFullWordData(word);
  if (data) {
    state.wotd = data;
    localStorage.setItem(todayKey, JSON.stringify(data));
    renderWOTD();
  }
}

function renderWOTD() {
  if (!state.wotd) return;
  const w = state.wotd;

  // Word number (days since epoch / count)
  const dayNum = Math.floor((Date.now() - new Date('2024-01-01').getTime()) / 86400000) + 1;
  document.getElementById('wotd-number').textContent = `#${String(dayNum).padStart(3,'0')}`;

  // Word with letter reveal
  const wordEl = document.getElementById('wotd-word');
  wordEl.textContent = w.word;

  document.getElementById('wotd-phonetic').textContent = w.phonetic || '';
  document.getElementById('wotd-type-badge').textContent = w.partOfSpeech || '';

  // Definition
  document.getElementById('wotd-def').textContent = w.definition;

  // Example sentence
  const exEl = document.getElementById('wotd-example');
  if (w.example) {
    exEl.textContent = w.example;
    exEl.style.display = 'block';
  } else {
    exEl.style.display = 'none';
  }

  // Word stats
  const wordClean = w.word.replace(/[^a-zA-Z]/g, '');
  const syllables = countSyllables(wordClean);
  const statsEl = document.getElementById('wotd-word-stats');
  statsEl.innerHTML = `
    <span>🔤 ${wordClean.length} letters</span>
    <span>🎵 ${syllables} syllable${syllables !== 1 ? 's' : ''}</span>
    <span>📊 ${getWordDifficulty(wordClean)}</span>
  `;

  // Synonyms & related
  const relEl = document.getElementById('wotd-related');
  let relatedHTML = '';
  if (w.synonyms && w.synonyms.length > 0) {
    relatedHTML += `<span class="wotd-related-label">🔗 Similar:</span>`;
      relatedHTML += w.synonyms.slice(0, 5).map(s =>
        `<span class="wotd-related-tag" onclick="loadWOTDRelated('${s.replace(/'/g, "\\'")}')">${s}</span>`
      ).join('');
  }
  relEl.innerHTML = relatedHTML;

  // Save button state
  const saved = state.favorites && state.favorites.find(f => f.toLowerCase() === w.word.toLowerCase());
  const saveBtn = document.getElementById('wotd-save-btn');
  if (saveBtn) {
    saveBtn.innerHTML = saved ? '⭐ Saved' : '⭐ Save';
    saveBtn.className = 'wotd-action-btn' + (saved ? ' learned' : '');
  }

  // Learned state
  const learnedKey = 'wotd_learned_' + w.word.toLowerCase();
  const learned = localStorage.getItem(learnedKey) === 'true';
  const learnedBtn = document.getElementById('wotd-learned-btn');
  if (learnedBtn) {
    learnedBtn.innerHTML = learned ? '✅ Learned' : '📌 Mark Learned';
    learnedBtn.className = 'wotd-action-btn' + (learned ? ' learned' : '');
  }

  // Animate
  const body = document.querySelector('.wotd-body');
  if (body) {
    body.classList.remove('wotd-animate');
    void body.offsetWidth;
    body.classList.add('wotd-animate');
  }
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  let count = 0;
  const vowels = 'aeiouy';
  let prevVowel = false;
  for (const ch of word) {
    const isV = vowels.includes(ch);
    if (isV && !prevVowel) count++;
    prevVowel = isV;
  }
  return Math.max(1, word.endsWith('e') ? count - 1 : count);
}

function getWordDifficulty(word) {
  const len = word.length;
  if (len <= 4) return 'Easy';
  if (len <= 6) return 'Medium';
  if (len <= 9) return 'Hard';
  return 'Advanced';
}

function toggleWOTDLearned() {
  if (!state.wotd) return;
  const key = 'wotd_learned_' + state.wotd.word.toLowerCase();
  const isLearned = localStorage.getItem(key) === 'true';
  if (isLearned) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, 'true');
    state.stats.wordsLearned = (state.stats.wordsLearned || 0) + 1;
    saveState();
  }
  renderWOTD();
}

function loadWOTDRelated(word) {
  loadWordDisplay(word);
  showPage('explore');
}


// =============================================
// TOPIC CHIPS
// =============================================
function renderTopicChips(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = TOPICS.slice(0, 10).map(t =>
    `<span class="topic-chip" onclick="exploreByTopic('${t}')">${t}</span>`
  ).join('');
}

async function exploreByTopic(topic) {
  showPage('explore');
  showLoading('word-card-area');
  const words = await API.getByTopic(topic);
  if (words.length > 0) await loadWordDisplay(words[Math.floor(Math.random() * words.length)]);
  else toast('No words found for this topic', 'error');
}


// =============================================
// WORD DISPLAY
// =============================================
async function generateNewWord() {
  const words = await API.fetchWordsFromAPI(3, state.difficulty);
  const word = words[0];
  if (!word) { toast('Could not find a word', 'error'); return; }
  await loadWordDisplay(word);
}

async function loadWordDisplay(word, giveXP = true) {
  showLoading('word-card-area');
  const data = await API.getFullWordData(word);
  if (!data) { toast(`Could not find "${word}"`, 'error'); clearLoading('word-card-area'); return; }
  state.currentWord = data;
  addToRecent(data);
  recordActivity(1);
  if (giveXP) addXP(10, `Explored "${data.word}"`);
  renderWordCard(data);
}

function showLoading(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="word-card"><div class="word-card-inner" style="padding:40px 0">
    <div class="skeleton" style="height:16px;width:100px;margin-bottom:20px"></div>
    <div class="skeleton" style="height:56px;width:280px;margin-bottom:12px"></div>
    <div class="skeleton" style="height:20px;width:160px;margin-bottom:28px"></div>
    <div class="skeleton" style="height:16px;margin-bottom:8px"></div>
    <div class="skeleton" style="height:16px;width:80%;margin-bottom:8px"></div>
    <div class="skeleton" style="height:16px;width:60%"></div>
  </div></div>`;
}

function clearLoading(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '';
}

function renderWordCard(data) {
  if (!data) return;
  const el = document.getElementById('word-card-area');
  if (!el) return;
  el.innerHTML = `
  <div class="word-card">
    <div class="word-card-inner">
      <div class="word-part-of-speech">${data.partOfSpeech}</div>
      <div class="word-main">${data.word}</div>
      <div class="word-phonetic">
        <span>${data.phonetic || 'No phonetic'}</span>
        <button class="btn-pronounce" onclick="pronounceWord('${data.word}')">🔊 Pronounce</button>
      </div>
      <div class="word-definition">${data.definition}</div>
      ${data.example ? `<div class="word-example">"${data.example}"</div>` : ''}
      ${data.synonyms?.length ? `<div class="word-tags-section"><div class="word-tags-label">✅ Synonyms</div><div class="tags-row">${data.synonyms.map(s => `<span class="tag syn" onclick="loadWordDisplay('${s}')">${s}</span>`).join('')}</div></div>` : ''}
      ${data.antonyms?.length ? `<div class="word-tags-section"><div class="word-tags-label">❌ Antonyms</div><div class="tags-row">${data.antonyms.map(a => `<span class="tag ant" onclick="loadWordDisplay('${a}')">${a}</span>`).join('')}</div></div>` : ''}
      ${data.related?.length ? `<div class="word-tags-section"><div class="word-tags-label">🔗 Related</div><div class="tags-row">${data.related.map(r => `<span class="tag rel" onclick="loadWordDisplay('${r}')">${r}</span>`).join('')}</div></div>` : ''}
      ${data.rhymes?.length ? `<div class="word-tags-section"><div class="word-tags-label">🎵 Rhymes</div><div class="tags-row">${data.rhymes.map(r => `<span class="tag rhy" onclick="loadWordDisplay('${r}')">${r}</span>`).join('')}</div></div>` : ''}
      <div class="word-actions">
        <button class="btn btn-primary" onclick="generateNewWord()">⚡ Next Word</button>
        <button class="btn btn-ghost" onclick="saveToFavorites(state.currentWord)">⭐ Save</button>
        <button class="btn btn-ghost" onclick="showWordModal(state.currentWord)">📖 Full Details</button>
        <button class="btn btn-ghost" onclick="pronounceWord('${data.word}')">🔊 Audio</button>
      </div>
    </div>
  </div>`;
}


// =============================================
// WORD MODAL
// =============================================
function showWordModal(data) {
  if (!data) return;
  const modal = document.getElementById('word-modal');
  document.getElementById('modal-word-header').innerHTML = `
    <div>
      <span class="badge badge-accent" style="margin-bottom:8px">${data.partOfSpeech}</span>
      <div style="font-family:var(--font-display);font-size:36px;font-weight:800">${data.word}</div>
      <div style="font-family:var(--font-mono);font-size:14px;color:var(--cyan);margin-top:4px">${data.phonetic || ''}</div>
    </div>`;
  let body = `<p style="font-size:16px;color:var(--text1);line-height:1.7;margin-bottom:20px">${data.definition}</p>`;
  if (data.example) body += `<blockquote style="border-left:3px solid var(--accent);padding:10px 16px;background:var(--surface);border-radius:0 8px 8px 0;font-style:italic;margin-bottom:20px;font-size:14px;color:var(--text1)">"${data.example}"</blockquote>`;
  if (data.allMeanings?.length > 1) {
    body += `<div class="section-title" style="font-size:15px">All Meanings</div>`;
    data.allMeanings.forEach(m => {
      body += `<div style="margin-bottom:12px"><span class="badge badge-accent">${m.partOfSpeech}</span>`;
      m.definitions?.slice(0, 2).forEach(d => {
        body += `<p style="font-size:14px;color:var(--text1);margin:6px 0">${d.definition}</p>`;
        if (d.example) body += `<p style="font-size:12px;color:var(--text2);font-style:italic">"${d.example}"</p>`;
      });
      body += `</div>`;
    });
  }
  const sections = [
    { label: '✅ Synonyms', items: data.synonyms, cls: 'syn' },
    { label: '❌ Antonyms', items: data.antonyms, cls: 'ant' },
    { label: '🔗 Related', items: data.related, cls: 'rel' },
    { label: '🎵 Rhymes', items: data.rhymes, cls: 'rhy' }
  ];
  sections.forEach(sec => {
    if (sec.items?.length) {
      body += `<div class="word-tags-section"><div class="word-tags-label">${sec.label}</div><div class="tags-row">${sec.items.map(w => `<span class="tag ${sec.cls}" onclick="loadWordDisplay('${w}');closeWordModal()">${w}</span>`).join('')}</div></div>`;
    }
  });
  body += `<div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap">
    <button class="btn btn-primary" onclick="pronounceWord('${data.word}')">🔊 Pronounce</button>
    <button class="btn btn-ghost" onclick="saveToFavorites(data)">⭐ Save to Favorites</button>
    <button class="btn btn-ghost" onclick="addToFlashcards(state.currentWord||state.wotd);toast('Added to flashcards!','success')">🃏 Add to Flashcards</button>
  </div>`;
  document.getElementById('modal-body').innerHTML = body;
  modal.classList.add('open');
}

function closeWordModal(e) {
  if (!e || e.target === document.getElementById('word-modal')) document.getElementById('word-modal').classList.remove('open');
}


// =============================================
// FAVORITES
// =============================================
let favSortOrder = 'newest';

function saveToFavorites(data) {
  if (!data) return;
  const exists = state.favorites.find(f => f.word === data.word);
  if (exists) { toast(`"${data.word}" is already in favorites`, 'info'); return; }
  state.favorites.unshift(data);
  localStorage.setItem('vm_favorites', JSON.stringify(state.favorites));
  if (state.isOnline) SECURE_API.recordWord(data.word, 'favorite', data.partOfSpeech);
  toast(`⭐ "${data.word}" saved to favorites!`, 'success');
  addXP(5, 'Saved a word');
}

function addToFlashcards(data) {
  if (!data) return;
  const exists = state.flashcards.find(f => f.word === data.word);
  if (!exists) { state.flashcards.push(data); }
}

function renderFavorites() {
  updateFavCount();
  const el = document.getElementById('favorites-container');
  const searchWrap = document.getElementById('fav-search-wrap');
  if (!state.favorites.length) {
    if (searchWrap) searchWrap.style.display = 'none';
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">⭐</div><div class="empty-title">No Saved Words Yet</div><div class="empty-desc">Save words while exploring to build your personal vocabulary list</div><button class="btn btn-primary" onclick="showPage('explore')">Start Exploring</button></div>`;
    return;
  }
  if (searchWrap) searchWrap.style.display = 'block';
  const q = (document.getElementById('fav-search-input')?.value || '').trim().toLowerCase();
  let list = state.favorites;
  if (q) list = list.filter(w => w.word.toLowerCase().includes(q) || (w.definition || '').toLowerCase().includes(q));
  if (favSortOrder === 'alpha') list = [...list].sort((a, b) => a.word.localeCompare(b.word));
  else list = [...list];
  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <span style="font-size:12px;color:var(--text2)">${list.length} of ${state.favorites.length} saved word${state.favorites.length !== 1 ? 's' : ''}</span>
    </div>
    <div class="fav-grid">${list.map((w, i) => {
      const realIdx = state.favorites.indexOf(w);
      return `
      <div class="fav-card" onclick="showWordModal(state.favorites[${realIdx}])">
        <div class="fav-head">
          <span class="fav-word">${w.word}</span>
          ${w.partOfSpeech ? `<span class="fav-pos">${w.partOfSpeech}</span>` : ''}
          ${w.phonetic ? `<span class="fav-phon">${w.phonetic}</span>` : ''}
        </div>
        <div class="fav-def">${(w.definition || '').substring(0, 90)}${(w.definition || '').length > 90 ? '...' : ''}</div>
        <div class="fav-actions">
          <button class="btn-icon" onclick="event.stopPropagation();pronounceWord('${w.word}')" title="Listen">🔊</button>
          <button class="btn-icon" onclick="event.stopPropagation();addToFlashcards(state.favorites[${realIdx}]);toast('Added to flashcards!','success')" title="Add to flashcards">🃏</button>
          <button class="btn-icon del" onclick="event.stopPropagation();removeFavorite(${realIdx})" title="Remove">🗑</button>
        </div>
      </div>`;
    }).join('')}</div>`;
}

function favSort() {
  favSortOrder = favSortOrder === 'newest' ? 'alpha' : 'newest';
  document.getElementById('fav-sort-btn').textContent = favSortOrder === 'newest' ? '📅 Newest' : '🔤 A-Z';
  renderFavorites();
}

function filterFavorites() { renderFavorites(); }

function removeFavorite(i) {
  const word = state.favorites[i]?.word;
  state.favorites.splice(i, 1);
  localStorage.setItem('vm_favorites', JSON.stringify(state.favorites));
  if (state.isOnline && word) SECURE_API.recordWord(word, 'unfavorite');
  renderFavorites();
  updateFavCount();
  toast('Removed from favorites', 'info');
}

function clearFavorites() {
  if (!confirm('Clear all favorites?')) return;
  state.favorites = [];
  localStorage.setItem('vm_favorites', JSON.stringify([]));
  renderFavorites();
  updateFavCount();
  toast('Favorites cleared', 'info');
}


// =============================================
// RECENT WORDS
// =============================================
function addToRecent(data) {
  state.recentWords = [data, ...state.recentWords.filter(w => w.word !== data.word)].slice(0, 20);
  localStorage.setItem('vm_recent', JSON.stringify(state.recentWords));
}

function renderRecentWords() {
  const el = document.getElementById('recent-words-row');
  if (!state.recentWords.length) return;
  el.innerHTML = state.recentWords.slice(0, 8).map((w, i) =>
    `<span class="tag rel" style="cursor:pointer" onclick="showWordModal(state.recentWords[${i}])">${w.word}</span>`
  ).join('');
}


// =============================================
// FLASHCARDS
// =============================================
let fcSessionStats = { easy: 0, medium: 0, hard: 0, total: 0, completed: false };

async function initFlashcards() {
  if (!state.flashcards.length) await loadFlashcardWords();
  else renderFlashcard();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function loadFlashcardWords() {
  state.flashcards = [];
  fcSessionStats = { easy: 0, medium: 0, hard: 0, total: 0, completed: false };
  toast('Loading flashcards...', 'info');
  const words = await API.fetchWordsFromAPI(12, state.difficulty);
  const selected = words.slice(0, 8);
  const results = await Promise.all(selected.map(w => API.getFullWordData(w)));
  state.flashcards = API.shuffle(results.filter(Boolean));
  state.fcIndex = 0;
  state.usedFlashcardWords = [...new Set([...state.usedFlashcardWords, ...state.flashcards.map(f => f.word)])];
  localStorage.setItem('vm_fc_used', JSON.stringify(state.usedFlashcardWords));
  renderFlashcard();
  toast(`Loaded ${state.flashcards.length} flashcards!`, 'success');
}

function shuffleFlashcards() {
  shuffle(state.flashcards);
  state.fcIndex = 0;
  renderFlashcard();
  toast('Flashcards shuffled!', 'info');
}

function renderFlashcard() {
  const el = document.getElementById('empty-fc');
  const summary = document.getElementById('fc-summary');
  const stats = document.getElementById('fc-session-stats');
  const main = document.getElementById('flashcard-main');
  if (!state.flashcards.length) { el.style.display = 'block'; summary.style.display = 'none'; if (stats) stats.style.display = 'none'; main.querySelector('.flashcard-container').style.display = 'none'; return; }
  if (fcSessionStats.completed) return;
  el.style.display = 'none';
  summary.style.display = 'none';
  if (stats) stats.style.display = 'block';
  const navEl = main.querySelector('.flashcard-nav');
  if (navEl) navEl.style.display = 'flex';
  main.querySelector('.flashcard-container').style.display = 'block';
  const w = state.flashcards[state.fcIndex];
  document.getElementById('fc-word').textContent = w.word;
  document.getElementById('fc-phonetic').textContent = w.phonetic || '';
  document.getElementById('fc-type').textContent = w.partOfSpeech?.toUpperCase();
  document.getElementById('fc-def').textContent = w.definition;
  document.getElementById('fc-example').textContent = w.example ? `"${w.example}"` : '';
  const syns = document.getElementById('fc-syns');
  if (w.synonyms && w.synonyms.length) {
    syns.innerHTML = w.synonyms.slice(0, 4).map(s => `<span class="tag syn">${s}</span>`).join('');
  } else syns.innerHTML = '';
  document.getElementById('fc-progress').textContent = `Card ${state.fcIndex + 1} of ${state.flashcards.length}`;
  updateFCSessionStats();
  const inner = document.getElementById('flashcard-inner');
  inner.classList.remove('flipped');
  document.getElementById('fc-actions').style.display = 'none';
  state.stats.cardsReviewed++;
  saveStats();
  checkAchievements();
}

function updateFCSessionStats() {
  const total = state.flashcards.length;
  const done = fcSessionStats.easy + fcSessionStats.medium + fcSessionStats.hard;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const progressEl = document.getElementById('fc-session-progress');
  if (progressEl) progressEl.textContent = `${done}/${total}`;
  document.getElementById('fc-session-easy').textContent = fcSessionStats.easy;
  document.getElementById('fc-session-medium').textContent = fcSessionStats.medium;
  document.getElementById('fc-session-hard').textContent = fcSessionStats.hard;
  const bar = document.getElementById('fc-progress-bar');
  if (bar) bar.style.width = pct + '%';
}

function flipCard() {
  const inner = document.getElementById('flashcard-inner');
  inner.classList.toggle('flipped');
  if (inner.classList.contains('flipped')) {
    document.getElementById('fc-actions').style.display = 'flex';
    addXP(2, 'Reviewed flashcard');
  }
}

function nextCard() {
  if (state.fcIndex < state.flashcards.length - 1) {
    state.fcIndex++;
    renderFlashcard();
  } else {
    showFCSummary();
  }
}

function prevCard() {
  if (state.fcIndex > 0) {
    state.fcIndex--;
    renderFlashcard();
  }
}

function showFCSummary() {
  fcSessionStats.completed = true;
  document.getElementById('fc-session-stats').style.display = 'none';
  document.querySelector('.flashcard-container').style.display = 'none';
  document.querySelector('.flashcard-nav').style.display = 'none';
  document.getElementById('fc-actions').style.display = 'none';
  const summary = document.getElementById('fc-summary');
  summary.style.display = 'block';
  const total = fcSessionStats.easy + fcSessionStats.medium + fcSessionStats.hard;
  const pct = total > 0 ? Math.round((fcSessionStats.easy / total) * 100) : 0;
  document.getElementById('fc-summary-text').innerHTML = `
    You reviewed <strong>${total}</strong> cards!<br>
    <span style="color:var(--emerald2)">😄 Easy: ${fcSessionStats.easy}</span> •
    <span style="color:var(--amber2)">😐 Okay: ${fcSessionStats.medium}</span> •
    <span style="color:var(--rose2)">😰 Hard: ${fcSessionStats.hard}</span><br>
    <span style="color:var(--accent2)">Mastery: ${pct}%</span>
  `;
}

function markCard(difficulty) {
  fcSessionStats[difficulty]++;
  fcSessionStats.total++;
  if (difficulty === 'hard') {
    const card = state.flashcards.splice(state.fcIndex, 1)[0];
    state.flashcards.push(card);
    toast('Added to review pile', 'info');
  } else if (difficulty === 'easy') {
    addXP(5, 'Easy card mastered');
    toast('Great! Keep it up!', 'success');
  } else {
    toast('Okay!', 'info');
  }
  updateFCSessionStats();
  if (state.fcIndex < state.flashcards.length) {
    renderFlashcard();
  } else if (state.flashcards.length > 0) {
    state.fcIndex = 0;
    renderFlashcard();
  } else {
    showFCSummary();
  }
}

document.addEventListener('keydown', function(e) {
  const fcPage = document.getElementById('page-flashcards');
  if (!fcPage || !fcPage.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') prevCard();
  else if (e.key === 'ArrowRight') nextCard();
  else if (e.key === ' ' || e.key === 'Space') { e.preventDefault(); flipCard(); }
  else if (e.key === '1') markCard('hard');
  else if (e.key === '2') markCard('medium');
  else if (e.key === '3') markCard('easy');
});


// =============================================
let searchDebounce = null;

function initSearchPage() {
  const input = document.getElementById('page-search-input');
  input.addEventListener('keydown', e => { if (e.key === 'Enter') runPageSearch(); });
  input.addEventListener('input', () => {
    document.getElementById('search-clear-btn').style.display = input.value ? 'flex' : 'none';
  });
  renderSearchHistory();
}

function clearPageSearch() {
  document.getElementById('page-search-input').value = '';
  document.getElementById('search-clear-btn').style.display = 'none';
  document.getElementById('page-search-results').innerHTML = `
    <div class="empty-state" style="grid-column:1/-1">
      <div class="empty-icon">🔍</div>
      <div class="empty-title">Search for Words</div>
      <div class="empty-desc">Enter a word, concept, or topic to explore related vocabulary</div>
    </div>`;
}

function getSearchHistory() {
  try { return JSON.parse(localStorage.getItem('vm_search_history') || '[]'); } catch { return []; }
}

function addSearchHistory(q) {
  let h = getSearchHistory().filter(s => s !== q);
  h.unshift(q);
  if (h.length > 8) h = h.slice(0, 8);
  localStorage.setItem('vm_search_history', JSON.stringify(h));
  renderSearchHistory();
}

function clearSearchHistory() {
  localStorage.removeItem('vm_search_history');
  renderSearchHistory();
}

function renderSearchHistory() {
  const h = getSearchHistory();
  const container = document.getElementById('search-recent');
  const list = document.getElementById('search-recent-list');
  if (!container) return;
  if (!h.length) { container.style.display = 'none'; return; }
  container.style.display = 'block';
  list.innerHTML = h.map(q => `<span class="filter-btn" onclick="document.getElementById('page-search-input').value='${q.replace(/'/g,"\\'")}';runPageSearch()">${q}</span>`).join('');
}

function setSearchFilter(el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  state.searchFilter = el.dataset.filter;
}

async function runPageSearch() {
  const query = document.getElementById('page-search-input').value.trim();
  if (!query) return;
  addSearchHistory(query);
  const container = document.getElementById('page-search-results');
  container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px"><div class="skeleton" style="height:20px;margin-bottom:10px"></div><div class="skeleton" style="height:20px;width:80%"></div></div>`;
  let words = [];
  const filter = state.searchFilter;
  if (filter === 'ml') words = await API.getByMeaning(query);
  else if (filter === 'sp') words = await API.getSimilarSpelling(query);
  else if (filter === 'rel_syn') words = await API.getSynonyms(query);
  else if (filter === 'rel_ant') words = await API.getAntonyms(query);
  else if (filter === 'rel_rhy') words = await API.getRhymes(query);
  else if (filter === 'rel_trg') words = await API.getRelated(query);
  else if (filter === 'topics') words = await API.getByTopic(query);
  if (!words.length) { container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><div class="empty-title">No Results</div><div class="empty-desc">Try a different search term or filter</div></div>`; return; }
  const defs = await Promise.all(words.slice(0, 12).map(w => API.getDefinition(w)));
  const valid = defs.filter(Boolean);
  container.innerHTML = `<div class="search-result-count">${valid.length} result${valid.length !== 1 ? 's' : ''} for "${query}"</div>` +
    valid.map((w, i) => `
    <div class="search-word-card" onclick="loadWordDisplay('${w.word}');showPage('explore')">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
        <div class="search-word-name">${w.word}</div>
        <span class="search-result-type">${w.partOfSpeech}</span>
        ${w.phonetic ? `<span style="font-size:11px;color:var(--text2);font-family:var(--font-mono)">${w.phonetic}</span>` : ''}
      </div>
      <div class="search-word-def">${w.definition}</div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();pronounceWord('${w.word}')">🔊</button>
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();saveToFavorites(${JSON.stringify(w).replace(/"/g,'&quot;')})">⭐</button>
      </div>
    </div>`).join('');
}


// Topbar search with debounce
(function() {
  const el = document.getElementById('topbar-search');
  if (!el) return;
  el.addEventListener('input', function() {
    clearTimeout(searchDebounce);
    const q = this.value.trim();
    const drop = document.getElementById('search-results-dropdown');
    if (!q) { drop.style.display = 'none'; return; }
    searchDebounce = setTimeout(async () => {
      const words = await API.datamuse({ sp: q + '*', max: 6 });
      if (!words.length) { drop.style.display = 'none'; return; }
      drop.style.display = 'block';
      drop.innerHTML = words.map(w => `
        <div class="search-result-item" onclick="loadWordDisplay('${w}');document.getElementById('topbar-search').value='';document.getElementById('search-results-dropdown').style.display='none';showPage('explore')">
          <div><div class="search-result-word">${w}</div></div>
        </div>`).join('');
    }, 300);
  });
})();


// =============================================
// TEXT TO SPEECH
// =============================================
function pronounceWord(word) {
  if (!word) return;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}


// =============================================
// EXPLORE PAGE
// =============================================
function initExplorePage() {
  renderTopicChips('explore-topics');
  generateWordBatch();
}

async function generateWordBatch() {
  const container = document.getElementById('word-batch-grid');
  if (!container) return;
  container.innerHTML = Array(6).fill(`<div class="skeleton" style="height:140px"></div>`).join('');
  const words = await API.fetchWordsFromAPI(10, state.difficulty);
  const defs = await Promise.all(words.slice(0, 6).map(w => API.getDefinition(w)));
  state.wordBatch = defs.filter(Boolean);
  container.innerHTML = state.wordBatch.map((w, i) => `
    <div class="search-word-card" onclick="loadWordDisplay('${w.word}', false)">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div class="search-word-name">${w.word}</div>
        <span class="search-result-type">${w.partOfSpeech}</span>
      </div>
      <div class="search-word-def">${w.definition.substring(0, 80)}...</div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();pronounceWord('${w.word}')">🔊</button>
        <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();saveToFavorites(state.wordBatch[${i}])">⭐</button>
      </div>
    </div>`).join('');
}

// =============================================
// DIFFICULTY
// =============================================
function setDifficulty(el) {
  document.querySelectorAll('.diff-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  state.difficulty = el.dataset.diff;
  localStorage.setItem('vm_difficulty', state.difficulty);
  toast(`Difficulty: ${el.dataset.diff}`, 'info', 1500);
}

