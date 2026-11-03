import { JobEntry } from "./jobs.models";

export const JOBS_OFFICER_2: JobEntry[] = [
  {
    id: "00191",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "DENTISTE MILITAIRE",
    abbreviation: "DENT M",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Certificat du Bureau national d'examen dentaire du Canada (BNED) et autorisation d'exercer OU acceptation à un programme universitaire en médecine dentaire.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO1", "MÉ 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Avoir obtenu le certificat du Bureau national d'examen dentaire du Canada (BNED)",
                  "ET",
                  "Détenir une Autorisation en règle2,3 et sans restriction d’exercer la Médecine dentaire de la part d’une autorité réglementaire d’une province/d’un territoire du Canada 4",
                  "ET",
                  "Lettre de l’autorité réglementaire professionnelle4 attestant que le candidat est en règle",
                ],
                experience: [
                  "Obtention d’un diplôme d’un programme agréé5 au cours des 18 derniers mois: o Aucune expérience requise",
                  "OU",
                  "Obtention d’un diplôme d’un programme agréé5 il y a plus de 18 mois : o Pratique active de la Médecine dentaire au Canada durant un total d’au 1800 heures au cours des 36 derniers mois",
                  "ET",
                  "Curriculum vitae6 remontant jusqu’à cinq ans quant à l’expérience en tant que dentiste",
                ],
              },
            ],
          },
          {
            candidates: ["PMED1", "PFOS1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Acceptation sans condition à un programme agréé d’une université canadienne menant au Diplôme en médecine dentaire (D.M.D.) ou au Doctorat en médecine dentaire (D.M.D.)5",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Par ailleurs, les candidats ne doivent pas : a) Avoir perdu leur autorisation d’exercer dans quelque juridiction que ce soit; b) Faire l’objet d’une enquête par quelque autorité réglementaire que ce soit. Le dossier d’un candidat ayant fait l’objet d’une enquête ou d’une sanction mineure sera examiné par le Directeur - Services dentaires.",
          "3. Par « Autorisation en règle et sans restriction d’exercer », on entend l’autorisation intégrale et sans restriction d’exercer la Médecine dentaire dans une province ou un territoire du Canada.",
          "4. On peut consulter la liste des autorités réglementaires des provinces/territoires au site suivant : http://cda-adc.ca/fr/about/reg_authorities/.",
          "5. Un programme agréé de dentisterie générale (DDS/DMD) comprend tous les programmes de 4 ou 5 ans offerts dans une université canadienne, ainsi que les programmes de qualification de 2 à 3 ans destinés aux personnes déjà titulaires d’un diplôme en dentisterie obtenu dans un établissement situé à l’extérieur du Canada. Les programmes agréés peuvent être consultés à l’adresse suivante : https://www.cdac-cadc.ca/find-a-program/",
          "6. Le candidat doit remettre un curriculum vitae à jour et les coordonnées de tous les employeurs actuels ou précédents au cours des cinq dernières années. Le Directeur – Services dentaires vérifiera toutes les références mentionnées.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO1", "MÉ 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Avoir obtenu le certificat du Bureau national d'examen dentaire du Canada (BNED)",
                  "ET",
                  "Détenir une Autorisation en règle2,3 et sans restriction d’exercer la Médecine dentaire de la part d’une autorité réglementaire d’une province/d’un territoire du Canada 4",
                  "ET",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est en règle",
                ],
                experience: [
                  "Obtention d’un diplôme d’un programme agréé7 au cours des 18 derniers mois: o Aucune expérience requise",
                  "OU",
                  "Obtention d’un diplôme d’un programme agréé7 il y a plus de 18 mois : o Pratique active de la Médecine dentaire au Canada durant un total d’au 1800 heures au cours des 36 derniers mois",
                  "ET",
                  "Curriculum vitae6 remontant jusqu’à cinq ans quant à l’expérience en tant que dentiste",
                ],
              },
            ],
          },
          {
            candidates: ["MÉ 1", "MSÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Avoir obtenu le certificat du Bureau national d'examen dentaire du Canada",
                  "ET",
                  "Détenir une Autorisation2, 3 en règle et sans restriction d’exercer la Médecine dentaire de la part d’une autorité réglementaire d’une province/d’un territoire du Canada 4",
                  "ET",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est en règle4",
                ],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC)5 du GPM 00191 DENT M dans la F rég F",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Par ailleurs, les candidats ne doivent pas : a) Avoir perdu leur autorisation d’exercer dans quelque juridiction que ce soit; b) Faire l’objet d’une enquête par quelque autorité réglementaire que ce soit. Le dossier d’un candidat ayant fait l’objet d’une enquête ou d’une sanction mineure sera examiné par le Directeur - Services dentaires.",
          "3. Par « Autorisation en règle et sans restriction d’exercer », on entend l’autorisation intégrale et sans restriction d’exercer la Médecine dentaire dans une province ou un territoire du Canada.",
          "4. On peut consulter la liste des autorités réglementaires des provinces/territoires au site suivant : http://cda-adc.ca/fr/about/reg_authorities/.",
          "5. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "6. Le candidat doit remettre un curriculum vitae à jour et les coordonnées de tous les employeurs actuels ou précédents au cours des cinq dernières années. Le Directeur – Services dentaires vérifiera toutes les références mentionnées.",
          "7. Un programme agréé de dentisterie générale (DDS/DMD) comprend tous les programmes de 4 ou 5 ans offerts dans une université canadienne, ainsi que les programmes de qualification de 2 à 3 ans destinés aux personnes déjà titulaires d’un diplôme en dentisterie obtenu dans un établissement situé à l’extérieur du Canada. Les programmes agréés peuvent être consultés à l’adresse suivante : https://www.cda-adc.ca/fr/becoming/dat/information/schools/.",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO",
        duration: "6 ans",
      },
      {
        program: "PME-Dent/PFOS",
        duration: "10 ans",
      },
    ],
  },
  {
    id: "00194",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "PHARMACIE",
    abbreviation: "PHARM",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études de premier cycle acrédité en pharmacie. Permis d'exercice en règle.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO1,2", "MÉ1,2", "RECL1,2", "PSAC1,2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études de premier cycle acrédité dans :3,4 o Pharmacie o Doctorat en pharmacie (niveau d’entrée)",
                  "ET",
                  "Permis d’exercice de la pharmacie sans restriction en règle5",
                  "Lettre de l’autorité de réglementation professionnelle attestant que le candidat est « en règle »6",
                ],
                experience: [
                  "Si diplômé au cours des douze (12) mois précédents3,4: o Aucune expérience requise",
                  "Si diplômé depuis plus des douze (12) mois précédents: o Au moins 1800 heures (c.-à-d. 48 semaines à temps plein) de dispensation de soins en pharmacie directement à des patients au Canada au cours des deux (2) années précédentes.",
                  "ET",
                  "o 450 heures (c.-à-d 12 semaines à temps plein) de dispensations de soins en pharmacie à des patients hospitalisés dans un hôpital de soins tertiaires7 au cours des cinq (5) années précédentes",
                ],
              },
            ],
          },
          {
            candidates: ["MÉ1,2", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Mêmes que pour EDO"],
                experience: [
                  "Atteinte du NPC8 comme PHARM 00194 dans la P rés ou la F rég",
                ],
              },
            ],
          },
          {
            candidates: ["PFOS1", "PMEP1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition dans un programme d’études3 à une université du Canada dans l’un des domaines suivants: o Doctorat en pharmacie (premier cycle)",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le conseiller de GPM doit être avisé et se réserve le droit de rejeter tout candidat pour les raisons suivantes : a) Le candidat fait présentement l’objet d’une enquête par une autorité de réglementation; b) Le candidat a fait l’objet d’une enquête ayant abouti à l’imposition de sanctions; et c) Le candidat s’est vu révoquer son permis par une autorité de réglementation.",
          "3. On peut consulter les programmes d’études de premier cycle acréditésen pharmacie à l’adresse suivante: https://ccapp.ca/fr/programmes-internationaux/",
          "4. Tous les diplômes internationaux doivent comporter une évaluation du diplôme rempli; cette évaluation figure au lien suivant : https://www.wes.org/fr/",
          "5. Un permis en règle sans restriction est un permis d’exercice de la profession comme pharmacien clinicien indépendant sans condition dans une province ou un territoire du Canada.",
          "6. Une lettre de l’autorité réglementaire professionnelle attestant que le candidat est en « en règle » est exigée. On trouve les autorités de réglementation provinciale et territoriale à l’adresse suivante : https://napra.ca/fr/organismes-de-reglementation-de-la-pharmacie.",
          "7. On définit un hôpital de soins tertiaires comme étant un hôpital principal disposant de toute la gamme de soins aux patients. Ces services comprennent, entre autres, une unité de soins intensifs, une unité d’infectiologie et la chirurgie. Une expérience en soins tertiaires est acquise en travaillant dans un hôpital de soins tertiaires après avoir reçu un diplôme. Un candidat doit fournir des références en règle du centre de soins tertiaires où il travaille, notamment son secteur d’intervention particulier.",
          "8. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO1,2", "RECL1,2", "PSAC1,2", "MSÉ1,2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études de premier cycle acrédité dans l’un des domaines suivants: Pharmacie3,4 ou Doctorat en pharmacie (niveau d’entrée)3,4",
                  "ET",
                  "Permis d’exercice de la pharmacie sans restriction en règle5",
                  "Lettre de l’autorité de réglementation professionnelle attestant que le candidat est « en règle »6",
                ],
                experience: [
                  "Si diplômé au cours des douze (12) mois précédents4: o Aucune expérience requise",
                  "Si diplômé depuis plus des douze (12) mois précédents : o Au moins 1 800 heures (c.-à-d. 48 semaines à temps plein) de dispensation de soins en pharmacie directement à des patients au Canada au cours des deux (2) années précédentes.",
                  "ET",
                  "o Le candidat doit se soumettre à un examen de son profil de pratique par le conseiller du GPM afin de déterminer la pertinence globale de son expérience8",
                ],
              },
            ],
          },
          {
            candidates: ["CT 1,2", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Même qualifications de scolarité que EDO"],
                experience: [
                  "Atteinte du NPC7 comme 00194 PHARM dans la P rés ou la F rég",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le conseiller de GPM doit être avisé et se réserve le droit de rejeter tout candidat pour les raisons suivantes: d) Le candidat fait présentement l’objet d’une enquête par une autorité de réglementation; e) Le candidat a fait l’objet d’une enquête ayant abouti à l’imposition de sanctions; ou f) Le candidat s’est vu révoquer son permis par une autorité de réglementation.",
          "3. On peut consulter les programmes d’études de premier cycle agréés en pharmacie à l’adresse suivante: https://ccapp.ca/fr/programmes-internationaux/",
          "4. Tous les diplômes internationaux doivent comporter une évaluation du diplôme rempli; cette évaluation figure au lien suivant: https://www.wes.org/fr/",
          "5. Un permis en règle sans restriction est un permis d’exercice de la profession comme pharmacien clinicien indépendant sans condition dans une province ou un territoire du Canada.",
          "6. Une lettre de l’autorité réglementaire professionnelle attestant que le candidat est en « en règle » est exigée. On trouve les autorités de réglementation provinciale et territoriale à l’adresse suivante: https://napra.ca/fr/organismes-de-reglementation-de-la-pharmacie.",
          "7. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "8. L'expérience doit être validée par le conseiller du GPM Pharmacie par le biais d'un processus officiel d’évaluation et reconnaissance des acquis (ÉRA). Pour lancer une demande d’ÉRA, une liste des documents requis peut être obtenue en contactant le Groupe des Services de santé des Forces canadiennes...",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "4 ans",
      },
      {
        program: "PMEP/PFOS",
        duration: "9 ans",
      },
    ],
  },
  {
    id: "00195",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "SOINS INFIRMIERS",
    abbreviation: "S INFIRM",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Programme de baccalauréat en sciences infirmières et permis d'exercice en règle.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1,4,8", "RECL 1,4,8", "MÉ 1,4,8", "PSAC 1,4,8"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Programme de baccalauréat6,7: o Baccalauréat en sciences infirmières o Baccalauréat ès sciences infirmières; ou o Baccalauréat en sciences des soins infirmiers",
                  "ET",
                  "Permis d’exercice en règle (état actif) en soins infirmiers3 en tant qu’infirmier autorisé octroyé par un organisme de réglementation provincial ou territorial du Canada5",
                  "ET",
                  "Certificat post-baccalauréat ou cours équivalent9 dans l’une des spécialités suivantes : o Soins intensifs o Soins d’urgence o Soins périopératoire o Santé mentale o Soins médicaux-chirurgicaux",
                ],
                experience: [
                  "Au moins 1,700 heures d’expérience comme infirmier autorisé3 au cours des deux années précédentes dans l’un ou plusieurs des domaines d’exercice suivants: o Soins critiques (soins intensifs et d’urgence) o Santé mentale / Psychiatrie o Soins médicaux-chirurgicaux o Soins péri-opératoires / Salle d’opération",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Programme de baccalauréat6,7: o Baccalauréat en sciences infirmières o Baccalauréat ès sciences infirmières o Baccalauréat en sciences des soins infirmiers",
                  "ET",
                  "Permis d’exercice en règle (état actif) en soins infirmiers en tant qu’infirmier autorisé ou infirmier en pratique3 octroyé par un organisme de réglementation provincial ou territorial du Canada5",
                ],
                experience: [
                  "Diplômé au cours des 18 derniers mois, aucune expérience minimale requise (Candidats en soins infirmiers médico-chirurgicaux seulement)",
                  "OU",
                  "Diplômé depuis plus de 18 mois et ayant cumulé au moins 900 heures, au cours des 3 dernières années, d’expérience en tant qu’infirmier(ère) autorisé(e) au Canada dans n’importe quel domaine de pratique infirmière (voir la note 8)",
                ],
              },
            ],
          },
          {
            candidates: ["EDO 1, 4", "MÉ 1, 4", "RECL 1, 4", "(Qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme en sciences infirmières6, 7 en: o Maîtrise en sciences infirmières – Infirmier(ère) praticien(ne) o Maîtrise en sciences infirmières – Pratique avancée o Baccalauréat en sciences infirmières o Baccalauréat ès sciences en soins infirmiers o Baccalauréat en sciences infirmières",
                  "ET",
                  "Permis d’exercice en règle (état actif) en soins infirmiers en tant qu’infirmier autorisé ou infirmier en pratique 3 octroyé par un organisme de réglementation provincial ou territorial du Canada 5",
                ],
                experience: [
                  "Atteinte du NPC comme S Infirm 001952 dans la F rég ou F rés",
                ],
              },
            ],
          },
          {
            candidates: ["PFOR 1, 10", "PFUMR 1, 10"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Acceptation sans condition dans un programme de baccalauréat6 dans l’un des domaines suivants: o Baccalauréat en sciences infirmières o Baccalauréat ès sciences infirmières o Baccalauréat en sciences des soins infirmiers",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFOEP 1, 4, 10"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme en soins infirmiers d’un collège agréé au Canada",
                  "ET",
                  "Permis d’exercice en règle (état actif) en soins infirmiers en tant qu’infirmier autorisé ou infirmier en pratique3 octroyé par un organisme de réglementation provincial ou territorial du Canada 5",
                  "ET",
                  "Acceptation sans condition dans un programme de baccalauréat 6 dans l’un des domaines suivants : o Baccalauréat en sciences infirmières o Baccalauréat ès sciences infirmières o Baccalauréat en sciences des soins infirmiers",
                ],
                experience: [
                  "Diplômé au cours des 18 derniers mois, aucune expérience minimale requise (officier infirmier en soins médico-chirurgicaux seulement)",
                  "OU",
                  "Diplômé depuis plus de 18 mois et ayant cumulé au moins 900 heures, au cours des 3 dernières années, d’expérience en tant qu’infirmier(ère) autorisé(e)3 au Canada dans n’importe quel domaine de pratique infirmière",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "3. Le candidat doit exercer ses fonctions en tant qu’« Infirmier autorisé » ou « Infirmier praticien » et doit détenir un permis d’exercice complet et sans restriction dans la catégorie d’infirmier autorisé, d’infirmier autorisé (classe étendue), d’infirmier autorisé (infirmier praticien) ou d’infirmier praticien dans une province ou un territoire du Canada, sans antécédent de suspension de permis dans quelque juridiction que ce soit. Cela exclut l’infirmier auxiliaire autorisé, l’infirmier immatriculé, l’infirmier psychiatrique autorisé ainsi que l’infirmier diplômé travaillant avec un permis temporaire.",
          "4. Pour lancer une EFA, le candidat peut obtenir une liste des documents requis en communiquant avec le Groupe des Services de santé des Forces armées canadiennes, à qui ces documents doivent être transmis à l’adresse suivante : DND.CFHSVCsGP_PLAR-ERA_GpSvcFC.MDN@forces.gc.ca...",
          "5. Par « permis en règle sans restriction », on entend un permis complet, sans restriction et illimité d’exercice en tant qu’infirmier autorisé ou d’infirmier autorisé (classe étendue), permettant l’exercice en tant qu’infirmier autorisé dans une province ou un territoire du Canada, sans aucune condition.",
          "6. Les programmes admissibles de baccalauréat ou de maîtrise en sciences infirmières pour le groupe professionnel S INFIRM 00195 doivent être accrédités par l’Association canadienne des écoles de sciences infirmières (ACÉSI/CASN) et sont répertoriés au lien suivant : https://accred.casn.ca/fr/our-programs/programmes-inf-aut/agrement-et-programmes-agrees/.",
          "7. Le diplôme de baccalauréat en sciences infirmières des infirmiers(ères) formé(e)s à l’étranger doit avoir été évalué comme étant une équivalence comparable à un diplôme de baccalauréat canadien par le Service national d’évaluation infirmière (National Nursing Assessment Service) https://www.nnas.ca/fr/.",
          "8. EDO/RECL/MÉ/PSAC les candidats peuvent être enrôlés directement dans l’occupation principale d’officier infirmier médico-chirurgical ou dans l’une des sous-occupations suivantes: officier infirmier en santé mentale, officier infirmier de salle d’opération ou officier infirmier en soins intensifs.",
          "9. Les candidats qui ne possèdent pas le certificat canadien post-baccalauréat ou un cours équivalent, mais qui détiennent une certification de l’Association des infirmières et infirmiers du Canada (AIIC) en soins intensifs – CNCC(C), en soins d’urgence – ENC(C), en soins péri-opératoires – CPN(C), en psychiatrie et santé mentale – CPMHN(C), ou en soins médico-chirurgicaux – CMSN(C) doivent soumettre une EFA.",
          "10. Les programmes canadiens de diplôme condensés, accélérés ou passerelles, même s’ils sont accrédités, ne sont normalement pas autorisés pour les plans subventionnés de production d’officiers (PFOR/PFUMR/PFOEP S INFIRM). Toutefois, ils peuvent être approuvés au cas par cas au moyen d’une demande de dérogation au DPGR.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1,4",
              "PSAC 1,4",
              "RECL 1,4",
              "MSÉ 1,4",
              "MÉ 1,4",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Programme de baccalauréat6,7: o Baccalauréat en sciences infirmières o Baccalauréat ès sciences infirmières o Baccalauréat en sciences des soins infirmiers",
                  "ET",
                  "Permis d’exercice en règle (état actif)3 en soins infirmiers en tant qu’infirmier autorisé ou infirmier en pratique octroyé par un organisme de réglementation provincial ou territorial du Canada5",
                  "ET",
                  "Certificat post-baccalauréat8,9 ou équivalent dans l'une des spécialités suivantes: o Soins intensifs o Soins d’urgence o Soins périopératoires o Santé mentale o Soins médicaux chirurgicaux",
                ],
                experience: [
                  "Infirmiers autorisés:3 occuper présentement un emploi comme infirmier autorisé avec 2,600 heures d’expérience au Canada au cours des deux dernières années dans un ou plusieurs des domaines de pratique suivants: o Soins critiques (soins intensifs et d’urgence) o Santé mentale / Psychiatrie o Médico-chirurgicaux o Soins péri-opératoires / Salle d’opération",
                ],
              },
            ],
          },
          {
            candidates: [
              "EDO 1,4,11",
              "PSAC 1,4,11",
              "RECL 1,4,11",
              "MSÉ 1,4,11",
              "MÉ 1,4,11",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Programme de baccalauréat6,7: o Baccalauréat en sciences infirmières o Baccalauréat ès sciences infirmières o Baccalauréat en sciences des soins infirmiers",
                  "ET",
                  "Permis d’exercice en règle (état actif)3 en soins infirmiers en tant qu’infirmier autorisé ou infirmier en pratique octroyé par un organisme de réglementation provincial ou territorial du Canada5",
                ],
                experience: [
                  "Diplômé au cours des 18 derniers mois, aucune expérience minimale requise (officier infirmier en soins médico-chirurgicaux seulement)",
                  "OU",
                  "Diplômé depuis plus de 18 mois avoir cumulé un minimum de 900 heures, au cours des 3 dernières années, d’expérience au Canada en soins infirmiers médico-chirurgicaux.",
                  "OU",
                  "Au moins 1,700 heures d’expérience comme infirmier autorisé3 au cours des 3 dernières années dans l’un ou plusieurs des domaines d’exercice suivants: o Soins critiques (soins intensifs et d’urgence) o Santé mentale / psychiatrie o Soins péri-opératoires / salle d’opération",
                ],
              },
              {
                level: "Idéal",
                education: [
                  "Diplôme en sciences infirmières6,7 dans l’un des programmes suivants: o Maîtrise en sciences infirmières – Infirmier(ère) praticien(ne) o Maîtrise en sciences infirmières – Pratique avancée",
                  "ET",
                  "Permis d’exercice en règle (statut actif)³ en soins infirmiers à titre d’infirmier(ère) praticien(ne), octroyé par un organisme de réglementation provincial ou territorial du Canada5",
                ],
                experience: [
                  "Infirmier(ère) praticien(ne) comptant 2 600 heures d’expérience au Canada au cours des deux dernières années. La priorité sera accordée aux personnes ayant de l’expérience10 dans un ou plusieurs des domaines suivants: o Soins de santé primaires o Soins aux adultes o Soins aigus",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Diplôme en sciences infirmières6,7 dans l’un des programmes suivants: o Maîtrise en sciences infirmières – Infirmier(ère) praticien(ne) o Maîtrise en sciences infirmières – Pratique avancée",
                  "ET",
                  "Permis d’exercice en règle (statut actif)³ en soins infirmiers à titre d’infirmier(ère) praticien(ne), octroyé par un organisme de réglementation provincial ou territorial du Canada5",
                ],
                experience: [
                  "Infirmier(ère) praticien(ne) comptant 1 700 heures d’expérience au Canada au cours des 3 dernières années. La priorité sera accordée aux personnes ayant de l’expérience10 dans un ou plusieurs des domaines suivants : o Soins de santé primaires o Soins aux adultes o Soins aigus",
                ],
              },
            ],
          },
          {
            candidates: ["MÉ 1,4", "RECL 1,4", "MSÉ 1,4", "(Qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme en sciences infirmières6,7 dans l’un des programmes suivants: o Maîtrise en sciences infirmières – Infirmier(ère) praticien(ne) o Maîtrise en sciences infirmières – Pratique avancée o Baccalauréat en sciences infirmières o Baccalauréat ès sciences en sciences infirmières o Baccalauréat en sciences infirmières",
                  "ET",
                  "Permis d’exercice en règle (état actif) en soins infirmiers en tant qu’infirmier autorisé3 ou infirmier en pratique octroyé par un organisme de réglementation provincial ou territorial du Canada5",
                ],
                experience: [
                  "Atteinte du NPC2 comme S INFIRM 00195 dans la F rég ou F rés",
                ],
              },
            ],
          },
          {
            candidates: ["PIRO 1,11"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Admis et inscrit à un programme de baccalauréat et à moins d’un an de l’obtention de son diplôme de premier cycle en : o Baccalauréat ès sciences infirmières; ou o Baccalauréat en sciences des soins infirmiers",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "3. Le candidat doit exercer ses fonctions en tant qu’« Infirmier autorisé » ou « Infirmier praticien » et doit détenir un permis d’exercice complet et sans restriction... Cela exclut l’infirmier auxiliaire autorisé, l’infirmier immatriculé, l’infirmier psychiatrique autorisé ainsi que l’infirmier diplômé travaillant avec un permis temporaire.",
          "4. Candidat EDO/RECL/PSAC/MÉ/MSÉ: pour lancer une EFA, le candidat peut obtenir une liste des documents requis en communiquant avec le Groupe des Services de santé des Forces armées canadiennes... afin de déterminer si le candidat satisfait aux exigences suivantes en plus de celles énoncées dans le tableau précédent : a. N’avoir aucun antécédent de révocation du permis d’exercice par une autorité compétente; b. Ne pas faire présentement l’objet d’une enquête de la part d’un organisme de réglementation... c. Expérience clinique pertinente. d. Confirmer le statut 00195 S INFIRM NPC (le cas échéant).",
          "5. Par permis en règle (statut actif), on entend un permis complet, sans restriction, dans l’une des catégories suivantes : infirmier(ère) autorisé(e), infirmier(ère) autorisé(e) (classe étendue), infirmier(ère) autorisé(e) (infirmier(ère) praticien(ne)) ou infirmier(ère) praticien(ne), permettant l’exercice à titre d’infirmier(ère) autorisé(e) ou d’infirmier(ère) praticien(ne) dans une province ou un territoire du Canada, sans conditions.",
          "6. Le diplôme de baccalauréat en sciences infirmières des infirmier(ère)s formé(e)s à l’étranger doit avoir été évalué comme étant équivalent à un baccalauréat canadien par le Service national d’évaluation infirmière (SNEI): https://www.nnas.ca/fr/",
          "7. Les candidats ayant de l’expérience dans d’autres spécialités peuvent être considérés pour l’enrôlement par le conseiller du GPM 00195 S INFIRM au moyen d’une EFA, en fonction de leur expérience clinique.",
          "8. Les candidats qui ne possèdent pas le certificat canadien post-baccalauréat ou un cours équivalent, mais qui détiennent une certification de l’Association des infirmières et infirmiers du Canada (AIIC)... doivent soumettre une EFA.",
          "9. L’expérience devrait inclure, ou avoir pour principal objectif, la prise en charge de la population adulte (âges 18 à 64 ans).",
          "10. EDO/RECL/MÉ/PSAC: les candidats peuvent être enrôlés directement dans l’occupation principale d’officier infirmier médico-chirurgical ou dans l’une des sous-occupations suivantes : infirmier(ère) praticien(ne), officier infirmier en santé mentale, officier infirmier de salle d’opération, officier infirmier en soins intensifs.",
          "11. Pour les candidats du Québec, cela comprend l’inscription à un programme de CÉGEP préuniversitaire approprié conformément à la DOAD 5002-8, Programme d’admission de la Réserve – Officiers.",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "6 ans",
      },
      {
        program: "PFOR",
        duration: "11 ans",
      },
    ],
  },
  {
    id: "00197",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 4, u: 5 },
    title: "OFFICIER DES SCIENCES BIOLOGIQUES",
    abbreviation: "BIO",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Maîtrise ou baccalauréat spécialisé en sciences de la vie (biologie, kinésiologie, etc.).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL1", "MÉ 1", "PSAC 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Maîtrise 2 dans: o Intégration des systèmes humains (facteurs humains) o Santé environnementale et professionnelle (hygiène du travail) o Santé publique o Kinésiologie",
                  "OU",
                  "Maîtrise 2 correspondant à l’un des diplômes idéaux ou acceptables",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat spécialisé (ou équivalent): 3 o Biologie humaine o Physiologie humaine o Kinésiologie o Biologie o Biochimie o Microbiologie o Génie biomédical o Diplôme dans une discipline des sciences de la vie 4",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : o toute discipline"],
                experience: [
                  "Doit avoir atteint le niveau professionnel de compétence (NPC) 6 en tant que 00197 BIO",
                ],
              },
            ],
          },
          {
            candidates: ["PFOR 1", "PFUMR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Obtenir une acceptation inconditionnelle à: Baccalauréat spécialisé (ou équivalent): o Biologie humaine o Physiologie humaine o Kinésiologie o Biologie o Biochimie o Microbiologie o Génie biomédical o Diplôme dans une discipline des sciences de la vie 4",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Conformément à la DOAD 5002-10, Exigences scolaires pour la commission à partir des rangs",
                ],
                experience: [
                  "Au minimum, les candidats doivent détenir le grade substantif de sergent (sgt) ou supérieur en tant que technicien en physiologie aéronautique (00373 TECH PHYS AÉRO).",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Toutes les maîtrises doivent être examinées par le conseiller du ID SGPM des officiers en biosciences afin de déterminer l’admissibilité au niveau idéal. Les candidats qui ne satisfont pas à la norme d’entrée idéale peuvent néanmoins être jugés admissibles au niveau acceptable, à condition de détenir le baccalauréat approprié, par l’entremise de CFHSAttractionCell- CelluledattractionSSFC@forces.gc.ca.",
          "3. Les candidats qui ne détiennent pas la maîtrise idéale doivent être titulaires d’un baccalauréat spécialisé acceptable ou un équivalent.",
          "4. Un baccalauréat spécialisé en sciences de la vie doit être évalué pour vérifier l’admissibilité à la profession d’officier des biosciences. Pour lancer une évaluation, les relevés de notes doivent être fournis au Groupe des Services de santé des Forces canadiennes à l’adresse suivante: CFHSAttractionCell-CelluledattractionSSFC@forces.gc.ca.",
          "5. Les candidats PFOR/PFUMR sont tenus (lorsqu’ils sont admissibles) de s’inscrire à un programme de baccalauréat spécialisé (ou équivalent) comportant la réalisation d’un mémoire. Les programmes de baccalauréat peuvent exiger que les étudiants présentent une demande d’admission au programme spécialisé seulement après avoir complété un certain nombre d’années d’études. L’expression « lorsqu’ils sont admissibles » signifie que les étudiants doivent présenter leur demande au programme spécialisé dès qu’ils satisfont aux critères d’admissibilité. Le fait de ne pas intégrer ou de ne pas demeurer dans le programme spécialisé entraînera un reclassement obligatoire.",
          "6. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "PSAC 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Maîtrise 2 dans: o Intégration des systèmes humains (facteurs humains) o Santé environnementale et professionnelle (hygiène du travail) o Santé publique o Kinésiologie",
                  "OU",
                  "Maîtrise 2 correspondant à l’un des diplômes idéaux ou acceptables",
                ],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC) 3 au sein d’une occupation de la F rég ou F rés",
                  "24 mois d’expérience de travail cumulative dans un domaine pertinent 5",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat spécialisé (ou équivalent): o Biologie humaine o Physiologie humaine o Kinésiologie o Biologie o Biochimie o Microbiologie o Génie biomedical o Diplôme dans une discipline des sciences de la vie 4",
                ],
                experience: [
                  "24 mois d’expérience de travail cumulative dans un domaine pertinent 5",
                ],
              },
            ],
          },
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : o toute discipline"],
                experience: [
                  "Doit avoir atteint le niveau professionnel de compétence (NPC) 3 en tant que 00197 BIO",
                  "24 mois d’expérience de travail cumulative dans un domaine pertinent 5",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Toutes les maîtrises doivent être examinées par le conseiller du ID SGPM des officiers en biosciences afin de déterminer l’admissibilité au niveau idéal. Les candidats qui ne satisfont pas à la norme d’entrée idéale peuvent néanmoins être jugés admissibles au niveau acceptable, à condition de détenir le baccalauréat approprié, par l’entremise de CFHSAttractionCell- CelluledattractionSSFC@forces.gc.ca.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "4. Un baccalauréat spécialisé en sciences de la vie doit être évalué pour vérifier l’admissibilité à la profession d’officier des biosciences. Pour lancer une évaluation, les relevés de notes doivent être fournis au Groupe des Services de santé des Forces canadiennes à l’adresse suivante: CFHSAttractionCell-CelluledattractionSSFC@forces.gc.ca.",
          "5. Expérience acquise dans toute combinaison des domaines suivants: intégration des systèmes humains / facteurs humains, santé au travail / hygiène industrielle, renseignement médical, NRBC, physiologie aérospatiale, sécurité laser, science et technologie, recherche ou gestion de projets doit être examinée et approuvée par le conseiller de la structure des groupes professionnels militaires (SGPM) de l’occupation BIO, par l’entremise de CFHSAttractionCell- CelluledattractionSSFC@forces.gc.ca.",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "9 ans",
      },
    ],
  },
  {
    id: "00198",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "TRAVAIL SOCIAL",
    abbreviation: "T SOC",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat en service social (BSS) ou maîtrise en service social (M.S.S.). Permis en règle d'exercer comme travailleur social.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "PSAC 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Maîtrise en service social (M.S.S.) dans un programme agréé, axé ou spécialisé sur le service social en pratique clinique",
                  "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est « en règle »",
                ],
                experience: [
                  "Minimum de 3 400 heures (2 ans) d’expérience pertinente, au cours des cinq dernières années (à l'exclusion des stages)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Maîtrise en service social (M.S.S.) dans un programme agréé, axé ou spécialisé sur le service social en pratique clinique",
                  "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est « en règle »",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["ES-PMNE 1 (En service F reg)"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat en service social (BSS)",
                  "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est « en règle »",
                  "Admission sans condition à un programme agréé de Maîtrise en service social (M.S.S.) dans une université canadienne et axé sur la pratique clinique",
                ],
                experience: [
                  "Minimum de 3 400 heures (2 ans) d’expérience pertinente, au cours des cinq dernières années (à l'exclusion des stages)",
                  "ET Atteinte du niveau professionnel de compétence (NPC) dans le métier actuel",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "N’importe quel baccalauréat",
                  "Admission sans condition à un programme agréé de Maîtrise en service social (M.S.S.) dans une université canadienne et axé sur la pratique clinique",
                ],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC) dans le métier actuel",
                ],
              },
            ],
          },
          {
            candidates: ["PFOS 1 (Candidat civil, MÉ)"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat en service social (BSS)",
                  "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est « en règle »",
                  "Admission sans condition à un programme agréé de Maîtrise en service social (M.S.S.) dans une université canadienne et axé sur la pratique clinique",
                ],
                experience: [
                  "Minimum de 3 400 heures (2 ans) d’expérience pertinente, au cours des cinq dernières années (à l'exclusion des stages)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en service social (BSS)",
                  "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est « en règle »",
                  "Admission sans condition à un programme agréé de Maîtrise en service social (M.S.S.) dans une université canadienne et axé sur la pratique clinique",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent démontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. On peut consulter les programmes agréés canadiens menant à la Maîtrise en service social (M.S.S.) axé sur la pratique clinique, acceptables en vue d’Études subventionnées pour la maîtrise au niveau d’entrée (ESNEM).",
          "5. Par « permis en règle sans restriction », on entend un permis complet, sans restriction et illimité d’agir comme travailleur social dans une province ou un territoire du Canada.",
          "6. L'expérience pertinente est définie comme un nombre cumulé de 3 400 heures de travail à temps plein ou à temps partiel au cours des cinq dernières années.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "MSÉ 1", "PSAC 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Maîtrise en service social (M.S.S.) dans un programme agréé, axé ou spécialisé sur le service social en pratique clinique",
                  "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est « en règle »",
                ],
                experience: [
                  "Minimum de 3 400 heures (2 ans) d’expérience pertinente, au cours des cinq dernières années (à l'exclusion des stages)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Maîtrise en service social (M.S.S.) dans un programme agréé, axé ou spécialisé sur le service social en pratique clinique",
                  "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est « en règle »",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["RECL 1", "MÉ 1", "MSÉ 1 (Qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Maîtrise en service social (M.S.S.) d’un programme agréé, axé ou spécialisé sur le service social en pratique clinique",
                  "Permis en règle sans restriction (en cours de validité) d’agir comme travailleur social",
                  "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est « en règle »",
                ],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC) comme 00198 T SOC dans la F rég",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent démontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "6 ans",
      },
      {
        program: "ES_PMNE/PFOS",
        duration: "9 ans",
      },
    ],
  },
  {
    id: "00203",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "OFFICIER DES AFFAIRES PUBLIQUES",
    abbreviation: "OAP",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat ou Maîtrise dans les communications, relations publiques, journalisme ou domaines connexes.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1, 2, 3",
              "RECL 1, 2, 3",
              "MÉ 1, 2, 3",
              "PSAC 1, 2, 3",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Maîtrise: Communications, Relations internationales, Journalisme, Relations publiques, Anglais/français, Science politique, Commercialisation, Médias numériques, Études militaires et stratégiques, Anthropologie, Psychologie, Philosophie, Sociologie, Linguistique",
                ],
                experience: [
                  "Au moins une (1) année d’expérience cumulative dans deux ou plusieurs des domaines",
                  "OU Expérience opérationnelle en déploiement (au moins 6 mois)",
                ],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat dans un des domaines mentionnés"],
                experience: [
                  "Au moins une (1) année d’expérience cumulative dans deux ou plusieurs des domaines",
                  "OU Expérience opérationnelle en déploiement (au moins 6 mois)",
                ],
              },
            ],
          },
          {
            candidates: ["MÉ 1, 2", "RECL 1, 2", "EDO 1, 2 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : N'importe lequel"],
                experience: [
                  "Atteinte du Niveau opérationnel de compétence (NOC) comme Officier des affaires publiques (OAP) à la F rég ou à la P rés",
                ],
              },
            ],
          },
          {
            candidates: ["PFUMR 1, 2, 3", "PFOR 1, 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Admission sans condition à un programme de Baccalauréat dans les domaines mentionnés",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1, 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Certificat d’école secondaire ou l’équivalent OU Diplôme ou baccalauréat d’un établissement post-secondaire (équivalent à au moins deux années d'études)",
                ],
                experience: [
                  "Qualification au grade effectif de sgt/m 2 dans le GPM 00137 TECH IMAG",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Certificat d’école secondaire ou l’équivalent"],
                experience: [
                  "Qualification au grade effectif de Adjuc/pm1 et ont occupé le grade de adjum/pm2 dans le GPM 00137 TECH IMAG",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
          "2. Les candidats doivent obtenir la note de passage à l'examen de communication écrite (ECE).",
          "3. Les candidats doivent se soumettre à un canevas réaliste de l’emploi, organisé par la Branche des affaires publiques.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1, 2",
              "RECL 1, 2, 3",
              "MÉ 1, 2, 3",
              "PSAC 1, 2, 3",
            ],
            requirements: [
              {
                level: "Idéal",
                education: ["Maîtrise dans les domaines mentionnés"],
                experience: [
                  "Au moins une (1) année d’expérience cumulative dans deux ou plusieurs des domaines",
                  "OU Expérience opérationnelle en déploiement (au moins 6 mois)",
                ],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat dans un des domaines mentionnés"],
                experience: [
                  "Au moins une (1) année d’expérience cumulative dans deux ou plusieurs des domaines",
                  "OU Expérience opérationnelle en déploiement (au moins 6 mois)",
                ],
              },
            ],
          },
          {
            candidates: ["MÉ 1, 2", "RECL 1, 2", "MSÉ 1, 2 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : N'importe lequel"],
                experience: [
                  "Atteinte du Niveau opérationnel de compétence (NOC) comme Officier des affaires publiques (OAP) à la F rég ou à la P rés",
                ],
              },
            ],
          },
          {
            candidates: ["PIRO 1, 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Enrôlé comme étudiant à temps partiel, à plein temps ou en apprentissage à distance dans un établissement post-secondaire menant à un Baccalauréat dans les domaines mentionnés",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1, 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Certificat d’école secondaire ou l’équivalent OU Diplôme ou baccalauréat d’un établissement post-secondaire",
                ],
                experience: [
                  "Qualification au grade effectif de Sgt/m 2 dans le GPM 00137 TECH IMAG",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Certificat d’école secondaire ou l’équivalent"],
                experience: [
                  "Qualification au grade effectif de Adjuc/pm1 et ont occupé le grade de adjum/pm2 dans le GPM 00137 TECH IMAG",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du TAFC.",
          "2. Les candidats doivent obtenir la note de passage à l'examen de communication écrite (ECE).",
          "5. Consulter la DOAD 5002-10 pour connaître les exigences relatives à la scolarité.",
          "6. Pour les candidats du Québec, cela comprend l’enrôlement dans un programme pré-universitaire approprié du CÉGEP.",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "6 ans",
      },
      {
        program: "PFOR",
        duration: "10 ans",
      },
    ],
  },
  {
    id: "00204",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "AVOCAT MILITAIRE",
    abbreviation: "AVOCAT MIL",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme en droit décerné par une faculté de droit canadienne et autorisation à pratiquer le droit.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1, 5, 7",
              "RECL 1, 5, 7",
              "MÉ 1, 5, 7",
              "PSAC 1, 5, 7",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "1. Détenir un diplôme en droit décerné par une faculté de droit canadienne reconnue",
                  "2. Être autorisé à pratiquer le droit dans au moins une province ou un territoire canadien",
                  "3. Être « membre en règle » d'un barreau provincial ou territorial",
                ],
                experience: [
                  "Si diplôme obtenu dans les deux (2) dernières années : aucune expérience minimale",
                  "Si diplôme obtenu il y a plus de deux (2) ans : Pratique du droit à temps plein requise",
                ],
              },
            ],
          },
          {
            candidates: ["PFOS 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme en droit (par exemple, LL. B., B.C.L., ou J.D.)",
                  "Avoir réussi la formation professionnelle exigée par son barreau",
                  "Doit être admis au Barreau dans un délai déterminé",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1, 5, 7",
              "RECL 1, 5, 7",
              "MÉ 1, 5, 7",
              "MSÉ 1, 5, 7",
              "PSAC 1, 5, 7",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "1. Détenir un diplôme en droit décerné par une faculté de droit",
                  "2. Être autorisé à pratiquer le droit dans une province canadienne",
                  "3. Être « membre en règle » d'un barreau provincial ou territorial",
                ],
                experience: [
                  "Si diplôme obtenu dans les deux (2) dernières années : aucune expérience minimale",
                  "Si diplôme obtenu il y a plus de deux (2) ans : Pratique du droit à temps plein requise",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent démontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO",
        duration: "7 ans",
      },
      {
        program: "PMED",
        duration: "12 ans",
      },
    ],
  },
  {
    id: "00207",
    medicalStandard: { v: 4, cv: 2, h: 2, g: 2, o: 2, a: 5, u: 5 },
    title: "OFFICIER DE GUERRE NAVALE",
    abbreviation: "OGN",
    requirements: "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat (toute discipline).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1, 2, 3",
              "PSAC 1, 2, 3",
              "RECL 1, 2, 3",
              "MÉ 1, 2, 3",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat : Ingénierie, Sciences, Administration des affaires, Économie, Commerce, Mathématiques, Systèmes d’information géographique, Technologies de l’information",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : Toute discipline"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFOS 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : N'importe lequel"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFUMR 1, 2, 3", "PFOR 1, 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Admission sans condition à un programme menant à un Baccalauréat : Toute discipline",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PNSCO 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Certificat d'école secondaire ou l'équivalent"],
                experience: [
                  "Qualification au grade de PM 1 et ont déjà occupé le grade de PM 2 (tous les GPM de la RCN)",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
          "2. Les candidats doivent satisfaire au besoin applicable pour l’acuité visuelle.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1, 2",
              "PSAC 1, 2, 3",
              "RECL 1, 2, 3",
              "MÉ 1, 2, 3",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat : Ingénierie, Sciences, Administration des affaires, Économie, Commerce, Mathématiques, Systèmes d’information géographique, Technologies de l’information",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : Toute discipline"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIRO 1, 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition ou être présentement enrôlé comme étudiant à temps partiel ou plein, dans un programme de baccalauréat",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PNSCO 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Certificat d’école secondaire ou l’équivalent"],
                experience: [
                  "Qualification au grade de pm 1 et ont déjà occupé le grade de pm 2 (tous les GPM de la RCN)",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "8 ans",
      },
      {
        program: "PFOR",
        duration: "12 ans",
      },
    ],
  },
  {
    id: "00208",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "SÉLECTION DU PERSONNEL",
    abbreviation: "S PERS",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat spécialisé (4 ans) en psychologie ou sociologie.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["PEDO 1", "RECL 1, 2", "MÉ 1, 2", "PSAC 1, 2"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Maîtrise : Psychologie industrielle organisationnelle, Psychologie sociale, Sociologie, etc.",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat spécialisé – 4 ans (ou l’équivalent au Québec) : Psychologie, Sociologie, Gérontologie, Sciences sociales",
                  "OU Baccalauréat avec spécialisation (120 crédits) : Relations et ressources humaines, Psychologie organisationnelle",
                  "OU Baccalauréat (ou l’équivalent au Québec) dans tout programme connexe comprenant un nombre précis de cours en méthodes de recherche et/ou statistiques",
                ],
                experience: [
                  "Au moins une ou plusieurs années de travail à temps plein, payé, et connexe au domaine après l'obtention du diplôme de baccalauréat",
                ],
              },
            ],
          },
          {
            candidates: ["PFUMR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté ou présentement inscrit dans un programme menant à un Baccalauréat spécialisé – 4 ans (ou équivalent au Québec) dans les domaines mentionnés ci-dessus",
                ],
                experience: ["Aucun requis"],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le test d’aptitude des Forces canadiennes (TAFC).",
          "4. Les candidats de la FORCE RÉGULIÈRE doivent avoir travaillé à temps plein après l'obtention de leur baccalauréat.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1, 2", "RECL 1, 2", "MÉ 1, 2", "PSAC 1, 2"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Maîtrise : Psychologie industrielle organisationnelle, Psychologie sociale, Sociologie, etc.",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat spécialisé – 4 ans (ou l’équivalent au Québec) : Psychologie, Sociologie, Gérontologie, Sciences sociales",
                  "OU Baccalauréat avec spécialisation (120 crédits) : Relations et ressources humaines, Psychologie organisationnelle",
                  "OU Baccalauréat (ou l’équivalent au Québec) dans tout programme connexe",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIRO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à l'université ou enrôlé comme étudiant (complet ou temps partiel) dans un baccalauréat visé",
                ],
                experience: ["Aucun requis"],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "6 ans",
      },
      {
        program: "PFOR",
        duration: "10 ans",
      },
    ],
  },
  {
    id: "00211",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "DÉVELOPPEMENT DE L’INSTRUCTION",
    abbreviation: "DÉV INSTR",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Maîtrise ou Baccalauréat en éducation ou un domaine connexe.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1, 2", "RECL 1, 2", "MÉ 1, 2"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Maîtrise en éducation (technologie éducative, conception de systèmes et de l'instruction, développement du curriculum ou évaluation de l'apprentissage avec ou sans thèse)",
                ],
                experience: [
                  "Au moins trois ans cumulatifs d’expérience à temps plein dans un ou plusieurs de ces domaines",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat : Éducation professionnelle, Éducation aux adultes, Éducation (technologie, conception et développement)",
                ],
                experience: [
                  "Au moins une année cumulative d'expérience à temps plein après le baccalauréat dans un des domaines visés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
          "5. Un Baccalauréat en enseignement au niveau primaire, secondaire général, Éducation de l'enfance en difficulté ou administration de l'éducation n'est pas pertinent ou adéquat.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1, 2", "RECL 1, 2", "MÉ 1, 2"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Maîtrise en éducation (technologie éducative, conception de systèmes et de l'instruction, etc.)",
                ],
                experience: [
                  "Au moins trois ans cumulatifs d’expérience à temps plein",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat : Éducation professionnelle, Éducation aux adultes, etc.",
                ],
                experience: [
                  "Au moins une année cumulative d'expérience à temps plein après le baccalauréat dans un des domaines visés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "6 ans",
      },
      {
        program: "PFOR",
        duration: "10 ans",
      },
    ],
  },
  {
    id: "00213",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "RENSEIGNEMENT",
    abbreviation: "RENS",
    requirements: "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat (toute discipline).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1, 2", "PSAC 1, 2", "RECL 1, 2", "MÉ 1, 2"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat : Ingénierie, Informatique, Études de conflits, Histoire, Sciences politiques, Géographie, Mathématiques, Systèmes d’information géographique, Technologies de l’information",
                ],
                experience: [
                  "Expérience cumulative d'au moins six mois dans des domaines reliés",
                  "OU Au moins un an d'expérience progressive",
                  "OU Cours d'Opérateur/Communicateur",
                ],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFOS 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "N'importe quel cours universitaire de premier cycle (Baccalauréat)",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFUMR 1, 2", "PFOR 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Admission sans condition à un programme menant à un Baccalauréat : Toute discipline",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PNSCO 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Certificat d'école secondaire ou l'équivalent"],
                experience: [
                  "Qualification au grade de sgt / m 2 dans n'importe quel GPM",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1",
              "PSAC 1, 2",
              "RECL 1, 2",
              "MÉ 1, 2",
              "MSÉ 1, 2",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat : Ingénierie, Informatique, Études de conflits, Histoire, Sciences politiques, Géographie, etc.",
                ],
                experience: [
                  "Expérience cumulative d'au moins six mois dans des emplois qui ont demandé beaucoup d'analyse",
                  "OU Au moins un an d'expérience",
                  "OU Cours d'Opérateur (F RÉS)",
                ],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIRO 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à l'université ou enrôlé comme étudiant à temps partiel ou régulier dans un programme menant à un baccalauréat, n'importe quelle discipline",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PNSCO 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Certificat d’école secondaire ou l’équivalent"],
                experience: [
                  "Qualification au grade effectif de sgt / m 2 dans n'importe quel GPM",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "6 ans",
      },
      {
        program: "PFOR",
        duration: "10 ans",
      },
    ],
  },
];
