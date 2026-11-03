import { JobEntry } from "./jobs.models";

export const JOBS_OFFICER_3: JobEntry[] = [
  {
    id: "00214",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "OFFICIER DE LA POLICE MILITAIRE",
    abbreviation: "OPM",
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
                  "Baccalauréat : Justice criminelle, Criminologie, Psychologie, Sociologie, ou Administration publique",
                ],
                experience: [
                  "Au moins un an d’expérience à temps partiel ou à temps plein à une poste d’application de la loi",
                ],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : Tout diplôme"],
                experience: [
                  "Aucun casier judiciaire",
                  "Permis de conduire d’une province / d’un territoire en règle",
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
                  "N'importe quel cours universitaire de premier cycle (Baccalauréat)",
                ],
                experience: [
                  "Permis de conduire en règle",
                  "Aucun casier judiciaire",
                ],
              },
            ],
          },
          {
            candidates: ["PFUMR 1, 2", "PFOR 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Admission sans condition à un programme universitaire ou en cours de baccalauréat",
                ],
                experience: [
                  "Permis de conduire en règle",
                  "Aucun casier judiciaire",
                ],
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
                  "Qualification au grade effectif de sgt/m 2 de la F rég dans n'importe quel GPM",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC).",
          "3. Chaque candidat doit réussir le Centre d'évaluation de la Police militaire (CEPM).",
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
                  "Baccalauréat : Justice criminelle, Criminologie, Psychologie, Sociologie, etc.",
                ],
                experience: [
                  "Au moins un an d’expérience à temps partiel ou à temps plein à une poste d’application de la loi",
                ],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : Tout diplôme"],
                experience: [
                  "Aucun casier judiciaire",
                  "Permis de conduire complet",
                ],
              },
            ],
          },
          {
            candidates: ["PIRO 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à l'université ou enrôlé comme étudiant",
                ],
                experience: [
                  "Aucun casier judiciaire",
                  "Permis de conduire en règle",
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
                  "Qualification au grade effectif de sgt/m 2 de la F rés dans n'importe quel GPM",
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
        duration: "13 ans",
      },
    ],
  },
  {
    id: "00328",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "LOGISTIQUE",
    titleEn: "LOGISTICS",
    abbreviation: "LOG",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat requis (Idéal: commerce/administration, Acceptable: toute discipline).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "MÉ 1", "RECL 1", "PSAC 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat et/ou maîtrise :",
                  "• Comptabilité, Administration des affaires, Commerce, Finance, Économie, Logistique, Gestion de ressources humaines, Administration publique, Gestion de chaîne d’approvisionnement, études internationales, Relations industrielles, Gestion d’entreprise alimentaire, Alimentation, Nutrition/diététique, Chimie, Physique",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat et/ou maîtrise : Toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1", "PFUMR 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat qui répond aux normes d’entrées académiques 'idéales' pour les candidats d’ÉDO",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat dans l’un des domaines suivants :",
                  "• Baccalauréat : Anglais, Français, Histoire, Études militaires et stratégiques, Psychologie, Sciences politiques",
                  "• Baccalauréat ès sciences : Informatique, Mathématiques, Sciences spatiales, Sciences de la terre",
                  "• Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie : Génie aéronautique, Génie chimique, Génie civil, Génie informatique, Génie électrique, Génie mécanique",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOEP 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent ET Compléter un programme de baccalauréat qui répond aux normes d’entrées académiques 'idéales' pour les candidats d’ÉDO",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent ET Compléter un programme de baccalauréat dans l’un des domaines suivants :",
                  "• Baccalauréat : Anglais, Français, Histoire, Études militaires et stratégiques, Psychologie, Sciences politiques",
                  "• Baccalauréat ès sciences : Informatique, Mathématiques, Sciences spatiales, Sciences de la terre",
                  "• Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie : Génie aéronautique, Génie chimique, Génie civil, Génie informatique, Génie électrique, Génie mécanique",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Conformément au DOAD 5002-10, Programme d’intégration des officiers sortis du rang, exigences académiques",
                ],
                experience: [
                  "Les candidats doivent avoir le rang effectif de m2/sgt dans l'une des professions suivantes : 00164 CUIS, 00167 COMMIS P, 00168 TECH GEST MAT, 00169 TECH MUN, 00170 TECH MOUV, 00171 COND MMS, 00375 ADM RH, 00376 ADM SERV FIN, Conformément à la directive 00328 LOG PNSCO",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Les candidats doivent avoir le rang effectif de pm1/adjuc et ont occupé le rang de pm2 / adjum dans l'une des professions suivantes : 00164 CUIS, 00167 COMMIS P, 00168 TECH GEST MAT, 00169 TECH MUN, 00170 TECH MOUV, 00171 COND MMS, 00375 ADM RH, 00376 ADM SERV FIN",
                ],
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
            candidates: ["PEDO 1", "RECL 1", "MÉ 1", "MSÉ 1", "PSAC 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat et/ou maîtrise :",
                  "• Comptabilité, Administration des affaires, Commerce, Finance, Économie, Logistique, Gestion de ressources humaines, Administration publique, Gestion de chaîne d’approvisionnement, études internationales, Relations industrielles, Gestion d’entreprise alimentaire, Alimentation, Nutrition/diététique, Chimie, Physique",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat et/ou maîtrise : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIRO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Inscription à temps plein, à temps partiel ou par apprentissage à distance dans un programme de baccalauréat dans un établissement d’enseignement postsecondaire en vue de l’obtention d’un baccalauréat 2 dans le domaine suivant :",
                  "• Comptabilité, Administration des affaires, Commerce, Finance, Économie, Logistique, Gestion de ressources humaines, Administration publique, Gestion de chaîne d’approvisionnement, Relations industrielles, Gestion d’entreprise alimentaire, Alimentation, Nutrition/diététique, Chimie, Physique, Anglais, Français, Histoire, Études militaires et stratégiques, Psychologie, Sciences politiques, Informatique, Mathématiques, Sciences spatiales",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Conformément au DOAD 5002-10, Programme d’intégration des officiers sortis du rang, exigences académiques",
                ],
                experience: [
                  "Les candidats doivent avoir le rang effectif de m2/sgt dans l'une des professions suivantes : 00164 CUIS, 00167 COMMIS P, 00168 TECH GEST MAT, 00169 TECH MUN, 00170 TECH MOUV, 00171 COND MMS, 00375 ADM RH, 00376 ADM SERV FIN, Conformément à la directive 00328 LOG PNSCO",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Les candidats doivent avoir le rang effectif de pm1/ adjuc et ont occupé le rang de pm2/ adjum dans l'une des professions suivantes : 00164 CUIS, 00167 COMMIS P, 00168 TECH GEST MAT, 00169 TECH MUN, 00170 TECH MOUV, 00171 COND MMS, 00375 ADM RH, 00376 ADM SERV FIN",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Pour les candidats du Québec, cela comprend l'inscription à un programme CÉGEP préuniversitaire approprié conformément au DOAD 5002-8, Programme d intégration à la Réserve – Officiers (PIRO).",
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
    id: "00340",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "GÉNIE ÉLECTRONIQUE ET DES COMMUNICATIONS",
    titleEn: "ELECTRONICS AND COMMUNICATIONS ENGINEERING",
    abbreviation: "GE COMM",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat requis (Idéal: ingénierie/informatique/physique, Acceptable: sciences de la terre/mathématiques/chimie).",
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
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie : Communications, Informatique, Systèmes informatiques, Électrique, Logiciel, Systèmes logiciels, Physique.",
                  "• Baccalauréat en science (BSc) : Science de l’information en informatique, Systèmes d’information en informatique, Science informatique, Gestion de l’information, Science de l’information, Systèmes d’information, Technologie de l’information",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie : toute discipline.",
                  "• Baccalauréat en science (BSc) : Mathématiques appliquées, Mathématiques, Mathématiques et Physique, Physique, Chimie, Sciences spatiales, Sciences de la terre",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1", "UTPNCM 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat dans l'un des domaines admissibles spécifiés pour GE COMM.",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOEP 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent ET (Diplôme de technologie dans un domaine du génie décerné par un collège communautaire ou un institut technique agréé OR Au moins deux années complètes d’un baccalauréat en ingénierie ou baccalauréat en sciences appliquées (BScA) en ingénierie / Baccalauréat en science (BSc) dans les domaines admissibles pour GE COMM)",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Conformément au DOAD 5002-10, Programme d’intégration des officiers sortis du rang, exigences académiques",
                ],
                experience: [
                  "Être qualifié au grade effectif de m2/sgt dans l’un des GPM suivants : 00120 CH COMM, 00109 TECH SITA, 00362 SSCIAT, 00378 CYBEROPERATEUR, 00394 TECH SI, 00385 TECH TRANS, 00383 OP TRANS, 00384 SL. Conformément à la directive 00340 GE COMM PNSCO",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Les candidats doivent occuper le rang effectif de 00381 pm1/Adjuc et avoir détenu le rang de pm2/Adjum dans l'une des occupations suivantes : 00394 TECH SI, 00385 TECH TRANS, 00362 SSCIAT, 00120 CH COMM, 00378 CYBER OPERATEUR, 00109 TECH SITA, 00383 OP TRANS, 00384 SL.",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. When applicable, applicants are required to meet the minimum cut-off score on the Canadian Forces Aptitude Test (CFAT) for the related programme.",
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
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie : Communications, Informatique, Systèmes informatiques, Électricité, Logiciel, Systèmes logiciels.",
                  "• Baccalauréat en science (BSc) : Science de l’information en informatique, Systèmes d’information en informatique, Science informatique, Gestion de l’information, Science de l’information, Systèmes d’information, Technologie de l’information, Physique",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie : toute discipline.",
                  "• Baccalauréat en science (BSc) : Mathématiques appliquées, Mathématiques, Mathématiques et Physique, Physique, Chimie, Sciences spatiales, Sciences de la terre",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Exigence Critique 2",
                education: ["Baccalauréat : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIRO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Inscription à temps plein, à temps partiel ou par apprentissage à distance dans un programme de baccalauréat dans un établissement d’enseignement postsecondaire en vue de l’obtention d’un baccalauréat 3 dans l’un des domaines d'études admissibles spécifiés pour GE COMM / Baccalauréat en ingénierie (BIng), baccalauréat en sciences appliquées (BScA) ou Baccalauréat en science (BSc)",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Exigence Critique 2",
                education: [
                  "Enrôlement comme étudiant à temps plein au premier cycle dans le programme d'un établissement postsecondaire canadien menant à un Baccalauréat 3 : toute discipline",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Conformément au DOAD 5002-10, Programme d’intégration des officiers sortis du rang, exigences académiques",
                ],
                experience: [
                  "Être qualifié au grade effectif de m2/sgt dans l’un des GPM suivants : 00120 CH COMM, 00109 TECH SITA, 00362 SSCIAT, 00378 CYBEROPERATEUR, 00394 TECH SI, 00385 TECH TRANS, 00383 OP TRANS, 00384 SL",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Les candidats doivent occuper le rang effectif de 00381 pm1/Adjuc et avoir détenu le rang de pm2/Adjum dans l'une des occupations suivantes : 00394 TECH SI, 00385 TECH TRANS, 00362 SSCIAT, 00120 CH COMM, 00378 CYBER OPERATEUR, 00109 TECH SITA, 00383 OP TRANS, 00384 SL.",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Une unité éprouvant un besoin critique en personnel doit envoyer une justification à l’autorité chargée de l’enrôlement, tel que stipulé dans la DOAD 5002-1 (p. ex., un officier exerçant les pouvoirs de cmdt de commandement ou de formation).",
          "3. Dans le cas des candidats du Québec, ces exigences comprennent un enrôlement dans un programme CEGEP préuniversitaire, conformément au message CANFORGEN 023/13, Programme d’intégration à la Réserve – Officiers (PIRO).",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "9 ans",
      },
      {
        program: "PFOR",
        duration: "13 ans",
      },
    ],
  },
  {
    id: "00341",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "TRANSMISSIONS",
    titleEn: "SIGNALS",
    abbreviation: "TRANS",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat requis (Idéal: ingénierie/informatique, Acceptable: sciences/général).",
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
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat ès sciences appliquées (BScA) : Communications, Informatique, Ordinateurs, Électrique, Systèmes logiciels.",
                  "• Baccalauréat : Sciences de l'informatique, Systèmes informatiques, Science informatique, Gestion de l'information, Science de l'information, Technologie de l'information",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat ès sciences appliquées (BScA) : toute discipline.",
                  "• Baccalauréat : Mathématiques appliquées, Chimie, Imagerie, Mathématiques, Mathématiques et physique, Physique, Sciences de l'espace, Sciences de la Terre, Baccalauréat général 2",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1", "PFUMR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat dans l'un des domaines admissibles spécifiés pour TRANS.",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFOEP 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent ET (Diplôme de technologie dans un domaine du génie à un collège ou une institution technique accréditée OR Au moins deux ans de crédits d’études dans un baccalauréat dans l’un des génies suivants : Communications, Informatique, Électricité, Systèmes de logiciels)",
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
                  "Conformément au DOAD 5002-10, Programme d’intégration des officiers sortis du rang, exigences académiques",
                ],
                experience: [
                  "Détenir au minimum le grade effectif de sgt dans l’un des occupations suivantes : 00394 TECH SI, 00385 TECH TRANS, 00362 SSCIAT, 00120 CH COMM, 00378 CYBEROPERATEUR, 00109 TECH SITA, 00383 OP TRANS, 00384 SL. Conformément à la directive 00341 TRANS PNSCO",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Les candidats doivent occuper le rang effectif de 00381 Adjuc et avoir détenu le rang de Adjum dans l'une des occupations suivantes : 00394 TECH SI, 00385 TECH TRANS, 00362 SSCIAT, 00120 CH COMM, 00378 CYBEROPERATEUR, 00109 TECH SITA, 00383 OP TRANS, 00384 SL.",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Un baccalauréat général en sciences doit comporter au moins 75 % de cours en physique, chimie et/ou en mathématiques, le 25 % restant étant axé dans n’importe quel autre domaine.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "PSAC 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat ès sciences appliquées (BScA) : Communications, Informatique, Ordinateurs, Électrique, Systèmes logiciels.",
                  "• Baccalauréat : Sciences de l'informatique, Systèmes informatiques, Science informatique, Gestion de l'information, Science de l'information, Technologie de l'information",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat ès sciences appliquées (BScA) : toute discipline.",
                  "• Baccalauréat : Mathématiques appliquées, Chimie, Imagerie, Mathématiques, Mathématiques et physique, Physique, Sciences de l'espace, Sciences de la Terre, Baccalauréat général 2",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Exigence Critique 3",
                education: ["Baccalauréat : toute discipline"],
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
                  "Inscription à temps plein, à temps partiel ou par apprentissage à distance dans un programme de baccalauréat dans un établissement d’enseignement postsecondaire en vue de l’obtention d’un baccalauréat 4 dans l’un des domaines d'études admissibles spécifiés pour TRANS",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Exigence Critique 3",
                education: [
                  "Inscription à temps plein, à temps partiel ou par apprentissage à distance dans un programme de baccalauréat dans un établissement d’enseignement postsecondaire en vue de l’obtention d’un baccalauréat 4 dans n'importe quelle discipline",
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
                  "Conformément au DOAD 5002-10, Programme d’intégration des officiels sortis du rang, exigences académiques",
                ],
                experience: [
                  "Détenir au minimum le grade effectif de sgt dans l’un des occupations suivantes : 00120 CH COMM, 00378 CYBER OPERATEUR, 00362 SSCIAT, 00109 TECH SITA, 00394 TECH SI, 00385 TECH TRANS, 00383 OP TRANS, 00384 PL",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Un baccalauréat général en sciences doit comporter au moins 75 % de cours en physique, chimie et/ou en mathématiques, le 25 % restant étant axé dans n’importe quel autre domaine.",
          "3. Une unité éprouvant un besoin critique en personnel doit envoyer une justification à l’autorité chargée de l’enrôlement, tel que stipulé dans la DOAD 5002-1 (p. ex., un officier exerçant les pouvoirs de cmdt de commandement ou de formation).",
          "4. Dans le cas des candidats du Québec, ces exigences comprennent un enrôlement dans un programme CEGEP préuniversitaire, conformément au message CANFORGEN 023/13, Programme d’intégration à la Réserve – Officiers (PIRO).",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "9 ans",
      },
      {
        program: "PFOR",
        duration: "13 ans",
      },
    ],
  },
  {
    id: "00344",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "GÉNIE DES SYSTÈMES DE COMBAT NAVAL",
    titleEn: "NAVAL COMBAT SYSTEMS ENGINEERING",
    abbreviation: "GSCN",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat requis (Idéal: génie électrique/informatique/logiciel, Acceptable: sciences/toute autre discipline).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["ÉDO 1", "RECL 1", "MÉ 1", "PSAC 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "• Diplôme de maîtrise en génie ou en sciences appliquées dans l'une des disciplines admissibles spécifiées,",
                  "• Baccalauréat en génie (B.Ing) ou baccalauréat en sciences appliquées (B.Sc.A) : Électrique, Informatique, Logiciel, Cyber systèmes",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "• Baccalauréat en génie (B.Ing) ou baccalauréat en sciences appliquées (B.Sc.A) : Aéronautique, Aérospatial, Architecture navale, Chimique, Civil, Communications, Industriel, Physique technique, Systèmes électroniques, Matériaux, Maritime, Mécanique, Métallurgique, Nucléaire.",
                  "• Baccalauréat ès sciences : Données, Espace, Informatique, Mathématiques, Physiques.",
                  "• Baccalauréat en technologies de l'information.",
                  "• Baccalauréat de technologie (Technique du génie et sciences appliquées) par la <<Fisheries and Marine Institute of Memorial University>> de Terre-Neuve 2 (avec NPC3 atteint)",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable (qualifié)",
                education: ["Baccalauréat : toute discipline"],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC) 3 pour GSCN 00344, ou dans un GPM de la F rég ou la P rés des FAC",
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
                  "• Avoir terminé au moins deux cours d’un an au niveau universitaire ou l’équivalent,",
                  "• Obtenir une admission inconditionnelle dans un programme de baccalauréat qui répond aux normes d’entrées académiques 'idéales' ou 'acceptables' pour les candidats d’ÉDO non-qualifiés",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Obtenir une admission inconditionnelle dans un programme de baccalauréat 2 qui répond aux normes d’entrées académiques 'idéales' ou 'acceptables' pour les candidats d’ÉDO non-qualifiés",
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
                  "Certificat d’études secondaires ou l’équivalent, OU Diplôme ou baccalauréat équivalent à au moins deux ans d’études supérieures à temps plein, Conformément au DOAD 5002-10, exigences académiques",
                ],
                experience: [
                  "Les candidats doivent occuper un rang effectif de m2 ou supérieur dans l'une des occupations suivantes : 00366 TECH GA, 00379 TECH MAR",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV ou équivalent"],
                experience: [
                  "Les candidats doivent occuper le rang effectif de pm1 et avoir détenu le rang de pm2 dans l'une des occupations suivantes : 00366 TECH GA, 00379 TECH MAR",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Baccalauréat de technologie (Technique du génie et sciences appliquées) par la <<Fisheries and Marine Institute of Memorial University>> de Terre-Neuve n’est pas admissible sous le PFOR.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["ÉDO 1", "RECL 1", "MÉ 1", "MSÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC) 2 pour GSCN 00344",
                ],
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
        duration: "8 ans",
      },
      {
        program: "PFOR",
        duration: "12 ans",
      },
    ],
  },
  {
    id: "00345",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "OFFICIER DU GÉNIE DES SYSTÈMES DE MARINE",
    titleEn: "MARINE SYSTEMS ENGINEERING OFFICER",
    abbreviation: "OGSM",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat requis (Idéal: génie marine/mécanique, Acceptable: sciences/autres génies).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "• Maîtrise académique en ingénierie ou en sciences appliquées dans la même discipline,",
                  "• Baccalauréat en technologie – Sciences nautiques de l'Université du Cap-Breton,",
                  "• Baccalauréat en génie ou baccalauréat en sciences appliquées (B.Sc.A) : Marine, Mécanique, Architecture navale",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "• Baccalauréat en génie ou baccalauréat en sciences appliquées (B.Sc.A) dans l’un des domaines suivants : Aéronautique, Aérospatial, Chimique, Génie civil, Génie de l'environnement, Génie des systèmes électriques, Génie des systèmes électroniques, Génie Électrique, Génie Physique, Génie Informatique, Industriel, Logiciel, Matériels, Métallurgique, Nucléaire.",
                  "• Baccalauréat ès sciences : Informatiques, Mathématiques, Physiques, Espace.",
                  "• Baccalaureate of Technology (Engineering Technology and Applied Science) par la <<Fisheries and Marine Institute of Memorial University>> de Terre-Neuve (avec NPC3 atteint)",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable (qualifié)",
                education: ["Baccalauréat : toute discipline"],
                experience: [
                  "Atteint le niveau professionnel de compétence (NPC) 3 pour OGSM 00345, ou dans un GPM de la F rég ou la P rés des FAC",
                ],
              },
            ],
          },
          {
            candidates: ["PFUMR 1, 4"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Avoir terminé au moins deux cours d’un an au niveau universitaire ou l’équivalent,",
                  "• Obtenir une admission inconditionnelle dans un programme de baccalauréat qui répond aux normes d’entrées académiques 'idéales' ou 'acceptables' pour les candidats d’EDO non-qualifiés",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Obtenir une admission inconditionnelle dans un programme de baccalauréat 2 qui répond aux normes d’entrées académiques 'idéales' ou 'acceptables' pour les candidats d’EDO non-qualifiés",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1, 4"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Certificat d’études secondaires ou l’équivalent, OU Diplôme ou baccalauréat équivalent à au moins deux ans d’études supérieures à temps plein, Conformément au DOAD 5002-10, exigences académiques",
                ],
                experience: [
                  "Les candidats doivent occuper un rang effectif de m2 ou supérieur dans l'une des occupations suivantes : 00326 TECH EPPE, 00379 TECH MAR",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV ou équivalent"],
                experience: [
                  "Les candidats doivent occuper le rang effectif de pm1 et avoir détenu le rang de pm2 dans l'une des occupations suivantes : 00366 TECH GA, 00379 TECH MAR",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Lorsque l'occupation est projetée comme étant « rouge/exigence » en raison du rapport prévisionnel d'un an (EQA à EQR) basé sur le modèle de planification à long terme (MPLT) de DBPP 5.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "MSÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: [
                  "Atteint le niveau professionnel de compétence (NPC) 2 pour OGSM 00345",
                ],
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
        duration: "8 ans",
      },
      {
        program: "PFOR",
        duration: "12 ans",
      },
    ],
  },
  {
    id: "00370",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN DESSIN ET EN ARPENTAGE",
    titleEn: "DRAFTING AND SURVEYING TECHNICIAN",
    abbreviation: "TECH DA",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE LA RÉSERVE: Diplôme d’études secondaires ou cert. technicien agréé en technologie civile (Idéal) ou 11e année / Secondaire V avec mathématiques de 11e (Acceptable).",
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
                  "• Math appliquées de 11e / Sec V",
                ],
                experience: [
                  "Détenir une qualification dans au moins un des domaines/groupes professionnels civils suivants :",
                  "• Technicien en dessin assisté par ordinateur (CAD)",
                  "• Dessinateur, Technicien en dessin, Technologue de dessin",
                  "• Technologue en arpentage, Technicien en levés topographiques",
                  "• Technologue en levés géographiques, Arpenteur-géomètre, Technicien en arpentage",
                  "OU avoir atteint du niveau professionnel de compétence (NPC) 3 dans l’un des groupes professionnels militaires (GPM) suivants :",
                  "• 00238 TECH GÉO dans la F rég ou la P rés",
                  "• 00306 TECH CONST dans la F rég ou la P rés",
                  "• 00368 GNR dans la F rég ou la P rés",
                ],
              },
              {
                level: "Idéal (Technicien agréé)",
                education: [
                  "Détenir un certificat de Technicien agréé en tant que technologue civil 3",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "11e année / Secondaire V, comportant :",
                  "• Mathématiques appliquées de 11e / Sec V",
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
                  "Avoir atteint le NPC3 de 00370 TECH DA dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: ["11e année / Secondaire V"],
                experience: [
                  "Avoir atteint le NPC3 de 00370 TECH DA dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. On trouve plus d’informations sur la désignation de technicien diplômé au site Web du Conseil canadien des techniciens et technologues : Conseil canadien des techniciens et technologues (cctt.ca).",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
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
    id: "00389",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "OFFICIER DES OPÉRATIONS AÉRIENNES",
    titleEn: "AIR OPERATIONS OFFICER",
    abbreviation: "O OPS AIR",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Maîtrise académique (Idéal) ou Baccalauréat dans n'importe quel domaine (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "PSAC 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Maîtrise académique en : n'importe lequel"],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : n'importe lequel"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat dans l'un des domaines suivants : n'importe lequel",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFUMR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Avoir terminé au moins deux cours d’un an au niveau universitaire ou l’équivalent (p. ex. quatre cours d’un semestre)",
                  "ET Être accepté sans condition à un programme d'étude menant à l'obtention d'un baccalauréat (n'importe lequel)",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOEP 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent",
                  "ET Compléter un programme de baccalauréat (n'importe lequel)",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent",
                  "OU Diplôme ou baccalauréat représentant au moins deux ans d'études universitaires à plein temps",
                ],
                experience: [
                  "Détenir le grade effectif de M2/Sgt ou plus dans le groupe professionnel :",
                  "• 00337 OP CA",
                  "• 00019 OP DEA",
                  "• 00021 MÉC B",
                  "• 00101 TECH SAR",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Détenir le grade effectif de PM1/Adjuc et détenir le grade d'Adjum en :",
                  "• 00337 OP CA",
                  "• 00019 OP DEA",
                  "• 00021 MÉC B",
                  "• 00101 TECH SAR",
                ],
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
            candidates: ["EDO 1", "PSAC 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Maîtrise académique en : n'importe lequel"],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : n'importe lequel"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIRO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat (n'importe lequel)",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIOSR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent",
                  "OU Diplôme ou baccalauréat représentant au moins deux ans d'études universitaires à plein temps",
                ],
                experience: [
                  "Détenir le grade effectif de M2/Sgt ou plus dans le groupe professionnel :",
                  "• 00337 OP CA",
                  "• 00019 OP DEA",
                  "• 00021 MÉC B",
                  "• 00101 TECH SAR",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO 1"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Détenir le grade effectif de PM1/Adjuc et détenir le grade d'Adjum en :",
                  "• 00337 OP CA",
                  "• 00019 OP DEA",
                  "• 00021 MÉC B",
                  "• 00101 TECH SAR",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Pour les candidats du Québec, cela comprend l'inscription à un programme CÉGEP préuniversitaire approprié conformément au DOAD 5002-8, PIRO.",
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
    id: "00393",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "MÉDECIN MILITAIRE",
    titleEn: "MEDICAL OFFICER",
    abbreviation: "MÉD",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme en médecine (MD) agréé, autorisation d’exercer la médecine en règle et sans restriction (Médecin de famille ou Urgentologue), certification en médecine familiale (CMFC / CMFC-MU).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1 (Médecin de famille)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Diplôme en médecine agréé ou équivalent CMC,",
                  "• Autorisation d'exercer la médecine de famille,",
                  "• Certification en médecine familiale du Collège des médecins de famille du Canada",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "EDO 1",
              "RECL 1",
              "MÉ 1 (Médecin d’urgence agréé par le CMFC)",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Diplôme en médecine agréé ou équivalent CMC,",
                  "• Autorisation d'exercer la médecine d'urgence,",
                  "• Certification en médecine familiale et compétences supplémentaires en médecine d'urgence",
                ],
                experience: [
                  "Aucune expérience requise",
                  "Exigence d'affectation au service des urgences",
                ],
              },
            ],
          },
          {
            candidates: ["PFOS 1, 9"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être présentement inscrit à temps plein ou accepté à une école de médecine ou résidence en médecine familiale au Canada",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC), mais sont exemptés si diplôme de premier cycle.",
          "2. Les médecins formés à l'étranger font l'objet d'une évaluation d'équivalences d'autorisation par les Svc San.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1 (Médecin de famille)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Diplôme en médecine agréé ou équivalent CMC,",
                  "• Autorisation d'exercer sans restriction,",
                  "• Certificat en médecine de famille",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1 (Médecin d’urgence)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Diplôme en médecine agréé ou équivalent CMC,",
                  "• Autorisation d'exercer,",
                  "• Certification en médecine de famille et Certificat de compétences en urgence",
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
                  "Être inscrit à temps plein en médecine familiale dans une université agréée ou être accepté à une école de médecine",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: ["1. Même norme applicable."],
      },
    ],
    contracts: [
      {
        program: "EDO",
        duration: "5 ans",
      },
      {
        program: "PMEM/PFOS",
        duration: "12 ans",
      },
    ],
  },
  {
    id: "00398",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "GESTION DES SERVICES DE SANTÉ",
    abbreviation: "GSS",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Maîtrise en gestion des services de santé/administration des affaires/publique/GRH (Idéal) ou Baccalauréat dans un de ces domaines ou disciplines connexes en santé (Acceptable).",
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
                  "Maîtrise : Gestion des services de santé, Administration des soins de santé, Administration de la santé, Gestion des soins de santé, Administration des affaires, Administration publique ou Gestion des ressources humaines",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Diplôme de baccalauréat : Gestion des services de santé, Administration des soins de santé, Administration de la santé, Gestion des soins de santé, Administration des affaires, Administration publique ou Gestion des ressources humaines",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat ou diplôme d’études supérieures dans une discipline des sciences de la santé",
                ],
                experience: [
                  "Un minimum de deux années d’expérience cumulative en gestion à temps plein au cours des cinq dernières années dans un milieu de soins de santé",
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
        duration: "10 ans",
      },
      {
        program: "PFOR",
        duration: "14 ans",
      },
    ],
  },
  {
    id: "00410",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "OFFICIER DE LA SANTÉ PUBLIQUE",
    titleEn: "Public Health Officer",
    abbreviation: "OSP",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: Maîtrise en santé publique, épidémiologie ou santé communautaire (Idéal) ou Baccalauréat en sciences de la santé ou domaine connexe (Acceptable).",
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
                  "Maîtrise : Santé publique, Épidémiologie, Santé environnementale, Santé communautaire ou équivalent",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat : Sciences de la santé, Sciences infirmières, Sciences biomédicales ou domaine connexe avec concentration en santé publique",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat ou études universitaires en sciences de la santé ou domaine connexe (Université civile)",
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
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "10 ans",
      },
      {
        program: "PFOR",
        duration: "13 ans",
      },
    ],
  }
];

