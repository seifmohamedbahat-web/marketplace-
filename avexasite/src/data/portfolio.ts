import type { SupportedLanguage } from "../i18n";

export interface LocalizedText {
  en: string;
  fr: string;
  ar: string;
}

export interface PortfolioProject {
  id: string;
  image: string;
  name: string;
  type: LocalizedText;
  description: LocalizedText;
  tech: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "apex-auto-repair",
    image: "/portfolio/apex-auto-repair.jpg",
    name: "Apex Auto Repair",
    type: {
      en: "Automotive Website",
      fr: "Site Automobile",
      ar: "موقع سيارات",
    },
    description: {
      en: "A bold, dark-themed website for a premium auto repair shop. Offers expert diagnostics, maintenance, and repairs for all vehicle brands, with fast service, honest pricing, and guaranteed results.",
      fr: "Un site audacieux au thème sombre pour un atelier de réparation automobile haut de gamme. Diagnostics experts, entretien et réparations pour toutes les marques, avec un service rapide, des prix honnêtes et des résultats garantis.",
      ar: "موقع جريء بتصميم داكن لورشة متميزة لإصلاح السيارات. يقدّم تشخيصًا احترافيًا وصيانة وإصلاحات لجميع ماركات السيارات، مع خدمة سريعة وأسعار صادقة ونتائج مضمونة.",
    },
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "aqualuxe",
    image: "/portfolio/aqualuxe.jpg",
    name: "Aqualuxe",
    type: {
      en: "E-Commerce",
      fr: "E-Commerce",
      ar: "متجر إلكتروني",
    },
    description: {
      en: "An elegant e-commerce site for luxury poolside loungers handcrafted in Bali and shipped to Australia. Features resort-inspired products made with marine-grade fabrics, sold direct-to-consumer.",
      fr: "Un site e-commerce élégant pour des chaises longues de piscine de luxe fabriquées à la main à Bali et expédiées en Australie. Des produits inspirés des resorts, en tissus marins, vendus en direct aux consommateurs.",
      ar: "متجر إلكتروني أنيق لكراسي استرخاء فاخرة بجانب المسبح، مصنوعة يدويًا في بالي ومُصدَّرة إلى أستراليا. منتجات مستوحاة من المنتجعات، مصنوعة من أقمشة بحرية، تُباع مباشرة للمستهلك.",
    },
    tech: ["Shopify Hydrogen", "Tailwind CSS", "Stripe"],
  },
  {
    id: "signalpro",
    image: "/portfolio/signalpro.jpg",
    name: "SignalPro",
    type: {
      en: "Fintech Platform",
      fr: "Plateforme Fintech",
      ar: "منصة مالية",
    },
    description: {
      en: "A dark-themed financial platform that delivers real-time stock trading signals. Alerts users on the exact moment to buy or sell, showing entry price and target price for each stock.",
      fr: "Une plateforme financière au thème sombre qui livre des signaux de trading boursier en temps réel. Alerte les utilisateurs au moment exact d'acheter ou de vendre, avec prix d'entrée et prix cible pour chaque action.",
      ar: "منصة مالية بتصميم داكن تقدّم إشارات تداول أسهم لحظية. تنبّه المستخدمين إلى اللحظة الدقيقة للشراء أو البيع، مع عرض سعر الدخول والسعر المستهدف لكل سهم.",
    },
    tech: ["React", "WebSockets", "Node.js"],
  },
  {
    id: "clinic-website",
    image: "/portfolio/clinic-website.jpg",
    name: "Clinic Website",
    type: {
      en: "Healthcare Template",
      fr: "Modèle Site Médical",
      ar: "قالب موقع طبي",
    },
    description: {
      en: "A clean, minimal medical website template for a doctor's personal clinic. Highlights the physician's specialty and patient-first philosophy, with sections for services, reviews, and appointment booking.",
      fr: "Un modèle de site médical épuré et minimaliste pour le cabinet personnel d'un médecin. Met en avant la spécialité du praticien et une philosophie centrée sur le patient, avec des sections services, avis et prise de rendez-vous.",
      ar: "قالب موقع طبي نظيف وبسيط لعيادة طبيب خاصة. يبرز تخصص الطبيب وفلسفته التي تضع المريض أولاً، مع أقسام للخدمات والتقييمات وحجز المواعيد.",
    },
    tech: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "luxehomes",
    image: "/portfolio/luxehomes.jpg",
    name: "LuxeHomes",
    type: {
      en: "Real Estate Platform",
      fr: "Plateforme Immobilière",
      ar: "منصة عقارية",
    },
    description: {
      en: "A real estate platform for browsing luxury homes, apartments, and estates. Users can search by location or ZIP code — boasting 5,000+ properties, 2,000+ happy clients, and 500+ awards.",
      fr: "Une plateforme immobilière pour parcourir des maisons, appartements et propriétés de luxe. Recherche par lieu ou code postal — plus de 5 000 propriétés, 2 000 clients satisfaits et 500 récompenses.",
      ar: "منصة عقارية لتصفح المنازل والشقق والعقارات الفاخرة. يمكن للمستخدمين البحث حسب الموقع أو الرمز البريدي — بأكثر من 5,000 عقار و2,000 عميل سعيد و500 جائزة.",
    },
    tech: ["Next.js", "Mapbox", "Prisma"],
  },
  {
    id: "velo",
    image: "/portfolio/velo.jpg",
    name: "VELO",
    type: {
      en: "E-Commerce",
      fr: "E-Commerce",
      ar: "متجر إلكتروني",
    },
    description: {
      en: "A sleek, dark sportswear e-commerce store for the 2026 season. Specializes in high-performance athletic clothing engineered for movement and designed for style, with bestsellers and collections.",
      fr: "Une boutique e-commerce de sportswear élégante et sombre pour la saison 2026. Spécialisée dans les vêtements de sport haute performance, conçus pour le mouvement et le style, avec best-sellers et collections.",
      ar: "متجر إلكتروني أنيق وداكن للملابس الرياضية لموسم 2026. متخصص في الملابس الرياضية عالية الأداء المصممة للحركة والأناقة، مع الأكثر مبيعًا والمجموعات الجديدة.",
    },
    tech: ["Next.js", "Stripe", "Sanity"],
  },
  {
    id: "creoa-dashboard",
    image: "/portfolio/creoa-dashboard.jpg",
    name: "Creoa Studio Dashboard",
    type: {
      en: "Analytics Dashboard",
      fr: "Tableau de Bord Analytique",
      ar: "لوحة تحليلات",
    },
    description: {
      en: "An analytics dashboard for a creative studio showing key metrics: unique visitors, pageviews, new leads, conversion rate, daily traffic trends, and top traffic sources like Google, Instagram, and LinkedIn.",
      fr: "Un tableau de bord analytique pour un studio créatif affichant les indicateurs clés : visiteurs uniques, pages vues, nouveaux leads, taux de conversion, tendances de trafic quotidiennes et principales sources de trafic comme Google, Instagram et LinkedIn.",
      ar: "لوحة تحليلات لاستوديو إبداعي تعرض المؤشرات الأساسية: الزوار الفريدون، مشاهدات الصفحات، العملاء المحتملون الجدد، معدل التحويل، اتجاهات الزيارات اليومية، وأهم مصادر الزيارات مثل Google وInstagram وLinkedIn.",
    },
    tech: ["React", "Recharts", "Supabase"],
  },
  {
    id: "lumiere",
    image: "/portfolio/lumiere.jpg",
    name: "Lumiere",
    type: {
      en: "Fashion E-Commerce",
      fr: "Mode E-Commerce",
      ar: "متجر أزياء إلكتروني",
    },
    description: {
      en: "A minimalist fashion e-commerce website for women's clothing. Showcases a 2026 collection focused on timeless, sophisticated pieces that blend elegance with everyday comfort.",
      fr: "Un site e-commerce de mode minimaliste pour vêtements femme. Présente une collection 2026 axée sur des pièces intemporelles et sophistiquées, alliant élégance et confort au quotidien.",
      ar: "موقع تجارة إلكترونية بتصميم بسيط لأزياء نسائية. يعرض مجموعة 2026 التي تركّز على قطع خالدة وأنيقة تمزج بين الرقي والراحة اليومية.",
    },
    tech: ["Astro", "Tailwind CSS", "Shopify"],
  },
  {
    id: "north-star",
    image: "/portfolio/north-star.jpg",
    name: "North/Star",
    type: {
      en: "Marketing Agency Website",
      fr: "Site Agence Marketing",
      ar: "موقع وكالة تسويق",
    },
    description: {
      en: "A performance marketing agency website for DTC brands. Specializes in paid social advertising with a results-driven approach — $3.4M tracked in the last 30 days with a +218% growth rate.",
      fr: "Un site pour une agence de marketing de performance dédiée aux marques DTC. Spécialisée en publicité sociale payante avec une approche axée résultats — 3,4 M$ suivis sur les 30 derniers jours et un taux de croissance de +218 %.",
      ar: "موقع لوكالة تسويق أداء متخصصة في العلامات التجارية المباشرة للمستهلك. متخصصة في الإعلانات المدفوعة على منصات التواصل بنهج يركّز على النتائج — 3.4 مليون دولار تم تتبعها خلال آخر 30 يومًا بمعدل نمو +218%.",
    },
    tech: ["Next.js", "GSAP", "Framer Motion"],
  },
  {
    id: "usa-plumbing",
    image: "/portfolio/usa-plumbing.jpg",
    name: "USA Plumbing",
    type: {
      en: "Local Service Website",
      fr: "Site de Service Local",
      ar: "موقع خدمات محلية",
    },
    description: {
      en: "A local plumbing services website for Myrtle Beach, SC. Highlights a 4.9-star Google rating, same-day service, 20+ years of local experience, and 24/7 availability with honest pricing.",
      fr: "Un site de services de plomberie local pour Myrtle Beach, en Caroline du Sud. Met en avant une note Google de 4,9 étoiles, un service le jour même, plus de 20 ans d'expérience locale et une disponibilité 24h/24, 7j/7 à prix honnête.",
      ar: "موقع لخدمات السباكة المحلية في ميرتل بيتش، ساوث كارولاينا. يبرز تقييم Google بـ4.9 نجوم، وخدمة في نفس اليوم، وأكثر من 20 عامًا من الخبرة المحلية، وتوفرًا على مدار الساعة بأسعار صادقة.",
    },
    tech: ["React", "Tailwind CSS", "Node.js"],
  },
  {
    id: "maos",
    image: "/portfolio/maos.jpg",
    name: "MAOS v1.0 — Marketing OS",
    type: {
      en: "Agency Operating System",
      fr: "Système d'Exploitation Agence",
      ar: "نظام تشغيل وكالات",
    },
    description: {
      en: "A full-featured agency operating system dashboard. Tracks Monthly Recurring Revenue, active clients, client ROAS, pipeline leads, CRM contacts, upcoming deliverables, and project tasks — all in one dark-mode interface.",
      fr: "Un tableau de bord complet de système d'exploitation pour agence. Suit le revenu récurrent mensuel, les clients actifs, le ROAS client, les leads en pipeline, les contacts CRM, les livrables à venir et les tâches de projet — le tout dans une interface en mode sombre.",
      ar: "لوحة تحكم متكاملة لنظام تشغيل الوكالات. تتبّع الإيراد الشهري المتكرر، والعملاء النشطين، وعائد الإنفاق الإعلاني للعملاء، والعملاء المحتملين في مسار المبيعات، وجهات اتصال CRM، والمخرجات القادمة، ومهام المشاريع — كل ذلك في واجهة داكنة واحدة.",
    },
    tech: ["React", "TanStack Query", "PostgreSQL"],
  },
  {
    id: "dashify",
    image: "/portfolio/dashify.jpg",
    name: "Dashify",
    type: {
      en: "SaaS Dashboard",
      fr: "Tableau de Bord SaaS",
      ar: "لوحة تحكم SaaS",
    },
    description: {
      en: "A general-purpose SaaS admin dashboard for business analytics. Displays total revenue, active users, orders, conversion rate, a revenue vs. expenses chart, and weekly traffic data in a clean, modern layout.",
      fr: "Un tableau de bord d'administration SaaS polyvalent pour l'analyse d'entreprise. Affiche le revenu total, les utilisateurs actifs, les commandes, le taux de conversion, un graphique revenus vs dépenses et le trafic hebdomadaire dans une mise en page claire et moderne.",
      ar: "لوحة تحكم إدارية عامة لتحليلات الأعمال ضمن نموذج SaaS. تعرض إجمالي الإيرادات والمستخدمين النشطين والطلبات ومعدل التحويل، ورسمًا بيانيًا للإيرادات مقابل المصروفات، وبيانات الزيارات الأسبوعية في تصميم عصري وواضح.",
    },
    tech: ["React", "Recharts", "Node.js"],
  },
  {
    id: "bella-cucina",
    image: "/portfolio/bella-cucina.jpg",
    name: "Bella Cucina Trattoria",
    type: {
      en: "Restaurant Website",
      fr: "Site de Restaurant",
      ar: "موقع مطعم",
    },
    description: {
      en: "A warm, atmospheric restaurant website for an Italian trattoria established in 2008. Features handmade pasta, wood-fired pizzas, and Tuscan classics — with options to view the menu or book a table online.",
      fr: "Un site de restaurant chaleureux et atmosphérique pour une trattoria italienne fondée en 2008. Pâtes faites maison, pizzas au feu de bois et classiques toscans — avec possibilité de consulter le menu ou réserver une table en ligne.",
      ar: "موقع دافئ وعميق الأجواء لمطعم إيطالي (تراتوريا) تأسس عام 2008. يضم المعكرونة المصنوعة يدويًا والبيتزا المخبوزة على الحطب وأطباق توسكانية كلاسيكية — مع خيارات لعرض القائمة أو حجز طاولة عبر الإنترنت.",
    },
    tech: ["Next.js", "Tailwind CSS", "Resend"],
  },
];

export function localize(text: LocalizedText, lang: SupportedLanguage): string {
  return text[lang] ?? text.en;
}
