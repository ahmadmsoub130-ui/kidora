document.addEventListener("DOMContentLoaded", () => {

  const gamesGrid = document.getElementById("gamesGrid");
  const newGamesGrid = document.getElementById("newGamesGrid");
  const searchInput = document.getElementById("gameSearch");
  const year = document.getElementById("year");

  const loginButton = document.getElementById("loginButton");
  const loginModal = document.getElementById("loginModal");
  const closeLogin = document.getElementById("closeLogin");

  year.textContent = new Date().getFullYear();

  let currentGames = [...GAMES];

  /* =========================
     GAME CARDS
  ========================= */

  function renderGames(list, target) {

    if (!target) return;

    if (!list.length) {
      target.innerHTML = `
        <div class="empty-games">
          لا توجد ألعاب مطابقة لبحثك.
        </div>
      `;
      return;
    }

    target.innerHTML = list.map(game => `
      <article class="game-card" data-id="${game.id}">

        <div class="game-image">
          ${game.icon}
        </div>

        <div class="game-info">

          <div class="game-title">
            ${game.title}
          </div>

          <div class="game-description">
            ${game.description}
          </div>

          <div class="game-meta">

            <span class="game-category">
              ${getCategoryName(game.category)}
            </span>

            <span class="play-label">
              ▶ العب الآن
            </span>

          </div>

        </div>

      </article>
    `).join("");

    target.querySelectorAll(".game-card").forEach(card => {
      card.addEventListener("click", () => {

        const id = Number(card.dataset.id);
        const game = GAMES.find(item => item.id === id);

        if (game) {
          openGame(game);
        }

      });
    });
  }


  function getCategoryName(category) {

    const names = {
      action: "أكشن",
      racing: "سباقات",
      puzzle: "ألغاز",
      sports: "رياضة",
      arcade: "أركيد",
      strategy: "استراتيجية",
      adventure: "مغامرات",
      casual: "خفيفة"
    };

    return names[category] || "ألعاب";
  }


  /* =========================
     INITIAL DISPLAY
  ========================= */

  renderGames(
    GAMES.slice(0, 8),
    gamesGrid
  );

  renderGames(
    GAMES.slice().reverse().slice(0, 8),
    newGamesGrid
  );


  /* =========================
     SEARCH
  ========================= */

  if (searchInput) {

    searchInput.addEventListener("input", () => {

      const query =
        searchInput.value
          .trim()
          .toLowerCase();

      if (!query) {

        renderGames(
          GAMES.slice(0, 8),
          gamesGrid
        );

        renderGames(
          GAMES.slice().reverse().slice(0, 8),
          newGamesGrid
        );

        return;
      }

      const results = GAMES.filter(game => {

        return (
          game.title.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query) ||
          getCategoryName(game.category).includes(query)
        );

      });

      renderGames(results, gamesGrid);

      if (newGamesGrid) {
        newGamesGrid.innerHTML = "";
      }

    });

  }


  /* =========================
     CATEGORY FILTER
  ========================= */

  document.querySelectorAll(".category-card")
    .forEach(button => {

      button.addEventListener("click", () => {

        const category =
          button.dataset.category;

        const results =
          GAMES.filter(
            game => game.category === category
          );

        renderGames(results, gamesGrid);

        document
          .getElementById("games")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      });

    });


  /* =========================
     SHOW ALL
  ========================= */

  const showAll =
    document.getElementById("showAllGames");

  if (showAll) {

    showAll.addEventListener("click", () => {

      renderGames(
        GAMES,
        gamesGrid
      );

      document
        .getElementById("games")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    });

  }


  /* =========================
     LOGIN MODAL
  ========================= */

  function openLogin() {

    if (!loginModal) return;

    loginModal.classList.add("active");
    loginModal.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  function closeLoginModal() {

    if (!loginModal) return;

    loginModal.classList.remove("active");
    loginModal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  if (loginButton) {
    loginButton.addEventListener(
      "click",
      openLogin
    );
  }

  if (closeLogin) {
    closeLogin.addEventListener(
      "click",
      closeLoginModal
    );
  }

  if (loginModal) {

    loginModal.addEventListener(
      "click",
      event => {

        if (event.target === loginModal) {
          closeLoginModal();
        }

      }
    );

  }


  /* =========================
     GAME WINDOW
  ========================= */

  function openGame(game) {

    const oldWindow =
      document.getElementById("gameWindow");

    if (oldWindow) {
      oldWindow.remove();
    }

    const overlay =
      document.createElement("div");

    overlay.id = "gameWindow";

    overlay.style.cssText = `
      position:fixed;
      inset:0;
      z-index:5000;
      background:#050811;
      overflow:auto;
      padding:20px;
    `;

    overlay.innerHTML = `

      <div style="
        width:min(1000px,100%);
        margin:auto;
      ">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:15px;
          margin-bottom:18px;
          background:#101827;
          border:1px solid #24344d;
          border-radius:16px;
          padding:14px 18px;
        ">

          <div>

            <div style="
              font-size:12px;
              color:#20d9ff;
              font-weight:800;
            ">
              ODDORA ARCADE
            </div>

            <h2 style="
              margin:3px 0 0;
              font-size:22px;
            ">
              ${game.icon} ${game.title}
            </h2>

          </div>

          <button
            id="closeGame"
            style="
              border:1px solid #30415d;
              background:#182238;
              color:#fff;
              padding:10px 15px;
              border-radius:10px;
              cursor:pointer;
              font-weight:800;
            "
          >
            ✕ خروج
          </button>

        </div>

        <div
          id="gameArea"
          style="
            background:#0b1220;
            border:1px solid #24344d;
            border-radius:20px;
            padding:25px;
            min-height:500px;
          "
        ></div>

      </div>

    `;

    document.body.appendChild(overlay);

    document
      .getElementById("closeGame")
      .addEventListener(
        "click",
        () => overlay.remove()
      );

    startGame(game);

  }


  /* =========================
     GAME ENGINE
  ========================= */

  function startGame(game) {

    const area =
      document.getElementById("gameArea");

    if (!area) return;

    switch (game.type) {

      case "runner":
        startRunner(area, game);
        break;

      case "memory":
        startMemory(area, game);
        break;

      case "tap":
        startTap(area, game);
        break;

      case "math":
        startMath(area, game);
        break;

      case "space":
        startSpace(area, game);
        break;

      case "goal":
        startGoal(area, game);
        break;

      case "color":
        startColor(area, game);
        break;

      case "racing":
        startRacing(area, game);
        break;

      case "quiz":
        startQuiz(area, game);
        break;

      case "box":
        startBox(area, game);
        break;

      default:
        area.innerHTML = `
          <h2>اللعبة غير متاحة حاليًا</h2>
        `;

    }

  }


  /* =========================
     RUNNER
  ========================= */

  function startRunner(area) {

    let score = 0;
    let running = true;

    area.innerHTML = `

      <div style="text-align:center">

        <h2>🏃 Neon Runner</h2>

        <p style="color:#94a3b8">
          اضغط للقفز وتجنب العقبات.
        </p>

        <div style="
          max-width:700px;
          height:300px;
          margin:25px auto;
          background:#060914;
          border:1px solid #273750;
          border-radius:18px;
          position:relative;
          overflow:hidden;
          touch-action:manipulation;
        " id="runnerBoard">

          <div id="runnerPlayer"
            style="
              position:absolute;
              bottom:25px;
              left:70px;
              font-size:45px;
            "
          >
            🏃
          </div>

          <div id="runnerObstacle"
            style="
              position:absolute;
              bottom:25px;
              right:-60px;
              font-size:42px;
            "
          >
            🧱
          </div>

        </div>

        <div style="
          font-size:20px;
          font-weight:900;
        ">
          النقاط:
          <span id="runnerScore">0</span>
        </div>

      </div>

    `;

    const board =
      document.getElementById("runnerBoard");

    const player =
      document.getElementById("runnerPlayer");

    const obstacle =
      document.getElementById("runnerObstacle");

    const scoreElement =
      document.getElementById("runnerScore");

    let jumping = false;
    let jumpHeight = 0;

    function jump() {

      if (jumping || !running) return;

      jumping = true;

      const up =
        setInterval(() => {

          jumpHeight += 7;

          player.style.bottom =
            (25 + jumpHeight) + "px";

          if (jumpHeight >= 110) {

            clearInterval(up);

            const down =
              setInterval(() => {

                jumpHeight -= 7;

                player.style.bottom =
                  (25 + Math.max(0, jumpHeight)) + "px";

                if (jumpHeight <= 0) {

                  clearInterval(down);

                  jumpHeight = 0;
                  jumping = false;

                }

              }, 20);

          }

        }, 20);

    }

    board.addEventListener(
      "pointerdown",
      jump
    );

    let position = -60;

    const timer =
      setInterval(() => {

        if (!running) return;

        position += 6;

        obstacle.style.right =
          position + "px";

        if (position > 760) {

          position = -60;

          score++;

          scoreElement.textContent =
            score;

        }

        const playerBottom =
          parseInt(player.style.bottom || "25");

        if (
          position > 560 &&
          position < 680 &&
          playerBottom < 70
        ) {

          running = false;

          clearInterval(timer);

          area.innerHTML = `
            <div style="
              text-align:center;
              padding:60px 10px;
            ">

              <div style="font-size:70px">
                💥
              </div>

              <h2>
                انتهت اللعبة
              </h2>

              <p style="
                color:#94a3b8;
                margin:10px;
              ">
                نتيجتك: ${score}
              </p>

              <button
                id="restartGame"
                class="primary-button"
              >
                العب مرة أخرى
              </button>

            </div>
          `;

          document
            .getElementById("restartGame")
            .onclick = () => startRunner(area);

        }

      }, 30);

  }


  /* =========================
     MEMORY
  ========================= */

  function startMemory(area) {

    const values = [
      "🍎",
      "🍎",
      "🚀",
      "🚀",
      "⚽",
      "⚽",
      "👾",
      "👾"
    ];

    values.sort(() => Math.random() - .5);

    area.innerHTML = `

      <div style="text-align:center">

        <h2>🧠 Memory Cards</h2>

        <p style="color:#94a3b8">
          طابق البطاقات المتشابهة.
        </p>

        <div id="memoryGrid"
          style="
            max-width:500px;
            margin:25px auto;
            display:grid;
            grid-template-columns:repeat(4,1fr);
            gap:10px;
          "
        ></div>

        <div>
          النقاط:
          <strong id="memoryScore">0</strong>
        </div>

      </div>
    `;

    const grid =
      document.getElementById("memoryGrid");

    let first = null;
    let second = null;
    let locked = false;
    let score = 0;
    let matched = 0;

    values.forEach(value => {

      const card =
        document.createElement("button");

      card.textContent = "❓";

      card.style.cssText = `
        height:90px;
        font-size:30px;
        border-radius:14px;
        border:1px solid #2b3b56;
        background:#141f33;
        color:#fff;
        cursor:pointer;
      `;

      card.dataset.value = value;

      card.onclick = () => {

        if (
          locked ||
          card === first ||
          card.dataset.done
        ) return;

        card.textContent = value;

        if (!first) {

          first = card;
          return;

        }

        second = card;
        locked = true;

        if (
          first.dataset.value ===
          second.dataset.value
        ) {

          first.dataset.done = "true";
          second.dataset.done = "true";

          first.style.opacity = ".5";
          second.style.opacity = ".5";

          matched++;
          score += 10;

          document
            .getElementById("memoryScore")
            .textContent = score;

          first = null;
          second = null;
          locked = false;

          if (matched === values.length / 2) {

            setTimeout(() => {

              alert(
                "أحسنت! نتيجتك: " + score
              );

            }, 200);

          }

        } else {

          setTimeout(() => {

            first.textContent = "❓";
            second.textContent = "❓";

            first = null;
            second = null;
            locked = false;

          }, 650);

        }

      };

      grid.appendChild(card);

    });

  }


  /* =========================
     TAP
  ========================= */

  function startTap(area) {

    let score = 0;
    let time = 10;
    let active = true;

    area.innerHTML = `

      <div style="
        text-align:center;
      ">

        <h2>⚡ Quick Tap</h2>

        <p style="color:#94a3b8">
          لديك 10 ثوانٍ. اضغط بأسرع ما تستطيع.
        </p>

        <div style="
          display:flex;
          justify-content:center;
          gap:30px;
          margin:25px 0;
          font-size:20px;
        ">

          <div>
            الوقت:
            <strong id="tapTime">
              10
            </strong>
          </div>

          <div>
            النقاط:
            <strong id="tapScore">
              0
            </strong>
          </div>

        </div>

        <button
          id="tapButton"
          style="
            width:220px;
            height:220px;
            border-radius:50%;
            border:5px solid #7c5cff;
            background:#141f35;
            color:#fff;
            font-size:35px;
            font-weight:900;
            box-shadow:0 0 60px rgba(124,92,255,.25);
          "
        >
          اضغط!
        </button>

      </div>
    `;

    const button =
      document.getElementById("tapButton");

    button.onclick = () => {

      if (!active) return;

      score++;

      document
        .getElementById("tapScore")
        .textContent = score;

    };

    const timer =
      setInterval(() => {

        time--;

        document
          .getElementById("tapTime")
          .textContent = time;

        if (time <= 0) {

          active = false;

          clearInterval(timer);

          button.disabled = true;

          button.textContent =
            "انتهى!";

          setTimeout(() => {

            alert(
              "نتيجتك: " + score
            );

          }, 200);

        }

      }, 1000);

  }


  /* =========================
     MATH
  ========================= */

  function startMath(area) {

    let score = 0;
    let question = 0;

    function nextQuestion() {

      question++;

      if (question > 10) {

        area.innerHTML = `
          <div style="text-align:center;padding:50px">

            <div style="font-size:60px">
              🏆
            </div>

            <h2>
              انتهى التحدي
            </h2>

            <p>
              نتيجتك: ${score} / 10
            </p>

            <button
              id="mathAgain"
              class="primary-button"
            >
              إعادة اللعب
            </button>

          </div>
        `;

        document
          .getElementById("mathAgain")
          .onclick = () =>
            startMath(area);

        return;
      }

      const a =
        Math.floor(Math.random() * 20) + 1;

      const b =
        Math.floor(Math.random() * 20) + 1;

      const correct = a + b;

      const answers = [
        correct,
        correct + 1,
        correct - 1,
        correct + 3
      ].sort(() => Math.random() - .5);

      area.innerHTML = `

        <div style="
          text-align:center;
          max-width:600px;
          margin:auto;
        ">

          <p style="color:#20d9ff">
            سؤال ${question} من 10
          </p>

          <h2 style="
            font-size:42px;
            margin:25px;
          ">
            ${a} + ${b} = ?
          </h2>

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:12px;
          ">

            ${answers.map(answer => `
              <button
                class="math-answer"
                data-answer="${answer}"
                style="
                  padding:20px;
                  background:#141f33;
                  color:#fff;
                  border:1px solid #2b3b56;
                  border-radius:13px;
                  font-size:20px;
                  font-weight:900;
                "
              >
                ${answer}
              </button>
            `).join("")}

          </div>

          <p style="
            margin-top:20px;
          ">
            النقاط:
            <strong>${score}</strong>
          </p>

        </div>
      `;

      document
        .querySelectorAll(".math-answer")
        .forEach(button => {

          button.onclick = () => {

            if (
              Number(button.dataset.answer) ===
              correct
            ) {

              score++;

            }

            nextQuestion();

          };

        });

    }

    nextQuestion();

  }


  /* =========================
     SPACE
  ========================= */

  function startSpace(area) {

    let score = 0;
    let shots = 0;

    area.innerHTML = `

      <div style="text-align:center">

        <h2>🚀 Space Defender</h2>

        <p style="color:#94a3b8">
          اضغط على الأعداء لتدميرهم.
        </p>

        <div
          id="spaceBoard"
          style="
            max-width:700px;
            height:400px;
            margin:20px auto;
            position:relative;
            overflow:hidden;
            background:
              radial-gradient(circle,#17284a,#050811 70%);
            border:1px solid #293a57;
            border-radius:18px;
          "
        ></div>

        <div>
          النقاط:
          <strong id="spaceScore">0</strong>
        </div>

      </div>

    `;

    const board =
      document.getElementById("spaceBoard");

    const spawn =
      setInterval(() => {

        const enemy =
          document.createElement("button");

        enemy.textContent = "👾";

        enemy.style.cssText = `
          position:absolute;
          top:${Math.random() * 320}px;
          right:-50px;
          border:0;
          background:transparent;
          font-size:38px;
          cursor:pointer;
        `;

        board.appendChild(enemy);

        let x = -50;

        const movement =
          setInterval(() => {

            x += 5;

            enemy.style.right =
              x + "px";

            if (x > 760) {

              clearInterval(movement);
              enemy.remove();

            }

          }, 30);

        enemy.onclick = () => {

          score++;

          document
            .getElementById("spaceScore")
            .textContent = score;

          clearInterval(movement);

          enemy.remove();

        };

      }, 900);

    setTimeout(() => {

      clearInterval(spawn);

      alert(
        "انتهت الجولة! نتيجتك: " + score
      );

    }, 30000);

  }


  /* =========================
     GOAL
  ========================= */

  function startGoal(area) {

    let score = 0;

    area.innerHTML = `

      <div style="text-align:center">

        <h2>⚽ Goal Master</h2>

        <p style="color:#94a3b8">
          اضغط على الكرة لتسجيل الأهداف.
        </p>

        <div
          id="goalBoard"
          style="
            max-width:700px;
            height:360px;
            margin:20px auto;
            background:
              linear-gradient(
                #168044,
                #0c5b31
              );
            border:8px solid #fff;
            border-radius:15px;
            position:relative;
            overflow:hidden;
          "
        >

          <div style="
            position:absolute;
            inset:20% 15%;
            border:3px solid rgba(255,255,255,.7);
          "></div>

          <button
            id="football"
            style="
              position:absolute;
              left:45%;
              top:45%;
              font-size:55px;
              border:0;
              background:transparent;
              cursor:pointer;
            "
          >
            ⚽
          </button>

        </div>

        <h3>
          الأهداف:
          <span id="goalScore">0</span>
        </h3>

      </div>
    `;

    const ball =
      document.getElementById("football");

    ball.onclick = () => {

      score++;

      document
        .getElementById("goalScore")
        .textContent = score;

      ball.style.left =
        Math.random() * 80 + "%";

      ball.style.top =
        Math.random() * 70 + "%";

    };

  }


  /* =========================
     COLOR
  ========================= */

  function startColor(area) {

    const colors = [
      ["أحمر", "#ef4444"],
      ["أزرق", "#3b82f6"],
      ["أخضر", "#22c55e"],
      ["أصفر", "#eab308"]
    ];

    let score = 0;
    let round = 0;

    function next() {

      round++;

      if (round > 10) {

        area.innerHTML = `
          <div style="
            text-align:center;
            padding:50px;
          ">

            <h2>
              🎨 انتهى التحدي
            </h2>

            <p>
              نتيجتك: ${score} / 10
            </p>

            <button
              id="colorAgain"
              class="primary-button"
            >
              العب مرة أخرى
            </button>

          </div>
        `;

        document
          .getElementById("colorAgain")
          .onclick = () =>
            startColor(area);

        return;

      }

      const target =
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ];

      const choices =
        [...colors]
          .sort(() => Math.random() - .5);

      area.innerHTML = `

        <div style="
          text-align:center;
          max-width:600px;
          margin:auto;
        ">

          <p style="color:#94a3b8">
            اختر اللون الصحيح
          </p>

          <div style="
            margin:30px;
            font-size:45px;
            font-weight:900;
            color:${target[1]};
          ">
            ${target[0]}
          </div>

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:12px;
          ">

            ${choices.map(color => `
              <button
                class="color-choice"
                data-color="${color[0]}"
                style="
                  padding:20px;
                  background:${color[1]};
                  color:#fff;
                  border:0;
                  border-radius:14px;
                  font-weight:900;
                "
              >
                ${color[0]}
              </button>
            `).join("")}

          </div>

          <p style="margin-top:20px">
            النقاط: ${score}
          </p>

        </div>
      `;

      document
        .querySelectorAll(".color-choice")
        .forEach(button => {

          button.onclick = () => {

            if (
              button.dataset.color ===
              target[0]
            ) {

              score++;

            }

            next();

          };

        });

    }

    next();

  }


  /* =========================
     RACING
  ========================= */

  function startRacing(area) {

    let score = 0;
    let running = true;

    area.innerHTML = `

      <div style="text-align:center">

        <h2>🏎️ Fast Racer</h2>

        <p style="color:#94a3b8">
          اضغط يمين أو يسار لتحريك السيارة.
        </p>

        <div
          id="raceBoard"
          style="
            max-width:500px;
            height:500px;
            margin:20px auto;
            background:
              repeating-linear-gradient(
                90deg,
                #222 0,
                #222 45%,
                #333 45%,
                #333 55%,
                #222 55%,
                #222 100%
              );
            position:relative;
            overflow:hidden;
            border-radius:18px;
          "
        >

          <div
            id="raceCar"
            style="
              position:absolute;
              bottom:25px;
              left:45%;
              font-size:45px;
            "
          >
            🏎️
          </div>

        </div>

        <div>
          النقاط:
          <strong id="raceScore">0</strong>
        </div>

      </div>
    `;

    const car =
      document.getElementById("raceCar");

    const board =
      document.getElementById("raceBoard");

    let left = 45;

    function move(direction) {

      if (!running) return;

      if (direction === "left") {
        left -= 5;
      } else {
        left += 5;
      }

      left =
        Math.max(5, Math.min(85, left));

      car.style.left =
        left + "%";

    }

    board.addEventListener(
      "pointerdown",
      event => {

        const rect =
          board.getBoundingClientRect();

        if (
          event.clientX <
          rect.left + rect.width / 2
        ) {

          move("left");

        } else {

          move("right");

        }

        score++;

        document
          .getElementById("raceScore")
          .textContent = score;

      }
    );

    setTimeout(() => {

      running = false;

      alert(
        "انتهى السباق! نتيجتك: " + score
      );

    }, 30000);

  }


  /* =========================
     QUIZ
  ========================= */

  function startQuiz(area) {

    const questions = [
      {
        q: "ما هي عاصمة فرنسا؟",
        a: ["لندن", "باريس", "روما", "مدريد"],
        correct: "باريس"
      },
      {
        q: "كم عدد أيام الأسبوع؟",
        a: ["5", "6", "7", "8"],
        correct: "7"
      },
      {
        q: "ما هو الكوكب المعروف بالكوكب الأحمر؟",
        a: ["الأرض", "المريخ", "زحل", "الزهرة"],
        correct: "المريخ"
      },
      {
        q: "كم عدد القارات؟",
        a: ["5", "6", "7", "8"],
        correct: "7"
      },
      {
        q: "ما هو أكبر محيط؟",
        a: ["الأطلسي", "الهندي", "الهادئ", "المتجمد"],
        correct: "الهادئ"
      }
    ];

    let index = 0;
    let score = 0;

    function render() {

      if (index >= questions.length) {

        area.innerHTML = `
          <div style="
            text-align:center;
            padding:50px;
          ">

            <div style="font-size:65px">
              🏆
            </div>

            <h2>
              انتهى الاختبار
            </h2>

            <p>
              نتيجتك:
              ${score} / ${questions.length}
            </p>

            <button
              id="quizAgain"
              class="primary-button"
            >
              إعادة اللعب
            </button>

          </div>
        `;

        document
          .getElementById("quizAgain")
          .onclick = () => startQuiz(area);

        return;

      }

      const item =
        questions[index];

      area.innerHTML = `

        <div style="
          max-width:650px;
          margin:auto;
          text-align:center;
        ">

          <div style="
            color:#20d9ff;
            font-size:13px;
            font-weight:900;
          ">
            السؤال ${index + 1}
            من
            ${questions.length}
          </div>

          <h2 style="
            margin:25px 0;
            font-size:28px;
          ">
            ${item.q}
          </h2>

          <div style="
            display:grid;
            gap:12px;
          ">

            ${item.a.map(answer => `
              <button
                class="quiz-answer"
                data-answer="${answer}"
                style="
                  padding:16px;
                  border-radius:13px;
                  border:1px solid #2a3a55;
                  background:#141f33;
                  color:#fff;
                  font-weight:800;
                "
              >
                ${answer}
              </button>
            `).join("")}

          </div>

          <p style="margin-top:20px">
            النقاط:
            <strong>${score}</strong>
          </p>

        </div>
      `;

      document
        .querySelectorAll(".quiz-answer")
        .forEach(button => {

          button.onclick = () => {

            if (
              button.dataset.answer ===
              item.correct
            ) {

              score++;

            }

            index++;

            render();

          };

        });

    }

    render();

  }


  /* =========================
     BOX GAME
  ========================= */

  function startBox(area) {

    let score = 0;
    let round = 0;

    function render() {

      round++;

      if (round > 10) {

        area.innerHTML = `
          <div style="
            text-align:center;
            padding:50px;
          ">

            <div style="font-size:60px">
              🎁
            </div>

            <h2>
              انتهت اللعبة
            </h2>

            <p>
              نتيجتك: ${score}
            </p>

            <button
              id="boxAgain"
              class="primary-button"
            >
              إعادة اللعب
            </button>

          </div>
        `;

        document
          .getElementById("boxAgain")
          .onclick = () =>
            startBox(area);

        return;

      }

      const winningBox =
        Math.floor(Math.random() * 3);

      area.innerHTML = `

        <div style="
          text-align:center;
          max-width:650px;
          margin:auto;
        ">

          <h2>🎁 Lucky Box</h2>

          <p style="
            color:#94a3b8;
            margin:10px;
          ">
            اختر صندوقًا واحدًا.
          </p>

          <div style="
            display:grid;
            grid-template-columns:repeat(3,1fr);
            gap:15px;
            margin-top:30px;
          ">

            ${[0,1,2].map(i => `
              <button
                class="lucky-box"
                data-box="${i}"
                style="
                  height:150px;
                  border:1px solid #334665;
                  border-radius:18px;
                  background:#17243a;
                  color:#fff;
                  font-size:55px;
                "
              >
                🎁
              </button>
            `).join("")}

          </div>

          <p style="margin-top:20px">
            النقاط:
            ${score}
          </p>

        </div>
      `;

      document
        .querySelectorAll(".lucky-box")
        .forEach(button => {

          button.onclick = () => {

            const chosen =
              Number(button.dataset.box);

            if (chosen === winningBox) {

              score += 10;

              button.textContent = "💎";

            } else {

              button.textContent = "💨";

            }

            setTimeout(render, 500);

          };

        });

    }

    render();

  }

});
