// =============================================
// VocabMaster AI — Dashboard/General Module
// The main landing page with stats, WOTD, heatmap
// =============================================

// ===== ANIMATED COUNTER =====
function animateCounter(el, target, suffix = '', duration = 800) {
  if (!el) return;
  const start = parseInt(el.textContent.replace(/[^0-9]/g, '')) || 0;
  const diff = target - start;
  if (diff === 0) { el.textContent = target + suffix; return; }
  const startTime = performance.now();
  function tick(now) {
    const pct = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - pct, 3);
    el.textContent = Math.round(start + diff * eased) + suffix;
    if (pct < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== MOTIVATIONAL MESSAGE =====
function getMotivation(streak, wordsToday) {
  if (streak >= 30) return { msg: 'Legendary streak! 🔥', emoji: '🏆' };
  if (streak >= 14) return { msg: 'Unstoppable! Keep the fire burning!', emoji: '🔥' };
  if (streak >= 7) return { msg: 'One full week — incredible dedication!', emoji: '💪' };
  if (streak >= 3) return { msg: 'Building momentum! Great job!', emoji: '📈' };
  if (wordsToday > 0) return { msg: 'Great start! Come back tomorrow!', emoji: '⭐' };
  return { msg: 'Ready to learn some words today?', emoji: '🚀' };
}

// ===== REFRESH DASHBOARD =====
function refreshDashboard() {
  updateSidebarXP();
  const h = new Date().getHours();
  document.getElementById('greeting-time').textContent = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';

  const s = state.stats;

  // Dynamic status subtitle under greeting
  const subEl = document.querySelector('#page-dashboard .page-subtitle');
  if (subEl) {
    if (s.streak > 0) subEl.textContent = `🔥 ${s.streak}-day streak · ${s.wordsToday} words today · Level ${s.level}`;
    else subEl.textContent = `📚 ${s.wordsLearned} words learned · ${s.wordsToday} today · Start your streak!`;
  }

  // Animated stat counters
  animateCounter(document.getElementById('stat-words-learned'), s.wordsLearned);
  document.getElementById('stat-words-change').textContent = `+${s.wordsToday} today`;

  const accEl = document.getElementById('stat-accuracy');
  const acc = s.totalQuestions ? Math.round((s.correctAnswers / s.totalQuestions) * 100) : 0;
  s.accuracy = acc;
  accEl.textContent = s.totalQuestions ? acc + '%' : '--%';
  if (s.totalQuestions) animateCounter(accEl, acc, '%');

  const studyEl = document.getElementById('stat-study-time');
  studyEl.textContent = (s.studyMinutes || 0) + 'm';

  animateCounter(document.getElementById('stat-streak'), s.streak);
  animateCounter(document.getElementById('stat-xp'), s.totalXP);
  document.getElementById('stat-level').textContent = s.level;

  // Accuracy bar
  const accBar = document.getElementById('stat-accuracy-bar');
  if (accBar) accBar.style.width = (s.accuracy || 0) + '%';
  const xpBar = document.getElementById('stat-xp-bar');
  if (xpBar) xpBar.style.width = getLevelProgress() + '%';

  // Heatmap buttons
  document.querySelectorAll('#page-dashboard .hm-range-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.hmDays) === state.heatmapDays);
  });

  renderHeatmap('heatmap', state.heatmapDays);
  renderWeeklyChart();
  renderRecentWords();
  renderTopicChips('topic-chips');

  // Daily goal progress
  renderDailyGoal();

  // XP milestone
  renderXPMilestone();

  // Motivational tip
  renderMotivation();

  // Animate stat cards on entrance
  document.querySelectorAll('#page-dashboard .stat-card-modern').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + i * 80);
  });
}

// ===== DAILY GOAL TRACKER =====
function renderDailyGoal() {
  const goal = 10;
  const done = state.stats.wordsToday || 0;
  const pct = Math.min(100, (done / goal) * 100);
  const el = document.getElementById('daily-goal-tracker');
  if (!el) return;
  el.innerHTML = `
    <div class="dg-header">
      <span class="dg-label">🎯 Daily Goal</span>
      <span class="dg-count" style="color:${pct >= 100 ? 'var(--emerald2)' : 'var(--amber2)'}">${done} / ${goal}</span>
    </div>
    <div class="dg-track">
      <div class="dg-fill" style="width:${pct}%;background:${pct >= 100 ? 'linear-gradient(90deg,#10b981,#34d399)' : 'linear-gradient(90deg,#f59e0b,#f97316)'}"></div>
    </div>
    <div class="dg-sub">${pct >= 100 ? '✅ Goal reached! Amazing!' : `${goal - done} more words to reach your goal`}</div>
  `;
}

// ===== XP MILESTONE =====
function renderXPMilestone() {
  const lvl = state.stats.level;
  const threshold = LEVEL_THRESHOLDS[lvl - 1] || 0;
  const next = LEVEL_THRESHOLDS[lvl] || threshold + 1000;
  const pct = getLevelProgress();
  const el = document.getElementById('xp-milestone');
  if (!el) return;
  const nextTitle = LEVEL_TITLES[lvl] || 'Max Level';
  el.innerHTML = `
    <div class="xm-row">
      <span class="xm-label">⭐ Level ${lvl} → ${nextTitle}</span>
      <span class="xm-count">${state.stats.totalXP - threshold} / ${next - threshold} XP</span>
    </div>
    <div class="xm-track"><div class="xm-fill" style="width:${pct}%"></div></div>
  `;
}

// ===== MOTIVATION =====
function renderMotivation() {
  const { msg, emoji } = getMotivation(state.stats.streak, state.stats.wordsToday);
  const el = document.getElementById('motivation-tip');
  if (!el) return;
  el.innerHTML = `${emoji} ${msg}`;
}

// ===== SET HEATMAP DAYS =====
function setHeatmapDays(days) {
  state.heatmapDays = days;
  document.querySelectorAll('#page-dashboard .hm-range-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.hmDays) === days);
  });
  renderHeatmap('heatmap', days);
}

// ===== HEATMAP TOOLTIP =====
let hmTooltip = null;
function getHmTooltip() {
  if (!hmTooltip) {
    hmTooltip = document.createElement('div');
    hmTooltip.className = 'hm-tooltip';
    document.body.appendChild(hmTooltip);
  }
  return hmTooltip;
}

// ===== RENDER HEATMAP =====
function renderHeatmap(id, days) {
  const el = document.getElementById(id);
  if (!el) return;
  const today = new Date();
  const todayKey = today.toISOString().split('T')[0];

  const cells = [];
  let totalWords = 0, activeDays = 0;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const count = state.stats.heatmap[key] || 0;
    if (count > 0) activeDays++;
    totalWords += count;
    cells.push({ date:key, day:d, count, level:count===0?0:count<3?1:count<7?2:count<14?3:4 });
  }

  let streak = 0;
  for (let i = cells.length - 1; i >= 0; i--) {
    if (cells[i].count > 0) streak++;
    else break;
  }
  let best = 0, cur = 0;
  for (const c of cells) {
    if (c.count > 0) { cur++; if (cur > best) best = cur; }
    else cur = 0;
  }

  const weeks = [];
  let week = [];
  const firstDate = cells[0].day;
  const startDow = firstDate.getDay();
  for (let p = 0; p < startDow; p++) week.push(null);
  for (const c of cells) {
    week.push(c);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) weeks.push(week);

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let monthHTML = '<div class="hm-months" style="grid-template-columns:' + weeks.map(() => '1fr').join(' ') + '">';
  let lastM = -1;
  for (let wi = 0; wi < weeks.length; wi++) {
    const w = weeks[wi];
    const firstReal = w.find(c => c !== null);
    const m = firstReal ? firstReal.day.getMonth() : -1;
    if (m !== lastM) {
      monthHTML += `<span>${m >= 0 ? monthNames[m] : ''}</span>`;
      lastM = m;
    } else {
      monthHTML += '<span></span>';
    }
  }
  monthHTML += '</div>';

  const dayNames = ['','Mon','','Wed','','Fri',''];
  const cellW = days > 100 ? 10 : days > 50 ? 12 : 14;
  const cellGap = days > 100 ? 2 : 3;

  let gridHTML = `<div class="hm-grid" style="grid-template-columns:repeat(${weeks.length},1fr);grid-template-rows:repeat(7,${cellW}px);gap:${cellGap}px">`;
  for (let row = 0; row < 7; row++) {
    for (let wi = 0; wi < weeks.length; wi++) {
      const w = weeks[wi];
      const c = row < w.length ? w[row] : null;
      if (c) {
        const isToday = c.date === todayKey;
        gridHTML += `<div class="hm-cell${isToday?' today':''}" data-lvl="${c.level}" data-date="${c.date}" data-count="${c.count}" style="width:${cellW}px;height:${cellW}px"></div>`;
      } else {
        gridHTML += `<div style="width:${cellW}px;height:${cellW}px"></div>`;
      }
    }
  }
  gridHTML += '</div>';

  const hasActivity = activeDays > 0;
  const fire = streak >= 30 ? '🔥' : streak >= 14 ? '🔥' : streak >= 7 ? '🔥' : streak >= 3 ? '🔥' : '🔥';

  el.innerHTML = `
    <div class="hm-wrap">
      <div class="hm-header">
        <div class="hm-header-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Activity
        </div>
        <div class="hm-header-label">
          <span>${days}d overview</span>
          ${streak > 0 ? `<span style="color:#fbbf24;font-weight:700">${fire} ${streak}-day streak</span>` : ''}
        </div>
      </div>
      <div class="hm-table">
        <div class="hm-col-head">
          ${dayNames.map(d => `<span>${d}</span>`).join('')}
        </div>
        <div>
          ${monthHTML}
          ${hasActivity ? gridHTML : `<div class="hm-empty"><div class="hm-empty-icon">📊</div><div class="hm-empty-text">No activity yet</div><div class="hm-empty-sub">Start learning words to build your streak!</div></div>`}
        </div>
      </div>
      <div class="hm-stats">
        <div class="hm-stat">
          <span class="hm-stat-icon">📝</span>
          <div><div class="hm-stat-val">${totalWords}</div><div class="hm-stat-label">Words</div></div>
        </div>
        <div class="hm-stat">
          <span class="hm-stat-icon">📅</span>
          <div><div class="hm-stat-val">${activeDays}</div><div class="hm-stat-label">Active days</div></div>
        </div>
        <div class="hm-stat">
          <span class="hm-stat-icon">📊</span>
          <div><div class="hm-stat-val">${activeDays > 0 ? Math.round(totalWords / activeDays) : 0}</div><div class="hm-stat-label">Avg/day</div></div>
        </div>
        <div class="hm-stat">
          <span class="hm-stat-icon">🏆</span>
          <div><div class="hm-stat-val">${best}</div><div class="hm-stat-label">Best streak</div></div>
        </div>
        <div style="margin-left:auto">
          <div class="hm-legend">
            <span class="hm-legend-label">Less</span>
            <div class="hm-legend-bar">
              <div class="hm-legend-cell" data-lvl="0"></div>
              <div class="hm-legend-cell" data-lvl="1"></div>
              <div class="hm-legend-cell" data-lvl="2"></div>
              <div class="hm-legend-cell" data-lvl="3"></div>
              <div class="hm-legend-cell" data-lvl="4"></div>
            </div>
            <span class="hm-legend-label">More</span>
          </div>
        </div>
      </div>
    </div>`;

  // Staggered pop animation
  const allCells = el.querySelectorAll('.hm-cell');
  allCells.forEach((cell, i) => {
    if (parseInt(cell.dataset.count) > 0) {
      const delay = Math.min(i * 3, 600);
      cell.style.animationDelay = delay + 'ms';
      cell.classList.add('animate');
    }
  });

  // Tooltip singleton
  const tooltip = getHmTooltip();
  el.querySelectorAll('.hm-cell').forEach(cell => {
    cell.addEventListener('mouseenter', e => {
      const date = cell.dataset.date;
      const count = parseInt(cell.dataset.count);
      const d = new Date(date + 'T12:00:00');
      const options = { weekday:'short', year:'numeric', month:'short', day:'numeric' };
      tooltip.innerHTML = `
        <div class="hm-tooltip-date">${d.toLocaleDateString('en-US', options)}</div>
        <div class="hm-tooltip-count"><strong>${count}</strong> ${count === 1 ? 'word' : 'words'}</div>
      `;
      tooltip.classList.add('show');
    });
    cell.addEventListener('mousemove', e => {
      let x = e.clientX + 16, y = e.clientY - 12;
      const r = tooltip.getBoundingClientRect();
      if (x + r.width > window.innerWidth - 8) x = e.clientX - r.width - 16;
      if (y + r.height > window.innerHeight - 8) y = e.clientY - r.height - 12;
      if (y < 4) y = e.clientY + 20;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    });
    cell.addEventListener('mouseleave', () => { tooltip.classList.remove('show'); });
  });
}

// ===== WEEKLY CHART =====
function renderWeeklyChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const container = document.getElementById('weekly-chart');
  if (!container) return;
  const values = days.map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - ((today + 6 - i) % 7));
    const key = d.toISOString().split('T')[0];
    return state.stats.heatmap[key] || 0;
  });
  const max = Math.max(...values, 1);
  container.innerHTML = days.map((d, i) => `
    <div class="chart-bar-row">
      <div class="chart-bar-label">${d}</div>
      <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${(values[i]/max*100).toFixed(0)}%"></div></div>
      <div class="chart-bar-val">${values[i]}</div>
    </div>`).join('');

  // Animate bars
  setTimeout(() => {
    container.querySelectorAll('.chart-bar-fill').forEach((bar, i) => {
      const w = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = w; bar.style.transition = 'width 0.5s ease'; }, i * 60);
    });
  }, 100);
}
