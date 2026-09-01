// City landing pages — clean service-area structure covering all 6 provinces:
// one page per province anchor city (Ottawa, Calgary, Montreal, Vancouver,
// Winnipeg, Saskatoon) plus extra Ontario cities. Each entry has UNIQUE local
// copy (intro, local angles, neighbourhoods, FAQs) so pages are never thin
// duplicates. Pricing pulls from the province's priceFrom in site config.

export type CityPage = {
  citySlug: string; // plain city slug, e.g. "toronto" → /service-areas/ontario/toronto
  city: string;
  provinceCode: string; // must match a code in provinces (site config)
  provinceName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string; // unique opening paragraph
  localPoints: { title: string; text: string }[]; // unique local angles
  neighbourhoods: string[];
  faqs: { question: string; answer: string }[]; // unique local FAQs
};

// URL helpers for the nested service-area structure.
export const provinceSlugOf = (provinceName: string) =>
  provinceName.toLowerCase().replace(/\s+/g, "-");

export const cityPath = (c: Pick<CityPage, "citySlug" | "provinceName">) =>
  `/service-areas/${provinceSlugOf(c.provinceName)}/${c.citySlug}`;

export const cityPages: CityPage[] = [
  // ── Ontario ────────────────────────────────────────────────────
  {
    citySlug: "ottawa",
    city: "Ottawa",
    provinceCode: "ON",
    provinceName: "Ontario",
    metaTitle: "Air Duct Cleaning Ottawa | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Ottawa. Fast response across Kanata, Barrhaven, Orleans & Nepean from $149. Book your free quote today.",
    h1: "Air Duct Cleaning Services in Ottawa",
    intro:
      "From Barrhaven family homes to Kanata tech-corridor builds and Orleans bungalows, we've cleaned duct systems across the capital. Ottawa's long heating season works furnaces hard — five-plus months of heating a year pushes a lot of air and dust through your ducts, so a clean system keeps things efficient when you need it most.",
    localPoints: [
      {
        title: "Local team, fastest booking",
        text: "Across Ottawa and the National Capital Region we offer flexible scheduling — often within days — and our Ontario pricing is just $149.",
      },
      {
        title: "Built for Ottawa winters",
        text: "Five-plus months of heating a year pushes a lot of air (and dust) through your ducts. A clean system means better airflow, a healthier furnace, and warmer rooms.",
      },
      {
        title: "Spring pollen relief",
        text: "Ottawa's intense spring pollen season loads ducts with allergens. A cleaning removes what's settled inside so it stops recirculating all summer.",
      },
    ],
    neighbourhoods: [
      "Kanata",
      "Barrhaven",
      "Orleans",
      "Nepean",
      "Stittsville",
      "Gloucester",
      "Riverside South",
      "Westboro",
    ],
    faqs: [
      {
        question: "How fast can you book a duct cleaning in Ottawa?",
        answer:
          "We offer flexible availability across Ottawa and the surrounding region — often within the same week. Submit the booking form with your preferred date and we'll confirm quickly.",
      },
      {
        question: "What does duct cleaning cost in Ottawa?",
        answer:
          "Our Ontario Basic Package starts at $149 taxes included — a full duct and vent cleaning with sanitizer and inspections. Optional add-ons like furnace or dryer vent cleaning can be added during booking.",
      },
    ],
  },
  {
    citySlug: "toronto",
    city: "Toronto",
    provinceCode: "ON",
    provinceName: "Ontario",
    metaTitle: "Air Duct Cleaning Toronto | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Toronto. From century semis to modern condos, we remove years of dust, allergens, and renovation debris. Free quotes.",
    h1: "Air Duct Cleaning Services in Toronto",
    intro:
      "Toronto homes work their ductwork hard. Between downtown traffic dust, older housing stock, and the constant cycle of renovations across the city, duct systems here collect debris faster than almost anywhere in Ontario. Our certified technicians clean duct systems in every kind of Toronto home — from Victorian semis in Riverdale to post-war bungalows in Scarborough and newer builds in North York.",
    localPoints: [
      {
        title: "Renovation dust is Toronto's #1 duct problem",
        text: "With so many Toronto homes being renovated, drywall dust and construction debris routinely end up inside duct runs — and recirculate for years. A post-renovation duct cleaning removes it at the source.",
      },
      {
        title: "Older homes, older ducts",
        text: "Much of Toronto's housing stock predates modern filtration. Decades-old duct systems in Old Toronto, East York, and York often have never been professionally cleaned.",
      },
      {
        title: "Condos and semis welcome",
        text: "We clean ducted systems in houses, semis, and townhomes across the GTA — and we'll tell you honestly if your unit's system doesn't need it.",
      },
    ],
    neighbourhoods: [
      "Scarborough",
      "North York",
      "Etobicoke",
      "East York",
      "Riverdale",
      "The Beaches",
      "Leaside",
      "Don Mills",
    ],
    faqs: [
      {
        question: "Do you service all parts of Toronto?",
        answer:
          "Yes — we serve the entire city including Scarborough, North York, Etobicoke, and East York, plus the surrounding GTA.",
      },
      {
        question: "I just renovated my Toronto home. Should I clean the ducts?",
        answer:
          "Absolutely — renovations are one of the top reasons to book. Drywall and sanding dust settles deep in duct runs and keeps recirculating until it's professionally removed.",
      },
    ],
  },
  {
    citySlug: "mississauga",
    city: "Mississauga",
    provinceCode: "ON",
    provinceName: "Ontario",
    metaTitle: "Air Duct Cleaning Mississauga | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Mississauga. Family-sized homes, pet households, and busy HVAC systems deserve clean ducts. Book your free quote today.",
    h1: "Air Duct Cleaning Services in Mississauga",
    intro:
      "Mississauga's spacious family homes mean bigger duct systems doing more work. Large detached houses in Meadowvale, Erin Mills, and Churchill Meadows often run long duct networks that quietly collect dust, pet hair, and allergens across every floor. We deep-clean the entire system — every vent, every run — so your family breathes cleaner air in every room.",
    localPoints: [
      {
        title: "Big homes, big duct networks",
        text: "Mississauga's detached homes often have 15+ vents across multiple floors. More ductwork means more surface area for dust to settle — and more to gain from a professional clean.",
      },
      {
        title: "Pet households",
        text: "Pet hair and dander are the most common things we pull out of Mississauga ducts. If you have dogs or cats, a cleaning every 2–3 years keeps dander from cycling through your HVAC.",
      },
      {
        title: "Furnace efficiency in winter",
        text: "Clean ducts and a fresh filter let your furnace push air freely — which matters through GTA winters and shows up on your energy bill.",
      },
    ],
    neighbourhoods: [
      "Meadowvale",
      "Erin Mills",
      "Churchill Meadows",
      "Streetsville",
      "Port Credit",
      "Clarkson",
      "Malton",
      "Cooksville",
    ],
    faqs: [
      {
        question: "How long does duct cleaning take in a typical Mississauga home?",
        answer:
          "Most detached Mississauga homes take 2–3 hours. Larger homes with two furnaces or 20+ vents can take a little longer — we'll give you a clear estimate when you book.",
      },
      {
        question: "Do you clean ducts in Mississauga townhouses?",
        answer:
          "Yes — townhomes and semis are quick jobs, and we use the same sealed-vacuum process to keep your home spotless while we work.",
      },
    ],
  },
  {
    citySlug: "brampton",
    city: "Brampton",
    provinceCode: "ON",
    provinceName: "Ontario",
    metaTitle: "Air Duct Cleaning Brampton | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Brampton. New-build construction debris, growing families, busy systems — we clean it all. Get your free quote today.",
    h1: "Air Duct Cleaning Services in Brampton",
    intro:
      "Brampton is full of newer homes — and new builds hide a dirty secret: construction debris left inside the ductwork from day one. Sawdust, drywall fragments, even fast-food wrappers routinely turn up in ducts of homes under 10 years old. Add busy, growing households in Springdale and Mount Pleasant, and Brampton duct systems earn their cleaning.",
    localPoints: [
      {
        title: "New builds need a first clean",
        text: "Builders rarely clean ducts before handover. If your Brampton home has never had its ducts cleaned since construction, there's likely debris sitting in the runs right now.",
      },
      {
        title: "Full households, hard-working HVAC",
        text: "More people home more often means HVAC systems cycling constantly. High-use systems pull in more dust and benefit most from regular cleaning and filter changes.",
      },
      {
        title: "Allergy relief",
        text: "Removing built-up dust, pollen, and dander from the ducts reduces what your family breathes every day — a difference many customers notice within days.",
      },
    ],
    neighbourhoods: [
      "Springdale",
      "Mount Pleasant",
      "Castlemore",
      "Heart Lake",
      "Bramalea",
      "Fletcher's Meadow",
      "Credit Valley",
      "Sandringham",
    ],
    faqs: [
      {
        question: "My Brampton home is only a few years old. Do I really need duct cleaning?",
        answer:
          "New builds are actually one of our most common jobs — construction debris is usually left in the ducts at handover. One thorough cleaning resets the system, then every 3–5 years keeps it clean.",
      },
      {
        question: "Can you come evenings or weekends in Brampton?",
        answer:
          "We offer flexible scheduling including weekends. Pick your preferred date and time in the booking form and we'll confirm quickly.",
      },
    ],
  },
  {
    citySlug: "hamilton",
    city: "Hamilton",
    provinceCode: "ON",
    provinceName: "Ontario",
    metaTitle: "Air Duct Cleaning Hamilton | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Hamilton. Century homes and older duct systems are our specialty. Remove decades of buildup — book a free quote.",
    h1: "Air Duct Cleaning Services in Hamilton",
    intro:
      "Hamilton's beautiful century homes come with some of the oldest ductwork in Ontario. Systems in Durand, Kirkendall, and the east end have often gone decades — sometimes generations — without a proper cleaning. Our equipment is safe on older duct systems, and the before-and-after difference in Hamilton homes is often dramatic.",
    localPoints: [
      {
        title: "Century-home specialists",
        text: "Older gravity-converted and early forced-air systems need careful handling. We inspect first, then clean with equipment that's thorough but safe for aging ductwork.",
      },
      {
        title: "Decades of buildup",
        text: "In many Hamilton homes we remove the heaviest dust loads we see anywhere — old insulation fragments, decades of dust, even artifacts from past owners. Your photos will amaze you.",
      },
      {
        title: "Escarpment to waterfront",
        text: "We service the whole city — Mountain neighbourhoods, downtown, Dundas, Ancaster, Stoney Creek, and Waterdown.",
      },
    ],
    neighbourhoods: [
      "Hamilton Mountain",
      "Dundas",
      "Ancaster",
      "Stoney Creek",
      "Waterdown",
      "Westdale",
      "Kirkendall",
      "Binbrook",
    ],
    faqs: [
      {
        question: "Is duct cleaning safe for my older Hamilton home?",
        answer:
          "Yes — we inspect your system first and use methods appropriate for older ductwork. Cleaning is gentle on the ducts themselves; it's the buildup inside that we remove.",
      },
      {
        question: "Do you service Stoney Creek, Dundas, and Ancaster?",
        answer:
          "Yes — we cover all of greater Hamilton including Stoney Creek, Dundas, Ancaster, Waterdown, and Binbrook.",
      },
    ],
  },

  // ── Alberta ────────────────────────────────────────────────────
  {
    citySlug: "calgary",
    city: "Calgary",
    provinceCode: "AB",
    provinceName: "Alberta",
    metaTitle: "Air Duct Cleaning Calgary | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Calgary from $199. Chinook dust, dry prairie air, and hard-working furnaces — we clean it all. Free quotes.",
    h1: "Air Duct Cleaning Services in Calgary",
    intro:
      "Calgary's dry climate and chinook winds push a remarkable amount of fine dust into homes — and straight into duct systems. Whether you're in a newer community like Mahogany or Evanston, or an inner-city bungalow in Bridgeland, Calgary ducts collect gritty prairie dust year-round while furnaces cycle through long Alberta winters. Our certified technicians restore your system to clean, free-flowing condition.",
    localPoints: [
      {
        title: "Chinook and prairie dust",
        text: "Calgary's famous winds carry fine dust that sneaks past filters and settles in duct runs. Regular cleaning keeps it from recirculating every time the furnace kicks on.",
      },
      {
        title: "Dry air, static dust",
        text: "Alberta's low humidity makes dust cling to duct walls with static. Our agitation-and-vacuum process breaks it loose and captures it — instead of letting it drift back into rooms.",
      },
      {
        title: "New suburbs, builder debris",
        text: "Fast-growing communities like Seton and Cornerstone are full of new builds with construction debris still sitting in the ductwork. One thorough cleaning resets the system.",
      },
    ],
    neighbourhoods: [
      "Mahogany",
      "Evanston",
      "Tuscany",
      "Panorama Hills",
      "Bridgeland",
      "Seton",
      "Signal Hill",
      "McKenzie Towne",
    ],
    faqs: [
      {
        question: "What does duct cleaning cost in Calgary?",
        answer:
          "Our Alberta Basic Package starts at $199 taxes included — full duct and vent cleaning with sanitizer and inspections. Add-ons like furnace or dryer vent cleaning can be added during booking.",
      },
      {
        question: "How often should Calgary homes clean their ducts?",
        answer:
          "Every 2–3 years is a good rhythm in Calgary — the dry, dusty climate and long furnace season load ducts faster than milder regions. Sooner if you have pets or allergies.",
      },
    ],
  },

  // ── Quebec ─────────────────────────────────────────────────────
  {
    citySlug: "montreal",
    city: "Montreal",
    provinceCode: "QC",
    provinceName: "Quebec",
    metaTitle: "Air Duct Cleaning Montreal | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Montreal and surrounding areas. Older homes, renovation dust, long heating seasons — book your free quote today.",
    h1: "Air Duct Cleaning Services in Montreal",
    intro:
      "Greater Montreal mixes some of Canada's oldest housing with sprawling forced-air suburbs — and both need duct attention. Homes in Laval, the West Island, and the South Shore run their systems hard through long Quebec winters, while the city's constant renovation culture fills ductwork with drywall and sanding dust. We clean it all, with before-and-after photos so you see the difference.",
    localPoints: [
      {
        title: "Older homes, heavier buildup",
        text: "Many Montreal-area homes have decades-old duct systems that have never been professionally cleaned. The first cleaning often removes years of accumulated dust in a single visit.",
      },
      {
        title: "Renovation capital",
        text: "Montreal renovates constantly — and renovation dust is the single fastest way to load a duct system. A post-reno cleaning removes it before it circulates for years.",
      },
      {
        title: "Suburbs with forced air",
        text: "Laval, Brossard, and West Island homes mostly run central forced-air systems — exactly the systems that benefit most from a thorough professional cleaning.",
      },
    ],
    neighbourhoods: [
      "Laval",
      "Longueuil",
      "West Island",
      "Brossard",
      "Saint-Laurent",
      "Dollard-des-Ormeaux",
      "Pointe-Claire",
      "NDG",
    ],
    faqs: [
      {
        question: "What does duct cleaning cost in Montreal?",
        answer:
          "Our Quebec Basic Package starts at $199 taxes included — a complete duct and vent cleaning with sanitizer and inspections. Optional add-ons can be included during booking.",
      },
      {
        question: "Do you serve the suburbs around Montreal?",
        answer:
          "Yes — we serve Greater Montreal including Laval, Longueuil, Brossard, and the West Island communities.",
      },
    ],
  },

  // ── British Columbia ───────────────────────────────────────────
  {
    citySlug: "vancouver",
    city: "Vancouver",
    provinceCode: "BC",
    provinceName: "British Columbia",
    metaTitle: "Air Duct Cleaning Vancouver | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Metro Vancouver from $199. Coastal moisture, pollen seasons, and busy systems — book your free quote today.",
    h1: "Air Duct Cleaning Services in Vancouver",
    intro:
      "Vancouver's mild, damp coastal climate creates a duct problem most of Canada doesn't have: moisture. Humid air moving through ductwork lets dust cake onto surfaces and can encourage musty odours, while the Lower Mainland's long pollen seasons load systems with allergens. From Kitsilano character homes to Surrey and Coquitlam family houses, we deep-clean and sanitize so your system smells and breathes fresh.",
    localPoints: [
      {
        title: "Coastal moisture and musty ducts",
        text: "If you notice a musty smell when your system starts up, moisture-bound dust in the ducts is a common culprit. Cleaning plus our natural sanitizer removes the source of the odour.",
      },
      {
        title: "Pollen powerhouse",
        text: "The Lower Mainland's early, long pollen seasons load ducts with allergens. Removing what's settled inside gives allergy sufferers a noticeably calmer home.",
      },
      {
        title: "Every home type",
        text: "Character homes, view houses on the North Shore, and newer builds in Surrey and Langley — we adapt our process to each system, and always show before-and-after photos.",
      },
    ],
    neighbourhoods: [
      "Burnaby",
      "Richmond",
      "Surrey",
      "North Vancouver",
      "Coquitlam",
      "New Westminster",
      "Kitsilano",
      "Langley",
    ],
    faqs: [
      {
        question: "What does duct cleaning cost in Vancouver?",
        answer:
          "Our British Columbia Basic Package starts at $199 taxes included — complete duct and vent cleaning with sanitizer and inspections. Add-ons are available during booking.",
      },
      {
        question: "Can duct cleaning help with musty smells in my Vancouver home?",
        answer:
          "Often, yes. Moisture-bound dust inside ductwork is a common source of musty startup odours on the coast. Cleaning removes the buildup, and our natural sanitizer treats the duct surfaces.",
      },
    ],
  },

  // ── Manitoba ───────────────────────────────────────────────────
  {
    citySlug: "winnipeg",
    city: "Winnipeg",
    provinceCode: "MB",
    provinceName: "Manitoba",
    metaTitle: "Air Duct Cleaning Winnipeg | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Winnipeg. Canada's hardest-working furnaces deserve clean ducts. Full-system cleaning from $199 — free quotes.",
    h1: "Air Duct Cleaning Services in Winnipeg",
    intro:
      "No Canadian city works its furnace harder than Winnipeg. Months of -30° weather mean your heating system pushes enormous volumes of air — and dust — through the ductwork every single day. From character homes in River Heights to newer builds in Sage Creek, a professional cleaning keeps that hard-working system efficient, and keeps the air your family breathes all winter clean.",
    localPoints: [
      {
        title: "The longest furnace season in Canada",
        text: "Winnipeg furnaces run near-constantly from October to April. That volume of airflow drags dust through the system relentlessly — clean ducts protect both air quality and the furnace itself.",
      },
      {
        title: "Sealed-up winter homes",
        text: "Winnipeg homes stay sealed tight for months, so whatever is in your ducts keeps recirculating all winter. Cleaning before the cold sets in makes the biggest difference.",
      },
      {
        title: "Character homes to new suburbs",
        text: "We handle everything from pre-war homes in Wolseley to new builds in Bridgwater — with equipment appropriate to each system's age.",
      },
    ],
    neighbourhoods: [
      "St. Vital",
      "Transcona",
      "St. Boniface",
      "River Heights",
      "Fort Garry",
      "East Kildonan",
      "Charleswood",
      "Sage Creek",
    ],
    faqs: [
      {
        question: "What does duct cleaning cost in Winnipeg?",
        answer:
          "Our Manitoba Basic Package starts at $199 taxes included — full duct and vent cleaning with sanitizer and inspections. Furnace cleaning is a popular add-on in Winnipeg given the long heating season.",
      },
      {
        question: "When is the best time to clean ducts in Winnipeg?",
        answer:
          "Fall is ideal — right before the furnace begins its long winter run. That way the system starts the season clean and keeps recirculated dust to a minimum all winter.",
      },
    ],
  },

  // ── Saskatchewan ───────────────────────────────────────────────
  {
    citySlug: "saskatoon",
    city: "Saskatoon",
    provinceCode: "SK",
    provinceName: "Saskatchewan",
    metaTitle: "Air Duct Cleaning Saskatoon | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning in Saskatoon from $199. Prairie dust, extreme temperature swings, hard-working HVAC — book your free quote today.",
    h1: "Air Duct Cleaning Services in Saskatoon",
    intro:
      "Saskatoon lives with real prairie extremes — scorching summers, brutal winters, and wind that carries fine field dust into every corner of the city. Duct systems here do double duty, heating and cooling through 60-degree annual temperature swings. From Stonebridge and Evergreen new builds to character homes in Nutana, we clean the whole system so it can keep up.",
    localPoints: [
      {
        title: "Prairie dust is relentless",
        text: "Wind-borne field dust is a fact of life in Saskatoon. It's fine enough to slip past standard filters and settle in duct runs — where only a professional cleaning removes it.",
      },
      {
        title: "Systems that work year-round",
        text: "Furnaces in winter, AC in summer: Saskatoon HVAC rarely rests. High-usage systems collect dust faster and benefit most from a regular cleaning cycle.",
      },
      {
        title: "New neighbourhoods, first cleanings",
        text: "Growing areas like Rosewood and Brighton are full of newer homes that have never had construction debris cleaned out of their ducts. The first clean makes a dramatic difference.",
      },
    ],
    neighbourhoods: [
      "Stonebridge",
      "Evergreen",
      "Nutana",
      "Riversdale",
      "Lakeview",
      "Willowgrove",
      "Rosewood",
      "Silverspring",
    ],
    faqs: [
      {
        question: "What does duct cleaning cost in Saskatoon?",
        answer:
          "Our Saskatchewan Basic Package starts at $199 taxes included — complete duct and vent cleaning with sanitizer and inspections. Add-ons like furnace cleaning can be included during booking.",
      },
      {
        question: "Does prairie dust really affect indoor air?",
        answer:
          "Yes — fine wind-borne dust gets pulled into the HVAC system and settles in ductwork, then recirculates whenever the system runs. Removing it at the source is the most effective fix.",
      },
    ],
  },
];
