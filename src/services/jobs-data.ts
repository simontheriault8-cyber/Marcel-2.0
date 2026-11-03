export * from "./jobs-data/jobs.models";
import { JobEntry } from "./jobs-data/jobs.models";
import { JOBS_NCM_1 } from "./jobs-data/jobs-ncm-1.data";
import { JOBS_NCM_2 } from "./jobs-data/jobs-ncm-2.data";
import { JOBS_NCM_3 } from "./jobs-data/jobs-ncm-3.data";
import { JOBS_NCM_4 } from "./jobs-data/jobs-ncm-4.data";
import { JOBS_OFFICER_1 } from "./jobs-data/jobs-officer-1.data";
import { JOBS_OFFICER_2 } from "./jobs-data/jobs-officer-2.data";
import { JOBS_OFFICER_3 } from "./jobs-data/jobs-officer-3.data";

export const JOBS_DATA: JobEntry[] = [
  ...JOBS_NCM_1,
  ...JOBS_NCM_2,
  ...JOBS_NCM_3,
  ...JOBS_NCM_4,
  ...JOBS_OFFICER_1,
  ...JOBS_OFFICER_2,
  ...JOBS_OFFICER_3,
];
