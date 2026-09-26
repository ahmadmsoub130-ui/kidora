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

          <h3>
            ${game.titleAr || game.title}
          </h3>

          <p>
            ${game.description}
          </p>

          <div class="game-card-bottom">

            <span>
              🎮 متصفح
            </span>

            <span>
              ⭐ جديد
            </span>

          </div>

        </div>

      </article>
    `;
  }


  function attachGameButtons() {

    document
      .querySelectorAll(".play-game")
      .forEach(button => {

        button.addEventListener(
          "click",
          event => {

            event.stopPropagation();

            const id =
              Number(
                button.dataset.gameId
              );

            window.location.href =
              `game.html?id=${id}`;

          }
        );

      });

  }


  function renderGames(list, element) {

    if (!element) return;

    if (!list.length) {

      element.innerHTML = `

        <div class="empty-games">

          <div>
            🔍
          </div>

          <h3>
            لم نجد ألعابًا
          </h3>

          <p>
            جرّب البحث بكلمة أخرى.
          </p>

        </div>

      `;

      return;
    }


    element.innerHTML =
      list
        .map(createGameCard)
        .join("");


    attachGameButtons();

  }


  function renderHome() {

    const featured =
      GAMES.filter(
        game => game.featured
      );


    const newest =
      [...GAMES]
        .reverse()
        .slice(0, 6);


    renderGames(
      featured,
      gamesGrid
    );


    renderGames(
      newest,
      newGamesGrid
    );

  }


  function filterGames() {

    const value =
      searchInput.value
        .trim()
        .toLowerCase();


    if (!value) {

      renderHome();

      return;

    }


    const results =
      GAMES.filter(game => {

        const text = `

          ${game.title}

          ${game.titleAr}

          ${game.description}

          ${categoryNames[game.category] || ""}

        `.toLowerCase();


        return text.includes(value);

      });


    renderGames(
      results,
      gamesGrid
    );


    if (newGamesGrid) {

      newGamesGrid.innerHTML =
        "";

    }


    document
      .getElementById("games")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      filterGames
    );

  }


  if (
    searchButton &&
    searchInput
  ) {

    searchButton.addEventListener(
      "click",
      () => {

        searchInput.focus();

        document
          .querySelector(
            ".search-section"
          )
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  }


  document
    .querySelectorAll(
      ".category-card"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const category =
            button.dataset.category;


          const results =
            GAMES.filter(
              game =>
                game.category ===
                category
            );


          renderGames(
            results,
            gamesGrid
          );


          if (newGamesGrid) {

            newGamesGrid.innerHTML =
              "";

          }


          document
            .getElementById("games")
            ?.scrollIntoView({
              behavior: "smooth"
            });

        }
      );

    });


  if (showAllButton) {

    showAllButton.addEventListener(
      "click",
      () => {

        renderGames(
          GAMES,
          gamesGrid
        );


        if (newGamesGrid) {

          newGamesGrid.innerHTML =
            "";

        }


        document
          .getElementById("games")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  }


  if (
    loginButton &&
    loginModal
  ) {

    loginButton.addEventListener(
      "click",
      () => {

        loginModal.classList.add(
          "active"
        );

        loginModal.setAttribute(
          "aria-hidden",
          "false"
        );

      }
    );

  }


  if (
    closeLogin &&
    loginModal
  ) {

    closeLogin.addEventListener(
      "click",
      () => {

        loginModal.classList.remove(
          "active"
        );

        loginModal.setAttribute(
          "aria-hidden",
          "true"
        );

      }
    );

  }


  if (loginModal) {

    loginModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          loginModal
        ) {

          loginModal.classList.remove(
            "active"
          );

          loginModal.setAttribute(
            "aria-hidden",
            "true"
          );

        }

      }
    );

  }


  renderHome();


  const year =
    document.getElementById(
      "year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

});
