import { Task } from "./recruitment-tasks.models";

export const TASKS_FORMULAIRES_SECURITE: Task[] = [
    {
      nameFr: "Consentement du parent - tuteur",
      nameEn: "Parent / Guardian Consent",
      documents: [
        {
          nameFr: "Formulaire de demande d'emploi - Partie H",
          nameEn: "Employment Application Form - Part H",
          reasons: [
            {
              id: "emp_sig_parent",
              labelFr: "Aucune signature d'un parent",
              labelEn: "No parent signature",
              instructionFr:
                "La signature du parent ou tuteur légal est requise à la partie H pour les mineurs; veuillez demander à votre parent ou tuteur légal de compléter la tâche Consentement parental dans votre portail.",
              instructionEn:
                "Parent/legal guardian signature is required in Part H for minors; please ask your parent/legal guardian to complete the Parental Consent task in your portal.",
              logNoteFr:
                "Aucune signature d'un parent à la partie H du DND 2170",
            },
            {
              id: "emp_nom_parent",
              labelFr: "Nom du parent ne correspond pas",
              labelEn: "Parent name mismatch",
              instructionFr:
                "Le nom du parent indiqué à la partie H doit être identique à celui figurant sur votre certificat de naissance. Veuillez demander à votre parent de compléter la tâche Consentement du parent - tuteur. Si vous avez un tuteur, envoyez nous une preuve légale en répondant à ce courriel.",
              instructionEn:
                "The parent's name in Part H must be identical to the one on your birth certificate. Please ask your parent to complete the Parent/Guardian Consent task. If you have a guardian, send us legal proof by replying to this email.",
              logNoteFr:
                "La signature à la partie H du DND 2170 ne correspond pas aux noms des parent sur le certificat de naissance, vérification supplémentaire requise du consentement parental. Courriel pour qu'un parent contacte un centre de recrutement envoyé.",
            },
          ],
        },
        {
          nameFr: "Pièce d'identité du parent",
          nameEn: "Parent's ID",
          reasons: [
            {
              id: "par_id_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Pièce d’identité du parent ou tuteur légal floue",
            },
            {
              id: "par_id_expire",
              labelFr: "Expiré",
              labelEn: "Expired",
              instructionFr:
                "La pièce d’identité de votre parent ou tuteur légal est expiré. Veuillez téléverser une version valide ou une autre pièce d’identité officielle d’un gouvernement canadien. (permis de conduire, carte d'assurance maladie, passeport, etc…)",
              instructionEn:
                "Your parent's or legal guardian's ID is expired. Please upload a valid version or another official Canadian government ID (driver's license, health card, passport, etc.).",
              logNoteFr:
                "Pièce d’identité du parent ou tuteur légal est expirée",
            },
            {
              id: "par_id_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez prendre une photo et la téléverser. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is not in your file. Please take a photo and upload it. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr:
                "Aucune pièce d’identité du parent ou tuteur légal n’est au dossier",
            },
            {
              id: "par_id_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour de la pièce d'identité du parent",
            },
          ],
        },
        {
          nameFr: "Égoportrait (Selfie) du parent avec pièce d'identité",
          nameEn: "Parent Selfie with ID",
          reasons: [
            {
              id: "par_selfie_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "La photo de votre parent ou tuteur légal et de sa pièce d’identité est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              linkFr: "Voici le lien vers un exemple d'<a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">égoportrait</a> acceptable.",
              instructionEn:
                "The photo of your parent or legal guardian and their ID is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              linkEn: "Here is a link to an acceptable example of a <a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">selfie</a>.",
              logNoteFr:
                "Photo du parent ou tuteur légal tenant sa pièce d’identité floue",
            },
            {
              id: "par_selfie_mauvais",
              labelFr: "Mauvaise pièce d’identité",
              labelEn: "Wrong ID",
              instructionFr:
                "La pièce d'identité tenue ne correspond pas à celle soumise au dossier. Veuillez téléverser une nouvelle photo de votre parent ou tuteur légal et de sa pièce d’identité soumise au dossier.",
              linkFr: "Voici le lien vers un exemple d'<a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">égoportrait</a> acceptable.",
              instructionEn:
                "The ID held does not match the one submitted to the file. Please upload a new photo of your parent or legal guardian holding the ID submitted to the file.",
              linkEn: "Here is a link to an acceptable example of a <a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">selfie</a>.",
              logNoteFr:
                "Photo du parent ou tuteur légal tenant une mauvaise pièce d’identité",
            },
            {
              id: "par_selfie_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "La photo ne se trouve pas dans votre dossier, veuillez prendre un égoportrait (selfie) de votre parent avec sa pièce d'identité qui est dans votre dossier et téléverser cette photo sur votre portail en ligne. Il doit tenir la pièce d'identité près de son visage de façon à ce que son visage et sa pièce d'identité soit clair et lisible.",
              linkFr: "Voici le lien vers un exemple d'<a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">égoportrait</a> acceptable.",
              instructionEn:
                "The photo is not in your file, please take a selfie of your parent with their identity document that is in your file and upload this photo to your online portal. They must hold the identity document near their face so that their face and identity document are clear and legible.",
              linkEn: "Here is a link to an acceptable example of a <a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">selfie</a>.",
              logNoteFr:
                "Aucune photo du parent ou tuteur légal tenant sa pièce d’identité n’est au dossier",
            },
            {
              id: "par_selfie_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour de l'égoportrait (Selfie) du parent",
            },
          ],
        },
        {
          nameFr: "Document inacceptable",
          nameEn: "Unacceptable document",
          reasons: [
            {
              id: "parent_doc_invalide",
              labelFr: "Mauvais document soumis",
              labelEn: "Wrong document submitted",
              instructionFr:
                "Le document soumis n'est pas approprié pour le consentement parental. Veuillez soumettre le formulaire complété et signé, ou la pièce d'identité du parent, selon ce qui est requis.",
              instructionEn:
                "The submitted document is not appropriate for parental consent. Please submit the completed and signed form, or the parent's ID, as required.",
              logNoteFr:
                "Document soumis n'est pas valide pour le consentement parental",
            },
          ],
        },
      ],
    },
    {
      nameFr: "MDN 2977 - Formulaire de vérification de sécurité",
      nameEn: "DND 2977 - Security Screening Form",
      documents: [
        {
          nameFr: "DND 2977",
          nameEn: "DND 2977",
          reasons: [
            {
              id: "sec_expire",
              labelFr: "Expiré",
              labelEn: "Expired",
              instructionFr:
                "Le formulaire de vérification de sécurité (MDN 2977) est expiré. Veuillez le compléter à nouveau dans votre portail.",
              instructionEn:
                "The security clearance form (DND 2977) has expired. Please complete it again in your portal.",
              logNoteFr: "DND 2977 expiré",
            },
            {
              id: "sec_incomp",
              labelFr: "Incomplet",
              labelEn: "Incomplete",
              instructionFr:
                "Le formulaire est incomplet. Veuillez le compléter à nouveau dans votre portail.",
              instructionEn:
                "The form is incomplete. Please complete it again in your portal.",
              logNoteFr: "DND 2977 incomplet",
            },
            {
              id: "sec_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez retourner dans votre portail et le compléter.",
              instructionEn:
                "The document is not in your file. Please return to your portal and complete it.",
              logNoteFr: "Aucun DND 2977 au dossier",
            },
          ],
        },
        {
          nameFr: "Document inacceptable",
          nameEn: "Unacceptable document",
          reasons: [
            {
              id: "sec_doc_invalide",
              labelFr: "Mauvais document soumis",
              labelEn: "Wrong document submitted",
              instructionFr:
                "Le document soumis n'est pas le Formulaire de vérification de sécurité. Veuillez vous assurer de compléter ce formulaire dans votre portail.",
              instructionEn:
                "The submitted document is not the Security Screening Form. Please ensure you complete this form in your portal.",
              logNoteFr:
                "Mauvais document soumis à la place du formulaire de sécurité",
            },
          ],
        },
      ],
    },
    {
      nameFr:
        "Formulaire de demande d'emploi dans les Forces armées canadiennes",
      nameEn: "CAF Employment Application Form",
      documents: [
        {
          nameFr: "Formulaire de demande d'emploi",
          nameEn: "Employment Application Form",
          reasons: [
            {
              id: "emp_expire",
              labelFr: "Expiré",
              labelEn: "Expired",
              instructionFr:
                "Le formulaire de demande d'emploi est expiré. Veuillez le compléter à nouveau dans votre portail.",
              instructionEn:
                "The employment application form has expired. Please complete it again in your portal.",
              logNoteFr: "Formulaire de demande d'emploi expiré",
            },
            {
              id: "emp_incomp",
              labelFr: "Incomplet",
              labelEn: "Incomplete",
              instructionFr:
                "Le formulaire est incomplet. Veuillez le compléter à nouveau dans votre portail.",
              instructionEn:
                "The form is incomplete. Please complete it again in your portal.",
              logNoteFr: "DND 2170 incomplet",
            },
            {
              id: "emp_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez retourner dans votre portail et le compléter.",
              instructionEn:
                "The document is not in your file. Please return to your portal and complete it.",
              logNoteFr: "Aucun DND2170 au dossier",
            },
            {
              id: "emp_sig_i",
              labelFr: "Signature manquante partie I",
              labelEn: "Missing signature Part I",
              instructionFr:
                "Vous devez signer la partie I et J ainsi que cocher la case de la partie J. Veuillez compléter le formulaire à nouveau dans votre portail.",
              linkFr: "Voici une image des parties que vous devez obligatoirement remplir : <a href=\"https://simontheriault8-cyber.github.io/Documents/DND%202170%20Partie%20I%20et%20J.png\">Formulaire de demande d'emploi dans les Forces armées canadiennes</a>.",
              instructionEn:
                "You must sign Parts I and J and check the box in Part J. Please complete the form again in your portal.",
              linkEn: "Here is an image of the parts you must complete: <a href=\"https://simontheriault8-cyber.github.io/Documents/DND%202170%20Partie%20I%20et%20J.png\">Canadian Armed Forces Employment Application Form</a>.",
              logNoteFr: "Manque la signature à la partie I du DND 2170",
            },
            {
              id: "emp_sig_j",
              labelFr: "Signature manquante partie J",
              labelEn: "Missing signature Part J",
              instructionFr:
                "Vous devez signer la partie I et J ainsi que cocher la case de la partie J. Veuillez compléter le formulaire à nouveau dans votre portail.",
              linkFr: "Voici une image des parties que vous devez obligatoirement remplir : <a href=\"https://simontheriault8-cyber.github.io/Documents/DND%202170%20Partie%20I%20et%20J.png\">Formulaire de demande d'emploi dans les Forces armées canadiennes</a>.",
              instructionEn:
                "You must sign Parts I and J and check the box in Part J. Please complete the form again in your portal.",
              linkEn: "Here is an image of the parts you must complete: <a href=\"https://simontheriault8-cyber.github.io/Documents/DND%202170%20Partie%20I%20et%20J.png\">Canadian Armed Forces Employment Application Form</a>.",
              logNoteFr: "Manque la signature à la partie J du DND 2170",
            },
            {
              id: "emp_case_j",
              labelFr: "Case non cochée partie J",
              labelEn: "Box unchecked Part J",
              instructionFr:
                "Vous devez signer la partie I et J ainsi que cocher la case de la partie J. Veuillez compléter le formulaire à nouveau dans votre portail.",
              linkFr: "Voici une image des parties que vous devez obligatoirement remplir : <a href=\"https://simontheriault8-cyber.github.io/Documents/DND%202170%20Partie%20I%20et%20J.png\">Formulaire de demande d'emploi dans les Forces armées canadiennes</a>.",
              instructionEn:
                "You must sign Parts I and J and check the box in Part J. Please complete the form again in your portal.",
              linkEn: "Here is an image of the parts you must complete: <a href=\"https://simontheriault8-cyber.github.io/Documents/DND%202170%20Partie%20I%20et%20J.png\">Canadian Armed Forces Employment Application Form</a>.",
              logNoteFr: "N'a pas coché la case à la partie J du DND 2170",
            },
          ],
        },
        {
          nameFr: "Document inacceptable",
          nameEn: "Unacceptable document",
          reasons: [
            {
              id: "emp_doc_invalide",
              labelFr: "Mauvais document soumis",
              labelEn: "Wrong document submitted",
              instructionFr:
                "Le document soumis n'est pas le Formulaire de demande d'emploi dans les Forces armées canadiennes. Veuillez vous assurer de compléter ce formulaire dans votre portail.",
              instructionEn:
                "The submitted document is not the CAF Employment Application Form. Please ensure you complete this form in your portal.",
              logNoteFr:
                "Mauvais document soumis à la place du formulaire de demande d'emploi",
            },
          ],
        },
      ],
    },
    {
      nameFr: "Formulaire de demande d'emploi notée",
      nameEn: "Scored Employment Application Form",
      documents: [
        {
          nameFr: "Formulaire de demande d’emploi noté",
          nameEn: "Scored Employment App Form",
          reasons: [
            {
              id: "seaf_incomp",
              labelFr: "Incomplet",
              labelEn: "Incomplete",
              instructionFr:
                "Le formulaire est incomplet. Veuillez le compléter à nouveau dans votre portail.",
              instructionEn:
                "The form is incomplete. Please complete it again in your portal.",
              logNoteFr: "SEAF incomplet",
            },
            {
              id: "seaf_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez retourner dans votre portail et le compléter.",
              instructionEn:
                "The document is not in your file. Please return to your portal and complete it.",
              logNoteFr: "Aucun SEAF au dossier",
            },
            {
              id: "seaf_no_res",
              labelFr: "Tâche complétée sans résultat",
              labelEn: "Task completed without result",
              instructionFr:
                "La tâche apparaît comme complétée mais aucun résultat n'est enregistré. Veuillez compléter la tâche à nouveau dans votre portail.",
              instructionEn:
                "The task appears as completed, but no result is recorded. Please complete the task again in your portal.",
              logNoteFr:
                "Le SEAF a été complété mais il n'y a pas de résultat au dossier",
            },
            {
              id: "seaf_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, vous devez refaire le formulaire de demande d'emploi notée puisque votre score peut changer selon votre expérience dans la vie. Veuillez vous rendre sur votre portail du postulant afin de le compléter.",
              instructionEn:
                "For the reopening of your file, you must redo the scored employment application form as your score may change based on your life experience. Please go to your applicant portal to complete it.",
              logNoteFr: "Mise à jour du formulaire de demande d'emploi notée",
            },
          ],
        },
        {
          nameFr: "Document inacceptable",
          nameEn: "Unacceptable document",
          reasons: [
            {
              id: "seaf_doc_invalide",
              labelFr: "Mauvais document soumis",
              labelEn: "Wrong document submitted",
              instructionFr:
                "Le document soumis n'est pas une évaluation valide. Veuillez compléter la tâche dans votre portail.",
              instructionEn:
                "The submitted document is not a valid assessment. Please complete the task in your portal.",
              logNoteFr: "Mauvais document soumis pour l'évaluation",
            },
          ],
        },
      ],
    },
    {
      nameFr:
        "Évaluation de la personnalité (Inventaire de personnalité des traits auto-descriptifs)",
      nameEn: "Personality Assessment (TSD-PI)",
      documents: [
        {
          nameFr: "Évaluation de la personnalité",
          nameEn: "Personality Assessment",
          reasons: [
            {
              id: "pers_incomp",
              labelFr: "Incomplet",
              labelEn: "Incomplete",
              instructionFr:
                "Le formulaire est incomplet. Veuillez le compléter à nouveau dans votre portail.",
              instructionEn:
                "The form is incomplete. Please complete it again in your portal.",
              logNoteFr: "IP-TAD incomplet",
            },
            {
              id: "pers_inexist",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "Le document n’est pas à votre dossier. Veuillez retourner dans votre portail et le compléter.",
              instructionEn:
                "The document is not in your file. Please return to your portal and complete it.",
              logNoteFr: "Aucun IP-TAD au dossier",
            },
            {
              id: "pers_no_res",
              labelFr: "Tâche complétée sans résultat",
              labelEn: "Task completed without result",
              instructionFr:
                "La tâche apparaît comme complétée mais aucun résultat n'est enregistré. Veuillez compléter la tâche à nouveau dans votre portail.",
              instructionEn:
                "The task appears as completed, but no result is recorded. Please complete the task again in your portal.",
              logNoteFr:
                "L'IP-TAD a été complété mais il n'y a pas de résultat au dossier",
            },
          ],
        },
        {
          nameFr: "Document inacceptable",
          nameEn: "Unacceptable document",
          reasons: [
            {
              id: "pers_doc_invalide",
              labelFr: "Mauvais document soumis",
              labelEn: "Wrong document submitted",
              instructionFr:
                "Le document soumis n'est pas une évaluation valide. Veuillez compléter la tâche dans votre portail.",
              instructionEn:
                "The submitted document is not a valid assessment. Please complete the task in your portal.",
              logNoteFr: "Mauvais document soumis pour l'évaluation",
            },
          ],
        },
      ],
    }
];
