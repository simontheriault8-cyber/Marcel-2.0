import { ManualCriterion } from "../../data/reorientation-criteria.data";

export function computeReoExperienceCriteria(this: any): ManualCriterion[] {
    const selected = this.selectedCriteriaIds();
    const criteria: ManualCriterion[] = [];

    // Evaluate if user meets base math conditions based on selected province math courses.
    const allMathOptions = (Object.values(this.MATH_COURSES) as any[]).reduce(
      (
        acc: { id: string; label: string; grade: number; diff: number }[],
        courses: any,
      ) => acc.concat(courses),
      [],
    );
    const selectedMaths = allMathOptions.filter((m) => selected.has(m.id));
    const hasMath = (grade: number, diff: number) => {
      return selectedMaths.some((m) => m.grade >= grade && m.diff >= diff);
    };
    const hasMath10App = hasMath(10, 2);

    // exp_photo_design needs one of: 'des_12e_annee', 'cs_photo_multimedia', 'bacc_arts_communications', 'bacc_arts_communication_visuelle'
    const hasEduForPhoto =
      selected.has("des_12e_annee") ||
      selected.has("cs_photo_multimedia") ||
      selected.has("bacc_arts_communications") ||
      selected.has("bacc_arts_communication_visuelle");
    if (hasEduForPhoto && this.isAdmissibleOtherThanEducation("00137")) {
      const crit = this.manualCriteria.find((c) => c.id === "exp_photo_design");
      if (crit) criteria.push(crit);
    }

    // exp_permis_conduire needs ('des_12e_annee' && 'base_math_10_app') or 'cs_sec_incendie' for 00149, or 'cs_tech_policieres' for 00161, or bacc degrees for 00214
    const check149 =
      ((selected.has("des_12e_annee") && hasMath10App) ||
        selected.has("cs_sec_incendie")) &&
      this.isAdmissibleOtherThanEducation("00149");
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
      hasEducation161 &&
      this.isAdmissibleOtherThanEducation("00161");
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
      hasEducation214 && this.isAdmissibleOtherThanEducation("00214");

    if (check149 || check161 || check214) {
      const crit = this.manualCriteria.find(
        (c) => c.id === "exp_permis_conduire",
      );
      if (crit) criteria.push(crit);
    }

    // exp_scslm, exp_acorplm, exp_permis_reglementation, exp_lettre_conformite, exp_lab_6mois need 'cs_tech_lab_med'
    if (
      selected.has("cs_tech_lab_med") &&
      this.isAdmissibleOtherThanEducation("00152")
    ) {
      const hasScslm = selected.has("exp_scslm");
      const hasAcorplm = selected.has("exp_acorplm");
      if (hasScslm) {
        const crit = this.manualCriteria.find((c) => c.id === "exp_scslm");
        if (crit) criteria.push(crit);
      } else if (hasAcorplm) {
        const crit = this.manualCriteria.find((c) => c.id === "exp_acorplm");
        if (crit) criteria.push(crit);
      } else {
        const critScslm = this.manualCriteria.find((c) => c.id === "exp_scslm");
        const critAcorplm = this.manualCriteria.find(
          (c) => c.id === "exp_acorplm",
        );
        if (critScslm) criteria.push(critScslm);
        if (critAcorplm) criteria.push(critAcorplm);
      }

      const hasPermis = selected.has("exp_permis_reglementation");
      const hasLettre = selected.has("exp_lettre_conformite");
      if (hasPermis) {
        const crit = this.manualCriteria.find(
          (c) => c.id === "exp_permis_reglementation",
        );
        if (crit) criteria.push(crit);
      } else if (hasLettre) {
        const crit = this.manualCriteria.find(
          (c) => c.id === "exp_lettre_conformite",
        );
        if (crit) criteria.push(crit);
      } else {
        const critPermis = this.manualCriteria.find(
          (c) => c.id === "exp_permis_reglementation",
        );
        const critLettre = this.manualCriteria.find(
          (c) => c.id === "exp_lettre_conformite",
        );
        if (critPermis) criteria.push(critPermis);
        if (critLettre) criteria.push(critLettre);
      }

      const critLab6 = this.manualCriteria.find(
        (c) => c.id === "exp_lab_6mois",
      );
      if (critLab6) criteria.push(critLab6);
    }

    // exp_permis_rad, exp_association_actrm, exp_lettre_reglementation_en_regle need 'cs_tech_radio_med'
    if (
      selected.has("cs_tech_radio_med") &&
      this.isAdmissibleOtherThanEducation("00153")
    ) {
      const hasPermisRad = selected.has("exp_permis_rad");
      const hasAssociationActrm = selected.has("exp_association_actrm");
      if (hasPermisRad) {
        const crit = this.manualCriteria.find((c) => c.id === "exp_permis_rad");
        if (crit) criteria.push(crit);
      } else if (hasAssociationActrm) {
        const crit = this.manualCriteria.find(
          (c) => c.id === "exp_association_actrm",
        );
        if (crit) criteria.push(crit);
      } else {
        const critPermisRad = this.manualCriteria.find(
          (c) => c.id === "exp_permis_rad",
        );
        const critAssociationActrm = this.manualCriteria.find(
          (c) => c.id === "exp_association_actrm",
        );
        if (critPermisRad) criteria.push(critPermisRad);
        if (critAssociationActrm) criteria.push(critAssociationActrm);
      }

      const critLettreReg = this.manualCriteria.find(
        (c) => c.id === "exp_lettre_reglementation_en_regle",
      );
      if (critLettreReg) criteria.push(critLettreReg);
    }

    // exp_tech_eb_6mois needs 'cs_tech_ing_biomed'
    if (
      selected.has("cs_tech_ing_biomed") &&
      this.isAdmissibleOtherThanEducation("00155")
    ) {
      const critTechEb6 = this.manualCriteria.find(
        (c) => c.id === "exp_tech_eb_6mois",
      );
      if (critTechEb6) criteria.push(critTechEb6);
    }

    // 00166 musician experience criteria
    if (this.isAdmissibleOtherThanEducation("00166")) {
      if (selected.has("cs_etude_musique")) {
        const critMusPro = this.manualCriteria.find(
          (c) => c.id === "exp_mus_pro",
        );
        if (critMusPro) criteria.push(critMusPro);
      } else if (this.hasCriterion(selected, "des_12e_annee")) {
        const hasEnsembles = selected.has("exp_mus_ensembles");
        const hasEtudiant = selected.has("exp_mus_etudiant");
        if (hasEnsembles) {
          const crit = this.manualCriteria.find(
            (c) => c.id === "exp_mus_ensembles",
          );
          if (crit) criteria.push(crit);
        } else if (hasEtudiant) {
          const crit = this.manualCriteria.find(
            (c) => c.id === "exp_mus_etudiant",
          );
          if (crit) criteria.push(crit);
        } else {
          const critEnsembles = this.manualCriteria.find(
            (c) => c.id === "exp_mus_ensembles",
          );
          const critEtudiant = this.manualCriteria.find(
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
      this.isAdmissibleOtherThanEducation("00164")
    ) {
      const critSceauRouge = this.manualCriteria.find(
        (c) => c.id === "exp_sceau_rouge_cuisine",
      );
      if (critSceauRouge) criteria.push(critSceauRouge);
    }

    // 00335 dental assistant experience criteria
    if (
      selected.has("cs_cert_assist_dentaire") &&
      this.isAdmissibleOtherThanEducation("00335")
    ) {
      const critPermisDentaire = this.manualCriteria.find(
        (c) => c.id === "exp_permis_assistant_dentaire",
      );
      const critLettreDentaire = this.manualCriteria.find(
        (c) => c.id === "exp_lettre_dentaire_en_regle",
      );
      if (critPermisDentaire) criteria.push(critPermisDentaire);
      if (critLettreDentaire) criteria.push(critLettreDentaire);
    }

    // 00372 practical nurse experience criteria
    if (
      selected.has("cs_dep_sante_infirmiers") &&
      this.isAdmissibleOtherThanEducation("00372")
    ) {
      const critPermisInfirmier = this.manualCriteria.find(
        (c) => c.id === "exp_permis_infirmier_auxiliaire",
      );
      const critLettreReglementation = this.manualCriteria.find(
        (c) => c.id === "exp_lettre_reglementation_en_regle",
      );
      const critCertPeroperatoire = this.manualCriteria.find(
        (c) => c.id === "exp_cert_peroperatoire",
      );
      if (critPermisInfirmier) criteria.push(critPermisInfirmier);
      if (critLettreReglementation) criteria.push(critLettreReglementation);
      if (critCertPeroperatoire) criteria.push(critCertPeroperatoire);
    }

    // 00406 paramedic experience criteria
    if (
      selected.has("cs_cert_soins_param") &&
      this.isAdmissibleOtherThanEducation("00406")
    ) {
      const critPermisParamed = this.manualCriteria.find(
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
    if (has00189Base && this.isAdmissibleOtherThanEducation("00189")) {
      const crit00189 = this.manualCriteria.find((c) => c.id === "exp_00189");
      if (crit00189) criteria.push(crit00189);
    }

    // 00190 experience criteria
    if (
      (selected.has("bacc_sante_physiotherapie") ||
        selected.has("maitrise_sante_physiotherapie")) &&
      this.isAdmissibleOtherThanEducation("00190")
    ) {
      const critPermisPhysio = this.manualCriteria.find(
        (c) => c.id === "exp_permis_physiotherapie",
      );
      const critLettrePhysio = this.manualCriteria.find(
        (c) => c.id === "exp_lettre_physiotherapie_regle",
      );
      if (critPermisPhysio) criteria.push(critPermisPhysio);
      if (critLettrePhysio) criteria.push(critLettrePhysio);
    }

    // 00191 experience criteria
    if (
      selected.has("bacc_sante_medecine_dentaire") &&
      this.isAdmissibleOtherThanEducation("00191")
    ) {
      const critBned = this.manualCriteria.find(
        (c) => c.id === "exp_cert_bned",
      );
      const critPermisDentaire = this.manualCriteria.find(
        (c) => c.id === "exp_permis_medecine_dentaire",
      );
      const critLettreDentiste = this.manualCriteria.find(
        (c) => c.id === "exp_lettre_dentiste_regle",
      );
      const critCvDentiste = this.manualCriteria.find(
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
      this.isAdmissibleOtherThanEducation("00194")
    ) {
      const critPermisPharmacie = this.manualCriteria.find(
        (c) => c.id === "exp_permis_pharmacie",
      );
      const critLettrePharmacie = this.manualCriteria.find(
        (c) => c.id === "exp_lettre_pharmacie_regle",
      );
      if (critPermisPharmacie) criteria.push(critPermisPharmacie);
      if (critLettrePharmacie) criteria.push(critLettrePharmacie);
    }

    // 00195 experience criteria
    if (
      (selected.has("bacc_sante_sciences_soins_infirmiers") ||
        selected.has("bacc_sante_sciences_infirmieres")) &&
      this.isAdmissibleOtherThanEducation("00195")
    ) {
      const critPermisInfirmiers = this.manualCriteria.find(
        (c) => c.id === "exp_permis_soins_infirmiers",
      );
      if (critPermisInfirmiers) criteria.push(critPermisInfirmiers);
    }

    // 00198 experience criteria
    if (
      selected.has("maitrise_sante_service_social") &&
      this.isAdmissibleOtherThanEducation("00198")
    ) {
      const critPermisSocial = this.manualCriteria.find(
        (c) => c.id === "exp_permis_travail_social",
      );
      const critLettreSocial = this.manualCriteria.find(
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
      this.isAdmissibleOtherThanEducation("00203")
    ) {
      const crit00203 = this.manualCriteria.find((c) => c.id === "exp_00203");
      if (crit00203) criteria.push(crit00203);
    }

    // 00204 experience criteria
    if (
      selected.has("bacc_arts_droit") &&
      this.isAdmissibleOtherThanEducation("00204")
    ) {
      const critPermisDroit = this.manualCriteria.find(
        (c) => c.id === "exp_permis_droit",
      );
      const critLettreBarreau = this.manualCriteria.find(
        (c) => c.id === "exp_lettre_barreau_regle",
      );
      if (critPermisDroit) criteria.push(critPermisDroit);
      if (critLettreBarreau) criteria.push(critLettreBarreau);
    }

    // 00208 experience criteria (only for baccalaureate degrees)
    if (
      (selected.has("bacc_arts_psychologie") ||
        selected.has("bacc_arts_sociologie")) &&
      this.isAdmissibleOtherThanEducation("00208")
    ) {
      const crit00208 = this.manualCriteria.find(
        (c) => c.id === "exp_00208_bacc",
      );
      if (crit00208) criteria.push(crit00208);
    }

    // 00211 experience criteria (only for master's degree)
    if (
      selected.has("maitrise_arts_education") &&
      this.isAdmissibleOtherThanEducation("00211")
    ) {
      const crit00211 = this.manualCriteria.find(
        (c) => c.id === "exp_00211_maitrise",
      );
      if (crit00211) criteria.push(crit00211);
    }

    // 00349 experience criteria
    if (
      (selected.has("bacc_arts_theologie") ||
        selected.has("maitrise_theologie")) &&
      this.isAdmissibleOtherThanEducation("00349")
    ) {
      const critLeader = this.manualCriteria.find(
        (c) => c.id === "exp_00349_leader_foi",
      );
      const critEndosse = this.manualCriteria.find(
        (c) => c.id === "exp_00349_endosse_ciamc",
      );
      const critEntrevue = this.manualCriteria.find(
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
      this.isAdmissibleOtherThanEducation("00374")
    ) {
      const critCertPermis = this.manualCriteria.find(
        (c) => c.id === "exp_00374_cert_permis",
      );
      const critLettreRegle = this.manualCriteria.find(
        (c) => c.id === "exp_00374_lettre_regle",
      );
      if (critCertPermis) criteria.push(critCertPermis);
      if (critLettreRegle) criteria.push(critLettreRegle);
    }

    // 00390 experience criteria
    if (selected.has("doctorat_medecine")) {
      if (this.isAdmissibleOtherThanEducation("00390")) {
        const critResidence = this.manualCriteria.find(
          (c) => c.id === "exp_00390_residence",
        );
        const critCert = this.manualCriteria.find(
          (c) => c.id === "exp_00390_certification",
        );
        const critPermis = this.manualCriteria.find(
          (c) => c.id === "exp_00390_permis",
        );
        const critAtte = this.manualCriteria.find(
          (c) => c.id === "exp_00390_attestation",
        );
        const critCivil = this.manualCriteria.find(
          (c) => c.id === "exp_00390_civil",
        );
        if (critResidence) criteria.push(critResidence);
        if (critCert) criteria.push(critCert);
        if (critPermis) criteria.push(critPermis);
        if (critAtte) criteria.push(critAtte);
        if (critCivil) criteria.push(critCivil);
      }

      // 00393 experience criteria (Médecin de famille)
      if (this.isAdmissibleOtherThanEducation("00393")) {
        const critAuto393 = this.manualCriteria.find(
          (c) => c.id === "exp_00393_autorisation",
        );
        const critLettre393 = this.manualCriteria.find(
          (c) => c.id === "exp_00393_lettre_regle",
        );
        const critCert393 = this.manualCriteria.find(
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
      this.isAdmissibleOtherThanEducation("00398")
    ) {
      const critGSS = this.manualCriteria.find(
        (c) => c.id === "exp_00398_gestion",
      );
      if (critGSS) criteria.push(critGSS);
    }

    // Check CV requirement for specific jobs (00152, 00155, 00335, 00372, 00378, 00406, 00190, 00194, 00195, 00198, 00204, 00374, 00153, 00191, 00349, 00390, 00398)
    const cvJobsEduEligible =
      (selected.has("cs_tech_lab_med") && this.isAdmissibleOtherThanEducation("00152")) ||
      (selected.has("cs_tech_radio_med") && this.isAdmissibleOtherThanEducation("00153")) ||
      (selected.has("cs_tech_ing_biomed") && this.isAdmissibleOtherThanEducation("00155")) ||
      ((selected.has("bacc_sante_physiotherapie") || selected.has("maitrise_sante_physiotherapie")) && this.isAdmissibleOtherThanEducation("00190")) ||
      (selected.has("bacc_sante_medecine_dentaire") && this.isAdmissibleOtherThanEducation("00191")) ||
      ((selected.has("bacc_sante_pharmacie") || selected.has("doctorat_sante_pharmacie")) && this.isAdmissibleOtherThanEducation("00194")) ||
      ((selected.has("bacc_sante_sciences_soins_infirmiers") || selected.has("bacc_sante_sciences_infirmieres")) && this.isAdmissibleOtherThanEducation("00195")) ||
      (selected.has("maitrise_sante_service_social") && this.isAdmissibleOtherThanEducation("00198")) ||
      (selected.has("bacc_arts_droit") && this.isAdmissibleOtherThanEducation("00204")) ||
      (selected.has("cs_cert_assist_dentaire") && this.isAdmissibleOtherThanEducation("00335")) ||
      ((selected.has("bacc_arts_theologie") || selected.has("maitrise_theologie")) && this.isAdmissibleOtherThanEducation("00349")) ||
      (selected.has("cs_dep_sante_infirmiers") && this.isAdmissibleOtherThanEducation("00372")) ||
      ((selected.has("bacc_sante_adjoint_medecin") || selected.has("maitrise_adjoint_medecin") || selected.has("doctorat_adjoint_medecin")) && this.isAdmissibleOtherThanEducation("00374")) ||
      (((selected.has("des_12e_annee") && selected.has("base_math_11_adv")) || (selected.has("des_12e_annee") && selected.has("info_sec5_12e")) || selected.has("cs_dip_cyber")) && this.isAdmissibleOtherThanEducation("00378")) ||
      (selected.has("doctorat_medecine") && this.isAdmissibleOtherThanEducation("00390")) ||
      ((baccSanteSaufPlusHaut || dEsSanteSaufPlusHaut) && this.isAdmissibleOtherThanEducation("00398")) ||
      (selected.has("cs_cert_soins_param") && this.isAdmissibleOtherThanEducation("00406"));

    if (cvJobsEduEligible) {
      const critCv = this.manualCriteria.find((c) => c.id === "exp_cv_recent");
      if (critCv && !criteria.some((c) => c.id === "exp_cv_recent")) {
        criteria.push(critCv);
      }
    }

    return criteria;
}

export function toggleReoManualCriterion(this: any, id: string): void {
    const current = new Set(this.selectedCriteriaIds());
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
        const crit = this.manualCriteria.find((c) => c.id === id);
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
        const crit = this.manualCriteria.find((c) => c.id === id);
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
        const crit = this.manualCriteria.find((c) => c.id === id);
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
      current.has("cs_photo_multimedia") ||
      current.has("bacc_arts_communications") ||
      current.has("bacc_arts_communication_visuelle");
    if (!hasEduForPhoto) {
      current.delete("exp_photo_design");
    }

    const allMathOptions = (Object.values(this.MATH_COURSES) as any[]).reduce(
      (
        acc: { id: string; label: string; grade: number; diff: number }[],
        courses: any,
      ) => acc.concat(courses),
      [],
    );
    const selectedMaths = allMathOptions.filter((m) => current.has(m.id));
    const hasMath = (grade: number, diff: number) => {
      return selectedMaths.some((m) => m.grade >= grade && m.diff >= diff);
    };
    const hasMath10App = hasMath(10, 2);

    const hasEduForConduire =
      (current.has("des_12e_annee") && hasMath10App) ||
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
    if ((!current.has("des_12e_annee") && !current.has("aens")) || current.has("cs_etude_musique")) {
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

    this.selectedCriteriaIds.set(current);
}
