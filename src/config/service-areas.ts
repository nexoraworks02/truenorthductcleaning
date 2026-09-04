// Province landing pages — /service-areas/[province]. One strong page per
// province with UNIQUE content (intro, province-specific cleaning needs,
// cities served, FAQs). Cities WITH dedicated pages link to their nested city
// page; all other cities are listed as text until unique pages exist for them
// (avoids thin/doorway pages).

export type ProvincePage = {
  slug: string; // e.g. "british-columbia" → /service-areas/british-columbia
  code: string; // must match provinces in site config (pricing)
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string; // unique opening paragraph
  needs: { title: string; text: string }[]; // province-specific cleaning needs
  moreCities: string[]; // cities served WITHOUT dedicated pages (text only)
  faqs: { question: string; answer: string }[];
};

export const provincePages: ProvincePage[] = [
  {
    slug: "ontario",
    code: "ON",
    name: "Ontario",
    metaTitle: "Air Duct Cleaning Ontario | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning across Ontario from $149. Ottawa, Toronto, Mississauga, Brampton, Hamilton and beyond. Certified technicians, free quotes.",
    h1: "Air Duct Cleaning Services in Ontario",
    intro:
      "TrueNorth Duct Cleaning serves Ontario homes from across the GTA to Ottawa, Hamilton, London and beyond. Ontario's mix of century homes, post-war suburbs, and brand-new subdivisions means every duct system is different; our certified technicians clean them all, with before-and-after photos and our lowest pricing in Canada, starting at just $149.",
    needs: [
      {
        title: "Long heating seasons",
        text: "Ontario furnaces run five months or more each year, pushing enormous volumes of air — and dust — through ductwork. A clean system heats better and costs less to run.",
      },
      {
        title: "Renovation and new-build debris",
        text: "From GTA renovations to new subdivisions in Brampton and Barrhaven, construction dust in the ducts is Ontario's most common problem — and the most satisfying to remove.",
      },
      {
        title: "Allergy seasons on both ends",
        text: "Spring tree pollen and fall ragweed both load duct systems with allergens. Cleaning removes what's settled so it stops recirculating year-round.",
      },
    ],
    moreCities: [
      "London",
      "Kitchener",
      "Waterloo",
      "Windsor",
      "Markham",
      "Vaughan",
      "Oakville",
      "Burlington",
      "Barrie",
      "Guelph",
      "Cambridge",
      "Kingston",
      "Oshawa",
      "Whitby",
      "Richmond Hill",
    ],
    faqs: [
      {
        question: "How much does duct cleaning cost in Ontario?",
        answer:
          "Our Ontario Basic Package is $149 taxes included. It covers unlimited duct and vent cleaning, natural sanitizer, and free furnace, AC, and dryer vent inspections.",
      },
      {
        question: "Which Ontario cities do you serve?",
        answer:
          "We serve Toronto and the GTA, Mississauga, Brampton, Hamilton, Ottawa, and communities across the province including London, Kitchener-Waterloo, Windsor, Markham, Vaughan, Oakville, Burlington, and Barrie.",
      },
      {
        question: "How quickly can you book in Ontario?",
        answer:
          "Fastest of anywhere we operate — often within the same week around Ottawa, and typically within days across the GTA and Hamilton. Pick your preferred date in the booking form and we'll confirm quickly.",
      },
    ],
  },
  {
    slug: "alberta",
    code: "AB",
    name: "Alberta",
    metaTitle: "Air Duct Cleaning Alberta | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning across Alberta from $199. Calgary, Edmonton, Red Deer and beyond. Chinook dust and dry-climate specialists. Free quotes.",
    h1: "Air Duct Cleaning Services in Alberta",
    intro:
      "Alberta's dry prairie climate is hard on duct systems. Chinook winds carry fine dust that slips past standard filters, low humidity makes it cling to duct walls with static, and long cold winters keep furnaces cycling for months. From Calgary's newest communities to Edmonton's established neighbourhoods, our certified technicians restore Alberta duct systems to clean, free-flowing condition — starting at $199.",
    needs: [
      {
        title: "Chinook and prairie dust",
        text: "Alberta's winds carry fine, gritty dust indoors year-round. It settles in duct runs and recirculates every time the furnace or AC kicks on — until it's professionally removed.",
      },
      {
        title: "Static-charged dry air",
        text: "Low humidity makes dust cling stubbornly to duct surfaces. Our agitation-and-vacuum process breaks it loose and captures it at the source.",
      },
      {
        title: "New-build boom",
        text: "Alberta's fast-growing suburbs are full of new homes with builder debris still sitting in the ductwork. A first professional cleaning resets the system completely.",
      },
    ],
    moreCities: [
      "Edmonton",
      "Red Deer",
      "Lethbridge",
      "Airdrie",
      "St. Albert",
      "Medicine Hat",
      "Grande Prairie",
      "Fort McMurray",
      "Spruce Grove",
      "Leduc",
      "Okotoks",
      "Cochrane",
      "Sherwood Park",
    ],
    faqs: [
      {
        question: "How much does duct cleaning cost in Alberta?",
        answer:
          "Our Alberta Basic Package starts at $199 taxes included — full duct and vent cleaning with natural sanitizer plus furnace, AC, and dryer vent inspections. Add-ons can be included during booking.",
      },
      {
        question: "Do you serve both Calgary and Edmonton?",
        answer:
          "Yes — we serve communities across Alberta including Calgary, Edmonton, Red Deer, Lethbridge, Airdrie, and St. Albert.",
      },
    ],
  },
  {
    slug: "quebec",
    code: "QC",
    name: "Quebec",
    metaTitle: "Air Duct Cleaning Quebec | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning across Quebec. Montreal, Laval, Longueuil, Gatineau and beyond. Older homes and renovation dust specialists. Free quotes.",
    h1: "Air Duct Cleaning Services in Quebec",
    intro:
      "Quebec combines some of Canada's oldest housing stock with a famously active renovation culture — a combination that fills duct systems with decades of dust and fresh construction debris alike. From Greater Montreal's forced-air suburbs to Gatineau homes just across the river from our Ottawa base, we bring the same thorough, photo-documented cleaning process to every Quebec home.",
    needs: [
      {
        title: "Heritage homes, historic dust",
        text: "Many Quebec homes have duct systems that are decades old and have never been professionally cleaned. The first cleaning often removes years of accumulated buildup in one visit.",
      },
      {
        title: "Renovation culture",
        text: "Quebec renovates more than almost anywhere in Canada — and drywall dust is the fastest way to load a duct system. A post-reno cleaning stops it from circulating for years.",
      },
      {
        title: "Long, sealed winters",
        text: "Quebec homes stay sealed tight from November to April, so whatever is in the ducts keeps recirculating all winter. A pre-season cleaning makes the biggest difference.",
      },
    ],
    moreCities: [
      "Laval",
      "Longueuil",
      "Gatineau",
      "Brossard",
      "Terrebonne",
      "Quebec City",
      "Sherbrooke",
      "Trois-Rivières",
      "Saguenay",
      "Lévis",
      "Repentigny",
      "Saint-Jérôme",
      "Drummondville",
    ],
    faqs: [
      {
        question: "How much does duct cleaning cost in Quebec?",
        answer:
          "Our Quebec Basic Package starts at $199 taxes included — complete duct and vent cleaning with natural sanitizer plus furnace, AC, and dryer vent inspections.",
      },
      {
        question: "Do you serve Gatineau and the Outaouais?",
        answer:
          "Yes — we serve Gatineau and the Outaouais, along with Greater Montreal including Laval, Longueuil, and Brossard.",
      },
    ],
  },
  {
    slug: "british-columbia",
    code: "BC",
    name: "British Columbia",
    metaTitle: "Air Duct Cleaning British Columbia | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning across British Columbia from $199. Vancouver, Surrey, Burnaby, Richmond and beyond. Coastal moisture specialists. Free quotes.",
    h1: "Air Duct Cleaning Services in British Columbia",
    intro:
      "British Columbia's mild, damp coastal climate creates duct problems the rest of Canada rarely sees: moisture. Humid air moving through ductwork lets dust cake onto surfaces and can encourage musty odours, while the Lower Mainland's long pollen seasons load systems with allergens. Our cleaning-plus-sanitizer process is built for exactly these conditions — from $199.",
    needs: [
      {
        title: "Coastal moisture and musty ducts",
        text: "A musty smell at startup usually means moisture-bound dust in the ductwork. Cleaning removes the buildup and our natural sanitizer treats the surfaces — fixing the odour at its source.",
      },
      {
        title: "Canada's longest pollen season",
        text: "The Lower Mainland's early springs mean months of pollen loading into duct systems. Removing what's settled gives allergy sufferers a noticeably calmer home.",
      },
      {
        title: "Every home era",
        text: "From Kitsilano character homes to brand-new builds in Surrey and Langley, we adapt our process to each system's age and always show before-and-after photos.",
      },
    ],
    moreCities: [
      "Surrey",
      "Burnaby",
      "Richmond",
      "Coquitlam",
      "Langley",
      "Abbotsford",
      "Victoria",
      "Kelowna",
      "Nanaimo",
      "Kamloops",
      "Chilliwack",
      "Delta",
      "Maple Ridge",
    ],
    faqs: [
      {
        question: "How much does duct cleaning cost in British Columbia?",
        answer:
          "Our British Columbia Basic Package starts at $199 taxes included — complete duct and vent cleaning with natural sanitizer plus furnace, AC, and dryer vent inspections.",
      },
      {
        question: "Can duct cleaning fix musty smells in BC homes?",
        answer:
          "Often, yes. Moisture-bound dust inside ducts is a common source of musty startup odours on the coast. Cleaning removes the buildup, and our natural sanitizer treats the duct surfaces.",
      },
    ],
  },
  {
    slug: "manitoba",
    code: "MB",
    name: "Manitoba",
    metaTitle: "Air Duct Cleaning Manitoba | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning across Manitoba from $199. Winnipeg, Brandon and beyond. Built for Canada's hardest-working furnaces. Free quotes.",
    h1: "Air Duct Cleaning Services in Manitoba",
    intro:
      "No province works its heating systems harder than Manitoba. Months of -30° weather mean furnaces here push enormous volumes of air — and dust — through ductwork nearly year-round, while homes stay sealed tight for the duration. From Winnipeg's character neighbourhoods to its newest suburbs, a professional duct cleaning protects both your air quality and the furnace your winter depends on.",
    needs: [
      {
        title: "The hardest-working furnaces in Canada",
        text: "Manitoba furnaces run near-constantly from October to April. That relentless airflow drags dust through the system — clean ducts protect the furnace and your air.",
      },
      {
        title: "Sealed-up winters",
        text: "With windows shut for six months, whatever is in your ducts recirculates continuously. A fall cleaning means the whole winter starts from clean.",
      },
      {
        title: "Extreme temperature swings",
        text: "From -35° winters to +30° summers, Manitoba systems both heat and cool hard. High-usage systems collect dust faster and benefit most from a regular cleaning cycle.",
      },
    ],
    moreCities: [
      "Brandon",
      "Steinbach",
      "Winkler",
      "Selkirk",
      "Portage la Prairie",
      "Thompson",
      "Dauphin",
      "Morden",
      "Neepawa",
      "Stonewall",
      "Niverville",
      "Beausejour",
    ],
    faqs: [
      {
        question: "How much does duct cleaning cost in Manitoba?",
        answer:
          "Our Manitoba Basic Package starts at $199 taxes included — full duct and vent cleaning with natural sanitizer plus furnace, AC, and dryer vent inspections. Furnace cleaning is a popular add-on given the long heating season.",
      },
      {
        question: "When should Manitoba homes clean their ducts?",
        answer:
          "Fall is ideal — right before the furnace begins its long winter run. The system starts the season clean and keeps recirculated dust to a minimum until spring.",
      },
    ],
  },
  {
    slug: "saskatchewan",
    code: "SK",
    name: "Saskatchewan",
    metaTitle: "Air Duct Cleaning Saskatchewan | TrueNorth Duct Cleaning",
    metaDescription:
      "Professional air duct cleaning across Saskatchewan from $199. Saskatoon, Regina and beyond. Prairie dust specialists. Free quotes today.",
    h1: "Air Duct Cleaning Services in Saskatchewan",
    intro:
      "Saskatchewan lives with real prairie extremes — scorching summers, brutal winters, and wind that carries fine field dust into every corner of every town. Duct systems here do double duty through 60-degree annual temperature swings. From Saskatoon and Regina to the smaller centres between them, we clean the whole system so it can keep up with prairie life.",
    needs: [
      {
        title: "Relentless prairie dust",
        text: "Wind-borne field dust is a fact of Saskatchewan life. It's fine enough to slip past standard filters and settle in duct runs — where only a professional cleaning removes it.",
      },
      {
        title: "Systems that never rest",
        text: "Furnaces all winter, AC all summer: Saskatchewan HVAC rarely gets a day off. High-usage systems collect dust faster and benefit most from regular cleaning.",
      },
      {
        title: "New neighbourhoods, first cleanings",
        text: "Growing areas around Saskatoon and Regina are full of newer homes that still have construction debris in their ducts. The first clean makes a dramatic difference.",
      },
    ],
    moreCities: [
      "Regina",
      "Prince Albert",
      "Moose Jaw",
      "Warman",
      "Swift Current",
      "Yorkton",
      "North Battleford",
      "Estevan",
      "Weyburn",
      "Martensville",
      "Lloydminster",
      "Melfort",
    ],
    faqs: [
      {
        question: "How much does duct cleaning cost in Saskatchewan?",
        answer:
          "Our Saskatchewan Basic Package starts at $199 taxes included — complete duct and vent cleaning with natural sanitizer plus furnace, AC, and dryer vent inspections.",
      },
      {
        question: "Do you serve both Saskatoon and Regina?",
        answer:
          "Yes — we serve communities across Saskatchewan including Saskatoon, Regina, Prince Albert, Moose Jaw, and Warman.",
      },
    ],
  },
];
