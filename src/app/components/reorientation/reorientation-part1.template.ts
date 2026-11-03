export const REORIENTATION_TEMPLATE_PART1 = `
    <div class="h-full flex flex-col min-h-0 bg-slate-50">
      <div
        class="p-4 bg-white border-b border-slate-200 shrink-0 flex items-start justify-between relative z-20"
      >
        <div class="flex items-start gap-4">
          <button
            (click)="resetAll()"
            class="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 transition-all text-slate-600 shrink-0 border border-slate-200 mt-1 cursor-pointer"
            title="{{ i18n.t('reo.resetTitle') }}"
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
              <h2 class="text-xl font-bold text-slate-800">
                {{ i18n.t('reo.title') }}
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
                  {{ i18n.t('reo.sipDate', { date: jobService.sipDate() }) }}
                </span>
              }
            </div>
            <p class="text-sm text-slate-500 mt-1">
              {{ i18n.t('reo.subtitle') }}
            </p>
          </div>
        </div>

        <!-- Collapsible Options Dropdown -->
        <div class="relative shrink-0 reo-options-dropdown-container">
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
            title="{{ i18n.t('reo.optionsButton') }}"
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
            <span>{{ i18n.t('reo.optionsButton') }}</span>
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
                <span class="text-xs font-black uppercase tracking-wider text-slate-600">{{ i18n.t('reo.optionsTitle') }}</span>
                @if (activeHeaderOptionsCount() > 0) {
                  <span class="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {{ i18n.t('reo.optionsActive', { count: activeHeaderOptionsCount() }) }}
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
                    {{ i18n.t('reo.ignoreSip') }}
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
                    {{ i18n.t('reo.medicalLimitation') }}
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
                    {{ i18n.t('reo.includeTraitement') }}
                  </span>
                </label>
              </div>
            </div>
          }
        </div>
      </div>

      <div
        class="flex-1 overflow-y-auto p-4 flex flex-col lg:flex-row gap-6 min-h-0"
      >
        <!-- Colonne de gauche: Critères -->
        <div
          class="flex flex-col gap-6 transition-all duration-300"
          [class.lg:w-7/12]="showResultsPanel()"
          [class.w-full]="!showResultsPanel()"
          [class.max-w-4xl]="!showResultsPanel()"
          [class.mx-auto]="!showResultsPanel()"
        >
          <!-- Age and Citizenship -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm shrink-0"
          >
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1"
                >{{ i18n.t('reo.applicantAge') }}</label
              >
              <input
                type="number"
                [ngModel]="age()"
                (ngModelChange)="age.set($event)"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                placeholder="{{ i18n.t('reo.applicantAgePlaceholder') }}"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1"
                >{{ i18n.t('reo.citizenshipStatus') }}</label
              >
              <select
                [ngModel]="citizenship()"
                (ngModelChange)="citizenship.set($event)"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              >
                <option value="Canadian Citizen">{{ i18n.t('reo.canadianCitizen') }}</option>
                <option value="PR > 3 years">
                  {{ i18n.t('reo.prAdmissible') }}
                </option>
                <option value="PR < 3 years">
                  {{ i18n.t('reo.prInadmissible') }}
                </option>
              </select>
            </div>
          </div>

          <!-- Panneau Cote médicale (affiché seulement si limitation médicale est coché) -->
          @if (hasMedicalLimitation()) {
            <div
              class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm shrink-0 flex flex-col transition-all duration-200"
            >
              <div class="mb-2 text-sm font-bold text-slate-800">
                {{ i18n.t('reo.medicalRating') }}
              </div>
              <!-- 3 petits champs pour la cote médicale (V, CV, H) -->
              <div class="flex items-center justify-center overflow-x-auto pb-1 sm:pb-0 w-full">
                <div
                  class="inline-flex border border-slate-300 rounded-lg overflow-hidden bg-slate-50 divide-x divide-slate-300 shadow-sm"
                >
                  <div class="flex flex-col items-center">
                    <div
                      class="px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 border-b border-slate-300 w-full text-center"
                    >
                      V
                    </div>
                    <input
                      type="text"
                      [ngModel]="medicalV()"
                      (ngModelChange)="medicalV.set($event)"
                      class="w-12 sm:w-14 px-1 py-1.5 text-center text-sm font-semibold text-slate-800 bg-white outline-none focus:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:z-10 transition-colors"
                    />
                  </div>
                  <div class="flex flex-col items-center">
                    <div
                      class="px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 border-b border-slate-300 w-full text-center"
                    >
                      CV
                    </div>
                    <input
                      type="text"
                      [ngModel]="medicalCV()"
                      (ngModelChange)="medicalCV.set($event)"
                      class="w-12 sm:w-14 px-1 py-1.5 text-center text-sm font-semibold text-slate-800 bg-white outline-none focus:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:z-10 transition-colors"
                    />
                  </div>
                  <div class="flex flex-col items-center">
                    <div
                      class="px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 border-b border-slate-300 w-full text-center"
                    >
                      H
                    </div>
                    <input
                      type="text"
                      [ngModel]="medicalH()"
                      (ngModelChange)="medicalH.set($event)"
                      class="w-12 sm:w-14 px-1 py-1.5 text-center text-sm font-semibold text-slate-800 bg-white outline-none focus:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:z-10 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <!-- Medical Employment Limitations Table -->
              <div class="mt-6 border border-slate-300 rounded-lg overflow-hidden w-full text-sm">
                <div class="bg-blue-100 font-bold text-center py-2 border-b border-slate-300 text-slate-800">
                  {{ i18n.t('reo.melTableTitle') }}
                </div>
                
                <!-- Geographic Section -->
                <div class="flex flex-col md:flex-row border-b border-slate-300 bg-white">
                  <div class="w-full md:w-32 bg-slate-200 flex items-center justify-center font-bold text-slate-700 border-b md:border-b-0 md:border-r border-slate-300 py-2 md:py-0">
                    <span class="tracking-wider">{{ i18n.t('reo.melGeographic') }}</span>
                  </div>
                  <div class="flex-1 flex flex-col">
                    @for (mel of geographicLimitations; track mel.id) {
                      <label class="flex items-start gap-3 p-2.5 hover:bg-slate-50 border-b border-slate-200 cursor-pointer transition-colors last:border-b-0">
                        <input type="checkbox" 
                                [checked]="hasMel(mel.id)" 
                                (change)="toggleMel(mel.id)"
                                class="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white cursor-pointer" />
                        <span class="text-slate-700 leading-snug">{{ i18n.lang() === 'fr' ? (mel.textFr || mel.text) : mel.text }}</span>
                      </label>
                    }
                  </div>
                </div>

                <!-- Occupational Section -->
                <div class="flex flex-col md:flex-row bg-white">
                  <div class="w-full md:w-32 bg-slate-200 flex items-center justify-center font-bold text-slate-700 border-b md:border-b-0 md:border-r border-slate-300 py-2 md:py-0">
                    <span class="tracking-wider">{{ i18n.t('reo.melOccupational') }}</span>
                  </div>
                  <div class="flex-1 flex flex-col">
                    @for (mel of occupationalLimitations; track mel.id) {
                      <label class="flex items-start gap-3 p-2.5 hover:bg-slate-50 border-b border-slate-200 cursor-pointer transition-colors last:border-b-0">
                        <input type="checkbox" 
                                [checked]="hasMel(mel.id)" 
                                (change)="toggleMel(mel.id)"
                                class="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white cursor-pointer" />
                        <span class="text-slate-700 leading-snug">{{ i18n.lang() === 'fr' ? (mel.textFr || mel.text) : mel.text }}</span>
                      </label>
                    }
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Message d'admissibilité pour RP < 3 ans -->
          <div
            *ngIf="citizenship() === 'PR < 3 years'"
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

          <!-- Message pour limite d'âge de retraite forcée (âge >= 57 ou dépassement de durée de contrat) -->
          <div
            *ngIf="age() !== null && (age()! >= 57 || isCandidateTooOld())"
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
                {{ age()! >= 57 ? i18n.t('reo.ageLimitTitleMax') : i18n.t('reo.ageLimitTitleContract') }}
              </p>
              <p class="text-xs text-red-700 mt-0.5">
                {{ age()! >= 57 ? i18n.t('reo.ageLimitDescMax') : i18n.t('reo.ageLimitDescContract') }}
              </p>
            </div>
          </div>

          <!-- Panneau: Métiers déjà au dossier du postulant -->
          <div
            class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow shrink-0 flex flex-col gap-4"
          >
            <div>
              <h3
                class="text-md font-bold text-slate-800 flex items-center gap-2"
              >
                <svg
                  class="w-5 h-5 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  ></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                {{ i18n.t('reo.dossierJobsTitle') }}
              </h3>
              <p class="text-xs text-slate-500 mt-1">
                {{ i18n.t('reo.dossierJobsDesc') }}
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <!-- Field 1 -->
              <div
                class="relative flex flex-col gap-2 p-4 bg-slate-50/50 border border-slate-200 rounded-xl"
              >
                <div class="flex items-center justify-between">
                  <span
                    class="text-xs font-bold uppercase tracking-wider text-slate-500"
                    >{{ i18n.t('reo.choiceJob', { num: 1 }) }}</span
                  >
                  <button
                    *ngIf="hasSelected(1)"
                    (click)="clearDossierJob(1, $event)"
                    class="text-xs text-rose-500 hover:text-rose-700 font-semibold transition flex items-center gap-0.5"
                  >
                    <svg
                      class="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {{ i18n.t('reo.retirer') }}
                  </button>
                </div>

                <div class="relative">
                  <div
                    class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
                    [class.opacity-50]="isFieldDisabled(1)"
                    [class.bg-slate-100]="isFieldDisabled(1)"
                    [class.cursor-not-allowed]="isFieldDisabled(1)"
                  >
                    <input
                      type="text"
                      [ngModel]="searchDossierQuery1()"
                      (ngModelChange)="onQueryChange(1, $event)"
                      (focus)="openDropdown(1)"
                      (blur)="closeDropdownDelayed(1)"
                      [disabled]="isFieldDisabled(1)"
                      class="w-full px-3 py-2 text-sm outline-none bg-transparent"
                      [class.cursor-not-allowed]="isFieldDisabled(1)"
                      [placeholder]="i18n.t('reo.rechercher')"
                    />
                    <button
                      *ngIf="!dropdownOpen1() && !isFieldDisabled(1)"
                      class="p-1 px-2 text-slate-400"
                      (click)="openDropdown(1)"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <button
                      *ngIf="dropdownOpen1() && !isFieldDisabled(1)"
                      class="p-1 px-2 text-slate-400"
                    >
                      <svg
                        class="w-4 h-4 transform rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Dropdown Search Results -->
                  <div
                    *ngIf="dropdownOpen1()"
                    class="absolute z-50 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg"
                  >
                    @if (filteredDossierJobs1().length === 0) {
                      <div class="p-3 text-xs text-slate-500 italic">
                        {{ i18n.t('reo.aucunMetier') }}
                      </div>
                    } @else {
                      @for (job of filteredDossierJobs1(); track job.id) {
                        <button
                          (click)="selectDossierJob(1, job.id)"
                          class="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 transition-colors flex items-center justify-between border-b border-slate-100 last:border-0"
                        >
                          <span class="text-slate-800 font-medium"
                            ><span class="font-bold text-indigo-600 mr-1"
                              >[{{ job.id }}]</span
                            >
                            {{ jobService.getJobTitle(job, i18n.lang()) }}</span
                          >
                        </button>
                      }
                    }
                  </div>
                </div>

                <!-- Admissibility Box for Field 1 -->
                @if (selectedDossierJobId1()) {
                  @let s1 = evaluateJobAdmissibility(selectedDossierJobId1());
                  @if (s1) {
                    <div
                      class="mt-2 p-3 rounded-lg border text-xs bg-white"
                      [class.bg-emerald-50]="s1.isEligible"
                      [class.border-emerald-200]="s1.isEligible"
                      [class.bg-rose-50]="!s1.isEligible"
                      [class.border-rose-200]="!s1.isEligible"
                    >
                      <div
                        class="flex items-center justify-between font-bold mb-1"
                        [class.text-emerald-800]="s1.isEligible"
                        [class.text-rose-800]="!s1.isEligible"
                      >
                        <span>{{
                          s1.isEligible ? i18n.t('reo.admissibleBadge') : i18n.t('reo.nonAdmissibleBadge')
                        }}</span>
                        <span
                          class="text-[10px] font-mono bg-white/50 px-1 py-0.5 rounded"
                          >ID {{ s1.job.id }}</span
                        >
                      </div>
                      <p class="font-semibold text-slate-700 truncate mb-2">
                        {{ jobService.getJobTitle(s1.job, i18n.lang()) }}
                      </p>

                      @if (s1.job.id !== '00003') {
                        <div class="space-y-1 text-[11px] text-slate-600">
                          <!-- Age detail -->
                          <div class="flex items-start gap-1">
                            <span
                              class="font-bold"
                              [class.text-emerald-600]="s1.isAgeAdmissible"
                              [class.text-rose-600]="!s1.isAgeAdmissible"
                            >
                              {{ s1.isAgeAdmissible ? "✓" : "✗" }}
                            </span>
                            <div>
                              <span class="font-semibold">{{ i18n.t('reo.ageLabel') }}</span>
                              @if (age() === null || age()! <= 0) {
                                <span class="italic text-slate-500"
                                  >{{ i18n.t('reo.ageNotFilled', { duration: s1.durationYears, maxAge: 59 - s1.durationYears }) }}</span
                                >
                              } @else {
                                <span
                                  >{{ i18n.t('reo.ageYears', { age: age() }) }}
                                  @if (!s1.isAgeAdmissible) {
                                    {{ i18n.lang() === 'en' ? (s1.ageReasonEn || s1.ageReason) : s1.ageReason }}
                                  } @else {
                                    {{ i18n.t('reo.ageOk', { duration: s1.durationYears }) }}
                                  }
                                </span>
                              }
                            </div>
                          </div>

                          <!-- Citizenship detail -->
                          <div class="flex items-start gap-1">
                            <span
                              class="font-bold"
                              [class.text-emerald-600]="
                                s1.isCitizenshipAdmissible
                              "
                              [class.text-rose-600]="!s1.isCitizenshipAdmissible"
                            >
                              {{ s1.isCitizenshipAdmissible ? "✓" : "✗" }}
                            </span>
                            <div>
                              <span class="font-semibold">{{ i18n.t('reo.statusLabel') }}</span>
                              <span>
                                @if (citizenship() === "Canadian Citizen") {
                                  {{ i18n.t('reo.citizenOk') }}
                                } @else if (citizenship() === "PR > 3 years") {
                                  {{ i18n.t('reo.prOver3') }}
                                  @if (!s1.isCitizenshipAdmissible) {
                                    {{ i18n.lang() === 'en' ? (s1.citizenshipReasonEn || s1.citizenshipReason) : s1.citizenshipReason }}
                                  } @else {
                                    OK.
                                  }
                                } @else {
                                  {{ i18n.t('reo.prUnder3') }}
                                }
                              </span>
                            </div>
                          </div>

                          <!-- Qualifications detail -->
                          <div class="flex items-start gap-1">
                            <span
                              class="font-bold"
                              [class.text-emerald-600]="s1.isEducationAdmissible"
                              [class.text-rose-600]="!s1.isEducationAdmissible"
                            >
                              {{ s1.isEducationAdmissible ? "✓" : "✗" }}
                            </span>
                            <div>
                              <span class="font-semibold">{{ i18n.t('reo.scolariteLabel') }}</span>
                              <span
                                [class.text-rose-700]="!s1.isEducationAdmissible"
                                [class.text-emerald-700]="
                                  s1.isEducationAdmissible
                                "
                              >
                                {{
                                  s1.isEducationAdmissible
                                    ? i18n.t('reo.scolariteOk')
                                    : (i18n.lang() === 'en' ? (s1.educationReasonEn || i18n.t('reo.scolariteNotMet')) : (s1.educationReason || i18n.t('reo.scolariteNotMet')))
                                }}
                              </span>
                            </div>
                          </div>

                          <!-- Extra Test detail -->
                          @if (s1.isExtraTestRequired) {
                            <div class="flex items-start gap-1">
                              <span
                                class="font-bold"
                                [class.text-emerald-600]="s1.isExtraTestAdmissible"
                                [class.text-rose-600]="!s1.isExtraTestAdmissible"
                              >
                                {{ s1.isExtraTestAdmissible ? "✓" : "✗" }}
                              </span>
                              <div>
                                <span class="font-semibold">{{ i18n.t('reo.testSelectionLabel', { name: s1.extraTestName }) }}</span>
                                <span
                                  [class.text-rose-700]="!s1.isExtraTestAdmissible"
                                  [class.text-emerald-700]="s1.isExtraTestAdmissible"
                                >
                                  {{
                                    s1.isExtraTestAdmissible
                                      ? i18n.t('reo.extraTestSuccess')
                                      : isExtraTestNotCompleted(s1.job.id)
                                        ? i18n.t('reo.extraTestNotCompletedYet')
                                        : i18n.t('reo.extraTestFailed')
                                  }}
                                </span>
                              </div>
                            </div>
                          }

                          <!-- Medical detail -->
                          @if (hasMedicalLimitation()) {
                            <div class="flex items-start gap-1">
                              <span
                                class="font-bold"
                                [class.text-emerald-600]="s1.isMedicalAdmissible"
                                [class.text-rose-600]="!s1.isMedicalAdmissible"
                              >
                                {{ s1.isMedicalAdmissible ? "✓" : "✗" }}
                              </span>
                              <div>
                                <span class="font-semibold">{{ i18n.t('reo.medicalRatingLabel') }}</span>
                                <span
                                  [class.text-rose-700]="!s1.isMedicalAdmissible"
                                  [class.text-emerald-700]="s1.isMedicalAdmissible"
                                >
                                  {{
                                    s1.isMedicalAdmissible
                                      ? i18n.t('reo.medStandardConform')
                                      : (i18n.lang() === 'en' ? (s1.medicalReasonEn || s1.medicalReason) : s1.medicalReason)
                                  }}
                                </span>
                              </div>
                            </div>
                          }
                        </div>

                        <!-- SIP Status Warning -->
                        @if (s1.isJobClosed) {
                          <div
                            class="mt-2 p-1.5 rounded border flex items-start gap-1.5 font-semibold text-[10px] leading-tight"
                            [class]="s1.isClosedAdmissionOnly ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-red-100 text-red-800 border-red-200'"
                          >
                            <span>⚠</span>
                            <div>
                              @if (s1.isClosedAdmissionOnly) {
                                {{ i18n.t('reo.closedAdmissionOnly') }}
                              } @else {
                                {{ i18n.t('reo.closedNoVacancies') }}
                              }
                            </div>
                          </div>
                        }
                      }
                    </div>
                  }
                }
              </div>

              <!-- Field 2 -->
              <div
                class="relative flex flex-col gap-2 p-4 bg-slate-50/50 border border-slate-200 rounded-xl"
              >
                <div class="flex items-center justify-between">
                  <span
                    class="text-xs font-bold uppercase tracking-wider text-slate-500"
                    >{{ i18n.t('reo.choiceJob', { num: 2 }) }}</span
                  >
                  <button
                    *ngIf="hasSelected(2)"
                    (click)="clearDossierJob(2, $event)"
                    class="text-xs text-rose-500 hover:text-rose-700 font-semibold transition flex items-center gap-0.5"
                  >
                    <svg
                      class="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {{ i18n.t('reo.retirer') }}
                  </button>
                </div>

                <div class="relative">
                  <div
                    class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
                    [class.opacity-50]="isFieldDisabled(2)"
                    [class.bg-slate-100]="isFieldDisabled(2)"
                    [class.cursor-not-allowed]="isFieldDisabled(2)"
                  >
                    <input
                      type="text"
                      [ngModel]="searchDossierQuery2()"
                      (ngModelChange)="onQueryChange(2, $event)"
                      (focus)="openDropdown(2)"
                      (blur)="closeDropdownDelayed(2)"
                      [disabled]="isFieldDisabled(2)"
                      class="w-full px-3 py-2 text-sm outline-none bg-transparent"
                      [class.cursor-not-allowed]="isFieldDisabled(2)"
                      [placeholder]="i18n.t('reo.rechercher')"
                    />
                    <button
                      *ngIf="!dropdownOpen2() && !isFieldDisabled(2)"
                      class="p-1 px-2 text-slate-400"
                      (click)="openDropdown(2)"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <button
                      *ngIf="dropdownOpen2() && !isFieldDisabled(2)"
                      class="p-1 px-2 text-slate-400"
                    >
                      <svg
                        class="w-4 h-4 transform rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Dropdown Search Results -->
                  <div
                    *ngIf="dropdownOpen2()"
                    class="absolute z-50 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg"
                  >
                    @if (filteredDossierJobs2().length === 0) {
                      <div class="p-3 text-xs text-slate-500 italic">
                        {{ i18n.t('reo.aucunMetier') }}
                      </div>
                    } @else {
                      @for (job of filteredDossierJobs2(); track job.id) {
                        <button
                          (click)="selectDossierJob(2, job.id)"
                          class="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 transition-colors flex items-center justify-between border-b border-slate-100 last:border-0"
                        >
                          <span class="text-slate-800 font-medium"
                            ><span class="font-bold text-indigo-600 mr-1"
                              >[{{ job.id }}]</span
                            >
                            {{ jobService.getJobTitle(job, i18n.lang()) }}</span
                          >
                        </button>
                      }
                    }
                  </div>
                </div>

                <!-- Admissibility Box for Field 2 -->
                @if (selectedDossierJobId2()) {
                  @let s2 = evaluateJobAdmissibility(selectedDossierJobId2());
                  @if (s2) {
                    <div
                      class="mt-2 p-3 rounded-lg border text-xs bg-white"
                      [class.bg-emerald-50]="s2.isEligible"
                      [class.border-emerald-200]="s2.isEligible"
                      [class.bg-rose-50]="!s2.isEligible"
                      [class.border-rose-200]="!s2.isEligible"
                    >
                      <div
                        class="flex items-center justify-between font-bold mb-1"
                        [class.text-emerald-800]="s2.isEligible"
                        [class.text-rose-800]="!s2.isEligible"
                      >
                        <span>{{
                          s2.isEligible ? i18n.t('reo.admissibleBadge') : i18n.t('reo.nonAdmissibleBadge')
                        }}</span>
                        <span
                          class="text-[10px] font-mono bg-white/50 px-1 py-0.5 rounded"
                          >ID {{ s2.job.id }}</span
                        >
                      </div>
                      <p class="font-semibold text-slate-700 truncate mb-2">
                        {{ jobService.getJobTitle(s2.job, i18n.lang()) }}
                      </p>

                      @if (s2.job.id !== '00003') {
                        <div class="space-y-1 text-[11px] text-slate-600">`;
