# Plan d'implémentation : Standardisation bilingue des objets de courriels candidats pour l'exportation Outlook

Ce plan détaille la mise à jour des objets de courriels générés et exportés vers Outlook dans le volet recruteur, afin d'assurer une parfaite cohérence bilingue conformément aux réponses de clarification :
- **Version française :** `Forces armées canadiennes/Canadian Armed Forces` (sans espaces autour de la barre oblique).
- **Version anglaise :** `Canadian Armed Forces/Forces armées canadiennes` (sans espaces autour de la barre oblique).
- **Périmètre ciblé :** Tous les courriels destinés aux candidats (dossiers conformes, avis de rejets de documents/tâches, scénarios d'inadmissibilité candidat, premier contact, avis de fermeture de dossier, offres d'emploi, etc.).
- Les courriels administratifs internes (Vérification dossier cadet, demande NAV/TAN) conservent leurs objets spécialisés respectifs.

---

## 1. Dictionnaires de traduction (`src/app/i18n/dictionaries/emails-subjects-headers.dict.ts`)
- Définition et mise à jour de la clé centrale `'subject.candidate_email_outlook'` (et mise à niveau des alias de sujets associés aux courriels candidats) :
  - **FR :** `'subject.candidate_email_outlook': 'Forces armées canadiennes/Canadian Armed Forces'`
  - **EN :** `'subject.candidate_email_outlook': 'Canadian Armed Forces/Forces armées canadiennes'`
- Mise à jour des clés de sujets spécifiques aux candidats pour respecter la structure sans espaces autour du délimiteur.

---

## 2. Générateur de sujets du Volet Recruteur (`src/app/generators/gd-email-bank-ceremonie.generator.ts`)
- Mise à jour de la fonction `getEmailSubject()` pour :
  - Retourner la chaîne bilingue standardisée `'subject.candidate_email_outlook'` pour tous les courriels destinés aux candidats :
    - Dossier conforme / complété
    - Rejet de tâches / documents requis
    - Offre d'enrôlement normale & études subventionnées
    - Premier contact
    - Avis de fermeture de dossier
    - Scénarios d'évaluation médicale candidat
  - Conserver les sujets techniques dédiés pour les courriels internes envoyés à des cellules internes (ex: réclamations NAV/TAN, dossier cadet).

---

## 3. Exportateur Outlook (`src/app/generators/task-rejections-combined.generator.ts`)
- Mise à jour de `exportToOutlook()` pour s'assurer que le paramètre `?subject=` de l'URL `mailto:` est encodé avec le sujet bilingue dynamique issu de `i18n.t('subject.candidate_email_outlook')`.
- Harmonisation bilingue pour les courriels spécifiques PFOR 101 et Lien PA dans les versions FR et EN.

---

## 4. Harmonisation dans les composants Réorientation et PFOR
- `src/app/components/pfor.component.ts` : Remplacement de la chaîne en dur par l'appel au service de traduction `i18n`.
- `src/app/components/reorientation.component.ts` : Remplacement de la chaîne en dur par l'appel au service de traduction `i18n`.

---

## 5. Validation et compilation
- Exécution de `compile_applet` et `lint_applet` pour garantir l'absence de régression ou d'erreur de typage.
- Vérification du comportement en basculant entre le français et l'anglais.
