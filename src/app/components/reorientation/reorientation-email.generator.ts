import {
  buildAge57IneligibleEmail,
  buildPrUnder3YearsEmail,
  wrapBilingualEmail,
} from "../shared/email-blocks.helper";
import {
  buildReoEmailSection,
  ReoEmailSectionContext,
} from "./reorientation-email-sections.helper";

export function buildReoBilingualEmail(this: any, isHtml: boolean): string {
  const jobIds: string[] = this.eligibleJobs();
  if (!this.showResultsPanel() && jobIds.length === 0) {
    if (isHtml) {
      return '<p class="text-slate-500 italic text-center mt-10">Sélectionnez au moins un critère de scolarité ou d\'expérience pour évaluer les métiers admissibles et générer le courriel de réorientation.</p>';
    }
    return "Sélectionnez au moins un critère de scolarité ou d'expérience pour générer le courriel.";
  }

  const isEn = this.i18n?.isEn
    ? this.i18n.isEn()
    : this.i18n?.lang?.() === "en";

  if (this.age() !== null && this.age()! >= 57) {
    return buildAge57IneligibleEmail(this, isHtml, isEn);
  }

  if (this.citizenship() === "PR < 3 years") {
    return buildPrUnder3YearsEmail(this, isHtml, isEn);
  }

  const dossierIds = [
    this.selectedDossierJobId1(),
    this.selectedDossierJobId2(),
    this.selectedDossierJobId3(),
  ].filter((id) => !!id);

  const hasNoJobCode = dossierIds.includes("00003");
  const realDossierIds = dossierIds.filter((id) => id !== "00003");

  const closedTraitementJobs: string[] = [];
  const closedAdmissionOnlyJobs: string[] = [];
  for (const id of realDossierIds) {
    const s = this.evaluateJobAdmissibility(id);
    if (
      s &&
      s.isJobClosed &&
      s.isAgeAdmissible &&
      s.isCitizenshipAdmissible &&
      s.isEducationAdmissible &&
      s.isMedicalAdmissible &&
      s.isExtraTestAdmissible
    ) {
      if (s.isClosedAdmissionOnly) {
        closedAdmissionOnlyJobs.push(id);
      } else {
        closedTraitementJobs.push(id);
      }
    }
  }

  const listNCM: string[] = [];
  const listOFF: string[] = [];
  for (const jId of jobIds) {
    if (this.isOfficerJob(jId)) {
      listOFF.push(jId);
    } else {
      listNCM.push(jId);
    }
  }

  const rawHtml = this.sharedState.taskEmailHtmlFr();
  const hasTasks =
    !!rawHtml &&
    this.sharedState.hasReassignedTasks() &&
    rawHtml.includes("Bonjour,");
  const mergeTasks =
    (this.sharedState.includeLinkedEmail() ||
      (this.sharedState.hasReassignedTasks() && this.showResultsPanel())) &&
    hasTasks;

  const isPforApplicant = this.isPforApplicant();
  const sectionCtx: ReoEmailSectionContext = {
    jobIds,
    listNCM,
    listOFF,
    hasNoJobCode,
    realDossierIds,
    closedTraitementJobs,
    closedAdmissionOnlyJobs,
    hasTraitementClosed: closedTraitementJobs.length > 0,
    hasAdmissionClosed: closedAdmissionOnlyJobs.length > 0,
    mergeTasks,
    isPforApplicant,
    isPforCmr: isPforApplicant && this.pforType() === "cmr",
    isPforCivil: isPforApplicant && this.pforType() === "civil",
    isPforToEdo: this.isPforToEdo(),
    isPforToEdoProgramChangeOnly: this.isPforToEdoProgramChangeOnly(),
    isPilotEligible: jobIds.includes("00183"),
    isPRAdmissible: this.citizenship() === "PR > 3 years",
    isCandidateTooOld: this.isCandidateTooOld(),
    cmrAdmittedFr: this.getCmrAdmittedDomainsFr(),
    cmrAdmittedEn: this.getCmrAdmittedDomainsEn(),
  };

  const frBlock = buildReoEmailSection(this, sectionCtx, "fr", isHtml);
  const enBlock = buildReoEmailSection(this, sectionCtx, "en", isHtml);

  return wrapBilingualEmail(frBlock, enBlock, isEn, isHtml, this.i18n);
}
