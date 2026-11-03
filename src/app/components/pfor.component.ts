import { Component, computed, signal, inject, effect, untracked } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { JobDatabaseService } from "../../services/job-database.service";
import { SharedStateService } from "../../services/shared-state.service";
import { MelService } from "../../services/mel.service";
import { ReorientationCriteriaService } from "../../services/reorientation-criteria.service";
import { ScolariteExperienceComponent } from "./scolarite-experience.component";
import { JobEntry } from "../../services/jobs-data";
import { JOB_URLS } from "../data/job-urls.data";
import { MATH_COURSES } from "../data/reorientation-criteria.data";
import { CMR_JOB_DOMAINS } from "../data/reorientation-criteria.data";
export { CMR_JOB_DOMAINS };
import { generatePforNoteRegistry, buildPforGestionDesAttentesEmail } from "./pfor/pfor-note-attentes.generator";
import { getPforCmrMinMissingCriteriaFr, formatPforCmrMinCriteriaParagraphFr, getPforCmrMinMissingCriteriaEn, formatPforCmrMinCriteriaParagraphEn, buildPforCmrRefusalEmail } from "./pfor/pfor-refusal-email.generator";
import { buildPforBilingualEmail } from "./pfor/pfor-reo-email.generator";
import { TranslationService } from "../i18n";
import { PFOR_TEMPLATE } from "./pfor/pfor.template";

@Component({
  selector: "app-pfor",
  standalone: true,
  imports: [CommonModule, FormsModule, ScolariteExperienceComponent],
  host: { "(document:click)": "onDocumentClick($event)" },
  template: PFOR_TEMPLATE,
  styles: [],
})
export class PforComponent {
  jobService = inject(JobDatabaseService);
  sharedState = inject(SharedStateService);
  melService = inject(MelService);
  sanitizer = inject(DomSanitizer);
  reorientationCriteria = inject(ReorientationCriteriaService);
  i18n = inject(TranslationService);

  constructor() {
    effect(() => {
      if (!this.sharedState.isPostulantPfor()) {
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
      if (html.includes("Veuillez renseigner les critères")) {
        return;
      }
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
          this.resetAll();
        });
      }
    });
  }

  // Inputs & Signals
  age = signal<number | null>(18);
  citizenship = signal<string>("Canadian Citizen");
  pforType = signal<"cmr" | "civil">("cmr");

  cmrArts = signal<boolean>(false);
  cmrScience = signal<boolean>(false);
  cmrGenie = signal<boolean>(false);
  cmrRefused = signal<boolean>(false);
  cmrMinCriteriaNotMet = signal<boolean>(false);
  cmrNotYetEvaluated = signal<boolean>(false);

  selectedDossierJobId1 = signal<string>("");
  selectedDossierJobId2 = signal<string>("");
  selectedDossierJobId3 = signal<string>("");

  attentesJobsInDossier = computed(() => {
    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean).filter((id) => id !== "00003");
    return dossierIds.filter((id) => this.jobService.isJobInGestionDesAttentes(id));
  });

  isAttentesMode = computed(() => {
    return this.attentesJobsInDossier().length > 0;
  });

  attentesSituation = computed<1 | 2>(() => {
    const jobs = this.attentesJobsInDossier();
    for (const jId of jobs) {
      const pforStatus = this.jobService.getJobPforStatus(jId);
      // Situation 2: operation de traitement est ferme ('f')
      if (pforStatus && pforStatus.traitement === "f") {
        return 2;
      }
    }
    // Situation 1: operation d'admission est ouvert ou ferme et operation de traitement est ouvert ('o')
    return 1;
  });

  attentesSituationsNoteLabel = computed<string>(() => {
    const jobs = this.attentesJobsInDossier();
    const sits = Array.from(new Set(jobs.map((j) => this.getJobAttentesSituation(j))));
    if (sits.length === 0) return "Situation 1";
    if (sits.length === 1) return `Situation ${sits[0]}`;
    return `Situations ${sits.sort().join(" et ")}`;
  });

  attentesSituationsSummary = computed<string>(() => {
    const jobs = this.attentesJobsInDossier();
    const sits = Array.from(new Set(jobs.map((j) => this.getJobAttentesSituation(j))));
    if (sits.length === 0) return "Situation 1 : Traitement ouvert";
    if (sits.length === 1) {
      const s = sits[0];
      return `Situation ${s} : ${s === 1 ? "Traitement ouvert" : "Traitement fermé"}`;
    }
    return `Situations ${sits.sort().join(" & ")}`;
  });

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

  isCandidateTooOld = computed(() => {
    const ageVal = this.age();
    if (ageVal === null || ageVal <= 0) return false;
    if (ageVal > 56) return true;

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
    } else {
      // If no dossier jobs selected yet, check if age reaches limit for any standard PFOR job (min 10 ans => >= 50)
      if (ageVal >= 50) return true;
    }
    return false;
  });

  getJobAttentesSituation(jobId: string): 1 | 2 {
    const pforStatus = this.jobService.getJobPforStatus(jobId);
    if (pforStatus && pforStatus.traitement === "f") {
      return 2;
    }
    return 1;
  }

  getJobGestionDesAttentesReasonsFr(id: string): string[] {
    const reasons: string[] = [];
    if (this.jobService.isJobInGestionDesAttentes(id)) {
      const sit = this.getJobAttentesSituation(id);
      if (sit === 1) {
        reasons.push(
          "Malheureusement, toutes les places disponibles de ce métier ont été comblées. Bien que certaines places puissent se libérer si des candidats refusent leur offre, cela demeure peu probable en raison du nombre de candidats déjà admis.",
        );
      } else {
        reasons.push(
          "À l’heure actuelle, nous avons reçu suffisamment de candidatures pour combler les positions restantes de ce métier. Votre candidature ne peut donc pas progresser davantage pour le moment.",
        );
      }
      const s = this.evaluateJobAdmissibility(id);
      if (s && !s.isAgeAdmissible) {
        reasons.push(s.ageReason);
      }
      if (s && !s.isEducationAdmissible && s.educationReason) {
        reasons.push(s.educationReason);
      }
    } else {
      const s = this.evaluateJobAdmissibility(id);
      if (s) {
        if (s.isJobClosed) {
          reasons.push(
            "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).",
          );
        }
        if (!s.isAgeAdmissible) {
          reasons.push(s.ageReason);
        }
        if (!s.isCitizenshipAdmissible) {
          reasons.push(
            "Pour diverses raisons, ce métier n'est pas accessible aux résidents permanents.",
          );
        }
        if (!s.isEducationAdmissible) {
          reasons.push(s.educationReason);
        }
        if (!s.isMedicalAdmissible) {
          reasons.push(s.medicalReason);
        }
      }
    }
    return reasons;
  }

  getJobGestionDesAttentesReasonsEn(id: string): string[] {
    const reasons: string[] = [];
    if (this.jobService.isJobInGestionDesAttentes(id)) {
      const sit = this.getJobAttentesSituation(id);
      if (sit === 1) {
        reasons.push(
          "Unfortunately, all available positions in this occupation have been filled. While some positions may become available if candidates decline their offers, this remains unlikely given the number of applicants who have already been selected.",
        );
      } else {
        reasons.push(
          "At this time, we have received a sufficient number of applications to fill the remaining positions for this occupation. As a result, your application cannot proceed any further at this time.",
        );
      }
      const s = this.evaluateJobAdmissibility(id);
      if (s && !s.isAgeAdmissible) {
        reasons.push(s.ageReasonEn);
      }
      if (s && !s.isEducationAdmissible && s.educationReasonEn) {
        reasons.push(s.educationReasonEn);
      }
    } else {
      const s = this.evaluateJobAdmissibility(id);
      if (s) {
        if (s.isJobClosed) {
          reasons.push(
            "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).",
          );
        }
        if (!s.isAgeAdmissible) {
          reasons.push(s.ageReasonEn);
        }
        if (!s.isCitizenshipAdmissible) {
          reasons.push(
            "For various reasons, this occupation is not open to permanent residents.",
          );
        }
        if (!s.isEducationAdmissible) {
          reasons.push(s.educationReasonEn);
        }
        if (!s.isMedicalAdmissible) {
          reasons.push(s.medicalReasonEn);
        }
      }
    }
    return reasons;
  }

  getCmrAdmittedDomainsAttentesFr(): string {
    const parts: string[] = [];
    if (this.cmrArts()) parts.push("Sciences humaines et sociales");
    if (this.cmrGenie()) parts.push("Génie");
    if (this.cmrScience()) parts.push("Sciences");
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} et ${parts[1]}`;
    return `${parts[0]}, ${parts[1]} et ${parts[2]}`;
  }

  getCmrAdmittedDomainsAttentesEn(): string {
    const parts: string[] = [];
    if (this.cmrArts()) parts.push("Social Sciences and Humanities");
    if (this.cmrGenie()) parts.push("Engineering");
    if (this.cmrScience()) parts.push("Science");
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
    return `${parts[0]}, ${parts[1]} and ${parts[2]}`;
  }

  // Options
  showOptionsDropdown = signal<boolean>(false);
  ignoreSip = signal<boolean>(false);
  includeTraitement = signal<boolean>(false);
  hasMedicalLimitation = signal<boolean>(false);

  // Medical
  medicalV = signal<string>("2");
  medicalCV = signal<string>("2");
  medicalH = signal<string>("2");

  // Status feedback
  copied = signal<boolean>(false);
  noteCopied = signal<boolean>(false);

  readonly JOB_URLS = JOB_URLS;

  allPforJobs = computed(() => {
    return this.jobService.getAllJobs().filter((j) => {
      return this.jobService.isPforJob(j);
    });
  });

  currentSipPhase = computed<"admission" | "traitement" | "both">(() => {
    return this.includeTraitement() ? "both" : "admission";
  });

  activeHeaderOptionsCount = computed(() => {
    let count = 0;
    if (this.hasMedicalLimitation()) count++;
    return count;
  });

  onCmrNotYetEvaluatedChange(checked: boolean) {
    this.cmrNotYetEvaluated.set(checked);
    if (checked) {
      this.cmrRefused.set(false);
      this.cmrMinCriteriaNotMet.set(false);
      this.cmrArts.set(false);
      this.cmrScience.set(false);
      this.cmrGenie.set(false);
    }
  }

  onCmrRefusedChange(checked: boolean) {
    this.cmrRefused.set(checked);
    if (checked) {
      this.cmrNotYetEvaluated.set(false);
      this.cmrMinCriteriaNotMet.set(false);
      this.cmrArts.set(false);
      this.cmrScience.set(false);
      this.cmrGenie.set(false);
    }
  }

  onCmrMinCriteriaChange(checked: boolean) {
    this.cmrMinCriteriaNotMet.set(checked);
    if (checked) {
      this.cmrNotYetEvaluated.set(false);
      this.cmrRefused.set(false);
      this.cmrArts.set(false);
      this.cmrScience.set(false);
      this.cmrGenie.set(false);
    }
  }

  eligibleNcmEvaluation = computed(() => {
    return this.reorientationCriteria.evaluateEligibleNcmJobs({
      age: this.age(),
      citizenship: this.citizenship(),
      ignoreSip: this.ignoreSip(),
      currentSipPhase: this.currentSipPhase(),
      hasMedicalLimitation: this.hasMedicalLimitation(),
      medicalV: this.medicalV(),
      medicalCV: this.medicalCV(),
      medicalH: this.medicalH(),
    });
  });

  hasAgeInadmissibilityInDossier = computed(() => {
    const ageVal = this.age();
    if (ageVal === null || ageVal <= 0 || ageVal >= 57) return false;

    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean).filter((id) => id !== "00003");

    if (dossierIds.length > 0) {
      return dossierIds.some((id) => {
        const s = this.evaluateJobAdmissibility(id);
        return s && !s.isAgeAdmissible;
      });
    }

    return false;
  });

  showScolariteExperiencePanel = computed(() => {
    if (this.pforType() === "cmr" && (this.cmrRefused() || this.cmrMinCriteriaNotMet())) {
      return true;
    }

    const ageVal = this.age();
    if (ageVal !== null && ageVal > 0 && ageVal < 57) {
      if (this.isCandidateTooOld() || this.hasAgeInadmissibilityInDossier()) {
        return true;
      }
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
    if (this.cmrRefused() || this.cmrMinCriteriaNotMet()) {
      return true;
    }
    if (this.cmrNotYetEvaluated()) {
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

    if (this.pforType() === "cmr") {
      const hasCmrDomain =
        this.cmrArts() || this.cmrScience() || this.cmrGenie();
      return hasCmrDomain || this.eligiblePforJobs().length > 0;
    } else {
      return true;
    }
  });

  eligiblePforJobs = computed<JobEntry[]>(() => {
    if (this.citizenship() === "PR < 3 years") return [];
    const ageVal = this.age();
    if (ageVal !== null && (ageVal > 56 || ageVal >= 60)) return [];

    let candidateJobIds: string[] = [];

    if (this.pforType() === "cmr") {
      if (this.cmrRefused() || this.cmrMinCriteriaNotMet()) {
        return [];
      }

      if (this.cmrNotYetEvaluated()) {
        for (const [jId, cmrInfo] of Object.entries(CMR_JOB_DOMAINS)) {
          if ((cmrInfo.arts || cmrInfo.science || cmrInfo.genie) && !this.jobService.isJobInGestionDesAttentes(jId)) {
            candidateJobIds.push(jId);
          }
        }
      } else {
        const arts = this.cmrArts();
        const science = this.cmrScience();
        const genie = this.cmrGenie();

        if (!arts && !science && !genie) {
          return [];
        }

        for (const [jId, cmrInfo] of Object.entries(CMR_JOB_DOMAINS)) {
          const match =
            (arts && cmrInfo.arts) ||
            (science && cmrInfo.science) ||
            (genie && cmrInfo.genie);
          if (match) candidateJobIds.push(jId);
        }
      }
    } else {
      // PFOR Civil
      for (const j of this.jobService.getAllJobs()) {
        if (this.jobService.hasPforProgram(j.id, this.currentSipPhase())) {
          candidateJobIds.push(j.id);
        }
      }
    }

    const result: JobEntry[] = [];
    for (const jId of candidateJobIds) {
      if (this.citizenship() === "PR > 3 years" && !this.jobService.isJobRp(jId)) continue;
      if (!this.cmrNotYetEvaluated()) {
        if (!this.jobService.hasPforProgram(jId, this.currentSipPhase())) continue;
        if (!this.ignoreSip() && this.jobService.isPforJobClosed(jId, this.currentSipPhase())) continue;
      }

      const job = this.jobService.getJobById(jId);
      if (job) {
        if (ageVal !== null && ageVal > 0) {
          const durationYears = this.getJobContractDuration(jId);
          if (ageVal + durationYears >= 60) continue;
        }
        result.push(job);
      }
    }

    return result;
  });

  analyzedDossierChoices = computed(() => {
    const selectedIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter(Boolean);

    return selectedIds.map((id) => {
      const job = this.jobService.getJobById(id) || ({
        id,
        title: id,
        abbreviation: "",
      } as JobEntry);

      const hasPfor = this.jobService.hasPforProgram(id, this.currentSipPhase());
      const isPforClosed = this.jobService.isPforJobClosed(id, this.currentSipPhase());

      let isEligible = true;
      let reasonFr = "";
      let reasonEn = "";

      if (id === "00003") {
        return {
          job,
          isEligible: false,
          reasonFr: "Sans métier",
          reasonEn: "No occupation",
        };
      }

      const s = this.evaluateJobAdmissibility(id);

      if (this.citizenship() === "PR < 3 years") {
        isEligible = false;
        reasonFr = "Résident permanent de moins de 3 ans";
        reasonEn = "Permanent resident under 3 years";
      } else if (this.citizenship() === "PR > 3 years" && !this.jobService.isJobRp(id)) {
        isEligible = false;
        reasonFr = "Pour diverses raisons, ce métier n'est pas accessible aux résidents permanents.";
        reasonEn = "For various reasons, this occupation is not open to permanent residents.";
      } else if (s && !s.isAgeAdmissible) {
        isEligible = false;
        reasonFr = s.ageReason;
        reasonEn = s.ageReasonEn;
      } else if (this.pforType() === "cmr") {
        if (this.cmrNotYetEvaluated()) {
          const inAttentes = this.jobService.isJobInGestionDesAttentes(id);
          if (inAttentes) {
            isEligible = false;
            reasonFr = "Ce métier est considéré complet pour la présente année (gestion des attentes).";
            reasonEn = "This occupation is considered full for the current year (expectations management).";
          } else {
            isEligible = true;
          }
        } else if (this.cmrRefused()) {
          isEligible = false;
          reasonFr = "Candidat non admis au Collège militaire royal du Canada (CMR). Réorientation nécessaire.";
          reasonEn = "Candidate not admitted to the Royal Military College of Canada (RMC). Reorientation required.";
        } else if (this.cmrMinCriteriaNotMet()) {
          isEligible = false;
          reasonFr = "Critère minimal pour le PFOR non rencontré (DES requis). Réorientation nécessaire.";
          reasonEn = "Minimum requirement for ROTP not met (High school diploma required). Reorientation required.";
        } else {
          const cmrInfo = CMR_JOB_DOMAINS[id];
          if (!cmrInfo) {
            isEligible = false;
            reasonFr = "Ce métier n'est pas offert au CMR sous le PFOR.";
            reasonEn = "This occupation is not offered at RMC under ROTP.";
          } else {
          const arts = this.cmrArts();
          const science = this.cmrScience();
          const genie = this.cmrGenie();
          const match =
            (arts && cmrInfo.arts) ||
            (science && cmrInfo.science) ||
            (genie && cmrInfo.genie);

          if (!match) {
            isEligible = false;
            const reqFr = this.getCmrJobRequiredDomainsFr(id);
            const admFr = this.getCmrAdmittedDomainsFr();
            reasonFr = `Requiert admission au CMR en ${reqFr} (actuellement admis en : ${admFr || "aucun"}).`;
            reasonEn = `Requires admission to RMC in ${this.getCmrJobRequiredDomainsEn(id)}.`;
          } else if (!hasPfor || isPforClosed) {
            isEligible = false;
            reasonFr = "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).";
            reasonEn = "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).";
          }
        }
      }
    } else {
        // Civil
        const isCivilPfor = this.jobService.isPforCivilJob(id);
        if (!hasPfor && !isCivilPfor) {
          isEligible = false;
          reasonFr = "Ce métier ne comporte aucune position pour le PFOR Civil.";
          reasonEn = "No positions available for Civil ROTP.";
        } else if (isPforClosed) {
          isEligible = false;
          reasonFr = "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).";
          reasonEn = "There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).";
        }
      }

      return {
        job,
        isEligible,
        reasonFr,
        reasonEn,
      };
    });
  });

  needsReorientation = computed(() => {
    const choices = this.analyzedDossierChoices();
    if (choices.length === 0) return true;
    return choices.some((c) => !c.isEligible);
  });

  getCmrAdmittedDomainsNoteFr(): string {
    const domains: string[] = [];
    if (this.cmrArts()) domains.push("Arts");
    if (this.cmrScience()) domains.push("Sciences");
    if (this.cmrGenie()) domains.push("Génie");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} et ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} et ${domains[2]}`;
  }

  getCmrAdmittedDomainsFr(): string {
    const domains: string[] = [];
    if (this.cmrArts()) domains.push("Sciences humaines et sociales");
    if (this.cmrScience()) domains.push("Sciences");
    if (this.cmrGenie()) domains.push("Génie");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} et ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} et ${domains[2]}`;
  }

  getCmrAdmittedDomainsEn(): string {
    const domains: string[] = [];
    if (this.cmrArts()) domains.push("Social Sciences and Humanities");
    if (this.cmrScience()) domains.push("Science");
    if (this.cmrGenie()) domains.push("Engineering");
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

  toggleIgnoreSip() {
    this.ignoreSip.update((v) => !v);
  }

  toggleIncludeTraitement() {
    this.includeTraitement.update((v) => !v);
  }

  toggleMedicalLimitation() {
    this.hasMedicalLimitation.update((v) => !v);
  }

  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.showOptionsDropdown() && !target.closest(".pfor-options-dropdown-container")) {
      this.showOptionsDropdown.set(false);
    }
  }

  resetAll() {
    this.age.set(18);
    this.citizenship.set("Canadian Citizen");
    this.pforType.set("cmr");
    this.cmrArts.set(false);
    this.cmrScience.set(false);
    this.cmrGenie.set(false);
    this.cmrRefused.set(false);
    this.cmrMinCriteriaNotMet.set(false);
    this.cmrNotYetEvaluated.set(false);
    this.selectedDossierJobId1.set("");
    this.selectedDossierJobId2.set("");
    this.selectedDossierJobId3.set("");
    this.ignoreSip.set(false);
    this.includeTraitement.set(false);
    this.hasMedicalLimitation.set(false);
    this.reorientationCriteria.resetAll();
  }

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

  evaluateJobAdmissibility(jobId: string) {
    const job = this.jobService.getJobById(jobId);
    const isJobClosed = this.jobService.isPforJobClosed(jobId, this.currentSipPhase());
    
    const ageVal = this.age();
    let isAgeAdmissible = true;
    let ageReason = "";
    let ageReasonEn = "";

    const durationYears = this.getJobContractDuration(jobId);

    if (ageVal !== null && ageVal > 0) {
      if (ageVal >= 57) {
        isAgeAdmissible = false;
        ageReason = "L'âge maximal d'admissibilité est de 56 ans (57 ans et plus est automatiquement inadmissible).";
        ageReasonEn = "Maximum eligibility age is 56 (57 and older is automatically ineligible).";
      } else if (ageVal + durationYears >= 60) {
        isAgeAdmissible = false;
        ageReason = "Vous dépassez l'âge maximal d'admissibilité pour ce métier.";
        ageReasonEn = "You exceed the maximum eligibility age for this occupation.";
      }
    }

    let isCitizenshipAdmissible = true;
    if (this.citizenship() === "PR < 3 years") {
      isCitizenshipAdmissible = false;
    } else if (this.citizenship() === "PR > 3 years" && !this.jobService.isJobRp(jobId)) {
      isCitizenshipAdmissible = false;
    }

    let isEducationAdmissible = true;
    let educationReason = "";
    let educationReasonEn = "";

    if (this.pforType() === "cmr") {
      if (this.cmrRefused()) {
        isEducationAdmissible = false;
        educationReason = "Admissibilité refusée par le CMR pour le Programme de formation des officiers (PFOR).";
        educationReasonEn = "Admission refused by RMC for the Regular Officer Training Plan (ROTP).";
      } else if (this.cmrMinCriteriaNotMet()) {
        isEducationAdmissible = false;
        educationReason = "Critère minimal pour le PFOR non rencontré (diplôme d'études secondaires requis).";
        educationReasonEn = "Minimum requirement for ROTP not met (High school diploma required).";
      } else {
        const cmrInfo = CMR_JOB_DOMAINS[jobId];
        if (!cmrInfo) {
          isEducationAdmissible = false;
          educationReason = "Ce métier n'est pas offert au CMR sous le PFOR.";
          educationReasonEn = "This occupation is not offered at RMC under ROTP.";
        } else {
          const arts = this.cmrArts();
          const science = this.cmrScience();
          const genie = this.cmrGenie();
          const match =
            (arts && cmrInfo.arts) ||
            (science && cmrInfo.science) ||
            (genie && cmrInfo.genie);

          if (!match) {
            isEducationAdmissible = false;
            const reqFr = this.getCmrJobRequiredDomainsFr(jobId);
            const admFr = this.getCmrAdmittedDomainsFr();
            educationReason = `Requiert admission au CMR en ${reqFr} (actuellement admis en : ${admFr || "aucun"}).`;
            educationReasonEn = `Requires admission to RMC in ${this.getCmrJobRequiredDomainsEn(jobId)}.`;
          }
        }
      }
    } else {
      // Civil
      const hasPfor = this.jobService.hasPforProgram(jobId, this.currentSipPhase());
      const isCivilPfor = this.jobService.isPforCivilJob(jobId);
      if (!hasPfor && !isCivilPfor) {
        isEducationAdmissible = false;
        educationReason = "Ce métier ne comporte aucune position pour le PFOR Civil.";
        educationReasonEn = "No positions available for Civil ROTP.";
      }
    }

    let isMedicalAdmissible = true;
    const medicalReason = "Votre profil médical actuel ne rencontre pas le standard minimal pour ce métier.";
    const medicalReasonEn = "Your current medical profile does not meet the minimum requirement for this occupation.";

    if (this.hasMedicalLimitation() && job && job.medicalStandard) {
      const reqV = job.medicalStandard.v;
      const reqCV = job.medicalStandard.cv;
      const reqH = job.medicalStandard.h;
      const userV = parseInt(this.medicalV(), 10);
      const userCV = parseInt(this.medicalCV(), 10);
      const userH = parseInt(this.medicalH(), 10);

      if (!isNaN(reqV) && !isNaN(userV) && userV > reqV) isMedicalAdmissible = false;
      if (!isNaN(reqCV) && !isNaN(userCV) && userCV > reqCV) isMedicalAdmissible = false;
      if (!isNaN(reqH) && !isNaN(userH) && userH > reqH) isMedicalAdmissible = false;
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

  generateNoteRegistry(): string {
    return generatePforNoteRegistry.call(this);
  }

  async copyNoteRegistry() {
    const text = this.generateNoteRegistry();
    try {
      await navigator.clipboard.writeText(text);
      this.noteCopied.set(true);
      setTimeout(() => this.noteCopied.set(false), 2000);
    } catch (err) {
      console.error("Failed to copy note", err);
    }
  }

  buildGestionDesAttentesEmail(isHtml: boolean): string {
    return buildPforGestionDesAttentesEmail.call(this, isHtml);
  }

  getCmrMinMissingCriteriaFr(): string[] {
    return getPforCmrMinMissingCriteriaFr.call(this);
  }

  formatCmrMinCriteriaParagraphFr(): string {
    return formatPforCmrMinCriteriaParagraphFr.call(this);
  }

  getCmrMinMissingCriteriaEn(): string[] {
    return getPforCmrMinMissingCriteriaEn.call(this);
  }

  formatCmrMinCriteriaParagraphEn(): string {
    return formatPforCmrMinCriteriaParagraphEn.call(this);
  }

  buildCmrRefusalEmail(isHtml: boolean): string {
    return buildPforCmrRefusalEmail.call(this, isHtml);
  }

  buildBilingualEmail(isHtml: boolean): string {
    return buildPforBilingualEmail.call(this, isHtml);
  }

  getReoContentHtmlFr(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.buildBilingualEmail(true),
    );
  }

  async exportToOutlook() {
    const html = this.buildBilingualEmail(true);
    const plain = this.buildBilingualEmail(false);
    const subject = this.i18n.t('subject.candidate_email_outlook');

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const typeHtml = "text/html";
        const typeText = "text/plain";
        const blobHtml = new Blob([html], { type: typeHtml });
        const blobText = new Blob([plain], { type: typeText });
        const data = [
          new ClipboardItem({
            [typeHtml]: blobHtml,
            [typeText]: blobText,
          }),
        ];
        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(plain);
      }
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);

      // Open email client (Outlook)
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoLink;
    } catch (err) {
      console.error("Failed to export PFOR email to Outlook", err);
    }
  }

  async copyBilingualEmail() {
    return this.exportToOutlook();
  }
}
