import { JobEntry } from "../../../services/jobs-data";
import { AppLang, TranslationService } from "../../i18n";
import { renderHighlyCompetitiveBadge } from "../shared/email-blocks.helper";

export interface PforJobListsData {
  allOpenOfficerJobs: JobEntry[];
  allClosedOfficerJobs: JobEntry[];
  openNcmJobs: (JobEntry | string)[];
  closedNcmJobs: (JobEntry | string)[];
  shouldIncludeNcm: boolean;
  hasAnyOffJobs: boolean;
  hasAnyNcmJobs: boolean;
}

export function buildPforJobListsData(ctx: any): PforJobListsData {
  const allEligibleJobs: JobEntry[] = ctx.eligiblePforJobs();
  let listOFF: JobEntry[] = [];
  let listClosedOFF: JobEntry[] = [];

  if (ctx.ignoreSip()) {
    for (const j of allEligibleJobs) {
      if (ctx.jobService.isPforJobClosed(j.id, ctx.currentSipPhase())) {
        listClosedOFF.push(j);
      } else {
        listOFF.push(j);
      }
    }
  } else {
    listOFF = allEligibleJobs;
  }

  const ncmEval = ctx.eligibleNcmEvaluation();
  const openScolariteOfficerJobs: JobEntry[] = ncmEval.openOfficerJobs.filter(
    (j: JobEntry) => !listOFF.some((o) => o.id === j.id),
  );
  const closedScolariteOfficerJobs: JobEntry[] =
    ncmEval.closedOfficerJobs.filter(
      (j: JobEntry) => !listClosedOFF.some((o) => o.id === j.id),
    );
  const openNcmJobs: (JobEntry | string)[] = ncmEval.openNcmJobs;
  const closedNcmJobs: (JobEntry | string)[] = ncmEval.closedNcmJobs;

  const allOpenOfficerJobs = [...listOFF, ...openScolariteOfficerJobs];
  const allClosedOfficerJobs = [
    ...listClosedOFF,
    ...closedScolariteOfficerJobs,
  ];

  const shouldIncludeNcm =
    ctx.isCandidateTooOld() ||
    ctx.hasAgeInadmissibilityInDossier() ||
    ctx.showScolariteExperiencePanel() ||
    ((openNcmJobs.length > 0 || openScolariteOfficerJobs.length > 0) &&
      listOFF.length === 0);

  const hasAnyOffJobs =
    allOpenOfficerJobs.length > 0 ||
    (ctx.ignoreSip() && allClosedOfficerJobs.length > 0);
  const hasAnyNcmJobs =
    shouldIncludeNcm &&
    (openNcmJobs.length > 0 || (ctx.ignoreSip() && closedNcmJobs.length > 0));

  return {
    allOpenOfficerJobs,
    allClosedOfficerJobs,
    openNcmJobs,
    closedNcmJobs,
    shouldIncludeNcm,
    hasAnyOffJobs,
    hasAnyNcmJobs,
  };
}

export function hasDisplayedPforHighlyCompetitiveJobs(
  ctx: any,
  lists: PforJobListsData,
): boolean {
  const displayedIds: string[] = [
    ...lists.allOpenOfficerJobs.map((j) => j.id),
    ...(lists.shouldIncludeNcm
      ? lists.openNcmJobs.map((item) => (typeof item === "string" ? item : item.id))
      : []),
    ...(ctx.ignoreSip()
      ? [
          ...lists.allClosedOfficerJobs.map((j) => j.id),
          ...(lists.shouldIncludeNcm
            ? lists.closedNcmJobs.map((item) => (typeof item === "string" ? item : item.id))
            : []),
        ]
      : []),
  ];
  return displayedIds.some((jId) => ctx.jobService.isJobHighlyCompetitive(jId));
}

export function renderPforOfficerJobsList(
  ctx: any,
  jobsList: JobEntry[],
  isClosedList: boolean,
  lang: AppLang,
  isHtml: boolean,
): string {
  if (jobsList.length === 0) return "";
  const i18n: TranslationService = ctx.i18n;
  const isFr = lang === "fr";
  const titleKey = isClosedList ? "pforEmail.list.offClosed" : "pforEmail.list.off";
  const title = i18n.tLang(titleKey, lang);
  const closedBadge = i18n.tLang("pforEmail.list.closedBadge", lang);
  const isCmr = ctx.pforType() === "cmr";

  if (isHtml) {
    let s = isClosedList
      ? `<p class="mt-3 mb-1 font-bold text-red-600" style="color: #dc2626; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${title}</p>\n`
      : `<p class="mt-3 mb-1 font-bold text-slate-800" style="color: #1e293b; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${title}</p>\n`;
    s += '<ul class="list-disc pl-5 space-y-1 mb-2">\n';
    for (const j of jobsList) {
      const link = ctx.getJobLinkMarkup(j.id, isFr, true);
      const reqDomain = isCmr
        ? isFr
          ? ` (CMR : ${ctx.getCmrJobRequiredDomainsFr(j.id)})`
          : ` (RMC: ${ctx.getCmrJobRequiredDomainsEn(j.id)})`
        : "";
      const hcBadge = ctx.jobService.isJobHighlyCompetitive(j.id)
        ? renderHighlyCompetitiveBadge(lang, true, i18n)
        : "";
      if (isClosedList) {
        s += `  <li class="mt-0.5 text-red-700" style="color: #b91c1c;"><strong>${j.id} - ${link}</strong>${reqDomain} <span style="background-color: #fecaca; color: #991b1b; font-size: 11px; padding: 1px 4px; border-radius: 3px; font-weight: bold;">(${closedBadge})</span>${hcBadge}</li>\n`;
      } else {
        s += `  <li class="mt-0.5"><strong>${j.id} - ${link}</strong>${reqDomain}${hcBadge}</li>\n`;
      }
    }
    s += "</ul>\n";
    return s;
  }

  let s = `\n${title}\n`;
  for (const j of jobsList) {
    const link = ctx.getJobLinkMarkup(j.id, isFr, false);
    const reqDomain = isCmr
      ? isFr
        ? ` (CMR : ${ctx.getCmrJobRequiredDomainsFr(j.id)})`
        : ` (RMC: ${ctx.getCmrJobRequiredDomainsEn(j.id)})`
      : "";
    const hcBadge = ctx.jobService.isJobHighlyCompetitive(j.id)
      ? renderHighlyCompetitiveBadge(lang, false, i18n)
      : "";
    if (isClosedList) {
      s += `  - ${j.id} - ${link}${reqDomain} (${closedBadge})${hcBadge}\n`;
    } else {
      s += `  - ${j.id} - ${link}${reqDomain}${hcBadge}\n`;
    }
  }
  return s;
}

export function renderPforNcmJobsList(
  ctx: any,
  jobsList: (JobEntry | string)[],
  isClosedList: boolean,
  lang: AppLang,
  isHtml: boolean,
): string {
  if (jobsList.length === 0) return "";
  const i18n: TranslationService = ctx.i18n;
  const isFr = lang === "fr";
  const titleKey = isClosedList ? "pforEmail.list.ncmClosed" : "pforEmail.list.ncm";
  const title = i18n.tLang(titleKey, lang);
  const closedBadge = i18n.tLang("pforEmail.list.closedBadge", lang);

  if (isHtml) {
    let s = isClosedList
      ? `<p class="mt-3 mb-1 font-bold text-red-600" style="color: #dc2626; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${title}</p>\n`
      : `<p class="mt-3 mb-1 font-bold text-slate-800" style="color: #1e293b; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${title}</p>\n`;
    s += '<ul class="list-disc pl-5 space-y-1 mb-2">\n';
    for (const item of jobsList) {
      const jId = typeof item === "string" ? item : item.id;
      const link = ctx.getJobLinkMarkup(jId, isFr, true);
      const hcBadge = ctx.jobService.isJobHighlyCompetitive(jId)
        ? renderHighlyCompetitiveBadge(lang, true, i18n)
        : "";
      if (isClosedList) {
        s += `  <li class="mt-0.5 text-red-700" style="color: #b91c1c;"><strong>${jId} - ${link}</strong> <span style="background-color: #fecaca; color: #991b1b; font-size: 11px; padding: 1px 4px; border-radius: 3px; font-weight: bold;">(${closedBadge})</span>${hcBadge}</li>\n`;
      } else {
        s += `  <li class="mt-0.5"><strong>${jId} - ${link}</strong>${hcBadge}</li>\n`;
      }
    }
    s += "</ul>\n";
    return s;
  }

  let s = `\n${title}\n`;
  for (const item of jobsList) {
    const jId = typeof item === "string" ? item : item.id;
    const link = ctx.getJobLinkMarkup(jId, isFr, false);
    const hcBadge = ctx.jobService.isJobHighlyCompetitive(jId)
      ? renderHighlyCompetitiveBadge(lang, false, i18n)
      : "";
    if (isClosedList) {
      s += `  - ${jId} - ${link} (${closedBadge})${hcBadge}\n`;
    } else {
      s += `  - ${jId} - ${link}${hcBadge}\n`;
    }
  }
  return s;
}
