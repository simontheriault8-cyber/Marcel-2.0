import { JOB_RULES, MATH_COURSES, MANUAL_CRITERIA } from "../../app/data/reorientation-criteria.data";

export interface ExtraTestContext {
  hasEceJob: boolean;
  hasEsomJob: boolean;
  hasCeopmJob: boolean;
  hasCspnJob: boolean;
  testEcePassed: boolean;
  testEceNotCompleted: boolean;
  testEsomPassed: boolean;
  testEsomNotCompleted: boolean;
  testCeopmPassed: boolean;
  testCeopmNotCompleted: boolean;
  testCspnNotCompleted: boolean;
  testCspnPassed: boolean;
  testCspn00182Passed: boolean;
  testCspn00183Passed: boolean;
  testCspn00184Passed: boolean;
}

export function evaluateExtraTestEligibility(jobId: string, ctx: ExtraTestContext): {
  isExtraTestRequired: boolean;
  testName: string;
  eligible: boolean;
  reasonFr: string;
  reasonEn: string;
} {
    if (jobId === "00203") {
      const isTested = ctx.hasEceJob;
      const notCompleted = ctx.testEceNotCompleted;
      const eligible = !isTested || (!notCompleted && ctx.testEcePassed);
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
      const isTested = ctx.hasEsomJob;
      const notCompleted = ctx.testEsomNotCompleted;
      const eligible = !isTested || (!notCompleted && ctx.testEsomPassed);
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
      const isTested = ctx.hasCeopmJob;
      const notCompleted = ctx.testCeopmNotCompleted;
      const eligible = !isTested || (!notCompleted && ctx.testCeopmPassed);
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
      const isTested = ctx.hasCspnJob;
      const notCompleted = ctx.testCspnNotCompleted;
      const eligible =
        !isTested ||
        (!notCompleted &&
          ctx.testCspnPassed &&
          ctx.testCspn00182Passed);
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
      const isTested = ctx.hasCspnJob;
      const notCompleted = ctx.testCspnNotCompleted;
      const eligible =
        !isTested ||
        (!notCompleted &&
          ctx.testCspnPassed &&
          ctx.testCspn00183Passed);
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
      const isTested = ctx.hasCspnJob;
      const notCompleted = ctx.testCspnNotCompleted;
      const eligible =
        !isTested ||
        (!notCompleted &&
          ctx.testCspnPassed &&
          ctx.testCspn00184Passed);
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

export function evaluateEducationEligibility(
  jobId: string,
  rawSelected: Set<string>,
  coursSpecialisesIds: string[],
  isOfficerJob: (id: string) => boolean
): { eligible: boolean; missingFr?: string; missingEn?: string } {
    const rules = JOB_RULES.filter((r) => r.jobs.includes(jobId));
    if (rules.length === 0) {
      return { eligible: true };
    }

    const selected = new Set(rawSelected);

    const allMathOptions = Object.values(MATH_COURSES).reduce(
      (acc, courses) => acc.concat(courses),
      [] as { id: string; label: string; grade: number; diff: number }[],
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

    const missingFrList: string[] = [];
    const missingEnList: string[] = [];

    const getLabel = (id: string, isFr: boolean) => {
      const crit = MANUAL_CRITERIA.find((c) => c.id === id);
      if (crit) {
        if (id === "des_12e_annee")
          return isFr
            ? "DES ou 12e année"
            : "High School Diploma or Grade 12";
        if (id === "sec4_24_credits")
          return isFr
            ? "Sec 4 (24 crédits) ou 10e année"
            : "Grade 10 (24 credits)";
        if (id === "francais_sec4_10e")
          return isFr
            ? "Français/Anglais de sec 4 ou 10e année"
            : "Grade 10 English/French";
        if (id === "francais_sec5_11e")
          return isFr
            ? "Français/Anglais de sec 5 ou 11e année"
            : "Grade 11 English/French";
        if (id === "anglais_sec5_12e")
          return isFr
            ? "Anglais de sec 5 / 12e année"
            : "Grade 12 / Sec 5 English";
        if (id === "sci_tech4_sci10")
          return isFr
            ? "Science et technologie de sec 4 ou 10e année"
            : "Grade 10 Science";
        if (id === "chimie_sec5_11e")
          return isFr ? "Chimie de sec 5 ou 11e année" : "Grade 11 Chemistry";
        if (id === "physique_sec5_11e")
          return isFr
            ? "Physique de sec 5 ou 11e année"
            : "Grade 11 Physics";
        return crit.label;
      }
      if (id === "base_math_10_gen")
        return isFr
          ? "Mathématiques de sec 4/10e (générales)"
          : "Grade 10 Math (General)";
      if (id === "base_math_10_app")
        return isFr
          ? "Mathématiques de sec 4/10e (appliquées)"
          : "Grade 10 Math (Applied)";
      if (id === "base_math_10_adv")
        return isFr
          ? "Mathématiques de sec 4/10e (avancées)"
          : "Grade 10 Math (Advanced)";
      if (id === "base_math_11_gen")
        return isFr
          ? "Mathématiques de sec 5/11e (générales)"
          : "Grade 11 Math (General)";
      if (id === "base_math_11_app")
        return isFr
          ? "Mathématiques de sec 5/11e (appliquées)"
          : "Grade 11 Math (Applied)";
      if (id === "base_math_11_adv")
        return isFr
          ? "Mathématiques de sec 5/11e (avancées)"
          : "Grade 11 Math (Advanced)";
      if (id === "base_math_12_gen")
        return isFr
          ? "Mathématiques de 12e (générales)"
          : "Grade 12 Math (General)";
      if (id === "base_math_12_app")
        return isFr
          ? "Mathématiques de 12e (appliquées)"
          : "Grade 12 Math (Applied)";
      if (id === "base_math_12_adv")
        return isFr
          ? "Mathématiques de 12e (avancées)"
          : "Grade 12 Math (Advanced)";
      return id;
    };

    for (const rule of rules) {
      let meetsRule = false;
      if (rule.customCheck) {
        const checkResult = rule.customCheck(selected, coursSpecialisesIds);
        if (typeof checkResult === "boolean") {
          meetsRule = checkResult;
          if (!meetsRule) {
            if (isOfficerJob(jobId)) {
              missingFrList.push(
                "Des études universitaires spécifiques sont manquantes",
              );
              missingEnList.push("Specific university studies are missing");
            } else {
              missingFrList.push(
                "Des exigences spécifiques (ex: DEP, Mathématiques ou Sciences) sont manquantes",
              );
              missingEnList.push(
                "Specific requirements (e.g. DEP, Math or Science) are missing",
              );
            }
          }
        } else {
          meetsRule = checkResult.passed;
          if (!meetsRule) {
            if (checkResult.missingFr)
              missingFrList.push(checkResult.missingFr);
            if (checkResult.missingEn)
              missingEnList.push(checkResult.missingEn);
          }
        }
      } else if (
        rule.requiredCriteriaIds &&
        rule.requiredCriteriaIds.length > 0
      ) {
        const missingIds = rule.requiredCriteriaIds.filter(
          (id) => !selected.has(id),
        );
        if (missingIds.length === 0) {
          meetsRule = true;
        } else {
          missingFrList.push(
            missingIds.map((id) => getLabel(id, true)).join(" et "),
          );
          missingEnList.push(
            missingIds.map((id) => getLabel(id, false)).join(" and "),
          );
        }
      }

      if (meetsRule) {
        return { eligible: true };
      }
    }

    return {
      eligible: false,
      missingFr: Array.from(new Set(missingFrList)).join(" OU "),
      missingEn: Array.from(new Set(missingEnList)).join(" OR "),
    };
}
