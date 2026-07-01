/* =========================================================
   Metro Wash Pros — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Nav: transparent-over-hero -> solid on scroll ---- */
  const nav = document.getElementById("siteNav");
  const setNavState = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });

  /* ---- Mobile menu ---- */
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const closeMenu = () => {
    mobileMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    mobileMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  };

  navToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll("[data-menu-link]").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) closeMenu();
  });

  /* ---- Scroll reveal (staggered, subtle) ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const groups = new Map();
    revealEls.forEach((el) => {
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = groups.get(entry.target.parentElement) || [entry.target];
          const index = siblings.indexOf(entry.target);
          const delay = Math.max(0, index) * 90;
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Animated count-up numbers ---- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const countEls = document.querySelectorAll("[data-count-to]");
  const runCount = (el) => {
    const target = parseInt(el.getAttribute("data-count-to"), 10);
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    const duration = 1300;
    const start = performance.now();
    const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * easeOutQuad(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window && countEls.length) {
    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    countEls.forEach((el) => countObserver.observe(el));
  } else {
    countEls.forEach((el) => { el.textContent = el.getAttribute("data-count-to"); });
  }

  /* ---- Highlight today's row in the hours table ---- */
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = dayNames[new Date().getDay()];
  const todayRow = document.querySelector(`.hours-table tr[data-day="${today}"]`);
  if (todayRow) todayRow.classList.add("is-today");

  /* ---- Estimate form: client-side confirmation (no backend wired up) ---- */
  const form = document.getElementById("estimateForm");
  const success = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.hidden = true;
      success.classList.add("is-visible");
      success.setAttribute("tabindex", "-1");
      success.focus();
    });
  }
})();
