import { JobEntry } from "../../services/jobs-data";
import { Task, DocumentItem, RejectionReason } from "../../services/recruitment-data.service";
import {
  getInapteMedicalEmailPlain,
  getInapteMedicalEmailHtml
} from "./gd-inapte-medical-email.generator";
import { PORTAL_CANDIDATE_URL } from "../data/app-links.data";

export function getRejectionPlainBodyFr(this: any): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0 && !this.forceGeneralReminder()) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || this.taskNotCompletedKeys().has(task.nameFr)) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    let emailFr = "";

    if (normalTasks.size > 0) {
      emailFr += `Nous avons procédé à l'évaluation de vos documents. Bien que votre dossier progresse, certains éléments ne sont pas conformes et nécessitent des corrections de votre part pour nous permettre de poursuivre le traitement.\n\nLes tâches suivantes vous ont été réattribuées :`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameFr = task.nameFr;
        emailFr += `\n\n• ${taskNameFr}`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
          emailFr += `\n    ◦ Vous n'avez pas complété cette tâche sur votre portail.`;
          emailFr += `\n      → Veuillez vous connecter à votre portail et la compléter.`;
        }
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelFr);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} et ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' et ' + labels[labels.length - 1];
          }
          
          emailFr += `\n    ◦ ${doc.nameFr} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              emailFr += `\n      → ${this.cleanInstructionForText(item.reason.instructionFr, '        ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n      🔗 ${this.cleanInstructionForText(item.reason.linkFr, '        ')}`;
            }
          }
        }
      }
      emailFr += `\n\nEn raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées.\n\nRendez-vous sur votre portail pour les compléter : ${PORTAL_CANDIDATE_URL}`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        emailFr += `\n\nDe plus, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :`;
      } else {
        emailFr += `Afin de poursuivre le traitement de votre dossier, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :`;
      }
      for (const [task, items] of confirmationTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelFr);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} et ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' et ' + labels[labels.length - 1];
          }
          
          emailFr += `\n\n• ${doc.nameFr} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              emailFr += `\n  → ${this.cleanInstructionForText(item.reason.instructionFr, '    ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n  🔗 ${this.cleanInstructionForText(item.reason.linkFr, '  ')}`;
            }
          }
        }
      }
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsFr = this.getDossierJobsSummaryTextFr();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        emailFr += `\n\n--------------------------------------------------`;
      }

      if (generalAddDocs.length > 0) {
        emailFr += `\n\nAfin de compléter l'évaluation de votre demande d'emploi, nous aurons besoin de document(s) supplémentaire(s) :`;
        for (const { doc, docItems } of generalAddDocs) {
          emailFr += `\n\n• ${doc.nameFr}`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              emailFr += `\n  → ${this.cleanInstructionForText(item.reason.instructionFr, '    ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n  🔗 ${this.cleanInstructionForText(item.reason.linkFr, '  ')}`;
            }
          }
        }
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapFr = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, true);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapFr.set(job, reqs);
        }
      }

      if (jobDocsMapFr.size > 0) {
        const selectedJobsFr = Array.from(jobDocsMapFr.keys()).map(j => `${j.title} (${j.id})`).join(', ');
        const jobsHeaderTextFr = selectedJobsFr || dossierJobsFr;
        emailFr += `\n\nAfin d'évaluer votre dossier pour le(s) métier(s) sélectionné(s) (${jobsHeaderTextFr}), vous devez nous fournir le(s) document(s) supplémentaire(s) suivant(s) ou une(des) preuve(s) que vous remplissez la(les) condition(s) suivante(s) en réponse directe à ce courriel :`;
        for (const [job, reqs] of jobDocsMapFr.entries()) {
          emailFr += `\n\n• Pour ${job.id} - ${job.title} : ` + reqs.join(", ");
        }
      }
    }

    if (this.forceGeneralReminder()) {
      emailFr += `\n\nVeuillez également vous assurer de compléter les autres tâches manquantes sur votre portail.`;
    }

    emailFr += `\n\nSi vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.`;

    return emailFr;
  }

  // Helper to extract plain text rejection body for English
export function getRejectionPlainBodyEn(this: any): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0 && !this.forceGeneralReminder()) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || this.taskNotCompletedKeys().has(task.nameFr)) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    let emailEn = "";

    if (normalTasks.size > 0) {
      emailEn += `We have evaluated your documents. While your application is progressing, some items are not compliant and require corrections on your part to allow us to continue processing.\n\nThe following tasks have been reassigned to you:`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameEn = task.nameEn;
        emailEn += `\n\n• ${taskNameEn}`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
          emailEn += `\n    ◦ You have not completed this task on your portal.`;
          emailEn += `\n      → Please log in to your portal and complete it.`;
        }
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelEn);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }
          
          emailEn += `\n    ◦ ${doc.nameEn} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              emailEn += `\n      → ${this.cleanInstructionForText(item.reason.instructionEn, '        ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n      🔗 ${this.cleanInstructionForText(item.reason.linkEn, '        ')}`;
            }
          }
        }
      }
      emailEn += `\n\nDue to the high volume of applications, we must prioritize the processing of files where all tasks are complete.\n\nPlease log in to your portal to complete them: ${PORTAL_CANDIDATE_URL}`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        emailEn += `\n\nFurthermore, we require confirmation from you. Please reply directly to this email with the requested information for the following item:`;
      } else {
        emailEn += `To continue processing your application, we require confirmation from you. Please reply directly to this email with the requested information for the following item:`;
      }
      for (const [task, items] of confirmationTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelEn);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }
          
          emailEn += `\n\n• ${doc.nameEn} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              emailEn += `\n  → ${this.cleanInstructionForText(item.reason.instructionEn, '    ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n  🔗 ${this.cleanInstructionForText(item.reason.linkEn, '  ')}`;
            }
          }
        }
      }
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsEn = this.getDossierJobsSummaryTextEn();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        emailEn += `\n\n--------------------------------------------------`;
      }

      if (generalAddDocs.length > 0) {
        emailEn += `\n\nIn order to complete the evaluation of your employment application, we will need additional document(s):`;
        for (const { doc, docItems } of generalAddDocs) {
          emailEn += `\n\n• ${doc.nameEn}`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              emailEn += `\n  → ${this.cleanInstructionForText(item.reason.instructionEn, '    ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n  🔗 ${this.cleanInstructionForText(item.reason.linkEn, '  ')}`;
            }
          }
        }
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapEn = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, false);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapEn.set(job, reqs);
        }
      }

      if (jobDocsMapEn.size > 0) {
        const selectedJobsEn = Array.from(jobDocsMapEn.keys()).map(j => `${j.titleEn || j.title} (${j.id})`).join(', ');
        const jobsHeaderTextEn = selectedJobsEn || dossierJobsEn;
        emailEn += `\n\nIn order to evaluate your application for the selected occupation(s) (${jobsHeaderTextEn}), you must provide us with the following additional document(s) or proof that you meet the following condition(s) in direct reply to this email:`;
        for (const [job, reqs] of jobDocsMapEn.entries()) {
          emailEn += `\n\n• For ${job.id} - ${job.titleEn || job.title} : ` + reqs.join(", ");
        }
      }
    }

    if (this.forceGeneralReminder()) {
      emailEn += `\n\nPlease also ensure that you complete the other missing tasks on your portal.`;
    }

    emailEn += `\n\nIf you take no action, your file will be automatically deactivated after 30 days.`;

    return emailEn;
  }

  // Consolidated Plain Text Email
export function getCombinedPlainString(this: any, ignoreMerge: boolean = false): string {
    if (!ignoreMerge && this.sharedState.includeLinkedEmail() && this.sharedState.reoMergedEmailPlain()) {
      return this.sharedState.reoMergedEmailPlain();
    }

    if (this.selectedEmailBankTemplate() === "demande_nav_tan") {
      return this.getDemandeNavTanEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "demande_autorisation_cspn") {
      return this.getDemandeAutorisationCspnEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "documents_conjoint_de_fait") {
      return this.getDocumentsConjointDeFaitEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "demande_sdpm_conjoint_militaire") {
      return this.getDemandeSdpmConjointMilitaireEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "test_esom_confirmation") {
      return this.getTestEsomConfirmationEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "tentative_offre_gd") {
      return this.getTentativeOffreGdEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "verification_dossier_cadet") {
      return this.getVerificationCadetEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "bris_bail_entreposage") {
      return this.getBrisBailEntreposageEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "inapte_medical_omr") {
      return getInapteMedicalEmailPlain.call(this);
    }

    const scenario = this.activeEmailScenario();
    if (scenario && (
      scenario.id === "verification_edo_vs_pfor" ||
      scenario.id === "inadmissibilite_age_57" ||
      scenario.id === "inadmissibilite_pr_3ans" ||
      scenario.id === "verification_depot_releves_cmr" ||
      (!this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections())
    )) {
      return this.sharedState.getCustomizedScenarioText(scenario.bodyText);
    }

    // Standalone full emails if selected alone
    if (this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getPremierContactEmailPlain();
    }

    if (this.isAvisFermetureActive() && !this.isPremierContactActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getAvisFermetureEmailPlain();
    }

    if (this.isAnnexeQActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getAnnexeQEmailPlain();
    }

    if (this.offreNormaleChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.hasSelectedRejections()) {
      return this.getOffreNormaleEmailPlain();
    }

    if (this.offreEtudesSubventionneesChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.hasSelectedRejections() && !this.rappelCeremonieChecked()) {
      return this.getOffreEtudesSubventionneesEmailPlain();
    }

    if (this.rappelCeremonieChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getRappelCeremonieEmailPlain();
    }

    if (this.allTasksCompliant() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.rappelCeremonieChecked()) {
      return this.sharedState.isPostulantPfor() ? this.getCompliantPforEmailPlain() : this.getCompliantEmailPlain();
    }

    const frBlocks: string[] = [];
    const enBlocks: string[] = [];

    // 0. Premier contact
    if (this.isPremierContactActive()) {
      frBlocks.push(this.getPremierContactSectionPlainFr());
      enBlocks.push(this.getPremierContactSectionPlainEn());
    }

    // 0.5 Avis de fermeture
    if (this.isAvisFermetureActive()) {
      frBlocks.push(this.getAvisFermetureSectionPlainFr());
      enBlocks.push(this.getAvisFermetureSectionPlainEn());
    }

    // 0.6 Annexe Q
    if (this.isAnnexeQActive()) {
      frBlocks.push(this.getAnnexeQSectionPlainFr());
      enBlocks.push(this.getAnnexeQSectionPlainEn());
    }

    // 1. Medical Evaluation
    if (this.isMedicalEvaluationActive()) {
      const medInfo = this.getMedicalPartsInfo();
      if (medInfo) {
        frBlocks.push(this.getMedicalSectionPlainFr(medInfo.labelFr));
        enBlocks.push(this.getMedicalSectionPlainEn(medInfo.labelEn));
      }
    }

    // 2. Offre normale
    if (this.offreNormaleChecked()) {
      frBlocks.push(this.getOffreNormaleEmailPlain());
    }

    // 3. Offre études subventionnées
    if (this.offreEtudesSubventionneesChecked()) {
      frBlocks.push(this.getOffreEtudesSubventionneesEmailPlain());
    }

    // 3.5 Rappel cérémonie d'assermentation
    if (this.rappelCeremonieChecked()) {
      frBlocks.push(this.getRappelCeremonieSectionPlainFr());
      enBlocks.push(this.getRappelCeremonieSectionPlainEn());
    }

    // 4. All tasks compliant
    if (this.allTasksCompliant()) {
      frBlocks.push(this.sharedState.isPostulantPfor() ? this.getCompliantPforEmailPlain() : this.getCompliantEmailPlain());
    }

    // 5. Rejection / Incomplete tasks / Reminder
    if (!this.allTasksCompliant() && (this.hasSelectedRejections() || (this.forceGeneralReminder() && this.selectedRejectionKeys().size === 0))) {
      const rejFr = this.getRejectionPlainBodyFr();
      const rejEn = this.getRejectionPlainBodyEn();
      if (rejFr) frBlocks.push(rejFr);
      if (rejEn) enBlocks.push(rejEn);
    }

    if (frBlocks.length === 0) return "";

    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    let plain = '';
    if (isEn) {
      plain = `Un message en français suivra.\n\nHello,\n\n`;
      plain += enBlocks.join("\n\n--------------------------------------------------\n\n");
      plain += `\n\n` + this.getSignatureEn();

      plain += `\n\n______________________________________________________________________________\n\nBonjour,\n\n`;
      plain += frBlocks.join("\n\n--------------------------------------------------\n\n");
      plain += `\n\n` + this.getSignatureFr();
    } else {
      plain = `English message will follow.\n\nBonjour,\n\n`;
      plain += frBlocks.join("\n\n--------------------------------------------------\n\n");
      plain += `\n\n` + this.getSignatureFr();

      plain += `\n\n______________________________________________________________________________\n\nHello,\n\n`;
      plain += enBlocks.join("\n\n--------------------------------------------------\n\n");
      plain += `\n\n` + this.getSignatureEn();
    }

    return plain;
  }

export function getCombinedRawHtmlString(this: any, ignoreMerge: boolean = false): string {
    if (!ignoreMerge && this.sharedState.includeLinkedEmail() && this.sharedState.reoMergedEmailHtml()) {
      return this.sharedState.reoMergedEmailHtml();
    }

    if (this.selectedEmailBankTemplate() === "demande_nav_tan") {
      return this.getDemandeNavTanEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "demande_autorisation_cspn") {
      return this.getDemandeAutorisationCspnEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "documents_conjoint_de_fait") {
      return this.getDocumentsConjointDeFaitEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "demande_sdpm_conjoint_militaire") {
      return this.getDemandeSdpmConjointMilitaireEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "test_esom_confirmation") {
      return this.getTestEsomConfirmationEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "tentative_offre_gd") {
      return this.getTentativeOffreGdEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "verification_dossier_cadet") {
      return this.getVerificationCadetEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "bris_bail_entreposage") {
      return this.getBrisBailEntreposageEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "inapte_medical_omr") {
      return getInapteMedicalEmailHtml.call(this);
    }

    const scenario = this.activeEmailScenario();
    if (scenario && (
      scenario.id === "verification_edo_vs_pfor" ||
      scenario.id === "inadmissibilite_age_57" ||
      scenario.id === "inadmissibilite_pr_3ans" ||
      scenario.id === "verification_depot_releves_cmr" ||
      (!this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections())
    )) {
      return this.sharedState.getCustomizedScenarioHtml(scenario.bodyHtml);
    }

    // Standalone full emails if selected alone
    if (this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getPremierContactEmailHtml();
    }

    if (this.isAvisFermetureActive() && !this.isPremierContactActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getAvisFermetureEmailHtml();
    }

    if (this.isAnnexeQActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getAnnexeQEmailHtml();
    }

    if (this.offreNormaleChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.hasSelectedRejections()) {
      return this.getOffreNormaleEmailHtml();
    }

    if (this.offreEtudesSubventionneesChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.hasSelectedRejections() && !this.rappelCeremonieChecked()) {
      return this.getOffreEtudesSubventionneesEmailHtml();
    }

    if (this.rappelCeremonieChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getRappelCeremonieEmailHtml();
    }

    if (this.allTasksCompliant() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.rappelCeremonieChecked()) {
      return this.sharedState.isPostulantPfor() ? this.getCompliantPforEmailHtml() : this.getCompliantEmailHtml();
    }

    const frSections: string[] = [];
    const enSections: string[] = [];

    // 0. Premier contact
    if (this.isPremierContactActive()) {
      frSections.push(this.getPremierContactSectionHtmlFr());
      enSections.push(this.getPremierContactSectionHtmlEn());
    }

    // 0.5 Avis de fermeture
    if (this.isAvisFermetureActive()) {
      frSections.push(this.getAvisFermetureSectionHtmlFr());
      enSections.push(this.getAvisFermetureSectionHtmlEn());
    }

    // 0.6 Annexe Q
    if (this.isAnnexeQActive()) {
      frSections.push(this.getAnnexeQSectionHtmlFr());
      enSections.push(this.getAnnexeQSectionHtmlEn());
    }

    // 1. Medical Evaluation
    if (this.isMedicalEvaluationActive()) {
      const medInfo = this.getMedicalPartsInfo();
      if (medInfo) {
        frSections.push(this.getMedicalSectionHtmlFr(medInfo.labelFr));
        enSections.push(this.getMedicalSectionHtmlEn(medInfo.labelEn));
      }
    }

    // 2. Offre normale
    if (this.offreNormaleChecked()) {
      frSections.push(this.getOffreNormaleEmailHtml());
    }

    // 3. Offre études subventionnées
    if (this.offreEtudesSubventionneesChecked()) {
      frSections.push(this.getOffreEtudesSubventionneesEmailHtml());
    }

    // 3.5 Rappel cérémonie d'assermentation
    if (this.rappelCeremonieChecked()) {
      frSections.push(this.getRappelCeremonieSectionHtmlFr());
      enSections.push(this.getRappelCeremonieSectionHtmlEn());
    }

    // 4. All tasks compliant
    if (this.allTasksCompliant()) {
      frSections.push(this.sharedState.isPostulantPfor() ? this.getCompliantPforEmailHtml() : this.getCompliantEmailHtml());
    }

    // 5. Rejections / Incomplete tasks / Reminder
    if (!this.allTasksCompliant() && (this.hasSelectedRejections() || (this.forceGeneralReminder() && this.selectedRejectionKeys().size === 0))) {
      const rejFr = this.getRejectionHtmlFr();
      const rejEn = this.getRejectionHtmlEn();
      if (rejFr) frSections.push(rejFr);
      if (rejEn) enSections.push(rejEn);
    }

    if (frSections.length === 0) return "";

    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    if (isEn) {
      html += `<p><span style="background-color: yellow;">Un message en français suivra.</span></p><p>Hello,</p>`;
      html += enSections.join('<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 20px 0;">');
      html += `<p>` + this.getHtmlSignatureEn() + `</p>`;

      html += `<hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><p>Bonjour,</p>`;
      html += frSections.join('<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 20px 0;">');
      html += `<p>` + this.getHtmlSignatureFr() + `</p>`;
    } else {
      html += `<p><span style="background-color: yellow;">English message will follow.</span></p><p>Bonjour,</p>`;
      html += frSections.join('<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 20px 0;">');
      html += `<p>` + this.getHtmlSignatureFr() + `</p>`;

      html += `<hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><p>Hello,</p>`;
      html += enSections.join('<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 20px 0;">');
      html += `<p>` + this.getHtmlSignatureEn() + `</p>`;
    }

    html += `</div>`;
    return html;
  }

export function getRejectionHtmlFr(this: any): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0 && !this.forceGeneralReminder()) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || this.taskNotCompletedKeys().has(task.nameFr)) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    let html = "";

    if (normalTasks.size > 0) {
      html += `<p>Nous avons procédé à l'évaluation de vos documents. Bien que votre dossier progresse, certains éléments ne sont pas conformes et nécessitent des corrections de votre part pour nous permettre de poursuivre le traitement.</p>`;
      html += `<p>Les tâches suivantes vous ont été réattribuées :</p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameFr = task.nameFr;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskNameFr}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="color: #FF0000; font-weight: bold;">Vous n'avez pas complété cette tâche sur votre portail.</span>`;
          html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; Veuillez vous connecter à votre portail et la compléter.</div>`;
          html += `</li>`;
        }
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelFr);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} et ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' et ' + labels[labels.length - 1];
          }
          
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameFr} : <span style="color: #FF0000;">${labelsStr}</span></strong></span>`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkFr}</div>`;
            }
          }
          html += `</li>`;
        }
        html += `</ul></li>`;
      }
      html += `</ul>`;
      html += `<p>En raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées.</p>`;
      html += `<p>Rendez-vous sur votre portail pour les compléter : <a href="${PORTAL_CANDIDATE_URL}">${PORTAL_CANDIDATE_URL}</a></p>`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        html += `<p>De plus, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :</p>`;
      } else {
        html += `<p>Afin de poursuivre le traitement de votre dossier, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :</p>`;
      }
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of confirmationTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelFr);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} et ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' et ' + labels[labels.length - 1];
          }
          
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameFr} : <span style="color: #FF0000;">${labelsStr}</span></strong></span>`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkFr}</div>`;
            }
          }
          html += `</li>`;
        }
      }
      html += `</ul>`;
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsFr = this.getDossierJobsSummaryTextFr();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        html += `<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 15px 0;">`;
      }

      if (generalAddDocs.length > 0) {
        html += `<p>Afin de compléter l'évaluation de votre demande d'emploi, nous aurons besoin de document(s) supplémentaire(s) :</p>`;
        html += `<ul style="margin-top: 0; padding-left: 20px;">`;
        for (const { doc, docItems } of generalAddDocs) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameFr}</strong></span>`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkFr}</div>`;
            }
          }
          html += `</li>`;
        }
        html += `</ul>`;
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapFr = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, true);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapFr.set(job, reqs);
        }
      }

      if (jobDocsMapFr.size > 0) {
        const selectedJobsFr = Array.from(jobDocsMapFr.keys()).map(j => `${j.title} (${j.id})`).join(', ');
        const jobsHeaderTextFr = selectedJobsFr || dossierJobsFr;
        html += `<p style="margin-top: 15px; font-weight: bold; color: #000000;">Afin d'évaluer votre dossier pour le(s) métier(s) sélectionné(s) (${jobsHeaderTextFr}), vous devez nous fournir le(s) document(s) supplémentaire(s) suivant(s) ou une(des) preuve(s) que vous remplissez la(les) condition(s) suivante(s) en réponse directe à ce courriel :</p>`;
        html += `<ul style="margin-top: 5px; list-style-type: disc; padding-left: 20px;">`;
        for (const [job, reqs] of jobDocsMapFr.entries()) {
          html += `<li style="margin-bottom: 8px;"><strong>Pour ${job.id} - ${job.title} :</strong> <span style="background-color: yellow; padding: 0 2px;">` + reqs.join(", ") + `</span></li>`;
        }
        html += `</ul>`;
      }
    }

    if (this.forceGeneralReminder()) {
      html += `<p>Veuillez également vous assurer de compléter les autres tâches manquantes sur votre portail.</p>`;
    }

    html += `<p><strong>Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.</strong></p>`;

    return `<!-- START_TASK_BODY_FR -->${html}<!-- END_TASK_BODY_FR -->`;
  }

export function getRejectionHtmlEn(this: any): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0 && !this.forceGeneralReminder()) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || this.taskNotCompletedKeys().has(task.nameFr)) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    let html = "";

    if (normalTasks.size > 0) {
      html += `<p>We have evaluated your documents. While your application is progressing, some items are not compliant and require corrections on your part to allow us to continue processing.</p>`;
      html += `<p>The following tasks have been reassigned to you:</p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameEn = task.nameEn;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskNameEn}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="color: #FF0000; font-weight: bold;">You have not completed this task on your portal.</span>`;
          html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; Please log in to your portal and complete it.</div>`;
          html += `</li>`;
        }
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelEn);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }
          
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameEn} : <span style="color: #FF0000;">${labelsStr}</span></strong></span>`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkEn}</div>`;
            }
          }
          html += `</li>`;
        }
        html += `</ul></li>`;
      }
      html += `</ul>`;
      html += `<p>Due to the high volume of applications, we must prioritize the processing of files where all tasks are complete.</p>`;
      html += `<p>Please log in to your portal to complete them: <a href="${PORTAL_CANDIDATE_URL}">${PORTAL_CANDIDATE_URL}</a></p>`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        html += `<p>Furthermore, we require confirmation from you. Please reply directly to this email with the requested information for the following item:</p>`;
      } else {
        html += `<p>To continue processing your application, we require confirmation from you. Please reply directly to this email with the requested information for the following item:</p>`;
      }
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of confirmationTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelEn);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }
          
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameEn} : <span style="color: #FF0000;">${labelsStr}</span></strong></span>`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkEn}</div>`;
            }
          }
          html += `</li>`;
        }
      }
      html += `</ul>`;
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsEn = this.getDossierJobsSummaryTextEn();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        html += `<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 15px 0;">`;
      }

      if (generalAddDocs.length > 0) {
        html += `<p>In order to complete the evaluation of your employment application, we will need additional document(s):</p>`;
        html += `<ul style="margin-top: 0; padding-left: 20px;">`;
        for (const { doc, docItems } of generalAddDocs) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameEn}</strong></span>`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkEn}</div>`;
            }
          }
          html += `</li>`;
        }
        html += `</ul>`;
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapEn = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, false);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapEn.set(job, reqs);
        }
      }

      if (jobDocsMapEn.size > 0) {
        const selectedJobsEn = Array.from(jobDocsMapEn.keys()).map(j => `${j.titleEn || j.title} (${j.id})`).join(', ');
        const jobsHeaderTextEn = selectedJobsEn || dossierJobsEn;
        html += `<p style="margin-top: 15px; font-weight: bold; color: #000000;">In order to evaluate your application for the selected occupation(s) (${jobsHeaderTextEn}), you must provide us with the following additional document(s) or proof that you meet the following condition(s) in direct reply to this email:</p>`;
        html += `<ul style="margin-top: 5px; list-style-type: disc; padding-left: 20px;">`;
        for (const [job, reqs] of jobDocsMapEn.entries()) {
          html += `<li style="margin-bottom: 8px;"><strong>For ${job.id} - ${job.titleEn || job.title} :</strong> <span style="background-color: yellow; padding: 0 2px;">` + reqs.join(", ") + `</span></li>`;
        }
        html += `</ul>`;
      }
    }

    if (this.forceGeneralReminder()) {
      html += `<p>Please also ensure that you complete the other missing tasks on your portal.</p>`;
    }

    html += `<p><strong>If you take no action, your file will be automatically deactivated after 30 days.</strong></p>`;

    return `<!-- START_TASK_BODY_EN -->${html}<!-- END_TASK_BODY_EN -->`;
  }

  // Helper to get raw HTML string for clipboard and display
  

  // Combined Action: Copy HTML to clipboard AND Open Empty Outlook Window
export async function exportToOutlook(this: any) {
    // Validation des champs requis pour l'inaptitude médicale OMR
    if (this.selectedEmailBankTemplate() === 'inapte_medical_omr') {
      const gender = this.inapteMedicalGender?.();
      const name = this.inapteMedicalName?.()?.trim();
      const alpha = this.inapteMedicalAlpha?.()?.trim();
      if (!gender || !name || !alpha) {
        this.inapteMedicalAttemptedExport?.set(true);
        return;
      }
      this.inapteMedicalAttemptedExport?.set(false);
    }

    // 1. Copy to Clipboard
    try {
      // Logic for Scenario vs Default
      const scenario = this.activeEmailScenario();

      let htmlContent = this.getCombinedRawHtmlString();
      let textContent = this.getCombinedPlainString();
      const subject = this.getEmailSubject();

      // Modern Clipboard API supporting HTML
      if (navigator.clipboard && navigator.clipboard.write) {
        const typeHtml = "text/html";
        const typeText = "text/plain";

        const blobHtml = new Blob([htmlContent], { type: typeHtml });
        const blobText = new Blob([textContent], { type: typeText });

        const data = [
          new ClipboardItem({
            [typeHtml]: blobHtml,
            [typeText]: blobText,
          }),
        ];

        await navigator.clipboard.write(data);
      } else {
        // Fallback
        await navigator.clipboard.writeText(textContent);
      }

      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 3000);

      // 2. Open Outlook
      if (this.selectedEmailBankTemplate() === 'verification_dossier_cadet') {
        const mailtoLink = `mailto:MDN.CJRURSCEstJ1RH-CJRRCSUEasternJ1HR.DND@forces.gc.ca?subject=${encodeURIComponent('(Vérification Dossier Cadet)')}`;
        window.location.href = mailtoLink;
        return;
      }
      if (this.selectedEmailBankTemplate() === 'demande_nav_tan') {
        const mailtoLink = `mailto:CRFCQcReclamations@forces.gc.ca?subject=${encodeURIComponent(subject)}`;
        window.location.href = mailtoLink;
        return;
      }
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoLink;
    } catch (err) {
      console.error("Failed to copy", err);
    }
  }

export async function exportToOutlookCaf101(this: any) {
    try {
      const htmlContent = this.getCompliantPforEmailHtml();
      const textContent = this.getCompliantPforEmailPlain();
      const subject = this.i18n?.t
        ? this.i18n.t('subject.pfor_caf101')
        : "(1/2) Collège militaire canadien - Séance d'information virtuelle/Canadian Military College - Virtual information session";

      if (navigator.clipboard && navigator.clipboard.write) {
        const typeHtml = "text/html";
        const typeText = "text/plain";

        const blobHtml = new Blob([htmlContent], { type: typeHtml });
        const blobText = new Blob([textContent], { type: typeText });

        const data = [
          new ClipboardItem({
            [typeHtml]: blobHtml,
            [typeText]: blobText,
          }),
        ];

        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(textContent);
      }

      this.copiedEmailCaf101.set(true);
      setTimeout(() => this.copiedEmailCaf101.set(false), 3000);

      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoLink;
    } catch (err) {
      console.error("Failed to copy CAF 101 email", err);
    }
  }

export async function exportToOutlookLienPa(this: any) {
    try {
      const htmlContent = this.getCompliantPforLienPaEmailHtml();
      const textContent = this.getCompliantPforLienPaEmailPlain();
      const subject = this.i18n?.t
        ? this.i18n.t('subject.pfor_lien_pa')
        : "(2/2) Collège militaire canadien - Portail d'admission/Canadian Military College - Admission Portal";

      if (navigator.clipboard && navigator.clipboard.write) {
        const typeHtml = "text/html";
        const typeText = "text/plain";

        const blobHtml = new Blob([htmlContent], { type: typeHtml });
        const blobText = new Blob([textContent], { type: typeText });

        const data = [
          new ClipboardItem({
            [typeHtml]: blobHtml,
            [typeText]: blobText,
          }),
        ];

        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(textContent);
      }

      this.copiedEmailLienPa.set(true);
      setTimeout(() => this.copiedEmailLienPa.set(false), 3000);

      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoLink;
    } catch (err) {
      console.error("Failed to copy Lien PA email", err);
    }
  }

export async function copyNote(this: any) {
    try {
      await navigator.clipboard.writeText(this.displayedNote());
      this.copiedNote.set(true);
      setTimeout(() => this.copiedNote.set(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  }
