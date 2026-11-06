import { Task } from "./recruitment-tasks.models";

export const TASKS_SCOLARITE: Task[] = [
    {
      nameFr:
        "Relevés de notes et diplômes officiels canadiens ou évaluation comparative des études canadiennes",
      nameEn:
        "Transcripts / Diplomas or Comparative Evaluation of Canadian Studies",
      documents: [
        {
          nameFr: "Relevé d'apprentissage",
          nameEn: "Transcript",
          reasons: [
            {
              id: "relev_flou",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Relevé d’apprentissage flou",
            },
            {
              id: "relev_incomp",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, il manque des pages ou le document n’est pas totalement visible. Veuillez téléverser une ou plusieurs photos du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, pages are missing, or it is not fully visible. Please upload one or more photos of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Relevé d’apprentissage incomplet",
            },
            {
              id: "relev_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez prendre une photo et la téléverser. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles. Vous pouvez en faire la demande ici si vous ne l’avez pas : https://formulaires-consultations.education.gouv.qc.ca/dev_ti/412_demande_releves_diplomes_secondaires/",
              instructionEn:
                "The document is not in your file. Please take a photo and upload it. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Aucun relevé d’apprentissage au dossier",
            },
            {
              id: "relev_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour du relevé d’apprentissage",
            },
          ],
        },
        {
          nameFr: "Lettre d'admission sans condition Université civil canadienne",
          nameEn: "Unconditional admission letter Canadian civilian university",
          reasons: [
            {
              id: "lettre_adm_civil_flou",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Lettre d'admission sans condition Université civile floue",
            },
            {
              id: "lettre_adm_civil_incomp",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, il manque des pages ou le document n’est pas totalement visible. Veuillez téléverser une ou plusieurs photos du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, pages are missing, or it is not fully visible. Please upload one or more photos of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Lettre d'admission sans condition Université civile incomplète",
            },
            {
              id: "lettre_adm_civil_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Veuillez nous fournir votre lettre d'admission officielle sans conditions confirmant votre inscription ou une preuve de fréquentation dans un établissement scolaire agréé pour votre programme d'études subventionnées. Il doit être mentionné que vous étudier à temps plein et avoir la date de fin prévu de vos études.\n\nLa réception de ce document est nécessaire pour permettre la poursuite de votre dossier et confirmer votre admissibilité au programme d’études subventionnées.\n\nEn consultant le lien ci-dessous, vous trouverez la liste des programmes d’études admissibles selon les différents métiers offerts :",
              instructionEn:
                "Please provide your official letter of admission without conditions confirming your enrollment or a proof of attendance in an accredited educational institution for your subsidized study program by replying to this email. The document must indicate that you are studying on a full-time basis and include the expected completion date of your studies.\n\nThis documentation is required to allow us to proceed with the assessment of your application and confirm your eligibility for the subsidized education program.\n\nBy following the link below, you will find a list of eligible academic programs associated with the various occupations available through the ROTP:",
              linkFr:
                'Voici un lien vers la <a href="https://forces.ca/fr/programmes-admissibles/" target="_blank" style="color: #2563eb; text-decoration: underline;">Liste des programmes admissibles par métier</a>.',
              linkEn:
                'Here is a link to the <a href="https://forces.ca/en/eligible-programmes/" target="_blank" style="color: #2563eb; text-decoration: underline;">List of Eligible Programs by Occupation</a>.',
              logNoteFr: "Aucune lettre d'admission sans condition Université civile au dossier",
            },
            {
              id: "lettre_adm_civil_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour de la lettre d'admission sans condition Université civile",
            },
          ],
        },
        {
          nameFr: "Diplômes et certificats",
          nameEn: "Diplomas and Certificates",
          reasons: [
            {
              id: "dipl_flou",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Diplômes et certificats flous",
            },
            {
              id: "dipl_photocopie",
              labelFr: "Photocopie",
              labelEn: "Photocopy",
              instructionFr:
                "La photocopie de vos diplômes ou certificats n'est pas acceptée (un document original est exigé). Vous devez prendre une photo de votre document original et téléverser cette photo sur votre portail en ligne. Assurez-vous que l'image est nette et sans reflet.",
              instructionEn:
                "The photocopy of your diplomas or certificates is not accepted (an original document is required). You must take a photo of your original document and upload this photo to your online portal. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Diplômes et certificats est une photocopie",
            },
            {
              id: "dipl_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez prendre une photo et la téléverser. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is not in your file. Please take a photo and upload it. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Aucun diplômes ou certificats au dossier",
            },
            {
              id: "dipl_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, il manque des pages ou le document n’est pas totalement visible. Veuillez téléverser une ou plusieurs photos du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, pages are missing, or it is not fully visible. Please upload one or more photos of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Diplômes et certificats incomplets",
            },
            {
              id: "dipl_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour des diplômes et certificats",
            },
          ],
        },
        {
          nameFr: "Évaluation comparative",
          nameEn: "Comparative Evaluation",
          reasons: [
            {
              id: "eval_flou",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Évaluation comparative floue",
            },
            {
              id: "eval_incomp",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, il manque des pages ou le document n’est pas totalement visible. Veuillez téléverser une ou plusieurs photos du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles. Pour vous aider à trouver des ressources pour cette étape, veuillez consulter le site suivant : https://canalliance.org/fr/",
              instructionEn:
                "The document is incomplete in the photo, pages are missing, or it is not fully visible. Please upload one or more photos of the document, ensuring the image is sharp, without glare, and all information is clearly visible. To help you find resources for this step, please visit the following site: https://canalliance.org/en/",
              logNoteFr: "Évaluation comparative incomplète",
            },
            {
              id: "eval_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez prendre une photo et la téléverser. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles. Pour vous aider à trouver des ressources pour cette étape, veuillez consulter le site suivant : https://canalliance.org/fr/",
              instructionEn:
                "The document is not in your file. Please take a photo and upload it. Ensure the image is sharp, without glare, and all information is clearly visible. To help you find resources for this step, please visit the following site: https://canalliance.org/en/",
              logNoteFr: "Aucune évaluation comparative au dossier",
            },
            {
              id: "eval_etrang",
              labelFr: "Relevé de note étranger",
              labelEn: "Foreign Transcript",
              instructionFr:
                "Un relevé de notes provenant de l'extérieur du Canada nécessite une évaluation de ses équivalences. Un relevé étranger seul n’est pas accepté, vous devez fournir une évaluation comparative officielle. Pour trouver des ressources, consultez : https://canalliance.org/fr/",
              instructionEn:
                "Foreign transcripts are not accepted, and you must provide an official comparative evaluation. To help you find resources for this step, please visit the following site: https://canalliance.org/en/",
              logNoteFr:
                "Relevé de note étranger non accepté, doit envoyer une évaluation comparative",
            },
            {
              id: "eval_trad",
              labelFr: "Traduction d’un relevé de note",
              labelEn: "Transcript Translation",
              instructionFr:
                "La traduction du relevé de note étrangé n’est pas suffisant, vous devez fournir une évaluation comparative officielle. Pour vous aider à trouver des ressources pour cette étape, veuillez consulter le site suivant : https://canalliance.org/fr/",
              instructionEn:
                "The translation of the foreign transcript is not sufficient; you must provide an official comparative evaluation. To help you find resources for this step, please visit the following site: https://canalliance.org/en/",
              logNoteFr:
                "Traduction du relevé de note étranger non acceptée, doit envoyer une évaluation comparative",
            },
            {
              id: "eval_non_officiel",
              labelFr: "Non officiel",
              labelEn: "Unofficial",
              instructionFr:
                "Veuillez fournir une copie officielle de votre évaluation comparative. Pour vous aider à trouver des ressources pour cette étape, veuillez consulter le site suivant : https://canalliance.org/fr/",
              instructionEn:
                "Please provide an official copy of your comparative evaluation. To help you find resources for this step, please visit the following site: https://canalliance.org/en/",
              logNoteFr: "Évaluation comparative non officielle",
            },
            {
              id: "eval_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour de l'évaluation comparative",
            },
          ],
        },
        {
          nameFr: "Relevé de note d'étude fait à l'étranger traduit dans une langue officielle",
          nameEn: "Foreign study transcript translated into an official language",
          reasons: [
            {
              id: "relev_etrang_trad_flou",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est flou et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez-vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Relevé de notes d'études à l'étranger traduit flou",
            },
            {
              id: "relev_etrang_trad_incomp",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, il manque des pages ou le document n’est pas totalement visible. Veuillez téléverser une ou plusieurs photos du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, pages are missing, or it is not fully visible. Please upload one or more photos of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Relevé de notes d'études à l'étranger traduit incomplet",
            },
            {
              id: "relev_etrang_trad_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le relevé de notes d'études faites à l'étranger traduit dans une langue officielle n'est pas à votre dossier. Veuillez prendre une photo ou numériser le document officiel et le téléverser dans votre portail du postulant. Assurez-vous que l'image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The foreign study transcript translated into an official language is not in your file. Please take a photo or scan the official document and upload it to your applicant portal. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Aucun relevé de notes d'études à l'étranger traduit au dossier",
            },
            {
              id: "relev_etrang_trad_non_trad",
              labelFr: "Non traduit",
              labelEn: "Not translated",
              instructionFr:
                "Le relevé de notes d'études à l'étranger téléversé n'est pas traduit dans l'une des langues officielles (français ou anglais). Vous devez fournir une traduction officielle effectuée par un traducteur certifié ou un organisme reconnu, accompagnée de la copie du document original.",
              instructionEn:
                "The uploaded foreign study transcript is not translated into one of the official languages (French or English). You must provide an official translation done by a certified translator or recognized organization, accompanied by a copy of the original document.",
              logNoteFr: "Relevé de notes d'études à l'étranger non traduit",
            },
            {
              id: "relev_etrang_trad_eval_comp",
              labelFr: "Évaluation comparative",
              labelEn: "Comparative evaluation",
              instructionFr:
                "Un relevé de notes d'études faites à l'étranger, même traduit dans une langue officielle, nécessite une évaluation comparative officielle de vos études. Vous devez obtenir une évaluation comparative auprès d'un organisme reconnu et la téléverser dans votre portail du postulant. Pour vous aider à trouver des ressources pour cette étape, veuillez consulter le site suivant : https://canalliance.org/fr/",
              instructionEn:
                "A foreign study transcript, even if translated into an official language, requires an official comparative evaluation of your studies. You must obtain a comparative evaluation from a recognized credential assessment organization and upload it to your applicant portal. To help you find resources for this step, please visit the following site: https://canalliance.org/en/",
              logNoteFr: "Évaluation comparative requise pour le relevé étranger traduit",
            },
          ],
        },
        {
          nameFr: "Document n'est pas un relevé de notes ou diplôme valide",
          nameEn: "Document is not a valid transcript or diploma",
          reasons: [
            {
              id: "educ_aens_sans_releve",
              labelFr: "Diplôme d'AENS sans le relevé de note",
              labelEn: "AENS Diploma without transcript",
              instructionFr:
                "Vous avez fourni un diplôme d'Attestation d’études de niveau secondaire (AENS). Toutefois, afin de valider votre scolarité, vous devez nous fournir le relevé de notes qui l'accompagne. Veuillez téléverser votre relevé de notes pour l'AENS.",
              linkFr: "Voici un lien vers un exemple de <a href=\"https://simontheriault8-cyber.github.io/Documents/Relev%C3%A9%20de%20note%20AENS%20d'une%20%C3%A9cole.png\">relevé de notes pour l'AENS</a>.",
              instructionEn:
                "You have provided a Secondary School Equivalency Attestation (TENS) diploma. However, in order to validate your education, you must provide the accompanying transcript. Please upload your TENS transcript.",
              linkEn: "Here is a link to an example of a <a href=\"https://simontheriault8-cyber.github.io/Documents/Relev%C3%A9%20de%20note%20AENS%20d'une%20%C3%A9cole.png\">TENS transcript</a>.",
              logNoteFr: "Diplôme d'AENS sans le relevé de note",
            },
            {
              id: "educ_non_admissible",
              labelFr: "N'a pas les critères académiques de base",
              labelEn: "Does not meet basic academic requirements",
              instructionFr:
                "L’évaluation des documents que vous avez fournis nous indique que vous n’êtes pas admissible à un enrôlement au sein des Forces armées canadiennes.\n\nVoici les 3 façons de répondre au critère d’entrée académique minimum :\n  • 24 crédits de secondaire 4 ou 5 (les crédits de formation professionnelle ne sont pas acceptés dans le calcul)\n  • Diplôme d’études professionnelles (DEP) complété\n  • Attestation d’études de niveau secondaire (AENS)\n\nRemarque : La réussite du Test de développement général (TDG) n’est pas acceptée.\n\nVoici un lien qui pourrait vous être utile :\nChallengeU - Plateforme en ligne - Formation à distance : <a href=\"https://www.challengeu.ca/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://www.challengeu.ca/</a>\n\nPour les études faites à l’étranger, communiquez avec un des six membres de l'Alliance canadienne des services d'évaluation de diplômes afin d’obtenir le rapport d’étude comparative avant de nous recontacter afin que nous puissions valider vos acquis scolaires.\n\nPour obtenir de l’information additionnelle à ce sujet, consultez les liens suivants :\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>\n\nPour le moment vous ne répondez pas au critère d’entrée académique minimum.",
              instructionEn:
                "The evaluation of the documents you provided indicates that you are not eligible for enrollment in the Canadian Armed Forces.\n\nHere are the 3 ways to meet the minimum academic entry requirement:\n  • 24 credits of Secondary 4 or 5 (vocational training credits are not accepted in the calculation)\n  • Completed Diploma of Vocational Studies (DVS)\n  • Secondary School Equivalency Attestation (TENS)\n\nNote: Successful completion of the General Development Test (GDT) is not accepted.\n\nHere is a link that might be useful:\nChallengeU - Online Platform - Distance Learning: <a href=\"https://www.challengeu.ca/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://www.challengeu.ca/</a>\n\nFor studies completed abroad, please contact one of the six members of the Canadian Alliance of Credential Evaluation Services to obtain a comparative evaluation report before contacting us again so we can validate your educational background.\n\nFor additional information on this subject, please consult the following links:\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>\n\nAt the moment you do not meet the minimum academic entry requirement.",
              logNoteFr: "N'a pas les critères académiques de base",
            },
            {
              id: "educ_doc_invalide",
              labelFr: "Document scolaire non officiel / invalide",
              labelEn: "Unofficial / invalid school document",
              instructionFr:
                "Ce document n'est pas un relevé de notes ou diplôme accepté. Veuillez téléverser un relevé d'apprentissage officiel de votre province ou votre diplôme officiel.\n\nPour les études faites à l’étranger, communiquez avec un des six membres de l'Alliance canadienne des services d'évaluation de diplômes afin d’obtenir le rapport d’étude comparative avant de nous recontacter afin que nous puissions valider vos acquis scolaires.\n\nPour obtenir de l’information additionnelle à ce sujet, consultez les liens suivants :\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              instructionEn:
                "This document is not an accepted transcript or diploma. Please upload an official transcript from your province or your official diploma.\n\nFor studies completed abroad, please contact one of the six members of the Canadian Alliance of Credential Evaluation Services to obtain a comparative evaluation report before contacting us again so we can validate your educational background.\n\nFor additional information on this subject, please consult the following links:\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              logNoteFr:
                "Document soumis n'est pas un document scolaire valide",
            },
            {
              id: "educ_tdg",
              labelFr: "Test de développement général (TDG)",
              labelEn: "General Development Test (GDT)",
              instructionFr:
                "La réussite du Test de développement général (TDG) n’est pas acceptée.\n\nVoici les 3 façons de répondre au critère d’entrée académique minimum :\n  • 24 crédits de secondaire 4 ou 5 (les crédits de formation professionnelle ne sont pas acceptés dans le calcul)\n  • Diplôme d’études professionnelles (DEP) complété\n  • Attestation d’études de niveau secondaire (AENS)\n\nPour les études faites à l’étranger, communiquez avec un des six membres de l'Alliance canadienne des services d'évaluation de diplômes afin d’obtenir le rapport d’étude comparative avant de nous recontacter afin que nous puissions valider vos acquis scolaires.\n\nPour obtenir de l’information additionnelle à ce sujet, consultez les liens suivants :\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              instructionEn:
                "Successful completion of the General Development Test (GDT) is not accepted.\n\nHere are the 3 ways to meet the minimum academic entry requirement:\n  • 24 credits of Secondary 4 or 5 (vocational training credits are not accepted in the calculation)\n  • Completed Diploma of Vocational Studies (DVS)\n  • Secondary School Equivalency Attestation (TENS)\n\nFor studies completed abroad, please contact one of the six members of the Canadian Alliance of Credential Evaluation Services to obtain a comparative evaluation report before contacting us again so we can validate your educational background.\n\nFor additional information on this subject, please consult the following links:\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              logNoteFr:
                "Test de développement général (TDG) soumis, refusé. Doit avoir 24 crédits, DEP ou AENS",
            },
            {
              id: "educ_aec",
              labelFr: "Attestation d'études collégiales (AEC)",
              labelEn: "Attestation of College Studies (AEC)",
              instructionFr:
                "Une attestation d'études collégiales (AEC) n'est pas acceptée comme preuve de scolarité valide.\n\nVoici les 3 façons de répondre au critère d’entrée académique minimum :\n  • 24 crédits de secondaire 4 ou 5 (les crédits de formation professionnelle ne sont pas acceptés dans le calcul)\n  • Diplôme d’études professionnelles (DEP) complété\n  • Attestation d’études de niveau secondaire (AENS)\n\nRemarque : La réussite du Test de développement général (TDG) n’est pas acceptée.\n\nVoici un lien qui pourrait vous être utile :\nChallengeU - Plateforme en ligne - Formation à distance : <a href=\"https://www.challengeu.ca/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://www.challengeu.ca/</a>\n\nPour les études faites à l’étranger, communiquez avec un des six membres de l'Alliance canadienne des services d'évaluation de diplômes afin d’obtenir le rapport d’étude comparative avant de nous recontacter afin que nous puissions valider vos acquis scolaires.\n\nPour obtenir de l’information additionnelle à ce sujet, consultez les liens suivants :\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              instructionEn:
                "An Attestation of College Studies (AEC) is not accepted as valid proof of education.\n\nHere are the 3 ways to meet the minimum academic entry requirement:\n  • 24 credits of Secondary 4 or 5 (vocational training credits are not accepted in the calculation)\n  • Completed Diploma of Vocational Studies (DVS)\n  • Secondary School Equivalency Attestation (TENS)\n\nNote: Successful completion of the General Development Test (GDT) is not accepted.\n\nHere is a link that might be useful:\nChallengeU - Online Platform - Distance Learning: <a href=\"https://www.challengeu.ca/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://www.challengeu.ca/</a>\n\nFor studies completed abroad, please contact one of the six members of the Canadian Alliance of Credential Evaluation Services to obtain a comparative evaluation report before contacting us again so we can validate your educational background.\n\nFor additional information on this subject, please consult the following links:\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              logNoteFr:
                "Une AEC a été soumise, ce qui n'est pas un document scolaire accepté",
            },
            {
              id: "educ_master_need_bachelor",
              labelFr: "Maîtrise soumise (Baccalauréat ou Secondaire requis)",
              labelEn:
                "Master's submitted (Bachelor's or High School required)",
              instructionFr:
                "Vous avez soumis un diplôme de maîtrise, mais nous avons besoin de votre diplôme de baccalauréat et/ou de votre relevé de notes du secondaire pour vérifier votre admissibilité. Veuillez téléverser votre diplôme de baccalauréat et/ou votre relevé de notes du secondaire.\n\nPour les études faites à l’étranger, communiquez avec un des six membres de l'Alliance canadienne des services d'évaluation de diplômes afin d’obtenir le rapport d’étude comparative avant de nous recontacter afin que nous puissions valider vos acquis scolaires.\n\nPour obtenir de l’information additionnelle à ce sujet, consultez les liens suivants :\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              instructionEn:
                "You submitted a Master's degree, but we need your Bachelor's degree and/or high school transcript to verify your eligibility. Please upload your Bachelor's degree and/or your high school transcript.\n\nFor studies completed abroad, please contact one of the six members of the Canadian Alliance of Credential Evaluation Services to obtain a comparative evaluation report before contacting us again so we can validate your educational background.\n\nFor additional information on this subject, please consult the following links:\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              logNoteFr:
                "Maîtrise soumise au lieu du Baccalauréat ou secondaire",
            },
            {
              id: "educ_cert_submitted",
              labelFr: "Certificat soumis (Baccalauréat ou Secondaire requis)",
              labelEn:
                "Certificate submitted (Bachelor's or High School required)",
              instructionFr:
                "Vous avez soumis un certificat, mais nous avons besoin de votre diplôme de baccalauréat et/ou de votre relevé de notes du secondaire pour vérifier votre admissibilité. Veuillez téléverser votre diplôme de baccalauréat et/ou votre relevé de notes du secondaire.\n\nPour les études faites à l’étranger, communiquez avec un des six membres de l'Alliance canadienne des services d'évaluation de diplômes afin d’obtenir le rapport d’étude comparative avant de nous recontacter afin que nous puissions valider vos acquis scolaires.\n\nPour obtenir de l’information additionnelle à ce sujet, consultez les liens suivants :\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              instructionEn:
                "You submitted a certificate, but we need your Bachelor's degree and/or high school transcript to verify your eligibility. Please upload your Bachelor's degree and/or your high school transcript.\n\nFor studies completed abroad, please contact one of the six members of the Canadian Alliance of Credential Evaluation Services to obtain a comparative evaluation report before contacting us again so we can validate your educational background.\n\nFor additional information on this subject, please consult the following links:\n  • <a href=\"https://www.cicdi.ca\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">www.cicdi.ca</a>\n  • <a href=\"https://canalliance.org/\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">https://canalliance.org/</a>",
              logNoteFr:
                "Certificat soumis au lieu du Baccalauréat ou secondaire",
            },
            {
              id: "relev_ecole",
              labelFr: "Relevé de note de l’école (Bulletin)",
              labelEn: "School Report Card",
              instructionFr:
                "Un simple bulletin scolaire émis par votre école n'est pas accepté comme preuve de scolarité. Vous devez nous fournir le relevé d'apprentissage officiel émis par le Ministère de l'Éducation (avec le sceau ou le format officiel du Ministère). Vous pouvez en faire la demande ici si vous ne l’avez pas : <a href=\"https://formulaires-consultations.education.gouv.qc.ca/dev_ti/412_demande_releves_diplomes_secondaire/fr\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">Demande de relevés et de diplômes du secondaire</a>",
              instructionEn:
                "A simple report card issued by your school is not accepted as proof of education. You must provide the official transcript (relevé d'apprentissage) issued by the Ministry of Education (bearing the official Ministry seal or format). You can request it here if you do not have it: <a href=\"https://formulaires-consultations.education.gouv.qc.ca/dev_ti/412_demande_releves_diplomes_secondaire/en/a/FORM\" target=\"_blank\" class=\"text-indigo-600 underline font-medium hover:text-indigo-800\">Request for transcripts and high school diplomas</a>",
              logNoteFr:
                "Relevé de note de l’école non acceptés, doit téléverser le relevé d’apprentissage du ministère",
            },
          ],
        },
      ],
    }
];
