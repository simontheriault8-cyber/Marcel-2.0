export const REORIENTATION_TEMPLATE_PART2 = `
                          <!-- Age detail -->
                          <div class="flex items-start gap-1">
                            <span
                              class="font-bold"
                              [class.text-emerald-600]="s2.isAgeAdmissible"
                              [class.text-rose-600]="!s2.isAgeAdmissible"
                            >
                              {{ s2.isAgeAdmissible ? "✓" : "✗" }}
                            </span>
                            <div>
                              <span class="font-semibold">{{ i18n.t('reo.ageLabel') }}</span>
                              @if (age() === null || age()! <= 0) {
                                <span class="italic text-slate-500"
                                  >{{ i18n.t('reo.ageNotFilled', { duration: s2.durationYears, maxAge: 59 - s2.durationYears }) }}</span
                                >
                              } @else {
                                <span
                                  >{{ i18n.t('reo.ageYears', { age: age() }) }}
                                  @if (!s2.isAgeAdmissible) {
                                    {{ i18n.lang() === 'en' ? (s2.ageReasonEn || s2.ageReason) : s2.ageReason }}
                                  } @else {
                                    {{ i18n.t('reo.ageOk', { duration: s2.durationYears }) }}
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
                                s2.isCitizenshipAdmissible
                              "
                              [class.text-rose-600]="!s2.isCitizenshipAdmissible"
                            >
                              {{ s2.isCitizenshipAdmissible ? "✓" : "✗" }}
                            </span>
                            <div>
                              <span class="font-semibold">{{ i18n.t('reo.statusLabel') }}</span>
                              <span>
                                @if (citizenship() === "Canadian Citizen") {
                                  {{ i18n.t('reo.citizenOk') }}
                                } @else if (citizenship() === "PR > 3 years") {
                                  {{ i18n.t('reo.prOver3') }}
                                  @if (!s2.isCitizenshipAdmissible) {
                                    {{ i18n.lang() === 'en' ? (s2.citizenshipReasonEn || s2.citizenshipReason) : s2.citizenshipReason }}
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
                              [class.text-emerald-600]="s2.isEducationAdmissible"
                              [class.text-rose-600]="!s2.isEducationAdmissible"
                            >
                              {{ s2.isEducationAdmissible ? "✓" : "✗" }}
                            </span>
                            <div>
                              <span class="font-semibold">{{ i18n.t('reo.scolariteLabel') }}</span>
                              <span
                                [class.text-rose-700]="!s2.isEducationAdmissible"
                                [class.text-emerald-700]="
                                  s2.isEducationAdmissible
                                "
                              >
                                {{
                                  s2.isEducationAdmissible
                                    ? i18n.t('reo.scolariteOk')
                                    : (i18n.lang() === 'en' ? (s2.educationReasonEn || i18n.t('reo.scolariteNotMet')) : (s2.educationReason || i18n.t('reo.scolariteNotMet')))
                                }}
                              </span>
                            </div>
                          </div>

                          <!-- Extra Test detail -->
                          @if (s2.isExtraTestRequired) {
                            <div class="flex items-start gap-1">
                              <span
                                class="font-bold"
                                [class.text-emerald-600]="s2.isExtraTestAdmissible"
                                [class.text-rose-600]="!s2.isExtraTestAdmissible"
                              >
                                {{ s2.isExtraTestAdmissible ? "✓" : "✗" }}
                              </span>
                              <div>
                                <span class="font-semibold">{{ i18n.t('reo.testSelectionLabel', { name: s2.extraTestName }) }}</span>
                                <span
                                  [class.text-rose-700]="!s2.isExtraTestAdmissible"
                                  [class.text-emerald-700]="s2.isExtraTestAdmissible"
                                >
                                  {{
                                    s2.isExtraTestAdmissible
                                      ? i18n.t('reo.extraTestSuccess')
                                      : isExtraTestNotCompleted(s2.job.id)
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
                                [class.text-emerald-600]="s2.isMedicalAdmissible"
                                [class.text-rose-600]="!s2.isMedicalAdmissible"
                              >
                                {{ s2.isMedicalAdmissible ? "✓" : "✗" }}
                              </span>
                              <div>
                                <span class="font-semibold">{{ i18n.t('reo.medicalRatingLabel') }}</span>
                                <span
                                  [class.text-rose-700]="!s2.isMedicalAdmissible"
                                  [class.text-emerald-700]="s2.isMedicalAdmissible"
                                >
                                  {{
                                    s2.isMedicalAdmissible
                                      ? i18n.t('reo.medStandardConform')
                                      : (i18n.lang() === 'en' ? (s2.medicalReasonEn || s2.medicalReason) : s2.medicalReason)
                                  }}
                                </span>
                              </div>
                            </div>
                          }
                        </div>

                        <!-- SIP Status Warning -->
                        @if (s2.isJobClosed) {
                          <div
                            class="mt-2 p-1.5 rounded border flex items-start gap-1.5 font-semibold text-[10px] leading-tight"
                            [class]="s2.isClosedAdmissionOnly ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-red-100 text-red-800 border-red-200'"
                          >
                            <span>⚠</span>
                            <div>
                              @if (s2.isClosedAdmissionOnly) {
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

              <!-- Field 3 -->
              <div
                class="relative flex flex-col gap-2 p-4 bg-slate-50/50 border border-slate-200 rounded-xl"
              >
                <div class="flex items-center justify-between">
                  <span
                    class="text-xs font-bold uppercase tracking-wider text-slate-500"
                    >{{ i18n.t('reo.choiceJob', { num: 3 }) }}</span
                  >
                  <button
                    *ngIf="hasSelected(3)"
                    (click)="clearDossierJob(3, $event)"
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
                    [class.opacity-50]="isFieldDisabled(3)"
                    [class.bg-slate-100]="isFieldDisabled(3)"
                    [class.cursor-not-allowed]="isFieldDisabled(3)"
                  >
                    <input
                      type="text"
                      [ngModel]="searchDossierQuery3()"
                      (ngModelChange)="onQueryChange(3, $event)"
                      (focus)="openDropdown(3)"
                      (blur)="closeDropdownDelayed(3)"
                      [disabled]="isFieldDisabled(3)"
                      class="w-full px-3 py-2 text-sm outline-none bg-transparent"
                      [class.cursor-not-allowed]="isFieldDisabled(3)"
                      [placeholder]="i18n.t('reo.rechercher')"
                    />
                    <button
                      *ngIf="!dropdownOpen3() && !isFieldDisabled(3)"
                      class="p-1 px-2 text-slate-400"
                      (click)="openDropdown(3)"
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
                      *ngIf="dropdownOpen3() && !isFieldDisabled(3)"
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
                    *ngIf="dropdownOpen3()"
                    class="absolute z-50 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg"
                  >
                    @if (filteredDossierJobs3().length === 0) {
                      <div class="p-3 text-xs text-slate-500 italic">
                        {{ i18n.t('reo.aucunMetier') }}
                      </div>
                    } @else {
                      @for (job of filteredDossierJobs3(); track job.id) {
                        <button
                          (click)="selectDossierJob(3, job.id)"
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

                <!-- Admissibility Box for Field 3 -->
                @if (selectedDossierJobId3()) {
                  @let s3 = evaluateJobAdmissibility(selectedDossierJobId3());
                  @if (s3) {
                    <div
                      class="mt-2 p-3 rounded-lg border text-xs bg-white"
                      [class.bg-emerald-50]="s3.isEligible"
                      [class.border-emerald-200]="s3.isEligible"
                      [class.bg-rose-50]="!s3.isEligible"
                      [class.border-rose-200]="!s3.isEligible"
                    >
                      <div
                        class="flex items-center justify-between font-bold mb-1"
                        [class.text-emerald-800]="s3.isEligible"
                        [class.text-rose-800]="!s3.isEligible"
                      >
                        <span>{{
                          s3.isEligible ? i18n.t('reo.admissibleBadge') : i18n.t('reo.nonAdmissibleBadge')
                        }}</span>
                        <span
                          class="text-[10px] font-mono bg-white/50 px-1 py-0.5 rounded"
                          >ID {{ s3.job.id }}</span
                        >
                      </div>
                      <p class="font-semibold text-slate-700 truncate mb-2">
                        {{ jobService.getJobTitle(s3.job, i18n.lang()) }}
                      </p>

                      @if (s3.job.id !== '00003') {
                        <div class="space-y-1 text-[11px] text-slate-600">
                          <!-- Age detail -->
                          <div class="flex items-start gap-1">
                            <span
                              class="font-bold"
                              [class.text-emerald-600]="s3.isAgeAdmissible"
                              [class.text-rose-600]="!s3.isAgeAdmissible"
                            >
                              {{ s3.isAgeAdmissible ? "✓" : "✗" }}
                            </span>
                            <div>
                              <span class="font-semibold">{{ i18n.t('reo.ageLabel') }}</span>
                              @if (age() === null || age()! <= 0) {
                                <span class="italic text-slate-500"
                                  >{{ i18n.t('reo.ageNotFilled', { duration: s3.durationYears, maxAge: 59 - s3.durationYears }) }}</span
                                >
                              } @else {
                                <span
                                  >{{ i18n.t('reo.ageYears', { age: age() }) }}
                                  @if (!s3.isAgeAdmissible) {
                                    {{ i18n.lang() === 'en' ? (s3.ageReasonEn || s3.ageReason) : s3.ageReason }}
                                  } @else {
                                    {{ i18n.t('reo.ageOk', { duration: s3.durationYears }) }}
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
                                s3.isCitizenshipAdmissible
                              "
                              [class.text-rose-600]="!s3.isCitizenshipAdmissible"
                            >
                              {{ s3.isCitizenshipAdmissible ? "✓" : "✗" }}
                            </span>
                            <div>
                              <span class="font-semibold">{{ i18n.t('reo.statusLabel') }}</span>
                              <span>
                                @if (citizenship() === "Canadian Citizen") {
                                  {{ i18n.t('reo.citizenOk') }}
                                } @else if (citizenship() === "PR > 3 years") {
                                  {{ i18n.t('reo.prOver3') }}
                                  @if (!s3.isCitizenshipAdmissible) {
                                    {{ i18n.lang() === 'en' ? (s3.citizenshipReasonEn || s3.citizenshipReason) : s3.citizenshipReason }}
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
                              [class.text-emerald-600]="s3.isEducationAdmissible"
                              [class.text-rose-600]="!s3.isEducationAdmissible"
                            >
                              {{ s3.isEducationAdmissible ? "✓" : "✗" }}
                            </span>
                            <div>
                              <span class="font-semibold">{{ i18n.t('reo.scolariteLabel') }}</span>
                              <span
                                [class.text-rose-700]="!s3.isEducationAdmissible"
                                [class.text-emerald-700]="
                                  s3.isEducationAdmissible
                                "
                              >
                                {{
                                  s3.isEducationAdmissible
                                    ? i18n.t('reo.scolariteOk')
                                    : (i18n.lang() === 'en' ? (s3.educationReasonEn || i18n.t('reo.scolariteNotMet')) : (s3.educationReason || i18n.t('reo.scolariteNotMet')))
                                }}
                              </span>
                            </div>
                          </div>

                          <!-- Extra Test detail -->
                          @if (s3.isExtraTestRequired) {
                            <div class="flex items-start gap-1">
                              <span
                                class="font-bold"
                                [class.text-emerald-600]="s3.isExtraTestAdmissible"
                                [class.text-rose-600]="!s3.isExtraTestAdmissible"
                              >
                                {{ s3.isExtraTestAdmissible ? "✓" : "✗" }}
                              </span>
                              <div>
                                <span class="font-semibold">{{ i18n.t('reo.testSelectionLabel', { name: s3.extraTestName }) }}</span>
                                <span
                                  [class.text-rose-700]="!s3.isExtraTestAdmissible"
                                  [class.text-emerald-700]="s3.isExtraTestAdmissible"
                                >
                                  {{
                                    s3.isExtraTestAdmissible
                                      ? i18n.t('reo.extraTestSuccess')
                                      : isExtraTestNotCompleted(s3.job.id)
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
                                [class.text-emerald-600]="s3.isMedicalAdmissible"
                                [class.text-rose-600]="!s3.isMedicalAdmissible"
                              >
                                {{ s3.isMedicalAdmissible ? "✓" : "✗" }}
                              </span>
                              <div>
                                <span class="font-semibold">{{ i18n.t('reo.medicalRatingLabel') }}</span>
                                <span
                                  [class.text-rose-700]="!s3.isMedicalAdmissible"
                                  [class.text-emerald-700]="s3.isMedicalAdmissible"
                                >
                                  {{
                                    s3.isMedicalAdmissible
                                      ? i18n.t('reo.medStandardConform')
                                      : (i18n.lang() === 'en' ? (s3.medicalReasonEn || s3.medicalReason) : s3.medicalReason)
                                  }}
                                </span>
                              </div>
                            </div>
                          }
                        </div>

                        <!-- SIP Status Warning -->
                        @if (s3.isJobClosed) {
                          <div
                            class="mt-2 p-1.5 rounded border flex items-start gap-1.5 font-semibold text-[10px] leading-tight"
                            [class]="s3.isClosedAdmissionOnly ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-red-100 text-red-800 border-red-200'"
                          >
                            <span>⚠</span>
                            <div>
                              @if (s3.isClosedAdmissionOnly) {
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
            </div>
          </div>

          <!-- Scolarité et Expérience -->
          @if (!isPforApplicant()) {
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
                          {{ i18n.t('province.' + p.id) || p.name }}
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
                  <!-- Premier cycle -->
                  <div>
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

                    <div class="ml-2 mb-2 border-t border-slate-100 pt-2">
                      <div
                        class="flex items-center gap-1 w-full px-1 py-1 group"
                      >
                        <button
                          (click)="toggleDomaine('genie')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="expandedDomaines().has('genie')"
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
                        *ngIf="expandedDomaines().has('genie')"
                        class="mt-1 pl-4"
                      >
                        <label
                          *ngFor="
                            let crit of criteriaUniversitaire1erCycleGenie()
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
                          (click)="toggleDomaine('sciences')"
                          class="focus:outline-none flex-shrink-0"
                        >
                          <svg
                            class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform"
                            [class.rotate-90]="
                              expandedDomaines().has('sciences')
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
                            class="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors pt-0.5"`;
