# Plan d'Internationalisation Exhaustive et Standardisation Bilingue des Métiers

Ce plan détaille la finalisation intégrale de la traduction bilingue (Français / Anglais) de l'ensemble de l'application, en intégrant les choix confirmés lors de la phase de clarification : affichage « Code et titre en anglais uniquement » dans toutes les listes déroulantes de métiers, réactualisation automatique instantanée des sélections lors du changement de langue, et balayage exhaustif de tous les modules et modales.

---

## Décisions Confirmées avec l'Utilisateur

> [!IMPORTANT]
> Les trois décisions suivantes ont été validées lors de l'entretien et orientent l'architecture de la solution :
> 1. **Format d'affichage des métiers en mode anglais** : Code et titre en anglais uniquement (`00120 - Signals Intelligence Specialist` ou `00120 - NCI OP`).
> 2. **Changement de langue en cours de session** : Réactualisation automatique et immédiate des textes de recherche et des métiers sélectionnés dans les champs (`searchDossierQuery1`, `2`, `3`) sans perte d'état.
> 3. **Périmètre & Priorité** : Balayage exhaustif complet de tous les panneaux, listes déroulantes, modales et formulaires de l'application.

---

## 1. Vue d'Ensemble & Objectifs

- **Problématique résolue** : Certains panneaux comportent encore des noms de métiers ou libellés statiques en français en mode anglais (notamment dans *Candidate's file occupations*, *Occupations already in candidate's file* et *Current occupation choices in file*), et les champs de recherche conservent les textes français saisis avant le basculement de langue.
- **Bénéfice utilisateur** : Une application 100 % bilingue, parfaitement réactive, où chaque métier, infobulle, dialogue, bouton et courriel généré s'adapte immédiatement à la langue sélectionnée par le recruteur ou gestionnaire de dossier.

---

## 2. Architecture Technique & Flux de Données

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TranslationService (i18n.currentLang)                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Émet 'fr' ou 'en' (Signal)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Dictionnaires Modulaires Enrichis                    │
│   • jobs.dict.ts (Titres officiels EN/FR extraits des URLs & emails)   │
│   • ui-common.dict.ts (Header, panneaux dossiers, sélection métiers)   │
│   • ui-reorientation-pfor.dict.ts (RÉO, critères, PFOR, CMR)          │
│   • ui-tasks-gd.dict.ts (Tâches GD, notes, modales de prévisualisation)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│  Candidate's File    │ │  Reorientation Tab   │ │  PFOR / ROTP Tab     │
│  Occupations Panel   │ │  Occupations in File │ │  Current Choices     │
│ (Header / Sidebar)   │ │ (Part 1 Reo Template)│ │ (PFOR Template)      │
│                      │ │                      │ │                      │
│ • Dropdown items:    │ │ • Dropdown items:    │ │ • <select> options:  │
│   Code + Title EN    │ │   Code + Title EN    │ │   Code + Title EN    │
│ • Input auto-refresh │ │ • Input auto-refresh │ │ • Age/criteria notes │
│   on lang switch     │ │   on lang switch     │ │   in active language │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘
```

---

## 3. Plan d'Exécution Détaillé par Étapes

### [x] Étape 1 : Création du Référentiel Bilingue des Métiers (`jobs.dict.ts`) — Complété & Validé
- Intégration des 96 métiers des Forces armées canadiennes dans `src/app/i18n/dictionaries/jobs.dict.ts` avec correspondance exacte des titres anglais issus de `JOB_URLS` et de la nomenclature officielle des FAC.
- Méthodes `getJobTitle` et `getJobDisplayLabel` intégrées dans `JobDatabaseService` et `TranslationService`.
- Prise en charge de la recherche directe par titre anglais (`titleEn`), français, identifiant et abréviation.

### [x] Étape 2 : Panneau *Candidate's File Occupations* & Réactualisation Réactive — Complété & Validé
- Dropdown items standardisés sur le format `{{ jobService.getJobDisplayLabel(job, i18n.currentLang()) }}`.
- Effet réactif Angular (`effect`) implémenté dans `SharedStateService` : dès qu'un changement de langue intervient, les inputs `searchDossierQuery1`, `2`, `3` sont automatiquement réactualisés dans la nouvelle langue sans nécessiter de ressaisie.
- Méthodes de sélection et fermeture différée synchronisées dans `task-compliance-state.helper.ts`.

### [x] Étape 3 : Panneau *Occupations Already in Candidate's File* (Réorientation) — Complété & Validé
- Listes déroulantes de recherche des choix 1, 2 et 3 mises à jour dans `reorientation-part1.template.ts` et `reorientation-part2.template.ts` avec `jobService.getJobTitle`.
- Prise en charge de la recherche bilingue et de la sélection anglaise dans `reorientation.component.ts` (`filterJobsForSearch`, `selectDossierJob`, `closeDropdownDelayed`).

### [x] Étape 4 : Panneau *Current Occupation Choices in File* (Volet PFOR) — Complété & Validé
- Éléments `<select>` des 3 choix de métiers mis à jour dans `pfor.template.ts` avec `jobService.getJobDisplayLabel(job, i18n.lang())`.
- Affichage strict en anglais (« Code et titre en anglais uniquement ») lorsque la langue active est l'anglais.

### [x] Étape 5 : Balayage Exhaustif & Élimination des Chaînes Résiduelles — Complété & Validé
- Composant `UnitPickerComponent` (`unit-picker.component.ts`) internationalisé avec `unitPicker.*` (titre, placeholder de recherche, bouton effacer, état vide).
- Clés de dictionnaire associées ajoutées dans `ui-tasks-gd.dict.ts` (FR et EN).
- Validation de l'ensemble des modales et formulaires annexes.

### [x] Étape 6 : Validation, Linting & Compilation AOT — Complété & Validé
- Validation `tsc --noEmit` réussie avec 0 erreur TypeScript.
- Compilation AOT Angular 21 zoneless réussie sans avertissement ni régression.

