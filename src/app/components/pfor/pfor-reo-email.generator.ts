import { JobEntry } from "../../../services/jobs-data";
import { CMR_JOB_DOMAINS } from "../../data/reorientation-criteria.data";
import { buildPforNotYetEvaluatedEmail } from "./pfor-not-yet-evaluated.generator";
import { PORTAL_CANDIDATE_URL } from "../../data/app-links.data";

export function buildPforBilingualEmail(this: any, isHtml: boolean): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');

    if (this.age() !== null && this.age()! >= 57) {
      if (isHtml) {
        let frHtml = '<p class="mt-4">Bonjour,</p>\n' +
          '<p class="mt-4">Suite à l’analyse de votre dossier de candidature, nous constatons que vous dépassez l’âge maximal d’admissibilité (56 ans) pour un enrôlement dans les Forces armées canadiennes (FAC). Toute personne ayant 57 ans ou plus est automatiquement inadmissible à un emploie dans les FAC.</p>\n' +
          '<p class="mt-4">Votre dossier sera fermé.</p>\n' +
          '<p class="mt-4">Merci de votre intérêt à joindre les Forces armées canadienne!</p>\n' +
          '<p class="mt-4">' + this.sharedState.getHtmlSignatureFr() + '</p>\n';

        let enHtml = '<p class="mt-4">Hello,</p>\n' +
          '<p class="mt-4">Following the analysis of your application file, we have determined that you exceed the maximum eligibility age (56 years) for enrollment in the Canadian Armed Forces (CAF). Anyone aged 57 or older is automatically ineligible for employment in the CAF.</p>\n' +
          '<p class="mt-4">Your file will be closed.</p>\n' +
          '<p class="mt-4">Thank you for your interest in joining the Canadian Armed Forces!</p>\n' +
          '<p class="mt-4">' + this.sharedState.getHtmlSignatureEn() + '</p>\n';

        const divider = '<p class="my-6 border-t border-slate-300" style="margin-top: 24px; margin-bottom: 24px; border-top: 1px solid #cbd5e1;"></p>\n';

        if (isEn) {
          return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">Un message en français suivra.</span></p>\n' +
            enHtml + divider + frHtml;
        }
        return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">English message will follow.</span></p>\n' +
          frHtml + divider + enHtml;
      } else {
        let frPlain = "Bonjour,\n\n" +
          "Suite à l’analyse de votre dossier de candidature, nous constatons que vous dépassez l’âge maximal d’admissibilité (56 ans) pour un enrôlement dans les Forces armées canadiennes (FAC). Toute personne ayant 57 ans ou plus est automatiquement inadmissible à un emploie dans les FAC.\n\n" +
          "Votre dossier sera fermé.\n\n" +
          "Merci de votre intérêt à joindre les Forces armées canadienne!\n\n" +
          this.sharedState.getSignatureFr();

        let enPlain = "Hello,\n\n" +
          "Following the analysis of your application file, we have determined that you exceed the maximum eligibility age (56 years) for enrollment in the Canadian Armed Forces (CAF). Anyone aged 57 or older is automatically ineligible for employment in the CAF.\n\n" +
          "Your file will be closed.\n\n" +
          "Thank you for your interest in joining the Canadian Armed Forces!\n\n" +
          this.sharedState.getSignatureEn();

        const divider = "\n\n______________________________________________________________________________\n\n";

        if (isEn) {
          return `Un message en français suivra.\n\n${enPlain}${divider}${frPlain}`;
        }
        return `English message will follow.\n\n${frPlain}${divider}${enPlain}`;
      }
    }

    if (this.citizenship() === "PR < 3 years") {
      if (isHtml) {
        let frHtml = '<p class="mt-4">Bonjour,</p>\n' +
          '<p class="mt-4">Suite à l’analyse de votre dossier de candidature, nous constatons que vous êtes présentement inadmissible à un enrôlement dans les Forces armées canadiennes (FAC) sous le statut de résident permanent.</p>\n' +
          '<p class="mt-4">Pour être admissible à un enrôlement dans les FAC à titre de résident permanent, vous devez avoir accumulé au moins trois ans (1 095 jours) de présence physique au Canada.</p>\n' +
          '<p class="mt-4">Pour devenir admissible et pouvoir poser à nouveau votre candidature ou poursuivre votre processus à l\'avenir, vous devez :</p>\n' +
          '<ul class="list-disc pl-5 mt-2 mb-4 text-sm text-slate-700" style="padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">\n' +
          '  <li><strong>Soit obtenir la citoyenneté canadienne ;</strong></li>\n' +
          '  <li><strong>Soit fournir le résultat officiel du calculateur de présence physique d\'Immigration, Réfugiés et Citoyenneté Canada (IRCC)</strong> prouvant que vous avez accumulé plus de trois ans (1 095 jours) sur le territoire canadien.</li>\n' +
          '</ul>\n' +
          '<p class="mt-4">Puisque vous ne remplissez pas cette condition pour le moment, votre dossier de candidature actuel sera fermé. Dès que vous respecterez l\'une de ces conditions, nous vous invitons à déposer une nouvelle candidature.</p>\n' +
          '<p class="mt-4">Nous vous remercions sincèrement de votre intérêt envers les Forces armées canadiennes.</p>\n' +
          '<p class="mt-4">' + this.sharedState.getHtmlSignatureFr() + '</p>\n';

        let enHtml = '<p class="mt-4">Hello,</p>\n' +
          '<p class="mt-4">Following the analysis of your application file, we regret to inform you that you are currently ineligible for enrolment in the Canadian Armed Forces (CAF) under permanent resident status.</p>\n' +
          '<p class="mt-4">To be eligible for enrolment in the CAF as a permanent resident, you must have accumulated at least three years (1,095 days) of physical presence in Canada.</p>\n' +
          '<p class="mt-4">In order to become eligible and be able to reapply or proceed with an application in the future, you must:</p>\n' +
          '<ul class="list-disc pl-5 mt-2 mb-4 text-sm text-slate-700" style="padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">\n' +
          '  <li><strong>Either obtain Canadian citizenship;</strong></li>\n' +
          '  <li><strong>Or provide the official result from the Immigration, Refugees and Citizenship Canada (IRCC) physical presence calculator</strong> proving that you have accumulated more than three years (1,095 days) on Canadian territory.</li>\n' +
          '</ul>\n' +
          '<p class="mt-4">Since you do not meet this condition at this time, your current application file will be closed. As soon as you satisfy one of these requirements, you are welcome to submit a new application.</p>\n' +
          '<p class="mt-4">Thank you for your interest in the Canadian Armed Forces.</p>\n' +
          '<p class="mt-4">' + this.sharedState.getHtmlSignatureEn() + '</p>\n';

        const divider = '<p class="my-6 border-t border-slate-300" style="margin-top: 24px; margin-bottom: 24px; border-top: 1px solid #cbd5e1;"></p>\n';

        if (isEn) {
          return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">Un message en français suivra.</span></p>\n' +
            enHtml + divider + frHtml;
        }
        return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">English message will follow.</span></p>\n' +
          frHtml + divider + enHtml;
      } else {
        let frPlain = "Bonjour,\n\n" +
          "Suite à l’analyse de votre dossier de candidature, nous constatons que vous êtes présentement inadmissible à un enrôlement dans les Forces armées canadiennes (FAC) sous le statut de résident permanent.\n\n" +
          "Pour être admissible à un enrôlement dans les FAC à titre de résident permanent, vous devez avoir accumulé au moins trois ans (1 095 jours) de présence physique au Canada.\n\n" +
          "Pour devenir admissible et pouvoir poser à nouveau votre candidature ou poursuivre votre processus à l'avenir, vous devez :\n" +
          "  - Soit obtenir la citoyenneté canadienne ;\n" +
          "  - Soit fournir le résultat officiel du calculateur de présence physique d'Immigration, Réfugiés et Citoyenneté Canada (IRCC) prouvant que vous avez accumulé plus de trois ans (1 095 jours) sur le territoire canadien.\n\n" +
          "Puisque vous ne remplissez pas cette condition pour le moment, votre dossier de candidature actuel sera fermé. Dès que vous respecterez l'une de ces conditions, nous vous invitons à déposer une nouvelle candidature.\n\n" +
          "Nous vous remercions sincèrement de votre intérêt envers les Forces armées canadiennes.\n\n" +
          this.sharedState.getSignatureFr();

        let enPlain = "Hello,\n\n" +
          "Following the analysis of your application file, we regret to inform you that you are currently ineligible for enrolment in the Canadian Armed Forces (CAF) under permanent resident status.\n\n" +
          "To be eligible for enrolment in the CAF as a permanent resident, you must have accumulated at least three years (1,095 days) of physical presence in Canada.\n\n" +
          "In order to become eligible and be able to reapply or proceed with an application in the future, you must:\n" +
          "  - Either obtain Canadian citizenship;\n" +
          "  - Or provide the official result from the Immigration, Refugees and Citizenship Canada (IRCC) physical presence calculator proving that you have accumulated more than three years (1,095 days) on Canadian territory.\n\n" +
          "Since you do not meet this condition at this time, your current application file will be closed. As soon as you satisfy one of these requirements, you are welcome to submit a new application.\n\n" +
          "Thank you for your interest in the Canadian Armed Forces.\n\n" +
          this.sharedState.getSignatureEn();

        const divider = "\n\n______________________________________________________________________________\n\n";

        if (isEn) {
          return `Un message en français suivra.\n\n${enPlain}${divider}${frPlain}`;
        }
        return `English message will follow.\n\n${frPlain}${divider}${enPlain}`;
      }
    }

    if (this.cmrNotYetEvaluated && this.cmrNotYetEvaluated()) {
      return buildPforNotYetEvaluatedEmail.call(this, isHtml);
    }

    if (this.isAttentesMode()) {
      return this.buildGestionDesAttentesEmail(isHtml);
    }
    if (this.pforType() === "cmr" && (this.cmrRefused() || this.cmrMinCriteriaNotMet())) {
      return this.buildCmrRefusalEmail(isHtml);
    }

    const jobIds = this.eligiblePforJobs().map((j) => j.id);

    if (!this.showResultsPanel() && jobIds.length === 0) {
      return isHtml
        ? '<p class="text-slate-500 italic">Veuillez renseigner les critères d\'admission du postulant PFOR pour générer le courriel de réorientation.</p>'
        : "Veuillez renseigner les critères d'admission du postulant PFOR pour générer le courriel de réorientation.";
    }

    const isPilotEligible = jobIds.includes("00183");
    const isPRAdmissible = this.citizenship() === "PR > 3 years";

    const allEligibleJobs = this.eligiblePforJobs();
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

    const ncmEval = this.eligibleNcmEvaluation();
    const openScolariteOfficerJobs = ncmEval.openOfficerJobs.filter(
      (j) => !listOFF.some((o) => o.id === j.id)
    );
    const closedScolariteOfficerJobs = ncmEval.closedOfficerJobs.filter(
      (j) => !listClosedOFF.some((o) => o.id === j.id)
    );
    const openNcmJobs = ncmEval.openNcmJobs;
    const closedNcmJobs = ncmEval.closedNcmJobs;

    const allOpenOfficerJobs = [...listOFF, ...openScolariteOfficerJobs];
    const allClosedOfficerJobs = [
      ...listClosedOFF,
      ...closedScolariteOfficerJobs,
    ];

    const shouldIncludeNcm =
      this.isCandidateTooOld() ||
      this.hasAgeInadmissibilityInDossier() ||
      this.showScolariteExperiencePanel() ||
      ((openNcmJobs.length > 0 || openScolariteOfficerJobs.length > 0) &&
        listOFF.length === 0);

    const renderHtmlList = (
      jobsList: JobEntry[],
      isClosedList: boolean,
      isFr: boolean,
    ): string => {
      if (jobsList.length === 0) return "";
      let s = "";
      if (isClosedList) {
        s += `<p class="mt-3 mb-1 font-bold text-red-600" style="color: #dc2626; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${isFr ? "Officiers (Fermés) :" : "Officers (Closed):"}</p>\n`;
      } else {
        s += `<p class="mt-3 mb-1 font-bold text-slate-800" style="color: #1e293b; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${isFr ? "Officiers :" : "Officers:"}</p>\n`;
      }
      s += '<ul class="list-disc pl-5 space-y-1 mb-2">\n';
      for (const j of jobsList) {
        const link = this.getJobLinkMarkup(j.id, isFr, true);
        const reqDomain =
          this.pforType() === "cmr"
            ? isFr
              ? ` (CMR : ${this.getCmrJobRequiredDomainsFr(j.id)})`
              : ` (RMC: ${this.getCmrJobRequiredDomainsEn(j.id)})`
            : "";
        if (isClosedList) {
          s += `  <li class="mt-0.5 text-red-700" style="color: #b91c1c;"><strong>${j.id} - ${link}</strong>${reqDomain} <span style="background-color: #fecaca; color: #991b1b; font-size: 11px; padding: 1px 4px; border-radius: 3px; font-weight: bold;">(${isFr ? "FERMÉ" : "CLOSED"})</span></li>\n`;
        } else {
          s += `  <li class="mt-0.5"><strong>${j.id} - ${link}</strong>${reqDomain}</li>\n`;
        }
      }
      s += "</ul>\n";
      return s;
    };

    const renderPlainList = (
      jobsList: JobEntry[],
      isClosedList: boolean,
      isFr: boolean,
    ): string => {
      if (jobsList.length === 0) return "";
      let s = "";
      if (isClosedList) {
        s += `\n${isFr ? "Officiers (Fermés) :" : "Officers (Closed):"}\n`;
      } else {
        s += `\n${isFr ? "Officiers :" : "Officers:"}\n`;
      }
      for (const j of jobsList) {
        const link = this.getJobLinkMarkup(j.id, isFr, false);
        const reqDomain =
          this.pforType() === "cmr"
            ? isFr
              ? ` (CMR : ${this.getCmrJobRequiredDomainsFr(j.id)})`
              : ` (RMC: ${this.getCmrJobRequiredDomainsEn(j.id)})`
            : "";
        if (isClosedList) {
          s += `  - ${j.id} - ${link}${reqDomain} (${isFr ? "FERMÉ" : "CLOSED"})\n`;
        } else {
          s += `  - ${j.id} - ${link}${reqDomain}\n`;
        }
      }
      return s;
    };

    const renderHtmlNcmList = (
      jobsList: (JobEntry | string)[],
      isClosedList: boolean,
      isFr: boolean,
    ): string => {
      if (jobsList.length === 0) return "";
      let s = "";
      if (isClosedList) {
        s += `<p class="mt-3 mb-1 font-bold text-red-600" style="color: #dc2626; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${isFr ? "Militaire du rang (Fermés) :" : "Non-Commissioned Member (Closed):"}</p>\n`;
      } else {
        s += `<p class="mt-3 mb-1 font-bold text-slate-800" style="color: #1e293b; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${isFr ? "Militaire du rang :" : "Non-Commissioned Member:"}</p>\n`;
      }
      s += '<ul class="list-disc pl-5 space-y-1 mb-2">\n';
      for (const item of jobsList) {
        const jId = typeof item === "string" ? item : item.id;
        const link = this.getJobLinkMarkup(jId, isFr, true);
        if (isClosedList) {
          s += `  <li class="mt-0.5 text-red-700" style="color: #b91c1c;"><strong>${jId} - ${link}</strong> <span style="background-color: #fecaca; color: #991b1b; font-size: 11px; padding: 1px 4px; border-radius: 3px; font-weight: bold;">(${isFr ? "FERMÉ" : "CLOSED"})</span></li>\n`;
        } else {
          s += `  <li class="mt-0.5"><strong>${jId} - ${link}</strong></li>\n`;
        }
      }
      s += "</ul>\n";
      return s;
    };

    const renderPlainNcmList = (
      jobsList: (JobEntry | string)[],
      isClosedList: boolean,
      isFr: boolean,
    ): string => {
      if (jobsList.length === 0) return "";
      let s = "";
      if (isClosedList) {
        s += `\n${isFr ? "Militaire du rang (Fermés) :" : "Non-Commissioned Member (Closed):"}\n`;
      } else {
        s += `\n${isFr ? "Militaire du rang :" : "Non-Commissioned Member:"}\n`;
      }
      for (const item of jobsList) {
        const jId = typeof item === "string" ? item : item.id;
        const link = this.getJobLinkMarkup(jId, isFr, false);
        if (isClosedList) {
          s += `  - ${jId} - ${link} (${isFr ? "FERMÉ" : "CLOSED"})\n`;
        } else {
          s += `  - ${jId} - ${link}\n`;
        }
      }
      return s;
    };

    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean);

    const hasNoJobCode = dossierIds.includes("00003");
    const realDossierIds = dossierIds.filter((id) => id !== "00003");

    // Determine which dossier jobs are closed but otherwise admissible
    const closedTraitementJobs: string[] = [];
    const closedAdmissionOnlyJobs: string[] = [];
    for (const id of realDossierIds) {
      const s = this.evaluateJobAdmissibility(id);
      if (
        s &&
        s.isJobClosed &&
        s.isAgeAdmissible &&
        s.isCitizenshipAdmissible &&
        s.isEducationAdmissible &&
        s.isMedicalAdmissible
      ) {
        closedTraitementJobs.push(id);
      }
    }
    const hasTraitementClosed = closedTraitementJobs.length > 0;
    const hasAdmissionClosed = closedAdmissionOnlyJobs.length > 0;
    const hasClosedButAdmissibleJobs = hasTraitementClosed || hasAdmissionClosed;
    const closedButAdmissibleJobs = [...closedTraitementJobs, ...closedAdmissionOnlyJobs];
    const allRealDossierJobsAreClosedButAdmissible =
      realDossierIds.length > 0 &&
      closedButAdmissibleJobs.length === realDossierIds.length;

    const rawHtml = this.sharedState.taskEmailHtmlFr();
    const rawTxt = this.sharedState.taskEmailFr();
    const hasTasks =
      !!rawHtml &&
      this.sharedState.hasReassignedTasks() &&
      rawHtml.includes("Bonjour,");
    const mergeTasks = (this.sharedState.includeLinkedEmail() || (this.sharedState.hasReassignedTasks() && this.showResultsPanel())) && hasTasks;

    const isPforCmr = this.pforType() === "cmr";
    
    const cmrAdmittedFr = this.getCmrAdmittedDomainsFr();
    const cmrAdmittedEn = this.getCmrAdmittedDomainsEn();

    const hasAnyOffJobs =
      allOpenOfficerJobs.length > 0 ||
      (this.ignoreSip() && allClosedOfficerJobs.length > 0);
    const hasAnyNcmJobs =
      shouldIncludeNcm &&
      (openNcmJobs.length > 0 ||
        (this.ignoreSip() && closedNcmJobs.length > 0));

    if (isHtml) {
      let h = "";

      // FRENCH SECTION
      h += '<p class="mt-4">Bonjour,</p>\n';

      if (this.isCandidateTooOld()) {
        h += '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR)</strong>, nous constatons que vous devez faire l\'objet d\'une réorientation. En effet, vous dépassez l\'âge maximal d\'admissibilité pour ce programme.</p>\n';
      } else if (isPforCmr && cmrAdmittedFr) {
        h += `<p class="mt-4">Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), <strong>vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${cmrAdmittedFr} !</strong> Nous tenons à vous féliciter chaleureusement pour cette admission.</p>\n`;
      }

      if (mergeTasks) {
        if (this.isCandidateTooOld()) {
          h +=
            '<p class="mt-4">De plus, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        } else if (isPforCmr && cmrAdmittedFr) {
          h +=
            '<p class="mt-4">Toutefois, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        } else if (isPforCmr) {
          h +=
            '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal)</strong>, nous constatons que certaines actions de votre part sont requises. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        } else {
          h +=
            '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Universités civiles)</strong>, nous constatons que certaines actions de votre part sont requises. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        }

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
            '<p class="font-bold text-black border-b border-amber-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">1. TÂCHES ET COMMUNICATIONS À CORRIGER SUR VOTRE PORTAIL :</p>\n';
          h += taskPartHtml + "\n";
          h += "</div>\n";
        }

        h +=
          '<p class="mt-6 font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">2. STATUT DE VOS CHOIX DE MÉTIERS ACTUELS ET RÉORIENTATION REQUISE :</p>\n';
      } else {
        if (hasNoJobCode) {
          if (this.isCandidateTooOld()) {
            h +=
              "<p class=\"mt-4\">De plus, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.</p>\n";
          } else if (isPforCmr && cmrAdmittedFr) {
            h +=
              "<p class=\"mt-4\">Toutefois, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.</p>\n";
          } else if (isPforCmr) {
            h +=
              "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.</p>\n";
          } else {
            h +=
              "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Universités civiles)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.</p>\n";
          }
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (mergeTasks) {
            h +=
              "<p class=\"mt-2\">Voici le statut des métiers actuellement inscrits à votre dossier :</p>\n";
          } else if (this.isCandidateTooOld()) {
            h +=
              "<p class=\"mt-4\">Voici le statut des métiers actuellement inscrits à votre dossier :</p>\n";
          } else if (isPforCmr && cmrAdmittedFr) {
            h +=
              "<p class=\"mt-4\">Toutefois, suite à l'analyse de vos choix de métiers actuels, nous constatons qu'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :</p>\n";
          } else if (isPforCmr) {
            h +=
              "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :</p>\n";
          } else {
            h +=
              "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Universités civiles)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :</p>\n";
          }
        } else {
          h +=
            '<p class="mt-4">Voici le statut des autres métiers inscrits à votre dossier :</p>\n';
        }
        h += '<ul class="list-disc pl-5 mt-2 mb-4">\n';
        for (const id of realDossierIds) {
          const name = `${id} - ${this.getJobLinkMarkup(id, true, true)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonFr = "";
          if (s) {
            const reasonsFrList: string[] = [];
            if (s.isJobClosed) {
              reasonsFrList.push(
                "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).",
              );
            }
            if (!s.isAgeAdmissible) {
              reasonsFrList.push(s.ageReason);
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsFrList.push(
                "Pour diverses raisons, ce métier n'est pas accessible aux résidents permanents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsFrList.push(s.educationReason);
            }
            if (!s.isMedicalAdmissible) {
              reasonsFrList.push(s.medicalReason);
            }

            if (reasonsFrList.length > 0) {
              reasonFr = `\n    <ul class="list-disc pl-5 mt-1 text-sm text-slate-600">\n      <li>${reasonsFrList.join("</li>\n      <li>")}</li>\n    </ul>`;
            } else {
              reasonFr =
                " : Admissible (réorientation lancée pour d'autres éléments du dossier).";
            }
          }
          h += `  <li class="mt-1"><strong>${name}</strong>${reasonFr}</li>\n`;
        }
        h += "</ul>\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          h +=
            "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou requièrent un domaine d'études différent de votre admission au CMR.</p>\n";
        } else {
          h +=
            "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou que vous n'y êtes pas admissible d'après nos critères.</p>\n";
        }
      }

      // Options French
      h +=
        '<p class="mt-4 font-semibold text-slate-800">Voici les options qui s\'offrent à vous :</p>\n';
      if (hasClosedButAdmissibleJobs) {
        const isPlural = closedButAdmissibleJobs.length > 1;
        const opt1Title = isPlural
          ? 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mes choix de métiers (' + closedButAdmissibleJobs.join(", ") + ')'
          : 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mon choix de métier (' + closedButAdmissibleJobs.join(", ") + ')';
        const opt1MetiersDesc = isPlural
          ? 'vos choix de métiers (<strong>' + closedButAdmissibleJobs.join(", ") + '</strong>)'
          : 'votre choix de métier (<strong>' + closedButAdmissibleJobs.join(", ") + '</strong>)';
        h +=
          '<p class="mt-2 text-sm"><strong>' + opt1Title + '</strong><br>Vous pouvez conserver ' + opt1MetiersDesc + ' et attendre que les prochaines positions ouvrent en avril prochain. Cependant, <span style="background-color: #fef08a; font-weight: bold;">votre dossier sera fermé dès maintenant</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement</span>.</p>\n';
        h +=
          '<p class="mt-4 text-sm"><strong>Option 2 : Choisir un autre métier parmi la liste des métiers admissibles</strong><br>Vous pouvez réorienter votre candidature vers d\'autres choix de métiers admissibles dès maintenant. Pour ces métiers, l\'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Consultez la liste ci-dessous.</p>\n';
      } else {
        h +=
          '<p class="mt-2 text-sm"><strong>Choisir un autre métier parmi la liste des métiers admissibles</strong><br>Vous devez réorienter votre candidature vers un choix de métier pour lequel vous êtes admissible afin de poursuivre le processus d\'enrôlement. Pour ces métiers, l\'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Veuillez consulter la liste ci-dessous.</p>\n';
      }

      // Eligible Jobs French Division
      h +=
        '<div class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
      h +=
        '<p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">MÉTIERS ADMISSIBLES :</p>\n';

      if (isPilotEligible) {
        h +=
          '<div class="mt-2 mb-3 p-3 bg-amber-50 border border-amber-300 rounded text-amber-900 text-xs" style="margin-top: 8px; margin-bottom: 12px; padding: 10px; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; font-size: 13px; color: #78350f;">\n' +
          '  <strong>Attention – Choix du métier de Pilote (00183) :</strong> Le métier de Pilote étant fortement contingenté (nombre de places très limité), si vous choisissez ce métier, vous devez obligatoirement sélectionner un deuxième métier parmi la liste des métiers admissibles.\n' +
          '</div>\n';
      }

      if (!hasAnyOffJobs && !hasAnyNcmJobs) {
        if (shouldIncludeNcm) {
          h +=
            '<p class="mt-2 text-slate-700 italic">(Veuillez renseigner les critères de scolarité et d\'expérience dans les panneaux ci-dessus pour afficher les métiers admissibles)</p>\n';
        } else {
          h +=
            '<p class="mt-2 text-slate-700 italic">Aucun métier PFOR ouvert correspondant n\'est disponible actuellement pour la sélection effectuée.</p>\n';
        }
      } else {
        if (allOpenOfficerJobs.length > 0) {
          h += renderHtmlList(allOpenOfficerJobs, false, true);
        }
        if (shouldIncludeNcm && openNcmJobs.length > 0) {
          h += renderHtmlNcmList(openNcmJobs, false, true);
        }
        if (this.ignoreSip() && (allClosedOfficerJobs.length > 0 || (shouldIncludeNcm && closedNcmJobs.length > 0))) {
          h +=
            '<div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900" style="margin-top: 16px; padding: 12px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 4px; font-size: 14px; color: #713f12;">\n' +
            '  <strong>Note importante concernant les métiers fermés :</strong> La liste ci-dessous inclut des métiers actuellement ouverts et fermés. Si vous choisissez un <span style="background-color: #fef08a; font-weight: bold;">métier ouvert</span>, nous pourrons poursuivre le traitement de votre demande d\'emploi immédiatement. Par contre, si vous choisissez un <span style="background-color: #fecaca; color: #991b1b; font-weight: bold;">métier fermé</span> (marqué en rouge), nous devrons fermer votre dossier et ce sera <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de nous rappeler vers la fin du mois de mars prochain</span> pour faire rouvrir votre dossier dans ce métier.\n' +
            '</div>\n';
          if (allClosedOfficerJobs.length > 0) {
            h += renderHtmlList(allClosedOfficerJobs, true, true);
          }
          if (shouldIncludeNcm && closedNcmJobs.length > 0) {
            h += renderHtmlNcmList(closedNcmJobs, true, true);
          }
        }
      }
      h += "</div>\n";

      // Conclusion French
      if (mergeTasks) {
        h +=
          '<p class="mt-6 font-semibold text-slate-800">Prochaines étapes :</p>\n';
        h +=
          "<p>En raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées. Nous vous invitons donc à :</p>\n";
        h += '<ul class="list-disc pl-5 mt-1 mb-2 text-sm text-slate-700">\n';
        h +=
          `  <li>Vous rendre sur votre portail (<a href="${PORTAL_CANDIDATE_URL}" class="text-blue-600 hover:underline">${PORTAL_CANDIDATE_URL}</a>) afin de corriger sans délai les tâches indiquées ci-dessus ;</li>\n`;
        if (isPRAdmissible) {
          h +=
            `  <li>Si ce n'est pas déjà fait, retourner sur votre portail (<a href="${PORTAL_CANDIDATE_URL}" class="text-blue-600 hover:underline">${PORTAL_CANDIDATE_URL}</a>) afin d'y déposer les relevés de notes de votre pays d'origine (dans leur langue d'origine s'ils sont en français ou en anglais, ou accompagnés d'une traduction officielle au besoin) ;</li>\n`;
        }
        h +=
          "  <li>Répondre directement à ce courriel avec votre choix de réorientation ou vos nouveaux choix de métiers pour mettre à jour votre dossier.</li>\n";
        h += "</ul>\n";
      } else {
        if (isPRAdmissible) {
          h +=
            `<p class="mt-4 text-sm text-slate-700">De plus, si ce n'est pas déjà fait, veuillez retourner sur votre portail (<a href="${PORTAL_CANDIDATE_URL}" class="text-blue-600 hover:underline">${PORTAL_CANDIDATE_URL}</a>) afin d'y déposer les relevés de notes de votre pays d'origine. Ceux-ci doivent être rédigés en français ou en anglais, ou être accompagnés d'une traduction officielle au besoin.</p>\n`;
        }
        h +=
          '<p class="mt-4">Nous vous remercions pour votre intérêt envers les Forces armées canadiennes. Veuillez nous faire part de votre décision en répondant directement à ce courriel afin de poursuivre ou de mettre à jour votre dossier.</p>\n';
      }

      h +=
        '<p class="mt-4 text-sm text-slate-600">Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.</p>\n';
      h += '<p>' + this.sharedState.getHtmlSignatureFr() + '</p>\n';
      const frHtml = h;

      // ======================================
      // ENGLISH SECTION
      // ======================================
      let hEn = "";
      hEn += '<p class="mt-4">Hello,</p>\n';

      if (this.isCandidateTooOld()) {
        if (this.age() !== null && this.age()! >= 57) {
          hEn += '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP)</strong>, we regret to inform you that you exceed the maximum eligibility age for enrolment in the Canadian Armed Forces (the maximum enrolment age is 56, and 57 or older is automatically ineligible).</p>\n';
        } else {
          hEn += '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP)</strong>, we have determined that you must undergo a reorientation. Indeed, you exceed the maximum eligibility age for this program.</p>\n';
        }
      } else if (isPforCmr && cmrAdmittedEn) {
        hEn += `<p class="mt-4">We are pleased to inform you that, following the assessment of your transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), <strong>you have been admitted to RMC in the following field(s) of study: ${cmrAdmittedEn}!</strong> We would like to warmly congratulate you on your admission.</p>\n`;
      }

      if (mergeTasks) {
        if (this.isCandidateTooOld()) {
          hEn +=
            '<p class="mt-4">In addition, certain actions on your part are required to allow us to continue processing your application. You must both <strong>correct the tasks that have been reassigned to you</strong> on your portal and undergo a <strong>reorientation for your occupation choices</strong>.</p>\n';
        } else if (isPforCmr && cmrAdmittedEn) {
          hEn +=
            '<p class="mt-4">However, certain actions on your part are required to allow us to continue processing your application. You must both <strong>correct the tasks that have been reassigned to you</strong> on your portal and undergo a <strong>reorientation for your occupation choices</strong>.</p>\n';
        } else if (isPforCmr) {
          hEn +=
            '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Royal Military College)</strong>, we note that certain actions are required. You must both <strong>correct the tasks that have been reassigned to you</strong> on your portal and undergo a <strong>reorientation for your occupation choices</strong>.</p>\n';
        } else {
          hEn +=
            '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Civilian Universities)</strong>, we note that certain actions are required. You must both <strong>correct the tasks that have been reassigned to you</strong> on your portal and undergo a <strong>reorientation for your occupation choices</strong>.</p>\n';
        }

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
            '<p class="font-bold text-black border-b border-amber-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">1. TASKS AND COMMUNICATIONS TO CORRECT ON YOUR PORTAL:</p>\n';
          hEn += taskPartHtmlEn + "\n";
          hEn += "</div>\n";
        }

        hEn +=
          '<p class="mt-6 font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">2. STATUS OF YOUR CURRENT OCCUPATION CHOICES AND REQUIRED REORIENTATION:</p>\n';
      } else {
        if (hasNoJobCode) {
          if (this.isCandidateTooOld()) {
            hEn +=
              "<p class=\"mt-4\">In addition, no occupation is currently selected on your file, and processing cannot continue without an eligible occupation choice on your part.</p>\n";
          } else if (isPforCmr && cmrAdmittedEn) {
            hEn +=
              "<p class=\"mt-4\">However, no occupation is currently selected on your file, and processing cannot continue without an eligible occupation choice on your part.</p>\n";
          } else if (isPforCmr) {
            hEn +=
              "<p class=\"mt-4\">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Royal Military College)</strong>, we note that you require a reorientation. Indeed, no occupation is currently selected on your file, and processing cannot continue without an occupation choice on your part.</p>\n";
          } else {
            hEn +=
              "<p class=\"mt-4\">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Civilian Universities)</strong>, we note that you require a reorientation. Indeed, no occupation is currently selected on your file, and processing cannot continue without an occupation choice on your part.</p>\n";
          }
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (mergeTasks) {
            hEn +=
              "<p class=\"mt-2\">Here is the status of the occupations currently on your file:</p>\n";
          } else if (this.isCandidateTooOld()) {
            hEn +=
              "<p class=\"mt-4\">Here is the status of the occupations currently on your file:</p>\n";
          } else if (isPforCmr && cmrAdmittedEn) {
            hEn +=
              "<p class=\"mt-4\">However, following the review of your current occupation choices, we find that a reorientation is required. Here is the status of the occupations currently on your file:</p>\n";
          } else if (isPforCmr) {
            hEn +=
              "<p class=\"mt-4\">Following the review of your application file for the <strong>Regular Officer Training Plan (ROTP - Royal Military College)</strong>, we find that a reorientation is required. Here is the status of the occupations currently on your file:</p>\n";
          } else {
            hEn +=
              "<p class=\"mt-4\">Following the review of your application file for the <strong>Regular Officer Training Plan (ROTP - Civilian Universities)</strong>, we find that a reorientation is required. Here is the status of the occupations currently on your file:</p>\n";
          }
        } else {
          hEn +=
            '<p class="mt-4">Here is the status of the other occupations on your file:</p>\n';
        }
        hEn += '<ul class="list-disc pl-5 mt-2 mb-4">\n';
        for (const id of realDossierIds) {
          const name = `${id} - ${this.getJobLinkMarkup(id, false, true)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonEn = "";
          if (s) {
            const reasonsEnList: string[] = [];
            if (s.isJobClosed) {
              reasonsEnList.push(
                "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).",
              );
            }
            if (!s.isAgeAdmissible) {
              reasonsEnList.push(s.ageReasonEn);
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsEnList.push(
                "For various reasons, this occupation is not open to permanent residents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsEnList.push(s.educationReasonEn);
            }
            if (!s.isMedicalAdmissible) {
              reasonsEnList.push(s.medicalReasonEn);
            }

            if (reasonsEnList.length > 0) {
              reasonEn = `\n    <ul class="list-disc pl-5 mt-1 text-sm text-slate-600">\n      <li>${reasonsEnList.join("</li>\n      <li>")}</li>\n    </ul>`;
            } else {
              reasonEn =
                " : Eligible (reorientation initiated for other elements of the file).";
            }
          }
          hEn += `  <li class="mt-1"><strong>${name}</strong>${reasonEn}</li>\n`;
        }
        hEn += "</ul>\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          hEn +=
            "<p class=\"mt-4\">Following the review of your application file, we note that your current occupation choices are not available under ROTP or require a field of study different from your admission to RMC.</p>\n";
        } else {
          hEn +=
            "<p class=\"mt-4\">Following the review of your application file, we note that your current occupation choices are not available or you are not eligible based on our criteria.</p>\n";
        }
      }

      // Options English
      hEn +=
        '<p class="mt-4 font-semibold text-slate-800">Here are the options available to you:</p>\n';
      if (hasClosedButAdmissibleJobs) {
        const isPluralEn = closedButAdmissibleJobs.length > 1;
        const opt1TitleEn = isPluralEn
          ? 'Option 1: Close my file and wait for the next open positions for my occupational choices (' + closedButAdmissibleJobs.join(", ") + ')'
          : 'Option 1: Close my file and wait for the next open positions for my occupational choice (' + closedButAdmissibleJobs.join(", ") + ')';
        const opt1OccupationsEn = isPluralEn
          ? 'your occupational choices (<strong>' + closedButAdmissibleJobs.join(", ") + '</strong>)'
          : 'your occupational choice (<strong>' + closedButAdmissibleJobs.join(", ") + '</strong>)';
        hEn +=
          '<p class="mt-2 text-sm"><strong>' + opt1TitleEn + '</strong><br>You can retain ' + opt1OccupationsEn + ' and wait until next April for positions to open. However, <span style="background-color: #fef08a; font-weight: bold;">your file will be closed immediately</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process</span>.</p>\n';
        hEn +=
          '<p class="mt-4 text-sm"><strong>Option 2: Choose another occupation from the list of eligible occupations</strong><br>You can redirect your application to other eligible occupational choices right now. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.</p>\n';
      } else {
        hEn +=
          '<p class="mt-2 text-sm"><strong>Choose another occupation from the list of eligible occupations</strong><br>You must redirect your application to an occupational choice for which you are eligible to continue the enrollment process. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.</p>\n';
      }

      // Eligible Jobs English Division
      hEn +=
        '<div class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
      hEn +=
        '<p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">ELIGIBLE OCCUPATIONS:</p>\n';

      if (isPilotEligible) {
        hEn +=
          '<div class="mt-2 mb-3 p-3 bg-amber-50 border border-amber-300 rounded text-amber-900 text-xs" style="margin-top: 8px; margin-bottom: 12px; padding: 10px; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; font-size: 13px; color: #78350f;">\n' +
          '  <strong>Notice – Choice of Pilot (00183):</strong> Since the Pilot occupation is highly competitive (very limited vacancies), if you select this occupation, you must mandatory choose a second occupation from the list of eligible occupations.\n' +
          '</div>\n';
      }

      if (!hasAnyOffJobs && !hasAnyNcmJobs) {
        if (shouldIncludeNcm) {
          hEn +=
            '<p class="mt-2 text-slate-700 italic">(Please fill out the education and experience criteria in the panels above to display eligible occupations)</p>\n';
        } else {
          hEn +=
            '<p class="mt-2 text-slate-700 italic">No open ROTP occupations currently available for the selected profile.</p>\n';
        }
      } else {
        if (allOpenOfficerJobs.length > 0) {
          hEn += renderHtmlList(allOpenOfficerJobs, false, false);
        }
        if (shouldIncludeNcm && openNcmJobs.length > 0) {
          hEn += renderHtmlNcmList(openNcmJobs, false, false);
        }
        if (this.ignoreSip() && (allClosedOfficerJobs.length > 0 || (shouldIncludeNcm && closedNcmJobs.length > 0))) {
          hEn +=
            '<div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900" style="margin-top: 16px; padding: 12px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 4px; font-size: 14px; color: #713f12;">\n' +
            '  <strong>Important note regarding closed occupations:</strong> The list below includes occupations that are currently open and closed. If you choose an <span style="background-color: #fef08a; font-weight: bold;">open occupation</span>, we can continue processing your application immediately. However, if you choose a <span style="background-color: #fecaca; color: #991b1b; font-weight: bold;">closed occupation</span> (marked in red), we will have to close your file and it will be <span style="background-color: #fef08a; font-weight: bold;">your full responsibility to call us back near the end of next March</span> to reopen your file in that occupation.\n' +
            '</div>\n';
          if (allClosedOfficerJobs.length > 0) {
            hEn += renderHtmlList(allClosedOfficerJobs, true, false);
          }
          if (shouldIncludeNcm && closedNcmJobs.length > 0) {
            hEn += renderHtmlNcmList(closedNcmJobs, true, false);
          }
        }
      }
      hEn += "</div>\n";

      // Conclusion English
      if (mergeTasks) {
        hEn +=
          '<p class="mt-6 font-semibold text-slate-800">Next Steps:</p>\n';
        hEn +=
          "<p>Due to a high volume of applications, we must prioritize files where all tasks are completed. We invite you to:</p>\n";
        hEn += '<ul class="list-disc pl-5 mt-1 mb-2 text-sm text-slate-700">\n';
        hEn +=
          `  <li>Visit your portal (<a href="${PORTAL_CANDIDATE_URL}" class="text-blue-600 hover:underline">${PORTAL_CANDIDATE_URL}</a>) to correct without delay the tasks indicated above;</li>\n`;
        if (isPRAdmissible) {
          hEn +=
            `  <li>If not already done, return to your portal (<a href="${PORTAL_CANDIDATE_URL}" class="text-blue-600 hover:underline">${PORTAL_CANDIDATE_URL}</a>) to upload the transcripts from your country of origin (in their original language if in English or French, or accompanied by an official translation if needed);</li>\n`;
        }
        hEn +=
          "  <li>Reply directly to this email with your reorientation choice or your new occupation choices to update your file.</li>\n";
        hEn += "</ul>\n";
      } else {
        if (isPRAdmissible) {
          hEn +=
            `<p class="mt-4 text-sm text-slate-700">Additionally, if you have not already done so, please return to your portal (<a href="${PORTAL_CANDIDATE_URL}" class="text-blue-600 hover:underline">${PORTAL_CANDIDATE_URL}</a>) to upload your transcripts from your country of origin. These must be in English or French, or accompanied by an official translation if necessary.</p>\n`;
        }
        hEn +=
          '<p class="mt-4">Thank you for your interest in the Canadian Armed Forces. Please inform us of your decision by replying directly to this email in order to continue or update your file.</p>\n';
      }

      hEn +=
        '<p class="mt-4 text-sm text-slate-600">If you take no action, your file will be automatically deactivated after 30 days.</p>\n';
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

      // French Plain Text
      t += "Bonjour,\n\n";

      if (this.isCandidateTooOld()) {
        if (this.age() !== null && this.age()! >= 57) {
          t += "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR), nous vous informons que vous dépassez l'âge maximal d'admissibilité pour l'enrôlement dans les Forces armées canadiennes (l'âge maximal d'admissibilité est de 56 ans, 57 ans et plus étant automatiquement inadmissible).\n\n";
        } else {
          t += "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR), nous constatons que vous devez faire l'objet d'une réorientation. En effet, vous dépassez l'âge maximal d'admissibilité pour ce programme.\n\n";
        }
      } else if (isPforCmr && cmrAdmittedFr) {
        t += `Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${cmrAdmittedFr} ! Nous tenons à vous féliciter chaleureusement pour cette admission.\n\n`;
      }

      if (mergeTasks) {
        if (this.isCandidateTooOld()) {
          t +=
            "De plus, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        } else if (isPforCmr && cmrAdmittedFr) {
          t +=
            "Toutefois, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        } else if (isPforCmr) {
          t +=
            "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal), nous constatons que certaines actions de votre part sont requises. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        } else {
          t +=
            "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que certaines actions de votre part sont requises. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        }

        let taskPartTxt = "";
        if (rawTxt.includes("<!-- START_TASK_BODY_FR -->")) {
          const frParts = rawTxt.split("<!-- START_TASK_BODY_FR -->");
          if (frParts.length > 1) {
            const frBodyPart = frParts[1].split("<!-- END_TASK_BODY_FR -->");
            if (frBodyPart.length > 0) {
              taskPartTxt = frBodyPart[0].trim();
            }
          }
        } else {
          const frParts = rawTxt.split("Bonjour,");
          if (frParts.length > 1) {
            const frBodyPart = frParts[1].split("En raison du volume");
            if (frBodyPart.length > 0 && frBodyPart[0].trim().length > 0) {
              taskPartTxt = frBodyPart[0].trim();
            }
          }
        }

        if (taskPartTxt) {
          t += "1. TÂCHES ET COMMUNICATIONS À CORRIGER SUR VOTRE PORTAIL :\n";
          t +=
            "----------------------------------------------------------------------\n";
          t += taskPartTxt + "\n\n";
        }

        t +=
          "2. STATUT DE VOS CHOIX DE MÉTIERS ACTUELS ET RÉORIENTATION REQUISE :\n";
        t +=
          "----------------------------------------------------------------------\n";
      } else {
        if (hasNoJobCode) {
          if (this.isCandidateTooOld()) {
            t +=
              "De plus, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.\n\n";
          } else if (isPforCmr && cmrAdmittedFr) {
            t +=
              "Toutefois, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.\n\n";
          } else if (isPforCmr) {
            t +=
              "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal), nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.\n\n";
          } else {
            t +=
              "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.\n\n";
          }
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (mergeTasks) {
            t +=
              "Voici le statut des métiers actuellement inscrits à votre dossier :\n";
          } else if (this.isCandidateTooOld()) {
            t +=
              "Voici le statut des métiers actuellement inscrits à votre dossier :\n";
          } else if (isPforCmr && cmrAdmittedFr) {
            t +=
              "Toutefois, suite à l'analyse de vos choix de métiers actuels, nous constatons qu'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :\n";
          } else if (isPforCmr) {
            t +=
              "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal), nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :\n";
          } else {
            t +=
              "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :\n";
          }
        } else {
          t +=
            "Voici le statut des autres métiers inscrits à votre dossier :\n";
        }
        for (const id of realDossierIds) {
          const name = `${id} - ${this.getJobLinkMarkup(id, true, false)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonFr = "";
          if (s) {
            const reasonsFrList: string[] = [];
            if (s.isJobClosed) {
              reasonsFrList.push(
                "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).",
              );
            }
            if (!s.isAgeAdmissible) {
              reasonsFrList.push(s.ageReason);
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsFrList.push(
                "Pour diverses raisons, ce métier n'est pas accessible aux résidents permanents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsFrList.push(s.educationReason);
            }
            if (!s.isMedicalAdmissible) {
              reasonsFrList.push(s.medicalReason);
            }

            if (reasonsFrList.length > 0) {
              reasonFr = `\n    - ${reasonsFrList.join("\n    - ")}`;
            } else {
              reasonFr =
                " : Admissible (réorientation lancée pour d'autres éléments du dossier).";
            }
          }
          t += `- ${name}${reasonFr}\n`;
        }
        t += "\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          t +=
            "Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou requièrent un domaine d'études différent de votre admission au CMR.\n\n";
        } else {
          t +=
            "Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou que vous n'y êtes pas admissible d'après nos critères.\n\n";
        }
      }

      t += "Voici les options qui s'offrent à vous :\n";
      if (hasClosedButAdmissibleJobs) {
        const isPlural = closedButAdmissibleJobs.length > 1;
        const opt1Title = isPlural
          ? 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mes choix de métiers (' + closedButAdmissibleJobs.join(", ") + ')'
          : 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mon choix de métier (' + closedButAdmissibleJobs.join(", ") + ')';
        const opt1MetiersDesc = isPlural
          ? 'vos choix de métiers (' + closedButAdmissibleJobs.join(", ") + ')'
          : 'votre choix de métier (' + closedButAdmissibleJobs.join(", ") + ')';
        t += opt1Title + "\n";
        t += "Vous pouvez conserver " + opt1MetiersDesc + " et attendre que les prochaines positions ouvrent en avril prochain. Cependant, votre dossier sera fermé dès maintenant et il sera de votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement.\n\n";
        t += "Option 2 : Choisir un autre métier parmi la liste des métiers admissibles\n";
        t += "Vous pouvez réorienter votre candidature vers d'autres choix de métiers admissibles dès maintenant. Pour ces métiers, l'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Consultez la liste ci-dessous.\n\n";
      } else {
        t += "Choisir un autre métier parmi la liste des métiers admissibles\n";
        t += "Vous devez réorienter votre candidature vers un choix de métier pour lequel vous êtes admissible afin de poursuivre le processus d'enrôlement. Pour ces métiers, l'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Veuillez consulter la liste ci-dessous.\n\n";
      }

      t += "MÉTIERS ADMISSIBLES :\n";
      if (isPilotEligible) {
        t +=
          "Attention – Choix du métier de Pilote (00183) : Le métier de Pilote étant fortement contingenté (nombre de places très limité), si vous choisissez ce métier, vous devez obligatoirement sélectionner un deuxième métier parmi la liste des métiers admissibles.\n\n";
      }

      if (!hasAnyOffJobs && !hasAnyNcmJobs) {
        if (shouldIncludeNcm) {
          t +=
            "(Veuillez renseigner les critères de scolarité et d'expérience dans les panneaux ci-dessus pour afficher les métiers admissibles)\n";
        } else {
          t +=
            "Aucun métier PFOR ouvert correspondant n'est disponible actuellement pour la sélection effectuée.\n";
        }
      } else {
        if (allOpenOfficerJobs.length > 0) {
          t += renderPlainList(allOpenOfficerJobs, false, true);
        }
        if (shouldIncludeNcm && openNcmJobs.length > 0) {
          t += renderPlainNcmList(openNcmJobs, false, true);
        }
        if (this.ignoreSip() && (allClosedOfficerJobs.length > 0 || (shouldIncludeNcm && closedNcmJobs.length > 0))) {
          t +=
            "\nNote importante concernant les métiers fermés : La liste ci-dessous inclut des métiers actuellement ouverts et fermés. Si vous choisissez un métier ouvert, nous pourrons poursuivre le traitement de votre demande d'emploi immédiatement. Par contre, si vous choisissez un métier fermé (marqué FERMÉ), nous devrons fermer votre dossier et ce sera votre entière responsabilité de nous rappeler vers la fin du mois de mars prochain pour faire rouvrir votre dossier dans ce métier.\n\n";
          if (allClosedOfficerJobs.length > 0) {
            t += renderPlainList(allClosedOfficerJobs, true, true);
          }
          if (shouldIncludeNcm && closedNcmJobs.length > 0) {
            t += renderPlainNcmList(closedNcmJobs, true, true);
          }
        }
      }

      if (mergeTasks) {
        t += "\nProchaines étapes :\n";
        t +=
          "En raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées. Nous vous invitons donc à :\n";
        t +=
          `  - Vous rendre sur votre portail (${PORTAL_CANDIDATE_URL}) afin de corriger sans délai les tâches indiquées ci-dessus ;\n`;
        if (isPRAdmissible) {
          t +=
            `  - Si ce n'est pas déjà fait, retourner sur votre portail (${PORTAL_CANDIDATE_URL}) afin d'y déposer les relevés de notes de votre pays d'origine (dans leur langue d'origine s'ils sont en français ou en anglais, ou accompagnés d'une traduction officielle au besoin) ;\n`;
        }
        t +=
          "  - Répondre directement à ce courriel avec votre choix de réorientation ou vos nouveaux choix de métiers pour mettre à jour votre dossier.\n";
      } else {
        if (isPRAdmissible) {
          t +=
            `\nDe plus, si ce n'est pas déjà fait, veuillez retourner sur votre portail (${PORTAL_CANDIDATE_URL}) afin d'y déposer les relevés de notes de votre pays d'origine. Ceux-ci doivent être rédigés en français ou en anglais, ou être accompagnés d'une traduction officielle au besoin.\n`;
        }
        t +=
          "\nNous vous remercions pour votre intérêt envers les Forces armées canadiennes. Veuillez nous faire part de votre décision en répondant directement à ce courriel afin de poursuivre ou de mettre à jour votre dossier.\n";
      }

      t +=
        "\nSi vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.\n\n";
      t += this.sharedState.getSignatureFr() + "\n";
      const frPlain = t.trim();

      // English Plain Text
      let tEn = "";
      tEn += "Hello,\n\n";

      if (this.isCandidateTooOld()) {
        if (this.age() !== null && this.age()! >= 57) {
          tEn += "Following the analysis of your application file for the Regular Officer Training Plan (ROTP), we regret to inform you that you exceed the maximum eligibility age for enrolment in the Canadian Armed Forces (the maximum enrolment age is 56, and 57 or older is automatically ineligible).\n\n";
        } else {
          tEn += "Following the analysis of your application file for the Regular Officer Training Plan (ROTP), we have determined that you must undergo a reorientation. Indeed, you exceed the maximum eligibility age for this program.\n\n";
        }
      } else if (isPforCmr && cmrAdmittedEn) {
        tEn += `We are pleased to inform you that, following the assessment of your transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), you have been admitted to RMC in the following field(s) of study: ${cmrAdmittedEn}! We would like to warmly congratulate you on your admission.\n\n`;
      }

      if (mergeTasks) {
        if (this.isCandidateTooOld()) {
          tEn +=
            "In addition, certain actions on your part are required to allow us to continue processing your application. You must both correct the tasks that have been reassigned to you on your portal and undergo a reorientation for your occupation choices.\n\n";
        } else if (isPforCmr && cmrAdmittedEn) {
          tEn +=
            "However, certain actions on your part are required to allow us to continue processing your application. You must both correct the tasks that have been reassigned to you on your portal and undergo a reorientation for your occupation choices.\n\n";
        } else if (isPforCmr) {
          tEn +=
            "Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Royal Military College), we note that certain actions are required. You must both correct the tasks that have been reassigned to you on your portal and undergo a reorientation for your occupation choices.\n\n";
        } else {
          tEn +=
            "Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Civilian Universities), we note that certain actions are required. You must both correct the tasks that have been reassigned to you on your portal and undergo a reorientation for your occupation choices.\n\n";
        }

        const rawTxtEn = this.sharedState.taskEmailEn();
        let taskPartTxtEn = "";
        if (rawTxtEn.includes("<!-- START_TASK_BODY_EN -->")) {
          const enParts = rawTxtEn.split("<!-- START_TASK_BODY_EN -->");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("<!-- END_TASK_BODY_EN -->");
            if (enBodyPart.length > 0) {
              taskPartTxtEn = enBodyPart[0].trim();
            }
          }
        } else {
          const enParts = rawTxtEn.split("Hello,");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("Due to a high volume");
            if (enBodyPart.length > 0 && enBodyPart[0].trim().length > 0) {
              taskPartTxtEn = enBodyPart[0].trim();
            }
          }
        }

        if (taskPartTxtEn) {
          tEn += "1. TASKS AND COMMUNICATIONS TO CORRECT ON YOUR PORTAL:\n";
          tEn +=
            "----------------------------------------------------------------------\n";
          tEn += taskPartTxtEn + "\n\n";
        }

        tEn +=
          "2. STATUS OF YOUR CURRENT OCCUPATION CHOICES AND REQUIRED REORIENTATION:\n";
        tEn +=
          "----------------------------------------------------------------------\n";
      } else {
        if (hasNoJobCode) {
          if (this.isCandidateTooOld()) {
            tEn +=
              "In addition, no occupation is currently selected on your file, and processing cannot continue without an eligible occupation choice on your part.\n\n";
          } else if (isPforCmr && cmrAdmittedEn) {
            tEn +=
              "However, no occupation is currently selected on your file, and processing cannot continue without an eligible occupation choice on your part.\n\n";
          } else if (isPforCmr) {
            tEn +=
              "Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Royal Military College), we note that you require a reorientation. Indeed, no occupation is currently selected on your file, and processing cannot continue without an occupation choice on your part.\n\n";
          } else {
            tEn +=
              "Following the analysis of your application file, we note that you require a reorientation. Indeed, no occupation is currently selected on your file, and processing cannot continue without an occupation choice on your part.\n\n";
          }
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (mergeTasks) {
            tEn +=
              "Here is the status of the occupations currently on your file:\n";
          } else if (this.isCandidateTooOld()) {
            tEn +=
              "Here is the status of the occupations currently on your file:\n";
          } else if (isPforCmr && cmrAdmittedEn) {
            tEn +=
              "However, following the review of your current occupation choices, we find that a reorientation is required. Here is the status of the occupations currently on your file:\n";
          } else if (isPforCmr) {
            tEn +=
              "Following the review of your application file for the Regular Officer Training Plan (ROTP - Royal Military College), we find that a reorientation is required. Here is the status of the occupations currently on your file:\n";
          } else {
            tEn +=
              "Following the review of your application file for the Regular Officer Training Plan (ROTP - Civilian Universities), we find that a reorientation is required. Here is the status of the occupations currently on your file:\n";
          }
        } else {
          tEn +=
            "Here is the status of the other occupations on your file:\n";
        }
        for (const id of realDossierIds) {
          const name = `${id} - ${this.getJobLinkMarkup(id, false, false)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonEn = "";
          if (s) {
            const reasonsEnList: string[] = [];
            if (s.isJobClosed) {
              reasonsEnList.push(
                "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).",
              );
            }
            if (!s.isAgeAdmissible) {
              reasonsEnList.push(s.ageReasonEn);
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsEnList.push(
                "For various reasons, this occupation is not open to permanent residents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsEnList.push(s.educationReasonEn);
            }
            if (!s.isMedicalAdmissible) {
              reasonsEnList.push(s.medicalReasonEn);
            }

            if (reasonsEnList.length > 0) {
              reasonEn = `\n    - ${reasonsEnList.join("\n    - ")}`;
            } else {
              reasonEn =
                " : Eligible (reorientation initiated for other elements of the file).";
            }
          }
          tEn += `- ${name}${reasonEn}\n`;
        }
        tEn += "\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          tEn +=
            "Following the review of your application file, we note that your current occupation choices are not available under ROTP or require a field of study different from your admission to RMC.\n\n";
        } else {
          tEn +=
            "Following the review of your application file, we note that your current occupation choices are not available or you are not eligible based on our criteria.\n\n";
        }
      }

      tEn += "Here are the options available to you:\n";
      if (hasClosedButAdmissibleJobs) {
        const isPluralEn = closedButAdmissibleJobs.length > 1;
        const opt1TitleEn = isPluralEn
          ? 'Option 1: Close my file and wait for the next open positions for my occupational choices (' + closedButAdmissibleJobs.join(", ") + ')'
          : 'Option 1: Close my file and wait for the next open positions for my occupational choice (' + closedButAdmissibleJobs.join(", ") + ')';
        const opt1OccupationsEn = isPluralEn
          ? 'your occupational choices (' + closedButAdmissibleJobs.join(", ") + ')'
          : 'your occupational choice (' + closedButAdmissibleJobs.join(", ") + ')';
        tEn += opt1TitleEn + "\n";
        tEn += "You can retain " + opt1OccupationsEn + " and wait until next April for positions to open. However, your file will be closed immediately and it will be your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process.\n\n";
        tEn += "Option 2: Choose another occupation from the list of eligible occupations\n";
        tEn += "You can redirect your application to other eligible occupational choices right now. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.\n\n";
      } else {
        tEn += "Choose another occupation from the list of eligible occupations\n";
        tEn += "You must redirect your application to an occupational choice for which you are eligible to continue the enrollment process. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.\n\n";
      }

      tEn += "ELIGIBLE OCCUPATIONS:\n";
      if (isPilotEligible) {
        tEn +=
          "Notice – Choice of Pilot (00183): Since the Pilot occupation is highly competitive (very limited vacancies), if you select this occupation, you must mandatory choose a second occupation from the list of eligible occupations.\n\n";
      }

      if (!hasAnyOffJobs && !hasAnyNcmJobs) {
        if (shouldIncludeNcm) {
          tEn +=
            "(Please fill out the education and experience criteria in the panels above to display eligible occupations)\n";
        } else {
          tEn +=
            "No open ROTP occupations currently available for the selected profile.\n";
        }
      } else {
        if (allOpenOfficerJobs.length > 0) {
          tEn += renderPlainList(allOpenOfficerJobs, false, false);
        }
        if (shouldIncludeNcm && openNcmJobs.length > 0) {
          tEn += renderPlainNcmList(openNcmJobs, false, false);
        }
        if (this.ignoreSip() && (allClosedOfficerJobs.length > 0 || (shouldIncludeNcm && closedNcmJobs.length > 0))) {
          tEn +=
            "\nImportant note regarding closed occupations: The list below includes occupations that are currently open and closed. If you choose an open occupation, we can continue processing your application immediately. However, if you choose a closed occupation (marked CLOSED), we will have to close your file and it will be your full responsibility to call us back near the end of next March to reopen your file in that occupation.\n\n";
          if (allClosedOfficerJobs.length > 0) {
            tEn += renderPlainList(allClosedOfficerJobs, true, false);
          }
          if (shouldIncludeNcm && closedNcmJobs.length > 0) {
            tEn += renderPlainNcmList(closedNcmJobs, true, false);
          }
        }
      }

      if (mergeTasks) {
        tEn += "\nNext Steps:\n";
        tEn +=
          "Due to a high volume of applications, we must prioritize files where all tasks are completed. We invite you to:\n";
        tEn +=
          `  - Visit your portal (${PORTAL_CANDIDATE_URL}) to correct without delay the tasks indicated above;\n`;
        if (isPRAdmissible) {
          tEn +=
            `  - If not already done, return to your portal (${PORTAL_CANDIDATE_URL}) to upload the transcripts from your country of origin (in their original language if in English or French, or accompanied by an official translation if needed);\n`;
        }
        tEn +=
          "  - Reply directly to this email with your reorientation choice or your new occupation choices to update your file.\n";
      } else {
        if (isPRAdmissible) {
          tEn +=
            `\nAdditionally, if you have not already done so, please return to your portal (${PORTAL_CANDIDATE_URL}) to upload your transcripts from your country of origin. These must be in English or French, or accompanied by an official translation if necessary.\n`;
        }
        tEn +=
          "\nThank you for your interest in the Canadian Armed Forces. Please inform us of your decision by replying directly to this email in order to continue or update your file.\n";
      }

      tEn +=
        "\nIf you take no action, your file will be automatically deactivated after 30 days.\n\n";
      tEn += this.sharedState.getSignatureEn() + "\n";

      const enPlain = tEn.trim();

      const divider = "\n\n______________________________________________________________________________\n\n";
      if (isEn) {
        return `Un message en français suivra.\n\n${enPlain}${divider}${frPlain}`;
      }
      return `English message will follow.\n\n${frPlain}${divider}${enPlain}`;
    }
  }
