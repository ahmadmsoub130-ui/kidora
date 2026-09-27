/* =========================================================
   ODDORA - APP.JS
   Main site controller
   ========================================================= */

(function () {
  "use strict";

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  /* ---------------------------------------------------------
     STORAGE
  --------------------------------------------------------- */

  const STORAGE = {
    language: "oddora_language",
    theme: "oddora_theme",
    sound: "oddora_sound",
    lastPage: "oddora_last_page"
  };

  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  function load(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (e) {
      return fallback;
    }
  }

  /* ---------------------------------------------------------
     INITIALIZATION
  --------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initSearch();
    initGameCards();
    initModals();
    initButtons();
    initScrollEffects();
    initRevealAnimations();
    initLanguage();
    initSound();
    initTheme();
    updateYear();

    document.body.classList.add("app-ready");
  });

  /* ---------------------------------------------------------
     NAVIGATION
  --------------------------------------------------------- */

  function initNavigation() {
    const menuButton =
      $("#menuBtn") ||
      $(".menu-btn") ||
      $("[data-menu]");

    const nav =
      $("nav") ||
      $(".nav-links") ||
      $(".navigation");

    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuButton.classList.toggle("active");
        document.body.classList.toggle("menu-open");
      });
    }

    $$("a[href^='#']").forEach(link => {
      link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = $(targetId);

        if (target) {
          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

          if (nav) {
            nav.classList.remove("active");
          }

          if (menuButton) {
            menuButton.classList.remove("active");
          }

          document.body.classList.remove("menu-open");
        }
      });
    });

    $$("[data-page]").forEach(link => {
      link.addEventListener("click", () => {
        save(STORAGE.lastPage, link.dataset.page);
      });
    });
  }

  /* ---------------------------------------------------------
     SEARCH
  --------------------------------------------------------- */

  function initSearch() {
    const searchInput =
      $("#searchInput") ||
      $(".search-input") ||
      $('input[type="search"]');

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();

      const cards =
        $$(".game-card") ||
        [];

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();

        if (!query || text.includes(query)) {
          card.style.display = "";
          card.classList.remove("search-hidden");
        } else {
          card.style.display = "none";
          card.classList.add("search-hidden");
        }
      });
    });

    searchInput.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));
        searchInput.blur();
      }
    });
  }

  /* ---------------------------------------------------------
     GAME CARDS
  --------------------------------------------------------- */

  function initGameCards() {
    $$(".game-card").forEach(card => {
      card.addEventListener("click", event => {
        const interactive =
          event.target.closest("a, button");

        if (interactive) return;

        const link =
          card.querySelector("a") ||
          card.dataset.url;

        if (typeof link === "string" && link) {
          window.location.href = link;
        }
      });
    });

    $$("[data-game]").forEach(element => {
      element.addEventListener("click", () => {
        const game = element.dataset.game;

        if (!game) return;

        save("oddora_last_game", game);
      });
    });
  }

  /* ---------------------------------------------------------
     MODALS
  --------------------------------------------------------- */

  function initModals() {
    $$("[data-modal-open]").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.modalOpen;
        const modal = document.getElementById(id);

        if (modal) {
          openModal(modal);
        }
      });
    });

    $$("[data-modal-close]").forEach(button => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal");

        if (modal) {
          closeModal(modal);
        }
      });
    });

    $$(".modal").forEach(modal => {
      modal.addEventListener("click", event => {
        if (event.target === modal) {
          closeModal(modal);
        }
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        $$(".modal.active, .modal.open").forEach(modal => {
          closeModal(modal);
        });
      }
    });
  }

  function openModal(modal) {
    modal.classList.add("active");
    modal.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  /* ---------------------------------------------------------
     BUTTONS
  --------------------------------------------------------- */

  function initButtons() {
    $$("[data-scroll]").forEach(button => {
      button.addEventListener("click", () => {
        const target = $(button.dataset.scroll);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });

    $$("[data-copy]").forEach(button => {
      button.addEventListener("click", async () => {
        const text = button.dataset.copy;

        if (!text) return;

        try {
          await navigator.clipboard.writeText(text);

          const oldText = button.textContent;
          button.textContent = "Copied";

          setTimeout(() => {
            button.textContent = oldText;
          }, 1500);
        } catch (error) {
          console.warn("Copy failed:", error);
        }
      });
    });
  }

  /* ---------------------------------------------------------
     SCROLL EFFECTS
  --------------------------------------------------------- */

  function initScrollEffects() {
    const header =
      $("header") ||
      $(".site-header") ||
      $(".header");

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener(
      "scroll",
      () => {
        const current = window.scrollY;

        if (current > 30) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }

        if (current > lastScroll && current > 150) {
          header.classList.add("scroll-down");
        } else {
          header.classList.remove("scroll-down");
        }

        lastScroll = current;
      },
      { passive: true }
    );
  }

  /* ---------------------------------------------------------
     REVEAL ANIMATIONS
  --------------------------------------------------------- */

  function initRevealAnimations() {
    const elements = $$(
      ".game-card, .category-card, .feature-card, .section-title, .hero-content, .cta"
    );

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(element => {
        element.classList.add("visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    elements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }

  /* ---------------------------------------------------------
     LANGUAGE
  --------------------------------------------------------- */

  function initLanguage() {
    const savedLanguage = load(STORAGE.language, "ar");

    setLanguage(savedLanguage);

    $$("[data-language]").forEach(button => {
      button.addEventListener("click", () => {
        const language = button.dataset.language;

        if (language) {
          setLanguage(language);
        }
      });
    });

    const languageToggle =
      $("#languageToggle") ||
      $(".language-toggle");

    if (languageToggle) {
      languageToggle.addEventListener("click", () => {
        const current = load(STORAGE.language, "ar");
        const next = current === "ar" ? "en" : "ar";

        setLanguage(next);
      });
    }
  }

  function setLanguage(language) {
    if (language !== "ar" && language !== "en") {
      language = "ar";
    }

    save(STORAGE.language, language);

    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    document.body.classList.toggle(
      "language-ar",
      language === "ar"
    );

    document.body.classList.toggle(
      "language-en",
      language === "en"
    );

    $$("[data-language]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.language === language
      );
    });

    $$("[data-ar][data-en]").forEach(element => {
      element.textContent =
        language === "ar"
          ? element.dataset.ar
          : element.dataset.en;
    });

    updateLanguageLabels(language);
  }

  function updateLanguageLabels(language) {
    const toggle =
      $("#languageToggle") ||
      $(".language-toggle");

    if (!toggle) return;

    const label =
      toggle.querySelector("[data-language-label]");

    if (label) {
      label.textContent =
        language === "ar" ? "English" : "العربية";
    }
  }

  /* ---------------------------------------------------------
     SOUND
  --------------------------------------------------------- */

  function initSound() {
    const savedSound = load(STORAGE.sound, "off");

    document.body.dataset.sound = savedSound;

    $$("[data-sound]").forEach(button => {
      button.addEventListener("click", () => {
        const current =
          load(STORAGE.sound, "off");

        const next =
          current === "on" ? "off" : "on";

        save(STORAGE.sound, next);

        document.body.dataset.sound = next;

        updateSoundButtons(next);
      });
    });

    updateSoundButtons(savedSound);
  }

  function updateSoundButtons(state) {
    $$("[data-sound]").forEach(button => {
      button.classList.toggle(
        "active",
        state === "on"
      );

      const text =
        button.querySelector("[data-sound-label]");

      if (text) {
        text.textContent =
          state === "on"
            ? "Sound ON"
            : "Sound OFF";
      }
    });
  }

  /* ---------------------------------------------------------
     THEME
  --------------------------------------------------------- */

  function initTheme() {
    const savedTheme =
      load(STORAGE.theme, "dark");

    applyTheme(savedTheme);

    $$("[data-theme]").forEach(button => {
      button.addEventListener("click", () => {
        const current =
          load(STORAGE.theme, "dark");

        const next =
          current === "dark"
            ? "light"
            : "dark";

        applyTheme(next);
      });
    });
  }

  function applyTheme(theme) {
    if (theme !== "light" && theme !== "dark") {
      theme = "dark";
    }

    save(STORAGE.theme, theme);

    document.documentElement.dataset.theme =
      theme;

    document.body.dataset.theme =
      theme;
  }

  /* ---------------------------------------------------------
     YEAR
  --------------------------------------------------------- */

  function updateYear() {
    const year = new Date().getFullYear();

    $$("[data-year]").forEach(element => {
      element.textContent = year;
    });

    const footerYear =
      $("#year") ||
      $(".current-year");

    if (footerYear) {
      footerYear.textContent = year;
    }
  }

  /* ---------------------------------------------------------
     GLOBAL HELPERS
  --------------------------------------------------------- */

  window.ODDORA = {
    openModal,
    closeModal,

    setLanguage,

    setTheme: applyTheme,

    getLanguage() {
      return load(STORAGE.language, "ar");
    },

    getSound() {
      return load(STORAGE.sound, "off");
    },

    save(key, value) {
      save(key, value);
    },

    load(key, fallback) {
      return load(key, fallback);
    }
  };

})();
