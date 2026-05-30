// =============================================
// VocabMaster AI — Pomodoro Timer Module
// =============================================

const POMO_DEFAULTS = { work: 25, shortBreak: 5, longBreak: 15, longBreakInterval: 4 };
let pomo = {
  mode: 'work',
  time: POMO_DEFAULTS.work * 60,
  total: POMO_DEFAULTS.work * 60,
  running: false,
  interval: null,
  sessionCount: 0,
  completedPomodoros: 0,
  todayFocus: parseInt(localStorage.getItem('vm_pomo_today') || '0'),
  todayDate: localStorage.getItem('vm_pomo_date') || '',
  settings: JSON.parse(localStorage.getItem('vm_pomo_settings') || JSON.stringify(POMO_DEFAULTS))
};

function pomoCheckDay() {
  const today = new Date().toDateString();
  if (pomo.todayDate !== today) {
    pomo.todayFocus = 0;
    pomo.todayDate = today;
    localStorage.setItem('vm_pomo_date', today);
    localStorage.setItem('vm_pomo_today', '0');
  }
}

function renderPomodoro() {
  const el = document.getElementById('pomodoro-content');
  const s = pomo.settings;
  const circleLen = 2 * Math.PI * 126;
  const progress = pomo.total > 0 ? (pomo.time / pomo.total) : 1;
  const offset = circleLen * (1 - progress);
  const mins = Math.floor(pomo.time / 60);
  const secs = pomo.time % 60;
  const isWork = pomo.mode === 'work';
  pomoCheckDay();
  const totalFocusMin = Math.round(pomo.todayFocus + (isWork && pomo.running ? (pomo.total - pomo.time) / 60 : 0));

  el.innerHTML = `
    <div class="pomo-hero">
      <div class="pomo-hero-bg"></div>
      <div class="pomo-hero-content">
        <div class="pomo-hero-icon">🍅</div>
        <div class="pomo-hero-title">Pomodoro Timer</div>
        <div class="pomo-hero-sub">Focus on your studies with timed sessions</div>
      </div>
    </div>
    <div class="pomodoro-wrap">
      <svg width="0" height="0" style="position:absolute"><defs>
        <linearGradient id="ptGradWork" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#7c6fff"/><stop offset="100%" stop-color="#22d3ee"/>
        </linearGradient>
        <linearGradient id="ptGradBreak" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#34d399"/>
        </linearGradient>
      </defs></svg>
      <div class="pomodoro-timer-circle">
        <svg viewBox="0 0 280 280">
          <circle class="pt-bg" cx="140" cy="140" r="126"/>
          <circle class="pt-fill ${isWork ? 'work' : 'break'}" cx="140" cy="140" r="126"
            stroke-dasharray="${circleLen}" stroke-dashoffset="${offset}"
            transform="rotate(-90, 140, 140)"/>
        </svg>
        <div class="pomodoro-time-display">
          <div class="pomodoro-time ${isWork ? 'work' : 'break'}">${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}</div>
          <div class="pomodoro-label ${isWork ? 'work' : 'break'}">${isWork ? 'FOCUS TIME' : pomo.mode === 'longBreak' ? 'LONG BREAK' : 'SHORT BREAK'}</div>
          <div class="pomo-session-info">Session ${pomo.sessionCount + 1}</div>
        </div>
      </div>
      <div class="pomodoro-controls">
        ${!pomo.running
          ? `<button class="pomo-btn start" onclick="pomoStart()"><span>▶</span> Start</button>`
          : `<button class="pomo-btn pause" onclick="pomoPause()"><span>⏸</span> Pause</button>`}
        <button class="pomo-btn second" onclick="pomoReset()"><span>⟳</span> Reset</button>
        <button class="pomo-btn second" onclick="pomoSkip()"><span>⏭</span> Skip</button>
      </div>
      <div class="pomo-settings">
        <div class="pomo-setting">
          <label>Work</label>
          <input type="number" value="${s.work}" min="1" max="120" onchange="pomoUpdateSetting('work',+this.value)">
        </div>
        <div class="pomo-setting">
          <label>Short Break</label>
          <input type="number" value="${s.shortBreak}" min="1" max="30" onchange="pomoUpdateSetting('shortBreak',+this.value)">
        </div>
        <div class="pomo-setting">
          <label>Long Break</label>
          <input type="number" value="${s.longBreak}" min="1" max="60" onchange="pomoUpdateSetting('longBreak',+this.value)">
        </div>
        <div class="pomo-setting">
          <label>Long Break Interval</label>
          <input type="number" value="${s.longBreakInterval}" min="1" max="10" onchange="pomoUpdateSetting('longBreakInterval',+this.value)">
        </div>
      </div>
      <div class="pomo-stats">
        <div class="pomo-stat">
          <span class="pomo-stat-icon">🍅</span>
          <span class="pomo-stat-val">${pomo.completedPomodoros}</span>
          <span class="pomo-stat-lbl">Pomodoros</span>
        </div>
        <div class="pomo-stat">
          <span class="pomo-stat-icon">📊</span>
          <span class="pomo-stat-val">${pomo.sessionCount}</span>
          <span class="pomo-stat-lbl">Sessions</span>
        </div>
        <div class="pomo-stat">
          <span class="pomo-stat-icon">⏱️</span>
          <span class="pomo-stat-val">${totalFocusMin}</span>
          <span class="pomo-stat-lbl">Min Today</span>
        </div>
        <div class="pomo-stat">
          <span class="pomo-stat-icon">${isWork ? '🎯' : '☕'}</span>
          <span class="pomo-stat-val">${isWork ? 'Focus' : 'Break'}</span>
          <span class="pomo-stat-lbl">Mode</span>
        </div>
      </div>
      <div class="pomo-shortcuts">
        <span>Space</span> Start/Pause · <span>R</span> Reset · <span>S</span> Skip
      </div>
    </div>`;
}

function pomoStart() {
  if (pomo.running) return;
  if (pomo.time <= 0) pomoReset();
  pomo.running = true;
  pomo.interval = setInterval(() => {
    pomo.time--;
    if (pomo.time <= 0) {
      clearInterval(pomo.interval);
      pomo.running = false;
      pomo.completedPomodoros++;
      pomoCheckDay();
      if (pomo.mode === 'work') {
        pomo.sessionCount++;
        pomo.todayFocus += pomo.settings.work;
        localStorage.setItem('vm_pomo_today', String(pomo.todayFocus));
        toast('✅ Focus complete! Time for a break!', 'success', 4000);
        notifyPomo('Focus Complete!', 'Great job! Take a break.');
        pomo.mode = (pomo.sessionCount % pomo.settings.longBreakInterval === 0) ? 'longBreak' : 'shortBreak';
      } else {
        toast('☕ Break over! Let\'s focus!', 'info', 4000);
        notifyPomo('Break Over!', 'Time to focus again.');
        pomo.mode = 'work';
      }
      pomo.time = pomo.settings[pomo.mode] * 60;
      pomo.total = pomo.time;
      renderPomodoro();
      if (pomo.mode === 'work') pomoStart();
    }
    renderPomodoro();
  }, 1000);
}

function pomoPause() {
  clearInterval(pomo.interval);
  pomo.running = false;
  renderPomodoro();
}

function pomoReset() {
  clearInterval(pomo.interval);
  pomo.running = false;
  pomo.mode = 'work';
  pomo.time = pomo.settings.work * 60;
  pomo.total = pomo.time;
  renderPomodoro();
}

function pomoSkip() {
  clearInterval(pomo.interval);
  pomo.running = false;
  if (pomo.mode === 'work') {
    pomo.sessionCount++;
    pomo.mode = (pomo.sessionCount % pomo.settings.longBreakInterval === 0) ? 'longBreak' : 'shortBreak';
  } else {
    pomo.mode = 'work';
  }
  pomo.time = pomo.settings[pomo.mode] * 60;
  pomo.total = pomo.time;
  renderPomodoro();
  if (pomo.mode === 'work') pomoStart();
}

function pomoUpdateSetting(key, val) {
  if (val < 1) val = 1;
  pomo.settings[key] = val;
  localStorage.setItem('vm_pomo_settings', JSON.stringify(pomo.settings));
  if (!pomo.running) {
    pomo.time = pomo.settings[pomo.mode] * 60;
    pomo.total = pomo.time;
    renderPomodoro();
  }
}

function notifyPomo(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '🍅' });
  }
}

document.addEventListener('keydown', e => {
  const page = document.getElementById('page-pomodoro');
  if (!page || !page.classList.contains('active')) return;
  if (e.key === ' ' || e.key === 'Space') { e.preventDefault(); pomo.running ? pomoPause() : pomoStart(); }
  else if (e.key === 'r' || e.key === 'R') pomoReset();
  else if (e.key === 's' || e.key === 'S') pomoSkip();
});

if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
