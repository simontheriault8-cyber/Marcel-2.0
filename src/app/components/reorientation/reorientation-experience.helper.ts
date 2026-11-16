import { ManualCriterion } from "../../data/reorientation-criteria.data";
import { evaluateDynamicExperienceCriteria } from "../../../services/reorientation/experience-criteria-evaluator";
import { applyCriterionToggleAndCleanup } from "../../../services/reorientation/criteria-toggle-handler";

export function computeReoExperienceCriteria(this: any): ManualCriterion[] {
  const eligibleJobIds = typeof this.eligibleJobs === "function" ? this.eligibleJobs() : (this.eligibleJobs || []);
  return evaluateDynamicExperienceCriteria(eligibleJobIds);
}

export function toggleReoManualCriterion(this: any, id: string): void {
  const next = applyCriterionToggleAndCleanup(this.selectedCriteriaIds(), id);
  this.selectedCriteriaIds.set(next);
}

