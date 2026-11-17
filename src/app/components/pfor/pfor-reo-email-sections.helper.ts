import { AppLang, TranslationService } from "../../i18n";
import { PORTAL_CANDIDATE_URL } from "../../data/app-links.data";
import {
  extractMergedTasksBody,
  renderConclusionAndFooter,
  renderMergedTasksContainer,
  renderPilotNotice,
} from "../shared/email-blocks.helper";
import {
  PforJobListsData,
  renderPforNcmJobsList,
  renderPforOfficerJobsList,
} from "./pfor-reo-email-lists.helper";

export interface PforEmailSectionContext {
  lists: PforJobListsData;
  hasNoJobCode: boolean;
  realDossierIds: string[];
  closedButAdmissibleJobs: string[];
  hasClosedButAdmissibleJobs: boolean;
  mergeTasks: boolean;
  isPforCmr: boolean;
  isPilotEligible: boolean;
  isPRAdmissible: boolean;
  isCandidateTooOld: boolean;
  cmrAdmittedFr: string;
  cmrAdmittedEn: string;
}

function renderPforOptions(
  hasClosedButAdmissibleJobs: boolean,
  closedButAdmissibleJobs: string[],
  lang: AppLang,
  isHtml: boolean,
  i18n: TranslationService,
): string {
  const header = i18n.tLang("reoEmail.options.header", lang);
  if (isHtml) {
    let h = `<p class="mt-4 font-semibold text-slate-800">${header}</p>\n`;
    if (hasClosedButAdmissibleJobs) {
      const isPlural = closedButAdmissibleJobs.length > 1;
      const joined = closedButAdmissibleJobs.join(", ");
      const opt1Title =
        lang === "fr"
          ? isPlural
            ? `Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mes choix de métiers (${joined})`
            : `Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mon choix de métier (${joined})`
          : isPlural
            ? `Option 1: Close my file and wait for the next open positions for my occupational choices (${joined})`
            : `Option 1: Close my file and wait for the next open positions for my occupational choice (${joined})`;
      const opt1Desc =
        lang === "fr"
          ? `Vous pouvez conserver ${isPlural ? "vos choix de métiers" : "votre choix de métier"} (<strong>${joined}</strong>) et attendre que les prochaines positions ouvrent en avril prochain. Cependant, <span style="background-color: #fef08a; font-weight: bold;">votre dossier sera fermé dès maintenant</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement</span>.`
          : `You can retain ${isPlural ? "your occupational choices" : "your occupational choice"} (<strong>${joined}</strong>) and wait until next April for positions to open. However, <span style="background-color: #fef08a; font-weight: bold;">your file will be closed immediately</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process</span>.`;
      h += `<p class="mt-2 text-sm"><strong>${opt1Title}</strong><br>${opt1Desc}</p>\n`;
      h += `<p class="mt-4 text-sm"><strong>${i18n.tLang("reoEmail.options.chooseOtherTitleOpt2", lang)}</strong><br>${i18n.tLang("reoEmail.options.chooseOtherDescOptional", lang)}</p>\n`;
    } else {
      h += `<p class="mt-2 text-sm"><strong>${i18n.tLang("reoEmail.options.chooseOtherTitle", lang)}</strong><br>${i18n.tLang("reoEmail.options.chooseOtherDescRequired", lang)}</p>\n`;
    }
    return h;
  }

  let t = `${header}\n`;
  if (hasClosedButAdmissibleJobs) {
    const isPlural = closedButAdmissibleJobs.length > 1;
    const joined = closedButAdmissibleJobs.join(", ");
    const opt1Title =
      lang === "fr"
        ? isPlural
          ? `Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mes choix de métiers (${joined})`
          : `Option 1 : Fermer mon dossier et attendre les prochaines positions ouvertes pour mon choix de métier (${joined})`
        : isPlural
          ? `Option 1: Close my file and wait for the next open positions for my occupational choices (${joined})`
          : `Option 1: Close my file and wait for the next open positions for my occupational choice (${joined})`;
    const opt1Desc =
      lang === "fr"
        ? `Vous pouvez conserver ${isPlural ? "vos choix de métiers" : "votre choix de métier"} (${joined}) et attendre que les prochaines positions ouvrent en avril prochain. Cependant, votre dossier sera fermé dès maintenant et il sera de votre entière responsabilité de contacter votre centre de recrutement au début du mois de mars prochain pour rouvrir votre dossier et poursuivre le processus de recrutement.`
        : `You can retain ${isPlural ? "your occupational choices" : "your occupational choice"} (${joined}) and wait until next April for positions to open. However, your file will be closed immediately and it will be your sole responsibility to contact your recruiting centre at the beginning of next March to reopen your file and continue the recruitment process.`;
    t += `${opt1Title}\n${opt1Desc}\n\n`;
    t += `${i18n.tLang("reoEmail.options.chooseOtherTitleOpt2", lang)}\n${i18n.tLang("reoEmail.options.chooseOtherDescOptional", lang)}\n\n`;
  } else {
    t += `${i18n.tLang("reoEmail.options.chooseOtherTitle", lang)}\n${i18n.tLang("reoEmail.options.chooseOtherDescRequired", lang)}\n\n`;
  }
  return t;
}

function renderPforDossierStatus(
  ctx: any,
  sec: PforEmailSectionContext,
  lang: AppLang,
  isHtml: boolean,
): string {
  const i18n: TranslationService = ctx.i18n;
  const isFr = lang === "fr";
  const cmrAdmitted = isFr ? sec.cmrAdmittedFr : sec.cmrAdmittedEn;
  const { realDossierIds, hasNoJobCode, mergeTasks, isPforCmr, isCandidateTooOld } = sec;

  if (realDossierIds.length > 0) {
    let intro = "";
    if (!hasNoJobCode) {
      if (mergeTasks || isCandidateTooOld) {
        const msg = i18n.tLang("reoEmail.status.current", lang);
        intro = isHtml
          ? `<p class="${mergeTasks ? "mt-2" : "mt-4"}">${msg}</p>\n`
          : `${msg}\n`;
      } else if (isPforCmr && cmrAdmitted) {
        const msg = i18n.tLang("pforEmail.status.cmrAdmitted", lang);
        intro = isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n`;
      } else if (isPforCmr) {
        intro = isHtml
          ? `${i18n.tLang("pforEmail.status.cmrHtml", lang)}\n`
          : `${i18n.tLang("pforEmail.status.cmrPlain", lang)}\n`;
      } else {
        intro = isHtml
          ? `${i18n.tLang("pforEmail.status.civilHtml", lang)}\n`
          : `${i18n.tLang("pforEmail.status.civilPlain", lang)}\n`;
      }
    } else {
      const msg = i18n.tLang("reoEmail.status.other", lang);
      intro = isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n`;
    }

    if (isHtml) {
      let h = intro + '<ul class="list-disc pl-5 mt-2 mb-4">\n';
      for (const id of realDossierIds) {
        const name = `${id} - ${ctx.getJobLinkMarkup(id, isFr, true)}`;
        const s = ctx.evaluateJobAdmissibility(id);
        let reasonMarkup = "";
        if (s) {
          const reasons: string[] = [];
          if (s.isJobClosed) reasons.push(i18n.tLang("reoEmail.status.closedPfor", lang));
          if (!s.isAgeAdmissible) reasons.push(isFr ? s.ageReason : s.ageReasonEn);
          if (!s.isCitizenshipAdmissible) reasons.push(i18n.tLang("reoEmail.status.noPr", lang));
          if (!s.isEducationAdmissible) reasons.push(isFr ? s.educationReason : s.educationReasonEn);
          if (!s.isMedicalAdmissible) reasons.push(isFr ? s.medicalReason : s.medicalReasonEn);
          reasonMarkup =
            reasons.length > 0
              ? `\n    <ul class="list-disc pl-5 mt-1 text-sm text-slate-600">\n      <li>${reasons.join("</li>\n      <li>")}</li>\n    </ul>`
              : i18n.tLang("reoEmail.status.eligibleOther", lang);
        }
        h += `  <li class="mt-1"><strong>${name}</strong>${reasonMarkup}</li>\n`;
      }
      return h + "</ul>\n";
    }

    let t = intro;
    for (const id of realDossierIds) {
      const name = `${id} - ${ctx.getJobLinkMarkup(id, isFr, false)}`;
      const s = ctx.evaluateJobAdmissibility(id);
      let reasonTxt = "";
      if (s) {
        const reasons: string[] = [];
        if (s.isJobClosed) reasons.push(i18n.tLang("reoEmail.status.closedPfor", lang));
        if (!s.isAgeAdmissible) reasons.push(isFr ? s.ageReason : s.ageReasonEn);
        if (!s.isCitizenshipAdmissible) reasons.push(i18n.tLang("reoEmail.status.noPr", lang));
        if (!s.isEducationAdmissible) reasons.push(isFr ? s.educationReason : s.educationReasonEn);
        if (!s.isMedicalAdmissible) reasons.push(isFr ? s.medicalReason : s.medicalReasonEn);
        reasonTxt =
          reasons.length > 0
            ? `\n    - ${reasons.join("\n    - ")}`
            : i18n.tLang("reoEmail.status.eligibleOther", lang);
      }
      t += `- ${name}${reasonTxt}\n`;
    }
    return t + "\n";
  }

  if (!hasNoJobCode) {
    const key = isPforCmr ? "pforEmail.status.emptyCmr" : "pforEmail.status.emptyCivil";
    const msg = i18n.tLang(key, lang);
    return isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n\n`;
  }
  return "";
}

function renderPforEligibleJobsBlock(
  ctx: any,
  sec: PforEmailSectionContext,
  lang: AppLang,
  isHtml: boolean,
): string {
  const i18n: TranslationService = ctx.i18n;
  const { lists, isPilotEligible } = sec;
  const header = i18n.tLang("reoEmail.jobs.header", lang);
  const emptyMsg = i18n.tLang(
    lists.shouldIncludeNcm
      ? "pforEmail.list.emptyNcmPrompt"
      : "pforEmail.list.emptyOffPrompt",
    lang,
  );
  const hasClosed =
    ctx.ignoreSip() &&
    (lists.allClosedOfficerJobs.length > 0 ||
      (lists.shouldIncludeNcm && lists.closedNcmJobs.length > 0));

  if (isHtml) {
    let h = '<div class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
    h += `<p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">${header}</p>\n`;
    if (isPilotEligible) h += renderPilotNotice(lang, true, i18n);

    if (!lists.hasAnyOffJobs && !lists.hasAnyNcmJobs) {
      h += `<p class="mt-2 text-slate-700 italic">${emptyMsg}</p>\n`;
    } else {
      if (lists.allOpenOfficerJobs.length > 0) {
        h += renderPforOfficerJobsList(ctx, lists.allOpenOfficerJobs, false, lang, true);
      }
      if (lists.shouldIncludeNcm && lists.openNcmJobs.length > 0) {
        h += renderPforNcmJobsList(ctx, lists.openNcmJobs, false, lang, true);
      }
      if (hasClosed) {
        h +=
          '<div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900" style="margin-top: 16px; padding: 12px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 4px; font-size: 14px; color: #713f12;">\n' +
          `  <strong>${i18n.tLang("reoEmail.closedNote.title", lang)}</strong> ${i18n.tLang("reoEmail.closedNote.htmlBody", lang)}\n` +
          "</div>\n";
        if (lists.allClosedOfficerJobs.length > 0) {
          h += renderPforOfficerJobsList(ctx, lists.allClosedOfficerJobs, true, lang, true);
        }
        if (lists.shouldIncludeNcm && lists.closedNcmJobs.length > 0) {
          h += renderPforNcmJobsList(ctx, lists.closedNcmJobs, true, lang, true);
        }
      }
    }
    return h + "</div>\n";
  }

  let t = `${header}\n`;
  if (isPilotEligible) t += renderPilotNotice(lang, false, i18n);
  if (!lists.hasAnyOffJobs && !lists.hasAnyNcmJobs) {
    t += `${emptyMsg}\n`;
  } else {
    if (lists.allOpenOfficerJobs.length > 0) {
      t += renderPforOfficerJobsList(ctx, lists.allOpenOfficerJobs, false, lang, false);
    }
    if (lists.shouldIncludeNcm && lists.openNcmJobs.length > 0) {
      t += renderPforNcmJobsList(ctx, lists.openNcmJobs, false, lang, false);
    }
    if (hasClosed) {
      t += `\n${i18n.tLang("reoEmail.closedNote.title", lang)} ${i18n.tLang("reoEmail.closedNote.plainBody", lang)}\n\n`;
      if (lists.allClosedOfficerJobs.length > 0) {
        t += renderPforOfficerJobsList(ctx, lists.allClosedOfficerJobs, true, lang, false);
      }
      if (lists.shouldIncludeNcm && lists.closedNcmJobs.length > 0) {
        t += renderPforNcmJobsList(ctx, lists.closedNcmJobs, true, lang, false);
      }
    }
  }
  return t;
}

export function buildPforEmailSection(
  ctx: any,
  sec: PforEmailSectionContext,
  lang: AppLang,
  isHtml: boolean,
): string {
  const i18n: TranslationService = ctx.i18n;
  const isFr = lang === "fr";
  const cmrAdmitted = isFr ? sec.cmrAdmittedFr : sec.cmrAdmittedEn;
  const { isCandidateTooOld, isPforCmr, mergeTasks, hasNoJobCode } = sec;

  let out = isHtml
    ? `<p class="mt-4">${i18n.tLang("reoEmail.greeting", lang)}</p>\n`
    : `${i18n.tLang("reoEmail.greeting", lang)}\n\n`;

  if (isCandidateTooOld) {
    out += isHtml
      ? `${i18n.tLang("pforEmail.tooOld.introHtml", lang)}\n`
      : `${i18n.tLang("pforEmail.tooOld.introPlain", lang)}\n\n`;
  } else if (isPforCmr && cmrAdmitted) {
    out += isHtml
      ? `${i18n.tLang("pforEmail.cmrEligibleIntroHtml", lang, { domains: cmrAdmitted })}\n`
      : `${i18n.tLang("pforEmail.cmrEligibleIntroPlain", lang, { domains: cmrAdmitted })}\n\n`;
  }

  if (mergeTasks) {
    const mergeKey = isCandidateTooOld
      ? isHtml
        ? "pforEmail.merge.tooOldHtml"
        : "pforEmail.merge.tooOldPlain"
      : isPforCmr && cmrAdmitted
        ? isHtml
          ? "pforEmail.merge.cmrAdmittedHtml"
          : "pforEmail.merge.cmrAdmittedPlain"
        : isPforCmr
          ? isHtml
            ? "pforEmail.merge.cmrHtml"
            : "pforEmail.merge.cmrPlain"
          : isHtml
            ? "pforEmail.merge.civilHtml"
            : "pforEmail.merge.civilPlain";
    out += isHtml
      ? `${i18n.tLang(mergeKey, lang)}\n`
      : `${i18n.tLang(mergeKey, lang)}\n\n`;

    const rawTaskSource = isFr
      ? isHtml
        ? ctx.sharedState.taskEmailHtmlFr()
        : ctx.sharedState.taskEmailFr()
      : isHtml
        ? ctx.sharedState.taskEmailHtmlEn() || ctx.sharedState.taskEmailHtmlFr()
        : ctx.sharedState.taskEmailEn() || ctx.sharedState.taskEmailFr();
    const taskBody = extractMergedTasksBody(rawTaskSource, lang, isHtml, false);
    out += renderMergedTasksContainer(taskBody, lang, isHtml, i18n, "dashes");
  } else if (hasNoJobCode) {
    if (isCandidateTooOld) {
      const msg = i18n.tLang("pforEmail.noJob.tooOld", lang);
      out += isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n\n`;
    } else if (isPforCmr && cmrAdmitted) {
      const msg = i18n.tLang("pforEmail.noJob.cmrAdmitted", lang);
      out += isHtml ? `<p class="mt-4">${msg}</p>\n` : `${msg}\n\n`;
    } else if (isPforCmr) {
      out += isHtml
        ? `${i18n.tLang("pforEmail.noJob.cmrHtml", lang)}\n`
        : `${i18n.tLang("pforEmail.noJob.cmrPlain", lang)}\n\n`;
    } else {
      out += isHtml
        ? `${i18n.tLang("pforEmail.noJob.civilHtml", lang)}\n`
        : `${i18n.tLang("pforEmail.noJob.civilPlain", lang)}\n\n`;
    }
  }

  out += renderPforDossierStatus(ctx, sec, lang, isHtml);
  out += renderPforOptions(
    sec.hasClosedButAdmissibleJobs,
    sec.closedButAdmissibleJobs,
    lang,
    isHtml,
    i18n,
  );
  out += renderPforEligibleJobsBlock(ctx, sec, lang, isHtml);
  out += renderConclusionAndFooter(ctx, {
    mergeTasks,
    isPRAdmissible: sec.isPRAdmissible,
    portalUrl: PORTAL_CANDIDATE_URL,
    isHtml,
    lang,
  });

  return isHtml ? out : out.trim();
}
