export const REORIENTATION_TEMPLATE_PART3 = `
                          >
                            {{ i18n.t('scolExp.domaineSciences') }}
                          </h5>
                        </label>
                      </div>
                      <div
                        *ngIf="expandedDomaines().has('sciences')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of criteriaUniversitaire1erCycleSciences()
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

                    <div class="ml-2 mb-2 border-t border-slate-100 pt-2">
                      <div
                        class="flex items-center gap-1 w-full px-1 py-1 group"
                      >
                        <button
                          (click)="toggleDomaine('arts')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="expandedDomaines().has('arts')"
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
                        *ngIf="expandedDomaines().has('arts')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of criteriaUniversitaire1erCycleArts()
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

                    <div class="ml-2 mb-4 border-t border-slate-100 pt-2">
                      <div
                        class="flex items-center gap-1 w-full px-1 py-1 group"
                      >
                        <button
                          (click)="toggleDomaine('sante')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="expandedDomaines().has('sante')"
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
                        *ngIf="expandedDomaines().has('sante')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of criteriaUniversitaire1erCycleSante()
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
                      *ngIf="criteriaUniversitaire1erCycle().length === 0"
                      class="text-sm text-slate-500 italic p-3 text-center border border-dashed border-slate-200 rounded-lg"
                    >
                      {{ i18n.t('scolExp.noCriteriaDefined') }}
                    </div>
                  </div>

                  <!-- Cycle supérieur -->
                  <div class="mt-4 pt-4 border-t border-slate-100">
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

                    <div class="ml-2 mb-2 border-t border-slate-100 pt-2">
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
                              expandedDomaines().has('maitrise')
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
                        *ngIf="expandedDomaines().has('maitrise')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of criteriaUniversitaireCycleSuperieurMaitrise()
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

                    <div class="ml-2 mb-4 border-t border-slate-100 pt-2">
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
                              expandedDomaines().has('doctorat')
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
                        *ngIf="expandedDomaines().has('doctorat')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of criteriaUniversitaireCycleSuperieurDoctorat()
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
                      *ngIf="criteriaUniversitaireCycleSuperieur().length === 0"
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
          } @else {
            <!-- Volet PFOR lorsque Postulant PFOR est activé -->
            <div class="p-5 bg-white border border-indigo-200 rounded-xl shadow-sm flex flex-col gap-4">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div class="flex items-center gap-2">
                  <span class="bg-indigo-600 text-white text-xs font-black px-2 py-0.5 rounded tracking-wider leading-none">{{ i18n.t('pfor.badge') }}</span>
                  <h3 class="text-sm font-bold text-slate-800">
                    {{ i18n.t('pfor.candidateProfile') }}
                  </h3>
                </div>
              </div>

              <!-- Type de PFOR -->
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-2">
                  {{ i18n.t('pfor.pforTrack') }}
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      <span class="font-bold text-sm">{{ i18n.t('pfor.cmr') }}</span>
                      @if (pforType() === 'cmr') {
                        <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                      }
                    </div>
                    <span class="text-xs text-slate-500">{{ i18n.t('pfor.cmrDesc') }}</span>
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
                      <span class="font-bold text-sm">{{ i18n.t('pfor.civil') }}</span>
                      @if (pforType() === 'civil') {
                        <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                      }
                    </div>
                    <span class="text-xs text-slate-500">{{ i18n.t('pfor.civilSubtitle') }}</span>
                  </button>
                </div>
              </div>

              <!-- Domaines CMR -->
              @if (pforType() === 'cmr') {
                <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <label class="block text-xs font-bold text-slate-700">
                    {{ i18n.t('pfor.cmrDomainsCheck') }}
                  </label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                        class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all cursor-pointer"
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
                        {{ i18n.t('pfor.arts') }}
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
                        class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all cursor-pointer"
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
                        {{ i18n.t('pfor.science') }}
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
                        class="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition-all cursor-pointer"
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
                        {{ i18n.t('pfor.genie') }}
                      </span>
                    </label>
                  </div>
                </div>
              }
            </div>
          }
        </div>

        <!-- Colonne de droite: Résultat -->
        <div
          class="flex flex-col lg:w-5/12 lg:sticky lg:top-4 h-fit gap-4 pr-1"
          *ngIf="showResultsPanel()"
        >
          <!-- Panneau de la note de registre -->
          <div
            class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden shrink-0"
          >
            <div
              class="p-4 bg-slate-50 border-b border-slate-200 shrink-0 flex items-center justify-between flex-wrap gap-2"
            >
              <div class="flex items-center gap-2">
                <span class="p-1 px-2 rounded bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold font-sans uppercase tracking-wider">
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
              <div class="bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-700 font-mono select-text leading-relaxed whitespace-pre-wrap break-words">
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
                  {{ (citizenship() === 'PR < 3 years') ? i18n.t('reo.emailPrClosed') : (age() !== null && age()! >= 57) ? i18n.t('reo.emailAgeClosed') : i18n.t('reo.emailTitle') }}
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
                } @else {
                  <div class="flex gap-2" *ngIf="eligibleJobs().length > 0">
                    <span
                      class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full"
                    >
                      {{ i18n.t('reo.jobsCountBadge', { count: eligibleJobs().length }) }}
                    </span>
                  </div>
                  <div class="flex gap-2" *ngIf="isPforApplicant() && eligibleJobs().length === 0">
                    <span
                      class="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full"
                    >
                      {{ i18n.t('reo.zeroPforOpen') }}
                    </span>
                  </div>
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
                [innerHTML]="i18n.lang() === 'fr' ? getReoContentHtmlFr() : getReoContentHtmlEn()"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
`;
