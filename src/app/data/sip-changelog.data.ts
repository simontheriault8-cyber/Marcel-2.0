export interface SipChangeItem {
  id: string;
  date: string; // ISO "YYYY-MM-DD" or "DD/MM/YYYY"
  tradeCode: string;
  tradeNameFr: string;
  tradeNameEn: string;
  program: string;
  type: 'opened' | 'closed' | 'traitement_only' | 'waitlist';
  statusBeforeFr: string;
  statusBeforeEn: string;
  statusAfterFr: string;
  statusAfterEn: string;
  notesFr: string;
  notesEn: string;
}

export interface SipChangesFilterResult {
  thisWeek: SipChangeItem[];
  lastWeek: SipChangeItem[];
  allRecent: SipChangeItem[];
  olderExcludedCount: number;
}

/**
 * Historical and recent SIP changes data.
 * The retention logic automatically preserves only the entries from the last 14 days (2 weeks)
 * and purges/excludes any older entries.
 */
export const RAW_SIP_CHANGELOG: SipChangeItem[] = [
  // --- Cette semaine (Semaine courante: fin octobre 2026) ---
  {
    id: "sip-2026-10-27-01",
    date: "2026-10-27",
    tradeCode: "00183",
    tradeNameFr: "Pilote",
    tradeNameEn: "Pilot",
    program: "PFOR (CMR)",
    type: "closed",
    statusBeforeFr: "Ouvert (Admission & Traitement)",
    statusBeforeEn: "Open (Admission & Processing)",
    statusAfterFr: "Fermé pour admission (Traitement seulement)",
    statusAfterEn: "Closed for admission (Processing only)",
    notesFr: "Le quota d'admission PFOR au CMR pour Pilote a été atteint pour l'année courante.",
    notesEn: "ROTP admission quota at RMC for Pilot has been reached for the current year."
  },
  {
    id: "sip-2026-10-27-02",
    date: "2026-10-27",
    tradeCode: "00149",
    tradeNameFr: "Technicien de véhicules",
    tradeNameEn: "Vehicle Technician",
    program: "Non Qual",
    type: "opened",
    statusBeforeFr: "Fermé (Traitement seulement)",
    statusBeforeEn: "Closed (Processing only)",
    statusAfterFr: "Ouvert (Admission & Traitement)",
    statusAfterEn: "Open (Admission & Processing)",
    notesFr: "Réouverture des admissions directes suite à l'augmentation du contingent d'instruction.",
    notesEn: "Reopening of direct entries following increase in training intake capacity."
  },
  {
    id: "sip-2026-10-26-01",
    date: "2026-10-26",
    tradeCode: "00214",
    tradeNameFr: "Officier de la police militaire",
    tradeNameEn: "Military Police Officer",
    program: "PFOR (Civil)",
    type: "waitlist",
    statusBeforeFr: "Ouvert",
    statusBeforeEn: "Open",
    statusAfterFr: "Gestion des attentes",
    statusAfterEn: "Expectations Management",
    notesFr: "Nombre élevé de candidatures qualifiées; passage sous gestion des attentes.",
    notesEn: "High volume of qualified applications; moved to expectations management."
  },
  {
    id: "sip-2026-10-25-01",
    date: "2026-10-25",
    tradeCode: "00305",
    tradeNameFr: "Technicien en approvisionnement",
    tradeNameEn: "Material Management Technician",
    program: "Qual",
    type: "opened",
    statusBeforeFr: "Fermé",
    statusBeforeEn: "Closed",
    statusAfterFr: "Ouvert (Admission & Traitement)",
    statusAfterEn: "Open (Admission & Processing)",
    notesFr: "Ouverture de 15 places pour candidats possédant de l'expérience en logistique civile.",
    notesEn: "Opening of 15 positions for candidates with civilian logistics experience."
  },
  {
    id: "sip-2026-10-24-01",
    date: "2026-10-24",
    tradeCode: "00005",
    tradeNameFr: "Matelot de pont",
    tradeNameEn: "Boatswain",
    program: "Non Qual",
    type: "opened",
    statusBeforeFr: "Fermé",
    statusBeforeEn: "Closed",
    statusAfterFr: "Ouvert",
    statusAfterEn: "Open",
    notesFr: "Ouverture des inscriptions pour les prochaines cohortes de la MRC.",
    notesEn: "Open for enrollment for upcoming RCN naval cohorts."
  },

  // --- Semaine dernière (Semaine précédente: 14 à 21 octobre 2026) ---
  {
    id: "sip-2026-10-20-01",
    date: "2026-10-20",
    tradeCode: "00100",
    tradeNameFr: "Fantassin",
    tradeNameEn: "Infantryman",
    program: "Non Qual",
    type: "opened",
    statusBeforeFr: "Fermé temporaire",
    statusBeforeEn: "Temporary closed",
    statusAfterFr: "Ouvert",
    statusAfterEn: "Open",
    notesFr: "Recrutement continu actif avec priorité sur les cohortes d'hiver.",
    notesEn: "Active continuous recruitment with priority on winter cohorts."
  },
  {
    id: "sip-2026-10-18-01",
    date: "2026-10-18",
    tradeCode: "00195",
    tradeNameFr: "Officier du génie aérospatial",
    tradeNameEn: "Aerospace Engineering Officer",
    program: "Qual",
    type: "closed",
    statusBeforeFr: "Ouvert",
    statusBeforeEn: "Open",
    statusAfterFr: "Fermé",
    statusAfterEn: "Closed",
    notesFr: "Places comblées pour le programme d'entrée directe qualifié.",
    notesEn: "Positions filled for qualified direct entry program."
  },
  {
    id: "sip-2026-10-16-01",
    date: "2026-10-16",
    tradeCode: "00384",
    tradeNameFr: "Opérateur de sonar",
    tradeNameEn: "Sonar Operator",
    program: "Non Qual",
    type: "traitement_only",
    statusBeforeFr: "Ouvert admission",
    statusBeforeEn: "Open admission",
    statusAfterFr: "Traitement seulement",
    statusAfterEn: "Processing only",
    notesFr: "Fermé pour nouvelles admissions, les dossiers en cours continuent d'être traités.",
    notesEn: "Closed for new admissions; in-progress files remain in processing."
  },
  {
    id: "sip-2026-10-14-01",
    date: "2026-10-14",
    tradeCode: "00207",
    tradeNameFr: "Officier de guerre navale",
    tradeNameEn: "Naval Warfare Officer",
    program: "PFOR (CMR)",
    type: "opened",
    statusBeforeFr: "Gestion des attentes",
    statusBeforeEn: "Expectations management",
    statusAfterFr: "Ouvert",
    statusAfterEn: "Open",
    notesFr: "Places additionnelles allouées au CMR pour la rentrée d'automne.",
    notesEn: "Additional positions allocated at RMC for fall intake."
  },

  // --- Changements antérieurs (> 14 jours, servant à valider la purge/suppression automatique) ---
  {
    id: "sip-2026-09-30-01",
    date: "2026-09-30",
    tradeCode: "00164",
    tradeNameFr: "Technicien en systèmes d'information et télécommunications",
    tradeNameEn: "Information Systems and Telecommunications Technician",
    program: "Qual",
    type: "closed",
    statusBeforeFr: "Ouvert",
    statusBeforeEn: "Open",
    statusAfterFr: "Fermé",
    statusAfterEn: "Closed",
    notesFr: "Modification ancienne (plus de 14 jours) : automatiquement purgée de l'affichage.",
    notesEn: "Older change (over 14 days): automatically purged from display."
  },
  {
    id: "sip-2026-09-15-01",
    date: "2026-09-15",
    tradeCode: "00130",
    tradeNameFr: "Technicien de coque",
    tradeNameEn: "Hull Technician",
    program: "Non Qual",
    type: "opened",
    statusBeforeFr: "Fermé",
    statusBeforeEn: "Closed",
    statusAfterFr: "Ouvert",
    statusAfterEn: "Open",
    notesFr: "Modification archivée de septembre 2026 : doit être masquée par la règle des 2 semaines.",
    notesEn: "Archived September 2026 change: must be excluded by the 2-week rule."
  }
];

/**
 * Parses date string in YYYY-MM-DD or DD/MM/YYYY format.
 */
export function parseSipDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day, 12, 0, 0);
    }
  }
  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) {
    return isoDate;
  }
  return new Date();
}

/**
 * Formats a Date object to DD/MM/YYYY.
 */
export function formatSipDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Filters SIP changes by strict 14-day (2-week) retention rule.
 * Changes older than 14 days relative to the reference date are automatically excluded.
 * 
 * @param entries List of SIP changes
 * @param referenceDate Optional reference date (defaults to the latest change date or current date)
 */
export function filterSipChangesByRetention(
  entries: SipChangeItem[] = RAW_SIP_CHANGELOG,
  referenceDate?: Date | string
): SipChangesFilterResult {
  let refDate: Date;
  if (referenceDate) {
    refDate = typeof referenceDate === 'string' ? parseSipDate(referenceDate) : referenceDate;
  } else {
    // Determine newest date in the dataset to handle simulated dates consistently
    let maxTime = 0;
    for (const item of entries) {
      const t = parseSipDate(item.date).getTime();
      if (t > maxTime) {
        maxTime = t;
      }
    }
    refDate = maxTime > 0 ? new Date(maxTime) : new Date();
  }

  const thisWeek: SipChangeItem[] = [];
  const lastWeek: SipChangeItem[] = [];
  let olderExcludedCount = 0;

  const refTime = refDate.getTime();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  for (const item of entries) {
    const itemDate = parseSipDate(item.date);
    const itemTime = itemDate.getTime();
    const diffDays = Math.floor((refTime - itemTime) / ONE_DAY_MS);

    // Filter rule: Keep only changes from the last 2 weeks (diffDays <= 14).
    // Future entries or entries on same day have diffDays <= 0.
    if (diffDays > 14) {
      // Excluded: older than 2 weeks
      olderExcludedCount++;
      continue;
    }

    if (diffDays <= 7) {
      thisWeek.push(item);
    } else {
      lastWeek.push(item);
    }
  }

  // Sort descending by date
  const sortFn = (a: SipChangeItem, b: SipChangeItem) => 
    parseSipDate(b.date).getTime() - parseSipDate(a.date).getTime();

  thisWeek.sort(sortFn);
  lastWeek.sort(sortFn);

  const allRecent = [...thisWeek, ...lastWeek];

  return {
    thisWeek,
    lastWeek,
    allRecent,
    olderExcludedCount
  };
}
