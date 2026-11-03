import { ManualCriterion } from "./criteria.models";
import { CRITERIA_SECONDAIRE_SPECIALISES } from "./criteria-secondaire-specialises.data";
import { CRITERIA_UNIVERSITAIRE } from "./criteria-universitaire.data";
import { CRITERIA_EXPERIENCE } from "./criteria-experience.data";

export const MANUAL_CRITERIA: ManualCriterion[] = [
  ...CRITERIA_SECONDAIRE_SPECIALISES,
  ...CRITERIA_UNIVERSITAIRE,
  ...CRITERIA_EXPERIENCE,
];
