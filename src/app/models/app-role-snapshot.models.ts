import { Task } from "../data/recruitment-tasks/recruitment-tasks.models";

export interface UniteAffectation {
  id: string;
  nom: string;
  adresseHtml: string;
  adressePlain: string;
}

export const UNITES_AFFECTATION: UniteAffectation[] = [
  {
    id: "st-jean",
    nom: "St-Jean sur richelieu",
    adresseHtml: "ÉCOLE DE LEADERSHIP ET DE RECRUES DES FORCES CANADIENNES<br>CP 100 SUCC BUREAU-CHEF<br>RICHELAIN QC J0J 1R0",
    adressePlain: "ÉCOLE DE LEADERSHIP ET DE RECRUES DES FORCES CANADIENNES\nCP 100 SUCC BUREAU-CHEF\nRICHELAIN QC J0J 1R0"
  },
  {
    id: "valcartier",
    nom: "Valcartier",
    adresseHtml: "DETACHEMENT VALCARTIER QUARTIER GENERAL DE LA 2E DIVISION DU CANADA<br>CP 1000 SUCC FORCES<br>COURCELETTE QC G0A 4Z0",
    adressePlain: "DETACHEMENT VALCARTIER QUARTIER GENERAL DE LA 2E DIVISION DU CANADA\nCP 1000 SUCC FORCES\nCOURCELETTE QC G0A 4Z0"
  },
  {
    id: "borden",
    nom: "Borden",
    adresseHtml: "BASE DES FORCES CANADIENNES BORDEN<br>CP 1000 SUCC MAIN<br>BORDEN ON L0M 1C0",
    adressePlain: "BASE DES FORCES CANADIENNES BORDEN\nCP 1000 SUCC MAIN\nBORDEN ON L0M 1C0"
  },
  {
    id: "bagotville",
    nom: "Bagotville",
    adresseHtml: "BASE DES FORCES CANADIENNES BAGOTVILLE<br>CP 5000 SUCC BUREAU-CHEF<br>ALOUETTE QC G0V 1A0",
    adressePlain: "BASE DES FORCES CANADIENNES BAGOTVILLE\nCP 5000 SUCC BUREAU-CHEF\nALOUETTE QC G0V 1A0"
  },
  {
    id: "gagetown",
    nom: "Gagetown",
    adresseHtml: "BASE DE SOUTIEN DE LA 5E DIVISION DU CANADA GAGETOWN<br>CP 17000 SUCC FORCES<br>OROMOCTO NB E2V 4J5",
    adressePlain: "BASE DE SOUTIEN DE LA 5E DIVISION DU CANADA GAGETOWN\nCP 17000 SUCC FORCES\nOROMOCTO NB E2V 4J5"
  }
];


export type AppStage = "intro" | "minor-check" | "recruiter-dossier-type" | "main";

export interface RoleSnapshot {
  stage: AppStage;
  isUnderAge: boolean;
  recruiterDossierType?: 'normal' | 'pfor';
  allTasks: Task[];
  selectedTask: Task | null;
  selectedRejectionKeys: Set<string>;
  taskNotCompletedKeys: Set<string>;
  compliantDocKeys: Set<string>;
  collapsedGroups: Set<string>;
  forceGeneralReminder: boolean;
  selectedEmailBankTemplate?: string;
  triageMedicalRequis?: boolean;
  selectedDossierJobId1: string;
  selectedDossierJobId2: string;
  selectedDossierJobId3: string;
  searchDossierQuery1: string;
  searchDossierQuery2: string;
  searchDossierQuery3: string;
  dossierJobFailedCe1: boolean;
  dossierJobFailedCe2: boolean;
  dossierJobFailedCe3: boolean;
  testEcePassed?: boolean;
  testEceNotCompleted?: boolean;
  testEsomPassed?: boolean;
  testEsomNotCompleted?: boolean;
  testCeopmPassed?: boolean;
  testCeopmNotCompleted?: boolean;
  testCspnPassed?: boolean;
  testCspnNotCompleted?: boolean;
  testCspn00182Passed?: boolean;
  testCspn00183Passed?: boolean;
  testCspn00184Passed?: boolean;
  includeLinkedEmail: boolean;
  reoMergedEmailHtml: string;
  reoMergedEmailPlain: string;
  reoMergedNote: string;
  premierContactCourriel?: boolean;
  premierContactMedical?: boolean;
  premierContactEntrevue?: boolean;
  premierContactGambit?: boolean;
  premierContactPsps?: boolean;
  premierContactSelfie?: boolean;
  premierContactIptad?: boolean;
  premierContactSeaf?: boolean;
  premierContactSubPanelMode?: 'courriel' | 'note';
  premierContactNoteIptad?: string;
  premierContactNoteSeaf?: string;
  premierContactNoteEntrevue?: string;
  premierContactNoteMedical?: string;
  premierContactNotePsps?: string;
  premierContactNoteGambit?: string;
  premierContactNoteAnxQ?: string;
  avisFermetureCourriel?: boolean;
  avisFermetureDelaiJours?: string;
  avisFermetureDate?: string;
  avisFermetureEntrevue?: boolean;
  avisFermetureMedicale?: boolean;
  avisFermetureGambit?: boolean;
  avisFermeturePsps?: boolean;
  annexeQCourriel?: boolean;
  annexeQAlphaPostulant?: string;
  pforMatricule?: string;
  sgtCheckedInstructions?: string[];
  evaluationMedicaleType?: 'Dossier régulier' | 'Dossier OTA';
  evaluationMedicalePartie1?: boolean;
  evaluationMedicalePartie2?: boolean;
  evaluationMedicalePartie1Et2?: boolean;
  offreNormaleChecked?: boolean;
  offreEtudesSubventionneesChecked?: boolean;
  offreLieuVille?: string;
  offreUniteAffectation?: string;
  offreMetier?: string;
  offreMetierSearchQuery?: string;
  offreProgrammeEnrolement?: string;
  offreElement?: string;
  offreDureeContrat?: string;
  offreEtudesSubventionnees?: string;
  offreDureeEtudesSubventionnees?: string;
  offreDateEnrolement?: string;
  offreHeureArriveePostulant?: string;
  offreHeureArriveeInvites?: string;
  offreLieuEnrolement?: string;
  offreDateArriveeUnite?: string;
  offreElementsManquants?: string;
  offreDateElementsManquants?: string;
  offreSerieCours?: string;
  offreDateCoursDebut?: string;
  offreDateCoursFin?: string;
  offreSubPanelMode?: 'courriel' | 'note';
  noteStatutCivil?: string;
  noteConjoint?: string;
  noteConjointTexte?: string;
  noteEnfantCount?: string;
  noteEnfantDetails?: { sex: string; year: string }[];
  notePlaqueImm?: string;
  noteBrisBail?: string;
  noteEntreposage?: string;
  noteSermentDeclaration?: string;
  noteInviteMil?: string;
  noteInviteMilTexte?: string;
  noteSvcMilAnt?: string;
  noteBeneficiaire?: string;
  noteDateCourrielConfirmation?: string;
  testEsomRecruitmentCenterCity?: string;
  offreFormulairePpp?: boolean;
  offreFormulairePcu?: boolean;
  offreFormulaireCroixSouvenir?: boolean;
  offreFormulaireBeneficiaire?: boolean;
  inapteMedicalGender?: 'F' | 'M' | '';
  inapteMedicalName?: string;
  inapteMedicalAlpha?: string;
}

export function getTodayDateString(): string {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
}
