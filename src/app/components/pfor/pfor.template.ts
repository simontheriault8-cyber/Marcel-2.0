export const PFOR_TEMPLATE = `
    <div class="h-full flex flex-col min-h-0 bg-slate-50">
      <!-- HEADER -->
      <div
        class="p-4 bg-white border-b border-slate-200 shrink-0 flex items-start justify-between relative z-20"
      >
        <div class="flex items-start gap-4">
          <button
            (click)="resetAll()"
            class="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 transition-all text-slate-600 shrink-0 border border-slate-200 mt-1 cursor-pointer"
            [title]="i18n.t('pfor.resetTitle')"
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
              <span class="bg-indigo-600 text-white text-xs font-black px-2 py-0.5 rounded tracking-wider leading-none">{{ i18n.t('pfor.badge') }}</span>
              <h2 class="text-xl font-bold text-slate-800">
                {{ i18n.t('pfor.title') }}
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
                  {{ i18n.t('pfor.sipDate', { date: jobService.sipDate() }) }}
                </span>
              }
            </div>
            <p class="text-sm text-slate-500 mt-1">
              {{ i18n.t('pfor.subtitle') }}
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
              <span>{{ i18n.t('pfor.optionsButton') }}</span>
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
                    <span class="font-bold text-slate-800">{{ i18n.t('pfor.includeSip') }}</span>
                    <span class="text-[11px] text-slate-500">{{ i18n.t('pfor.includeSipDesc') }}</span>
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
                    <span class="font-bold text-slate-800">{{ i18n.t('pfor.includeTraitement') }}</span>
                    <span class="text-[11px] text-slate-500">{{ i18n.t('pfor.includeTraitementDesc') }}</span>
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
                    <span class="font-bold text-slate-800">{{ i18n.t('pfor.medLim') }}</span>
                    <span class="text-[11px] text-slate-500">{{ i18n.t('pfor.medLimDesc') }}</span>
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
              {{ i18n.t('pfor.candidateProfile') }}
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Âge -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">{{ i18n.t('pfor.age') }}</label>
                <input
                  type="number"
                  [ngModel]="age()"
                  (ngModelChange)="age.set($event)"
                  min="16"
                  max="65"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  [placeholder]="i18n.t('reo.applicantAgePlaceholder')"
                />
              </div>

              <!-- Citoyenneté -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">{{ i18n.t('pfor.citizenship') }}</label>
                <select
                  [ngModel]="citizenship()"
                  (ngModelChange)="citizenship.set($event)"
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                >
                  <option value="Canadian Citizen">{{ i18n.t('reo.canadianCitizen') }}</option>
                  <option value="PR > 3 years">{{ i18n.t('reo.prAdmissible') }}</option>
                  <option value="PR < 3 years">{{ i18n.t('reo.prInadmissible') }}</option>
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
                  <p class="font-bold text-sm">{{ i18n.t('reo.rpInadmissibleTitle') }}</p>
                  <p class="text-xs text-red-700 mt-0.5">
                    {{ i18n.t('reo.rpInadmissibleDesc') }}
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
                    {{ age()! >= 57 ? i18n.t('pfor.ageLimitMaxTitle') : i18n.t('pfor.ageLimitContractTitle') }}
                  </p>
                  <p class="text-xs text-red-700 mt-0.5">
                    {{ age()! >= 57 ? i18n.t('pfor.ageLimitMaxDesc') : i18n.t('pfor.ageLimitContractDesc') }}
                  </p>
                </div>
              </div>
            }
          </div>

          <!-- 2. VOLET PFOR & ADMISSION CMR -->
          <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-4">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
              {{ i18n.t('pfor.pforTrack') }}
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
                  <span class="font-bold text-sm text-slate-800">{{ i18n.t('pfor.cmr') }}</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">{{ i18n.lang() === 'fr' ? 'Militaire' : 'Military' }}</span>
                </div>
                <span class="text-xs text-slate-500">{{ i18n.t('pfor.cmrDesc') }}</span>
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
                  <span class="font-bold text-sm text-slate-800">{{ i18n.t('pfor.civil') }}</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{{ i18n.lang() === 'fr' ? 'Universités' : 'Universities' }}</span>
                </div>
                <span class="text-xs text-slate-500">{{ i18n.t('pfor.civilSubtitle') }}</span>
              </button>
            </div>

            <!-- Si PFOR CMR : Sélection des domaines d'admission -->
            @if (pforType() === 'cmr') {
              <!-- Case à cocher : Postulant pas encore évalué par les CMC -->
              <div class="mt-1">
                <label
                  class="p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all select-none"
                  [class.bg-indigo-50]="cmrNotYetEvaluated()"
                  [class.border-indigo-400]="cmrNotYetEvaluated()"
                  [class.shadow-xs]="cmrNotYetEvaluated()"
                  [class.bg-white]="!cmrNotYetEvaluated()"
                  [class.border-slate-200]="!cmrNotYetEvaluated()"
                >
                  <input
                    type="checkbox"
                    id="cmr-not-yet-evaluated-checkbox"
                    [checked]="cmrNotYetEvaluated()"
                    (change)="onCmrNotYetEvaluatedChange($any($event.target).checked)"
                    class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-slate-800 flex items-center gap-2">
                      {{ i18n.t('pfor.cmrNotYetEvaluated') }}
                      @if (cmrNotYetEvaluated()) {
                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-200 text-indigo-800">
                          {{ i18n.t('pfor.cmrNotYetEvaluatedBadge') }}
                        </span>
                      }
                    </span>
                    <span class="text-[11px] text-slate-500">
                      {{ i18n.t('pfor.cmrNotYetEvaluatedDesc') }}
                    </span>
                  </div>
                </label>
              </div>

              @if (!cmrRefused() && !cmrMinCriteriaNotMet() && !cmrNotYetEvaluated()) {
                <div class="mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {{ i18n.t('pfor.cmrConfirmedTitle') }}
                    </span>
                  </div>

                  <p class="text-xs text-slate-500 mt-0.5">
                    {{ i18n.t('pfor.cmrConfirmedDesc') }}
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
                        <span class="text-xs font-bold text-slate-800">{{ i18n.t('pfor.arts') }}</span>
                        <span class="text-[10px] text-slate-500">{{ i18n.t('pfor.artsDesc') }}</span>
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
                        <span class="text-xs font-bold text-slate-800">{{ i18n.t('pfor.science') }}</span>
                        <span class="text-[10px] text-slate-500">{{ i18n.t('pfor.sciencesDesc') }}</span>
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
                        <span class="text-xs font-bold text-slate-800">{{ i18n.t('pfor.genie') }}</span>
                        <span class="text-[10px] text-slate-500">{{ i18n.t('pfor.genieDesc') }}</span>
                      </div>
                    </label>
                  </div>
                </div>
              }
            }
          </div>

          <!-- NOUVEAU PANNEAU : INADMISSIBLE AU PFOR (SI CMR) -->
          @if (pforType() === 'cmr' && !cmrNotYetEvaluated()) {
            <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-rose-600"></span>
                  {{ i18n.t('pfor.inadmissibleTitle') }}
                </h3>
                @if (cmrRefused()) {
                  <span class="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                    {{ i18n.t('pfor.cmrRefusedBadge') }}
                  </span>
                } @else if (cmrMinCriteriaNotMet()) {
                  <span class="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                    {{ i18n.t('pfor.cmrMinCriteriaBadge') }}
                  </span>
                }
              </div>

              <p class="text-xs text-slate-500">
                {{ i18n.t('pfor.inadmissibleDesc') }}
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
                      {{ i18n.t('pfor.cmrRefusedCheckbox') }}
                    </span>
                    <span class="text-[10px]" [class.text-rose-700]="cmrRefused()" [class.text-slate-500]="!cmrRefused()">
                      {{ i18n.t('pfor.cmrRefusedCheckboxDesc') }}
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
                      {{ i18n.t('pfor.cmrMinCriteriaCheckbox') }}
                    </span>
                    <span class="text-[10px]" [class.text-amber-700]="cmrMinCriteriaNotMet()" [class.text-slate-500]="!cmrMinCriteriaNotMet()">
                      {{ i18n.t('pfor.cmrMinCriteriaCheckboxDesc') }}
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
                  {{ i18n.t('pfor.dossierChoicesTitle') }}
                </h3>
                <span class="text-xs text-slate-400 font-medium">{{ i18n.t('pfor.upTo3Choices') }}</span>
              </div>

              <div class="space-y-3">
                <!-- Métier 1 -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="text-xs font-semibold text-slate-600">{{ i18n.t('pfor.choice1Principal') }}</label>
                    @if (jobService.isJobInGestionDesAttentes(selectedDossierJobId1())) {
                      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                        {{ i18n.t('pfor.gestionAttentesBadge', { sit: getJobAttentesSituation(selectedDossierJobId1()) }) }}
                      </span>
                    }
                  </div>
                  <select
                    [ngModel]="selectedDossierJobId1()"
                    (ngModelChange)="selectedDossierJobId1.set($event)"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  >
                    <option value="">{{ i18n.t('pfor.noChoice1Selected') }}</option>
                    <option value="00003">{{ i18n.t('pfor.withoutJob') }}</option>
                    @for (job of allPforJobs(); track job.id) {
                      <option [value]="job.id">
                        {{ jobService.getJobDisplayLabel(job, i18n.lang()) }}
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
                          <span><strong>{{ i18n.t('pfor.ageExceeded') }}</strong> {{ i18n.lang() === 'en' ? (s1.ageReasonEn || s1.ageReason) : s1.ageReason }}</span>
                        </div>
                      } @else {
                        <div class="mt-1 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{{ i18n.t('pfor.ageAdmissibleMsg', { years: s1.durationYears, maxAge: 59 - s1.durationYears }) }}</span>
                        </div>
                      }
                    }
                  }
                </div>

                <!-- Métier 2 -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="text-xs font-semibold text-slate-600">{{ i18n.t('pfor.choice2') }}</label>
                    @if (jobService.isJobInGestionDesAttentes(selectedDossierJobId2())) {
                      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                        {{ i18n.t('pfor.gestionAttentesBadge', { sit: getJobAttentesSituation(selectedDossierJobId2()) }) }}
                      </span>
                    }
                  </div>
                  <select
                    [ngModel]="selectedDossierJobId2()"
                    (ngModelChange)="selectedDossierJobId2.set($event)"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  >
                    <option value="">{{ i18n.t('pfor.noChoice2Selected') }}</option>
                    @for (job of allPforJobs(); track job.id) {
                      <option [value]="job.id">
                        {{ jobService.getJobDisplayLabel(job, i18n.lang()) }}
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
                          <span><strong>{{ i18n.t('pfor.ageExceeded') }}</strong> {{ i18n.lang() === 'en' ? (s2.ageReasonEn || s2.ageReason) : s2.ageReason }}</span>
                        </div>
                      } @else {
                        <div class="mt-1 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{{ i18n.t('pfor.ageAdmissibleMsg', { years: s2.durationYears, maxAge: 59 - s2.durationYears }) }}</span>
                        </div>
                      }
                    }
                  }
                </div>

                <!-- Métier 3 -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="text-xs font-semibold text-slate-600">{{ i18n.t('pfor.choice3') }}</label>
                    @if (jobService.isJobInGestionDesAttentes(selectedDossierJobId3())) {
                      <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">
                        {{ i18n.t('pfor.gestionAttentesBadge', { sit: getJobAttentesSituation(selectedDossierJobId3()) }) }}
                      </span>
                    }
                  </div>
                  <select
                    [ngModel]="selectedDossierJobId3()"
                    (ngModelChange)="selectedDossierJobId3.set($event)"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  >
                    <option value="">{{ i18n.t('pfor.noChoice3Selected') }}</option>
                    @for (job of allPforJobs(); track job.id) {
                      <option [value]="job.id">
                        {{ jobService.getJobDisplayLabel(job, i18n.lang()) }}
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
                          <span><strong>{{ i18n.t('pfor.ageExceeded') }}</strong> {{ i18n.lang() === 'en' ? (s3.ageReasonEn || s3.ageReason) : s3.ageReason }}</span>
                        </div>
                      } @else {
                        <div class="mt-1 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{{ i18n.t('pfor.ageAdmissibleMsg', { years: s3.durationYears, maxAge: 59 - s3.durationYears }) }}</span>
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
                {{ i18n.t('pfor.medProfileMin') }}
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
                    {{ i18n.t('pfor.reoNcmBadge') }}
                  </span>
                  <h3 class="text-sm font-bold text-slate-800">
                    {{ i18n.t('pfor.scolExpNcmTitle') }}
                  </h3>
                </div>
                @if (cmrRefused()) {
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    {{ i18n.t('pfor.cmrRefusedBadge') }}
                  </span>
                } @else if (cmrMinCriteriaNotMet()) {
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    {{ i18n.t('pfor.cmrMinCriteriaNotMetBadge') }}
                  </span>
                } @else {
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    {{ i18n.t('pfor.ageMaxExceededBadge') }}
                  </span>
                }
              </div>
              <p class="text-xs text-slate-600">
                {{ i18n.t('pfor.scolExpNcmDesc') }}
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
                    {{ i18n.t('reo.registryBadge') }}
                  </span>
                  <h3 class="text-sm font-bold text-slate-800">
                    {{ i18n.t('reo.registryNoteTitle') }}
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
                      {{ i18n.t('reo.noteCopied') }}
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
                      {{ i18n.t('reo.copyNote') }}
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
                    {{ (citizenship() === 'PR < 3 years') ? i18n.t('reo.emailPrClosed') : (age() !== null && age()! >= 57) ? i18n.t('reo.emailAgeClosed') : (cmrMinCriteriaNotMet() ? i18n.t('pfor.emailMinCriteriaNotMet') : (cmrRefused() ? i18n.t('pfor.emailCmrRefused') : (cmrNotYetEvaluated() ? i18n.t('pfor.emailNotYetEvaluated') : (isAttentesMode() ? i18n.t('pfor.emailExpectations') : i18n.t('reo.emailTitle'))))) }}
                  </h3>
                  @if (citizenship() === 'PR < 3 years') {
                    <span
                      class="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200"
                    >
                      {{ i18n.t('pfor.badgeInadmissibleRp') }}
                    </span>
                  } @else if (age() !== null && age()! >= 57) {
                    <span
                      class="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200"
                    >
                      {{ i18n.t('pfor.badgeInadmissibleAge') }}
                    </span>
                  } @else if (cmrRefused() || cmrMinCriteriaNotMet()) {
                    <span
                      class="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200"
                    >
                      {{ i18n.t('pfor.openNcmTradesCount', { count: eligibleNcmEvaluation().openJobs.length }) }}
                    </span>
                  } @else if (cmrNotYetEvaluated()) {
                    <span
                      class="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200"
                    >
                      {{ i18n.t('pfor.cmrNotYetEvaluatedBadge') }}
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
                          {{ i18n.t('reo.jobsCountBadge', { count: eligiblePforJobs().length }) }}
                        </span>
                      </div>
                    } @else {
                      <div class="flex gap-2">
                        <span
                          class="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full"
                        >
                          {{ i18n.t('reo.zeroPforOpen') }}
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
                    [title]="i18n.t('reo.exportOutlook')"
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
                      {{ i18n.t('reo.copiedOutlook') }}
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
                      {{ i18n.t('reo.exportOutlook') }}
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
`;
