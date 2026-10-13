import { Injectable, inject } from "@angular/core";
import { Task, DocumentItem, RejectionReason } from "./recruitment-data.service";
import { JobEntry } from "./jobs-data";
import { AdditionalDocsService } from "./additional-docs.service";
import { JobDatabaseService } from "./job-database.service";

@Injectable({
  providedIn: "root",
})
export class RejectionEmailService {
  private additionalDocsService = inject(AdditionalDocsService);
  private jobService = inject(JobDatabaseService);

  cleanInstructionForText(instruction: string, indent: string = '        '): string {
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

  getCompliantNonMandatoryTasksPlain(
    structure: Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>,
    taskNotCompletedKeys: Set<string>,
    lang: 'fr' | 'en' = 'fr'
  ): string {
    if (structure.size === 0) return "";

    const relevantTasks: { task: Task; items: { doc: DocumentItem; reason: RejectionReason }[]; notCompleted: boolean }[] = [];

    for (const [task, items] of structure.entries()) {
      const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");
      const isFormNote = task.nameFr.includes("Formulaire de demande d'emploi notée") || task.nameFr.includes("Formulaire de demande d’emploi noté");
      const isMdn2977 = task.nameFr.includes("MDN 2977");

      if (isIdentity) {
        const selfieItems = items.filter(i => i.doc.nameFr.toLowerCase().includes("selfie"));
        if (selfieItems.length > 0) {
          relevantTasks.push({ task, items: selfieItems, notCompleted: false });
        }
      } else if (isFormNote || isMdn2977) {
        const notCompleted = taskNotCompletedKeys.has(task.nameFr);
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
          const labels = docItems.map((i) => i.reason.labelFr);
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
          const labels = docItems.map((i) => i.reason.labelEn);
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

  getCompliantNonMandatoryTasksHtml(
    structure: Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>,
    taskNotCompletedKeys: Set<string>,
    lang: 'fr' | 'en' = 'fr'
  ): string {
    if (structure.size === 0) return "";

    const relevantTasks: { task: Task; items: { doc: DocumentItem; reason: RejectionReason }[]; notCompleted: boolean }[] = [];

    for (const [task, items] of structure.entries()) {
      const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");
      const isFormNote = task.nameFr.includes("Formulaire de demande d'emploi notée") || task.nameFr.includes("Formulaire de demande d’emploi noté");
      const isMdn2977 = task.nameFr.includes("MDN 2977");

      if (isIdentity) {
        const selfieItems = items.filter(i => i.doc.nameFr.toLowerCase().includes("selfie"));
        if (selfieItems.length > 0) {
          relevantTasks.push({ task, items: selfieItems, notCompleted: false });
        }
      } else if (isFormNote || isMdn2977) {
        const notCompleted = taskNotCompletedKeys.has(task.nameFr);
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
          const labels = docItems.map((i) => i.reason.labelFr);
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
          const labels = docItems.map((i) => i.reason.labelEn);
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

  getRejectionHtmlFr(
    structure: Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>,
    forceGeneralReminder: boolean,
    taskNotCompletedKeys: Set<string>,
    dossierJobs: JobEntry[],
    isPforActive: boolean
  ): string {
    if (structure.size === 0 && !forceGeneralReminder) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || taskNotCompletedKeys.has(task.nameFr)) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    let html = "";

    if (normalTasks.size > 0) {
      html += `<p>Nous avons procédé à l'évaluation de vos documents. Bien que votre dossier progresse, certains éléments ne sont pas conformes et nécessitent des corrections de votre part pour nous permettre de poursuivre le traitement.</p>`;
      html += `<p>Les tâches suivantes vous ont été réattribuées :</p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameFr = task.nameFr;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskNameFr}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (taskNotCompletedKeys.has(task.nameFr)) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="color: #FF0000; font-weight: bold;">Vous n'avez pas complété cette tâche sur votre portail.</span>`;
          html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; Veuillez vous connecter à votre portail et la compléter.</div>`;
          html += `</li>`;
        }
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelFr);
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
      html += `<p>En raison du volume élevé de demandes, nous devons prioriser le traitement des dossiers où l'ensemble des tâches sont conformes.</p>`;
      html += `<p>Veuillez vous connecter à votre portail pour les compléter : <a href="https://www.cafoap-pclfac.forces.gc.ca/">https://www.cafoap-pclfac.forces.gc.ca/</a></p>`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        html += `<p>De plus, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec l'information demandée pour l'élément suivant :</p>`;
      } else {
        html += `<p>Afin de poursuivre le traitement de votre dossier, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec l'information demandée pour l'élément suivant :</p>`;
      }
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of confirmationTasks.entries()) {
        const taskNameFr = task.nameFr;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskNameFr}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelFr);
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
    }

    if (additionalDocTasks.size > 0) {
      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        html += `<p>Également, afin de poursuivre le traitement de votre dossier, vous devez fournir le(s) document(s) suivant(s) :</p>`;
      } else {
        html += `<p>Afin de poursuivre le traitement de votre dossier, vous devez fournir le(s) document(s) suivant(s) :</p>`;
      }
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          for (const item of docItems) {
            const displayLabel = this.additionalDocsService.getDisplayLabelForAdditionalDoc(doc, item.reason, dossierJobs, isPforActive);
            html += `<li style="margin-bottom: 10px;">`;
            html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${displayLabel}</strong></span>`;
            
            if (item.reason.instructionFr) {
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
            }
            if (item.reason.linkFr) {
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkFr}</div>`;
            }
            html += `</li>`;
          }
        }
      }
      html += `</ul>`;
      html += `<p>Veuillez nous transmettre ce(s) document(s) en répondant directement à ce courriel.</p>`;
    }

    if (forceGeneralReminder) {
      html += `<p>Rappel : Si vous ne prenez aucune action ou ne fournissez pas les documents requis d'ici 30 jours, votre dossier sera fermé automatiquement.</p>`;
    } else {
      html += `<p>Si aucune action n'est prise d'ici 30 jours, votre dossier sera fermé automatiquement.</p>`;
    }

    return `<!-- START_TASK_BODY_FR -->${html}<!-- END_TASK_BODY_FR -->`;
  }

  getRejectionHtmlEn(
    structure: Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>,
    forceGeneralReminder: boolean,
    taskNotCompletedKeys: Set<string>,
    dossierJobs: JobEntry[],
    isPforActive: boolean
  ): string {
    if (structure.size === 0 && !forceGeneralReminder) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || taskNotCompletedKeys.has(task.nameFr)) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    let html = "";

    if (normalTasks.size > 0) {
      html += `<p>We have evaluated your documents. While your application is progressing, some items are not compliant and require corrections on your part to allow us to continue processing.</p>`;
      html += `<p>The following tasks have been reassigned to you:</p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameEn = task.nameEn;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskNameEn}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (taskNotCompletedKeys.has(task.nameFr)) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="color: #FF0000; font-weight: bold;">You have not completed this task on your portal.</span>`;
          html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; Please log in to your portal and complete it.</div>`;
          html += `</li>`;
        }
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelEn);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }
          
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameEn} : <span style="color: #FF0000;">${labelsStr}</span></strong></span>`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkEn}</div>`;
            }
          }
          html += `</li>`;
        }
        html += `</ul></li>`;
      }
      html += `</ul>`;
      html += `<p>Due to the high volume of applications, we must prioritize the processing of files where all tasks are complete.</p>`;
      html += `<p>Please log in to your portal to complete them: <a href="https://www.cafoap-pclfac.forces.gc.ca/">https://www.cafoap-pclfac.forces.gc.ca/</a></p>`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        html += `<p>Furthermore, we require confirmation from you. Please reply directly to this email with the requested information for the following item:</p>`;
      } else {
        html += `<p>To continue processing your application, we require confirmation from you. Please reply directly to this email with the requested information for the following item:</p>`;
      }
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of confirmationTasks.entries()) {
        const taskNameEn = task.nameEn;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskNameEn}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i: any) => i.reason.labelEn);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }
          
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameEn} : <span style="color: #FF0000;">${labelsStr}</span></strong></span>`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkEn}</div>`;
            }
          }
          html += `</li>`;
        }
        html += `</ul></li>`;
      }
      html += `</ul>`;
    }

    if (additionalDocTasks.size > 0) {
      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        html += `<p>Also, in order to continue processing your application, you must provide the following document(s):</p>`;
      } else {
        html += `<p>In order to continue processing your application, you must provide the following document(s):</p>`;
      }
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          for (const item of docItems) {
            const displayLabel = this.additionalDocsService.getDisplayLabelForAdditionalDoc(doc, item.reason, dossierJobs, isPforActive);
            html += `<li style="margin-bottom: 10px;">`;
            html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${displayLabel}</strong></span>`;
            
            if (item.reason.instructionEn) {
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
            }
            if (item.reason.linkEn) {
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${item.reason.linkEn}</div>`;
            }
            html += `</li>`;
          }
        }
      }
      html += `</ul>`;
      html += `<p>Please submit this/these document(s) by replying directly to this email.</p>`;
    }

    if (forceGeneralReminder) {
      html += `<p>Reminder: If you take no action or do not provide the required documents within 30 days, your file will be automatically closed.</p>`;
    } else {
      html += `<p>If no action is taken within 30 days, your file will be automatically closed.</p>`;
    }

    return `<!-- START_TASK_BODY_EN -->${html}<!-- END_TASK_BODY_EN -->`;
  }

  getBigAceCompliantNoteClean(
    jobSlots: { index: number; job: JobEntry; failedCe: boolean }[],
    extraRejections: string
  ): string {
    let firstLine = "";

    if (jobSlots.length === 0) {
      firstLine = "Étape 1 (En cours) - Big ACE admissible pour les métiers xxx, xxx, xxx.";
    } else {
      const admissibleJobIds: string[] = [];
      const failedCeJobIds: string[] = [];
      const closedJobIds: string[] = [];

      for (const slot of jobSlots) {
        if (slot.failedCe) {
          failedCeJobIds.push(slot.job.id);
        } else if (this.jobService.isJobClosed(slot.job.id)) {
          closedJobIds.push(slot.job.id);
        } else {
          admissibleJobIds.push(slot.job.id);
        }
      }

      const parts: string[] = [];

      if (admissibleJobIds.length > 0) {
        const label = admissibleJobIds.length > 1 ? "les métiers" : "le métier";
        parts.push(`Big ACE admissible pour ${label} ${admissibleJobIds.join(", ")}.`);
      }

      const hasFailedCe = failedCeJobIds.length > 0;
      const hasClosed = closedJobIds.length > 0;

      if (hasFailedCe && hasClosed) {
        const cePart = failedCeJobIds.length > 1
          ? `les métiers ${failedCeJobIds.join(", ")} (ne rencontrent pas les CE)`
          : `le métier ${failedCeJobIds[0]} (ne rencontre pas les CE)`;
        const closedPart = closedJobIds.length > 1
          ? `les métiers ${closedJobIds.join(", ")} (fermé)`
          : `le métier ${closedJobIds[0]} (fermé)`;
        parts.push(`Inadmissible pour ${cePart} et ${closedPart}, retirés du dossier.`);
      } else if (hasFailedCe) {
        if (failedCeJobIds.length === 1) {
          parts.push(`Inadmissible pour le métier ${failedCeJobIds[0]} car il ne rencontre pas les CE et a été retiré du dossier.`);
        } else {
          parts.push(`Inadmissible pour les métiers ${failedCeJobIds.join(", ")} car ils ne rencontrent pas les CE et ont été retirés du dossier.`);
        }
      } else if (hasClosed) {
        if (closedJobIds.length === 1) {
          parts.push(`Inadmissible pour le métier ${closedJobIds[0]} car il est fermé et a été retiré du dossier.`);
        } else {
          parts.push(`Inadmissible pour les métiers ${closedJobIds.join(", ")} car ils sont fermés et ont été retirés du dossier.`);
        }
      }

      firstLine = `Étape 1 (En cours) - ${parts.join(" ")}`;
    }

    let note = `${firstLine} Webinaire CAF 101 envoyé, tâche planifiez votre séance d'information des FAC 101 attribuée.`;

    if (extraRejections) {
      note += `\n${extraRejections}`;
    }

    return note;
  }
}
