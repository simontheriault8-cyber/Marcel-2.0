import { AppLang, TranslationService } from "../../i18n";
import { PORTAL_CANDIDATE_URL } from "../../data/app-links.data";
import {
  extractMergedTasksBody,
  renderHighlyCompetitiveBadge,
  renderHighlyCompetitiveNote,
} from "../shared/email-blocks.helper";
import { ReoEmailSectionContext } from "./reorientation-email-sections.helper";

export function isReoPforToEdoProgramChangeOnly(ctx: any): boolean {
  if (!ctx.isPforToEdo() || ctx.isPforApplicant()) {
    return false;
  }
  if (ctx.age() !== null && ctx.age()! >= 57) {
    return false;
  }
  if (ctx.citizenship() === "PR < 3 years") {
    return false;
  }
  if (ctx.isCandidateTooOld()) {
    return false;
  }
  if (!ctx.hasEducationFilled()) {
    return false;
  }

  const dossierIds = [
    ctx.selectedDossierJobId1(),
    ctx.selectedDossierJobId2(),
    ctx.selectedDossierJobId3(),
  ].filter((id: string) => !!id);

  if (dossierIds.length === 0 || dossierIds.includes("00003")) {
    return false;
  }

  return dossierIds.every((id: string) => {
    if (!ctx.isOfficerJob(id)) {
      return false;
    }
    const status = ctx.evaluateJobAdmissibility(id);
    if (!status || !status.isEligible) {
      return false;
    }
    return !ctx.jobService.isJobClosed(id, ctx.currentSipPhase());
  });
}

function getDossierMissingProofs(
  ctx: any,
  realDossierIds: string[],
  lang: AppLang,
): Array<{ id: string; proofs: string[] }> {
  const isFr = lang === "fr";
  const result: Array<{ id: string; proofs: string[] }> = [];
  for (const id of realDossierIds) {
    const missing = ctx.getMissingProofs(id);
    const list = isFr ? missing.fr : missing.en;
    if (list.length > 0) {
      result.push({ id, proofs: list });
    }
  }
  return result;
}

export function buildPforToEdoProgramChangeEmailSection(
  ctx: any,
  sec: ReoEmailSectionContext,
  lang: AppLang,
  isHtml: boolean,
): string {
  const i18n: TranslationService = ctx.i18n;
  const isFr = lang === "fr";
  const { realDossierIds, mergeTasks, isPRAdmissible } = sec;
  const isPlural = realDossierIds.length > 1;
  const missingProofs = getDossierMissingProofs(ctx, realDossierIds, lang);
  const hasMissingProofs = missingProofs.length > 0;
  const hasHc = realDossierIds.some((id) => ctx.jobService.isJobHighlyCompetitive(id));

  const sig = isFr
    ? isHtml
      ? ctx.sharedState.getHtmlSignatureFr()
      : ctx.sharedState.getSignatureFr()
    : isHtml
      ? ctx.sharedState.getHtmlSignatureEn()
      : ctx.sharedState.getSignatureEn();

  let out = isHtml
    ? `<p class="mt-4">${i18n.tLang("reoEmail.greeting", lang)}</p>\n`
    : `${i18n.tLang("reoEmail.greeting", lang)}\n\n`;

  if (mergeTasks) {
    const mergeIntroKey = isHtml
      ? "reoEmail.pforToEdoChange.mergeIntroHtml"
      : "reoEmail.pforToEdoChange.mergeIntroPlain";
    out += isHtml
      ? `${i18n.tLang(mergeIntroKey, lang)}\n`
      : `${i18n.tLang(mergeIntroKey, lang)}\n\n`;

    const rawTasksSource = isHtml
      ? ctx.sharedState.taskEmailHtmlFr()
      : ctx.sharedState.taskEmailFr();
    const taskBody = extractMergedTasksBody(rawTasksSource, lang, isHtml, true);

    const sec1Title = i18n.tLang("reoEmail.tasks.sec1Title", lang);
    const sec2Title = i18n.tLang("reoEmail.pforToEdoChange.sec2Title", lang);
    if (isHtml) {
      if (taskBody) {
        out +=
          '<div class="mt-4 p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-sm">\n' +
          `<p class="font-bold text-black border-b border-amber-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">${sec1Title}</p>\n` +
          `${taskBody}\n` +
          "</div>\n";
      }
      out += `<p class="mt-6 font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">${sec2Title}</p>\n`;
    } else {
      if (taskBody) {
        out += "==================================================\n";
        out += `${sec1Title}\n`;
        out += "==================================================\n\n";
        out += `${taskBody}\n\n`;
      }
      out += "==================================================\n";
      out += `${sec2Title}\n`;
      out += "==================================================\n\n";
    }
  }

  const bodyKey = isPlural
    ? isHtml
      ? "reoEmail.pforToEdoChange.bodyPluralHtml"
      : "reoEmail.pforToEdoChange.bodyPluralPlain"
    : isHtml
      ? "reoEmail.pforToEdoChange.bodySingleHtml"
      : "reoEmail.pforToEdoChange.bodySinglePlain";

  out += isHtml
    ? `${i18n.tLang(bodyKey, lang)}\n`
    : `${i18n.tLang(bodyKey, lang)}\n\n`;

  const eligibleBadge = i18n.tLang("reoEmail.pforToEdoChange.eligibleBadge", lang);
  if (isHtml) {
    out += '<ul class="list-disc pl-5 mt-2 mb-4">\n';
    for (const id of realDossierIds) {
      const name = `${id} - ${ctx.getJobLinkMarkup(id, isFr, true)}`;
      const hcBadge = ctx.jobService.isJobHighlyCompetitive(id)
        ? renderHighlyCompetitiveBadge(lang, true, i18n)
        : "";
      out += `  <li class="mt-1"><strong>${name}</strong>${hcBadge}${eligibleBadge}</li>\n`;
    }
    out += "</ul>\n";
  } else {
    for (const id of realDossierIds) {
      const name = `${id} - ${ctx.getJobLinkMarkup(id, isFr, false)}`;
      const hcBadge = ctx.jobService.isJobHighlyCompetitive(id)
        ? renderHighlyCompetitiveBadge(lang, false, i18n)
        : "";
      out += `- ${name}${hcBadge}${eligibleBadge}\n`;
    }
    out += "\n";
  }

  if (hasHc) {
    out += renderHighlyCompetitiveNote(lang, isHtml, i18n);
  }

  if (hasMissingProofs) {
    const forWord = i18n.tLang("reoEmail.gen.list.forWord", lang);
    if (isHtml) {
      out += `${i18n.tLang("reoEmail.pforToEdoChange.proofsIntroHtml", lang)}\n`;
      out += '<ul class="list-disc pl-5 mt-1 mb-4 text-xs text-slate-600" style="color: #475569; padding-left: 20px; margin-top: 4px; margin-bottom: 16px; font-size: 12px;">\n';
      for (const item of missingProofs) {
        out += `  <li class="mt-0.5"><strong>${forWord} ${item.id} - ${ctx.getJobLinkMarkup(item.id, isFr, true)} :</strong> ${item.proofs.join(", ")}</li>\n`;
      }
      out += "</ul>\n";
    } else {
      out += `${i18n.tLang("reoEmail.pforToEdoChange.proofsIntroPlain", lang)}\n`;
      for (const item of missingProofs) {
        out += `  * ${forWord} ${item.id} : ${item.proofs.join(", ")}\n`;
      }
      out += "\n";
    }
  }

  const requiresPortalAction = mergeTasks || isPRAdmissible || hasMissingProofs;

  if (isHtml) {
    if (mergeTasks) {
      out += `<p class="mt-6 font-semibold text-slate-800">${i18n.tLang("reoEmail.nextSteps.header", lang)}</p>\n`;
      out += `<p>${i18n.tLang("reoEmail.nextSteps.intro", lang)}</p>\n`;
      out += '<ul class="list-disc pl-5 mt-1 mb-2 text-sm text-slate-700">\n';
      out += `  <li>${i18n.tLang("reoEmail.nextSteps.itemTasksPrefix", lang)}<a href="${PORTAL_CANDIDATE_URL}" class="text-blue-600 hover:underline">${PORTAL_CANDIDATE_URL}</a>${i18n.tLang("reoEmail.nextSteps.itemTasksSuffix", lang)}</li>\n`;
      if (isPRAdmissible) {
        out += `  <li>${i18n.tLang("reoEmail.nextSteps.itemPrPrefix", lang)}<a href="${PORTAL_CANDIDATE_URL}" class="text-blue-600 hover:underline">${PORTAL_CANDIDATE_URL}</a>${i18n.tLang("reoEmail.nextSteps.itemPrSuffix", lang)}</li>\n`;
      }
      out += "</ul>\n";
      out += `<p class="mt-3 text-sm text-slate-700">${i18n.tLang("reoEmail.pforToEdoChange.mergeClosing", lang)}</p>\n`;
    } else {
      if (isPRAdmissible) {
        out += `<p class="mt-4 text-sm text-slate-700">${i18n.tLang("reoEmail.conclusion.prPrefix", lang)}<a href="${PORTAL_CANDIDATE_URL}" class="text-blue-600 hover:underline">${PORTAL_CANDIDATE_URL}</a>${i18n.tLang("reoEmail.conclusion.prSuffix", lang)}</p>\n`;
      }
      const closingKey = requiresPortalAction
        ? "reoEmail.pforToEdoChange.closingWithAction"
        : "reoEmail.pforToEdoChange.closingNoAction";
      out += `<p class="mt-4">${i18n.tLang(closingKey, lang)}</p>\n`;
    }

    if (requiresPortalAction) {
      out += `<p class="mt-4 text-sm text-slate-600">${i18n.tLang("reoEmail.warning30Days", lang)}</p>\n`;
    }
    out += `<p class="mt-4">${sig}</p>\n`;
    return out;
  }

  if (mergeTasks) {
    out += `${i18n.tLang("reoEmail.nextSteps.header", lang)}\n`;
    out += `${i18n.tLang("reoEmail.nextSteps.intro", lang)}\n`;
    out += `  - ${i18n.tLang("reoEmail.nextSteps.itemTasksPrefix", lang)}${PORTAL_CANDIDATE_URL}${i18n.tLang("reoEmail.nextSteps.itemTasksSuffix", lang)}\n`;
    if (isPRAdmissible) {
      out += `  - ${i18n.tLang("reoEmail.nextSteps.itemPrPrefix", lang)}${PORTAL_CANDIDATE_URL}${i18n.tLang("reoEmail.nextSteps.itemPrSuffix", lang)}\n`;
    }
    out += `\n${i18n.tLang("reoEmail.pforToEdoChange.mergeClosing", lang)}\n\n`;
  } else {
    if (isPRAdmissible) {
      out += `${i18n.tLang("reoEmail.conclusion.prPrefix", lang)}${PORTAL_CANDIDATE_URL}${i18n.tLang("reoEmail.conclusion.prSuffix", lang)}\n\n`;
    }
    const closingKey = requiresPortalAction
      ? "reoEmail.pforToEdoChange.closingWithAction"
      : "reoEmail.pforToEdoChange.closingNoAction";
    out += `${i18n.tLang(closingKey, lang)}\n\n`;
  }

  if (requiresPortalAction) {
    out += `${i18n.tLang("reoEmail.warning30Days", lang)}\n\n`;
  }
  out += `${sig}\n`;
  return out.trim();
}

export function buildPforToEdoProgramChangeRegistryNote(
  ctx: any,
  isEn: boolean,
): string {
  const dossierIds = [
    ctx.selectedDossierJobId1(),
    ctx.selectedDossierJobId2(),
    ctx.selectedDossierJobId3(),
  ].filter((id: string) => !!id && id !== "00003");

  const jobsLabel = dossierIds.join(", ");
  const isPRAdmissible = ctx.citizenship() === "PR > 3 years";
  const prDemandText = isPRAdmissible
    ? isEn
      ? " and transcripts from country of origin requested"
      : " et relevés de notes du pays d'origine demandés"
    : "";

  const i18n: TranslationService | undefined = ctx.i18n;
  const lang: AppLang = isEn ? "en" : "fr";

  const changeBody = i18n
    ? i18n.tLang("regNotes.pforToEdoChangePart", lang, {
        jobs: jobsLabel,
        prText: prDemandText,
      })
    : isEn
      ? `Entry plan change from ROTP to DEO for ${jobsLabel} (university studies already completed, occupation(s) eligible under DEO), explanatory email sent${prDemandText}, ongoing processing under DEO.`
      : `Changement de programme PFOR vers EDO pour ${jobsLabel} (études universitaires déjà complétées, métier(s) admissible(s) en EDO), courriel explicatif envoyé${prDemandText}, traitement continu sous EDO.`;

  const stepPrefix = i18n
    ? i18n.tLang("regNotes.step1InProgressPrefix", lang)
    : isEn
      ? "Step 1 (In progress) - "
      : "Étape 1 (En cours) - ";

  const hasTaskMerge =
    (ctx.sharedState.includeLinkedEmail() ||
      (ctx.sharedState.hasReassignedTasks() && ctx.showResultsPanel())) &&
    !!ctx.sharedState.taskNote();

  if (hasTaskMerge) {
    const taskNoteRaw: string = ctx.sharedState.taskNote();
    let medicalSuffix = "";
    const medicalMarkerFr = "MÉDICAL - TRIAGE PAR MED CHU REQUIS";
    const medicalMarkerEn = "MEDICAL - TRIAGE BY MED CHU REQUIRED";
    if (
      taskNoteRaw.toUpperCase().includes(medicalMarkerFr) ||
      taskNoteRaw.toUpperCase().includes(medicalMarkerEn)
    ) {
      medicalSuffix =
        "\n\n" +
        (i18n
          ? i18n.t("regNotes.medTriageRequired")
          : isEn
            ? "MEDICAL - TRIAGE BY MED CHU REQUIRED"
            : "MÉDICAL - TRIAGE PAR MED CHU REQUIS");
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

    if (taskClean) {
      return `${taskClean}\n\n${changeBody}${medicalSuffix}`;
    }
    return `${stepPrefix}${changeBody}${medicalSuffix}`;
  }

  return `${stepPrefix}${changeBody}`;
}
