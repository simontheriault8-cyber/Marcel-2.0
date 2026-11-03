import { JobEntry } from "./jobs.models";

export const JOBS_NCM_3: JobEntry[] = [
  {
    id: "00299",
    medicalStandard: { v: 4, cv: 2, h: 2, g: 2, o: 2, a: 5, u: 5 },
    title: "SPÉCIALISTE EN COMMUNICATIONS NAVALES",
    abbreviation: "COMM N",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: 10e année du secondaire / Secondaire IV.",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques appliquées de 11e / Sec V",
                  "Cours de physique de 11e année / Sec V",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (Qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) du GPM COMM N 00299 dans la F rég ou la P rés",
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
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques appliquées de 11e année ou Sec V",
                  "Cours de physique de 11e année / Sec V",
                ],
                experience: ["Aucune experience requise"],
              },
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (Qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) du GPM COMM N 00299 dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d'aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
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
    id: "00301",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN RÉFRIGÉRATION ET MÉCANIQUE",
    abbreviation: "TECH RÉFR MÉC",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: 10e année du secondaire / Secondaire IV comportant Mathématiques appliquées de 10e / Sec IV.",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques théoriques de 11e / Sec V",
                  "Un cours en sciences de 11e / Sec V",
                  "Désignation de technicien diplômé (T. D.)",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial (p. ex. Sceau rouge ou carte de qualification) dans l’un des groupes professionnels",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant : Mathématiques appliquées de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
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
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques théoriques de 11e / Sec V",
                  "Un cours en sciences de 11e / Sec V",
                  "Désignation de technicien diplômé (T. D.)",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial (p. ex. Sceau rouge)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant : Mathématiques appliquées de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
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
        duration: "4 ans",
      },
      {
        program: "PFS-MR",
        duration: "6 ans",
      },
    ],
  },
  {
    id: "00302",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN / DISTRIBUTION ÉLECTRIQUE",
    abbreviation: "TECH DÉ",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: 10e année du secondaire / Secondaire IV comportant Mathématiques appliquées de 10e / Sec IV.",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques théoriques de 11e année / Sec V",
                  "Un cours en physique de 11e année / Sec V",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial dans l’un des groupes professionnels suivants : Électricien en construction, Électricien industriel, Technicien de lignes électriques",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant : Mathématiques appliquées de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
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
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques théoriques de 11e année / Sec V",
                  "Un cours en physique de 11e année / Sec V",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant : Mathématiques appliquées de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
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
        duration: "4 ans",
      },
      {
        program: "PFS-MR",
        duration: "6 ans",
      },
    ],
  },
  {
    id: "00303",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN / GROUPES ÉLECTROGÈNES",
    abbreviation: "TECH GE",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: 10e année du secondaire / Secondaire IV comportant Mathématiques appliquées de 10e / Sec IV.",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques théoriques de 11e année / Sec V",
                  "Un cours en physique de 11e année / Sec V",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial dans l’un des groupes professionnels",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant : Mathématiques appliquées de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
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
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques théoriques de 11e année / Sec V",
                  "Un cours en physique de 11e année / Sec V",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant : Mathématiques appliquées de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
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
        duration: "4 ans",
      },
    ],
  },
  {
    id: "00304",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN / PLOMBERIE ET CHAUFFAGE",
    abbreviation: "TECH PC",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: 10e année du secondaire / Secondaire IV comportant Mathématiques appliquées de 10e / Sec IV.",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques théoriques de 11e année / Sec V",
                  "Un cours en sciences de 11e / Sec V",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial ou une qualification",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant : Mathématiques appliquées de 10e / Sec IV",
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
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent, comportant : Mathématiques théoriques de 11e année / Sec V",
                  "Un cours en sciences de 11e / Sec V",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial ou une qualification",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant : Mathématiques appliquées de 10e / Sec IV",
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
        program: "Enrôlement direct",
        duration: "4 ans",
      },
      {
        program: "PFS-MR",
        duration: "6 ans",
      },
    ],
  },
  {
    id: "00305",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN / EAU, PRODUITS PÉTROLIERS ET ENVIRONNEMENT",
    titleEn: "WATER, FUELS AND ENVIRONMENT TECHNICIAN",
    abbreviation: "TECH EPPE",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires ou 10e année / Secondaire IV comportant Mathématiques appliquées de 10e / Sec IV.",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "• Mathématiques théoriques de 11e année / Sec V",
                  "• Un cours en chimie de 11e année / Sec V",
                ],
                experience: [
                  "Détenir une qualification dans l’un des domaines/groupes professionnels civils suivants :",
                  "• Eau et eaux usées",
                  "• Évaluateur de sites environnementaux",
                  "• Opérateur de procédés de traitement du pétrole, des gaz et des produits chimiques",
                  "• Entretien des canalisations d’eau et de gaz",
                  "• Industrie du pétrole et du gaz",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant :",
                  "• Mathématiques appliquées de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable (T. D.)",
                education: ["Désignation de technicien diplômé (T. D.) 2"],
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
                  "• Atteinte du NPC 3 comme TECH EPPE 00305 dans la F rég ou la P rés, ou",
                  "• Emploi civil continu avec certification provinciale ou interprovinciale valide dans l’un des groupes professionnels suivants : Eau et eaux usées, Évaluateur de sites environnementaux, Opérateur de procédés de traitement du pétrole, des gaz et des produits chimiques, Entretien des canalisations d’eau et de gaz, Industrie du pétrole et du gaz",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du NPC 3 comme TECH EPPE 00305 dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. On trouve plus d’informations sur la désignation de technicien diplômé au site Web du Conseil canadien des techniciens et technologues : Conseil canadien des techniciens et technologues (cctt.ca).",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
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
    id: "00306",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN CONSTRUCTION",
    titleEn: "CONSTRUCTION TECHNICIAN",
    abbreviation: "TECH CONST",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires ou 10e année / Secondaire IV avec mathématiques.",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "• Mathématiques théoriques de 11e / Sec V",
                  "• Un cours en sciences de 11e / Sec V",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial (p. ex. Sceau rouge ou carte de qualification) dans l’un des groupes professionnels suivants :",
                  "• Briqueteur-maçon / briqueteuse-maçonne (Maçonnerie)",
                  "• Charpenterie",
                  "• Pose de panneaux muraux secs",
                  "• Peinture",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV comportant :",
                  "• Mathématiques appliquées de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable (T. D.)",
                education: ["Désignation de technicien diplômé (T. D.) 2"],
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
                  "• Atteinte du Niveau professionnel de compétence (NPC) 3 dans TECH RÉFR MÉC 00301 dans la F rég ou la P rés, ou",
                  "• Emploi civil continu avec certification provinciale ou interprovinciale valide dans l’un des groupes professionnels suivants : Briqueteur-maçon / briqueteuse-maçonne (Maçonnerie), Charpenterie, Pose de panneaux muraux secs, Peinture",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) 3 dans TECH RÉFR MÉC 00301 dans la F rég ou la P rés",
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
                  "Être accepté sans condition ou être présentement enrôlé comme étudiant à temps plein, dans un programme d’études à un établissement postsecondaire sélectionné par les FAC 4",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. On trouve plus d’informations sur la désignation de technicien diplômé au site Web du Conseil canadien des techniciens et technologues : Conseil canadien des techniciens et technologues (cctt.ca).",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
          "4. La liste des établissements postsecondaires et des programmes approuvés par le CAF, ainsi que les exigences individuelles associées (y compris la durée et les crédits), sera mise à jour dans le Liste des groupes professionnels militaires (LGPM) sur le portail des Forces armées canadiennes Accréditations, Certifications et Équivalences (FAC ACE)",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "MSÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "• Mathématiques théoriques de 11e / Sec V",
                  "• Un cours en sciences de 11e / Sec V",
                ],
                experience: [
                  "Détenir un diplôme provincial ou interprovincial (p. ex. Sceau rouge ou carte de qualification) dans l’un des groupes professionnels suivants :",
                  "• Briqueteur-maçon / briqueteuse-maçonne (Maçonnerie)",
                  "• Charpenterie",
                  "• Pose de panneaux muraux secs",
                  "• Peinture",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV comportant :",
                  "• Mathématiques appliquées de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable (T. D.)",
                education: ["Désignation de technicien diplômé (T. D.) 2"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat civil 1",
              "RECL 1",
              "MÉ 1, MSÉ 1 (qualifié)",
            ],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: [
                  "• Atteinte du Niveau professionnel de compétence (NPC) 3 dans TECH RÉFR MÉC 00301 dans la F rég ou la P rés, ou",
                  "• Emploi civil continu avec certification provinciale ou interprovinciale valide dans l’un des groupes professionnels suivants : Briqueteur-maçon / briqueteuse-maçonne (Maçonnerie), Charpenterie, Pose de panneaux muraux secs, Peinture",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) 3 dans TECH RÉFR MÉC 00301 dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. On trouve plus d’informations sur la désignation de technicien diplômé au site Web du Conseil canadien des techniciens et technologues : Conseil canadien des techniciens et technologues (cctt.ca).",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
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
        duration: "6 ans",
      },
    ],
  },
  {
    id: "00324",
    medicalStandard: { v: 4, cv: 2, h: 2, g: 2, o: 2, a: 5, u: 5 },
    title: "OPÉRATEUR SONAR",
    titleEn: "SONAR OPERATOR",
    abbreviation: "OP SONAR",
    requirements:
      "FORCE RÉGULIÈRE: Diplôme d’études secondaires ou Secondaire V au Québec (Idéal) ou 10e année / Secondaire IV (Acceptable).",
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
                  "Diplôme d’études secondaires ou certificat de Secondaire V au Québec, comportant :",
                  "• Mathématiques appliquées de 11e année ou Mathématiques 526 / SN V/TS V au Québec",
                  "• Cours de physique de 11e année ou de physique 534 au Québec",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année d’études, Secondaire IV au Québec ou l’équivalent",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat avec service antérieur 1, 2",
              "RECL 1, 2",
              "MÉ 1, 2 (tous avec service antérieur ou actif en tant qu'00324 OP SONAR)",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou certificat de Secondaire V au Québec",
                ],
                experience: [
                  "Obtention de la qualification de grade de matelot de 3e classe (NOC) 3 – 00324 OP SONAR dans la F rég",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année d’études, Secondaire IV au Québec ou l’équivalent",
                ],
                experience: [
                  "Obtention de la qualification de grade de matelot de 3e classe (NOC) 3 – 00324 OP SONAR dans la F rég",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC), s’il ce n’est pas déjà le cas. Les candidats civils, RECL ou MÉ qui n’ont pas atteint le NOC en tant que 00168 TECH APPR doivent obtenir la note de passage du TAFC. Se reporter à la Feuille de travail - Affectations (FTA) pour connaître les notes de passages actuelles.",
          "2. Conformément aux critères d’enrôlement/RECL/MÉ en vigueur.",
          "3. Le niveau opérationnel de compétence (NOC) est expliqué dans la description du GPM 00324 OP SONAR à l’adresse suivante: http://cmp-cpm.mil.ca/fr/soutien/personnel-militaire/dbpp.page.",
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
    id: "00327",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN ÉLECTRONIQUE ET OPTRONIQUE (TERRE)",
    titleEn: "ELECTRONIC AND OPTRONIC TECHNICIAN (LAND)",
    abbreviation: "TECH ÉLEC – OPTO [T]",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires (Idéal) ou 10e année / Secondaire IV comprenant mathématiques et sciences (Acceptable).",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "• Math appliquées de 11e / Sec V",
                  "• Cours de physique 11e / Sec V",
                ],
                experience: ["Permis de conduire provincial valide 2"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année d’études secondaires / Secondaire IV comprenant :",
                  "• Math appliquées de 10e / Sec IV",
                  "• Cours de sciences de 10e / Sec IV",
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
                  "Atteinte du NPC 3 comme 00327 Tech Élec-Opto (T) dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du NPC 3 comme 00327 Tech Élec-Opto (T) dans la F rég ou la P rés",
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
                  "Être accepté sans conditions ou être présentement enrôlé comme étudiant à temps plein dans un programme d’études à un établissement postsecondaire sélectionné par les FAC 4",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le candidat doit détenir ou être en mesure d’obtenir un permis de conduire d’une province ou d’un territoire (de classe G ou 5) en règle, sans condition restrictive et sans infraction en matière de conduite qui limiterait l’entièreté de ses privilèges de conduite.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
          "4. La liste des établissements offrant des programmes d’études postsecondaires acceptables auprès des FAC pour les candidats PIES-MR se trouve à l’adresse suivante : Forces armées canadiennes Accréditations, Certifications et Équivalences (FAC ACE).",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "• Math appliquées de 11e / Sec V",
                  "• Cours de physique 11e / Sec V",
                ],
                experience: ["Permis de conduire provincial valide 2"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année d’études secondaires / Secondaire IV comprenant :",
                  "• Math appliquées de 10e / Sec IV",
                  "• Cours de sciences de 10e / Sec IV",
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
                  "Atteinte du NPC 3 comme 00327 Tech Élec-Opto (T) dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: [
                  "Atteinte du NPC 3 comme 00327 Tech Élec-Opto (T) dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le candidat doit détenir ou être en mesure d’obtenir un permis de conduire d’une province ou d’un territoire (de classe G ou 5) en règle, sans condition restrictive et sans infraction en matière de conduite qui limiterait l’entièreté de ses privilèges de conduite.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "5 ans",
      },
      {
        program: "PFS-MR",
        duration: "7 ans",
      },
    ],
  },
  {
    id: "00335",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN DENTAIRE",
    titleEn: "DENTAL TECHNICIAN",
    abbreviation: "TECH DENT",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Certificat NDAEB et permis en règle provincial requis, ou bien être inscrit aux études à temps plein (PESMR).",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1, 2", "RECL 1, 2", "MÉ 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Certificat du Bureau national d’examen d’assistance dentaire (NDAEB) 3, 4, 5",
                  "ET Permis en règle 6 pour agir en tant qu’assistant dentaire délivré par une autorité de réglementation canadienne provinciale ou territoriale 7",
                  "ET Lettre de l’autorité de réglementation professionnelle attestant que le candidat est 'en règle' (le cas échéant) 7",
                ],
                experience: [
                  "• Obtention du diplôme au cours des 12 derniers mois: Aucune expérience requise",
                  "OU",
                  "• Obtention du diplôme au-delà des 12 derniers mois: Au moins 900 heures d'expérience en clinique en tant qu'assistant dentaire ou hygiéniste dentaire au cours des deux dernières années 8, 9",
                ],
              },
            ],
          },
          {
            candidates: [
              "RECL 1, 2",
              "MÉ 1, 2 (avec antécédents de service comme GPM 00335 TECH DENT)",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Certificat du Bureau national d’examen d’assistance dentaire (NDAEB) 3, 4, 5",
                  "ET Permis en règle 6 pour agir en tant qu’assistant dentaire délivré par une autorité de réglementation canadienne provinciale ou territoriale 7",
                  "ET Lettre de l’autorité de réglementation professionnelle attestant que le candidat est 'en règle' (le cas échéant) 7",
                ],
                experience: [
                  "• Au moins 900 heures d’expérience en clinique en tant qu’assistant dentaire ou hygiéniste dentaire au cours des deux dernières années 8, 9",
                  "ET Atteinte du Niveau opérationnel de compétence (NOC) en tant que 00335 TECH DENT dans la F rég ou la P rés 10",
                ],
              },
            ],
          },
          {
            candidates: ["PESMR / PESMR Réserve 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans condition ou être présentement inscrit comme étudiant à temps plein dans un programme d’études à un établissement d’enseignement postsecondaire choisi par les FAC 11",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le test d’aptitude des Forces canadiennes (TAFC) s’ils ne l’ont pas déjà fait. Seuls les candidats PESMR sont tenus d’obtenir la note de passage du TAFC. Consulter la Feuille de travail – Affectations (FTA) pour connaître les notes de passages en vigueur. (Pour la Réserve, ils ne sont pas tenus d'obtenir la note de passage du CFAT/TAFC si déjà enrôlés).",
          "2. Conformément aux critères d’enrôlement/RECL/MÉ/PESMR en vigueur.",
          "3. Un candidat qui n’est qualifié/homologué qu’en tant qu’hygiéniste dentaire peut être admissible à une mutation/un enrôlement au GPM TECH DENT. Dans un tel cas, il est tenu de passer avec succès l’examen du BNEAD (NDAEB) et d’obtenir une homologation de niveau II comme assistant dentaire.",
          "4. Un candidat ayant fait ses études au Québec et qui n’a obtenu qu’une qualification comme assistant dentaire de niveau I du ministère de l’Éducation du Québec doit réussir des études ultérieures dans un programme d’études pour assistant dentaire de niveau II pour être admissible à l’examen du BNEAD.",
          "5. Consulter le site Web https://www.ndaeb.ca/index_F.php pour obtenir plus de renseignements sur les exigences en question.",
          "6. Par 'permis en règle sans restriction', on entend un permis complet, sans restriction et illimité d’agir comme assistant dentaire de niveau II dans une province ou un territoire du Canada.",
          "7. On trouve les autorités de réglementation provinciales/territoriales à l'adresse suivante: http://www.cdaa.ca/da-promotion/dental-assisting-regulatory-authorities/?lang=fr (Ne s'applique pas en Ontario, au Québec, aux T.N.-O. et au Nunavut).",
          "8. Le candidat doit détenir une lettre rédigée par ses employeurs précédents opérant son expérience clinique détaillée ainsi que le nombre d'heures travaillées.",
          "9. Si le candidat ne peut répondre aux critères d'expérience clinique en raison de service antérieur, son dossier doit être transmis pour ÉFA.",
          "10. Le niveau opérationnel de compétence (NOC) est défini dans la description du GPM TECH DENT.",
          "11. La liste des établissements postsecondaires participants au programme PESMR se trouve à l'adresse https://caface-rfacace.forces.gc.ca/.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "5 ans",
      },
      {
        program: "PFS-MR",
        duration: "8 ans",
      },
    ],
  },
  {
    id: "00337",
    medicalStandard: { v: 3, cv: 2, h: 2, g: 3, o: 3, a: 4, u: 5 },
    title: "OPÉRATEUR – CONTRÔLE AÉROSPATIAL",
    titleEn: "AEROSPACE CONTROL OPERATOR",
    abbreviation: "OP CA",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires avec mathématiques théoriques de 11e / Sec V (Idéal) ou 10e année / Secondaire IV avec mathématiques de niveau Sec IV (Acceptable).",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "• Math théoriques de 11e année / Sec V",
                  "• Tout cours de science de n'importe quel niveau",
                ],
                experience: [
                  "Détenir un permis de conduire provincial valide 3",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV comprenant :",
                  "• Math appliquées de 10e / Sec IV",
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
                  "Atteinte du Niveau opérationnel de compétence (NPC) comme 00337 OP CA dans la F rég 3",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année du secondaire / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau opérationnel de compétence (NPC) comme 00337 OP CA dans la F rég 3",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le candidat doit détenir ou être en mesure d’obtenir un permis de conduire d’une province ou d’un territoire (de classe G ou 5) en règle, sans condition restrictive.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
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
    id: "00339",
    medicalStandard: { v: 3, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "SAPEUR DE COMBAT",
    titleEn: "COMBAT ENGINEER",
    abbreviation: "SPR CBT",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires ou équivalent (Idéal) ou 10e année / Secondaire IV (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "MÉ 1", "RECL 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou équivalent.",
                  "• Note : La réussite d'un cours de math académiques de 12e année (math 536 : SN V/TS V au Québec) et d'un cours de physique peu importe le niveau est un atout.",
                ],
                experience: [
                  "Aucune expérience requise.",
                  "• Atout : Expérience/qualification civile en génie civil, menuiserie, forage, opération lourde, ou permis de conduire valide 2.",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année secondaire, Secondaire IV au Québec, ou équivalent.",
                  "• Note : La réussite d'un cours de math académiques de 10e année (math 436 : SN IV/TS IV) ou appliquées (math 426) et d'un cours de physique est un atout.",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou équivalent.",
                  "• Atout : Math 12e (536) / Physique.",
                ],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC) 3 dans 00339 SPR CBT dans la F rég ou la P rés des FAC, ou atout de QEL.",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année secondaire, Secondaire IV au Québec, ou équivalent.",
                  "• Atout : Math 10e / Physique.",
                ],
                experience: [
                  "Atteinte du niveau professionnel de compétence (NPC) 3 dans 00339 SPR CBT dans la F rég ou la P rés des FAC.",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le candidat doit détenir un permis de conduire d'une province/territoire (de classe G ou 5) en règle ne comprenant aucune condition ni limite.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
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
    id: "00349",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title: "AUMÔNIER",
    titleEn: "CHAPLAIN",
    abbreviation: "AUM",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Maîtrise en théologie/soins spirituels, baccalauréat de base et accréditation/endossement d'une tradition de foi requis.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["EDO 1, 2, 3", "RECL 1, 2, 3", "MÉ 1, 2, 3"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Baccalauréat 4 dans n'importe quel domaine d'études,",
                  "• Diplôme de maîtrise qui a pour but d’équiper et de développer un leader au sein d’une tradition de foi 5 en matière de soin et soutien spirituels (au moins de deux ans d’équivalence à temps plein) dans un établissement d’enseignement postsecondaire agréé 6.",
                  "• Pour le Québec : Diplôme d’études collégiales ou l'équivalent + Baccalauréat d'un établissement approuvé du Québec en théologie (B Th ou l'équivalent) ou n'importe quel baccalauréat + une maîtrise.",
                ],
                experience: [
                  "• Accrédité et reconnu comme un leader au sein d’une tradition de foi par l’autorité de gouvernance de cette même tradition qui exerce une supervision au Canada,",
                  "• Endossé comme aumônier par le CIAMC, entrevue et jugé apte par un comité présidé par le D Svc Aum,",
                  "• L’équivalent de minimum de deux années d’expérience à temps plein rémunérées à titre de leader accrédité au sein d’une tradition de foi.",
                ],
              },
            ],
          },
          {
            candidates: ["Études subventionnées (ES-PMNE) 1, 2, 12"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Baccalauréat dans l'un des domaines admissibles,",
                  "• Acceptation sans condition à un programme de maîtrise qui a pour but d'équiper et de développer un leader au sein d'une tradition de foi.",
                ],
                experience: [
                  "• Preuve d’être un candidat officiel en tant que leader au sein d’une tradition de foi,",
                  "• Endossement conditionnel par le CIAMC, entrevue et lettre d'assurance d'occuper un poste de travail supervisé.",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC). Un candidat du GPM 00349 AUM n’est pas tenu d’obtenir la note de passage des officiers du TAFC.",
          "2. Conformément aux critères d’enrôlement/RECL/MÉ/ES-PMNE en vigueur.",
          "3. Tous les candidats doivent d’abord communiquer avec le Directeur – Services d’aumônerie (D Svc Aum) afin de commencer le processus d’attestation par le comité interconfessionnel (CIAMC).",
          "4. Si maîtrise obtenue sans baccalauréat, évaluation spécifique.",
          "5. Un leader inclut les intervenants en matière de soin et soutien spirituels dans divers lieux (hôpital, prison, école, etc.).",
          "6. Accréditation par l'ATS ou équivalent.",
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
              "MSÉ 1, 2, 3",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Baccalauréat 4 dans n'importe quel domaine d'études,",
                  "• Diplôme de maîtrise qui a pour but d’équiper et de développer un leader au sein d’une tradition de foi 5 en matière de soin et soutien spirituels (au moins de deux ans d’équivalence à temps plein) dans un établissement d’enseignement postsecondaire agréé 6.",
                  "• Pour le Québec : Diplôme d’études collégiales ou l'équivalent + Baccalauréat d'un établissement approuvé du Québec en théologie (B Th ou l'équivalent) ou n'importe quel baccalauréat + une maîtrise.",
                ],
                experience: [
                  "• Accrédité et reconnu comme un leader au sein d’une tradition de foi par l’autorité de gouvernance de cette même tradition qui exerce une supervision au Canada,",
                  "• Endossé comme aumônier par le CIAMC, entrevue et jugé apte par un comité présidé par le D Svc Aum,",
                  "• L’équivalent de minimum de deux années d’expérience à temps plein rémunérées à titre de leader accrédité au sein d’une tradition de foi.",
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
                  "• Baccalauréat dans n’importe quel domaine,",
                  "• Acceptation sans condition à un programme de maîtrise qui a pour but d'équiper et de développer un leader.",
                ],
                experience: [
                  "• Attestation de reconnaissance comme candidat en tant qu’animateur de traditions confessionnelles.",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC). Un candidat du GPM 00349 AUM n’est pas tenu d’obtenir la note de passage des officiers du TAFC.",
          "2. Conformément aux critères d’enrôlement/RECL/MÉ/PIRO en vigueur.",
          "3. Tous les candidats doivent d’abord communiquer avec le Directeur – Services d’aumônerie (D Svc Aum) afin de commencer le processus d’attestation par le comité interconfessionnel (CIAMC).",
          "4. Si maîtrise sans baccalauréat, étude de cas.",
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
        duration: "12 ans",
      },
    ],
  },
  {
    id: "00366",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN GENIE DES ARMES",
    titleEn: "WEAPONS ENGINEERING TECHNICIAN",
    abbreviation: "TECH GA",
    requirements:
      "FORCE RÉGULIÈRE: Diplôme d’études secondaires avec mathématiques théoriques de 11e / Sec V et physique (Idéal) ou 10e année / Secondaire IV avec math théoriques Sec IV (Acceptable).",
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
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "• Mathématiques théoriques de 11e année / Sec V",
                  "• Un cours de physique de n'importe quel niveau",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire / Secondaire IV, comportant :",
                  "• Mathématiques théoriques de 10e année / Sec IV (CST 4, SN 4 ou TS 4)",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIES-MR 1"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Doit être admis sans conditions, ou être actuellement inscrit comme étudiant à temps plein dans un programme de formation en génie électronique, dans un des établissements postsecondaires choisis par les FAC 2",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. La liste des établissements postsecondaires et des programmes approuvés par le CAF, ainsi que les exigences individuelles associées, se trouve sur le portail FAC ACE.",
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
        duration: "6 ans",
      },
    ],
  },
  {
    id: "00368",
    medicalStandard: { v: 3, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "ARTILLEUR",
    titleEn: "ARTILLERYMAN",
    abbreviation: "ARTIL",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires (Idéal) ou 10e année / Secondaire IV (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou équivalent"],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: ["10e année d’études secondaires / Secondaire IV"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou équivalent"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) 2 dans 00368 ARTIL, 00008 ARTIL-DS, ou 00009 ARTIL-DA de la P rés ou de la F rég",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année d’études secondaires / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) 2 dans 00368 ARTIL, 00008 ARTIL-DS, ou 00009 ARTIL-DA de la P rés ou de la F rég",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent compléter le Test d’aptitude des Forces canadiennes (TAFC) si ce n’est déjà fait et répondre aux exigences actuelles du programme applicable.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
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
                education: ["Diplôme d’études secondaires ou équivalent"],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: ["10e année d’études secondaires / Secondaire IV"],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1 (qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou équivalent"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) 2 dans 00368 ARTIL, 00008 ARTIL-DS, ou 00009 ARTIL-DA de la P rés ou de la F rég",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année d’études secondaires / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) 2 dans 00368 ARTIL, 00008 ARTIL-DS, ou 00009 ARTIL-DA de la P rés ou de la F rég",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent compléter le Test d’aptitude des Forces canadiennes (TAFC) si ce n’est déjà fait et répondre aux exigences actuelles du programme applicable.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
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
    id: "00372",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN DE BLOC OPÉRATOIRE",
    titleEn: "OPERATING ROOM TECHNICIAN",
    abbreviation: "TECH BO",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d'un programme d'infirmier auxiliaire, autorisation provinciale en règle, cert. en soins peropératoires. Idéal: exp. peropératoire (>1500h).",
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
                  "• Diplôme d’un programme d’infirmier auxiliaire",
                  "• Détention d’une autorisation en règle de travailler comme infirmier auxiliaire autorisé/immatriculé émise par un organisme de réglementation provincial ou territorial 3, 4, 5",
                  "• Lettre de l’organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle » 5",
                  "• Certification comme infirmier auxiliaire autorisé/immatriculé en soins peropératoires",
                ],
                experience: [
                  "• Expérience actuelle comme infirmier auxiliaire autorisé/immatriculé en soins peropératoires",
                  "• Au moins 1 500 heures de pratique clinique au cours des deux dernières années",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "• Diplôme d’un programme d’infirmier auxiliaire",
                  "• Détention d’une autorisation en règle de travailler comme infirmier auxiliaire autorisé/immatriculé émise par un organisme de réglementation provincial ou territorial 3, 4, 5",
                  "• Lettre de l’organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle » 5",
                  "• Certification comme infirmier auxiliaire autorisé/immatriculé en soins peropératoires",
                ],
                experience: [
                  "• Avoir gradué dans les 12 derniers mois",
                  "• Aucune expérience minimum requise",
                ],
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
                level: "Acceptable",
                education: [
                  "• Diplôme d’un programme d’infirmier auxiliaire",
                  "• Détention d’une autorisation en règle de travailler comme infirmier auxiliaire autorisé/immatriculé émise par un organisme de réglementation provincial ou territorial 3, 4, 5",
                  "• Lettre de l’organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle » 5",
                ],
                experience: [
                  "• Avoir atteint le NPC6 comme 00372 TECH BO ou 00334-03 TECH MÉD - BO dans la F rég",
                  "• Au moins 1 500 heures de pratique clinique au cours des deux dernières années",
                ],
              },
            ],
          },
          {
            candidates: ["PIES-MR 1, 2, 7", "Candidat civil", "RECL", "MÉ"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Être accepté sans condition ou être présentement enrôlé comme étudiant à temps plein, dans un programme d’études d’infirmier auxiliaire autorisé/immatriculé 7 à un établissement postsecondaire sélectionné par les FAC",
                  "OU détenir :",
                  "  o Diplôme d’un programme d’infirmier auxiliaire",
                  "  o Une autorisation en règle de travailler comme infirmier auxiliaire autorisé/immatriculé émise par un organisme de réglementation provincial ou territorial 3, 4, 5",
                  "  o Lettre de l’organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle » 5 ; et",
                  "  o Être inscrit ou admissible à s'inscrire à un programme de soins infirmiers peropératoires 7, 8 dans un établissement postsecondaire sélectionné par les FAC",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Les candidats d’enrôlement direct (ED)/RECL/MÉ, pour initier une évaluation de reconnaissance des acquis, doivent soumettre une liste de documents requis via les services de santé des FAC.",
          "3. Par « permis en règle », on entend un permis complet, sans restriction et illimité d’agir comme infirmier auxiliaire/immatriculé ou TECH BO dans une province ou un territoire du Canada.",
          "4. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
          "5. La liste des établissements postsecondaires et des programmes approuvés par le CAF se trouve sur le portail FAC ACE.",
        ],
      },
      {
        force: "FORCE DE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1, 2", "MÉ 1, 2 (qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Diplôme d’un programme d’infirmier auxiliaire",
                  "• Détention d’une autorisation en règle de travailler comme infirmier auxiliaire ou territorial 3, 4, 5",
                  "• Lettre de l’organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle » 5",
                ],
                experience: [
                  "• Avoir atteint le NPC6 comme 00372 TECH BO ou 00334-03 TECH MÉD - BO dans la F rég",
                  "• Au moins 1 500 heures de pratique clinique au cours des deux dernières années",
                ],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1, 2", "RECL 1, 2", "MÉ 1, 2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "• Diplôme d’un programme d’infirmier auxiliaire",
                  "• Détention d’une autorisation en règle de travailler comme infirmier auxiliaire émise par un organisme de réglementation provincial ou territorial 3, 4, 5",
                  "• Lettre de l’organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle » 5",
                  "• Certification comme infirmier auxiliaire autorisé/immatriculé en soins peropératoires",
                ],
                experience: [
                  "• Expérience actuelle comme infirmier auxiliaire autorisé/immatriculé en soins peropératoires",
                  "• Au moins 1 500 heures de pratique clinique au cours des deux dernières années",
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
        program: "Enrôlement direct",
        duration: "6 ans",
      },
      {
        program: "PFS-MR",
        duration: "9 ans",
      },
    ],
  },
];
