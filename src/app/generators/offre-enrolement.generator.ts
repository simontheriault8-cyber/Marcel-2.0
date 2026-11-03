import {
  TEAMS_CEREMONY_URL_MS,
  TEAMS_CEREMONY_URL_LIVE,
  DRESS_CODE_EXAMPLE_URL,
  NEXT_OF_KIN_FORM_URL,
  EMERGENCY_CONTACT_FORM_URL,
  MEMORIAL_CROSS_FORM_URL,
  getJoiningInstructionsQmbUrl,
  getCommonLawInstructionUrl,
  getSecurityScreeningFormUrl,
  getBeneficiaryDesignationUrl,
} from "../data/app-links.data";

export function getOffreFormulairesSupplementairesPlain(this: any, lang: 'fr' | 'en'): string {
    if (!this.hasAnyOffreFormulairesSupplementaires()) {
      return '';
    }

    let txt = '';
    if (lang === 'fr') {
      txt += "Et voici des liens vers des formulaires supplémentaires que vous devez remplir et me renvoyer par courriel.\n";
      if (this.offreFormulairePpp()) {
        txt += `• Identification des plus proches parents : ${NEXT_OF_KIN_FORM_URL}\n`;
      }
      if (this.offreFormulairePcu()) {
        txt += `• Personnes à contacter en cas d'urgence : ${EMERGENCY_CONTACT_FORM_URL}\n`;
      }
      if (this.offreFormulaireCroixSouvenir()) {
        txt += `• Désignation des récipiendaires de la Croix du souvenir : ${MEMORIAL_CROSS_FORM_URL}\n`;
      }
      if (this.offreFormulaireBeneficiaire()) {
        txt += `• Désignation ou changement de bénéficiaire : ${getBeneficiaryDesignationUrl(false)}\n`;
      }
      txt += "\n";
    } else {
      txt += "And here are links to additional forms that you must complete and return to me by email.\n";
      if (this.offreFormulairePpp()) {
        txt += `• Next of Kin Identification : ${NEXT_OF_KIN_FORM_URL}\n`;
      }
      if (this.offreFormulairePcu()) {
        txt += `• Emergency Contact Notification : ${EMERGENCY_CONTACT_FORM_URL}\n`;
      }
      if (this.offreFormulaireCroixSouvenir()) {
        txt += `• Designation of Memorial Cross Recipients : ${MEMORIAL_CROSS_FORM_URL}\n`;
      }
      if (this.offreFormulaireBeneficiaire()) {
        txt += `• Naming or Substitution of a Beneficiary : ${getBeneficiaryDesignationUrl(true)}\n`;
      }
      txt += "\n";
    }
    return txt;
  }

export function getOffreFormulairesSupplementairesHtml(this: any, lang: 'fr' | 'en'): string {
    if (!this.hasAnyOffreFormulairesSupplementaires()) {
      return '';
    }

    let html = '';
    if (lang === 'fr') {
      html += `<p style="margin-top: 10px; margin-bottom: 6px;">Et voici des liens vers des formulaires supplémentaires que vous devez remplir et me renvoyer par courriel.</p>`;
      html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
      if (this.offreFormulairePpp()) {
        html += `<li><a href="${NEXT_OF_KIN_FORM_URL}" target="_blank" style="color: #2563eb; text-decoration: underline;">Identification des plus proches parents</a></li>`;
      }
      if (this.offreFormulairePcu()) {
        html += `<li><a href="${EMERGENCY_CONTACT_FORM_URL}" target="_blank" style="color: #2563eb; text-decoration: underline;">Personnes à contacter en cas d'urgence</a></li>`;
      }
      if (this.offreFormulaireCroixSouvenir()) {
        html += `<li><a href="${MEMORIAL_CROSS_FORM_URL}" target="_blank" style="color: #2563eb; text-decoration: underline;">Désignation des récipiendaires de la Croix du souvenir</a></li>`;
      }
      if (this.offreFormulaireBeneficiaire()) {
        html += `<li><a href="${getBeneficiaryDesignationUrl(false)}" target="_blank" style="color: #2563eb; text-decoration: underline;">Désignation ou changement de bénéficiaire</a></li>`;
      }
      html += `</ul>`;
    } else {
      html += `<p style="margin-top: 10px; margin-bottom: 6px;">And here are links to additional forms that you must complete and return to me by email.</p>`;
      html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
      if (this.offreFormulairePpp()) {
        html += `<li><a href="${NEXT_OF_KIN_FORM_URL}" target="_blank" style="color: #2563eb; text-decoration: underline;">Next of Kin Identification</a></li>`;
      }
      if (this.offreFormulairePcu()) {
        html += `<li><a href="${EMERGENCY_CONTACT_FORM_URL}" target="_blank" style="color: #2563eb; text-decoration: underline;">Emergency Contact Notification</a></li>`;
      }
      if (this.offreFormulaireCroixSouvenir()) {
        html += `<li><a href="${MEMORIAL_CROSS_FORM_URL}" target="_blank" style="color: #2563eb; text-decoration: underline;">Designation of Memorial Cross Recipients</a></li>`;
      }
      if (this.offreFormulaireBeneficiaire()) {
        html += `<li><a href="${getBeneficiaryDesignationUrl(true)}" target="_blank" style="color: #2563eb; text-decoration: underline;">Naming or Substitution of a Beneficiary</a></li>`;
      }
      html += `</ul>`;
    }
    return html;
  }


export function getOfferFormattedNote(this: any): string {
    const isEn = this.i18n ? this.i18n.isEn() : false;
    const metier = this.offreMetier() || (isEn ? '189 Construction Engineering' : '189 génie de construction');
    
    const statutMapEn: Record<string, string> = {
      'célibataire': 'single',
      'marié(e)': 'married',
      'conjoint(e) de fait': 'common-law partner',
      'divorcé(e)': 'divorced',
      'séparé(e)': 'separated',
      'veuf/veuve': 'widowed'
    };
    const brisBailMapEn: Record<string, string> = {
      'Refus du post': 'Declined by applicant',
      'Accepté par le post': 'Accepted by applicant',
      'N/A': 'N/A'
    };
    const sermentMapEn: Record<string, string> = {
      'Serment': 'Oath',
      'Déclaration': 'Solemn declaration',
      'Serment RP': 'PR Oath',
      'Déclaration RP': 'PR solemn declaration'
    };
    const svcMilAntMapEn: Record<string, string> = {
      'Force régulière': 'Regular force',
      'Première réserve': 'Primary reserve',
      'Cadets / Rangers': 'Cadets / Rangers',
      'Armée étrangère': 'Foreign military',
      'N/A': 'N/A'
    };

    const rawStatut = this.noteStatutCivil() || 'célibataire';
    const statut = isEn ? (statutMapEn[rawStatut] || rawStatut) : rawStatut;
    
    const conjointOpt = this.noteConjoint() || 'N/A';
    const conjoint = conjointOpt === 'oui' ? (this.noteConjointTexte() || (isEn ? 'TO CONFIRM' : 'À CONFIRMER')) : (isEn && (conjointOpt === 'non' || conjointOpt === 'N/A') ? conjointOpt : conjointOpt);
    
    const count = parseInt(this.noteEnfantCount() || '0', 10);
    let enfant = 'N/A';
    if (!isNaN(count) && count > 0) {
      enfant = this.noteEnfantDetails()
        .map(c => `${c.sex} ${c.year}`)
        .join(', ');
    }

    const plaque = this.notePlaqueImm().trim() || (isEn ? 'To confirm' : 'À confirmer');
    const rawBrisBail = this.noteBrisBail() || 'N/A';
    const brisBail = isEn ? (brisBailMapEn[rawBrisBail] || (rawBrisBail === 'oui' ? 'Yes' : rawBrisBail === 'non' ? 'No' : rawBrisBail)) : rawBrisBail;

    const rawEntreposage = this.noteEntreposage() || 'N/A';
    const entreposage = isEn ? (brisBailMapEn[rawEntreposage] || (rawEntreposage === 'oui' ? 'Yes' : rawEntreposage === 'non' ? 'No' : rawEntreposage)) : rawEntreposage;

    const rawSerment = this.noteSermentDeclaration() || 'Serment';
    const serment = isEn ? (sermentMapEn[rawSerment] || rawSerment) : rawSerment;

    const inviteMilOpt = this.noteInviteMil() || 'N/A';
    const inviteMil = inviteMilOpt === 'oui' ? (this.noteInviteMilTexte() || (isEn ? 'TO CONFIRM' : 'À CONFIRMER')) : (isEn && inviteMilOpt === 'non' ? 'No' : inviteMilOpt);

    const rawSvcMilAnt = this.noteSvcMilAnt() || 'N/A';
    const svcMilAnt = isEn ? (svcMilAntMapEn[rawSvcMilAnt] || rawSvcMilAnt) : rawSvcMilAnt;

    const beneficiaire = this.noteBeneficiaire();
    const dateCourriel = this.getEffectiveNoteDateCourrielConfirmation();

    if (this.i18n) {
      let note = `${this.i18n.t('regNotes.offerAcceptedPrefix', { trade: metier })}\n`;
      note += `${isEn ? 'Status' : 'Statut'} : ${statut}\n`;
      note += `${isEn ? 'Spouse/Partner' : 'Conjoint'} : ${conjoint}\n`;
      note += `${isEn ? 'Children' : 'Enfant'} : ${enfant}\n`;
      note += `${isEn ? 'Licence plate' : 'Plaque IMM'} : ${plaque}\n`;
      note += `${isEn ? 'Lease cancellation' : 'Bris de bail'} : ${brisBail}\n`;
      note += `${isEn ? 'Storage' : 'Entreposage'} : ${entreposage}\n`;
      note += `${serment}\n`;
      note += `${isEn ? 'Military guest' : 'Invité mil'} : ${inviteMil}\n`;
      note += `${isEn ? 'Prior mil svc' : 'Svc Mil ant'} : ${svcMilAnt}\n`;
      note += `${isEn ? 'Beneficiary' : 'Bénéficiaire'} : ${beneficiaire}`;
      if (dateCourriel) {
        note += `\n${this.i18n.t('regNotes.offerConfirmedEmailSent', { date: dateCourriel })}`;
      }
      return note;
    }

    if (isEn) {
      let note = `Applicant accepts offer – ${metier}\n`;
      note += `Status : ${statut}\n`;
      note += `Spouse/Partner : ${conjoint}\n`;
      note += `Children : ${enfant}\n`;
      note += `Licence plate : ${plaque}\n`;
      note += `Lease cancellation : ${brisBail}\n`;
      note += `Storage : ${entreposage}\n`;
      note += `${serment}\n`;
      note += `Military guest : ${inviteMil}\n`;
      note += `Prior mil svc : ${svcMilAnt}\n`;
      note += `Beneficiary : ${beneficiaire}`;
      if (dateCourriel) {
        note += `\nConfirmation email sent to applicant on : ${dateCourriel}`;
      }
      return note;
    }

    let note = `Postulant accepte l’offre – ${metier}\n`;
    note += `Statut : ${statut}\n`;
    note += `Conjoint : ${conjoint}\n`;
    note += `Enfant : ${enfant}\n`;
    note += `Plaque IMM : ${plaque}\n`;
    note += `Bris de bail : ${brisBail}\n`;
    note += `Entreposage : ${entreposage}\n`;
    note += `${serment}\n`;
    note += `Invité mil : ${inviteMil}\n`;
    note += `Svc Mil ant : ${svcMilAnt}\n`;
    note += `Bénéficiaire : ${beneficiaire}`;
    if (dateCourriel) {
      note += `\nCourriel de confirmation envoyé au postulant le : ${dateCourriel}`;
    }

    return note;
  }

export function getOffreDateEnrolementFull(this: any, lang: 'fr' | 'en' = 'fr'): string {
    const raw = this.offreDateEnrolement().trim();
    const postulantTime = this.offreHeureArriveePostulant() || '8h00';
    const guestTime = this.offreHeureArriveeInvites() || (this.offreEtudesSubventionneesChecked() ? '9h45' : '10h00');
    
    if (lang === 'en') {
      if (!raw) {
        return `at ${postulantTime} (Guest arrival at ${guestTime})`;
      }
      return `${raw} at ${postulantTime} (Guest arrival at ${guestTime})`;
    }

    if (!raw) {
      return `à ${postulantTime} (Arrivée des invités à ${guestTime})`;
    }
    return `${raw} à ${postulantTime} (Arrivée des invités à ${guestTime})`;
  }

export function getOffreDateArriveeUniteFull(this: any): string {
    const raw = this.offreDateArriveeUnite().trim();
    if (!raw) {
      return 'au plus tard 16h00';
    }
    if (raw.includes('au plus tard')) {
      return raw;
    }
    return `${raw} au plus tard 16h00`;
  }

export function getOffreDatesCoursFull(this: any): string {
    const debut = this.offreDateCoursDebut().trim();
    const fin = this.offreDateCoursFin().trim();
    if (debut && fin) {
      return `Du ${debut} au ${fin}`;
    }
    if (debut) {
      return `À partir du ${debut}`;
    }
    if (fin) {
      return `Jusqu'au ${fin}`;
    }
    return '';
  }

export function getJourSemaineFr(this: any, dateStr: string): string {
    if (!dateStr || !dateStr.trim()) return '';
    const str = dateStr.trim();
    
    // 1. Try ISO or YYYY-MM-DD
    const isoMatch = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
      const d = new Date(parseInt(isoMatch[1], 10), parseInt(isoMatch[2], 10) - 1, parseInt(isoMatch[3], 10));
      if (!isNaN(d.getTime())) {
        const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        return days[d.getDay()];
      }
    }

    // 2. Try DD-MM-YYYY or DD/MM/YYYY
    const dmyMatch = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
    if (dmyMatch) {
      const d = new Date(parseInt(dmyMatch[3], 10), parseInt(dmyMatch[2], 10) - 1, parseInt(dmyMatch[1], 10));
      if (!isNaN(d.getTime())) {
        const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        return days[d.getDay()];
      }
    }

    // 3. Try "12 septembre 2026" or "12 sept 2026" or "12 sept. 2026"
    const monthsMap: Record<string, number> = {
      'janvier': 0, 'janv': 0, 'jan': 0,
      'février': 1, 'fevrier': 1, 'févr': 1, 'fevr': 1, 'fév': 1, 'fev': 1,
      'mars': 2, 'mar': 2,
      'avril': 3, 'avr': 3,
      'mai': 4,
      'juin': 5,
      'juillet': 6, 'juil': 6,
      'août': 7, 'aout': 7,
      'septembre': 8, 'sept': 8, 'sep': 8,
      'octobre': 9, 'oct': 9,
      'novembre': 10, 'nov': 10,
      'décembre': 11, 'decembre': 11, 'déc': 11, 'dec': 11
    };

    const textMatch = str.match(/(\d{1,2})\s+([a-zA-ZÀ-ÿ.]+)\s+(\d{4})/);
    if (textMatch) {
      const day = parseInt(textMatch[1], 10);
      const monthKey = textMatch[2].toLowerCase().replace('.', '');
      const year = parseInt(textMatch[3], 10);
      const monthIdx = monthsMap[monthKey];
      if (monthIdx !== undefined) {
        const d = new Date(year, monthIdx, day);
        if (!isNaN(d.getTime())) {
          const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
          return days[d.getDay()];
        }
      }
    }

    return '';
  }

export function getJourSemaineEn(this: any, dateStr: string): string {
    if (!dateStr || !dateStr.trim()) return '';
    const str = dateStr.trim();
    
    // 1. Try ISO or YYYY-MM-DD
    const isoMatch = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
      const d = new Date(parseInt(isoMatch[1], 10), parseInt(isoMatch[2], 10) - 1, parseInt(isoMatch[3], 10));
      if (!isNaN(d.getTime())) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[d.getDay()];
      }
    }

    // 2. Try DD-MM-YYYY or DD/MM/YYYY
    const dmyMatch = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
    if (dmyMatch) {
      const d = new Date(parseInt(dmyMatch[3], 10), parseInt(dmyMatch[2], 10) - 1, parseInt(dmyMatch[1], 10));
      if (!isNaN(d.getTime())) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[d.getDay()];
      }
    }

    // 3. Try "12 septembre 2026" or French/English month names
    const monthsMap: Record<string, number> = {
      'janvier': 0, 'janv': 0, 'jan': 0, 'january': 0,
      'février': 1, 'fevrier': 1, 'févr': 1, 'fevr': 1, 'fév': 1, 'fev': 1, 'february': 1, 'feb': 1,
      'mars': 2, 'mar': 2, 'march': 2,
      'avril': 3, 'avr': 3, 'april': 3, 'apr': 3,
      'mai': 4, 'may': 4,
      'juin': 5, 'june': 5, 'jun': 5,
      'juillet': 6, 'juil': 6, 'july': 6, 'jul': 6,
      'août': 7, 'aout': 7, 'august': 7, 'aug': 7,
      'septembre': 8, 'sept': 8, 'sep': 8, 'september': 8,
      'octobre': 9, 'oct': 9, 'october': 9,
      'novembre': 10, 'nov': 10, 'november': 10,
      'décembre': 11, 'decembre': 11, 'déc': 11, 'dec': 11, 'december': 11
    };

    const textMatch = str.match(/(\d{1,2})\s+([a-zA-ZÀ-ÿ.]+)\s+(\d{4})/);
    if (textMatch) {
      const day = parseInt(textMatch[1], 10);
      const monthKey = textMatch[2].toLowerCase().replace('.', '');
      const year = parseInt(textMatch[3], 10);
      const monthIdx = monthsMap[monthKey];
      if (monthIdx !== undefined) {
        const d = new Date(year, monthIdx, day);
        if (!isNaN(d.getTime())) {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return days[d.getDay()];
        }
      }
    }

    return '';
  }


export function getElementsManquantsBlocks(this: any, lang: 'fr' | 'en' = 'fr'):  {
    dateLimiteStr: string;
    elementsPlain: string;
    elementsHtmlList: string;
  } {
    const dateLimite = this.offreDateElementsManquants()?.trim();
    const dateLimiteStr = dateLimite ? ` ${dateLimite}` : '';
    const elementsText = this.offreElementsManquants() || '';
    const elementsList = elementsText.split('\n').map(e => e.trim()).filter(e => e.length > 0);
    
    let elementsPlain = '';
    elementsList.forEach((el, idx) => {
      let displayEl = el;
      if (lang === 'en') {
        if (displayEl.toLowerCase() === 'spécimen de chèque' || displayEl.toLowerCase() === 'specimen de cheque') {
          displayEl = 'Void cheque';
        }
      }
      elementsPlain += `${idx + 1}.\t${displayEl}\n`;
    });
    if (elementsPlain) {
      elementsPlain += '\n\n';
    }

    let elementsHtmlList = '<ol style="margin-top: 0; margin-bottom: 15px; padding-left: 20px;">';
    elementsList.forEach(el => {
      let displayEl = el;
      if (lang === 'en') {
        if (displayEl.toLowerCase() === 'spécimen de chèque' || displayEl.toLowerCase() === 'specimen de cheque') {
          displayEl = 'Void cheque';
        }
      }
      elementsHtmlList += `<li>${displayEl}</li>`;
    });
    elementsHtmlList += '</ol>';

    return { dateLimiteStr, elementsPlain, elementsHtmlList };
  }

export function getOffreOtaSectionPlainFr(this: any): string {
    const dateEnrol = this.offreDateEnrolement().trim() || 'jour / mois / année';
    const heurePostulant = this.offreHeureArriveePostulant() || '07h30';
    const heureInvites = this.offreHeureArriveeInvites() || '09h40';
    const lieuEnrol = 'Centre de recrutement des Forces Canadiennes, 1600 boulevard René-Lévesque Ouest, bureau 140, Montréal, QC, H3H 1P9';
    const rawDateArrivee = this.offreDateArriveeUnite().trim();
    const jourSemaine = this.getJourSemaineFr(rawDateArrivee) || 'jour de la semaine';
    const dateArriveeFormatted = rawDateArrivee || 'jour / mois / année';
    const unitObj = this.getUniteAffectationObj();
    const nomUnite = unitObj.nom || 'N/A';
    const serie = this.offreSerieCours().trim();
    const debut = this.offreDateCoursDebut().trim();
    const fin = this.offreDateCoursFin().trim();
    let datesCours = 'jour / mois / année au jour / mois / année';
    if (debut && fin) {
      datesCours = debut + ' au ' + fin;
    } else if (debut) {
      datesCours = debut;
    }

    const isUic3613 = this.isUic3613Selected();

    let txt = "Veuillez lire ce courriel - attentivement et au complet - afin d’être prêt pour votre enrôlement.\n\n";
    txt += "1. (Si vous ne l’avez pas déjà fourni) Transmettre (par courriel ou par téléphone) l’information suivante, le PLUS RAPIDEMENT POSSIBLE avant votre enrôlement :\n";
    txt += "• Votre numéro d’assurance social;\n";
    txt += "• Le numéro d’immatriculation de votre véhicule (si utilisé pour aller à St-Jean);\n";
    txt += "• Les coordonnées d’une personne à contacter en cas d'urgence: prénom et nom de famille / adresse du domicile incluant le code postal / numéro de téléphone / le lien que vous avez avec cette personne (père, mère, frère, sœur, conjoint(e), ami, etc.);\n";
    txt += "• Les coordonnées d’un bénéficiaire en cas de décès qui doit être âgé de 18 ans ou plus. Les informations que vous devez fournir au sujet de cette personne sont : prénom et nom de famille / adresse du domicile incluant le code postal / numéro de téléphone / date de naissance du bénéficiaire: le jour, le mois et l’année / le lien que vous avez avec cette personne (père, mère, frère, sœur, conjoint(e), ami, etc.);\n\n";

    txt += "2. Si cela s’applique, vous devez envoyer une photo des documents suivant en répondant à ce courriel:\n";
    txt += "• Certificats de naissance de votre conjoint(e), de vos enfants (copie originale);\n";
    txt += "• Mariage au Canada: certificat de mariage (copie originale);\n";
    txt += "• Mariage à l’étranger : certificat de mariage (copie originale) - doit être rédigé en français ou en anglais; s’il est écrit dans une autre langue, il doit être accompagné d’une traduction;\n\n";

    txt += "3. Instruction concernant les documents suivants :\n";
    txt += `• TBS 330-61-FR (https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf) : vous devez compléter ce formulaire et l'apporter à ${nomUnite}. Les sections du formulaire que vous devez remplir sont de B à K;\n`;
    txt += "• Union de fait_procédure (https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf) : si votre état civil est conjoint de fait, veuillez prendre connaissance de ce document;\n";
    txt += "• Exemples de tenue de ville (https://simontheriault8-cyber.github.io/Documents/Exemples%20-%20Tenue%20de%20ville.pdf), tenue vestimentaire pour la cérémonie;\n";
    if (isUic3613) {
      txt += "• Instruction_de_ralliement_ELRFC_FR (https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf) : instructions de ralliement pour l’École de leadership et de recrues des Forces canadiennes.\n";
    }
    txt += "\n";

    txt += "4. La journée de votre enrôlement, assurez-vous d’avoir en main les documents suivants :\n";
    txt += "• Spécimen de chèque;\n";
    txt += "• Pièce d’identité valide avec photo;\n";
    txt += "• Certificat de naissance ou de citoyenneté original de vous et de vos dépendants s’il y a lieu;\n";
    txt += "• Conjoint de fait: preuves d’adresses comme spécifié dans le document Word en pièce jointe;\n";
    txt += "• Carte d’assurance maladie provinciale de votre conjoint(e), de vos enfants (copie originale) s’il réside avec vous;\n";
    txt += "• Preuve officielle de la Cour si votre état civil est divorcé.\n\n";

    txt += "5. Photo le jour de l’enrôlement:\n";
    txt += "• Apportez votre appareil photo ou cellulaire si vous désirez avoir des photos de la cérémonie.\n\n";

    txt += "6. Information à communiquer si des événements particuliers se produisent avant la journée de votre enrôlement :\n";
    txt += "• Si vous recevez une contravention avant votre enrôlement, vous devez la payer et apporter la preuve de paiement. Si vous êtes dans l’impossibilité de la payer, veuillez nous contacter avant votre enrôlement;\n";
    txt += "• Si vous avez des obligations envers la justice qui n’ont pas été déclarées lors de votre entrevue avec le conseiller en carrière militaire;\n";
    txt += "• Si vous changez d’adresse ou d’état civil, vous devez nous aviser immédiatement afin que la bonne information se retrouve sur vos documents d’enrôlement;\n";
    txt += "• Si vous avez un changement au niveau médical, veuillez aviser la section médicale au poste 4909 le plus tôt possible avant votre enrôlement.\n\n";

    txt += "7. Informez-vous sur l’éthos des forces armées canadiennes en cliquant sur le lien suivant:\n";
    txt += "• Énoncé d'éthique de la Défense - Canada.ca (https://www.canada.ca/fr/ministere-defense-nationale/services/avantages-militaires/ethique-defense/publications-politiques/enonce.html)\n\n";

    txt += "Enrôlement administratif et assermentation:\n";
    txt += `Date: ${dateEnrol}\n`;
    txt += `Heure d’arrivée: ${heurePostulant}\n`;
    txt += `Heure de la présentation Teams pour les invités: ${heureInvites} via un lien qui sera envoyé le lundi de la semaine de votre enrôlement.\n`;
    txt += `Lieu: ${lieuEnrol}\n`;
    txt += "Habillement: tenue de ville propre\n\n";

    txt += "Unité d'affectation :\n";
    txt += `• Date d'arrivée : Vous devez vous présenter à ${nomUnite} le ${jourSemaine} : ${dateArriveeFormatted} au plus tard à 16h00.\n`;
    if (serie) {
      txt += `• Numéro du cours : ${serie}\n`;
      txt += `• Dates du cours : ${datesCours}\n`;
    }
    txt += "\n";

    txt += "Un retard lors de la journée de votre enrôlement n’est pas acceptable.\n\n";

    txt += "Pour toutes questions, veuillez contacter l’adresse courriel suivante \n";
    txt += ": appointments.montreal@forces.gc.ca\n\n";

    txt += "Merci de votre intérêt envers les Forces armées canadiennes,\n\n";
    txt += "«Veuillez prendre note que l’information que nous recueillons sert uniquement à des fins de sélection et d’emploi et elle ne peut être fournie qu’à d’autres employés autorisés du Ministère de la Défense nationale. En d’autres termes, il nous est interdit de divulguer sans votre consentement, des renseignements qui vous concernent à des gens comme des membres de votre famille, votre conjoint, votre employeur ou professeur. Si une personne non autorisée nous appelait pour poser des questions à votre sujet, nous lui dirions de communiquer avec vous. Par ailleurs, si vous désirez faire une demande d’accès à des renseignements personnels ou une demande de modification à des renseignements incorrects ou qui ne sont pas clairs, vous pouvez le faire par écrit en vertu de la Loi sur la protection des renseignements personnels.»\n\n";

    txt += this.getSignatureFr();

    return txt;
  }

export function getOffreOtaSectionPlainEn(this: any): string {
    const dateEnrol = this.offreDateEnrolement().trim() || 'day / month / year';
    const heurePostulant = this.offreHeureArriveePostulant() || '07h30';
    const heureInvites = this.offreHeureArriveeInvites() || '09h40';
    const lieuEnrol = 'Canadian Forces Recruiting Centre, 1600 René-Lévesque Boulevard West, Suite 140, Montreal, QC, H3H 1P9';
    const rawDateArrivee = this.offreDateArriveeUnite().trim();
    const jourSemaine = this.getJourSemaineEn(rawDateArrivee) || 'day of the week';
    const dateArriveeFormatted = rawDateArrivee || 'day / month / year';
    const unitObj = this.getUniteAffectationObj();
    const nomUnite = unitObj.nom || 'N/A';
    const serie = this.offreSerieCours().trim();
    const debut = this.offreDateCoursDebut().trim();
    const fin = this.offreDateCoursFin().trim();
    let datesCours = 'day / month / year to day / month / year';
    if (debut && fin) {
      datesCours = debut + ' to ' + fin;
    } else if (debut) {
      datesCours = debut;
    }

    const isUic3613 = this.isUic3613Selected();

    let txt = "Please read this email - carefully and in its entirety - in order to be prepared for your enrolment.\n\n";
    txt += "1. (If you have not already provided it) Submit (by email or phone) the following information, AS SOON AS POSSIBLE before your enrolment:\n";
    txt += "• Your Social Insurance Number;\n";
    txt += "• Your vehicle licence plate number (if used to travel to St-Jean);\n";
    txt += "• Contact information for an emergency contact: first and last name / home address including postal code / phone number / relationship to you (father, mother, brother, sister, spouse/partner, friend, etc.);\n";
    txt += "• Contact information for a beneficiary in the event of death who must be 18 years of age or older. The information you must provide about this person is: first and last name / home address including postal code / phone number / date of birth of the beneficiary: day, month, and year / relationship to you (father, mother, brother, sister, spouse/partner, friend, etc.);\n\n";

    txt += "2. If applicable, you must send a photo of the following documents by replying to this email:\n";
    txt += "• Birth certificates of your spouse/partner, your children (original copy);\n";
    txt += "• Marriage in Canada: marriage certificate (original copy);\n";
    txt += "• Marriage abroad: marriage certificate (original copy) - must be in French or English; if in another language, it must be accompanied by a certified translation;\n\n";

    txt += "3. Instructions regarding the following documents:\n";
    txt += `• 330-61-EN SSACF (https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf) : you must complete this form and bring it to ${nomUnite}. The sections of the form you must complete are from B to K;\n`;
    txt += "• Common-law_partership_procedure (https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf) : if your marital status is common-law, please review this document;\n";
    txt += "• Business casual examples (https://simontheriault8-cyber.github.io/Documents/Exemples%20-%20Tenue%20de%20ville.pdf), dress code for the ceremony;\n";
    if (isUic3613) {
      txt += "• CFLRS_Joining_Instructions_EN (https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf) : joining instructions for the Canadian Forces Leadership and Recruit School.\n";
    }
    txt += "\n";

    txt += "4. On the day of your enrolment, ensure you have the following documents in hand:\n";
    txt += "• Void cheque;\n";
    txt += "• Valid photo identification;\n";
    txt += "• Original birth certificate or citizenship certificate for yourself and your dependants if applicable;\n";
    txt += "• Common-law partner: proof of address as specified in the attached Word document;\n";
    txt += "• Provincial health insurance card of your spouse/partner, your children (original copy) if residing with you;\n";
    txt += "• Official court document if your marital status is divorced.\n\n";

    txt += "5. Photos on the day of enrolment:\n";
    txt += "• Bring your camera or mobile phone if you wish to take photos of the ceremony.\n\n";

    txt += "6. Information to report if specific events occur before your enrolment day:\n";
    txt += "• If you receive a ticket/fine before your enrolment, you must pay it and bring proof of payment. If you are unable to pay it, please contact us before your enrolment;\n";
    txt += "• If you have any legal obligations that were not declared during your interview with the military career counsellor;\n";
    txt += "• If you change your address or marital status, you must notify us immediately so that the correct information appears on your enrolment documents;\n";
    txt += "• If you experience any medical change, please notify the medical section at extension 4909 as soon as possible before your enrolment.\n\n";

    txt += "7. Learn about the Canadian Armed Forces ethos by clicking on the following link:\n";
    txt += "• Statement of Defence Ethics - Canada.ca (https://www.canada.ca/en/department-national-defence/services/benefits-military/defence-ethics/policies-publications/statement.html)\n\n";

    txt += "Administrative Enrolment and Swearing-in Ceremony:\n";
    txt += `Date: ${dateEnrol}\n`;
    txt += `Arrival time: ${heurePostulant}\n`;
    txt += `Teams presentation time for guests: ${heureInvites} via a link that will be sent on Monday of the week of your enrolment.\n`;
    txt += `Location: ${lieuEnrol}\n`;
    txt += "Dress: Clean business casual\n\n";

    txt += "Posting unit:\n";
    txt += `• Arrival date: You must report to ${nomUnite} on ${jourSemaine}: ${dateArriveeFormatted} by 16:00 at the latest.\n`;
    if (serie) {
      txt += `• Course number: ${serie}\n`;
      txt += `• Course dates: ${datesCours}\n`;
    }
    txt += "\n";

    txt += "Tardiness on the day of your enrolment is not acceptable.\n\n";

    txt += "For any questions, please contact the following email address:\n";
    txt += "appointments.montreal@forces.gc.ca\n\n";

    txt += "Thank you for your interest in the Canadian Armed Forces,\n\n";
    txt += "«Please note that the information we collect is used solely for selection and employment purposes and may only be provided to other authorized employees of the Department of National Defence. In other words, we are prohibited from disclosing, without your consent, information concerning you to individuals such as members of your family, your spouse, your employer, or your teacher. If an unauthorized person were to contact us with questions about you, we would instruct them to contact you directly. Furthermore, if you wish to submit a request for access to personal information or a request for correction of information that is incorrect or unclear, you may do so in writing pursuant to the Privacy Act.»\n\n";

    txt += this.getSignatureEn();

    return txt;
  }

export function getOffreOtaEmailPlain(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      const en = "Un message en français suivra.\n\n" + this.getOffreOtaSectionPlainEn();
      const fr = this.getOffreOtaSectionPlainFr();
      return `${en}\n\n______________________________________________________________________________\n\n${fr}`;
    }
    const fr = "English message will follow.\n\n" + this.getOffreOtaSectionPlainFr();
    const en = this.getOffreOtaSectionPlainEn();
    return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

export function getOffreOtaSectionHtmlFr(this: any): string {
    const dateEnrol = this.offreDateEnrolement().trim() || 'jour / mois / année';
    const heurePostulant = this.offreHeureArriveePostulant() || '07h30';
    const heureInvites = this.offreHeureArriveeInvites() || '09h40';
    const lieuEnrolHtml = 'Centre de recrutement des Forces Canadiennes, 1600 boulevard René-Lévesque Ouest, bureau 140, Montréal, QC, H3H 1P9';
    const rawDateArrivee = this.offreDateArriveeUnite().trim();
    const jourSemaine = this.getJourSemaineFr(rawDateArrivee) || 'jour de la semaine';
    const dateArriveeFormatted = rawDateArrivee || 'jour / mois / année';
    const unitObj = this.getUniteAffectationObj();
    const nomUnite = unitObj.nom || 'N/A';
    const serie = this.offreSerieCours().trim();
    const debut = this.offreDateCoursDebut().trim();
    const fin = this.offreDateCoursFin().trim();
    let datesCours = 'jour / mois / année au jour / mois / année';
    if (debut && fin) {
      datesCours = debut + ' au ' + fin;
    } else if (debut) {
      datesCours = debut;
    }

    let html = '';
    
    // Header surligné en jaune
    html += `<p style="margin-bottom: 12px;"><span style="background-color: #ffff00;">Veuillez lire ce courriel - attentivement et au complet - afin d’être prêt pour votre enrôlement.</span></p>`;

    // 1.
    html += `<p style="margin-bottom: 6px;"><strong>1. (Si vous ne l’avez pas déjà fourni) Transmettre (par courriel ou par téléphone) l’information suivante, le PLUS RAPIDEMENT POSSIBLE avant votre enrôlement :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Votre numéro d’assurance social;</li>`;
    html += `<li>Le numéro d’immatriculation de votre véhicule (si utilisé pour aller à St-Jean);</li>`;
    html += `<li>Les coordonnées d’une <u><strong>personne à contacter en cas d'urgence</strong></u>: prénom et nom de famille / adresse du domicile incluant le code postal / numéro de téléphone / le lien que vous avez avec cette personne (père, mère, frère, sœur, conjoint(e), ami, etc.);</li>`;
    html += `<li>Les coordonnées d’un <u><strong>bénéficiaire en cas de décès</strong></u> qui doit être âgé de 18 ans ou plus. Les informations que vous devez fournir au sujet de cette personne sont : prénom et nom de famille / adresse du domicile incluant le code postal / numéro de téléphone / date de naissance du bénéficiaire: le jour, le mois et l’année / le lien que vous avez avec cette personne (père, mère, frère, sœur, conjoint(e), ami, etc.);</li>`;
    html += `</ul>`;

    // 2.
    html += `<p style="margin-bottom: 6px;"><strong>2. Si cela s’applique, vous devez envoyer une <span style="background-color: #ffff00;">photo</span> des documents suivant en répondant à ce courriel:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Certificats de naissance de votre conjoint(e), de vos enfants (copie originale);</li>`;
    html += `<li>Mariage au Canada: certificat de mariage (copie originale);</li>`;
    html += `<li>Mariage à l’étranger : certificat de mariage (copie originale) - doit être rédigé en français ou en anglais; s’il est écrit dans une autre langue, il doit être accompagné d’une traduction;</li>`;
    html += `</ul>`;

    const isUic3613 = this.isUic3613Selected();

    // 3.
    html += `<p style="margin-bottom: 6px;"><strong>3. Instruction concernant les documents suivants :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">TBS 330-61-FR</a> : vous devez compléter ce formulaire et l'apporter à ${nomUnite}. Les sections du formulaire que vous devez remplir sont de B à K;</li>`;
    html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Union de fait_procédure</a> : si votre état civil est conjoint de fait, veuillez prendre connaissance de ce document;</li>`;
    html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Exemples%20-%20Tenue%20de%20ville.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Exemples de tenue de ville</a>, tenue vestimentaire pour la cérémonie;</li>`;
    if (isUic3613) {
      html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instruction_de_ralliement_ELRFC_FR</a> : instructions de ralliement pour l’École de leadership et de recrues des Forces canadiennes.</li>`;
    }
    html += `</ul>`;

    // 4.
    html += `<p style="margin-bottom: 6px;"><strong>4. La journée de votre enrôlement, assurez-vous d’avoir en main les documents suivants :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Spécimen de chèque;</li>`;
    html += `<li>Pièce d’identité valide avec photo;</li>`;
    html += `<li>Certificat de naissance ou de citoyenneté original de vous et de vos dépendants s’il y a lieu;</li>`;
    html += `<li>Conjoint de fait: preuves d’adresses comme spécifié dans le document Word en pièce jointe;</li>`;
    html += `<li>Carte d’assurance maladie provinciale de votre conjoint(e), de vos enfants (copie originale) s’il réside avec vous;</li>`;
    html += `<li>Preuve officielle de la Cour si votre état civil est divorcé.</li>`;
    html += `</ul>`;

    // 5.
    html += `<p style="margin-bottom: 6px;"><strong>5. Photo le jour de l’enrôlement:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Apportez votre appareil photo ou cellulaire si vous désirez avoir des photos de la cérémonie.</li>`;
    html += `</ul>`;

    // 6.
    html += `<p style="margin-bottom: 6px;"><strong>6. Information à communiquer si des événements particuliers se produisent avant la journée de votre enrôlement :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Si vous recevez une contravention avant votre enrôlement, vous devez la payer et apporter la preuve de paiement. Si vous êtes dans l’impossibilité de la payer, veuillez nous contacter avant votre enrôlement;</li>`;
    html += `<li>Si vous avez des obligations envers la justice qui n’ont pas été déclarées lors de votre entrevue avec le conseiller en carrière militaire;</li>`;
    html += `<li>Si vous changez d’adresse ou d’état civil, vous devez nous aviser immédiatement afin que la bonne information se retrouve sur vos documents d’enrôlement;</li>`;
    html += `<li>Si vous avez un changement au niveau médical, veuillez aviser la section médicale au poste 4909 le plus tôt possible avant votre enrôlement.</li>`;
    html += `</ul>`;

    // 7.
    html += `<p style="margin-bottom: 6px;"><strong>7. Informez-vous sur l’éthos des forces armées canadiennes en cliquant sur le lien suivant:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 16px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><a href="https://www.canada.ca/fr/ministere-defense-nationale/services/avantages-militaires/ethique-defense/publications-politiques/enonce.html" target="_blank" style="color: #2563eb; text-decoration: underline;">Énoncé d'éthique de la Défense - Canada.ca</a></li>`;
    html += `</ul>`;

    // Enrôlement administratif et assermentation
    html += `<p style="margin-bottom: 14px;"><u><strong>Enrôlement administratif et assermentation:</strong></u><br>`;
    html += `<strong>Date:</strong> ${dateEnrol}<br>`;
    html += `<strong>Heure d’arrivée:</strong> ${heurePostulant}<br>`;
    html += `<strong>Heure de la présentation Teams pour les invités:</strong> ${heureInvites} via un lien qui sera envoyé le lundi de la semaine de votre enrôlement.<br>`;
    html += `<strong>Lieu:</strong> ${lieuEnrolHtml}<br>`;
    html += `<strong>Habillement:</strong> tenue de ville propre</p>`;

    // Unité d'affectation
    html += `<p style="margin-bottom: 6px;"><u><strong>Unité d'affectation :</strong></u></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><strong>Date d'arrivée :</strong> Vous devez vous présenter à ${nomUnite} le <strong>${jourSemaine} : ${dateArriveeFormatted}</strong> au plus tard à 16h00.</li>`;
    if (serie) {
      html += `<li><strong>Numéro du cours :</strong> ${serie}</li>`;
      html += `<li><strong>Dates du cours :</strong> ${datesCours}</li>`;
    }
    html += `</ul>`;

    // Avertissements
    html += `<p style="margin-bottom: 14px;"><span style="background-color: #ffff00;">Un retard lors de la journée de votre enrôlement n’est pas acceptable.</span></p>`;

    // Contact
    html += `<p style="margin-bottom: 14px;">Pour toutes questions, veuillez contacter l’adresse courriel suivante<br>`;
    html += `: <a href="mailto:appointments.montreal@forces.gc.ca" style="color: #2563eb; text-decoration: underline;">appointments.montreal@forces.gc.ca</a></p>`;

    html += `<p style="margin-bottom: 12px;">Merci de votre intérêt envers les Forces armées canadiennes,</p>`;

    // Mention légale de confidentialité en rouge et italique
    html += `<p style="color: #c00000; font-style: italic; font-size: 10pt; line-height: 1.4; margin-bottom: 16px;">«Veuillez prendre note que l’information que nous recueillons sert uniquement à des fins de sélection et d’emploi et elle ne peut être fournie qu’à d’autres employés autorisés du Ministère de la Défense nationale. En d’autres termes, il nous est interdit de divulguer sans votre consentement, des renseignements qui vous concernent à des gens comme des membres de votre famille, votre conjoint, votre employeur ou professeur. Si une personne non autorisée nous appelait pour poser des questions à votre sujet, nous lui dirions de communiquer avec vous. Par ailleurs, si vous désirez faire une demande d’accès à des renseignements personnels ou une demande de modification à des renseignements incorrects ou qui ne sont pas clairs, vous pouvez le faire par écrit en vertu de la Loi sur la protection des renseignements personnels.»</p>`;

    // Signature
    html += `<p>` + this.getHtmlSignatureFr() + `</p>`;

    return html;
  }

export function getOffreOtaSectionHtmlEn(this: any): string {
    const dateEnrol = this.offreDateEnrolement().trim() || 'day / month / year';
    const heurePostulant = this.offreHeureArriveePostulant() || '07h30';
    const heureInvites = this.offreHeureArriveeInvites() || '09h40';
    const lieuEnrolHtml = 'Canadian Forces Recruiting Centre, 1600 René-Lévesque Boulevard West, Suite 140, Montreal, QC, H3H 1P9';
    const rawDateArrivee = this.offreDateArriveeUnite().trim();
    const jourSemaine = this.getJourSemaineEn(rawDateArrivee) || 'day of the week';
    const dateArriveeFormatted = rawDateArrivee || 'day / month / year';
    const unitObj = this.getUniteAffectationObj();
    const nomUnite = unitObj.nom || 'N/A';
    const serie = this.offreSerieCours().trim();
    const debut = this.offreDateCoursDebut().trim();
    const fin = this.offreDateCoursFin().trim();
    let datesCours = 'day / month / year to day / month / year';
    if (debut && fin) {
      datesCours = debut + ' to ' + fin;
    } else if (debut) {
      datesCours = debut;
    }

    let html = '';
    
    // Header surligné en jaune
    html += `<p style="margin-bottom: 12px;"><span style="background-color: #ffff00;">Please read this email - carefully and in its entirety - in order to be prepared for your enrolment.</span></p>`;

    // 1.
    html += `<p style="margin-bottom: 6px;"><strong>1. (If you have not already provided it) Submit (by email or phone) the following information, AS SOON AS POSSIBLE before your enrolment:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Your Social Insurance Number;</li>`;
    html += `<li>Your vehicle licence plate number (if used to travel to St-Jean);</li>`;
    html += `<li>Contact information for an <u><strong>emergency contact</strong></u>: first and last name / home address including postal code / phone number / relationship to you (father, mother, brother, sister, spouse/partner, friend, etc.);</li>`;
    html += `<li>Contact information for a <u><strong>beneficiary in the event of death</strong></u> who must be 18 years of age or older. The information you must provide about this person is: first and last name / home address including postal code / phone number / date of birth of the beneficiary: day, month, and year / relationship to you (father, mother, brother, sister, spouse/partner, friend, etc.);</li>`;
    html += `</ul>`;

    // 2.
    html += `<p style="margin-bottom: 6px;"><strong>2. If applicable, you must send a <span style="background-color: #ffff00;">photo</span> of the following documents by replying to this email:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Birth certificates of your spouse/partner, your children (original copy);</li>`;
    html += `<li>Marriage in Canada: marriage certificate (original copy);</li>`;
    html += `<li>Marriage abroad: marriage certificate (original copy) - must be in French or English; if in another language, it must be accompanied by a certified translation;</li>`;
    html += `</ul>`;

    const isUic3613 = this.isUic3613Selected();

    // 3.
    html += `<p style="margin-bottom: 6px;"><strong>3. Instructions regarding the following documents:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><a href="${getSecurityScreeningFormUrl(true)}" target="_blank" style="color: #2563eb; text-decoration: underline;">330-61-EN SSACF</a> : you must complete this form and bring it to ${nomUnite}. The sections of the form you must complete are from B to K;</li>`;
    html += `<li><a href="${getCommonLawInstructionUrl(true)}" target="_blank" style="color: #2563eb; text-decoration: underline;">Common-law_partership_procedure</a> : if your marital status is common-law, please review this document;</li>`;
    html += `<li><a href="${DRESS_CODE_EXAMPLE_URL}" target="_blank" style="color: #2563eb; text-decoration: underline;">Business casual examples</a>, dress code for the ceremony;</li>`;
    if (isUic3613) {
      html += `<li><a href="${getJoiningInstructionsQmbUrl(true)}" target="_blank" style="color: #2563eb; text-decoration: underline;">CFLRS_Joining_Instructions_EN</a> : joining instructions for the Canadian Forces Leadership and Recruit School.</li>`;
    }
    html += `</ul>`;

    // 4.
    html += `<p style="margin-bottom: 6px;"><strong>4. On the day of your enrolment, ensure you have the following documents in hand:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Void cheque;</li>`;
    html += `<li>Valid photo identification;</li>`;
    html += `<li>Original birth certificate or citizenship certificate for yourself and your dependants if applicable;</li>`;
    html += `<li>Common-law partner: proof of address as specified in the attached Word document;</li>`;
    html += `<li>Provincial health insurance card of your spouse/partner, your children (original copy) if residing with you;</li>`;
    html += `<li>Official court document if your marital status is divorced.</li>`;
    html += `</ul>`;

    // 5.
    html += `<p style="margin-bottom: 6px;"><strong>5. Photos on the day of enrolment:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Bring your camera or mobile phone if you wish to take photos of the ceremony.</li>`;
    html += `</ul>`;

    // 6.
    html += `<p style="margin-bottom: 6px;"><strong>6. Information to report if specific events occur before your enrolment day:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>If you receive a ticket/fine before your enrolment, you must pay it and bring proof of payment. If you are unable to pay it, please contact us before your enrolment;</li>`;
    html += `<li>If you have any legal obligations that were not declared during your interview with the military career counsellor;</li>`;
    html += `<li>If you change your address or marital status, you must notify us immediately so that the correct information appears on your enrolment documents;</li>`;
    html += `<li>If you experience any medical change, please notify the medical section at extension 4909 as soon as possible before your enrolment.</li>`;
    html += `</ul>`;

    // 7.
    html += `<p style="margin-bottom: 6px;"><strong>7. Learn about the Canadian Armed Forces ethos by clicking on the following link:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 16px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><a href="https://www.canada.ca/en/department-national-defence/services/benefits-military/defence-ethics/policies-publications/statement.html" target="_blank" style="color: #2563eb; text-decoration: underline;">Statement of Defence Ethics - Canada.ca</a></li>`;
    html += `</ul>`;

    // Enrôlement administratif et assermentation
    html += `<p style="margin-bottom: 14px;"><u><strong>Administrative Enrolment and Swearing-in Ceremony:</strong></u><br>`;
    html += `<strong>Date:</strong> ${dateEnrol}<br>`;
    html += `<strong>Arrival time:</strong> ${heurePostulant}<br>`;
    html += `<strong>Teams presentation time for guests:</strong> ${heureInvites} via a link that will be sent on Monday of the week of your enrolment.<br>`;
    html += `<strong>Location:</strong> ${lieuEnrolHtml}<br>`;
    html += `<strong>Dress:</strong> Clean business casual</p>`;

    // Unité d'affectation
    html += `<p style="margin-bottom: 6px;"><u><strong>Posting unit:</strong></u></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><strong>Arrival date:</strong> You must report to ${nomUnite} on <strong>${jourSemaine} : ${dateArriveeFormatted}</strong> by 16:00 at the latest.</li>`;
    if (serie) {
      html += `<li><strong>Course number:</strong> ${serie}</li>`;
      html += `<li><strong>Course dates:</strong> ${datesCours}</li>`;
    }
    html += `</ul>`;

    // Avertissements
    html += `<p style="margin-bottom: 14px;"><span style="background-color: #ffff00;">Tardiness on the day of your enrolment is not acceptable.</span></p>`;

    // Contact
    html += `<p style="margin-bottom: 14px;">For any questions, please contact the following email address<br>`;
    html += `: <a href="mailto:appointments.montreal@forces.gc.ca" style="color: #2563eb; text-decoration: underline;">appointments.montreal@forces.gc.ca</a></p>`;

    html += `<p style="margin-bottom: 12px;">Thank you for your interest in the Canadian Armed Forces,</p>`;

    // Mention légale de confidentialité en rouge et italique
    html += `<p style="color: #c00000; font-style: italic; font-size: 10pt; line-height: 1.4; margin-bottom: 16px;">«Please note that the information we collect is used solely for selection and employment purposes and may only be provided to other authorized employees of the Department of National Defence. In other words, we are prohibited from disclosing, without your consent, information concerning you to individuals such as members of your family, your spouse, your employer, or your teacher. If an unauthorized person were to contact us with questions about you, we would instruct them to contact you directly. Furthermore, if you wish to submit a request for access to personal information or a request for correction of information that is incorrect or unclear, you may do so in writing pursuant to the Privacy Act.»</p>`;

    // Signature
    html += `<p>` + this.getHtmlSignatureEn() + `</p>`;

    return html;
  }

export function getOffreOtaEmailHtml(this: any): string {
    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000; line-height: 1.4;">`;
    if (isEn) {
      html += `<p><strong>Un message en français suivra.</strong></p>`;
      html += this.getOffreOtaSectionHtmlEn();
      html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;
      html += this.getOffreOtaSectionHtmlFr();
    } else {
      html += `<p><strong>English message will follow.</strong></p>`;
      html += this.getOffreOtaSectionHtmlFr();
      html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;
      html += this.getOffreOtaSectionHtmlEn();
    }
    html += `</div>`;
    return html;
  }

export function getOffreNormaleEmailPlain(this: any): string {
    if (this.evaluationMedicaleType() === 'Dossier OTA') {
      return this.getOffreOtaEmailPlain();
    }
    const metier = this.offreMetier();
    const prog = this.offreProgrammeEnrolement();
    const elem = this.offreElement();
    const dateEnrolFr = this.getOffreDateEnrolementFull('fr');
    const dateEnrolEn = this.getOffreDateEnrolementFull('en');
    const selectedCenter = this.getSelectedRecruitmentCenter();
    const lieuEnrolFr = selectedCenter ? selectedCenter.fullFr : this.offreLieuEnrolement();
    const lieuEnrolEn = selectedCenter ? selectedCenter.fullEn : this.offreLieuEnrolement();
    const dateArrivee = this.getOffreDateArriveeUniteFull();
    const datesCours = this.getOffreDatesCoursFull();
    const hasCourseDates = !!this.offreSerieCours().trim() && !!datesCours;

    let fr = "English message will follow.\n\n";
    fr += "Bonjour,\n\n";
    fr += "Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.\n\n";
    fr += "Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :\n\n";
    fr += `Métier :    ${metier}\n`;
    fr += `Programme d’enrôlement :        ${prog}\n`;
    fr += `Élément :                             ${elem}\n\n`;
    fr += `Date d’enrôlement :   ${dateEnrolFr}\n`;
    fr += `Lieu de l’enrôlement : ${lieuEnrolFr}\n`;
    fr += "Stationnement : Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.   \n";
    fr += this.getTeamsLinkPlainFr();
    fr += `Unité d’affectation : ${this.getUniteAffectationObj().nom}\n${this.getUniteAffectationObj().adressePlain}\n\n`;
    fr += `Date d’arrivée à votre unité:  ${dateArrivee}\n`;
    if (hasCourseDates) {
      fr += `Vos dates de cours :      ${datesCours}\n`;
    }
    fr += `\n\n`;
    const { dateLimiteStr, elementsPlain } = this.getElementsManquantsBlocks('fr');
    fr += `Veuillez me faire parvenir les éléments suivant au plus tard le${dateLimiteStr} :\n\n`;
    fr += elementsPlain;
    fr += this.getOffreFormulairesSupplementairesPlain('fr');
    fr += this.getOffreLinksBlockPlain('fr');
    fr += this.getOffreEvenementsParticuliersPlainFr();
    fr += "Pour toute autre question, n’hésitez pas à communiquer avec moi. \n\n\n";
    fr += "Merci, bonne journée\n\n";
    fr += this.getSignatureFr();

    let en = "Hello,\n\n";
    en += "First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.\n\n";
    en += "Below you will find the details of the job offer discussed today:\n\n";
    en += `Occupation:    ${metier}\n`;
    en += `Enrolment program:        ${prog}\n`;
    en += `Element:                             ${elem}\n\n`;
    en += `Enrolment date:   ${dateEnrolEn}\n`;
    en += `Enrolment location: ${lieuEnrolEn}\n`;
    en += "Parking: Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.   \n";
    en += this.getTeamsLinkPlainEn();
    en += `Posting unit: ${this.getUniteAffectationObj().nom}\n${this.getUniteAffectationObj().adressePlain}\n\n`;
    en += `Arrival date at your unit:  ${dateArrivee}\n`;
    if (hasCourseDates) {
      en += `Your course dates:      ${datesCours}\n`;
    }
    en += `\n\n`;
    const blocksEn = this.getElementsManquantsBlocks('en');
    en += `Please send me the following items no later than${blocksEn.dateLimiteStr}:\n\n`;
    en += blocksEn.elementsPlain;
    en += this.getOffreFormulairesSupplementairesPlain('en');
    en += this.getOffreLinksBlockPlain('en');
    en += this.getOffreEvenementsParticuliersPlainEn();
    en += "If you have any further questions, please do not hesitate to contact me. \n\n\n";
    en += "Thank you, have a nice day\n\n";
    en += this.getSignatureEn();

    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      return `Un message en français suivra.\n\n${en}\n\n______________________________________________________________________________\n\n${fr.replace('English message will follow.\n\n', '')}`;
    }
    return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

export function isConjointDeFaitSelected(this: any): boolean {
    const st = (this.noteStatutCivil() || '').toLowerCase();
    return st.includes('conjoint');
  }

export function getTeamsLinkPlainFr(this: any): string {
    const city = this.offreLieuVille();
    if (city === 'Montréal') {
      return `Lien pour assister à la cérémonie par Teams : ${TEAMS_CEREMONY_URL_MS}\n\n\n`;
    } else if (city === 'Québec') {
      return `Lien pour assister à la cérémonie par Teams : ${TEAMS_CEREMONY_URL_LIVE}\n\n\n`;
    }
    return "\n\n";
  }

export function getTeamsLinkPlainEn(this: any): string {
    const city = this.offreLieuVille();
    if (city === 'Montréal') {
      return `Link to attend the ceremony via Teams: ${TEAMS_CEREMONY_URL_MS}\n\n\n`;
    } else if (city === 'Québec') {
      return `Link to attend the ceremony via Teams: ${TEAMS_CEREMONY_URL_LIVE}\n\n\n`;
    }
    return "\n\n";
  }

export function getTeamsLinkHtmlFr(this: any): string {
    const city = this.offreLieuVille();
    if (city === 'Montréal') {
      return `<p><strong>Lien pour assister à la cérémonie par Teams :</strong> <a href="${TEAMS_CEREMONY_URL_MS}" target="_blank" style="color: #2563eb; text-decoration: underline;">${TEAMS_CEREMONY_URL_MS}</a></p>`;
    } else if (city === 'Québec') {
      return `<p><strong>Lien pour assister à la cérémonie par Teams :</strong> <a href="${TEAMS_CEREMONY_URL_LIVE}" target="_blank" style="color: #2563eb; text-decoration: underline;">${TEAMS_CEREMONY_URL_LIVE}</a></p>`;
    }
    return "";
  }

export function getTeamsLinkHtmlEn(this: any): string {
    const city = this.offreLieuVille();
    if (city === 'Montréal') {
      return `<p><strong>Link to attend the ceremony via Teams:</strong> <a href="${TEAMS_CEREMONY_URL_MS}" target="_blank" style="color: #2563eb; text-decoration: underline;">${TEAMS_CEREMONY_URL_MS}</a></p>`;
    } else if (city === 'Québec') {
      return `<p><strong>Link to attend the ceremony via Teams:</strong> <a href="${TEAMS_CEREMONY_URL_LIVE}" target="_blank" style="color: #2563eb; text-decoration: underline;">${TEAMS_CEREMONY_URL_LIVE}</a></p>`;
    }
    return "";
  }

export function getOffreLinksBlockPlain(this: any, lang: 'fr' | 'en'): string {
    const isConjoint = this.isConjointDeFaitSelected();
    const uniteNom = this.getUniteAffectationObj().nom;
    const isUic3613 = this.isUic3613Selected();
    const qmbFr = getJoiningInstructionsQmbUrl(false);
    const ufFr = getCommonLawInstructionUrl(false);
    const tbsFr = getSecurityScreeningFormUrl(false);
    const qmbEn = getJoiningInstructionsQmbUrl(true);
    const ufEn = getCommonLawInstructionUrl(true);
    const tbsEn = getSecurityScreeningFormUrl(true);

    if (lang === 'fr') {
      let res = '';
      if (isUic3613) {
        if (isConjoint) {
          res += `Voici les liens vers vos instructions de ralliement, instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += `Instructions de ralliement (QMB/QMBO) : ${qmbFr}\n`;
          res += `Instruction union de fait : ${ufFr}\n`;
          res += `Demande de cote de sécurité (TBS330-61) : ${tbsFr}\n`;
        } else {
          res += `Voici les liens vers vos instructions de ralliement et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += `Instructions de ralliement (QMB/QMBO) : ${qmbFr}\n`;
          res += `Demande de cote de sécurité (TBS330-61) : ${tbsFr}\n`;
        }
      } else {
        if (isConjoint) {
          res += `Voici les liens vers votre instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += `Instruction union de fait : ${ufFr}\n`;
          res += `Demande de cote de sécurité (TBS330-61) : ${tbsFr}\n`;
        } else {
          res += `Voici le lien vers votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += `Demande de cote de sécurité (TBS330-61) : ${tbsFr}\n`;
        }
      }

      res += `Voici un exemple de tenue de ville, tenue vestimentaire pour la cérémonie : ${DRESS_CODE_EXAMPLE_URL}\n`;
      res += "\n\n\n";
      return res;
    } else {
      let res = '';
      if (isUic3613) {
        if (isConjoint) {
          res += `Here are the links to your joining instructions, common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += `Joining Instructions (BMQ/BMOQ) : ${qmbEn}\n`;
          res += `Common-Law partnership instruction : ${ufEn}\n`;
          res += `Security Screening Application (TBS330-61) : ${tbsEn}\n`;
        } else {
          res += `Here are the links to your joining instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += `Joining Instructions (BMQ/BMOQ) : ${qmbEn}\n`;
          res += `Security Screening Application (TBS330-61) : ${tbsEn}\n`;
        }
      } else {
        if (isConjoint) {
          res += `Here are the links to your common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += `Common-Law partnership instruction : ${ufEn}\n`;
          res += `Security Screening Application (TBS330-61) : ${tbsEn}\n`;
        } else {
          res += `Here is the link to your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += `Security Screening Application (TBS330-61) : ${tbsEn}\n`;
        }
      }

      res += `Here is an example of business casual / dress code for the ceremony : ${DRESS_CODE_EXAMPLE_URL}\n`;
      res += "\n\n\n";
      return res;
    }
  }

export function getOffreLinksBlockHtml(this: any, lang: 'fr' | 'en'): string {
    const isConjoint = this.isConjointDeFaitSelected();
    const uniteNom = this.getUniteAffectationObj().nom;
    const isUic3613 = this.isUic3613Selected();
    const qmbFr = getJoiningInstructionsQmbUrl(false);
    const ufFr = getCommonLawInstructionUrl(false);
    const tbsFr = getSecurityScreeningFormUrl(false);
    const qmbEn = getJoiningInstructionsQmbUrl(true);
    const ufEn = getCommonLawInstructionUrl(true);
    const tbsEn = getSecurityScreeningFormUrl(true);

    if (lang === 'fr') {
      let res = '<p>';
      if (isUic3613) {
        if (isConjoint) {
          res += `Voici les liens vers vos instructions de ralliement, instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="${qmbFr}" target="_blank" style="color: #2563eb; text-decoration: underline;">Instructions de ralliement (QMB/QMBO)</a><br>`;
          res += `<a href="${ufFr}" target="_blank" style="color: #2563eb; text-decoration: underline;">Instruction union de fait</a><br>`;
          res += `<a href="${tbsFr}" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        } else {
          res += `Voici les liens vers vos instructions de ralliement et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="${qmbFr}" target="_blank" style="color: #2563eb; text-decoration: underline;">Instructions de ralliement (QMB/QMBO)</a><br>`;
          res += `<a href="${tbsFr}" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        }
      } else {
        if (isConjoint) {
          res += `Voici les liens vers votre instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="${ufFr}" target="_blank" style="color: #2563eb; text-decoration: underline;">Instruction union de fait</a><br>`;
          res += `<a href="${tbsFr}" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        } else {
          res += `Voici le lien vers votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="${tbsFr}" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        }
      }

      res += `<br>Voici un exemple de tenue de ville, tenue vestimentaire pour la cérémonie : <a href="${DRESS_CODE_EXAMPLE_URL}" target="_blank" style="color: #2563eb; text-decoration: underline;">Tenue de ville</a>`;
      res += `</p>`;
      return res;
    } else {
      let res = '<p>';
      if (isUic3613) {
        if (isConjoint) {
          res += `Here are the links to your joining instructions, common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="${qmbEn}" target="_blank" style="color: #2563eb; text-decoration: underline;">Joining Instructions (BMQ/BMOQ)</a><br>`;
          res += `<a href="${ufEn}" target="_blank" style="color: #2563eb; text-decoration: underline;">Common-Law partnership instruction</a><br>`;
          res += `<a href="${tbsEn}" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        } else {
          res += `Here are the links to your joining instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="${qmbEn}" target="_blank" style="color: #2563eb; text-decoration: underline;">Joining Instructions (BMQ/BMOQ)</a><br>`;
          res += `<a href="${tbsEn}" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        }
      } else {
        if (isConjoint) {
          res += `Here are the links to your common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += `<a href="${ufEn}" target="_blank" style="color: #2563eb; text-decoration: underline;">Common-Law partnership instruction</a><br>`;
          res += `<a href="${tbsEn}" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        } else {
          res += `Here is the link to your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="${tbsEn}" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        }
      }

      res += `<br>Here is an example of business casual / dress code for the ceremony : <a href="${DRESS_CODE_EXAMPLE_URL}" target="_blank" style="color: #2563eb; text-decoration: underline;">Tenue de ville</a>`;
      res += `</p>`;
      return res;
    }
  }

export function getOffreEvenementsParticuliersPlainFr(this: any): string {
    let res = "Information à communiquer si des événements particuliers se produisent avant la journée de votre enrôlement :\n\n";
    res += "•\tSi vous recevez une contravention avant votre enrôlement, vous devez la payer et apporter la preuve de paiement. Si vous êtes dans l’impossibilité de la payer, veuillez nous contacter avant votre enrôlement;\n\n";
    res += "•\tSi vous avez des obligations envers la justice qui n’ont pas été déclarées lors de votre entrevue avec le conseiller en carrière militaire;\n\n";
    res += "•\tSi vous changez d’adresse ou d’état civil, vous devez nous aviser immédiatement afin que la bonne information se retrouve sur vos documents d’enrôlement;\n\n";
    res += "•\tSi vous avez un changement au niveau médical, veuillez aviser votre gestionnaire de dossier le plus tôt possible avant votre enrôlement.\n\n\n";
    return res;
  }

export function getOffreEvenementsParticuliersPlainEn(this: any): string {
    let res = "Information to report if specific events occur before the day of your enrolment:\n\n";
    res += "•\tIf you receive a ticket/fine before your enrolment, you must pay it and bring proof of payment. If you are unable to pay it, please contact us before your enrolment;\n\n";
    res += "•\tIf you have legal obligations that were not declared during your interview with the military career counsellor;\n\n";
    res += "•\tIf you change your address or marital status, you must notify us immediately so that the correct information appears on your enrolment documents;\n\n";
    res += "•\tIf you experience any medical changes, please notify your file manager as soon as possible before your enrolment.\n\n\n";
    return res;
  }

export function getOffreEvenementsParticuliersHtmlFr(this: any): string {
    return `<p style="margin-top: 10px; margin-bottom: 6px;"><strong>Information à communiquer si des événements particuliers se produisent avant la journée de votre enrôlement :</strong></p>
<ul style="list-style-type: disc; margin-top: 5px; margin-bottom: 15px; padding-left: 20px;">
  <li style="margin-bottom: 6px;">Si vous recevez une contravention avant votre enrôlement, vous devez la payer et apporter la preuve de paiement. Si vous êtes dans l’impossibilité de la payer, veuillez nous contacter avant votre enrôlement;</li>
  <li style="margin-bottom: 6px;">Si vous avez des obligations envers la justice qui n’ont pas été déclarées lors de votre entrevue avec le conseiller en carrière militaire;</li>
  <li style="margin-bottom: 6px;">Si vous changez d’adresse ou d’état civil, vous devez nous aviser immédiatement afin que la bonne information se retrouve sur vos documents d’enrôlement;</li>
  <li style="margin-bottom: 6px;">Si vous avez un changement au niveau médical, veuillez aviser votre gestionnaire de dossier le plus tôt possible avant votre enrôlement.</li>
</ul>`;
  }

export function getOffreEvenementsParticuliersHtmlEn(this: any): string {
    return `<p style="margin-top: 10px; margin-bottom: 6px;"><strong>Information to report if specific events occur before the day of your enrolment:</strong></p>
<ul style="list-style-type: disc; margin-top: 5px; margin-bottom: 15px; padding-left: 20px;">
  <li style="margin-bottom: 6px;">If you receive a ticket/fine before your enrolment, you must pay it and bring proof of payment. If you are unable to pay it, please contact us before your enrolment;</li>
  <li style="margin-bottom: 6px;">If you have legal obligations that were not declared during your interview with the military career counsellor;</li>
  <li style="margin-bottom: 6px;">If you change your address or marital status, you must notify us immediately so that the correct information appears on your enrolment documents;</li>
  <li style="margin-bottom: 6px;">If you experience any medical changes, please notify your file manager as soon as possible before your enrolment.</li>
</ul>`;
  }

export function getOffreNormaleEmailHtml(this: any): string {
    if (this.evaluationMedicaleType() === 'Dossier OTA') {
      return this.getOffreOtaEmailHtml();
    }
    const metier = this.offreMetier();
    const prog = this.offreProgrammeEnrolement();
    const elem = this.offreElement();
    const dateEnrolFr = this.getOffreDateEnrolementFull('fr');
    const dateEnrolEn = this.getOffreDateEnrolementFull('en');
    const selectedCenter = this.getSelectedRecruitmentCenter();
    const lieuEnrolFr = (selectedCenter ? selectedCenter.fullFr : this.offreLieuEnrolement()).replace(/\n/g, '<br>');
    const lieuEnrolEn = (selectedCenter ? selectedCenter.fullEn : this.offreLieuEnrolement()).replace(/\n/g, '<br>');
    const dateArrivee = this.getOffreDateArriveeUniteFull();
    const datesCours = this.getOffreDatesCoursFull();
    const hasCourseDates = !!this.offreSerieCours().trim() && !!datesCours;


    let frHtml = `<p>Bonjour,</p>`;
    frHtml += `<p>Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.</p>`;
    frHtml += `<p>Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :</p>`;
    frHtml += `<p><strong>Métier :</strong> ${metier}<br><strong>Programme d’enrôlement :</strong> ${prog}<br><strong>Élément :</strong> ${elem}</p>`;
    frHtml += `<p><strong>Date d’enrôlement :</strong> ${dateEnrolFr}<br>`;
    frHtml += `<strong>Lieu de l’enrôlement :</strong> ${lieuEnrolFr}<br>`;
    frHtml += `<strong>Stationnement :</strong> Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.<br>`;
    frHtml += this.getTeamsLinkHtmlFr();
    frHtml += `<p><strong>Unité d’affectation :</strong> ${this.getUniteAffectationObj().nom}<br>${this.getUniteAffectationObj().adresseHtml}<br>`;
    frHtml += `<strong>Date d’arrivée à votre unité :</strong> ${dateArrivee}`;
    if (hasCourseDates) {
      frHtml += `<br><strong>Vos dates de cours :</strong> ${datesCours}`;
    }
    frHtml += `</p>`;
    const { dateLimiteStr, elementsHtmlList } = this.getElementsManquantsBlocks('fr');
    frHtml += `<p>Veuillez me faire parvenir les éléments suivant au plus tard le${dateLimiteStr} :</p>`;
    frHtml += elementsHtmlList;
    frHtml += this.getOffreFormulairesSupplementairesHtml('fr');
    frHtml += this.getOffreLinksBlockHtml('fr');
    frHtml += this.getOffreEvenementsParticuliersHtmlFr();
    frHtml += `<p>Pour toute autre question, n’hésitez pas à communiquer avec moi.</p>`;
    frHtml += `<p>Merci, bonne journée</p>`;
    frHtml += `<p>` + this.getHtmlSignatureFr() + `</p>`;

    let enHtml = `<p>Hello,</p>`;
    enHtml += `<p>First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.</p>`;
    enHtml += `<p>Below you will find the details of the job offer discussed today:</p>`;
    enHtml += `<p><strong>Occupation:</strong> ${metier}<br><strong>Enrolment program:</strong> ${prog}<br><strong>Element:</strong> ${elem}</p>`;
    enHtml += `<p><strong>Enrolment date:</strong> ${dateEnrolEn}<br>`;
    enHtml += `<strong>Enrolment location:</strong> ${lieuEnrolEn}<br>`;
    enHtml += `<strong>Parking:</strong> Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.<br>`;
    enHtml += this.getTeamsLinkHtmlEn();
    enHtml += `<p><strong>Posting unit:</strong> ${this.getUniteAffectationObj().nom}<br>${this.getUniteAffectationObj().adresseHtml}<br>`;
    enHtml += `<strong>Arrival date at your unit:</strong> ${dateArrivee}`;
    if (hasCourseDates) {
      enHtml += `<br><strong>Your course dates:</strong> ${datesCours}`;
    }
    enHtml += `</p>`;
    const blocksHtmlEn = this.getElementsManquantsBlocks('en');
    enHtml += `<p>Please send me the following items no later than${blocksHtmlEn.dateLimiteStr}:</p>`;
    enHtml += blocksHtmlEn.elementsHtmlList;
    enHtml += this.getOffreFormulairesSupplementairesHtml('en');
    enHtml += this.getOffreLinksBlockHtml('en');
    enHtml += this.getOffreEvenementsParticuliersHtmlEn();
    enHtml += `<p>If you have any further questions, please do not hesitate to contact me.</p>`;
    enHtml += `<p>Thank you, have a nice day</p>`;
    enHtml += `<p>` + this.getHtmlSignatureEn() + `</p>`;

    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
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

export function getOffreEtudesSubventionneesEmailPlain(this: any): string {
    if (this.evaluationMedicaleType() === 'Dossier OTA') {
      return this.getOffreOtaEmailPlain();
    }
    const metier = this.offreMetier();
    const prog = this.offreProgrammeEnrolement();
    const elem = this.offreElement();
    const dureeContrat = this.offreDureeContrat();
    const etudesSub = this.offreEtudesSubventionnees();
    const dureeEtudesSub = this.offreDureeEtudesSubventionnees();
    const dateEnrolFr = this.getOffreDateEnrolementFull('fr');
    const dateEnrolEn = this.getOffreDateEnrolementFull('en');
    const selectedCenter = this.getSelectedRecruitmentCenter();
    const lieuEnrolFr = selectedCenter ? selectedCenter.fullFr : this.offreLieuEnrolement();
    const lieuEnrolEn = selectedCenter ? selectedCenter.fullEn : this.offreLieuEnrolement();
    const dateArrivee = this.getOffreDateArriveeUniteFull();
    const datesCours = this.getOffreDatesCoursFull();
    const hasCourseDates = !!this.offreSerieCours().trim() && !!datesCours;

    let fr = "English message will follow.\n\n";
    fr += "Bonjour,\n\n";
    fr += "Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.\n\n";
    fr += "Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :\n\n";
    fr += `Métier : ${metier}\n`;
    fr += `Programme d’enrôlement :     ${prog}\n`;
    fr += `Élément :      ${elem}\n`;
    fr += `Durée du contrat :    ${dureeContrat}\n`;
    fr += `Études subventionnées :     ${etudesSub}\n`;
    fr += `Durée des études subventionnées :     ${dureeEtudesSub}\n\n`;
    fr += `Date d’enrôlement :   ${dateEnrolFr}\n`;
    fr += `Lieu de l’enrôlement : ${lieuEnrolFr}\n`;
    fr += "Stationnement : Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.\n";
    fr += this.getTeamsLinkPlainFr();
    fr += `Unité d’affectation : ${this.getUniteAffectationObj().nom}\n${this.getUniteAffectationObj().adressePlain}\n\n`;
    fr += `Date d’arrivée à votre unité:  ${dateArrivee}\n`;
    if (hasCourseDates) {
      fr += `Vos dates de cours :    ${datesCours}\n`;
    }
    fr += `\n\n`;
    const { dateLimiteStr, elementsPlain } = this.getElementsManquantsBlocks('fr');
    fr += `Veuillez prendre connaissance des documents joints au courriel et me retourner les documents suivants au plus tard le${dateLimiteStr} :\n\n`;
    fr += elementsPlain;
    fr += this.getOffreFormulairesSupplementairesPlain('fr');
    fr += this.getOffreLinksBlockPlain('fr');
    fr += this.getOffreEvenementsParticuliersPlainFr();
    fr += "Pour toute autre question, n’hésitez pas à communiquer avec moi. \n\n\n";
    fr += this.getSignatureFr();

    let en = "Hello,\n\n";
    en += "First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.\n\n";
    en += "Below you will find the details of the job offer discussed today:\n\n";
    en += `Occupation: ${metier}\n`;
    en += `Enrolment program:     ${prog}\n`;
    en += `Element:      ${elem}\n`;
    en += `Contract duration:    ${dureeContrat}\n`;
    en += `Subsidized education:     ${etudesSub}\n`;
    en += `Subsidized education duration:     ${dureeEtudesSub}\n\n`;
    en += `Enrolment date:   ${dateEnrolEn}\n`;
    en += `Enrolment location: ${lieuEnrolEn}\n`;
    en += "Parking: Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.\n";
    en += this.getTeamsLinkPlainEn();
    en += `Posting unit: ${this.getUniteAffectationObj().nom}\n${this.getUniteAffectationObj().adressePlain}\n\n`;
    en += `Arrival date at your unit:  ${dateArrivee}\n`;
    if (hasCourseDates) {
      en += `Your course dates:    ${datesCours}\n`;
    }
    en += `\n\n`;
    const blocksSubEn = this.getElementsManquantsBlocks('en');
    en += `Please review the documents attached to this email and return the following documents to me no later than${blocksSubEn.dateLimiteStr}:\n\n`;
    en += blocksSubEn.elementsPlain;
    en += this.getOffreFormulairesSupplementairesPlain('en');
    en += this.getOffreLinksBlockPlain('en');
    en += this.getOffreEvenementsParticuliersPlainEn();
    en += "If you have any further questions, please do not hesitate to contact me. \n\n\n";
    en += this.getSignatureEn();

    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
    if (isEn) {
      return `Un message en français suivra.\n\n${en}\n\n______________________________________________________________________________\n\n${fr.replace('English message will follow.\n\n', '')}`;
    }
    return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

export function getOffreEtudesSubventionneesEmailHtml(this: any): string {
    if (this.evaluationMedicaleType() === 'Dossier OTA') {
      return this.getOffreOtaEmailHtml();
    }
    const metier = this.offreMetier();
    const prog = this.offreProgrammeEnrolement();
    const elem = this.offreElement();
    const dureeContrat = this.offreDureeContrat();
    const etudesSub = this.offreEtudesSubventionnees();
    const dureeEtudesSub = this.offreDureeEtudesSubventionnees();
    const dateEnrolFr = this.getOffreDateEnrolementFull('fr');
    const dateEnrolEn = this.getOffreDateEnrolementFull('en');
    const selectedCenter = this.getSelectedRecruitmentCenter();
    const lieuEnrolFr = (selectedCenter ? selectedCenter.fullFr : this.offreLieuEnrolement()).replace(/\n/g, '<br>');
    const lieuEnrolEn = (selectedCenter ? selectedCenter.fullEn : this.offreLieuEnrolement()).replace(/\n/g, '<br>');
    const dateArrivee = this.getOffreDateArriveeUniteFull();
    const datesCours = this.getOffreDatesCoursFull();
    const hasCourseDates = !!this.offreSerieCours().trim() && !!datesCours;

    let frHtml = `<p>Bonjour,</p>`;
    frHtml += `<p>Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.</p>`;
    frHtml += `<p>Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :</p>`;
    frHtml += `<p><strong>Métier :</strong> ${metier}<br><strong>Programme d’enrôlement :</strong> ${prog}<br><strong>Élément :</strong> ${elem}<br><strong>Durée du contrat :</strong> ${dureeContrat}<br><strong>Études subventionnées :</strong> ${etudesSub}<br><strong>Durée des études subventionnées :</strong> ${dureeEtudesSub}</p>`;
    frHtml += `<p><strong>Date d’enrôlement :</strong> ${dateEnrolFr}<br>`;
    frHtml += `<strong>Lieu de l’enrôlement :</strong> ${lieuEnrolFr}<br>`;
    frHtml += `<strong>Stationnement :</strong> Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.<br>`;
    frHtml += this.getTeamsLinkHtmlFr();
    frHtml += `<p><strong>Unité d’affectation :</strong> ${this.getUniteAffectationObj().nom}<br>${this.getUniteAffectationObj().adresseHtml}<br>`;
    frHtml += `<strong>Date d’arrivée à votre unité :</strong> ${dateArrivee}`;
    if (hasCourseDates) {
      frHtml += `<br><strong>Vos dates de cours :</strong> ${datesCours}`;
    }
    frHtml += `</p>`;
    const { dateLimiteStr, elementsHtmlList } = this.getElementsManquantsBlocks('fr');
    frHtml += `<p>Veuillez prendre connaissance des documents joints au courriel et me retourner les documents suivants au plus tard le${dateLimiteStr} :</p>`;
    frHtml += elementsHtmlList;
    frHtml += this.getOffreFormulairesSupplementairesHtml('fr');
    frHtml += this.getOffreLinksBlockHtml('fr');
    frHtml += this.getOffreEvenementsParticuliersHtmlFr();
    frHtml += `<p>Pour toute autre question, n’hésitez pas à communiquer avec moi.</p>`;
    frHtml += `<p>` + this.getHtmlSignatureFr() + `</p>`;

    let enHtml = `<p>Hello,</p>`;
    enHtml += `<p>First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.</p>`;
    enHtml += `<p>Below you will find the details of the job offer discussed today:</p>`;
    enHtml += `<p><strong>Occupation:</strong> ${metier}<br><strong>Enrolment program:</strong> ${prog}<br><strong>Element:</strong> ${elem}<br><strong>Contract duration:</strong> ${dureeContrat}<br><strong>Subsidized education:</strong> ${etudesSub}<br><strong>Subsidized education duration:</strong> ${dureeEtudesSub}</p>`;
    enHtml += `<p><strong>Enrolment date:</strong> ${dateEnrolEn}<br>`;
    enHtml += `<strong>Enrolment location:</strong> ${lieuEnrolEn}<br>`;
    enHtml += `<strong>Parking:</strong> Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.<br>`;
    enHtml += this.getTeamsLinkHtmlEn();
    enHtml += `<p><strong>Posting unit:</strong> ${this.getUniteAffectationObj().nom}<br>${this.getUniteAffectationObj().adresseHtml}<br>`;
    enHtml += `<strong>Arrival date at your unit:</strong> ${dateArrivee}`;
    if (hasCourseDates) {
      enHtml += `<br><strong>Your course dates:</strong> ${datesCours}`;
    }
    enHtml += `</p>`;
    const blocksHtmlSubEn = this.getElementsManquantsBlocks('en');
    enHtml += `<p>Please review the documents attached to this email and return the following documents to me no later than${blocksHtmlSubEn.dateLimiteStr}:</p>`;
    enHtml += blocksHtmlSubEn.elementsHtmlList;
    enHtml += this.getOffreFormulairesSupplementairesHtml('en');
    enHtml += this.getOffreLinksBlockHtml('en');
    enHtml += this.getOffreEvenementsParticuliersHtmlEn();
    enHtml += `<p>If you have any further questions, please do not hesitate to contact me.</p>`;
    enHtml += `<p>` + this.getHtmlSignatureEn() + `</p>`;

    const isEn = this.i18n?.isEn ? this.i18n.isEn() : (this.i18n?.lang?.() === 'en');
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

  // --- CONSOLIDATED EMAIL LOGIC FOR MULTI-TASK SELECTION ---

