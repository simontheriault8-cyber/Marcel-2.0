/**
 * Provincial math prerequisite/equivalence cascades for all provinces in MATH_COURSES.
 * Checking a course automatically checks all included lower/equivalent courses in that province.
 * Unchecking a course cleanly removes its cascaded courses and re-applies cascades from any
 * remaining checked courses (and DES for Quebec CST IV if still checked).
 */
export const PROVINCIAL_MATH_CASCADES: Record<string, string[]> = {
  // Québec (QC)
  qc_12_cegep201: [
    "qc_11_adv",
    "qc_11_app",
    "qc_11_gen",
    "qc_10_adv",
    "qc_10_app",
    "qc_10_gen",
  ],
  qc_11_adv: [
    "qc_11_app",
    "qc_11_gen",
    "qc_10_adv",
    "qc_10_app",
    "qc_10_gen",
  ],
  qc_11_app: [
    "qc_11_adv",
    "qc_11_gen",
    "qc_10_adv",
    "qc_10_app",
    "qc_10_gen",
  ],
  qc_11_gen: ["qc_10_gen"],
  qc_10_adv: ["qc_10_app", "qc_10_gen"],
  qc_10_app: ["qc_10_gen"],
  qc_10_gen: [],

  // Ontario (ON)
  on_12_adv: [
    "on_12_app",
    "on_12_gen",
    "on_11_adv",
    "on_11_app",
    "on_11_gen",
    "on_10_adv",
    "on_10_app",
  ],
  on_12_app: ["on_12_gen", "on_11_app", "on_11_gen", "on_10_app"],
  on_12_gen: ["on_11_gen"],
  on_11_adv: ["on_11_app", "on_11_gen", "on_10_adv", "on_10_app"],
  on_11_app: ["on_11_gen", "on_10_app"],
  on_11_gen: [],
  on_10_adv: ["on_10_app"],
  on_10_app: [],

  // Colombie-Britannique / Yukon (BC)
  bc_12_adv: [
    "bc_12_app",
    "bc_12_gen",
    "bc_11_adv",
    "bc_11_app",
    "bc_11_gen",
    "bc_10_adv",
    "bc_10_app",
    "bc_10_gen",
  ],
  bc_12_app: ["bc_12_gen", "bc_11_app", "bc_11_gen", "bc_10_app", "bc_10_gen"],
  bc_12_gen: ["bc_11_gen", "bc_10_gen"],
  bc_11_adv: ["bc_11_app", "bc_11_gen", "bc_10_adv", "bc_10_app", "bc_10_gen"],
  bc_11_app: ["bc_11_gen", "bc_10_app", "bc_10_gen"],
  bc_11_gen: ["bc_10_gen"],
  bc_10_adv: ["bc_10_app", "bc_10_gen"],
  bc_10_app: ["bc_10_gen"],
  bc_10_gen: [],

  // Alberta / T.N.-O. / Nunavut (AB)
  ab_12_adv: [
    "ab_12_app",
    "ab_12_gen",
    "ab_11_adv",
    "ab_11_app",
    "ab_11_gen",
    "ab_10_adv",
    "ab_10_app",
    "ab_10_gen",
  ],
  ab_12_app: ["ab_12_gen", "ab_11_app", "ab_11_gen", "ab_10_app", "ab_10_gen"],
  ab_12_gen: ["ab_11_gen", "ab_10_gen"],
  ab_11_adv: ["ab_11_app", "ab_11_gen", "ab_10_adv", "ab_10_app", "ab_10_gen"],
  ab_11_app: ["ab_11_gen", "ab_10_app", "ab_10_gen"],
  ab_11_gen: ["ab_10_gen"],
  ab_10_adv: ["ab_10_app", "ab_10_gen"],
  ab_10_app: ["ab_10_gen"],
  ab_10_gen: [],

  // Nouveau-Brunswick (Franco) (NB_FR)
  nbfr_12_adv: [
    "nbfr_12_app",
    "nbfr_11_adv",
    "nbfr_11_app",
    "nbfr_11_gen",
    "nbfr_10_app",
    "nbfr_10_gen",
  ],
  nbfr_12_app: ["nbfr_11_app", "nbfr_11_gen", "nbfr_10_app", "nbfr_10_gen"],
  nbfr_11_adv: ["nbfr_11_app", "nbfr_11_gen", "nbfr_10_app", "nbfr_10_gen"],
  nbfr_11_app: ["nbfr_11_gen", "nbfr_10_app", "nbfr_10_gen"],
  nbfr_11_gen: ["nbfr_10_gen"],
  nbfr_10_app: ["nbfr_10_gen"],
  nbfr_10_gen: [],
};
