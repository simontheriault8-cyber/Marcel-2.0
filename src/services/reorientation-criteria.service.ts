import { Injectable, computed, signal, inject } from "@angular/core";
import { JobDatabaseService } from "./job-database.service";
import { MelService } from "./mel.service";
import { SharedStateService } from "./shared-state.service";
import { JobEntry } from "./jobs-data";
import {
  ManualCriterion,
  JobRule,
  PROVINCES,
  MATH_COURSES,
  MANUAL_CRITERIA,
  JOB_RULES,
} from "../app/data/reorientation-criteria.data";
import { evaluateDynamicExperienceCriteria } from "./reorientation/experience-criteria-evaluator";
import { applyCriterionToggleAndCleanup } from "./reorientation/criteria-toggle-handler";
import { evaluateExtraTestEligibility, evaluateEducationEligibility } from "./reorientation/job-eligibility-evaluator";

export interface NcmEvaluationResult {
  eligibleJobs: JobEntry[];
  openJobs: JobEntry[];
  closedJobs: JobEntry[];
  openOfficerJobs: JobEntry[];
  closedOfficerJobs: JobEntry[];
  openNcmJobs: JobEntry[];
  closedNcmJobs: JobEntry[];
}

@Injectable({
  providedIn: "root",
})
export class ReorientationCriteriaService {
  private jobService = inject(JobDatabaseService);
  private melService = inject(MelService);
  private sharedState = inject(SharedStateService);

  readonly PROVINCES = PROVINCES;
  readonly MATH_COURSES = MATH_COURSES;
  readonly MANUAL_CRITERIA = MANUAL_CRITERIA;
  readonly JOB_RULES = JOB_RULES;

  // Candidate profile signals
  age = signal<number | null>(null);
  citizenship = signal<string>("Canadian Citizen");
  ignoreSip = signal<boolean>(false);
  includeTraitement = signal<boolean>(false);
  currentSipPhase = computed<"admission" | "traitement" | "both">(() =>
    this.includeTraitement() ? "both" : "admission",
  );

  hasMedicalLimitation = signal<boolean>(false);
  medicalV = signal<string>("");
  medicalCV = signal<string>("");
  medicalH = signal<string>("");

  // Selected state
  selectedCriteriaIds = signal<Set<string>>(new Set<string>());
  selectedProvince = signal<string>("QC");
  activeScolariteTab = signal<"secondaire" | "specialises" | "universitaire">(
    "secondaire",
  );

  // Dossier job selection from shared state for extra test requirement checking
  dossierJobIds = computed(() =>
    [
      this.sharedState.selectedDossierJobId1(),
      this.sharedState.selectedDossierJobId2(),
      this.sharedState.selectedDossierJobId3(),
    ].filter(Boolean),
  );

  hasEceJob = computed(() => this.dossierJobIds().includes("00203"));
  hasEsomJob = computed(() => this.dossierJobIds().includes("00207"));
  hasCeopmJob = computed(() => this.dossierJobIds().includes("00214"));
  hasCspnJob = computed(() =>
    this.dossierJobIds().some(
      (id) => id === "00182" || id === "00183" || id === "00184",
    ),
  );

  // Math courses for currently selected province
  mathCoursesForProvince = computed(() => {
    const prov = this.selectedProvince();
    return this.MATH_COURSES[prov] || [];
  });

  // Education category lists
  criteriaAnneeScolaire = computed(() =>
    this.MANUAL_CRITERIA.filter((c) => c.category === "Année scolaire"),
  );

  criteriaHistoire = computed(() =>
    this.MANUAL_CRITERIA.filter((c) => c.category === "Histoire"),
  );

  criteriaLangue = computed(() =>
    this.MANUAL_CRITERIA.filter(
      (c) =>
        c.category === "Langue" &&
        c.id !== "etude_anglais" &&
        c.id !== "etude_hors_canada",
    ),
  );

  criteriaScience = computed(() =>
    this.MANUAL_CRITERIA.filter((c) => c.category === "Science"),
  );

  criteriaInformatique = computed(() =>
    this.MANUAL_CRITERIA.filter((c) => c.category === "Informatique"),
  );

  criteriaCoursSpecialise = computed(() =>
    this.MANUAL_CRITERIA.filter((c) => c.category === "Cours spécialisés"),
  );

  criteriaUniversitaire1erCycleGenie = computed(() =>
    this.MANUAL_CRITERIA.filter(
      (c) =>
        c.category === "Universitaire 1er cycle" && c.subCategory === "Génie",
    ),
  );

  criteriaUniversitaire1erCycleSciences = computed(() =>
    this.MANUAL_CRITERIA.filter(
      (c) =>
        c.category === "Universitaire 1er cycle" &&
        c.subCategory === "Sciences",
    ),
  );

  criteriaUniversitaire1erCycleArts = computed(() =>
    this.MANUAL_CRITERIA.filter(
      (c) =>
        c.category === "Universitaire 1er cycle" && c.subCategory === "Arts",
    ),
  );

  criteriaUniversitaire1erCycleSante = computed(() =>
    this.MANUAL_CRITERIA.filter(
      (c) =>
        c.category === "Universitaire 1er cycle" && c.subCategory === "Santé",
    ),
  );

  criteriaUniversitaireCycleSuperieurMaitrise = computed(() =>
    this.MANUAL_CRITERIA.filter(
      (c) =>
        c.category === "Universitaire cycle supérieur" &&
        c.subCategory === "Maîtrise",
    ),
  );

  criteriaUniversitaireCycleSuperieurDoctorat = computed(() =>
    this.MANUAL_CRITERIA.filter(
      (c) =>
        c.category === "Universitaire cycle supérieur" &&
        c.subCategory === "Doctorat",
    ),
  );

  // Dynamic experience criteria derived from selected schooling and candidate admissibility
  criteriaExperience = computed(() => {
    return evaluateDynamicExperienceCriteria(
      this.selectedCriteriaIds(),
      (jobId) => this.isAdmissibleOtherThanEducation(jobId)
    );
  });

  toggleManualCriterion(id: string) {
    const next = applyCriterionToggleAndCleanup(this.selectedCriteriaIds(), id);
    this.selectedCriteriaIds.set(next);
  }

  hasCriterion(id: string): boolean {
    return this.selectedCriteriaIds().has(id);
  }

  resetCriteria() {
    this.selectedCriteriaIds.set(new Set());
    this.selectedProvince.set("QC");
    this.activeScolariteTab.set("secondaire");
  }

  checkJobExtraTestEligibility(jobId: string) {
    return evaluateExtraTestEligibility(jobId, {
      hasEceJob: this.hasEceJob(),
      hasEsomJob: this.hasEsomJob(),
      hasCeopmJob: this.hasCeopmJob(),
      hasCspnJob: this.hasCspnJob(),
      testEcePassed: this.sharedState.testEcePassed(),
      testEceNotCompleted: this.sharedState.testEceNotCompleted(),
      testEsomPassed: this.sharedState.testEsomPassed(),
      testEsomNotCompleted: this.sharedState.testEsomNotCompleted(),
      testCeopmPassed: this.sharedState.testCeopmPassed(),
      testCeopmNotCompleted: this.sharedState.testCeopmNotCompleted(),
      testCspnNotCompleted: this.sharedState.testCspnNotCompleted(),
      testCspnPassed: this.sharedState.testCspnPassed(),
      testCspn00182Passed: this.sharedState.testCspn00182Passed(),
      testCspn00183Passed: this.sharedState.testCspn00183Passed(),
      testCspn00184Passed: this.sharedState.testCspn00184Passed(),
    });
  }

  isJobExtraTestAdmissible(jobId: string): boolean {
    return this.checkJobExtraTestEligibility(jobId).eligible;
  }

  isAdmissibleOtherThanEducation(
    jobId: string,
    options?: {
      age?: number | null;
      citizenship?: string;
      ignoreSip?: boolean;
      currentSipPhase?: "admission" | "traitement" | "both";
      hasMedicalLimitation?: boolean;
      medicalV?: string;
      medicalCV?: string;
      medicalH?: string;
    },
  ): boolean {
    if (!jobId || jobId === "00003") return false;
    const job = this.jobService.getAllJobs().find((j) => j.id === jobId);
    if (!job) return false;

    const ignoreSipVal = options?.ignoreSip ?? this.ignoreSip();
    const sipPhaseVal =
      options?.currentSipPhase ??
      (this.includeTraitement() ? "both" : "admission");
    if (!ignoreSipVal && this.jobService.isJobClosed(jobId, sipPhaseVal)) {
      return false;
    }

    if (!this.isJobMedicalAdmissible(jobId, options)) {
      return false;
    }

    if (!this.isJobExtraTestAdmissible(jobId)) {
      return false;
    }

    const ageVal = options?.age ?? this.age();
    const citizenshipVal = options?.citizenship ?? this.citizenship();

    const firstContract =
      job.contracts && job.contracts.length > 0 ? job.contracts[0] : null;
    const durationYears = firstContract
      ? firstContract.duration.match(/(\d+)\s*an/)
        ? parseInt(firstContract.duration.match(/(\d+)\s*an/)![1], 10)
        : 3
      : 3;

    if (ageVal !== null && ageVal > 0) {
      if (ageVal >= 57 || ageVal + durationYears >= 60) {
        return false;
      }
    }

    if (citizenshipVal === "PR < 3 years") {
      return false;
    } else if (citizenshipVal === "PR > 3 years") {
      if (!this.jobService.isJobRp(jobId)) {
        return false;
      }
    }

    return true;
  }

  isJobMedicalAdmissible(
    jobId: string,
    options?: {
      hasMedicalLimitation?: boolean;
      medicalV?: string;
      medicalCV?: string;
      medicalH?: string;
    },
  ): boolean {
    const job = this.jobService.getJobById(jobId);
    if (!job || !job.medicalStandard) return true;

    const hasMedLim =
      options?.hasMedicalLimitation ?? this.hasMedicalLimitation();
    if (hasMedLim) {
      const parseVal = (valStr?: string) => {
        const trimmed = (valStr || "").trim();
        if (!trimmed) return null;
        const num = parseInt(trimmed, 10);
        return isNaN(num) ? null : num;
      };
      const v = parseVal(options?.medicalV ?? this.medicalV());
      const cv = parseVal(options?.medicalCV ?? this.medicalCV());
      const h = parseVal(options?.medicalH ?? this.medicalH());

      const std = job.medicalStandard;
      if (v !== null && v > std.v) return false;
      if (cv !== null && cv > std.cv) return false;
      if (h !== null && h > std.h) return false;
    }

    const applicantLimitations = this.melService.applicantLimitations();
    const melMatrix = this.melService.acceptabilityMatrix();
    for (const [melId, hasLim] of Object.entries(applicantLimitations)) {
      if (hasLim) {
        const isAcceptable = melMatrix[melId]?.[jobId] ?? true;
        if (!isAcceptable) return false;
      }
    }
    return true;
  }

  checkJobEducationEligibility(
    jobId: string,
    options?: { selectedCriteriaIds?: Set<string> },
  ): { eligible: boolean; missingFr?: string; missingEn?: string } {
    const rawSelected = options?.selectedCriteriaIds ?? this.selectedCriteriaIds();
    const coursSpecialisesIds = this.criteriaCoursSpecialise().map((c) => c.id);
    return evaluateEducationEligibility(
      jobId,
      rawSelected,
      coursSpecialisesIds,
      (id) => this.jobService.isOfficerJob(id)
    );
  }

  evaluateEligibleNcmJobs(options?: {
    selectedCriteriaIds?: Set<string>;
    selectedProvince?: string;
    age?: number | null;
    citizenship?: string;
    ignoreSip?: boolean;
    currentSipPhase?: "admission" | "traitement" | "both";
    hasMedicalLimitation?: boolean;
    medicalV?: string;
    medicalCV?: string;
    medicalH?: string;
  }): NcmEvaluationResult {
    const rawSelected =
      options?.selectedCriteriaIds ?? this.selectedCriteriaIds();
    if (rawSelected.size === 0) {
      return {
        eligibleJobs: [],
        openJobs: [],
        closedJobs: [],
        openOfficerJobs: [],
        closedOfficerJobs: [],
        openNcmJobs: [],
        closedNcmJobs: [],
      };
    }

    const citizenship = options?.citizenship ?? this.citizenship();
    if (citizenship === "PR < 3 years") {
      return {
        eligibleJobs: [],
        openJobs: [],
        closedJobs: [],
        openOfficerJobs: [],
        closedOfficerJobs: [],
        openNcmJobs: [],
        closedNcmJobs: [],
      };
    }

    const jobsSet = new Set<string>();

    for (const rule of this.JOB_RULES) {
      for (const jId of rule.jobs) {
        if (!this.isAdmissibleOtherThanEducation(jId, options)) {
          continue;
        }

        const eduCheck = this.checkJobEducationEligibility(jId, {
          selectedCriteriaIds: rawSelected,
        });
        if (eduCheck.eligible) {
          jobsSet.add(jId);
        }
      }
    }

    const ignoreSipVal = options?.ignoreSip ?? this.ignoreSip();
    const sipPhaseVal =
      options?.currentSipPhase ??
      (this.includeTraitement() ? "both" : "admission");

    const openJobs: JobEntry[] = [];
    const closedJobs: JobEntry[] = [];
    const eligibleJobs: JobEntry[] = [];

    const openOfficerJobs: JobEntry[] = [];
    const closedOfficerJobs: JobEntry[] = [];
    const openNcmJobs: JobEntry[] = [];
    const closedNcmJobs: JobEntry[] = [];

    // Sort job IDs numerically
    const sortedJobIds = Array.from(jobsSet).sort((a, b) => a.localeCompare(b));

    for (const jId of sortedJobIds) {
      const job = this.jobService.getJobById(jId);
      if (!job) continue;

      const isOfficer = this.jobService.isOfficerJob(jId);
      const isClosed = this.jobService.isJobClosed(jId, sipPhaseVal);

      if (isClosed) {
        closedJobs.push(job);
        if (isOfficer) {
          closedOfficerJobs.push(job);
        } else {
          closedNcmJobs.push(job);
        }
        if (ignoreSipVal) {
          eligibleJobs.push(job);
        }
      } else {
        openJobs.push(job);
        if (isOfficer) {
          openOfficerJobs.push(job);
        } else {
          openNcmJobs.push(job);
        }
        eligibleJobs.push(job);
      }
    }

    return {
      eligibleJobs,
      openJobs,
      closedJobs,
      openOfficerJobs,
      closedOfficerJobs,
      openNcmJobs,
      closedNcmJobs,
    };
  }

  resetAll() {
    this.selectedCriteriaIds.set(new Set<string>());
    this.activeScolariteTab.set("secondaire");
    this.selectedProvince.set("QC");
    this.age.set(null);
    this.citizenship.set("Canadian Citizen");
    this.ignoreSip.set(false);
    this.includeTraitement.set(false);
    this.hasMedicalLimitation.set(false);
    this.medicalV.set("");
    this.medicalCV.set("");
    this.medicalH.set("");
  }
}
