import {
  Component,
  computed,
  inject,
  signal,
  ViewChild,
  effect,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {
  RecruitmentDataService,
  Task,
  DocumentItem,
  RejectionReason,
} from "./services/recruitment-data.service";
import {
  EmailScenariosService,
  EmailScenario,
} from "./services/email-scenarios.service";
import { JobSearchModalComponent } from "./app/components/job-search-modal.component";
import { CalendarPickerComponent } from "./app/components/calendar-picker.component";
import { CourseSeriesPickerComponent } from "./app/components/course-series-picker.component";
import { UnitPickerComponent } from "./app/components/unit-picker.component";
import { UnitSession, UNITS_LIST } from "./app/data/units.data";
import { CourseSession } from "./app/data/course-sessions.data";
import { SharedStateService, DEFAULT_SIG_FR, DEFAULT_SIG_EN, DEFAULT_SIG_OTA_FR, DEFAULT_SIG_OTA_EN } from "./services/shared-state.service";
import { JobDatabaseService } from "./services/job-database.service";
import { JobEntry, JobCategory, MilitaryElement, RecruitmentCenter, RECRUITMENT_CENTERS, ENROLMENT_HOURS } from "./services/jobs-data";
import { FormsModule } from "@angular/forms";

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


type AppStage = "intro" | "minor-check" | "main";

interface RoleSnapshot {
  stage: AppStage;
  isUnderAge: boolean;
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
  testEsomPassed?: boolean;
  testCeopmPassed?: boolean;
  testCspnPassed?: boolean;
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
  avisFermetureCourriel?: boolean;
  avisFermetureDelaiJours?: string;
  avisFermetureDate?: string;
  avisFermetureEntrevue?: boolean;
  avisFermetureMedicale?: boolean;
  avisFermetureGambit?: boolean;
  avisFermeturePsps?: boolean;
  annexeQCourriel?: boolean;
  annexeQAlphaPostulant?: string;
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
}

function getTodayDateString(): string {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, JobSearchModalComponent, CalendarPickerComponent, CourseSeriesPickerComponent, UnitPickerComponent, FormsModule],
  template: `
    @if (!isAuthenticated()) {
      <div class="h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-4">
        <div class="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-slate-200">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-800 mb-2">Accès restreint</h2>
          <p class="text-sm text-slate-500 mb-6">Veuillez entrer le mot de passe pour accéder à l'application.</p>
          <form (submit)="checkPassword($event)">
            <div class="relative mb-4">
              <input [type]="showPassword() ? 'text' : 'password'" [(ngModel)]="passwordInput" [ngModelOptions]="{standalone: true}" class="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-center text-lg tracking-widest transition-all pr-12" placeholder="Mot de passe" />
              <button type="button" (click)="showPassword.set(!showPassword())" class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 focus:outline-none">
                @if (showPassword()) {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              </button>
            </div>
            @if (authError()) {
              <p class="text-red-500 text-sm mb-4 font-medium animate-pulse">Mot de passe incorrect.</p>
            }
            <button type="submit" class="w-full py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-md active:scale-95 flex justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Déverrouiller
            </button>
          </form>
        </div>
      </div>
    } @else if (selectedRole() === 'none') {
      <div class="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-6">
        <div class="max-w-3xl w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-200 text-center space-y-8 animate-in fade-in zoom-in duration-200">
          
          <!-- MARCEL Title with Hover Animation -->
          <div class="flex justify-center w-full">
            <div
              class="group relative flex items-center justify-center overflow-hidden rounded-full bg-indigo-50 border-2 border-indigo-200/50 transition-all duration-500 hover:bg-white hover:border-indigo-300 hover:shadow-2xl shadow-lg h-16 w-72 sm:w-80 hover:w-full max-w-2xl cursor-default"
            >
              <div class="absolute flex w-full items-center justify-center px-4">
                <span
                  class="font-black text-3xl sm:text-4xl tracking-wider text-indigo-700 transition-all duration-500 group-hover:-translate-y-16 group-hover:opacity-0 absolute drop-shadow-sm whitespace-nowrap"
                  >MARCEL 2.0</span
                >
                <span
                  class="text-[10px] sm:text-[11px] md:text-xs leading-none uppercase tracking-wider font-semibold text-slate-500 text-center transition-all duration-500 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 absolute w-full px-3 whitespace-nowrap"
                >
                  <span class="font-black text-indigo-700">M</span>odule
                  d'<span class="font-black text-indigo-700">A</span>nalyse et de
                  <span class="font-black text-indigo-700">R</span>éorientation
                  des
                  <span class="font-black text-indigo-700">C</span>andidats à l'<span class="font-black text-indigo-700">E</span>nrôlement pour les
                  <span class="font-black text-indigo-700">L</span>âches
                </span>
              </div>
            </div>
          </div>

          <h1 class="text-2xl font-extrabold text-slate-800 tracking-tight">Sélection du Rôle</h1>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <!-- Left: Gestionnaire de dossier -->
            <div 
              (click)="selectRole('gestionnaire')"
              class="group bg-slate-50 hover:bg-indigo-50/70 border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center space-y-4"
            >
              <div class="w-14 h-14 rounded-2xl bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 class="text-xl font-extrabold text-slate-800 group-hover:text-indigo-900">Gestionnaire de dossier</h3>
            </div>

            <!-- Right: Recruteur -->
            <div 
              (click)="selectRole('recruiter')"
              class="group bg-slate-50 hover:bg-indigo-50/70 border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center space-y-4"
            >
              <div class="w-14 h-14 rounded-2xl bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 class="text-xl font-extrabold text-slate-800 group-hover:text-indigo-900">Recruteur</h3>
            </div>
          </div>

        </div>
      </div>
    } @else {
    @if (showSignaturePage()) {
      <div class="h-screen w-full bg-slate-100 flex flex-col p-6 overflow-hidden select-none">
        <!-- Header -->
        <div class="max-w-5xl w-full mx-auto flex items-center justify-between mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 shrink-0">
          <div class="flex items-center gap-4">
            <button (click)="closeSignaturePage()" class="p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-600 border border-transparent hover:border-slate-200 cursor-pointer" title="Retour">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                Gestion des signatures
              </h1>
              <p class="text-xs text-slate-500 mt-0.5">Personnalisez vos signatures de courriel (Signature normale et Signature OTA).</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button (click)="resetSignatures()" class="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl transition-all text-sm font-semibold flex items-center gap-2 active:scale-95 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H17M4 9a8.001 8.001 0 0113.313-2.24L20 9" />
              </svg>
              Réinitialiser le bloc actif
            </button>
            <button (click)="saveSignatures()" class="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-sm font-semibold flex items-center gap-2 shadow-md active:scale-95 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Sauvegarder tout
            </button>
          </div>
        </div>

        <!-- Section Tabs Navigation -->
        <div class="max-w-5xl w-full mx-auto mb-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 w-full sm:w-auto">
            <button
              (click)="signatureSection.set('normal')"
              [class.bg-white]="signatureSection() === 'normal'"
              [class.text-indigo-700]="signatureSection() === 'normal'"
              [class.shadow-sm]="signatureSection() === 'normal'"
              [class.font-bold]="signatureSection() === 'normal'"
              [class.text-slate-600]="signatureSection() !== 'normal'"
              class="flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Bloc Signature Normale
            </button>
            <button
              (click)="signatureSection.set('ota')"
              [class.bg-white]="signatureSection() === 'ota'"
              [class.text-purple-700]="signatureSection() === 'ota'"
              [class.shadow-sm]="signatureSection() === 'ota'"
              [class.font-bold]="signatureSection() === 'ota'"
              [class.text-slate-600]="signatureSection() !== 'ota'"
              class="flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Bloc Signature OTA
            </button>
          </div>

          <!-- Scope Context Notice -->
          <div class="text-xs px-3 py-1.5 rounded-lg border flex items-center gap-2 font-medium"
            [class.bg-blue-50]="signatureSection() === 'normal'"
            [class.border-blue-200]="signatureSection() === 'normal'"
            [class.text-blue-800]="signatureSection() === 'normal'"
            [class.bg-purple-50]="signatureSection() === 'ota'"
            [class.border-purple-200]="signatureSection() === 'ota'"
            [class.text-purple-800]="signatureSection() === 'ota'"
          >
            <span class="inline-block w-2 h-2 rounded-full" [class.bg-blue-600]="signatureSection() === 'normal'" [class.bg-purple-600]="signatureSection() === 'ota'"></span>
            @if (signatureSection() === 'normal') {
              <span><strong>Utilisation :</strong> Partout (Volet Recruteur &amp; Dossiers locaux GD) sauf dans le volet GD pour les dossiers OTA.</span>
            } @else {
              <span><strong>Utilisation :</strong> Exclusivement dans le <strong>volet Gestionnaire de dossier (GD)</strong> pour les <strong>dossiers OTA</strong>.</span>
            }
          </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 pb-4">
          @if (signatureSection() === 'normal') {
            <!-- French signature card (Normal) -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
              <div class="flex items-center justify-between mb-3 shrink-0">
                <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                  <span class="bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">FR</span>
                  Signature française (Normale)
                </h2>
                <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Standard</span>
              </div>
              <p class="text-xs text-slate-500 mb-4 shrink-0">Cette signature sera intégrée au bas de vos correspondances régulières rédigées en français.</p>
              <textarea [(ngModel)]="sigFrTemp" class="w-full flex-1 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-slate-50/30" placeholder="Ajoutez votre signature française normale..."></textarea>
            </div>

            <!-- English signature card (Normal) -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
              <div class="flex items-center justify-between mb-3 shrink-0">
                <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                  <span class="bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">EN</span>
                  Signature anglaise (Normale)
                </h2>
                <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Standard</span>
              </div>
              <p class="text-xs text-slate-500 mb-4 shrink-0">Cette signature sera intégrée au bas de vos correspondances régulières rédigées en anglais.</p>
              <textarea [(ngModel)]="sigEnTemp" class="w-full flex-1 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-slate-50/30" placeholder="Ajoutez votre signature anglaise normale..."></textarea>
            </div>
          } @else {
            <!-- French signature card (OTA) -->
            <div class="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
              <div class="flex items-center justify-between mb-3 shrink-0">
                <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                  <span class="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">FR</span>
                  Signature française (OTA)
                </h2>
                <span class="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">Dossiers OTA</span>
              </div>
              <p class="text-xs text-slate-500 mb-4 shrink-0">Cette signature sera intégrée au bas de vos correspondances pour les dossiers OTA dans le volet GD en français.</p>
              <textarea [(ngModel)]="sigOtaFrTemp" class="w-full flex-1 p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-purple-50/20" placeholder="Ajoutez votre signature française OTA..."></textarea>
            </div>

            <!-- English signature card (OTA) -->
            <div class="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
              <div class="flex items-center justify-between mb-3 shrink-0">
                <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                  <span class="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">EN</span>
                  Signature anglaise (OTA)
                </h2>
                <span class="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">Dossiers OTA</span>
              </div>
              <p class="text-xs text-slate-500 mb-4 shrink-0">Cette signature sera intégrée au bas de vos correspondances pour les dossiers OTA dans le volet GD en anglais.</p>
              <textarea [(ngModel)]="sigOtaEnTemp" class="w-full flex-1 p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-purple-50/20" placeholder="Ajoutez votre signature anglaise OTA..."></textarea>
            </div>
          }
        </div>

        <!-- Toast message for Save feedback -->
        @if (showToast()) {
          <div class="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2.5 transition-all z-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm font-semibold">Signatures sauvegardées avec succès !</span>
          </div>
        }
      </div>
    } @else {
      <!-- INTRO SCREEN -->
      @if (stage() === "intro" && selectedRole() === "recruiter") {
      <div
        class="h-screen w-full bg-slate-200 flex flex-col items-center justify-center p-4 relative"
      >
        <!-- Job Search Button (Intro) -->
        <button
          (click)="toggleJobSearch()"
          class="absolute top-4 right-16 bg-indigo-100 border border-indigo-200 text-indigo-800 hover:bg-indigo-200 h-10 w-10 rounded-full shadow-md transition-all z-50 font-sans flex items-center justify-center text-sm font-black"
          title="Panneau de Réorientation et Métiers"
        >
          RÉO
        </button>

        <!-- Signature Management Button (Intro) -->
        <button
          (click)="toggleSignatureSettings()"
          class="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-slate-50 transition-all z-50 text-slate-600"
          title="Gestion de la signature"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>

        <div
          class="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border border-white/50 relative z-0"
        >
          <div class="mb-8">
            <div
              class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">
              Vérification Initiale
            </h1>
            <p class="text-lg text-slate-600">Le postulant est-il mineur ?</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              (click)="startMinorCheck()"
              class="py-4 px-6 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition-colors shadow-lg active:scale-95 cursor-pointer"
            >
              Oui
            </button>
            <button
              (click)="startMainProgram()"
              class="py-4 px-6 bg-white text-slate-800 border-2 border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-sm active:scale-95 cursor-pointer"
            >
              Non
            </button>
          </div>
        </div>
      </div>
    } @else if (stage() === "intro" && selectedRole() === "gestionnaire") {
      <div
        class="h-screen w-full bg-slate-200 flex flex-col items-center justify-center p-4 relative"
      >
        <!-- Switch Role Button (Intro GD) -->
        <button
          (click)="switchRole()"
          class="absolute top-4 right-4 bg-white border border-slate-300 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 h-10 px-4 rounded-xl shadow-sm transition-all z-50 font-sans flex items-center justify-center text-xs font-bold gap-2 cursor-pointer active:scale-95"
          title="Revenir à la page de sélection de rôle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <span>Changer de rôle</span>
        </button>

        <div
          class="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border border-white/50 relative z-0"
        >
          <div class="mb-8">
            <div
              class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">
              Type de dossier
            </h1>
            <p class="text-lg text-slate-600">Le postulant est-il Local ou OTA ?</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              (click)="selectGdDossierType('Local')"
              class="py-4 px-6 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition-colors shadow-lg active:scale-95 cursor-pointer"
            >
              Local
            </button>
            <button
              (click)="selectGdDossierType('OTA')"
              class="py-4 px-6 bg-white text-slate-800 border-2 border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-sm active:scale-95 cursor-pointer"
            >
              OTA
            </button>
          </div>
        </div>
      </div>
    } @else {
      <!-- Main Container: Vertical layout now -->
      <div
        class="min-h-screen w-full bg-slate-200 text-slate-800 p-4 flex flex-col gap-4 font-sans relative"
      >
        <!-- TOP HEADER ROW -->
        <div class="flex items-start w-full shrink-0 gap-4">
          <!-- Role Title Panel (Top-Left 2x2 Pastilles) -->
          <div
            class="bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center gap-2 flex-1 min-w-[320px]"
          >
            <h1
              class="text-xs font-black tracking-wider uppercase text-center border-b border-slate-100 pb-1.5 w-full px-1"
              [class.text-indigo-800]="selectedRole() === 'recruiter'"
              [class.text-amber-800]="selectedRole() === 'gestionnaire'"
            >
              {{ selectedRole() === 'recruiter' ? 'Recruteur' : ('Gestionnaire de dossier — ' + (evaluationMedicaleType() === 'Dossier OTA' ? 'OTA' : 'Local')) }}
            </h1>

            <div class="grid grid-cols-2 gap-2 w-full">
              <!-- Top-Left: Reset -->
              <button
                (click)="restartApp()"
                class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer w-full"
                title="Relancer l'application (Reset)"
              >
                <svg
                  class="h-3.5 w-3.5 shrink-0 text-slate-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>Reset</span>
              </button>

              <!-- Top-Right: Réo / Enrôlement -->
              <button
                (click)="toggleJobSearch()"
                class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-xs font-bold border border-indigo-200 shadow-xs transition-all active:scale-95 cursor-pointer w-full"
                [title]="selectedRole() === 'gestionnaire' ? 'Panneau d’Enrôlement et Métiers' : 'Panneau de Réorientation et Métiers (RÉO)'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 shrink-0 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{{ selectedRole() === 'gestionnaire' ? 'Enrôlement' : 'RÉO' }}</span>
              </button>

              <!-- Bottom-Left: Signature -->
              <button
                (click)="toggleSignatureSettings()"
                class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer w-full"
                title="Gestion de la signature"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 shrink-0 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Signature</span>
              </button>

              <!-- Bottom-Right: Banque de courriels Dropdown -->
              <div class="relative w-full email-bank-dropdown-container">
                <button
                  (click)="toggleEmailBankDropdown($event)"
                  class="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer w-full text-left"
                  [class.bg-indigo-600]="selectedEmailBankTemplate() !== ''"
                  [class.text-white]="selectedEmailBankTemplate() !== ''"
                  [class.border-indigo-700]="selectedEmailBankTemplate() !== ''"
                  [class.hover:bg-indigo-700]="selectedEmailBankTemplate() !== ''"
                  [class.bg-slate-100]="selectedEmailBankTemplate() === ''"
                  [class.text-slate-700]="selectedEmailBankTemplate() === ''"
                  [class.border-slate-200]="selectedEmailBankTemplate() === ''"
                  [class.hover:bg-slate-200]="selectedEmailBankTemplate() === ''"
                  title="Banque de courriels"
                >
                  <div class="flex items-center gap-1.5 min-w-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span class="truncate font-semibold">Banque de courriels</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 shrink-0 transition-transform duration-200"
                    [class.rotate-180]="isEmailBankDropdownOpen()"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                @if (isEmailBankDropdownOpen()) {
                  <div
                    class="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div class="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                      <span>Banque de courriels</span>
                      @if (selectedEmailBankTemplate() !== '') {
                        <button
                          (click)="selectEmailBankTemplate('')"
                          class="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer text-[10px]"
                        >
                          Réinitialiser
                        </button>
                      }
                    </div>

                    <button
                      (click)="selectEmailBankTemplate('general_reminder')"
                      class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                      [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'general_reminder'"
                      [class.font-bold]="selectedEmailBankTemplate() === 'general_reminder'"
                      [class.text-indigo-900]="selectedEmailBankTemplate() === 'general_reminder'"
                    >
                      <span class="truncate">Courriel de rappel</span>
                      @if (selectedEmailBankTemplate() === 'general_reminder') {
                        <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      }
                    </button>

                    <button
                      (click)="selectEmailBankTemplate('verification_edo_vs_pfor')"
                      class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                      [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'verification_edo_vs_pfor'"
                      [class.font-bold]="selectedEmailBankTemplate() === 'verification_edo_vs_pfor'"
                      [class.text-indigo-900]="selectedEmailBankTemplate() === 'verification_edo_vs_pfor'"
                    >
                      <span class="truncate">Courriel de vérification de programme EDO VS PFOR</span>
                      @if (selectedEmailBankTemplate() === 'verification_edo_vs_pfor') {
                        <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      }
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Panel: Métiers au dossier du postulant -->
          <div
            class="bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex flex-col gap-2 flex-1 min-w-[320px]"
          >
            <div class="flex items-center justify-between border-b border-slate-100 pb-1.5 px-1">
              <h2 class="text-xs font-black tracking-wider text-slate-800 uppercase flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Métiers au dossier du postulant
              </h2>

              <div class="flex items-center gap-3">
                <label class="flex items-center gap-1.5 cursor-pointer text-[11px] font-bold text-slate-700">
                  <input
                    type="checkbox"
                    [checked]="sharedState.isPostulantPfor()"
                    (change)="sharedState.isPostulantPfor.set(!sharedState.isPostulantPfor())"
                    class="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Postulant PFOR</span>
                </label>
                <button
                  (click)="switchRole()"
                  class="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="Revenir à la page de sélection de rôle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>Changer de rôle</span>
                </button>
              </div>
            </div>

            <!-- 3 Columns for 3 Jobs -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <!-- Slot 1 -->
              <div class="relative flex flex-col gap-1 p-2 bg-slate-50/80 border border-slate-200 rounded-xl">
                <div class="flex items-center justify-between text-[11px] font-bold">
                  <span class="uppercase tracking-wider text-slate-500">Choix #1</span>
                  @if (getDossierJob(1)) {
                    @let job1 = getDossierJob(1)!;
                    @let programs1 = jobService.getJobPrograms(job1.id);
                    <div class="flex flex-wrap gap-1 justify-end max-w-[70%]">
                      @for (prog of getObjectKeys(programs1); track prog) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold border"
                          [class.bg-emerald-100]="programs1[prog] === 'o'"
                          [class.text-emerald-800]="programs1[prog] === 'o'"
                          [class.border-emerald-200]="programs1[prog] === 'o'"
                          [class.bg-amber-100]="programs1[prog] === 'limité'"
                          [class.text-amber-800]="programs1[prog] === 'limité'"
                          [class.border-amber-200]="programs1[prog] === 'limité'"
                          [class.bg-rose-100]="programs1[prog] === 'f'"
                          [class.text-rose-800]="programs1[prog] === 'f'"
                          [class.border-rose-200]="programs1[prog] === 'f'"
                        >
                          {{ prog }}
                        </span>
                      }
                      @if (getObjectKeys(programs1).length === 0) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          N/A
                        </span>
                      }
                    </div>
                  }
                </div>

                <div class="relative">
                  <div
                    class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 text-xs min-h-[34px]"
                    [class.opacity-50]="isDossierFieldDisabled(1)"
                    [class.bg-slate-100]="isDossierFieldDisabled(1)"
                    [class.cursor-not-allowed]="isDossierFieldDisabled(1)"
                  >
                    <input
                      type="text"
                      [ngModel]="sharedState.searchDossierQuery1()"
                      (ngModelChange)="onDossierQueryChange(1, $event)"
                      (focus)="openDossierDropdown(1)"
                      (blur)="closeDossierDropdownDelayed(1)"
                      [disabled]="isDossierFieldDisabled(1)"
                      class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                      [class.cursor-not-allowed]="isDossierFieldDisabled(1)"
                      placeholder="Rechercher métier #1..."
                    />
                    @if (sharedState.selectedDossierJobId1() && !isDossierFieldDisabled(1)) {
                      <button
                        (click)="clearDossierJob(1, $event)"
                        class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Effacer le choix #1"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    }
                  </div>

                  <!-- Dropdown List -->
                  @if (dossierDropdownOpen1() && !isDossierFieldDisabled(1)) {
                    <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                      @let filtered1 = getFilteredJobsForIndex(1);
                      @if (filtered1.length === 0) {
                        <div class="p-2 text-slate-400 text-center italic">Aucun métier trouvé</div>
                      }
                      @for (job of filtered1; track job.id) {
                        <button
                          type="button"
                          (mousedown)="selectDossierJob(1, job.id)"
                          class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        >
                          <span class="font-medium text-slate-800 truncate">{{ job.id }} - {{ job.title }}</span>
                        </button>
                      }
                    </div>
                  }
                </div>

                <!-- Checkbox Ne rencontre pas les CE -->
                @if (getDossierJob(1)) {
                  <label class="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      [ngModel]="sharedState.dossierJobFailedCe1()"
                      (ngModelChange)="sharedState.dossierJobFailedCe1.set($event)"
                      class="h-3.5 w-3.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
                    />
                    <span [class.text-rose-700]="sharedState.dossierJobFailedCe1()" [class.font-bold]="sharedState.dossierJobFailedCe1()">
                      Ne rencontre pas les CE
                    </span>
                  </label>
                }
              </div>

              <!-- Slot 2 -->
              <div class="relative flex flex-col gap-1 p-2 bg-slate-50/80 border border-slate-200 rounded-xl">
                <div class="flex items-center justify-between text-[11px] font-bold">
                  <span class="uppercase tracking-wider text-slate-500">Choix #2</span>
                  @if (getDossierJob(2)) {
                    @let job2 = getDossierJob(2)!;
                    @let programs2 = jobService.getJobPrograms(job2.id);
                    <div class="flex flex-wrap gap-1 justify-end max-w-[70%]">
                      @for (prog of getObjectKeys(programs2); track prog) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold border"
                          [class.bg-emerald-100]="programs2[prog] === 'o'"
                          [class.text-emerald-800]="programs2[prog] === 'o'"
                          [class.border-emerald-200]="programs2[prog] === 'o'"
                          [class.bg-amber-100]="programs2[prog] === 'limité'"
                          [class.text-amber-800]="programs2[prog] === 'limité'"
                          [class.border-amber-200]="programs2[prog] === 'limité'"
                          [class.bg-rose-100]="programs2[prog] === 'f'"
                          [class.text-rose-800]="programs2[prog] === 'f'"
                          [class.border-rose-200]="programs2[prog] === 'f'"
                        >
                          {{ prog }}
                        </span>
                      }
                      @if (getObjectKeys(programs2).length === 0) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          N/A
                        </span>
                      }
                    </div>
                  }
                </div>

                <div class="relative">
                  <div
                    class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 text-xs min-h-[34px]"
                    [class.opacity-50]="isDossierFieldDisabled(2)"
                    [class.bg-slate-100]="isDossierFieldDisabled(2)"
                    [class.cursor-not-allowed]="isDossierFieldDisabled(2)"
                  >
                    <input
                      type="text"
                      [ngModel]="sharedState.searchDossierQuery2()"
                      (ngModelChange)="onDossierQueryChange(2, $event)"
                      (focus)="openDossierDropdown(2)"
                      (blur)="closeDossierDropdownDelayed(2)"
                      [disabled]="isDossierFieldDisabled(2)"
                      class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                      [class.cursor-not-allowed]="isDossierFieldDisabled(2)"
                      placeholder="Rechercher métier #2..."
                    />
                    @if (sharedState.selectedDossierJobId2() && !isDossierFieldDisabled(2)) {
                      <button
                        (click)="clearDossierJob(2, $event)"
                        class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Effacer le choix #2"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    }
                  </div>

                  <!-- Dropdown List -->
                  @if (dossierDropdownOpen2() && !isDossierFieldDisabled(2)) {
                    <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                      @let filtered2 = getFilteredJobsForIndex(2);
                      @if (filtered2.length === 0) {
                        <div class="p-2 text-slate-400 text-center italic">Aucun métier trouvé</div>
                      }
                      @for (job of filtered2; track job.id) {
                        <button
                          type="button"
                          (mousedown)="selectDossierJob(2, job.id)"
                          class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        >
                          <span class="font-medium text-slate-800 truncate">{{ job.id }} - {{ job.title }}</span>
                        </button>
                      }
                    </div>
                  }
                </div>

                <!-- Checkbox Ne rencontre pas les CE -->
                @if (getDossierJob(2)) {
                  <label class="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      [ngModel]="sharedState.dossierJobFailedCe2()"
                      (ngModelChange)="sharedState.dossierJobFailedCe2.set($event)"
                      class="h-3.5 w-3.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
                    />
                    <span [class.text-rose-700]="sharedState.dossierJobFailedCe2()" [class.font-bold]="sharedState.dossierJobFailedCe2()">
                      Ne rencontre pas les CE
                    </span>
                  </label>
                }
              </div>

              <!-- Slot 3 -->
              <div class="relative flex flex-col gap-1 p-2 bg-slate-50/80 border border-slate-200 rounded-xl">
                <div class="flex items-center justify-between text-[11px] font-bold">
                  <span class="uppercase tracking-wider text-slate-500">Choix #3</span>
                  @if (getDossierJob(3)) {
                    @let job3 = getDossierJob(3)!;
                    @let programs3 = jobService.getJobPrograms(job3.id);
                    <div class="flex flex-wrap gap-1 justify-end max-w-[70%]">
                      @for (prog of getObjectKeys(programs3); track prog) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold border"
                          [class.bg-emerald-100]="programs3[prog] === 'o'"
                          [class.text-emerald-800]="programs3[prog] === 'o'"
                          [class.border-emerald-200]="programs3[prog] === 'o'"
                          [class.bg-amber-100]="programs3[prog] === 'limité'"
                          [class.text-amber-800]="programs3[prog] === 'limité'"
                          [class.border-amber-200]="programs3[prog] === 'limité'"
                          [class.bg-rose-100]="programs3[prog] === 'f'"
                          [class.text-rose-800]="programs3[prog] === 'f'"
                          [class.border-rose-200]="programs3[prog] === 'f'"
                        >
                          {{ prog }}
                        </span>
                      }
                      @if (getObjectKeys(programs3).length === 0) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          N/A
                        </span>
                      }
                    </div>
                  }
                </div>

                <div class="relative">
                  <div
                    class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 text-xs min-h-[34px]"
                    [class.opacity-50]="isDossierFieldDisabled(3)"
                    [class.bg-slate-100]="isDossierFieldDisabled(3)"
                    [class.cursor-not-allowed]="isDossierFieldDisabled(3)"
                  >
                    <input
                      type="text"
                      [ngModel]="sharedState.searchDossierQuery3()"
                      (ngModelChange)="onDossierQueryChange(3, $event)"
                      (focus)="openDossierDropdown(3)"
                      (blur)="closeDossierDropdownDelayed(3)"
                      [disabled]="isDossierFieldDisabled(3)"
                      class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                      [class.cursor-not-allowed]="isDossierFieldDisabled(3)"
                      placeholder="Rechercher métier #3..."
                    />
                    @if (sharedState.selectedDossierJobId3() && !isDossierFieldDisabled(3)) {
                      <button
                        (click)="clearDossierJob(3, $event)"
                        class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="Effacer le choix #3"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    }
                  </div>

                  <!-- Dropdown List -->
                  @if (dossierDropdownOpen3() && !isDossierFieldDisabled(3)) {
                    <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                      @let filtered3 = getFilteredJobsForIndex(3);
                      @if (filtered3.length === 0) {
                        <div class="p-2 text-slate-400 text-center italic">Aucun métier trouvé</div>
                      }
                      @for (job of filtered3; track job.id) {
                        <button
                          type="button"
                          (mousedown)="selectDossierJob(3, job.id)"
                          class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        >
                          <span class="font-medium text-slate-800 truncate">{{ job.id }} - {{ job.title }}</span>
                        </button>
                      }
                    </div>
                  }
                </div>

                <!-- Checkbox Ne rencontre pas les CE -->
                @if (getDossierJob(3)) {
                  <label class="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      [ngModel]="sharedState.dossierJobFailedCe3()"
                      (ngModelChange)="sharedState.dossierJobFailedCe3.set($event)"
                      class="h-3.5 w-3.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
                    />
                    <span [class.text-rose-700]="sharedState.dossierJobFailedCe3()" [class.font-bold]="sharedState.dossierJobFailedCe3()">
                      Ne rencontre pas les CE
                    </span>
                  </label>
                }
              </div>
            </div>
          </div>

          <!-- Minor Check Banner (if active) -->
          @if (stage() === "minor-check") {
            <div
              class="bg-indigo-900 text-white p-3.5 rounded-2xl shadow-md flex justify-between items-center flex-1 self-center"
            >
              <div class="flex items-center gap-3">
                <span
                  class="bg-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
                  >Mode Mineur</span
                >
                <span class="text-sm font-medium opacity-90"
                  >Veuillez valider les 4 documents requis (Certificat
                  naissance, Demande Partie H, ID Parent, Selfie
                  Parent).</span
                >
              </div>

              <button
                (click)="startMainProgram()"
                class="px-4 py-2 bg-white text-indigo-900 rounded-lg text-sm font-bold shadow-sm transition-all hover:bg-indigo-50 active:scale-95 flex items-center gap-2 whitespace-nowrap ml-4 shrink-0 cursor-pointer"
              >
                <span>Procéder à l'évaluation principale</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          }
        </div>

        <!-- SPLIT COLUMN LAYOUT: Tasks sidebar (left) and Documents Workspace (right) -->
        <div class="flex gap-4 items-start w-full">
          <!-- Panel 1: Navigation (Tasks) -->
          <nav
            class="w-[340px] shrink-0 bg-white rounded-2xl shadow-xl flex flex-col border border-white/50 h-fit"
          >
            <div class="p-3 bg-slate-50 border-b border-slate-200 flex-none flex items-center justify-between">
              <h2
                class="font-bold text-slate-700 uppercase text-xs sm:text-sm tracking-wider flex items-center gap-2"
              >
                {{ selectedRole() === 'gestionnaire' ? 'Tâches GD' : 'Tâches du Portail' }}
              </h2>
              <!-- Tout Conforme Button -->
              @if (selectedRole() !== 'gestionnaire') {
                <button
                  (click)="setAllCompliant()"
                  class="px-2 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 font-bold text-xs border active:scale-95 cursor-pointer"
                  [class.bg-emerald-600]="areAllDocsCompliant()"
                  [class.text-white]="areAllDocsCompliant()"
                  [class.border-emerald-700]="areAllDocsCompliant()"
                  [class.hover:bg-emerald-700]="areAllDocsCompliant()"
                  [class.bg-emerald-50]="!areAllDocsCompliant()"
                  [class.text-emerald-700]="!areAllDocsCompliant()"
                  [class.border-emerald-100]="!areAllDocsCompliant()"
                  [class.hover:bg-emerald-100]="!areAllDocsCompliant()"
                  [class.hover:border-emerald-200]="!areAllDocsCompliant()"
                  [title]="areAllDocsCompliant() ? 'Désactiver la conformité de toutes les tâches' : 'Mettre toutes les tâches instantanément conformes'"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Tout Conforme</span>
                </button>
              }
            </div>
            <div class="p-3 space-y-4">
              @for (group of groupedVisibleTasks().groups; track group.id) {
                <div class="space-y-1 bg-slate-100/70 p-2 rounded-xl border-2 border-slate-200/90 shadow-xs">
                  <!-- Collapsible Header -->
                  <button
                    (click)="toggleGroupCollapse(group.id)"
                    class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold tracking-wider text-slate-800 bg-slate-200/80 hover:bg-slate-300/80 transition-colors select-none border border-slate-300/70"
                  >
                    <span class="flex items-center gap-2">
                      @if (selectedRole() === 'gestionnaire') {
                        <span class="bg-indigo-900 text-white px-2 py-0.5 rounded text-[11px] font-extrabold tracking-wide">{{ group.title }}</span>
                      } @else {
                        <span class="bg-slate-800 text-white px-2 py-0.5 rounded text-[11px] font-extrabold tracking-wide">Groupe {{ group.title }}</span>
                      }
                      <span class="text-[11px] font-semibold text-slate-500">({{ group.tasks.length }} {{ group.tasks.length > 1 ? 'tâches' : 'tâche' }})</span>
                      @if (isGroupCompliant(group)) {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-green-600 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      } @else if (hasGroupRejections(group)) {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-red-600 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      }
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 transition-transform duration-200 text-slate-600"
                      [class.rotate-180]="isGroupCollapsed(group.id)"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <!-- Grouped Tasks -->
                  @if (!isGroupCollapsed(group.id)) {
                    <div class="space-y-1 mt-1">
                      @if (group.tasks.length === 0) {
                        <div class="px-3 py-2 text-center text-[11px] text-slate-400 italic">
                          Aucune sous-tâche
                        </div>
                      }
                      @for (task of group.tasks; track task.nameFr) {
                        <button
                          (click)="selectTask(task)"
                          class="w-full text-left p-2.5 rounded-lg transition-all duration-200 border border-transparent group relative overflow-hidden flex justify-between items-center"
                          [class.bg-slate-800]="selectedTask() === task"
                          [class.text-white]="selectedTask() === task"
                          [class.shadow-md]="selectedTask() === task"
                          [class.hover:bg-slate-200/80]="selectedTask() !== task"
                          [class.bg-white]="selectedTask() !== task"
                        >
                          <div class="font-semibold text-xs pr-2 leading-snug">
                            {{ task.nameFr }}
                          </div>

                          <div class="flex items-center gap-1.5 shrink-0">
                            @if (!task.nameFr.includes("Documents Supplémentaires") && !task.nameFr.includes("Courriel d'offre") && !task.nameFr.includes("Offre") && task.section !== "Courriel d'offre" && task.section !== "Suivi de dossier" && task.section !== "Réception d'un postulant" && task.section !== "Retour PSPS") {
                              @if (isTaskCompliant(task)) {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-4 w-4 text-green-500 shrink-0"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              } @else if (hasTaskRejections(task)) {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-4 w-4 text-red-500 shrink-0"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              }
                            }
                            @if (selectedTask() === task) {
                              <div class="w-1.5 h-1.5 rounded-full bg-white shrink-0"></div>
                            }
                          </div>
                        </button>
                      }
                    </div>
                  }
                </div>
              }

              <!-- Additional Tasks (Documents Supplémentaires, Courriel d'offre, etc.) separated by line -->
              @for (task of groupedVisibleTasks().additionalTasks; track task.nameFr) {
                <hr class="my-3 border-t-2 border-slate-300" />
                <button
                  (click)="selectTask(task)"
                  class="w-full text-left p-3 rounded-xl transition-all duration-200 border border-transparent group relative overflow-hidden flex justify-between items-center"
                  [class.bg-slate-800]="selectedTask() === task"
                  [class.text-white]="selectedTask() === task"
                  [class.shadow-md]="selectedTask() === task"
                  [class.hover:bg-slate-200/80]="selectedTask() !== task"
                  [class.bg-white]="selectedTask() !== task"
                >
                  <div class="font-semibold text-xs pr-2 leading-snug">
                    {{ task.nameFr }}
                  </div>
                  <div class="flex items-center gap-1.5 shrink-0">
                    @if (task.nameFr.includes("Documents Supplémentaires")) {
                      @if (isTaskCompliant(task)) {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-green-500 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      } @else if (hasTaskRejections(task)) {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-red-500 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      }
                    }
                    @if (selectedTask() === task) {
                      <div class="w-1.5 h-1.5 rounded-full bg-white shrink-0"></div>
                    }
                  </div>
                </button>
              }
            </div>
          </nav>

          <!-- Panel 2: Documents & Verification Workspace -->
          <section
            class="flex-1 bg-slate-50 rounded-2xl shadow-xl flex flex-col border border-white/50 h-fit min-h-[300px]"
          >
            <div
              class="p-4 bg-white border-b border-slate-200 flex-none z-10 shadow-sm rounded-t-2xl"
            >
              <h2
                class="font-bold text-slate-700 uppercase text-sm tracking-wider flex items-center gap-2"
              >
                @if (selectedRole() === 'gestionnaire') {
                  Construction de courriels et de notes
                } @else {
                  Documents & Vérification
                }
              </h2>
            </div>

            <div class="p-4 scroll-smooth">
              @if (selectedTask(); as task) {
                <div class="mb-6 flex justify-between items-start">
                  <div>
                    <h3
                      class="text-xl font-bold text-slate-800 mb-1 leading-tight flex items-center gap-2"
                    >
                      {{ task.nameFr }}
                    </h3>
                    <p class="text-xs text-slate-500 font-medium">
                      {{ task.nameEn }}
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    @if (task.nameFr.includes("Offre") || task.nameFr.includes("Courriel d'offre") || task.section === "Courriel d'offre") {
                      <div class="inline-flex p-1 bg-slate-200/80 rounded-xl border border-slate-300 shadow-inner">
                        <button
                          type="button"
                          (click)="offreSubPanelMode.set('courriel')"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          [class.bg-white]="offreSubPanelMode() === 'courriel'"
                          [class.text-blue-700]="offreSubPanelMode() === 'courriel'"
                          [class.shadow-xs]="offreSubPanelMode() === 'courriel'"
                          [class.text-slate-600]="offreSubPanelMode() !== 'courriel'"
                          [class.hover:text-slate-900]="offreSubPanelMode() !== 'courriel'"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Courriel</span>
                        </button>
                        <button
                          type="button"
                          (click)="offreSubPanelMode.set('note')"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          [class.bg-white]="offreSubPanelMode() === 'note'"
                          [class.text-indigo-700]="offreSubPanelMode() === 'note'"
                          [class.shadow-xs]="offreSubPanelMode() === 'note'"
                          [class.text-slate-600]="offreSubPanelMode() !== 'note'"
                          [class.hover:text-slate-900]="offreSubPanelMode() !== 'note'"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Note</span>
                        </button>
                      </div>
                    }

                    @if (task.nameFr.startsWith("Questionnaire médical")) {
                      <label
                        class="flex items-center gap-2 p-2 px-3 rounded-lg border border-amber-200 bg-amber-50/70 hover:bg-amber-50 cursor-pointer text-xs font-bold text-amber-900 transition-all active:scale-95"
                      >
                        <span class="relative flex items-center">
                          <input
                            type="checkbox"
                            class="peer h-4 w-4 appearance-none rounded border-2 border-amber-300 bg-white checked:bg-amber-600 checked:border-amber-600 focus:outline-none transition-all"
                            [checked]="triageMedicalRequis()"
                            (change)="toggleTriageMedical()"
                          />
                          <svg
                            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span>Triage médical requis</span>
                      </label>
                    }

                    @if (selectedRole() !== 'gestionnaire' && !task.nameFr.includes("Documents Supplémentaires") && !task.nameFr.includes("Courriel d'offre")) {
                      <button
                        (click)="toggleTaskNotCompleted(task)"
                        class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm active:scale-95 whitespace-nowrap"
                        [class.bg-red-100]="isTaskNotCompleted(task)"
                        [class.border-red-300]="isTaskNotCompleted(task)"
                        [class.text-red-800]="isTaskNotCompleted(task)"
                        [class.bg-white]="!isTaskNotCompleted(task)"
                        [class.text-slate-500]="!isTaskNotCompleted(task)"
                        [class.hover:bg-slate-100]="!isTaskNotCompleted(task)"
                        [class.border-slate-300]="!isTaskNotCompleted(task)"
                      >
                        Tâche non complétée
                      </button>
                    }
                  </div>
                </div>

                <div class="space-y-4">
                  @if (isTaskNotCompleted(task)) {
                    <div
                      class="p-8 text-center bg-amber-50/50 border border-amber-200 rounded-xl text-amber-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-10 w-10 mx-auto mb-2 text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <p class="font-bold text-sm">
                        Tâche non complétée dans le portail
                      </p>
                      <p
                        class="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed"
                      >
                        Cette tâche est actuellement marquée comme non
                        complétée. Tous les documents de cette tâche sont
                        masqués pour le recruteur.
                      </p>
                    </div>
                  }

                  @if (task.nameFr === "Évaluation médicale") {
                    <!-- Sub-panel for Évaluation médicale -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Évaluation médicale — {{ evaluationMedicaleType() === 'Dossier OTA' ? 'OTA' : 'Local' }}</span>
                        </div>
                      </div>

                      <div class="p-4 space-y-4 rounded-b-xl">
                        <!-- Checkboxes for Medical Evaluation Options -->
                        <div>
                          <label class="block text-xs font-bold text-slate-700 mb-2">
                            Options d'évaluation médicale
                          </label>
                          <div class="space-y-2 text-xs">
                            <label class="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="evaluationMedicalePartie1()"
                                (change)="toggleEvaluationMedicalePartie1()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span class="font-medium text-slate-700">Évaluation médicale Partie 1</span>
                            </label>

                            <label class="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="evaluationMedicalePartie2()"
                                (change)="toggleEvaluationMedicalePartie2()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span class="font-medium text-slate-700">Évaluation médicale Partie 2</span>
                            </label>

                            <label class="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="evaluationMedicalePartie1Et2()"
                                (change)="toggleEvaluationMedicalePartie1Et2()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span class="font-medium text-slate-700">Évaluation médicale Partie 1 et 2</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  } @else if (task.nameFr === "Premier contact") {
                    <!-- Premier contact workspace panel -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Premier contact</span>
                        </div>
                      </div>

                      <div class="p-4 space-y-4 rounded-b-xl">
                        <div>
                          <label class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                            <input
                              type="checkbox"
                              [checked]="premierContactCourriel()"
                              (change)="togglePremierContactCourriel()"
                              class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span class="text-xs font-bold text-slate-800">Courriel de premier contact</span>
                          </label>
                        </div>

                        <div class="pt-3 border-t border-slate-100">
                          <label class="block text-xs font-bold text-slate-700 mb-1">
                            Tâches à compléter présentement
                          </label>
                          <p class="text-[11px] text-slate-500 mb-3">
                            Sélectionnez les tâches requises pour le postulant.
                          </p>

                          <div class="space-y-2 text-xs">
                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="premierContactMedical()"
                                (change)="togglePremierContactTask('medical')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">Évaluation médicale</span>
                                <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">
                                   {{ evaluationMedicaleType() === 'Dossier OTA' ? 'Rendez-vous fixé au centre de recrutement de Montréal' : 'Planifiez votre évaluation médicale' }}
                                </p>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="premierContactEntrevue()"
                                (change)="togglePremierContactTask('entrevue')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">Entrevue</span>
                                <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">Planifiez votre entrevue</p>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="premierContactGambit()"
                                (change)="togglePremierContactTask('gambit')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">Gambit</span>
                                <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">Références, antécédents d'emploi et d'études (Gambit)</p>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="premierContactPsps()"
                                (change)="togglePremierContactTask('psps')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">PSPS</span>
                                <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">Vérification du casier judiciaire et du dossier de crédit (PSPS/cette tâche n'est pas dans votre portail, vous recevrez un courriel envoyé par app@gambitid.com)</p>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="premierContactSelfie()"
                                (change)="togglePremierContactTask('selfie')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">Selfie</span>
                                <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">Pièce d'identité avec photo émise par le gouvernement canadien (les deux côtés)</p>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                  } @else if (task.nameFr === "Avis de fermeture" || task.section === "Suivi de dossier") {
                    <!-- Avis de fermeture workspace panel -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>Avis de fermeture</span>
                        </div>
                      </div>

                      <div class="p-4 space-y-4 rounded-b-xl">
                        <div>
                          <label class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                            <input
                              type="checkbox"
                              [checked]="avisFermetureCourriel()"
                              (change)="toggleAvisFermetureCourriel()"
                              class="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                            <span class="text-xs font-bold text-slate-800">Générer le courriel Avis de fermeture</span>
                          </label>
                        </div>

                        <div class="pt-3 border-t border-slate-100">
                          <label class="block text-xs font-bold text-slate-700 mb-1">
                            Nombre de jours de délai :
                          </label>
                          <select
                            class="w-full sm:w-48 p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-semibold text-slate-800 cursor-pointer"
                            [value]="avisFermetureDelaiJours()"
                            (change)="onAvisFermetureDelaiChange($any($event.target).value)"
                          >
                            <option value="3">3 jours</option>
                            <option value="5">5 jours</option>
                            <option value="7">7 jours</option>
                            <option value="14">14 jours</option>
                            <option value="autre">Autre</option>
                          </select>

                          @if (avisFermetureDelaiJours() === 'autre') {
                            <div class="mt-3 max-w-xs">
                              <app-calendar-picker
                                label="Date limite :"
                                [value]="avisFermetureDate()"
                                placeholder="Sélectionner une date..."
                                (dateSelected)="onAvisFermetureDateChange($event)"
                                (cleared)="onAvisFermetureDateChange('')"
                              ></app-calendar-picker>
                            </div>
                          }
                        </div>

                        <div class="pt-3 border-t border-slate-100">
                          <label class="block text-xs font-bold text-slate-700 mb-1">
                            Tâches à compléter dans le délai prescrit :
                          </label>
                          <p class="text-[11px] text-slate-500 mb-3">
                            Cochez les tâches requises à inclure dans l'avis de fermeture.
                          </p>

                          <div class="space-y-2 text-xs">
                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="avisFermetureEntrevue()"
                                (change)="toggleAvisFermetureTask('entrevue')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">Planifiez votre entrevue</span>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="avisFermetureMedicale()"
                                (change)="toggleAvisFermetureTask('medicale')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">Planifiez votre évaluation médicale</span>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="avisFermetureGambit()"
                                (change)="toggleAvisFermetureTask('gambit')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">Références, antécédents d'emploi et d'études (Gambit)</span>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="avisFermeturePsps()"
                                (change)="toggleAvisFermetureTask('psps')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">Vérification du casier judiciaire et du dossier de crédit (PSPS)</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                  } @else if (task.nameFr === "Annexe Q" || task.section === "Retour PSPS") {
                    <!-- Annexe Q workspace panel -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Annexe Q</span>
                        </div>
                      </div>

                      <div class="p-4 space-y-4 rounded-b-xl">
                        <div>
                          <label class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                            <input
                              type="checkbox"
                              [checked]="annexeQCourriel()"
                              (change)="toggleAnnexeQCourriel()"
                              class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <span class="text-xs font-bold text-slate-800">Générer le courriel Annexe Q</span>
                          </label>
                        </div>

                        <div class="pt-3 border-t border-slate-100">
                          <label class="block text-xs font-bold text-slate-700 mb-1">
                            Alpha du postulant :
                          </label>
                          <input
                            type="text"
                            class="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-semibold text-slate-800"
                            placeholder="Entrez le Alpha du postulant (ex: A12345678)..."
                            [value]="annexeQAlphaPostulant()"
                            (input)="onAnnexeQAlphaChange($any($event.target).value)"
                          />
                        </div>
                      </div>
                    </div>

                  } @else if (task.nameFr.includes("Offre") || task.nameFr.includes("Courriel d'offre") || task.section === "Courriel d'offre") {
                    <!-- Courriel & Note d'offre workspace panel -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      @if (offreSubPanelMode() === 'courriel') {
                        <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                          <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Informations de l'offre à remplir — {{ task.nameFr }}</span>
                          </div>
                        </div>

                      <div class="p-4 bg-white space-y-3 rounded-b-xl">
                        <!-- Case à cocher pour la génération de courriel d'offre -->
                        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <div class="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Génération de courriel :</div>
                          @if (task.nameFr.toLowerCase().includes('subventionn')) {
                            <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="offreEtudesSubventionneesChecked()"
                                (change)="toggleOffreEtudesSubventionnees()"
                                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">Générer courriel d'études subventionnées</span>
                            </label>
                          } @else {
                            <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="offreNormaleChecked()"
                                (change)="toggleOffreNormale()"
                                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">
                                Générer courriel d'offre normale
                              </span>
                            </label>
                          }
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <!-- Ligne 1 : Métier / Programme d'enrôlement -->
                          <div class="relative">
                            <label class="block font-semibold text-slate-700 mb-1">Métier :</label>
                            <div class="flex items-center border border-slate-300 rounded-lg bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-500 text-xs min-h-[34px] transition-all">
                              <input
                                type="text"
                                class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                                placeholder="Rechercher un métier..."
                                [value]="offreMetierSearchQuery()"
                                (input)="onOffreMetierQueryChange($any($event.target).value)"
                                (focus)="offreMetierDropdownOpen.set(true)"
                                (blur)="closeOffreMetierDropdownDelayed()"
                              />
                              @if (offreMetierSearchQuery()) {
                                <button
                                  type="button"
                                  (click)="clearOffreMetier($event)"
                                  class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                                  title="Effacer métier"
                                >
                                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              }
                            </div>

                            <!-- Dropdown List -->
                            @if (offreMetierDropdownOpen()) {
                              <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                                @let filteredOffreJobs = getFilteredJobsForOffre();
                                @if (filteredOffreJobs.length === 0) {
                                  <div class="p-2 text-slate-400 text-center italic">Aucun métier trouvé</div>
                                }
                                @for (job of filteredOffreJobs; track job.id) {
                                  <button
                                    type="button"
                                    (mousedown)="selectOffreMetier(job)"
                                    class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                                  >
                                    <span class="font-medium text-slate-800 truncate">{{ job.id }} - {{ job.title }}</span>
                                    @if (job.element) {
                                      <span
                                        class="text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0"
                                        [class.bg-amber-100]="job.element === 'CMP'"
                                        [class.text-amber-800]="job.element === 'CMP'"
                                        [class.bg-emerald-100]="job.element === 'Armée'"
                                        [class.text-emerald-800]="job.element === 'Armée'"
                                        [class.bg-sky-100]="job.element === 'Air'"
                                        [class.text-sky-800]="job.element === 'Air'"
                                        [class.bg-indigo-100]="job.element === 'Marine'"
                                        [class.text-indigo-800]="job.element === 'Marine'"
                                      >
                                        {{ job.element }}
                                      </span>
                                    }
                                  </button>
                                }
                              </div>
                            }
                          </div>

                          <div>
                            <div class="flex items-center justify-between mb-1">
                              <label class="block font-semibold text-slate-700 text-xs">Programme d'enrôlement :</label>
                              @if (offreJobType(); as jType) {
                                <span
                                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all"
                                  [class.bg-purple-100]="jType === 'officier'"
                                  [class.text-purple-700]="jType === 'officier'"
                                  [class.bg-blue-100]="jType === 'mr'"
                                  [class.text-blue-700]="jType === 'mr'"
                                >
                                  {{ jType === 'officier' ? 'Officiers' : 'Militaires du rang (MR)' }}
                                </span>
                              }
                            </div>
                            <select
                              class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                              [value]="offreProgrammeEnrolement()"
                              (change)="setOffreProgrammeEnrolement($any($event.target).value)"
                            >
                              <option value="">-- Sélectionner un programme --</option>
                              @for (prog of availableOffreProgrammes(); track prog) {
                                <option [value]="prog">{{ prog }}</option>
                              }
                            </select>
                          </div>

                          <!-- Ligne 2 : Élément / Date d'enrôlement -->
                          <div>
                            <div class="flex items-center justify-between mb-1">
                              <label class="block font-semibold text-slate-700 text-xs">Élément :</label>
                              @if (offreDetectedElement(); as elem) {
                                @if (elem === 'CMP') {
                                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                    CMP : Choix du postulant
                                  </span>
                                } @else {
                                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                    Auto : {{ elem }}
                                  </span>
                                }
                              }
                            </div>
                            <select
                              class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                              [value]="offreElement()"
                              (change)="setOffreElement($any($event.target).value)"
                            >
                              <option value="">-- Sélectionner un élément --</option>
                              <option value="Air">Air</option>
                              <option value="Armée">Armée</option>
                              <option value="Marine">Marine</option>
                            </select>
                          </div>

                          <div>
                            <app-calendar-picker
                              label="Date d'enrôlement :"
                              [value]="offreDateEnrolement()"
                              placeholder="Sélectionner une date..."
                              (dateSelected)="setOffreDateEnrolement($event)"
                              (cleared)="setOffreDateEnrolement('')"
                            ></app-calendar-picker>
                            <p class="mt-1 text-[11px] text-slate-500">
                              Dans le courriel : <span class="font-semibold text-slate-700">Date d'enrôlement : {{ getOffreDateEnrolementFull() }}</span>
                            </p>
                          </div>

                          @if (task.nameFr.toLowerCase().includes('subventionn') || offreEtudesSubventionneesChecked()) {
                            <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl">
                              <div>
                                <label class="block font-semibold text-slate-700 mb-1">Durée du contrat :</label>
                                <input
                                  type="text"
                                  class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all"
                                  placeholder="ex: 5 ans"
                                  [value]="offreDureeContrat()"
                                  (input)="setOffreDureeContrat($any($event.target).value)"
                                />
                              </div>

                              <div>
                                <label class="block font-semibold text-slate-700 mb-1">Études subventionnées :</label>
                                <input
                                  type="text"
                                  class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all"
                                  placeholder="ex: Baccalauréat"
                                  [value]="offreEtudesSubventionnees()"
                                  (input)="setOffreEtudesSubventionnees($any($event.target).value)"
                                />
                              </div>

                              <div>
                                <label class="block font-semibold text-slate-700 mb-1">Durée des études subventionnées :</label>
                                <select
                                  class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                  [value]="offreDureeEtudesSubventionnees()"
                                  (change)="setOffreDureeEtudesSubventionnees($any($event.target).value)"
                                >
                                  <option value="">-- Sélectionner --</option>
                                  <option value="1 an">1 an</option>
                                  <option value="2 ans">2 ans</option>
                                  <option value="3 ans">3 ans</option>
                                  <option value="4 ans">4 ans</option>
                                  <option value="5 ans">5 ans</option>
                                </select>
                              </div>
                            </div>
                          }

                          <!-- Ligne 3 : Date d'arrivée à l'unité d'affectation / Heures d'arrivée postulant et invité (toujours ouvert) -->
                          <div>
                            <app-calendar-picker
                              label="Date d'arrivée à votre unité :"
                              [value]="offreDateArriveeUnite()"
                              placeholder="Sélectionner une date d'arrivée..."
                              (dateSelected)="setOffreDateArriveeUnite($event)"
                              (cleared)="setOffreDateArriveeUnite('')"
                            ></app-calendar-picker>
                            <p class="mt-1 text-[11px] text-slate-500">
                              Dans le courriel : <span class="font-semibold text-slate-700">Date d'arrivée : {{ getOffreDateArriveeUniteFull() }}</span>
                            </p>
                          </div>

                          <div>
                            <label class="block font-semibold text-slate-700 mb-1 text-xs">Heures d'arrivée (cérémonie) :</label>
                            <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div>
                                  <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Arrivée postulant :</span>
                                  </label>
                                  <select
                                    class="w-full p-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer shadow-xs"
                                    [value]="offreHeureArriveePostulant()"
                                    (change)="onOffreHeurePostulantChange($any($event.target).value)"
                                  >
                                    @for (h of enrolmentHoursList; track h) {
                                      <option [value]="h" [selected]="h === offreHeureArriveePostulant()">{{ h }}</option>
                                    }
                                  </select>
                                </div>

                                <div>
                                  <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>Arrivée invités :</span>
                                  </label>
                                  <select
                                    class="w-full p-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer shadow-xs"
                                    [value]="offreHeureArriveeInvites()"
                                    (change)="onOffreHeureInvitesChange($any($event.target).value)"
                                  >
                                    @for (h of enrolmentHoursList; track h) {
                                      <option [value]="h" [selected]="h === offreHeureArriveeInvites()">{{ h }}</option>
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!-- Ligne 4 : Unité d'affectation / Dates de cours -->
                          <div>
                            <app-unit-picker
                              [selectedId]="offreUniteAffectation()"
                              (unitSelected)="setOffreUniteAffectationObj($event)"
                              (cleared)="setOffreUniteAffectation('')"
                            ></app-unit-picker>
                          </div>

                          <div>
                            <app-course-series-picker
                              [serie]="offreSerieCours()"
                              [dateDebut]="offreDateCoursDebut()"
                              [dateFin]="offreDateCoursFin()"
                              (courseSelected)="setCourseSession($event)"
                              (cleared)="clearCourseSession()"
                            ></app-course-series-picker>
                          </div>

                          <!-- Ligne 5 : Lieu de l'enrôlement -->
                          <div class="md:col-span-2">
                            <label class="block font-semibold text-slate-700 mb-1 text-xs">Lieu de l'enrôlement :</label>
                            <select
                              class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                              [value]="offreLieuVille()"
                              (change)="onOffreLieuVilleChange($any($event.target).value)"
                            >
                              @for (center of recruitmentCentersList; track center.city) {
                                <option [value]="center.city" [selected]="center.city === offreLieuVille()">{{ center.city }} : {{ center.name }}</option>
                              }
                            </select>
                          </div>

                          <!-- Ligne 6 : Date limite -->
                          <div class="md:col-span-2">
                            <app-calendar-picker
                              label="Date limite (au plus tard le) :"
                              [value]="offreDateElementsManquants()"
                              placeholder="Sélectionner une date limite..."
                              (dateSelected)="setOffreDateElementsManquants($event)"
                              (cleared)="setOffreDateElementsManquants('')"
                            ></app-calendar-picker>
                            <p class="mt-1 text-[11px] text-slate-500">
                              Dans le courriel : <span class="font-semibold text-slate-700">au plus tard le{{ offreDateElementsManquants() ? ' ' + offreDateElementsManquants() : '' }}</span>
                            </p>
                          </div>

                          <!-- Ligne 7 : Élément(s) manquant(s) -->
                          <div class="md:col-span-2">
                            <label class="block font-semibold text-slate-700 mb-1 text-xs">Élément(s) manquant(s) :</label>
                            <textarea
                              rows="3"
                              class="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all resize-y font-medium text-slate-800"
                              [value]="offreElementsManquants()"
                              (input)="setOffreElementsManquants($any($event.target).value)"
                              placeholder="Spécimen de chèque&#10;Élément 2..."
                            ></textarea>
                            <p class="mt-1 text-[11px] text-slate-500">
                              Écrivez un élément par ligne (appuyez sur Entrée pour chaque nouvel élément). Ils apparaîtront sous forme de liste numérotée dans le courriel.
                            </p>
                          </div>
                        </div>
                      </div>
                      } @else {
                        <!-- Note Sub-panel -->
                        <div class="p-3 bg-indigo-50/80 border-b border-indigo-100 flex items-center justify-between rounded-t-xl">
                          <div class="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Informations de la note à remplir — {{ task.nameFr }}</span>
                          </div>
                        </div>

                        <div class="p-4 bg-white space-y-3 rounded-b-xl">
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <!-- Métier (Transférable/partagé) -->
                            <div class="relative">
                              <label class="block font-semibold text-slate-700 mb-1">Métier :</label>
                              <div class="flex items-center border border-slate-300 rounded-lg bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500 text-xs min-h-[34px] transition-all">
                                <input
                                  type="text"
                                  class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                                  placeholder="Rechercher un métier..."
                                  [value]="offreMetierSearchQuery()"
                                  (input)="onOffreMetierQueryChange($any($event.target).value)"
                                  (focus)="offreMetierDropdownOpen.set(true)"
                                  (blur)="closeOffreMetierDropdownDelayed()"
                                />
                                @if (offreMetierSearchQuery()) {
                                  <button
                                    type="button"
                                    (click)="clearOffreMetier($event)"
                                    class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                                    title="Effacer métier"
                                  >
                                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                }
                              </div>

                              @if (offreMetierDropdownOpen()) {
                                <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                                  @let filteredOffreJobs = getFilteredJobsForOffre();
                                  @if (filteredOffreJobs.length === 0) {
                                    <div class="p-2 text-slate-400 text-center italic">Aucun métier trouvé</div>
                                  }
                                  @for (job of filteredOffreJobs; track job.id) {
                                    <button
                                      type="button"
                                      (mousedown)="selectOffreMetier(job)"
                                      class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                                    >
                                      <span class="font-medium text-slate-800 truncate">{{ job.id }} - {{ job.title }}</span>
                                    </button>
                                  }
                                </div>
                              }
                            </div>

                            <!-- Statut civil -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Statut :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteStatutCivil()"
                                (change)="setNoteStatutCivil($any($event.target).value)"
                              >
                                @for (opt of statutCivilOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>
                            <!-- Conjoint -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Conjoint :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteConjoint()"
                                (change)="setNoteConjoint($any($event.target).value)"
                              >
                                @for (opt of ouiNonOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                              @if (noteConjoint() === 'oui') {
                                <input
                                  type="text"
                                  class="w-full p-2 mt-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                  placeholder="Texte du conjoint"
                                  [value]="noteConjointTexte()"
                                  (input)="onNoteConjointTexteInput($any($event.target).value)"
                                />
                              }
                            </div>
                            <!-- Enfant -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Enfant(s) à charge :</label>
                              <input
                                type="number"
                                min="0"
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                placeholder="Nombre d'enfants"
                                [value]="noteEnfantCount()"
                                (input)="onEnfantCountChange($any($event.target).value)"
                              />
                              @if (noteEnfantDetails().length > 0) {
                                <div class="mt-2 space-y-2 p-2 bg-indigo-50/50 rounded-lg border border-indigo-100">
                                  @for (child of noteEnfantDetails(); track $index; let i = $index) {
                                    <div class="flex items-center gap-2">
                                      <select
                                        class="w-1/3 p-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium text-slate-800"
                                        [value]="child.sex"
                                        (change)="updateEnfantDetail(i, 'sex', $any($event.target).value)"
                                      >
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                      </select>
                                      <select
                                        class="w-2/3 p-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium text-slate-800"
                                        [value]="child.year"
                                        (change)="updateEnfantDetail(i, 'year', $any($event.target).value)"
                                      >
                                        @for (year of getEnfantYears(); track year) {
                                          <option [value]="year">{{ year }}</option>
                                        }
                                      </select>
                                    </div>
                                  }
                                </div>
                              }
                            </div>

                            <!-- Plaque IMM -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Plaque IMM :</label>
                              <input
                                type="text"
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                placeholder="À confirmer"
                                [value]="notePlaqueImm()"
                                (input)="setNotePlaqueImm($any($event.target).value)"
                              />
                            </div>

                            <!-- Bris de bail -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Bris de bail :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteBrisBail()"
                                (change)="setNoteBrisBail($any($event.target).value)"
                              >
                                @for (opt of brisBailOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Entreposage -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Entreposage :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteEntreposage()"
                                (change)="setNoteEntreposage($any($event.target).value)"
                              >
                                @for (opt of entreposageOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Serment / Déclaration -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Serment / Déclaration :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteSermentDeclaration()"
                                (change)="setNoteSermentDeclaration($any($event.target).value)"
                              >
                                @for (opt of sermentDeclarationOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Invité mil -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Invité mil :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteInviteMil()"
                                (change)="setNoteInviteMil($any($event.target).value)"
                              >
                                @for (opt of ouiNonOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                              @if (noteInviteMil() === 'oui') {
                                <input
                                  type="text"
                                  class="w-full p-2 mt-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                  placeholder="Préciser l'invité"
                                  [value]="noteInviteMilTexte()"
                                  (input)="setNoteInviteMilTexte($any($event.target).value)"
                                />
                              }
                            </div>

                            <!-- Svc Mil ant -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Svc Mil ant :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteSvcMilAnt()"
                                (change)="setNoteSvcMilAnt($any($event.target).value)"
                              >
                                @for (opt of svcMilAntOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Bénéficiaire -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Bénéficiaire :</label>
                              <input
                                type="text"
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                placeholder="Bénéficiaire"
                                [value]="noteBeneficiaire()"
                                (input)="setNoteBeneficiaire($any($event.target).value)"
                              />
                            </div>

                            <!-- Date courriel de confirmation -->
                            <div>
                              <app-calendar-picker
                                label="Courriel de confirmation envoyé le :"
                                [value]="getEffectiveNoteDateCourrielConfirmation()"
                                placeholder="Sélectionner une date..."
                                (dateSelected)="setNoteDateCourrielConfirmation($event)"
                                (cleared)="setNoteDateCourrielConfirmation('')"
                              ></app-calendar-picker>
                            </div>
                          </div>


                        </div>
                      }
                    </div>
                  } @else if (task.section === "Courriel enrôlement" || task.nameFr.includes("Rappel cérémonie")) {
                    <!-- Rappel cérémonie d'assermentation workspace panel -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Informations du courriel — {{ task.nameFr }}</span>
                        </div>
                      </div>
                      <div class="p-4 bg-white space-y-3 rounded-b-xl">
                        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <div class="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Génération de courriel :</div>
                          <div class="grid grid-cols-1 gap-2">
                            <label class="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="rappelCeremonieChecked()"
                                (change)="toggleRappelCeremonie()"
                                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">Générer courriel Rappel cérémonie d'assermentation</span>
                            </label>
                          </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <app-calendar-picker
                              label="Date de l'enrôlement :"
                              [value]="rappelCeremonieDate()"
                              placeholder="Sélectionner une date..."
                              (dateSelected)="onRappelCeremonieDateSelected($event)"
                              (cleared)="onRappelCeremonieDateSelected('')"
                            ></app-calendar-picker>
                          </div>

                          <div class="flex items-center gap-2">
                            <div class="w-1/2">
                              <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Heure postulant :</span>
                              </label>
                              <select
                                class="w-full p-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer shadow-xs"
                                [value]="rappelCeremonieHeurePostulant()"
                                (change)="onRappelCeremonieHeurePostulantChange($any($event.target).value)"
                              >
                                @for (h of enrolmentHoursList; track h) {
                                  <option [value]="h" [selected]="h === rappelCeremonieHeurePostulant()">{{ h }}</option>
                                }
                              </select>
                            </div>
                            <div class="w-1/2">
                              <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>Heure invités :</span>
                              </label>
                              <select
                                class="w-full p-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer shadow-xs"
                                [value]="rappelCeremonieHeureInvites()"
                                (change)="onRappelCeremonieHeureInvitesChange($any($event.target).value)"
                              >
                                @for (h of enrolmentHoursList; track h) {
                                  <option [value]="h" [selected]="h === rappelCeremonieHeureInvites()">{{ h }}</option>
                                }
                              </select>
                            </div>
                          </div>

                          <div class="md:col-span-2">
                            <label class="block font-semibold text-slate-700 mb-1 text-xs">Centre de recrutement :</label>
                            <select
                              class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                              [value]="rappelCeremonieLieu()"
                              (change)="onRappelCeremonieLieuChange($any($event.target).value)"
                            >
                              @for (center of recruitmentCentersList; track center.city) {
                                <option [value]="center.city" [selected]="center.city === rappelCeremonieLieu()">{{ center.city }} : {{ center.name }}</option>
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  } @else if (task.nameFr.includes("Documents Supplémentaires")) {
                    <!-- Header Banner for Dossier Jobs -->
                    <div class="mb-4 p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900 shadow-sm">
                      <div class="flex items-center gap-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span class="font-bold">Métier(s) au dossier :</span>
                          <span class="ml-1 font-medium">{{ getDossierJobsSummaryTextFr() }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- DOCUMENTS SUPPLÉMENTAIRES SELON LES TÂCHES (Toujours visible) -->
                    @if (hasVisibleTaskBasedDocs(task)) {
                      <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                        <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                          <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>Documents supplémentaires selon la situation du postulant</span>
                          </div>
                        </div>

                        <div class="p-3 bg-white space-y-1 rounded-b-xl">
                          @for (doc of task.documents; track doc.nameFr) {
                            @if (isTaskBasedAdditionalDoc(doc) && shouldShowDoc(task, doc)) {
                              @for (reason of doc.reasons; track reason.id) {
                                @if (shouldShowReason(task, doc, reason)) {
                                  <label
                                    class="flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all select-none border border-transparent hover:bg-slate-50"
                                    [class.bg-blue-50]="isReasonSelected(doc, reason)"
                                    [class.border-blue-100]="isReasonSelected(doc, reason)"
                                  >
                                    <div class="relative flex items-center mt-0.5">
                                      <input
                                        type="checkbox"
                                        class="peer h-4 w-4 appearance-none rounded border-2 border-slate-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                                        [checked]="isReasonSelected(doc, reason)"
                                        (change)="toggleReason(task, doc, reason)"
                                      />
                                      <svg
                                        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                      <span
                                        class="text-xs text-slate-700 leading-snug block transition-colors"
                                        [class.font-semibold]="isReasonSelected(doc, reason)"
                                        [class.text-blue-900]="isReasonSelected(doc, reason)"
                                      >
                                        <strong class="font-bold text-slate-800">{{ doc.nameFr }} :</strong> {{ reason.labelFr }}
                                      </span>
                                    </div>
                                  </label>
                                }
                              }
                            }
                          }
                        </div>
                      </div>
                    }

                    <!-- ÉTUDES SUBVENTIONNÉES (Toujours visible) -->
                    @if (hasVisibleSubsidizedDocs(task)) {
                      <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                        <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                          <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            </svg>
                            <span>Études subventionnées</span>
                          </div>
                        </div>

                        <div class="p-3 bg-white space-y-1 rounded-b-xl">
                          @for (doc of task.documents; track doc.nameFr) {
                            @if (isSubsidizedDoc(doc) && shouldShowDoc(task, doc)) {
                              @for (reason of doc.reasons; track reason.id) {
                                @if (shouldShowReason(task, doc, reason)) {
                                  <label
                                    class="flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all select-none border border-transparent hover:bg-slate-50"
                                    [class.bg-blue-50]="isReasonSelected(doc, reason)"
                                    [class.border-blue-100]="isReasonSelected(doc, reason)"
                                  >
                                    <div class="relative flex items-center mt-0.5">
                                      <input
                                        type="checkbox"
                                        class="peer h-4 w-4 appearance-none rounded border-2 border-slate-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                                        [checked]="isReasonSelected(doc, reason)"
                                        (change)="toggleReason(task, doc, reason)"
                                      />
                                      <svg
                                        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="3"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                      <span
                                        class="text-xs text-slate-700 leading-snug block transition-colors"
                                        [class.font-semibold]="isReasonSelected(doc, reason)"
                                        [class.text-blue-900]="isReasonSelected(doc, reason)"
                                      >
                                        <strong class="font-bold text-slate-800">{{ doc.nameFr }} :</strong> {{ reason.labelFr }}
                                      </span>
                                    </div>
                                  </label>
                                }
                              }
                            }
                          }
                        </div>
                      </div>
                    }

                    <!-- DOCUMENTS SUPPLÉMENTAIRES SELON LES MÉTIERS -->
                    @if (hasVisibleAdditionalDocs(task)) {
                      <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                        <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                          <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Documents supplémentaires selon les métiers</span>
                          </div>

                          <button
                            (click)="toggleAdditionalJobDocsCompliant(task)"
                            class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
                            [class.bg-green-100]="isAdditionalJobDocsCompliant(task)"
                            [class.border-green-300]="isAdditionalJobDocsCompliant(task)"
                            [class.text-green-800]="isAdditionalJobDocsCompliant(task)"
                            [class.bg-white]="!isAdditionalJobDocsCompliant(task)"
                            [class.text-slate-500]="!isAdditionalJobDocsCompliant(task)"
                            [class.hover:bg-slate-100]="!isAdditionalJobDocsCompliant(task)"
                            [class.border-slate-300]="!isAdditionalJobDocsCompliant(task)"
                          >
                            Conforme
                          </button>
                        </div>

                        <div class="p-3 bg-white space-y-3 rounded-b-xl">
                          @for (job of getDossierJobObjects(); track job.id) {
                            @if (hasJobAdditionalDocs(task, job)) {
                              <div class="space-y-1 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80">
                                <div class="text-xs font-bold text-slate-800 pb-1.5 px-0.5 flex items-center gap-2 border-b border-slate-200/80 mb-1.5">
                                  <span class="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                                  <span>Pour {{ job.id }} - {{ job.title }} :</span>
                                </div>
                                @for (doc of task.documents; track doc.nameFr) {
                                  @if (!isSubsidizedDoc(doc) && !isTaskBasedAdditionalDoc(doc) && isAdditionalDocRequiredForJob(doc.nameFr, job.id) && shouldShowDoc(task, doc)) {
                                    @for (reason of doc.reasons; track reason.id) {
                                      @if (shouldShowReason(task, doc, reason)) {
                                        <label
                                          class="flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-all select-none border border-transparent hover:bg-white bg-white/70 shadow-2xs"
                                          [class.bg-blue-50]="isJobReasonSelected(job, doc, reason)"
                                          [class.border-blue-200]="isJobReasonSelected(job, doc, reason)"
                                        >
                                          <div class="relative flex items-center mt-0.5">
                                            <input
                                              type="checkbox"
                                              class="peer h-4 w-4 appearance-none rounded border-2 border-slate-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                                              [checked]="isJobReasonSelected(job, doc, reason)"
                                              (change)="toggleJobReason(task, job, doc, reason)"
                                            />
                                            <svg
                                              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              stroke-width="3"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            >
                                              <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                          </div>
                                          <div class="flex-1 min-w-0">
                                            <span
                                              class="text-xs text-slate-700 leading-snug block transition-colors"
                                              [class.font-semibold]="isJobReasonSelected(job, doc, reason)"
                                              [class.text-blue-900]="isJobReasonSelected(job, doc, reason)"
                                            >
                                              <strong class="font-bold text-slate-800">{{ doc.nameFr }} :</strong> {{ getJobSpecificDocText(job.id, doc.nameFr, true) }}
                                            </span>
                                          </div>
                                        </label>
                                      }
                                    }
                                  }
                                }
                              </div>
                            }
                          }
                        </div>
                      </div>
                    }
                  } @else {
                    @if (task.documents.length === 0) {
                      <div class="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 shadow-xs my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p class="font-semibold text-sm text-slate-700">Aucun document pour cette tâche</p>
                        <p class="text-xs text-slate-400 mt-1">Le panneau documents et vérification pour cette tâche sera mis à jour ultérieurement.</p>
                      </div>
                    }
                    @for (
                      doc of task.documents;
                      track doc.nameFr;
                      let isLastDoc = $last
                    ) {
                    <!-- Check dynamic visibility logic -->
                    @if (shouldShowDoc(task, doc)) {
                      <div
                        class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
                      >
                        <!-- Header: Name + Button side-by-side -->
                        <div
                          class="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center gap-3"
                        >
                          <div class="flex-1 min-w-0">
                            <!-- Conditional Document Name Display -->
                            <div
                              class="font-bold text-slate-700 text-sm leading-snug"
                            >
                              @if (
                                stage() === "minor-check" &&
                                doc.nameFr === "Certificat de naissance"
                              ) {
                                Certificat de naissance version long avec le nom
                                des parents
                              } @else {
                                {{ doc.nameFr }}
                              }
                            </div>
                            <div
                              class="text-[10px] text-slate-500 leading-tight truncate"
                            >
                              {{ doc.nameEn }}
                            </div>
                          </div>

                          <!-- Compact Conforme Button -->
                          @if (!isLastDoc) {
                            <button
                              (click)="toggleCompliant(task, doc)"
                              class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm active:scale-95 whitespace-nowrap"
                              [class.bg-green-100]="isCompliant(task, doc)"
                              [class.border-green-300]="isCompliant(task, doc)"
                              [class.text-green-800]="isCompliant(task, doc)"
                              [class.bg-white]="!isCompliant(task, doc)"
                              [class.text-slate-500]="!isCompliant(task, doc)"
                              [class.hover:bg-slate-100]="
                                !isCompliant(task, doc)
                              "
                              [class.border-slate-300]="!isCompliant(task, doc)"
                            >
                              Conforme
                            </button>
                          }
                        </div>

                        <!-- Rejection Reasons List -->
                        <div class="p-3 bg-white space-y-1">
                          @if (hasNormalReasons(doc)) {
                            <div
                              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"
                            >
                              Motifs de rejet
                            </div>
                            @for (reason of doc.reasons; track reason.id) {
                              @if (
                                shouldShowReason(task, doc, reason) &&
                                !reason.isConfirmation &&
                                !reason.isAdditionalDoc
                              ) {
                                <label
                                  class="flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-all select-none border border-transparent hover:bg-slate-50"
                                  [class.bg-red-50]="
                                    isReasonSelected(doc, reason)
                                  "
                                  [class.border-red-100]="
                                    isReasonSelected(doc, reason)
                                  "
                                >
                                  <div
                                    class="relative flex items-center mt-0.5"
                                  >
                                    <input
                                      type="checkbox"
                                      class="peer h-4 w-4 appearance-none rounded border-2 border-slate-300 bg-white checked:bg-slate-800 checked:border-slate-800 focus:outline-none transition-all"
                                      [checked]="isReasonSelected(doc, reason)"
                                      (change)="toggleReason(task, doc, reason)"
                                    />
                                    <svg
                                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="3"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    >
                                      <polyline
                                        points="20 6 9 17 4 12"
                                      ></polyline>
                                    </svg>
                                  </div>
                                  <span
                                    class="text-xs text-slate-600 leading-snug pt-0.5 transition-colors"
                                    [class.font-semibold]="
                                      isReasonSelected(doc, reason)
                                    "
                                    [class.text-slate-800]="
                                      isReasonSelected(doc, reason)
                                    "
                                    >{{ reason.labelFr }}</span
                                  >
                                </label>
                              }
                            }
                          }

                          @if (hasAdditionalDocReasons(doc)) {
                            <div
                              class="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 ml-1 mt-4"
                            >
                              Documents supplémentaires
                            </div>
                            @for (reason of doc.reasons; track reason.id) {
                              @if (
                                shouldShowReason(task, doc, reason) &&
                                reason.isAdditionalDoc
                              ) {
                                <label
                                  class="flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-all select-none border border-transparent hover:bg-slate-50"
                                  [class.bg-blue-50]="
                                    isReasonSelected(doc, reason)
                                  "
                                  [class.border-blue-100]="
                                    isReasonSelected(doc, reason)
                                  "
                                >
                                  <div
                                    class="relative flex items-center mt-0.5"
                                  >
                                    <input
                                      type="checkbox"
                                      class="peer h-4 w-4 appearance-none rounded border-2 border-slate-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                                      [checked]="isReasonSelected(doc, reason)"
                                      (change)="toggleReason(task, doc, reason)"
                                    />
                                    <svg
                                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="3"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    >
                                      <polyline
                                        points="20 6 9 17 4 12"
                                      ></polyline>
                                    </svg>
                                  </div>
                                  <span
                                    class="text-xs text-slate-600 leading-snug pt-0.5 transition-colors"
                                    [class.font-semibold]="
                                      isReasonSelected(doc, reason)
                                    "
                                    [class.text-slate-800]="
                                      isReasonSelected(doc, reason)
                                    "
                                    >{{ reason.labelFr }}</span
                                  >
                                </label>
                              }
                            }
                          }
                        </div>
                      </div>
                    }
                  }
                }
                </div>
              } @else {
                <div
                  class="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center opacity-60"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 mb-4 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p class="text-sm font-medium">Sélectionnez une option pour afficher les détails</p>
                </div>
              }
            </div>
          </section>
        </div>

        <!-- BOTTOM ROW: Panel 3 Recruteur (Email & Note) -->
        @if (
          selectedRole() !== 'gestionnaire' && (
            hasSelectedRejections() ||
            forceGeneralReminder() ||
            selectedEmailBankTemplate() !== '' ||
            allTasksCompliant() ||
            offreNormaleChecked() ||
            offreEtudesSubventionneesChecked()
          )
        ) {
          <section
            class="flex-none min-h-[300px] mb-8 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-white/50 transition-all duration-500 ease-in-out"
          >
            <div
              class="p-4 bg-slate-50 border-b border-slate-200 flex-none z-10 flex justify-between items-center"
            >
              <h2
                class="font-bold text-slate-700 uppercase text-sm tracking-wider flex items-center gap-2"
              >
                {{
                  allTasksCompliant() ? "Instructions, Note & Courriel" : "Courriel & Note"
                }}
              </h2>

              <div class="flex items-center gap-3">
                @if (!allTasksCompliant()) {
                  <label
                    class="flex items-center gap-2 text-xs font-semibold text-slate-700 mr-2 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all"
                      [checked]="sharedState.includeLinkedEmail()"
                      (change)="toggleIncludeReo()"
                    />
                    <span class="relative">
                      <svg
                        class="absolute -left-[1.15rem] top-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Fusion courriel de Tâche(s) et courriel de Réo
                    </span>
                  </label>
                }

                <button
                  (click)="copyNote()"
                  class="text-xs bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md shadow-sm border border-slate-300 font-semibold transition-all active:scale-95 flex items-center gap-1.5"
                >
                  @if (copiedNote()) {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-green-700">Note Copiée!</span>
                  } @else {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    <span>Copier Note</span>
                  }
                </button>

                <button
                  (click)="exportToOutlook()"
                  class="text-xs text-white px-4 py-1.5 rounded-md shadow-md font-medium transition-all active:scale-95 flex items-center gap-2"
                  [class.bg-slate-800]="!copiedEmail()"
                  [class.hover:bg-slate-700]="!copiedEmail()"
                  [class.bg-green-600]="copiedEmail()"
                >
                  @if (copiedEmail()) {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Copié ! Ouverture d'Outlook...
                  } @else {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Exporter vers Outlook
                  }
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30">
              @if (allTasksCompliant()) {
                <!-- Instructions pour le recruteur -->
                <div
                  class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    class="bg-slate-100/80 px-4 py-3 border-b border-slate-200 flex justify-between items-center backdrop-blur-sm"
                  >
                    <h3
                      class="font-bold text-slate-700 text-sm flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Instructions pour le sgt recruteur
                    </h3>
                  </div>
                  <div
                    class="p-8 bg-white text-sm text-slate-800 leading-relaxed font-sans border-none"
                  >
                    <ol class="list-decimal list-inside space-y-2">
                      <li>
                        S'assurer que la liste de vérification A1 à A35 est bien
                        rempli.
                      </li>
                      <li>
                        Attribuer la tâche : Planifiez votre séance d'information des FAC 101.
                      </li>
                      <li>
                        Mettre le marqueur ‘’Dispense requise’’ ou ‘’ÉRA requise’’ au besoin, le Ltv Forest fera l’analyse
                      </li>
                      <li>Ajouter la note au registre du postulant.</li>
                      <li>
                        Envoyé le courriel au postulant contenant le lien vers
                        le Form et le CAF 101.
                      </li>
                    </ol>
                  </div>
                </div>
              }

              <!-- Note Section -->
              <div
                class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  class="bg-slate-100/80 px-4 py-3 border-b border-slate-200 flex justify-between items-center backdrop-blur-sm"
                >
                  <h3
                    class="font-bold text-slate-700 text-sm flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Note au Registre (Interne)
                  </h3>
                </div>
                <div class="p-4 bg-slate-50">
                  <div
                    class="w-full bg-transparent text-sm font-mono text-slate-600 select-text leading-relaxed whitespace-pre-wrap break-words"
                  >{{ displayedNote() }}</div>
                </div>
              </div>

              <!-- Email Section -->
              <div
                class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  class="bg-slate-100/80 px-4 py-3 border-b border-slate-200 flex justify-between items-center backdrop-blur-sm"
                >
                  <h3
                    class="font-bold text-slate-700 text-sm flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Courriel au Postulant
                  </h3>
                </div>
                <!-- Using innerHTML to render bold, yellow highlights and underlines -->
                <div
                  class="p-8 bg-white text-sm text-slate-800 leading-relaxed font-sans border-none focus:outline-none"
                  [innerHTML]="generatedEmailHtml()"
                ></div>
              </div>
            </div>
          </section>
        }

        <!-- BOTTOM ROW: Panel 3 GD (Courriel & Note - Volet GD) -->
        @if (
          selectedRole() === 'gestionnaire' && (
            isMedicalEvaluationActive() ||
            hasAnyGdSelection()
          )
        ) {
          <section
            class="flex-none min-h-[300px] mb-8 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-white/50 transition-all duration-500 ease-in-out"
          >
            <div
              class="p-4 bg-slate-50 border-b border-slate-200 flex-none z-10 flex justify-between items-center"
            >
              <h2
                class="font-bold text-slate-700 uppercase text-sm tracking-wider flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Courriel & Note (Gestionnaire de dossier)
              </h2>

              <div class="flex items-center gap-3">
                <button
                  (click)="copyNote()"
                  class="text-xs bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md shadow-sm border border-slate-300 font-semibold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  @if (copiedNote()) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-green-700">Note Copiée!</span>
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copier Note</span>
                  }
                </button>

                <button
                  (click)="exportToOutlook()"
                  class="text-xs text-white px-4 py-1.5 rounded-md shadow-md font-medium transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                  [class.bg-slate-800]="!copiedEmail()"
                  [class.hover:bg-slate-700]="!copiedEmail()"
                  [class.bg-green-600]="copiedEmail()"
                >
                  @if (copiedEmail()) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Copié ! Ouverture d'Outlook...
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Exporter vers Outlook
                  }
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              @if (!hasAnyGdSelection()) {
                <div class="p-6 bg-indigo-50/50 border border-indigo-100 rounded-xl text-sm text-indigo-900 flex items-center gap-3 shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Cochez une ou plusieurs options dans le panneau « Construction de courriels » (Partie 1, Partie 2, Partie 1 et 2, Offre d'emploi, etc.) pour générer le courriel au postulant ainsi que la note au registre.</span>
                </div>
              } @else {
                <!-- 1. Note Section (Single unified note) -->
                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div class="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center backdrop-blur-sm">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 class="font-bold text-slate-700 text-xs uppercase tracking-wider">Note au Registre (Dossier du candidat / Interne)</h3>
                    </div>
                  </div>
                  <div class="p-4 bg-slate-50">
                    <div
                      class="w-full bg-transparent text-xs font-mono text-slate-600 select-text leading-relaxed whitespace-pre-wrap break-words"
                    >{{ displayedNote() }}</div>
                  </div>
                </div>

                <!-- 2. Email Section (Single unified email) -->
                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div class="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center backdrop-blur-sm">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h3 class="font-bold text-slate-700 text-xs uppercase tracking-wider">Courriel au Postulant (Bilingue)</h3>
                    </div>
                    @if (isAnnexeQActive()) {
                      <div class="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                        Objet : {{ getEmailSubject() }}
                      </div>
                    }
                  </div>
                  <div
                    class="p-6 bg-white text-xs text-slate-800 leading-relaxed font-sans border-none focus:outline-none"
                    [innerHTML]="generatedEmailHtml()"
                  ></div>
                </div>
              }
            </div>
          </section>
        }
      </div>
    }
  }

    <!-- Job Search Modal (always rendered, hidden when not shown) -->
    <app-job-search-modal
      [class.hidden]="!showJobSearch()"
      [showReorientationTab]="selectedRole() === 'recruiter'"
      (closeModal)="showJobSearch.set(false)"
    ></app-job-search-modal>
    }
  `,
  host: { '(document:click)': 'onDocumentClick($event)' },
  styles: [],
})
export class AppComponent implements OnInit {
  private dataService = inject(RecruitmentDataService);
  private emailScenariosService = inject(EmailScenariosService);
  private sanitizer = inject(DomSanitizer);
  public sharedState = inject(SharedStateService);
  public jobService = inject(JobDatabaseService);

  // Dossier Jobs Panel Dropdown States
  dossierDropdownOpen1 = signal<boolean>(false);
  dossierDropdownOpen2 = signal<boolean>(false);
  dossierDropdownOpen3 = signal<boolean>(false);

  // Premier Contact State
  premierContactCourriel = signal<boolean>(false);
  premierContactMedical = signal<boolean>(false);
  premierContactEntrevue = signal<boolean>(false);
  premierContactGambit = signal<boolean>(false);
  premierContactPsps = signal<boolean>(false);
  premierContactSelfie = signal<boolean>(false);

  // Avis de Fermeture State
  avisFermetureCourriel = signal<boolean>(false);
  avisFermetureDelaiJours = signal<string>('14');
  avisFermetureDate = signal<string>('');
  avisFermetureEntrevue = signal<boolean>(false);
  avisFermetureMedicale = signal<boolean>(false);
  avisFermetureGambit = signal<boolean>(false);
  avisFermeturePsps = signal<boolean>(false);

  // Annexe Q State
  annexeQCourriel = signal<boolean>(false);
  annexeQAlphaPostulant = signal<string>('');

  // Évaluation Médicale State
  evaluationMedicaleType = signal<'Dossier régulier' | 'Dossier OTA'>('Dossier régulier');
  evaluationMedicalePartie1 = signal<boolean>(false);
  evaluationMedicalePartie2 = signal<boolean>(false);
  evaluationMedicalePartie1Et2 = signal<boolean>(false);
  copiedMedicalKey = signal<string | null>(null);

  copyToClipboard(text: string, key: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    this.copiedMedicalKey.set(key);
    setTimeout(() => {
      if (this.copiedMedicalKey() === key) {
        this.copiedMedicalKey.set(null);
      }
    }, 2000);
  }

  // --- Premier Contact Methods ---
  getPremierContactSelectedTasks(): { id: string; labelFr: string; labelEn: string }[] {
    const list: { id: string; labelFr: string; labelEn: string }[] = [];
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';

    // In local dossiers, medical is a numbered list item. In OTA dossiers, medical appointment text replaces or follows the list.
    if (this.premierContactMedical() && !isOta) {
      list.push({
        id: 'medical',
        labelFr: 'Planifiez votre évaluation médicale',
        labelEn: 'Schedule your medical evaluation',
      });
    }
    if (this.premierContactEntrevue()) {
      list.push({
        id: 'entrevue',
        labelFr: 'Planifiez votre entrevue',
        labelEn: 'Schedule your interview',
      });
    }
    if (this.premierContactGambit()) {
      list.push({
        id: 'gambit',
        labelFr: "Références, antécédents d'emploi et d'études (Gambit)",
        labelEn: 'References, employment and education history (Gambit)',
      });
    }
    if (this.premierContactPsps()) {
      list.push({
        id: 'psps',
        labelFr: "Vérification du casier judiciaire et du dossier de crédit (PSPS/cette tâche n'est pas dans votre portail, vous recevrez un courriel envoyé par app@gambitid.com)",
        labelEn: 'Criminal record and credit check (PSPS/this task is not in your portal, you will receive an email sent by app@gambitid.com)',
      });
    }
    if (this.premierContactSelfie()) {
      list.push({
        id: 'selfie',
        labelFr: "Pièce d'identité avec photo émise par le gouvernement canadien (les deux côtés)",
        labelEn: 'Canadian government issued photo ID (both sides)',
      });
    }
    return list;
  }

  getPremierContactSectionPlainFr(): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const selected = this.getPremierContactSelectedTasks();

    const p1 = `Bonjour,
Votre dossier de candidature pour les Forces armées canadiennes m’a été attribué. Sachez que votre dossier est actuellement en traitement et que nous continuons de le faire progresser.
Nous vous demandons de porter une attention particulière à vos courriels et à votre portail car des tâches vont vous être attribuées. Chaque nouvelle tâche attribuée doit être complétée dans un délai de 14 jours à partir de la date d’attribution sinon votre dossier sera fermé.`;

    let p2 = '';
    if (selected.length > 0) {
      const listStr = selected.map((t, idx) => `${idx + 1}-\t${t.labelFr}`).join('\n');
      p2 = `\n\nTâche(s) à compléter présentement :\n${listStr}`;
    }

    let p3 = '';
    if (isOta && this.premierContactMedical()) {
      p3 = `\n\nVotre rendez-vous pour votre évaluation médicale a été fixé au centre de recrutement de Montréal.
Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.
IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.`;
    }

    const p4 = `\n\nPourriez-vous me dire si vous avez du service militaire antérieur? (Cadet, Force de réserve/régulière, Armée étrangère)

Je reste à votre disposition afin de répondre à toutes questions que vous pourriez avoir concernant votre dossier.
Enfin, veuillez m’informer de tous changements à apporter à votre dossier, par exemple : changement d’adresse, études, nouvelles qualifications, nouvelle pièce d’identité, changement quant à votre dossier médical ou judiciaire, etc.

Au besoin, voici le lien de connexion à votre portail : https://www.cafoap-pclfac.forces.gc.ca/

Je vous remercie de votre intérêt pour les forces armées canadiennes.
Merci de votre collaboration.`;

    return `${p1}${p2}${p3}${p4}`;
  }

  getPremierContactSectionPlainEn(): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const selected = this.getPremierContactSelectedTasks();

    const p1 = `Hello,
Your application file for the Canadian Armed Forces has been assigned to me. Please know that your file is currently being processed and we continue to move it forward.
We ask you to pay close attention to your emails and your portal as tasks will be assigned to you. Each new assigned task must be completed within 14 days of the assignment date, otherwise your file will be closed.`;

    let p2 = '';
    if (selected.length > 0) {
      const listStr = selected.map((t, idx) => `${idx + 1}-\t${t.labelEn}`).join('\n');
      p2 = `\n\nTask(s) to be completed at this time:\n${listStr}`;
    }

    let p3 = '';
    if (isOta && this.premierContactMedical()) {
      p3 = `\n\nYour appointment for your Medical Evaluation has been scheduled at the Montreal recruitment centre.
Please log in to your applicant portal to find all the details regarding your appointment.
IMPORTANT: Please notify us as soon as possible if this date does not work for you.`;
    }

    const p4 = `\n\nCould you tell me if you have any prior military service? (Cadets, Reserve/Regular Force, Foreign Military)

I remain at your disposal to answer any questions you may have regarding your file.
Finally, please inform me of any changes to be made to your file, for example: change of address, studies, new qualifications, new identification document, change regarding your medical or criminal record, etc.

If necessary, here is the link to log into your portal: https://www.cafoap-pclfac.forces.gc.ca/

Thank you for your interest in the Canadian Armed Forces.
Thank you for your cooperation.`;

    return `${p1}${p2}${p3}${p4}`;
  }

  getPremierContactEmailPlain(): string {
    const fr = this.getPremierContactSectionPlainFr();
    const en = this.getPremierContactSectionPlainEn();
    const sigFr = this.sharedState.customSignatureFr();
    const sigEn = this.sharedState.customSignatureEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getPremierContactSectionHtmlFr(): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const selected = this.getPremierContactSelectedTasks();

    const p1Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour,<br>Votre dossier de candidature pour les Forces armées canadiennes m’a été attribué. Sachez que votre dossier est actuellement en traitement et que nous continuons de le faire progresser.<br>Nous vous demandons de porter une attention particulière à vos courriels et à votre portail car des tâches vont vous être attribuées. Chaque nouvelle tâche attribuée doit être complétée dans un <span style="background-color: yellow; mso-highlight: yellow;">délai de 14 jours</span> à partir de la date d’attribution sinon votre dossier sera fermé.</p>`;

    let p2Html = '';
    if (selected.length > 0) {
      const itemsHtml = selected
        .map(
          (t, idx) =>
            `${idx + 1}-&nbsp;&nbsp;&nbsp;&nbsp;${t.labelFr}`
        )
        .join('<br>');
      p2Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Tâche(s) à compléter présentement :<br>${itemsHtml}</p>`;
    }

    let p3Html = '';
    if (isOta && this.premierContactMedical()) {
      p3Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Votre rendez-vous pour votre évaluation médicale a été fixé au centre de recrutement de Montréal.<br>Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.<br><strong style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px;">IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.</strong></p>`;
    }

    const p4Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Pourriez-vous me dire si vous avez du service militaire antérieur? (Cadet, Force de réserve/régulière, Armée étrangère)</p><p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Je reste à votre disposition afin de répondre à toutes questions que vous pourriez avoir concernant votre dossier.<br>Enfin, <span style="background-color: yellow; mso-highlight: yellow;">veuillez m’informer de tous changements à apporter à votre dossier</span>, par exemple : changement d’adresse, études, nouvelles qualifications, nouvelle pièce d’identité, changement quant à votre dossier médical ou judiciaire, etc.<br><br>Au besoin, voici le lien de connexion à votre portail : <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #0563c1; text-decoration: underline;">https://www.cafoap-pclfac.forces.gc.ca/</a><br><br>Je vous remercie de votre intérêt pour les forces armées canadiennes.<br>Merci de votre collaboration.</p>`;

    return `${p1Html}${p2Html}${p3Html}${p4Html}`;
  }

  getPremierContactSectionHtmlEn(): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const selected = this.getPremierContactSelectedTasks();

    const p1Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello,<br>Your application file for the Canadian Armed Forces has been assigned to me. Please know that your file is currently being processed and we continue to move it forward.<br>We ask you to pay close attention to your emails and your portal as tasks will be assigned to you. Each new assigned task must be completed <span style="background-color: yellow; mso-highlight: yellow;">within 14 days</span> of the assignment date, otherwise your file will be closed.</p>`;

    let p2Html = '';
    if (selected.length > 0) {
      const itemsHtml = selected
        .map(
          (t, idx) =>
            `${idx + 1}-&nbsp;&nbsp;&nbsp;&nbsp;${t.labelEn}`
        )
        .join('<br>');
      p2Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Task(s) to be completed at this time:<br>${itemsHtml}</p>`;
    }

    let p3Html = '';
    if (isOta && this.premierContactMedical()) {
      p3Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Your appointment for your Medical Evaluation has been scheduled at the Montreal recruitment centre.<br>Please log in to your applicant portal to find all the details regarding your appointment.<br><strong style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px;">IMPORTANT: Please notify us as soon as possible if this date does not work for you.</strong></p>`;
    }

    const p4Html = `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Could you tell me if you have any prior military service? (Cadets, Reserve/Regular Force, Foreign Military)</p><p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">I remain at your disposal to answer any questions you may have regarding your file.<br>Finally, <span style="background-color: yellow; mso-highlight: yellow;">please inform me of any changes to be made to your file</span>, for example: change of address, studies, new qualifications, new identification document, change regarding your medical or criminal record, etc.<br><br>If necessary, here is the link to log into your portal: <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #0563c1; text-decoration: underline;">https://www.cafoap-pclfac.forces.gc.ca/</a><br><br>Thank you for your interest in the Canadian Armed Forces.<br>Thank you for your cooperation.</p>`;

    return `${p1Html}${p2Html}${p3Html}${p4Html}`;
  }

  getPremierContactEmailHtml(): string {
    const sigFr = this.sharedState.getHtmlSignatureFr();
    const sigEn = this.sharedState.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000; line-height: normal;">`;
    html += `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>`;
    html += this.getPremierContactSectionHtmlFr();
    html += `<p style="margin-top: 12.0pt;">` + sigFr + `</p>`;
    html += `<p style="margin-top: 12.0pt; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">______________________________________________________________________________</p>`;
    html += this.getPremierContactSectionHtmlEn();
    html += `<p style="margin-top: 12.0pt;">` + sigEn + `</p>`;
    html += `</div>`;
    return html;
  }

  // --- Avis de Fermeture Methods ---
  getAvisFermetureSelectedTasksFr(): string[] {
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

  getAvisFermetureSelectedTasksEn(): string[] {
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

  getEmailSubject(): string {
    if (this.isAnnexeQActive()) {
      const alpha = this.annexeQAlphaPostulant().trim();
      return `Annexe Q - ${alpha}`;
    }
    return "Forces armées canadiennes/Canadian Armed Forces";
  }

  getAnnexeQSectionPlainFr(): string {
    const alpha = this.annexeQAlphaPostulant().trim() || 'xx';
    return `Bonjour Monsieur/Madame,\n\nLes documents PSPS sont au dossier pour le postulant suivant : ${alpha}\n\nMerci, bonne journée à vous !`;
  }

  getAnnexeQSectionPlainEn(): string {
    const alpha = this.annexeQAlphaPostulant().trim() || 'xx';
    return `Hello Sir/Madam,\n\nThe PSPS documents are on file for the following applicant: ${alpha}\n\nThank you, have a great day!`;
  }

  getAnnexeQEmailPlain(): string {
    const fr = this.getAnnexeQSectionPlainFr();
    const en = this.getAnnexeQSectionPlainEn();
    const sigFr = this.sharedState.customSignatureFr();
    const sigEn = this.sharedState.customSignatureEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getAnnexeQSectionHtmlFr(): string {
    const alpha = this.annexeQAlphaPostulant().trim() || 'xx';
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Bonjour Monsieur/Madame,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Les documents PSPS sont au dossier pour le postulant suivant : ${alpha}</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Merci, bonne journée à vous !</p>`;
  }

  getAnnexeQSectionHtmlEn(): string {
    const alpha = this.annexeQAlphaPostulant().trim() || 'xx';
    return `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Hello Sir/Madam,</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">The PSPS documents are on file for the following applicant: ${alpha}</p>` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">Thank you, have a great day!</p>`;
  }

  getAnnexeQEmailHtml(): string {
    const fr = this.getAnnexeQSectionHtmlFr();
    const en = this.getAnnexeQSectionHtmlEn();
    const sigFr = this.sharedState.getHtmlSignatureFr();
    const sigEn = this.sharedState.getHtmlSignatureEn();
    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>` +
      fr +
      `<p style="margin-top: 12.0pt;">` + sigFr + `</p>` +
      `<p style="margin-top: 12.0pt; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">______________________________________________________________________________</p>` +
      en +
      `<p style="margin-top: 12.0pt;">` + sigEn + `</p>` +
      `</div>`;
  }

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

  getAvisFermetureSectionPlainFr(): string {
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

  getAvisFermetureSectionPlainEn(): string {
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

  getAvisFermetureEmailPlain(): string {
    const fr = this.getAvisFermetureSectionPlainFr();
    const en = this.getAvisFermetureSectionPlainEn();
    const sigFr = this.sharedState.customSignatureFr();
    const sigEn = this.sharedState.customSignatureEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getAvisFermetureSectionHtmlFr(): string {
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

  getAvisFermetureSectionHtmlEn(): string {
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

  getAvisFermetureEmailHtml(): string {
    const fr = this.getAvisFermetureSectionHtmlFr();
    const en = this.getAvisFermetureSectionHtmlEn();
    const sigFr = this.sharedState.getHtmlSignatureFr();
    const sigEn = this.sharedState.getHtmlSignatureEn();

    return `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">` +
      `<p style="margin-top: 0cm; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;"><strong>English message will follow.</strong></p>` +
      `${fr}` +
      `<p>${sigFr}</p>` +
      `<p style="margin-top: 12.0pt; margin-bottom: 12.0pt; line-height: normal; font-family: Calibri, sans-serif; font-size: 11.0pt; color: #000000;">______________________________________________________________________________</p>` +
      `${en}` +
      `<p>${sigEn}</p>` +
      `</div>`;
  }

  getMedicalPartEn(part: string): string {
    if (part === 'Partie 1') return 'Part 1';
    if (part === 'Partie 2') return 'Part 2';
    if (part === 'Partie 1 et 2') return 'Part 1 and 2';
    return part;
  }

  getMedicalEmailSubject(part: string): string {
    return "Forces armées canadiennes/Canadian Armed Forces";
  }

  getMedicalEmailBody(part: string): string {
    const partEn = this.getMedicalPartEn(part);
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';

    if (isOta) {
      let fr = `Bonjour,

Votre rendez-vous pour votre évaluation médicale - ${part} a été fixé au centre de recrutement de Montréal.

Veuillez vous connecter à votre portail du postulant afin d'y retrouver tous les détails concernant votre rendez-vous.

Lien de connexion à votre portail : https://www.cafoap-pclfac.forces.gc.ca/

IMPORTANT : Veuillez nous avertir le plus rapidement possible si la date ne vous convient pas.

Merci de votre collaboration.`;

      let en = `Hello,

Your appointment for your Medical Evaluation - ${partEn} has been scheduled at the Montreal recruitment centre.

Please log in to your applicant portal to find all the details regarding your appointment.

Applicant portal login link: https://www.cafoap-pclfac.forces.gc.ca/

IMPORTANT: Please notify us as soon as possible if this date does not work for you.

Thank you for your cooperation.`;

      return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
    }

    let fr = `Bonjour,

Une nouvelle tâche intitulée « Évaluation médicale - ${part} » vous a été attribuée dans votre portail du postulant.

Afin de réaliser votre évaluation médicale, vous devrez vous présenter à votre centre de recrutement attitré (dont les coordonnées sont indiquées directement dans votre portail).

Dans votre portail, vous pourrez sélectionner vous-même le moment qui vous convient le mieux parmi les plages horaires disponibles.

Lien de connexion à votre portail : https://www.cafoap-pclfac.forces.gc.ca/

Merci de votre collaboration.`;

    let en = `Hello,

A new task titled "Medical Evaluation - ${partEn}" has been assigned to you in your applicant portal.

To complete this medical evaluation, you will need to report to your assigned recruitment centre (indicated in your portal).

In your portal, you will be able to select the time slot that best suits you from the available times.

Applicant portal login link: https://www.cafoap-pclfac.forces.gc.ca/

Thank you for your cooperation.`;

    return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

  getMedicalPartsInfo(): { labelFr: string; labelEn: string } | null {
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

  getMedicalSectionHtmlFr(part: string): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
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

  getMedicalSectionHtmlEn(partEn: string): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
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

  getMedicalSectionPlainFr(part: string): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
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

  getMedicalSectionPlainEn(partEn: string): string {
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
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

  getMedicalRegisterNoteCombined(): string {
    const medInfo = this.getMedicalPartsInfo();
    if (!medInfo) return '';
    if (this.evaluationMedicaleType() === 'Dossier OTA') {
      return `Rendez-vous pour l'évaluation médicale - ${medInfo.labelFr} directement fixé au centre de recrutement de Montréal (Dossier OTA). Courriel d'information envoyé au postulant pour consultation des détails dans son portail.`;
    }
    return `Tâche « Évaluation médicale - ${medInfo.labelFr} » attribuée au postulant dans son portail. Courriel explicatif envoyé pour la sélection d'une plage horaire au centre de recrutement attitré.`;
  }

  getMedicalEmailPlain(part: string): string {
    const partEn = this.getMedicalPartEn(part);
    const fr = this.getMedicalSectionPlainFr(part);
    const en = this.getMedicalSectionPlainEn(partEn);
    const sigFr = this.sharedState.customSignatureFr();
    const sigEn = this.sharedState.customSignatureEn();
    return `English message will follow.\n\nBonjour,\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\nHello,\n\n${en}\n\n${sigEn}`;
  }

  getMedicalEmailHtml(part: string): string {
    const partEn = this.getMedicalPartEn(part);
    const sigFr = this.sharedState.getHtmlSignatureFr();
    const sigEn = this.sharedState.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    html += `<p><strong>English message will follow.</strong></p>`;
    html += `<p>Bonjour,</p>`;
    html += this.getMedicalSectionHtmlFr(part);
    html += `<p>` + sigFr + `</p>`;
    html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
    html += `<p>Hello,</p>`;
    html += this.getMedicalSectionHtmlEn(partEn);
    html += `<p>` + sigEn + `</p>`;
    html += `</div>`;
    return html;
  }

  getSafeMedicalEmailHtml(part: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.getMedicalEmailHtml(part));
  }

  getMedicalRegisterNote(part: string): string {
    if (this.evaluationMedicaleType() === 'Dossier OTA') {
      return `Rendez-vous pour l'évaluation médicale - ${part} directement fixé au centre de recrutement de Montréal (Dossier OTA). Courriel d'information envoyé au postulant pour consultation des détails dans son portail.`;
    }
    return `Tâche « Évaluation médicale - ${part} » attribuée au postulant dans son portail. Courriel explicatif envoyé pour la sélection d'une plage horaire au centre de recrutement attitré.`;
  }

  // Auth & Role State
  isAuthenticated = signal<boolean>(false);
  passwordInput = signal<string>('');
  authError = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  selectedRole = signal<'none' | 'recruiter' | 'gestionnaire'>('none');
  private roleSnapshots: Partial<Record<'recruiter' | 'gestionnaire', RoleSnapshot>> = {};

  private createSnapshot(): RoleSnapshot {
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
      testEsomPassed: this.sharedState.testEsomPassed(),
      testCeopmPassed: this.sharedState.testCeopmPassed(),
      testCspnPassed: this.sharedState.testCspnPassed(),
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
      avisFermetureCourriel: this.avisFermetureCourriel(),
      avisFermetureDelaiJours: this.avisFermetureDelaiJours(),
      avisFermetureDate: this.avisFermetureDate(),
      avisFermetureEntrevue: this.avisFermetureEntrevue(),
      avisFermetureMedicale: this.avisFermetureMedicale(),
      avisFermetureGambit: this.avisFermetureGambit(),
      avisFermeturePsps: this.avisFermeturePsps(),
      annexeQCourriel: this.annexeQCourriel(),
      annexeQAlphaPostulant: this.annexeQAlphaPostulant(),
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
    };
  }

  private applySnapshot(snapshot: RoleSnapshot) {
    this.stage.set(snapshot.stage);
    this.isUnderAge.set(snapshot.isUnderAge);
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
    this.premierContactCourriel.set(snapshot.premierContactCourriel || false);
    this.premierContactMedical.set(snapshot.premierContactMedical || false);
    this.premierContactEntrevue.set(snapshot.premierContactEntrevue || false);
    this.premierContactGambit.set(snapshot.premierContactGambit || false);
    this.premierContactPsps.set(snapshot.premierContactPsps || false);
    this.premierContactSelfie.set(snapshot.premierContactSelfie || false);

    this.avisFermetureCourriel.set(snapshot.avisFermetureCourriel || false);
    this.avisFermetureDelaiJours.set(snapshot.avisFermetureDelaiJours || '14');
    this.avisFermetureDate.set(snapshot.avisFermetureDate || '');
    this.avisFermetureEntrevue.set(snapshot.avisFermetureEntrevue || false);
    this.avisFermetureMedicale.set(snapshot.avisFermetureMedicale || false);
    this.avisFermetureGambit.set(snapshot.avisFermetureGambit || false);
    this.avisFermeturePsps.set(snapshot.avisFermeturePsps || false);

    this.annexeQCourriel.set(snapshot.annexeQCourriel || false);
    this.annexeQAlphaPostulant.set(snapshot.annexeQAlphaPostulant || '');

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
    this.sharedState.testEsomPassed.set(snapshot.testEsomPassed || false);
    this.sharedState.testCeopmPassed.set(snapshot.testCeopmPassed || false);
    this.sharedState.testCspnPassed.set(snapshot.testCspnPassed || false);
    this.sharedState.testCspn00182Passed.set(snapshot.testCspn00182Passed || false);
    this.sharedState.testCspn00183Passed.set(snapshot.testCspn00183Passed || false);
    this.sharedState.testCspn00184Passed.set(snapshot.testCspn00184Passed || false);
    this.sharedState.includeLinkedEmail.set(snapshot.includeLinkedEmail);
    this.sharedState.reoMergedEmailHtml.set(snapshot.reoMergedEmailHtml);
    this.sharedState.reoMergedEmailPlain.set(snapshot.reoMergedEmailPlain);
    this.sharedState.reoMergedNote.set(snapshot.reoMergedNote);
  }

  private createFreshSnapshot(role: 'recruiter' | 'gestionnaire'): RoleSnapshot {
    return {
      stage: 'intro',
      isUnderAge: false,
      allTasks: this.dataService.getTasks(role),
      selectedTask: null,
      selectedRejectionKeys: new Set(),
      taskNotCompletedKeys: new Set(),
      compliantDocKeys: new Set(),
      collapsedGroups: new Set(),
      forceGeneralReminder: false,
      selectedEmailBankTemplate: '',
      triageMedicalRequis: false,
      evaluationMedicaleType: 'Dossier régulier',
      premierContactCourriel: false,
      premierContactMedical: false,
      premierContactEntrevue: false,
      premierContactGambit: false,
      premierContactPsps: false,
      premierContactSelfie: false,
      avisFermetureCourriel: false,
      avisFermetureDelaiJours: '14',
      avisFermetureDate: '',
      avisFermetureEntrevue: false,
      avisFermetureMedicale: false,
      avisFermetureGambit: false,
      avisFermeturePsps: false,
      annexeQCourriel: false,
      annexeQAlphaPostulant: '',
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
      testEsomPassed: false,
      testCeopmPassed: false,
      testCspnPassed: false,
      testCspn00182Passed: false,
      testCspn00183Passed: false,
      testCspn00184Passed: false,
      includeLinkedEmail: false,
      reoMergedEmailHtml: '',
      reoMergedEmailPlain: '',
      reoMergedNote: '',
    };
  }

  ngOnInit() {
    const isAuth = localStorage.getItem('marcel_auth');
    if (isAuth === 'true') {
      this.isAuthenticated.set(true);
    }
  }

  selectRole(role: 'recruiter' | 'gestionnaire') {
    const current = this.selectedRole();
    if (current === 'recruiter' || current === 'gestionnaire') {
      this.roleSnapshots[current] = this.createSnapshot();
    }

    this.selectedRole.set(role);
    localStorage.setItem('marcel_role', role);

    const existing = this.roleSnapshots[role];
    if (existing) {
      this.applySnapshot(existing);
    } else {
      this.applySnapshot(this.createFreshSnapshot(role));
    }

    if (role === 'gestionnaire') {
      this.stage.set('intro');
    }
  }

  switchRole() {
    const current = this.selectedRole();
    if (current === 'recruiter' || current === 'gestionnaire') {
      this.roleSnapshots[current] = this.createSnapshot();
    }
    this.selectedRole.set('none');
    localStorage.removeItem('marcel_role');
  }

  lockSession() {
    this.isAuthenticated.set(false);
    this.selectedRole.set('none');
    localStorage.removeItem('marcel_auth');
    localStorage.removeItem('marcel_role');
  }

  async checkPassword(event: Event) {
    event.preventDefault();
    const input = this.passwordInput();
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex === '4b65e209bce165f2be7ddc7a5347453f200afaca8c590dc411c3dc886bf02635') {
      this.isAuthenticated.set(true);
      this.authError.set(false);
      localStorage.setItem('marcel_auth', 'true');
    } else {
      this.authError.set(true);
    }
  }

  // App Stage Management
  stage = signal<AppStage>("intro");
  isUnderAge = signal<boolean>(false);

  // Signature Settings State
  showSignaturePage = signal<boolean>(false);
  showToast = signal<boolean>(false);
  signatureSection = signal<'normal' | 'ota'>('normal');
  sigFrTemp = "";
  sigEnTemp = "";
  sigOtaFrTemp = "";
  sigOtaEnTemp = "";

  get isOtaDossier(): boolean {
    return this.selectedRole() === 'gestionnaire' && this.evaluationMedicaleType() === 'Dossier OTA';
  }

  getSignatureFr(): string {
    return this.sharedState.getSignatureFr(this.isOtaDossier);
  }

  getSignatureEn(): string {
    return this.sharedState.getSignatureEn(this.isOtaDossier);
  }

  getHtmlSignatureFr(): string {
    return this.sharedState.getHtmlSignatureFr(this.isOtaDossier);
  }

  getHtmlSignatureEn(): string {
    return this.sharedState.getHtmlSignatureEn(this.isOtaDossier);
  }

  toggleSignatureSettings() {
    this.sigFrTemp = this.sharedState.customSignatureFr();
    this.sigEnTemp = this.sharedState.customSignatureEn();
    this.sigOtaFrTemp = this.sharedState.customSignatureOtaFr();
    this.sigOtaEnTemp = this.sharedState.customSignatureOtaEn();
    this.showSignaturePage.set(true);
  }

  closeSignaturePage() {
    this.showSignaturePage.set(false);
  }

  saveSignatures() {
    this.sharedState.saveSignatures(
      this.sigFrTemp,
      this.sigEnTemp,
      this.sigOtaFrTemp,
      this.sigOtaEnTemp
    );
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }

  resetSignatures() {
    if (this.signatureSection() === 'normal') {
      this.sigFrTemp = DEFAULT_SIG_FR;
      this.sigEnTemp = DEFAULT_SIG_EN;
    } else {
      this.sigOtaFrTemp = DEFAULT_SIG_OTA_FR;
      this.sigOtaEnTemp = DEFAULT_SIG_OTA_EN;
    }
  }

  // Job Search Modal State
  showJobSearch = signal(false);

  toggleJobSearch() {
    this.showJobSearch.update((v) => !v);
  }

  // Task Groups Definition & Expansion State
  collapsedGroups = signal<Set<string>>(new Set());

  toggleGroupCollapse(groupId: string) {
    this.collapsedGroups.update((set) => {
      const next = new Set(set);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }

  isGroupCollapsed(groupId: string): boolean {
    return this.collapsedGroups().has(groupId);
  }

  isGroupCompliant(group: { tasks: Task[] }): boolean {
    return group.tasks.length > 0 && group.tasks.every((t) => this.isTaskCompliant(t));
  }

  hasGroupRejections(group: { tasks: Task[] }): boolean {
    return group.tasks.some((t) => this.hasTaskRejections(t));
  }

  getGroupForTask(task: Task): { id: string; title: string } | null {
    if (this.selectedRole() === "gestionnaire") {
      if (task.section) {
        return { id: task.section, title: task.section };
      }
      if (task.nameFr.includes("Courriel d'offre")) {
        return { id: "Courriel d'offre", title: "Courriel d'offre" };
      }
      if (task.nameFr.includes("Documents Supplémentaires")) {
        return { id: "Autre", title: "Autre" };
      }
      return { id: "Autre", title: "Autre" };
    }

    if (
      task.nameFr.includes("Documents Supplémentaires") ||
      task.nameFr.includes("Courriel d'offre")
    ) {
      return null;
    }
    if (task.section) {
      return { id: task.section, title: task.section };
    }
    const name = task.nameFr;
    if (
      name.includes("Relevé") ||
      name.includes("Relevés") ||
      name.includes("Pièce d'identité") ||
      name.includes("Certificat de naissance") ||
      name.includes("Consentement du parent")
    ) {
      return { id: "0.1", title: "0.1" };
    }
    if (name.includes("MDN 2977")) {
      return { id: "0.5", title: "0.5" };
    }
    return { id: "1.0", title: "1.0" };
  }

  groupedVisibleTasks = computed(() => {
    const tasks = this.visibleTasks();
    const isGd = this.selectedRole() === "gestionnaire";

    if (isGd) {
      const gdGroupOrder = [
        "Réception d'un postulant",
        "Suivi de dossier",
        "Retour PSPS",
        "Courriel d'offre",
        "Courriel enrôlement",
        "Autre",
      ];
      const groupsMap = new Map<string, { id: string; title: string; tasks: Task[] }>();
      for (const gName of gdGroupOrder) {
        groupsMap.set(gName, { id: gName, title: gName, tasks: [] });
      }

      for (const task of tasks) {
        const g = this.getGroupForTask(task);
        const gId = g ? g.id : "Autre";
        if (!groupsMap.has(gId)) {
          groupsMap.set(gId, { id: gId, title: gId, tasks: [] });
        }
        groupsMap.get(gId)!.tasks.push(task);
      }

      const groups = gdGroupOrder
        .map((name) => groupsMap.get(name)!)
        .filter((g) => !!g);

      return {
        groups,
        additionalTasks: [],
      };
    }

    const groupsMap = new Map<string, { id: string; title: string; tasks: Task[] }>();
    const additionalTasks: Task[] = [];

    for (const task of tasks) {
      const g = this.getGroupForTask(task);
      if (!g) {
        additionalTasks.push(task);
      } else {
        if (!groupsMap.has(g.id)) {
          groupsMap.set(g.id, { id: g.id, title: g.title, tasks: [] });
        }
        groupsMap.get(g.id)!.tasks.push(task);
      }
    }

    return {
      groups: Array.from(groupsMap.values()),
      additionalTasks,
    };
  });

  // Signals
  private allTasks = signal<Task[]>(
    this.dataService.getTasks(
      this.selectedRole() === "gestionnaire" ? "gestionnaire" : "recruiter"
    )
  );

  selectedTask = signal<Task | null>(null);

  // Set of selected rejection IDs
  selectedRejectionKeys = signal<Set<string>>(new Set());

  // Set of tasks marked as not completed
  taskNotCompletedKeys = signal<Set<string>>(new Set());

  // Set of explicitly Compliant Documents (key: taskName::docName)
  compliantDocKeys = signal<Set<string>>(new Set());

  // UI States for copy feedback
  copiedEmail = signal(false);
  copiedNote = signal(false);

  @ViewChild(JobSearchModalComponent) jobSearchModal!: JobSearchModalComponent;

  constructor() {
    // No task selected initially, waiting for stage selection
    effect(() => {
      this.sharedState.taskNote.set(this.generatedNote());
      this.sharedState.taskEmailHtmlFr.set(this.getRawHtmlString());
      this.sharedState.taskEmailFr.set(this.generatedEmailPlain());
      this.sharedState.hasReassignedTasks.set(!this.allTasksCompliant());
    });
  }

  toggleIncludeReo() {
    this.sharedState.includeLinkedEmail.update((v) => !v);
  }

  // --- DOSSIER JOBS METHODS ---

  getDossierJob(index: number): JobEntry | undefined {
    const id =
      index === 1
        ? this.sharedState.selectedDossierJobId1()
        : index === 2
        ? this.sharedState.selectedDossierJobId2()
        : this.sharedState.selectedDossierJobId3();
    if (!id) return undefined;
    return this.jobService.getAllJobs().find((j) => j.id === id);
  }

  isJobClosed(jobId: string): boolean {
    return this.jobService.isJobClosed(jobId);
  }

  getFilteredJobsForIndex(index: number): JobEntry[] {
    const query =
      index === 1
        ? this.sharedState.searchDossierQuery1()
        : index === 2
        ? this.sharedState.searchDossierQuery2()
        : this.sharedState.searchDossierQuery3();
    if (!query || query.trim() === "") {
      let allJobs = this.jobService.getAllJobs();
      if (this.sharedState.isPostulantPfor()) {
        allJobs = allJobs.filter(j => this.jobService.isPforJob(j));
      }
      return allJobs;
    }
    let searchedJobs = this.jobService.searchJobs(query);
    if (this.sharedState.isPostulantPfor()) {
      searchedJobs = searchedJobs.filter(j => this.jobService.isPforJob(j));
    }
    return searchedJobs;
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  isDossierFieldDisabled(index: number): boolean {
    const id1 = this.sharedState.selectedDossierJobId1();
    const id2 = this.sharedState.selectedDossierJobId2();
    const id3 = this.sharedState.selectedDossierJobId3();
    if (index === 1) return id2 === "00003" || id3 === "00003";
    if (index === 2) return id1 === "00003" || id3 === "00003";
    if (index === 3) return id1 === "00003" || id2 === "00003";
    return false;
  }

  selectDossierJob(index: number, jobId: string) {
    const qb = this.jobService.getAllJobs().find((j) => j.id === jobId);
    if (!qb) return;

    if (jobId === "00003") {
      if (index === 1) {
        this.sharedState.selectedDossierJobId2.set("");
        this.sharedState.searchDossierQuery2.set("");
        this.sharedState.selectedDossierJobId3.set("");
        this.sharedState.searchDossierQuery3.set("");
      } else if (index === 2) {
        this.sharedState.selectedDossierJobId1.set("");
        this.sharedState.searchDossierQuery1.set("");
        this.sharedState.selectedDossierJobId3.set("");
        this.sharedState.searchDossierQuery3.set("");
      } else if (index === 3) {
        this.sharedState.selectedDossierJobId1.set("");
        this.sharedState.searchDossierQuery1.set("");
        this.sharedState.selectedDossierJobId2.set("");
        this.sharedState.searchDossierQuery2.set("");
      }
    }

    if (index === 1) {
      this.sharedState.selectedDossierJobId1.set(jobId);
      this.sharedState.searchDossierQuery1.set(`${qb.id} - ${qb.title}`);
      this.dossierDropdownOpen1.set(false);
    } else if (index === 2) {
      this.sharedState.selectedDossierJobId2.set(jobId);
      this.sharedState.searchDossierQuery2.set(`${qb.id} - ${qb.title}`);
      this.dossierDropdownOpen2.set(false);
    } else if (index === 3) {
      this.sharedState.selectedDossierJobId3.set(jobId);
      this.sharedState.searchDossierQuery3.set(`${qb.id} - ${qb.title}`);
      this.dossierDropdownOpen3.set(false);
    }
  }

  clearDossierJob(index: number, event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (index === 1) {
      this.sharedState.selectedDossierJobId1.set("");
      this.sharedState.searchDossierQuery1.set("");
      this.sharedState.dossierJobFailedCe1.set(false);
      this.dossierDropdownOpen1.set(false);
    } else if (index === 2) {
      this.sharedState.selectedDossierJobId2.set("");
      this.sharedState.searchDossierQuery2.set("");
      this.sharedState.dossierJobFailedCe2.set(false);
      this.dossierDropdownOpen2.set(false);
    } else if (index === 3) {
      this.sharedState.selectedDossierJobId3.set("");
      this.sharedState.searchDossierQuery3.set("");
      this.sharedState.dossierJobFailedCe3.set(false);
      this.dossierDropdownOpen3.set(false);
    }
  }

  onDossierQueryChange(index: number, val: string) {
    if (index === 1) {
      this.sharedState.searchDossierQuery1.set(val);
      if (!val) {
        this.sharedState.selectedDossierJobId1.set("");
        this.sharedState.dossierJobFailedCe1.set(false);
      }
    } else if (index === 2) {
      this.sharedState.searchDossierQuery2.set(val);
      if (!val) {
        this.sharedState.selectedDossierJobId2.set("");
        this.sharedState.dossierJobFailedCe2.set(false);
      }
    } else if (index === 3) {
      this.sharedState.searchDossierQuery3.set(val);
      if (!val) {
        this.sharedState.selectedDossierJobId3.set("");
        this.sharedState.dossierJobFailedCe3.set(false);
      }
    }
  }

  openDossierDropdown(index: number) {
    if (this.isDossierFieldDisabled(index)) return;
    if (index === 1) {
      this.dossierDropdownOpen1.set(true);
      this.sharedState.searchDossierQuery1.set("");
    } else if (index === 2) {
      this.dossierDropdownOpen2.set(true);
      this.sharedState.searchDossierQuery2.set("");
    } else if (index === 3) {
      this.dossierDropdownOpen3.set(true);
      this.sharedState.searchDossierQuery3.set("");
    }
  }

  closeDossierDropdownDelayed(index: number) {
    setTimeout(() => {
      if (index === 1) {
        this.dossierDropdownOpen1.set(false);
        const id = this.sharedState.selectedDossierJobId1();
        if (id) {
          const qb = this.jobService.getAllJobs().find((j) => j.id === id);
          if (qb) this.sharedState.searchDossierQuery1.set(`${qb.id} - ${qb.title}`);
        } else {
          this.sharedState.searchDossierQuery1.set("");
        }
      } else if (index === 2) {
        this.dossierDropdownOpen2.set(false);
        const id = this.sharedState.selectedDossierJobId2();
        if (id) {
          const qb = this.jobService.getAllJobs().find((j) => j.id === id);
          if (qb) this.sharedState.searchDossierQuery2.set(`${qb.id} - ${qb.title}`);
        } else {
          this.sharedState.searchDossierQuery2.set("");
        }
      } else if (index === 3) {
        this.dossierDropdownOpen3.set(false);
        const id = this.sharedState.selectedDossierJobId3();
        if (id) {
          const qb = this.jobService.getAllJobs().find((j) => j.id === id);
          if (qb) this.sharedState.searchDossierQuery3.set(`${qb.id} - ${qb.title}`);
        } else {
          this.sharedState.searchDossierQuery3.set("");
        }
      }
    }, 200);
  }

  // --- STAGE LOGIC ---

  restartApp() {
    this.stage.set("intro");
    this.isUnderAge.set(false);
    this.selectedTask.set(null);
    this.selectedRejectionKeys.set(new Set());
    this.taskNotCompletedKeys.set(new Set());
    this.compliantDocKeys.set(new Set());
    this.collapsedGroups.set(new Set());
    this.selectedEmailBankTemplate.set('');
    this.triageMedicalRequis.set(false);
    this.allTasks.set(
      this.dataService.getTasks(
        this.selectedRole() === "gestionnaire" ? "gestionnaire" : "recruiter"
      )
    );

    // Reset GD specific panels & selections
    this.evaluationMedicaleType.set("Dossier régulier");
    this.premierContactCourriel.set(false);
    this.premierContactMedical.set(false);
    this.premierContactEntrevue.set(false);
    this.premierContactGambit.set(false);
    this.premierContactPsps.set(false);
    this.premierContactSelfie.set(false);

    this.avisFermetureCourriel.set(false);
    this.avisFermetureDelaiJours.set('14');
    this.avisFermetureDate.set('');
    this.avisFermetureEntrevue.set(false);
    this.avisFermetureMedicale.set(false);
    this.avisFermetureGambit.set(false);
    this.avisFermeturePsps.set(false);

    this.annexeQCourriel.set(false);
    this.annexeQAlphaPostulant.set('');

    this.evaluationMedicalePartie1.set(false);
    this.evaluationMedicalePartie2.set(false);
    this.evaluationMedicalePartie1Et2.set(false);
    this.copiedMedicalKey.set(null);

    // Reset Offer forms
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const savedVille = (typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_ville')) || 'Québec';
    const savedPostulant = (typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_postulant')) || '8h00';
    const savedInvites = (typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_invites')) || '10h00';
    const villeToSet = isOta ? 'Montréal' : savedVille;
    const centerObj = this.recruitmentCentersList.find(c => c.city === villeToSet) || this.recruitmentCentersList[0];
    const savedLieuEnrolement = isOta ? centerObj.fullFr : ((typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_enrolement')) || centerObj.fullFr);

    this.offreNormaleChecked.set(false);
    this.offreEtudesSubventionneesChecked.set(false);
    this.offreLieuVille.set(villeToSet);
    this.offreUniteAffectation.set('st-jean');
    this.offreMetier.set('');
    this.offreMetierSearchQuery.set('');
    this.offreMetierDropdownOpen.set(false);
    this.offreProgrammeEnrolement.set('');
    this.offreElement.set('');
    this.offreDureeContrat.set('');
    this.offreEtudesSubventionnees.set('');
    this.offreDureeEtudesSubventionnees.set('');
    this.offreDateEnrolement.set('');
    this.offreHeureArriveePostulant.set(savedPostulant);
    this.offreHeureArriveeInvites.set(savedInvites);
    this.offreLieuEnrolement.set(savedLieuEnrolement);
    this.offreDateArriveeUnite.set('');
    this.offreElementsManquants.set('Spécimen de chèque');
    this.offreDateElementsManquants.set('');
    this.offreSerieCours.set('');
    this.offreDateCoursDebut.set('');
    this.offreDateCoursFin.set('');
    this.offreSubPanelMode.set('courriel');
    this.noteStatutCivil.set('célibataire');
    this.noteConjoint.set('N/A');
    this.noteConjointTexte.set('');
    this.noteEnfantCount.set('0');
    this.noteEnfantDetails.set([]);
    this.notePlaqueImm.set('');
    this.noteBrisBail.set('N/A');
    this.noteEntreposage.set('N/A');
    this.noteSermentDeclaration.set('Serment');
    this.noteInviteMil.set('N/A');
    this.noteInviteMilTexte.set('');
    this.noteSvcMilAnt.set('N/A');
    this.noteBeneficiaire.set('');
    this.noteDateCourrielConfirmation.set(getTodayDateString());

    // Reset Dossier jobs & Réo shared state
    this.clearDossierJob(1);
    this.clearDossierJob(2);
    this.clearDossierJob(3);
    this.dossierDropdownOpen1.set(false);
    this.dossierDropdownOpen2.set(false);
    this.dossierDropdownOpen3.set(false);

    this.sharedState.includeLinkedEmail.set(false);
    this.sharedState.reoMergedEmailHtml.set('');
    this.sharedState.reoMergedEmailPlain.set('');
    this.sharedState.reoMergedNote.set('');
    this.sharedState.hasReassignedTasks.set(false);

    const current = this.selectedRole();
    if (current === 'recruiter' || current === 'gestionnaire') {
      this.roleSnapshots[current] = this.createFreshSnapshot(current);
    }
  }

  areAllDocsCompliant = computed(() => {
    const tasks = this.visibleTasks().filter((t) => !t.nameFr.includes("Documents Supplémentaires"));
    if (tasks.length === 0) return false;
    const currentCompliant = this.compliantDocKeys();
    for (const task of tasks) {
      for (const doc of task.documents) {
        if (!currentCompliant.has(this.getDocKey(task, doc))) {
          return false;
        }
      }
    }
    return true;
  });

  setAllCompliant() {
    if (this.areAllDocsCompliant()) {
      // Toggle OFF: désactiver la conformité de toutes les tâches standard visibles (sauf Documents Supplémentaires)
      const currentKeys = new Set(this.compliantDocKeys());
      this.visibleTasks().forEach((task) => {
        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.delete(this.getDocKey(task, doc));
          });
        }
      });
      this.compliantDocKeys.set(currentKeys);
    } else {
      // Toggle ON: marquer toutes les tâches standard visibles conformes (sans cocher Documents Supplémentaires pour forcer la vérification manuelle)
      const currentKeys = new Set(this.compliantDocKeys());
      this.visibleTasks().forEach((task) => {
        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.add(this.getDocKey(task, doc));
          });
        }
      });
      this.compliantDocKeys.set(currentKeys);
      this.taskNotCompletedKeys.set(new Set());
      this.selectedRejectionKeys.set(new Set());
      this.selectedEmailBankTemplate.set('');
    }
  }

  // Helper methods for Dossier Jobs and Additional Documents
  getDossierJobObjects(): JobEntry[] {
    const ids = [
      this.sharedState.selectedDossierJobId1(),
      this.sharedState.selectedDossierJobId2(),
      this.sharedState.selectedDossierJobId3(),
    ].filter((id) => !!id);

    const allJobs = this.jobService.getAllJobs();
    return ids
      .map((id) => allJobs.find((j) => j.id === id))
      .filter((j): j is JobEntry => !!j);
  }

  isSubsidizedEducationJob(job: JobEntry): boolean {
    if (!job) return false;
    const title = (job.title || "").toUpperCase();
    const titleEn = (job.titleEn || "").toUpperCase();
    const programs = (job.contracts || []).map((c) => (c.program || "").toUpperCase()).join(" ");
    const subKeywords = [
      "PFOR", "PFS-MR", "PFOEP", "PFUMR", "PIES-MR", "PMEP", "ESNEM",
      "PFDM", "PFMD", "UTPNCM", "ROTP", "NOCP", "MMTP", "SUBVENTION"
    ];
    if (subKeywords.some((kw) => title.includes(kw) || titleEn.includes(kw) || programs.includes(kw))) return true;
    return false;
  }

  isSubsidizedDoc(doc: DocumentItem): boolean {
    const name = doc.nameFr;
    return (
      name.includes("Lettre d'admission") ||
      name.includes("Plan de cours") ||
      name.includes("Formulaire d'études subventionnées")
    );
  }

  isTaskBasedAdditionalDoc(doc: DocumentItem): boolean {
    const name = doc.nameFr;
    return (
      name.includes("Relevé") ||
      name.includes("Relevés") ||
      name.includes("libération") ||
      name.includes("service antérieur")
    );
  }

  shouldShowAdditionalDoc(doc: DocumentItem): boolean {
    if (this.isSubsidizedDoc(doc)) return true;
    if (this.isTaskBasedAdditionalDoc(doc)) return true;

    const jobs = this.getDossierJobObjects();
    if (jobs.length === 0) return false;

    const docName = doc.nameFr;

    const cvJobIds = [
      "00152", "00155", "00335", "00372", "00378", "00406", "00190", "00194",
      "00195", "00198", "00204", "00374", "00153", "00191", "00349", "00390", "00398"
    ];
    const permitJobIds = [
      "00149", "00161", "00214", "00152", "00153", "00190", "00191", "00194",
      "00195", "00198", "00204", "00335", "00372", "00374", "00390", "00393", "00406"
    ];
    const goodStandingJobIds = [
      "00152", "00153", "00190", "00191", "00194", "00198", "00204", "00335",
      "00372", "00374", "00390", "00393"
    ];
    const specialtyJobIds = [
      "00152", "00191", "00372", "00390", "00393", "00164", "00349"
    ];
    const experienceJobIds = [
      "00137", "00155", "00189", "00203", "00208", "00211", "00166", "00398", "00390"
    ];

    const hasCvJob = jobs.some((j) => cvJobIds.includes(j.id));
    const hasPermitJob = jobs.some((j) => permitJobIds.includes(j.id));
    const hasGoodStandingJob = jobs.some((j) => goodStandingJobIds.includes(j.id));
    const hasSpecialtyJob = jobs.some((j) => specialtyJobIds.includes(j.id));
    const hasExpJob = jobs.some((j) => experienceJobIds.includes(j.id));

    if (docName.includes("Curriculum vitae")) return hasCvJob;
    if (docName.includes("Permis d'exercice")) return hasPermitJob;
    if (docName.includes("Lettre de membre en règle")) return hasGoodStandingJob;
    if (docName.includes("Certificat / Attestation de spécialité")) return hasSpecialtyJob;
    if (docName.includes("Preuve d'expérience spécifique")) return hasExpJob;

    return false;
  }

  isAdditionalDocRequiredForJob(docNameFr: string, jobId: string): boolean {
    const cvJobIds = [
      "00152", "00155", "00335", "00372", "00378", "00406", "00190", "00194",
      "00195", "00198", "00204", "00374", "00153", "00191", "00349", "00390", "00398"
    ];
    const permitJobIds = [
      "00149", "00161", "00214", "00152", "00153", "00190", "00191", "00194",
      "00195", "00198", "00204", "00335", "00372", "00374", "00390", "00393", "00406"
    ];
    const goodStandingJobIds = [
      "00152", "00153", "00190", "00191", "00194", "00198", "00204", "00335",
      "00372", "00374", "00390", "00393"
    ];
    const specialtyJobIds = [
      "00152", "00191", "00372", "00390", "00393", "00164", "00349"
    ];
    const experienceJobIds = [
      "00137", "00155", "00189", "00203", "00208", "00211", "00166", "00398", "00390"
    ];

    if (docNameFr.includes("Curriculum vitae")) return cvJobIds.includes(jobId);
    if (docNameFr.includes("Permis d'exercice")) return permitJobIds.includes(jobId);
    if (docNameFr.includes("Lettre de membre en règle")) return goodStandingJobIds.includes(jobId);
    if (docNameFr.includes("Certificat / Attestation de spécialité")) return specialtyJobIds.includes(jobId);
    if (docNameFr.includes("Preuve d'expérience spécifique")) return experienceJobIds.includes(jobId);

    return false;
  }

  getJobSpecificDocText(jobId: string, docNameFr: string, isFrench: boolean): string {
    if (docNameFr.includes("Curriculum vitae")) {
      if (jobId === "00191") {
        return isFrench
          ? "Curriculum vitae remontant jusqu’à de cinq ans quant à l’expérience en tant que dentiste."
          : "Curriculum vitae going back up to five years regarding experience as a dentist.";
      }
      return isFrench
        ? "Curriculum vitae (CV) récent à jour."
        : "Recent up-to-date Curriculum Vitae (CV).";
    }

    if (docNameFr.includes("Permis d'exercice")) {
      if (jobId === "00149" || jobId === "00161" || jobId === "00214") {
        return isFrench
          ? "Détenir un permis de conduire provincial/territorial en règle."
          : "Hold a valid provincial/territorial driver’s license.";
      }
      if (jobId === "00152") {
        return isFrench
          ? "Fournir un permis ou inscription sans restriction (statut actif) délivré par l’autorité de réglementation provinciale ou territoriale OU une Lettre de conformité (« Good Standing ») émise par l’autorité de réglementation."
          : "Provide an unrestricted license or registration (active status) issued by the provincial or territorial regulatory authority OR a Letter of Good Standing issued by the regulatory authority.";
      }
      if (jobId === "00153") {
        return isFrench
          ? "Fournir soit un permis, une certification ou autorisation sans restriction d’exercer comme technologue en radiation médicale (en règle et en vigueur) provenant d’un organisme de réglementation provincial/territorial reconnu OU la certification d’une association professionnelle ayant conclu une entente réciproque avec l’Association canadienne des technologues en radiation médicale (ACTRM)."
          : "Provide either an unrestricted license, certification, or practice permit to practice as a medical radiation technologist (in good standing and active) from a recognized provincial/territorial regulatory body OR certification from a professional association with a reciprocal agreement with CAMRT.";
      }
      if (jobId === "00190") {
        return isFrench
          ? "Permis/licence d’exercice en règle (à titre actif) en tant que physiothérapeute émis par un organisme de réglementation provincial ou territorial."
          : "Valid (active) license/permit to practice as a physiotherapist issued by a provincial or territorial regulatory body.";
      }
      if (jobId === "00191") {
        return isFrench
          ? "Autorisation en règle et sans restriction d’exercer la Médecine dentaire de la part d’une autorité réglementaire d’une province/d’un territoire du Canada."
          : "Valid and unrestricted license/permit to practice Dentistry from a provincial/territorial regulatory authority in Canada.";
      }
      if (jobId === "00194") {
        return isFrench
          ? "Permis d’exercice de la pharmacie sans restriction en règle."
          : "Valid unrestricted license to practice pharmacy.";
      }
      if (jobId === "00195") {
        return isFrench
          ? "Permis d’exercice en règle (état actif) en soins infirmiers en tant qu’infirmier autorisé ou infirmier en pratique octroyé par un organisme de réglementation provincial ou territorial du Canada."
          : "Valid (active state) nursing practice license as a registered nurse or practical nurse issued by a provincial or territorial regulatory body in Canada.";
      }
      if (jobId === "00198") {
        return isFrench
          ? "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social, délivré par une autorité / association réglementaire provinciale ou territoriale."
          : "Valid and unrestricted license/permit (active state) to practice as a social worker issued by a provincial or territorial regulatory authority/association.";
      }
      if (jobId === "00204") {
        return isFrench
          ? "Autorisé à pratiquer le droit dans une province canadienne ou un territoire canadien."
          : "Authorized to practice law in a Canadian province or territory.";
      }
      if (jobId === "00335") {
        return isFrench
          ? "Fournir une preuve de permis en règle pour agir en tant qu’assistant dentaire délivré par une autorité de réglementation canadienne provinciale ou territoriale."
          : "Provide proof of a valid registration/license as a dental assistant issued by a Canadian provincial or territorial regulatory authority.";
      }
      if (jobId === "00372") {
        return isFrench
          ? "Fournir une preuve de détention d’une autorisation en règle de travailler comme infirmier auxiliaire autorisé/immatriculé émise par un organisme de réglementation provincial ou territorial."
          : "Provide proof of holding a valid registration/license as a licensed/registered practical nurse issued by a provincial or territorial regulatory authority.";
      }
      if (jobId === "00374") {
        return isFrench
          ? "Certificat en règle du Conseil de certification des adjoints au médecin du Canada (CCAMC) et permis/licence en règle (en vigueur) d’exercer comme adjoint au médecin délivré(e) par une autorité réglementaire d’une province ou d’un territoire du Canada."
          : "Valid certification from the Physician Assistant Certification Council of Canada (PACCC) and a valid active license to practice as a physician assistant issued by a provincial or territorial regulatory authority of Canada.";
      }
      if (jobId === "00390") {
        return isFrench
          ? "Permis d’exercice valide et sans restriction pour pratiquer la médecine à titre de spécialiste (selon la spécialité) dans toute province ou tout territoire du Canada."
          : "Valid and unrestricted license to practice medicine as a specialist (according to the specialty) in any province or territory of Canada.";
      }
      if (jobId === "00393") {
        return isFrench
          ? "Détenir une Autorisation en règle et sans restriction d’exercer la Médecine en tant que médecin de famille dans une province ou un territoire du Canada."
          : "Hold a valid and unrestricted license to practice Family Medicine in a province or territory of Canada.";
      }
      if (jobId === "00406") {
        return isFrench
          ? "Fournir une preuve d'inscription actuelle ou en cours au permis ou privilèges hospitaliers de base ou certification en vigueur pour exercer à titre de paramédical(e), délivrés par un organisme de réglementation provincial ou territorial canadien."
          : "Provide proof of current registration/licensure or active base hospital standard privileges or certification to practice as a paramedic, issued by a Canadian provincial or territorial regulatory authority.";
      }
      return isFrench
        ? "Permis d'exercice ou licence professionnelle sans restriction."
        : "Unrestricted practice permit or professional license.";
    }

    if (docNameFr.includes("Lettre de membre en règle")) {
      if (jobId === "00190") {
        return isFrench
          ? "Lettre de l’organisme de réglementation du candidat attestant que ce dernier est « En règle »."
          : "Letter from the candidate's regulatory body confirming they are \"In good standing\".";
      }
      if (jobId === "00191") {
        return isFrench
          ? "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est en règle."
          : "Letter from the professional regulatory authority confirming that the candidate is in good standing.";
      }
      if (jobId === "00204") {
        return isFrench
          ? "Être « membre en règle », en exercice ou non, du Barreau d'une province ou d’un territoire."
          : "Be a \"member in good standing\", practicing or non-practicing, of the Bar of a province or territory.";
      }
      if (jobId === "00374") {
        return isFrench
          ? "Lettre de l’autorité professionnelle réglementaire ou de son superviseur en clinique, selon le cas, attestant que le candidat est en règle."
          : "Letter from the professional regulatory authority or clinical supervisor, as applicable, confirming that the candidate is in good standing.";
      }
      if (jobId === "00390") {
        return isFrench
          ? "Attestation de bonne conduite professionnelle délivrée par l’organisme de réglementation provincial ou territorial du candidat."
          : "Certificate of professional good standing issued by the candidate’s provincial or territorial regulatory body.";
      }
      if (jobId === "00393") {
        return isFrench
          ? "Lettre des autorités de réglementation de la province/territoire du candidat attestant que ce dernier est « en règle »."
          : "Letter from the regulatory authorities of the candidate’s province/territory confirming that the candidate is in \"good standing\".";
      }
      return isFrench
        ? "Fournir une lettre de l'organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle »."
        : "Provide a letter from the professional regulatory body confirming that the candidate is in good standing.";
    }

    if (docNameFr.includes("Certificat / Attestation de spécialité")) {
      if (jobId === "00152") {
        return isFrench
          ? "Fournir soit la certification de la Société canadienne de science de laboratoire médical (SCSLM) OU la certification de l'alliance canadienne des organismes de réglementation des professionnels de laboratoire médical (ACORPLM), incluant la réussite des examens du «TLM généraliste»."
          : "Provide either the certification from the Canadian Society for Medical Laboratory Science (CSMLS) OR the certification from the Canadian Alliance of Medical Laboratory Professionals Regulators (CAMLPR), including successfully passing the 'General MLT' exams.";
      }
      if (jobId === "00191") {
        return isFrench
          ? "Certificat du Bureau national d’examen dentaire du Canada (BNED)."
          : "Certificate from the National Dental Examining Board of Canada (NDEB).";
      }
      if (jobId === "00349") {
        return isFrench
          ? "Accrédité et reconnu comme un leader au sein d’une tradition de foi par l’autorité de gouvernance de cette même tradition de foi qui exerce une supervision au Canada, et tel que recommandé par le membre désigné du CIAMC. Avoir été endossé comme aumônier par le CIAMC. Avoir réussi une entrevue et jugé apte par un comité présidé par le D Svc Aum."
          : "Accredited and recognized as a faith group leader by the governing authority of that faith group which exercises supervision in Canada, and as recommended by the ICCDF. Be endorsed as a chaplain by the ICCDF. Successfully pass an interview and be deemed suitable by a committee chaired by the D Chap Svc.";
      }
      if (jobId === "00372") {
        return isFrench
          ? "Fournir une preuve de certification comme infirmier auxiliaire autorisé/immatriculé en soins peropératoires."
          : "Provide proof of certification as a licensed/registered practical nurse in perioperative care.";
      }
      if (jobId === "00390") {
        return isFrench
          ? "Achèvement d’une formation spécialisée dans un programme de résidence agréé par le Collège royal des médecins et chirurgiens du Canada, et Certification et titre de fellow du Collège royal des médecins et chirurgiens du Canada dans l’une des spécialités médicales requises."
          : "Completion of specialized training in a residency program accredited by the Royal College of Physicians and Surgeons of Canada, and Certification and fellowship designation from the Royal College of Physicians and Surgeons of Canada in one of the required specialties.";
      }
      if (jobId === "00393") {
        return isFrench
          ? "Certification en médecine familiale du Collège des médecins de famille du Canada."
          : "Certification in Family Medicine from the College of Family Physicians of Canada.";
      }
      return isFrench
        ? "Certificat ou attestation officielle de spécialité (BNED, CCAMC, Collège Royal, etc.)"
        : "Official specialty certificate or attestation (NDEB, CACMS, Royal College, etc.)";
    }

    if (docNameFr.includes("Preuve d'expérience spécifique")) {
      if (jobId === "00137") {
        return isFrench
          ? "Expérience dans un ou plusieurs des domaines suivants : photographie, photojournalisme, conception graphique ou multimédia."
          : "Experience in one or more of the following fields: photography, photojournalism, graphic design, or multimedia.";
      }
      if (jobId === "00155") {
        return isFrench
          ? "A travaillé en tant que technologue en électronique biomédicale pendant une période totale d’au moins six (6) mois au cours des deux (2) dernières années."
          : "Had worked as a biomedical electronics technologist for a total period of at least six (6) months within the last two (2) years.";
      }
      if (jobId === "00189") {
        return isFrench
          ? "Au moins trois mois d'expérience pertinente dans un ou plusieurs des domaines suivants : industrie de la construction, gestion des installations, services d'incendies, services de l'environnement, géomatique, gestion de projet, service militaire."
          : "At least three months of relevant experience in one or more of the following fields: construction industry, facility management, fire services, environmental services, geomatics, project management, military service.";
      }
      if (jobId === "00203") {
        return isFrench
          ? "Fournir une preuve d’au moins une (1) année d’expérience cumulative dans deux ou plusieurs des domaines suivants : communications, journalisme, commercialisation, affaires publiques, relations publiques, recherche sur l'opinion publique, médias numériques ou sociaux."
          : "Provide proof of at least one (1) year of cumulative experience in two or more of the following fields: communications, journalism, marketing, public affairs, public relations, public opinion research, digital or social media.";
      }
      if (jobId === "00208") {
        return isFrench
          ? "Au moins une ou plusieurs années de travail à temps plein dans un ou plusieurs des domaines suivants : sélection, recrutement (RH), recherche en sciences sociales, orientation scolaire/professionnelle."
          : "At least one or more years of full-time work in one or more of the following fields: selection, recruitment (HR), social science research, academic/career counseling.";
      }
      if (jobId === "00211") {
        return isFrench
          ? "Fournir une preuve d’au moins trois (3) ans cumulatifs d’expérience à temps plein dans l’un ou plusieurs des domaines suivants : élaboration d’un programme d’études, expert-conseil en éducation, conception de l’instruction, formation du personnel, enseignement/instruction, expert-conseil en instruction, développement de l’instruction."
          : "Provide proof of at least three (3) cumulative years of full-time experience in one or more of the following fields: curriculum development, education consultant, instructional design, staff training, teaching/instruction, instructional consultant, instructional development.";
      }
      if (jobId === "00166") {
        return isFrench
          ? "Fournir une preuve d’expérience comme musicien professionnel dans une variété d’ensembles et dans divers styles de musique, p. ex. à titre de musicien travaillant à son propre compte, ou à temps plein avec une orchestre, un ensemble ou un groupe de musique local."
          : "Provide proof of experience as a professional musician in a variety of ensembles and in various styles of music, e.g. as a self-employed musician, or full-time with a local orchestra, ensemble, or music group.";
      }
      if (jobId === "00390") {
        return isFrench
          ? "Pour toutes les spécialités (à l’exception de la psychiatrie et de la médecine physique et réadaptation) : Être employé à temps plein dans un poste clinique au sein d’un établissement de soins de santé civil."
          : "For all specialties, except psychiatry and physical medicine and rehabilitation (physiatry): Be employed full-time in a clinical position within a civilian healthcare facility.";
      }
      if (jobId === "00398") {
        return isFrench
          ? "Un minimum de deux années d’expérience cumulative en gestion à temps plein au cours des cinq dernières années dans un milieu de soins de santé."
          : "A minimum of two years of cumulative full-time management experience within the last five years in a healthcare setting.";
      }
      return isFrench
        ? "Preuve d'expérience spécifique (gestion, portfolio, accréditation)."
        : "Proof of specific experience (management, portfolio, accreditation).";
    }

    return isFrench ? docNameFr : docNameFr;
  }

  getDisplayLabelForAdditionalDoc(doc: DocumentItem, reason: RejectionReason): string {
    const dossierJobs = this.getDossierJobObjects();
    if (dossierJobs.length > 0) {
      const matchingJobs = dossierJobs.filter((j) =>
        this.isAdditionalDocRequiredForJob(doc.nameFr, j.id)
      );
      if (matchingJobs.length > 0) {
        const texts = matchingJobs.map((j) =>
          this.getJobSpecificDocText(j.id, doc.nameFr, true)
        );
        const uniqueTexts = Array.from(new Set(texts));
        return uniqueTexts.join(" — ");
      }
    }
    return reason.labelFr;
  }

  hasVisibleTaskBasedDocs(task: Task): boolean {
    if (!task || !task.documents) return false;
    return task.documents.some((d) => this.isTaskBasedAdditionalDoc(d) && this.shouldShowDoc(task, d));
  }

  hasVisibleAdditionalDocs(task: Task): boolean {
    if (!task || !task.documents) return false;
    const dossierJobs = this.getDossierJobObjects();
    if (dossierJobs.length === 0) return false;
    return dossierJobs.some((j) => this.hasJobAdditionalDocs(task, j));
  }

  hasJobAdditionalDocs(task: Task, job: JobEntry): boolean {
    if (!task || !task.documents || !job) return false;
    return task.documents.some(
      (d) =>
        !this.isSubsidizedDoc(d) &&
        !this.isTaskBasedAdditionalDoc(d) &&
        this.isAdditionalDocRequiredForJob(d.nameFr, job.id) &&
        this.shouldShowDoc(task, d)
    );
  }

  hasVisibleSubsidizedDocs(task: Task): boolean {
    if (!task || !task.documents) return false;
    return task.documents.some((d) => this.isSubsidizedDoc(d) && this.shouldShowDoc(task, d));
  }

  getDossierJobsSummaryTextFr(): string {
    const jobs = this.getDossierJobObjects();
    if (jobs.length === 0) return "";
    return jobs.map((j) => `${j.title} (${j.id})`).join(", ");
  }

  getDossierJobsSummaryTextEn(): string {
    const jobs = this.getDossierJobObjects();
    if (jobs.length === 0) return "";
    return jobs.map((j) => `${j.titleEn || j.title} (${j.id})`).join(", ");
  }

  // Computed Tasks based on Stage
  visibleTasks = computed(() => {
    const currentStage = this.stage();
    const tasks = this.allTasks();

    if (currentStage === "intro") {
      return [];
    }

    if (currentStage === "minor-check") {
      // In Minor check, we only want Birth Certificate and Parental Consent tasks.
      // The "Partie H" is now inside "Consentement du parent", so we don't need the general App Form task here.
      return tasks.filter(
        (t) =>
          t.nameFr.includes("Certificat de naissance") ||
          t.nameFr.includes("Consentement du parent"),
      );
    }

    // GD Role: filter offer tasks based on Local vs OTA dossier type
    if (this.selectedRole() === "gestionnaire") {
      const isOta = this.evaluationMedicaleType() === "Dossier OTA";
      return tasks.filter((t) => {
        if (t.nameFr.includes("Consentement du parent")) return false;

        // Filter Offer tasks
        if (t.section === "Courriel d'offre" || t.nameFr.includes("Offre")) {
          return t.nameFr === "Offre normale" || t.nameFr.toLowerCase().includes("subventionn");
        }

        return true;
      });
    }

    // Main Stage: Exclude Parental Consent
    return tasks.filter((t) => {
      if (t.nameFr.includes("Consentement du parent")) return false;

      return true;
    });
  });

  // Action: User clicks "Oui" (Minor)
  startMinorCheck() {
    this.isUnderAge.set(true);
    this.stage.set("minor-check");
    const tasks = this.visibleTasks();
    if (tasks.length > 0) this.selectTask(tasks[0]);
  }

  // Action: User clicks "Non" (Adult) or finishes minor check
  startMainProgram() {
    if (this.stage() === "intro") {
      this.isUnderAge.set(false);
    }
    this.stage.set("main");
    const tasks = this.visibleTasks();
    if (tasks.length > 0) this.selectTask(tasks[0]);
  }

  // Action: GD user chooses dossier type (Local or OTA)
  selectGdDossierType(type: 'Local' | 'OTA') {
    this.evaluationMedicaleType.set(type === 'OTA' ? 'Dossier OTA' : 'Dossier régulier');
    if (type === 'OTA') {
      const mtl = this.recruitmentCentersList.find(c => c.city === 'Montréal') || this.recruitmentCentersList[0];
      this.offreLieuVille.set('Montréal');
      this.offreLieuEnrolement.set(mtl.fullFr);
    } else {
      const savedVille = (typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_ville')) || 'Québec';
      const centerObj = this.recruitmentCentersList.find(c => c.city === savedVille) || this.recruitmentCentersList[0];
      this.offreLieuVille.set(savedVille);
      this.offreLieuEnrolement.set((typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_enrolement')) || centerObj.fullFr);
    }
    this.stage.set("main");
    const tasks = this.visibleTasks();
    if (tasks.length > 0) this.selectTask(tasks[0]);
  }

  // Check if the 4 specific minor documents are compliant
  isMinorCheckComplete = computed(() => {
    const keys = this.compliantDocKeys();

    // Convert to array explicitly typed as string[] to avoid TS inference issues
    const keysArray = Array.from(keys) as string[];

    // 1. Certificat de naissance (Check parents)
    const hasBirthCert = keysArray.some(
      (k) =>
        k.includes("Certificat de naissance") &&
        k.includes("::Certificat de naissance"),
    );

    // 2. Parent ID (Inside Consent task)
    const hasParentId = keysArray.some(
      (k) =>
        k.includes("Consentement du parent") &&
        k.includes("::Pièce d'identité du parent"),
    );

    // 3. Parent Selfie (Inside Consent task)
    const hasParentSelfie = keysArray.some(
      (k) =>
        k.includes("Consentement du parent") &&
        (k.includes("::Selfie du parent") || k.includes("::Égoportrait (Selfie) du parent")),
    );

    // 4. Formulaire demande Partie H (Inside Consent task now)
    const hasPartH = keysArray.some(
      (k) =>
        k.includes("Consentement du parent") &&
        k.includes("::Formulaire de demande d'emploi - Partie H"),
    );

    return hasBirthCert && hasParentId && hasParentSelfie && hasPartH;
  });

  // --- CORE LOGIC ---

  // Actions
  selectTask(task: Task) {
    this.selectedTask.set(task);
    if (task.nameFr.includes("Offre normale")) {
      if (this.offreDateArriveeUnite() === '2025 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2026 au plus tard 16h00');
      }
    } else if (task.nameFr.toLowerCase().includes("subventionn")) {
      if (this.offreDateArriveeUnite() === '2026 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2025 au plus tard 16h00');
      }
    }
  }

  toggleTaskNotCompleted(task: Task) {
    const willBeNotCompleted = !this.isTaskNotCompleted(task);

    this.taskNotCompletedKeys.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(task.nameFr)) {
        newSet.delete(task.nameFr);
      } else {
        newSet.add(task.nameFr);
      }
      return newSet;
    });

    if (willBeNotCompleted) {
      // Clear compliant keys for all documents in this task
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        task.documents.forEach((doc) => {
          newSet.delete(this.getDocKey(task, doc));
        });
        return newSet;
      });

      // Clear selected rejection reasons for all documents in this task
      this.selectedRejectionKeys.update((set) => {
        const newSet = new Set(set);
        const dossierJobs = this.getDossierJobObjects();
        task.documents.forEach((doc) => {
          doc.reasons.forEach((reason) => {
            newSet.delete(this.getReasonKey(doc, reason));
            dossierJobs.forEach((j) => {
              newSet.delete(this.getJobReasonKey(j, doc, reason));
            });
          });
        });
        return newSet;
      });
    }
  }

  isTaskNotCompleted(task: Task): boolean {
    return this.taskNotCompletedKeys().has(task.nameFr);
  }

  toggleReason(task: Task, doc: DocumentItem, reason: RejectionReason) {
    const reasonKey = this.getReasonKey(doc, reason);

    // If we select a rejection, the document is no longer "Compliant"
    this.setCompliantState(task, doc, false);
    if (task.nameFr.includes("Documents Supplémentaires")) {
      const suppKey = `${task.nameFr}::metiers_docs`;
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        newSet.delete(suppKey);
        return newSet;
      });
    }

    this.selectedRejectionKeys.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(reasonKey)) {
        newSet.delete(reasonKey);
      } else {
        newSet.add(reasonKey);
        
        // Uncheck others if "Inexistant au dossier" is selected, and vice versa
        if (reason.id.includes("inexist")) {
          // Uncheck all other reasons for this document
          doc.reasons.forEach(r => {
            if (r.id !== reason.id) {
               newSet.delete(this.getReasonKey(doc, r));
            }
          });
        } else {
          // If we check another reason, uncheck "Inexistant au dossier"
          doc.reasons.forEach(r => {
            if (r.id.includes("inexist")) {
               newSet.delete(this.getReasonKey(doc, r));
            }
          });
        }
      }
      return newSet;
    });
  }

  toggleJobReason(task: Task, job: JobEntry, doc: DocumentItem, reason: RejectionReason) {
    const jobKey = this.getJobReasonKey(job, doc, reason);
    const generalKey = this.getReasonKey(doc, reason);

    this.setCompliantState(task, doc, false);
    if (task.nameFr.includes("Documents Supplémentaires")) {
      const suppKey = `${task.nameFr}::metiers_docs`;
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        newSet.delete(suppKey);
        return newSet;
      });
    }

    this.selectedRejectionKeys.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(generalKey)) {
        newSet.delete(generalKey);
        const dossierJobs = this.getDossierJobObjects();
        for (const j of dossierJobs) {
          if (j.id !== job.id && this.isAdditionalDocRequiredForJob(doc.nameFr, j.id)) {
            newSet.add(this.getJobReasonKey(j, doc, reason));
          }
        }
      } else {
        if (newSet.has(jobKey)) {
          newSet.delete(jobKey);
        } else {
          newSet.add(jobKey);
        }
      }
      return newSet;
    });
  }

  // Helpers for Additional Job Docs Compliance
  hasAdditionalJobDocsRejections(task: Task): boolean {
    const dossierJobs = this.getDossierJobObjects();
    if (dossierJobs.length === 0) return false;
    return task.documents.some((doc) => {
      if (!this.isSubsidizedDoc(doc) && !this.isTaskBasedAdditionalDoc(doc)) {
        return doc.reasons.some((reason) =>
          dossierJobs.some(
            (job) =>
              this.isAdditionalDocRequiredForJob(doc.nameFr, job.id) &&
              this.isJobReasonSelected(job, doc, reason)
          )
        );
      }
      return false;
    });
  }

  isAdditionalJobDocsCompliant(task?: Task): boolean {
    const t = task || this.visibleTasks().find((taskItem) => taskItem.nameFr.includes("Documents Supplémentaires"));
    if (!t) return false;
    const key = `${t.nameFr}::metiers_docs`;
    return this.compliantDocKeys().has(key) && !this.hasAdditionalJobDocsRejections(t);
  }

  toggleAdditionalJobDocsCompliant(task: Task) {
    if (this.isAdditionalJobDocsCompliant(task)) {
      // Toggle OFF
      const key = `${task.nameFr}::metiers_docs`;
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        newSet.delete(key);
        return newSet;
      });
    } else {
      // Toggle ON:
      // 1. Clear any selected rejection keys for job-specific additional docs
      this.selectedRejectionKeys.update((set) => {
        const newSet = new Set(set);
        const dossierJobs = this.getDossierJobObjects();
        task.documents.forEach((doc) => {
          if (!this.isSubsidizedDoc(doc) && !this.isTaskBasedAdditionalDoc(doc)) {
            doc.reasons.forEach((r) => {
              newSet.delete(this.getReasonKey(doc, r));
              dossierJobs.forEach((j) => {
                newSet.delete(this.getJobReasonKey(j, doc, r));
              });
            });
          }
        });
        return newSet;
      });

      // 2. Mark as compliant
      const key = `${task.nameFr}::metiers_docs`;
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        newSet.add(key);
        return newSet;
      });
    }
  }

  // Toggle "Conforme" state
  toggleCompliant(task: Task, doc: DocumentItem) {
    if (this.isCompliant(task, doc)) {
      // If already compliant, toggle OFF
      this.setCompliantState(task, doc, false);
    } else {
      // If turning ON:
      // 1. Clear rejections (cannot be both compliant and rejected)
      this.selectedRejectionKeys.update((set) => {
        const newSet = new Set(set);
        const dossierJobs = this.getDossierJobObjects();
        doc.reasons.forEach((r) => {
          newSet.delete(this.getReasonKey(doc, r));
          dossierJobs.forEach((j) => {
            newSet.delete(this.getJobReasonKey(j, doc, r));
          });
        });
        return newSet;
      });

      // 2. Set Compliant State explicitly
      this.setCompliantState(task, doc, true);
    }
  }

  // Helpers
  private getReasonKey(doc: DocumentItem, reason: RejectionReason): string {
    return `${doc.nameFr}::${reason.id}`;
  }

  private getJobReasonKey(job: JobEntry, doc: DocumentItem, reason: RejectionReason): string {
    return `${doc.nameFr}::${reason.id}::${job.id}`;
  }

  private getDocKey(task: Task, doc: DocumentItem): string {
    return `${task.nameFr}::${doc.nameFr}`;
  }

  private setCompliantState(
    task: Task,
    doc: DocumentItem,
    isCompliant: boolean,
  ) {
    const key = this.getDocKey(task, doc);
    this.compliantDocKeys.update((set) => {
      const newSet = new Set(set);
      if (isCompliant) {
        newSet.add(key);
      } else {
        newSet.delete(key);
      }
      return newSet;
    });
  }

  // State Checkers
  isJobReasonSelected(job: JobEntry, doc: DocumentItem, reason: RejectionReason): boolean {
    return (
      this.selectedRejectionKeys().has(this.getJobReasonKey(job, doc, reason)) ||
      this.selectedRejectionKeys().has(this.getReasonKey(doc, reason))
    );
  }

  isReasonSelected(doc: DocumentItem, reason: RejectionReason): boolean {
    if (this.selectedRejectionKeys().has(this.getReasonKey(doc, reason))) {
      return true;
    }
    const dossierJobs = this.getDossierJobObjects();
    return dossierJobs.some((j) =>
      this.selectedRejectionKeys().has(this.getJobReasonKey(j, doc, reason))
    );
  }

  hasRejections(doc: DocumentItem): boolean {
    return doc.reasons.some((r) => this.isReasonSelected(doc, r));
  }

  hasConfirmationReasons(doc: DocumentItem): boolean {
    return doc.reasons.some((r) => r.isConfirmation);
  }

  hasAdditionalDocReasons(doc: DocumentItem): boolean {
    return doc.reasons.some((r) => r.isAdditionalDoc);
  }

  hasNormalReasons(doc: DocumentItem): boolean {
    return doc.reasons.some((r) => !r.isConfirmation && !r.isAdditionalDoc);
  }

  // A document is Compliant only if explicitly marked so
  isCompliant(task: Task, doc: DocumentItem): boolean {
    return this.compliantDocKeys().has(this.getDocKey(task, doc));
  }

  hasTaskRejections(task: Task): boolean {
    return (
      this.isTaskNotCompleted(task) ||
      task.documents.some((doc) => this.hasRejections(doc))
    );
  }

  isTaskCompliant(task: Task): boolean {
    if (task.nameFr.includes("Documents Supplémentaires")) {
      if (this.hasTaskRejections(task)) {
        return false;
      }
      if (this.hasVisibleAdditionalDocs(task)) {
        return this.isAdditionalJobDocsCompliant(task);
      }
      return true;
    }

    const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");

    if (isIdentity) {
      const hasSelfie = task.documents.some(
        (d) =>
          d.nameFr.toLowerCase().includes("selfie") &&
          this.isCompliant(task, d),
      );
      const hasId = task.documents.some(
        (d) =>
          !d.nameFr.toLowerCase().includes("selfie") &&
          this.isCompliant(task, d),
      );
      return hasSelfie && hasId;
    }

    const isConsentement = task.nameFr.includes("Consentement du parent");
    if (isConsentement) {
      return task.documents.every((d) => this.isCompliant(task, d));
    }

    // For other tasks, it's compliant if any 1 document is compliant
    return task.documents.some((d) => this.isCompliant(task, d));
  }

  allTasksCompliant = computed(() => {
    const tasks = this.visibleTasks();
    if (tasks.length === 0) return false;
    return tasks.every((task) => {
      // Le formulaire MDN 2977 n'est pas obligatoire pour la conformité finale
      if (task.nameFr.includes("MDN 2977")) {
        return true;
      }
      if (task.nameFr.includes("Courriel d'offre")) {
        return true;
      }
      return this.isTaskCompliant(task);
    });
  });

  hasSelectedRejections = computed(() => {
    return this.selectedRejectionKeys().size > 0 || this.taskNotCompletedKeys().size > 0;
  });

  isPremierContactActive = computed(() => {
    return (
      this.selectedRole() === 'gestionnaire' &&
      this.premierContactCourriel()
    );
  });

  isAvisFermetureActive = computed(() => {
    return (
      this.selectedRole() === 'gestionnaire' &&
      this.avisFermetureCourriel()
    );
  });

  isAnnexeQActive = computed(() => {
    return (
      this.selectedRole() === 'gestionnaire' &&
      this.annexeQCourriel()
    );
  });

  isMedicalEvaluationActive = computed(() => {
    return (
      this.selectedRole() === 'gestionnaire' &&
      (this.evaluationMedicalePartie1() ||
        this.evaluationMedicalePartie2() ||
        this.evaluationMedicalePartie1Et2())
    );
  });

  hasAnyGdSelection = computed(() => {
    if (this.selectedRole() !== 'gestionnaire') return false;
    return (
      this.isPremierContactActive() ||
      this.isAvisFermetureActive() ||
      this.isAnnexeQActive() ||
      this.isMedicalEvaluationActive() ||
      this.offreNormaleChecked() ||
      this.offreEtudesSubventionneesChecked() ||
      this.rappelCeremonieChecked() ||
      this.hasSelectedRejections() ||
      this.forceGeneralReminder() ||
      this.selectedEmailBankTemplate() !== '' ||
      this.allTasksCompliant()
    );
  });

  // A document is "Active" if it is either Compliant OR has Rejections
  isDocActive(task: Task, doc: DocumentItem): boolean {
    return this.isCompliant(task, doc) || this.hasRejections(doc);
  }

  // LOGIC: Visibility of documents based on Task rules
  shouldShowDoc(task: Task, doc: DocumentItem): boolean {
    if (this.isTaskNotCompleted(task)) {
      return false;
    }

    if (task.nameFr.includes("Documents Supplémentaires")) {
      if (this.isDocActive(task, doc)) return true;
      return this.shouldShowAdditionalDoc(doc);
    }

    // NEW: Minor Check Logic for "Certificat de naissance"
    // In minor check, we only want the actual "Certificat de naissance" (long form), not citizenship card/PR card.
    if (
      this.stage() === "minor-check" &&
      task.nameFr.startsWith("Certificat de naissance")
    ) {
      return doc.nameFr === "Certificat de naissance";
    }

    // 1. If this specific document is active (being worked on), always show it.
    if (this.isDocActive(task, doc)) return true;

    // 2. Logic for "Pièce d'identité"
    // Rule: If one ID is active, hide other IDs. Always keep Selfie visible.
    if (task.nameFr.startsWith("Pièce d'identité")) {
      const isSelfie = doc.nameFr.toLowerCase().includes("selfie");

      // Always show selfie
      if (isSelfie) return true;

      // For other IDs: Check if ANY other NON-SELFIE document is active
      const otherMainIdActive = task.documents.some(
        (d) =>
          d !== doc &&
          !d.nameFr.toLowerCase().includes("selfie") &&
          this.isDocActive(task, d),
      );

      // If another main ID is active, hide this one.
      return !otherMainIdActive;
    }

    // 3. Logic for "Certificat de naissance" (Normal Mode)
    // Rule: If one document is active, hide the others.
    if (task.nameFr.startsWith("Certificat de naissance")) {
      const otherActive = task.documents.some(
        (d) => d !== doc && this.isDocActive(task, d),
      );
      return !otherActive;
    }

    // Default: Show everything
    return true;
  }

  // LOGIC: Visibility of reasons based on Stage (NEW)
  shouldShowReason(
    task: Task,
    doc: DocumentItem,
    reason: RejectionReason,
  ): boolean {
    // The previous complex logic for Part H is removed because the reasons have been moved
    // to the appropriate task in the data structure itself.
    return true;
  }

  // Email Bank & Reminder State
  selectedEmailBankTemplate = signal<string>("");
  isEmailBankDropdownOpen = signal<boolean>(false);

  forceGeneralReminder = computed(() => this.selectedEmailBankTemplate() === "general_reminder");

  toggleEmailBankDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isEmailBankDropdownOpen.update((v) => !v);
  }

  selectEmailBankTemplate(templateId: string) {
    if (this.selectedEmailBankTemplate() === templateId) {
      this.selectedEmailBankTemplate.set("");
    } else {
      this.selectedEmailBankTemplate.set(templateId);
    }
    this.isEmailBankDropdownOpen.set(false);
  }

  toggleGeneralReminder() {
    this.selectEmailBankTemplate("general_reminder");
  }

  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isEmailBankDropdownOpen() && !target.closest('.email-bank-dropdown-container')) {
      this.isEmailBankDropdownOpen.set(false);
    }
  }

  // Triage Medical State
  triageMedicalRequis = signal(false);

  toggleTriageMedical() {
    this.triageMedicalRequis.update((v) => !v);
  }

  // Offer Email State
  offreNormaleChecked = signal(false);
  offreEtudesSubventionneesChecked = signal(false);

  // Form fields for offer email
  readonly recruitmentCentersList: RecruitmentCenter[] = RECRUITMENT_CENTERS;
  
  // Rappel cérémonie d'assermentation state
  rappelCeremonieChecked = signal(false);
  rappelCeremonieDate = signal<string>('');
  rappelCeremonieHeurePostulant = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('rappel_heure_postulant')) || '7h30');
  rappelCeremonieHeureInvites = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('rappel_heure_invites')) || '10h15');
  rappelCeremonieLieu = signal<string>('Québec');

  offreLieuVille = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_ville')) || 'Québec');
  offreUniteAffectation = signal<string>('3229');
  readonly unitesAffectation = UNITS_LIST;
  offreMetier = signal<string>('');
  offreMetierSearchQuery = signal<string>('');
  offreMetierDropdownOpen = signal<boolean>(false);
  offreProgrammeEnrolement = signal<string>('');
  offreElement = signal<string>('');
  offreDureeContrat = signal<string>('');
  offreEtudesSubventionnees = signal<string>('');
  offreDureeEtudesSubventionnees = signal<string>('');
  readonly enrolmentHoursList: string[] = ENROLMENT_HOURS;
  offreHeureArriveePostulant = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_postulant')) || '8h00');
  offreHeureArriveeInvites = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_invites')) || '10h00');
  offreDateEnrolement = signal<string>('');
  offreLieuEnrolement = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_enrolement')) || RECRUITMENT_CENTERS[0].fullFr);
  offreDateArriveeUnite = signal<string>('');
  offreElementsManquants = signal<string>('Spécimen de chèque');
  offreDateElementsManquants = signal<string>('');
  offreSerieCours = signal<string>('');
  offreDateCoursDebut = signal<string>('');
  offreDateCoursFin = signal<string>('');

  // Sub-panel mode for Offer task
  offreSubPanelMode = signal<'courriel' | 'note'>('courriel');

  // Form fields for offer note
  noteStatutCivil = signal<string>('célibataire');
  noteConjoint = signal<string>('N/A');
  noteConjointTexte = signal<string>('');
  noteEnfantCount = signal<string>('0');
  noteEnfantDetails = signal<{ sex: string; year: string }[]>([]);
  notePlaqueImm = signal<string>('');
  noteBrisBail = signal<string>('N/A');
  noteEntreposage = signal<string>('N/A');
  noteSermentDeclaration = signal<string>('Serment');
  noteInviteMil = signal<string>('N/A');
  noteInviteMilTexte = signal<string>('');
  noteSvcMilAnt = signal<string>('N/A');
  noteBeneficiaire = signal<string>('');
  noteDateCourrielConfirmation = signal<string>('');
  copiedNoteNotification = signal<boolean>(false);

  getEffectiveNoteDateCourrielConfirmation(): string {
    const val = this.noteDateCourrielConfirmation();
    if (val && val.trim().length > 0) {
      return val;
    }
    return getTodayDateString();
  }

  readonly statutCivilOptions: string[] = [
    'célibataire',
    'marié(e)',
    'conjoint(e) de fait',
    'divorcé(e)',
    'séparé(e)',
    'veuf/veuve'
  ];

  readonly ouiNonOptions: string[] = [
    'N/A',
    'oui'
  ];

  readonly brisBailOptions: string[] = [
    'N/A',
    'Refus du post',
    'Accepté par le post'
  ];

  readonly entreposageOptions: string[] = [
    'N/A',
    'Refus du post',
    'Accepté par le post'
  ];

  readonly sermentDeclarationOptions: string[] = [
    'Serment',
    'Déclaration',
    'Serment RP',
    'Déclaration RP'
  ];

  readonly svcMilAntOptions: string[] = [
    'N/A',
    'Force régulière',
    'Première réserve',
    'Cadets / Rangers',
    'Armée étrangère'
  ];

  // Helper to dynamically generate child age years
  getEnfantYears(): string[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear - 18; y <= currentYear; y++) {
      years.push(y.toString());
    }
    return years.reverse(); // Newest first
  }

  onEnfantCountChange(count: string) {
    const num = parseInt(count, 10);
    if (!isNaN(num) && num >= 0 && num <= 20) {
      this.noteEnfantCount.set(count);
      const currentDetails = this.noteEnfantDetails();
      const newDetails = [];
      const years = this.getEnfantYears();
      const defaultYear = years.length > 0 ? years[0] : '';
      for (let i = 0; i < num; i++) {
        if (i < currentDetails.length) {
          newDetails.push(currentDetails[i]);
        } else {
          newDetails.push({ sex: 'M', year: defaultYear });
        }
      }
      this.noteEnfantDetails.set(newDetails);
    } else if (count === '') {
      this.noteEnfantCount.set('');
      this.noteEnfantDetails.set([]);
    }
    this.autoActivateOffreEmail();
  }

  updateEnfantDetail(index: number, field: 'sex' | 'year', value: string) {
    const details = [...this.noteEnfantDetails()];
    if (details[index]) {
      details[index] = { ...details[index], [field]: value };
      this.noteEnfantDetails.set(details);
      this.autoActivateOffreEmail();
    }
  }

  getUniteAffectationObj() {
    const target = this.offreUniteAffectation();
    const session = this.unitesAffectation.find(u => u.id === target || u.uic === target)
      || (target === 'st-jean' ? this.unitesAffectation.find(u => u.id === '3613' || u.uic === '3613') : null)
      || this.unitesAffectation.find(u => u.id === '3613')
      || this.unitesAffectation[0];
    if (!session) return { nom: 'N/A', adressePlain: '', adresseHtml: '', uic: '' };
    
    let displayNom = session.officialName;
    if (session.id === '3613' || session.uic === '3613' || target === 'st-jean') {
      displayNom = 'ÉCOLE DE LEADERSHIP ET DE RECRUES DES FORCES CANADIENNES';
    }

    return {
      nom: displayNom,
      adressePlain: session.addressPlain,
      adresseHtml: session.addressHtml,
      uic: session.uic || session.id
    };
  }

  isUic3613Selected(): boolean {
    const unitObj = this.getUniteAffectationObj();
    return unitObj.uic === '3613' || this.offreUniteAffectation() === '3613' || this.offreUniteAffectation() === 'st-jean';
  }

  getOfferFormattedNote(): string {
    const metier = this.offreMetier() || '189 génie de construction';
    const statut = this.noteStatutCivil() || 'célibataire';
    
    const conjointOpt = this.noteConjoint() || 'N/A';
    const conjoint = conjointOpt === 'oui' ? (this.noteConjointTexte() || 'À CONFIRMER') : conjointOpt;
    
    const count = parseInt(this.noteEnfantCount() || '0', 10);
    let enfant = 'N/A';
    if (!isNaN(count) && count > 0) {
      enfant = this.noteEnfantDetails()
        .map(c => `${c.sex} ${c.year}`)
        .join(', ');
    }

    const plaque = this.notePlaqueImm().trim() || 'À confirmer';
    const brisBail = this.noteBrisBail() || 'N/A';
    const entreposage = this.noteEntreposage() || 'N/A';
    const serment = this.noteSermentDeclaration() || 'Serment';
    const inviteMilOpt = this.noteInviteMil() || 'N/A';
    const inviteMil = inviteMilOpt === 'oui' ? (this.noteInviteMilTexte() || 'À CONFIRMER') : inviteMilOpt;
    const svcMilAnt = this.noteSvcMilAnt() || 'N/A';
    const beneficiaire = this.noteBeneficiaire();
    const dateCourriel = this.getEffectiveNoteDateCourrielConfirmation();

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

  copyNoteToClipboard() {
    const note = this.getOfferFormattedNote();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(note);
    }
    this.copiedNoteNotification.set(true);
    setTimeout(() => this.copiedNoteNotification.set(false), 2000);
  }

  onOffreHeurePostulantChange(val: string) {
    this.offreHeureArriveePostulant.set(val);
    try {
      localStorage.setItem('offre_heure_postulant', val);
    } catch {}
    this.autoActivateOffreEmail();
  }

  onOffreHeureInvitesChange(val: string) {
    this.offreHeureArriveeInvites.set(val);
    try {
      localStorage.setItem('offre_heure_invites', val);
    } catch {}
    this.autoActivateOffreEmail();
  }

  onNoteConjointTexteInput(val: string) {
    this.noteConjointTexte.set(val);
    this.autoActivateOffreEmail();
  }

  onOffreLieuVilleChange(city: string) {
    this.offreLieuVille.set(city);
    const center = this.recruitmentCentersList.find(c => c.city === city);
    if (center) {
      this.offreLieuEnrolement.set(center.fullFr);
      if (this.evaluationMedicaleType() !== 'Dossier OTA') {
        try {
          localStorage.setItem('offre_lieu_ville', city);
          localStorage.setItem('offre_lieu_enrolement', center.fullFr);
        } catch {}
      }
    }
    this.autoActivateOffreEmail();
  }

  getSelectedRecruitmentCenter(): RecruitmentCenter {
    return this.recruitmentCentersList.find(c => c.city === this.offreLieuVille()) || this.recruitmentCentersList[0];
  }

  getOffreDateEnrolementFull(lang: 'fr' | 'en' = 'fr'): string {
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

  getOffreDateArriveeUniteFull(): string {
    const raw = this.offreDateArriveeUnite().trim();
    if (!raw) {
      return 'au plus tard 16h00';
    }
    if (raw.includes('au plus tard')) {
      return raw;
    }
    return `${raw} au plus tard 16h00`;
  }

  getOffreDatesCoursFull(): string {
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

  // Computed job type and available enrollment programs
  offreJobType = computed<JobCategory | null>(() => {
    return this.jobService.detectJobType(this.offreMetier());
  });

  availableOffreProgrammes = computed<string[]>(() => {
    return this.jobService.getProgramsForJobType(this.offreJobType());
  });

  offreDetectedElement = computed<MilitaryElement | null>(() => {
    return this.jobService.detectJobElement(this.offreMetier());
  });

  getFilteredJobsForOffre(): JobEntry[] {
    const query = this.offreMetierSearchQuery();
    if (!query || query.trim() === "") {
      return this.jobService.getAllJobs();
    }
    return this.jobService.searchJobs(query);
  }

  selectOffreMetier(job: JobEntry) {
    const text = `${job.id} - ${job.title}`;
    this.offreMetier.set(text);
    this.offreMetierSearchQuery.set(text);
    this.offreMetierDropdownOpen.set(false);

    // Automatic element selection
    const element = job.element || this.jobService.getJobElement(job.id);
    if (element && element !== 'CMP') {
      this.offreElement.set(element);
    } else if (element === 'CMP') {
      // For CMP, applicant chooses element: user will select manually
      this.offreElement.set('');
    }

    // Validate whether currently selected programme is still valid for this job category
    const validProgs = this.jobService.getProgramsForJobType(job.category || (this.jobService.isOfficerJob(job.id) ? 'officier' : 'mr'));
    if (this.offreProgrammeEnrolement() && !validProgs.includes(this.offreProgrammeEnrolement())) {
      this.offreProgrammeEnrolement.set('');
    }
    
    // Auto-fill PFOR contract duration if Subsidized Studies is checked
    if (this.offreEtudesSubventionneesChecked() && job.contracts) {
      const pfor = job.contracts.find(c => c.program.toUpperCase() === 'PFOR');
      if (pfor) {
        this.offreDureeContrat.set(pfor.duration);
      }
    }
    this.autoActivateOffreEmail();
  }

  onOffreMetierQueryChange(val: string) {
    this.offreMetierSearchQuery.set(val);
    this.offreMetier.set(val);
    this.offreMetierDropdownOpen.set(true);

    const detectedElem = this.jobService.detectJobElement(val);
    if (detectedElem && detectedElem !== 'CMP') {
      this.offreElement.set(detectedElem);
    } else if (detectedElem === 'CMP') {
      this.offreElement.set('');
    }

    const detectedType = this.jobService.detectJobType(val);
    const validProgs = this.jobService.getProgramsForJobType(detectedType);
    if (this.offreProgrammeEnrolement() && !validProgs.includes(this.offreProgrammeEnrolement())) {
      this.offreProgrammeEnrolement.set('');
    }
    if (val && val.trim().length > 0) {
      this.autoActivateOffreEmail();
    }
  }

  clearOffreMetier(event?: Event) {
    if (event) event.stopPropagation();
    this.offreMetier.set('');
    this.offreMetierSearchQuery.set('');
    this.offreElement.set('');
  }

  closeOffreMetierDropdownDelayed() {
    setTimeout(() => {
      this.offreMetierDropdownOpen.set(false);
    }, 200);
  }

  clearOtherGdEmails(except: 'premierContact' | 'medical1' | 'medical2' | 'medical1et2' | 'avisFermeture' | 'annexeQ' | 'offreNormale' | 'offreEtudes' | 'rappelCeremonie') {
    if (except !== 'premierContact') this.premierContactCourriel.set(false);
    if (except !== 'medical1') this.evaluationMedicalePartie1.set(false);
    if (except !== 'medical2') this.evaluationMedicalePartie2.set(false);
    if (except !== 'medical1et2') this.evaluationMedicalePartie1Et2.set(false);
    if (except !== 'avisFermeture') this.avisFermetureCourriel.set(false);
    if (except !== 'annexeQ') this.annexeQCourriel.set(false);
    if (except !== 'offreNormale') this.offreNormaleChecked.set(false);
    if (except !== 'offreEtudes') this.offreEtudesSubventionneesChecked.set(false);
    if (except !== 'rappelCeremonie') this.rappelCeremonieChecked.set(false);
  }

  togglePremierContactCourriel() {
    const nextVal = !this.premierContactCourriel();
    if (nextVal) {
      this.clearOtherGdEmails('premierContact');
    }
    this.premierContactCourriel.set(nextVal);
  }

  togglePremierContactTask(type: 'medical' | 'entrevue' | 'gambit' | 'psps' | 'selfie') {
    let nextVal = false;
    if (type === 'medical') {
      nextVal = !this.premierContactMedical();
      this.premierContactMedical.set(nextVal);
    } else if (type === 'entrevue') {
      nextVal = !this.premierContactEntrevue();
      this.premierContactEntrevue.set(nextVal);
    } else if (type === 'gambit') {
      nextVal = !this.premierContactGambit();
      this.premierContactGambit.set(nextVal);
    } else if (type === 'psps') {
      nextVal = !this.premierContactPsps();
      this.premierContactPsps.set(nextVal);
    } else if (type === 'selfie') {
      nextVal = !this.premierContactSelfie();
      this.premierContactSelfie.set(nextVal);
    }

    if (nextVal || this.premierContactMedical() || this.premierContactEntrevue() || this.premierContactGambit() || this.premierContactPsps() || this.premierContactSelfie()) {
      this.clearOtherGdEmails('premierContact');
      this.premierContactCourriel.set(true);
    }
  }

  toggleEvaluationMedicalePartie1() {
    const nextVal = !this.evaluationMedicalePartie1();
    if (nextVal) {
      this.clearOtherGdEmails('medical1');
    }
    this.evaluationMedicalePartie1.set(nextVal);
  }

  toggleEvaluationMedicalePartie2() {
    const nextVal = !this.evaluationMedicalePartie2();
    if (nextVal) {
      this.clearOtherGdEmails('medical2');
    }
    this.evaluationMedicalePartie2.set(nextVal);
  }

  toggleEvaluationMedicalePartie1Et2() {
    const nextVal = !this.evaluationMedicalePartie1Et2();
    if (nextVal) {
      this.clearOtherGdEmails('medical1et2');
    }
    this.evaluationMedicalePartie1Et2.set(nextVal);
  }

  toggleAvisFermetureCourriel() {
    const nextVal = !this.avisFermetureCourriel();
    if (nextVal) {
      this.clearOtherGdEmails('avisFermeture');
    }
    this.avisFermetureCourriel.set(nextVal);
  }

  onAvisFermetureDelaiChange(val: string) {
    this.avisFermetureDelaiJours.set(val);
    this.clearOtherGdEmails('avisFermeture');
    this.avisFermetureCourriel.set(true);
  }

  onAvisFermetureDateChange(val: string) {
    this.avisFermetureDate.set(val);
    if (val) {
      this.clearOtherGdEmails('avisFermeture');
      this.avisFermetureCourriel.set(true);
    }
  }

  toggleAvisFermetureTask(type: 'entrevue' | 'medicale' | 'gambit' | 'psps') {
    let nextVal = false;
    if (type === 'entrevue') {
      nextVal = !this.avisFermetureEntrevue();
      this.avisFermetureEntrevue.set(nextVal);
    } else if (type === 'medicale') {
      nextVal = !this.avisFermetureMedicale();
      this.avisFermetureMedicale.set(nextVal);
    } else if (type === 'gambit') {
      nextVal = !this.avisFermetureGambit();
      this.avisFermetureGambit.set(nextVal);
    } else if (type === 'psps') {
      nextVal = !this.avisFermeturePsps();
      this.avisFermeturePsps.set(nextVal);
    }

    if (nextVal || this.avisFermetureEntrevue() || this.avisFermetureMedicale() || this.avisFermetureGambit() || this.avisFermeturePsps()) {
      this.clearOtherGdEmails('avisFermeture');
      this.avisFermetureCourriel.set(true);
    }
  }

  toggleAnnexeQCourriel() {
    const nextVal = !this.annexeQCourriel();
    if (nextVal) {
      this.clearOtherGdEmails('annexeQ');
    }
    this.annexeQCourriel.set(nextVal);
  }

  onAnnexeQAlphaChange(val: string) {
    this.annexeQAlphaPostulant.set(val);
    if (val && val.trim().length > 0) {
      this.clearOtherGdEmails('annexeQ');
      this.annexeQCourriel.set(true);
    }
  }

  autoActivateOffreEmail() {
    const isSub = this.selectedTask()?.nameFr.toLowerCase().includes('subventionn') || false;
    if (isSub) {
      if (!this.offreEtudesSubventionneesChecked()) {
        this.clearOtherGdEmails('offreEtudes');
        this.offreEtudesSubventionneesChecked.set(true);
        if (this.offreDateArriveeUnite() === '2026 au plus tard 16h00') {
          this.offreDateArriveeUnite.set('2025 au plus tard 16h00');
        }
      }
    } else {
      if (!this.offreNormaleChecked()) {
        this.clearOtherGdEmails('offreNormale');
        this.offreNormaleChecked.set(true);
        if (this.offreDateArriveeUnite() === '2025 au plus tard 16h00') {
          this.offreDateArriveeUnite.set('2026 au plus tard 16h00');
        }
      }
    }
  }

  setOffreProgrammeEnrolement(val: string) {
    this.offreProgrammeEnrolement.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  setOffreElement(val: string) {
    this.offreElement.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  setOffreDureeContrat(val: string) {
    this.offreDureeContrat.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

  setOffreEtudesSubventionnees(val: string) {
    this.offreEtudesSubventionnees.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

  setOffreDureeEtudesSubventionnees(val: string) {
    this.offreDureeEtudesSubventionnees.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  setOffreDateEnrolement(val: string) {
    this.offreDateEnrolement.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  setOffreDateArriveeUnite(val: string) {
    this.offreDateArriveeUnite.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  setOffreUniteAffectation(val: string) {
    this.offreUniteAffectation.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  setOffreUniteAffectationObj(unit: UnitSession) {
    this.offreUniteAffectation.set(unit.id);
    this.autoActivateOffreEmail();
  }

  setCourseSession(session: CourseSession) {
    this.offreSerieCours.set(session.serie);
    this.offreDateCoursDebut.set(session.dateDebut);
    this.offreDateCoursFin.set(session.dateFin);
    this.autoActivateOffreEmail();
  }

  clearCourseSession() {
    this.offreSerieCours.set('');
    this.offreDateCoursDebut.set('');
    this.offreDateCoursFin.set('');
  }

  setOffreDateCoursDebut(val: string) {
    this.offreDateCoursDebut.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  setOffreDateCoursFin(val: string) {
    this.offreDateCoursFin.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  setOffreDateElementsManquants(val: string) {
    this.offreDateElementsManquants.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  setOffreElementsManquants(val: string) {
    this.offreElementsManquants.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

  setNoteStatutCivil(val: string) {
    this.noteStatutCivil.set(val);
    this.autoActivateOffreEmail();
  }

  setNoteConjoint(val: string) {
    this.noteConjoint.set(val);
    this.autoActivateOffreEmail();
  }

  setNotePlaqueImm(val: string) {
    this.notePlaqueImm.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

  setNoteBrisBail(val: string) {
    this.noteBrisBail.set(val);
    this.autoActivateOffreEmail();
  }

  setNoteEntreposage(val: string) {
    this.noteEntreposage.set(val);
    this.autoActivateOffreEmail();
  }

  setNoteSermentDeclaration(val: string) {
    this.noteSermentDeclaration.set(val);
    this.autoActivateOffreEmail();
  }

  setNoteInviteMil(val: string) {
    this.noteInviteMil.set(val);
    this.autoActivateOffreEmail();
  }

  setNoteInviteMilTexte(val: string) {
    this.noteInviteMilTexte.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

  setNoteSvcMilAnt(val: string) {
    this.noteSvcMilAnt.set(val);
    this.autoActivateOffreEmail();
  }

  setNoteBeneficiaire(val: string) {
    this.noteBeneficiaire.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

  setNoteDateCourrielConfirmation(val: string) {
    this.noteDateCourrielConfirmation.set(val);
    if (val) this.autoActivateOffreEmail();
  }

  onRappelCeremonieDateSelected(date: string) {
    this.rappelCeremonieDate.set(date);
    if (date) {
      this.clearOtherGdEmails('rappelCeremonie');
      this.rappelCeremonieChecked.set(true);
    }
  }

  onRappelCeremonieHeurePostulantChange(val: string) {
    this.rappelCeremonieHeurePostulant.set(val);
    try {
      localStorage.setItem('rappel_heure_postulant', val);
    } catch {}
    this.clearOtherGdEmails('rappelCeremonie');
    this.rappelCeremonieChecked.set(true);
  }

  onRappelCeremonieHeureInvitesChange(val: string) {
    this.rappelCeremonieHeureInvites.set(val);
    try {
      localStorage.setItem('rappel_heure_invites', val);
    } catch {}
    this.clearOtherGdEmails('rappelCeremonie');
    this.rappelCeremonieChecked.set(true);
  }

  onRappelCeremonieLieuChange(val: string) {
    this.rappelCeremonieLieu.set(val);
    this.clearOtherGdEmails('rappelCeremonie');
    this.rappelCeremonieChecked.set(true);
  }

  toggleOffreNormale() {
    const nextVal = !this.offreNormaleChecked();
    if (nextVal) {
      this.clearOtherGdEmails('offreNormale');
      if (this.offreDateArriveeUnite() === '2025 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2026 au plus tard 16h00');
      }
    }
    this.offreNormaleChecked.set(nextVal);
  }

  toggleOffreEtudesSubventionnees() {
    const nextVal = !this.offreEtudesSubventionneesChecked();
    if (nextVal) {
      this.clearOtherGdEmails('offreEtudes');
      if (this.offreDateArriveeUnite() === '2026 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2025 au plus tard 16h00');
      }
      
      const metierText = this.offreMetier();
      const match = metierText.match(/^(\d{5})/);
      if (match) {
        const jobId = match[1];
        const job = this.jobService.getJobById(jobId);
        if (job && job.contracts) {
          const pfor = job.contracts.find(c => c.program.toUpperCase() === 'PFOR');
          if (pfor) {
            this.offreDureeContrat.set(pfor.duration);
          }
        }
      }
    }
    this.offreEtudesSubventionneesChecked.set(nextVal);
  }

  toggleRappelCeremonie() {
    const nextVal = !this.rappelCeremonieChecked();
    if (nextVal) {
      this.clearOtherGdEmails('rappelCeremonie');
    }
    this.rappelCeremonieChecked.set(nextVal);
  }

  // Computed Content Generators

  // Helper to structure selected rejections by Task -> Items
  private getStructuredRejections() {
    const selectedKeys = this.selectedRejectionKeys();
    const taskNotCompletedKeys = this.taskNotCompletedKeys();
    // Use Map to preserve insertion order of tasks
    const tasksMap = new Map<
      Task,
      { doc: DocumentItem; reason: RejectionReason }[]
    >();

    // Iterate over all tasks instead of only visible tasks to include minor check rejections
    for (const task of this.allTasks()) {
      const isVisible = this.visibleTasks().some(vt => vt.nameFr === task.nameFr);
      
      const hasRejections = task.documents.some(doc => 
        doc.reasons.some(reason => this.isReasonSelected(doc, reason))
      );
      const isNotCompleted = taskNotCompletedKeys.has(task.nameFr);

      if (!isVisible && !hasRejections && !isNotCompleted) {
        continue;
      }

      if (isNotCompleted) {
        tasksMap.set(task, []);
      }
      for (const doc of task.documents) {
        for (const reason of doc.reasons) {
          if (this.isReasonSelected(doc, reason)) {
            if (!tasksMap.has(task)) {
              tasksMap.set(task, []);
            }
            tasksMap.get(task)!.push({ doc, reason });
          }
        }
      }
    }
    return tasksMap;
  }

  getBigAceCompliantNoteClean(): string {
    const jobSlots = [
      { index: 1, job: this.getDossierJob(1), failedCe: this.sharedState.dossierJobFailedCe1() },
      { index: 2, job: this.getDossierJob(2), failedCe: this.sharedState.dossierJobFailedCe2() },
      { index: 3, job: this.getDossierJob(3), failedCe: this.sharedState.dossierJobFailedCe3() },
    ].filter((s): s is { index: number; job: JobEntry; failedCe: boolean } => !!s.job);

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
        } else if (this.isJobClosed(slot.job.id)) {
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

    return `${firstLine}\nQD complété, admissible. Webinaire CAF 101 à faire, tâche planifiez votre séance d'information des FAC 101 attribuée.`;
  }

  getBigAceCompliantNote(): string {
    let note = this.getBigAceCompliantNoteClean();
    if (this.triageMedicalRequis()) {
      note += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
    }
    return note;
  }

  getRejectionAndReminderNoteText(): string {
    if (this.selectedEmailBankTemplate() === "verification_edo_vs_pfor") {
      return "Courriel de vérification de programme EDO VS PFOR envoyé au postulant.";
    }

    const closureSuffix =
      " Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.";

    if (
      this.forceGeneralReminder() &&
      this.selectedRejectionKeys().size === 0
    ) {
      return (
        "Courriel de rappel de tâches envoyé au postulant." + closureSuffix
      );
    }

    const taskNotCompletedKeys = this.taskNotCompletedKeys();
    const notes: string[] = [];
    let hasNameMismatch = false;
    let hasNormalReassignment = false;

    for (const task of this.allTasks()) {
      const isVisible = this.visibleTasks().some(vt => vt.nameFr === task.nameFr);
      const isNotCompleted = taskNotCompletedKeys.has(task.nameFr);
      const hasRejections = task.documents.some(doc => 
        doc.reasons.some(reason => this.isReasonSelected(doc, reason))
      );

      if (!isVisible && !hasRejections && !isNotCompleted) {
        continue;
      }

      if (isNotCompleted) {
        notes.push(`Tâche "${task.nameFr}" non complétée`);
        hasNormalReassignment = true;
      }
      for (const doc of task.documents) {
        for (const reason of doc.reasons) {
          if (this.isReasonSelected(doc, reason)) {
            notes.push(reason.logNoteFr);
            if (reason.id === "emp_nom_parent") {
              hasNameMismatch = true;
            }
            if (!reason.isConfirmation) {
              hasNormalReassignment = true;
            }
          }
        }
      }
    }

    if (notes.length === 0) return "";

    const combinedReasons = notes.join(" / ");
    const prefix = "Étape 1 (en cours) - ";

    let noteTxt = "";

    if (this.isUnderAge()) {
      noteTxt = `${prefix}${combinedReasons}. En attente de la confirmation du consentement parental pour continuer le Big ACE.`;
    } else {
      if (hasNameMismatch) {
        noteTxt = `${prefix}${combinedReasons}.`;
      } else {
        if (hasNormalReassignment) {
          noteTxt = `${prefix}${combinedReasons}, la/les tâches réattribuées et courriel explicatif envoyé.`;
        } else {
          noteTxt = `${prefix}${combinedReasons}.`;
        }
      }
    }

    if (noteTxt) {
      noteTxt = noteTxt.trim();
      if (noteTxt.endsWith(".")) {
        noteTxt = noteTxt.slice(0, -1);
      }
      noteTxt += "." + closureSuffix;
    }

    return noteTxt;
  }

  generatedNote = computed(() => {
    const notes: string[] = [];

    // 0. Premier Contact Note
    if (this.isPremierContactActive()) {
      let msg = "Courriel de premier contact envoyé au postulant.";
      const tasks: string[] = [];
      if (this.premierContactMedical()) tasks.push("Médical");
      if (this.premierContactEntrevue()) tasks.push("Entrevue");
      if (this.premierContactGambit()) tasks.push("Gambit");
      if (this.premierContactPsps()) tasks.push("PSPS");
      if (this.premierContactSelfie()) tasks.push("Selfie");

      if (tasks.length > 0) {
        const tasksStr = tasks.length > 1 
          ? tasks.slice(0, -1).join(', ') + ' et ' + tasks[tasks.length - 1] 
          : tasks[0];
        
        const attrib = tasks.length > 1 
          ? 'attribués' 
          : (tasks[0] === 'Entrevue' ? 'attribuée' : 'attribué');
          
        msg += ` ${tasksStr} ${attrib}.`;
      }
      notes.push(msg);
    }

    // 0.5. Avis de fermeture Note
    if (this.isAvisFermetureActive()) {
      notes.push(`courriel d'avis de fermeture :\n\n${this.getAvisFermetureEmailPlain()}`);
    }

    // 0.6. Annexe Q Note
    if (this.isAnnexeQActive()) {
      notes.push(`Annexe Q prête à faire\nDocuments PSPS insérés dans CFRIM\nCourriel au CCM envoyé`);
    }

    // 1. Medical Evaluation Note
    if (this.isMedicalEvaluationActive()) {
      const medInfo = this.getMedicalPartsInfo();
      if (medInfo) {
        if (this.evaluationMedicaleType() === 'Dossier OTA') {
          notes.push(`Rendez-vous pour l'évaluation médicale - ${medInfo.labelFr} directement fixé au centre de recrutement de Montréal (Dossier OTA). Courriel d'information envoyé au postulant pour consultation des détails dans son portail.`);
        } else {
          notes.push(`Tâche « Évaluation médicale - ${medInfo.labelFr} » attribuée au postulant dans son portail. Courriel explicatif envoyé pour la sélection d'une plage horaire au centre de recrutement attitré.`);
        }
      }
    }

    // 2. Offre normale Note
    if (this.offreNormaleChecked()) {
      notes.push(this.getOfferFormattedNote());
    }

    // 3. Offre études subventionnées Note
    if (this.offreEtudesSubventionneesChecked()) {
      notes.push(this.getOfferFormattedNote());
    }

    // 3.5 Rappel cérémonie d'assermentation Note
    if (this.rappelCeremonieChecked()) {
      notes.push(`Transmission d'un courriel de rappel pour la cérémonie d'assermentation du ${this.rappelCeremonieDate() || '____'}.`);
    }

    // 4. All tasks compliant Note
    if (this.allTasksCompliant()) {
      notes.push(this.getBigAceCompliantNoteClean());
    }

    // 5. Rejection / Incomplete tasks / Reminder Note
    const rejectionNoteText = this.getRejectionAndReminderNoteText();
    if (rejectionNoteText) {
      notes.push(rejectionNoteText);
    }

    if (notes.length === 0) return "";

    let finalNote = notes.join("\n\n");

    if (this.triageMedicalRequis()) {
      finalNote += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
    }

    return finalNote;
  });

  displayedNote = computed(() => {
    if (this.sharedState.includeLinkedEmail() && this.sharedState.reoMergedNote()) {
      return this.sharedState.reoMergedNote();
    }
    return this.generatedNote();
  });

  // Check if current selection triggers a specific Email Scenario
  activeEmailScenario = computed<EmailScenario | null>(() => {
    if (this.selectedEmailBankTemplate() === "verification_edo_vs_pfor") {
      return this.emailScenariosService.getScenario("verification_edo_vs_pfor") || null;
    }

    if (
      this.forceGeneralReminder() &&
      this.selectedRejectionKeys().size === 0
    ) {
      return this.emailScenariosService.getScenario("general_reminder") || null;
    }

    const selectedKeys = this.selectedRejectionKeys();
    const keysArray = Array.from(selectedKeys) as string[];

    // Trigger for "File Closed due to Basic Academic Criteria"
    const fileClosedAcademics = keysArray.some((k) =>
      k.includes("educ_non_admissible"),
    );
    if (fileClosedAcademics) {
      return (
        this.emailScenariosService.getScenario("educ_non_admissible") || null
      );
    }

    // Trigger for "Parental Consent Required"
    // Checks for 'naiss_parents' (Birth Cert) OR 'emp_nom_parent' (Now in Consent Task)
    const needsParentalConsent = keysArray.some(
      (k) => k.includes("naiss_parents") || k.includes("emp_nom_parent"),
    );

    if (needsParentalConsent) {
      return (
        this.emailScenariosService.getScenario("parental_consent_required") ||
        null
      );
    }

    return null;
  });

  getCompliantEmailHtml(): string {
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;

    // --- FRENCH BLOCK ---
    html += `<p><strong>English message will follow.</strong></p>`;
    html += `<p>Bonjour,</p>`;
    html += `<p>Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.</p>`;
    html += `<p>Afin de pouvoir continuer votre processus, vous devrez <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">OBLIGATOIREMENT</span> :</p>`;
    
    html += `<p><strong>1-Vous informer :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    html += `  <li style="margin-bottom: 5px;">Regarder et comprendre le contenu de la présentation suivante : <a href="https://youtu.be/hYzMRYYBnag" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Présentation Forces 101</a></li>`;
    html += `  <li style="margin-bottom: 5px;">Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits <a href="https://forces.ca/fr/carrieres/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Carrières | Forces armées canadiennes</a></li>`;
    html += `  <li style="margin-bottom: 5px;">Explorer et bien comprendre la section <a href="https://forces.ca/fr/instruction-de-base/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Instruction de base</a> du site Forces.ca</li>`;
    html += `</ul>`;

    html += `<p><strong>2-Après avoir regardé la vidéo, Prendre rendez-vous pour une consultation via le calendrier de votre portail.</strong> <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Lien vers le Portail d'enrôlement des Forces armées canadiennes</a>&nbsp;<span style="background-color: #00FF00; padding: 0 4px; font-weight: 500;">De nouvelles plages horaires ouvriront d’ici 14 jours sur votre portail.</span></p>`;

    html += `<p>Cette consultation auprès d’un recruteur sera nécessaire afin de valider votre connaissance des professions militaires qui vous intéressent, de la nature du cours de qualification militaire de base (QMB) et des exigences que comporte un engagement au sein de la force régulière des Forces armées canadiennes. Cette consultation n’est pas une entrevue officielle. Lorsque votre dossier sera distribué à un gestionnaire de dossier, celui-ci vous attribuera une tâche pour prendre un rendez-vous avec un conseiller en carrière militaire et c’est avec ce conseiller que vous ferez votre entrevue officielle pour un emploie dans les forces armées canadienne.</p>`;

    html += `<p>Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.</p>`;
    html += `<p>Merci encore et au plaisir de votre faire votre connaissance.</p>`;

    html += `<p>` + this.sharedState.getHtmlSignatureFr() + `</p>`;

    html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;

    // --- ENGLISH BLOCK ---
    html += `<p>Hello,</p>`;
    html += `<p>Thank you very much for providing your documents and selecting your preferred occupation.</p>`;
    html += `<p>In order to continue your application process, You will be <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">REQUIRED</span> to:</p>`;

    html += `<p><strong>1- Inform yourself :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    html += `  <li style="margin-bottom: 5px;">Watch and understand the content of the following presentation: <a href="https://youtu.be/oKuX_ROtASw" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Forces 101 Presentation</a></li>`;
    html += `  <li style="margin-bottom: 5px;">Watch the video and review the description of the trade(s) you are registered for. <a href="https://forces.ca/en/careers/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Careers | Canadian Armed Forces</a></li>`;
    html += `  <li style="margin-bottom: 5px;">Explore and fully understand the <a href="https://forces.ca/en/basic-training/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Basic Training</a> section of the Forces.ca website.</li>`;
    html += `</ul>`;

    html += `<p><strong>2-After viewing the video, <span style="font-weight: bold;">Schedule an appointment</span> for a consultation through your portal calendar.</strong> <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Canadian Armed Forces enrolment Portal link</a>&nbsp;<span style="background-color: #00FF00; padding: 0 4px; font-weight: 500;">New time slots will open on your portal within 14 days.</span></p>`;

    html += `<p>This consultation with a recruiter will be required to validate your understanding of the military occupations that interest you, the nature of the Basic Military Qualification (BMQ), and the requirements associated with enrolling in the Regular Force of the Canadian Armed Forces. This consultation is not an official interview. Once your file has been assigned to a file administrator, you will be given a task to schedule an appointment with a Military Career Counsellor. It is with this counsellor that you will complete your official interview for employment with the Canadian Armed Forces.</p>`;

    html += `<p>If no action is taken, your file will be automatically deactivated after 30 days.</p>`;
    html += `<p>Thank you again, and we look forward to meeting you.</p>`;

    html += `<p>` + this.sharedState.getHtmlSignatureEn() + `</p>`;

    html += `</div>`;
    return html;
  }

  getCompliantEmailPlain(): string {
    let plain = "";

    // --- FRENCH ---
    plain += `English message will follow.\n\n`;
    plain += `Bonjour,\n\n`;
    plain += `Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.\n\n`;
    plain += `Afin de pouvoir continuer votre processus, vous devrez OBLIGATOIREMENT :\n\n`;
    plain += `1-Vous informer :\n`;
    plain += `•\tRegarder et comprendre le contenu de la présentation suivante : Présentation Forces 101 (https://youtu.be/hYzMRYYBnag)\n`;
    plain += `•\tRegarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits Carrières | Forces armées canadiennes (https://forces.ca/fr/carrieres/)\n`;
    plain += `•\tExplorer et bien comprendre la section Instruction de base du site Forces.ca (https://forces.ca/fr/instruction-de-base/)\n\n`;
    plain += `2-Après avoir regardé la vidéo, Prendre rendez-vous pour une consultation via le calendrier de votre portail. Lien vers le Portail d'enrôlement des Forces armées canadiennes (https://www.cafoap-pclfac.forces.gc.ca/) De nouvelles plages horaires ouvriront d’ici 14 jours sur votre portail.\n\n`;
    plain += `Cette consultation auprès d’un recruteur sera nécessaire afin de valider votre connaissance des professions militaires qui vous intéressent, de la nature du cours de qualification militaire de base (QMB) et des exigences que comporte un engagement au sein de la force régulière des Forces armées canadiennes. Cette consultation n’est pas une entrevue officielle. Lorsque votre dossier sera distribué à un gestionnaire de dossier, celui-ci vous attribuera une tâche pour prendre un rendez-vous avec un conseiller en carrière militaire et c’est avec ce conseiller que vous ferez votre entrevue officielle pour un emploie dans les forces armées canadienne.\n\n`;
    plain += `Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.\n\n`;
    plain += `Merci encore et au plaisir de votre faire votre connaissance.\n\n`;
    plain += this.sharedState.customSignatureFr();

    plain += `\n\n______________________________________________________________________________\n\n`;

    // --- ENGLISH ---
    plain += `Hello,\n\n`;
    plain += `Thank you very much for providing your documents and selecting your preferred occupation.\n\n`;
    plain += `In order to continue your application process, You will be REQUIRED to:\n\n`;
    plain += `1- Inform yourself :\n`;
    plain += `•\tWatch and understand the content of the following presentation: Forces 101 Presentation (https://youtu.be/oKuX_ROtASw)\n`;
    plain += `•\tWatch the video and review the description of the trade(s) you are registered for. Careers | Canadian Armed Forces (https://forces.ca/en/careers/)\n`;
    plain += `•\tExplore and fully understand the Basic Training section of the Forces.ca website (https://forces.ca/en/basic-training/)\n\n`;
    plain += `2-After viewing the video, Schedule an appointment for a consultation through your portal calendar. Canadian Armed Forces enrolment Portal link (https://www.cafoap-pclfac.forces.gc.ca/) New time slots will open on your portal within 14 days.\n\n`;
    plain += `This consultation with a recruiter will be required to validate your understanding of the military occupations that interest you, the nature of the Basic Military Qualification (BMQ), and the requirements associated with enrolling in the Regular Force of the Canadian Armed Forces. This consultation is not an official interview. Once your file has been assigned to a file administrator, you will be given a task to schedule an appointment with a Military Career Counsellor. It is with this counsellor that you will complete your official interview for employment with the Canadian Armed Forces.\n\n`;
    plain += `If no action is taken, your file will be automatically deactivated after 30 days.\n\n`;
    plain += `Thank you again, and we look forward to meeting you.\n\n`;
    plain += this.sharedState.customSignatureEn();

    return plain;
  }


  // Helper for generating dynamic lists
  private getElementsManquantsBlocks(lang: 'fr' | 'en' = 'fr'): {
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

  getOffreNormaleEmailPlain(): string {
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
    fr += this.getOffreLinksBlockPlain('fr');
    fr += "Pour toute autre question, n’hésitez pas à communiquer avec moi. \n\n\n";
    fr += "Merci, bonne journée\n\n";
    fr += this.sharedState.customSignatureFr();

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
    en += this.getOffreLinksBlockPlain('en');
    en += "If you have any further questions, please do not hesitate to contact me. \n\n\n";
    en += "Thank you, have a nice day\n\n";
    en += this.sharedState.customSignatureEn();

    return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

  private isConjointDeFaitSelected(): boolean {
    const st = (this.noteStatutCivil() || '').toLowerCase();
    return st.includes('conjoint');
  }

  getTeamsLinkPlainFr(): string {
    const city = this.offreLieuVille();
    if (city === 'Montréal') {
      return "Lien pour assister à la cérémonie par Teams : https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn\n\n\n";
    } else if (city === 'Québec') {
      return "Lien pour assister à la cérémonie par Teams : https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U\n\n\n";
    }
    return "\n\n";
  }

  getTeamsLinkPlainEn(): string {
    const city = this.offreLieuVille();
    if (city === 'Montréal') {
      return "Link to attend the ceremony via Teams: https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn\n\n\n";
    } else if (city === 'Québec') {
      return "Link to attend the ceremony via Teams: https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U\n\n\n";
    }
    return "\n\n";
  }

  getTeamsLinkHtmlFr(): string {
    const city = this.offreLieuVille();
    if (city === 'Montréal') {
      return `<p><strong>Lien pour assister à la cérémonie par Teams :</strong> <a href="https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn</a></p>`;
    } else if (city === 'Québec') {
      return `<p><strong>Lien pour assister à la cérémonie par Teams :</strong> <a href="https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U</a></p>`;
    }
    return "";
  }

  getTeamsLinkHtmlEn(): string {
    const city = this.offreLieuVille();
    if (city === 'Montréal') {
      return `<p><strong>Link to attend the ceremony via Teams:</strong> <a href="https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn</a></p>`;
    } else if (city === 'Québec') {
      return `<p><strong>Link to attend the ceremony via Teams:</strong> <a href="https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U</a></p>`;
    }
    return "";
  }

  getOffreLinksBlockPlain(lang: 'fr' | 'en'): string {
    const isConjoint = this.isConjointDeFaitSelected();
    const uniteNom = this.getUniteAffectationObj().nom;
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const isMontreal = this.offreLieuVille() === 'Montréal';
    const showTenueDeVille = isOta || isMontreal;
    const isUic3613 = this.isUic3613Selected();

    if (lang === 'fr') {
      let res = '';
      if (isUic3613) {
        if (isConjoint) {
          res += `Voici les liens vers vos instructions de ralliement, instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += "Instructions de ralliement (QMB) : https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf\n";
          res += "Instruction union de fait : https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf\n";
          res += "Demande de cote de sécurité (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf\n";
        } else {
          res += `Voici les liens vers vos instructions de ralliement et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += "Instructions de ralliement (QMB) : https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf\n";
          res += "Demande de cote de sécurité (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf\n";
        }
      } else {
        if (isConjoint) {
          res += `Voici les liens vers votre instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += "Instruction union de fait : https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf\n";
          res += "Demande de cote de sécurité (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf\n";
        } else {
          res += `Voici le lien vers votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += "Demande de cote de sécurité (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf\n";
        }
      }

      if (showTenueDeVille) {
        res += "Voici un exemples de tenue de ville, tenue vestimentaire pour la cérémonie : https://simontheriault8-cyber.github.io/Documents/Exemples - Tenue de ville.pdf\n";
      }
      res += "\n\n\n";
      return res;
    } else {
      let res = '';
      if (isUic3613) {
        if (isConjoint) {
          res += `Here are the links to your joining instructions, common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += "Joining Instructions (BMQ) : https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf\n";
          res += "Common-Law partnership instruction : https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf\n";
          res += "Security Screening Application (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf\n";
        } else {
          res += `Here are the links to your joining instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += "Joining Instructions (BMQ) : https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf\n";
          res += "Security Screening Application (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf\n";
        }
      } else {
        if (isConjoint) {
          res += `Here are the links to your common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += "Common-Law partnership instruction : https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf\n";
          res += "Security Screening Application (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf\n";
        } else {
          res += `Here is the link to your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += "Security Screening Application (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf\n";
        }
      }

      if (showTenueDeVille) {
        res += "Here is an example of business casual / dress code for the ceremony : https://simontheriault8-cyber.github.io/Documents/Exemples - Tenue de ville.pdf\n";
      }
      res += "\n\n\n";
      return res;
    }
  }

  getOffreLinksBlockHtml(lang: 'fr' | 'en'): string {
    const isConjoint = this.isConjointDeFaitSelected();
    const uniteNom = this.getUniteAffectationObj().nom;
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const isMontreal = this.offreLieuVille() === 'Montréal';
    const showTenueDeVille = isOta || isMontreal;
    const isUic3613 = this.isUic3613Selected();

    if (lang === 'fr') {
      let res = '<p>';
      if (isUic3613) {
        if (isConjoint) {
          res += `Voici les liens vers vos instructions de ralliement, instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instructions de ralliement (QMB)</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instruction union de fait</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        } else {
          res += `Voici les liens vers vos instructions de ralliement et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instructions de ralliement (QMB)</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        }
      } else {
        if (isConjoint) {
          res += `Voici les liens vers votre instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instruction union de fait</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        } else {
          res += `Voici le lien vers votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        }
      }

      if (showTenueDeVille) {
        res += `<br>Voici un exemples de tenue de ville, tenue vestimentaire pour la cérémonie : <a href="https://simontheriault8-cyber.github.io/Documents/Exemples - Tenue de ville.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Tenue de ville</a>`;
      }
      res += `</p>`;
      return res;
    } else {
      let res = '<p>';
      if (isUic3613) {
        if (isConjoint) {
          res += `Here are the links to your joining instructions, common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Joining Instructions (BMQ)</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Common-Law partnership instruction</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        } else {
          res += `Here are the links to your joining instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Joining Instructions (BMQ)</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        }
      } else {
        if (isConjoint) {
          res += `Here are the links to your common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Common-Law partnership instruction</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        } else {
          res += `Here is the link to your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        }
      }

      if (showTenueDeVille) {
        res += `<br>Here is an example of business casual / dress code for the ceremony : <a href="https://simontheriault8-cyber.github.io/Documents/Exemples - Tenue de ville.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Tenue de ville</a>`;
      }
      res += `</p>`;
      return res;
    }
  }

  getOffreNormaleEmailHtml(): string {
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

    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;

    // --- FRENCH BLOCK ---
    html += `<p><strong>English message will follow.</strong></p>`;
    html += `<p>Bonjour,</p>`;
    html += `<p>Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.</p>`;
    html += `<p>Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :</p>`;
    html += `<p><strong>Métier :</strong> ${metier}<br><strong>Programme d’enrôlement :</strong> ${prog}<br><strong>Élément :</strong> ${elem}</p>`;
    html += `<p><strong>Date d’enrôlement :</strong> ${dateEnrolFr}<br>`;
    html += `<strong>Lieu de l’enrôlement :</strong> ${lieuEnrolFr}<br>`;
    html += `<strong>Stationnement :</strong> Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.<br>`;
    html += this.getTeamsLinkHtmlFr();
    html += `<p><strong>Unité d’affectation :</strong> ${this.getUniteAffectationObj().nom}<br>${this.getUniteAffectationObj().adresseHtml}<br>`;
    html += `<strong>Date d’arrivée à votre unité :</strong> ${dateArrivee}`;
    if (hasCourseDates) {
      html += `<br><strong>Vos dates de cours :</strong> ${datesCours}`;
    }
    html += `</p>`;
    const { dateLimiteStr, elementsHtmlList } = this.getElementsManquantsBlocks('fr');
    html += `<p>Veuillez me faire parvenir les éléments suivant au plus tard le${dateLimiteStr} :</p>`;
    html += elementsHtmlList;
    html += this.getOffreLinksBlockHtml('fr');
    html += `<p>Pour toute autre question, n’hésitez pas à communiquer avec moi.</p>`;
    html += `<p>Merci, bonne journée</p>`;
    html += `<p>` + this.sharedState.getHtmlSignatureFr() + `</p>`;

    html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;

    // --- ENGLISH BLOCK ---
    html += `<p>Hello,</p>`;
    html += `<p>First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.</p>`;
    html += `<p>Below you will find the details of the job offer discussed today:</p>`;
    html += `<p><strong>Occupation:</strong> ${metier}<br><strong>Enrolment program:</strong> ${prog}<br><strong>Element:</strong> ${elem}</p>`;
    html += `<p><strong>Enrolment date:</strong> ${dateEnrolEn}<br>`;
    html += `<strong>Enrolment location:</strong> ${lieuEnrolEn}<br>`;
    html += `<strong>Parking:</strong> Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.<br>`;
    html += this.getTeamsLinkHtmlEn();
    html += `<p><strong>Posting unit:</strong> ${this.getUniteAffectationObj().nom}<br>${this.getUniteAffectationObj().adresseHtml}<br>`;
    html += `<strong>Arrival date at your unit:</strong> ${dateArrivee}`;
    if (hasCourseDates) {
      html += `<br><strong>Your course dates:</strong> ${datesCours}`;
    }
    html += `</p>`;
    const blocksHtmlEn = this.getElementsManquantsBlocks('en');
    html += `<p>Please send me the following items no later than${blocksHtmlEn.dateLimiteStr}:</p>`;
    html += blocksHtmlEn.elementsHtmlList;
    html += this.getOffreLinksBlockHtml('en');
    html += `<p>If you have any further questions, please do not hesitate to contact me.</p>`;
    html += `<p>Thank you, have a nice day</p>`;
    html += `<p>` + this.sharedState.getHtmlSignatureEn() + `</p>`;

    html += `</div>`;
    return html;
  }

  getOffreEtudesSubventionneesEmailPlain(): string {
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
    fr += this.getOffreLinksBlockPlain('fr');
    fr += "Pour toute autre question, n’hésitez pas à communiquer avec moi. \n\n\n";
    fr += "Cordialement,\n\n";
    fr += this.sharedState.customSignatureFr();

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
    en += this.getOffreLinksBlockPlain('en');
    en += "If you have any further questions, please do not hesitate to contact me. \n\n\n";
    en += "Sincerely,\n\n";
    en += this.sharedState.customSignatureEn();

    return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

  getOffreEtudesSubventionneesEmailHtml(): string {
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

    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;

    // --- FRENCH BLOCK ---
    html += `<p><strong>English message will follow.</strong></p>`;
    html += `<p>Bonjour,</p>`;
    html += `<p>Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.</p>`;
    html += `<p>Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :</p>`;
    html += `<p><strong>Métier :</strong> ${metier}<br><strong>Programme d’enrôlement :</strong> ${prog}<br><strong>Élément :</strong> ${elem}<br><strong>Durée du contrat :</strong> ${dureeContrat}<br><strong>Études subventionnées :</strong> ${etudesSub}<br><strong>Durée des études subventionnées :</strong> ${dureeEtudesSub}</p>`;
    html += `<p><strong>Date d’enrôlement :</strong> ${dateEnrolFr}<br>`;
    html += `<strong>Lieu de l’enrôlement :</strong> ${lieuEnrolFr}<br>`;
    html += `<strong>Stationnement :</strong> Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.<br>`;
    html += this.getTeamsLinkHtmlFr();
    html += `<p><strong>Unité d’affectation :</strong> ${this.getUniteAffectationObj().nom}<br>${this.getUniteAffectationObj().adresseHtml}<br>`;
    html += `<strong>Date d’arrivée à votre unité :</strong> ${dateArrivee}`;
    if (hasCourseDates) {
      html += `<br><strong>Vos dates de cours :</strong> ${datesCours}`;
    }
    html += `</p>`;
    const { dateLimiteStr, elementsHtmlList } = this.getElementsManquantsBlocks('fr');
    html += `<p>Veuillez prendre connaissance des documents joints au courriel et me retourner les documents suivants au plus tard le${dateLimiteStr} :</p>`;
    html += elementsHtmlList;
    html += this.getOffreLinksBlockHtml('fr');
    html += `<p>Pour toute autre question, n’hésitez pas à communiquer avec moi.</p>`;
    html += `<p>Cordialement,</p>`;
    html += `<p>` + this.sharedState.getHtmlSignatureFr() + `</p>`;

    html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;

    // --- ENGLISH BLOCK ---
    html += `<p>Hello,</p>`;
    html += `<p>First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.</p>`;
    html += `<p>Below you will find the details of the job offer discussed today:</p>`;
    html += `<p><strong>Occupation:</strong> ${metier}<br><strong>Enrolment program:</strong> ${prog}<br><strong>Element:</strong> ${elem}<br><strong>Contract duration:</strong> ${dureeContrat}<br><strong>Subsidized education:</strong> ${etudesSub}<br><strong>Subsidized education duration:</strong> ${dureeEtudesSub}</p>`;
    html += `<p><strong>Enrolment date:</strong> ${dateEnrolEn}<br>`;
    html += `<strong>Enrolment location:</strong> ${lieuEnrolEn}<br>`;
    html += `<strong>Parking:</strong> Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.<br>`;
    html += this.getTeamsLinkHtmlEn();
    html += `<p><strong>Posting unit:</strong> ${this.getUniteAffectationObj().nom}<br>${this.getUniteAffectationObj().adresseHtml}<br>`;
    html += `<strong>Arrival date at your unit:</strong> ${dateArrivee}`;
    if (hasCourseDates) {
      html += `<br><strong>Your course dates:</strong> ${datesCours}`;
    }
    html += `</p>`;
    const blocksHtmlSubEn = this.getElementsManquantsBlocks('en');
    html += `<p>Please review the documents attached to this email and return the following documents to me no later than${blocksHtmlSubEn.dateLimiteStr}:</p>`;
    html += blocksHtmlSubEn.elementsHtmlList;
    html += this.getOffreLinksBlockHtml('en');
    html += `<p>If you have any further questions, please do not hesitate to contact me.</p>`;
    html += `<p>Sincerely,</p>`;
    html += `<p>` + this.sharedState.getHtmlSignatureEn() + `</p>`;

    html += `</div>`;
    return html;
  }

  // --- CONSOLIDATED EMAIL LOGIC FOR MULTI-TASK SELECTION ---

  // Helper to extract plain text rejection body for French
  private getRejectionPlainBodyFr(): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0 && !this.forceGeneralReminder()) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || this.taskNotCompletedKeys().has(task.nameFr)) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    let emailFr = "";

    if (normalTasks.size > 0) {
      emailFr += `Nous avons procédé à l'évaluation de vos documents. Bien que votre dossier progresse, certains éléments ne sont pas conformes et nécessitent des corrections de votre part pour nous permettre de poursuivre le traitement.\n\nLes tâches suivantes vous ont été réattribuées :`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameFr = task.nameFr;
        emailFr += `\n\n• ${taskNameFr}`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
          emailFr += `\n    ◦ Vous n'avez pas complété cette tâche sur votre portail.`;
          emailFr += `\n      → Veuillez vous connecter à votre portail et la compléter.`;
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
          
          emailFr += `\n    ◦ ${doc.nameFr} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              emailFr += `\n      → ${item.reason.instructionFr.replace(/\n/g, "\n        ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n      🔗 ${item.reason.linkFr}`;
            }
          }
        }
      }
      emailFr += `\n\nEn raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées.\n\nRendez-vous sur votre portail pour les compléter : https://www.cafoap-pclfac.forces.gc.ca/`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        emailFr += `\n\nDe plus, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :`;
      } else {
        emailFr += `Afin de poursuivre le traitement de votre dossier, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :`;
      }
      for (const [task, items] of confirmationTasks.entries()) {
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
          
          emailFr += `\n\n• ${doc.nameFr} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              emailFr += `\n  → ${item.reason.instructionFr.replace(/\n/g, "\n    ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n  🔗 ${item.reason.linkFr}`;
            }
          }
        }
      }
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsFr = this.getDossierJobsSummaryTextFr();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        emailFr += `\n\n--------------------------------------------------`;
      }

      if (generalAddDocs.length > 0) {
        emailFr += `\n\nAfin de compléter l'évaluation de votre demande d'emploi, nous aurons besoin de document(s) supplémentaire(s) :`;
        for (const { doc, docItems } of generalAddDocs) {
          emailFr += `\n\n• ${doc.nameFr}`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              emailFr += `\n  → ${item.reason.instructionFr.replace(/\n/g, "\n    ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n  🔗 ${item.reason.linkFr}`;
            }
          }
        }
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapFr = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, true);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapFr.set(job, reqs);
        }
      }

      if (jobDocsMapFr.size > 0) {
        const selectedJobsFr = Array.from(jobDocsMapFr.keys()).map(j => `${j.title} (${j.id})`).join(', ');
        const jobsHeaderTextFr = selectedJobsFr || dossierJobsFr;
        emailFr += `\n\nAfin d'évaluer votre dossier pour le(s) métier(s) sélectionné(s) (${jobsHeaderTextFr}), vous devez nous fournir le(s) document(s) supplémentaire(s) suivant(s) ou une(des) preuve(s) que vous remplissez la(les) condition(s) suivante(s) en réponse directe à ce courriel :`;
        for (const [job, reqs] of jobDocsMapFr.entries()) {
          emailFr += `\n\n• Pour ${job.id} - ${job.title} : ` + reqs.join(", ");
        }
      }
    }

    if (this.forceGeneralReminder()) {
      emailFr += `\n\nVeuillez également vous assurer de compléter les autres tâches manquantes sur votre portail.`;
    }

    emailFr += `\n\nSi vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.`;

    return emailFr;
  }

  // Helper to extract plain text rejection body for English
  private getRejectionPlainBodyEn(): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0 && !this.forceGeneralReminder()) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || this.taskNotCompletedKeys().has(task.nameFr)) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    let emailEn = "";

    if (normalTasks.size > 0) {
      emailEn += `We have evaluated your documents. While your application is progressing, some items are not compliant and require corrections on your part to allow us to continue processing.\n\nThe following tasks have been reassigned to you:`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameEn = task.nameEn;
        emailEn += `\n\n• ${taskNameEn}`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
          emailEn += `\n    ◦ You have not completed this task on your portal.`;
          emailEn += `\n      → Please log in to your portal and complete it.`;
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
          
          emailEn += `\n    ◦ ${doc.nameEn} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              emailEn += `\n      → ${item.reason.instructionEn.replace(/\n/g, "\n        ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n      🔗 ${item.reason.linkEn}`;
            }
          }
        }
      }
      emailEn += `\n\nDue to the high volume of applications, we must prioritize the processing of files where all tasks are complete.\n\nPlease log in to your portal to complete them: https://www.cafoap-pclfac.forces.gc.ca/`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        emailEn += `\n\nFurthermore, we require confirmation from you. Please reply directly to this email with the requested information for the following item:`;
      } else {
        emailEn += `To continue processing your application, we require confirmation from you. Please reply directly to this email with the requested information for the following item:`;
      }
      for (const [task, items] of confirmationTasks.entries()) {
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
          
          emailEn += `\n\n• ${doc.nameEn} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              emailEn += `\n  → ${item.reason.instructionEn.replace(/\n/g, "\n    ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n  🔗 ${item.reason.linkEn}`;
            }
          }
        }
      }
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsEn = this.getDossierJobsSummaryTextEn();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        emailEn += `\n\n--------------------------------------------------`;
      }

      if (generalAddDocs.length > 0) {
        emailEn += `\n\nIn order to complete the evaluation of your employment application, we will need additional document(s):`;
        for (const { doc, docItems } of generalAddDocs) {
          emailEn += `\n\n• ${doc.nameEn}`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              emailEn += `\n  → ${item.reason.instructionEn.replace(/\n/g, "\n    ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n  🔗 ${item.reason.linkEn}`;
            }
          }
        }
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapEn = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, false);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapEn.set(job, reqs);
        }
      }

      if (jobDocsMapEn.size > 0) {
        const selectedJobsEn = Array.from(jobDocsMapEn.keys()).map(j => `${j.titleEn || j.title} (${j.id})`).join(', ');
        const jobsHeaderTextEn = selectedJobsEn || dossierJobsEn;
        emailEn += `\n\nIn order to evaluate your application for the selected occupation(s) (${jobsHeaderTextEn}), you must provide us with the following additional document(s) or proof that you meet the following condition(s) in direct reply to this email:`;
        for (const [job, reqs] of jobDocsMapEn.entries()) {
          emailEn += `\n\n• For ${job.id} - ${job.titleEn || job.title} : ` + reqs.join(", ");
        }
      }
    }

    if (this.forceGeneralReminder()) {
      emailEn += `\n\nPlease also ensure that you complete the other missing tasks on your portal.`;
    }

    emailEn += `\n\nIf you take no action, your file will be automatically deactivated after 30 days.`;

    return emailEn;
  }

  getRappelCeremonieAddress(): string {
    const city = this.rappelCeremonieLieu();
    const center = this.recruitmentCentersList.find(c => c.city === city);
    return center ? center.address : 'Adresse du centre';
  }

  getRappelCeremonieSectionPlainFr(): string {
    const address = this.getRappelCeremonieAddress();
    const date = this.rappelCeremonieDate() || '___________________';

    return `Bonjour,\n\nCe message est un rappel pour votre cérémonie d'assermentation.\n\nDate : ${date}\nHeure : ${this.rappelCeremonieHeurePostulant()} - veuillez arriver 15 minutes à l'avance\nLieu : ${address}\nHeure d'arrivée des invités : ${this.rappelCeremonieHeureInvites()}\n\nVous aurez droit à 2 invités sur place.\nLien pour assister à la cérémonie par Teams : \n\nVeuillez apporter une pièce d'identité valide avec photo (ex: permis de conduire, carte d'assurance maladie, etc).\nVous trouverez ci-joint vos instructions de ralliement et d'autres informations supplémentaires sur vos qualifications militaires de base.\n\nSi jamais vous êtes dans l'impossibilité de vous présenter, veuillez-nous en aviser le plus rapidement possible en répondant à ce courriel.\nSi vous ne vous présentez pas sans nous en aviser, vous risquez la fermeture de votre dossier.\n\nSi vous avez des questions, n'hésitez pas à me faire suivre un courriel.\n\nMerci, bonne journée !`;
  }

  getRappelCeremonieSectionPlainEn(): string {
    const address = this.getRappelCeremonieAddress();
    const date = this.rappelCeremonieDate() || '___________________';

    return `Hello,\n\nThis message is a reminder for your swearing-in ceremony.\n\nDate: ${date}\nTime: ${this.rappelCeremonieHeurePostulant()} - please arrive 15 minutes in advance\nLocation: ${address}\nGuest arrival time: ${this.rappelCeremonieHeureInvites()}\n\nYou will be allowed 2 guests on site.\nLink to attend the ceremony via Teams: \n\nPlease bring a valid photo ID (e.g. driver's licence, health insurance card, etc.).\nAttached you will find your joining instructions and additional information regarding your basic military qualifications.\n\nIf you are unable to attend, please notify us as soon as possible by replying to this email.\nIf you fail to attend without notifying us, you risk having your file closed.\n\nIf you have any questions, please do not hesitate to email me.\n\nThank you, have a nice day!`;
  }

  getRappelCeremonieSectionHtmlFr(): string {
    const address = this.getRappelCeremonieAddress();
    const date = this.rappelCeremonieDate() || '___________________';

    return `<p>Bonjour,</p>
<p>Ce message est un rappel pour votre cérémonie d'assermentation.</p>
<ul style="margin-top: 10px; margin-bottom: 15px; padding-left: 20px;">
  <li><strong>Date :</strong> ${date}</li>
  <li><strong>Heure :</strong> ${this.rappelCeremonieHeurePostulant()} - veuillez arriver 15 minutes à l'avance</li>
  <li><strong>Lieu :</strong> ${address}</li>
  <li><strong>Heure d'arrivée des invités :</strong> ${this.rappelCeremonieHeureInvites()}</li>
</ul>
<p>Vous aurez droit à 2 invités sur place.<br>
Lien pour assister à la cérémonie par Teams : </p>
<p>Veuillez apporter une pièce d'identité valide avec photo (ex: permis de conduire, carte d'assurance maladie, etc).</p>
<p>Vous trouverez ci-joint vos instructions de ralliement et d'autres informations supplémentaires sur vos qualifications militaires de base.</p>
<p>Si jamais vous êtes dans l'impossibilité de vous présenter, veuillez-nous en aviser le plus rapidement possible en répondant à ce courriel.<br>
Si vous ne vous présentez pas sans nous en aviser, vous risquez la fermeture de votre dossier.</p>
<p>Si vous avez des questions, n'hésitez pas à me faire suivre un courriel.</p>
<p>Merci, bonne journée !</p>`;
  }

  getRappelCeremonieSectionHtmlEn(): string {
    const address = this.getRappelCeremonieAddress();
    const date = this.rappelCeremonieDate() || '___________________';

    return `<p>Hello,</p>
<p>This message is a reminder for your swearing-in ceremony.</p>
<ul style="margin-top: 10px; margin-bottom: 15px; padding-left: 20px;">
  <li><strong>Date:</strong> ${date}</li>
  <li><strong>Time:</strong> ${this.rappelCeremonieHeurePostulant()} - please arrive 15 minutes in advance</li>
  <li><strong>Location:</strong> ${address}</li>
  <li><strong>Guest arrival time:</strong> ${this.rappelCeremonieHeureInvites()}</li>
</ul>
<p>You will be allowed 2 guests on site.<br>
Link to attend the ceremony via Teams: </p>
<p>Please bring a valid photo ID (e.g. driver's licence, health insurance card, etc.).</p>
<p>Attached you will find your joining instructions and additional information regarding your basic military qualifications.</p>
<p>If you are unable to attend, please notify us as soon as possible by replying to this email.<br>
If you fail to attend without notifying us, you risk having your file closed.</p>
<p>If you have any questions, please do not hesitate to email me.</p>
<p>Thank you, have a nice day!</p>`;
  }

  getRappelCeremonieEmailPlain(): string {
    const fr = this.getRappelCeremonieSectionPlainFr();
    const en = this.getRappelCeremonieSectionPlainEn();
    const sigFr = this.sharedState.customSignatureFr();
    const sigEn = this.sharedState.customSignatureEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getRappelCeremonieEmailHtml(): string {
    const fr = this.getRappelCeremonieSectionHtmlFr();
    const en = this.getRappelCeremonieSectionHtmlEn();
    const sigFr = this.sharedState.getHtmlSignatureFr();
    const sigEn = this.sharedState.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    html += `<p><strong>English message will follow.</strong></p>`;
    html += fr;
    html += `<p>${sigFr}</p>`;
    html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
    html += en;
    html += `<p>${sigEn}</p>`;
    html += `</div>`;
    return html;
  }

  // Consolidated Plain Text Email
  getCombinedPlainString(): string {
    if (this.sharedState.includeLinkedEmail() && this.sharedState.reoMergedEmailPlain()) {
      return this.sharedState.reoMergedEmailPlain();
    }

    const scenario = this.activeEmailScenario();
    if (scenario && (scenario.id === "verification_edo_vs_pfor" || (!this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()))) {
      return this.sharedState.getCustomizedScenarioText(scenario.bodyText);
    }

    // Standalone full emails if selected alone
    if (this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getPremierContactEmailPlain();
    }

    if (this.isAvisFermetureActive() && !this.isPremierContactActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getAvisFermetureEmailPlain();
    }

    if (this.isAnnexeQActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getAnnexeQEmailPlain();
    }

    if (this.offreNormaleChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.hasSelectedRejections()) {
      return this.getOffreNormaleEmailPlain();
    }

    if (this.offreEtudesSubventionneesChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.hasSelectedRejections() && !this.rappelCeremonieChecked()) {
      return this.getOffreEtudesSubventionneesEmailPlain();
    }

    if (this.rappelCeremonieChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getRappelCeremonieEmailPlain();
    }

    if (this.allTasksCompliant() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections() && !this.rappelCeremonieChecked()) {
      return this.getCompliantEmailPlain();
    }

    const frBlocks: string[] = [];
    const enBlocks: string[] = [];

    // 0. Premier contact
    if (this.isPremierContactActive()) {
      frBlocks.push(this.getPremierContactSectionPlainFr());
      enBlocks.push(this.getPremierContactSectionPlainEn());
    }

    // 0.5 Avis de fermeture
    if (this.isAvisFermetureActive()) {
      frBlocks.push(this.getAvisFermetureSectionPlainFr());
      enBlocks.push(this.getAvisFermetureSectionPlainEn());
    }

    // 0.6 Annexe Q
    if (this.isAnnexeQActive()) {
      frBlocks.push(this.getAnnexeQSectionPlainFr());
      enBlocks.push(this.getAnnexeQSectionPlainEn());
    }

    // 1. Medical Evaluation
    if (this.isMedicalEvaluationActive()) {
      const medInfo = this.getMedicalPartsInfo();
      if (medInfo) {
        frBlocks.push(this.getMedicalSectionPlainFr(medInfo.labelFr));
        enBlocks.push(this.getMedicalSectionPlainEn(medInfo.labelEn));
      }
    }

    // 2. Offre normale
    if (this.offreNormaleChecked()) {
      frBlocks.push(this.getOffreNormaleEmailPlain());
    }

    // 3. Offre études subventionnées
    if (this.offreEtudesSubventionneesChecked()) {
      frBlocks.push(this.getOffreEtudesSubventionneesEmailPlain());
    }

    // 3.5 Rappel cérémonie d'assermentation
    if (this.rappelCeremonieChecked()) {
      frBlocks.push(this.getRappelCeremonieSectionPlainFr());
      enBlocks.push(this.getRappelCeremonieSectionPlainEn());
    }

    // 4. All tasks compliant
    if (this.allTasksCompliant()) {
      frBlocks.push(this.getCompliantEmailPlain());
    }

    // 5. Rejection / Incomplete tasks / Reminder
    if (this.hasSelectedRejections() || (this.forceGeneralReminder() && this.selectedRejectionKeys().size === 0)) {
      const rejFr = this.getRejectionPlainBodyFr();
      const rejEn = this.getRejectionPlainBodyEn();
      if (rejFr) frBlocks.push(rejFr);
      if (rejEn) enBlocks.push(rejEn);
    }

    if (frBlocks.length === 0) return "";

    let plain = `English message will follow.\n\nBonjour,\n\n`;
    plain += frBlocks.join("\n\n--------------------------------------------------\n\n");
    plain += `\n\n` + this.sharedState.customSignatureFr();

    plain += `\n\n______________________________________________________________________________\n\nHello,\n\n`;
    plain += enBlocks.join("\n\n--------------------------------------------------\n\n");
    plain += `\n\n` + this.sharedState.customSignatureEn();

    return plain;
  }

  // Plain Text Version (for fallback)
  generatedEmailPlain = computed(() => {
    return this.getCombinedPlainString();
  });

  private oldUnusedGeneratedEmailPlainBody(): string {
    if (this.offreNormaleChecked()) {
      return this.getOffreNormaleEmailPlain();
    }
    if (this.offreEtudesSubventionneesChecked()) {
      return this.getOffreEtudesSubventionneesEmailPlain();
    }

    if (this.allTasksCompliant()) {
      return this.getCompliantEmailPlain();
    }

    // 1. Check if scenario is active
    const scenario = this.activeEmailScenario();
    if (scenario) {
      return this.sharedState.getCustomizedScenarioText(scenario.bodyText);
    }

    // 2. Default Logic
    const structure = this.getStructuredRejections();
    if (structure.size === 0) return "";

    const normalTasks = new Map<
      Task,
      { doc: DocumentItem; reason: RejectionReason }[]
    >();
    const confirmationTasks = new Map<
      Task,
      { doc: DocumentItem; reason: RejectionReason }[]
    >();
    const additionalDocTasks = new Map<
      Task,
      { doc: DocumentItem; reason: RejectionReason }[]
    >();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (
        normalItems.length > 0 ||
        this.taskNotCompletedKeys().has(task.nameFr)
      ) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    let emailFr = `English message will follow.\n\nBonjour,`;

    if (normalTasks.size > 0) {
      emailFr += `\n\nNous avons procédé à l'évaluation de vos documents. Bien que votre dossier progresse, certains éléments ne sont pas conformes et nécessitent des corrections de votre part pour nous permettre de poursuivre le traitement.\n\nLes tâches suivantes vous ont été réattribuées :`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameFr = task.nameFr;
        emailFr += `\n\n• ${taskNameFr}`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
          emailFr += `\n    ◦ Vous n'avez pas complété cette tâche sur votre portail.`;
          emailFr += `\n      → Veuillez vous connecter à votre portail et la compléter.`;
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
          
          emailFr += `\n    ◦ ${doc.nameFr} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              emailFr += `\n      → ${item.reason.instructionFr.replace(/\n/g, "\n        ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n      🔗 ${item.reason.linkFr}`;
            }
          }
          
        }
      }
      emailFr += `\n\nEn raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées.\n\nRendez-vous sur votre portail pour les compléter : https://www.cafoap-pclfac.forces.gc.ca/`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        emailFr += `\n\nDe plus, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :`;
      } else {
        emailFr += `\n\nAfin de poursuivre le traitement de votre dossier, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :`;
      }
      for (const [task, items] of confirmationTasks.entries()) {
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
          
          emailFr += `\n\n• ${doc.nameFr} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              emailFr += `\n  → ${item.reason.instructionFr.replace(/\n/g, "\n    ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n  🔗 ${item.reason.linkFr}`;
            }
          }
          
        }
      }
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsFr = this.getDossierJobsSummaryTextFr();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        emailFr += `\n\n--------------------------------------------------`;
      }

      if (generalAddDocs.length > 0) {
        emailFr += `\n\nAfin de compléter l'évaluation de votre demande d'emploi, nous aurons besoin de document(s) supplémentaire(s) :`;
        for (const { doc, docItems } of generalAddDocs) {
          emailFr += `\n\n• ${doc.nameFr}`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              emailFr += `\n  → ${item.reason.instructionFr.replace(/\n/g, "\n    ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n  🔗 ${item.reason.linkFr}`;
            }
          }
        }
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapFr = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, true);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapFr.set(job, reqs);
        }
      }

      if (jobDocsMapFr.size > 0) {
        const selectedJobsFr = Array.from(jobDocsMapFr.keys()).map(j => `${j.title} (${j.id})`).join(', ');
        const jobsHeaderTextFr = selectedJobsFr || dossierJobsFr;
        emailFr += `\n\nAfin d'évaluer votre dossier pour le(s) métier(s) sélectionné(s) (${jobsHeaderTextFr}), vous devez nous fournir le(s) document(s) supplémentaire(s) suivant(s) ou une(des) preuve(s) que vous remplissez la(les) condition(s) suivante(s) en réponse directe à ce courriel :`;
        for (const [job, reqs] of jobDocsMapFr.entries()) {
          emailFr += `\n\n• Pour ${job.id} - ${job.title} : ` + reqs.join(", ");
        }
      }
    }

    if (this.forceGeneralReminder()) {
      emailFr += `\n\nVeuillez également vous assurer de compléter les autres tâches manquantes sur votre portail.`;
    }

    emailFr += `\n\nSi vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.`;
    emailFr += `\n\n` + this.sharedState.customSignatureFr();

    // English Part
    let emailEn = `Hello,`;

    if (normalTasks.size > 0) {
      emailEn += `\n\nWe have evaluated your documents. While your application is progressing, some items are not compliant and require corrections on your part to allow us to continue processing.\n\nThe following tasks have been reassigned to you:`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameEn = task.nameEn;
        emailEn += `\n\n• ${taskNameEn}`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
          emailEn += `\n    ◦ You have not completed this task on your portal.`;
          emailEn += `\n      → Please log in to your portal and complete it.`;
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
          
          emailEn += `\n    ◦ ${doc.nameEn} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              emailEn += `\n      → ${item.reason.instructionEn.replace(/\n/g, "\n        ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n      🔗 ${item.reason.linkEn}`;
            }
          }
          
        }
      }
      emailEn += `\n\nDue to the high volume of applications, we must prioritize the processing of files where all tasks are complete.\n\nPlease log in to your portal to complete them: https://www.cafoap-pclfac.forces.gc.ca/`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        emailEn += `\n\nFurthermore, we require confirmation from you. Please reply directly to this email with the requested information for the following item:`;
      } else {
        emailEn += `\n\nTo continue processing your application, we require confirmation from you. Please reply directly to this email with the requested information for the following item:`;
      }
      for (const [task, items] of confirmationTasks.entries()) {
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
          
          emailEn += `\n\n• ${doc.nameEn} : ${labelsStr}`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              emailEn += `\n  → ${item.reason.instructionEn.replace(/\n/g, "\n    ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n  🔗 ${item.reason.linkEn}`;
            }
          }
          
        }
      }
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsEn = this.getDossierJobsSummaryTextEn();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        emailEn += `\n\n--------------------------------------------------`;
      }

      if (generalAddDocs.length > 0) {
        emailEn += `\n\nIn order to complete the evaluation of your employment application, we will need additional document(s):`;
        for (const { doc, docItems } of generalAddDocs) {
          emailEn += `\n\n• ${doc.nameEn}`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              emailEn += `\n  → ${item.reason.instructionEn.replace(/\n/g, "\n    ")}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n  🔗 ${item.reason.linkEn}`;
            }
          }
        }
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapEn = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, false);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapEn.set(job, reqs);
        }
      }

      if (jobDocsMapEn.size > 0) {
        const selectedJobsEn = Array.from(jobDocsMapEn.keys()).map(j => `${j.titleEn || j.title} (${j.id})`).join(', ');
        const jobsHeaderTextEn = selectedJobsEn || dossierJobsEn;
        emailEn += `\n\nIn order to evaluate your application for the selected occupation(s) (${jobsHeaderTextEn}), you must provide us with the following additional document(s) or proof that you meet the following condition(s) in direct reply to this email:`;
        for (const [job, reqs] of jobDocsMapEn.entries()) {
          emailEn += `\n\n• For ${job.id} - ${job.titleEn || job.title} : ` + reqs.join(", ");
        }
      }
    }

    if (this.forceGeneralReminder()) {
      emailEn += `\n\nPlease also ensure that you complete the other missing tasks on your portal.`;
    }

    emailEn += `\n\nIf you take no action, your file will be automatically deactivated after 30 days.`;
    emailEn += `\n\n` + this.sharedState.customSignatureEn();

    return `${emailFr}\n\n______________________________________________________________________________\n\n${emailEn}`;
  }

  getCombinedRawHtmlString(): string {
    if (this.sharedState.includeLinkedEmail() && this.sharedState.reoMergedEmailHtml()) {
      return this.sharedState.reoMergedEmailHtml();
    }

    const scenario = this.activeEmailScenario();
    if (scenario && (scenario.id === "verification_edo_vs_pfor" || (!this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()))) {
      return this.sharedState.getCustomizedScenarioHtml(scenario.bodyHtml);
    }

    // Standalone full emails if selected alone
    if (this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getPremierContactEmailHtml();
    }

    if (this.isAvisFermetureActive() && !this.isPremierContactActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getAvisFermetureEmailHtml();
    }

    if (this.isAnnexeQActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getAnnexeQEmailHtml();
    }

    if (this.offreNormaleChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.hasSelectedRejections()) {
      return this.getOffreNormaleEmailHtml();
    }

    if (this.offreEtudesSubventionneesChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.hasSelectedRejections() && !this.rappelCeremonieChecked()) {
      return this.getOffreEtudesSubventionneesEmailHtml();
    }

    if (this.rappelCeremonieChecked() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections()) {
      return this.getRappelCeremonieEmailHtml();
    }

    if (this.allTasksCompliant() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections() && !this.rappelCeremonieChecked()) {
      return this.getCompliantEmailHtml();
    }

    const frSections: string[] = [];
    const enSections: string[] = [];

    // 0. Premier contact
    if (this.isPremierContactActive()) {
      frSections.push(this.getPremierContactSectionHtmlFr());
      enSections.push(this.getPremierContactSectionHtmlEn());
    }

    // 0.5 Avis de fermeture
    if (this.isAvisFermetureActive()) {
      frSections.push(this.getAvisFermetureSectionHtmlFr());
      enSections.push(this.getAvisFermetureSectionHtmlEn());
    }

    // 0.6 Annexe Q
    if (this.isAnnexeQActive()) {
      frSections.push(this.getAnnexeQSectionHtmlFr());
      enSections.push(this.getAnnexeQSectionHtmlEn());
    }

    // 1. Medical Evaluation
    if (this.isMedicalEvaluationActive()) {
      const medInfo = this.getMedicalPartsInfo();
      if (medInfo) {
        frSections.push(this.getMedicalSectionHtmlFr(medInfo.labelFr));
        enSections.push(this.getMedicalSectionHtmlEn(medInfo.labelEn));
      }
    }

    // 2. Offre normale
    if (this.offreNormaleChecked()) {
      frSections.push(this.getOffreNormaleEmailHtml());
    }

    // 3. Offre études subventionnées
    if (this.offreEtudesSubventionneesChecked()) {
      frSections.push(this.getOffreEtudesSubventionneesEmailHtml());
    }

    // 3.5 Rappel cérémonie d'assermentation
    if (this.rappelCeremonieChecked()) {
      frSections.push(this.getRappelCeremonieSectionHtmlFr());
      enSections.push(this.getRappelCeremonieSectionHtmlEn());
    }

    // 4. All tasks compliant
    if (this.allTasksCompliant()) {
      frSections.push(this.getCompliantEmailHtml());
    }

    // 5. Rejections / Incomplete tasks / Reminder
    if (this.hasSelectedRejections() || (this.forceGeneralReminder() && this.selectedRejectionKeys().size === 0)) {
      const rejFr = this.getRejectionHtmlFr();
      const rejEn = this.getRejectionHtmlEn();
      if (rejFr) frSections.push(rejFr);
      if (rejEn) enSections.push(rejEn);
    }

    if (frSections.length === 0) return "";

    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    html += `<p>English message will follow.</p><p>Bonjour,</p>`;
    html += frSections.join('<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 20px 0;">');
    html += `<p>` + this.sharedState.getHtmlSignatureFr() + `</p>`;

    html += `<hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><p>Hello,</p>`;
    html += enSections.join('<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 20px 0;">');
    html += `<p>` + this.sharedState.getHtmlSignatureEn() + `</p>`;

    html += `</div>`;
    return html;
  }

  // HTML Version (for rich text display and Copy/Paste)
  generatedEmailHtml = computed((): SafeHtml => {
    const rawHtml = this.getCombinedRawHtmlString();
    return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  });

  getRejectionHtmlFr(): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0 && !this.forceGeneralReminder()) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || this.taskNotCompletedKeys().has(task.nameFr)) {
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
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
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
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
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
      html += `<p>En raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées.</p>`;
      html += `<p>Rendez-vous sur votre portail pour les compléter : <a href="https://www.cafoap-pclfac.forces.gc.ca/">https://www.cafoap-pclfac.forces.gc.ca/</a></p>`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        html += `<p>De plus, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :</p>`;
      } else {
        html += `<p>Afin de poursuivre le traitement de votre dossier, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :</p>`;
      }
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of confirmationTasks.entries()) {
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
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
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
      }
      html += `</ul>`;
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsFr = this.getDossierJobsSummaryTextFr();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        html += `<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 15px 0;">`;
      }

      if (generalAddDocs.length > 0) {
        html += `<p>Afin de compléter l'évaluation de votre demande d'emploi, nous aurons besoin de document(s) supplémentaire(s) :</p>`;
        html += `<ul style="margin-top: 0; padding-left: 20px;">`;
        for (const { doc, docItems } of generalAddDocs) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameFr}</strong></span>`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
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
        html += `</ul>`;
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapFr = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, true);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapFr.set(job, reqs);
        }
      }

      if (jobDocsMapFr.size > 0) {
        const selectedJobsFr = Array.from(jobDocsMapFr.keys()).map(j => `${j.title} (${j.id})`).join(', ');
        const jobsHeaderTextFr = selectedJobsFr || dossierJobsFr;
        html += `<p style="margin-top: 15px; font-weight: bold; color: #000000;">Afin d'évaluer votre dossier pour le(s) métier(s) sélectionné(s) (${jobsHeaderTextFr}), vous devez nous fournir le(s) document(s) supplémentaire(s) suivant(s) ou une(des) preuve(s) que vous remplissez la(les) condition(s) suivante(s) en réponse directe à ce courriel :</p>`;
        html += `<ul style="margin-top: 5px; list-style-type: disc; padding-left: 20px;">`;
        for (const [job, reqs] of jobDocsMapFr.entries()) {
          html += `<li style="margin-bottom: 8px;"><strong>Pour ${job.id} - ${job.title} :</strong> <span style="background-color: yellow; padding: 0 2px;">` + reqs.join(", ") + `</span></li>`;
        }
        html += `</ul>`;
      }
    }

    if (this.forceGeneralReminder()) {
      html += `<p>Veuillez également vous assurer de compléter les autres tâches manquantes sur votre portail.</p>`;
    }

    html += `<p><strong>Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.</strong></p>`;

    return html;
  }

  getRejectionHtmlEn(): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0 && !this.forceGeneralReminder()) return "";

    const normalTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const confirmationTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();
    const additionalDocTasks = new Map<Task, { doc: DocumentItem; reason: RejectionReason }[]>();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (normalItems.length > 0 || this.taskNotCompletedKeys().has(task.nameFr)) {
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
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
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
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
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
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
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
      }
      html += `</ul>`;
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsEn = this.getDossierJobsSummaryTextEn();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        html += `<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 15px 0;">`;
      }

      if (generalAddDocs.length > 0) {
        html += `<p>In order to complete the evaluation of your employment application, we will need additional document(s):</p>`;
        html += `<ul style="margin-top: 0; padding-left: 20px;">`;
        for (const { doc, docItems } of generalAddDocs) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameEn}</strong></span>`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
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
        html += `</ul>`;
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapEn = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, false);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapEn.set(job, reqs);
        }
      }

      if (jobDocsMapEn.size > 0) {
        const selectedJobsEn = Array.from(jobDocsMapEn.keys()).map(j => `${j.titleEn || j.title} (${j.id})`).join(', ');
        const jobsHeaderTextEn = selectedJobsEn || dossierJobsEn;
        html += `<p style="margin-top: 15px; font-weight: bold; color: #000000;">In order to evaluate your application for the selected occupation(s) (${jobsHeaderTextEn}), you must provide us with the following additional document(s) or proof that you meet the following condition(s) in direct reply to this email:</p>`;
        html += `<ul style="margin-top: 5px; list-style-type: disc; padding-left: 20px;">`;
        for (const [job, reqs] of jobDocsMapEn.entries()) {
          html += `<li style="margin-bottom: 8px;"><strong>For ${job.id} - ${job.titleEn || job.title} :</strong> <span style="background-color: yellow; padding: 0 2px;">` + reqs.join(", ") + `</span></li>`;
        }
        html += `</ul>`;
      }
    }

    if (this.forceGeneralReminder()) {
      html += `<p>Please also ensure that you complete the other missing tasks on your portal.</p>`;
    }

    html += `<p><strong>If you take no action, your file will be automatically deactivated after 30 days.</strong></p>`;

    return html;
  }

  // Helper to get raw HTML string for clipboard and display
  private getRawHtmlString(): string {
    return this.getCombinedRawHtmlString();
  }
  
  private oldUnusedGetRawHtmlStringBody(): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0) return "";

    const normalTasks = new Map<
      Task,
      { doc: DocumentItem; reason: RejectionReason }[]
    >();
    const confirmationTasks = new Map<
      Task,
      { doc: DocumentItem; reason: RejectionReason }[]
    >();
    const additionalDocTasks = new Map<
      Task,
      { doc: DocumentItem; reason: RejectionReason }[]
    >();

    for (const [task, items] of structure.entries()) {
      const normalItems = items.filter((i) => !i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const confItems = items.filter((i) => i.reason.isConfirmation && !i.reason.isAdditionalDoc);
      const addItems = items.filter((i) => i.reason.isAdditionalDoc);

      if (
        normalItems.length > 0 ||
        this.taskNotCompletedKeys().has(task.nameFr)
      ) {
        normalTasks.set(task, normalItems);
      }
      if (confItems.length > 0) {
        confirmationTasks.set(task, confItems);
      }
      if (addItems.length > 0) {
        additionalDocTasks.set(task, addItems);
      }
    }

    // Base style
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;

    // --- FRENCH BLOCK ---
    html += `<p>English message will follow.</p>`;
    html += `<p>Bonjour,</p>`;
    html += `<!-- START_TASK_BODY_FR -->`;

    if (normalTasks.size > 0) {
      html += `<p>Nous avons procédé à l'évaluation de vos documents. Bien que votre dossier progresse, certains éléments ne sont pas conformes et nécessitent des corrections de votre part pour nous permettre de poursuivre le traitement.</p>`;
      html += `<p>Les tâches suivantes vous ont été réattribuées :</p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameFr = task.nameFr;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskNameFr}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
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
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
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
      html += `<p>En raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées.</p>`;
      html += `<p>Rendez-vous sur votre portail pour les compléter : <a href="https://www.cafoap-pclfac.forces.gc.ca/">https://www.cafoap-pclfac.forces.gc.ca/</a></p>`;
    }

    if (confirmationTasks.size > 0) {
      if (normalTasks.size > 0) {
        html += `<p>De plus, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :</p>`;
      } else {
        html += `<p>Afin de poursuivre le traitement de votre dossier, nous avons besoin d'une confirmation de votre part. Veuillez répondre directement à ce courriel avec les informations demandées pour l'élément suivant :</p>`;
      }
      html += `<ul style="margin-top: 0; list-style-type: disc; padding-left: 20px;">`;
      for (const [task, items] of confirmationTasks.entries()) {
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
          
          html += `<li style="margin-bottom: 15px;"><span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameFr} : <span style="color: #d97706;">${labelsStr}</span></strong></span>`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
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
      }
      html += `</ul>`;
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsFr = this.getDossierJobsSummaryTextFr();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        html += `<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 25px 0;">`;
      }

      if (generalAddDocs.length > 0) {
        html += `<p style="margin-top: 15px;"><strong>Afin de compléter l'évaluation de votre demande d'emploi, nous aurons besoin de document(s) supplémentaire(s) :</strong></p>`;
        html += `<ul style="margin-top: 5px; list-style-type: disc; padding-left: 20px;">`;
        for (const { doc, docItems } of generalAddDocs) {
          html += `<li style="margin-bottom: 15px;"><span style="background-color: yellow; padding: 0 2px;"><strong><span style="color: #2563eb;">${doc.nameFr}</span></strong></span>`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
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
        html += `</ul>`;
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapFr = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, true);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapFr.set(job, reqs);
        }
      }

      if (jobDocsMapFr.size > 0) {
        const selectedJobsFr = Array.from(jobDocsMapFr.keys()).map(j => `${j.title} (${j.id})`).join(', ');
        const jobsHeaderTextFr = selectedJobsFr || dossierJobsFr;
        html += `<p style="margin-top: 15px; font-weight: bold; color: #000000;">Afin d'évaluer votre dossier pour le(s) métier(s) sélectionné(s) (${jobsHeaderTextFr}), vous devez nous fournir le(s) document(s) supplémentaire(s) suivant(s) ou une(des) preuve(s) que vous remplissez la(les) condition(s) suivante(s) en réponse directe à ce courriel :</p>`;
        html += `<ul style="margin-top: 5px; list-style-type: disc; padding-left: 20px;">`;
        for (const [job, reqs] of jobDocsMapFr.entries()) {
          html += `<li style="margin-bottom: 8px;"><strong>Pour ${job.id} - ${job.title} :</strong> <span style="background-color: yellow; padding: 0 2px;">` + reqs.join(", ") + `</span></li>`;
        }
        html += `</ul>`;
      }
    }
    html += `<!-- END_TASK_BODY_FR -->`;

    if (this.forceGeneralReminder()) {
      html += `<p>Veuillez également vous assurer de compléter les autres tâches manquantes sur votre portail.</p>`;
    }

    html += `<p><strong>Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.</strong></p>`;
    html += `<p>` + this.sharedState.getHtmlSignatureFr() + `</p>`;

    html += `<br><p>______________________________________________________________________________</p><br>`;

    // --- ENGLISH BLOCK ---
    html += `<p>Hello,</p>`;
    html += `<!-- START_TASK_BODY_EN -->`;

    if (normalTasks.size > 0) {
      html += `<p>We have evaluated your documents. While your application is progressing, some items are not compliant and require corrections on your part to allow us to continue processing.</p>`;
      html += `<p>The following tasks have been reassigned to you:</p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const [task, items] of normalTasks.entries()) {
        const taskNameEn = task.nameEn;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskNameEn}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (this.taskNotCompletedKeys().has(task.nameFr)) {
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
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
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
      html += `<ul style="margin-top: 0; list-style-type: disc; padding-left: 20px;">`;
      for (const [task, items] of confirmationTasks.entries()) {
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
          
          html += `<li style="margin-bottom: 15px;"><span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameEn} : <span style="color: #d97706;">${labelsStr}</span></strong></span>`;
          
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
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
      }
      html += `</ul>`;
    }

    if (additionalDocTasks.size > 0) {
      const dossierJobsEn = this.getDossierJobsSummaryTextEn();
      const generalAddDocs: { doc: any; docItems: any[] }[] = [];
      const occupSpecificDocs: { doc: any; docItems: any[] }[] = [];

      for (const [task, items] of additionalDocTasks.entries()) {
        const groupedItems = new Map<any, any[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc).push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          if (this.isSubsidizedDoc(doc) || this.isTaskBasedAdditionalDoc(doc)) {
            generalAddDocs.push({ doc, docItems });
          } else {
            occupSpecificDocs.push({ doc, docItems });
          }
        }
      }

      if (normalTasks.size > 0 || confirmationTasks.size > 0) {
        html += `<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 25px 0;">`;
      }

      if (generalAddDocs.length > 0) {
        html += `<p style="margin-top: 15px;"><strong>In order to complete the evaluation of your employment application, we will need additional document(s):</strong></p>`;
        html += `<ul style="margin-top: 5px; list-style-type: disc; padding-left: 20px;">`;
        for (const { doc, docItems } of generalAddDocs) {
          html += `<li style="margin-bottom: 15px;"><span style="background-color: yellow; padding: 0 2px;"><strong><span style="color: #2563eb;">${doc.nameEn}</span></strong></span>`;
          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionEn)) {
              uniqueInstructions.add(item.reason.instructionEn);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&rarr; ${item.reason.instructionEn.replace(/\n/g, "<br>")}</div>`;
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
        html += `</ul>`;
      }

      const jobs = this.getDossierJobObjects();
      const jobDocsMapEn = new Map<JobEntry, string[]>();
      for (const job of jobs) {
        const reqs: string[] = [];
        for (const { doc, docItems } of occupSpecificDocs) {
          if (this.isAdditionalDocRequiredForJob(doc.nameFr, job.id)) {
            const isSelectedForJob = docItems.some((item: any) =>
              this.isJobReasonSelected(job, doc, item.reason)
            );
            if (isSelectedForJob) {
              const detail = this.getJobSpecificDocText(job.id, doc.nameFr, false);
              if (detail && !reqs.includes(detail)) {
                reqs.push(detail);
              }
            }
          }
        }
        if (reqs.length > 0) {
          jobDocsMapEn.set(job, reqs);
        }
      }

      if (jobDocsMapEn.size > 0) {
        const selectedJobsEn = Array.from(jobDocsMapEn.keys()).map(j => `${j.titleEn || j.title} (${j.id})`).join(', ');
        const jobsHeaderTextEn = selectedJobsEn || dossierJobsEn;
        html += `<p style="margin-top: 15px; font-weight: bold; color: #000000;">In order to evaluate your application for the selected occupation(s) (${jobsHeaderTextEn}), you must provide us with the following additional document(s) or proof that you meet the following condition(s) in direct reply to this email:</p>`;
        html += `<ul style="margin-top: 5px; list-style-type: disc; padding-left: 20px;">`;
        for (const [job, reqs] of jobDocsMapEn.entries()) {
          html += `<li style="margin-bottom: 8px;"><strong>For ${job.id} - ${job.titleEn || job.title} :</strong> <span style="background-color: yellow; padding: 0 2px;">` + reqs.join(", ") + `</span></li>`;
        }
        html += `</ul>`;
      }
    }
    html += `<!-- END_TASK_BODY_EN -->`;

    if (this.forceGeneralReminder()) {
      html += `<p>Please also ensure that you complete the other missing tasks on your portal.</p>`;
    }

    html += `<p><strong>If you take no action, your file will be automatically deactivated after 30 days.</strong></p>`;
    html += `<p>` + this.sharedState.getHtmlSignatureEn() + `</p>`;

    html += `</div>`;

    return html;
  }

  // Combined Action: Copy HTML to clipboard AND Open Empty Outlook Window
  async exportToOutlook() {
    // 1. Copy to Clipboard
    try {
      // Logic for Scenario vs Default
      const scenario = this.activeEmailScenario();

      let htmlContent = this.getCombinedRawHtmlString();
      let textContent = this.getCombinedPlainString();
      const subject = this.getEmailSubject();

      // Modern Clipboard API supporting HTML
      if (navigator.clipboard && navigator.clipboard.write) {
        const typeHtml = "text/html";
        const typeText = "text/plain";

        const blobHtml = new Blob([htmlContent], { type: typeHtml });
        const blobText = new Blob([textContent], { type: typeText });

        const data = [
          new ClipboardItem({
            [typeHtml]: blobHtml,
            [typeText]: blobText,
          }),
        ];

        await navigator.clipboard.write(data);
      } else {
        // Fallback
        await navigator.clipboard.writeText(textContent);
      }

      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 3000);

      // 2. Open Outlook
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoLink;
    } catch (err) {
      console.error("Failed to copy", err);
    }
  }

  async copyNote() {
    try {
      await navigator.clipboard.writeText(this.displayedNote());
      this.copiedNote.set(true);
      setTimeout(() => this.copiedNote.set(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  }
}
