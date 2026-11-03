import { getInapteMedicalSubject } from "./gd-inapte-medical-email.generator";
import {
  TEAMS_CEREMONY_URL_MS,
  TEAMS_CEREMONY_URL_LIVE,
  getJoiningInstructionsQmbUrl,
} from "../data/app-links.data";

export function getRappelCeremonieTeamsPlainFr(this: any): string {
    const city = this.rappelCeremonieLieu();
    if (city === 'Montréal') {
      return `Voici le lien Teams pour les invités à distance : Cérémonie d'assermentation 27 août 2026 | Rencontre-Participation | Microsoft Teams : ${TEAMS_CEREMONY_URL_MS}`;
    } else if (city === 'Québec') {
      return `Voici le lien Teams pour les invités à distance : ${TEAMS_CEREMONY_URL_LIVE}`;
    }
    return "";
  }

export function getRappelCeremonieTeamsPlainEn(this: any): string {
    const city = this.rappelCeremonieLieu();
    if (city === 'Montréal') {
      return `Here is the Teams link for remote guests: Cérémonie d'assermentation 27 août 2026 | Rencontre-Participation | Microsoft Teams : ${TEAMS_CEREMONY_URL_MS}`;
    } else if (city === 'Québec') {
      return `Here is the Teams link for remote guests: ${TEAMS_CEREMONY_URL_LIVE}`;
    }
    return "";
  }

export function getRappelCeremonieTeamsHtmlFr(this: any): string {
    const city = this.rappelCeremonieLieu();
    if (city === 'Montréal') {
      return `Voici le lien Teams pour les invités à distance : <a href="${TEAMS_CEREMONY_URL_MS}" target="_blank" style="color: #2563eb; text-decoration: underline;">Cérémonie d'assermentation 27 août 2026 | Rencontre-Participation | Microsoft Teams</a>`;
    } else if (city === 'Québec') {
      return `Voici le lien Teams pour les invités à distance : <a href="${TEAMS_CEREMONY_URL_LIVE}" target="_blank" style="color: #2563eb; text-decoration: underline;">${TEAMS_CEREMONY_URL_LIVE}</a>`;
    }
    return "";
  }

export function getRappelCeremonieTeamsHtmlEn(this: any): string {
    const city = this.rappelCeremonieLieu();
    if (city === 'Montréal') {
      return `Here is the Teams link for remote guests: <a href="${TEAMS_CEREMONY_URL_MS}" target="_blank" style="color: #2563eb; text-decoration: underline;">Cérémonie d'assermentation 27 août 2026 | Rencontre-Participation | Microsoft Teams</a>`;
    } else if (city === 'Québec') {
      return `Here is the Teams link for remote guests: <a href="${TEAMS_CEREMONY_URL_LIVE}" target="_blank" style="color: #2563eb; text-decoration: underline;">${TEAMS_CEREMONY_URL_LIVE}</a>`;
    }
    return "";
  }

export function getRappelCeremonieAddress(this: any): string {
    const city = this.rappelCeremonieLieu();
    const center = this.recruitmentCentersList.find(c => c.city === city);
    return center ? center.address : 'Adresse du centre';
  }

export function getRappelCeremonieSectionPlainFr(this: any): string {
    const address = this.getRappelCeremonieAddress();
    const date = this.rappelCeremonieDate() || '___________________';
    const city = this.rappelCeremonieLieu();
    const isMontreal = city === 'Montréal';

    const blocks: string[] = [
      `Bonjour,`,
      `Ce message est un rappel pour votre cérémonie d'assermentation.`,
      `Date : ${date}\nHeure : ${this.rappelCeremonieHeurePostulant()} - veuillez arriver 15 minutes à l'avance\nLieu : ${address}\nHeure d'arrivée des invités : ${this.rappelCeremonieHeureInvites()}`
    ];

    if (!isMontreal) {
      blocks.push(`Vous aurez droit à 2 invités sur place.`);
    }

    const teamsLine = this.getRappelCeremonieTeamsPlainFr().trim();
    if (teamsLine) {
      blocks.push(teamsLine);
    }

    blocks.push(`Si vous êtes dans une Union de fait, votre conjoint ou conjointe doit être présent avec vous dès votre arrivé au centre de recrutement la journée de votre cérémonie d'assermentation.`);

    blocks.push(`Veuillez apporter une pièce d'identité valide avec photo (ex: permis de conduire, carte d'assurance maladie, etc).`);

    if (this.rappelCeremonieRalliementChecked()) {
      blocks.push(`Voici le lien vers vos instructions de ralliement pour l’École de leadership et de recrues des Forces canadiennes (ELRFC) :\nInstructions de ralliement (QMB/QMBO) : ${getJoiningInstructionsQmbUrl(false)}`);
    }

    blocks.push(`Si jamais vous êtes dans l'impossibilité de vous présenter, veuillez-nous en aviser le plus rapidement possible en répondant à ce courriel.`);
    blocks.push(`Si vous ne vous présentez pas sans nous en aviser, vous risquez la fermeture de votre dossier.`);
    blocks.push(`Si vous avez des questions, n'hésitez pas à me faire suivre un courriel.`);
    blocks.push(`Merci, bonne journée !`);

    return blocks.join('\n\n');
  }

export function getRappelCeremonieSectionPlainEn(this: any): string {
    const address = this.getRappelCeremonieAddress();
    const date = this.rappelCeremonieDate() || '___________________';
    const city = this.rappelCeremonieLieu();
    const isMontreal = city === 'Montréal';

    const blocks: string[] = [
      `Hello,`,
      `This message is a reminder for your swearing-in ceremony.`,
      `Date: ${date}\nTime: ${this.rappelCeremonieHeurePostulant()} - please arrive 15 minutes in advance\nLocation: ${address}\nGuest arrival time: ${this.rappelCeremonieHeureInvites()}`
    ];

    if (!isMontreal) {
      blocks.push(`You will be allowed 2 guests on site.`);
    }

    const teamsLine = this.getRappelCeremonieTeamsPlainEn().trim();
    if (teamsLine) {
      blocks.push(teamsLine);
    }

    blocks.push(`If you are in a common-law relationship, your spouse or common-law partner must be present with you upon arrival at the recruitment centre on the day of your swearing-in ceremony.`);

    blocks.push(`Please bring a valid photo ID (e.g. driver's licence, health insurance card, etc.).`);

    if (this.rappelCeremonieRalliementChecked()) {
      blocks.push(`Here is the link to your joining instructions for the Canadian Forces Leadership and Recruit School (CFLRS):\nJoining Instructions (BMQ/BMOQ) : ${getJoiningInstructionsQmbUrl(true)}`);
    }

    blocks.push(`If you are unable to attend, please notify us as soon as possible by replying to this email.`);
    blocks.push(`If you fail to attend without notifying us, you risk having your file closed.`);
    blocks.push(`If you have any questions, please do not hesitate to email me.`);
    blocks.push(`Thank you, have a nice day!`);

    return blocks.join('\n\n');
  }

export function getRappelCeremonieSectionHtmlFr(this: any): string {
    const address = this.getRappelCeremonieAddress();
    const date = this.rappelCeremonieDate() || '___________________';
    const city = this.rappelCeremonieLieu();
    const isMontreal = city === 'Montréal';

    const pInvites = !isMontreal ? `<p>Vous aurez droit à 2 invités sur place.</p>` : '';
    const teamsHtml = this.getRappelCeremonieTeamsHtmlFr();
    const pTeams = teamsHtml ? `<p>${teamsHtml}</p>` : '';
    const pUnion = `<p>Si vous êtes dans une Union de fait, votre conjoint ou conjointe doit être présent avec vous dès votre arrivé au centre de recrutement la journée de votre cérémonie d'assermentation.</p>`;
    const pRalliement = this.rappelCeremonieRalliementChecked()
      ? `<p>Voici le lien vers vos instructions de ralliement pour l’École de leadership et de recrues des Forces canadiennes (ELRFC) :<br><a href="${getJoiningInstructionsQmbUrl(false)}" target="_blank" style="color: #2563eb; text-decoration: underline;">Instructions de ralliement (QMB/QMBO)</a></p>`
      : '';

    const htmlParts = [
      `<p>Bonjour,</p>`,
      `<p>Ce message est un rappel pour votre cérémonie d'assermentation.</p>`,
      `<ul style="margin-top: 10px; margin-bottom: 15px; padding-left: 20px;">
  <li><strong>Date :</strong> ${date}</li>
  <li><strong>Heure :</strong> ${this.rappelCeremonieHeurePostulant()} - veuillez arriver 15 minutes à l'avance</li>
  <li><strong>Lieu :</strong> ${address}</li>
  <li><strong>Heure d'arrivée des invités :</strong> ${this.rappelCeremonieHeureInvites()}</li>
</ul>`,
      pInvites,
      pTeams,
      pUnion,
      `<p>Veuillez apporter une pièce d'identité valide avec photo (ex: permis de conduire, carte d'assurance maladie, etc).</p>`,
      pRalliement,
      `<p>Si jamais vous êtes dans l'impossibilité de vous présenter, veuillez-nous en aviser le plus rapidement possible en répondant à ce courriel.</p>`,
      `<p>Si vous ne vous présentez pas sans nous en aviser, vous risquez la fermeture de votre dossier.</p>`,
      `<p>Si vous avez des questions, n'hésitez pas à me faire suivre un courriel.</p>`,
      `<p>Merci, bonne journée !</p>`
    ].filter(Boolean);

    return htmlParts.join('\n');
  }

export function getRappelCeremonieSectionHtmlEn(this: any): string {
    const address = this.getRappelCeremonieAddress();
    const date = this.rappelCeremonieDate() || '___________________';
    const city = this.rappelCeremonieLieu();
    const isMontreal = city === 'Montréal';

    const pInvites = !isMontreal ? `<p>You will be allowed 2 guests on site.</p>` : '';
    const teamsHtml = this.getRappelCeremonieTeamsHtmlEn();
    const pTeams = teamsHtml ? `<p>${teamsHtml}</p>` : '';
    const pUnion = `<p>If you are in a common-law relationship, your spouse or common-law partner must be present with you upon arrival at the recruitment centre on the day of your swearing-in ceremony.</p>`;
    const pRalliement = this.rappelCeremonieRalliementChecked()
      ? `<p>Here is the link to your joining instructions for the Canadian Forces Leadership and Recruit School (CFLRS):<br><a href="${getJoiningInstructionsQmbUrl(true)}" target="_blank" style="color: #2563eb; text-decoration: underline;">Joining Instructions (BMQ/BMOQ)</a></p>`
      : '';

    const htmlParts = [
      `<p>Hello,</p>`,
      `<p>This message is a reminder for your swearing-in ceremony.</p>`,
      `<ul style="margin-top: 10px; margin-bottom: 15px; padding-left: 20px;">
  <li><strong>Date:</strong> ${date}</li>
  <li><strong>Time:</strong> ${this.rappelCeremonieHeurePostulant()} - please arrive 15 minutes in advance</li>
  <li><strong>Location:</strong> ${address}</li>
  <li><strong>Guest arrival time:</strong> ${this.rappelCeremonieHeureInvites()}</li>
</ul>`,
      pInvites,
      pTeams,
      pUnion,
      `<p>Please bring a valid photo ID (e.g. driver's licence, health insurance card, etc.).</p>`,
      pRalliement,
      `<p>If you are unable to attend, please notify us as soon as possible by replying to this email.</p>`,
      `<p>If you fail to attend without notifying us, you risk having your file closed.</p>`,
      `<p>If you have any questions, please do not hesitate to email me.</p>`,
      `<p>Thank you, have a nice day!</p>`
    ].filter(Boolean);

    return htmlParts.join('\n');
  }

export function getRappelCeremonieEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getRappelCeremonieSectionPlainFr();
    const en = this.getRappelCeremonieSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    if (isEn) {
      return `Un message en français suivra.\n\n${en}\n\n${sigEn}\n\n______________________________________________________________________________\n\n${fr}\n\n${sigFr}`;
    }
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

export function getRappelCeremonieEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getRappelCeremonieSectionHtmlFr();
    const en = this.getRappelCeremonieSectionHtmlEn();
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    if (isEn) {
      html += `<p><strong>Un message en français suivra.</strong></p>`;
      html += en;
      html += `<p>${sigEn}</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += fr;
      html += `<p>${sigFr}</p>`;
    } else {
      html += `<p><strong>English message will follow.</strong></p>`;
      html += fr;
      html += `<p>${sigFr}</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += en;
      html += `<p>${sigEn}</p>`;
    }
    html += `</div>`;
    return html;
  }

  // Tentative de communication pour offre d'emploi (Volet GD)
export function getTentativeOffreGdSectionPlainFr(this: any): string {
    return `Bonjour,\n\nNous avons tenté de vous joindre par téléphone afin de vous faire une offre d’emploi. Veuillez nous rappeler le plus rapidement possible.\n\nSi vous connaissez le nom et le poste de votre gestionnaire de dossier, vous pouvez le contacter directement.\n\nDans le cas contraire, veuillez communiquer avec le centre de recrutement en charge de votre dossier à l’intérieur des heures d’ouverture.\n\nMerci et au plaisir de vous parler.`;
  }

export function getTentativeOffreGdSectionPlainEn(this: any): string {
    return `Hello,\n\nWe attempted to reach you by phone to make you a job offer. Please call us back as soon as possible.\n\nIf you know the name and extension of your file manager, you can contact them directly.\n\nOtherwise, please contact the recruiting centre in charge of your file during business hours.\n\nThank you and we look forward to speaking with you.`;
  }

export function getTentativeOffreGdEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getTentativeOffreGdSectionPlainFr();
    const en = this.getTentativeOffreGdSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    if (isEn) {
      return `Un message en français suivra.\n\n${en}\n\n${sigEn}\n\n______________________________________________________________________________\n\n${fr}\n\n${sigFr}`;
    }
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

export function getTentativeOffreGdSectionHtmlFr(this: any): string {
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Nous avons tenté de vous joindre par téléphone afin de vous faire une offre d’emploi. Veuillez nous rappeler le plus rapidement possible.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Si vous connaissez le nom et le poste de votre gestionnaire de dossier, vous pouvez le contacter directement.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Dans le cas contraire, veuillez communiquer avec le centre de recrutement en charge de votre dossier à l’intérieur des heures d’ouverture.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Merci et au plaisir de vous parler.</p>`;
  }

export function getTentativeOffreGdSectionHtmlEn(this: any): string {
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">We attempted to reach you by phone to make you a job offer. Please call us back as soon as possible.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">If you know the name and extension of your file manager, you can contact them directly.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Otherwise, please contact the recruiting centre in charge of your file during business hours.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Thank you and we look forward to speaking with you.</p>`;
  }

export function getTentativeOffreGdEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getTentativeOffreGdSectionHtmlFr();
    const en = this.getTentativeOffreGdSectionHtmlEn();
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    if (isEn) {
      html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Un message en français suivra.</strong></p>`;
      html += en;
      html += `<p>${sigEn}</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += fr;
      html += `<p>${sigFr}</p>`;
    } else {
      html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>`;
      html += fr;
      html += `<p>${sigFr}</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += en;
      html += `<p>${sigEn}</p>`;
    }
    html += `</div>`;
    return html;
  }

  // Vérification Dossier Cadet (Volet GD)
export function getVerificationCadetEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getSignatureEn();
      return `Hello,\n\nCould you please confirm if the following applicant has an assigned cadet service number and if possible provide their cadet information record?\n\nLast Name : \nFirst Name : \nDOB : \n\n${sigEn}`;
    }
    const sigFr = this.getSignatureFr();
    return `Bonjour,\n\nPourriez-vous me confirmer si le postulant suivant a un matricule attribué comme cadet et si possible avoir sa fiche de renseignements de cadet?\n\nNom : \nPrénom : \nDDN : \n\n${sigFr}`;
  }

export function getVerificationCadetEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getHtmlSignatureEn();
      return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Could you please confirm if the following applicant has an assigned cadet service number and if possible provide their cadet information record?</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Last Name : <br>First Name : <br>DOB : </p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigEn}</p>` +
        `</div>`;
    }
    const sigFr = this.getHtmlSignatureFr();
    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Pourriez-vous me confirmer si le postulant suivant a un matricule attribué comme cadet et si possible avoir sa fiche de renseignements de cadet?</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Nom : <br>Prénom : <br>DDN : </p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigFr}</p>` +
      `</div>`;
  }

  // Bris de bail et entreposage (Volet GD)
export function getBrisBailEntreposageSectionPlainFr(this: any): string {
    return `Bonjour M./Mme XXXXX,\n\n` +
      `Voici les informations concernant le bris de bail et votre entreposage :\n\n` +
      `Lors de votre enrôlement, vous avez la possibilité de vous faire rembourser la pénalité pour votre bris de bail (2 mois). Les documents mentionnés plus bas devront être remis au commis responsable des réclamations lors de votre première semaine à l’École de leadership et de recrues des Forces canadiennes (ELRFC) à St-Jean.\n\n` +
      `Bris de bail :\n\n` +
      `Vous devrez fournir les documents suivants :\n\n` +
      `•           Bail (original)\n\n` +
      `•           Lettre de renouvellement du bail\n\n` +
      `•           Lettre du propriétaire indiquant qu’il y a une pénalité en raison du bris de bail et détaillant les mois de la pénalité et le montant payé par le locataire (vous devez fournir l’original).\n\n` +
      `•           Preuve de paiement pour les mois de la pénalité (Reçu fournis par le propriétaire détaillant les mois de la pénalité et les montants)\n\n` +
      `•           Preuves de paiement pour le dernier mois régulier de loyer payé par le locataire ainsi que le mois de quittance.\n\n` +
      `Entreposage :\n\n` +
      `Concernant l’entreposage, une personne de la base de Valcartier vous contactera pour confirmer avec vous une date après enrôlement, date à laquelle un déménageur se rendra à votre résidence pour emballer vos effets personnels et transporter le tout dans un entrepôt. Vos effets personnels seront entreposés jusqu’à la fin de votre cours de métier, en attendant votre première mutation.\n\n` +
      `Veuillez prendre note qu’il vous en coûtera 75-100$ à chaque fois que vous allez vouloir accéder à votre entrepôt, puisqu’une personne de la CIE devra se déplacer sur place.`;
  }

export function getBrisBailEntreposageSectionPlainEn(this: any): string {
    return `Hello Mr./Ms. XXXXX,\n\n` +
      `Here is the information regarding the lease break and your storage:\n\n` +
      `Upon your enrolment, you have the option to be reimbursed for the penalty for your lease break (2 months). The documents mentioned below must be submitted to the claims clerk during your first week at the Canadian Forces Leadership and Recruit School (CFLRS) in St-Jean.\n\n` +
      `Lease break:\n\n` +
      `You will need to provide the following documents:\n\n` +
      `•           Lease (original)\n\n` +
      `•           Lease renewal letter\n\n` +
      `•           Letter from the landlord indicating that there is a penalty due to the lease break and detailing the penalty months and the amount paid by the tenant (you must provide the original).\n\n` +
      `•           Proof of payment for the penalty months (Receipt provided by the landlord detailing the penalty months and amounts)\n\n` +
      `•           Proof of payment for the last regular month of rent paid by the tenant as well as the release month.\n\n` +
      `Storage:\n\n` +
      `Regarding storage, a representative from the Valcartier base will contact you to confirm a date after enrolment, on which a mover will come to your residence to pack your personal belongings and transport everything to a storage facility. Your personal belongings will be stored until the end of your occupational training course, pending your first posting.\n\n` +
      `Please note that it will cost you $75-$100 each time you wish to access your storage unit, as a company representative will have to travel on-site.`;
  }

export function getBrisBailEntreposageEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getBrisBailEntreposageSectionPlainFr();
    const en = this.getBrisBailEntreposageSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    if (isEn) {
      return `Un message en français suivra.\n\n${en}\n\n${sigEn}\n\n______________________________________________________________________________\n\n${fr}\n\n${sigFr}`;
    }
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

export function getBrisBailEntreposageSectionHtmlFr(this: any): string {
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour M./Mme XXXXX,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Voici les informations concernant le bris de bail et votre entreposage :</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Lors de votre enrôlement, vous avez la possibilité de vous faire rembourser la pénalité pour votre bris de bail (2 mois). Les documents mentionnés plus bas devront être remis au commis responsable des réclamations lors de votre première semaine à l’École de leadership et de recrues des Forces canadiennes (ELRFC) à St-Jean.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 6.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Bris de bail :</strong></p>` +
      `<p style="margin-top: 0cm; margin-bottom: 6.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Vous devrez fournir les documents suivants :</p>` +
      `<ul style="margin-top: 0cm; margin-bottom: 12.0pt; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `<li style="margin-bottom: 6pt;">Bail (original)</li>` +
      `<li style="margin-bottom: 6pt;">Lettre de renouvellement du bail</li>` +
      `<li style="margin-bottom: 6pt;">Lettre du propriétaire indiquant qu’il y a une pénalité en raison du bris de bail et détaillant les mois de la pénalité et le montant payé par le locataire (vous devez fournir l’original).</li>` +
      `<li style="margin-bottom: 6pt;">Preuve de paiement pour les mois de la pénalité (Reçu fournis par le propriétaire détaillant les mois de la pénalité et les montants)</li>` +
      `<li style="margin-bottom: 6pt;">Preuves de paiement pour le dernier mois régulier de loyer payé par le locataire ainsi que le mois de quittance.</li>` +
      `</ul>` +
      `<p style="margin-top: 0cm; margin-bottom: 6.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Entreposage :</strong></p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Concernant l’entreposage, une personne de la base de Valcartier vous contactera pour confirmer avec vous une date après enrôlement, date à laquelle un déménageur se rendra à votre résidence pour emballer vos effets personnels et transporter le tout dans un entrepôt. Vos effets personnels seront entreposés jusqu’à la fin de votre cours de métier, en attendant votre première mutation.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Veuillez prendre note qu’il vous en coûtera 75-100$ à chaque fois que vous allez vouloir accéder à votre entrepôt, puisqu’une personne de la CIE devra se déplacer sur place.</p>`;
  }

export function getBrisBailEntreposageSectionHtmlEn(this: any): string {
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello Mr./Ms. XXXXX,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Here is the information regarding the lease break and your storage:</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Upon your enrolment, you have the option to be reimbursed for the penalty for your lease break (2 months). The documents mentioned below must be submitted to the claims clerk during your first week at the Canadian Forces Leadership and Recruit School (CFLRS) in St-Jean.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 6.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Lease break:</strong></p>` +
      `<p style="margin-top: 0cm; margin-bottom: 6.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">You will need to provide the following documents:</p>` +
      `<ul style="margin-top: 0cm; margin-bottom: 12.0pt; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `<li style="margin-bottom: 6pt;">Lease (original)</li>` +
      `<li style="margin-bottom: 6pt;">Lease renewal letter</li>` +
      `<li style="margin-bottom: 6pt;">Letter from the landlord indicating that there is a penalty due to the lease break and detailing the penalty months and the amount paid by the tenant (you must provide the original).</li>` +
      `<li style="margin-bottom: 6pt;">Proof of payment for the penalty months (Receipt provided by the landlord detailing the penalty months and amounts)</li>` +
      `<li style="margin-bottom: 6pt;">Proof of payment for the last regular month of rent paid by the tenant as well as the release month.</li>` +
      `</ul>` +
      `<p style="margin-top: 0cm; margin-bottom: 6.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Storage:</strong></p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Regarding storage, a representative from the Valcartier base will contact you to confirm a date after enrolment, on which a mover will come to your residence to pack your personal belongings and transport everything to a storage facility. Your personal belongings will be stored until the end of your occupational training course, pending your first posting.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Please note that it will cost you $75-$100 each time you wish to access your storage unit, as a company representative will have to travel on-site.</p>`;
  }

export function getBrisBailEntreposageEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getBrisBailEntreposageSectionHtmlFr();
    const en = this.getBrisBailEntreposageSectionHtmlEn();
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    if (isEn) {
      html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Un message en français suivra.</strong></p>`;
      html += en;
      html += `<p>${sigEn}</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += fr;
      html += `<p>${sigFr}</p>`;
    } else {
      html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>`;
      html += fr;
      html += `<p>${sigFr}</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += en;
      html += `<p>${sigEn}</p>`;
    }
    html += `</div>`;
    return html;
  }

  // Demande NAV/TAN & Claims X - CSPN partie 1 (Volet GD)
export function getDemandeNavTanEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getSignatureEn();
      return `Hello,\n\nCould you please provide a NAV/TAN number for the following applicant:\n\nSN: XXXXXXXX\nRANK : APPL/POST CIV\nFIRST NAME : XXXXXXX\nNAME : XXXXXXX\nPON :  281(QUEBEC)\nUIC : 0202(QC)\nPROV OF EMPLOYMENT :  QC\nCSPN Date : day-to-day -month-year\n\n${sigEn}`;
    }
    const sigFr = this.getSignatureFr();
    return `Bonjour,\n\nPourriez-vous nous donner un numéro de NAV/TAN pour le postulant suivant svp:\n\nSN: XXXXXXXX\nRANK : APPL/POST CIV\nFIRST NAME : XXXXXXX\nNAME : XXXXXXX\nPON :  281(QUEBEC)\nUIC : 0202(QC)\nPROV OF EMPLOYMENT :  QC\nDate de CSPN : jour-au jour -mois-année\n\n${sigFr}`;
  }

export function getDemandeNavTanEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getHtmlSignatureEn();
      return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Could you please provide a NAV/TAN number for the following applicant:</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
        `SN: XXXXXXXX<br>` +
        `RANK : APPL/POST CIV<br>` +
        `FIRST NAME : XXXXXXX<br>` +
        `NAME : XXXXXXX<br>` +
        `PON :  281(QUEBEC)<br>` +
        `UIC : 0202(QC)<br>` +
        `PROV OF EMPLOYMENT :  QC<br>` +
        `CSPN Date : day-to-day -month-year` +
        `</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigEn}</p>` +
        `</div>`;
    }
    const sigFr = this.getHtmlSignatureFr();
    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Pourriez-vous nous donner un numéro de NAV/TAN pour le postulant suivant svp:</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `SN: XXXXXXXX<br>` +
      `RANK : APPL/POST CIV<br>` +
      `FIRST NAME : XXXXXXX<br>` +
      `NAME : XXXXXXX<br>` +
      `PON :  281(QUEBEC)<br>` +
      `UIC : 0202(QC)<br>` +
      `PROV OF EMPLOYMENT :  QC<br>` +
      `Date de CSPN : jour-au jour -mois-année` +
      `</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigFr}</p>` +
      `</div>`;
  }

  // Demande d'autorisation pour un CSPN (Volet GD)
export function getDemandeAutorisationCspnEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getSignatureEn();
      return `Hello,\n\nHere is an authorization request for a CSPN.\n\nAlpha : XXX\nNM : XXX\nLast Name : XXX\nFirst Name : XXX\nOccupation : XXX\n\n${sigEn}`;
    }
    const sigFr = this.getSignatureFr();
    return `Bonjour,\n\nVoici une demande d’autorisation pour un CSPN.\n\nAlpha : XXX\nNM : XXX\nNom : XXX\nPrénom : XXX\nMétier : XXX\n\n${sigFr}`;
  }

export function getDemandeAutorisationCspnEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getHtmlSignatureEn();
      return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Here is an authorization request for a CSPN.</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
        `Alpha : XXX<br>` +
        `NM : XXX<br>` +
        `Last Name : XXX<br>` +
        `First Name : XXX<br>` +
        `Occupation : XXX` +
        `</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigEn}</p>` +
        `</div>`;
    }
    const sigFr = this.getHtmlSignatureFr();
    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Voici une demande d’autorisation pour un CSPN.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `Alpha : XXX<br>` +
      `NM : XXX<br>` +
      `Nom : XXX<br>` +
      `Prénom : XXX<br>` +
      `Métier : XXX` +
      `</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigFr}</p>` +
      `</div>`;
  }

  // Documents requis - Conjoint(e) de fait (Volet GD)
export function getDocumentsConjointDeFaitSectionPlainFr(this: any): string {
    return `Bonjour,\n\n` +
      `Vous nous avez mentionné être conjoint.e de fait. Pour votre enrôlement, nous avons besoin de prouver ce statut. Pour se faire, merci de m’envoyer par courriel :\n\n` +
      `• Une facture de vous et une facture de votre conjoint.e d’un an en arrière, soit une facture de juin 2025, qui prouve que vous habitiez ensemble l’an passé,\n` +
      `• Une facture de vous et une facture de votre conjoint.e qui prouve que vous êtes à la même adresse actuellement (soit mai/juin 2026),\n` +
      `• Le certificat de naissance de votre conjoint.e.\n\n` +
      `(Vous pouvez fournir des factures à vos noms individuels ou des factures adressées à vos deux noms)\n\n` +
      `Lors de l’assermentation :\n\n` +
      `• Apportez les factures originales et le certificat de naissance de votre conjoint.e.\n` +
      `• Votre conjoint.e devra être présent.e lors de l’assermentation pour signer les documents d’union de fait (cela prendra quelques minutes, il/elle pourra quitter par la suite)`;
  }

export function getDocumentsConjointDeFaitSectionPlainEn(this: any): string {
    return `Hello,\n\n` +
      `You mentioned to us that you are in a common-law relationship. For your enrolment, we need to establish proof of this status. To do so, please email me:\n\n` +
      `• One bill/invoice for you and one for your common-law partner from one year ago (e.g., June 2025), proving that you lived together last year,\n` +
      `• One bill/invoice for you and one for your common-law partner proving that you are currently at the same address (e.g., May/June 2026),\n` +
      `• Your common-law partner's birth certificate.\n\n` +
      `(You can provide bills in your individual names or bills addressed to both names)\n\n` +
      `At the swearing-in ceremony:\n\n` +
      `• Bring the original bills and your common-law partner's birth certificate.\n` +
      `• Your common-law partner must be present during the swearing-in ceremony to sign the common-law relationship documents (this will take a few minutes, he/she may leave afterwards)`;
  }

export function getDocumentsConjointDeFaitEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getDocumentsConjointDeFaitSectionPlainFr();
    const en = this.getDocumentsConjointDeFaitSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    if (isEn) {
      return `Un message en français suivra.\n\n${en}\n\n${sigEn}\n\n______________________________________________________________________________\n\n${fr}\n\n${sigFr}`;
    }
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

export function getDocumentsConjointDeFaitSectionHtmlFr(this: any): string {
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Vous nous avez mentionné être conjoint.e de fait. Pour votre enrôlement, nous avons besoin de prouver ce statut. Pour se faire, merci de m’envoyer par courriel :</p>` +
      `<ul style="margin-top: 0cm; margin-bottom: 12.0pt; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `<li style="margin-bottom: 6pt;">Une facture de vous et une facture de votre conjoint.e d’un an en arrière, soit une facture de juin 2025, qui prouve que vous habitiez ensemble l’an passé,</li>` +
      `<li style="margin-bottom: 6pt;">Une facture de vous et une facture de votre conjoint.e qui prouve que vous êtes à la même adresse actuellement (soit mai/juin 2026),</li>` +
      `<li style="margin-bottom: 6pt;">Le certificat de naissance de votre conjoint.e.</li>` +
      `</ul>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><em>(Vous pouvez fournir des factures à vos noms individuels ou des factures adressées à vos deux noms)</em></p>` +
      `<p style="margin-top: 0cm; margin-bottom: 6.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Lors de l’assermentation :</strong></p>` +
      `<ul style="margin-top: 0cm; margin-bottom: 12.0pt; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `<li style="margin-bottom: 6pt;">Apportez les factures originales et le certificat de naissance de votre conjoint.e.</li>` +
      `<li style="margin-bottom: 6pt;">Votre conjoint.e devra être présent.e lors de l’assermentation pour signer les documents d’union de fait (cela prendra quelques minutes, il/elle pourra quitter par la suite)</li>` +
      `</ul>`;
  }

export function getDocumentsConjointDeFaitSectionHtmlEn(this: any): string {
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">You mentioned to us that you are in a common-law relationship. For your enrolment, we need to establish proof of this status. To do so, please email me:</p>` +
      `<ul style="margin-top: 0cm; margin-bottom: 12.0pt; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `<li style="margin-bottom: 6pt;">One bill/invoice for you and one for your common-law partner from one year ago (e.g., June 2025), proving that you lived together last year,</li>` +
      `<li style="margin-bottom: 6pt;">One bill/invoice for you and one for your common-law partner proving that you are currently at the same address (e.g., May/June 2026),</li>` +
      `<li style="margin-bottom: 6pt;">Your common-law partner's birth certificate.</li>` +
      `</ul>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><em>(You can provide bills in your individual names or bills addressed to both names)</em></p>` +
      `<p style="margin-top: 0cm; margin-bottom: 6.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>At the swearing-in ceremony:</strong></p>` +
      `<ul style="margin-top: 0cm; margin-bottom: 12.0pt; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `<li style="margin-bottom: 6pt;">Bring the original bills and your common-law partner's birth certificate.</li>` +
      `<li style="margin-bottom: 6pt;">Your common-law partner must be present during the swearing-in ceremony to sign the common-law relationship documents (this will take a few minutes, he/she may leave afterwards)</li>` +
      `</ul>`;
  }

export function getDocumentsConjointDeFaitEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const fr = this.getDocumentsConjointDeFaitSectionHtmlFr();
    const en = this.getDocumentsConjointDeFaitSectionHtmlEn();
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    if (isEn) {
      html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>Un message en français suivra.</strong></p>`;
      html += en;
      html += `<p>${sigEn}</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += fr;
      html += `<p>${sigFr}</p>`;
    } else {
      html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>`;
      html += fr;
      html += `<p>${sigFr}</p>`;
      html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
      html += en;
      html += `<p>${sigEn}</p>`;
    }
    html += `</div>`;
    return html;
  }

  // Demande SDPM pour conjoint militaire (Volet GD)
export function getDemandeSdpmConjointMilitaireEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getSignatureEn();
      return `Hello,\n\nProcessing requires MPRR/SDPM for the following member:\n\nService Number : XXXXX\nFirst Name : XXXXX\nLAST NAME : XXXXX\nDate of Birth : XXXXX\nReg F\n\n${sigEn}`;
    }
    const sigFr = this.getSignatureFr();
    return `Bonjour,\n\nLe traitement aurait besoin de SDPM/MPRR pour le membre suivant :\n\nMatricule : XXXXX\nPrénom : XXXXX\nNOM : XXXXX\nDate de naissance : XXXXX\nF rég\n\n${sigFr}`;
  }

export function getDemandeSdpmConjointMilitaireEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getHtmlSignatureEn();
      return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Processing requires MPRR/SDPM for the following member:</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
        `Service Number : XXXXX<br>` +
        `First Name : XXXXX<br>` +
        `LAST NAME : XXXXX<br>` +
        `Date of Birth : XXXXX<br>` +
        `Reg F` +
        `</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigEn}</p>` +
        `</div>`;
    }
    const sigFr = this.getHtmlSignatureFr();
    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Le traitement aurait besoin de SDPM/MPRR pour le membre suivant :</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `Matricule : XXXXX<br>` +
      `Prénom : XXXXX<br>` +
      `NOM : XXXXX<br>` +
      `Date de naissance : XXXXX<br>` +
      `F rég` +
      `</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigFr}</p>` +
      `</div>`;
  }

  // Test ESOM / Confirmation (Volet GD)
export function getTestEsomConfirmationEmailPlain(this: any): string {
    const center = this.getTestEsomCenter();
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getSignatureEn();
      return `Hello Mr./Ms. XXXXXX,\n\n` +
        `As part of your occupation choice; XXXXXXXXX, you have an aptitude test to complete; the MOST (Maritime Officer Selection Test).\n\n` +
        `This test is designed to evaluate your cognitive skills in memory, decision-making, and selective attention.\n\n` +
        `This 60-question multiple-choice test takes approximately 1.5 hours.\n\n` +
        `This test must be done in person, which is why we invite you to the Recruitment Centre to complete it: ${center.name}\n\n` +
        `Location : ${center.address}\n` +
        `Parking : Available on surrounding streets (please arrive at least 15 minutes early)\n\n` +
        `Please confirm your availability by replying to this email.\n\n` +
        `${sigEn}`;
    }
    const sigFr = this.getSignatureFr();
    return `Bonjour M. XXXXXX,\n\n` +
      `Dans le cadre de votre choix de métier; XXXXXXXXX, vous avez un test d’aptitudes à compléter; le ESOM (examen de sélection des officiers de la marine).\n\n` +
      `Cet examen a pour but d’évaluer vos habiletés cognitives dans les domaines de la mémorisation, de la prise de décision et de l’attention sélective.\n\n` +
      `Ce test de 60 questions est à choix multiples et il est d’une durée d’environ 1h30.\n\n` +
      `Ce test doit se faire en présentiel, c’est pourquoi nous vous invitons au Centre de recrutement pour compléter ce test :  ${center.name}\n\n` +
      `Lieu : ${center.address}\n` +
      `Stationnement : Disponible dans les rues avoisinantes (arrivez au moins 15 minutes à l’avance)\n\n` +
      `Veuillez confirmer votre disponibilité en répondant à ce courriel.\n\n` +
      `${sigFr}`;
  }

export function getTestEsomConfirmationEmailHtml(this: any): string {
    const center = this.getTestEsomCenter();
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const sigEn = this.getHtmlSignatureEn();
      return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello Mr./Ms. XXXXXX,</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">As part of your occupation choice; XXXXXXXXX, you have an aptitude test to complete; the MOST (Maritime Officer Selection Test).</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">This test is designed to evaluate your cognitive skills in memory, decision-making, and selective attention.</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">This test of 60 questions is multiple-choice and lasts approximately 1.5 hours.</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">This test must be completed in person, which is why we invite you to the Recruitment Centre to complete it:  ${center.name}</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
        `<strong>Location :</strong> ${center.address}<br>` +
        `<strong>Parking :</strong> Available on surrounding streets (arrive at least 15 minutes early)` +
        `</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Please confirm your availability by replying to this email.</p>` +
        `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigEn}</p>` +
        `</div>`;
    }
    const sigFr = this.getHtmlSignatureFr();
    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour M. XXXXXX,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Dans le cadre de votre choix de métier; XXXXXXXXX, vous avez un test d’aptitudes à compléter; le ESOM (examen de sélection des officiers de la marine).</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Cet examen a pour but d’évaluer vos habiletés cognitives dans les domaines de la mémorisation, de la prise de décision et de l’attention sélective.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Ce test de 60 questions est à choix multiples et il est d’une durée d’environ 1h30.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Ce test doit se faire en présentiel, c’est pourquoi nous vous invitons au Centre de recrutement pour compléter ce test :  ${center.name}</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">` +
      `<strong>Lieu :</strong> ${center.address}<br>` +
      `<strong>Stationnement :</strong> Disponible dans les rues avoisinantes (arrivez au moins 15 minutes à l’avance)` +
      `</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Veuillez confirmer votre disponibilité en répondant à ce courriel.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigFr}</p>` +
      `</div>`;
  }

export function getEmailSubject(this: any): string {
    const t = (key: string, fallback: string) => this.i18n?.t ? this.i18n.t(key) : fallback;
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    const candidateDefaultSubject = isEn
      ? "Canadian Armed Forces/Forces armées canadiennes"
      : "Forces armées canadiennes/Canadian Armed Forces";

    // 1. Courriels administratifs internes (adressés à des collègues ou cellules internes, pas aux candidats)
    if (this.selectedEmailBankTemplate() === "demande_nav_tan") {
      return t('subject.bank_nav_tan', "Demande de numéro de NAV/TAN et création de compte claims X - CSPN partie 1");
    }
    if (this.selectedEmailBankTemplate() === "demande_autorisation_cspn") {
      return t('subject.bank_cspn', "Demande d’autorisation pour un CSPN");
    }
    if (this.selectedEmailBankTemplate() === "demande_sdpm_conjoint_militaire") {
      return t('subject.bank_sdpm', "Demande SDPM pour conjoint militaire");
    }
    if (this.selectedEmailBankTemplate() === "verification_dossier_cadet") {
      return t('subject.bank_cadet', "(Vérification Dossier Cadet)");
    }

    if (this.selectedEmailBankTemplate() === "inapte_medical_omr") {
      return getInapteMedicalSubject.call(this);
    }

    // 2. Tous les courriels destinés aux candidats (dossier conforme, rejets de tâches, offres, avis de fermeture, etc.)
    return t('subject.candidate_email_outlook', candidateDefaultSubject);
  }
