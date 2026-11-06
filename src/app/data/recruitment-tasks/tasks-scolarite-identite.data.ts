import { Task } from "./recruitment-tasks.models";
import { TASKS_SCOLARITE } from "./tasks-scolarite.data";
import { TASKS_IDENTITE } from "./tasks-identite.data";
import { TASKS_CITOYENNETE } from "./tasks-citoyennete.data";

export * from "./tasks-scolarite.data";
export * from "./tasks-identite.data";
export * from "./tasks-citoyennete.data";

export const TASKS_SCOLARITE_IDENTITE: Task[] = [
  ...TASKS_SCOLARITE,
  ...TASKS_IDENTITE,
  ...TASKS_CITOYENNETE,
];
