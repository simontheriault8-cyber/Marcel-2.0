export * from "./reorientation-criteria/criteria.models";
export * from "./reorientation-criteria/criteria-all.data";
import { JobRule } from "./reorientation-criteria/criteria.models";
import { JOB_RULES_PART1 } from "./reorientation-criteria/job-rules-part1.data";
import { JOB_RULES_PART2 } from "./reorientation-criteria/job-rules-part2.data";

export const JOB_RULES: JobRule[] = [
  ...JOB_RULES_PART1,
  ...JOB_RULES_PART2,
];
