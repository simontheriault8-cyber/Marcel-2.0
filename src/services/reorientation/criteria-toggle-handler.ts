import {
  MANUAL_CRITERIA,
  MATH_COURSES,
} from "../../app/data/reorientation-criteria.data";

/**
 * Handles criterion toggling, automatic check cascading (e.g., DES checking secondary and history subjects),
 * mutual exclusions, and orphaned experience criteria cleanup.
 */
export function applyCriterionToggleAndCleanup(
  selectedCriteriaIds: Set<string>,
  id: string
): Set<string> {
  const current = new Set(selectedCriteriaIds);
  if (current.has(id)) {
    current.delete(id);
  } else {
    current.add(id);

    // Auto-checking logic
    if (id === "cs_autre_dep") {
      current.add("sec4_24_credits");
    }

    if (id === "chimie_sec5_11e" || id === "physique_sec5_11e") {
      current.add("sci_tech4_sci10");
    }

    if (id.startsWith("cs_")) {
      const crit = MANUAL_CRITERIA.find((c) => c.id === id);
      if (
        crit &&
        (crit.label.includes("DEP") ||
          crit.label.includes("DEC") ||
          crit.label.includes("diplôme") ||
          crit.label.includes("Diplôme"))
      ) {
        current.add("sec4_24_credits");
      }
    }

    if (
      id.startsWith("bacc_") ||
      id.startsWith("maitrise_") ||
      id.startsWith("doctorat_") ||
      id.startsWith("univ_")
    ) {
      current.add("sec4_24_credits");
    }

    if (id === "des_12e_annee") {
      current.add("sec4_24_credits");
      current.add("francais_sec4_10e");
      current.add("francais_sec5_11e");
      current.add("qc_10_gen"); // Math CST IV
      current.add("sci_tech4_sci10");
      current.add("histoire_sec4");
    }

    if (id === "qc_10_app") {
      current.add("qc_10_gen");
    }

    if (id === "qc_10_adv") {
      current.add("qc_10_app");
      current.add("qc_10_gen");
    }

    if (id === "qc_11_gen") {
      current.add("qc_10_gen");
    }

    if (id === "qc_11_app" || id === "qc_11_adv" || id === "qc_12_cegep201") {
      current.add("qc_10_gen");
      current.add("qc_10_app");
      current.add("qc_10_adv");
      current.add("qc_11_gen");
      current.add("qc_11_app");
      current.add("qc_11_adv");
    }

    if (id === "anglais_sec5_12e") {
      current.add("francais_sec5_11e");
      current.add("francais_sec4_10e");
    }

    if (id === "francais_sec5_11e") {
      current.add("francais_sec4_10e");
    }

    // Mutual exclusions for job 00152
    if (id === "exp_scslm") {
      current.delete("exp_acorplm");
    } else if (id === "exp_acorplm") {
      current.delete("exp_scslm");
    } else if (id === "exp_permis_reglementation") {
      current.delete("exp_lettre_conformite");
    } else if (id === "exp_lettre_conformite") {
      current.delete("exp_permis_reglementation");
    }

    // Mutual exclusions for job 00153
    if (id === "exp_permis_rad") {
      current.delete("exp_association_actrm");
    } else if (id === "exp_association_actrm") {
      current.delete("exp_permis_rad");
    }

    // Mutual exclusions for job 00166
    if (id === "exp_mus_ensembles") {
      current.delete("exp_mus_etudiant");
    } else if (id === "exp_mus_etudiant") {
      current.delete("exp_mus_ensembles");
    }

    // Auto-check logic for university cycles
    if (id.startsWith("bacc_")) {
      current.add("univ_1er_cycle_global");
      const crit = MANUAL_CRITERIA.find((c) => c.id === id);
      if (crit && crit.subCategory) {
        if (crit.subCategory === "Génie") current.add("univ_1er_cycle_genie");
        if (crit.subCategory === "Arts") current.add("univ_1er_cycle_arts");
        if (crit.subCategory === "Sciences")
          current.add("univ_1er_cycle_sciences");
        if (crit.subCategory === "Santé") current.add("univ_1er_cycle_sante");
      }
    }

    if (id.startsWith("maitrise_") || id.startsWith("doctorat_")) {
      current.add("univ_cycle_sup_global");
      const crit = MANUAL_CRITERIA.find((c) => c.id === id);
      if (crit && crit.subCategory) {
        if (crit.subCategory === "Maîtrise")
          current.add("univ_cycle_sup_maitrise");
        if (crit.subCategory === "Doctorat")
          current.add("univ_cycle_sup_doctorat");
      }
    }

    if (
      id === "univ_1er_cycle_genie" ||
      id === "univ_1er_cycle_arts" ||
      id === "univ_1er_cycle_sciences" ||
      id === "univ_1er_cycle_sante"
    ) {
      current.add("univ_1er_cycle_global");
    }

    if (
      id === "univ_cycle_sup_maitrise" ||
      id === "univ_cycle_sup_doctorat"
    ) {
      current.add("univ_cycle_sup_global");
    }
  }

  // Auto-cleanup orphaned experience choices
  const hasEduForPhoto =
    current.has("des_12e_annee") ||
    current.has("aens") ||
    current.has("cs_photo_multimedia") ||
    current.has("bacc_arts_communications") ||
    current.has("bacc_arts_communication_visuelle");
  if (!hasEduForPhoto) {
    current.delete("exp_photo_design");
  }

  const allMathOptions = Object.values(MATH_COURSES).reduce(
    (
      acc: { id: string; label: string; grade: number; diff: number }[],
      courses,
    ) => acc.concat(courses),
    [],
  );
  const selectedMaths = allMathOptions.filter((m) => current.has(m.id));
  const hasMath = (grade: number, diff: number) => {
    return selectedMaths.some((m) => m.grade >= grade && m.diff >= diff);
  };
  const hasMath10App = hasMath(10, 2);

  const hasEduForConduire =
    ((current.has("des_12e_annee") || current.has("aens")) && hasMath10App) ||
    current.has("cs_sec_incendie") ||
    current.has("cs_tech_policieres") ||
    current.has("bacc_arts_justice_criminelle") ||
    current.has("bacc_arts_criminologie") ||
    current.has("bacc_arts_gestion_urgences") ||
    current.has("bacc_arts_etudes_judiciaires") ||
    current.has("bacc_arts_droit") ||
    current.has("bacc_arts_sci_policieres") ||
    current.has("bacc_arts_psychologie") ||
    current.has("bacc_arts_sociologie") ||
    current.has("bacc_arts_sec_publique") ||
    current.has("bacc_arts_sec_policieres") ||
    current.has("bacc_arts_admin_entreprise") ||
    current.has("bacc_arts_etudes_militaires") ||
    current.has("bacc_arts_etudes_internationales_cmr");
  if (!hasEduForConduire) {
    current.delete("exp_permis_conduire");
  }

  // Auto-cleanup for 00152 medical lab technologist
  if (!current.has("cs_tech_lab_med")) {
    current.delete("exp_scslm");
    current.delete("exp_acorplm");
    current.delete("exp_permis_reglementation");
    current.delete("exp_lettre_conformite");
    current.delete("exp_lab_6mois");
  }

  // Auto-cleanup for 00153 medical radiation technologist
  if (!current.has("cs_tech_radio_med")) {
    current.delete("exp_permis_rad");
    current.delete("exp_association_actrm");
  }
  if (
    !current.has("cs_tech_radio_med") &&
    !current.has("cs_dep_sante_infirmiers")
  ) {
    current.delete("exp_lettre_reglementation_en_regle");
  }

  // Auto-cleanup for 00155 biomedical electronics technologist
  if (!current.has("cs_tech_ing_biomed")) {
    current.delete("exp_tech_eb_6mois");
  }

  // Auto-cleanup for 00166 musician
  if (
    (!current.has("des_12e_annee") && !current.has("aens")) ||
    current.has("cs_etude_musique")
  ) {
    current.delete("exp_mus_ensembles");
    current.delete("exp_mus_etudiant");
  }
  if (!current.has("cs_etude_musique")) {
    current.delete("exp_mus_pro");
  }

  // Auto-cleanup for 00164 cook
  if (!current.has("cs_dep_cuisine")) {
    current.delete("exp_sceau_rouge_cuisine");
  }

  // Auto-cleanup for 00335 dental assistant
  if (!current.has("cs_cert_assist_dentaire")) {
    current.delete("exp_permis_assistant_dentaire");
    current.delete("exp_lettre_dentaire_en_regle");
  }

  // Auto-cleanup for 00372 practical nurse
  if (!current.has("cs_dep_sante_infirmiers")) {
    current.delete("exp_permis_infirmier_auxiliaire");
    current.delete("exp_cert_peroperatoire");
  }

  // Auto-cleanup for 00406 paramedical
  if (!current.has("cs_cert_soins_param")) {
    current.delete("exp_permis_paramedical");
  }

  // Auto-cleanup for 00189
  const has00189Base =
    current.has("bacc_sci_environnementales") ||
    current.has("bacc_sci_geologie") ||
    current.has("bacc_sci_technologie_surete_protection_incendie") ||
    current.has("bacc_sci_geomatique") ||
    current.has("bacc_sci_arpentage") ||
    current.has("bacc_genie_chimie_chimique") ||
    current.has("bacc_genie_gestion") ||
    current.has("bacc_genie_ingenierie_gestion") ||
    current.has("bacc_genie_geologie");
  if (!has00189Base) {
    current.delete("exp_00189");
  }

  // Auto-cleanup for 00190
  if (
    !current.has("bacc_sante_physiotherapie") &&
    !current.has("maitrise_sante_physiotherapie")
  ) {
    current.delete("exp_permis_physiotherapie");
    current.delete("exp_lettre_physiotherapie_regle");
  }

  // Auto-cleanup for 00191
  if (!current.has("bacc_sante_medecine_dentaire")) {
    current.delete("exp_cert_bned");
    current.delete("exp_permis_medecine_dentaire");
    current.delete("exp_lettre_dentiste_regle");
    current.delete("exp_cv_dentiste_5ans");
  }

  // Auto-cleanup for 00194
  if (
    !current.has("bacc_sante_pharmacie") &&
    !current.has("doctorat_sante_pharmacie")
  ) {
    current.delete("exp_permis_pharmacie");
    current.delete("exp_lettre_pharmacie_regle");
  }

  // Auto-cleanup for 00195
  if (
    !current.has("bacc_sante_sciences_soins_infirmiers") &&
    !current.has("bacc_sante_sciences_infirmieres")
  ) {
    current.delete("exp_permis_soins_infirmiers");
  }

  // Auto-cleanup for 00198
  if (!current.has("maitrise_sante_service_social")) {
    current.delete("exp_permis_travail_social");
    current.delete("exp_lettre_travail_social_regle");
  }

  // Auto-cleanup for 00203
  const has00203Base =
    current.has("bacc_arts_communications") ||
    current.has("bacc_arts_relations_intern") ||
    current.has("bacc_arts_journalisme") ||
    current.has("bacc_arts_relations_publiques") ||
    current.has("bacc_arts_anglais_francais") ||
    current.has("bacc_arts_science_politique") ||
    current.has("bacc_arts_commercialisation") ||
    current.has("bacc_arts_medias_numeriques") ||
    current.has("bacc_arts_etudes_militaires") ||
    current.has("bacc_arts_anthropologie") ||
    current.has("bacc_arts_psychologie") ||
    current.has("bacc_arts_philosophie") ||
    current.has("bacc_arts_sociologie") ||
    current.has("bacc_arts_linguistique") ||
    current.has("maitrise_arts_communications") ||
    current.has("maitrise_arts_relations_internationales") ||
    current.has("maitrise_arts_journalisme") ||
    current.has("maitrise_arts_relations_publiques") ||
    current.has("maitrise_arts_anglais_francais") ||
    current.has("maitrise_arts_science_politique") ||
    current.has("maitrise_arts_commercialisation") ||
    current.has("maitrise_arts_medias_numeriques") ||
    current.has("maitrise_arts_etudes_militaires") ||
    current.has("maitrise_arts_anthropologie") ||
    current.has("maitrise_arts_psychologie") ||
    current.has("maitrise_arts_philosophie") ||
    current.has("maitrise_arts_sociologie") ||
    current.has("maitrise_arts_linguistique");
  if (!has00203Base) {
    current.delete("exp_00203");
  }

  // Auto-cleanup for 00204
  if (!current.has("bacc_arts_droit")) {
    current.delete("exp_permis_droit");
    current.delete("exp_lettre_barreau_regle");
  }

  // Auto-cleanup for 00208
  if (
    !current.has("bacc_arts_psychologie") &&
    !current.has("bacc_arts_sociologie")
  ) {
    current.delete("exp_00208_bacc");
  }

  // Auto-cleanup for 00211
  if (!current.has("maitrise_arts_education")) {
    current.delete("exp_00211_maitrise");
  }

  return current;
}
