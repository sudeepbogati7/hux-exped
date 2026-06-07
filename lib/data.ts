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
/*  Real expedition photography (in /public/gallery)                  */
/* ----------------------------------------------------------------- */
/** Build an encoded /gallery URL from a raw filename. */
export const g = (name: string) => `/gallery/${encodeURIComponent(name)}`;

/** Named photos used across the site. */
export const photos = {
  himalayas: g("Himalayas.jpg"),
  nightSky: g("Khumbu Night Sky.jpg"),
  baseCamp: g("Base Camp.jpg"),
  amaBaseCamp: g("Ama Base Camp.jpg.jpeg"),
  c2Ama: g("C2 Ama.png"),
  carries: g("Carries on Ama.jpg"),
  demali: g("Demali Summit Ridge.jpg"),
  khumbu: g("Khumbu.jpg"),
  accommodation: g("Mountain Accomodation.jpg"),
  aspiring1: g("Mt Aspiring-67.jpg"),
  aspiring2: g("Mt Aspiring-86 (3).jpg"),
  aspiring3: g("Mt Aspiring-90 (1).jpg"),
  cook: g("Mt Cook.JPG"),
  nepal: g("Nepal.jpg"),
  prepping: g("Prepping Sysytems.jpg"),
  snowedIn: g("Snowed IN.jpg"),
  walking: g("Walking Khumbu.jpg"),
  weather: g("Weather updates.jpg"),
};

export type GalleryItem = { src: string; alt: string; tall?: boolean };

/** Curated set for the home gallery + the full /gallery page. */
export const galleryPhotos: GalleryItem[] = [
  { src: photos.himalayas, alt: "The Himalaya stretching to the horizon", tall: true },
  { src: photos.carries, alt: "Carrying loads high on Ama Dablam" },
  { src: photos.nightSky, alt: "Night sky over the Khumbu", tall: true },
  { src: photos.baseCamp, alt: "Expedition base camp under the peaks" },
  { src: photos.walking, alt: "Walking out through the Khumbu" },
  { src: photos.demali, alt: "On the Demali summit ridge", tall: true },
  { src: photos.snowedIn, alt: "Snowed in at high camp" },
  { src: photos.cook, alt: "Aoraki / Mt Cook" },
  { src: photos.c2Ama, alt: "Camp 2 on Ama Dablam", tall: true },
  { src: photos.accommodation, alt: "Mountain accommodation on the trail" },
  { src: photos.aspiring1, alt: "Mt Aspiring, New Zealand" },
  { src: photos.prepping, alt: "Prepping systems before a climb" },
  { src: photos.nepal, alt: "Deep in the Nepal Himalaya", tall: true },
  { src: photos.amaBaseCamp, alt: "Ama Dablam base camp" },
  { src: photos.khumbu, alt: "The Khumbu valley" },
  { src: photos.weather, alt: "Checking weather updates at camp" },
  { src: photos.aspiring2, alt: "High on Mt Aspiring" },
  { src: photos.aspiring3, alt: "Ridgeline on Mt Aspiring" },
];

/** Showreel for the gallery. Drop the finished film at /public/gallery/showreel.mp4. */
export const showreel = {
  src: "/gallery/showreel.mp4",
  poster: photos.walking,
  title: "A season in the high places",
  meta: "Film · 2 min",
};

/** Per-trek photography (overrides the placeholder ids below). */
const trekArt: Record<string, { image: string; gallery: string[] }> = {
  kanchenjunga: { image: photos.himalayas, gallery: [photos.baseCamp, photos.walking, photos.demali, photos.nightSky] },
  dolpo: { image: photos.nepal, gallery: [photos.accommodation, photos.snowedIn, photos.weather, photos.khumbu] },
  "makalu-barun": { image: photos.khumbu, gallery: [photos.amaBaseCamp, photos.c2Ama, photos.carries, photos.prepping] },
  "nar-phu": { image: photos.walking, gallery: [photos.demali, photos.cook, photos.aspiring1, photos.accommodation] },
  "upper-mustang": { image: photos.demali, gallery: [photos.nepal, photos.himalayas, photos.snowedIn, photos.weather] },
  "manaslu-tsum": { image: photos.baseCamp, gallery: [photos.carries, photos.prepping, photos.walking, photos.c2Ama] },
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
  /** flagship treks get their own spotlight section on the home page */
  flagship?: boolean;
};

export const featuredTreks: Trek[] = [
  {
    slug: "kanchenjunga",
    flagship: true,
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
      "All ground transport to the trailhead",
      "Domestic flights to Bhadrapur",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–02", title: "Fly east → Taplejung", detail: "Fly east and drive to the trailhead through tea country." },
      { day: "03–07", title: "Into the Ghunsa valley", detail: "Climb through forest and Limbu villages toward the high country." },
      { day: "08–12", title: "North Base Camp · Pangpema", detail: "Acclimatise and walk the moraine to the foot of the north face." },
      { day: "13–18", title: "Crossing the high passes", detail: "Sele La and Sinion La link the north and south sides." },
      { day: "19–21", title: "South Base Camp · Oktang", detail: "Stand beneath the south face and the Yalung glacier." },
      { day: "22–24", title: "Descent & return", detail: "Drop back through Tortong and fly out." },
    ],
  },
  {
    slug: "dolpo",
    flagship: true,
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
      "Pre-trip briefing & gear check",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–03", title: "Fly west → Juphal", detail: "Fly via Nepalgunj into lower Dolpo and start walking." },
      { day: "04–06", title: "Phoksundo Lake", detail: "Reach the turquoise lake and the village of Ringmo." },
      { day: "07–11", title: "Into Upper Dolpo", detail: "Cross the Kang La and enter the restricted high country." },
      { day: "12–15", title: "Shey Gompa & Crystal Mountain", detail: "Visit the heart of Bön Dolpo beneath the sacred peak." },
      { day: "16–19", title: "High passes to Tarap", detail: "Traverse 5,000 m+ passes into the Tarap valley." },
      { day: "20–21", title: "Descent & fly out", detail: "Drop to Dunai and fly back out." },
    ],
  },
  {
    slug: "makalu-barun",
    name: "Makalu Barun",
    region: "Eastern Nepal · Barun Valley",
    meta: "Makalu Base Camp",
    days: "22 days",
    altitude: "5,250 m",
    grade: "Strenuous",
    price: "from $3,300",
    season: "Mar–May · Oct–Nov",
    tagline: "Under the fifth-highest face on earth",
    blurb:
      "A wild, roadless route through the Barun valley — cloud forest, hanging glaciers and the colossal black pyramid of Makalu, the world's fifth-highest peak, with almost nobody else on the trail.",
    overview: [
      "Makalu sits inside a vast conservation area east of Everest, reached only on foot through one of Nepal's last untouched watersheds. The Barun valley climbs from sub-tropical jungle to high glacial moraine in a few days, and the wildlife and plant life along the way are as much the draw as the peak itself.",
      "Our 22-day route works up to Makalu Base Camp beneath the south face, with time to acclimatise and explore the upper valley. Remote, committing and quietly spectacular.",
    ],
    image: uns("1486911278844-a81c5267e227", 1200),
    hero: uns("1486911278844-a81c5267e227", 2200, 78),
    gallery: [
      uns("1454496522488-7a8e488e8606", 1000),
      uns("1464822759023-fed622ff2c3b", 1000),
      uns("1506905925346-21bda4d32df4", 1000),
      uns("1469474968028-56623f02e42e", 1000),
    ],
    highlights: [
      "Makalu Base Camp · south face",
      "Barun valley cloud forest",
      "Makalu-Barun conservation area",
      "Genuine roadless wilderness",
    ],
    included: [
      "National-park & conservation permits",
      "Licensed guide + camping crew",
      "Full camping & meals on trek",
      "All ground transport & domestic flights",
      "Pre-trip briefing & gear check",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–03", title: "Fly east → Tumlingtar", detail: "Fly east and drive up to the trailhead at Num." },
      { day: "04–08", title: "Into the Barun", detail: "Climb through forest and the Shipton La into the upper valley." },
      { day: "09–14", title: "Makalu Base Camp", detail: "Acclimatise and walk the moraine beneath the south face." },
      { day: "15–19", title: "High valley & return", detail: "Explore the upper basin, then retrace through the forest." },
      { day: "20–22", title: "Descent & fly out", detail: "Drop to Tumlingtar and fly back out." },
    ],
  },
  {
    slug: "nar-phu",
    name: "Nar & Phu",
    region: "Manang · Hidden Valleys",
    meta: "Nar Phu & Kang La",
    days: "14 days",
    altitude: "5,320 m",
    grade: "Moderate–Strenuous",
    price: "from $2,450",
    season: "Mar–May · Sep–Nov",
    tagline: "Two medieval villages behind a locked gorge",
    blurb:
      "A short, sharp expedition into two Tibetan villages sealed behind a narrow gorge off the Annapurna circuit — chortens, blue sheep, fortress monasteries and the high Kang La pass.",
    overview: [
      "Nar and Phu were closed to outsiders until 2003 and still feel utterly medieval — stone villages, ancient gompas and yak pastures hung beneath fluted peaks. The walk in follows a dramatic gorge that few circuit trekkers ever turn up.",
      "Our 14-day loop visits both villages, crosses the 5,320 m Kang La into Manang and rejoins the classic Annapurna trail — a lot of wild, restricted country for a relatively short trip.",
    ],
    image: uns("1544735716-392fe2489ffa", 1200),
    hero: uns("1544735716-392fe2489ffa", 2200, 78),
    gallery: [
      uns("1486911278844-a81c5267e227", 1000),
      uns("1454496522488-7a8e488e8606", 1000),
      uns("1519681393784-d120267933ba", 1000),
      uns("1464822759023-fed622ff2c3b", 1000),
    ],
    highlights: [
      "Restricted Nar & Phu villages",
      "Kang La (5,320 m) crossing",
      "Tashi Lhakhang monastery",
      "Links onto the Annapurna circuit",
    ],
    included: [
      "Restricted-area & ACAP permits",
      "Licensed guide + support crew",
      "Teahouse accommodation",
      "All ground transport from the trailhead",
      "Pre-trip briefing & gear check",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–02", title: "Drive → Koto", detail: "Drive to Besisahar and up to the gorge mouth at Koto." },
      { day: "03–05", title: "Into the gorge", detail: "Climb the hidden canyon to Phu village." },
      { day: "06–08", title: "Phu & Nar", detail: "Explore the two villages and their monasteries." },
      { day: "09–11", title: "Kang La → Manang", detail: "Cross the high pass and drop into the Manang valley." },
      { day: "12–14", title: "Descent & return", detail: "Rejoin the circuit and drive back out." },
    ],
  },
  {
    slug: "upper-mustang",
    name: "Upper Mustang",
    region: "Trans-Himalaya · Lo Manthang",
    meta: "Forbidden Kingdom",
    days: "16 days",
    altitude: "3,840 m",
    grade: "Moderate",
    price: "from $2,900",
    season: "Apr–Oct",
    tagline: "The walled city of the old salt road",
    blurb:
      "A high-desert kingdom of ochre cliffs, sky caves and the walled capital of Lo Manthang — a fragment of old Tibet preserved in Nepal's rain shadow, north of the Annapurnas.",
    overview: [
      "Upper Mustang spent centuries as a forbidden Buddhist kingdom on the salt route to Tibet. Wind-carved canyons, cliff-cut cave dwellings and whitewashed gompas lead to Lo Manthang, a still-inhabited walled city of monasteries and a royal palace.",
      "Our 16-day route is moderate underfoot but high and dry, with time in Lo Manthang for the surrounding monasteries and cave complexes. Best walked in summer, when the rest of Nepal is under monsoon.",
    ],
    image: uns("1464822759023-fed622ff2c3b", 1200),
    hero: uns("1464822759023-fed622ff2c3b", 2200, 78),
    gallery: [
      uns("1506905925346-21bda4d32df4", 1000),
      uns("1469474968028-56623f02e42e", 1000),
      uns("1454496522488-7a8e488e8606", 1000),
      uns("1486911278844-a81c5267e227", 1000),
    ],
    highlights: [
      "Walled city of Lo Manthang",
      "Cliff caves & sky monasteries",
      "Ancient Tibetan salt road",
      "Summer rain-shadow trekking",
    ],
    included: [
      "Upper Mustang restricted permits",
      "Licensed guide + support crew",
      "Teahouse accommodation",
      "All ground transport & domestic flights",
      "Pre-trip briefing & gear check",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–03", title: "Fly → Jomsom", detail: "Fly to Pokhara and on to windy Jomsom to start." },
      { day: "04–07", title: "Up the Kali Gandaki", detail: "Climb the ochre canyons toward Lo country." },
      { day: "08–11", title: "Lo Manthang", detail: "Reach the walled city and explore caves and gompas." },
      { day: "12–14", title: "Eastern valleys", detail: "Loop back through quieter eastern villages." },
      { day: "15–16", title: "Descent & fly out", detail: "Return to Jomsom and fly back out." },
    ],
  },
  {
    slug: "manaslu-tsum",
    name: "Manaslu & Tsum",
    region: "Gorkha · Sacred Hidden Valley",
    meta: "Circuit & Tsum Valley",
    days: "18 days",
    altitude: "5,106 m",
    grade: "Strenuous",
    price: "from $2,750",
    season: "Mar–May · Sep–Nov",
    tagline: "A circuit round the eighth-highest peak",
    blurb:
      "The full loop around Manaslu plus a detour into the sacred Tsum valley — a hidden Buddhist enclave of mani walls and gompas, finishing over the snowbound Larkya La pass.",
    overview: [
      "Manaslu, the world's eighth-highest mountain, is ringed by a restricted circuit that still sees a fraction of the Annapurna crowds. We add the sacred Tsum valley — a sealed-off pocket of Tibetan Buddhism where hunting is forbidden and the old ways hold.",
      "Our 18-day route climbs from rice terraces to high alpine country and crosses the 5,106 m Larkya La, one of the most dramatic pass days in Nepal.",
    ],
    image: uns("1454496522488-7a8e488e8606", 1200),
    hero: uns("1454496522488-7a8e488e8606", 2200, 78),
    gallery: [
      uns("1519681393784-d120267933ba", 1000),
      uns("1486911278844-a81c5267e227", 1000),
      uns("1464822759023-fed622ff2c3b", 1000),
      uns("1506905925346-21bda4d32df4", 1000),
    ],
    highlights: [
      "Full Manaslu circuit",
      "Sacred Tsum valley detour",
      "Larkya La (5,106 m) pass",
      "Restricted, low-traffic trails",
    ],
    included: [
      "Manaslu & Tsum restricted permits",
      "Licensed guide + support crew & porters",
      "Teahouse accommodation",
      "All ground transport from the trailhead",
      "Pre-trip briefing & gear check",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–02", title: "Drive → Machha Khola", detail: "Drive west into Gorkha and start up the Budhi Gandaki." },
      { day: "03–06", title: "Into Tsum", detail: "Branch off into the sacred hidden valley and its gompas." },
      { day: "07–11", title: "Onto the circuit", detail: "Rejoin the main circuit and climb toward Samagaun." },
      { day: "12–15", title: "Larkya La", detail: "Cross the high snow pass into the Bimthang valley." },
      { day: "16–18", title: "Descent & return", detail: "Drop to Dharapani and drive back out." },
    ],
  },
];

export const getTrek = (slug: string) =>
  featuredTreks.find((t) => t.slug === slug);

// Swap the placeholder photography for the real expedition photos.
featuredTreks.forEach((t) => {
  const a = trekArt[t.slug];
  if (a) {
    t.image = a.image;
    t.hero = a.image;
    t.gallery = a.gallery;
  }
});

/** Treks that get a full spotlight section on the home page. */
export const flagshipTreks = featuredTreks.filter((t) => t.flagship);

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
/** Home-gallery preview (first slots of the curated set). */
export const galleryImages = galleryPhotos.slice(0, 7);

export const INSTAGRAM_URL = "https://instagram.com";

/** Scenes for the footer band. */
export const footerScenes = [
  photos.khumbu,
  photos.nepal,
  photos.himalayas,
  photos.baseCamp,
  photos.demali,
];

/* ----------------------------------------------------------------- */
/*  Navigation                                                        */
/* ----------------------------------------------------------------- */
/* ----------------------------------------------------------------- */
/*  Founder / story copy                                              */
/* ----------------------------------------------------------------- */
export const about = {
  mission: {
    eyebrow: "The mission",
    title: "There's more to life than sitting in front of a screen.",
    body: [
      "We figured that out somewhere between base camps — long enough on the sharp end of a rope to know that the best things happen when you stop overthinking and just go.",
      "That's what Hux Exped is. A reason to go. Ten people, a serious mountain, and a guide who genuinely loves this stuff.",
    ],
  },
  upThere: {
    eyebrow: "What happens up there",
    title: "What happens up there.",
    body: [
      "The mountains are logical. There are variables you can control and variables you can't. Our job is to manage both, and to watch what happens when people start figuring that out for themselves.",
      "Something shifts up there. It's hard to explain until you've felt it, but your problems stop feeling as heavy, and you find out pretty quickly that you're capable of a lot more than you thought. The people you walk with become part of that. Most of them stay in touch long after the mountain.",
    ],
  },
  bespoke: {
    eyebrow: "Bespoke",
    title: "Got something specific in mind?",
    body: "Group of friends. A team trip. Something a bit different. Talk to us — most of the best expeditions start with a conversation.",
  },
};

/** Shared "why we give back" copy (landing + about). */
export const giveBack = {
  eyebrow: "Why we give back",
  title: "Why we give back.",
  body: [
    "We run a charity called Surfing for Farmers, getting farmers out of isolation and into the sea. Same idea, different terrain. The mountains have done a lot for our own mental health, and we've seen them do the same for others.",
    "A portion of every Hux Exped booking goes to mental health charities. Because getting outside and doing something hard with good people works. We've seen it.",
  ],
  charity: "Surfing for Farmers",
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
};

/** Primary navigation. "Mountaineering" expands a floating mega-menu. */
export const nav: NavItem[] = [
  { label: "Treks", href: "#treks" },
  {
    label: "Mountaineering",
    href: "#mountaineering",
    children: [
      { label: "8000m Peaks", href: "#mountaineering", note: "Expedition objectives" },
      { label: "7000m Peaks", href: "#mountaineering", note: "Big alpine climbs" },
      { label: "Trekking Peaks (6000m)", href: "#mountaineering", note: "First summits" },
      { label: "Expedition Planning", href: "#contact", note: "Build a custom trip" },
    ],
  },
  { label: "Photography", href: "#photography" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "#contact" },
];

/** Compact link set used in the footer columns. */
export const navLinks = [
  { label: "Treks", href: "#treks" },
  { label: "Mountaineering", href: "#mountaineering" },
  { label: "Photography", href: "#photography" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];
