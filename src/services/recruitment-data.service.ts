import { Injectable } from "@angular/core";
export * from "../app/data/recruitment-tasks/recruitment-tasks.models";
import { Task } from "../app/data/recruitment-tasks/recruitment-tasks.models";
import { TASKS_SCOLARITE } from "../app/data/recruitment-tasks/tasks-scolarite.data";
import { TASKS_IDENTITE } from "../app/data/recruitment-tasks/tasks-identite.data";
import { TASKS_CITOYENNETE } from "../app/data/recruitment-tasks/tasks-citoyennete.data";
import { TASKS_FORMULAIRES_SECURITE } from "../app/data/recruitment-tasks/tasks-formulaires-securite.data";
import { TASKS_MEDICAL_SUPPLEMENTAIRES, GESTIONNAIRE_TASKS_DATA } from "../app/data/recruitment-tasks/tasks-medical-supplementaires.data";

@Injectable({
  providedIn: "root",
})
export class RecruitmentDataService {
  private readonly data: Task[] = [
    ...TASKS_SCOLARITE,
    ...TASKS_IDENTITE,
    ...TASKS_CITOYENNETE,
    ...TASKS_FORMULAIRES_SECURITE,
    ...TASKS_MEDICAL_SUPPLEMENTAIRES,
  ];

  getGestionnaireTasks(): Task[] {
    return GESTIONNAIRE_TASKS_DATA;
  }

  getTasks(role: "recruiter" | "gestionnaire" = "recruiter"): Task[] {
    if (role === "gestionnaire") {
      return this.getGestionnaireTasks();
    }
    return this.data;
  }
}
