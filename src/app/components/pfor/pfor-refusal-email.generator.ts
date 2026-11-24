import { JobEntry } from "../../../services/jobs-data";
import { MATH_COURSES } from "../../data/reorientation-criteria.data";
import {
  getEligibleProgramsForcesUrl,
  getPaidEducationProgramsUrl,
  getForcesHelpCentreUrl,
} from "../../data/app-links.data";
import {
  renderHighlyCompetitiveBadge,
  renderHighlyCompetitiveNote,
  renderMergedTasksBoxFromState,
} from "../shared/email-blocks.helper";

export function getPforCmrMinMissingCriteriaFr(this: any): string[] {
    const selected = this.reorientationCriteria.selectedCriteriaIds();
    const missing: string[] = [];

    if (!selected.has("des_12e_annee") && !selected.has("aens")) {
      missing.push("posséder au minimum un diplôme d’études secondaires (DES)");
    }
    if (!selected.has("histoire_sec4")) {
      missing.push("avoir réussi le cours d'histoire de la 4e secondaire");
    }
    if (!selected.has("francais_sec5_11e")) {
      missing.push("avoir réussi le cours de langue d'enseignement primaire de 5e secondaire");
    }
    if (!selected.has("anglais_sec5_12e")) {
      missing.push("avoir réussi le cours de langue seconde de 5e secondaire");
    }

    const allMathIds = Object.values(MATH_COURSES).flat().map((m) => m.id);
    const hasMath = allMathIds.some((mId) => selected.has(mId));
    if (!hasMath) {
      missing.push("avoir réussi un cours de mathématique SN,TS,CST ou 426 avec une note de 70% ou mieux");
    }

    return missing;
  }

export function formatPforCmrMinCriteriaParagraphFr(this: any): string {
    const missing = this.getCmrMinMissingCriteriaFr();
    if (missing.length === 0) {
      return "En effet, vous devez posséder au minimum un diplôme d’études secondaires (DES) pour être admissible au Collège militaire royal du Canada (CMR).";
    }
    let listStr = "";
    if (missing.length === 1) {
      listStr = missing[0];
    } else if (missing.length === 2) {
      listStr = `${missing[0]} et ${missing[1]}`;
    } else {
      listStr = `${missing.slice(0, -1).join(", ")} et ${missing[missing.length - 1]}`;
    }
    return `En effet, vous devez ${listStr} pour être admissible au Collège militaire royal du Canada (CMR).`;
  }

export function getPforCmrMinMissingCriteriaEn(this: any): string[] {
    const selected = this.reorientationCriteria.selectedCriteriaIds();
    const missing: string[] = [];

    if (!selected.has("des_12e_annee") && !selected.has("aens")) {
      missing.push("have at least a high school diploma");
    }
    if (!selected.has("histoire_sec4")) {
      missing.push("have passed Grade 10 / Secondary 4 History");
    }
    if (!selected.has("francais_sec5_11e")) {
      missing.push("have passed the Secondary 5 / Grade 11 primary language of instruction course");
    }
    if (!selected.has("anglais_sec5_12e")) {
      missing.push("have passed the Secondary 5 / Grade 11 second language course");
    }

    const allMathIds = Object.values(MATH_COURSES).flat().map((m) => m.id);
    const hasMath = allMathIds.some((mId) => selected.has(mId));
    if (!hasMath) {
      missing.push("have passed a mathematics course (SN, TS, CST, or 426) with a grade of 70% or higher");
    }

    return missing;
  }

export function formatPforCmrMinCriteriaParagraphEn(this: any): string {
    const missing = this.getCmrMinMissingCriteriaEn();
    if (missing.length === 0) {
      return "Specifically, you must have at least a high school diploma to be eligible for the Royal Military College of Canada (RMC).";
    }
    let listStr = "";
    if (missing.length === 1) {
      listStr = missing[0];
    } else if (missing.length === 2) {
      listStr = `${missing[0]} and ${missing[1]}`;
    } else {
      listStr = `${missing.slice(0, -1).join(", ")}, and ${missing[missing.length - 1]}`;
    }
    return `Specifically, you must ${listStr} to be eligible for the Royal Military College of Canada (RMC).`;
  }

export function buildPforCmrRefusalEmail(this: any, isHtml: boolean): string {
    const ncmEval = this.eligibleNcmEvaluation();
    const openJobs = ncmEval.openJobs;
    const closedJobs = ncmEval.closedJobs;
    const rawHtml = this.sharedState.taskEmailHtmlFr();
    const rawTxt = this.sharedState.taskEmailFr();
    const hasTasks =
      !!(rawHtml || rawTxt) &&
      this.sharedState.hasReassignedTasks();
    const mergeTasks =
      (this.sharedState.includeLinkedEmail() ||
        (this.sharedState.hasReassignedTasks() && this.showResultsPanel())) &&
      hasTasks;
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');

    const displayedJobs = [...openJobs, ...(this.ignoreSip() ? closedJobs : [])];
    const hasHighlyCompetitive = displayedJobs.some((item: JobEntry | string) => {
      const jId = typeof item === "string" ? item : item.id;
      return this.jobService.isJobHighlyCompetitive(jId);
    });

    const renderHtmlNcmList = (
      jobs: (JobEntry | string)[],
      isClosed: boolean,
      isFr: boolean,
    ) => {
      if (jobs.length === 0) return "";
      const lang = isFr ? "fr" : "en";
      let s = "";
      if (isClosed) {
        s += `<p class="mt-2 mb-1 font-bold text-red-600" style="color: #dc2626; font-weight: bold; margin-top: 8px; margin-bottom: 4px;">${isFr ? "Métiers fermés :" : "Closed occupations:"}</p>\n`;
      }
      s += '<ul class="list-disc pl-6 space-y-1 mb-2">\n';
      for (const item of jobs) {
        const jId = typeof item === "string" ? item : item.id;
        const link = this.getJobLinkMarkup(jId, isFr, true);
        const hcBadge = this.jobService.isJobHighlyCompetitive(jId)
          ? renderHighlyCompetitiveBadge(lang, true, this.i18n)
          : "";
        if (isClosed) {
          s += `  <li class="mt-0.5 text-red-700" style="color: #b91c1c;"><strong>${jId} - ${link}</strong> <span style="background-color: #fecaca; color: #991b1b; font-size: 11px; padding: 1px 4px; border-radius: 3px; font-weight: bold;">(${isFr ? "FERMÉ" : "CLOSED"})</span>${hcBadge}</li>\n`;
        } else {
          s += `  <li class="mt-0.5"><strong>${jId} - ${link}</strong>${hcBadge}</li>\n`;
        }
      }
      s += "</ul>\n";
      return s;
    };

    const renderPlainNcmList = (
      jobs: (JobEntry | string)[],
      isClosed: boolean,
      isFr: boolean,
    ) => {
      if (jobs.length === 0) return "";
      const lang = isFr ? "fr" : "en";
      let s = "";
      if (isClosed) {
        s += `\n${isFr ? "Métiers fermés :" : "Closed occupations:"}\n`;
      }
      for (const item of jobs) {
        const jId = typeof item === "string" ? item : item.id;
        const link = this.getJobLinkMarkup(jId, isFr, false);
        const hcBadge = this.jobService.isJobHighlyCompetitive(jId)
          ? renderHighlyCompetitiveBadge(lang, false, this.i18n)
          : "";
        if (isClosed) {
          s += `  - ${jId} - ${link} (${isFr ? "FERMÉ" : "CLOSED"})${hcBadge}\n`;
        } else {
          s += `  - ${jId} - ${link}${hcBadge}\n`;
        }
      }
      return s;
    };

    if (isHtml) {
      let h = "";

      // Optional Linked Tasks if active
      if (mergeTasks) {
        h += renderMergedTasksBoxFromState(this, "fr", true, {
          htmlSpacingClass: "mb-6",
        });
      }

      // ======================================
      // FRENCH SECTION (FROM PDF)
      // ======================================
      h += '<p class="mt-4 mb-4">Bonjour,</p>\n';
      if (this.cmrMinCriteriaNotMet()) {
        h +=
          `<p class="mt-4 mb-4">Malheureusement, si vous recevez ce courriel, c’est pour vous informer que vous ne rencontrez pas les critères minimaux d’admissibilité pour le Programme de formation des officiers de la force régulière (PFOR). <strong>${this.formatCmrMinCriteriaParagraphFr()}</strong></p>\n`;
      } else {
        h +=
          '<p class="mt-4 mb-4">Malheureusement, si vous recevez ce courriel, c’est pour vous informer que suite à l’évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royale du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), <strong>vous n’avez pas été admis(e) par le CMR.</strong></p>\n';
      }
      h +=
        '<p class="mt-4 mb-4">Toutefois, cela ne signifie pas que votre processus de recrutement doit se terminer maintenant.<br>Voici les différentes options qui s’offrent à vous :</p>\n';

      h += '<ul class="list-disc pl-6 space-y-2 mb-4">\n';
      if (this.cmrMinCriteriaNotMet()) {
        h +=
          "  <li>Vous pouvez choisir un métier de membre du rang parmi la liste suivante.</li>\n";
        h +=
          "  <li>Vous pouvez demander la fermeture de votre dossier et retenter votre chance pour le PFOR lorsque vous aurez obtenu votre diplôme d’études secondaires (DES).</li>\n";
      } else {
        h +=
          "  <li>Vous pouvez retentez votre chance lors de la prochaine campagne PFOR l’an prochain.</li>\n";
        h +=
          `  <li>Vous pouvez vous inscrire dans une Université civile dans un programme de Baccalauréat admissible pour les métiers qui vous intéressent et nous fournir la lettre d’admission à temps pleins et sans conditions. <span style="background-color: #fef08a; padding: 1px 3px;">(Cela ne garantit pas que vous serez admis dans le volet Civil du PFOR)</span> <a href="${getEligibleProgramsForcesUrl(false)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Liste des programmes admissibles par métier</a></li>\n`;
        h +=
          "  <li>Vous pouvez aussi choisir un métier de membre du rang parmi la liste suivante.</li>\n";
      }
      h += "</ul>\n";

      // NCM Jobs List
      h +=
        '<div class="my-3 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
      h +=
        '<p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2 text-xs uppercase tracking-wider">Métiers de militaire du rang admissibles :</p>\n';
      if (
        openJobs.length === 0 &&
        (!this.ignoreSip() || closedJobs.length === 0)
      ) {
        h +=
          '<p class="text-xs text-slate-500 italic py-1">(Veuillez sélectionner vos critères de scolarité et d\'expérience dans les panneaux pour afficher les métiers admissibles)</p>\n';
      } else {
        h += renderHtmlNcmList(openJobs, false, true);
        if (this.ignoreSip() && closedJobs.length > 0) {
          h += renderHtmlNcmList(closedJobs, true, true);
        }
      }
      h += "</div>\n";

      if (!this.cmrMinCriteriaNotMet()) {
        h +=
          `<p class="mt-4 mb-4">Il existe aussi un programme d’étude subventionné pour certains métiers de militaire du rang. Si un tel programme vous intéresse, veuillez consulter les informations que vous trouverez à ce lien : <a href="${getPaidEducationProgramsUrl(false)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">PIESMR | Programmes d’études subventionnées | Forces armées canadiennes</a>.</p>\n`;
        h +=
          "<p class=\"mt-4 mb-6\">Si vous trouvez un métier qui vous intéresse dans ce programme ou si vous désirez avoir plus d’information, veuillez répondre directement à ce courriel.</p>\n";
      } else {
        h +=
          "<p class=\"mt-4 mb-6\">Si vous désirez poursuivre votre démarche vers l’un de ces métiers ou procéder à la fermeture de votre dossier, veuillez nous faire part de votre décision en répondant directement à ce courriel.</p>\n";
      }

      if (hasHighlyCompetitive) {
        h += renderHighlyCompetitiveNote("fr", true, this.i18n);
      }

      h += '<p class="mb-4">Cordialement,</p>\n';
      h += '<p class="text-sm leading-relaxed text-slate-800">\n';
      h += "  L’équipe de recrutement des Forces armées canadiennes<br>\n";
      h += "  Centre de recrutement des Forces canadiennes Québec<br>\n";
      h +=
        "  Commandement du Personnel militaire / Forces armées canadiennes<br>\n";
      h +=
        `  <a href="${getForcesHelpCentreUrl(false)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Centre d’assistance | Forces armées canadiennes</a>\n`;
      h += "</p>\n";
      const frHtml = h;

      // Optional Linked Tasks (English) if active
      let hEn = "";
      if (mergeTasks) {
        hEn += renderMergedTasksBoxFromState(this, "en", true, {
          htmlSpacingClass: "mb-6",
        });
      }

      // ======================================
      // ENGLISH SECTION (FROM PDF)
      // ======================================
      hEn += '<p class="mt-4 mb-4">Hello,</p>\n';
      if (this.cmrMinCriteriaNotMet()) {
        hEn +=
          `<p class="mt-4 mb-4">Unfortunately, if you have received this email, it is to inform you that you do not meet the minimum eligibility requirements for the Regular Officer Training Plan (ROTP). <strong>${this.formatCmrMinCriteriaParagraphEn()}</strong></p>\n`;
      } else {
        hEn +=
          '<p class="mt-4 mb-4">Unfortunately, if you have received this email, it is to inform you that, following the assessment of your academic transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), <strong>you have not been offered admission to RMC.</strong></p>\n';
      }
      hEn +=
        '<p class="mt-4 mb-4">However, this does not mean that your recruiting process must come to an end at this time.<br>The following options remain available to you:</p>\n';

      hEn += '<ul class="list-disc pl-6 space-y-2 mb-4">\n';
      if (this.cmrMinCriteriaNotMet()) {
        hEn +=
          "  <li>You may choose a Non-Commissioned Member (NCM) occupation from the following list.</li>\n";
        hEn +=
          "  <li>You may request to close your application file and reapply for the ROTP once you have obtained your high school diploma.</li>\n";
      } else {
        hEn +=
          "  <li>You may reapply during next year’s ROTP selection campaign.</li>\n";
        hEn +=
          `  <li>You may apply in a civilian university in a bachelor's degree program that meets the educational requirements for the occupations that interest you and provide us with an unconditional full-time letter of acceptance. <span style="background-color: #fef08a; padding: 1px 3px;">(Please note that this does not guarantee admission through the Civilian University ROTP entry plan.)</span> <a href="${getEligibleProgramsForcesUrl(true)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">List of Eligible Programs by Occupation</a></li>\n`;
        hEn +=
          "  <li>You may also choose a Non-Commissioned Member (NCM) occupation</li>\n";
      }
      hEn += "</ul>\n";

      // NCM Jobs List English
      hEn +=
        '<div class="my-3 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
      hEn +=
        '<p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2 text-xs uppercase tracking-wider">Eligible Non-Commissioned Member occupations:</p>\n';
      if (
        openJobs.length === 0 &&
        (!this.ignoreSip() || closedJobs.length === 0)
      ) {
        hEn +=
          '<p class="text-xs text-slate-500 italic py-1">(Please select your education and experience criteria in the panels to display eligible occupations)</p>\n';
      } else {
        hEn += renderHtmlNcmList(openJobs, false, false);
        if (this.ignoreSip() && closedJobs.length > 0) {
          hEn += renderHtmlNcmList(closedJobs, true, false);
        }
      }
      hEn += "</div>\n";

      if (!this.cmrMinCriteriaNotMet()) {
        hEn +=
          `<p class="mt-4 mb-4">There is also a subsidized education program available for certain Non-Commissioned Member (NCM) occupations. If such a program interests you, please consult the information available at the following link: <a href="${getPaidEducationProgramsUrl(true)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">NCMSTEP | Paid Education Programs | Canadian Armed Forces</a>.</p>\n`;
        hEn +=
          "<p class=\"mt-4 mb-6\">If you find an occupation that interests you within this program, or if you would like more information, please reply directly to this email.</p>\n";
      } else {
        hEn +=
          "<p class=\"mt-4 mb-6\">If you wish to proceed with one of these occupations or request the closure of your file, please let us know by replying directly to this email.</p>\n";
      }

      if (hasHighlyCompetitive) {
        hEn += renderHighlyCompetitiveNote("en", true, this.i18n);
      }

      hEn += '<p class="mb-4">Sincerely,</p>\n';
      hEn += '<p class="text-sm leading-relaxed text-slate-800">\n';
      hEn += "  The Canadian Armed Forces Recruiting Team<br>\n";
      hEn += "  Canadian Forces Recruiting Centre Quebec<br>\n";
      hEn +=
        "  Military Personnel Command / Canadian Armed Forces<br>\n";
      hEn +=
        `  <a href="${getForcesHelpCentreUrl(true)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Help Centre | Canadian Armed Forces</a>\n`;
      hEn += "</p>\n";

      const enHtml = hEn;

      if (isEn) {
        return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">Un message en français suivra.</span></p>\n' +
          enHtml +
          '<hr class="my-8 border-slate-300" />\n' +
          frHtml;
      }
      return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">English message will follow.</span></p>\n' +
        frHtml +
        '<hr class="my-8 border-slate-300" />\n' +
        enHtml;
    } else {
      // ======================================
      // PLAIN TEXT VERSION (FROM PDF)
      // ======================================
      let t = "";

      if (mergeTasks) {
        t += renderMergedTasksBoxFromState(this, "fr", false);
      }

      t += "Bonjour,\n\n";
      if (this.cmrMinCriteriaNotMet()) {
        t +=
          `Malheureusement, si vous recevez ce courriel, c’est pour vous informer que vous ne rencontrez pas les critères minimaux d’admissibilité pour le Programme de formation des officiers de la force régulière (PFOR). ${this.formatCmrMinCriteriaParagraphFr()}\n\n`;
      } else {
        t +=
          "Malheureusement, si vous recevez ce courriel, c’est pour vous informer que suite à l’évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royale du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), vous n’avez pas été admis(e) par le CMR.\n\n";
      }
      t +=
        "Toutefois, cela ne signifie pas que votre processus de recrutement doit se terminer maintenant.\n";
      t += "Voici les différentes options qui s’offrent à vous :\n\n";

      if (this.cmrMinCriteriaNotMet()) {
        t +=
          "• Vous pouvez choisir un métier de membre du rang parmi la liste suivante.\n";
        t +=
          "• Vous pouvez demander la fermeture de votre dossier et retenter votre chance pour le PFOR lorsque vous aurez obtenu votre diplôme d’études secondaires (DES).\n\n";
      } else {
        t +=
          "• Vous pouvez retentez votre chance lors de la prochaine campagne PFOR l’an prochain.\n";
        t +=
          `• Vous pouvez vous inscrire dans une Université civile dans un programme de Baccalauréat admissible pour les métiers qui vous intéressent et nous fournir la lettre d’admission à temps pleins et sans conditions. (Cela ne garantit pas que vous serez admis dans le volet Civil du PFOR) Liste des programmes admissibles par métier (${getEligibleProgramsForcesUrl(false)})\n`;
        t +=
          "• Vous pouvez aussi choisir un métier de membre du rang parmi la liste suivante.\n\n";
      }

      t += "Métiers de militaire du rang admissibles :\n";
      if (
        openJobs.length === 0 &&
        (!this.ignoreSip() || closedJobs.length === 0)
      ) {
        t +=
          "(Veuillez sélectionner vos critères de scolarité et d'expérience dans les panneaux pour afficher les métiers admissibles)\n";
      } else {
        t += renderPlainNcmList(openJobs, false, true);
        if (this.ignoreSip() && closedJobs.length > 0) {
          t += renderPlainNcmList(closedJobs, true, true);
        }
      }

      if (!this.cmrMinCriteriaNotMet()) {
        t +=
          `\nIl existe aussi un programme d’étude subventionné pour certains métiers de militaire du rang. Si un tel programme vous intéresse, veuillez consulter les informations que vous trouverez à ce lien : PIESMR | Programmes d’études subventionnées | Forces armées canadiennes (${getPaidEducationProgramsUrl(false)}).\n\n`;
        t +=
          "Si vous trouvez un métier qui vous intéresse dans ce programme ou si vous désirez avoir plus d’information, veuillez répondre directement à ce courriel.\n\n";
      } else {
        t +=
          "\nSi vous désirez poursuivre votre démarche vers l’un de ces métiers ou procéder à la fermeture de votre dossier, veuillez nous faire part de votre décision en répondant directement à ce courriel.\n\n";
      }

      if (hasHighlyCompetitive) {
        t += renderHighlyCompetitiveNote("fr", false, this.i18n) + "\n";
      }

      t += "Cordialement,\n\n";
      t += "L’équipe de recrutement des Forces armées canadiennes\n";
      t += "Centre de recrutement des Forces canadiennes Québec\n";
      t +=
        "Commandement du Personnel militaire / Forces armées canadiennes\n";
      t +=
        `Centre d’assistance | Forces armées canadiennes (${getForcesHelpCentreUrl(false)})\n\n`;
      const frPlain = t.trim();

      let tEn = "";
      if (mergeTasks) {
        tEn += renderMergedTasksBoxFromState(this, "en", false);
      }

      tEn += "Hello,\n\n";
      if (this.cmrMinCriteriaNotMet()) {
        tEn +=
          `Unfortunately, if you have received this email, it is to inform you that you do not meet the minimum eligibility requirements for the Regular Officer Training Plan (ROTP). ${this.formatCmrMinCriteriaParagraphEn()}\n\n`;
      } else {
        tEn +=
          "Unfortunately, if you have received this email, it is to inform you that, following the assessment of your academic transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), you have not been offered admission to RMC.\n\n";
      }
      tEn +=
        "However, this does not mean that your recruiting process must come to an end at this time.\n";
      tEn += "The following options remain available to you:\n\n";

      if (this.cmrMinCriteriaNotMet()) {
        tEn +=
          "• You may choose a Non-Commissioned Member (NCM) occupation from the following list.\n";
        tEn +=
          "• You may request to close your application file and reapply for the ROTP once you have obtained your high school diploma.\n\n";
      } else {
        tEn +=
          "• You may reapply during next year’s ROTP selection campaign.\n";
        tEn +=
          `• You may apply in a civilian university in a bachelor's degree program that meets the educational requirements for the occupations that interest you and provide us with an unconditional full-time letter of acceptance. (Please note that this does not guarantee admission through the Civilian University ROTP entry plan.) List of Eligible Programs by Occupation (${getEligibleProgramsForcesUrl(true)})\n`;
        tEn +=
          "• You may also choose a Non-Commissioned Member (NCM) occupation\n\n";
      }

      tEn += "Eligible Non-Commissioned Member occupations:\n";
      if (
        openJobs.length === 0 &&
        (!this.ignoreSip() || closedJobs.length === 0)
      ) {
        tEn +=
          "(Please select your education and experience criteria in the panels to display eligible occupations)\n";
      } else {
        tEn += renderPlainNcmList(openJobs, false, false);
        if (this.ignoreSip() && closedJobs.length > 0) {
          tEn += renderPlainNcmList(closedJobs, true, false);
        }
      }

      if (!this.cmrMinCriteriaNotMet()) {
        tEn +=
          `\nThere is also a subsidized education program available for certain Non-Commissioned Member (NCM) occupations. If such a program interests you, please consult the information available at the following link: NCMSTEP | Paid Education Programs | Canadian Armed Forces (${getPaidEducationProgramsUrl(true)}).\n\n`;
        tEn +=
          "If you find an occupation that interests you within this program, or if you would like more information, please reply directly to this email.\n\n";
      } else {
        tEn +=
          "\nIf you wish to proceed with one of these occupations or request the closure of your file, please let us know by replying directly to this email.\n\n";
      }

      if (hasHighlyCompetitive) {
        tEn += renderHighlyCompetitiveNote("en", false, this.i18n) + "\n";
      }

      tEn += "Sincerely,\n\n";
      tEn += "The Canadian Armed Forces Recruiting Team\n";
      tEn += "Canadian Forces Recruiting Centre Quebec\n";
      tEn += "Military Personnel Command / Canadian Armed Forces\n";
      tEn +=
        `Help Centre | Canadian Armed Forces (${getForcesHelpCentreUrl(true)})\n`;

      const enPlain = tEn.trim();

      const divider = "\n\n____________________________________________________________\n\n";
      if (isEn) {
        return `Un message en français suivra.\n\n${enPlain}${divider}${frPlain}`;
      }
      return `English message will follow.\n\n${frPlain}${divider}${enPlain}`;
    }
  }
