import { JobRule, hasDes, hasSec4, MATH_COURSES } from "./criteria.models";
import { MANUAL_CRITERIA } from "./criteria-all.data";

export const JOB_RULES_PART2: JobRule[] = [
    {
      jobs: ["00303"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const passed = (
          (selected.has("sec4_24_credits") &&
            selected.has("base_math_10_app")) ||
          selected.has("cs_dep_electricite")
        );
        if (passed) return { passed: true };
        return { passed: false, missingFr: "24 crédits de sec 4 avec Math appliquées de sec 4/10e (ou DEP en électricité)", missingEn: "24 credits of Grade 10 with Applied Math Grade 10 (or DEP in electricity)" };
      },
    },
    {
      jobs: ["00304"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const passed = (
          (selected.has("sec4_24_credits") &&
            selected.has("base_math_10_app")) ||
          selected.has("cs_dep_plomberie_chauffage")
        );
        if (passed) return { passed: true };
        return { passed: false, missingFr: "24 crédits de sec 4 avec Math appliquées de sec 4/10e (ou DEP en plomberie et chauffage)", missingEn: "24 credits of Grade 10 with Applied Math Grade 10 (or DEP in plumbing and heating)" };
      },
    },
    {
      jobs: ["00305"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const passed = (
          (selected.has("sec4_24_credits") &&
            selected.has("base_math_10_app")) ||
          selected.has("cs_aec_eaux")
        );
        if (passed) return { passed: true };
        return { passed: false, missingFr: "24 crédits de sec 4 avec Math appliquées de sec 4/10e (ou AEC en traitement des eaux)", missingEn: "24 credits of Grade 10 with Applied Math Grade 10 (or AEC in water treatment)" };
      },
    },
    {
      jobs: ["00306"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const passed = (
          (selected.has("sec4_24_credits") &&
            selected.has("base_math_10_app")) ||
          selected.has("cs_dep_charpenterie")
        );
        if (passed) return { passed: true };
        return { passed: false, missingFr: "24 crédits de sec 4 avec Math appliquées de sec 4/10e (ou DEP en charpenterie)", missingEn: "24 credits of Grade 10 with Applied Math Grade 10 (or DEP in carpentry)" };
      },
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00324"],
      allowPR: false, // CC
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_app",
        "sci_tech4_sci10",
      ],
      jobs: ["00327"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["cs_cert_assist_dentaire"],
      jobs: ["00335"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["sec4_24_credits", "base_math_10_app"],
      jobs: ["00337"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00339"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["sec4_24_credits", "base_math_10_adv"],
      jobs: ["00366"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00368"],
      allowPR: true,
    },
    {
      jobs: ["00370"],
      allowPR: true,
      customCheck: (selected) => {
        const passed = (
          (hasDes(selected) && selected.has("base_math_11_app")) ||
          selected.has("cs_dep_arpentage_topo")
        );
        if (passed) return { passed: true };
        return { passed: false, missingFr: "DES avec Math appliquées de sec 5/11e (ou DEP en arpentage et topographie)", missingEn: "High School Diploma with Applied Math Grade 11 (or DEP in surveying and topography)" };
      },
    },
    {
      requiredCriteriaIds: ["cs_dep_sante_infirmiers"],
      jobs: ["00372"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_app",
        "francais_sec4_10e",
      ],
      jobs: ["00375"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_app",
        "francais_sec4_10e",
      ],
      jobs: ["00376"],
      allowPR: true,
    },
    {
      jobs: ["00378"],
      allowPR: true,
      customCheck: (selected) => {
        const passed = (
          (hasDes(selected) && selected.has("base_math_11_adv")) ||
          (hasDes(selected) && selected.has("info_sec5_12e")) ||
          selected.has("cs_dip_cyber")
        );
        if (passed) return { passed: true };
        return { passed: false, missingFr: "DES avec Math avancées de sec 5/11e ou Informatique de sec 5/12e (ou Diplôme en cybersécurité)", missingEn: "High School Diploma with Advanced Math Grade 11 or Grade 12 Computer Science (or Diploma in cybersecurity)" };
      },
    },
    {
      requiredCriteriaIds: ["sec4_24_credits", "base_math_10_app"],
      jobs: ["00383"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: ["sec4_24_credits", "base_math_10_app"],
      jobs: ["00384"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_adv",
        "sci_tech4_sci10",
      ],
      jobs: ["00385"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00386"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00387"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_adv",
        "sci_tech4_sci10",
      ],
      jobs: ["00394"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00402"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_app",
      ],
      jobs: ["00404"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_app",
      ],
      jobs: ["00405"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: ["cs_cert_soins_param"],
      jobs: ["00406"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_app",
        "sci_tech4_sci10",
      ],
      jobs: ["00407"],
      allowPR: true,
    },
    {
      jobs: [
        "00178",
        "00179",
        "00180",
        "00182",
        "00183",
        "00184",
        "00328",
        "00389",
      ],
      allowPR: true,
      customCheck: (selected) => {
        const has1erCycle =
          selected.has("univ_1er_cycle_global") ||
          Array.from(selected).some((id) => id.startsWith("bacc_"));
        const hasMaitrise =
          selected.has("univ_cycle_sup_maitrise") ||
          Array.from(selected).some((id) => id.startsWith("maitrise_"));
        return has1erCycle || hasMaitrise;
      },
    }
];
