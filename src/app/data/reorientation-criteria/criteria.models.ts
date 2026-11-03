export interface ManualCriterion {
  id: string;
  label: string;
  labelEn?: string;
  category:
    | "Scolarité"
    | "Expérience"
    | "Année scolaire"
    | "Histoire"
    | "Langue"
    | "Science"
    | "Informatique"
    | "Cours spécialisés"
    | "Universitaire 1er cycle"
    | "Universitaire cycle supérieur";
  subCategory?: string;
}

export interface JobRule {
  requiredCriteriaIds?: string[];
  customCheck?: (
    selected: Set<string>,
    criteriaCoursSpecialiseIds: string[],
  ) => boolean | { passed: boolean; missingFr?: string; missingEn?: string };
  jobs: string[];
  allowPR?: boolean;
}


export const PROVINCES = [
    { id: "QC", name: "Québec" },
    { id: "ON", name: "Ontario" },
    { id: "BC", name: "C.-B. / Yukon" },
    { id: "AB", name: "Alberta / T.N.-O. / Nunavut" },
    { id: "NB_FR", name: "Nouveau-Brunswick (Franco)" },
  ];


export interface MathCourse {
  id: string;
  label: string;
  labelEn?: string;
  grade: number;
  diff: number;
}

export const MATH_COURSES: Record<string, MathCourse[]> = {
  QC: [
    {
      id: "qc_10_gen",
      label: "Math CST IV / 416 (10e Appliquée)",
      labelEn: "Math CST IV / 416 (Grade 10 Applied)",
      grade: 10,
      diff: 2,
    },
    {
      id: "qc_10_app",
      label: "Math TS IV / 426 (10e Avancée)",
      labelEn: "Math TS IV / 426 (Grade 10 Advanced)",
      grade: 10,
      diff: 3,
    },
    {
      id: "qc_10_adv",
      label: "Math SN IV / 436 (10e Avancée/Théorique)",
      labelEn: "Math SN IV / 436 (Grade 10 Advanced/Theoretical)",
      grade: 10,
      diff: 3,
    },
    {
      id: "qc_11_gen",
      label: "Math CST V / 514 (11e Générale)",
      labelEn: "Math CST V / 514 (Grade 11 General)",
      grade: 11,
      diff: 1,
    },
    {
      id: "qc_11_app",
      label: "Math TS V / 526 (11e Appliquée)",
      labelEn: "Math TS V / 526 (Grade 11 Applied)",
      grade: 11,
      diff: 3,
    },
    {
      id: "qc_11_adv",
      label: "Math SN V / 536 (11e Avancée/Théorique)",
      labelEn: "Math SN V / 536 (Grade 11 Advanced/Theoretical)",
      grade: 11,
      diff: 3,
    },
    {
      id: "qc_12_cegep201",
      label: "CEGEP 201 Appliquée ou Théoriques / 12e année",
      labelEn: "CEGEP 201 Applied or Theoretical / Grade 12",
      grade: 12,
      diff: 3,
    },
  ],
  ON: [
    { id: "on_10_app", label: "MFM2P (10e Appliquée)", labelEn: "MFM2P (Grade 10 Applied)", grade: 10, diff: 2 },
    { id: "on_10_adv", label: "MPM2D (10e Avancée)", labelEn: "MPM2D (Grade 10 Academic)", grade: 10, diff: 3 },
    { id: "on_11_gen", label: "MEL3E (11e Générale)", labelEn: "MEL3E (Grade 11 Workplace/General)", grade: 11, diff: 1 },
    { id: "on_11_app", label: "MBF3C (11e Appliquée)", labelEn: "MBF3C (Grade 11 College/Applied)", grade: 11, diff: 2 },
    {
      id: "on_11_adv",
      label: "MCF3M / MCR3U (11e Avancée)",
      labelEn: "MCF3M / MCR3U (Grade 11 University/Academic)",
      grade: 11,
      diff: 3,
    },
    { id: "on_12_gen", label: "MEL4E (12e Générale)", labelEn: "MEL4E (Grade 12 Workplace/General)", grade: 12, diff: 1 },
    { id: "on_12_app", label: "MAP4C (12e Appliquée)", labelEn: "MAP4C (Grade 12 College/Applied)", grade: 12, diff: 2 },
    {
      id: "on_12_adv",
      label: "MCT4C / MDM4U / MCV4U / MHF4U (12e Avancée)",
      labelEn: "MCT4C / MDM4U / MCV4U / MHF4U (Grade 12 University/Academic)",
      grade: 12,
      diff: 3,
    },
  ],
  BC: [
    {
      id: "bc_10_gen",
      label: "Math de base 10 / Milieu de travail 10 (10e Générale)",
      labelEn: "Workplace Math 10 (Grade 10 General)",
      grade: 10,
      diff: 1,
    },
    {
      id: "bc_10_app",
      label: "Applications 10 (10e Appliquée)",
      labelEn: "Foundations of Math 10 (Grade 10 Applied)",
      grade: 10,
      diff: 2,
    },
    {
      id: "bc_10_adv",
      label: "Principes 10 / Fondements et pré-calcul 10 (10e Avancée)",
      labelEn: "Foundations & Pre-Calculus 10 (Grade 10 Academic)",
      grade: 10,
      diff: 3,
    },
    {
      id: "bc_11_gen",
      label: "Math de base 11 / Milieu de travail 11 (11e Générale)",
      labelEn: "Workplace Math 11 (Grade 11 General)",
      grade: 11,
      diff: 1,
    },
    {
      id: "bc_11_app",
      label: "Applications 11 / Fondements 11 (11e Appliquée)",
      labelEn: "Foundations of Math 11 (Grade 11 Applied)",
      grade: 11,
      diff: 2,
    },
    {
      id: "bc_11_adv",
      label: "Principes 11 / Pré-calcul 11 (11e Avancée)",
      labelEn: "Pre-Calculus 11 (Grade 11 Academic)",
      grade: 11,
      diff: 3,
    },
    {
      id: "bc_12_gen",
      label: "Fondements 12 / Informatique 12 (12e Générale)",
      labelEn: "Foundations of Math 12 / Computer Science 12 (Grade 12 General)",
      grade: 12,
      diff: 1,
    },
    {
      id: "bc_12_app",
      label: "Applications 12 (12e Appliquée)",
      labelEn: "Apprenticeship & Workplace Math 12 (Grade 12 Applied)",
      grade: 12,
      diff: 2,
    },
    {
      id: "bc_12_adv",
      label: "Principes 12 / Pré-calcul 12 / Calcul infinitésimal (12e Avancée)",
      labelEn: "Pre-Calculus 12 / Calculus 12 (Grade 12 Academic)",
      grade: 12,
      diff: 3,
    },
  ],
  AB: [
    {
      id: "ab_10_gen",
      label: "Math 10-4 (10e Générale)",
      labelEn: "Math 10-4 (Grade 10 General)",
      grade: 10,
      diff: 1,
    },
    {
      id: "ab_10_app",
      label: "Math 10-3 (10e Appliquée)",
      labelEn: "Math 10-3 (Grade 10 Applied)",
      grade: 10,
      diff: 2,
    },
    { id: "ab_10_adv", label: "Math 10C (10e Avancée)", labelEn: "Math 10C (Grade 10 Academic)", grade: 10, diff: 3 },
    {
      id: "ab_11_gen",
      label: "Math 20-4 (11e Générale)",
      labelEn: "Math 20-4 (Grade 11 General)",
      grade: 11,
      diff: 1,
    },
    {
      id: "ab_11_app",
      label: "Math 20-3 / 20-2 (11e Appliquée)",
      labelEn: "Math 20-3 / 20-2 (Grade 11 Applied)",
      grade: 11,
      diff: 2,
    },
    { id: "ab_11_adv", label: "Math 20-1 (11e Avancée)", labelEn: "Math 20-1 (Grade 11 Academic)", grade: 11, diff: 3 },
    {
      id: "ab_12_app",
      label: "Math 30-3 / 30-2 (12e Appliquée)",
      labelEn: "Math 30-3 / 30-2 (Grade 12 Applied)",
      grade: 12,
      diff: 2,
    },
    {
      id: "ab_12_adv",
      label: "Math 30-1 / Math 31 (12e Avancée)",
      labelEn: "Math 30-1 / Math 31 (Grade 12 Academic)",
      grade: 12,
      diff: 3,
    },
  ],
  NB_FR: [
    { id: "nbfr_10_gen", label: "30231A (10e Générale)", labelEn: "30231A (Grade 10 General)", grade: 10, diff: 1 },
    {
      id: "nbfr_10_app",
      label: "30231BC (10e Appliquée)",
      labelEn: "30231BC (Grade 10 Applied)",
      grade: 10,
      diff: 2,
    },
    {
      id: "nbfr_11_gen",
      label: "30311A / 30321A (11e Générale)",
      labelEn: "30311A / 30321A (Grade 11 General)",
      grade: 11,
      diff: 1,
    },
    {
      id: "nbfr_11_app",
      label: "30311B / 30321B (11e Appliquée)",
      labelEn: "30311B / 30321B (Grade 11 Applied)",
      grade: 11,
      diff: 2,
    },
    { id: "nbfr_11_adv", label: "30331C (11e Avancée)", labelEn: "30331C (Grade 11 Academic)", grade: 11, diff: 3 },
    {
      id: "nbfr_12_app",
      label: "30411B (12e Appliquée)",
      labelEn: "30411B (Grade 12 Applied)",
      grade: 12,
      diff: 2,
    },
    {
      id: "nbfr_12_adv",
      label: "30411C / 30421C / 31411 (12e Avancée)",
      labelEn: "30411C / 30421C / 31411 (Grade 12 Academic)",
      grade: 12,
      diff: 3,
    },
  ],
};


export function hasDes(selected: Set<string>): boolean {
  return selected.has("des_12e_annee") || selected.has("aens");
}

export function hasSec4(selected: Set<string>): boolean {
  return selected.has("sec4_24_credits") || selected.has("des_12e_annee") || selected.has("aens");
}


export const CMR_JOB_DOMAINS: Record<
  string,
  { arts: boolean; genie: boolean; science: boolean }
> = {
  "00178": { arts: true, genie: true, science: true },
  "00179": { arts: true, genie: true, science: true },
  "00180": { arts: true, genie: true, science: true },
  "00181": { arts: false, genie: true, science: true },
  "00182": { arts: true, genie: true, science: true },
  "00183": { arts: true, genie: true, science: true },
  "00184": { arts: true, genie: true, science: true },
  "00185": { arts: false, genie: true, science: true },
  "00187": { arts: false, genie: true, science: true },
  "00189": { arts: false, genie: true, science: false },
  "00203": { arts: true, genie: false, science: false },
  "00207": { arts: true, genie: true, science: true },
  "00208": { arts: true, genie: false, science: false },
  "00213": { arts: true, genie: true, science: true },
  "00214": { arts: true, genie: false, science: false },
  "00328": { arts: true, genie: true, science: true },
  "00340": { arts: false, genie: true, science: true },
  "00341": { arts: false, genie: true, science: true },
  "00344": { arts: false, genie: true, science: true },
  "00345": { arts: false, genie: true, science: true },
  "00389": { arts: true, genie: true, science: true },
  "00398": { arts: true, genie: false, science: false },
};

/**
 * Métiers subventionnés PFOR Civil selon la nomenclature officielle CMR vs Civil.
 * Comprend les 34 métiers identifiés dans le document "Métiers par programme CMR / Civil".
 */
export const PFOR_CIVIL_JOB_IDS = new Set<string>([
  "00178", "00179", "00180", "00181", "00182", "00183", "00184", "00185", "00187", "00189",
  "00190", "00191", "00194", "00195", "00197", "00198",
  "00203", "00207", "00208",
  "00211", "00213", "00214",
  "00328", "00340", "00341", "00344", "00345",
  "00349", "00374",
  "00389", "00390", "00393", "00398", "00410"
]);

export function isPforCivilJobId(jobId: string): boolean {
  if (!jobId) return false;
  return PFOR_CIVIL_JOB_IDS.has(jobId.trim().padStart(5, "0"));
}
