import { ManualCriterion, MANUAL_CRITERIA } from "../../app/data/reorientation-criteria.data";
import REGLES_DATA from "../../../regles-reorientation.json";

export function evaluateDynamicExperienceCriteria(
  arg1?: Iterable<string> | Set<string> | string[] | ((jobId: string) => boolean) | null,
  arg2?: Set<string> | Iterable<string> | string[] | any,
  dossierJobIds?: Set<string> | string[] | any
): ManualCriterion[] {
  const criteriaMap = new Map<string, ManualCriterion>();
  const tradeRules = (REGLES_DATA as any)?.reglesMetiers || [];

  // Sub-criteria mapping for composite document requirement IDs
  const subCriteriaMap: Record<string, string[]> = {
    exp_scslm_acorplm: ["exp_scslm", "exp_acorplm"],
    exp_permis_rad_actrm: ["exp_permis_rad", "exp_association_actrm"],
    exp_musique: ["exp_mus_pro", "exp_mus_ensembles", "exp_mus_etudiant"]
  };

  const jobIdsSet = new Set<string>();

  if (typeof arg1 === "function") {
    // If a function was passed, check arg2 for eligible job IDs
    if (arg2 && typeof (arg2 as any).has === "function") {
      for (const id of arg2 as Set<string>) jobIdsSet.add(id);
    } else if (Array.isArray(arg2)) {
      for (const id of arg2) jobIdsSet.add(id);
    }
  } else if (arg1) {
    if (typeof (arg1 as any).has === "function") {
      for (const id of arg1 as Set<string>) jobIdsSet.add(id);
    } else if (Array.isArray(arg1)) {
      for (const id of arg1) jobIdsSet.add(id);
    } else {
      for (const id of Array.from(arg1 as any)) jobIdsSet.add(id as string);
    }
  }

  // Include dossier job IDs if passed
  const dossier = dossierJobIds || (typeof arg2 !== "function" ? arg2 : undefined);
  if (dossier) {
    if (typeof dossier.has === "function") {
      for (const id of dossier as Set<string>) if (id && id !== "00003") jobIdsSet.add(id);
    } else if (Array.isArray(dossier)) {
      for (const id of dossier) if (id && id !== "00003") jobIdsSet.add(id);
    }
  }

  if (jobIdsSet.size === 0) {
    return [];
  }

  for (const trade of tradeRules) {
    const code = trade.code;
    if (jobIdsSet.has(code)) {
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

