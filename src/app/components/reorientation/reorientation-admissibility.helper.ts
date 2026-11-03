import { MEL_LIMITATIONS } from "../../../services/mel.service";
import { CMR_JOB_DOMAINS } from "../../data/reorientation-criteria.data";

export function computeReoEligibleJobs(this: any): string[] {
    const citizenship = this.citizenship();
    const ageVal = this.age();

    if (this.isPforApplicant()) {
      if (citizenship === "PR < 3 years") return [];

      const candidateJobIds: string[] = [];
      if (this.pforType() === "cmr") {
        const arts = this.cmrArts();
        const science = this.cmrScience();
        const genie = this.cmrGenie();
        const hasDossierJob = !!(
          this.selectedDossierJobId1() ||
          this.selectedDossierJobId2() ||
          this.selectedDossierJobId3()
        );
        if ((!arts && !science && !genie) || !hasDossierJob) return [];

        for (const [jId, cmrInfo] of Object.entries(CMR_JOB_DOMAINS)) {
          const match =
            (arts && cmrInfo.arts) ||
            (science && cmrInfo.science) ||
            (genie && cmrInfo.genie);
          if (match) {
            candidateJobIds.push(jId);
          }
        }
      } else {
        for (const j of this.jobService.getAllJobs()) {
          if (this.jobService.hasPforProgram(j.id, this.currentSipPhase())) {
            candidateJobIds.push(j.id);
          }
        }
      }

      const result = new Set<string>();
      for (const jId of candidateJobIds) {
        if (!this.jobService.hasPforProgram(jId, this.currentSipPhase())) continue;
        if (!this.isJobMedicalAdmissible(jId)) continue;
        if (!this.isJobExtraTestAdmissible(jId)) continue;
        if (citizenship === "PR > 3 years" && !this.jobService.isJobRp(jId))
          continue;
        if (!this.ignoreSip() && this.jobService.isPforJobClosed(jId, this.currentSipPhase()))
          continue;

        if (ageVal !== null && ageVal > 0) {
          if (ageVal >= 57) continue;
          const job = this.jobService.getAllJobs().find((j) => j.id === jId);
          if (job) {
            const firstContract =
              job.contracts && job.contracts.length > 0
                ? job.contracts[0]
                : null;
            const durationYears = firstContract
              ? firstContract.duration.match(/(\d+)\s*an/)
                ? parseInt(firstContract.duration.match(/(\d+)\s*an/)![1], 10)
                : 3
              : 3;
            if (ageVal + durationYears >= 60) continue;
          }
        }

        result.add(jId);
      }

      return Array.from(result).sort((a, b) => a.localeCompare(b));
    }

    const rawSelected = this.selectedCriteriaIds();
    if (rawSelected.size === 0) return [];

    // Process implications
    const selected = new Set(rawSelected);

    // Evaluate if user meets base math conditions based on selected province math courses.
    const allMathOptions = (Object.values(this.MATH_COURSES) as any[]).reduce(
      (acc: any[], courses: any) => acc.concat(courses),
      [],
    );
    const selectedMaths = allMathOptions.filter((m) => selected.has(m.id));

    // To meet a grade + difficulty, you need ANY course with AT LEAST that grade, AND AT LEAST that diff.
    const hasMath = (grade: number, diff: number) => {
      return selectedMaths.some((m) => m.grade >= grade && m.diff >= diff);
    };

    if (hasMath(10, 1)) selected.add("base_math_10_gen");
    if (hasMath(10, 2)) selected.add("base_math_10_app");
    if (hasMath(10, 3)) selected.add("base_math_10_adv");
    if (hasMath(11, 1)) selected.add("base_math_11_gen");
    if (hasMath(11, 2)) selected.add("base_math_11_app");
    if (hasMath(11, 3)) selected.add("base_math_11_adv");
    if (hasMath(12, 1)) selected.add("base_math_12_gen");
    if (hasMath(12, 2)) selected.add("base_math_12_app");
    if (hasMath(12, 3)) selected.add("base_math_12_adv");

    // If PR < 3 years, they are not admissible to the Canadian Armed Forces at all.
    if (citizenship === "PR < 3 years") {
      return [];
    }

    const jobs = new Set<string>();
    const coursSpecialisesIds = this.criteriaCoursSpecialise().map((c) => c.id);

    for (const rule of this.jobRules) {
      let meetsRule = false;
      if (rule.customCheck) {
        const checkResult = rule.customCheck(selected, coursSpecialisesIds);
        meetsRule = typeof checkResult === "boolean" ? checkResult : checkResult.passed;
      } else if (
        rule.requiredCriteriaIds &&
        rule.requiredCriteriaIds.length > 0
      ) {
        meetsRule = rule.requiredCriteriaIds.every((id) => this.hasCriterion(selected, id));
      }

      if (meetsRule) {
        for (const jId of rule.jobs) {
          // Check medical limitation
          if (!this.isJobMedicalAdmissible(jId)) {
            continue;
          }

          // Check extra test eligibility
          if (!this.isJobExtraTestAdmissible(jId)) {
            continue;
          }

          // Under PR > 3 years, only RP-eligible jobs are permitted.
          if (citizenship === "PR > 3 years" && !this.jobService.isJobRp(jId)) {
            continue;
          }

          // Exclude closed (SIP) jobs
          if (!this.ignoreSip() && this.jobService.isJobClosed(jId, this.currentSipPhase())) {
            continue;
          }

          // Age qualification logic:
          // Maximum enrollment age is 56 (57+ automatically ineligible).
          // Contract duration formula: Admissible = 59 - duration or less (Inadmissible = 60 - duration or more).
          if (ageVal !== null && ageVal > 0) {
            if (ageVal >= 57) {
              continue;
            }
            const job = this.jobService.getAllJobs().find((j) => j.id === jId);
            if (job) {
              const firstContract =
                job.contracts && job.contracts.length > 0
                  ? job.contracts[0]
                  : null;
              const durationYears = firstContract
                ? firstContract.duration.match(/(\d+)\s*an/)
                  ? parseInt(firstContract.duration.match(/(\d+)\s*an/)![1], 10)
                  : 3
                : 3;
              if (ageVal + durationYears >= 60) {
                continue;
              }
            } else {
              if (ageVal + 3 >= 60) {
                continue;
              }
            }
          }

          jobs.add(jId);
        }
      }
    }

    return Array.from(jobs).sort((a, b) => a.localeCompare(b));
}

export function computeReoJobsExcludedByAge(this: any): string[] {
    const citizenship = this.citizenship();
    const ageVal = this.age();
    if (ageVal === null || ageVal <= 0) return [];

    if (this.isPforApplicant()) {
      if (citizenship === "PR < 3 years") return [];

      const candidateJobIds: string[] = [];
      if (this.pforType() === "cmr") {
        const arts = this.cmrArts();
        const science = this.cmrScience();
        const genie = this.cmrGenie();
        const hasDossierJob = !!(
          this.selectedDossierJobId1() ||
          this.selectedDossierJobId2() ||
          this.selectedDossierJobId3()
        );
        if ((!arts && !science && !genie) || !hasDossierJob) return [];

        for (const [jId, cmrInfo] of Object.entries(CMR_JOB_DOMAINS)) {
          const match =
            (arts && cmrInfo.arts) ||
            (science && cmrInfo.science) ||
            (genie && cmrInfo.genie);
          if (match) candidateJobIds.push(jId);
        }
      } else {
        for (const j of this.jobService.getAllJobs()) {
          if (this.jobService.hasPforProgram(j.id, this.currentSipPhase())) {
            candidateJobIds.push(j.id);
          }
        }
      }

      const excluded = [];
      for (const jId of candidateJobIds) {
        if (!this.jobService.hasPforProgram(jId, this.currentSipPhase())) continue;
        if (citizenship === "PR > 3 years" && !this.jobService.isJobRp(jId)) continue;
        if (!this.ignoreSip() && this.jobService.isPforJobClosed(jId, this.currentSipPhase())) continue;

        const job = this.jobService.getAllJobs().find((j) => j.id === jId);
        if (job) {
          const firstContract =
            job.contracts && job.contracts.length > 0 ? job.contracts[0] : null;
          const durationYears = firstContract
            ? firstContract.duration.match(/(\d+)\s*an/)
              ? parseInt(firstContract.duration.match(/(\d+)\s*an/)![1], 10)
              : 3
            : 3;

          if (ageVal > 56 || ageVal + durationYears >= 60) {
            excluded.push({
              id: job.id,
              title: job.title,
              duration: durationYears,
              requiredAge: Math.min(56, 59 - durationYears),
            });
          }
        }
      }
      return excluded.sort((a, b) => a.id.localeCompare(b.id));
    }

    const rawSelected = this.selectedCriteriaIds();
    if (rawSelected.size === 0) return [];

    const selected = new Set(rawSelected);
    const allMathOptions = (Object.values(this.MATH_COURSES) as any[]).reduce(
      (acc: any[], courses: any) => acc.concat(courses),
      [],
    );
    const selectedMaths = allMathOptions.filter((m) => selected.has(m.id));

    const hasMath = (grade: number, diff: number) => {
      return selectedMaths.some((m) => m.grade >= grade && m.diff >= diff);
    };

    if (hasMath(10, 1)) selected.add("base_math_10_gen");
    if (hasMath(10, 2)) selected.add("base_math_10_app");
    if (hasMath(10, 3)) selected.add("base_math_10_adv");
    if (hasMath(11, 1)) selected.add("base_math_11_gen");
    if (hasMath(11, 2)) selected.add("base_math_11_app");
    if (hasMath(11, 3)) selected.add("base_math_11_adv");
    if (hasMath(12, 1)) selected.add("base_math_12_gen");
    if (hasMath(12, 2)) selected.add("base_math_12_app");
    if (hasMath(12, 3)) selected.add("base_math_12_adv");

    if (citizenship === "PR < 3 years") {
      return [];
    }

    const excluded = [];
    const coursSpecialisesIds = this.criteriaCoursSpecialise().map((c) => c.id);

    for (const rule of this.jobRules) {
      let meetsRule = false;
      if (rule.customCheck) {
        const checkResult = rule.customCheck(selected, coursSpecialisesIds);
        meetsRule = typeof checkResult === "boolean" ? checkResult : checkResult.passed;
      } else if (
        rule.requiredCriteriaIds &&
        rule.requiredCriteriaIds.length > 0
      ) {
        meetsRule = rule.requiredCriteriaIds.every((id) => this.hasCriterion(selected, id));
      }

      if (meetsRule) {
        for (const jId of rule.jobs) {
          if (citizenship === "PR > 3 years" && !this.jobService.isJobRp(jId)) {
            continue;
          }

          // Exclude closed (SIP) jobs
          if (!this.ignoreSip() && this.jobService.isJobClosed(jId, this.currentSipPhase())) {
            continue;
          }

          const job = this.jobService.getAllJobs().find((j) => j.id === jId);
          if (job) {
            const firstContract =
              job.contracts && job.contracts.length > 0
                ? job.contracts[0]
                : null;
            const durationYears = firstContract
              ? firstContract.duration.match(/(\d+)\s*an/)
                ? parseInt(firstContract.duration.match(/(\d+)\s*an/)![1], 10)
                : 3
              : 3;

            if (ageVal > 56 || ageVal + durationYears >= 60) {
              excluded.push({
                id: job.id,
                title: job.title,
                duration: durationYears,
                requiredAge: Math.min(56, 59 - durationYears),
              });
            }
          }
        }
      }
    }
    return excluded.sort((a, b) => a.id.localeCompare(b.id));
}

export function checkReoJobEducationEligibility(this: any, jobId: string): { eligible: boolean; missingFr?: string; missingEn?: string } {
    const rules = this.jobRules.filter((r) => r.jobs.includes(jobId));
    if (rules.length === 0) {
      return { eligible: true };
    }

    const rawSelected = this.selectedCriteriaIds();
    const selected = new Set(rawSelected);

    const allMathOptions = (Object.values(this.MATH_COURSES) as any[]).reduce(
      (acc: any[], courses: any) => acc.concat(courses),
      [] as any[],
    );
    const selectedMaths = allMathOptions.filter((m) => selected.has(m.id));

    const hasMath = (grade: number, diff: number) => {
      return selectedMaths.some((m) => m.grade >= grade && m.diff >= diff);
    };

    if (hasMath(10, 1)) selected.add("base_math_10_gen");
    if (hasMath(10, 2)) selected.add("base_math_10_app");
    if (hasMath(10, 3)) selected.add("base_math_10_adv");
    if (hasMath(11, 1)) selected.add("base_math_11_gen");
    if (hasMath(11, 2)) selected.add("base_math_11_app");
    if (hasMath(11, 3)) selected.add("base_math_11_adv");
    if (hasMath(12, 1)) selected.add("base_math_12_gen");
    if (hasMath(12, 2)) selected.add("base_math_12_app");
    if (hasMath(12, 3)) selected.add("base_math_12_adv");

    const coursSpecialisesIds = this.criteriaCoursSpecialise().map((c) => c.id);

    const missingFrList: string[] = [];
    const missingEnList: string[] = [];

    const getLabel = (id: string, isFr: boolean) => {
        const crit = this.manualCriteria.find(c => c.id === id);
        if (crit) {
            if (id === "des_12e_annee") return isFr ? "DES ou 12e année" : "High School Diploma or Grade 12";
            if (id === "aens") return isFr ? "AENS (Attestation d'équivalence de niveau de scolarité)" : "School Equivalency Attestation (AENS)";
            if (id === "sec4_24_credits") return isFr ? "Sec 4 (24 crédits) ou 10e année" : "Grade 10 (24 credits)";
            if (id === "francais_sec4_10e") return isFr ? "Français/Anglais de sec 4 ou 10e année" : "Grade 10 English/French";
            if (id === "francais_sec5_11e") return isFr ? "Français/Anglais de sec 5 ou 11e année" : "Grade 11 English/French";
            if (id === "anglais_sec5_12e") return isFr ? "Anglais de sec 5 / 12e année" : "Grade 12 / Sec 5 English";
            if (id === "sci_tech4_sci10") return isFr ? "Science et technologie de sec 4 ou 10e année" : "Grade 10 Science";
            if (id === "chimie_sec5_11e") return isFr ? "Chimie de sec 5 ou 11e année" : "Grade 11 Chemistry";
            if (id === "physique_sec5_11e") return isFr ? "Physique de sec 5 ou 11e année" : "Grade 11 Physics";
            return isFr ? crit.label : (crit.labelEn || crit.label);
        }
        if (id === "base_math_10_gen") return isFr ? "Mathématiques de sec 4/10e (générales)" : "Grade 10 Math (General)";
        if (id === "base_math_10_app") return isFr ? "Mathématiques de sec 4/10e (appliquées)" : "Grade 10 Math (Applied)";
        if (id === "base_math_10_adv") return isFr ? "Mathématiques de sec 4/10e (avancées)" : "Grade 10 Math (Advanced)";
        if (id === "base_math_11_gen") return isFr ? "Mathématiques de sec 5/11e (générales)" : "Grade 11 Math (General)";
        if (id === "base_math_11_app") return isFr ? "Mathématiques de sec 5/11e (appliquées)" : "Grade 11 Math (Applied)";
        if (id === "base_math_11_adv") return isFr ? "Mathématiques de sec 5/11e (avancées)" : "Grade 11 Math (Advanced)";
        if (id === "base_math_12_gen") return isFr ? "Mathématiques de 12e (générales)" : "Grade 12 Math (General)";
        if (id === "base_math_12_app") return isFr ? "Mathématiques de 12e (appliquées)" : "Grade 12 Math (Applied)";
        if (id === "base_math_12_adv") return isFr ? "Mathématiques de 12e (avancées)" : "Grade 12 Math (Advanced)";
        return id;
    };

    for (const rule of rules) {
      let meetsRule = false;
      if (rule.customCheck) {
        const checkResult = rule.customCheck(selected, coursSpecialisesIds);
        if (typeof checkResult === "boolean") {
            meetsRule = checkResult;
            if (!meetsRule) {
                if (this.isOfficerJob(jobId)) {
                    missingFrList.push("Des études universitaires spécifiques sont manquantes");
                    missingEnList.push("Specific university studies are missing");
                } else {
                    missingFrList.push("Des exigences spécifiques (ex: DEP, Mathématiques ou Sciences) sont manquantes");
                    missingEnList.push("Specific requirements (e.g. DEP, Math or Science) are missing");
                }
            }
        } else {
            meetsRule = checkResult.passed;
            if (!meetsRule) {
                if (checkResult.missingFr) missingFrList.push(checkResult.missingFr);
                if (checkResult.missingEn) missingEnList.push(checkResult.missingEn);
            }
        }
      } else if (
        rule.requiredCriteriaIds &&
        rule.requiredCriteriaIds.length > 0
      ) {
        const missingIds = rule.requiredCriteriaIds.filter((id) => !this.hasCriterion(selected, id));
        if (missingIds.length === 0) {
            meetsRule = true;
        } else {
            missingFrList.push(missingIds.map(id => getLabel(id, true)).join(" et "));
            missingEnList.push(missingIds.map(id => getLabel(id, false)).join(" and "));
        }
      }

      if (meetsRule) {
        return { eligible: true };
      }
    }
    
    return { 
        eligible: false, 
        missingFr: Array.from(new Set(missingFrList)).join(" OU "),
        missingEn: Array.from(new Set(missingEnList)).join(" OR ")
    };
  }

export function checkReoJobMedicalEligibility(this: any, jobId: string): {
    eligible: boolean;
    reasonFr: string;
    reasonEn: string;
  } {
    if (!this.hasMedicalLimitation()) {
      return { eligible: true, reasonFr: "", reasonEn: "" };
    }
    const job = this.jobService.getAllJobs().find((j) => j.id === jobId);
    if (!job || !job.medicalStandard) {
      // Si un métier n'est pas dans le PDF, ne fait rien avec ce métier.
      return { eligible: true, reasonFr: "", reasonEn: "" };
    }

    const parseVal = (valStr: string) => {
      const trimmed = (valStr || "").trim();
      if (!trimmed) return null;
      const num = parseInt(trimmed, 10);
      return isNaN(num) ? null : num;
    };

    const v = parseVal(this.medicalV());
    const cv = parseVal(this.medicalCV());
    const h = parseVal(this.medicalH());

    const std = job.medicalStandard;
    const failingFr: string[] = [];
    const failingEn: string[] = [];

    if (v !== null && v > std.v) {
      failingFr.push(`Votre vue (V) ne rencontre pas la norme minimale du métier (votre cote : V${v}, norme requise : V${std.v} max)`);
      failingEn.push(`Your vision (V) does not meet the minimum standard for this occupation (your score: V${v}, required: V${std.v} max)`);
    }
    if (cv !== null && cv > std.cv) {
      failingFr.push(`Votre perception des couleurs (CV) ne rencontre pas la norme minimale du métier (votre cote : CV${cv}, norme requise : CV${std.cv} max)`);
      failingEn.push(`Your color vision (CV) does not meet the minimum standard for this occupation (your score: CV${cv}, required: CV${std.cv} max)`);
    }
    if (h !== null && h > std.h) {
      failingFr.push(`Votre audition (H) ne rencontre pas la norme minimale du métier (votre cote : H${h}, norme requise : H${std.h} max)`);
      failingEn.push(`Your hearing (H) does not meet the minimum standard for this occupation (your score: H${h}, required: H${std.h} max)`);
    }

    const applicantLimitations = this.melService.applicantLimitations();
    const melMatrix = this.melService.acceptabilityMatrix();

    for (const [melId, hasLim] of Object.entries(applicantLimitations)) {
      if (hasLim) {
        const isAcceptable = melMatrix[melId]?.[jobId] ?? true;
        if (!isAcceptable) {
          const limitation = MEL_LIMITATIONS.find(l => l.id === melId);
          const limFr = limitation?.textFr || limitation?.text || melId;
          const limEn = limitation?.text || melId;
          failingFr.push(`Limitation médicale incompatible : ${limFr}`);
          failingEn.push(`Incompatible medical limitation: ${limEn}`);
        }
      }
    }

    if (failingFr.length > 0) {
      return {
        eligible: false,
        reasonFr: failingFr.join(" | "),
        reasonEn: failingEn.join(" | "),
      };
    }

    return { eligible: true, reasonFr: "", reasonEn: "" };
  }

export function isReoJobMedicalAdmissible(this: any, jobId: string): boolean {
    return this.checkJobMedicalEligibility(jobId).eligible;
  }

export function isReoAdmissibleOtherThanEducation(this: any, jobId: string): boolean {
    if (!jobId) return false;
    if (jobId === "00003") return false;
    const job = this.jobService.getAllJobs().find((j) => j.id === jobId);
    if (!job) return false;

    if (this.jobService.isJobClosed(jobId, this.currentSipPhase())) {
      return false;
    }

    if (!this.isJobMedicalAdmissible(jobId)) {
      return false;
    }

    if (!this.isJobExtraTestAdmissible(jobId)) {
      return false;
    }

    const ageVal = this.age();
    const citizenshipVal = this.citizenship();

    const firstContract =
      job.contracts && job.contracts.length > 0 ? job.contracts[0] : null;
    const durationYears = firstContract
      ? firstContract.duration.match(/(\d+)\s*an/)
        ? parseInt(firstContract.duration.match(/(\d+)\s*an/)![1], 10)
        : 3
      : 3;

    if (ageVal !== null && ageVal > 0) {
      if (ageVal > 56 || ageVal + durationYears >= 60) {
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

export function getReoCmrAdmittedDomainsNoteFr(this: any): string {
    const domains: string[] = [];
    if (this.cmrArts()) domains.push("Arts");
    if (this.cmrScience()) domains.push("Sciences");
    if (this.cmrGenie()) domains.push("Génie");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} et ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} et ${domains[2]}`;
  }

export function getReoCmrAdmittedDomainsNoteEn(this: any): string {
    const domains: string[] = [];
    if (this.cmrArts()) domains.push("Arts");
    if (this.cmrScience()) domains.push("Sciences");
    if (this.cmrGenie()) domains.push("Engineering");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} and ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} and ${domains[2]}`;
  }

export function getReoCmrAdmittedDomainsFr(this: any): string {
    const domains: string[] = [];
    if (this.cmrArts()) domains.push("Sciences humaines et sociales");
    if (this.cmrScience()) domains.push("Sciences");
    if (this.cmrGenie()) domains.push("Génie");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} et ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} et ${domains[2]}`;
  }

export function getReoCmrAdmittedDomainsEn(this: any): string {
    const domains: string[] = [];
    if (this.cmrArts()) domains.push("Social Sciences and Humanities");
    if (this.cmrScience()) domains.push("Science");
    if (this.cmrGenie()) domains.push("Engineering");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} and ${domains[1]}`;
    return `${domains[0]}, ${domains[1]}, and ${domains[2]}`;
  }

export function getReoCmrJobRequiredDomainsFr(this: any, jobId: string): string {
    const cmrInfo = CMR_JOB_DOMAINS[jobId];
    if (!cmrInfo) return "";
    const domains: string[] = [];
    if (cmrInfo.arts) domains.push("Sciences humaines et sociales");
    if (cmrInfo.science) domains.push("Sciences");
    if (cmrInfo.genie) domains.push("Génie");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} ou ${domains[1]}`;
    return `${domains[0]}, ${domains[1]} ou ${domains[2]}`;
  }

export function getReoCmrJobRequiredDomainsEn(this: any, jobId: string): string {
    const cmrInfo = CMR_JOB_DOMAINS[jobId];
    if (!cmrInfo) return "";
    const domains: string[] = [];
    if (cmrInfo.arts) domains.push("Social Sciences and Humanities");
    if (cmrInfo.science) domains.push("Science");
    if (cmrInfo.genie) domains.push("Engineering");
    if (domains.length === 0) return "";
    if (domains.length === 1) return domains[0];
    if (domains.length === 2) return `${domains[0]} or ${domains[1]}`;
    return `${domains[0]}, ${domains[1]}, or ${domains[2]}`;
  }

export function evaluateReoJobAdmissibility(this: any, jobId: string) {
    if (!jobId) return null;
    const job = this.jobService.getAllJobs().find((j) => j.id === jobId);
    if (!job) return null;

    if (jobId === "00003") {
      return {
        job,
        isEligible: false,
        isAgeAdmissible: false,
        ageReason: "",
        isCitizenshipAdmissible: false,
        citizenshipReason: "",
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
        durationYears: 3,
        isJobClosed: false,
        isClosedTraitement: false,
        isClosedAdmissionOnly: false,
      };
    }

    const ageVal = this.age();
    const citizenshipVal = this.citizenship();

    let isAgeAdmissible = true;
    let ageReason = "";
    let ageReasonEn = "";
    const firstContract =
      job.contracts && job.contracts.length > 0 ? job.contracts[0] : null;
    const durationYears = firstContract
      ? firstContract.duration.match(/(\d+)\s*an/)
        ? parseInt(firstContract.duration.match(/(\d+)\s*an/)![1], 10)
        : 3
      : 3;

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
        ageReasonEn = "You exceed the maximum eligibility age for this occupation.";
      }
    }

    let isCitizenshipAdmissible = true;
    let citizenshipReason = "";
    let citizenshipReasonEn = "";
    if (citizenshipVal === "PR < 3 years") {
      isCitizenshipAdmissible = false;
      citizenshipReason =
        "Les résidents permanents de moins de trois ans ne sont pas admissibles aux Forces armées canadiennes.";
      citizenshipReasonEn =
        "Permanent residents with less than three years of residency are not eligible for the Canadian Armed Forces.";
    } else if (citizenshipVal === "PR > 3 years") {
      const isRpAllowed = this.jobService.isJobRp(jobId);
      if (!isRpAllowed) {
        isCitizenshipAdmissible = false;
        citizenshipReason =
          "Ce métier est réservé aux citoyens canadiens uniquement (CC).";
        citizenshipReasonEn =
          "This occupation is restricted to Canadian citizens only (CC).";
      }
    }

    const extraTestCheck = this.checkJobExtraTestEligibility(jobId);
    const isExtraTestRequired = extraTestCheck.isExtraTestRequired;
    const isExtraTestAdmissible = extraTestCheck.eligible;
    const extraTestName = extraTestCheck.testName;
    const extraTestReasonFr = extraTestCheck.reasonFr;
    const extraTestReasonEn = extraTestCheck.reasonEn;

    let isEducationAdmissible = true;
    let educationReason = "";
    let educationReasonEn = "";

    if (this.isPforApplicant()) {
      const hasPfor = this.jobService.hasPforProgram(jobId, this.currentSipPhase());
      const isPforClosed = this.jobService.isPforJobClosed(jobId, this.currentSipPhase());

      if (this.pforType() === "cmr") {
        const cmrInfo = CMR_JOB_DOMAINS[jobId];
        if (!cmrInfo) {
          isEducationAdmissible = false;
          educationReason =
            "Ce métier n'est pas offert au Collège militaire royal (CMR) dans le cadre du PFOR.";
          educationReasonEn =
            "This occupation is not offered at the Royal Military College (RMC) under ROTP.";
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
            educationReason =
              `Ce métier requiert d'être admis au CMR en ${reqFr}, alors que votre admission actuelle au CMR est en ${admFr || "un autre domaine"}.`;
            const reqEn = this.getCmrJobRequiredDomainsEn(jobId);
            const admEn = this.getCmrAdmittedDomainsEn();
            educationReasonEn =
              `This occupation requires admission to RMC in ${reqEn}, whereas your current admission to RMC is in ${admEn || "another field"}.`;
          }
        }
      } else {
        if (!hasPfor) {
          isEducationAdmissible = false;
          educationReason =
            "Ce métier ne comporte aucune position disponible pour le PFOR Civil.";
          educationReasonEn =
            "This occupation has no available positions for Civil ROTP.";
        }
      }

      let isMedicalAdmissible = true;
      let medicalReason = "";
      let medicalReasonEn = "";
      if (this.hasMedicalLimitation()) {
        const medCheck = this.checkJobMedicalEligibility(jobId);
        if (!medCheck.eligible) {
          isMedicalAdmissible = false;
          medicalReason = medCheck.reasonFr;
          medicalReasonEn = medCheck.reasonEn;
        }
      }

      const isEligible =
        isAgeAdmissible &&
        isCitizenshipAdmissible &&
        isEducationAdmissible &&
        isMedicalAdmissible &&
        isExtraTestAdmissible;
      const hasPforTraitement = this.jobService.hasPforProgram(jobId, "traitement");
      const isPforClosedTraitement = this.jobService.isPforJobClosed(jobId, "traitement");
      const isClosedTraitementRaw = !hasPforTraitement || isPforClosedTraitement;

      const hasPforAdmission = this.jobService.hasPforProgram(jobId, "admission");
      const isPforClosedAdmission = this.jobService.isPforJobClosed(jobId, "admission");
      const isClosedAdmissionRaw = !hasPforAdmission || isPforClosedAdmission;

      const isClosedTraitement = isClosedTraitementRaw;
      const isClosedAdmissionOnly = isClosedAdmissionRaw && !isClosedTraitementRaw;
      const isJobClosed = isClosedTraitement || isClosedAdmissionOnly;

      return {
        job,
        isEligible,
        isAgeAdmissible,
        ageReason,
        ageReasonEn,
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
        durationYears,
        isJobClosed,
        isClosedTraitement,
        isClosedAdmissionOnly,
      };
    }

    const eduCheckSubmit = this.checkJobEducationEligibility(jobId);
    if (!eduCheckSubmit.eligible) {
      isEducationAdmissible = false;
      const specializedOfficers = ["00190", "00191", "00194", "00195", "00197", "00198", "00203", "00204", "00208", "00211", "00214", "00349", "00374", "00390", "00393", "00398"];
      if (this.isOfficerJob(jobId)) {
        if (specializedOfficers.includes(jobId) && eduCheckSubmit.missingFr) {
          educationReason = "Vous n'avez pas les études universitaires requises pour satisfaire aux exigences académiques (" + eduCheckSubmit.missingFr + ").";
          educationReasonEn = "You do not have the required university education to meet the academic requirements (" + eduCheckSubmit.missingEn + ").";
        } else {
          educationReason = "Vous n'avez pas les études universitaires requises pour satisfaire aux exigences académiques.";
          educationReasonEn = "You do not have the required university education to meet the academic requirements.";
        }
      } else if (eduCheckSubmit.missingFr) {
        educationReason = "Votre scolarité ou votre expérience ne satisfait pas aux exigences minimales (" + eduCheckSubmit.missingFr + ").";
        educationReasonEn = "Your academic level or experience does not meet the minimum requirements (" + eduCheckSubmit.missingEn + ").";
      } else {
        educationReason = "Votre scolarité ou votre expérience ne satisfait pas aux exigences minimales.";
        educationReasonEn = "Your academic level or experience does not meet the minimum requirements.";
      }
    }

    let isMedicalAdmissible = true;
    let medicalReason = "";
    let medicalReasonEn = "";
    if (this.hasMedicalLimitation()) {
      const medCheck = this.checkJobMedicalEligibility(jobId);
      if (!medCheck.eligible) {
        isMedicalAdmissible = false;
        medicalReason = medCheck.reasonFr;
        medicalReasonEn = medCheck.reasonEn;
      }
    }

    const isEligible =
      isAgeAdmissible &&
      isCitizenshipAdmissible &&
      isEducationAdmissible &&
      isMedicalAdmissible &&
      isExtraTestAdmissible;
    const isClosedTraitementRaw = this.jobService.isJobClosed(jobId, "traitement");
    const isClosedAdmissionRaw = this.jobService.isJobClosed(jobId, "admission");
    const isClosedTraitement = isClosedTraitementRaw;
    const isClosedAdmissionOnly = isClosedAdmissionRaw && !isClosedTraitementRaw;
    const isJobClosed = isClosedTraitement || isClosedAdmissionOnly;

    return {
      job,
      isEligible,
      isAgeAdmissible,
      ageReason,
      ageReasonEn,
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
      durationYears,
      isJobClosed,
      isClosedTraitement,
      isClosedAdmissionOnly,
    };
  }
