/**
 * HUX EXPED — content & asset data.
 *
 * Remote photos are hot-linked from the Unsplash CDN (verified 200).
 * Local hero/peak/cloud art lives in /public. See ASSETS.md to swap.
 */

/** Build a sized Unsplash CDN url from a photo id. */
export const uns = (id: string, w = 1600, q = 75) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

/* ----------------------------------------------------------------- */
/*  Local art                                                         */
/* ----------------------------------------------------------------- */
export const art = {
  peaks: ["/mountain1.png", "/mountain2.png", "/mountain3.png"],
  cloudy: "/moutain-cloudy.jpg",
  fog: "/image.png",
  cloud2: "/cloud2.jpg", // white cloud on dark → use with mix-blend-screen
};

/* ----------------------------------------------------------------- */
/*  Featured treks (+ detail-page content)                            */
/* ----------------------------------------------------------------- */
export type ItineraryDay = { day: string; title: string; detail: string };

export type Trek = {
  slug: string;
  name: string;
  region: string;
  meta: string;
  days: string;
  altitude: string;
  grade: string;
  price: string;
  season: string;
  tagline: string;
  blurb: string;
  overview: string[];
  image: string;
  hero: string;
  gallery: string[];
  highlights: string[];
  included: string[];
  itinerary: ItineraryDay[];
};

export const featuredTreks: Trek[] = [
  {
    slug: "kanchenjunga",
    name: "Kanchenjunga",
    region: "Eastern Nepal · Taplejung",
    meta: "Base Camp Circuit",
    days: "24 days",
    altitude: "5,143 m",
    grade: "Strenuous",
    price: "from $3,450",
    season: "Mar–May · Sep–Nov",
    tagline: "The wild eastern frontier",
    blurb:
      "The world's third-highest peak, guarding Nepal's wild eastern frontier. A remote, restricted-area expedition through rhododendron forest, glacial moraine and Limbu villages few outsiders ever reach.",
    overview: [
      "Kanchenjunga sits in a restricted corner of far-eastern Nepal, a long way from the teahouse crowds. Reaching both base camps means committing to real distance, real altitude and real wilderness — and being rewarded with an amphitheatre of 8,000-metre peaks almost nobody else is standing under.",
      "We run it as a 24-day circuit linking the north (Pangpema) and south (Oktang) base camps, walking through Limbu and Sherpa country, sub-tropical forest and high glacial moraine. Small group, local crew, special permits handled end to end.",
    ],
    image: uns("1627119703136-3964f14b7325", 1200),
    hero: uns("1627119703136-3964f14b7325", 2200, 78),
    gallery: [
      uns("1653479261226-41572113d661", 1000),
      uns("1624725412168-a8e69d4f7b36", 1000),
      uns("1596815360169-47166fc5115d", 1000),
      uns("1645033393602-4f7623917853", 1000),
    ],
    highlights: [
      "Both north & south base camps",
      "Restricted-area permits included",
      "Limbu & Sherpa village homestays",
      "Views of 5 of the world's 8,000ers",
    ],
    included: [
      "Restricted-area & national-park permits",
      "Licensed guide + support crew & porters",
      "Teahouse / homestay accommodation",
      "All ground transport from Kathmandu",
      "Domestic flights (KTM–Bhadrapur)",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–02", title: "Kathmandu → Taplejung", detail: "Fly east and drive to the trailhead through tea country." },
      { day: "03–07", title: "Into the Ghunsa valley", detail: "Climb through forest and Limbu villages toward the high country." },
      { day: "08–12", title: "North Base Camp · Pangpema", detail: "Acclimatise and walk the moraine to the foot of the north face." },
      { day: "13–18", title: "Crossing the high passes", detail: "Sele La and Sinion La link the north and south sides." },
      { day: "19–21", title: "South Base Camp · Oktang", detail: "Stand beneath the south face and the Yalung glacier." },
      { day: "22–24", title: "Descent & return", detail: "Drop back through Tortong and fly to Kathmandu." },
    ],
  },
  {
    slug: "dolpo",
    name: "Dolpo",
    region: "Trans-Himalaya · Shey Phoksundo",
    meta: "Upper Dolpo Traverse",
    days: "21 days",
    altitude: "5,360 m",
    grade: "Strenuous",
    price: "from $3,200",
    season: "May–Sep",
    tagline: "The Nepal of a thousand years ago",
    blurb:
      "Behind the Dhaulagiri massif lies a forbidden kingdom — turquoise Phoksundo Lake, ochre-walled gompas and a Bön culture sealed off by high passes. The Nepal of a thousand years ago.",
    overview: [
      "Upper Dolpo is a rain-shadow desert behind the main Himalaya — a Tibetan world of mani walls, ancient Bön monasteries and herders moving salt by yak. It opened to outsiders only recently, and still feels like stepping back a millennium.",
      "Our 21-day traverse begins at the impossibly blue Phoksundo Lake, crosses passes above 5,000 m and visits Shey Gompa beneath Crystal Mountain. It's high, dry and demanding — and one of the last truly remote walks left in Nepal.",
    ],
    image: uns("1609224584184-893bc7157d54", 1200),
    hero: uns("1609224584184-893bc7157d54", 2200, 78),
    gallery: [
      uns("1594309161197-b676ce294b84", 1000),
      uns("1518002054494-3a6f94352e9d", 1000),
      uns("1572109801525-0bb0272e8579", 1000),
      uns("1645033393602-4f7623917853", 1000),
    ],
    highlights: [
      "Turquoise Phoksundo Lake",
      "Shey Gompa & Crystal Mountain",
      "Ancient Bön & Tibetan culture",
      "True trans-Himalayan wilderness",
    ],
    included: [
      "Upper Dolpo restricted permits",
      "Licensed guide + camping crew",
      "Full camping & meals on trek",
      "All ground transport & domestic flights",
      "Pre-trip briefing in Kathmandu",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–03", title: "Kathmandu → Juphal", detail: "Fly via Nepalgunj into lower Dolpo and start walking." },
      { day: "04–06", title: "Phoksundo Lake", detail: "Reach the turquoise lake and the village of Ringmo." },
      { day: "07–11", title: "Into Upper Dolpo", detail: "Cross the Kang La and enter the restricted high country." },
      { day: "12–15", title: "Shey Gompa & Crystal Mountain", detail: "Visit the heart of Bön Dolpo beneath the sacred peak." },
      { day: "16–19", title: "High passes to Tarap", detail: "Traverse 5,000 m+ passes into the Tarap valley." },
      { day: "20–21", title: "Descent & fly out", detail: "Drop to Dunai and fly back to Kathmandu." },
    ],
  },
];

export const getTrek = (slug: string) =>
  featuredTreks.find((t) => t.slug === slug);

/* ----------------------------------------------------------------- */
/*  Why choose us                                                     */
/* ----------------------------------------------------------------- */
export type Feature = { title: string; text: string; icon: string };

export const features: Feature[] = [
  {
    icon: "compass",
    title: "Genuinely offbeat",
    text: "No Everest Base Camp queues. We run the restricted, hard-to-reach corners of Nepal — Kanchenjunga, Dolpo, Makalu, Nar Phu.",
  },
  {
    icon: "users",
    title: "Small groups",
    text: "Maximum ten trekkers per departure, walked at a human pace with room to actually meet the place.",
  },
  {
    icon: "shield",
    title: "Local expert guides",
    text: "Licensed Nepali guides and porters with decades on the trail — your safety, the language and the lore, all covered.",
  },
  {
    icon: "peak",
    title: "6,000–7,000 m peaks",
    text: "Ready for crampons? Trekking peaks and expedition objectives from Island Peak to Dhaulagiri.",
  },
  {
    icon: "camera",
    title: "Photography expeditions",
    text: "An annual small-crew adventure led by professional photographer Shal — chasing first light across the high valleys.",
  },
  {
    icon: "heart",
    title: "We give back",
    text: "5% of every booking funds men's mental health and suicide-prevention work. Built into the price, no fine print.",
  },
];

/* ----------------------------------------------------------------- */
/*  Mountaineering peaks                                              */
/* ----------------------------------------------------------------- */
export type Peak = { name: string; height: string; note: string };

export const peaks6000: Peak[] = [
  { name: "Island Peak", height: "6,189 m", note: "Imja Tse · Khumbu" },
  { name: "Mera Peak", height: "6,476 m", note: "Hinku Valley" },
  { name: "Lobuche East", height: "6,119 m", note: "Khumbu" },
  { name: "Chulu West", height: "6,419 m", note: "Manang" },
  { name: "Pisang Peak", height: "6,091 m", note: "Annapurna" },
];

export const peaks7000: Peak[] = [
  { name: "Annapurna II", height: "7,937 m", note: "Annapurna Himal" },
  { name: "Dhaulagiri", height: "8,167 m", note: "Expedition grade" },
  { name: "Baruntse", height: "7,162 m", note: "Khumbu" },
  { name: "Himlung Himal", height: "7,126 m", note: "Manaslu region" },
  { name: "Putha Hiunchuli", height: "7,246 m", note: "Dhaulagiri Himal" },
];

/* ----------------------------------------------------------------- */
/*  Stats                                                             */
/* ----------------------------------------------------------------- */
export const stats = [
  { value: 19, suffix: "+", label: "Years on the trail" },
  { value: 170, suffix: "+", label: "Expeditions led" },
  { value: 2000, suffix: "+", label: "Trekkers guided" },
];

/* ----------------------------------------------------------------- */
/*  Testimonials                                                      */
/* ----------------------------------------------------------------- */
export type Testimonial = {
  quote: string;
  name: string;
  trek: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Twenty-four days to Kanchenjunga and not another tourist in sight. The crew felt like family by the end. Genuinely the trip of my life.",
    name: "Marcus Ferdinand",
    trek: "Kanchenjunga Circuit",
    initials: "MF",
  },
  {
    quote:
      "Dolpo broke my idea of what Nepal is. Phoksundo at sunrise, Shey Gompa, the silence. HUX handled every permit and let us just be there.",
    name: "Aiko Tanaka",
    trek: "Upper Dolpo Traverse",
    initials: "AT",
  },
  {
    quote:
      "I came for the photography expedition with Shal and left with a hard drive of work I'm proud of — and a head that felt lighter than it had in years.",
    name: "Daniel O'Brien",
    trek: "Photography Expedition",
    initials: "DO",
  },
  {
    quote:
      "Small group, brilliant guides, no corners cut on safety. The mental-health pledge is the kind of thing you don't see in this industry.",
    name: "Priya Sharma",
    trek: "Mera Peak",
    initials: "PS",
  },
  {
    quote:
      "The acclimatisation plan was spot on — nobody in our group got sick. You can tell these guides have done it a hundred times.",
    name: "Lena Brandt",
    trek: "Manaslu Circuit",
    initials: "LB",
  },
  {
    quote:
      "Nar Phu felt like another planet. Mani walls, blue sheep, not a single other foreigner for days. Exactly what I'd hoped for.",
    name: "James Whitfield",
    trek: "Nar Phu Valley",
    initials: "JW",
  },
  {
    quote:
      "From the first email to the flight home, everything was handled. I just had to walk and look up. Already planning the next one.",
    name: "Hana Kim",
    trek: "Kanchenjunga Circuit",
    initials: "HK",
  },
  {
    quote:
      "I'm not a hardcore trekker and I still felt looked after every step. The pace, the food, the stories around the fire — perfect.",
    name: "Omar Haddad",
    trek: "Upper Dolpo Traverse",
    initials: "OH",
  },
];

/* ----------------------------------------------------------------- */
/*  FAQ                                                               */
/* ----------------------------------------------------------------- */
export const faqs = [
  {
    q: "Do I need previous trekking experience?",
    a: "For the flagship treks (Kanchenjunga, Dolpo) you should be a fit, regular hiker comfortable with multi-day walks and altitude. We grade every trip and are happy to suggest a build-up route if you're newer to it.",
  },
  {
    q: "How do the restricted-area permits work?",
    a: "Upper Dolpo and Kanchenjunga both sit in restricted zones that require special permits and a registered guide. We arrange every permit end-to-end — it's all included in your trip price.",
  },
  {
    q: "How big are the groups?",
    a: "Ten trekkers maximum, often fewer. Smaller groups move at a human pace, tread lighter and mean you actually get to know your guides and each other.",
  },
  {
    q: "What's this about men's mental health?",
    a: "Five percent of every booking goes directly to organisations working on men's mental health and suicide prevention. It's built into the price — no upsell, reported back each season.",
  },
  {
    q: "When is the best time to go?",
    a: "Spring (Mar–May) and autumn (Sep–Nov) are prime for most Himalayan treks. Dolpo, in the rain shadow, is best in summer (May–Sep) when the rest of Nepal is wet.",
  },
  {
    q: "Is travel insurance required?",
    a: "Yes — comprehensive insurance covering high-altitude trekking and helicopter evacuation is mandatory on all our trips. We'll point you to providers we trust.",
  },
];

/* ----------------------------------------------------------------- */
/*  Gallery (masonry)                                                 */
/* ----------------------------------------------------------------- */
export const galleryImages = [
  uns("1627119703136-3964f14b7325", 800),
  uns("1492146433370-dea32142adc3", 800),
  uns("1609224584184-893bc7157d54", 800),
  uns("1653479261226-41572113d661", 800),
  uns("1644109486706-0a115fdeb223", 800),
  uns("1518002054494-3a6f94352e9d", 800),
  uns("1529419244478-88b821449218", 800),
  uns("1696388882435-4a8a116dff2c", 800),
  uns("1594309161197-b676ce294b84", 800),
  uns("1624725412168-a8e69d4f7b36", 800),
  uns("1645033393602-4f7623917853", 800),
  uns("1596815360169-47166fc5115d", 800),
];

export const INSTAGRAM_URL = "https://instagram.com";

/** Nepal scenes for the footer band. */
export const footerScenes = [
  uns("1518002054494-3a6f94352e9d", 700),
  uns("1609224584184-893bc7157d54", 700),
  uns("1627119703136-3964f14b7325", 700),
  uns("1644109486706-0a115fdeb223", 700),
  uns("1594309161197-b676ce294b84", 700),
];

/* ----------------------------------------------------------------- */
/*  Navigation                                                        */
/* ----------------------------------------------------------------- */
export const navLinks = [
  { label: "Treks", href: "#treks" },
  { label: "Why us", href: "#why" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];
