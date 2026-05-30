// =============================================
// GRAMMAR SYSTEM — TENSE DATA
// =============================================
const GRAMMAR_TENSES = [
  { id:'present-simple', name:'Present Simple', group:'Present Tenses', icon:'🌅',
    formula:'Subject + base verb (add -s/-es for he/she/it)',
    beginner:'Used for facts, habits, and routines. Example: "The sun rises in the east."',
    advanced:'Used for timeless statements, scheduled events, and narrative present in storytelling.',
    ielts:'Essential for describing trends in Task 1 (e.g., "The graph shows...") and giving opinions in Task 2.',
    sat:'Tests subject-verb agreement and correct verb form in present contexts.',
    academic:'Used in research papers to state established facts: "The theory suggests..."',
    positive:['I walk to work every day.','She reads the news every morning.','They live in London.','The Earth orbits the Sun.'],
    negative:['I do not (don\'t) like coffee.','He does not (doesn\'t) speak Spanish.','We do not (don\'t) own a car.'],
    question:['Do you enjoy cooking?','Does she work here?','What time does the train arrive?'],
    mistakes:[{wrong:'He go to school every day.',correct:'He goes to school every day.'},{wrong:'She don\'t like pizza.',correct:'She doesn\'t like pizza.'}],
    timeExpressions:['always','usually','often','sometimes','rarely','never','every day','on Mondays'],
    usage:['Habits & routines','General facts & truths','Scheduled events (timetables)','Narrative present','Instructions & directions']
  },
  { id:'present-continuous', name:'Present Continuous', group:'Present Tenses', icon:'⏳',
    formula:'Subject + am/is/are + verb(-ing)',
    beginner:'Used for actions happening NOW or around now. Example: "I am reading a book."',
    advanced:'Describes temporary situations, ongoing projects, and future arrangements.',
    ielts:'Use for describing current trends: "The number of students is increasing rapidly."',
    sat:'Tests understanding of ongoing vs. habitual actions.',
    academic:'Common in introductions: "This paper is examining the effects of..."',
    positive:['I am studying for my exam.','She is working on a project.','They are building a new school.'],
    negative:['He is not (isn\'t) sleeping right now.','We are not (aren\'t) going to the party.'],
    question:['Are you listening to me?','What is she doing at the moment?'],
    mistakes:[{wrong:'I am go to school now.',correct:'I am going to school now.'},{wrong:'She is work here forever.',correct:'She works here forever. (stative)'}],
    timeExpressions:['now','right now','at the moment','today','this week','currently','these days'],
    usage:['Actions happening now','Temporary situations','Future arrangements','Changing situations','Annoying habits (with "always")']
  },
  { id:'present-perfect', name:'Present Perfect', group:'Present Tenses', icon:'🎯',
    formula:'Subject + have/has + past participle',
    beginner:'Connects the past to the present. Example: "I have visited Paris." (experience, no time specified)',
    advanced:'Used for past actions with present relevance, life experiences, unfinished time periods.',
    ielts:'Vital for discussing changes: "There has been a significant increase..."',
    sat:'Frequently tested with "since" and "for" time expressions.',
    academic:'Essential in literature reviews: "Researchers have studied this phenomenon for decades."',
    positive:['I have finished my homework.','She has travelled to 20 countries.','They have lived here for five years.'],
    negative:['He has not (hasn\'t) seen that movie.','We have not (haven\'t) received the email yet.'],
    question:['Have you ever been to Japan?','Has she called you yet?'],
    mistakes:[{wrong:'I have went to the store.',correct:'I have gone to the store.'},{wrong:'She has saw that film.',correct:'She has seen that film.'}],
    timeExpressions:['ever','never','already','yet','just','since','for','so far','recently','up to now'],
    usage:['Life experiences','Unfinished past actions','Past with present relevance','Change over time','Achievements']
  },
  { id:'present-perfect-continuous', name:'Present Perfect Continuous', group:'Present Tenses', icon:'⏰',
    formula:'Subject + have/has + been + verb(-ing)',
    beginner:'Shows an action that started in the past and continues to now. Example: "I have been studying for three hours."',
    advanced:'Emphasizes the duration of an ongoing action that may or may not be complete.',
    ielts:'Use to emphasise duration: "People have been waiting for better infrastructure."',
    sat:'Tests understanding of duration-focused present perfect vs. result-focused.',
    academic:'Used to describe ongoing research: "Scientists have been investigating this for years."',
    positive:['I have been working all day.','She has been learning Japanese for two years.','They have been waiting since 9 AM.'],
    negative:['He has not (hasn\'t) been feeling well lately.','We have not (haven\'t) been sleeping enough.'],
    question:['Have you been waiting long?','How long has she been studying here?'],
    mistakes:[{wrong:'I have been work here for 3 years.',correct:'I have been working here for 3 years.'},{wrong:'She has been knowing him for years.',correct:'She has known him for years. (stative verb)'}],
    timeExpressions:['for','since','all day','recently','lately','how long','this week','the whole morning'],
    usage:['Actions continuing to present','Emphasising duration','Recent actions with visible results','Temporary situations leading to present']
  },
  { id:'past-simple', name:'Past Simple', group:'Past Tenses', icon:'📜',
    formula:'Subject + past tense verb (regular: -ed / irregular)',
    beginner:'Used for completed actions in the past. Example: "I visited London last year."',
    advanced:'For finished past actions with no connection to present. Sequence of past events.',
    ielts:'Essential for describing past data in Task 1 and past experiences in Speaking Part 2.',
    sat:'Frequently tested with time markers like "yesterday", "ago", "last week".',
    academic:'Standard for describing methodology: "The participants completed the survey."',
    positive:['I walked to school yesterday.','She bought a new car last week.','They visited the museum.'],
    negative:['I did not (didn\'t) see him at the party.','She did not (didn\'t) finish her homework.'],
    question:['Did you enjoy the movie?','Where did they go on vacation?'],
    mistakes:[{wrong:'I go to the park yesterday.',correct:'I went to the park yesterday.'},{wrong:'She didn\'t went to school.',correct:'She didn\'t go to school.'}],
    timeExpressions:['yesterday','last night','last week','ago','in 2020','when','then','after that'],
    usage:['Completed past actions','Past habits','Sequence of past events','Past states']
  },
  { id:'past-continuous', name:'Past Continuous', group:'Past Tenses', icon:'🎬',
    formula:'Subject + was/were + verb(-ing)',
    beginner:'Shows an action in progress at a specific time in the past. Example: "I was watching TV at 8 PM."',
    advanced:'Used for interrupted past actions and background scenes in storytelling.',
    ielts:'Great for setting scenes in Speaking Part 2: "I was walking down the street when..."',
    sat:'Tests understanding of ongoing past actions vs. completed ones.',
    academic:'Used in narratives and case studies: "The patient was experiencing symptoms."',
    positive:['I was reading when you called.','They were playing football at 5 PM.'],
    negative:['She was not (wasn\'t) sleeping when I arrived.','We were not (weren\'t) listening to the teacher.'],
    question:['What were you doing at midnight?','Was she working when you visited?'],
    mistakes:[{wrong:'I was work when she called.',correct:'I was working when she called.'},{wrong:'They were play football yesterday at 3.',correct:'They were playing football yesterday at 3.'}],
    timeExpressions:['at 5 PM','when','while','as','all evening','at that time','during'],
    usage:['Interrupted past actions','Background in stories','Parallel past actions','Polite requests']
  },
  { id:'past-perfect', name:'Past Perfect', group:'Past Tenses', icon:'🔙',
    formula:'Subject + had + past participle',
    beginner:'Shows which of two past actions happened first. Example: "When I arrived, she had already left."',
    advanced:'Clarifies the sequence of past events, often used in reported speech and narratives.',
    ielts:'Use to show chronological clarity in Task 1: "By 2010, the number had doubled."',
    sat:'Common in "had done...when/before..." constructions.',
    academic:'Vital for literature reviews: "Earlier studies had found contradictory results."',
    positive:['I had finished eating before she arrived.','They had already left when we got there.'],
    negative:['She had not (hadn\'t) completed the work by the deadline.'],
    question:['Had you ever visited London before that trip?','What had she done before the meeting?'],
    mistakes:[{wrong:'When she arrived, I already left.',correct:'When she arrived, I had already left.'},{wrong:'I had went before you called.',correct:'I had gone before you called.'}],
    timeExpressions:['already','by the time','before','after','until then','never...before','when'],
    usage:['Earlier past action','Sequence clarification','Reported speech','Third conditional']
  },
  { id:'past-perfect-continuous', name:'Past Perfect Continuous', group:'Past Tenses', icon:'⏮️',
    formula:'Subject + had + been + verb(-ing)',
    beginner:'Shows a long action that happened before another past action. Example: "I had been waiting for hours when she finally arrived."',
    advanced:'Emphasizes the duration of an action that occurred before another past event.',
    ielts:'Used to emphasise prolonged past situations: "The company had been struggling for years before the takeover."',
    sat:'Tests cause-effect relationships in past time frames.',
    academic:'Used to describe processes: "The system had been operating for decades before the upgrade."',
    positive:['I had been working for three hours when she called.','They had been travelling all day before they arrived.'],
    negative:['She had not (hadn\'t) been feeling well before the exam.'],
    question:['How long had you been studying before the test?','Had she been waiting long?'],
    mistakes:[{wrong:'I had been work for 2 hours when she arrived.',correct:'I had been working for 2 hours when she arrived.'},{wrong:'He had been knowing her for years before they married.',correct:'He had known her for years before they married.'}],
    timeExpressions:['for','since','before','until','how long','all day','by the time'],
    usage:['Duration before past event','Cause of past situation','Background past actions']
  },
  { id:'future-simple', name:'Future Simple (Will)', group:'Future Tenses', icon:'🔮',
    formula:'Subject + will + base verb',
    beginner:'Used for predictions, promises, and spontaneous decisions. Example: "I will help you."',
    advanced:'Expresses future facts, promises, offers, and predictions based on opinion.',
    ielts:'Essential for predictions in Task 1 and expressing future plans in Speaking.',
    sat:'Tests "will" vs. "going to" distinctions.',
    academic:'Used for implications and future research: "This finding will inform future studies."',
    positive:['I will call you tomorrow.','She will arrive at 6 PM.','They will win the competition.'],
    negative:['I will not (won\'t) forget your kindness.','He will not (won\'t) attend the meeting.'],
    question:['Will you come to the party?','What time will she arrive?'],
    mistakes:[{wrong:'I will to call you later.',correct:'I will call you later.'},{wrong:'She will not goes to school tomorrow.',correct:'She will not go to school tomorrow.'}],
    timeExpressions:['tomorrow','next week','soon','later','in the future','tonight','next year'],
    usage:['Predictions','Spontaneous decisions','Promises & offers','Future facts','Willingness']
  },
  { id:'future-continuous', name:'Future Continuous', group:'Future Tenses', icon:'⏭️',
    formula:'Subject + will + be + verb(-ing)',
    beginner:'Shows an action that will be in progress at a future time. Example: "I will be sleeping at midnight."',
    advanced:'For future arrangements and actions that will be ongoing at a specific future moment.',
    ielts:'Use to describe future trends: "More people will be working remotely."',
    sat:'Tests ability to express ongoing future actions.',
    academic:'Used for predictions about ongoing processes: "Future studies will be examining..."',
    positive:['I will be waiting for you at the station.','She will be working on the project all week.'],
    negative:['I will not (won\'t) be attending the meeting.','They won\'t be travelling next week.'],
    question:['Will you be using the car tonight?','What will she be doing at 8 PM?'],
    mistakes:[{wrong:'I will be wait for you.',correct:'I will be waiting for you.'},{wrong:'She will be works tomorrow.',correct:'She will be working tomorrow.'}],
    timeExpressions:['at 8 PM','this time tomorrow','next week','soon','in the future'],
    usage:['Actions in progress at future time','Future arrangements','Polite inquiries','Predicting the present']
  },
  { id:'future-perfect', name:'Future Perfect', group:'Future Tenses', icon:'🎯',
    formula:'Subject + will + have + past participle',
    beginner:'Shows an action that will be completed before a future time. Example: "I will have finished by 6 PM."',
    advanced:'Emphasizes completion of an action before a specific future deadline.',
    ielts:'High band structure: "By 2030, the population will have reached 9 billion."',
    sat:'Tests complex future time relationships.',
    academic:'Used for projections: "The project will have been completed by Q3."',
    positive:['I will have finished the report by Friday.','She will have graduated by next year.'],
    negative:['I will not (won\'t) have completed the work by then.'],
    question:['Will you have finished by the deadline?','How many chapters will she have written by then?'],
    mistakes:[{wrong:'I will have finish by tomorrow.',correct:'I will have finished by tomorrow.'},{wrong:'She will have went by then.',correct:'She will have gone by then.'}],
    timeExpressions:['by','by the time','before','by then','by next week','by 2030','in two years'],
    usage:['Completion before future time','Projections & deadlines','Future achievements']
  },
  { id:'future-perfect-continuous', name:'Future Perfect Continuous', group:'Future Tenses', icon:'⏳',
    formula:'Subject + will + have + been + verb(-ing)',
    beginner:'Shows how long an action will have been happening by a future time. Example: "By June, I will have been working here for 5 years."',
    advanced:'Emphasises the duration of a future action up to a specific point.',
    ielts:'Band 8+ structure: "By 2030, people will have been using renewable energy for decades."',
    sat:'Rare but tests complex tense understanding.',
    academic:'Used for long-term projections: "Researchers will have been studying this for a decade by 2026."',
    positive:['By next month, I will have been living here for a year.','She will have been teaching for 20 years by 2025.'],
    negative:['By then, I will not (won\'t) have been working long enough to qualify.'],
    question:['How long will you have been studying by the time you graduate?'],
    mistakes:[{wrong:'By next year I will have been work here for 5 years.',correct:'By next year I will have been working here for 5 years.'}],
    timeExpressions:['by','for','since','how long','by the time','next year','in 2026'],
    usage:['Duration before future time','Cause of future situation','Long-term projections']
  }
];

const GRAMMAR_CATEGORIES = [
  { id:'articles', icon:'📌', name:'Articles', desc:'a, an, the — mastery', count:12 },
  { id:'prepositions', icon:'📍', name:'Prepositions', desc:'in, on, at, by, for', count:20 },
  { id:'modals', icon:'🎭', name:'Modal Verbs', desc:'can, could, must, should', count:15 },
  { id:'passive', icon:'🔄', name:'Passive Voice', desc:'be + past participle', count:14 },
  { id:'active', icon:'⚡', name:'Active Voice', desc:'Subject performs action', count:10 },
  { id:'conditionals', icon:'🔀', name:'Conditionals', desc:'if, unless, provided', count:16 },
  { id:'reported', icon:'💬', name:'Reported Speech', desc:'he said that...', count:12 },
  { id:'relative', icon:'🔗', name:'Relative Clauses', desc:'who, which, that, whom', count:14 },
  { id:'gerunds', icon:'🏃', name:'Gerunds & Infinitives', desc:'-ing vs to + verb', count:16 },
  { id:'phrasal', icon:'🔧', name:'Phrasal Verbs', desc:'give up, look after', count:20 },
  { id:'idioms', icon:'🎨', name:'Idioms', desc:'piece of cake, etc.', count:18 },
  { id:'conjunctions', icon:'🔀', name:'Conjunctions', desc:'and, but, or, so, yet', count:12 },
  { id:'pronouns', icon:'👤', name:'Pronouns', desc:'I, you, he, she, it, we, they', count:12 },
  { id:'adjectives', icon:'🌈', name:'Adjectives', desc:'describing words', count:14 },
  { id:'adverbs', icon:'💨', name:'Adverbs', desc:'quickly, very, always', count:12 },
  { id:'quantifiers', icon:'📊', name:'Quantifiers', desc:'some, any, much, many', count:10 },
  { id:'questions', icon:'❓', name:'Question Tags', desc:'isn\'t it?, aren\'t you?', count:8 },
  { id:'agreement', icon:'🤝', name:'Subject-Verb Agreement', desc:'singular/plural match', count:14 },
  { id:'complex', icon:'🏗️', name:'Complex Sentences', desc:'subordinate clauses', count:16 },
  { id:'compound', icon:'🔗', name:'Compound Sentences', desc:'coordinating conjunctions', count:10 },
  { id:'academic', icon:'🎓', name:'Academic Grammar', desc:'formal writing structures', count:18 },
  { id:'business', icon:'💼', name:'Business Grammar', desc:'professional English', count:14 },
  { id:'ielts', icon:'🏛️', name:'IELTS Grammar', desc:'exam-focused structures', count:20 },
  { id:'sat', icon:'📝', name:'SAT Grammar', desc:'standardized test grammar', count:18 }
];

const GRAMMAR_RANK_THRESHOLDS = [
  { level:1, name:'Beginner', icon:'🥉', xp:0 },
  { level:2, name:'Intermediate', icon:'🥈', xp:300 },
  { level:3, name:'Advanced', icon:'🥇', xp:800 },
  { level:4, name:'Expert', icon:'💎', xp:1600 },
  { level:5, name:'Grammar Master', icon:'👑', xp:3000 },
  { level:6, name:'IELTS Champion', icon:'🔥', xp:5000 }
];

const GRAMMAR_RARITY = { common:'#94a3b8', uncommon:'#10b981', rare:'#3b82f6', epic:'#8b5cf6', legendary:'#f59e0b' };
const GRAMMAR_ACHIEVEMENTS = [
  // TIER 1: BEGINNER (common)
  { id:'g-first', icon:'🌱', name:'First Lesson', desc:'Complete your first grammar lesson', category:'lesson', rarity:'common', check:g=>g.totalLessons>=1, progress:g=>Math.min(g.totalLessons/1*100,100) },
  { id:'g-5-lessons', icon:'📝', name:'Eager Learner', desc:'Complete 5 grammar lessons', category:'lesson', rarity:'common', check:g=>g.totalLessons>=5, progress:g=>Math.min(g.totalLessons/5*100,100) },
  { id:'g-first-quiz', icon:'🎯', name:'First Quiz', desc:'Complete your first grammar quiz', category:'quiz', rarity:'common', check:g=>g.totalQuizzes>=1, progress:g=>Math.min(g.totalQuizzes/1*100,100) },
  { id:'g-streak-1', icon:'🔥', name:'First Spark', desc:'Start a 1-day grammar streak', category:'streak', rarity:'common', check:g=>g.streak>=1, progress:g=>Math.min(g.streak/1*100,100) },
  { id:'g-streak-3', icon:'🔥', name:'Grammar Streak', desc:'3-day grammar streak', category:'streak', rarity:'common', check:g=>g.streak>=3, progress:g=>Math.min(g.streak/3*100,100) },
  { id:'g-present-simple', icon:'🔵', name:'Present Simple', desc:'Complete Present Simple lesson', defaultCat:'present-simple', category:'tense', rarity:'common', check:g=>g.completedLessons.includes('present-simple'), progress:g=>g.completedLessons.includes('present-simple')?100:0 },

  // TIER 2: INTERMEDIATE (uncommon)
  { id:'g-10-lessons', icon:'📚', name:'Dedicated Student', desc:'Complete 10 grammar lessons', category:'lesson', rarity:'uncommon', check:g=>g.totalLessons>=10, progress:g=>Math.min(g.totalLessons/10*100,100) },
  { id:'g-streak-7', icon:'⚡', name:'Week Warrior', desc:'7-day grammar streak', category:'streak', rarity:'uncommon', check:g=>g.streak>=7, progress:g=>Math.min(g.streak/7*100,100) },
  { id:'g-quiz-5', icon:'🧪', name:'Quiz Enthusiast', desc:'Complete 5 grammar quizzes', category:'quiz', rarity:'uncommon', check:g=>g.totalQuizzes>=5, progress:g=>Math.min(g.totalQuizzes/5*100,100) },
  { id:'g-accuracy-80', icon:'📊', name:'Solid Accuracy', desc:'Achieve 80%+ average quiz accuracy', category:'quiz', rarity:'uncommon', check:g=>g.totalQuizzes>=3&&g.totalCorrect/g.totalQuestions>=0.8, progress:g=>g.totalQuizzes>=3?Math.min((g.totalCorrect/g.totalQuestions)*100,100):Math.min(g.totalQuizzes/3*100,100) },
  { id:'g-tense', icon:'⏰', name:'Tense Master', desc:'Complete all present tenses', category:'tense', rarity:'uncommon', check:g=>['present-simple','present-continuous','present-perfect','present-perfect-continuous'].every(t=>g.completedLessons.includes(t)), progress:g=>{const arr=['present-simple','present-continuous','present-perfect','present-perfect-continuous'];const done=arr.filter(t=>g.completedLessons.includes(t)).length;return done/arr.length*100;} },
  { id:'g-articles', icon:'🔤', name:'Article Ace', desc:'Complete all article lessons', category:'category', rarity:'uncommon', check:g=>{const ids=GRAMMAR_TENSES.filter(t=>t.group==='Articles'||t.group==='Determiners').map(t=>t.id);return ids.every(id=>g.completedLessons.includes(id));}, progress:g=>{const ids=GRAMMAR_TENSES.filter(t=>t.group==='Articles'||t.group==='Determiners').map(t=>t.id);const done=ids.filter(id=>g.completedLessons.includes(id)).length;return ids.length?done/ids.length*100:100;} },
  { id:'g-xp-500', icon:'🌟', name:'500 XP', desc:'Earn 500 grammar XP', category:'xp', rarity:'uncommon', check:g=>g.xp>=500, progress:g=>Math.min(g.xp/500*100,100) },
  { id:'g-ielts', icon:'🏛️', name:'IELTS Ready', desc:'Complete 15 grammar lessons', category:'lesson', rarity:'uncommon', check:g=>g.totalLessons>=15, progress:g=>Math.min(g.totalLessons/15*100,100) },

  // TIER 3: ADVANCED (rare)
  { id:'g-25', icon:'📖', name:'Structure King', desc:'Complete 25 lessons', category:'lesson', rarity:'rare', check:g=>g.totalLessons>=25, progress:g=>Math.min(g.totalLessons/25*100,100) },
  { id:'g-quiz-10', icon:'🧪', name:'Quiz Champion', desc:'Complete 10 grammar quizzes', category:'quiz', rarity:'rare', check:g=>g.totalQuizzes>=10, progress:g=>Math.min(g.totalQuizzes/10*100,100) },
  { id:'g-accuracy-90', icon:'🎯', name:'Near Perfect', desc:'Achieve 90%+ average quiz accuracy', category:'quiz', rarity:'rare', check:g=>g.totalQuizzes>=5&&g.totalCorrect/g.totalQuestions>=0.9, progress:g=>g.totalQuizzes>=5?Math.min((g.totalCorrect/g.totalQuestions)*100,100):Math.min(g.totalQuizzes/5*100,100) },
  { id:'g-passive', icon:'🔄', name:'Passive Voice Pro', desc:'Complete all passive voice lessons', category:'category', rarity:'rare', check:g=>{const ids=GRAMMAR_TENSES.filter(t=>t.group==='Passive Voice'||t.id.includes('passive')).map(t=>t.id);return ids.length>0&&ids.every(id=>g.completedLessons.includes(id));}, progress:g=>{const ids=GRAMMAR_TENSES.filter(t=>t.group==='Passive Voice'||t.id.includes('passive')).map(t=>t.id);const done=ids.filter(id=>g.completedLessons.includes(id)).length;return ids.length?done/ids.length*100:100;} },
  { id:'g-conditionals', icon:'❓', name:'Conditional Master', desc:'Complete all conditional lessons', category:'category', rarity:'rare', check:g=>{const ids=GRAMMAR_TENSES.filter(t=>t.group==='Conditionals').map(t=>t.id);return ids.every(id=>g.completedLessons.includes(id));}, progress:g=>{const ids=GRAMMAR_TENSES.filter(t=>t.group==='Conditionals').map(t=>t.id);const done=ids.filter(id=>g.completedLessons.includes(id)).length;return ids.length?done/ids.length*100:100;} },
  { id:'g-all-tenses', icon:'📚', name:'Tense Legend', desc:'Complete all 12 tenses', category:'tense', rarity:'rare', check:g=>GRAMMAR_TENSES.every(t=>g.completedLessons.includes(t.id)), progress:g=>{const done=GRAMMAR_TENSES.filter(t=>g.completedLessons.includes(t.id)).length;return done/GRAMMAR_TENSES.length*100;} },
  { id:'g-rank-3', icon:'🥇', name:'Advanced Learner', desc:'Reach Advanced rank or higher', category:'rank', rarity:'rare', check:g=>['Advanced','Expert','Grammar Master','IELTS Champion'].includes(g.rank), progress:g=>{const ranks=['Beginner','Elementary','Intermediate','Advanced','Expert','Grammar Master','IELTS Champion'];const idx=ranks.indexOf(g.rank);return idx<0?0:Math.min((idx-2)/2*100,100);} },
  { id:'g-xp-2000', icon:'💫', name:'2,000 XP', desc:'Earn 2,000 grammar XP', category:'xp', rarity:'rare', check:g=>g.xp>=2000, progress:g=>Math.min(g.xp/2000*100,100) },
  { id:'g-streak-14', icon:'⚡', name:'Fortnight Flame', desc:'14-day grammar streak', category:'streak', rarity:'rare', check:g=>g.streak>=14, progress:g=>Math.min(g.streak/14*100,100) },
  { id:'g-prepositions', icon:'📍', name:'Preposition Pro', desc:'Complete all preposition lessons', category:'category', rarity:'rare', check:g=>{const ids=GRAMMAR_TENSES.filter(t=>t.group==='Prepositions').map(t=>t.id);return ids.length>0&&ids.every(id=>g.completedLessons.includes(id));}, progress:g=>{const ids=GRAMMAR_TENSES.filter(t=>t.group==='Prepositions').map(t=>t.id);const done=ids.filter(id=>g.completedLessons.includes(id)).length;return ids.length?done/ids.length*100:100;} },

  // TIER 4: EXPERT (epic)
  { id:'g-50', icon:'👑', name:'Grammar Genius', desc:'Complete 50 lessons', category:'lesson', rarity:'epic', check:g=>g.totalLessons>=50, progress:g=>Math.min(g.totalLessons/50*100,100) },
  { id:'g-quiz-25', icon:'🧪', name:'Quiz Legend', desc:'Complete 25 grammar quizzes', category:'quiz', rarity:'epic', check:g=>g.totalQuizzes>=25, progress:g=>Math.min(g.totalQuizzes/25*100,100) },
  { id:'g-perfect', icon:'💯', name:'Perfect Accuracy', desc:'Get a perfect 100% on a grammar quiz', category:'quiz', rarity:'epic', check:g=>g.totalQuizzes>0&&g.totalCorrect===g.totalQuestions, progress:g=>g.totalQuizzes>0?(g.totalCorrect===g.totalQuestions?100:0):0 },
  { id:'g-rank-5', icon:'👑', name:'Grammar Master', desc:'Reach Grammar Master rank', category:'rank', rarity:'epic', check:g=>['Grammar Master','IELTS Champion'].includes(g.rank), progress:g=>{const ranks=['Beginner','Elementary','Intermediate','Advanced','Expert','Grammar Master','IELTS Champion'];const idx=ranks.indexOf(g.rank);return idx<0?0:Math.min((idx-4)/2*100,100);} },
  { id:'g-xp-5000', icon:'💎', name:'5,000 XP', desc:'Earn 5,000 grammar XP', category:'xp', rarity:'epic', check:g=>g.xp>=5000, progress:g=>Math.min(g.xp/5000*100,100) },
  { id:'g-streak-30', icon:'🔥', name:'Monthly Master', desc:'30-day grammar streak', category:'streak', rarity:'epic', check:g=>g.streak>=30, progress:g=>Math.min(g.streak/30*100,100) },

  // TIER 5: LEGENDARY (legendary)
  { id:'g-100', icon:'💎', name:'Century of Knowledge', desc:'Complete 100 lessons', category:'lesson', rarity:'legendary', check:g=>g.totalLessons>=100, progress:g=>Math.min(g.totalLessons/100*100,100) },
  { id:'g-quiz-50', icon:'🏆', name:'Quiz Grandmaster', desc:'Complete 50 grammar quizzes', category:'quiz', rarity:'legendary', check:g=>g.totalQuizzes>=50, progress:g=>Math.min(g.totalQuizzes/50*100,100) },
  { id:'g-rank-7', icon:'👑', name:'IELTS Champion', desc:'Reach IELTS Champion rank', category:'rank', rarity:'legendary', check:g=>g.rank==='IELTS Champion', progress:g=>g.rank==='IELTS Champion'?100:0 },
  { id:'g-xp-10000', icon:'🌌', name:'10,000 XP', desc:'Earn 10,000 grammar XP', category:'xp', rarity:'legendary', check:g=>g.xp>=10000, progress:g=>Math.min(g.xp/10000*100,100) },
  { id:'g-all-categories', icon:'🏅', name:'Grammar Completionist', desc:'Complete lessons from every category', category:'category', rarity:'legendary', check:g=>{const cats=[...new Set(GRAMMAR_TENSES.map(t=>t.group))];return cats.every(c=>GRAMMAR_TENSES.filter(t=>t.group===c).every(t=>g.completedLessons.includes(t.id)));}, progress:g=>{const cats=[...new Set(GRAMMAR_TENSES.map(t=>t.group))];const done=cats.filter(c=>GRAMMAR_TENSES.filter(t=>t.group===c).every(t=>g.completedLessons.includes(t.id))).length;return cats.length?done/cats.length*100:100;} }
];

// =============================================
// GRAMMAR — UTILITY FUNCTIONS
// =============================================
// SECURE: Backend Integration — sync grammar to server
function saveGrammar() {
  localStorage.setItem('vm_grammar', JSON.stringify(state.grammar));
  SECURE_API.syncData(state.stats, state.favorites, state.recentWords, state.grammar);
}

function getGrammarRank(xp) {
  for(let i=GRAMMAR_RANK_THRESHOLDS.length-1;i>=0;i--) if(xp>=GRAMMAR_RANK_THRESHOLDS[i].xp) return GRAMMAR_RANK_THRESHOLDS[i];
  return GRAMMAR_RANK_THRESHOLDS[0];
}

function getNextGrammarRank(xp) {
  for(let i=0;i<GRAMMAR_RANK_THRESHOLDS.length;i++) if(xp<GRAMMAR_RANK_THRESHOLDS[i].xp) return GRAMMAR_RANK_THRESHOLDS[i];
  return null;
}

function addGrammarXP(amount, reason='') {
  state.grammar.xp += amount;
  const rank = getGrammarRank(state.grammar.xp);
  const prevRank = state.grammar.rank;
  state.grammar.rank = rank.name;
  if(rank.name!==prevRank) {
    toast(`🏆 Grammar Rank Up! You're now ${rank.icon} ${rank.name}!`, 'achievement', 5000);
    confetti();
  } else if(reason) toast(`+${amount} Grammar XP — ${reason}`, 'success', 2000);
  saveGrammar();
}

function checkGrammarStreak() {
  const today = new Date().toDateString();
  if(state.grammar.lastDate!==today) {
    const y = new Date(); y.setDate(y.getDate()-1);
    if(state.grammar.lastDate===y.toDateString()) state.grammar.streak++;
    else if(state.grammar.lastDate==='') state.grammar.streak=1;
    else state.grammar.streak=1;
    state.grammar.lastDate=today;
    saveGrammar();
  }
}

function checkGrammarAchievements() {
  GRAMMAR_ACHIEVEMENTS.forEach(a=>{
    if(!state.grammar.achievements.includes(a.id) && a.check(state.grammar)) {
      state.grammar.achievements.push(a.id);
      if(!state.grammar.achUnlocked) state.grammar.achUnlocked = {};
      state.grammar.achUnlocked[a.id] = new Date().toISOString();
      saveGrammar();
      toast(`🏆 ${a.name} [${a.rarity.toUpperCase()}] — ${a.desc}`, 'achievement', 6000);
      confetti();
    }
  });
}

// =============================================
// GRAMMAR — MAIN RENDER
// =============================================
let grammarTab = 'dashboard';

function renderGrammar() {
  const el = document.getElementById('grammar-content');
  checkGrammarStreak();
  renderGrammarTabs();
  if(grammarTab==='dashboard') renderGrammarDashboard();
  else if(grammarTab==='tenses') renderGrammarTensesList();
  else if(grammarTab==='ielts') renderGrammarIELTS();
  else if(grammarTab==='quiz') renderGrammarQuizMenu();
  else if(grammarTab==='analytics') renderGrammarAnalytics();
  else if(grammarTab==='achievements') renderGrammarAchievements();
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>{
    if(n.getAttribute('onclick')&&n.getAttribute('onclick').includes("'grammar'")) n.classList.add('active');
  });
}

function renderGrammarTabs() {
  const tabs = [
    {id:'dashboard',icon:'<i data-lucide="layout-dashboard" width="16" height="16"></i>',label:'Overview'},{id:'tenses',icon:'<i data-lucide="clock" width="16" height="16"></i>',label:'Tenses'},
    {id:'ielts',icon:'<i data-lucide="landmark" width="16" height="16"></i>',label:'IELTS'},{id:'quiz',icon:'<i data-lucide="help-circle" width="16" height="16"></i>',label:'Quiz'},
    {id:'analytics',icon:'<i data-lucide="bar-chart-3" width="16" height="16"></i>',label:'Analytics'},{id:'achievements',icon:'<i data-lucide="trophy" width="16" height="16"></i>',label:'Achievements'}
  ];
  const el = document.getElementById('grammar-content');
  el.innerHTML = `<div class="grammar-tabs">${tabs.map(t=>
    `<button class="grammar-tab ${grammarTab===t.id?'active':''}" onclick="switchGrammarTab('${t.id}')">${t.icon} ${t.label}</button>`
  ).join('')}</div><div id="grammar-tab-content"></div>`;
  replaceEmojis();
}

function switchGrammarTab(id) {
  grammarTab=id;
  renderGrammar();
  window.scrollTo({top:0,behavior:'smooth'});
}

function openGrammarTenses() { grammarTab='tenses'; renderGrammar(); }
function openGrammarIELTS() { grammarTab='ielts'; renderGrammar(); }
function openGrammarQuiz() { grammarTab='quiz'; renderGrammar(); }

// =============================================
// GRAMMAR — DASHBOARD
// =============================================
function renderGrammarDashboard() {
  const g = state.grammar;
  const rank = getGrammarRank(g.xp);
  const nextRank = getNextRankInfo();
  const totalTenses = GRAMMAR_TENSES.length;
  const completedTenses = GRAMMAR_TENSES.filter(t=>g.completedLessons.includes(t.id)).length;
  const pct = totalTenses ? Math.round(completedTenses/totalTenses*100) : 0;
  const nextRankName = getNextGrammarRank(g.xp);
  const nextRankXp = nextRankName ? nextRankName.xp - g.xp : 0;
  const rankProgress = nextRankName ? Math.min(100, Math.round(((g.xp - (getGrammarRank(g.xp).xp)) / (nextRankName.xp - getGrammarRank(g.xp).xp)) * 100)) : 100;
  const isDaily = g.dailyChallenge && g.dailyChallenge.date === new Date().toDateString();

  document.getElementById('grammar-tab-content').innerHTML = `
    <div class="grammar-hero">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px">
        <div>
          <div class="grammar-hero-title">Grammar Master</div>
          <div class="grammar-hero-sub">Master English grammar from beginner to IELTS/C2 level</div>
        </div>
        <div class="grammar-rank-badge ${rank.name.toLowerCase()}">${rank.icon} ${rank.name}</div>
      </div>
      <div style="display:flex;gap:24px;flex-wrap:wrap;margin-top:20px">
        <div><span style="font-size:28px;font-weight:700;font-family:var(--font-display);color:var(--accent2)">${g.xp}</span><span style="font-size:13px;color:var(--text2);margin-left:6px">Grammar XP</span></div>
        <div><span style="font-size:28px;font-weight:700;font-family:var(--font-display);color:var(--emerald2)">${completedTenses}/${totalTenses}</span><span style="font-size:13px;color:var(--text2);margin-left:6px">Tenses Mastered</span></div>
        <div><span style="font-size:28px;font-weight:700;font-family:var(--font-display);color:var(--amber2)">${g.streak}</span><span style="font-size:13px;color:var(--text2);margin-left:6px">Day Streak</span></div>
        <div><span style="font-size:28px;font-weight:700;font-family:var(--font-display);color:var(--cyan2)">${g.totalLessons}</span><span style="font-size:13px;color:var(--text2);margin-left:6px">Lessons Done</span></div>
      </div>
      ${nextRankName ? `<div style="margin-top:16px"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text2);margin-bottom:4px"><span>${rank.icon} ${rank.name}</span><span>${nextRankName.icon} ${nextRankName.name} (${nextRankXp} XP away)</span></div><div style="height:4px;background:var(--bg4);border-radius:2px;overflow:hidden"><div style="height:100%;background:linear-gradient(90deg,#7c6fff,#22d3ee);border-radius:2px;width:${rankProgress}%;transition:width 0.5s"></div></div></div>` : ''}
    </div>

    <div class="grid-2" style="margin-bottom:28px">
      <div class="card">
        <div class="section-title">🎯 Continue Learning</div>
        ${g.completedLessons.length===0 ? `<div style="color:var(--text2);font-size:14px;margin-bottom:16px">Start with the tenses below! Click any tense to begin.</div>` :
          `<div style="color:var(--text2);font-size:14px;margin-bottom:16px">Pick up where you left off.</div>`}
        <button class="btn btn-primary" onclick="switchGrammarTab('tenses')">📚 Browse All Tenses</button>
      </div>
      <div class="grammar-daily-challenge" onclick="${isDaily?'showGrammarChallengeResult()':'startGrammarDailyChallenge()'}">
        <div style="font-size:42px">${isDaily?'✅':'🎯'}</div>
        <div>
          <div style="font-family:var(--font-display);font-size:17px;font-weight:700;margin-bottom:4px">${isDaily?'Daily Challenge Complete!':'Daily Grammar Challenge'}</div>
          <div style="font-size:13px;color:var(--text2)">${isDaily?'Come back tomorrow for a new challenge':'Complete today\'s challenge for bonus XP'}</div>
        </div>
      </div>
    </div>

    <div class="section-title">📚 Grammar Categories</div>
    <div class="grammar-category-grid">
      ${GRAMMAR_CATEGORIES.slice(0,12).map(c=>{
        const count = g.completedLessons.filter(l=>l.startsWith(c.id)).length;
        const pct2 = c.count ? Math.min(100, Math.round(count/c.count*100)) : 0;
        return `<div class="grammar-cat-card" onclick="switchGrammarTab('tenses')">
          <div class="grammar-cat-icon">${c.icon}</div>
          <div class="grammar-cat-name">${c.name}</div>
          <div class="grammar-cat-count">${count}/${c.count} lessons</div>
          <div class="grammar-cat-progress"><div class="grammar-cat-fill" style="width:${pct2}%"></div></div>
        </div>`;
      }).join('')}
    </div>

    <div class="section-title">⏰ Quick Tense Overview</div>
    <div class="grammar-tense-grid">
      ${GRAMMAR_TENSES.map(t=>{
        const done = g.completedLessons.includes(t.id);
        return `<div class="grammar-tense-card ${done?'completed':''}" onclick="openTenseLesson('${t.id}')">
          <div class="tense-group">${t.group}</div>
          <div class="tense-name">${t.icon} ${t.name}</div>
          <div class="tense-formula">${t.formula}</div>
          <div class="tense-status ${done?'completed':'locked'}">
            ${done ? '✅ Completed' : '📖 Click to study'}
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

function getNextRankInfo() {
  return getNextGrammarRank(state.grammar.xp);
}

// =============================================
// GRAMMAR — TENSES LIST
// =============================================
function renderGrammarTensesList() {
  const g = state.grammar;
  const groups = ['Present Tenses','Past Tenses','Future Tenses'];
  document.getElementById('grammar-tab-content').innerHTML =
    `<div class="section-title">⏰ Complete English Tenses</div>
    <div style="font-size:14px;color:var(--text2);margin-bottom:24px">Master all 12 English tenses with detailed explanations, examples, and interactive lessons.</div>
    ${groups.map(group=>`
      <div class="section-title" style="font-size:15px;color:var(--accent2);margin-top:24px">${group}</div>
      <div class="grammar-tense-grid">
        ${GRAMMAR_TENSES.filter(t=>t.group===group).map(t=>{
          const done = g.completedLessons.includes(t.id);
          return `<div class="grammar-tense-card ${done?'completed':''}" onclick="openTenseLesson('${t.id}')">
            <div class="tense-group">${t.group}</div>
            <div class="tense-name">${t.icon} ${t.name}</div>
            <div class="tense-formula">${t.formula}</div>
            <div class="tense-status ${done?'completed':'locked'}">
              ${done ? '✅ Completed' : '📖 Start Lesson'}
            </div>
          </div>`;
        }).join('')}
      </div>
    `).join('')}`;
}

// =============================================
// GRAMMAR — TENSE LESSON
// =============================================
let currentTenseId = null;

function openTenseLesson(id) {
  currentTenseId = id;
  const t = GRAMMAR_TENSES.find(t=>t.id===id);
  if(!t) return;
  const g = state.grammar;
  const done = g.completedLessons.includes(id);

  document.getElementById('grammar-tab-content').innerHTML = `
    <div class="grammar-lesson-view">
      <div class="grammar-lesson-header">
        <div class="grammar-lesson-back" onclick="switchGrammarTab('tenses')">← Back to Tenses</div>
        <div class="grammar-lesson-group">${t.group}</div>
        <div class="grammar-lesson-title">${t.icon} ${t.name}</div>
        ${done ? '<span class="badge badge-emerald" style="margin-top:8px">✅ Completed</span>' : '<span class="badge badge-accent" style="margin-top:8px">📖 In Progress</span>'}
      </div>

      <div class="grammar-section-card">
        <div class="sec-title"><span class="sec-icon">📐</span> Structure</div>
        <div class="grammar-formula-box">${t.formula}</div>
      </div>

      <div class="grammar-section-card">
        <div class="sec-title"><span class="sec-icon">📖</span> Explanation</div>
        <div style="margin-bottom:12px">
          <div style="font-weight:600;color:var(--emerald2);font-size:13px;margin-bottom:4px">🌱 Beginner</div>
          <div style="font-size:14px;color:var(--text1);line-height:1.6">${t.beginner}</div>
        </div>
        <div style="margin-bottom:12px">
          <div style="font-weight:600;color:var(--accent2);font-size:13px;margin-bottom:4px">🎓 Advanced</div>
          <div style="font-size:14px;color:var(--text1);line-height:1.6">${t.advanced}</div>
        </div>
        <div style="margin-bottom:12px">
          <div style="font-weight:600;color:var(--amber2);font-size:13px;margin-bottom:4px">🏛️ IELTS</div>
          <div style="font-size:14px;color:var(--text1);line-height:1.6">${t.ielts}</div>
        </div>
        <div>
          <div style="font-weight:600;color:var(--cyan2);font-size:13px;margin-bottom:4px">📝 SAT / Academic</div>
          <div style="font-size:14px;color:var(--text1);line-height:1.6">${t.academic}</div>
        </div>
      </div>

      <div class="grammar-section-card">
        <div class="sec-title"><span class="sec-icon">✅</span> Examples</div>
        <div class="grammar-example-grid">
          ${t.positive.map(ex=>`<div class="grammar-example positive"><span class="ex-icon">✅</span><span class="ex-text">${ex}</span></div>`).join('')}
          ${t.negative.map(ex=>`<div class="grammar-example negative"><span class="ex-icon">❌</span><span class="ex-text">${ex}</span></div>`).join('')}
          ${t.question.map(ex=>`<div class="grammar-example question"><span class="ex-icon">❓</span><span class="ex-text">${ex}</span></div>`).join('')}
        </div>
      </div>

      ${t.mistakes ? `<div class="grammar-section-card">
        <div class="sec-title"><span class="sec-icon">⚠️</span> Common Mistakes</div>
        ${t.mistakes.map(m=>`
          <div class="grammar-mistake wrong"><span class="mistake-label">✕</span> ${m.wrong}</div>
          <div class="grammar-mistake correct"><span class="mistake-label">✓</span> ${m.correct}</div>
        `).join('')}
      </div>` : ''}

      <div class="grammar-section-card">
        <div class="sec-title"><span class="sec-icon">⏰</span> Time Expressions & Usage</div>
        <div style="margin-bottom:12px">
          <div style="font-weight:600;color:var(--cyan2);font-size:12px;margin-bottom:6px">Signal Words</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${t.timeExpressions.map(e=>`<span class="tag rel" style="cursor:default">${e}</span>`).join('')}
          </div>
        </div>
        <div>
          <div style="font-weight:600;color:var(--accent2);font-size:12px;margin-bottom:6px">Usage Types</div>
          <ul style="font-size:14px;color:var(--text1);line-height:1.8;padding-left:20px">
            ${t.usage.map(u=>`<li>${u}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="display:flex;gap:12px;justify-content:center;margin-top:28px;margin-bottom:40px">
        ${done ? `<button class="btn btn-outline" onclick="markTenseIncomplete('${t.id}')">↩ Mark as Incomplete</button>` :
          `<button class="btn btn-primary btn-lg" onclick="completeTenseLesson('${t.id}')">✅ Complete Lesson (+20 XP)</button>`}
        <button class="btn btn-ghost" onclick="startGrammarTenseQuiz('${t.id}')">🧪 Take Quiz</button>
      </div>
    </div>
  `;
  window.scrollTo({top:0,behavior:'smooth'});
}

function completeTenseLesson(id) {
  const g = state.grammar;
  if(!g.completedLessons.includes(id)) {
    g.completedLessons.push(id);
    g.totalLessons++;
    addGrammarXP(20, 'Completed lesson');
    checkGrammarAchievements();
    toast(`✅ "${GRAMMAR_TENSES.find(t=>t.id===id)?.name}" completed!`, 'success', 3000);
    openTenseLesson(id);
  }
}

function markTenseIncomplete(id) {
  const g = state.grammar;
  const idx = g.completedLessons.indexOf(id);
  if(idx>-1) { g.completedLessons.splice(idx,1); g.totalLessons = Math.max(0,g.totalLessons-1); saveGrammar(); }
  openTenseLesson(id);
}

// =============================================
// GRAMMAR — IELTS STRUCTURES
// =============================================
const IELTS_STRUCTURES = [
  { id:'io1', structure:'From my perspective, ...', group:'Opinion Structures',
    meaning:'A formal way to express personal opinion without using "I think".',
    band:'7.0+', formality:'Formal/Academic',
    speaking:'"From my perspective, the government should invest more in renewable energy."',
    writing:'"From my perspective, the benefits of globalization outweigh the drawbacks."',
    advanced:'"From an economic perspective, the policy has yielded mixed results, though social indicators suggest improvement."',
    mistake:'Avoid: "From my perspective, I think..." — redundant.'
  },
  { id:'io2', structure:'It is widely believed that ...', group:'Opinion Structures',
    meaning:'A higher-level alternative to "many people think" — shows awareness of general consensus.',
    band:'7.5+', formality:'Formal/Academic',
    speaking:'"It is widely believed that climate change is the biggest threat to humanity."',
    writing:'"It is widely believed that education is the key to economic development."',
    advanced:'"It is widely believed among policy-makers that regulatory frameworks must evolve alongside technological advancements."',
    mistake:'Avoid overusing — use 1-2 times per essay maximum.'
  },
  { id:'io3', structure:'There is no denying that ...', group:'Opinion Structures',
    meaning:'Acknowledges an undeniable truth before presenting your argument.',
    band:'7.0+', formality:'Formal',
    speaking:'"There is no denying that social media has transformed communication."',
    writing:'"There is no denying that urbanization has both positive and negative consequences."',
    advanced:'"There is no denying that the paradigm shift in consumer behavior has reshaped entire industries."',
    mistake:'Only use for truly undeniable facts.'
  },
  { id:'io4', structure:'One could argue that ...', group:'Opinion Structures',
    meaning:'Presents an opposing view diplomatically. Shows balance in argument.',
    band:'7.5+', formality:'Formal/Academic',
    speaking:'"One could argue that technology makes us less social, but I disagree."',
    writing:'"One could argue that the policy was too restrictive, yet it achieved its goals."',
    advanced:'"One could argue that the correlation does not imply causation, and further research is warranted."',
    mistake:'Follow with a concession or counter-argument for best effect.'
  },
  { id:'io5', structure:'I strongly believe that ...', group:'Opinion Structures',
    meaning:'Direct and emphatic opinion expression. Powerful when used sparingly.',
    band:'6.5+', formality:'Semi-formal',
    speaking:'"I strongly believe that everyone deserves access to quality education."',
    writing:'"I strongly believe that governments must prioritize sustainable development."',
    advanced:'"I strongly believe that the interplay between economic incentives and environmental regulation will define our generation."',
    mistake:'Avoid overusing in one essay — use once for emphasis.'
  },
  { id:'ld1', structure:'Furthermore, ...', group:'Advanced Linking Devices',
    meaning:'Adds additional supporting information. More formal than "also" or "and".',
    band:'7.0+', formality:'Formal/Academic',
    speaking:'"Furthermore, remote work has increased productivity in many sectors."',
    writing:'"Furthermore, the data suggests a clear correlation between education and income levels."',
    advanced:'"Furthermore, longitudinal studies corroborate the hypothesis that early intervention yields significant long-term benefits."',
    mistake:'Don\'t use to start every paragraph — vary with "Moreover", "In addition".'
  },
  { id:'ld2', structure:'Nevertheless, ...', group:'Advanced Linking Devices',
    meaning:'Introduces a contrasting point despite what was previously stated.',
    band:'7.5+', formality:'Formal',
    speaking:'"The weather was terrible. Nevertheless, we had a wonderful time."',
    writing:'"Nevertheless, the policy had unintended consequences that cannot be ignored."',
    advanced:'"Nevertheless, the empirical evidence challenges the prevailing theoretical framework."',
    mistake:'Often confused with "nonetheless" — both are correct.'
  },
  { id:'ld3', structure:'Consequently, ...', group:'Advanced Linking Devices',
    meaning:'Shows a direct result or effect. More academic than "so".',
    band:'7.0+', formality:'Formal/Academic',
    speaking:'"He missed the deadline. Consequently, the project was delayed."',
    writing:'"Consequently, the company was forced to restructure its operations."',
    advanced:'"Consequently, the socio-economic landscape underwent a fundamental transformation."',
    mistake:'Use for direct, logical consequences, not emotional ones.'
  },
  { id:'ld4', structure:'In contrast, ...', group:'Advanced Linking Devices',
    meaning:'Highlights differences between two ideas, groups, or periods.',
    band:'7.0+', formality:'Formal',
    speaking:'"City life is fast-paced. In contrast, village life is much more relaxed."',
    writing:'"In contrast, developing nations face completely different challenges."',
    advanced:'"In contrast to the prevailing view, the study reveals a more nuanced picture."',
    mistake:'Use after establishing the first point completely.'
  },
  { id:'ld5', structure:'As a result, ...', group:'Advanced Linking Devices',
    meaning:'Shows consequence or outcome. Similar to "consequently" but slightly less formal.',
    band:'6.5+', formality:'Semi-formal to Formal',
    speaking:'"As a result, many students chose to study abroad."',
    writing:'"As a result, the economy experienced a period of sustained growth."',
    advanced:'"As a result of these cumulative factors, the ecosystem reached a tipping point."',
    mistake:'Can be used in either speaking or writing.'
  },
  { id:'ld6', structure:'Moreover, ...', group:'Advanced Linking Devices',
    meaning:'Adds further emphasis. Stronger than "furthermore" when introducing important points.',
    band:'7.5+', formality:'Formal/Academic',
    speaking:'"The restaurant has excellent food. Moreover, the service is outstanding."',
    writing:'"Moreover, the research highlights a critical gap in the existing literature."',
    advanced:'"Moreover, the implications of this finding extend far beyond the immediate context."',
    mistake:'Less common in speaking — reserve primarily for writing.'
  },
  { id:'b8-1', structure:'Not only ... but also ...', group:'Band 8+ Structures',
    meaning:'Emphasizes two related points. Inversion after "not only" for high impact.',
    band:'8.0+', formality:'Formal',
    speaking:'"Not only does she speak three languages, but she also plays piano beautifully."',
    writing:'"Not only does globalization create economic opportunities, but it also fosters cultural exchange."',
    advanced:'"Not only does the model account for historical variables, but it also predicts future trends with remarkable accuracy."',
    mistake:'Remember to invert the subject-verb after "not only".'
  },
  { id:'b8-2', structure:'The more ..., the more ...', group:'Band 8+ Structures',
    meaning:'Shows a cause-and-effect relationship where two things increase together.',
    band:'8.0+', formality:'Semi-formal to Formal',
    speaking:'"The more you practice, the more confident you become."',
    writing:'"The more developed a nation becomes, the greater its environmental responsibility."',
    advanced:'"The more intricately we examine the data, the more apparent the underlying patterns become."',
    mistake:'Both sides must use comparative adjectives or adverbs.'
  },
  { id:'b8-3', structure:'Hardly had ... when ...', group:'Band 8+ Structures',
    meaning:'Shows two past events happening almost simultaneously with inversion.',
    band:'8.5+', formality:'Formal/Literary',
    speaking:'"Hardly had we sat down when the fire alarm went off."',
    writing:'"Hardly had the policy been implemented when its effects became visible."',
    advanced:'"Hardly had the paradigm shifted when new evidence emerged challenging the revised framework."',
    mistake:'Requires past perfect in the first clause and simple past in the "when" clause.'
  },
  { id:'b8-4', structure:'No sooner had ... than ...', group:'Band 8+ Structures',
    meaning:'Similar to "hardly...when" — emphasizes immediacy of two past events.',
    band:'8.5+', formality:'Formal/Literary',
    speaking:'"No sooner had I arrived than the meeting started."',
    writing:'"No sooner had the reforms been enacted than the economy began to recover."',
    advanced:'"No sooner had the study been published than it sparked intense academic debate."',
    mistake:'Always use "than" after this structure, not "when".'
  },
  { id:'b8-5', structure:'Had I known ..., I would have ...', group:'Band 8+ Structures',
    meaning:'3rd conditional with inversion — expressing regret about the past.',
    band:'8.0+', formality:'Formal',
    speaking:'"Had I known about the traffic, I would have left earlier."',
    writing:'"Had the government anticipated the crisis, more effective measures would have been implemented."',
    advanced:'"Had the researchers controlled for confounding variables, the results might have been significantly different."',
    mistake:'No "if" needed — the inversion replaces it.'
  },
  { id:'as1', structure:'This phenomenon can be attributed to ...', group:'Academic Structures',
    meaning:'Explains causes of a trend or phenomenon in a sophisticated way.',
    band:'7.5+', formality:'Academic',
    speaking:'"This trend can be attributed to advances in technology."',
    writing:'"This phenomenon can be attributed to a combination of economic and social factors."',
    advanced:'"This phenomenon can be largely attributed to the convergence of technological innovation and shifting consumer preferences."',
    mistake:'Use "largely" or "partially" to moderate the claim.'
  },
  { id:'as2', structure:'One of the primary reasons is ...', group:'Academic Structures',
    meaning:'Introduces a key cause or factor in a formal, measured way.',
    band:'7.0+', formality:'Academic',
    speaking:'"One of the primary reasons for this is the rising cost of living."',
    writing:'"One of the primary reasons for this shift is the increased accessibility of higher education."',
    advanced:'"One of the primary reasons underlying this demographic transition is the structural change in the labor market."',
    mistake:'Follow with specific evidence or examples.'
  },
  { id:'as3', structure:'A growing number of people believe ...', group:'Academic Structures',
    meaning:'Describes a trend in public opinion or behavior.',
    band:'7.0+', formality:'Semi-formal to Academic',
    speaking:'"A growing number of people believe that remote work is here to stay."',
    writing:'"A growing number of people believe that environmental protection should take precedence over economic growth."',
    advanced:'"A growing number of academics contend that traditional methodological frameworks require fundamental revision."',
    mistake:'Support with data when possible for stronger impact.'
  },
  { id:'as4', structure:'It is often argued that ...', group:'Academic Structures',
    meaning:'Presents a commonly held view before analyzing it critically.',
    band:'7.5+', formality:'Academic',
    speaking:'"It is often argued that social media divides people."',
    writing:'"It is often argued that free trade benefits all parties involved, though this view overlooks certain complexities."',
    advanced:'"It is often argued that economic growth necessarily entails environmental degradation, yet this deterministic view is increasingly contested."',
    mistake:'Follow with a counter-point or nuanced analysis.'
  },
  { id:'as5', structure:'This issue has sparked considerable debate ...', group:'Academic Structures',
    meaning:'Introduces a controversial topic with academic framing.',
    band:'7.5+', formality:'Academic',
    speaking:'"This issue has sparked considerable debate among experts."',
    writing:'"This issue has sparked considerable debate in academic and policy-making circles."',
    advanced:'"This issue has sparked considerable debate regarding the ethical implications of artificial intelligence in healthcare."',
    mistake:'Follow with specific arguments from both sides.'
  },
  { id:'sp1', structure:'To be honest, ...', group:'Advanced Speaking Structures',
    meaning:'A natural discourse marker for giving a personal, candid opinion.',
    band:'6.5+', formality:'Informal/Speaking',
    speaking:'"To be honest, I found the exam more challenging than I expected."',
    writing:'Use in informal writing only.',
    advanced:'"To be honest, I believe the conventional wisdom on this matter is fundamentally flawed."',
    mistake:'Avoid in academic writing — use "Frankly" for semi-formal contexts.'
  },
  { id:'sp2', structure:'If you ask me, ...', group:'Advanced Speaking Structures',
    meaning:'A friendly way to introduce a personal opinion in conversation.',
    band:'6.5+', formality:'Informal/Speaking',
    speaking:'"If you ask me, the best solution is to invest in education."',
    writing:'Avoid in writing.',
    advanced:'"If you ask me, the current approach fails to address the root causes of the problem."',
    mistake:'Very informal — only for speaking test Part 1 or casual conversation.'
  },
  { id:'sp3', structure:'From what I have seen, ...', group:'Advanced Speaking Structures',
    meaning:'Bases opinion on personal observation — shows real-world evidence.',
    band:'7.0+', formality:'Semi-formal/Speaking',
    speaking:'"From what I have seen, young people are more environmentally conscious than previous generations."',
    writing:'Use in informal essays or reports.',
    advanced:'"From what I have observed in professional settings, collaborative approaches tend to yield more innovative outcomes."',
    mistake:'Follow with specific examples for credibility.'
  },
  { id:'sp4', structure:'I would say that ...', group:'Advanced Speaking Structures',
    meaning:'A polite, measured way to express opinion without sounding dogmatic.',
    band:'6.5+', formality:'Semi-formal',
    speaking:'"I would say that experience is just as important as formal education."',
    writing:'"I would argue that..." is the formal equivalent.',
    advanced:'"I would venture to say that the implications of this discovery are far-reaching."',
    mistake:'Use "venture to say" for added sophistication.'
  },
  { id:'sp5', structure:'As far as I am concerned, ...', group:'Advanced Speaking Structures',
    meaning:'A formal discourse marker limiting your opinion to your own perspective.',
    band:'7.0+', formality:'Formal/Speaking',
    speaking:'"As far as I am concerned, the government should focus on healthcare."',
    writing:'"As far as X is concerned..." is common in academic writing for topic introduction.',
    advanced:'"As far as the economic implications are concerned, the prognosis is cautiously optimistic."',
    mistake:'Can be used in both speaking and formal writing.'
  }
];

// ===== IELTS MOCK DATA =====
const IELTS_READING = [
  { id:'r1', title:'The Science of Language Acquisition',
    passage:`Language acquisition is a remarkable human achievement. Within the first few years of life, children acquire complex grammatical structures and extensive vocabularies without formal instruction. This process, known as first language acquisition, has fascinated linguists and psychologists for decades.
    Researchers have identified several key stages in language development. The pre-linguistic stage, lasting from birth to approximately 12 months, involves cooing and babbling. Around their first birthday, children typically produce their first words. The two-word stage follows around 18-24 months, after which grammatical development accelerates dramatically.
    The debate between nature and nurture in language acquisition remains unresolved. Noam Chomsky proposed the existence of a Language Acquisition Device (LAD) — an innate biological capacity for language. In contrast, interactionists argue that social interaction is crucial for language development, emphasising the role of caregiver-child communication.
    Recent neuroimaging studies have shed light on the brain regions involved in language processing. Broca's area, located in the frontal lobe, is primarily responsible for speech production, while Wernicke's area in the temporal lobe handles comprehension. Damage to these areas can result in specific language impairments, providing further evidence for the modular organisation of language in the brain.
    Bilingualism research has revealed that learning a second language at an early age confers cognitive advantages, including enhanced executive function and metalinguistic awareness. However, adult learners can also achieve high levels of proficiency, particularly with immersive exposure and consistent practice.`,
    questions:[
      { q:'According to the passage, when do children typically begin producing their first words?', o:['Around 6 months','Around 12 months','Around 18 months','Around 24 months'], a:1 },
      { q:'What does the acronym LAD stand for?', o:['Language and Development','Linguistic Analysis Department','Language Acquisition Device','Learning Aptitude Definition'], a:2 },
      { q:'Which brain area is primarily responsible for speech comprehension?', o:['Broca\'s area','Wernicke\'s area','Frontal lobe','Temporal lobe'], a:1 },
      { q:'What cognitive advantage is associated with early bilingualism?', o:['Higher IQ','Enhanced executive function','Better memory','Faster reading speed'], a:1 },
      { q:'What does the interactionist perspective emphasise?', o:['Innate biological capacity','Grammar rules','Social interaction','Neuroimaging'], a:2 },
      { q:'Damage to Broca\'s area primarily affects which function?', o:['Comprehension','Memory','Speech production','Writing ability'], a:2 },
      { q:'What is the pre-linguistic stage characterised by?', o:['First words','Two-word phrases','Cooing and babbling','Complex sentences'], a:2 },
      { q:'According to the passage, adult language learners can achieve high proficiency through:', o:['Formal instruction only','Immersion and practice','Younger age','Grammar study'], a:1 },
      { q:'The two-word stage occurs approximately at what age?', o:['12-18 months','18-24 months','24-30 months','30-36 months'], a:1 },
      { q:'What does the passage suggest about the nature vs. nurture debate?', o:['Nature is more important','Nurture is more important','It remains unresolved','Both are equally important'], a:2 }
    ]
  },
  { id:'r2', title:'Urbanisation and Its Global Impact',
    passage:`Urbanisation — the movement of populations from rural to urban areas — is one of the most significant demographic trends of the twenty-first century. According to United Nations data, more than 55% of the world's population now lives in urban areas, a figure projected to reach 68% by 2050.
    The drivers of urbanisation are multifaceted. Economic opportunities in cities, including higher wages and diverse employment options, act as powerful pull factors. Concurrently, rural push factors such as agricultural mechanisation, land fragmentation, and limited access to services drive people towards urban centres.
    While urbanisation has been associated with economic growth and innovation, it also presents considerable challenges. Rapid and often unplanned urban expansion has led to housing shortages, inadequate infrastructure, and environmental degradation. Traffic congestion, air pollution, and waste management are pressing concerns in many megacities.
    However, sustainable urban planning offers solutions. The concept of 'smart cities' — urban areas that leverage technology and data to improve efficiency and quality of life — has gained traction worldwide. Green architecture, efficient public transport systems, and renewable energy integration are key components of sustainable urban development.
    The social implications of urbanisation are equally profound. Cities are melting pots of cultural diversity, fostering innovation and creativity. Yet they can also exacerbate inequality, with affluent neighbourhoods existing alongside informal settlements or slums. Policymakers must balance economic development with social equity to create truly inclusive urban environments.`,
    questions:[
      { q:'What percentage of the world population currently lives in urban areas?', o:['45%','55%','65%','75%'], a:1 },
      { q:'By 2050, what is the projected urban population percentage?', o:['58%','62%','68%','72%'], a:2 },
      { q:'Which of the following is NOT mentioned as a pull factor for urbanisation?', o:['Higher wages','Diverse employment','Better climate','Economic opportunities'], a:2 },
      { q:'What does the passage identify as a consequence of rapid urban expansion?', o:['Improved infrastructure','Housing shortages','Lower pollution','Better waste management'], a:1 },
      { q:'What are "smart cities" defined as?', o:['Cities with tall buildings','Cities using technology for efficiency','Cities with high population','Green cities'], a:1 },
      { q:'Which of the following is mentioned as a component of sustainable urban development?', o:['More roads','Green architecture','Higher buildings','More parking'], a:1 },
      { q:'What social challenge does urbanisation present according to the passage?', o:['Cultural homogeneity','Reduced creativity','Exacerbated inequality','Less diversity'], a:2 },
      { q:'What role do cities play in fostering innovation?', o:['Limited role','Melting pots of diversity','Barrier to creativity','Insignificant'], a:1 },
      { q:'What must policymakers balance for inclusive urban environments?', o:['Growth and sustainability','Economic development and social equity','Population and resources','Traffic and pollution'], a:1 },
      { q:'Which factor is described as a "push factor" for rural-to-urban migration?', o:['Higher wages','Better education','Agricultural mechanisation','More jobs'], a:2 }
    ]
  },
  { id:'r3', title:'The Psychology of Consumer Behaviour',
    passage:`Consumer behaviour is a complex field that draws on psychology, economics, and sociology. Understanding why consumers make the decisions they do has become a cornerstone of modern marketing strategy. Traditional economic theory assumed that consumers are rational actors who make decisions based on utility maximisation. However, behavioural economics has revealed that human decision-making is far from perfectly rational.
    Daniel Kahneman and Amos Tversky's prospect theory demonstrates that losses loom larger than gains — a phenomenon known as loss aversion. Consumers are approximately twice as sensitive to potential losses as they are to equivalent gains. This asymmetry has profound implications for pricing strategies and product positioning.
    The concept of anchoring bias shows that initial information serves as a reference point for subsequent judgements. For example, a high original price makes a discounted price appear more attractive, even if the discounted price is still relatively high. Marketers leverage this through strategic price presentation.
    Social proof is another powerful influence on consumer behaviour. People tend to follow the actions of others, particularly in situations of uncertainty. Online reviews, testimonials, and user-generated content capitalise on this tendency. The bandwagon effect — where adoption of a product increases as more people use it — is a manifestation of social proof.
    Emotional factors play a crucial role in purchasing decisions. Neuroscientific research using fMRI scans has shown that emotional engagement activates brain regions associated with reward and pleasure. Successful marketing campaigns often appeal to emotions such as belonging, status, and aspiration rather than purely rational considerations.`,
    questions:[
      { q:'What did traditional economic theory assume about consumers?', o:['They are emotional','They are rational actors','They are unpredictable','They are impulsive'], a:1 },
      { q:'According to prospect theory, losses loom larger than gains by approximately:', o:['Equal measure','Twice as much','Three times','Four times'], a:1 },
      { q:'What is the anchoring bias?', o:['Final price anchoring','Initial info as reference point','Preference for brands','Online reviews'], a:1 },
      { q:'How do marketers leverage the anchoring effect?', o:['Through discounts','Strategic price presentation','Through advertising','Through packaging'], a:1 },
      { q:'What is social proof based on?', o:['Expert opinions','Following others\' actions','Price comparison','Brand loyalty'], a:1 },
      { q:'What does the bandwagon effect describe?', o:['Price reductions','Increased adoption with more users','Limited availability','Seasonal trends'], a:1 },
      { q:'What does fMRI research reveal about emotional engagement?', o:['Activates pain regions','Activates reward and pleasure regions','Activates memory','Activates visual cortex'], a:1 },
      { q:'Which of the following is an emotional appeal mentioned in the passage?', o:['Price','Quality','Belonging and status','Convenience'], a:2 },
      { q:'According to the passage, what field challenges traditional economic theory about consumers?', o:['Sociology','Behavioural economics','Neuropsychology','Anthropology'], a:1 },
      { q:'What role do online reviews play in marketing?', o:['Price comparison','Capitalising on social proof','Product description','Quality assurance'], a:1 }
    ]
  }
];

const IELTS_WRITING_TASKS = {
  task1: [
    { id:'w1t1', prompt:'The chart below shows the percentage of households in the UK with internet access from 2010 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data:'2010: 65%, 2012: 72%, 2014: 78%, 2016: 84%, 2018: 89%, 2020: 93%',
      type:'Line Graph' },
    { id:'w2t1', prompt:'The table below shows the average monthly rainfall (in mm) in three different cities over a year. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data:'City A: Jan:45, Apr:60, Jul:120, Oct:80 | City B: Jan:120, Apr:90, Jul:30, Oct:70 | City C: Jan:60, Apr:40, Jul:20, Oct:50',
      type:'Table' },
    { id:'w3t1', prompt:'The pie charts below show the percentage of energy production by source in a country in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      data:'2000: Coal:40%, Oil:25%, Gas:20%, Nuclear:10%, Renewables:5% | 2020: Coal:20%, Oil:18%, Gas:22%, Nuclear:15%, Renewables:25%',
      type:'Pie Chart' }
  ],
  task2: [
    { id:'w1t2', prompt:'Some people believe that technological advancements have made people less socially connected, while others argue that technology has strengthened social bonds. Discuss both views and give your own opinion.',
      topic:'Technology & Society', type:'Discussion Essay' },
    { id:'w2t2', prompt:'In many countries, the number of people choosing to work from home has increased significantly. Do the advantages of remote work outweigh the disadvantages? Give reasons for your answer and include relevant examples from your own knowledge or experience.',
      topic:'Work & Employment', type:'Opinion Essay' },
    { id:'w3t2', prompt:'Environmental issues are becoming increasingly severe. Some people think that individuals should take responsibility for protecting the environment, while others believe that governments and large corporations should be primarily responsible. Discuss both perspectives and give your opinion.',
      topic:'Environment', type:'Discussion Essay' },
    { id:'w4t2', prompt:'Education is widely recognised as a fundamental right, yet access to quality education varies significantly across different regions. What measures can governments take to ensure equal access to education for all citizens? Provide relevant examples.',
      topic:'Education', type:'Problem-Solution Essay' }
  ]
};

const IELTS_SPEAKING = {
  part1: [
    { q:'Where do you currently live? Is it a house or an apartment?', hints:['Describe your home briefly','Mention what you like about it','Use specific details'] },
    { q:'What do you enjoy doing in your free time?', hints:['Mention 2-3 activities','Explain why you enjoy them','Use adverbs of frequency'] },
    { q:'Do you prefer to spend time indoors or outdoors? Why?', hints:['State your preference clearly','Give reasons','Contrast with the alternative'] },
    { q:'What kind of music do you enjoy?', hints:['Name specific genres','Mention artists or songs','Explain how it makes you feel'] },
    { q:'How often do you use technology in your daily life?', hints:['Give specific examples','Mention frequency','Discuss both positive and negative aspects'] },
    { q:'What is your favourite season of the year?', hints:['Name the season','Describe the weather','Explain why you like it'] },
    { q:'Do you enjoy travelling? Where have you been recently?', hints:['Express enthusiasm','Mention specific places','Describe your experience'] }
  ],
  part2: [
    { cue:'Describe a memorable holiday you have had.', points:['Where you went','Who you went with','What you did there'], followUp:'Explain why it was so memorable.' },
    { cue:'Describe a book that has had a significant impact on you.', points:['What the book is about','When you read it','Why you chose it'], followUp:'Explain how it influenced your thinking.' },
    { cue:'Describe a person who has inspired you in your life.', points:['Who this person is','How you know them','What qualities they have'], followUp:'Explain why they are inspiring to you.' },
    { cue:'Describe a skill you would like to learn in the future.', points:['What the skill is','Why you want to learn it','How you plan to learn it'], followUp:'Explain how this skill would benefit your life.' },
    { cue:'Describe a change that has improved your life.', points:['What the change was','When it happened','How it affected you'], followUp:'Explain why this change was beneficial.' }
  ],
  part3: [
    { q:'How has technology changed the way people communicate in recent years?', followUp:['Do you think this is positive or negative overall?','How might communication change in the future?'] },
    { q:'What role should education play in preparing young people for the future?', followUp:['Are traditional education systems still relevant?','What skills will be most important in the future?'] },
    { q:'Why do you think some people are more successful at learning new skills than others?', followUp:['Can anyone become an expert with enough practice?','What role does motivation play?'] },
    { q:'How does globalisation affect cultural identity?', followUp:['Is cultural homogenisation inevitable?','How can cultures preserve their uniqueness?'] },
    { q:'What are the main environmental challenges facing the world today?', followUp:['Can individual actions make a difference?','What is the role of international cooperation?'] }
  ]
};

async function fetchIELTSVocabWords() {
  const words = await API.fetchWordsFromAPI(30, 'academic');
  const defs = await Promise.all(words.map(w => API.getDefinition(w)));
  return defs.filter(Boolean).slice(0, 30).map((d, i) => ({
    word: d.word,
    type: d.partOfSpeech,
    def: d.definition,
    collocation: d.synonyms?.slice(0, 3).join(', ') || 'common usage'
  }));
}

const IELTS_BAND_SCALES = {
  reading:{ ac:40, gt:40 },
  listening:{ total:40 },
  bandDescriptors:[
    { band:9, correct:39 }, { band:8.5, correct:36 }, { band:8, correct:33 },
    { band:7.5, correct:30 }, { band:7, correct:27 }, { band:6.5, correct:23 },
    { band:6, correct:20 }, { band:5.5, correct:17 }, { band:5, correct:14 },
    { band:4.5, correct:11 }, { band:4, correct:8 }
  ]
};

function calculateIELTSBand(correct, total, section) {
  if (total === 0) return 0;
  const pct = correct / total;
  if (pct >= 0.95) return 9;
  if (pct >= 0.88) return 8.5;
  if (pct >= 0.8) return 8;
  if (pct >= 0.7) return 7.5;
  if (pct >= 0.65) return 7;
  if (pct >= 0.55) return 6.5;
  if (pct >= 0.5) return 6;
  if (pct >= 0.4) return 5.5;
  if (pct >= 0.3) return 5;
  if (pct >= 0.2) return 4.5;
  return 4;
}

function getBandDescription(band) {
  if (band >= 9) return 'Expert User — Has fully operational command of the language';
  if (band >= 8) return 'Very Good User — Has fully operational command with only occasional unsystematic inaccuracies';
  if (band >= 7) return 'Good User — Has operational command, occasional inaccuracies in some situations';
  if (band >= 6) return 'Competent User — Has effective command despite some inaccuracies';
  if (band >= 5) return 'Modest User — Has partial command, coping with overall meaning in most situations';
  if (band >= 4) return 'Limited User — Basic competence limited to familiar situations';
  return 'Extremely Limited User — Conveys only general meaning';
}

// ===== IELTS STATE =====
let ieltsState = {
  tab:'dashboard',
  reading:{ passage:null, answers:{}, score:null, timer:null },
  writing:{ task1:{ prompt:null, answer:'' }, task2:{ prompt:null, answer:'' } },
  history: JSON.parse(localStorage.getItem('vocabmaster_ielts_history') || '[]')
};

function saveIELTSHistory() {
  localStorage.setItem('vocabmaster_ielts_history', JSON.stringify(ieltsState.history));
}

function renderIELTS() {
  const body = document.getElementById('ielts-body');
  if (!body) return;
  const h = ieltsState.history;
  const latestReading = h.filter(r => r.type==='reading').pop();
  const latestWriting = h.filter(r => r.type==='writing').pop();
  
  let overallBand = '-';
  if (h.length > 0) {
    const bands = h.filter(r => r.band).map(r => r.band);
    if (bands.length > 0) overallBand = (bands.reduce((a,b)=>a+b,0)/bands.length).toFixed(1);
  }

  body.innerHTML = `
    <div class="ielts-hero">
      <div class="ielts-band-display" style="--pct:${overallBand !== '-' ? (overallBand/9*100)+'%' : '0%'}">
        <span>${overallBand}</span>
      </div>
      <div class="ielts-hero-title">IELTS Mock Test</div>
      <div class="ielts-hero-sub">Realistic exam simulation — practice reading, writing, speaking, and build academic vocabulary</div>
    </div>

    <div class="ielts-score-grid">
      <div class="ielts-score-card">
        <div class="ielts-score-val">${h.length > 0 ? Math.round(h.filter(r => r.correct).reduce((a,r) => a+r.correct,0) / Math.max(1, h.filter(r => r.correct).length)*10)/10 : '-'}</div>
        <div class="ielts-score-label">Avg Reading Score</div>
      </div>
      <div class="ielts-score-card">
        <div class="ielts-score-val">${h.length > 0 ? (h.filter(r => r.band).reduce((a,r) => a+r.band,0) / Math.max(1, h.filter(r => r.band).length)).toFixed(1) : '-'}</div>
        <div class="ielts-score-label">Avg Band Score</div>
      </div>
      <div class="ielts-score-card">
        <div class="ielts-score-val">${h.length}</div>
        <div class="ielts-score-label">Tests Completed</div>
      </div>
      <div class="ielts-score-card">
        <div class="ielts-score-val">${overallBand >= 7 ? 'Yes' : overallBand !== '-' ? 'Target: 7+' : '-'}</div>
        <div class="ielts-score-label">Target Met (7+)</div>
      </div>
    </div>

    <div class="ielts-tabs">
      <button class="ielts-tab ${ieltsState.tab==='dashboard'?'active':''}" onclick="switchIELTSTab('dashboard')">
        <i data-lucide="layout-dashboard" width="16" height="16"></i> Dashboard
      </button>
      <button class="ielts-tab ${ieltsState.tab==='reading'?'active':''}" onclick="switchIELTSTab('reading')">
        <i data-lucide="book-open" width="16" height="16"></i> Reading
      </button>
      <button class="ielts-tab ${ieltsState.tab==='writing'?'active':''}" onclick="switchIELTSTab('writing')">
        <i data-lucide="edit-3" width="16" height="16"></i> Writing
      </button>
      <button class="ielts-tab ${ieltsState.tab==='speaking'?'active':''}" onclick="switchIELTSTab('speaking')">
        <i data-lucide="mic" width="16" height="16"></i> Speaking
      </button>
      <button class="ielts-tab ${ieltsState.tab==='vocabulary'?'active':''}" onclick="switchIELTSTab('vocabulary')">
        <i data-lucide="book" width="16" height="16"></i> Vocabulary
      </button>
      <button class="ielts-tab ${ieltsState.tab==='history'?'active':''}" onclick="switchIELTSTab('history')">
        <i data-lucide="clock" width="16" height="16"></i> History
      </button>
    </div>

    <div id="ielts-tab-content"></div>`;

  renderIELTSTabContent();
  replaceEmojis();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function switchIELTSTab(tab) {
  ieltsState.tab = tab;
  renderIELTS();
}

async function renderIELTSTabContent() {
  const content = document.getElementById('ielts-tab-content');
  if (!content) return;
  switch(ieltsState.tab) {
    case 'dashboard': renderIELTSDashboard(content); break;
    case 'reading': renderIELTSReadingMenu(content); break;
    case 'writing': renderIELTSWritingMenu(content); break;
    case 'speaking': renderIELTSSpeaking(content); break;
    case 'vocabulary': await renderIELTSVocab(content); break;
    case 'history': renderIELTSHistory(content); break;
  }
}

function renderIELTSDashboard(content) {
  content.innerHTML = `
    <div class="section-title">Quick Actions</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:24px">
      <div class="grammar-ielts-card" onclick="switchIELTSTab('reading');renderIELTSReadingMenu(document.getElementById('ielts-tab-content'))" style="cursor:pointer;padding:20px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-xl)">
        <span style="font-size:28px">📖</span>
        <div style="font-weight:700;font-size:15px;margin-top:8px;color:var(--text0)">Reading Practice</div>
        <div style="font-size:12px;color:var(--text3);margin-top:4px">Academic passages with 40 questions</div>
      </div>
      <div class="grammar-ielts-card" onclick="switchIELTSTab('writing');renderIELTSWritingMenu(document.getElementById('ielts-tab-content'))" style="cursor:pointer;padding:20px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-xl)">
        <span style="font-size:28px">✍️</span>
        <div style="font-weight:700;font-size:15px;margin-top:8px;color:var(--text0)">Writing Tasks</div>
        <div style="font-size:12px;color:var(--text3);margin-top:4px">Task 1 & 2 with 60min timer</div>
      </div>
      <div class="grammar-ielts-card" onclick="switchIELTSTab('speaking');renderIELTSSpeaking(document.getElementById('ielts-tab-content'))" style="cursor:pointer;padding:20px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-xl)">
        <span style="font-size:28px">🎤</span>
        <div style="font-weight:700;font-size:15px;margin-top:8px;color:var(--text0)">Speaking Practice</div>
        <div style="font-size:12px;color:var(--text3);margin-top:4px">Part 1, 2 & 3 with cue cards</div>
      </div>
      <div class="grammar-ielts-card" onclick="switchIELTSTab('vocabulary');renderIELTSVocab(document.getElementById('ielts-tab-content'))" style="cursor:pointer;padding:20px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-xl)">
        <span style="font-size:28px">📚</span>
        <div style="font-weight:700;font-size:15px;margin-top:8px;color:var(--text0)">Academic Vocabulary</div>
        <div style="font-size:12px;color:var(--text3);margin-top:4px">Essential words for Band 7+</div>
      </div>
    </div>
    <div class="section-title">Band Score Guide</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin-bottom:24px">
      ${IELTS_BAND_SCALES.bandDescriptors.map(d => `
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px;text-align:center">
          <div style="font-weight:800;font-size:20px;color:${d.band>=8?'var(--emerald2)':d.band>=7?'var(--accent2)':d.band>=6?'var(--amber2)':'var(--text3)'}">${d.band}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:2px">${d.correct}/40 correct</div>
        </div>
      `).join('')}
    </div>
    ${ieltsState.history.length > 0 ? `
    <div class="section-title">Recent Tests</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${ieltsState.history.slice(-5).reverse().map(r => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);font-size:13px">
          <div>
            <span style="font-weight:600;color:var(--text0);text-transform:capitalize">${r.type}</span>
            <span style="color:var(--text3);margin-left:8px">${new Date(r.date).toLocaleDateString()}</span>
          </div>
          <div style="font-weight:700;color:var(--accent2)">${r.band ? 'Band ' + r.band : r.correct + '/' + r.total + ' correct'}</div>
        </div>
      `).join('')}
    </div>` : ''}
  `;
}

function renderIELTSReadingMenu(content) {
  content.innerHTML = `
    <div class="section-title">IELTS Reading — Academic Passages</div>
    <div style="font-size:14px;color:var(--text2);margin-bottom:16px">Select a passage below. Each passage has 10 questions. Time limit: 20 minutes per passage. Click "Start" to begin.</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">
      ${IELTS_READING.map((p,i) => `
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-xl);padding:20px;cursor:pointer;transition:all var(--transition)" onmouseover="this.style.borderColor='var(--accent2)'" onmouseout="this.style.borderColor=''" onclick="startIELTSReading(${i})">
          <div style="font-size:11px;color:var(--accent2);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Passage ${i+1}</div>
          <div style="font-weight:700;font-size:15px;color:var(--text0);margin-bottom:8px">${p.title}</div>
          <div style="font-size:12px;color:var(--text3);line-height:1.5">${p.passage.substring(0,120)}...</div>
          <div style="margin-top:12px;display:flex;gap:8px">
            <span style="font-size:11px;color:var(--text2)">${p.questions.length} questions</span>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top:12px;width:100%">Start Practice →</button>
        </div>
      `).join('')}
    </div>
  `;
}

let ieltsReadingTimer = null;
let ieltsReadingSeconds = 0;

function startIELTSReading(idx) {
  const p = IELTS_READING[idx];
  ieltsState.reading.passage = idx;
  ieltsState.reading.answers = {};
  ieltsState.reading.score = null;
  ieltsReadingSeconds = 0;
  if (ieltsReadingTimer) clearInterval(ieltsReadingTimer);

  const body = document.getElementById('ielts-body');
  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px">
      <div>
        <button class="btn btn-ghost btn-sm" onclick="renderIELTS()">← Back to IELTS</button>
        <span style="margin-left:12px;font-weight:700;font-size:16px;color:var(--text0)">${p.title}</span>
      </div>
      <div class="ielts-timer" id="ielts-timer-reading">⏱ 20:00</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="ielts-passage">
        <h3>Reading Passage</h3>
        ${p.passage.split('\n').filter(l=>l.trim()).map(l => `<p>${l.trim()}</p>`).join('')}
      </div>
      <div>
        <div style="background:var(--bg3);border-radius:var(--radius-xl);padding:16px;margin-bottom:12px">
          <div style="font-size:12px;color:var(--text2);font-weight:600;margin-bottom:8px">Questions 1-${p.questions.length}</div>
          <div style="font-size:12px;color:var(--text3)">Choose the correct letter A, B, C, or D.</div>
        </div>
        <div style="max-height:500px;overflow-y:auto">
          ${p.questions.map((q, qi) => `
            <div class="ielts-question">
              <div class="ielts-question-text">
                <span class="ielts-question-num">${qi+1}</span>
                <span>${q.q}</span>
              </div>
              <div class="ielts-options">
                ${q.o.map((opt, oi) => `
                  <label class="ielts-option" onclick="selectIELTSAnswer(${idx},${qi},${oi})" id="ielts-opt-${idx}-${qi}-${oi}">
                    <input type="radio" name="ielts-q-${idx}-${qi}" value="${oi}" ${ieltsState.reading.answers[qi] === oi ? 'checked' : ''}>
                    <span>${String.fromCharCode(65+oi)}. ${opt}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="submitIELTSReading(${idx})">
          Submit Answers & Check Score
        </button>
      </div>
    </div>
  `;
  replaceEmojis();

  // Start timer
  ieltsReadingTimer = setInterval(() => {
    ieltsReadingSeconds++;
    const remaining = 1200 - ieltsReadingSeconds;
    if (remaining <= 0) {
      clearInterval(ieltsReadingTimer);
      submitIELTSReading(idx);
      return;
    }
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    const el = document.getElementById('ielts-timer-reading');
    if (el) {
      el.textContent = `⏱ ${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
      el.className = 'ielts-timer' + (remaining < 120 ? ' danger' : remaining < 300 ? ' warning' : '');
    }
  }, 1000);
}

function selectIELTSAnswer(pIdx, qIdx, optIdx) {
  ieltsState.reading.answers[qIdx] = optIdx;
  // Update UI
  document.querySelectorAll(`[id^="ielts-opt-${pIdx}-${qIdx}-"]`).forEach(el => {
    el.classList.remove('selected');
  });
  const selected = document.getElementById(`ielts-opt-${pIdx}-${qIdx}-${optIdx}`);
  if (selected) selected.classList.add('selected');
}

function submitIELTSReading(idx) {
  if (ieltsReadingTimer) { clearInterval(ieltsReadingTimer); ieltsReadingTimer = null; }
  const p = IELTS_READING[idx];
  const answers = ieltsState.reading.answers;
  let correct = 0;
  p.questions.forEach((q, qi) => {
    if (answers[qi] === q.a) correct++;
  });

  const total = p.questions.length;
  const band = calculateIELTSBand(correct, total, 'reading');

  // Show result
  const body = document.getElementById('ielts-body');
  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <button class="btn btn-ghost btn-sm" onclick="renderIELTS()">← Back to IELTS</button>
    </div>
    <div class="ielts-result-banner">
      <div class="big-score" style="color:${band>=7?'var(--emerald2)':band>=6?'var(--amber2)':'var(--rose2)'}">${correct}/${total}</div>
      <div class="score-label">Band ${band} — ${getBandDescription(band)}</div>
      <div class="score-desc">Reading Passage: "${p.title}" completed in ${formatTime(ieltsReadingSeconds)}</div>
    </div>
    <div style="margin-bottom:16px">
      ${p.questions.map((q, qi) => `
        <div class="ielts-question ${answers[qi] === q.a ? 'correct' : 'wrong'}">
          <div class="ielts-question-text">
            <span class="ielts-question-num">${qi+1}</span>
            <span>${q.q}</span>
          </div>
          <div class="ielts-options">
            ${q.o.map((opt, oi) => `
              <div class="ielts-option ${oi === q.a ? 'correct-answer' : (answers[qi] === oi && oi !== q.a ? 'wrong-answer' : '')}">
                <span>${String.fromCharCode(65+oi)}. ${opt} ${oi === q.a ? '✓' : (answers[qi] === oi ? '✗' : '')}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    <button class="btn btn-primary" onclick="switchIELTSTab('reading');renderIELTSReadingMenu(document.getElementById('ielts-tab-content'))">Try Another Passage</button>
  `;

  // Save to history
  ieltsState.history.push({
    date: new Date().toISOString(),
    type: 'reading',
    passage: p.title,
    correct,
    total,
    band,
    time: ieltsReadingSeconds
  });
  saveIELTSHistory();
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function renderIELTSWritingMenu(content) {
  content.innerHTML = `
    <div class="section-title">IELTS Writing — Task 1 & Task 2</div>
    <div style="font-size:14px;color:var(--text2);margin-bottom:16px">Choose a writing task below. Recommended time: 20 mins for Task 1, 40 mins for Task 2.</div>
    <div style="margin-bottom:24px">
      <div class="section-title" style="font-size:15px">Task 1 — Report (20 minutes)</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">
        ${IELTS_WRITING_TASKS.task1.map((t, i) => `
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-xl);padding:20px;cursor:pointer;transition:all var(--transition)" onclick="startIELTSWriting('task1',${i})">
            <div style="font-size:11px;color:var(--emerald2);font-weight:700;text-transform:uppercase">${t.type}</div>
            <div style="font-size:13px;color:var(--text1);margin-top:8px;line-height:1.5">${t.prompt.substring(0,90)}...</div>
            <button class="btn btn-primary btn-sm" style="margin-top:10px;width:100%">Start Writing →</button>
          </div>
        `).join('')}
      </div>
    </div>
    <div>
      <div class="section-title" style="font-size:15px">Task 2 — Essay (40 minutes)</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">
        ${IELTS_WRITING_TASKS.task2.map((t, i) => `
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-xl);padding:20px;cursor:pointer;transition:all var(--transition)" onclick="startIELTSWriting('task2',${i})">
            <div style="font-size:11px;color:var(--accent2);font-weight:700;text-transform:uppercase">${t.type} · ${t.topic}</div>
            <div style="font-size:13px;color:var(--text1);margin-top:8px;line-height:1.5">${t.prompt.substring(0,90)}...</div>
            <button class="btn btn-primary btn-sm" style="margin-top:10px;width:100%">Start Writing →</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

let ieltsWritingTimer = null;
let ieltsWritingSeconds = 0;

function startIELTSWriting(tier, idx) {
  const tasks = tier === 'task1' ? IELTS_WRITING_TASKS.task1 : IELTS_WRITING_TASKS.task2;
  const t = tasks[idx];
  ieltsWritingSeconds = 0;
  if (ieltsWritingTimer) clearInterval(ieltsWritingTimer);

  const timeLimit = tier === 'task1' ? 1200 : 2400; // 20 min or 40 min
  const label = tier === 'task1' ? 'Task 1 — Report' : 'Task 2 — Essay';

  const body = document.getElementById('ielts-body');
  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px">
      <div>
        <button class="btn btn-ghost btn-sm" onclick="renderIELTS()">← Back</button>
        <span style="margin-left:12px;font-weight:700;font-size:16px;color:var(--text0)">${label}</span>
      </div>
      <div class="ielts-timer" id="ielts-timer-writing">⏱ ${formatTime(timeLimit)}</div>
    </div>
    <div class="ielts-writing-prompt">
      <h4>${tier === 'task2' ? t.topic + ' — ' : ''}${t.type}</h4>
      <p>${t.prompt}</p>
      ${t.data ? `<div style="margin-top:12px;padding:12px;background:var(--bg3);border-radius:var(--radius-lg);font-size:13px;font-family:var(--font-mono);color:var(--text2)">📊 ${t.data}</div>` : ''}
    </div>
    <textarea class="ielts-textarea" id="ielts-writing-answer" placeholder="Write your ${tier === 'task1' ? 'report' : 'essay'} here... Minimum 150 words for Task 1, 250 words for Task 2.">${ieltsState.writing[tier].answer || ''}</textarea>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
      <div>
        <span id="ielts-word-count" style="font-size:13px;color:var(--text2)">Words: 0</span>
        <span style="margin-left:16px;font-size:12px;color:var(--text3)">Min: ${tier === 'task1' ? 150 : 250}</span>
        <span style="margin-left:16px;font-size:12px;color:var(--text3)" id="ielts-char-count">Chars: 0</span>
      </div>
      <button class="btn btn-primary" onclick="submitIELTSWriting('${tier}',${idx})">Submit Writing</button>
    </div>
  `;

  // Word counter
  const ta = document.getElementById('ielts-writing-answer');
  if (ta) {
    ta.oninput = function() {
      const words = this.value.trim() ? this.value.trim().split(/\s+/).length : 0;
      document.getElementById('ielts-word-count').textContent = `Words: ${words}`;
      document.getElementById('ielts-char-count').textContent = `Chars: ${this.value.length}`;
    };
  }

  // Timer
  ieltsWritingTimer = setInterval(() => {
    ieltsWritingSeconds++;
    const remaining = timeLimit - ieltsWritingSeconds;
    if (remaining <= 0) {
      clearInterval(ieltsWritingTimer);
      submitIELTSWriting(tier, idx);
      return;
    }
    const el = document.getElementById('ielts-timer-writing');
    if (el) {
      el.textContent = `⏱ ${formatTime(remaining)}`;
      el.className = 'ielts-timer' + (remaining < 300 ? ' danger' : remaining < 600 ? ' warning' : '');
    }
  }, 1000);
}

function submitIELTSWriting(tier, idx) {
  if (ieltsWritingTimer) { clearInterval(ieltsWritingTimer); ieltsWritingTimer = null; }
  const answer = document.getElementById('ielts-writing-answer')?.value || '';
  ieltsState.writing[tier].answer = answer;
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  // Save to history
  ieltsState.history.push({
    date: new Date().toISOString(),
    type: 'writing',
    tier,
    wordCount,
    time: ieltsWritingSeconds
  });
  saveIELTSHistory();

  const body = document.getElementById('ielts-body');
  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <button class="btn btn-ghost btn-sm" onclick="renderIELTS()">← Back to IELTS</button>
    </div>
    <div class="ielts-result-banner">
      <div style="font-size:48px;font-weight:800">📝</div>
      <div class="score-label" style="font-size:20px;margin-top:8px">Writing ${tier === 'task1' ? 'Task 1' : 'Task 2'} Submitted!</div>
      <div class="score-desc">
        Word count: ${wordCount} | Time: ${formatTime(ieltsWritingSeconds)} |
        ${wordCount >= (tier === 'task1' ? 150 : 250) ? '✅ Meets minimum' : '⚠️ Below minimum word count'}
      </div>
    </div>
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-xl);padding:24px;margin-bottom:16px">
      <div style="font-weight:700;font-size:14px;color:var(--text0);margin-bottom:8px">Your Response:</div>
      <div style="font-size:14px;color:var(--text1);line-height:1.6;white-space:pre-wrap">${answer || '(No response written)'}</div>
    </div>
    <div style="background:var(--bg2);border:1px solid var(--border2);border-radius:var(--radius-xl);padding:24px;margin-bottom:16px">
      <div style="font-weight:700;font-size:14px;color:var(--accent2);margin-bottom:8px">Self-Check Checklist</div>
      <div style="font-size:13px;color:var(--text1);line-height:2">
        ✅ Did you address all parts of the question?<br>
        ✅ Did you structure your response with clear paragraphs?<br>
        ✅ Did you use a range of vocabulary and grammar structures?<br>
        ✅ Did you check for spelling and grammar errors?<br>
        ✅ ${tier === 'task1' ? 'Did you report all key data points and make comparisons?' : 'Did you present a clear position throughout?'}
      </div>
    </div>
    <button class="btn btn-primary" onclick="switchIELTSTab('writing');renderIELTSWritingMenu(document.getElementById('ielts-tab-content'))">Try Another Task</button>
  `;
}

function renderIELTSSpeaking(content) {
  content.innerHTML = `
    <div class="section-title">IELTS Speaking Practice</div>
    <div style="font-size:14px;color:var(--text2);margin-bottom:16px">The IELTS Speaking test has 3 parts. Practice with the prompts below. Read the question, think about your answer, and use the hints to structure a 1-2 minute response.</div>
    
    <div style="margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <span style="font-size:24px">🗣️</span>
        <div><span style="font-weight:700;color:var(--emerald2)">Part 1 — Introduction & Interview</span> (4-5 mins)</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${IELTS_SPEAKING.part1.map((p, i) => `
          <div class="ielts-speaking-card" onclick="showSpeakingHint(this)">
            <div class="ielts-speaking-part">Part 1 · Question ${i+1}</div>
            <div class="ielts-speaking-q">${p.q}</div>
            <div class="ielts-hint" style="display:none">💡 ${p.hints.join(' · ')}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <span style="font-size:24px">🎤</span>
        <div><span style="font-weight:700;color:var(--accent2)">Part 2 — Long Turn</span> (3-4 mins, 1 min preparation)</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">
        ${IELTS_SPEAKING.part2.map((p, i) => `
          <div style="background:var(--bg2);border:1px solid var(--border2);border-radius:var(--radius-xl);padding:20px" onclick="showSpeakingHint(this)">
            <div style="font-size:11px;color:var(--accent2);font-weight:700;text-transform:uppercase">Cue Card ${i+1}</div>
            <div style="font-weight:600;font-size:15px;color:var(--text0);margin-top:6px">${p.cue}</div>
            <div style="margin-top:10px;font-size:13px;color:var(--text2)">
              ${p.points.map(pt => `• ${pt}<br>`).join('')}
            </div>
            <div class="ielts-hint" style="display:none;margin-top:8px;padding:12px;background:var(--bg3);border-radius:var(--radius-md)">🔍 ${p.followUp}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <span style="font-size:24px">💬</span>
        <div><span style="font-weight:700;color:var(--amber2)">Part 3 — Discussion</span> (4-5 mins, abstract ideas)</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${IELTS_SPEAKING.part3.map((p, i) => `
          <div class="ielts-speaking-card" onclick="showSpeakingHint(this)">
            <div class="ielts-speaking-part">Part 3 · Topic ${i+1}</div>
            <div class="ielts-speaking-q">${p.q}</div>
            <div class="ielts-hint" style="display:none">💡 Follow-up: ${p.followUp.join(' · ')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function showSpeakingHint(el) {
  const hint = el.querySelector('.ielts-hint');
  if (hint) hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}

async function renderIELTSVocab(content) {
  content.innerHTML = `
    <div class="section-title">IELTS Academic Word List</div>
    <div style="font-size:14px;color:var(--text2);margin-bottom:16px">Loading academic vocabulary from API...</div>
    <div style="padding:20px;text-align:center">
      <div class="skeleton" style="height:16px;width:200px;margin:0 auto 10px"></div>
      <div class="skeleton" style="height:16px;width:160px;margin:0 auto"></div>
    </div>`;
  const words = await fetchIELTSVocabWords();
  content.innerHTML = `
    <div class="section-title">IELTS Academic Word List</div>
    <div style="font-size:14px;color:var(--text2);margin-bottom:16px">Essential academic vocabulary for achieving Band 7+. Click any word to save it to your vocabulary list.</div>
    <div class="ielts-vocab-grid">
      ${words.map(w => `
        <div class="ielts-vocab-card" onclick="saveIELTSWord('${w.word.replace(/'/g,"\\'")}','${w.def.replace(/'/g,"\\'")}')" style="cursor:pointer">
          <div class="ielts-vocab-word">${w.word}</div>
          <div class="ielts-vocab-type">${w.type}</div>
          <div class="ielts-vocab-def">${w.def}</div>
          <div style="font-size:11px;color:var(--emerald2);margin-top:6px;font-style:italic">${w.collocation}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function saveIELTSWord(word, def) {
  if (!state.favorites) state.favorites = [];
  if (!state.favorites.find(f => (f.word || f).toLowerCase() === word.toLowerCase())) {
    const entry = { word, definition: def, partOfSpeech: 'academic', phonetic: '' };
    state.favorites.unshift(entry);
    state.stats.totalWordsSaved = (state.stats.totalWordsSaved || 0) + 1;
    saveState();
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--emerald2);color:white;padding:10px 20px;border-radius:12px;font-size:13px;font-weight:600;z-index:9999;animation:fadeIn 0.3s ease';
    toast.textContent = `✓ "${word}" saved to Favorites!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }
}

function renderIELTSHistory(content) {
  if (ieltsState.history.length === 0) {
    content.innerHTML = `<div class="ielts-empty"><div class="ielts-empty-icon">📋</div><div class="ielts-empty-title">No Test History</div><div style="color:var(--text3);font-size:14px">Complete an IELTS practice test to see your results here.</div></div>`;
    return;
  }

  const readingTests = ieltsState.history.filter(r => r.type === 'reading');
  const writingTests = ieltsState.history.filter(r => r.type === 'writing');
  const avgBand = readingTests.length > 0 ? (readingTests.reduce((a,r) => a+r.band,0)/readingTests.length).toFixed(1) : '-';
  const totalCorrect = readingTests.length > 0 ? readingTests.reduce((a,r) => a+r.correct,0) : 0;
  const totalQ = readingTests.length > 0 ? readingTests.reduce((a,r) => a+r.total,0) : 0;

  content.innerHTML = `
    <div class="section-title">Test History</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
      <div class="ielts-score-card">
        <div class="ielts-score-val">${readingTests.length}</div>
        <div class="ielts-score-label">Reading Tests</div>
      </div>
      <div class="ielts-score-card">
        <div class="ielts-score-val">${avgBand}</div>
        <div class="ielts-score-label">Avg Reading Band</div>
      </div>
      <div class="ielts-score-card">
        <div class="ielts-score-val">${totalQ > 0 ? Math.round(totalCorrect/totalQ*100) + '%' : '-'}</div>
        <div class="ielts-score-label">Overall Accuracy</div>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:8px">
      ${ieltsState.history.slice().reverse().map((r, i) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);font-size:13px">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="font-size:20px">${r.type === 'reading' ? '📖' : r.type === 'writing' ? '✍️' : '🎤'}</span>
            <div>
              <div style="font-weight:600;color:var(--text0);text-transform:capitalize">${r.type}${r.passage ? ' — ' + r.passage : ''}${r.tier ? ' — ' + r.tier : ''}</div>
              <div style="font-size:11px;color:var(--text3);margin-top:2px">${new Date(r.date).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
            </div>
          </div>
          <div style="text-align:right">
            ${r.band ? `<div style="font-weight:800;font-size:18px;color:${r.band >= 7 ? 'var(--emerald2)' : r.band >= 6 ? 'var(--amber2)' : 'var(--text3)'}">Band ${r.band}</div>` : ''}
            ${r.correct !== undefined ? `<div style="font-size:11px;color:var(--text2)">${r.correct}/${r.total} correct</div>` : ''}
            ${r.wordCount ? `<div style="font-size:11px;color:var(--text2)">${r.wordCount} words · ${formatTime(r.time || 0)}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    <button class="btn btn-ghost btn-sm" style="margin-top:16px;color:var(--rose2)" onclick="clearIELTSHistory()">Clear All History</button>
  `;
}

function clearIELTSHistory() {
  if (confirm('Delete all IELTS test history?')) {
    ieltsState.history = [];
    saveIELTSHistory();
    renderIELTS();
  }
}

function renderGrammarIELTS() {
  const groups = [...new Set(IELTS_STRUCTURES.map(s=>s.group))];
  document.getElementById('grammar-tab-content').innerHTML = `
    <div class="section-title">🏛️ IELTS Beautiful Structures</div>
    <div style="font-size:14px;color:var(--text2);margin-bottom:24px">Master high-band English structures used by Band 7-9 students. Click any structure for detailed explanation.</div>
    ${groups.map(group=>`
      <div class="section-title" style="font-size:15px;color:var(--accent2);margin-top:24px">${group}</div>
      ${IELTS_STRUCTURES.filter(s=>s.group===group).map(s=>`
        <div class="grammar-ielts-card" onclick="toggleIELTSDetail('${s.id}')">
          <div class="grammar-ielts-structure">${s.structure}</div>
          <div class="grammar-ielts-meaning">${s.meaning}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
            <span class="badge badge-accent">IELTS ${s.band}</span>
            <span class="badge badge-amber">${s.formality}</span>
          </div>
          <div class="grammar-ielts-example">Speaking: "${s.speaking}"</div>
          <div id="ielts-detail-${s.id}" style="display:none;margin-top:12px;border-top:1px solid var(--border);padding-top:12px">
            <div style="font-size:14px;color:var(--text1);margin-bottom:8px"><strong>Writing:</strong> "${s.writing}"</div>
            <div style="font-size:14px;color:var(--text1);margin-bottom:8px"><strong>Advanced:</strong> "${s.advanced}"</div>
            <div style="font-size:13px;color:var(--rose2);margin-top:8px;padding:8px 12px;background:rgba(244,63,94,0.08);border-radius:8px;border:1px solid rgba(244,63,94,0.2)"><strong>⚠️ Common Mistake:</strong> ${s.mistake}</div>
          </div>
        </div>
      `).join('')}
    `).join('')}`;
}

function toggleIELTSDetail(id) {
  const el = document.getElementById('ielts-detail-'+id);
  if(el) el.style.display = el.style.display==='none'?'block':'none';
}

// =============================================
// GRAMMAR — QUIZ
// =============================================
let grammarQuizState = null;

function renderGrammarQuizMenu() {
  document.getElementById('grammar-tab-content').innerHTML = `
    <div class="section-title">🧪 Grammar Quiz</div>
    <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:32px">
      <div class="card" style="flex:1;min-width:200px;text-align:center;cursor:pointer" onclick="startGrammarQuiz('mixed')">
        <div style="font-size:36px;margin-bottom:12px">🎲</div>
        <div style="font-family:var(--font-display);font-size:17px;font-weight:700;margin-bottom:6px">Mixed Tenses</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:16px">10 questions • All tenses</div>
        <button class="btn btn-primary">Start Quiz</button>
      </div>
      <div class="card" style="flex:1;min-width:200px;text-align:center;cursor:pointer" onclick="startGrammarQuiz('present')">
        <div style="font-size:36px;margin-bottom:12px">🌅</div>
        <div style="font-family:var(--font-display);font-size:17px;font-weight:700;margin-bottom:6px">Present Tenses</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:16px">Present Simple • Continuous • Perfect</div>
        <button class="btn btn-outline">Start Quiz</button>
      </div>
      <div class="card" style="flex:1;min-width:200px;text-align:center;cursor:pointer" onclick="startGrammarQuiz('past')">
        <div style="font-size:36px;margin-bottom:12px">📜</div>
        <div style="font-family:var(--font-display);font-size:17px;font-weight:700;margin-bottom:6px">Past Tenses</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:16px">Past Simple • Continuous • Perfect</div>
        <button class="btn btn-outline">Start Quiz</button>
      </div>
      <div class="card" style="flex:1;min-width:200px;text-align:center;cursor:pointer" onclick="startGrammarQuiz('future')">
        <div style="font-size:36px;margin-bottom:12px">🔮</div>
        <div style="font-family:var(--font-display);font-size:17px;font-weight:700;margin-bottom:6px">Future Tenses</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:16px">Future Simple • Continuous • Perfect</div>
        <button class="btn btn-outline">Start Quiz</button>
      </div>
      <div class="card" style="flex:1;min-width:200px;text-align:center;cursor:pointer" onclick="startGrammarQuiz('ielts')">
        <div style="font-size:36px;margin-bottom:12px">🏛️</div>
        <div style="font-family:var(--font-display);font-size:17px;font-weight:700;margin-bottom:6px">IELTS Grammar</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:16px">Advanced structures</div>
        <button class="btn btn-outline">Start Quiz</button>
      </div>
    </div>
    ${state.grammar.totalQuizzes>0 ? `<div class="card" style="text-align:center">
      <div style="font-size:14px;color:var(--text2)">Quizzes completed: <strong style="color:var(--accent2)">${state.grammar.totalQuizzes}</strong> | Accuracy: <strong style="color:var(--emerald2)">${state.grammar.totalQuestions ? Math.round(state.grammar.totalCorrect/state.grammar.totalQuestions*100) : 0}%</strong></div>
    </div>` : ''}`;
}

function startGrammarTenseQuiz(tenseId) {
  const t = GRAMMAR_TENSES.find(t=>t.id===tenseId);
  if(!t) return;
  const questions = [];
  [...t.positive,...t.negative,...t.question].forEach(ex=>{
    const blanked = ex.replace(/\b\w+\b/g, m=>Math.random()>0.4?m:'________');
    if(blanked!==ex) questions.push({q:blanked,a:ex,d:t.name});
  });
  // Add fill-in-the-blank from formula
  const formulaWords = t.formula.split(' ');
  const qWords = [...formulaWords];
  const blankIdx = Math.floor(Math.random()*qWords.length);
  const answer = qWords[blankIdx];
  qWords[blankIdx] = '________';
  questions.push({q:`${t.name}: ${qWords.join(' ')}`,a:answer,d:t.name});

  grammarQuizState = { questions:questions.sort(()=>Math.random()-0.5).slice(0,10), current:0, score:0, total:Math.min(10,questions.length), mode:'tense' };
  renderGrammarQuizQuestion();
}

function startGrammarQuiz(mode) {
  let questions = [];
  const tenses = mode==='present' ? GRAMMAR_TENSES.filter(t=>t.group==='Present Tenses') :
                  mode==='past' ? GRAMMAR_TENSES.filter(t=>t.group==='Past Tenses') :
                  mode==='future' ? GRAMMAR_TENSES.filter(t=>t.group==='Future Tenses') :
                  mode==='ielts' ? [] : GRAMMAR_TENSES;

  if(mode==='ielts') {
    IELTS_STRUCTURES.forEach(s=>{
      if(Math.random()>0.4) return;
      const words = s.structure.split(' ');
      const idx = Math.floor(Math.random()*words.length);
      const a = words[idx]; words[idx]='________';
      questions.push({q:`${s.group}: ${words.join(' ')}`,a:a,d:s.band+' | IELTS'});
    });
  } else {
    tenses.forEach(t=>{
      const allEx = [...t.positive,...t.negative,...t.question];
      const ex = allEx[Math.floor(Math.random()*allEx.length)];
      if(!ex) return;
      const words = ex.split(' ');
      const idx = Math.floor(Math.random()*words.length);
      const a = words[idx].replace(/[^a-zA-Z'-]/g,'');
      if(!a||a.length<2) return;
      words[idx]='________';
      questions.push({q:ex.replace(a,'________'),a:a,d:t.name});
    });
  }

  if(questions.length<5) {
    // Add formula questions
    tenses.forEach(t=>{
      const f = t.formula;
      const words = f.split(' ');
      const idx = Math.floor(Math.random()*words.length);
      const a = words[idx].replace(/[^a-zA-Z'-]/g,'');
      if(a&&a.length>1) questions.push({q:`${t.name}: Fill the formula — ${f.replace(a,'________')}`,a:a,d:t.name});
    });
  }

  grammarQuizState = { questions:questions.sort(()=>Math.random()-0.5).slice(0,10), current:0, score:0, total:Math.min(10,questions.length), mode };
  renderGrammarQuizQuestion();
}

function renderGrammarQuizQuestion() {
  const gqs = grammarQuizState;
  if(!gqs || gqs.current>=gqs.questions.length) { showGrammarQuizResult(); return; }
  const q = gqs.questions[gqs.current];
  const pct = (gqs.current/gqs.total)*100;
  const tab = document.getElementById('grammar-tab-content');
  tab.innerHTML = `
    <div class="grammar-quiz-container">
      <div class="grammar-q-progress"><div class="grammar-q-fill" style="width:${pct}%"></div></div>
      <div class="grammar-q-info">
        <div class="grammar-q-num">Question ${gqs.current+1} of ${gqs.total}</div>
        <div class="grammar-q-score">Score: ${gqs.score}</div>
      </div>
      ${q.d ? `<div style="display:flex;gap:8px;margin-bottom:16px"><span class="badge badge-accent">${q.d}</span></div>` : ''}
      <div class="grammar-q-word" style="font-size:18px;font-weight:500;line-height:1.6">${q.q}</div>
      <div class="grammar-q-options" id="grammar-q-options">
        ${generateGrammarQuizOptions(q)}
      </div>
      <div class="grammar-q-feedback" id="grammar-q-feedback"></div>
    </div>
  `;
}

function generateGrammarQuizOptions(q) {
  // Generate plausible wrong answers based on context
  const allWords = [];
  GRAMMAR_TENSES.forEach(t=>{
    [...t.positive,...t.negative,...t.question].forEach(ex=>{
      ex.split(' ').forEach(w=>{const c=w.replace(/[^a-zA-Z'-]/g,''); if(c.length>1) allWords.push(c);});
    });
  });
  const wrongs = allWords.filter(w=>w.toLowerCase()!==q.a.toLowerCase()).sort(()=>Math.random()-0.5).slice(0,3);
  const opts = [q.a,...wrongs].sort(()=>Math.random()-0.5);
  return opts.map(o=>`<div class="grammar-q-opt" onclick="answerGrammarQuiz(this,'${o.replace(/'/g,"\\'")}','${q.a.replace(/'/g,"\\'")}')">${o}</div>`).join('');
}

function answerGrammarQuiz(el, answer, correct) {
  document.querySelectorAll('.grammar-q-opt').forEach(e=>e.classList.add('locked'));
  const isCorrect = answer===correct;
  if(isCorrect) { el.classList.add('correct'); grammarQuizState.score++; }
  else { el.classList.add('wrong'); document.querySelectorAll('.grammar-q-opt').forEach(e=>{if(e.textContent===correct)e.classList.add('correct');}); }
  const fb = document.getElementById('grammar-q-feedback');
  if(fb) {
    fb.className = `grammar-q-feedback show ${isCorrect?'correct':'wrong'}`;
    fb.textContent = isCorrect ? '✅ Correct!' : `❌ Wrong. The answer was: "${correct}"`;
  }
  setTimeout(()=>{grammarQuizState.current++;renderGrammarQuizQuestion();},1000);
}

function showGrammarQuizResult() {
  const gqs = grammarQuizState;
  const pct = gqs.total ? Math.round(gqs.score/gqs.total*100) : 0;
  const g = state.grammar;
  g.totalQuizzes++;
  g.totalCorrect += gqs.score;
  g.totalQuestions += gqs.total;
  addGrammarXP(gqs.score*3, `Quiz: ${gqs.score}/${gqs.total} correct`);
  checkGrammarAchievements();
  if(pct===100) confetti();
  const tab = document.getElementById('grammar-tab-content');
  tab.innerHTML = `
    <div style="text-align:center;padding:40px 20px">
      <div style="font-size:64px;margin-bottom:16px">${pct>=90?'🏆':pct>=70?'🎉':pct>=50?'👍':'💪'}</div>
      <div style="font-family:var(--font-display);font-size:32px;font-weight:800;background:linear-gradient(135deg,#7c6fff,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px">Quiz Complete!</div>
      <div style="font-size:18px;color:var(--accent2);margin-bottom:8px">${gqs.score} / ${gqs.total} correct (${pct}%)</div>
      <div style="font-size:14px;color:var(--text2);margin-bottom:24px">+${gqs.score*3} Grammar XP earned</div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="startGrammarQuiz('${gqs.mode}')">Try Again</button>
        <button class="btn btn-ghost" onclick="switchGrammarTab('quiz')">Back to Quiz Menu</button>
      </div>
    </div>`;
  grammarQuizState = null;
}

// =============================================
// GRAMMAR — DAILY CHALLENGE
// =============================================
function startGrammarDailyChallenge() {
  const today = new Date().toDateString();
  const t = GRAMMAR_TENSES[Math.floor(Math.random()*GRAMMAR_TENSES.length)];
  const questions = [...t.positive,...t.negative,...t.question].slice(0,5);
  state.grammar.dailyChallenge = { date:today, tense:t.id, questions, current:0, score:0 };
  saveGrammar();
  renderGrammarDailyChallenge();
}

function renderGrammarDailyChallenge() {
  const dc = state.grammar.dailyChallenge;
  if(!dc || dc.current>=dc.questions.length) { showGrammarChallengeResult(); return; }
  const q = dc.questions[dc.current];
  const words = q.split(' ');
  const idx = Math.floor(Math.random()*words.length);
  const a = words[idx].replace(/[^a-zA-Z'-]/g,'');
  if(!a) { dc.current++; renderGrammarDailyChallenge(); return; }
  words[idx] = '________';
  const display = words.join(' ');
  const wrongs = GRAMMAR_TENSES.flatMap(t=>[...t.positive,...t.negative,...t.question]).flatMap(ex=>ex.split(' ')).map(w=>w.replace(/[^a-zA-Z'-]/g,'')).filter(w=>w.length>1&&w!==a).sort(()=>Math.random()-0.5).slice(0,3);
  const opts = [a,...wrongs].sort(()=>Math.random()-0.5);
  document.getElementById('grammar-tab-content').innerHTML = `
    <div class="section-title">🎯 Daily Challenge</div>
    <div style="max-width:600px;margin:0 auto">
      <div class="grammar-q-progress"><div class="grammar-q-fill" style="width:${(dc.current/dc.questions.length)*100}%"></div></div>
      <div class="grammar-q-info"><div class="grammar-q-num">Challenge ${dc.current+1} of ${dc.questions.length}</div><div class="grammar-q-score">Score: ${dc.score}</div></div>
      <div style="font-family:var(--font-display);font-size:20px;font-weight:600;margin-bottom:20px;line-height:1.6;text-align:center">${display}</div>
      <div class="grammar-q-options">${opts.map(o=>`<div class="grammar-q-opt" onclick="answerDailyChallenge(this,'${o}','${a}')">${o}</div>`).join('')}</div>
    </div>`;
}

function answerDailyChallenge(el, answer, correct) {
  document.querySelectorAll('.grammar-q-opt').forEach(e=>e.classList.add('locked'));
  const dc = state.grammar.dailyChallenge;
  if(answer===correct) { el.classList.add('correct'); dc.score++; addGrammarXP(5,'Daily challenge'); }
  else { el.classList.add('wrong'); document.querySelectorAll('.grammar-q-opt').forEach(e=>{if(e.textContent===correct)e.classList.add('correct');}); }
  dc.current++;
  setTimeout(()=>renderGrammarDailyChallenge(),800);
}

function showGrammarChallengeResult() {
  const dc = state.grammar.dailyChallenge;
  const pct = dc.questions.length ? Math.round(dc.score/dc.questions.length*100) : 0;
  addGrammarXP(10,'Daily challenge bonus');
  if(pct===100) confetti();
  document.getElementById('grammar-tab-content').innerHTML = `
    <div style="text-align:center;padding:40px">
      <div style="font-size:64px;margin-bottom:16px">${pct>=80?'🏆':'🎉'}</div>
      <div style="font-family:var(--font-display);font-size:28px;font-weight:800;margin-bottom:8px">Daily Challenge Complete!</div>
      <div style="font-size:18px;color:var(--accent2);margin-bottom:24px">${dc.score}/${dc.questions.length} correct</div>
      <button class="btn btn-primary" onclick="switchGrammarTab('dashboard')">Back to General</button>
    </div>`;
  checkGrammarAchievements();
}

// =============================================
// GRAMMAR — ANALYTICS
// =============================================
function renderGrammarAnalytics() {
  const g = state.grammar;
  const completedTenses = GRAMMAR_TENSES.filter(t=>g.completedLessons.includes(t.id)).length;
  const totalTenses = GRAMMAR_TENSES.length;
  const accuracy = g.totalQuestions ? Math.round(g.totalCorrect/g.totalQuestions*100) : 0;
  const rank = getGrammarRank(g.xp);

  // Find strongest & weakest topics
  const topicStats = GRAMMAR_CATEGORIES.map(c=>({...c,count:g.completedLessons.filter(l=>l.startsWith(c.id)).length}));
  topicStats.sort((a,b)=>b.count-a.count);
  const strongest = topicStats[0]?.name || 'N/A';
  const weakest = topicStats[topicStats.length-1]?.name || 'N/A';

  // Generate weekly data
  const weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = new Date().getDay();
  const weeklyVals = weekDays.map((_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-((today+6-i)%7));
    return g.heatmap[d.toISOString().split('T')[0]] || 0;
  });
  const maxVal = Math.max(...weeklyVals,1);

  document.getElementById('grammar-tab-content').innerHTML = `
    <div class="section-title">📈 Grammar Analytics</div>
    <div class="grammar-analytics-grid">
      <div class="card" style="text-align:center">
        <div style="font-size:12px;color:var(--text2);margin-bottom:8px;letter-spacing:0.06em">OVERALL MASTERY</div>
        <div class="grammar-progress-ring">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <circle class="ring-bg" cx="40" cy="40" r="34"/>
            <circle class="ring-fill" cx="40" cy="40" r="34" stroke-dasharray="213.6" stroke-dashoffset="${213.6-(213.6*completedTenses/totalTenses)}"/>
          </svg>
          <div class="ring-text" style="color:var(--accent2)">${Math.round(completedTenses/totalTenses*100)}%</div>
        </div>
        <div style="font-size:13px;color:var(--text1)">${completedTenses}/${totalTenses} tenses mastered</div>
      </div>
      <div class="card">
        <div class="section-title" style="font-size:14px;margin-bottom:12px">📊 Key Metrics</div>
        <div style="display:grid;gap:12px">
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)"><span style="color:var(--text2)">Total XP</span><span style="font-weight:600;color:var(--accent2)">${g.xp}</span></div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)"><span style="color:var(--text2)">Rank</span><span style="font-weight:600;color:var(--amber2)">${rank.icon} ${rank.name}</span></div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)"><span style="color:var(--text2)">Accuracy</span><span style="font-weight:600;color:var(--emerald2)">${accuracy}%</span></div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)"><span style="color:var(--text2)">Quizzes</span><span style="font-weight:600;color:var(--cyan2)">${g.totalQuizzes}</span></div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)"><span style="color:var(--text2)">Streak</span><span style="font-weight:600;color:var(--amber2)">🔥 ${g.streak} days</span></div>
          <div style="display:flex;justify-content:space-between;padding:8px 0"><span style="color:var(--text2)">Lessons</span><span style="font-weight:600;color:var(--emerald2)">${g.totalLessons}</span></div>
        </div>
      </div>
    </div>

    <div class="grid-2" style="margin-bottom:32px">
      <div class="card">
        <div class="section-title">💪 Strongest Topics</div>
        <div style="color:var(--emerald2);font-size:15px;font-weight:600">${strongest}</div>
      </div>
      <div class="card">
        <div class="section-title">📚 Needs Improvement</div>
        <div style="color:var(--amber2);font-size:15px;font-weight:600">${weakest}</div>
      </div>
    </div>

    <div class="card" style="margin-bottom:32px">
      <div class="section-title">📅 Weekly Grammar Activity</div>
      <div class="chart-bar-wrap">
        ${weekDays.map((d,i)=>`
          <div class="chart-bar-row">
            <div class="chart-bar-label">${d}</div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${(weeklyVals[i]/maxVal*100).toFixed(0)}%"></div></div>
            <div class="chart-bar-val">${weeklyVals[i]}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="section-title">🏆 Grammar Achievements <span style="font-size:12px;font-weight:400;color:var(--text3)">${g.achievements.length}/${GRAMMAR_ACHIEVEMENTS.length}</span></div>
      <div class="grammar-ach-grid">
        ${GRAMMAR_ACHIEVEMENTS.slice(0,8).map(a=>{
          const unlocked = g.achievements.includes(a.id);
          const p = a.progress(g);
          return `<div class="grammar-ach-card ${unlocked?'unlocked':''}" data-rarity="${a.rarity}">
            <div class="grammar-ach-rarity" style="background:${GRAMMAR_RARITY[a.rarity]}">${a.rarity}</div>
            <div class="grammar-ach-icon">${a.icon}</div>
            <div class="grammar-ach-name">${a.name}</div>
            <div class="grammar-ach-desc">${a.desc}</div>
            ${unlocked
              ? '<div style="font-size:9px;color:var(--emerald2);margin-top:4px">✅ Unlocked</div>'
              : `<div class="grammar-ach-progress-wrap"><div class="grammar-ach-progress-bar" style="width:${Math.min(p,100)}%"></div></div>
                 <div style="font-size:9px;color:var(--text3);margin-top:2px">${Math.round(Math.min(p,100))}%</div>`
            }
          </div>`;
        }).join('')}
      </div>
      <div style="text-align:center;margin-top:16px">
        <button class="btn btn-ghost btn-sm" onclick="switchGrammarTab('achievements')">View All Achievements →</button>
      </div>
    </div>
  `;
}

// =============================================
// GRAMMAR — ACHIEVEMENTS
// =============================================
let grammarAchFilter = 'all';
let grammarAchSearch = '';

function renderGrammarAchievements() {
  const g = state.grammar;
  const unlocked = new Set(g.achievements);
  const categories = [
    { id:'all', label:'All', icon:'📋' },
    { id:'lesson', label:'Lessons', icon:'📚' },
    { id:'quiz', label:'Quiz', icon:'🎯' },
    { id:'tense', label:'Tenses', icon:'⏰' },
    { id:'category', label:'Topics', icon:'📌' },
    { id:'streak', label:'Streak', icon:'🔥' },
    { id:'rank', label:'Rank', icon:'🥇' },
    { id:'xp', label:'XP', icon:'💫' }
  ];
  const filtered = GRAMMAR_ACHIEVEMENTS.filter(a =>
    (grammarAchFilter === 'all' || a.category === grammarAchFilter) &&
    (grammarAchSearch === '' || a.name.toLowerCase().includes(grammarAchSearch) || a.desc.toLowerCase().includes(grammarAchSearch))
  );
  const totalUnlocked = unlocked.size;
  const totalAll = GRAMMAR_ACHIEVEMENTS.length;
  const pct = Math.round(totalUnlocked/totalAll*100);
  const rarities = ['common','uncommon','rare','epic','legendary'];
  const byRarity = rarities.map(r => {
    const total = GRAMMAR_ACHIEVEMENTS.filter(a => a.rarity === r).length;
    const done = GRAMMAR_ACHIEVEMENTS.filter(a => a.rarity === r && unlocked.has(a.id)).length;
    return { rarity: r, total, done, label: r.charAt(0).toUpperCase() + r.slice(1) };
  });

  document.getElementById('grammar-tab-content').innerHTML = `
    <div class="section-title">🏆 Grammar Achievements</div>

    <div style="display:flex;flex-wrap:wrap;gap:16px;margin-bottom:24px;align-items:center">
      <div style="flex:1;min-width:140px">
        <div style="font-size:28px;font-weight:700;color:var(--text1)">${totalUnlocked}<span style="font-size:16px;color:var(--text3);font-weight:400"> / ${totalAll}</span></div>
        <div style="font-size:13px;color:var(--text2)">Achievements Unlocked</div>
      </div>
      <div style="flex:2;min-width:200px">
        <div class="progress-bar-bg" style="height:8px;border-radius:4px;max-width:none">
          <div class="progress-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,${rarities.map(r=>GRAMMAR_RARITY[r]).join(',')})"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--text3)">
          ${byRarity.map(r => `<span>${r.label}: ${r.done}/${r.total}</span>`).join('')}
        </div>
      </div>
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;align-items:center">
      ${categories.map(c => `
        <button class="btn btn-sm ${grammarAchFilter===c.id?'btn-primary':'btn-ghost'}" onclick="grammarAchFilter='${c.id}';renderGrammarAchievements()">${c.icon} ${c.label}</button>
      `).join('')}
      <input type="text" class="search-input" placeholder="🔍 Search achievements..." value="${grammarAchSearch}" oninput="grammarAchSearch=this.value.toLowerCase();renderGrammarAchievements()" style="margin-left:auto;max-width:220px;height:32px;font-size:12px">
    </div>

    ${filtered.length === 0 ? '<div style="text-align:center;padding:40px;color:var(--text3)">No achievements match your filter.</div>' : `
    <div class="grammar-ach-grid">
      ${filtered.map(a => {
        const done = unlocked.has(a.id);
        const p = a.progress(g);
        return `<div class="grammar-ach-card ${done?'unlocked':''}" data-rarity="${a.rarity}" title="${a.desc}">
          <div class="grammar-ach-rarity" style="background:${GRAMMAR_RARITY[a.rarity]}">${a.rarity}</div>
          <div class="grammar-ach-icon">${a.icon}</div>
          <div class="grammar-ach-name">${a.name}</div>
          <div class="grammar-ach-desc">${a.desc}</div>
          ${done
            ? `<div class="grammar-ach-status" style="color:var(--emerald2)">✅ Unlocked</div>`
            : `<div class="grammar-ach-progress-wrap"><div class="grammar-ach-progress-bar" style="width:${Math.min(p,100)}%"></div></div>
               <div class="grammar-ach-status" style="color:var(--text3)">${Math.round(Math.min(p,100))}%</div>`
          }
        </div>`;
      }).join('')}
    </div>`}

    <div style="margin-top:32px;text-align:center">
      <div style="font-size:14px;color:var(--text2)">Overall Progress: ${pct}% complete</div>
      <div class="progress-bar-bg" style="height:6px;border-radius:3px;max-width:400px;margin:8px auto 0">
        <div class="progress-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,${rarities.map(r=>GRAMMAR_RARITY[r]).join(',')});border-radius:3px"></div>
      </div>
    </div>`;
}
