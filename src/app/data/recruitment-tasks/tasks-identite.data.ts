import { Task } from "./recruitment-tasks.models";

export const TASKS_IDENTITE: Task[] = [
    {
      nameFr:
        "Pièce d'identité avec photo émise par le gouvernement canadien (les deux côtés)",
      nameEn: "Government-issued photo ID (both sides)",
      documents: [
        {
          nameFr: "Égoportrait (Selfie) avec pièce d'identité",
          nameEn: "Selfie with ID",
          reasons: [
            {
              id: "selfie_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "La photo de vous et votre pièce d’identité est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              linkFr: "Voici le lien vers un exemple d'<a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">égoportrait</a> acceptable.",
              instructionEn:
                "The photo of you and your ID is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              linkEn: "Here is a link to an acceptable example of a <a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">selfie</a>.",
              logNoteFr: "Égoportrait (Selfie) avec pièce d’identité flou",
            },
            {
              id: "selfie_mauvaise",
              labelFr: "Mauvaise pièce d’identité",
              labelEn: "Wrong ID",
              instructionFr:
                "La pièce d'identité que vous tenez dans vos mains sur la photo ne correspond pas à celle que vous avez téléversée au dossier. Si vous avez soumis un permis de conduire, vous devez tenir ce même permis de conduire sur votre égoportrait (selfie). Veuillez téléverser une nouvelle photo correspondante.",
              linkFr: "Voici le lien vers un exemple d'<a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">égoportrait</a> acceptable.",
              instructionEn:
                "The ID held does not match the one submitted to the file. Please upload a new photo of yourself holding the ID submitted to the file.",
              linkEn: "Here is a link to an acceptable example of a <a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">selfie</a>.",
              logNoteFr:
                "La pièce d'identité utilisée dans l'égoportrait (selfie) n'est pas la bonne",
            },
            {
              id: "selfie_inexistant",
              labelFr: "Inexistant au dossier",
              labelEn: "Missing from file",
              instructionFr:
                "La photo ne se trouve pas dans votre dossier, veuillez prendre un égoportrait (selfie) avec la pièce d'identité qui est dans votre dossier et téléverser cette photo sur votre portail en ligne. Vous devez tenir la pièce d'identité près de votre visage de façon à ce que votre visage et votre pièce d'identité soit clair et lisible.",
              linkFr: "Voici le lien vers un exemple d'<a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">égoportrait</a> acceptable.",
              instructionEn:
                "The document is not in your file. Please take a photo and upload it. Ensure the image is sharp, without glare, and all information is clearly visible.",
              linkEn: "Here is a link to an acceptable example of a <a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">selfie</a>.",
              logNoteFr:
                "Aucun égoportrait (selfie) avec pièce d'identité au dossier",
            },
            {
              id: "selfie_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "La photo est incomplète, votre visage ou votre pièce d’identité n'est pas totalement visible sur la photo. Veuillez téléverser une nouvelle photo en vous assurant que votre visage et votre pièce d’identité sont clairement visibles.",
              linkFr: "Voici le lien vers un exemple d'<a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">égoportrait</a> acceptable.",
              instructionEn:
                "The photo is incomplete, your face or ID is not fully visible in the photo. Please upload a new photo ensuring both your face and ID are clearly visible.",
              linkEn: "Here is a link to an acceptable example of a <a href=\"https://simontheriault8-cyber.github.io/Documents/%C3%89goportrait.png\">selfie</a>.",
              logNoteFr:
                "Égoportrait (Selfie) avec pièce d’identité incomplet",
            },
            {
              id: "selfie_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour de l'égoportrait (Selfie)",
            },
          ],
        },
        {
          nameFr: "Permis de conduire",
          nameEn: "Driver's License",
          reasons: [
            {
              id: "pc_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Pièce d'identité floue",
            },
            {
              id: "pc_expire",
              labelFr: "Expiré",
              labelEn: "Expired",
              instructionFr:
                "Votre permis de conduire est expiré. Veuillez téléverser une version valide ou une autre pièce d’identité officielle d’un gouvernement canadien. (carte d’assurance maladie, passeport, etc…)",
              instructionEn:
                "Your driver's license is expired. Please upload a valid version or another official Canadian government ID (health insurance card, etc.).",
              logNoteFr: "Pièce d'identité expirée",
            },
            {
              id: "pc_verso",
              labelFr: "Verso manquant",
              labelEn: "Back side missing",
              instructionFr:
                "Le verso du document est manquant; veuillez téléverser les deux côtés.",
              instructionEn:
                "The back of the document is missing; please upload both sides.",
              logNoteFr: "Verso manquant de la pièce d'identité",
            },
            {
              id: "pc_noir_blanc",
              labelFr: "Noir et blanc",
              labelEn: "Black and white",
              instructionFr:
                "Le document fourni n'est pas valide car il est en noir et blanc. Veuillez fournir une photo couleur du même document.",
              instructionEn:
                "The provided document is invalid because it is in black and white. Please provide a color photo of the same document.",
              logNoteFr: "Pièce d'identité en noir et blanc",
            },
            {
              id: "pc_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, le document n’est pas totalement visible. Veuillez téléverser une photo du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, or it is not fully visible. Please upload a photo of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Permis de conduire incomplet",
            },
            {
              id: "pc_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour du permis de conduire",
            },
          ],
        },
        {
          nameFr: "Carte d'assurance maladie",
          nameEn: "Health Insurance Card",
          reasons: [
            {
              id: "ramq_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Pièce d'identité floue",
            },
            {
              id: "ramq_expire",
              labelFr: "Expiré",
              labelEn: "Expired",
              instructionFr:
                "Votre carte d’assurance maladie est expiré. Veuillez téléverser une version valide ou une autre pièce d’identité officielle d’un gouvernement canadien. (permis de conduire, passeport, etc…)",
              instructionEn:
                "Your health insurance card is expired. Please upload a valid version or another official Canadian government ID (driver's license, passport, etc.).",
              logNoteFr: "Pièce d'identité expirée",
            },
            {
              id: "ramq_verso",
              labelFr: "Verso manquant",
              labelEn: "Back side missing",
              instructionFr:
                "Le verso du document est manquant; veuillez téléverser les deux côtés.",
              instructionEn:
                "The back of the document is missing; please upload both sides.",
              logNoteFr: "Verso manquant de la pièce d'identité",
            },
            {
              id: "ramq_ontario",
              labelFr: "Carte de l’Ontario non acceptée",
              labelEn: "Ontario card not accepted",
              instructionFr:
                "La carte d'assurance maladie de l'Ontario n'est pas acceptée comme pièce d'identité au niveau fédéral; veuillez téléverser une autre pièce d’identité officielle d’un gouvernement canadien. (permis de conduire, passeport, etc…)",
              instructionEn:
                "The Ontario health insurance card is not accepted as ID at the federal level; please upload another official Canadian government ID (driver's license, passport, etc.).",
              logNoteFr:
                "Carte d'assurance maladie de l'Ontario non acceptée comme pièce d'identité",
            },
            {
              id: "ramq_noir_blanc",
              labelFr: "Noir et blanc",
              labelEn: "Black and white",
              instructionFr:
                "Le document fourni n'est pas valide car il est en noir et blanc. Veuillez fournir une photo couleur du même document.",
              instructionEn:
                "The provided document is invalid because it is in black and white. Please provide a color photo of the same document.",
              logNoteFr: "Pièce d'identité en noir et blanc",
            },
            {
              id: "ramq_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, le document n’est pas totalement visible. Veuillez téléverser une photo du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, or it is not fully visible. Please upload a photo of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Carte d'assurance maladie incomplète",
            },
            {
              id: "ramq_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour de la carte d'assurance maladie",
            },
          ],
        },
        {
          nameFr: "Passeport",
          nameEn: "Passport",
          reasons: [
            {
              id: "pass_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Votre pièce d’identité est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "Your ID is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Pièce d'identité floue",
            },
            {
              id: "pass_expire",
              labelFr: "Expiré",
              labelEn: "Expired",
              instructionFr:
                "Votre passeport est expiré. Veuillez téléverser une version valide ou une autre pièce d’identité officielle d’un gouvernement canadien. (permis de conduire, carte d'assurance maladie, etc…)",
              instructionEn:
                "Your passport is expired. Please upload a valid version or another official Canadian government ID (driver's license, health insurance card, etc.).",
              logNoteFr: "Pièce d'identité expirée",
            },
            {
              id: "pass_noir_blanc",
              labelFr: "Noir et blanc",
              labelEn: "Black and white",
              instructionFr:
                "Le document fourni n'est pas valide car il est en noir et blanc. Veuillez fournir une photo couleur du même document.",
              instructionEn:
                "The provided document is invalid because it is in black and white. Please provide a color photo of the same document.",
              logNoteFr: "Pièce d'identité en noir et blanc",
            },
            {
              id: "pass_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, le document n’est pas totalement visible. Veuillez téléverser une photo du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, or it is not fully visible. Please upload a photo of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Passeport incomplet",
            },
            {
              id: "pass_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour du passeport",
            },
          ],
        },
        {
          nameFr: "Autre pièce d'identité officiel",
          nameEn: "Other Official ID",
          reasons: [
            {
              id: "autre_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Pièce d'identité floue",
            },
            {
              id: "autre_expire",
              labelFr: "Expiré",
              labelEn: "Expired",
              instructionFr:
                "Votre pièce d’identité est expiré. Veuillez téléverser une version valide ou une autre pièce d’identité officielle d’un gouvernement canadien. (permis de conduire, carte d'assurance maladie, passeport, etc…)",
              instructionEn:
                "Your ID is expired. Please upload a valid version or another official Canadian government ID (driver's license, health insurance card, passport, etc.).",
              logNoteFr: "Pièce d'identité expirée",
            },
            {
              id: "autre_verso",
              labelFr: "Verso manquant",
              labelEn: "Back side missing",
              instructionFr:
                "Le verso du document est manquant; veuillez téléverser les deux côtés.",
              instructionEn:
                "The back of the document is missing; please upload both sides.",
              logNoteFr: "Verso manquant de la pièce d'identité",
            },
            {
              id: "autre_non_officiel",
              labelFr: "Non officiel",
              labelEn: "Unofficial",
              instructionFr:
                "Ce document n'est pas reconnu par le gouvernement fédéral comme pièce d'identité principale officielle. Veuillez téléverser une autre pièce d’identité avec photo émise par un gouvernement provincial ou fédéral canadien (ex: permis de conduire, carte d'assurance maladie provinciale, passeport canadien ou étranger).",
              instructionEn:
                "This document is not recognized by the federal government. Please upload another official Canadian government ID (driver's license, health insurance card, passport, etc.).",
              logNoteFr:
                "La pièce d'identité au dossier n'est pas acceptée comme pièce officielle",
            },
            {
              id: "autre_noir_blanc",
              labelFr: "Noir et blanc",
              labelEn: "Black and white",
              instructionFr:
                "Le document fourni n'est pas valide car il est en noir et blanc. Veuillez fournir une photo couleur du même document.",
              instructionEn:
                "The provided document is invalid because it is in black and white. Please provide a color photo of the same document.",
              logNoteFr: "Pièce d'identité en noir et blanc",
            },
            {
              id: "autre_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, le document n’est pas totalement visible. Veuillez téléverser une photo du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, or it is not fully visible. Please upload a photo of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Pièce d'identité incomplète",
            },
            {
              id: "autre_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour de la pièce d'identité",
            },
          ],
        },
        {
          nameFr: "Document n'est pas une pièce d'identité valide",
          nameEn: "Document is not a valid ID",
          reasons: [
            {
              id: "id_invalide_autre",
              labelFr: "Autre document (non accepté)",
              labelEn: "Other document (not accepted)",
              instructionFr:
                "Ce document n'est pas une pièce d'identité valide. Veuillez téléverser une pièce d’identité officielle d’un gouvernement canadien (permis de conduire, carte d'assurance maladie, passeport).",
              instructionEn:
                "This document is not a valid ID. Please upload an official Canadian government ID (driver's license, health insurance card, passport).",
              logNoteFr:
                "Document soumis n'est pas une pièce d'identité valide",
            },
            {
              id: "id_invalide_rp",
              labelFr: "Carte de résident permanent",
              labelEn: "Permanent Resident Card",
              instructionFr:
                "La carte de résident permanent prouve votre statut, mais n'est pas acceptée comme pièce d'identité principale avec photo pour cette étape spécifique. Veuillez téléverser une autre pièce d’identité avec photo émise par un gouvernement provincial ou fédéral (ex: permis de conduire, carte d'assurance maladie provinciale, passeport canadien ou étranger).",
              instructionEn:
                "The Permanent Resident Card is not accepted as an ID for this step. Please upload a photo ID issued by a provincial or federal government (e.g., driver's license, health insurance card, passport).",
              logNoteFr:
                "La carte de résident permanent n'est pas une pièce d'identité acceptée.",
            },
          ],
        },
      ],
    }
];
