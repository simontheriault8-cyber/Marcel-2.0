import { Injectable, inject } from "@angular/core";
import { JobDatabaseService } from "./job-database.service";
import { CMR_JOB_DOMAINS } from "../app/data/cmr-domains.data";

export interface PforAdmissibilityContext {
  age: number | null;
  citizenship: string;
  pforType: string;
  cmrRefused: boolean;
  cmrMinCriteriaNotMet: boolean;
  cmrArts: boolean;
  cmrScience: boolean;
  cmrGenie: boolean;
  currentSipPhase: 'admission' | 'traitement' | 'both';
  hasMedicalLimitation: boolean;
  medicalV: string;
  medicalCV: string;
  medicalH: string;
}

export interface JobAdmissibilityResult {
  isJobClosed: boolean;
  isAgeAdmissible: boolean;
  isCitizenshipAdmissible: boolean;
  isEducationAdmissible: boolean;
  isMedicalAdmissible: boolean;
  isExtraTestRequired: boolean;
  isExtraTestAdmissible: boolean;
  educationReason: string;
  educationReasonEn: string;
  medicalReason: string;
  medicalReasonEn: string;
  extraTestReasonFr: string;
  extraTestReasonEn: string;
  durationYears: number;
  ageReason: string;
  ageReasonEn: string;
}

@Injectable({
  providedIn: "root",
})
export class PforAdmissibilityService {
  private jobService = inject(JobDatabaseService);

  getJobContractDuration(jobId: string): number {
    const job = this.jobService.getJobById(jobId);
    if (!job || !job.contracts || job.contracts.length === 0) return 10;
    const pforContract =
      job.contracts.find((c) => (c.program || "").toUpperCase().includes("PFOR")) ||
      job.contracts[0];

    if (pforContract && pforContract.duration) {
      const match = pforContract.duration.match(/(\d+)\s*an/);
      if (match) return parseInt(match[1], 10);
    }
    return 10;
  }

  getJobAttentesSituation(jobId: string): 1 | 2 {
    const pforStatus = this.jobService.getJobPforStatus(jobId);
    if (pforStatus && pforStatus.traitement === "f") {
      return 2;
    }
    return 1;
  }

  evaluateJobAdmissibility(
    jobId: string,
    ctx: PforAdmissibilityContext
  ): JobAdmissibilityResult {
    const job = this.jobService.getJobById(jobId);
    const isJobClosed = this.jobService.isPforJobClosed(jobId, ctx.currentSipPhase);

    const ageVal = ctx.age;
    let isAgeAdmissible = true;
    let ageReason = "";
    let ageReasonEn = "";

    const durationYears = this.getJobContractDuration(jobId);

    if (ageVal !== null && ageVal > 0) {
      if (ageVal >= 57) {
        isAgeAdmissible = false;
        ageReason =
          "L'âge maximal d'admissibilité est de 56 ans (57 ans et plus est automatiquement inadmissible).";
        ageReasonEn =
          "Maximum eligibility age is 56 (57 and older is automatically ineligible).";
      } else if (ageVal + durationYears >= 60) {
        isAgeAdmissible = false;
        ageReason = "Vous dépassez l'âge maximal d'admissibilité pour ce métier.";
        ageReasonEn =
          "You exceed the maximum eligibility age for this occupation.";
      }
    }

    let isCitizenshipAdmissible = true;
    if (ctx.citizenship === "PR < 3 years") {
      isCitizenshipAdmissible = false;
    } else if (
      ctx.citizenship === "PR > 3 years" &&
      !this.jobService.isJobRp(jobId)
    ) {
      isCitizenshipAdmissible = false;
    }

    let isEducationAdmissible = true;
    let educationReason = "";
    let educationReasonEn = "";

    if (ctx.pforType === "cmr") {
      if (ctx.cmrRefused) {
        isEducationAdmissible = false;
        educationReason =
          "Admissibilité refusée par le CMR pour le Programme de formation des officiers (PFOR).";
        educationReasonEn =
          "Admission refused by RMC for the Regular Officer Training Plan (ROTP).";
      } else if (ctx.cmrMinCriteriaNotMet) {
        isEducationAdmissible = false;
        educationReason =
          "Critère minimal pour le PFOR non rencontré (diplôme d'études secondaires requis).";
        educationReasonEn =
          "Minimum requirement for ROTP not met (High school diploma required).";
      } else {
        const cmrInfo = CMR_JOB_DOMAINS[jobId];
        if (!cmrInfo) {
          isEducationAdmissible = false;
          educationReason = "Ce métier n'est pas offert au CMR sous le PFOR.";
          educationReasonEn = "This occupation is not offered at RMC under ROTP.";
        } else {
          const arts = ctx.cmrArts;
          const science = ctx.cmrScience;
          const genie = ctx.cmrGenie;
          const match =
            (arts && cmrInfo.arts) ||
            (science && cmrInfo.science) ||
            (genie && cmrInfo.genie);

          if (!match) {
            isEducationAdmissible = false;
            const reqFr = this.getCmrJobRequiredDomainsFr(jobId);
            const admFr = this.getCmrAdmittedDomainsFr(arts, science, genie);
            educationReason = `Requiert admission au CMR en ${reqFr} (actuellement admis en : ${admFr || "aucun"}).`;
            educationReasonEn = `Requires admission to RMC in ${this.getCmrJobRequiredDomainsEn(jobId)}.`;
          }
        }
      }
    } else {
      // Civil
      const hasPfor = this.jobService.hasPforProgram(
        jobId,
        ctx.currentSipPhase
      );
      if (!hasPfor) {
        isEducationAdmissible = false;
        educationReason =
          "Ce métier ne comporte aucune position pour le PFOR Civil.";
        educationReasonEn = "No positions available for Civil ROTP.";
      }
    }

    let isMedicalAdmissible = true;
    const medicalReason =
      "Votre profil médical actuel ne rencontre pas le standard minimal pour ce métier.";
    const medicalReasonEn =
      "Your current medical profile does not meet the minimum requirement for this occupation.";

    if (ctx.hasMedicalLimitation && job && job.medicalStandard) {
      const reqV = job.medicalStandard.v;
      const reqCV = job.medicalStandard.cv;
      const reqH = job.medicalStandard.h;
      const userV = parseInt(ctx.medicalV, 10);
      const userCV = parseInt(ctx.medicalCV, 10);
      const userH = parseInt(ctx.medicalH, 10);

      if (!isNaN(reqV) && !isNaN(userV) && userV > reqV)
        isMedicalAdmissible = false;
      if (!isNaN(reqCV) && !isNaN(userCV) && userCV > reqCV)
        isMedicalAdmissible = false;
      if (!isNaN(reqH) && !isNaN(userH) && userH > reqH)
        isMedicalAdmissible = false;
    }

    return {
      isJobClosed,
      isAgeAdmissible,
      isCitizenshipAdmissible,
      isEducationAdmissible,
      isMedicalAdmissible,
      isExtraTestRequired: false,
      isExtraTestAdmissible: true,
      educationReason,
      educationReasonEn,
      medicalReason,
      medicalReasonEn,
      extraTestReasonFr: "",
      extraTestReasonEn: "",
      durationYears,
      ageReason,
      ageReasonEn,
    };
  }

  getJobGestionDesAttentesReasonsFr(
    id: string,
    evalResult: JobAdmissibilityResult
  ): string[] {
    const reasons: string[] = [];
    if (this.jobService.isJobInGestionDesAttentes(id)) {
      const sit = this.getJobAttentesSituation(id);
      if (sit === 1) {
        reasons.push(
          "Malheureusement, toutes les places disponibles de ce métier ont été comblées. Bien que certaines places puissent se libérer si des candidats refusent leur offre, cela demeure peu probable en raison du nombre de candidats déjà admis."
        );
      } else {
        reasons.push(
          "À l’heure actuelle, nous avons reçu suffisamment de candidatures pour combler les positions restantes de ce métier. Votre candidature ne peut donc pas progresser davantage pour le moment."
        );
      }
      if (evalResult && !evalResult.isAgeAdmissible) {
        reasons.push(evalResult.ageReason);
      }
      if (
        evalResult &&
        !evalResult.isEducationAdmissible &&
        evalResult.educationReason
      ) {
        reasons.push(evalResult.educationReason);
      }
    } else {
      if (evalResult) {
        if (evalResult.isJobClosed) {
          reasons.push(
            "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR)."
          );
        }
        if (!evalResult.isAgeAdmissible) {
          reasons.push(evalResult.ageReason);
        }
        if (!evalResult.isCitizenshipAdmissible) {
          reasons.push(
            "Pour diverses raisons, ce métier n'est pas accessible aux résidents permanents."
          );
        }
        if (!evalResult.isEducationAdmissible) {
          reasons.push(evalResult.educationReason);
        }
        if (!evalResult.isMedicalAdmissible) {
          reasons.push(evalResult.medicalReason);
        }
      }
    }
    return reasons;
  }

  getJobGestionDesAttentesReasonsEn(
    id: string,
    evalResult: JobAdmissibilityResult
  ): string[] {
    const reasons: string[] = [];
    if (this.jobService.isJobInGestionDesAttentes(id)) {
      const sit = this.getJobAttentesSituation(id);
      if (sit === 1) {
        reasons.push(
          "Unfortunately, all available positions in this occupation have been filled. While some positions may become available if candidates decline their offers, this remains unlikely given the number of applicants who have already been selected."
        );
      } else {
        reasons.push(
          "At this time, we have received a sufficient number of applications to fill the remaining positions for this occupation. As a result, your application cannot proceed any further at this time."
        );
      }
      if (evalResult && !evalResult.isAgeAdmissible) {
        reasons.push(evalResult.ageReasonEn);
      }
      if (
        evalResult &&
        !evalResult.isEducationAdmissible &&
        evalResult.educationReasonEn
      ) {
        reasons.push(evalResult.educationReasonEn);
      }
    } else {
      if (evalResult) {
        if (evalResult.isJobClosed) {
          reasons.push(
            "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP)."
          );
        }
        if (!evalResult.isAgeAdmissible) {
          reasons.push(evalResult.ageReasonEn);
        }
        if (!evalResult.isCitizenshipAdmissible) {
          reasons.push(
            "For various reasons, this occupation is not open to permanent residents."
          );
        }
        if (!evalResult.isEducationAdmissible) {
          reasons.push(evalResult.educationReasonEn);
        }
        if (!evalResult.isMedicalAdmissible) {
          reasons.push(evalResult.medicalReasonEn);
        }
      }
    }
    return reasons;
  }

  getCmrAdmittedDomainsAttentesFr(
    arts: boolean,
    genie: boolean,
    science: boolean
  ): string {
    const parts: string[] = [];
    if (arts) parts.push("Sciences humaines et sociales");
    if (genie) parts.push("Génie");
    if (science) parts.push("Sciences");
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} et ${parts[1]}`;
    return `${parts[0]}, ${parts[1]} et ${parts[2]}`;
  }

  getCmrAdmittedDomainsAttentesEn(
    arts: boolean,
    genie: boolean,
    science: boolean
  ): string {
    const parts: string[] = [];
    if (arts) parts.push("Social Sciences and Humanities");
    if (genie) parts.push("Engineering");
    if (science) parts.push("Science");
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
    return `${parts[0]}, ${parts[1]} and ${parts[2]}`;
  }

  getCmrAdmittedDomainsNoteFr(
    arts: boolean,
    science: boolean,
    genie: boolean
  ): string {
    const domains: string[] = [];
    if (arts) domains.push("Arts");
    if (science) domains.push("Sciences");
    if (genie) domains.push("Génie");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} et ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} et ${domains[2]}`;
  }

  getCmrAdmittedDomainsFr(
    arts: boolean,
    science: boolean,
    genie: boolean
  ): string {
    const domains: string[] = [];
    if (arts) domains.push("Sciences humaines et sociales");
    if (science) domains.push("Sciences");
    if (genie) domains.push("Génie");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} et ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} et ${domains[2]}`;
  }

  getCmrAdmittedDomainsEn(
    arts: boolean,
    science: boolean,
    genie: boolean
  ): string {
    const domains: string[] = [];
    if (arts) domains.push("Social Sciences and Humanities");
    if (science) domains.push("Science");
    if (genie) domains.push("Engineering");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} and ${domains[1]}`;
    return `${domains[0]}, ${domains[1]}, and ${domains[2]}`;
  }

  getCmrJobRequiredDomainsFr(jobId: string): string {
    const cmrInfo = CMR_JOB_DOMAINS[jobId];
    if (!cmrInfo) return "";
    const domains: string[] = [];
    if (cmrInfo.arts) domains.push("Sciences humaines et sociales");
    if (cmrInfo.science) domains.push("Sciences");
    if (cmrInfo.genie) domains.push("Génie");
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} ou ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} ou ${domains[2]}`;
  }

  getCmrJobRequiredDomainsEn(jobId: string): string {
    const cmrInfo = CMR_JOB_DOMAINS[jobId];
    if (!cmrInfo) return "";
    const domains: string[] = [];
    if (cmrInfo.arts) domains.push("Social Sciences and Humanities");
    if (cmrInfo.science) domains.push("Science");
    if (cmrInfo.genie) domains.push("Engineering");
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} or ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} or ${domains[2]}`;
  }
}
