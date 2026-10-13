import { Injectable } from "@angular/core";
import { JobEntry } from "./jobs-data";

export interface PforNoteRegistryParams {
  age: number | null;
  citizenship: string;
  dossierIds: string[];
  isAttentesMode: boolean;
  isCandidateTooOld: boolean;
  pforType: string;
  cmrRefused: boolean;
  cmrMinCriteriaNotMet: boolean;
  cmrDomains: string;
  choices: { job: JobEntry; isEligible: boolean; reasonFr: string }[];
  getJobAttentesSituation: (id: string) => 1 | 2;
  taskNote?: string;
  includeLinkedEmail?: boolean;
  hasReassignedTasks?: boolean;
  showResultsPanel?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class PforNoteService {
  generateNoteRegistry(params: PforNoteRegistryParams): string {
    if (params.age !== null && params.age >= 57) {
      return "Étape 1 (En cours) - Âge maximal d'admissibilité dépassé (57 ans et plus) : Inadmissible pour un enrôlement dans les FAC, courriel envoyé, fermeture du dossier.";
    }

    if (params.citizenship === "PR < 3 years") {
      return "Étape 1 (En cours) - Résident permanent de moins de 3 ans (Inadmissible) : Courriel d'inadmissibilité envoyé (résultat du calculateur IRCC +3 ans ou citoyenneté requis avant de repostuler), fermeture du dossier.";
    }

    const dossierIds = params.dossierIds.filter(Boolean);
    let reoNote = "";

    if (params.isAttentesMode) {
      let admissionPart = "";
      if (params.isCandidateTooOld) {
        admissionPart = "PFOR - Âge limite dépassé";
      } else if (params.pforType === "cmr") {
        if (params.cmrDomains) {
          admissionPart = `Admis CMR (${params.cmrDomains})`;
        } else {
          admissionPart = "PFOR CMR";
        }
      } else {
        admissionPart = "PFOR Civil";
      }

      const jobParts: string[] = [];
      for (const id of dossierIds) {
        if (id === "00003") {
          jobParts.push("00003 - Sans métier");
        } else {
          const sit = params.getJobAttentesSituation(id);
          const sitLabel = sit === 1 ? "Intake fermé" : "Traitement fermé";
          jobParts.push(`${id} - ${sitLabel}`);
        }
      }
      const jobsFormatted =
        jobParts.length > 0 ? jobParts.join(", ") : "aucun métier sélectionné";

      reoNote = `Étape 1 (En cours) - ${admissionPart} - Courriel de gestion des attentes envoyé, ${jobsFormatted}. Traitement continu, possible changement de métier selon choix du postulant.`;
    } else {
      let metierRaison = "";

      if (dossierIds.length === 0) {
        metierRaison = "aucun métier sélectionné au dossier";
      } else {
        const parts: string[] = [];
        for (const c of params.choices) {
          if (c.job.id === "00003") {
            parts.push(`00003 : Sans métier`);
            continue;
          }
          parts.push(
            `(${c.job.id} : ${c.isEligible ? "Admissible" : c.reasonFr})`
          );
        }
        metierRaison = parts.join(", ");
      }

      const isPRAdmissible = params.citizenship === "PR > 3 years";
      const prDemandText = isPRAdmissible
        ? " et relevés de notes du pays d'origine demandés"
        : "";

      let reoPrefix = "Réorientation nécessaire car";
      if (params.isCandidateTooOld) {
        reoPrefix = "PFOR - Âge limite dépassé - Réorientation nécessaire car";
      } else if (params.pforType === "cmr") {
        if (params.cmrRefused) {
          reoPrefix = "Refus d'admission CMR - Réorientation nécessaire";
        } else if (params.cmrMinCriteriaNotMet) {
          reoPrefix =
            "Critère minimal PFOR non rencontré (DES manquant) - Réorientation nécessaire";
        } else {
          if (params.cmrDomains) {
            reoPrefix = `Admis CMR (${params.cmrDomains}) - Réorientation nécessaire car`;
          } else {
            reoPrefix = "PFOR CMR - Réorientation nécessaire car";
          }
        }
      } else {
        reoPrefix = "PFOR Civil - Réorientation nécessaire car";
      }

      if (
        !params.isCandidateTooOld &&
        params.pforType === "cmr" &&
        (params.cmrRefused || params.cmrMinCriteriaNotMet)
      ) {
        reoNote = `Étape 1 (En cours) - ${reoPrefix}, courriel de réo envoyé${prDemandText}, en attente de la réponse du postulant. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.`;
      } else {
        reoNote = `Étape 1 (En cours) - ${reoPrefix} : ${metierRaison}, courriel de réo envoyé${prDemandText}, en attente de la réponse du postulant. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.`;
      }
    }

    if (
      (params.includeLinkedEmail ||
        (params.hasReassignedTasks && params.showResultsPanel)) &&
      params.taskNote
    ) {
      const taskNoteRaw = params.taskNote;

      let medicalSuffix = "";
      const medicalMarker = "MÉDICAL - TRIAGE PAR MED CHU REQUIS";
      if (taskNoteRaw.toUpperCase().includes(medicalMarker)) {
        medicalSuffix = "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }

      const prefixRegex = /^Étape 1 \((En cours|en cours)\)\s*-\s*/i;
      const suffixString = params.isAttentesMode
        ? "Traitement continu, possible changement de métier selon choix du postulant."
        : "Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.";

      const taskHasPrefix = prefixRegex.test(taskNoteRaw);
      let taskClean = taskNoteRaw.replace(prefixRegex, "").trim();
      const medicalIndex = taskClean.toUpperCase().indexOf(medicalMarker);
      if (medicalIndex !== -1) {
        taskClean = taskClean.substring(0, medicalIndex).trim();
      }
      const suffixIndexTask = taskClean
        .toLowerCase()
        .indexOf(suffixString.toLowerCase());
      if (suffixIndexTask !== -1) {
        taskClean = taskClean.substring(0, suffixIndexTask).trim();
      }
      if (taskClean.endsWith(".")) {
        taskClean = taskClean.slice(0, -1).trim();
      }

      const reoHasPrefix = prefixRegex.test(reoNote);
      let reoClean = reoNote.replace(prefixRegex, "").trim();
      const suffixIndexReo = reoClean
        .toLowerCase()
        .indexOf(suffixString.toLowerCase());
      if (suffixIndexReo !== -1) {
        reoClean = reoClean.substring(0, suffixIndexReo).trim();
      }
      if (reoClean.endsWith(".")) {
        reoClean = reoClean.slice(0, -1).trim();
      }

      let combinedCore = "";
      if (taskClean && reoClean) {
        if (taskClean === reoClean) {
          combinedCore = taskClean;
        } else {
          combinedCore = `${taskClean} ET ${reoClean}`;
        }
      } else {
        combinedCore = taskClean || reoClean;
      }

      const hasPrefix = taskHasPrefix || reoHasPrefix;
      const finalPrefix = hasPrefix ? "Étape 1 (En cours) - " : "";

      return `${finalPrefix}${combinedCore}. ${suffixString}${medicalSuffix}`;
    }

    return reoNote;
  }
}
