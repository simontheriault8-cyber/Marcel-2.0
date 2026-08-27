const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

// 1. Remove the preview panel
const previewPanelStart = `                          <!-- Aperçu en temps réel de la note -->`;
const previewPanelEnd = `                            <div class="text-emerald-400 font-semibold selection:bg-indigo-500 selection:text-white">{{ getOfferFormattedNote() }}</div>
                          </div>`;

const startIndex = code.indexOf(previewPanelStart);
const endIndex = code.indexOf(previewPanelEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const toRemove = code.substring(startIndex, endIndex + previewPanelEnd.length);
  code = code.replace(toRemove, '');
  console.log("Preview panel removed");
} else {
  console.log("Could not find preview panel");
}

// 2. Update generatedNote
const generatedNoteOffreTemplate = `    // 2. Offre normale Note
    if (this.offreNormaleChecked()) {
      notes.push("Courriel d'offre normale envoyé au postulant.");
    }

    // 3. Offre études subventionnées Note
    if (this.offreEtudesSubventionneesChecked()) {
      notes.push("Courriel d'offre d'études subventionnées envoyé au postulant.");
    }`;

const generatedNoteOffreReplacement = `    // 2. Offre normale Note
    if (this.offreNormaleChecked()) {
      notes.push(this.getOfferFormattedNote());
    }

    // 3. Offre études subventionnées Note
    if (this.offreEtudesSubventionneesChecked()) {
      notes.push(this.getOfferFormattedNote());
    }`;

if (code.includes(generatedNoteOffreTemplate)) {
  code = code.replace(generatedNoteOffreTemplate, generatedNoteOffreReplacement);
  console.log("generatedNote updated");
} else {
  console.log("Could not find generatedNote section");
}

fs.writeFileSync('src/app.component.ts', code);
