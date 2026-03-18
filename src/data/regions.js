const img = (seed) => `https://picsum.photos/seed/${seed}/800/500`;

export const regions = [
  {
    id: "campania",
    name: "Campania",
    description: "Costiera Amalfitana, Napoli, Pompei e sapori unici",
    image: img("campania-coast"),
    color: "#7c3aed",
  },
  {
    id: "toscana",
    name: "Toscana",
    description: "Colline, borghi medievali, vino e arte rinascimentale",
    image: img("toscana-hills"),
    color: "#7c3aed",
  },
  {
    id: "sicilia",
    name: "Sicilia",
    description: "Mare cristallino, storia millenaria e street food leggendario",
    image: img("sicilia-sea"),
    color: "#7c3aed",
  },
  {
    id: "puglia",
    name: "Puglia",
    description: "Trulli, masserie, ulivi e spiagge caraibiche del Salento",
    image: img("puglia-trulli"),
    color: "#7c3aed",
  },
  {
    id: "liguria",
    name: "Liguria",
    description: "Cinque Terre, pesto genovese e borghi colorati sul mare",
    image: img("liguria-cinque"),
    color: "#7c3aed",
  },
  {
    id: "veneto",
    name: "Veneto",
    description: "Venezia, Dolomiti, Prosecco e ville palladiane",
    image: img("veneto-venezia"),
    color: "#7c3aed",
  },
  {
    id: "lombardia",
    name: "Lombardia",
    description: "Laghi incantevoli, Milano fashion e montagne maestose",
    image: img("lombardia-lago"),
    color: "#7c3aed",
  },
  {
    id: "valle-d-aosta",
    name: "Valle d'Aosta",
    description: "Monte Bianco, castelli e sapori alpini autentici",
    image: img("aosta-mountains"),
    color: "#7c3aed",
  },
  {
    id: "trentino-alto-adige",
    name: "Trentino-Alto Adige",
    description: "Dolomiti UNESCO, mercatini e wellness alpino",
    image: img("trentino-dolomiti"),
    color: "#7c3aed",
  },
  {
    id: "sardegna",
    name: "Sardegna",
    description: "Costa Smeralda, nuraghi e acque turchesi incontaminate",
    image: img("sardegna-beach"),
    color: "#7c3aed",
  },
  {
    id: "lazio",
    name: "Lazio",
    description: "Roma eterna, borghi tuscia e terme naturali",
    image: img("lazio-roma"),
    color: "#7c3aed",
  },
  {
    id: "emilia-romagna",
    name: "Emilia-Romagna",
    description: "Capitale del gusto, motori, arte e riviera romagnola",
    image: img("emilia-food"),
    color: "#7c3aed",
  },
];

export const getRegionById = (id) => regions.find((r) => r.id === id);

// Map structure.region name → region id
export const regionNameToId = {
  "Campania": "campania",
  "Toscana": "toscana",
  "Sicilia": "sicilia",
  "Puglia": "puglia",
  "Liguria": "liguria",
  "Veneto": "veneto",
  "Lombardia": "lombardia",
  "Valle d'Aosta": "valle-d-aosta",
  "Trentino-Alto Adige": "trentino-alto-adige",
  "Sardegna": "sardegna",
  "Lazio": "lazio",
  "Emilia-Romagna": "emilia-romagna",
};

// Map GeoJSON reg_name (openpolis) → our region id
export const geoNameToId = {
  "Piemonte": "piemonte",
  "Valle d'Aosta/Vallée d'Aoste": "valle-d-aosta",
  "Lombardia": "lombardia",
  "Trentino-Alto Adige/Südtirol": "trentino-alto-adige",
  "Veneto": "veneto",
  "Friuli-Venezia Giulia": "friuli-venezia-giulia",
  "Liguria": "liguria",
  "Emilia-Romagna": "emilia-romagna",
  "Toscana": "toscana",
  "Umbria": "umbria",
  "Marche": "marche",
  "Lazio": "lazio",
  "Abruzzo": "abruzzo",
  "Molise": "molise",
  "Campania": "campania",
  "Puglia": "puglia",
  "Basilicata": "basilicata",
  "Calabria": "calabria",
  "Sicilia": "sicilia",
  "Sardegna": "sardegna",
};
