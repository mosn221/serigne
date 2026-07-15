"use strict";

/* =========================================================
   ÉLÉMENTS DU DOM
========================================================= */

const header = document.getElementById("header");

const menuToggle = document.getElementById("mobile-nav-toggle");
const menuCloseButton = document.getElementById("mobile-nav-close");
const navigationMenu = document.getElementById("navmenu");
const menuOverlay = document.getElementById("menu-overlay");
const navigationLinks = document.querySelectorAll("#navmenu a");

const scrollTopButton = document.getElementById("scrollTopBtn");
const scrollProgress = document.getElementById("scrollProgress");

const sections = document.querySelectorAll("section[id]");

const revealElements = document.querySelectorAll(".reveal");

const technologyTabs = document.querySelectorAll(".tech-tab");
const technologyPanels = document.querySelectorAll(".tech-panel");


/* =========================================================
   MENU MOBILE
========================================================= */

function openMenu() {
  if (!navigationMenu || !menuOverlay || !menuToggle) {
    return;
  }

  navigationMenu.classList.add("is-open");
  menuOverlay.classList.add("active");
  document.body.classList.add("menu-open");

  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  if (!navigationMenu || !menuOverlay || !menuToggle) {
    return;
  }

  navigationMenu.classList.remove("is-open");
  menuOverlay.classList.remove("active");
  document.body.classList.remove("menu-open");

  menuToggle.setAttribute("aria-expanded", "false");
}

function initializeMobileMenu() {
  if (!menuToggle || !navigationMenu || !menuOverlay) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navigationMenu.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (menuCloseButton) {
    menuCloseButton.addEventListener("click", () => {
      closeMenu();
      menuToggle.focus();
    });
  }

  menuOverlay.addEventListener("click", () => {
    closeMenu();
    menuToggle.focus();
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navigationMenu.classList.contains("is-open")
    ) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });
}


/* =========================================================
   NAVIGATION ACTIVE
========================================================= */

function updateActiveNavigation() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionBottom
    ) {
      currentSectionId = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href");

    link.classList.toggle(
      "active",
      linkTarget === `#${currentSectionId}`
    );
  });
}


/* =========================================================
   BARRE DE PROGRESSION ET HEADER
========================================================= */

function updateScrollProgress() {
  if (!scrollProgress) {
    return;
  }

  const maximumScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    maximumScroll > 0
      ? (window.scrollY / maximumScroll) * 100
      : 0;

  scrollProgress.style.width = `${progress}%`;
}

function updateHeader() {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 20);
}


/* =========================================================
   BOUTON RETOUR EN HAUT
========================================================= */

function updateScrollTopButton() {
  if (!scrollTopButton) {
    return;
  }

  scrollTopButton.classList.toggle("show", window.scrollY > 300);
}

function initializeScrollTopButton() {
  if (!scrollTopButton) {
    return;
  }

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* =========================================================
   GESTION CENTRALISÉE DU SCROLL
========================================================= */

let scrollUpdatePending = false;

function updateScrollInterface() {
  updateHeader();
  updateActiveNavigation();
  updateScrollProgress();
  updateScrollTopButton();

  scrollUpdatePending = false;
}

function requestScrollUpdate() {
  if (scrollUpdatePending) {
    return;
  }

  scrollUpdatePending = true;
  window.requestAnimationFrame(updateScrollInterface);
}

function initializeScrollFeatures() {
  window.addEventListener("scroll", requestScrollUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestScrollUpdate);

  updateScrollInterface();
}


/* =========================================================
   ANIMATIONS D’APPARITION
========================================================= */

function initializeRevealAnimations() {
  if (!revealElements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}


/* =========================================================
   ONGLETS TECHNOLOGIES
========================================================= */

function activateTechnologyTab(selectedTab) {
  const targetId = selectedTab.getAttribute("aria-controls");
  const targetPanel = document.getElementById(targetId);

  if (!targetPanel) {
    return;
  }

  technologyTabs.forEach((tab) => {
    const isSelected = tab === selectedTab;

    tab.classList.toggle("active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
    tab.setAttribute("tabindex", isSelected ? "0" : "-1");
  });

  technologyPanels.forEach((panel) => {
    const isActive = panel === targetPanel;

    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

function initializeTechnologyTabs() {
  if (!technologyTabs.length || !technologyPanels.length) {
    return;
  }

  technologyTabs.forEach((tab, index) => {
    tab.setAttribute(
      "tabindex",
      tab.classList.contains("active") ? "0" : "-1"
    );

    tab.addEventListener("click", () => {
      activateTechnologyTab(tab);
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % technologyTabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex =
          (index - 1 + technologyTabs.length) %
          technologyTabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = technologyTabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      const nextTab = technologyTabs[nextIndex];

      activateTechnologyTab(nextTab);
      nextTab.focus();
    });
  });

  const activeTab =
    document.querySelector(".tech-tab.active") ||
    technologyTabs[0];

  activateTechnologyTab(activeTab);
}


/* =========================================================
   INITIALISATION
========================================================= */

function initializeSite() {
  initializeMobileMenu();
  initializeScrollTopButton();
  initializeScrollFeatures();
  initializeRevealAnimations();
  initializeTechnologyTabs();
}

document.addEventListener("DOMContentLoaded", initializeSite);
