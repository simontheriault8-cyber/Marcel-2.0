/**
 * Générateur pour le courriel et la note de dossier d'inaptitude médicale OMR (Volet GD)
 */

export function getCandidateLastName(fullName: string): string {
  const trimmed = (fullName || '').trim();
  if (!trimmed) return '';
  if (trimmed.includes(',')) {
    return trimmed.split(',')[0].trim();
  }
  const parts = trimmed.split(/\s+/);
  return parts[parts.length - 1];
}

export function getInapteMedicalGreetingFr(gender: string, fullName: string): string {
  const lastName = getCandidateLastName(fullName);
  if (gender === 'F') {
    return lastName ? `Bonjour Mme ${lastName},` : 'Bonjour Madame,';
  }
  if (gender === 'M') {
    return lastName ? `Bonjour M. ${lastName},` : 'Bonjour Monsieur,';
  }
  return lastName ? `Bonjour Mme/M. ${lastName},` : 'Bonjour,';
}

export function getInapteMedicalGreetingEn(gender: string, fullName: string): string {
  const lastName = getCandidateLastName(fullName);
  if (gender === 'F') {
    return lastName ? `Hello Ms. ${lastName},` : 'Hello,';
  }
  if (gender === 'M') {
    return lastName ? `Hello Mr. ${lastName},` : 'Hello,';
  }
  return lastName ? `Hello Ms./Mr. ${lastName},` : 'Hello,';
}

export function getInapteMedicalEmailPlainFr(this: any): string {
  const gender = this.inapteMedicalGender?.() || '';
  const fullName = this.inapteMedicalName?.() || '';
  const greeting = getInapteMedicalGreetingFr(gender, fullName);
  const patientWord = gender === 'F' ? 'patiente' : (gender === 'M' ? 'patient' : 'patient(e)');

  return `${greeting}\n\n` +
    `Suite à l’évaluation de votre condition médicale pour un enrôlement au sein des Forces armées canadiennes, il a été déterminé par notre personnel médical certifié que vous ne rencontrez malheureusement pas les exigences en cette matière. Puisque cette détermination relève du domaine médical, le personnel du centre de recrutement n’a pas les qualifications requises pour en discuter avec vous, et ces informations confidentielles ne sont pas disponibles. Par conséquent, vous allez recevoir dans les prochaines semaines une lettre explicative du bureau de l’Officier médical du recrutement (OMR) confirmant cette évaluation et vous expliquant en détail les motifs qui ont poussé le médecin militaire à prendre cette décision. Dans cette lettre, on vous expliquera également quoi faire advenant que vous souhaitiez discuter, ou contester cette décision. Ce processus est rigoureux, mais nécessaire étant donné la nature sensible des données liées à la condition médicale, nous vous prions d’être ${patientWord} dans l’attente de la réception de cette lettre.\n\n` +
    `Nous vous remercions de votre intérêt à servir dans les Forces armées canadiennes et nous vous souhaitons bonne chance dans vos projets futurs.`;
}

export function getInapteMedicalEmailPlainEn(this: any): string {
  const gender = this.inapteMedicalGender?.() || '';
  const fullName = this.inapteMedicalName?.() || '';
  const greeting = getInapteMedicalGreetingEn(gender, fullName);

  return `${greeting}\n\n` +
    `Following the evaluation of your medical condition for enrolment in the Canadian Armed Forces, it was determined by our certified medical personnel that you unfortunately do not meet the requirements in this regard. As this determination falls within the medical domain, recruiting centre personnel do not have the required qualifications to discuss this with you, and this confidential information is not available. Consequently, you will receive an explanatory letter in the coming weeks from the Recruiting Medical Officer (RMO) office confirming this evaluation and explaining in detail the reasons that led the military doctor to make this decision. In this letter, it will also be explained what steps to take should you wish to discuss or appeal this decision. This process is rigorous but necessary given the sensitive nature of data related to medical conditions; we kindly ask you to be patient while awaiting the receipt of this letter.\n\n` +
    `We thank you for your interest in serving in the Canadian Armed Forces and wish you the best of luck in your future endeavours.`;
}

export function getInapteMedicalEmailSectionHtmlFr(this: any): string {
  const gender = this.inapteMedicalGender?.() || '';
  const fullName = this.inapteMedicalName?.() || '';
  const greeting = getInapteMedicalGreetingFr(gender, fullName);
  const patientWord = gender === 'F' ? 'patiente' : (gender === 'M' ? 'patient' : 'patient(e)');

  return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${greeting}</p>` +
    `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Suite à l’évaluation de votre condition médicale pour un enrôlement au sein des Forces armées canadiennes, il a été déterminé par notre personnel médical certifié que vous ne rencontrez malheureusement pas les exigences en cette matière. Puisque cette détermination relève du domaine médical, le personnel du centre de recrutement n’a pas les qualifications requises pour en discuter avec vous, et ces informations confidentielles ne sont pas disponibles. Par conséquent, vous allez recevoir dans les prochaines semaines une lettre explicative du bureau de l’Officier médical du recrutement (OMR) confirmant cette évaluation et vous expliquant en détail les motifs qui ont poussé le médecin militaire à prendre cette décision. Dans cette lettre, on vous expliquera également quoi faire advenant que vous souhaitiez discuter, ou contester cette décision. Ce processus est rigoureux, mais nécessaire étant donné la nature sensible des données liées à la condition médicale, nous vous prions d’être ${patientWord} dans l’attente de la réception de cette lettre.</p>` +
    `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Nous vous remercions de votre intérêt à servir dans les Forces armées canadiennes et nous vous souhaitons bonne chance dans vos projets futurs.</p>`;
}

export function getInapteMedicalEmailSectionHtmlEn(this: any): string {
  const gender = this.inapteMedicalGender?.() || '';
  const fullName = this.inapteMedicalName?.() || '';
  const greeting = getInapteMedicalGreetingEn(gender, fullName);

  return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${greeting}</p>` +
    `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Following the evaluation of your medical condition for enrolment in the Canadian Armed Forces, it was determined by our certified medical personnel that you unfortunately do not meet the requirements in this regard. As this determination falls within the medical domain, recruiting centre personnel do not have the required qualifications to discuss this with you, and this confidential information is not available. Consequently, you will receive an explanatory letter in the coming weeks from the Recruiting Medical Officer (RMO) office confirming this evaluation and explaining in detail the reasons that led the military doctor to make this decision. In this letter, it will also be explained what steps to take should you wish to discuss or appeal this decision. This process is rigorous but necessary given the sensitive nature of data related to medical conditions; we kindly ask you to be patient while awaiting the receipt of this letter.</p>` +
    `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">We thank you for your interest in serving in the Canadian Armed Forces and wish you the best of luck in your future endeavours.</p>`;
}

export function getInapteMedicalEmailPlain(this: any): string {
  const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
  const fr = getInapteMedicalEmailPlainFr.call(this);
  const en = getInapteMedicalEmailPlainEn.call(this);
  const sigFr = this.getSignatureFr();
  const sigEn = this.getSignatureEn();

  if (isEn) {
    return `Un message en français suivra.\n\n${en}\n\n${sigEn}\n\n______________________________________________________________________________\n\n${fr}\n\n${sigFr}`;
  }
  return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
}

export function getInapteMedicalEmailHtml(this: any): string {
  const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
  const fr = getInapteMedicalEmailSectionHtmlFr.call(this);
  const en = getInapteMedicalEmailSectionHtmlEn.call(this);
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

export function getInapteMedicalSubject(this: any): string {
  const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
  const name = this.inapteMedicalName?.()?.trim() || '';
  const alpha = this.inapteMedicalAlpha?.()?.trim() || '';
  const suffix = [name, alpha].filter(Boolean).join(' ');

  if (isEn) {
    return suffix ? `Information regarding your file - ${suffix}` : `Information regarding your file`;
  }
  return suffix ? `Information sur votre dossier - ${suffix}` : `Information sur votre dossier`;
}

export function getInapteMedicalNote(this: any): string {
  const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
  const gender = this.inapteMedicalGender?.() || '';

  if (isEn) {
    return this.i18n?.t
      ? this.i18n.t('regNotes.inapteMedicalOmr')
      : "Email sent informing the applicant that they have been found medically unfit and explaining that all details of the decision will be explained in the RMO letter.";
  }
  if (gender === 'F') {
    return this.i18n?.t
      ? this.i18n.t('regNotes.inapteMedicalOmrF')
      : "Courriel envoyé informant la postulante qu'elle a été jugée inapte médicalement et expliquant que tous les détails de la décision prise seront expliqués dans la lettre de RMO.";
  }
  return this.i18n?.t
    ? this.i18n.t('regNotes.inapteMedicalOmrM')
    : "Courriel envoyé informant le postulant qu'il a été jugé inapte médicalement et expliquant que tous les détails de la décision prise seront expliqués dans la lettre de RMO.";
}
