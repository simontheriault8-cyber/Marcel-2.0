import LINKS_DATA from "../../../LINKS.json";

export interface AppLinksStructure {
  _description?: string;
  portails: {
    portailCandidat: { titreFr: string; titreEn: string; url: string };
    portailAdmissionCmc: { titreFr: string; titreEn: string; url: string };
    demandeRelevesDiplomesSecQuebec: { titreFr: string; titreEn: string; fr: string; en: string };
    challengeU: { titreFr: string; titreEn: string; url: string };
  };
  forcesArmeesEtCmrsj: {
    carrieres: { titreFr: string; titreEn: string; fr: string; en: string };
    centreAssistance: { titreFr: string; titreEn: string; fr: string; en: string };
    videoForces101: { titreFr: string; titreEn: string; fr: string; en: string };
    programmesAdmissiblesCmr: { titreFr: string; titreEn: string; fr: string; en: string };
    programmesAdmissiblesForces: { titreFr: string; titreEn: string; fr: string; en: string };
    programmesEtudesSubventionneesPmr: { titreFr: string; titreEn: string; fr: string; en: string };
    cmrsjFaq: { titreFr: string; titreEn: string; fr: string; en: string };
    cmrsjYoutube: { titreFr: string; titreEn: string; url: string };
    sportsCmrsjRemparts: { titreFr: string; titreEn: string; url: string };
    sportsCmrPaladins: { titreFr: string; titreEn: string; url: string };
    ethiqueDefense: { titreFr: string; titreEn: string; fr: string; en: string };
    instructionDeBase: { titreFr: string; titreEn: string; fr: string; en: string };
    programmeExperienceMarine: { titreFr: string; titreEn: string; fr: string; en: string };
  };
  documentsEtFormulaires: {
    instructionsRalliementQmb: { titreFr: string; titreEn: string; fr: string; en: string };
    instructionUnionDeFait: { titreFr: string; titreEn: string; fr: string; en: string };
    formulaireSecuriteTbs330_61: { titreFr: string; titreEn: string; fr: string; en: string };
    exempleTenueDeVille: { titreFr: string; titreEn: string; url: string };
    exempleEgoportrait: { titreFr: string; titreEn: string; url: string };
    exempleCertificatCitoyennetePage1: { titreFr: string; titreEn: string; url: string };
    exempleCertificatCitoyennetePage2: { titreFr: string; titreEn: string; url: string };
    exempleFormulaireDnd2170: { titreFr: string; titreEn: string; url: string };
    exempleConfirmationDepotCmc: { titreFr: string; titreEn: string; url: string };
    exempleReleveNotesAensEcole: { titreFr: string; titreEn: string; url: string };
    designationCroixDuSouvenir: { titreFr: string; titreEn: string; url: string };
    designationBeneficiaire: { titreFr: string; titreEn: string; fr: string; en: string };
    identificationPlusProchesParents: { titreFr: string; titreEn: string; url: string };
    personneAContacterUrgence: { titreFr: string; titreEn: string; url: string };
  };
  reunionsTeams: {
    ceremonieAssermentationTeams1: { titreFr: string; titreEn: string; url: string };
    ceremonieAssermentationTeams2: { titreFr: string; titreEn: string; url: string };
  };
  ordresEtEquivalences: {
    cicdi: { titreFr: string; titreEn: string; url: string };
    allianceServicesEvaluation: { titreFr: string; titreEn: string; url: string };
    wes: { titreFr: string; titreEn: string; url: string };
    nnas: { titreFr: string; titreEn: string; url: string };
    alliancePhysiotherapie: { titreFr: string; titreEn: string; url: string };
    camrtRadiologie: { titreFr: string; titreEn: string; url: string };
    napraPharmacie: { titreFr: string; titreEn: string; url: string };
    ndaebDentaire: { titreFr: string; titreEn: string; url: string };
    cdaaAssistanceDentaire: { titreFr: string; titreEn: string; url: string };
    cdacAgrementDentaire: { titreFr: string; titreEn: string; url: string };
    cdaDentistesAutorites: { titreFr: string; titreEn: string; url: string };
    sceauRougeCuisinier: { titreFr: string; titreEn: string; url: string };
    musiqueAuditionReg: { titreFr: string; titreEn: string; url: string };
    musiqueAuditionRes: { titreFr: string; titreEn: string; url: string };
  };
  metiers: { [occupationCode: string]: { fr: string; en: string } };
}

export const APP_LINKS: AppLinksStructure = LINKS_DATA as unknown as AppLinksStructure;

// Quick accessors
export const PORTAL_CANDIDATE_URL = APP_LINKS.portails.portailCandidat.url;
export const PORTAL_CMC_ADMISSIONS_URL = APP_LINKS.portails.portailAdmissionCmc.url;
export const CHALLENGE_U_URL = APP_LINKS.portails.challengeU.url;

export const TEAMS_CEREMONY_URL_MS = APP_LINKS.reunionsTeams.ceremonieAssermentationTeams1.url;
export const TEAMS_CEREMONY_URL_LIVE = APP_LINKS.reunionsTeams.ceremonieAssermentationTeams2.url;

export const CICDI_URL = APP_LINKS.ordresEtEquivalences.cicdi.url;
export const CAN_ALLIANCE_URL = APP_LINKS.ordresEtEquivalences.allianceServicesEvaluation.url;
export const WES_URL = APP_LINKS.ordresEtEquivalences.wes.url;
export const NNAS_URL = APP_LINKS.ordresEtEquivalences.nnas.url;

export const CMRSJ_FAQ_URL_FR = APP_LINKS.forcesArmeesEtCmrsj.cmrsjFaq.fr;
export const CMRSJ_FAQ_URL_EN = APP_LINKS.forcesArmeesEtCmrsj.cmrsjFaq.en;
export const CMRSJ_YOUTUBE_URL = APP_LINKS.forcesArmeesEtCmrsj.cmrsjYoutube.url;
export const SPORTS_REMPARTS_URL = APP_LINKS.forcesArmeesEtCmrsj.sportsCmrsjRemparts.url;
export const SPORTS_PALADINS_URL = APP_LINKS.forcesArmeesEtCmrsj.sportsCmrPaladins.url;

export const DRESS_CODE_EXAMPLE_URL = APP_LINKS.documentsEtFormulaires.exempleTenueDeVille.url;
export const SELFIE_EXAMPLE_URL = APP_LINKS.documentsEtFormulaires.exempleEgoportrait.url;
export const CITIZENSHIP_PAGE1_EXAMPLE_URL = APP_LINKS.documentsEtFormulaires.exempleCertificatCitoyennetePage1.url;
export const CITIZENSHIP_PAGE2_EXAMPLE_URL = APP_LINKS.documentsEtFormulaires.exempleCertificatCitoyennetePage2.url;
export const DND_2170_EXAMPLE_URL = APP_LINKS.documentsEtFormulaires.exempleFormulaireDnd2170.url;
export const CMC_DEPOSIT_CONFIRMATION_URL = APP_LINKS.documentsEtFormulaires.exempleConfirmationDepotCmc.url;
export const AENS_TRANSCRIPT_EXAMPLE_URL = APP_LINKS.documentsEtFormulaires.exempleReleveNotesAensEcole.url;
export const NEXT_OF_KIN_FORM_URL = APP_LINKS.documentsEtFormulaires.identificationPlusProchesParents.url;
export const EMERGENCY_CONTACT_FORM_URL = APP_LINKS.documentsEtFormulaires.personneAContacterUrgence.url;
export const MEMORIAL_CROSS_FORM_URL = APP_LINKS.documentsEtFormulaires.designationCroixDuSouvenir.url;

export function getQuebecTranscriptsUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.portails.demandeRelevesDiplomesSecQuebec.en
    : APP_LINKS.portails.demandeRelevesDiplomesSecQuebec.fr;
}

export function getForcesCareersUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.forcesArmeesEtCmrsj.carrieres.en
    : APP_LINKS.forcesArmeesEtCmrsj.carrieres.fr;
}

export function getForcesHelpCentreUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.forcesArmeesEtCmrsj.centreAssistance.en
    : APP_LINKS.forcesArmeesEtCmrsj.centreAssistance.fr;
}

export function getForces101VideoUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.forcesArmeesEtCmrsj.videoForces101.en
    : APP_LINKS.forcesArmeesEtCmrsj.videoForces101.fr;
}

export function getEligibleProgramsCmrUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.forcesArmeesEtCmrsj.programmesAdmissiblesCmr.en
    : APP_LINKS.forcesArmeesEtCmrsj.programmesAdmissiblesCmr.fr;
}

export function getEligibleProgramsForcesUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.forcesArmeesEtCmrsj.programmesAdmissiblesForces.en
    : APP_LINKS.forcesArmeesEtCmrsj.programmesAdmissiblesForces.fr;
}

export function getPaidEducationProgramsUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.forcesArmeesEtCmrsj.programmesEtudesSubventionneesPmr.en
    : APP_LINKS.forcesArmeesEtCmrsj.programmesEtudesSubventionneesPmr.fr;
}

export function getCmrsjFaqUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.forcesArmeesEtCmrsj.cmrsjFaq.en
    : APP_LINKS.forcesArmeesEtCmrsj.cmrsjFaq.fr;
}

export function getBasicTrainingUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.forcesArmeesEtCmrsj.instructionDeBase.en
    : APP_LINKS.forcesArmeesEtCmrsj.instructionDeBase.fr;
}

export function getJoiningInstructionsQmbUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.documentsEtFormulaires.instructionsRalliementQmb.en
    : APP_LINKS.documentsEtFormulaires.instructionsRalliementQmb.fr;
}

export function getCommonLawInstructionUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.documentsEtFormulaires.instructionUnionDeFait.en
    : APP_LINKS.documentsEtFormulaires.instructionUnionDeFait.fr;
}

export function getSecurityScreeningFormUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.documentsEtFormulaires.formulaireSecuriteTbs330_61.en
    : APP_LINKS.documentsEtFormulaires.formulaireSecuriteTbs330_61.fr;
}

export function getBeneficiaryDesignationUrl(isEn = false): string {
  return isEn
    ? APP_LINKS.documentsEtFormulaires.designationBeneficiaire.en
    : APP_LINKS.documentsEtFormulaires.designationBeneficiaire.fr;
}

export function getTradeUrl(code: string, isEn = false): string | null {
  const trade = APP_LINKS.metiers[code];
  if (!trade) return null;
  return isEn ? trade.en : trade.fr;
}
