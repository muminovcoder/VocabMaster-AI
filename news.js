// =============================================
// VocabMaster AI — News & Roadmap Module
// =============================================

const NEWS_DATA = {
  releases: [
    {
      id: 'v2.0',
      title: 'IELTS Mock Exam',
      tag: 'Coming Next',
      tagColor: '#f59e0b',
      progress: 35,
      eta: 'Q4 2026',
      icon: '🎯',
      features: [
        'Full Reading simulation with real IELTS passages',
        'Writing Task 1 & 2 with band score estimation',
        'Speaking mock with cue cards & part questions',
        'Band Score Calculator (overall & individual)',
        'Timed exam mode with auto-submit',
        'Detailed performance analytics per section'
      ]
    },
    {
      id: 'v1.9',
      title: 'Grammar Master 2.0',
      tag: 'In Development',
      tagColor: '#22d3ee',
      progress: 60,
      eta: '2 weeks',
      icon: '📝',
      features: [
        '15 new grammar topics (conditionals, modals, passive)',
        'Interactive grammar exercises with instant feedback',
        'Grammar streak tracking & daily challenges',
        'Personalized weak-spot analysis',
        'Printable grammar cheat sheets'
      ]
    },
    {
      id: 'v1.8',
      title: 'Spaced Repetition System',
      tag: 'Planned',
      tagColor: '#a78bfa',
      progress: 15,
      eta: '3 weeks',
      icon: '🧠',
      features: [
        'SMART-5 algorithm for optimal review scheduling',
        'Daily review reminders & notifications',
        'Progress dashboard with retention metrics',
        'Custom review session settings',
        'Export review data (CSV/PDF)'
      ]
    },
    {
      id: 'v1.7',
      title: 'Multi-Language Support',
      tag: 'Planned',
      tagColor: '#34d399',
      progress: 10,
      eta: '5 weeks',
      icon: '🌐',
      features: [
        'Interface translations: Uzbek, Russian, Spanish, French',
        'Word definitions in multiple languages',
        'Bilingual quiz mode',
        'Community translation contributions',
        'Language-specific grammar guides'
      ]
    },
    {
      id: 'v1.6',
      title: 'Social & Community Features',
      tag: 'Research',
      tagColor: '#f472b6',
      progress: 5,
      eta: '8 weeks',
      icon: '👥',
      features: [
        'Friend system & study groups',
        'Weekly leaderboards with friends',
        'Shared flashcard decks',
        'Community word contributions',
        'Study streak competitions'
      ]
    },
    {
      id: 'v1.5',
      title: 'AI Tutor Integration',
      tag: 'Research',
      tagColor: '#fb923c',
      progress: 3,
      eta: '12 weeks',
      icon: '🤖',
      features: [
        'AI-powered word explanations & examples',
        'Pronunciation coach with voice analysis',
        'Personalized learning path recommendations',
        'AI-generated practice sentences',
        '24/7 tutor chatbot for questions'
      ]
    }
  ],
  milestones: [
    { label: 'Words Learned', current: 1250, target: 10000 },
    { label: 'Active Users', current: 342, target: 5000 },
    { label: 'Grammar Lessons', current: 24, target: 100 },
    { label: 'Quiz Questions', current: 480, target: 2000 }
  ]
};

function renderNews() {
  const el = document.getElementById('news-content');
  if (!el) return;
  
  const now = Date.now();
  const releaseCards = NEWS_DATA.releases.map(r => renderReleaseCard(r, now)).join('');
  const milestoneCards = NEWS_DATA.milestones.map(m => renderMilestoneCard(m)).join('');

  el.innerHTML = `
    <div class="page-header">
      <div class="page-title">📰 VocabMaster AI News</div>
      <div class="page-subtitle">Kelajakdagi yangilanishlar, rejalar va loyiha holati</div>
    </div>
    <div id="news-body">
      <div class="news-hero">
        <div class="news-hero-bg"></div>
        <div class="news-hero-content">
          <div class="news-hero-icon">🚀</div>
          <div class="news-hero-title">Roadmap 2026</div>
          <div class="news-hero-sub">Biz nima ustida ishlayapmiz va keyin nima keladi</div>
        </div>
      </div>

      <div class="news-countdown-row">
        ${renderCountdownCard('Next Release', getNextETA())}
        ${renderCountdownCard('Features Planned', String(NEWS_DATA.releases.reduce((s, r) => s + r.features.length, 0)))}
        ${renderCountdownCard('Active Milestones', String(NEWS_DATA.milestones.length))}
        ${renderCountdownCard('Overall Progress', getOverallProgress() + '%')}
      </div>

      <div class="news-section-title">🛣️ Development Roadmap</div>
      <div class="news-timeline">
        ${releaseCards}
      </div>

      <div class="news-section-title" style="margin-top:40px">🎯 Project Milestones</div>
      <div class="news-milestone-grid">
        ${milestoneCards}
      </div>

      <div class="news-footer">
        <div class="news-footer-text">
          VocabMaster AI — an ever-evolving project. Share your suggestions and feedback!
        </div>
      </div>
    </div>
  `;

  animateProgressBars();
}

function renderReleaseCard(r) {
  const featuresHtml = r.features.map(f =>
    `<li class="news-feature-item"><span class="nfi-icon">✦</span> ${f}</li>`
  ).join('');

  return `
    <div class="news-timeline-item">
      <div class="news-timeline-dot" style="border-color:${r.tagColor}"></div>
      <div class="news-timeline-card">
        <div class="ntc-header">
          <div class="ntc-icon">${r.icon}</div>
          <div style="flex:1;min-width:0">
            <div class="ntc-title">${r.title}</div>
            <div class="ntc-meta">
              <span class="ntc-version">${r.id}</span>
              <span class="ntc-tag" style="background:${r.tagColor}22;color:${r.tagColor};border-color:${r.tagColor}44">${r.tag}</span>
              <span class="ntc-eta">⏱️ ${r.eta}</span>
            </div>
          </div>
          <div class="ntc-progress-ring-wrap">
            <svg class="ntc-progress-ring" width="52" height="52" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="22" fill="none" stroke="var(--bg3)" stroke-width="4"/>
              <circle class="ntc-ring-fill" cx="26" cy="26" r="22" fill="none"
                stroke="${r.tagColor}" stroke-width="4" stroke-linecap="round"
                stroke-dasharray="${2 * Math.PI * 22}"
                stroke-dashoffset="${2 * Math.PI * 22 * (1 - r.progress / 100)}"
                transform="rotate(-90 26 26)"/>
            </svg>
            <span class="ntc-progress-pct" style="color:${r.tagColor}">${r.progress}%</span>
          </div>
        </div>
        <div class="ntc-progress-bar">
          <div class="ntc-progress-fill" style="width:0%;background:${r.tagColor}" data-target="${r.progress}"></div>
        </div>
        <ul class="ntc-features">${featuresHtml}</ul>
      </div>
    </div>
  `;
}

function renderMilestoneCard(m) {
  const pct = Math.min(100, Math.round((m.current / m.target) * 100));
  return `
    <div class="news-milestone-card">
      <div class="nm-header">
        <span class="nm-label">${m.label}</span>
        <span class="nm-pct">${pct}%</span>
      </div>
      <div class="nm-bar">
        <div class="nm-fill" style="width:0%" data-target="${pct}"></div>
      </div>
      <div class="nm-footer">
        <span>${m.current.toLocaleString()} / ${m.target.toLocaleString()}</span>
      </div>
    </div>
  `;
}

function renderCountdownCard(label, value) {
  return `
    <div class="news-countdown-card">
      <div class="ncc-value">${value}</div>
      <div class="ncc-label">${label}</div>
    </div>
  `;
}

function getNextETA() {
  const next = NEWS_DATA.releases[0];
  return next ? next.eta : '—';
}

function getOverallProgress() {
  const total = NEWS_DATA.releases.reduce((s, r) => s + r.progress, 0);
  return Math.round(total / NEWS_DATA.releases.length);
}

function animateProgressBars() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.ntc-progress-fill, .nm-fill').forEach(el => {
      const target = parseFloat(el.dataset.target);
      if (!isNaN(target)) {
        setTimeout(() => { el.style.width = target + '%'; }, 100);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('news-content')) renderNews();
});
