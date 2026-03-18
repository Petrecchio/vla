// Reliable placeholder images via picsum (seed = stable per structure)
const img = (seed) => `https://picsum.photos/seed/${seed}/600/400`;

export const structures = [
  {
    id: 1,
    name: "Hotel Bella Vista",
    type: "Hotel",
    city: "Amalfi",
    region: "Campania",
    image: img("hotel-amalfi"),
    description: "Affacciato sulla Costiera Amalfitana, l'Hotel Bella Vista offre camere eleganti con vista mare mozzafiato, piscina panoramica e ristorante gourmet.",
    rating: 4.7,
    offers: [
      { id: "o1", label: "Sconto 15% sul soggiorno", type: "discount", value: 15 },
      { id: "o2", label: "Bottiglia di Limoncello in omaggio", type: "gift", value: null },
    ],
  },
  {
    id: 2,
    name: "B&B Il Giardino Segreto",
    type: "B&B",
    city: "Ravello",
    region: "Campania",
    image: img("bb-ravello"),
    description: "Un angolo di pace nel cuore di Ravello, circondato da giardini di limoni e bouganville. Colazione con prodotti locali ogni mattina.",
    rating: 4.9,
    offers: [
      { id: "o3", label: "Colazione gourmet gratuita", type: "gift", value: null },
      { id: "o4", label: "Sconto 10% per 2+ notti", type: "discount", value: 10 },
    ],
  },
  {
    id: 3,
    name: "Agriturismo Le Querce",
    type: "Agriturismo",
    city: "Val d'Orcia",
    region: "Toscana",
    image: img("agriturismo-toscana"),
    description: "Immerso nelle colline toscane, offre esperienze autentiche: degustazioni di vino, corsi di cucina e passeggiate tra gli ulivi.",
    rating: 4.6,
    offers: [
      { id: "o5", label: "Bottiglia d'olio EVO in omaggio", type: "gift", value: null },
      { id: "o6", label: "Sconto 20% sulla degustazione", type: "discount", value: 20 },
    ],
  },
  {
    id: 4,
    name: "Resort Blu Mediterraneo",
    type: "Resort",
    city: "Cefalù",
    region: "Sicilia",
    image: img("resort-sicilia"),
    description: "Resort fronte mare con spiaggia privata, spa e tre ristoranti. Perfetto per una vacanza all-inclusive nel cuore della Sicilia.",
    rating: 4.8,
    offers: [
      { id: "o7", label: "Accesso spa gratuito", type: "gift", value: null },
      { id: "o8", label: "Sconto 10% sul ristorante", type: "discount", value: 10 },
    ],
  },
  {
    id: 5,
    name: "Trulli di Nonna Maria",
    type: "Casa Vacanza",
    city: "Alberobello",
    region: "Puglia",
    image: img("trulli-puglia"),
    description: "Soggiorna in un autentico trullo ristrutturato con tutti i comfort moderni. Esperienza unica nel patrimonio UNESCO.",
    rating: 4.5,
    offers: [
      { id: "o9", label: "Tour guidato gratuito", type: "gift", value: null },
      { id: "o10", label: "Sconto 15% sul soggiorno", type: "discount", value: 15 },
    ],
  },
  {
    id: 6,
    name: "Locanda del Porto",
    type: "Locanda",
    city: "Portofino",
    region: "Liguria",
    image: img("locanda-portofino"),
    description: "Locanda storica nel porticciolo di Portofino. Camere con vista sul porto, cucina ligure tradizionale e atmosfera romantica.",
    rating: 4.4,
    offers: [
      { id: "o11", label: "Cena di pesce per 2 in omaggio", type: "gift", value: null },
      { id: "o12", label: "Sconto 10% early booking", type: "discount", value: 10 },
    ],
  },
  {
    id: 7,
    name: "Chalet Stella Alpina",
    type: "Chalet",
    city: "Cortina d'Ampezzo",
    region: "Veneto",
    image: img("chalet-dolomiti"),
    description: "Chalet in legno con vista sulle Dolomiti. Sauna finlandese, caminetto e colazione con prodotti di montagna.",
    rating: 4.7,
    offers: [
      { id: "o13", label: "Skipass giornaliero gratuito", type: "gift", value: null },
      { id: "o14", label: "Sconto 15% settimana bianca", type: "discount", value: 15 },
    ],
  },
  {
    id: 8,
    name: "Masseria Don Cataldo",
    type: "Masseria",
    city: "Ostuni",
    region: "Puglia",
    image: img("masseria-ostuni"),
    description: "Masseria del XVII secolo restaurata con piscina tra gli ulivi secolari. Produzione propria di olio e formaggi.",
    rating: 4.9,
    offers: [
      { id: "o15", label: "Kit prodotti tipici pugliesi", type: "gift", value: null },
      { id: "o16", label: "Sconto 20% soggiorno 3+ notti", type: "discount", value: 20 },
    ],
  },
  {
    id: 9,
    name: "Casa sul Lago",
    type: "Casa Vacanza",
    city: "Bellagio",
    region: "Lombardia",
    image: img("lago-como"),
    description: "Elegante residenza sul Lago di Como con giardino privato, molo e vista sulle montagne. La dolce vita lacustre.",
    rating: 4.6,
    offers: [
      { id: "o17", label: "Giro in barca 1h gratuito", type: "gift", value: null },
      { id: "o18", label: "Sconto 10% su attività", type: "discount", value: 10 },
    ],
  },
  {
    id: 10,
    name: "Palazzo Barocco",
    type: "Hotel Boutique",
    city: "Lecce",
    region: "Puglia",
    image: img("palazzo-lecce"),
    description: "Hotel boutique in un palazzo barocco del '600 nel centro storico di Lecce. Design contemporaneo e storia millenaria.",
    rating: 4.8,
    offers: [
      { id: "o19", label: "Aperitivo di benvenuto", type: "gift", value: null },
      { id: "o20", label: "Sconto 15% suite upgrade", type: "discount", value: 15 },
    ],
  },
  {
    id: 11,
    name: "Rifugio Monte Rosa",
    type: "Rifugio",
    city: "Gressoney",
    region: "Valle d'Aosta",
    image: img("rifugio-alpino"),
    description: "Rifugio alpino a 2.000m con vista sul Monte Rosa. Cucina valdostana, escursioni guidate e notti sotto le stelle.",
    rating: 4.3,
    offers: [
      { id: "o21", label: "Escursione guidata gratuita", type: "gift", value: null },
      { id: "o22", label: "Sconto 10% mezza pensione", type: "discount", value: 10 },
    ],
  },
  {
    id: 12,
    name: "Villa dei Cipressi",
    type: "Villa",
    city: "Taormina",
    region: "Sicilia",
    image: img("villa-taormina"),
    description: "Villa liberty con piscina a sfioro e vista sull'Etna. Giardino mediterraneo, chef privato su richiesta.",
    rating: 4.9,
    offers: [
      { id: "o23", label: "Cena privata con chef", type: "gift", value: null },
      { id: "o24", label: "Sconto 25% bassa stagione", type: "discount", value: 25 },
    ],
  },
  {
    id: 13,
    name: "Dimora Storica San Marco",
    type: "Dimora Storica",
    city: "Venezia",
    region: "Veneto",
    image: img("dimora-venezia"),
    description: "Dimora affrescata a due passi da Piazza San Marco. Mobili d'epoca, terrazza panoramica e servizio gondola.",
    rating: 4.7,
    offers: [
      { id: "o25", label: "Giro in gondola per 2", type: "gift", value: null },
      { id: "o26", label: "Sconto 10% soggiorno", type: "discount", value: 10 },
    ],
  },
  {
    id: 14,
    name: "Maso Alpino Dolomiti",
    type: "Agriturismo",
    city: "Val di Fassa",
    region: "Trentino-Alto Adige",
    image: img("maso-dolomiti"),
    description: "Maso ristrutturato tra prati alpini e boschi di larici. Cucina tirolese, sauna panoramica e silenzio assoluto.",
    rating: 4.8,
    offers: [
      { id: "o27", label: "Cesto prodotti tipici tirolesi", type: "gift", value: null },
      { id: "o28", label: "Sconto 15% settimana wellness", type: "discount", value: 15 },
    ],
  },
  {
    id: 15,
    name: "Hotel Merano Terme",
    type: "Hotel",
    city: "Merano",
    region: "Trentino-Alto Adige",
    image: img("hotel-merano"),
    description: "Hotel elegante nel centro di Merano con accesso diretto alle terme. Giardini botanici e cucina stellata.",
    rating: 4.6,
    offers: [
      { id: "o29", label: "Ingresso terme gratuito", type: "gift", value: null },
      { id: "o30", label: "Sconto 20% suite", type: "discount", value: 20 },
    ],
  },
  {
    id: 16,
    name: "Resort Costa Smeralda",
    type: "Resort",
    city: "Porto Cervo",
    region: "Sardegna",
    image: img("resort-sardegna"),
    description: "Resort esclusivo sulla Costa Smeralda con spiaggia privata, club nautico e ristorante gourmet vista mare.",
    rating: 4.9,
    offers: [
      { id: "o31", label: "Escursione in barca gratuita", type: "gift", value: null },
      { id: "o32", label: "Sconto 15% all-inclusive", type: "discount", value: 15 },
    ],
  },
  {
    id: 17,
    name: "B&B Barbagia Autentica",
    type: "B&B",
    city: "Orgosolo",
    region: "Sardegna",
    image: img("bb-barbagia"),
    description: "B&B nel cuore della Barbagia tra murales e tradizioni ancestrali. Colazione con seadas e formaggi locali.",
    rating: 4.4,
    offers: [
      { id: "o33", label: "Degustazione formaggi sardi", type: "gift", value: null },
      { id: "o34", label: "Sconto 10% soggiorno 2+ notti", type: "discount", value: 10 },
    ],
  },
  {
    id: 18,
    name: "Palazzo Trastevere",
    type: "Hotel Boutique",
    city: "Roma",
    region: "Lazio",
    image: img("palazzo-roma"),
    description: "Boutique hotel in un palazzo del '700 a Trastevere. Terrazza con vista sui tetti di Roma e aperitivi al tramonto.",
    rating: 4.7,
    offers: [
      { id: "o35", label: "Tour privato centro storico", type: "gift", value: null },
      { id: "o36", label: "Sconto 15% soggiorno", type: "discount", value: 15 },
    ],
  },
  {
    id: 19,
    name: "Agriturismo Tuscia",
    type: "Agriturismo",
    city: "Viterbo",
    region: "Lazio",
    image: img("agri-tuscia"),
    description: "Agriturismo nelle campagne della Tuscia tra terme etrusche, orti biologici e tramonti mozzafiato.",
    rating: 4.5,
    offers: [
      { id: "o37", label: "Cesto ortaggi biologici", type: "gift", value: null },
      { id: "o38", label: "Sconto 20% mezza pensione", type: "discount", value: 20 },
    ],
  },
  {
    id: 20,
    name: "Grand Hotel Bologna",
    type: "Hotel",
    city: "Bologna",
    region: "Emilia-Romagna",
    image: img("hotel-bologna"),
    description: "Hotel storico sotto i portici di Bologna. Cucina emiliana d'autore, cantina pregiata e posizione centrale.",
    rating: 4.6,
    offers: [
      { id: "o39", label: "Cena degustazione emiliana", type: "gift", value: null },
      { id: "o40", label: "Sconto 10% camera superior", type: "discount", value: 10 },
    ],
  },
  {
    id: 21,
    name: "Casa sulla Riviera",
    type: "Casa Vacanza",
    city: "Rimini",
    region: "Emilia-Romagna",
    image: img("casa-rimini"),
    description: "Appartamento fronte mare sulla riviera romagnola. Spiaggia privata, piadina a colazione e vita notturna.",
    rating: 4.3,
    offers: [
      { id: "o41", label: "Ombrellone e lettino gratis", type: "gift", value: null },
      { id: "o42", label: "Sconto 15% settimana intera", type: "discount", value: 15 },
    ],
  },
];

export const getStructureById = (id) => structures.find((s) => s.id === Number(id));

// Get random structures excluding a specific one (for cross-network rewards)
export const getOtherStructures = (excludeId) =>
  structures.filter((s) => s.id !== Number(excludeId));

// Get structures by region name
export const getStructuresByRegion = (regionName) =>
  structures.filter((s) => s.region === regionName);

// Count structures per region name → { "Campania": 2, "Toscana": 1, ... }
export const structureCountByRegion = () =>
  structures.reduce((acc, s) => {
    acc[s.region] = (acc[s.region] || 0) + 1;
    return acc;
  }, {});
