/**
 * PyCodeGroup — main.js (CLEAN, sans libs externes)
 * - Menu mobile toggle
 * - Scroll-to-top
 * - Active state nav on scroll (si sections id=...)
 */

(function () {
  "use strict";

  /**
   * Helpers (CSS selectors only)
   */
  const select = (el, all = false) => {
    if (typeof el !== "string") return null;
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const target = select(el, all);
    if (!target) return;

    if (all) target.forEach((e) => e.addEventListener(type, listener));
    else target.addEventListener(type, listener);
  };

  /**
   * Mobile nav toggle
   */
  const mobileNavToggle = () => {
    document.body.classList.toggle("mobile-nav-active");

    const btn = select(".mobile-nav-toggle");
    if (!btn) return;

    btn.classList.toggle("bi-list");
    btn.classList.toggle("bi-x");
  };

  on("click", ".mobile-nav-toggle", (e) => {
    e.preventDefault();
    mobileNavToggle();
  });

  /**
   * Close mobile nav when clicking nav links
   */
  on(
    "click",
    "#navmenu a",
    function () {
      if (!document.body.classList.contains("mobile-nav-active")) return;
      mobileNavToggle();
    },
    true
  );

  /**
   * Close mobile nav when clicking outside nav
   * (no helper here — document is not a selector)
   */
  document.addEventListener("click", (e) => {
    if (!document.body.classList.contains("mobile-nav-active")) return;

    const nav = select("#navmenu");
    const toggle = select(".mobile-nav-toggle");
    if (!nav || !toggle) return;

    const clickedInside = nav.contains(e.target) || toggle.contains(e.target);
    if (!clickedInside) mobileNavToggle();
  });

  /**
   * Scroll-top button
   */
  const scrollTopBtn = select(".scroll-top");

  const toggleScrollTop = () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 200) scrollTopBtn.classList.add("active");
    else scrollTopBtn.classList.remove("active");
  };

  window.addEventListener("load", toggleScrollTop);
  window.addEventListener("scroll", toggleScrollTop);

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /**
   * Active nav links on scroll (only hash links)
   */
  const navLinks = select("#navmenu a", true) || [];

  const navActiveOnScroll = () => {
    const position = window.scrollY + 220;
    navLinks.forEach((link) => {
      if (!link.hash) return;

      const section = select(link.hash);
      if (!section) return;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", navActiveOnScroll);
  window.addEventListener("scroll", navActiveOnScroll);

  })();


