// ========================================
// KIDORA - Main App
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const savedLanguage = localStorage.getItem("kidora_lang") || "ar";
  let currentLanguage = savedLanguage;

  // ----------------------------------------
  // Language
  // ----------------------------------------

  function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("kidora_lang", lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-ar][data-en]").forEach(element => {
      element.textContent =
        lang === "ar"
          ? element.getAttribute("data-ar")
          : element.getAttribute("data-en");
    });

    const languageButton = document.getElementById("languageToggle");

    if (languageButton) {
      languageButton.textContent =
        lang === "ar" ? "English" : "العربية";
    }

    renderStories();
    updateSearchPlaceholder();
  }

  function updateSearchPlaceholder() {
    const searchInput = document.getElementById("storySearch");

    if (!searchInput) return;

    searchInput.placeholder =
      currentLanguage === "ar"
        ? "ابحث عن قصة..."
        : "Search for a story...";
  }

  const languageToggle = document.getElementById("languageToggle");

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      setLanguage(currentLanguage === "ar" ? "en" : "ar");
    });
  }

  // ----------------------------------------
  // Story elements
  // ----------------------------------------

  const storiesContainer = document.getElementById("storiesGrid");
  const searchInput = document.getElementById("storySearch");

  let activeCategory = "all";

  // ----------------------------------------
  // Category names
  // ----------------------------------------

  const categoryNames = {
    ar: {
      all: "كل القصص",
      ramadan: "رمضان",
      bedtime: "قبل النوم",
      animals: "الحيوانات",
      adventures: "مغامرات",
      world: "حول العالم",
      learning: "تعلم"
    },

    en: {
      all: "All Stories",
      ramadan: "Ramadan",
      bedtime: "Bedtime",
      animals: "Animals",
      adventures: "Adventures",
      world: "Around the World",
      learning: "Learning"
    }
  };

  // ----------------------------------------
  // Category icons
  // ----------------------------------------

  const categoryIcons = {
    all: "📚",
    ramadan: "🌙",
    bedtime: "😴",
    animals: "🐾",
    adventures: "🗺️",
    world: "🌍",
    learning: "🧠"
  };

  // ----------------------------------------
  // Get category name
  // ----------------------------------------

  function getCategoryName(category) {
    return categoryNames[currentLanguage][category] ||
           categoryNames[currentLanguage].all;
  }

  // ----------------------------------------
  // Render story cards
  // ----------------------------------------

  function renderStories() {

    if (!storiesContainer || typeof STORIES === "undefined") {
      return;
    }

    const searchValue = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    let filteredStories = STORIES.filter(story => {

      const matchesCategory =
        activeCategory === "all" ||
        story.cat === activeCategory;

      const title =
        story.title[currentLanguage].toLowerCase();

      const description =
        story.description[currentLanguage].toLowerCase();

      const matchesSearch =
        !searchValue ||
        title.includes(searchValue) ||
        description.includes(searchValue);

      return matchesCategory && matchesSearch;
    });

    if (filteredStories.length === 0) {

      storiesContainer.innerHTML = `
        <div class="empty-stories">
          <div class="empty-icon">🔎</div>

          <h3>
            ${
              currentLanguage === "ar"
                ? "لم نجد قصة بهذا الاسم"
                : "No story found"
            }
          </h3>

          <p>
            ${
              currentLanguage === "ar"
                ? "جرّب البحث بكلمة أخرى."
                : "Try searching with another word."
            }
          </p>
        </div>
      `;

      return;
    }

    storiesContainer.innerHTML = filteredStories
      .map(createStoryCard)
      .join("");

    attachStoryButtons();
  }

  // ----------------------------------------
  // Create story card
  // ----------------------------------------

  function createStoryCard(story) {

    const title = story.title[currentLanguage];
    const description = story.description[currentLanguage];

    const readText =
      currentLanguage === "ar"
        ? "اقرأ القصة"
        : "Read Story";

    const minuteText =
      currentLanguage === "ar"
        ? `${story.time} دقائق`
        : `${story.time} min`;

    return `
      <article
        class="story-card"
        data-story-id="${story.id}"
      >

        <div class="story-icon">
          ${story.icon}
        </div>

        <div class="story-card-content">

          <div class="story-category">
            ${categoryIcons[story.cat] || "📖"}
            ${getCategoryName(story.cat)}
          </div>

          <h3>
            ${escapeHTML(title)}
          </h3>

          <p>
            ${escapeHTML(description)}
          </p>

          <div class="story-card-bottom">

            <span class="story-time">
              ⏱️ ${minuteText}
            </span>

            <button
              class="read-story-btn"
              data-story="${story.id}"
              type="button"
            >
              ${readText}
            </button>

          </div>

        </div>

      </article>
    `;
  }

  // ----------------------------------------
  // Open story
  // ----------------------------------------

  function attachStoryButtons() {

    document.querySelectorAll("[data-story]").forEach(button => {

      button.addEventListener("click", () => {

        const storyId = button.getAttribute("data-story");

        if (!storyId) return;

        localStorage.setItem(
          "kidora_last_story",
          storyId
        );

        localStorage.setItem(
          "kidora_last_page",
          "0"
        );

        window.location.href =
          `game.html?story=${encodeURIComponent(storyId)}`;
      });

    });
  }

  // ----------------------------------------
  // Search
  // ----------------------------------------

  if (searchInput) {

    searchInput.addEventListener("input", () => {
      renderStories();
    });

  }

  // ----------------------------------------
  // Category buttons
  // ----------------------------------------

  document.querySelectorAll("[data-category]").forEach(button => {

    button.addEventListener("click", () => {

      activeCategory =
        button.getAttribute("data-category") || "all";

      document.querySelectorAll("[data-category]").forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      renderStories();

      const storiesSection =
        document.getElementById("stories");

      if (storiesSection) {
        storiesSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });

  });

  // ----------------------------------------
  // Mobile menu
  // ----------------------------------------

  const menuButton =
    document.getElementById("menuToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      mobileMenu.classList.toggle("open");

    });

    mobileMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
        });

      });
  }

  // ----------------------------------------
  // Continue reading
  // ----------------------------------------

  function setupContinueReading() {

    const lastStory =
      localStorage.getItem("kidora_last_story");

    const continueBox =
      document.getElementById("continueReading");

    if (!lastStory || !continueBox) return;

    const story =
      STORIES.find(item => item.id === lastStory);

    if (!story) return;

    const title =
      story.title[currentLanguage];

    const text =
      currentLanguage === "ar"
        ? "تابع قصتك"
        : "Continue reading";

    continueBox.innerHTML = `
      <div class="continue-icon">
        ${story.icon}
      </div>

      <div class="continue-info">

        <small>
          ${text}
        </small>

        <strong>
          ${escapeHTML(title)}
        </strong>

      </div>

      <button
        type="button"
        id="continueStoryButton"
      >
        ${
          currentLanguage === "ar"
            ? "متابعة"
            : "Continue"
        }
      </button>
    `;

    continueBox.style.display = "flex";

    const continueButton =
      document.getElementById("continueStoryButton");

    if (continueButton) {

      continueButton.addEventListener("click", () => {

        window.location.href =
          `game.html?story=${encodeURIComponent(lastStory)}`;

      });

    }
  }

  // ----------------------------------------
  // Escape HTML
  // ----------------------------------------

  function escapeHTML(value) {

    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ----------------------------------------
  // Current year
  // ----------------------------------------

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // ----------------------------------------
  // Initial setup
  // ----------------------------------------

  setLanguage(currentLanguage);

  setupContinueReading();

});
