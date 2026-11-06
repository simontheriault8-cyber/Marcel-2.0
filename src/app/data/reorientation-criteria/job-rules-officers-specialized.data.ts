import { JobRule } from "./criteria.models";

/**
 * Règles d'admissibilité académique pour les 27 métiers d'officiers et officiers spécialistes.
 * Complète JOB_RULES_PART1 et JOB_RULES_PART2 pour assurer une couverture à 100% des métiers de JOBS_DATA.
 */
export const JOB_RULES_OFFICERS_SPECIALIZED: JobRule[] = [
  // 00181 - GÉNIE (Combat Engineer Officer)
  {
    jobs: ["00181"],
    allowPR: true,
    customCheck: (selected) => {
      const hasEng = Array.from(selected).some((id) => id.startsWith("bacc_genie_"));
      const hasUniv = selected.has("univ_1er_cycle_global") || Array.from(selected).some((id) => id.startsWith("bacc_"));
      if (hasEng || hasUniv) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat universitaire en génie ou dans une discipline connexe",
        missingEn: "University Bachelor's degree in engineering or related discipline",
      };
    },
  },

  // 00185 - GÉNIE AÉROSPATIAL (AERO)
  {
    jobs: ["00185"],
    allowPR: true,
    customCheck: (selected) => {
      const hasEng = Array.from(selected).some((id) => id.startsWith("bacc_genie_"));
      if (hasEng) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat universitaire en génie accrédité (aérospatial, mécanique, électrique ou connexe)",
        missingEn: "Accredited University Bachelor's degree in engineering (aerospace, mechanical, electrical, or related)",
      };
    },
  },

  // 00187 - GÉNIE ÉLECTRIQUE ET MÉCANIQUE (GEM / RCEME)
  {
    jobs: ["00187"],
    allowPR: true,
    customCheck: (selected) => {
      const hasEng = Array.from(selected).some((id) => id.startsWith("bacc_genie_"));
      if (hasEng) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat universitaire en génie accrédité (électrique, mécanique, mécatronique ou connexe)",
        missingEn: "Accredited University Bachelor's degree in engineering (electrical, mechanical, mechatronics, or related)",
      };
    },
  },

  // 00189 - GÉNIE CONSTRUCTION (CE)
  {
    jobs: ["00189"],
    allowPR: true,
    customCheck: (selected) => {
      const hasValidDegree =
        selected.has("bacc_genie_civil") ||
        selected.has("bacc_genie_mecanique") ||
        selected.has("bacc_genie_electrique") ||
        selected.has("bacc_genie_chimie_chimique") ||
        selected.has("bacc_genie_gestion") ||
        selected.has("bacc_genie_ingenierie_gestion") ||
        selected.has("bacc_genie_geologie") ||
        selected.has("bacc_sci_arpentage") ||
        Array.from(selected).some((id) => id.startsWith("bacc_genie_"));
      if (hasValidDegree) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat en génie (civil, mécanique, électrique, chimique, gestion ou arpentage)",
        missingEn: "Bachelor's degree in engineering (civil, mechanical, electrical, chemical, management, or surveying)",
      };
    },
  },

  // 00190 - PHYSIOTHÉRAPIE
  {
    jobs: ["00190"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_sante_physiotherapie") ||
        selected.has("maitrise_sante_physiotherapie");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat ou Maîtrise en physiothérapie",
        missingEn: "Bachelor's or Master's degree in physiotherapy",
      };
    },
  },

  // 00191 - DENTISTE MILITAIRE
  {
    jobs: ["00191"],
    allowPR: true,
    customCheck: (selected) => {
      const passed = selected.has("bacc_sante_medecine_dentaire");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Diplôme universitaire en médecine dentaire (DMD / DDS)",
        missingEn: "University degree in dental medicine (DMD / DDS)",
      };
    },
  },

  // 00194 - PHARMACIE
  {
    jobs: ["00194"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_sante_pharmacie") ||
        selected.has("doctorat_sante_pharmacie");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat ou Doctorat de premier cycle en pharmacie (Pharm.D.)",
        missingEn: "Bachelor's degree or entry-level Doctorate in pharmacy (Pharm.D.)",
      };
    },
  },

  // 00195 - SOINS INFIRMIERS
  {
    jobs: ["00195"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_sante_sciences_soins_infirmiers") ||
        selected.has("bacc_sante_sciences_infirmieres");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat en sciences infirmières (B.Sc.Inf. / B.Sc.N.)",
        missingEn: "Bachelor of Science in Nursing (B.Sc.N. / B.N.)",
      };
    },
  },

  // 00197 - OFFICIER DES SCIENCES BIOLOGIQUES
  {
    jobs: ["00197"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_sante_biochimie") ||
        selected.has("bacc_sante_biologie") ||
        selected.has("bacc_sante_biologie_humaine") ||
        selected.has("bacc_sante_diplome_sciences_vie") ||
        selected.has("bacc_sante_microbiologie") ||
        selected.has("bacc_sante_physiologie_humaine") ||
        selected.has("bacc_sante_genie_biomedical") ||
        selected.has("bacc_sante_kinesiologie") ||
        selected.has("maitrise_sante_biochimie") ||
        selected.has("maitrise_sante_biologie") ||
        selected.has("maitrise_sante_microbiologie") ||
        Array.from(selected).some((id) => id.startsWith("bacc_sci_bio"));
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat en sciences biologiques, biochimie, microbiologie ou sciences de la vie",
        missingEn: "Bachelor's degree in biological sciences, biochemistry, microbiology, or life sciences",
      };
    },
  },

  // 00198 - TRAVAIL SOCIAL
  {
    jobs: ["00198"],
    allowPR: true,
    customCheck: (selected) => {
      const passed = selected.has("maitrise_sante_service_social");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Maîtrise en travail social (M.S.W. / M.Serv.Soc.)",
        missingEn: "Master of Social Work (M.S.W.)",
      };
    },
  },

  // 00203 - OFFICIER DES AFFAIRES PUBLIQUES
  {
    jobs: ["00203"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_arts_communications") ||
        selected.has("bacc_arts_relations_intern") ||
        selected.has("bacc_arts_journalisme") ||
        selected.has("bacc_arts_relations_publiques") ||
        selected.has("bacc_arts_anglais_francais") ||
        selected.has("bacc_arts_science_politique") ||
        selected.has("bacc_arts_commercialisation") ||
        selected.has("bacc_arts_medias_numeriques") ||
        selected.has("maitrise_arts_communications") ||
        selected.has("maitrise_arts_journalisme") ||
        selected.has("maitrise_arts_relations_publiques");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat en communications, journalisme, relations publiques ou sciences politiques",
        missingEn: "Bachelor's degree in communications, journalism, public relations, or political science",
      };
    },
  },

  // 00204 - AVOCAT MILITAIRE (JAG)
  {
    jobs: ["00204"],
    allowPR: true,
    customCheck: (selected) => {
      const passed = selected.has("bacc_arts_droit");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat en droit (LL.B. / B.C.L. / J.D.)",
        missingEn: "Bachelor of Laws / Juris Doctor (LL.B. / B.C.L. / J.D.)",
      };
    },
  },

  // 00207 - OFFICIER DE GUERRE NAVALE (MARS / NWO)
  {
    jobs: ["00207"],
    allowPR: true,
    customCheck: (selected) => {
      const hasUniv =
        selected.has("univ_1er_cycle_global") ||
        Array.from(selected).some((id) => id.startsWith("bacc_"));
      if (hasUniv) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat universitaire (toutes disciplines reconnues)",
        missingEn: "University Bachelor's degree (any recognized discipline)",
      };
    },
  },

  // 00208 - SÉLECTION DU PERSONNEL
  {
    jobs: ["00208"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_arts_psychologie") ||
        selected.has("bacc_arts_sociologie") ||
        selected.has("maitrise_arts_psychologie") ||
        selected.has("maitrise_arts_sociologie");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat ou Maîtrise en psychologie ou sociologie",
        missingEn: "Bachelor's or Master's degree in psychology or sociology",
      };
    },
  },

  // 00211 - DÉVELOPPEMENT DE L’INSTRUCTION
  {
    jobs: ["00211"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_arts_education") ||
        selected.has("maitrise_arts_education") ||
        selected.has("bacc_arts_psychologie") ||
        selected.has("maitrise_arts_psychologie");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat ou Maîtrise en éducation, technologie éducative ou psychologie",
        missingEn: "Bachelor's or Master's degree in education, educational technology, or psychology",
      };
    },
  },

  // 00213 - RENSEIGNEMENT (Intelligence Officer)
  {
    jobs: ["00213"],
    allowPR: false, // Réservé aux citoyens canadiens (CC)
    customCheck: (selected) => {
      const hasUniv =
        selected.has("univ_1er_cycle_global") ||
        Array.from(selected).some((id) => id.startsWith("bacc_"));
      if (hasUniv) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat universitaire (toutes disciplines reconnues)",
        missingEn: "University Bachelor's degree (any recognized discipline)",
      };
    },
  },

  // 00214 - OFFICIER DE LA POLICE MILITAIRE
  {
    jobs: ["00214"],
    allowPR: false, // Réservé aux citoyens canadiens (CC)
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_arts_criminologie") ||
        selected.has("bacc_arts_justice_criminelle") ||
        selected.has("bacc_arts_sci_policieres") ||
        selected.has("bacc_arts_sec_policieres") ||
        selected.has("bacc_arts_sec_publique") ||
        selected.has("bacc_arts_sociologie") ||
        selected.has("bacc_arts_psychologie") ||
        selected.has("bacc_arts_gestion_urgences") ||
        selected.has("bacc_arts_droit") ||
        selected.has("bacc_arts_admin_entreprise") ||
        selected.has("bacc_arts_etudes_militaires");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat universitaire connexe (Criminologie, Justice, Droit, Sécurité publique, etc.)",
        missingEn: "Related university Bachelor's degree (Criminology, Justice, Law, Public Safety, etc.)",
      };
    },
  },

  // 00340 - GÉNIE ÉLECTRONIQUE ET DES COMMUNICATIONS (ECE)
  {
    jobs: ["00340"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_genie_electrique") ||
        selected.has("bacc_genie_electronique") ||
        selected.has("bacc_genie_informatique") ||
        selected.has("bacc_genie_telecommunications") ||
        Array.from(selected).some((id) => id.startsWith("bacc_genie_"));
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat en génie électrique, électronique, informatique ou des télécommunications",
        missingEn: "Bachelor's degree in electrical, electronic, computer, or telecommunications engineering",
      };
    },
  },

  // 00341 - TRANSMISSIONS (Signals Officer)
  {
    jobs: ["00341"],
    allowPR: true,
    customCheck: (selected) => {
      const hasEngOrSci =
        Array.from(selected).some((id) => id.startsWith("bacc_genie_")) ||
        selected.has("bacc_sci_informatique") ||
        selected.has("bacc_sci_mathematiques") ||
        selected.has("bacc_sci_physique") ||
        selected.has("univ_1er_cycle_global") ||
        Array.from(selected).some((id) => id.startsWith("bacc_"));
      if (hasEngOrSci) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat universitaire en génie, informatique, sciences ou discipline connexe",
        missingEn: "University Bachelor's degree in engineering, computer science, science, or related discipline",
      };
    },
  },

  // 00344 - GÉNIE DES SYSTÈMES DE COMBAT NAVAL (NCS Eng)
  {
    jobs: ["00344"],
    allowPR: true,
    customCheck: (selected) => {
      const hasEng =
        selected.has("bacc_genie_electrique") ||
        selected.has("bacc_genie_electronique") ||
        selected.has("bacc_genie_informatique") ||
        selected.has("bacc_genie_logiciel") ||
        Array.from(selected).some((id) => id.startsWith("bacc_genie_"));
      if (hasEng) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat en génie accrédité (électrique, informatique, logiciel, systèmes ou connexe)",
        missingEn: "Accredited Bachelor's degree in engineering (electrical, computer, software, systems, or related)",
      };
    },
  },

  // 00345 - OFFICIER DU GÉNIE DES SYSTÈMES DE MARINE (MS Eng)
  {
    jobs: ["00345"],
    allowPR: true,
    customCheck: (selected) => {
      const hasEng =
        selected.has("bacc_genie_mecanique") ||
        selected.has("bacc_genie_architecture_navale") ||
        selected.has("bacc_genie_maritime") ||
        selected.has("bacc_genie_materiaux") ||
        Array.from(selected).some((id) => id.startsWith("bacc_genie_"));
      if (hasEng) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat en génie accrédité (mécanique, architecture navale, maritime, matériaux ou connexe)",
        missingEn: "Accredited Bachelor's degree in engineering (mechanical, naval architecture, marine, materials, or related)",
      };
    },
  },

  // 00349 - AUMÔNIER (Chaplain)
  {
    jobs: ["00349"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_arts_theologie") ||
        selected.has("maitrise_theologie") ||
        selected.has("maitrise_arts_theologie");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat ou Maîtrise en théologie ou études religieuses (M.Div. / B.Th.)",
        missingEn: "Bachelor's or Master's degree in theology or religious studies (M.Div. / B.Th.)",
      };
    },
  },

  // 00374 - ADJOINT AU MÉDECIN (Physician Assistant)
  {
    jobs: ["00374"],
    allowPR: true,
    customCheck: (selected) => {
      const passed =
        selected.has("bacc_sante_adjoint_medecin") ||
        selected.has("maitrise_adjoint_medecin") ||
        selected.has("doctorat_adjoint_medecin");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Diplôme universitaire en adjoint au médecin (B.Sc. PA / CCPA)",
        missingEn: "University degree in physician assistant (B.Sc. PA / CCPA)",
      };
    },
  },

  // 00390 - MÉDECIN SPÉCIALISTE
  {
    jobs: ["00390"],
    allowPR: true,
    customCheck: (selected) => {
      const passed = selected.has("doctorat_medecine");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Doctorat en médecine (M.D.) avec résidence et certification de spécialiste du Collège royal",
        missingEn: "Doctor of Medicine (M.D.) with residency and Royal College specialist certification",
      };
    },
  },

  // 00393 - MÉDECIN MILITAIRE (Medical Officer)
  {
    jobs: ["00393"],
    allowPR: true,
    customCheck: (selected) => {
      const passed = selected.has("doctorat_medecine");
      if (passed) return { passed: true };
      return {
        passed: false,
        missingFr: "Doctorat en médecine (M.D.) et permis de pratique de la médecine de famille (CCMF / LMCC)",
        missingEn: "Doctor of Medicine (M.D.) and family medicine practice license (CCFP / LMCC)",
      };
    },
  },

  // 00398 - GESTION DES SERVICES DE SANTÉ
  {
    jobs: ["00398"],
    allowPR: true,
    customCheck: (selected) => {
      const hasHealthBacc = [
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
        "bacc_sante_admin_soins_sante",
        "bacc_sante_gestion_services_sante",
      ].some((id) => selected.has(id));

      const hasHealthGrad = [
        "doctorat_adjoint_medecin",
        "maitrise_adjoint_medecin",
        "doctorat_medecine",
        "doctorat_sante_pharmacie",
        "maitrise_sante_admin_sante",
        "maitrise_sante_gestion_soins_sante",
        "maitrise_sante_physiotherapie",
        "maitrise_sante_publique",
      ].some((id) => selected.has(id));

      if (hasHealthBacc || hasHealthGrad) return { passed: true };
      return {
        passed: false,
        missingFr: "Baccalauréat ou Maîtrise dans le domaine des sciences de la santé ou de la gestion de la santé",
        missingEn: "Bachelor's or Master's degree in health sciences or healthcare administration",
      };
    },
  },
];
