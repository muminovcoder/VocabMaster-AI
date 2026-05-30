// =============================================
// VocabMaster AI — Books Module
// IELTS vocabulary study guides
// =============================================

// ===== BOOKS LIST =====
const BOOKS_LIST = [
  {
    id: 'ielts-advanced',
    title: 'Vocabulary for IELTS Advanced',
    author: 'Pauline Cullen',
    desc: 'Master 540+ high-level academic words across 9 comprehensive units. Each word includes phonetics, definitions, examples, and synonyms.',
    level: 'Advanced',
    pages: 540,
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #7c6fff, #22d3ee)',
    tags: ['IELTS', 'Band 7+', 'Academic', '9 Units']
  }
];

// ===== ESCAPE QUOTES =====
function escapeQuotes(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ===== RENDER BOOKS =====
function renderBooks() {
  const el = document.getElementById('books-content');
  if (state.booksPage === 'library') renderBooksLibrary(el);
  else renderBooksReading(el);
}

// ===== LIBRARY VIEW =====
function renderBooksLibrary(el) {
  el.innerHTML = `
    <div class="books-hero">
      <div class="books-hero-bg"></div>
      <div class="books-hero-content">
        <div class="books-hero-icon">📚</div>
        <div class="books-hero-title">Vocabulary Library</div>
        <div class="books-hero-sub">${IELTS_WORDS.length}+ academic words organized for IELTS success</div>
        <div class="books-hero-stats">
          <div class="books-hero-stat"><span class="bh-stat-val">${IELTS_WORDS.length}</span><span class="bh-stat-lbl">Words</span></div>
          <div class="books-hero-stat"><span class="bh-stat-val">9</span><span class="bh-stat-lbl">Units</span></div>
          <div class="books-hero-stat"><span class="bh-stat-val">${IELTS_WORDS.reduce((s,w) => s + (w.syns?.length || 0), 0)}</span><span class="bh-stat-lbl">Synonyms</span></div>
        </div>
      </div>
    </div>
    <div class="books-library-grid">
      ${BOOKS_LIST.map(b => `
        <div class="books-lib-card" onclick="openBook('${b.id}')">
          <div class="books-lib-cover" style="background:${b.gradient}">
            <div class="books-lib-icon">${b.icon}</div>
          </div>
          <div class="books-lib-info">
            <div class="books-lib-badges">${b.tags.map(t => `<span class="badge badge-accent" style="font-size:10px">${t}</span>`).join('')}</div>
            <div class="books-lib-title">${b.title}</div>
            <div class="books-lib-author">by ${b.author}</div>
            <div class="books-lib-desc">${b.desc}</div>
            <div class="books-lib-meta">📄 ${b.pages} words • ${b.level}</div>
            <button class="btn btn-primary books-open-btn" onclick="event.stopPropagation();openBook('${b.id}')">📖 Open Book</button>
          </div>
        </div>`).join('')}
    </div>`;
  setTimeout(replaceEmojis, 50);
}

// ===== READING VIEW =====
function openBook(id) {
  state.booksPage = 'reading';
  state.booksTopic = 'all';
  renderBooks();
}

function closeBook() {
  state.booksPage = 'library';
  renderBooks();
}

function filterBooksTopic(topic) {
  state.booksTopic = topic;
  renderBooks();
}

window._openBookWord = function(word, def, ex, pos, synsStr) {
  const syns = synsStr ? synsStr.split(',').filter(Boolean) : [];
  const wordData = {
    word, definition: def, example: ex, partOfSpeech: pos,
    synonyms: syns, antonyms: [], related: [], phonetic: ''
  };
  showWordModal(wordData);
};

window._saveBookWord = function(word, def, pos) {
  const existing = state.favorites.find(f => f.word === word);
  if (existing) { toast('Already saved! ⭐', 'info', 1500); return; }
  state.favorites.push({ word, definition: def, partOfSpeech: pos, synonyms: [], antonyms: [], example: '', phonetic: '' });
  localStorage.setItem('vm_favorites', JSON.stringify(state.favorites));
  toast('Saved to favorites! ⭐', 'success', 1500);
  updateFavCount();
};

function renderBooksReading(el) {
  const activeTopic = state.booksTopic || 'all';
  const unitNames = ['Communication','Environment','Technology','Health','Education','Economy','Society','Science','Lifestyle'];
  const filtered = activeTopic === 'all' ? IELTS_WORDS : IELTS_WORDS.filter(w => w.u === activeTopic);

  el.innerHTML = `
    <div class="books-back-row">
      <button class="books-back-lib" onclick="closeBook()">← Back to Library</button>
    </div>
    <div class="books-header-card">
      <div class="books-header-glow"></div>
      <div class="books-header-content">
        <div class="books-header-icon">🎯</div>
        <div class="books-header-info">
          <div class="books-header-title">Vocabulary for IELTS Advanced</div>
          <div class="books-header-sub">by Pauline Cullen • ${IELTS_WORDS.length} words • 9 Units • Band 7+</div>
          <div class="books-header-desc">High-level academic vocabulary organized by theme. Click any word to see full details.</div>
        </div>
      </div>
      <div class="books-header-stats">
        <div class="books-hstat"><span class="books-hstat-val">${filtered.length}</span><span class="books-hstat-lbl">Showing</span></div>
        <div class="books-hstat"><span class="books-hstat-val">${activeTopic === 'all' ? 9 : 1}</span><span class="books-hstat-lbl">Unit${activeTopic === 'all' ? 's' : ''}</span></div>
        <div class="books-hstat"><span class="books-hstat-val">${filtered.reduce((s,w) => s + (w.syns?.length || 0), 0)}</span><span class="books-hstat-lbl">Synonyms</span></div>
      </div>
    </div>
    <div class="books-topic-bar">
      <span class="books-topic-chip ${activeTopic === 'all' ? 'active' : ''}" onclick="filterBooksTopic('all')">📚 All Units</span>
      ${unitNames.map((name, i) => `<span class="books-topic-chip ${activeTopic === String(i + 1) ? 'active' : ''}" onclick="filterBooksTopic('${i + 1}')">📖 Unit ${i + 1}</span>`).join('')}
    </div>
    <div class="books-word-grid">
      ${filtered.map(w => `
        <div class="books-word-card" onclick="window._openBookWord('${escapeQuotes(w.w)}','${escapeQuotes(w.def)}','${escapeQuotes(w.ex)}','${escapeQuotes(w.pos)}','${escapeQuotes((w.syns||[]).join(','))}')">
          <div class="books-word-head">
            <span class="books-word">${w.w}</span>
            <span class="books-pos">${w.pos}</span>
          </div>
          <div class="books-def">${w.def}</div>
          <div class="books-ex">"${w.ex}"</div>
          ${w.syns?.length ? `<div class="books-syns"><span class="books-syns-label">Synonyms:</span> ${w.syns.slice(0,3).join(', ')}${w.syns.length > 3 ? '...' : ''}</div>` : ''}
          <div class="books-actions-row">
            <button class="books-pronounce-btn" onclick="event.stopPropagation();pronounceWord('${escapeQuotes(w.w)}')" title="Pronounce">🔊</button>
            <button class="books-save-btn" onclick="event.stopPropagation();window._saveBookWord('${escapeQuotes(w.w)}','${escapeQuotes(w.def)}','${escapeQuotes(w.pos)}')" title="Save word">⭐</button>
          </div>
        </div>`).join('')}
    </div>
    ${activeTopic === 'all' ? '' : `<div class="books-count" style="text-align:center;margin-top:24px;font-size:14px;color:var(--text2)">${filtered.length} words in this unit</div>`}`;
  setTimeout(replaceEmojis, 50);
}

function updateFavCount() {
  const badge = document.getElementById('fav-count-badge');
  if (!badge) return;
  const count = (state.favorites || []).length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline' : 'none';
}
