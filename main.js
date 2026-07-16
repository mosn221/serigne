"use strict";
document.documentElement.classList.remove("no-js");

/* =========================================================
   CONFIGURATION
========================================================= */

const MOBILE_BREAKPOINT = 980;
const HEADER_SCROLL_THRESHOLD = 20;
const SCROLL_TOP_THRESHOLD = 300;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const desktopMediaQuery = window.matchMedia(
  `(min-width: ${MOBILE_BREAKPOINT + 1}px)`
);

const navigationSectionMap = {
  expertises: "expertises",
  "cas-usage": "expertises",
  technologies: "technologies",
  projects: "projects",
  collaborer: "collaborer"
};
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
   OUTILS
========================================================= */

function isMobileViewport() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function isMenuOpen() {
  return navigationMenu?.classList.contains("is-open") ?? false;
}


/* =========================================================
   MENU MOBILE
========================================================= */

function updateNavigationAccessibility() {
  if (!navigationMenu || !menuOverlay) {
    return;
  }

  const isDesktop = desktopMediaQuery.matches;
  const menuIsOpen = isMenuOpen();

  navigationMenu.setAttribute(
    "aria-hidden",
    String(!isDesktop && !menuIsOpen)
  );

  menuOverlay.setAttribute(
    "aria-hidden",
    String(!menuIsOpen)
  );
}

function openMenu() {
  if (!navigationMenu || !menuOverlay || !menuToggle) {
    return;
  }

  navigationMenu.classList.add("is-open");
  menuOverlay.classList.add("active");
  document.body.classList.add("menu-open");

  menuToggle.setAttribute("aria-expanded", "true");

  updateNavigationAccessibility();

  if (menuCloseButton) {
    menuCloseButton.focus();
  }
}

function closeMenu({ restoreFocus = false } = {}) {
  if (!navigationMenu || !menuOverlay || !menuToggle) {
    return;
  }

  navigationMenu.classList.remove("is-open");
  menuOverlay.classList.remove("active");
  document.body.classList.remove("menu-open");

  menuToggle.setAttribute("aria-expanded", "false");

  updateNavigationAccessibility();

  if (restoreFocus && isMobileViewport()) {
    menuToggle.focus();
  }
}

function toggleMenu() {
  if (isMenuOpen()) {
    closeMenu({ restoreFocus: true });
  } else {
    openMenu();
  }
}

function trapMenuFocus(event) {
  if (
    event.key !== "Tab" ||
    !navigationMenu ||
    !isMenuOpen()
  ) {
    return;
  }

  const focusableElements = navigationMenu.querySelectorAll(
    [
      "a[href]",
      "button:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ")
  );

  if (!focusableElements.length) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement =
    focusableElements[focusableElements.length - 1];

  if (
    event.shiftKey &&
    document.activeElement === firstElement
  ) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (
    !event.shiftKey &&
    document.activeElement === lastElement
  ) {
    event.preventDefault();
    firstElement.focus();
  }
}

function handleMenuKeyboard(event) {
  if (event.key === "Escape" && isMenuOpen()) {
    closeMenu({ restoreFocus: true });
    return;
  }

  trapMenuFocus(event);
}

function handleDesktopChange(event) {
  if (event.matches) {
    closeMenu();
  }

  updateNavigationAccessibility();
}

function initializeMobileMenu() {
  if (!menuToggle || !navigationMenu || !menuOverlay) {
    return;
  }

  menuToggle.addEventListener("click", toggleMenu);

  menuCloseButton?.addEventListener("click", () => {
    closeMenu({ restoreFocus: true });
  });

  menuOverlay.addEventListener("click", () => {
    closeMenu({ restoreFocus: true });
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobileViewport()) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", handleMenuKeyboard);

  if (typeof desktopMediaQuery.addEventListener === "function") {
    desktopMediaQuery.addEventListener(
      "change",
      handleDesktopChange
    );
  } else {
    desktopMediaQuery.addListener(handleDesktopChange);
  }

  updateNavigationAccessibility();
}


/* =========================================================
   NAVIGATION ACTIVE
========================================================= */

function isHomeLink(linkTarget) {
  return (
    linkTarget === "index.html" ||
    linkTarget === "./" ||
    linkTarget === "/" ||
    linkTarget === "#"
  );
}

function updateActiveNavigation() {

   const isHomePage =
  window.location.pathname.endsWith("/") ||
  window.location.pathname.endsWith("/index.html");
   
  if (!navigationLinks.length) {
    return;
  }

   if (!isHomePage) {
  navigationLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href") || "";
    const isProjectsLink =
      linkTarget.endsWith("#projects");

    link.classList.toggle("active", isProjectsLink);

    if (isProjectsLink) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  return;
}
   

  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionBottom
    ) {
      currentSectionId = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href") || "";

   const activeNavigationTarget =
     navigationSectionMap[currentSectionId] ||
     currentSectionId;
   
   const isActive = currentSectionId
     ? linkTarget === `#${activeNavigationTarget}`
     : isHomeLink(linkTarget);

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
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

  const normalizedProgress = Math.min(
    100,
    Math.max(0, progress)
  );

  scrollProgress.style.width = `${normalizedProgress}%`;
}

function updateHeader() {
  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > HEADER_SCROLL_THRESHOLD
  );
}


/* =========================================================
   BOUTON RETOUR EN HAUT
========================================================= */

function updateScrollTopButton() {
  if (!scrollTopButton) {
    return;
  }

  scrollTopButton.classList.toggle(
    "show",
    window.scrollY > SCROLL_TOP_THRESHOLD
  );
}

function initializeScrollTopButton() {
  if (!scrollTopButton) {
    return;
  }

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion.matches
        ? "auto"
        : "smooth"
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

function showAllRevealElements() {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

function initializeRevealAnimations() {
  if (!revealElements.length) {
    return;
  }

  if (
    prefersReducedMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    showAllRevealElements();
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
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
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
  if (!selectedTab) {
    return;
  }

  const targetId = selectedTab.getAttribute("aria-controls");
  const targetPanel = targetId
    ? document.getElementById(targetId)
    : null;

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

function getNextTechnologyTabIndex(currentIndex, key) {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (currentIndex + 1) % technologyTabs.length;

    case "ArrowLeft":
    case "ArrowUp":
      return (
        currentIndex - 1 + technologyTabs.length
      ) % technologyTabs.length;

    case "Home":
      return 0;

    case "End":
      return technologyTabs.length - 1;

    default:
      return null;
  }
}

function initializeTechnologyTabs() {
  if (!technologyTabs.length || !technologyPanels.length) {
    return;
  }

  technologyTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTechnologyTab(tab);
    });

    tab.addEventListener("keydown", (event) => {
      const nextIndex = getNextTechnologyTabIndex(
        index,
        event.key
      );

      if (nextIndex === null) {
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
   COMPTEURS ANIMÉS
========================================================= */

function setCounterFinalValue(counter) {
  const target = Number(counter.dataset.target);
  const suffix = counter.dataset.suffix || "";

  if (!Number.isFinite(target)) {
    return;
  }

  counter.textContent =
    `${target.toLocaleString("fr-FR")}${suffix}`;
}

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const suffix = counter.dataset.suffix || "";

  if (!Number.isFinite(target)) {
    return;
  }

  const duration = 1200;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const progress = Math.min(
      (currentTime - startTime) / duration,
      1
    );

    const easedProgress =
      1 - Math.pow(1 - progress, 3);

    const currentValue = Math.round(
      target * easedProgress
    );

    counter.textContent =
      `${currentValue.toLocaleString("fr-FR")}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(updateCounter);
    }
  }

  window.requestAnimationFrame(updateCounter);
}

function initializeCounters() {
  const counters =
    document.querySelectorAll(".stat-number");

  if (!counters.length) {
    return;
  }

  if (
    prefersReducedMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    counters.forEach(setCounterFinalValue);
    return;
  }

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.45
    }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
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
   initializeCounters();
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeSite,
    { once: true }
  );
} else {
  initializeSite();
}
