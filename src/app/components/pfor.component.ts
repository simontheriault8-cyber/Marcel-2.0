import { Component, computed, signal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { JobDatabaseService } from "../../services/job-database.service";
import { SharedStateService } from "../../services/shared-state.service";
import { MelService, MEL_LIMITATIONS } from "../../services/mel.service";
import { JobEntry } from "../../services/jobs-data";
import { JOB_URLS } from "../data/job-urls.data";

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
                  [checked]="sharedState.includeLinkedEmail()"
                  (change)="toggleIncludeReo()"
                  class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <div class="flex flex-col">
                  <span class="font-bold text-slate-800">Fusionner tâches & réorientation</span>
                  <span class="text-[11px] text-slate-500">Intègre les tâches de l'onglet Dossier au courriel</span>
                </div>
              </label>

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
                  <option value="PR > 3 years">Résident permanent (≥ 3 ans)</option>
                  <option value="PR < 3 years">Résident permanent (&lt; 3 ans)</option>
                </select>
              </div>
            </div>
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
              <div class="mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-3">
                <div>
                  <span class="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Domaines d'admission confirmés au CMR
                  </span>
                  <p class="text-xs text-slate-500 mt-0.5">
                    Sélectionnez le ou les programmes dans lesquels le candidat a reçu une offre d'admission :
                  </p>
                </div>

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
          </div>

          <!-- 3. CHOIX ACTUELS AU DOSSIER (MAX 3) -->
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
                <label class="block text-xs font-semibold text-slate-600 mb-1">Choix 1 (Principal)</label>
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
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-bold text-slate-800">
                    Courriel de réorientation
                  </h3>
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
                </div>

                <div class="flex gap-2 w-full sm:w-auto">
                  <button
                    (click)="copyBilingualEmail()"
                    [disabled]="!showResultsPanel()"
                    class="flex-1 sm:flex-none justify-center px-3 py-1.5 text-white rounded-lg transition flex items-center gap-1.5 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    [class.bg-emerald-600]="copied()"
                    [class.hover:bg-emerald-700]="copied()"
                    [class.bg-blue-600]="!copied()"
                    [class.hover:bg-blue-700]="!copied()"
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
                      Courriel copié !
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
                      Copier le courriel
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
  jobService = inject(JobDatabaseService);
  sharedState = inject(SharedStateService);
  melService = inject(MelService);
  sanitizer = inject(DomSanitizer);

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
    if (this.sharedState.includeLinkedEmail()) count++;
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
      const isPforClosed = !this.ignoreSip() && this.jobService.isPforJobClosed(id, this.currentSipPhase());

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
            reasonFr = "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).";
            reasonEn = "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).";
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
  }

  getJobLinkMarkup(jobId: string, isFrench: boolean, isHtml: boolean): string {
    const job = this.jobService.getAllJobs().find((j) => j.id === jobId);
    const urlInfo = this.JOB_URLS[jobId];

    let titleText = jobId;
    if (job) {
      titleText = job.title;
      if (!isFrench && urlInfo) {
        let slug =
          urlInfo.en.split("/career/")[1] ||
          urlInfo.en.split(".ca/en/")[1] ||
          "";
        slug = slug
          .replace(/\//g, "")
          .replace(/\?slug=nep/, "")
          .replace(/-/g, " ");
        if (slug) {
          titleText = slug
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        } else if (job.titleEn) {
          titleText = job.titleEn;
        }
      } else if (!isFrench && job.titleEn) {
        titleText = job.titleEn;
      }
    }

    if (urlInfo) {
      const url = isFrench ? urlInfo.fr : urlInfo.en;
      if (isHtml) {
        return `<a href="${url}" target="_blank" class="text-blue-600 hover:underline hover:text-blue-800" style="color: #2563eb; text-decoration: underline;">${titleText}</a>`;
      } else {
        return `${titleText} (${url})`;
      }
    }
    return titleText;
  }

  evaluateJobAdmissibility(jobId: string) {
    const job = this.jobService.getJobById(jobId);
    const isJobClosed = !this.ignoreSip() && this.jobService.isPforJobClosed(jobId, this.currentSipPhase());
    const isAgeAdmissible = this.age() === null || this.age()! < 60;
    const isCitizenshipAdmissible = this.citizenship() !== "PR < 3 years";

    let isEducationAdmissible = true;
    let educationReason = "";
    let educationReasonEn = "";

    if (this.pforType() === "cmr") {
      const cmrInfo = CMR_JOB_DOMAINS[jobId];
      if (!cmrInfo) {
        isEducationAdmissible = false;
        educationReason = "Ce métier n'est pas offert au CMR sous le PFOR.";
        educationReasonEn = "This occupation is not offered at RMC under ROTP.";
      } else {
        const arts = this.cmrArts();
        const science = this.cmrScience();
        const genie = this.cmrGenie();
        const match =
          (arts && cmrInfo.arts) ||
          (science && cmrInfo.science) ||
          (genie && cmrInfo.genie);

        if (!match) {
          isEducationAdmissible = false;
          const reqFr = this.getCmrJobRequiredDomainsFr(jobId);
          const admFr = this.getCmrAdmittedDomainsFr();
          educationReason = `Requiert admission au CMR en ${reqFr} (actuellement admis en : ${admFr || "aucun"}).`;
          educationReasonEn = `Requires admission to RMC in ${this.getCmrJobRequiredDomainsEn(jobId)}.`;
        }
      }
    } else {
      // Civil
      const hasPfor = this.jobService.hasPforProgram(jobId, this.currentSipPhase());
      if (!hasPfor) {
        isEducationAdmissible = false;
        educationReason = "Ce métier ne comporte aucune position pour le PFOR Civil.";
        educationReasonEn = "No positions available for Civil ROTP.";
      }
    }

    let isMedicalAdmissible = true;
    const medicalReason = "Votre profil médical actuel ne rencontre pas le standard minimal pour ce métier.";
    const medicalReasonEn = "Your current medical profile does not meet the minimum requirement for this occupation.";

    if (this.hasMedicalLimitation() && job && job.medicalStandard) {
      const reqV = job.medicalStandard.v;
      const reqCV = job.medicalStandard.cv;
      const reqH = job.medicalStandard.h;
      const userV = parseInt(this.medicalV(), 10);
      const userCV = parseInt(this.medicalCV(), 10);
      const userH = parseInt(this.medicalH(), 10);

      if (!isNaN(reqV) && !isNaN(userV) && userV > reqV) isMedicalAdmissible = false;
      if (!isNaN(reqCV) && !isNaN(userCV) && userCV > reqCV) isMedicalAdmissible = false;
      if (!isNaN(reqH) && !isNaN(userH) && userH > reqH) isMedicalAdmissible = false;
    }

    return {
      isJobClosed,
      isAgeAdmissible,
      isCitizenshipAdmissible,
      isEducationAdmissible,
      isMedicalAdmissible,
      isExtraTestRequired: false,
      isExtraTestAdmissible: true,
      educationReason,
      educationReasonEn,
      medicalReason,
      medicalReasonEn,
      extraTestReasonFr: "",
      extraTestReasonEn: "",
      durationYears: 5,
    };
  }

  generateNoteRegistry(): string {
    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean);

    let metierRaison = "";

    if (dossierIds.length === 0) {
      metierRaison = "aucun métier sélectionné au dossier";
    } else {
      const parts: string[] = [];
      const choices = this.analyzedDossierChoices();
      for (const c of choices) {
        if (c.job.id === "00003") {
          parts.push(`00003 : Sans métier`);
          continue;
        }
        parts.push(`(${c.job.id} : ${c.isEligible ? "Admissible" : c.reasonFr})`);
      }
      metierRaison = parts.join(", ");
    }

    const isPRAdmissible = this.citizenship() === "PR > 3 years";
    const prDemandText = isPRAdmissible
      ? " et relevés de notes du pays d'origine demandés"
      : "";

    let reoPrefix = "Réorientation nécessaire car";
    if (this.pforType() === "cmr") {
      const cmrDomains = this.getCmrAdmittedDomainsFr();
      if (cmrDomains) {
        reoPrefix = `Admis CMR (${cmrDomains}) - Réorientation nécessaire car`;
      } else {
        reoPrefix = "PFOR CMR - Réorientation nécessaire car";
      }
    } else {
      reoPrefix = "PFOR Civil - Réorientation nécessaire car";
    }

    const reoNote = `Étape 1 (En cours) - ${reoPrefix} : ${metierRaison}, courriel de réo envoyé${prDemandText}, en attente de la réponse du postulant. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.`;

    if (this.sharedState.includeLinkedEmail() && this.sharedState.taskNote()) {
      const taskNoteRaw = this.sharedState.taskNote();

      let medicalSuffix = "";
      const medicalMarker = "MÉDICAL - TRIAGE PAR MED CHU REQUIS";
      if (taskNoteRaw.toUpperCase().includes(medicalMarker)) {
        medicalSuffix = "\n\nMÉDICAL - TRIAGE PAR MED CHU REQUIS";
      }

      const prefixRegex = /^Étape 1 \((En cours|en cours)\)\s*-\s*/i;
      const suffixString =
        "Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.";

      const taskHasPrefix = prefixRegex.test(taskNoteRaw);
      let taskClean = taskNoteRaw.replace(prefixRegex, "").trim();
      const medicalIndex = taskClean.toUpperCase().indexOf(medicalMarker);
      if (medicalIndex !== -1) {
        taskClean = taskClean.substring(0, medicalIndex).trim();
      }
      const suffixIndexTask = taskClean
        .toLowerCase()
        .indexOf(suffixString.toLowerCase());
      if (suffixIndexTask !== -1) {
        taskClean = taskClean.substring(0, suffixIndexTask).trim();
      }
      if (taskClean.endsWith(".")) {
        taskClean = taskClean.slice(0, -1).trim();
      }

      const reoHasPrefix = prefixRegex.test(reoNote);
      let reoClean = reoNote.replace(prefixRegex, "").trim();
      const suffixIndexReo = reoClean
        .toLowerCase()
        .indexOf(suffixString.toLowerCase());
      if (suffixIndexReo !== -1) {
        reoClean = reoClean.substring(0, suffixIndexReo).trim();
      }
      if (reoClean.endsWith(".")) {
        reoClean = reoClean.slice(0, -1).trim();
      }

      let combinedCore = "";
      if (taskClean && reoClean) {
        if (taskClean === reoClean) {
          combinedCore = taskClean;
        } else {
          combinedCore = `${taskClean} ET ${reoClean}`;
        }
      } else {
        combinedCore = taskClean || reoClean;
      }

      const hasPrefix = taskHasPrefix || reoHasPrefix;
      const finalPrefix = hasPrefix ? "Étape 1 (En cours) - " : "";

      return `${finalPrefix}${combinedCore}. ${suffixString}${medicalSuffix}`;
    }

    return reoNote;
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

  buildBilingualEmail(isHtml: boolean): string {
    const jobIds = this.eligiblePforJobs().map((j) => j.id);

    if (!this.showResultsPanel() && jobIds.length === 0) {
      return isHtml
        ? '<p class="text-slate-500 italic">Veuillez renseigner les critères d\'admission du postulant PFOR pour générer le courriel de réorientation.</p>'
        : "Veuillez renseigner les critères d'admission du postulant PFOR pour générer le courriel de réorientation.";
    }

    const isPilotEligible = jobIds.includes("00183");
    const isPRAdmissible = this.citizenship() === "PR > 3 years";

    const allEligibleJobs = this.eligiblePforJobs();
    let listOFF: JobEntry[] = [];
    let listClosedOFF: JobEntry[] = [];

    if (this.ignoreSip()) {
      for (const j of allEligibleJobs) {
        if (this.jobService.isPforJobClosed(j.id, this.currentSipPhase())) {
          listClosedOFF.push(j);
        } else {
          listOFF.push(j);
        }
      }
    } else {
      listOFF = allEligibleJobs;
    }

    const renderHtmlList = (
      jobsList: JobEntry[],
      isClosedList: boolean,
      isFr: boolean,
    ): string => {
      if (jobsList.length === 0) return "";
      let s = "";
      if (isClosedList) {
        s += `<p class="mt-3 mb-1 font-bold text-red-600" style="color: #dc2626; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${isFr ? "Officiers (Fermés) :" : "Officers (Closed):"}</p>\n`;
      } else {
        s += `<p class="mt-3 mb-1 font-bold text-slate-800" style="color: #1e293b; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${isFr ? "Officiers :" : "Officers:"}</p>\n`;
      }
      s += '<ul class="list-disc pl-5 space-y-1 mb-2">\n';
      for (const j of jobsList) {
        const link = this.getJobLinkMarkup(j.id, isFr, true);
        const reqDomain =
          this.pforType() === "cmr"
            ? isFr
              ? ` (CMR : ${this.getCmrJobRequiredDomainsFr(j.id)})`
              : ` (RMC: ${this.getCmrJobRequiredDomainsEn(j.id)})`
            : "";
        if (isClosedList) {
          s += `  <li class="mt-0.5 text-red-700" style="color: #b91c1c;"><strong>${j.id} - ${link}</strong>${reqDomain} <span style="background-color: #fecaca; color: #991b1b; font-size: 11px; padding: 1px 4px; border-radius: 3px; font-weight: bold;">(${isFr ? "FERMÉ" : "CLOSED"})</span></li>\n`;
        } else {
          s += `  <li class="mt-0.5"><strong>${j.id} - ${link}</strong>${reqDomain}</li>\n`;
        }
      }
      s += "</ul>\n";
      return s;
    };

    const renderPlainList = (
      jobsList: JobEntry[],
      isClosedList: boolean,
      isFr: boolean,
    ): string => {
      if (jobsList.length === 0) return "";
      let s = "";
      if (isClosedList) {
        s += `\n${isFr ? "Officiers (Fermés) :" : "Officers (Closed):"}\n`;
      } else {
        s += `\n${isFr ? "Officiers :" : "Officers:"}\n`;
      }
      for (const j of jobsList) {
        const link = this.getJobLinkMarkup(j.id, isFr, false);
        const reqDomain =
          this.pforType() === "cmr"
            ? isFr
              ? ` (CMR : ${this.getCmrJobRequiredDomainsFr(j.id)})`
              : ` (RMC: ${this.getCmrJobRequiredDomainsEn(j.id)})`
            : "";
        if (isClosedList) {
          s += `  - ${j.id} - ${link}${reqDomain} (${isFr ? "FERMÉ" : "CLOSED"})\n`;
        } else {
          s += `  - ${j.id} - ${link}${reqDomain}\n`;
        }
      }
      return s;
    };

    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean);

    const hasNoJobCode = dossierIds.includes("00003");
    const realDossierIds = dossierIds.filter((id) => id !== "00003");

    const closedButAdmissibleJobs: string[] = [];
    const closedButAdmissibleJobsEn: string[] = [];
    for (const id of realDossierIds) {
      const s = this.evaluateJobAdmissibility(id);
      if (
        s &&
        s.isJobClosed &&
        s.isAgeAdmissible &&
        s.isCitizenshipAdmissible &&
        s.isEducationAdmissible &&
        s.isMedicalAdmissible
      ) {
        const job = this.jobService.getJobById(id);
        const titleFr = job?.title || id;
        const titleEn = job?.titleEn || job?.title || id;
        closedButAdmissibleJobs.push(`${id} - ${titleFr}`);
        closedButAdmissibleJobsEn.push(`${id} - ${titleEn}`);
      }
    }
    const hasClosedButAdmissibleJobs = closedButAdmissibleJobs.length > 0;
    const allRealDossierJobsAreClosedButAdmissible =
      realDossierIds.length > 0 &&
      closedButAdmissibleJobs.length === realDossierIds.length;

    const rawHtml = this.sharedState.taskEmailHtmlFr();
    const rawTxt = this.sharedState.taskEmailFr();
    const hasTasks =
      !!rawHtml &&
      this.sharedState.hasReassignedTasks() &&
      rawHtml.includes("Bonjour,");
    const mergeTasks = this.sharedState.includeLinkedEmail() && hasTasks;

    const isPforCmr = this.pforType() === "cmr";
    const isPforCivil = this.pforType() === "civil";
    const cmrAdmittedFr = this.getCmrAdmittedDomainsFr();
    const cmrAdmittedEn = this.getCmrAdmittedDomainsEn();

    if (isHtml) {
      let h = "";
      h +=
        '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">English message will follow.</span></p>\n';

      // FRENCH SECTION
      h += '<p class="mt-4">Bonjour,</p>\n';

      if (isPforCmr) {
        h += `<p class="mt-4">Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), <strong>vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${cmrAdmittedFr || "votre sélection"} !</strong> Nous tenons à vous féliciter chaleureusement pour cette admission.</p>\n`;
      }

      if (mergeTasks) {
        if (isPforCmr) {
          h +=
            '<p class="mt-4">Toutefois, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        } else {
          h +=
            '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Universités civiles)</strong>, nous constatons que certaines actions de votre part sont requises. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>\n';
        }

        let taskPartHtml = "";
        if (rawHtml.includes("<!-- START_TASK_BODY_FR -->")) {
          const frParts = rawHtml.split("<!-- START_TASK_BODY_FR -->");
          if (frParts.length > 1) {
            const frBodyPart = frParts[1].split("<!-- END_TASK_BODY_FR -->");
            if (frBodyPart.length > 0) {
              taskPartHtml = frBodyPart[0].trim();
            }
          }
        } else {
          const frParts = rawHtml.split("<p>Bonjour,</p>");
          if (frParts.length > 1) {
            const frBodyPart = frParts[1].split("<p>En raison du volume");
            if (frBodyPart.length > 0 && frBodyPart[0].trim().length > 0) {
              taskPartHtml = frBodyPart[0].trim();
            }
          }
        }

        if (taskPartHtml) {
          h +=
            '<div class="mt-4 p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-sm">\n';
          h +=
            '<p class="font-bold text-black border-b border-amber-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">1. TÂCHES ET COMMUNICATIONS À CORRIGER SUR VOTRE PORTAIL :</p>\n';
          h += taskPartHtml + "\n";
          h += "</div>\n";
        }

        h +=
          '<p class="mt-6 font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">2. STATUT DE VOS CHOIX DE MÉTIERS ACTUELS ET RÉORIENTATION REQUISE :</p>\n';
      } else {
        if (hasNoJobCode) {
          if (isPforCmr) {
            h +=
              "<p class=\"mt-4\">Toutefois, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.</p>\n";
          } else {
            h +=
              "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.</p>\n";
          }
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (isPforCmr) {
            if (!mergeTasks) {
              h +=
                "<p class=\"mt-4\">Toutefois, suite à l'analyse de vos choix de métiers actuels, nous constatons qu'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :</p>\n";
            }
          } else {
            h +=
              "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :</p>\n";
          }
        } else {
          h +=
            '<p class="mt-4">Voici le statut des autres métiers inscrits à votre dossier :</p>\n';
        }
        h += '<ul class="list-disc pl-5 mt-2 mb-4">\n';
        for (const id of realDossierIds) {
          const name = `${id} - ${this.getJobLinkMarkup(id, true, true)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonFr = "";
          if (s) {
            const reasonsFrList: string[] = [];
            if (s.isJobClosed) {
              reasonsFrList.push(
                "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).",
              );
            }
            if (!s.isAgeAdmissible) {
              reasonsFrList.push(
                `Votre âge ne permet pas de compléter le contrat initial (${s.durationYears} ans) avant 60 ans.`,
              );
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsFrList.push(
                "Pour diverses raisons, ce métier n'est pas accessible aux résidents permanents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsFrList.push(s.educationReason);
            }
            if (!s.isMedicalAdmissible) {
              reasonsFrList.push(s.medicalReason);
            }

            if (reasonsFrList.length > 0) {
              reasonFr = `\n    <ul class="list-disc pl-5 mt-1 text-sm text-slate-600">\n      <li>${reasonsFrList.join("</li>\n      <li>")}</li>\n    </ul>`;
            } else {
              reasonFr =
                " : Admissible (réorientation lancée pour d'autres éléments du dossier).";
            }
          }
          h += `  <li class="mt-1"><strong>${name}</strong>${reasonFr}</li>\n`;
        }
        h += "</ul>\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          h +=
            "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou requièrent un domaine d'études différent de votre admission au CMR.</p>\n";
        } else {
          h +=
            "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou que vous n'y êtes pas admissible d'après nos critères.</p>\n";
        }
      }

      // Options French
      h +=
        '<p class="mt-4 font-semibold text-slate-800">Voici les options qui s\'offrent à vous :</p>\n';
      if (hasClosedButAdmissibleJobs) {
        if (allRealDossierJobsAreClosedButAdmissible) {
          h +=
            '<p class="mt-2 text-sm"><strong>Option 1 : Conserver vos choix de métier actuels et attendre leur réouverture</strong><br>Vous pouvez choisir de garder vos choix de métier actuels et de patienter jusqu\'en avril prochain pour la réouverture des positions. Si vous sélectionnez cette option, <span style="background-color: #fef08a; font-weight: bold;">votre dossier de candidature actuel sera fermé</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de nous recontacter vers la fin du mois de mars prochain</span> pour réactiver votre processus.</p>\n';
        } else {
          h +=
            '<p class="mt-2 text-sm"><strong>Option 1 : Conserver certains de vos choix de métier actuels et attendre leur réouverture</strong><br>Vous pouvez choisir de garder le ou les métiers suivants pour lesquels vous êtes admissible : <strong>' +
            closedButAdmissibleJobs.join(", ") +
            '</strong>, et de patienter jusqu\'en avril prochain pour la réouverture des positions. Si vous sélectionnez cette option, <span style="background-color: #fef08a; font-weight: bold;">votre dossier de candidature actuel sera fermé</span> et il sera de <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de nous recontacter vers la fin du mois de mars prochain</span> pour réactiver votre processus pour ce ou ces métiers.</p>\n';
        }
        h +=
          '<p class="mt-4 text-sm"><strong>Option 2 : Choisir un autre métier parmi la liste des métiers admissibles</strong><br>Vous pouvez réorienter votre candidature vers d\'autres choix de métiers admissibles dès maintenant. Consultez la liste ci-dessous.</p>\n';
      } else {
        h +=
          '<p class="mt-2 text-sm"><strong>Choisir un autre métier parmi la liste des métiers admissibles</strong><br>Vous devez réorienter votre candidature vers un choix de métier pour lequel vous êtes admissible afin de poursuivre le processus d\'enrôlement. Veuillez consulter la liste ci-dessous.</p>\n';
      }

      if (this.ignoreSip()) {
        h +=
          '<div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900" style="margin-top: 16px; padding: 12px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 4px; font-size: 14px; color: #713f12;">\n';
        h +=
          '  <strong>Note importante concernant les métiers fermés :</strong> La liste ci-dessous inclut des métiers actuellement ouverts et fermés. Si vous choisissez un <span style="background-color: #fef08a; font-weight: bold;">métier ouvert</span>, nous pourrons poursuivre le traitement de votre demande d\'emploi immédiatement. Par contre, si vous choisissez un <span style="background-color: #fecaca; color: #991b1b; font-weight: bold;">métier fermé</span> (marqué en rouge), nous devrons fermer votre dossier et ce sera <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de nous rappeler vers la fin du mois de mars prochain</span> pour faire rouvrir votre dossier dans ce métier.\n';
        h += '</div>\n';
      }

      // Eligible Jobs French Division
      h +=
        '<div class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
      h +=
        '<p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">MÉTIERS ADMISSIBLES :</p>\n';

      if (isPilotEligible) {
        h +=
          '<div class="mt-2 mb-3 p-3 bg-amber-50 border border-amber-300 rounded text-amber-900 text-xs" style="margin-top: 8px; margin-bottom: 12px; padding: 10px; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; font-size: 13px; color: #78350f;">\n' +
          '  <strong>Attention – Choix du métier de Pilote (00183) :</strong> Le métier de Pilote étant fortement contingenté (nombre de places très limité), si vous choisissez ce métier, vous devez obligatoirement sélectionner un deuxième métier parmi la liste des métiers admissibles.\n' +
          '</div>\n';
      }

      if (listOFF.length === 0 && listClosedOFF.length === 0) {
        h +=
          '<p class="mt-2 text-slate-700 italic">Aucun métier PFOR ouvert correspondant n\'est disponible actuellement pour la sélection effectuée.</p>\n';
      } else {
        h += renderHtmlList(listOFF, false, true);
        if (listClosedOFF.length > 0) {
          h += renderHtmlList(listClosedOFF, true, true);
        }
      }
      h += "</div>\n";

      // Conclusion French
      if (mergeTasks) {
        h +=
          '<p class="mt-6 font-semibold text-slate-800">Prochaines étapes :</p>\n';
        h +=
          "<p>En raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées. Nous vous invitons donc à :</p>\n";
        h += '<ul class="list-disc pl-5 mt-1 mb-2 text-sm text-slate-700">\n';
        h +=
          '  <li>Vous rendre sur votre portail (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) afin de corriger sans délai les tâches indiquées ci-dessus ;</li>\n';
        if (isPRAdmissible) {
          h +=
            '  <li>Si ce n\'est pas déjà fait, retourner sur votre portail (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) afin d\'y déposer les relevés de notes de votre pays d\'origine (dans leur langue d\'origine s\'ils sont en français ou en anglais, ou accompagnés d\'une traduction officielle au besoin) ;</li>\n';
        }
        h +=
          "  <li>Répondre directement à ce courriel avec votre choix de réorientation ou vos nouveaux choix de métiers pour mettre à jour votre dossier.</li>\n";
        h += "</ul>\n";
      } else {
        if (isPRAdmissible) {
          h +=
            '<p class="mt-4 text-sm text-slate-700">De plus, si ce n\'est pas déjà fait, veuillez retourner sur votre portail (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) afin d\'y déposer les relevés de notes de votre pays d\'origine. Ceux-ci doivent être rédigés en français ou en anglais, ou être accompagnés d\'une traduction officielle au besoin.</p>\n';
        }
        h +=
          '<p class="mt-4">Nous vous remercions pour votre intérêt envers les Forces armées canadiennes. Veuillez nous faire part de votre décision en répondant directement à ce courriel afin de poursuivre ou de mettre à jour votre dossier.</p>\n';
      }

      h +=
        '<p class="mt-4 text-sm text-slate-600">Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.</p>\n';
      h += '<p>' + this.sharedState.getHtmlSignatureFr() + '</p>\n';
      h += '<hr class="my-6 border-slate-200" />\n';

      // ======================================
      // ENGLISH SECTION
      // ======================================
      h += '<p class="mt-4">Hello,</p>\n';

      if (isPforCmr) {
        h += `<p class="mt-4">We are pleased to inform you that, following the assessment of your transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), <strong>you have been admitted to RMC in the following field(s) of study: ${cmrAdmittedEn || "your selection"}!</strong> We would like to warmly congratulate you on your admission.</p>\n`;
      }

      if (mergeTasks) {
        if (isPforCmr) {
          h +=
            '<p class="mt-4">However, certain actions on your part are required to allow us to continue processing your application. You must both <strong>correct the tasks that have been reassigned to you</strong> on your portal and undergo a <strong>reorientation for your occupation choices</strong>.</p>\n';
        } else {
          h +=
            '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Civilian Universities)</strong>, we note that certain actions are required. You must both <strong>correct the tasks that have been reassigned to you</strong> on your portal and undergo a <strong>reorientation for your occupation choices</strong>.</p>\n';
        }

        const rawHtmlEn = this.sharedState.taskEmailHtmlEn();
        let taskPartHtmlEn = "";
        if (rawHtmlEn.includes("<!-- START_TASK_BODY_EN -->")) {
          const enParts = rawHtmlEn.split("<!-- START_TASK_BODY_EN -->");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("<!-- END_TASK_BODY_EN -->");
            if (enBodyPart.length > 0) {
              taskPartHtmlEn = enBodyPart[0].trim();
            }
          }
        } else {
          const enParts = rawHtmlEn.split("<p>Hello,</p>");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("<p>Due to a high volume");
            if (enBodyPart.length > 0 && enBodyPart[0].trim().length > 0) {
              taskPartHtmlEn = enBodyPart[0].trim();
            }
          }
        }

        if (taskPartHtmlEn) {
          h +=
            '<div class="mt-4 p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-sm">\n';
          h +=
            '<p class="font-bold text-black border-b border-amber-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">1. TASKS AND COMMUNICATIONS TO CORRECT ON YOUR PORTAL:</p>\n';
          h += taskPartHtmlEn + "\n";
          h += "</div>\n";
        }

        h +=
          '<p class="mt-6 font-bold text-slate-900 border-b border-slate-200 pb-1 mb-2 text-base" style="font-size: 15px; font-weight: bold; color: #000000;">2. STATUS OF YOUR CURRENT OCCUPATION CHOICES AND REQUIRED REORIENTATION:</p>\n';
      } else {
        if (hasNoJobCode) {
          if (isPforCmr) {
            h +=
              "<p class=\"mt-4\">However, no occupation is currently selected on your file, and processing cannot continue without an eligible occupation choice on your part.</p>\n";
          } else {
            h +=
              "<p class=\"mt-4\">Following the analysis of your application file, we note that you require a reorientation. Indeed, no occupation is currently selected on your file, and processing cannot continue without an occupation choice on your part.</p>\n";
          }
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (isPforCmr) {
            if (!mergeTasks) {
              h +=
                "<p class=\"mt-4\">However, following the review of your current occupation choices, we find that a reorientation is required. Here is the status of the occupations currently on your file:</p>\n";
            }
          } else {
            h +=
              "<p class=\"mt-4\">Following the review of your application file for the Regular Officer Training Plan (ROTP - Civilian Universities), we find that a reorientation is required. Here is the status of the occupations currently on your file:</p>\n";
          }
        } else {
          h +=
            '<p class="mt-4">Here is the status of the other occupations on your file:</p>\n';
        }
        h += '<ul class="list-disc pl-5 mt-2 mb-4">\n';
        for (const id of realDossierIds) {
          const name = `${id} - ${this.getJobLinkMarkup(id, false, true)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonEn = "";
          if (s) {
            const reasonsEnList: string[] = [];
            if (s.isJobClosed) {
              reasonsEnList.push(
                "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).",
              );
            }
            if (!s.isAgeAdmissible) {
              reasonsEnList.push(
                `Your age does not allow completing the initial contract (${s.durationYears} years) before age 60.`,
              );
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsEnList.push(
                "For various reasons, this occupation is not open to permanent residents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsEnList.push(s.educationReasonEn);
            }
            if (!s.isMedicalAdmissible) {
              reasonsEnList.push(s.medicalReasonEn);
            }

            if (reasonsEnList.length > 0) {
              reasonEn = `\n    <ul class="list-disc pl-5 mt-1 text-sm text-slate-600">\n      <li>${reasonsEnList.join("</li>\n      <li>")}</li>\n    </ul>`;
            } else {
              reasonEn =
                " : Eligible (reorientation initiated for other elements of the file).";
            }
          }
          h += `  <li class="mt-1"><strong>${name}</strong>${reasonEn}</li>\n`;
        }
        h += "</ul>\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          h +=
            "<p class=\"mt-4\">Following the review of your application file, we note that your current occupation choices are not available under ROTP or require a field of study different from your admission to RMC.</p>\n";
        } else {
          h +=
            "<p class=\"mt-4\">Following the review of your application file, we note that your current occupation choices are not available or you are not eligible based on our criteria.</p>\n";
        }
      }

      // Options English
      h +=
        '<p class="mt-4 font-semibold text-slate-800">Here are the options available to you:</p>\n';
      if (hasClosedButAdmissibleJobs) {
        if (allRealDossierJobsAreClosedButAdmissible) {
          h +=
            '<p class="mt-2 text-sm"><strong>Option 1: Keep your current occupation choices and wait for them to reopen</strong><br>You may choose to keep your current occupation choices and wait until next April for positions to reopen. If you select this option, <span style="background-color: #fef08a; font-weight: bold;">your current application file will be closed</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your full responsibility to contact us near the end of next March</span> to reactivate your process.</p>\n';
        } else {
          h +=
            '<p class="mt-2 text-sm"><strong>Option 1: Keep some of your current occupation choices and wait for them to reopen</strong><br>You may choose to keep the following occupation(s) for which you are eligible: <strong>' +
            closedButAdmissibleJobsEn.join(", ") +
            '</strong>, and wait until next April for positions to reopen. If you select this option, <span style="background-color: #fef08a; font-weight: bold;">your current application file will be closed</span> and it will be <span style="background-color: #fef08a; font-weight: bold;">your full responsibility to contact us near the end of next March</span> to reactivate your process for this or these occupations.</p>\n';
        }
        h +=
          '<p class="mt-4 text-sm"><strong>Option 2: Choose another occupation from the list of eligible occupations</strong><br>You can reorient your application towards other eligible occupation choices right now. See the list below.</p>\n';
      } else {
        h +=
          '<p class="mt-2 text-sm"><strong>Choose another occupation from the list of eligible occupations</strong><br>You must reorient your application towards an occupation choice for which you are eligible in order to continue the enrolment process. Please see the list below.</p>\n';
      }

      if (this.ignoreSip()) {
        h +=
          '<div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-900" style="margin-top: 16px; padding: 12px; background-color: #fefce8; border: 1px solid #fef08a; border-radius: 4px; font-size: 14px; color: #713f12;">\n';
        h +=
          '  <strong>Important note regarding closed occupations:</strong> The list below includes occupations that are currently open and closed. If you choose an <span style="background-color: #fef08a; font-weight: bold;">open occupation</span>, we can continue processing your application immediately. However, if you choose a <span style="background-color: #fecaca; color: #991b1b; font-weight: bold;">closed occupation</span> (marked in red), we will have to close your file and it will be <span style="background-color: #fef08a; font-weight: bold;">your full responsibility to call us back near the end of next March</span> to reopen your file in that occupation.\n';
        h += '</div>\n';
      }

      // Eligible Jobs English Division
      h +=
        '<div class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">\n';
      h +=
        '<p class="font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2">ELIGIBLE OCCUPATIONS:</p>\n';

      if (isPilotEligible) {
        h +=
          '<div class="mt-2 mb-3 p-3 bg-amber-50 border border-amber-300 rounded text-amber-900 text-xs" style="margin-top: 8px; margin-bottom: 12px; padding: 10px; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; font-size: 13px; color: #78350f;">\n' +
          '  <strong>Notice – Choice of Pilot (00183):</strong> Since the Pilot occupation is highly competitive (very limited vacancies), if you select this occupation, you must mandatory choose a second occupation from the list of eligible occupations.\n' +
          '</div>\n';
      }

      if (listOFF.length === 0 && listClosedOFF.length === 0) {
        h +=
          '<p class="mt-2 text-slate-700 italic">No open ROTP occupations currently available for the selected profile.</p>\n';
      } else {
        h += renderHtmlList(listOFF, false, false);
        if (listClosedOFF.length > 0) {
          h += renderHtmlList(listClosedOFF, true, false);
        }
      }
      h += "</div>\n";

      // Conclusion English
      if (mergeTasks) {
        h +=
          '<p class="mt-6 font-semibold text-slate-800">Next Steps:</p>\n';
        h +=
          "<p>Due to a high volume of applications, we must prioritize files where all tasks are completed. We invite you to:</p>\n";
        h += '<ul class="list-disc pl-5 mt-1 mb-2 text-sm text-slate-700">\n';
        h +=
          '  <li>Visit your portal (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) to correct without delay the tasks indicated above;</li>\n';
        if (isPRAdmissible) {
          h +=
            '  <li>If not already done, return to your portal (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) to upload the transcripts from your country of origin (in their original language if in English or French, or accompanied by an official translation if needed);</li>\n';
        }
        h +=
          "  <li>Reply directly to this email with your reorientation choice or your new occupation choices to update your file.</li>\n";
        h += "</ul>\n";
      } else {
        if (isPRAdmissible) {
          h +=
            '<p class="mt-4 text-sm text-slate-700">Additionally, if you have not already done so, please return to your portal (<a href="https://www.cafoap-pclfac.forces.gc.ca/" class="text-blue-600 hover:underline">https://www.cafoap-pclfac.forces.gc.ca/</a>) to upload your transcripts from your country of origin. These must be in English or French, or accompanied by an official translation if necessary.</p>\n';
        }
        h +=
          '<p class="mt-4">Thank you for your interest in the Canadian Armed Forces. Please inform us of your decision by replying directly to this email in order to continue or update your file.</p>\n';
      }

      h +=
        '<p class="mt-4 text-sm text-slate-600">If you take no action, your file will be automatically deactivated after 30 days.</p>\n';
      h += '<p>' + this.sharedState.getHtmlSignatureEn() + '</p>\n';

      return h;
    } else {
      // PLAIN TEXT VERSION
      let t = "";
      t += "English message will follow.\n";
      t += "========================================\n\n";

      // French Plain Text
      t += "Bonjour,\n\n";

      if (isPforCmr) {
        t += `Nous avons le plaisir de vous informer que, suite à l'évaluation de vos relevés de notes et de votre potentiel académique par le Collège militaire royal du Canada (CMR) pour le Programme de formation des officiers de la force régulière (PFOR), vous avez été admis(e) au CMR dans le(s) domaine(s) d'études suivant(s) : ${cmrAdmittedFr || "votre sélection"} ! Nous tenons à vous féliciter chaleureusement pour cette admission.\n\n`;
      }

      if (mergeTasks) {
        if (isPforCmr) {
          t +=
            "Toutefois, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        } else {
          t +=
            "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que certaines actions de votre part sont requises. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.\n\n";
        }

        let taskPartTxt = "";
        if (rawTxt.includes("<!-- START_TASK_BODY_FR -->")) {
          const frParts = rawTxt.split("<!-- START_TASK_BODY_FR -->");
          if (frParts.length > 1) {
            const frBodyPart = frParts[1].split("<!-- END_TASK_BODY_FR -->");
            if (frBodyPart.length > 0) {
              taskPartTxt = frBodyPart[0].trim();
            }
          }
        } else {
          const frParts = rawTxt.split("Bonjour,");
          if (frParts.length > 1) {
            const frBodyPart = frParts[1].split("En raison du volume");
            if (frBodyPart.length > 0 && frBodyPart[0].trim().length > 0) {
              taskPartTxt = frBodyPart[0].trim();
            }
          }
        }

        if (taskPartTxt) {
          t += "1. TÂCHES ET COMMUNICATIONS À CORRIGER SUR VOTRE PORTAIL :\n";
          t +=
            "----------------------------------------------------------------------\n";
          t += taskPartTxt + "\n\n";
        }

        t +=
          "2. STATUT DE VOS CHOIX DE MÉTIERS ACTUELS ET RÉORIENTATION REQUISE :\n";
        t +=
          "----------------------------------------------------------------------\n";
      } else {
        if (hasNoJobCode) {
          if (isPforCmr) {
            t +=
              "Toutefois, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.\n\n";
          } else {
            t +=
              "Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.\n\n";
          }
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (isPforCmr) {
            if (!mergeTasks) {
              t +=
                "Toutefois, suite à l'analyse de vos choix de métiers actuels, nous constatons qu'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :\n";
            }
          } else {
            t +=
              "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :\n";
          }
        } else {
          t +=
            "Voici le statut des autres métiers inscrits à votre dossier :\n";
        }
        for (const id of realDossierIds) {
          const name = `${id} - ${this.getJobLinkMarkup(id, true, false)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonFr = "";
          if (s) {
            const reasonsFrList: string[] = [];
            if (s.isJobClosed) {
              reasonsFrList.push(
                "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).",
              );
            }
            if (!s.isAgeAdmissible) {
              reasonsFrList.push(
                `Votre âge ne permet pas de compléter le contrat initial (${s.durationYears} ans) avant 60 ans.`,
              );
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsFrList.push(
                "Pour diverses raisons, ce métier n'est pas accessible aux résidents permanents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsFrList.push(s.educationReason);
            }
            if (!s.isMedicalAdmissible) {
              reasonsFrList.push(s.medicalReason);
            }

            if (reasonsFrList.length > 0) {
              reasonFr = `\n    - ${reasonsFrList.join("\n    - ")}`;
            } else {
              reasonFr =
                " : Admissible (réorientation lancée pour d'autres éléments du dossier).";
            }
          }
          t += `- ${name}${reasonFr}\n`;
        }
        t += "\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          t +=
            "Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou requièrent un domaine d'études différent de votre admission au CMR.\n\n";
        } else {
          t +=
            "Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou que vous n'y êtes pas admissible d'après nos critères.\n\n";
        }
      }

      t += "Voici les options qui s'offrent à vous :\n";
      if (hasClosedButAdmissibleJobs) {
        if (allRealDossierJobsAreClosedButAdmissible) {
          t +=
            "Option 1 : Conserver vos choix de métier actuels et attendre leur réouverture\nVous pouvez choisir de garder vos choix de métier actuels et de patienter jusqu'en avril prochain pour la réouverture des positions. Si vous sélectionnez cette option, votre dossier de candidature actuel sera fermé et il sera de votre entière responsabilité de nous recontacter vers la fin du mois de mars prochain pour réactiver votre processus.\n\n";
        } else {
          t +=
            "Option 1 : Conserver certains de vos choix de métier actuels et attendre leur réouverture\nVous pouvez choisir de garder le ou les métiers suivants pour lesquels vous êtes admissible : " +
            closedButAdmissibleJobs.join(", ") +
            ", et de patienter jusqu'en avril prochain pour la réouverture des positions. Si vous sélectionnez cette option, votre dossier de candidature actuel sera fermé et il sera de votre entière responsabilité de nous recontacter vers la fin du mois de mars prochain pour réactiver votre processus pour ce ou ces métiers.\n\n";
        }
        t +=
          "Option 2 : Choisir un autre métier parmi la liste des métiers admissibles\nVous pouvez réorienter votre candidature vers d'autres choix de métiers admissibles dès maintenant. Consultez la liste ci-dessous.\n\n";
      } else {
        t +=
          "Choisir un autre métier parmi la liste des métiers admissibles\nVous devez réorienter votre candidature vers un choix de métier pour lequel vous êtes admissible afin de poursuivre le processus d'enrôlement. Veuillez consulter la liste ci-dessous.\n\n";
      }

      if (this.ignoreSip()) {
        t +=
          "Note importante concernant les métiers fermés : La liste ci-dessous inclut des métiers actuellement ouverts et fermés. Si vous choisissez un métier ouvert, nous pourrons poursuivre le traitement de votre demande d'emploi immédiatement. Par contre, si vous choisissez un métier fermé (marqué FERMÉ), nous devrons fermer votre dossier et ce sera votre entière responsabilité de nous rappeler vers la fin du mois de mars prochain pour faire rouvrir votre dossier dans ce métier.\n\n";
      }

      t += "MÉTIERS ADMISSIBLES :\n";
      if (isPilotEligible) {
        t +=
          "Attention – Choix du métier de Pilote (00183) : Le métier de Pilote étant fortement contingenté (nombre de places très limité), si vous choisissez ce métier, vous devez obligatoirement sélectionner un deuxième métier parmi la liste des métiers admissibles.\n\n";
      }

      if (listOFF.length === 0 && listClosedOFF.length === 0) {
        t +=
          "Aucun métier PFOR ouvert correspondant n'est disponible actuellement pour la sélection effectuée.\n";
      } else {
        t += renderPlainList(listOFF, false, true);
        if (listClosedOFF.length > 0) {
          t += renderPlainList(listClosedOFF, true, true);
        }
      }

      if (mergeTasks) {
        t += "\nProchaines étapes :\n";
        t +=
          "En raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées. Nous vous invitons donc à :\n";
        t +=
          "  - Vous rendre sur votre portail (https://www.cafoap-pclfac.forces.gc.ca/) afin de corriger sans délai les tâches indiquées ci-dessus ;\n";
        if (isPRAdmissible) {
          t +=
            "  - Si ce n'est pas déjà fait, retourner sur votre portail (https://www.cafoap-pclfac.forces.gc.ca/) afin d'y déposer les relevés de notes de votre pays d'origine (dans leur langue d'origine s'ils sont en français ou en anglais, ou accompagnés d'une traduction officielle au besoin) ;\n";
        }
        t +=
          "  - Répondre directement à ce courriel avec votre choix de réorientation ou vos nouveaux choix de métiers pour mettre à jour votre dossier.\n";
      } else {
        if (isPRAdmissible) {
          t +=
            "\nDe plus, si ce n'est pas déjà fait, veuillez retourner sur votre portail (https://www.cafoap-pclfac.forces.gc.ca/) afin d'y déposer les relevés de notes de votre pays d'origine. Ceux-ci doivent être rédigés en français ou en anglais, ou être accompagnés d'une traduction officielle au besoin.\n";
        }
        t +=
          "\nNous vous remercions pour votre intérêt envers les Forces armées canadiennes. Veuillez nous faire part de votre décision en répondant directement à ce courriel afin de poursuivre ou de mettre à jour votre dossier.\n";
      }

      t +=
        "\nSi vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.\n\n";
      t += this.sharedState.getSignatureFr() + "\n\n";
      t += "------------------------------------------------------------\n\n";

      // English Plain Text
      t += "Hello,\n\n";

      if (isPforCmr) {
        t += `We are pleased to inform you that, following the assessment of your transcripts and academic potential by the Royal Military College of Canada (RMC) for the Regular Officer Training Plan (ROTP), you have been admitted to RMC in the following field(s) of study: ${cmrAdmittedEn || "your selection"}! We would like to warmly congratulate you on your admission.\n\n`;
      }

      if (mergeTasks) {
        if (isPforCmr) {
          t +=
            "However, certain actions on your part are required to allow us to continue processing your application. You must both correct the tasks that have been reassigned to you on your portal and undergo a reorientation for your occupation choices.\n\n";
        } else {
          t +=
            "Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Civilian Universities), we note that certain actions are required. You must both correct the tasks that have been reassigned to you on your portal and undergo a reorientation for your occupation choices.\n\n";
        }

        const rawTxtEn = this.sharedState.taskEmailEn();
        let taskPartTxtEn = "";
        if (rawTxtEn.includes("<!-- START_TASK_BODY_EN -->")) {
          const enParts = rawTxtEn.split("<!-- START_TASK_BODY_EN -->");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("<!-- END_TASK_BODY_EN -->");
            if (enBodyPart.length > 0) {
              taskPartTxtEn = enBodyPart[0].trim();
            }
          }
        } else {
          const enParts = rawTxtEn.split("Hello,");
          if (enParts.length > 1) {
            const enBodyPart = enParts[1].split("Due to a high volume");
            if (enBodyPart.length > 0 && enBodyPart[0].trim().length > 0) {
              taskPartTxtEn = enBodyPart[0].trim();
            }
          }
        }

        if (taskPartTxtEn) {
          t += "1. TASKS AND COMMUNICATIONS TO CORRECT ON YOUR PORTAL:\n";
          t +=
            "----------------------------------------------------------------------\n";
          t += taskPartTxtEn + "\n\n";
        }

        t +=
          "2. STATUS OF YOUR CURRENT OCCUPATION CHOICES AND REQUIRED REORIENTATION:\n";
        t +=
          "----------------------------------------------------------------------\n";
      } else {
        if (hasNoJobCode) {
          if (isPforCmr) {
            t +=
              "However, no occupation is currently selected on your file, and processing cannot continue without an eligible occupation choice on your part.\n\n";
          } else {
            t +=
              "Following the analysis of your application file, we note that you require a reorientation. Indeed, no occupation is currently selected on your file, and processing cannot continue without an occupation choice on your part.\n\n";
          }
        }
      }

      if (realDossierIds.length > 0) {
        if (!hasNoJobCode) {
          if (isPforCmr) {
            if (!mergeTasks) {
              t +=
                "However, following the review of your current occupation choices, we find that a reorientation is required. Here is the status of the occupations currently on your file:\n";
            }
          } else {
            t +=
              "Following the review of your application file for the Regular Officer Training Plan (ROTP - Civilian Universities), we find that a reorientation is required. Here is the status of the occupations currently on your file:\n";
          }
        } else {
          t +=
            "Here is the status of the other occupations on your file:\n";
        }
        for (const id of realDossierIds) {
          const name = `${id} - ${this.getJobLinkMarkup(id, false, false)}`;
          const s = this.evaluateJobAdmissibility(id);
          let reasonEn = "";
          if (s) {
            const reasonsEnList: string[] = [];
            if (s.isJobClosed) {
              reasonsEnList.push(
                "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).",
              );
            }
            if (!s.isAgeAdmissible) {
              reasonsEnList.push(
                `Your age does not allow completing the initial contract (${s.durationYears} years) before age 60.`,
              );
            }
            if (!s.isCitizenshipAdmissible) {
              reasonsEnList.push(
                "For various reasons, this occupation is not open to permanent residents.",
              );
            }
            if (!s.isEducationAdmissible) {
              reasonsEnList.push(s.educationReasonEn);
            }
            if (!s.isMedicalAdmissible) {
              reasonsEnList.push(s.medicalReasonEn);
            }

            if (reasonsEnList.length > 0) {
              reasonEn = `\n    - ${reasonsEnList.join("\n    - ")}`;
            } else {
              reasonEn =
                " : Eligible (reorientation initiated for other elements of the file).";
            }
          }
          t += `- ${name}${reasonEn}\n`;
        }
        t += "\n";
      } else if (!hasNoJobCode) {
        if (isPforCmr) {
          t +=
            "Following the review of your application file, we note that your current occupation choices are not available under ROTP or require a field of study different from your admission to RMC.\n\n";
        } else {
          t +=
            "Following the review of your application file, we note that your current occupation choices are not available or you are not eligible based on our criteria.\n\n";
        }
      }

      t += "Here are the options available to you:\n";
      if (hasClosedButAdmissibleJobs) {
        if (allRealDossierJobsAreClosedButAdmissible) {
          t +=
            "Option 1: Keep your current occupation choices and wait for them to reopen\nYou may choose to keep your current occupation choices and wait until next April for positions to reopen. If you select this option, your current application file will be closed and it will be your full responsibility to contact us near the end of next March to reactivate your process.\n\n";
        } else {
          t +=
            "Option 1: Keep some of your current occupation choices and wait for them to reopen\nYou may choose to keep the following occupation(s) for which you are eligible: " +
            closedButAdmissibleJobsEn.join(", ") +
            ", and wait until next April for positions to reopen. If you select this option, your current application file will be closed and it will be your full responsibility to contact us near the end of next March to reactivate your process for this or these occupations.\n\n";
        }
        t +=
          "Option 2: Choose another occupation from the list of eligible occupations\nYou can reorient your application towards other eligible occupation choices right now. See the list below.\n\n";
      } else {
        t +=
          "Choose another occupation from the list of eligible occupations\nYou must reorient your application towards an occupation choice for which you are eligible in order to continue the enrolment process. Please see the list below.\n\n";
      }

      if (this.ignoreSip()) {
        t +=
          "Important note regarding closed occupations: The list below includes occupations that are currently open and closed. If you choose an open occupation, we can continue processing your application immediately. However, if you choose a closed occupation (marked CLOSED), we will have to close your file and it will be your full responsibility to call us back near the end of next March to reopen your file in that occupation.\n\n";
      }

      t += "ELIGIBLE OCCUPATIONS:\n";
      if (isPilotEligible) {
        t +=
          "Notice – Choice of Pilot (00183): Since the Pilot occupation is highly competitive (very limited vacancies), if you select this occupation, you must mandatory choose a second occupation from the list of eligible occupations.\n\n";
      }

      if (listOFF.length === 0 && listClosedOFF.length === 0) {
        t +=
          "No open ROTP occupations currently available for the selected profile.\n";
      } else {
        t += renderPlainList(listOFF, false, false);
        if (listClosedOFF.length > 0) {
          t += renderPlainList(listClosedOFF, true, false);
        }
      }

      if (mergeTasks) {
        t += "\nNext Steps:\n";
        t +=
          "Due to a high volume of applications, we must prioritize files where all tasks are completed. We invite you to:\n";
        t +=
          "  - Visit your portal (https://www.cafoap-pclfac.forces.gc.ca/) to correct without delay the tasks indicated above;\n";
        if (isPRAdmissible) {
          t +=
            "  - If not already done, return to your portal (https://www.cafoap-pclfac.forces.gc.ca/) to upload the transcripts from your country of origin (in their original language if in English or French, or accompanied by an official translation if needed);\n";
        }
        t +=
          "  - Reply directly to this email with your reorientation choice or your new occupation choices to update your file.\n";
      } else {
        if (isPRAdmissible) {
          t +=
            "\nAdditionally, if you have not already done so, please return to your portal (https://www.cafoap-pclfac.forces.gc.ca/) to upload your transcripts from your country of origin. These must be in English or French, or accompanied by an official translation if necessary.\n";
        }
        t +=
          "\nThank you for your interest in the Canadian Armed Forces. Please inform us of your decision by replying directly to this email in order to continue or update your file.\n";
      }

      t +=
        "\nIf you take no action, your file will be automatically deactivated after 30 days.\n\n";
      t += this.sharedState.getSignatureEn() + "\n";

      return t;
    }
  }

  getReoContentHtmlFr(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.buildBilingualEmail(true),
    );
  }

  async copyBilingualEmail() {
    const html = this.buildBilingualEmail(true);
    const plain = this.buildBilingualEmail(false);

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const typeHtml = "text/html";
        const typeText = "text/plain";
        const blobHtml = new Blob([html], { type: typeHtml });
        const blobText = new Blob([plain], { type: typeText });
        const data = [
          new ClipboardItem({
            [typeHtml]: blobHtml,
            [typeText]: blobText,
          }),
        ];
        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(plain);
      }
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  }
}
