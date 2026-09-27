document.addEventListener("DOMContentLoaded", function () {

  const storiesGrid = document.getElementById("storiesGrid");
  const searchInput = document.getElementById("storySearch");
  const languageButton = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const categoryButtons = document.querySelectorAll("[data-category]");
  const yearElements = document.querySelectorAll("[data-year]");

  let language = localStorage.getItem("kidora_lang") || "ar";
  let currentCategory = "all";
  let searchText = "";

  function escapeHTML(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function updateLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    if (languageButton) {
      languageButton.textContent = language === "ar" ? "English" : "العربية";
    }

    if (searchInput) {
      searchInput.placeholder =
        language === "ar"
          ? "ابحث عن قصة..."
          : "Search for a story...";
    }

    renderStories();
  }

  function renderStories() {

    if (!storiesGrid) return;

    if (!Array.isArray(STORIES) || STORIES.length === 0) {
      storiesGrid.innerHTML = `
        <div style="text-align:center;padding:40px;">
          <h3>لا توجد قصص</h3>
          <p>لم يتم تحميل ملف القصص.</p>
        </div>
      `;
      return;
    }

    const filteredStories = STORIES.filter(function (story) {

      const categoryMatch =
        currentCategory === "all" ||
        story.cat === currentCategory;

      const title =
        story.title?.[language] ||
        story.title?.ar ||
        "";

      const description =
        story.desc?.[language] ||
        story.desc?.ar ||
        "";

      const searchMatch =
        !searchText ||
        title.toLowerCase().includes(searchText.toLowerCase()) ||
        description.toLowerCase().includes(searchText.toLowerCase());

      return categoryMatch && searchMatch;
    });

    if (filteredStories.length === 0) {

      storiesGrid.innerHTML = `
        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:50px 20px;
        ">
          <div style="font-size:50px;">📚</div>
          <h3>
            ${language === "ar" ? "لم نجد هذه القصة" : "No stories found"}
          </h3>
          <p>
            ${
              language === "ar"
                ? "جرب البحث عن قصة أخرى."
                : "Try another search."
            }
          </p>
        </div>
      `;

      return;
    }

    storiesGrid.innerHTML = filteredStories.map(function (story) {

      const title =
        story.title?.[language] ||
        story.title?.ar ||
        "Story";

      const description =
        story.desc?.[language] ||
        story.desc?.ar ||
        "";

      return `
        <article class="story-card">

          <div class="story-card-icon">
            ${escapeHTML(story.icon || "📖")}
          </div>

          <div class="story-card-content">

            <div class="story-category">
              ${escapeHTML(story.cat)}
            </div>

            <h3>
              ${escapeHTML(title)}
            </h3>

            <p>
              ${escapeHTML(description)}
            </p>

            <div class="story-card-bottom">

              <span>
                ⏱️ ${escapeHTML(story.time || "3 min")}
              </span>

              <a
                href="game.html?story=${encodeURIComponent(story.id)}"
                class="read-story"
                data-story="${escapeHTML(story.id)}"
              >
                ${language === "ar" ? "اقرأ القصة →" : "Read story →"}
              </a>

            </div>

          </div>

        </article>
      `;

    }).join("");

    document.querySelectorAll("[data-story]").forEach(function (link) {

      link.addEventListener("click", function () {

        const storyId = this.getAttribute("data-story");

        localStorage.setItem("kidora_last_story", storyId);
        localStorage.setItem("kidora_last_page", "0");

      });

    });
  }

  if (searchInput) {

    searchInput.addEventListener("input", function () {
      searchText = this.value.trim();
      renderStories();
    });

  }

  categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      currentCategory =
        this.getAttribute("data-category") || "all";

      categoryButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      this.classList.add("active");

      renderStories();

    });

  });

  if (languageButton) {

    languageButton.addEventListener("click", function () {

      language = language === "ar" ? "en" : "ar";

      localStorage.setItem("kidora_lang", language);

      updateLanguage();

    });

  }

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
      });

    });

  }

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  updateLanguage();

});
