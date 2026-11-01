import { ConsumableItem } from '../types/consumable';

export interface ReplacementGuideItem {
  id: string;
  title: string;
  category: 'office' | 'it' | 'sanitary' | 'hvac' | 'safety' | 'facility' | 'maintenance';
  categoryLabel: string;
  cycleDays: number;
  cycleDisplay: string;
  hygieneReason: string;
  dangerOfNeglect: string;
  signsOfDegradation: string[];
  scientificNote?: string;
  proTips: string;
  urgencyLevel: 'high' | 'medium' | 'standard';
  badgeLabel?: string;
}

export const REPLACEMENT_GUIDES: ReplacementGuideItem[] = [
  {
    id: 'shredder-oil',
    title: 'Smeerolie voor papiervernietiger / shredder',
    category: 'office',
    categoryLabel: 'Kantoor & Schrijfwaren',
    cycleDays: 14,
    cycleDisplay: 'Elke 2 weken (of na 2 ledigingen)',
    hygieneReason:
      'Snippermessen verzamelen micro-papierstof die de smering absorbeert. Zonder regelmatig oliën ontstaat wrijving, raakt de motor oververhit en slijten de messen snel.',
    dangerOfNeglect:
      'Vastlopers, hard piepend geluid, motorstoring en verlies van fabrieksgarantie.',
    signsOfDegradation: [
      'Piepend of krakend geluid tijdens het snijden',
      'Merkbaar tragere doorvoersnelheid van papier',
      'Wit opeengehoopt papierstof tussen de walsen',
      'Gescheurde in plaats van scherp gesneden snippers'
    ],
    scientificNote:
      'Regelmatig oliën verlengt de levensduur van het snijblok met factor 2,5 en verlaagt piekstromen met 18%.',
    proTips:
      'Leg speciale olievellen direct naast de vernietiger: de handeling kost minder dan 10 seconden.',
    urgencyLevel: 'high',
    badgeLabel: 'Preventief onderhoud'
  },
  {
    id: 'water-filter',
    title: 'Wateronthardingsfilter voor kantoor-espressomachine',
    category: 'sanitary',
    categoryLabel: 'Keuken & Kantine',
    cycleDays: 60,
    cycleDisplay: 'Elke 2 maanden (of volgens hardheidsmeter)',
    hygieneReason:
      'Leidingwater bevat kalk en chloor. Een verzadigd filter stimuleert bacteriegroei en bederft de smaak en temperatuur van koffie.',
    dangerOfNeglect:
      'Kalkaanslag in de boiler, drukverlies, dure reparaties en bittere of lauwe koffie.',
    signsOfDegradation: [
      'Koffie stroomt langzamer of druppelt slechts door',
      'Dunnere cremalaag zonder stevigheid',
      'Witte kalkafzetting zichtbaar in het waterreservoir',
      'Ontkalkingssymbool brandt op het display'
    ],
    scientificNote:
      'Meer dan 60% van de defecten aan zakelijke koffiemachines wordt rechtstreeks veroorzaakt door kalkophoping.',
    proTips:
      'Houd altijd een reservepatroon op voorraad en plan ontkalkingscycli buiten kantooruren.',
    urgencyLevel: 'high',
    badgeLabel: 'Smaak & Hygiëne'
  },
  {
    id: 'hvac-filter',
    title: 'Luchtfilter voor airconditioning & ventilatie (WTW/Fancoil)',
    category: 'hvac',
    categoryLabel: 'Overig & Speciaal',
    cycleDays: 90,
    cycleDisplay: 'Elke 3 maanden (seizoenswissel)',
    hygieneReason:
      'Filters vangen fijnstof, pollen en allergenen op. Bij verzadiging en vocht ontstaan schimmels en muffe geuren in het kantoor.',
    dangerOfNeglect:
      'Verminderde luchtstroom, hoger stroomverbruik en toename van allergische klachten of hoofdpijn bij collega\'s.',
    signsOfDegradation: [
      'Muffe geur bij inschakelen van ventilatie of koeling',
      'Merkbaar zwakkere luchtstroom uit de roosters',
      'Zichtbare donkere stoflaag op het filterdoek',
      'Lawaai door overbelasting van de ventilatormotor'
    ],
    scientificNote:
      'Een vervuild luchtfilter kan het energieverbruik van klimaatinstallaties met wel 15% opdrijven.',
    proTips:
      'Stofzuig het voorfilter maandelijks en vervang het hoofdfilter voor aanvang van zomer en winter.',
    urgencyLevel: 'medium',
    badgeLabel: 'Luchtkwaliteit'
  },
  {
    id: 'first-aid-sterile',
    title: 'Steriele verbandmiddelen en desinfectie in verbanddoos (BHV)',
    category: 'safety',
    categoryLabel: 'Medisch & Zorg',
    cycleDays: 180,
    cycleDisplay: 'Elke 6 maanden (periodieke Arbo-controle)',
    hygieneReason:
      'Gaasjes, snelverbanden en desinfectiemiddelen hebben een vervaldatum. Na overschrijding is steriliteit niet meer gegarandeerd.',
    dangerOfNeglect:
      'Infectiegevaar bij bedrijfsongevallen en boetes bij inspecties op de werkvloer.',
    signsOfDegradation: [
      'Vervaldatum op verpakking verstreken',
      'Beschadigde of verkleurde steriele wikkels',
      'Uitgedroogde desinfectiedoekjes'
    ],
    proTips:
      'Plaats een controlekaart met inspectiedatum en paraaf van de BHV\'er aan de binnenzijde van de verbandkoffer.',
    urgencyLevel: 'high',
    badgeLabel: 'Wettelijke norm (Arbo)'
  },
  {
    id: 'kitchen-sponge',
    title: 'Keukenspons en microvezeldoek voor kantine',
    category: 'sanitary',
    categoryLabel: 'Keuken & Kantine',
    cycleDays: 21,
    cycleDisplay: 'Elke 3 weken',
    hygieneReason:
      'Vocht en vetresten maken van de keukenspons het meest bacterierijke voorwerp in de kantine.',
    dangerOfNeglect:
      'Kruisbesmetting op mokken en bestek van collega\'s met risico op maag-darmklachten.',
    signsOfDegradation: [
      'Vezels beginnen te rafelen',
      'Blijvende geur ondanks afwasmiddel',
      'Spons voelt vettig of glibberig aan'
    ],
    proTips:
      'Vervang de spons standaard na 3 weken en laat hem altijd hangend drogen buiten de gootsteen.',
    urgencyLevel: 'medium',
    badgeLabel: 'Kantinehygiëne'
  },
  {
    id: 'keyboard-cleaner',
    title: 'Persluchtspray en reiniger voor werkplekken en IT',
    category: 'it',
    categoryLabel: 'Kantoor & Schrijfwaren',
    cycleDays: 30,
    cycleDisplay: 'Maandelijks',
    hygieneReason:
      'Tussen toetsen hopen zich huidschilfers, stof en kruimels op die het schakelmechanisme kunnen blokkeren.',
    dangerOfNeglect:
      'Haperende toetsen, onhygiënische flexplekken en defecte randapparatuur.',
    signsOfDegradation: [
      'Zichtbaar stof onder de toetsen',
      'Plakkerig gevoel bij aanslag',
      'Drukverlies in de spuitbus'
    ],
    proTips:
      'Maak van de laatste vrijdagmiddag van de maand een vast moment voor een schone werkplek.',
    urgencyLevel: 'standard',
    badgeLabel: 'Werkplekonderhoud'
  }
];

export function mapGuideToPreset(guide: ReplacementGuideItem): ConsumableItem {
  const today = new Date().toISOString().split('T')[0];
  return {
    id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: guide.title,
    category:
      guide.category === 'office' || guide.category === 'it'
        ? 'Kantoor & Schrijfwaren'
        : guide.category === 'sanitary'
        ? 'Keuken & Kantine'
        : guide.category === 'safety'
        ? 'Medisch & Zorg'
        : 'Overig & Speciaal',
    location:
      guide.category === 'office' || guide.category === 'it'
        ? 'Kantoor / Werkplek'
        : guide.category === 'sanitary'
        ? 'Keuken / Kantine'
        : guide.category === 'safety'
        ? 'Behandelkamer / Praktijkruimte'
        : 'Hoofdmagazijn',
    cycleDays: guide.cycleDays,
    lastReplacedDate: today,
    quantity: 1,
    unit: 'stuks',
    minQuantity: 1,
    orderLeadDays: 3,
    memo: `[Aanbevolen gids] ${guide.proTips}`,
    history: []
  };
}
