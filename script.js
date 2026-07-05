/* =========================================================
   BLAZE BURGER — interactions + 3D burger
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Navbar ---------- */
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const navBurger = document.getElementById("navBurger");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });

  navBurger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navBurger.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );

  /* ---------- Hero video fallback ---------- */
  const heroVideo = document.getElementById("heroVideo");
  const heroFallback = document.getElementById("heroFallback");
  function showFallback() { heroFallback.classList.add("on"); heroVideo.style.display = "none"; }
  const lastSource = heroVideo.querySelector("source:last-of-type");
  if (lastSource) lastSource.addEventListener("error", showFallback);
  heroVideo.addEventListener("error", showFallback);
  setTimeout(() => {
    if (heroVideo.readyState < 2 && heroVideo.networkState !== HTMLMediaElement.NETWORK_LOADING) showFallback();
  }, 6000);

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      counterObserver.unobserve(el);
      const target = +el.dataset.count;
      const dur = 1400;
      const t0 = performance.now();
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".stat-num").forEach((el) => counterObserver.observe(el));

  /* ---------- 3D tilt on menu cards ---------- */
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });

  /* ---------- "Add" button feedback ---------- */
  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("added");
      btn.textContent = "Added ✓";
      setTimeout(() => { btn.classList.remove("added"); btn.textContent = "Add +"; }, 1600);
    });
  });

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formStatus.classList.remove("ok", "err");
      if (!contactForm.checkValidity()) {
        formStatus.textContent = "Please fill in your name, email, and message.";
        formStatus.classList.add("err");
        contactForm.reportValidity();
        return;
      }
      const btn = contactForm.querySelector(".form-submit");
      btn.disabled = true;
      btn.textContent = "Sending…";
      /* No backend yet — simulate a successful send */
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "Send Message";
        formStatus.textContent = "Thanks! Your message is in — we'll get back to you within a day.";
        formStatus.classList.add("ok");
        contactForm.reset();
      }, 900);
    });
  }

  /* =========================================================
     THREE.JS — interactive 3D burger built from primitives
     ========================================================= */
  function initBurger3D() {
    if (typeof THREE === "undefined") {
      const wrap = document.getElementById("hero3d");
      if (wrap) wrap.style.display = "none";
      return;
    }
    const canvas = document.getElementById("burgerCanvas");
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 1.3, 8.6);
    camera.lookAt(0, 0, 0);

    /* Lights — warm key, red/yellow brand rims */
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xfff2dd, 1.15);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rimRed = new THREE.PointLight(0xe8261f, 1.4, 20);
    rimRed.position.set(-5, 1, -3);
    scene.add(rimRed);
    const rimYellow = new THREE.PointLight(0xffc72c, 1.2, 20);
    rimYellow.position.set(5, -1, 3);
    scene.add(rimYellow);

    const burger = new THREE.Group();
    scene.add(burger);

    const mat = (color, rough, flat) =>
      new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.05, flatShading: !!flat });

    /* Bottom bun */
    const bunBottom = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.7, 0.55, 48), mat(0xd98a2b, 0.65));
    bunBottom.position.y = -1.15;
    burger.add(bunBottom);

    /* Patties + cheese + veg */
    const patty1 = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.45, 48), mat(0x5a2d16, 0.9));
    patty1.position.y = -0.62;
    burger.add(patty1);

    const tomato = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.18, 48), mat(0xd8281e, 0.5));
    tomato.position.y = -0.3;
    burger.add(tomato);

    const patty2 = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.45, 48), mat(0x63321a, 0.9));
    patty2.position.y = 0.02;
    burger.add(patty2);

    /* Melting cheese — slightly rotated square draped over the patty */
    const cheese = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.12, 2.9), mat(0xffc72c, 0.35));
    cheese.position.y = 0.31;
    cheese.rotation.y = Math.PI / 7;
    burger.add(cheese);

    /* Lettuce — wavy flattened dodecahedron ring feel */
    const lettuce = new THREE.Mesh(new THREE.DodecahedronGeometry(1.95, 1), mat(0x5fae35, 0.85, true));
    lettuce.scale.set(1.05, 0.12, 1.05);
    lettuce.position.y = 0.47;
    burger.add(lettuce);

    /* Top bun — dome */
    const bunTop = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2),
      mat(0xe89a3c, 0.6)
    );
    bunTop.scale.set(1, 0.78, 1);
    bunTop.position.y = 0.55;
    burger.add(bunTop);

    /* Sesame seeds scattered on the dome */
    const seedGeo = new THREE.SphereGeometry(0.07, 10, 8);
    const seedMat = mat(0xfff3d6, 0.5);
    for (let i = 0; i < 26; i++) {
      const seed = new THREE.Mesh(seedGeo, seedMat);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI / 2.6);
      const r = 1.9;
      seed.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        0.55 + r * 0.78 * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      seed.scale.y = 0.6;
      burger.add(seed);
    }

    burger.rotation.x = 0.12;

    /* Drag + inertia + idle spin */
    let dragging = false;
    let prevX = 0, prevY = 0;
    let velX = 0.006, velY = 0;

    const start = (x, y) => { dragging = true; prevX = x; prevY = y; };
    const move = (x, y) => {
      if (!dragging) return;
      velX = (x - prevX) * 0.006;
      velY = (y - prevY) * 0.004;
      prevX = x; prevY = y;
    };
    const end = () => { dragging = false; };

    canvas.addEventListener("pointerdown", (e) => { canvas.setPointerCapture(e.pointerId); start(e.clientX, e.clientY); });
    canvas.addEventListener("pointermove", (e) => move(e.clientX, e.clientY));
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);

    function resize() {
      const w = canvas.clientWidth || canvas.parentElement.clientWidth;
      const h = canvas.clientHeight || canvas.parentElement.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      burger.rotation.y += velX;
      burger.rotation.x += velY;
      burger.rotation.x = Math.max(-0.5, Math.min(0.6, burger.rotation.x));
      if (!dragging) {
        velX += (0.006 - velX) * 0.02; /* ease back to idle spin */
        velY *= 0.92;
      }
      burger.position.y = Math.sin(t * 1.2) * 0.14; /* gentle float */

      renderer.render(scene, camera);
    })();
  }

  if (document.readyState === "complete") initBurger3D();
  else window.addEventListener("load", initBurger3D);
})();
