import { ManualCriterion } from "./criteria.models";

export const CRITERIA_SECONDAIRE_SPECIALISES: ManualCriterion[] = [
    {
      id: "des_12e_annee",
      label: "DES/12e années complété",
      labelEn: "High School Diploma / Grade 12 completed",
      category: "Année scolaire",
    },
    {
      id: "aens",
      label: "AENS (Attestation d'équivalence de niveau de scolarité)",
      labelEn: "GED (General Educational Development / Equivalency)",
      category: "Année scolaire",
    },
    {
      id: "sec4_24_credits",
      label: "24 crédit de sec 4/10e années complété",
      labelEn: "24 Secondary 4 / Grade 10 credits completed",
      category: "Année scolaire",
    },
    {
      id: "histoire_sec4",
      label: "Histoire sec 4",
      labelEn: "Secondary 4 / Grade 10 History",
      category: "Histoire",
    },
    {
      id: "francais_sec4_10e",
      label: "Français ou Anglais de sec 4/10e année",
      labelEn: "Grade 10 / Sec 4 French or English",
      category: "Langue",
    },
    {
      id: "francais_sec5_11e",
      label: "Français ou Anglais de sec 5/11e année",
      labelEn: "Grade 11 / Sec 5 French or English",
      category: "Langue",
    },
    {
      id: "anglais_sec5_12e",
      label: "Anglais de sec 5 / 12 e année",
      labelEn: "Grade 12 / Sec 5 English",
      category: "Langue",
    },
    {
      id: "etude_anglais",
      label: "Étude en anglais",
      labelEn: "Education in English",
      category: "Langue",
    },
    {
      id: "etude_hors_canada",
      label: "Étude hors Canada",
      labelEn: "Education outside Canada",
      category: "Langue",
    },
    {
      id: "sci_tech4_sci10",
      label: "Science et technologie 4e/Science de 10e année",
      labelEn: "Science and Technology Sec 4 / Grade 10 Science",
      category: "Science",
    },
    {
      id: "chimie_sec5_11e",
      label: "Chimie de sec 5/11e année",
      labelEn: "Chemistry Sec 5 / Grade 11 Chemistry",
      category: "Science",
    },
    {
      id: "physique_sec5_11e",
      label: "Physique de sec 5/11e année",
      labelEn: "Physics Sec 5 / Grade 11 Physics",
      category: "Science",
    },
    {
      id: "info_sec5_12e",
      label: "Cours d'informatique de sec 5/12e année",
      labelEn: "Computer Science Sec 5 / Grade 12",
      category: "Informatique",
    },
    { id: "cs_autre_dep", label: "Autre DEP", labelEn: "Other Vocational Diploma (DEP / DVS)", category: "Cours spécialisés" },
    { id: "cs_autre_dec", label: "Autre DEC", labelEn: "Other College Diploma (DEC / DCS)", category: "Cours spécialisés" },
    {
      id: "cs_photo_multimedia",
      label:
        "DEC en photographie, en photojournalisme, multimédia ou conception graphique",
      labelEn:
        "College Diploma in Photography, Photojournalism, Multimedia or Graphic Design",
      category: "Cours spécialisés",
    },
    {
      id: "cs_sec_incendie",
      label: "DEP/DEC en Technique de sécurité incendie",
      labelEn: "Vocational or College Diploma in Fire Safety Technology",
      category: "Cours spécialisés",
    },
    {
      id: "cs_tech_lab_med",
      label:
        "Diplôme dans un programme agréé de Technologie de laboratoire médical (DEC en technologie d'analyses biomédicales)",
      labelEn:
        "Accredited Medical Laboratory Technology Diploma (Biomedical Laboratory Technology)",
      category: "Cours spécialisés",
    },
    {
      id: "cs_tech_radio_med",
      label:
        "Diplôme dans un programme agréé de Technologie radiologique médicale (DEC en technologie de radiodiagnostic)",
      labelEn:
        "Accredited Medical Radiological Technology Diploma (Diagnostic Radiologic Technology)",
      category: "Cours spécialisés",
    },
    {
      id: "cs_tech_ing_biomed",
      label:
        "Diplôme de technologie accrédité en ingénierie biomédicale délivré par un établissement canadien (aucun au Québec)",
      labelEn:
        "Accredited Canadian Diploma of Technology in Biomedical Engineering",
      category: "Cours spécialisés",
    },
    {
      id: "cs_tech_policieres",
      label: "Techniques policières",
      labelEn: "College Diploma in Police Technology",
      category: "Cours spécialisés",
    },
    {
      id: "cs_dep_cuisine",
      label: "DEP en cuisine",
      labelEn: "Vocational Diploma in Professional Cooking",
      category: "Cours spécialisés",
    },
    {
      id: "cs_etude_musique",
      label: "Études postsecondaire en musique",
      labelEn: "Post-secondary Studies in Music",
      category: "Cours spécialisés",
    },
    {
      id: "cs_dep_refrigeration",
      label: "DEP en réfrigération",
      labelEn: "Vocational Diploma in Refrigeration and Air Conditioning",
      category: "Cours spécialisés",
    },
    {
      id: "cs_dep_electricite",
      label: "DEP en électricité",
      labelEn: "Vocational Diploma in Electricity",
      category: "Cours spécialisés",
    },
    {
      id: "cs_dep_plomberie_chauffage",
      label: "DEP en plomberie et chauffage",
      labelEn: "Vocational Diploma in Plumbing and Heating",
      category: "Cours spécialisés",
    },
    {
      id: "cs_aec_eaux",
      label: "AEC en traitement des eaux",
      labelEn: "Attestation / Certificate of College Studies in Water Treatment",
      category: "Cours spécialisés",
    },
    {
      id: "cs_dep_charpenterie",
      label: "DEP en charpenterie-menuiserie",
      labelEn: "Vocational Diploma in Carpentry and Woodworking",
      category: "Cours spécialisés",
    },
    {
      id: "cs_cert_assist_dentaire",
      label:
        "Certificat du Bureau national d'examen d'assistance dentaire (pas possible au Québec)",
      labelEn:
        "National Dental Assisting Examining Board Certificate (NDAEB)",
      category: "Cours spécialisés",
    },
    {
      id: "cs_dep_arpentage_topo",
      label: "DEP en arpentage et topographie",
      labelEn: "Vocational Diploma in Surveying and Topography",
      category: "Cours spécialisés",
    },
    {
      id: "cs_dep_sante_infirmiers",
      label: "DEP en Santé, assistance et soins infirmiers",
      labelEn: "Vocational Diploma in Health, Assistance and Nursing (LPN)",
      category: "Cours spécialisés",
    },
    {
      id: "cs_dip_cyber",
      label:
        "Diplôme d'études postsecondaire dans un domaine associé à la cybersécurité",
      labelEn:
        "Post-secondary Diploma in a Cybersecurity-related Field",
      category: "Cours spécialisés",
    },
    {
      id: "cs_dip_genie_sci_app",
      label:
        "Diplôme d’études postsecondaires en génie, en technologie du génie ou en sciences appliquées",
      labelEn:
        "Post-secondary Diploma in Engineering, Engineering Technology or Applied Sciences",
      category: "Cours spécialisés",
    },
    {
      id: "cs_cert_soins_param",
      label:
        "Certificat ou diplôme dans un programme de formation en soins paramédicaux agréé ou équivalent",
      labelEn:
        "Accredited Paramedic Training Certificate or Diploma",
      category: "Cours spécialisés",
    },
    {
      id: "cs_tea_m",
      label:
        "Un diplôme d’un programme TEA‑M (technicien d’entretien d’aéronefs - maintenance) accrédité par Transports Canada",
      labelEn:
        "Transport Canada Accredited AME-M (Aircraft Maintenance Engineer - Maintenance) Diploma",
      category: "Cours spécialisés",
    },
    {
      id: "cs_tea_e",
      label:
        "Un diplôme d’un programme TEA‑E (technicien d’entretien d’aéronefs - avionique) accrédité par Transports Canada",
      labelEn:
        "Transport Canada Accredited AME-E (Aircraft Maintenance Engineer - Avionics) Diploma",
      category: "Cours spécialisés",
    },
    {
      id: "cs_tea_s",
      label:
        "Un diplôme d’un programme TEA‑S (technicien d’entretien d’aéronefs - structures) accrédité par Transports Canada",
      labelEn:
        "Transport Canada Accredited AME-S (Aircraft Maintenance Engineer - Structures) Diploma",
      category: "Cours spécialisés",
    }
];
