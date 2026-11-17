import { AppLang, TranslationService } from "../../i18n";

export function wrapBilingualEmail(
  frBlock: string,
  enBlock: string,
  isEn: boolean,
  isHtml: boolean,
  i18n?: TranslationService,
  htmlDivider = '<hr class="my-6 border-slate-200" />\n',
): string {
  if (isHtml) {
    const banner = isEn
      ? (i18n?.tLang("reoEmail.bannerFollowHtml", "en") ??
          '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">Un message en français suivra.</span></p>\n')
      : (i18n?.tLang("reoEmail.bannerFollowHtml", "fr") ??
          '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">English message will follow.</span></p>\n');
    return isEn
      ? `${banner}${enBlock}${htmlDivider}${frBlock}`
      : `${banner}${frBlock}${htmlDivider}${enBlock}`;
  }

  const banner = isEn
    ? (i18n?.tLang("reoEmail.bannerFollowPlain", "en") ?? "Un message en français suivra.\n\n")
    : (i18n?.tLang("reoEmail.bannerFollowPlain", "fr") ?? "English message will follow.\n\n");
  const plainDivider =
    "\n\n______________________________________________________________________________\n\n";
  return isEn
    ? `${banner}${enBlock}${plainDivider}${frBlock}`
    : `${banner}${frBlock}${plainDivider}${enBlock}`;
}

export function buildAge57IneligibleEmail(
  ctx: any,
  isHtml: boolean,
  isEn: boolean,
): string {
  const i18n: TranslationService = ctx.i18n;
  const buildSection = (lang: AppLang): string => {
    const sig =
      lang === "fr"
        ? isHtml
          ? ctx.sharedState.getHtmlSignatureFr()
          : ctx.sharedState.getSignatureFr()
        : isHtml
          ? ctx.sharedState.getHtmlSignatureEn()
          : ctx.sharedState.getSignatureEn();

    if (isHtml) {
      return (
        `<p class="mt-4">${i18n.tLang("reoEmail.greeting", lang)}</p>\n` +
        `<p class="mt-4">${i18n.tLang("reoEmail.age57.body1", lang)}</p>\n` +
        `<p class="mt-4">${i18n.tLang("reoEmail.age57.body2", lang)}</p>\n` +
        `<p class="mt-4">${i18n.tLang("reoEmail.age57.thanks", lang)}</p>\n` +
        `<p class="mt-4">${sig}</p>\n`
      );
    }
    return (
      `${i18n.tLang("reoEmail.greeting", lang)}\n\n` +
      `${i18n.tLang("reoEmail.age57.body1", lang)}\n\n` +
      `${i18n.tLang("reoEmail.age57.body2", lang)}\n\n` +
      `${i18n.tLang("reoEmail.age57.thanks", lang)}\n\n` +
      sig
    );
  };

  const divider =
    '<p class="my-6 border-t border-slate-300" style="margin-top: 24px; margin-bottom: 24px; border-top: 1px solid #cbd5e1;"></p>\n';
  return wrapBilingualEmail(
    buildSection("fr"),
    buildSection("en"),
    isEn,
    isHtml,
    i18n,
    divider,
  );
}

export function buildPrUnder3YearsEmail(
  ctx: any,
  isHtml: boolean,
  isEn: boolean,
): string {
  const i18n: TranslationService = ctx.i18n;
  const buildSection = (lang: AppLang): string => {
    const sig =
      lang === "fr"
        ? isHtml
          ? ctx.sharedState.getHtmlSignatureFr()
          : ctx.sharedState.getSignatureFr()
        : isHtml
          ? ctx.sharedState.getHtmlSignatureEn()
          : ctx.sharedState.getSignatureEn();

    if (isHtml) {
      return (
        `<p class="mt-4">${i18n.tLang("reoEmail.greeting", lang)}</p>\n` +
        `<p class="mt-4">${i18n.tLang("reoEmail.prUnder3.intro1", lang)}</p>\n` +
        `<p class="mt-4">${i18n.tLang("reoEmail.prUnder3.intro2", lang)}</p>\n` +
        `<p class="mt-4">${i18n.tLang("reoEmail.prUnder3.intro3", lang)}</p>\n` +
        '<ul class="list-disc pl-5 mt-2 mb-4 text-sm text-slate-700" style="padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">\n' +
        `  <li><strong>${i18n.tLang("reoEmail.prUnder3.opt1Bold", lang)}</strong></li>\n` +
        `  <li><strong>${i18n.tLang("reoEmail.prUnder3.opt2Bold", lang)}</strong> ${i18n.tLang("reoEmail.prUnder3.opt2Rest", lang)}</li>\n` +
        "</ul>\n" +
        `<p class="mt-4">${i18n.tLang("reoEmail.prUnder3.closing1", lang)}</p>\n` +
        `<p class="mt-4">${i18n.tLang("reoEmail.prUnder3.closing2", lang)}</p>\n` +
        `<p class="mt-4">${sig}</p>\n`
      );
    }

    return (
      `${i18n.tLang("reoEmail.greeting", lang)}\n\n` +
      `${i18n.tLang("reoEmail.prUnder3.intro1", lang)}\n\n` +
      `${i18n.tLang("reoEmail.prUnder3.intro2", lang)}\n\n` +
      `${i18n.tLang("reoEmail.prUnder3.intro3", lang)}\n` +
      `  - ${i18n.tLang("reoEmail.prUnder3.opt1Bold", lang)}\n` +
      `  - ${i18n.tLang("reoEmail.prUnder3.opt2Bold", lang)} ${i18n.tLang("reoEmail.prUnder3.opt2Rest", lang)}\n\n` +
      `${i18n.tLang("reoEmail.prUnder3.closing1", lang)}\n\n` +
      `${i18n.tLang("reoEmail.prUnder3.closing2", lang)}\n\n` +
      sig
    );
  };

  const divider =
    '<p class="my-6 border-t border-slate-300" style="margin-top: 24px; margin-bottom: 24px; border-top: 1px solid #cbd5e1;"></p>\n';
  return wrapBilingualEmail(
    buildSection("fr"),
    buildSection("en"),
    isEn,
    isHtml,
    i18n,
    divider,
  );
}

export function extractMergedTasksBody(
  rawContent: string,
  lang: AppLang,
  isHtml: boolean,
  stripEvalAndWarning: boolean,
): string {
  if (!rawContent) return "";

  const startMarker =
    lang === "fr" ? "<!-- START_TASK_BODY_FR -->" : "<!-- START_TASK_BODY_EN -->";
  const endMarker =
    lang === "fr" ? "<!-- END_TASK_BODY_FR -->" : "<!-- END_TASK_BODY_EN -->";

  let extracted = "";
  if (rawContent.includes(startMarker)) {
    const parts = rawContent.split(startMarker);
    if (parts.length > 1) {
      const bodyPart = parts[1].split(endMarker);
      if (bodyPart.length > 0) {
        extracted = bodyPart[0].trim();
      }
    }
  } else if (isHtml) {
    const greetingTag = lang === "fr" ? "<p>Bonjour,</p>" : "<p>Hello,</p>";
    const volumeTag =
      lang === "fr" ? "<p>En raison du volume" : "<p>Due to a high volume";
    const parts = rawContent.split(greetingTag);
    if (parts.length > 1) {
      const bodyPart = parts[1].split(volumeTag);
      if (bodyPart.length > 0 && bodyPart[0].trim().length > 0) {
        extracted = bodyPart[0].trim();
      }
    }
  } else {
    const greeting = lang === "fr" ? "Bonjour," : "Hello,";
    const parts = rawContent.split(greeting);
    if (parts.length > 1) {
      if (stripEvalAndWarning) {
        const warningMarker =
          lang === "fr"
            ? "Si vous ne prenez aucune action, votre dossier sera désactivé"
            : "If you take no action, your file will be automatically deactivated";
        const volumeMarker =
          lang === "fr" ? "\n\nEn raison du volume" : "\n\nDue to the high volume";
        const bodyPart = parts[1].includes(warningMarker)
          ? parts[1].split(warningMarker)
          : parts[1].split(volumeMarker);
        if (bodyPart.length > 0 && bodyPart[0].trim().length > 0) {
          extracted = bodyPart[0].trim();
        }
      } else {
        const volumeMarker =
          lang === "fr" ? "En raison du volume" : "Due to a high volume";
        const bodyPart = parts[1].split(volumeMarker);
        if (bodyPart.length > 0 && bodyPart[0].trim().length > 0) {
          extracted = bodyPart[0].trim();
        }
      }
    }
  }

  if (extracted && stripEvalAndWarning) {
    if (lang === "fr") {
      extracted = extracted
        .replace(
          /<p[^>]*>\s*Nous avons procédé à l'évaluation de vos documents.*?pour nous permettre de poursuivre le traitement\.\s*<\/p>/gis,
          "",
        )
        .replace(
          /Nous avons procédé à l'évaluation de vos documents\.(?: Bien que votre dossier progresse, certains éléments ne sont pas conformes et nécessitent des corrections de votre part)?.*?pour nous permettre de poursuivre le traitement\.\s*/gis,
          "",
        )
        .replace(
          /<p[^>]*>\s*<strong>\s*Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours\.\s*<\/strong>\s*<\/p>/gis,
          "",
        )
        .replace(
          /<strong>\s*Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours\.\s*<\/strong>/gis,
          "",
        )
        .trim();
    } else {
      extracted = extracted
        .replace(
          /<p[^>]*>\s*We have evaluated your documents.*?to allow us to continue processing\.\s*<\/p>/gis,
          "",
        )
        .replace(
          /We have evaluated your documents\. While your application is progressing, some items are not compliant and require corrections on your part to allow us to continue processing\.\s*/gis,
          "",
        )
        .replace(
          /<p[^>]*>\s*<strong>\s*If you take no action, your file will be automatically deactivated after 30 days\.\s*<\/strong>\s*<\/p>/gis,
          "",
        )
        .replace(
          /<strong>\s*If you take no action, your file will be automatically deactivated after 30 days\.\s*<\/strong>/gis,
          "",
        )
        .trim();
    }
  }

  return extracted;
}

export function renderMergedTasksContainer(
  taskBody: string,
  lang: AppLang,
  isHtml: boolean,
  i18n: TranslationService,
  plainSeparatorStyle: "dashes" | "equals",
): string {
  const sec1Title = i18n.tLang("reoEmail.tasks.sec1Title", lang);
  const sec2Title = i18n.tLang("reoEmail.tasks.sec2Title", lang);

  if (isHtml) {
    let out = "";
    if (taskBody) {
      out +=
        '<div class="mt-4 p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-sm">\n' +
        `<p class="font-bold text-black border-b border-amber-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">${sec1Title}</p>\n` +
        `${taskBody}\n` +
        "</div>\n";
    }
    out += `<p class="mt-6 font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">${sec2Title}</p>\n`;
    return out;
  }

  let out = "";
  if (plainSeparatorStyle === "equals") {
    if (taskBody) {
      out += "==================================================\n";
      out += `${sec1Title}\n`;
      out += "==================================================\n\n";
      out += `${taskBody}\n\n`;
    }
    out += "==================================================\n";
    out += `${sec2Title}\n`;
    out += "==================================================\n\n";
  } else {
    if (taskBody) {
      out += `${sec1Title}\n`;
      out +=
        "----------------------------------------------------------------------\n";
      out += `${taskBody}\n\n`;
    }
    out += `${sec2Title}\n`;
    out +=
      "----------------------------------------------------------------------\n";
  }
  return out;
}

export function renderPilotNotice(
  lang: AppLang,
  isHtml: boolean,
  i18n: TranslationService,
): string {
  const title = i18n.tLang("reoEmail.pilot.title", lang);
  const body = i18n.tLang("reoEmail.pilot.body", lang);

  if (isHtml) {
    return (
      '<div class="mt-2 mb-3 p-3 bg-amber-50 border border-amber-300 rounded text-amber-900 text-xs" style="margin-top: 8px; margin-bottom: 12px; padding: 10px; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; font-size: 13px; color: #78350f;">\n' +
      `  <strong>${title}</strong> ${body}\n` +
      "</div>\n"
    );
  }
  return `${title} ${body}\n\n`;
}

export function renderHighlyCompetitiveBadge(
  lang: AppLang,
  isHtml: boolean,
  i18n: TranslationService,
): string {
  const badge = i18n.tLang("reoEmail.list.highlyCompetitiveBadge", lang);
  if (isHtml) {
    return ` <span style="background-color: #fef3c7; color: #92400e; font-size: 11px; padding: 1px 5px; border-radius: 3px; font-weight: bold;">${badge}</span>`;
  }
  return ` (${badge})`;
}

export function renderHighlyCompetitiveNote(
  lang: AppLang,
  isHtml: boolean,
  i18n: TranslationService,
): string {
  if (isHtml) {
    return (
      '<p class="mt-4 p-2.5 bg-amber-50 border border-amber-200 rounded text-sm text-amber-900" style="margin-top: 16px; padding: 10px; background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; font-size: 13px; color: #78350f;">' +
      `${i18n.tLang("reoEmail.highlyCompetitiveNote.html", lang)}` +
      "</p>\n"
    );
  }
  return `\n${i18n.tLang("reoEmail.highlyCompetitiveNote.plain", lang)}\n`;
}

export function renderConclusionAndFooter(
  ctx: any,
  opts: {
    mergeTasks: boolean;
    isPRAdmissible: boolean;
    portalUrl: string;
    isHtml: boolean;
    lang: AppLang;
    extraPlainNewlineAfterTasks?: boolean;
    hasHighlyCompetitiveJobs?: boolean;
  },
): string {
  const { mergeTasks, isPRAdmissible, portalUrl, isHtml, lang } = opts;
  const i18n: TranslationService = ctx.i18n;
  const sig =
    lang === "fr"
      ? isHtml
        ? ctx.sharedState.getHtmlSignatureFr()
        : ctx.sharedState.getSignatureFr()
      : isHtml
        ? ctx.sharedState.getHtmlSignatureEn()
        : ctx.sharedState.getSignatureEn();

  if (isHtml) {
    let h = "";
    if (mergeTasks) {
      h += `<p class="mt-6 font-semibold text-slate-800">${i18n.tLang("reoEmail.nextSteps.header", lang)}</p>\n`;
      h += `<p>${i18n.tLang("reoEmail.nextSteps.intro", lang)}</p>\n`;
      h += '<ul class="list-disc pl-5 mt-1 mb-2 text-sm text-slate-700">\n';
      h += `  <li>${i18n.tLang("reoEmail.nextSteps.itemTasksPrefix", lang)}<a href="${portalUrl}" class="text-blue-600 hover:underline">${portalUrl}</a>${i18n.tLang("reoEmail.nextSteps.itemTasksSuffix", lang)}</li>\n`;
      if (isPRAdmissible) {
        h += `  <li>${i18n.tLang("reoEmail.nextSteps.itemPrPrefix", lang)}<a href="${portalUrl}" class="text-blue-600 hover:underline">${portalUrl}</a>${i18n.tLang("reoEmail.nextSteps.itemPrSuffix", lang)}</li>\n`;
      }
      h += `  <li>${i18n.tLang("reoEmail.nextSteps.itemReply", lang)}</li>\n`;
      h += "</ul>\n";
    } else {
      if (isPRAdmissible) {
        h += `<p class="mt-4 text-sm text-slate-700">${i18n.tLang("reoEmail.conclusion.prPrefix", lang)}<a href="${portalUrl}" class="text-blue-600 hover:underline">${portalUrl}</a>${i18n.tLang("reoEmail.conclusion.prSuffix", lang)}</p>\n`;
      }
      h += `<p class="mt-4">${i18n.tLang("reoEmail.conclusion.thanks", lang)}</p>\n`;
    }
    h += `<p class="mt-4 text-sm text-slate-600">${i18n.tLang("reoEmail.warning30Days", lang)}</p>\n`;
    h += `<p>${sig}</p>\n`;
    return h;
  }

  let t = "";
  if (mergeTasks) {
    t += `\n${i18n.tLang("reoEmail.nextSteps.header", lang)}\n`;
    t += `${i18n.tLang("reoEmail.nextSteps.intro", lang)}\n`;
    t += `  - ${i18n.tLang("reoEmail.nextSteps.itemTasksPrefix", lang)}${portalUrl}${i18n.tLang("reoEmail.nextSteps.itemTasksSuffix", lang)}\n`;
    if (isPRAdmissible) {
      t += `  - ${i18n.tLang("reoEmail.nextSteps.itemPrPrefix", lang)}${portalUrl}${i18n.tLang("reoEmail.nextSteps.itemPrSuffix", lang)}\n`;
    }
    t += `  - ${i18n.tLang("reoEmail.nextSteps.itemReply", lang)}\n`;
    if (opts.extraPlainNewlineAfterTasks) {
      t += "\n";
    }
  } else {
    if (isPRAdmissible) {
      t += `\n${i18n.tLang("reoEmail.conclusion.prPrefix", lang)}${portalUrl}${i18n.tLang("reoEmail.conclusion.prSuffix", lang)}\n`;
    }
    t += `\n${i18n.tLang("reoEmail.conclusion.thanks", lang)}\n`;
    if (opts.extraPlainNewlineAfterTasks) {
      t += "\n";
    }
  }
  t += `\n${i18n.tLang("reoEmail.warning30Days", lang)}\n\n`;
  t += `${sig}\n`;
  return t;
}
