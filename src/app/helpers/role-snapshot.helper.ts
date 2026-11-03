import { RoleSnapshot, getTodayDateString } from "../models/app-role-snapshot.models";
import { DEFAULT_SIG_FR, DEFAULT_SIG_EN, DEFAULT_SIG_OTA_FR, DEFAULT_SIG_OTA_EN } from "../../services/shared-state.service";

export function createSnapshot(this: any): RoleSnapshot {
    return {
      stage: this.stage(),
      isUnderAge: this.isUnderAge(),
      allTasks: JSON.parse(JSON.stringify(this.allTasks())),
      selectedTask: this.selectedTask() ? JSON.parse(JSON.stringify(this.selectedTask())) : null,
      selectedRejectionKeys: new Set(this.selectedRejectionKeys()),
      taskNotCompletedKeys: new Set(this.taskNotCompletedKeys()),
      compliantDocKeys: new Set(this.compliantDocKeys()),
      collapsedGroups: new Set(this.collapsedGroups()),
      forceGeneralReminder: this.forceGeneralReminder(),
      selectedEmailBankTemplate: this.selectedEmailBankTemplate(),
      triageMedicalRequis: this.triageMedicalRequis(),
      selectedDossierJobId1: this.sharedState.selectedDossierJobId1(),
      selectedDossierJobId2: this.sharedState.selectedDossierJobId2(),
      selectedDossierJobId3: this.sharedState.selectedDossierJobId3(),
      searchDossierQuery1: this.sharedState.searchDossierQuery1(),
      searchDossierQuery2: this.sharedState.searchDossierQuery2(),
      searchDossierQuery3: this.sharedState.searchDossierQuery3(),
      dossierJobFailedCe1: this.sharedState.dossierJobFailedCe1(),
      dossierJobFailedCe2: this.sharedState.dossierJobFailedCe2(),
      dossierJobFailedCe3: this.sharedState.dossierJobFailedCe3(),
      testEcePassed: this.sharedState.testEcePassed(),
      testEceNotCompleted: this.sharedState.testEceNotCompleted(),
      testEsomPassed: this.sharedState.testEsomPassed(),
      testEsomNotCompleted: this.sharedState.testEsomNotCompleted(),
      testCeopmPassed: this.sharedState.testCeopmPassed(),
      testCeopmNotCompleted: this.sharedState.testCeopmNotCompleted(),
      testCspnPassed: this.sharedState.testCspnPassed(),
      testCspnNotCompleted: this.sharedState.testCspnNotCompleted(),
      testCspn00182Passed: this.sharedState.testCspn00182Passed(),
      testCspn00183Passed: this.sharedState.testCspn00183Passed(),
      testCspn00184Passed: this.sharedState.testCspn00184Passed(),
      includeLinkedEmail: this.sharedState.includeLinkedEmail(),
      reoMergedEmailHtml: this.sharedState.reoMergedEmailHtml(),
      reoMergedEmailPlain: this.sharedState.reoMergedEmailPlain(),
      reoMergedNote: this.sharedState.reoMergedNote(),
      premierContactCourriel: this.premierContactCourriel(),
      premierContactMedical: this.premierContactMedical(),
      premierContactEntrevue: this.premierContactEntrevue(),
      premierContactGambit: this.premierContactGambit(),
      premierContactPsps: this.premierContactPsps(),
      premierContactSelfie: this.premierContactSelfie(),
      premierContactIptad: this.premierContactIptad(),
      premierContactSeaf: this.premierContactSeaf(),
      premierContactSubPanelMode: this.premierContactSubPanelMode(),
      premierContactNoteIptad: this.premierContactNoteIptad(),
      premierContactNoteSeaf: this.premierContactNoteSeaf(),
      premierContactNoteEntrevue: this.premierContactNoteEntrevue(),
      premierContactNoteMedical: this.premierContactNoteMedical(),
      premierContactNotePsps: this.premierContactNotePsps(),
      premierContactNoteGambit: this.premierContactNoteGambit(),
      premierContactNoteAnxQ: this.premierContactNoteAnxQ(),
      avisFermetureCourriel: this.avisFermetureCourriel(),
      avisFermetureDelaiJours: this.avisFermetureDelaiJours(),
      avisFermetureDate: this.avisFermetureDate(),
      avisFermetureEntrevue: this.avisFermetureEntrevue(),
      avisFermetureMedicale: this.avisFermetureMedicale(),
      avisFermetureGambit: this.avisFermetureGambit(),
      avisFermeturePsps: this.avisFermeturePsps(),
      annexeQCourriel: this.annexeQCourriel(),
      annexeQAlphaPostulant: this.annexeQAlphaPostulant(),
      pforMatricule: this.pforMatricule(),
      evaluationMedicaleType: this.evaluationMedicaleType(),
      evaluationMedicalePartie1: this.evaluationMedicalePartie1(),
      evaluationMedicalePartie2: this.evaluationMedicalePartie2(),
      evaluationMedicalePartie1Et2: this.evaluationMedicalePartie1Et2(),
      offreNormaleChecked: this.offreNormaleChecked(),
      offreEtudesSubventionneesChecked: this.offreEtudesSubventionneesChecked(),
      offreLieuVille: this.offreLieuVille(),
      offreUniteAffectation: this.offreUniteAffectation(),
      offreMetier: this.offreMetier(),
      offreMetierSearchQuery: this.offreMetierSearchQuery(),
      offreProgrammeEnrolement: this.offreProgrammeEnrolement(),
      offreElement: this.offreElement(),
      offreDureeContrat: this.offreDureeContrat(),
      offreEtudesSubventionnees: this.offreEtudesSubventionnees(),
      offreDureeEtudesSubventionnees: this.offreDureeEtudesSubventionnees(),
      offreDateEnrolement: this.offreDateEnrolement(),
      offreHeureArriveePostulant: this.offreHeureArriveePostulant(),
      offreHeureArriveeInvites: this.offreHeureArriveeInvites(),
      offreLieuEnrolement: this.offreLieuEnrolement(),
      offreDateArriveeUnite: this.offreDateArriveeUnite(),
      offreElementsManquants: this.offreElementsManquants(),
      offreDateElementsManquants: this.offreDateElementsManquants(),
      offreSerieCours: this.offreSerieCours(),
      offreDateCoursDebut: this.offreDateCoursDebut(),
      offreDateCoursFin: this.offreDateCoursFin(),
      offreSubPanelMode: this.offreSubPanelMode(),
      noteStatutCivil: this.noteStatutCivil(),
      noteConjoint: this.noteConjoint(),
      noteConjointTexte: this.noteConjointTexte(),
      noteEnfantCount: this.noteEnfantCount(),
      noteEnfantDetails: this.noteEnfantDetails(),
      notePlaqueImm: this.notePlaqueImm(),
      noteBrisBail: this.noteBrisBail(),
      noteEntreposage: this.noteEntreposage(),
      noteSermentDeclaration: this.noteSermentDeclaration(),
      noteInviteMil: this.noteInviteMil(),
      noteInviteMilTexte: this.noteInviteMilTexte(),
      noteSvcMilAnt: this.noteSvcMilAnt(),
      noteBeneficiaire: this.noteBeneficiaire(),
      noteDateCourrielConfirmation: this.noteDateCourrielConfirmation(),
      testEsomRecruitmentCenterCity: this.testEsomRecruitmentCenterCity(),
      offreFormulairePpp: this.offreFormulairePpp(),
      offreFormulairePcu: this.offreFormulairePcu(),
      offreFormulaireCroixSouvenir: this.offreFormulaireCroixSouvenir(),
      offreFormulaireBeneficiaire: this.offreFormulaireBeneficiaire(),
      inapteMedicalGender: this.inapteMedicalGender(),
      inapteMedicalName: this.inapteMedicalName(),
      inapteMedicalAlpha: this.inapteMedicalAlpha(),
      recruiterDossierType: this.recruiterDossierType(),
      sgtCheckedInstructions: Array.from(this.sgtCheckedInstructions()),
    };
  }

export function applySnapshot(this: any, snapshot: RoleSnapshot) {
    this.stage.set(snapshot.stage);
    this.isUnderAge.set(snapshot.isUnderAge);
    this.recruiterDossierType.set(snapshot.recruiterDossierType || 'normal');
    this.allTasks.set(snapshot.allTasks);
    this.selectedTask.set(snapshot.selectedTask);
    this.selectedRejectionKeys.set(new Set(snapshot.selectedRejectionKeys));
    this.taskNotCompletedKeys.set(new Set(snapshot.taskNotCompletedKeys));
    this.compliantDocKeys.set(new Set(snapshot.compliantDocKeys));
    this.collapsedGroups.set(new Set(snapshot.collapsedGroups));
    this.selectedEmailBankTemplate.set(snapshot.selectedEmailBankTemplate || (snapshot.forceGeneralReminder ? 'general_reminder' : ''));
    this.triageMedicalRequis.set(snapshot.triageMedicalRequis || false);

    if (snapshot.evaluationMedicaleType) {
      this.evaluationMedicaleType.set(snapshot.evaluationMedicaleType);
    }
    this.sgtCheckedInstructions.set(new Set(snapshot.sgtCheckedInstructions || []));
    this.premierContactCourriel.set(snapshot.premierContactCourriel || false);
    this.premierContactMedical.set(snapshot.premierContactMedical || false);
    this.premierContactEntrevue.set(snapshot.premierContactEntrevue || false);
    this.premierContactGambit.set(snapshot.premierContactGambit || false);
    this.premierContactPsps.set(snapshot.premierContactPsps || false);
    this.premierContactSelfie.set(snapshot.premierContactSelfie || false);
    this.premierContactIptad.set(snapshot.premierContactIptad || false);
    this.premierContactSeaf.set(snapshot.premierContactSeaf || false);
    this.premierContactSubPanelMode.set(snapshot.premierContactSubPanelMode || 'courriel');
    this.premierContactNoteIptad.set(snapshot.premierContactNoteIptad || 'Complété');
    this.premierContactNoteSeaf.set(snapshot.premierContactNoteSeaf || 'Complété');
    this.premierContactNoteEntrevue.set(snapshot.premierContactNoteEntrevue || 'À faire');
    this.premierContactNoteMedical.set(snapshot.premierContactNoteMedical || 'À faire');
    this.premierContactNotePsps.set(snapshot.premierContactNotePsps || 'À faire');
    this.premierContactNoteGambit.set(snapshot.premierContactNoteGambit || 'En attente (type 28)');
    this.premierContactNoteAnxQ.set(snapshot.premierContactNoteAnxQ || 'À faire');

    this.avisFermetureCourriel.set(snapshot.avisFermetureCourriel || false);
    this.avisFermetureDelaiJours.set(snapshot.avisFermetureDelaiJours || '14');
    this.avisFermetureDate.set(snapshot.avisFermetureDate || '');
    this.avisFermetureEntrevue.set(snapshot.avisFermetureEntrevue || false);
    this.avisFermetureMedicale.set(snapshot.avisFermetureMedicale || false);
    this.avisFermetureGambit.set(snapshot.avisFermetureGambit || false);
    this.avisFermeturePsps.set(snapshot.avisFermeturePsps || false);

    this.annexeQCourriel.set(snapshot.annexeQCourriel || false);
    this.annexeQAlphaPostulant.set(snapshot.annexeQAlphaPostulant || '');
    this.pforMatricule.set(snapshot.pforMatricule || '');

    this.evaluationMedicalePartie1.set(snapshot.evaluationMedicalePartie1 || false);
    this.evaluationMedicalePartie2.set(snapshot.evaluationMedicalePartie2 || false);
    this.evaluationMedicalePartie1Et2.set(snapshot.evaluationMedicalePartie1Et2 || false);

    const isOta = (snapshot.evaluationMedicaleType || this.evaluationMedicaleType()) === 'Dossier OTA';
    const savedVille = (typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_ville')) || 'Québec';
    const villeToSet = isOta ? 'Montréal' : (snapshot.offreLieuVille || savedVille);
    const centerObj = this.recruitmentCentersList.find(c => c.city === villeToSet) || this.recruitmentCentersList[0];

    this.offreNormaleChecked.set(snapshot.offreNormaleChecked || false);
    this.offreEtudesSubventionneesChecked.set(snapshot.offreEtudesSubventionneesChecked || false);
    this.offreLieuVille.set(villeToSet);
    this.offreUniteAffectation.set(snapshot.offreUniteAffectation || 'st-jean');
    this.offreMetier.set(snapshot.offreMetier || '');
    this.offreMetierSearchQuery.set(snapshot.offreMetierSearchQuery || '');
    this.offreProgrammeEnrolement.set(snapshot.offreProgrammeEnrolement || '');
    this.offreElement.set(snapshot.offreElement || '');
    this.offreDureeContrat.set(snapshot.offreDureeContrat || '');
    this.offreEtudesSubventionnees.set(snapshot.offreEtudesSubventionnees || '');
    this.offreDureeEtudesSubventionnees.set(snapshot.offreDureeEtudesSubventionnees || '');
    this.offreDateEnrolement.set(snapshot.offreDateEnrolement || '');
    this.offreHeureArriveePostulant.set(snapshot.offreHeureArriveePostulant || (typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_postulant')) || '8h00');
    this.offreHeureArriveeInvites.set(snapshot.offreHeureArriveeInvites || (typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_invites')) || (snapshot.offreEtudesSubventionneesChecked ? '9h45' : '10h00'));
    this.offreLieuEnrolement.set(snapshot.offreLieuEnrolement || centerObj.fullFr);
    this.offreDateArriveeUnite.set(snapshot.offreDateArriveeUnite || '');
    this.offreElementsManquants.set(snapshot.offreElementsManquants || 'Spécimen de chèque');
    this.offreDateElementsManquants.set(snapshot.offreDateElementsManquants || '');
    this.offreSerieCours.set(snapshot.offreSerieCours || '');
    this.offreDateCoursDebut.set(snapshot.offreDateCoursDebut || '');
    this.offreDateCoursFin.set(snapshot.offreDateCoursFin || '');
    this.offreSubPanelMode.set(snapshot.offreSubPanelMode || 'courriel');
    this.noteStatutCivil.set(snapshot.noteStatutCivil || 'célibataire');
    this.noteConjoint.set(snapshot.noteConjoint || 'N/A');
    this.noteConjointTexte.set(snapshot.noteConjointTexte || '');
    this.noteEnfantCount.set(snapshot.noteEnfantCount || '0');
    this.noteEnfantDetails.set(snapshot.noteEnfantDetails || []);
    this.notePlaqueImm.set(snapshot.notePlaqueImm || '');
    this.noteBrisBail.set(snapshot.noteBrisBail || 'N/A');
    this.noteEntreposage.set(snapshot.noteEntreposage || 'N/A');
    this.noteSermentDeclaration.set(snapshot.noteSermentDeclaration || 'Serment');
    this.noteInviteMil.set(snapshot.noteInviteMil || 'N/A');
    this.noteInviteMilTexte.set(snapshot.noteInviteMilTexte || '');
    this.noteSvcMilAnt.set(snapshot.noteSvcMilAnt || 'N/A');
    this.noteBeneficiaire.set(snapshot.noteBeneficiaire || '');
    this.noteDateCourrielConfirmation.set(snapshot.noteDateCourrielConfirmation || '');
    this.testEsomRecruitmentCenterCity.set(snapshot.testEsomRecruitmentCenterCity || 'Québec');
    this.offreFormulairePpp.set(snapshot.offreFormulairePpp || false);
    this.offreFormulairePcu.set(snapshot.offreFormulairePcu || false);
    this.offreFormulaireCroixSouvenir.set(snapshot.offreFormulaireCroixSouvenir || false);
    this.offreFormulaireBeneficiaire.set(snapshot.offreFormulaireBeneficiaire || false);
    this.inapteMedicalGender.set(snapshot.inapteMedicalGender || '');
    this.inapteMedicalName.set(snapshot.inapteMedicalName || '');
    this.inapteMedicalAlpha.set(snapshot.inapteMedicalAlpha || '');

    this.sharedState.selectedDossierJobId1.set(snapshot.selectedDossierJobId1);
    this.sharedState.selectedDossierJobId2.set(snapshot.selectedDossierJobId2);
    this.sharedState.selectedDossierJobId3.set(snapshot.selectedDossierJobId3);
    this.sharedState.searchDossierQuery1.set(snapshot.searchDossierQuery1);
    this.sharedState.searchDossierQuery2.set(snapshot.searchDossierQuery2);
    this.sharedState.searchDossierQuery3.set(snapshot.searchDossierQuery3);
    this.sharedState.dossierJobFailedCe1.set(snapshot.dossierJobFailedCe1 || false);
    this.sharedState.dossierJobFailedCe2.set(snapshot.dossierJobFailedCe2 || false);
    this.sharedState.dossierJobFailedCe3.set(snapshot.dossierJobFailedCe3 || false);
    this.sharedState.testEcePassed.set(snapshot.testEcePassed || false);
    this.sharedState.testEceNotCompleted.set(snapshot.testEceNotCompleted || false);
    this.sharedState.testEsomPassed.set(snapshot.testEsomPassed || false);
    this.sharedState.testEsomNotCompleted.set(snapshot.testEsomNotCompleted || false);
    this.sharedState.testCeopmPassed.set(snapshot.testCeopmPassed || false);
    this.sharedState.testCeopmNotCompleted.set(snapshot.testCeopmNotCompleted || false);
    this.sharedState.testCspnPassed.set(snapshot.testCspnPassed || false);
    this.sharedState.testCspnNotCompleted.set(snapshot.testCspnNotCompleted || false);
    this.sharedState.testCspn00182Passed.set(snapshot.testCspn00182Passed || false);
    this.sharedState.testCspn00183Passed.set(snapshot.testCspn00183Passed || false);
    this.sharedState.testCspn00184Passed.set(snapshot.testCspn00184Passed || false);
    this.sharedState.reoMergedEmailHtml.set(snapshot.reoMergedEmailHtml);
    this.sharedState.reoMergedEmailPlain.set(snapshot.reoMergedEmailPlain);
    this.sharedState.reoMergedNote.set(snapshot.reoMergedNote);
  }

export function createFreshSnapshot(this: any, role: 'recruiter' | 'gestionnaire'): RoleSnapshot {
    return {
      stage: 'intro',
      isUnderAge: false,
      recruiterDossierType: 'normal',
      allTasks: this.dataService.getTasks(role),
      selectedTask: null,
      selectedRejectionKeys: new Set(),
      taskNotCompletedKeys: new Set(),
      compliantDocKeys: new Set(),
      collapsedGroups: new Set(),
      forceGeneralReminder: false,
      selectedEmailBankTemplate: '',
      triageMedicalRequis: false,
      inapteMedicalGender: '',
      inapteMedicalName: '',
      inapteMedicalAlpha: '',
      evaluationMedicaleType: 'Dossier régulier',
      premierContactCourriel: false,
      premierContactMedical: false,
      premierContactEntrevue: false,
      premierContactGambit: false,
      premierContactPsps: false,
      premierContactSelfie: false,
      premierContactIptad: false,
      premierContactSeaf: false,
      premierContactSubPanelMode: 'courriel',
      premierContactNoteIptad: 'Complété',
      premierContactNoteSeaf: 'Complété',
      premierContactNoteEntrevue: 'À faire',
      premierContactNoteMedical: 'À faire',
      premierContactNotePsps: 'À faire',
      premierContactNoteGambit: 'En attente (type 28)',
      premierContactNoteAnxQ: 'À faire',
      avisFermetureCourriel: false,
      avisFermetureDelaiJours: '14',
      avisFermetureDate: '',
      avisFermetureEntrevue: false,
      avisFermetureMedicale: false,
      avisFermetureGambit: false,
      avisFermeturePsps: false,
      annexeQCourriel: false,
      annexeQAlphaPostulant: '',
      pforMatricule: '',
      sgtCheckedInstructions: [],
      evaluationMedicalePartie1: false,
      evaluationMedicalePartie2: false,
      evaluationMedicalePartie1Et2: false,
      offreNormaleChecked: false,
      offreEtudesSubventionneesChecked: false,
      offreLieuVille: (typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_ville')) || 'Québec',
      offreUniteAffectation: 'st-jean',
      offreMetier: '',
      offreMetierSearchQuery: '',
      offreProgrammeEnrolement: '',
      offreElement: '',
      offreDureeContrat: '',
      offreEtudesSubventionnees: '',
      offreDureeEtudesSubventionnees: '',
      offreDateEnrolement: '',
      offreHeureArriveePostulant: (typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_postulant')) || '8h00',
      offreHeureArriveeInvites: (typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_invites')) || '10h00',
      offreLieuEnrolement: (typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_enrolement')) || this.recruitmentCentersList[0].fullFr,
      offreDateArriveeUnite: '',
      offreElementsManquants: 'Spécimen de chèque',
      offreDateElementsManquants: '',
      offreSerieCours: '',
      offreDateCoursDebut: '',
      offreDateCoursFin: '',
      offreSubPanelMode: 'courriel',
      noteStatutCivil: 'célibataire',
      noteConjoint: 'N/A',
      noteConjointTexte: '',
      noteEnfantCount: '0',
      noteEnfantDetails: [],
      notePlaqueImm: '',
      noteBrisBail: 'N/A',
      noteEntreposage: 'N/A',
      noteSermentDeclaration: 'Serment',
      noteInviteMil: 'N/A',
      noteInviteMilTexte: '',
      noteSvcMilAnt: 'N/A',
      noteBeneficiaire: '',
      noteDateCourrielConfirmation: '',
      testEsomRecruitmentCenterCity: 'Québec',
      offreFormulairePpp: false,
      offreFormulairePcu: false,
      offreFormulaireCroixSouvenir: false,
      offreFormulaireBeneficiaire: false,
      selectedDossierJobId1: '',
      selectedDossierJobId2: '',
      selectedDossierJobId3: '',
      searchDossierQuery1: '',
      searchDossierQuery2: '',
      searchDossierQuery3: '',
      dossierJobFailedCe1: false,
      dossierJobFailedCe2: false,
      dossierJobFailedCe3: false,
      testEcePassed: false,
      testEceNotCompleted: false,
      testEsomPassed: false,
      testEsomNotCompleted: false,
      testCeopmPassed: false,
      testCeopmNotCompleted: false,
      testCspnPassed: false,
      testCspnNotCompleted: false,
      testCspn00182Passed: false,
      testCspn00183Passed: false,
      testCspn00184Passed: false,
      includeLinkedEmail: false,
      reoMergedEmailHtml: '',
      reoMergedEmailPlain: '',
      reoMergedNote: '',
    };
  }
