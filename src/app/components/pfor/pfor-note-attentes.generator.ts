import { JobEntry } from "../../../services/jobs-data";
import { CMR_JOB_DOMAINS } from "../../data/reorientation-criteria.data";
import { generatePforNotYetEvaluatedNote } from "./pfor-not-yet-evaluated.generator";

export function generatePforNoteRegistry(this: any): string {
    const isEn = this.i18n ? this.i18n.isEn() : false;

    if (this.age() !== null && this.age()! >= 57) {
      return this.i18n ? this.i18n.t("regNotes.inadmissibiliteAge57") : (isEn
        ? "Step 1 (In progress) - Maximum eligibility age exceeded (57 years and older): Ineligible for enrolment in the CAF, email sent, file closure."
        : "Étape 1 (En cours) - Âge maximal d'admissibilité dépassé (57 ans et plus) : Inadmissible pour un enrôlement dans les FAC, courriel envoyé, fermeture du dossier.");
    }

    if (this.citizenship() === "PR < 3 years") {
      return this.i18n ? this.i18n.t("regNotes.inadmissibilitePr3Ans") : (isEn
        ? "Step 1 (In progress) - Permanent resident under 3 years (Ineligible): Ineligibility email sent (IRCC calculator result 3+ years or citizenship required before reapplying), file closure."
        : "Étape 1 (En cours) - Résident permanent de moins de 3 ans (Inadmissible) : Courriel d'inadmissibilité envoyé (résultat du calculateur IRCC +3 ans ou citoyenneté requis avant de repostuler), fermeture du dossier.");
    }

    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean);

    let reoNote = "";

    if (this.cmrNotYetEvaluated && this.cmrNotYetEvaluated()) {
      reoNote = generatePforNotYetEvaluatedNote.call(this);
    } else if (this.isAttentesMode()) {
      let admissionPart = "";
      if (this.isCandidateTooOld()) {
        admissionPart = isEn ? "ROTP - Age limit exceeded" : "PFOR - Âge limite dépassé";
      } else if (this.pforType() === "cmr") {
        const cmrDomains = isEn ? this.getCmrAdmittedDomainsAttentesEn() : this.getCmrAdmittedDomainsNoteFr();
        if (cmrDomains) {
          admissionPart = isEn ? `Admitted RMC (${cmrDomains})` : `Admis CMR (${cmrDomains})`;
        } else {
          admissionPart = isEn ? "ROTP RMC" : "PFOR CMR";
        }
      } else {
        admissionPart = isEn ? "Civil ROTP" : "PFOR Civil";
      }

      const jobParts: string[] = [];
      for (const id of dossierIds) {
        if (id === "00003") {
          jobParts.push(isEn ? "00003 - No trade" : "00003 - Sans métier");
        } else {
          const sit = this.getJobAttentesSituation(id);
          const sitLabel = isEn
            ? (sit === 1 ? "Intake closed" : "Processing closed")
            : (sit === 1 ? "Intake fermé" : "Traitement fermé");
          jobParts.push(`${id} - ${sitLabel}`);
        }
      }
      const jobsFormatted =
        jobParts.length > 0 ? jobParts.join(", ") : (isEn ? "no trade selected" : "aucun métier sélectionné");

      reoNote = this.i18n
        ? this.i18n.t("regNotes.pforAttentesPrefix", { admissionPart, jobs: jobsFormatted })
        : (isEn
          ? `Step 1 (In progress) - ${admissionPart} - Expectations management email sent, ${jobsFormatted}. Ongoing processing, potential trade change based on candidate's choice.`
          : `Étape 1 (En cours) - ${admissionPart} - Courriel de gestion des attentes envoyé, ${jobsFormatted}. Traitement continu, possible changement de métier selon choix du postulant.`);
    } else {
      let metierRaison = "";

      if (dossierIds.length === 0) {
        metierRaison = isEn ? "no trade selected on file" : "aucun métier sélectionné au dossier";
      } else {
        const parts: string[] = [];
        const choices = this.analyzedDossierChoices();
        for (const c of choices) {
          if (c.job.id === "00003") {
            parts.push(`00003 : ${isEn ? "No trade" : "Sans métier"}`);
            continue;
          }
          const reasonTxt = c.isEligible
            ? (isEn ? "Eligible" : "Admissible")
            : (isEn ? (c.reasonEn || c.reasonFr) : c.reasonFr);
          parts.push(`(${c.job.id} : ${reasonTxt})`);
        }
        metierRaison = parts.join(", ");
      }

      const isPRAdmissible = this.citizenship() === "PR > 3 years";
      const prDemandText = isPRAdmissible
        ? (isEn ? " and transcripts from country of origin requested" : " et relevés de notes du pays d'origine demandés")
        : "";

      let reoPrefix = isEn ? "Reorientation required as" : "Réorientation nécessaire car";
      if (this.isCandidateTooOld()) {
        reoPrefix = isEn
          ? "ROTP - Age limit exceeded - Reorientation required as"
          : "PFOR - Âge limite dépassé - Réorientation nécessaire car";
      } else if (this.pforType() === "cmr") {
        if (this.cmrRefused()) {
          reoPrefix = this.i18n
            ? this.i18n.t("regNotes.pforCmrRefusalReoPrefix")
            : (isEn ? "RMC admission refusal - Reorientation required" : "Refus d'admission CMR - Réorientation nécessaire");
        } else if (this.cmrMinCriteriaNotMet()) {
          reoPrefix = this.i18n
            ? this.i18n.t("regNotes.pforCmrMinCriteriaReoPrefix")
            : (isEn ? "ROTP minimum criteria not met (Missing high school diploma) - Reorientation required" : "Critère minimal PFOR non rencontré (DES manquant) - Réorientation nécessaire");
        } else {
          const cmrDomains = isEn ? this.getCmrAdmittedDomainsAttentesEn() : this.getCmrAdmittedDomainsNoteFr();
          if (cmrDomains) {
            reoPrefix = isEn
              ? `Admitted RMC (${cmrDomains}) - Reorientation required as`
              : `Admis CMR (${cmrDomains}) - Réorientation nécessaire car`;
          } else {
            reoPrefix = isEn ? "ROTP RMC - Reorientation required as" : "PFOR CMR - Réorientation nécessaire car";
          }
        }
      } else {
        reoPrefix = isEn ? "Civil ROTP - Reorientation required as" : "PFOR Civil - Réorientation nécessaire car";
      }

      if (!this.isCandidateTooOld() && this.pforType() === "cmr" && (this.cmrRefused() || this.cmrMinCriteriaNotMet())) {
        reoNote = isEn
          ? `Step 1 (In progress) - ${reoPrefix}, reorientation email sent${prDemandText}, awaiting candidate's response. Applicant warned of file closure if no action is taken within 30 days.`
          : `Étape 1 (En cours) - ${reoPrefix}, courriel de réo envoyé${prDemandText}, en attente de la réponse du postulant. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.`;
      } else {
        reoNote = isEn
          ? `Step 1 (In progress) - ${reoPrefix}: ${metierRaison}, reorientation email sent${prDemandText}, awaiting candidate's response. Applicant warned of file closure if no action is taken within 30 days.`
          : `Étape 1 (En cours) - ${reoPrefix} : ${metierRaison}, courriel de réo envoyé${prDemandText}, en attente de la réponse du postulant. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.`;
      }
    }

    if ((this.sharedState.includeLinkedEmail() || (this.sharedState.hasReassignedTasks() && this.showResultsPanel())) && this.sharedState.taskNote()) {
      const taskNoteRaw = this.sharedState.taskNote();

      let medicalSuffix = "";
      const medicalMarkerFr = "MÉDICAL - TRIAGE PAR MED CHU REQUIS";
      const medicalMarkerEn = "MEDICAL - TRIAGE BY MED CHU REQUIRED";
      if (taskNoteRaw.toUpperCase().includes(medicalMarkerFr) || taskNoteRaw.toUpperCase().includes(medicalMarkerEn)) {
        medicalSuffix = "\n\n" + (this.i18n ? this.i18n.t("regNotes.medTriageRequired") : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
      }

      let taskClean = taskNoteRaw.trim();
      const medIdxFr = taskClean.toUpperCase().indexOf(medicalMarkerFr);
      if (medIdxFr !== -1) {
        taskClean = taskClean.substring(0, medIdxFr).trim();
      }
      const medIdxEn = taskClean.toUpperCase().indexOf(medicalMarkerEn);
      if (medIdxEn !== -1) {
        taskClean = taskClean.substring(0, medIdxEn).trim();
      }

      const prefixRegex = /^(Étape 1 \((En cours|en cours)\)|Step 1 \((In progress|in progress)\))\s*-\s*/i;
      const suffixStringFr = this.isAttentesMode()
        ? "Traitement continu, possible changement de métier selon choix du postulant."
        : "Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.";
      const suffixStringEn = this.isAttentesMode()
        ? "Ongoing processing, potential trade change based on candidate's choice."
        : "Applicant warned of file closure if no action is taken within 30 days.";

      let reoClean = reoNote.replace(prefixRegex, "").trim();
      for (const sfx of [suffixStringFr, suffixStringEn]) {
        const sfxIdx = reoClean.toLowerCase().indexOf(sfx.toLowerCase());
        if (sfxIdx !== -1) {
          reoClean = reoClean.substring(0, sfxIdx).trim();
        }
      }
      if (reoClean.endsWith(".")) {
        reoClean = reoClean.slice(0, -1).trim();
      }
      const reoPart = reoClean ? `${reoClean}.` : "";

      if (taskClean && reoPart) {
        return `${taskClean}\n\n${reoPart}${medicalSuffix}`;
      }
      return `${taskClean || reoNote}${medicalSuffix}`;
    }

    return reoNote;
  }

export function buildPforGestionDesAttentesEmail(this: any, isHtml: boolean): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const dossierChoices = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean);
    const realDossierIds = dossierChoices.filter((id) => id !== "00003");

    if (!this.showResultsPanel() && realDossierIds.length === 0) {
      return isHtml
        ? '<p class="text-slate-500 italic">Veuillez renseigner les critères d\'admission du postulant PFOR pour générer le courriel de gestion des attentes.</p>'
        : "Veuillez renseigner les critères d'admission du postulant PFOR pour générer le courriel de gestion des attentes.";
    }

    const situation = this.attentesSituation();
    const cmrAdmittedFr = this.getCmrAdmittedDomainsAttentesFr();
    const cmrAdmittedEn = this.getCmrAdmittedDomainsAttentesEn();

    const rawHtml = this.sharedState.taskEmailHtmlFr();
    const rawTxt = this.sharedState.taskEmailFr();
    const hasTasks =
      !!rawHtml &&
      this.sharedState.hasReassignedTasks() &&
      rawHtml.includes("Bonjour,");
    const mergeTasks = (this.sharedState.includeLinkedEmail() || (this.sharedState.hasReassignedTasks() && this.showResultsPanel())) && hasTasks;

    const allEligibleJobs = this.eligiblePforJobs().filter(
      (j) => !dossierChoices.includes(j.id),
    );
    let listOFF: JobEntry[] = [];
    let listClosedOFF: JobEntry[] = [];

    if (this.ignoreSip()) {
      for (const j of allEligibleJobs) {
        if (this.jobService.isPforJobClosed(j.id, this.currentSipPhase())) {
          listClosedOFF.push(j);
        } else {
          listOFF.push(j);
        }
      }
    } else {
      listOFF = allEligibleJobs;
    }

    if (isHtml) {
      let h = "";

      // FRENCH SECTION
      h += '<p class="mt-4">Bonjour,</p>\n';
      if (this.isCandidateTooOld()) {
        h += '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR)</strong>, nous constatons que vous devez faire l\'objet d\'une réorientation. En effet, vous dépassez l\'âge maximal d\'admissibilité pour ce programme.</p>\n';
      } else if (this.pforType() === "cmr" && cmrAdmittedFr) {
        h += `<p class="mt-4">Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), <strong>vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${cmrAdmittedFr} !</strong> Nous tenons à vous féliciter chaleureusement pour cette admission.</p>\n`;
      } else {
        h += `<p class="mt-4">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR${this.pforType() === 'civil' ? ' - Universités civiles' : ''})</strong>, nous constatons que vous devez faire l'objet d'une réorientation.</p>\n`;
      }

      if (mergeTasks) {
        let taskPartHtml = "";
        if (rawHtml.includes("<!-- START_TASK_BODY_FR -->")) {
          const frParts = rawHtml.split("<!-- START_TASK_BODY_FR -->");
          if (frParts.length > 1) {
            const frBodyPart = frParts[1].split("<!-- END_TASK_BODY_FR -->");
            if (frBodyPart.length > 0) {
              taskPartHtml = frBodyPart[0].trim();
            }
          }
        } else {
          const frParts = rawHtml.split("<p>Bonjour,</p>");
          if (frParts.length > 1) {
            const frBodyPart = frParts[1].split("<p>En raison du volume");
            if (frBodyPart.length > 0 && frBodyPart[0].trim().length > 0) {
              taskPartHtml = frBodyPart[0].trim();
            }
          }
        }

        if (taskPartHtml) {
          h +=
            '<div class="mt-4 p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-sm">\n';
          h +=
            '<p class="font-bold text-black border-b border-amber-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">TÂCHES ET COMMUNICATIONS À CORRIGER SUR VOTRE PORTAIL :</p>\n';
          h += taskPartHtml + "\n";
          h += "</div>\n";
        }
      }

      if (this.pforType() === "cmr" && cmrAdmittedFr) {
        h +=
          '<p class="mt-4">Toutefois, suite à l\'analyse de vos choix de métiers actuels, nous constatons qu\'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :</p>\n';
      } else {
        h +=
          '<p class="mt-4">Voici le statut des métiers actuellement inscrits à votre dossier :</p>\n';
      }

      h += '<ul class="list-disc pl-5 mt-2 mb-4 space-y-2">\n';
      for (const id of realDossierIds) {
        const link = this.getJobLinkMarkup(id, true, true);
        const name = `${id} - ${link}`;
        const reasons = this.getJobGestionDesAttentesReasonsFr(id);
        let reasonMarkup = "";
        if (reasons.length > 0) {
          reasonMarkup = `\n    <ul class="list-disc pl-5 mt-1 text-sm text-slate-600">\n      <li>${reasons.join("</li>\n      <li>")}</li>\n    </ul>`;
        }
        h += `  <li class="mt-1"><strong>${name}</strong>${reasonMarkup}</li>\n`;
      }
      h += '</ul>\n';

      h +=
        '<p class="mt-4 font-semibold text-slate-800">Voici les options qui s\'offrent à vous:</p>\n';
      h += '<ul class="list-disc pl-5 mt-2 mb-4 space-y-2">\n';
      h +=
        '  <li><strong>Conserver le métier actuel.</strong> Vous pouvez garder ce choix de métier, des positions pourraient de nouveau être disponibles dans les prochaines semaines, mais rien n’est garantie.</li>\n';
      h +=
        '  <li><strong>Choisir un autre métier.</strong> Vous devez réorienter votre candidature vers un choix de métier pour lequel vous êtes admissible afin de poursuivre le processus d\'enrôlement. Il faut comprendre que la situation évolue rapidement et que les métiers de la liste suivante peuvent également se voir être fermés dans les prochains jours/semaines.</li>\n';
      h += '</ul>\n';

      h +=
        '<p class="mt-4 font-semibold text-slate-800">Veuillez consulter la liste des métiers pour lesquels vous rencontrez les critères d\'admissibilité :</p>\n';

      h += '<div class="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
      h += '  <p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">Officiers:</p>\n';
      if (listOFF.length === 0 && listClosedOFF.length === 0) {
        h += '  <p class="mt-2 text-slate-700 italic">Aucun métier PFOR ouvert correspondant n\'est disponible actuellement pour la sélection effectuée.</p>\n';
      } else {
        h += '  <ul class="list-disc pl-5 space-y-1">\n';
        for (const j of listOFF) {
          const link = this.getJobLinkMarkup(j.id, true, true);
          h += `    <li><strong>${j.id} - ${link}</strong></li>\n`;
        }
        for (const j of listClosedOFF) {
          const link = this.getJobLinkMarkup(j.id, true, true);
          h += `    <li class="text-red-700" style="color: #b91c1c;"><strong>${j.id} - ${link}</strong> <span style="background-color: #fecaca; color: #991b1b; font-size: 11px; padding: 1px 4px; border-radius: 3px; font-weight: bold;">(FERMÉ)</span></li>\n`;
        }
        h += '  </ul>\n';
      }
      h += '</div>\n';

      h +=
        '<p class="mt-4">Nous vous remercions pour votre intérêt envers les Forces armées canadiennes. Veuillez nous faire part de votre décision en répondant directement à ce courriel afin de poursuivre ou de mettre à jour votre dossier.</p>\n';

      h += '<p>' + this.sharedState.getHtmlSignatureFr() + '</p>\n';
      const frHtml = h;

      // ENGLISH SECTION
      let hEn = "";
      hEn += '<p class="mt-4">Hello,</p>\n';
      if (this.isCandidateTooOld()) {
        hEn += '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP)</strong>, we note that you require a reorientation. Indeed, you exceed the maximum eligibility age for this program.</p>\n';
      } else if (this.pforType() === "cmr" && cmrAdmittedEn) {
        hEn += `<p class="mt-4">We are pleased to inform you that, following the assessment of your transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), <strong>you have been admitted to RMC in the following field(s) of study: ${cmrAdmittedEn}!</strong> We would like to warmly congratulate you on your admission.</p>\n`;
      } else {
        hEn += `<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP${this.pforType() === 'civil' ? ' - Civilian Universities' : ''})</strong>, we note that you require a reorientation.</p>\n`;
      }

      if (mergeTasks) {
        const rawHtmlEn = this.sharedState.taskEmailHtmlEn();
        let taskPartHtmlEn = "";
        if (rawHtmlEn.includes("<!-- START_TASK_BODY_EN -->")) {
          const enParts = rawHtmlEn.split("<!-- START_TASK_BODY_EN -->");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("<!-- END_TASK_BODY_EN -->");
            if (enBodyPart.length > 0) {
              taskPartHtmlEn = enBodyPart[0].trim();
            }
          }
        } else {
          const enParts = rawHtmlEn.split("<p>Hello,</p>");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("<p>Due to a high volume");
            if (enBodyPart.length > 0 && enBodyPart[0].trim().length > 0) {
              taskPartHtmlEn = enBodyPart[0].trim();
            }
          }
        }

        if (taskPartHtmlEn) {
          hEn +=
            '<div class="mt-4 p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-sm">\n';
          hEn +=
            '<p class="font-bold text-black border-b border-amber-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">TASKS AND COMMUNICATIONS TO CORRECT ON YOUR PORTAL:</p>\n';
          hEn += taskPartHtmlEn + "\n";
          hEn += "</div>\n";
        }
      }

      if (this.pforType() === "cmr" && cmrAdmittedEn) {
        hEn +=
          '<p class="mt-4">However, following the review of your current occupation choices, a reorientation is required.<br>Here is the current status of the occupations in your file:</p>\n';
      } else {
        hEn +=
          '<p class="mt-4">Here is the status of the occupations currently in your file:</p>\n';
      }

      hEn += '<ul class="list-disc pl-5 mt-2 mb-4 space-y-2">\n';
      for (const id of realDossierIds) {
        const link = this.getJobLinkMarkup(id, false, true);
        const name = `${id} - ${link}`;
        const reasons = this.getJobGestionDesAttentesReasonsEn(id);
        let reasonMarkup = "";
        if (reasons.length > 0) {
          reasonMarkup = `\n    <ul class="list-disc pl-5 mt-1 text-sm text-slate-600">\n      <li>${reasons.join("</li>\n      <li>")}</li>\n    </ul>`;
        }
        hEn += `  <li class="mt-1"><strong>${name}</strong>${reasonMarkup}</li>\n`;
      }
      hEn += '</ul>\n';

      hEn +=
        '<p class="mt-4 font-semibold text-slate-800">Here are the options available to you:</p>\n';
      hEn += '<ul class="list-disc pl-5 mt-2 mb-4 space-y-2">\n';
      hEn +=
        '  <li><strong>Maintain Your Current Occupation Choice.</strong> You may keep your current occupation choice, as positions could become available again in the coming weeks. However, there is no guarantee that vacancies will reopen.</li>\n';
      hEn +=
        '  <li><strong>Choose Another Occupation.</strong> You must redirect your application to an occupation for which you are eligible in order to continue the enrolment process. Please note that the situation changes rapidly, and occupations listed below may also close within the coming days or weeks.</li>\n';
      hEn += '</ul>\n';

      hEn += '<div class="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
      hEn += '  <p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2 uppercase">ELIGIBLE OCCUPATIONS:</p>\n';
      hEn += '  <p class="font-bold text-slate-800 mt-2 mb-1">Officers:</p>\n';
      if (listOFF.length === 0 && listClosedOFF.length === 0) {
        hEn += '  <p class="mt-2 text-slate-700 italic">No matching open ROTP occupations are currently available for the selected options.</p>\n';
      } else {
        hEn += '  <ul class="list-disc pl-5 space-y-1">\n';
        for (const j of listOFF) {
          const link = this.getJobLinkMarkup(j.id, false, true);
          hEn += `    <li><strong>${j.id} - ${link}</strong></li>\n`;
        }
        for (const j of listClosedOFF) {
          const link = this.getJobLinkMarkup(j.id, false, true);
          hEn += `    <li class="text-red-700" style="color: #b91c1c;"><strong>${j.id} - ${link}</strong> <span style="background-color: #fecaca; color: #991b1b; font-size: 11px; padding: 1px 4px; border-radius: 3px; font-weight: bold;">(CLOSED)</span></li>\n`;
        }
        hEn += '  </ul>\n';
      }
      hEn += '</div>\n';

      hEn +=
        '<p class="mt-4">We thank you for your interest in the Canadian Armed Forces. Please let us know your decision by replying directly to this email so that we can update your file.</p>\n';

      hEn +=
        '<p class="mt-4">Furthermore, please note that these occupations are available as of today; however, they may no longer be available in the coming days.</p>\n';

      hEn += '<p>' + this.sharedState.getHtmlSignatureEn() + '</p>\n';

      const enHtml = hEn;

      if (isEn) {
        return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">Un message en français suivra.</span></p>\n' +
          enHtml +
          '<hr class="my-6 border-slate-200" />\n' +
          frHtml;
      }
      return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">English message will follow.</span></p>\n' +
        frHtml +
        '<hr class="my-6 border-slate-200" />\n' +
        enHtml;
    } else {
      // PLAIN TEXT VERSION
      let t = "";

      // FRENCH PLAIN
      t += "Bonjour,\n\n";
      if (this.isCandidateTooOld()) {
        t += "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR), nous constatons que vous devez faire l'objet d'une réorientation. En effet, vous dépassez l'âge maximal d'admissibilité pour ce programme.\n\n";
      } else if (this.pforType() === "cmr" && cmrAdmittedFr) {
        t += `Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${cmrAdmittedFr} ! Nous tenons à vous féliciter chaleureusement pour cette admission.\n\n`;
      } else {
        t += `Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR${this.pforType() === 'civil' ? ' - Universités civiles' : ''}), nous constatons que vous devez faire l'objet d'une réorientation.\n\n`;
      }

      if (mergeTasks && rawTxt) {
        let taskPartTxt = "";
        if (rawTxt.includes("--- DÉBUT DES TÂCHES ---")) {
          const parts = rawTxt.split("--- DÉBUT DES TÂCHES ---");
          if (parts.length > 1) {
            const body = parts[1].split("--- FIN DES TÂCHES ---");
            if (body.length > 0) {
              taskPartTxt = body[0].trim();
            }
          }
        }
        if (taskPartTxt) {
          t += "TÂCHES ET COMMUNICATIONS À CORRIGER SUR VOTRE PORTAIL :\n";
          t += "----------------------------------------------------------------------\n";
          t += taskPartTxt + "\n\n";
        }
      }

      if (this.pforType() === "cmr" && cmrAdmittedFr) {
        t +=
          "Toutefois, suite à l'analyse de vos choix de métiers actuels, nous constatons qu'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :\n";
      } else {
        t +=
          "Voici le statut des métiers actuellement inscrits à votre dossier :\n";
      }
      for (const id of realDossierIds) {
        const link = this.getJobLinkMarkup(id, true, false);
        const name = `${id} - ${link}`;
        const reasons = this.getJobGestionDesAttentesReasonsFr(id);
        let reasonTxt = "";
        if (reasons.length > 0) {
          reasonTxt = `\n    - ${reasons.join("\n    - ")}`;
        }
        t += `- ${name}${reasonTxt}\n`;
      }
      t += "\n";

      t += "Voici les options qui s'offrent à vous:\n";
      t +=
        "• Conserver le métier actuel. Vous pouvez garder ce choix de métier, des positions pourraient de nouveau être disponibles dans les prochaines semaines, mais rien n’est garantie.\n";
      t +=
        "• Choisir un autre métier. Vous devez réorienter votre candidature vers un choix de métier pour lequel vous êtes admissible afin de poursuivre le processus d'enrôlement. Il faut comprendre que la situation évolue rapidement et que les métiers de la liste suivante peuvent également se voir être fermés dans les prochains jours/semaines.\n\n";

      t +=
        "Veuillez consulter la liste des métiers pour lesquels vous rencontrez les critères d'admissibilité :\n";
      t += "Officiers:\n";
      if (listOFF.length === 0 && listClosedOFF.length === 0) {
        t +=
          "Aucun métier PFOR ouvert correspondant n'est disponible actuellement pour la sélection effectuée.\n\n";
      } else {
        for (const j of listOFF) {
          const link = this.getJobLinkMarkup(j.id, true, false);
          t += `• ${j.id} - ${link}\n`;
        }
        for (const j of listClosedOFF) {
          const link = this.getJobLinkMarkup(j.id, true, false);
          t += `• ${j.id} - ${link} (FERMÉ)\n`;
        }
        t += "\n";
      }

      t +=
        "Nous vous remercions pour votre intérêt envers les Forces armées canadiennes. Veuillez nous faire part de votre décision en répondant directement à ce courriel afin de poursuivre ou de mettre à jour votre dossier.\n\n";

      t += this.sharedState.getSignatureFr() + "\n";
      const frPlain = t.trim();

      // ENGLISH PLAIN
      let tEn = "";
      tEn += "Hello,\n\n";
      if (this.isCandidateTooOld()) {
        tEn += "Following the analysis of your application file for the Regular Officer Training Plan (ROTP), we note that you require a reorientation. Indeed, you exceed the maximum eligibility age for this program.\n\n";
      } else if (this.pforType() === "cmr" && cmrAdmittedEn) {
        tEn += `We are pleased to inform you that, following the assessment of your transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), you have been admitted to RMC in the following field(s) of study: ${cmrAdmittedEn}! We would like to warmly congratulate you on your admission.\n\n`;
      } else {
        tEn += `Following the analysis of your application file for the Regular Officer Training Plan (ROTP${this.pforType() === 'civil' ? ' - Civilian Universities' : ''}), we note that you require a reorientation.\n\n`;
      }

      if (mergeTasks) {
        const rawTxtEn = this.sharedState.taskEmailEn();
        let taskPartTxtEn = "";
        if (rawTxtEn.includes("--- START OF TASKS ---")) {
          const parts = rawTxtEn.split("--- START OF TASKS ---");
          if (parts.length > 1) {
            const body = parts[1].split("--- END OF TASKS ---");
            if (body.length > 0) {
              taskPartTxtEn = body[0].trim();
            }
          }
        }
        if (taskPartTxtEn) {
          tEn += "TASKS AND COMMUNICATIONS TO CORRECT ON YOUR PORTAL:\n";
          tEn += "----------------------------------------------------------------------\n";
          tEn += taskPartTxtEn + "\n\n";
        }
      }

      if (this.pforType() === "cmr" && cmrAdmittedEn) {
        tEn +=
          "However, following the review of your current occupation choices, a reorientation is required.\nHere is the current status of the occupations in your file:\n";
      } else {
        tEn +=
          "Here is the status of the occupations in your file:\n";
      }
      for (const id of realDossierIds) {
        const link = this.getJobLinkMarkup(id, false, false);
        const name = `${id} - ${link}`;
        const reasons = this.getJobGestionDesAttentesReasonsEn(id);
        let reasonTxt = "";
        if (reasons.length > 0) {
          reasonTxt = `\n    - ${reasons.join("\n    - ")}`;
        }
        tEn += `- ${name}${reasonTxt}\n`;
      }
      tEn += "\n";

      tEn += "Here are the options available to you:\n";
      tEn +=
        "• Maintain Your Current Occupation Choice. You may keep your current occupation choice, as positions could become available again in the coming weeks. However, there is no guarantee that vacancies will reopen.\n";
      tEn +=
        "• Choose Another Occupation. You must redirect your application to an occupation for which you are eligible in order to continue the enrolment process. Please note that the situation changes rapidly, and occupations listed below may also close within the coming days or weeks.\n\n";

      tEn += "ELIGIBLE OCCUPATIONS:\n";
      tEn += "Officers:\n";
      if (listOFF.length === 0 && listClosedOFF.length === 0) {
        tEn +=
          "No matching open ROTP occupations are currently available for the selected options.\n\n";
      } else {
        for (const j of listOFF) {
          const link = this.getJobLinkMarkup(j.id, false, false);
          tEn += `• ${j.id} - ${link}\n`;
        }
        for (const j of listClosedOFF) {
          const link = this.getJobLinkMarkup(j.id, false, false);
          tEn += `• ${j.id} - ${link} (CLOSED)\n`;
        }
        tEn += "\n";
      }

      tEn +=
        "We thank you for your interest in the Canadian Armed Forces. Please let us know your decision by replying directly to this email so that we can update your file.\n\n";

      tEn +=
        "Furthermore, please note that these occupations are available as of today; however, they may no longer be available in the coming days.\n\n";

      tEn += this.sharedState.getSignatureEn() + "\n";

      const enPlain = tEn.trim();

      const divider = "\n\n______________________________________________________________________________\n\n";
      if (isEn) {
        return `Un message en français suivra.\n\n${enPlain}${divider}${frPlain}`;
      }
      return `English message will follow.\n\n${frPlain}${divider}${enPlain}`;
    }
  }
