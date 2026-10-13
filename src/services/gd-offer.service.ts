import { Injectable } from "@angular/core";
import { RecruitmentCenter } from "./jobs-data";
import { UniteAffectation } from "../app/models/app.models";

export interface GdOfferEmailParams {
  evaluationMedicaleType: 'Dossier régulier' | 'Dossier OTA';
  offreMetier: string;
  offreProgrammeEnrolement: string;
  offreElement: string;
  offreDureeContrat: string;
  offreEtudesSubventionnees: string;
  offreDureeEtudesSubventionnees: string;
  dateEnrolFr: string;
  dateEnrolEn: string;
  selectedCenter?: RecruitmentCenter;
  offreLieuEnrolement: string;
  dateArrivee: string;
  datesCours: string;
  hasCourseDates: boolean;
  elementsManquantsBlocksFr: { dateLimiteStr: string; elementsPlain: string; elementsHtmlList: string };
  elementsManquantsBlocksEn: { dateLimiteStr: string; elementsPlain: string; elementsHtmlList: string };
  uniteAffectationObj: UniteAffectation;
  isUic3613: boolean;
  isConjointDeFait: boolean;
  city: string;
  serieCours: string;
  heurePostulant: string;
  heureInvites: string;
  jourSemaineFr: string;
  jourSemaineEn: string;
  dateArriveeFormatted: string;
  dateEnrolRaw: string;
  formulairesSuppPlainFr: string;
  formulairesSuppPlainEn: string;
  formulairesSuppHtmlFr: string;
  formulairesSuppHtmlEn: string;
  sigFr: string;
  sigEn: string;
  sigHtmlFr: string;
  sigHtmlEn: string;
}

export interface GdOfferNoteParams {
  offreMetier: string;
  noteStatutCivil: string;
  noteConjoint: string;
  noteConjointTexte: string;
  noteEnfantCount: string;
  noteEnfantDetails: { sex: string; year: string }[];
  notePlaqueImm: string;
  noteBrisBail: string;
  noteEntreposage: string;
  noteSermentDeclaration: string;
  noteInviteMil: string;
  noteInviteMilTexte: string;
  noteSvcMilAnt: string;
  noteBeneficiaire: string;
  dateCourrielConfirmation: string;
}

@Injectable({
  providedIn: "root",
})
export class GdOfferService {
  getTeamsLinkPlainFr(city: string): string {
    if (city === 'Montréal') {
      return "Lien pour assister à la cérémonie par Teams : https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn\n\n\n";
    } else if (city === 'Québec') {
      return "Lien pour assister à la cérémonie par Teams : https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U\n\n\n";
    }
    return "\n\n";
  }

  getTeamsLinkPlainEn(city: string): string {
    if (city === 'Montréal') {
      return "Link to attend the ceremony via Teams: https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn\n\n\n";
    } else if (city === 'Québec') {
      return "Link to attend the ceremony via Teams: https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U\n\n\n";
    }
    return "\n\n";
  }

  getTeamsLinkHtmlFr(city: string): string {
    if (city === 'Montréal') {
      return `<p><strong>Lien pour assister à la cérémonie par Teams :</strong> <a href="https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn</a></p>`;
    } else if (city === 'Québec') {
      return `<p><strong>Lien pour assister à la cérémonie par Teams :</strong> <a href="https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U</a></p>`;
    }
    return "";
  }

  getTeamsLinkHtmlEn(city: string): string {
    if (city === 'Montréal') {
      return `<p><strong>Link to attend the ceremony via Teams:</strong> <a href="https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.microsoft.com/meet/269424678350987?p=U8W17Q49zAsTGFVtrn</a></p>`;
    } else if (city === 'Québec') {
      return `<p><strong>Link to attend the ceremony via Teams:</strong> <a href="https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U" target="_blank" style="color: #2563eb; text-decoration: underline;">https://teams.live.com/meet/9379576941499?p=ddWGzRuSQH5MxDMO3U</a></p>`;
    }
    return "";
  }

  getOffreLinksBlockPlain(params: { isConjoint: boolean; uniteNom: string; isUic3613: boolean }, lang: 'fr' | 'en'): string {
    const { isConjoint, uniteNom, isUic3613 } = params;

    if (lang === 'fr') {
      let res = '';
      if (isUic3613) {
        if (isConjoint) {
          res += `Voici les liens vers vos instructions de ralliement, instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += "Instructions de ralliement (QMB/QMBO) : https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf\n";
          res += "Instruction union de fait : https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf\n";
          res += "Demande de cote de sécurité (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf\n";
        } else {
          res += `Voici les liens vers vos instructions de ralliement et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += "Instructions de ralliement (QMB/QMBO) : https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf\n";
          res += "Demande de cote de sécurité (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf\n";
        }
      } else {
        if (isConjoint) {
          res += `Voici les liens vers votre instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += "Instruction union de fait : https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf\n";
          res += "Demande de cote de sécurité (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf\n";
        } else {
          res += `Voici le lien vers votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.\n`;
          res += "Demande de cote de sécurité (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf\n";
        }
      }

      res += "Voici un exemple de tenue de ville, tenue vestimentaire pour la cérémonie : https://simontheriault8-cyber.github.io/Documents/Exemples - Tenue de ville.pdf\n";
      res += "\n\n\n";
      return res;
    } else {
      let res = '';
      if (isUic3613) {
        if (isConjoint) {
          res += `Here are the links to your joining instructions, common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += "Joining Instructions (BMQ/BMOQ) : https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf\n";
          res += "Common-Law partnership instruction : https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf\n";
          res += "Security Screening Application (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf\n";
        } else {
          res += `Here are the links to your joining instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += "Joining Instructions (BMQ/BMOQ) : https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf\n";
          res += "Security Screening Application (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf\n";
        }
      } else {
        if (isConjoint) {
          res += `Here are the links to your common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += "Common-Law partnership instruction : https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf\n";
          res += "Security Screening Application (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf\n";
        } else {
          res += `Here is the link to your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += "Security Screening Application (TBS330-61) : https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf\n";
        }
      }

      res += "Here is an example of business casual / dress code for the ceremony : https://simontheriault8-cyber.github.io/Documents/Exemples - Tenue de ville.pdf\n";
      res += "\n\n\n";
      return res;
    }
  }

  getOffreLinksBlockHtml(params: { isConjoint: boolean; uniteNom: string; isUic3613: boolean }, lang: 'fr' | 'en'): string {
    const { isConjoint, uniteNom, isUic3613 } = params;

    if (lang === 'fr') {
      let res = '<p>';
      if (isUic3613) {
        if (isConjoint) {
          res += `Voici les liens vers vos instructions de ralliement, instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instructions de ralliement (QMB/QMBO)</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instruction union de fait</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        } else {
          res += `Voici les liens vers vos instructions de ralliement et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instructions de ralliement (QMB/QMBO)</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        }
      } else {
        if (isConjoint) {
          res += `Voici les liens vers votre instruction pour union de fait et votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instruction union de fait</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        } else {
          res += `Voici le lien vers votre demande de cote de sécurité (TBS330-61). La demande de cote de sécurité devra être complété de la section B à la section K et apporté à : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Demande de cote de sécurité (TBS330-61)</a>`;
        }
      }

      res += `<br>Voici un exemple de tenue de ville, tenue vestimentaire pour la cérémonie : <a href="https://simontheriault8-cyber.github.io/Documents/Exemples - Tenue de ville.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Tenue de ville</a>`;
      res += `</p>`;
      return res;
    } else {
      let res = '<p>';
      if (isUic3613) {
        if (isConjoint) {
          res += `Here are the links to your joining instructions, common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Joining Instructions (BMQ/BMOQ)</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Common-Law partnership instruction</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        } else {
          res += `Here are the links to your joining instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Joining Instructions (BMQ/BMOQ)</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        }
      } else {
        if (isConjoint) {
          res += `Here are the links to your common-law partnership instructions and your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.\n`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Common-Law partnership instruction</a><br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        } else {
          res += `Here is the link to your security screening application (TBS330-61). The security screening application must be completed from section B to section K and brought to : ${uniteNom}.<br>`;
          res += `<a href="https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Security Screening Application (TBS330-61)</a>`;
        }
      }

      res += `<br>Here is an example of business casual / dress code for the ceremony : <a href="https://simontheriault8-cyber.github.io/Documents/Exemples - Tenue de ville.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Tenue de ville</a>`;
      res += `</p>`;
      return res;
    }
  }

  getOffreEvenementsParticuliersPlainFr(): string {
    let res = "Information à communiquer si des événements particuliers se produisent avant la journée de votre enrôlement :\n\n";
    res += "•\tSi vous recevez une contravention avant votre enrôlement, vous devez la payer et apporter la preuve de paiement. Si vous êtes dans l’impossibilité de la payer, veuillez nous contacter avant votre enrôlement;\n\n";
    res += "•\tSi vous avez des obligations envers la justice qui n’ont pas été déclarées lors de votre entrevue avec le conseiller en carrière militaire;\n\n";
    res += "•\tSi vous changez d’adresse ou d’état civil, vous devez nous aviser immédiatement afin que la bonne information se retrouve sur vos documents d’enrôlement;\n\n";
    res += "•\tSi vous avez un changement au niveau médical, veuillez aviser votre gestionnaire de dossier le plus tôt possible avant votre enrôlement.\n\n\n";
    return res;
  }

  getOffreEvenementsParticuliersPlainEn(): string {
    let res = "Information to report if specific events occur before the day of your enrolment:\n\n";
    res += "•\tIf you receive a ticket/fine before your enrolment, you must pay it and bring proof of payment. If you are unable to pay it, please contact us before your enrolment;\n\n";
    res += "•\tIf you have legal obligations that were not declared during your interview with the military career counsellor;\n\n";
    res += "•\tIf you change your address or marital status, you must notify us immediately so that the correct information appears on your enrolment documents;\n\n";
    res += "•\tIf you experience any medical changes, please notify your file manager as soon as possible before your enrolment.\n\n\n";
    return res;
  }

  getOffreEvenementsParticuliersHtmlFr(): string {
    return `<p style="margin-top: 10px; margin-bottom: 6px;"><strong>Information à communiquer si des événements particuliers se produisent avant la journée de votre enrôlement :</strong></p>
<ul style="list-style-type: disc; margin-top: 5px; margin-bottom: 15px; padding-left: 20px;">
  <li style="margin-bottom: 6px;">Si vous recevez une contravention avant votre enrôlement, vous devez la payer et apporter la preuve de paiement. Si vous êtes dans l’impossibilité de la payer, veuillez nous contacter avant votre enrôlement;</li>
  <li style="margin-bottom: 6px;">Si vous avez des obligations envers la justice qui n’ont pas été déclarées lors de votre entrevue avec le conseiller en carrière militaire;</li>
  <li style="margin-bottom: 6px;">Si vous changez d’adresse ou d’état civil, vous devez nous aviser immédiatement afin que la bonne information se retrouve sur vos documents d’enrôlement;</li>
  <li style="margin-bottom: 6px;">Si vous avez un changement au niveau médical, veuillez aviser votre gestionnaire de dossier le plus tôt possible avant votre enrôlement.</li>
</ul>`;
  }

  getOffreEvenementsParticuliersHtmlEn(): string {
    return `<p style="margin-top: 10px; margin-bottom: 6px;"><strong>Information to report if specific events occur before the day of your enrolment:</strong></p>
<ul style="list-style-type: disc; margin-top: 5px; margin-bottom: 15px; padding-left: 20px;">
  <li style="margin-bottom: 6px;">If you receive a ticket/fine before your enrolment, you must pay it and bring proof of payment. If you are unable to pay it, please contact us before your enrolment;</li>
  <li style="margin-bottom: 6px;">If you have legal obligations that were not declared during your interview with the military career counsellor;</li>
  <li style="margin-bottom: 6px;">If you change your address or marital status, you must notify us immediately so that the correct information appears on your enrolment documents;</li>
  <li style="margin-bottom: 6px;">If you experience any medical changes, please notify your file manager as soon as possible before your enrolment.</li>
</ul>`;
  }

  getOffreOtaSectionPlainFr(p: GdOfferEmailParams): string {
    const nomUnite = p.uniteAffectationObj.nom || 'N/A';
    const lieuEnrol = 'Centre de recrutement des Forces Canadiennes, 1600 boulevard René-Lévesque Ouest, bureau 140, Montréal, QC, H3H 1P9';

    let txt = "Veuillez lire ce courriel - attentivement et au complet - afin d’être prêt pour votre enrôlement.\n\n";
    txt += "1. (Si vous ne l’avez pas déjà fourni) Transmettre (par courriel ou par téléphone) l’information suivante, le PLUS RAPIDEMENT POSSIBLE avant votre enrôlement :\n";
    txt += "• Votre numéro d’assurance social;\n";
    txt += "• Le numéro d’immatriculation de votre véhicule (si utilisé pour aller à St-Jean);\n";
    txt += "• Les coordonnées d’une personne à contacter en cas d'urgence: prénom et nom de famille / adresse du domicile incluant le code postal / numéro de téléphone / le lien que vous avez avec cette personne (père, mère, frère, sœur, conjoint(e), ami, etc.);\n";
    txt += "• Les coordonnées d’un bénéficiaire en cas de décès qui doit être âgé de 18 ans ou plus. Les informations que vous devez fournir au sujet de cette personne sont : prénom et nom de famille / adresse du domicile incluant le code postal / numéro de téléphone / date de naissance du bénéficiaire: le jour, le mois et l’année / le lien que vous avez avec cette personne (père, mère, frère, sœur, conjoint(e), ami, etc.);\n\n";

    txt += "2. Si cela s’applique, vous devez envoyer une photo des documents suivant en répondant à ce courriel:\n";
    txt += "• Certificats de naissance de votre conjoint(e), de vos enfants (copie originale);\n";
    txt += "• Mariage au Canada: certificat de mariage (copie originale);\n";
    txt += "• Mariage à l’étranger : certificat de mariage (copie originale) - doit être rédigé en français ou en anglais; s’il est écrit dans une autre langue, il doit être accompagné d’une traduction;\n\n";

    txt += "3. Instruction concernant les documents suivants :\n";
    txt += `• TBS 330-61-FR (https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf) : vous devez compléter ce formulaire et l'apporter à ${nomUnite}. Les sections du formulaire que vous devez remplir sont de B à K;\n`;
    txt += "• Union de fait_procédure (https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf) : si votre état civil est conjoint de fait, veuillez prendre connaissance de ce document;\n";
    txt += "• Exemples de tenue de ville (https://simontheriault8-cyber.github.io/Documents/Exemples%20-%20Tenue%20de%20ville.pdf), tenue vestimentaire pour la cérémonie;\n";
    if (p.isUic3613) {
      txt += "• Instruction_de_ralliement_ELRFC_FR (https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf) : instructions de ralliement pour l’École de leadership et de recrues des Forces canadiennes.\n";
    }
    txt += "\n";

    txt += "4. La journée de votre enrôlement, assurez-vous d’avoir en main les documents suivants :\n";
    txt += "• Spécimen de chèque;\n";
    txt += "• Pièce d’identité valide avec photo;\n";
    txt += "• Certificat de naissance ou de citoyenneté original de vous et de vos dépendants s’il y a lieu;\n";
    txt += "• Conjoint de fait: preuves d’adresses comme spécifié dans le document Word en pièce jointe;\n";
    txt += "• Carte d’assurance maladie provinciale de votre conjoint(e), de vos enfants (copie originale) s’il réside avec vous;\n";
    txt += "• Preuve officielle de la Cour si votre état civil est divorcé.\n\n";

    txt += "5. Photo le jour de l’enrôlement:\n";
    txt += "• Apportez votre appareil photo ou cellulaire si vous désirez avoir des photos de la cérémonie.\n\n";

    txt += "6. Information à communiquer si des événements particuliers se produisent avant la journée de votre enrôlement :\n";
    txt += "• Si vous recevez une contravention avant votre enrôlement, vous devez la payer et apporter la preuve de paiement. Si vous êtes dans l’impossibilité de la payer, veuillez nous contacter avant votre enrôlement;\n";
    txt += "• Si vous avez des obligations envers la justice qui n’ont pas été déclarées lors de votre entrevue avec le conseiller en carrière militaire;\n";
    txt += "• Si vous changez d’adresse ou d’état civil, vous devez nous aviser immédiatement afin que la bonne information se retrouve sur vos documents d’enrôlement;\n";
    txt += "• Si vous avez un changement au niveau médical, veuillez aviser la section médicale au poste 4909 le plus tôt possible avant votre enrôlement.\n\n";

    txt += "7. Informez-vous sur l’éthos des forces armées canadiennes en cliquant sur le lien suivant:\n";
    txt += "• Énoncé d'éthique de la Défense - Canada.ca (https://www.canada.ca/fr/ministere-defense-nationale/services/avantages-militaires/ethique-defense/publications-politiques/enonce.html)\n\n";

    txt += "Enrôlement administratif et assermentation:\n";
    txt += `Date: ${p.dateEnrolRaw || 'jour / mois / année'}\n`;
    txt += `Heure d’arrivée: ${p.heurePostulant || '07h30'}\n`;
    txt += `Heure de la présentation Teams pour les invités: ${p.heureInvites || '09h40'} via un lien qui sera envoyé le lundi de la semaine de votre enrôlement.\n`;
    txt += `Lieu: ${lieuEnrol}\n`;
    txt += "Habillement: tenue de ville propre\n\n";

    txt += "Unité d'affectation :\n";
    txt += `• Date d'arrivée : Vous devez vous présenter à ${nomUnite} le ${p.jourSemaineFr || 'jour de la semaine'} : ${p.dateArriveeFormatted || 'jour / mois / année'} au plus tard à 16h00.\n`;
    if (p.serieCours) {
      txt += `• Numéro du cours : ${p.serieCours}\n`;
      txt += `• Dates du cours : ${p.datesCours}\n`;
    }
    txt += "\n";

    txt += "Un retard lors de la journée de votre enrôlement n’est pas acceptable.\n\n";
    txt += "Pour toutes questions, veuillez contacter l’adresse courriel suivante \n";
    txt += ": appointments.montreal@forces.gc.ca\n\n";
    txt += "Merci de votre intérêt envers les Forces armées canadiennes,\n\n";
    txt += "«Veuillez prendre note que l’information que nous recueillons sert uniquement à des fins de sélection et d’emploi et elle ne peut être fournie qu’à d’autres employés autorisés du Ministère de la Défense nationale. En d’autres termes, il nous est interdit de divulguer sans votre consentement, des renseignements qui vous concernent à des gens comme des membres de votre famille, votre conjoint, votre employeur ou professeur. Si une personne non autorisée nous appelait pour poser des questions à votre sujet, nous lui dirions de communiquer avec vous. Par ailleurs, si vous désirez faire une demande d’accès à des renseignements personnels ou une demande de modification à des renseignements incorrects ou qui ne sont pas clairs, vous pouvez le faire par écrit en vertu de la Loi sur la protection des renseignements personnels.»\n\n";
    txt += p.sigFr;

    return txt;
  }

  getOffreOtaSectionPlainEn(p: GdOfferEmailParams): string {
    const nomUnite = p.uniteAffectationObj.nom || 'N/A';
    const lieuEnrol = 'Canadian Forces Recruiting Centre, 1600 René-Lévesque Boulevard West, Suite 140, Montreal, QC, H3H 1P9';

    let txt = "Please read this email - carefully and in its entirety - in order to be prepared for your enrolment.\n\n";
    txt += "1. (If you have not already provided it) Submit (by email or phone) the following information, AS SOON AS POSSIBLE before your enrolment:\n";
    txt += "• Your Social Insurance Number;\n";
    txt += "• Your vehicle licence plate number (if used to travel to St-Jean);\n";
    txt += "• Contact information for an emergency contact: first and last name / home address including postal code / phone number / relationship to you (father, mother, brother, sister, spouse/partner, friend, etc.);\n";
    txt += "• Contact information for a beneficiary in the event of death who must be 18 years of age or older. The information you must provide about this person is: first and last name / home address including postal code / phone number / date of birth of the beneficiary: day, month, and year / relationship to you (father, mother, brother, sister, spouse/partner, friend, etc.);\n\n";

    txt += "2. If applicable, you must send a photo of the following documents by replying to this email:\n";
    txt += "• Birth certificates of your spouse/partner, your children (original copy);\n";
    txt += "• Marriage in Canada: marriage certificate (original copy);\n";
    txt += "• Marriage abroad: marriage certificate (original copy) - must be in French or English; if in another language, it must be accompanied by a certified translation;\n\n";

    txt += "3. Instructions regarding the following documents:\n";
    txt += `• 330-61-EN SSACF (https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf) : you must complete this form and bring it to ${nomUnite}. The sections of the form you must complete are from B to K;\n`;
    txt += "• Common-law_partership_procedure (https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf) : if your marital status is common-law, please review this document;\n";
    txt += "• Business casual examples (https://simontheriault8-cyber.github.io/Documents/Exemples%20-%20Tenue%20de%20ville.pdf), dress code for the ceremony;\n";
    if (p.isUic3613) {
      txt += "• CFLRS_Joining_Instructions_EN (https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf) : joining instructions for the Canadian Forces Leadership and Recruit School.\n";
    }
    txt += "\n";

    txt += "4. On the day of your enrolment, ensure you have the following documents in hand:\n";
    txt += "• Void cheque;\n";
    txt += "• Valid photo identification;\n";
    txt += "• Original birth certificate or citizenship certificate for yourself and your dependants if applicable;\n";
    txt += "• Common-law partner: proof of address as specified in the attached Word document;\n";
    txt += "• Provincial health insurance card of your spouse/partner, your children (original copy) if residing with you;\n";
    txt += "• Official court document if your marital status is divorced.\n\n";

    txt += "5. Photos on the day of enrolment:\n";
    txt += "• Bring your camera or mobile phone if you wish to take photos of the ceremony.\n\n";

    txt += "6. Information to report if specific events occur before your enrolment day:\n";
    txt += "• If you receive a ticket/fine before your enrolment, you must pay it and bring proof of payment. If you are unable to pay it, please contact us before your enrolment;\n";
    txt += "• If you have any legal obligations that were not declared during your interview with the military career counsellor;\n";
    txt += "• If you change your address or marital status, you must notify us immediately so that the correct information appears on your enrolment documents;\n";
    txt += "• If you experience any medical change, please notify the medical section at extension 4909 as soon as possible before your enrolment.\n\n";

    txt += "7. Learn about the Canadian Armed Forces ethos by clicking on the following link:\n";
    txt += "• Statement of Defence Ethics - Canada.ca (https://www.canada.ca/en/department-national-defence/services/benefits-military/defence-ethics/policies-publications/statement.html)\n\n";

    txt += "Administrative Enrolment and Swearing-in Ceremony:\n";
    txt += `Date: ${p.dateEnrolRaw || 'day / month / year'}\n`;
    txt += `Arrival time: ${p.heurePostulant || '07h30'}\n`;
    txt += `Teams presentation time for guests: ${p.heureInvites || '09h40'} via a link that will be sent on Monday of the week of your enrolment.\n`;
    txt += `Location: ${lieuEnrol}\n`;
    txt += "Dress: Clean business casual\n\n";

    txt += "Posting unit:\n";
    txt += `• Arrival date: You must report to ${nomUnite} on ${p.jourSemaineEn || 'day of the week'}: ${p.dateArriveeFormatted || 'day / month / year'} by 16:00 at the latest.\n`;
    if (p.serieCours) {
      txt += `• Course number: ${p.serieCours}\n`;
      txt += `• Course dates: ${p.datesCours}\n`;
    }
    txt += "\n";

    txt += "Tardiness on the day of your enrolment is not acceptable.\n\n";
    txt += "For any questions, please contact the following email address:\n";
    txt += "appointments.montreal@forces.gc.ca\n\n";
    txt += "Thank you for your interest in the Canadian Armed Forces,\n\n";
    txt += "«Please note that the information we collect is used solely for selection and employment purposes and may only be provided to other authorized employees of the Department of National Defence. In other words, we are prohibited from disclosing, without your consent, information concerning you to individuals such as members of your family, your spouse, your employer, or your teacher. If an unauthorized person were to contact us with questions about you, we would instruct them to contact you directly. Furthermore, if you wish to submit a request for access to personal information or a request for correction of information that is incorrect or unclear, you may do so in writing pursuant to the Privacy Act.»\n\n";
    txt += p.sigEn;

    return txt;
  }

  getOffreOtaEmailPlain(p: GdOfferEmailParams): string {
    const fr = "English message will follow.\n\n" + this.getOffreOtaSectionPlainFr(p);
    const en = this.getOffreOtaSectionPlainEn(p);
    return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

  getOffreOtaSectionHtmlFr(p: GdOfferEmailParams): string {
    const nomUnite = p.uniteAffectationObj.nom || 'N/A';
    const lieuEnrolHtml = 'Centre de recrutement des Forces Canadiennes, 1600 boulevard René-Lévesque Ouest, bureau 140, Montréal, QC, H3H 1P9';

    let html = '';
    html += `<p style="margin-bottom: 12px;"><span style="background-color: #ffff00;">Veuillez lire ce courriel - attentivement et au complet - afin d’être prêt pour votre enrôlement.</span></p>`;
    html += `<p style="margin-bottom: 6px;"><strong>1. (Si vous ne l’avez pas déjà fourni) Transmettre (par courriel ou par téléphone) l’information suivante, le PLUS RAPIDEMENT POSSIBLE avant votre enrôlement :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Votre numéro d’assurance social;</li>`;
    html += `<li>Le numéro d’immatriculation de votre véhicule (si utilisé pour aller à St-Jean);</li>`;
    html += `<li>Les coordonnées d’une <u><strong>personne à contacter en cas d'urgence</strong></u>: prénom et nom de famille / adresse du domicile incluant le code postal / numéro de téléphone / le lien que vous avez avec cette personne (père, mère, frère, sœur, conjoint(e), ami, etc.);</li>`;
    html += `<li>Les coordonnées d’un <u><strong>bénéficiaire en cas de décès</strong></u> qui doit être âgé de 18 ans ou plus. Les informations que vous devez fournir au sujet de cette personne sont : prénom et nom de famille / adresse du domicile incluant le code postal / numéro de téléphone / date de naissance du bénéficiaire: le jour, le mois et l’année / le lien que vous avez avec cette personne (père, mère, frère, sœur, conjoint(e), ami, etc.);</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>2. Si cela s’applique, vous devez envoyer une <span style="background-color: #ffff00;">photo</span> des documents suivant en répondant à ce courriel:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Certificats de naissance de votre conjoint(e), de vos enfants (copie originale);</li>`;
    html += `<li>Mariage au Canada: certificat de mariage (copie originale);</li>`;
    html += `<li>Mariage à l’étranger : certificat de mariage (copie originale) - doit être rédigé en français ou en anglais; s’il est écrit dans une autre langue, il doit être accompagné d’une traduction;</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>3. Instruction concernant les documents suivants :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/TBS%20330-61-Formulaire%20de%20consentement%20et%20de%20demande%20de%20filtrage%20de%20s%C3%A9curit%C3%A9.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">TBS 330-61-FR</a> : vous devez compléter ce formulaire et l'apporter à ${nomUnite}. Les sections du formulaire que vous devez remplir sont de B à K;</li>`;
    html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Union de fait_procédure</a> : si votre état civil est conjoint de fait, veuillez prendre connaissance de ce document;</li>`;
    html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Exemples%20-%20Tenue%20de%20ville.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Exemples de tenue de ville</a>, tenue vestimentaire pour la cérémonie;</li>`;
    if (p.isUic3613) {
      html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Instruction%20de%20raliement-QMB-FR.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Instruction_de_ralliement_ELRFC_FR</a> : instructions de ralliement pour l’École de leadership et de recrues des Forces canadiennes.</li>`;
    }
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>4. La journée de votre enrôlement, assurez-vous d’avoir en main les documents suivants :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Spécimen de chèque;</li>`;
    html += `<li>Pièce d’identité valide avec photo;</li>`;
    html += `<li>Certificat de naissance ou de citoyenneté original de vous et de vos dépendants s’il y a lieu;</li>`;
    html += `<li>Conjoint de fait: preuves d’adresses comme spécifié dans le document Word en pièce jointe;</li>`;
    html += `<li>Carte d’assurance maladie provinciale de votre conjoint(e), de vos enfants (copie originale) s’il réside avec vous;</li>`;
    html += `<li>Preuve officielle de la Cour si votre état civil est divorcé.</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>5. Photo le jour de l’enrôlement:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Apportez votre appareil photo ou cellulaire si vous désirez avoir des photos de la cérémonie.</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>6. Information à communiquer si des événements particuliers se produisent avant la journée de votre enrôlement :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Si vous recevez une contravention avant votre enrôlement, vous devez la payer et apporter la preuve de paiement. Si vous êtes dans l’impossibilité de la payer, veuillez nous contacter avant votre enrôlement;</li>`;
    html += `<li>Si vous avez des obligations envers la justice qui n’ont pas été déclarées lors de votre entrevue avec le conseiller en carrière militaire;</li>`;
    html += `<li>Si vous changez d’adresse ou d’état civil, vous devez nous aviser immédiatement afin que la bonne information se retrouve sur vos documents d’enrôlement;</li>`;
    html += `<li>Si vous changez d’adresse ou d’état civil, vous devez nous aviser immédiatement afin que la bonne information se retrouve sur vos documents d’enrôlement;</li>`;
    html += `<li>Si vous avez un changement au niveau médical, veuillez aviser la section médicale au poste 4909 le plus tôt possible avant votre enrôlement.</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>7. Informez-vous sur l’éthos des forces armées canadiennes en cliquant sur le lien suivant:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 16px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><a href="https://www.canada.ca/fr/ministere-defense-nationale/services/avantages-militaires/ethique-defense/publications-politiques/enonce.html" target="_blank" style="color: #2563eb; text-decoration: underline;">Énoncé d'éthique de la Défense - Canada.ca</a></li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 14px;"><u><strong>Enrôlement administratif et assermentation:</strong></u><br>`;
    html += `<strong>Date:</strong> ${p.dateEnrolRaw || 'jour / mois / année'}<br>`;
    html += `<strong>Heure d’arrivée:</strong> ${p.heurePostulant || '07h30'}<br>`;
    html += `<strong>Heure de la présentation Teams pour les invités:</strong> ${p.heureInvites || '09h40'} via un lien qui sera envoyé le lundi de la semaine de votre enrôlement.<br>`;
    html += `<strong>Lieu:</strong> ${lieuEnrolHtml}<br>`;
    html += `<strong>Habillement:</strong> tenue de ville propre</p>`;

    html += `<p style="margin-bottom: 6px;"><u><strong>Unité d'affectation :</strong></u></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><strong>Date d'arrivée :</strong> Vous devez vous présenter à ${nomUnite} le <strong>${p.jourSemaineFr || 'jour de la semaine'} : ${p.dateArriveeFormatted || 'jour / mois / année'}</strong> au plus tard à 16h00.</li>`;
    if (p.serieCours) {
      html += `<li><strong>Numéro du cours :</strong> ${p.serieCours}</li>`;
      html += `<li><strong>Dates du cours :</strong> ${p.datesCours}</li>`;
    }
    html += `</ul>`;

    html += `<p style="margin-bottom: 14px;"><span style="background-color: #ffff00;">Un retard lors de la journée de votre enrôlement n’est pas acceptable.</span></p>`;
    html += `<p style="margin-bottom: 14px;">Pour toutes questions, veuillez contacter l’adresse courriel suivante<br>`;
    html += `: <a href="mailto:appointments.montreal@forces.gc.ca" style="color: #2563eb; text-decoration: underline;">appointments.montreal@forces.gc.ca</a></p>`;
    html += `<p style="margin-bottom: 12px;">Merci de votre intérêt envers les Forces armées canadiennes,</p>`;
    html += `<p style="color: #c00000; font-style: italic; font-size: 10pt; line-height: 1.4; margin-bottom: 16px;">«Veuillez prendre note que l’information que nous recueillons sert uniquement à des fins de sélection et d’emploi et elle ne peut être fournie qu’à d’autres employés autorisés du Ministère de la Défense nationale. En d’autres termes, il nous est interdit de divulguer sans votre consentement, des renseignements qui vous concernent à des gens comme des membres de votre famille, votre conjoint, votre employeur ou professeur. Si une personne non autorisée nous appelait pour poser des questions à votre sujet, nous lui dirions de communiquer avec vous. Par ailleurs, si vous désirez faire une demande d’accès à des renseignements personnels ou une demande de modification à des renseignements incorrects ou qui ne sont pas clairs, vous pouvez le faire par écrit en vertu de la Loi sur la protection des renseignements personnels.»</p>`;
    html += `<p>${p.sigHtmlFr}</p>`;

    return html;
  }

  getOffreOtaSectionHtmlEn(p: GdOfferEmailParams): string {
    const nomUnite = p.uniteAffectationObj.nom || 'N/A';
    const lieuEnrolHtml = 'Canadian Forces Recruiting Centre, 1600 René-Lévesque Boulevard West, Suite 140, Montreal, QC, H3H 1P9';

    let html = '';
    html += `<p style="margin-bottom: 12px;"><span style="background-color: #ffff00;">Please read this email - carefully and in its entirety - in order to be prepared for your enrolment.</span></p>`;
    html += `<p style="margin-bottom: 6px;"><strong>1. (If you have not already provided it) Submit (by email or phone) the following information, AS SOON AS POSSIBLE before your enrolment:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Your Social Insurance Number;</li>`;
    html += `<li>Your vehicle licence plate number (if used to travel to St-Jean);</li>`;
    html += `<li>Contact information for an <u><strong>emergency contact</strong></u>: first and last name / home address including postal code / phone number / relationship to you (father, mother, brother, sister, spouse/partner, friend, etc.);</li>`;
    html += `<li>Contact information for a <u><strong>beneficiary in the event of death</strong></u> who must be 18 years of age or older. The information you must provide about this person is: first and last name / home address including postal code / phone number / date of birth of the beneficiary: day, month, and year / relationship to you (father, mother, brother, sister, spouse/partner, friend, etc.);</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>2. If applicable, you must send a <span style="background-color: #ffff00;">photo</span> of the following documents by replying to this email:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Birth certificates of your spouse/partner, your children (original copy);</li>`;
    html += `<li>Marriage in Canada: marriage certificate (original copy);</li>`;
    html += `<li>Marriage abroad: marriage certificate (original copy) - must be in French or English; if in another language, it must be accompanied by a certified translation;</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>3. Instructions regarding the following documents:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/330-61-Security%20Screening%20Application%20and%20Consent%20Form.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">330-61-EN SSACF</a> : you must complete this form and bring it to ${nomUnite}. The sections of the form you must complete are from B to K;</li>`;
    html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/instruction%20UF%20en.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Common-law_partership_procedure</a> : if your marital status is common-law, please review this document;</li>`;
    html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Exemples%20-%20Tenue%20de%20ville.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">Business casual examples</a>, dress code for the ceremony;</li>`;
    if (p.isUic3613) {
      html += `<li><a href="https://simontheriault8-cyber.github.io/Documents/Joining%20instructions-BMQ-EN.pdf" target="_blank" style="color: #2563eb; text-decoration: underline;">CFLRS_Joining_Instructions_EN</a> : joining instructions for the Canadian Forces Leadership and Recruit School.</li>`;
    }
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>4. On the day of your enrolment, ensure you have the following documents in hand:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Void cheque;</li>`;
    html += `<li>Valid photo identification;</li>`;
    html += `<li>Original birth certificate or citizenship certificate for yourself and your dependants if applicable;</li>`;
    html += `<li>Common-law partner: proof of address as specified in the attached Word document;</li>`;
    html += `<li>Provincial health insurance card of your spouse/partner, your children (original copy) if residing with you;</li>`;
    html += `<li>Official court document if your marital status is divorced.</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>5. Photos on the day of enrolment:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>Bring your camera or mobile phone if you wish to take photos of the ceremony.</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>6. Information to report if specific events occur before your enrolment day:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li>If you receive a ticket/fine before your enrolment, you must pay it and bring proof of payment. If you are unable to pay it, please contact us before your enrolment;</li>`;
    html += `<li>If you have any legal obligations that were not declared during your interview with the military career counsellor;</li>`;
    html += `<li>If you change your address or marital status, you must notify us immediately so that the correct information appears on your enrolment documents;</li>`;
    html += `<li>If you experience any medical change, please notify the medical section at extension 4909 as soon as possible before your enrolment.</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 6px;"><strong>7. Learn about the Canadian Armed Forces ethos by clicking on the following link:</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 16px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><a href="https://www.canada.ca/en/department-national-defence/services/benefits-military/defence-ethics/policies-publications/statement.html" target="_blank" style="color: #2563eb; text-decoration: underline;">Statement of Defence Ethics - Canada.ca</a></li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 14px;"><u><strong>Administrative Enrolment and Swearing-in Ceremony:</strong></u><br>`;
    html += `<strong>Date:</strong> ${p.dateEnrolRaw || 'day / month / year'}<br>`;
    html += `<strong>Arrival time:</strong> ${p.heurePostulant || '07h30'}<br>`;
    html += `<strong>Teams presentation time for guests:</strong> ${p.heureInvites || '09h40'} via a link that will be sent on Monday of the week of your enrolment.<br>`;
    html += `<strong>Location:</strong> ${lieuEnrolHtml}<br>`;
    html += `<strong>Dress:</strong> Clean business casual</p>`;

    html += `<p style="margin-bottom: 6px;"><u><strong>Posting unit:</strong></u></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 14px; padding-left: 20px; list-style-type: disc;">`;
    html += `<li><strong>Arrival date:</strong> You must report to ${nomUnite} on <strong>${p.jourSemaineEn || 'day of the week'}: ${p.dateArriveeFormatted || 'day / month / year'}</strong> by 16:00 at the latest.</li>`;
    if (p.serieCours) {
      html += `<li><strong>Course number:</strong> ${p.serieCours}</li>`;
      html += `<li><strong>Course dates:</strong> ${p.datesCours}</li>`;
    }
    html += `</ul>`;

    html += `<p style="margin-bottom: 14px;"><span style="background-color: #ffff00;">Tardiness on the day of your enrolment is not acceptable.</span></p>`;
    html += `<p style="margin-bottom: 14px;">For any questions, please contact the following email address<br>`;
    html += `: <a href="mailto:appointments.montreal@forces.gc.ca" style="color: #2563eb; text-decoration: underline;">appointments.montreal@forces.gc.ca</a></p>`;
    html += `<p style="margin-bottom: 12px;">Thank you for your interest in the Canadian Armed Forces,</p>`;
    html += `<p style="color: #c00000; font-style: italic; font-size: 10pt; line-height: 1.4; margin-bottom: 16px;">«Please note that the information we collect is used solely for selection and employment purposes and may only be provided to other authorized employees of the Department of National Defence. In other words, we are prohibited from disclosing, without your consent, information concerning you to individuals such as members of your family, your spouse, your employer, or your teacher. If an unauthorized person were to contact us with questions about you, we would instruct them to contact you directly. Furthermore, if you wish to submit a request for access to personal information or a request for correction of information that is incorrect or unclear, you may do so in writing pursuant to the Privacy Act.»</p>`;
    html += `<p>${p.sigHtmlEn}</p>`;

    return html;
  }

  getOffreOtaEmailHtml(p: GdOfferEmailParams): string {
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000; line-height: 1.4;">`;
    html += `<p><strong>English message will follow.</strong></p>`;
    html += this.getOffreOtaSectionHtmlFr(p);
    html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;
    html += this.getOffreOtaSectionHtmlEn(p);
    html += `</div>`;
    return html;
  }

  getOffreNormaleEmailPlain(p: GdOfferEmailParams): string {
    if (p.evaluationMedicaleType === 'Dossier OTA') {
      return this.getOffreOtaEmailPlain(p);
    }
    const lieuEnrolFr = p.selectedCenter ? p.selectedCenter.fullFr : p.offreLieuEnrolement;
    const lieuEnrolEn = p.selectedCenter ? p.selectedCenter.fullEn : p.offreLieuEnrolement;

    let fr = "English message will follow.\n\n";
    fr += "Bonjour,\n\n";
    fr += "Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.\n\n";
    fr += "Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :\n\n";
    fr += `Métier :    ${p.offreMetier}\n`;
    fr += `Programme d’enrôlement :        ${p.offreProgrammeEnrolement}\n`;
    fr += `Élément :                             ${p.offreElement}\n\n`;
    fr += `Date d’enrôlement :   ${p.dateEnrolFr}\n`;
    fr += `Lieu de l’enrôlement : ${lieuEnrolFr}\n`;
    fr += "Stationnement : Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.   \n";
    fr += this.getTeamsLinkPlainFr(p.city);
    fr += `Unité d’affectation : ${p.uniteAffectationObj.nom}\n${p.uniteAffectationObj.adressePlain}\n\n`;
    fr += `Date d’arrivée à votre unité:  ${p.dateArrivee}\n`;
    if (p.hasCourseDates) {
      fr += `Vos dates de cours :      ${p.datesCours}\n`;
    }
    fr += `\n\n`;
    fr += `Veuillez me faire parvenir les éléments suivant au plus tard le${p.elementsManquantsBlocksFr.dateLimiteStr} :\n\n`;
    fr += p.elementsManquantsBlocksFr.elementsPlain;
    fr += p.formulairesSuppPlainFr;
    fr += this.getOffreLinksBlockPlain({ isConjoint: p.isConjointDeFait, uniteNom: p.uniteAffectationObj.nom, isUic3613: p.isUic3613 }, 'fr');
    fr += this.getOffreEvenementsParticuliersPlainFr();
    fr += "Pour toute autre question, n’hésitez pas à communiquer avec moi. \n\n\n";
    fr += "Merci, bonne journée\n\n";
    fr += p.sigFr;

    let en = "Hello,\n\n";
    en += "First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.\n\n";
    en += "Below you will find the details of the job offer discussed today:\n\n";
    en += `Occupation:    ${p.offreMetier}\n`;
    en += `Enrolment program:        ${p.offreProgrammeEnrolement}\n`;
    en += `Element:                             ${p.offreElement}\n\n`;
    en += `Enrolment date:   ${p.dateEnrolEn}\n`;
    en += `Enrolment location: ${lieuEnrolEn}\n`;
    en += "Parking: Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.   \n";
    en += this.getTeamsLinkPlainEn(p.city);
    en += `Posting unit: ${p.uniteAffectationObj.nom}\n${p.uniteAffectationObj.adressePlain}\n\n`;
    en += `Arrival date at your unit:  ${p.dateArrivee}\n`;
    if (p.hasCourseDates) {
      en += `Your course dates:      ${p.datesCours}\n`;
    }
    en += `\n\n`;
    en += `Please send me the following items no later than${p.elementsManquantsBlocksEn.dateLimiteStr}:\n\n`;
    en += p.elementsManquantsBlocksEn.elementsPlain;
    en += p.formulairesSuppPlainEn;
    en += this.getOffreLinksBlockPlain({ isConjoint: p.isConjointDeFait, uniteNom: p.uniteAffectationObj.nom, isUic3613: p.isUic3613 }, 'en');
    en += this.getOffreEvenementsParticuliersPlainEn();
    en += "If you have any further questions, please do not hesitate to contact me. \n\n\n";
    en += "Thank you, have a nice day\n\n";
    en += p.sigEn;

    return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

  getOffreNormaleEmailHtml(p: GdOfferEmailParams): string {
    if (p.evaluationMedicaleType === 'Dossier OTA') {
      return this.getOffreOtaEmailHtml(p);
    }
    const lieuEnrolFr = (p.selectedCenter ? p.selectedCenter.fullFr : p.offreLieuEnrolement).replace(/\n/g, '<br>');
    const lieuEnrolEn = (p.selectedCenter ? p.selectedCenter.fullEn : p.offreLieuEnrolement).replace(/\n/g, '<br>');

    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;

    // --- FRENCH BLOCK ---
    html += `<p><strong>English message will follow.</strong></p>`;
    html += `<p>Bonjour,</p>`;
    html += `<p>Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.</p>`;
    html += `<p>Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :</p>`;
    html += `<p><strong>Métier :</strong> ${p.offreMetier}<br><strong>Programme d’enrôlement :</strong> ${p.offreProgrammeEnrolement}<br><strong>Élément :</strong> ${p.offreElement}</p>`;
    html += `<p><strong>Date d’enrôlement :</strong> ${p.dateEnrolFr}<br>`;
    html += `<strong>Lieu de l’enrôlement :</strong> ${lieuEnrolFr}<br>`;
    html += `<strong>Stationnement :</strong> Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.<br>`;
    html += this.getTeamsLinkHtmlFr(p.city);
    html += `<p><strong>Unité d’affectation :</strong> ${p.uniteAffectationObj.nom}<br>${p.uniteAffectationObj.adresseHtml}<br>`;
    html += `<strong>Date d’arrivée à votre unité :</strong> ${p.dateArrivee}`;
    if (p.hasCourseDates) {
      html += `<br><strong>Vos dates de cours :</strong> ${p.datesCours}`;
    }
    html += `</p>`;
    html += `<p>Veuillez me faire parvenir les éléments suivant au plus tard le${p.elementsManquantsBlocksFr.dateLimiteStr} :</p>`;
    html += p.elementsManquantsBlocksFr.elementsHtmlList;
    html += p.formulairesSuppHtmlFr;
    html += this.getOffreLinksBlockHtml({ isConjoint: p.isConjointDeFait, uniteNom: p.uniteAffectationObj.nom, isUic3613: p.isUic3613 }, 'fr');
    html += this.getOffreEvenementsParticuliersHtmlFr();
    html += `<p>Pour toute autre question, n’hésitez pas à communiquer avec moi.</p>`;
    html += `<p>Merci, bonne journée</p>`;
    html += `<p>${p.sigHtmlFr}</p>`;

    html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;

    // --- ENGLISH BLOCK ---
    html += `<p>Hello,</p>`;
    html += `<p>First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.</p>`;
    html += `<p>Below you will find the details of the job offer discussed today:</p>`;
    html += `<p><strong>Occupation:</strong> ${p.offreMetier}<br><strong>Enrolment program:</strong> ${p.offreProgrammeEnrolement}<br><strong>Element:</strong> ${p.offreElement}</p>`;
    html += `<p><strong>Enrolment date:</strong> ${p.dateEnrolEn}<br>`;
    html += `<strong>Enrolment location:</strong> ${lieuEnrolEn}<br>`;
    html += `<strong>Parking:</strong> Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.<br>`;
    html += this.getTeamsLinkHtmlEn(p.city);
    html += `<p><strong>Posting unit:</strong> ${p.uniteAffectationObj.nom}<br>${p.uniteAffectationObj.adresseHtml}<br>`;
    html += `<strong>Arrival date at your unit:</strong> ${p.dateArrivee}`;
    if (p.hasCourseDates) {
      html += `<br><strong>Your course dates:</strong> ${p.datesCours}`;
    }
    html += `</p>`;
    html += `<p>Please send me the following items no later than${p.elementsManquantsBlocksEn.dateLimiteStr}:</p>`;
    html += p.elementsManquantsBlocksEn.elementsHtmlList;
    html += p.formulairesSuppHtmlEn;
    html += this.getOffreLinksBlockHtml({ isConjoint: p.isConjointDeFait, uniteNom: p.uniteAffectationObj.nom, isUic3613: p.isUic3613 }, 'en');
    html += this.getOffreEvenementsParticuliersHtmlEn();
    html += `<p>If you have any further questions, please do not hesitate to contact me.</p>`;
    html += `<p>Thank you, have a nice day</p>`;
    html += `<p>${p.sigHtmlEn}</p>`;

    html += `</div>`;
    return html;
  }

  getOffreEtudesSubventionneesEmailPlain(p: GdOfferEmailParams): string {
    if (p.evaluationMedicaleType === 'Dossier OTA') {
      return this.getOffreOtaEmailPlain(p);
    }
    const lieuEnrolFr = p.selectedCenter ? p.selectedCenter.fullFr : p.offreLieuEnrolement;
    const lieuEnrolEn = p.selectedCenter ? p.selectedCenter.fullEn : p.offreLieuEnrolement;

    let fr = "English message will follow.\n\n";
    fr += "Bonjour,\n\n";
    fr += "Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.\n\n";
    fr += "Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :\n\n";
    fr += `Métier : ${p.offreMetier}\n`;
    fr += `Programme d’enrôlement :     ${p.offreProgrammeEnrolement}\n`;
    fr += `Élément :      ${p.offreElement}\n`;
    fr += `Durée du contrat :    ${p.offreDureeContrat}\n`;
    fr += `Études subventionnées :     ${p.offreEtudesSubventionnees}\n`;
    fr += `Durée des études subventionnées :     ${p.offreDureeEtudesSubventionnees}\n\n`;
    fr += `Date d’enrôlement :   ${p.dateEnrolFr}\n`;
    fr += `Lieu de l’enrôlement : ${lieuEnrolFr}\n`;
    fr += "Stationnement : Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.\n";
    fr += this.getTeamsLinkPlainFr(p.city);
    fr += `Unité d’affectation : ${p.uniteAffectationObj.nom}\n${p.uniteAffectationObj.adressePlain}\n\n`;
    fr += `Date d’arrivée à votre unité:  ${p.dateArrivee}\n`;
    if (p.hasCourseDates) {
      fr += `Vos dates de cours :    ${p.datesCours}\n`;
    }
    fr += `\n\n`;
    fr += `Veuillez prendre connaissance des documents joints au courriel et me retourner les documents suivants au plus tard le${p.elementsManquantsBlocksFr.dateLimiteStr} :\n\n`;
    fr += p.elementsManquantsBlocksFr.elementsPlain;
    fr += p.formulairesSuppPlainFr;
    fr += this.getOffreLinksBlockPlain({ isConjoint: p.isConjointDeFait, uniteNom: p.uniteAffectationObj.nom, isUic3613: p.isUic3613 }, 'fr');
    fr += this.getOffreEvenementsParticuliersPlainFr();
    fr += "Pour toute autre question, n’hésitez pas à communiquer avec moi. \n\n\n";
    fr += p.sigFr;

    let en = "Hello,\n\n";
    en += "First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.\n\n";
    en += "Below you will find the details of the job offer discussed today:\n\n";
    en += `Occupation: ${p.offreMetier}\n`;
    en += `Enrolment program:     ${p.offreProgrammeEnrolement}\n`;
    en += `Element:      ${p.offreElement}\n`;
    en += `Contract duration:    ${p.offreDureeContrat}\n`;
    en += `Subsidized education:     ${p.offreEtudesSubventionnees}\n`;
    en += `Subsidized education duration:     ${p.offreDureeEtudesSubventionnees}\n\n`;
    en += `Enrolment date:   ${p.dateEnrolEn}\n`;
    en += `Enrolment location: ${lieuEnrolEn}\n`;
    en += "Parking: Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.\n";
    en += this.getTeamsLinkPlainEn(p.city);
    en += `Posting unit: ${p.uniteAffectationObj.nom}\n${p.uniteAffectationObj.adressePlain}\n\n`;
    en += `Arrival date at your unit:  ${p.dateArrivee}\n`;
    if (p.hasCourseDates) {
      en += `Your course dates:    ${p.datesCours}\n`;
    }
    en += `\n\n`;
    en += `Please review the documents attached to this email and return the following documents to me no later than${p.elementsManquantsBlocksEn.dateLimiteStr}:\n\n`;
    en += p.elementsManquantsBlocksEn.elementsPlain;
    en += p.formulairesSuppPlainEn;
    en += this.getOffreLinksBlockPlain({ isConjoint: p.isConjointDeFait, uniteNom: p.uniteAffectationObj.nom, isUic3613: p.isUic3613 }, 'en');
    en += this.getOffreEvenementsParticuliersPlainEn();
    en += "If you have any further questions, please do not hesitate to contact me. \n\n\n";
    en += p.sigEn;

    return `${fr}\n\n______________________________________________________________________________\n\n${en}`;
  }

  getOffreEtudesSubventionneesEmailHtml(p: GdOfferEmailParams): string {
    if (p.evaluationMedicaleType === 'Dossier OTA') {
      return this.getOffreOtaEmailHtml(p);
    }
    const lieuEnrolFr = (p.selectedCenter ? p.selectedCenter.fullFr : p.offreLieuEnrolement).replace(/\n/g, '<br>');
    const lieuEnrolEn = (p.selectedCenter ? p.selectedCenter.fullEn : p.offreLieuEnrolement).replace(/\n/g, '<br>');

    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;

    // --- FRENCH BLOCK ---
    html += `<p><strong>English message will follow.</strong></p>`;
    html += `<p>Bonjour,</p>`;
    html += `<p>Tout d’abord, je tiens à vous féliciter d’avoir complété le processus de sélection des Forces armées Canadiennes.</p>`;
    html += `<p>Vous trouverez, plus bas, les détails de l’offre d’emploi discutée aujourd’hui :</p>`;
    html += `<p><strong>Métier :</strong> ${p.offreMetier}<br><strong>Programme d’enrôlement :</strong> ${p.offreProgrammeEnrolement}<br><strong>Élément :</strong> ${p.offreElement}<br><strong>Durée du contrat :</strong> ${p.offreDureeContrat}<br><strong>Études subventionnées :</strong> ${p.offreEtudesSubventionnees}<br><strong>Durée des études subventionnées :</strong> ${p.offreDureeEtudesSubventionnees}</p>`;
    html += `<p><strong>Date d’enrôlement :</strong> ${p.dateEnrolFr}<br>`;
    html += `<strong>Lieu de l’enrôlement :</strong> ${lieuEnrolFr}<br>`;
    html += `<strong>Stationnement :</strong> Veuillez prévoir du temps supplémentaire pour trouver une place de stationnement, car les espaces disponibles autour du bâtiment sont limités. Faites attention où vous stationnerez afin d’éviter de faire remorquer votre véhicule ou d’avoir une contravention.<br>`;
    html += this.getTeamsLinkHtmlFr(p.city);
    html += `<p><strong>Unité d’affectation :</strong> ${p.uniteAffectationObj.nom}<br>${p.uniteAffectationObj.adresseHtml}<br>`;
    html += `<strong>Date d’arrivée à votre unité :</strong> ${p.dateArrivee}`;
    if (p.hasCourseDates) {
      html += `<br><strong>Vos dates de cours :</strong> ${p.datesCours}`;
    }
    html += `</p>`;
    html += `<p>Veuillez prendre connaissance des documents joints au courriel et me retourner les documents suivants au plus tard le${p.elementsManquantsBlocksFr.dateLimiteStr} :</p>`;
    html += p.elementsManquantsBlocksFr.elementsHtmlList;
    html += p.formulairesSuppHtmlFr;
    html += this.getOffreLinksBlockHtml({ isConjoint: p.isConjointDeFait, uniteNom: p.uniteAffectationObj.nom, isUic3613: p.isUic3613 }, 'fr');
    html += this.getOffreEvenementsParticuliersHtmlFr();
    html += `<p>Pour toute autre question, n’hésitez pas à communiquer avec moi.</p>`;
    html += `<p>${p.sigHtmlFr}</p>`;

    html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;

    // --- ENGLISH BLOCK ---
    html += `<p>Hello,</p>`;
    html += `<p>First of all, I would like to congratulate you on completing the selection process for the Canadian Armed Forces.</p>`;
    html += `<p>Below you will find the details of the job offer discussed today:</p>`;
    html += `<p><strong>Occupation:</strong> ${p.offreMetier}<br><strong>Enrolment program:</strong> ${p.offreProgrammeEnrolement}<br><strong>Element:</strong> ${p.offreElement}<br><strong>Contract duration:</strong> ${p.offreDureeContrat}<br><strong>Subsidized education:</strong> ${p.offreEtudesSubventionnees}<br><strong>Subsidized education duration:</strong> ${p.offreDureeEtudesSubventionnees}</p>`;
    html += `<p><strong>Enrolment date:</strong> ${p.dateEnrolEn}<br>`;
    html += `<strong>Enrolment location:</strong> ${lieuEnrolEn}<br>`;
    html += `<strong>Parking:</strong> Please allow extra time to find a parking space, as available spaces around the building are limited. Please be careful where you park to avoid having your vehicle towed or receiving a parking ticket.<br>`;
    html += this.getTeamsLinkHtmlEn(p.city);
    html += `<p><strong>Posting unit:</strong> ${p.uniteAffectationObj.nom}<br>${p.uniteAffectationObj.adresseHtml}<br>`;
    html += `<strong>Arrival date at your unit:</strong> ${p.dateArrivee}`;
    if (p.hasCourseDates) {
      html += `<br><strong>Your course dates:</strong> ${p.datesCours}`;
    }
    html += `</p>`;
    html += `<p>Please review the documents attached to this email and return the following documents to me no later than${p.elementsManquantsBlocksEn.dateLimiteStr}:</p>`;
    html += p.elementsManquantsBlocksEn.elementsHtmlList;
    html += p.formulairesSuppHtmlEn;
    html += this.getOffreLinksBlockHtml({ isConjoint: p.isConjointDeFait, uniteNom: p.uniteAffectationObj.nom, isUic3613: p.isUic3613 }, 'en');
    html += this.getOffreEvenementsParticuliersHtmlEn();
    html += `<p>If you have any further questions, please do not hesitate to contact me.</p>`;
    html += `<p>${p.sigHtmlEn}</p>`;

    html += `</div>`;
    return html;
  }

  getOfferFormattedNote(p: GdOfferNoteParams): string {
    const metier = p.offreMetier || '189 génie de construction';
    const statut = p.noteStatutCivil || 'célibataire';
    
    const conjointOpt = p.noteConjoint || 'N/A';
    const conjoint = conjointOpt === 'oui' ? (p.noteConjointTexte || 'À CONFIRMER') : conjointOpt;
    
    const count = parseInt(p.noteEnfantCount || '0', 10);
    let enfant = 'N/A';
    if (!isNaN(count) && count > 0) {
      enfant = p.noteEnfantDetails
        .map(c => `${c.sex} ${c.year}`)
        .join(', ');
    }

    const plaque = p.notePlaqueImm.trim() || 'À confirmer';
    const brisBail = p.noteBrisBail || 'N/A';
    const entreposage = p.noteEntreposage || 'N/A';
    const serment = p.noteSermentDeclaration || 'Serment';
    const inviteMilOpt = p.noteInviteMil || 'N/A';
    const inviteMil = inviteMilOpt === 'oui' ? (p.noteInviteMilTexte || 'À CONFIRMER') : inviteMilOpt;
    const svcMilAnt = p.noteSvcMilAnt || 'N/A';
    const beneficiaire = p.noteBeneficiaire;
    const dateCourriel = p.dateCourrielConfirmation;

    let note = `Postulant accepte l’offre – ${metier}\n`;
    note += `Statut : ${statut}\n`;
    note += `Conjoint : ${conjoint}\n`;
    note += `Enfant : ${enfant}\n`;
    note += `Plaque IMM : ${plaque}\n`;
    note += `Bris de bail : ${brisBail}\n`;
    note += `Entreposage : ${entreposage}\n`;
    note += `${serment}\n`;
    note += `Invité mil : ${inviteMil}\n`;
    note += `Svc Mil ant : ${svcMilAnt}\n`;
    note += `Bénéficiaire : ${beneficiaire}`;
    if (dateCourriel) {
      note += `\nCourriel de confirmation envoyé au postulant le : ${dateCourriel}`;
    }

    return note;
  }
}
