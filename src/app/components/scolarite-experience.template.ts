export const SCOLARITE_EXPERIENCE_TEMPLATE = `
    <div class="flex flex-col xl:flex-row gap-6">
              <!-- Scolarité -->
            <div
              class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col flex-1"
            >
              <div class="bg-slate-50 border-b border-slate-200 shrink-0">
                <div class="p-4 pb-0">
                  <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <h3 class="text-lg font-bold text-slate-800">
                      {{ i18n.t('scolExp.tabScolarite') }}
                    </h3>
                    <div class="flex flex-col items-start gap-1.5 text-sm font-medium text-slate-700">
                      <label class="inline-flex items-center gap-2 cursor-pointer select-none hover:text-slate-900">
                        <input
                          type="checkbox"
                          [checked]="selectedCriteriaIds().has('etude_anglais')"
                          (change)="toggleManualCriterion('etude_anglais')"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span>{{ i18n.t('scolExp.etudeAnglais') }}</span>
                      </label>
                      <label class="inline-flex items-center gap-2 cursor-pointer select-none hover:text-slate-900">
                        <input
                          type="checkbox"
                          [checked]="selectedCriteriaIds().has('etude_hors_canada')"
                          (change)="toggleManualCriterion('etude_hors_canada')"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span>{{ i18n.t('scolExp.etudeHorsCanada') }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="flex gap-1 overflow-x-auto scolarite-tabs">
                    <button
                      (click)="activeScolariteTab.set('secondaire')"
                      [class.border-blue-600]="
                        activeScolariteTab() === 'secondaire'
                      "
                      [class.text-blue-600]="
                        activeScolariteTab() === 'secondaire'
                      "
                      [class.border-transparent]="
                        activeScolariteTab() !== 'secondaire'
                      "
                      [class.text-slate-500]="
                        activeScolariteTab() !== 'secondaire'
                      "
                      class="px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors hover:text-blue-600 hover:bg-slate-100/50 rounded-t-lg"
                    >
                      {{ i18n.t('scolExp.tabSecondaire') }}
                    </button>
                    <button
                      (click)="activeScolariteTab.set('specialises')"
                      [class.border-blue-600]="
                        activeScolariteTab() === 'specialises'
                      "
                      [class.text-blue-600]="
                        activeScolariteTab() === 'specialises'
                      "
                      [class.border-transparent]="
                        activeScolariteTab() !== 'specialises'
                      "
                      [class.text-slate-500]="
                        activeScolariteTab() !== 'specialises'
                      "
                      class="px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors hover:text-blue-600 hover:bg-slate-100/50 rounded-t-lg"
                    >
                      {{ i18n.t('scolExp.tabSpecialises') }}
                    </button>
                    <button
                      (click)="activeScolariteTab.set('universitaire')"
                      [class.border-blue-600]="
                        activeScolariteTab() === 'universitaire'
                      "
                      [class.text-blue-600]="
                        activeScolariteTab() === 'universitaire'
                      "
                      [class.border-transparent]="
                        activeScolariteTab() !== 'universitaire'
                      "
                      [class.text-slate-500]="
                        activeScolariteTab() !== 'universitaire'
                      "
                      class="px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors hover:text-blue-600 hover:bg-slate-100/50 rounded-t-lg"
                    >
                      {{ i18n.t('scolExp.tabUniversitaire') }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-4">
                <!-- TAB SECONDAIRE -->
                <div
                  *ngIf="activeScolariteTab() === 'secondaire'"
                  class="flex flex-col gap-2"
                >
                  <!-- Année scolaire -->
                  <div>
                    <h4
                      class="text-sm font-semibold text-slate-500 mb-2 px-3 uppercase tracking-wider"
                    >
                      {{ i18n.t('scolExp.anneeScolaire') }}
                    </h4>
                    <label
                      *ngFor="let crit of criteriaAnneeScolaire()"
                      class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                    >
                      <input
                        type="checkbox"
                        [checked]="selectedCriteriaIds().has(crit.id)"
                        (change)="toggleManualCriterion(crit.id)"
                        class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span
                        class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                        >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                      >
                    </label>
                  </div>

                  <!-- Histoire -->
                  <div class="mt-2 pt-3 border-t border-slate-100">
                    <h4
                      class="text-sm font-semibold text-slate-500 mb-2 px-3 uppercase tracking-wider"
                    >
                      {{ i18n.t('scolExp.histoire') }}
                    </h4>
                    <label
                      *ngFor="let crit of criteriaHistoire()"
                      class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                    >
                      <input
                        type="checkbox"
                        [checked]="selectedCriteriaIds().has(crit.id)"
                        (change)="toggleManualCriterion(crit.id)"
                        class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span
                        class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                        >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                      >
                    </label>
                  </div>

                  <!-- Langue -->
                  <div class="mt-2 pt-3 border-t border-slate-100">
                    <h4
                      class="text-sm font-semibold text-slate-500 mb-2 px-3 uppercase tracking-wider"
                    >
                      {{ i18n.t('scolExp.langue') }}
                    </h4>
                    <label
                      *ngFor="let crit of criteriaLangue()"
                      class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                    >
                      <input
                        type="checkbox"
                        [checked]="selectedCriteriaIds().has(crit.id)"
                        (change)="toggleManualCriterion(crit.id)"
                        class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span
                        class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                        >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                      >
                    </label>
                  </div>

                  <!-- Mathématique -->
                  <div class="mt-2 pt-3 border-t border-slate-100">
                    <div class="flex justify-between items-center mb-2 px-3">
                      <h4
                        class="text-sm font-semibold text-slate-500 uppercase tracking-wider"
                      >
                        {{ i18n.t('scolExp.mathematique') }}
                      </h4>
                      <select
                        [ngModel]="selectedProvince()"
                        (ngModelChange)="selectedProvince.set($event)"
                        class="px-2 py-1 border border-slate-300 bg-white rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[150px] truncate cursor-pointer"
                      >
                        <option *ngFor="let p of PROVINCES" [value]="p.id">
                          {{ i18n.t('province.' + p.id) }}
                        </option>
                      </select>
                    </div>
                    <label
                      *ngFor="let m of mathCoursesForProvince()"
                      class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                    >
                      <input
                        type="checkbox"
                        [checked]="selectedCriteriaIds().has(m.id)"
                        (change)="toggleManualCriterion(m.id)"
                        class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span
                        class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                        >{{ i18n.lang() === 'en' ? (m.labelEn || m.label) : m.label }}</span
                      >
                    </label>
                    <div
                      *ngIf="mathCoursesForProvince().length === 0"
                      class="text-sm text-slate-500 italic p-2"
                    >
                      {{ i18n.t('scolExp.noMathForProvince') }}
                    </div>
                  </div>

                  <!-- Science -->
                  <div class="mt-2 pt-3 border-t border-slate-100">
                    <h4
                      class="text-sm font-semibold text-slate-500 mb-2 px-3 uppercase tracking-wider"
                    >
                      {{ i18n.t('scolExp.science') }}
                    </h4>
                    <label
                      *ngFor="let crit of criteriaScience()"
                      class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                    >
                      <input
                        type="checkbox"
                        [checked]="selectedCriteriaIds().has(crit.id)"
                        (change)="toggleManualCriterion(crit.id)"
                        class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span
                        class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                        >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                      >
                    </label>
                  </div>

                  <!-- Informatique -->
                  <div class="mt-2 pt-3 border-t border-slate-100">
                    <h4
                      class="text-sm font-semibold text-slate-500 mb-2 px-3 uppercase tracking-wider"
                    >
                      {{ i18n.t('scolExp.informatique') }}
                    </h4>
                    <label
                      *ngFor="let crit of criteriaInformatique()"
                      class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                    >
                      <input
                        type="checkbox"
                        [checked]="selectedCriteriaIds().has(crit.id)"
                        (change)="toggleManualCriterion(crit.id)"
                        class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span
                        class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                        >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                      >
                    </label>
                  </div>
                </div>

                <!-- TAB COURS SPÉCIALISÉS -->
                <div
                  *ngIf="activeScolariteTab() === 'specialises'"
                  class="flex flex-col gap-2"
                >
                  <h4
                    class="text-sm font-semibold text-slate-500 mb-2 px-3 uppercase tracking-wider"
                  >
                    {{ i18n.t('scolExp.postSecondaire') }}
                  </h4>
                  <label
                    *ngFor="let crit of criteriaCoursSpecialise()"
                    class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                  >
                    <input
                      type="checkbox"
                      [checked]="selectedCriteriaIds().has(crit.id)"
                      (change)="toggleManualCriterion(crit.id)"
                      class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span
                      class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                      >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                    >
                  </label>
                  <div
                    *ngIf="criteriaCoursSpecialise().length === 0"
                    class="text-sm text-slate-500 italic p-2"
                  >
                    {{ i18n.t('scolExp.noCriteriaDefined') }}
                  </div>
                </div>

                <!-- TAB UNIVERSITAIRE -->
                <div
                  *ngIf="activeScolariteTab() === 'universitaire'"
                  class="flex flex-col gap-2"
                >
                  <!-- Search bar for university degrees -->
                  <div class="px-2 pt-1 pb-2">
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        [ngModel]="univDegreeSearchQuery()"
                        (ngModelChange)="univDegreeSearchQuery.set($event)"
                        [placeholder]="i18n.t('scolExp.searchDegreePlaceholder')"
                        class="w-full pl-8 pr-8 py-1.5 text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                      />
                      <button
                        *ngIf="univDegreeSearchQuery()"
                        (click)="clearUnivDegreeSearch()"
                        type="button"
                        [title]="i18n.t('scolExp.clearSearch')"
                        class="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div *ngIf="univDegreeSearchQuery() && totalFilteredUnivCount() === 0" class="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-2 text-center">
                      {{ i18n.t('scolExp.noDegreeFound') }}
                    </div>
                  </div>

                  <!-- Premier cycle -->
                  <div *ngIf="!univDegreeSearchQuery() || totalFiltered1erCycleCount() > 0">
                    <label
                      class="flex items-center gap-2 px-3 mb-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        [checked]="
                          selectedCriteriaIds().has('univ_1er_cycle_global')
                        "
                        (change)="
                          toggleManualCriterion('univ_1er_cycle_global')
                        "
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <h4
                        class="text-sm font-semibold text-slate-500 uppercase tracking-wider group-hover:text-slate-700"
                      >
                        {{ i18n.t('scolExp.etude1erCycle') }}
                      </h4>
                    </label>

                    <!-- Domaine Génie -->
                    <div
                      *ngIf="!univDegreeSearchQuery() || filteredUnivGenie().length > 0"
                      class="ml-2 mb-2 border-t border-slate-100 pt-2"
                    >
                      <div
                        class="flex items-center gap-1 w-full px-1 py-1 group"
                      >
                        <button
                          (click)="toggleDomaine('genie')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="isDomaineExpanded('genie')"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                        <label
                          class="flex items-center gap-2 cursor-pointer flex-grow"
                        >
                          <input
                            type="checkbox"
                            [checked]="
                              selectedCriteriaIds().has('univ_1er_cycle_genie')
                            "
                            (change)="
                              toggleManualCriterion('univ_1er_cycle_genie')
                            "
                            class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <h5
                            class="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors pt-0.5"
                          >
                            {{ i18n.t('scolExp.domaineGenie') }}
                          </h5>
                        </label>
                      </div>
                      <div
                        *ngIf="isDomaineExpanded('genie')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of filteredUnivGenie()
                          "
                          class="flex items-start gap-3 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                        >
                          <input
                            type="checkbox"
                            [checked]="selectedCriteriaIds().has(crit.id)"
                            (change)="toggleManualCriterion(crit.id)"
                            class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span
                            class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                            >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                          >
                        </label>
                      </div>
                    </div>

                    <!-- Domaine Sciences -->
                    <div
                      *ngIf="!univDegreeSearchQuery() || filteredUnivSciences().length > 0"
                      class="ml-2 mb-2 border-t border-slate-100 pt-2"
                    >
                      <div
                        class="flex items-center gap-1 w-full px-1 py-1 group"
                      >
                        <button
                          (click)="toggleDomaine('sciences')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="
                              isDomaineExpanded('sciences')
                            "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                        <label
                          class="flex items-center gap-2 cursor-pointer flex-grow"
                        >
                          <input
                            type="checkbox"
                            [checked]="
                              selectedCriteriaIds().has(
                                'univ_1er_cycle_sciences'
                              )
                            "
                            (change)="
                              toggleManualCriterion('univ_1er_cycle_sciences')
                            "
                            class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <h5
                            class="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors pt-0.5"
                          >
                            {{ i18n.t('scolExp.domaineSciences') }}
                          </h5>
                        </label>
                      </div>
                      <div
                        *ngIf="isDomaineExpanded('sciences')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of filteredUnivSciences()
                          "
                          class="flex items-start gap-3 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                        >
                          <input
                            type="checkbox"
                            [checked]="selectedCriteriaIds().has(crit.id)"
                            (change)="toggleManualCriterion(crit.id)"
                            class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span
                            class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                            >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                          >
                        </label>
                      </div>
                    </div>

                    <!-- Domaine Arts -->
                    <div
                      *ngIf="!univDegreeSearchQuery() || filteredUnivArts().length > 0"
                      class="ml-2 mb-2 border-t border-slate-100 pt-2"
                    >
                      <div
                        class="flex items-center gap-1 w-full px-1 py-1 group"
                      >
                        <button
                          (click)="toggleDomaine('arts')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="isDomaineExpanded('arts')"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                        <label
                          class="flex items-center gap-2 cursor-pointer flex-grow"
                        >
                          <input
                            type="checkbox"
                            [checked]="
                              selectedCriteriaIds().has('univ_1er_cycle_arts')
                            "
                            (change)="
                              toggleManualCriterion('univ_1er_cycle_arts')
                            "
                            class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <h5
                            class="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors pt-0.5"
                          >
                            {{ i18n.t('scolExp.domaineArts') }}
                          </h5>
                        </label>
                      </div>
                      <div
                        *ngIf="isDomaineExpanded('arts')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of filteredUnivArts()
                          "
                          class="flex items-start gap-3 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                        >
                          <input
                            type="checkbox"
                            [checked]="selectedCriteriaIds().has(crit.id)"
                            (change)="toggleManualCriterion(crit.id)"
                            class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span
                            class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                            >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                          >
                        </label>
                      </div>
                    </div>

                    <!-- Domaine Santé -->
                    <div
                      *ngIf="!univDegreeSearchQuery() || filteredUnivSante().length > 0"
                      class="ml-2 mb-4 border-t border-slate-100 pt-2"
                    >
                      <div
                        class="flex items-center gap-1 w-full px-1 py-1 group"
                      >
                        <button
                          (click)="toggleDomaine('sante')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="isDomaineExpanded('sante')"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                        <label
                          class="flex items-center gap-2 cursor-pointer flex-grow"
                        >
                          <input
                            type="checkbox"
                            [checked]="
                              selectedCriteriaIds().has('univ_1er_cycle_sante')
                            "
                            (change)="
                              toggleManualCriterion('univ_1er_cycle_sante')
                            "
                            class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <h5
                            class="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors pt-0.5"
                          >
                            {{ i18n.t('scolExp.domaineSante') }}
                          </h5>
                        </label>
                      </div>
                      <div
                        *ngIf="isDomaineExpanded('sante')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of filteredUnivSante()
                          "
                          class="flex items-start gap-3 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                        >
                          <input
                            type="checkbox"
                            [checked]="selectedCriteriaIds().has(crit.id)"
                            (change)="toggleManualCriterion(crit.id)"
                            class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span
                            class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                            >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                          >
                        </label>
                      </div>
                    </div>

                    <div
                      *ngIf="!univDegreeSearchQuery() && criteriaUniversitaire1erCycle().length === 0"
                      class="text-sm text-slate-500 italic p-3 text-center border border-dashed border-slate-200 rounded-lg"
                    >
                      {{ i18n.t('scolExp.noCriteriaDefined') }}
                    </div>
                  </div>

                  <!-- Cycle supérieur -->
                  <div
                    *ngIf="!univDegreeSearchQuery() || totalFilteredCycleSupCount() > 0"
                    class="mt-4 pt-4 border-t border-slate-100"
                  >
                    <label
                      class="flex items-center gap-2 px-3 mb-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        [checked]="
                          selectedCriteriaIds().has('univ_cycle_sup_global')
                        "
                        (change)="
                          toggleManualCriterion('univ_cycle_sup_global')
                        "
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <h4
                        class="text-sm font-semibold text-slate-500 uppercase tracking-wider group-hover:text-slate-700"
                      >
                        {{ i18n.t('scolExp.etudeCyclesSuperieurs') }}
                      </h4>
                    </label>

                    <!-- Maîtrise -->
                    <div
                      *ngIf="!univDegreeSearchQuery() || filteredUnivMaitrise().length > 0"
                      class="ml-2 mb-2 border-t border-slate-100 pt-2"
                    >
                      <div
                        class="flex items-center gap-1 w-full px-1 py-1 group"
                      >
                        <button
                          (click)="toggleDomaine('maitrise')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="
                              isDomaineExpanded('maitrise')
                            "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                        <label
                          class="flex items-center gap-2 cursor-pointer flex-grow"
                        >
                          <input
                            type="checkbox"
                            [checked]="
                              selectedCriteriaIds().has(
                                'univ_cycle_sup_maitrise'
                              )
                            "
                            (change)="
                              toggleManualCriterion('univ_cycle_sup_maitrise')
                            "
                            class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <h5
                            class="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors pt-0.5"
                          >
                            {{ i18n.t('scolExp.maitrise') }}
                          </h5>
                        </label>
                      </div>
                      <div
                        *ngIf="isDomaineExpanded('maitrise')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of filteredUnivMaitrise()
                          "
                          class="flex items-start gap-3 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                        >
                          <input
                            type="checkbox"
                            [checked]="selectedCriteriaIds().has(crit.id)"
                            (change)="toggleManualCriterion(crit.id)"
                            class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span
                            class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                            >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                          >
                        </label>
                      </div>
                    </div>

                    <!-- Doctorat -->
                    <div
                      *ngIf="!univDegreeSearchQuery() || filteredUnivDoctorat().length > 0"
                      class="ml-2 mb-4 border-t border-slate-100 pt-2"
                    >
                      <div
                        class="flex items-center gap-1 w-full px-1 py-1 group"
                      >
                        <button
                          (click)="toggleDomaine('doctorat')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="
                              isDomaineExpanded('doctorat')
                            "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                        <label
                          class="flex items-center gap-2 cursor-pointer flex-grow"
                        >
                          <input
                            type="checkbox"
                            [checked]="
                              selectedCriteriaIds().has(
                                'univ_cycle_sup_doctorat'
                              )
                            "
                            (change)="
                              toggleManualCriterion('univ_cycle_sup_doctorat')
                            "
                            class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <h5
                            class="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors pt-0.5"
                          >
                            {{ i18n.t('scolExp.doctorat') }}
                          </h5>
                        </label>
                      </div>
                      <div
                        *ngIf="isDomaineExpanded('doctorat')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of filteredUnivDoctorat()
                          "
                          class="flex items-start gap-3 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                        >
                          <input
                            type="checkbox"
                            [checked]="selectedCriteriaIds().has(crit.id)"
                            (change)="toggleManualCriterion(crit.id)"
                            class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span
                            class="text-sm text-slate-700 group-hover:text-slate-900 font-medium"
                            >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                          >
                        </label>
                      </div>
                    </div>

                    <div
                      *ngIf="!univDegreeSearchQuery() && criteriaUniversitaireCycleSuperieur().length === 0"
                      class="text-sm text-slate-500 italic p-3 text-center border border-dashed border-slate-200 rounded-lg"
                    >
                      {{ i18n.t('scolExp.noCriteriaDefined') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Expérience -->
            <div
              class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col flex-1"
            >
              <div class="bg-slate-50 border-b border-slate-200 shrink-0">
                <div class="p-4 pb-0">
                  <h3 class="text-lg font-bold text-slate-800 mb-3">
                    {{ i18n.t('scolExp.experience') }}
                  </h3>
                </div>
              </div>
              <div class="p-4">
                <!-- Section Test supplémentaire si au moins un métier au dossier requiert un test -->
                @if (hasAnyExtraTest()) {
                  <div class="mb-4 p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-2.5">
                    <div class="flex items-center justify-between pb-1.5 border-b border-indigo-100">
                      <div class="flex items-center gap-2">
                        <span class="p-0.5 px-1.5 rounded bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
                          Test
                        </span>
                        <h4 class="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                          {{ i18n.t('scolExp.testSupplementaire') }}
                        </h4>
                      </div>
                      <span class="text-[11px] text-indigo-700 font-medium">
                        {{ i18n.t('scolExp.cocherReussi') }}
                      </span>
                    </div>

                    <div class="space-y-2">
                      <!-- Test ECE (00203) -->
                      @if (hasEceJob()) {
                        <div class="p-2.5 bg-white border border-indigo-100 rounded-lg shadow-2xs">
                          <div class="flex flex-wrap items-start justify-between gap-2">
                            <label class="flex items-start gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                [checked]="testEcePassed()"
                                (change)="onEceMainToggle($any($event.target).checked)"
                                class="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                              <div>
                                <div class="flex items-center gap-2">
                                  <span class="text-xs font-bold text-slate-800">ECE</span>
                                  <span
                                    class="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                    [class.bg-emerald-100]="testEcePassed()"
                                    [class.text-emerald-800]="testEcePassed()"
                                    [class.bg-amber-100]="testEceNotCompleted()"
                                    [class.text-amber-800]="testEceNotCompleted()"
                                    [class.bg-slate-100]="!testEcePassed() && !testEceNotCompleted()"
                                    [class.text-slate-600]="!testEcePassed() && !testEceNotCompleted()"
                                  >
                                    {{ testEcePassed() ? i18n.t('scolExp.reussiAdmissible') : (testEceNotCompleted() ? i18n.t('scolExp.pasEncoreCompleteInadmissible') : i18n.t('scolExp.nonCocheInadmissible')) }}
                                  </span>
                                </div>
                                <p class="text-[11px] text-slate-500 mt-0.5">
                                  {{ i18n.t('scolExp.eceDesc') }}
                                </p>
                              </div>
                            </label>

                            <label class="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50/90 border border-amber-200 rounded-md cursor-pointer hover:bg-amber-100/80 select-none transition-colors">
                              <input
                                type="checkbox"
                                [checked]="testEceNotCompleted()"
                                (change)="onEceNotCompletedToggle($any($event.target).checked)"
                                class="w-3.5 h-3.5 text-amber-600 border-amber-300 rounded focus:ring-amber-500 cursor-pointer"
                              />
                              <span class="text-xs font-medium text-amber-900">{{ i18n.t('scolExp.pasEncoreComplete') }}</span>
                            </label>
                          </div>
                        </div>
                      }

                      <!-- Test ESOM (00207) -->
                      @if (hasEsomJob()) {
                        <div class="p-2.5 bg-white border border-indigo-100 rounded-lg shadow-2xs">
                          <div class="flex flex-wrap items-start justify-between gap-2">
                            <label class="flex items-start gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                [checked]="testEsomPassed()"
                                (change)="onEsomMainToggle($any($event.target).checked)"
                                class="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                              <div>
                                <div class="flex items-center gap-2">
                                  <span class="text-xs font-bold text-slate-800">ESOM</span>
                                  <span
                                    class="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                    [class.bg-emerald-100]="testEsomPassed()"
                                    [class.text-emerald-800]="testEsomPassed()"
                                    [class.bg-amber-100]="testEsomNotCompleted()"
                                    [class.text-amber-800]="testEsomNotCompleted()"
                                    [class.bg-slate-100]="!testEsomPassed() && !testEsomNotCompleted()"
                                    [class.text-slate-600]="!testEsomPassed() && !testEsomNotCompleted()"
                                  >
                                    {{ testEsomPassed() ? i18n.t('scolExp.reussiAdmissible') : (testEsomNotCompleted() ? i18n.t('scolExp.pasEncoreCompleteInadmissible') : i18n.t('scolExp.nonCocheInadmissible')) }}
                                  </span>
                                </div>
                                <p class="text-[11px] text-slate-500 mt-0.5">
                                  {{ i18n.t('scolExp.esomDesc') }}
                                </p>
                              </div>
                            </label>

                            <label class="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50/90 border border-amber-200 rounded-md cursor-pointer hover:bg-amber-100/80 select-none transition-colors">
                              <input
                                type="checkbox"
                                [checked]="testEsomNotCompleted()"
                                (change)="onEsomNotCompletedToggle($any($event.target).checked)"
                                class="w-3.5 h-3.5 text-amber-600 border-amber-300 rounded focus:ring-amber-500 cursor-pointer"
                              />
                              <span class="text-xs font-medium text-amber-900">{{ i18n.t('scolExp.pasEncoreComplete') }}</span>
                            </label>
                          </div>
                        </div>
                      }

                      <!-- Test CEOPM (00214) -->
                      @if (hasCeopmJob()) {
                        <div class="p-2.5 bg-white border border-indigo-100 rounded-lg shadow-2xs">
                          <div class="flex flex-wrap items-start justify-between gap-2">
                            <label class="flex items-start gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                [checked]="testCeopmPassed()"
                                (change)="onCeopmMainToggle($any($event.target).checked)"
                                class="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                              <div>
                                <div class="flex items-center gap-2">
                                  <span class="text-xs font-bold text-slate-800">CEOPM</span>
                                  <span
                                    class="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                    [class.bg-emerald-100]="testCeopmPassed()"
                                    [class.text-emerald-800]="testCeopmPassed()"
                                    [class.bg-amber-100]="testCeopmNotCompleted()"
                                    [class.text-amber-800]="testCeopmNotCompleted()"
                                    [class.bg-slate-100]="!testCeopmPassed() && !testCeopmNotCompleted()"
                                    [class.text-slate-600]="!testCeopmPassed() && !testCeopmNotCompleted()"
                                  >
                                    {{ testCeopmPassed() ? i18n.t('scolExp.reussiAdmissible') : (testCeopmNotCompleted() ? i18n.t('scolExp.pasEncoreCompleteInadmissible') : i18n.t('scolExp.nonCocheInadmissible')) }}
                                  </span>
                                </div>
                                <p class="text-[11px] text-slate-500 mt-0.5">
                                  {{ i18n.t('scolExp.ceopmDesc') }}
                                </p>
                              </div>
                            </label>

                            <label class="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50/90 border border-amber-200 rounded-md cursor-pointer hover:bg-amber-100/80 select-none transition-colors">
                              <input
                                type="checkbox"
                                [checked]="testCeopmNotCompleted()"
                                (change)="onCeopmNotCompletedToggle($any($event.target).checked)"
                                class="w-3.5 h-3.5 text-amber-600 border-amber-300 rounded focus:ring-amber-500 cursor-pointer"
                              />
                              <span class="text-xs font-medium text-amber-900">{{ i18n.t('scolExp.pasEncoreComplete') }}</span>
                            </label>
                          </div>
                        </div>
                      }

                      <!-- Test CSPN (00182, 00183, 00184) -->
                      @if (hasCspnJob()) {
                        <div class="p-2.5 bg-white border border-indigo-100 rounded-lg shadow-2xs space-y-2">
                          <div class="flex flex-wrap items-start justify-between gap-2">
                            <label class="flex items-start gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                [checked]="testCspnPassed()"
                                (change)="onCspnMainToggle($any($event.target).checked)"
                                class="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                              <div>
                                <div class="flex items-center gap-2">
                                  <span class="text-xs font-bold text-slate-800">CSPN</span>
                                  <span
                                    class="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                    [class.bg-emerald-100]="testCspnPassed()"
                                    [class.text-emerald-800]="testCspnPassed()"
                                    [class.bg-amber-100]="testCspnNotCompleted()"
                                    [class.text-amber-800]="testCspnNotCompleted()"
                                    [class.bg-slate-100]="!testCspnPassed() && !testCspnNotCompleted()"
                                    [class.text-slate-600]="!testCspnPassed() && !testCspnNotCompleted()"
                                  >
                                    {{ testCspnPassed() ? i18n.t('scolExp.testReussi') : (testCspnNotCompleted() ? i18n.t('scolExp.pasEncoreCompleteInadmissible') : i18n.t('scolExp.nonCocheInadmissible')) }}
                                  </span>
                                </div>
                                <p class="text-[11px] text-slate-500 mt-0.5">
                                  {{ i18n.t('scolExp.cspnDesc') }}
                                </p>
                              </div>
                            </label>

                            <label class="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50/90 border border-amber-200 rounded-md cursor-pointer hover:bg-amber-100/80 select-none transition-colors">
                              <input
                                type="checkbox"
                                [checked]="testCspnNotCompleted()"
                                (change)="onCspnNotCompletedToggle($any($event.target).checked)"
                                class="w-3.5 h-3.5 text-amber-600 border-amber-300 rounded focus:ring-amber-500 cursor-pointer"
                              />
                              <span class="text-xs font-medium text-amber-900">{{ i18n.t('scolExp.pasEncoreComplete') }}</span>
                            </label>
                          </div>

                          @if (testCspnPassed()) {
                            <div class="mt-2 pl-6 pt-2 border-t border-slate-100 space-y-1.5">
                              <p class="text-[11px] font-semibold text-slate-700 mb-1">
                                {{ i18n.t('scolExp.metiersTestReussi') }}
                              </p>
                              <div class="grid grid-cols-1 gap-1.5">
                                <label class="flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-50 cursor-pointer border border-slate-100 select-none">
                                  <input
                                    type="checkbox"
                                    [checked]="testCspn00182Passed()"
                                    (change)="testCspn00182Passed.set($any($event.target).checked)"
                                    class="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                                  />
                                  <span class="text-xs text-slate-800">
                                    <span class="font-bold text-indigo-700">00182</span> - {{ i18n.t('scolExp.combatSystems') }}
                                  </span>
                                </label>

                                <label class="flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-50 cursor-pointer border border-slate-100 select-none">
                                  <input
                                    type="checkbox"
                                    [checked]="testCspn00183Passed()"
                                    (change)="testCspn00183Passed.set($any($event.target).checked)"
                                    class="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                                  />
                                  <span class="text-xs text-slate-800">
                                    <span class="font-bold text-indigo-700">00183</span> - {{ i18n.t('scolExp.pilot') }}
                                  </span>
                                </label>

                                <label class="flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-50 cursor-pointer border border-slate-100 select-none">
                                  <input
                                    type="checkbox"
                                    [checked]="testCspn00184Passed()"
                                    (change)="testCspn00184Passed.set($any($event.target).checked)"
                                    class="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                                  />
                                  <span class="text-xs text-slate-800">
                                    <span class="font-bold text-indigo-700">00184</span> - {{ i18n.t('scolExp.aerospaceControl') }}
                                  </span>
                                </label>
                              </div>
                            </div>
                          }
                        </div>
                      }
                    </div>
                  </div>
                }

                <div class="flex flex-col gap-2">
                  <label
                    *ngFor="let crit of criteriaExperience()"
                    class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 group"
                  >
                    <input
                      type="checkbox"
                      [checked]="selectedCriteriaIds().has(crit.id)"
                      (change)="toggleManualCriterion(crit.id)"
                      class="mt-0.5 flex-shrink-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span
                      class="text-sm text-slate-700 group-hover:text-slate-900 font-medium whitespace-pre-line"
                      >{{ i18n.lang() === 'en' ? (crit.labelEn || crit.label) : crit.label }}</span
                    >
                  </label>
                  <div
                    *ngIf="criteriaExperience().length === 0"
                    class="text-sm text-slate-500 italic p-3 text-center border border-dashed border-slate-200 rounded-lg"
                  >
                    {{ i18n.t('scolExp.noExperienceDefined') }}
                  </div>
                </div>
              </div>
            </div>

    </div>
`;
