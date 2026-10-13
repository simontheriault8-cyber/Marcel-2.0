import { Injectable } from "@angular/core";
import { RecruitmentCenter } from "./jobs-data";

@Injectable({
  providedIn: "root",
})
export class EmailBankService {
  // Tentative de communication pour offre d'emploi (Volet GD)
  getTentativeOffreGdSectionPlainFr(): string {
    return `Bonjour,\n\nNous avons tenté de vous joindre par téléphone afin de vous faire une offre d’emploi. Veuillez nous rappeler le plus rapidement possible.\n\nSi vous connaissez le nom et le poste de votre gestionnaire de dossier, vous pouvez le contacter directement.\n\nDans le cas contraire, veuillez communiquer avec le centre de recrutement en charge de votre dossier à l’intérieur des heures d’ouverture.\n\nMerci et au plaisir de vous parler.`;
  }

  getTentativeOffreGdSectionPlainEn(): string {
    return `Hello,\n\nWe attempted to reach you by phone to make you a job offer. Please call us back as soon as possible.\n\nIf you know the name and extension of your file manager, you can contact them directly.\n\nOtherwise, please contact the recruiting centre in charge of your file during business hours.\n\nThank you and we look forward to speaking with you.`;
  }

  getTentativeOffreGdEmailPlain(sigFr: string, sigEn: string): string {
    const fr = this.getTentativeOffreGdSectionPlainFr();
    const en = this.getTentativeOffreGdSectionPlainEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getTentativeOffreGdSectionHtmlFr(): string {
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Nous avons tenté de vous joindre par téléphone afin de vous faire une offre d’emploi. Veuillez nous rappeler le plus rapidement possible.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Si vous connaissez le nom et le poste de votre gestionnaire de dossier, vous pouvez le contacter directement.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Dans le cas contraire, veuillez communiquer avec le centre de recrutement en charge de votre dossier à l’intérieur des heures d’ouverture.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Merci et au plaisir de vous parler.</p>`;
  }

  getTentativeOffreGdSectionHtmlEn(): string {
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">We attempted to reach you by phone to make you a job offer. Please call us back as soon as possible.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">If you know the name and extension of your file manager, you can contact them directly.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Otherwise, please contact the recruiting centre in charge of your file during business hours.</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Thank you and we look forward to speaking with you.</p>`;
  }

  getTentativeOffreGdEmailHtml(sigFr: string, sigEn: string): string {
    const fr = this.getTentativeOffreGdSectionHtmlFr();
    const en = this.getTentativeOffreGdSectionHtmlEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>`;
    html += fr;
    html += `<p>${sigFr}</p>`;
    html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
    html += en;
    html += `<p>${sigEn}</p>`;
    html += `</div>`;
    return html;
  }

  // Vérification Dossier Cadet (Volet GD)
  getVerificationCadetEmailPlain(sigFr: string): string {
    return `Bonjour,\n\nPourriez-vous me confirmer si le postulant suivant a un matricule attribué comme cadet et si possible avoir sa fiche de renseignements de cadet?\n\nNom : \nPrénom : \nDDN : \n\n${sigFr}`;
  }

  getVerificationCadetEmailHtml(sigFr: string): string {
    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Pourriez-vous me confirmer si le postulant suivant a un matricule attribué comme cadet et si possible avoir sa fiche de renseignements de cadet?</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Nom : <br>Prénom : <br>DDN : </p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">${sigFr}</p>` +
      `</div>`;
  }

  // Bris de bail et entreposage (Volet GD)
  getBrisBailEntreposageSectionPlainFr(): string {
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

  getBrisBailEntreposageSectionPlainEn(): string {
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

  getBrisBailEntreposageEmailPlain(sigFr: string, sigEn: string): string {
    const fr = this.getBrisBailEntreposageSectionPlainFr();
    const en = this.getBrisBailEntreposageSectionPlainEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getBrisBailEntreposageSectionHtmlFr(): string {
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

  getBrisBailEntreposageSectionHtmlEn(): string {
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

  getBrisBailEntreposageEmailHtml(sigFr: string, sigEn: string): string {
    const fr = this.getBrisBailEntreposageSectionHtmlFr();
    const en = this.getBrisBailEntreposageSectionHtmlEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>`;
    html += fr;
    html += `<p>${sigFr}</p>`;
    html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
    html += en;
    html += `<p>${sigEn}</p>`;
    html += `</div>`;
    return html;
  }

  // Demande NAV/TAN & Claims X - CSPN partie 1 (Volet GD)
  getDemandeNavTanEmailPlain(sigFr: string): string {
    return `Bonjour,\n\nPourriez-vous nous donner un numéro de NAV/TAN pour le postulant suivant svp:\n\nSN: XXXXXXXX\nRANK : APPL/POST CIV\nFIRST NAME : XXXXXXX\nNAME : XXXXXXX\nPON :  281(QUEBEC)\nUIC : 0202(QC)\nPROV OF EMPLOYMENT :  QC\nDate de CSPN : jour-au jour -mois-année\n\n${sigFr}`;
  }

  getDemandeNavTanEmailHtml(sigFr: string): string {
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
  getDemandeAutorisationCspnEmailPlain(sigFr: string): string {
    return `Bonjour,\n\nVoici une demande d’autorisation pour un CSPN.\n\nAlpha : XXX\nNM : XXX\nNom : XXX\nPrénom : XXX\nMétier : XXX\n\n${sigFr}`;
  }

  getDemandeAutorisationCspnEmailHtml(sigFr: string): string {
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
  getDocumentsConjointDeFaitSectionPlainFr(): string {
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

  getDocumentsConjointDeFaitSectionPlainEn(): string {
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

  getDocumentsConjointDeFaitEmailPlain(sigFr: string, sigEn: string): string {
    const fr = this.getDocumentsConjointDeFaitSectionPlainFr();
    const en = this.getDocumentsConjointDeFaitSectionPlainEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getDocumentsConjointDeFaitSectionHtmlFr(): string {
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

  getDocumentsConjointDeFaitSectionHtmlEn(): string {
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

  getDocumentsConjointDeFaitEmailHtml(sigFr: string, sigEn: string): string {
    const fr = this.getDocumentsConjointDeFaitSectionHtmlFr();
    const en = this.getDocumentsConjointDeFaitSectionHtmlEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>`;
    html += fr;
    html += `<p>${sigFr}</p>`;
    html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
    html += en;
    html += `<p>${sigEn}</p>`;
    html += `</div>`;
    return html;
  }

  // Demande SDPM pour conjoint militaire (Volet GD)
  getDemandeSdpmConjointMilitaireEmailPlain(sigFr: string): string {
    return `Bonjour,\n\nLe traitement aurait besoin de SDPM/MPRR pour le membre suivant :\n\nMatricule : XXXXX\nPrénom : XXXXX\nNOM : XXXXX\nDate de naissance : XXXXX\nF rég\n\n${sigFr}`;
  }

  getDemandeSdpmConjointMilitaireEmailHtml(sigFr: string): string {
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
  getTestEsomConfirmationEmailPlain(center: RecruitmentCenter, sigFr: string): string {
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

  getTestEsomConfirmationEmailHtml(center: RecruitmentCenter, sigFr: string): string {
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

  // Rappel Cérémonie
  getRappelCeremonieTeamsPlainFr(city: string): string {
    if (city === 'Montréal') {
      return "Voici le lien Teams pour les invités à distance : Cérémonie d'assermentation 27 août 2026 | Rencontre-Participation | Microsoft Teams : https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn";
    } else if (city === 'Québec') {
      return "Voici le lien Teams pour les invités à distance : https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U";
    }
    return "";
  }

  getRappelCeremonieTeamsPlainEn(city: string): string {
    if (city === 'Montréal') {
      return "Here is the Teams link for remote guests: Cérémonie d'assermentation 27 août 2026 | Rencontre-Participation | Microsoft Teams : https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn";
    } else if (city === 'Québec') {
      return "Here is the Teams link for remote guests: https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U";
    }
    return "";
  }

  getRappelCeremonieTeamsHtmlFr(city: string): string {
    if (city === 'Montréal') {
      return `Voici le lien Teams pour les invités à distance : <a href="https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn" target="_blank" style="color: #2563eb; text-decoration: underline;">Cérémonie d'assermentation 27 août 2026 | Rencontre-Participation | Microsoft Teams</a>`;
    } else if (city === 'Québec') {
      return `Voici le lien Teams pour les invités à distance : <a href="https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U</a>`;
    }
    return "";
  }

  getRappelCeremonieTeamsHtmlEn(city: string): string {
    if (city === 'Montréal') {
      return `Here is the Teams link for remote guests: <a href="https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn" target="_blank" style="color: #2563eb; text-decoration: underline;">Cérémonie d'assermentation 27 août 2026 | Rencontre-Participation | Microsoft Teams</a>`;
    } else if (city === 'Québec') {
      return `Here is the Teams link for remote guests: <a href="https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U</a>`;
    }
    return "";
  }

  getRappelCeremonieSectionPlainFr(
    city: string,
    address: string,
    date: string,
    heurePostulant: string,
    heureInvites: string,
    ralliementChecked: boolean
  ): string {
    const isMontreal = city === 'Montréal';
    const d = date || '___________________';

    const blocks: string[] = [
      `Bonjour,`,
      `Ce message est un rappel pour votre cérémonie d'assermentation.`,
      `Date : ${d}\nHeure : ${heurePostulant} - veuillez arriver 15 minutes à l'avance\nLieu : ${address}\nHeure d'arrivée des invités : ${heureInvites}`
    ];

    if (!isMontreal) {
      blocks.push(`Vous aurez droit à 2 invités sur place.`);
    }

    const teamsLine = this.getRappelCeremonieTeamsPlainFr(city).trim();
    if (teamsLine) {
      blocks.push(teamsLine);
    }

    blocks.push(`Si vous êtes dans une Union de fait, votre conjoint ou conjointe doit être présent avec vous dès votre arrivé au centre de recrutement la journée de votre cérémonie d'assermentation.`);
    blocks.push(`Veuillez apporter une pièce d'identité valide avec photo (ex: permis de conduire, carte d'assurance maladie, etc).`);

    if (ralliementChecked) {
      blocks.push(`Voici le lien vers vos instructions de ralliement pour l’École de leadership et de recrues des Forces canadiennes (ELRFC) :\nInstructions de ralliement (QMB/QMBO) : https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf`);
    }

    blocks.push(`Si jamais vous êtes dans l'impossibilité de vous présenter, veuillez-nous en aviser le plus rapidement possible en répondant à ce courriel.`);
    blocks.push(`Si vous ne vous présentez pas sans nous en aviser, vous risquez la fermeture de votre dossier.`);
    blocks.push(`Si vous avez des questions, n'hésitez pas à me faire suivre un courriel.`);
    blocks.push(`Merci, bonne journée !`);

    return blocks.join('\n\n');
  }

  getRappelCeremonieSectionPlainEn(
    city: string,
    address: string,
    date: string,
    heurePostulant: string,
    heureInvites: string,
    ralliementChecked: boolean
  ): string {
    const isMontreal = city === 'Montréal';
    const d = date || '___________________';

    const blocks: string[] = [
      `Hello,`,
      `This message is a reminder for your swearing-in ceremony.`,
      `Date: ${d}\nTime: ${heurePostulant} - please arrive 15 minutes in advance\nLocation: ${address}\nGuest arrival time: ${heureInvites}`
    ];

    if (!isMontreal) {
      blocks.push(`You will be allowed 2 guests on site.`);
    }

    const teamsLine = this.getRappelCeremonieTeamsPlainEn(city).trim();
    if (teamsLine) {
      blocks.push(teamsLine);
    }

    blocks.push(`If you are in a common-law relationship, your spouse or common-law partner must be present with you upon arrival at the recruitment centre on the day of your swearing-in ceremony.`);
    blocks.push(`Please bring a valid photo ID (e.g. driver's licence, health insurance card, etc.).`);

    if (ralliementChecked) {
      blocks.push(`Here is the link to your joining instructions for the Canadian Forces Leadership and Recruit School (CFLRS):\nJoining Instructions (BMQ/BMOQ) : https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf`);
    }

    blocks.push(`If you are unable to attend, please notify us as soon as possible by replying to this email.`);
    blocks.push(`If you fail to attend without notifying us, you risk having your file closed.`);
    blocks.push(`If you have any questions, please do not hesitate to email me.`);
    blocks.push(`Thank you, have a nice day!`);

    return blocks.join('\n\n');
  }

  getRappelCeremonieSectionHtmlFr(
    city: string,
    address: string,
    date: string,
    heurePostulant: string,
    heureInvites: string,
    ralliementChecked: boolean
  ): string {
    const isMontreal = city === 'Montréal';
    const d = date || '___________________';

    const pInvites = !isMontreal ? `<p>Vous aurez droit à 2 invités sur place.</p>` : '';
    const teamsHtml = this.getRappelCeremonieTeamsHtmlFr(city);
    const pTeams = teamsHtml ? `<p>${teamsHtml}</p>` : '';
    const pUnion = `<p>Si vous êtes dans une Union de fait, votre conjoint ou conjointe doit être présent avec vous dès votre arrivé au centre de recrutement la journée de votre cérémonie d'assermentation.</p>`;
    const pRalliement = ralliementChecked
      ? `<p>Voici le lien vers vos instructions de ralliement pour l’École de leadership et de recrues des Forces canadiennes (ELRFC) :<br><a href="https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instructions de ralliement (QMB/QMBO)</a></p>`
      : '';

    const htmlParts = [
      `<p>Bonjour,</p>`,
      `<p>Ce message est un rappel pour votre cérémonie d'assermentation.</p>`,
      `<ul style="margin-top: 10px; margin-bottom: 15px; padding-left: 20px;">
  <li><strong>Date :</strong> ${d}</li>
  <li><strong>Heure :</strong> ${heurePostulant} - veuillez arriver 15 minutes à l'avance</li>
  <li><strong>Lieu :</strong> ${address}</li>
  <li><strong>Heure d'arrivée des invités :</strong> ${heureInvites}</li>
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

  getRappelCeremonieSectionHtmlEn(
    city: string,
    address: string,
    date: string,
    heurePostulant: string,
    heureInvites: string,
    ralliementChecked: boolean
  ): string {
    const isMontreal = city === 'Montréal';
    const d = date || '___________________';

    const pInvites = !isMontreal ? `<p>You will be allowed 2 guests on site.</p>` : '';
    const teamsHtml = this.getRappelCeremonieTeamsHtmlEn(city);
    const pTeams = teamsHtml ? `<p>${teamsHtml}</p>` : '';
    const pUnion = `<p>If you are in a common-law relationship, your spouse or common-law partner must be present with you upon arrival at the recruitment centre on the day of your swearing-in ceremony.</p>`;
    const pRalliement = ralliementChecked
      ? `<p>Here is the link to your joining instructions for the Canadian Forces Leadership and Recruit School (CFLRS):<br><a href="https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Joining Instructions (BMQ/BMOQ)</a></p>`
      : '';

    const htmlParts = [
      `<p>Hello,</p>`,
      `<p>This message is a reminder for your swearing-in ceremony.</p>`,
      `<ul style="margin-top: 10px; margin-bottom: 15px; padding-left: 20px;">
  <li><strong>Date:</strong> ${d}</li>
  <li><strong>Time:</strong> ${heurePostulant} - please arrive 15 minutes in advance</li>
  <li><strong>Location:</strong> ${address}</li>
  <li><strong>Guest arrival time:</strong> ${heureInvites}</li>
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

  getRappelCeremonieEmailPlain(
    city: string,
    address: string,
    date: string,
    heurePostulant: string,
    heureInvites: string,
    ralliementChecked: boolean,
    sigFr: string,
    sigEn: string
  ): string {
    const fr = this.getRappelCeremonieSectionPlainFr(city, address, date, heurePostulant, heureInvites, ralliementChecked);
    const en = this.getRappelCeremonieSectionPlainEn(city, address, date, heurePostulant, heureInvites, ralliementChecked);
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getRappelCeremonieEmailHtml(
    city: string,
    address: string,
    date: string,
    heurePostulant: string,
    heureInvites: string,
    ralliementChecked: boolean,
    sigHtmlFr: string,
    sigHtmlEn: string
  ): string {
    const fr = this.getRappelCeremonieSectionHtmlFr(city, address, date, heurePostulant, heureInvites, ralliementChecked);
    const en = this.getRappelCeremonieSectionHtmlEn(city, address, date, heurePostulant, heureInvites, ralliementChecked);
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    html += `<p><strong>English message will follow.</strong></p>`;
    html += fr;
    html += `<p>${sigHtmlFr}</p>`;
    html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
    html += en;
    html += `<p>${sigHtmlEn}</p>`;
    html += `</div>`;
    return html;
  }
}
