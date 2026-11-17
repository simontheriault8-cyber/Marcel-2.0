import { AppLang, TranslationService } from "../../i18n";
import {
  renderHighlyCompetitiveBadge,
  renderHighlyCompetitiveNote,
} from "../shared/email-blocks.helper";

export function hasDisplayedReoHighlyCompetitiveJobs(
  ctx: any,
  ncmJobs: string[],
  offJobs: string[],
): boolean {
  const isPfor = ctx.isPforApplicant();
  const ignoreSip = ctx.ignoreSip();
  const isJobClosed = (j: string) =>
    isPfor
      ? ctx.jobService.isPforJobClosed(j, ctx.currentSipPhase())
      : ctx.jobService.isJobClosed(j, ctx.currentSipPhase());

  const displayedJobs = ignoreSip
    ? [...ncmJobs, ...offJobs]
    : [...ncmJobs.filter((j) => !isJobClosed(j)), ...offJobs.filter((j) => !isJobClosed(j))];

  return displayedJobs.some((jId) => ctx.jobService.isJobHighlyCompetitive(jId));
}

export function renderReoEligibleJobsList(
  ctx: any,
  ncmJobs: string[],
  offJobs: string[],
  lang: AppLang,
  isHtml: boolean,
): string {
  const i18n: TranslationService = ctx.i18n;
  const isFr = lang === "fr";
  const isPfor = ctx.isPforApplicant();
  const ignoreSip = ctx.ignoreSip();
  const isJobClosed = (j: string) =>
    isPfor
      ? ctx.jobService.isPforJobClosed(j, ctx.currentSipPhase())
      : ctx.jobService.isJobClosed(j, ctx.currentSipPhase());

  const openNcm = ncmJobs.filter((j) => !isJobClosed(j));
  const closedNcm = ncmJobs.filter((j) => isJobClosed(j));
  const openOff = offJobs.filter((j) => !isJobClosed(j));
  const closedOff = offJobs.filter((j) => isJobClosed(j));
  const hasClosedJobs = closedNcm.length > 0 || closedOff.length > 0;
  const hasHc = hasDisplayedReoHighlyCompetitiveJobs(ctx, ncmJobs, offJobs);

  const openNcmTitle = i18n.tLang(
    ignoreSip ? "reoEmail.gen.list.ncmOpen" : "reoEmail.gen.list.ncm",
    lang,
  );
  const openOffTitle = i18n.tLang(
    ignoreSip ? "reoEmail.gen.list.offOpen" : "reoEmail.gen.list.off",
    lang,
  );
  const closedNcmTitle = i18n.tLang("reoEmail.gen.list.ncmClosed", lang);
  const closedOffTitle = i18n.tLang("reoEmail.gen.list.offClosed", lang);

  if (isHtml) {
    const buildSection = (
      jobList: string[],
      title: string,
      color: string,
      inlineColor: string,
      isClosed: boolean,
    ) => {
      if (jobList.length === 0) return "";
      let sec = `<p class="font-bold text-${color} mt-4" style="color: ${inlineColor}; font-weight: bold; margin-top: 16px;">${title} :</p>\n`;
      sec += '<ul class="list-disc pl-5 mt-1 mb-2" style="padding-left: 20px; margin-top: 4px; margin-bottom: 8px;">\n';
      for (const jId of jobList) {
        const itemStyle = isClosed ? ' style="color: #b91c1c;"' : "";
        const itemClass = isClosed ? ' class="mt-0.5 text-red-700"' : ' class="mt-0.5"';
        const hcBadge = ctx.jobService.isJobHighlyCompetitive(jId)
          ? renderHighlyCompetitiveBadge(lang, true, i18n)
          : "";
        sec += `  <li${itemClass}${itemStyle}><strong>${jId} - ${ctx.getJobLinkMarkup(jId, isFr, true)}</strong>${hcBadge}</li>\n`;
      }
      sec += "</ul>\n";

      if (!isPfor) {
        const proofsMap = new Map<string, string[]>();
        for (const jId of jobList) {
          const missing = ctx.getMissingProofs(jId);
          const proofs = isFr ? missing.fr : missing.en;
          if (proofs.length > 0) proofsMap.set(jId, proofs);
        }
        if (proofsMap.size > 0) {
          sec += `<p class="mt-2 text-xs text-red-800 font-semibold font-sans" style="color: #991b1b; font-weight: 600; font-size: 12px; margin-top: 8px;">${i18n.tLang("reoEmail.gen.list.proofsHtml", lang)}</p>\n`;
          sec += '<ul class="list-disc pl-5 mt-1 mb-2 text-xs text-slate-600" style="color: #475569; padding-left: 20px; margin-top: 4px; margin-bottom: 8px; font-size: 12px;">\n';
          const forWord = i18n.tLang("reoEmail.gen.list.forWord", lang);
          for (const [jId, proofs] of proofsMap.entries()) {
            sec += `  <li class="mt-0.5"><strong>${forWord} ${jId} - ${ctx.getJobLinkMarkup(jId, isFr, true)} :</strong> ${proofs.join(", ")}</li>\n`;
          }
          sec += "</ul>\n";
        }
      }
      return sec;
    };

    let out = "";
    out += buildSection(openNcm, openNcmTitle, "blue-800", "#1e40af", false);
    out += buildSection(openOff, openOffTitle, "purple-800", "#6b21a8", false);

    if (ignoreSip && hasClosedJobs) {
      out +=
        '<div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900" style="margin-top: 16px; padding: 12px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 4px; font-size: 14px; color: #713f12;">\n' +
        `  <strong>${i18n.tLang("reoEmail.closedNote.title", lang)}</strong> ${i18n.tLang("reoEmail.closedNote.htmlBody", lang)}\n` +
        "</div>\n";
      out += buildSection(closedNcm, closedNcmTitle, "red-800", "#991b1b", true);
      out += buildSection(closedOff, closedOffTitle, "red-800", "#991b1b", true);
    }
    if (hasHc) {
      out += renderHighlyCompetitiveNote(lang, true, i18n);
    }
    return out;
  }

  const buildPlainSection = (jobList: string[], title: string) => {
    if (jobList.length === 0) return "";
    let sec = `\n${title} :\n`;
    for (const jId of jobList) {
      const hcBadge = ctx.jobService.isJobHighlyCompetitive(jId)
        ? renderHighlyCompetitiveBadge(lang, false, i18n)
        : "";
      sec += `  - ${jId} - ${ctx.getJobLinkMarkup(jId, isFr, false)}${hcBadge}\n`;
    }
    if (!isPfor) {
      const proofsMap = new Map<string, string[]>();
      for (const jId of jobList) {
        const missing = ctx.getMissingProofs(jId);
        const proofs = isFr ? missing.fr : missing.en;
        if (proofs.length > 0) proofsMap.set(jId, proofs);
      }
      if (proofsMap.size > 0) {
        sec += `\n  ${i18n.tLang("reoEmail.gen.list.proofsPlain", lang)}\n`;
        const forWord = i18n.tLang("reoEmail.gen.list.forWord", lang);
        for (const [jId, proofs] of proofsMap.entries()) {
          sec += `    * ${forWord} ${jId} : ${proofs.join(", ")}\n`;
        }
      }
    }
    return sec;
  };

  let out = "";
  out += buildPlainSection(openNcm, openNcmTitle);
  out += buildPlainSection(openOff, openOffTitle);
  if (ignoreSip && hasClosedJobs) {
    out += `\n${i18n.tLang("reoEmail.closedNote.title", lang)}\n${i18n.tLang("reoEmail.closedNote.plainBody", lang)}\n`;
    out += buildPlainSection(closedNcm, closedNcmTitle);
    out += buildPlainSection(closedOff, closedOffTitle);
  }
  if (hasHc) {
    out += renderHighlyCompetitiveNote(lang, false, i18n);
  }
  return out;
}
