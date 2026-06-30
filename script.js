/* =========================================================
   Global Market — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Sticky navbar shadow on scroll ---- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 8) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu toggle ---- */
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- Reveal-on-scroll ---- */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // gentle stagger for siblings in the same grid
            const delay = entry.target.dataset.delay || (i % 4) * 80;
            setTimeout(() => entry.target.classList.add("in"), delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---- Animated stat counters ---- */
  const formatValue = (value, suffix, format) => {
    let out;
    if (format === "M") out = (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1) + "M";
    else if (format === "K") out = Math.round(value / 1000) + "K";
    else out = Math.round(value).toLocaleString("en-US");
    return out + (suffix || "");
  };

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const format = el.dataset.format || "";
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = formatValue(target * eased, suffix, format);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = formatValue(target, suffix, format);
    };
    requestAnimationFrame(tick);
  };

  const statNums = document.querySelectorAll(".stat-num");
  if (reduce || !("IntersectionObserver" in window)) {
    statNums.forEach((el) =>
      (el.textContent = formatValue(
        parseFloat(el.dataset.target),
        el.dataset.suffix || "",
        el.dataset.format || ""
      ))
    );
  } else {
    const statIO = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNums.forEach((el) => statIO.observe(el));
  }

  /* ---- Featured listings: category filter ---- */
  const filterPills = document.querySelectorAll(".filter-pill");
  const productCards = document.querySelectorAll(".product-card");
  const emptyState = document.querySelector(".product-empty");

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");

      const filter = pill.dataset.filter;
      let visible = 0;
      productCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hide", !match);
        if (match) visible++;
      });
      if (emptyState) emptyState.hidden = visible !== 0;
    });
  });

  /* ---- Add to cart ---- */
  const cartBadge = document.querySelector(".cart-badge");
  const addCartButtons = document.querySelectorAll(".add-cart-btn");
  let cartCount = parseInt(cartBadge && cartBadge.textContent, 10) || 0;

  let toastEl = null;
  let toastTimer = null;
  const showToast = (message) => {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "cart-toast";
      toastEl.innerHTML =
        '<span class="cart-toast-check"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12 5 5 11-11"></path></svg></span><span class="cart-toast-text"></span>';
      document.body.appendChild(toastEl);
    }
    toastEl.querySelector(".cart-toast-text").textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  };

  addCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      cartCount += 1;
      if (cartBadge) cartBadge.textContent = String(cartCount);
      const name = btn.dataset.name || "Item";
      showToast(`Added "${name}" to cart`);
    });
  });

  /* ---- Wishlist toggle ---- */
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!pressed));
    });
  });

  /* ---- Year in footer ---- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
