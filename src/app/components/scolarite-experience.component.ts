import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReorientationCriteriaService } from "../../services/reorientation-criteria.service";
import { SharedStateService } from "../../services/shared-state.service";
import { TranslationService } from "../i18n";
import { ManualCriterion } from "../data/reorientation-criteria.data";
import { SCOLARITE_EXPERIENCE_TEMPLATE } from "./scolarite-experience.template";

@Component({
  selector: "app-scolarite-experience",
  imports: [CommonModule, FormsModule],
  template: SCOLARITE_EXPERIENCE_TEMPLATE,
})
export class ScolariteExperienceComponent {
  criteriaService = inject(ReorientationCriteriaService);
  sharedState = inject(SharedStateService);
  i18n = inject(TranslationService);

  selectedCriteriaIds = this.criteriaService.selectedCriteriaIds;
  activeScolariteTab = this.criteriaService.activeScolariteTab;
  selectedProvince = this.criteriaService.selectedProvince;
  PROVINCES = this.criteriaService.PROVINCES;

  mathCoursesForProvince = this.criteriaService.mathCoursesForProvince;
  criteriaAnneeScolaire = this.criteriaService.criteriaAnneeScolaire;
  criteriaHistoire = this.criteriaService.criteriaHistoire;
  criteriaLangue = this.criteriaService.criteriaLangue;
  criteriaScience = this.criteriaService.criteriaScience;
  criteriaInformatique = this.criteriaService.criteriaInformatique;
  criteriaCoursSpecialise = this.criteriaService.criteriaCoursSpecialise;
  criteriaUniversitaire1erCycleGenie = this.criteriaService.criteriaUniversitaire1erCycleGenie;
  criteriaUniversitaire1erCycleSciences = this.criteriaService.criteriaUniversitaire1erCycleSciences;
  criteriaUniversitaire1erCycleArts = this.criteriaService.criteriaUniversitaire1erCycleArts;
  criteriaUniversitaire1erCycleSante = this.criteriaService.criteriaUniversitaire1erCycleSante;
  criteriaUniversitaireCycleSuperieurMaitrise = this.criteriaService.criteriaUniversitaireCycleSuperieurMaitrise;
  criteriaUniversitaireCycleSuperieurDoctorat = this.criteriaService.criteriaUniversitaireCycleSuperieurDoctorat;
  criteriaExperience = this.criteriaService.criteriaExperience;

  // University degree search and filtering
  univDegreeSearchQuery = signal<string>("");

  private filterCriteriaByActiveLang(criteria: ManualCriterion[]): ManualCriterion[] {
    const q = this.univDegreeSearchQuery().trim().toLowerCase();
    if (!q) return criteria;
    const isEn = this.i18n.lang() === "en";
    return criteria.filter((c) => {
      const label = isEn ? (c.labelEn || c.label) : c.label;
      return label.toLowerCase().includes(q);
    });
  }

  filteredUnivGenie = computed(() =>
    this.filterCriteriaByActiveLang(this.criteriaUniversitaire1erCycleGenie())
  );
  filteredUnivSciences = computed(() =>
    this.filterCriteriaByActiveLang(this.criteriaUniversitaire1erCycleSciences())
  );
  filteredUnivArts = computed(() =>
    this.filterCriteriaByActiveLang(this.criteriaUniversitaire1erCycleArts())
  );
  filteredUnivSante = computed(() =>
    this.filterCriteriaByActiveLang(this.criteriaUniversitaire1erCycleSante())
  );
  filteredUnivMaitrise = computed(() =>
    this.filterCriteriaByActiveLang(this.criteriaUniversitaireCycleSuperieurMaitrise())
  );
  filteredUnivDoctorat = computed(() =>
    this.filterCriteriaByActiveLang(this.criteriaUniversitaireCycleSuperieurDoctorat())
  );

  criteriaUniversitaire1erCycle = computed(() => [
    ...this.criteriaUniversitaire1erCycleGenie(),
    ...this.criteriaUniversitaire1erCycleSciences(),
    ...this.criteriaUniversitaire1erCycleArts(),
    ...this.criteriaUniversitaire1erCycleSante(),
  ]);

  criteriaUniversitaireCycleSuperieur = computed(() => [
    ...this.criteriaUniversitaireCycleSuperieurMaitrise(),
    ...this.criteriaUniversitaireCycleSuperieurDoctorat(),
  ]);

  totalFiltered1erCycleCount = computed(
    () =>
      this.filteredUnivGenie().length +
      this.filteredUnivSciences().length +
      this.filteredUnivArts().length +
      this.filteredUnivSante().length
  );

  totalFilteredCycleSupCount = computed(
    () =>
      this.filteredUnivMaitrise().length +
      this.filteredUnivDoctorat().length
  );

  totalFilteredUnivCount = computed(
    () => this.totalFiltered1erCycleCount() + this.totalFilteredCycleSupCount()
  );

  clearUnivDegreeSearch() {
    this.univDegreeSearchQuery.set("");
  }

  expandedDomaines = signal<Set<string>>(new Set<string>());

  dossierJobIds = computed(() =>
    [
      this.sharedState.selectedDossierJobId1(),
      this.sharedState.selectedDossierJobId2(),
      this.sharedState.selectedDossierJobId3(),
    ].filter(Boolean)
  );

  hasEceJob = computed(() => this.dossierJobIds().includes("00203"));
  hasEsomJob = computed(() => this.dossierJobIds().includes("00207"));
  hasCeopmJob = computed(() => this.dossierJobIds().includes("00214"));
  hasCspnJob = computed(() =>
    this.dossierJobIds().some((id) => id === "00182" || id === "00183" || id === "00184")
  );
  hasAnyExtraTest = computed(
    () =>
      this.hasEceJob() ||
      this.hasEsomJob() ||
      this.hasCeopmJob() ||
      this.hasCspnJob()
  );

  testEcePassed = this.sharedState.testEcePassed;
  testEceNotCompleted = this.sharedState.testEceNotCompleted;
  testEsomPassed = this.sharedState.testEsomPassed;
  testEsomNotCompleted = this.sharedState.testEsomNotCompleted;
  testCeopmPassed = this.sharedState.testCeopmPassed;
  testCeopmNotCompleted = this.sharedState.testCeopmNotCompleted;
  testCspnPassed = this.sharedState.testCspnPassed;
  testCspnNotCompleted = this.sharedState.testCspnNotCompleted;
  testCspn00182Passed = this.sharedState.testCspn00182Passed;
  testCspn00183Passed = this.sharedState.testCspn00183Passed;
  testCspn00184Passed = this.sharedState.testCspn00184Passed;

  toggleManualCriterion(id: string) {
    this.criteriaService.toggleManualCriterion(id);
  }

  isDomaineExpanded(domaine: string): boolean {
    if (this.univDegreeSearchQuery().trim().length > 0) {
      return true;
    }
    return this.expandedDomaines().has(domaine);
  }

  toggleDomaine(domaine: string) {
    const next = new Set(this.expandedDomaines());
    if (next.has(domaine)) {
      next.delete(domaine);
    } else {
      next.add(domaine);
    }
    this.expandedDomaines.set(next);
  }

  onEceMainToggle(checked: boolean) {
    this.testEcePassed.set(checked);
    if (checked) {
      this.testEceNotCompleted.set(false);
    }
  }

  onEceNotCompletedToggle(checked: boolean) {
    this.testEceNotCompleted.set(checked);
    if (checked) {
      this.testEcePassed.set(false);
    }
  }

  onEsomMainToggle(checked: boolean) {
    this.testEsomPassed.set(checked);
    if (checked) {
      this.testEsomNotCompleted.set(false);
    }
  }

  onEsomNotCompletedToggle(checked: boolean) {
    this.testEsomNotCompleted.set(checked);
    if (checked) {
      this.testEsomPassed.set(false);
    }
  }

  onCeopmMainToggle(checked: boolean) {
    this.testCeopmPassed.set(checked);
    if (checked) {
      this.testCeopmNotCompleted.set(false);
    }
  }

  onCeopmNotCompletedToggle(checked: boolean) {
    this.testCeopmNotCompleted.set(checked);
    if (checked) {
      this.testCeopmPassed.set(false);
    }
  }

  onCspnMainToggle(checked: boolean) {
    this.testCspnPassed.set(checked);
    if (checked) {
      this.testCspnNotCompleted.set(false);
    } else {
      this.testCspn00182Passed.set(false);
      this.testCspn00183Passed.set(false);
      this.testCspn00184Passed.set(false);
    }
  }

  onCspnNotCompletedToggle(checked: boolean) {
    this.testCspnNotCompleted.set(checked);
    if (checked) {
      this.testCspnPassed.set(false);
      this.testCspn00182Passed.set(false);
      this.testCspn00183Passed.set(false);
      this.testCspn00184Passed.set(false);
    }
  }
}
