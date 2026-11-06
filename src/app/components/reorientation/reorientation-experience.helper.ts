import { ManualCriterion } from "../../data/reorientation-criteria.data";
import { evaluateDynamicExperienceCriteria } from "../../../services/reorientation/experience-criteria-evaluator";

export function computeReoExperienceCriteria(this: any): ManualCriterion[] {
  const selected = this.selectedCriteriaIds();
  const isAdmissible = (jobId: string) => {
    if (typeof this.isAdmissibleOtherThanEducation === "function") {
      return this.isAdmissibleOtherThanEducation(jobId);
    }
    return true;
  };

  let dossierSet: Set<string> | undefined = undefined;
  if (this.dossierJobIds) {
    dossierSet = typeof this.dossierJobIds === "function" ? this.dossierJobIds() : this.dossierJobIds;
  }

  // Dynamically evaluate all experience/document criteria from regles-reorientation.json
  const criteria = evaluateDynamicExperienceCriteria(selected, isAdmissible, dossierSet);

  return criteria;
}

export function toggleReoManualCriterion(this: any, id: string): void {
  const current = new Set(this.selectedCriteriaIds());
  if (current.has(id)) {
    current.delete(id);
  } else {
    current.add(id);

    // Auto-checking logic for educational prerequisites
    if (id === "cs_autre_dep") {
      current.add("sec4_24_credits");
    }

    if (id === "chimie_sec5_11e" || id === "physique_sec5_11e") {
      current.add("sci_tech4_sci10");
    }

    if (id.startsWith("cs_")) {
      const crit = this.manualCriteria.find((c: any) => c.id === id);
      if (
        crit &&
        (crit.label.includes("DEP") ||
          crit.label.includes("DEC") ||
          crit.label.includes("diplôme") ||
          crit.label.includes("Diplôme"))
      ) {
        current.add("sec4_24_credits");
      }
    }

    if (
      id.startsWith("bacc_") ||
      id.startsWith("maitrise_") ||
      id.startsWith("doctorat_") ||
      id.startsWith("univ_")
    ) {
      current.add("sec4_24_credits");
    }

    if (id === "des_12e_annee") {
      current.add("sec4_24_credits");
      current.add("francais_sec4_10e");
      current.add("francais_sec5_11e");
      current.add("qc_10_gen"); // Math CST IV
      current.add("sci_tech4_sci10");
    }

    if (id === "qc_10_app") {
      current.add("qc_10_gen");
    }

    if (id === "qc_10_adv") {
      current.add("qc_10_app");
      current.add("qc_10_gen");
    }

    if (id === "qc_11_gen") {
      current.add("qc_10_gen");
    }

    if (id === "qc_11_app" || id === "qc_11_adv" || id === "qc_12_cegep201") {
      current.add("qc_10_gen");
      current.add("qc_10_app");
      current.add("qc_10_adv");
      current.add("qc_11_gen");
      current.add("qc_11_app");
      current.add("qc_11_adv");
    }

    if (id === "anglais_sec5_12e") {
      current.add("francais_sec5_11e");
      current.add("francais_sec4_10e");
    }

    if (id === "francais_sec5_11e") {
      current.add("francais_sec4_10e");
    }

    // Mutual exclusions for job 00152
    if (id === "exp_scslm") {
      current.delete("exp_acorplm");
    } else if (id === "exp_acorplm") {
      current.delete("exp_scslm");
    } else if (id === "exp_permis_reglementation") {
      current.delete("exp_lettre_conformite");
    } else if (id === "exp_lettre_conformite") {
      current.delete("exp_permis_reglementation");
    }

    // Mutual exclusions for job 00153
    if (id === "exp_permis_rad") {
      current.delete("exp_association_actrm");
    } else if (id === "exp_association_actrm") {
      current.delete("exp_permis_rad");
    }

    // Mutual exclusions for job 00166
    if (id === "exp_mus_ensembles") {
      current.delete("exp_mus_etudiant");
    } else if (id === "exp_mus_etudiant") {
      current.delete("exp_mus_ensembles");
    }

    // Auto-check logic for university cycles
    if (id.startsWith("bacc_")) {
      current.add("univ_1er_cycle_global");
      const crit = this.manualCriteria.find((c: any) => c.id === id);
      if (crit && crit.subCategory) {
        if (crit.subCategory === "Génie") current.add("univ_1er_cycle_genie");
        if (crit.subCategory === "Arts") current.add("univ_1er_cycle_arts");
        if (crit.subCategory === "Sciences") current.add("univ_1er_cycle_sciences");
        if (crit.subCategory === "Santé") current.add("univ_1er_cycle_sante");
      }
    }

    if (id.startsWith("maitrise_") || id.startsWith("doctorat_")) {
      current.add("univ_cycle_sup_global");
      const crit = this.manualCriteria.find((c: any) => c.id === id);
      if (crit && crit.subCategory) {
        if (crit.subCategory === "Maîtrise") current.add("univ_cycle_sup_maitrise");
        if (crit.subCategory === "Doctorat") current.add("univ_cycle_sup_doctorat");
      }
    }

    if (
      id === "univ_1er_cycle_genie" ||
      id === "univ_1er_cycle_arts" ||
      id === "univ_1er_cycle_sciences" ||
      id === "univ_1er_cycle_sante"
    ) {
      current.add("univ_1er_cycle_global");
    }

    if (
      id === "univ_cycle_sup_maitrise" ||
      id === "univ_cycle_sup_doctorat"
    ) {
      current.add("univ_cycle_sup_global");
    }
  }

  this.selectedCriteriaIds.set(current);
}
