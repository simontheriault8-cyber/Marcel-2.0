export const APP_PREVIEW_MODALS_TEMPLATE = `
                                  }
                                </div>
                              }
                            </div>

                            <!-- Plaque IMM -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.plaqueImm') }}</label>
                              <input
                                type="text"
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                [placeholder]="i18n.t('offre.plaqueImmPlaceholder')"
                                [value]="notePlaqueImm()"
                                (input)="setNotePlaqueImm($any($event.target).value)"
                              />
                            </div>

                              <!-- Bris de bail -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.brisBail') }}</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteBrisBail()"
                                (change)="setNoteBrisBail($any($event.target).value)"
                              >
                                @for (opt of brisBailOptions; track opt) {
                                  <option [value]="opt">{{ getBrisBailLabel(opt) }}</option>
                                }
                              </select>
                            </div>

                            <!-- Entreposage -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.entreposage') }}</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteEntreposage()"
                                (change)="setNoteEntreposage($any($event.target).value)"
                              >
                                @for (opt of entreposageOptions; track opt) {
                                  <option [value]="opt">{{ getEntreposageLabel(opt) }}</option>
                                }
                              </select>
                            </div>

                            <!-- Serment / Déclaration -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.sermentDeclaration') }}</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteSermentDeclaration()"
                                (change)="setNoteSermentDeclaration($any($event.target).value)"
                              >
                                @for (opt of sermentDeclarationOptions; track opt) {
                                  <option [value]="opt">{{ getSermentDeclarationLabel(opt) }}</option>
                                }
                              </select>
                            </div>

                            <!-- Invité mil -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.inviteMil') }}</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteInviteMil()"
                                (change)="setNoteInviteMil($any($event.target).value)"
                              >
                                @for (opt of ouiNonOptions; track opt) {
                                  <option [value]="opt">{{ getOuiNonLabel(opt) }}</option>
                                }
                              </select>
                              @if (noteInviteMil() === 'oui') {
                                <input
                                  type="text"
                                  class="w-full p-2 mt-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                  [placeholder]="i18n.t('offre.inviteMilPlaceholder')"
                                  [value]="noteInviteMilTexte()"
                                  (input)="setNoteInviteMilTexte($any($event.target).value)"
                                />
                              }
                            </div>

                            <!-- Svc Mil ant -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.svcMilAnt') }}</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteSvcMilAnt()"
                                (change)="setNoteSvcMilAnt($any($event.target).value)"
                              >
                                @for (opt of svcMilAntOptions; track opt) {
                                  <option [value]="opt">{{ getSvcMilAntLabel(opt) }}</option>
                                }
                              </select>
                            </div>

                            <!-- Bénéficiaire -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.beneficiaire') }}</label>
                              <input
                                type="text"
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                [placeholder]="i18n.t('offre.beneficiairePlaceholder')"
                                [value]="noteBeneficiaire()"
                                (input)="setNoteBeneficiaire($any($event.target).value)"
                              />
                            </div>

                            <!-- Date courriel de confirmation -->
                            <div>
                              <app-calendar-picker
                                [label]="i18n.t('offre.dateCourrielConfirmation')"
                                [value]="getEffectiveNoteDateCourrielConfirmation()"
                                [placeholder]="i18n.t('common.selectDate')"
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
                          <span>{{ i18n.t('ceremonie.infoTitle', { taskName: i18n.lang() === 'en' ? task.nameEn : task.nameFr }) }}</span>
                        </div>
                      </div>
                      <div class="p-4 bg-white space-y-3 rounded-b-xl">
                        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <div class="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">{{ i18n.t('ceremonie.emailGenTitle') }}</div>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <label class="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="rappelCeremonieChecked()"
                                (change)="toggleRappelCeremonie()"
                                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">{{ i18n.t('ceremonie.genEmail') }}</span>
                            </label>
                            <label class="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="rappelCeremonieRalliementChecked()"
                                (change)="toggleRappelCeremonieRalliement()"
                                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">{{ i18n.t('ceremonie.instructionRalliement') }}</span>
                            </label>
                          </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <app-calendar-picker
                              [label]="i18n.t('ceremonie.date')"
                              [value]="rappelCeremonieDate()"
                              [placeholder]="i18n.t('common.selectDate')"
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
                                <span>{{ i18n.t('ceremonie.heurePostulant') }}</span>
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
                                <span>{{ i18n.t('ceremonie.heureInvites') }}</span>
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
                            <label class="block font-semibold text-slate-700 mb-1 text-xs">{{ i18n.t('ceremonie.centreRecrutement') }}</label>
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
                          <span class="font-bold">{{ i18n.t('taskWorkspace.jobsInFile') }}</span>
                          <span class="ml-1 font-medium">{{ i18n.lang() === 'en' ? getDossierJobsSummaryTextEn() : getDossierJobsSummaryTextFr() }}</span>
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
                            <span>{{ i18n.t('taskWorkspace.additionalDocsSituation') }}</span>
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
                                        <strong class="font-bold text-slate-800">{{ i18n.lang() === 'en' ? doc.nameEn : doc.nameFr }} :</strong> {{ i18n.lang() === 'en' ? (reason.labelEn || reason.labelFr) : reason.labelFr }}
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
                            <span>{{ i18n.t('taskWorkspace.subsidizedStudies') }}</span>
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
                                        <strong class="font-bold text-slate-800">{{ i18n.lang() === 'en' ? doc.nameEn : doc.nameFr }} :</strong> {{ i18n.lang() === 'en' ? (reason.labelEn || reason.labelFr) : reason.labelFr }}
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
                            <span>{{ i18n.t('taskWorkspace.additionalDocsJobs') }}</span>
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
                            {{ i18n.t('taskWorkspace.compliantStatus') }}
                          </button>
                        </div>

                        <div class="p-3 bg-white space-y-3 rounded-b-xl">
                          @for (job of getDossierJobObjects(); track job.id) {
                            @if (hasJobAdditionalDocs(task, job)) {
                              <div class="space-y-1 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80">
                                <div class="text-xs font-bold text-slate-800 pb-1.5 px-0.5 flex items-center gap-2 border-b border-slate-200/80 mb-1.5">
                                  <span class="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                                  <span>{{ i18n.t('taskWorkspace.forTrade', { trade: job.id + ' - ' + job.title }) }}</span>
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
                                              <strong class="font-bold text-slate-800">{{ i18n.lang() === 'en' ? doc.nameEn : doc.nameFr }} :</strong> {{ getJobSpecificDocText(job.id, doc.nameFr, i18n.lang() === 'fr') }}
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
                        <p class="font-semibold text-sm text-slate-700">{{ i18n.t('taskWorkspace.noDocsForTask') }}</p>
                        <p class="text-xs text-slate-400 mt-1">{{ i18n.t('taskWorkspace.noDocsForTaskDesc') }}</p>
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
                                {{ i18n.t('taskWorkspace.birthCertLong') }}
                              } @else {
                                {{ i18n.lang() === 'en' ? doc.nameEn : doc.nameFr }}
                              }
                            </div>
                            <div
                              class="text-[10px] text-slate-500 leading-tight truncate"
                            >
                              {{ i18n.lang() === 'en' ? doc.nameFr : doc.nameEn }}
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
                              {{ i18n.t('taskWorkspace.compliantStatus') }}
                            </button>
                          }
                        </div>

                        <!-- Rejection Reasons List -->
                        <div class="p-3 bg-white space-y-1">
                          @if (hasNormalReasons(doc)) {
                            <div
                              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1"
                            >
                              {{ i18n.t('taskWorkspace.rejectionReasonsTitle') }}
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
                                    >{{ i18n.lang() === 'en' ? (reason.labelEn || reason.labelFr) : reason.labelFr }}</span
                                  >
                                </label>
                              }
                            }
                          }

                          @if (hasAdditionalDocReasons(doc)) {
                            <div
                              class="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 ml-1 mt-4"
                            >
                              {{ i18n.t('taskWorkspace.additionalDocsTitle') }}
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
                                    >{{ i18n.lang() === 'en' ? (reason.labelEn || reason.labelFr) : reason.labelFr }}</span
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
                  <p class="text-sm font-medium">{{ i18n.t('taskWorkspace.selectOptionToView') }}</p>
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
                      {{ i18n.t('sgt.instructionsTitle') }}
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
                          ✓ {{ completedCount }}/{{ currentInstructions.length }} {{ i18n.t('sgt.completed') }}
                        } @else {
                          {{ completedCount }}/{{ currentInstructions.length }} {{ i18n.t('sgt.completed') }}
                        }
                      </span>
                      <button
                        type="button"
                        (click)="toggleAllSgtInstructions(currentInstructions)"
                        class="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 rounded hover:bg-indigo-50 transition-colors cursor-pointer"
                        [title]="i18n.t('sgt.checkAllTitle')"
                      >
                        {{ isAllDone ? i18n.t('sgt.uncheckAll') : i18n.t('sgt.checkAll') }}
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
                          <span class="text-xs font-semibold mr-1.5 opacity-60">{{ idx + 1 }}.</span>{{ (i18n.currentLang() === 'en' ? (item.textEn || item.text) : item.text) }}
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
                      {{ i18n.t('pforEmails.caf101Header') }}
                    </h3>

                    <button
                      (click)="exportToOutlookCaf101()"
                      class="text-xs text-white px-3 py-1 rounded shadow-sm font-medium transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      [class.bg-slate-800]="!copiedEmailCaf101()"
                      [class.hover:bg-slate-700]="!copiedEmailCaf101()"
                      [class.bg-green-600]="copiedEmailCaf101()"
                    >
                      @if (copiedEmailCaf101()) {
                        <span>{{ i18n.t('common.copied') }}</span>
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
                        <span>{{ i18n.t('pforEmails.caf101Export') }}</span>
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
                      {{ i18n.t('pforEmails.lienPaHeader') }}
                    </h3>

                    <button
                      (click)="exportToOutlookLienPa()"
                      class="text-xs text-white px-3 py-1 rounded shadow-sm font-medium transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      [class.bg-indigo-600]="!copiedEmailLienPa()"
                      [class.hover:bg-indigo-700]="!copiedEmailLienPa()"
                      [class.bg-green-600]="copiedEmailLienPa()"
                    >
                      @if (copiedEmailLienPa()) {
                        <span>{{ i18n.t('common.copied') }}</span>
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
                        <span>{{ i18n.t('pforEmails.lienPaExport') }}</span>
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
                      {{ i18n.t('preview.emailToApplicant') }}
                      @if (sharedState.includeLinkedEmail() && sharedState.reoMergedEmailHtml()) {
                        <span class="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-xs flex items-center gap-1.5 font-sans normal-case tracking-normal">
                          <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                          {{ i18n.t('preview.mergedWithReo') }}
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
                {{ i18n.t('preview.gdEmailAndNote') }}
              </h2>

              <div class="flex items-center gap-3">
                @if (selectedEmailBankTemplate() === 'test_esom_confirmation') {
                  <div class="flex items-center gap-2 bg-indigo-50/70 border border-indigo-200 px-3 py-1 rounded-xl shadow-2xs">
                    <label class="text-xs font-bold text-indigo-900 flex items-center gap-1.5 whitespace-nowrap">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ i18n.t('preview.testLocation') }}
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

                @if (selectedEmailBankTemplate() === 'inapte_medical_omr') {
                  <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <!-- Genre du postulant -->
                    <div
                      class="flex items-center gap-1.5 bg-slate-50 border px-2.5 py-1 rounded-xl shadow-2xs transition-all"
                      [class.border-red-400]="inapteMedicalAttemptedExport() && !inapteMedicalGender()"
                      [class.bg-red-50]="inapteMedicalAttemptedExport() && !inapteMedicalGender()"
                      [class.ring-2]="inapteMedicalAttemptedExport() && !inapteMedicalGender()"
                      [class.ring-red-400]="inapteMedicalAttemptedExport() && !inapteMedicalGender()"
                      [class.border-slate-200]="!inapteMedicalAttemptedExport() || !!inapteMedicalGender()"
                    >
                      <label class="text-[11px] font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                        {{ i18n.t('preview.applicantGender') }} :
                      </label>
                      <select
                        [value]="inapteMedicalGender()"
                        (change)="setInapteMedicalGender($any($event.target).value)"
                        class="text-xs border rounded-lg px-2 py-0.5 bg-white font-semibold text-slate-800 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                        [class.border-red-300]="inapteMedicalAttemptedExport() && !inapteMedicalGender()"
                        [class.border-slate-300]="!inapteMedicalAttemptedExport() || !!inapteMedicalGender()"
                      >
                        <option value="">-- {{ i18n.t('preview.applicantGender') }} --</option>
                        <option value="F">{{ i18n.t('preview.genderFemale') }}</option>
                        <option value="M">{{ i18n.t('preview.genderMale') }}</option>
                      </select>
                    </div>

                    <!-- Nom du postulant -->
                    <div
                      class="flex items-center gap-1.5 bg-slate-50 border px-2.5 py-1 rounded-xl shadow-2xs transition-all"
                      [class.border-red-400]="inapteMedicalAttemptedExport() && !inapteMedicalName().trim()"
                      [class.bg-red-50]="inapteMedicalAttemptedExport() && !inapteMedicalName().trim()"
                      [class.ring-2]="inapteMedicalAttemptedExport() && !inapteMedicalName().trim()"
                      [class.ring-red-400]="inapteMedicalAttemptedExport() && !inapteMedicalName().trim()"
                      [class.border-slate-200]="!inapteMedicalAttemptedExport() || !!inapteMedicalName().trim()"
                    >
                      <label class="text-[11px] font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                        {{ i18n.t('preview.applicantName') }} :
                      </label>
                      <input
                        type="text"
                        [value]="inapteMedicalName()"
                        (input)="setInapteMedicalName($any($event.target).value)"
                        [placeholder]="i18n.t('preview.applicantNamePlaceholder')"
                        class="text-xs border rounded-lg px-2.5 py-0.5 bg-white font-medium text-slate-800 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none w-44 transition-all"
                        [class.border-red-300]="inapteMedicalAttemptedExport() && !inapteMedicalName().trim()"
                        [class.border-slate-300]="!inapteMedicalAttemptedExport() || !!inapteMedicalName().trim()"
                      />
                    </div>

                    <!-- Alpha du postulant -->
                    <div
                      class="flex items-center gap-1.5 bg-slate-50 border px-2.5 py-1 rounded-xl shadow-2xs transition-all"
                      [class.border-red-400]="inapteMedicalAttemptedExport() && !inapteMedicalAlpha().trim()"
                      [class.bg-red-50]="inapteMedicalAttemptedExport() && !inapteMedicalAlpha().trim()"
                      [class.ring-2]="inapteMedicalAttemptedExport() && !inapteMedicalAlpha().trim()"
                      [class.ring-red-400]="inapteMedicalAttemptedExport() && !inapteMedicalAlpha().trim()"
                      [class.border-slate-200]="!inapteMedicalAttemptedExport() || !!inapteMedicalAlpha().trim()"
                    >
                      <label class="text-[11px] font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                        {{ i18n.t('preview.applicantAlpha') }} :
                      </label>
                      <input
                        type="text"
                        [value]="inapteMedicalAlpha()"
                        (input)="setInapteMedicalAlpha($any($event.target).value)"
                        [placeholder]="i18n.t('preview.applicantAlphaPlaceholder')"
                        class="text-xs border rounded-lg px-2.5 py-0.5 bg-white font-mono font-medium text-slate-800 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none w-28 uppercase transition-all"
                        [class.border-red-300]="inapteMedicalAttemptedExport() && !inapteMedicalAlpha().trim()"
                        [class.border-slate-300]="!inapteMedicalAttemptedExport() || !!inapteMedicalAlpha().trim()"
                      />
                    </div>
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
                    <span class="text-green-700">{{ i18n.t('preview.noteCopied') }}</span>
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{{ i18n.t('preview.copyNote') }}</span>
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
                    {{ i18n.t('preview.copiedOpeningOutlook') }}
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {{ i18n.t('preview.exportToOutlook') }}
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
                  <span>{{ i18n.t('preview.checkGdOptionsPrompt') }}</span>
                </div>
              } @else {
                <!-- Alerte si champs obligatoires inaptitude médicale OMR manquants lors de la tentative d'exportation -->
                @if (selectedEmailBankTemplate() === 'inapte_medical_omr' && inapteMedicalAttemptedExport() && (!inapteMedicalGender() || !inapteMedicalName().trim() || !inapteMedicalAlpha().trim())) {
                  <div class="bg-red-50 border-2 border-red-400 rounded-xl p-3.5 shadow-sm flex items-center gap-3 text-red-800 text-xs font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{{ i18n.t('preview.fieldsRequiredPrompt') }}</span>
                  </div>
                }

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
                          {{ i18n.t('preview.gdInstructionsTitle') }}
                        </h4>
                        <ul class="text-xs text-amber-900/90 space-y-1 font-medium list-disc list-inside">
                          <li>{{ i18n.t('preview.navTanInstruction1') }}</li>
                          <li>{{ i18n.t('preview.navTanInstruction2') }}</li>
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
                          {{ i18n.t('preview.gdInstructionsTitle') }}
                        </h4>
                        <ul class="text-xs text-amber-900/90 space-y-1 font-medium list-disc list-inside">
                          <li>{{ i18n.t('preview.esomInstruction1') }}</li>
                          <li>{{ i18n.t('preview.esomInstruction2') }}</li>
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
                      <h3 class="font-bold text-slate-700 text-xs uppercase tracking-wider">{{ i18n.t('preview.registryNoteTitle') }}</h3>
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
                          {{ i18n.t('preview.emailRecipientCrfcQc') }}
                        } @else if (selectedEmailBankTemplate() === 'verification_dossier_cadet') {
                          {{ i18n.t('preview.emailRecipientCadet') }}
                        } @else if (selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire') {
                          {{ i18n.t('preview.emailRecipientSdpm') }}
                        } @else if (selectedEmailBankTemplate() === 'demande_autorisation_cspn') {
                          {{ i18n.t('preview.emailDemandeAutorisationCspn') }}
                        } @else {
                          {{ i18n.t('preview.emailApplicantBilingual') }}
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
  }

    <!-- Job Search Modal (always rendered, hidden when not shown) -->
    <app-job-search-modal
      [class.hidden]="!showJobSearch()"
      [showReorientationTab]="true"
      (closeModal)="showJobSearch.set(false)"
    ></app-job-search-modal>
    }
`;
