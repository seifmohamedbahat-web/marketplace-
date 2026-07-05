/* ============================================================
   AURELIA ESTATES — property detail page renderer
   Runs BEFORE main.js so GSAP reveals pick up rendered content.
   ============================================================ */

(function () {
  "use strict";

  const params = new URLSearchParams(location.search);
  const p = getPropertyById(params.get("id"));

  document.title = `${p.name} — Aurelia Estates`;

  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  /* hero */
  set("detail-art", propertyArt(p, 1600, 900, 1));
  set("bc-name", p.name);
  set("p-status", p.status);
  set("p-name", p.name);
  set("p-loc", `${p.location} · ${p.type}`);

  /* spec strip */
  const cells = [];
  if (p.beds > 0) cells.push([p.beds, "Bedrooms"]);
  cells.push([p.baths, p.type === "Commercial" ? "Washrooms" : "Bathrooms"]);
  cells.push([p.area.toLocaleString(), "Sq. Ft."]);
  cells.push([p.yield, "Proj. Yield"]);
  cells.push([p.type, "Asset Type"]);
  set("p-specs", cells.map(([v, k]) => `<div class="cell"><div class="v">${v}</div><div class="k">${k}</div></div>`).join(""));

  /* description, features, gallery */
  set("p-desc", p.description);
  set("p-features", p.features.map(f => `<div class="f">${f}</div>`).join(""));
  set("p-gallery", [2, 3, 4, 5, 6, 7].map(v => `<div class="shot">${propertyArt(p, 620, 400, v)}</div>`).join(""));

  /* reviews */
  set("p-reviews", p.reviews.map(r => `
    <div class="review-card">
      <span class="quote">”</span>
      ${starRow(r.rating)}
      <p>${r.text}</p>
      <div class="who">
        <span class="avatar">${r.name.charAt(0)}</span>
        <span><span class="n">${r.name}</span><br><span class="r">Verified Client</span></span>
      </div>
    </div>`).join(""));

  /* sidebar */
  set("p-price", formatPrice(p));
  set("p-yield", p.yield);
  set("p-ref", "AE-" + p.id.slice(0, 6).toUpperCase().replace(/-/g, ""));

  /* similar properties (same type first, then rest) */
  const similar = PROPERTIES.filter(x => x.id !== p.id)
    .sort((a, b) => (b.type === p.type) - (a.type === p.type))
    .slice(0, 3);
  set("similar-grid", similar.map(s => `
    <article class="prop-card" data-tilt>
      <div class="media">${propertyArt(s, 660, 480)}<span class="tag">${s.tag}</span></div>
      <div class="body">
        <div class="loc">${s.location} · ${s.type}</div>
        <h3>${s.name}</h3>
        <div class="foot">
          <span class="price">${formatPrice(s)}</span>
          <span class="view">Details <span class="arr">→</span></span>
        </div>
      </div>
      <a class="cover" href="property.html?id=${s.id}" aria-label="View ${s.name}"></a>
    </article>`).join(""));

  /* subtle parallax on the hero artwork */
  window.addEventListener("scroll", () => {
    const art = document.getElementById("detail-art");
    if (art) art.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.05)`;
  }, { passive: true });
})();
