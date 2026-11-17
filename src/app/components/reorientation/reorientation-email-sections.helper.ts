import { AppLang, TranslationService } from "../../i18n";
import { PORTAL_CANDIDATE_URL } from "../../data/app-links.data";
import {
  extractMergedTasksBody,
  renderConclusionAndFooter,
  renderMergedTasksContainer,
  renderPilotNotice,
} from "../shared/email-blocks.helper";
import { renderReoEligibleJobsList } from "./reorientation-email-lists.helper";

export interface ReoEmailSectionContext {
  jobIds: string[];
  listNCM: string[];
  listOFF: string[];
  hasNoJobCode: boolean;
  realDossierIds: string[];
  closedTraitementJobs: string[];
  closedAdmissionOnlyJobs: string[];
  hasTraitementClosed: boolean;
  hasAdmissionClosed: boolean;
  mergeTasks: boolean;
  isPforApplicant: boolean;
  isPforCmr: boolean;
  isPforCivil: boolean;
  isPilotEligible: boolean;
  isPRAdmissible: boolean;
  isCandidateTooOld: boolean;
  cmrAdmittedFr: string;
  cmrAdmittedEn: string;
}

function renderTraitementOptionBlock(
  jobs: string[],
  lang: AppLang,
  isHtml: boolean,
): string {
  const isPlural = jobs.length > 1;
  const joined = jobs.join(", ");
  const title =
    lang === "fr"
      ? isPlural
        ? `Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mes choix de métiers (${joined})`
        : `Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mon choix de métier (${joined})`
      : isPlural
        ? `Option 1: Close my file and wait for the next open positions for my occupational choices (${joined})`
        : `Option 1: Close my file and wait for the next open positions for my occupational choice (${joined})`;

  if (isHtml) {
    const desc =
      lang === "fr"
        ? `Vous pouvez conserver ${isPlural ? "vos choix de métiers" : "votre choix de métier"} (<strong>${joined}</strong>) et attendre que les prochaines positions ouvrent en avril prochain. Cependant, <span style="background-color: #fef08a; font-weight: bold;">votre dossier sera fermé dès maintenant</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement</span>.`
        : `You can retain ${isPlural ? "your occupational choices" : "your occupational choice"} (<strong>${joined}</strong>) and wait until next April for positions to open. However, <span style="background-color: #fef08a; font-weight: bold;">your file will be closed immediately</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process</span>.`;
    return `<p class="mt-2 text-sm"><strong>${title}</strong><br>${desc}</p>\n`;
  }

  const desc =
    lang === "fr"
      ? `Vous pouvez conserver ${isPlural ? "vos choix de métiers" : "votre choix de métier"} (${joined}) et attendre que les prochaines positions ouvrent en avril prochain. Cependant, votre dossier sera fermé dès maintenant et il sera de votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement.`
      : `You can retain ${isPlural ? "your occupational choices" : "your occupational choice"} (${joined}) and wait until next April for positions to open. However, your file will be closed immediately and it will be your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process.`;
  return `${title}\n${desc}\n\n`;
}

function renderAdmissionOptionBlock(
  jobs: string[],
  optionNumber: 1 | 2,
  lang: AppLang,
  isHtml: boolean,
): string {
  const isPlural = jobs.length > 1;
  const joined = jobs.join(", ");
  const title =
    lang === "fr"
      ? isPlural
        ? `Option ${optionNumber} : Conserver mes choix de métiers (${joined}) au cas où une position se libérerait`
        : `Option ${optionNumber} : Conserver mon choix de métier (${joined}) au cas où une position se libérerait`
      : isPlural
        ? `Option ${optionNumber}: Retain my occupational choices (${joined}) in case a position opens up`
        : `Option ${optionNumber}: Retain my occupational choice (${joined}) in case a position opens up`;

  if (isHtml) {
    const mtClass = optionNumber === 1 ? "mt-2" : "mt-4";
    const desc =
      lang === "fr"
        ? `Vous pouvez conserver ${isPlural ? "vos choix de métiers" : "votre choix de métier"} (<strong>${joined}</strong>) au cas où un autre postulant déjà admis ne termine pas le processus et qu’une position se libère. Cependant, <span style="background-color: #fef08a; font-weight: bold;">votre dossier sera fermé dès maintenant</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de contacter votre centre de recrutement à tous les trois mois</span> pour savoir si des positions se seraient libérées pour ${isPlural ? "vos choix de métiers" : "votre choix de métier"} afin de poursuivre le processus de recrutement.`
        : `You can retain ${isPlural ? "your occupational choices" : "your occupational choice"} (<strong>${joined}</strong>) in case another candidate already admitted does not complete the process and a position opens up. However, <span style="background-color: #fef08a; font-weight: bold;">your file will be closed immediately</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your sole responsibility to contact your recruiting centre every three months</span> to find out if positions have opened up for ${isPlural ? "your occupational choices" : "your occupational choice"} in order to continue the recruitment process.`;
    return `<p class="${mtClass} text-sm"><strong>${title}</strong><br>${desc}</p>\n`;
  }

  const desc =
    lang === "fr"
      ? `Vous pouvez conserver ${isPlural ? "vos choix de métiers" : "votre choix de métier"} (${joined}) au cas où un autre postulant déjà admis ne termine pas le processus et qu’une position se libère. Cependant, votre dossier sera fermé dès maintenant et il sera de votre entière responsabilité de contacter votre centre de recrutement à tous les trois mois pour savoir si des positions se seraient libérées pour ${isPlural ? "vos choix de métiers" : "votre choix de métier"} afin de poursuivre le processus de recrutement.`
      : `You can retain ${isPlural ? "your occupational choices" : "your occupational choice"} (${joined}) in case another candidate already admitted does not complete the process and a position opens up. However, your file will be closed immediately and it will be your sole responsibility to contact your recruiting centre every three months to find out if positions have opened up for ${isPlural ? "your occupational choices" : "your occupational choice"} in order to continue the recruitment process.`;
  return `${title}\n${desc}\n\n`;
}

function renderReoOptionsOrTooOldConclusion(
  sec: ReoEmailSectionContext,
  lang: AppLang,
  isHtml: boolean,
  i18n: TranslationService,
): string {
  if (sec.isCandidateTooOld && sec.jobIds.length === 0) {
    const header = i18n.tLang("reoEmail.gen.tooOldConclusionHeader", lang);
    const body = i18n.tLang("reoEmail.gen.tooOldConclusionText", lang);
    return isHtml
      ? `<p class="mt-4 font-semibold text-slate-800">${header}</p>\n<p class="mt-2 text-sm">${body}</p>\n`
      : `${header}\n${body}\n\n`;
  }

  const header = i18n.tLang("reoEmail.options.header", lang);
  let out = isHtml
    ? `<p class="mt-4 font-semibold text-slate-800">${header}</p>\n`
    : `${header}\n\n`;

  if (sec.hasTraitementClosed && sec.hasAdmissionClosed) {
    out += renderTraitementOptionBlock(sec.closedTraitementJobs, lang, isHtml);
    out += renderAdmissionOptionBlock(sec.closedAdmissionOnlyJobs, 2, lang, isHtml);
    const opt3Title = i18n.tLang("reoEmail.options.chooseOtherTitleOpt3", lang);
    const opt3Desc = i18n.tLang("reoEmail.options.chooseOtherDescOptional", lang);
    out += isHtml
      ? `<p class="mt-4 text-sm"><strong>${opt3Title}</strong><br>${opt3Desc}</p>\n`
      : `${opt3Title}\n${opt3Desc}\n\n`;
  } else if (sec.hasTraitementClosed) {
    out += renderTraitementOptionBlock(sec.closedTraitementJobs, lang, isHtml);
    const opt2Title = i18n.tLang("reoEmail.options.chooseOtherTitleOpt2", lang);
    const opt2Desc = i18n.tLang("reoEmail.options.chooseOtherDescOptional", lang);
    out += isHtml
      ? `<p class="mt-4 text-sm"><strong>${opt2Title}</strong><br>${opt2Desc}</p>\n`
      : `${opt2Title}\n${opt2Desc}\n\n`;
  } else if (sec.hasAdmissionClosed) {
    out += renderAdmissionOptionBlock(sec.closedAdmissionOnlyJobs, 1, lang, isHtml);
    const opt2Title = i18n.tLang("reoEmail.options.chooseOtherTitleOpt2", lang);
    const opt2Desc = i18n.tLang("reoEmail.options.chooseOtherDescOptional", lang);
    out += isHtml
      ? `<p class="mt-4 text-sm"><strong>${opt2Title}</strong><br>${opt2Desc}</p>\n`
      : `${opt2Title}\n${opt2Desc}\n\n`;
  } else {
    const title = i18n.tLang("reoEmail.options.chooseOtherTitle", lang);
    const desc = i18n.tLang("reoEmail.options.chooseOtherDescRequired", lang);
    out += isHtml
      ? `<p class="mt-2 text-sm"><strong>${title}</strong><br>${desc}</p>\n`
      : `${title}\n${desc}\n\n`;
  }
  return out;
}

function renderReoDossierStatus(
  ctx: any,
  sec: ReoEmailSectionContext,
  lang: AppLang,
  isHtml: boolean,
): string {
  const i18n: TranslationService = ctx.i18n;
  const isFr = lang === "fr";
  const cmrAdmitted = isFr ? sec.cmrAdmittedFr : sec.cmrAdmittedEn;
  const { realDossierIds, hasNoJobCode, mergeTasks, isCandidateTooOld, isPforCmr, isPforCivil } = sec;

  if (realDossierIds.length > 0) {
    let intro = "";
    if (!hasNoJobCode) {
      if (mergeTasks || isCandidateTooOld) {
        const msg = i18n.tLang("reoEmail.status.current", lang);
        intro = isHtml
          ? `<p class="${mergeTasks ? "mt-2" : "mt-4"}">${msg}</p>\n`
          : `${msg}\n`;
      } else if (isPforCmr && cmrAdmitted) {
        const msg = i18n.tLang("reoEmail.gen.status.cmrAdmitted", lang);
        intro = isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n`;
      } else if (isPforCmr) {
        intro = isHtml
          ? `${i18n.tLang("reoEmail.gen.status.cmrHtml", lang)}\n`
          : `${i18n.tLang("reoEmail.gen.status.cmrPlain", lang)}\n`;
      } else if (isPforCivil) {
        intro = isHtml
          ? `${i18n.tLang("reoEmail.gen.status.civilHtml", lang)}\n`
          : `${i18n.tLang("reoEmail.gen.status.civilPlain", lang)}\n`;
      } else {
        const msg = i18n.tLang("reoEmail.gen.status.regular", lang);
        intro = isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n`;
      }
    } else {
      const msg = i18n.tLang("reoEmail.status.other", lang);
      intro = isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n`;
    }

    const collectReasons = (s: any): string[] => {
      const reasons: string[] = [];
      if (s.isJobClosed) {
        if (s.isClosedAdmissionOnly) {
          reasons.push(i18n.tLang("reoEmail.status.closedAdmission", lang));
        } else if (sec.isPforApplicant) {
          reasons.push(i18n.tLang("reoEmail.status.closedPfor", lang));
        } else {
          reasons.push(i18n.tLang("reoEmail.status.closedRegular", lang));
        }
      }
      if (!s.isAgeAdmissible) reasons.push(isFr ? s.ageReason : s.ageReasonEn);
      if (!s.isCitizenshipAdmissible) reasons.push(i18n.tLang("reoEmail.status.noPr", lang));
      if (!s.isEducationAdmissible) reasons.push(isFr ? s.educationReason : s.educationReasonEn);
      if (!s.isMedicalAdmissible) reasons.push(isFr ? s.medicalReason : s.medicalReasonEn);
      if (s.isExtraTestRequired && !s.isExtraTestAdmissible) {
        const extra = isFr ? s.extraTestReasonFr : s.extraTestReasonEn;
        if (extra) reasons.push(extra);
      }
      return reasons;
    };

    if (isHtml) {
      let h = intro + '<ul class="list-disc pl-5 mt-2 mb-4">\n';
      for (const id of realDossierIds) {
        const name = `${id} - ${ctx.getJobLinkMarkup(id, isFr, true)}`;
        const s = ctx.evaluateJobAdmissibility(id);
        let reasonMarkup = "";
        if (s) {
          const reasons = collectReasons(s);
          reasonMarkup =
            reasons.length > 0
              ? `\n    <ul class="list-disc pl-5 mt-1 text-sm text-slate-600">\n      <li>${reasons.join("</li>\n      <li>")}</li>\n    </ul>`
              : i18n.tLang("reoEmail.status.eligibleOther", lang);
        }
        h += `  <li class="mt-1"><strong>${name}</strong>${reasonMarkup}</li>\n`;
      }
      return h + "</ul>\n";
    }

    let p = intro;
    for (const id of realDossierIds) {
      const name = `${id} - ${ctx.getJobLinkMarkup(id, isFr, false)}`;
      const s = ctx.evaluateJobAdmissibility(id);
      let reasonTxt = "";
      if (s) {
        const reasons = collectReasons(s);
        reasonTxt =
          reasons.length > 0
            ? `\n    - ${reasons.join("\n    - ")}`
            : i18n.tLang("reoEmail.status.eligibleOther", lang);
      }
      p += `- ${name}${reasonTxt}\n`;
    }
    return p + "\n";
  }

  if (!hasNoJobCode) {
    const key = isPforCmr ? "reoEmail.gen.status.emptyCmr" : "reoEmail.gen.status.emptyRegular";
    const msg = i18n.tLang(key, lang);
    return isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n\n`;
  }
  return "";
}

export function buildReoEmailSection(
  ctx: any,
  sec: ReoEmailSectionContext,
  lang: AppLang,
  isHtml: boolean,
): string {
  const i18n: TranslationService = ctx.i18n;
  const isFr = lang === "fr";
  const cmrAdmitted = isFr ? sec.cmrAdmittedFr : sec.cmrAdmittedEn;
  const { isCandidateTooOld, isPforCmr, isPforCivil, mergeTasks, hasNoJobCode } = sec;

  let out = isHtml
    ? `<p class="mt-4">${i18n.tLang("reoEmail.greeting", lang)}</p>\n`
    : `${i18n.tLang("reoEmail.greeting", lang)}\n\n`;

  if (isCandidateTooOld) {
    const msg = i18n.tLang("reoEmail.gen.tooOldIntro", lang);
    out += isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n\n`;
  } else if (isPforCmr && cmrAdmitted) {
    out += isHtml
      ? `${i18n.tLang("pforEmail.cmrEligibleIntroHtml", lang, { domains: cmrAdmitted })}\n`
      : `${i18n.tLang("pforEmail.cmrEligibleIntroPlain", lang, { domains: cmrAdmitted })}\n\n`;
  }

  if (mergeTasks) {
    const mergeKey = isCandidateTooOld
      ? isHtml
        ? "reoEmail.gen.merge.tooOldHtml"
        : "reoEmail.gen.merge.tooOldPlain"
      : isPforCmr && cmrAdmitted
        ? isHtml
          ? "reoEmail.gen.merge.cmrAdmittedHtml"
          : "reoEmail.gen.merge.cmrAdmittedPlain"
        : isPforCmr
          ? isHtml
            ? "reoEmail.gen.merge.cmrHtml"
            : "reoEmail.gen.merge.cmrPlain"
          : isPforCivil
            ? isHtml
              ? "reoEmail.gen.merge.civilHtml"
              : "reoEmail.gen.merge.civilPlain"
            : isHtml
              ? "reoEmail.gen.merge.regularHtml"
              : "reoEmail.gen.merge.regularPlain";

    out += isHtml
      ? `${i18n.tLang(mergeKey, lang)}\n`
      : `${i18n.tLang(mergeKey, lang)}\n\n`;

    const rawTasksSource = isHtml
      ? ctx.sharedState.taskEmailHtmlFr()
      : ctx.sharedState.taskEmailFr();
    const taskBody = extractMergedTasksBody(rawTasksSource, lang, isHtml, true);
    out += renderMergedTasksContainer(taskBody, lang, isHtml, i18n, "equals");
  } else if (hasNoJobCode) {
    if (isCandidateTooOld) {
      const msg = i18n.tLang("reoEmail.gen.noJob.tooOld", lang);
      out += isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n\n`;
    } else if (isPforCmr && cmrAdmitted) {
      const msg = i18n.tLang("reoEmail.gen.noJob.cmrAdmitted", lang);
      out += isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n\n`;
    } else if (isPforCmr) {
      out += isHtml
        ? `${i18n.tLang("reoEmail.gen.noJob.cmrHtml", lang)}\n`
        : `${i18n.tLang("reoEmail.gen.noJob.cmrPlain", lang)}\n\n`;
    } else {
      const msg = i18n.tLang("reoEmail.gen.noJob.regular", lang);
      out += isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n\n`;
    }
  }

  out += renderReoDossierStatus(ctx, sec, lang, isHtml);
  out += renderReoOptionsOrTooOldConclusion(sec, lang, isHtml, i18n);

  // Eligible Jobs Division
  const jobsHeader = i18n.tLang("reoEmail.jobs.header", lang);
  const emptyKey = sec.isPforApplicant
    ? "reoEmail.gen.list.emptyPfor"
    : "reoEmail.gen.list.emptyRegular";
  const emptyMsg = i18n.tLang(emptyKey, lang);

  if (isHtml) {
    out += '<div class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
    out += `<p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">${jobsHeader}</p>\n`;
    if (sec.isPilotEligible) out += renderPilotNotice(lang, true, i18n);
    if (sec.listNCM.length === 0 && sec.listOFF.length === 0) {
      out += `<p class="mt-2 text-slate-700 italic">${emptyMsg}</p>\n`;
    } else {
      out += renderReoEligibleJobsList(ctx, sec.listNCM, sec.listOFF, lang, true);
    }
    out += "</div>\n";
  } else {
    out += "--------------------------------------------------\n";
    out += `${jobsHeader}\n`;
    out += "--------------------------------------------------\n";
    if (sec.isPilotEligible) out += "\n" + renderPilotNotice(lang, false, i18n);
    if (sec.listNCM.length === 0 && sec.listOFF.length === 0) {
      out += `${emptyMsg}\n\n`;
    } else {
      out += renderReoEligibleJobsList(ctx, sec.listNCM, sec.listOFF, lang, false);
    }
  }

  out += renderConclusionAndFooter(ctx, {
    mergeTasks,
    isPRAdmissible: sec.isPRAdmissible,
    portalUrl: PORTAL_CANDIDATE_URL,
    isHtml,
    lang,
    extraPlainNewlineAfterTasks: true,
  });

  return isHtml ? out : out.trim();
}
