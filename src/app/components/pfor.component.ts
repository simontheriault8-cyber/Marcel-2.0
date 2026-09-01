import { Component, computed, signal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { JobDatabaseService } from "../../services/job-database.service";
import { SharedStateService } from "../../services/shared-state.service";
import { MelService, MEL_LIMITATIONS } from "../../services/mel.service";
import { JobEntry } from "../../services/jobs-data";

export const CMR_JOB_DOMAINS: Record<
  string,
  { arts: boolean; genie: boolean; science: boolean }
> = {
  "00178": { arts: true, genie: true, science: true }, // Pilote
  "00179": { arts: true, genie: true, science: true }, // OSRAC (Air Combat Systems Officer)
  "00180": { arts: true, genie: true, science: true }, // OCA (Aerospace Control Officer)
  "00181": { arts: false, genie: true, science: true }, // Officier du génie aérospatial (AERE)
  "00182": { arts: true, genie: true, science: true }, // Blindé (Armour)
  "00183": { arts: true, genie: true, science: true }, // Artillerie
  "00184": { arts: true, genie: true, science: true }, // Infanterie
  "00185": { arts: false, genie: true, science: true }, // Génie de combat
  "00187": { arts: false, genie: true, science: true }, // Officier des transmissions (Sigs)
  "00189": { arts: false, genie: true, science: false }, // Officier du génie électrique et mécanique (GEM)
  "00203": { arts: true, genie: false, science: false }, // Logistique
  "00207": { arts: true, genie: true, science: true }, // Officier de guerre navale (OGN)
  "00208": { arts: true, genie: false, science: false }, // Officier de développement de l'instruction (ODI)
  "00213": { arts: true, genie: true, science: true }, // Renseignement (Int)
  "00214": { arts: true, genie: false, science: false }, // Police militaire (PM)
  "00328": { arts: true, genie: true, science: true }, // Opérations maritimes et de surface
  "00340": { arts: false, genie: true, science: true }, // Génie maritime des systèmes de combat
  "00341": { arts: false, genie: true, science: true }, // Génie maritime des systèmes de coque et de propulsion
  "00344": { arts: false, genie: true, science: true }, // Cyberopérations
  "00345": { arts: false, genie: true, science: true }, // Opérations spatiales
  "00389": { arts: true, genie: true, science: true }, // Affaires publiques (PAO)
  "00398": { arts: true, genie: false, science: false }, // Administration du personnel
};

@Component({
  selector: "app-pfor",
  standalone: true,
  imports: [CommonModule, FormsModule],
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

        <!-- Options Dropdown -->
        <div class="relative shrink-0 pfor-options-dropdown-container">
          <button
            type="button"
            (click)="showOptionsDropdown.set(!showOptionsDropdown())"
            class="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all active:scale-95 cursor-pointer text-xs font-bold shadow-xs"
            [class.bg-indigo-50]="activeHeaderOptionsCount() > 0"
            [class.border-indigo-300]="activeHeaderOptionsCount() > 0"
            [class.text-indigo-950]="activeHeaderOptionsCount() > 0"
            [class.bg-white]="activeHeaderOptionsCount() === 0"
            [class.border-slate-200]="activeHeaderOptionsCount() === 0"
            [class.text-slate-700]="activeHeaderOptionsCount() === 0"
            [class.hover:bg-slate-50]="activeHeaderOptionsCount() === 0"
            title="Options supplémentaires"
          >
            <svg
              class="w-4 h-4"
              [class.text-indigo-600]="activeHeaderOptionsCount() > 0"
              [class.text-slate-500]="activeHeaderOptionsCount() === 0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span>Options</span>
            @if (activeHeaderOptionsCount() > 0) {
              <span class="px-2 py-0.5 bg-indigo-600 text-white rounded-full text-[10px] font-extrabold shadow-xs">
                {{ activeHeaderOptionsCount() }}
              </span>
            }
            <svg
              class="w-3.5 h-3.5 transition-transform duration-200"
              [class.rotate-180]="showOptionsDropdown()"
              [class.text-indigo-600]="activeHeaderOptionsCount() > 0"
              [class.text-slate-400]="activeHeaderOptionsCount() === 0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          @if (showOptionsDropdown()) {
            <div
              class="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 flex flex-col gap-2.5"
            >
              <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                <span class="text-xs font-black uppercase tracking-wider text-slate-600">Options du volet PFOR</span>
                @if (activeHeaderOptionsCount() > 0) {
                  <span class="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {{ activeHeaderOptionsCount() }} active(s)
                  </span>
                }
              </div>

              <div class="flex flex-col gap-2.5 pt-1">
                <label
                  class="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer select-none p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all shrink-0 cursor-pointer"
                    [checked]="sharedState.includeLinkedEmail()"
                    (change)="toggleIncludeReo()"
                  />
                  <span class="relative flex items-center">
                    <svg
                      class="absolute -left-[1.25rem] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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

                <label
                  class="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer select-none p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all shrink-0 cursor-pointer"
                    [checked]="ignoreSip()"
                    (change)="toggleIgnoreSip()"
                  />
                  <span class="relative flex items-center">
                    <svg
                      class="absolute -left-[1.25rem] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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
                    Ignorer le SIP
                  </span>
                </label>

                <label
                  class="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer select-none p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all shrink-0 cursor-pointer"
                    [checked]="includeTraitement()"
                    (change)="toggleIncludeTraitement()"
                  />
                  <span class="relative flex items-center">
                    <svg
                      class="absolute -left-[1.25rem] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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
                    Inclure opération de traitement
                  </span>
                </label>

                <label
                  class="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer select-none p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all shrink-0 cursor-pointer"
                    [checked]="hasMedicalLimitation()"
                    (change)="toggleMedicalLimitation()"
                  />
                  <span class="relative flex items-center">
                    <svg
                      class="absolute -left-[1.25rem] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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
                    Limitation médicale
                  </span>
                </label>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- MAIN BODY -->
      <div class="flex-1 overflow-y-auto p-4 flex flex-col lg:flex-row gap-6 min-h-0">
        <!-- COLONNE GAUCHE : Configuration du candidat & Critères -->
        <div
          class="flex flex-col gap-6 transition-all duration-300"
          [class.lg:w-7/12]="showResultsPanel()"
          [class.w-full]="!showResultsPanel()"
          [class.max-w-4xl]="!showResultsPanel()"
          [class.mx-auto]="!showResultsPanel()"
        >
          <!-- Âge, Citoyenneté & Type PFOR -->
          <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm shrink-0 flex flex-col gap-4">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profil du postulant PFOR
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Âge du postulant</label>
                <input
                  type="number"
                  [(ngModel)]="age"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow text-sm"
                  placeholder="Ex: 18"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Statut de citoyenneté</label>
                <select
                  [(ngModel)]="citizenship"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow text-sm"
                >
                  <option value="Canadian Citizen">Citoyen canadien</option>
                  <option value="PR > 3 years">Résident permanent admissible (> 3 ans)</option>
                  <option value="PR < 3 years">Résident permanent inadmissible (< 3 ans)</option>
                </select>
              </div>
            </div>

            <!-- Type de PFOR -->
            <div class="pt-3 border-t border-slate-100">
              <label class="block text-xs font-bold text-slate-700 mb-2">
                Volet PFOR
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  (click)="pforType.set('cmr')"
                  class="p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer"
                  [class.bg-indigo-50]="pforType() === 'cmr'"
                  [class.border-indigo-400]="pforType() === 'cmr'"
                  [class.text-indigo-950]="pforType() === 'cmr'"
                  [class.bg-white]="pforType() !== 'cmr'"
                  [class.border-slate-200]="pforType() !== 'cmr'"
                  [class.text-slate-700]="pforType() !== 'cmr'"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-sm">PFOR CMR</span>
                    @if (pforType() === 'cmr') {
                      <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    }
                  </div>
                  <span class="text-xs text-slate-500">Collège militaire royal du Canada (Kingston / Saint-Jean)</span>
                </button>

                <button
                  type="button"
                  (click)="pforType.set('civil')"
                  class="p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer"
                  [class.bg-indigo-50]="pforType() === 'civil'"
                  [class.border-indigo-400]="pforType() === 'civil'"
                  [class.text-indigo-950]="pforType() === 'civil'"
                  [class.bg-white]="pforType() !== 'civil'"
                  [class.border-slate-200]="pforType() !== 'civil'"
                  [class.text-slate-700]="pforType() !== 'civil'"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-sm">PFOR Civil</span>
                    @if (pforType() === 'civil') {
                      <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    }
                  </div>
                  <span class="text-xs text-slate-500">Universités civiles canadiennes subventionnées</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Alertes Âge & RP -->
          @if (citizenship() === 'PR < 3 years') {
            <div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3 shadow-sm shrink-0">
              <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

          @if (age() !== null && age()! >= 60) {
            <div class="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3 shadow-sm shrink-0">
              <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <div>
                <p class="font-bold text-sm">Âge limite dépassé (Retraite forcée)</p>
                <p class="text-xs text-red-700 mt-0.5">
                  L'âge maximal d'admissibilité est de 56 ans, et le postulant doit pouvoir compléter le contrat initial avant l'âge de 60 ans.
                </p>
              </div>
            </div>
          }

          <!-- Admissibilité CMR (si PFOR CMR) -->
          @if (pforType() === 'cmr') {
            <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm shrink-0 flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <h3 class="text-md font-bold text-slate-800 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  Admission au CMR - Domaines d'études acceptés
                </h3>
                @if (cmrArts() || cmrScience() || cmrGenie()) {
                  <span class="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {{ getCmrAdmittedDomainsFr() }}
                  </span>
                }
              </div>
              <p class="text-xs text-slate-600">
                Cochez le ou les domaines dans lesquels le postulant a reçu une admission académique au CMR :
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <label
                  class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all"
                  [class.bg-indigo-50]="cmrArts()"
                  [class.border-indigo-300]="cmrArts()"
                  [class.text-indigo-950]="cmrArts()"
                  [class.bg-white]="!cmrArts()"
                  [class.border-slate-200]="!cmrArts()"
                  [class.text-slate-700]="!cmrArts()"
                >
                  <input
                    type="checkbox"
                    class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all"
                    [checked]="cmrArts()"
                    (change)="cmrArts.set(!cmrArts())"
                  />
                  <span class="relative flex items-center font-bold text-sm">
                    <svg
                      class="absolute -left-[1.25rem] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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
                    Arts
                  </span>
                </label>

                <label
                  class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all"
                  [class.bg-indigo-50]="cmrScience()"
                  [class.border-indigo-300]="cmrScience()"
                  [class.text-indigo-950]="cmrScience()"
                  [class.bg-white]="!cmrScience()"
                  [class.border-slate-200]="!cmrScience()"
                  [class.text-slate-700]="!cmrScience()"
                >
                  <input
                    type="checkbox"
                    class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all"
                    [checked]="cmrScience()"
                    (change)="cmrScience.set(!cmrScience())"
                  />
                  <span class="relative flex items-center font-bold text-sm">
                    <svg
                      class="absolute -left-[1.25rem] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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
                    Sciences
                  </span>
                </label>

                <label
                  class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all"
                  [class.bg-indigo-50]="cmrGenie()"
                  [class.border-indigo-300]="cmrGenie()"
                  [class.text-indigo-950]="cmrGenie()"
                  [class.bg-white]="!cmrGenie()"
                  [class.border-slate-200]="!cmrGenie()"
                  [class.text-slate-700]="!cmrGenie()"
                >
                  <input
                    type="checkbox"
                    class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all"
                    [checked]="cmrGenie()"
                    (change)="cmrGenie.set(!cmrGenie())"
                  />
                  <span class="relative flex items-center font-bold text-sm">
                    <svg
                      class="absolute -left-[1.25rem] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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
                    Génie (Ingénierie)
                  </span>
                </label>
              </div>
            </div>
          }

          <!-- Choix de métiers actuellement inscrits au dossier -->
          <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm shrink-0 flex flex-col gap-4">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Choix de métiers actuels au dossier
            </h3>
            <p class="text-xs text-slate-500">
              Sélectionnez les 1 à 3 choix de métiers d'officiers actuellement demandés par le postulant pour vérifier leur statut :
            </p>

            <div class="space-y-3">
              <!-- Métier 1 -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Choix 1</label>
                <select
                  [ngModel]="selectedDossierJobId1()"
                  (ngModelChange)="selectedDossierJobId1.set($event)"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                >
                  <option value="">-- Aucun choix 1 sélectionné --</option>
                  @for (job of allPforJobs(); track job.id) {
                    <option [value]="job.id">
                      {{ job.id }} - {{ job.title }} ({{ job.abbreviation }})
                    </option>
                  }
                </select>
              </div>

              <!-- Métier 2 -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Choix 2</label>
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
              </div>

              <!-- Métier 3 -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Choix 3</label>
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
              </div>
            </div>
          </div>

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
                    <input type="text" [(ngModel)]="medicalV" class="w-12 sm:w-14 px-1 py-1.5 text-center text-sm font-semibold text-slate-800 bg-white outline-none focus:bg-indigo-50 focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 border-b border-slate-300 w-full text-center">CV</div>
                    <input type="text" [(ngModel)]="medicalCV" class="w-12 sm:w-14 px-1 py-1.5 text-center text-sm font-semibold text-slate-800 bg-white outline-none focus:bg-indigo-50 focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div class="flex flex-col items-center">
                    <div class="px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 border-b border-slate-300 w-full text-center">H</div>
                    <input type="text" [(ngModel)]="medicalH" class="w-12 sm:w-14 px-1 py-1.5 text-center text-sm font-semibold text-slate-800 bg-white outline-none focus:bg-indigo-50 focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- COLONNE DROITE : Résultats de réorientation, Note de dossier & Courriel -->
        @if (showResultsPanel()) {
          <div class="lg:w-5/12 flex flex-col gap-6">
            <!-- Statut des choix actuels au dossier -->
            <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-3">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Analyse des choix au dossier</span>
                @if (needsReorientation()) {
                  <span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">Réorientation requise</span>
                } @else {
                  <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">Choix admissibles</span>
                }
              </h3>

              <div class="space-y-2.5">
                @for (choice of analyzedDossierChoices(); track choice.job.id) {
                  <div
                    class="p-3 rounded-lg border flex flex-col gap-1.5"
                    [class.bg-emerald-50]="choice.isEligible"
                    [class.border-emerald-200]="choice.isEligible"
                    [class.bg-rose-50]="!choice.isEligible"
                    [class.border-rose-200]="!choice.isEligible"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-sm text-slate-800">
                        {{ choice.job.id }} - {{ choice.job.title }}
                      </span>
                      @if (choice.isEligible) {
                        <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Admissible</span>
                      } @else {
                        <span class="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">Inadmissible</span>
                      }
                    </div>

                    @if (!choice.isEligible) {
                      <p class="text-xs text-rose-700">
                        {{ choice.reasonFr }}
                      </p>
                    }
                  </div>
                }
              </div>
            </div>

            <!-- Métiers PFOR recommandés / admissibles -->
            <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Métiers PFOR recommandés ({{ eligiblePforJobs().length }})
                </h3>
                <div class="flex gap-1">
                  <button
                    (click)="selectedElementFilter.set('all')"
                    class="px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors"
                    [class.bg-indigo-600]="selectedElementFilter() === 'all'"
                    [class.text-white]="selectedElementFilter() === 'all'"
                    [class.bg-slate-100]="selectedElementFilter() !== 'all'"
                    [class.text-slate-600]="selectedElementFilter() !== 'all'"
                  >Tous</button>
                  <button
                    (click)="selectedElementFilter.set('Armée')"
                    class="px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors"
                    [class.bg-emerald-600]="selectedElementFilter() === 'Armée'"
                    [class.text-white]="selectedElementFilter() === 'Armée'"
                    [class.bg-slate-100]="selectedElementFilter() !== 'Armée'"
                    [class.text-slate-600]="selectedElementFilter() !== 'Armée'"
                  >Armée</button>
                  <button
                    (click)="selectedElementFilter.set('Marine')"
                    class="px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors"
                    [class.bg-blue-600]="selectedElementFilter() === 'Marine'"
                    [class.text-white]="selectedElementFilter() === 'Marine'"
                    [class.bg-slate-100]="selectedElementFilter() !== 'Marine'"
                    [class.text-slate-600]="selectedElementFilter() !== 'Marine'"
                  >Marine</button>
                  <button
                    (click)="selectedElementFilter.set('Air')"
                    class="px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors"
                    [class.bg-sky-600]="selectedElementFilter() === 'Air'"
                    [class.text-white]="selectedElementFilter() === 'Air'"
                    [class.bg-slate-100]="selectedElementFilter() !== 'Air'"
                    [class.text-slate-600]="selectedElementFilter() !== 'Air'"
                  >Air</button>
                </div>
              </div>

              <div class="max-h-72 overflow-y-auto space-y-2 pr-1">
                @for (job of filteredEligiblePforJobs(); track job.id) {
                  <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-1.5">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs text-slate-800">{{ job.title }}</span>
                      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">ID: {{ job.id }}</span>
                    </div>
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="text-[10px] font-semibold text-slate-500">{{ job.abbreviation }}</span>
                      @if (job.element) {
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white border text-slate-700">{{ job.element }}</span>
                      }
                      @if (pforType() === 'cmr') {
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                          Requis: {{ getCmrJobRequiredDomainsFr(job.id) }}
                        </span>
                      }
                      <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        PFOR Ouvert
                      </span>
                    </div>
                  </div>
                } @empty {
                  <div class="text-center py-6 text-slate-400 text-xs italic">
                    Aucun métier PFOR correspondant disponible pour les critères sélectionnés.
                  </div>
                }
              </div>
            </div>

            <!-- Notes de dossier & Courriel de réorientation PFOR -->
            <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-4">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Génération des documents PFOR
                </h3>
                <div class="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
                  <button
                    (click)="emailLang.set('fr')"
                    class="px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer transition-colors"
                    [class.bg-white]="emailLang() === 'fr'"
                    [class.shadow-xs]="emailLang() === 'fr'"
                    [class.text-indigo-900]="emailLang() === 'fr'"
                    [class.text-slate-500]="emailLang() !== 'fr'"
                  >FR</button>
                  <button
                    (click)="emailLang.set('en')"
                    class="px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer transition-colors"
                    [class.bg-white]="emailLang() === 'en'"
                    [class.shadow-xs]="emailLang() === 'en'"
                    [class.text-indigo-900]="emailLang() === 'en'"
                    [class.text-slate-500]="emailLang() !== 'en'"
                  >EN</button>
                </div>
              </div>

              <!-- Boutons de copie rapide -->
              <div class="grid grid-cols-2 gap-2">
                <button
                  (click)="copyPforNote()"
                  class="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
                >
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>{{ noteCopied() ? 'Note copiée !' : 'Copier Note' }}</span>
                </button>

                <button
                  (click)="copyPforEmail()"
                  class="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
                >
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{{ emailCopied() ? 'Courriel copié !' : 'Copier Courriel' }}</span>
                </button>
              </div>

              <!-- Prévisualisation du Courriel PFOR -->
              <div class="flex flex-col gap-2">
                <span class="text-xs font-bold text-slate-600">Aperçu du courriel :</span>
                <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 max-h-60 overflow-y-auto leading-relaxed prose prose-sm max-w-none" [innerHTML]="sanitizedEmailHtml()"></div>
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
  jobService = inject(JobDatabaseService);
  sharedState = inject(SharedStateService);
  melService = inject(MelService);
  private sanitizer = inject(DomSanitizer);

  // Inputs & Signals
  age = signal<number | null>(18);
  citizenship = signal<string>("Canadian Citizen");
  pforType = signal<"cmr" | "civil">("cmr");

  cmrArts = signal<boolean>(false);
  cmrScience = signal<boolean>(false);
  cmrGenie = signal<boolean>(false);

  selectedDossierJobId1 = signal<string>("");
  selectedDossierJobId2 = signal<string>("");
  selectedDossierJobId3 = signal<string>("");

  selectedElementFilter = signal<string>("all");
  emailLang = signal<"fr" | "en">("fr");

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
  noteCopied = signal<boolean>(false);
  emailCopied = signal<boolean>(false);

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
    if (this.sharedState.includeLinkedEmail()) count++;
    if (this.ignoreSip()) count++;
    if (this.includeTraitement()) count++;
    if (this.hasMedicalLimitation()) count++;
    return count;
  });

  showResultsPanel = computed(() => {
    return (
      !!this.selectedDossierJobId1() ||
      !!this.selectedDossierJobId2() ||
      !!this.selectedDossierJobId3() ||
      this.cmrArts() ||
      this.cmrScience() ||
      this.cmrGenie() ||
      this.pforType() === "civil"
    );
  });

  eligiblePforJobs = computed<JobEntry[]>(() => {
    if (this.citizenship() === "PR < 3 years") return [];
    if (this.age() !== null && this.age()! >= 60) return [];

    let candidateJobIds: string[] = [];

    if (this.pforType() === "cmr") {
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
      if (!this.ignoreSip() && this.jobService.isPforJobClosed(jId, this.currentSipPhase())) continue;

      const job = this.jobService.getJobById(jId);
      if (job) result.push(job);
    }

    return result;
  });

  filteredEligiblePforJobs = computed<JobEntry[]>(() => {
    const filter = this.selectedElementFilter();
    const jobs = this.eligiblePforJobs();
    if (filter === "all") return jobs;
    return jobs.filter((j) => (j.element || "").toLowerCase().includes(filter.toLowerCase()));
  });

  analyzedDossierChoices = computed(() => {
    const selectedIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean);

    return selectedIds.map((id) => {
      const job = this.jobService.getJobById(id) || {
        id,
        title: id,
        abbreviation: "",
      } as JobEntry;

      const hasPfor = this.jobService.hasPforProgram(id, this.currentSipPhase());
      const isPforClosed = !this.ignoreSip() && this.jobService.isPforJobClosed(id, this.currentSipPhase());

      let isEligible = true;
      let reasonFr = "";
      let reasonEn = "";

      if (this.citizenship() === "PR < 3 years") {
        isEligible = false;
        reasonFr = "Résident permanent de moins de 3 ans";
        reasonEn = "Permanent resident under 3 years";
      } else if (this.age() !== null && this.age()! >= 60) {
        isEligible = false;
        reasonFr = "Âge limite dépassé";
        reasonEn = "Age limit exceeded";
      } else if (this.pforType() === "cmr") {
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
            reasonFr = "Fermé pour les postulants PFOR dans le SIP.";
            reasonEn = "Closed for ROTP applicants in SIP.";
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
          reasonFr = "Fermé sous le PFOR dans le SIP.";
          reasonEn = "Closed under ROTP in SIP.";
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

  getCmrAdmittedDomainsFr(): string {
    const domains: string[] = [];
    if (this.cmrArts()) domains.push("Arts");
    if (this.cmrScience()) domains.push("Sciences");
    if (this.cmrGenie()) domains.push("Génie");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} et ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} et ${domains[2]}`;
  }

  getCmrAdmittedDomainsEn(): string {
    const domains: string[] = [];
    if (this.cmrArts()) domains.push("Arts");
    if (this.cmrScience()) domains.push("Science");
    if (this.cmrGenie()) domains.push("Engineering");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} and ${domains[1]}`;
    return `${domains[0]}, ${domains[1]}, and ${domains[2]}`;
  }

  getCmrJobRequiredDomainsFr(jobId: string): string {
    const cmrInfo = CMR_JOB_DOMAINS[jobId];
    if (!cmrInfo) return "";
    const domains: string[] = [];
    if (cmrInfo.arts) domains.push("Arts");
    if (cmrInfo.science) domains.push("Sciences");
    if (cmrInfo.genie) domains.push("Génie");
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} ou ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} ou ${domains[2]}`;
  }

  getCmrJobRequiredDomainsEn(jobId: string): string {
    const cmrInfo = CMR_JOB_DOMAINS[jobId];
    if (!cmrInfo) return "";
    const domains: string[] = [];
    if (cmrInfo.arts) domains.push("Arts");
    if (cmrInfo.science) domains.push("Science");
    if (cmrInfo.genie) domains.push("Engineering");
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} or ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} or ${domains[2]}`;
  }

  toggleIncludeReo() {
    this.sharedState.includeLinkedEmail.update((v) => !v);
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
    this.selectedDossierJobId1.set("");
    this.selectedDossierJobId2.set("");
    this.selectedDossierJobId3.set("");
    this.ignoreSip.set(false);
    this.includeTraitement.set(false);
    this.hasMedicalLimitation.set(false);
    this.selectedElementFilter.set("all");
    this.emailLang.set("fr");
  }

  generatePforNoteText(): string {
    let note = `NOTE DE RÉORIENTATION PFOR - ${new Date().toLocaleDateString('fr-CA')}\n`;
    note += `====================================================\n\n`;
    note += `Volet : ${this.pforType() === 'cmr' ? 'PFOR CMR (Collège militaire royal)' : 'PFOR Universités civiles'}\n`;
    if (this.pforType() === 'cmr') {
      note += `Admission CMR : ${this.getCmrAdmittedDomainsFr() || 'Non spécifié'}\n`;
    }
    note += `Âge : ${this.age() || 'N/A'} ans | Citoyenneté : ${this.citizenship()}\n\n`;

    note += `STATUT DES CHOIX ACTUELS :\n`;
    const choices = this.analyzedDossierChoices();
    if (choices.length === 0) {
      note += `- Aucun choix actuel renseigné\n`;
    } else {
      for (const c of choices) {
        note += `- ${c.job.id} ${c.job.title} (${c.job.abbreviation}) : ${c.isEligible ? 'ADMISSIBLE' : 'INADMISSIBLE (' + c.reasonFr + ')'}\n`;
      }
    }

    note += `\nMÉTIERS PFOR RECOMMANDÉS :\n`;
    const eligible = this.eligiblePforJobs();
    if (eligible.length === 0) {
      note += `- Aucun métier ouvert disponible\n`;
    } else {
      for (const j of eligible) {
        const domainReq = this.pforType() === 'cmr' ? ` [Requis CMR: ${this.getCmrJobRequiredDomainsFr(j.id)}]` : '';
        note += `- ${j.id} - ${j.title} (${j.abbreviation})${domainReq}\n`;
      }
    }

    return note;
  }

  generatePforEmailHtml(lang: "fr" | "en"): string {
    const isFr = lang === "fr";
    const isCmr = this.pforType() === "cmr";
    const admDomain = isFr ? this.getCmrAdmittedDomainsFr() : this.getCmrAdmittedDomainsEn();
    const mergeTasks = this.sharedState.includeLinkedEmail();

    let h = "";
    if (isFr) {
      h += `<p>Bonjour,</p>`;
      if (isCmr) {
        h += `<p class="mt-3">Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), <strong>vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${admDomain || "votre sélection"} !</strong> Nous tenons à vous féliciter chaleureusement pour cette admission.</p>`;
      }

      if (mergeTasks) {
        if (isCmr) {
          h += `<p class="mt-3">Toutefois, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l'objet d'une <strong>réorientation pour vos choix de métiers</strong>.</p>`;
        } else {
          h += `<p class="mt-3">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Universités civiles)</strong>, nous constatons que certaines actions de votre part sont requises. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l'objet d'une <strong>réorientation pour vos choix de métiers</strong>.</p>`;
        }
      } else {
        if (isCmr) {
          h += `<p class="mt-3">Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou requièrent un domaine d'études différent de votre admission au CMR.</p>`;
        } else {
          h += `<p class="mt-3">Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que vous devez faire l'objet d'une réorientation pour vos choix de métiers.</p>`;
        }
      }

      const choices = this.analyzedDossierChoices();
      if (choices.length > 0) {
        h += `<p class="mt-3">Voici le statut des métiers actuellement inscrits à votre dossier :</p><ul class="list-disc ml-5 mt-1 space-y-1">`;
        for (const c of choices) {
          h += `<li><strong>${c.job.title} (${c.job.abbreviation})</strong> : ${c.isEligible ? 'Admissible' : c.reasonFr}</li>`;
        }
        h += `</ul>`;
      }

      const eligible = this.eligiblePforJobs();
      h += `<p class="mt-4">Voici la liste des métiers d'officiers PFOR actuellement ouverts et correspondants à votre profil :</p>`;
      if (eligible.length > 0) {
        h += `<ul class="list-disc ml-5 mt-1 space-y-1">`;
        for (const j of eligible) {
          const reqDomain = isCmr ? ` (CMR : ${this.getCmrJobRequiredDomainsFr(j.id)})` : '';
          h += `<li><strong>${j.title}</strong> (${j.abbreviation})${reqDomain}</li>`;
        }
        h += `</ul>`;
      } else {
        h += `<p class="italic text-slate-500 mt-1">Aucun métier PFOR ouvert correspondant n'est disponible actuellement.</p>`;
      }

      h += `<p class="mt-4">Veuillez nous indiquer par retour de courriel vos nouveaux choix de métiers par ordre de préférence.</p>`;
      h += `<p class="mt-3">Cordialement,<br>Votre équipe de recrutement</p>`;
    } else {
      // EN
      h += `<p>Hello,</p>`;
      if (isCmr) {
        h += `<p class="mt-3">We are pleased to inform you that following the assessment of your academic transcripts and potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), <strong>you have been admitted to RMC in the following field(s) of study: ${admDomain || "your selection"}!</strong> Congratulations on your admission.</p>`;
      }

      if (mergeTasks) {
        h += `<p class="mt-3">However, certain actions are required to continue processing your application. You must both <strong>correct the tasks reassigned to you on your portal</strong> and <strong>complete a reorientation for your occupation choices</strong>.</p>`;
      } else {
        h += `<p class="mt-3">Following the review of your application file for the Regular Officer Training Plan (ROTP), we find that your current occupation choices require a reorientation.</p>`;
      }

      const choices = this.analyzedDossierChoices();
      if (choices.length > 0) {
        h += `<p class="mt-3">Here is the status of the occupations currently on your file:</p><ul class="list-disc ml-5 mt-1 space-y-1">`;
        for (const c of choices) {
          h += `<li><strong>${c.job.title} (${c.job.abbreviation})</strong>: ${c.isEligible ? 'Eligible' : c.reasonEn}</li>`;
        }
        h += `</ul>`;
      }

      const eligible = this.eligiblePforJobs();
      h += `<p class="mt-4">Here are the ROTP officer occupations currently open and matching your profile:</p>`;
      if (eligible.length > 0) {
        h += `<ul class="list-disc ml-5 mt-1 space-y-1">`;
        for (const j of eligible) {
          const reqDomain = isCmr ? ` (RMC: ${this.getCmrJobRequiredDomainsEn(j.id)})` : '';
          h += `<li><strong>${j.title}</strong> (${j.abbreviation})${reqDomain}</li>`;
        }
        h += `</ul>`;
      } else {
        h += `<p class="italic text-slate-500 mt-1">No open ROTP occupations currently available for the selected profile.</p>`;
      }

      h += `<p class="mt-4">Please reply to this email with your updated occupation choices in order of preference.</p>`;
      h += `<p class="mt-3">Best regards,<br>Your Recruitment Team</p>`;
    }

    return h;
  }

  sanitizedEmailHtml = computed<SafeHtml>(() => {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.generatePforEmailHtml(this.emailLang())
    );
  });

  async copyPforNote() {
    const text = this.generatePforNoteText();
    try {
      await navigator.clipboard.writeText(text);
      this.noteCopied.set(true);
      setTimeout(() => this.noteCopied.set(false), 2500);
    } catch {
      console.warn("Clipboard copy failed");
    }
  }

  async copyPforEmail() {
    const html = this.generatePforEmailHtml(this.emailLang());
    const plain = html
      .replace(/<p[^>]*>/gi, "")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<li[^>]*>/gi, "• ")
      .replace(/<\/li>/gi, "\n")
      .replace(/<ul[^>]*>/gi, "")
      .replace(/<\/ul>/gi, "\n")
      .replace(/<strong[^>]*>/gi, "")
      .replace(/<\/strong>/gi, "")
      .replace(/<[^>]+>/g, "");

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const typeHtml = "text/html";
        const typeText = "text/plain";
        const blobHtml = new Blob([html], { type: typeHtml });
        const blobText = new Blob([plain], { type: typeText });
        const data = [new ClipboardItem({ [typeHtml]: blobHtml, [typeText]: blobText })];
        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(plain);
      }
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 2500);
    } catch {
      console.warn("Clipboard copy failed");
    }
  }
}
