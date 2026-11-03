import { Component, computed, signal, inject, effect, untracked } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { JobDatabaseService } from "../../services/job-database.service";
import { SharedStateService } from "../../services/shared-state.service";
import { MelService, MEL_LIMITATIONS } from "../../services/mel.service";
import { ReorientationCriteriaService } from "../../services/reorientation-criteria.service";
import { JOB_URLS } from "../data/job-urls.data";

import { ManualCriterion, JobRule, PROVINCES, MATH_COURSES, MANUAL_CRITERIA, JOB_RULES, CMR_JOB_DOMAINS } from "../data/reorientation-criteria.data";
import { computeReoExperienceCriteria, toggleReoManualCriterion } from "./reorientation/reorientation-experience.helper";
import {
  computeReoEligibleJobs,
  computeReoJobsExcludedByAge,
  checkReoJobEducationEligibility,
  checkReoJobMedicalEligibility,
  isReoJobMedicalAdmissible,
  isReoAdmissibleOtherThanEducation,
  getReoCmrAdmittedDomainsNoteFr,
  getReoCmrAdmittedDomainsNoteEn,
  getReoCmrAdmittedDomainsFr,
  getReoCmrAdmittedDomainsEn,
  getReoCmrJobRequiredDomainsFr,
  getReoCmrJobRequiredDomainsEn,
  evaluateReoJobAdmissibility,
} from "./reorientation/reorientation-admissibility.helper";
import { getReoMissingProofs, generateReoNoteText, generateReoNoteRegistry } from "./reorientation/reorientation-proofs-notes.generator";
import { buildReoBilingualEmail } from "./reorientation/reorientation-email.generator";
import { TranslationService } from "../i18n";
import { REORIENTATION_TEMPLATE } from "./reorientation/reorientation.template";

@Component({
  selector: "app-reorientation",
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: { "(document:click)": "onDocumentClick($event)" },
  template: REORIENTATION_TEMPLATE,
})
export class ReorientationComponent {
  jobService = inject(JobDatabaseService);
  sharedState = inject(SharedStateService);
  melService = inject(MelService);
  reorientationCriteria = inject(ReorientationCriteriaService);
  i18n = inject(TranslationService);

  showOptionsDropdown = signal<boolean>(false);

  activeHeaderOptionsCount = computed<number>(() => {
    let count = 0;
    if (this.ignoreSip()) count++;
    if (this.hasMedicalLimitation()) count++;
    if (this.isPforApplicant()) count++;
    if (this.includeTraitement()) count++;
    return count;
  });

  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('.reo-options-dropdown-container')) {
      this.showOptionsDropdown.set(false);
    }
  }

  geographicLimitations = MEL_LIMITATIONS.filter(l => l.category === 'Geographic');
  occupationalLimitations = MEL_LIMITATIONS.filter(l => l.category === 'Occupational');

  hasMel(melId: string): boolean {
    return this.melService.applicantLimitations()[melId] || false;
  }

  toggleMel(melId: string) {
    this.melService.toggleApplicantLimitation(melId);
  }

  constructor() {
    effect(() => {
      if (this.isPforApplicant() || this.sharedState.isPostulantPfor()) {
        return;
      }
      const isReoGenerated = this.showResultsPanel();
      untracked(() => {
        this.sharedState.hasReoEmailGenerated.set(isReoGenerated);
      });

      if (!isReoGenerated) {
        untracked(() => {
          this.sharedState.reoMergedEmailHtml.set("");
          this.sharedState.reoMergedEmailPlain.set("");
          this.sharedState.reoMergedNote.set("");
        });
        return;
      }

      const html = this.buildBilingualEmail(true);
      const plain = this.buildBilingualEmail(false);
      const note = this.generateNoteRegistry();
      untracked(() => {
        this.sharedState.reoMergedEmailHtml.set(html);
        this.sharedState.reoMergedEmailPlain.set(plain);
        this.sharedState.reoMergedNote.set(note);
      });
    });

    effect(() => {
      const trigger = this.sharedState.recruiterResetTrigger();
      if (trigger > 0) {
        untracked(() => {
          this.resetAllLocal();
        });
      }
    });
  }

  ignoreSip = signal<boolean>(false);

  toggleIgnoreSip() {
    this.ignoreSip.update((v) => !v);
  }

  includeTraitement = signal<boolean>(false);

  toggleIncludeTraitement() {
    this.includeTraitement.update((v) => !v);
  }

  currentSipPhase = computed<'admission' | 'both'>(() =>
    this.includeTraitement() ? 'both' : 'admission'
  );

  hasMedicalLimitation = signal<boolean>(false);

  toggleMedicalLimitation() {
    this.hasMedicalLimitation.update((v) => !v);
  }

  medicalV = signal<string>("");
  medicalCV = signal<string>("");
  medicalH = signal<string>("");
  medicalG = signal<string>("");
  medicalO = signal<string>("");
  medicalA = signal<string>("");
  medicalU = signal<string>("");

  age = signal<number | null>(null);
  citizenship = signal<string>("Canadian Citizen");
  selectedProvince = signal<string>("QC");

  readonly PROVINCES = PROVINCES;
  readonly MATH_COURSES = MATH_COURSES;
  manualCriteria: ManualCriterion[] = MANUAL_CRITERIA;
  jobRules: JobRule[] = JOB_RULES;

  mathCoursesForProvince = computed(() => {
    const prov = this.selectedProvince();
    return this.MATH_COURSES[prov] || [];
  });

  selectedCriteriaIds = signal<Set<string>>(new Set<string>());

  activeScolariteTab = signal<"secondaire" | "specialises" | "universitaire">(
    "secondaire",
  );

  criteriaAnneeScolaire = computed(() =>
    this.manualCriteria.filter((c) => c.category === "Année scolaire"),
  );
  criteriaHistoire = computed(() =>
    this.manualCriteria.filter((c) => c.category === "Histoire"),
  );
  criteriaLangue = computed(() =>
    this.manualCriteria.filter((c) => c.category === "Langue" && c.id !== "etude_anglais" && c.id !== "etude_hors_canada"),
  );
  criteriaScience = computed(() =>
    this.manualCriteria.filter((c) => c.category === "Science"),
  );
  criteriaInformatique = computed(() =>
    this.manualCriteria.filter((c) => c.category === "Informatique"),
  );
  criteriaCoursSpecialise = computed(() =>
    this.manualCriteria.filter((c) => c.category === "Cours spécialisés"),
  );
  criteriaUniversitaire1erCycle = computed(() =>
    this.manualCriteria.filter((c) => c.category === "Universitaire 1er cycle"),
  );
  criteriaUniversitaire1erCycleGenie = computed(() =>
    this.manualCriteria.filter(
      (c) =>
        c.category === "Universitaire 1er cycle" && c.subCategory === "Génie",
    ),
  );
  criteriaUniversitaire1erCycleSciences = computed(() =>
    this.manualCriteria.filter(
      (c) =>
        c.category === "Universitaire 1er cycle" &&
        c.subCategory === "Sciences",
    ),
  );
  criteriaUniversitaire1erCycleArts = computed(() =>
    this.manualCriteria.filter(
      (c) =>
        c.category === "Universitaire 1er cycle" && c.subCategory === "Arts",
    ),
  );
  criteriaUniversitaire1erCycleSante = computed(() =>
    this.manualCriteria.filter(
      (c) =>
        c.category === "Universitaire 1er cycle" && c.subCategory === "Santé",
    ),
  );
  criteriaUniversitaireCycleSuperieur = computed(() =>
    this.manualCriteria.filter(
      (c) => c.category === "Universitaire cycle supérieur",
    ),
  );
  criteriaUniversitaireCycleSuperieurMaitrise = computed(() =>
    this.manualCriteria.filter(
      (c) =>
        c.category === "Universitaire cycle supérieur" &&
        c.subCategory === "Maîtrise",
    ),
  );
  criteriaUniversitaireCycleSuperieurDoctorat = computed(() =>
    this.manualCriteria.filter(
      (c) =>
        c.category === "Universitaire cycle supérieur" &&
        c.subCategory === "Doctorat",
    ),
  );
  criteriaExperience = computed(() => computeReoExperienceCriteria.call(this));
  criteriaExperienceSecondaire = computed(() =>
    this.manualCriteria.filter(
      (c) => c.category === "Expérience" && c.subCategory === "secondaire",
    ),
  );
  criteriaExperienceSpecialises = computed(() =>
    this.manualCriteria.filter(
      (c) => c.category === "Expérience" && c.subCategory === "specialises",
    ),
  );
  criteriaExperienceUniversitaire = computed(() =>
    this.manualCriteria.filter(
      (c) => c.category === "Expérience" && c.subCategory === "universitaire",
    ),
  );

  expandedDomaines = signal<Set<string>>(new Set<string>());

  isPforApplicant = signal<boolean>(false);
  pforType = signal<"cmr" | "civil">("cmr");
  cmrArts = signal<boolean>(false);
  cmrScience = signal<boolean>(false);
  cmrGenie = signal<boolean>(false);

  togglePforApplicant() {
    this.isPforApplicant.update((v) => !v);
    this.sharedState.isPostulantPfor.set(this.isPforApplicant());
  }

  toggleDomaine(domaine: string) {
    const current = new Set(this.expandedDomaines());
    if (current.has(domaine)) {
      current.delete(domaine);
    } else {
      current.add(domaine);
    }
    this.expandedDomaines.set(current);
  }

  resetAllLocal() {
    this.age.set(null);
    this.citizenship.set("Canadian Citizen");
    this.selectedProvince.set("QC");
    this.hasMedicalLimitation.set(false);
    this.isPforApplicant.set(false);
    this.sharedState.isPostulantPfor.set(false);
    this.pforType.set("cmr");
    this.cmrArts.set(false);
    this.cmrScience.set(false);
    this.cmrGenie.set(false);
    this.medicalV.set("");
    this.medicalCV.set("");
    this.medicalH.set("");
    this.medicalG.set("");
    this.medicalO.set("");
    this.medicalA.set("");
    this.medicalU.set("");
    this.selectedCriteriaIds.set(new Set<string>());
    this.activeScolariteTab.set("secondaire");
    this.expandedDomaines.set(new Set<string>());
    this.selectedDossierJobId1.set("");
    this.selectedDossierJobId2.set("");
    this.selectedDossierJobId3.set("");
    this.searchDossierQuery1.set("");
    this.searchDossierQuery2.set("");
    this.searchDossierQuery3.set("");
    this.dropdownOpen1.set(false);
    this.dropdownOpen2.set(false);
    this.dropdownOpen3.set(false);
    this.showOptionsDropdown.set(false);
    this.ignoreSip.set(false);
    this.includeTraitement.set(false);
    this.testEcePassed.set(false);
    this.testEceNotCompleted.set(false);
    this.testEsomPassed.set(false);
    this.testEsomNotCompleted.set(false);
    this.testCeopmPassed.set(false);
    this.testCeopmNotCompleted.set(false);
    this.testCspnPassed.set(false);
    this.testCspnNotCompleted.set(false);
    this.testCspn00182Passed.set(false);
    this.testCspn00183Passed.set(false);
    this.testCspn00184Passed.set(false);
    this.melService.resetApplicantLimitations();
    this.reorientationCriteria.resetAll();
    this.sharedState.resetSharedRecruiterState();
  }

  resetAll() {
    this.resetAllLocal();
    this.sharedState.triggerRecruiterReset();
  }

  toggleManualCriterion(id: string) {
    toggleReoManualCriterion.call(this, id);
  }

  isCandidateTooOld = computed(() => {
    const ageVal = this.age();
    if (ageVal === null || ageVal <= 0) return false;
    if (ageVal >= 57) return true;

    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean).filter((id) => id !== "00003");

    if (dossierIds.length > 0) {
      const allDossierExceedAge = dossierIds.every((id) => {
        const s = this.evaluateJobAdmissibility(id);
        return s && !s.isAgeAdmissible;
      });
      if (allDossierExceedAge) return true;
    }
    return false;
  });

  showResultsPanel = computed(() => {
    if (this.citizenship() === "PR < 3 years") {
      return true;
    }
    if (this.age() !== null && this.age()! >= 57) {
      return true;
    }

    const hasDossierJob = !!(
      this.selectedDossierJobId1() ||
      this.selectedDossierJobId2() ||
      this.selectedDossierJobId3()
    );

    if (!hasDossierJob) {
      return false;
    }

    if (this.isCandidateTooOld()) {
      return true;
    }

    if (this.isPforApplicant()) {
      if (this.pforType() === "cmr") {
        const hasCmrDomain =
          this.cmrArts() || this.cmrScience() || this.cmrGenie();
        return hasCmrDomain || this.eligibleJobs().length > 0;
      } else {
        return true;
      }
    }
    return true;
  });

  hasCriterion(selected: Set<string>, id: string): boolean {
    if (id === "des_12e_annee") {
      return selected.has("des_12e_annee") || selected.has("aens");
    }
    if (id === "sec4_24_credits") {
      return selected.has("sec4_24_credits") || selected.has("des_12e_annee") || selected.has("aens");
    }
    return selected.has(id);
  }

  eligibleJobs = computed(() => computeReoEligibleJobs.call(this));
  jobsExcludedByAge = computed(() => computeReoJobsExcludedByAge.call(this));

  searchDossierQuery1 = this.sharedState.searchDossierQuery1;
  searchDossierQuery2 = this.sharedState.searchDossierQuery2;
  searchDossierQuery3 = this.sharedState.searchDossierQuery3;
  selectedDossierJobId1 = this.sharedState.selectedDossierJobId1;
  selectedDossierJobId2 = this.sharedState.selectedDossierJobId2;
  selectedDossierJobId3 = this.sharedState.selectedDossierJobId3;
  dropdownOpen1 = signal<boolean>(false);
  dropdownOpen2 = signal<boolean>(false);
  dropdownOpen3 = signal<boolean>(false);

  testEcePassed = this.sharedState.testEcePassed;
  testEceNotCompleted = this.sharedState.testEceNotCompleted;
  testEsomPassed = this.sharedState.testEsomPassed;
  testEsomNotCompleted = this.sharedState.testEsomNotCompleted;
  testCeopmPassed = this.sharedState.testCeopmPassed;
  testCeopmNotCompleted = this.sharedState.testCeopmNotCompleted;
  testCspnPassed = this.sharedState.testCspnPassed;
  testCspnNotCompleted = this.sharedState.testCspnNotCompleted;
  testCspn00182Passed = this.sharedState.testCspn00182Passed;
  testCspn00183Passed = this.sharedState.testCspn00183Passed;
  testCspn00184Passed = this.sharedState.testCspn00184Passed;

  dossierJobIds = computed(() => {
    const ids: string[] = [];
    const id1 = this.selectedDossierJobId1();
    const id2 = this.selectedDossierJobId2();
    const id3 = this.selectedDossierJobId3();
    if (id1 && id1 !== "00003") ids.push(id1);
    if (id2 && id2 !== "00003") ids.push(id2);
    if (id3 && id3 !== "00003") ids.push(id3);
    return ids;
  });

  hasEceJob = computed(() => this.dossierJobIds().includes("00203"));
  hasEsomJob = computed(() => this.dossierJobIds().includes("00207"));
  hasCeopmJob = computed(() => this.dossierJobIds().includes("00214"));
  hasCspnJob = computed(() =>
    this.dossierJobIds().some((id) => id === "00182" || id === "00183" || id === "00184")
  );
  hasAnyExtraTest = computed(() =>
    this.hasEceJob() || this.hasEsomJob() || this.hasCeopmJob() || this.hasCspnJob()
  );

  onEceMainToggle(checked: boolean) {
    this.testEcePassed.set(checked);
    if (checked) {
      this.testEceNotCompleted.set(false);
    }
  }

  onEceNotCompletedToggle(checked: boolean) {
    this.testEceNotCompleted.set(checked);
    if (checked) {
      this.testEcePassed.set(false);
    }
  }

  onEsomMainToggle(checked: boolean) {
    this.testEsomPassed.set(checked);
    if (checked) {
      this.testEsomNotCompleted.set(false);
    }
  }

  onEsomNotCompletedToggle(checked: boolean) {
    this.testEsomNotCompleted.set(checked);
    if (checked) {
      this.testEsomPassed.set(false);
    }
  }

  onCeopmMainToggle(checked: boolean) {
    this.testCeopmPassed.set(checked);
    if (checked) {
      this.testCeopmNotCompleted.set(false);
    }
  }

  onCeopmNotCompletedToggle(checked: boolean) {
    this.testCeopmNotCompleted.set(checked);
    if (checked) {
      this.testCeopmPassed.set(false);
    }
  }

  isExtraTestNotCompleted(jobId: string): boolean {
    if (jobId === '00203') return this.testEceNotCompleted();
    if (jobId === '00207') return this.testEsomNotCompleted();
    if (jobId === '00214') return this.testCeopmNotCompleted();
    if (jobId === '00182' || jobId === '00183' || jobId === '00184') return this.testCspnNotCompleted();
    return false;
  }

  onCspnMainToggle(checked: boolean) {
    this.testCspnPassed.set(checked);
    if (checked) {
      this.testCspnNotCompleted.set(false);
    } else {
      this.testCspn00182Passed.set(false);
      this.testCspn00183Passed.set(false);
      this.testCspn00184Passed.set(false);
    }
  }

  onCspnNotCompletedToggle(checked: boolean) {
    this.testCspnNotCompleted.set(checked);
    if (checked) {
      this.testCspnPassed.set(false);
      this.testCspn00182Passed.set(false);
      this.testCspn00183Passed.set(false);
      this.testCspn00184Passed.set(false);
    }
  }

  checkJobExtraTestEligibility(jobId: string): {
    isExtraTestRequired: boolean;
    testName: string;
    eligible: boolean;
    reasonFr: string;
    reasonEn: string;
  } {
    if (jobId === "00203") {
      const isTested = this.hasEceJob();
      const notCompleted = this.testEceNotCompleted();
      const eligible = !isTested || (!notCompleted && this.testEcePassed());
      return {
        isExtraTestRequired: isTested,
        testName: "ECE",
        eligible,
        reasonFr: eligible || notCompleted
          ? ""
          : "Échec ou non-réussite de l'Évaluation des compétences en communication écrite (ECE).",
        reasonEn: eligible || notCompleted
          ? ""
          : "Failed or did not pass the Written Communication Skills Evaluation (ECE).",
      };
    }
    if (jobId === "00207") {
      const isTested = this.hasEsomJob();
      const notCompleted = this.testEsomNotCompleted();
      const eligible = !isTested || (!notCompleted && this.testEsomPassed());
      return {
        isExtraTestRequired: isTested,
        testName: "ESOM",
        eligible,
        reasonFr: eligible || notCompleted
          ? ""
          : "Échec ou non-réussite de l'Évaluation de sélection des officiers de marine (ESOM).",
        reasonEn: eligible || notCompleted
          ? ""
          : "Failed or did not pass the Naval Officer Selection Assessment (ESOM).",
      };
    }
    if (jobId === "00214") {
      const isTested = this.hasCeopmJob();
      const notCompleted = this.testCeopmNotCompleted();
      const eligible = !isTested || (!notCompleted && this.testCeopmPassed());
      return {
        isExtraTestRequired: isTested,
        testName: "CEOPM",
        eligible,
        reasonFr: eligible || notCompleted
          ? ""
          : "Échec ou non-réussite du Centre d’évaluation des officiers de la police militaire (CEOPM).",
        reasonEn: eligible || notCompleted
          ? ""
          : "Failed or did not pass the Military Police Officer Assessment Centre (CEOPM).",
      };
    }
    if (jobId === "00182") {
      const isTested = this.hasCspnJob();
      const notCompleted = this.testCspnNotCompleted();
      const eligible =
        !isTested ||
        (!notCompleted && this.testCspnPassed() && this.testCspn00182Passed());
      return {
        isExtraTestRequired: isTested,
        testName: "CSPN",
        eligible,
        reasonFr: eligible || notCompleted
          ? ""
          : "Échec ou non-réussite du test du Centre de sélection du personnel navigant (CSPN) pour le métier 00182 (Officier – Systèmes de combat).",
        reasonEn: eligible || notCompleted
          ? ""
          : "Failed or did not pass the Aircrew Selection Centre (ASC/CSPN) test for occupation 00182 (Air Combat Systems Officer).",
      };
    }
    if (jobId === "00183") {
      const isTested = this.hasCspnJob();
      const notCompleted = this.testCspnNotCompleted();
      const eligible =
        !isTested ||
        (!notCompleted && this.testCspnPassed() && this.testCspn00183Passed());
      return {
        isExtraTestRequired: isTested,
        testName: "CSPN",
        eligible,
        reasonFr: eligible || notCompleted
          ? ""
          : "Échec ou non-réussite du test du Centre de sélection du personnel navigant (CSPN) pour le métier 00183 (Pilote).",
        reasonEn: eligible || notCompleted
          ? ""
          : "Failed or did not pass the Aircrew Selection Centre (ASC/CSPN) test for occupation 00183 (Pilot).",
      };
    }
    if (jobId === "00184") {
      const isTested = this.hasCspnJob();
      const notCompleted = this.testCspnNotCompleted();
      const eligible =
        !isTested ||
        (!notCompleted && this.testCspnPassed() && this.testCspn00184Passed());
      return {
        isExtraTestRequired: isTested,
        testName: "CSPN",
        eligible,
        reasonFr: eligible || notCompleted
          ? ""
          : "Échec ou non-réussite du test du Centre de sélection du personnel navigant (CSPN) pour le métier 00184 (Contrôle aérospatial).",
        reasonEn: eligible || notCompleted
          ? ""
          : "Failed or did not pass the Aircrew Selection Centre (ASC/CSPN) test for occupation 00184 (Aerospace Control Officer).",
      };
    }
    return {
      isExtraTestRequired: false,
      testName: "",
      eligible: true,
      reasonFr: "",
      reasonEn: "",
    };
  }

  isJobExtraTestAdmissible(jobId: string): boolean {
    return this.checkJobExtraTestEligibility(jobId).eligible;
  }

  allJobsList = computed(() => this.jobService.getAllJobs());

  filteredDossierJobs1 = computed(() =>
    this.filterJobsForSearch(this.searchDossierQuery1()),
  );
  filteredDossierJobs2 = computed(() =>
    this.filterJobsForSearch(this.searchDossierQuery2()),
  );
  filteredDossierJobs3 = computed(() =>
    this.filterJobsForSearch(this.searchDossierQuery3()),
  );

  filterJobsForSearch(query: string) {
    let jobs = this.allJobsList();
    if (this.isPforApplicant() || this.sharedState.isPostulantPfor()) {
      jobs = jobs.filter((j) => this.jobService.isPforJob(j, this.currentSipPhase()));
    }
    if (!query || query.trim() === "") {
      return jobs;
    }
    const lowQuery = query.toLowerCase().trim();
    return jobs.filter(
      (j) =>
        j.id.includes(lowQuery) ||
        j.title.toLowerCase().includes(lowQuery) ||
        (j.titleEn && j.titleEn.toLowerCase().includes(lowQuery)) ||
        (j.abbreviation && j.abbreviation.toLowerCase().includes(lowQuery)),
    );
  }

  isFieldDisabled(index: number): boolean {
    const id1 = this.selectedDossierJobId1();
    const id2 = this.selectedDossierJobId2();
    const id3 = this.selectedDossierJobId3();
    
    if (index === 1) return (id2 === "00003" || id3 === "00003");
    if (index === 2) return (id1 === "00003" || id3 === "00003");
    if (index === 3) return (id1 === "00003" || id2 === "00003");
    return false;
  }

  selectDossierJob(index: number, jobId: string) {
    const qb = this.jobService.getAllJobs().find((j) => j.id === jobId);
    if (!qb) return;

    if (jobId === "00003") {
      if (index === 1) {
        this.selectedDossierJobId2.set("");
        this.searchDossierQuery2.set("");
        this.selectedDossierJobId3.set("");
        this.searchDossierQuery3.set("");
      } else if (index === 2) {
        this.selectedDossierJobId1.set("");
        this.searchDossierQuery1.set("");
        this.selectedDossierJobId3.set("");
        this.searchDossierQuery3.set("");
      } else if (index === 3) {
        this.selectedDossierJobId1.set("");
        this.searchDossierQuery1.set("");
        this.selectedDossierJobId2.set("");
        this.searchDossierQuery2.set("");
      }
    }

    const title = this.jobService.getJobTitle(qb, this.i18n.lang());

    if (index === 1) {
      this.selectedDossierJobId1.set(jobId);
      this.searchDossierQuery1.set(`${qb.id} - ${title}`);
      this.dropdownOpen1.set(false);
    } else if (index === 2) {
      this.selectedDossierJobId2.set(jobId);
      this.searchDossierQuery2.set(`${qb.id} - ${title}`);
      this.dropdownOpen2.set(false);
    } else if (index === 3) {
      this.selectedDossierJobId3.set(jobId);
      this.searchDossierQuery3.set(`${qb.id} - ${title}`);
      this.dropdownOpen3.set(false);
    }
  }

  clearDossierJob(index: number, event: MouseEvent) {
    event.stopPropagation();
    if (index === 1) {
      this.selectedDossierJobId1.set("");
      this.searchDossierQuery1.set("");
      this.dropdownOpen1.set(false);
    } else if (index === 2) {
      this.selectedDossierJobId2.set("");
      this.searchDossierQuery2.set("");
      this.dropdownOpen2.set(false);
    } else if (index === 3) {
      this.selectedDossierJobId3.set("");
      this.searchDossierQuery3.set("");
      this.dropdownOpen3.set(false);
    }
  }

  onQueryChange(index: number, val: string) {
    if (index === 1) {
      this.searchDossierQuery1.set(val);
      if (!val) this.selectedDossierJobId1.set("");
    } else if (index === 2) {
      this.searchDossierQuery2.set(val);
      if (!val) this.selectedDossierJobId2.set("");
    } else if (index === 3) {
      this.searchDossierQuery3.set(val);
      if (!val) this.selectedDossierJobId3.set("");
    }
  }

  openDropdown(index: number) {
    if (this.isFieldDisabled(index)) return;
    if (index === 1) {
      this.dropdownOpen1.set(true);
      this.searchDossierQuery1.set("");
    } else if (index === 2) {
      this.dropdownOpen2.set(true);
      this.searchDossierQuery2.set("");
    } else if (index === 3) {
      this.dropdownOpen3.set(true);
      this.searchDossierQuery3.set("");
    }
  }

  closeDropdownDelayed(index: number) {
    setTimeout(() => {
      if (index === 1) {
        this.dropdownOpen1.set(false);
        const id = this.selectedDossierJobId1();
        if (id) {
          const qb = this.jobService.getAllJobs().find((j) => j.id === id);
          if (qb) {
            const title = this.jobService.getJobTitle(qb, this.i18n.lang());
            this.searchDossierQuery1.set(`${qb.id} - ${title}`);
          }
        } else {
          this.searchDossierQuery1.set("");
        }
      } else if (index === 2) {
        this.dropdownOpen2.set(false);
        const id = this.selectedDossierJobId2();
        if (id) {
          const qb = this.jobService.getAllJobs().find((j) => j.id === id);
          if (qb) {
            const title = this.jobService.getJobTitle(qb, this.i18n.lang());
            this.searchDossierQuery2.set(`${qb.id} - ${title}`);
          }
        } else {
          this.searchDossierQuery2.set("");
        }
      } else if (index === 3) {
        this.dropdownOpen3.set(false);
        const id = this.selectedDossierJobId3();
        if (id) {
          const qb = this.jobService.getAllJobs().find((j) => j.id === id);
          if (qb) {
            const title = this.jobService.getJobTitle(qb, this.i18n.lang());
            this.searchDossierQuery3.set(`${qb.id} - ${title}`);
          }
        } else {
          this.searchDossierQuery3.set("");
        }
      }
    }, 200);
  }

  hasSelected(index: number): boolean {
    if (index === 1) return !!this.selectedDossierJobId1();
    if (index === 2) return !!this.selectedDossierJobId2();
    if (index === 3) return !!this.selectedDossierJobId3();
    return false;
  }

  isOfficerJob(jobId: string): boolean {
    return this.jobService.isOfficerJob(jobId);
  }

  checkJobEducationEligibility(jobId: string) {
    return checkReoJobEducationEligibility.call(this, jobId);
  }
  checkJobMedicalEligibility(jobId: string) {
    return checkReoJobMedicalEligibility.call(this, jobId);
  }
  isJobMedicalAdmissible(jobId: string): boolean {
    return isReoJobMedicalAdmissible.call(this, jobId);
  }
  isAdmissibleOtherThanEducation(jobId: string): boolean {
    return isReoAdmissibleOtherThanEducation.call(this, jobId);
  }
  getCmrAdmittedDomainsNoteFr(): string {
    return getReoCmrAdmittedDomainsNoteFr.call(this);
  }
  getCmrAdmittedDomainsFr(): string {
    return getReoCmrAdmittedDomainsFr.call(this);
  }
  getCmrAdmittedDomainsEn(): string {
    return getReoCmrAdmittedDomainsEn.call(this);
  }
  getCmrJobRequiredDomainsFr(jobId: string): string {
    return getReoCmrJobRequiredDomainsFr.call(this, jobId);
  }
  getCmrJobRequiredDomainsEn(jobId: string): string {
    return getReoCmrJobRequiredDomainsEn.call(this, jobId);
  }
  evaluateJobAdmissibility(jobId: string) {
    return evaluateReoJobAdmissibility.call(this, jobId);
  }

  reset() {
    this.age.set(null);
    this.citizenship.set("Canadian Citizen");
    this.hasMedicalLimitation.set(false);
    this.includeTraitement.set(false);
    this.isPforApplicant.set(false);
    this.sharedState.isPostulantPfor.set(false);
    this.pforType.set("cmr");
    this.cmrArts.set(false);
    this.cmrScience.set(false);
    this.cmrGenie.set(false);
    this.medicalV.set("");
    this.medicalCV.set("");
    this.medicalH.set("");
    this.medicalG.set("");
    this.medicalO.set("");
    this.medicalA.set("");
    this.medicalU.set("");
    this.testEcePassed.set(false);
    this.testEceNotCompleted.set(false);
    this.testEsomPassed.set(false);
    this.testEsomNotCompleted.set(false);
    this.testCeopmPassed.set(false);
    this.testCeopmNotCompleted.set(false);
    this.testCspnPassed.set(false);
    this.testCspnNotCompleted.set(false);
    this.testCspn00182Passed.set(false);
    this.testCspn00183Passed.set(false);
    this.testCspn00184Passed.set(false);
    this.selectedCriteriaIds.set(new Set<string>());
    this.selectedDossierJobId1.set("");
    this.selectedDossierJobId2.set("");
    this.selectedDossierJobId3.set("");
    this.searchDossierQuery1.set("");
    this.searchDossierQuery2.set("");
    this.searchDossierQuery3.set("");
    this.dropdownOpen1.set(false);
    this.dropdownOpen2.set(false);
    this.dropdownOpen3.set(false);
  }

  getMissingProofs(jobId: string): { fr: string[]; en: string[] } {
    return getReoMissingProofs.call(this, jobId);
  }
  generateNoteText() {
    return generateReoNoteText.call(this);
  }
  copied = signal(false);
  noteCopied = signal(false);
  generateNoteRegistry(): string {
    return generateReoNoteRegistry.call(this);
  }

  getCmrAdmittedDomainsNoteEn(): string {
    return getReoCmrAdmittedDomainsNoteEn.call(this);
  }

  readonly JOB_URLS = JOB_URLS;

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

  async copyNoteRegistry() {
    try {
      const textContent = this.generateNoteRegistry();

      if (navigator.clipboard && navigator.clipboard.write) {
        const textBlob = new Blob([textContent], { type: "text/plain" });
        const clipboardItem = new ClipboardItem({
          "text/plain": textBlob,
        });
        await navigator.clipboard.write([clipboardItem]);
      } else {
        await navigator.clipboard.writeText(textContent);
      }

      this.noteCopied.set(true);
      setTimeout(() => this.noteCopied.set(false), 2000);
    } catch (err) {
      console.error("Failed to copy note", err);
    }
  }

  buildBilingualEmail(isHtml: boolean): string {
    return buildReoBilingualEmail.call(this, isHtml);
  }

  async copyBilingualEmail() {
    try {
      const htmlContent = this.buildBilingualEmail(true);
      const textContent = this.buildBilingualEmail(false);
      const subject = this.i18n.t('subject.candidate_email_outlook');

      if (navigator.clipboard && navigator.clipboard.write) {
        const typeHtml = "text/html";
        const typeText = "text/plain";

        const blobHtml = new Blob([htmlContent], { type: typeHtml });
        const blobText = new Blob([textContent], { type: typeText });

        const data = [
          new ClipboardItem({
            [typeHtml]: blobHtml,
            [typeText]: blobText,
          }),
        ];

        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(textContent);
      }

      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);

      // Open email client
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoLink;
    } catch (err) {
      console.error("Failed to copy reorientation email", err);
    }
  }

  exportToOutlook() {
    return this.copyBilingualEmail();
  }

  getReoContentPlainFr() {
    return this.buildBilingualEmail(false);
  }

  getReoContentPlainEn() {
    return this.buildBilingualEmail(false);
  }

  getReoContentHtmlFr() {
    return this.buildBilingualEmail(true);
  }

  getReoContentHtmlEn() {
    return this.buildBilingualEmail(true);
  }
}
