import { JobRule, hasDes, hasSec4, MATH_COURSES } from "./criteria.models";
import { MANUAL_CRITERIA } from "./criteria-all.data";

export const JOB_RULES_PART1: JobRule[] = [
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00005"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00010"],
      allowPR: true,
    },
    {
      requiredCriteriaIds: ["des_12e_annee", "base_math_10_adv"],
      jobs: ["00019"],
      allowPR: true,
    },
    {
      jobs: ["00099"],
      allowPR: false, // CC
      customCheck: (selected, coursSpecialisesIds) => {
        const hasDESAndLang =
          hasDes(selected) && selected.has("francais_sec5_11e");
        const hasCoursSpecialises = coursSpecialisesIds.some((id) =>
          selected.has(id),
        );
        const has1erCycle =
          selected.has("univ_1er_cycle_global") ||
          Array.from(selected).some((id) => id.startsWith("bacc_"));

        if (hasDESAndLang || hasCoursSpecialises || has1erCycle) return { passed: true };
        return {
          passed: false,
          missingFr: "DES avec Français/Anglais de sec 5 (ou Cours spécialisé / Diplôme universitaire)",
          missingEn: "High School Diploma with Grade 11 English/French (or Specialized Course / University Degree)"
        };
      },
    },
    {
      jobs: ["00100"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const hasDES = hasDes(selected);
        const hasMath11App = selected.has("base_math_11_app");
        const hasChemOrPhys =
          selected.has("chimie_sec5_11e") || selected.has("physique_sec5_11e");
        
        if (hasDES && hasMath11App && hasChemOrPhys) return { passed: true };

        const missingFr = [];
        const missingEn = [];
        if (!hasDES) {
          missingFr.push("DES ou 12e année");
          missingEn.push("High School Diploma or Grade 12");
        }
        if (!hasMath11App) {
          missingFr.push("Mathématiques de sec 5/11e (appliquées)");
          missingEn.push("Grade 11 Math (Applied)");
        }
        if (!hasChemOrPhys) {
          missingFr.push("Chimie ou Physique de sec 5/11e année");
          missingEn.push("Grade 11 Chemistry or Physics");
        }
        return {
          passed: false,
          missingFr: missingFr.join(" et "),
          missingEn: missingEn.join(" and "),
        };
      },
    },

    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00105"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["sec4_24_credits", "base_math_10_app"],
      jobs: ["00109"],
      allowPR: false, // CC
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00114"],
      allowPR: false, // CC
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00115"],
      allowPR: false, // CC
    },
    {
      jobs: ["00120"],
      allowPR: false, // CC
      customCheck: (selected) => {
        const has24PropsAndMath =
          selected.has("sec4_24_credits") && selected.has("base_math_10_app");
        const has1erCycle =
          selected.has("univ_1er_cycle_global") ||
          Array.from(selected).some((id) => id.startsWith("bacc_"));
        
        if (has24PropsAndMath || has1erCycle) return { passed: true };

        return {
            passed: false,
            missingFr: "24 crédits de sec 4 avec Mathématiques de sec 4/10e (appliquées) (ou Diplôme universitaire)",
            missingEn: "24 credits of Grade 10 with Grade 10 Math (Applied) (or University Degree)"
        };
      },
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_app",
        "sci_tech4_sci10",
      ],
      jobs: ["00129"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: [
        "sec4_24_credits",
        "base_math_10_app",
        "sci_tech4_sci10",
      ],
      jobs: ["00130", "00134"],
      allowPR: true, // RP
    },
    {
      jobs: ["00135"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const isEnglish = selected.has("etude_anglais");
        if (isEnglish) {
          const userHasDes = hasDes(selected);
          const hasEnglishSec5 = selected.has("anglais_sec5_12e");
          const hasCegep201 = selected.has("qc_12_cegep201") || selected.has("base_math_12_adv");
          const hasMath11AppOrAdv = selected.has("base_math_11_app") || selected.has("base_math_11_adv");
          const passedAcademic = userHasDes && hasEnglishSec5 && (hasCegep201 || hasMath11AppOrAdv);
          const passed = passedAcademic || selected.has("cs_tea_m");
          if (passed) return { passed: true };
          return {
            passed: false,
            missingFr: "Exige : (DES/12e années complété + Anglais de sec 5 / 12 e année + (CEGEP 201 Appliquée ou Théoriques / 12e année ou Mathématiques de sec 5/11e (appliquées) ou Mathématiques de sec 5/11e (avancées))) ou (Un diplôme d’un programme TEA‑M (technicien d’entretien d’aéronefs - maintenance) accrédité par Transports Canada)",
            missingEn: "Requires: (High School Diploma + Grade 12 / Sec 5 English + (CEGEP 201 Appliquée ou Théoriques / 12e année or Grade 11 Math (Applied) or Grade 11 Math (Advanced))) or (An accredited Transport Canada AME-M (aircraft maintenance engineer - maintenance) program diploma)",
          };
        } else {
          const userHasDes = hasDes(selected);
          const hasPhysicsSec5 = selected.has("physique_sec5_11e");
          const hasMath11AppOrAdv = selected.has("base_math_11_app") || selected.has("base_math_11_adv");
          const passedAcademic = userHasDes && hasPhysicsSec5 && hasMath11AppOrAdv;
          const passed = passedAcademic || selected.has("cs_tea_m");
          if (passed) return { passed: true };
          return {
            passed: false,
            missingFr: "Exige : (DES/12e années complété + Physique de sec 5/11e année + (Mathématiques de sec 5/11e (appliquées) ou Mathématiques de sec 5/11e (avancées))) ou (Un diplôme d’un programme TEA‑M (technicien d’entretien d’aéronefs - maintenance) accrédité par Transports Canada)",
            missingEn: "Requires: (High School Diploma + Grade 11 Physics + (Grade 11 Math (Applied) or Grade 11 Math (Advanced))) or (An accredited Transport Canada AME-M (aircraft maintenance engineer - maintenance) program diploma)",
          };
        }
      },
    },
    {
      jobs: ["00136"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const isEnglish = selected.has("etude_anglais");
        if (isEnglish) {
          const userHasDes = hasDes(selected);
          const hasEnglishSec5 = selected.has("anglais_sec5_12e");
          const hasCegep201 = selected.has("qc_12_cegep201") || selected.has("base_math_12_adv");
          const hasMath11AppOrAdv = selected.has("base_math_11_app") || selected.has("base_math_11_adv");
          const passedAcademic = userHasDes && hasEnglishSec5 && (hasCegep201 || hasMath11AppOrAdv);
          const passed = passedAcademic || selected.has("cs_tea_e");
          if (passed) return { passed: true };
          return {
            passed: false,
            missingFr: "Exige : (DES/12e années complété + Anglais de sec 5 / 12 e année + (CEGEP 201 Appliquée ou Théoriques / 12e année ou Mathématiques de sec 5/11e (appliquées) ou Mathématiques de sec 5/11e (avancées))) ou (Un diplôme d’un programme TEA‑E (technicien d’entretien d’aéronefs - avionique) accrédité par Transports Canada)",
            missingEn: "Requires: (High School Diploma + Grade 12 / Sec 5 English + (CEGEP 201 Appliquée ou Théoriques / 12e année or Grade 11 Math (Applied) or Grade 11 Math (Advanced))) or (An accredited Transport Canada AME-E (aircraft maintenance engineer - avionics) program diploma)",
          };
        } else {
          const userHasDes = hasDes(selected);
          const hasPhysicsSec5 = selected.has("physique_sec5_11e");
          const hasMath11AppOrAdv = selected.has("base_math_11_app") || selected.has("base_math_11_adv");
          const passedAcademic = userHasDes && hasPhysicsSec5 && hasMath11AppOrAdv;
          const passed = passedAcademic || selected.has("cs_tea_e");
          if (passed) return { passed: true };
          return {
            passed: false,
            missingFr: "Exige : (DES/12e années complété + Physique de sec 5/11e année + (Mathématiques de sec 5/11e (appliquées) ou Mathématiques de sec 5/11e (avancées))) ou (Un diplôme d’un programme TEA‑E (technicien d’entretien d’aéronefs - avionique) accrédité par Transports Canada)",
            missingEn: "Requires: (High School Diploma + Grade 11 Physics + (Grade 11 Math (Applied) or Grade 11 Math (Advanced))) or (An accredited Transport Canada AME-E (aircraft maintenance engineer - avionics) program diploma)",
          };
        }
      },
    },
    {
      jobs: ["00137"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const passed = (
          hasDes(selected) ||
          selected.has("cs_photo_multimedia") ||
          selected.has("bacc_arts_communications") ||
          selected.has("bacc_arts_communication_visuelle")
        );
        if (passed) return { passed: true };
        return {
            passed: false,
            missingFr: "DES, Cours de spécialisation en Photographie/Multimédia, ou Bacc en Communications",
            missingEn: "High School Diploma, Specialized Course in Photography/Multimedia, or Bachelor's in Communications"
        };
      },
    },
    {
      jobs: ["00138"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const isEnglish = selected.has("etude_anglais");
        if (isEnglish) {
          const userHasDes = hasDes(selected);
          const hasEnglishSec5 = selected.has("anglais_sec5_12e");
          const hasCegep201 = selected.has("qc_12_cegep201") || selected.has("base_math_12_adv");
          const hasMath11AppOrAdv = selected.has("base_math_11_app") || selected.has("base_math_11_adv");
          const passedAcademic = userHasDes && hasEnglishSec5 && (hasCegep201 || hasMath11AppOrAdv);
          const passed = passedAcademic || selected.has("cs_tea_s");
          if (passed) return { passed: true };
          return {
            passed: false,
            missingFr: "Exige : (DES/12e années complété + Anglais de sec 5 / 12 e année + (CEGEP 201 Appliquée ou Théoriques / 12e année ou Mathématiques de sec 5/11e (appliquées) ou Mathématiques de sec 5/11e (avancées))) ou (Un diplôme d’un programme TEA‑S (technicien d’entretien d’aéronefs - structures) accrédité par Transports Canada)",
            missingEn: "Requires: (High School Diploma + Grade 12 / Sec 5 English + (CEGEP 201 Appliquée ou Théoriques / 12e année or Grade 11 Math (Applied) or Grade 11 Math (Advanced))) or (An accredited Transport Canada AME-S (aircraft maintenance engineer - structures) program diploma)",
          };
        } else {
          const userHasDes = hasDes(selected);
          const hasMath11AppOrAdv = selected.has("base_math_11_app") || selected.has("base_math_11_adv");
          const passedAcademic = userHasDes && hasMath11AppOrAdv;
          const passed = passedAcademic || selected.has("cs_tea_s");
          if (passed) return { passed: true };
          return {
            passed: false,
            missingFr: "Exige : (DES/12e années complété + (Mathématiques de sec 5/11e (appliquées) ou Mathématiques de sec 5/11e (avancées))) ou (Un diplôme d’un programme TEA‑S (technicien d’entretien d’aéronefs - structures) accrédité par Transports Canada)",
            missingEn: "Requires: (High School Diploma + (Grade 11 Math (Applied) or Grade 11 Math (Advanced))) or (An accredited Transport Canada AME-S (aircraft maintenance engineer - structures) program diploma)",
          };
        }
      },
    },
    {
      jobs: ["00149"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const hasEducation =
          hasDes(selected) && selected.has("base_math_10_app");
        const hasFireTech = selected.has("cs_sec_incendie");
        const passed = hasEducation || hasFireTech;
        if (passed) return { passed: true };
        return {
            passed: false,
            missingFr: "DES avec Mathématiques de sec 4/10e (appliquées) (ou Formation en sécurité incendie)",
            missingEn: "High School Diploma with Grade 10 Math (Applied) (or Fire Security Training)"
        };
      },
    },
    {
      requiredCriteriaIds: ["cs_tech_lab_med"],
      jobs: ["00152"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["cs_tech_radio_med"],
      jobs: ["00153"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["cs_tech_ing_biomed"],
      jobs: ["00155"],
      allowPR: true, // RP
    },
    {
      jobs: ["00161"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const isOutsideCanada = selected.has("etude_hors_canada");
        const hasUniversityDegree = (
          selected.has("bacc_arts_criminologie") ||
          selected.has("bacc_arts_justice_criminelle") ||
          selected.has("bacc_arts_sci_policieres") ||
          selected.has("bacc_arts_sec_policieres") ||
          selected.has("bacc_arts_sec_publique") ||
          selected.has("bacc_arts_sociologie") ||
          selected.has("bacc_arts_psychologie") ||
          selected.has("bacc_arts_gestion_urgences") ||
          selected.has("bacc_arts_droit") ||
          selected.has("bacc_arts_etudes_judiciaires")
        );
        const hasTechPolicieres = selected.has("cs_tech_policieres");
        const passed = hasTechPolicieres || (!isOutsideCanada && hasUniversityDegree);

        if (isOutsideCanada) {
          return {
            passed,
            missingFr: "DEC en techniques policières (les diplômes universitaires ne sont admissibles que pour les études complétées au Canada)",
            missingEn: "Police Technology diploma (university degrees are only admissible for studies completed in Canada)"
          };
        }

        return {
          passed,
          missingFr: "DEC en techniques policières (ou Diplôme universitaire admissible au Canada : Criminologie, Justice criminelle, Sciences/études policières, Sécurité et études policières, Sécurité publique, Sociologie, Psychologie, Gestion des urgences, Droit ou Études judiciaires)",
          missingEn: "Police Technology diploma (or Eligible Canadian university degree: Criminology, Criminal Justice, Police Science/Studies, Security and Police Studies, Public Safety, Sociology, Psychology, Emergency Management, Law, or Judicial Studies)"
        };
      },
    },
    {
      jobs: ["00164"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const passed = (
          (selected.has("sec4_24_credits") &&
            selected.has("base_math_10_gen")) ||
          selected.has("cs_dep_cuisine")
        );
        if (passed) return { passed: true };
        return {
            passed: false,
            missingFr: "24 crédits de sec 4 avec Mathématiques de sec 4/10e (générales) (ou DEP en cuisine)",
            missingEn: "24 credits of Grade 10 with Grade 10 Math (General) (or DEP in cooking)"
        };
      },
    },
    {
      jobs: ["00166"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const passed = (
          hasDes(selected) || selected.has("cs_etude_musique")
        );
        if (passed) return { passed: true };
        return {
            passed: false,
            missingFr: "DES ou 12e année (ou Études en musique)",
            missingEn: "High School Diploma or Grade 12 (or Music Studies)"
        };
      },
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00167", "00168", "00169", "00170", "00171"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["des_12e_annee", "base_math_11_app"],
      jobs: ["00238"],
      allowPR: false, // CC
    },
    {
      requiredCriteriaIds: ["sec4_24_credits", "base_math_10_gen"],
      jobs: ["00261"],
      allowPR: true, // RP
    },
    {
      requiredCriteriaIds: ["sec4_24_credits"],
      jobs: ["00299"],
      allowPR: false, // CC
    },
    {
      jobs: ["00301"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const passed = (
          (selected.has("sec4_24_credits") &&
            selected.has("base_math_10_app")) ||
          selected.has("cs_dep_refrigeration")
        );
        if (passed) return { passed: true };
        return { passed: false, missingFr: "24 crédits de sec 4 avec Math appliquées de sec 4/10e (ou DEP en réfrigération)", missingEn: "24 credits of Grade 10 with Applied Math Grade 10 (or DEP in refrigeration)" };
      },
    },
    {
      jobs: ["00302"],
      allowPR: true, // RP
      customCheck: (selected) => {
        const option1 =
          selected.has("sec4_24_credits") && selected.has("base_math_10_app");
        const option2 = selected.has("cs_dep_electricite");
        const option3 =
          selected.has("des_12e_annee") &&
          selected.has("base_math_11_adv") &&
          selected.has("physique_sec5_11e");
        const passed = option1 || option2 || option3;
        if (passed) return { passed: true };
        return { passed: false, missingFr: "24 crédits de sec 4 avec Math appliquées de sec 4/10e (ou DEP en électricité, ou DES avec Math avancées de sec 5/11e et Physique de sec 5/11e)", missingEn: "24 credits of Grade 10 with Applied Math Grade 10 (or DEP in electricity, or High School Diploma with Grade 11 Advanced Math and Grade 11 Physics)" };
      },
    }
];
