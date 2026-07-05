/* ============================================================
   AURELIA ESTATES — interactions, 3D & animation engine
   ============================================================ */

(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const hasGSAP = typeof gsap !== "undefined";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!hasGSAP) document.documentElement.classList.add("no-gsap");

  /* ---------- Preloader ---------- */
  const preloader = $("#preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader && preloader.classList.add("done"), 500);
  });
  setTimeout(() => preloader && preloader.classList.add("done"), 3500); // failsafe

  /* ---------- Custom cursor ---------- */
  const dot = $("#cursor-dot"), ring = $("#cursor-ring");
  if (dot && ring && matchMedia("(hover: hover)").matches) {
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`; });
    (function ringLoop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`;
      requestAnimationFrame(ringLoop);
    })();
    $$("a, button, .prop-card, input, select, textarea").forEach(el => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  /* ---------- Navigation ---------- */
  const nav = $(".nav");
  let lastY = 0;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("scrolled", y > 40);
    nav.classList.toggle("hidden", y > 400 && y > lastY);
    lastY = y;
    const toTop = $("#toTop");
    if (toTop) toTop.classList.toggle("show", y > 700);
  }, { passive: true });

  const burger = $(".burger"), mobileMenu = $(".mobile-menu");
  if (burger) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    });
    $$("a", mobileMenu).forEach(a => a.addEventListener("click", () => {
      burger.classList.remove("open"); mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    }));
  }

  const toTop = $("#toTop");
  if (toTop) toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- THREE.js hero particle skyline ---------- */
  const heroCanvas = $("#hero-canvas");
  if (heroCanvas && typeof THREE !== "undefined" && !reduceMotion) {
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
      camera.position.set(0, 0.6, 9);
      const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: false, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setSize(innerWidth, innerHeight);

      // gold dust particle field (two clouds rotated in opposite directions —
      // no per-frame attribute updates, so the CPU cost stays near zero)
      const pCount = innerWidth < 800 ? 180 : 450;
      const pGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 26;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xe8ce8c, size: 0.035, transparent: true, opacity: 0.75,
        blending: THREE.AdditiveBlending, depthWrite: false
      });
      const particles = new THREE.Points(pGeo, pMat);
      const particles2 = new THREE.Points(pGeo, pMat);
      particles2.rotation.z = Math.PI;
      scene.add(particles, particles2);

      // floating wireframe "gems" — architectural forms
      const gemMat = new THREE.MeshBasicMaterial({ color: 0xc9a227, wireframe: true, transparent: true, opacity: 0.32 });
      const gems = [];
      const defs = [
        [new THREE.OctahedronGeometry(0.9, 0), 4.6, 1.6, -2, 0.004, 0.003],
        [new THREE.IcosahedronGeometry(0.55, 0), -5.2, -1.2, -1, 0.003, -0.005],
        [new THREE.BoxGeometry(0.8, 1.6, 0.8), 5.8, -1.9, -3, -0.004, 0.002],
        [new THREE.TorusGeometry(0.5, 0.12, 8, 24), -4.4, 2.2, -3.5, 0.005, 0.004],
        [new THREE.OctahedronGeometry(0.4, 0), 0.5, 2.9, -4, -0.003, 0.006]
      ];
      defs.forEach(([geo, x, y, z, rx, ry]) => {
        const m = new THREE.Mesh(geo, gemMat);
        m.position.set(x, y, z);
        m.userData = { rx, ry, baseY: y, ph: Math.random() * Math.PI * 2 };
        gems.push(m); scene.add(m);
      });

      // wireframe grid floor, receding into depth
      const grid = new THREE.GridHelper(60, 60, 0x27406e, 0x16233d);
      grid.position.y = -3.4;
      grid.material.transparent = true; grid.material.opacity = 0.3;
      scene.add(grid);

      let tx = 0, ty = 0;
      addEventListener("mousemove", e => {
        tx = (e.clientX / innerWidth - 0.5) * 2;
        ty = (e.clientY / innerHeight - 0.5) * 2;
      }, { passive: true });

      // render only while the hero is on screen and the tab is visible
      let heroVisible = true;
      new IntersectionObserver(en => { heroVisible = en[0].isIntersecting; }, { threshold: 0 })
        .observe($(".hero"));

      const clock = new THREE.Clock();
      (function tick() {
        requestAnimationFrame(tick);
        if (!heroVisible || document.hidden) return;
        const t = clock.getElapsedTime();
        particles.rotation.y = t * 0.02;
        particles2.rotation.y = -t * 0.014;
        particles.position.y = Math.sin(t * 0.4) * 0.25;
        particles2.position.y = Math.cos(t * 0.3) * 0.25;
        gems.forEach(g => {
          g.rotation.x += g.userData.rx; g.rotation.y += g.userData.ry;
          g.position.y = g.userData.baseY + Math.sin(t * 0.7 + g.userData.ph) * 0.35;
        });
        grid.position.z = (t * 0.6) % 1;
        camera.position.x += (tx * 0.9 - camera.position.x) * 0.04;
        camera.position.y += (0.6 - ty * 0.6 - camera.position.y) * 0.04;
        camera.lookAt(0, 0.3, 0);
        renderer.render(scene, camera);
      })();

      addEventListener("resize", () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      });
    } catch (e) { /* WebGL unavailable — hero still works on video alone */ }
  }

  /* ---------- Hero 3D mouse parallax (video + content layers) ---------- */
  const heroMedia = $(".hero-media"), heroContent = $(".hero-content");
  if (heroMedia && matchMedia("(hover: hover)").matches && !reduceMotion) {
    const hero = $(".hero");
    let px = 0, py = 0, rafQueued = false;
    hero.addEventListener("mousemove", e => {
      const r = hero.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      if (rafQueued) return;
      rafQueued = true;
      requestAnimationFrame(() => {
        rafQueued = false;
        heroMedia.style.transform = `translate3d(${px * -22}px, ${py * -14}px, 0) scale(1.04)`;
        if (heroContent) heroContent.style.transform = `translate3d(${px * 14}px, ${py * 10}px, 40px)`;
      });
    }, { passive: true });
    hero.addEventListener("mouseleave", () => {
      heroMedia.style.transform = ""; if (heroContent) heroContent.style.transform = "";
    });
  }

  /* ---------- pause any video that scrolls out of view ---------- */
  const vidObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(en => {
      const v = en.target;
      if (en.isIntersecting) { if (v._wasPlaying) v.play().catch(() => {}); }
      else { v._wasPlaying = !v.paused; v.pause(); }
    });
  }, { threshold: 0.05 }) : null;
  if (vidObserver) $$("video").forEach(v => vidObserver.observe(v));

  /* ---------- 3D tilt cards ---------- */
  function bindTilt(scope = document) {
    if (!matchMedia("(hover: hover)").matches || reduceMotion) return;
    $$("[data-tilt]", scope).forEach(card => {
      if (card._tilted) return; card._tilted = true;
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
        card.style.transform = "";
        setTimeout(() => card.style.transition = "", 700);
      });
    });
  }

  /* ---------- GSAP scroll animations ---------- */
  function initGsap() {
    if (!hasGSAP) return;
    gsap.registerPlugin(ScrollTrigger);

    // hero entrance
    if ($(".hero")) {
      const tl = gsap.timeline({ delay: reduceMotion ? 0 : 0.7 });
      tl.from(".hero-kicker", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out" })
        .from(".hero h1 .line > *", { yPercent: 110, duration: 1.1, stagger: 0.12, ease: "power4.out" }, "-=0.5")
        .from(".hero-sub", { y: 26, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
        .from(".hero-actions .btn", { y: 24, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }, "-=0.55")
        .from(".hero-stat", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.4")
        .from(".hero-card", { x: 80, opacity: 0, duration: 1.1, ease: "power3.out", clearProps: "opacity" }, "-=0.8")
        .from(".scroll-hint", { opacity: 0, duration: 0.8 }, "-=0.4");

      // scroll-driven video animation: the hero pins and the construction
      // video scrubs frame-by-frame with the scroll position
      const heroVid = $(".hero-media video");
      if (heroVid && !reduceMotion) {
        const bindScrub = () => {
          const dur = heroVid.duration;
          if (!dur || !isFinite(dur)) return;
          // seek gate: never issue a new seek while the previous one is still
          // decoding — this is what keeps scrubbing judder-free
          let seekBusy = false, wantTime = -1;
          heroVid.addEventListener("seeked", () => {
            seekBusy = false;
            if (wantTime >= 0 && Math.abs(heroVid.currentTime - wantTime) > 0.06) {
              seekBusy = true;
              const t = wantTime; wantTime = -1;
              heroVid.currentTime = t;
            } else wantTime = -1;
          });
          const seekTo = t => {
            if (seekBusy) { wantTime = t; return; }
            if (Math.abs(heroVid.currentTime - t) < 0.04) return;
            seekBusy = true;
            heroVid.currentTime = t;
          };
          ScrollTrigger.create({
            trigger: ".hero", start: "top top", end: "+=220%",
            pin: true, scrub: 0.6, anticipatePin: 1,
            onUpdate(self) {
              // video stays on its first frame at the top of the page and
              // only advances as you scroll down
              seekTo(self.progress * (dur - 0.08));
            }
          });
          // content drifts up and fades while the tower builds
          gsap.to(".hero-content", {
            yPercent: -18, opacity: 0, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "+=120%", scrub: true }
          });
          gsap.to(".scroll-hint, .hero-card", {
            opacity: 0, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "+=40%", scrub: true }
          });
        };
        if (heroVid.readyState >= 1) bindScrub();
        else heroVid.addEventListener("loadedmetadata", bindScrub, { once: true });
      } else {
        // reduced motion fallback: simple parallax fade
        gsap.to(".hero-content", {
          yPercent: -14, opacity: 0.15, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true }
        });
      }
    }

    // generic reveals
    $$(".reveal").forEach(el => gsap.fromTo(el, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%" }
    }));
    $$(".reveal-l").forEach(el => gsap.fromTo(el, { x: -70, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 84%" }
    }));
    $$(".reveal-r").forEach(el => gsap.fromTo(el, { x: 70, opacity: 0 }, {
      x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 84%" }
    }));
    $$(".reveal-scale").forEach(el => gsap.fromTo(el, { scale: 0.9, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%" }
    }));

    // stagger grids
    $$("[data-stagger]").forEach(grid => {
      gsap.fromTo(grid.children, { y: 70, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.95, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 84%" }
      });
    });

    // about frame 3D rotation on scroll
    const frame = $(".about-frame");
    if (frame) {
      gsap.fromTo(frame, { rotateY: -16, rotateX: 6, opacity: 0.3 }, {
        rotateY: 0, rotateX: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: frame, start: "top 90%", end: "center 50%", scrub: true }
      });
    }
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting || en.target._counted) return;
        en.target._counted = true;
        const target = parseFloat(en.target.dataset.count);
        const suffix = en.target.dataset.suffix || "";
        const dur = 1800, t0 = performance.now();
        (function step(now) {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          const val = target * eased;
          en.target.textContent = (target % 1 ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
        io.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------- Opportunities: render + search ---------- */
  const propGrid = $("#prop-grid");
  function propCardHTML(p) {
    const specs = p.type === "Commercial"
      ? `<span><b>${p.area.toLocaleString()}</b> sqft</span><span><b>${p.yield}</b> yield</span><span><b>${p.baths}</b> WC</span>`
      : `<span><b>${p.beds}</b> Beds</span><span><b>${p.baths}</b> Baths</span><span><b>${p.area.toLocaleString()}</b> sqft</span>`;
    return `
      <article class="prop-card" data-tilt>
        <div class="media">${propertyArt(p, 660, 480)}<span class="tag">${p.tag}</span></div>
        <div class="body">
          <div class="loc">${p.location} · ${p.type}</div>
          <h3>${p.name}</h3>
          <div class="specs">${specs}</div>
          <div class="foot">
            <span class="price">${formatPrice(p)}</span>
            <span class="view">Details <span class="arr">→</span></span>
          </div>
        </div>
        <a class="cover" href="property.html?id=${p.id}" aria-label="View ${p.name}"></a>
      </article>`;
  }

  function renderProps(list) {
    if (!propGrid) return;
    if (!list.length) {
      propGrid.innerHTML = `<div class="no-results">
        <div class="display">No matching opportunities</div>
        <p>Refine your search — or speak to our advisory team for off-market access.</p>
      </div>`;
      return;
    }
    propGrid.innerHTML = list.map(propCardHTML).join("");
    bindTilt(propGrid);
    if (hasGSAP && !propGrid._first) {
      gsap.fromTo(propGrid.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" });
    }
    propGrid._first = false;
  }

  if (propGrid) {
    propGrid._first = true;
    renderProps(PROPERTIES);
    propGrid._first = false;

    const q = $("#search-q"), type = $("#search-type"), budget = $("#search-budget"), form = $("#search-form");
    function applySearch(e) {
      if (e) e.preventDefault();
      const term = (q.value || "").trim().toLowerCase();
      const t = type.value, b = budget.value;
      const filtered = PROPERTIES.filter(p => {
        const hay = `${p.name} ${p.location} ${p.type} ${p.tag}`.toLowerCase();
        if (term && !hay.includes(term)) return false;
        if (t && p.type !== t) return false;
        if (b) {
          const [lo, hi] = b.split("-").map(Number);
          if (p.price < lo || (hi && p.price > hi)) return false;
        }
        return true;
      });
      renderProps(filtered);
    }
    form.addEventListener("submit", applySearch);
    [q, type, budget].forEach(el => el.addEventListener("input", applySearch));
  }

  /* ---------- Reviews ---------- */
  const reviewsTrack = $("#reviews-track");
  if (reviewsTrack && typeof AGENCY_REVIEWS !== "undefined") {
    reviewsTrack.innerHTML = AGENCY_REVIEWS.map(r => `
      <div class="review-card">
        <span class="quote">”</span>
        ${starRow(r.rating)}
        <p>${r.text}</p>
        <div class="who">
          <span class="avatar">${r.name.charAt(0)}</span>
          <span><span class="n">${r.name}</span><br><span class="r">${r.role}</span></span>
        </div>
      </div>`).join("");
    const prev = $("#rev-prev"), next = $("#rev-next");
    const step = () => Math.min(440, reviewsTrack.clientWidth * 0.9);
    if (prev) prev.addEventListener("click", () => reviewsTrack.scrollBy({ left: -step(), behavior: "smooth" }));
    if (next) next.addEventListener("click", () => reviewsTrack.scrollBy({ left: step(), behavior: "smooth" }));
  }

  /* ---------- Forms (contact / enquiry / newsletter) ---------- */
  $$("form[data-fake-submit]").forEach(form => {
    // floating labels for selects
    $$("select", form).forEach(sel => {
      const sync = () => sel.classList.toggle("has-value", !!sel.value);
      sel.addEventListener("change", sync); sync();
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const fields = $(".form-fields", form), ok = $(".form-success", form);
      if (fields && ok) {
        fields.style.display = "none";
        ok.classList.add("show");
        setTimeout(() => { fields.style.display = ""; ok.classList.remove("show"); form.reset(); }, 6000);
      } else {
        const btn = $("button[type=submit]", form);
        if (btn) { const old = btn.innerHTML; btn.innerHTML = "✓"; setTimeout(() => { btn.innerHTML = old; form.reset(); }, 2500); }
      }
    });
  });

  /* ---------- Footer year ---------- */
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- boot ---------- */
  let booted = false;
  function boot() {
    if (booted) return; booted = true;
    bindTilt();
    initGsap();
    initCounters();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
