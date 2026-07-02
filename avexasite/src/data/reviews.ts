import type { LocalizedText } from "./portfolio";

export interface Review {
  id: string;
  quote: LocalizedText;
  name: string;
  role: LocalizedText;
}

export const reviews: Review[] = [
  {
    id: "apex-auto-repair",
    quote: {
      en: "Avexa rebuilt our site and our sales jumped 40% in three months. They just get conversion.",
      fr: "Avexa a refondu notre site et nos ventes ont bondi de 40 % en trois mois. Ils comprennent vraiment la conversion.",
      ar: "أعادت أفيكسا بناء موقعنا وارتفعت مبيعاتنا بنسبة 40% خلال ثلاثة أشهر. إنهم يفهمون التحويل حقًا.",
    },
    name: "Sarah Mitchell",
    role: {
      en: "Founder, Apex Auto Repair",
      fr: "Fondatrice, Apex Auto Repair",
      ar: "المؤسسة، Apex Auto Repair",
    },
  },
  {
    id: "dashify",
    quote: {
      en: "The dashboard they built runs our entire operation. Clean, fast, exactly what we needed.",
      fr: "Le tableau de bord qu'ils ont créé fait tourner toute notre activité. Clair, rapide, exactement ce qu'il nous fallait.",
      ar: "لوحة التحكم التي بنوها تدير عملياتنا بالكامل. نظيفة وسريعة، وبالضبط ما كنا نحتاجه.",
    },
    name: "David Chen",
    role: {
      en: "CTO, Dashify",
      fr: "CTO, Dashify",
      ar: "المدير التقني، Dashify",
    },
  },
  {
    id: "aqualuxe",
    quote: {
      en: "Fastest, most professional team we've worked with. Zero hand-holding required.",
      fr: "L'équipe la plus rapide et la plus professionnelle avec qui nous ayons travaillé. Aucun accompagnement de main nécessaire.",
      ar: "أسرع وأكثر فريق احترافية عملنا معه. لا حاجة لأي متابعة مستمرة.",
    },
    name: "Amira Haddad",
    role: {
      en: "Marketing Director, Aqualuxe",
      fr: "Directrice Marketing, Aqualuxe",
      ar: "مديرة التسويق، Aqualuxe",
    },
  },
  {
    id: "bella-cucina",
    quote: {
      en: "They delivered a booking system our competitors still can't match.",
      fr: "Ils ont livré un système de réservation que nos concurrents n'égalent toujours pas.",
      ar: "قدّموا نظام حجز لا يزال منافسونا غير قادرين على مجاراته.",
    },
    name: "James Okafor",
    role: {
      en: "Owner, Bella Cucina Trattoria",
      fr: "Propriétaire, Bella Cucina Trattoria",
      ar: "المالك، Bella Cucina Trattoria",
    },
  },
  {
    id: "lumiere",
    quote: {
      en: "Beautiful work, delivered early, priced fair. We've sent them three referrals already.",
      fr: "Un travail magnifique, livré en avance, à un prix juste. Nous leur avons déjà envoyé trois recommandations.",
      ar: "عمل رائع، تم تسليمه مبكرًا وبسعر عادل. أحلنا إليهم بالفعل ثلاث توصيات.",
    },
    name: "Lucas Bernard",
    role: {
      en: "CEO, Lumiere",
      fr: "PDG, Lumiere",
      ar: "الرئيس التنفيذي، Lumiere",
    },
  },
  {
    id: "maos",
    quote: {
      en: "Our CRM finally makes sense. The team actually listened to how we work.",
      fr: "Notre CRM a enfin du sens. L'équipe a vraiment écouté notre façon de travailler.",
      ar: "أصبح نظام إدارة علاقات العملاء لدينا منطقيًا أخيرًا. الفريق أصغى فعلاً لطريقة عملنا.",
    },
    name: "Nadia Rahman",
    role: {
      en: "Ops Lead, MAOS",
      fr: "Responsable Opérations, MAOS",
      ar: "مسؤولة العمليات، MAOS",
    },
  },
  {
    id: "velo",
    quote: {
      en: "From first call to launch it felt effortless. The site looks like a million bucks.",
      fr: "Du premier appel au lancement, tout a semblé sans effort. Le site a l'air de valoir une fortune.",
      ar: "من أول مكالمة وحتى الإطلاق، شعرنا أن كل شيء سار دون عناء. الموقع يبدو وكأنه يساوي ملايين الدولارات.",
    },
    name: "Emma Thompson",
    role: {
      en: "Founder, VELO",
      fr: "Fondatrice, VELO",
      ar: "المؤسسة، VELO",
    },
  },
  {
    id: "signalpro",
    quote: {
      en: "Avexa is the rare studio that ships premium design AND rock-solid engineering.",
      fr: "Avexa est l'un des rares studios à livrer à la fois un design haut de gamme ET une ingénierie solide comme le roc.",
      ar: "أفيكسا استوديو نادر يجمع بين تصميم فاخر وهندسة برمجية متينة للغاية.",
    },
    name: "Youssef El-Masri",
    role: {
      en: "Product Manager, SignalPro",
      fr: "Chef de Produit, SignalPro",
      ar: "مدير المنتج، SignalPro",
    },
  },
];
