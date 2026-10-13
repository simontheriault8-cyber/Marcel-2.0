import { Injectable } from "@angular/core";
import { RecruitmentCenter, RECRUITMENT_CENTERS } from "./jobs-data";
import { UNITES_AFFECTATION, UniteAffectation } from "../app/models/app.models";

export interface GdPremierContactOptions {
  isOta: boolean;
  premierContactMedical: boolean;
  premierContactEntrevue: boolean;
  premierContactGambit: boolean;
  premierContactPsps: boolean;
  premierContactSelfie: boolean;
  premierContactIptad: boolean;
  premierContactSeaf: boolean;
}

export interface GdAvisFermetureOptions {
  delaiJours: string;
  dateStr: string;
  entrevue: boolean;
  medicale: boolean;
  gambit: boolean;
  psps: boolean;
}

export interface GdOfferState {
  evaluationMedicaleType: 'Dossier régulier' | 'Dossier OTA';
  offreLieuVille: string;
  offreUniteAffectation: string;
  offreMetier: string;
  offreProgrammeEnrolement: string;
  offreElement: string;
  offreDureeContrat: string;
  offreEtudesSubventionnees: string;
  offreDureeEtudesSubventionnees: string;
  offreDateEnrolement: string;
  offreHeureArriveePostulant: string;
  offreHeureArriveeInvites: string;
  offreLieuEnrolement: string;
  offreDateArriveeUnite: string;
  offreElementsManquants: string;
  offreDateElementsManquants: string;
  offreSerieCours: string;
  offreDateCoursDebut: string;
  offreDateCoursFin: string;
  offreFormulairePpp: boolean;
  offreFormulairePcu: boolean;
  offreFormulaireCroixSouvenir: boolean;
  offreFormulaireBeneficiaire: boolean;
  noteStatutCivil: string;
  noteConjoint: string;
  noteConjointTexte: string;
  noteEnfantCount: string;
  noteEnfantDetails: { sex: string; year: string }[];
  notePlaqueImm: string;
  noteBrisBail: string;
  noteEntreposage: string;
  noteSermentDeclaration: string;
  noteInviteMil: string;
  noteInviteMilTexte: string;
  noteSvcMilAnt: string;
  noteBeneficiaire: string;
  noteDateCourrielConfirmation: string;
}

export interface GdRappelCeremonieOptions {
  date: string;
  heurePostulant: string;
  heureInvites: string;
  lieu: string;
  includeRalliement: boolean;
}

@Injectable({
  providedIn: "root",
})
export class GdEmailService {
  // Date and language helpers
  translateDateToEn(dateStr: string): string {
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

  getJourSemaineFr(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.trim().split(/[-/]/);
    if (parts.length === 3) {
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10) - 1;
      let year = parseInt(parts[2], 10);
      if (year < 100) year += 2000;
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        return jours[d.getDay()];
      }
    }
    return '';
  }

  getJourSemaineEn(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.trim().split(/[-/]/);
    if (parts.length === 3) {
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10) - 1;
      let year = parseInt(parts[2], 10);
      if (year < 100) year += 2000;
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[d.getDay()];
      }
    }
    return '';
  }

  // --- Premier Contact ---
  getPremierContactSelectedTasks(opts: GdPremierContactOptions): {
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

    if (opts.premierContactMedical && !opts.isOta) {
      list.push({
        id: 'medical',
        labelPlainFr: 'Planifiez votre évaluation médicale',
        labelPlainEn: 'Schedule your medical evaluation',
        labelHtmlFr: 'Planifiez votre évaluation médicale',
        labelHtmlEn: 'Schedule your medical evaluation',
      });
    }
    if (opts.premierContactEntrevue) {
      list.push({
        id: 'entrevue',
        labelPlainFr: 'Planifiez votre entrevue',
        labelPlainEn: 'Schedule your interview',
        labelHtmlFr: 'Planifiez votre entrevue',
        labelHtmlEn: 'Schedule your interview',
      });
    }
    if (opts.premierContactGambit) {
      list.push({
        id: 'gambit',
        labelPlainFr: "Références, antécédents d'emploi et d'études (Gambit)",
        labelPlainEn: 'References, employment and education history (Gambit)',
        labelHtmlFr: "Références, antécédents d'emploi et d'études (Gambit)",
        labelHtmlEn: 'References, employment and education history (Gambit)',
      });
    }
    if (opts.premierContactPsps) {
      list.push({
        id: 'psps',
        labelPlainFr: "Vérification du casier judiciaire et du dossier de crédit (PSPS/cette tâche n'est pas dans votre portail, vous recevrez un courriel envoyé par app@gambitid.com)",
        labelPlainEn: 'Criminal record and credit check (PSPS/this task is not in your portal, you will receive an email sent by app@gambitid.com)',
        labelHtmlFr: "Vérification du casier judiciaire et du dossier de crédit (PSPS/cette tâche n'est pas dans votre portail, vous recevrez un courriel envoyé par app@gambitid.com)",
        labelHtmlEn: 'Criminal record and credit check (PSPS/this task is not in your portal, you will receive an email sent by app@gambitid.com)',
      });
    }
    if (opts.premierContactSelfie) {
      list.push({
        id: 'selfie',
        labelPlainFr: "Téléverser un égoportrait (selfie) avec votre pièce d'identité dans votre portail (dans la tâche : Pièce d'identité avec photo émise par le gouvernement canadien (les deux côtés)). Voici un lien vers un exemple acceptable d’un égoportrait : https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png",
        labelPlainEn: 'Upload a selfie with your ID document to your portal (in the task: Canadian government issued photo ID (both sides)). Here is a link to an acceptable example of a selfie: https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png',
        labelHtmlFr: `Téléverser un égoportrait (selfie) avec votre pièce d'identité dans votre portail (dans la tâche : Pièce d'identité avec photo émise par le gouvernement canadien (les deux côtés)). Voici un lien vers un exemple acceptable d’un <a href="https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png" target="_blank" style="color: #0563c1; text-decoration: underline;">égoportrait</a>.`,
        labelHtmlEn: `Upload a selfie with your ID document to your portal (in the task: Canadian government issued photo ID (both sides)). Here is a link to an acceptable example of a <a href="https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png" target="_blank" style="color: #0563c1; text-decoration: underline;">selfie</a>.`,
      });
    }
    if (opts.premierContactIptad) {
      list.push({
        id: 'iptad',
        labelPlainFr: "Évaluation de la personnalité (Inventaire de personnalité des traits auto-descriptifs)",
        labelPlainEn: "Personality Assessment (Self-Descriptive Inventory of Personality Traits)",
        labelHtmlFr: "Évaluation de la personnalité (Inventaire de personnalité des traits auto-descriptifs)",
        labelHtmlEn: "Personality Assessment (Self-Descriptive Inventory of Personality Traits)",
      });
    }
    if (opts.premierContactSeaf) {
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

  getPremierContactSectionPlainFr(opts: GdPremierContactOptions): string {
    const selected = this.getPremierContactSelectedTasks(opts);
    const p1 = `Bonjour,\nVotre dossier de candidature pour les Forces armées canadiennes m’a été attribué. Sachez que votre dossier est actuellement en traitement et que nous continuons de le faire progresser.\nNous vous demandons de porter une attention particulière à vos courriels et à votre portail car des tâches vont vous être attribuées. Chaque nouvelle tâche attribuée doit être complétée dans un délai de 14 jours à partir de la date d’attribution sinon votre dossier sera fermé.`;

    let p2 = '';
    if (selected.length > 0) {
      const listStr = selected.map((t, idx) => `${idx + 1}-\t${t.labelPlainFr}`).join('\n');
      p2 = `\n\nTâche(s) à compléter présentement :\n${listStr}`;
    }

    let p3 = '';
    if (opts.isOta && opts.premierContactMedical) {
      p3 = `\n\nVotre rendez-vous pour votre évaluation médicale a été fixé au centre de recrutement de Montréal.\nVeuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.\nIMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.`;
    }

    const p4 = `\n\nPourriez-vous me dire si vous avez du service militaire antérieur? (Cadet, Force de réserve/régulière, Armée étrangère)\n\nJe reste à votre disposition afin de répondre à toutes questions que vous pourriez avoir concernant votre dossier.\nEnfin, veuillez m’informer de tous changements à apporter à votre dossier, par exemple : changement d’adresse, études, nouvelles qualifications, nouvelle pièce d’identité, changement quant à votre dossier médical ou judiciaire, etc.\n\nAu besoin, voici le lien de connexion à votre portail : https://www.cafoap-pclfac.forces.gc.ca/\n\nJe vous remercie de votre intérêt pour les forces armées canadiennes.\nMerci de votre collaboration.`;
    return `${p1}${p2}${p3}${p4}`;
  }

  getPremierContactSectionPlainEn(opts: GdPremierContactOptions): string {
    const selected = this.getPremierContactSelectedTasks(opts);
    const p1 = `Hello,\nYour application file for the Canadian Armed Forces has been assigned to me. Please know that your file is currently being processed and we continue to move it forward.\nWe ask you to pay close attention to your emails and your portal as tasks will be assigned to you. Each new assigned task must be completed within 14 days of the assignment date, otherwise your file will be closed.`;

    let p2 = '';
    if (selected.length > 0) {
      const listStr = selected.map((t, idx) => `${idx + 1}-\t${t.labelPlainEn}`).join('\n');
      p2 = `\n\nTask(s) to be completed at this time:\n${listStr}`;
    }

    let p3 = '';
    if (opts.isOta && opts.premierContactMedical) {
      p3 = `\n\nYour appointment for your Medical Evaluation has been scheduled at the Montreal recruitment centre.\nPlease log in to your applicant portal to find all the details regarding your appointment.\nIMPORTANT: Please notify us as soon as possible if this date does not work for you.`;
    }

    const p4 = `\n\nCould you tell me if you have any prior military service? (Cadets, Reserve/Regular Force, Foreign Military)\n\nI remain at your disposal to answer any questions you may have regarding your file.\nFinally, please inform me of any changes to be made to your file, for example: change of address, studies, new qualifications, new identification document, change regarding your medical or criminal record, etc.\n\nIf necessary, here is the link to log into your portal: https://www.cafoap-pclfac.forces.gc.ca/\n\nThank you for your interest in the Canadian Armed Forces.\nThank you for your cooperation.`;
    return `${p1}${p2}${p3}${p4}`;
  }

  getPremierContactSectionHtmlFr(opts: GdPremierContactOptions): string {
    const selected = this.getPremierContactSelectedTasks(opts);
    const p1Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,<br>Votre dossier de candidature pour les Forces armées canadiennes m’a été attribué. Sachez que votre dossier est actuellement en traitement et que nous continuons de le faire progresser.<br>Nous vous demandons de porter une attention particulière à vos courriels et à votre portail car des tâches vont vous être attribuées. Chaque nouvelle tâche attribuée doit être complétée dans un <span style="background-color: yellow; mso-highlight: yellow;">délai de 14 jours</span> à partir de la date d’attribution sinon votre dossier sera fermé.</p>`;

    let p2Html = '';
    if (selected.length > 0) {
      const itemsHtml = selected.map((t, idx) => `${idx + 1}-&nbsp;&nbsp;&nbsp;&nbsp;${t.labelHtmlFr}`).join('<br>');
      p2Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Tâche(s) à compléter présentement :<br>${itemsHtml}</p>`;
    }

    let p3Html = '';
    if (opts.isOta && opts.premierContactMedical) {
      p3Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Votre rendez-vous pour votre évaluation médicale a été fixé au centre de recrutement de Montréal.<br>Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.<br><strong style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px;">IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.</strong></p>`;
    }

    const p4Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Pourriez-vous me dire si vous avez du service militaire antérieur? (Cadet, Force de réserve/régulière, Armée étrangère)</p><p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Je reste à votre disposition afin de répondre à toutes questions que vous pourriez avoir concernant votre dossier.<br>Enfin, <span style="background-color: yellow; mso-highlight: yellow;">veuillez m’informer de tous changements à apporter à votre dossier</span>, par exemple : changement d’adresse, études, nouvelles qualifications, nouvelle pièce d’identité, changement quant à votre dossier médical ou judiciaire, etc.<br><br>Au besoin, voici le lien de connexion à votre portail : <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #0563c1; text-decoration: underline;">https://www.cafoap-pclfac.forces.gc.ca/</a><br><br>Je vous remercie de votre intérêt pour les forces armées canadiennes.<br>Merci de votre collaboration.</p>`;
    return `${p1Html}${p2Html}${p3Html}${p4Html}`;
  }

  getPremierContactSectionHtmlEn(opts: GdPremierContactOptions): string {
    const selected = this.getPremierContactSelectedTasks(opts);
    const p1Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,<br>Your application file for the Canadian Armed Forces has been assigned to me. Please know that your file is currently being processed and we continue to move it forward.<br>We ask you to pay close attention to your emails and your portal as tasks will be assigned to you. Each new assigned task must be completed <span style="background-color: yellow; mso-highlight: yellow;">within 14 days</span> of the assignment date, otherwise your file will be closed.</p>`;

    let p2Html = '';
    if (selected.length > 0) {
      const itemsHtml = selected.map((t, idx) => `${idx + 1}-&nbsp;&nbsp;&nbsp;&nbsp;${t.labelHtmlEn}`).join('<br>');
      p2Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Task(s) to be completed at this time:<br>${itemsHtml}</p>`;
    }

    let p3Html = '';
    if (opts.isOta && opts.premierContactMedical) {
      p3Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Your appointment for your Medical Evaluation has been scheduled at the Montreal recruitment centre.<br>Please log in to your applicant portal to find all the details regarding your appointment.<br><strong style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px;">IMPORTANT: Please notify us as soon as possible if this date does not work for you.</strong></p>`;
    }

    const p4Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Could you tell me if you have any prior military service? (Cadets, Reserve/Regular Force, Foreign Military)</p><p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">I remain at your disposal to answer any questions you may have regarding your file.<br>Finally, <span style="background-color: yellow; mso-highlight: yellow;">please inform me of any changes to be made to your file</span>, for example: change of address, studies, new qualifications, new identification document, change regarding your medical or criminal record, etc.<br><br>If necessary, here is the link to log into your portal: <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #0563c1; text-decoration: underline;">https://www.cafoap-pclfac.forces.gc.ca/</a><br><br>Thank you for your interest in the Canadian Armed Forces.<br>Thank you for your cooperation.</p>`;
    return `${p1Html}${p2Html}${p3Html}${p4Html}`;
  }

  // --- Avis de Fermeture ---
  getAvisFermetureSectionPlainFr(opts: GdAvisFermetureOptions): string {
    let delaiLineFr = '';
    if (opts.delaiJours === 'autre') {
      const dateStr = opts.dateStr.trim() || 'xx';
      delaiLineFr = `À cet effet, nous vous accordons jusqu'au ${dateStr} pour effectuer les actions nécessaires.`;
    } else {
      const delai = opts.delaiJours || '14';
      delaiLineFr = `À cet effet, nous vous accordons un délai de ${delai} jours à compter de la date d'envoi de ce courriel pour effectuer les actions nécessaires.`;
    }
    const tasks: string[] = [];
    if (opts.entrevue) tasks.push("Planifiez votre entrevue");
    if (opts.medicale) tasks.push("Planifiez votre évaluation médicale");
    if (opts.gambit) tasks.push("Références, antécédents d'emploi et d'études (Gambit)");
    if (opts.psps) tasks.push("Vérification du casier judiciaire et du dossier de crédit (PSPS)");

    let tasksBlock = '';
    if (tasks.length > 0) {
      tasksBlock = '\n\nVoici les tâches à compléter dans le délai prescrit :\n' + tasks.map((t, i) => `${i + 1}- ${t}`).join('\n');
    } else {
      tasksBlock = '\n\nVoici les tâches à compléter dans le délai prescrit :\n1-\n\n2-';
    }

    return `Bonjour,\n\nPar la présente, nous vous informons que votre dossier demeure incomplet à ce jour, certaines tâches requises n’ayant pas été complétées.\n${delaiLineFr}\nÀ défaut de régularisation dans ce délai, nous procéderons à la fermeture de votre dossier sans autre avis.${tasksBlock}\n\nSi vous avez des questions, n’hésitez pas à communiquer avec moi.`;
  }

  getAvisFermetureSectionPlainEn(opts: GdAvisFermetureOptions): string {
    let delaiLineEn = '';
    if (opts.delaiJours === 'autre') {
      const rawDate = opts.dateStr.trim() || 'xx';
      const dateStr = rawDate !== 'xx' ? this.translateDateToEn(rawDate) : 'xx';
      delaiLineEn = `To this end, we grant you until ${dateStr} to take the necessary actions.`;
    } else {
      const delai = opts.delaiJours || '14';
      delaiLineEn = `To this end, we grant you a period of ${delai} days from the sending date of this email to take the necessary actions.`;
    }
    const tasks: string[] = [];
    if (opts.entrevue) tasks.push("Schedule your interview");
    if (opts.medicale) tasks.push("Schedule your medical evaluation");
    if (opts.gambit) tasks.push("References, employment and education history (Gambit)");
    if (opts.psps) tasks.push("Criminal record and credit check (PSPS)");

    let tasksBlock = '';
    if (tasks.length > 0) {
      tasksBlock = '\n\nHere are the tasks to complete within the prescribed timeframe:\n' + tasks.map((t, i) => `${i + 1}- ${t}`).join('\n');
    } else {
      tasksBlock = '\n\nHere are the tasks to complete within the prescribed timeframe:\n1-\n\n2-';
    }

    return `Hello,\n\nWe hereby inform you that your file remains incomplete to date, as certain required tasks have not been completed.\n${delaiLineEn}\nFailing regularization within this timeframe, we will proceed with closing your file without further notice.${tasksBlock}\n\nIf you have any questions, please do not hesitate to contact me.`;
  }

  getAvisFermetureSectionHtmlFr(opts: GdAvisFermetureOptions): string {
    let delaiHtmlFr = '';
    if (opts.delaiJours === 'autre') {
      const dateStr = opts.dateStr.trim() || 'xx';
      delaiHtmlFr = `À cet effet, nous vous accordons jusqu'au <span style="background-color: red; mso-highlight: red; color: #ffffff; padding: 1px 4px;">${dateStr}</span> pour effectuer les actions nécessaires.`;
    } else {
      const delai = opts.delaiJours || '14';
      delaiHtmlFr = `À cet effet, nous vous accordons un délai de <span style="background-color: red; mso-highlight: red; color: #ffffff; padding: 1px 4px;">${delai} jours</span> à compter de la date d'envoi de ce courriel pour effectuer les actions nécessaires.`;
    }
    const tasks: string[] = [];
    if (opts.entrevue) tasks.push("Planifiez votre entrevue");
    if (opts.medicale) tasks.push("Planifiez votre évaluation médicale");
    if (opts.gambit) tasks.push("Références, antécédents d'emploi et d'études (Gambit)");
    if (opts.psps) tasks.push("Vérification du casier judiciaire et du dossier de crédit (PSPS)");

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

  getAvisFermetureSectionHtmlEn(opts: GdAvisFermetureOptions): string {
    let delaiHtmlEn = '';
    if (opts.delaiJours === 'autre') {
      const rawDate = opts.dateStr.trim() || 'xx';
      const dateStr = rawDate !== 'xx' ? this.translateDateToEn(rawDate) : 'xx';
      delaiHtmlEn = `To this end, we grant you until <span style="background-color: red; mso-highlight: red; color: #ffffff; padding: 1px 4px;">${dateStr}</span> to take the necessary actions.`;
    } else {
      const delai = opts.delaiJours || '14';
      delaiHtmlEn = `To this end, we grant you a period of <span style="background-color: red; mso-highlight: red; color: #ffffff; padding: 1px 4px;">${delai} days</span> from the sending date of this email to take the necessary actions.`;
    }
    const tasks: string[] = [];
    if (opts.entrevue) tasks.push("Schedule your interview");
    if (opts.medicale) tasks.push("Schedule your medical evaluation");
    if (opts.gambit) tasks.push("References, employment and education history (Gambit)");
    if (opts.psps) tasks.push("Criminal record and credit check (PSPS)");

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

  // --- Annexe Q ---
  getAnnexeQSectionPlainFr(alphaPostulant: string): string {
    const alpha = alphaPostulant.trim() || 'xx';
    return `Bonjour Monsieur/Madame,\n\nLes documents PSPS sont au dossier pour le postulant suivant : ${alpha}\n\nMerci, bonne journée à vous !`;
  }

  getAnnexeQSectionPlainEn(alphaPostulant: string): string {
    const alpha = alphaPostulant.trim() || 'xx';
    return `Hello Sir/Madam,\n\nThe PSPS documents are on file for the following applicant: ${alpha}\n\nThank you, have a great day!`;
  }

  getAnnexeQSectionHtmlFr(alphaPostulant: string): string {
    const alpha = alphaPostulant.trim() || 'xx';
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour Monsieur/Madame,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Les documents PSPS sont au dossier pour le postulant suivant : ${alpha}</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Merci, bonne journée à vous !</p>`;
  }

  getAnnexeQSectionHtmlEn(alphaPostulant: string): string {
    const alpha = alphaPostulant.trim() || 'xx';
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello Sir/Madam,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">The PSPS documents are on file for the following applicant: ${alpha}</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Thank you, have a great day!</p>`;
  }

  // --- Medical Evaluation ---
  getMedicalPartEn(part: string): string {
    if (part === 'Partie 1') return 'Part 1';
    if (part === 'Partie 2') return 'Part 2';
    if (part === 'Partie 1 et 2') return 'Part 1 and 2';
    return part;
  }

  getMedicalSectionPlainFr(part: string, isOta: boolean): string {
    let fr = '';
    if (isOta) {
      fr += `Votre rendez-vous pour votre évaluation médicale - ${part} a été fixé au centre de recrutement de Montréal.\n\n`;
      fr += `Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.\n\n`;
      fr += `Lien de connexion à votre portail : https://www.cafoap-pclfac.forces.gc.ca/\n\n`;
      fr += `IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.\n\n`;
    } else {
      fr += `Une nouvelle tâche intitulée « Évaluation médicale - ${part} » vous a été attribuée dans votre portail du postulant.\n\n`;
      fr += `Afin de réaliser votre évaluation médicale, vous devrez vous présenter à votre centre de recrutement attitré (dont les coordonnées sont indiquées directement dans votre portail).\n\n`;
      fr += `Dans votre portail, vous pourrez sélectionner vous-même le moment qui vous convient le mieux parmi les plages horaires disponibles.\n\n`;
      fr += `Lien de connexion à votre portail : https://www.cafoap-pclfac.forces.gc.ca/\n\n`;
    }
    fr += `Merci de votre collaboration.`;
    return fr;
  }

  getMedicalSectionPlainEn(partEn: string, isOta: boolean): string {
    let en = '';
    if (isOta) {
      en += `Your appointment for your Medical Evaluation - ${partEn} has been scheduled at the Montreal recruitment centre.\n\n`;
      en += `Please log in to your applicant portal to find all the details regarding your appointment.\n\n`;
      en += `Applicant portal login link: https://www.cafoap-pclfac.forces.gc.ca/\n\n`;
      en += `IMPORTANT: Please notify us as soon as possible if this date does not work for you.\n\n`;
    } else {
      en += `A new task titled "Medical Evaluation - ${partEn}" has been assigned to you in your applicant portal.\n\n`;
      en += `To complete this medical evaluation, you will need to report to your assigned recruitment centre (indicated in your portal).\n\n`;
      en += `In your portal, you will be able to select the time slot that best suits you from the available times.\n\n`;
      en += `Applicant portal login link: https://www.cafoap-pclfac.forces.gc.ca/\n\n`;
    }
    en += `Thank you for your cooperation.`;
    return en;
  }

  getMedicalSectionHtmlFr(part: string, isOta: boolean): string {
    let html = '';
    if (isOta) {
      html += `<p>Votre rendez-vous pour votre évaluation médicale - <strong>${part}</strong> a été fixé au centre de recrutement de Montréal.</p>`;
      html += `<p>Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.</p>`;
      html += `<p>Lien de connexion à votre portail : <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline;">https://www.cafoap-pclfac.forces.gc.ca/</a></p>`;
      html += `<p style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 10px 14px; margin: 14px 0; color: #991b1b;"><strong style="font-size: 11.5pt;">IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.</strong></p>`;
    } else {
      html += `<p>Une nouvelle tâche intitulée <strong>Évaluation médicale - ${part}</strong> vous a été attribuée dans votre portail du postulant.</p>`;
      html += `<p>Afin de réaliser votre évaluation médicale, vous devrez vous présenter à votre centre de recrutement attitré (dont les coordonnées sont indiquées directement dans votre portail).</p>`;
      html += `<p>Dans votre portail, vous pourrez sélectionner vous-même le moment qui vous convient le mieux parmi les plages horaires disponibles.</p>`;
      html += `<p>Lien de connexion à votre portail : <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline;">https://www.cafoap-pclfac.forces.gc.ca/</a></p>`;
    }
    html += `<p>Merci de votre collaboration.</p>`;
    return html;
  }

  getMedicalSectionHtmlEn(partEn: string, isOta: boolean): string {
    let html = '';
    if (isOta) {
      html += `<p>Your appointment for your Medical Evaluation - <strong>${partEn}</strong> has been scheduled at the Montreal recruitment centre.</p>`;
      html += `<p>Please log in to your applicant portal to find all the details regarding your appointment.</p>`;
      html += `<p>Applicant portal login link: <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline;">https://www.cafoap-pclfac.forces.gc.ca/</a></p>`;
      html += `<p style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 10px 14px; margin: 14px 0; color: #991b1b;"><strong style="font-size: 11.5pt;">IMPORTANT: Please notify us as soon as possible if this date does not work for you.</strong></p>`;
    } else {
      html += `<p>A new task titled <strong>Medical Evaluation - ${partEn}</strong> has been assigned to you in your applicant portal.</p>`;
      html += `<p>To complete this medical evaluation, you will need to report to your assigned recruitment centre (indicated in your portal).</p>`;
      html += `<p>In your portal, you will be able to select the time slot that best suits you from the available times.</p>`;
      html += `<p>Applicant portal login link: <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline;">https://www.cafoap-pclfac.forces.gc.ca/</a></p>`;
    }
    html += `<p>Thank you for your cooperation.</p>`;
    return html;
  }

  // --- Unite Affectation helper ---
  getUniteAffectationObj(uniteId: string): UniteAffectation {
    const found = UNITES_AFFECTATION.find(u => u.id === uniteId);
    return found || UNITES_AFFECTATION[0];
  }

  // Formulaires supplémentaires Offre
  getOffreFormulairesSupplementairesPlain(state: GdOfferState, lang: 'fr' | 'en'): string {
    const list: string[] = [];
    if (state.offreFormulairePpp) {
      list.push(lang === 'fr'
        ? "• Formulaire PPP (https://simontheriault8-cyber.github.io/Documents/Formulaire%20PPP.pdf) : à remplir et apporter lors de votre enrôlement."
        : "• PPP Form (https://simontheriault8-cyber.github.io/Documents/Formulaire%20PPP.pdf) : to complete and bring to your enrolment."
      );
    }
    if (state.offreFormulairePcu) {
      list.push(lang === 'fr'
        ? "• Formulaire PCU (https://simontheriault8-cyber.github.io/Documents/Formulaire%20PCU.pdf) : à remplir et apporter lors de votre enrôlement."
        : "• PCU Form (https://simontheriault8-cyber.github.io/Documents/Formulaire%20PCU.pdf) : to complete and bring to your enrolment."
      );
    }
    if (state.offreFormulaireCroixSouvenir) {
      list.push(lang === 'fr'
        ? "• Formulaire Croix du Souvenir (https://simontheriault8-cyber.github.io/Documents/Formulaire%20Croix%20du%20souvenir.pdf) : à remplir et apporter lors de votre enrôlement."
        : "• Memorial Cross Form (https://simontheriault8-cyber.github.io/Documents/Formulaire%20Croix%20du%20souvenir.pdf) : to complete and bring to your enrolment."
      );
    }
    if (state.offreFormulaireBeneficiaire) {
      list.push(lang === 'fr'
        ? "• Formulaire de désignation de bénéficiaire (https://simontheriault8-cyber.github.io/Documents/Formulaire%20D%C3%A9signation%20du%20b%C3%A9n%C3%A9ficiaire.pdf) : à remplir et apporter lors de votre enrôlement."
        : "• Beneficiary Designation Form (https://simontheriault8-cyber.github.io/Documents/Formulaire%20D%C3%A9signation%20du%20b%C3%A9n%C3%A9ficiaire.pdf) : to complete and bring to your enrolment."
      );
    }
    return list.length > 0 ? list.join('\n') + '\n' : '';
  }

  getOffreFormulairesSupplementairesHtml(state: GdOfferState, lang: 'fr' | 'en'): string {
    const list: string[] = [];
    if (state.offreFormulairePpp) {
      list.push(lang === 'fr'
        ? `• <a href="https://simontheriault8-cyber.github.io/Documents/Formulaire%20PPP.pdf" target="_blank" style="color: #0563c1; text-decoration: underline;">Formulaire PPP</a> : à remplir et apporter lors de votre enrôlement.`
        : `• <a href="https://simontheriault8-cyber.github.io/Documents/Formulaire%20PPP.pdf" target="_blank" style="color: #0563c1; text-decoration: underline;">PPP Form</a> : to complete and bring to your enrolment.`
      );
    }
    if (state.offreFormulairePcu) {
      list.push(lang === 'fr'
        ? `• <a href="https://simontheriault8-cyber.github.io/Documents/Formulaire%20PCU.pdf" target="_blank" style="color: #0563c1; text-decoration: underline;">Formulaire PCU</a> : à remplir et apporter lors de votre enrôlement.`
        : `• <a href="https://simontheriault8-cyber.github.io/Documents/Formulaire%20PCU.pdf" target="_blank" style="color: #0563c1; text-decoration: underline;">PCU Form</a> : to complete and bring to your enrolment.`
      );
    }
    if (state.offreFormulaireCroixSouvenir) {
      list.push(lang === 'fr'
        ? `• <a href="https://simontheriault8-cyber.github.io/Documents/Formulaire%20Croix%20du%20souvenir.pdf" target="_blank" style="color: #0563c1; text-decoration: underline;">Formulaire Croix du Souvenir</a> : à remplir et apporter lors de votre enrôlement.`
        : `• <a href="https://simontheriault8-cyber.github.io/Documents/Formulaire%20Croix%20du%20souvenir.pdf" target="_blank" style="color: #0563c1; text-decoration: underline;">Memorial Cross Form</a> : to complete and bring to your enrolment.`
      );
    }
    if (state.offreFormulaireBeneficiaire) {
      list.push(lang === 'fr'
        ? `• <a href="https://simontheriault8-cyber.github.io/Documents/Formulaire%20D%C3%A9signation%20du%20b%C3%A9n%C3%A9ficiaire.pdf" target="_blank" style="color: #0563c1; text-decoration: underline;">Formulaire de désignation de bénéficiaire</a> : à remplir et apporter lors de votre enrôlement.`
        : `• <a href="https://simontheriault8-cyber.github.io/Documents/Formulaire%20D%C3%A9signation%20du%20b%C3%A9n%C3%A9ficiaire.pdf" target="_blank" style="color: #0563c1; text-decoration: underline;">Beneficiary Designation Form</a> : to complete and bring to your enrolment.`
      );
    }
    return list.length > 0 ? list.join('<br>') + '<br>' : '';
  }
}
