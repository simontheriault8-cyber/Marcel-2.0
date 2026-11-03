# Internationalisation des Diplômes Universitaires & Refactorisation Modulaire

Internationalisation bilingue (français / anglais) intégrale des noms de baccalauréats, maîtrises et doctorats affichés dans le panneau de scolarité des onglets de réorientation (standard et PFOR), accompagnée d'un dictionnaire de traduction i18n dédié et du découpage modulaire du fichier volumineux `criteria-universitaire.data.ts`.

## Décisions Clés & Alignement Utilisateur

> [!IMPORTANT]
> Les deux choix confirmés lors de la phase de clarification sont intégrés dans cette architecture :
> 1. **Dictionnaire i18n dédié et découpage de criteria-universitaire** : Création d'un dictionnaire de traduction dédié `university-degrees.dict.ts` et scission du fichier monolithique de 1270 lignes en sous-fichiers spécialisés par domaine.
> 2. **Recherche basée uniquement sur la langue active** : Tout filtrage ou recherche textuelle de diplômes s'exécute exclusivement sur les libellés de la langue sélectionnée (FR ou EN).

---

## 1. Vue d'Ensemble & Objectifs

- **Problème résolu** : Dans le panneau de scolarité (onglets Réorientation standard et PFOR), les diplômes universitaires (baccalauréats de 1er cycle par domaine, maîtrises et doctorats de cycles supérieurs) ne possédaient pas de libellé anglais (`labelEn`) et s'affichaient uniquement en français.
- **Règle anti-monolithe** : Le fichier `criteria-universitaire.data.ts` comprend actuellement 1 270 lignes. Y ajouter les traductions directement sans découpage l'alourdirait à plus de 1 800 lignes. Le plan propose donc une refactorisation modulaire en 5 sous-fichiers propres et ciblés sous `src/app/data/reorientation-criteria/universitaire/`.
- **Règle bilingue stricte** : Chaque diplôme disposera de son libellé en français et en anglais avec une terminologie académique et militaire rigoureuse (normes canadiennes / Forces armées canadiennes).

---

## 2. Expérience Utilisateur & Comportement de l'Interface

1. **Sélection de la langue (FR / EN)** :
   - Lorsque l'utilisateur bascule en anglais (`EN`), tous les baccalauréats (Génie, Sciences, Arts, Santé) ainsi que les maîtrises et doctorats affichent immédiatement leurs équivalents officiels en anglais (ex. *Génie mécanique* $\rightarrow$ *Mechanical Engineering*, *Administration des affaires* $\rightarrow$ *Business Administration*, *Kinésiologie* $\rightarrow$ *Kinesiology*).
   - En français (`FR`), les libellés originaux sont rigoureusement préservés avec correction des coquilles éventuelles.
2. **Panneau Accordéon / Domaines** :
   - Les titres de domaines et sous-catégories (Génie, Sciences, Arts, Santé, Maîtrise, Doctorat) utilisent déjà les clés de traduction du service `TranslationService` (`scolExp.domaineGenie`, `scolExp.maitrise`, etc.).
   - Les cases à cocher individuelles affichent le `labelEn` ou `label` selon `i18n.lang() === 'en'`.
3. **Recherche / Filtrage** :
   - Le filtrage par texte est aligné sur la langue active : si un recruteur tape « Electrical » en mode anglais, les programmes de génie électrique ressortent fidèlement.

---

## 3. Architecture Technique & Découpage Modulaire

```
┌────────────────────────────────────────────────────────┐
│                   TranslationService                   │
│      (dictionaries: fr/en incluant university-degrees) │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌─────────────────────────┐   ┌──────────────────────────┐
│  university-degrees     │   │     CRITERIA_UNIV        │
│  .dict.ts               │   │     (Agrégateur léger)   │
│  (Clés FR & EN complètes│   └─────────────┬────────────┘
│   par identifiant ID)   │                 │
└─────────────────────────┘                 │
      ┌─────────────────┬───────────────────┼───────────────────┐
      ▼                 ▼                   ▼                   ▼
┌───────────┐     ┌───────────┐       ┌───────────┐       ┌───────────┐
│ Génie     │     │ Sciences  │       │ Arts & Hum│       │ Cycles    │
│ 1er cycle │     │ 1er cycle │       │ & Santé   │       │ Supérieurs│
└───────────┘     └───────────┘       └───────────┘       └───────────┘
```

### Plan de Découpage des Fichiers

1. **`src/app/i18n/dictionaries/university-degrees.dict.ts`** :
   - Exportation de `UNIVERSITY_DEGREES_FR: Record<string, string>` et `UNIVERSITY_DEGREES_EN: Record<string, string>`.
   - Couverture exhaustive de tous les identifiants de diplômes (`bacc_genie_*`, `bacc_sci_*`, `bacc_arts_*`, `bacc_sante_*`, `maitrise_*`, `doctorat_*`).
   - Intégration dans `src/app/i18n/translation.service.ts` et `src/app/i18n/index.ts`.

2. **Dossier modulaire `src/app/data/reorientation-criteria/universitaire/`** :
   - `criteria-univ-genie.data.ts` (~200 lignes) : Diplômes de 1er cycle en Génie.
   - `criteria-univ-sciences.data.ts` (~220 lignes) : Diplômes de 1er cycle en Sciences pures et appliquées.
   - `criteria-univ-arts.data.ts` (~180 lignes) : Diplômes de 1er cycle en Arts, Lettres et Sciences humaines.
   - `criteria-univ-sante.data.ts` (~150 lignes) : Diplômes de 1er cycle en Santé et Soins infirmiers/médicaux.
   - `criteria-univ-cycles-superieurs.data.ts` (~380 lignes) : Maîtrises et Doctorats.

3. **`src/app/data/reorientation-criteria/criteria-universitaire.data.ts`** :
   - Remplacé par un agrégateur propre et concis (environ 20 lignes) qui réexporte `CRITERIA_UNIVERSITAIRE = [...]`.
   - Garantit zéro rupture avec les imports existants dans `criteria-all.data.ts` et les services de réorientation.

4. **Synchronisation du composant `scolarite-experience.component.ts`** :
   - Prise en compte du dictionnaire ou assignation des propriétés `labelEn` pour chaque critère.
   - Validation que la recherche textuelle locale dans le panneau se base sur la langue courante.

---

## 4. Vérification & Validation

1. **Vérification orthographique et grammaticale** :
   - Révision bilingue soignée de chaque nom de programme (accents français, majuscules et terminologie anglaise standard).
2. **Validation TypeScript & Build** :
   - Exécution de `lint_applet` (`tsc --noEmit`) pour valider l'intégrité des types.
   - Exécution de `compile_applet` pour confirmer la compilation AOT sans régression.
3. **Validation visuelle & fonctionnelle** :
   - Vérification de l'affichage en français et en anglais dans l'onglet Réorientation classique et dans l'onglet Réorientation PFOR.
