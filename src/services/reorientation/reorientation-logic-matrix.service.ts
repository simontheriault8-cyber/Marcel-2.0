import { Injectable, computed, signal, inject } from "@angular/core";
import {
  JOB_RULES,
  MANUAL_CRITERIA,
  MATH_COURSES,
  ManualCriterion,
  JobRule,
} from "../../app/data/reorientation-criteria.data";
import {
  JOBS_DATA,
  JobEntry,
  MilitaryElement,
  JOB_ELEMENTS_MAP,
  isOfficerJobId,
} from "../jobs-data";
import { MelService } from "../mel.service";
import { ReorientationRulesService } from "./reorientation-rules.service";

export interface JobLogicRequirement {
  type: "requiredIds" | "customCheck";
  descriptionFr: string;
  descriptionEn: string;
  criterionIds: string[];
}

export interface JobRuleSummary {
  jobId: string;
  titleFr: string;
  titleEn: string;
  category: "NCM" | "Officer";
  element: MilitaryElement;
  allowPR: boolean;
  requirements: JobLogicRequirement[];
  extraTests: string[];
  melIncompatibleCount: number;
}

export interface CriterionImpactSummary {
  id: string;
  labelFr: string;
  labelEn: string;
  category: string;
  unlockedJobsDirect: { id: string; titleFr: string; titleEn: string }[];
  unlockedJobsCombined: { id: string; titleFr: string; titleEn: string; requiredOtherFr: string; requiredOtherEn: string }[];
}

@Injectable({
  providedIn: "root",
})
export class ReorientationLogicMatrixService {
  private melService = inject(MelService);
  private rulesService = inject(ReorientationRulesService);

  readonly jobs = JOBS_DATA.filter((j) => j.id !== "00003");
  readonly criteria = MANUAL_CRITERIA;

  // Search & Filter signals
  searchQuery = signal<string>("");
  categoryFilter = signal<"ALL" | "NCM" | "Officer">("ALL");
  elementFilter = signal<"ALL" | MilitaryElement>("ALL");
  citizenshipFilter = signal<"ALL" | "CC" | "RP">("ALL");
  viewMode = signal<"jobs" | "checkboxes">("jobs");
  selectedCriterionForReverse = signal<string>("sec4_24_credits");
  selectedJobForDetail = signal<JobRuleSummary | null>(null);

  /**
   * Helper to format criterion labels in French and English
   */
  getCriterionLabel(id: string, isFr: boolean): string {
    const crit = MANUAL_CRITERIA.find((c) => c.id === id);
    if (crit) {
      if (id === "des_12e_annee")
        return isFr ? "DES ou 12e année" : "High School Diploma or Grade 12";
      if (id === "sec4_24_credits")
        return isFr ? "Sec 4 (24 crédits) ou 10e année" : "Grade 10 (24 credits)";
      if (id === "aens")
        return isFr ? "AENS (Équivalence secondaire)" : "AENS (High school equivalency)";
      if (id === "francais_sec4_10e")
        return isFr ? "Français/Anglais de sec 4 ou 10e année" : "Grade 10 English/French";
      if (id === "francais_sec5_11e")
        return isFr ? "Français/Anglais de sec 5 ou 11e année" : "Grade 11 English/French";
      if (id === "anglais_sec5_12e")
        return isFr ? "Anglais de sec 5 / 12e année" : "Grade 12 / Sec 5 English";
      if (id === "sci_tech4_sci10")
        return isFr ? "Science et technologie de sec 4 ou 10e année" : "Grade 10 Science";
      if (id === "chimie_sec5_11e")
        return isFr ? "Chimie de sec 5 ou 11e année" : "Grade 11 Chemistry";
      if (id === "physique_sec5_11e")
        return isFr ? "Physique de sec 5 ou 11e année" : "Grade 11 Physics";
      return isFr ? crit.label : crit.labelEn || crit.label;
    }

    if (id === "base_math_10_gen")
      return isFr ? "Math de sec 4/10e (générales)" : "Grade 10 Math (General)";
    if (id === "base_math_10_app")
      return isFr ? "Math de sec 4/10e (appliquées)" : "Grade 10 Math (Applied)";
    if (id === "base_math_10_adv")
      return isFr ? "Math de sec 4/10e (avancées)" : "Grade 10 Math (Advanced)";
    if (id === "base_math_11_gen")
      return isFr ? "Math de sec 5/11e (générales)" : "Grade 11 Math (General)";
    if (id === "base_math_11_app")
      return isFr ? "Math de sec 5/11e (appliquées)" : "Grade 11 Math (Applied)";
    if (id === "base_math_11_adv")
      return isFr ? "Math de sec 5/11e (avancées)" : "Grade 11 Math (Advanced)";
    if (id === "base_math_12_gen")
      return isFr ? "Math de 12e (générales)" : "Grade 12 Math (General)";
    if (id === "base_math_12_app")
      return isFr ? "Math de 12e (appliquées)" : "Grade 12 Math (Applied)";
    if (id === "base_math_12_adv")
      return isFr ? "Math de 12e (avancées)" : "Grade 12 Math (Advanced)";

    return id;
  }

  /**
   * Complete Matrix of all 96 occupations and their precise logic requirements
   */
  readonly allJobsMatrix = computed<JobRuleSummary[]>(() => {
    return this.jobs.map((job) => {
      const jobId = job.id;
      const category: "NCM" | "Officer" = isOfficerJobId(jobId) ? "Officer" : "NCM";
      const element: MilitaryElement = JOB_ELEMENTS_MAP[jobId] || "CMP";
      const rule = this.rulesService.getTradeRule(jobId);
      const allowPR = rule ? rule.admissibleResidentPermanent : true;

      // Check extra tests required
      const extraTests: string[] = [];
      if (jobId === "00203") extraTests.push("ECE");
      if (jobId === "00207") extraTests.push("ESOM");
      if (jobId === "00214") extraTests.push("CEOPM");
      if (jobId === "00182" || jobId === "00183" || jobId === "00184")
        extraTests.push("CSPN");

      const requirements: JobLogicRequirement[] = [];
      if (rule) {
        const ex = rule.exigencesScolarite;
        if (ex.optionsAlternatives && ex.optionsAlternatives.length > 0) {
          for (const alt of ex.optionsAlternatives) {
            requirements.push({
              type: "customCheck",
              descriptionFr: `${alt.nomVoie} : ${alt.criteres.map((id: string) => this.getCriterionLabel(id, true)).join(" ET ")}`,
              descriptionEn: `${alt.nomVoie} : ${alt.criteres.map((id: string) => this.getCriterionLabel(id, false)).join(" AND ")}`,
              criterionIds: alt.criteres,
            });
          }
        } else if (ex.criteresCochesRequis && ex.criteresCochesRequis.length > 0) {
          const ids = ex.criteresCochesRequis.map((c: any) => c.id);
          requirements.push({
            type: "requiredIds",
            descriptionFr: ex.criteresCochesRequis.map((c: any) => c.label).join(" ET "),
            descriptionEn: ids.map((id: string) => this.getCriterionLabel(id, false)).join(" AND "),
            criterionIds: ids,
          });
        } else {
          requirements.push({
            type: "requiredIds",
            descriptionFr: ex.descriptionFr,
            descriptionEn: ex.descriptionEn,
            criterionIds: [],
          });
        }
      }

      // Calculate incompatible MEL count if available
      let melIncompatibleCount = 0;
      try {
        const matrix = this.melService.acceptabilityMatrix();
        for (const [melId, jobs] of Object.entries(matrix)) {
          if (!jobs[jobId]) {
            melIncompatibleCount++;
          }
        }
      } catch {
        melIncompatibleCount = 0;
      }

      return {
        jobId,
        titleFr: job.title,
        titleEn: job.titleEn || job.title,
        category,
        element,
        allowPR,
        requirements,
        extraTests,
        melIncompatibleCount,
      };
    });
  });

  /**
   * Filtered jobs based on user selection in UI
   */
  readonly filteredJobs = computed<JobRuleSummary[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const cat = this.categoryFilter();
    const elem = this.elementFilter();
    const cit = this.citizenshipFilter();

    return this.allJobsMatrix().filter((item) => {
      // Category filter (MR vs Officer)
      if (cat === "NCM" && item.category !== "NCM") return false;
      if (cat === "Officer" && item.category !== "Officer") return false;

      // Element filter (Armée, Air, Marine, CMP)
      if (elem !== "ALL" && item.element !== elem) return false;

      // Citizenship filter
      if (cit === "CC" && item.allowPR) return false;
      if (cit === "RP" && !item.allowPR) return false;

      // Search query
      if (query) {
        const matchId = item.jobId.toLowerCase().includes(query);
        const matchTitleFr = item.titleFr.toLowerCase().includes(query);
        const matchTitleEn = item.titleEn.toLowerCase().includes(query);
        const matchReq = item.requirements.some(
          (r) =>
            r.descriptionFr.toLowerCase().includes(query) ||
            r.descriptionEn.toLowerCase().includes(query)
        );
        if (!matchId && !matchTitleFr && !matchTitleEn && !matchReq) {
          return false;
        }
      }

      return true;
    });
  });

  /**
   * Reverse lookup: Given a criterion ID, determine which jobs it unlocks
   */
  getCriterionImpact(criterionId: string): CriterionImpactSummary {
    const crit = MANUAL_CRITERIA.find((c) => c.id === criterionId);
    const labelFr = crit ? crit.label : this.getCriterionLabel(criterionId, true);
    const labelEn = crit ? crit.labelEn || crit.label : this.getCriterionLabel(criterionId, false);
    const category = crit ? crit.category : "Préalable";

    const unlockedJobsDirect: { id: string; titleFr: string; titleEn: string }[] = [];
    const unlockedJobsCombined: {
      id: string;
      titleFr: string;
      titleEn: string;
      requiredOtherFr: string;
      requiredOtherEn: string;
    }[] = [];

    // Test 1: By itself
    const setSolo = new Set<string>([criterionId]);
    // Test 2: Combined with sec4
    const setSec4 = new Set<string>(["sec4_24_credits", criterionId]);
    // Test 3: Combined with DES
    const setDes = new Set<string>(["des_12e_annee", criterionId]);

    for (const job of this.jobs) {
      const jobId = job.id;
      const passedSolo = this.rulesService.checkJobEducationEligibility(jobId, setSolo).eligible;
      const passedSec4 = this.rulesService.checkJobEducationEligibility(jobId, setSec4).eligible;
      const passedDes = this.rulesService.checkJobEducationEligibility(jobId, setDes).eligible;

      if (passedSolo) {
        unlockedJobsDirect.push({
          id: jobId,
          titleFr: job.title,
          titleEn: job.titleEn || job.title,
        });
      } else if (passedSec4 && criterionId !== "sec4_24_credits") {
        unlockedJobsCombined.push({
          id: jobId,
          titleFr: job.title,
          titleEn: job.titleEn || job.title,
          requiredOtherFr: "Avec Sec 4 (24 crédits)",
          requiredOtherEn: "With Grade 10 (24 credits)",
        });
      } else if (passedDes && criterionId !== "des_12e_annee") {
        unlockedJobsCombined.push({
          id: jobId,
          titleFr: job.title,
          titleEn: job.titleEn || job.title,
          requiredOtherFr: "Avec DES / 12e année",
          requiredOtherEn: "With High School Diploma",
        });
      }
    }

    return {
      id: criterionId,
      labelFr,
      labelEn,
      category,
      unlockedJobsDirect,
      unlockedJobsCombined,
    };
  }

  /**
   * Reverse impact for currently selected criterion
   */
  readonly selectedCriterionImpact = computed<CriterionImpactSummary>(() => {
    return this.getCriterionImpact(this.selectedCriterionForReverse());
  });
}
