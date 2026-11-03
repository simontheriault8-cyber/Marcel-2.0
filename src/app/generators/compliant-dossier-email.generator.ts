import { Task, DocumentItem, RejectionReason } from "../../services/recruitment-data.service";
import { JOB_URLS } from "../data/job-urls.data";
import {
  PORTAL_CANDIDATE_URL,
  PORTAL_CMC_ADMISSIONS_URL,
  CMC_DEPOSIT_CONFIRMATION_URL,
  CMRSJ_FAQ_URL_FR,
  CMRSJ_FAQ_URL_EN,
  CMRSJ_YOUTUBE_URL,
  SPORTS_REMPARTS_URL,
  SPORTS_PALADINS_URL,
  getForces101VideoUrl,
  getForcesCareersUrl,
  getEligibleProgramsCmrUrl,
  getBasicTrainingUrl,
} from "../data/app-links.data";

export function cleanInstructionForText(this: any, instruction: string, indent: string = '        '): string {
    if (!instruction) return '';
    let clean = instruction.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_match, url, text) => {
      const trimmedText = text.trim();
      if (trimmedText === url.trim() || trimmedText === url.replace(/^https?:\/\//, '')) {
        return url;
      }
      return `${trimmedText} (${url})`;
    });
    clean = clean.replace(/<[^>]+>/g, '');
    return clean.replace(/\n/g, `\n${indent}`);
  }

export function getCompliantNonMandatoryTasksPlain(this: any, lang: 'fr' | 'en' = 'fr'): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0) return "";

    const relevantTasks: { task: Task; items: { doc: DocumentItem; reason: RejectionReason }[]; notCompleted: boolean }[] = [];

    for (const [task, items] of structure.entries()) {
      const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");
      const isMandatory = this.isRecruiterMandatoryTask(task);

      if (isIdentity) {
        const selfieItems = items.filter(i => i.doc.nameFr.toLowerCase().includes("selfie"));
        if (selfieItems.length > 0) {
          relevantTasks.push({ task, items: selfieItems, notCompleted: false });
        }
      } else if (!isMandatory) {
        const notCompleted = this.taskNotCompletedKeys().has(task.nameFr);
        if (items.length > 0 || notCompleted) {
          relevantTasks.push({ task, items, notCompleted });
        }
      }
    }

    if (relevantTasks.length === 0) return "";

    let text = "";
    if (lang === 'fr') {
      text += `Veuillez également compléter ou corriger la/les tâche(s) suivante(s) sur votre portail :`;
      for (const { task, items, notCompleted } of relevantTasks) {
        const taskName = task.nameFr;
        text += `\n\n• ${taskName}`;
        if (notCompleted) {
          text += `\n    ◦ Vous n'avez pas complété cette tâche sur votre portail.`;
          text += `\n      → Veuillez vous connecter à votre portail et la compléter.`;
        }
        const groupedItems = new Map<DocumentItem, { doc: DocumentItem; reason: RejectionReason }[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc)!.push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i) => {
            if (task.nameFr.includes("Documents Supplémentaires")) {
              return this.getDisplayLabelForAdditionalDoc(i.doc, i.reason);
            }
            return i.reason.labelFr;
          });
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} et ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' et ' + labels[labels.length - 1];
          }

          text += `\n    ◦ ${doc.nameFr} : ${labelsStr}`;

          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              text += `\n      → ${this.cleanInstructionForText(item.reason.instructionFr, '        ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              const cleanLink = item.reason.linkFr.replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '$2 ($1)');
              text += `\n      🔗 ${cleanLink}`;
            }
          }
        }
      }
    } else {
      text += `Please also complete or correct the following task(s) on your portal:`;
      for (const { task, items, notCompleted } of relevantTasks) {
        const taskName = task.nameEn || task.nameFr;
        text += `\n\n• ${taskName}`;
        if (notCompleted) {
          text += `\n    ◦ You have not completed this task on your portal.`;
          text += `\n      → Please log in to your portal and complete it.`;
        }
        const groupedItems = new Map<DocumentItem, { doc: DocumentItem; reason: RejectionReason }[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc)!.push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i) => {
            if (task.nameFr.includes("Documents Supplémentaires")) {
              const dossierJobs = this.getDossierJobObjects();
              const matchingJobs = dossierJobs.filter((j) => this.isAdditionalDocRequiredForJob(i.doc.nameFr, j.id));
              if (matchingJobs.length > 0) {
                const texts = matchingJobs.map((j) => this.getJobSpecificDocText(j.id, i.doc.nameFr, false));
                return Array.from(new Set(texts)).join(" — ");
              }
              return i.reason.labelEn || i.reason.labelFr;
            }
            return i.reason.labelEn || i.reason.labelFr;
          });
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }

          text += `\n    ◦ ${doc.nameEn || doc.nameFr} : ${labelsStr}`;

          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            const instr = item.reason.instructionEn || item.reason.instructionFr;
            if (!uniqueInstructions.has(instr)) {
              uniqueInstructions.add(instr);
              text += `\n      → ${this.cleanInstructionForText(instr, '        ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            const link = item.reason.linkEn || item.reason.linkFr;
            if (link && !uniqueLinks.has(link)) {
              uniqueLinks.add(link);
              const cleanLink = link.replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '$2 ($1)');
              text += `\n      🔗 ${cleanLink}`;
            }
          }
        }
      }
    }

    return text;
  }

export function getCompliantNonMandatoryTasksHtml(this: any, lang: 'fr' | 'en' = 'fr'): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0) return "";

    const relevantTasks: { task: Task; items: { doc: DocumentItem; reason: RejectionReason }[]; notCompleted: boolean }[] = [];

    for (const [task, items] of structure.entries()) {
      const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");
      const isMandatory = this.isRecruiterMandatoryTask(task);

      if (isIdentity) {
        const selfieItems = items.filter(i => i.doc.nameFr.toLowerCase().includes("selfie"));
        if (selfieItems.length > 0) {
          relevantTasks.push({ task, items: selfieItems, notCompleted: false });
        }
      } else if (!isMandatory) {
        const notCompleted = this.taskNotCompletedKeys().has(task.nameFr);
        if (items.length > 0 || notCompleted) {
          relevantTasks.push({ task, items, notCompleted });
        }
      }
    }

    if (relevantTasks.length === 0) return "";

    let html = "";
    if (lang === 'fr') {
      html += `<p><strong>Veuillez également compléter ou corriger la/les tâche(s) suivante(s) sur votre portail :</strong></p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const { task, items, notCompleted } of relevantTasks) {
        const taskName = task.nameFr;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskName}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (notCompleted) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="color: #FF0000; font-weight: bold;">Vous n'avez pas complété cette tâche sur votre portail.</span>`;
          html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; Veuillez vous connecter à votre portail et la compléter.</div>`;
          html += `</li>`;
        }
        const groupedItems = new Map<DocumentItem, { doc: DocumentItem; reason: RejectionReason }[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc)!.push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i) => {
            if (task.nameFr.includes("Documents Supplémentaires")) {
              return this.getDisplayLabelForAdditionalDoc(i.doc, i.reason);
            }
            return i.reason.labelFr;
          });
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} et ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' et ' + labels[labels.length - 1];
          }

          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameFr} : <span style="color: #FF0000;">${labelsStr}</span></strong></span>`;

          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkFr}</div>`;
            }
          }
          html += `</li>`;
        }
        html += `</ul></li>`;
      }
      html += `</ul>`;
    } else {
      html += `<p><strong>Please also complete or correct the following task(s) on your portal:</strong></p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const { task, items, notCompleted } of relevantTasks) {
        const taskName = task.nameEn || task.nameFr;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskName}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (notCompleted) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="color: #FF0000; font-weight: bold;">You have not completed this task on your portal.</span>`;
          html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; Please log in to your portal and complete it.</div>`;
          html += `</li>`;
        }
        const groupedItems = new Map<DocumentItem, { doc: DocumentItem; reason: RejectionReason }[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc)!.push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i) => {
            if (task.nameFr.includes("Documents Supplémentaires")) {
              const dossierJobs = this.getDossierJobObjects();
              const matchingJobs = dossierJobs.filter((j) => this.isAdditionalDocRequiredForJob(i.doc.nameFr, j.id));
              if (matchingJobs.length > 0) {
                const texts = matchingJobs.map((j) => this.getJobSpecificDocText(j.id, i.doc.nameFr, false));
                return Array.from(new Set(texts)).join(" — ");
              }
              return i.reason.labelEn || i.reason.labelFr;
            }
            return i.reason.labelEn || i.reason.labelFr;
          });
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }

          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameEn || doc.nameFr} : <span style="color: #FF0000;">${labelsStr}</span></strong></span>`;

          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            const instr = item.reason.instructionEn || item.reason.instructionFr;
            if (!uniqueInstructions.has(instr)) {
              uniqueInstructions.add(instr);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${instr.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            const link = item.reason.linkEn || item.reason.linkFr;
            if (link && !uniqueLinks.has(link)) {
              uniqueLinks.add(link);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${link}</div>`;
            }
          }
          html += `</li>`;
        }
        html += `</ul></li>`;
      }
      html += `</ul>`;
    }

    return html;
  }

export function getCompliantEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const nonMandatoryTasksHtmlFr = this.getCompliantNonMandatoryTasksHtml('fr');
    const nonMandatoryTasksHtmlEn = this.getCompliantNonMandatoryTasksHtml('en');
    const dossierJobs = this.getDossierJobObjects().filter((j: any) => j.id !== '00003');

    // --- FRENCH BLOCK ---
    let frHtml = `<p>Bonjour,</p>`;
    frHtml += `<p>Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.</p>`;
    frHtml += `<p>Afin de pouvoir continuer votre processus, vous devrez <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">OBLIGATOIREMENT</span> :</p>`;
    
    frHtml += `<p><strong>1-Vous informer :</strong></p>`;
    frHtml += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    frHtml += `  <li style="margin-bottom: 5px;">Regarder et comprendre le contenu de la présentation suivante : <a href="${getForces101VideoUrl(false)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Présentation Forces 101</a></li>`;
    if (dossierJobs.length > 0) {
      const jobLinksFr = dossierJobs.map((j: any) => this.getPforJobLinkMarkup(j.id, true, true)).join(', ');
      frHtml += `  <li style="margin-bottom: 5px;">Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits : ${jobLinksFr}</li>`;
    } else {
      frHtml += `  <li style="margin-bottom: 5px;">Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits <a href="${getForcesCareersUrl(false)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Carrières | Forces armées canadiennes</a></li>`;
    }
    frHtml += `  <li style="margin-bottom: 5px;">Explorer et bien comprendre la section <a href="${getBasicTrainingUrl(false)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Instruction de base</a> du site Forces.ca</li>`;
    frHtml += `</ul>`;

    frHtml += `<p><strong>2-Après avoir regardé la vidéo, Prendre rendez-vous pour une consultation via le calendrier de votre portail.</strong> <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Lien vers le Portail d'enrôlement des Forces armées canadiennes</a>&nbsp;<span style="background-color: #00FF00; padding: 0 4px; font-weight: 500;">De nouvelles plages horaires ouvriront d’ici 14 jours sur votre portail.</span></p>`;

    frHtml += `<p>Cette consultation auprès d’un recruteur sera nécessaire afin de valider votre connaissance des professions militaires qui vous intéressent, de la nature du cours de qualification militaire de base (QMB) et des exigences que comporte un engagement au sein de la force régulière des Forces armées canadiennes. Cette consultation n’est pas une entrevue officielle. Lorsque votre dossier sera distribué à un gestionnaire de dossier, celui-ci vous attribuera une tâche pour prendre un rendez-vous avec un conseiller en carrière militaire et c’est avec ce conseiller que vous ferez votre entrevue officielle pour un emploie dans les forces armées canadienne.</p>`;

    if (nonMandatoryTasksHtmlFr) {
      frHtml += nonMandatoryTasksHtmlFr;
    }

    frHtml += `<p>Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.</p>`;
    frHtml += `<p>Merci encore et au plaisir de votre faire votre connaissance.</p>`;
    frHtml += `<p>` + this.getHtmlSignatureFr() + `</p>`;

    // --- ENGLISH BLOCK ---
    let enHtml = `<p>Hello,</p>`;
    enHtml += `<p>Thank you very much for providing your documents and selecting your preferred occupation.</p>`;
    enHtml += `<p>In order to continue your application process, You will be <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">REQUIRED</span> to:</p>`;

    enHtml += `<p><strong>1- Inform yourself :</strong></p>`;
    enHtml += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    enHtml += `  <li style="margin-bottom: 5px;">Watch and understand the content of the following presentation: <a href="${getForces101VideoUrl(true)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Forces 101 Presentation</a></li>`;
    if (dossierJobs.length > 0) {
      const jobLinksEn = dossierJobs.map((j: any) => this.getPforJobLinkMarkup(j.id, false, true)).join(', ');
      enHtml += `  <li style="margin-bottom: 5px;">Watch the video and review the description of the trade(s) you are registered for : ${jobLinksEn}</li>`;
    } else {
      enHtml += `  <li style="margin-bottom: 5px;">Watch the video and review the description of the trade(s) you are registered for. <a href="${getForcesCareersUrl(true)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Careers | Canadian Armed Forces</a></li>`;
    }
    enHtml += `  <li style="margin-bottom: 5px;">Explore and fully understand the <a href="${getBasicTrainingUrl(true)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Basic Training</a> section of the Forces.ca website.</li>`;
    enHtml += `</ul>`;

    enHtml += `<p><strong>2-After viewing the video, <span style="font-weight: bold;">Schedule an appointment</span> for a consultation through your portal calendar.</strong> <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Canadian Armed Forces enrolment Portal link</a>&nbsp;<span style="background-color: #00FF00; padding: 0 4px; font-weight: 500;">New time slots will open on your portal within 14 days.</span></p>`;

    enHtml += `<p>This consultation with a recruiter will be required to validate your understanding of the military occupations that interest you, the nature of the Basic Military Qualification (BMQ), and the requirements associated with enrolling in the Regular Force of the Canadian Armed Forces. This consultation is not an official interview. Once your file has been assigned to a file administrator, you will be given a task to schedule an appointment with a Military Career Counsellor. It is with this counsellor that you will complete your official interview for employment with the Canadian Armed Forces.</p>`;

    if (nonMandatoryTasksHtmlEn) {
      enHtml += nonMandatoryTasksHtmlEn;
    }

    enHtml += `<p>If no action is taken, your file will be automatically deactivated after 30 days.</p>`;
    enHtml += `<p>Thank you again, and we look forward to meeting you.</p>`;
    enHtml += `<p>` + this.getHtmlSignatureEn() + `</p>`;

    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    if (isEn) {
      html += `<p><strong>Un message en français suivra.</strong></p>`;
      html += enHtml;
      html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;
      html += frHtml;
    } else {
      html += `<p><strong>English message will follow.</strong></p>`;
      html += frHtml;
      html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;
      html += enHtml;
    }
    html += `</div>`;
    return html;
  }

export function getCompliantEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const nonMandatoryTasksFr = this.getCompliantNonMandatoryTasksPlain('fr');
    const nonMandatoryTasksEn = this.getCompliantNonMandatoryTasksPlain('en');
    const dossierJobs = this.getDossierJobObjects().filter((j: any) => j.id !== '00003');

    // --- FRENCH ---
    let frPlain = `Bonjour,\n\n`;
    frPlain += `Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.\n\n`;
    frPlain += `Afin de pouvoir continuer votre processus, vous devrez OBLIGATOIREMENT :\n\n`;
    frPlain += `1-Vous informer :\n`;
    frPlain += `•\tRegarder et comprendre le contenu de la présentation suivante : Présentation Forces 101 (${getForces101VideoUrl(false)})\n`;
    if (dossierJobs.length > 0) {
      const jobLinksFr = dossierJobs.map((j: any) => this.getPforJobLinkMarkup(j.id, true, false)).join(', ');
      frPlain += `•\tRegarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits : ${jobLinksFr}\n`;
    } else {
      frPlain += `•\tRegarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits Carrières | Forces armées canadiennes (${getForcesCareersUrl(false)})\n`;
    }
    frPlain += `•\tExplorer et bien comprendre la section Instruction de base du site Forces.ca (${getBasicTrainingUrl(false)})\n\n`;
    frPlain += `2-Après avoir regardé la vidéo, Prendre rendez-vous pour une consultation via le calendrier de votre portail. Lien vers le Portail d'enrôlement des Forces armées canadiennes (${PORTAL_CANDIDATE_URL}) De nouvelles plages horaires ouvriront d’ici 14 jours sur votre portail.\n\n`;
    frPlain += `Cette consultation auprès d’un recruteur sera nécessaire afin de valider votre connaissance des professions militaires qui vous intéressent, de la nature du cours de qualification militaire de base (QMB) et des exigences que comporte un engagement au sein de la force régulière des Forces armées canadiennes. Cette consultation n’est pas une entrevue officielle. Lorsque votre dossier sera distribué à un gestionnaire de dossier, celui-ci vous attribuera une tâche pour prendre un rendez-vous avec un conseiller en carrière militaire et c’est avec ce conseiller que vous ferez votre entrevue officielle pour un emploie dans les forces armées canadienne.\n\n`;
    if (nonMandatoryTasksFr) {
      frPlain += `${nonMandatoryTasksFr}\n\n`;
    }
    frPlain += `Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.\n\n`;
    frPlain += `Merci encore et au plaisir de votre faire votre connaissance.\n\n`;
    frPlain += this.getSignatureFr();

    // --- ENGLISH ---
    let enPlain = `Hello,\n\n`;
    enPlain += `Thank you very much for providing your documents and selecting your preferred occupation.\n\n`;
    enPlain += `In order to continue your application process, You will be REQUIRED to:\n\n`;
    enPlain += `1- Inform yourself :\n`;
    enPlain += `•\tWatch and understand the content of the following presentation: Forces 101 Presentation (${getForces101VideoUrl(true)})\n`;
    if (dossierJobs.length > 0) {
      const jobLinksEn = dossierJobs.map((j: any) => this.getPforJobLinkMarkup(j.id, false, false)).join(', ');
      enPlain += `•\tWatch the video and review the description of the trade(s) you are registered for : ${jobLinksEn}\n`;
    } else {
      enPlain += `•\tWatch the video and review the description of the trade(s) you are registered for. Careers | Canadian Armed Forces (${getForcesCareersUrl(true)})\n`;
    }
    enPlain += `•\tExplore and fully understand the Basic Training section of the Forces.ca website (${getBasicTrainingUrl(true)})\n\n`;
    enPlain += `2-After viewing the video, Schedule an appointment for a consultation through your portal calendar. Canadian Armed Forces enrolment Portal link (${PORTAL_CANDIDATE_URL}) New time slots will open on your portal within 14 days.\n\n`;
    enPlain += `This consultation with a recruiter will be required to validate your understanding of the military occupations that interest you, the nature of the Basic Military Qualification (BMQ), and the requirements associated with enrolling in the Regular Force of the Canadian Armed Forces. This consultation is not an official interview. Once your file has been assigned to a file administrator, you will be given a task to schedule an appointment with a Military Career Counsellor. It is with this counsellor that you will complete your official interview for employment with the Canadian Armed Forces.\n\n`;
    if (nonMandatoryTasksEn) {
      enPlain += `${nonMandatoryTasksEn}\n\n`;
    }
    enPlain += `If no action is taken, your file will be automatically deactivated after 30 days.\n\n`;
    enPlain += `Thank you again, and we look forward to meeting you.\n\n`;
    enPlain += this.getSignatureEn();

    if (isEn) {
      return `Un message en français suivra.\n\n${enPlain}\n\n______________________________________________________________________________\n\n${frPlain}`;
    }
    return `English message will follow.\n\n${frPlain}\n\n______________________________________________________________________________\n\n${enPlain}`;
  }

export function getPforJobLinkMarkup(this: any, jobId: string, isFrench: boolean, isHtml: boolean): string {
    const job = this.jobService.getAllJobs().find((j) => j.id === jobId);
    const urlInfo = JOB_URLS[jobId];

    let titleText = jobId;
    if (job) {
      titleText = job.title;
      if (!isFrench && urlInfo) {
        let slug =
          urlInfo.en.split("/career/")[1] ||
          urlInfo.en.split(".ca/en/")[1] ||
          "";
        slug = slug
          .replace(/\//g, "")
          .replace(/\?slug=nep/, "")
          .replace(/-/g, " ");
        if (slug) {
          titleText = slug
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        } else if (job.titleEn) {
          titleText = job.titleEn;
        }
      } else if (!isFrench && job.titleEn) {
        titleText = job.titleEn;
      }
    }

    if (urlInfo) {
      const url = isFrench ? urlInfo.fr : urlInfo.en;
      if (isHtml) {
        return `<a href="${url}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">${titleText}</a>`;
      } else {
        return `${titleText} (${url})`;
      }
    }
    if (job) {
      const fallbackUrl = getForcesCareersUrl(!isFrench);
      if (isHtml) {
        return `<a href="${fallbackUrl}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">${titleText}</a>`;
      } else {
        return `${titleText} (${fallbackUrl})`;
      }
    }
    return titleText;
  }

export function getCompliantPforEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const nonMandatoryTasksHtmlFr = this.getCompliantNonMandatoryTasksHtml('fr');
    const nonMandatoryTasksHtmlEn = this.getCompliantNonMandatoryTasksHtml('en');
    const dossierJobs = this.getDossierJobObjects().filter((j) => j.id !== '00003');

    // --- FRENCH BLOCK ---
    let frHtml = `<p>Bonjour,</p>`;
    frHtml += `<p>Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.<br>`;
    frHtml += `Afin de pouvoir continuer votre processus, vous devrez <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">OBLIGATOIREMENT</span> :</p>`;

    frHtml += `<p style="margin-bottom: 5px;"><strong>1- Vous informer :</strong></p>`;
    frHtml += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    frHtml += `  <li style="margin-bottom: 5px;">Regarder et comprendre le contenu de la présentation suivante : <a href="${getForces101VideoUrl(false)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Présentation Forces 101</a></li>`;
    if (dossierJobs.length > 0) {
      const jobLinksFr = dossierJobs.map((j) => this.getPforJobLinkMarkup(j.id, true, true)).join(', ');
      frHtml += `  <li style="margin-bottom: 5px;">Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits : ${jobLinksFr}</li>`;
    } else {
      frHtml += `  <li style="margin-bottom: 5px;">Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits <a href="${getForcesCareersUrl(false)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Carrières | Forces armées canadiennes</a></li>`;
    }
    frHtml += `  <li style="margin-bottom: 5px;">Explorer la section <a href="${CMRSJ_FAQ_URL_FR}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Foire aux Questions</a> du site internet du Collège militaire royal de Saint-Jean</li>`;
    frHtml += `  <li style="margin-bottom: 5px;">Explorer la <a href="${CMRSJ_YOUTUBE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">chaîne Youtube</a> du Collège militaire royal de Saint-Jean</li>`;
    frHtml += `</ul>`;

    frHtml += `<p style="margin-bottom: 5px;"><strong>2- Vous assurer que toutes les tâches sur votre portail sont complétées :</strong></p>`;
    frHtml += `<p style="margin-top: 0; margin-bottom: 15px;">Veuillez vous connecter à votre portail afin de vous assurer que toutes les tâches sont complétées : <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Lien vers le Portail d'enrôlement des Forces armées canadiennes</a></p>`;

    frHtml += `<p style="margin-bottom: 5px;"><strong>3- Si vous êtes un athlète de haut-niveau, vous pouvez vous rendre sur les sites internets des équipes sportives :</strong></p>`;
    frHtml += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    frHtml += `  <li style="margin-bottom: 5px;">Équipes du CMR Saint-Jean, les Remparts : <a href="${SPORTS_REMPARTS_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">gorempartsgo.ca</a></li>`;
    frHtml += `  <li style="margin-bottom: 5px;">Équipes du CMR du Canada situé à Kingston, les Paladins: <a href="${SPORTS_PALADINS_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Royal Military College of Canada - Official Athletics Website</a></li>`;
    frHtml += `</ul>`;

    frHtml += `<p>Si vous êtes un athlète de haut-niveau, il est possible pour vous de communiquer avec l’une des équipes pour vous informer au sujet des différentes équipes et des sélections de ces équipes. Pour savoir avec laquelle des équipes communiquer, n’hésitez pas à poser la question au centre de recrutement qui traite votre dossier.</p>`;

    if (nonMandatoryTasksHtmlFr) {
      frHtml += nonMandatoryTasksHtmlFr;
    }

    frHtml += this.getPforCaf101HighDemandWarningHtml('fr');

    frHtml += `<p>Si vous ne prenez aucune action dans votre portail, votre dossier fermera automatiquement dans 30 jours.</p>`;
    frHtml += `<p>` + this.getHtmlSignatureFr() + `</p>`;

    // --- ENGLISH BLOCK ---
    let enHtml = `<p>Hello,</p>`;
    enHtml += `<p>Thank you very much for providing your documents and selecting your preferred occupation.<br>`;
    enHtml += `In order to continue your application process, You will be <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">REQUIRED</span> to:</p>`;

    enHtml += `<p style="margin-bottom: 5px;"><strong>1- Inform yourself :</strong></p>`;
    enHtml += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    enHtml += `  <li style="margin-bottom: 5px;">Watch and understand the content of the following presentation: <a href="${getForces101VideoUrl(true)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Forces 101 Presentation</a></li>`;
    if (dossierJobs.length > 0) {
      const jobLinksEn = dossierJobs.map((j) => this.getPforJobLinkMarkup(j.id, false, true)).join(', ');
      enHtml += `  <li style="margin-bottom: 5px;">Watch the video and review the description of the trade(s) you are registered for : ${jobLinksEn}</li>`;
    } else {
      enHtml += `  <li style="margin-bottom: 5px;">Watch the video and review the description of the trade(s) you are registered for. <a href="${getForcesCareersUrl(true)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Careers | Canadian Armed Forces</a></li>`;
    }
    enHtml += `  <li style="margin-bottom: 5px;">Explore the <a href="${CMRSJ_FAQ_URL_EN}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Frequently Asked Questions</a> section of the Royal Military College Saint-Jean</li>`;
    enHtml += `  <li style="margin-bottom: 5px;">Explore the <a href="${CMRSJ_YOUTUBE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Youtube Channel</a> of the Royal Military College Saint-Jean</li>`;
    enHtml += `</ul>`;

    enHtml += `<p style="margin-bottom: 5px;"><strong>2- Ensure all tasks on your portal are completed:</strong></p>`;
    enHtml += `<p style="margin-top: 0; margin-bottom: 15px;">Please log in to your portal to verify and ensure that all required tasks are completed: <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Canadian Armed Forces Enrolment Portal link</a></p>`;

    enHtml += `<p style="margin-bottom: 5px;"><strong>3- If you are a high-level athlete, you can visit the websites of sports teams: </strong></p>`;
    enHtml += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    enHtml += `  <li style="margin-bottom: 5px;">RMC Saint-Jean Sports teams Les Remparts: <a href="${SPORTS_REMPARTS_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">gorempartsgo.ca</a></li>`;
    enHtml += `  <li style="margin-bottom: 5px;">RMC of Canada located in Kingston Sports teams The Paladins: <a href="${SPORTS_PALADINS_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Royal Military College of Canada - Official Athletics Website</a></li>`;
    enHtml += `</ul>`;

    enHtml += `<p>If you are a high-performance athlete, you may contact one of the teams to learn more about the different teams and their selection processes. If you are unsure which team to contact, please do not hesitate to ask the recruiting centre handling your application.</p>`;

    if (nonMandatoryTasksHtmlEn) {
      enHtml += nonMandatoryTasksHtmlEn;
    }

    enHtml += this.getPforCaf101HighDemandWarningHtml('en');

    enHtml += `<p>If no action is taken in your portal, your file will automatically close within 30 days.</p>`;
    enHtml += `<p>` + this.getHtmlSignatureEn() + `</p>`;

    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    if (isEn) {
      html += `<p><span style="background-color: #FFFF00; font-weight: bold;">Un message en français suivra.</span></p>`;
      html += enHtml;
      html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;
      html += frHtml;
    } else {
      html += `<p><span style="background-color: #FFFF00; font-weight: bold;">English message will follow.</span></p>`;
      html += frHtml;
      html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;
      html += enHtml;
    }
    html += `</div>`;
    return html;
  }


export function getPforCaf101HighDemandWarningHtml(this: any, lang: 'fr' | 'en'): string {
    const dossierJobs = this.getDossierJobObjects().filter(
      (j) => j.id !== '00003' && this.jobService.isJobInGestionDesAttentes(j.id)
    );
    if (dossierJobs.length === 0) return '';
    let html = '';
    if (lang === 'fr') {
      html += `<p>Sachez que parmi les métiers que vous avez sélectionnés, dans votre demande d'enrôlement, figurent les suivants :</p>`;
      html += `<ul style="margin-top: 5px; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
      for (const j of dossierJobs) {
        html += `  <li style="margin-bottom: 5px;"><strong>${j.title} (${j.id})</strong></li>`;
      }
      html += `</ul>`;
      html += `<p>Nous souhaitons vous informer que ce ou ces métiers suscitent actuellement un très grand nombre de candidatures. Par conséquent, il est possible que votre dossier ne soit pas traité pour ces choix en raison de la forte concurrence et des dossiers déjà actuellement en traitement.</p>`;
      html += `<p>En tenant compte de cette situation, vous pouvez soit maintenir ce ou ces choix, soit consulter les autres possibilités offertes par les Collèges militaires du Canada en utilisant le lien suivant :<br>`;
      html += `<a href="${getEligibleProgramsCmrUrl(false)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Liste des programmes admissibles par métier</a></p>`;
      html += `<p style="margin-bottom: 20px;">Nous vous invitons à nous faire part de votre décision dans les meilleurs délais afin de poursuivre le traitement de votre dossier.</p>`;
    } else {
      html += `<p>Please be aware that among the occupations you have selected in your enrolment application are the following:</p>`;
      html += `<ul style="margin-top: 5px; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
      for (const j of dossierJobs) {
        html += `  <li style="margin-bottom: 5px;"><strong>${j.titleEn || j.title} (${j.id})</strong></li>`;
      }
      html += `</ul>`;
      html += `<p>We would like to inform you that this occupation / these occupations are currently receiving a very large number of applications. Consequently, it is possible that your file may not be processed for these choices due to strong competition and the files currently in processing.</p>`;
      html += `<p>Considering this situation, you may either maintain this choice / these choices or explore the other opportunities offered by the Canadian Military Colleges using the following link:<br>`;
      html += `<a href="${getEligibleProgramsCmrUrl(true)}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">List of Eligible Programs by Occupation</a></p>`;
      html += `<p style="margin-bottom: 20px;">We invite you to let us know your decision as soon as possible in order to continue processing your application.</p>`;
    }
    return html;
  }

export function getPforCaf101HighDemandWarningPlain(this: any, lang: 'fr' | 'en'): string {
    const dossierJobs = this.getDossierJobObjects().filter(
      (j) => j.id !== '00003' && this.jobService.isJobInGestionDesAttentes(j.id)
    );
    if (dossierJobs.length === 0) return '';
    let plain = '';
    if (lang === 'fr') {
      plain += `Sachez que parmi les métiers que vous avez sélectionnés, dans votre demande d'enrôlement, figurent les suivants :\n`;
      for (const j of dossierJobs) {
        plain += `• ${j.title} (${j.id})\n`;
      }
      plain += `\nNous souhaitons vous informer que ce ou ces métiers suscitent actuellement un très grand nombre de candidatures. Par conséquent, il est possible que votre dossier ne soit pas traité pour ces choix en raison de la forte concurrence et des dossiers déjà actuellement en traitement.\n\n`;
      plain += `En tenant compte de cette situation, vous pouvez soit maintenir ce ou ces choix, soit consulter les autres possibilités offertes par les Collèges militaires du Canada en utilisant le lien suivant :\n`;
      plain += `Liste des programmes admissibles par métier (${getEligibleProgramsCmrUrl(false)})\n\n`;
      plain += `Nous vous invitons à nous faire part de votre décision dans les meilleurs délais afin de poursuivre le traitement de votre dossier.\n\n`;
    } else {
      plain += `Please be aware that among the occupations you have selected in your enrolment application are the following:\n`;
      for (const j of dossierJobs) {
        plain += `• ${j.titleEn || j.title} (${j.id})\n`;
      }
      plain += `\nWe would like to inform you that this occupation / these occupations are currently receiving a very large number of applications. Consequently, it is possible that your file may not be processed for these choices due to strong competition and the files currently in processing.\n\n`;
      plain += `Considering this situation, you may either maintain this choice / these choices or explore the other opportunities offered by the Canadian Military Colleges using the following link:\n`;
      plain += `List of Eligible Programs by Occupation (${getEligibleProgramsCmrUrl(true)})\n\n`;
      plain += `We invite you to let us know your decision as soon as possible in order to continue processing your application.\n\n`;
    }
    return plain;
  }

export function getCompliantPforEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const nonMandatoryTasksFr = this.getCompliantNonMandatoryTasksPlain('fr');
    const nonMandatoryTasksEn = this.getCompliantNonMandatoryTasksPlain('en');
    const dossierJobs = this.getDossierJobObjects().filter((j) => j.id !== '00003');

    // --- FRENCH ---
    let frPlain = `Bonjour,\n\n`;
    frPlain += `Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.\n`;
    frPlain += `Afin de pouvoir continuer votre processus, vous devrez OBLIGATOIREMENT :\n\n`;
    frPlain += `    1- Vous informer :\n`;
    frPlain += `• Regarder et comprendre le contenu de la présentation suivante : Présentation Forces 101 (${getForces101VideoUrl(false)})\n`;
    if (dossierJobs.length > 0) {
      const jobLinksFr = dossierJobs.map((j) => this.getPforJobLinkMarkup(j.id, true, false)).join(', ');
      frPlain += `• Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits : ${jobLinksFr}\n`;
    } else {
      frPlain += `• Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits Carrières | Forces armées canadiennes (${getForcesCareersUrl(false)})\n`;
    }
    frPlain += `• Explorer la section Foire aux Questions du site internet du Collège militaire royal de Saint-Jean (${CMRSJ_FAQ_URL_FR})\n`;
    frPlain += `• Explorer la chaîne Youtube du Collège militaire royal de Saint-Jean (${CMRSJ_YOUTUBE_URL})\n\n`;
    frPlain += `2- Vous assurer que toutes les tâches sur votre portail sont complétées :\n`;
    frPlain += `Veuillez vous connecter à votre portail afin de vous assurer que toutes les tâches sont complétées : Lien vers le Portail d'enrôlement des Forces armées canadiennes (${PORTAL_CANDIDATE_URL})\n\n`;
    frPlain += `3- Si vous êtes un athlète de haut-niveau, vous pouvez vous rendre sur les sites internets des équipes sportives :\n`;
    frPlain += `• Équipes du CMR Saint-Jean, les Remparts : gorempartsgo.ca (${SPORTS_REMPARTS_URL})\n`;
    frPlain += `• Équipes du CMR du Canada situé à Kingston, les Paladins: Royal Military College of Canada - Official Athletics Website (${SPORTS_PALADINS_URL})\n\n`;
    frPlain += `Si vous êtes un athlète de haut-niveau, il est possible pour vous de communiquer avec l’une des équipes pour vous informer au sujet des différentes équipes et des sélections de ces équipes. Pour savoir avec laquelle des équipes communiquer, n’hésitez pas à poser la question au centre de recrutement qui traite votre dossier.\n\n`;

    if (nonMandatoryTasksFr) {
      frPlain += `${nonMandatoryTasksFr}\n\n`;
    }

    frPlain += this.getPforCaf101HighDemandWarningPlain('fr');

    frPlain += `Si vous ne prenez aucune action dans votre portail, votre dossier fermera automatiquement dans 30 jours.\n\n`;
    frPlain += this.getSignatureFr();

    // --- ENGLISH ---
    let enPlain = `Hello,\n\n`;
    enPlain += `Thank you very much for providing your documents and selecting your preferred occupation.\n`;
    enPlain += `In order to continue your application process, You will be REQUIRED to:\n\n`;
    enPlain += `1- Inform yourself :\n`;
    enPlain += `• Watch and understand the content of the following presentation: Forces 101 Presentation (${getForces101VideoUrl(true)})\n`;
    if (dossierJobs.length > 0) {
      const jobLinksEn = dossierJobs.map((j) => this.getPforJobLinkMarkup(j.id, false, false)).join(', ');
      enPlain += `• Watch the video and review the description of the trade(s) you are registered for : ${jobLinksEn}\n`;
    } else {
      enPlain += `• Watch the video and review the description of the trade(s) you are registered for. Careers | Canadian Armed Forces (${getForcesCareersUrl(true)})\n`;
    }
    enPlain += `• Explore the Frequently Asked Questions section of the Royal Military College Saint-Jean (${CMRSJ_FAQ_URL_EN})\n`;
    enPlain += `• Explore the Youtube Channel of the Royal Military College Saint-Jean (${CMRSJ_YOUTUBE_URL})\n\n`;
    enPlain += `2- Ensure all tasks on your portal are completed:\n`;
    enPlain += `Please log in to your portal to verify and ensure that all required tasks are completed: Canadian Armed Forces Enrolment Portal link (${PORTAL_CANDIDATE_URL})\n\n`;
    enPlain += `3- If you are a high-level athlete, you can visit the websites of sports teams: \n`;
    enPlain += `• RMC Saint-Jean Sports teams Les Remparts: gorempartsgo.ca (${SPORTS_REMPARTS_URL})\n`;
    enPlain += `• RMC of Canada located in Kingston Sports teams The Paladins: Royal Military College of Canada - Official Athletics Website (${SPORTS_PALADINS_URL})\n\n`;
    enPlain += `If you are a high-performance athlete, you may contact one of the teams to learn more about the different teams and their selection processes. If you are unsure which team to contact, please do not hesitate to ask the recruiting centre handling your application.\n\n`;

    if (nonMandatoryTasksEn) {
      enPlain += `${nonMandatoryTasksEn}\n\n`;
    }

    enPlain += this.getPforCaf101HighDemandWarningPlain('en');

    enPlain += `If no action is taken in your portal, your file will automatically close within 30 days.\n\n`;
    enPlain += this.getSignatureEn();

    if (isEn) {
      return `Un message en français suivra.\n\n${enPlain}\n\n______________________________________________________________________________\n\n${frPlain}`;
    }
    return `English message will follow.\n\n${frPlain}\n\n______________________________________________________________________________\n\n${enPlain}`;
  }


export function getCompliantPforLienPaEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    let frHtml = `<p>Bonjour,</p>`;
    frHtml += `<p>Nous vous remercions de votre intérêt envers les Forces armées canadiennes (FAC). Dans votre demande, vous avez sélectionné le Programme de Formation des Officiers de la Régulière (PFOR).</p>`;
    frHtml += `<p>Malgré que vous ayez déjà déposer tous vos documents scolaires sur votre portail du postulant, vous devez <span style="background-color: #FFFF00;">obligatoirement</span> les déposer aussi sur le portail du Collège militaire royal du Canada (CMR) afin de poursuivre le traitement de votre demande. Le Collège militaire royal du Canada (CMR) doit évaluer votre potentiel académique en regardant tous ces documents. Veuillez lire les instructions en entier avant de procéder sur le site web du CMR.</p>`;
    frHtml += `<p><strong>Voici comment procéder pour leur transmettre :</strong></p>`;

    frHtml += `<ol style="list-style-type: decimal; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">`;
    frHtml += `  <li style="margin-bottom: 10px;">Visitez le site web du Collège militaire royal du Canada (CMR) à l’adresse suivante :<br><a href="${PORTAL_CMC_ADMISSIONS_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; background-color: #FFFF00;">Admissions - Collège militaire royal du Canada (CMR) (rmc.ca)</a><br><br><strong>Remarque :</strong> Vous pourriez avoir à copier-coller le lien dans votre navigateur ou à changer de navigateur pour accéder au lien (ex. Firefox ou Chrome).</li>`;
    frHtml += `  <li style="margin-bottom: 10px;">Vous devrez remplir le formulaire à l’aide de votre numéro de matricule que vous trouverez dans le volet latéral gauche de votre portail du postulant.</li>`;
    frHtml += `  <li style="margin-bottom: 10px;">Vous devrez numériser vos relevés de notes officiels, y compris le verso (études secondaires et postsecondaires), puis les télécharger sur le site. (Même si vous l’avez déjà fait sur votre portail Forces.ca au début de votre processus de recrutement)</li>`;
    frHtml += `  <li style="margin-bottom: 10px;"><span style="background-color: #FFFF00;">Prenez une capture d’écran de la page de confirmation que vos documents ont été déposés avec succès puis téléversez la sur votre portail du postulant en ligne sous la tâche « Autres exigences en matière de sécurité ». Voir exemple en pièce jointe (<a href="${CMC_DEPOSIT_CONFIRMATION_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline;">Confirmation application</a>)</span></li>`;
    frHtml += `</ol>`;

    frHtml += `<p><strong>***Une personne ayant suivi ses études à l’extérieur du Canada, du Royaume-Uni, des États-Unis d’Amérique, de la France et/ou en possession d’un baccalauréat international doit obtenir une évaluation comparative des études par une tierce partie agréée. Les évaluations générales ne seront pas acceptées. Vous devrez ensuite télécharger les résultats de cette évaluation sur le portail du PFOR via le lien fourni ci-dessus. ***</strong></p>`;

    frHtml += `<p>Une fois que les documents requis auront été reçus, votre dossier sera examiné par le Collège militaire royal du Canada (Kingston) pour les postulantes et postulants seniors, et par le CMR Saint-Jean pour les postulantes et postulants juniors.</p>`;

    frHtml += `<p>S’il est établi que vous satisfaisiez aux exigences minimales et que le Collège décide de traiter votre demande, le centre de recrutement pourra continuer le traitement de votre dossier et vous en serai informé par courriel ou en recevant des tâches supplémentaires sur votre portail.</p>`;

    frHtml += `<p>Si vous avez des questions, n’hésitez pas à communiquer avec nous par courriel à <a href="mailto:PFOR_CRFC_Quebec@Forces.gc.ca" style="color: #4f46e5; text-decoration: underline;">PFOR_CRFC_Quebec@Forces.gc.ca</a>.</p>`;

    frHtml += `<p>Nous vous remercions de votre intérêt à joindre les Forces armées canadiennes.</p>`;
    frHtml += `<p>` + this.getHtmlSignatureFr() + `</p>`;

    // --- ENGLISH BLOCK ---
    let enHtml = `<p>Hello,</p>`;
    enHtml += `<p>Thank you for your interest in the Canadian Armed Forces (CAF). In your application, you selected the Regular Officer Training Plan (ROTP).</p>`;
    enHtml += `<p>Even though you have already uploaded all your academic documents on your applicant portal, you <span style="background-color: #FFFF00;">must</span> also upload them on the Royal Military College of Canada (RMC) portal in order to continue processing your application. The Royal Military College of Canada (RMC) must evaluate your academic potential by reviewing all these documents. Please read the full instructions before proceeding on the RMC website.</p>`;
    enHtml += `<p><strong>Here is how to proceed to submit them to them:</strong></p>`;

    enHtml += `<ol style="list-style-type: decimal; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">`;
    enHtml += `  <li style="margin-bottom: 10px;">Visit the Royal Military College of Canada (RMC) website at the following link:<br><a href="${PORTAL_CMC_ADMISSIONS_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline; background-color: #FFFF00;">Royal Military College of Canada (RMC)</a><br><br><strong>Note:</strong> You may need to copy and paste the link into your browser or change browsers to access the link (e.g., Firefox or Chrome).</li>`;
    enHtml += `  <li style="margin-bottom: 10px;">You will need to fill in the form using your service number which you can find in the left sidebar of your applicant portal.</li>`;
    enHtml += `  <li style="margin-bottom: 10px;">You will need to scan your official transcripts, including the back (secondary and post-secondary), and upload them to the site. (Even if you have already done so on your portal when you begin your online application)</li>`;
    enHtml += `  <li style="margin-bottom: 10px;"><span style="background-color: #FFFF00;">Take a screenshot of the confirmation page that your documents have been successfully submitted, then upload it to your online applicant portal under the "Other Security Requirements" task. See example attached (<a href="${CMC_DEPOSIT_CONFIRMATION_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline;">Application confirmation</a>)</span></li>`;
    enHtml += `</ol>`;

    enHtml += `<p><strong>***Applicants who studied outside Canada, United Kingdom, United States of America, France and/or who hold an International Baccalaureate must obtain a comparative educational assessment from an accredited third party. General evaluations will not be accepted. You must then upload the results of this evaluation to the ROTP portal via the link provided above. ***</strong></p>`;

    enHtml += `<p>Once the required documents have been received, your file will be reviewed by the Royal Military College of Canada (Kingston) for senior applicants, and by CMR Saint-Jean for junior applicants.</p>`;

    enHtml += `<p>If it is determined that you meet the minimum requirements and the College decides to process your application, the recruitment centre will be able to continue processing your file, and you will be informed either by email or by receiving additional tasks on your portal.</p>`;

    enHtml += `<p>For any questions, please feel free to contact us by email to: <a href="mailto:PFOR_CRFC_Quebec@Forces.gc.ca" style="color: #4f46e5; text-decoration: underline;">PFOR_CRFC_Quebec@Forces.gc.ca</a>.</p>`;

    enHtml += `<p>Thank you for your interest in joining the Canadian Armed Forces.</p>`;
    enHtml += `<p>` + this.getHtmlSignatureEn() + `</p>`;

    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    if (isEn) {
      html += `<p><span style="background-color: #FFFF00; font-weight: bold;">Un message en français suivra.</span></p>`;
      html += enHtml;
      html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;
      html += frHtml;
    } else {
      html += `<p><span style="background-color: #FFFF00; font-weight: bold;">English message will follow.</span></p>`;
      html += frHtml;
      html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;
      html += enHtml;
    }
    html += `</div>`;
    return html;
  }

export function getCompliantPforLienPaEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    let frPlain = `Bonjour,\n\n`;
    frPlain += `Nous vous remercions de votre intérêt envers les Forces armées canadiennes (FAC). Dans votre demande, vous avez sélectionné le Programme de Formation des Officiers de la Régulière (PFOR).\n\n`;
    frPlain += `Malgré que vous ayez déjà déposer tous vos documents scolaires sur votre portail du postulant, vous devez OBLIGATOIREMENT les déposer aussi sur le portail du Collège militaire royal du Canada (CMR) afin de poursuivre le traitement de votre demande. Le Collège militaire royal du Canada (CMR) doit évaluer votre potentiel académique en regardant tous ces documents. Veuillez lire les instructions en entier avant de procéder sur le site web du CMR.\n\n`;
    frPlain += `Voici comment procéder pour leur transmettre :\n\n`;
    frPlain += `1. Visitez le site web du Collège militaire royal du Canada (CMR) à l’adresse suivante :\n`;
    frPlain += `Admissions - Collège militaire royal du Canada (CMR) (rmc.ca) (${PORTAL_CMC_ADMISSIONS_URL})\n\n`;
    frPlain += `Remarque : Vous pourriez avoir à copier-coller le lien dans votre navigateur ou à changer de navigateur pour accéder au lien (ex. Firefox ou Chrome).\n\n`;
    frPlain += `2. Vous devrez remplir le formulaire à l’aide de votre numéro de matricule que vous trouverez dans le volet latéral gauche de votre portail du postulant.\n\n`;
    frPlain += `3. Vous devrez numériser vos relevés de notes officiels, y compris le verso (études secondaires et postsecondaires), puis les télécharger sur le site. (Même si vous l’avez déjà fait sur votre portail Forces.ca au début de votre processus de recrutement)\n\n`;
    frPlain += `4. Prenez une capture d’écran de la page de confirmation que vos documents ont été déposés avec succès puis téléversez la sur votre portail du postulant en ligne sous la tâche « Autres exigences en matière de sécurité ». Voir exemple en pièce jointe (Confirmation application)\n\n`;
    frPlain += `***Une personne ayant suivi ses études à l’extérieur du Canada, du Royaume-Uni, des États-Unis d’Amérique, de la France et/ou en possession d’un baccalauréat international doit obtenir une évaluation comparative des études par une tierce partie agréée. Les évaluations générales ne seront pas acceptées. Vous devrez ensuite télécharger les résultats de cette évaluation sur le portail du PFOR via le lien fourni ci-dessus. ***\n\n`;
    frPlain += `Une fois que les documents requis auront été reçus, votre dossier sera examiné par le Collège militaire royal du Canada (Kingston) pour les postulantes et postulants seniors, et par le CMR Saint-Jean pour les postulantes et postulants juniors.\n\n`;
    frPlain += `S’il est établi que vous satisfaisiez aux exigences minimales et que le Collège décide de traiter votre demande, le centre de recrutement pourra continuer le traitement de votre dossier et vous en serai informé par courriel ou en recevant des tâches supplémentaires sur votre portail.\n\n`;
    frPlain += `Si vous avez des questions, n’hésitez pas à communiquer avec nous par courriel à PFOR_CRFC_Quebec@Forces.gc.ca.\n\n`;
    frPlain += `Nous vous remercions de votre intérêt à joindre les Forces armées canadiennes.\n\n`;
    frPlain += this.getSignatureFr();

    let enPlain = `Hello,\n\n`;
    enPlain += `Thank you for your interest in the Canadian Armed Forces (CAF). In your application, you selected the Regular Officer Training Plan (ROTP).\n\n`;
    enPlain += `Even though you have already uploaded all your academic documents on your applicant portal, you MUST also upload them on the Royal Military College of Canada (RMC) portal in order to continue processing your application. The Royal Military College of Canada (RMC) must evaluate your academic potential by reviewing all these documents. Please read the full instructions before proceeding on the RMC website.\n\n`;
    enPlain += `Here is how to proceed to submit them to them:\n\n`;
    enPlain += `1. Visit the Royal Military College of Canada (RMC) website at the following link:\n`;
    enPlain += `Royal Military College of Canada (RMC) (${PORTAL_CMC_ADMISSIONS_URL})\n\n`;
    enPlain += `Note: You may need to copy and paste the link into your browser or change browsers to access the link (e.g., Firefox or Chrome).\n\n`;
    enPlain += `2. You will need to fill in the form using your service number which you can find in the left sidebar of your applicant portal.\n\n`;
    enPlain += `3. You will need to scan your official transcripts, including the back (secondary and post-secondary), and upload them to the site. (Even if you have already done so on your portal when you begin your online application)\n\n`;
    enPlain += `4. Take a screenshot of the confirmation page that your documents have been successfully submitted, then upload it to your online applicant portal under the "Other Security Requirements" task. See example attached (Application confirmation)\n\n`;
    enPlain += `***Applicants who studied outside Canada, United Kingdom, United States of America, France and/or who hold an International Baccalaureate must obtain a comparative educational assessment from an accredited third party. General evaluations will not be accepted. You must then upload the results of this evaluation to the ROTP portal via the link provided above. ***\n\n`;
    enPlain += `Once the required documents have been received, your file will be reviewed by the Royal Military College of Canada (Kingston) for senior applicants, and by CMR Saint-Jean for junior applicants.\n\n`;
    enPlain += `If it is determined that you meet the minimum requirements and the College decides to process your application, the recruitment centre will be able to continue processing your file, and you will be informed either by email or by receiving additional tasks on your portal.\n\n`;
    enPlain += `For any questions, please feel free to contact us by email to: PFOR_CRFC_Quebec@Forces.gc.ca.\n\n`;
    enPlain += `Thank you for your interest in joining the Canadian Armed Forces.\n\n`;
    enPlain += this.getSignatureEn();

    if (isEn) {
      return `Un message en français suivra.\n\n${enPlain}\n\n______________________________________________________________________________\n\n${frPlain}`;
    }
    return `English message will follow.\n\n${frPlain}\n\n______________________________________________________________________________\n\n${enPlain}`;
  }



