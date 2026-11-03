import { getTodayDateString } from "../models/app-role-snapshot.models";
import { Task, DocumentItem, RejectionReason } from "../../services/recruitment-data.service";
import { JobEntry } from "../../services/jobs-data";

export function isGroupCompliant(this: any, group: { tasks: Task[] }): boolean {
    return group.tasks.length > 0 && group.tasks.every((t) => this.isTaskCompliant(t));
  }

export function setGroupCompliant(this: any, group: { tasks: Task[] }, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const currentKeys = new Set(this.compliantDocKeys());
    const currentNotCompleted = new Set(this.taskNotCompletedKeys());
    const currentRejections = new Set(this.selectedRejectionKeys());
    const dossierJobs = this.getDossierJobObjects();

    if (this.isGroupCompliant(group)) {
      // Toggle OFF: Retirer la conformité des tâches de ce groupe
      group.tasks.forEach((task) => {
        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.delete(this.getDocKey(task, doc));
          });
        } else {
          currentKeys.delete(`${task.nameFr}::metiers_docs`);
        }
      });
    } else {
      // Toggle ON: Rendre toutes les tâches du groupe conformes
      group.tasks.forEach((task) => {
        // Enlever des tâches non complétées
        currentNotCompleted.delete(task.nameFr);

        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.add(this.getDocKey(task, doc));
            // Enlever les motifs de rejet
            doc.reasons.forEach((reason) => {
              currentRejections.delete(this.getReasonKey(doc, reason));
              dossierJobs.forEach((j) => {
                currentRejections.delete(this.getJobReasonKey(j, doc, reason));
              });
            });
          });
        } else {
          currentKeys.add(`${task.nameFr}::metiers_docs`);
          task.documents.forEach((doc) => {
            doc.reasons.forEach((reason) => {
              currentRejections.delete(this.getReasonKey(doc, reason));
              dossierJobs.forEach((j) => {
                currentRejections.delete(this.getJobReasonKey(j, doc, reason));
              });
            });
          });
        }
      });
    }

    this.compliantDocKeys.set(currentKeys);
    this.taskNotCompletedKeys.set(currentNotCompleted);
    this.selectedRejectionKeys.set(currentRejections);
  }

export function hasGroupRejections(this: any, group: { tasks: Task[] }): boolean {
    return group.tasks.some((t) => this.hasTaskRejections(t));
  }

export function getGroupForTask(this: any, task: Task): { id: string; title: string } | null {
    if (this.selectedRole() === "gestionnaire") {
      if (task.section) {
        return { id: task.section, title: task.section };
      }
      if (task.nameFr.includes("Courriel d'offre")) {
        return { id: "Courriel d'offre", title: "Courriel d'offre" };
      }
      if (task.nameFr.includes("Documents Supplémentaires")) {
        return { id: "Autre", title: "Autre" };
      }
      return { id: "Autre", title: "Autre" };
    }

    if (
      task.nameFr.includes("Documents Supplémentaires") ||
      task.nameFr.includes("Courriel d'offre")
    ) {
      return null;
    }
    if (task.section) {
      return { id: task.section, title: task.section };
    }
    const name = task.nameFr;
    if (
      name.includes("Relevé") ||
      name.includes("Relevés") ||
      name.includes("Pièce d'identité") ||
      name.includes("Certificat de naissance") ||
      name.includes("Consentement du parent")
    ) {
      return { id: "0.1", title: "0.1" };
    }
    if (name.includes("MDN 2977")) {
      return { id: "0.5", title: "0.5" };
    }
    return { id: "1.0", title: "1.0" };
  }

export function computeGroupedVisibleTasks(this: any) {
    const tasks = this.visibleTasks();
    const isGd = this.selectedRole() === "gestionnaire";

    if (isGd) {
      const gdGroupOrder = [
        "Réception d'un postulant",
        "Suivi de dossier",
        "Retour PSPS",
        "Courriel d'offre",
        "Courriel enrôlement",
        "Autre",
      ];
      const groupsMap = new Map<string, { id: string; title: string; tasks: Task[] }>();
      for (const gName of gdGroupOrder) {
        groupsMap.set(gName, { id: gName, title: gName, tasks: [] });
      }

      for (const task of tasks) {
        const g = this.getGroupForTask(task);
        const gId = g ? g.id : "Autre";
        if (!groupsMap.has(gId)) {
          groupsMap.set(gId, { id: gId, title: gId, tasks: [] });
        }
        groupsMap.get(gId)!.tasks.push(task);
      }

      const groups = gdGroupOrder
        .map((name) => groupsMap.get(name)!)
        .filter((g) => !!g);

      return {
        groups,
        additionalTasks: [],
      };
    }

    const groupsMap = new Map<string, { id: string; title: string; tasks: Task[] }>();
    const additionalTasks: Task[] = [];

    for (const task of tasks) {
      const g = this.getGroupForTask(task);
      if (!g) {
        additionalTasks.push(task);
      } else {
        if (!groupsMap.has(g.id)) {
          groupsMap.set(g.id, { id: g.id, title: g.title, tasks: [] });
        }
        groupsMap.get(g.id)!.tasks.push(task);
      }
    }

    return {
      groups: Array.from(groupsMap.values()),
      additionalTasks,
    };
  }

export function getDossierJob(this: any, index: number): JobEntry | undefined {
    const id =
      index === 1
        ? this.sharedState.selectedDossierJobId1()
        : index === 2
        ? this.sharedState.selectedDossierJobId2()
        : this.sharedState.selectedDossierJobId3();
    if (!id) return undefined;
    return this.jobService.getAllJobs().find((j) => j.id === id);
  }

export function isJobClosed(this: any, jobId: string): boolean {
    return this.jobService.isJobClosed(jobId);
  }

export function getFilteredJobsForIndex(this: any, index: number): JobEntry[] {
    const query =
      index === 1
        ? this.sharedState.searchDossierQuery1()
        : index === 2
        ? this.sharedState.searchDossierQuery2()
        : this.sharedState.searchDossierQuery3();
    if (!query || query.trim() === "") {
      let allJobs = this.jobService.getAllJobs();
      if (this.sharedState.isPostulantPfor()) {
        allJobs = allJobs.filter(j => this.jobService.isPforJob(j));
      }
      return allJobs;
    }
    let searchedJobs = this.jobService.searchJobs(query);
    if (this.sharedState.isPostulantPfor()) {
      searchedJobs = searchedJobs.filter(j => this.jobService.isPforJob(j));
    }
    return searchedJobs;
  }

export function getObjectKeys(this: any, obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

export function isDossierFieldDisabled(this: any, index: number): boolean {
    const id1 = this.sharedState.selectedDossierJobId1();
    const id2 = this.sharedState.selectedDossierJobId2();
    const id3 = this.sharedState.selectedDossierJobId3();
    if (index === 1) return id2 === "00003" || id3 === "00003";
    if (index === 2) return id1 === "00003" || id3 === "00003";
    if (index === 3) return id1 === "00003" || id2 === "00003";
    return false;
  }

export function selectDossierJob(this: any, index: number, jobId: string) {
    const qb = this.jobService.getAllJobs().find((j) => j.id === jobId);
    if (!qb) return;

    if (jobId === "00003") {
      if (index === 1) {
        this.sharedState.selectedDossierJobId2.set("");
        this.sharedState.searchDossierQuery2.set("");
        this.sharedState.selectedDossierJobId3.set("");
        this.sharedState.searchDossierQuery3.set("");
      } else if (index === 2) {
        this.sharedState.selectedDossierJobId1.set("");
        this.sharedState.searchDossierQuery1.set("");
        this.sharedState.selectedDossierJobId3.set("");
        this.sharedState.searchDossierQuery3.set("");
      } else if (index === 3) {
        this.sharedState.selectedDossierJobId1.set("");
        this.sharedState.searchDossierQuery1.set("");
        this.sharedState.selectedDossierJobId2.set("");
        this.sharedState.searchDossierQuery2.set("");
      }
    }

    const isEn = this.i18n ? this.i18n.currentLang() === 'en' : false;
    const title = this.jobService.getJobTitle(qb, isEn ? 'en' : 'fr');

    if (index === 1) {
      this.sharedState.selectedDossierJobId1.set(jobId);
      this.sharedState.searchDossierQuery1.set(`${qb.id} - ${title}`);
      this.dossierDropdownOpen1.set(false);
    } else if (index === 2) {
      this.sharedState.selectedDossierJobId2.set(jobId);
      this.sharedState.searchDossierQuery2.set(`${qb.id} - ${title}`);
      this.dossierDropdownOpen2.set(false);
    } else if (index === 3) {
      this.sharedState.selectedDossierJobId3.set(jobId);
      this.sharedState.searchDossierQuery3.set(`${qb.id} - ${title}`);
      this.dossierDropdownOpen3.set(false);
    }
  }

export function clearDossierJob(this: any, index: number, event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (index === 1) {
      this.sharedState.selectedDossierJobId1.set("");
      this.sharedState.searchDossierQuery1.set("");
      this.sharedState.dossierJobFailedCe1.set(false);
      this.dossierDropdownOpen1.set(false);
    } else if (index === 2) {
      this.sharedState.selectedDossierJobId2.set("");
      this.sharedState.searchDossierQuery2.set("");
      this.sharedState.dossierJobFailedCe2.set(false);
      this.dossierDropdownOpen2.set(false);
    } else if (index === 3) {
      this.sharedState.selectedDossierJobId3.set("");
      this.sharedState.searchDossierQuery3.set("");
      this.sharedState.dossierJobFailedCe3.set(false);
      this.dossierDropdownOpen3.set(false);
    }
  }

export function onDossierQueryChange(this: any, index: number, val: string) {
    if (index === 1) {
      this.sharedState.searchDossierQuery1.set(val);
      if (!val) {
        this.sharedState.selectedDossierJobId1.set("");
        this.sharedState.dossierJobFailedCe1.set(false);
      }
    } else if (index === 2) {
      this.sharedState.searchDossierQuery2.set(val);
      if (!val) {
        this.sharedState.selectedDossierJobId2.set("");
        this.sharedState.dossierJobFailedCe2.set(false);
      }
    } else if (index === 3) {
      this.sharedState.searchDossierQuery3.set(val);
      if (!val) {
        this.sharedState.selectedDossierJobId3.set("");
        this.sharedState.dossierJobFailedCe3.set(false);
      }
    }
  }

export function openDossierDropdown(this: any, index: number) {
    if (this.isDossierFieldDisabled(index)) return;
    if (index === 1) {
      this.dossierDropdownOpen1.set(true);
      this.sharedState.searchDossierQuery1.set("");
    } else if (index === 2) {
      this.dossierDropdownOpen2.set(true);
      this.sharedState.searchDossierQuery2.set("");
    } else if (index === 3) {
      this.dossierDropdownOpen3.set(true);
      this.sharedState.searchDossierQuery3.set("");
    }
  }

export function closeDossierDropdownDelayed(this: any, index: number) {
    setTimeout(() => {
      const isEn = this.i18n ? this.i18n.currentLang() === 'en' : false;
      if (index === 1) {
        this.dossierDropdownOpen1.set(false);
        const id = this.sharedState.selectedDossierJobId1();
        if (id) {
          const qb = this.jobService.getAllJobs().find((j) => j.id === id);
          if (qb) {
            const title = this.jobService.getJobTitle(qb, isEn ? 'en' : 'fr');
            this.sharedState.searchDossierQuery1.set(`${qb.id} - ${title}`);
          }
        } else {
          this.sharedState.searchDossierQuery1.set("");
        }
      } else if (index === 2) {
        this.dossierDropdownOpen2.set(false);
        const id = this.sharedState.selectedDossierJobId2();
        if (id) {
          const qb = this.jobService.getAllJobs().find((j) => j.id === id);
          if (qb) {
            const title = this.jobService.getJobTitle(qb, isEn ? 'en' : 'fr');
            this.sharedState.searchDossierQuery2.set(`${qb.id} - ${title}`);
          }
        } else {
          this.sharedState.searchDossierQuery2.set("");
        }
      } else if (index === 3) {
        this.dossierDropdownOpen3.set(false);
        const id = this.sharedState.selectedDossierJobId3();
        if (id) {
          const qb = this.jobService.getAllJobs().find((j) => j.id === id);
          if (qb) {
            const title = this.jobService.getJobTitle(qb, isEn ? 'en' : 'fr');
            this.sharedState.searchDossierQuery3.set(`${qb.id} - ${title}`);
          }
        } else {
          this.sharedState.searchDossierQuery3.set("");
        }
      }
    }, 200);
  }

  // --- STAGE LOGIC ---

export function restartApp(this: any, triggerShared: boolean = true) {
    if (triggerShared) {
      this.sharedState.triggerRecruiterReset();
    }
    this.showJobSearch.set(false);
    this.melService.resetApplicantLimitations();
    this.reorientationCriteria.resetAll();
    this.sharedState.resetSharedRecruiterState();

    this.stage.set("intro");
    this.isUnderAge.set(false);
    this.recruiterDossierType.set("normal");
    this.sharedState.isPostulantPfor.set(false);
    this.pforMatricule.set('');
    this.resetSgtInstructions();
    this.selectedTask.set(null);
    this.selectedRejectionKeys.set(new Set());
    this.taskNotCompletedKeys.set(new Set());
    this.compliantDocKeys.set(new Set());
    this.collapsedGroups.set(new Set());
    this.selectedEmailBankTemplate.set('');
    this.triageMedicalRequis.set(false);
    this.allTasks.set(
      this.dataService.getTasks(
        this.selectedRole() === "gestionnaire" ? "gestionnaire" : "recruiter"
      )
    );

    // Reset GD specific panels & selections
    this.evaluationMedicaleType.set("Dossier régulier");
    this.premierContactCourriel.set(false);
    this.premierContactMedical.set(false);
    this.premierContactEntrevue.set(false);
    this.premierContactGambit.set(false);
    this.premierContactPsps.set(false);
    this.premierContactSelfie.set(false);
    this.premierContactIptad.set(false);
    this.premierContactSeaf.set(false);
    this.premierContactSubPanelMode.set('courriel');
    this.premierContactNoteIptad.set('Complété');
    this.premierContactNoteSeaf.set('Complété');
    this.premierContactNoteEntrevue.set('À faire');
    this.premierContactNoteMedical.set('À faire');
    this.premierContactNotePsps.set('À faire');
    this.premierContactNoteGambit.set('En attente (type 28)');
    this.premierContactNoteAnxQ.set('À faire');

    this.avisFermetureCourriel.set(false);
    this.avisFermetureDelaiJours.set('14');
    this.avisFermetureDate.set('');
    this.avisFermetureEntrevue.set(false);
    this.avisFermetureMedicale.set(false);
    this.avisFermetureGambit.set(false);
    this.avisFermeturePsps.set(false);

    this.annexeQCourriel.set(false);
    this.annexeQAlphaPostulant.set('');
    this.pforMatricule.set('');

    this.evaluationMedicalePartie1.set(false);
    this.evaluationMedicalePartie2.set(false);
    this.evaluationMedicalePartie1Et2.set(false);
    this.copiedMedicalKey.set(null);

    // Reset Offer forms
    const isOta = this.evaluationMedicaleType() === 'Dossier OTA';
    const savedVille = (typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_ville')) || 'Québec';
    const savedPostulant = (typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_postulant')) || '8h00';
    const savedInvites = (typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_invites')) || '10h00';
    const villeToSet = isOta ? 'Montréal' : savedVille;
    const centerObj = this.recruitmentCentersList.find(c => c.city === villeToSet) || this.recruitmentCentersList[0];
    const savedLieuEnrolement = isOta ? centerObj.fullFr : ((typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_enrolement')) || centerObj.fullFr);

    this.offreNormaleChecked.set(false);
    this.offreEtudesSubventionneesChecked.set(false);
    this.offreLieuVille.set(villeToSet);
    this.offreUniteAffectation.set('st-jean');
    this.offreMetier.set('');
    this.offreMetierSearchQuery.set('');
    this.offreMetierDropdownOpen.set(false);
    this.offreProgrammeEnrolement.set('');
    this.offreElement.set('');
    this.offreDureeContrat.set('');
    this.offreEtudesSubventionnees.set('');
    this.offreDureeEtudesSubventionnees.set('');
    this.offreDateEnrolement.set('');
    this.offreHeureArriveePostulant.set(savedPostulant);
    this.offreHeureArriveeInvites.set(savedInvites);
    this.offreLieuEnrolement.set(savedLieuEnrolement);
    this.offreDateArriveeUnite.set('');
    this.offreElementsManquants.set('Spécimen de chèque');
    this.offreDateElementsManquants.set('');
    this.offreSerieCours.set('');
    this.offreDateCoursDebut.set('');
    this.offreDateCoursFin.set('');
    this.offreFormulairePpp.set(false);
    this.offreFormulairePcu.set(false);
    this.offreFormulaireCroixSouvenir.set(false);
    this.offreFormulaireBeneficiaire.set(false);
    this.offreSubPanelMode.set('courriel');
    this.noteStatutCivil.set('célibataire');
    this.noteConjoint.set('N/A');
    this.noteConjointTexte.set('');
    this.noteEnfantCount.set('0');
    this.noteEnfantDetails.set([]);
    this.notePlaqueImm.set('');
    this.noteBrisBail.set('N/A');
    this.noteEntreposage.set('N/A');
    this.noteSermentDeclaration.set('Serment');
    this.noteInviteMil.set('N/A');
    this.noteInviteMilTexte.set('');
    this.noteSvcMilAnt.set('N/A');
    this.noteBeneficiaire.set('');
    this.noteDateCourrielConfirmation.set(getTodayDateString());
    this.testEsomRecruitmentCenterCity.set('Québec');

    // Reset Dossier jobs & Réo shared state
    this.clearDossierJob(1);
    this.clearDossierJob(2);
    this.clearDossierJob(3);
    this.dossierDropdownOpen1.set(false);
    this.dossierDropdownOpen2.set(false);
    this.dossierDropdownOpen3.set(false);

    const current = this.selectedRole();
    if (current === 'recruiter' || current === 'gestionnaire') {
      this.roleSnapshots[current] = this.createFreshSnapshot(current);
    }
  }

export function isPforDossier(this: any): boolean {
    return this.sharedState.isPostulantPfor() || this.recruiterDossierType() === 'pfor';
  }

export function setAllCompliant(this: any) {
    if (this.areAllDocsCompliant()) {
      // Toggle OFF: désactiver la conformité de toutes les tâches standard visibles
      const currentKeys = new Set(this.compliantDocKeys());
      this.visibleTasks().forEach((task) => {
        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.delete(this.getDocKey(task, doc));
          });
        } else {
          currentKeys.delete(`${task.nameFr}::metiers_docs`);
        }
      });
      this.compliantDocKeys.set(currentKeys);
    } else {
      // Toggle ON: marquer toutes les tâches standard visibles conformes
      const currentKeys = new Set(this.compliantDocKeys());
      this.visibleTasks().forEach((task) => {
        if (!task.nameFr.includes("Documents Supplémentaires")) {
          task.documents.forEach((doc) => {
            currentKeys.add(this.getDocKey(task, doc));
          });
        } else {
          currentKeys.add(`${task.nameFr}::metiers_docs`);
        }
      });
      this.compliantDocKeys.set(currentKeys);
      this.taskNotCompletedKeys.set(new Set());
      this.selectedRejectionKeys.set(new Set());
      this.selectedEmailBankTemplate.set('');
    }
  }


export function selectTask(this: any, task: Task) {
    this.selectedTask.set(task);
    if (task.nameFr.includes("Offre normale")) {
      if (this.offreDateArriveeUnite() === '2025 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2026 au plus tard 16h00');
      }
    } else if (task.nameFr.toLowerCase().includes("subventionn")) {
      if (this.offreDateArriveeUnite() === '2026 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2025 au plus tard 16h00');
      }
    }
  }

export function toggleTaskNotCompleted(this: any, task: Task) {
    const willBeNotCompleted = !this.isTaskNotCompleted(task);

    this.taskNotCompletedKeys.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(task.nameFr)) {
        newSet.delete(task.nameFr);
      } else {
        newSet.add(task.nameFr);
      }
      return newSet;
    });

    if (willBeNotCompleted) {
      // Clear compliant keys for all documents in this task
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        task.documents.forEach((doc) => {
          newSet.delete(this.getDocKey(task, doc));
        });
        return newSet;
      });

      // Clear selected rejection reasons for all documents in this task
      this.selectedRejectionKeys.update((set) => {
        const newSet = new Set(set);
        const dossierJobs = this.getDossierJobObjects();
        task.documents.forEach((doc) => {
          doc.reasons.forEach((reason) => {
            newSet.delete(this.getReasonKey(doc, reason));
            dossierJobs.forEach((j) => {
              newSet.delete(this.getJobReasonKey(j, doc, reason));
            });
          });
        });
        return newSet;
      });
    }
  }

export function isTaskNotCompleted(this: any, task: Task): boolean {
    return this.taskNotCompletedKeys().has(task.nameFr);
  }

export function toggleReason(this: any, task: Task, doc: DocumentItem, reason: RejectionReason) {
    const reasonKey = this.getReasonKey(doc, reason);

    // If we select a rejection, the document is no longer "Compliant"
    this.setCompliantState(task, doc, false);
    if (task.nameFr.includes("Documents Supplémentaires")) {
      const suppKey = `${task.nameFr}::metiers_docs`;
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        newSet.delete(suppKey);
        return newSet;
      });
    }

    this.selectedRejectionKeys.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(reasonKey)) {
        newSet.delete(reasonKey);
      } else {
        newSet.add(reasonKey);
        
        // Uncheck others if "Inexistant au dossier" is selected, and vice versa
        if (reason.id.includes("inexist")) {
          // Uncheck all other reasons for this document
          doc.reasons.forEach(r => {
            if (r.id !== reason.id) {
               newSet.delete(this.getReasonKey(doc, r));
            }
          });
        } else {
          // If we check another reason, uncheck "Inexistant au dossier"
          doc.reasons.forEach(r => {
            if (r.id.includes("inexist")) {
               newSet.delete(this.getReasonKey(doc, r));
            }
          });
        }
      }
      return newSet;
    });
  }

export function toggleJobReason(this: any, task: Task, job: JobEntry, doc: DocumentItem, reason: RejectionReason) {
    const jobKey = this.getJobReasonKey(job, doc, reason);
    const generalKey = this.getReasonKey(doc, reason);

    this.setCompliantState(task, doc, false);
    if (task.nameFr.includes("Documents Supplémentaires")) {
      const suppKey = `${task.nameFr}::metiers_docs`;
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        newSet.delete(suppKey);
        return newSet;
      });
    }

    this.selectedRejectionKeys.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(generalKey)) {
        newSet.delete(generalKey);
        const dossierJobs = this.getDossierJobObjects();
        for (const j of dossierJobs) {
          if (j.id !== job.id && this.isAdditionalDocRequiredForJob(doc.nameFr, j.id)) {
            newSet.add(this.getJobReasonKey(j, doc, reason));
          }
        }
      } else {
        if (newSet.has(jobKey)) {
          newSet.delete(jobKey);
        } else {
          newSet.add(jobKey);
        }
      }
      return newSet;
    });
  }

  // Helpers for Additional Job Docs Compliance
export function hasAdditionalJobDocsRejections(this: any, task: Task): boolean {
    const dossierJobs = this.getDossierJobObjects();
    if (dossierJobs.length === 0) return false;
    return task.documents.some((doc) => {
      if (!this.isSubsidizedDoc(doc) && !this.isTaskBasedAdditionalDoc(doc)) {
        return doc.reasons.some((reason) =>
          dossierJobs.some(
            (job) =>
              this.isAdditionalDocRequiredForJob(doc.nameFr, job.id) &&
              this.isJobReasonSelected(job, doc, reason)
          )
        );
      }
      return false;
    });
  }

export function isAdditionalJobDocsCompliant(this: any, task?: Task): boolean {
    const t = task || this.visibleTasks().find((taskItem) => taskItem.nameFr.includes("Documents Supplémentaires"));
    if (!t) return false;
    const key = `${t.nameFr}::metiers_docs`;
    return this.compliantDocKeys().has(key) && !this.hasAdditionalJobDocsRejections(t);
  }

export function toggleAdditionalJobDocsCompliant(this: any, task: Task) {
    if (this.isAdditionalJobDocsCompliant(task)) {
      // Toggle OFF
      const key = `${task.nameFr}::metiers_docs`;
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        newSet.delete(key);
        return newSet;
      });
    } else {
      // Toggle ON:
      // 1. Clear any selected rejection keys for job-specific additional docs
      this.selectedRejectionKeys.update((set) => {
        const newSet = new Set(set);
        const dossierJobs = this.getDossierJobObjects();
        task.documents.forEach((doc) => {
          if (!this.isSubsidizedDoc(doc) && !this.isTaskBasedAdditionalDoc(doc)) {
            doc.reasons.forEach((r) => {
              newSet.delete(this.getReasonKey(doc, r));
              dossierJobs.forEach((j) => {
                newSet.delete(this.getJobReasonKey(j, doc, r));
              });
            });
          }
        });
        return newSet;
      });

      // 2. Mark as compliant
      const key = `${task.nameFr}::metiers_docs`;
      this.compliantDocKeys.update((set) => {
        const newSet = new Set(set);
        newSet.add(key);
        return newSet;
      });
    }
  }

  // Toggle "Conforme" state
export function toggleCompliant(this: any, task: Task, doc: DocumentItem) {
    if (this.isCompliant(task, doc)) {
      // If already compliant, toggle OFF
      this.setCompliantState(task, doc, false);
    } else {
      // If turning ON:
      // 1. Clear rejections (cannot be both compliant and rejected)
      this.selectedRejectionKeys.update((set) => {
        const newSet = new Set(set);
        const dossierJobs = this.getDossierJobObjects();
        doc.reasons.forEach((r) => {
          newSet.delete(this.getReasonKey(doc, r));
          dossierJobs.forEach((j) => {
            newSet.delete(this.getJobReasonKey(j, doc, r));
          });
        });
        return newSet;
      });

      // 2. Set Compliant State explicitly
      this.setCompliantState(task, doc, true);
    }
  }

  // Helpers
export function getReasonKey(this: any, doc: DocumentItem, reason: RejectionReason): string {
    return `${doc.nameFr}::${reason.id}`;
  }

export function getJobReasonKey(this: any, job: JobEntry, doc: DocumentItem, reason: RejectionReason): string {
    return `${doc.nameFr}::${reason.id}::${job.id}`;
  }

export function getDocKey(this: any, task: Task, doc: DocumentItem): string {
    return `${task.nameFr}::${doc.nameFr}`;
  }

export function setCompliantState(this: any, task: Task,
    doc: DocumentItem,
    isCompliant: boolean,) {
    const key = this.getDocKey(task, doc);
    this.compliantDocKeys.update((set) => {
      const newSet = new Set(set);
      if (isCompliant) {
        newSet.add(key);
      } else {
        newSet.delete(key);
      }
      return newSet;
    });
  }

  // State Checkers
export function isJobReasonSelected(this: any, job: JobEntry, doc: DocumentItem, reason: RejectionReason): boolean {
    return (
      this.selectedRejectionKeys().has(this.getJobReasonKey(job, doc, reason)) ||
      this.selectedRejectionKeys().has(this.getReasonKey(doc, reason))
    );
  }

export function isReasonSelected(this: any, doc: DocumentItem, reason: RejectionReason): boolean {
    if (this.selectedRejectionKeys().has(this.getReasonKey(doc, reason))) {
      return true;
    }
    const dossierJobs = this.getDossierJobObjects();
    return dossierJobs.some((j) =>
      this.selectedRejectionKeys().has(this.getJobReasonKey(j, doc, reason))
    );
  }

export function hasRejections(this: any, doc: DocumentItem): boolean {
    return doc.reasons.some((r) => this.isReasonSelected(doc, r));
  }

export function hasConfirmationReasons(this: any, doc: DocumentItem): boolean {
    return doc.reasons.some((r) => r.isConfirmation);
  }

export function hasAdditionalDocReasons(this: any, doc: DocumentItem): boolean {
    return doc.reasons.some((r) => r.isAdditionalDoc);
  }

export function hasNormalReasons(this: any, doc: DocumentItem): boolean {
    return doc.reasons.some((r) => !r.isConfirmation && !r.isAdditionalDoc);
  }

  // A document is Compliant only if explicitly marked so
export function isCompliant(this: any, task: Task, doc: DocumentItem): boolean {
    return this.compliantDocKeys().has(this.getDocKey(task, doc));
  }

export function hasTaskRejections(this: any, task: Task): boolean {
    return (
      this.isTaskNotCompleted(task) ||
      task.documents.some((doc) => this.hasRejections(doc))
    );
  }

export function isTaskCompliant(this: any, task: Task): boolean {
    if (task.nameFr.includes("Documents Supplémentaires")) {
      if (this.hasTaskRejections(task)) {
        return false;
      }
      if (this.isPforDossier()) {
        return true;
      }
      if (this.hasVisibleAdditionalDocs(task)) {
        return this.isAdditionalJobDocsCompliant(task);
      }
      return true;
    }

    const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");

    if (isIdentity) {
      const hasId = task.documents.some(
        (d) =>
          !d.nameFr.toLowerCase().includes("selfie") &&
          !d.nameFr.toLowerCase().includes("invalide") &&
          this.isCompliant(task, d),
      );
      return hasId;
    }

    const isConsentement = task.nameFr.includes("Consentement du parent");
    if (isConsentement) {
      return task.documents.every((d) => this.isCompliant(task, d));
    }

    // For other tasks, it's compliant if any 1 document is compliant
    return task.documents.some((d) => this.isCompliant(task, d));
  }

export function isRecruiterMandatoryTask(this: any, task: Task): boolean {
    const name = task.nameFr;
    if (
      name.includes("Relevé") ||
      name.includes("Relevés") ||
      name.startsWith("Pièce d'identité avec photo") ||
      name.includes("Certificat de naissance")
    ) {
      return true;
    }
    if (this.isUnderAge() && name.includes("Consentement du parent")) {
      return true;
    }
    return false;
  }

export function computeAllTasksCompliant(this: any): boolean {
    const tasks = this.visibleTasks();
    if (tasks.length === 0) return false;

    if (this.selectedRole() === "recruiter") {
      // Dans le volet recruteur, dans la vérification des documents, les seuls tâches au portail
      // qui ne permettent plus au postulant d'être conforme sont : relevés de notes, pièce d'identité et certificat de naissance canadien.
      const mandatoryTasks = tasks.filter((t) => this.isRecruiterMandatoryTask(t));
      if (mandatoryTasks.length === 0) return false;

      return mandatoryTasks.every((task) => {
        // Tâche non complétée bloque la conformité
        if (this.isTaskNotCompleted(task)) {
          return false;
        }

        const isIdentity = task.nameFr.startsWith("Pièce d'identité avec photo");
        if (isIdentity) {
          // Doit avoir au moins une pièce d'identité valide (hors selfie) marquée conforme
          const hasCompliantId = task.documents.some(
            (d) =>
              !d.nameFr.toLowerCase().includes("selfie") &&
              !d.nameFr.toLowerCase().includes("invalide") &&
              this.isCompliant(task, d)
          );
          if (!hasCompliantId) return false;

          // Aucun motif de rejet bloquant sur les pièces d'identité (hors selfie)
          const hasBlockingIdRejection = task.documents.some(
            (d) =>
              !d.nameFr.toLowerCase().includes("selfie") &&
              this.hasRejections(d)
          );
          if (hasBlockingIdRejection) return false;

          return true;
        }

        // Pour Relevés de notes et Certificat de naissance (ou Consentement parent si mineur) :
        // Aucun motif de rejet permis
        if (task.documents.some((d) => this.hasRejections(d))) {
          return false;
        }

        // Doit être conforme
        return this.isTaskCompliant(task);
      });
    }

    return tasks.every((task) => {
      // Le formulaire MDN 2977 n'est pas obligatoire pour la conformité finale
      if (task.nameFr.includes("MDN 2977")) {
        return true;
      }
      if (task.nameFr.includes("Courriel d'offre")) {
        return true;
      }
      if (
        task.nameFr.includes("Formulaire de demande d'emploi notée") ||
        task.nameFr.includes("Formulaire de demande d’emploi noté")
      ) {
        return true;
      }
      return this.isTaskCompliant(task);
    });
}

export function isDocActive(this: any, task: Task, doc: DocumentItem): boolean {
    return this.isCompliant(task, doc) || this.hasRejections(doc);
  }

  // LOGIC: Visibility of documents based on Task rules
export function shouldShowDoc(this: any, task: Task, doc: DocumentItem): boolean {
    if (this.isTaskNotCompleted(task)) {
      return false;
    }

    if (task.nameFr.includes("Documents Supplémentaires")) {
      if (this.isDocActive(task, doc)) return true;
      return this.shouldShowAdditionalDoc(doc);
    }

    // NEW: Minor Check Logic for "Certificat de naissance"
    // In minor check, we only want the actual "Certificat de naissance" (long form), not citizenship card/PR card.
    if (
      this.stage() === "minor-check" &&
      task.nameFr.startsWith("Certificat de naissance")
    ) {
      return doc.nameFr === "Certificat de naissance";
    }

    // PFOR Admission Letter: Only visible for PFOR dossiers
    if (doc.nameFr.includes("Lettre d'admission sans condition")) {
      if (this.isDocActive(task, doc)) return true;
      return this.isPforDossier();
    }

    // 1. If this specific document is active (being worked on), always show it.
    if (this.isDocActive(task, doc)) return true;

    // 2. Logic for "Pièce d'identité"
    // Rule: If one ID is active, hide other IDs. Always keep Selfie visible.
    if (task.nameFr.startsWith("Pièce d'identité")) {
      const isSelfie = doc.nameFr.toLowerCase().includes("selfie");

      // Always show selfie
      if (isSelfie) return true;

      // For other IDs: Check if ANY other NON-SELFIE document is active
      const otherMainIdActive = task.documents.some(
        (d) =>
          d !== doc &&
          !d.nameFr.toLowerCase().includes("selfie") &&
          this.isDocActive(task, d),
      );

      // If another main ID is active, hide this one.
      return !otherMainIdActive;
    }

    // 3. Logic for "Certificat de naissance" (Normal Mode)
    // Rule: If one document is active, hide the others.
    if (task.nameFr.startsWith("Certificat de naissance")) {
      const otherActive = task.documents.some(
        (d) => d !== doc && this.isDocActive(task, d),
      );
      return !otherActive;
    }

    // Default: Show everything
    return true;
  }

  // LOGIC: Visibility of reasons based on Stage (NEW)
export function shouldShowReason(this: any, task: Task,
    doc: DocumentItem,
    reason: RejectionReason,): boolean {
    // The previous complex logic for Part H is removed because the reasons have been moved
    // to the appropriate task in the data structure itself.
    return true;
  }

