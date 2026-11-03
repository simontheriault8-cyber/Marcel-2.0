import { CMR_JOB_DOMAINS } from "../../data/reorientation-criteria.data";
export function getReoMissingProofs(this: any, jobId: string): { fr: string[]; en: string[] } {
    const proofs = { fr: [] as string[], en: [] as string[] };
    const selected = this.selectedCriteriaIds();

    const cvJobs = [
      "00152", "00155", "00335", "00372", "00378", "00406", "00190", "00194",
      "00195", "00198", "00204", "00374", "00153", "00191", "00349", "00390", "00398"
    ];
    if (cvJobs.includes(jobId)) {
      const hasCv = selected.has("exp_cv_recent") || (jobId === "00191" && selected.has("exp_cv_dentiste_5ans"));
      if (!hasCv) {
        proofs.fr.push("Curriculum vitae (CV) récent à jour.");
        proofs.en.push("Recent up-to-date Curriculum Vitae (CV).");
      }
    }

    if (jobId === "00137") {
      if (!selected.has("exp_photo_design")) {
        proofs.fr.push(
          "Expérience dans un ou plusieurs des domaines suivants : photographie, photojournalisme, conception graphique ou multimédia.",
        );
        proofs.en.push(
          "Experience in one or more of the following fields: photography, photojournalism, graphic design, or multimedia.",
        );
      }
    }
    if (jobId === "00149" || jobId === "00161" || jobId === "00214") {
      if (!selected.has("exp_permis_conduire")) {
        proofs.fr.push(
          "Détenir un permis de conduire provincial/territorial en règle.",
        );
        proofs.en.push("Hold a valid provincial/territorial driver’s license.");
      }
    }
    if (jobId === "00152") {
      if (!selected.has("exp_scslm") && !selected.has("exp_acorplm")) {
        proofs.fr.push(
          "Fournir soit la certification de la Société canadienne de science de laboratoire médical (SCSLM) OU la certification de l'alliance canadienne des organismes de réglementation des professionnels de laboratoire médical (ACORPLM), incluant la réussite des examens du «TLM généraliste».",
        );
        proofs.en.push(
          'Provide either the certification from the Canadian Society for Medical Laboratory Science (CSMLS) OR the certification from the Canadian Alliance of Medical Laboratory Professionals Regulators (CAMLPR), including successfully passing the "General MLT" exams.',
        );
      }
      if (
        !selected.has("exp_permis_reglementation") &&
        !selected.has("exp_lettre_conformite")
      ) {
        proofs.fr.push(
          "Fournir un permis ou inscription sans restriction (statut actif) délivré par l’autorité de réglementation provinciale ou territoriale OU une Lettre de conformité (« Good Standing ») émise par l’autorité de réglementation.",
        );
        proofs.en.push(
          "Provide an unrestricted license or registration (active status) issued by the provincial or territorial regulatory authority OR a Letter of Good Standing issued by the regulatory authority.",
        );
      }
      if (!selected.has("exp_lab_6mois")) {
        proofs.fr.push(
          "Au moins six mois d'expérience à temps plein ou à temps partiel dans un laboratoire médical clinique au cours des deux dernières années.",
        );
        proofs.en.push(
          "At least six months of full-time or part-time clinical medical laboratory experience within the last two years.",
        );
      }
    }
    if (jobId === "00153") {
      if (
        !selected.has("exp_permis_rad") &&
        !selected.has("exp_association_actrm")
      ) {
        proofs.fr.push(
          "Fournir soit un permis, une certification ou autorisation sans restriction d’exercer comme technologue en radiation médicale (en règle et en vigueur) provenant d’un organisme de réglementation provincial/territorial reconnu OU la certification d’une association professionnelle ayant conclu une entente réciproque avec l’Association canadienne des technologues en radiation médicale (ACTRM).",
        );
        proofs.en.push(
          "Provide either an unrestricted license, certification, or practice permit to practice as a medical radiation technologist (in good standing and active) from a recognized provincial/territorial regulatory body OR certification from a professional association with a reciprocal agreement with CAMRT.",
        );
      }
      if (!selected.has("exp_lettre_reglementation_en_regle")) {
        proofs.fr.push(
          "Fournir une lettre de l'organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle ».",
        );
        proofs.en.push(
          'Provide a letter from the professional regulatory body confirming that the candidate is "in good standing".',
        );
      }
    }
    if (jobId === "00155") {
      if (!selected.has("exp_tech_eb_6mois")) {
        proofs.fr.push(
          "A travaillé en tant que technologue en électronique biomédicale pendant une période totale d’au moins six (6) mois au cours des deux (2) dernières années.",
        );
        proofs.en.push(
          "Had worked as a biomedical electronics technologist for a total period of at least six (6) months within the last two (2) years.",
        );
      }
    }
    if (jobId === "00189") {
      const hasBase1 =
        selected.has("bacc_sci_environnementales") ||
        selected.has("bacc_sci_geologie") ||
        selected.has("bacc_sci_technologie_surete_protection_incendie") ||
        selected.has("bacc_sci_geomatique") ||
        selected.has("bacc_sci_arpentage") ||
        selected.has("bacc_genie_chimie_chimique") ||
        selected.has("bacc_genie_gestion") ||
        selected.has("bacc_genie_ingenierie_gestion") ||
        selected.has("bacc_genie_geologie");
      const hasBase2 =
        selected.has("bacc_sci_bsc_genie_protection_incendie") ||
        selected.has("bacc_genie_civil") ||
        selected.has("bacc_genie_mecanique") ||
        selected.has("bacc_genie_electricite_electrique") ||
        selected.has("bacc_genie_environnemental");
      if (hasBase1 && !hasBase2) {
        if (!selected.has("exp_00189")) {
          proofs.fr.push(
            "Au moins trois mois d'expérience pertinente dans un ou plusieurs des domaines suivants : industrie de la construction, gestion des installations, services d'incendies, services de l'environnement, géomatique, gestion de projet, service militaire.",
          );
          proofs.en.push(
            "At least three months of relevant experience in one or more of the following fields: construction industry, facility management, fire services, environmental services, geomatics, project management, military service.",
          );
        }
      }
    }
    if (jobId === "00190") {
      if (!selected.has("exp_permis_physiotherapie")) {
        proofs.fr.push(
          "Permis/licence d’exercice en règle (à titre actif) en tant que physiothérapeute émis par un organisme de réglementation provincial ou territorial.",
        );
        proofs.en.push(
          "Valid (active) license/permit to practice as a physiotherapist issued by a provincial or territorial regulatory body.",
        );
      }
      if (!selected.has("exp_lettre_physiotherapie_regle")) {
        proofs.fr.push(
          "Lettre de l’organisme de réglementation du candidat attestant que ce dernier est « En règle ».",
        );
        proofs.en.push(
          'Letter from the candidate\'s regulatory body confirming they are "In good standing".',
        );
      }
    }
    if (jobId === "00191") {
      if (!selected.has("exp_cert_bned")) {
        proofs.fr.push(
          "Certificat du Bureau national d’examen dentaire du Canada (BNED).",
        );
        proofs.en.push(
          "Certificate from the National Dental Examining Board of Canada (NDEB).",
        );
      }
      if (!selected.has("exp_permis_medecine_dentaire")) {
        proofs.fr.push(
          "Autorisation en règle et sans restriction d’exercer la Médecine dentaire de la part d’une autorité réglementaire d’une province/d’un territoire du Canada.",
        );
        proofs.en.push(
          "Valid and unrestricted license/permit to practice Dentistry from a provincial/territorial regulatory authority in Canada.",
        );
      }
      if (!selected.has("exp_lettre_dentiste_regle")) {
        proofs.fr.push(
          "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est en règle.",
        );
        proofs.en.push(
          "Letter from the professional regulatory authority confirming that the candidate is in good standing.",
        );
      }
      if (!selected.has("exp_cv_dentiste_5ans")) {
        proofs.fr.push(
          "Curriculum vitae remontant jusqu’à de cinq ans quant à l’expérience en tant que dentiste.",
        );
        proofs.en.push(
          "Curriculum vitae going back up to five years regarding experience as a dentist.",
        );
      }
    }
    if (jobId === "00194") {
      if (!selected.has("exp_permis_pharmacie")) {
        proofs.fr.push(
          "Permis d’exercice de la pharmacie sans restriction en règle.",
        );
        proofs.en.push("Valid unrestricted license to practice pharmacy.");
      }
      if (!selected.has("exp_lettre_pharmacie_regle")) {
        proofs.fr.push(
          "Lettre de l’autorité de réglementation professionnelle attestant que le candidat est « en règle ».",
        );
        proofs.en.push(
          'Letter from the professional regulatory authority confirming that the candidate is in "good standing".',
        );
      }
    }
    if (jobId === "00195") {
      if (!selected.has("exp_permis_soins_infirmiers")) {
        proofs.fr.push(
          "Permis d’exercice en règle (état actif) en soins infirmiers en tant qu’infirmier autorisé ou infirmier en pratique octroyé par un organisme de réglementation provincial ou territorial du Canada.",
        );
        proofs.en.push(
          "Valid (active state) nursing practice license as a registered nurse or practical nurse issued by a provincial or territorial regulatory body in Canada.",
        );
      }
    }
    if (jobId === "00198") {
      if (!selected.has("exp_permis_travail_social")) {
        proofs.fr.push(
          "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social, délivré par une autorité / association réglementaire provinciale ou territoriale.",
        );
        proofs.en.push(
          "Valid and unrestricted license/permit (active state) to practice as a social worker issued by a provincial or territorial regulatory authority/association.",
        );
      }
      if (!selected.has("exp_lettre_travail_social_regle")) {
        proofs.fr.push(
          "Lettre de l’autorité de réglementation professionnelle attestant que le candidat est « en règle ».",
        );
        proofs.en.push(
          'Letter from the professional regulatory authority confirming that the candidate is in "good standing".',
        );
      }
    }
    if (jobId === "00203") {
      if (!selected.has("exp_00203")) {
        proofs.fr.push(
          "Fournir une preuve d’au moins une (1) année d’expérience cumulative dans deux ou plusieurs des domaines suivants : communications, journalisme, commercialisation, affaires publiques, relations publiques, recherche sur l'opinion publique, médias numériques ou sociaux.",
        );
        proofs.en.push(
          "Provide proof of at least one (1) year of cumulative experience in two or more of the following fields: communications, journalism, marketing, public affairs, public relations, public opinion research, digital or social media.",
        );
      }
    }
    if (jobId === "00204") {
      if (!selected.has("exp_permis_droit")) {
        proofs.fr.push(
          "Autorisé à pratiquer le droit dans une province canadienne ou un territoire canadien.",
        );
        proofs.en.push(
          "Authorized to practice law in a Canadian province or territory.",
        );
      }
      if (!selected.has("exp_lettre_barreau_regle")) {
        proofs.fr.push(
          "Être « membre en règle », en exercice ou non, du Barreau d'une province ou d’un territoire.",
        );
        proofs.en.push(
          'Be a "member in good standing", practicing or non-practicing, of the Bar of a province or territory.',
        );
      }
    }
    if (jobId === "00208") {
      if (
        (selected.has("bacc_arts_psychologie") ||
          selected.has("bacc_arts_sociologie")) &&
        !selected.has("exp_00208_bacc")
      ) {
        proofs.fr.push(
          "Au moins une ou plusieurs années de travail à temps plein dans un ou plusieurs des domaines suivants : sélection, recrutement (RH), recherche en sciences sociales, orientation scolaire/professionnelle.",
        );
        proofs.en.push(
          "At least one or more years of full-time work in one or more of the following fields: selection, recruitment (HR), social science research, academic/career counseling.",
        );
      }
    }
    if (jobId === "00211") {
      if (
        selected.has("maitrise_arts_education") &&
        !selected.has("exp_00211_maitrise")
      ) {
        proofs.fr.push(
          "Fournir une preuve d’au moins trois (3) ans cumulatifs d’expérience à temps plein dans l’un ou plusieurs des domaines suivants : élaboration d’un programme d’études, expert-conseil en éducation, conception de l’instruction, formation du personnel, enseignement/instruction, expert-conseil en instruction, développement de l’instruction.",
        );
        proofs.en.push(
          "Provide proof of at least three (3) cumulative years of full-time experience in one or more of the following fields: curriculum development, education consultant, instructional design, staff training, teaching/instruction, instructional consultant, instructional development.",
        );
      }
    }
    if (jobId === "00164") {
      if (
        selected.has("cs_dep_cuisine") &&
        !selected.has("exp_sceau_rouge_cuisine")
      ) {
        proofs.fr.push(
          "Fournir une preuve de détention d’un Certificat des normes interprovinciales Sceau rouge.",
        );
        proofs.en.push(
          "Provide proof of holding a Red Seal interprovincial standards certification.",
        );
      }
    }
    if (jobId === "00166") {
      if (selected.has("cs_etude_musique")) {
        if (!selected.has("exp_mus_pro")) {
          proofs.fr.push(
            "Fournir une preuve d’expérience comme musicien professionnel dans une variété d’ensembles et dans divers styles de musique, p. ex. à titre de musicien travaillant à son propre compte, ou à temps plein avec une orchestre, un ensemble ou un groupe de musique local.",
          );
          proofs.en.push(
            "Provide proof of experience as a professional musician in a variety of ensembles and in various styles of music, e.g. as a self-employed musician, or full-time with a local orchestra, ensemble, or music group.",
          );
        }
      } else if (this.hasCriterion(selected, "des_12e_annee")) {
        if (
          !selected.has("exp_mus_ensembles") &&
          !selected.has("exp_mus_etudiant")
        ) {
          proofs.fr.push(
            "Fournir soit une preuve d’expérience comme musicien dans une variété d’ensembles et dans divers styles de musique, p. ex. à titre de musicien travaillant à son propre compte, ou à temps plein avec une orchestre, un ensemble ou un groupe de musique local, OU une preuve de statut d’étudiant en voie d’obtenir un diplôme ou un Baccalauréat en interprétation musicale dans un collège, un conservatoire de musique ou une université reconnus.",
          );
          proofs.en.push(
            "Provide either proof of experience as a musician in a variety of ensembles and in various styles of music, e.g. as a self-employed musician, or full-time with a local orchestra, ensemble, or music group, OR proof of student status on track to obtain a diploma or Bachelor’s degree in music performance in a recognized college, music conservatory, or university.",
          );
        }
      }
    }

    if (jobId === "00335") {
      if (selected.has("cs_cert_assist_dentaire")) {
        if (!selected.has("exp_permis_assistant_dentaire")) {
          proofs.fr.push(
            "Fournir une preuve de permis en règle pour agir en tant qu’assistant dentaire délivré par une autorité de réglementation canadienne provinciale ou territoriale.",
          );
          proofs.en.push(
            "Provide proof of a valid registration/license as a dental assistant issued by a Canadian provincial or territorial regulatory authority.",
          );
        }
        if (!selected.has("exp_lettre_dentaire_en_regle")) {
          proofs.fr.push(
            "Fournir une lettre de l’autorité de réglementation professionnelle attestant que le candidat est « en règle ».",
          );
          proofs.en.push(
            'Provide a letter from the professional regulatory authority confirming that the candidate is "in good standing".',
          );
        }
      }
    }

    if (jobId === "00372") {
      if (selected.has("cs_dep_sante_infirmiers")) {
        if (!selected.has("exp_permis_infirmier_auxiliaire")) {
          proofs.fr.push(
            "Fournir une preuve de détention d’une autorisation en règle de travailler comme infirmier auxiliaire autorisé/immatriculé émise par un organisme de réglementation provincial ou territorial.",
          );
          proofs.en.push(
            "Provide proof of holding a valid registration/license as a licensed/registered practical nurse issued by a provincial or territorial regulatory authority.",
          );
        }
        if (!selected.has("exp_lettre_reglementation_en_regle")) {
          proofs.fr.push(
            "Fournir une lettre de l’organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle ».",
          );
          proofs.en.push(
            'Provide a letter from the professional regulatory authority confirming that the candidate is "in good standing".',
          );
        }
        if (!selected.has("exp_cert_peroperatoire")) {
          proofs.fr.push(
            "Fournir une preuve de certification comme infirmier auxiliaire autorisé/immatriculé en soins peropératoires.",
          );
          proofs.en.push(
            "Provide proof of certification as a licensed/registered practical nurse in perioperative care.",
          );
        }
      }
    }

    if (jobId === "00406") {
      if (selected.has("cs_cert_soins_param")) {
        if (!selected.has("exp_permis_paramedical")) {
          proofs.fr.push(
            "Fournir une preuve d'inscription actuelle ou en cours au permis ou privilèges hospitaliers de base ou certification en vigueur pour exercer à titre de paramédical(e), délivrés par un organisme de réglementation provincial ou territorial canadien.",
          );
          proofs.en.push(
            "Provide proof of current registration/licensure or active base hospital standard privileges or certification to practice as a paramedic, issued by a Canadian provincial or territorial regulatory authority.",
          );
        }
      }
    }

    if (jobId === "00349") {
      if (!selected.has("exp_00349_leader_foi")) {
        proofs.fr.push(
          "Accrédité et reconnu comme un leader au sein d’une tradition de foi  par l’autorité de gouvernance de cette même tradition de foi qui exerce une supervision au Canada, et tel que recommandé par le membre désigné du CIAMC.",
        );
        proofs.en.push(
          "Accredited and recognized as a faith group leader by the governing authority of that faith group which exercises supervision in Canada, and as recommended by the designated member of the ICCDF.",
        );
      }
      if (!selected.has("exp_00349_endosse_ciamc")) {
        proofs.fr.push("Avoir été endossé comme aumônier par le CIAMC.");
        proofs.en.push("Be endorsed as a chaplain by the ICCDF.");
      }
      if (!selected.has("exp_00349_entrevue_aum")) {
        proofs.fr.push(
          "Avoir réussi une entrevue et jugé apte par un comité présidé par le D Svc Aum.  La sélection finale est confirmée par l’Aumônier général.",
        );
        proofs.en.push(
          "Successfully pass an interview and be deemed suitable by a committee chaired by the D Chap Svc. Final selection is confirmed by the Chaplain General.",
        );
      }
    }

    if (jobId === "00374") {
      if (!selected.has("exp_00374_cert_permis")) {
        proofs.fr.push(
          "Certificat en règle du Conseil de certification des adjoints au médecin du Canada (CCAMC) et permis/licence en règle (en vigueur) d’exercer comme adjoint au médecin délivré(e) par une autorité réglementaire d’une province ou d’un territoire du Canada.",
        );
        proofs.en.push(
          "Valid certification from the Physician Assistant Certification Council of Canada (PACCC) and a valid active license to practice as a physician assistant issued by a provincial or territorial regulatory authority of Canada.",
        );
      }
      if (!selected.has("exp_00374_lettre_regle")) {
        proofs.fr.push(
          "Lettre de l’autorité professionnelle réglementaire ou de son superviseur en clinique, selon le cas, attestant que le candidat est en règle.",
        );
        proofs.en.push(
          "Letter from the professional regulatory authority or clinical supervisor, as applicable, confirming that the candidate is in good standing.",
        );
      }
    }

    if (jobId === "00390") {
      if (!selected.has("exp_00390_residence")) {
        proofs.fr.push(
          "Achèvement d’une formation spécialisée dans un programme de résidence agréé par le Collège royal des médecins et chirurgiens du Canada dans l’une des spécialités suivantes:\n- Médecine interne avec une résidence de deux ans dans l’une des disciplines suivantes;\n    a) Médecine interne générale\n    b) Maladies infectieuses\n    c) Soins intensifs\n- Anesthésiologie\n- Chirurgie générale\n- Chirurgie orthopédique\n- Psychiatrie\n- Radiologie\n- Médecine physique et de réadaptation (Physiatrie)\n- Médecine d’urgence.",
        );
        proofs.en.push(
          "Completion of specialized training in a residency program accredited by the Royal College of Physicians and Surgeons of Canada in one of the following specialties:\n- Internal medicine with a two-year residency in one of the following disciplines;\n    a) General internal medicine\n    b) Infectious diseases\n    c) Critical care\n- Anesthesiology\n- General surgery\n- Orthopedic surgery\n- Psychiatry\n- Radiology\n- Physical medicine and rehabilitation (Physiatry)\n- Emergency medicine.",
        );
      }
      if (!selected.has("exp_00390_certification")) {
        proofs.fr.push(
          "Certification et titre de fellow du Collège royal des médecins et chirurgiens du Canada, dans l’une des spécialités mentionnées ci-dessus.",
        );
        proofs.en.push(
          "Certification and fellowship designation from the Royal College of Physicians and Surgeons of Canada in one of the specialties mentioned above.",
        );
      }
      if (!selected.has("exp_00390_permis")) {
        proofs.fr.push(
          "Permis d’exercice valide et sans restriction pour pratiquer la médecine à titre de spécialiste (selon la spécialité indiquée ci-dessus) dans toute province ou tout territoire du Canada.",
        );
        proofs.en.push(
          "Valid and unrestricted license to practice medicine as a specialist (according to the specialty indicated above) in any province or territory of Canada.",
        );
      }
      if (!selected.has("exp_00390_attestation")) {
        proofs.fr.push(
          "Attestation de bonne conduite professionnelle délivrée par l’organisme de réglementation provincial ou territorial du candidat.",
        );
        proofs.en.push(
          "Certificate of professional good standing issued by the candidate’s provincial or territorial regulatory body.",
        );
      }
      if (!selected.has("exp_00390_civil")) {
        proofs.fr.push(
          "Pour toutes les spécialités : à l’exception de la psychiatrie et de la médecine physique et réadaptation (physiatrie): Être employé à temps plein dans un poste clinique au sein d’un établissement de soins de santé civil.",
        );
        proofs.en.push(
          "For all specialties, except psychiatry and physical medicine and rehabilitation (physiatry): Be employed full-time in a clinical position within a civilian healthcare facility.",
        );
      }
    }

    if (jobId === "00393") {
      if (!selected.has("exp_00393_autorisation")) {
        proofs.fr.push(
          "Détenir une Autorisation en règle et sans restriction d’exercer la Médecine en tant que médecin de famille dans une province ou un territoire du Canada.",
        );
        proofs.en.push(
          "Hold a valid and unrestricted license to practice Family Medicine in a province or territory of Canada.",
        );
      }
      if (!selected.has("exp_00393_lettre_regle")) {
        proofs.fr.push(
          "Lettre des autorités de réglementation de la province/territoire du candidat attestant que ce dernier est « en règle ».",
        );
        proofs.en.push(
          'Letter from the regulatory authorities of the candidate’s province/territory confirming that the candidate is in "good standing".',
        );
      }
      if (!selected.has("exp_00393_certification")) {
        proofs.fr.push(
          "Certification en médecine familiale du Collège des médecins de famille du Canada.",
        );
        proofs.en.push(
          "Certification in Family Medicine from the College of Family Physicians of Canada.",
        );
      }
    }

    if (jobId === "00398") {
      const option1Selected =
        selected.has("bacc_sante_gestion_services_sante") ||
        selected.has("bacc_sante_admin_soins_sante");
      const option2Selected =
        selected.has("bacc_arts_admin_affaires") ||
        selected.has("bacc_arts_admin_publique") ||
        selected.has("bacc_arts_ressources_humaines");
      const option3Selected =
        selected.has("maitrise_sante_gestion_services_sante") ||
        selected.has("maitrise_sante_admin_soins_sante") ||
        selected.has("maitrise_admin_affaires") ||
        selected.has("maitrise_admin_publique") ||
        selected.has("maitrise_gestion_ressources_humaines");
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
        !option1Selected &&
        !option2Selected &&
        !option3Selected
      ) {
        if (!selected.has("exp_00398_gestion")) {
          proofs.fr.push(
            "Un minimum de deux années d’expérience cumulative en gestion à temps plein au cours des cinq dernières années dans un milieu de soins de santé.",
          );
          proofs.en.push(
            "A minimum of two years of cumulative full-time management experience within the last five years in a healthcare environment.",
          );
        }
      }
    }

    return proofs;
  }

export function generateReoNoteText(this: any): string {
    const jobIds = this.eligibleJobs();
    if (jobIds.length === 0)
      return "Aucun critère sélectionné. Impossible de générer la note.";

    let text = "Évaluation de réorientation\n====================\n\n";
    if (this.isPforApplicant()) {
      text += "Programme PFOR :\n";
      if (this.pforType() === "cmr") {
        text += `- Admis au Collège militaire royal (CMR) - Domaine(s) : ${this.getCmrAdmittedDomainsNoteFr() || "Non spécifié"}\n`;
      } else {
        text += "- Universités civiles\n";
      }
    } else {
      text += "Critères rencontrés :\n";
      const selected = this.selectedCriteriaIds();
      const criteriaArray = Array.from(selected) as string[];
      const allMathOptions = (Object.values(this.MATH_COURSES) as any[]).reduce(
        (acc: any[], courses: any) => acc.concat(courses),
        [] as any[],
      );

      for (const id of criteriaArray) {
        if (id.startsWith("base_math_")) continue; // Skip virtual base criteria

        const crit = this.manualCriteria.find((c) => c.id === id);
        if (crit) {
          text += "- " + crit.label + "\n";
        } else {
          const mathOpt = allMathOptions.find((m) => m.id === id);
          if (mathOpt) {
            text += "- " + mathOpt.label + "\n";
          }
        }
      }
    }

    text += "\nMétiers admissibles :\n";
    for (const jId of jobIds) {
      const job = this.jobService.getAllJobs().find((j) => j.id === jId);
      if (job) {
        text += "- " + job.id + " - " + job.title + "\n";
      } else {
        text += "- " + jId + "\n";
      }
    }

    if (!this.isPforApplicant()) {
      const isEn = this.i18n ? this.i18n.isEn() : false;
      let hasMissingProofs = false;
      let missingProofsText = "\n" + (this.i18n ? this.i18n.t("regNotes.missingProofsTitle") : (isEn ? "Additional required proofs:" : "Preuves supplémentaires requises :")) + "\n";
      for (const jId of jobIds) {
        const missing = this.getMissingProofs(jId);
        const proofsList = isEn ? missing.en : missing.fr;
        if (proofsList.length > 0) {
          hasMissingProofs = true;
          const job = this.jobService.getAllJobs().find((j) => j.id === jId);
          const jobTitle = isEn ? (job?.titleEn || job?.title) : job?.title;
          const title = job ? `${job.id} - ${jobTitle}` : jId;
          const forTradeLabel = this.i18n
            ? this.i18n.t("regNotes.missingProofsForTrade", { trade: title })
            : (isEn ? `For trade ${title}:` : `Pour le métier ${title} :`);
          missingProofsText += `\n${forTradeLabel}\n`;
          for (const proof of proofsList) {
            missingProofsText += `- ${proof}\n`;
          }
        }
      }

      if (hasMissingProofs) {
        text += missingProofsText;
      }
    }

    return text;
  }


export function generateReoNoteRegistry(this: any): string {
    const isEn = this.i18n ? this.i18n.isEn() : false;

    if (this.age() !== null && this.age()! >= 57) {
      return this.i18n ? this.i18n.t("regNotes.inadmissibiliteAge57") : (isEn
        ? "Step 1 (In progress) - Maximum eligibility age exceeded (57 years and older): Ineligible for enrolment in the CAF, email sent, file closure."
        : "Étape 1 (En cours) - Âge maximal d'admissibilité dépassé (57 ans et plus) : Inadmissible pour un enrôlement dans les FAC, courriel envoyé, fermeture du dossier.");
    }

    if (this.citizenship() === "PR < 3 years") {
      return this.i18n ? this.i18n.t("regNotes.inadmissibilitePr3Ans") : (isEn
        ? "Step 1 (In progress) - Permanent resident under 3 years (Ineligible): Ineligibility email sent (IRCC calculator result 3+ years or citizenship required before reapplying), file closure."
        : "Étape 1 (En cours) - Résident permanent de moins de 3 ans (Inadmissible) : Courriel d'inadmissibilité envoyé (résultat du calculateur IRCC +3 ans ou citoyenneté requis avant de repostuler), fermeture du dossier.");
    }

    const dossierIds = [
      this.selectedDossierJobId1(),
      this.selectedDossierJobId2(),
      this.selectedDossierJobId3(),
    ].filter((id: string) => !!id);

    let metierRaison = "";

    if (dossierIds.length === 0) {
      metierRaison = isEn ? "no trade selected on file" : "aucun métier sélectionné au dossier";
    } else {
      const parts: string[] = [];
      for (const id of dossierIds) {
        if (id === "00003") {
          parts.push(`00003 : ${isEn ? "No trade" : "Sans métier"}`);
          continue;
        }
        const s = this.evaluateJobAdmissibility(id);
        let reasonTxt = "";
        if (s) {
          const reasonsList: string[] = [];
          if (s.isJobClosed) {
            if (s.isClosedAdmissionOnly) {
              reasonsList.push(isEn ? "Closed admission" : "Fermé admission");
            } else {
              reasonsList.push(this.isPforApplicant() ? (isEn ? "Closed ROTP" : "Fermé PFOR") : (isEn ? "Closed" : "Fermé"));
            }
          }
          if (!s.isAgeAdmissible) {
            reasonsList.push(isEn ? "Age" : "Âge");
          }
          if (!s.isCitizenshipAdmissible) {
            reasonsList.push(isEn ? "Citizenship required" : "Citoyenneté requise");
          }
          if (!s.isEducationAdmissible) {
            if (this.isPforApplicant() && this.pforType() === "cmr") {
              const cmrInfo = CMR_JOB_DOMAINS[id];
              if (!cmrInfo) {
                reasonsList.push(isEn ? "Not offered at RMC (ROTP)" : "Non offert au CMR (PFOR)");
              } else {
                reasonsList.push(isEn
                  ? `Not admitted to RMC in ${this.getCmrJobRequiredDomainsEn(id)}`
                  : `Non admis au CMR en ${this.getCmrJobRequiredDomainsFr(id)}`
                );
              }
            } else if (this.isPforApplicant() && this.pforType() === "civil") {
              reasonsList.push(isEn ? "Not offered in Civil ROTP" : "Non offert en PFOR Civil");
            } else {
              reasonsList.push(isEn ? "Education/Experience" : "Scolarité/Expérience");
            }
          }
          if (!s.isMedicalAdmissible) {
            reasonsList.push(isEn ? "Medical limitation" : "Limitation médicale");
          }
          if (s.isExtraTestRequired && !s.isExtraTestAdmissible && (s.extraTestReasonFr || s.extraTestReasonEn)) {
            reasonsList.push(`Test ${s.extraTestName}`);
          }

          if (reasonsList.length > 0) {
            reasonTxt = reasonsList.join(", ");
          } else {
            reasonTxt = isEn ? "Eligible" : "Admissible";
          }
        }
        parts.push(`(${id} : ${reasonTxt})`);
      }
      metierRaison = parts.join(", ");
    }

    const isPRAdmissible = this.citizenship() === "PR > 3 years";
    const prDemandText = isPRAdmissible
      ? (isEn ? " and transcripts from country of origin requested" : " et relevés de notes du pays d'origine demandés")
      : "";

    let reoPrefix = isEn ? "Reorientation required as ineligible for" : "Réorientation nécessaire car inadmissible pour";
    if (this.isPforApplicant() && this.pforType() === "cmr") {
      const cmrDomains = isEn ? this.getCmrAdmittedDomainsNoteEn() : this.getCmrAdmittedDomainsNoteFr();
      if (cmrDomains) {
        reoPrefix = isEn ? `Admitted RMC (${cmrDomains}) - Reorientation required as` : `Admis CMR (${cmrDomains}) - Réorientation nécessaire car`;
      } else {
        reoPrefix = isEn ? "ROTP RMC - Reorientation required as" : "PFOR CMR - Réorientation nécessaire car";
      }
    } else if (this.isPforApplicant() && this.pforType() === "civil") {
      reoPrefix = isEn ? "Civil ROTP - Reorientation required as" : "PFOR Civil - Réorientation nécessaire car";
    }

    const reoNote = isEn
      ? `Step 1 (In progress) - ${reoPrefix}: ${metierRaison}, reorientation email sent${prDemandText}, awaiting candidate's response. Applicant warned of file closure if no action is taken within 30 days.`
      : `Étape 1 (En cours) - ${reoPrefix} : ${metierRaison}, courriel de réo envoyé${prDemandText}, en attente de la réponse du postulant. Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.`;

    if ((this.sharedState.includeLinkedEmail() || (this.sharedState.hasReassignedTasks() && this.showResultsPanel())) && this.sharedState.taskNote()) {
      const taskNoteRaw = this.sharedState.taskNote();

      // Extrait le message médical s'il est présent
      let medicalSuffix = "";
      const medicalMarkerFr = "MÉDICAL - TRIAGE PAR MED CHU REQUIS";
      const medicalMarkerEn = "MEDICAL - TRIAGE BY MED CHU REQUIRED";
      if (taskNoteRaw.toUpperCase().includes(medicalMarkerFr) || taskNoteRaw.toUpperCase().includes(medicalMarkerEn)) {
        medicalSuffix = "\n\n" + (this.i18n ? this.i18n.t("regNotes.medTriageRequired") : (isEn ? "MEDICAL - TRIAGE BY MED CHU REQUIRED" : "MÉDICAL - TRIAGE PAR MED CHU REQUIS"));
      }

      let taskClean = taskNoteRaw.trim();
      const medIdxFr = taskClean.toUpperCase().indexOf(medicalMarkerFr);
      if (medIdxFr !== -1) {
        taskClean = taskClean.substring(0, medIdxFr).trim();
      }
      const medIdxEn = taskClean.toUpperCase().indexOf(medicalMarkerEn);
      if (medIdxEn !== -1) {
        taskClean = taskClean.substring(0, medIdxEn).trim();
      }

      // Pour la note de réorientation
      const prefixRegex = /^(Étape 1 \((En cours|en cours)\)|Step 1 \((In progress|in progress)\))\s*-\s*/i;
      const suffixStringFr = "Postulant averti de la fermeture de son dossier si aucune action n'est prise d'ici 30 jours.";
      const suffixStringEn = "Applicant warned of file closure if no action is taken within 30 days.";

      let reoClean = reoNote.replace(prefixRegex, "").trim();
      for (const sfx of [suffixStringFr, suffixStringEn]) {
        const sfxIdx = reoClean.toLowerCase().indexOf(sfx.toLowerCase());
        if (sfxIdx !== -1) {
          reoClean = reoClean.substring(0, sfxIdx).trim();
        }
      }
      if (reoClean.endsWith(".")) {
        reoClean = reoClean.slice(0, -1).trim();
      }
      const reoPart = reoClean ? `${reoClean}.` : "";

      if (taskClean && reoPart) {
        return `${taskClean}\n\n${reoPart}${medicalSuffix}`;
      }
      return `${taskClean || reoNote}${medicalSuffix}`;
    }

    return reoNote;
  }

