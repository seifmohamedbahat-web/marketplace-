/* ============================================================
   AURELIA ESTATES — shared data + generated artwork
   ============================================================ */

const PROPERTIES = [
  {
    id: "skyline-penthouse",
    name: "The Skyline Penthouse",
    location: "Downtown Dubai, UAE",
    price: 4850000,
    currency: "$",
    type: "Penthouse",
    status: "For Sale",
    beds: 4, baths: 5, area: 6200,
    yield: "8.4%",
    tag: "Signature",
    palette: ["#0e1a33", "#27406e", "#c9a227"],
    description:
      "Perched on the 72nd floor, The Skyline Penthouse commands a full-horizon view of the city and the sea beyond. Floor-to-ceiling glass, a private elevator lobby, and a cantilevered infinity terrace make this the definitive trophy residence of the district.",
    features: ["Private elevator", "Infinity terrace", "Smart-home automation", "Private cinema", "Wine cellar", "5 parking bays", "24/7 concierge", "Panoramic sea view"],
    reviews: [
      { name: "Amira K.", rating: 5, text: "Aurelia handled the entire acquisition remotely. Flawless process and the penthouse exceeded the renders." },
      { name: "Jonathan P.", rating: 5, text: "The viewing experience alone was world-class. Their team knows luxury inside out." },
      { name: "Lena V.", rating: 4, text: "Negotiation took longer than expected, but the final terms were excellent." }
    ]
  },
  {
    id: "marina-tower-residences",
    name: "Marina Tower Residences",
    location: "Dubai Marina, UAE",
    price: 1290000,
    currency: "$",
    type: "Apartment",
    status: "For Sale",
    beds: 2, baths: 3, area: 1850,
    yield: "7.1%",
    tag: "High Yield",
    palette: ["#101d2e", "#1f4b63", "#e8ce8c"],
    description:
      "A waterfront address in the heart of the marina. This two-bedroom residence pairs polished travertine interiors with a wraparound balcony over the yachts, minutes from the promenade's finest dining.",
    features: ["Waterfront balcony", "Resort-style pool", "Gym & spa", "Valet parking", "Pet friendly", "Furnished option"],
    reviews: [
      { name: "Marco D.", rating: 5, text: "Bought as an investment — rented within nine days of handover. The yield projections were accurate." },
      { name: "Sofia H.", rating: 5, text: "Beautiful finishings and the marina view is unreal at sunset." }
    ]
  },
  {
    id: "palm-crest-villa",
    name: "Palm Crest Villa",
    location: "Palm Jumeirah, UAE",
    price: 7200000,
    currency: "$",
    type: "Villa",
    status: "For Sale",
    beds: 6, baths: 7, area: 9800,
    yield: "6.2%",
    tag: "Beachfront",
    palette: ["#132018", "#2e5d43", "#d8b45a"],
    description:
      "A private beachfront estate on the fronds of the Palm. Six suites arranged around a courtyard pool, a rooftop majlis, and 40 metres of private sand with uninterrupted skyline views across the water.",
    features: ["Private beach", "Courtyard pool", "Rooftop majlis", "Staff quarters", "Home gym", "Boat mooring", "Landscaped gardens", "Outdoor kitchen"],
    reviews: [
      { name: "Rashid A.", rating: 5, text: "The most professional agency I have worked with in fifteen years of buying property." },
      { name: "Claire M.", rating: 5, text: "They found us an off-market villa we'd never have seen otherwise. Exceptional network." },
      { name: "Omar T.", rating: 4, text: "Premium service with a premium fee — worth it for a purchase of this scale." }
    ]
  },
  {
    id: "the-obsidian-loft",
    name: "The Obsidian Loft",
    location: "Manhattan, New York",
    price: 3450000,
    currency: "$",
    type: "Loft",
    status: "For Sale",
    beds: 3, baths: 3, area: 3100,
    yield: "5.8%",
    tag: "Rare",
    palette: ["#14121c", "#3c3452", "#caa64b"],
    description:
      "A converted 1920s printing house in Tribeca. Twelve-foot ceilings, original steel columns, and a blackened-oak kitchen anchor this triple-aspect loft, complete with a keyed elevator opening directly into the living space.",
    features: ["Keyed elevator", "12ft ceilings", "Original steelwork", "Chef's kitchen", "Library wall", "Storage unit"],
    reviews: [
      { name: "David R.", rating: 5, text: "Closed in six weeks. Their Manhattan team is razor sharp." },
      { name: "Isabelle F.", rating: 5, text: "The loft is a work of art. Aurelia's staging and walkthrough made the decision easy." }
    ]
  },
  {
    id: "azure-bay-estate",
    name: "Azure Bay Estate",
    location: "Bodrum, Türkiye",
    price: 2980000,
    currency: "$",
    type: "Villa",
    status: "For Sale",
    beds: 5, baths: 6, area: 7400,
    yield: "6.9%",
    tag: "Sea View",
    palette: ["#0d1f2d", "#1e5f74", "#e3c77f"],
    description:
      "Terraced into the hillside above a private cove, Azure Bay Estate steps down through olive gardens to its own jetty. Stone, glass and cedar throughout, with an infinity pool that dissolves into the Aegean.",
    features: ["Private cove & jetty", "Infinity pool", "Olive gardens", "Guest house", "Hammam", "Heli-accessible"],
    reviews: [
      { name: "Nikolai S.", rating: 5, text: "A once-in-a-decade property. The team coordinated lawyers, translators and surveyors seamlessly." },
      { name: "Hana Y.", rating: 4, text: "Gorgeous estate. Paperwork across borders was complex but they managed it well." }
    ]
  },
  {
    id: "veridian-heights",
    name: "Veridian Heights",
    location: "Canary Wharf, London",
    price: 985000,
    currency: "£",
    type: "Apartment",
    status: "Off-Plan",
    beds: 1, baths: 2, area: 920,
    yield: "9.2%",
    tag: "Off-Plan",
    palette: ["#101828", "#33436a", "#d9bd6e"],
    description:
      "A high-specification one-bedroom residence in London's fastest-appreciating postcode. Completion Q4 2027 with a 40/60 payment plan, winter garden balcony, and access to a 25-metre residents' pool.",
    features: ["40/60 payment plan", "Winter garden", "Residents' pool", "Co-working lounge", "Concierge", "10-yr warranty"],
    reviews: [
      { name: "Priya N.", rating: 5, text: "First off-plan purchase and Aurelia explained every milestone. Total confidence throughout." },
      { name: "Tom W.", rating: 5, text: "Projected yields are the best I've found in zone 2. Solid developer covenant too." }
    ]
  },
  {
    id: "casa-del-sol",
    name: "Casa del Sol",
    location: "Marbella, Spain",
    price: 2150000,
    currency: "€",
    type: "Villa",
    status: "For Sale",
    beds: 4, baths: 5, area: 5200,
    yield: "6.5%",
    tag: "Golden Visa",
    palette: ["#1d1610", "#7a4a1f", "#eecf87"],
    description:
      "An Andalusian modern villa on the Golden Mile. Double-height living spaces open onto a sun terrace and heated saltwater pool, with mature palms screening the garden for total privacy. Qualifies for residency by investment.",
    features: ["Golden Visa eligible", "Saltwater pool", "Sun terrace", "Outdoor cinema", "Solar array", "Gated community"],
    reviews: [
      { name: "Lars B.", rating: 5, text: "Relocated the whole family. Aurelia handled the visa pathway alongside the purchase — one team, everything done." },
      { name: "Fatima Z.", rating: 5, text: "Sunsets from the terrace are worth the price alone." }
    ]
  },
  {
    id: "meridian-business-tower",
    name: "Meridian Business Tower — Floor 18",
    location: "Business Bay, UAE",
    price: 3900000,
    currency: "$",
    type: "Commercial",
    status: "For Sale",
    beds: 0, baths: 4, area: 11500,
    yield: "10.3%",
    tag: "Commercial",
    palette: ["#0c1220", "#24344d", "#c9a227"],
    description:
      "A full 11,500 sq ft floor plate in a Grade-A tower, currently leased to a multinational tenant on a 7-year term. Turn-key institutional-quality income from day one, with canal views on three elevations.",
    features: ["7-yr lease in place", "Grade-A tower", "3 exposures", "Raised floors", "12 parking bays", "Tenant covenant AA-"],
    reviews: [
      { name: "Meridian Capital", rating: 5, text: "Clean due diligence pack, honest numbers. We acquired two floors through Aurelia." },
      { name: "S. Alvi", rating: 4, text: "Strong asset. Would have liked a longer exclusivity window during DD." }
    ]
  }
];

const AGENCY_REVIEWS = [
  { name: "Amira Khalil", role: "Penthouse Owner, Dubai", rating: 5,
    text: "From the first 3D walkthrough to handing over the keys, Aurelia made a $4.8M purchase feel effortless. Their attention to detail is unmatched in this market." },
  { name: "Jonathan Pierce", role: "Portfolio Investor, London", rating: 5,
    text: "I hold nine properties sourced through Aurelia. Every yield projection they've given me has landed within half a percent. That's why I keep coming back." },
  { name: "Sofia Hernández", role: "Homeowner, Marbella", rating: 5,
    text: "They didn't sell me a house, they found me a life. The team understood exactly what our family needed before we could articulate it ourselves." },
  { name: "Rashid Al Maktoum", role: "Family Office Principal", rating: 5,
    text: "Discreet, fast, and deeply connected. Aurelia surfaces off-market opportunities that simply do not exist anywhere else." },
  { name: "Claire Mitchell", role: "Relocation Client, New York", rating: 5,
    text: "Moving continents is chaos. Aurelia turned it into a checklist and then quietly completed every item on it. Extraordinary service." },
  { name: "Lars Bergström", role: "Golden Visa Investor", rating: 5,
    text: "Purchase, residency, schooling, even the utilities — one team handled everything. Six months later we were living in the sun." }
];

/* ---------- Generated SVG artwork (self-contained, no image assets) ---------- */

function _hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/* Draws a stylised luxury skyline / villa scene per property */
function propertyArt(p, w = 800, h = 560, variant = 0) {
  const rnd = _hash(p.id + ":" + variant);
  const [dark, mid, gold] = p.palette;
  let bldgs = "";
  const n = 9 + Math.floor(rnd() * 5);
  for (let i = 0; i < n; i++) {
    const bw = 40 + rnd() * 90;
    const bh = h * (0.25 + rnd() * 0.55);
    const x = (i / n) * w + rnd() * 30 - 15;
    const y = h - bh;
    const lit = rnd() > 0.4;
    bldgs += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${i % 2 ? mid : dark}" opacity="${(0.55 + rnd() * 0.45).toFixed(2)}"/>`;
    if (lit) {
      for (let r = 0; r < Math.min(14, bh / 34); r++) {
        for (let c = 0; c < Math.min(5, bw / 20); c++) {
          if (rnd() > 0.55) {
            bldgs += `<rect x="${(x + 8 + c * 18).toFixed(1)}" y="${(y + 12 + r * 30).toFixed(1)}" width="8" height="12" fill="${gold}" opacity="${(0.25 + rnd() * 0.6).toFixed(2)}"/>`;
          }
        }
      }
    }
  }
  const moonX = w * (0.15 + rnd() * 0.7), moonY = h * (0.12 + rnd() * 0.18);
  let stars = "";
  for (let i = 0; i < 40; i++) {
    stars += `<circle cx="${(rnd() * w).toFixed(1)}" cy="${(rnd() * h * 0.5).toFixed(1)}" r="${(0.6 + rnd() * 1.2).toFixed(2)}" fill="#fff" opacity="${(0.15 + rnd() * 0.5).toFixed(2)}"/>`;
  }
  const gid = `g${p.id.replace(/[^a-z0-9]/g, "")}${variant}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="${gid}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${dark}"/><stop offset="0.65" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/>
      </linearGradient>
      <radialGradient id="${gid}-moon" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="${gold}" stop-opacity="0.9"/><stop offset="1" stop-color="${gold}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#${gid}-sky)"/>
    ${stars}
    <circle cx="${moonX.toFixed(1)}" cy="${moonY.toFixed(1)}" r="110" fill="url(#${gid}-moon)"/>
    <circle cx="${moonX.toFixed(1)}" cy="${moonY.toFixed(1)}" r="34" fill="${gold}" opacity="0.95"/>
    ${bldgs}
    <rect y="${h - 6}" width="${w}" height="6" fill="${gold}" opacity="0.35"/>
  </svg>`;
}

function artDataURI(p, w, h, variant) {
  return "data:image/svg+xml," + encodeURIComponent(propertyArt(p, w, h, variant));
}

function formatPrice(p) {
  return p.currency + p.price.toLocaleString("en-US");
}

function starRow(rating) {
  let s = "";
  for (let i = 1; i <= 5; i++) s += `<span class="star${i <= rating ? " on" : ""}">★</span>`;
  return `<span class="stars" aria-label="${rating} out of 5 stars">${s}</span>`;
}

function getPropertyById(id) {
  return PROPERTIES.find(p => p.id === id) || PROPERTIES[0];
}
