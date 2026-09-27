/* =========================================================
   ODDORA GAMES
   Real browser games registry
   ========================================================= */

"use strict";

const ODDORA_GAMES = [

  {
    id: "snake",
    title: "Snake Arena",
    titleAr: "ساحة الثعبان",
    category: "arcade",
    categoryAr: "أركيد",
    description: "Eat, grow and survive as long as possible.",
    descriptionAr: "كل الطعام، كبر قدر الإمكان وحاول البقاء لأطول وقت.",
    icon: "🐍",
    difficulty: "Easy",
    difficultyAr: "سهل",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "games/snake/",
    color: "snake"
  },

  {
    id: "neon-runner",
    title: "Neon Runner",
    titleAr: "عدّاء النيون",
    category: "arcade",
    categoryAr: "أركيد",
    description: "Run through a neon world and avoid obstacles.",
    descriptionAr: "اركض داخل عالم النيون وتجنب العقبات.",
    icon: "🏃",
    difficulty: "Medium",
    difficultyAr: "متوسط",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "game.html?game=neon-runner",
    color: "neon"
  },

  {
    id: "space-shooter",
    title: "Space Shooter",
    titleAr: "مقاتل الفضاء",
    category: "action",
    categoryAr: "أكشن",
    description: "Destroy enemies and survive the space attack.",
    descriptionAr: "دمر الأعداء وحاول النجاة من الهجوم الفضائي.",
    icon: "🚀",
    difficulty: "Medium",
    difficultyAr: "متوسط",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "game.html?game=space-shooter",
    color: "space"
  },

  {
    id: "ninja-jump",
    title: "Ninja Jump",
    titleAr: "قفزة النينجا",
    category: "arcade",
    categoryAr: "أركيد",
    description: "Jump over obstacles and reach the highest score.",
    descriptionAr: "اقفز فوق العقبات وحاول تحقيق أعلى نتيجة.",
    icon: "🥷",
    difficulty: "Medium",
    difficultyAr: "متوسط",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "game.html?game=ninja-jump",
    color: "ninja"
  },

  {
    id: "road-racer",
    title: "Road Racer",
    titleAr: "سباق الطريق",
    category: "racing",
    categoryAr: "سباقات",
    description: "Drive fast and avoid traffic.",
    descriptionAr: "قد بسرعة وتجنب السيارات والعقبات.",
    icon: "🏎️",
    difficulty: "Medium",
    difficultyAr: "متوسط",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "game.html?game=road-racer",
    color: "racing"
  },

  {
    id: "brick-breaker",
    title: "Brick Breaker",
    titleAr: "كاسر الطوب",
    category: "arcade",
    categoryAr: "أركيد",
    description: "Break every brick and clear the level.",
    descriptionAr: "حطم جميع الطوب وأنهِ المرحلة.",
    icon: "🧱",
    difficulty: "Easy",
    difficultyAr: "سهل",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "game.html?game=brick-breaker",
    color: "brick"
  },

  {
    id: "flappy-challenge",
    title: "Flappy Challenge",
    titleAr: "تحدي الطائر",
    category: "arcade",
    categoryAr: "أركيد",
    description: "Fly through the pipes without crashing.",
    descriptionAr: "حلّق بين الأنابيب بدون أن تصطدم.",
    icon: "🐦",
    difficulty: "Hard",
    difficultyAr: "صعب",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "game.html?game=flappy-challenge",
    color: "flappy"
  },

  {
    id: "2048",
    title: "2048",
    titleAr: "2048",
    category: "puzzle",
    categoryAr: "ألغاز",
    description: "Combine matching numbers and reach 2048.",
    descriptionAr: "ادمج الأرقام المتشابهة وحاول الوصول إلى 2048.",
    icon: "🔢",
    difficulty: "Hard",
    difficultyAr: "صعب",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "game.html?game=2048",
    color: "numbers"
  },

  {
    id: "memory-cards",
    title: "Memory Cards",
    titleAr: "بطاقات الذاكرة",
    category: "puzzle",
    categoryAr: "ألغاز",
    description: "Find matching pairs using your memory.",
    descriptionAr: "اعثر على الأزواج المتطابقة باستخدام ذاكرتك.",
    icon: "🧠",
    difficulty: "Medium",
    difficultyAr: "متوسط",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "game.html?game=memory-cards",
    color: "memory"
  },

  {
    id: "zombie-survival",
    title: "Zombie Survival",
    titleAr: "البقاء ضد الزومبي",
    category: "action",
    categoryAr: "أكشن",
    description: "Survive waves of enemies and stay alive.",
    descriptionAr: "اصمد أمام موجات الأعداء وحاول البقاء حيًا.",
    icon: "🧟",
    difficulty: "Hard",
    difficultyAr: "صعب",
    players: "1 Player",
    playersAr: "لاعب واحد",
    url: "game.html?game=zombie-survival",
    color: "zombie"
  }

];


/* =========================================================
   GAME UTILITIES
   ========================================================= */

function getOddoraGame(id) {
  return ODDORA_GAMES.find(game => game.id === id);
}

function getOddoraGames() {
  return [...ODDORA_GAMES];
}

function getGamesByCategory(category) {
  return ODDORA_GAMES.filter(
    game => game.category === category
  );
}


/* =========================================================
   SAVE SYSTEM
   ========================================================= */

const GAME_STORAGE_KEY = "oddora_game_scores";

function getScores() {
  try {
    return JSON.parse(
      localStorage.getItem(GAME_STORAGE_KEY) || "{}"
    );
  } catch {
    return {};
  }
}

function getGameScore(gameId) {
  const scores = getScores();
  return Number(scores[gameId] || 0);
}

function saveGameScore(gameId, score) {

  if (!gameId) return;

  const scores = getScores();
  const oldScore = Number(scores[gameId] || 0);

  if (Number(score) > oldScore) {
    scores[gameId] = Number(score);

    localStorage.setItem(
      GAME_STORAGE_KEY,
      JSON.stringify(scores)
    );
  }
}

function resetGameScores() {
  localStorage.removeItem(GAME_STORAGE_KEY);
}


/* =========================================================
   LAST PLAYED GAME
   ========================================================= */

function setLastPlayedGame(gameId) {

  if (!gameId) return;

  localStorage.setItem(
    "oddora_last_game",
    gameId
  );
}

function getLastPlayedGame() {

  return localStorage.getItem(
    "oddora_last_game"
  );
}


/* =========================================================
   PLAY GAME
   ========================================================= */

function playOddoraGame(gameId) {

  const game = getOddoraGame(gameId);

  if (!game) {
    console.error(
      "ODDORA: Game not found:",
      gameId
    );
    return;
  }

  setLastPlayedGame(gameId);

  window.location.href = game.url;
}


/* =========================================================
   CREATE GAME CARD
   ========================================================= */

function createGameCard(game, language = "ar") {

  const title =
    language === "en"
      ? game.title
      : game.titleAr;

  const description =
    language === "en"
      ? game.description
      : game.descriptionAr;

  const category =
    language === "en"
      ? game.category
      : game.categoryAr;

  const difficulty =
    language === "en"
      ? game.difficulty
      : game.difficultyAr;

  const players =
    language === "en"
      ? game.players
      : game.playersAr;

  const direction =
    language === "ar"
      ? "rtl"
      : "ltr";

  const card = document.createElement("article");

  card.className =
    "game-card oddora-game-card";

  card.dataset.game =
    game.id;

  card.dataset.category =
    game.category;

  card.innerHTML = `
    <div class="game-card-image ${game.color}">
      <div class="game-icon">
        ${game.icon}
      </div>

      <div class="game-card-overlay">
        <span>${category}</span>
      </div>
    </div>

    <div
      class="game-card-content"
      dir="${direction}"
    >

      <h3>
        ${title}
      </h3>

      <p>
        ${description}
      </p>

      <div class="game-card-meta">

        <span>
          ${difficulty}
        </span>

        <span>
          ${players}
        </span>

      </div>

      <button
        class="game-play-btn"
        type="button"
        data-play-game="${game.id}"
      >
        ${language === "en" ? "PLAY NOW" : "العب الآن"}
      </button>

    </div>
  `;

  return card;
}


/* =========================================================
   RENDER GAMES
   ========================================================= */

function renderOddoraGames(
  container,
  games = ODDORA_GAMES,
  language = "ar"
) {

  if (!container) return;

  container.innerHTML = "";

  games.forEach(game => {

    const card =
      createGameCard(
        game,
        language
      );

    container.appendChild(card);

  });

  container
    .querySelectorAll("[data-play-game]")
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          playOddoraGame(
            button.dataset.playGame
          );

        }
      );

    });
}


/* =========================================================
   SEARCH
   ========================================================= */

function searchOddoraGames(query) {

  const text =
    String(query || "")
      .trim()
      .toLowerCase();

  if (!text) {
    return getOddoraGames();
  }

  return ODDORA_GAMES.filter(game => {

    const searchable = [

      game.id,

      game.title,

      game.titleAr,

      game.description,

      game.descriptionAr,

      game.category,

      game.categoryAr

    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(text);

  });
}


/* =========================================================
   AUTO RENDER
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const container =
      document.querySelector(
        "[data-games]"
      );

    if (!container) return;

    const language =
      localStorage.getItem(
        "oddora_language"
      ) || "ar";

    renderOddoraGames(
      container,
      ODDORA_GAMES,
      language
    );

  }
);


/* =========================================================
   GLOBAL API
   ========================================================= */

window.ODDORA_GAMES =
  ODDORA_GAMES;

window.getOddoraGame =
  getOddoraGame;

window.getOddoraGames =
  getOddoraGames;

window.getGamesByCategory =
  getGamesByCategory;

window.playOddoraGame =
  playOddoraGame;

window.saveGameScore =
  saveGameScore;

window.getGameScore =
  getGameScore;

window.resetGameScores =
  resetGameScores;

window.searchOddoraGames =
  searchOddoraGames;

window.renderOddoraGames =
  renderOddoraGames;

console.log(
  "ODDORA Games loaded:",
  ODDORA_GAMES.length
);
