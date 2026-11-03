import { ManualCriterion } from "./criteria.models";
import { CRITERIA_UNIV_GENIE } from "./universitaire/criteria-univ-genie.data";
import { CRITERIA_UNIV_SCIENCES } from "./universitaire/criteria-univ-sciences.data";
import { CRITERIA_UNIV_ARTS } from "./universitaire/criteria-univ-arts.data";
import { CRITERIA_UNIV_SANTE } from "./universitaire/criteria-univ-sante.data";
import { CRITERIA_UNIV_CYCLES_SUPERIEURS } from "./universitaire/criteria-univ-cycles-superieurs.data";

export * from "./universitaire/criteria-univ-genie.data";
export * from "./universitaire/criteria-univ-sciences.data";
export * from "./universitaire/criteria-univ-arts.data";
export * from "./universitaire/criteria-univ-sante.data";
export * from "./universitaire/criteria-univ-cycles-superieurs.data";

export const CRITERIA_UNIVERSITAIRE: ManualCriterion[] = [
  ...CRITERIA_UNIV_GENIE,
  ...CRITERIA_UNIV_SCIENCES,
  ...CRITERIA_UNIV_ARTS,
  ...CRITERIA_UNIV_SANTE,
  ...CRITERIA_UNIV_CYCLES_SUPERIEURS,
];
