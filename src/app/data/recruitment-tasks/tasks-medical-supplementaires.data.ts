import { Task } from "./recruitment-tasks.models";

export const TASKS_MEDICAL_SUPPLEMENTAIRES: Task[] = [
    {
      nameFr: "Questionnaire sur les médicaments en vente libre",
      nameEn: "Over-the-Counter Medication Questionnaire",
      documents: [
        {
          nameFr: "Questionnaire sur les médicaments",
          nameEn: "Medication Questionnaire",
          reasons: [
            {
              id: "med_expire",
              labelFr: "Expiré",
              labelEn: "Expired",
              instructionFr:
                "Le questionnaire sur les médicaments est expiré. Veuillez compléter un nouveau questionnaire dans votre portail.",
              instructionEn:
                "The medication questionnaire has expired. Please complete a new questionnaire in your portal.",
              logNoteFr: "Questionnaire sur les médicaments expiré",
            },
            {
              id: "med_incomp",
              labelFr: "Incomplet",
              labelEn: "Incomplete",
              instructionFr:
                "Le formulaire est incomplet. Veuillez le compléter à nouveau dans votre portail.",
              instructionEn:
                "The form is incomplete. Please complete it again in your portal.",
              logNoteFr: "QD mal rempli",
            },
            {
              id: "med_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez retourner dans votre portail et le compléter.",
              instructionEn:
                "The document is not in your file. Please return to your portal and complete it.",
              logNoteFr: "Aucun QD au dossier",
            },
            {
              id: "med_no_res",
              labelFr: "Tâche complétée sans résultat",
              labelEn: "Task completed without result",
              instructionFr:
                "La tâche apparaît comme complétée mais aucun résultat n'est enregistré. Veuillez compléter la tâche à nouveau dans votre portail.",
              instructionEn:
                "The task appears as completed, but no result is recorded. Please complete the task again in your portal.",
              logNoteFr:
                "Le tâche du QD est complétée mais il n'y a pas de résultat au dossier",
            },
            {
              id: "med_prescrits",
              labelFr: "Médicaments prescrits inclus",
              labelEn: "Prescribed medications included",
              instructionFr:
                "Ce formulaire est réservé aux médicaments en vente libre (sans ordonnance). Veuillez retirer tout médicament prescrit par un médecin et soumettre le formulaire à nouveau.",
              instructionEn:
                "This form is reserved for over-the-counter (non-prescription) medications. Please remove any medication prescribed by a doctor and submit the form again.",
              logNoteFr:
                "Médicaments prescrits inscrits dans le questionnaire sur les médicaments en vente libre",
            },
          ],
        },
        {
          nameFr: "Document inacceptable",
          nameEn: "Unacceptable document",
          reasons: [
            {
              id: "med_doc_invalide",
              labelFr: "Mauvais document soumis",
              labelEn: "Wrong document submitted",
              instructionFr:
                "Le document soumis n'est pas le questionnaire sur les médicaments. Veuillez compléter la tâche dans votre portail.",
              instructionEn:
                "The submitted document is not the medication questionnaire. Please complete the task in your portal.",
              logNoteFr:
                "Mauvais document soumis pour le questionnaire sur les médicaments",
            },
          ],
        },
      ],
    },
    {
      nameFr: "Questionnaire médical - DND 4585",
      nameEn: "Medical Questionnaire - DND 4585",
      documents: [
        {
          nameFr: "Questionnaire médical - DND 4585",
          nameEn: "Medical Questionnaire - DND 4585",
          reasons: [
            {
              id: "medq_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez retourner dans votre portail et le compléter.",
              instructionEn:
                "The document is not in your file. Please return to your portal and complete it.",
              logNoteFr: "Aucun questionnaire médical au dossier",
            },
          ],
        },
        {
          nameFr: "Document inacceptable",
          nameEn: "Unacceptable document",
          reasons: [
            {
              id: "medq_doc_invalide",
              labelFr: "Mauvais document soumis",
              labelEn: "Wrong document submitted",
              instructionFr:
                "Le document soumis n'est pas le questionnaire médical. Veuillez compléter la tâche dans votre portail.",
              instructionEn:
                "The submitted document is not the medical questionnaire. Please complete the task in your portal.",
              logNoteFr:
                "Mauvais document soumis pour le questionnaire médical",
            },
            {
              id: "medq_mauvais_format",
              labelFr: "Mauvais format de fichier",
              labelEn: "Wrong file format",
              instructionFr:
                "Le fichier soumis n'est pas dans un format accepté. Le seul format de fichier accepté pour le questionnaire médical est le format PDF. Veuillez convertir ou enregistrer votre document en format PDF et le téléverser à nouveau sur votre portail.",
              instructionEn:
                "The submitted file is not in an accepted format. The only accepted file format for the medical questionnaire is PDF. Please convert or save your document as a PDF and upload it again to your portal.",
              logNoteFr: "Mauvais format de fichier pour le questionnaire médical (doit être PDF)",
            },
          ],
        },
      ],
    },
    {
      nameFr: "Documents Supplémentaires",
      nameEn: "Additional Documents",
      documents: [
        {
          nameFr: "Curriculum vitae (CV)",
          nameEn: "Curriculum Vitae (CV)",
          reasons: [
            {
              id: "doc_supp_cv",
              labelFr: "Curriculum vitae (CV) récent à jour",
              labelEn: "Recent up-to-date Curriculum Vitae (CV)",
              instructionFr:
                "Veuillez nous fournir un Curriculum Vitae (CV) récent à jour en répondant à ce courriel.",
              instructionEn:
                "Please provide a recent up-to-date Curriculum Vitae (CV) by replying to this email.",
              logNoteFr: "CV récent à jour demandé",
              isAdditionalDoc: true,
            },
          ],
        },
        {
          nameFr: "Permis d'exercice / Licence professionnelle",
          nameEn: "Practice Permit / Professional License",
          reasons: [
            {
              id: "doc_supp_permis",
              labelFr: "Permis d'exercice ou licence professionnelle sans restriction",
              labelEn: "Unrestricted practice permit or professional license",
              instructionFr:
                "Veuillez nous fournir une copie de votre permis d'exercice ou licence professionnelle active et sans restriction en répondant à ce courriel.",
              instructionEn:
                "Please provide a copy of your active and unrestricted practice permit or professional license by replying to this email.",
              logNoteFr: "Permis d'exercice / licence professionnelle demandé",
              isAdditionalDoc: true,
            },
          ],
        },
        {
          nameFr: "Lettre de membre en règle",
          nameEn: "Good Standing Letter",
          reasons: [
            {
              id: "doc_supp_membre_regle",
              labelFr: "Lettre de l'autorité réglementaire attestant l'état « en règle »",
              labelEn: "Letter from regulatory body confirming 'good standing'",
              instructionFr:
                "Veuillez nous fournir une lettre officielle de votre ordre ou autorité réglementaire professionnelle attestant que vous êtes membre en règle en répondant à ce courriel.",
              instructionEn:
                "Please provide an official letter from your professional regulatory body confirming that you are a member in good standing by replying to this email.",
              logNoteFr: "Lettre de membre en règle demandée",
              isAdditionalDoc: true,
            },
          ],
        },
        {
          nameFr: "Certificat / Attestation de spécialité",
          nameEn: "Specialty Certificate / Attestation",
          reasons: [
            {
              id: "doc_supp_certificat_specialite",
              labelFr: "Certificat ou attestation officielle de spécialité (BNED, CCAMC, Collège Royal, etc.)",
              labelEn: "Official specialty certificate or attestation (NDEB, CACMS, Royal College, etc.)",
              instructionFr:
                "Veuillez nous fournir une attestation ou certificat officiel de votre spécialité médicale ou professionnelle en répondant à ce courriel.",
              instructionEn:
                "Please provide an official attestation or certificate of your medical or professional specialty by replying to this email.",
              logNoteFr: "Certificat de spécialité demandé",
              isAdditionalDoc: true,
            },
          ],
        },
        {
          nameFr: "Preuve d'expérience spécifique",
          nameEn: "Proof of Specific Experience",
          reasons: [
            {
              id: "doc_supp_preuve_experience",
              labelFr: "Preuve d'expérience spécifique (gestion, portfolio, accréditation)",
              labelEn: "Proof of specific experience (management, portfolio, accreditation)",
              instructionFr:
                "Veuillez nous fournir un document justificatif d'expérience ou d'accréditation spécifique requise pour votre profession en répondant à ce courriel.",
              instructionEn:
                "Please provide documentary proof of specific experience or accreditation required for your profession by replying to this email.",
              logNoteFr: "Preuve d'expérience spécifique demandée",
              isAdditionalDoc: true,
            },
          ],
        },
        {
          nameFr: "Relevés de notes à l'étranger",
          nameEn: "Foreign transcripts",
          reasons: [
            {
              id: "doc_supp_releves_etrangers",
              labelFr: "Relevé de notes officiel de l'établissement d'enseignement à l'étranger",
              labelEn: "Official foreign transcript",
              instructionFr:
                "Merci de nous avoir fourni votre évaluation comparative de vos études. Par contre, pour confirmer votre admissibilité académique aux métiers que vous avez choisis, nous aurons besoin de vos relevés de notes étrangers originaux s'ils sont écrits en français ou en anglais. Sinon, veuillez les faire traduire avant de nous les envoyer en répondant à ce courriel.",
              instructionEn:
                "Thank you for providing your comparative evaluation of your studies. However, to confirm your academic eligibility for the occupations you have chosen, we will need your original foreign transcripts if they are written in French or English. Otherwise, please have them translated before sending them to us by replying to this email.",
              logNoteFr:
                "Demande de relevés de notes étrangers",
              isAdditionalDoc: true,
            },
          ],
        },
        {
          nameFr: "Preuve de libération d'une armée étrangère",
          nameEn: "Proof of release from a foreign military",
          reasons: [
            {
              id: "doc_supp_liberation_armee_etrangere",
              labelFr: "Preuve de libération ou de fin de service d'une armée étrangère",
              labelEn: "Proof of release or end of service from a foreign military",
              instructionFr:
                "Vous devez fournir une preuve de libération ou de fin de service de l'armée étrangère. Veuillez envoyer cette preuve en répondant à ce courriel.",
              instructionEn:
                "You must provide proof of release or end of service from the foreign military. Please send this proof by replying to this email.",
              logNoteFr: "Preuve de libération d'une armée étrangère demandée",
              isAdditionalDoc: true,
            },
          ],
        },
        {
          nameFr: "Demande de service antérieur dans les Forces armées canadiennes",
          nameEn: "Prior service request in the Canadian Armed Forces",
          reasons: [
            {
              id: "doc_supp_service_anterieur_fac",
              labelFr: "Demande de vérification de service antérieur dans les Forces armées canadiennes",
              labelEn: "Request for verification of prior service in the Canadian Armed Forces",
              instructionFr:
                "Avez-vous du service antérieur dans les Forces armées canadiennes, que ce soit comme membre de la Régulière ou de la Réserve. Veuillez nous transmettre votre réponse directement en réponse à ce courriel.",
              instructionEn:
                "Do you have prior service in the Canadian Armed Forces, either as a member of the Regular Force or the Reserve? Please send us your answer by replying directly to this email.",
              logNoteFr: "Demande de vérification de service antérieur dans les FAC demandée",
              isAdditionalDoc: true,
            },
          ],
        },
        {
          nameFr: "Lettre d'admission dans un établissement scolaire",
          nameEn: "Letter of admission from an educational institution",
          reasons: [
            {
              id: "doc_subv_admission",
              labelFr: "Lettre d'admission officielle dans un établissement scolaire agréé",
              labelEn: "Official letter of admission from an accredited educational institution",
              instructionFr:
                "Veuillez nous fournir votre lettre d'admission officielle confirmant votre inscription dans un établissement scolaire agréé pour votre programme d'études subventionnées en répondant à ce courriel.",
              instructionEn:
                "Please provide your official letter of admission confirming your enrollment in an accredited educational institution for your subsidized study program by replying to this email.",
              logNoteFr: "Lettre d'admission dans un établissement scolaire demandée",
              isAdditionalDoc: true,
            },
          ],
        },
      ],
    }
];

export const GESTIONNAIRE_TASKS_DATA: Task[] = [
      // Réception d'un postulant
      {
        section: "Réception d'un postulant",
        nameFr: "Premier contact",
        nameEn: "First contact",
        documents: [],
      },
      {
        section: "Réception d'un postulant",
        nameFr: "Évaluation médicale",
        nameEn: "Medical evaluation",
        documents: [],
      },
      // Suivi de dossier
      {
        section: "Suivi de dossier",
        nameFr: "Avis de fermeture",
        nameEn: "Notice of file closure",
        documents: [],
      },
      // Retour PSPS
      {
        section: "Retour PSPS",
        nameFr: "Annexe Q",
        nameEn: "Annex Q",
        documents: [],
      },
      // Courriel d'offre
      {
        section: "Courriel d'offre",
        nameFr: "Offre normale",
        nameEn: "Standard offer",
        documents: [],
      },
      {
        section: "Courriel d'offre",
        nameFr: "Offre études subventionnées",
        nameEn: "Subsidized education offer",
        documents: [],
      },
      {
        section: "Courriel enrôlement",
        nameFr: "Rappel cérémonie d'assermentation",
        nameEn: "Swearing-in ceremony reminder",
        documents: [],
      },
    ];
