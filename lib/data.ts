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

/** Build an encoded /shall path. */
const sh = (name: string) => `/shall/${encodeURIComponent(name)}`;

/** Photographs shot by Shall, our expedition photographer (/public/shall). */
export const shallPhotos: GalleryItem[] = [
  { src: sh("Nepal-36.jpg"), alt: "First light in the Nepal Himalaya", tall: true },
  { src: sh("Nepal-83.jpg"), alt: "On the trail, Nepal" },
  { src: sh("Mt Aspiring-1.jpg"), alt: "Mt Aspiring, New Zealand", tall: true },
  { src: sh("Nepal-101.jpg"), alt: "High village, Nepal" },
  { src: sh("Nepal-128.jpg"), alt: "Prayer flags and peaks" },
  { src: sh("Tama Lakes-39.jpg"), alt: "Tama Lakes, eastern Nepal", tall: true },
  { src: sh("Nepal-169.jpg"), alt: "Glacial valley, Nepal" },
  { src: sh("Nepal-56.jpg"), alt: "Porters on the high trail" },
  { src: sh("Mt Aspiring-88.jpg"), alt: "Alpine ridgeline, Mt Aspiring", tall: true },
  { src: sh("Nepal-181.jpg"), alt: "Monastery in the mountains" },
  { src: sh("Nepal-64.jpg"), alt: "Camp beneath the summits" },
  { src: sh("Nepal-186.jpg"), alt: "Last light on the range" },
  { src: sh("Tama Lakes-60.jpg"), alt: "Sacred lakes at altitude", tall: true },
  { src: sh("Nepal-102.jpg"), alt: "Trail through the high country" },
  { src: sh("Nepal-132.jpg"), alt: "Himalayan portrait" },
];

/** Photography — a service we offer: a dedicated pro team, led by Shall. */
export const shall = {
  name: "Shall",
  role: "Lead photographer",
  feature: sh("Nepal-36.jpg"),
  portrait: sh("Nepal-56.jpg"),
  lead: "Professional photography is one of the experiences we can build into your trip.",
  intro:
    "Once a year we run a dedicated photography expedition — a small professional team, led by photographer Shall, joins a hand-picked trek and documents the whole journey. You walk; they capture it.",
  bio: [
    "Our photography team has spent years shooting across the Himalaya and the Southern Alps, from base-camp life to summit light. On these departures they're part of the rope team, not bystanders — capturing the trek as it really happens.",
    "Every trekker on a photography trip goes home with a professionally edited gallery, and anyone who wants to learn gets hands-on coaching on the trail.",
  ],
  offers: [
    "A dedicated professional photo team",
    "Runs once a year, on select treks",
    "Fully edited gallery of the trip, included",
    "On-trail coaching for any level or camera",
  ],
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
  /** "trek" (default) or "peak" — drives detail-page facts & routing */
  kind?: "trek" | "peak";
  /** for peaks: "6000m" | "7000m" */
  band?: string;
};

/** Reasons-to-book shown in the booking sidebar of every detail page. */
export const huxDifference = [
  "20+ years of Himalayan experience",
  "Nepal-based, fully licensed operator",
  "Small groups · max 10 trekkers",
  "Licensed local guides & fair-wage crew",
  "5% of every booking funds mental health",
];

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
  {
    slug: "kanchenjunga-circuit",
    name: "Kanchenjunga Circuit",
    region: "Eastern Nepal · Taplejung",
    meta: "Full North–South Circuit",
    days: "28 days",
    altitude: "5,143 m",
    grade: "Strenuous",
    price: "from $3,950",
    season: "Mar–May · Sep–Nov",
    tagline: "The complete loop of the third-highest mountain",
    blurb:
      "The full circuit linking both base camps of Kanchenjunga over the high Sele La passes — the longest, wildest teahouse trek in Nepal, walked by only a handful of groups a year.",
    overview: [
      "The complete Kanchenjunga circuit is a serious undertaking: nearly a month on foot through restricted country, from sub-tropical forest to glacial moraine and back, with a high-pass traverse linking the north and south sides of the massif.",
      "We walk it at a sustainable pace with built-in acclimatisation, local crew and all permits handled, standing beneath five of the world's eight-thousanders along the way.",
    ],
    image: photos.demali,
    hero: photos.demali,
    gallery: [photos.himalayas, photos.nightSky, photos.walking, photos.snowedIn],
    highlights: ["Full north–south circuit", "Sele La pass traverse", "Five 8,000 m peaks in view", "Deep restricted wilderness"],
    included: [
      "Restricted-area & national-park permits",
      "Licensed guide + full support crew",
      "Teahouse / homestay accommodation",
      "All ground transport & domestic flights",
      "Pre-trip briefing & gear check",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–03", title: "Fly east → trailhead", detail: "Fly east and drive up through tea country to start walking." },
      { day: "04–09", title: "Ghunsa valley", detail: "Climb through forest and Limbu villages to the high north." },
      { day: "10–14", title: "North Base Camp · Pangpema", detail: "Acclimatise beneath the north face on the glacier moraine." },
      { day: "15–21", title: "Sele La traverse", detail: "Cross the linked high passes to the southern side." },
      { day: "22–28", title: "Oktang & descent", detail: "Reach South Base Camp, then descend and fly out." },
    ],
  },
  {
    slug: "lower-dolpo",
    name: "Lower Dolpo",
    region: "Trans-Himalaya · Phoksundo",
    meta: "Phoksundo & Tarap",
    days: "14 days",
    altitude: "5,115 m",
    grade: "Moderate–Strenuous",
    price: "from $2,650",
    season: "Apr–Oct",
    tagline: "Turquoise lakes and Bön valleys, the shorter way",
    blurb:
      "A shorter taste of Dolpo built around the impossibly blue Phoksundo Lake and the Tarap valley — the magic of the trans-Himalaya without the full Upper Dolpo commitment.",
    overview: [
      "Lower Dolpo opens the door to the same rain-shadow world as its upper sibling — Bön gompas, mani walls and yak caravans — on a route that's a fortnight rather than three weeks.",
      "We base the trek around Shey Phoksundo National Park and the Tarap valley, crossing a couple of high passes with time to soak in the lake and the villages.",
    ],
    image: photos.accommodation,
    hero: photos.accommodation,
    gallery: [photos.nepal, photos.khumbu, photos.walking, photos.weather],
    highlights: ["Phoksundo Lake", "Tarap valley & gompas", "Bön & Tibetan culture", "Quiet restricted trails"],
    included: [
      "Lower Dolpo & national-park permits",
      "Licensed guide + camping crew",
      "Full camping & meals on trek",
      "All ground transport & domestic flights",
      "Pre-trip briefing & gear check",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–02", title: "Fly west → Juphal", detail: "Fly via Nepalgunj into Dolpo and start down the valley." },
      { day: "03–05", title: "Phoksundo Lake", detail: "Trek to the turquoise lake and the village of Ringmo." },
      { day: "06–09", title: "Into the Tarap valley", detail: "Cross the high passes into the hidden Tarap." },
      { day: "10–12", title: "Tarap villages", detail: "Visit gompas and meet the herders of the high valley." },
      { day: "13–14", title: "Descent & fly out", detail: "Drop to Dunai and fly back out." },
    ],
  },
  {
    slug: "dhaulagiri-circuit",
    name: "Dhaulagiri Circuit",
    region: "Dhaulagiri Himal · Myagdi",
    meta: "French Col & Dhampus Pass",
    days: "18 days",
    altitude: "5,360 m",
    grade: "Strenuous · Alpine",
    price: "from $3,150",
    season: "Apr–May · Oct–Nov",
    tagline: "A true high-mountain circuit round the seventh-highest peak",
    blurb:
      "A committing camping circuit around Dhaulagiri, the world's seventh-highest mountain — glacier travel, two 5,000 m passes and base camp beneath a wall of ice.",
    overview: [
      "There are no teahouses here. The Dhaulagiri circuit is a full camping expedition that climbs the Myagdi Khola to Dhaulagiri Base Camp, then crosses French Col and Dhampus Pass into the Hidden Valley.",
      "It's one of Nepal's most alpine treks — glacier sections, real altitude and weather — rewarded with raw, close-up high-mountain scenery.",
    ],
    image: photos.snowedIn,
    hero: photos.snowedIn,
    gallery: [photos.cook, photos.aspiring1, photos.c2Ama, photos.prepping],
    highlights: ["Dhaulagiri Base Camp", "French Col (5,360 m)", "Hidden Valley & Dhampus Pass", "Full camping expedition"],
    included: [
      "National-park & area permits",
      "Licensed guide + full camping crew",
      "All camping gear & meals",
      "All ground transport from the trailhead",
      "Pre-trip briefing & gear check",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–03", title: "Drive → Beni → Babichaur", detail: "Drive west to Beni and start up the Myagdi Khola." },
      { day: "04–08", title: "Up the Myagdi", detail: "Trek through gorge and forest toward the glacier." },
      { day: "09–12", title: "Dhaulagiri Base Camp", detail: "Acclimatise beneath the north-east face." },
      { day: "13–16", title: "French Col & Hidden Valley", detail: "Cross the high cols into the Hidden Valley." },
      { day: "17–18", title: "Dhampus Pass & descent", detail: "Drop to Marpha and drive back out." },
    ],
  },
  {
    slug: "pikey-peak",
    name: "Pikey Peak",
    region: "Lower Solu · Khumbu fringe",
    meta: "Sherpa Culture & Everest View",
    days: "7 days",
    altitude: "4,065 m",
    grade: "Easy–Moderate",
    price: "from $1,250",
    season: "Oct–Dec · Mar–May",
    tagline: "Said to be the finest Everest viewpoint of all",
    blurb:
      "A short, gentle trek through lower Solu — rhododendron forest, Sherpa villages and monasteries — to a summit Tenzing Norgay called the best view of Everest anywhere.",
    overview: [
      "Pikey Peak is the antidote to the high, hard treks: low altitude, warm Sherpa hospitality and a sunrise summit looking across the whole Himalaya from Dhaulagiri to Kanchenjunga, with Everest dead centre.",
      "It's perfect as a first Himalayan trek, a warm-up, or a culture-rich week for anyone short on time — and it's quiet, far from the Everest crowds.",
    ],
    image: photos.walking,
    hero: photos.walking,
    gallery: [photos.khumbu, photos.nepal, photos.himalayas, photos.accommodation],
    highlights: ["Sunrise Everest panorama", "Sherpa villages & monasteries", "Low altitude, big reward", "Great first Himalayan trek"],
    included: [
      "TIMS & local permits",
      "Licensed guide + porters",
      "Teahouse accommodation",
      "All ground transport",
      "Pre-trip briefing",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01", title: "Drive → Dhap", detail: "Scenic drive east from the city to the trailhead." },
      { day: "02–03", title: "Into Sherpa country", detail: "Walk through forest and villages toward Pikey." },
      { day: "04", title: "Pikey Peak sunrise", detail: "Pre-dawn climb for the full Himalayan panorama." },
      { day: "05–06", title: "Monasteries & descent", detail: "Visit Thuptenchholing and descend through Solu." },
      { day: "07", title: "Drive back", detail: "Return drive to the city." },
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
    text: "Once a year a dedicated professional photo team joins a select trek to shoot the whole journey — a service you can book onto.",
  },
  {
    icon: "heart",
    title: "We give back",
    text: "5% of every booking funds men's mental health and suicide-prevention work. Built into the price, no fine print.",
  },
];

/* ----------------------------------------------------------------- */
/*  Mountaineering peaks (full expeditions with detail pages)         */
/* ----------------------------------------------------------------- */
type PeakInput = {
  slug: string;
  name: string;
  height: string;
  region: string;
  days: string;
  priceUSD: number;
  grade: string;
  season: string;
  image: string;
  gallery: string[];
  tagline: string;
  blurb: string;
  highlights: string[];
};

function makePeak(p: PeakInput): Trek {
  const band = parseInt(p.height.replace(/\D/g, ""), 10) >= 7000 ? "7000m" : "6000m";
  const area = p.region.split("·").pop()?.trim() ?? p.region;
  const approach = p.region.split("·")[0].trim();
  return {
    kind: "peak",
    band,
    slug: p.slug,
    name: p.name,
    region: p.region,
    meta: `${p.height} · ${band} peak`,
    days: p.days,
    altitude: p.height,
    grade: p.grade,
    price: `from $${p.priceUSD.toLocaleString("en-US")}`,
    season: p.season,
    tagline: p.tagline,
    blurb: p.blurb,
    overview: [
      `${p.name} (${p.height}) is one of Nepal's classic ${band} objectives, climbed from a base camp in the ${area} with a careful acclimatisation plan and a strong local climbing crew.`,
      "We run it as a fully guided expedition — fixed lines on the technical ground, experienced Sherpa support and generous summit windows — so you can focus on the climb itself.",
    ],
    image: p.image,
    hero: p.image,
    gallery: p.gallery,
    highlights: p.highlights,
    included: [
      "All climbing & national-park permits",
      "Lead climbing guide + Sherpa crew",
      "Base camp & high-camp tents and meals",
      "Group climbing hardware & fixed ropes",
      "All ground transport & domestic flights",
      "5% donated to men's mental health",
    ],
    itinerary: [
      { day: "01–02", title: "Arrive & brief", detail: "Gear check, permits and final prep before flying out." },
      { day: "03–06", title: "Trek to base camp", detail: `Walk in through the ${approach} approach to base camp.` },
      { day: "07–10", title: "Acclimatisation rotations", detail: "Carry loads and sleep high to prepare for the summit." },
      { day: "11–13", title: "Summit push", detail: `Move to high camp and climb ${p.name} on the first clear window.` },
      { day: "14–16", title: "Descend & return", detail: "Strike base camp, trek out and fly back." },
    ],
  };
}

export const peakExpeditions: Trek[] = [
  makePeak({
    slug: "island-peak",
    name: "Island Peak",
    height: "6,189 m",
    region: "Khumbu · Imja valley",
    days: "16 days",
    priceUSD: 2950,
    grade: "Trekking peak · PD+",
    season: "Apr–May · Oct–Nov",
    image: photos.c2Ama,
    gallery: [photos.amaBaseCamp, photos.prepping, photos.snowedIn, photos.walking],
    tagline: "Nepal's most popular first 6,000 m summit",
    blurb:
      "Imja Tse — Island Peak — is the classic introduction to Himalayan climbing: a glacier approach, a fixed-rope headwall and a knife-edge summit ridge deep in the Khumbu.",
    highlights: ["Classic first 6,000 m peak", "Imja glacier & headwall", "Pairs with Everest Base Camp", "Big Lhotse & Makalu views"],
  }),
  makePeak({
    slug: "mera-peak",
    name: "Mera Peak",
    height: "6,476 m",
    region: "Hinku · Mera La",
    days: "18 days",
    priceUSD: 3150,
    grade: "Trekking peak · PD",
    season: "Apr–May · Oct–Nov",
    image: photos.snowedIn,
    gallery: [photos.c2Ama, photos.prepping, photos.cook, photos.walking],
    tagline: "The highest trekking peak in Nepal",
    blurb:
      "The highest of Nepal's trekking peaks, Mera is more about altitude and endurance than technical climbing — and rewards you with five 8,000 m peaks on the skyline.",
    highlights: ["Highest trekking peak", "Five 8,000ers from the top", "Remote Hinku approach", "Glacier summit, low technicality"],
  }),
  makePeak({
    slug: "lobuche-east",
    name: "Lobuche East",
    height: "6,119 m",
    region: "Khumbu · Lobuche",
    days: "15 days",
    priceUSD: 2850,
    grade: "Trekking peak · PD+",
    season: "Apr–May · Oct–Nov",
    image: photos.amaBaseCamp,
    gallery: [photos.c2Ama, photos.prepping, photos.snowedIn, photos.demali],
    tagline: "A sharp, scenic peak above the Khumbu glacier",
    blurb:
      "A genuinely alpine trekking peak above Lobuche village — mixed snow and rock to an airy summit, with the whole Everest skyline at your back.",
    highlights: ["Airy alpine summit", "Everest & Nuptse panorama", "Great EBC add-on", "Real mixed climbing"],
  }),
  makePeak({
    slug: "baruntse",
    name: "Baruntse",
    height: "7,162 m",
    region: "Khumbu · Hunku basin",
    days: "30 days",
    priceUSD: 8900,
    grade: "Expedition · AD",
    season: "Apr–May · Oct",
    image: photos.demali,
    gallery: [photos.c2Ama, photos.snowedIn, photos.prepping, photos.cook],
    tagline: "A committing 7,000 m expedition between giants",
    blurb:
      "Baruntse sits in a remote glacial basin ringed by Everest, Lhotse and Makalu — a serious, fixed-rope 7,000 m expedition for climbers ready to step up.",
    highlights: ["Remote Hunku basin", "Classic south-east ridge", "Surrounded by 8,000ers", "True expedition logistics"],
  }),
  makePeak({
    slug: "himlung-himal",
    name: "Himlung Himal",
    height: "7,126 m",
    region: "Manaslu · Nar Phu",
    days: "27 days",
    priceUSD: 7900,
    grade: "Expedition · PD+/AD",
    season: "Apr–May · Sep–Oct",
    image: photos.snowedIn,
    gallery: [photos.demali, photos.c2Ama, photos.prepping, photos.walking],
    tagline: "One of the friendliest first 7,000 m peaks",
    blurb:
      "Tucked behind the Nar Phu valley near the Tibet border, Himlung is widely seen as one of the most achievable 7,000 m peaks — a perfect step toward the 8,000ers.",
    highlights: ["Approachable first 7,000er", "Remote Nar Phu approach", "Strong success rate", "Stepping stone to 8,000 m"],
  }),
  makePeak({
    slug: "putha-hiunchuli",
    name: "Putha Hiunchuli",
    height: "7,246 m",
    region: "Dhaulagiri · Dolpo edge",
    days: "28 days",
    priceUSD: 8200,
    grade: "Expedition · PD+",
    season: "Apr–May · Oct",
    image: photos.cook,
    gallery: [photos.snowedIn, photos.demali, photos.prepping, photos.aspiring1],
    tagline: "The western anchor of the Dhaulagiri Himal",
    blurb:
      "Also called Dhaulagiri VII, Putha Hiunchuli rises at the wild western end of the Dhaulagiri range on the edge of Dolpo — a quiet, scenic 7,000 m objective.",
    highlights: ["Remote western Dhaulagiri", "Quiet, low-traffic peak", "Edge of the Dolpo wilderness", "Glaciated summit slopes"],
  }),
];

export const peaks7000 = peakExpeditions.filter((p) => p.band === "7000m");
export const peaks6000 = peakExpeditions.filter((p) => p.band === "6000m");

/** Every bookable expedition (treks + peaks). */
export const allExpeditions: Trek[] = [...featuredTreks, ...peakExpeditions];
export const getExpedition = (slug: string) =>
  allExpeditions.find((e) => e.slug === slug);
export const getPeak = (slug: string) =>
  peakExpeditions.find((e) => e.slug === slug);

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
      "Having Shall shoot the whole trek meant I could just be there — and I came home with a gallery of work I'm genuinely proud of.",
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
export type Faq = { q: string; a: string; icon: string; img: string };

export const faqs: Faq[] = [
  {
    q: "Do I need previous trekking experience?",
    a: "For the flagship treks (Kanchenjunga, Dolpo) you should be a fit, regular hiker comfortable with multi-day walks and altitude. We grade every trip and are happy to suggest a build-up route if you're newer to it.",
    icon: "gauge",
    img: photos.walking,
  },
  {
    q: "How do the restricted-area permits work?",
    a: "Upper Dolpo and Kanchenjunga both sit in restricted zones that require special permits and a registered guide. We arrange every permit end-to-end — it's all included in your trip price.",
    icon: "flag",
    img: photos.demali,
  },
  {
    q: "How big are the groups?",
    a: "Ten trekkers maximum, often fewer. Smaller groups move at a human pace, tread lighter and mean you actually get to know your guides and each other.",
    icon: "users",
    img: photos.baseCamp,
  },
  {
    q: "What's this about men's mental health?",
    a: "Five percent of every booking goes directly to organisations working on men's mental health and suicide prevention. It's built into the price — no upsell, reported back each season.",
    icon: "heart",
    img: photos.carries,
  },
  {
    q: "When is the best time to go?",
    a: "Spring (Mar–May) and autumn (Sep–Nov) are prime for most Himalayan treks. Dolpo, in the rain shadow, is best in summer (May–Sep) when the rest of Nepal is wet.",
    icon: "calendar",
    img: photos.nightSky,
  },
  {
    q: "Is travel insurance required?",
    a: "Yes — comprehensive insurance covering high-altitude trekking and helicopter evacuation is mandatory on all our trips. We'll point you to providers we trust.",
    icon: "shield",
    img: photos.snowedIn,
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

export type NavChild = { label: string; href: string; note?: string; icon?: string };
export type NavItem = {
  label: string;
  href: string;
  columns?: number; // mega-menu column count (default 1)
  children?: NavChild[];
  cta?: { label: string; href: string };
};

/** Primary navigation — several items expand a floating mega-menu. */
export const nav: NavItem[] = [
  {
    label: "Treks",
    href: "/treks",
    columns: 2,
    cta: { label: "View all treks", href: "/treks" },
    children: [
      { label: "Kanchenjunga Base Camp", href: "/treks/kanchenjunga", icon: "tent", note: "24 days · 5,143 m" },
      { label: "Kanchenjunga Circuit", href: "/treks/kanchenjunga-circuit", icon: "route", note: "28 days · 5,143 m" },
      { label: "Upper Dolpo Trek", href: "/treks/dolpo", icon: "mappin", note: "21 days · 5,360 m" },
      { label: "Lower Dolpo Trek", href: "/treks/lower-dolpo", icon: "mappin", note: "14 days · 5,115 m" },
      { label: "Tsum Valley Trek", href: "/treks/manaslu-tsum", icon: "compass", note: "18 days · 5,106 m" },
      { label: "Dhaulagiri Circuit", href: "/treks/dhaulagiri-circuit", icon: "route", note: "18 days · 5,360 m" },
      { label: "Pikey Peak Trek", href: "/treks/pikey-peak", icon: "mountain", note: "7 days · 4,065 m" },
    ],
  },
  {
    label: "Mountaineering",
    href: "/mountaineering",
    cta: { label: "View all peaks", href: "/mountaineering" },
    children: [
      { label: "7000m Peaks", href: "/#peaks-7000", icon: "mountain", note: "Expedition objectives" },
      { label: "6000m Peaks", href: "/#peaks-6000", icon: "peak", note: "Trekking peaks · first summits" },
    ],
  },
  { label: "Photography", href: "/photography" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "About",
    href: "/about",
    cta: { label: "About HUX EXPED", href: "/about" },
    children: [
      { label: "Our story", href: "/about#our-story", icon: "compass", note: "Why Hux Exped exists" },
      { label: "Our team", href: "/about#our-team", icon: "users", note: "The people who get you up there" },
      { label: "Certifications & associations", href: "/about#certifications", icon: "shield", note: "Licensed & accredited" },
      { label: "Why us", href: "/about#why-us", icon: "star", note: "What sets us apart" },
      { label: "Testimonials", href: "/about#testimonials", icon: "heart", note: "Words from the rope team" },
    ],
  },
  {
    label: "Guidance",
    href: "/guidance",
    columns: 2,
    cta: { label: "All guidance", href: "/guidance" },
    children: [
      { label: "Gear list", href: "/guidance#gear-list", icon: "shield" },
      { label: "Altitude sickness", href: "/guidance#altitude-sickness", icon: "gauge" },
      { label: "Mountaineering guide", href: "/guidance#mountaineering-guide", icon: "users" },
      { label: "Nepal visa", href: "/guidance#nepal-visa", icon: "mappin" },
      { label: "TIMS & other permits", href: "/guidance#permits", icon: "flag" },
      { label: "Travel suggestions", href: "/guidance#travel-suggestions", icon: "compass" },
      { label: "Travel insurance", href: "/guidance#travel-insurance", icon: "heart" },
    ],
  },
  { label: "Contact", href: "/#contact" },
];

/** Compact link set used in the footer columns. */
export const navLinks = [
  { label: "Treks", href: "/treks" },
  { label: "Mountaineering", href: "/mountaineering" },
  { label: "Photography", href: "/photography" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Guidance", href: "/guidance" },
  { label: "Contact", href: "/#contact" },
];

/* ----------------------------------------------------------------- */
/*  Our team + accreditation (About page)                            */
/* ----------------------------------------------------------------- */
export const team = [
  { name: "Pemba Sherpa", role: "Founder & lead guide", note: "Two decades on Himalayan trails; happiest above 5,000 m.", img: photos.carries },
  { name: "Mingma Dorje", role: "Senior mountain guide", note: "Restricted-area specialist — Dolpo, Mustang and the far east.", img: photos.prepping },
  { name: "Anna Whitfield", role: "Expedition doctor", note: "Wilderness medic keeping the whole team moving and well.", img: photos.weather },
  { name: "Tashi Lama", role: "Logistics & permits", note: "Handles every permit, flight and yak so you don't have to.", img: photos.walking },
];

export const certifications = [
  { name: "Nepal Mountaineering Association", short: "NMA" },
  { name: "Trekking Agencies' Association of Nepal", short: "TAAN" },
  { name: "Nepal Tourism Board licensed", short: "NTB" },
  { name: "Wilderness First Responder certified", short: "WFR" },
  { name: "IFMGA-affiliated mountain guides", short: "IFMGA" },
  { name: "Adventure Travel Trade Association", short: "ATTA" },
];

/* ----------------------------------------------------------------- */
/*  Guidance topics (/guidance)                                      */
/* ----------------------------------------------------------------- */
export type GuideTopic = {
  slug: string;
  icon: string;
  title: string;
  lead: string;
  points?: string[];
};

export const guidance: GuideTopic[] = [
  {
    slug: "gear-list",
    icon: "shield",
    title: "Gear list",
    lead: "Pack light, pack right. We send a full kit list on booking — here's the backbone of it for a high Himalayan trek.",
    points: [
      "Layering system: base, mid, insulated down, hard shell",
      "Broken-in waterproof trekking boots + camp shoes",
      "4-season sleeping bag (−15 °C comfort) & liner",
      "Sun protection: glacier glasses, hat, SPF 50",
      "Headtorch, refillable bottles, water purification",
      "Personal first-aid + any prescription medication",
    ],
  },
  {
    slug: "altitude-sickness",
    icon: "gauge",
    title: "Altitude sickness",
    lead: "Acute Mountain Sickness is the single biggest risk at altitude. Our itineraries are built around slow, safe acclimatisation.",
    points: [
      "Ascend gradually — extra nights built in above 3,500 m",
      "Hydrate hard and walk at a conversational pace",
      "Know the signs: headache, nausea, poor sleep, dizziness",
      "Never ascend with worsening symptoms — descend",
      "Guides carry a pulse oximeter and emergency oxygen",
    ],
  },
  {
    slug: "mountaineering-guide",
    icon: "users",
    title: "Mountaineering guide",
    lead: "Every trip is led by licensed Nepali guides who grew up in these mountains, with low client-to-guide ratios.",
    points: [
      "Maximum ten trekkers per departure, often fewer",
      "Climbing trips run with a dedicated rope-leader",
      "All guides are first-aid and rescue trained",
      "Local porters and crew, fairly paid and equipped",
    ],
  },
  {
    slug: "nepal-visa",
    icon: "mappin",
    title: "Nepal visa",
    lead: "Most nationalities get a visa on arrival at Kathmandu airport or land borders. Bring the essentials and it's quick.",
    points: [
      "Passport valid 6+ months with a blank page",
      "One passport photo + USD cash for the fee",
      "15 / 30 / 90-day tourist visas available",
      "Apply online beforehand to skip the queue",
    ],
  },
  {
    slug: "permits",
    icon: "flag",
    title: "TIMS & other permits",
    lead: "Trekking in Nepal needs the right paperwork. We arrange every permit end-to-end — it's included in your trip price.",
    points: [
      "TIMS card for trekking regions",
      "National-park & conservation-area entry permits",
      "Restricted-area permits (Dolpo, Kanchenjunga, Mustang…)",
      "Climbing permits for trekking & expedition peaks",
    ],
  },
  {
    slug: "travel-suggestions",
    icon: "compass",
    title: "Travel suggestions",
    lead: "A few things that make the trip smoother, from when to come to what to do either side of the trek.",
    points: [
      "Best seasons: spring (Mar–May) & autumn (Sep–Nov)",
      "Arrive 1–2 days early to buffer flight delays",
      "Pack a soft duffel for porters, daypack for yourself",
      "Carry small cash for tea houses and tips",
    ],
  },
  {
    slug: "travel-insurance",
    icon: "heart",
    title: "Travel insurance",
    lead: "Comprehensive insurance is mandatory on every trip. It must cover high-altitude trekking and helicopter evacuation.",
    points: [
      "Cover to your trek's maximum altitude",
      "Helicopter search, rescue & evacuation included",
      "Medical, repatriation and trip cancellation",
      "We'll point you to providers we trust",
    ],
  },
];
