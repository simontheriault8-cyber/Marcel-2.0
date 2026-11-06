import { ManualCriterion, MANUAL_CRITERIA } from "../../app/data/reorientation-criteria.data";
import REGLES_DATA from "../../../regles-reorientation.json";

export function evaluateDynamicExperienceCriteria(
  selected: Set<string>,
  isAdmissibleOtherThanEducation: (jobId: string) => boolean,
  dossierJobIds?: Set<string>
): ManualCriterion[] {
  const criteriaMap = new Map<string, ManualCriterion>();
  const tradeRules = (REGLES_DATA as any)?.reglesMetiers || [];

  // Sub-criteria mapping for composite document requirement IDs
  const subCriteriaMap: Record<string, string[]> = {
    exp_scslm_acorplm: ["exp_scslm", "exp_acorplm"],
    exp_permis_rad_actrm: ["exp_permis_rad", "exp_association_actrm"],
    exp_musique: ["exp_mus_pro", "exp_mus_ensembles", "exp_mus_etudiant"]
  };

  for (const trade of tradeRules) {
    const code = trade.code;
    const isDossier = dossierJobIds ? dossierJobIds.has(code) : false;
    const isStatutAdmissible = isAdmissibleOtherThanEducation(code);

    if (isDossier || isStatutAdmissible) {
      const docProofs = trade.preuvesDocumentsRequisDansCourriel || [];
      for (const doc of docProofs) {
        const docId = typeof doc === "string" ? doc : doc.critereId;
        if (!docId) continue;

        // Expand composite IDs if applicable
        const idsToAdd = subCriteriaMap[docId] || [docId];

        for (const targetId of idsToAdd) {
          if (!criteriaMap.has(targetId)) {
            const existing = MANUAL_CRITERIA.find((c) => c.id === targetId);
            if (existing) {
              criteriaMap.set(targetId, existing);
            } else {
              const labelFr = typeof doc === "object" ? doc.texteFr : doc;
              const labelEn = typeof doc === "object" ? (doc.texteEn || doc.texteFr) : doc;
              criteriaMap.set(targetId, {
                id: targetId,
                label: labelFr,
                labelEn: labelEn,
                category: "Expérience"
              });
            }
          }
        }
      }
    }
  }

  return Array.from(criteriaMap.values());
}
