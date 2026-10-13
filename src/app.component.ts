import {
  Component,
  computed,
  inject,
  signal,
  ViewChild,
  effect,
  untracked,
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
import { TutoMarcelComponent } from "./app/components/tuto-marcel.component";
import { UnitSession, UNITS_LIST } from "./app/data/units.data";
import { CourseSession } from "./app/data/course-sessions.data";
import { JOB_URLS } from "./app/data/job-urls.data";
import { SharedStateService, DEFAULT_SIG_FR, DEFAULT_SIG_EN, DEFAULT_SIG_OTA_FR, DEFAULT_SIG_OTA_EN } from "./services/shared-state.service";
import { JobDatabaseService } from "./services/job-database.service";
import { MelService } from "./services/mel.service";
import { ReorientationCriteriaService } from "./services/reorientation-criteria.service";
import { JobEntry, JobCategory, MilitaryElement, RecruitmentCenter, RECRUITMENT_CENTERS, ENROLMENT_HOURS } from "./services/jobs-data";
import { FormsModule } from "@angular/forms";

import type {
  UniteAffectation,
  AppStage,
  RoleSnapshot,
} from "./app/models/app.models";
import {
  UNITES_AFFECTATION,
  getTodayDateString,
} from "./app/models/app.models";
import { AuthScreenComponent } from "./app/components/auth-screen.component";
import { RoleSelectorComponent } from "./app/components/role-selector.component";
import { SignatureModalComponent } from "./app/components/signature-modal.component";
import { MinorCheckComponent } from "./app/components/minor-check.component";
import { GdIntroComponent } from "./app/components/gd-intro.component";
import { GdEmailService, type GdPremierContactOptions, type GdAvisFermetureOptions } from "./services/gd-email.service";
import { GdOfferService } from "./services/gd-offer.service";
import type { GdOfferEmailParams, GdOfferNoteParams } from "./services/gd-offer.service";
import { EmailBankService } from "./services/email-bank.service";
import { PforEmailService } from "./services/pfor-email.service";
import { RejectionEmailService } from "./services/rejection-email.service";
import { AdditionalDocsService } from "./services/additional-docs.service";
import { OutlookExportService } from "./services/outlook-export.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    JobSearchModalComponent,
    CalendarPickerComponent,
    CourseSeriesPickerComponent,
    UnitPickerComponent,
    TutoMarcelComponent,
    AuthScreenComponent,
    RoleSelectorComponent,
    SignatureModalComponent,
    MinorCheckComponent,
    GdIntroComponent,
    FormsModule,
  ],
  template: `
    @if (!isAuthenticated()) {
      <app-auth-screen (authenticated)="onAuthenticated($event)" />
    } @else if (selectedRole() === 'none') {
      @if (showTutoMarcel()) {
        <app-tuto-marcel (close)="closeTutoMarcel()" />
      } @else {
        <app-role-selector
          (roleSelected)="selectRole($event)"
          (openTuto)="openTutoMarcel()"
        />
      }
    } @else if (showSignaturePage()) {
      <app-signature-modal (close)="closeSignaturePage()" />
    } @else if (stage() === "intro" && selectedRole() === "recruiter") {
      <app-minor-check
        [stage]="'intro'"
        (minorYes)="startMinorCheck()"
        (minorNo)="onRecruiterMinorCheckNon()"
        (switchRole)="switchRole()"
        (openJobSearch)="toggleJobSearch()"
      />
    } @else if (stage() === "recruiter-dossier-type" && selectedRole() === "recruiter") {
      <app-minor-check
        [stage]="'recruiter-dossier-type'"
        (dossierTypeSelected)="selectRecruiterDossierType($event)"
        (backToMinor)="backToRecruiterMinorCheck()"
        (switchRole)="switchRole()"
        (openJobSearch)="toggleJobSearch()"
      />
    } @else if (stage() === "intro" && selectedRole() === "gestionnaire") {
      <app-gd-intro
        (typeSelected)="selectGdDossierType($event)"
        (switchRole)="switchRole()"
      />
    } @else {
      <!-- Main Container: Vertical layout now -->
      <div
        class="min-h-screen w-full bg-slate-200 text-slate-800 p-4 flex flex-col gap-4 font-sans relative"
      >
        <!-- TOP HEADER ROW -->
        <div class="flex items-stretch w-full shrink-0 gap-4">
          <!-- Role Title Panel (Top-Left 2x2 Pastilles) -->
          <div
            class="bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex flex-col justify-between items-center gap-2 flex-1 min-w-[320px]"
          >
            <h1
              class="text-xs font-black tracking-wider uppercase text-center border-b border-slate-100 pb-1.5 w-full px-1"
              [class.text-indigo-800]="selectedRole() === 'recruiter'"
              [class.text-amber-800]="selectedRole() === 'gestionnaire'"
            >
              {{ selectedRole() === 'recruiter' ? 'Recruteur' : ('Gestionnaire de dossier — ' + (evaluationMedicaleType() === 'Dossier OTA' ? 'OTA' : 'Local')) }}
            </h1>

            <div class="grid grid-cols-2 gap-2 w-full flex-1">
              <!-- Top-Left: Reset -->
              <button
                (click)="restartApp()"
                class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer w-full h-full"
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
                class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-xs font-bold border border-indigo-200 shadow-xs transition-all active:scale-95 cursor-pointer w-full h-full"
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
                class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer w-full h-full"
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
              <div class="relative w-full h-full email-bank-dropdown-container">
                <button
                  (click)="toggleEmailBankDropdown($event)"
                  class="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer w-full h-full text-left"
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

                    @if (selectedRole() === 'recruiter') {
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

                      <button
                        (click)="selectEmailBankTemplate('inadmissibilite_age_57')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'inadmissibilite_age_57'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'inadmissibilite_age_57'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'inadmissibilite_age_57'"
                      >
                        <span class="truncate">Inadmissibilité - Âge (57 ans et plus)</span>
                        @if (selectedEmailBankTemplate() === 'inadmissibilite_age_57') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('inadmissibilite_pr_3ans')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'inadmissibilite_pr_3ans'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'inadmissibilite_pr_3ans'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'inadmissibilite_pr_3ans'"
                      >
                        <span class="truncate">Inadmissibilité - Résident permanent (< 3 ans)</span>
                        @if (selectedEmailBankTemplate() === 'inadmissibilite_pr_3ans') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('inadmissibilite_non_citoyen_ni_pr')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'inadmissibilite_non_citoyen_ni_pr'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'inadmissibilite_non_citoyen_ni_pr'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'inadmissibilite_non_citoyen_ni_pr'"
                      >
                        <span class="truncate">Inadmissibilité - Ni citoyen ni résident permanent</span>
                        @if (selectedEmailBankTemplate() === 'inadmissibilite_non_citoyen_ni_pr') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>
                    } @else {
                      <button
                        (click)="selectEmailBankTemplate('tentative_offre_gd')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'tentative_offre_gd'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'tentative_offre_gd'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'tentative_offre_gd'"
                      >
                        <span class="truncate">Tentative de communication - Offre d'emploi</span>
                        @if (selectedEmailBankTemplate() === 'tentative_offre_gd') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('verification_dossier_cadet')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'verification_dossier_cadet'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'verification_dossier_cadet'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'verification_dossier_cadet'"
                      >
                        <span class="truncate">Vérification Dossier Cadet</span>
                        @if (selectedEmailBankTemplate() === 'verification_dossier_cadet') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('bris_bail_entreposage')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'bris_bail_entreposage'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'bris_bail_entreposage'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'bris_bail_entreposage'"
                      >
                        <span class="truncate">Bris de bail et entreposage</span>
                        @if (selectedEmailBankTemplate() === 'bris_bail_entreposage') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('demande_nav_tan')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'demande_nav_tan'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'demande_nav_tan'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'demande_nav_tan'"
                      >
                        <span class="truncate">Demande NAV/TAN & Claims X - CSPN partie 1</span>
                        @if (selectedEmailBankTemplate() === 'demande_nav_tan') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('demande_autorisation_cspn')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'demande_autorisation_cspn'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'demande_autorisation_cspn'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'demande_autorisation_cspn'"
                      >
                        <span class="truncate">Demande d'autorisation pour un CSPN</span>
                        @if (selectedEmailBankTemplate() === 'demande_autorisation_cspn') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('documents_conjoint_de_fait')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'documents_conjoint_de_fait'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'documents_conjoint_de_fait'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'documents_conjoint_de_fait'"
                      >
                        <span class="truncate">Documents requis - Conjoint(e) de fait</span>
                        @if (selectedEmailBankTemplate() === 'documents_conjoint_de_fait') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('demande_sdpm_conjoint_militaire')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire'"
                      >
                        <span class="truncate">Demande SDPM pour conjoint militaire</span>
                        @if (selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('test_esom_confirmation')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'test_esom_confirmation'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'test_esom_confirmation'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'test_esom_confirmation'"
                      >
                        <span class="truncate">TEST ESOM / Confirmation</span>
                        @if (selectedEmailBankTemplate() === 'test_esom_confirmation') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>
                    }
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
                @if (selectedRole() === 'recruiter') {
                  @if (recruiterDossierType() === 'pfor') {
                    <span
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-300 text-indigo-900 text-[11px] font-black uppercase tracking-wider select-none shadow-2xs"
                      title="Dossier configuré comme Postulant PFOR"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Postulant PFOR</span>
                    </span>
                  }
                } @else {
                  <label
                    class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-bold cursor-pointer transition-all select-none shadow-2xs"
                    [class.bg-indigo-50]="sharedState.isPostulantPfor()"
                    [class.border-indigo-300]="sharedState.isPostulantPfor()"
                    [class.text-indigo-900]="sharedState.isPostulantPfor()"
                    [class.bg-slate-50]="!sharedState.isPostulantPfor()"
                    [class.border-slate-200]="!sharedState.isPostulantPfor()"
                    [class.text-slate-600]="!sharedState.isPostulantPfor()"
                    title="Filtrer les métiers admissibles au programme PFOR (CMR / Civil)"
                  >
                    <input
                      type="checkbox"
                      [checked]="sharedState.isPostulantPfor()"
                      (change)="sharedState.isPostulantPfor.set(!sharedState.isPostulantPfor())"
                      class="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                    />
                    <span>Postulant PFOR</span>
                  </label>
                }

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
            class="w-[340px] shrink-0 bg-white rounded-2xl shadow-xl flex flex-col border border-white/50 h-fit overflow-hidden"
          >
            <div class="p-3 bg-slate-50 border-b border-slate-200 flex-none flex items-center justify-between rounded-t-2xl">
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
                  <div
                    (click)="toggleGroupCollapse(group.id)"
                    class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold tracking-wider text-slate-800 bg-slate-200/80 hover:bg-slate-300/80 transition-colors select-none border border-slate-300/70 cursor-pointer"
                  >
                    <span class="flex items-center gap-1.5 min-w-0">
                      @if (selectedRole() === 'gestionnaire') {
                        <span class="bg-indigo-900 text-white px-2 py-0.5 rounded text-[11px] font-extrabold tracking-wide shrink-0">{{ group.title }}</span>
                      } @else {
                        <span class="bg-slate-800 text-white px-2 py-0.5 rounded text-[11px] font-extrabold tracking-wide shrink-0">Groupe {{ group.title }}</span>
                      }
                      <span class="text-[11px] font-semibold text-slate-500 shrink-0">({{ group.tasks.length }})</span>
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

                    <div class="flex items-center gap-2 shrink-0">
                      @if (selectedRole() !== 'gestionnaire') {
                        <button
                          type="button"
                          (click)="setGroupCompliant(group, $event)"
                          class="px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
                          [class.bg-emerald-600]="isGroupCompliant(group)"
                          [class.text-white]="isGroupCompliant(group)"
                          [class.border-emerald-700]="isGroupCompliant(group)"
                          [class.hover:bg-emerald-700]="isGroupCompliant(group)"
                          [class.bg-white]="!isGroupCompliant(group)"
                          [class.text-emerald-700]="!isGroupCompliant(group)"
                          [class.border-emerald-300]="!isGroupCompliant(group)"
                          [class.hover:bg-emerald-50]="!isGroupCompliant(group)"
                          [title]="isGroupCompliant(group) ? 'Désactiver la conformité du groupe' : 'Rendre toutes les tâches du groupe conformes'"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3 shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>Conforme</span>
                        </button>
                      }

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
                    </div>
                  </div>

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
                    @if (task.nameFr === "Premier contact") {
                      <div class="inline-flex p-1 bg-slate-200/80 rounded-xl border border-slate-300 shadow-inner">
                        <button
                          type="button"
                          (click)="premierContactSubPanelMode.set('courriel')"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          [class.bg-white]="premierContactSubPanelMode() === 'courriel'"
                          [class.text-blue-700]="premierContactSubPanelMode() === 'courriel'"
                          [class.shadow-xs]="premierContactSubPanelMode() === 'courriel'"
                          [class.text-slate-600]="premierContactSubPanelMode() !== 'courriel'"
                          [class.hover:text-slate-900]="premierContactSubPanelMode() !== 'courriel'"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Courriel</span>
                        </button>
                        <button
                          type="button"
                          (click)="premierContactSubPanelMode.set('note')"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          [class.bg-white]="premierContactSubPanelMode() === 'note'"
                          [class.text-indigo-700]="premierContactSubPanelMode() === 'note'"
                          [class.shadow-xs]="premierContactSubPanelMode() === 'note'"
                          [class.text-slate-600]="premierContactSubPanelMode() !== 'note'"
                          [class.hover:text-slate-900]="premierContactSubPanelMode() !== 'note'"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Note</span>
                        </button>
                      </div>
                    }

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
                          @if (premierContactSubPanelMode() === 'courriel') {
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Premier contact — Courriel</span>
                          } @else {
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Premier contact — Note au dossier</span>
                          }
                        </div>
                      </div>

                      @if (premierContactSubPanelMode() === 'courriel') {
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
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">Égoportrait (selfie) avec pièce d'identité (Tâche : Pièce d'identité avec photo émise par le gouvernement canadien)</p>
                                </div>
                              </label>

                              <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                                <input
                                  type="checkbox"
                                  [checked]="premierContactIptad()"
                                  (change)="togglePremierContactTask('iptad')"
                                  class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div>
                                  <span class="font-semibold text-slate-800">IPTAD</span>
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">Évaluation de la personnalité (Inventaire de personnalité des traits auto-descriptifs)</p>
                                </div>
                              </label>

                              <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                                <input
                                  type="checkbox"
                                  [checked]="premierContactSeaf()"
                                  (change)="togglePremierContactTask('seaf')"
                                  class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div>
                                  <span class="font-semibold text-slate-800">SEAF</span>
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">Formulaire de demande d'emploi notée</p>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      } @else {
                        <!-- Premier contact Note Sub-Panel -->
                        <div class="p-4 space-y-4 rounded-b-xl">
                          <div class="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-900 mb-2">
                            Renseignez les statuts des composantes pour générer la note au registre du Premier contact.
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <!-- IPTAD -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">IPTAD :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteIptad()"
                                (change)="premierContactNoteIptad.set($any($event.target).value)"
                              >
                                @for (opt of premierContactIptadOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- SEAF -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">SEAF :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteSeaf()"
                                (change)="premierContactNoteSeaf.set($any($event.target).value)"
                              >
                                @for (opt of premierContactSeafOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Entrevue -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Entrevue :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteEntrevue()"
                                (change)="premierContactNoteEntrevue.set($any($event.target).value)"
                              >
                                @for (opt of premierContactEntrevueOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Médical -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Médical :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteMedical()"
                                (change)="premierContactNoteMedical.set($any($event.target).value)"
                              >
                                @for (opt of premierContactMedicalOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- PSPS -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">PSPS :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNotePsps()"
                                (change)="premierContactNotePsps.set($any($event.target).value)"
                              >
                                @for (opt of premierContactPspsOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Gambit -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Gambit :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteGambit()"
                                (change)="premierContactNoteGambit.set($any($event.target).value)"
                              >
                                @for (opt of premierContactGambitOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- ANX Q -->
                            <div class="sm:col-span-2">
                              <label class="block font-semibold text-slate-700 mb-1">ANX Q :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteAnxQ()"
                                (change)="premierContactNoteAnxQ.set($any($event.target).value)"
                              >
                                @for (opt of premierContactAnxQOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>
                          </div>
                        </div>
                      }
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
                          @if (evaluationMedicaleType() === 'Dossier OTA') {
                            <!-- Dossier OTA : Formulaire simplifié et réordonné -->
                            <!-- 1. Date d'enrôlement et Heures d'arrivée (Arrivée postulant & Teams invité) -->
                            <div>
                              <app-calendar-picker
                                label="Date d'enrôlement :"
                                [value]="offreDateEnrolement()"
                                placeholder="Sélectionner une date..."
                                (dateSelected)="setOffreDateEnrolement($event)"
                                (cleared)="setOffreDateEnrolement('')"
                              ></app-calendar-picker>
                              <p class="mt-1 text-[11px] text-slate-500">
                                Dans le courriel : <span class="font-semibold text-slate-700">Date d'enrôlement : {{ offreDateEnrolement() || 'jour / mois / année' }}</span>
                              </p>
                            </div>

                            <div>
                              <label class="block font-semibold text-slate-700 mb-1 text-xs">Heures d'arrivée :</label>
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
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                      <span>Teams invité :</span>
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

                            <!-- 2. Unité d'affectation -->
                            <div>
                              <app-unit-picker
                                [selectedId]="offreUniteAffectation()"
                                (unitSelected)="setOffreUniteAffectationObj($event)"
                                (cleared)="setOffreUniteAffectation('')"
                              ></app-unit-picker>
                            </div>

                            <!-- 3. Date d'arrivée à votre unité -->
                            <div>
                              <app-calendar-picker
                                label="Date d'arrivée à votre unité :"
                                [value]="offreDateArriveeUnite()"
                                placeholder="Sélectionner une date d'arrivée..."
                                (dateSelected)="setOffreDateArriveeUnite($event)"
                                (cleared)="setOffreDateArriveeUnite('')"
                              ></app-calendar-picker>
                              <p class="mt-1 text-[11px] text-slate-500">
                                Dans le courriel : <span class="font-semibold text-slate-700">Date d'arrivée : Vous devez vous présenter à {{ getUniteAffectationObj().nom }} le {{ getJourSemaineFr(offreDateArriveeUnite()) || 'jour de la semaine' }} : {{ offreDateArriveeUnite() || 'jour / mois / année' }} au plus tard à 16h00.</span>
                              </p>
                            </div>

                            <!-- 4. Série du cours -->
                            <div class="md:col-span-2">
                              <app-course-series-picker
                                [serie]="offreSerieCours()"
                                [dateDebut]="offreDateCoursDebut()"
                                [dateFin]="offreDateCoursFin()"
                                (courseSelected)="setCourseSession($event)"
                                (cleared)="clearCourseSession()"
                              ></app-course-series-picker>
                            </div>

                          } @else {
                            <!-- Dossier Régulier : Formulaire complet existant -->
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
                          }
                        </div>

                        <!-- Formulaires Supplémentaires -->
                        <div class="mt-4 pt-4 border-t border-slate-200">
                          <div class="flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <label class="block font-bold text-slate-800 text-xs uppercase tracking-wider">
                              Formulaires Supplémentaires :
                            </label>
                          </div>
                          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                            <!-- PPP -->
                            <label class="flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs font-semibold"
                              [class.bg-indigo-50]="offreFormulairePpp()"
                              [class.border-indigo-300]="offreFormulairePpp()"
                              [class.text-indigo-900]="offreFormulairePpp()"
                              [class.bg-slate-50]="!offreFormulairePpp()"
                              [class.border-slate-200]="!offreFormulairePpp()"
                              [class.text-slate-700]="!offreFormulairePpp()"
                            >
                              <input
                                type="checkbox"
                                [checked]="offreFormulairePpp()"
                                (change)="toggleOffreFormulairePpp()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                              />
                              <span>PPP</span>
                            </label>

                            <!-- PCU -->
                            <label class="flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs font-semibold"
                              [class.bg-indigo-50]="offreFormulairePcu()"
                              [class.border-indigo-300]="offreFormulairePcu()"
                              [class.text-indigo-900]="offreFormulairePcu()"
                              [class.bg-slate-50]="!offreFormulairePcu()"
                              [class.border-slate-200]="!offreFormulairePcu()"
                              [class.text-slate-700]="!offreFormulairePcu()"
                            >
                              <input
                                type="checkbox"
                                [checked]="offreFormulairePcu()"
                                (change)="toggleOffreFormulairePcu()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                              />
                              <span>PCU</span>
                            </label>

                            <!-- Croix du souvenir -->
                            <label class="flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs font-semibold"
                              [class.bg-indigo-50]="offreFormulaireCroixSouvenir()"
                              [class.border-indigo-300]="offreFormulaireCroixSouvenir()"
                              [class.text-indigo-900]="offreFormulaireCroixSouvenir()"
                              [class.bg-slate-50]="!offreFormulaireCroixSouvenir()"
                              [class.border-slate-200]="!offreFormulaireCroixSouvenir()"
                              [class.text-slate-700]="!offreFormulaireCroixSouvenir()"
                            >
                              <input
                                type="checkbox"
                                [checked]="offreFormulaireCroixSouvenir()"
                                (change)="toggleOffreFormulaireCroixSouvenir()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                              />
                              <span>Croix du souvenir</span>
                            </label>

                            <!-- Désignation de bénéficiaire -->
                            <label class="flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs font-semibold"
                              [class.bg-indigo-50]="offreFormulaireBeneficiaire()"
                              [class.border-indigo-300]="offreFormulaireBeneficiaire()"
                              [class.text-indigo-900]="offreFormulaireBeneficiaire()"
                              [class.bg-slate-50]="!offreFormulaireBeneficiaire()"
                              [class.border-slate-200]="!offreFormulaireBeneficiaire()"
                              [class.text-slate-700]="!offreFormulaireBeneficiaire()"
                            >
                              <input
                                type="checkbox"
                                [checked]="offreFormulaireBeneficiaire()"
                                (change)="toggleOffreFormulaireBeneficiaire()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                              />
                              <span>Désignation de bénéficiaire</span>
                            </label>
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
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <label class="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="rappelCeremonieChecked()"
                                (change)="toggleRappelCeremonie()"
                                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">Générer courriel Rappel cérémonie d'assermentation</span>
                            </label>
                            <label class="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="rappelCeremonieRalliementChecked()"
                                (change)="toggleRappelCeremonieRalliement()"
                                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">Instruction de ralliement ELRFC</span>
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

                @if (isPforCompliant()) {
                  <button
                    (click)="exportToOutlookCaf101()"
                    class="text-xs text-white px-3.5 py-1.5 rounded-md shadow-md font-medium transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                    [class.bg-slate-800]="!copiedEmailCaf101()"
                    [class.hover:bg-slate-700]="!copiedEmailCaf101()"
                    [class.bg-green-600]="copiedEmailCaf101()"
                    title="Exporter vers Outlook - CAF 101"
                  >
                    @if (copiedEmailCaf101()) {
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
                      Exporter vers Outlook-CAF 101
                    }
                  </button>

                  <button
                    (click)="exportToOutlookLienPa()"
                    class="text-xs text-white px-3.5 py-1.5 rounded-md shadow-md font-medium transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                    [class.bg-indigo-600]="!copiedEmailLienPa()"
                    [class.hover:bg-indigo-700]="!copiedEmailLienPa()"
                    [class.bg-green-600]="copiedEmailLienPa()"
                    title="Exporter vers Outlook - Lien PA"
                  >
                    @if (copiedEmailLienPa()) {
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
                      Exporter vers Outlook-Lien PA
                    }
                  </button>
                } @else {
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
                }
              </div>
            </div>

            <div class="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30">
              @if (allTasksCompliant()) {
                <!-- Instructions pour le recruteur -->
                <div
                  class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  @let currentInstructions = isPforCompliant() ? sgtPforInstructions : sgtStandardInstructions;
                  @let completedCount = getCompletedSgtInstructionsCount(currentInstructions);
                  @let isAllDone = completedCount === currentInstructions.length && currentInstructions.length > 0;

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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      Instructions pour le sgt recruteur
                    </h3>
                    <div class="flex items-center gap-2.5">
                      <span
                        class="text-xs px-2.5 py-1 rounded-full font-medium transition-colors"
                        [class.bg-emerald-100]="isAllDone"
                        [class.text-emerald-800]="isAllDone"
                        [class.bg-slate-200/80]="!isAllDone"
                        [class.text-slate-600]="!isAllDone"
                      >
                        @if (isAllDone) {
                          ✓ {{ completedCount }}/{{ currentInstructions.length }} complétées
                        } @else {
                          {{ completedCount }}/{{ currentInstructions.length }} complétées
                        }
                      </span>
                      <button
                        type="button"
                        (click)="toggleAllSgtInstructions(currentInstructions)"
                        class="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 rounded hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="Tout cocher / décocher"
                      >
                        {{ isAllDone ? 'Tout décocher' : 'Tout cocher' }}
                      </button>
                    </div>
                  </div>
                  <div
                    class="p-4 bg-white text-sm text-slate-800 font-sans border-none space-y-2"
                  >
                    @for (item of currentInstructions; track item.id; let idx = $index) {
                      @let isChecked = isSgtInstructionChecked(item.id);
                      <label
                        (click)="toggleSgtInstruction(item.id)"
                        class="flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer select-none"
                        [class.bg-emerald-50/50]="isChecked"
                        [class.border-emerald-200]="isChecked"
                        [class.bg-slate-50/60]="!isChecked"
                        [class.border-slate-200]="!isChecked"
                        [class.hover:bg-slate-100/80]="!isChecked"
                      >
                        <div class="pt-0.5 flex-shrink-0">
                          <input
                            type="checkbox"
                            [checked]="isChecked"
                            (click)="$event.stopPropagation()"
                            (change)="toggleSgtInstruction(item.id)"
                            class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                          />
                        </div>
                        <span
                          class="flex-1 text-sm leading-snug transition-colors"
                          [class.line-through]="isChecked"
                          [class.text-slate-400]="isChecked"
                          [class.text-slate-800]="!isChecked"
                          [class.font-medium]="!isChecked"
                        >
                          <span class="text-xs font-semibold mr-1.5 opacity-60">{{ idx + 1 }}.</span>{{ item.text }}
                        </span>
                      </label>
                    }
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
                    @if (sharedState.includeLinkedEmail() && sharedState.reoMergedNote()) {
                      <span class="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-xs flex items-center gap-1.5 font-sans normal-case tracking-normal">
                        <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                        Fusionnée avec la réorientation
                      </span>
                    }
                  </h3>
                </div>
                <div class="p-4 bg-slate-50">
                  <div
                    class="w-full bg-transparent text-sm font-mono text-slate-600 select-text leading-relaxed whitespace-pre-wrap break-words"
                  >{{ displayedNote() }}</div>
                </div>
              </div>

              <!-- Email Section -->
              @if (isPforCompliant()) {
                <!-- Email 1: CAF 101 -->
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
                      1er Courriel au Postulant : CAF 101
                    </h3>

                    <button
                      (click)="exportToOutlookCaf101()"
                      class="text-xs text-white px-3 py-1 rounded shadow-sm font-medium transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      [class.bg-slate-800]="!copiedEmailCaf101()"
                      [class.hover:bg-slate-700]="!copiedEmailCaf101()"
                      [class.bg-green-600]="copiedEmailCaf101()"
                    >
                      @if (copiedEmailCaf101()) {
                        <span>Copié !</span>
                      } @else {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3.5 w-3.5"
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
                        <span>Exporter vers Outlook-CAF 101</span>
                      }
                    </button>
                  </div>
                  <div
                    class="p-8 bg-white text-sm text-slate-800 leading-relaxed font-sans border-none focus:outline-none"
                    [innerHTML]="generatedPforCaf101EmailHtml()"
                  ></div>
                </div>

                <!-- Email 2: Lien PA -->
                <div
                  class="bg-white rounded-xl border border-indigo-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    class="bg-indigo-50/80 px-4 py-3 border-b border-indigo-200 flex justify-between items-center backdrop-blur-sm"
                  >
                    <h3
                      class="font-bold text-indigo-900 text-sm flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-indigo-600"
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
                      2e Courriel au Postulant : Lien PA (Documents scolaires CMC/CMR)
                    </h3>

                    <button
                      (click)="exportToOutlookLienPa()"
                      class="text-xs text-white px-3 py-1 rounded shadow-sm font-medium transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      [class.bg-indigo-600]="!copiedEmailLienPa()"
                      [class.hover:bg-indigo-700]="!copiedEmailLienPa()"
                      [class.bg-green-600]="copiedEmailLienPa()"
                    >
                      @if (copiedEmailLienPa()) {
                        <span>Copié !</span>
                      } @else {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3.5 w-3.5"
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
                        <span>Exporter vers Outlook-Lien PA</span>
                      }
                    </button>
                  </div>
                  <div
                    class="p-8 bg-white text-sm text-slate-800 leading-relaxed font-sans border-none focus:outline-none"
                    [innerHTML]="generatedPforLienPaEmailHtml()"
                  ></div>
                </div>
              } @else {
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
                      @if (sharedState.includeLinkedEmail() && sharedState.reoMergedEmailHtml()) {
                        <span class="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-xs flex items-center gap-1.5 font-sans normal-case tracking-normal">
                          <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                          Fusionné avec la réorientation
                        </span>
                      }
                    </h3>
                  </div>
                  <!-- Using innerHTML to render bold, yellow highlights and underlines -->
                  <div
                    class="p-8 bg-white text-sm text-slate-800 leading-relaxed font-sans border-none focus:outline-none"
                    [innerHTML]="generatedEmailHtml()"
                  ></div>
                </div>
              }
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
                @if (selectedEmailBankTemplate() === 'test_esom_confirmation') {
                  <div class="flex items-center gap-2 bg-indigo-50/70 border border-indigo-200 px-3 py-1 rounded-xl shadow-2xs">
                    <label class="text-xs font-bold text-indigo-900 flex items-center gap-1.5 whitespace-nowrap">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Lieu du test :
                    </label>
                    <select
                      [ngModel]="testEsomRecruitmentCenterCity()"
                      (ngModelChange)="testEsomRecruitmentCenterCity.set($event)"
                      class="text-xs border border-indigo-300 rounded-lg px-2.5 py-1 bg-white font-semibold text-slate-800 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                    >
                      @for (center of recruitmentCentersList; track center.city) {
                        <option [value]="center.city">{{ center.city }} ({{ center.name }})</option>
                      }
                    </select>
                  </div>
                }

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
                <!-- Instructions pour le GD (Demande NAV/TAN) -->
                @if (selectedEmailBankTemplate() === 'demande_nav_tan') {
                  <div class="bg-amber-50 border border-amber-200/90 rounded-xl p-4 shadow-xs">
                    <div class="flex items-start gap-3">
                      <div class="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4 class="font-bold text-amber-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          Instructions pour le gestionnaire de dossier (GD)
                        </h4>
                        <ul class="text-xs text-amber-900/90 space-y-1 font-medium list-disc list-inside">
                          <li>Mettre en attache le message d’autorisation les opérations (Ops CRFC)</li>
                          <li>Mettre en attache le message d’autorisation officiel (message DRAFT)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                }

                <!-- Instructions pour le GD (Test ESOM) -->
                @if (selectedEmailBankTemplate() === 'test_esom_confirmation') {
                  <div class="bg-amber-50 border border-amber-200/90 rounded-xl p-4 shadow-xs">
                    <div class="flex items-start gap-3">
                      <div class="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h4 class="font-bold text-amber-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          Instructions pour le gestionnaire de dossier (GD)
                        </h4>
                        <ul class="text-xs text-amber-900/90 space-y-1 font-medium list-disc list-inside">
                          <li>Contacter le postulant pour ses disponibilité</li>
                          <li>Vérifier la disponibilité de l'administrateur de test</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                }

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
                      <h3 class="font-bold text-slate-700 text-xs uppercase tracking-wider">
                        @if (selectedEmailBankTemplate() === 'demande_nav_tan') {
                          Courriel - Destinataire : CRFCQcReclamations&#64;forces.gc.ca
                        } @else if (selectedEmailBankTemplate() === 'verification_dossier_cadet') {
                          Courriel - Destinataire : MDN.CJRURSCEstJ1RH-CJRRCSUEasternJ1HR.DND&#64;forces.gc.ca
                        } @else if (selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire') {
                          Courriel - Destinataire : CRFCQcAdmin&#64;forces.gc.ca
                        } @else if (selectedEmailBankTemplate() === 'demande_autorisation_cspn') {
                          Courriel - Demande d’autorisation pour un CSPN
                        } @else {
                          Courriel au Postulant (Bilingue)
                        }
                      </h3>
                    </div>
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

    <!-- Job Search Modal (always rendered, hidden when not shown) -->
    <app-job-search-modal
      [class.hidden]="!showJobSearch()"
      [showReorientationTab]="selectedRole() === 'recruiter'"
      (closeModal)="showJobSearch.set(false)"
    ></app-job-search-modal>
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
  public melService = inject(MelService);
  public reorientationCriteria = inject(ReorientationCriteriaService);
  public gdEmailService = inject(GdEmailService);
  public gdOfferService = inject(GdOfferService);
  public emailBankService = inject(EmailBankService);
  public pforEmailService = inject(PforEmailService);
  public rejectionEmailService = inject(RejectionEmailService);
  public additionalDocsService = inject(AdditionalDocsService);
  public outlookExportService = inject(OutlookExportService);

  onAuthenticated(success: boolean) {
    if (success) {
      this.isAuthenticated.set(true);
      this.authError.set(false);
    }
  }

  // Dossier Jobs Panel Dropdown States
  dossierDropdownOpen1 = signal<boolean>(false);
  dossierDropdownOpen2 = signal<boolean>(false);
  dossierDropdownOpen3 = signal<boolean>(false);

  // Premier Contact State
  premierContactSubPanelMode = signal<'courriel' | 'note'>('courriel');
  readonly premierContactIptadOptions: string[] = ['Complété', 'À faire', 'Attribué'];
  readonly premierContactSeafOptions: string[] = ['Complété', 'Attribué'];
  readonly premierContactEntrevueOptions: string[] = ['À faire', 'Complété', 'Attribué'];
  readonly premierContactMedicalOptions: string[] = ['À faire', 'Complété', 'Attribué'];
  readonly premierContactPspsOptions: string[] = ['À faire', 'Complété', 'Initié'];
  readonly premierContactGambitOptions: string[] = ['En attente (type 28)', 'En attente (dossier soumis)', 'Concluant favorable', 'Concluant défavorable', 'Non Concluant'];
  readonly premierContactAnxQOptions: string[] = ['À faire', 'Complété'];

  premierContactNoteIptad = signal<string>('Complété');
  premierContactNoteSeaf = signal<string>('Complété');
  premierContactNoteEntrevue = signal<string>('À faire');
  premierContactNoteMedical = signal<string>('À faire');
  premierContactNotePsps = signal<string>('À faire');
  premierContactNoteGambit = signal<string>('En attente (type 28)');
  premierContactNoteAnxQ = signal<string>('À faire');

  premierContactCourriel = signal<boolean>(false);
  premierContactMedical = signal<boolean>(false);
  premierContactEntrevue = signal<boolean>(false);
  premierContactGambit = signal<boolean>(false);
  premierContactPsps = signal<boolean>(false);
  premierContactSelfie = signal<boolean>(false);
  premierContactIptad = signal<boolean>(false);
  premierContactSeaf = signal<boolean>(false);

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

  // PFOR State
  pforMatricule = signal<string>('');

  // Instructions Sgt Recruteur Checkboxes
  sgtPforInstructions = [
    { id: 'pfor_1', text: "S'assurer que la liste de Vérification A1 à A35 est bien rempli" },
    { id: 'pfor_2', text: 'Marquer la tâche "Planifier votre consultation CAF 101" comme complétée' },
    { id: 'pfor_3', text: 'Réattribuer la tâche "relevés de notes et Diplômes" pour le dépôt de la capture d\'écran de confirmation des documents déposés sur le PA' },
    { id: 'pfor_4', text: 'Ajouter la note au registre du Postulant' },
    { id: 'pfor_5', text: 'Tag CCM et Recruteur BPR appropriés' },
    { id: 'pfor_6', text: 'Basculer vers la Gestion des admissions' },
    { id: 'pfor_7', text: 'Envoyer les 2 courriels au Postulant : CAF 101 PFOR et Lien PA' },
  ];

  sgtStandardInstructions = [
    { id: 'std_1', text: "S'assurer que la liste de vérification A1 à A35 est bien rempli." },
    { id: 'std_2', text: "Attribuer la tâche : Planifiez votre séance d'information des FAC 101." },
    { id: 'std_3', text: "Mettre le marqueur ‘’Dispense requise’’ ou ‘’ÉRA requise’’ au besoin, le Ltv Forest fera l’analyse." },
    { id: 'std_4', text: "Ajouter la note au registre du postulant." },
    { id: 'std_5', text: "Basculer le postulant dans Traitement initial." },
    { id: 'std_6', text: "Envoyé le courriel au postulant contenant le lien vers le Form et le CAF 101." },
  ];

  sgtCheckedInstructions = signal<Set<string>>(new Set<string>());

  toggleSgtInstruction(id: string) {
    this.sgtCheckedInstructions.update(set => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  isSgtInstructionChecked(id: string): boolean {
    return this.sgtCheckedInstructions().has(id);
  }

  resetSgtInstructions() {
    this.sgtCheckedInstructions.set(new Set<string>());
  }

  toggleAllSgtInstructions(items: { id: string; text: string }[]) {
    const allChecked = items.every(item => this.isSgtInstructionChecked(item.id));
    this.sgtCheckedInstructions.update(set => {
      const next = new Set(set);
      if (allChecked) {
        items.forEach(item => next.delete(item.id));
      } else {
        items.forEach(item => next.add(item.id));
      }
      return next;
    });
  }

  getCompletedSgtInstructionsCount(items: { id: string; text: string }[]): number {
    return items.filter(item => this.isSgtInstructionChecked(item.id)).length;
  }

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
  private getGdPremierContactOptions(): GdPremierContactOptions {
    return {
      isOta: this.evaluationMedicaleType() === "Dossier OTA",
      premierContactMedical: this.premierContactMedical(),
      premierContactEntrevue: this.premierContactEntrevue(),
      premierContactGambit: this.premierContactGambit(),
      premierContactPsps: this.premierContactPsps(),
      premierContactSelfie: this.premierContactSelfie(),
      premierContactIptad: this.premierContactIptad(),
      premierContactSeaf: this.premierContactSeaf(),
    };
  }

  getPremierContactSelectedTasks() {
    return this.gdEmailService.getPremierContactSelectedTasks(this.getGdPremierContactOptions());
  }

  getPremierContactSectionPlainFr(): string {
    return this.gdEmailService.getPremierContactSectionPlainFr(this.getGdPremierContactOptions());
  }

  getPremierContactSectionPlainEn(): string {
    return this.gdEmailService.getPremierContactSectionPlainEn(this.getGdPremierContactOptions());
  }

  getPremierContactEmailPlain(): string {
    const fr = this.getPremierContactSectionPlainFr();
    const en = this.getPremierContactSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getPremierContactSectionHtmlFr(): string {
    return this.gdEmailService.getPremierContactSectionHtmlFr(this.getGdPremierContactOptions());
  }

  getPremierContactSectionHtmlEn(): string {
    return this.gdEmailService.getPremierContactSectionHtmlEn(this.getGdPremierContactOptions());
  }

  getPremierContactEmailHtml(): string {
    const fr = this.getPremierContactSectionHtmlFr();
    const en = this.getPremierContactSectionHtmlEn();
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
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

  translateDateToEn(dateStr: string): string {
    return this.gdEmailService.translateDateToEn(dateStr);
  }

  private getGdAvisFermetureOptions(): GdAvisFermetureOptions {
    return {
      delaiJours: this.avisFermetureDelaiJours(),
      dateStr: this.avisFermetureDate(),
      entrevue: this.avisFermetureEntrevue(),
      medicale: this.avisFermetureMedicale(),
      gambit: this.avisFermetureGambit(),
      psps: this.avisFermeturePsps(),
    };
  }

  getAvisFermetureSectionPlainFr(): string {
    return this.gdEmailService.getAvisFermetureSectionPlainFr(this.getGdAvisFermetureOptions());
  }

  getAvisFermetureSectionPlainEn(): string {
    return this.gdEmailService.getAvisFermetureSectionPlainEn(this.getGdAvisFermetureOptions());
  }

  getAvisFermetureEmailPlain(): string {
    const fr = this.getAvisFermetureSectionPlainFr();
    const en = this.getAvisFermetureSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getAvisFermetureSectionHtmlFr(): string {
    return this.gdEmailService.getAvisFermetureSectionHtmlFr(this.getGdAvisFermetureOptions());
  }

  getAvisFermetureSectionHtmlEn(): string {
    return this.gdEmailService.getAvisFermetureSectionHtmlEn(this.getGdAvisFermetureOptions());
  }

  getAvisFermetureEmailHtml(): string {
    const fr = this.getAvisFermetureSectionHtmlFr();
    const en = this.getAvisFermetureSectionHtmlEn();
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
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

  getAnnexeQSectionPlainFr(): string {
    return this.gdEmailService.getAnnexeQSectionPlainFr(this.annexeQAlphaPostulant());
  }

  getAnnexeQSectionPlainEn(): string {
    return this.gdEmailService.getAnnexeQSectionPlainEn(this.annexeQAlphaPostulant());
  }

  getAnnexeQEmailPlain(): string {
    const fr = this.getAnnexeQSectionPlainFr();
    const en = this.getAnnexeQSectionPlainEn();
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getAnnexeQSectionHtmlFr(): string {
    return this.gdEmailService.getAnnexeQSectionHtmlFr(this.annexeQAlphaPostulant());
  }

  getAnnexeQSectionHtmlEn(): string {
    return this.gdEmailService.getAnnexeQSectionHtmlEn(this.annexeQAlphaPostulant());
  }

  getAnnexeQEmailHtml(): string {
    const fr = this.getAnnexeQSectionHtmlFr();
    const en = this.getAnnexeQSectionHtmlEn();
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
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

  getMedicalPartEn(part: string): string {
    return this.gdEmailService.getMedicalPartEn(part);
  }

  getMedicalSectionHtmlFr(part: string): string {
    return this.gdEmailService.getMedicalSectionHtmlFr(part, this.evaluationMedicaleType() === "Dossier OTA");
  }

  getMedicalSectionHtmlEn(partEn: string): string {
    return this.gdEmailService.getMedicalSectionHtmlEn(partEn, this.evaluationMedicaleType() === "Dossier OTA");
  }

  getMedicalSectionPlainFr(part: string): string {
    return this.gdEmailService.getMedicalSectionPlainFr(part, this.evaluationMedicaleType() === "Dossier OTA");
  }

  getMedicalSectionPlainEn(partEn: string): string {
    return this.gdEmailService.getMedicalSectionPlainEn(partEn, this.evaluationMedicaleType() === "Dossier OTA");
  }

  getMedicalEmailPlain(part: string): string {
    const partEn = this.getMedicalPartEn(part);
    const fr = this.getMedicalSectionPlainFr(part);
    const en = this.getMedicalSectionPlainEn(partEn);
    const sigFr = this.getSignatureFr();
    const sigEn = this.getSignatureEn();
    return `English message will follow.\n\n${fr}\n\n${sigFr}\n\n______________________________________________________________________________\n\n${en}\n\n${sigEn}`;
  }

  getMedicalEmailHtml(part: string): string {
    const partEn = this.getMedicalPartEn(part);
    const sigFr = this.getHtmlSignatureFr();
    const sigEn = this.getHtmlSignatureEn();
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    html += `<p><strong>English message will follow.</strong></p>`;
    html += `<p>Bonjour,</p>`;
    html += this.getMedicalSectionHtmlFr(part);
    html += `<p>${sigFr}</p>`;
    html += `<br><hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><br>`;
    html += `<p>Hello,</p>`;
    html += this.getMedicalSectionHtmlEn(partEn);
    html += `<p>${sigEn}</p>`;
    html += `</div>`;
    return html;
  }

  getMedicalPartsInfo(): { labelFr: string; labelEn: string } | null {
    if (this.evaluationMedicalePartie1()) {
      return { labelFr: 'Partie 1', labelEn: 'Part 1' };
    }
    if (this.evaluationMedicalePartie2()) {
      return { labelFr: 'Partie 2', labelEn: 'Part 2' };
    }
    if (this.evaluationMedicalePartie1Et2()) {
      return { labelFr: 'Partie 1 et 2', labelEn: 'Part 1 and 2' };
    }
    return null;
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
      recruiterDossierType: this.recruiterDossierType(),
      sgtCheckedInstructions: Array.from(this.sgtCheckedInstructions()),
    };
  }

  private applySnapshot(snapshot: RoleSnapshot) {
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
    this.sharedState.testCspnNotCompleted.set(snapshot.testCspnNotCompleted || false);
    this.sharedState.testCspn00182Passed.set(snapshot.testCspn00182Passed || false);
    this.sharedState.testCspn00183Passed.set(snapshot.testCspn00183Passed || false);
    this.sharedState.testCspn00184Passed.set(snapshot.testCspn00184Passed || false);
    this.sharedState.reoMergedEmailHtml.set(snapshot.reoMergedEmailHtml);
    this.sharedState.reoMergedEmailPlain.set(snapshot.reoMergedEmailPlain);
    this.sharedState.reoMergedNote.set(snapshot.reoMergedNote);
  }

  private createFreshSnapshot(role: 'recruiter' | 'gestionnaire'): RoleSnapshot {
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
      testEsomPassed: false,
      testCeopmPassed: false,
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
  recruiterDossierType = signal<'normal' | 'pfor'>('normal');

  // Tuto Marcel State
  showTutoMarcel = signal<boolean>(false);

  openTutoMarcel() {
    this.showTutoMarcel.set(true);
  }

  closeTutoMarcel() {
    this.showTutoMarcel.set(false);
    this.selectedRole.set('none');
  }

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

  setGroupCompliant(group: { tasks: Task[] }, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const currentKeys = new Set(this.compliantDocKeys());
    const currentNotCompleted = new Set(this.taskNotCompletedKeys());
    const currentRejections = new Set(this.selectedRejectionKeys());
    const dossierJobs = this.getDossierJobObjects();

    if (this.isGroupCompliant(group)) {
      // Toggle OFF: Retirer la conformité des tâches de ce groupe
      group.tasks.forEach((task) => {
        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.delete(this.getDocKey(task, doc));
          });
        } else {
          currentKeys.delete(`${task.nameFr}::metiers_docs`);
        }
      });
    } else {
      // Toggle ON: Rendre toutes les tâches du groupe conformes
      group.tasks.forEach((task) => {
        // Enlever des tâches non complétées
        currentNotCompleted.delete(task.nameFr);

        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.add(this.getDocKey(task, doc));
            // Enlever les motifs de rejet
            doc.reasons.forEach((reason) => {
              currentRejections.delete(this.getReasonKey(doc, reason));
              dossierJobs.forEach((j) => {
                currentRejections.delete(this.getJobReasonKey(j, doc, reason));
              });
            });
          });
        } else {
          currentKeys.add(`${task.nameFr}::metiers_docs`);
          task.documents.forEach((doc) => {
            doc.reasons.forEach((reason) => {
              currentRejections.delete(this.getReasonKey(doc, reason));
              dossierJobs.forEach((j) => {
                currentRejections.delete(this.getJobReasonKey(j, doc, reason));
              });
            });
          });
        }
      });
    }

    this.compliantDocKeys.set(currentKeys);
    this.taskNotCompletedKeys.set(currentNotCompleted);
    this.selectedRejectionKeys.set(currentRejections);
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
  copiedEmailCaf101 = signal(false);
  copiedEmailLienPa = signal(false);
  copiedNote = signal(false);

  @ViewChild(JobSearchModalComponent) jobSearchModal!: JobSearchModalComponent;

  constructor() {
    // Keep SharedState isOtaDossier in sync
    effect(() => {
      const isOta = this.isOtaDossier;
      untracked(() => {
        this.sharedState.isOtaDossier.set(isOta);
      });
    });

    // No task selected initially, waiting for stage selection
    effect(() => {
      const note = this.generatedNote();
      const rawHtml = this.getCombinedRawHtmlString(true);
      const rawPlain = this.getCombinedPlainString(true);
      const hasReassigned =
        !this.allTasksCompliant() &&
        (this.hasSelectedRejections() || this.forceGeneralReminder());

      untracked(() => {
        this.sharedState.taskNote.set(note);
        this.sharedState.taskEmailHtmlFr.set(rawHtml);
        this.sharedState.taskEmailFr.set(rawPlain);
        this.sharedState.hasReassignedTasks.set(hasReassigned);
      });
    });

    effect(() => {
      const trigger = this.sharedState.recruiterResetTrigger();
      if (trigger > 0) {
        untracked(() => {
          this.restartApp(false);
        });
      }
    });
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

  restartApp(triggerShared: boolean = true) {
    if (triggerShared) {
      this.sharedState.triggerRecruiterReset();
    }
    this.showJobSearch.set(false);
    this.melService.resetApplicantLimitations();
    this.reorientationCriteria.resetAll();
    this.sharedState.resetSharedRecruiterState();

    this.stage.set("intro");
    this.isUnderAge.set(false);
    this.recruiterDossierType.set("normal");
    this.sharedState.isPostulantPfor.set(false);
    this.pforMatricule.set('');
    this.resetSgtInstructions();
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
    this.premierContactIptad.set(false);
    this.premierContactSeaf.set(false);
    this.premierContactSubPanelMode.set('courriel');
    this.premierContactNoteIptad.set('Complété');
    this.premierContactNoteSeaf.set('Complété');
    this.premierContactNoteEntrevue.set('À faire');
    this.premierContactNoteMedical.set('À faire');
    this.premierContactNotePsps.set('À faire');
    this.premierContactNoteGambit.set('En attente (type 28)');
    this.premierContactNoteAnxQ.set('À faire');

    this.avisFermetureCourriel.set(false);
    this.avisFermetureDelaiJours.set('14');
    this.avisFermetureDate.set('');
    this.avisFermetureEntrevue.set(false);
    this.avisFermetureMedicale.set(false);
    this.avisFermetureGambit.set(false);
    this.avisFermeturePsps.set(false);

    this.annexeQCourriel.set(false);
    this.annexeQAlphaPostulant.set('');
    this.pforMatricule.set('');

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
    this.offreFormulairePpp.set(false);
    this.offreFormulairePcu.set(false);
    this.offreFormulaireCroixSouvenir.set(false);
    this.offreFormulaireBeneficiaire.set(false);
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
    this.testEsomRecruitmentCenterCity.set('Québec');

    // Reset Dossier jobs & Réo shared state
    this.clearDossierJob(1);
    this.clearDossierJob(2);
    this.clearDossierJob(3);
    this.dossierDropdownOpen1.set(false);
    this.dossierDropdownOpen2.set(false);
    this.dossierDropdownOpen3.set(false);

    const current = this.selectedRole();
    if (current === 'recruiter' || current === 'gestionnaire') {
      this.roleSnapshots[current] = this.createFreshSnapshot(current);
    }
  }

  isPforDossier(): boolean {
    return this.sharedState.isPostulantPfor() || this.recruiterDossierType() === 'pfor';
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
      // Toggle OFF: désactiver la conformité de toutes les tâches standard visibles
      const currentKeys = new Set(this.compliantDocKeys());
      this.visibleTasks().forEach((task) => {
        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.delete(this.getDocKey(task, doc));
          });
        } else {
          currentKeys.delete(`${task.nameFr}::metiers_docs`);
        }
      });
      this.compliantDocKeys.set(currentKeys);
    } else {
      // Toggle ON: marquer toutes les tâches standard visibles conformes
      const currentKeys = new Set(this.compliantDocKeys());
      this.visibleTasks().forEach((task) => {
        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.add(this.getDocKey(task, doc));
          });
        } else {
          currentKeys.add(`${task.nameFr}::metiers_docs`);
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
    return this.additionalDocsService.isSubsidizedEducationJob(job);
  }

  isSubsidizedDoc(doc: DocumentItem): boolean {
    return this.additionalDocsService.isSubsidizedDoc(doc);
  }

  isTaskBasedAdditionalDoc(doc: DocumentItem): boolean {
    return this.additionalDocsService.isTaskBasedAdditionalDoc(doc);
  }

  shouldShowAdditionalDoc(doc: DocumentItem): boolean {
    return this.additionalDocsService.shouldShowAdditionalDoc(
      doc,
      this.isPforDossier(),
      this.getDossierJobObjects()
    );
  }

  isAdditionalDocRequiredForJob(docNameFr: string, jobId: string): boolean {
    return this.additionalDocsService.isAdditionalDocRequiredForJob(
      docNameFr,
      jobId,
      this.isPforDossier()
    );
  }

  getJobSpecificDocText(jobId: string, docNameFr: string, isFrench: boolean): string {
    return this.additionalDocsService.getJobSpecificDocText(jobId, docNameFr, isFrench);
  }

  getDisplayLabelForAdditionalDoc(doc: DocumentItem, reason: RejectionReason): string {
    return this.additionalDocsService.getDisplayLabelForAdditionalDoc(
      doc,
      reason,
      this.getDossierJobObjects(),
      this.isPforDossier()
    );
  }

    hasVisibleTaskBasedDocs(task: Task): boolean {
    if (!task || !task.documents) return false;
    return task.documents.some((d) => this.isTaskBasedAdditionalDoc(d) && this.shouldShowDoc(task, d));
  }

  hasVisibleAdditionalDocs(task: Task): boolean {
    if (!task || !task.documents) return false;
    if (this.isPforDossier()) return false;
    const dossierJobs = this.getDossierJobObjects();
    if (dossierJobs.length === 0) return false;
    return dossierJobs.some((j) => this.hasJobAdditionalDocs(task, j));
  }

  hasJobAdditionalDocs(task: Task, job: JobEntry): boolean {
    if (!task || !task.documents || !job) return false;
    if (this.isPforDossier()) return false;
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

    if (currentStage === "intro" || currentStage === "recruiter-dossier-type") {
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

  // Recruiter actions for Minor Check -> Dossier Type flow
  onRecruiterMinorCheckNon() {
    this.isUnderAge.set(false);
    this.stage.set("recruiter-dossier-type");
  }

  backToRecruiterMinorCheck() {
    if (this.isUnderAge()) {
      this.stage.set("minor-check");
      const tasks = this.visibleTasks();
      if (tasks.length > 0) this.selectTask(tasks[0]);
    } else {
      this.stage.set("intro");
    }
  }

  selectRecruiterDossierType(type: 'normal' | 'pfor') {
    this.recruiterDossierType.set(type);
    if (type === 'pfor') {
      this.sharedState.isPostulantPfor.set(true);
    } else {
      this.sharedState.isPostulantPfor.set(false);
    }
    this.stage.set("main");
    const tasks = this.visibleTasks();
    if (tasks.length > 0) this.selectTask(tasks[0]);
  }

  // Action: User clicks "Non" (Adult) or finishes minor check
  startMainProgram() {
    if (this.selectedRole() === "recruiter") {
      this.stage.set("recruiter-dossier-type");
      return;
    }
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
      this.offreHeureArriveePostulant.set('07h30');
      this.offreHeureArriveeInvites.set('09h40');
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
      if (this.isPforDossier()) {
        return true;
      }
      if (this.hasVisibleAdditionalDocs(task)) {
        return this.isAdditionalJobDocsCompliant(task);
      }
      return true;
    }

    const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");

    if (isIdentity) {
      const hasId = task.documents.some(
        (d) =>
          !d.nameFr.toLowerCase().includes("selfie") &&
          !d.nameFr.toLowerCase().includes("invalide") &&
          this.isCompliant(task, d),
      );
      return hasId;
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
      if (
        task.nameFr.includes("Formulaire de demande d'emploi notée") ||
        task.nameFr.includes("Formulaire de demande d’emploi noté")
      ) {
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
      (this.selectedTask()?.nameFr === 'Premier contact' && this.premierContactSubPanelMode() === 'note') ||
      (this.selectedTask()?.nameFr?.includes('Offre') && this.offreSubPanelMode() === 'note') ||
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

    // PFOR Admission Letter: Only visible for PFOR dossiers
    if (doc.nameFr.includes("Lettre d'admission sans condition")) {
      if (this.isDocActive(task, doc)) return true;
      return this.isPforDossier();
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
  rappelCeremonieRalliementChecked = signal(false);
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
  testEsomRecruitmentCenterCity = signal<string>('Québec');

  getTestEsomCenter(): RecruitmentCenter {
    return this.recruitmentCentersList.find(c => c.city === this.testEsomRecruitmentCenterCity()) || this.recruitmentCentersList[0];
  }
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
  offreFormulairePpp = signal<boolean>(false);
  offreFormulairePcu = signal<boolean>(false);
  offreFormulaireCroixSouvenir = signal<boolean>(false);
  offreFormulaireBeneficiaire = signal<boolean>(false);

  toggleOffreFormulairePpp() {
    this.offreFormulairePpp.update(v => !v);
    this.autoActivateOffreEmail();
  }

  toggleOffreFormulairePcu() {
    this.offreFormulairePcu.update(v => !v);
    this.autoActivateOffreEmail();
  }

  toggleOffreFormulaireCroixSouvenir() {
    this.offreFormulaireCroixSouvenir.update(v => !v);
    this.autoActivateOffreEmail();
  }

  toggleOffreFormulaireBeneficiaire() {
    this.offreFormulaireBeneficiaire.update(v => !v);
    this.autoActivateOffreEmail();
  }

  hasAnyOffreFormulairesSupplementaires(): boolean {
    return this.offreFormulairePpp() ||
      this.offreFormulairePcu() ||
      this.offreFormulaireCroixSouvenir() ||
      this.offreFormulaireBeneficiaire();
  }

  getOffreFormulairesSupplementairesPlain(lang: 'fr' | 'en'): string {
    if (!this.hasAnyOffreFormulairesSupplementaires()) {
      return '';
    }

    let txt = '';
    if (lang === 'fr') {
      txt += "Et voici des liens vers des formulaires supplémentaires que vous devez remplir et me renvoyer par courriel.\n";
      if (this.offreFormulairePpp()) {
        txt += "• Identification des plus proches parents : https://simontheriault8-cyber.github.io/Documents/Identification%20des%20plus%20proches%20parents.pdf\n";
      }
      if (this.offreFormulairePcu()) {
        txt += "• Personnes à contacter en cas d'urgence : https://simontheriault8-cyber.github.io/Documents/Personne%20%C3%A0%20contacter%20en%20cas%20d'urgence.pdf\n";
      }
      if (this.offreFormulaireCroixSouvenir()) {
        txt += "• Désignation des récipiendaires de la Croix du souvenir : https://simontheriault8-cyber.github.io/Documents/D%C3%A9signation%20des%20r%C3%A9cipiendaires%20de%20la%20Croix%20du%20souvenir.pdf\n";
      }
      if (this.offreFormulaireBeneficiaire()) {
        txt += "• Désignation ou changement de bénéficiaire : https://simontheriault8-cyber.github.io/Documents/D%C3%A9signation%20ou%20changement%20de%20b%C3%A9n%C3%A9ficiaire.pdf\n";
      }
      txt += "\n";
    } else {
      txt += "And here are links to additional forms that you must complete and return to me by email.\n";
      if (this.offreFormulairePpp()) {
        txt += "• Next of Kin Identification : https://simontheriault8-cyber.github.io/Documents/Identification%20des%20plus%20proches%20parents.pdf\n";
      }
      if (this.offreFormulairePcu()) {
        txt += "• Emergency Contact Notification : https://simontheriault8-cyber.github.io/Documents/Personne%20%C3%A0%20contacter%20en%20cas%20d'urgence.pdf\n";
      }
      if (this.offreFormulaireCroixSouvenir()) {
        txt += "• Designation of Memorial Cross Recipients : https://simontheriault8-cyber.github.io/Documents/D%C3%A9signation%20des%20r%C3%A9cipiendaires%20de%20la%20Croix%20du%20souvenir.pdf\n";
      }
      if (this.offreFormulaireBeneficiaire()) {
        txt += "• Naming or Substitution of a Beneficiary : https://simontheriault8-cyber.github.io/Documents/Naming%20or%20Substitution%20of%20a%20Beneficiary.pdf\n";
      }
      txt += "\n";
    }
    return txt;
  }

  getOffreFormulairesSupplementairesHtml(lang: 'fr' | 'en'): string {
    if (!this.hasAnyOffreFormulairesSupplementaires()) {
      return '';
    }

    let html = '';
    if (lang === 'fr') {
      html += `<p style="margin-top: 10px; margin-bottom: 6px;">Et voici des liens vers des formulaires supplémentaires que vous devez remplir et me renvoyer par courriel.</p>`;
      html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
      if (this.offreFormulairePpp()) {
        html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Identification%20des%20plus%20proches%20parents.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Identification des plus proches parents</a></li>`;
      }
      if (this.offreFormulairePcu()) {
        html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Personne%20%C3%A0%20contacter%20en%20cas%20d'urgence.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Personnes à contacter en cas d'urgence</a></li>`;
      }
      if (this.offreFormulaireCroixSouvenir()) {
        html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/D%C3%A9signation%20des%20r%C3%A9cipiendaires%20de%20la%20Croix%20du%20souvenir.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Désignation des récipiendaires de la Croix du souvenir</a></li>`;
      }
      if (this.offreFormulaireBeneficiaire()) {
        html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/D%C3%A9signation%20ou%20changement%20de%20b%C3%A9n%C3%A9ficiaire.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Désignation ou changement de bénéficiaire</a></li>`;
      }
      html += `</ul>`;
    } else {
      html += `<p style="margin-top: 10px; margin-bottom: 6px;">And here are links to additional forms that you must complete and return to me by email.</p>`;
      html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
      if (this.offreFormulairePpp()) {
        html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Identification%20des%20plus%20proches%20parents.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Next of Kin Identification</a></li>`;
      }
      if (this.offreFormulairePcu()) {
        html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Personne%20%C3%A0%20contacter%20en%20cas%20d'urgence.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Emergency Contact Notification</a></li>`;
      }
      if (this.offreFormulaireCroixSouvenir()) {
        html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/D%C3%A9signation%20des%20r%C3%A9cipiendaires%20de%20la%20Croix%20du%20souvenir.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Designation of Memorial Cross Recipients</a></li>`;
      }
      if (this.offreFormulaireBeneficiaire()) {
        html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Naming%20or%20Substitution%20of%20a%20Beneficiary.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Naming or Substitution of a Beneficiary</a></li>`;
      }
      html += `</ul>`;
    }
    return html;
  }

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

  getUniteAffectationObj(): UniteAffectation {
    const target = this.offreUniteAffectation();
    const session = this.unitesAffectation.find(u => u.id === target || u.uic === target)
      || (target === 'st-jean' ? this.unitesAffectation.find(u => u.id === '3613' || u.uic === '3613') : null)
      || this.unitesAffectation.find(u => u.id === '3613')
      || this.unitesAffectation[0];
    if (!session) return { id: '', nom: 'N/A', adressePlain: '', adresseHtml: '', uic: '' };
    
    let displayNom = session.officialName;
    if (session.id === '3613' || session.uic === '3613' || target === 'st-jean') {
      displayNom = 'ÉCOLE DE LEADERSHIP ET DE RECRUES DES FORCES CANADIENNES';
    }

    return {
      id: session.id || session.uic || target,
      nom: displayNom,
      adressePlain: session.addressPlain,
      adresseHtml: session.addressHtml,
      uic: session.uic || session.id
    };
  }

  isConjointDeFaitSelected(): boolean {
    const st = (this.noteStatutCivil() || '').toLowerCase();
    return st.includes('conjoint') || this.noteConjoint() === 'oui';
  }

  isUic3613Selected(): boolean {
    const unitObj = this.getUniteAffectationObj();
    return unitObj.uic === '3613' || this.offreUniteAffectation() === '3613' || this.offreUniteAffectation() === 'st-jean';
  }

  getOfferFormattedNote(): string {
    return this.gdOfferService.getOfferFormattedNote({
      offreMetier: this.offreMetier(),
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
      dateCourrielConfirmation: this.getEffectiveNoteDateCourrielConfirmation(),
    });
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

  getJourSemaineFr(dateStr: string): string {
    return this.gdEmailService.getJourSemaineFr(dateStr);
  }

  getJourSemaineEn(dateStr: string): string {
    return this.gdEmailService.getJourSemaineEn(dateStr);
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
    if (except !== 'rappelCeremonie') {
      this.rappelCeremonieChecked.set(false);
      this.rappelCeremonieRalliementChecked.set(false);
    }
  }

  togglePremierContactCourriel() {
    const nextVal = !this.premierContactCourriel();
    if (nextVal) {
      this.clearOtherGdEmails('premierContact');
    }
    this.premierContactCourriel.set(nextVal);
  }

  togglePremierContactTask(type: 'medical' | 'entrevue' | 'gambit' | 'psps' | 'selfie' | 'iptad' | 'seaf') {
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
    } else if (type === 'iptad') {
      nextVal = !this.premierContactIptad();
      this.premierContactIptad.set(nextVal);
    } else if (type === 'seaf') {
      nextVal = !this.premierContactSeaf();
      this.premierContactSeaf.set(nextVal);
    }

    if (nextVal || this.premierContactMedical() || this.premierContactEntrevue() || this.premierContactGambit() || this.premierContactPsps() || this.premierContactSelfie() || this.premierContactIptad() || this.premierContactSeaf()) {
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

  onPforMatriculeChange(val: string) {
    this.pforMatricule.set(val);
  }

  getFormattedPforMatricule(): string {
    let raw = this.pforMatricule()?.trim() || '';
    if (raw) {
      if (raw.startsWith('(') && raw.endsWith(')')) {
        raw = raw.substring(1, raw.length - 1).trim();
      }
      return raw || '(xxxxxxxxx)';
    }
    return '(xxxxxxxxx)';
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
    } else {
      this.rappelCeremonieRalliementChecked.set(false);
    }
    this.rappelCeremonieChecked.set(nextVal);
  }

  toggleRappelCeremonieRalliement() {
    const nextVal = !this.rappelCeremonieRalliementChecked();
    if (nextVal) {
      this.clearOtherGdEmails('rappelCeremonie');
      this.rappelCeremonieChecked.set(true);
    }
    this.rappelCeremonieRalliementChecked.set(nextVal);
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

  getRejectionReasonsForCompliantNote(): string {
    const selectedKeys = this.selectedRejectionKeys();
    const taskNotCompletedKeys = this.taskNotCompletedKeys();
    const notes: string[] = [];
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
            if (!reason.isConfirmation) {
              hasNormalReassignment = true;
            }
          }
        }
      }
    }

    if (notes.length === 0) return "";

    const combinedReasons = notes.join(" / ");
    const closureSuffix =
      "Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.";

    let noteTxt = "";
    if (hasNormalReassignment) {
      noteTxt = `${combinedReasons}, la/les tâches réattribuées et courriel explicatif envoyé.`;
    } else {
      noteTxt = `${combinedReasons}.`;
    }

    noteTxt = noteTxt.trim();
    if (noteTxt.endsWith(".")) {
      noteTxt = noteTxt.slice(0, -1);
    }
    noteTxt += ". " + closureSuffix;

    return noteTxt;
  }

  getJobSlotsForPfor(): { index: number; job: JobEntry; failedCe: boolean }[] {
    return [
      { index: 1, job: this.getDossierJob(1), failedCe: this.sharedState.dossierJobFailedCe1() },
      { index: 2, job: this.getDossierJob(2), failedCe: this.sharedState.dossierJobFailedCe2() },
      { index: 3, job: this.getDossierJob(3), failedCe: this.sharedState.dossierJobFailedCe3() },
    ].filter((s): s is { index: number; job: JobEntry; failedCe: boolean } => !!s.job);
  }

  getPforCompliantNoteClean(): string {
    return this.pforEmailService.getPforCompliantNoteClean(
      this.getJobSlotsForPfor(),
      this.getRejectionReasonsForCompliantNote()
    );
  }

  getBigAceCompliantNoteClean(): string {
    return this.rejectionEmailService.getBigAceCompliantNoteClean(
      this.getJobSlotsForPfor(),
      this.getRejectionReasonsForCompliantNote()
    );
  }

  getBigAceCompliantNote(): string {
    let note = this.sharedState.isPostulantPfor() ? this.getPforCompliantNoteClean() : this.getBigAceCompliantNoteClean();
    if (this.triageMedicalRequis()) {
      note += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
    }
    return note;
  }

  getRejectionAndReminderNoteText(): string {
    if (this.selectedEmailBankTemplate() === "verification_edo_vs_pfor") {
      return "Courriel de vérification de programme EDO VS PFOR envoyé au postulant.";
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_age_57") {
      return "Étape 1 (En cours) - Âge maximal d'admissibilité dépassé (57 ans et plus) : Inadmissible pour un enrôlement dans les FAC, courriel envoyé, fermeture du dossier.";
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_pr_3ans") {
      return "Étape 1 (En cours) - Résident permanent de moins de 3 ans (Inadmissible) : Courriel d'inadmissibilité envoyé (résultat du calculateur IRCC +3 ans ou citoyenneté requis avant de repostuler), fermeture du dossier.";
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_non_citoyen_ni_pr") {
      return "Étape 1 (En cours) - Ni citoyen canadien ni résident permanent (Inadmissible) : Inadmissible pour un enrôlement dans les FAC (citoyenneté canadienne ou résidence permanente requise pour repostuler), courriel envoyé, fermeture du dossier.";
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

    const selectedKeys = this.selectedRejectionKeys();
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
    if (this.premierContactSubPanelMode() === 'note' && this.selectedTask()?.nameFr === 'Premier contact') {
      const noteLines: string[] = [
        `IPTAD : ${this.premierContactNoteIptad()}`,
        `SEAF : ${this.premierContactNoteSeaf()}`,
        `Entrevue : ${this.premierContactNoteEntrevue()}`,
        `Médical : ${this.premierContactNoteMedical()}`,
        `PSPS : ${this.premierContactNotePsps()}`,
        `Gambit : ${this.premierContactNoteGambit()}`,
        `ANX Q : ${this.premierContactNoteAnxQ()}`
      ];
      notes.push(noteLines.join('\n'));
    } else if (this.isPremierContactActive()) {
      let msg = "Courriel de premier contact envoyé au postulant.";
      const tasks: string[] = [];
      if (this.premierContactMedical()) tasks.push("Médical");
      if (this.premierContactEntrevue()) tasks.push("Entrevue");
      if (this.premierContactGambit()) tasks.push("Gambit");
      if (this.premierContactPsps()) tasks.push("PSPS");
      if (this.premierContactSelfie()) tasks.push("Selfie");
      if (this.premierContactIptad()) tasks.push("IPTAD");
      if (this.premierContactSeaf()) tasks.push("SEAF");

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

    // 3.6 Tentative communication pour offre Note (Volet GD)
    if (this.selectedEmailBankTemplate() === 'tentative_offre_gd') {
      let tentativeNote = "Tentative de communication effectuer pour l'offre, courriel envoyé au postulant lui demandant de rappeler son GD";
      if (this.triageMedicalRequis()) {
        tentativeNote += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }
      return tentativeNote;
    }

    // 3.7 Vérification Dossier Cadet Note (Volet GD)
    if (this.selectedEmailBankTemplate() === 'verification_dossier_cadet') {
      let cadetNote = "Courriel de vérification de dossier cadet envoyé à MDN.CJRURSCEstJ1RH-CJRRCSUEasternJ1HR.DND@forces.gc.ca.";
      if (this.triageMedicalRequis()) {
        cadetNote += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }
      return cadetNote;
    }

    // 3.8 Bris de bail et entreposage Note (Volet GD)
    if (this.selectedEmailBankTemplate() === 'bris_bail_entreposage') {
      let brisNote = "Transmission des informations et documents requis concernant le bris de bail et l'entreposage.";
      if (this.triageMedicalRequis()) {
        brisNote += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }
      return brisNote;
    }

    // 3.9 Demande NAV/TAN & Claims X - CSPN partie 1 Note (Volet GD)
    if (this.selectedEmailBankTemplate() === 'demande_nav_tan') {
      let navTanNote = "Demande de numéro de NAV/TAN et création de compte claims X envoyée à CRFCQcReclamations@forces.gc.ca pour CSPN partie 1.";
      if (this.triageMedicalRequis()) {
        navTanNote += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }
      return navTanNote;
    }

    // 3.10 Demande d'autorisation pour un CSPN Note (Volet GD)
    if (this.selectedEmailBankTemplate() === 'demande_autorisation_cspn') {
      let cspnNote = "Demande d’autorisation pour un CSPN envoyée.";
      if (this.triageMedicalRequis()) {
        cspnNote += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }
      return cspnNote;
    }

    // 3.11 Documents requis - Conjoint(e) de fait Note (Volet GD)
    if (this.selectedEmailBankTemplate() === 'documents_conjoint_de_fait') {
      let cdfNote = "Courriel de demande de documents pour statut de conjoint(e) de fait envoyé au postulant.";
      if (this.triageMedicalRequis()) {
        cdfNote += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }
      return cdfNote;
    }

    // 3.12 Demande SDPM pour conjoint militaire Note (Volet GD)
    if (this.selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire') {
      let sdpmNote = "Demande de SDPM/MPRR pour conjoint militaire envoyée à CRFCQcAdmin@forces.gc.ca.";
      if (this.triageMedicalRequis()) {
        sdpmNote += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }
      return sdpmNote;
    }

    // 3.13 Test ESOM / Confirmation Note (Volet GD)
    if (this.selectedEmailBankTemplate() === 'test_esom_confirmation') {
      const center = this.getTestEsomCenter();
      let esomNote = `Courriel de convocation au test ESOM envoyé au candidat (${center.city}).`;
      if (this.triageMedicalRequis()) {
        esomNote += "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }
      return esomNote;
    }

    // 4. All tasks compliant Note
    if (this.allTasksCompliant()) {
      notes.push(this.sharedState.isPostulantPfor() ? this.getPforCompliantNoteClean() : this.getBigAceCompliantNoteClean());
    } else {
      // 5. Rejection / Incomplete tasks / Reminder Note
      const rejectionNoteText = this.getRejectionAndReminderNoteText();
      if (rejectionNoteText) {
        notes.push(rejectionNoteText);
      }
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
    if (this.selectedEmailBankTemplate() === "inadmissibilite_age_57") {
      return this.emailScenariosService.getScenario("inadmissibilite_age_57") || null;
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_pr_3ans") {
      return this.emailScenariosService.getScenario("inadmissibilite_pr_3ans") || null;
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_non_citoyen_ni_pr") {
      return this.emailScenariosService.getScenario("inadmissibilite_non_citoyen_ni_pr") || null;
    }

    if (
      this.forceGeneralReminder() &&
      this.selectedRejectionKeys().size === 0
    ) {
      return this.emailScenariosService.getScenario("general_reminder") || null;
    }

    const keysArray = Array.from(this.selectedRejectionKeys()) as string[];

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

  cleanInstructionForText(instruction: string, indent: string = '        '): string {
    return this.rejectionEmailService.cleanInstructionForText(instruction, indent);
  }

  private getCompliantNonMandatoryTasksPlain(lang: 'fr' | 'en' = 'fr'): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0) return "";

    const relevantTasks: { task: Task; items: { doc: DocumentItem; reason: RejectionReason }[]; notCompleted: boolean }[] = [];

    for (const [task, items] of structure.entries()) {
      const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");
      const isFormNote = task.nameFr.includes("Formulaire de demande d'emploi notée") || task.nameFr.includes("Formulaire de demande d’emploi noté");
      const isMdn2977 = task.nameFr.includes("MDN 2977");

      if (isIdentity) {
        const selfieItems = items.filter(i => i.doc.nameFr.toLowerCase().includes("selfie"));
        if (selfieItems.length > 0) {
          relevantTasks.push({ task, items: selfieItems, notCompleted: false });
        }
      } else if (isFormNote || isMdn2977) {
        const notCompleted = this.taskNotCompletedKeys().has(task.nameFr);
        if (items.length > 0 || notCompleted) {
          relevantTasks.push({ task, items, notCompleted });
        }
      }
    }

    if (relevantTasks.length === 0) return "";

    let text = "";
    if (lang === 'fr') {
      text += `Veuillez également compléter ou corriger la/les tâche(s) suivante(s) sur votre portail :`;
      for (const { task, items, notCompleted } of relevantTasks) {
        const taskName = task.nameFr;
        text += `\n\n• ${taskName}`;
        if (notCompleted) {
          text += `\n    ◦ Vous n'avez pas complété cette tâche sur votre portail.`;
          text += `\n      → Veuillez vous connecter à votre portail et la compléter.`;
        }
        const groupedItems = new Map<DocumentItem, { doc: DocumentItem; reason: RejectionReason }[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc)!.push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i) => i.reason.labelFr);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} et ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' et ' + labels[labels.length - 1];
          }

          text += `\n    ◦ ${doc.nameFr} : ${labelsStr}`;

          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            if (!uniqueInstructions.has(item.reason.instructionFr)) {
              uniqueInstructions.add(item.reason.instructionFr);
              text += `\n      → ${this.cleanInstructionForText(item.reason.instructionFr, '        ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              const cleanLink = item.reason.linkFr.replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '$2 ($1)');
              text += `\n      🔗 ${cleanLink}`;
            }
          }
        }
      }
    } else {
      text += `Please also complete or correct the following task(s) on your portal:`;
      for (const { task, items, notCompleted } of relevantTasks) {
        const taskName = task.nameEn || task.nameFr;
        text += `\n\n• ${taskName}`;
        if (notCompleted) {
          text += `\n    ◦ You have not completed this task on your portal.`;
          text += `\n      → Please log in to your portal and complete it.`;
        }
        const groupedItems = new Map<DocumentItem, { doc: DocumentItem; reason: RejectionReason }[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc)!.push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i) => i.reason.labelEn || i.reason.labelFr);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }

          text += `\n    ◦ ${doc.nameEn || doc.nameFr} : ${labelsStr}`;

          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            const instr = item.reason.instructionEn || item.reason.instructionFr;
            if (!uniqueInstructions.has(instr)) {
              uniqueInstructions.add(instr);
              text += `\n      → ${this.cleanInstructionForText(instr, '        ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            const link = item.reason.linkEn || item.reason.linkFr;
            if (link && !uniqueLinks.has(link)) {
              uniqueLinks.add(link);
              const cleanLink = link.replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '$2 ($1)');
              text += `\n      🔗 ${cleanLink}`;
            }
          }
        }
      }
    }

    return text;
  }

  private getCompliantNonMandatoryTasksHtml(lang: 'fr' | 'en' = 'fr'): string {
    const structure = this.getStructuredRejections();
    if (structure.size === 0) return "";

    const relevantTasks: { task: Task; items: { doc: DocumentItem; reason: RejectionReason }[]; notCompleted: boolean }[] = [];

    for (const [task, items] of structure.entries()) {
      const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");
      const isFormNote = task.nameFr.includes("Formulaire de demande d'emploi notée") || task.nameFr.includes("Formulaire de demande d’emploi noté");
      const isMdn2977 = task.nameFr.includes("MDN 2977");

      if (isIdentity) {
        const selfieItems = items.filter(i => i.doc.nameFr.toLowerCase().includes("selfie"));
        if (selfieItems.length > 0) {
          relevantTasks.push({ task, items: selfieItems, notCompleted: false });
        }
      } else if (isFormNote || isMdn2977) {
        const notCompleted = this.taskNotCompletedKeys().has(task.nameFr);
        if (items.length > 0 || notCompleted) {
          relevantTasks.push({ task, items, notCompleted });
        }
      }
    }

    if (relevantTasks.length === 0) return "";

    let html = "";
    if (lang === 'fr') {
      html += `<p><strong>Veuillez également compléter ou corriger la/les tâche(s) suivante(s) sur votre portail :</strong></p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const { task, items, notCompleted } of relevantTasks) {
        const taskName = task.nameFr;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskName}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (notCompleted) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="color: #FF0000; font-weight: bold;">Vous n'avez pas complété cette tâche sur votre portail.</span>`;
          html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; Veuillez vous connecter à votre portail et la compléter.</div>`;
          html += `</li>`;
        }
        const groupedItems = new Map<DocumentItem, { doc: DocumentItem; reason: RejectionReason }[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc)!.push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i) => i.reason.labelFr);
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
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${item.reason.instructionFr.replace(/\n/g, "<br>")}</div>`;
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
    } else {
      html += `<p><strong>Please also complete or correct the following task(s) on your portal:</strong></p>`;
      html += `<ul style="margin-top: 0; padding-left: 20px;">`;
      for (const { task, items, notCompleted } of relevantTasks) {
        const taskName = task.nameEn || task.nameFr;
        html += `<li style="margin-bottom: 15px;"><span style="text-decoration: underline; font-weight: bold;">${taskName}</span>`;
        html += `<ul style="margin-top: 5px; list-style-type: circle; padding-left: 20px;">`;
        if (notCompleted) {
          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="color: #FF0000; font-weight: bold;">You have not completed this task on your portal.</span>`;
          html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; Please log in to your portal and complete it.</div>`;
          html += `</li>`;
        }
        const groupedItems = new Map<DocumentItem, { doc: DocumentItem; reason: RejectionReason }[]>();
        for (const item of items) {
          if (!groupedItems.has(item.doc)) groupedItems.set(item.doc, []);
          groupedItems.get(item.doc)!.push(item);
        }
        for (const [doc, docItems] of groupedItems.entries()) {
          const labels = docItems.map((i) => i.reason.labelEn || i.reason.labelFr);
          let labelsStr = "";
          if (labels.length === 1) {
            labelsStr = labels[0];
          } else if (labels.length === 2) {
            labelsStr = `${labels[0]} and ${labels[1]}`;
          } else {
            labelsStr = labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1];
          }

          html += `<li style="margin-bottom: 10px;">`;
          html += `<span style="background-color: yellow; padding: 0 2px;"><strong>${doc.nameEn || doc.nameFr} : <span style="color: #FF0000;">${labelsStr}</span></strong></span>`;

          const uniqueInstructions = new Set<string>();
          for (const item of docItems) {
            const instr = item.reason.instructionEn || item.reason.instructionFr;
            if (!uniqueInstructions.has(instr)) {
              uniqueInstructions.add(instr);
              html += `<div style="margin-left: 20px; margin-top: 6px; margin-bottom: 8px; line-height: 1.5; color: #000000;">&rarr; ${instr.replace(/\n/g, "<br>")}</div>`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            const link = item.reason.linkEn || item.reason.linkFr;
            if (link && !uniqueLinks.has(link)) {
              uniqueLinks.add(link);
              html += `<div style="margin-left: 20px; margin-top: 4px; color: #000000;">&#128279; ${link}</div>`;
            }
          }
          html += `</li>`;
        }
        html += `</ul></li>`;
      }
      html += `</ul>`;
    }

    return html;
  }

  getCompliantEmailHtml(): string {
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;

    const nonMandatoryTasksHtmlFr = this.getCompliantNonMandatoryTasksHtml('fr');
    const nonMandatoryTasksHtmlEn = this.getCompliantNonMandatoryTasksHtml('en');
    const dossierJobs = this.getDossierJobObjects().filter((j) => j.id !== '00003');

    // --- FRENCH BLOCK ---
    html += `<p><strong>English message will follow.</strong></p>`;
    html += `<p>Bonjour,</p>`;
    html += `<p>Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.</p>`;
    html += `<p>Afin de pouvoir continuer votre processus, vous devrez <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">OBLIGATOIREMENT</span> :</p>`;
    
    html += `<p><strong>1-Vous informer :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    html += `  <li style="margin-bottom: 5px;">Regarder et comprendre le contenu de la présentation suivante : <a href="https://youtu.be/hYzMRYYBnag" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Présentation Forces 101</a></li>`;
    if (dossierJobs.length > 0) {
      const jobLinksFr = dossierJobs.map((j) => this.getPforJobLinkMarkup(j.id, true, true)).join(', ');
      html += `  <li style="margin-bottom: 5px;">Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits : ${jobLinksFr}</li>`;
    } else {
      html += `  <li style="margin-bottom: 5px;">Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits <a href="https://forces.ca/fr/carrieres/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Carrières | Forces armées canadiennes</a></li>`;
    }
    html += `  <li style="margin-bottom: 5px;">Explorer et bien comprendre la section <a href="https://forces.ca/fr/instruction-de-base/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Instruction de base</a> du site Forces.ca</li>`;
    html += `</ul>`;

    html += `<p><strong>2-Après avoir regardé la vidéo, Prendre rendez-vous pour une consultation via le calendrier de votre portail.</strong> <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Lien vers le Portail d'enrôlement des Forces armées canadiennes</a>&nbsp;<span style="background-color: #00FF00; padding: 0 4px; font-weight: 500;">De nouvelles plages horaires ouvriront d’ici 14 jours sur votre portail.</span></p>`;

    html += `<p>Cette consultation auprès d’un recruteur sera nécessaire afin de valider votre connaissance des professions militaires qui vous intéressent, de la nature du cours de qualification militaire de base (QMB) et des exigences que comporte un engagement au sein de la force régulière des Forces armées canadiennes. Cette consultation n’est pas une entrevue officielle. Lorsque votre dossier sera distribué à un gestionnaire de dossier, celui-ci vous attribuera une tâche pour prendre un rendez-vous avec un conseiller en carrière militaire et c’est avec ce conseiller que vous ferez votre entrevue officielle pour un emploie dans les forces armées canadienne.</p>`;

    if (nonMandatoryTasksHtmlFr) {
      html += nonMandatoryTasksHtmlFr;
    }

    html += `<p>Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.</p>`;
    html += `<p>Merci encore et au plaisir de votre faire votre connaissance.</p>`;

    html += `<p>` + this.getHtmlSignatureFr() + `</p>`;

    html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;

    // --- ENGLISH BLOCK ---
    html += `<p>Hello,</p>`;
    html += `<p>Thank you very much for providing your documents and selecting your preferred occupation.</p>`;
    html += `<p>In order to continue your application process, You will be <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">REQUIRED</span> to:</p>`;

    html += `<p><strong>1- Inform yourself :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    html += `  <li style="margin-bottom: 5px;">Watch and understand the content of the following presentation: <a href="https://youtu.be/oKuX_ROtASw" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Forces 101 Presentation</a></li>`;
    if (dossierJobs.length > 0) {
      const jobLinksEn = dossierJobs.map((j) => this.getPforJobLinkMarkup(j.id, false, true)).join(', ');
      html += `  <li style="margin-bottom: 5px;">Watch the video and review the description of the trade(s) you are registered for : ${jobLinksEn}</li>`;
    } else {
      html += `  <li style="margin-bottom: 5px;">Watch the video and review the description of the trade(s) you are registered for. <a href="https://forces.ca/en/careers/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Careers | Canadian Armed Forces</a></li>`;
    }
    html += `  <li style="margin-bottom: 5px;">Explore and fully understand the <a href="https://forces.ca/en/basic-training/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Basic Training</a> section of the Forces.ca website.</li>`;
    html += `</ul>`;

    html += `<p><strong>2-After viewing the video, <span style="font-weight: bold;">Schedule an appointment</span> for a consultation through your portal calendar.</strong> <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Canadian Armed Forces enrolment Portal link</a>&nbsp;<span style="background-color: #00FF00; padding: 0 4px; font-weight: 500;">New time slots will open on your portal within 14 days.</span></p>`;

    html += `<p>This consultation with a recruiter will be required to validate your understanding of the military occupations that interest you, the nature of the Basic Military Qualification (BMQ), and the requirements associated with enrolling in the Regular Force of the Canadian Armed Forces. This consultation is not an official interview. Once your file has been assigned to a file administrator, you will be given a task to schedule an appointment with a Military Career Counsellor. It is with this counsellor that you will complete your official interview for employment with the Canadian Armed Forces.</p>`;

    if (nonMandatoryTasksHtmlEn) {
      html += nonMandatoryTasksHtmlEn;
    }

    html += `<p>If no action is taken, your file will be automatically deactivated after 30 days.</p>`;
    html += `<p>Thank you again, and we look forward to meeting you.</p>`;

    html += `<p>` + this.getHtmlSignatureEn() + `</p>`;

    html += `</div>`;
    return html;
  }

  getCompliantEmailPlain(): string {
    let plain = "";

    const nonMandatoryTasksFr = this.getCompliantNonMandatoryTasksPlain('fr');
    const nonMandatoryTasksEn = this.getCompliantNonMandatoryTasksPlain('en');
    const dossierJobs = this.getDossierJobObjects().filter((j) => j.id !== '00003');

    // --- FRENCH ---
    plain += `English message will follow.\n\n`;
    plain += `Bonjour,\n\n`;
    plain += `Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.\n\n`;
    plain += `Afin de pouvoir continuer votre processus, vous devrez OBLIGATOIREMENT :\n\n`;
    plain += `1-Vous informer :\n`;
    plain += `•\tRegarder et comprendre le contenu de la présentation suivante : Présentation Forces 101 (https://youtu.be/hYzMRYYBnag)\n`;
    if (dossierJobs.length > 0) {
      const jobLinksFr = dossierJobs.map((j) => this.getPforJobLinkMarkup(j.id, true, false)).join(', ');
      plain += `•\tRegarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits : ${jobLinksFr}\n`;
    } else {
      plain += `•\tRegarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits Carrières | Forces armées canadiennes (https://forces.ca/fr/carrieres/)\n`;
    }
    plain += `•\tExplorer et bien comprendre la section Instruction de base du site Forces.ca (https://forces.ca/fr/instruction-de-base/)\n\n`;
    plain += `2-Après avoir regardé la vidéo, Prendre rendez-vous pour une consultation via le calendrier de votre portail. Lien vers le Portail d'enrôlement des Forces armées canadiennes (https://www.cafoap-pclfac.forces.gc.ca/) De nouvelles plages horaires ouvriront d’ici 14 jours sur votre portail.\n\n`;
    plain += `Cette consultation auprès d’un recruteur sera nécessaire afin de valider votre connaissance des professions militaires qui vous intéressent, de la nature du cours de qualification militaire de base (QMB) et des exigences que comporte un engagement au sein de la force régulière des Forces armées canadiennes. Cette consultation n’est pas une entrevue officielle. Lorsque votre dossier sera distribué à un gestionnaire de dossier, celui-ci vous attribuera une tâche pour prendre un rendez-vous avec un conseiller en carrière militaire et c’est avec ce conseiller que vous ferez votre entrevue officielle pour un emploie dans les forces armées canadienne.\n\n`;
    if (nonMandatoryTasksFr) {
      plain += `${nonMandatoryTasksFr}\n\n`;
    }
    plain += `Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.\n\n`;
    plain += `Merci encore et au plaisir de votre faire votre connaissance.\n\n`;
    plain += this.getSignatureFr();

    plain += `\n\n______________________________________________________________________________\n\n`;

    // --- ENGLISH ---
    plain += `Hello,\n\n`;
    plain += `Thank you very much for providing your documents and selecting your preferred occupation.\n\n`;
    plain += `In order to continue your application process, You will be REQUIRED to:\n\n`;
    plain += `1- Inform yourself :\n`;
    plain += `•\tWatch and understand the content of the following presentation: Forces 101 Presentation (https://youtu.be/oKuX_ROtASw)\n`;
    if (dossierJobs.length > 0) {
      const jobLinksEn = dossierJobs.map((j) => this.getPforJobLinkMarkup(j.id, false, false)).join(', ');
      plain += `•\tWatch the video and review the description of the trade(s) you are registered for : ${jobLinksEn}\n`;
    } else {
      plain += `•\tWatch the video and review the description of the trade(s) you are registered for. Careers | Canadian Armed Forces (https://forces.ca/en/careers/)\n`;
    }
    plain += `•\tExplore and fully understand the Basic Training section of the Forces.ca website (https://forces.ca/en/basic-training/)\n\n`;
    plain += `2-After viewing the video, Schedule an appointment for a consultation through your portal calendar. Canadian Armed Forces enrolment Portal link (https://www.cafoap-pclfac.forces.gc.ca/) New time slots will open on your portal within 14 days.\n\n`;
    plain += `This consultation with a recruiter will be required to validate your understanding of the military occupations that interest you, the nature of the Basic Military Qualification (BMQ), and the requirements associated with enrolling in the Regular Force of the Canadian Armed Forces. This consultation is not an official interview. Once your file has been assigned to a file administrator, you will be given a task to schedule an appointment with a Military Career Counsellor. It is with this counsellor that you will complete your official interview for employment with the Canadian Armed Forces.\n\n`;
    if (nonMandatoryTasksEn) {
      plain += `${nonMandatoryTasksEn}\n\n`;
    }
    plain += `If no action is taken, your file will be automatically deactivated after 30 days.\n\n`;
    plain += `Thank you again, and we look forward to meeting you.\n\n`;
    plain += this.getSignatureEn();

    return plain;
  }

  getPforJobLinkMarkup(jobId: string, isFrench: boolean, isHtml: boolean): string {
    return this.pforEmailService.getPforJobLinkMarkup(jobId, isFrench, isHtml);
  }

  getCompliantPforEmailHtml(): string {
    return this.pforEmailService.getCompliantPforEmailHtml(
      this.getDossierJobObjects(),
      this.getCompliantNonMandatoryTasksHtml("fr"),
      this.getCompliantNonMandatoryTasksHtml("en"),
      this.getHtmlSignatureFr(),
      this.getHtmlSignatureEn()
    );
  }

  getPforCaf101HighDemandWarningHtml(lang: "fr" | "en"): string {
    return this.pforEmailService.getPforCaf101HighDemandWarningHtml(lang, this.getDossierJobObjects());
  }

  getPforCaf101HighDemandWarningPlain(lang: "fr" | "en"): string {
    return this.pforEmailService.getPforCaf101HighDemandWarningPlain(lang, this.getDossierJobObjects());
  }

  getCompliantPforEmailPlain(): string {
    return this.pforEmailService.getCompliantPforEmailPlain(
      this.getDossierJobObjects(),
      this.getCompliantNonMandatoryTasksPlain("fr"),
      this.getCompliantNonMandatoryTasksPlain("en"),
      this.getSignatureFr(),
      this.getSignatureEn()
    );
  }

  getCompliantPforLienPaEmailHtml(): string {
    return this.pforEmailService.getCompliantPforLienPaEmailHtml(
      this.getHtmlSignatureFr(),
      this.getHtmlSignatureEn()
    );
  }

  getCompliantPforLienPaEmailPlain(): string {
    return this.pforEmailService.getCompliantPforLienPaEmailPlain(
      this.getSignatureFr(),
      this.getSignatureEn()
    );
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

  buildGdOfferEmailParams(): GdOfferEmailParams {
    const rawDateArrivee = this.offreDateArriveeUnite().trim();
    const debut = this.offreDateCoursDebut().trim();
    const fin = this.offreDateCoursFin().trim();
    let datesCours = "jour / mois / année au jour / mois / année";
    if (debut && fin) {
      datesCours = debut + " au " + fin;
    } else if (debut) {
      datesCours = debut;
    }

    return {
      evaluationMedicaleType: this.evaluationMedicaleType(),
      offreMetier: this.offreMetier(),
      offreProgrammeEnrolement: this.offreProgrammeEnrolement(),
      offreElement: this.offreElement(),
      offreDureeContrat: this.offreDureeContrat(),
      offreEtudesSubventionnees: this.offreEtudesSubventionnees(),
      offreDureeEtudesSubventionnees: this.offreDureeEtudesSubventionnees(),
      dateEnrolFr: this.getOffreDateEnrolementFull("fr"),
      dateEnrolEn: this.getOffreDateEnrolementFull("en"),
      selectedCenter: this.getSelectedRecruitmentCenter(),
      offreLieuEnrolement: this.offreLieuEnrolement(),
      dateArrivee: this.getOffreDateArriveeUniteFull(),
      datesCours: this.getOffreDatesCoursFull() || datesCours,
      hasCourseDates: !!this.offreSerieCours().trim() && !!this.getOffreDatesCoursFull(),
      elementsManquantsBlocksFr: this.getElementsManquantsBlocks("fr"),
      elementsManquantsBlocksEn: this.getElementsManquantsBlocks("en"),
      uniteAffectationObj: this.getUniteAffectationObj(),
      isUic3613: this.isUic3613Selected(),
      isConjointDeFait: this.isConjointDeFaitSelected(),
      city: this.getSelectedRecruitmentCenter()?.city || "Montréal",
      serieCours: this.offreSerieCours().trim(),
      heurePostulant: this.offreHeureArriveePostulant() || "07h30",
      heureInvites: this.offreHeureArriveeInvites() || "09h40",
      jourSemaineFr: this.getJourSemaineFr(rawDateArrivee) || "jour de la semaine",
      jourSemaineEn: this.getJourSemaineEn(rawDateArrivee) || "day of the week",
      dateArriveeFormatted: rawDateArrivee || "jour / mois / année",
      dateEnrolRaw: this.offreDateEnrolement().trim() || "jour / mois / année",
      formulairesSuppPlainFr: this.getOffreFormulairesSupplementairesPlain("fr"),
      formulairesSuppPlainEn: this.getOffreFormulairesSupplementairesPlain("en"),
      formulairesSuppHtmlFr: this.getOffreFormulairesSupplementairesHtml("fr"),
      formulairesSuppHtmlEn: this.getOffreFormulairesSupplementairesHtml("en"),
      sigFr: this.getSignatureFr(),
      sigEn: this.getSignatureEn(),
      sigHtmlFr: this.getHtmlSignatureFr(),
      sigHtmlEn: this.getHtmlSignatureEn(),
    };
  }

  getOffreOtaSectionPlainFr(): string {
    return this.gdOfferService.getOffreOtaSectionPlainFr(this.buildGdOfferEmailParams());
  }

  getOffreOtaSectionPlainEn(): string {
    return this.gdOfferService.getOffreOtaSectionPlainEn(this.buildGdOfferEmailParams());
  }

  getOffreOtaEmailPlain(): string {
    return this.gdOfferService.getOffreOtaEmailPlain(this.buildGdOfferEmailParams());
  }

  getOffreOtaSectionHtmlFr(): string {
    return this.gdOfferService.getOffreOtaSectionHtmlFr(this.buildGdOfferEmailParams());
  }

  getOffreOtaSectionHtmlEn(): string {
    return this.gdOfferService.getOffreOtaSectionHtmlEn(this.buildGdOfferEmailParams());
  }

  getOffreOtaEmailHtml(): string {
    return this.gdOfferService.getOffreOtaEmailHtml(this.buildGdOfferEmailParams());
  }

  getOffreNormaleEmailPlain(): string {
    return this.gdOfferService.getOffreNormaleEmailPlain(this.buildGdOfferEmailParams());
  }

  getOffreNormaleEmailHtml(): string {
    return this.gdOfferService.getOffreNormaleEmailHtml(this.buildGdOfferEmailParams());
  }

  getOffreEtudesSubventionneesEmailPlain(): string {
    return this.gdOfferService.getOffreEtudesSubventionneesEmailPlain(this.buildGdOfferEmailParams());
  }

  getOffreEtudesSubventionneesEmailHtml(): string {
    return this.gdOfferService.getOffreEtudesSubventionneesEmailHtml(this.buildGdOfferEmailParams());
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
              emailFr += `\n      → ${this.cleanInstructionForText(item.reason.instructionFr, '        ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n      🔗 ${this.cleanInstructionForText(item.reason.linkFr, '        ')}`;
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
              emailFr += `\n  → ${this.cleanInstructionForText(item.reason.instructionFr, '    ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n  🔗 ${this.cleanInstructionForText(item.reason.linkFr, '  ')}`;
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
              emailFr += `\n  → ${this.cleanInstructionForText(item.reason.instructionFr, '    ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkFr && !uniqueLinks.has(item.reason.linkFr)) {
              uniqueLinks.add(item.reason.linkFr);
              emailFr += `\n  🔗 ${this.cleanInstructionForText(item.reason.linkFr, '  ')}`;
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
              emailEn += `\n      → ${this.cleanInstructionForText(item.reason.instructionEn, '        ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n      🔗 ${this.cleanInstructionForText(item.reason.linkEn, '        ')}`;
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
              emailEn += `\n  → ${this.cleanInstructionForText(item.reason.instructionEn, '    ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n  🔗 ${this.cleanInstructionForText(item.reason.linkEn, '  ')}`;
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
              emailEn += `\n  → ${this.cleanInstructionForText(item.reason.instructionEn, '    ')}`;
            }
          }
          const uniqueLinks = new Set<string>();
          for (const item of docItems) {
            if (item.reason.linkEn && !uniqueLinks.has(item.reason.linkEn)) {
              uniqueLinks.add(item.reason.linkEn);
              emailEn += `\n  🔗 ${this.cleanInstructionForText(item.reason.linkEn, '  ')}`;
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

  getRappelCeremonieTeamsPlainFr(): string {
    return this.emailBankService.getRappelCeremonieTeamsPlainFr(this.rappelCeremonieLieu());
  }

  getRappelCeremonieTeamsPlainEn(): string {
    return this.emailBankService.getRappelCeremonieTeamsPlainEn(this.rappelCeremonieLieu());
  }

  getRappelCeremonieTeamsHtmlFr(): string {
    return this.emailBankService.getRappelCeremonieTeamsHtmlFr(this.rappelCeremonieLieu());
  }

  getRappelCeremonieTeamsHtmlEn(): string {
    return this.emailBankService.getRappelCeremonieTeamsHtmlEn(this.rappelCeremonieLieu());
  }

  getRappelCeremonieAddress(): string {
    const city = this.rappelCeremonieLieu();
    const center = this.recruitmentCentersList.find(c => c.city === city);
    return center ? center.address : "Adresse du centre";
  }

  getRappelCeremonieSectionPlainFr(): string {
    return this.emailBankService.getRappelCeremonieSectionPlainFr(
      this.rappelCeremonieLieu(),
      this.getRappelCeremonieAddress(),
      this.rappelCeremonieDate(),
      this.rappelCeremonieHeurePostulant(),
      this.rappelCeremonieHeureInvites(),
      this.rappelCeremonieRalliementChecked()
    );
  }

  getRappelCeremonieSectionPlainEn(): string {
    return this.emailBankService.getRappelCeremonieSectionPlainEn(
      this.rappelCeremonieLieu(),
      this.getRappelCeremonieAddress(),
      this.rappelCeremonieDate(),
      this.rappelCeremonieHeurePostulant(),
      this.rappelCeremonieHeureInvites(),
      this.rappelCeremonieRalliementChecked()
    );
  }

  getRappelCeremonieSectionHtmlFr(): string {
    return this.emailBankService.getRappelCeremonieSectionHtmlFr(
      this.rappelCeremonieLieu(),
      this.getRappelCeremonieAddress(),
      this.rappelCeremonieDate(),
      this.rappelCeremonieHeurePostulant(),
      this.rappelCeremonieHeureInvites(),
      this.rappelCeremonieRalliementChecked()
    );
  }

  getRappelCeremonieSectionHtmlEn(): string {
    return this.emailBankService.getRappelCeremonieSectionHtmlEn(
      this.rappelCeremonieLieu(),
      this.getRappelCeremonieAddress(),
      this.rappelCeremonieDate(),
      this.rappelCeremonieHeurePostulant(),
      this.rappelCeremonieHeureInvites(),
      this.rappelCeremonieRalliementChecked()
    );
  }

  getRappelCeremonieEmailPlain(): string {
    return this.emailBankService.getRappelCeremonieEmailPlain(
      this.rappelCeremonieLieu(),
      this.getRappelCeremonieAddress(),
      this.rappelCeremonieDate(),
      this.rappelCeremonieHeurePostulant(),
      this.rappelCeremonieHeureInvites(),
      this.rappelCeremonieRalliementChecked(),
      this.getSignatureFr(),
      this.getSignatureEn()
    );
  }

  getRappelCeremonieEmailHtml(): string {
    return this.emailBankService.getRappelCeremonieEmailHtml(
      this.rappelCeremonieLieu(),
      this.getRappelCeremonieAddress(),
      this.rappelCeremonieDate(),
      this.rappelCeremonieHeurePostulant(),
      this.rappelCeremonieHeureInvites(),
      this.rappelCeremonieRalliementChecked(),
      this.getHtmlSignatureFr(),
      this.getHtmlSignatureEn()
    );
  }

  // Tentative de communication pour offre d'emploi (Volet GD)
  getTentativeOffreGdSectionPlainFr(): string {
    return this.emailBankService.getTentativeOffreGdSectionPlainFr();
  }

  getTentativeOffreGdSectionPlainEn(): string {
    return this.emailBankService.getTentativeOffreGdSectionPlainEn();
  }

  getTentativeOffreGdEmailPlain(): string {
    return this.emailBankService.getTentativeOffreGdEmailPlain(this.getSignatureFr(), this.getSignatureEn());
  }

  getTentativeOffreGdSectionHtmlFr(): string {
    return this.emailBankService.getTentativeOffreGdSectionHtmlFr();
  }

  getTentativeOffreGdSectionHtmlEn(): string {
    return this.emailBankService.getTentativeOffreGdSectionHtmlEn();
  }

  getTentativeOffreGdEmailHtml(): string {
    return this.emailBankService.getTentativeOffreGdEmailHtml(this.getHtmlSignatureFr(), this.getHtmlSignatureEn());
  }

  // Vérification Dossier Cadet (Volet GD)
  getVerificationCadetEmailPlain(): string {
    return this.emailBankService.getVerificationCadetEmailPlain(this.getSignatureFr());
  }

  getVerificationCadetEmailHtml(): string {
    return this.emailBankService.getVerificationCadetEmailHtml(this.getHtmlSignatureFr());
  }

  // Bris de bail et entreposage (Volet GD)
  getBrisBailEntreposageSectionPlainFr(): string {
    return this.emailBankService.getBrisBailEntreposageSectionPlainFr();
  }

  getBrisBailEntreposageSectionPlainEn(): string {
    return this.emailBankService.getBrisBailEntreposageSectionPlainEn();
  }

  getBrisBailEntreposageEmailPlain(): string {
    return this.emailBankService.getBrisBailEntreposageEmailPlain(this.getSignatureFr(), this.getSignatureEn());
  }

  getBrisBailEntreposageSectionHtmlFr(): string {
    return this.emailBankService.getBrisBailEntreposageSectionHtmlFr();
  }

  getBrisBailEntreposageSectionHtmlEn(): string {
    return this.emailBankService.getBrisBailEntreposageSectionHtmlEn();
  }

  getBrisBailEntreposageEmailHtml(): string {
    return this.emailBankService.getBrisBailEntreposageEmailHtml(this.getHtmlSignatureFr(), this.getHtmlSignatureEn());
  }

  // Demande de numéro de NAV/TAN (Volet GD)
  getDemandeNavTanEmailPlain(): string {
    return this.emailBankService.getDemandeNavTanEmailPlain(this.getSignatureFr());
  }

  getDemandeNavTanEmailHtml(): string {
    return this.emailBankService.getDemandeNavTanEmailHtml(this.getHtmlSignatureFr());
  }

  // Demande d'autorisation pour un CSPN (Volet GD)
  getDemandeAutorisationCspnEmailPlain(): string {
    return this.emailBankService.getDemandeAutorisationCspnEmailPlain(this.getSignatureFr());
  }

  getDemandeAutorisationCspnEmailHtml(): string {
    return this.emailBankService.getDemandeAutorisationCspnEmailHtml(this.getHtmlSignatureFr());
  }

  // Documents conjoint de fait (Volet GD)
  getDocumentsConjointDeFaitSectionPlainFr(): string {
    return this.emailBankService.getDocumentsConjointDeFaitSectionPlainFr();
  }

  getDocumentsConjointDeFaitSectionPlainEn(): string {
    return this.emailBankService.getDocumentsConjointDeFaitSectionPlainEn();
  }

  getDocumentsConjointDeFaitEmailPlain(): string {
    return this.emailBankService.getDocumentsConjointDeFaitEmailPlain(this.getSignatureFr(), this.getSignatureEn());
  }

  getDocumentsConjointDeFaitSectionHtmlFr(): string {
    return this.emailBankService.getDocumentsConjointDeFaitSectionHtmlFr();
  }

  getDocumentsConjointDeFaitSectionHtmlEn(): string {
    return this.emailBankService.getDocumentsConjointDeFaitSectionHtmlEn();
  }

  getDocumentsConjointDeFaitEmailHtml(): string {
    return this.emailBankService.getDocumentsConjointDeFaitEmailHtml(this.getHtmlSignatureFr(), this.getHtmlSignatureEn());
  }

  // Demande SDPM conjoint militaire (Volet GD)
  getDemandeSdpmConjointMilitaireEmailPlain(): string {
    return this.emailBankService.getDemandeSdpmConjointMilitaireEmailPlain(this.getSignatureFr());
  }

  getDemandeSdpmConjointMilitaireEmailHtml(): string {
    return this.emailBankService.getDemandeSdpmConjointMilitaireEmailHtml(this.getHtmlSignatureFr());
  }

  // Test ESOM Confirmation (Volet GD)
  getTestEsomConfirmationEmailPlain(): string {
    return this.emailBankService.getTestEsomConfirmationEmailPlain(this.getTestEsomCenter(), this.getSignatureFr());
  }

  getTestEsomConfirmationEmailHtml(): string {
    return this.emailBankService.getTestEsomConfirmationEmailHtml(this.getTestEsomCenter(), this.getHtmlSignatureFr());
  }

    getEmailSubject(): string {
    if (this.sharedState.includeLinkedEmail() && this.sharedState.reoMergedEmailHtml()) {
      return "Forces armées canadiennes/Canadian Armed Forces";
    }
    if (this.selectedEmailBankTemplate() === "demande_nav_tan") {
      return "Demande de numéro de NAV/TAN et création de compte claims X - CSPN partie 1";
    }
    if (this.selectedEmailBankTemplate() === "demande_autorisation_cspn") {
      return "Demande d’autorisation pour un CSPN";
    }
    if (this.selectedEmailBankTemplate() === "documents_conjoint_de_fait") {
      return "Documents requis - Statut de conjoint(e) de fait";
    }
    if (this.selectedEmailBankTemplate() === "demande_sdpm_conjoint_militaire") {
      return "Demande SDPM pour conjoint militaire";
    }
    if (this.selectedEmailBankTemplate() === "test_esom_confirmation") {
      return "TEST ESOM/ Confirmation";
    }
    if (this.selectedEmailBankTemplate() === "verification_dossier_cadet") {
      return "(Vérification Dossier Cadet)";
    }
    if (this.selectedEmailBankTemplate() === "bris_bail_entreposage") {
      return "Bris de bail et Entreposage";
    }
    if (this.selectedEmailBankTemplate() === "tentative_offre_gd") {
      return "Tentative de communication - Offre d'emploi";
    }
    if (this.selectedEmailBankTemplate() === "verification_edo_vs_pfor") {
      return "Vérification de programme EDO VS PFOR";
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_age_57") {
      return "Inadmissibilité - Âge (57 ans et plus)";
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_pr_3ans") {
      return "Inadmissibilité - Résident permanent";
    }
    if (this.isPremierContactActive()) {
      return "Premier contact - Inscription aux Forces armées canadiennes";
    }
    if (this.isAvisFermetureActive()) {
      return "Avis de fermeture de dossier";
    }
    if (this.isAnnexeQActive()) {
      return "Annexe Q - Attestation de sécurité";
    }
    if (this.offreNormaleChecked() || this.offreEtudesSubventionneesChecked()) {
      return "Offre d'emploi - Forces armées canadiennes";
    }
    if (this.rappelCeremonieChecked()) {
      return "Rappel - Cérémonie d'assermentation";
    }
    if (this.isMedicalEvaluationActive()) {
      return "Évaluation médicale - Forces armées canadiennes";
    }
    return "Suivi de votre candidature - Forces armées canadiennes";
  }

  // Consolidated Plain Text Email
  getCombinedPlainString(ignoreMerge: boolean = false): string {
    if (!ignoreMerge && this.sharedState.includeLinkedEmail() && this.sharedState.reoMergedEmailPlain()) {
      return this.sharedState.reoMergedEmailPlain();
    }

    if (this.selectedEmailBankTemplate() === "demande_nav_tan") {
      return this.getDemandeNavTanEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "demande_autorisation_cspn") {
      return this.getDemandeAutorisationCspnEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "documents_conjoint_de_fait") {
      return this.getDocumentsConjointDeFaitEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "demande_sdpm_conjoint_militaire") {
      return this.getDemandeSdpmConjointMilitaireEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "test_esom_confirmation") {
      return this.getTestEsomConfirmationEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "tentative_offre_gd") {
      return this.getTentativeOffreGdEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "verification_dossier_cadet") {
      return this.getVerificationCadetEmailPlain();
    }
    if (this.selectedEmailBankTemplate() === "bris_bail_entreposage") {
      return this.getBrisBailEntreposageEmailPlain();
    }

    const scenario = this.activeEmailScenario();
    if (scenario && (
      scenario.id === "verification_edo_vs_pfor" ||
      scenario.id === "inadmissibilite_age_57" ||
      scenario.id === "inadmissibilite_pr_3ans" ||
      (!this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections())
    )) {
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

    if (this.allTasksCompliant() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.rappelCeremonieChecked()) {
      return this.sharedState.isPostulantPfor() ? this.getCompliantPforEmailPlain() : this.getCompliantEmailPlain();
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
      frBlocks.push(this.sharedState.isPostulantPfor() ? this.getCompliantPforEmailPlain() : this.getCompliantEmailPlain());
    }

    // 5. Rejection / Incomplete tasks / Reminder
    if (!this.allTasksCompliant() && (this.hasSelectedRejections() || (this.forceGeneralReminder() && this.selectedRejectionKeys().size === 0))) {
      const rejFr = this.getRejectionPlainBodyFr();
      const rejEn = this.getRejectionPlainBodyEn();
      if (rejFr) frBlocks.push(rejFr);
      if (rejEn) enBlocks.push(rejEn);
    }

    if (frBlocks.length === 0) return "";

    let plain = `English message will follow.\n\nBonjour,\n\n`;
    plain += frBlocks.join("\n\n--------------------------------------------------\n\n");
    plain += `\n\n` + this.getSignatureFr();

    plain += `\n\n______________________________________________________________________________\n\nHello,\n\n`;
    plain += enBlocks.join("\n\n--------------------------------------------------\n\n");
    plain += `\n\n` + this.getSignatureEn();

    return plain;
  }

  // Plain Text Version (for fallback)
  generatedEmailPlain = computed(() => {
    return this.getCombinedPlainString();
  });


  getCombinedRawHtmlString(ignoreMerge: boolean = false): string {
    if (!ignoreMerge && this.sharedState.includeLinkedEmail() && this.sharedState.reoMergedEmailHtml()) {
      return this.sharedState.reoMergedEmailHtml();
    }

    if (this.selectedEmailBankTemplate() === "demande_nav_tan") {
      return this.getDemandeNavTanEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "demande_autorisation_cspn") {
      return this.getDemandeAutorisationCspnEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "documents_conjoint_de_fait") {
      return this.getDocumentsConjointDeFaitEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "demande_sdpm_conjoint_militaire") {
      return this.getDemandeSdpmConjointMilitaireEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "test_esom_confirmation") {
      return this.getTestEsomConfirmationEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "tentative_offre_gd") {
      return this.getTentativeOffreGdEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "verification_dossier_cadet") {
      return this.getVerificationCadetEmailHtml();
    }
    if (this.selectedEmailBankTemplate() === "bris_bail_entreposage") {
      return this.getBrisBailEntreposageEmailHtml();
    }

    const scenario = this.activeEmailScenario();
    if (scenario && (
      scenario.id === "verification_edo_vs_pfor" ||
      scenario.id === "inadmissibilite_age_57" ||
      scenario.id === "inadmissibilite_pr_3ans" ||
      (!this.isMedicalEvaluationActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.hasSelectedRejections())
    )) {
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

    if (this.allTasksCompliant() && !this.isMedicalEvaluationActive() && !this.isPremierContactActive() && !this.isAvisFermetureActive() && !this.offreNormaleChecked() && !this.offreEtudesSubventionneesChecked() && !this.rappelCeremonieChecked()) {
      return this.sharedState.isPostulantPfor() ? this.getCompliantPforEmailHtml() : this.getCompliantEmailHtml();
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
      frSections.push(this.sharedState.isPostulantPfor() ? this.getCompliantPforEmailHtml() : this.getCompliantEmailHtml());
    }

    // 5. Rejections / Incomplete tasks / Reminder
    if (!this.allTasksCompliant() && (this.hasSelectedRejections() || (this.forceGeneralReminder() && this.selectedRejectionKeys().size === 0))) {
      const rejFr = this.getRejectionHtmlFr();
      const rejEn = this.getRejectionHtmlEn();
      if (rejFr) frSections.push(rejFr);
      if (rejEn) enSections.push(rejEn);
    }

    if (frSections.length === 0) return "";

    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    html += `<p>English message will follow.</p><p>Bonjour,</p>`;
    html += frSections.join('<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 20px 0;">');
    html += `<p>` + this.getHtmlSignatureFr() + `</p>`;

    html += `<hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;"><p>Hello,</p>`;
    html += enSections.join('<hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 20px 0;">');
    html += `<p>` + this.getHtmlSignatureEn() + `</p>`;

    html += `</div>`;
    return html;
  }

  // HTML Version (for rich text display and Copy/Paste)
  generatedEmailHtml = computed((): SafeHtml => {
    const rawHtml = this.getCombinedRawHtmlString();
    return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  });

  isPforCompliant = computed(() => {
    return this.selectedRole() === 'recruiter' && this.sharedState.isPostulantPfor() && this.allTasksCompliant();
  });

  generatedPforCaf101EmailHtml = computed((): SafeHtml => {
    return this.sanitizer.bypassSecurityTrustHtml(this.getCompliantPforEmailHtml());
  });

  generatedPforLienPaEmailHtml = computed((): SafeHtml => {
    return this.sanitizer.bypassSecurityTrustHtml(this.getCompliantPforLienPaEmailHtml());
  });

  getRejectionHtmlFr(): string {
    return this.rejectionEmailService.getRejectionHtmlFr(
      this.getStructuredRejections(),
      this.forceGeneralReminder(),
      this.taskNotCompletedKeys(),
      this.getDossierJobObjects(),
      this.isPforDossier()
    );
  }

  getRejectionHtmlEn(): string {
    return this.rejectionEmailService.getRejectionHtmlEn(
      this.getStructuredRejections(),
      this.forceGeneralReminder(),
      this.taskNotCompletedKeys(),
      this.getDossierJobObjects(),
      this.isPforDossier()
    );
  }

  // Combined Action: Copy HTML to clipboard AND Open Empty Outlook Window
  async exportToOutlook() {
    try {
      const htmlContent = this.getCombinedRawHtmlString();
      const textContent = this.getCombinedPlainString();
      const subject = this.getEmailSubject();

      await this.outlookExportService.copyRichText(htmlContent, textContent);
      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 3000);

      // Open Outlook
      if (this.selectedEmailBankTemplate() === "verification_dossier_cadet") {
        this.outlookExportService.openOutlook(
          "(Vérification Dossier Cadet)",
          "MDN.CJRURSCEstJ1RH-CJRRCSUEasternJ1HR.DND@forces.gc.ca"
        );
        return;
      }
      if (this.selectedEmailBankTemplate() === "demande_nav_tan") {
        this.outlookExportService.openOutlook(
          subject,
          "CRFCQcReclamations@forces.gc.ca"
        );
        return;
      }
      this.outlookExportService.openOutlook(subject);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  }

  async exportToOutlookCaf101() {
    try {
      const htmlContent = this.getCompliantPforEmailHtml();
      const textContent = this.getCompliantPforEmailPlain();
      const subject = "(1/2) Collège militaire canadien - Séance d'information virtuelle/ Canadian Military College - Virtual information session";

      await this.outlookExportService.copyRichText(htmlContent, textContent);
      this.copiedEmailCaf101.set(true);
      setTimeout(() => this.copiedEmailCaf101.set(false), 3000);

      this.outlookExportService.openOutlook(subject);
    } catch (err) {
      console.error("Failed to copy CAF 101 email", err);
    }
  }

  async exportToOutlookLienPa() {
    try {
      const htmlContent = this.getCompliantPforLienPaEmailHtml();
      const textContent = this.getCompliantPforLienPaEmailPlain();
      const subject = "(2/2)Collège militaire canadien - Portail d'admission / Canadian Military College - Admission Portal";

      await this.outlookExportService.copyRichText(htmlContent, textContent);
      this.copiedEmailLienPa.set(true);
      setTimeout(() => this.copiedEmailLienPa.set(false), 3000);

      this.outlookExportService.openOutlook(subject);
    } catch (err) {
      console.error("Failed to copy Lien PA email", err);
    }
  }

  async copyNote() {
    try {
      await this.outlookExportService.copyPlainText(this.displayedNote());
      this.copiedNote.set(true);
      setTimeout(() => this.copiedNote.set(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  }
}
