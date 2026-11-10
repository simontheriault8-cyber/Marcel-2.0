import { Task } from "./recruitment-tasks.models";

export const TASKS_CITOYENNETE: Task[] = [
    {
      nameFr:
        "Certificat de naissance canadien ou preuve de citoyenneté canadienne - statut de résident permanent",
      nameEn: "Canadian Birth Certificate or Proof of Citizenship - PR Status",
      documents: [
        {
          nameFr: "Certificat de naissance",
          nameEn: "Birth Certificate",
          reasons: [
            {
              id: "naiss_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "La photo de votre certificat de naissance est trop floue pour être lue. Veuillez reprendre une nouvelle photo en vous assurant que toutes les informations soient visibles et lisibles. Retournez ensuite sur votre portail en ligne pour y téléverser la nouvelle photo.",
              instructionEn:
                "The photo of your birth certificate is too blurry to be read. Please take a new photo, making sure all information is visible and legible. Then return to your online portal to upload the new photo.",
              logNoteFr: "Cerificat de naissance flou",
            },
            {
              id: "naiss_parents",
              labelFr: "Noms des parents absents",
              labelEn: "Parents' names missing",
              instructionFr:
                "Aucun document officiel au dossier ne mentionne vos parents ou tuteurs légaux. Veuillez envoyer, en réponse à ce courriel, un document prouvant le lien de parenté avec la personne ayant complété la tâche de consentement du parent -tuteur. (Exemple de document officiel : certificat de naissance version long)",
              instructionEn:
                "No official document in the file mentions your parents or legal guardians. Please reply to this email with a document proving the relationship with the person who completed the Parent/Guardian Consent task (e.g., long-form birth certificate).",
              logNoteFr:
                "Postulant mineur et le certificat de naissance ne comporte pas le nom des parents",
            },
            {
              id: "naiss_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, le document n’est pas totalement visible. Veuillez téléverser une photo du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, or it is not fully visible. Please upload a photo of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Certificat de naissance incomplet",
            },
            {
              id: "naiss_verso",
              labelFr: "Verso manquant",
              labelEn: "Missing back side",
              instructionFr:
                "Le verso de votre certificat de naissance est manquant. Veuillez téléverser une photo du verso du document sur votre portail en ligne. Assurez-vous que l'image est nette et clairement lisible.",
              instructionEn:
                "The back side of your birth certificate is missing. Please upload a photo of the back of the document to your online portal. Ensure the image is clear and legible.",
              logNoteFr: "Verso manquant du certificat de naissance",
            },
            {
              id: "naiss_photocopie",
              labelFr: "Photocopie",
              labelEn: "Photocopy",
              instructionFr:
                "La photocopie de votre certificat de naissance n'est pas acceptée (un document original est exigé). Vous devez prendre une photo de votre document original et téléverser cette photo sur votre portail en ligne. Assurez-vous que l'image est nette et sans reflet.",
              instructionEn:
                "The photocopy of the birth certificate makes it invalid. You must take a photo of your document and upload this photo to your online portal. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Certificat de naissance est une photocopie",
            },
            {
              id: "naiss_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour du certificat de naissance",
            },
          ],
        },
        {
          nameFr: "Certificat de citoyenneté",
          nameEn: "Citizenship Certificate",
          reasons: [
            {
              id: "cit_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Certificat de citoyenneté flou",
            },
            {
              id: "cit_p1",
              labelFr: "Manque la page 1",
              labelEn: "Missing page 1",
              instructionFr:
                "Nous n’avons pas la première page de votre certificat de citoyenneté. Veuillez téléverser une photo de cette page.",
              linkFr: "Voici un lien vers un exemple de la <a href=\"https://simontheriault8-cyber.github.io/Documents/Certificat%20de%20citoyennet%C3%A9%20page%201.png\">page 1 du certificat de citoyenneté</a>.",
              instructionEn:
                "We do not have the first page of your citizenship certificate. Please upload a photo of this page.",
              linkEn: "Here is a link to an example of <a href=\"https://simontheriault8-cyber.github.io/Documents/Certificat%20de%20citoyennet%C3%A9%20page%201.png\">page 1 of the citizenship certificate</a>.",
              logNoteFr:
                "Il manque la première page du certificat de citoyenneté",
            },
            {
              id: "cit_p2",
              labelFr: "Manque la page 2",
              labelEn: "Missing page 2",
              instructionFr:
                "Nous n’avons pas la deuxième page de votre certificat de citoyenneté. Veuillez téléverser une photo de cette page.",
              linkFr: "Voici un lien vers un exemple de la <a href=\"https://simontheriault8-cyber.github.io/Documents/Certificat%20de%20citoyennet%C3%A9%20page%202.png\">page 2 du certificat de citoyenneté</a>.",
              instructionEn:
                "We do not have the second page of your citizenship certificate. Please upload a photo of this page.",
              linkEn: "Here is a link to an example of <a href=\"https://simontheriault8-cyber.github.io/Documents/Certificat%20de%20citoyennet%C3%A9%20page%202.png\">page 2 of the citizenship certificate</a>.",
              logNoteFr:
                "Il manque la deuxième page du certificat de citoyenneté",
            },
            {
              id: "cit_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, il manque des pages ou le document n’est pas totalement visible. Veuillez téléverser une photo complète du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, pages are missing, or it is not fully visible. Please upload a full photo of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Certificat de citoyenneté incomplet",
            },
            {
              id: "cit_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour du certificat de citoyenneté",
            },
          ],
        },
        {
          nameFr: "Carte de citoyenneté",
          nameEn: "Citizenship Card",
          reasons: [
            {
              id: "cc_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Carte de citoyenneté floue",
            },
            {
              id: "cc_verso",
              labelFr: "Verso manquant",
              labelEn: "Back side missing",
              instructionFr:
                "Le verso du document est manquant; veuillez téléverser une photo du verso de votre carte de citoyenneté.",
              instructionEn:
                "The back of the document is missing; please upload a photo of the back of your citizenship card.",
              logNoteFr: "Verso manquant de la carte de citoyenneté",
            },
            {
              id: "cc_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, le document n’est pas totalement visible. Veuillez téléverser une photo du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, or it is not fully visible. Please upload a photo of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Carte de citoyenneté incomplète",
            },
            {
              id: "cc_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour de la carte de citoyenneté",
            },
          ],
        },
        {
          nameFr: "Carte de résident permanent",
          nameEn: "Permanent Resident Card",
          reasons: [
            {
              id: "pr_floue",
              labelFr: "Floue / illisible",
              labelEn: "Blurred / Illegible",
              instructionFr:
                "Le document est floue et illisible. Veuillez prendre une nouvelle photo et la téléverser à nouveau. Assurez vous que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is blurred and illegible. Please take a new photo and upload it again. Ensure the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Carte de résident permanent floue",
            },
            {
              id: "pr_expire",
              labelFr: "Expiré",
              labelEn: "Expired",
              instructionFr:
                "Votre carte de résident permanent est expiré. Veuillez téléverser une version valide ou un certificat de citoyenneté.",
              instructionEn:
                "Your permanent resident card is expired. Please upload a valid version or a citizenship certificate.",
              logNoteFr: "Carte de résident permanent expirée",
            },
            {
              id: "pr_verso",
              labelFr: "Verso manquant",
              labelEn: "Missing back side",
              instructionFr:
                "Il manque le verso de la carte. Vous devez téléverser une copie des deux côtés du document.",
              instructionEn:
                "The back side of the card is missing. You must upload a copy of both sides of the document.",
              logNoteFr: "Verso manquant de la carte de résident permanent",
            },
            {
              id: "pr_incomplet",
              labelFr: "Document incomplet sur la photo",
              labelEn: "Incomplete document in the photo",
              instructionFr:
                "Le document est incomplet sur la photo, le document n’est pas totalement visible. Veuillez téléverser une photo du document en vous assurant que l’image est nette, sans reflet et que toutes les informations sont clairement visibles.",
              instructionEn:
                "The document is incomplete in the photo, or it is not fully visible. Please upload a photo of the document, ensuring the image is sharp, without glare, and all information is clearly visible.",
              logNoteFr: "Carte de résident permanent incomplète",
            },
            {
              id: "pr_maj",
              labelFr: "Mise à jour du document",
              labelEn: "Document update",
              instructionFr:
                "Pour la réouverture de votre dossier, nous aurons besoin que vous téléversiez la version la plus à jours de ce document dans votre portail du postulant.",
              instructionEn:
                "For the reopening of your file, we will need you to upload the most up-to-date version of this document to your applicant portal.",
              logNoteFr: "Mise à jour de la carte de résident permanent",
            },
          ],
        },
        {
          nameFr: "Document ne prouvant pas le statut de citoyenneté",
          nameEn: "Document does not prove citizenship status",
          reasons: [
            {
              id: "cit_invalide_passeport",
              labelFr: "Passeport",
              labelEn: "Passport",
              instructionFr:
                "Le passeport ne prouve pas la citoyenneté canadienne. Vous devez fournir soit un certificat de naissance d'une province canadienne, un certificat de citoyenneté, une carte de citoyenneté ou une carte de résident permanent.",
              instructionEn:
                "A passport does not prove Canadian citizenship. You must provide either a birth certificate from a Canadian province, a citizenship certificate, a citizenship card, or a permanent resident card.",
              logNoteFr:
                "Le passeport ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
            },
            {
              id: "cit_invalide_permis",
              labelFr: "Permis de conduire",
              labelEn: "Driver's license",
              instructionFr:
                "Le permis de conduire ne prouve pas la citoyenneté canadienne. Vous devez fournir soit un certificat de naissance d'une province canadienne, un certificat de citoyenneté, une carte de citoyenneté ou une carte de résident permanent.",
              instructionEn:
                "A driver's license does not prove Canadian citizenship. You must provide either a birth certificate from a Canadian province, a citizenship certificate, a citizenship card, or a permanent resident card.",
              logNoteFr:
                "Le permis de conduire ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
            },
            {
              id: "cit_invalide_ramq",
              labelFr: "Carte d'assurance maladie",
              labelEn: "Health insurance card",
              instructionFr:
                "La carte d'assurance maladie ne prouve pas la citoyenneté canadienne. Vous devez fournir soit un certificat de naissance d'une province canadienne, un certificat de citoyenneté, une carte de citoyenneté ou une carte de résident permanent.",
              instructionEn:
                "A health insurance card does not prove Canadian citizenship. You must provide either a birth certificate from a Canadian province, a citizenship certificate, a citizenship card, or a permanent resident card.",
              logNoteFr:
                "La carte d'assurance maladie ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
            },
            {
              id: "cit_invalide_acte_naissance",
              labelFr: "Copie d'acte de naissance",
              labelEn: "Statement of Live Birth",
              instructionFr:
                "La copie d'acte de naissance ne prouve pas la citoyenneté canadienne. Vous devez fournir soit un certificat de naissance d'une province canadienne, un certificat de citoyenneté, une carte de citoyenneté ou une carte de résident permanent.",
              instructionEn:
                "A Statement of Live Birth does not prove Canadian citizenship. You must provide either a birth certificate from a Canadian province, a citizenship certificate, a citizenship card, or a permanent resident card.",
              logNoteFr:
                "La copie d'acte de naissance ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
            },
            {
              id: "cit_invalide_confirmation_rp",
              labelFr: "Confirmation de résidence permanente",
              labelEn: "Confirmation of Permanent Residence",
              instructionFr:
                "La confirmation de résidence permanente n'est pas acceptée. Vous devez fournir votre carte de résident permanent.",
              instructionEn:
                "The Confirmation of Permanent Residence is not accepted. You must provide your Permanent Resident Card.",
              logNoteFr:
                "La confirmation de résidence permanente n'est pas acceptée. Doit fournir une carte de résident permanent.",
            },
            {
              id: "cit_invalide_naissance_etranger",
              labelFr: "Acte ou certificat de naissance étranger",
              labelEn: "Foreign birth certificate",
              instructionFr:
                "Le certificat ou acte de naissance étranger ne prouve pas votre statut de citoyenneté ou de résident permanent. Vous devez fournir soit un certificat de citoyenneté, une carte de citoyenneté ou une carte de résident permanent.",
              instructionEn:
                "A foreign birth certificate does not prove your citizenship or permanent resident status. You must provide either a citizenship certificate, a citizenship card, or a permanent resident card.",
              logNoteFr:
                "L'acte de naissance étranger ne prouve pas la citoyenneté. Doit fournir un certificat/carte de citoyenneté ou carte RP",
            },
            {
              id: "cit_invalide_visa",
              labelFr: "Visa",
              labelEn: "Visa",
              instructionFr:
                "Le visa ne prouve pas la citoyenneté canadienne ni le statut de résident permanent. Vous devez fournir soit un certificat de naissance d'une province canadienne, un certificat de citoyenneté, une carte de citoyenneté ou une carte de résident permanent.",
              instructionEn:
                "A visa does not prove Canadian citizenship or permanent resident status. You must provide either a birth certificate from a Canadian province, a citizenship certificate, a citizenship card, or a permanent resident card.",
              logNoteFr:
                "Le visa ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
            },
            {
              id: "cit_invalide_bapteme",
              labelFr: "Certificat de baptême ou copie de certificat de baptême",
              labelEn: "Baptism certificate or copy of baptism certificate",
              instructionFr:
                "Le certificat de baptême ou la copie de certificat de baptême ne prouve pas la citoyenneté canadienne. Vous devez fournir soit un certificat de naissance d'une province canadienne, un certificat de citoyenneté, une carte de citoyenneté ou une carte de résident permanent.",
              instructionEn:
                "A baptism certificate or copy of a baptism certificate does not prove Canadian citizenship. You must provide either a birth certificate from a Canadian province, a citizenship certificate, a citizenship card, or a permanent resident card.",
              logNoteFr:
                "Le certificat de baptême ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
            },
            {
              id: "cit_invalide_permis_travail",
              labelFr: "Permis de travail",
              labelEn: "Work permit",
              instructionFr:
                "Le permis de travail ne prouve pas la citoyenneté canadienne ni le statut de résident permanent. Vous devez fournir soit un certificat de naissance d'une province canadienne, un certificat de citoyenneté, une carte de citoyenneté ou une carte de résident permanent.",
              instructionEn:
                "A work permit does not prove Canadian citizenship or permanent resident status. You must provide either a birth certificate from a Canadian province, a citizenship certificate, a citizenship card, or a permanent resident card.",
              logNoteFr:
                "Le permis de travail ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
            },
            {
              id: "cit_invalide_asile",
              labelFr: "Avis de décision d'une demande d'asile",
              labelEn: "Notice of Decision on a Refugee Claim",
              instructionFr:
                "L'avis de décision d'une demande d'asile ne prouve pas la citoyenneté canadienne ni le statut de résident permanent. Vous devez fournir soit un certificat de naissance d'une province canadienne, un certificat de citoyenneté, une carte de citoyenneté ou une carte de résident permanent.",
              instructionEn:
                "The Notice of Decision on a refugee claim does not prove Canadian citizenship or permanent resident status. You must provide either a birth certificate from a Canadian province, a citizenship certificate, a citizenship card, or a permanent resident card.",
              logNoteFr:
                "L'avis de décision d'une demande d'asile ne prouve pas la citoyenneté. Doit fournir un certificat de naissance, certificat/carte de citoyenneté ou carte RP",
            },
          ],
        },
      ],
    }
];
