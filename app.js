// Application state management and logic for "Mark: Know Jesus"

// --- STATE MANAGEMENT ---
let state = {
  xp: 0,
  level: 1,
  streak: 0,
  lastChallengeDate: null,
  completedChapters: [], // e.g. [1]
  chapterProgress: {},   // e.g. { 1: { read: false, explain: false, games: false, quiz: false, quizScore: 0, stars: 0 } }
  unlockedBadges: [],
  mistakes: [],          // array of questions answered incorrectly
  memorizedVerses: [],   // array of verse references
  currentChapterId: 1,   // currently selected chapter
  currentQuizIndex: 0,
  currentQuizScore: 0,
  quizQuestions: [],
  activeGameType: null,
  currentGameIndex: 0,
  currentGameScore: 0,
  gameData: [],
  searchFilter: 'all',
  selectedMatchLeft: null,
  matchPairsProgress: {} // for matching game tracking
};

// Default progress template
function getChapterDefaultProgress() {
  return {
    read: false,
    explain: false,
    games: false,
    quiz: false,
    quizScore: 0,
    stars: 0
  };
}

// Load state from LocalStorage
function loadState() {
  const saved = localStorage.getItem('mark_app_state');
  if (saved) {
    try {
      state = { ...state, ...JSON.parse(saved) };
    } catch (e) {
      console.error("Error loading saved state, resetting defaults", e);
    }
  }
  
  // Ensure default progression for Mark 1 exists
  if (!state.chapterProgress[1]) {
    state.chapterProgress[1] = getChapterDefaultProgress();
  }
  
  updateHeaderStats();
  renderChaptersList();
  renderBadges();
  renderCharacteristics();
  initializeDailyChallenge();
}

// Save state to LocalStorage
function saveState() {
  localStorage.setItem('mark_app_state', JSON.stringify(state));
  updateHeaderStats();
}

// Reset all progress helper
function resetAllProgress() {
  if (confirm("Are you sure you want to reset all your progress, XP, and badges? This cannot be undone.")) {
    localStorage.removeItem('mark_app_state');
    state = {
      xp: 0,
      level: 1,
      streak: 0,
      lastChallengeDate: null,
      completedChapters: [],
      chapterProgress: { 1: getChapterDefaultProgress() },
      unlockedBadges: [],
      mistakes: [],
      memorizedVerses: [],
      currentChapterId: 1,
      currentQuizIndex: 0,
      currentQuizScore: 0,
      quizQuestions: [],
      activeGameType: null,
      currentGameIndex: 0,
      currentGameScore: 0,
      gameData: [],
      searchFilter: 'all'
    };
    saveState();
    alert("Progress has been reset.");
    navigateTo('home');
    location.reload();
  }
}

// --- STATS UPDATE HELPERS ---
function addXP(amount) {
  state.xp += amount;
  
  // Calculate Level (100 XP per level, Max Level 5)
  let newLevel = 1 + Math.floor(state.xp / 150);
  if (newLevel > 5) newLevel = 5;
  
  if (newLevel > state.level) {
    state.level = newLevel;
    alert(`🎉 Level Up! You are now a ${getLevelName(newLevel)}!`);
  }
  
  saveState();
}

function getLevelName(levelNum) {
  return LEVEL_NAMES[levelNum] || `Level ${levelNum}`;
}

function updateHeaderStats() {
  document.getElementById('header-xp').innerText = `${state.xp} XP`;
  document.getElementById('header-streak').innerText = `${state.streak} 🔥`;
  document.getElementById('header-level').innerText = getLevelName(state.level);
  
  // Home Progress Indicators
  const completedCount = state.completedChapters.length;
  document.getElementById('home-progress-fraction').innerText = `${completedCount} / 16 Chapters`;
  document.getElementById('home-progress-bar').style.width = `${(completedCount / 16) * 100}%`;
  
  if (completedCount > 0) {
    document.getElementById('home-progress-text').innerText = `${completedCount} chapter(s) completed. Keep studying to know Jesus!`;
  } else {
    document.getElementById('home-progress-text').innerText = "Begin reading Mark 1 to start your learning journey.";
  }
  
  // Profile stats
  const profileLvl = document.getElementById('profile-level-name');
  if (profileLvl) profileLvl.innerText = getLevelName(state.level);
  
  const xpStat = document.getElementById('profile-stat-xp');
  if (xpStat) xpStat.innerText = state.xp;
  
  const chStat = document.getElementById('profile-stat-completed');
  if (chStat) chStat.innerText = `${completedCount} / 16`;
  
  const streakStat = document.getElementById('profile-stat-streak');
  if (streakStat) streakStat.innerText = state.streak;
  
  const mistakeStat = document.getElementById('profile-stat-mistakes');
  if (mistakeStat) mistakeStat.innerText = state.mistakes.length;
  
  // Profile avatar based on level
  const avatar = document.getElementById('profile-avatar');
  if (avatar) {
    const avatars = ["🕵️‍♂️", "🔍", "📖", "🛡️", "🎓", "👑"];
    avatar.innerText = avatars[state.level] || "🕵️‍♂️";
  }
}

// Unlock Badge Helper
function unlockBadge(badgeId) {
  if (!state.unlockedBadges.includes(badgeId)) {
    state.unlockedBadges.push(badgeId);
    saveState();
    
    // Find badge info
    const badge = BADGES_LIST.find(b => b.id === badgeId);
    if (badge) {
      // Trigger visually pleasing feedback
      setTimeout(() => {
        alert(`🏆 Achievement Unlocked: ${badge.icon} ${badge.title}!\n"${badge.desc}"`);
      }, 500);
    }
    renderBadges();
  }
}

// --- ROUTER / NAVIGATION ---
function navigateTo(screenId) {
  // Hide all screens
  const screens = document.querySelectorAll('.app-screen');
  screens.forEach(s => s.classList.remove('active'));
  
  // Show target screen
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.classList.add('active');
    
    // Smooth scroll to top of viewport
    document.getElementById('main-content').scrollTop = 0;
  }
  
  // Update nav bar active state
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(t => t.classList.remove('active'));
  
  const activeTab = document.getElementById(`nav-${screenId}`);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Trigger screen-specific rendering
  if (screenId === 'chapters') {
    renderChaptersList();
  } else if (screenId === 'progress') {
    renderBadges();
    renderCharacteristics();
    updateHeaderStats();
  } else if (screenId === 'mistakes') {
    renderMistakesList();
  } else if (screenId === 'search') {
    runSearchQuery();
  }
}

// --- DAILY BIBLE CHALLENGE ---
function initializeDailyChallenge() {
  const todayStr = new Date().toDateString();
  const challengeCard = document.getElementById('daily-challenge-card');
  const questionContainer = document.getElementById('challenge-question-container');
  const feedbackContainer = document.getElementById('challenge-feedback');
  
  document.getElementById('challenge-streak-text').innerText = `${state.streak} day streak`;
  
  if (state.lastChallengeDate === todayStr) {
    // Challenge already completed today
    questionContainer.classList.add('hidden');
    feedbackContainer.classList.remove('hidden');
    feedbackContainer.innerHTML = `
      <div style="color: var(--accent-green); font-weight: 700; margin-bottom: 6px;">⚡ Challenge Completed Today!</div>
      <strong>Daily Devotional:</strong>
      <p style="margin-top: 4px; font-size: 0.82rem; color: var(--text-dark);">
        "Following Jesus is a daily walk. Continue to explore His teachings and authority in the Gospel of Mark!"
      </p>
    `;
    return;
  }
  
  // Pick active challenge based on date day number
  const challengeIndex = new Date().getDate() % DAILY_CHALLENGES.length;
  const challenge = DAILY_CHALLENGES[challengeIndex];
  
  document.getElementById('daily-q-text').innerText = challenge.question;
  
  const optionsDiv = document.getElementById('daily-q-options');
  optionsDiv.innerHTML = '';
  
  challenge.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'btn-option';
    btn.innerText = opt;
    btn.onclick = () => handleDailyChallengeAnswer(btn, opt, challenge);
    optionsDiv.appendChild(btn);
  });
  
  questionContainer.classList.remove('hidden');
  feedbackContainer.classList.add('hidden');
}

function handleDailyChallengeAnswer(button, selectedOpt, challenge) {
  const isCorrect = (selectedOpt === challenge.answer);
  const options = document.querySelectorAll('#daily-q-options .btn-option');
  
  // Disable all options
  options.forEach(optBtn => {
    optBtn.disabled = true;
    if (optBtn.innerText === challenge.answer) {
      optBtn.classList.add('selected-correct');
    }
  });
  
  const feedbackContainer = document.getElementById('challenge-feedback');
  feedbackContainer.classList.remove('hidden');
  
  if (isCorrect) {
    button.classList.add('selected-correct');
    
    // Update streak logic
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (state.lastChallengeDate === yesterdayStr || state.streak === 0) {
      state.streak += 1;
    } else if (state.lastChallengeDate !== today.toDateString()) {
      state.streak = 1; // streak reset/broken, start fresh
    }
    
    state.lastChallengeDate = today.toDateString();
    addXP(20);
    unlockBadge('seeker');
    
    feedbackContainer.innerHTML = `
      <div style="color: var(--accent-green); font-weight: 700; margin-bottom: 6px;">✨ Correct Answer! +20 XP</div>
      <strong>Today's Devotion:</strong>
      <p style="margin-top: 4px; font-size: 0.82rem; color: var(--text-dark);">${challenge.lesson}</p>
    `;
  } else {
    button.classList.add('selected-incorrect');
    feedbackContainer.innerHTML = `
      <div style="color: var(--accent-red); font-weight: 700; margin-bottom: 6px;">❌ Not Quite Correct</div>
      <p style="font-size: 0.82rem; color: var(--text-dark);">The correct answer is <strong>${challenge.answer}</strong>.</p>
      <strong style="margin-top: 8px; display: block;">Today's Devotion:</strong>
      <p style="margin-top: 4px; font-size: 0.82rem; color: var(--text-dark);">${challenge.lesson}</p>
    `;
    // We don't advance the streak but we set the date so they don't answer again
    state.lastChallengeDate = new Date().toDateString();
    saveState();
  }
  
  document.getElementById('challenge-streak-text').innerText = `${state.streak} day streak`;
}

// --- CHAPTER SELECTION RENDERING ---
function renderChaptersList() {
  const container = document.getElementById('chapters-list');
  container.innerHTML = '';
  
  Object.values(CHAPTERS_DATA).forEach(ch => {
    const card = document.createElement('div');
    
    // Locked check: A chapter is unlocked if it is Chapter 1 OR the previous chapter is completed
    const isUnlocked = ch.id === 1 || state.completedChapters.includes(ch.id - 1);
    
    card.className = `chapter-card ${isUnlocked ? '' : 'locked'}`;
    
    // Read stats from progress
    const progress = state.chapterProgress[ch.id] || getChapterDefaultProgress();
    
    let completionPercent = 0;
    if (progress.read) completionPercent += 30;
    if (progress.explain) completionPercent += 20;
    if (progress.games) completionPercent += 20;
    if (progress.quiz) completionPercent += 30;
    
    // Stars representation
    let starsHtml = '';
    if (progress.stars > 0) {
      starsHtml = `<span class="star-rating">${'★'.repeat(progress.stars)}${'☆'.repeat(5 - progress.stars)}</span>`;
    }
    
    if (isUnlocked) {
      card.onclick = () => startChapter(ch.id);
      
      const statusCheck = progress.quiz ? `<span class="status-check">Cleared ✓</span>` : '';
      
      card.innerHTML = `
        <div class="chapter-card-left">
          <span class="ch-num">Mark ${ch.id}</span>
          <h3 class="ch-title">${ch.title}</h3>
          <div class="ch-meta">
            <span>Score: ${progress.quizScore}%</span>
            ${starsHtml}
            ${statusCheck}
          </div>
        </div>
        <div class="chapter-card-right">
          <div class="circle-progress" style="background: conic-gradient(var(--accent-gold) ${completionPercent * 3.6}deg, var(--border-light) 0deg)">
            <div class="circle-progress-inner">${completionPercent}%</div>
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="chapter-card-left">
          <span class="ch-num" style="color: var(--text-muted);">Mark ${ch.id}</span>
          <h3 class="ch-title" style="color: var(--text-muted);">${ch.title}</h3>
          <div class="ch-meta">
            <span>🔒 Complete Chapter ${ch.id - 1} to unlock</span>
          </div>
        </div>
        <div class="chapter-card-right">
          <span class="lock-icon">🔒</span>
        </div>
      `;
    }
    
    container.appendChild(card);
  });
}

// --- CHAPTER DETAIL & TABS ---
function startChapter(chapterId) {
  // Save current chapter setting
  state.currentChapterId = chapterId;
  
  // Retrieve details
  const chData = CHAPTERS_DATA[chapterId];
  if (!chData || chData.locked) {
    alert("This chapter is currently locked. Complete previous chapters first.");
    return;
  }
  
  // Ensure progress state is set up
  if (!state.chapterProgress[chapterId]) {
    state.chapterProgress[chapterId] = getChapterDefaultProgress();
  }
  
  // Set titles
  document.getElementById('learning-chapter-title').innerText = `Mark ${chapterId}`;
  document.getElementById('learning-chapter-subtitle').innerText = chData.title;
  
  // Populate Summary
  document.getElementById('learning-summary-text').innerText = chData.summary;
  document.getElementById('learning-context-text').innerText = chData.context;
  
  // Populate Understand events
  const eventsList = document.getElementById('explain-events-list');
  eventsList.innerHTML = '';
  chData.keyEvents.forEach(evt => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${evt.title}</strong>${evt.desc}`;
    eventsList.appendChild(li);
  });
  
  // Populate Understand teachings
  const teachingsList = document.getElementById('explain-teachings-list');
  teachingsList.innerHTML = `
    <li><strong>Repent and Believe</strong>Jesus announces that the Kingdom of God has arrived, and demands a double response: turning away from self-governed living (repentance) and actively believing the good news of grace.</li>
    <li><strong>Follow Me</strong>Discipleship is an immediate call to follow Jesus' person. Jesus does not call for classroom study first, but for direct partnership, learning from Him and obeying His example.</li>
    <li><strong>Godly Silence</strong>Jesus commands both the demoniac and the healed leper to remain silent. This reveals that Jesus wanted people to follow Him for who He truly is, not just for the sensational display of healing powers.</li>
  `;
  
  // Populate Understand Jesus characteristics
  const jesusList = document.getElementById('explain-jesus-list');
  jesusList.innerHTML = `
    <li><strong>His Authority:</strong> Commands nature, physical sickness, unclean spirits, and commands people to follow Him.</li>
    <li><strong>His Compassion:</strong> Touches a leper, showing He is willing to touch the untouchable to heal.</li>
    <li><strong>His Dependence on God:</strong> Slips away early to pray in desolate locations to align with His Father's mission.</li>
  `;
  
  // Populate Lessons
  const lessonsList = document.getElementById('explain-lessons-list');
  lessonsList.innerHTML = '';
  chData.lessons.forEach(l => {
    const li = document.createElement('li');
    li.innerText = l;
    lessonsList.appendChild(li);
  });
  
  // Populate Reflections
  const reflectionsList = document.getElementById('explain-reflections-list');
  reflectionsList.innerHTML = '';
  chData.applications.forEach(app => {
    const li = document.createElement('li');
    li.innerText = app;
    reflectionsList.appendChild(li);
  });
  
  // Populate Timeline
  const timelineFlow = document.getElementById('timeline-flow');
  timelineFlow.innerHTML = '';
  chData.timeline.forEach(tNode => {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-header-row">
        <span class="timeline-label">${tNode.label}</span>
        <span class="timeline-time">${tNode.time}</span>
      </div>
      <p class="timeline-desc">${tNode.desc}</p>
    `;
    timelineFlow.appendChild(div);
  });
  
  // Populate People & Places
  const peopleList = document.getElementById('people-list');
  peopleList.innerHTML = '';
  chData.people.forEach(p => {
    const btn = document.createElement('div');
    btn.className = 'entity-btn';
    btn.innerText = p.name;
    btn.onclick = () => showEntityDetails(p.name, 'Person', p.desc);
    peopleList.appendChild(btn);
  });
  
  const placesList = document.getElementById('places-list');
  placesList.innerHTML = '';
  chData.places.forEach(p => {
    const btn = document.createElement('div');
    btn.className = 'entity-btn';
    btn.innerText = p.name;
    btn.onclick = () => showEntityDetails(p.name, 'Place', p.desc);
    placesList.appendChild(btn);
  });
  
  // Populate Verses
  const versesList = document.getElementById('verses-list');
  versesList.innerHTML = '';
  chData.verses.forEach(v => {
    const isMemorized = state.memorizedVerses.includes(v.ref);
    const div = document.createElement('div');
    div.className = 'verse-item';
    div.innerHTML = `
      <div class="verse-ref-row">
        <span class="verse-ref">${v.ref}</span>
        <button class="btn-memorize ${isMemorized ? 'memorized' : ''}" onclick="toggleMemorizeVerse('${v.ref}', this)">
          ${isMemorized ? 'Memorized ★' : 'Remember This'}
        </button>
      </div>
      <p class="verse-text">${v.text}</p>
      <p class="verse-note">${v.note}</p>
    `;
    versesList.appendChild(div);
  });
  
  // Switch to Summary Tab initially
  switchLearningTab('summary');
  
  // Update footer action states and badges
  updateChapterFooterStatus();
  
  // Trigger reading completion of summary automatically
  if (!state.chapterProgress[chapterId].read) {
    state.chapterProgress[chapterId].read = true;
    addXP(10);
    unlockBadge('first_steps');
  }
  
  // Show screen
  navigateTo('learning');
}

function switchLearningTab(tabName) {
  // Set tab buttons class
  const tabs = document.querySelectorAll('.learning-tabs .tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  
  // Highlight clicked
  event.target.classList.add('active');
  
  // Hide all tab contents
  const contents = document.querySelectorAll('.learning-content-body .tab-content');
  contents.forEach(c => c.classList.remove('active'));
  
  // Show target tab content
  document.getElementById(`tab-${tabName}`).classList.add('active');
}

function markSectionRead(sectionName) {
  const currentCh = state.currentChapterId;
  if (!state.chapterProgress[currentCh]) return;
  
  if (sectionName === 'explain' && !state.chapterProgress[currentCh].explain) {
    state.chapterProgress[currentCh].explain = true;
    addXP(20);
    alert("🙌 Excellent! Reflection and study section completed. +20 XP earned.");
    updateChapterFooterStatus();
    saveState();
  }
}

function toggleMemorizeVerse(ref, button) {
  const idx = state.memorizedVerses.indexOf(ref);
  if (idx > -1) {
    state.memorizedVerses.splice(idx, 1);
    button.classList.remove('memorized');
    button.innerText = 'Remember This';
  } else {
    state.memorizedVerses.push(ref);
    button.classList.add('memorized');
    button.innerText = 'Memorized ★';
    addXP(10);
    alert("📖 Verse added to your memory list! Keep studying God's Word. +10 XP");
  }
  saveState();
}

function showEntityDetails(name, type, desc) {
  document.getElementById('modal-entity-name').innerText = name;
  document.getElementById('modal-entity-type').innerText = type;
  document.getElementById('modal-entity-description').innerText = desc;
  document.getElementById('entity-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('entity-modal').classList.add('hidden');
}

function updateChapterFooterStatus() {
  const progress = state.chapterProgress[state.currentChapterId] || getChapterDefaultProgress();
  
  // Read Status
  const pillRead = document.getElementById('pill-read');
  if (progress.read && progress.explain) {
    pillRead.className = 'status-pill completed';
    pillRead.innerText = 'Read ✓';
  } else {
    pillRead.className = 'status-pill unlocked';
    pillRead.innerText = 'Reading...';
  }
  
  // Games status
  const pillGames = document.getElementById('pill-games');
  if (progress.games) {
    pillGames.className = 'status-pill completed';
    pillGames.innerText = 'Games ✓';
  } else {
    pillGames.className = 'status-pill unlocked';
    pillGames.innerText = 'Play Games';
  }
  
  // Quiz status
  const pillQuiz = document.getElementById('pill-quiz');
  if (progress.quiz) {
    pillQuiz.className = 'status-pill completed';
    pillQuiz.innerText = 'Quiz ✓';
  } else {
    pillQuiz.className = 'status-pill unlocked';
    pillQuiz.innerText = 'Quiz locked';
  }
  
  // Toggle quiz button enabling
  const quizBtn = document.getElementById('btn-take-quiz');
  if (progress.read && progress.explain) {
    quizBtn.disabled = false;
    quizBtn.style.opacity = '1';
  } else {
    quizBtn.disabled = true;
    quizBtn.style.opacity = '0.5';
    pillQuiz.innerText = 'Study First';
  }
}

// --- BIBLE GAMES ENGINES ---
function launchGame(gameType) {
  const currentCh = state.currentChapterId;
  const gameDataRoot = GAMES_DATA[currentCh];
  
  if (!gameDataRoot) {
    alert("Games for this chapter are coming soon. Placeholders are locked.");
    return;
  }
  
  state.activeGameType = gameType;
  state.currentGameIndex = 0;
  state.currentGameScore = 0;
  
  // Set up titles
  const gameTitle = document.getElementById('game-title');
  const gameSubtitle = document.getElementById('game-subtitle');
  
  const typeTitles = {
    whoSaidIt: "Game 1: Who Said It?",
    whoAmI: "Game 2: Who Am I?",
    whatNext: "Game 3: What Happened Next?",
    match: "Game 4: Match the Following",
    order: "Game 5: Put It in Order",
    trueFalse: "Game 6: True or False"
  };
  
  gameTitle.innerText = typeTitles[gameType] || "Bible Game";
  gameSubtitle.innerText = `Mark Chapter ${currentCh}`;
  
  // Reset banners
  document.getElementById('game-feedback-banner').classList.add('hidden');
  
  // Render first item
  renderGameArenaItem();
  
  // Show screen
  navigateTo('game-play');
}

function renderGameArenaItem() {
  const currentCh = state.currentChapterId;
  const gameType = state.activeGameType;
  const arena = document.getElementById('game-arena');
  arena.innerHTML = '';
  
  const gameDataRoot = GAMES_DATA[currentCh];
  const progressInd = document.getElementById('game-progress-indicator');
  const scoreInd = document.getElementById('game-score');
  
  // Hide feedback banner initially
  document.getElementById('game-feedback-banner').classList.add('hidden');
  
  if (gameType === 'whoSaidIt') {
    const list = gameDataRoot.whoSaidIt;
    state.gameData = list;
    
    progressInd.innerText = `Question ${state.currentGameIndex + 1} of ${list.length}`;
    scoreInd.innerText = `Score: ${state.currentGameScore} / ${list.length}`;
    
    const item = list[state.currentGameIndex];
    
    const qDiv = document.createElement('div');
    qDiv.innerHTML = `
      <p class="game-question-title">Who spoke these words in Mark 1?</p>
      <blockquote class="encouragement-text" style="color: var(--primary-deep); margin-bottom: 25px; text-align: center;">
        ${item.quote}
      </blockquote>
      <div class="game-options-vertical">
        ${item.options.map(opt => `<button class="btn-option" onclick="submitGameChoice('${opt}')">${opt}</button>`).join('')}
      </div>
    `;
    arena.appendChild(qDiv);
    
  } else if (gameType === 'whoAmI') {
    const list = gameDataRoot.whoAmI;
    state.gameData = list;
    
    progressInd.innerText = `Question ${state.currentGameIndex + 1} of ${list.length}`;
    scoreInd.innerText = `Score: ${state.currentGameScore} / ${list.length}`;
    
    const item = list[state.currentGameIndex];
    
    const qDiv = document.createElement('div');
    qDiv.innerHTML = `
      <p class="game-question-title">Guess the person based on these clues:</p>
      <ul class="lessons-list" style="margin-bottom: 20px;">
        ${item.clues.map(c => `<li>${c}</li>`).join('')}
      </ul>
      <div class="game-options-vertical">
        ${item.options.map(opt => `<button class="btn-option" onclick="submitGameChoice('${opt}')">${opt}</button>`).join('')}
      </div>
    `;
    arena.appendChild(qDiv);
    
  } else if (gameType === 'whatNext') {
    const list = gameDataRoot.whatNext;
    state.gameData = list;
    
    progressInd.innerText = `Question ${state.currentGameIndex + 1} of ${list.length}`;
    scoreInd.innerText = `Score: ${state.currentGameScore} / ${list.length}`;
    
    const item = list[state.currentGameIndex];
    
    const qDiv = document.createElement('div');
    qDiv.innerHTML = `
      <p class="game-question-title">What happens immediately after this event?</p>
      <div class="card read-card" style="margin-bottom: 20px; font-weight: 500;">
        ${item.event}
      </div>
      <div class="game-options-vertical">
        ${item.options.map(opt => `<button class="btn-option" onclick="submitGameChoice('${opt}')">${opt}</button>`).join('')}
      </div>
    `;
    arena.appendChild(qDiv);
    
  } else if (gameType === 'trueFalse') {
    const list = gameDataRoot.trueFalse;
    state.gameData = list;
    
    progressInd.innerText = `Question ${state.currentGameIndex + 1} of ${list.length}`;
    scoreInd.innerText = `Score: ${state.currentGameScore} / ${list.length}`;
    
    const item = list[state.currentGameIndex];
    
    const qDiv = document.createElement('div');
    qDiv.innerHTML = `
      <p class="game-question-title">True or False statement:</p>
      <div class="card read-card" style="margin-bottom: 25px; line-height: 1.5; font-size: 1rem; text-align: center;">
        "${item.statement}"
      </div>
      <div class="game-options-vertical" style="grid-template-columns: 1fr 1fr; gap: 15px;">
        <button class="btn btn-secondary" style="font-size: 1.1rem;" onclick="submitGameChoice(true)">TRUE</button>
        <button class="btn btn-outline" style="font-size: 1.1rem;" onclick="submitGameChoice(false)">FALSE</button>
      </div>
    `;
    arena.appendChild(qDiv);
    
  } else if (gameType === 'match') {
    const matchData = gameDataRoot.match;
    
    progressInd.innerText = `Pairing Activity`;
    scoreInd.innerText = `Select Left then Right`;
    
    // Clear selections
    state.selectedMatchLeft = null;
    state.matchPairsProgress = {};
    
    const wrap = document.createElement('div');
    wrap.className = 'match-game-wrapper';
    
    // Left list
    const colLeft = document.createElement('div');
    colLeft.className = 'match-column';
    matchData.left.forEach(lItem => {
      const card = document.createElement('div');
      card.className = 'match-item';
      card.innerText = lItem;
      card.dataset.side = 'left';
      card.dataset.val = lItem;
      card.onclick = () => handleMatchSelect(card);
      colLeft.appendChild(card);
    });
    
    // Right list
    const colRight = document.createElement('div');
    colRight.className = 'match-column';
    // Shuffle right column for game logic
    const shuffledRight = [...matchData.right].sort(() => Math.random() - 0.5);
    shuffledRight.forEach(rItem => {
      const card = document.createElement('div');
      card.className = 'match-item';
      card.innerText = rItem;
      card.dataset.side = 'right';
      card.dataset.val = rItem;
      card.onclick = () => handleMatchSelect(card);
      colRight.appendChild(card);
    });
    
    wrap.appendChild(colLeft);
    wrap.appendChild(colRight);
    
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary btn-block';
    submitBtn.innerText = 'Close Game';
    submitBtn.style.marginTop = '20px';
    submitBtn.onclick = () => finishGame();
    
    arena.appendChild(wrap);
    arena.appendChild(submitBtn);
    
  } else if (gameType === 'order') {
    const orderData = [...gameDataRoot.order];
    // Scramble order
    if (state.currentGameIndex === 0) {
      state.gameData = orderData.sort(() => Math.random() - 0.5);
      state.currentGameIndex = 1; // Mark initiated
    }
    
    progressInd.innerText = `Ordering Exercise`;
    scoreInd.innerText = `Arrange First to Last`;
    
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <p class="game-question-title">Arrange from first (top) to last (bottom) event:</p>
      <div class="scrambled-list" id="order-list-scrambled"></div>
    `;
    arena.appendChild(wrap);
    
    renderOrderItems();
    
    const verifyBtn = document.createElement('button');
    verifyBtn.className = 'btn btn-primary btn-block';
    verifyBtn.innerText = 'Verify Order';
    verifyBtn.onclick = () => verifyScrambledOrder(gameDataRoot.order);
    arena.appendChild(verifyBtn);
  }
}

function handleMatchSelect(card) {
  if (card.classList.contains('paired')) return;
  
  const side = card.dataset.side;
  const val = card.dataset.val;
  
  if (side === 'left') {
    // Deselect previously selected left
    const prev = document.querySelector('[data-side="left"].selected');
    if (prev) prev.classList.remove('selected');
    
    card.classList.add('selected');
    state.selectedMatchLeft = val;
  } else {
    // Selected right, must have a left selected
    if (!state.selectedMatchLeft) {
      alert("Select an item on the left column first.");
      return;
    }
    
    const currentCh = state.currentChapterId;
    const pairs = GAMES_DATA[currentCh].match.pairs;
    
    // Check if correct match
    const correctRight = pairs[state.selectedMatchLeft];
    
    if (correctRight === val) {
      // SUCCESS match
      const leftCard = document.querySelector(`[data-side="left"][data-val="${state.selectedMatchLeft}"]`);
      leftCard.classList.remove('selected');
      leftCard.classList.add('paired');
      card.classList.add('paired');
      
      state.matchPairsProgress[state.selectedMatchLeft] = true;
      state.selectedMatchLeft = null;
      
      // Check if all matched
      const totalPairs = Object.keys(pairs).length;
      const matchedPairs = Object.keys(state.matchPairsProgress).length;
      
      if (matchedPairs === totalPairs) {
        addXP(20);
        unlockBadge('gamer');
        alert("🎉 Excellent! You have matched all items correctly. +20 XP!");
        finishGame();
      }
    } else {
      alert("❌ Incorrect pairing, try another combination.");
      // Deselect left
      const leftCard = document.querySelector(`[data-side="left"][data-val="${state.selectedMatchLeft}"]`);
      if (leftCard) leftCard.classList.remove('selected');
      state.selectedMatchLeft = null;
    }
  }
}

function renderOrderItems() {
  const container = document.getElementById('order-list-scrambled');
  container.innerHTML = '';
  
  state.gameData.forEach((itemText, idx) => {
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
      <span class="order-handle">☰</span>
      <div class="order-content">${itemText}</div>
      <div class="order-actions">
        ${idx > 0 ? `<button class="btn-order-move" onclick="moveOrderItem(${idx}, -1)">▲</button>` : ''}
        ${idx < state.gameData.length - 1 ? `<button class="btn-order-move" onclick="moveOrderItem(${idx}, 1)">▼</button>` : ''}
      </div>
    `;
    container.appendChild(div);
  });
}

function moveOrderItem(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= state.gameData.length) return;
  
  // Swap
  const temp = state.gameData[index];
  state.gameData[index] = state.gameData[targetIndex];
  state.gameData[targetIndex] = temp;
  
  renderOrderItems();
}

function verifyScrambledOrder(correctOrder) {
  let isCorrect = true;
  for (let i = 0; i < correctOrder.length; i++) {
    if (state.gameData[i] !== correctOrder[i]) {
      isCorrect = false;
      break;
    }
  }
  
  if (isCorrect) {
    addXP(20);
    unlockBadge('gamer');
    alert("🎉 Brilliant! You arranged the events in their exact chronological order! +20 XP");
    finishGame();
  } else {
    alert("❌ Some events are misplaced. We will arrange them correctly for you to review.");
    state.gameData = [...correctOrder];
    renderOrderItems();
  }
}

function submitGameChoice(choice) {
  const list = state.gameData;
  const item = list[state.currentGameIndex];
  const isCorrect = (choice === item.answer);
  
  // Show feedback banner
  const banner = document.getElementById('game-feedback-banner');
  const status = document.getElementById('game-feedback-status');
  const explain = document.getElementById('game-feedback-explanation');
  
  banner.classList.remove('hidden');
  
  // Disable options inside arena
  const btns = document.querySelectorAll('#game-arena button');
  btns.forEach(b => b.disabled = true);
  
  if (isCorrect) {
    state.currentGameScore += 1;
    status.innerText = "Correct! 🌟";
    status.className = "status-correct";
    explain.innerText = item.explanation || "Great job remembering this fact from the chapter.";
  } else {
    status.innerText = "Incorrect ❌";
    status.className = "status-incorrect";
    explain.innerText = `The correct answer is "${item.answer}". ` + (item.explanation || "");
  }
  
  // Configure next action
  const nextBtn = document.getElementById('game-next-btn');
  nextBtn.onclick = () => {
    state.currentGameIndex += 1;
    if (state.currentGameIndex < list.length) {
      renderGameArenaItem();
    } else {
      finishGameSummary();
    }
  };
}

function finishGameSummary() {
  const arena = document.getElementById('game-arena');
  arena.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <span style="font-size: 3rem;">🎮</span>
      <h3 class="game-question-title" style="margin-top: 10px;">Game Completed!</h3>
      <p style="margin-bottom: 20px; font-size: 1rem;">
        You answered <strong>${state.currentGameScore} of ${state.gameData.length}</strong> questions correctly.
      </p>
      <button class="btn btn-primary" onclick="finishGame()">Collect +20 XP &amp; Exit</button>
    </div>
  `;
  document.getElementById('game-feedback-banner').classList.add('hidden');
}

function finishGame() {
  const currentCh = state.currentChapterId;
  state.chapterProgress[currentCh].games = true;
  addXP(20);
  unlockBadge('gamer');
  saveState();
  startChapter(currentCh); // Reload detail page to reflect completion
}

// --- QUIZ SYSTEM ---
function startQuiz() {
  const chData = CHAPTERS_DATA[state.currentChapterId];
  const questions = QUIZZES_DATA[state.currentChapterId];
  
  if (!questions || questions.length === 0) {
    alert("Chapter Quiz is not yet defined.");
    return;
  }
  
  state.currentQuizIndex = 0;
  state.currentQuizScore = 0;
  state.quizQuestions = [...questions];
  
  // Render question
  renderQuizQuestion();
  navigateTo('quiz');
}

function confirmQuitQuiz() {
  if (confirm("Are you sure you want to quit the quiz? Your answers will not be saved.")) {
    startChapter(state.currentChapterId);
  }
}

function renderQuizQuestion() {
  const currentQ = state.quizQuestions[state.currentQuizIndex];
  const qNumText = document.getElementById('quiz-question-number');
  const barFill = document.getElementById('quiz-progress-bar');
  const qText = document.getElementById('quiz-question-text');
  const optionsContainer = document.getElementById('quiz-options');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  
  // Hide feedback overlay
  feedbackBox.classList.add('hidden');
  
  // Set progress numbers
  const total = state.quizQuestions.length;
  qNumText.innerText = `Question ${state.currentQuizIndex + 1} of ${total}`;
  barFill.style.width = `${((state.currentQuizIndex) / total) * 100}%`;
  
  qText.innerText = currentQ.question;
  optionsContainer.innerHTML = '';
  
  currentQ.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'btn-option';
    btn.innerText = opt;
    btn.onclick = () => submitQuizAnswer(btn, opt);
    optionsContainer.appendChild(btn);
  });
}

function submitQuizAnswer(button, selectedOpt) {
  const currentQ = state.quizQuestions[state.currentQuizIndex];
  const isCorrect = (selectedOpt === currentQ.answer);
  const options = document.querySelectorAll('#quiz-options .btn-option');
  
  // Disable all options
  options.forEach(optBtn => {
    optBtn.disabled = true;
    if (optBtn.innerText === currentQ.answer) {
      optBtn.classList.add('selected-correct');
    }
  });
  
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const feedbackTitle = document.getElementById('quiz-feedback-title');
  const feedbackText = document.getElementById('quiz-feedback-text');
  const nextBtn = document.getElementById('quiz-next-btn');
  
  feedbackBox.classList.remove('hidden');
  
  if (isCorrect) {
    state.currentQuizScore += 1;
    feedbackTitle.innerText = "Correct! ✨";
    feedbackTitle.className = "status-correct";
    feedbackText.innerText = currentQ.explanation;
  } else {
    button.classList.add('selected-incorrect');
    feedbackTitle.innerText = "Incorrect ❌";
    feedbackTitle.className = "status-incorrect";
    feedbackText.innerText = `The correct answer was "${currentQ.answer}". ${currentQ.explanation}`;
    
    // Save to mistakes array for review later, avoiding duplicates
    if (!state.mistakes.find(m => m.id === currentQ.id && m.chapter === state.currentChapterId)) {
      state.mistakes.push({
        id: currentQ.id,
        chapter: state.currentChapterId,
        question: currentQ.question,
        options: currentQ.options,
        answer: currentQ.answer,
        explanation: currentQ.explanation
      });
    }
  }
  
  nextBtn.onclick = () => {
    state.currentQuizIndex += 1;
    if (state.currentQuizIndex < state.quizQuestions.length) {
      renderQuizQuestion();
    } else {
      finishChapterQuiz();
    }
  };
}

function finishChapterQuiz() {
  const chapterId = state.currentChapterId;
  const questionsCount = state.quizQuestions.length;
  const scorePercent = Math.round((state.currentQuizScore / questionsCount) * 100);
  
  // Stars calculation
  let stars = 1;
  if (scorePercent === 100) stars = 5;
  else if (scorePercent >= 90) stars = 4;
  else if (scorePercent >= 80) stars = 3;
  else if (scorePercent >= 60) stars = 2;
  
  // Save progress
  const chProgress = state.chapterProgress[chapterId] || getChapterDefaultProgress();
  chProgress.quiz = true;
  chProgress.quizScore = Math.max(chProgress.quizScore, scorePercent);
  chProgress.stars = Math.max(chProgress.stars, stars);
  state.chapterProgress[chapterId] = chProgress;
  
  // Mark chapter as completed if quiz cleared
  if (scorePercent >= 60) {
    if (!state.completedChapters.includes(chapterId)) {
      state.completedChapters.push(chapterId);
      addXP(100); // 100 XP for chapter graduation
      unlockBadge('mark1_grad');
    }
  }
  
  // Award quiz XP
  addXP(30);
  if (scorePercent === 100) {
    addXP(50); // Perfect score bonus
    unlockBadge('perfectionist');
  }
  unlockBadge('quiz_champ');
  saveState();
  
  // Render completion screen
  document.getElementById('completion-chapter-title').innerText = `Mark ${chapterId} : ${CHAPTERS_DATA[chapterId].title}`;
  document.getElementById('comp-score').innerText = `${scorePercent}%`;
  document.getElementById('comp-stars').innerText = '★'.repeat(stars) + '☆'.repeat(5 - stars);
  document.getElementById('comp-xp').innerText = `+${100 + (scorePercent === 100 ? 80 : 30)} XP`;
  document.getElementById('completion-connection-text').innerText = CHAPTERS_DATA[chapterId].connectionToNext || "Prepare to learn the next steps in Jesus' ministry.";
  
  // Setup next chapter button
  const nextBtn = document.getElementById('btn-next-chapter-action');
  if (chapterId < 16) {
    nextBtn.classList.remove('hidden');
    nextBtn.onclick = () => startChapter(chapterId + 1);
  } else {
    nextBtn.classList.add('hidden'); // finished Gospel of Mark!
    alert("🎉 WOW! You have completed all 16 chapters of Mark! You are a Bible Master!");
  }
  
  navigateTo('completion');
}

// --- MISTAKES REVIEW SYSTEM ---
function renderMistakesList() {
  const container = document.getElementById('mistakes-list');
  container.innerHTML = '';
  
  if (state.mistakes.length === 0) {
    container.innerHTML = `
      <div class="card read-card" style="text-align: center; padding: 40px 20px;">
        <span style="font-size: 3rem;">🛡️</span>
        <h3 style="margin-top: 15px; color: var(--accent-green);">No Mistakes to Review!</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
          You've answered all questions correctly in your quizzes. Keep up the amazing work!
        </p>
      </div>
    `;
    return;
  }
  
  state.mistakes.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card mistake-card';
    card.id = `mistake-${index}`;
    
    card.innerHTML = `
      <div class="mistake-header">Mark ${item.chapter} • Question Review</div>
      <p class="mistake-q">${item.question}</p>
      <div class="game-options-vertical" id="mistake-options-${index}">
        ${item.options.map(opt => `
          <button class="btn-option" onclick="retryMistakeQuestion(${index}, '${opt}', this)">${opt}</button>
        `).join('')}
      </div>
      <div id="mistake-feedback-${index}" class="challenge-feedback hidden"></div>
    `;
    container.appendChild(card);
  });
}

function retryMistakeQuestion(index, selectedOpt, button) {
  const item = state.mistakes[index];
  const isCorrect = (selectedOpt === item.answer);
  const options = document.querySelectorAll(`#mistake-options-${index} .btn-option`);
  
  options.forEach(optBtn => {
    optBtn.disabled = true;
    if (optBtn.innerText === item.answer) {
      optBtn.classList.add('selected-correct');
    }
  });
  
  const feedback = document.getElementById(`mistake-feedback-${index}`);
  feedback.classList.remove('hidden');
  
  if (isCorrect) {
    button.classList.add('selected-correct');
    addXP(10);
    
    feedback.innerHTML = `
      <div class="mistake-resolved-box">✨ Resolved! +10 XP</div>
      <strong>Explanation:</strong>
      <p>${item.explanation}</p>
      <button class="btn btn-secondary btn-block" style="margin-top: 10px;" onclick="clearMistakeFromState(${index})">Remove from List</button>
    `;
  } else {
    button.classList.add('selected-incorrect');
    feedback.innerHTML = `
      <div style="color: var(--accent-red); font-weight: 700; margin-bottom: 4px;">❌ Still Incorrect</div>
      <p>Take note of the explanation: ${item.explanation}</p>
      <button class="btn btn-outline btn-block" style="margin-top: 10px;" onclick="resetMistakeOptions(${index})">Try Again</button>
    `;
  }
}

function resetMistakeOptions(index) {
  // Re-render list to reset disabled state
  renderMistakesList();
}

function clearMistakeFromState(index) {
  // Remove from state
  state.mistakes.splice(index, 1);
  saveState();
  
  // Check if badges unlock
  if (state.mistakes.length === 0) {
    unlockBadge('remedial_hero');
  }
  
  renderMistakesList();
  updateHeaderStats();
}

// --- PROFILE PROGRESS RENDERING ---
function renderBadges() {
  const container = document.getElementById('profile-badges-grid');
  if (!container) return;
  container.innerHTML = '';
  
  BADGES_LIST.forEach(badge => {
    const isUnlocked = state.unlockedBadges.includes(badge.id);
    const div = document.createElement('div');
    div.className = `badge-item ${isUnlocked ? '' : 'locked'}`;
    div.title = badge.desc;
    
    div.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <span class="badge-name">${badge.title}</span>
    `;
    container.appendChild(div);
  });
}

function renderCharacteristics() {
  const container = document.getElementById('characteristics-unlocked-list');
  if (!container) return;
  container.innerHTML = '';
  
  CHARACTERISTICS_JESUS.forEach(char => {
    const isUnlocked = char.chapters.some(ch => state.completedChapters.includes(ch));
    const card = document.createElement('div');
    card.className = `characteristic-card ${isUnlocked ? '' : 'locked'}`;
    
    if (isUnlocked) {
      card.innerHTML = `
        <div class="char-header">
          <span class="char-title">🔑 ${char.title}</span>
          <span class="char-lock-state" style="color: var(--accent-green);">Unlocked</span>
        </div>
        <p class="char-desc">${char.desc}</p>
        <p class="char-quote">"${char.quote}"</p>
      `;
    } else {
      card.innerHTML = `
        <div class="char-header">
          <span class="char-title" style="color: var(--text-muted);">🔒 Unlocked Characteristic</span>
          <span class="char-lock-state">Locked</span>
        </div>
        <p class="char-desc" style="color: var(--text-muted);">Complete Mark ${char.chapters.join(', ')} to discover this trait of Jesus.</p>
      `;
    }
    container.appendChild(card);
  });
}

// --- SEARCH ENGINE ---
let activeSearchFilter = 'all';

function setSearchFilter(filterType) {
  activeSearchFilter = filterType;
  
  const pills = document.querySelectorAll('.search-filters .filter-pill');
  pills.forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  
  runSearchQuery();
}

function runSearchQuery() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const container = document.getElementById('search-results-container');
  container.innerHTML = '';
  
  if (!query) {
    container.innerHTML = `
      <div class="empty-search-state">
        Type something to search (e.g. Peter, Galilee, preach, baptize)
      </div>
    `;
    return;
  }
  
  let results = [];
  
  // Search only in chapters that the user has unlocked/completed
  // For safety in chapter 1 version, we allow searching Chapter 1
  const searchChapters = [1];
  
  searchChapters.forEach(chId => {
    const chData = CHAPTERS_DATA[chId];
    if (!chData) return;
    
    // Search People
    if (activeSearchFilter === 'all' || activeSearchFilter === 'people') {
      chData.people.forEach(p => {
        if (p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)) {
          results.push({
            type: "People",
            title: `${p.name} (Mark ${chId})`,
            desc: p.desc
          });
        }
      });
    }
    
    // Search Places
    if (activeSearchFilter === 'all' || activeSearchFilter === 'places') {
      chData.places.forEach(pl => {
        if (pl.name.toLowerCase().includes(query) || pl.desc.toLowerCase().includes(query)) {
          results.push({
            type: "Places",
            title: `${pl.name} (Mark ${chId})`,
            desc: pl.desc
          });
        }
      });
    }
    
    // Search Events
    if (activeSearchFilter === 'all' || activeSearchFilter === 'events') {
      chData.keyEvents.forEach(evt => {
        if (evt.title.toLowerCase().includes(query) || evt.desc.toLowerCase().includes(query)) {
          results.push({
            type: "Events",
            title: `${evt.title} (Mark ${chId})`,
            desc: evt.desc
          });
        }
      });
    }
    
    // Search Teachings / Lessons
    if (activeSearchFilter === 'all' || activeSearchFilter === 'teachings') {
      chData.lessons.forEach((l, idx) => {
        if (l.toLowerCase().includes(query)) {
          results.push({
            type: "Teachings",
            title: `Practical Lesson #${idx + 1} (Mark ${chId})`,
            desc: l
          });
        }
      });
    }
  });
  
  if (results.length === 0) {
    container.innerHTML = `
      <div class="empty-search-state">
        No results found for "${query}" matching the selected filter. Try another keyword.
      </div>
    `;
    return;
  }
  
  results.forEach(res => {
    const card = document.createElement('div');
    card.className = 'search-result-card';
    card.innerHTML = `
      <div class="result-type-tag">${res.type}</div>
      <h4 class="result-title">${res.title}</h4>
      <p class="result-desc">${res.desc}</p>
    `;
    container.appendChild(card);
  });
}

// --- WHATSAPP SHARING ---
function shareProgressWhatsApp() {
  const currentCh = state.currentChapterId;
  const progress = state.chapterProgress[currentCh] || { quizScore: 0 };
  const starsStr = '★'.repeat(progress.stars) + '☆'.repeat(5 - progress.stars);
  
  const text = `📖 I just completed *Mark Chapter ${currentCh} : ${CHAPTERS_DATA[currentCh].title}* in the *"Mark: Know Jesus"* app! \n\n🎯 Quiz Score: *${progress.quizScore}%* (${starsStr}) \n⭐ Level: *${getLevelName(state.level)}*\n🔥 Daily Streak: *${state.streak} days*\n\nJoin me in studying the Gospel of Mark deeply through summaries, games, and quizzes!`;
  
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function shareGeneralProgress() {
  const completedCount = state.completedChapters.length;
  const text = `✝️ I am learning the Gospel of Mark on the *"Mark: Know Jesus"* mobile app!\n\n🏆 XP: *${state.xp}*\n⭐ Level: *${getLevelName(state.level)}*\n📖 Completed Chapters: *${completedCount} / 16*\n🔥 Daily Streak: *${state.streak} days*\n\nExplore interactive Bible quizzes and timeline games. Get started today!`;
  
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// --- INITIALIZE ON LOAD ---
window.onload = () => {
  loadState();
};
