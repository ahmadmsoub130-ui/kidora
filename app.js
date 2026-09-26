document.addEventListener("DOMContentLoaded", () => {

  const gamesGrid = document.getElementById("gamesGrid");
  const newGamesGrid = document.getElementById("newGamesGrid");
  const searchInput = document.getElementById("gameSearch");
  const showAllButton = document.getElementById("showAllGames");
  const loginButton = document.getElementById("loginButton");
  const loginModal = document.getElementById("loginModal");
  const closeLogin = document.getElementById("closeLogin");
  const searchButton = document.getElementById("searchButton");

  const categoryNames = {
    action: "أكشن",
    racing: "سباقات",
    puzzle: "ألغاز",
    sports: "رياضة",
    arcade: "أركيد",
    strategy: "استراتيجية",
    adventure: "مغامرات",
    casual: "خفيفة"
  };

  function createGameCard(game) {

    return `
      <article class="game-card" data-id="${game.id}">

        <div class="game-image ${game.color || ""}">

          <div class="game-image-icon">
            ${game.icon}
          </div>

          <div class="game-overlay">
            <button
              class="play-game"
              data-game-id="${game.id}"
            >
              ▶ العب الآن
            </button>
          </div>

        </div>

        <div class="game-card-content">

          <div class="game-category">
            ${categoryNames[game.category] || "ألعاب"}
          </div>

          <h3>${game.titleAr || game.title}</h3>

          <p>${game.description}</p>

          <div class="game-card-bottom">
            <span>🎮 متصفح</span>
            <span>⭐ جديد</span>
          </div>

        </div>

      </article>
    `;
  }

  function renderGames(list, element) {

    if (!element) return;

    if (!list.length) {

      element.innerHTML = `
        <div class="empty-games">
          <div>🔍</div>
          <h3>لم نجد ألعابًا</h3>
          <p>جرّب البحث بكلمة أخرى.</p>
        </div>
      `;

      return;
    }

    element.innerHTML = list.map(createGameCard).join("");

    element.querySelectorAll(".play-game").forEach(button => {

      button.addEventListener("click", event => {

        event.stopPropagation();

        const id = Number(button.dataset.gameId);

        const game = GAMES.find(item => item.id === id);

        if (game) {
          openGame(game);
        }

      });

    });

  }

  function renderHome() {

    const featured = GAMES.filter(game => game.featured);

    const newest = [...GAMES]
      .reverse()
      .slice(0, 6);

    renderGames(featured, gamesGrid);
    renderGames(newest, newGamesGrid);
  }

  function filterGames() {

    const value = searchInput.value.trim().toLowerCase();

    if (!value) {

      renderHome();

      return;
    }

    const results = GAMES.filter(game => {

      const text = `
        ${game.title}
        ${game.titleAr}
        ${game.description}
        ${categoryNames[game.category] || ""}
      `.toLowerCase();

      return text.includes(value);

    });

    renderGames(results, gamesGrid);

    if (newGamesGrid) {
      newGamesGrid.innerHTML = "";
    }

    document.getElementById("games")?.scrollIntoView({
      behavior: "smooth"
    });

  }

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      filterGames
    );

  }

  if (searchButton && searchInput) {

    searchButton.addEventListener("click", () => {

      searchInput.focus();

      document
        .querySelector(".search-section")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    });

  }

  document
    .querySelectorAll(".category-card")
    .forEach(button => {

      button.addEventListener("click", () => {

        const category = button.dataset.category;

        const results = GAMES.filter(
          game => game.category === category
        );

        renderGames(results, gamesGrid);

        if (newGamesGrid) {
          newGamesGrid.innerHTML = "";
        }

        document
          .getElementById("games")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      });

    });

  if (showAllButton) {

    showAllButton.addEventListener("click", () => {

      renderGames(GAMES, gamesGrid);

      if (newGamesGrid) {
        newGamesGrid.innerHTML = "";
      }

      document
        .getElementById("games")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    });

  }

  if (loginButton && loginModal) {

    loginButton.addEventListener("click", () => {

      loginModal.classList.add("active");

      loginModal.setAttribute(
        "aria-hidden",
        "false"
      );

    });

  }

  if (closeLogin && loginModal) {

    closeLogin.addEventListener("click", () => {

      loginModal.classList.remove("active");

      loginModal.setAttribute(
        "aria-hidden",
        "true"
      );

    });

  }

  if (loginModal) {

    loginModal.addEventListener("click", event => {

      if (event.target === loginModal) {

        loginModal.classList.remove("active");

        loginModal.setAttribute(
          "aria-hidden",
          "true"
        );

      }

    });

  }

  function openGame(game) {

    const existing = document.getElementById(
      "gamePlayerOverlay"
    );

    if (existing) {
      existing.remove();
    }

    const overlay = document.createElement("div");

    overlay.id = "gamePlayerOverlay";

    overlay.innerHTML = `

      <div class="game-player">

        <div class="game-player-header">

          <div>
            <span class="game-player-category">
              ${categoryNames[game.category] || "ألعاب"}
            </span>

            <h2>${game.titleAr || game.title}</h2>
          </div>

          <button
            class="close-game"
            aria-label="إغلاق اللعبة"
          >
            ×
          </button>

        </div>

        <div class="game-player-content">

          <div class="real-game-area">

            <div class="big-game-icon">
              ${game.icon}
            </div>

            <h2>${game.titleAr || game.title}</h2>

            <p>
              ${game.description}
            </p>

            <button
              class="primary-button start-demo-game"
            >
              ▶ تشغيل اللعبة
            </button>

            <div
              class="demo-game-container"
              hidden
            ></div>

          </div>

        </div>

      </div>

    `;

    document.body.appendChild(overlay);

    document
      .querySelector(".close-game")
      .addEventListener("click", () => {
        overlay.remove();
      });

    document
      .querySelector(".start-demo-game")
      .addEventListener("click", event => {

        const button = event.currentTarget;

        const container =
          document.querySelector(
            ".demo-game-container"
          );

        button.style.display = "none";

        container.hidden = false;

        container.innerHTML = `

          <div class="demo-score">
            النقاط: <strong>0</strong>
          </div>

          <button class="demo-target">
            اضغط هنا!
          </button>

          <p>
            هذه مساحة تشغيل اللعبة.
          </p>

        `;

        const scoreElement =
          container.querySelector(
            ".demo-score strong"
          );

        const target =
          container.querySelector(
            ".demo-target"
          );

        let score = 0;

        target.addEventListener(
          "click",
          () => {

            score++;

            scoreElement.textContent =
              score;

            target.style.transform =
              `translate(
                ${(Math.random() * 160) - 80}px,
                ${(Math.random() * 120) - 60}px
              )`;

          }
        );

      });

  }

  renderHome();

  const year = document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }

});
