import { JobEntry } from "../../services/jobs-data";
import { Task, DocumentItem, RejectionReason } from "../../services/recruitment-data.service";
import { getInapteMedicalNote } from "./gd-inapte-medical-email.generator";

export function getStructuredRejections(this: any) {
  const selectedKeys = this.selectedRejectionKeys();
  const taskNotCompletedKeys = this.taskNotCompletedKeys();
  // Use Map to preserve insertion order of tasks
  const tasksMap = new Map<
    Task,
    { doc: DocumentItem; reason: RejectionReason }[]
  >();

  // Iterate over all tasks instead of only visible tasks to include minor check rejections
  for (const task of this.allTasks()) {
    const isVisible = this.visibleTasks().some((vt: Task) => vt.nameFr === task.nameFr);
    
    const hasRejections = task.documents.some(doc => 
      doc.reasons.some(reason => this.isReasonSelected(doc, reason))
    );
    const isNotCompleted = taskNotCompletedKeys.has(task.nameFr);

    if (!isVisible && !hasRejections && !isNotCompleted) {
      continue;
    }

    if (isNotCompleted) {
      tasksMap.set(task, []);
    }
    for (const doc of task.documents) {
      for (const reason of doc.reasons) {
        if (this.isReasonSelected(doc, reason)) {
          if (!tasksMap.has(task)) {
            tasksMap.set(task, []);
          }
          tasksMap.get(task)!.push({ doc, reason });
        }
      }
    }
  }
  return tasksMap;
}

export function getRejectionReasonsForCompliantNote(this: any): string {
  const isEn = this.i18n ? this.i18n.isEn() : false;
  const selectedKeys = this.selectedRejectionKeys();
  const taskNotCompletedKeys = this.taskNotCompletedKeys();
  const notes: string[] = [];
  let hasNormalReassignment = false;

  for (const task of this.allTasks()) {
    const isVisible = this.visibleTasks().some((vt: Task) => vt.nameFr === task.nameFr);
    const isNotCompleted = taskNotCompletedKeys.has(task.nameFr);
    const hasRejections = task.documents.some(doc => 
      doc.reasons.some(reason => this.isReasonSelected(doc, reason))
    );

    if (!isVisible && !hasRejections && !isNotCompleted) {
      continue;
    }

    if (isNotCompleted) {
      const taskName = this.i18n ? this.i18n.pick(task.nameFr, task.nameEn) : (isEn ? (task.nameEn || task.nameFr) : task.nameFr);
      notes.push(this.i18n ? this.i18n.t('regNotes.taskNotCompleted', { taskName }) : (isEn ? `Task "${taskName}" not completed` : `Tâche "${taskName}" non complétée`));
      hasNormalReassignment = true;
    }
    for (const doc of task.documents) {
      for (const reason of doc.reasons) {
        if (this.isReasonSelected(doc, reason)) {
          if (isEn) {
            notes.push(this.i18n.translateReasonLogNote(reason.logNoteFr, reason.id, reason.logNoteEn));
          } else {
            notes.push(reason.logNoteFr);
          }
          if (!reason.isConfirmation) {
            hasNormalReassignment = true;
          }
        }
      }
    }
  }

  if (notes.length === 0) return "";

  const uniqueNotes = Array.from(new Set(notes));
  const bulletReasons = uniqueNotes.map(n => `- ${n}`).join("\n");

  let header = "";
  if (hasNormalReassignment) {
    header = this.i18n
      ? this.i18n.t('regNotes.compliantExtraReassignmentHeader')
      : (isEn
        ? "Task(s) reassigned and explanatory email sent. Applicant warned of file closure if no action is taken within 30 days:"
        : "La/les tâches réattribuées et courriel explicatif envoyé. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours:");
  } else {
    header = this.i18n
      ? this.i18n.t('regNotes.compliantExtraNoReassignmentHeader')
      : (isEn
        ? "Applicant warned of file closure if no action is taken within 30 days:"
        : "Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours:");
  }

  return `${header}\n${bulletReasons}`;
}

export function getPforCompliantNoteClean(this: any): string {
  const isEn = this.i18n ? this.i18n.isEn() : false;
  const jobSlots = [
    { index: 1, job: this.getDossierJob(1), failedCe: this.sharedState.dossierJobFailedCe1() },
    { index: 2, job: this.getDossierJob(2), failedCe: this.sharedState.dossierJobFailedCe2() },
    { index: 3, job: this.getDossierJob(3), failedCe: this.sharedState.dossierJobFailedCe3() },
  ].filter((s): s is { index: number; job: JobEntry; failedCe: boolean } => !!s.job);

  let jobsText = isEn ? "trade XXX" : "le métier XXX";
  if (jobSlots.length > 0) {
    const admissibleJobIds: string[] = [];
    for (const slot of jobSlots) {
      if (!slot.failedCe && !this.isJobClosed(slot.job.id)) {
        admissibleJobIds.push(slot.job.id);
      }
    }
    if (admissibleJobIds.length > 0) {
      const label = isEn
        ? (admissibleJobIds.length > 1 ? "trades" : "trade")
        : (admissibleJobIds.length > 1 ? "les métiers" : "le métier");
      jobsText = `${label} ${admissibleJobIds.join(", ")}`;
    } else {
      const allJobIds = jobSlots.map(s => s.job.id);
      const label = isEn
        ? (allJobIds.length > 1 ? "trades" : "trade")
        : (allJobIds.length > 1 ? "les métiers" : "le métier");
      jobsText = `${label} ${allJobIds.join(", ")}`;
    }
  }

  let note = isEn
    ? `Step 1 (Completed) - ROTP CAF 101 email and email containing AP link sent for ${jobsText}, MCC Tag for further processing: -Cpl Plourde (DML) - Sgt Fournier-Tremblay (DSE) - Sgt Larochelle (DQC), Sgt-Recruiter: Cpl Plourde (DML) – Sgt Plante (DRI) – Sgt David (DCI) – Sgt Fournier-Tremblay (DSE) – Sgt Richer (DQC)`
    : `Étape 1 (Terminée) - Courriel FAC101 PFOR et courriel contenant le lien PA envoyés pour ${jobsText}, Tag CCM pour suite du traitement : -Cpl Plourde (DML) - Sgt Fournier-Tremblay (DSE) - Sgt Larochelle (DQC), Sgt-Recruteur : Cpl Plourde (DML) – Sgt Plante (DRI) – Sgt David (DCI) – Sgt Fournier-Tremblay (DSE) – Sgt Richer (DQC)`;

  const extraRejections = this.getRejectionReasonsForCompliantNote();
  if (extraRejections) {
    note += `\n${extraRejections}`;
  }

  return note;
}

export function getBigAceCompliantNoteClean(this: any): string {
  const isEn = this.i18n ? this.i18n.isEn() : false;
  const jobSlots = [
    { index: 1, job: this.getDossierJob(1), failedCe: this.sharedState.dossierJobFailedCe1() },
    { index: 2, job: this.getDossierJob(2), failedCe: this.sharedState.dossierJobFailedCe2() },
    { index: 3, job: this.getDossierJob(3), failedCe: this.sharedState.dossierJobFailedCe3() },
  ].filter((s): s is { index: number; job: JobEntry; failedCe: boolean } => !!s.job);

  let firstLine = "";

  if (jobSlots.length === 0) {
    firstLine = isEn
      ? "Step 1 (In progress) - Big ACE eligible for trades xxx, xxx, xxx."
      : "Étape 1 (En cours) - Big ACE admissible pour les métiers xxx, xxx, xxx.";
  } else {
    const admissibleJobIds: string[] = [];
    const failedCeJobIds: string[] = [];
    const closedJobIds: string[] = [];

    for (const slot of jobSlots) {
      if (slot.failedCe) {
        failedCeJobIds.push(slot.job.id);
      } else if (this.isJobClosed(slot.job.id)) {
        closedJobIds.push(slot.job.id);
      } else {
        admissibleJobIds.push(slot.job.id);
      }
    }

    const parts: string[] = [];

    if (isEn) {
      if (admissibleJobIds.length > 0) {
        const label = admissibleJobIds.length > 1 ? "trades" : "trade";
        parts.push(`Big ACE eligible for ${label} ${admissibleJobIds.join(", ")}.`);
      }

      const hasFailedCe = failedCeJobIds.length > 0;
      const hasClosed = closedJobIds.length > 0;

      if (hasFailedCe && hasClosed) {
        const cePart = failedCeJobIds.length > 1
          ? `trades ${failedCeJobIds.join(", ")} (do not meet EC)`
          : `trade ${failedCeJobIds[0]} (does not meet EC)`;
        const closedPart = closedJobIds.length > 1
          ? `trades ${closedJobIds.join(", ")} (closed)`
          : `trade ${closedJobIds[0]} (closed)`;
        parts.push(`Ineligible for ${cePart} and ${closedPart}, removed from file.`);
      } else if (hasFailedCe) {
        if (failedCeJobIds.length === 1) {
          parts.push(`Ineligible for trade ${failedCeJobIds[0]} because it does not meet EC and was removed from file.`);
        } else {
          parts.push(`Ineligible for trades ${failedCeJobIds.join(", ")} because they do not meet EC and were removed from file.`);
        }
      } else if (hasClosed) {
        if (closedJobIds.length === 1) {
          parts.push(`Ineligible for trade ${closedJobIds[0]} because it is closed and was removed from file.`);
        } else {
          parts.push(`Ineligible for trades ${closedJobIds.join(", ")} because they are closed and were removed from file.`);
        }
      }

      firstLine = `Step 1 (In progress) - ${parts.join(" ")}`;
    } else {
      if (admissibleJobIds.length > 0) {
        const label = admissibleJobIds.length > 1 ? "les métiers" : "le métier";
        parts.push(`Big ACE admissible pour ${label} ${admissibleJobIds.join(", ")}.`);
      }

      const hasFailedCe = failedCeJobIds.length > 0;
      const hasClosed = closedJobIds.length > 0;

      if (hasFailedCe && hasClosed) {
        const cePart = failedCeJobIds.length > 1
          ? `les métiers ${failedCeJobIds.join(", ")} (ne rencontrent pas les CE)`
          : `le métier ${failedCeJobIds[0]} (ne rencontre pas les CE)`;
        const closedPart = closedJobIds.length > 1
          ? `les métiers ${closedJobIds.join(", ")} (fermé)`
          : `le métier ${closedJobIds[0]} (fermé)`;
        parts.push(`Inadmissible pour ${cePart} et ${closedPart}, retirés du dossier.`);
      } else if (hasFailedCe) {
        if (failedCeJobIds.length === 1) {
          parts.push(`Inadmissible pour le métier ${failedCeJobIds[0]} car il ne rencontre pas les CE et a été retiré du dossier.`);
        } else {
          parts.push(`Inadmissible pour les métiers ${failedCeJobIds.join(", ")} car ils ne rencontrent pas les CE et ont été retirés du dossier.`);
        }
      } else if (hasClosed) {
        if (closedJobIds.length === 1) {
          parts.push(`Inadmissible pour le métier ${closedJobIds[0]} car il est fermé et a été retiré du dossier.`);
        } else {
          parts.push(`Inadmissible pour les métiers ${closedJobIds.join(", ")} car ils sont fermés et ont été retirés du dossier.`);
        }
      }

      firstLine = `Étape 1 (En cours) - ${parts.join(" ")}`;
    }
  }

  let note = isEn
    ? `${firstLine} CAF 101 Webinar sent, Schedule your CAF 101 information session task assigned.`
    : `${firstLine} Webinaire CAF 101 envoyé, tâche planifiez votre séance d'information des FAC 101 attribuée.`;

  const extraRejections = this.getRejectionReasonsForCompliantNote();
  if (extraRejections) {
    note += `\n${extraRejections}`;
  }

  return note;
}

export function getBigAceCompliantNote(this: any): string {
  const isEn = this.i18n ? this.i18n.isEn() : false;
  let note = this.sharedState.isPostulantPfor() ? this.getPforCompliantNoteClean() : this.getBigAceCompliantNoteClean();
  if (this.triageMedicalRequis()) {
    note += isEn ? "\n\nMEDICAL - TRIAGE BY MED CHU REQUIRED" : "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
  }
  return note;
}

export function getRejectionAndReminderNoteText(this: any): string {
  const isEn = this.i18n ? this.i18n.isEn() : false;

  if (this.selectedEmailBankTemplate() === "verification_edo_vs_pfor") {
    return this.i18n ? this.i18n.t("regNotes.verificationEdoVsPfor") : (isEn
      ? "EDO VS ROTP program verification email sent to applicant."
      : "Courriel de vérification de programme EDO VS PFOR envoyé au postulant.");
  }
  if (this.selectedEmailBankTemplate() === "inadmissibilite_age_57") {
    return this.i18n ? this.i18n.t("regNotes.inadmissibiliteAge57") : (isEn
      ? "Step 1 (In progress) - Maximum eligibility age exceeded (57 years and older): Ineligible for enrolment in the CAF, email sent, file closure."
      : "Étape 1 (En cours) - Âge maximal d'admissibilité dépassé (57 ans et plus) : Inadmissible pour un enrôlement dans les FAC, courriel envoyé, fermeture du dossier.");
  }
  if (this.selectedEmailBankTemplate() === "inadmissibilite_pr_3ans") {
    return this.i18n ? this.i18n.t("regNotes.inadmissibilitePr3Ans") : (isEn
      ? "Step 1 (In progress) - Permanent resident under 3 years (Ineligible): Ineligibility email sent (IRCC calculator result 3+ years or citizenship required before reapplying), file closure."
      : "Étape 1 (En cours) - Résident permanent de moins de 3 ans (Inadmissible) : Courriel d'inadmissibilité envoyé (résultat du calculateur IRCC +3 ans ou citoyenneté requis avant de repostuler), fermeture du dossier.");
  }
  if (this.selectedEmailBankTemplate() === "inadmissibilite_non_citoyen_ni_pr") {
    return this.i18n ? this.i18n.t("regNotes.inadmissibiliteNonCitoyen") : (isEn
      ? "Step 1 (In progress) - Neither Canadian citizen nor permanent resident (Ineligible): Ineligible for enrolment in the CAF (Canadian citizenship or permanent residency required to reapply), email sent, file closure."
      : "Étape 1 (En cours) - Ni citoyen canadien ni résident permanent (Inadmissible) : Inadmissible pour un enrôlement dans les FAC (citoyenneté canadienne ou résidence permanente requise pour repostuler), courriel envoyé, fermeture du dossier.");
  }
  if (this.selectedEmailBankTemplate() === "inadmissibilite_scolarite") {
    return this.i18n ? this.i18n.t("regNotes.inadmissibiliteScolarite") : (isEn
      ? "Applicant Ineligible for education. File closure and explanatory email sent with possible options to become eligible."
      : "Postulant Inadmissible pour la scolarité. Fermeture de dossier et courriel explicatif envoyé avec les options possible pour devenir admissible.");
  }
  if (this.selectedEmailBankTemplate() === "verification_depot_releves_cmr") {
    return this.i18n ? this.i18n.t("regNotes.verifDepotRelevesCmr") : (isEn
      ? "Step 1 (In progress) - Email verifying transcript upload to the RMC portal, Transcripts task reassigned."
      : "Étape 1 (en cours) - Courriel de vérification de dépôt des relevés de notes dans le portail du CMR, tâche Relevés de notes réattribuées.");
  }

  const closureSuffix = " " + (this.i18n
    ? this.i18n.t("regNotes.closureWarning30Days")
    : (isEn
      ? "Applicant warned of file closure if no action is taken within 30 days."
      : "Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours."));

  if (
    this.forceGeneralReminder() &&
    this.selectedRejectionKeys().size === 0
  ) {
    return (this.i18n
      ? this.i18n.t("regNotes.taskReminderSent")
      : (isEn
        ? "Task reminder email sent to applicant."
        : "Courriel de rappel de tâches envoyé au postulant.")) + closureSuffix;
  }

  const selectedKeys = this.selectedRejectionKeys();
  const taskNotCompletedKeys = this.taskNotCompletedKeys();
  const notes: string[] = [];
  let hasNameMismatch = false;
  let hasNormalReassignment = false;

  for (const task of this.allTasks()) {
    const isVisible = this.visibleTasks().some((vt: Task) => vt.nameFr === task.nameFr);
    const isNotCompleted = taskNotCompletedKeys.has(task.nameFr);
    const hasRejections = task.documents.some(doc => 
      doc.reasons.some(reason => this.isReasonSelected(doc, reason))
    );

    if (!isVisible && !hasRejections && !isNotCompleted) {
      continue;
    }

    if (isNotCompleted) {
      const taskName = this.i18n ? this.i18n.pick(task.nameFr, task.nameEn) : (isEn ? (task.nameEn || task.nameFr) : task.nameFr);
      notes.push(this.i18n ? this.i18n.t('regNotes.taskNotCompleted', { taskName }) : (isEn ? `Task "${taskName}" not completed` : `Tâche "${taskName}" non complétée`));
      hasNormalReassignment = true;
    }
    for (const doc of task.documents) {
      for (const reason of doc.reasons) {
        if (this.isReasonSelected(doc, reason)) {
          notes.push(isEn ? this.i18n.translateReasonLogNote(reason.logNoteFr, reason.id, reason.logNoteEn) : reason.logNoteFr);
          if (reason.id === "emp_nom_parent") {
            hasNameMismatch = true;
          }
          if (!reason.isConfirmation) {
            hasNormalReassignment = true;
          }
        }
      }
    }
  }

  if (notes.length === 0) return "";

  const uniqueNotes = Array.from(new Set(notes));
  const bulletReasons = uniqueNotes.map(n => `- ${n}`).join("\n");

  let header = "";
  if (this.isUnderAge()) {
    header = this.i18n
      ? this.i18n.t("regNotes.taskReassignmentUnderageHeader")
      : (isEn
        ? "Step 1 (In progress) - Task(s) reassigned and explanatory email sent. Applicant warned of file closure if no action is taken within 30 days. Awaiting confirmation of parental consent to proceed with Big ACE:"
        : "Étape 1 (en cours) - La/les tâches réattribuées et courriel explicatif envoyé. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours. En attente de la confirmation du consentement parental pour continuer le Big ACE:");
  } else if (hasNormalReassignment) {
    header = this.i18n
      ? this.i18n.t("regNotes.taskReassignmentHeader")
      : (isEn
        ? "Step 1 (In progress) - Task(s) reassigned and explanatory email sent. Applicant warned of file closure if no action is taken within 30 days:"
        : "Étape 1 (en cours) - La/les tâches réattribuées et courriel explicatif envoyé. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours:");
  } else {
    header = this.i18n
      ? this.i18n.t("regNotes.taskNoReassignmentHeader")
      : (isEn
        ? "Step 1 (In progress) - Applicant warned of file closure if no action is taken within 30 days:"
        : "Étape 1 (en cours) - Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours:");
  }

  return `${header}\n${bulletReasons}`;
}

export function computeGeneratedNote(this: any): string {
  const isEn = this.i18n ? this.i18n.isEn() : false;
  const notes: string[] = [];

  // 0. Premier Contact Note
  if (this.premierContactSubPanelMode() === 'note' && this.selectedTask()?.nameFr === 'Premier contact') {
    const noteLines: string[] = isEn ? [
      `IPTAD : ${this.premierContactNoteIptad()}`,
      `SEAF : ${this.premierContactNoteSeaf()}`,
      `Interview : ${this.premierContactNoteEntrevue()}`,
      `Medical : ${this.premierContactNoteMedical()}`,
      `PSPS : ${this.premierContactNotePsps()}`,
      `Gambit : ${this.premierContactNoteGambit()}`,
      `ANX Q : ${this.premierContactNoteAnxQ()}`
    ] : [
      `IPTAD : ${this.premierContactNoteIptad()}`,
      `SEAF : ${this.premierContactNoteSeaf()}`,
      `Entrevue : ${this.premierContactNoteEntrevue()}`,
      `Médical : ${this.premierContactNoteMedical()}`,
      `PSPS : ${this.premierContactNotePsps()}`,
      `Gambit : ${this.premierContactNoteGambit()}`,
      `ANX Q : ${this.premierContactNoteAnxQ()}`
    ];
    notes.push(noteLines.join('\n'));
  } else if (this.isPremierContactActive()) {
    let msg = isEn
      ? "Initial contact email sent to applicant."
      : "Courriel de premier contact envoyé au postulant.";
    const tasks: string[] = [];
    if (this.premierContactMedical()) tasks.push(isEn ? "Medical" : "Médical");
    if (this.premierContactEntrevue()) tasks.push(isEn ? "Interview" : "Entrevue");
    if (this.premierContactGambit()) tasks.push("Gambit");
    if (this.premierContactPsps()) tasks.push("PSPS");
    if (this.premierContactSelfie()) tasks.push("Selfie");
    if (this.premierContactIptad()) tasks.push("IPTAD");
    if (this.premierContactSeaf()) tasks.push("SEAF");

    if (tasks.length > 0) {
      const tasksStr = tasks.length > 1 
        ? tasks.slice(0, -1).join(', ') + (isEn ? ' and ' : ' et ') + tasks[tasks.length - 1] 
        : tasks[0];
      
      if (isEn) {
        msg += ` ${tasksStr} assigned.`;
      } else {
        const attrib = tasks.length > 1 
          ? 'attribués' 
          : (tasks[0] === 'Entrevue' ? 'attribuée' : 'attribué');
        msg += ` ${tasksStr} ${attrib}.`;
      }
    }
    notes.push(msg);
  }

  // 0.5. Avis de fermeture Note
  if (this.isAvisFermetureActive()) {
    notes.push(isEn ? `closure notice email:\n\n${this.getAvisFermetureEmailPlain()}` : `courriel d'avis de fermeture :\n\n${this.getAvisFermetureEmailPlain()}`);
  }

  // 0.6. Annexe Q Note
  if (this.isAnnexeQActive()) {
    notes.push(isEn
      ? `Annex Q ready to do\nPSPS documents inserted into CFRIM\nEmail sent to MCC`
      : `Annexe Q prête à faire\nDocuments PSPS insérés dans CFRIM\nCourriel au CCM envoyé`
    );
  }

  // 1. Medical Evaluation Note
  if (this.isMedicalEvaluationActive()) {
    const medInfo = this.getMedicalPartsInfo();
    if (medInfo) {
      if (isEn) {
        if (this.evaluationMedicaleType() === 'Dossier OTA') {
          notes.push(`Appointment for medical evaluation - ${medInfo.labelEn} directly booked at Montreal Recruiting Centre (OTA Dossier). Informational email sent to applicant to view details in their portal.`);
        } else {
          notes.push(`Task "Medical evaluation - ${medInfo.labelEn}" assigned to applicant in their portal. Explanatory email sent to select a time slot at assigned recruiting centre.`);
        }
      } else {
        if (this.evaluationMedicaleType() === 'Dossier OTA') {
          notes.push(`Rendez-vous pour l'évaluation médicale - ${medInfo.labelFr} directement fixé au centre de recrutement de Montréal (Dossier OTA). Courriel d'information envoyé au postulant pour consultation des détails dans son portail.`);
        } else {
          notes.push(`Tâche « Évaluation médicale - ${medInfo.labelFr} » attribuée au postulant dans son portail. Courriel explicatif envoyé pour la sélection d'une plage horaire au centre de recrutement attitré.`);
        }
      }
    }
  }

  // 2. Offre normale Note
  if (this.offreNormaleChecked()) {
    notes.push(this.getOfferFormattedNote());
  }

  // 3. Offre études subventionnées Note
  if (this.offreEtudesSubventionneesChecked()) {
    notes.push(this.getOfferFormattedNote());
  }

  // 3.5 Rappel cérémonie d'assermentation Note
  if (this.rappelCeremonieChecked()) {
    notes.push(this.i18n
      ? this.i18n.t('regNotes.rappelCeremonie', { date: this.rappelCeremonieDate() || '____' })
      : (isEn
        ? `Reminder email sent for swearing-in ceremony on ${this.rappelCeremonieDate() || '____'}.`
        : `Transmission d'un courriel de rappel pour la cérémonie d'assermentation du ${this.rappelCeremonieDate() || '____'}.`
      )
    );
  }

  // 3.55 Vérification dépôt des relevés de notes portail CMR (Volet Recruteur)
  if (this.selectedEmailBankTemplate() === 'verification_depot_releves_cmr') {
    let note = this.i18n
      ? this.i18n.t('regNotes.verifDepotRelevesCmr')
      : (isEn
        ? "Step 1 (In progress) - Email verifying transcript upload to the RMC portal, Transcripts task reassigned."
        : "Étape 1 (en cours) - Courriel de vérification de dépôt des relevés de notes dans le portail du CMR, tâche Relevés de notes réattribuées.");
    if (this.triageMedicalRequis()) {
      note += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return note;
  }

  // 3.6 Tentative communication pour offre Note (Volet GD)
  if (this.selectedEmailBankTemplate() === 'tentative_offre_gd') {
    let tentativeNote = this.i18n
      ? this.i18n.t('regNotes.tentativeOffreGd')
      : (isEn
        ? "Communication attempt made for the offer, email sent to applicant asking to call their FM back"
        : "Tentative de communication effectuer pour l'offre, courriel envoyé au postulant lui demandant de rappeler son GD");
    if (this.triageMedicalRequis()) {
      tentativeNote += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return tentativeNote;
  }

  // 3.7 Vérification Dossier Cadet Note (Volet GD)
  if (this.selectedEmailBankTemplate() === 'verification_dossier_cadet') {
    let cadetNote = this.i18n
      ? this.i18n.t('regNotes.cadetFileVerification')
      : (isEn
        ? "Cadet file verification email sent to MDN.CJRURSCEstJ1RH-CJRRCSUEasternJ1HR.DND@forces.gc.ca."
        : "Courriel de vérification de dossier cadet envoyé à MDN.CJRURSCEstJ1RH-CJRRCSUEasternJ1HR.DND@forces.gc.ca.");
    if (this.triageMedicalRequis()) {
      cadetNote += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return cadetNote;
  }

  // 3.8 Bris de bail et entreposage Note (Volet GD)
  if (this.selectedEmailBankTemplate() === 'bris_bail_entreposage') {
    let brisNote = this.i18n
      ? this.i18n.t('regNotes.brisBailEntreposage')
      : (isEn
        ? "Transmission of required information and documents regarding lease cancellation and storage."
        : "Transmission des informations et documents requis concernant le bris de bail et l'entreposage.");
    if (this.triageMedicalRequis()) {
      brisNote += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return brisNote;
  }

  // 3.9 Demande NAV/TAN & Claims X - CSPN partie 1 Note (Volet GD)
  if (this.selectedEmailBankTemplate() === 'demande_nav_tan') {
    let navTanNote = this.i18n
      ? this.i18n.t('regNotes.demandeNavTan')
      : (isEn
        ? "Request for NAV/TAN number and Claims X account creation sent to CRFCQcReclamations@forces.gc.ca for CSPN part 1."
        : "Demande de numéro de NAV/TAN et création de compte claims X envoyée à CRFCQcReclamations@forces.gc.ca pour CSPN partie 1.");
    if (this.triageMedicalRequis()) {
      navTanNote += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return navTanNote;
  }

  // 3.10 Demande d'autorisation pour un CSPN Note (Volet GD)
  if (this.selectedEmailBankTemplate() === 'demande_autorisation_cspn') {
    let cspnNote = this.i18n
      ? this.i18n.t('regNotes.demandeAutorisationCspn')
      : (isEn
        ? "Authorization request for a CSPN sent."
        : "Demande d’autorisation pour un CSPN envoyée.");
    if (this.triageMedicalRequis()) {
      cspnNote += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return cspnNote;
  }

  // 3.11 Documents requis - Conjoint(e) de fait Note (Volet GD)
  if (this.selectedEmailBankTemplate() === 'documents_conjoint_de_fait') {
    let cdfNote = this.i18n
      ? this.i18n.t('regNotes.documentsConjointDeFait')
      : (isEn
        ? "Request email for common-law partner documentation sent to applicant."
        : "Courriel de demande de documents pour statut de conjoint(e) de fait envoyé au postulant.");
    if (this.triageMedicalRequis()) {
      cdfNote += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return cdfNote;
  }

  // 3.12 Demande SDPM pour conjoint militaire Note (Volet GD)
  if (this.selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire') {
    let sdpmNote = this.i18n
      ? this.i18n.t('regNotes.demandeSdpmConjointMilitaire')
      : (isEn
        ? "MPRR request for military spouse sent to CRFCQcAdmin@forces.gc.ca."
        : "Demande de SDPM/MPRR pour conjoint militaire envoyée à CRFCQcAdmin@forces.gc.ca.");
    if (this.triageMedicalRequis()) {
      sdpmNote += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return sdpmNote;
  }

  // 3.13 Test ESOM / Confirmation Note (Volet GD)
  if (this.selectedEmailBankTemplate() === 'test_esom_confirmation') {
    const center = this.getTestEsomCenter();
    let esomNote = this.i18n
      ? this.i18n.t('regNotes.testEsomConfirmation', { city: center.city })
      : (isEn
        ? `ESOM test convocation email sent to candidate (${center.city}).`
        : `Courriel de convocation au test ESOM envoyé au candidat (${center.city}).`);
    if (this.triageMedicalRequis()) {
      esomNote += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return esomNote;
  }

  // 3.14 Inaptitude médicale OMR (Volet GD)
  if (this.selectedEmailBankTemplate() === 'inapte_medical_omr') {
    let note = getInapteMedicalNote.call(this);
    if (this.triageMedicalRequis()) {
      note += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
    }
    return note;
  }

  // 4. All tasks compliant Note
  if (this.allTasksCompliant()) {
    notes.push(this.sharedState.isPostulantPfor() ? this.getPforCompliantNoteClean() : this.getBigAceCompliantNoteClean());
  } else {
    // 5. Rejection / Incomplete tasks / Reminder Note
    const rejectionNoteText = this.getRejectionAndReminderNoteText();
    if (rejectionNoteText) {
      notes.push(rejectionNoteText);
    }
  }

  if (notes.length === 0) return "";

  let finalNote = notes.join("\n\n");

  if (this.triageMedicalRequis()) {
    finalNote += "\n\n" + (this.i18n ? this.i18n.t('regNotes.medTriageRequired') : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
  }

  return finalNote;
}
