import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  ReorientationLogicMatrixService,
  JobRuleSummary,
} from "../../../services/reorientation/reorientation-logic-matrix.service";
import { TranslationService } from "../../i18n";
import { MANUAL_CRITERIA } from "../../data/reorientation-criteria.data";

@Component({
  selector: "app-criteria-matrix",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col h-full bg-slate-50 text-slate-800 rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      
      <!-- TOP HEADER & STATS -->
      <div class="bg-white border-b border-slate-200 p-4 sm:p-6 flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center justify-center p-2 rounded-xl bg-indigo-50 text-indigo-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </span>
              <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {{ i18n.t('criteriaMatrix.tabTitle') }}
              </h1>
            </div>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">
              {{ i18n.t('criteriaMatrix.tabSubtitle') }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <button
              (click)="exportToCsv()"
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer shadow-xs"
              [title]="i18n.t('criteriaMatrix.exportCsv')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{{ i18n.t('criteriaMatrix.exportCsv') }}</span>
            </button>
          </div>
        </div>

        <!-- STATS BAR -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col">
            <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {{ i18n.t('criteriaMatrix.statsTotalJobs') }}
            </span>
            <span class="text-xl font-bold text-slate-800 mt-0.5">
              {{ matrixService.allJobsMatrix().length }}
            </span>
          </div>

          <div class="p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 flex flex-col">
            <span class="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">
              {{ i18n.t('criteriaMatrix.statsNcmJobs') }}
            </span>
            <span class="text-xl font-bold text-blue-900 mt-0.5">
              {{ countNcm() }}
            </span>
          </div>

          <div class="p-3 rounded-xl bg-purple-50/60 border border-purple-200/70 flex flex-col">
            <span class="text-[11px] font-semibold text-purple-700 uppercase tracking-wider">
              {{ i18n.t('criteriaMatrix.statsOfficerJobs') }}
            </span>
            <span class="text-xl font-bold text-purple-900 mt-0.5">
              {{ countOfficers() }}
            </span>
          </div>

          <div class="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/70 flex flex-col">
            <span class="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
              {{ i18n.t('criteriaMatrix.statsCoverage') }}
            </span>
            <span class="text-xl font-bold text-emerald-800 mt-0.5">
              100% (96/96)
            </span>
          </div>
        </div>

        <!-- VIEW TOGGLE TABS -->
        <div class="flex items-center gap-2 border-b border-slate-200 pt-2">
          <button
            (click)="matrixService.viewMode.set('jobs')"
            class="px-4 py-2 font-medium text-xs sm:text-sm border-b-2 transition-all cursor-pointer"
            [class.border-indigo-600]="matrixService.viewMode() === 'jobs'"
            [class.text-indigo-600]="matrixService.viewMode() === 'jobs'"
            [class.border-transparent]="matrixService.viewMode() !== 'jobs'"
            [class.text-slate-500]="matrixService.viewMode() !== 'jobs'"
          >
            {{ i18n.t('criteriaMatrix.viewModeJobs') }}
          </button>

          <button
            (click)="matrixService.viewMode.set('checkboxes')"
            class="px-4 py-2 font-medium text-xs sm:text-sm border-b-2 transition-all cursor-pointer"
            [class.border-indigo-600]="matrixService.viewMode() === 'checkboxes'"
            [class.text-indigo-600]="matrixService.viewMode() === 'checkboxes'"
            [class.border-transparent]="matrixService.viewMode() !== 'checkboxes'"
            [class.text-slate-500]="matrixService.viewMode() !== 'checkboxes'"
          >
            {{ i18n.t('criteriaMatrix.viewModeCheckboxes') }}
          </button>
        </div>
      </div>

      <!-- VIEW 1: BY OCCUPATION -->
      @if (matrixService.viewMode() === 'jobs') {
        <!-- FILTER BAR -->
        <div class="bg-white px-4 sm:px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div class="flex-1 min-w-[240px] relative">
            <input
              type="text"
              [ngModel]="matrixService.searchQuery()"
              (ngModelChange)="matrixService.searchQuery.set($event)"
              [placeholder]="i18n.t('criteriaMatrix.searchPlaceholder')"
              class="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/60"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <!-- Category Filter (MR vs Officier) -->
            <select
              [ngModel]="matrixService.categoryFilter()"
              (ngModelChange)="matrixService.categoryFilter.set($event)"
              class="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="ALL">{{ i18n.t('criteriaMatrix.filterCategoryAll') }}</option>
              <option value="NCM">{{ i18n.t('criteriaMatrix.filterCategoryNcm') }}</option>
              <option value="Officer">{{ i18n.t('criteriaMatrix.filterCategoryOfficer') }}</option>
            </select>

            <!-- Element Filter (Armée, Air, Marine, CMP) -->
            <select
              [ngModel]="matrixService.elementFilter()"
              (ngModelChange)="matrixService.elementFilter.set($event)"
              class="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="ALL">{{ i18n.t('criteriaMatrix.filterElementAll') }}</option>
              <option value="Armée">{{ i18n.t('criteriaMatrix.elementArmy') }}</option>
              <option value="Air">{{ i18n.t('criteriaMatrix.elementAir') }}</option>
              <option value="Marine">{{ i18n.t('criteriaMatrix.elementNavy') }}</option>
              <option value="CMP">{{ i18n.t('criteriaMatrix.elementCmp') }}</option>
            </select>

            <!-- Citizenship Filter -->
            <select
              [ngModel]="matrixService.citizenshipFilter()"
              (ngModelChange)="matrixService.citizenshipFilter.set($event)"
              class="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="ALL">{{ i18n.t('criteriaMatrix.filterCitizenshipAll') }}</option>
              <option value="CC">{{ i18n.t('criteriaMatrix.filterCitizenshipCc') }}</option>
              <option value="RP">{{ i18n.t('criteriaMatrix.filterCitizenshipRp') }}</option>
            </select>
          </div>
        </div>

        <!-- JOBS TABLE CONTAINER -->
        <div class="flex-1 overflow-auto p-4 sm:p-6">
          <div class="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <table class="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr class="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">
                  <th class="py-3 px-4 w-20">{{ i18n.t('criteriaMatrix.colJobCode') }}</th>
                  <th class="py-3 px-4 min-w-[180px]">{{ i18n.t('criteriaMatrix.colJobTitle') }}</th>
                  <th class="py-3 px-3 w-28 text-center">{{ i18n.t('criteriaMatrix.colCategory') }}</th>
                  <th class="py-3 px-3 w-24 text-center">{{ i18n.t('criteriaMatrix.colElement') }}</th>
                  <th class="py-3 px-3 w-28 text-center">{{ i18n.t('criteriaMatrix.colCitizenship') }}</th>
                  <th class="py-3 px-4 min-w-[280px]">{{ i18n.t('criteriaMatrix.colRequiredCheckboxes') }}</th>
                  <th class="py-3 px-3 w-36 text-center">{{ i18n.t('criteriaMatrix.colExtraTests') }}</th>
                  <th class="py-3 px-3 w-20 text-center">{{ i18n.t('criteriaMatrix.colActions') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                @for (job of matrixService.filteredJobs(); track job.jobId) {
                  <tr class="hover:bg-indigo-50/30 transition-colors">
                    <!-- Code -->
                    <td class="py-3 px-4 font-mono font-bold text-slate-900">
                      {{ job.jobId }}
                    </td>

                    <!-- Title -->
                    <td class="py-3 px-4 font-medium text-slate-800">
                      {{ i18n.isEn() ? job.titleEn : job.titleFr }}
                    </td>

                    <!-- Category -->
                    <td class="py-3 px-3 text-center">
                      @if (job.category === 'NCM') {
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                          {{ i18n.t('criteriaMatrix.badgeNcm') }}
                        </span>
                      } @else {
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200/80">
                          {{ i18n.t('criteriaMatrix.badgeOfficer') }}
                        </span>
                      }
                    </td>

                    <!-- Element -->
                    <td class="py-3 px-3 text-center">
                      @switch (job.element) {
                        @case ('Armée') {
                          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                            Armée
                          </span>
                        }
                        @case ('Air') {
                          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-300">
                            Air
                          </span>
                        }
                        @case ('Marine') {
                          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-900 text-white shadow-2xs">
                            Marine
                          </span>
                        }
                        @case ('CMP') {
                          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-300">
                            CMP
                          </span>
                        }
                        @default {
                          <span class="text-slate-400 text-xs">{{ job.element }}</span>
                        }
                      }
                    </td>

                    <!-- Citizenship -->
                    <td class="py-3 px-3 text-center">
                      @if (job.allowPR) {
                        <span class="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {{ i18n.t('criteriaMatrix.badgeRpEligible') }}
                        </span>
                      } @else {
                        <span class="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          {{ i18n.t('criteriaMatrix.badgeCcOnly') }}
                        </span>
                      }
                    </td>

                    <!-- Requirements Description -->
                    <td class="py-3 px-4">
                      <div class="flex flex-col gap-1.5">
                        @for (req of job.requirements; track $index) {
                          <div class="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs leading-relaxed text-slate-700">
                            {{ i18n.isEn() ? req.descriptionEn : req.descriptionFr }}
                          </div>
                        }
                      </div>
                    </td>

                    <!-- Extra Tests -->
                    <td class="py-3 px-3 text-center">
                      @if (job.extraTests.length > 0) {
                        <div class="flex flex-col gap-1 items-center">
                          @for (t of job.extraTests; track t) {
                            <span class="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              {{ t }}
                            </span>
                          }
                        </div>
                      } @else {
                        <span class="text-slate-400 text-xs italic">
                          —
                        </span>
                      }
                    </td>

                    <!-- Action Details -->
                    <td class="py-3 px-3 text-center">
                      <button
                        (click)="matrixService.selectedJobForDetail.set(job)"
                        class="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 transition-colors cursor-pointer"
                        [title]="i18n.t('criteriaMatrix.colActions')"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="py-8 text-center text-slate-500 italic">
                      {{ i18n.t('criteriaMatrix.noResults') }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- VIEW 2: REVERSE LOOKUP BY CHECKBOX -->
      @if (matrixService.viewMode() === 'checkboxes') {
        <div class="flex-1 overflow-auto p-4 sm:p-6 flex flex-col gap-4">
          <!-- SELECTOR BOX -->
          <div class="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3">
            <label class="text-xs sm:text-sm font-semibold text-slate-700">
              {{ i18n.t('criteriaMatrix.reverseSelectCheckboxLabel') }}
            </label>

            <select
              [ngModel]="matrixService.selectedCriterionForReverse()"
              (ngModelChange)="matrixService.selectedCriterionForReverse.set($event)"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            >
              <optgroup label="Secondaire & Mathématiques">
                <option value="sec4_24_credits">Sec 4 (24 crédits) / 10th grade</option>
                <option value="des_12e_annee">DES ou 12e année / High School Diploma</option>
                <option value="aens">AENS (Attestation d'équivalence)</option>
                <option value="francais_sec4_10e">Français/Anglais sec 4 / Grade 10 English/French</option>
                <option value="francais_sec5_11e">Français/Anglais sec 5 / Grade 11 English/French</option>
                <option value="anglais_sec5_12e">Anglais sec 5 / Grade 12 English</option>
                <option value="sci_tech4_sci10">Science & technologie sec 4 / Grade 10 Science</option>
                <option value="chimie_sec5_11e">Chimie sec 5 / Grade 11 Chemistry</option>
                <option value="physique_sec5_11e">Physique sec 5 / Grade 11 Physics</option>
                <option value="base_math_10_gen">Math sec 4/10e (générales)</option>
                <option value="base_math_10_app">Math sec 4/10e (appliquées)</option>
                <option value="base_math_10_adv">Math sec 4/10e (avancées)</option>
                <option value="base_math_11_gen">Math sec 5/11e (générales)</option>
                <option value="base_math_11_app">Math sec 5/11e (appliquées)</option>
                <option value="base_math_11_adv">Math sec 5/11e (avancées)</option>
                <option value="base_math_12_adv">Math 12e (avancées) / CEGEP 201</option>
              </optgroup>

              <optgroup label="Cours spécialisés & DEP">
                <option value="cs_dep_cuisine">DEP en cuisine</option>
                <option value="cs_dep_electricite">DEP en électricité</option>
                <option value="cs_dep_plomberie_chauffage">DEP en plomberie et chauffage</option>
                <option value="cs_dep_charpenterie">DEP en charpenterie</option>
                <option value="cs_dep_refrigeration">DEP en réfrigération</option>
                <option value="cs_dep_arpentage_topo">DEP en arpentage et topographie</option>
                <option value="cs_dep_sante_infirmiers">DEP en santé, assistance et soins infirmiers</option>
                <option value="cs_tech_lab_med">DEC en technologie d'analyses biomédicales</option>
                <option value="cs_tech_radio_med">DEC en technologie de radiodiagnostic</option>
                <option value="cs_tech_policieres">DEC en techniques policières</option>
                <option value="cs_dip_cyber">Diplôme en cybersécurité</option>
                <option value="cs_cert_assist_dentaire">Certificat d'assistance dentaire</option>
                <option value="cs_cert_soins_param">Certificat en soins paramédicaux</option>
              </optgroup>

              <optgroup label="Diplômes universitaires (1er cycle & supérieurs)">
                <option value="univ_1er_cycle_global">Diplôme universitaire générique (1er cycle)</option>
                <option value="bacc_sante_sciences_infirmieres">Bacc. en sciences infirmières</option>
                <option value="bacc_sante_physiotherapie">Bacc. en physiothérapie</option>
                <option value="bacc_sante_medecine_dentaire">Doctorat en médecine dentaire (DMD)</option>
                <option value="bacc_sante_pharmacie">Bacc./Pharm.D. en pharmacie</option>
                <option value="bacc_sante_adjoint_medecin">Diplôme d'adjoint au médecin</option>
                <option value="doctorat_medecine">Doctorat en médecine (M.D.)</option>
                <option value="bacc_arts_droit">Bacc. en droit (LL.B. / J.D.)</option>
                <option value="bacc_arts_communications">Bacc. en communications</option>
                <option value="bacc_arts_criminologie">Bacc. en criminologie</option>
                <option value="bacc_arts_psychologie">Bacc. en psychologie</option>
                <option value="bacc_arts_theologie">Bacc. en théologie / pastorale</option>
                <option value="bacc_genie_civil">Bacc. en génie civil</option>
                <option value="bacc_genie_mecanique">Bacc. en génie mécanique</option>
                <option value="bacc_genie_electrique">Bacc. en génie électrique</option>
                <option value="bacc_genie_informatique">Bacc. en génie informatique</option>
                <option value="bacc_genie_aerospatiale_aeronautique">Bacc. en génie aérospatial</option>
              </optgroup>
            </select>
          </div>

          <!-- REVERSE IMPACT RESULTS -->
          @let impact = matrixService.selectedCriterionImpact();
          <div class="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 class="text-base font-bold text-slate-900">
                  {{ i18n.isEn() ? impact.labelEn : impact.labelFr }}
                </h2>
                <span class="text-xs text-slate-500 font-mono">
                  ID: {{ impact.id }}
                </span>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {{ impact.unlockedJobsDirect.length + impact.unlockedJobsCombined.length }} {{ i18n.t('criteriaMatrix.unlockedJobsCount') }}
              </span>
            </div>

            <!-- Direct Unlocks -->
            @if (impact.unlockedJobsDirect.length > 0) {
              <div>
                <h3 class="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {{ i18n.t('criteriaMatrix.solePrerequisite') }} ({{ impact.unlockedJobsDirect.length }})
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  @for (job of impact.unlockedJobsDirect; track job.id) {
                    <div class="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200/80 flex items-center gap-2">
                      <span class="font-mono font-bold text-emerald-900 text-xs">{{ job.id }}</span>
                      <span class="text-xs font-medium text-slate-800 truncate">{{ i18n.isEn() ? job.titleEn : job.titleFr }}</span>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Combined Unlocks -->
            @if (impact.unlockedJobsCombined.length > 0) {
              <div class="mt-2">
                <h3 class="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                  {{ i18n.t('criteriaMatrix.combinedPrerequisite') }} ({{ impact.unlockedJobsCombined.length }})
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  @for (job of impact.unlockedJobsCombined; track job.id) {
                    <div class="p-2.5 rounded-lg bg-indigo-50/40 border border-indigo-200/80 flex flex-col gap-1">
                      <div class="flex items-center gap-2">
                        <span class="font-mono font-bold text-indigo-900 text-xs">{{ job.id }}</span>
                        <span class="text-xs font-medium text-slate-800 truncate">{{ i18n.isEn() ? job.titleEn : job.titleFr }}</span>
                      </div>
                      <span class="text-[10px] text-indigo-600 font-semibold">
                        {{ i18n.isEn() ? job.requiredOtherEn : job.requiredOtherFr }}
                      </span>
                    </div>
                  }
                </div>
              </div>
            }

            @if (impact.unlockedJobsDirect.length === 0 && impact.unlockedJobsCombined.length === 0) {
              <div class="py-6 text-center text-slate-500 italic text-xs">
                {{ i18n.t('criteriaMatrix.noResults') }}
              </div>
            }
          </div>
        </div>
      }

      <!-- DETAIL MODAL -->
      @if (matrixService.selectedJobForDetail()) {
        @let selectedJob = matrixService.selectedJobForDetail()!;
        <div class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6 flex flex-col gap-4 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div class="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span class="font-mono font-bold text-indigo-600 text-sm">#{{ selectedJob.jobId }}</span>
                <h3 class="text-lg font-bold text-slate-900">
                  {{ i18n.isEn() ? selectedJob.titleEn : selectedJob.titleFr }}
                </h3>
              </div>
              <button
                (click)="matrixService.selectedJobForDetail.set(null)"
                class="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="flex flex-col gap-3 text-xs sm:text-sm">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-slate-600">{{ i18n.t('criteriaMatrix.colCategory') }} :</span>
                <span>{{ selectedJob.category === 'NCM' ? i18n.t('criteriaMatrix.badgeNcm') : i18n.t('criteriaMatrix.badgeOfficer') }}</span>
              </div>

              <div class="flex items-center gap-2">
                <span class="font-semibold text-slate-600">{{ i18n.t('criteriaMatrix.colCitizenship') }} :</span>
                <span>{{ selectedJob.allowPR ? i18n.t('criteriaMatrix.badgeRpEligible') : i18n.t('criteriaMatrix.badgeCcOnly') }}</span>
              </div>

              @if (selectedJob.extraTests.length > 0) {
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-slate-600">{{ i18n.t('criteriaMatrix.colExtraTests') }} :</span>
                  <span class="font-bold text-rose-700">{{ selectedJob.extraTests.join(', ') }}</span>
                </div>
              }

              <div class="mt-2 flex flex-col gap-1.5">
                <span class="font-bold text-slate-900">{{ i18n.t('criteriaMatrix.colRequiredCheckboxes') }} :</span>
                @for (req of selectedJob.requirements; track $index) {
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-700">
                    <p class="font-semibold text-indigo-900 mb-1">
                      {{ req.type === 'customCheck' ? i18n.t('criteriaMatrix.customCheckRule') : i18n.t('criteriaMatrix.requiredIdsRule') }}
                    </p>
                    <p>{{ i18n.isEn() ? req.descriptionEn : req.descriptionFr }}</p>
                  </div>
                }
              </div>
            </div>

            <div class="flex justify-end pt-3 border-t border-slate-200">
              <button
                (click)="matrixService.selectedJobForDetail.set(null)"
                class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
              >
                {{ i18n.t('criteriaMatrix.closeModal') }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class CriteriaMatrixComponent {
  matrixService = inject(ReorientationLogicMatrixService);
  i18n = inject(TranslationService);

  countNcm = computed(
    () => this.matrixService.allJobsMatrix().filter((j) => j.category === "NCM").length
  );

  countOfficers = computed(
    () => this.matrixService.allJobsMatrix().filter((j) => j.category === "Officer").length
  );

  exportToCsv() {
    const isEn = this.i18n.isEn();
    const headers = [
      "Code",
      isEn ? "Title" : "Intitulé",
      isEn ? "Category" : "Catégorie",
      isEn ? "Element" : "Élément",
      isEn ? "Citizenship" : "Citoyenneté",
      isEn ? "Required Checkboxes" : "Cases requises",
      isEn ? "Extra Tests" : "Tests obligatoires",
    ];

    const rows = this.matrixService.allJobsMatrix().map((j) => {
      const title = (isEn ? j.titleEn : j.titleFr).replace(/"/g, '""');
      const cat = j.category;
      const element = j.element;
      const cit = j.allowPR ? "RP" : "CC";
      const req = j.requirements
        .map((r) => (isEn ? r.descriptionEn : r.descriptionFr))
        .join(" | ")
        .replace(/"/g, '""');
      const tests = j.extraTests.join(", ");

      return `"${j.jobId}","${title}","${cat}","${element}","${cit}","${req}","${tests}"`;
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `marcel-criteres-metiers-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
