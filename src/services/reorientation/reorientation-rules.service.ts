import { Injectable, inject } from "@angular/core";
import REGLES_DATA from "../../../regles-reorientation.json";
import { MATH_COURSES } from "../../app/data/reorientation-criteria.data";
import { JobDatabaseService } from "../job-database.service";
import { MelService } from "../mel.service";

export interface TradeMedicalStandard {
  vision: number;
  visionCouleurs: number;
  ouie: number;
  geographique?: number;
  occupational?: number;
  aircrew?: number;
  special?: number;
}

export interface TradeRule {
  code: string;
  titreFr: string;
  titreEn: string;
  categorie: string;
  element: string;
  admissibleResidentPermanent: boolean;
  dureeContratInitial: string;
  dureeContratAnnees: number;
  ageMaximalAdmissibleEnrolement: number;
  standardMedicalMinimum: TradeMedicalStandard;
  exigencesScolarite: {
    typeLogique: string;
    descriptionFr: string;
    descriptionEn: string;
    criteresCochesRequis?: Array<{ id: string; label: string; categorie: string }>;
    optionsAlternatives?: Array<{ nomVoie: string; criteres: string[]; notes?: string }>;
    messageManquantFr: string;
    messageManquantEn: string;
  };
  conditionsSpeciales?: any;
  testsSelectionSupplementaires: {
    requis: boolean;
    nomTest: string | null;
  };
  preuvesDocumentsRequisDansCourriel?: string[];
  urlOfficielleForces?: { fr: string; en: string };
}

export interface JobEvaluationContext {
  age: number | null;
  citizenship: string;
  selectedCriteriaIds: Set<string>;
  hasMedicalLimitation: boolean;
  medicalV?: string;
  medicalCV?: string;
  medicalH?: string;
  ignoreSip: boolean;
  sipPhase: "admission" | "traitement" | "both";
  isDossierJob?: boolean;
  extraTestCtx?: any;
}

export interface EvaluatedAdmissibility {
  job: any;
  isEligible: boolean;
  isAgeAdmissible: boolean;
  ageReason: string;
  ageReasonEn: string;
  durationYears: number;
  maxAge: number;
  isCitizenshipAdmissible: boolean;
  citizenshipReason: string;
  citizenshipReasonEn: string;
  isEducationAdmissible: boolean;
  educationReason: string;
  educationReasonEn: string;
  isMedicalAdmissible: boolean;
  medicalReason: string;
  medicalReasonEn: string;
  isExtraTestRequired: boolean;
  isExtraTestAdmissible: boolean;
  extraTestName: string;
  extraTestReasonFr: string;
  extraTestReasonEn: string;
  isJobClosed: boolean;
  isClosedTraitement: boolean;
  isClosedAdmissionOnly: boolean;
}

@Injectable({
  providedIn: "root",
})
export class ReorientationRulesService {
  private jobService = inject(JobDatabaseService, { optional: true });
  private melService = inject(MelService, { optional: true });

  // Authoritative rules map from regles-reorientation.json
  readonly rawRules = REGLES_DATA as any;
  readonly tradeRulesMap = new Map<string, TradeRule>();

  // Flattened math courses with grade and difficulty
  private readonly mathCoursesList: Array<{ id: string; grade: number; diff: number }> = [];

  constructor() {
    for (const trade of this.rawRules.reglesMetiers as TradeRule[]) {
      this.tradeRulesMap.set(trade.code, trade);
    }

    for (const list of Object.values(MATH_COURSES) as any[]) {
      for (const c of list) {
        this.mathCoursesList.push({ id: c.id, grade: c.grade, diff: c.diff });
      }
    }
  }

  getTradeRule(jobId: string): TradeRule | undefined {
    if (!jobId) return undefined;
    const padded = jobId.trim().padStart(5, "0");
    return this.tradeRulesMap.get(padded);
  }

  isJobRp(jobId: string): boolean {
    const rule = this.getTradeRule(jobId);
    return rule ? rule.admissibleResidentPermanent : true;
  }

  getJobDurationYears(jobId: string): number {
    const rule = this.getTradeRule(jobId);
    return rule ? rule.dureeContratAnnees : 3;
  }

  getJobMaxAge(jobId: string): number {
    const rule = this.getTradeRule(jobId);
    return rule ? rule.ageMaximalAdmissibleEnrolement : 56;
  }

  getJobMedicalStandard(jobId: string): TradeMedicalStandard | null {
    const rule = this.getTradeRule(jobId);
    return rule ? rule.standardMedicalMinimum : null;
  }

  /**
   * Expands selected criteria by evaluating provincial math courses and cascading prerequisite credits.
   */
  expandSelectedCriteria(rawSelected: Set<string>): Set<string> {
    const selected = new Set(rawSelected);

    // Provincial math evaluation: grade >= G and diff >= D
    const selectedMaths = this.mathCoursesList.filter((m) => selected.has(m.id));
    const hasMath = (grade: number, diff: number) =>
      selectedMaths.some((m) => m.grade >= grade && m.diff >= diff);

    if (hasMath(10, 1)) selected.add("base_math_10_gen");
    if (hasMath(10, 2)) selected.add("base_math_10_app");
    if (hasMath(10, 3)) selected.add("base_math_10_adv");
    if (hasMath(11, 1)) selected.add("base_math_11_gen");
    if (hasMath(11, 2)) selected.add("base_math_11_app");
    if (hasMath(11, 3)) selected.add("base_math_11_adv");
    if (hasMath(12, 1)) selected.add("base_math_12_gen");
    if (hasMath(12, 2)) selected.add("base_math_12_app");
    if (hasMath(12, 3)) selected.add("base_math_12_adv");

    // DES / 12e année cascades
    if (selected.has("des_12e_annee") || selected.has("aens")) {
      selected.add("sec4_24_credits");
      selected.add("francais_sec4_10e");
      selected.add("francais_sec5_11e");
      selected.add("sci_tech4_sci10");
      selected.add("base_math_10_gen");
      selected.add("base_math_10_app");
    }

    if (selected.has("francais_sec5_11e")) {
      selected.add("francais_sec4_10e");
    }

    if (selected.has("anglais_sec5_12e")) {
      selected.add("francais_sec5_11e");
      selected.add("francais_sec4_10e");
    }

    if (selected.has("chimie_sec5_11e") || selected.has("physique_sec5_11e")) {
      selected.add("sci_tech4_sci10");
    }

    // Specialized courses and University degrees auto-cascade 24 credits of Sec 4
    let hasAnyCs = false;
    let hasAnyUniv = false;
    let hasAnyGenie = false;
    let hasAnyMaitrise = false;
    let hasAnyDoctorat = false;

    for (const id of selected) {
      if (id.startsWith("cs_")) hasAnyCs = true;
      if (id.startsWith("bacc_")) hasAnyUniv = true;
      if (id.startsWith("bacc_genie_")) hasAnyGenie = true;
      if (id.startsWith("maitrise_")) {
        hasAnyUniv = true;
        hasAnyMaitrise = true;
      }
      if (id.startsWith("doctorat_")) {
        hasAnyUniv = true;
        hasAnyDoctorat = true;
      }
    }

    if (hasAnyCs || hasAnyUniv) {
      selected.add("sec4_24_credits");
    }
    if (hasAnyUniv) {
      selected.add("univ_1er_cycle_global");
    }
    if (hasAnyGenie) {
      selected.add("univ_1er_cycle_genie");
    }
    if (hasAnyMaitrise) {
      selected.add("univ_cycle_sup_maitrise");
      selected.add("univ_cycle_sup_global");
    }
    if (hasAnyDoctorat) {
      selected.add("univ_cycle_sup_doctorat");
      selected.add("univ_cycle_sup_global");
    }

    return selected;
  }

  private matchCriterion(selected: Set<string>, critId: string): boolean {
    if (critId.endsWith("*")) {
      const prefix = critId.slice(0, -1);
      for (const id of selected) {
        if (id.startsWith(prefix)) return true;
      }
      return false;
    }
    return selected.has(critId);
  }

  /**
   * Evaluates academic eligibility of a trade based on checkboxes in the Scolarité panel.
   */
  checkJobEducationEligibility(
    jobId: string,
    rawSelected: Set<string>
  ): { eligible: boolean; missingFr: string; missingEn: string } {
    const hasEducationFilled = Array.from(rawSelected).some(
      (id) => !id.startsWith("exp_") && id !== "etude_anglais" && id !== "etude_hors_canada"
    );

    if (!hasEducationFilled) {
      return {
        eligible: false,
        missingFr: "Le panneau de scolarité n'a pas encore été rempli.",
        missingEn: "The education panel has not been filled yet.",
      };
    }

    const rule = this.getTradeRule(jobId);
    if (!rule) {
      return { eligible: true, missingFr: "", missingEn: "" };
    }

    const selected = this.expandSelectedCriteria(rawSelected);
    const ex = rule.exigencesScolarite;

    // 1. General University degrees (ETUDES_UNIVERSITAIRES_GENERALES)
    if (ex.typeLogique === "ETUDES_UNIVERSITAIRES_GENERALES") {
      const hasUniv =
        selected.has("univ_1er_cycle_global") ||
        Array.from(selected).some(
          (id) => id.startsWith("bacc_") || id.startsWith("maitrise_") || id.startsWith("doctorat_")
        );
      return {
        eligible: hasUniv,
        missingFr: ex.messageManquantFr,
        missingEn: ex.messageManquantEn,
      };
    }

    // 2. Special condition: Police Militaire (00161) with foreign studies
    if (rule.code === "00161" && selected.has("etude_hors_canada")) {
      const passed = selected.has("cs_tech_policieres");
      return {
        eligible: passed,
        missingFr: "DEC en techniques policières requis (études complétées hors Canada)",
        missingEn: "Police Technology diploma required (studies completed outside Canada)",
      };
    }

    // 3. Alternative pathways (optionsAlternatives)
    const alts = ex.optionsAlternatives || [];
    for (const alt of alts) {
      // If the alternative is a disjunctive list of degrees (bacc_*, maitrise_*, cs_*), ANY one satisfies it.
      const isDisjunctive =
        alt.criteres.length > 1 &&
        alt.criteres.every(
          (c) =>
            c.startsWith("bacc_") ||
            c.startsWith("maitrise_") ||
            c.startsWith("doctorat_") ||
            c.startsWith("cs_")
        );

      if (isDisjunctive) {
        if (alt.criteres.some((c) => this.matchCriterion(selected, c))) {
          return { eligible: true, missingFr: "", missingEn: "" };
        }
      } else {
        // Conjunctive: all criteria in this alternative are required (e.g. DES + Math + Science)
        if (alt.criteres.every((c) => this.matchCriterion(selected, c))) {
          return { eligible: true, missingFr: "", missingEn: "" };
        }
      }
    }

    // 4. Direct required criteria (criteresCochesRequis)
    if (ex.criteresCochesRequis && ex.criteresCochesRequis.length > 0) {
      const allDirect = ex.criteresCochesRequis.every((c) => this.matchCriterion(selected, c.id));
      if (allDirect) {
        return { eligible: true, missingFr: "", missingEn: "" };
      }
    }

    return {
      eligible: false,
      missingFr: ex.messageManquantFr,
      missingEn: ex.messageManquantEn,
    };
  }

  /**
   * Evaluates medical admissibility against candidate cotes V, CV, H and active MEL limitations.
   */
  checkJobMedicalEligibility(
    jobId: string,
    medicalV: string,
    medicalCV: string,
    medicalH: string
  ): { eligible: boolean; reasonFr: string; reasonEn: string } {
    const job = this.jobService.getJobById(jobId);
    if (!job || !job.medicalStandard) {
      return { eligible: true, reasonFr: "", reasonEn: "" };
    }

    const std = job.medicalStandard;
    const v = parseInt(medicalV || "1", 10);
    const cv = parseInt(medicalCV || "1", 10);
    const h = parseInt(medicalH || "1", 10);

    const stdV = typeof std.v === "number" ? std.v : parseInt(String(std.v), 10);
    const stdCV = typeof std.cv === "number" ? std.cv : parseInt(String(std.cv), 10);
    const stdH = typeof std.h === "number" ? std.h : parseInt(String(std.h), 10);

    if (v > stdV) {
      return {
        eligible: false,
        reasonFr: `Votre acuité visuelle (V${v}) dépasse la norme maximale permise pour ce métier (V${stdV}).`,
        reasonEn: `Your visual acuity (V${v}) exceeds the maximum standard permitted for this occupation (V${stdV}).`,
      };
    }

    if (cv > stdCV) {
      return {
        eligible: false,
        reasonFr: `Votre vision des couleurs (CV${cv}) dépasse la norme maximale permise pour ce métier (CV${stdCV}).`,
        reasonEn: `Your color vision (CV${cv}) exceeds the maximum standard permitted for this occupation (CV${stdCV}).`,
      };
    }

    if (h > stdH) {
      return {
        eligible: false,
        reasonFr: `Votre audition (H${h}) dépasse la norme maximale permise pour ce métier (H${stdH}).`,
        reasonEn: `Your hearing level (H${h}) exceeds the maximum standard permitted for this occupation (H${stdH}).`,
      };
    }

    // Check active MEL limitations
    if (this.melService) {
      const applicantLimitations = this.melService.applicantLimitations();
      for (const [melId, hasLim] of Object.entries(applicantLimitations)) {
        if (hasLim) {
          const isAcceptable = this.melService.isJobAcceptableForMel(melId, jobId);
          if (!isAcceptable) {
            return {
              eligible: false,
              reasonFr: `Ce métier est incompatible avec l'une de vos limitations d'emploi médicales (${melId}).`,
              reasonEn: `This occupation is incompatible with one of your medical employment limitations (${melId}).`,
            };
          }
        }
      }
    }

    return { eligible: true, reasonFr: "", reasonEn: "" };
  }

  /**
   * Full multicriteria evaluation following the 6 steps of regles-reorientation.json
   */
  evaluateJobAdmissibility(
    jobId: string,
    ctx: JobEvaluationContext
  ): EvaluatedAdmissibility | null {
    if (!jobId) return null;
    const job = this.jobService.getJobById(jobId);
    if (!job) return null;

    if (jobId === "00003") {
      return {
        job,
        isEligible: false,
        isAgeAdmissible: false,
        ageReason: "",
        ageReasonEn: "",
        durationYears: 3,
        maxAge: 56,
        isCitizenshipAdmissible: false,
        citizenshipReason: "",
        citizenshipReasonEn: "",
        isEducationAdmissible: false,
        educationReason: "",
        educationReasonEn: "",
        isMedicalAdmissible: false,
        medicalReason: "",
        medicalReasonEn: "",
        isExtraTestRequired: false,
        isExtraTestAdmissible: false,
        extraTestName: "",
        extraTestReasonFr: "",
        extraTestReasonEn: "",
        isJobClosed: false,
        isClosedTraitement: false,
        isClosedAdmissionOnly: false,
      };
    }

    const durationYears = this.getJobDurationYears(jobId);
    const maxAge = this.getJobMaxAge(jobId);

    // Step 3: Age evaluation
    let isAgeAdmissible = true;
    let ageReason = "";
    let ageReasonEn = "";

    if (ctx.age === null || ctx.age === undefined || ctx.age <= 0) {
      isAgeAdmissible = false;
      ageReason = "L'âge du postulant n'est pas encore renseigné.";
      ageReasonEn = "Applicant's age has not been entered yet.";
    } else if (ctx.age >= 57) {
      isAgeAdmissible = false;
      ageReason = "L'âge maximal d'admissibilité est de 56 ans (57 ans et plus est automatiquement inadmissible).";
      ageReasonEn = "Maximum eligibility age is 56 (57 and older is automatically ineligible).";
    } else if (ctx.age + durationYears >= 60 || ctx.age > maxAge) {
      isAgeAdmissible = false;
      ageReason = `Vous dépassez l'âge maximal d'admissibilité pour ce métier (${maxAge} ans avec un contrat de ${durationYears} ans).`;
      ageReasonEn = `You exceed the maximum eligibility age for this occupation (${maxAge} years with a ${durationYears}-year contract).`;
    }

    // Step 2: Citizenship evaluation
    let isCitizenshipAdmissible = true;
    let citizenshipReason = "";
    let citizenshipReasonEn = "";

    if (ctx.citizenship === "PR < 3 years") {
      isCitizenshipAdmissible = false;
      citizenshipReason = "Les résidents permanents de moins de trois ans ne sont pas admissibles aux Forces armées canadiennes.";
      citizenshipReasonEn = "Permanent residents with less than three years of residency are not eligible for the Canadian Armed Forces.";
    } else if (ctx.citizenship === "PR > 3 years") {
      const isRp = this.isJobRp(jobId);
      if (!isRp) {
        isCitizenshipAdmissible = false;
        citizenshipReason = "Ce métier est réservé aux citoyens canadiens uniquement (CC).";
        citizenshipReasonEn = "This occupation is restricted to Canadian citizens only (CC).";
      }
    }

    // Step 1: Education evaluation
    const eduRes = this.checkJobEducationEligibility(jobId, ctx.selectedCriteriaIds);
    const isEducationAdmissible = eduRes.eligible;
    const educationReason = eduRes.eligible ? "" : eduRes.missingFr;
    const educationReasonEn = eduRes.eligible ? "" : eduRes.missingEn;

    // Step 4: Medical evaluation
    let isMedicalAdmissible = true;
    let medicalReason = "";
    let medicalReasonEn = "";
    if (ctx.hasMedicalLimitation) {
      const medCheck = this.checkJobMedicalEligibility(
        jobId,
        ctx.medicalV || "",
        ctx.medicalCV || "",
        ctx.medicalH || ""
      );
      if (!medCheck.eligible) {
        isMedicalAdmissible = false;
        medicalReason = medCheck.reasonFr;
        medicalReasonEn = medCheck.reasonEn;
      }
    }

    // Step 5: Extra test evaluation
    let isExtraTestRequired = false;
    let isExtraTestAdmissible = true;
    let extraTestName = "";
    let extraTestReasonFr = "";
    let extraTestReasonEn = "";

    const rule = this.getTradeRule(jobId);
    if (rule?.testsSelectionSupplementaires.requis) {
      isExtraTestRequired = !!ctx.isDossierJob;
      extraTestName = rule.testsSelectionSupplementaires.nomTest || "";

      if (ctx.isDossierJob && ctx.extraTestCtx) {
        const testRes = ctx.extraTestCtx(jobId);
        if (testRes) {
          isExtraTestAdmissible = testRes.eligible;
          extraTestReasonFr = testRes.reasonFr;
          extraTestReasonEn = testRes.reasonEn;
        }
      }
    }

    // Step 6: SIP status
    const isClosedTraitementRaw = this.jobService.isJobClosed(jobId, "traitement");
    const isClosedAdmissionRaw = this.jobService.isJobClosed(jobId, "admission");
    const isClosedTraitement = isClosedTraitementRaw;
    const isClosedAdmissionOnly = isClosedAdmissionRaw && !isClosedTraitementRaw;
    const isJobClosed = isClosedTraitement || isClosedAdmissionOnly;

    const isEligible =
      isAgeAdmissible &&
      isCitizenshipAdmissible &&
      isEducationAdmissible &&
      isMedicalAdmissible &&
      isExtraTestAdmissible;

    return {
      job,
      isEligible,
      isAgeAdmissible,
      ageReason,
      ageReasonEn,
      durationYears,
      maxAge,
      isCitizenshipAdmissible,
      citizenshipReason,
      citizenshipReasonEn,
      isEducationAdmissible,
      educationReason,
      educationReasonEn,
      isMedicalAdmissible,
      medicalReason,
      medicalReasonEn,
      isExtraTestRequired,
      isExtraTestAdmissible,
      extraTestName,
      extraTestReasonFr,
      extraTestReasonEn,
      isJobClosed,
      isClosedTraitement,
      isClosedAdmissionOnly,
    };
  }
}
