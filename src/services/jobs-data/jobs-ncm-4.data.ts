import { JobEntry } from "./jobs.models";

export const JOBS_NCM_4: JobEntry[] = [
  {
    id: "00374",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "ADJOINT AU MÉDECIN",
    titleEn: "PHYSICIAN ASSISTANT",
    abbreviation: "AM",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Maîtrise ou Baccalauréat d'un prog. accrédité d'adjoint au médecin, certf. de CCAMC, permis provincial et de l'expérience (Idéal: >1500h).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "PSAC 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "• Maîtrise ou baccalauréat dans un programme d’études accrédité d’adjoint au médecin (AM) 2",
                  "• Certificat en règle du Conseil de certification des adjoints au médecin du Canada (CCAMC) et permis/licence en règle (en vigueur) d’exercer comme adjoint au médecin délivré(e) par une autorité réglementaire 3 d’une province ou d’un territoire du Canada",
                  "• Lettre de l’autorité professionnelle réglementaire 3 ou de son superviseur en clinique, selon le cas, attestant que le candidat est en règle",
                ],
                experience: [
                  "• Emploi actuel à temps plein ou partiel dans l’un des domaines suivants : Soins primaires, Urgence, Formation clinique 4 ou autre expérience clinique pertinente 5, 7",
                  "• Expérience 7 d’au moins 1 500 heures au cours des deux dernières années dans l’un ou plusieurs des domaines susmentionnés",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "• Maîtrise ou baccalauréat dans un programme d’études accrédité d’adjoint au médecin (AM) 2",
                  "• Certificat en règle du Conseil de certification des adjoints au médecin du Canada (CCAMC) et permis/licence en règle (en vigueur) d’exercer comme adjoint au médecin délivré(e) par une autorité réglementaire 3 d’une province ou d’un territoire du Canada",
                  "• Lettre de l’autorité professionnelle réglementaire 3 ou de son superviseur en clinique, selon le cas, attestant que le candidat est en règle",
                ],
                experience: [
                  "• Diplôme obtenu au cours des 12 derniers mois: aucune expérience requise",
                  "OU diplôme obtenu il y a plus de 12 mois :",
                  "  - comme l’idéal, expérience 7 minimale de 1 500 heures comme AM au cours des cinq dernières années dans l’un ou plusieurs des domaines susmentionnés",
                  "  - OU comme l’idéal, expérience 7 minimale de 600 heures comme AM au cours des deux dernières années dans l’un ou plusieurs des domaines susmentionnés, et atteinte du NPC 6 dans son GPM actuel",
                ],
              },
            ],
          },
          {
            candidates: ["PFOR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Obtenir une acceptation inconditionnelle dans un programme de formation accrédité de baccalauréat au Canada pour les adjoints au médecin (AM) 2",
                  "OU être présentement inscrit en tant qu’étudiant à temps plein et en règle dans un programme d’études universitaires comme adjoint au médecin à une université du Canada 2",
                ],
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
                  "• Obtenir une acceptation inconditionnelle dans un programme de formation accrédité de maîtrise au Canada pour les adjoints au médecin (AM) 2",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFAMM 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Obtenir une acceptation inconditionnelle dans un programme de formation accrédité de maîtrise ou de baccalauréat au Canada pour les adjoints au médecin (AM) 2",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. On trouve les programmes d’études agréés au Canada menant à un maîtrise ou baccalauréat d’adjoint au médecin au site de la CAPA.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "4. Un candidat ayant une expérience dans un autre domaine ou en nombre d’heures insuffisant peut faire parvenir une demande d’Évaluation de sa formation antérieure (EFA) au Groupe des services de santé des Forces canadiennes.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "PSAC 1", "RECL 1", "MSÉ 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "• Maîtrise ou baccalauréat dans un programme d’études accrédité d’adjoint au médecin (AM) 2",
                  "• Certificat en règle du Conseil de certification des adjoints au médecin du Canada (CCAMC) et permis/licence en règle (en vigueur) d’exercer comme adjoint au médecin",
                  "• Lettre de l’autorité professionnelle réglementaire 3 ou de son superviseur en clinique, selon le cas, attestant que le candidat est en règle",
                ],
                experience: [
                  "• Emploi actuel à temps plein ou partiel dans l’un des domaines de Soins primaires, Urgence, Formation clinique, etc.",
                  "• Expérience 7 minimale de 1 500 heures au cours des deux dernières années dans l’un ou plusieurs des domaines susmentionnés",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "• Maîtrise ou baccalauréat dans un programme d’études accrédité d’adjoint au médecin (AM) 2",
                  "• Certificat en règle du Conseil de certification des adjoints au médecin du Canada (CCAMC) et permis/licence en règle (en vigueur) d’exercer comme adjoint au médecin",
                  "• Lettre de l’autorité professionnelle réglementaire 3 ou de son superviseur en clinique, selon le cas, attestant que le candidat est en règle",
                ],
                experience: [
                  "• Expérience 7 minimale de 1 500 heures comme AM au cours des cinq dernières années dans l’un ou plusieurs des domaines susmentionnés conformément aux normes du candidat « Idéal »",
                  "OU Expérience 7 minimale de 600 heures comme AM au cours des deux dernières années dans l’un ou plusieurs des domaines susmentionnés conformément aux normes du candidat « Idéal », et Atteinte du NPC 6 dans le GPM actuel",
                ],
              },
            ],
          },
          {
            candidates: ["PIRO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Être présentement inscrit en tant qu’étudiant à temps plein et en règle dans ou obtenir une acceptation inconditionnelle dans un programme de formation accrédité de maîtrise ou de baccalauréat au Canada pour les adjoints au médecin (AM) 2",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "5 ans",
      },
      {
        program: "PFAMM/PFOS",
        duration: "9 ans",
      },
    ],
  },
  {
    id: "00375",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "ADMINISTRATEUR – RESSOURCES HUMAINES",
    titleEn: "HUMAN RESOURCES ADMINISTRATOR",
    abbreviation: "ADM RH",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE LA RÉSERVE: Diplôme d’études secondaires avec mathématiques de 11e / Sec V (Idéal) ou 10e année / Secondaire IV avec math appliquées de Sec IV (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE DE LA RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "• Math appliquées de 11e année / Sec V",
                  "• Cours d’anglais ou de français de 11e année / Sec V",
                ],
                experience: [
                  "Expérience de six mois dans l’utilisation de tous les programmes qui suivent dans le cadre d’un emploi au cours des trois dernières années :",
                  "• Microsoft Excel",
                  "• Microsoft PowerPoint",
                  "• Microsoft Word",
                  "• Microsoft Windows",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV comportant :",
                  "• Math appliquées de 10e année / Sec IV",
                  "• Cours d’anglais ou de français de 10e année / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: [
                  "Atteinte du NPC 2 comme 00298 COMMIS SGR ou 00375 ADM HR dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du NPC 2 comme 00298 COMMIS SGR ou 00375 ADM HR dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "3 ans",
      },
    ],
  },
  {
    id: "00376",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "ADMINISTRATEUR – SERVICES FINANCIERS",
    titleEn: "FINANCIAL SERVICES ADMINISTRATOR",
    abbreviation: "ADM SERV FIN",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE LA RÉSERVE: Diplôme d’études secondaires avec mathématiques de 11e / Sec V (Idéal) ou 10e année / Secondaire IV avec math appliquées de Sec IV (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE DE LA RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "• Math appliquées de 11e année / Sec V",
                  "• Cours d’anglais ou de français de 11e année / Sec V",
                ],
                experience: [
                  "Expérience de six mois dans l’utilisation de tous les programmes qui suivent dans le cadre d’un emploi au cours des trois dernières années :",
                  "• Microsoft Excel",
                  "• Microsoft PowerPoint",
                  "• Microsoft Word",
                  "• Microsoft Windows",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV comportant :",
                  "• Math appliquées de 10e année / Sec IV",
                  "• Cours d’anglais ou de français de 10e année / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: [
                  "Atteinte du NPC 2 comme 00298 COMMIS SGR ou 00376 ADM SERV FIN dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du NPC 2 comme 00298 COMMIS SGR ou 00376 ADM SERV FIN dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "3 ans",
      },
    ],
  },
  {
    id: "00378",
    medicalStandard: { v: 4, cv: 3, h: 2, g: 3, o: 3, a: 5, u: 5 },
    title: "CYBEROPÉRATEUR",
    titleEn: "CYBER OPERATOR",
    abbreviation: "CYBEROPÉRATEUR",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme/Bac en cybersécurité/informatique (Idéal) ou diplôme d'études secondaires V / 12e année avec mathématiques avancées du Sec V/12e (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: [
              "Candidat civil 1, 2, 3",
              "RECL 1, 2, 3",
              "MÉ 1, 2, 3",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "• Obtention d’un diplôme ou d’un baccalauréat dans un domaine associé à la cybersécurité, à un établissement d’études postsecondaires agréé (Informatique, Sécurité des réseaux, Technologie des systèmes informatiques, Systèmes informatiques, Sécurité des systèmes informatiques ou Systèmes informatiques : cybersécurité),",
                  "• OU de l’instruction ou une certification reconnue en cybersécurité (CompTIA Security +, CISSP/ISC2, SANS, CE, OSCP)",
                ],
                experience: [
                  "• Aucune expérience requise (si diplôme complété),",
                  "• OU si certification : Avoir occupé pendant au moins un an un emploi relié à la cybersécurité au cours des trois dernières années (Analyste, Spécialiste d'incident, Vérificateur, Ingénieur, etc.)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires, Secondaire V au Québec ou l’équivalent, comportant :",
                  "• Mathématiques appliquées de 12e année ou Mathématiques 526 / SN V/TS V au Québec,",
                  "• OU Études informatiques de 12e année ou de Secondaire V, comportant informatique, science informatique, ou programmation informatique",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PESMR 1, 2, 3", "Candidat civil", "RECL", "MÉ"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition ou être présentement enrôlé comme étudiant à temps plein dans un programme d’études à un établissement d’enseignement postsecondaire choisi par les FAC",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC). Un candidat civil/RECL/MÉ/SMÉ qui ne détient pas de diplôme ou de baccalauréat, ainsi qu’un candidat PESMR est tenu d’obtenir la note de passage du TAFC.",
          "2. Le candidat civil doit être en mesure d’obtenir une cote de sécurité de niveau III (Très secret – Accès spécial).",
          "3. On trouve les établissements postsecondaires offrant des programmes d'études PES MR acceptables pour les FAC sur le portail FAC ACE.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "Candidat civil 1, 2, 3",
              "RECL 1, 2, 3",
              "MÉ 1, 2, 3",
              "MSÉ 1, 2, 3",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "• Obtention d’un diplôme ou d’un baccalauréat dans un domaine associé à la cybersécurité (Informatique, Sécurité réseau, Génie informatique, Technologie des systèmes informatiques, Systèmes informatiques, Sécurité des systèmes informatiques ou Systèmes informatiques: cybersécurité),",
                  "• OU de l’instruction ou certification (CompTIA Security +, ISC2, SANS, CE, OSCP)",
                ],
                experience: [
                  "• Occuper présentement un emploi à temps plein dans un des champs liés à la cybersécurité (Analyste en sécurité, Soutien réseau, Incidentologue, Ingénieur de sécurité, etc.)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires, Secondaire V au Québec ou l’équivalent, comportant :",
                  "• Mathématiques appliquées de 12e année ou Mathématiques 526 / SN V/TS V au Québec,",
                  "• OU Études de 12e année en informatique, science informatique, ou programmation informatique",
                ],
                experience: [
                  "• Avoir occupé pendant au moins deux ans un emploi à temps plein relié à la cybersécurité au cours des trois dernières années",
                ],
              },
              {
                level: "Acceptable (Étudiant)",
                education: [
                  "Être présentement inscrit à temps plein à un programme de baccalauréat dans un domaine lié à la cybersécurité à un établissement d’études postsecondaires ou à une université",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC).",
          "2. Le candidat civil doit être en mesure d’obtenir une cote de sécurité de niveau III (Très secret – Accès spécial).",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "6 ans",
      },
      {
        program: "PFS-MR",
        duration: "8 ans",
      },
    ],
  },
  {
    id: "00383",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "OPÉRATEUR DES TRANSMISSIONS",
    titleEn: "SIGNAL OPERATOR",
    abbreviation: "OP TRANS",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Diplôme d’études secondaires avec mathématiques appliquées de 11e / Sec V (Idéal) ou 10e année / Secondaire IV avec math appliquées de Sec IV (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent comportant :",
                  "• Mathématiques appliquées de 11e année / Sec V",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV comportant :",
                  "• Mathématiques appliquées de 10e année / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV comprenant :",
                  "• Mathématiques appliquées de 10e année / Sec IV",
                ],
                experience: [
                  "Atteinte du NPC2 comme 00362-01 SSCIAT ou 00383 OP TRANS",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "3. Dans la plupart des cas, un ancien 00362-01 SSCIAT devra combler un écart d’instruction pour obtenir la qualification 00383 OP TRANS. Une EFA devra être soumise.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "4 ans",
      },
    ],
  },
  {
    id: "00384",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "POSEUR DE LIGNE",
    titleEn: "LINE TECHNICIAN",
    abbreviation: "PL",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Diplôme d’études secondaires avec mathématiques de 11e / Sec V et six mois d'expérience comme poseur de ligne (Idéal) ou 10e année / Secondaire IV avec math de Sec IV (Acceptable, aucune expérience).",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent comportant :",
                  "• Mathématiques appliquées de 11e année / Sec V",
                ],
                experience: [
                  "• Six mois d’expérience dans l’industrie des télécommunications comme poseur de lignes",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV comportant :",
                  "• Mathématiques appliquées de 10e année / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV comportant :",
                  "• Mathématiques appliquées de 10e année / Sec IV",
                ],
                experience: [
                  "Atteinte du NPC2 comme 00362 SSCIAT – TST et 00384 PL",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "3. Une Évaluation de la formation antérieure (EFA) devra être soumise.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "4 ans",
      },
    ],
  },
  {
    id: "00385",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN DES TRANSMISSIONS",
    titleEn: "SIGNALS TECHNICIAN",
    abbreviation: "TECH TRANS",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Diplôme d’études secondaires avec mathématiques de 11e / Sec V et physique (Idéal) ou 10e année / Secondaire IV avec math de Sec IV et sciences (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou équivalent, comportant :",
                  "• Mathématiques appliquées de 11e année / Sec V",
                  "• Physique de 11e année / Sec V",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, comportant :",
                  "• Mathématiques académiques de 10e année / Sec IV",
                  "• Science de 10e année / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire, comportant :",
                  "• Math académiques de 10e année / Sec IV",
                  "• Science de 10e année",
                ],
                experience: [
                  "Atteinte du NPC2 comme 00362 SSCIAT – TSC, 00362 SSCIAT-TSI or 00385 TECH TRANS",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "3. Dans la plupart des cas, un ancien SSCIAT – SC ou TSI devra combler un écart d’instruction pour obtenir la qualification 00385 TECH TRANS.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "4 ans",
      },
    ],
  },
  {
    id: "00386",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN DE SOUTIEN AUX OPÉRATIONS AÉRIENNES",
    titleEn: "AIR OPERATIONS SUPPORT TECHNICIAN",
    abbreviation: "TECH SOA",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires ou l’équivalent (Idéal) ou 10e année / Secondaire IV (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC) 2 dans 00386 TECH SOA",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le niveau Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
        ],
      },
      {
        force: "FORCE DE LA RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat civil 1",
              "RECL 1",
              "MÉ 1",
              "MSÉ 1 (qualifié)",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC) 2 dans 00386 TECH SOA",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le niveau Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "5 ans",
      },
    ],
  },
  {
    id: "00387",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN DES SYSTÈMES DE LARGAGE AÉRIEN",
    titleEn: "AIR DROP SYSTEMS TECHNICIAN",
    abbreviation: "TECH SLA",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d'études secondaires (Idéal) ou 10e année / Secondaire IV (Acceptable) - Expérience avec textiles ou couture/parachutisme est un atout.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1, 2", "RECL 1, 2", "MÉ 1, 2"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou diplôme de Secondaire V au Québec",
                ],
                experience: [
                  "Expérience / de qualifications au travail dans les domaines suivants :",
                  "• Travail avec des textiles",
                  "• Avoir travaillé avec une machine à coudre et l’avoir entretenue",
                  "• Parachutisme",
                  "• Certification d’arrimage de parachutes (FAA/CSPA)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année d’études secondaires ou Secondaire IV au Québec",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat civil 1, 2",
              "RECL 1, 2",
              "MÉ 1, 2 (qualifié)",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou diplôme de Secondaire V au Québec",
                ],
                experience: [
                  "Avoir atteint le NPC comme 00387 TECH SLA au cours des 5 dernières années",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année d’études secondaires ou Secondaire IV au Québec",
                ],
                experience: [
                  "Avoir atteint le NPC comme 00387 TECH SLA au cours des 5 dernières années",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. S'ils sont sélectionnés, les membres devront passer Test d’aptitude physique – parachutistes des Forces canadiennes à leur arrivée à l'école de Trenton. S'il n'est pas atteint, soumis à un reconditionnement physique.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "Candidat civil 1, 2",
              "RECL 1, 2",
              "MÉ 1, 2",
              "MSÉ 1, 2",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou diplôme de Secondaire V au Québec",
                ],
                experience: [
                  "Expérience / de qualifications au travail dans les domaines suivants :",
                  "• Travail avec des textiles",
                  "• Avoir travaillé avec une machine à coudre et l’avoir entretenue",
                  "• Parachutisme",
                  "• Certification d’arrimage de parachutes (FAA/CSPA)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année d’études secondaires ou Secondaire IV au Québec",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. S'ils sont sélectionnés, les membres devront passer Test d’aptitude physique – parachutistes à leur arrivée à Trenton.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "5 ans",
      },
    ],
  },
  {
    id: "00390",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "MÉDECIN SPÉCIALISTE",
    titleEn: "MEDICAL SPECIALIST",
    abbreviation: "MÉD SPÉC",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme de médecine (MD), formation spécialisée (résidence agréée) d'une discipline énumérée (Anesthésiologie, Chirurgie, Psychiatrie, Radiologie, etc.), Certification/Fellow du Collège royal, permis d’exercice canadien valide et sans restriction.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "MÉ 1, 10"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Diplôme de médecine délivré par une université canadienne agréée ou équivalences du Conseil médical du Canada (CMC),",
                  "• Achèvement d'une formation spécialisée (résidence agréée) en médecine interne, anesthésiologie, chirurgie générale, chirurgie orthopédique, psychiatrie, radiologie, physiatrie, médecine d'urgence,",
                  "• Certification et titre de fellow du Collège royal des médecins et chirurgiens du Canada dans l'une de ces spécialités,",
                  "• Permis d'exercice valide et sans restriction,",
                  "• Attestation de bonne conduite professionnelle",
                ],
                experience: [
                  "• Pour toutes les spécialités (sauf psychiatrie et physiatrie) : Être employé à temps plein dans un poste clinique au sein d’un établissement de soins de santé civil.",
                ],
              },
            ],
          },
          {
            candidates: ["RECL 1, 10, 12 (Formé comme MÉD 00393)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Diplôme de médecine agréé / CMC,",
                  "• Admission sans restriction à un programme de résidence agréé dans l'une des spécialités d'exercice,",
                  "• Certification en médecine familiale,",
                  "• Permis d'exercice valide et sans restriction,",
                  "• Attestation de bonne conduite",
                ],
                experience: [
                  "• Avoir travaillé pendant 3 ans comme Médecin militaire général (MMG)",
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
                  "• Diplôme de médecine agréé / CMC,",
                  "• Admission et inscription à un programme de résidence en spécialité d'une université canadienne,",
                  "• Attestations requises",
                ],
                experience: ["• Aucune expérience minimale requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
          "2. Un médecin formé à l'étranger fait l'objet d'une évaluation d'équivalences des Services de santé (Svcs S).",
          "3. L'enrôlement et spécialité admis dépendent directement des postes vacants.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1",
              "MÉ 1 (formé comme MÉD SPÉC 00390)",
              "RECL 1 (Qualifié dans l’une des spécialités)",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Diplôme de médecine agréé / CMC,",
                  "• Résidence complétée,",
                  "• Certification de Fellow,",
                  "• Permis d'exercice et attestation de bonne conduite",
                ],
                experience: [
                  "• Pour toutes les spécialités : Être employé à temps plein dans un poste clinique au sein d’un établissement de soins de santé civil.",
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
        program: "EDO",
        duration: "5 ans",
      },
      {
        program: "PFOS",
        duration: "12 ans",
      },
    ],
  },
  {
    id: "00394",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN DES SYSTÈMES D’INFORMATION",
    titleEn: "INFORMATION SYSTEMS TECHNICIAN",
    abbreviation: "TECH SI",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Diplôme d’études secondaires avec mathématiques de 11e / Sec V et physique (Idéal) ou 10e année / Secondaire IV avec mathématiques théoriques de Sec IV et tout cours de sciences de Sec IV (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou équivalent, comportant :",
                  "• Mathématiques appliquées de 11e année / Sec V",
                  "• Physique de 11e année / Sec V",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, comportant :",
                  "• Mathématiques théoriques, 10e année / Sec IV",
                  "• Tout cours de sciences, 10e année / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du NPC2 comme as 00362 SSCIAT – TSC3, 00362 SSCIAT-TSI3, 00394 TECH SI",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
          "3. Dans la plupart des cas, un ancien SSCIAT – SC ou SSCIAT -TSI devra combler un écart d’instruction pour obtenir la qualification TECH SI 00394. Une EFA devra être soumise.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "4 ans",
      },
    ],
  },
  {
    id: "00402",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "MATELOT",
    abbreviation: "MAT",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Diplôme d’études secondaires ou équivalent, comportant : Mathématiques appliquées de 11e année / Sec V (Idéal), ou 10e année du secondaire / Secondaire IV (Acceptable). Aucune expérience requise.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou équivalent, comportant : Mathématiques appliquées de 11e année / Sec V",
                ],
                experience: ["No minimum experience required"],
              },
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: ["No minimum experience required"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou équivalent, comportant : Mathématiques appliquées de 11e année / Sec V",
                ],
                experience: ["No minimum experience required"],
              },
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: ["No minimum experience required"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "1 an",
      },
    ],
  },
  {
    id: "00404",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN ÉLECTRICITÉ DES SYSTEMS DE MARINE",
    abbreviation: "TESM",
    requirements:
      "FORCE RÉGULIÈRE: Diplôme d’études postsecondaires en génie, en technologie du génie ou en sciences appliquées (Idéal) ou 10e année / Secondaire IV, incluant : Mathématiques appliquées, 10e année / Sec IV (Acceptable). Aucune expérience minimale requise.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études postsecondaires en génie, en technologie du génie ou en sciences appliquées",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, incluant :",
                  "o Mathématiques appliquées, 10e année / Sec IV",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIESMR 1", "Candidat civil", "RECL", "MÉ"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepted sans condition ou être présentement enrôlé comme étudiant à temps plein, dans un programme d’études à un établissement postsecondaire sélectionné par les FAC",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) dans 00404 TESM",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études postsecondaires en génie, en technologie du génie ou en sciences appliquées",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, incluant :",
                  "o Mathématiques appliquées, 10e année / Sec IV",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) dans 00404 TESM",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "4 ans",
      },
      {
        program: "PFS-MR",
        duration: "8 ans",
      },
    ],
  },
  {
    id: "00405",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN MÉCANIQUE DES SYSTÈMES DE MARINE",
    abbreviation: "TMSM",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Diplôme d’études postsecondaires en génie, en technologie du génie ou en sciences appliquées (Idéal) ou 10e année / Secondaire IV, incluant : Mathématiques appliquées, 10e année / Sec IV (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études postsecondaires en génie, en technologie du génie ou en sciences appliquées",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, incluant :",
                  "o Mathématiques appliquées, 10e année / Sec IV",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIESMR 1", "Candidat civil", "RECL", "MÉ"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition ou être présentement enrôlé comme étudiant à temps plein, dans un programme d’études à un établissement postsecondaire sélectionné par les FAC",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) dans 00405 TMSM",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études postsecondaires en génie, en technologie du génie ou en sciences appliquées",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, incluant :",
                  "o Mathématiques appliquées, 10e année / Sec IV",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) dans 00405 TMSM",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "4 ans",
      },
      {
        program: "PFS-MR",
        duration: "8 ans",
      },
    ],
  },
  {
    id: "00406",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "PROFESSIONNEL PARAMÉDICAL",
    abbreviation: "PPMD",
    requirements:
      "FORCE RÉGULIÈRE: Certificat ou diplôme dans un programme de formation en soins paramédicaux agréé ou équivalent, et Inscription en vigueur pour exercer (Idéal) avec plus de 3400h d'expérience ou (Acceptable) sans exigence minimale d'expérience pour diplômés récents (24 derniers mois).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Certificat ou diplôme dans un programme de formation en soins paramédicaux agréé ou équivalent",
                  "Inscription, permis, privilèges hospitaliers de base ou certification en vigueur pour exercer à titre de paramédical(e), délivrés par un organisme de réglementation provincial ou territorial canadien",
                ],
                experience: [
                  "Plus de 3 400 heures d’expérience professionnelle dans le domaine des soins paramédicaux primaires, avancés ou critiques",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Certificat ou diplôme dans un programme de formation en soins paramédicaux agréé ou équivalent",
                  "Inscription actuelle ou en cours, permis, privilèges hospitaliers de base ou certification",
                ],
                experience: [
                  "Diplômé(e) d’un programme agréé : Depuis plus de 24 mois, avec 1 700 heures dans un rôle de paramédical(e) en soins primaires; ou Au cours des 24 derniers mois, sans exigence minimale d’expérience",
                ],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Certificat ou diplôme dans un programme de formation en soins paramédicaux agréé ou équivalent",
                  "Inscription actuelle ou en cours, permis, privilèges hospitaliers de base ou certification",
                ],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) dans 00406 PPMD ou 00334 TECH MED",
                ],
              },
            ],
          },
          {
            candidates: ["PIESMR 1", "Candidat civil", "RECL", "MÉ"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition ou être présentement inscrit comme étudiant à temps plein dans un programme d’études approuvé d’un établissement d’enseignement postsecondaire choisi par les FAC",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "SMÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Certificat ou diplôme dans un programme de formation en soins paramédicaux agréé ou équivalent",
                  "Inscription, permis, privilèges hospitaliers de base ou certification en vigueur pour exercer",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition ou être présentement enrôlé comme étudiant à temps plein, dans un programme d’études à un établissement postsecondaire sélectionné",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "6 ans",
      },
      {
        program: "PFS-MR",
        duration: "9 ans",
      },
    ],
  },
  {
    id: "00407",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "PERSONNEL MÉDICAL AU COMBAT",
    abbreviation: "PMDC",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Diplôme d’études secondaires ou l’équivalent, incluant : Un cours de biologie ou chimie de 11e année / Sec V, et mathématiques appliquées de 10e année / Sec IV (Idéal) ou 10e année / Sec IV incluant un cours de sciences et mathématiques appliquées (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires/équivalent avec cours de biologie/chimie de Sec V (11e) et mathématiques appliquées de Sec IV (10e)",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Sec IV incluant un cours de sciences et mathématiques appliquées de niveau Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) dans l’un des GPM suivants: 00150 A MED, 00334 TECH MÉD, 00406 PPMD, 00407 PMDC",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires/équivalent avec cours de biologie/chimie de Sec V (11e) et mathématiques appliquées de Sec IV (10e)",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Sec IV incluant un cours de sciences et mathématiques appliquées de niveau Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) dans l'un des GPM requis.",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "3 ans",
      },
    ],
  }

];
