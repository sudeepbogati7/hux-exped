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
  kanchenjunga: { image: "/moutains/kanchenjunga.png", gallery: [photos.baseCamp, photos.walking, photos.demali, photos.nightSky] },
  dolpo: { image: "/moutains/dolpo.png", gallery: [photos.accommodation, photos.snowedIn, photos.weather, photos.khumbu] },
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
  "5% funds village schools & health posts in Nepal",
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
      "5% funds village schools & health posts",
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
      "5% funds village schools & health posts",
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
      "5% funds village schools & health posts",
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
      "5% funds village schools & health posts",
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
      "5% funds village schools & health posts",
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
      "5% funds village schools & health posts",
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
      "5% funds village schools & health posts",
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
      "5% funds village schools & health posts",
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
      "5% funds village schools & health posts",
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
      "5% funds village schools & health posts",
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
export type Feature = { title: string; text: string; icon: string; img: string };

export const features: Feature[] = [
  {
    icon: "compass",
    img: "/why/offbeat-removebg-preview.png",
    title: "Genuinely offbeat",
    text: "No Everest Base Camp queues. We run the restricted, hard-to-reach corners of Nepal — Kanchenjunga, Dolpo, Makalu, Nar Phu.",
  },
  {
    icon: "users",
    img: "/why/small_group-removebg-preview.png",
    title: "Small groups",
    text: "Maximum ten trekkers per departure, walked at a human pace with room to actually meet the place.",
  },
  {
    icon: "shield",
    img: "/why/guide-removebg-preview.png",
    title: "Local expert guides",
    text: "Licensed Nepali guides and porters with decades on the trail — your safety, the language and the lore, all covered.",
  },
  {
    icon: "peak",
    img: "/why/Peaks_in_Monochrome-removebg-preview.png",
    title: "6,000–7,000 m peaks",
    text: "Ready for crampons? Trekking peaks and expedition objectives from Island Peak to Dhaulagiri.",
  },
  {
    icon: "camera",
    img: "/why/download__2_-removebg-preview.png",
    title: "Photography expeditions",
    text: "Once a year a dedicated professional photo team joins a select trek to shoot the whole journey — a service you can book onto.",
  },
  {
    icon: "heart",
    img: "/why/Contribution_capital_icon-removebg-preview.png",
    title: "We give back",
    text: "5% of every booking funds village schools and health posts in the Nepal valleys we trek. Built into the price, no fine print.",
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
      "5% funds village schools & health posts",
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
      "Small group, brilliant guides, no corners cut on safety. Knowing our booking helps fund schools in these valleys made it even better.",
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
    img: "/faq/previous-trek.png",
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
    img: "/faq/group.png",
  },
  {
    q: "What's this about giving back?",
    a: "Five percent of every booking goes directly to community-run village schools and health posts in the Nepal valleys we trek through. It's built into the price — no upsell, reported back each season.",
    icon: "heart",
    img: "/faq/donation.png",
  },
  {
    q: "When is the best time to go?",
    a: "Spring (Mar–May) and autumn (Sep–Nov) are prime for most Himalayan treks. Dolpo, in the rain shadow, is best in summer (May–Sep) when the rest of Nepal is wet.",
    icon: "calendar",
    img: photos.weather,
  },
  {
    q: "Is travel insurance required?",
    a: "Yes — comprehensive insurance covering high-altitude trekking and helicopter evacuation is mandatory on all our trips. We'll point you to providers we trust.",
    icon: "shield",
    img: "/faq/helicopter-revive-insurance.png",
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

/** Shared "why we give back" copy (landing + about) — Nepal-first giving. */
export const giveBack = {
  eyebrow: "Why we give back",
  title: "Why we give back.",
  body: [
    "We put a share of every booking straight back into the valleys we walk — funding community-run village schools and health posts in regions like Dolpo, Kanchenjunga and the Solu Khumbu.",
    "Local first: we back Nepali, community-led causes in the places our treks actually pass through — not a charity on the other side of the world.",
  ],
  charity: "village schools & health posts",
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
      { label: "7000m Peaks", href: "/#mountaineering", icon: "mountain", note: "Expedition objectives" },
      { label: "6000m Peaks", href: "/#mountaineering", icon: "peak", note: "Trekking peaks · first summits" },
      { label: "Mountaineering guide", href: "/mountaineering/guide", icon: "users", note: "Skills, training & how it works" },
    ],
  },
  { label: "Photography", href: "/photography" },
  {
    label: "About",
    href: "/about",
    cta: { label: "About HUX EXPED", href: "/about" },
    children: [
      { label: "Our story", href: "/about/our-story", icon: "compass", note: "Why Hux Exped exists" },
      { label: "Our team", href: "/about/our-team", icon: "users", note: "The people who get you up there" },
      { label: "Certifications & associations", href: "/about/certifications", icon: "shield", note: "Licensed & accredited" },
      { label: "Why us", href: "/about/why-us", icon: "star", note: "What sets us apart" },
      { label: "Testimonials", href: "/about/testimonials", icon: "heart", note: "Words from the rope team" },
    ],
  },
  {
    label: "Explore",
    href: "/blog",
    cta: { label: "Read the journal", href: "/blog" },
    children: [
      { label: "Blog & stories", href: "/blog", icon: "compass", note: "Guides & field notes" },
      { label: "Photo gallery", href: "/gallery", icon: "camera", note: "From our expeditions" },
      { label: "Trip guidance", href: "/guidance", icon: "shield", note: "Gear, permits & altitude" },
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
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Guidance", href: "/guidance" },
  { label: "Contact", href: "/#contact" },
];

/** Site-wide contact / social config — swap these for the real ones. */
export const site = {
  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  whatsapp: "9779800000000",
  email: "hello@huxexped.com",
};

/* ----------------------------------------------------------------- */
/*  Our team + accreditation (About page)                            */
/* ----------------------------------------------------------------- */
export type TeamMember = { name: string; role: string; tag: string; meta: string; note: string; img: string };

export const team: TeamMember[] = [
  { name: "Deepak Thapa", role: "Founder & senior guide", tag: "Co-founder", meta: "500+ treks led", note: "Grew up in these valleys; built Hux Exped to share them.", img: "/deepak-thapa.jpg" },
  { name: "Dominic Huxley", role: "Founder & mountain guide", tag: "Co-founder", meta: "IFMGA mountain guide", note: "The 'Hux' in Hux Exped — leads from the front on the high peaks.", img: photos.aspiring3 },
  { name: "Bibek Basnet", role: "IT & Operations", tag: "The engine", meta: "Keeps it all running", note: "Makes every permit, flight, server and yak line up on time.", img: "/Bibek-Basnet.jpg" },
  { name: "Shall", role: "Lead photographer", tag: "Photography", meta: "Shoots the whole journey", note: "Leads our once-a-year dedicated photography expedition.", img: photos.walking },
];

/** Only certifications with a logo present in /public/certs are shown. */
export const certifications = [
  { name: "Nepal Mountaineering Association", short: "NMA", logo: "/certs/nma.png" },
  { name: "Trekking Agencies' Association of Nepal", short: "TAAN", logo: "/certs/taan.jpg" },
  { name: "Nepal Tourism Board", short: "NTB", logo: "/certs/ntb.png" },
  { name: "Wilderness First Responder", short: "WFR", logo: "/certs/wilderness-first.png" },
  { name: "IFMGA mountain guides", short: "IFMGA", logo: "/certs/IFMGA.jpg.jpeg" },
  { name: "Tripadvisor", short: "Tripadvisor", logo: "/certs/TRIP.png" },
  { name: "Leave No Trace", short: "LNT", logo: "/certs/leave-no-trace.png" },
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

/* ----------------------------------------------------------------- */
/*  Blog / journal                                                   */
/* ----------------------------------------------------------------- */
export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string; // display date
  readTime: string;
  image: string;
  excerpt: string;
  content: { heading: string; paragraphs: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "upper-dolpo-forbidden-kingdom",
    title: "Upper Dolpo: Inside Nepal's Last Forbidden Kingdom",
    category: "Destinations",
    date: "12 Jun, 2026",
    readTime: "7 min read",
    image: photos.nepal,
    excerpt:
      "Beyond the Dhaulagiri massif lies a roadless Buddhist kingdom that stayed closed to outsiders until 1989. Here's what it's really like to walk it.",
    content: [
      {
        heading: "A kingdom out of time",
        paragraphs: [
          "Tucked behind the Himalaya in Nepal's remote north-west, Upper Dolpo feels less like a trek and more like time travel. The landscape is high desert — ochre cliffs, turquoise lakes and whitewashed gompas that have looked the same for six centuries. This is the land made famous by Peter Matthiessen's The Snow Leopard, and it still rewards patience the way it did then.",
          "Because the region sits in the rain shadow of the Dhaulagiri and Kanjiroba massifs, the culture here is Tibetan to the core. Villages like Saldang and Shimen keep the old Bon and Buddhist traditions alive, and the rhythm of yak caravans and barley harvests sets the pace of every day on the trail.",
        ],
      },
      {
        heading: "Permits and access",
        paragraphs: [
          "Upper Dolpo is a restricted area. You'll need a special permit (currently USD 500 for the first 10 days, plus the Shey Phoksundo National Park fee), and you must travel with a registered agency and a licensed guide — solo trekking isn't allowed. We handle the paperwork end to end.",
          "Access is part of the adventure. Most itineraries fly Kathmandu–Nepalgunj–Juphal, then walk from there. There are no roads into the upper valleys, which is exactly why they remain so untouched.",
        ],
      },
      {
        heading: "When to go and what to expect",
        paragraphs: [
          "The rain shadow makes Dolpo one of the few Nepal regions trekkable through the monsoon (June–August), when the rest of the country is socked in. Spring and autumn are reliable too, though high passes like the Kang La and Saldang La can hold snow.",
          "Expect long days, basic camping (there are few teahouses up high), and altitudes above 5,000 m. Come fit, come acclimatised, and come ready for one of the last genuinely wild treks left in the Himalaya.",
        ],
      },
    ],
  },
  {
    slug: "kanchenjunga-base-camp-guide",
    title: "Kanchenjunga Base Camp: A Complete Trekking Guide",
    category: "Trek guides",
    date: "08 Jun, 2026",
    readTime: "9 min read",
    image: photos.himalayas,
    excerpt:
      "The world's third-highest peak guards Nepal's far east — remote, restricted and gloriously uncrowded. Everything you need to plan the trek.",
    content: [
      {
        heading: "Why Kanchenjunga",
        paragraphs: [
          "At 8,586 m, Kanchenjunga is the third-highest mountain on Earth and the highest in India's and Nepal's eastern Himalaya. Yet a fraction of the trekkers who queue for Everest Base Camp ever make it here. The reward for the extra effort is solitude, raw scenery and a corridor of villages largely untouched by mass tourism.",
          "The trek threads through subtropical forest, terraced Limbu and Rai farmland, and finally up into glacial moraine beneath a wall of 7,000- and 8,000-metre peaks.",
        ],
      },
      {
        heading: "The route — north and south",
        paragraphs: [
          "There are two base camps. Pangpema (North Base Camp, 5,143 m) sits beneath Kanchenjunga's vast north face; Oktang (South Base Camp) looks up at the Yalung Glacier. The classic circuit links both over the Sele La passes, making a full loop of roughly three weeks.",
          "Most departures start from Taplejung after a flight to Bhadrapur. From there it's a steady, scenic build through Ghunsa and Khambachen before the final push to the moraine.",
        ],
      },
      {
        heading: "Fitness, altitude and timing",
        paragraphs: [
          "This is a committing trek — long days, real remoteness and limited evacuation options, so good fitness and proper acclimatisation matter. Kanchenjunga is a restricted area requiring a permit and a minimum of two trekkers with a registered guide.",
          "Spring (March–May) brings rhododendron forests in bloom; autumn (October–November) delivers the clearest mountain views. We avoid the monsoon here — the eastern hills get the brunt of it.",
        ],
      },
    ],
  },
  {
    slug: "altitude-sickness-high-passes",
    title: "Altitude Sickness on Nepal's High Passes: How to Stay Safe",
    category: "Trek smart",
    date: "02 Jun, 2026",
    readTime: "6 min read",
    image: photos.weather,
    excerpt:
      "Acute Mountain Sickness is the single biggest risk above 3,500 m — and it's almost entirely preventable. Here's how we manage it.",
    content: [
      {
        heading: "What actually happens at altitude",
        paragraphs: [
          "As you climb, the air thins and every breath carries less oxygen. Your body adapts — breathing faster, making more red blood cells — but that adaptation takes time. Push up too quickly and you risk Acute Mountain Sickness (AMS): headache, nausea, poor sleep and fatigue.",
          "Left unchecked, AMS can progress to the serious, life-threatening forms — HACE (brain) and HAPE (lungs). The single most important thing to understand is that altitude illness is about the rate of ascent, not your fitness. Strong, young trekkers get it too.",
        ],
      },
      {
        heading: "The golden rules of acclimatisation",
        paragraphs: [
          "Climb high, sleep low. Above 3,000 m, we limit the gain in sleeping altitude to roughly 300–500 m per night and build in rest days. Hydrate hard, walk at a conversational pace, and never ignore a headache that won't shift.",
          "Our itineraries are deliberately unhurried for exactly this reason — extra nights above 3,500 m aren't padding, they're safety. Diamox can help, but it's a supplement to good pacing, not a substitute.",
        ],
      },
      {
        heading: "Knowing when to descend",
        paragraphs: [
          "The rule is simple and absolute: if symptoms are worsening, you go down. A few hundred metres of descent often resolves AMS completely. Our guides are trained to spot the warning signs early and carry the means to respond.",
          "Every trip runs with comprehensive medical cover and a clear evacuation plan. Respect the mountain's timeline and the high passes will reward you.",
        ],
      },
    ],
  },
  {
    slug: "beyond-everest-base-camp",
    title: "Why We Skip Everest Base Camp — and Where We Go Instead",
    category: "Offbeat Nepal",
    date: "28 May, 2026",
    readTime: "5 min read",
    image: photos.demali,
    excerpt:
      "Everest Base Camp sees thousands of trekkers a season. We walk the other way — into valleys that still feel like discovery.",
    content: [
      {
        heading: "The cost of the crowds",
        paragraphs: [
          "There's nothing wrong with wanting to see Everest. But the classic Base Camp trail now carries enormous foot traffic in peak season — busy lodges, queues on the trail and a wilderness experience that can feel anything but wild.",
          "We built Hux Exped around the opposite idea: the corners of Nepal most travellers never see, where the trail is yours and the welcome in each village is genuine.",
        ],
      },
      {
        heading: "Our five favourite alternatives",
        paragraphs: [
          "Kanchenjunga for raw 8,000 m drama in the far east. Upper and Lower Dolpo for high-desert Tibetan culture. Nar Phu for hidden medieval villages off the Annapurna Circuit. Makalu-Barun for pristine cloud forest and the Barun valley. And Tsum, a sacred hidden valley on the Manaslu side.",
          "Every one of these delivers the scale of Everest without the scrum — and the permits that keep them restricted are exactly what keeps them special.",
        ],
      },
      {
        heading: "Going offbeat, responsibly",
        paragraphs: [
          "Remote travel carries responsibility. We run small groups, employ local guides and porters, and put 5% of every booking into village schools and health posts in the regions we trek.",
          "Walking the other way isn't just better for you — done right, it's better for the places and people you're walking through.",
        ],
      },
    ],
  },
  {
    slug: "best-time-restricted-regions",
    title: "Best Time to Trek Nepal's Restricted Regions",
    category: "Planning",
    date: "20 May, 2026",
    readTime: "6 min read",
    image: photos.khumbu,
    excerpt:
      "Dolpo, Mustang and Nar Phu each have their own weather windows. Time it right and you'll have the trail almost to yourself.",
    content: [
      {
        heading: "Spring (March–May)",
        paragraphs: [
          "Spring is prime time across most of Nepal. Days lengthen, temperatures climb and the mid-hills erupt with rhododendron blossom. Higher passes are clearing of winter snow by late March, and the stable weather makes for reliable mountain views.",
          "It's our favourite window for the eastern treks like Kanchenjunga and Makalu, where the forests are at their best.",
        ],
      },
      {
        heading: "Autumn (September–November)",
        paragraphs: [
          "After the monsoon washes the haze from the sky, autumn delivers the crispest, clearest mountain panoramas of the year. The trails are dry, the air is settled and the harvest is in across the villages.",
          "It's the most popular season for good reason — though in the restricted regions, 'popular' still means quiet by Himalayan standards.",
        ],
      },
      {
        heading: "The rain-shadow secret: trekking in monsoon",
        paragraphs: [
          "Here's the trick few travellers know: Dolpo, Upper Mustang and parts of Nar Phu sit in the Himalaya's rain shadow. While the rest of Nepal is under monsoon cloud from June to August, these high-desert valleys stay relatively dry and trekkable.",
          "If you want genuine solitude and a green-season escape, the rain-shadow regions are the answer. We run dedicated monsoon departures into Dolpo and Mustang for exactly this reason.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

/* ----------------------------------------------------------------- */
/*  Detail-page shared data (tabs: includes, gear, dates, reviews)    */
/* ----------------------------------------------------------------- */
/** Standard "not included" list, shown alongside each trek's `included`. */
export const notIncluded = [
  "International flights to/from Nepal",
  "Travel & high-altitude insurance",
  "Personal trekking & climbing gear",
  "Nepal entry visa fees",
  "Tips for guides and porters",
  "Personal expenses (drinks, wifi, laundry)",
];

export type GearTier = "Must Have" | "Recommended" | "Optional";
export type GearItem = { name: string; note: string; tier: GearTier };
export type GearCategory = { key: string; title: string; icon: string; items: GearItem[] };

/** A practical Himalaya packing checklist, shared across treks/peaks. */
export const gearList: GearCategory[] = [
  {
    key: "clothing",
    title: "Clothing & Layers",
    icon: "shield",
    items: [
      { name: "Moisture-wicking base layer (top & bottom)", note: "Synthetic or merino wool — avoid cotton", tier: "Must Have" },
      { name: "Fleece jacket or mid-layer", note: "For warmth at high altitude", tier: "Must Have" },
      { name: "Waterproof & windproof outer jacket", note: "Gore-Tex or similar recommended", tier: "Must Have" },
      { name: "Down jacket or insulated vest", note: "Lightweight packable down recommended", tier: "Must Have" },
      { name: "Trekking trousers (2–3 pairs)", note: "Quick-dry fabric preferred", tier: "Must Have" },
      { name: "Warm hat, sun hat & buff", note: "Cover ears above 3,000 m", tier: "Must Have" },
      { name: "Gloves — liner + insulated", note: "Two pairs for the high passes", tier: "Recommended" },
    ],
  },
  {
    key: "footwear",
    title: "Footwear",
    icon: "route",
    items: [
      { name: "Broken-in waterproof trekking boots", note: "Ankle support is essential", tier: "Must Have" },
      { name: "Camp shoes / sandals", note: "To rest your feet at teahouses", tier: "Recommended" },
      { name: "Trekking socks (4–5 pairs)", note: "Wool or synthetic — avoid cotton", tier: "Must Have" },
      { name: "Gaiters", note: "For snow and scree sections", tier: "Optional" },
    ],
  },
  {
    key: "camping",
    title: "Camping & Sleeping",
    icon: "tent",
    items: [
      { name: "Sleeping bag (rated −10 °C or lower)", note: "Teahouse blankets are thin", tier: "Must Have" },
      { name: "Sleeping bag liner", note: "Adds warmth and keeps it clean", tier: "Recommended" },
      { name: "Trekking backpack (50–60 L)", note: "Waterproof cover or pack liner", tier: "Must Have" },
      { name: "Daypack (20–30 L)", note: "For essentials while porter carries the main bag", tier: "Recommended" },
      { name: "Dry bags / waterproof stuff sacks", note: "Keep electronics and clothes dry", tier: "Must Have" },
    ],
  },
  {
    key: "documents",
    title: "Documents & Money",
    icon: "flag",
    items: [
      { name: "Valid passport (6+ months validity)", note: "Required for all permits and check-ins", tier: "Must Have" },
      { name: "Nepal visa", note: "On arrival at Kathmandu airport or online", tier: "Must Have" },
      { name: "Travel insurance documents", note: "Must cover altitude & helicopter evacuation", tier: "Must Have" },
      { name: "Passport photos & permit copies", note: "Several spare passport photos", tier: "Recommended" },
      { name: "Nepali Rupees (cash)", note: "ATMs are unavailable on most trails", tier: "Must Have" },
    ],
  },
  {
    key: "health",
    title: "Health & Safety",
    icon: "heart",
    items: [
      { name: "Personal first-aid kit", note: "Plus any prescription medication", tier: "Must Have" },
      { name: "Sun protection (SPF 50, lip balm)", note: "UV is intense at altitude", tier: "Must Have" },
      { name: "Glacier glasses / UV sunglasses", note: "Category 3–4 for snow", tier: "Must Have" },
      { name: "Water purification (tablets/filter)", note: "Refill safely on the trail", tier: "Must Have" },
      { name: "Diamox (consult your doctor)", note: "For acclimatisation, if advised", tier: "Optional" },
    ],
  },
  {
    key: "electronics",
    title: "Electronics & Extras",
    icon: "gauge",
    items: [
      { name: "Headtorch + spare batteries", note: "For early starts and teahouses", tier: "Must Have" },
      { name: "Power bank (20000 mAh+)", note: "Charging is costly and unreliable on trail", tier: "Must Have" },
      { name: "Universal travel adapter", note: "Nepal uses Type C, D and M sockets", tier: "Recommended" },
      { name: "Camera or smartphone", note: "The scenery deserves documenting", tier: "Optional" },
      { name: "Trekking poles", note: "Save your knees on the descents", tier: "Recommended" },
    ],
  },
];

export type Review = { name: string; country: string; rating: number; date: string; text: string };

/** Sample traveller reviews, shared across detail pages. */
export const reviews: Review[] = [
  { name: "Felicite Black", country: "Australia", rating: 5, date: "Nov 2025", text: "I was terrified it would be too hard — but the pacing was perfect. Standing at the pass with tears in my eyes, I understood why people keep coming back to Nepal." },
  { name: "Marcus Lindqvist", country: "Sweden", rating: 5, date: "Oct 2025", text: "Genuinely offbeat. We barely saw another group for days. The guides were superb — calm, funny and rock-solid on safety." },
  { name: "Priya Nair", country: "United Kingdom", rating: 5, date: "May 2025", text: "Small group, huge mountains. Every logistic was handled so I could just walk and take it all in. Already planning the next one." },
  { name: "Daniel Okafor", country: "Canada", rating: 4, date: "Apr 2025", text: "Tough but unforgettable. The acclimatisation days made all the difference. Teahouses were basic in the best way." },
];

/** Deterministic sample departures for a trek/peak (no live dates → SSG-safe). */
export function departures(slug: string) {
  const dates = ["15 Mar 2026", "02 Apr 2026", "21 Apr 2026", "12 May 2026", "18 Sep 2026", "06 Oct 2026"];
  const n = slug.length;
  return dates.map((date, i) => {
    const spots = 2 + ((n * (i + 3)) % 8);
    return { date, spots, status: spots <= 3 ? "Almost full" : "Available" as const };
  });
}
