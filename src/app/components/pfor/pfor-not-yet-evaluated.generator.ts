import { CMR_JOB_DOMAINS, PFOR_CIVIL_JOB_IDS } from "../../data/reorientation-criteria/criteria.models";
import { JOB_URLS } from "../../data/job-urls.data";

/**
 * Returns trades from the applicant's current dossier choices that are offered under PFOR
 * ONLY in civilian university (not at CMR) AND are listed in gestionDesAttentes of SIP.json.
 */
export function getCivilOnlyAttentesTradeIdsInDossier(dossierIds: string[], jobService: any): string[] {
  const result: string[] = [];
  for (const id of dossierIds) {
    if (!id || id === "00003") continue;
    const cmrInfo = CMR_JOB_DOMAINS[id];
    const isAtCmr = !!(cmrInfo && (cmrInfo.arts || cmrInfo.genie || cmrInfo.science));
    const isCivilPfor = PFOR_CIVIL_JOB_IDS.has(id);
    const inAttentes = jobService.isJobInGestionDesAttentes(id);
    if (isCivilPfor && !isAtCmr && inAttentes) {
      if (!result.includes(id)) {
        result.push(id);
      }
    }
  }
  return result;
}

/**
 * Returns all CMR PFOR jobs except those listed in gestionDesAttentes of SIP.json.
 */
export function getCmrJobsNotInAttentes(jobService: any): string[] {
  const jobIds: string[] = [];
  for (const [id, cmrInfo] of Object.entries(CMR_JOB_DOMAINS)) {
    if ((cmrInfo.arts || cmrInfo.genie || cmrInfo.science) && !jobService.isJobInGestionDesAttentes(id)) {
      jobIds.push(id);
    }
  }
  return jobIds.sort();
}

/**
 * Formats the French name for a civilian-only trade.
 */
export function formatCivilOnlyTradeNameFr(id: string, jobService: any): string {
  if (id === "00195") {
    return "d’officier en soins infirmiers";
  }
  const job = jobService.getJobById(id);
  const title = (job?.title || jobService.getJobTitle(id, "fr")).toLowerCase().trim();
  if (title.startsWith("officier")) {
    return "d’" + title;
  }
  if (title.startsWith("de ") || title.startsWith("d’")) {
    return title;
  }
  if (title.startsWith("d'")) {
    return title.replace("d'", "d’");
  }
  const startsWithVowel = /^[aeiouyéèêh]/i.test(title);
  return startsWithVowel ? `d’${title}` : `de ${title}`;
}

/**
 * Formats the English name for a civilian-only trade.
 */
export function formatCivilOnlyTradeNameEn(id: string, jobService: any): string {
  if (id === "00195") {
    return "Nursing Officer";
  }
  return jobService.getJobTitle(id, "en");
}

/**
 * Generates the registry note for PFOR reorientation when applicant is not yet evaluated by CMC.
 * Format: Étape 1 (en cours) - xxx (métiers) - Courriel de gestion des attentes envoyé avec plusieurs options proposés. En attente de la réponse du postulant.
 */
export function generatePforNotYetEvaluatedNote(this: any): string {
  const isEn = this.i18n ? this.i18n.isEn() : false;
  const dossierIds = [
    this.selectedDossierJobId1(),
    this.selectedDossierJobId2(),
    this.selectedDossierJobId3(),
  ].filter(Boolean);

  let jobsFormatted = "";
  if (dossierIds.length === 0) {
    jobsFormatted = isEn ? "no occupation selected on file" : "aucun métier sélectionné au dossier";
  } else {
    jobsFormatted = dossierIds
      .map((id: string) => this.jobService.getJobDisplayLabel(id, isEn ? "en" : "fr"))
      .join(", ");
  }

  return this.i18n
    ? this.i18n.t("regNotes.pforNotYetEvaluated", { jobs: jobsFormatted })
    : (isEn
      ? `Step 1 (In progress) - ${jobsFormatted} - Expectations management email sent with several options offered. Awaiting candidate's response.`
      : `Étape 1 (en cours) - ${jobsFormatted} - Courriel de gestion des attentes envoyé avec plusieurs options proposés. En attente de la réponse du postulant.`);
}

/**
 * Builds the bilingual email for PFOR reorientation before CMC evaluation results.
 * Respects the formatting and wording from the official reference PDF.
 */
export function buildPforNotYetEvaluatedEmail(this: any, isHtml: boolean): string {
  const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === "en");
  const cmrJobIds = getCmrJobsNotInAttentes(this.jobService);

  const dossierIds = [
    this.selectedDossierJobId1(),
    this.selectedDossierJobId2(),
    this.selectedDossierJobId3(),
  ].filter(Boolean);

  // Check if any of the candidate's current dossier choices is PFOR civil ONLY
  const civilAttentesIdsInDossier = getCivilOnlyAttentesTradeIdsInDossier(dossierIds, this.jobService);

  // Helper for bullet list items
  const formatBulletItem = (id: string, isFrench: boolean): string => {
    const title = this.jobService.getJobTitle(id, isFrench ? "fr" : "en");
    const urlInfo = JOB_URLS[id];
    const url = urlInfo ? (isFrench ? urlInfo.fr : urlInfo.en) : "";

    if (isHtml) {
      if (url) {
        return `<li><span style="font-weight: bold;">${id}</span> - <a href="${url}" target="_blank" style="color: #2563eb; text-decoration: underline; font-weight: bold;">${title}</a></li>`;
      }
      return `<li><span style="font-weight: bold;">${id}</span> - <span style="font-weight: bold;">${title}</span></li>`;
    } else {
      if (url) {
        return `• ${id} - ${title} (${url})`;
      }
      return `• ${id} - ${title}`;
    }
  };

  // Helper for civil-only attentes paragraph - ONLY displayed if a civil-only trade is in the applicant's dossier
  const formatCivilAttentesParagraph = (isFrench: boolean): string => {
    if (civilAttentesIdsInDossier.length === 0) return "";
    if (isFrench) {
      if (civilAttentesIdsInDossier.length === 1) {
        const tradeName = formatCivilOnlyTradeNameFr(civilAttentesIdsInDossier[0], this.jobService);
        return `Pour les postulants au métier ${tradeName}, votre dossier sera fermé et vous pourrez communiquer avec nous vers la fin de l’été prochain afin de demander la réouverture de votre dossier et présenter une nouvelle demande à ce moment-là.`;
      }
      const names = civilAttentesIdsInDossier.map((id: string) => formatCivilOnlyTradeNameFr(id, this.jobService)).join(" ou ");
      return `Pour les postulants aux métiers ${names}, votre dossier sera fermé et vous pourrez communiquer avec nous vers la fin de l’été prochain afin de demander la réouverture de votre dossier et présenter une nouvelle demande à ce moment-là.`;
    } else {
      if (civilAttentesIdsInDossier.length === 1) {
        const tradeNameEn = formatCivilOnlyTradeNameEn(civilAttentesIdsInDossier[0], this.jobService);
        return `For ${tradeNameEn} applicants, your file will be closed and you may contact us towards the end of next summer to request the reopening of your file and submit a new application at that time.`;
      }
      const namesEn = civilAttentesIdsInDossier.map((id: string) => formatCivilOnlyTradeNameEn(id, this.jobService)).join(" or ");
      return `For ${namesEn} applicants, your file will be closed and you may contact us towards the end of next summer to request the reopening of your file and submit a new application at that time.`;
    }
  };

  const civilParaFr = formatCivilAttentesParagraph(true);
  const civilParaEn = formatCivilAttentesParagraph(false);

  if (isHtml) {
    const listItemsFr = cmrJobIds.map((id) => formatBulletItem(id, true)).join("\n");
    const listItemsEn = cmrJobIds.map((id) => formatBulletItem(id, false)).join("\n");

    const frHtml =
      '<p class="mt-4">Bonjour,</p>\n' +
      '<p class="mt-4">Ceci est un courriel de suivi concernant les choix de métiers que vous avez sélectionnés. Votre dossier n’a toujours pas été évalué par les Collèges militaires canadiens (CMC). Toutefois, un ou plusieurs des métiers que vous avez choisis sont déjà considérés comme complets pour la présente année en raison du grand nombre de candidatures reçues jusqu’à maintenant.</p>\n' +
      '<p class="mt-4">Si vous recevez ce courriel, c’est parce que ces métiers constituaient les seuls choix figurant à votre dossier. Vous avez donc les deux options suivantes :</p>\n' +
      '<ol style="list-style-type: decimal; padding-left: 24px; margin-top: 16px; margin-bottom: 16px;">\n' +
      '  <li style="margin-bottom: 8px;"><strong>Conserver votre ou vos choix actuels de métiers</strong><br/>Dans ce cas, nous procéderons à la fermeture de votre dossier pour la présente campagne de recrutement, puisque votre candidature ne pourra pas être traitée cette année. Vous pourrez toutefois présenter une nouvelle demande lors de la prochaine campagne.</li>\n' +
      '  <li style="margin-bottom: 8px;"><strong>Sélectionner d\'autres métiers</strong><br/>Vous pouvez nous communiquer d’autres métiers qui pourraient vous intéresser. Nous procéderons alors à la mise à jour de votre dossier, ce qui permettra à votre candidature de poursuivre son traitement.</li>\n' +
      '</ol>\n' +
      '<p class="mt-4">Veuillez noter que si vous choisissez la deuxième option, il est possible que vous receviez un autre courriel de réorientation une fois l’évaluation des CMC complétée, si votre domaine d’études ne correspond pas aux exigences du métier choisi ou dans l’éventualité où vous ne seriez pas admissible aux CMC.</p>\n' +
      '<p class="mt-4"><strong>Officiers (PFOR au CMR) :</strong></p>\n' +
      `<ul style="list-style-type: disc; padding-left: 24px; margin-top: 8px; margin-bottom: 16px;">\n${listItemsFr}\n</ul>\n` +
      (civilParaFr ? `<p class="mt-4">${civilParaFr}</p>\n` : '') +
      '<p class="mt-4">Sachez également que les métiers que vous avez sélectionnés sont extrêmement populaires et qu’il se pourrait que, même l’an prochain, l’admission demeure très compétitive.</p>\n' +
      '<p class="mt-4">Si vous avez des questions ou souhaitez nous faire part de votre décision, vous pouvez répondre directement à ce courriel.</p>\n' +
      '<p class="mt-4">Merci de votre intérêt envers les Forces armées canadiennes.<br/>Bonne journée,</p>\n' +
      '<p class="mt-4">' + this.sharedState.getHtmlSignatureFr() + '</p>\n';

    const enHtml =
      '<p class="mt-4">Hello,</p>\n' +
      '<p class="mt-4">This is a follow-up email regarding the occupational choices you have selected. Your file has not yet been evaluated by the Canadian Military Colleges (CMC). However, one or more of the occupations you have chosen are already considered full for the current year due to the high volume of applications received so far.</p>\n' +
      '<p class="mt-4">If you are receiving this email, it is because these occupations were the only choices appearing in your file. You therefore have the following two options:</p>\n' +
      '<ol style="list-style-type: decimal; padding-left: 24px; margin-top: 16px; margin-bottom: 16px;">\n' +
      '  <li style="margin-bottom: 8px;"><strong>Maintain your current occupation choice(s)</strong><br/>In this case, we will proceed with closing your file for the current recruiting campaign, as your application cannot be processed this year. You may, however, submit a new application during the next campaign.</li>\n' +
      '  <li style="margin-bottom: 8px;"><strong>Select other occupations</strong><br/>You may let us know of other occupations that might interest you. We will then update your file, allowing your application to continue being processed.</li>\n' +
      '</ol>\n' +
      '<p class="mt-4">Please note that if you choose the second option, you may receive another reorientation email once the CMC evaluation is completed, should your field of study not match the requirements of the chosen occupation or in the event that you are not admissible to the CMC.</p>\n' +
      '<p class="mt-4"><strong>Officers (RMC ROTP):</strong></p>\n' +
      `<ul style="list-style-type: disc; padding-left: 24px; margin-top: 8px; margin-bottom: 16px;">\n${listItemsEn}\n</ul>\n` +
      (civilParaEn ? `<p class="mt-4">${civilParaEn}</p>\n` : '') +
      '<p class="mt-4">Please also be aware that the occupations you have selected are extremely popular, and admission may remain highly competitive even next year.</p>\n' +
      '<p class="mt-4">If you have any questions or wish to share your decision with us, you can reply directly to this email.</p>\n' +
      '<p class="mt-4">Thank you for your interest in the Canadian Armed Forces.<br/>Have a great day,</p>\n' +
      '<p class="mt-4">' + this.sharedState.getHtmlSignatureEn() + '</p>\n';

    const divider = '<p class="my-6 border-t border-slate-300" style="margin-top: 24px; margin-bottom: 24px; border-top: 1px solid #cbd5e1;"></p>\n';

    if (isEn) {
      return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">Un message en français suivra.</span></p>\n' +
        enHtml + divider + frHtml;
    }
    return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">English message will follow.</span></p>\n' +
      frHtml + divider + enHtml;
  } else {
    // Plain text
    const listItemsFr = cmrJobIds.map((id) => formatBulletItem(id, true)).join("\n");
    const listItemsEn = cmrJobIds.map((id) => formatBulletItem(id, false)).join("\n");

    const frPlain =
      "Bonjour,\n\n" +
      "Ceci est un courriel de suivi concernant les choix de métiers que vous avez sélectionnés. Votre dossier n’a toujours pas été évalué par les Collèges militaires canadiens (CMC). Toutefois, un ou plusieurs des métiers que vous avez choisis sont déjà considérés comme complets pour la présente année en raison du grand nombre de candidatures reçues jusqu’à maintenant.\n\n" +
      "Si vous recevez ce courriel, c’est parce que ces métiers constituaient les seuls choix figurant à votre dossier. Vous avez donc les deux options suivantes :\n\n" +
      "1. Conserver votre ou vos choix actuels de métiers\n" +
      "   Dans ce cas, nous procéderons à la fermeture de votre dossier pour la présente campagne de recrutement, puisque votre candidature ne pourra pas être traitée cette année. Vous pourrez toutefois présenter une nouvelle demande lors de la prochaine campagne.\n\n" +
      "2. Sélectionner d'autres métiers\n" +
      "   Vous pouvez nous communiquer d’autres métiers qui pourraient vous intéresser. Nous procéderons alors à la mise à jour de votre dossier, ce qui permettra à votre candidature de poursuivre son traitement.\n\n" +
      "Veuillez noter que si vous choisissez la deuxième option, il est possible que vous receviez un autre courriel de réorientation une fois l’évaluation des CMC complétée, si votre domaine d’études ne correspond pas aux exigences du métier choisi ou dans l’éventualité où vous ne seriez pas admissible aux CMC.\n\n" +
      "Officiers (PFOR au CMR) :\n\n" +
      listItemsFr + "\n\n" +
      (civilParaFr ? civilParaFr + "\n\n" : "") +
      "Sachez également que les métiers que vous avez sélectionnés sont extrêmement populaires et qu’il se pourrait que, même l’an prochain, l’admission demeure très compétitive.\n\n" +
      "Si vous avez des questions ou souhaitez nous faire part de votre décision, vous pouvez répondre directement à ce courriel.\n\n" +
      "Merci de votre intérêt envers les Forces armées canadiennes.\n" +
      "Bonne journée,\n\n" +
      this.sharedState.getSignatureFr();

    const enPlain =
      "Hello,\n\n" +
      "This is a follow-up email regarding the occupational choices you have selected. Your file has not yet been evaluated by the Canadian Military Colleges (CMC). However, one or more of the occupations you have chosen are already considered full for the current year due to the high volume of applications received so far.\n\n" +
      "If you are receiving this email, it is because these occupations were the only choices appearing in your file. You therefore have the following two options:\n\n" +
      "1. Maintain your current occupation choice(s)\n" +
      "   In this case, we will proceed with closing your file for the current recruiting campaign, as your application cannot be processed this year. You may, however, submit a new application during the next campaign.\n\n" +
      "2. Select other occupations\n" +
      "   You may let us know of other occupations that might interest you. We will then update your file, allowing your application to continue being processed.\n\n" +
      "Please note that if you choose the second option, you may receive another reorientation email once the CMC evaluation is completed, should your field of study not match the requirements of the chosen occupation or in the event that you are not admissible to the CMC.\n\n" +
      "Officers (RMC ROTP):\n\n" +
      listItemsEn + "\n\n" +
      (civilParaEn ? civilParaEn + "\n\n" : "") +
      "Please also be aware that the occupations you have selected are extremely popular, and admission may remain highly competitive even next year.\n\n" +
      "If you have any questions or wish to share your decision with us, you can reply directly to this email.\n\n" +
      "Thank you for your interest in the Canadian Armed Forces.\n" +
      "Have a great day,\n\n" +
      this.sharedState.getSignatureEn();

    const divider = "\n\n______________________________________________________________________________\n\n";

    if (isEn) {
      return `Un message en français suivra.\n\n${enPlain}${divider}${frPlain}`;
    }
    return `English message will follow.\n\n${frPlain}${divider}${enPlain}`;
  }
}
