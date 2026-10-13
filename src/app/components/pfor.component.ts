import { Component, computed, signal, inject, effect, untracked } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { JobDatabaseService } from "../../services/job-database.service";
import { SharedStateService } from "../../services/shared-state.service";
import { MelService } from "../../services/mel.service";
import { ReorientationCriteriaService } from "../../services/reorientation-criteria.service";
import { ScolariteExperienceComponent } from "./scolarite-experience.component";
import { JobEntry } from "../../services/jobs-data";
import { JOB_URLS } from "../data/job-urls.data";
import { MATH_COURSES } from "../data/reorientation-criteria.data";

import { CMR_JOB_DOMAINS, PforEmailBuilderParams } from "../models/pfor.models";
export { CMR_JOB_DOMAINS };
import { PforAdmissibilityService, JobAdmissibilityResult } from "../../services/pfor-admissibility.service";
import { PforNoteService } from "../../services/pfor-note.service";
import { PforEmailBuilderService } from "../../services/pfor-email-builder.service";
import { OutlookExportService } from "../../services/outlook-export.service";

@Component({
  selector: "app-pfor",
  standalone: true,
  imports: [CommonModule, FormsModule, ScolariteExperienceComponent],
  host: { "(document:click)": "onDocumentClick($event)" },
  template: `
    <div class="h-full flex flex-col min-h-0 bg-slate-50">
      <!-- HEADER -->
      <div
        class="p-4 bg-white border-b border-slate-200 shrink-0 flex items-start justify-between relative z-20"
      >
        <div class="flex items-start gap-4">
          <button
            (click)="resetAll()"
            class="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 transition-all text-slate-600 shrink-0 border border-slate-200 mt-1 cursor-pointer"
            title="Réinitialiser le volet PFOR"
          >
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <div>
            <div class="flex items-center gap-3">
              <span class="bg-indigo-600 text-white text-xs font-black px-2 py-0.5 rounded tracking-wider leading-none">PFOR</span>
              <h2 class="text-xl font-bold text-slate-800">
                Postulant PFOR (Programme de formation des officiers de la force régulière)
              </h2>
              @if (jobService.sipDate()) {
                <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100 flex items-center gap-1.5 shadow-sm">
                  <svg class="w-3.5 h-3.5 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                    <path d="M8 14h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 18h.01"></path>
                    <path d="M12 18h.01"></path>
                    <path d="M16 18h.01"></path>
                  </svg>
                  SIP à jour : {{ jobService.sipDate() }}
                </span>
              }
            </div>
            <p class="text-sm text-slate-500 mt-1">
              Évaluation et réorientation dédiées aux candidatures PFOR (Collège militaire royal du Canada & Universités civiles).
            </p>
          </div>
        </div>

        <!-- Header Actions: Options Dropdown -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- Options Dropdown -->
          <div class="relative shrink-0 pfor-options-dropdown-container">
            <button
              (click)="showOptionsDropdown.set(!showOptionsDropdown())"
              class="px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs"
              [class.bg-indigo-50]="activeHeaderOptionsCount() > 0"
              [class.border-indigo-300]="activeHeaderOptionsCount() > 0"
              [class.text-indigo-900]="activeHeaderOptionsCount() > 0"
              [class.bg-white]="activeHeaderOptionsCount() === 0"
              [class.border-slate-300]="activeHeaderOptionsCount() === 0"
              [class.text-slate-700]="activeHeaderOptionsCount() === 0"
            >
              <svg class="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Options</span>
              @if (activeHeaderOptionsCount() > 0) {
                <span class="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {{ activeHeaderOptionsCount() }}
                </span>
              }
            </button>

            @if (showOptionsDropdown()) {
              <div
                class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 flex flex-col gap-2"
              >
                <label class="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    [checked]="ignoreSip()"
                    (change)="toggleIgnoreSip()"
                    class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-800">Inclure les métiers fermés (SIP)</span>
                    <span class="text-[11px] text-slate-500">Affiche tous les métiers PFOR</span>
                  </div>
                </label>

                <label class="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    [checked]="includeTraitement()"
                    (change)="toggleIncludeTraitement()"
                    class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-800">Inclure SIP Traitement</span>
                    <span class="text-[11px] text-slate-500">Prend en compte les quotas de traitement</span>
                  </div>
                </label>

                <label class="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    [checked]="hasMedicalLimitation()"
                    (change)="toggleMedicalLimitation()"
                    class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-800">Limitations médicales (V, CV, H)</span>
                    <span class="text-[11px] text-slate-500">Filtrer selon le profil médical</span>
                  </div>
                </label>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT -->
      <div class="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        <!-- COLONNE GAUCHE : Configuration du candidat PFOR -->
        <div class="flex-1 flex flex-col gap-6">
          <!-- 1. PROFIL DU POSTULANT (ÂGE & CITOYENNETÉ) -->
          <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-4">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
              Profil du postulant
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Âge -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Âge</label>
                <input
                  type="number"
                  [ngModel]="age()"
                  (ngModelChange)="age.set($event)"
                  min="16"
                  max="65"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  placeholder="Ex: 18"
                />
              </div>

              <!-- Citoyenneté -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Statut de citoyenneté</label>
                <select
                  [ngModel]="citizenship()"
                  (ngModelChange)="citizenship.set($event)"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                >
                  <option value="Canadian Citizen">Citoyen canadien</option>
                  <option value="PR > 3 years">Résident permanent admissible</option>
                  <option value="PR < 3 years">Résident permanent inadmissible</option>
                </select>
              </div>
            </div>

            <!-- Message d'admissibilité pour RP < 3 ans -->
            @if (citizenship() === 'PR < 3 years') {
              <div
                class="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3 shadow-sm transition-all duration-300 shrink-0"
              >
                <svg
                  class="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                  <p class="font-bold text-sm">Non admissible</p>
                  <p class="text-xs text-red-700 mt-0.5">
                    Les résidents permanents de moins de trois ans ne sont pas admissibles aux Forces armées canadiennes.
                  </p>
                </div>
              </div>
            }

            <!-- Message d'avertissement limite d'âge -->
            @if (age() !== null && (age()! >= 50 || isCandidateTooOld())) {
              <div
                class="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3 shadow-sm transition-all duration-300 shrink-0"
              >
                <svg
                  class="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                  <p class="font-bold text-sm">
                    {{ age()! >= 57 ? "Âge maximal d'enrôlement dépassé (57 ans et plus)" : "Âge limite dépassé pour les choix de contrats PFOR" }}
                  </p>
                  <p class="text-xs text-red-700 mt-0.5">
                    {{ age()! >= 57
                      ? "57 ans et plus est automatiquement inadmissible aux Forces armées canadiennes. L'âge maximal d'enrôlement admissible est de 56 ans. Le dossier sera fermé."
                      : "L'âge maximal d'admissibilité pour l'enrôlement est de 56 ans (57 ans et plus est automatiquement inadmissible). Pour le PFOR, le postulant doit pouvoir compléter le contrat initial (minimum 10 ans) avant l'âge de 60 ans (admissible = 59 - durée du contrat ou moins, soit 49 ans au maximum pour un contrat de 10 ans)."
                    }}
                  </p>
                </div>
              </div>
            }
          </div>

          <!-- 2. VOLET PFOR & ADMISSION CMR -->
          <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-4">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
              Type de programme PFOR
            </h3>

            <!-- Switch Type PFOR -->
            <div class="grid grid-cols-2 gap-3">
              <button
                (click)="pforType.set('cmr')"
                class="p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer"
                [class.bg-indigo-50]="pforType() === 'cmr'"
                [class.border-indigo-600]="pforType() === 'cmr'"
                [class.ring-2]="pforType() === 'cmr'"
                [class.ring-indigo-600]="pforType() === 'cmr'"
                [class.bg-white]="pforType() !== 'cmr'"
                [class.border-slate-200]="pforType() !== 'cmr'"
              >
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-slate-800">PFOR - CMR</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">Militaire</span>
                </div>
                <span class="text-xs text-slate-500">Collège militaire royal du Canada (Kingston / Saint-Jean)</span>
              </button>

              <button
                (click)="pforType.set('civil')"
                class="p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer"
                [class.bg-indigo-50]="pforType() === 'civil'"
                [class.border-indigo-600]="pforType() === 'civil'"
                [class.ring-2]="pforType() === 'civil'"
                [class.ring-indigo-600]="pforType() === 'civil'"
                [class.bg-white]="pforType() !== 'civil'"
                [class.border-slate-200]="pforType() !== 'civil'"
              >
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-slate-800">PFOR - Civil</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Universités</span>
                </div>
                <span class="text-xs text-slate-500">Universités civiles canadiennes accréditées</span>
              </button>
            </div>

            <!-- Si PFOR CMR : Sélection des domaines d'admission -->
            @if (pforType() === 'cmr') {
              @if (!cmrRefused() && !cmrMinCriteriaNotMet()) {
                <div class="mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Domaines d'admission confirmés au CMR
                    </span>
                  </div>

                  <p class="text-xs text-slate-500 mt-0.5">
                    Sélectionnez le ou les programmes dans lesquels le candidat a reçu une offre d'admission :
                  </p>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <!-- Arts -->
                    <label
                      class="p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all"
                      [class.bg-white]="!cmrArts()"
                      [class.border-slate-200]="!cmrArts()"
                      [class.bg-indigo-50]="cmrArts()"
                      [class.border-indigo-400]="cmrArts()"
                      [class.shadow-xs]="cmrArts()"
                    >
                      <input
                        type="checkbox"
                        [checked]="cmrArts()"
                        (change)="cmrArts.set(!cmrArts())"
                        class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <div class="flex flex-col">
                        <span class="text-xs font-bold text-slate-800">Arts</span>
                        <span class="text-[10px] text-slate-500">Sciences humaines & admin</span>
                      </div>
                    </label>

                    <!-- Sciences -->
                    <label
                      class="p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all"
                      [class.bg-white]="!cmrScience()"
                      [class.border-slate-200]="!cmrScience()"
                      [class.bg-indigo-50]="cmrScience()"
                      [class.border-indigo-400]="cmrScience()"
                      [class.shadow-xs]="cmrScience()"
                    >
                      <input
                        type="checkbox"
                        [checked]="cmrScience()"
                        (change)="cmrScience.set(!cmrScience())"
                        class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <div class="flex flex-col">
                        <span class="text-xs font-bold text-slate-800">Sciences</span>
                        <span class="text-[10px] text-slate-500">Physique, chimie, maths</span>
                      </div>
                    </label>

                    <!-- Génie -->
                    <label
                      class="p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all"
                      [class.bg-white]="!cmrGenie()"
                      [class.border-slate-200]="!cmrGenie()"
                      [class.bg-indigo-50]="cmrGenie()"
                      [class.border-indigo-400]="cmrGenie()"
                      [class.shadow-xs]="cmrGenie()"
                    >
                      <input
                        type="checkbox"
                        [checked]="cmrGenie()"
                        (change)="cmrGenie.set(!cmrGenie())"
                        class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <div class="flex flex-col">
                        <span class="text-xs font-bold text-slate-800">Génie</span>
                        <span class="text-[10px] text-slate-500">Ingénierie & tech</span>
                      </div>
                    </label>
                  </div>
                </div>
              }
            }
          </div>

          <!-- NOUVEAU PANNEAU : INADMISSIBLE AU PFOR (SI CMR) -->
          @if (pforType() === 'cmr') {
            <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-rose-600"></span>
                  Inadmissible au PFOR
                </h3>
                @if (cmrRefused()) {
                  <span class="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                    Refus CMR actif
                  </span>
                } @else if (cmrMinCriteriaNotMet()) {
                  <span class="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                    Critère minimal actif
                  </span>
                }
              </div>

              <p class="text-xs text-slate-500">
                Cochez une option si le candidat ne peut pas être admis au PFOR (CMR) afin d'activer le processus de réorientation vers les métiers de militaire du rang :
              </p>

              <div class="flex flex-col gap-2">
                <!-- Case à cocher : Admissibilité refusé par le CMR -->
                <label
                  class="p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all select-none"
                  [class.bg-rose-50]="cmrRefused()"
                  [class.border-rose-300]="cmrRefused()"
                  [class.text-rose-900]="cmrRefused()"
                  [class.shadow-xs]="cmrRefused()"
                  [class.bg-white]="!cmrRefused()"
                  [class.border-slate-200]="!cmrRefused()"
                  [class.text-slate-800]="!cmrRefused()"
                >
                  <input
                    type="checkbox"
                    id="cmr-refused-checkbox"
                    [checked]="cmrRefused()"
                    (change)="onCmrRefusedChange($any($event.target).checked)"
                    class="rounded text-rose-600 focus:ring-rose-500 w-4 h-4 cursor-pointer"
                  />
                  <div class="flex flex-col">
                    <span class="text-xs font-bold flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                      Admissibilité refusé par le CMR
                    </span>
                    <span class="text-[10px]" [class.text-rose-700]="cmrRefused()" [class.text-slate-500]="!cmrRefused()">
                      Le postulant a été refusé par le CMR et doit être réorienté vers les métiers de militaire du rang
                    </span>
                  </div>
                </label>

                <!-- Case à cocher : Critère minimal pour PFOR non rencontré -->
                <label
                  class="p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all select-none"
                  [class.bg-amber-50]="cmrMinCriteriaNotMet()"
                  [class.border-amber-300]="cmrMinCriteriaNotMet()"
                  [class.text-amber-950]="cmrMinCriteriaNotMet()"
                  [class.shadow-xs]="cmrMinCriteriaNotMet()"
                  [class.bg-white]="!cmrMinCriteriaNotMet()"
                  [class.border-slate-200]="!cmrMinCriteriaNotMet()"
                  [class.text-slate-800]="!cmrMinCriteriaNotMet()"
                >
                  <input
                    type="checkbox"
                    id="cmr-min-criteria-checkbox"
                    [checked]="cmrMinCriteriaNotMet()"
                    (change)="onCmrMinCriteriaChange($any($event.target).checked)"
                    class="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <div class="flex flex-col">
                    <span class="text-xs font-bold flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      Critère minimal pour PFOR non rencontré
                    </span>
                    <span class="text-[10px]" [class.text-amber-700]="cmrMinCriteriaNotMet()" [class.text-slate-500]="!cmrMinCriteriaNotMet()">
                      Le postulant ne possède pas au minimum un diplôme d'études secondaires (DES) pour le PFOR
                    </span>
                  </div>
                </label>
              </div>
            </div>
          }

          <!-- 3. CHOIX ACTUELS AU DOSSIER (MAX 3) (Caché si refus CMR ou critère minimal non rencontré) -->
          @if (!cmrRefused() && !cmrMinCriteriaNotMet()) {
            <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
                  Choix de métiers actuels au dossier
                </h3>
                <span class="text-xs text-slate-400 font-medium">Jusqu'à 3 choix</span>
              </div>

              <div class="space-y-3">
                <!-- Métier 1 -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="text-xs font-semibold text-slate-600">Choix 1 (Principal)</label>
                    @if (jobService.isJobInGestionDesAttentes(selectedDossierJobId1())) {
                      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                        Gestion des attentes (Situation {{ getJobAttentesSituation(selectedDossierJobId1()) }})
                      </span>
                    }
                  </div>
                  <select
                    [ngModel]="selectedDossierJobId1()"
                    (ngModelChange)="selectedDossierJobId1.set($event)"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  >
                    <option value="">-- Aucun choix 1 sélectionné --</option>
                    <option value="00003">00003 - Sans métier</option>
                    @for (job of allPforJobs(); track job.id) {
                      <option [value]="job.id">
                        {{ job.id }} - {{ job.title }} ({{ job.abbreviation }})
                      </option>
                    }
                  </select>
                  @if (selectedDossierJobId1() && selectedDossierJobId1() !== '00003' && age() !== null && age()! > 0) {
                    @let s1 = evaluateJobAdmissibility(selectedDossierJobId1());
                    @if (s1) {
                      @if (!s1.isAgeAdmissible) {
                        <div class="mt-1.5 p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-1.5 font-medium">
                          <svg class="w-4 h-4 text-rose-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span><strong>Âge limite dépassé :</strong> {{ s1.ageReason }}</span>
                        </div>
                      } @else {
                        <div class="mt-1 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Âge admissible : contrat initial de {{ s1.durationYears }} ans (admissible jusqu'à {{ 59 - s1.durationYears }} ans)</span>
                        </div>
                      }
                    }
                  }
                </div>

                <!-- Métier 2 -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="text-xs font-semibold text-slate-600">Choix 2</label>
                    @if (jobService.isJobInGestionDesAttentes(selectedDossierJobId2())) {
                      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                        Gestion des attentes (Situation {{ getJobAttentesSituation(selectedDossierJobId2()) }})
                      </span>
                    }
                  </div>
                  <select
                    [ngModel]="selectedDossierJobId2()"
                    (ngModelChange)="selectedDossierJobId2.set($event)"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  >
                    <option value="">-- Aucun choix 2 sélectionné --</option>
                    @for (job of allPforJobs(); track job.id) {
                      <option [value]="job.id">
                        {{ job.id }} - {{ job.title }} ({{ job.abbreviation }})
                      </option>
                    }
                  </select>
                  @if (selectedDossierJobId2() && selectedDossierJobId2() !== '00003' && age() !== null && age()! > 0) {
                    @let s2 = evaluateJobAdmissibility(selectedDossierJobId2());
                    @if (s2) {
                      @if (!s2.isAgeAdmissible) {
                        <div class="mt-1.5 p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-1.5 font-medium">
                          <svg class="w-4 h-4 text-rose-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span><strong>Âge limite dépassé :</strong> {{ s2.ageReason }}</span>
                        </div>
                      } @else {
                        <div class="mt-1 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Âge admissible : contrat initial de {{ s2.durationYears }} ans (admissible jusqu'à {{ 59 - s2.durationYears }} ans)</span>
                        </div>
                      }
                    }
                  }
                </div>

                <!-- Métier 3 -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="text-xs font-semibold text-slate-600">Choix 3</label>
                    @if (jobService.isJobInGestionDesAttentes(selectedDossierJobId3())) {
                      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                        Gestion des attentes (Situation {{ getJobAttentesSituation(selectedDossierJobId3()) }})
                      </span>
                    }
                  </div>
                  <select
                    [ngModel]="selectedDossierJobId3()"
                    (ngModelChange)="selectedDossierJobId3.set($event)"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  >
                    <option value="">-- Aucun choix 3 sélectionné --</option>
                    @for (job of allPforJobs(); track job.id) {
                      <option [value]="job.id">
                        {{ job.id }} - {{ job.title }} ({{ job.abbreviation }})
                      </option>
                    }
                  </select>
                  @if (selectedDossierJobId3() && selectedDossierJobId3() !== '00003' && age() !== null && age()! > 0) {
                    @let s3 = evaluateJobAdmissibility(selectedDossierJobId3());
                    @if (s3) {
                      @if (!s3.isAgeAdmissible) {
                        <div class="mt-1.5 p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-1.5 font-medium">
                          <svg class="w-4 h-4 text-rose-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span><strong>Âge limite dépassé :</strong> {{ s3.ageReason }}</span>
                        </div>
                      } @else {
                        <div class="mt-1 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Âge admissible : contrat initial de {{ s3.durationYears }} ans (admissible jusqu'à {{ 59 - s3.durationYears }} ans)</span>
                        </div>
                      }
                    }
                  }
                </div>
              </div>
            </div>
          }

          <!-- Section médicale optionnelle -->
          @if (hasMedicalLimitation()) {
            <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm shrink-0 flex flex-col gap-4">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-700">
                Profil Médical minimal
              </h3>
              <div class="flex items-center justify-center overflow-x-auto pb-1 sm:pb-0 w-full">
                <div class="inline-flex border border-slate-300 rounded-lg overflow-hidden bg-slate-50 divide-x divide-slate-300 shadow-sm">
                  <div class="flex flex-col items-center">
                    <div class="px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 border-b border-slate-300 w-full text-center">V</div>
                    <input type="text" [ngModel]="medicalV()" (ngModelChange)="medicalV.set($event)" class="w-12 sm:w-14 px-1 py-1.5 text-center text-sm font-semibold text-slate-800 bg-white outline-none focus:bg-indigo-50 focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 border-b border-slate-300 w-full text-center">CV</div>
                    <input type="text" [ngModel]="medicalCV()" (ngModelChange)="medicalCV.set($event)" class="w-12 sm:w-14 px-1 py-1.5 text-center text-sm font-semibold text-slate-800 bg-white outline-none focus:bg-indigo-50 focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 border-b border-slate-300 w-full text-center">H</div>
                    <input type="text" [ngModel]="medicalH()" (ngModelChange)="medicalH.set($event)" class="w-12 sm:w-14 px-1 py-1.5 text-center text-sm font-semibold text-slate-800 bg-white outline-none focus:bg-indigo-50 focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Si PFOR CMR (Refus CMR / Critère minimal non rencontré) OU Âge dépassé pour les métiers choisis : Panneaux Scolarité et Expérience -->
          @if (showScolariteExperiencePanel()) {
            <div class="p-5 bg-white border border-rose-200 rounded-xl shadow-sm flex flex-col gap-4">
              <div class="flex items-center justify-between border-b border-rose-100 pb-3">
                <div class="flex items-center gap-2">
                  <span class="p-1 px-2 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold font-sans uppercase tracking-wider">
                    Réorientation MR
                  </span>
                  <h3 class="text-sm font-bold text-slate-800">
                    Scolarité et Expérience (Militaire du rang)
                  </h3>
                </div>
                @if (cmrRefused()) {
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    Refus CMR actif
                  </span>
                } @else if (cmrMinCriteriaNotMet()) {
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    Critère minimal non rencontré actif
                  </span>
                } @else {
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    Âge maximal dépassé
                  </span>
                }
              </div>
              <p class="text-xs text-slate-600">
                Sélectionnez les cours réussis et les expériences du candidat pour déterminer la liste des métiers de militaire du rang admissibles pour le courriel de réorientation :
              </p>
              <app-scolarite-experience></app-scolarite-experience>
            </div>
          }
        </div>

        <!-- COLONNE DROITE : Note de registre & Courriel de réorientation -->
        @if (showResultsPanel()) {
          <div
            class="flex flex-col lg:w-5/12 lg:sticky lg:top-4 h-fit gap-4 pr-1"
          >
            <!-- Panneau de la note de registre -->
            <div
              class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden shrink-0"
            >
              <div
                class="p-4 bg-slate-50 border-b border-slate-200 shrink-0 flex items-center justify-between flex-wrap gap-2"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="p-1 px-2 rounded bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold font-sans uppercase tracking-wider"
                  >
                    Registre
                  </span>
                  <h3 class="text-sm font-bold text-slate-800">
                    Note du registre / dossier
                  </h3>
                </div>

                <div>
                  <button
                    (click)="copyNoteRegistry()"
                    class="px-3 py-1.5 text-white rounded-lg transition flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                    [class.bg-emerald-600]="noteCopied()"
                    [class.hover:bg-emerald-700]="noteCopied()"
                    [class.bg-slate-600]="!noteCopied()"
                    [class.hover:bg-slate-700]="!noteCopied()"
                  >
                    @if (noteCopied()) {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="animate-bounce"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Note copiée !
                    } @else {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path
                          d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                        ></path>
                      </svg>
                      Copier la note
                    }
                  </button>
                </div>
              </div>
              <div class="p-4 bg-slate-50/30">
                <div
                  class="bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-700 font-mono select-text leading-relaxed whitespace-pre-wrap break-words"
                >
                  {{ generateNoteRegistry() }}
                </div>
              </div>
            </div>

            <!-- Panneau du courriel -->
            <div
              class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden shrink-0"
            >
              <div
                class="p-4 bg-slate-50 border-b border-slate-200 shrink-0 flex items-center justify-between flex-wrap gap-2"
              >
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="text-sm font-bold text-slate-800">
                    {{ (citizenship() === 'PR < 3 years') ? 'Courriel - Résident permanent inadmissible (Dossier fermé)' : (age() !== null && age()! >= 57) ? 'Courriel - Âge maximal dépassé (Dossier fermé)' : (cmrMinCriteriaNotMet() ? 'Courriel - Critère minimal non rencontré (Réorientation MR)' : (cmrRefused() ? 'Courriel - Refus CMR (Réorientation MR)' : (isAttentesMode() ? 'Courriel - Gestion des attentes' : 'Courriel de réorientation'))) }}
                  </h3>
                  @if (citizenship() === 'PR < 3 years') {
                    <span
                      class="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200"
                    >
                      Inadmissible (RP &lt; 3 ans)
                    </span>
                  } @else if (age() !== null && age()! >= 57) {
                    <span
                      class="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200"
                    >
                      Inadmissible (57+)
                    </span>
                  } @else if (cmrRefused() || cmrMinCriteriaNotMet()) {
                    <span
                      class="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200"
                    >
                      {{ eligibleNcmEvaluation().openJobs.length }} métier(s) MR ouvert(s)
                    </span>
                  } @else if (isAttentesMode()) {
                    <span
                      class="text-xs font-semibold px-2 py-0.5 rounded-full border"
                      [class.bg-purple-100]="attentesSituation() === 1"
                      [class.text-purple-700]="attentesSituation() === 1"
                      [class.border-purple-200]="attentesSituation() === 1"
                      [class.bg-amber-100]="attentesSituation() === 2"
                      [class.text-amber-800]="attentesSituation() === 2"
                      [class.border-amber-200]="attentesSituation() === 2"
                    >
                      {{ attentesSituationsSummary() }}
                    </span>
                  }
                  @if (!cmrRefused() && !cmrMinCriteriaNotMet()) {
                    @if (eligiblePforJobs().length > 0) {
                      <div class="flex gap-2">
                        <span
                          class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full"
                        >
                          {{ eligiblePforJobs().length }} métier(s)
                        </span>
                      </div>
                    } @else {
                      <div class="flex gap-2">
                        <span
                          class="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full"
                        >
                          0 métier PFOR ouvert
                        </span>
                      </div>
                    }
                  }
                </div>

                <div class="flex gap-2 w-full sm:w-auto">
                  <button
                    (click)="exportToOutlook()"
                    [disabled]="!showResultsPanel()"
                    class="flex-1 sm:flex-none justify-center px-3 py-1.5 text-white rounded-lg transition flex items-center gap-1.5 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    [class.bg-emerald-600]="copied()"
                    [class.hover:bg-emerald-700]="copied()"
                    [class.bg-blue-600]="!copied()"
                    [class.hover:bg-blue-700]="!copied()"
                    title="Exporter vers Outlook"
                  >
                    @if (copied()) {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="animate-bounce"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Copié ! Ouverture d'Outlook...
                    } @else {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
                        ></path>
                        <polyline points="14 4 20 4 20 10"></polyline>
                        <line x1="14" y1="10" x2="20" y2="4"></line>
                      </svg>
                      Exporter vers Outlook
                    }
                  </button>
                </div>
              </div>
              <div class="p-4 bg-white">
                <div
                  class="prose prose-slate prose-sm max-w-none text-xs leading-relaxed"
                  [innerHTML]="getReoContentHtmlFr()"
                ></div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [],
})
export class PforComponent {
  private admissibilityService = inject(PforAdmissibilityService);
  private noteService = inject(PforNoteService);
  private emailBuilder = inject(PforEmailBuilderService);
  private outlookExport = inject(OutlookExportService);
  jobService = inject(JobDatabaseService);
  sharedState = inject(SharedStateService);
  melService = inject(MelService);
  sanitizer = inject(DomSanitizer);
  reorientationCriteria = inject(ReorientationCriteriaService);

  constructor() {
    effect(() => {
      if (!this.sharedState.isPostulantPfor()) {
        return;
      }
      const isReoGenerated = this.showResultsPanel();
      untracked(() => {
        this.sharedState.hasReoEmailGenerated.set(isReoGenerated);
      });

      if (!isReoGenerated) {
        untracked(() => {
          this.sharedState.reoMergedEmailHtml.set("");
          this.sharedState.reoMergedEmailPlain.set("");
          this.sharedState.reoMergedNote.set("");
        });
        return;
      }

      const html = this.buildBilingualEmail(true);
      if (html.includes("Veuillez renseigner les critères")) {
        return;
      }
      const plain = this.buildBilingualEmail(false);
      const note = this.generateNoteRegistry();
      untracked(() => {
        this.sharedState.reoMergedEmailHtml.set(html);
        this.sharedState.reoMergedEmailPlain.set(plain);
        this.sharedState.reoMergedNote.set(note);
      });
    });

    effect(() => {
      const trigger = this.sharedState.recruiterResetTrigger();
      if (trigger > 0) {
        untracked(() => {
          this.resetAll();
        });
      }
    });
  }

  // Inputs & Signals
  age = signal<number | null>(18);
  citizenship = signal<string>("Canadian Citizen");
  pforType = signal<"cmr" | "civil">("cmr");

  cmrArts = signal<boolean>(false);
  cmrScience = signal<boolean>(false);
  cmrGenie = signal<boolean>(false);
  cmrRefused = signal<boolean>(false);
  cmrMinCriteriaNotMet = signal<boolean>(false);

  selectedDossierJobId1 = signal<string>("");
  selectedDossierJobId2 = signal<string>("");
  selectedDossierJobId3 = signal<string>("");

  attentesJobsInDossier = computed(() => {
    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean).filter((id) => id !== "00003");
    return dossierIds.filter((id) => this.jobService.isJobInGestionDesAttentes(id));
  });

  isAttentesMode = computed(() => {
    return this.attentesJobsInDossier().length > 0;
  });

  attentesSituation = computed<1 | 2>(() => {
    const jobs = this.attentesJobsInDossier();
    for (const jId of jobs) {
      const pforStatus = this.jobService.getJobPforStatus(jId);
      // Situation 2: operation de traitement est ferme ('f')
      if (pforStatus && pforStatus.traitement === "f") {
        return 2;
      }
    }
    // Situation 1: operation d'admission est ouvert ou ferme et operation de traitement est ouvert ('o')
    return 1;
  });

  attentesSituationsNoteLabel = computed<string>(() => {
    const jobs = this.attentesJobsInDossier();
    const sits = Array.from(new Set(jobs.map((j) => this.getJobAttentesSituation(j))));
    if (sits.length === 0) return "Situation 1";
    if (sits.length === 1) return `Situation ${sits[0]}`;
    return `Situations ${sits.sort().join(" et ")}`;
  });

  attentesSituationsSummary = computed<string>(() => {
    const jobs = this.attentesJobsInDossier();
    const sits = Array.from(new Set(jobs.map((j) => this.getJobAttentesSituation(j))));
    if (sits.length === 0) return "Situation 1 : Traitement ouvert";
    if (sits.length === 1) {
      const s = sits[0];
      return `Situation ${s} : ${s === 1 ? "Traitement ouvert" : "Traitement fermé"}`;
    }
    return `Situations ${sits.sort().join(" & ")}`;
  });

  getJobContractDuration(jobId: string): number {
    return this.admissibilityService.getJobContractDuration(jobId);
  }

    isCandidateTooOld = computed(() => {
    const ageVal = this.age();
    if (ageVal === null || ageVal <= 0) return false;
    if (ageVal > 56) return true;

    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean).filter((id) => id !== "00003");

    if (dossierIds.length > 0) {
      const allDossierExceedAge = dossierIds.every((id) => {
        const s = this.evaluateJobAdmissibility(id);
        return s && !s.isAgeAdmissible;
      });
      if (allDossierExceedAge) return true;
    } else {
      // If no dossier jobs selected yet, check if age reaches limit for any standard PFOR job (min 10 ans => >= 50)
      if (ageVal >= 50) return true;
    }
    return false;
  });

  getJobAttentesSituation(jobId: string): 1 | 2 {
    return this.admissibilityService.getJobAttentesSituation(jobId);
  }

  getJobGestionDesAttentesReasonsFr(id: string): string[] {
    return this.admissibilityService.getJobGestionDesAttentesReasonsFr(id, this.evaluateJobAdmissibility(id));
  }

  getJobGestionDesAttentesReasonsEn(id: string): string[] {
    return this.admissibilityService.getJobGestionDesAttentesReasonsEn(id, this.evaluateJobAdmissibility(id));
  }

  getCmrAdmittedDomainsAttentesFr(): string {
    return this.admissibilityService.getCmrAdmittedDomainsAttentesFr(this.cmrArts(), this.cmrGenie(), this.cmrScience());
  }

  getCmrAdmittedDomainsAttentesEn(): string {
    return this.admissibilityService.getCmrAdmittedDomainsAttentesEn(this.cmrArts(), this.cmrGenie(), this.cmrScience());
  }

    // Options
  showOptionsDropdown = signal<boolean>(false);
  ignoreSip = signal<boolean>(false);
  includeTraitement = signal<boolean>(false);
  hasMedicalLimitation = signal<boolean>(false);

  // Medical
  medicalV = signal<string>("2");
  medicalCV = signal<string>("2");
  medicalH = signal<string>("2");

  // Status feedback
  copied = signal<boolean>(false);
  noteCopied = signal<boolean>(false);

  readonly JOB_URLS = JOB_URLS;

  allPforJobs = computed(() => {
    return this.jobService.getAllJobs().filter((j) => {
      return this.jobService.isPforJob(j);
    });
  });

  currentSipPhase = computed<"admission" | "traitement" | "both">(() => {
    return this.includeTraitement() ? "both" : "admission";
  });

  activeHeaderOptionsCount = computed(() => {
    let count = 0;
    if (this.hasMedicalLimitation()) count++;
    return count;
  });

  onCmrRefusedChange(checked: boolean) {
    this.cmrRefused.set(checked);
    if (checked) {
      this.cmrMinCriteriaNotMet.set(false);
      this.cmrArts.set(false);
      this.cmrScience.set(false);
      this.cmrGenie.set(false);
    }
  }

  onCmrMinCriteriaChange(checked: boolean) {
    this.cmrMinCriteriaNotMet.set(checked);
    if (checked) {
      this.cmrRefused.set(false);
      this.cmrArts.set(false);
      this.cmrScience.set(false);
      this.cmrGenie.set(false);
    }
  }

  eligibleNcmEvaluation = computed(() => {
    return this.reorientationCriteria.evaluateEligibleNcmJobs({
      age: this.age(),
      citizenship: this.citizenship(),
      ignoreSip: this.ignoreSip(),
      currentSipPhase: this.currentSipPhase(),
      hasMedicalLimitation: this.hasMedicalLimitation(),
      medicalV: this.medicalV(),
      medicalCV: this.medicalCV(),
      medicalH: this.medicalH(),
    });
  });

  hasAgeInadmissibilityInDossier = computed(() => {
    const ageVal = this.age();
    if (ageVal === null || ageVal <= 0 || ageVal >= 57) return false;

    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean).filter((id) => id !== "00003");

    if (dossierIds.length > 0) {
      return dossierIds.some((id) => {
        const s = this.evaluateJobAdmissibility(id);
        return s && !s.isAgeAdmissible;
      });
    }

    return false;
  });

  showScolariteExperiencePanel = computed(() => {
    if (this.pforType() === "cmr" && (this.cmrRefused() || this.cmrMinCriteriaNotMet())) {
      return true;
    }

    const ageVal = this.age();
    if (ageVal !== null && ageVal > 0 && ageVal < 57) {
      if (this.isCandidateTooOld() || this.hasAgeInadmissibilityInDossier()) {
        return true;
      }
    }

    return false;
  });

  showResultsPanel = computed(() => {
    if (this.citizenship() === "PR < 3 years") {
      return true;
    }
    if (this.age() !== null && this.age()! >= 57) {
      return true;
    }
    if (this.cmrRefused() || this.cmrMinCriteriaNotMet()) {
      return true;
    }

    const hasDossierJob = !!(
      this.selectedDossierJobId1() ||
      this.selectedDossierJobId2() ||
      this.selectedDossierJobId3()
    );

    if (!hasDossierJob) {
      return false;
    }

    if (this.isCandidateTooOld()) {
      return true;
    }

    if (this.pforType() === "cmr") {
      const hasCmrDomain =
        this.cmrArts() || this.cmrScience() || this.cmrGenie();
      return hasCmrDomain || this.eligiblePforJobs().length > 0;
    } else {
      return true;
    }
  });

  eligiblePforJobs = computed<JobEntry[]>(() => {
    if (this.citizenship() === "PR < 3 years") return [];
    const ageVal = this.age();
    if (ageVal !== null && (ageVal > 56 || ageVal >= 60)) return [];

    let candidateJobIds: string[] = [];

    if (this.pforType() === "cmr") {
      if (this.cmrRefused() || this.cmrMinCriteriaNotMet()) {
        return [];
      }

      const arts = this.cmrArts();
      const science = this.cmrScience();
      const genie = this.cmrGenie();

      if (!arts && !science && !genie) {
        return [];
      }

      for (const [jId, cmrInfo] of Object.entries(CMR_JOB_DOMAINS)) {
        const match =
          (arts && cmrInfo.arts) ||
          (science && cmrInfo.science) ||
          (genie && cmrInfo.genie);
        if (match) candidateJobIds.push(jId);
      }
    } else {
      // PFOR Civil
      for (const j of this.jobService.getAllJobs()) {
        if (this.jobService.hasPforProgram(j.id, this.currentSipPhase())) {
          candidateJobIds.push(j.id);
        }
      }
    }

    const result: JobEntry[] = [];
    for (const jId of candidateJobIds) {
      if (!this.jobService.hasPforProgram(jId, this.currentSipPhase())) continue;
      if (this.citizenship() === "PR > 3 years" && !this.jobService.isJobRp(jId)) continue;
      if (!this.ignoreSip() && this.jobService.isPforJobClosed(jId, this.currentSipPhase())) continue;

      const job = this.jobService.getJobById(jId);
      if (job) {
        if (ageVal !== null && ageVal > 0) {
          const durationYears = this.getJobContractDuration(jId);
          if (ageVal + durationYears >= 60) continue;
        }
        result.push(job);
      }
    }

    return result;
  });

  analyzedDossierChoices = computed(() => {
    const selectedIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean);

    return selectedIds.map((id) => {
      const job = this.jobService.getJobById(id) || ({
        id,
        title: id,
        abbreviation: "",
      } as JobEntry);

      const hasPfor = this.jobService.hasPforProgram(id, this.currentSipPhase());
      const isPforClosed = this.jobService.isPforJobClosed(id, this.currentSipPhase());

      let isEligible = true;
      let reasonFr = "";
      let reasonEn = "";

      if (id === "00003") {
        return {
          job,
          isEligible: false,
          reasonFr: "Sans métier",
          reasonEn: "No occupation",
        };
      }

      const s = this.evaluateJobAdmissibility(id);

      if (this.citizenship() === "PR < 3 years") {
        isEligible = false;
        reasonFr = "Résident permanent de moins de 3 ans";
        reasonEn = "Permanent resident under 3 years";
      } else if (this.citizenship() === "PR > 3 years" && !this.jobService.isJobRp(id)) {
        isEligible = false;
        reasonFr = "Pour diverses raisons, ce métier n'est pas accessible aux résidents permanents.";
        reasonEn = "For various reasons, this occupation is not open to permanent residents.";
      } else if (s && !s.isAgeAdmissible) {
        isEligible = false;
        reasonFr = s.ageReason;
        reasonEn = s.ageReasonEn;
      } else if (this.pforType() === "cmr") {
        if (this.cmrRefused()) {
          isEligible = false;
          reasonFr = "Candidat non admis au Collège militaire royal du Canada (CMR). Réorientation nécessaire.";
          reasonEn = "Candidate not admitted to the Royal Military College of Canada (RMC). Reorientation required.";
        } else if (this.cmrMinCriteriaNotMet()) {
          isEligible = false;
          reasonFr = "Critère minimal pour le PFOR non rencontré (DES requis). Réorientation nécessaire.";
          reasonEn = "Minimum requirement for ROTP not met (High school diploma required). Reorientation required.";
        } else {
          const cmrInfo = CMR_JOB_DOMAINS[id];
          if (!cmrInfo) {
            isEligible = false;
            reasonFr = "Ce métier n'est pas offert au CMR sous le PFOR.";
            reasonEn = "This occupation is not offered at RMC under ROTP.";
          } else {
          const arts = this.cmrArts();
          const science = this.cmrScience();
          const genie = this.cmrGenie();
          const match =
            (arts && cmrInfo.arts) ||
            (science && cmrInfo.science) ||
            (genie && cmrInfo.genie);

          if (!match) {
            isEligible = false;
            const reqFr = this.getCmrJobRequiredDomainsFr(id);
            const admFr = this.getCmrAdmittedDomainsFr();
            reasonFr = `Requiert admission au CMR en ${reqFr} (actuellement admis en : ${admFr || "aucun"}).`;
            reasonEn = `Requires admission to RMC in ${this.getCmrJobRequiredDomainsEn(id)}.`;
          } else if (!hasPfor || isPforClosed) {
            isEligible = false;
            reasonFr = "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).";
            reasonEn = "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).";
          }
        }
      }
    } else {
        // Civil
        if (!hasPfor) {
          isEligible = false;
          reasonFr = "Ce métier ne comporte aucune position pour le PFOR Civil.";
          reasonEn = "No positions available for Civil ROTP.";
        } else if (isPforClosed) {
          isEligible = false;
          reasonFr = "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).";
          reasonEn = "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).";
        }
      }

      return {
        job,
        isEligible,
        reasonFr,
        reasonEn,
      };
    });
  });

  needsReorientation = computed(() => {
    const choices = this.analyzedDossierChoices();
    if (choices.length === 0) return true;
    return choices.some((c) => !c.isEligible);
  });

  getCmrAdmittedDomainsNoteFr(): string {
    return this.admissibilityService.getCmrAdmittedDomainsNoteFr(this.cmrArts(), this.cmrScience(), this.cmrGenie());
  }

  getCmrAdmittedDomainsFr(): string {
    return this.admissibilityService.getCmrAdmittedDomainsFr(this.cmrArts(), this.cmrScience(), this.cmrGenie());
  }

  getCmrAdmittedDomainsEn(): string {
    return this.admissibilityService.getCmrAdmittedDomainsEn(this.cmrArts(), this.cmrScience(), this.cmrGenie());
  }

  getCmrJobRequiredDomainsFr(jobId: string): string {
    return this.admissibilityService.getCmrJobRequiredDomainsFr(jobId);
  }

  getCmrJobRequiredDomainsEn(jobId: string): string {
    return this.admissibilityService.getCmrJobRequiredDomainsEn(jobId);
  }

    toggleIgnoreSip() {
    this.ignoreSip.update((v) => !v);
  }

  toggleIncludeTraitement() {
    this.includeTraitement.update((v) => !v);
  }

  toggleMedicalLimitation() {
    this.hasMedicalLimitation.update((v) => !v);
  }

  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.showOptionsDropdown() && !target.closest(".pfor-options-dropdown-container")) {
      this.showOptionsDropdown.set(false);
    }
  }

  resetAll() {
    this.age.set(18);
    this.citizenship.set("Canadian Citizen");
    this.pforType.set("cmr");
    this.cmrArts.set(false);
    this.cmrScience.set(false);
    this.cmrGenie.set(false);
    this.cmrRefused.set(false);
    this.cmrMinCriteriaNotMet.set(false);
    this.selectedDossierJobId1.set("");
    this.selectedDossierJobId2.set("");
    this.selectedDossierJobId3.set("");
    this.ignoreSip.set(false);
    this.includeTraitement.set(false);
    this.hasMedicalLimitation.set(false);
    this.reorientationCriteria.resetAll();
  }

  getJobLinkMarkup(jobId: string, isFrench: boolean, isHtml: boolean): string {
    return this.emailBuilder.getJobLinkMarkup(jobId, isFrench, isHtml);
  }

  evaluateJobAdmissibility(jobId: string): JobAdmissibilityResult {
    return this.admissibilityService.evaluateJobAdmissibility(jobId, {
      age: this.age(),
      citizenship: this.citizenship(),
      pforType: this.pforType(),
      cmrRefused: this.cmrRefused(),
      cmrMinCriteriaNotMet: this.cmrMinCriteriaNotMet(),
      cmrArts: this.cmrArts(),
      cmrScience: this.cmrScience(),
      cmrGenie: this.cmrGenie(),
      currentSipPhase: this.currentSipPhase(),
      hasMedicalLimitation: this.hasMedicalLimitation(),
      medicalV: this.medicalV(),
      medicalCV: this.medicalCV(),
      medicalH: this.medicalH(),
    });
  }

    generateNoteRegistry(): string {
    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean);

    return this.noteService.generateNoteRegistry({
      age: this.age(),
      citizenship: this.citizenship(),
      dossierIds,
      isAttentesMode: this.isAttentesMode(),
      isCandidateTooOld: this.isCandidateTooOld(),
      pforType: this.pforType(),
      cmrRefused: this.cmrRefused(),
      cmrMinCriteriaNotMet: this.cmrMinCriteriaNotMet(),
      cmrDomains: this.getCmrAdmittedDomainsNoteFr(),
      choices: this.analyzedDossierChoices(),
      getJobAttentesSituation: (id) => this.getJobAttentesSituation(id),
      taskNote: this.sharedState.taskNote(),
      includeLinkedEmail: this.sharedState.includeLinkedEmail(),
      hasReassignedTasks: this.sharedState.hasReassignedTasks(),
      showResultsPanel: this.showResultsPanel(),
    });
  }

    async copyNoteRegistry() {
    const text = this.generateNoteRegistry();
    try {
      await navigator.clipboard.writeText(text);
      this.noteCopied.set(true);
      setTimeout(() => this.noteCopied.set(false), 2000);
    } catch (err) {
      console.error("Failed to copy note", err);
    }
  }

  private buildEmailParams(): PforEmailBuilderParams {
    return {
      age: this.age(),
      citizenship: this.citizenship(),
      isAttentesMode: this.isAttentesMode(),
      isCandidateTooOld: this.isCandidateTooOld(),
      pforType: this.pforType(),
      cmrRefused: this.cmrRefused(),
      cmrMinCriteriaNotMet: this.cmrMinCriteriaNotMet(),
      showResultsPanel: this.showResultsPanel(),
      selectedDossierJobId1: this.selectedDossierJobId1(),
      selectedDossierJobId2: this.selectedDossierJobId2(),
      selectedDossierJobId3: this.selectedDossierJobId3(),
      attentesSituation: this.attentesSituation(),
      cmrArts: this.cmrArts(),
      cmrScience: this.cmrScience(),
      cmrGenie: this.cmrGenie(),
      eligiblePforJobs: this.eligiblePforJobs(),
      eligibleNcmEvaluation: this.eligibleNcmEvaluation(),
      ignoreSip: this.ignoreSip(),
      currentSipPhase: this.currentSipPhase(),
      showScolariteExperiencePanel: this.showScolariteExperiencePanel(),
      hasAgeInadmissibilityInDossier: this.hasAgeInadmissibilityInDossier(),
      evaluateJobAdmissibility: (id) => this.evaluateJobAdmissibility(id),
    };
  }

  buildGestionDesAttentesEmail(isHtml: boolean): string {
    return this.emailBuilder.buildGestionDesAttentesEmail(isHtml, this.buildEmailParams());
  }

  getCmrMinMissingCriteriaFr(): string[] {
    return this.emailBuilder.getCmrMinMissingCriteriaFr(this.buildEmailParams());
  }

  formatCmrMinCriteriaParagraphFr(): string {
    return this.emailBuilder.formatCmrMinCriteriaParagraphFr(this.buildEmailParams());
  }

  getCmrMinMissingCriteriaEn(): string[] {
    return this.emailBuilder.getCmrMinMissingCriteriaEn(this.buildEmailParams());
  }

  formatCmrMinCriteriaParagraphEn(): string {
    return this.emailBuilder.formatCmrMinCriteriaParagraphEn(this.buildEmailParams());
  }

  buildCmrRefusalEmail(isHtml: boolean): string {
    return this.emailBuilder.buildCmrRefusalEmail(isHtml, this.buildEmailParams());
  }

  buildBilingualEmail(isHtml: boolean): string {
    return this.emailBuilder.buildBilingualEmail(isHtml, this.buildEmailParams());
  }

    getReoContentHtmlFr(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.buildBilingualEmail(true),
    );
  }

  async exportToOutlook() {
    const html = this.buildBilingualEmail(true);
    const plain = this.buildBilingualEmail(false);
    const subject = "Forces armées canadiennes/Canadian Armed Forces";

    try {
      await this.outlookExport.copyRichText(html, plain);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
      this.outlookExport.openOutlook(subject);
    } catch (err) {
      console.error("Failed to export PFOR email to Outlook", err);
    }
  }

    async copyBilingualEmail() {
    return this.exportToOutlook();
  }
}
