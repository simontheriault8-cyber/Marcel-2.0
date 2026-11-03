import { JobEntry } from "./jobs.models";

export const JOBS_NCM_1: JobEntry[] = [
  {
    id: "00003",
    title: "SANS MÉTIER",
    titleEn: "NON-COMMISSIONED MEMBER",
    abbreviation: "MIL RANG",
    requirements:
      "Ce code indique qu'aucun métier n'a été sélectionné au dossier.",
    details: [],
    contracts: [],
  },
  {
    id: "00005",
    medicalStandard: { v: 3, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "MILITAIRE DU RANG BLINDÉS",
    abbreviation: "MR BLINDÉS",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires ou équivalent (Idéal) ou 10e année / Secondaire IV (Acceptable). Permis de conduire valide.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "MÉ 1", "RECL 1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou équivalent"],
                experience: [
                  "Permis de conduire d’une province/d’un territoire en règle 2",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Permis de conduire d’une province/d’un territoire en règle 2",
                ],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "MÉ 1", "RECL 1 (qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou équivalent"],
                experience: [
                  "Permis de conduire d’une province/d’un territoire en règle 2",
                  "Atteinte du Niveau professionnel de compétence (NPC) dans 00005 MR BLINDÉS",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Permis de conduire d’une province/d’un territoire en règle 2",
                  "Atteinte du Niveau professionnel de compétence (NPC) dans 00005 MR BLINDÉS",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le candidat doit détenir ou être en mesure d’obtenir un permis de conduire d’une province ou d’un territoire (de classe G ou 5) en règle, sans condition restrictive et sans infraction en matière de conduite qui limiterait l’entièreté de ses privilèges de conduite. Il est reconnu que certains candidats peuvent ne pas être admissibles à un permis pleinement gradué au moment de la demande en raison des règlements provinciaux/territoriaux relatifs à l’âge et aux délais. Ces candidats qui n’ont pas encore obtenu un permis pleinement gradué doivent le faire dès que la réglementation le permet, pendant ou après leur inscription.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
        ],
      },
      {
        force: "FORCE DE LA RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "MÉ 1", "RECL 1"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou équivalent"],
                experience: [
                  "Permis de conduire d’une province/d’un territoire en règle 2",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Permis de conduire d’une province/d’un territoire en règle 2",
                ],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "MÉ 1", "RECL 1 (qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou équivalent"],
                experience: [
                  "Permis de conduire d’une province/d’un territoire en règle 2",
                  "Atteinte du Niveau professionnel de compétence (NPC) dans 00005 MR BLINDÉS",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Permis de conduire d’une province/d’un territoire en règle 2",
                  "Atteinte du Niveau professionnel de compétence (NPC) dans 00005 MR BLINDÉS",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le candidat doit détenir ou être en mesure d’obtenir un permis de conduire d’une province ou d’un territoire (de classe G ou 5) en règle, sans condition restrictive et sans infraction en matière de conduite qui limiterait l’entièreté de ses privilèges de conduite. Il est reconnu que certains candidats peuvent ne pas être admissibles à un permis pleinement gradué au moment de la demande en raison des règlements provinciaux/territoriaux relatifs à l’âge et aux délais. Ces candidats qui n’ont pas encore obtenu un permis pleinement gradué doivent le faire dès que la réglementation le permet, pendant ou après leur inscription.",
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
    id: "00010",
    medicalStandard: { v: 3, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "FANTASSIN",
    abbreviation: "FANT",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires, de Secondaires V au Québec ou l’équivalent (Idéal) ou 10e année secondaire, Secondaire IV au Québec ou l’équivalent (Acceptable).",
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
                  "Diplôme d’études secondaires, de Secondaires V au Québec ou l’équivalent",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année secondaire, Secondaire IV au Québec ou l’équivalent",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat civil 1, 2",
              "RECL 1, 2",
              "MÉ 1, 2",
              "(tous en service actif ou avec service antérieur comme 00010 FANT)",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires, de Secondaires V au Québec ou l’équivalent",
                ],
                experience: [
                  "Avoir atteint le niveau opérationnel de compétence (NOC) 3 du GPM 00010 FANT dans la F rég ou la P rés",
                  "QEL (comme fantassin ou l’équivalent)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année secondaire, Secondaire IV au Québec ou l’équivalent",
                ],
                experience: [
                  "Avoir atteint le niveau opérationnel de compétence (NOC) 3 du GPM 00010 FANT dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC), s’ils ne l’ont pas déjà fait. Un candidat civil RECL ou MÉ qui n’a pas atteint le niveau opérationnel de compétence (NOC) comme 00010 FANT doit obtenir la note de passage du TAFC pour ce GPM. Se reporter à la Feuille de travail – Affectation (FTA) pour prendre connaissance des notes de passage en vigueur.",
          "2. Conformément aux critères d’enrôlement/RECL/MÉ en vigueur.",
          "3. Le niveau opérationnel de compétence (NOC) du GPM 00010 FANT se trouve dans la Description du GPM à l’adresse suivante: http://cmp-cpm.mil.ca/fr/soutien/personnel-militaire/dbpp-description-de-gpm.page.",
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
                  "Diplôme d’études secondaires, de Secondaires V au Québec ou l’équivalent",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année secondaire, Secondaire IV au Québec ou l’équivalent",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat civil 1, 2",
              "MÉ 1, 2",
              "MSÉ 1, 2",
              "(Tous en service actif ou avec service extérieur comme 00010 FANT)",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires, de Secondaires V au Québec ou l’équivalent",
                ],
                experience: [
                  "Avoir atteint au moin le NOC du GPM 00010 FANT dans la F rég ou la P rés",
                  "QEL (comme fantassin ou l’équivalent)",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année secondaire, Secondaire IV au Québec ou l’équivalent",
                ],
                experience: [
                  "Avoir atteint le niveau opérationnel de compétence (NOC) 3 du GPM 00010 FANT dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC), s’ils ne l’ont pas déjà fait. Un candidat civil RECL, MÉ ou MSÉ qui n’a pas atteint le niveau opérationnel de compétence (NOC) comme 00010 FANT doit obtenir la note de passage du TAFC pour ce GPM. Se reporter à la Feuille de travail – Affectation (FTA) pour prendre connaissance des notes de passage en vigueur.",
          "2. Conformément aux critères d’enrôlement/RECL/MÉ/MSÉ en vigueur.",
          "3. Le niveau opérationnel de compétence (NOC) du GPM 00010 FANT se trouve dans la Description du GPM à l’adresse suivante : http://cmp-cpm.mil.ca/fr/soutien/personnel-militaire/dbpp-description-de-gpm.page.",
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
    id: "00019",
    medicalStandard: { v: 3, cv: 2, h: 2, g: 2, o: 2, a: 2, u: 5 },
    title: "OPÉRATEUR DE DÉTECTEURS ÉLECTRONIQUES AÉROPORTÉS",
    abbreviation: "OP DÉA",
    requirements:
      "FORCE RÉGULIÈRE: 12e année ayant les mathématiques avancées (niveau 10), ou Secondaire V (Québec) avec les mathématiques 426 ou 436 / SN IV/TS IV (Acceptable).",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1,2", "RECL 1,2", "MÉ 1,2"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "12e année ayant les mathématiques avancées (niveau 10), ou Secondaire V (Québec) avec les mathématiques 426 ou 436 / SN IV/TS IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC), s’ils ne l’ont pas déjà fait. Consulter la Feuille de travail – Affectations (FTA) pour connaître les notes de passage en vigueur.",
          "2. Conformément aux critères d'enrôlement/RECL/MÉ en vigueur.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "7 ans",
      },
    ],
  },
  {
    id: "00099",
    medicalStandard: { v: 4, cv: 3, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "SPÉCIALISTE DU RENSEIGNEMENT",
    abbreviation: "S RENS",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Diplôme d’études secondaires ou diplôme de Secondaire V au Québec, comportant: Cours d’anglais ou de français de la 12e année ou du Secondaire V au Québec.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: [
              "Candidat civil 1, 2, 3, 4",
              "RECL 1, 2, 3, 4",
              "MÉ 1, 2, 3, 4",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou diplôme de Secondaire V au Québec, comportant :",
                  "o Cours d’anglais ou de français de la 12e année ou du Secondaire V au Québec",
                ],
                experience: [
                  "Au moins un an d’expérience à temps partiel ou à temps plein à un poste ayant trait au renseignement... OU Avoir suivi avec succès le cours Opérations de traitement des sources (AIMC)...",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Tout Baccalauréat, certificat, ou Diplôme d'études postsecondaire",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "11e année du secondaire, diplôme de Secondaire V au Québec ou l’équivalent, comportant :",
                  "o Cours d’anglais ou de français de la 11e année ou du Secondaire V au Québec",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat civil 1, 2, 3, 4",
              "RECL 1, 2, 3, 4",
              "MÉ 1, 2, 3, 4",
              "(tous en service ou avec service antérieur comme 00099 S RENS )",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou diplôme de Secondaire V au Québec",
                ],
                experience: [
                  "Doit avoir atteint le niveau opérationnel de compétence (NOC) 6 dans la F rég ou la P rés comme 00099 S RENS",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "11e année du secondaire, diplôme de Secondaire V au Québec ou l’équivalent",
                ],
                experience: [
                  "Doit avoir atteint le niveau opérationnel de compétence (NOC) 6 dans la F rég ou la P rés comme 00099 S RENS",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC), s’ils ne l’ont pas déjà fait. Les candidats civils, RECL et MÉ qui ont atteint le NOC comme 00099 S RENS ne sont pas tenus d’obtenir la note du passage du TAFC. Consulter la Feuille de travail – Affectations (FTA) pour connaître les notes de passage en vigueur.",
          "2. Conformément aux critères d'enrôlement/RECL/MÉ en vigueur.",
          "3. Tous les candidats doivent être en mesure d’atteindre une cote de sécurité de niveau 3 (Très secret). La demande doit être engagée par l’entremise de l’officier de sécurité de l’unité du candidat avant le début du cours 00099 S RENS .",
          "4. Les Normes d'aptitude physique au travail (NAPT) sont énoncées dans la description des spécifications de travail (DST) S RENS au lien suivant : https://collaboration cmp.forces.mil.ca/sites/MPG/DPGR/dpgr2/SpecMaint/Occupational_Specifications/OFS/INT%20 OP%2000099/OFS_INT%20OP_F_00099_Anx_E.docx",
          "5. Les équivalences acceptables du cours Opérations de traitement des sources (AIMC) sont les suivantes : cours HUMINT, cours Opérations HUMINT en campagne, ou cours Spécialiste de l’exploitation des sources.",
          "6. Le niveau opérationnel de compétence (NOC) est expliqué dans la description de spécifications de travail du GPM 00099 S RENS à l’adresse suivante : http://cmp-cpm.mil.ca/fr/soutien/personnel-militaire/dbpp-description-de-gpm.page",
        ],
      },
      {
        force: "FORCE DE LA RÉSERVE",
        candidateGroups: [
          {
            candidates: [
              "Candidat civil 1, 2, 3, 4",
              "RECL 1, 2, 3, 4",
              "MÉ 1, 2, 3, 4",
              "MSÉ 1, 2, 3, 4",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou diplôme de Secondaire V au Québec, comportant :",
                  "o Cours d’anglais ou de français de la 12e année ou du Secondaire V au Québec",
                ],
                experience: [
                  "Au moins un an d’expérience à temps partiel ou à temps plein à un poste ayant trait au renseignement... OU Avoir suivi avec succès le cours Opérations de traitement des sources (AIMC)...",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Tout Baccalauréat ou Diplôme d'études postsecondaire",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "11e année du secondaire, diplôme de Secondaire V au Québec ou l’équivalent, comportant :",
                  "o Cours d’anglais ou de français de la 11e année ou du Secondaire V au Québec",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat civil 1, 2, 3, 4",
              "RECL 1, 2, 3, 4",
              "MÉ 1, 2, 3, 4",
              "MSÉ 1, 2, 3, 4",
              "(tous en service ou avec service antérieur comme 00099 S RENS )",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou diplôme de Secondaire V au Québec",
                ],
                experience: [
                  "Doit avoir atteint le niveau opérationnel de compétence (NOC) 6 dans la F rég ou la P rés comme 00099 S RENS",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "11e année du secondaire, diplôme de Secondaire V au Québec ou l’équivalent",
                ],
                experience: [
                  "Doit avoir atteint le niveau opérationnel de compétence (NOC) 6 dans la F rég ou la P rés comme 00099 S RENS",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces canadiennes (TAFC), s’ils ne l’ont pas déjà fait. Les candidats civils, RECL et MÉ qui ont atteint le NOC comme 00099 S RENS ne sont pas tenus d’obtenir la note du passage du TAFC. Consulter la Feuille de travail – Affectations (FTA) pour connaître les notes de passage en vigueur.",
          "2. Conformément aux critères d'enrôlement/RECL/MÉ/MSÉ en vigueur.",
          "3. Tous les candidats doivent être en mesure d’atteindre une cote de sécurité de niveau 3 (Très secret). La demande doit être engagée par l’entremise de l’officier de sécurité de l’unité du candidat avant le début du cours 00099 S RENS .",
          "4. Les Normes d'aptitude physique au travail (NAPT) sont énoncées dans la description des spécifications de travail (DST) S RENS au lien suivant : https://collaboration cmp.forces.mil.ca/sites/MPG/DPGR/dpgr2/SpecMaint/Occupational_Specifications/OFS/INT%20 OP%2000099/OFS_INT%20OP_F_00099_Anx_E.docx",
          "5. Les équivalences acceptables du cours Opérations de traitement des sources (AIMC) sont les suivantes : cours HUMINT, cours Opérations HUMINT en campagne et cours Spécialiste de l’exploitation des sources.",
          "6. Le niveau opérationnel de compétence (NOC) est expliqué dans la description de spécifications de travail du GPM 00099 S RENS à l’adresse suivante : http://cmp-cpm.mil.ca/fr/soutien/personnel-militaire/dbpp-description-de-gpm.page",
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
    id: "00100",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN MÉTÉOROLOGIE",
    abbreviation: "TECH MÉT",
    requirements:
      "FORCE RÉGULIÈRE: 11e année / Secondaire V ou l'équivalent, comportant: mathématiques appliquées de 11e année / Sec V, et tout cours de chimie ou de physique de 11e année / Sec V.",
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
                  "o mathématiques appliquées de 11e année / Sec V",
                  "o Tout cours de chimie ou de physique de 11e année / Sec V",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "11e année / Secondaire V ou l’équivalent, comportant :",
                  "o mathématiques appliquées de 11e année / Sec V",
                  "o Tout cours de chimie ou de physique de 11e année / Sec V",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: [
                  "Doit avoir obtenu la qualification de grade Cplc pour le GPM 00100 TECH MÉT dans la F rég",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "11e année / Secondaire V ou l’équivalent, comportant :",
                  "o mathématiques appliquées de 11e année / Sec V",
                  "o Tout cours de chimie ou de physique de 11e année / Sec V",
                ],
                experience: [
                  "Doit avoir atteint le niveau opérationnel de compétence (NPC) 2 dans la F rég comme 00100 TECH MÉT",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
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
    id: "00105",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "MANŒUVRIER",
    abbreviation: "MAN",
    requirements:
      "FORCE RÉGULIÈRE & FORCE DE RÉSERVE: 10e année / Secondaire IV (Acceptable).",
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
                  "o mathématiques appliquées de 11e année / Sec V",
                ],
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
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) 2 du GPM MAN 00105",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
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
    id: "00109",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 3, o: 3, a: 5, u: 5 },
    title:
      "TECHNICIEN DES SYSTÈMES D’INFORMATION STRATÉGIQUES ET DE TÉLÉCOMMUNICATIONS AÉROSPATIALES",
    abbreviation: "TECH SITA",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: 10e année / Secondaire IV, comportant mathématiques appliquées, 10e année / Sec IV (Acceptable).",
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
                  "o Mathématiques académiques de 11e année / Sec V",
                  "o Physique de 11e année / Sec V",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, comportant :",
                  "o Mathématiques appliquées, 10e année / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PESMR 1", "Candidat civil", "RECL", "MÉ"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans conditions ou être présentement inscrit comme étudiant à temps plein dans un programme d’études à un établissement d’enseignement postsecondaire sélectionné par les FAC 2",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. La liste des établissements postsecondaires et des programmes approuvés par le CAF, ainsi que les exigences individuelles associées (y compris la durée et les crédits), sera mise à jour dans le Liste des groupes professionnels militaires (LGPM) sur le portail des Forces armées canadiennes Accréditations, Certifications et Équivalences (FAC ACE)",
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
                  "o Mathématiques académiques de 11e année / Sec V",
                  "o Physique de 11e année / Sec V",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, comportant :",
                  "o Mathématiques appliquées, 10e année / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. La liste des établissements postsecondaires et des programmes approuvés par le CAF, ainsi que les exigences individuelles associées (y compris la durée et les crédits), sera mise à jour dans le Liste des groupes professionnels militaires (LGPM) sur le portail des Forces armées canadiennes Accréditations, Certifications et Équivalences (FAC ACE)",
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
    id: "00114",
    medicalStandard: { v: 4, cv: 2, h: 2, g: 2, o: 2, a: 5, u: 5 },
    title: "OPÉRATEUR D’ÉQUIPMENT D’INFORMATION DE COMBAT (MARINE)",
    abbreviation: "OP ÉICM",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Études secondaires de 10e année, Secondaire IV au Québec ou l’équivalent.",
    details: [
      {
        force: "FORCE RÉGULIÈRE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1, 2", "MÉ 2", "MSÉ"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaire ou de Secondaire V au Québec, comportant :",
                  "o Mathématiques théoriques de 11e année ou mathématique 536 / SN V/TS V au Québec;",
                  "o Cours de physiques de 11e année ou de physique 534 au Québec",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "Études secondaires de 10e année, Secondaire IV au Québec ou l’équivalent",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat avec service antérieur 1, 2",
              "MÉ 1, 2",
              "MSÉ 1, 2",
              "(tous en service actif ou avec service antérieur en tant qu’ 00114 OP ÉICM)",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaire ou de Secondaire V au Québec",
                ],
                experience: [
                  "Atteinte du Niveau opérationnel de compétence (NOC) du GPM 00114 OP ÉICM dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Études secondaires de 10e année, Secondaire IV au Québec ou l’équivalent",
                ],
                experience: [
                  "Atteinte du Niveau opérationnel de compétence (NOC) du GPM 00114 OP ÉICM dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent subir le Test d’aptitude des Forces Canadiennes (TAFC), si ne l’ont pas déjà fait. Un candidat civil, RECL ou MÉ qui n’a pas atteint le NOC comme 00114 OP ÉICM doit obtenir la note de passage du TAFC. Consulter la Feuille de travail - Affectations (FTA) pour connaître les notes de passages en vigueur.",
          "2. Conformément aux critères d’enrôlement/RECL/MÉ en vigueur.",
          "3. Le Niveau opérationnel de compétence (NOC) du GPM 00114 OP ÉICM est défini dans la description du GPM à l’adresse suivante : http://cmp-cpm.mil.ca/fr/soutien/personnel-militaire/dbpp-description-de-gpm.page.",
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
                  "Secondary school graduation certificate or a Diplôme d’études secondaire ou de Secondaire V au Québec, comportant :",
                  "o Mathématiques théoriques de 11e année ou mathématique 536 / SN V/TS V au Québec;",
                  "o Cours de physiques de 11e année ou de physique 534 au Québec",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire, Secondaire IV au Québec ou l’équivalent",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Applicant with Former Service 1, 2",
              "OT 1, 2",
              "CT 1, 2",
              "SCT 1, 2",
              "(tous en service actif ou avec service antérieur en tant qu’ 00114 OP ÉICM)",
            ],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou de Secondaire V au Québec",
                ],
                experience: [
                  "Atteinte du Niveau opérationnel de compétence (NOC) du GPM 00114 OP ÉICM dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année du secondaire ou Secondaire IV au Québec ou l’équivalent",
                ],
                experience: [
                  "Atteinte du Niveau opérationnel de compétence (NOC) du GPM 00114 OP ÉICM dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Tous les candidats doivent passer le Test d’aptitude des Forces canadiennes (TAFC) s’ils ne l’ont pas déjà fait. Un candidat civil, RECL, MÉ ou MSÉ qui n’a pas atteint le NOC du GPM 00114 OP ÉICM doit obtenir la note de passage du TAFC pour ce GPM. Consulter la Feuille de travail - Affectations (FTA) pour connaître les notes de passages en vigueur.",
          "2. Conformément aux critères d’enrôlement/RECL/MÉ/MSÉ en vigueur.",
          "3. Le Niveau opérationnel de compétence (NOC) du GPM 00114 OP ÉICM est défini dans la description du GPM à l’adresse suivante : http://cmp-cpm.mil.ca/fr/soutien/personnel-militaire/dbpp-description-de-gpm.page.",
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
    id: "00115",
    medicalStandard: { v: 4, cv: 2, h: 2, g: 2, o: 2, a: 5, u: 5 },
    title: "OPÉRATEURS DE DÉTECTEURS ÉLECTRONIQUE MARITIMES",
    abbreviation: "OP DEM",
    requirements: "FORCE RÉGULIÈRE: 10e année / Secondaire IV.",
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
                  "o Mathématiques appliquées de 11e / Sec V",
                  "o Cours de physique de 11e / Sec V",
                ],
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
              "Candidat avec service antérieur 1",
              "RECL 1",
              "MÉ 1",
              "(qualifié)",
            ],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du niveau opérationnel de compétence (NPC) 2 ent tant qu’ 00115 OP DEM dans la F rég.",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
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
    id: "00120",
    medicalStandard: { v: 4, cv: 3, h: 2, g: 3, o: 3, a: 5, u: 5 },
    title: "SPÉCIALISTE DU RENSEIGNEMENT D’ORIGINE ÉLECTROMAGNÉTIQUE",
    abbreviation: "SPÉC ROEM",
    requirements:
      "FORCE RÉGULIÈRE: 10e année / Secondaire IV, comportant mathématiques appliquées de 10e année / Sec IV (Acceptable) OU Baccalauréat / Diplôme postsecondaire.",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE DE LA RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1, 2", "RECL 1, 2", "MÉ 1, 2"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent comportant :",
                  "o mathématiques appliquées de 11e année / Sec V",
                ],
                experience: [
                  "Expérience dans tous les programmes informatiques suivants dans le cadre des exigences de travail durant six mois au cours des trois dernières années :",
                  "o Excel de Microsoft",
                  "o PowerPoint de Microsoft",
                  "o Word de Microsoft",
                  "o Windows de Microsoft",
                ],
              },
              {
                level: "Acceptable",
                education: [
                  "Tout Baccalauréat ou Diplôme d'études postsecondaire",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, comportant :",
                  "o mathématiques appliquées de 10e année / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: [
              "Candidat civil 1, 2",
              "RECL 1, 2",
              "MÉ 1, 2",
              "(qualifié)",
            ],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: [
                  "Doit avoir atteint le niveau opérationnel de compétence (NPC) 3 dans la F rég ou la P rés comme 00120 SPÉC ROEM",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Doit avoir atteint le niveau opérationnel de compétence (NPC) 3 dans la F rég ou la P rés comme 00120 SPÉC ROEM",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent atteindre la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Tous les candidats doivent être en mesure d’obtenir une cote de sécurité de niveau III (Très Secret). L’Officier de sécurité de l’unité (OSU) du candidat doit faire la demande avant le début de l’instruction dans le GPM 00120 SPÉC ROEM (candidats par RECL ou MÉ); dans le cas d’un candidat civil, le même officier doit faire la demande d’obtention de la cote avant ou pendant l’instruction de la QMB.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "6 ans",
      },
    ],
  },
  {
    id: "00129",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN DES VÉHICULES",
    abbreviation: "TECH V",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: 10e année / Secondaire IV, comportant mathématiques appliquées de 10e année / Sec IV et Cours de sciences de10e / Sec IV.",
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
                  "o mathématiques appliquées de 11e année / Sec V",
                  "o Cours de physique 11e / Sec V",
                ],
                experience: ["Permis de conduire provincial valide2"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, comportant :",
                  "o mathématiques appliquées de 10e année / Sec IV",
                  "o Cours de sciences de10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: [
                  "Atteinte du NPC3 comme 00129 TECH V dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du NPC3 comme 00129 TECH V dans la F rég ou la P rés",
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
                  "Être accepté sans conditions et être présentement inscrit comme étudiant à temps plein dans un programme d’études à un établissement d’enseignement postsecondaire sélectionné par les FAC4",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Par « permis de conduire provincial valide », on entend un permis permettant de conduire un véhicule automobile, frappé d’aucune condition et conférant tous les privilèges de conduite.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
          "4. La liste des établissements postsecondaires et des programmes approuvés par le CAF, ainsi que les exigences individuelles associées (y compris la durée et les crédits), sera mise à jour dans le Liste des groupes professionnels militaires (LGPM) sur le portail des Forces armées canadiennes Accréditations, Certifications et Équivalences (FAC ACE)",
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
                  "o mathématiques appliquées de 11e année / Sec V",
                  "o Cours de physique de 11e / Sec V",
                ],
                experience: ["Permis de conduire provincial valide2"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, comportant :",
                  "o mathématiques appliquées de 10e année / Sec IV",
                  "o Cours de sciences de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou du Secondaire V au Québec",
                ],
                experience: [
                  "Atteinte du NPC3 comme 00129 TECH V dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du NPC3 comme 00129 TECH V dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Par « permis de conduire provincial valide », on entend un permis permettant de conduire un véhicule automobile, frappé d’aucune condition et conférant tous les privilèges de conduite.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
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
    id: "00130",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN D’ARMEMENT (TERRE)",
    abbreviation: "TECH A (T)",
    requirements:
      "FORCE RÉGULIÈRE: 10e année / Secondaire IV, comportant mathématiques appliquées de 10e année / Sec IV et Cours de sciences de 10e / Sec IV.",
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
                  "o mathématiques appliquées de 11e année / Sec V",
                  "o Cours de physique 11e / Sec V",
                ],
                experience: ["Permis de conduire provincial valide 2"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, comportant :",
                  "o mathématiques appliquées de 10e année / Sec IV",
                  "o Cours de sciences de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: ["Diplôme d’études secondaires ou l’équivalent"],
                experience: [
                  "Atteinte du NPC3,4 comme 00130 TECH A(T) dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du NPC3,4 comme 00130 TECH A(T) dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Par « permis de conduire provincial valide », on entend un permis permettant de conduire un véhicule automobile, frappé d’aucune condition et conférant tous les privilèges de conduite.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
          "4. Dans le cas d’un candidat de la P rés pour la F Reg, une ÉFA sera exigée.",
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
    id: "00134",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 2, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN DES MATÉRIAUX",
    abbreviation: "TECH MAT",
    requirements:
      "FORCE RÉGULIÈRE: 10e année / Secondaire IV, comportant mathématiques appliquées de 10e année / Sec IV et Cours de sciences de 10e / Sec IV.",
    details: [
      {
        force: "FORCE RÉGULIÈRE & FORCE RÉSERVE",
        candidateGroups: [
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou l’équivalent, comportant :",
                  "o mathématiques appliquées de 11e année / Sec V",
                  "o Cours de physique de 11e / Sec V",
                ],
                experience: ["Permis de conduire provincial valide2"],
              },
              {
                level: "Acceptable",
                education: [
                  "10e année / Secondaire IV, comportant :",
                  "o mathématiques appliquées de 10e année / Sec IV",
                  "o Cours de sciences de 10e / Sec IV",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Idéal",
                education: [
                  "Diplôme d’études secondaires ou du Secondaire V au Québec",
                ],
                experience: [
                  "Atteinte du NPC3 comme 00129 TECH V dans la F rég ou la P rés",
                ],
              },
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du NPC3 comme 00129 TECH V dans la F rég ou la P rés",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Par « permis de conduire provincial valide », on entend un permis permettant de conduire un véhicule automobile, frappé d’aucune condition et conférant tous les privilèges de conduite.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP).",
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
    id: "00135",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN SYSTÈMES AÉRONAUTIQUES",
    abbreviation: "TECH AÉRO",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Certificat d’école secondaire ou l’équivalent comportant Anglais 12e an/Sec V ou Physique Sec V et cours de mathématiques spécifiés (SN/TS/536/526/CEGEP 201).",
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
                  "Un diplôme d’un programme TEA‑M (technicien d’entretien d’aéronefs - maintenance) accrédité par Transports Canada 4",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable 5 (Option de formation en anglais)",
                education: [
                  "Certificat d’école secondaire ou l’équivalent, comportant :",
                  "o Anglais de 12e an / Sec V",
                  "ET",
                  "o Un des cours de mathématiques suivants :",
                  "  a. 12e annee / CEGEP 201 Appliquée ou Théoriques",
                  "  b. Séquence sciences naturelles (SN) Sec V",
                  "  c. Séquence technico-sciences (TS) Sec V",
                  "  d. Mathématiques 536",
                  "  e. Mathématiques 526",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable 5 (Option de formation en français)",
                education: [
                  "Certificat d’école secondaire ou l’équivalent, comportant :",
                  "o Physique Sec V",
                  "ET",
                  "o Un des cours de mathématiques suivants :",
                  "  a. Séquence sciences naturelles (SN) Sec V",
                  "  b. Séquence technico-sciences (TS) Sec V",
                  "  c. Mathématiques 536",
                  "  d. Mathématiques 526",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIES-MR 1", "Candidat civil", "RECL", "MÉ"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans conditions ou être présentement inscrit comme étudiant à temps plein dans un programme d’études à un établissement d’enseignement postsecondaire sélectionné par les FAC 2",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC)3 du GPM TECH AÉRO 00135",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. La liste des établissements offrant des programmes d’études postsecondaires acceptables auprès des FAC pour les candidats PIES-MR se trouve à l’adresse suivante : Forces armées canadiennes Accréditations, Certifications et Équivalences (FAC ACE). Les candidats qui ont déjà terminé des études postsecondaires collégiales ou universitaires peuvent être admissibles au statut «semi-spécialisé», en contournant une partie de la formation professionnelle requise. Les recruteurs sont encouragés à discuter de cette option avec leurs candidats.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
          "4. Les programmes accrédités par Transports Canada se trouvent à : Formation de base – Cours de formation approuvés/acceptables (actuellement actifs)",
          "5. Les exigences académiques en mathématiques, sciences et langues sont établies conformément aux normes de formation professionnelle définies par les établissements partenaires offrant le programme de formation tech aéro (PFTA). Cette norme d'admission fera l'objet d'un examen périodique au fur et à mesure de l'évolution du programme.",
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
                  "Un diplôme d’un programme TEA‑M (technicien d’entretien d’aéronefs - maintenance) accrédité par Transports Canada 3",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable 4 (Option de formation en anglais)",
                education: [
                  "Certificat d’école secondaire ou l’équivalent, comportant :",
                  "o Anglais de 12e an / Sec V",
                  "ET",
                  "o Un des cours de mathématiques suivants :",
                  "  a. 12e an / CEGEP 201 Appliquée ou Théoriques",
                  "  b. Séquence sciences naturelles (SN) Sec V",
                  "  c. Séquence technico-sciences (TS) Sec V",
                  "  d. Mathématiques 536",
                  "  e. Mathématiques 526",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable 4 (Option de formation en français)",
                education: [
                  "Certificat d’école secondaire ou l’équivalent, comportant :",
                  "o Physique Sec V",
                  "ET",
                  "o Un des cours de mathématiques suivants :",
                  "  a. Séquence sciences naturelles (SN) Sec V",
                  "  b. Séquence technico-sciences (TS) Sec V",
                  "  c. Mathématiques 536",
                  "  d. Mathématiques 526",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) 2 du GPM TECH AÉRO 00135",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
          "3. Les programmes accrédités par Transports Canada se trouvent à : Formation de base – Cours de formation approuvés/acceptables (actuellement actifs)",
          "4. Les exigences académiques en mathématiques, sciences et langues sont établies conformément aux normes de formation professionnelle définies par les établissements partenaires offrant le programme de formation tech aéro (PFTA). Cette norme d'admission fera l'objet d'un examen périodique au fur et à mesure de l'évolution du programme.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "5 ans",
      },
      {
        program: "PIES-MR",
        duration: "7 ans",
      },
    ],
  },
  {
    id: "00136",
    medicalStandard: { v: 4, cv: 2, h: 3, g: 3, o: 2, a: 5, u: 5 },
    title: "TECHNICIEN EN SYSTÈMES AVIONIQUES",
    abbreviation: "TECH AVIO",
    requirements:
      "FORCE RÉGULIÈRE & RÉSERVE: Certificat d’école secondaire ou l’équivalent comportant Anglais 12e an/Sec V ou Physique Sec V et cours de mathématiques spécifiés (SN/TS/536/526/CEGEP 201).",
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
                  "Un diplôme d’un programme TEA‑E (technicien d’entretien d’aéronefs - avionique) accrédité par Transports Canada 4",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable 5 (Option de formation en anglais)",
                education: [
                  "Certificat d’école secondaire ou l’équivalent, comportant :",
                  "o Anglais de 12e an / Sec V",
                  "ET",
                  "o Un des cours de mathématiques suivants :",
                  "  a. 12e an / CEGEP 201 Appliquée ou Théoriques",
                  "  b. Séquence sciences naturelles (SN) Sec V",
                  "  c. Séquence technico-sciences (TS) Sec V",
                  "  d. Mathématiques 536",
                  "  e. Mathématiques 526",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable 5 (Option de formation en français)",
                education: [
                  "Certificat d’école secondaire ou l’équivalent, comportant :",
                  "o Physique Sec V",
                  "ET",
                  "o Un des cours de mathématiques suivants :",
                  "  a. Séquence sciences naturelles (SN) Sec V",
                  "  b. Séquence technico-sciences (TS) Sec V",
                  "  c. Mathématiques 536",
                  "  d. Mathématiques 526",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["PIES-MR 1", "Candidat civil", "RECL", "MÉ"],
            requirements: [
              {
                level: "Acceptable",
                education: [
                  "Être accepté sans conditions ou être présentement inscrit comme étudiant à temps plein dans un programme d’études à un établissement d’enseignement postsecondaire sélectionné par les FAC 2",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC)3 du GPM TECH AVIO 00136",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. La liste des établissements offrant des programmes d’études postsecondaires acceptables auprès des FAC pour les candidats PIES-MR se trouve à l’adresse suivante : Forces armées canadiennes Accréditations, Certifications et Équivalences (FAC ACE). Les candidats qui ont déjà terminé des études postsecondaires collégiales ou universitaires peuvent être admissibles au statut «semi-spécialisé», en contournant une partie de la formation professionnelle requise. Les recruteurs sont encouragés à discuter de cette option avec leurs candidats.",
          "3. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
          "4. Les programmes accrédités par Transports Canada se trouvent à : Formation de base – Cours de formation approuvés/acceptables (actuellement actifs)",
          "5. Les exigences académiques en mathématiques, sciences et langues sont établies conformément aux normes de formation professionnelle définies par les établissements partenaires offrant le programme de formation tech aéro (PFTA). Cette norme d'admission fera l'objet d'un examen périodique au fur et à mesure de l'évolution du programme.",
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
                  "Un diplôme d’un programme TEA‑E (technicien d’entretien d’aéronefs - avionique) accrédité par Transports Canada 4",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable 4 (Option de formation en anglais)",
                education: [
                  "Certificat d’école secondaire ou l’équivalent, comportant :",
                  "o Anglais de 12e an / Sec V",
                  "ET",
                  "o Un des cours de mathématiques suivants :",
                  "  a. 12e an / CEGEP 201 Appliquée ou Théoriques",
                  "  b. Séquence sciences naturelles (SN) Sec V",
                  "  c. Séquence technico-sciences (TS) Sec V",
                  "  d. Mathématiques 536",
                  "  e. Mathématiques 526",
                ],
                experience: ["Aucune expérience requise"],
              },
              {
                level: "Acceptable 4 (Option de formation en français)",
                education: [
                  "Certificat d’école secondaire ou l’équivalent, comportant :",
                  "o Physique Sec V",
                  "ET",
                  "o Un des cours de mathématiques suivants :",
                  "  a. Séquence sciences naturelles (SN) Sec V",
                  "  b. Séquence technico-sciences (TS) Sec V",
                  "  c. Mathématiques 536",
                  "  d. Mathématiques 526",
                ],
                experience: ["Aucune expérience requise"],
              },
            ],
          },
          {
            candidates: ["Candidat civil 1", "RECL 1", "MÉ 1", "(qualifié)"],
            requirements: [
              {
                level: "Acceptable",
                education: ["10e année / Secondaire IV"],
                experience: [
                  "Atteinte du Niveau professionnel de compétence (NPC) 2 du GPM TECH AVIO 00136",
                ],
              },
            ],
          },
        ],
        notes: [
          "1. Le cas échéant, les candidats doivent rencontrer la norme minimale applicable du Test d’aptitude des Forces canadiennes (TAFC) pour le programme concerné.",
          "2. Le Niveau professionnel de compétence (NPC) est décrit dans chaque description de GPM, au lien suivant: Directeur – Besoins en production du personnel (DBPP)",
          "3. Les programmes accrédités par Transports Canada se trouvent à : Formation de base – Cours de formation approuvés/acceptables (actuellement actifs)",
          "4. Les exigences académiques en mathématiques, sciences et langues sont établies conformément aux normes de formation professionnelle définies par les établissements partenaires offrant le programme de formation tech aéro (PFTA). Cette norme d'admission fera l'objet d'un examen périodique au fur et à mesure de l'évolution du programme.",
        ],
      },
    ],
    contracts: [
      {
        program: "Enrôlement direct",
        duration: "5 ans",
      },
      {
        program: "PIES-MR",
        duration: "7 ans",
      },
    ],
  },
];
