export const APP_TASKS_FORMS_TEMPLATE = `
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <!-- Grouped Tasks -->
                  @if (!isGroupCollapsed(group.id)) {
                    <div class="space-y-1 mt-1">
                      @if (group.tasks.length === 0) {
                        <div class="px-3 py-2 text-center text-[11px] text-slate-400 italic">
                          {{ i18n.t('tasks.noSubTask') }}
                        </div>
                      }
                      @for (task of group.tasks; track task.nameFr) {
                        <button
                          (click)="selectTask(task)"
                          class="w-full text-left p-2.5 rounded-lg transition-all duration-200 border border-transparent group relative overflow-hidden flex justify-between items-center"
                          [class.bg-slate-800]="selectedTask() === task"
                          [class.text-white]="selectedTask() === task"
                          [class.shadow-md]="selectedTask() === task"
                          [class.hover:bg-slate-200/80]="selectedTask() !== task"
                          [class.bg-white]="selectedTask() !== task"
                        >
                          <div class="font-semibold text-xs pr-2 leading-snug">
                            {{ i18n.lang() === 'en' ? task.nameEn : task.nameFr }}
                          </div>

                          <div class="flex items-center gap-1.5 shrink-0">
                            @if (!task.nameFr.includes("Documents Supplémentaires") && !task.nameFr.includes("Courriel d'offre") && !task.nameFr.includes("Offre") && task.section !== "Courriel d'offre" && task.section !== "Suivi de dossier" && task.section !== "Réception d'un postulant" && task.section !== "Retour PSPS") {
                              @if (isTaskCompliant(task)) {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-4 w-4 text-green-500 shrink-0"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              } @else if (hasTaskRejections(task)) {
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-4 w-4 text-red-500 shrink-0"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              }
                            }
                            @if (selectedTask() === task) {
                              <div class="w-1.5 h-1.5 rounded-full bg-white shrink-0"></div>
                            }
                          </div>
                        </button>
                      }
                    </div>
                  }
                </div>
              }

              <!-- Additional Tasks (Documents Supplémentaires, Courriel d'offre, etc.) separated by line -->
              @for (task of groupedVisibleTasks().additionalTasks; track task.nameFr) {
                <hr class="my-3 border-t-2 border-slate-300" />
                <button
                  (click)="selectTask(task)"
                  class="w-full text-left p-3 rounded-xl transition-all duration-200 border border-transparent group relative overflow-hidden flex justify-between items-center"
                  [class.bg-slate-800]="selectedTask() === task"
                  [class.text-white]="selectedTask() === task"
                  [class.shadow-md]="selectedTask() === task"
                  [class.hover:bg-slate-200/80]="selectedTask() !== task"
                  [class.bg-white]="selectedTask() !== task"
                >
                  <div class="font-semibold text-xs pr-2 leading-snug">
                    {{ i18n.lang() === 'en' ? task.nameEn : task.nameFr }}
                  </div>
                  <div class="flex items-center gap-1.5 shrink-0">
                    @if (task.nameFr.includes("Documents Supplémentaires")) {
                      @if (isTaskCompliant(task)) {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-green-500 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      } @else if (hasTaskRejections(task)) {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-red-500 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      }
                    }
                    @if (selectedTask() === task) {
                      <div class="w-1.5 h-1.5 rounded-full bg-white shrink-0"></div>
                    }
                  </div>
                </button>
              }
            </div>
          </nav>

          <!-- Panel 2: Documents & Verification Workspace -->
          <section
            class="flex-1 bg-slate-50 rounded-2xl shadow-xl flex flex-col border border-white/50 h-fit min-h-[300px]"
          >
            <div
              class="p-4 bg-white border-b border-slate-200 flex-none z-10 shadow-sm rounded-t-2xl"
            >
              <h2
                class="font-bold text-slate-700 uppercase text-sm tracking-wider flex items-center gap-2"
              >
                @if (selectedRole() === 'gestionnaire') {
                  {{ i18n.t('taskWorkspace.headerFileManager') }}
                } @else {
                  {{ i18n.t('taskWorkspace.headerRecruiter') }}
                }
              </h2>
            </div>

            <div class="p-4 scroll-smooth">
              @if (selectedTask(); as task) {
                <div class="mb-6 flex justify-between items-start">
                  <div>
                    <h3
                      class="text-xl font-bold text-slate-800 mb-1 leading-tight flex items-center gap-2"
                    >
                      {{ i18n.lang() === 'en' ? task.nameEn : task.nameFr }}
                    </h3>
                    <p class="text-xs text-slate-500 font-medium">
                      {{ i18n.lang() === 'en' ? task.nameFr : task.nameEn }}
                    </p>
                  </div>
                  <div class="flex items-center gap-3">
                    @if (task.nameFr === "Premier contact") {
                      <div class="inline-flex p-1 bg-slate-200/80 rounded-xl border border-slate-300 shadow-inner">
                        <button
                          type="button"
                          (click)="premierContactSubPanelMode.set('courriel')"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          [class.bg-white]="premierContactSubPanelMode() === 'courriel'"
                          [class.text-blue-700]="premierContactSubPanelMode() === 'courriel'"
                          [class.shadow-xs]="premierContactSubPanelMode() === 'courriel'"
                          [class.text-slate-600]="premierContactSubPanelMode() !== 'courriel'"
                          [class.hover:text-slate-900]="premierContactSubPanelMode() !== 'courriel'"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{{ i18n.t('tasks.modeCourriel') }}</span>
                        </button>
                        <button
                          type="button"
                          (click)="premierContactSubPanelMode.set('note')"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          [class.bg-white]="premierContactSubPanelMode() === 'note'"
                          [class.text-indigo-700]="premierContactSubPanelMode() === 'note'"
                          [class.shadow-xs]="premierContactSubPanelMode() === 'note'"
                          [class.text-slate-600]="premierContactSubPanelMode() !== 'note'"
                          [class.hover:text-slate-900]="premierContactSubPanelMode() !== 'note'"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{{ i18n.t('tasks.modeNote') }}</span>
                        </button>
                      </div>
                    }

                    @if (task.nameFr.includes("Offre") || task.nameFr.includes("Courriel d'offre") || task.section === "Courriel d'offre") {
                      <div class="inline-flex p-1 bg-slate-200/80 rounded-xl border border-slate-300 shadow-inner">
                        <button
                          type="button"
                          (click)="offreSubPanelMode.set('courriel')"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          [class.bg-white]="offreSubPanelMode() === 'courriel'"
                          [class.text-blue-700]="offreSubPanelMode() === 'courriel'"
                          [class.shadow-xs]="offreSubPanelMode() === 'courriel'"
                          [class.text-slate-600]="offreSubPanelMode() !== 'courriel'"
                          [class.hover:text-slate-900]="offreSubPanelMode() !== 'courriel'"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{{ i18n.t('tasks.modeCourriel') }}</span>
                        </button>
                        <button
                          type="button"
                          (click)="offreSubPanelMode.set('note')"
                          class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          [class.bg-white]="offreSubPanelMode() === 'note'"
                          [class.text-indigo-700]="offreSubPanelMode() === 'note'"
                          [class.shadow-xs]="offreSubPanelMode() === 'note'"
                          [class.text-slate-600]="offreSubPanelMode() !== 'note'"
                          [class.hover:text-slate-900]="offreSubPanelMode() !== 'note'"
                        >
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{{ i18n.t('tasks.modeNote') }}</span>
                        </button>
                      </div>
                    }

                    @if (task.nameFr.startsWith("Questionnaire médical")) {
                      <label
                        class="flex items-center gap-2 p-2 px-3 rounded-lg border border-amber-200 bg-amber-50/70 hover:bg-amber-50 cursor-pointer text-xs font-bold text-amber-900 transition-all active:scale-95"
                      >
                        <span class="relative flex items-center">
                          <input
                            type="checkbox"
                            class="peer h-4 w-4 appearance-none rounded border-2 border-amber-300 bg-white checked:bg-amber-600 checked:border-amber-600 focus:outline-none transition-all"
                            [checked]="triageMedicalRequis()"
                            (change)="toggleTriageMedical()"
                          />
                          <svg
                            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
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
                        </span>
                        <span>{{ i18n.t('tasks.triageMedicalRequis') }}</span>
                      </label>
                    }

                    @if (selectedRole() !== 'gestionnaire' && !task.nameFr.includes("Documents Supplémentaires") && !task.nameFr.includes("Courriel d'offre")) {
                      <button
                        (click)="toggleTaskNotCompleted(task)"
                        class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm active:scale-95 whitespace-nowrap"
                        [class.bg-red-100]="isTaskNotCompleted(task)"
                        [class.border-red-300]="isTaskNotCompleted(task)"
                        [class.text-red-800]="isTaskNotCompleted(task)"
                        [class.bg-white]="!isTaskNotCompleted(task)"
                        [class.text-slate-500]="!isTaskNotCompleted(task)"
                        [class.hover:bg-slate-100]="!isTaskNotCompleted(task)"
                        [class.border-slate-300]="!isTaskNotCompleted(task)"
                      >
                        {{ i18n.t('tasks.taskNotCompletedBtn') }}
                      </button>
                    }
                  </div>
                </div>

                <div class="space-y-4">
                  @if (isTaskNotCompleted(task)) {
                    <div
                      class="p-8 text-center bg-amber-50/50 border border-amber-200 rounded-xl text-amber-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-10 w-10 mx-auto mb-2 text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <p class="font-bold text-sm">
                        {{ i18n.t('tasks.taskNotCompletedTitle') }}
                      </p>
                      <p
                        class="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed"
                      >
                        {{ i18n.t('tasks.taskNotCompletedDesc') }}
                      </p>
                    </div>
                  }

                  @if (task.nameFr === "Évaluation médicale") {
                    <!-- Sub-panel for Évaluation médicale -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{{ i18n.t('medEval.title', { type: evaluationMedicaleType() === 'Dossier OTA' ? 'OTA' : 'Local' }) }}</span>
                        </div>
                      </div>

                      <div class="p-4 space-y-4 rounded-b-xl">
                        <!-- Checkboxes for Medical Evaluation Options -->
                        <div>
                          <label class="block text-xs font-bold text-slate-700 mb-2">
                            {{ i18n.t('medEval.optionsTitle') }}
                          </label>
                          <div class="space-y-2 text-xs">
                            <label class="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="evaluationMedicalePartie1()"
                                (change)="toggleEvaluationMedicalePartie1()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span class="font-medium text-slate-700">{{ i18n.t('medEval.part1') }}</span>
                            </label>

                            <label class="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="evaluationMedicalePartie2()"
                                (change)="toggleEvaluationMedicalePartie2()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span class="font-medium text-slate-700">{{ i18n.t('medEval.part2') }}</span>
                            </label>

                            <label class="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="evaluationMedicalePartie1Et2()"
                                (change)="toggleEvaluationMedicalePartie1Et2()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span class="font-medium text-slate-700">{{ i18n.t('medEval.part1And2') }}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  } @else if (task.nameFr === "Premier contact") {
                    <!-- Premier contact workspace panel -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          @if (premierContactSubPanelMode() === 'courriel') {
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{{ i18n.t('premierContact.subPanelEmail') }}</span>
                          } @else {
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>{{ i18n.t('premierContact.subPanelNote') }}</span>
                          }
                        </div>
                      </div>

                      @if (premierContactSubPanelMode() === 'courriel') {
                        <div class="p-4 space-y-4 rounded-b-xl">
                          <div>
                            <label class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="premierContactCourriel()"
                                (change)="togglePremierContactCourriel()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">{{ i18n.t('premierContact.emailCheckbox') }}</span>
                            </label>
                          </div>

                          <div class="pt-3 border-t border-slate-100">
                            <label class="block text-xs font-bold text-slate-700 mb-1">
                              {{ i18n.t('premierContact.tasksToCompleteDesc') }}
                            </label>
                            <p class="text-[11px] text-slate-500 mb-3">
                              {{ i18n.t('premierContact.tasksToCompleteSub') }}
                            </p>

                            <div class="space-y-2 text-xs">
                              <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                                <input
                                  type="checkbox"
                                  [checked]="premierContactMedical()"
                                  (change)="togglePremierContactTask('medical')"
                                  class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div>
                                  <span class="font-semibold text-slate-800">{{ i18n.t('premierContact.lblMedical') }}</span>
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">
                                     {{ evaluationMedicaleType() === 'Dossier OTA' ? (i18n.lang() === 'en' ? 'Appointment scheduled at Montreal recruitment center' : 'Rendez-vous fixé au centre de recrutement de Montréal') : (i18n.lang() === 'en' ? 'Schedule your medical evaluation' : 'Planifiez votre évaluation médicale') }}
                                  </p>
                                </div>
                              </label>

                              <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                                <input
                                  type="checkbox"
                                  [checked]="premierContactEntrevue()"
                                  (change)="togglePremierContactTask('entrevue')"
                                  class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div>
                                  <span class="font-semibold text-slate-800">{{ i18n.t('premierContact.lblEntrevue') }}</span>
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">{{ i18n.lang() === 'en' ? 'Schedule your interview' : 'Planifiez votre entrevue' }}</p>
                                </div>
                              </label>

                              <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                                <input
                                  type="checkbox"
                                  [checked]="premierContactGambit()"
                                  (change)="togglePremierContactTask('gambit')"
                                  class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div>
                                  <span class="font-semibold text-slate-800">{{ i18n.t('premierContact.lblGambit') }}</span>
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">{{ i18n.lang() === 'en' ? "References, employment and education background (Gambit)" : "Références, antécédents d'emploi et d'études (Gambit)" }}</p>
                                </div>
                              </label>

                              <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                                <input
                                  type="checkbox"
                                  [checked]="premierContactPsps()"
                                  (change)="togglePremierContactTask('psps')"
                                  class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div>
                                  <span class="font-semibold text-slate-800">{{ i18n.t('premierContact.lblPsps') }}</span>
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">{{ i18n.lang() === 'en' ? "Criminal record and credit check (PSPS / this task is not in your portal, you will receive an email from app@gambitid.com)" : "Vérification du casier judiciaire et du dossier de crédit (PSPS/cette tâche n'est pas dans votre portail, vous recevrez un courriel envoyé par app@gambitid.com)" }}</p>
                                </div>
                              </label>

                              <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                                <input
                                  type="checkbox"
                                  [checked]="premierContactSelfie()"
                                  (change)="togglePremierContactTask('selfie')"
                                  class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div>
                                  <span class="font-semibold text-slate-800">{{ i18n.t('premierContact.lblSelfie') }}</span>
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">{{ i18n.lang() === 'en' ? "Selfie with ID (Task: Photo ID issued by Canadian government)" : "Égoportrait (selfie) avec pièce d'identité (Tâche : Pièce d'identité avec photo émise par le gouvernement canadien)" }}</p>
                                </div>
                              </label>

                              <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                                <input
                                  type="checkbox"
                                  [checked]="premierContactIptad()"
                                  (change)="togglePremierContactTask('iptad')"
                                  class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div>
                                  <span class="font-semibold text-slate-800">{{ i18n.t('premierContact.lblIptad') }}</span>
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">{{ i18n.lang() === 'en' ? "Personality assessment (Self-descriptive personality inventory)" : "Évaluation de la personnalité (Inventaire de personnalité des traits auto-descriptifs)" }}</p>
                                </div>
                              </label>

                              <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                                <input
                                  type="checkbox"
                                  [checked]="premierContactSeaf()"
                                  (change)="togglePremierContactTask('seaf')"
                                  class="h-4 w-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div>
                                  <span class="font-semibold text-slate-800">{{ i18n.t('premierContact.lblSeaf') }}</span>
                                  <p class="text-[11px] text-slate-500 mt-0.5 font-sans italic text-slate-600">{{ i18n.lang() === 'en' ? "Scored employment application form" : "Formulaire de demande d'emploi notée" }}</p>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      } @else {
                        <!-- Premier contact Note Sub-Panel -->
                        <div class="p-4 space-y-4 rounded-b-xl">
                          <div class="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-900 mb-2">
                            {{ i18n.t('premierContact.noteDesc') }}
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <!-- IPTAD -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">IPTAD :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteIptad()"
                                (change)="premierContactNoteIptad.set($any($event.target).value)"
                              >
                                @for (opt of premierContactIptadOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- SEAF -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">SEAF :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteSeaf()"
                                (change)="premierContactNoteSeaf.set($any($event.target).value)"
                              >
                                @for (opt of premierContactSeafOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Entrevue -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('premierContact.lblEntrevue') }} :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteEntrevue()"
                                (change)="premierContactNoteEntrevue.set($any($event.target).value)"
                              >
                                @for (opt of premierContactEntrevueOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Médical -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('premierContact.lblMedical') }} :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteMedical()"
                                (change)="premierContactNoteMedical.set($any($event.target).value)"
                              >
                                @for (opt of premierContactMedicalOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- PSPS -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">PSPS :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNotePsps()"
                                (change)="premierContactNotePsps.set($any($event.target).value)"
                              >
                                @for (opt of premierContactPspsOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- Gambit -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Gambit :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteGambit()"
                                (change)="premierContactNoteGambit.set($any($event.target).value)"
                              >
                                @for (opt of premierContactGambitOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>

                            <!-- ANX Q -->
                            <div class="sm:col-span-2">
                              <label class="block font-semibold text-slate-700 mb-1">ANX Q :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
                                [value]="premierContactNoteAnxQ()"
                                (change)="premierContactNoteAnxQ.set($any($event.target).value)"
                              >
                                @for (opt of premierContactAnxQOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>
                          </div>
                        </div>
                      }
                    </div>

                  } @else if (task.nameFr === "Avis de fermeture" || task.section === "Suivi de dossier") {
                    <!-- Avis de fermeture workspace panel -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>{{ i18n.t('avisFermeture.title') }}</span>
                        </div>
                      </div>

                      <div class="p-4 space-y-4 rounded-b-xl">
                        <div>
                          <label class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                            <input
                              type="checkbox"
                              [checked]="avisFermetureCourriel()"
                              (change)="toggleAvisFermetureCourriel()"
                              class="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                            <span class="text-xs font-bold text-slate-800">{{ i18n.t('avisFermeture.generateEmail') }}</span>
                          </label>
                        </div>

                        <div class="pt-3 border-t border-slate-100">
                          <label class="block text-xs font-bold text-slate-700 mb-1">
                            {{ i18n.t('avisFermeture.delayDays') }}
                          </label>
                          <select
                            class="w-full sm:w-48 p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-semibold text-slate-800 cursor-pointer"
                            [value]="avisFermetureDelaiJours()"
                            (change)="onAvisFermetureDelaiChange($any($event.target).value)"
                          >
                            <option value="3">3 {{ i18n.lang() === 'en' ? 'days' : 'jours' }}</option>
                            <option value="5">5 {{ i18n.lang() === 'en' ? 'days' : 'jours' }}</option>
                            <option value="7">7 {{ i18n.lang() === 'en' ? 'days' : 'jours' }}</option>
                            <option value="14">14 {{ i18n.lang() === 'en' ? 'days' : 'jours' }}</option>
                            <option value="autre">{{ i18n.lang() === 'en' ? 'Other' : 'Autre' }}</option>
                          </select>

                          @if (avisFermetureDelaiJours() === 'autre') {
                            <div class="mt-3 max-w-xs">
                              <app-calendar-picker
                                [label]="i18n.t('avisFermeture.deadline')"
                                [value]="avisFermetureDate()"
                                [placeholder]="i18n.t('common.selectDate')"
                                (dateSelected)="onAvisFermetureDateChange($event)"
                                (cleared)="onAvisFermetureDateChange('')"
                              ></app-calendar-picker>
                            </div>
                          }
                        </div>

                        <div class="pt-3 border-t border-slate-100">
                          <label class="block text-xs font-bold text-slate-700 mb-1">
                            {{ i18n.t('avisFermeture.tasksToComplete') }}
                          </label>
                          <p class="text-[11px] text-slate-500 mb-3">
                            {{ i18n.t('avisFermeture.tasksDesc') }}
                          </p>

                          <div class="space-y-2 text-xs">
                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="avisFermetureEntrevue()"
                                (change)="toggleAvisFermetureTask('entrevue')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">{{ i18n.lang() === 'en' ? 'Schedule your interview' : 'Planifiez votre entrevue' }}</span>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="avisFermetureMedicale()"
                                (change)="toggleAvisFermetureTask('medicale')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">{{ i18n.lang() === 'en' ? 'Schedule your medical evaluation' : 'Planifiez votre évaluation médicale' }}</span>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="avisFermetureGambit()"
                                (change)="toggleAvisFermetureTask('gambit')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">{{ i18n.lang() === 'en' ? "References, employment and education background (Gambit)" : "Références, antécédents d'emploi et d'études (Gambit)" }}</span>
                              </div>
                            </label>

                            <label class="flex items-start gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="avisFermeturePsps()"
                                (change)="toggleAvisFermetureTask('psps')"
                                class="h-4 w-4 mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                              <div>
                                <span class="font-semibold text-slate-800">{{ i18n.lang() === 'en' ? "Criminal record and credit check (PSPS)" : "Vérification du casier judiciaire et du dossier de crédit (PSPS)" }}</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                  } @else if (task.nameFr === "Annexe Q" || task.section === "Retour PSPS") {
                    <!-- Annexe Q workspace panel -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{{ i18n.t('annexeQ.title') }}</span>
                        </div>
                      </div>

                      <div class="p-4 space-y-4 rounded-b-xl">
                        <div>
                          <label class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors select-none">
                            <input
                              type="checkbox"
                              [checked]="annexeQCourriel()"
                              (change)="toggleAnnexeQCourriel()"
                              class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <span class="text-xs font-bold text-slate-800">{{ i18n.t('annexeQ.generateEmail') }}</span>
                          </label>
                        </div>

                        <div class="pt-3 border-t border-slate-100">
                          <label class="block text-xs font-bold text-slate-700 mb-1">
                            {{ i18n.t('annexeQ.applicantAlpha') }}
                          </label>
                          <input
                            type="text"
                            class="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-semibold text-slate-800"
                            [placeholder]="i18n.t('annexeQ.alphaPlaceholder')"
                            [value]="annexeQAlphaPostulant()"
                            (input)="onAnnexeQAlphaChange($any($event.target).value)"
                          />
                        </div>
                      </div>
                    </div>

                  } @else if (task.nameFr.includes("Offre") || task.nameFr.includes("Courriel d'offre") || task.section === "Courriel d'offre") {
                    <!-- Courriel & Note d'offre workspace panel -->
                    <div class="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                      @if (offreSubPanelMode() === 'courriel') {
                        <div class="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between rounded-t-xl">
                          <div class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>{{ i18n.t('offre.infoTitle', { taskName: i18n.lang() === 'en' ? task.nameEn : task.nameFr }) }}</span>
                          </div>
                        </div>

                      <div class="p-4 bg-white space-y-3 rounded-b-xl">
                        <!-- Case à cocher pour la génération de courriel d'offre -->
                        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <div class="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">{{ i18n.t('offre.emailGenTitle') }}</div>
                          @if (task.nameFr.toLowerCase().includes('subventionn')) {
                            <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="offreEtudesSubventionneesChecked()"
                                (change)="toggleOffreEtudesSubventionnees()"
                                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">{{ i18n.t('offre.genSubsidizedEmail') }}</span>
                            </label>
                          } @else {
                            <label class="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors select-none">
                              <input
                                type="checkbox"
                                [checked]="offreNormaleChecked()"
                                (change)="toggleOffreNormale()"
                                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span class="text-xs font-bold text-slate-800">
                                {{ i18n.t('offre.genNormalEmail') }}
                              </span>
                            </label>
                          }
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          @if (evaluationMedicaleType() === 'Dossier OTA') {
                            <!-- Dossier OTA : Formulaire simplifié et réordonné -->
                            <!-- 1. Date d'enrôlement et Heures d'arrivée (Arrivée postulant & Teams invité) -->
                            <div>
                              <app-calendar-picker
                                [label]="i18n.t('offre.dateEnrolement')"
                                [value]="offreDateEnrolement()"
                                [placeholder]="i18n.t('common.selectDate')"
                                (dateSelected)="setOffreDateEnrolement($event)"
                                (cleared)="setOffreDateEnrolement('')"
                              ></app-calendar-picker>
                              <p class="mt-1 text-[11px] text-slate-500">
                                {{ i18n.t('offre.dateEnrolementCourrielHint') }}<span class="font-semibold text-slate-700">{{ getOffreDateEnrolementFull(i18n.currentLang()) }}</span>
                              </p>
                            </div>

                            <div>
                              <label class="block font-semibold text-slate-700 mb-1 text-xs">{{ i18n.t('offre.heuresArrivee') }}</label>
                              <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  <div>
                                    <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span>{{ i18n.t('offre.arriveePostulant') }}</span>
                                    </label>
                                    <select
                                      class="w-full p-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer shadow-xs"
                                      [value]="offreHeureArriveePostulant()"
                                      (change)="onOffreHeurePostulantChange($any($event.target).value)"
                                    >
                                      @for (h of enrolmentHoursList; track h) {
                                        <option [value]="h" [selected]="h === offreHeureArriveePostulant()">{{ h }}</option>
                                      }
                                    </select>
                                  </div>

                                  <div>
                                    <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                      <span>{{ i18n.t('offre.teamsInvite') }}</span>
                                    </label>
                                    <select
                                      class="w-full p-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer shadow-xs"
                                      [value]="offreHeureArriveeInvites()"
                                      (change)="onOffreHeureInvitesChange($any($event.target).value)"
                                    >
                                      @for (h of enrolmentHoursList; track h) {
                                        <option [value]="h" [selected]="h === offreHeureArriveeInvites()">{{ h }}</option>
                                      }
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- 2. Unité d'affectation -->
                            <div>
                              <app-unit-picker
                                [selectedId]="offreUniteAffectation()"
                                (unitSelected)="setOffreUniteAffectationObj($event)"
                                (cleared)="setOffreUniteAffectation('')"
                              ></app-unit-picker>
                            </div>

                            <!-- 3. Date d'arrivée à votre unité -->
                            <div>
                              <app-calendar-picker
                                [label]="i18n.t('offre.dateArriveeUnite')"
                                [value]="offreDateArriveeUnite()"
                                [placeholder]="i18n.t('common.selectDate')"
                                (dateSelected)="setOffreDateArriveeUnite($event)"
                                (cleared)="setOffreDateArriveeUnite('')"
                              ></app-calendar-picker>
                              <p class="mt-1 text-[11px] text-slate-500">
                                @if (i18n.currentLang() === 'en') {
                                  In email: Arrival Date: You must report to {{ getUniteAffectationObj().nom }} on {{ getJourSemaineEn(offreDateArriveeUnite()) || i18n.t('offre.dayOfWeek') }} : {{ offreDateArriveeUnite() || i18n.t('offre.dayMonthYear') }} no later than 16:00.
                                } @else {
                                  Dans le courriel : Date d'arrivée : Vous devez vous présenter à {{ getUniteAffectationObj().nom }} le {{ getJourSemaineFr(offreDateArriveeUnite()) || i18n.t('offre.dayOfWeek') }} : {{ offreDateArriveeUnite() || i18n.t('offre.dayMonthYear') }} au plus tard à 16h00.
                                }
                              </p>
                            </div>

                            <!-- 4. Série du cours -->
                            <div class="md:col-span-2">
                              <app-course-series-picker
                                [serie]="offreSerieCours()"
                                [dateDebut]="offreDateCoursDebut()"
                                [dateFin]="offreDateCoursFin()"
                                (courseSelected)="setCourseSession($event)"
                                (cleared)="clearCourseSession()"
                              ></app-course-series-picker>
                            </div>

                          } @else {
                            <!-- Dossier Régulier : Formulaire complet existant -->
                            <!-- Ligne 1 : Métier / Programme d'enrôlement -->
                            <div class="relative">
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.metier') }}</label>
                              <div class="flex items-center border border-slate-300 rounded-lg bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-500 text-xs min-h-[34px] transition-all">
                                <input
                                  type="text"
                                  class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                                  [placeholder]="i18n.t('offre.searchJobPlaceholder')"
                                  [value]="offreMetierSearchQuery()"
                                  (input)="onOffreMetierQueryChange($any($event.target).value)"
                                  (focus)="offreMetierDropdownOpen.set(true)"
                                  (blur)="closeOffreMetierDropdownDelayed()"
                                />
                                @if (offreMetierSearchQuery()) {
                                  <button
                                    type="button"
                                    (click)="clearOffreMetier($event)"
                                    class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                                    [title]="i18n.t('offre.clearJob')"
                                  >
                                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                }
                              </div>

                              <!-- Dropdown List -->
                              @if (offreMetierDropdownOpen()) {
                                <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                                  @let filteredOffreJobs = getFilteredJobsForOffre();
                                  @if (filteredOffreJobs.length === 0) {
                                    <div class="p-2 text-slate-400 text-center italic">{{ i18n.t('offre.noJobFound') }}</div>
                                  }
                                  @for (job of filteredOffreJobs; track job.id) {
                                    <button
                                      type="button"
                                      (mousedown)="selectOffreMetier(job)"
                                      class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                                    >
                                      <span class="font-medium text-slate-800 truncate">{{ job.id }} - {{ i18n.currentLang() === 'en' ? (job.titleEn || job.title) : job.title }}</span>
                                      @if (job.element) {
                                        <span
                                          class="text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0"
                                          [class.bg-amber-100]="job.element === 'CMP'"
                                          [class.text-amber-800]="job.element === 'CMP'"
                                          [class.bg-emerald-100]="job.element === 'Armée'"
                                          [class.text-emerald-800]="job.element === 'Armée'"
                                          [class.bg-sky-100]="job.element === 'Air'"
                                          [class.text-sky-800]="job.element === 'Air'"
                                          [class.bg-indigo-100]="job.element === 'Marine'"
                                          [class.text-indigo-800]="job.element === 'Marine'"
                                        >
                                          {{ job.element }}
                                        </span>
                                      }
                                    </button>
                                  }
                                </div>
                              }
                            </div>

                            <div>
                              <div class="flex items-center justify-between mb-1">
                                <label class="block font-semibold text-slate-700 text-xs">{{ i18n.t('offre.programmeEnrolement') }}</label>
                                @if (offreJobType(); as jType) {
                                  <span
                                    class="text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all"
                                    [class.bg-purple-100]="jType === 'officier'"
                                    [class.text-purple-700]="jType === 'officier'"
                                    [class.bg-blue-100]="jType === 'mr'"
                                    [class.text-blue-700]="jType === 'mr'"
                                  >
                                    {{ jType === 'officier' ? i18n.t('offre.officers') : i18n.t('offre.ncms') }}
                                  </span>
                                }
                              </div>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="offreProgrammeEnrolement()"
                                (change)="setOffreProgrammeEnrolement($any($event.target).value)"
                              >
                                <option value="">{{ i18n.t('offre.selectProgramme') }}</option>
                                @for (prog of availableOffreProgrammes(); track prog) {
                                  <option [value]="prog">{{ prog }}</option>
                                }
                              </select>
                            </div>

                            <!-- Ligne 2 : Élément / Date d'enrôlement -->
                            <div>
                              <div class="flex items-center justify-between mb-1">
                                <label class="block font-semibold text-slate-700 text-xs">{{ i18n.t('offre.element') }}</label>
                                @if (offreDetectedElement(); as elem) {
                                  @if (elem === 'CMP') {
                                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                      {{ i18n.t('offre.cmpApplicantChoice') }}
                                    </span>
                                  } @else {
                                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                      {{ i18n.t('offre.autoDetected', { elem: elem }) }}
                                    </span>
                                  }
                                }
                              </div>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="offreElement()"
                                (change)="setOffreElement($any($event.target).value)"
                              >
                                <option value="">{{ i18n.t('offre.selectElement') }}</option>
                                <option value="Air">Air</option>
                                <option value="Armée">{{ i18n.lang() === 'en' ? 'Army' : 'Armée' }}</option>
                                <option value="Marine">{{ i18n.lang() === 'en' ? 'Navy' : 'Marine' }}</option>
                              </select>
                            </div>

                            <div>
                              <app-calendar-picker
                                [label]="i18n.t('offre.dateEnrolement')"
                                [value]="offreDateEnrolement()"
                                [placeholder]="i18n.t('common.selectDate')"
                                (dateSelected)="setOffreDateEnrolement($event)"
                                (cleared)="setOffreDateEnrolement('')"
                              ></app-calendar-picker>
                              <p class="mt-1 text-[11px] text-slate-500">
                                {{ i18n.t('offre.dateEnrolementCourrielHint') }}<span class="font-semibold text-slate-700">{{ getOffreDateEnrolementFull(i18n.currentLang()) }}</span>
                              </p>
                            </div>

                            @if (task.nameFr.toLowerCase().includes('subventionn') || offreEtudesSubventionneesChecked()) {
                              <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl">
                                <div>
                                  <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.dureeContrat') }}</label>
                                  <input
                                    type="text"
                                    class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all"
                                    [placeholder]="i18n.lang() === 'en' ? 'e.g. 5 years' : 'ex: 5 ans'"
                                    [value]="offreDureeContrat()"
                                    (input)="setOffreDureeContrat($any($event.target).value)"
                                  />
                                </div>

                                <div>
                                  <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.etudesSubventionnees') }}</label>
                                  <input
                                    type="text"
                                    class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all"
                                    [placeholder]="i18n.lang() === 'en' ? 'e.g. Bachelor' : 'ex: Baccalauréat'"
                                    [value]="offreEtudesSubventionnees()"
                                    (input)="setOffreEtudesSubventionnees($any($event.target).value)"
                                  />
                                </div>

                                <div>
                                  <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.dureeEtudes') }}</label>
                                  <select
                                    class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                    [value]="offreDureeEtudesSubventionnees()"
                                    (change)="setOffreDureeEtudesSubventionnees($any($event.target).value)"
                                  >
                                    <option value="">{{ i18n.t('offre.selectDuree') }}</option>
                                    <option value="1 an">1 {{ i18n.lang() === 'en' ? 'year' : 'an' }}</option>
                                    <option value="2 ans">2 {{ i18n.lang() === 'en' ? 'years' : 'ans' }}</option>
                                    <option value="3 ans">3 {{ i18n.lang() === 'en' ? 'years' : 'ans' }}</option>
                                    <option value="4 ans">4 {{ i18n.lang() === 'en' ? 'years' : 'ans' }}</option>
                                    <option value="5 ans">5 {{ i18n.lang() === 'en' ? 'years' : 'ans' }}</option>
                                  </select>
                                </div>
                              </div>
                            }

                            <!-- Ligne 3 : Date d'arrivée à l'unité d'affectation / Heures d'arrivée postulant et invité (toujours ouvert) -->
                            <div>
                              <app-calendar-picker
                                [label]="i18n.t('offre.dateArriveeUnite')"
                                [value]="offreDateArriveeUnite()"
                                [placeholder]="i18n.t('common.selectDate')"
                                (dateSelected)="setOffreDateArriveeUnite($event)"
                                (cleared)="setOffreDateArriveeUnite('')"
                              ></app-calendar-picker>
                              <p class="mt-1 text-[11px] text-slate-500">
                                {{ i18n.lang() === 'en' ? 'In email: Arrival Date: ' : 'Dans le courriel : Date d\'arrivée : ' }}<span class="font-semibold text-slate-700">{{ getOffreDateArriveeUniteFull() }}</span>
                              </p>
                            </div>

                            <div>
                              <label class="block font-semibold text-slate-700 mb-1 text-xs">{{ i18n.t('offre.heuresArriveeCeremonie') }}</label>
                              <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  <div>
                                    <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span>{{ i18n.t('offre.arriveePostulant') }}</span>
                                    </label>
                                    <select
                                      class="w-full p-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer shadow-xs"
                                      [value]="offreHeureArriveePostulant()"
                                      (change)="onOffreHeurePostulantChange($any($event.target).value)"
                                    >
                                      @for (h of enrolmentHoursList; track h) {
                                        <option [value]="h" [selected]="h === offreHeureArriveePostulant()">{{ h }}</option>
                                      }
                                    </select>
                                  </div>

                                  <div>
                                    <label class="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                      </svg>
                                      <span>{{ i18n.t('ceremonie.heureInvites') }}</span>
                                    </label>
                                    <select
                                      class="w-full p-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer shadow-xs"
                                      [value]="offreHeureArriveeInvites()"
                                      (change)="onOffreHeureInvitesChange($any($event.target).value)"
                                    >
                                      @for (h of enrolmentHoursList; track h) {
                                        <option [value]="h" [selected]="h === offreHeureArriveeInvites()">{{ h }}</option>
                                      }
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Ligne 4 : Unité d'affectation / Dates de cours -->
                            <div>
                              <app-unit-picker
                                [selectedId]="offreUniteAffectation()"
                                (unitSelected)="setOffreUniteAffectationObj($event)"
                                (cleared)="setOffreUniteAffectation('')"
                              ></app-unit-picker>
                            </div>

                            <div>
                              <app-course-series-picker
                                [serie]="offreSerieCours()"
                                [dateDebut]="offreDateCoursDebut()"
                                [dateFin]="offreDateCoursFin()"
                                (courseSelected)="setCourseSession($event)"
                                (cleared)="clearCourseSession()"
                              ></app-course-series-picker>
                            </div>

                            <!-- Ligne 5 : Lieu de l'enrôlement -->
                            <div class="md:col-span-2">
                              <label class="block font-semibold text-slate-700 mb-1 text-xs">{{ i18n.t('offre.lieuEnrolement') }}</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="offreLieuVille()"
                                (change)="onOffreLieuVilleChange($any($event.target).value)"
                              >
                                @for (center of recruitmentCentersList; track center.city) {
                                  <option [value]="center.city" [selected]="center.city === offreLieuVille()">{{ center.city }} : {{ center.name }}</option>
                                }
                              </select>
                            </div>

                            <!-- Ligne 6 : Date limite -->
                            <div class="md:col-span-2">
                              <app-calendar-picker
                                [label]="i18n.t('offre.dateLimite')"
                                [value]="offreDateElementsManquants()"
                                [placeholder]="i18n.t('common.selectDate')"
                                (dateSelected)="setOffreDateElementsManquants($event)"
                                (cleared)="setOffreDateElementsManquants('')"
                              ></app-calendar-picker>
                              <p class="mt-1 text-[11px] text-slate-500">
                                {{ i18n.t('offre.dansLeCourriel') }}<span class="font-semibold text-slate-700">{{ i18n.t('offre.auPlusTardLe') }}{{ offreDateElementsManquants() ? ' ' + offreDateElementsManquants() : '' }}</span>
                              </p>
                            </div>

                            <!-- Ligne 7 : Élément(s) manquant(s) -->
                            <div class="md:col-span-2">
                              <label class="block font-semibold text-slate-700 mb-1 text-xs">{{ i18n.t('offre.elementsManquants') }}</label>
                              <textarea
                                rows="3"
                                class="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all resize-y font-medium text-slate-800"
                                [value]="offreElementsManquants()"
                                (input)="setOffreElementsManquants($any($event.target).value)"
                                [placeholder]="i18n.t('offre.elementsManquantsPlaceholder')"
                              ></textarea>
                              <p class="mt-1 text-[11px] text-slate-500">
                                {{ i18n.t('offre.elementsManquantsHint') }}
                              </p>
                            </div>
                          }
                        </div>

                        <!-- Formulaires Supplémentaires -->
                        <div class="mt-4 pt-4 border-t border-slate-200">
                          <div class="flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <label class="block font-bold text-slate-800 text-xs uppercase tracking-wider">
                              {{ i18n.t('offre.formulairesSupplementaires') }}
                            </label>
                          </div>
                          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                            <!-- PPP -->
                            <label class="flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs font-semibold"
                              [class.bg-indigo-50]="offreFormulairePpp()"
                              [class.border-indigo-300]="offreFormulairePpp()"
                              [class.text-indigo-900]="offreFormulairePpp()"
                              [class.bg-slate-50]="!offreFormulairePpp()"
                              [class.border-slate-200]="!offreFormulairePpp()"
                              [class.text-slate-700]="!offreFormulairePpp()"
                            >
                              <input
                                type="checkbox"
                                [checked]="offreFormulairePpp()"
                                (change)="toggleOffreFormulairePpp()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                              />
                              <span>PPP</span>
                            </label>

                            <!-- PCU -->
                            <label class="flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs font-semibold"
                              [class.bg-indigo-50]="offreFormulairePcu()"
                              [class.border-indigo-300]="offreFormulairePcu()"
                              [class.text-indigo-900]="offreFormulairePcu()"
                              [class.bg-slate-50]="!offreFormulairePcu()"
                              [class.border-slate-200]="!offreFormulairePcu()"
                              [class.text-slate-700]="!offreFormulairePcu()"
                            >
                              <input
                                type="checkbox"
                                [checked]="offreFormulairePcu()"
                                (change)="toggleOffreFormulairePcu()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                              />
                              <span>PCU</span>
                            </label>

                            <!-- Croix du souvenir -->
                            <label class="flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs font-semibold"
                              [class.bg-indigo-50]="offreFormulaireCroixSouvenir()"
                              [class.border-indigo-300]="offreFormulaireCroixSouvenir()"
                              [class.text-indigo-900]="offreFormulaireCroixSouvenir()"
                              [class.bg-slate-50]="!offreFormulaireCroixSouvenir()"
                              [class.border-slate-200]="!offreFormulaireCroixSouvenir()"
                              [class.text-slate-700]="!offreFormulaireCroixSouvenir()"
                            >
                              <input
                                type="checkbox"
                                [checked]="offreFormulaireCroixSouvenir()"
                                (change)="toggleOffreFormulaireCroixSouvenir()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                              />
                              <span>{{ i18n.t('offre.croixSouvenir') }}</span>
                            </label>

                            <!-- Désignation de bénéficiaire -->
                            <label class="flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs font-semibold"
                              [class.bg-indigo-50]="offreFormulaireBeneficiaire()"
                              [class.border-indigo-300]="offreFormulaireBeneficiaire()"
                              [class.text-indigo-900]="offreFormulaireBeneficiaire()"
                              [class.bg-slate-50]="!offreFormulaireBeneficiaire()"
                              [class.border-slate-200]="!offreFormulaireBeneficiaire()"
                              [class.text-slate-700]="!offreFormulaireBeneficiaire()"
                            >
                              <input
                                type="checkbox"
                                [checked]="offreFormulaireBeneficiaire()"
                                (change)="toggleOffreFormulaireBeneficiaire()"
                                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600 shrink-0"
                              />
                              <span>{{ i18n.t('offre.formulaireBeneficiaire') }}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      } @else {
                        <!-- Note Sub-panel -->
                        <div class="p-3 bg-indigo-50/80 border-b border-indigo-100 flex items-center justify-between rounded-t-xl">
                          <div class="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>{{ i18n.t('offre.noteTitle', { taskName: i18n.lang() === 'en' ? task.nameEn : task.nameFr }) }}</span>
                          </div>
                        </div>

                        <div class="p-4 bg-white space-y-3 rounded-b-xl">
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <!-- Métier (Transférable/partagé) -->
                            <div class="relative">
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.metier') }}</label>
                              <div class="flex items-center border border-slate-300 rounded-lg bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500 text-xs min-h-[34px] transition-all">
                                <input
                                  type="text"
                                  class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                                  [placeholder]="i18n.t('offre.searchJobPlaceholder')"
                                  [value]="offreMetierSearchQuery()"
                                  (input)="onOffreMetierQueryChange($any($event.target).value)"
                                  (focus)="offreMetierDropdownOpen.set(true)"
                                  (blur)="closeOffreMetierDropdownDelayed()"
                                />
                                @if (offreMetierSearchQuery()) {
                                  <button
                                    type="button"
                                    (click)="clearOffreMetier($event)"
                                    class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                                    [title]="i18n.t('offre.clearJob')"
                                  >
                                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                }
                              </div>

                              @if (offreMetierDropdownOpen()) {
                                <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                                  @let filteredOffreJobs = getFilteredJobsForOffre();
                                  @if (filteredOffreJobs.length === 0) {
                                    <div class="p-2 text-slate-400 text-center italic">{{ i18n.t('offre.noJobFound') }}</div>
                                  }
                                  @for (job of filteredOffreJobs; track job.id) {
                                    <button
                                      type="button"
                                      (mousedown)="selectOffreMetier(job)"
                                      class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                                    >
                                      <span class="font-medium text-slate-800 truncate">{{ job.id }} - {{ i18n.currentLang() === 'en' ? (job.titleEn || job.title) : job.title }}</span>
                                    </button>
                                  }
                                </div>
                              }
                            </div>

                            <!-- Statut civil -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.statutCivil') }}</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteStatutCivil()"
                                (change)="setNoteStatutCivil($any($event.target).value)"
                              >
                                @for (opt of statutCivilOptions; track opt) {
                                  <option [value]="opt">{{ getStatutCivilLabel(opt) }}</option>
                                }
                              </select>
                            </div>
                            <!-- Conjoint -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.conjoint') }}</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteConjoint()"
                                (change)="setNoteConjoint($any($event.target).value)"
                              >
                                @for (opt of ouiNonOptions; track opt) {
                                  <option [value]="opt">{{ getOuiNonLabel(opt) }}</option>
                                }
                              </select>
                              @if (noteConjoint() === 'oui') {
                                <input
                                  type="text"
                                  class="w-full p-2 mt-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                  [placeholder]="i18n.t('offre.conjointTextePlaceholder')"
                                  [value]="noteConjointTexte()"
                                  (input)="onNoteConjointTexteInput($any($event.target).value)"
                                />
                              }
                            </div>
                            <!-- Enfant -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">{{ i18n.t('offre.enfantCount') }}</label>
                              <input
                                type="number"
                                min="0"
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                [placeholder]="i18n.t('offre.enfantCountPlaceholder')"
                                [value]="noteEnfantCount()"
                                (input)="onEnfantCountChange($any($event.target).value)"
                              />
                              @if (noteEnfantDetails().length > 0) {
                                <div class="mt-2 space-y-2 p-2 bg-indigo-50/50 rounded-lg border border-indigo-100">
                                  @for (child of noteEnfantDetails(); track $index; let i = $index) {
                                    <div class="flex items-center gap-2">
                                      <select
                                        class="w-1/3 p-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium text-slate-800"
                                        [value]="child.sex"
                                        (change)="updateEnfantDetail(i, 'sex', $any($event.target).value)"
                                      >
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                      </select>
                                      <select
                                        class="w-2/3 p-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium text-slate-800"
                                        [value]="child.year"
                                        (change)="updateEnfantDetail(i, 'year', $any($event.target).value)"
                                      >
                                        @for (year of getEnfantYears(); track year) {
                                          <option [value]="year">{{ year }}</option>
                                        }
                                      </select>
                                    </div>`;
