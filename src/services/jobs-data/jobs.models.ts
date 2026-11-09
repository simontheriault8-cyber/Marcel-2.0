export interface JobRequirement {
  level: string; // e.g. "Idéal", "Acceptable"
  education: string[];
  experience: string[];
}

export interface JobCandidateGroup {
  candidates: string[];
  requirements: JobRequirement[];
}

export interface JobDetails {
  force: string;
  candidateGroups: JobCandidateGroup[];
  notes: string[];
}

export interface MedicalStandard {
  v: number;
  cv: number;
  h: number;
  g: number;
  o: number;
  a: number;
  u: number;
}

export type JobCategory = 'officier' | 'mr';

export interface EntryProgramsDatabase {
  regularForceNCM: string[];
  regularForceOfficer: string[];
  all: string[];
}

export const REGULAR_FORCE_NCM_PROGRAMS: string[] = [
  "EER",
  "Non Qual",
  "PFACA",
  "PFS-MR",
  "Qual",
  "Semi-Qual",
];

export const REGULAR_FORCE_OFFICER_PROGRAMS: string[] = [
  "EDO",
  "EDO(ES-PMNE)",
  "PFACA",
  "PFAM",
  "PFDM",
  "PFOEP",
  "PFOR",
  "PIMM",
];

export const ALL_ENROLLMENT_PROGRAMS: string[] = [
  "EDO",
  "EDO(ES-PMNE)",
  "EER",
  "MGC",
  "Non Qual",
  "PFACA",
  "PFAM",
  "PFDM",
  "PFIR",
  "PFOEP",
  "PFOR",
  "PFS-MR",
  "PIMM",
  "PIRO",
  "Qual",
  "RC",
  "Rés CO-OP",
  "Rés supp",
  "SAIOC",
  "Semi-Qual",
];

export const ENTRY_PROGRAMS_DATABASE: EntryProgramsDatabase = {
  regularForceNCM: REGULAR_FORCE_NCM_PROGRAMS,
  regularForceOfficer: REGULAR_FORCE_OFFICER_PROGRAMS,
  all: ALL_ENROLLMENT_PROGRAMS,
};

export type MilitaryElement = 'Air' | 'Armée' | 'Marine' | 'CMP';

export const JOB_ELEMENTS_MAP: Record<string, MilitaryElement> = {
  // Métiers militaires du rang (MR)
  "00005": "Armée",
  "00010": "Armée",
  "00019": "Air",
  "00099": "CMP",
  "00100": "CMP",
  "00105": "Marine",
  "00109": "Air",
  "00114": "Marine",
  "00115": "Marine",
  "00120": "CMP",
  "00129": "Armée",
  "00130": "Armée",
  "00134": "Armée",
  "00135": "Air",
  "00136": "Air",
  "00137": "CMP",
  "00138": "Air",
  "00149": "Air",
  "00152": "CMP",
  "00153": "CMP",
  "00155": "CMP",
  "00161": "CMP",
  "00164": "CMP",
  "00166": "CMP",
  "00167": "CMP",
  "00168": "CMP",
  "00169": "CMP",
  "00170": "CMP",
  "00171": "CMP",
  "00238": "Armée",
  "00261": "Air",
  "00299": "Marine",
  "00301": "Air",
  "00302": "Air",
  "00303": "Air",
  "00304": "Air",
  "00305": "Air",
  "00306": "Air",
  "00324": "Marine",
  "00327": "Armée",
  "00335": "CMP",
  "00337": "Air",
  "00339": "Armée",
  "00366": "Marine",
  "00368": "Armée",
  "00370": "Air",
  "00372": "CMP",
  "00375": "CMP",
  "00376": "CMP",
  "00378": "CMP",
  "00383": "Armée",
  "00384": "Armée",
  "00385": "Armée",
  "00386": "Air",
  "00387": "Armée",
  "00394": "Air",
  "00402": "Marine",
  "00404": "Marine",
  "00405": "Marine",
  "00406": "CMP",
  "00407": "CMP",

  // Métiers d'officiers
  "00178": "Armée",
  "00179": "Armée",
  "00180": "Armée",
  "00181": "Armée",
  "00182": "Air",
  "00183": "Air",
  "00184": "Air",
  "00185": "Air",
  "00187": "Armée",
  "00189": "Air",
  "00190": "CMP",
  "00191": "CMP",
  "00194": "CMP",
  "00195": "CMP",
  "00197": "CMP",
  "00198": "CMP",
  "00203": "CMP",
  "00204": "CMP",
  "00207": "Marine",
  "00208": "CMP",
  "00211": "CMP",
  "00213": "CMP",
  "00214": "CMP",
  "00328": "CMP",
  "00340": "Air",
  "00341": "Armée",
  "00344": "Marine",
  "00345": "Marine",
  "00349": "CMP",
  "00374": "CMP",
  "00389": "Air",
  "00390": "CMP",
  "00393": "CMP",
  "00398": "CMP",
};

/**
 * Liste officielle et définitive des métiers d'officiers des Forces armées canadiennes.
 * Basée sur le document de référence "Éléments par métier" (34 métiers d'officiers).
 */
export const OFFICIAL_OFFICER_JOB_IDS = new Set<string>([
  "00178", "00179", "00180", "00181", "00182", "00183", "00184", "00185",
  "00187", "00189", "00190", "00191", "00194", "00195", "00197", "00198",
  "00203", "00204", "00207", "00208", "00211", "00213", "00214", "00328",
  "00340", "00341", "00344", "00345", "00349", "00374", "00389", "00390",
  "00393", "00398",
]);

/**
 * Liste officielle et définitive des métiers militaires du rang (MR) des FAC (61 métiers MR).
 */
export const OFFICIAL_NCM_JOB_IDS = new Set<string>([
  "00005", "00010", "00019", "00099", "00100", "00105", "00109", "00114",
  "00115", "00120", "00129", "00130", "00134", "00135", "00136", "00137",
  "00138", "00149", "00152", "00153", "00155", "00161", "00164", "00166",
  "00167", "00168", "00169", "00170", "00171", "00238", "00261", "00299",
  "00301", "00302", "00303", "00304", "00305", "00306", "00324", "00327",
  "00335", "00337", "00339", "00366", "00368", "00370", "00372", "00375",
  "00376", "00378", "00383", "00384", "00385", "00386", "00387", "00394",
  "00402", "00404", "00405", "00406", "00407",
]);

export function isOfficerJobId(jobId: string): boolean {
  if (!jobId) return false;
  return OFFICIAL_OFFICER_JOB_IDS.has(jobId.trim().padStart(5, "0"));
}

export function isNcmJobId(jobId: string): boolean {
  if (!jobId) return false;
  return OFFICIAL_NCM_JOB_IDS.has(jobId.trim().padStart(5, "0"));
}

export interface RecruitmentCenter {
  city: string;
  name: string;
  nameEn: string;
  address: string;
  fullFr: string;
  fullEn: string;
}

export const RECRUITMENT_CENTERS: RecruitmentCenter[] = [
  {
    city: "Québec",
    name: "Centre de recrutement des Forces armées canadiennes - détachement Québec",
    nameEn: "Canadian Forces Recruiting Centre - Detachment Quebec",
    address: "2575 boulevard Sainte-Anne, bureau 120, Québec, QC, G1J 0G7",
    fullFr: "Centre de recrutement des Forces armées canadiennes - détachement Québec\n2575 boulevard Sainte-Anne, bureau 120, Québec, QC, G1J 0G7",
    fullEn: "Canadian Forces Recruiting Centre - Detachment Quebec\n2575 boulevard Sainte-Anne, bureau 120, Québec, QC, G1J 0G7",
  },
  {
    city: "Sherbrooke",
    name: "Centre de recrutement des Forces armées canadiennes - détachement Sherbrooke",
    nameEn: "Canadian Forces Recruiting Centre - Detachment Sherbrooke",
    address: "50 Place de la Cité, 315 King Ouest, Sherbrooke, Québec, J1H 4G9",
    fullFr: "Centre de recrutement des Forces armées canadiennes - détachement Sherbrooke\n50 Place de la Cité, 315 King Ouest, Sherbrooke, Québec, J1H 4G9",
    fullEn: "Canadian Forces Recruiting Centre - Detachment Sherbrooke\n50 Place de la Cité, 315 King Ouest, Sherbrooke, Québec, J1H 4G9",
  },
  {
    city: "Montréal",
    name: "Centre de recrutement des Forces armées canadiennes - détachement Montréal",
    nameEn: "Canadian Forces Recruiting Centre - Detachment Montreal",
    address: "1600 Boul Rene-Levesque O, Montreal, QC, H3H1P9",
    fullFr: "Centre de recrutement des Forces armées canadiennes - détachement Montréal\n1600 Boul Rene-Levesque O, Montreal, QC, H3H1P9",
    fullEn: "Canadian Forces Recruiting Centre - Detachment Montreal\n1600 Boul Rene-Levesque O, Montreal, QC, H3H1P9",
  },
  {
    city: "Rimouski",
    name: "Centre de recrutement des Forces armées canadiennes - détachement Rimouski",
    nameEn: "Canadian Forces Recruiting Centre - Detachment Rimouski",
    address: "70 Rue St-Germain Est, Rimouski, QC, G5L 7J9",
    fullFr: "Centre de recrutement des Forces armées canadiennes - détachement Rimouski\n70 Rue St-Germain Est, Rimouski, QC, G5L 7J9",
    fullEn: "Canadian Forces Recruiting Centre - Detachment Rimouski\n70 Rue St-Germain Est, Rimouski, QC, G5L 7J9",
  },
  {
    city: "Chicoutimi",
    name: "Centre de recrutement des Forces armées canadiennes - détachement Chicoutimi",
    nameEn: "Canadian Forces Recruiting Centre - Detachment Chicoutimi",
    address: "345 des Saguenéens, Chicoutimi, QC, G7H 6K9",
    fullFr: "Centre de recrutement des Forces armées canadiennes - détachement Chicoutimi\n345 des Saguenéens, Chicoutimi, QC, G7H 6K9",
    fullEn: "Canadian Forces Recruiting Centre - Detachment Chicoutimi\n345 des Saguenéens, Chicoutimi, QC, G7H 6K9",
  },
  {
    city: "Toronto",
    name: "Centre de recrutement des Forces canadiennes Toronto",
    nameEn: "Canadian Forces Recruiting Centre Toronto",
    address: "4900 Yonge St, Suite 100, North York, ON, M2N 6A4",
    fullFr: "Centre de recrutement des Forces canadiennes Toronto\n4900 Yonge St, Suite 100, North York, ON, M2N 6A4",
    fullEn: "Canadian Forces Recruiting Centre Toronto\n4900 Yonge St, Suite 100, North York, ON, M2N 6A4",
  },
];

export const ENROLMENT_HOURS: string[] = [
  "6h00", "6h15", "6h30", "6h45",
  "7h00", "7h15", "7h30", "7h45",
  "8h00", "8h15", "8h30", "8h45",
  "9h00", "9h15", "9h30", "9h40", "9h45",
  "10h00", "10h15", "10h30", "10h45",
  "11h00", "11h15", "11h30", "11h45",
  "12h00", "12h15", "12h30", "12h45",
  "13h00", "13h15", "13h30", "13h45",
  "14h00", "14h15", "14h30", "14h45",
  "15h00", "15h15", "15h30", "15h45",
  "16h00"
];

export interface JobEntry {
  medicalStandard?: MedicalStandard;
  id: string;
  title: string;
  titleEn?: string;
  abbreviation: string;
  category?: JobCategory;
  element?: MilitaryElement;
  isCMP?: boolean;
  entryPrograms?: string[];
  requirements: string;
  htmlContent?: string;
  details?: JobDetails[];
  contracts?: { program: string; duration: string }[];
  urlFr?: string;
  urlEn?: string;
}

