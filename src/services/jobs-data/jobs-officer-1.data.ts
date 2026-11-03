import { JobEntry } from "./jobs.models";

export const JOBS_OFFICER_1: JobEntry[] = [
  {
    id: "00178",
    medicalStandard: { v: 3, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "BLINDÉS",
    abbreviation: "BLINDÉS",
    requirements: "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat : toute discipline.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "PSAC1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Maîtrise académique en : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1", "PFUMR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
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
                  "ET",
                  "Compléter un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
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
                  "Détenir au minimum le grade effectif de sgt dans l’un des occupations suivantes : o 00005 MR BLINDES o Conformément à la directive 00178 BLINDES PNSCO",
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
                  "Les candidats doivent détenir le grade effectif de 00381 Adjuc et détenir le grade d'Adjum comme 00005 MR BLINDES",
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
            candidates: ["EDO 1", "PSAC 1", "RECL 1", "MÉ1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Maîtrise académique en : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
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
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat 2 : toute discipline",
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
                  "Les candidats doivent détenir le grade effectif de sgt ou plus dans le GPM 00005 MR BLINDÉS",
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
                  "Les candidats doivent détenir le grade effectif de 00381 Adjuc et détenir le grade d'Adjum comme 00005 MR BLINDES",
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
        duration: "9 ans",
      },
      {
        program: "PFOR",
        duration: "13 ans",
      },
    ],
  },
  {
    id: "00179",
    medicalStandard: { v: 3, cv: 3, h: 2, g: 2, o: 2, a: 5, u: 5 },
    title: "ARTILLERIE",
    abbreviation: "ARTIL",
    requirements: "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat : toute discipline.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "PSAC1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Maîtrise académique en : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1", "PFUMR1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
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
                  "ET",
                  "Compléter un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
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
                  "Détenir au minimum le grade effectif de sgt dans l’un des occupations suivantes : o 00368 ARTIL o Conformément à la directive 00179 ARTIL PNSCO",
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
                  "Les candidats doivent détenir le grade effectif de 00381 Adjuc et détenir le grade d'Adjum comme 00368 ARTIL",
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
            candidates: ["EDO 1", "PSAC 1", "RECL 1", "MÉ1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Maîtrise académique en : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
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
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat 2 : toute discipline",
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
                  "Détenir au minimum le grade effectif de sgt dans l’un des occupations suivantes : o 00368 ARTIL o Conformément à la directive 00179 ARTIL PNSCO",
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
                  "Les candidats doivent détenir le grade effectif de 00381 Adjuc et détenir le grade d'Adjum comme 00368 ARTIL",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Pour les candidats du Québec, cela comprend l’enrôlement dans un programme pré-universitaire approprié du CÉGEP conforme à la DOAD 5002-8 PIRO.",
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
    id: "00180",
    medicalStandard: { v: 3, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "OFFICIER D’INFANTERIE",
    abbreviation: "O INF",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat : Tout baccalauréat ès arts (général) ou en sciences (général) de trois ans / 90 heures de crédit.",
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
                  "Tout baccalauréat ès sciences, génie, ou arts de quatre ans / 120 heures de crédit avec une majeure déclarée en : o ingénierie (BIng) o sciences appliquées (BScA) o sciences domaine o arts domaine",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat : o Tout baccalauréat ès arts (général) ou en sciences (général) de trois ans / 90 heures de crédit",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1", "PFUMR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être admis sans condition à un programme d'études de premier cycle dans l’une des disciplines suivantes : o ingénierie (BIng) o sciences appliquées (BScA) o sciences domaine o arts domaine",
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
                  "ET",
                  "Compléter un programme de baccalauréat dans l’un des domaines selon la liste Idéal/Acceptable pour les candidats EDO",
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
                  "Les candidats doivent détenir le grade effectif de Sgt ou supérieur dans l’une des occupations suivantes : o 00010 FANT o 00357 OP CBRN o 00369 SF OP o 00382 CBT FIS o Conformément à la directive 00180 O INF PNSCO",
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
                  "Les candidats doivent détenir le grade effectif d'Adjuc (00381) et avoir déjà détenu le grade d'Adjum en tant que GPM 00010 FANT",
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
            candidates: ["EDO 1", "PSAC 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Tout baccalauréat ès sciences, génie, ou arts de quatre ans / 120 heures de crédit avec une majeure déclarée en : o ingénierie (BIng) o sciences appliquées (BScA) o sciences domaine o arts domaine",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat : o Tout baccalauréat ès arts (général) ou en sciences (général) de trois ans / 90 heures de crédit",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PIRO 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat 2 : o ingénierie (BIng) o sciences appliquées (BScA) o sciences domaine o arts domaine",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat 2 : Baccalauréat : o Toute discipline",
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
                  "Les candidats doivent détenir le grade effectif de Sgt ou supérieur dans l’une des occupations suivantes : o 00010 FANT o 00357 OP CBRN o 00369 SF OP o 00382 CBT FIS",
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
        duration: "9 ans",
      },
      {
        program: "PFOR",
        duration: "13 ans",
      },
    ],
  },
  {
    id: "00181",
    medicalStandard: { v: 3, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "GÉNIE",
    abbreviation: "GÉNIE",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat ès sciences : Mathématiques appliquées, Sciences appliquées / générales, Chimie, Science Informatique, Sciences environnementales, Mathématiques, Mathématiques et physique, Physique, Sciences spatiales, Sciences de la terre.",
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
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) dans l’un des domaines suivants : o civil o environnemental o géomatique",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie dans l’un des domaines suivants : o Aérospatiale / Aéronautique o Chimie o Informatique / Systèmes Informatique o Électricité o Énergie o Physique o Géologie o Industriel o Matériaux o Mécanique o Minier o Bâtiment",
                  "OU",
                  "Baccalauréat ès sciences : o Mathématiques appliquées o Sciences appliquées / générales 2 o Chimie o Science Informatique o Sciences environnementales o Mathématiques o Mathématiques et physique o Physique o Sciences spatiales o Sciences de la terre",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFOR 1", "PFUMR1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  'Obtenir une admission inconditionnelle dans un programme de baccalauréat qui répond aux normes d’entrées académiques "idéales" ou "acceptables" pour les candidats d’ÉDO',
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
                  "Diplôme d’études secondaires ou l’équivalent",
                  "ET",
                  "Diplôme en technologie du domaine du génie à un collège communautaire ou d’un institut de technologie reconnu",
                  "OU",
                  "Au moins deux ans de crédits d’études dans un programme de baccalauréat dans premier cycle de la liste Idéal/Acceptable pour les candidats EDO",
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
                  "Détenir au minimum le grade effectif de sgt dans l’un des occupations suivantes : o 00339 SAP CBT o Conformément à la directive 00339 SAP CBT PNSCO",
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
                  "Les candidats doivent détenir le grade effectif de 00381 Adjuc et détenir le grade d'Adjum comme 00339 SAP CBT",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Les diplômes en sciences générales et appliquées doivent comporter un curriculum d’environ 75% de physique et de mathématiques, le reste (25 %) étant axé dans n’importe quel autre domaine.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie: o Toute discipline",
                  "Baccalaureate ès sciences4 : o Toute discipline",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : o Toute discipline"],
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
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat3 :",
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie : o Civil o Environnement o Géomatique o Aérospatiale / Aéronautique o Chimie o Informatique / Systèmes Informatiques o Électricité o Énergie o Physique o Géologie o Industriel o Matériaux o Mécanique o Minier o Bâtiment",
                  "OU",
                  "Baccalauréat ès sciences: o Mathématiques appliquées o Sciences appliquées / générales 2 o Chimie o Science Informatique o Sciences environnementales o Math o Math et physique o Physique o Sciences spatiales o Sciences de la terre",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIRO 1 (Exigence Critique 4)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Enrôlé à titre d’étudiant à temps plein, à temps partiel dans un établissement d’enseignement postsecondaire canadien à un programme menant à l’un des diplômes suivants 3 : Baccalauréat : o Toute discipline",
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
                  "Détenir au minimum le grade effectif de sgt dans l’un des occupations suivantes : o 00339 SAP CBT",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Les diplômes en sciences générales...",
          "3. Pour les candidats du Québec, cela comprend l'inscription à un programme CÉGEP...",
          "4. Une unité de la P rés qui éprouve un besoin urgent en personnel doit fournir une justification...",
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
    id: "00182",
    medicalStandard: { v: 3, cv: 2, h: 2, g: 2, o: 2, a: 2, u: 5 },
    title: "OFFICIER – SYSTÈMES DE COMBAT",
    abbreviation: "OSCA",
    requirements: "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat : toute discipline.",
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
                education: ["Maîtrise universitaire en : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["EDO 1, 2", "RECL 1, 2", "MÉ 1, 2", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: [
                  "Avoir atteint le niveau professionnel de compétence (NPC) en tant que OSCA 00182 dans la F rég 4",
                ],
              },
            ],
          },
          {
            candidates: ["PFOR 1, 2, 3, 6"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFUMR 1, 2, 3, 6"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Avoir terminé au moins deux cours d’un an au niveau universitaire ou l’équivalent (p. ex. quatre cours d’un semestre)",
                  "ET",
                  "Être accepté sans condition à un programme d’étude menant à l’obtention d’un baccalauréat dans l’un des domaines suivants: toute discipline",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOEP 1, 2, 3, 6"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent",
                  "ET",
                  "Compléter un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
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
                  "Diplôme d’études secondaires ou l’équivalent",
                  "OU",
                  "Diplôme ou baccalauréat représentant au moins deux ans d’études universitaires à plein temps 5",
                ],
                experience: [
                  "Les candidats doivent détenir le grade effectif de Sgt ou supérieur dans le GPM 00019 OP DÉA",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO1, 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Les candidats doivent détenir le grade effectif d'Adjuc et avoir déjà détenu le grade d'Adjum en tant que GPM 00019 OP DÉA",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Tous les candidats doivent conformément aux prescriptions de l'annexe E de la PFC 154",
          "3. Tous les candidats doivent réussir le processus de sélection pour 00182 OSCA au CFACSC 8 Escadre Trenton.",
          "4. Le niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "5. Consulter la DOAD 5002-10, paragr. 3.5 (a, b) pour connaître les exigences relatives à la scolarité.",
          "6. Tout programme qui comprend des éléments non académiques qui ne sont pas directement liés au programme d’études ou qui sont requis pour obtenir un permis ou une certification professionnelle pour atteindre le NPC n’est pas autorisé.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1, 2", "RECL 1, 2", "MÉ 1, 2", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: [
                  "Avoir atteint le niveau professionnel de compétence (NPC) en tant que OSCA 00182 dans la F rég 4",
                ],
              },
            ],
          },
          {
            candidates: ["PIRO1, 2 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat 3 : toute discipline",
                ],
                experience: [
                  "Avoir atteint le niveau professionnel de compétence (NPC) en tant que OSCA 00182 dans la F rég 4",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Tous les candidats doivent conformément aux prescriptions de l'annexe E de la PFC 154",
          "3. Pour les candidats du Québec, cela comprend l'inscription à un programme CÉGEP préuniversitaire approprié conformément au DOAD 5002-8, Programme d intégration à la Réserve – Officiers (PIRO).",
          "4. Le niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
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
        duration: "12 ans",
      },
    ],
  },
  {
    id: "00183",
    medicalStandard: { v: 2, cv: 2, h: 2, g: 2, o: 2, a: 1, u: 5 },
    title: "PILOTE",
    abbreviation: "PIL",
    requirements: "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat : toute discipline.",
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
                education: ["Maîtrise universitaire en : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: [
              "EDO 1, 2, 3",
              "RECL 1, 2, 3",
              "MÉ 1, 2, 3",
              "(qualifié)",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: [
                  "Avoir atteint le niveau opérationnel de compétence (NPC) 4 en tant que Pilote 00183 dans la F rég",
                ],
              },
            ],
          },
          {
            candidates: ["PFOR 1, 2, 3, 5"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFUMR 1, 2, 3, 5"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Avoir terminé au moins deux cours d’un an au niveau universitaire ou l’équivalent (p. ex. quatre cours)",
                  "ET",
                  "Être accepté sans condition à un programme d’étude menant à l’obtention d’un baccalauréat 4 dans l’un des domaines suivants: toute discipline",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOEP 1, 2, 3, 5"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent",
                  "ET",
                  "Compléter un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Tous les candidats doivent conformément aux prescriptions de l'annexe E de la PFC 154",
          "3. Le candidat doit réussir au processus de sélection du CSPNFC du 8e Escadre Trenton.",
          "4. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "5. Tout programme qui comprend des éléments non académiques qui ne sont pas directement liés au programme d’études ou qui sont requis pour obtenir un permis ou une certification professionnelle pour atteindre le NPC n’est pas autorisé.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1, 2, 3",
              "RECL 1, 2, 3",
              "MÉ 1, 2, 3",
              "(qualifié)",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : Toute discipline"],
                experience: [
                  "Avoir atteint le niveau opérationnel de compétence (NPC) 4 en tant que Pilote 00183 dans la F rég",
                ],
              },
            ],
          },
          {
            candidates: ["PIRO1, 2, 3", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat: Toute discipline",
                ],
                experience: [
                  "Avoir atteint le niveau opérationnel de compétence (NPC) 4 en tant que Pilote 00183 dans la F rég",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Tous les candidats doivent conformément aux prescriptions de l'annexe E de la PFC 154",
          "3. Pour les candidats du Québec, cela comprend l'inscription à un programme CÉGEP préuniversitaire approprié conformément au DOAD 5002-8, Programme d intégration à la Réserve – Officiers (PIRO).",
          "4. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "13 ans",
      },
      {
        program: "PFOR",
        duration: "17 ans",
      },
    ],
  },
  {
    id: "00184",
    medicalStandard: { v: 3, cv: 2, h: 2, g: 3, o: 3, a: 4, u: 5 },
    title: "CONTRÔLE AÉROSPATIAL",
    abbreviation: "C AÉRO",
    requirements: "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat : toute discipline.",
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
                education: ["Maîtrise universitaire en : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["EDO 1, 2", "RECL 1, 2", "MÉ 1, 2", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: [
                  "Avoir atteint le niveau de compétence (NPC) en tant que C AÉRO 00184 dans la F rég 4",
                ],
              },
            ],
          },
          {
            candidates: ["PFOR 1, 2, 3, 6"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition à un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFUMR 1, 2, 3, 6"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Avoir terminé au moins deux cours d’un an au niveau universitaire ou l’équivalent (p. ex. quatre cours d’un semestre)",
                  "ET",
                  "Être accepté sans condition à un programme d’étude menant à l’obtention d’un baccalauréat dans l’un des domaines suivants: toute discipline",
                ],
                experience: ["Aucune expérience minimale requise"],
              },
            ],
          },
          {
            candidates: ["PFOEP 1, 2, 3, 6"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent",
                  "ET",
                  "Compléter un programme de baccalauréat dans l’un des domaines suivants : toute discipline",
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
                  "Diplôme d’études secondaires ou l’équivalent",
                  "OU",
                  "Diplôme ou baccalauréat représentant au moins deux ans d’études universitaires à plein temps 5",
                ],
                experience: [
                  "Les candidats doivent détenir le grade effectif de Sgt ou supérieur dans le 00337 OP CA",
                ],
              },
            ],
          },
          {
            candidates: ["PNSCO1, 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Les candidats doivent détenir le grade effectif de 00381 Adjuc et avoir déjà détenu le grade d'Adjum en tant que 00337 OP CA",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Tous les candidats doivent conformément aux prescriptions de l'annexe E de la PFC 154",
          "3. Tous les candidats doivent réussir le processus de sélection pour 00182 OSCA au CFACSC 8 Escadre Trenton.",
          "4. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "5. Consulter la DOAD 5002-10, paragr. 3.5 (a, b) pour connaître les exigences relatives à la scolarité.",
          "6. Tout programme qui comprend des éléments non académiques qui ne sont pas directement liés au programme d’études ou qui sont requis pour obtenir un permis ou une certification professionnelle pour atteindre le NPC n’est pas autorisé.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1, 2", "RECL 1, 2", "MÉ 1, 2", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : toute discipline"],
                experience: [
                  "Avoir atteint le niveau de compétence (NPC) en tant que C AÉRO 00184 dans la F rég 4",
                ],
              },
            ],
          },
          {
            candidates: ["PIRO1, 2", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat 3: toute discipline",
                ],
                experience: [
                  "Avoir atteint le niveau de compétence (NPC) en tant que C AÉRO 00184 dans la F rég 4",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Tous les candidats doivent conformément aux prescriptions de l'annexe E de la PFC 154",
          "3. Pour les candidats du Québec, cela comprend l'inscription à un programme CÉGEP préuniversitaire approprié conformément au DOAD 5002-8, Programme d intégration à la Réserve – Officiers (PIRO).",
          "4. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
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
    id: "00185",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "GÉNIE AÉROSPATIAL",
    abbreviation: "G AÉRO",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat en ingénierie (BIng), baccalauréat ès sciences appliquées (BScA) ou baccalauréat ès sciences (BSc).",
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
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat ès sciences appliquées (BScA) en ingénierie, reconnus par Ingénieurs Canada (CCI) dans l’un des domaines suivants : o Aérospatiale/Aéronautique o Informatique o Systèmes Informatique o Électricité o Systèmes Électricité o Mécanique o Systèmes Mécanique o Systèmes Mécatronique o Mécatronique o Physique o Logiciel o Systèmes Logiciel o Conception de Systèmes",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat ès sciences appliquées (BScA) en ingénierie, reconnus par Ingénieurs Canada (CCI) dans l’un des domaines suivants : o Chimie o Gestion o Matériaux o Spatiale",
                  "Baccalauréat ès sciences (BSc) : o Sciences Appliquées 2 o Science Informatique o Sciences Spatiales o Sciences de terre o Physique o Chimie",
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
                education: ["Baccalauréat: o n'importe lequel"],
                experience: [
                  "Doit avoir atteint le niveau opérationnel de compétence (NPC)3 en 00185 G AÉRO de la F rég",
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
                  "Être admis sans condition à un : Baccalauréat en ingénierie (BIng) ou baccalauréat ès sciences appliquées (BScA) en ingénierie, reconnus par Ingénieurs Canada (CCI) dans l’un des domaines suivants : o Aérospatiale/Aéronautique o Chimie o Informatique o Systèmes Informatique o Électricité o Systèmes Électricité o Gestion o Matériaux o Mécanique o Systèmes Mécanique o Systèmes Mécatronique o Mécatronique o Physique o Logiciel o Systèmes Logiciel o Spatiale o Conception de Systèmes",
                  "Baccalauréat ès sciences (BSc) : o Sciences Appliquées 2 o Science Informatique o Sciences Spatiales o Sciences de terre o Physique o Chimie",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PFUMR 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Avoir terminé au moins deux cours d’un an au niveau universitaire ou l’équivalent (p. ex. quatre cours)",
                  "AND",
                  "Être admis sans condition à un programme d’études de premier cycle dans l’un des domaines suivants : Baccalauréat en ingénierie (BIng) ou baccalauréat ès sciences appliquées (BScA) en ingénierie, reconnus par Ingénieurs Canada (CCI) dans l’un des domaines suivants: o Aérospatiale/Aéronautique o Chimie o Informatique o Systèmes Informatique o Électricité o Systèmes Électricité o Gestion o Matériaux o Mécanique o Systèmes Mécanique o Systèmes Mécatronique o Mécatronique o Physique o Logiciel o Systèmes Logiciel o Spatiale o Conception de Systèmes",
                  "Baccalauréat ès sciences (BSc) : o Sciences Appliquées o Science Informatique o Sciences Spatiales o Sciences de terre o Physique o Chimie",
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
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: [
                  "Détenir au minimum le grade effectif de sgt dans l’un des occupations suivantes : o 00021 MÉC B o 00135 TECH AÉRO o 00136 TECH AVIO o 00138 TECH SA o 00261 TECH SA (A) o 00343 TECH END o 00363 SUR MA",
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
                  "Les candidats doivent avoir le grade effectif de 00381 Adjuc et détenir le grade d'Adjum dans l’un des occupations suivantes : o 00021 FLT ENGR o 00363 AM SUPT",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Les diplômes de sciences appliquées acceptables sont ceux dont au moins 75 % du programme d'études est lié à un ou plusieurs des programmes de diplômes d'ingénieur AERE « idéaux » ou « acceptables ». Les cours de mathématiques, de physique et de chimie peuvent également être pris en compte dans cette exigence de 75 %.",
          "3. Le niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
        ],
      },
      {
        force: "FORCE DE LA RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "MSÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["Baccalauréat : o n'importe lequel"],
                experience: [
                  "Doit avoir atteint le niveau opérationnel de compétence (NPC)2 en 00185 G AÉRO de la F rég",
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
                  "Les candidats doivent avoir le grade effectif de 00381 Adjuc et détenir le grade d'Adjum dans l’un des occupations suivantes : o 00021 MÉC B o 00363 SUR MA",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
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
    id: "00187",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "GÉNIE ÉLECTRIQUE ET MÉCANIQUE",
    abbreviation: "GEM",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Baccalauréat en ingénierie (BIng), baccalauréat en sciences appliquées (BScA) ou Baccalauréat ès sciences (BSc).",
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
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) dans l’un des domaines suivants : o Production automatisée o Véhicules automoteurs o Électricité o Électromécanique o Systèmes électromécaniques o Systèmes électroniques o Systèmes d’ingénierie et informatique o Génie industriel o Systèmes industriels o Intégration o Gestion o Fabrication o Matériaux o Mécanique o Systèmes mécaniques o Mécatronique o Systèmes mécatroniques o Microélectronique o Nanotechnologie o Opérations et logistique o Physique o Processus o Conception de systèmes",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie: o Toute discipline",
                  "OU",
                  "Baccalauréat ès sciences (BSc) dans l’un des domaines suivants : o Sciences appliquées 2 o Chimie o Sciences informatiques o Général 2 o Systèmes informatiques o Mathématiques/mathématiques appliquées o Physique o Sciences spatiales o Sciences de la Terre",
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
                  "Être admis sans condition à un Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie : o Toute discipline",
                  "OU",
                  "Baccalauréat en sciences (BSc) dans l’un des domaines suivants : o Sciences appliquées2 o Chimie o Sciences informatiques o Général2 o Systèmes informatiques o Mathématiques/mathématiques appliquées o Physique o Sciences spatiales o Sciences de la terre",
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
                  "Diplôme d’études secondaires ou l’équivalent",
                  "ET",
                  "Diplôme en technologie d’ingénierie d’un collège communautaire ou d’un institut de technologie reconnu2",
                  "OU",
                  "Au moins deux ans d’études supérieures à unités dans un programme de baccalauréat en ingénierie",
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
                  "Le candidat doit détenir au moins le grade effectif de sgt dans l’un des GPM suivants : o 00129 TECH V o 00130 TECH A[T] o 00134 TECH MAT o 00327 TECH ÉLEC-OPTO [T] o 00388 TECH+ G MT o Conformément à la directive 00187 GEM",
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
                  "Les candidats doivent occuper le rang effectif de 00381 Adjuc et avoir détenu le rang de Adjum dans l'une des occupations suivantes : o 00129 TECH V o 00130 TECH A[T] o 00134 TECH MAT o 00327 TECH ÉLEC-OPTO [T] o 00388 TECH+ G MT",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Un diplôme en sciences générales ou appliquées doit sanctionner environ 75 % d’études en physique, en chimie et en mathématiques, les 25 % restants devant porter sur n’importe quel autre domaine.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["EDO 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) dans l’un des domaines suivants : o Production automatisée o Véhicules automoteurs o Électricité o Électromécanique o Systèmes électromécaniques o Systèmes électroniques o Systèmes d’ingénierie et informatique o Génie industriel o Systèmes industriels o Intégration o Gestion o Fabrication o Matériaux o Mécanique o Systèmes mécaniques o Mécatronique o Systèmes mécatroniques o Microélectronique o Nanotechnologie o Opérations et logistique o Physique o Processus o Conception de systèmes",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en ingénierie (BIng) ou baccalauréat en sciences appliquées (BScA) en ingénierie, dans l’un des domaines suivants : o Toute discipline",
                  "OU",
                  "Baccalauréat ès sciences (BSc) dans l’un des domaines suivants : o Sciences appliquées3 o Chimie o Sciences informatiques o Général3 o Systèmes informatiques o Mathématiques/mathématiques appliquées o Physique o Sciences spatiales o Sciences de la terre",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Exigence Critique 4",
                education: ["Baccalauréat : o toute discipline"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIRO 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un Baccalauréat en ingénierie (BIng)2 ou baccalauréat en sciences appliquées (BScA)2 dans l’un des domaines suivants : o Production automatisée o Véhicules automoteurs o Électricité o Électromécanique o Systèmes électromécaniques o Systèmes électroniques o Systèmes d’ingénierie et informatique o Génie industriel o Systèmes industriels o Intégration o Gestion o Fabrication o Matériaux o Mécanique o Systèmes mécaniques o Mécatronique o Systèmes mécatroniques o Microélectronique o Nanotechnologie o Opérations et logistique o Physique o Processus o Conception de systèmes",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un : Baccalauréat en ingénierie (BIng)2 ou baccalauréat en sciences appliquées (BScA)2 en ingénierie : o Toute discipline",
                  "OU",
                  "Baccalauréat ès sciences (BSc)2 dans l’un des domaines suivants : o Sciences appliquées3 o Chimie o Sciences informatiques o Général3 o Systèmes informatiques o Mathématiques/mathématiques appliquées o Physique o Sciences spatiales o Sciences de la terre",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Exigence Critique 4",
                education: [
                  "Inscrit comme étudiant à temps partiel, à temps plein ou à distance dans un établissement postsecondaire canadien dans un programme menant à un baccalauréat 2 : o Toute disciple",
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
                  "Le candidat doit détenir au moins le grade effectif de sgt dans l’un des GPM suivants : o 00129 TECH V o 00130 TECH A[T] o 00134 TECH MAT o 00327 TECH ÉLEC-OPTO [T] o 00388 TECH+ G MT",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Dans le cas des candidats du Québec, ces exigences comprennent un enrôlement dans un programme CEGEP préuniversitaire, conformément au message CANFORGEN 023/13, Programme d’intégration à la Réserve – Officiers (PIRO).",
          "3. Un diplôme en sciences générales ou appliquées doit sanctionner environ 75 % d’études en physique, en chimie et en mathématiques, les 25 % restants devant porter sur n’importe quel autre domaine.",
          "4. Une justification à l’effet que la P rés éprouve un besoin urgent en personnel doit être envoyé au responsable de l’enrôlement, tel qu’exposé à la DOAD 5002-1 (c.-à-d un officier commandant de commandement ou de formation).",
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
    id: "00189",
    medicalStandard: { v: 3, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "GÉNIE CONSTRUCTION",
    abbreviation: "GÉNIE CONST",
    requirements:
      "FORCE RÉGULIÈRE: Baccalauréat en ingénierie ou Baccalauréat en Sciences.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 3"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Baccalauréat en ingénierie o Civil o Mécanique o Électrique o Environnement",
                  "Baccalauréat en Sciences o BSc Génie en protection incendie",
                ],
                experience: [
                  "Aucune expérience de travail minimale requise",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Baccalauréat en ingénierie o Chimique o Gestion o Ingénie et gestion o Géologie",
                  "Baccalauréat en Sciences o Environnement o Géologie o Technologie de sûreté et protection incendie o Géomatique/arpentage o BScA (dans un domaine connexe susmentionné)",
                ],
                experience: [
                  "Au moins trois mois d’expérience pertinente dans un ou plusieurs des domaines suivants : o industrie de la construction o gestion des installations o services d’incendies o services de l’environnement o géomatique o gestion de projet o service militaire",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
              {
                level: "Exigence Critique 1",
                education: [
                  "Baccalauréat en ingénierie o Général o Aéronautique o Aérospatial o Physique o Génie informatique o Logiciel o Système d’information o Architecture maritime/navale o Nucléaire o Pétrolier",
                  "Baccalauréat en Sciences o Mathématiques o Chimie o Physique o Science spatiale o Astronomie o Informatique",
                ],
                experience: [
                  "Au moins trois mois d’expérience pertinente dans un ou plusieurs des domaines suivants : o industrie de la construction o gestion des installations o services d’incendies o services de l’environnement o géomatique o gestion de projet o service militaire",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
            ],
          },
          {
            candidates: ["Recl Vol 2, 3", "Recl Oblig 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Conformément aux normes de scolarité « Acceptable » susmentionnées de l’EDO",
                ],
                experience: [
                  "Au moins trois mois d’expérience pertinente dans un ou plusieurs des domaines suivants : o industrie de la construction o gestion des installations o services d’incendies o services de l’environnement o géomatique o gestion de projet o service militaire",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
            ],
          },
          {
            candidates: ["Réaffectations 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Conformément aux normes de scolarité susmentionnées de l’EDO",
                ],
                experience: [
                  "Conformément aux normes de scolarité susmentionnées de l’EDO",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
            ],
          },
          {
            candidates: ["PSAC 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Conformément aux normes de scolarité susmentionnées de l’EDO",
                ],
                experience: [
                  "Au moins trois mois d’expérience pertinente dans un ou plusieurs des domaines suivants : o industrie de la construction o gestion des installations o services d’incendies o services de l’environnement o géomatique o gestion de projet o service militaire",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
            ],
          },
          {
            candidates: ["PFUMR – GÉNIE CONST (Général) 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Deux cours crédités de niveau universitaire terminés avec succès, et acceptation inconditionnelle à un programme de premier cycle selon les critères « Idéal » de l’EDO susmentionnés",
                ],
                experience: [
                  "Satisfaire aux normes du PFUMR actuelles",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
            ],
          },
          {
            candidates: [
              "PFUMR – GÉNIE CONST – Spécialiste en protection incendie 3",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Deux cours crédités de niveau universitaire terminés avec succès, et acceptation inconditionnelle à l’Université de Maryland pour le BSc Génie en protection incendie 4",
                ],
                experience: [
                  "Satisfaire aux normes du PFUMR actuelles et être Pompier 00149",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
            ],
          },
          {
            candidates: ["PIOSR 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "12e année en Ontario, Secondaire V au Québec ou DESPA",
                ],
                experience: [
                  "Conformément aux exigences actuelles pour être CDR : 10 ans de service",
                  "ET les candidats doivent au moins avoir atteint le NQ 5 dans les SGPM suivants : o 00149 Pompier o 00238 TEC géomatique o 00301 TEC REFR o 00302 TEC DE o 00303 TEC GE o 00304 TEC PC o 00305 TEC EPPE o 00306 TEC Const o 00307 SUR GC o 00339 Génie de combat",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
            ],
          },
          {
            candidates: ["PFOR 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Conformément aux normes de recrutement du PFOR Les candidats poursuivront des études selon les normes de scolarité susmentionnées de l’EDO",
                ],
                experience: [
                  "Conformément aux exigences actuelles du PFOR",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
            ],
          },
          {
            candidates: ["PFOEP 3", "Réaffectations PFOEP 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Diplôme de technologie d’un programme reconnu par le CCTT; ou certification de TSAI (technologue) dans l’un des programmes suivants : o Civil o Construction o Environnemental o Géomatique/arpentage o Électrique o Mécanique o Géologique/minier/pétrolier o Hydrogéologique/ hydro économique o Chimique o Informatique",
                  "OU Technique en Protection incendie",
                  "Doit poursuivre un diplôme conformément à les normes de l’EDO",
                ],
                experience: [
                  "Conformément aux exigences du PFOEP",
                  "Au moins trois mois d’expérience pertinente dans un ou plusieurs des domaines suivants : o industrie de la construction o gestion des installations o services d’incendies o services de l’environnement o géomatique o gestion de projet o service militaire",
                  "Leadership démontré/ posséder des qualités d'officier",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Les critères d’exception sont définis comme une situation où le SGPM éprouve des besoins personnels urgents et celle-ci ne peut se produire jusqu’à ce que le SGPM soit classé SGPM ROUGE dans la matrice de l’état des groupes professionnels du DBPP.",
          "2. Les dérogations pour les programmes académiques qui ne sont pas susmentionnés doivent être approuvés par le Gestionnaire du groupe professionnel GC, via l’OSPB (Air) par l’entremise de DBPP 4-2.",
          "3. Le candidat doit atteindre le seuil d’admissibilité Officiers (30e percentile de la note totale) au Test d’aptitude des Forces canadiennes (TAFC).",
          "4. Le baccalauréat de génie en protection incendie de l’Université de Maryland est un programme reconnu par le Bureau canadien d’agrément des programmes de génie, qui rencontre les exigences en matière de qualification pour la certification d’ingénieur professionnel. Ce dernier est le seul diplôme de génie en protection incendie disponible en Amérique du nord. Le programme du Collège Seneca/Université de Cincinnati ne rencontre pas toutes les exigences pour un diplôme en génie, donc il ne rencontre pas les critères d’entrée idéaux pour le groupe professionnel du Génie Construction. Essentiellement, il combine un diplôme technique et un an de Gestion de sécurité incendie fait par correspondance, résultant en l’obtention d’un baccalauréat en technologie de sûreté et protection incendie. Cette qualification est acceptable pour accéder au groupe professionnel, mais n’est pas le diplôme préféré afin de pourvoir à toutes les exigences requises par le métier Génie Construction en matière d’emploi.",
          "5. Les postulants PFOEP qui ont obtenus la Technique en protection incendie du Collège Seneca devront compléter un an d’étude par correspondance via l’Université de Cincinnati pour obtenir un baccalauréat en technologie de sûreté et protection incendie.",
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
    id: "00190",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "PHYSIOTHÉRAPIE",
    abbreviation: "PHYSIO",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Maîtrise en physiothérapie ou Baccalauréat en physiothérapie. Permis/licence d’exercice en règle.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO1,2,3", "RECL1,2,3", "MÉ1,2,3", "PSAC1,2,3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Maîtrise en physiothérapie ou Baccalauréat en physiothérapie",
                  "ET",
                  "Permis/licence d’exercice en règle (à titre actif) en tant que physiothérapeute émis par un organisme de réglementation provincial ou territorial4,5",
                  "Lettre de l’organisme de réglementation du candidat attestant que ce dernier est « En règle »",
                ],
                experience: [
                  "Obtention du diplôme au cours des 12 mois précédents : o Aucune expérience requise",
                  "OU",
                  "Obtention du diplôme depuis plus de 12 mois : o Au moins 1,200 heures d’expérience en tant que physiothérapeute en orthopédie, en clinique externe, ou en physiothérapie sportive au cours des 2,5 années précédentes6",
                ],
              },
            ],
          },
          {
            candidates: [
              "ES-PMNE1,8,9 (o En service F reg)",
              "PFOS1,8,9 (o Civil, o MÉ)",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Acceptation sans condition dans un programme d'un établissement postsecondaire agréé7,8 menant à une maîtrise en physiothérapie",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le candidat doit exercer la profession de physiothérapeute s’il a obtenu son diplôme de maîtrise depuis plus de 12 mois. Tous les candidats détenir un permis d’exercice complet, sans restriction et illimité émis dans une province ou un territoire du Canada.",
          "3. Candidat EDO/RECL/MÉ/ES-PMNE : pour émettre une demande d’évaluation de la formation antérieure (ÉFA), le candidat peut obtenir une liste des documents exigés en communiquant avec le groupe des Services de santé des Forces canadiennes à l’adresse suivant: DND.CFHSVCsGP_PLAR-ERA_GpSvcFC.MDN@forces.gc.ca; la demande doit être transmise au même destinataire et à la même adresse afin de pouvoir déterminer si le candidat, en plus de répondre aux exigences énoncées au tableau précédent, n’a pas fait l’objet des sanctions suivantes : a. S’être fait révoquer son permis d’exercer par ordre d’une autorité compétente; b. Faire l’objet d’une enquête de la part d’une autorité compétente. Le dossier d’un candidat ayant fait l’objet d’une enquête ayant abouti à l’imposition de sanctions fera l’objet d’un examen individuel par le Médecin général.",
          "4. Par « permis en règle sans restriction », on entend un permis complet, sans restriction et illimité d’agir de manière indépendante comme physiothérapeute dans une province ou un territoire du Canada.",
          "5. On trouve les organismes de réglementation provinciaux et territoriaux compétents au lien suivant : https://alliancept.org/fr/",
          "6. L’exercice en physiothérapie orthopédique en clinique externe ou en physiothérapie sportive doit se situer dans une un zone de traitement d’une population active et ayant recours à des pratiques factuelles.",
          "7. On trouve une liste des programmes accrédités de maîtrise en physiothérapie du conseil canadien des programmes universitaires de physiothérapie au site Web suivant : LE CONSEIL CANADIEN DES PROGRAMMES UNIVERSITAIRES DE PHYSIOTHÉRAPIE - Programmes canadiens",
          "8. Les écoles qui ne figurent pas sur la liste au lien de la note 8 ci-dissus seront examinées au cas par cas. Les candidats souhaitant postuler à un programme non répertorié doivent en discuter avec les recruteurs spécialistes du Svc S FC bien avant la date limite du concours ESNEM en envoyant un courrier électronique à HSRecruiting-RecrutementSS@forces.gc.ca",
          "9. L’admissibilité s’applique uniquement aux candidats ayant complété le programme de baccalauréat préalable et ayant été acceptés dans un programme canadien reconnu de maîtrise en physiothérapie.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "EDO 1,2,3",
              "PSAC 1,2,3",
              "RECL1,2,3",
              "MÉ 1,2,3",
              "MSÉ 1,2,3",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Maîtrise en physiothérapie ou Baccalauréat en physiothérapie",
                  "ET",
                  "Permis/licence d’exercice en règle (à titre actif) en tant que physiothérapeute émis par un organisme de réglementation provincial ou territorial4,5",
                  "Lettre de l’organisme de réglementation du candidat attestant que ce dernier est « En règle »",
                ],
                experience: [
                  "Obtention du diplôme au cours des douze (12) mois précédents : o Aucune expérience requise",
                  "OU",
                  "Obtention du diplôme depuis plus de douze (12) mois : o Au moins mille deux cents (1 200) heures d’expérience en tant que physiothérapeute en orthopédie en clinique externe ou en physiothérapie sportive au cours des 2,5 années précédentes7",
                ],
              },
            ],
          },
          {
            candidates: ["MÉ 1,2,3", "MSÉ1,2,3", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Maîtrise en physiothérapie ou Baccalauréat en physiothérapie",
                  "ET",
                  "Permis/licence d’exercice en règle (à titre actif) en tant que physiothérapeute émis par un organisme de réglementation provincial ou territorial4,5",
                  "Lettre de l’organisme de réglementation du candidat attestant que ce dernier est « En règle »",
                ],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC)6 pour 00190 PHYSIO",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le candidat doit exercer la profession de physiothérapeute et détenir un permis d’exercice complet, sans restriction et illimité émis dans une province ou un territoire du Canada.",
          "3. Candidat EDO/RECL/PSAC/MÉ/MSÉ : pour émettre une demande d’évaluation de la formation antérieure (ÉFA), le candidat peut obtenir une liste des documents exigés en communiquant avec le groupe des Services de santé des Forces canadiennes...",
          "4. Par « permis en règle sans restriction », on entend un permis complet, sans restriction et illimité d’agir de manière indépendante comme physiothérapeute dans une province ou un territoire du Canada.",
          "5. On trouve les organismes de réglementation provinciaux et territoriaux compétents au lien suivant : https://www.alliancept.org/fr/accueil/.",
          "6. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM.",
          "7. L’exercice en physiothérapie orthopédique en clinique externe ou en physiothérapie sportive doit se situer dans une un zone de traitement d’une population active et ayant recours à des pratiques factuelles.",
        ],
      },
    ],
    contracts: [
      {
        program: "EDO/PSAC",
        duration: "6 ans",
      },
      {
        program: "SEELM/PFOS",
        duration: "9 ans",
      },
    ],
  },
];
