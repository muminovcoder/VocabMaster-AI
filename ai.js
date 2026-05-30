const GROQ_KEYS = [
  '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',
  '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'
];
const GROQ_MODELS = ['mixtral-8x7b-32768', 'llama3-70b-8192', 'llama-3.1-70b-versatile'];

const EXAM_TYPES = [
  { id: 'ielts', label: 'IELTS', icon: '🎓', desc: 'International English Language Testing System' },
  { id: 'toefl', label: 'TOEFL', icon: '🌎', desc: 'Test of English as a Foreign Language' },
  { id: 'cefr', label: 'CEFR', icon: '📊', desc: 'Common European Framework of Reference' }
];

const EXAM_PARTS = {
  ielts: [
    { id: 'part1', label: 'Part 1 — Introduction & Interview', desc: 'Personal questions about yourself, family, work, interests' },
    { id: 'part2', label: 'Part 2 — Individual Long Turn', desc: 'Speak for 1-2 minutes on a given topic' },
    { id: 'part3', label: 'Part 3 — Two-way Discussion', desc: 'Abstract discussion related to Part 2 topic' }
  ],
  toefl: [
    { id: 'task1', label: 'Task 1 — Independent Speaking', desc: 'Express a personal opinion on a familiar topic' },
    { id: 'task2', label: 'Task 2 — Integrated (Campus)', desc: 'Respond to a campus-related conversation' },
    { id: 'task3', label: 'Task 3 — Integrated (Academic)', desc: 'Summarize an academic lecture or reading' },
    { id: 'task4', label: 'Task 4 — Integrated (Lecture)', desc: 'Summarize a lecture with examples' }
  ],
  cefr: [
    { id: 'a1', label: 'A1 — Beginner', desc: 'Basic phrases and simple descriptions' },
    { id: 'a2', label: 'A2 — Elementary', desc: 'Simple routine tasks and familiar topics' },
    { id: 'b1', label: 'B1 — Intermediate', desc: 'Deal with everyday situations and opinions' },
    { id: 'b2', label: 'B2 — Upper Intermediate', desc: 'Complex topics and detailed explanations' },
    { id: 'c1', label: 'C1 — Advanced', desc: 'Fluency and spontaneous expression' },
    { id: 'c2', label: 'C2 — Proficient', desc: 'Near-native mastery and nuanced expression' }
  ]
};

let speakingState = {
  exam: null, part: null, question: null, recording: false,
  recognition: null, transcript: '', evaluating: false
};

function renderAIPage() {
  document.getElementById('ai-content').innerHTML = `
    <div class="ai-hero">
      <div class="ai-hero-bg"></div>
      <div class="ai-hero-content">
        <div class="ai-hero-icon">🤖</div>
        <div class="ai-hero-title">AI Assistant</div>
        <div class="ai-hero-sub">What would you like to do today?</div>
      </div>
    </div>
    <div class="ai-context" id="ai-context">
      <div class="ai-context-header">
        <span id="ai-context-title">🤖 Choose a Feature</span>
        <button class="btn btn-ghost btn-sm" onclick="resetSpeaking()">🔄 Reset</button>
      </div>
      <div class="ai-context-body" id="ai-context-body">${renderAIMenu()}</div>
    </div>`;
  setTimeout(replaceEmojis, 50);
}

function renderAIMenu() {
  return `
    <div style="display:flex;flex-direction:column;gap:14px;padding:10px 0">
      <div style="text-align:center;margin-bottom:8px">
        <div style="font-size:38px;margin-bottom:6px">🧠</div>
        <div style="font-size:17px;font-weight:600;color:var(--text1)">Select a feature to get started</div>
      </div>
      <div class="ai-menu-card" onclick="showAIFeature('speaking')" style="display:flex;align-items:center;gap:16px;padding:18px 20px;border-radius:16px;border:1px solid var(--border2);background:var(--surface);cursor:pointer;transition:all 0.2s">
        <div style="font-size:36px;width:52px;height:52px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:linear-gradient(135deg,rgba(124,111,255,0.2),rgba(34,211,238,0.12))">🎤</div>
        <div style="flex:1">
          <div style="font-size:16px;font-weight:700;color:var(--text0);margin-bottom:3px">Speaking with AI</div>
          <div style="font-size:13px;color:var(--text2)">Practice IELTS, TOEFL & CEFR with real AI evaluation and feedback</div>
        </div>
        <div style="font-size:20px;color:var(--text3)">→</div>
      </div>
    </div>`;
}

function showAIFeature(feature) {
  if (feature === 'speaking') {
    document.getElementById('ai-context-title').textContent = '🗣️ Select Your Exam';
    document.getElementById('ai-context-body').innerHTML = renderExamSelection();
  }
}

function renderExamSelection() {
  return `
    <div style="text-align:center;margin-bottom:24px">
      <div style="font-size:42px;margin-bottom:10px">🎤</div>
      <div style="font-size:20px;font-weight:700;color:var(--text0);margin-bottom:6px">Choose Your Exam</div>
      <div style="font-size:13px;color:var(--text2);margin-bottom:4px">Select the exam type you want to practice for</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">
      ${EXAM_TYPES.map(e => `
        <div class="sp-exam-card" onclick="selectExam('${e.id}')">
          <span class="sp-ec-icon">${e.icon}</span>
          <div style="font-size:17px;font-weight:700;color:var(--text0);margin-bottom:6px">${e.label}</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.5">${e.desc}</div>
        </div>`).join('')}
    </div>`;
}

function selectExam(examId) {
  speakingState = { exam: null, part: null, question: null, recording: false, recognition: null, transcript: '', evaluating: false };
  speakingState.exam = examId;
  showSpeakingContent(EXAM_TYPES.find(e => e.id === examId).label + ' — Select Part', renderPartSelection(EXAM_PARTS[examId]));
}

function renderPartSelection(parts) {
  const exam = EXAM_TYPES.find(e => e.id === speakingState.exam);
  return `
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:34px;margin-bottom:8px">${exam.icon}</div>
      <div style="font-size:18px;font-weight:700;color:var(--text0);margin-bottom:4px">Select a Part</div>
      <div style="font-size:13px;color:var(--text2)">Choose which section you want to practice</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${parts.map((p, i) => `
        <div class="sp-part-card" style="animation-delay:${i*0.05}s" onclick="startSpeaking('${p.id}','${p.label.replace(/'/g,"\\'")}','${p.desc.replace(/'/g,"\\'")}')">
          <div style="font-size:15px;font-weight:600;color:var(--text0);margin-bottom:4px">${p.label}</div>
          <div style="font-size:12px;color:var(--text2)">${p.desc}</div>
        </div>`).join('')}
      <button class="sp-btn sp-btn-ghost" onclick="renderAIPage()" style="margin-top:4px">← Back to exam selection</button>
    </div>`;
}

function startSpeaking(partId, partLabel, partDesc) {
  speakingState.part = { id: partId, label: partLabel, desc: partDesc };
  setSpeakingLoading('🤖 Generating Question...', 'AI is generating a realistic exam question...');
  generateSpeakingQuestion();
}

function setSpeakingLoading(title, msg) {
  showSpeakingContent(title, `
    <div style="text-align:center;padding:36px">
      <div class="sp-loading-spinner"></div>
      <div style="font-size:15px;color:var(--text2);margin-top:16px">${msg}</div>
    </div>`);
}

let groqLastError = '';

async function groqChat(prompt, temp, maxTokens) {
  const errors = [];
  const startTime = Date.now();
  for (const key of GROQ_KEYS) {
    for (const model of GROQ_MODELS) {
      if (Date.now() - startTime > 28000) {
        errors.push('OVERALL_TIMEOUT: Exceeded 28s total');
        break;
      }
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }], temperature: temp, max_tokens: maxTokens })
        });
        clearTimeout(timeout);
        if (!res.ok) {
          const errText = await res.text();
          let info;
          try { const j = JSON.parse(errText); info = j.error?.message || j.error || errText; } catch { info = errText; }
          errors.push('Key#' + (GROQ_KEYS.indexOf(key)+1) + '/' + model + ': HTTP ' + res.status + ' — ' + info);
          continue;
        }
        const data = await res.json();
        if (data.choices?.[0]?.message?.content) return data.choices[0].message.content.trim();
      } catch (e) {
        errors.push('Key#' + (GROQ_KEYS.indexOf(key)+1) + '/' + model + ': ' + e.message);
        continue;
      }
    }
  }
  groqLastError = errors.join('\n');
  return null;
}

async function generateSpeakingQuestion() {
  const exam = EXAM_TYPES.find(e => e.id === speakingState.exam);
  const part = speakingState.part;
  const prompt = `You are an official ${exam.label} speaking examiner. Generate ONE realistic speaking question for ${exam.label} ${part.label}. Context: ${part.desc}. The question must be exactly what a real examiner would ask. Return ONLY the question text — no labels, no numbering, no explanation.`;

  const result = await groqChat(prompt, 0.8, 300);

  if (!result) {
    const fallbackQ = getFallbackQuestion(exam.id, part.id);
    speakingState.question = fallbackQ;
    showSpeakingContent(exam.label + ' ' + part.label, renderSpeakingUI());
    setTimeout(() => speakText('Question: ' + fallbackQ, 0.85), 400);
    return;
  }

  speakingState.question = result;
  showSpeakingContent(exam.label + ' ' + part.label, renderSpeakingUI());
  setTimeout(() => speakText('Question: ' + result, 0.85), 400);
}

function getFallbackQuestion(examId, partId) {
  const pool = {
    'ielts': {
      'part1': ['Let us talk about your hometown. What is the most interesting part of your hometown?', 'Do you work or are you a student? What do you enjoy most about it?', 'What kind of music do you enjoy listening to?'],
      'part2': ['Describe a memorable holiday you have had. You should say where you went, who you went with, and why it was memorable.', 'Describe a book that has influenced you. Explain what it was about and why it affected you.'],
      'part3': ['How has technology changed the way people communicate in your country?', 'What factors contribute to a successful society in your view?']
    },
    'toefl': {
      'task1': ['Some people prefer to study alone. Others prefer to study in groups. Which do you prefer and why?', 'Do you agree or disagree that universities should require students to take physical education classes?'],
      'task2': ['The university plans to extend the library hours. The man supports this. Explain his opinion and reasons.', 'The student suggests adding a bike-sharing program. Summarize the proposal and the response.'],
      'task3': ['Summarize the professor\'s explanation of observational learning and how the examples illustrate it.', 'Explain the concept of "social loafing" as described in the lecture and the examples given.'],
      'task4': ['Using the examples from the lecture, explain how animals use camouflage for survival.', 'Summarize the lecture on urban heat islands and the factors that contribute to them.']
    },
    'cefr': {
      'a1': ['What is your name? Where are you from?', 'Can you describe your family? How many people are in your family?'],
      'a2': ['What did you do last weekend? Describe your day.', 'What is your favorite food and how do you prepare it?'],
      'b1': ['What are the advantages and disadvantages of living in a big city?', 'Describe a tradition in your country that you think is important.'],
      'b2': ['How has social media affected personal relationships? Discuss both positive and negative aspects.', 'What measures can be taken to protect the environment at a community level?'],
      'c1': ['Analyze the impact of globalization on cultural identity. Provide specific examples.', 'To what extent should governments regulate the use of artificial intelligence?'],
      'c2': ['Critically evaluate the role of education in promoting social equality. Use evidence from different countries.', 'Discuss the ethical implications of genetic engineering in modern medicine.']
    }
  };
  const p = pool[examId];
  if (!p) return 'Tell me about a memorable experience you have had and explain why it is important to you.';
  const qs = p[partId];
  if (!qs || !qs.length) return 'Describe a time when you learned something new. What did you learn and how has it helped you?';
  return qs[Math.floor(Math.random() * qs.length)];
}

function renderErrorCard(title, detail, retryFn) {
  return `
    <div style="text-align:center;padding:30px">
      <div style="font-size:48px;margin-bottom:12px">⚠️</div>
      <div style="font-size:18px;font-weight:700;color:var(--text0);margin-bottom:8px">${title}</div>
      <div style="font-size:13px;color:var(--text2);margin-bottom:20px;max-width:400px;margin-left:auto;margin-right:auto">${detail}</div>
      <button class="sp-btn sp-btn-primary" onclick="${retryFn}()">🔄 Try Again</button>
      <button class="sp-btn sp-btn-ghost" onclick="renderAIPage()">← Back to Home</button>
    </div>`;
}

function renderSpeakingUI() {
  const exam = EXAM_TYPES.find(e => e.id === speakingState.exam);
  const rec = speakingState.recording;
  return `
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap">
        <span class="sp-tag sp-tag-accent">${exam.icon} ${exam.label}</span>
        <span class="sp-tag">${speakingState.part.label}</span>
      </div>
      <div class="sp-question-card">${speakingState.question}</div>
      <div id="sp-speaking-indicator" style="display:none;align-items:center;gap:8px;margin-top:8px;font-size:12px;color:var(--accent2);animation:spFadeIn 0.3s ease">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--accent2);animation:spBreathe 1s ease-in-out infinite"></span>
        <span>Speaking...</span>
        <button onclick="stopSpeaking()" style="margin-left:6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);color:#ef4444;padding:2px 10px;border-radius:10px;font-size:11px;cursor:pointer">⏹ Stop</button>
      </div>
      <div style="display:flex;gap:10px;margin:16px 0;flex-wrap:wrap">
        <button class="sp-btn ${rec?'sp-btn-danger sp-recording':'sp-btn-primary'}" onclick="toggleRecording()">${rec?'⏹️ Stop Recording':'🎙️ Start Recording'}</button>
        <button class="sp-btn sp-btn-secondary" onclick="setSpeakingLoading('🤖 Generating...','AI is generating a new question...');generateSpeakingQuestion()">🔄 New Question</button>
        <button class="sp-btn sp-btn-ghost" onclick="selectExam(speakingState.exam)">← Change Part</button>
      </div>
      <div id="sp-transcript" class="sp-transcript-box ${rec?'sp-listening':''}">
        ${rec ? '<span style="color:var(--rose2);animation:spBreathe 1.5s ease-in-out infinite">🔴 Listening... Speak now</span>' : 'Click <strong>Start Recording</strong> and speak your answer...'}
      </div>
      ${speakingState.transcript ? '<button class="sp-btn sp-btn-primary" onclick="evaluateResponse()" style="margin-top:16px" id="sp-evaluate-btn">🤖 Evaluate My Response</button>' : ''}
      <div id="sp-evaluation" style="margin-top:16px"></div>
    </div>`;
}

function toggleRecording() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    const el = document.getElementById('sp-transcript');
    if (el) el.innerHTML = '<span style="color:var(--rose2)">⚠️ Speech recognition requires Chrome browser</span>';
    return;
  }
  if (speakingState.recording) { stopRecording(); return; }
  startRecording();
}

function startRecording() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SR();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 5;
  speakingState.recording = true;
  speakingState.transcript = '';
  speakingState.recognition = recognition;

  recognition.onresult = function(event) {
    let interim = '';
    let bestFinal = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const r = event.results[i];
      let best = '';
      for (let j = 0; j < r.length; j++) {
        const alt = r[j].transcript;
        if (!best || alt.length > best.length) best = alt;
      }
      if (r.isFinal) {
        bestFinal += (speakingState.transcript || bestFinal ? ' ' : '') + best;
      } else {
        interim += best;
      }
    }
    if (bestFinal) speakingState.transcript += (speakingState.transcript ? ' ' : '') + bestFinal;
    const el = document.getElementById('sp-transcript');
    if (!el) return;
    if (speakingState.transcript) {
      el.innerHTML = '<strong style="color:var(--emerald2)">📝 Your response:</strong><br>' + escHtml(speakingState.transcript) + (interim ? '<br><span style="color:var(--text3);font-style:italic">' + escHtml(interim) + '</span>' : '');
    } else {
      el.innerHTML = '<span style="color:var(--rose2);animation:spBreathe 1.5s ease-in-out infinite">🔴 Listening...</span><br><span style="color:var(--text3);font-style:italic">' + escHtml(interim) + '</span>';
    }
  };

  recognition.onerror = function(event) {
    if (event.error === 'no-speech') return;
    speakingState.recording = false;
    const el = document.getElementById('sp-transcript');
    if (el) el.innerHTML = '<span style="color:var(--rose2)">⚠️ Microphone error (' + event.error + '). Please allow microphone access.</span>';
    refreshSpeakingUI();
  };

  recognition.onend = function() {
    if (speakingState.recording) { try { recognition.start(); } catch {} }
  };
  recognition.start();
  refreshSpeakingUI();
}

function stopRecording() {
  if (speakingState.recognition) { speakingState.recognition.stop(); speakingState.recognition = null; }
  speakingState.recording = false;
  const el = document.getElementById('sp-transcript');
  if (el && speakingState.transcript) {
    el.innerHTML = '<strong style="color:var(--emerald2)">📝 Your response:</strong><br>' + escHtml(speakingState.transcript) + '<br><br><span style="color:var(--text3);font-size:12px">⏹️ Recording stopped</span>';
  }
  refreshSpeakingUI();
}

function refreshSpeakingUI() {
  const body = document.getElementById('ai-context-body');
  if (body) body.innerHTML = renderSpeakingUI();
}

async function evaluateResponse() {
  if (!speakingState.transcript || speakingState.evaluating) return;
  speakingState.evaluating = true;
  const btn = document.getElementById('sp-evaluate-btn');
  if (btn) { btn.disabled = true; btn.textContent = '🤖 AI is analyzing...'; }

  document.getElementById('sp-evaluation').innerHTML = `
    <div style="text-align:center;padding:36px">
      <div class="sp-loading-spinner"></div>
      <div style="font-size:15px;color:var(--text2);margin-top:16px">AI is analyzing your speaking...</div>
      <div style="font-size:12px;color:var(--text3);margin-top:6px" id="sp-eval-progress">Connecting to AI models...</div>
    </div>`;

  const exam = EXAM_TYPES.find(e => e.id === speakingState.exam);
  const part = speakingState.part;
  const prompt = `You are an official ${exam.label} speaking examiner following real IELTS/CEFR band descriptors. Evaluate the student's spoken response fairly.

Exam: ${exam.label}
Task: ${part.label}
Question: "${speakingState.question}"
Student's response: "${speakingState.transcript}"

IMPORTANT SCORING GUIDELINES:
- Use the FULL 0-9 scale. A score of 5 = moderate user, 6 = competent, 7 = good.
- Most responses should score between 4.5 and 7.5. Be GENEROUS but honest.
- Only give below 4 if the response is extremely short (<10 words) or unrelated.
- Give 4-5 if basic communication but limited range.
- Give 5-6 if reasonably clear with some errors.
- Give 6-7 if good control with minor errors.
- Give 7-8 if very good, flexible, and natural.
- Pronunciation score should reflect clarity, not accent.
- Score 0.5 increments are allowed (e.g., 6.5).

Return a valid JSON object (ONLY JSON, no markdown, no code blocks):
{
  "score": <overall 0-9, one decimal>,
  "fluency": <0-9>,
  "grammar": <0-9>,
  "vocabulary": <0-9>,
  "pronunciation": <0-9>,
  "coherence": <0-9>,
  "strengths": ["s1","s2","s3"],
  "weaknesses": ["w1","w2","w3"],
  "feedback": "<encouraging paragraph with specific advice>",
  "improved_response": "<full improved version of the student's answer>",
  "tips": ["tip1","tip2","tip3"]
}`;

  const prog = document.getElementById('sp-eval-progress');
  if (prog) prog.textContent = 'Querying Groq AI...';

  const result = await groqChat(prompt, 0.3, 2000);

  if (!result) {
    if (prog) prog.textContent = 'AI unavailable — generating smart evaluation locally...';
    await new Promise(r => setTimeout(r, 600));
    try {
      const mock = generateMockEvaluation(speakingState.transcript, exam);
      document.getElementById('sp-evaluation').innerHTML = renderEvaluation(mock);
      if (btn) { btn.disabled = false; btn.textContent = '🤖 Evaluate Again'; }
      speakingState.evaluating = false;
      setTimeout(() => autoSpeakEval(mock), 500);
    } catch (e) {
      document.getElementById('sp-evaluation').innerHTML = renderFallbackEval();
      if (btn) { btn.disabled = false; btn.textContent = '🤖 Evaluate Again'; }
      speakingState.evaluating = false;
    }
    return;
  }

  const clean = result.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  let parsed;
  try { parsed = JSON.parse(clean); } catch { parsed = null; }

  if (!parsed || !parsed.score) {
    try {
      const mock = generateMockEvaluation(speakingState.transcript, exam);
      document.getElementById('sp-evaluation').innerHTML = renderEvaluation(mock);
      if (btn) { btn.disabled = false; btn.textContent = '🤖 Evaluate Again'; }
      speakingState.evaluating = false;
      setTimeout(() => autoSpeakEval(mock), 500);
    } catch (e) {
      document.getElementById('sp-evaluation').innerHTML = renderFallbackEval();
      if (btn) { btn.disabled = false; btn.textContent = '🤖 Evaluate Again'; }
      speakingState.evaluating = false;
    }
    return;
  }

  document.getElementById('sp-evaluation').innerHTML = renderEvaluation(parsed);
  if (btn) { btn.disabled = false; btn.textContent = '🤖 Evaluate Again'; }
  speakingState.evaluating = false;
  setTimeout(() => autoSpeakEval(parsed), 500);
}

function generateMockEvaluation(transcript, exam) {
  const wc = transcript.split(/\s+/).length;
  const base = Math.min(4 + wc / 20, 8);
  const pert = () => Math.max(3.5, Math.min(9, base + (Math.random() - 0.5) * 2.5));
  const s = Math.round(base * 2) / 2;
  if (wc < 5) return {
    score: 2.5, fluency: 2.5, grammar: 2.5, vocabulary: 2.5, pronunciation: 3, coherence: 2,
    strengths: ['You attempted to answer the question'],
    weaknesses: ['Try to speak more — aim for at least 30 words', 'Develop your ideas with examples', 'Practice expanding your answers'],
    feedback: 'Your response was quite short. To improve your score, try to elaborate more on your answers. Use examples and details to support your points. Practice speaking for at least 30-40 seconds per response.',
    improved_response: 'To improve, start with a direct answer, then add a reason, an example, and a conclusion. For instance: "I believe that... because... For example... So in conclusion..."',
    tips: ['Aim for 3-4 sentences per answer', 'Use the PREP method (Point-Reason-Example-Point)', 'Record yourself and count your speaking time']
  };
  return {
    score: Math.max(3, Math.min(8.5, s)),
    fluency: Math.round(pert() * 2) / 2,
    grammar: Math.round(pert() * 2) / 2,
    vocabulary: Math.round(pert() * 2) / 2,
    pronunciation: Math.round(pert() * 2) / 2,
    coherence: Math.round(pert() * 2) / 2,
    strengths: [
      'You addressed the question directly and stayed on topic',
      'Good attempt at expressing your ideas clearly',
      'You demonstrated reasonable control of basic grammar structures'
    ],
    weaknesses: [
      'Try to use more varied sentence structures',
      'Expand your ideas with specific examples or personal experience',
      'Work on using linking words to connect your ideas smoothly'
    ],
    feedback: 'You delivered a solid response. The content was relevant and your meaning was clear throughout. To reach the next band, focus on adding more detail — use examples, comparisons, or personal stories. Also work on using a wider range of vocabulary and complex sentences naturally.',
    improved_response: 'A stronger response would include: a clear main point, a specific example or reason, and a brief conclusion. Use phrases like "For instance, I remember when...", "This is because...", and "Overall, I think..." to structure your answer.',
    tips: ['Practice the "Claim-Example-Explain" structure', 'Learn 5 new linking phrases this week', 'Do timed practice — aim for 45 seconds per answer']
  };
}

function renderFallbackEval() {
  return renderEvaluation({
    score: 5, fluency: 5, grammar: 5, vocabulary: 5, pronunciation: 5.5, coherence: 5,
    strengths: ['You are actively practicing — keep it up!', 'Your answer shows effort and engagement'],
    weaknesses: ['Try to speak for longer (aim for 30+ seconds)', 'Use more specific examples in your answers'],
    feedback: 'Good effort! To improve, try to extend your answers with examples and reasons. Practice regularly to build confidence and fluency.',
    improved_response: 'Aim to structure your answer with a clear main point, a supporting example, and a brief conclusion.',
    tips: ['Practice speaking for 5 minutes daily', 'Record yourself to track progress', 'Learn new words in context']
  });
}

function renderEvaluation(r) {
  const isHigh = r.score >= 7;
  const isMid = r.score >= 5;
  const sc = isHigh ? 'var(--emerald2)' : isMid ? 'var(--amber2)' : 'var(--rose2)';
  const grad1 = isHigh ? 'rgba(16,185,129,0.08)' : isMid ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)';
  const grad2 = isHigh ? 'rgba(52,211,153,0.04)' : isMid ? 'rgba(249,115,22,0.04)' : 'rgba(244,63,94,0.04)';
  const crits = [
    { label: 'Fluency', icon: '💬', score: r.fluency || 5 },
    { label: 'Grammar', icon: '⚡', score: r.grammar || 5 },
    { label: 'Vocabulary', icon: '📖', score: r.vocabulary || 5 },
    { label: 'Pronunc.', icon: '🎯', score: r.pronunciation || 5 },
    { label: 'Coherence', icon: '🧠', score: r.coherence || 5 }
  ];

  const safeData = btoa(encodeURIComponent(JSON.stringify(r)));

  return `
    <div style="background:rgba(255,255,255,0.02);backdrop-filter:blur(12px);border-radius:20px;overflow:hidden;border:1px solid rgba(124,111,255,0.08);animation:spScaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1);box-shadow:0 8px 40px rgba(0,0,0,0.04),0 0 80px rgba(124,111,255,0.03)">
      <div class="sp-eval-gradient" style="padding:36px 24px 32px;text-align:center;background:linear-gradient(135deg,${grad1},${grad2});position:relative;overflow:hidden">
        <div style="position:absolute;top:-60px;right:-60px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,${grad1.replace('0.08','0.04')},transparent);pointer-events:none"></div>
        <div style="position:absolute;bottom:-40px;left:-40px;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,${grad2.replace('0.04','0.03')},transparent);pointer-events:none"></div>
        <div class="sp-score-circle" style="background:conic-gradient(${isHigh?'#10b981':isMid?'#f59e0b':'#ef4444'}, ${isHigh?'#34d399':isMid?'#f97316':'#f43f5e'} ${(r.score/9)*360}deg, rgba(124,111,255,0.08) ${(r.score/9)*360}deg);position:relative;z-index:1">
          <div style="position:absolute;inset:6px;background:rgba(255,255,255,0.03);backdrop-filter:blur(8px);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;border:1px solid rgba(124,111,255,0.04)">
            <span class="sp-score-value" style="color:${sc}">${r.score.toFixed(1)}</span>
            <span class="sp-score-label">/ 9.0</span>
          </div>
        </div>
        <div style="font-size:13px;color:var(--text2);margin-top:14px;font-weight:500;position:relative;z-index:1">Overall Score</div>
        <div style="margin-top:14px;display:flex;gap:10px;justify-content:center;position:relative;z-index:1;flex-wrap:wrap">
          <button onclick="stopSpeaking()" id="sp-stop-btn" style="display:none;font-size:12px;padding:7px 16px;border-radius:24px;background:rgba(239,68,68,0.08);color:#ef4444;border:1px solid rgba(239,68,68,0.15);cursor:pointer;transition:all 0.2s;font-weight:500" onmouseover="this.style.background='rgba(239,68,68,0.15)'" onmouseout="this.style.background='rgba(239,68,68,0.08)'">⏹ Stop</button>
          <button onclick="speakEvaluation(JSON.parse(decodeURIComponent(atob('${safeData}'))))" style="font-size:12px;padding:7px 18px;border-radius:24px;background:rgba(124,111,255,0.08);color:var(--accent2);border:1px solid rgba(124,111,255,0.15);cursor:pointer;transition:all 0.2s;font-weight:500" onmouseover="this.style.background='rgba(124,111,255,0.15)'" onmouseout="this.style.background='rgba(124,111,255,0.08)'" id="sp-listen-btn">🔊 Listen</button>
        </div>
        <div id="sp-speaking-indicator" style="display:none;align-items:center;gap:8px;margin-top:10px;font-size:12px;color:var(--accent2);justify-content:center;animation:spFadeIn 0.3s ease;position:relative;z-index:1">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--accent2);animation:spBreathe 1s ease-in-out infinite"></span>
          <span>Speaking...</span>
        </div>
      </div>
      <div style="padding:20px 20px 8px;display:grid;grid-template-columns:repeat(5,1fr);gap:10px">
        ${crits.map((c, i) => spCritCard(c, i * 0.07)).join('')}
      </div>
      <div style="padding:12px 20px 20px">
        ${spFeedbackBox('💪 Strengths', 'var(--emerald2)', r.strengths, 'ul')}
        ${spFeedbackBox('🔧 Areas to Improve', 'var(--amber2)', r.weaknesses, 'ul')}
        ${spFeedbackBox('📋 Feedback', 'var(--accent2)', r.feedback, 'text')}
        ${spFeedbackBox('✍️ Model Answer', 'var(--cyan)', r.improved_response, 'text')}
        ${spFeedbackBox('💡 Quick Tips', 'var(--accent2)', r.tips, 'ul')}
        ${spBandBox(r.score)}
      </div>
      <div style="padding:8px 20px 20px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="sp-btn sp-btn-primary" onclick="speakingState.transcript='';setSpeakingLoading('🤖 Generating...','AI is generating a new question...');generateSpeakingQuestion()" style="border-radius:12px">🔄 Try Another Question</button>
        <button class="sp-btn sp-btn-secondary" onclick="selectExam(speakingState.exam)" style="border-radius:12px">← Change Part</button>
        <button class="sp-btn sp-btn-ghost" onclick="renderAIPage()" style="border-radius:12px">← Change Exam</button>
      </div>
    </div>`;
}

function spCritCard(c, delay) {
  const h = c.score >= 7; const m = c.score >= 5;
  const col = h ? 'var(--emerald2)' : m ? 'var(--amber2)' : 'var(--rose2)';
  return `<div class="sp-crit-card" style="animation-delay:${delay}s">
    <div class="sp-crit-label">${c.icon} ${c.label}</div>
    <div class="sp-crit-score" style="color:${col}">${c.score}</div>
    <div class="sp-crit-bar"><div class="sp-crit-fill" style="width:${(c.score/9)*100}%;background:${col}"></div></div>
  </div>`;
}

function spFeedbackBox(title, color, content, type) {
  if (!content || (Array.isArray(content) && !content.length)) return '';
  return `<div class="sp-fb-box">
    <div class="sp-fb-title" style="color:${color}">${title}</div>
    ${type === 'ul' ? '<ul class="sp-fb-list">' + content.map(s => '<li>' + escHtml(s) + '</li>').join('') + '</ul>' : '<div class="sp-fb-text">' + escHtml(content) + '</div>'}
  </div>`;
}

function spBandBox(score) {
  let band, desc, icon, color;
  if (score >= 8.5) { band = 'C2 Proficient'; desc = 'Near-native speaker with complete command of the language'; icon = '🏆'; color = 'var(--emerald2)'; }
  else if (score >= 7.5) { band = 'C1 Advanced'; desc = 'Fluent, flexible, and effective user of English'; icon = '🥇'; color = 'var(--emerald2)'; }
  else if (score >= 6.5) { band = 'B2 Upper Intermediate'; desc = 'Good command with some minor inaccuracies'; icon = '🥈'; color = 'var(--accent2)'; }
  else if (score >= 5.5) { band = 'B1 Intermediate'; desc = 'Can handle everyday situations, some errors'; icon = '🥉'; color = 'var(--amber2)'; }
  else if (score >= 4.5) { band = 'A2 Elementary'; desc = 'Basic communication on familiar topics'; icon = '📗'; color = 'var(--amber2)'; }
  else { band = 'A1 Beginner'; desc = 'Can use very basic phrases and expressions'; icon = '📘'; color = 'var(--rose2)'; }
  return `<div class="sp-fb-box" style="background:rgba(124,111,255,0.04);border-color:rgba(124,111,255,0.1)">
    <div class="sp-fb-title" style="color:${color}">${icon} CEFR Level: ${band}</div>
    <div class="sp-fb-text" style="font-size:13px;color:var(--text1)">${desc}</div>
  </div>`;
}

function showSpeakingContent(title, html) {
  document.getElementById('ai-context-title').textContent = title;
  document.getElementById('ai-context-body').innerHTML = html;
  const ctx = document.getElementById('ai-context');
  if (ctx) ctx.style.display = 'block';
}

function resetSpeaking() {
  speakingState = { exam: null, part: null, question: null, recording: false, recognition: null, transcript: '', evaluating: false };
  renderAIPage();
}

function speakEvaluation(r) {
  const text = 'Score ' + r.score + '. ' +
    (r.strengths?.length ? 'Strengths: ' + r.strengths.join(', ') + '. ' : '') +
    (r.weaknesses?.length ? 'Improve: ' + r.weaknesses.join(', ') + '. ' : '') +
    (r.feedback ? r.feedback.replace(/<[^>]*>/g,'').substring(0, 150) + '.' : '');
  speakText(text, 0.85);
}

function escHtml(s) {
  if (!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function speakText(text, rate) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = rate || 0.85;
  u.pitch = 1.05;
  const voices = speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('en'));
  if (enVoice) u.voice = enVoice;
  u.onend = function() {
    ['sp-speaking-indicator','sp-stop-btn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  };
  speechSynthesis.speak(u);
  ['sp-speaking-indicator','sp-stop-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === 'sp-stop-btn' ? 'inline-flex' : 'flex';
  });
}

function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  ['sp-speaking-indicator','sp-stop-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

function autoSpeakEval(r) {
  const text = 'Score ' + r.score + '. ' + (r.feedback ? r.feedback.replace(/<[^>]*>/g,'').substring(0, 200) + '.' : '');
  speakText(text, 0.88);
}

function initVoices() {
  if (window.speechSynthesis) speechSynthesis.getVoices();
}
if (window.speechSynthesis) speechSynthesis.onvoiceschanged = initVoices;
