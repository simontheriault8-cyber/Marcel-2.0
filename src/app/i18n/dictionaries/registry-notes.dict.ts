import { TranslationDictionary, RejectionReasonLogNote } from '../i18n.models';

export const REGISTRY_NOTES_FR: TranslationDictionary = {
  // Task Verification & Rejection Notes
  'regNotes.taskNotCompleted': 'Tâche "{taskName}" non complétée',
  'regNotes.tasksReassignedSuffix': ', la/les tâches réattribuées et courriel explicatif envoyé.',
  'regNotes.noReassignmentSuffix': '.',
  'regNotes.closureWarning30Days': "Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.",
  'regNotes.taskReassignmentHeader': "Étape 1 (en cours) - La/les tâches réattribuées et courriel explicatif envoyé. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours:",
  'regNotes.taskReassignmentUnderageHeader': "Étape 1 (en cours) - La/les tâches réattribuées et courriel explicatif envoyé. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours. En attente de la confirmation du consentement parental pour continuer le Big ACE:",
  'regNotes.taskNoReassignmentHeader': "Étape 1 (en cours) - Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours:",
  'regNotes.compliantExtraReassignmentHeader': "La/les tâches réattribuées et courriel explicatif envoyé. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours:",
  'regNotes.compliantExtraNoReassignmentHeader': "Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours:",

  // Big Ace / Compliant File Notes
  'regNotes.step1Completed': 'Étape 1 (Complété) - Postulant admissible pour le ou les métiers suivants : {jobs}.',
  'regNotes.step1CompletedPfor': 'Étape 1 (Complété) - Postulant admissible PFOR pour le ou les métiers suivants : {jobs}.',
  'regNotes.seafCompleted': 'SEAF complété et téléversé.',
  'regNotes.fileCompliant': 'Dossier conforme.',
  'regNotes.gambitToDo': 'GAMBIT à faire.',
  'regNotes.gambitCompleted': 'GAMBIT complété.',
  'regNotes.gambitPending': 'GAMBIT en attente ({status}).',
  'regNotes.tsdPiToDo': 'TSD/PI à faire.',
  'regNotes.tsdPiCompleted': 'TSD/PI complété.',
  'regNotes.transferredToFM': 'Dossier transféré au Gestionnaire de dossier pour la suite du processus.',

  // File Manager (GD) Premier Contact Note
  'regNotes.premierContactPrefix': 'Premier contact effectué.',
  'regNotes.iptadStatus': 'IPTAD : {status}',
  'regNotes.seafStatus': 'SEAF : {status}',
  'regNotes.entrevueStatus': 'Entrevue : {status}',
  'regNotes.medicalStatus': 'Médical : {status}',
  'regNotes.pspsStatus': 'PSPS : {status}',
  'regNotes.gambitStatus': 'GAMBIT : {status}',
  'regNotes.anxQStatus': 'Annexe Q : {status}',

  // File Manager Medical Evaluation Notes
  'regNotes.medEvalPart1': 'Évaluation médicale Partie 1 complétée.',
  'regNotes.medEvalPart2': 'Évaluation médicale Partie 2 complétée.',
  'regNotes.medEvalPart1And2': 'Évaluation médicale Parties 1 et 2 complétées.',
  'regNotes.triageMedicalNote': 'Dossier soumis pour triage médical.',

  // File Manager Enrolment Offer Notes
  'regNotes.offreEnrolementTitle': "Offre d'enrôlement :",
  'regNotes.offreMetier': 'Métier : {val}',
  'regNotes.offreUnite': "Unité d'affectation : {val}",
  'regNotes.offreDateEnrolement': "Date d'enrôlement : {val}",
  'regNotes.offreDateArrivee': "Date d'arrivée : {val}",
  'regNotes.offreSerieCours': 'Série QMB/QMBM : {val}',
  'regNotes.offreStatutCivil': 'Statut civil : {val}',
  'regNotes.offreConjoint': 'Conjoint : {val}',
  'regNotes.offreEnfants': 'Enfant(s) à charge : {val}',
  'regNotes.offrePlaqueImm': 'Plaque IMM : {val}',
  'regNotes.offreBrisBail': 'Bris de bail : {val}',
  'regNotes.offreEntreposage': 'Entreposage : {val}',
  'regNotes.offreSerment': 'Serment / Déclaration : {val}',
  'regNotes.offreInviteMil': 'Invité militaire : {val}',
  'regNotes.offreSvcMilAnt': 'Service militaire antérieur : {val}',
  'regNotes.offreBeneficiaire': 'Bénéficiaire : {val}',

  // Reorientation & PFOR Notes
  'regNotes.reoAnalysisTitle': 'Analyse de réorientation professionnelle :',
  'regNotes.reoTradeEligible': 'Choix #{num} ({trade}) : Admissible',
  'regNotes.reoTradeIneligible': 'Choix #{num} ({trade}) : Non admissible ({reasons})',
  'regNotes.reoMissingProofs': 'Preuves manquantes requises : {proofs}',
  'regNotes.cmrRefusal': 'Refus d’admission au CMR pour le PFOR - critères académiques non rencontrés : {reasons}',
  'regNotes.pforExpectations': 'Gestion des attentes PFOR complétée. Postulant informé des critères et de la concurrence pour le programme.',
  'regNotes.mergedTasksAndReo': '{taskNotes}\n\nAnalyse Réorientation / PFOR :\n{reoNotes}',
  // Additional Registry Notes
  'regNotes.step1InProgressPrefix': 'Étape 1 (En cours) - ',
  'regNotes.awaitingParentalConsent': 'En attente de la confirmation du consentement parental pour continuer le Big ACE.',
  'regNotes.taskReminderSent': 'Courriel de rappel de tâches envoyé au postulant.',
  'regNotes.inadmissibiliteAge57': "Étape 1 (En cours) - Âge maximal d'admissibilité dépassé (57 ans et plus) : Inadmissible pour un enrôlement dans les FAC, courriel envoyé, fermeture du dossier.",
  'regNotes.inadmissibilitePr3Ans': "Étape 1 (En cours) - Résident permanent de moins de 3 ans (Inadmissible) : Courriel d'inadmissibilité envoyé (résultat du calculateur IRCC +3 ans ou citoyenneté requis avant de repostuler), fermeture du dossier.",
  'regNotes.inadmissibiliteNonCitoyen': "Étape 1 (En cours) - Ni citoyen canadien ni résident permanent (Inadmissible) : Inadmissible pour un enrôlement dans les FAC (citoyenneté canadienne ou résidence permanente requise pour repostuler), courriel envoyé, fermeture du dossier.",
  'regNotes.inadmissibiliteScolarite': 'Postulant Inadmissible pour la scolarité. Fermeture de dossier et courriel explicatif envoyé avec les options possible pour devenir admissible.',
  'regNotes.verifDepotRelevesCmr': 'Étape 1 (en cours) - Courriel de vérification de dépôt des relevés de notes dans le portail du CMR, tâche Relevés de notes réattribuées.',
  'regNotes.verificationEdoVsPfor': 'Courriel de vérification de programme EDO VS PFOR envoyé au postulant.',
  'regNotes.tentativeOffreGd': "Tentative de communication effectuer pour l'offre, courriel envoyé au postulant lui demandant de rappeler son GD",
  'regNotes.cadetFileVerification': 'Courriel de vérification de dossier cadet envoyé à MDN.CJRURSCEstJ1RH-CJRRCSUEasternJ1HR.DND@forces.gc.ca.',
  'regNotes.brisBailEntreposage': "Transmission des informations et documents requis concernant le bris de bail et l'entreposage.",
  'regNotes.demandeNavTan': 'Demande de numéro de NAV/TAN et création de compte claims X envoyée à CRFCQcReclamations@forces.gc.ca pour CSPN partie 1.',
  'regNotes.demandeAutorisationCspn': 'Demande d’autorisation pour un CSPN envoyée.',
  'regNotes.documentsConjointDeFait': 'Courriel de demande de documents pour statut de conjoint(e) de fait envoyé au postulant.',
  'regNotes.demandeSdpmConjointMilitaire': 'Demande de SDPM/MPRR pour conjoint militaire envoyée à CRFCQcAdmin@forces.gc.ca.',
  'regNotes.testEsomConfirmation': 'Courriel de convocation au test ESOM envoyé au candidat ({city}).',
  'regNotes.inapteMedicalOmr': "Courriel envoyé informant le postulant qu'il a été jugé inapte médicalement et expliquant que tous les détails de la décision prise seront expliqués dans la lettre de RMO.",
  'regNotes.inapteMedicalOmrM': "Courriel envoyé informant le postulant qu'il a été jugé inapte médicalement et expliquant que tous les détails de la décision prise seront expliqués dans la lettre de RMO.",
  'regNotes.inapteMedicalOmrF': "Courriel envoyé informant la postulante qu'elle a été jugée inapte médicalement et expliquant que tous les détails de la décision prise seront expliqués dans la lettre de RMO.",
  'regNotes.rappelCeremonie': "Transmission d'un courriel de rappel pour la cérémonie d'assermentation du {date}.",
  'regNotes.annexeQReady': "Annexe Q prête à faire\nDocuments PSPS insérés dans CFRIM\nCourriel au CCM envoyé",
  'regNotes.avisFermetureHeader': "courriel d'avis de fermeture :\n\n",
  'regNotes.medTriageRequired': 'MÉDICAL - TRIAGE PAR MED CHU REQUIS',
  'regNotes.offerAcceptedPrefix': 'Postulant accepte l’offre – {trade}',
  'regNotes.offerConfirmedEmailSent': 'Courriel de confirmation envoyé au postulant le : {date}',
  'regNotes.pforAttentesPrefix': 'Étape 1 (En cours) - {admissionPart} - Courriel de gestion des attentes envoyé, {jobs}. Traitement continu, possible changement de métier selon choix du postulant.',
  'regNotes.pforNotYetEvaluated': 'Étape 1 (en cours) - {jobs} - Courriel de gestion des attentes envoyé avec plusieurs options proposés. En attente de la réponse du postulant.',
  'regNotes.pforTradeOngoingProcessing': 'Traitement continu, possible changement de métier selon choix du postulant.',
  'regNotes.pforCmrRefusalReoPrefix': "Refus d'admission CMR - Réorientation nécessaire",
  'regNotes.pforCmrMinCriteriaReoPrefix': 'Critère minimal PFOR non rencontré (DES manquant) - Réorientation nécessaire',
  'regNotes.missingProofsTitle': 'Preuves supplémentaires requises :',
  'regNotes.missingProofsForTrade': 'Pour le métier {trade} :',
};

export const REGISTRY_NOTES_EN: TranslationDictionary = {
  // Task Verification & Rejection Notes
  'regNotes.taskNotCompleted': 'Task "{taskName}" not completed',
  'regNotes.tasksReassignedSuffix': ', task(s) reassigned and explanatory email sent.',
  'regNotes.noReassignmentSuffix': '.',
  'regNotes.closureWarning30Days': 'Applicant warned of file closure if no action is taken within 30 days.',
  'regNotes.taskReassignmentHeader': 'Step 1 (In progress) - Task(s) reassigned and explanatory email sent. Applicant warned of file closure if no action is taken within 30 days:',
  'regNotes.taskReassignmentUnderageHeader': 'Step 1 (In progress) - Task(s) reassigned and explanatory email sent. Applicant warned of file closure if no action is taken within 30 days. Awaiting confirmation of parental consent to proceed with Big ACE:',
  'regNotes.taskNoReassignmentHeader': 'Step 1 (In progress) - Applicant warned of file closure if no action is taken within 30 days:',
  'regNotes.compliantExtraReassignmentHeader': 'Task(s) reassigned and explanatory email sent. Applicant warned of file closure if no action is taken within 30 days:',
  'regNotes.compliantExtraNoReassignmentHeader': 'Applicant warned of file closure if no action is taken within 30 days:',

  // Big Ace / Compliant File Notes
  'regNotes.step1Completed': 'Step 1 (Completed) - Candidate eligible for the following trade(s): {jobs}.',
  'regNotes.step1CompletedPfor': 'Step 1 (Completed) - Candidate eligible for ROTP for the following trade(s): {jobs}.',
  'regNotes.seafCompleted': 'SEAF completed and uploaded.',
  'regNotes.fileCompliant': 'File compliant.',
  'regNotes.gambitToDo': 'GAMBIT to do.',
  'regNotes.gambitCompleted': 'GAMBIT completed.',
  'regNotes.gambitPending': 'GAMBIT pending ({status}).',
  'regNotes.tsdPiToDo': 'TSD/PI to do.',
  'regNotes.tsdPiCompleted': 'TSD/PI completed.',
  'regNotes.transferredToFM': 'File transferred to File Manager for next steps.',

  // File Manager (GD) Premier Contact Note
  'regNotes.premierContactPrefix': 'First contact conducted.',
  'regNotes.iptadStatus': 'IPTAD: {status}',
  'regNotes.seafStatus': 'SEAF: {status}',
  'regNotes.entrevueStatus': 'Interview: {status}',
  'regNotes.medicalStatus': 'Medical: {status}',
  'regNotes.pspsStatus': 'PSPS: {status}',
  'regNotes.gambitStatus': 'GAMBIT: {status}',
  'regNotes.anxQStatus': 'Annex Q: {status}',

  // File Manager Medical Evaluation Notes
  'regNotes.medEvalPart1': 'Medical Evaluation Part 1 completed.',
  'regNotes.medEvalPart2': 'Medical Evaluation Part 2 completed.',
  'regNotes.medEvalPart1And2': 'Medical Evaluation Parts 1 & 2 completed.',
  'regNotes.triageMedicalNote': 'File submitted for medical triage.',

  // File Manager Enrolment Offer Notes
  'regNotes.offreEnrolementTitle': 'Enrolment Offer:',
  'regNotes.offreMetier': 'Trade: {val}',
  'regNotes.offreUnite': 'Posting Unit: {val}',
  'regNotes.offreDateEnrolement': 'Enrolment Date: {val}',
  'regNotes.offreDateArrivee': 'Arrival Date: {val}',
  'regNotes.offreSerieCours': 'BMQ/BMOQ Series: {val}',
  'regNotes.offreStatutCivil': 'Marital Status: {val}',
  'regNotes.offreConjoint': 'Spouse / Partner: {val}',
  'regNotes.offreEnfants': 'Dependent Child(ren): {val}',
  'regNotes.offrePlaqueImm': 'License Plate (IMM): {val}',
  'regNotes.offreBrisBail': 'Lease Cancellation: {val}',
  'regNotes.offreEntreposage': 'Storage: {val}',
  'regNotes.offreSerment': 'Oath / Declaration: {val}',
  'regNotes.offreInviteMil': 'Military Guest: {val}',
  'regNotes.offreSvcMilAnt': 'Prior Military Service: {val}',
  'regNotes.offreBeneficiaire': 'Beneficiary: {val}',

  // Reorientation & PFOR Notes
  'regNotes.reoAnalysisTitle': 'Career Reorientation Analysis:',
  'regNotes.reoTradeEligible': 'Choice #{num} ({trade}): Eligible',
  'regNotes.reoTradeIneligible': 'Choice #{num} ({trade}): Ineligible ({reasons})',
  'regNotes.reoMissingProofs': 'Required missing proofs: {proofs}',
  'regNotes.cmrRefusal': 'RMC ROTP admission refusal - academic requirements not met: {reasons}',
  'regNotes.pforExpectations': 'ROTP expectations management completed. Candidate briefed on program competition and requirements.',
  'regNotes.mergedTasksAndReo': '{taskNotes}\n\nReorientation / ROTP Analysis:\n{reoNotes}',
  // Additional Registry Notes
  'regNotes.step1InProgressPrefix': 'Step 1 (In progress) - ',
  'regNotes.awaitingParentalConsent': 'Awaiting confirmation of parental consent to proceed with Big ACE.',
  'regNotes.taskReminderSent': 'Task reminder email sent to applicant.',
  'regNotes.inadmissibiliteAge57': 'Step 1 (In progress) - Maximum eligibility age exceeded (57 years and older): Ineligible for enrolment in the CAF, email sent, file closure.',
  'regNotes.inadmissibilitePr3Ans': 'Step 1 (In progress) - Permanent resident under 3 years (Ineligible): Ineligibility email sent (IRCC calculator result 3+ years or citizenship required before reapplying), file closure.',
  'regNotes.inadmissibiliteNonCitoyen': 'Step 1 (In progress) - Neither Canadian citizen nor permanent resident (Ineligible): Ineligible for enrolment in the CAF (Canadian citizenship or permanent residency required to reapply), email sent, file closure.',
  'regNotes.inadmissibiliteScolarite': 'Applicant Ineligible for education. File closure and explanatory email sent with possible options to become eligible.',
  'regNotes.verifDepotRelevesCmr': 'Step 1 (In progress) - Email verifying transcript upload to the RMC portal, Transcripts task reassigned.',
  'regNotes.verificationEdoVsPfor': 'EDO VS ROTP program verification email sent to applicant.',
  'regNotes.tentativeOffreGd': 'Communication attempt made for the offer, email sent to applicant asking to call their FM back',
  'regNotes.cadetFileVerification': 'Cadet file verification email sent to MDN.CJRURSCEstJ1RH-CJRRCSUEasternJ1HR.DND@forces.gc.ca.',
  'regNotes.brisBailEntreposage': 'Transmission of required information and documents regarding lease cancellation and storage.',
  'regNotes.demandeNavTan': 'Request for NAV/TAN number and Claims X account creation sent to CRFCQcReclamations@forces.gc.ca for CSPN part 1.',
  'regNotes.demandeAutorisationCspn': 'Authorization request for a CSPN sent.',
  'regNotes.documentsConjointDeFait': 'Request email for common-law partner documentation sent to applicant.',
  'regNotes.demandeSdpmConjointMilitaire': 'MPRR request for military spouse sent to CRFCQcAdmin@forces.gc.ca.',
  'regNotes.testEsomConfirmation': 'ESOM test convocation email sent to candidate ({city}).',
  'regNotes.inapteMedicalOmr': 'Email sent informing the applicant that they have been found medically unfit and explaining that all details of the decision will be explained in the RMO letter.',
  'regNotes.inapteMedicalOmrM': 'Email sent informing the applicant that they have been found medically unfit and explaining that all details of the decision will be explained in the RMO letter.',
  'regNotes.inapteMedicalOmrF': 'Email sent informing the applicant that they have been found medically unfit and explaining that all details of the decision will be explained in the RMO letter.',
  'regNotes.rappelCeremonie': 'Reminder email sent for swearing-in ceremony on {date}.',
  'regNotes.annexeQReady': "Annex Q ready to do\nPSPS documents inserted into CFRIM\nEmail sent to MCC",
  'regNotes.avisFermetureHeader': "closure notice email:\n\n",
  'regNotes.medTriageRequired': 'MEDICAL - TRIAGE BY MED CHU REQUIRED',
  'regNotes.offerAcceptedPrefix': 'Applicant accepts offer – {trade}',
  'regNotes.offerConfirmedEmailSent': 'Confirmation email sent to applicant on : {date}',
  'regNotes.pforAttentesPrefix': "Step 1 (In progress) - {admissionPart} - Expectations management email sent, {jobs}. Ongoing processing, potential trade change based on candidate's choice.",
  'regNotes.pforNotYetEvaluated': "Step 1 (In progress) - {jobs} - Expectations management email sent with several options offered. Awaiting candidate's response.",
  'regNotes.pforTradeOngoingProcessing': "Ongoing processing, potential trade change based on candidate's choice.",
  'regNotes.pforCmrRefusalReoPrefix': 'RMC admission refusal - Reorientation required',
  'regNotes.pforCmrMinCriteriaReoPrefix': 'ROTP minimum criteria not met (Missing high school diploma) - Reorientation required',
  'regNotes.missingProofsTitle': 'Additional required proofs:',
  'regNotes.missingProofsForTrade': 'For trade {trade}:',
};

/**
 * Complete translation table for every rejection reason logNote.
 * Mapped by reason ID and fallback French log note.
 */
export const REJECTION_REASONS_LOG_NOTES: Record<string, RejectionReasonLogNote> = {
  // Transcripts & Diplomas
  'relev_flou': {
    fr: 'Relevé d’apprentissage flou',
    en: 'Transcript blurred'
  },
  'relev_incomp': {
    fr: 'Relevé d’apprentissage incomplet',
    en: 'Transcript incomplete'
  },
  'relev_inexist': {
    fr: 'Aucun relevé d’apprentissage au dossier',
    en: 'No transcript on file'
  },
  'relev_maj': {
    fr: 'Mise à jour du relevé d’apprentissage',
    en: 'Transcript update requested'
  },
  'lettre_adm_civil_flou': {
    fr: "Lettre d'admission sans condition Université civile floue",
    en: 'Unconditional Canadian civilian university admission letter blurred'
  },
  'lettre_adm_civil_incomp': {
    fr: "Lettre d'admission sans condition Université civile incomplète",
    en: 'Unconditional Canadian civilian university admission letter incomplete'
  },
  'lettre_adm_civil_inexist': {
    fr: "Aucune lettre d'admission sans condition Université civile au dossier",
    en: 'No unconditional Canadian civilian university admission letter on file'
  },
  'lettre_adm_civil_maj': {
    fr: "Mise à jour de la lettre d'admission sans condition Université civile",
    en: 'Unconditional Canadian civilian university admission letter update requested'
  },
  'lett_adm_cmr_flou': {
    fr: "Lettre d'offre d'admission au CMR floue",
    en: 'RMC offer of admission letter blurred'
  },
  'lett_adm_cmr_incomp': {
    fr: "Lettre d'offre d'admission au CMR incomplète",
    en: 'RMC offer of admission letter incomplete'
  },
  'lett_adm_cmr_inexist': {
    fr: "Aucune lettre d'offre d'admission au CMR au dossier",
    en: 'No RMC offer of admission letter on file'
  },
  'lett_adm_cmr_maj': {
    fr: "Mise à jour de la lettre d'offre d'admission au CMR",
    en: 'RMC offer of admission letter update requested'
  },
  'relev_off_cmr_flou': {
    fr: 'Relevé de notes officiel pour CMR flou',
    en: 'Official transcript for RMC blurred'
  },
  'relev_off_cmr_incomp': {
    fr: 'Relevé de notes officiel pour CMR incomplet',
    en: 'Official transcript for RMC incomplete'
  },
  'relev_off_cmr_inexist': {
    fr: 'Aucun relevé de notes officiel pour CMR au dossier',
    en: 'No official transcript for RMC on file'
  },
  'relev_off_cmr_maj': {
    fr: 'Mise à jour du relevé de notes officiel pour CMR',
    en: 'Official transcript for RMC update requested'
  },
  'dip_sec_flou': {
    fr: 'Diplôme d’études secondaires flou',
    en: 'High school diploma blurred'
  },
  'dip_sec_incomp': {
    fr: 'Diplôme d’études secondaires incomplet',
    en: 'High school diploma incomplete'
  },
  'dip_sec_inexist': {
    fr: 'Aucun diplôme d’études secondaires au dossier',
    en: 'No high school diploma on file'
  },
  'dip_sec_maj': {
    fr: 'Mise à jour du diplôme d’études secondaires',
    en: 'High school diploma update requested'
  },
  'dip_coll_flou': {
    fr: 'Diplôme collégial flou',
    en: 'College diploma blurred'
  },
  'dip_coll_incomp': {
    fr: 'Diplôme collégial incomplet',
    en: 'College diploma incomplete'
  },
  'dip_coll_inexist': {
    fr: 'Aucun diplôme collégial au dossier',
    en: 'No college diploma on file'
  },
  'dip_coll_maj': {
    fr: 'Mise à jour du diplôme collégial',
    en: 'College diploma update requested'
  },
  'dip_univ_flou': {
    fr: 'Diplôme universitaire flou',
    en: 'University degree blurred'
  },
  'dip_univ_incomp': {
    fr: 'Diplôme universitaire incomplet',
    en: 'University degree incomplete'
  },
  'dip_univ_inexist': {
    fr: 'Aucun diplôme universitaire au dossier',
    en: 'No university degree on file'
  },
  'dip_univ_maj': {
    fr: 'Mise à jour du diplôme universitaire',
    en: 'University degree update requested'
  },
  'eval_comp_flou': {
    fr: 'Évaluation comparative des études floue',
    en: 'Comparative education evaluation blurred'
  },
  'eval_comp_incomp': {
    fr: 'Évaluation comparative des études incomplète',
    en: 'Comparative education evaluation incomplete'
  },
  'eval_comp_inexist': {
    fr: 'Aucune évaluation comparative des études au dossier',
    en: 'No comparative education evaluation on file'
  },
  'eval_comp_maj': {
    fr: 'Mise à jour de l’évaluation comparative des études',
    en: 'Comparative education evaluation update requested'
  },
  'ev_sec_flou': {
    fr: 'Évaluation des études secondaires hors Canada floue',
    en: 'Evaluation of secondary studies outside Canada blurred'
  },
  'ev_sec_incomp': {
    fr: 'Évaluation des études secondaires hors Canada incomplète',
    en: 'Evaluation of secondary studies outside Canada incomplete'
  },
  'ev_sec_inexist': {
    fr: 'Aucune évaluation des études secondaires hors Canada au dossier',
    en: 'No evaluation of secondary studies outside Canada on file'
  },
  'ev_sec_maj': {
    fr: 'Mise à jour de l’évaluation des études secondaires hors Canada',
    en: 'Evaluation of secondary studies outside Canada update requested'
  },
  'ev_postsec_flou': {
    fr: 'Évaluation des études postsecondaires hors Canada floue',
    en: 'Evaluation of post-secondary studies outside Canada blurred'
  },
  'ev_postsec_incomp': {
    fr: 'Évaluation des études postsecondaires hors Canada incomplète',
    en: 'Evaluation of post-secondary studies outside Canada incomplete'
  },
  'ev_postsec_inexist': {
    fr: 'Aucune évaluation des études postsecondaires hors Canada au dossier',
    en: 'No evaluation of post-secondary studies outside Canada on file'
  },
  'ev_postsec_maj': {
    fr: 'Mise à jour de l’évaluation des études postsecondaires hors Canada',
    en: 'Evaluation of post-secondary studies outside Canada update requested'
  },
  'ev_univ_flou': {
    fr: 'Évaluation des études universitaires hors Canada floue',
    en: 'Evaluation of university studies outside Canada blurred'
  },
  'ev_univ_incomp': {
    fr: 'Évaluation des études universitaires hors Canada incomplète',
    en: 'Evaluation of university studies outside Canada incomplete'
  },
  'ev_univ_inexist': {
    fr: 'Aucune évaluation des études universitaires hors Canada au dossier',
    en: 'No evaluation of university studies outside Canada on file'
  },
  'ev_univ_maj': {
    fr: 'Mise à jour de l’évaluation des études universitaires hors Canada',
    en: 'Evaluation of university studies outside Canada update requested'
  },

  // Identity & Citizenship
  'id_floue': {
    fr: 'Pièce d’identité avec photo floue',
    en: 'Photo ID blurred'
  },
  'id_incomp': {
    fr: 'Pièce d’identité avec photo incomplète',
    en: 'Photo ID incomplete'
  },
  'id_expire': {
    fr: 'Pièce d’identité avec photo est expirée',
    en: 'Photo ID expired'
  },
  'id_inexist': {
    fr: 'Aucune pièce d’identité avec photo au dossier',
    en: 'No photo ID on file'
  },
  'id_recto_verso': {
    fr: 'Recto-verso manquant sur la pièce d’identité',
    en: 'Front/back missing on photo ID'
  },
  'id_maj': {
    fr: 'Mise à jour de la pièce d’identité avec photo',
    en: 'Photo ID update requested'
  },
  'naiss_floue': {
    fr: 'Certificat de naissance flou',
    en: 'Birth certificate blurred'
  },
  'naiss_incomp': {
    fr: 'Certificat de naissance incomplet',
    en: 'Birth certificate incomplete'
  },
  'naiss_recto_verso': {
    fr: 'Recto-verso manquant sur le certificat de naissance',
    en: 'Front/back missing on birth certificate'
  },
  'naiss_inexist': {
    fr: 'Aucun certificat de naissance au dossier',
    en: 'No birth certificate on file'
  },
  'naiss_maj': {
    fr: 'Mise à jour du certificat de naissance',
    en: 'Birth certificate update requested'
  },
  'naiss_parents': {
    fr: 'Certificat de naissance sans le nom des parents',
    en: 'Birth certificate without parents’ names'
  },
  'selfie_flou': {
    fr: 'Égoportrait (selfie) flou',
    en: 'Selfie blurred'
  },
  'selfie_incomp': {
    fr: 'Égoportrait (selfie) non conforme',
    en: 'Selfie non-compliant'
  },
  'selfie_inexist': {
    fr: 'Aucun égoportrait (selfie) au dossier',
    en: 'No selfie on file'
  },
  'selfie_maj': {
    fr: 'Mise à jour de l’égoportrait (selfie)',
    en: 'Selfie update requested'
  },
  'cit_floue': {
    fr: 'Preuve de citoyenneté floue',
    en: 'Proof of citizenship blurred'
  },
  'cit_incomp': {
    fr: 'Preuve de citoyenneté incomplète',
    en: 'Proof of citizenship incomplete'
  },
  'cit_recto_verso': {
    fr: 'Recto-verso manquant sur la preuve de citoyenneté',
    en: 'Front/back missing on proof of citizenship'
  },
  'cit_inexist': {
    fr: 'Aucune preuve de citoyenneté au dossier',
    en: 'No proof of citizenship on file'
  },
  'cit_maj': {
    fr: 'Mise à jour de la preuve de citoyenneté',
    en: 'Proof of citizenship update requested'
  },
  'rp_floue': {
    fr: 'Carte de résident permanent floue',
    en: 'Permanent resident card blurred'
  },
  'rp_incomp': {
    fr: 'Carte de résident permanent incomplète',
    en: 'Permanent resident card incomplete'
  },
  'rp_recto_verso': {
    fr: 'Recto-verso manquant sur la carte de résident permanent',
    en: 'Front/back missing on permanent resident card'
  },
  'rp_inexist': {
    fr: 'Aucune carte de résident permanent au dossier',
    en: 'No permanent resident card on file'
  },
  'rp_maj': {
    fr: 'Mise à jour de la carte de résident permanent',
    en: 'Permanent resident card update requested'
  },
  'csq_floue': {
    fr: 'Certificat de sélection du Québec flou',
    en: 'Quebec Selection Certificate (CSQ) blurred'
  },
  'csq_incomp': {
    fr: 'Certificat de sélection du Québec incomplet',
    en: 'Quebec Selection Certificate (CSQ) incomplete'
  },
  'csq_inexist': {
    fr: 'Aucun certificat de sélection du Québec au dossier',
    en: 'No Quebec Selection Certificate (CSQ) on file'
  },
  'csq_maj': {
    fr: 'Mise à jour du certificat de sélection du Québec',
    en: 'Quebec Selection Certificate (CSQ) update requested'
  },
  'conjoint_fait_flou': {
    fr: 'Preuve de conjoint de fait floue',
    en: 'Proof of common-law partnership blurred'
  },
  'conjoint_fait_incomp': {
    fr: 'Preuve de conjoint de fait incomplète',
    en: 'Proof of common-law partnership incomplete'
  },
  'conjoint_fait_inexist': {
    fr: 'Aucune preuve de conjoint de fait au dossier',
    en: 'No proof of common-law partnership on file'
  },
  'conjoint_fait_maj': {
    fr: 'Mise à jour de la preuve de conjoint de fait',
    en: 'Proof of common-law partnership update requested'
  },

  // Security & Forms
  'emp_sig_parent': {
    fr: "Aucune signature d'un parent à la partie H du DND 2170",
    en: 'No parent signature in Part H of DND 2170'
  },
  'emp_nom_parent': {
    fr: "La signature à la partie H du DND 2170 ne correspond pas aux noms des parent sur le certificat de naissance, vérification supplémentaire requise du consentement parental. Courriel pour qu'un parent contacte un centre de recrutement envoyé.",
    en: 'Signature in Part H of DND 2170 does not match parent names on birth certificate; additional verification of parental consent required. Email sent requesting parent contact recruiting centre.'
  },
  'par_id_floue': {
    fr: 'Pièce d’identité du parent ou tuteur légal floue',
    en: 'Parent/guardian ID blurred'
  },
  'par_id_expire': {
    fr: 'Pièce d’identité du parent ou tuteur légal est expirée',
    en: 'Parent/guardian ID is expired'
  },
  'par_id_inexist': {
    fr: 'Aucune pièce d’identité du parent ou tuteur légal au dossier',
    en: 'No parent/guardian ID on file'
  },
  'par_id_maj': {
    fr: 'Mise à jour de la pièce d’identité du parent ou tuteur légal',
    en: 'Parent/guardian ID update requested'
  },
  'par_selfie_flou': {
    fr: 'Égoportrait (selfie) du parent ou tuteur légal flou',
    en: 'Parent/guardian selfie blurred'
  },
  'par_selfie_incomp': {
    fr: 'Égoportrait (selfie) du parent ou tuteur légal non conforme',
    en: 'Parent/guardian selfie non-compliant'
  },
  'par_selfie_inexist': {
    fr: 'Aucun égoportrait (selfie) du parent ou tuteur légal au dossier',
    en: 'No parent/guardian selfie on file'
  },
  'par_selfie_maj': {
    fr: 'Mise à jour de l’égoportrait (selfie) du parent ou tuteur légal',
    en: 'Parent/guardian selfie update requested'
  },
  'sec_floue': {
    fr: 'Formulaire d’enquête de sécurité flou',
    en: 'Security screening form blurred'
  },
  'sec_incomp': {
    fr: 'Formulaire d’enquête de sécurité incomplet',
    en: 'Security screening form incomplete'
  },
  'sec_inexist': {
    fr: 'Aucun formulaire d’enquête de sécurité au dossier',
    en: 'No security screening form on file'
  },
  'sec_maj': {
    fr: 'Mise à jour du formulaire d’enquête de sécurité',
    en: 'Security screening form update requested'
  },
  'sec_info_manq': {
    fr: 'Informations manquantes sur le formulaire de sécurité',
    en: 'Missing information on security screening form'
  },
  'sec_sig_manq': {
    fr: 'Signature manquante sur le formulaire de sécurité',
    en: 'Missing signature on security screening form'
  },
  'hab_floue': {
    fr: 'Formulaire d’habilitation de sécurité flou',
    en: 'Security clearance form blurred'
  },
  'hab_incomp': {
    fr: 'Formulaire d’habilitation de sécurité incomplet',
    en: 'Security clearance form incomplete'
  },
  'hab_inexist': {
    fr: 'Aucun formulaire d’habilitation de sécurité au dossier',
    en: 'No security clearance form on file'
  },
  'hab_maj': {
    fr: 'Mise à jour du formulaire d’habilitation de sécurité',
    en: 'Security clearance form update requested'
  },
  'hab_info_manq': {
    fr: 'Informations manquantes sur le formulaire d’habilitation',
    en: 'Missing information on security clearance form'
  },
  'hab_sig_manq': {
    fr: 'Signature manquante sur le formulaire d’habilitation',
    en: 'Missing signature on security clearance form'
  },
  'pre_enr_floue': {
    fr: 'Formulaire de pré-enrôlement flou',
    en: 'Pre-enrolment form blurred'
  },
  'pre_enr_incomp': {
    fr: 'Formulaire de pré-enrôlement incomplet',
    en: 'Pre-enrolment form incomplete'
  },
  'pre_enr_inexist': {
    fr: 'Aucun formulaire de pré-enrôlement au dossier',
    en: 'No pre-enrolment form on file'
  },
  'pre_enr_maj': {
    fr: 'Mise à jour du formulaire de pré-enrôlement',
    en: 'Pre-enrolment form update requested'
  },
  'pre_enr_info_manq': {
    fr: 'Informations manquantes sur le formulaire de pré-enrôlement',
    en: 'Missing information on pre-enrolment form'
  },
  'pre_enr_sig_manq': {
    fr: 'Signature manquante sur le formulaire de pré-enrôlement',
    en: 'Missing signature on pre-enrolment form'
  },
  'verif_cred_floue': {
    fr: 'Formulaire de vérification de crédit flou',
    en: 'Credit check form blurred'
  },
  'verif_cred_incomp': {
    fr: 'Formulaire de vérification de crédit incomplet',
    en: 'Credit check form incomplete'
  },
  'verif_cred_inexist': {
    fr: 'Aucun formulaire de vérification de crédit au dossier',
    en: 'No credit check form on file'
  },
  'verif_cred_maj': {
    fr: 'Mise à jour du formulaire de vérification de crédit',
    en: 'Credit check form update requested'
  },
  'verif_cred_info_manq': {
    fr: 'Informations manquantes sur le formulaire de crédit',
    en: 'Missing information on credit check form'
  },
  'verif_cred_sig_manq': {
    fr: 'Signature manquante sur le formulaire de crédit',
    en: 'Missing signature on credit check form'
  },
  'casier_flou': {
    fr: 'Vérification de casier judiciaire floue',
    en: 'Criminal record check blurred'
  },
  'casier_incomp': {
    fr: 'Vérification de casier judiciaire incomplète',
    en: 'Criminal record check incomplete'
  },
  'casier_inexist': {
    fr: 'Aucune vérification de casier judiciaire au dossier',
    en: 'No criminal record check on file'
  },
  'casier_maj': {
    fr: 'Mise à jour de la vérification de casier judiciaire',
    en: 'Criminal record check update requested'
  },
  'casier_info_manq': {
    fr: 'Informations manquantes sur le casier judiciaire',
    en: 'Missing information on criminal record check'
  },
  'casier_sig_manq': {
    fr: 'Signature manquante sur le casier judiciaire',
    en: 'Missing signature on criminal record check'
  },

  // Medical & Additional Docs
  'med_expire': {
    fr: 'Questionnaire sur les médicaments expiré',
    en: 'Medication questionnaire expired'
  },
  'med_incomp': {
    fr: 'QD mal rempli',
    en: 'Medication questionnaire improperly completed'
  },
  'med_inexist': {
    fr: 'Aucun QD au dossier',
    en: 'No medication questionnaire on file'
  },
  'med_no_res': {
    fr: "Le tâche du QD est complétée mais il n'y a pas de résultat au dossier",
    en: 'Medication questionnaire task completed but no result recorded on file'
  },
  'med_prescrits': {
    fr: 'Médicaments prescrits inclus dans le QD en vente libre',
    en: 'Prescription medications included in OTC questionnaire'
  },
  'med_maj': {
    fr: 'Mise à jour du questionnaire sur les médicaments',
    en: 'Medication questionnaire update requested'
  },
  'triage_med_requis': {
    fr: 'Triage médical requis suite aux questionnaires',
    en: 'Medical triage required following questionnaires'
  },
  'doc_supp_flou': {
    fr: 'Document supplémentaire flou',
    en: 'Additional document blurred'
  },
  'doc_supp_incomp': {
    fr: 'Document supplémentaire incomplet',
    en: 'Additional document incomplete'
  },
  'doc_supp_inexist': {
    fr: 'Aucun document supplémentaire au dossier',
    en: 'No additional document on file'
  },
  'doc_supp_maj': {
    fr: 'Mise à jour du document supplémentaire',
    en: 'Additional document update requested'
  },
  // Diplomas, evaluations, and transcripts
  'dipl_flou': {
    fr: 'Diplômes et certificats flous',
    en: 'Diplomas and certificates blurred'
  },
  'dipl_photocopie': {
    fr: 'Diplômes et certificats est une photocopie',
    en: 'Diplomas and certificates is a photocopy'
  },
  'dipl_inexist': {
    fr: 'Aucun diplômes ou certificats au dossier',
    en: 'No diplomas or certificates on file'
  },
  'dipl_incomplet': {
    fr: 'Diplômes et certificats incomplets',
    en: 'Diplomas and certificates incomplete'
  },
  'dipl_maj': {
    fr: 'Mise à jour des diplômes et certificats',
    en: 'Diplomas and certificates update requested'
  },
  'eval_flou': {
    fr: 'Évaluation comparative floue',
    en: 'Comparative evaluation blurred'
  },
  'eval_incomp': {
    fr: 'Évaluation comparative incomplète',
    en: 'Comparative evaluation incomplete'
  },
  'eval_inexist': {
    fr: 'Aucune évaluation comparative au dossier',
    en: 'No comparative evaluation on file'
  },
  'eval_etrang': {
    fr: 'Relevé de note étranger non accepté, doit envoyer une évaluation comparative',
    en: 'Foreign transcript not accepted, comparative evaluation required'
  },
  'eval_trad': {
    fr: 'Traduction du relevé de note étranger non acceptée, doit envoyer une évaluation comparative',
    en: 'Translation of foreign transcript not accepted, comparative evaluation required'
  },
  'eval_non_officiel': {
    fr: 'Évaluation comparative non officielle',
    en: 'Comparative evaluation unofficial'
  },
  'eval_maj': {
    fr: "Mise à jour de l'évaluation comparative",
    en: 'Comparative evaluation update requested'
  },
  'relev_etrang_trad_flou': {
    fr: "Relevé de notes d'études à l'étranger traduit flou",
    en: 'Translated foreign study transcript blurred'
  },
  'relev_etrang_trad_incomp': {
    fr: "Relevé de notes d'études à l'étranger traduit incomplet",
    en: 'Translated foreign study transcript incomplete'
  },
  'relev_etrang_trad_inexist': {
    fr: "Aucun relevé de notes d'études à l'étranger traduit au dossier",
    en: 'No translated foreign study transcript on file'
  },
  'relev_etrang_trad_non_trad': {
    fr: "Relevé de notes d'études à l'étranger non traduit",
    en: 'Foreign study transcript not translated'
  },
  'relev_etrang_trad_eval_comp': {
    fr: "Évaluation comparative requise pour le relevé étranger",
    en: 'Comparative evaluation required for foreign transcript'
  },
  'educ_aens_sans_releve': {
    fr: "Diplôme d'AENS sans le relevé de note",
    en: 'AENS diploma without transcript'
  },
  'educ_non_admissible': {
    fr: "N'a pas les critères académiques de base",
    en: 'Does not meet basic academic criteria'
  },
  'educ_doc_invalide': {
    fr: "Document soumis n'est pas un document scolaire valide",
    en: 'Submitted document is not a valid academic document'
  },
  'educ_tdg': {
    fr: 'Test de développement général (TDG) soumis, refusé. Doit avoir 24 crédits, DEP ou AENS',
    en: 'General Development Test (GDT) submitted, rejected. Must have 24 credits, DVS or AENS'
  },
  'educ_aec': {
    fr: "Une AEC a été soumise, ce qui n'est pas un document scolaire accepté",
    en: 'An ACS was submitted, which is not an accepted academic document'
  },
  'educ_master_need_bachelor': {
    fr: 'Maîtrise soumise au lieu du Baccalauréat ou secondaire',
    en: "Master's degree submitted instead of Bachelor's degree or High School"
  },
  'educ_cert_submitted': {
    fr: 'Certificat soumis au lieu du Baccalauréat ou secondaire',
    en: 'Certificate submitted instead of Bachelor or High School'
  },
  'relev_ecole': {
    fr: 'Relevé de note de l’école non acceptés, doit téléverser le relevé d’apprentissage du ministère',
    en: 'School report card not accepted, ministry transcript required'
  },

  // Selfie ID
  'selfie_floue': {
    fr: 'Égoportrait (Selfie) avec pièce d’identité flou',
    en: 'Selfie with ID blurred'
  },
  'selfie_mauvaise': {
    fr: "La pièce d'identité utilisée dans l'égoportrait (selfie) n'est pas la bonne",
    en: 'Wrong ID used in selfie'
  },
  'selfie_inexistant': {
    fr: "Aucun égoportrait (selfie) avec pièce d'identité au dossier",
    en: 'No selfie with ID on file'
  },
  'selfie_incomplet': {
    fr: 'Égoportrait (Selfie) avec pièce d’identité incomplet',
    en: 'Selfie with ID incomplete'
  },

  // Driver License
  'pc_floue': {
    fr: "Pièce d'identité floue",
    en: "Driver's license blurred"
  },
  'pc_expire': {
    fr: "Pièce d'identité expirée",
    en: "Driver's license expired"
  },
  'pc_verso': {
    fr: "Verso manquant de la pièce d'identité",
    en: "Back side of driver's license missing"
  },
  'pc_noir_blanc': {
    fr: "Pièce d'identité en noir et blanc",
    en: "Driver's license in black and white"
  },
  'pc_incomplet': {
    fr: 'Permis de conduire incomplet',
    en: "Driver's license incomplete"
  },
  'pc_maj': {
    fr: 'Mise à jour du permis de conduire',
    en: "Driver's license update requested"
  },

  // Health Card (RAMQ)
  'ramq_floue': {
    fr: "Pièce d'identité floue",
    en: 'Health insurance card blurred'
  },
  'ramq_expire': {
    fr: "Pièce d'identité expirée",
    en: 'Health insurance card expired'
  },
  'ramq_verso': {
    fr: "Verso manquant de la pièce d'identité",
    en: 'Back side of health insurance card missing'
  },
  'ramq_ontario': {
    fr: "Carte d'assurance maladie de l'Ontario non acceptée comme pièce d'identité",
    en: 'Ontario health card not accepted as ID'
  },
  'ramq_noir_blanc': {
    fr: "Pièce d'identité en noir et blanc",
    en: 'Health insurance card in black and white'
  },
  'ramq_incomplet': {
    fr: "Carte d'assurance maladie incomplète",
    en: 'Health insurance card incomplete'
  },
  'ramq_maj': {
    fr: "Mise à jour de la carte d'assurance maladie",
    en: 'Health insurance card update requested'
  },

  // Passport
  'pass_floue': {
    fr: "Pièce d'identité floue",
    en: 'Passport blurred'
  },
  'pass_expire': {
    fr: "Pièce d'identité expirée",
    en: 'Passport expired'
  },
  'pass_noir_blanc': {
    fr: "Pièce d'identité en noir et blanc",
    en: 'Passport in black and white'
  },
  'pass_incomplet': {
    fr: 'Passeport incomplet',
    en: 'Passport incomplete'
  },
  'pass_maj': {
    fr: 'Mise à jour du passeport',
    en: 'Passport update requested'
  },

  // Other Official ID
  'autre_floue': {
    fr: "Pièce d'identité floue",
    en: 'Official ID blurred'
  },
  'autre_expire': {
    fr: "Pièce d'identité expirée",
    en: 'Official ID expired'
  },
  'autre_verso': {
    fr: "Verso manquant de la pièce d'identité",
    en: 'Back side of official ID missing'
  },
  'autre_non_officiel': {
    fr: "La pièce d'identité au dossier n'est pas acceptée comme pièce officielle",
    en: 'The ID on file is not accepted as an official ID'
  },
  'autre_noir_blanc': {
    fr: "Pièce d'identité en noir et blanc",
    en: 'Official ID in black and white'
  },
  'autre_incomplet': {
    fr: "Pièce d'identité incomplète",
    en: 'Official ID incomplete'
  },
  'autre_maj': {
    fr: "Mise à jour de la pièce d'identité",
    en: 'Official ID update requested'
  },
  'id_invalide_autre': {
    fr: "Document soumis n'est pas une pièce d'identité valide",
    en: 'Submitted document is not a valid ID'
  },
  'id_invalide_rp': {
    fr: "La carte de résident permanent n'est pas une pièce d'identité acceptée.",
    en: 'Permanent Resident Card is not an accepted piece of ID'
  },

  // Birth Certificate
  'naiss_incomplet': {
    fr: 'Certificat de naissance incomplet',
    en: 'Birth certificate incomplete'
  },
  'naiss_verso': {
    fr: 'Verso manquant du certificat de naissance',
    en: 'Missing back side of the birth certificate'
  },
  'naiss_photocopie': {
    fr: 'Certificat de naissance est une photocopie',
    en: 'Birth certificate is a photocopy'
  },

  // Citizenship Certificate & Card
  'cit_p1': {
    fr: 'Il manque la première page du certificat de citoyenneté',
    en: 'First page of citizenship certificate missing'
  },
  'cit_p2': {
    fr: 'Il manque la deuxième page du certificat de citoyenneté',
    en: 'Second page of citizenship certificate missing'
  },
  'cit_incomplet': {
    fr: 'Certificat de citoyenneté incomplet',
    en: 'Citizenship certificate incomplete'
  },
  'cc_floue': {
    fr: 'Carte de citoyenneté floue',
    en: 'Citizenship card blurred'
  },
  'cc_verso': {
    fr: 'Verso manquant de la carte de citoyenneté',
    en: 'Back side of citizenship card missing'
  },
  'cc_incomplet': {
    fr: 'Carte de citoyenneté incomplète',
    en: 'Citizenship card incomplete'
  },
  'cc_maj': {
    fr: 'Mise à jour de la carte de citoyenneté',
    en: 'Citizenship card update requested'
  },

  // Permanent Resident Card
  'pr_floue': {
    fr: 'Carte de résident permanent floue',
    en: 'Permanent Resident card blurred'
  },
  'pr_expire': {
    fr: 'Carte de résident permanent expirée',
    en: 'Permanent Resident card expired'
  },
  'pr_verso': {
    fr: 'Verso manquant de la carte de résident permanent',
    en: 'Back side of Permanent Resident card missing'
  },
  'pr_incomplet': {
    fr: 'Carte de résident permanent incomplète',
    en: 'Permanent Resident card incomplete'
  },
  'pr_maj': {
    fr: 'Mise à jour de la carte de résident permanent',
    en: 'Permanent Resident card update requested'
  },

  // Invalid Citizenship Documents
  'cit_invalide_passeport': {
    fr: 'Le passeport ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP',
    en: 'Passport does not prove citizenship. Must provide birth certificate, citizenship certificate/card or PR card'
  },
  'cit_invalide_permis': {
    fr: 'Le permis de conduire ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP',
    en: "Driver's license does not prove citizenship. Must provide birth certificate, citizenship certificate/card or PR card"
  },
  'cit_invalide_ramq': {
    fr: "La carte d'assurance maladie ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
    en: 'Health insurance card does not prove citizenship. Must provide birth certificate, citizenship certificate/card or PR card'
  },
  'cit_invalide_acte_naissance': {
    fr: "La copie d'acte de naissance ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
    en: 'Statement of Live Birth does not prove citizenship. Must provide birth certificate, citizenship certificate/card or PR card'
  },
  'cit_invalide_confirmation_rp': {
    fr: "La confirmation de résidence permanente n'est pas acceptée. Doit fournir une carte de résident permanent.",
    en: 'Confirmation of Permanent Residence is not accepted. Must provide Permanent Resident card.'
  },
  'cit_invalide_naissance_etranger': {
    fr: "L'acte de naissance étranger ne prouve pas la citoyenneté. Doit fournir un certificat/carte de citoyenneté ou carte RP",
    en: 'Foreign birth certificate does not prove citizenship. Must provide citizenship certificate/card or PR card'
  },
  'cit_invalide_visa': {
    fr: 'Le visa ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP',
    en: 'Visa does not prove citizenship. Must provide birth certificate, citizenship certificate/card or PR card'
  },
  'cit_invalide_bapteme': {
    fr: 'Le certificat de baptême ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP',
    en: 'Baptism certificate does not prove citizenship. Must provide birth certificate, citizenship certificate/card or PR card'
  },
  'cit_invalide_permis_travail': {
    fr: 'Le permis de travail ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP',
    en: 'Work permit does not prove citizenship. Must provide birth certificate, citizenship certificate/card or PR card'
  },
  'cit_invalide_asile': {
    fr: "L'avis de décision d'une demande d'asile ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
    en: 'Refugee protection decision notice does not prove citizenship. Must provide birth certificate, citizenship certificate/card or PR card'
  },

  // Minor / Parent ID
  'par_selfie_floue': {
    fr: 'Photo du parent ou tuteur légal tenant sa pièce d’identité floue',
    en: 'Photo of parent or legal guardian holding their ID blurred'
  },
  'par_selfie_mauvais': {
    fr: 'Photo du parent ou tuteur légal tenant une mauvaise pièce d’identité',
    en: 'Photo of parent or legal guardian holding incorrect ID'
  },
  'parent_doc_invalide': {
    fr: "Document soumis n'est pas valide pour le consentement parental",
    en: 'Submitted document is not valid for parental consent'
  },

  // Security & Application forms
  'sec_expire': {
    fr: 'DND 2977 expiré',
    en: 'DND 2977 expired'
  },
  'sec_doc_invalide': {
    fr: 'Mauvais document soumis à la place du formulaire de sécurité',
    en: 'Wrong document submitted instead of security clearance form'
  },
  'emp_expire': {
    fr: "Formulaire de demande d'emploi expiré",
    en: 'Employment application form expired'
  },
  'emp_incomp': {
    fr: 'DND 2170 incomplet',
    en: 'DND 2170 incomplete'
  },
  'emp_inexist': {
    fr: 'Aucun DND2170 au dossier',
    en: 'No DND 2170 on file'
  },
  'emp_sig_i': {
    fr: 'Manque la signature à la partie I du DND 2170',
    en: 'Signature missing on Part I of DND 2170'
  },
  'emp_sig_j': {
    fr: 'Manque la signature à la partie J du DND 2170',
    en: 'Signature missing on Part J of DND 2170'
  },
  'emp_case_j': {
    fr: "N'a pas coché la case à la partie J du DND 2170",
    en: 'Box not checked on Part J of DND 2170'
  },
  'emp_doc_invalide': {
    fr: "Mauvais document soumis à la place du formulaire de demande d'emploi",
    en: 'Wrong document submitted instead of employment application form'
  },

  // SEAF & IPTAD
  'seaf_incomp': {
    fr: 'SEAF incomplet',
    en: 'SEAF incomplete'
  },
  'seaf_inexist': {
    fr: 'Aucun SEAF au dossier',
    en: 'No SEAF on file'
  },
  'seaf_no_res': {
    fr: "Le SEAF a été complété mais il n'y a pas de résultat au dossier",
    en: 'SEAF completed but no result recorded on file'
  },
  'seaf_maj': {
    fr: "Mise à jour du formulaire de demande d'emploi notée",
    en: 'Scored employment application form update requested'
  },
  'seaf_doc_invalide': {
    fr: "Mauvais document soumis pour l'évaluation",
    en: 'Wrong document submitted for assessment'
  },
  'pers_incomp': {
    fr: 'IP-TAD incomplet',
    en: 'IP-TAD incomplete'
  },
  'pers_inexist': {
    fr: 'Aucun IP-TAD au dossier',
    en: 'No IP-TAD on file'
  },
  'pers_no_res': {
    fr: "L'IP-TAD a été complété mais il n'y a pas de résultat au dossier",
    en: 'IP-TAD completed but no result recorded on file'
  },
  'pers_doc_invalide': {
    fr: "Mauvais document soumis pour l'évaluation",
    en: 'Wrong document submitted for assessment'
  },

  // Medical & Additional docs
  'med_doc_invalide': {
    fr: 'Mauvais document soumis pour le questionnaire sur les médicaments',
    en: 'Wrong document submitted for medication questionnaire'
  },
  'medq_inexist': {
    fr: 'Aucun questionnaire médical au dossier',
    en: 'No medical questionnaire on file'
  },
  'medq_doc_invalide': {
    fr: 'Mauvais document soumis pour le questionnaire médical',
    en: 'Wrong document submitted for medical questionnaire'
  },
  'medq_mauvais_format': {
    fr: 'Mauvais format de fichier pour le questionnaire médical (doit être PDF)',
    en: 'Wrong file format for medical questionnaire (must be PDF)'
  },
  'doc_supp_cv': {
    fr: 'CV récent à jour demandé',
    en: 'Recent up-to-date Curriculum Vitae (CV) requested'
  },
  'doc_supp_permis': {
    fr: "Permis d'exercice / licence professionnelle demandé",
    en: 'Unrestricted practice permit or professional license requested'
  },
  'doc_supp_membre_regle': {
    fr: 'Lettre de membre en règle demandée',
    en: 'Letter of good standing from professional regulatory body requested'
  },
  'doc_supp_certificat_specialite': {
    fr: 'Certificat de spécialité demandé',
    en: 'Official specialty certificate or attestation requested'
  },
  'doc_supp_preuve_experience': {
    fr: "Preuve d'expérience spécifique demandée",
    en: 'Proof of specific professional experience requested'
  },
  'doc_supp_releves_etrangers': {
    fr: 'Demande de relevés de notes étrangers',
    en: 'Official foreign transcripts requested'
  },
  'doc_supp_liberation_armee_etrangere': {
    fr: "Preuve de libération d'une armée étrangère demandée",
    en: 'Proof of release or end of service from a foreign military requested'
  },
  'doc_supp_service_anterieur_fac': {
    fr: 'Demande de vérification de service antérieur dans les FAC demandée',
    en: 'Verification of prior service in the CAF requested'
  },
  'doc_subv_admission': {
    fr: "Lettre d'admission dans un établissement scolaire demandée",
    en: 'Official letter of admission from an educational institution requested'
  },
};
