// =============================================
// VocabMaster AI — Leaderboard Module
// Real users only — ready for registration
// =============================================

function updateTopbarRank() {
  const rankEl = document.getElementById('rank-display');
  const badgeEl = document.getElementById('rank-badge');
  if (!rankEl) return;
  const s = state.stats;
  rankEl.textContent = '1';
  if (badgeEl) badgeEl.title = `#1 · ${s.totalXP || 0} XP · Level ${s.level || 1}`;
}

function renderLeaderboardModule() {
  updateTopbarRank();
  const el = document.getElementById('leaderboard-list');
  const s = state.stats;
  const name = localStorage.getItem('vm_username') || 'Learner';

  const users = [{ name, xp: s.totalXP || 0, level: s.level || 1, achievements: (s.achievements || []).length, words: s.wordsLearned || 0, isMe: true }];
  const maxXp = users[0].xp || 1;

  el.innerHTML = `
    <div class="lb-hero">
      <div class="lb-hero-bg"></div>
      <div class="lb-hero-content">
        <div class="lb-hero-icon">👑</div>
        <div class="lb-hero-title">Leaderboard</div>
        <div class="lb-hero-sub">Real learners ranked by XP</div>
        <div class="lb-hero-stats">
          <div class="lb-hero-stat"><span class="lbs-val">${s.level || 1}</span><span class="lbs-lbl">Your Level</span></div>
          <div class="lb-hero-stat"><span class="lbs-val">${s.totalXP || 0}</span><span class="lbs-lbl">Your XP</span></div>
          <div class="lb-hero-stat"><span class="lbs-val">${(s.achievements || []).length}</span><span class="lbs-lbl">Achievements</span></div>
        </div>
      </div>
    </div>
    <div class="lb-list" id="lb-list">
      ${users.map((u, i) => {
        const pct = Math.min(100, (u.xp / maxXp) * 100);
        return `
          <div class="lb-row lb-me" id="lb-my-row">
            <div class="lb-rank gold">👑</div>
            <div class="lb-avatar" style="background:var(--accent2)">${u.name[0]}</div>
            <div class="lb-info">
              <span class="lb-name">${u.name}</span>
              <span class="lb-badge">YOU</span>
            </div>
            <div class="lb-cell lvl"><span class="lv">Lv.${u.level}</span><span class="tl">Level ${u.level}</span></div>
            <div class="lb-cell xp"><span class="xv">${u.xp.toLocaleString()}</span><span class="xb"><span class="xf" style="width:${pct}%"></span></span></div>
            <div class="lb-cell ach"><span>🏆</span><span class="av">${u.achievements}</span></div>
          </div>`;
      }).join('')}
    </div>
    <div class="lb-empty">
      <div class="lb-empty-icon">👥</div>
      <div class="lb-empty-text">More learners will appear here once they register</div>
    </div>`;
  setTimeout(() => {
    replaceEmojis();
    const myRow = document.getElementById('lb-my-row');
    if (myRow) myRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}
