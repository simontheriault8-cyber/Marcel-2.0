import { SafeHtml } from "@angular/platform-browser";
import { PORTAL_CANDIDATE_URL, SELFIE_EXAMPLE_URL } from "../data/app-links.data";

  // --- Premier Contact Methods ---
export function getPremierContactSelectedTasks(this: any):  {
    id: string;
    labelPlainFr: string;
    labelPlainEn: string;
    labelHtmlFr: string;
    labelHtmlEn: string;
  }[] {
    const list: {
      id: string;
      labelPlainFr: string;
      labelPlainEn: string;
      labelHtmlFr: string;
      labelHtmlEn: string;
    }[] = [];
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';

    // In local dossiers, medical is a numbered list item. In OTA dossiers, medical appointment text replaces or follows the list.
    if (this.premierContactMedical() && !isOta) {
      list.push({
        id: 'medical',
        labelPlainFr: 'Planifiez votre évaluation médicale',
        labelPlainEn: 'Schedule your medical evaluation',
        labelHtmlFr: 'Planifiez votre évaluation médicale',
        labelHtmlEn: 'Schedule your medical evaluation',
      });
    }
    if (this.premierContactEntrevue()) {
      list.push({
        id: 'entrevue',
        labelPlainFr: 'Planifiez votre entrevue',
        labelPlainEn: 'Schedule your interview',
        labelHtmlFr: 'Planifiez votre entrevue',
        labelHtmlEn: 'Schedule your interview',
      });
    }
    if (this.premierContactGambit()) {
      list.push({
        id: 'gambit',
        labelPlainFr: "Références, antécédents d'emploi et d'études (Gambit)",
        labelPlainEn: 'References, employment and education history (Gambit)',
        labelHtmlFr: "Références, antécédents d'emploi et d'études (Gambit)",
        labelHtmlEn: 'References, employment and education history (Gambit)',
      });
    }
    if (this.premierContactPsps()) {
      list.push({
        id: 'psps',
        labelPlainFr: "Vérification du casier judiciaire et du dossier de crédit (PSPS/cette tâche n'est pas dans votre portail, vous recevrez un courriel envoyé par app@gambitid.com)",
        labelPlainEn: 'Criminal record and credit check (PSPS/this task is not in your portal, you will receive an email sent by app@gambitid.com)',
        labelHtmlFr: "Vérification du casier judiciaire et du dossier de crédit (PSPS/cette tâche n'est pas dans votre portail, vous recevrez un courriel envoyé par app@gambitid.com)",
        labelHtmlEn: 'Criminal record and credit check (PSPS/this task is not in your portal, you will receive an email sent by app@gambitid.com)',
      });
    }
    if (this.premierContactSelfie()) {
      list.push({
        id: 'selfie',
        labelPlainFr: `Téléverser un égoportrait (selfie) avec votre pièce d'identité dans votre portail (dans la tâche : Pièce d'identité avec photo émise par le gouvernement canadien (les deux côtés)). Voici un lien vers un exemple acceptable d’un égoportrait : ${SELFIE_EXAMPLE_URL}`,
        labelPlainEn: `Upload a selfie with your ID document to your portal (in the task: Canadian government issued photo ID (both sides)). Here is a link to an acceptable example of a selfie: ${SELFIE_EXAMPLE_URL}`,
        labelHtmlFr: `Téléverser un égoportrait (selfie) avec votre pièce d'identité dans votre portail (dans la tâche : Pièce d'identité avec photo émise par le gouvernement canadien (les deux côtés)). Voici un lien vers un exemple acceptable d’un <a href="${SELFIE_EXAMPLE_URL}" target="_blank" style="color: #0563c1; text-decoration: underline;">égoportrait</a>.`,
        labelHtmlEn: `Upload a selfie with your ID document to your portal (in the task: Canadian government issued photo ID (both sides)). Here is a link to an acceptable example of a <a href="${SELFIE_EXAMPLE_URL}" target="_blank" style="color: #0563c1; text-decoration: underline;">selfie</a>.`,
      });
    }
    if (this.premierContactIptad()) {
      list.push({
        id: 'iptad',
        labelPlainFr: "Évaluation de la personnalité (Inventaire de personnalité des traits auto-descriptifs)",
        labelPlainEn: "Personality Assessment (Self-Descriptive Inventory of Personality Traits)",
        labelHtmlFr: "Évaluation de la personnalité (Inventaire de personnalité des traits auto-descriptifs)",
        labelHtmlEn: "Personality Assessment (Self-Descriptive Inventory of Personality Traits)",
      });
    }
    if (this.premierContactSeaf()) {
      list.push({
        id: 'seaf',
        labelPlainFr: "Formulaire de demande d'emploi notée",
        labelPlainEn: "Scored Employment Application Form",
        labelHtmlFr: "Formulaire de demande d'emploi notée",
        labelHtmlEn: "Scored Employment Application Form",
      });
    }
    return list;
  }

export function getPremierContactSectionPlainFr(this: any): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
    const selected = this.getPremierContactSelectedTasks();

    const p1 = `Bonjour,
Votre dossier de candidature pour les Forces armées canadiennes m’a été attribué. Sachez que votre dossier est actuellement en traitement et que nous continuons de le faire progresser.
Nous vous demandons de porter une attention particulière à vos courriels et à votre portail car des tâches vont vous être attribuées. Chaque nouvelle tâche attribuée doit être complétée dans un délai de 14 jours à partir de la date d’attribution sinon votre dossier sera fermé.`;

    let p2 = '';
    if (selected.length > 0) {
      const listStr = selected.map((t, idx) => `${idx + 1}-\t${t.labelPlainFr}`).join('\n');
      p2 = `\n\nTâche(s) à compléter présentement :\n${listStr}`;
    }

    let p3 = '';
    if (isOta && this.premierContactMedical()) {
      p3 = `\n\nVotre rendez-vous pour votre évaluation médicale a été fixé au centre de recrutement de ${otaCity}.
Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.
IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.`;
    }

    const p4 = `\n\nPourriez-vous me dire si vous avez du service militaire antérieur? (Cadet, Force de réserve/régulière, Armée étrangère)

Je reste à votre disposition afin de répondre à toutes questions que vous pourriez avoir concernant votre dossier.
Enfin, veuillez m’informer de tous changements à apporter à votre dossier, par exemple : changement d’adresse, études, nouvelles qualifications, nouvelle pièce d’identité, changement quant à votre dossier médical ou judiciaire, etc.

Au besoin, voici le lien de connexion à votre portail : ${PORTAL_CANDIDATE_URL}

Je vous remercie de votre intérêt pour les forces armées canadiennes.
Merci de votre collaboration.`;

    return `${p1}${p2}${p3}${p4}`;
  }

export function getPremierContactSectionPlainEn(this: any): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
    const otaCityEn = otaCity === 'Montréal' ? 'Montreal' : otaCity;
    const selected = this.getPremierContactSelectedTasks();

    const p1 = `Hello,
Your application file for the Canadian Armed Forces has been assigned to me. Please know that your file is currently being processed and we continue to move it forward.
We ask you to pay close attention to your emails and your portal as tasks will be assigned to you. Each new assigned task must be completed within 14 days of the assignment date, otherwise your file will be closed.`;

    let p2 = '';
    if (selected.length > 0) {
      const listStr = selected.map((t, idx) => `${idx + 1}-\t${t.labelPlainEn}`).join('\n');
      p2 = `\n\nTask(s) to be completed at this time:\n${listStr}`;
    }

    let p3 = '';
    if (isOta && this.premierContactMedical()) {
      p3 = `\n\nYour appointment for your Medical Evaluation has been scheduled at the ${otaCityEn} recruitment centre.
Please log in to your applicant portal to find all the details regarding your appointment.
IMPORTANT: Please notify us as soon as possible if this date does not work for you.`;
    }

    const p4 = `\n\nCould you tell me if you have any prior military service? (Cadets, Reserve/Regular Force, Foreign Military)

I remain at your disposal to answer any questions you may have regarding your file.
Finally, please inform me of any changes to be made to your file, for example: change of address, studies, new qualifications, new identification document, change regarding your medical or criminal record, etc.

If necessary, here is the link to log into your portal: ${PORTAL_CANDIDATE_URL}

Thank you for your interest in the Canadian Armed Forces.
Thank you for your cooperation.`;

    return `${p1}${p2}${p3}${p4}`;
  }

export function getPremierContactEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getPremierContactSectionPlainFr();
    const en = this.getPremierContactSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    if (isEn) {
      return `Un message en français suivra.\n\n${en}\n\n${sigEn}\n\n______________________________________________________________________________\n\n${fr}\n\n${sigFr}`;
    }
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

export function getPremierContactSectionHtmlFr(this: any): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
    const selected = this.getPremierContactSelectedTasks();

    const p1Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,<br>Votre dossier de candidature pour les Forces armées canadiennes m’a été attribué. Sachez que votre dossier est actuellement en traitement et que nous continuons de le faire progresser.<br>Nous vous demandons de porter une attention particulière à vos courriels et à votre portail car des tâches vont vous être attribuées. Chaque nouvelle tâche attribuée doit être complétée dans un <span style="background-color: yellow; mso-highlight: yellow;">délai de 14 jours</span> à partir de la date d’attribution sinon votre dossier sera fermé.</p>`;

    let p2Html = '';
    if (selected.length > 0) {
      const itemsHtml = selected
        .map(
          (t, idx) =>
            `${idx + 1}-&nbsp;&nbsp;&nbsp;&nbsp;${t.labelHtmlFr}`
        )
        .join('<br>');
      p2Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Tâche(s) à compléter présentement :<br>${itemsHtml}</p>`;
    }

    let p3Html = '';
    if (isOta && this.premierContactMedical()) {
      p3Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Votre rendez-vous pour votre évaluation médicale a été fixé au centre de recrutement de ${otaCity}.<br>Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.<br><strong style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px;">IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.</strong></p>`;
    }

    const p4Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Pourriez-vous me dire si vous avez du service militaire antérieur? (Cadet, Force de réserve/régulière, Armée étrangère)</p><p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Je reste à votre disposition afin de répondre à toutes questions que vous pourriez avoir concernant votre dossier.<br>Enfin, <span style="background-color: yellow; mso-highlight: yellow;">veuillez m’informer de tous changements à apporter à votre dossier</span>, par exemple : changement d’adresse, études, nouvelles qualifications, nouvelle pièce d’identité, changement quant à votre dossier médical ou judiciaire, etc.<br><br>Au besoin, voici le lien de connexion à votre portail : <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #0563c1; text-decoration: underline;">${PORTAL_CANDIDATE_URL}</a><br><br>Je vous remercie de votre intérêt pour les forces armées canadiennes.<br>Merci de votre collaboration.</p>`;

    return `${p1Html}${p2Html}${p3Html}${p4Html}`;
  }

export function getPremierContactSectionHtmlEn(this: any): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
    const otaCityEn = otaCity === 'Montréal' ? 'Montreal' : otaCity;
    const selected = this.getPremierContactSelectedTasks();

    const p1Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,<br>Your application file for the Canadian Armed Forces has been assigned to me. Please know that your file is currently being processed and we continue to move it forward.<br>We ask you to pay close attention to your emails and your portal as tasks will be assigned to you. Each new assigned task must be completed <span style="background-color: yellow; mso-highlight: yellow;">within 14 days</span> of the assignment date, otherwise your file will be closed.</p>`;

    let p2Html = '';
    if (selected.length > 0) {
      const itemsHtml = selected
        .map(
          (t, idx) =>
            `${idx + 1}-&nbsp;&nbsp;&nbsp;&nbsp;${t.labelHtmlEn}`
        )
        .join('<br>');
      p2Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Task(s) to be completed at this time:<br>${itemsHtml}</p>`;
    }

    let p3Html = '';
    if (isOta && this.premierContactMedical()) {
      p3Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Your appointment for your Medical Evaluation has been scheduled at the ${otaCityEn} recruitment centre.<br>Please log in to your applicant portal to find all the details regarding your appointment.<br><strong style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px;">IMPORTANT: Please notify us as soon as possible if this date does not work for you.</strong></p>`;
    }

    const p4Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Could you tell me if you have any prior military service? (Cadets, Reserve/Regular Force, Foreign Military)</p><p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">I remain at your disposal to answer any questions you may have regarding your file.<br>Finally, <span style="background-color: yellow; mso-highlight: yellow;">please inform me of any changes to be made to your file</span>, for example: change of address, studies, new qualifications, new identification document, change regarding your medical or criminal record, etc.<br><br>If necessary, here is the link to log into your portal: <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #0563c1; text-decoration: underline;">${PORTAL_CANDIDATE_URL}</a><br><br>Thank you for your interest in the Canadian Armed Forces.<br>Thank you for your cooperation.</p>`;

    return `${p1Html}${p2Html}${p3Html}${p4Html}`;
  }

export function getPremierContactEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000; line-height: normal;">`;
    if (isEn) {
      html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Un message en français suivra.</strong></p>`;
      html += this.getPremierContactSectionHtmlEn();
      html += `<p style="margin-top: 12.0pt;">` + sigEn + `</p>`;
      html += `<p style="margin-top: 12.0pt; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">______________________________________________________________________________</p>`;
      html += this.getPremierContactSectionHtmlFr();
      html += `<p style="margin-top: 12.0pt;">` + sigFr + `</p>`;
    } else {
      html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>`;
      html += this.getPremierContactSectionHtmlFr();
      html += `<p style="margin-top: 12.0pt;">` + sigFr + `</p>`;
      html += `<p style="margin-top: 12.0pt; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">______________________________________________________________________________</p>`;
      html += this.getPremierContactSectionHtmlEn();
      html += `<p style="margin-top: 12.0pt;">` + sigEn + `</p>`;
    }
    html += `</div>`;
    return html;
  }

  // --- Avis de Fermeture Methods ---
export function getAvisFermetureSelectedTasksFr(this: any): string[] {
    const list: string[] = [];
    if (this.avisFermetureEntrevue()) {
      list.push("Planifiez votre entrevue");
    }
    if (this.avisFermetureMedicale()) {
      list.push("Planifiez votre évaluation médicale");
    }
    if (this.avisFermetureGambit()) {
      list.push("Références, antécédents d'emploi et d'études (Gambit)");
    }
    if (this.avisFermeturePsps()) {
      list.push("Vérification du casier judiciaire et du dossier de crédit (PSPS)");
    }
    return list;
  }

export function getAvisFermetureSelectedTasksEn(this: any): string[] {
    const list: string[] = [];
    if (this.avisFermetureEntrevue()) {
      list.push("Schedule your interview");
    }
    if (this.avisFermetureMedicale()) {
      list.push("Schedule your medical evaluation");
    }
    if (this.avisFermetureGambit()) {
      list.push("References, employment and education history (Gambit)");
    }
    if (this.avisFermeturePsps()) {
      list.push("Criminal record and credit check (PSPS)");
    }
    return list;
  }

export function isOffreOtaActive(this: any): boolean {
    return this.evaluationMedicaleType() === 'Dossier OTA' && (this.offreNormaleChecked() || this.offreEtudesSubventionneesChecked());
  }

export function getAnnexeQSectionPlainFr(this: any): string {
    const alpha = this.annexeQAlphaPostulant().trim() || 'xx';
    return `Bonjour Monsieur/Madame,\n\nLes documents PSPS sont au dossier pour le postulant suivant : ${alpha}\n\nMerci, bonne journée à vous !`;
  }

export function getAnnexeQSectionPlainEn(this: any): string {
    const alpha = this.annexeQAlphaPostulant().trim() || 'xx';
    return `Hello Sir/Madam,\n\nThe PSPS documents are on file for the following applicant: ${alpha}\n\nThank you, have a great day!`;
  }

export function getAnnexeQEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getAnnexeQSectionPlainFr();
    const en = this.getAnnexeQSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    if (isEn) {
      return `Un message en français suivra.\n\n${en}\n\n${sigEn}\n\n______________________________________________________________________________\n\n${fr}\n\n${sigFr}`;
    }
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

export function getAnnexeQSectionHtmlFr(this: any): string {
    const alpha = this.annexeQAlphaPostulant().trim() || 'xx';
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour Monsieur/Madame,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Les documents PSPS sont au dossier pour le postulant suivant : ${alpha}</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Merci, bonne journée à vous !</p>`;
  }

export function getAnnexeQSectionHtmlEn(this: any): string {
    const alpha = this.annexeQAlphaPostulant().trim() || 'xx';
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello Sir/Madam,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">The PSPS documents are on file for the following applicant: ${alpha}</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Thank you, have a great day!</p>`;
  }

export function getAnnexeQEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getAnnexeQSectionHtmlFr();
    const en = this.getAnnexeQSectionHtmlEn();
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
    if (isEn) {
      return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Un message en français suivra.</strong></p>` +
        en +
        `<p style="margin-top: 12.0pt;">` + sigEn + `</p>` +
        `<p style="margin-top: 12.0pt; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">______________________________________________________________________________</p>` +
        fr +
        `<p style="margin-top: 12.0pt;">` + sigFr + `</p>` +
        `</div>`;
    }
    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>` +
      fr +
      `<p style="margin-top: 12.0pt;">` + sigFr + `</p>` +
      `<p style="margin-top: 12.0pt; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">______________________________________________________________________________</p>` +
      en +
      `<p style="margin-top: 12.0pt;">` + sigEn + `</p>` +
      `</div>`;
  }

export function translateDateToEn(this: any, dateStr: string): string {
    if (!dateStr) return '';
    const map: Record<string, string> = {
      'janvier': 'January', 'février': 'February', 'mars': 'March', 'avril': 'April',
      'mai': 'May', 'juin': 'June', 'juillet': 'July', 'août': 'August',
      'septembre': 'September', 'octobre': 'October', 'novembre': 'November', 'décembre': 'December'
    };
    let result = dateStr;
    for (const [fr, en] of Object.entries(map)) {
      result = result.replace(new RegExp(`\\b${fr}\\b`, 'gi'), en);
    }
    return result;
  }

export function getAvisFermetureSectionPlainFr(this: any): string {
    let delaiLineFr = '';
    if (this.avisFermetureDelaiJours() === 'autre') {
      const dateStr = this.avisFermetureDate().trim() || 'xx';
      delaiLineFr = `À cet effet, nous vous accordons jusqu'au ${dateStr} pour effectuer les actions nécessaires.`;
    } else {
      const delai = this.avisFermetureDelaiJours() || '14';
      delaiLineFr = `À cet effet, nous vous accordons un délai de ${delai} jours à compter de la date d'envoi de ce courriel pour effectuer les actions nécessaires.`;
    }
    const tasks = this.getAvisFermetureSelectedTasksFr();
    let tasksBlock = '';
    if (tasks.length > 0) {
      tasksBlock = '\n\nVoici les tâches à compléter dans le délai prescrit :\n' + tasks.map((t, i) => `${i + 1}- ${t}`).join('\n');
    } else {
      tasksBlock = '\n\nVoici les tâches à compléter dans le délai prescrit :\n1-\n\n2-';
    }

    return `Bonjour,\n\nPar la présente, nous vous informons que votre dossier demeure incomplet à ce jour, certaines tâches requises n’ayant pas été complétées.\n${delaiLineFr}\nÀ défaut de régularisation dans ce délai, nous procéderons à la fermeture de votre dossier sans autre avis.${tasksBlock}\n\nSi vous avez des questions, n’hésitez pas à communiquer avec moi.`;
  }

export function getAvisFermetureSectionPlainEn(this: any): string {
    let delaiLineEn = '';
    if (this.avisFermetureDelaiJours() === 'autre') {
      const rawDate = this.avisFermetureDate().trim() || 'xx';
      const dateStr = rawDate !== 'xx' ? this.translateDateToEn(rawDate) : 'xx';
      delaiLineEn = `To this end, we grant you until ${dateStr} to take the necessary actions.`;
    } else {
      const delai = this.avisFermetureDelaiJours() || '14';
      delaiLineEn = `To this end, we grant you a period of ${delai} days from the sending date of this email to take the necessary actions.`;
    }
    const tasks = this.getAvisFermetureSelectedTasksEn();
    let tasksBlock = '';
    if (tasks.length > 0) {
      tasksBlock = '\n\nHere are the tasks to complete within the prescribed timeframe:\n' + tasks.map((t, i) => `${i + 1}- ${t}`).join('\n');
    } else {
      tasksBlock = '\n\nHere are the tasks to complete within the prescribed timeframe:\n1-\n\n2-';
    }

    return `Hello,\n\nWe hereby inform you that your file remains incomplete to date, as certain required tasks have not been completed.\n${delaiLineEn}\nFailing regularization within this timeframe, we will proceed with closing your file without further notice.${tasksBlock}\n\nIf you have any questions, please do not hesitate to contact me.`;
  }

export function getAvisFermetureEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getAvisFermetureSectionPlainFr();
    const en = this.getAvisFermetureSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    if (isEn) {
      return `Un message en français suivra.\n\n${en}\n\n${sigEn}\n\n______________________________________________________________________________\n\n${fr}\n\n${sigFr}`;
    }
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

export function getAvisFermetureSectionHtmlFr(this: any): string {
    let delaiHtmlFr = '';
    if (this.avisFermetureDelaiJours() === 'autre') {
      const dateStr = this.avisFermetureDate().trim() || 'xx';
      delaiHtmlFr = `À cet effet, nous vous accordons jusqu'au <span style="background-color: red; mso-highlight: red; color: #ffffff; padding: 1px 4px;">${dateStr}</span> pour effectuer les actions nécessaires.`;
    } else {
      const delai = this.avisFermetureDelaiJours() || '14';
      delaiHtmlFr = `À cet effet, nous vous accordons un délai de <span style="background-color: red; mso-highlight: red; color: #ffffff; padding: 1px 4px;">${delai} jours</span> à compter de la date d'envoi de ce courriel pour effectuer les actions nécessaires.`;
    }
    const tasks = this.getAvisFermetureSelectedTasksFr();
    let tasksHtml = '';
    if (tasks.length > 0) {
      tasksHtml = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Voici les tâches à compléter dans le délai prescrit :<br>` +
        tasks.map((t, i) => `${i + 1}-&nbsp;&nbsp;&nbsp;&nbsp;${t}`).join('<br>') + `</p>`;
    } else {
      tasksHtml = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Voici les tâches à compléter dans le délai prescrit :<br>1-<br><br>2-</p>`;
    }

    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Par la présente, nous vous informons que votre dossier demeure incomplet à ce jour, certaines tâches requises n’ayant pas été complétées.<br>${delaiHtmlFr}<br>À défaut de régularisation dans ce délai, nous procéderons à la fermeture de votre dossier sans autre avis.</p>` +
      `${tasksHtml}` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Si vous avez des questions, n’hésitez pas à communiquer avec moi.</p>`;
  }

export function getAvisFermetureSectionHtmlEn(this: any): string {
    let delaiHtmlEn = '';
    if (this.avisFermetureDelaiJours() === 'autre') {
      const rawDate = this.avisFermetureDate().trim() || 'xx';
      const dateStr = rawDate !== 'xx' ? this.translateDateToEn(rawDate) : 'xx';
      delaiHtmlEn = `To this end, we grant you until <span style="background-color: red; mso-highlight: red; color: #ffffff; padding: 1px 4px;">${dateStr}</span> to take the necessary actions.`;
    } else {
      const delai = this.avisFermetureDelaiJours() || '14';
      delaiHtmlEn = `To this end, we grant you a period of <span style="background-color: red; mso-highlight: red; color: #ffffff; padding: 1px 4px;">${delai} days</span> from the sending date of this email to take the necessary actions.`;
    }
    const tasks = this.getAvisFermetureSelectedTasksEn();
    let tasksHtml = '';
    if (tasks.length > 0) {
      tasksHtml = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Here are the tasks to complete within the prescribed timeframe:<br>` +
        tasks.map((t, i) => `${i + 1}-&nbsp;&nbsp;&nbsp;&nbsp;${t}`).join('<br>') + `</p>`;
    } else {
      tasksHtml = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Here are the tasks to complete within the prescribed timeframe:<br>1-<br><br>2-</p>`;
    }

    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">We hereby inform you that your file remains incomplete to date, as certain required tasks have not been completed.<br>${delaiHtmlEn}<br>Failing regularization within this timeframe, we will proceed with closing your file without further notice.</p>` +
      `${tasksHtml}` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">If you have any questions, please do not hesitate to contact me.</p>`;
  }

export function getAvisFermetureEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getAvisFermetureSectionHtmlFr();
    const en = this.getAvisFermetureSectionHtmlEn();
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();

    if (isEn) {
      return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Un message en français suivra.</strong></p>` +
        `${en}` +
        `<p>${sigEn}</p>` +
        `<p style="margin-top: 12.0pt; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">______________________________________________________________________________</p>` +
        `${fr}` +
        `<p>${sigFr}</p>` +
        `</div>`;
    }
    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>` +
      `${fr}` +
      `<p>${sigFr}</p>` +
      `<p style="margin-top: 12.0pt; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">______________________________________________________________________________</p>` +
      `${en}` +
      `<p>${sigEn}</p>` +
      `</div>`;
  }

export function getMedicalPartEn(this: any, part: string): string {
    if (part === 'Partie 1') return 'Part 1';
    if (part === 'Partie 2') return 'Part 2';
    if (part === 'Partie 1 et 2') return 'Part 1 and 2';
    return part;
  }


export function getMedicalEmailBody(this: any, part: string): string {
    const partEn = this.getMedicalPartEn(part);
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
    const otaCityEn = otaCity === 'Montréal' ? 'Montreal' : otaCity;

    if (isOta) {
      let fr = `Bonjour,

Votre rendez-vous pour votre évaluation médicale - ${part} a été fixé au centre de recrutement de ${otaCity}.

Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.

Lien de connexion à votre portail : ${PORTAL_CANDIDATE_URL}

IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.

Merci de votre collaboration.`;

      let en = `Hello,

Your appointment for your Medical Evaluation - ${partEn} has been scheduled at the ${otaCityEn} recruitment centre.

Please log in to your applicant portal to find all the details regarding your appointment.

Applicant portal login link: ${PORTAL_CANDIDATE_URL}

IMPORTANT: Please notify us as soon as possible if this date does not work for you.

Thank you for your cooperation.`;

      return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
    }

    let fr = `Bonjour,

Une nouvelle tâche intitulée « Évaluation médicale - ${part} » vous a été attribuée dans votre portail du postulant.

Afin de réaliser votre évaluation médicale, vous devrez vous présenter à votre centre de recrutement attitré (dont les coordonnées sont indiquées directement dans votre portail).

Dans votre portail, vous pourrez sélectionner vous-même le moment qui vous convient le mieux parmi les plages horaires disponibles.

Lien de connexion à votre portail : ${PORTAL_CANDIDATE_URL}

Merci de votre collaboration.`;

    let en = `Hello,

A new task titled "Medical Evaluation - ${partEn}" has been assigned to you in your applicant portal.

To complete this medical evaluation, you will need to report to your assigned recruitment centre (indicated in your portal).

In your portal, you will be able to select the time slot that best suits you from the available times.

Applicant portal login link: ${PORTAL_CANDIDATE_URL}

Thank you for your cooperation.`;

      return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

export function getMedicalPartsInfo(this: any): { labelFr: string; labelEn: string } | null {
    if (this.evaluationMedicalePartie1Et2()) {
      return { labelFr: 'Partie 1 et 2', labelEn: 'Part 1 and 2' };
    }
    if (this.evaluationMedicalePartie1() && this.evaluationMedicalePartie2()) {
      return { labelFr: 'Partie 1 et Partie 2', labelEn: 'Part 1 and Part 2' };
    }
    if (this.evaluationMedicalePartie1()) {
      return { labelFr: 'Partie 1', labelEn: 'Part 1' };
    }
    if (this.evaluationMedicalePartie2()) {
      return { labelFr: 'Partie 2', labelEn: 'Part 2' };
    }
    return null;
  }

export function getMedicalSectionHtmlFr(this: any, part: string): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
    let html = '';
    if (isOta) {
      html += `<p>Votre rendez-vous pour votre évaluation médicale - <strong>${part}</strong> a été fixé au centre de recrutement de ${otaCity}.</p>`;
      html += `<p>Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.</p>`;
      html += `<p>Lien de connexion à votre portail : <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline;">${PORTAL_CANDIDATE_URL}</a></p>`;
      html += `<p style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 10px 14px; margin: 14px 0; color: #991b1b;"><strong style="font-size: 11.5pt;">IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.</strong></p>`;
    } else {
      html += `<p>Une nouvelle tâche intitulée <strong>Évaluation médicale - ${part}</strong> vous a été attribuée dans votre portail du postulant.</p>`;
      html += `<p>Afin de réaliser votre évaluation médicale, vous devrez vous présenter à votre centre de recrutement attitré (dont les coordonnées sont indiquées directement dans votre portail).</p>`;
      html += `<p>Dans votre portail, vous pourrez sélectionner vous-même le moment qui vous convient le mieux parmi les plages horaires disponibles.</p>`;
      html += `<p>Lien de connexion à votre portail : <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline;">${PORTAL_CANDIDATE_URL}</a></p>`;
    }
    html += `<p>Merci de votre collaboration.</p>`;
    return html;
  }

export function getMedicalSectionHtmlEn(this: any, partEn: string): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
    const otaCityEn = otaCity === 'Montréal' ? 'Montreal' : otaCity;
    let html = '';
    if (isOta) {
      html += `<p>Your appointment for your Medical Evaluation - <strong>${partEn}</strong> has been scheduled at the ${otaCityEn} recruitment centre.</p>`;
      html += `<p>Please log in to your applicant portal to find all the details regarding your appointment.</p>`;
      html += `<p>Applicant portal login link: <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline;">${PORTAL_CANDIDATE_URL}</a></p>`;
      html += `<p style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 10px 14px; margin: 14px 0; color: #991b1b;"><strong style="font-size: 11.5pt;">IMPORTANT: Please notify us as soon as possible if this date does not work for you.</strong></p>`;
    } else {
      html += `<p>A new task titled <strong>Medical Evaluation - ${partEn}</strong> has been assigned to you in your applicant portal.</p>`;
      html += `<p>To complete this medical evaluation, you will need to report to your assigned recruitment centre (indicated in your portal).</p>`;
      html += `<p>In your portal, you will be able to select the time slot that best suits you from the available times.</p>`;
      html += `<p>Applicant portal login link: <a href="${PORTAL_CANDIDATE_URL}" target="_blank" style="color: #4f46e5; text-decoration: underline;">${PORTAL_CANDIDATE_URL}</a></p>`;
    }
    html += `<p>Thank you for your cooperation.</p>`;
    return html;
  }

export function getMedicalSectionPlainFr(this: any, part: string): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
    let fr = '';
    if (isOta) {
      fr += `Votre rendez-vous pour votre évaluation médicale - ${part} a été fixé au centre de recrutement de ${otaCity}.\n\n`;
      fr += `Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.\n\n`;
      fr += `Lien de connexion à votre portail : ${PORTAL_CANDIDATE_URL}\n\n`;
      fr += `IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.\n\n`;
    } else {
      fr += `Une nouvelle tâche intitulée « Évaluation médicale - ${part} » vous a été attribuée dans votre portail du postulant.\n\n`;
      fr += `Afin de réaliser votre évaluation médicale, vous devrez vous présenter à votre centre de recrutement attitré (dont les coordonnées sont indiquées directement dans votre portail).\n\n`;
      fr += `Dans votre portail, vous pourrez sélectionner vous-même le moment qui vous convient le mieux parmi les plages horaires disponibles.\n\n`;
      fr += `Lien de connexion à votre portail : ${PORTAL_CANDIDATE_URL}\n\n`;
    }
    fr += `Merci de votre collaboration.`;
    return fr;
  }

export function getMedicalSectionPlainEn(this: any, partEn: string): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
    const otaCityEn = otaCity === 'Montréal' ? 'Montreal' : otaCity;
    let en = '';
    if (isOta) {
      en += `Your appointment for your Medical Evaluation - ${partEn} has been scheduled at the ${otaCityEn} recruitment centre.\n\n`;
      en += `Please log in to your applicant portal to find all the details regarding your appointment.\n\n`;
      en += `Applicant portal login link: ${PORTAL_CANDIDATE_URL}\n\n`;
      en += `IMPORTANT: Please notify us as soon as possible if this date does not work for you.\n\n`;
    } else {
      en += `A new task titled "Medical Evaluation - ${partEn}" has been assigned to you in your applicant portal.\n\n`;
      en += `To complete this medical evaluation, you will need to report to your assigned recruitment centre (indicated in your portal).\n\n`;
      en += `In your portal, you will be able to select the time slot that best suits you from the available times.\n\n`;
      en += `Applicant portal login link: ${PORTAL_CANDIDATE_URL}\n\n`;
    }
    en += `Thank you for your cooperation.`;
    return en;
  }

export function getMedicalRegisterNoteCombined(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const medInfo = this.getMedicalPartsInfo();
    if (!medInfo) return '';
    if (this.evaluationMedicaleType() === 'Dossier OTA') {
      const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
      const otaCityEn = otaCity === 'Montréal' ? 'Montreal' : otaCity;
      if (isEn) {
        return `Appointment for medical evaluation - ${medInfo.labelEn} directly scheduled at ${otaCityEn} recruiting centre (OTA Dossier). Information email sent to applicant to view details in their portal.`;
      }
      return `Rendez-vous pour l'évaluation médicale - ${medInfo.labelFr} directement fixé au centre de recrutement de ${otaCity} (Dossier OTA). Courriel d'information envoyé au postulant pour consultation des détails dans son portail.`;
    }
    if (isEn) {
      return `Task "Medical Evaluation - ${medInfo.labelEn}" assigned to applicant in their portal. Explanatory email sent to select a time slot at assigned recruiting centre.`;
    }
    return `Tâche « Évaluation médicale - ${medInfo.labelFr} » attribuée au postulant dans son portail. Courriel explicatif envoyé pour la sélection d'une plage horaire au centre de recrutement attitré.`;
  }

export function getMedicalEmailPlain(this: any, part: string): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const partEn = this.getMedicalPartEn(part);
    const fr = this.getMedicalSectionPlainFr(part);
    const en = this.getMedicalSectionPlainEn(partEn);
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    if (isEn) {
      return `Un message en français suivra.\n\nHello,\n\n${en}\n\n${sigEn}\n\n______________________________________________________________________________\n\nBonjour,\n\n${fr}\n\n${sigFr}`;
    }
    return `English message will follow.\n\nBonjour,\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

export function getMedicalEmailHtml(this: any, part: string): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const partEn = this.getMedicalPartEn(part);
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    if (isEn) {
      html += `<p><strong>Un message en français suivra.</strong></p>`;
      html += `<p>Hello,</p>`;
      html += this.getMedicalSectionHtmlEn(partEn);
      html += `<p>` + sigEn + `</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += `<p>Bonjour,</p>`;
      html += this.getMedicalSectionHtmlFr(part);
      html += `<p>` + sigFr + `</p>`;
    } else {
      html += `<p><strong>English message will follow.</strong></p>`;
      html += `<p>Bonjour,</p>`;
      html += this.getMedicalSectionHtmlFr(part);
      html += `<p>` + sigFr + `</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += `<p>Hello,</p>`;
      html += this.getMedicalSectionHtmlEn(partEn);
      html += `<p>` + sigEn + `</p>`;
    }
    html += `</div>`;
    return html;
  }

export function getSafeMedicalEmailHtml(this: any, part: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.getMedicalEmailHtml(part));
  }

export function getMedicalRegisterNote(this: any, part: string): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const partEn = this.getMedicalPartEn(part);
    if (this.evaluationMedicaleType() === 'Dossier OTA') {
      const otaCity = (typeof this.otaSubCity === 'function' ? this.otaSubCity() : this.otaSubCity) || 'Montréal';
      const otaCityEn = otaCity === 'Montréal' ? 'Montreal' : otaCity;
      if (isEn) {
        return `Appointment for medical evaluation - ${partEn} directly scheduled at ${otaCityEn} recruiting centre (OTA Dossier). Information email sent to applicant to view details in their portal.`;
      }
      return `Rendez-vous pour l'évaluation médicale - ${part} directement fixé au centre de recrutement de ${otaCity} (Dossier OTA). Courriel d'information envoyé au postulant pour consultation des détails dans son portail.`;
    }
    if (isEn) {
      return `Task "Medical Evaluation - ${partEn}" assigned to applicant in their portal. Explanatory email sent to select a time slot at assigned recruiting centre.`;
    }
    return `Tâche « Évaluation médicale - ${part} » attribuée au postulant dans son portail. Courriel explicatif envoyé pour la sélection d'une plage horaire au centre de recrutement attitré.`;
  }

