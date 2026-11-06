import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Expands list items by splitting on bullet/o points
 */
export function expandList(items: string[] | undefined): string[] {
  if (!items) return [];
  const result: string[] = [];
  for (const item of items) {
    if (!item) continue;
    const parts = item.split(/(?=\s+(?:[o•\u2022])\s+)/i);
    for (const p of parts) {
      const trimmed = p.trim();
      if (trimmed) {
        result.push(trimmed);
      }
    }
  }
  return result;
}

export function isBulletless(item: string): boolean {
  const trimmed = item.trim();
  return trimmed.startsWith('(') || trimmed === 'ET' || trimmed === 'OU';
}

export function isConnector(item: string): boolean {
  const trimmed = item.trim();
  return trimmed === 'ET' || trimmed === 'OU';
}

export function isSubItem(item: string): boolean {
  const trimmed = item.trim();
  return (
    /^o\s+/i.test(trimmed) ||
    /^\-\s+/.test(trimmed) ||
    /^[a-z]\.\s+/i.test(trimmed) ||
    /^•\s+/.test(trimmed)
  );
}

export function cleanSubItem(item: string): string {
  return item
    .replace(/^[\s]*[o\-•]\s+/i, '')
    .replace(/^[\s]*[a-z]\.\s+/i, '');
}

export function isParenthetical(item: string): boolean {
  return item.trim().startsWith('(');
}

/**
 * Formats references to footnotes (e.g. NOC, PM, 1, 2) with nice <sup> styling
 */
export function formatTextWithNotes(text: string, sanitizer: DomSanitizer): SafeHtml {
  if (!text) return '';
  const htmlEscaped = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const embeddedRegex =
    /(^|[^\p{L}\p{N}])(NOC|NPC|NQ|suivants|suivantes|libération|actuel|actuelle|précédent|précédents|précédente|précédentes|années|civil|agréé|accrédité|EDO|Autorisation|Canada|vitae|D\.M\.D\.|professionnelle|Pharmacie|entrée|tertiaires|MÉ|cycle|autorisé|social|restriction|territoriale|M\.S\.S\.|clinique|OAP|Sgt\/M|Sgt|règle|RECL|PSAC|Candidat|candidats|PFOR|PMEP|PFUMR|PFOEP|PIOSR|PNSCO|MÉC|TECH|SUR|SAP|ADJUC|baccalauréat|expérience|diplôme|certificat|programme|professionnel|cours|OFP|GÉNIE|santé|dentaire|ESNEM|Critique|PMED|PFDM|MSÉ|pratique|infirmiers|chacun|ES-PMNE|stages)([^\p{L}\p{N}]{1,4}?)((?:[1-9]|1[0-9]|20)(?:,\s*(?:[1-9]|1[0-9]|20))*)(?=$|[^\p{L}\p{N}])/giu;

  let formatted = htmlEscaped.replace(
    embeddedRegex,
    (match, prefix, keyword, space, notes) => {
      const maybeNotes = notes
        .split(',')
        .map((n: string) => parseInt(n.trim(), 10));
      if (maybeNotes.some((n: number) => n > 20)) {
        return match;
      }
      const styledNotes = `<sup class="text-indigo-600 font-bold bg-indigo-50 px-1 py-0.5 rounded ml-1 tracking-tighter">${notes}</sup>`;
      return prefix + keyword + space + styledNotes;
    }
  );

  const endRegex =
    /\s+((?:[1-9]|1[0-9]|20)(?:,\s*(?:[1-9]|1[0-9]|20))*)(?:\s*:)?$/g;

  formatted = formatted.replace(endRegex, (match, notes) => {
    const maybeNotes = notes
      .split(',')
      .map((n: string) => parseInt(n.trim(), 10));
    if (maybeNotes.some((n: number) => n > 20)) {
      return match;
    }
    const hasColon = match.includes(':');
    const suffix = hasColon ? ' :' : '';
    return ` <sup class="text-indigo-600 font-bold bg-indigo-50 px-1 py-0.5 rounded ml-1 tracking-tighter">${notes}</sup>${suffix}`;
  });

  return sanitizer.bypassSecurityTrustHtml(formatted);
}

/**
 * Fallback requirements formatter when structured table details are absent
 */
export function formatRequirementsFallback(req: string | undefined, sanitizer: DomSanitizer): SafeHtml {
  if (!req) return '';

  const regForceMatch = req.match(/FORCE RÉGULIÈRE:(.*?)(?=FORCE DE RÉSERVE:|$)/i);
  const resForceMatch = req.match(/FORCE DE RÉSERVE:(.*)/i);

  if (regForceMatch) {
    const regText = regForceMatch[1].trim();
    const resText = resForceMatch ? resForceMatch[1].trim() : null;

    let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">';
    html += `
      <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-xs">
        <h3 class="font-bold text-indigo-900 mb-3 border-b border-indigo-200 pb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
          FORCE RÉGULIÈRE
        </h3>
        <div class="text-xs sm:text-sm text-slate-700 space-y-2">
          ${formatSentenceList(regText)}
        </div>
      </div>
    `;

    if (resText) {
      html += `
        <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-xs">
          <h3 class="font-bold text-indigo-900 mb-3 border-b border-indigo-200 pb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            FORCE DE RÉSERVE
          </h3>
          <div class="text-xs sm:text-sm text-slate-700 space-y-2">
            ${formatSentenceList(resText)}
          </div>
        </div>
      `;
    }

    html += '</div>';
    return sanitizer.bypassSecurityTrustHtml(html);
  }

  const simpleHtml = req
    .replace(/(FORCE RÉGULIÈRE|FORCE DE RÉSERVE)/g, '<br><br><strong class="text-indigo-900">$1</strong><br>')
    .replace(/^<br><br>/, '');

  return sanitizer.bypassSecurityTrustHtml(simpleHtml);
}

function formatSentenceList(text: string): string {
  const sentences = text
    .split('.')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (sentences.length > 1) {
    return `<ul class="list-disc list-outside ml-4 space-y-1">
      ${sentences.map((s) => `<li>${s}.</li>`).join('')}
    </ul>`;
  }
  return `<p>${text}</p>`;
}
