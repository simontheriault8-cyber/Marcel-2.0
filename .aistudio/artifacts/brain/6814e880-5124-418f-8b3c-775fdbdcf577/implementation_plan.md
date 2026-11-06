# Plan d'implémentation révisé : Matrice logique (Cases à cocher ↔ Métiers débloqués) et correction des règles d'admissibilité

## 1. Constat et diagnostic précis du problème soulevé

Votre remarque cible exactement le cœur du problème :
Il ne s'agit pas des descriptions statiques de l'ancien catalogue, mais de **la chaîne logique exacte entre les cases à cocher des panneaux Scolarité & Expérience et les métiers déclarés admissibles** dans le panneau de réorientation et le courriel généré (`eligibleJobs()`).

Après audit approfondi du code source, voici les causes réelles des erreurs identifiées :
1. **28 métiers sur 97 sont absents de `JOB_RULES` :**
   - La table de règles `JOB_RULES` (`job-rules-part1.data.ts` et `job-rules-part2.data.ts`) ne contient que 69 métiers.
   - Les 28 métiers manquants sont presque tous des métiers d'officiers et officiers spécialistes :
     - **Santé :** `00190` (Physiothérapie), `00191` (Dentiste militaire), `00194` (Pharmacie), `00195` (Soins infirmiers), `00198` (Travail social), `00374` (Adjoint au médecin), `00390` (Médecin spécialiste), `00393` (Médecin militaire), `00398` (Gestion des services de santé).
     - **Génie :** `00181` (Génie), `00185` (Génie aérospatial), `00187` (Génie électrique et mécanique), `00189` (Génie construction), `00340` (Génie électronique/comm.), `00341` (Transmissions), `00344` (Génie combat naval), `00345` (Génie systèmes marine).
     - **Autres officiers spécialisés :** `00203` (Affaires publiques), `00204` (Avocat militaire), `00207` (Guerre navale), `00208` (Sélection personnel), `00211` (Développement instruction), `00213` (Renseignement), `00214` (Police militaire), `00349` (Aumônier).
2. **Divergence critique dans le moteur d'évaluation :**
   - La fonction `computeReoEligibleJobs` (utilisée pour afficher les métiers admissibles et pour générer la liste dans le courriel) boucle **exclusivement sur `JOB_RULES`**.
   - Par conséquent, lorsqu'un utilisateur coche un baccalauréat (ex. *Baccalauréat en sciences infirmières*, *Baccalauréat en physiothérapie*, *Baccalauréat en génie civil*, etc.), ces métiers **n'apparaissent JAMAIS** dans la liste des métiers admissibles du courriel hors PFOR !
3. **Logique morcelée et dissimulée :**
   - Une partie de la logique de correspondance entre diplômes et métiers a été codée dans `src/services/reorientation/experience-criteria-evaluator.ts` uniquement pour afficher les critères d'expérience dynamiques, mais n'a jamais été répercutée dans `JOB_RULES`.
   - Certaines règles pour les MR ont des conditions complexes (ex. DES + Maths appliquées OU DEP spécifique) dont la logique doit être rendue totalement transparente et vérifiable.

---

## 2. Solutions apportées

### A. Création du tableau interactif : « Matrice Logique Cases à cocher ↔ Métiers »
Nous allons créer un outil visuel dédié, accessible directement dans le Portail Administrateur (derrière le mot de passe sécurisé) et/ou via un bouton dans l'onglet de réorientation :
- **Recherche par métier :**
  - Tapez un métier (ex: `00100`, `00195`, `00303`).
  - Visualisez **exactement quelles cases à cocher** du panneau Scolarité et Expérience doivent être activées pour rendre ce métier admissible.
  - Distinction visuelle claire entre les conditions obligatoires (**ET**) et les alternatives (**OU**) :
    - *Exemple 00303 :* [Sec 4 (24 crédits) **ET** Math appliquées sec 4/10e] **OU** [DEP en électricité].
    - *Exemple 00195 :* [Bacc. en sciences infirmières **OU** Bacc. en sciences des soins infirmiers] **ET** [Permis de pratique valide].
- **Recherche inversée par case à cocher (Reverse Lookup) :**
  - Choisissez n'importe quelle case à cocher de la scolarité (ex: *DEP en mécanique*, *Math SN 4*, *Bacc en informatique*).
  - Voyez instantanément la liste de tous les métiers que cette case contribue à débloquer ou débloque entièrement.
- **Filtres et export :**
  - Filtrage par groupe (Militaires du rang vs Officiers).
  - Filtrage des métiers sans règle explicite ou avec conditions complexes.

### B. Ajout des règles manquantes dans `JOB_RULES` (Couverture 100% des 97 métiers)
Pour respecter la règle anti-monolithique, nous allons créer un fichier dédié :
- **Fichier :** `src/app/data/reorientation-criteria/job-rules-officers-specialized.data.ts`
- Ce fichier établira les règles académiques officielles pour les 28 métiers d'officiers manquants en se basant sur les diplômes universitaires existants (`bacc_*`, `maitrise_*`, `doctorat_*`) et les équivalences prévues.
- Export centralisé dans `src/app/data/reorientation-criteria.data.ts` pour que `JOB_RULES` contienne désormais les 97 métiers.

### C. Harmonisation et fiabilisation de `computeReoEligibleJobs` et des courriels
- Correction de `computeReoEligibleJobs` dans `reorientation-admissibility.helper.ts` pour qu'il traite sans faille toutes les règles de `JOB_RULES`.
- Validation stricte que si l'âge ou la scolarité n'est pas rempli, aucun métier n'est considéré admissible.
- Garantie que la liste générée dans le courriel de réorientation (`reorientation-email.generator.ts`) reflète rigoureusement cette logique.

---

## 3. Plan de découpage des fichiers (Architecture modulaire)

1. `src/app/data/reorientation-criteria/job-rules-officers-specialized.data.ts` (~250 lignes) :
   - Définition des règles logiques pour tous les métiers d'officiers spécialisés (santé, génie, droit, etc.).
2. `src/app/data/reorientation-criteria.data.ts` :
   - Fusion de `JOB_RULES_PART1`, `JOB_RULES_PART2` et `JOB_RULES_OFFICERS_SPECIALIZED`.
3. `src/services/reorientation/reorientation-logic-matrix.service.ts` (~200 lignes) :
   - Service pur analysant les règles `JOB_RULES`, décomposant les prédicats (`requiredCriteriaIds`, `customCheck`) et fournissant l'indexation bidirectionnelle (Métier → Cases requises et Case → Métiers débloqués).
4. `src/app/components/admin/criteria-matrix/criteria-matrix.component.ts` (~250 lignes) :
   - Composant interactif bilingue affichant le tableau avec filtres, recherche, vue détaillée et mode inversé.
5. `src/app/components/admin/admin-portal.component.ts` :
   - Ajout de l'onglet « Matrice logique des critères » dans le portail admin.
6. `src/app/i18n/dictionaries/criteria-matrix.dict.ts` :
   - Dictionnaire de traduction FR/EN dédié pour tous les termes de la matrice logique.

---

## 4. Plan de vérification et d'assurance qualité

1. **Vérification de la couverture :**
   - Exécution d'un script d'audit automatisé pour certifier que 97 métiers sur 97 possèdent désormais une règle explicite.
2. **Vérification de cas concrets dans l'application :**
   - Tester le métier `00195` (Soins infirmiers) : cocher *Bacc en sciences infirmières* doit débloquer le métier dans la liste et dans le courriel.
   - Tester le métier `00303` : vérifier que soit le *DEP en électricité*, soit *Sec 4 + Math 10 app* débloque le métier.
   - Tester le cas d'âge et de scolarité non renseignés : aucun métier ne doit apparaître admissible.
3. **Compilation et vérification des lints :**
   - `compile_applet` et `lint_applet` sans aucune erreur ni avertissement de type.
