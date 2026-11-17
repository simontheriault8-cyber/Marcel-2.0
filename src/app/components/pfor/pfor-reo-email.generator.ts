import { buildPforNotYetEvaluatedEmail } from "./pfor-not-yet-evaluated.generator";
import {
  buildAge57IneligibleEmail,
  buildPrUnder3YearsEmail,
  wrapBilingualEmail,
} from "../shared/email-blocks.helper";
import { buildPforJobListsData } from "./pfor-reo-email-lists.helper";
import {
  buildPforEmailSection,
  PforEmailSectionContext,
} from "./pfor-reo-email-sections.helper";

export function buildPforBilingualEmail(this: any, isHtml: boolean): string {
  const isEn = this.i18n?.isEn
    ? this.i18n.isEn()
    : this.i18n?.lang?.() === "en";

  if (this.age() !== null && this.age()! >= 57) {
    return buildAge57IneligibleEmail(this, isHtml, isEn);
  }

  if (this.citizenship() === "PR < 3 years") {
    return buildPrUnder3YearsEmail(this, isHtml, isEn);
  }

  if (this.cmrNotYetEvaluated && this.cmrNotYetEvaluated()) {
    return buildPforNotYetEvaluatedEmail.call(this, isHtml);
  }

  if (this.isAttentesMode()) {
    return this.buildGestionDesAttentesEmail(isHtml);
  }

  if (
    this.pforType() === "cmr" &&
    (this.cmrRefused() || this.cmrMinCriteriaNotMet())
  ) {
    return this.buildCmrRefusalEmail(isHtml);
  }

  const jobIds: string[] = this.eligiblePforJobs().map((j: any) => j.id);
  if (!this.showResultsPanel() && jobIds.length === 0) {
    return isHtml
      ? '<p class="text-slate-500 italic">Veuillez renseigner les critères d\'admission du postulant PFOR pour générer le courriel de réorientation.</p>'
      : "Veuillez renseigner les critères d'admission du postulant PFOR pour générer le courriel de réorientation.";
  }

  const dossierIds = [
    this.selectedDossierJobId1(),
    this.selectedDossierJobId2(),
    this.selectedDossierJobId3(),
  ].filter(Boolean);

  const hasNoJobCode = dossierIds.includes("00003");
  const realDossierIds = dossierIds.filter((id) => id !== "00003");

  const closedTraitementJobs: string[] = [];
  for (const id of realDossierIds) {
    const s = this.evaluateJobAdmissibility(id);
    if (
      s &&
      s.isJobClosed &&
      s.isAgeAdmissible &&
      s.isCitizenshipAdmissible &&
      s.isEducationAdmissible &&
      s.isMedicalAdmissible
    ) {
      closedTraitementJobs.push(id);
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

  const sectionCtx: PforEmailSectionContext = {
    lists: buildPforJobListsData(this),
    hasNoJobCode,
    realDossierIds,
    closedButAdmissibleJobs: closedTraitementJobs,
    hasClosedButAdmissibleJobs: closedTraitementJobs.length > 0,
    mergeTasks,
    isPforCmr: this.pforType() === "cmr",
    isPilotEligible: jobIds.includes("00183"),
    isPRAdmissible: this.citizenship() === "PR > 3 years",
    isCandidateTooOld: this.isCandidateTooOld(),
    cmrAdmittedFr: this.getCmrAdmittedDomainsFr(),
    cmrAdmittedEn: this.getCmrAdmittedDomainsEn(),
  };

  const frBlock = buildPforEmailSection(this, sectionCtx, "fr", isHtml);
  const enBlock = buildPforEmailSection(this, sectionCtx, "en", isHtml);

  return wrapBilingualEmail(frBlock, enBlock, isEn, isHtml, this.i18n);
}
