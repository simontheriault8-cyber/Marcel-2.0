import { ManualCriterion, MATH_COURSES, MANUAL_CRITERIA } from "../../app/data/reorientation-criteria.data";

export function evaluateDynamicExperienceCriteria(
  selected: Set<string>,
  isAdmissibleOtherThanEducation: (jobId: string) => boolean
): ManualCriterion[] {
    const criteria: ManualCriterion[] = [];

    // Evaluate if user meets base math conditions based on selected province math courses.
    const allMathOptions = Object.values(MATH_COURSES).reduce(
      (
        acc: { id: string; label: string; grade: number; diff: number }[],
        courses,
      ) => acc.concat(courses),
      [],
    );
    const selectedMaths = allMathOptions.filter((m) => selected.has(m.id));
    const hasMath = (grade: number, diff: number) => {
      return selectedMaths.some((m) => m.grade >= grade && m.diff >= diff);
    };
    const hasMath10App = hasMath(10, 2);

    // exp_photo_design needs one of: 'des_12e_annee', 'aens', 'cs_photo_multimedia', 'bacc_arts_communications', 'bacc_arts_communication_visuelle'
    const hasEduForPhoto =
      selected.has("des_12e_annee") ||
      selected.has("aens") ||
      selected.has("cs_photo_multimedia") ||
      selected.has("bacc_arts_communications") ||
      selected.has("bacc_arts_communication_visuelle");
    if (hasEduForPhoto && isAdmissibleOtherThanEducation("00137")) {
      const crit = MANUAL_CRITERIA.find((c) => c.id === "exp_photo_design");
      if (crit) criteria.push(crit);
    }

    // exp_permis_conduire needs ('des_12e_annee' && 'base_math_10_app') or 'cs_sec_incendie' for 00149, or 'cs_tech_policieres' for 00161, or bacc degrees for 00214
    const check149 =
      (((selected.has("des_12e_annee") || selected.has("aens")) && hasMath10App) ||
        selected.has("cs_sec_incendie")) &&
      isAdmissibleOtherThanEducation("00149");
    const isOutsideCanada = selected.has("etude_hors_canada");
    const hasUniversityDegree161 =
      selected.has("bacc_arts_criminologie") ||
      selected.has("bacc_arts_justice_criminelle") ||
      selected.has("bacc_arts_sci_policieres") ||
      selected.has("bacc_arts_sec_policieres") ||
      selected.has("bacc_arts_sec_publique") ||
      selected.has("bacc_arts_sociologie") ||
      selected.has("bacc_arts_psychologie") ||
      selected.has("bacc_arts_gestion_urgences") ||
      selected.has("bacc_arts_droit") ||
      selected.has("bacc_arts_etudes_judiciaires");
    const hasEducation161 =
      selected.has("cs_tech_policieres") ||
      (!isOutsideCanada && hasUniversityDegree161);
    const check161 =
      hasEducation161 && isAdmissibleOtherThanEducation("00161");
    const hasEducation214 =
      selected.has("bacc_arts_justice_criminelle") ||
      selected.has("bacc_arts_criminologie") ||
      selected.has("bacc_arts_gestion_urgences") ||
      selected.has("bacc_arts_etudes_judiciaires") ||
      selected.has("bacc_arts_droit") ||
      selected.has("bacc_arts_sci_policieres") ||
      selected.has("bacc_arts_psychologie") ||
      selected.has("bacc_arts_sociologie") ||
      selected.has("bacc_arts_sec_publique") ||
      selected.has("bacc_arts_sec_policieres") ||
      selected.has("bacc_arts_admin_entreprise") ||
      selected.has("bacc_arts_etudes_militaires") ||
      selected.has("bacc_arts_etudes_internationales_cmr");
    const check214 =
      hasEducation214 && isAdmissibleOtherThanEducation("00214");

    if (check149 || check161 || check214) {
      const crit = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_conduire",
      );
      if (crit) criteria.push(crit);
    }

    // exp_scslm, exp_acorplm, exp_permis_reglementation, exp_lettre_conformite, exp_lab_6mois need 'cs_tech_lab_med'
    if (
      selected.has("cs_tech_lab_med") &&
      isAdmissibleOtherThanEducation("00152")
    ) {
      const hasScslm = selected.has("exp_scslm");
      const hasAcorplm = selected.has("exp_acorplm");
      if (hasScslm) {
        const crit = MANUAL_CRITERIA.find((c) => c.id === "exp_scslm");
        if (crit) criteria.push(crit);
      } else if (hasAcorplm) {
        const crit = MANUAL_CRITERIA.find((c) => c.id === "exp_acorplm");
        if (crit) criteria.push(crit);
      } else {
        const critScslm = MANUAL_CRITERIA.find((c) => c.id === "exp_scslm");
        const critAcorplm = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_acorplm",
        );
        if (critScslm) criteria.push(critScslm);
        if (critAcorplm) criteria.push(critAcorplm);
      }

      const hasPermis = selected.has("exp_permis_reglementation");
      const hasLettre = selected.has("exp_lettre_conformite");
      if (hasPermis) {
        const crit = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_permis_reglementation",
        );
        if (crit) criteria.push(crit);
      } else if (hasLettre) {
        const crit = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_lettre_conformite",
        );
        if (crit) criteria.push(crit);
      } else {
        const critPermis = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_permis_reglementation",
        );
        const critLettre = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_lettre_conformite",
        );
        if (critPermis) criteria.push(critPermis);
        if (critLettre) criteria.push(critLettre);
      }

      const critLab6 = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_lab_6mois",
      );
      if (critLab6) criteria.push(critLab6);
    }

    // exp_permis_rad, exp_association_actrm, exp_lettre_reglementation_en_regle need 'cs_tech_radio_med'
    if (
      selected.has("cs_tech_radio_med") &&
      isAdmissibleOtherThanEducation("00153")
    ) {
      const hasPermisRad = selected.has("exp_permis_rad");
      const hasAssociationActrm = selected.has("exp_association_actrm");
      if (hasPermisRad) {
        const crit = MANUAL_CRITERIA.find((c) => c.id === "exp_permis_rad");
        if (crit) criteria.push(crit);
      } else if (hasAssociationActrm) {
        const crit = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_association_actrm",
        );
        if (crit) criteria.push(crit);
      } else {
        const critPermisRad = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_permis_rad",
        );
        const critAssociationActrm = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_association_actrm",
        );
        if (critPermisRad) criteria.push(critPermisRad);
        if (critAssociationActrm) criteria.push(critAssociationActrm);
      }

      const critLettreReg = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_lettre_reglementation_en_regle",
      );
      if (critLettreReg) criteria.push(critLettreReg);
    }

    // exp_tech_eb_6mois needs 'cs_tech_ing_biomed'
    if (
      selected.has("cs_tech_ing_biomed") &&
      isAdmissibleOtherThanEducation("00155")
    ) {
      const critTechEb6 = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_tech_eb_6mois",
      );
      if (critTechEb6) criteria.push(critTechEb6);
    }

    // 00166 musician experience criteria
    if (isAdmissibleOtherThanEducation("00166")) {
      if (selected.has("cs_etude_musique")) {
        const critMusPro = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_mus_pro",
        );
        if (critMusPro) criteria.push(critMusPro);
      } else if (selected.has("des_12e_annee") || selected.has("aens")) {
        const hasEnsembles = selected.has("exp_mus_ensembles");
        const hasEtudiant = selected.has("exp_mus_etudiant");
        if (hasEnsembles) {
          const crit = MANUAL_CRITERIA.find(
            (c) => c.id === "exp_mus_ensembles",
          );
          if (crit) criteria.push(crit);
        } else if (hasEtudiant) {
          const crit = MANUAL_CRITERIA.find(
            (c) => c.id === "exp_mus_etudiant",
          );
          if (crit) criteria.push(crit);
        } else {
          const critEnsembles = MANUAL_CRITERIA.find(
            (c) => c.id === "exp_mus_ensembles",
          );
          const critEtudiant = MANUAL_CRITERIA.find(
            (c) => c.id === "exp_mus_etudiant",
          );
          if (critEnsembles) criteria.push(critEnsembles);
          if (critEtudiant) criteria.push(critEtudiant);
        }
      }
    }

    // 00164 cook experience criteria
    if (
      selected.has("cs_dep_cuisine") &&
      isAdmissibleOtherThanEducation("00164")
    ) {
      const critSceauRouge = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_sceau_rouge_cuisine",
      );
      if (critSceauRouge) criteria.push(critSceauRouge);
    }

    // 00335 dental assistant experience criteria
    if (
      selected.has("cs_cert_assist_dentaire") &&
      isAdmissibleOtherThanEducation("00335")
    ) {
      const critPermisDentaire = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_assistant_dentaire",
      );
      const critLettreDentaire = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_lettre_dentaire_en_regle",
      );
      if (critPermisDentaire) criteria.push(critPermisDentaire);
      if (critLettreDentaire) criteria.push(critLettreDentaire);
    }

    // 00372 practical nurse experience criteria
    if (
      selected.has("cs_dep_sante_infirmiers") &&
      isAdmissibleOtherThanEducation("00372")
    ) {
      const critPermisInfirmier = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_infirmier_auxiliaire",
      );
      const critLettreReglementation = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_lettre_reglementation_en_regle",
      );
      const critCertPeroperatoire = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_cert_peroperatoire",
      );
      if (critPermisInfirmier) criteria.push(critPermisInfirmier);
      if (critLettreReglementation) criteria.push(critLettreReglementation);
      if (critCertPeroperatoire) criteria.push(critCertPeroperatoire);
    }

    // 00406 paramedic experience criteria
    if (
      selected.has("cs_cert_soins_param") &&
      isAdmissibleOtherThanEducation("00406")
    ) {
      const critPermisParamed = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_paramedical",
      );
      if (critPermisParamed) criteria.push(critPermisParamed);
    }

    // 00189 experience criteria
    const has00189Base =
      selected.has("bacc_sci_environnementales") ||
      selected.has("bacc_sci_geologie") ||
      selected.has("bacc_sci_technologie_surete_protection_incendie") ||
      selected.has("bacc_sci_geomatique") ||
      selected.has("bacc_sci_arpentage") ||
      selected.has("bacc_genie_chimie_chimique") ||
      selected.has("bacc_genie_gestion") ||
      selected.has("bacc_genie_ingenierie_gestion") ||
      selected.has("bacc_genie_geologie");
    if (has00189Base && isAdmissibleOtherThanEducation("00189")) {
      const crit00189 = MANUAL_CRITERIA.find((c) => c.id === "exp_00189");
      if (crit00189) criteria.push(crit00189);
    }

    // 00190 experience criteria
    if (
      (selected.has("bacc_sante_physiotherapie") ||
        selected.has("maitrise_sante_physiotherapie")) &&
      isAdmissibleOtherThanEducation("00190")
    ) {
      const critPermisPhysio = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_physiotherapie",
      );
      const critLettrePhysio = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_lettre_physiotherapie_regle",
      );
      if (critPermisPhysio) criteria.push(critPermisPhysio);
      if (critLettrePhysio) criteria.push(critLettrePhysio);
    }

    // 00191 experience criteria
    if (
      selected.has("bacc_sante_medecine_dentaire") &&
      isAdmissibleOtherThanEducation("00191")
    ) {
      const critBned = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_cert_bned",
      );
      const critPermisDentaire = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_medecine_dentaire",
      );
      const critLettreDentiste = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_lettre_dentiste_regle",
      );
      const critCvDentiste = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_cv_dentiste_5ans",
      );
      if (critBned) criteria.push(critBned);
      if (critPermisDentaire) criteria.push(critPermisDentaire);
      if (critLettreDentiste) criteria.push(critLettreDentiste);
      if (critCvDentiste) criteria.push(critCvDentiste);
    }

    // 00194 experience criteria
    if (
      (selected.has("bacc_sante_pharmacie") ||
        selected.has("doctorat_sante_pharmacie")) &&
      isAdmissibleOtherThanEducation("00194")
    ) {
      const critPermisPharmacie = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_pharmacie",
      );
      const critLettrePharmacie = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_lettre_pharmacie_regle",
      );
      if (critPermisPharmacie) criteria.push(critPermisPharmacie);
      if (critLettrePharmacie) criteria.push(critLettrePharmacie);
    }

    // 00195 experience criteria
    if (
      (selected.has("bacc_sante_sciences_soins_infirmiers") ||
        selected.has("bacc_sante_sciences_infirmieres")) &&
      isAdmissibleOtherThanEducation("00195")
    ) {
      const critPermisInfirmiers = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_soins_infirmiers",
      );
      if (critPermisInfirmiers) criteria.push(critPermisInfirmiers);
    }

    // 00198 experience criteria
    if (
      selected.has("maitrise_sante_service_social") &&
      isAdmissibleOtherThanEducation("00198")
    ) {
      const critPermisSocial = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_travail_social",
      );
      const critLettreSocial = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_lettre_travail_social_regle",
      );
      if (critPermisSocial) criteria.push(critPermisSocial);
      if (critLettreSocial) criteria.push(critLettreSocial);
    }

    // 00203 experience criteria
    if (
      (selected.has("bacc_arts_communications") ||
        selected.has("bacc_arts_relations_intern") ||
        selected.has("bacc_arts_journalisme") ||
        selected.has("bacc_arts_relations_publiques") ||
        selected.has("bacc_arts_anglais_francais") ||
        selected.has("bacc_arts_science_politique") ||
        selected.has("bacc_arts_commercialisation") ||
        selected.has("bacc_arts_medias_numeriques") ||
        selected.has("bacc_arts_etudes_militaires") ||
        selected.has("bacc_arts_anthropologie") ||
        selected.has("bacc_arts_psychologie") ||
        selected.has("bacc_arts_philosophie") ||
        selected.has("bacc_arts_sociologie") ||
        selected.has("bacc_arts_linguistique") ||
        selected.has("maitrise_arts_communications") ||
        selected.has("maitrise_arts_relations_internationales") ||
        selected.has("maitrise_arts_journalisme") ||
        selected.has("maitrise_arts_relations_publiques") ||
        selected.has("maitrise_arts_anglais_francais") ||
        selected.has("maitrise_arts_science_politique") ||
        selected.has("maitrise_arts_commercialisation") ||
        selected.has("maitrise_arts_medias_numeriques") ||
        selected.has("maitrise_arts_etudes_militaires") ||
        selected.has("maitrise_arts_anthropologie") ||
        selected.has("maitrise_arts_psychologie") ||
        selected.has("maitrise_arts_philosophie") ||
        selected.has("maitrise_arts_sociologie") ||
        selected.has("maitrise_arts_linguistique")) &&
      isAdmissibleOtherThanEducation("00203")
    ) {
      const crit00203 = MANUAL_CRITERIA.find((c) => c.id === "exp_00203");
      if (crit00203) criteria.push(crit00203);
    }

    // 00204 experience criteria
    if (
      selected.has("bacc_arts_droit") &&
      isAdmissibleOtherThanEducation("00204")
    ) {
      const critPermisDroit = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_permis_droit",
      );
      const critLettreBarreau = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_lettre_barreau_regle",
      );
      if (critPermisDroit) criteria.push(critPermisDroit);
      if (critLettreBarreau) criteria.push(critLettreBarreau);
    }

    // 00208 experience criteria (only for baccalaureate degrees)
    if (
      (selected.has("bacc_arts_psychologie") ||
        selected.has("bacc_arts_sociologie")) &&
      isAdmissibleOtherThanEducation("00208")
    ) {
      const crit00208 = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_00208_bacc",
      );
      if (crit00208) criteria.push(crit00208);
    }

    // 00211 experience criteria (only for master's degree)
    if (
      selected.has("maitrise_arts_education") &&
      isAdmissibleOtherThanEducation("00211")
    ) {
      const crit00211 = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_00211_maitrise",
      );
      if (crit00211) criteria.push(crit00211);
    }

    // 00349 experience criteria
    if (
      (selected.has("bacc_arts_theologie") ||
        selected.has("maitrise_theologie")) &&
      isAdmissibleOtherThanEducation("00349")
    ) {
      const critLeader = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_00349_leader_foi",
      );
      const critEndosse = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_00349_endosse_ciamc",
      );
      const critEntrevue = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_00349_entrevue_aum",
      );
      if (critLeader) criteria.push(critLeader);
      if (critEndosse) criteria.push(critEndosse);
      if (critEntrevue) criteria.push(critEntrevue);
    }

    // 00374 experience criteria
    if (
      (selected.has("bacc_sante_adjoint_medecin") ||
        selected.has("maitrise_adjoint_medecin") ||
        selected.has("doctorat_adjoint_medecin")) &&
      isAdmissibleOtherThanEducation("00374")
    ) {
      const critCertPermis = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_00374_cert_permis",
      );
      const critLettreRegle = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_00374_lettre_regle",
      );
      if (critCertPermis) criteria.push(critCertPermis);
      if (critLettreRegle) criteria.push(critLettreRegle);
    }

    // 00390 experience criteria
    if (selected.has("doctorat_medecine")) {
      if (isAdmissibleOtherThanEducation("00390")) {
        const critResidence = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_00390_residence",
        );
        const critCert = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_00390_certification",
        );
        const critPermis = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_00390_permis",
        );
        const critAtte = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_00390_attestation",
        );
        const critCivil = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_00390_civil",
        );
        if (critResidence) criteria.push(critResidence);
        if (critCert) criteria.push(critCert);
        if (critPermis) criteria.push(critPermis);
        if (critAtte) criteria.push(critAtte);
        if (critCivil) criteria.push(critCivil);
      }

      // 00393 experience criteria (Médecin de famille)
      if (isAdmissibleOtherThanEducation("00393")) {
        const critAuto393 = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_00393_autorisation",
        );
        const critLettre393 = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_00393_lettre_regle",
        );
        const critCert393 = MANUAL_CRITERIA.find(
          (c) => c.id === "exp_00393_certification",
        );
        if (critAuto393) criteria.push(critAuto393);
        if (critLettre393) criteria.push(critLettre393);
        if (critCert393) criteria.push(critCert393);
      }
    }

    // 00398 experience criteria
    const baccSanteSaufPlusHaut = [
      "bacc_sante_adjoint_medecin",
      "bacc_sante_biochimie",
      "bacc_sante_biologie",
      "bacc_sante_biologie_humaine",
      "bacc_sante_diplome_sciences_vie",
      "bacc_sante_genie_biomedical",
      "bacc_sante_kinesiologie",
      "bacc_sante_medecine_dentaire",
      "bacc_sante_microbiologie",
      "bacc_sante_pharmacie",
      "bacc_sante_physiologie_humaine",
      "bacc_sante_physiotherapie",
      "bacc_sante_sciences_soins_infirmiers",
      "bacc_sante_sciences_infirmieres",
    ].some((id) => selected.has(id));

    const dEsSanteSaufPlusHaut = [
      "doctorat_adjoint_medecin",
      "maitrise_adjoint_medecin",
      "doctorat_medecine",
      "doctorat_sante_pharmacie",
      "maitrise_sante_admin_sante",
      "maitrise_sante_biochimie",
      "maitrise_sante_biologie",
      "maitrise_sante_biologie_humaine",
      "maitrise_sante_diplome_sciences_vie",
      "maitrise_sante_genie_biomedical",
      "maitrise_sante_gestion_soins_sante",
      "maitrise_sante_integration_systemes_humains",
      "maitrise_sante_kinesiologie",
      "maitrise_sante_physiotherapie",
      "maitrise_sante_microbiologie",
      "maitrise_sante_physiologie_humaine",
      "maitrise_sante_environnementale_professionnelle",
      "maitrise_sante_publique",
    ].some((id) => selected.has(id));

    if (
      (baccSanteSaufPlusHaut || dEsSanteSaufPlusHaut) &&
      isAdmissibleOtherThanEducation("00398")
    ) {
      const critGSS = MANUAL_CRITERIA.find(
        (c) => c.id === "exp_00398_gestion",
      );
      if (critGSS) criteria.push(critGSS);
    }

    // Check CV requirement for specific jobs (00152, 00155, 00335, 00372, 00378, 00406, 00190, 00194, 00195, 00198, 00204, 00374, 00153, 00191, 00349, 00390, 00398)
    const cvJobsEduEligible =
      (selected.has("cs_tech_lab_med") && isAdmissibleOtherThanEducation("00152")) ||
      (selected.has("cs_tech_radio_med") && isAdmissibleOtherThanEducation("00153")) ||
      (selected.has("cs_tech_ing_biomed") && isAdmissibleOtherThanEducation("00155")) ||
      ((selected.has("bacc_sante_physiotherapie") || selected.has("maitrise_sante_physiotherapie")) && isAdmissibleOtherThanEducation("00190")) ||
      (selected.has("bacc_sante_medecine_dentaire") && isAdmissibleOtherThanEducation("00191")) ||
      ((selected.has("bacc_sante_pharmacie") || selected.has("doctorat_sante_pharmacie")) && isAdmissibleOtherThanEducation("00194")) ||
      ((selected.has("bacc_sante_sciences_soins_infirmiers") || selected.has("bacc_sante_sciences_infirmieres")) && isAdmissibleOtherThanEducation("00195")) ||
      (selected.has("maitrise_sante_service_social") && isAdmissibleOtherThanEducation("00198")) ||
      (selected.has("bacc_arts_droit") && isAdmissibleOtherThanEducation("00204")) ||
      (selected.has("cs_cert_assist_dentaire") && isAdmissibleOtherThanEducation("00335")) ||
      ((selected.has("bacc_arts_theologie") || selected.has("maitrise_theologie")) && isAdmissibleOtherThanEducation("00349")) ||
      (selected.has("cs_dep_sante_infirmiers") && isAdmissibleOtherThanEducation("00372")) ||
      ((selected.has("bacc_sante_adjoint_medecin") || selected.has("maitrise_adjoint_medecin") || selected.has("doctorat_adjoint_medecin")) && isAdmissibleOtherThanEducation("00374")) ||
      ((((selected.has("des_12e_annee") || selected.has("aens")) && selected.has("base_math_11_adv")) || ((selected.has("des_12e_annee") || selected.has("aens")) && selected.has("info_sec5_12e")) || selected.has("cs_dip_cyber")) && isAdmissibleOtherThanEducation("00378")) ||
      (selected.has("doctorat_medecine") && isAdmissibleOtherThanEducation("00390")) ||
      ((baccSanteSaufPlusHaut || dEsSanteSaufPlusHaut) && isAdmissibleOtherThanEducation("00398")) ||
      (selected.has("cs_cert_soins_param") && isAdmissibleOtherThanEducation("00406"));

    if (cvJobsEduEligible) {
      const critCv = MANUAL_CRITERIA.find((c) => c.id === "exp_cv_recent");
      if (critCv && !criteria.some((c) => c.id === "exp_cv_recent")) {
        criteria.push(critCv);
      }
    }

    return criteria;
}

export { applyCriterionToggleAndCleanup } from "./criteria-toggle-handler";

