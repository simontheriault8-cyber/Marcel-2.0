export function buildReoBilingualEmail(this: any, isHtml: boolean): string {
    const jobIds = this.eligibleJobs();
    if (!this.showResultsPanel() && jobIds.length === 0) {
      if (isHtml) {
        return '<p class="text-slate-500 italic text-center mt-10">Sélectionnez au moins un critère de scolarité ou d\'expérience pour évaluer les métiers admissibles et générer le courriel de réorientation.</p>';
      } else {
        return "Sélectionnez au moins un critère de scolarité ou d'expérience pour générer le courriel.";
      }
    }

    const isPilotEligible = jobIds.includes("00183");
    const isPRAdmissible = this.citizenship() === "PR > 3 years";
    const isPfor = this.isPforApplicant();
    const isJobClosed = (j: string) => isPfor ? this.jobService.isPforJobClosed(j, this.currentSipPhase()) : this.jobService.isJobClosed(j, this.currentSipPhase());

    const renderAllEligibleJobsHtml = (ncmJobs: string[], offJobs: string[], isFrench: boolean) => {
      let out = "";
      const openNcm = ncmJobs.filter(j => !isJobClosed(j));
      const closedNcm = ncmJobs.filter(j => isJobClosed(j));
      const openOff = offJobs.filter(j => !isJobClosed(j));
      const closedOff = offJobs.filter(j => isJobClosed(j));

      const hasClosedJobs = (closedNcm.length > 0 || closedOff.length > 0);

      const openNcmTitle = isFrench ? (this.ignoreSip() ? "Militaires du rang (Ouverts)" : "Militaires du rang") : (this.ignoreSip() ? "Non-Commissioned Members (Open)" : "Non-Commissioned Members");
      const openOffTitle = isFrench ? (this.ignoreSip() ? "Officiers (Ouverts)" : "Officiers") : (this.ignoreSip() ? "Officers (Open)" : "Officers");
      const closedNcmTitle = isFrench ? "Militaires du rang (Fermés)" : "Non-Commissioned Members (Closed)";
      const closedOffTitle = isFrench ? "Officiers (Fermés)" : "Officers (Closed)";

      const buildSection = (jobList: string[], title: string, color: string, inlineColor: string, isClosed: boolean) => {
        let sec = "";
        if (jobList.length > 0) {
          sec += `<p class="font-bold text-${color} mt-4" style="color: ${inlineColor}; font-weight: bold; margin-top: 16px;">${title} :</p>\n`;
          sec += '<ul class="list-disc pl-5 mt-1 mb-2" style="padding-left: 20px; margin-top: 4px; margin-bottom: 8px;">\n';
          for (const jId of jobList) {
            let itemStyle = isClosed ? ' style="color: #b91c1c;"' : '';
            let itemClass = isClosed ? ' class="mt-0.5 text-red-700"' : ' class="mt-0.5"';
            sec += `  <li${itemClass}${itemStyle}><strong>${jId} - ${this.getJobLinkMarkup(jId, isFrench, true)}</strong></li>\n`;
          }
          sec += "</ul>\n";
          
          if (!this.isPforApplicant()) {
            const proofsMap = new Map<string, string[]>();
            for (const jId of jobList) {
              const missing = this.getMissingProofs(jId);
              const proofs = isFrench ? missing.fr : missing.en;
              if (proofs.length > 0) proofsMap.set(jId, proofs);
            }
            if (proofsMap.size > 0) {
              sec += `<p class="mt-2 text-xs text-red-800 font-semibold font-sans" style="color: #991b1b; font-weight: 600; font-size: 12px; margin-top: 8px;">${isFrench ? "Vous devrez fournir ces documents/preuves supplémentaires si vous choisissez les métiers suivants :" : "You will need to provide these additional documents/proofs if you choose the following occupations:"}</p>\n`;
              sec += '<ul class="list-disc pl-5 mt-1 mb-2 text-xs text-slate-600" style="color: #475569; padding-left: 20px; margin-top: 4px; margin-bottom: 8px; font-size: 12px;">\n';
              for (const [jId, proofs] of proofsMap.entries()) {
                sec += `  <li class="mt-0.5"><strong>${isFrench ? "Pour" : "For"} ${jId} - ${this.getJobLinkMarkup(jId, isFrench, true)} :</strong> ` + proofs.join(", ") + "</li>\n";
              }
              sec += "</ul>\n";
            }
          }
        }
        return sec;
      };

      // 1. Open jobs first
      out += buildSection(openNcm, openNcmTitle, "blue-800", "#1e40af", false);
      out += buildSection(openOff, openOffTitle, "purple-800", "#6b21a8", false);

      // 2. Closed note right above closed jobs if ignoreSip is active and there are closed jobs
      if (this.ignoreSip() && hasClosedJobs) {
        if (isFrench) {
          out +=
            '<div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900" style="margin-top: 16px; padding: 12px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 4px; font-size: 14px; color: #713f12;">\n' +
            '  <strong>Note importante concernant les métiers fermés :</strong> La liste ci-dessous inclut des métiers actuellement ouverts et fermés. Si vous choisissez un <span style="background-color: #fef08a; font-weight: bold;">métier ouvert</span>, nous pourrons poursuivre le traitement de votre demande d\'emploi immédiatement. Par contre, si vous choisissez un <span style="background-color: #fecaca; color: #991b1b; font-weight: bold;">métier fermé</span> (marqué en rouge), nous devrons fermer votre dossier et ce sera <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de nous rappeler vers la fin du mois de mars prochain</span> pour faire rouvrir votre dossier dans ce métier.\n' +
            '</div>\n';
        } else {
          out +=
            '<div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900" style="margin-top: 16px; padding: 12px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 4px; font-size: 14px; color: #713f12;">\n' +
            '  <strong>Important note regarding closed occupations:</strong> The list below includes both currently open and closed occupations. If you choose an <span style="background-color: #fef08a; font-weight: bold;">open occupation</span>, we can continue processing your application immediately. However, if you choose a <span style="background-color: #fecaca; color: #991b1b; font-weight: bold;">closed occupation</span> (marked in red), we will have to close your file and it will be <span style="background-color: #fef08a; font-weight: bold;">your sole responsibility to call us back towards the end of next March</span> to reopen your file for this occupation.\n' +
            '</div>\n';
        }

        // 3. Closed jobs
        out += buildSection(closedNcm, closedNcmTitle, "red-800", "#991b1b", true);
        out += buildSection(closedOff, closedOffTitle, "red-800", "#991b1b", true);
      }

      return out;
    };

    const renderAllEligibleJobsPlain = (ncmJobs: string[], offJobs: string[], isFrench: boolean) => {
      let out = "";
      const openNcm = ncmJobs.filter(j => !isJobClosed(j));
      const closedNcm = ncmJobs.filter(j => isJobClosed(j));
      const openOff = offJobs.filter(j => !isJobClosed(j));
      const closedOff = offJobs.filter(j => isJobClosed(j));

      const hasClosedJobs = (closedNcm.length > 0 || closedOff.length > 0);

      const openNcmTitle = isFrench ? (this.ignoreSip() ? "Militaires du rang (Ouverts)" : "Militaires du rang") : (this.ignoreSip() ? "Non-Commissioned Members (Open)" : "Non-Commissioned Members");
      const openOffTitle = isFrench ? (this.ignoreSip() ? "Officiers (Ouverts)" : "Officiers") : (this.ignoreSip() ? "Officers (Open)" : "Officers");
      const closedNcmTitle = isFrench ? "Militaires du rang (Fermés)" : "Non-Commissioned Members (Closed)";
      const closedOffTitle = isFrench ? "Officiers (Fermés)" : "Officers (Closed)";

      const buildSection = (jobList: string[], title: string) => {
        let sec = "";
        if (jobList.length > 0) {
          sec += `\n${title} :\n`;
          for (const jId of jobList) {
            sec += `  - ${jId} - ${this.getJobLinkMarkup(jId, isFrench, false)}\n`;
          }
          if (!this.isPforApplicant()) {
            const proofsMap = new Map<string, string[]>();
            for (const jId of jobList) {
              const missing = this.getMissingProofs(jId);
              const proofs = isFrench ? missing.fr : missing.en;
              if (proofs.length > 0) proofsMap.set(jId, proofs);
            }
            if (proofsMap.size > 0) {
              sec += `\n  ${isFrench ? "Documents supplémentaires requis :" : "Additional documents required:"}\n`;
              for (const [jId, proofs] of proofsMap.entries()) {
                sec += `    * ${isFrench ? "Pour" : "For"} ${jId} : ` + proofs.join(", ") + "\n";
              }
            }
          }
        }
        return sec;
      };

      // 1. Open jobs first
      out += buildSection(openNcm, openNcmTitle);
      out += buildSection(openOff, openOffTitle);

      // 2. Closed note right above closed jobs
      if (this.ignoreSip() && hasClosedJobs) {
        if (isFrench) {
          out +=
            "\nNote importante concernant les métiers fermés :\n" +
            "La liste ci-dessous inclut des métiers actuellement ouverts et fermés. Si vous choisissez un métier ouvert, nous pourrons poursuivre le traitement de votre demande d'emploi immédiatement. Par contre, si vous choisissez un métier fermé, nous devrons fermer votre dossier et ce sera votre entière responsabilité de nous rappeler vers la fin du mois de mars prochain pour faire rouvrir votre dossier dans ce métier.\n";
        } else {
          out +=
            "\nImportant note regarding closed occupations:\n" +
            "The list below includes both currently open and closed occupations. If you choose an open occupation, we can continue processing your application immediately. However, if you choose a closed occupation, we will have to close your file and it will be your sole responsibility to call us back towards the end of next March to reopen your file for this occupation.\n";
        }

        // 3. Closed jobs
        out += buildSection(closedNcm, closedNcmTitle);
        out += buildSection(closedOff, closedOffTitle);
      }

      return out;
    };

    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter((id) => !!id);

    const hasNoJobCode = dossierIds.includes("00003");
    const realDossierIds = dossierIds.filter((id) => id !== "00003");

    // Determine which dossier jobs are closed but otherwise admissible
    const closedTraitementJobs: string[] = [];
    const closedAdmissionOnlyJobs: string[] = [];
    for (const id of realDossierIds) {
      const s = this.evaluateJobAdmissibility(id);
      if (s) {
        if (
          s.isJobClosed &&
          s.isAgeAdmissible &&
          s.isCitizenshipAdmissible &&
          s.isEducationAdmissible &&
          s.isMedicalAdmissible &&
          s.isExtraTestAdmissible
        ) {
          if (s.isClosedAdmissionOnly) {
            closedAdmissionOnlyJobs.push(id);
          } else {
            closedTraitementJobs.push(id);
          }
        }
      }
    }
    const hasTraitementClosed = closedTraitementJobs.length > 0;
    const hasAdmissionClosed = closedAdmissionOnlyJobs.length > 0;
    const hasClosedButAdmissibleJobs = hasTraitementClosed || hasAdmissionClosed;
    const closedButAdmissibleJobs = [...closedTraitementJobs, ...closedAdmissionOnlyJobs];
    const allRealDossierJobsAreClosedTraitement = realDossierIds.length > 0 && closedTraitementJobs.length === realDossierIds.length;
    const allRealDossierJobsAreClosedAdmissionOnly = realDossierIds.length > 0 && closedAdmissionOnlyJobs.length === realDossierIds.length;

    // Split eligible jobs into NCM and Officer
    const listNCM: string[] = [];
    const listOFF: string[] = [];
    for (const jId of jobIds) {
      if (this.isOfficerJob(jId)) {
        listOFF.push(jId);
      } else {
        listNCM.push(jId);
      }
    }

    const rawHtml = this.sharedState.taskEmailHtmlFr();
    
    const hasTasks =
      !!rawHtml &&
      this.sharedState.hasReassignedTasks() &&
      rawHtml.includes("Bonjour,");
    const mergeTasks = (this.sharedState.includeLinkedEmail() || (this.sharedState.hasReassignedTasks() && this.showResultsPanel())) && hasTasks;

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

    if (isHtml) {
      // ------------------ HTML VERSION ------------------
      let h = "";

      const isPforCmr = this.isPforApplicant() && this.pforType() === "cmr";
      const isPforCivil = this.isPforApplicant() && this.pforType() === "civil";
      const cmrAdmittedFr = this.getCmrAdmittedDomainsFr();

      // FRENCH SECTION
      h += '<p class="mt-4">Bonjour,</p>\n';

      if (this.isCandidateTooOld()) {
        h += '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature, nous constatons que vous devez faire l\'objet d\'une réorientation. En effet, vous dépassez l\'âge maximal d\'admissibilité pour vos choix de métiers.</p>\n';
      } else if (isPforCmr && cmrAdmittedFr) {
        h += `<p class="mt-4">Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), <strong>vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${cmrAdmittedFr} !</strong> Nous tenons à vous féliciter chaleureusement pour cette admission.</p>\n`;
      }

      if (mergeTasks) {
        // Unified smart intro explaining both tasks list and reorientation
        if (this.isCandidateTooOld()) {
          h +=
            '<p class="mt-4">De plus, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        } else if (isPforCmr && cmrAdmittedFr) {
          h +=
            '<p class="mt-4">Toutefois, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        } else if (isPforCmr) {
          h +=
            '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal)</strong>, nous constatons que certaines actions de votre part sont requises. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        } else if (isPforCivil) {
          h +=
            '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Universités civiles)</strong>, nous constatons que certaines actions de votre part sont requises. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        } else {
          h +=
            "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. En effet, vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l'objet d'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n";
        }

        // Extract tasks list body from standard task email html
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
          taskPartHtml = taskPartHtml
            .replace(
              /<p[^>]*>\s*Nous avons procédé à l'évaluation de vos documents.*?pour nous permettre de poursuivre le traitement\.\s*<\/p>/gis,
              ""
            )
            .replace(
              /Nous avons procédé à l'évaluation de vos documents\. Bien que votre dossier progresse, certains éléments ne sont pas conformes et nécessitent des corrections de votre part pour nous permettre de poursuivre le traitement\.\s*/gis,
              ""
            )
            .replace(
              /<p[^>]*>\s*<strong>\s*Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours\.\s*<\/strong>\s*<\/p>/gis,
              ""
            )
            .replace(
              /<strong>\s*Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours\.\s*<\/strong>/gis,
              ""
            )
            .trim();
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
        // Standard Reorientation Intro French
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
              "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.</p>\n";
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
          } else if (isPforCivil) {
            h +=
              "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Universités civiles)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :</p>\n";
          } else {
            h +=
              "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :</p>\n";
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
              if (s.isClosedAdmissionOnly) {
                reasonsFrList.push(
                  "Nous avons déjà un nombre suffisant de candidatures pour combler toutes les positions restantes.",
                );
              } else if (this.isPforApplicant()) {
                reasonsFrList.push(
                  "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).",
                );
              } else {
                reasonsFrList.push(
                  "Il n'y a plus de postes disponibles pour ce métier.",
                );
              }
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
            if (s.isExtraTestRequired && !s.isExtraTestAdmissible && s.extraTestReasonFr) {
              reasonsFrList.push(s.extraTestReasonFr);
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
            "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles ou que vous n'y êtes pas admissible d'après nos critères.</p>\n";
        }
      }

      // Options French
      if (this.isCandidateTooOld() && jobIds.length === 0) {
        h += '<p class="mt-4 font-semibold text-slate-800">Conclusion :</p>\n';
        if (this.age() !== null && this.age()! >= 57) {
          h += '<p class="mt-2 text-sm">Étant donné que vous avez atteint ou dépassé l\'âge maximal d\'enrôlement (57 ans et plus), aucun métier ne peut vous être offert au sein des Forces armées canadiennes.</p>\n';
        } else {
          h += '<p class="mt-2 text-sm">Étant donné votre âge actuel, aucun métier admissible n\'est actuellement disponible pour votre candidature.</p>\n';
        }
      } else {
        h +=
          '<p class="mt-4 font-semibold text-slate-800">Voici les options qui s\'offrent à vous :</p>\n';
        if (hasTraitementClosed && hasAdmissionClosed) {
          const isPluralTraitement = closedTraitementJobs.length > 1;
          const opt1Title = isPluralTraitement
            ? 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mes choix de métiers (' + closedTraitementJobs.join(", ") + ')'
            : 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mon choix de métier (' + closedTraitementJobs.join(", ") + ')';
          const opt1MetiersDesc = isPluralTraitement
            ? 'vos choix de métiers (<strong>' + closedTraitementJobs.join(", ") + '</strong>)'
            : 'votre choix de métier (<strong>' + closedTraitementJobs.join(", ") + '</strong>)';

          const isPluralAdmission = closedAdmissionOnlyJobs.length > 1;
          const opt2Title = isPluralAdmission
            ? 'Option 2 : Conserver mes choix de métiers (' + closedAdmissionOnlyJobs.join(", ") + ') au cas où une position se libèrerait'
            : 'Option 2 : Conserver mon choix de métier (' + closedAdmissionOnlyJobs.join(", ") + ') au cas où une position se libèrerait';
          const opt2MetiersDesc = isPluralAdmission
            ? 'vos choix de métiers (<strong>' + closedAdmissionOnlyJobs.join(", ") + '</strong>)'
            : 'votre choix de métier (<strong>' + closedAdmissionOnlyJobs.join(", ") + '</strong>)';
          const opt2Refer = isPluralAdmission ? 'vos choix de métiers' : 'votre choix de métier';

          h +=
            '<p class="mt-2 text-sm"><strong>' + opt1Title + '</strong><br>Vous pouvez conserver ' + opt1MetiersDesc + ' et attendre que les prochaines positions ouvrent en avril prochain. Cependant, <span style="background-color: #fef08a; font-weight: bold;">votre dossier sera fermé dès maintenant</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement</span>.</p>\n';
          h +=
            '<p class="mt-4 text-sm"><strong>' + opt2Title + '</strong><br>Vous pouvez conserver ' + opt2MetiersDesc + ' au cas où un autre postulant déjà admis ne termine pas le processus et qu’une position se libère. Cependant, <span style="background-color: #fef08a; font-weight: bold;">votre dossier sera fermé dès maintenant</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de contacter votre centre de recrutement à tous les trois mois</span> pour savoir si des positions se seraient libérées pour ' + opt2Refer + ' afin de poursuivre le processus de recrutement.</p>\n';
          h +=
            '<p class="mt-4 text-sm"><strong>Option 3 : Choisir un autre métier parmi la liste des métiers admissibles</strong><br>Vous pouvez réorienter votre candidature vers d\'autres choix de métiers admissibles dès maintenant. Pour ces métiers, l\'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Consultez la liste ci-dessous.</p>\n';
        } else if (hasTraitementClosed) {
          const isPluralTraitement = closedTraitementJobs.length > 1;
          const opt1Title = isPluralTraitement
            ? 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mes choix de métiers (' + closedTraitementJobs.join(", ") + ')'
            : 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mon choix de métier (' + closedTraitementJobs.join(", ") + ')';
          const opt1MetiersDesc = isPluralTraitement
            ? 'vos choix de métiers (<strong>' + closedTraitementJobs.join(", ") + '</strong>)'
            : 'votre choix de métier (<strong>' + closedTraitementJobs.join(", ") + '</strong>)';
          h +=
            '<p class="mt-2 text-sm"><strong>' + opt1Title + '</strong><br>Vous pouvez conserver ' + opt1MetiersDesc + ' et attendre que les prochaines positions ouvrent en avril prochain. Cependant, <span style="background-color: #fef08a; font-weight: bold;">votre dossier sera fermé dès maintenant</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement</span>.</p>\n';
          h +=
            '<p class="mt-4 text-sm"><strong>Option 2 : Choisir un autre métier parmi la liste des métiers admissibles</strong><br>Vous pouvez réorienter votre candidature vers d\'autres choix de métiers admissibles dès maintenant. Pour ces métiers, l\'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Consultez la liste ci-dessous.</p>\n';
        } else if (hasAdmissionClosed) {
          const isPluralAdmission = closedAdmissionOnlyJobs.length > 1;
          const opt1Title = isPluralAdmission
            ? 'Option 1 : Conserver mes choix de métiers (' + closedAdmissionOnlyJobs.join(", ") + ') au cas où une position se libèrerait'
            : 'Option 1 : Conserver mon choix de métier (' + closedAdmissionOnlyJobs.join(", ") + ') au cas où une position se libèrerait';
          const opt1MetiersDesc = isPluralAdmission
            ? 'vos choix de métiers (<strong>' + closedAdmissionOnlyJobs.join(", ") + '</strong>)'
            : 'votre choix de métier (<strong>' + closedAdmissionOnlyJobs.join(", ") + '</strong>)';
          const opt1Refer = isPluralAdmission ? 'vos choix de métiers' : 'votre choix de métier';
          h +=
            '<p class="mt-2 text-sm"><strong>' + opt1Title + '</strong><br>Vous pouvez conserver ' + opt1MetiersDesc + ' au cas où un autre postulant déjà admis ne termine pas le processus et qu’une position se libère. Cependant, <span style="background-color: #fef08a; font-weight: bold;">votre dossier sera fermé dès maintenant</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de contacter votre centre de recrutement à tous les trois mois</span> pour savoir si des positions se seraient libérées pour ' + opt1Refer + ' afin de poursuivre le processus de recrutement.</p>\n';
          h +=
            '<p class="mt-4 text-sm"><strong>Option 2 : Choisir un autre métier parmi la liste des métiers admissibles</strong><br>Vous pouvez réorienter votre candidature vers d\'autres choix de métiers admissibles dès maintenant. Pour ces métiers, l\'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Consultez la liste ci-dessous.</p>\n';
        } else {
          h +=
            '<p class="mt-2 text-sm"><strong>Choisir un autre métier parmi la liste des métiers admissibles</strong><br>Vous devez réorienter votre candidature vers un choix de métier pour lequel vous êtes admissible afin de poursuivre le processus d\'enrôlement. Pour ces métiers, l\'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Veuillez consulter la liste ci-dessous.</p>\n';
        }
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

      if (listNCM.length === 0 && listOFF.length === 0) {
        h += '<p class="mt-2 text-slate-700 italic">' + (this.isPforApplicant() ? "Aucun métier PFOR ouvert correspondant n'est disponible actuellement pour la sélection effectuée." : "Aucun métier correspondant disponible.") + '</p>\n';
      } else {
        h += renderAllEligibleJobsHtml(listNCM, listOFF, true);
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
          '  <li>Vous rendre sur votre portail (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) afin de corriger sans délai les tâches indiquées ci-dessus ;</li>\n';
        if (isPRAdmissible) {
          h +=
            '  <li>Si ce n\'est pas déjà fait, retourner sur votre portail (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) afin d\'y déposer les relevés de notes de votre pays d\'origine (dans leur langue d\'origine s\'ils sont en français ou en anglais, ou accompagnés d\'une traduction officielle au besoin) ;</li>\n';
        }
        h +=
          "  <li>Répondre directement à ce courriel avec votre choix de réorientation ou vos nouveaux choix de métiers pour mettre à jour votre dossier.</li>\n";
        h += "</ul>\n";
      } else {
        if (isPRAdmissible) {
          h +=
            '<p class="mt-4 text-sm text-slate-700">De plus, si ce n\'est pas déjà fait, veuillez retourner sur votre portail (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) afin d\'y déposer les relevés de notes de votre pays d\'origine. Ceux-ci doivent être rédigés en français ou en anglais, ou être accompagnés d\'une traduction officielle au besoin.</p>\n';
        }
        h +=
          '<p class="mt-4">Nous vous remercions pour votre intérêt envers les Forces armées canadiennes. Veuillez nous faire part de votre décision en répondant directement à ce courriel afin de poursuivre ou de mettre à jour votre dossier.</p>\n';
      }

      // Warning French
      h +=
        '<p class="mt-4 text-sm text-slate-600">Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.</p>\n';

      // Signature French
      h += '<p>' + this.sharedState.getHtmlSignatureFr() + '</p>\n';

      const frHtml = h;
      h = "";

      // ======================================
      // ENGLISH SECTION
      // ======================================
      h += '<p class="mt-4">Hello,</p>\n';

      const cmrAdmittedEn = this.getCmrAdmittedDomainsEn();
      if (this.isCandidateTooOld()) {
        if (this.age() !== null && this.age()! >= 57) {
          h += '<p class="mt-4">Following the analysis of your application file, we inform you that you exceed the maximum eligibility age for enrollment in the Canadian Armed Forces (maximum eligibility age is 56, 57 and older being automatically ineligible).</p>\n';
        } else {
          h += '<p class="mt-4">Following the analysis of your application file, we have determined that you must undergo a reorientation. Indeed, you exceed the maximum eligibility age for your selected occupations.</p>\n';
        }
      } else if (isPforCmr && cmrAdmittedEn) {
        h += `<p class="mt-4">We are pleased to inform you that, following the assessment of your transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), <strong>you have been admitted to RMC in the following field(s) of study: ${cmrAdmittedEn} !</strong> We would like to warmly congratulate you on your admission.</p>\n`;
      }

      if (mergeTasks) {
        // Unified smart English intro
        if (this.isCandidateTooOld()) {
          h +=
            '<p class="mt-4">In addition, actions are required on your part to proceed with processing your application. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>\n';
        } else if (isPforCmr && cmrAdmittedEn) {
          h +=
            '<p class="mt-4">However, actions are required on your part to proceed with processing your application. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>\n';
        } else if (isPforCmr) {
          h +=
            '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Royal Military College)</strong>, actions are required on your part. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>\n';
        } else if (isPforCivil) {
          h +=
            '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (Civilian University ROTP)</strong>, actions are required on your part. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>\n';
        } else {
          h +=
            '<p class="mt-4">Following the analysis of your application file, we have determined that actions are required on your part to proceed with processing your application. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>\n';
        }

        let taskPartHtmlEn = "";
        if (rawHtml.includes("<!-- START_TASK_BODY_EN -->")) {
          const enParts = rawHtml.split("<!-- START_TASK_BODY_EN -->");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("<!-- END_TASK_BODY_EN -->");
            if (enBodyPart.length > 0) {
              taskPartHtmlEn = enBodyPart[0].trim();
            }
          }
        } else {
          const enParts = rawHtml.split("<p>Hello,</p>");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("<p>Due to the high volume");
            if (enBodyPart.length > 0 && enBodyPart[0].trim().length > 0) {
              taskPartHtmlEn = enBodyPart[0].trim();
            }
          }
        }

        if (taskPartHtmlEn) {
          taskPartHtmlEn = taskPartHtmlEn
            .replace(
              /<p[^>]*>\s*We have evaluated your documents.*?to allow us to continue processing\.\s*<\/p>/gis,
              ""
            )
            .replace(
              /We have evaluated your documents\. While your application is progressing, some items are not compliant and require corrections on your part to allow us to continue processing\.\s*/gis,
              ""
            )
            .replace(
              /<p[^>]*>\s*<strong>\s*If you take no action, your file will be automatically deactivated after 30 days\.\s*<\/strong>\s*<\/p>/gis,
              ""
            )
            .replace(
              /<strong>\s*If you take no action, your file will be automatically deactivated after 30 days\.\s*<\/strong>/gis,
              ""
            )
            .trim();
          h +=
            '<div class="mt-4 p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-sm">\n';
          h +=
            '<p class="font-bold text-black border-b border-amber-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">1. TASKS AND COMMUNICATIONS TO CORRECT ON YOUR PORTAL :</p>\n';
          h += taskPartHtmlEn + "\n";
          h += "</div>\n";
        }

        h +=
          '<p class="mt-6 font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">2. STATUS OF YOUR CURRENT OCCUPATIONS AND REQUIRED REORIENTATION :</p>\n';
      } else {
        // Standard English intro
        if (hasNoJobCode) {
          if (this.isCandidateTooOld()) {
            h +=
              '<p class="mt-4">In addition, no occupation is currently selected in your file, and the processing of your application cannot continue without an eligible occupation choice from you.</p>\n';
          } else if (isPforCmr && cmrAdmittedEn) {
            h +=
              '<p class="mt-4">However, no occupation is currently selected in your file, and the processing of your application cannot continue without an eligible occupation choice from you.</p>\n';
          } else if (isPforCmr) {
            h +=
              '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Royal Military College)</strong>, we have determined that you must undergo a reorientation. Indeed, no occupation is currently selected in your file, and the processing of your application cannot continue without an occupation choice from you.</p>\n';
          } else {
            h +=
              '<p class="mt-4">Following the analysis of your application file, we have determined that you must undergo a reorientation. Indeed, no occupation is currently selected in your file, and the processing of your application cannot continue without an occupation choice from you.</p>\n';
          }
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (mergeTasks) {
            h +=
              '<p class="mt-2">Here is the current status of the occupations in your file:</p>\n';
          } else if (this.isCandidateTooOld()) {
            h +=
              '<p class="mt-4">Here is the current status of the occupations in your file:</p>\n';
          } else if (isPforCmr && cmrAdmittedEn) {
            h +=
              '<p class="mt-4">However, following the review of your current occupation choices, a reorientation is required. Here is the current status of the occupations in your file:</p>\n';
          } else if (isPforCmr) {
            h +=
              '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Royal Military College)</strong>, here is the current status of the occupations in your file:</p>\n';
          } else if (isPforCivil) {
            h +=
              '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (Civilian University ROTP)</strong>, here is the current status of the occupations in your file:</p>\n';
          } else {
            h +=
              '<p class="mt-4">Following the analysis of your application file, we have determined that you must undergo a reorientation. Here is the current status of the occupations in your file:</p>\n';
          }
        } else {
          h +=
            '<p class="mt-4">Here is the current status of the other occupations in your file:</p>\n';
        }
        h += '<ul class="list-disc pl-5 mt-2 mb-4">\n';
        for (const id of realDossierIds) {
          const nameEn = `${id} - ${this.getJobLinkMarkup(id, false, true)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonEn = "";
          if (s) {
            const reasonsEnList: string[] = [];
            if (s.isJobClosed) {
              if (s.isClosedAdmissionOnly) {
                reasonsEnList.push(
                  "We already have a sufficient number of applications to fill all remaining positions.",
                );
              } else if (this.isPforApplicant()) {
                reasonsEnList.push(
                  "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).",
                );
              } else {
                reasonsEnList.push(
                  "There are no longer positions available for this occupation.",
                );
              }
            }
            if (!s.isAgeAdmissible) {
              reasonsEnList.push(s.ageReasonEn);
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsEnList.push(
                "For various reasons, this occupation is not accessible to permanent residents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsEnList.push(s.educationReasonEn);
            }
            if (!s.isMedicalAdmissible) {
              reasonsEnList.push(s.medicalReasonEn);
            }
            if (s.isExtraTestRequired && !s.isExtraTestAdmissible && s.extraTestReasonEn) {
              reasonsEnList.push(s.extraTestReasonEn);
            }

            if (reasonsEnList.length > 0) {
              reasonEn = `\n    <ul class="list-disc pl-5 mt-1 text-sm text-slate-600">\n      <li>${reasonsEnList.join("</li>\n      <li>")}</li>\n    </ul>`;
            } else {
              reasonEn =
                ": Admissible (reorientation initiated due to other elements of your file).";
            }
          }
          h += `  <li class="mt-1"><strong>${nameEn}</strong>${reasonEn}</li>\n`;
        }
        h += "</ul>\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          h +=
            '<p class="mt-4">Following the analysis of your application file, your current occupational choices are unavailable under ROTP or require a field of study different from your RMC admission.</p>\n';
        } else {
          h +=
            '<p class="mt-4">Following the analysis of your application file, we have determined that your current occupational choices are currently unavailable or you do not qualify for them based on our criteria.</p>\n';
        }
      }

      // Options English
      if (this.isCandidateTooOld() && jobIds.length === 0) {
        h += '<p class="mt-4 font-semibold text-slate-800">Conclusion :</p>\n';
        if (this.age() !== null && this.age()! >= 57) {
          h += '<p class="mt-2 text-sm">Given that you have reached or exceeded the maximum enrollment age (57 and older), no occupation can be offered to you within the Canadian Armed Forces.</p>\n';
        } else {
          h += '<p class="mt-2 text-sm">Given your current age, no eligible occupation is currently available for your application.</p>\n';
        }
      } else {
        h +=
          '<p class="mt-4 font-semibold text-slate-800">Here are the options available to you:</p>\n';
        if (hasTraitementClosed && hasAdmissionClosed) {
          const isPluralTraitementEn = closedTraitementJobs.length > 1;
          const opt1TitleEn = isPluralTraitementEn
            ? 'Option 1: Close my file and wait for the next open positions for my occupational choices (' + closedTraitementJobs.join(", ") + ')'
            : 'Option 1: Close my file and wait for the next open positions for my occupational choice (' + closedTraitementJobs.join(", ") + ')';
          const opt1OccupationsEn = isPluralTraitementEn
            ? 'your occupational choices (<strong>' + closedTraitementJobs.join(", ") + '</strong>)'
            : 'your occupational choice (<strong>' + closedTraitementJobs.join(", ") + '</strong>)';

          const isPluralAdmissionEn = closedAdmissionOnlyJobs.length > 1;
          const opt2TitleEn = isPluralAdmissionEn
            ? 'Option 2: Retain my occupational choices (' + closedAdmissionOnlyJobs.join(", ") + ') in case a position opens up'
            : 'Option 2: Retain my occupational choice (' + closedAdmissionOnlyJobs.join(", ") + ') in case a position opens up';
          const opt2OccupationsEn = isPluralAdmissionEn
            ? 'your occupational choices (<strong>' + closedAdmissionOnlyJobs.join(", ") + '</strong>)'
            : 'your occupational choice (<strong>' + closedAdmissionOnlyJobs.join(", ") + '</strong>)';
          const opt2ReferEn = isPluralAdmissionEn ? 'your occupational choices' : 'your occupational choice';

          h +=
            '<p class="mt-2 text-sm"><strong>' + opt1TitleEn + '</strong><br>You can retain ' + opt1OccupationsEn + ' and wait until next April for positions to open. However, <span style="background-color: #fef08a; font-weight: bold;">your file will be closed immediately</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process</span>.</p>\n';
          h +=
            '<p class="mt-4 text-sm"><strong>' + opt2TitleEn + '</strong><br>You can retain ' + opt2OccupationsEn + ' in case another candidate already admitted does not complete the process and a position opens up. However, <span style="background-color: #fef08a; font-weight: bold;">your file will be closed immediately</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your sole responsibility to contact your recruiting centre every three months</span> to find out if positions have opened up for ' + opt2ReferEn + ' in order to continue the recruitment process.</p>\n';
          h +=
            '<p class="mt-4 text-sm"><strong>Option 3: Choose another occupation from the list of eligible occupations</strong><br>You can redirect your application to other eligible occupational choices right now. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.</p>\n';
        } else if (hasTraitementClosed) {
          const isPluralTraitementEn = closedTraitementJobs.length > 1;
          const opt1TitleEn = isPluralTraitementEn
            ? 'Option 1: Close my file and wait for the next open positions for my occupational choices (' + closedTraitementJobs.join(", ") + ')'
            : 'Option 1: Close my file and wait for the next open positions for my occupational choice (' + closedTraitementJobs.join(", ") + ')';
          const opt1OccupationsEn = isPluralTraitementEn
            ? 'your occupational choices (<strong>' + closedTraitementJobs.join(", ") + '</strong>)'
            : 'your occupational choice (<strong>' + closedTraitementJobs.join(", ") + '</strong>)';
          h +=
            '<p class="mt-2 text-sm"><strong>' + opt1TitleEn + '</strong><br>You can retain ' + opt1OccupationsEn + ' and wait until next April for positions to open. However, <span style="background-color: #fef08a; font-weight: bold;">your file will be closed immediately</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process</span>.</p>\n';
          h +=
            '<p class="mt-4 text-sm"><strong>Option 2: Choose another occupation from the list of eligible occupations</strong><br>You can redirect your application to other eligible occupational choices right now. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.</p>\n';
        } else if (hasAdmissionClosed) {
          const isPluralAdmissionEn = closedAdmissionOnlyJobs.length > 1;
          const opt1TitleEn = isPluralAdmissionEn
            ? 'Option 1: Retain my occupational choices (' + closedAdmissionOnlyJobs.join(", ") + ') in case a position opens up'
            : 'Option 1: Retain my occupational choice (' + closedAdmissionOnlyJobs.join(", ") + ') in case a position opens up';
          const opt1OccupationsEn = isPluralAdmissionEn
            ? 'your occupational choices (<strong>' + closedAdmissionOnlyJobs.join(", ") + '</strong>)'
            : 'your occupational choice (<strong>' + closedAdmissionOnlyJobs.join(", ") + '</strong>)';
          const opt1ReferEn = isPluralAdmissionEn ? 'your occupational choices' : 'your occupational choice';
          h +=
            '<p class="mt-2 text-sm"><strong>' + opt1TitleEn + '</strong><br>You can retain ' + opt1OccupationsEn + ' in case another candidate already admitted does not complete the process and a position opens up. However, <span style="background-color: #fef08a; font-weight: bold;">your file will be closed immediately</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your sole responsibility to contact your recruiting centre every three months</span> to find out if positions have opened up for ' + opt1ReferEn + ' in order to continue the recruitment process.</p>\n';
          h +=
            '<p class="mt-4 text-sm"><strong>Option 2: Choose another occupation from the list of eligible occupations</strong><br>You can redirect your application to other eligible occupational choices right now. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.</p>\n';
        } else {
          h +=
            '<p class="mt-2 text-sm"><strong>Choose another occupation from the list of eligible occupations</strong><br>You must redirect your application to an occupational choice for which you are eligible to continue the enrollment process. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.</p>\n';
        }
      }

      // Eligible Jobs English Division
      h +=
        '<div class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
      h +=
        '<p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">ELIGIBLE OCCUPATIONS:</p>\n';

      if (isPilotEligible) {
        h +=
          '<div class="mt-2 mb-3 p-3 bg-amber-50 border border-amber-300 rounded text-amber-900 text-xs" style="margin-top: 8px; margin-bottom: 12px; padding: 10px; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; font-size: 13px; color: #78350f;">\n' +
          '  <strong>Important – Selection of the Pilot Occupation (00183):</strong> As the Pilot occupation is highly competitive (very limited number of positions available), if you choose Pilot, you must also select a second occupation from the list of eligible occupations.\n' +
          '</div>\n';
      }

      if (listNCM.length === 0 && listOFF.length === 0) {
        h += '<p class="mt-2 text-slate-700 italic">' + (this.isPforApplicant() ? "No matching open ROTP occupations are currently available for the selected options." : "No matching occupations available.") + '</p>\n';
      } else {
        h += renderAllEligibleJobsHtml(listNCM, listOFF, false);
      }
      h += "</div>\n";

      // Conclusion English
      if (mergeTasks) {
        h +=
          '<p class="mt-6 font-semibold text-slate-800">Next steps:</p>\n';
        h +=
          "<p>Due to the high volume of applications, we must prioritize processing files for which all tasks are completed. We therefore invite you to:</p>\n";
        h += '<ul class="list-disc pl-5 mt-1 mb-2 text-sm text-slate-700">\n';
        h +=
          '  <li>Visit your portal (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) to correct the tasks indicated above without delay;</li>\n';
        if (isPRAdmissible) {
          h +=
            '  <li>If not already done, return to your portal (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) to upload the transcripts from your country of origin (in their original language if they are in English or French, or accompanied by an official translation if needed);</li>\n';
        }
        h +=
          "  <li>Reply directly to this email with your reorientation choice or your new occupational choices to update your file.</li>\n";
        h += "</ul>\n";
      } else {
        if (isPRAdmissible) {
          h +=
            '<p class="mt-4 text-sm text-slate-700">Additionally, if not already done, please return to your portal (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) to upload the transcripts from your country of origin. These documents must be in English or French, or accompanied by an official translation if needed.</p>\n';
        }
        h +=
          '<p class="mt-4">We thank you for your interest in the Canadian Armed Forces. Please let us know your decision by replying directly to this email so that we can update your file.</p>\n';
      }

      // Warning English
      h +=
        '<p class="mt-4 text-sm text-slate-600">If you do not take any action, your file will be automatically deactivated after 30 days.</p>\n';

      // Signature English
      h += '<p>' + this.sharedState.getHtmlSignatureEn() + '</p>\n';

      const enHtml = h;

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
      // ------------------ PLAIN TEXT VERSION ------------------
      let p = "";

      const isPforCmr = this.isPforApplicant() && this.pforType() === "cmr";
      const isPforCivil = this.isPforApplicant() && this.pforType() === "civil";
      const cmrAdmittedFr = this.getCmrAdmittedDomainsFr();

      p += "Bonjour,\n\n";

      if (isPforCmr && cmrAdmittedFr) {
        p += `Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${cmrAdmittedFr} ! Nous tenons à vous féliciter chaleureusement pour cette admission.\n\n`;
      }

      if (mergeTasks) {
        if (isPforCmr && cmrAdmittedFr) {
          p += "Toutefois, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        } else if (isPforCmr) {
          p += "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal), nous constatons que certaines actions de votre part sont requises. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        } else if (isPforCivil) {
          p += "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que certaines actions de votre part sont requises. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        } else {
          p += "Suite à l'analyse de votre dossier de candidature, nous constatons que certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. En effet, vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        }
        const tasksTxt = this.sharedState.taskEmailFr();
        const frParts = tasksTxt.split("Bonjour,");
        if (frParts.length > 1) {
          let frBodyPart: string[] = [];
          if (frParts[1].includes("Si vous ne prenez aucune action, votre dossier sera désactivé")) {
            frBodyPart = frParts[1].split("Si vous ne prenez aucune action, votre dossier sera désactivé");
          } else {
            frBodyPart = frParts[1].split("\n\nEn raison du volume");
          }
          if (frBodyPart.length > 0 && frBodyPart[0].trim().length > 0) {
            let taskTextFr = frBodyPart[0].trim();
            taskTextFr = taskTextFr
              .replace(
                /Nous avons procédé à l'évaluation de vos documents.*?pour nous permettre de poursuivre le traitement\.\s*/gis,
                ""
              )
              .trim();
            p += "==================================================\n";
            p += "1. TÂCHES ET COMMUNICATIONS À CORRIGER SUR VOTRE PORTAIL :\n";
            p += "==================================================\n\n";
            p += taskTextFr + "\n\n";
          }
        }
        p += "==================================================\n";
        p += "2. STATUT DE VOS CHOIX DE MÉTIERS ACTUELS ET RÉORIENTATION REQUISE :\n";
        p += "==================================================\n\n";
      }

      // Intro French
      if (this.isCandidateTooOld()) {
        if (this.age() !== null && this.age()! >= 57) {
          p += "Suite à l'analyse de votre dossier de candidature, nous vous informons que vous dépassez l'âge maximal d'admissibilité pour l'enrôlement dans les Forces armées canadiennes (l'âge maximal d'admissibilité est de 56 ans, 57 ans et plus étant automatiquement inadmissible).\n\n";
        } else {
          p += "Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, vous dépassez l'âge maximal d'admissibilité pour vos choix de métiers.\n\n";
        }
      } else if (isPforCmr && cmrAdmittedFr) {
        p += `Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${cmrAdmittedFr} ! Nous tenons à vous féliciter chaleureusement pour cette admission.\n\n`;
      }

      if (hasNoJobCode) {
        if (this.isCandidateTooOld()) {
          p +=
            "De plus, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.\n\n";
        } else if (isPforCmr && cmrAdmittedFr) {
          p +=
            "Toutefois, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.\n\n";
        } else if (isPforCmr) {
          p +=
            "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal), nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.\n\n";
        } else {
          p +=
            "Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.\n\n";
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (mergeTasks) {
            p +=
              "Voici le statut des métiers actuellement inscrits à votre dossier :\n";
          } else if (this.isCandidateTooOld()) {
            p +=
              "Voici le statut des métiers actuellement inscrits à votre dossier :\n";
          } else if (isPforCmr && cmrAdmittedFr) {
            p +=
              "Toutefois, suite à l'analyse de vos choix de métiers actuels, nous constatons qu'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :\n";
          } else if (isPforCmr) {
            p +=
              "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal), nous constatons qu'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :\n";
          } else if (isPforCivil) {
            p +=
              "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :\n";
          } else {
            p +=
              "Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :\n";
          }
        } else {
          p +=
            "Voici le statut des autres métiers inscrits à votre dossier :\n";
        }
        for (const id of realDossierIds) {
          const name = `${id} - ${this.getJobLinkMarkup(id, true, false)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonFr = "";
          if (s) {
            const reasonsFrList: string[] = [];
            if (s.isJobClosed) {
              if (s.isClosedAdmissionOnly) {
                reasonsFrList.push(
                  "Nous avons déjà un nombre suffisant de candidatures pour combler toutes les positions restantes.",
                );
              } else if (this.isPforApplicant()) {
                reasonsFrList.push(
                  "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).",
                );
              } else {
                reasonsFrList.push(
                  "Il n'y a plus de postes disponibles pour ce métier.",
                );
              }
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
            if (s.isExtraTestRequired && !s.isExtraTestAdmissible && s.extraTestReasonFr) {
              reasonsFrList.push(s.extraTestReasonFr);
            }

            if (reasonsFrList.length > 0) {
              reasonFr = `\n    - ${reasonsFrList.join("\n    - ")}`;
            } else {
              reasonFr =
                " : Admissible (réorientation initiée pour d'autres éléments).";
            }
          }
          p += `- ${name}${reasonFr}\n`;
        }
        p += "\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          p +=
            "Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou requièrent un domaine d'études différent de votre admission au CMR.\n\n";
        } else {
          p +=
            "Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles ou que vous n'y êtes pas admissible.\n\n";
        }
      }

      // Options French
      if (this.isCandidateTooOld() && jobIds.length === 0) {
        p += "Conclusion :\n";
        if (this.age() !== null && this.age()! >= 57) {
          p += "Étant donné que vous avez atteint ou dépassé l'âge maximal d'enrôlement (57 ans et plus), aucun métier ne peut vous être offert au sein des Forces armées canadiennes.\n\n";
        } else {
          p += "Étant donné votre âge actuel, aucun métier admissible n'est actuellement disponible pour votre candidature.\n\n";
        }
      } else {
        p += "Voici les options qui s'offrent à vous :\n\n";
        if (hasTraitementClosed && hasAdmissionClosed) {
          const isPluralTraitement = closedTraitementJobs.length > 1;
          const opt1Title = isPluralTraitement
            ? 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mes choix de métiers (' + closedTraitementJobs.join(", ") + ')'
            : 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mon choix de métier (' + closedTraitementJobs.join(", ") + ')';
          const opt1MetiersDesc = isPluralTraitement
            ? 'vos choix de métiers (' + closedTraitementJobs.join(", ") + ')'
            : 'votre choix de métier (' + closedTraitementJobs.join(", ") + ')';

          const isPluralAdmission = closedAdmissionOnlyJobs.length > 1;
          const opt2Title = isPluralAdmission
            ? 'Option 2 : Conserver mes choix de métiers (' + closedAdmissionOnlyJobs.join(", ") + ') au cas où une position se libèrerait'
            : 'Option 2 : Conserver mon choix de métier (' + closedAdmissionOnlyJobs.join(", ") + ') au cas où une position se libèrerait';
          const opt2MetiersDesc = isPluralAdmission
            ? 'vos choix de métiers (' + closedAdmissionOnlyJobs.join(", ") + ')'
            : 'votre choix de métier (' + closedAdmissionOnlyJobs.join(", ") + ')';
          const opt2Refer = isPluralAdmission ? 'vos choix de métiers' : 'votre choix de métier';

          p += opt1Title + "\n";
          p += "Vous pouvez conserver " + opt1MetiersDesc + " et attendre que les prochaines positions ouvrent en avril prochain. Cependant, votre dossier sera fermé dès maintenant et il sera de votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement.\n\n";

          p += opt2Title + "\n";
          p += "Vous pouvez conserver " + opt2MetiersDesc + " au cas où un autre postulant déjà admis ne termine pas le processus et qu’une position se libère. Cependant, votre dossier sera fermé dès maintenant et il sera de votre entière responsabilité de contacter votre centre de recrutement à tous les trois mois pour savoir si des positions se seraient libérées pour " + opt2Refer + " afin de poursuivre le processus de recrutement.\n\n";

          p += "Option 3 : Choisir un autre métier parmi la liste des métiers admissibles\n";
          p += "Vous pouvez réorienter votre candidature vers d'autres choix de métiers admissibles dès maintenant. Pour ces métiers, l'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Consultez la liste ci-dessous.\n\n";
        } else if (hasTraitementClosed) {
          const isPluralTraitement = closedTraitementJobs.length > 1;
          const opt1Title = isPluralTraitement
            ? 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mes choix de métiers (' + closedTraitementJobs.join(", ") + ')'
            : 'Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mon choix de métier (' + closedTraitementJobs.join(", ") + ')';
          const opt1MetiersDesc = isPluralTraitement
            ? 'vos choix de métiers (' + closedTraitementJobs.join(", ") + ')'
            : 'votre choix de métier (' + closedTraitementJobs.join(", ") + ')';
          p += opt1Title + "\n";
          p += "Vous pouvez conserver " + opt1MetiersDesc + " et attendre que les prochaines positions ouvrent en avril prochain. Cependant, votre dossier sera fermé dès maintenant et il sera de votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement.\n\n";
          p += "Option 2 : Choisir un autre métier parmi la liste des métiers admissibles\n";
          p += "Vous pouvez réorienter votre candidature vers d'autres choix de métiers admissibles dès maintenant. Pour ces métiers, l'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Consultez la liste ci-dessous.\n\n";
        } else if (hasAdmissionClosed) {
          const isPluralAdmission = closedAdmissionOnlyJobs.length > 1;
          const opt1Title = isPluralAdmission
            ? 'Option 1 : Conserver mes choix de métiers (' + closedAdmissionOnlyJobs.join(", ") + ') au cas où une position se libèrerait'
            : 'Option 1 : Conserver mon choix de métier (' + closedAdmissionOnlyJobs.join(", ") + ') au cas où une position se libèrerait';
          const opt1MetiersDesc = isPluralAdmission
            ? 'vos choix de métiers (' + closedAdmissionOnlyJobs.join(", ") + ')'
            : 'votre choix de métier (' + closedAdmissionOnlyJobs.join(", ") + ')';
          const opt1Refer = isPluralAdmission ? 'vos choix de métiers' : 'votre choix de métier';
          p += opt1Title + "\n";
          p += "Vous pouvez conserver " + opt1MetiersDesc + " au cas où un autre postulant déjà admis ne termine pas le processus et qu’une position se libère. Cependant, votre dossier sera fermé dès maintenant et il sera de votre entière responsabilité de contacter votre centre de recrutement à tous les trois mois pour savoir si des positions se seraient libérées pour " + opt1Refer + " afin de poursuivre le processus de recrutement.\n\n";
          p += "Option 2 : Choisir un autre métier parmi la liste des métiers admissibles\n";
          p += "Vous pouvez réorienter votre candidature vers d'autres choix de métiers admissibles dès maintenant. Pour ces métiers, l'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Consultez la liste ci-dessous.\n\n";
        } else {
          p += "Choisir un autre métier parmi la liste des métiers admissibles\n";
          p += "Vous devez réorienter votre candidature vers un choix de métier pour lequel vous êtes admissible afin de poursuivre le processus d'enrôlement. Pour ces métiers, l'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Veuillez consulter la liste ci-dessous.\n\n";
        }
      }

      // Eligible Jobs French Division
      p += "--------------------------------------------------\n";
      p += "MÉTIERS ADMISSIBLES :\n";
      p += "--------------------------------------------------\n";

      if (isPilotEligible) {
        p += "\nAttention – Choix du métier de Pilote (00183) :\n";
        p += "Le métier de Pilote étant fortement contingenté (nombre de places très limité), si vous choisissez ce métier, vous devez obligatoirement sélectionner un deuxième métier parmi la liste des métiers admissibles.\n\n";
      }

      if (listNCM.length === 0 && listOFF.length === 0) {
        p += (this.isPforApplicant() ? "Aucun métier PFOR ouvert correspondant n'est disponible actuellement pour la sélection effectuée.\n\n" : "Aucun métier correspondant disponible.\n\n");
      } else {
        p += renderAllEligibleJobsPlain(listNCM, listOFF, true);
      }

      // Conclusion French
      if (mergeTasks) {
        p += "\nProchaines étapes :\n";
        p += "En raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées. Nous vous invitons donc à :\n";
        p += "- Vous rendre sur votre portail (https://www.cafoap-pclfac.forces.gc.ca/) afin de corriger sans délai les tâches indiquées ci-dessus ;\n";
        if (isPRAdmissible) {
          p += "- Si ce n'est pas déjà fait, retourner sur votre portail (https://www.cafoap-pclfac.forces.gc.ca/) afin d'y déposer les relevés de notes de votre pays d'origine (dans leur langue d'origine s'ils sont en français ou en anglais, ou accompagnés d'une traduction officielle au besoin) ;\n";
        }
        p += "- Répondre directement à ce courriel avec votre choix de réorientation ou vos nouveaux choix de métiers pour mettre à jour votre dossier.\n\n";
      } else {
        if (isPRAdmissible) {
          p +=
            "\nDe plus, si ce n'est pas déjà fait, veuillez retourner sur votre portail (https://www.cafoap-pclfac.forces.gc.ca/) afin d'y déposer les relevés de notes de votre pays d'origine. Ceux-ci doivent être rédigés en français ou en anglais, ou être accompagnés d'une traduction officielle au besoin.\n";
        }
        p +=
          "\nNous vous remercions pour votre intérêt envers les Forces armées canadiennes. Veuillez nous faire part de votre décision en répondant directement à ce courriel afin de poursuivre ou de mettre à jour votre dossier.\n\n";
      }

      // Warning French
      p +=
        "Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.\n\n";

      // Signature French
      p += this.sharedState.getSignatureFr();

      const frPlain = p.trim();
      p = "";

      // ENGLISH SECTION
      p += "Hello,\n\n";

      const cmrAdmittedEn = this.getCmrAdmittedDomainsEn();
      if (this.isCandidateTooOld()) {
        if (this.age() !== null && this.age()! >= 57) {
          p += "Following the analysis of your application file, we inform you that you exceed the maximum eligibility age for enrollment in the Canadian Armed Forces (maximum eligibility age is 56, 57 and older being automatically ineligible).\n\n";
        } else {
          p += "Following the analysis of your application file, we have determined that you must undergo a reorientation. Indeed, you exceed the maximum eligibility age for your selected occupations.\n\n";
        }
      } else if (isPforCmr && cmrAdmittedEn) {
        p += `We are pleased to inform you that, following the assessment of your transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), you have been admitted to RMC in the following field(s) of study: ${cmrAdmittedEn}! We would like to warmly congratulate you on your admission.\n\n`;
      }

      if (mergeTasks) {
        if (isPforCmr && cmrAdmittedEn) {
          p += "However, actions are required on your part to proceed with processing your application. Specifically, you must correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.\n\n";
        } else if (isPforCmr) {
          p += "Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Royal Military College), actions are required on your part. Specifically, you must correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.\n\n";
        } else if (isPforCivil) {
          p += "Following the analysis of your application file for the Regular Officer Training Plan (Civilian University ROTP), actions are required on your part. Specifically, you must correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.\n\n";
        } else {
          p += "Following the analysis of your application file, we have determined that actions are required on your part to proceed with processing your application. Specifically, you must correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.\n\n";
        }
        const tasksTxt = this.sharedState.taskEmailFr();
        const enParts = tasksTxt.split("Hello,");
        if (enParts.length > 1) {
          let enBodyPart: string[] = [];
          if (enParts[1].includes("If you take no action, your file will be automatically deactivated")) {
            enBodyPart = enParts[1].split("If you take no action, your file will be automatically deactivated");
          } else {
            enBodyPart = enParts[1].split("\n\nDue to the high volume");
          }
          if (enBodyPart.length > 0 && enBodyPart[0].trim().length > 0) {
            let taskTextEn = enBodyPart[0].trim();
            taskTextEn = taskTextEn
              .replace(
                /We have evaluated your documents.*?to allow us to continue processing\.\s*/gis,
                ""
              )
              .trim();
            p += "==================================================\n";
            p += "1. TASKS AND COMMUNICATIONS TO CORRECT ON YOUR PORTAL :\n";
            p += "==================================================\n\n";
            p += taskTextEn + "\n\n";
          }
        }
        p += "==================================================\n";
        p += "2. STATUS OF YOUR CURRENT OCCUPATIONS AND REQUIRED REORIENTATION :\n";
        p += "==================================================\n\n";
      }

      // Intro English
      if (hasNoJobCode) {
        if (this.isCandidateTooOld()) {
          p +=
            "In addition, no occupation is currently selected in your file, and the processing of your application cannot continue without an eligible occupation choice from you.\n\n";
        } else if (isPforCmr && cmrAdmittedEn) {
          p +=
            "However, no occupation is currently selected in your file, and the processing of your application cannot continue without an eligible occupation choice from you.\n\n";
        } else if (isPforCmr) {
          p +=
            "Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Royal Military College), we have determined that you must undergo a reorientation. Indeed, no occupation is currently selected in your file, and the processing of your application cannot continue without an occupation choice from you.\n\n";
        } else {
          p +=
            "Following the analysis of your application file, we have determined that you must undergo a reorientation. Indeed, no occupation is currently selected in your file, and the processing of your application cannot continue without an occupation choice from you.\n\n";
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (mergeTasks) {
            p +=
              "Here is the current status of the occupations in your file:\n";
          } else if (this.isCandidateTooOld()) {
            p +=
              "Here is the current status of the occupations in your file:\n";
          } else if (isPforCmr && cmrAdmittedEn) {
            p +=
              "However, following the review of your current occupation choices, a reorientation is required. Here is the current status of the occupations in your file:\n";
          } else if (isPforCmr) {
            p +=
              "Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Royal Military College), here is the current status of the occupations in your file:\n";
          } else if (isPforCivil) {
            p +=
              "Following the analysis of your application file for the Regular Officer Training Plan (Civilian University ROTP), here is the current status of the occupations in your file:\n";
          } else {
            p +=
              "Following the analysis of your application file, we have determined that you must undergo a reorientation. Here is the current status of the occupations in your file:\n";
          }
        } else {
          p +=
            "Here is the current status of the other occupations in your file:\n";
        }
        for (const id of realDossierIds) {
          const nameEn = `${id} - ${this.getJobLinkMarkup(id, false, false)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonEn = "";
          if (s) {
            const reasonsEnList: string[] = [];
            if (s.isJobClosed) {
              if (s.isClosedAdmissionOnly) {
                reasonsEnList.push(
                  "We already have a sufficient number of applications to fill all remaining positions.",
                );
              } else if (this.isPforApplicant()) {
                reasonsEnList.push(
                  "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).",
                );
              } else {
                reasonsEnList.push(
                  "There are no longer positions available for this occupation.",
                );
              }
            }
            if (!s.isAgeAdmissible) {
              reasonsEnList.push(s.ageReasonEn);
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsEnList.push(
                "For various reasons, this occupation is not accessible to permanent residents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsEnList.push(s.educationReasonEn);
            }
            if (!s.isMedicalAdmissible) {
              reasonsEnList.push(s.medicalReasonEn);
            }
            if (s.isExtraTestRequired && !s.isExtraTestAdmissible && s.extraTestReasonEn) {
              reasonsEnList.push(s.extraTestReasonEn);
            }

            if (reasonsEnList.length > 0) {
              reasonEn = `\n    - ${reasonsEnList.join("\n    - ")}`;
            } else {
              reasonEn =
                ": Admissible (reorientation initiated for other elements).";
            }
          }
          p += `- ${nameEn}${reasonEn}\n`;
        }
        p += "\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          p +=
            "Following the analysis of your application file, your current occupational choices are unavailable under ROTP or require a field of study different from your RMC admission.\n\n";
        } else {
          p +=
            "Following the analysis of your application file, we have determined that your current occupational choices are currently unavailable or you do not qualify for them based on our criteria.\n\n";
        }
      }

      // Options English
      if (this.isCandidateTooOld() && jobIds.length === 0) {
        p += "Conclusion :\n";
        if (this.age() !== null && this.age()! >= 57) {
          p += "Given that you have reached or exceeded the maximum enrollment age (57 and older), no occupation can be offered to you within the Canadian Armed Forces.\n\n";
        } else {
          p += "Given your current age, no eligible occupation is currently available for your application.\n\n";
        }
      } else {
        p += "Here are the options available to you:\n\n";
        if (hasTraitementClosed && hasAdmissionClosed) {
          const isPluralTraitementEn = closedTraitementJobs.length > 1;
          const opt1TitleEn = isPluralTraitementEn
            ? 'Option 1: Close my file and wait for the next open positions for my occupational choices (' + closedTraitementJobs.join(", ") + ')'
            : 'Option 1: Close my file and wait for the next open positions for my occupational choice (' + closedTraitementJobs.join(", ") + ')';
          const opt1OccupationsEn = isPluralTraitementEn
            ? 'your occupational choices (' + closedTraitementJobs.join(", ") + ')'
            : 'your occupational choice (' + closedTraitementJobs.join(", ") + ')';

          const isPluralAdmissionEn = closedAdmissionOnlyJobs.length > 1;
          const opt2TitleEn = isPluralAdmissionEn
            ? 'Option 2: Retain my occupational choices (' + closedAdmissionOnlyJobs.join(", ") + ') in case a position opens up'
            : 'Option 2: Retain my occupational choice (' + closedAdmissionOnlyJobs.join(", ") + ') in case a position opens up';
          const opt2OccupationsEn = isPluralAdmissionEn
            ? 'your occupational choices (' + closedAdmissionOnlyJobs.join(", ") + ')'
            : 'your occupational choice (' + closedAdmissionOnlyJobs.join(", ") + ')';
          const opt2ReferEn = isPluralAdmissionEn ? 'your occupational choices' : 'your occupational choice';

          p += opt1TitleEn + "\n";
          p += "You can retain " + opt1OccupationsEn + " and wait until next April for positions to open. However, your file will be closed immediately and it will be your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process.\n\n";

          p += opt2TitleEn + "\n";
          p += "You can retain " + opt2OccupationsEn + " in case another candidate already admitted does not complete the process and a position opens up. However, your file will be closed immediately and it will be your sole responsibility to contact your recruiting centre every three months to find out if positions have opened up for " + opt2ReferEn + " in order to continue the recruitment process.\n\n";

          p += "Option 3: Choose another occupation from the list of eligible occupations\n";
          p += "You can redirect your application to other eligible occupational choices right now. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.\n\n";
        } else if (hasTraitementClosed) {
          const isPluralTraitementEn = closedTraitementJobs.length > 1;
          const opt1TitleEn = isPluralTraitementEn
            ? 'Option 1: Close my file and wait for the next open positions for my occupational choices (' + closedTraitementJobs.join(", ") + ')'
            : 'Option 1: Close my file and wait for the next open positions for my occupational choice (' + closedTraitementJobs.join(", ") + ')';
          const opt1OccupationsEn = isPluralTraitementEn
            ? 'your occupational choices (' + closedTraitementJobs.join(", ") + ')'
            : 'your occupational choice (' + closedTraitementJobs.join(", ") + ')';
          p += opt1TitleEn + "\n";
          p += "You can retain " + opt1OccupationsEn + " and wait until next April for positions to open. However, your file will be closed immediately and it will be your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process.\n\n";
          p += "Option 2: Choose another occupation from the list of eligible occupations\n";
          p += "You can redirect your application to other eligible occupational choices right now. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.\n\n";
        } else if (hasAdmissionClosed) {
          const isPluralAdmissionEn = closedAdmissionOnlyJobs.length > 1;
          const opt1TitleEn = isPluralAdmissionEn
            ? 'Option 1: Retain my occupational choices (' + closedAdmissionOnlyJobs.join(", ") + ') in case a position opens up'
            : 'Option 1: Retain my occupational choice (' + closedAdmissionOnlyJobs.join(", ") + ') in case a position opens up';
          const opt1OccupationsEn = isPluralAdmissionEn
            ? 'your occupational choices (' + closedAdmissionOnlyJobs.join(", ") + ')'
            : 'your occupational choice (' + closedAdmissionOnlyJobs.join(", ") + ')';
          const opt1ReferEn = isPluralAdmissionEn ? 'your occupational choices' : 'your occupational choice';
          p += opt1TitleEn + "\n";
          p += "You can retain " + opt1OccupationsEn + " in case another candidate already admitted does not complete the process and a position opens up. However, your file will be closed immediately and it will be your sole responsibility to contact your recruiting centre every three months to find out if positions have opened up for " + opt1ReferEn + " in order to continue the recruitment process.\n\n";
          p += "Option 2: Choose another occupation from the list of eligible occupations\n";
          p += "You can redirect your application to other eligible occupational choices right now. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.\n\n";
        } else {
          p += "Choose another occupation from the list of eligible occupations\n";
          p += "You must redirect your application to an occupational choice for which you are eligible to continue the enrollment process. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.\n\n";
        }
      }

      // Eligible Jobs English Division
      p += "--------------------------------------------------\n";
      p += "ELIGIBLE OCCUPATIONS:\n";
      p += "--------------------------------------------------\n";

      if (isPilotEligible) {
        p += "\nImportant – Selection of the Pilot Occupation (00183):\n";
        p += "As the Pilot occupation is highly competitive (very limited number of positions available), if you choose Pilot, you must also select a second occupation from the list of eligible occupations.\n\n";
      }

      if (listNCM.length === 0 && listOFF.length === 0) {
        p += (this.isPforApplicant() ? "No matching open ROTP occupations are currently available for the selected options.\n\n" : "No matching occupations available.\n\n");
      } else {
        p += renderAllEligibleJobsPlain(listNCM, listOFF, false);
      }

      // Conclusion English
      if (mergeTasks) {
        p += "\nNext steps:\n";
        p += "Due to the high volume of applications, we must prioritize processing files for which all tasks are completed. We therefore invite you to:\n";
        p += "- Visit your portal (https://www.cafoap-pclfac.forces.gc.ca/) to correct the tasks indicated above without delay;\n";
        if (isPRAdmissible) {
          p += "- If not already done, return to your portal (https://www.cafoap-pclfac.forces.gc.ca/) to upload the transcripts from your country of origin (in their original language if they are in English or French, or accompanied by an official translation if needed);\n";
        }
        p += "- Reply directly to this email with your reorientation choice or your new occupational choices to update your file.\n\n";
      } else {
        if (isPRAdmissible) {
          p +=
            "\nAdditionally, if not already done, please return to your portal (https://www.cafoap-pclfac.forces.gc.ca/) to upload the transcripts from your country of origin. These documents must be in English or French, or accompanied by an official translation if needed.\n";
        }
        p +=
          "\nWe thank you for your interest in the Canadian Armed Forces. Please let us know your decision by replying directly to this email so that we can update your file.\n\n";
      }

      // Warning English
      p +=
        "If you do not take any action, your file will be automatically deactivated after 30 days.\n";

      // Signature English
      p += this.sharedState.getSignatureEn();

      const enPlain = p.trim();

      if (isEn) {
        return `Un message en français suivra.\n\n${enPlain}\n\n______________________________________________________________________________\n\n${frPlain}`;
      }
      return `English message will follow.\n\n${frPlain}\n\n______________________________________________________________________________\n\n${enPlain}`;
    }
  }

