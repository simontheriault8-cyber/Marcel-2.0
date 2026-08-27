const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const generateHelperText = `
  // Helper for generating dynamic lists
  private getElementsManquantsBlocks(): {
    dateLimiteStr: string;
    elementsPlain: string;
    elementsHtmlList: string;
  } {
    const dateLimite = this.offreDateElementsManquants()?.trim();
    const dateLimiteStr = dateLimite ? \` \${dateLimite}\` : '';
    const elementsText = this.offreElementsManquants() || '';
    const elementsList = elementsText.split('\\n').map(e => e.trim()).filter(e => e.length > 0);
    
    let elementsPlain = '';
    elementsList.forEach((el, idx) => {
      elementsPlain += \`\${idx + 1}.\\t\${el}\\n\`;
    });
    if (elementsPlain) {
      elementsPlain += '\\n\\n';
    }

    let elementsHtmlList = '<ol style="margin-top: 0; margin-bottom: 15px; padding-left: 20px;">';
    elementsList.forEach(el => {
      elementsHtmlList += \`<li>\${el}</li>\`;
    });
    elementsHtmlList += '</ol>';

    return { dateLimiteStr, elementsPlain, elementsHtmlList };
  }
`;

// Insert helper method
code = code.replace('  getOffreNormaleEmailPlain(): string {', generateHelperText + '\n  getOffreNormaleEmailPlain(): string {');

// 1. getOffreNormaleEmailPlain
let target = `    fr += "Veuillez me faire parvenir les éléments suivant au plus tard le  :\\n\\n";
    fr += "1.	Spécimen de chèque \\n\\n\\n";
    fr += "Puis veuillez prendre connaissance des documents joints au courriel, le formulaire 330-61 devra être complété et apporté à Saint-Jean\\n\\n\\n\\n";`;
let replacement = `    const { dateLimiteStr, elementsPlain } = this.getElementsManquantsBlocks();
    fr += \`Veuillez me faire parvenir les éléments suivant au plus tard le\${dateLimiteStr} :\\n\\n\`;
    fr += elementsPlain;
    fr += "Puis veuillez prendre connaissance des documents joints au courriel, le formulaire 330-61 devra être complété et apporté à Saint-Jean\\n\\n\\n\\n";`;
code = code.replace(target, replacement);

target = `    en += "Please send me the following items no later than  :\\n\\n";
    en += "1.	Void cheque \\n\\n\\n";
    en += "Then please read the documents attached to the email, form 330-61 must be completed and brought to Saint-Jean\\n\\n\\n\\n";`;
replacement = `    en += \`Please send me the following items no later than\${dateLimiteStr}:\\n\\n\`;
    en += elementsPlain;
    en += "Then please read the documents attached to the email, form 330-61 must be completed and brought to Saint-Jean\\n\\n\\n\\n";`;
code = code.replace(target, replacement);

// 2. getOffreNormaleEmailHtml
target = `    html += \`<p>Veuillez me faire parvenir les éléments suivant au plus tard le :</p>\`;
    html += \`<ol style="margin-top: 0; margin-bottom: 15px; padding-left: 20px;"><li>Spécimen de chèque</li></ol>\`;
    html += \`<p>Puis veuillez prendre connaissance des documents joints au courriel, le formulaire 330-61 devra être complété et apporté à Saint-Jean</p>\`;`;
replacement = `    const { dateLimiteStr, elementsHtmlList } = this.getElementsManquantsBlocks();
    html += \`<p>Veuillez me faire parvenir les éléments suivant au plus tard le\${dateLimiteStr} :</p>\`;
    html += elementsHtmlList;
    html += \`<p>Puis veuillez prendre connaissance des documents joints au courriel, le formulaire 330-61 devra être complété et apporté à Saint-Jean</p>\`;`;
code = code.replace(target, replacement);

target = `    html += \`<p>Please send me the following items no later than :</p>\`;
    html += \`<ol style="margin-top: 0; margin-bottom: 15px; padding-left: 20px;"><li>Void cheque</li></ol>\`;
    html += \`<p>Then please read the documents attached to the email, form 330-61 must be completed and brought to Saint-Jean</p>\`;`;
replacement = `    html += \`<p>Please send me the following items no later than\${dateLimiteStr}:</p>\`;
    html += elementsHtmlList;
    html += \`<p>Then please read the documents attached to the email, form 330-61 must be completed and brought to Saint-Jean</p>\`;`;
code = code.replace(target, replacement);

// 3. getOffreEtudesSubventionneesEmailPlain
target = `    fr += "Veuillez prendre connaissance des documents joints au courriel et me retourner les documents suivants au plus tard le:\\n";
    fr += "-	Spécimen de chèque \\n\\n\\n";
    fr += "Le formulaire 330-61 devra être complété et apporté à Saint-Jean\\n\\n\\n\\n";`;
replacement = `    const { dateLimiteStr, elementsPlain } = this.getElementsManquantsBlocks();
    fr += \`Veuillez prendre connaissance des documents joints au courriel et me retourner les documents suivants au plus tard le\${dateLimiteStr} :\\n\\n\`;
    fr += elementsPlain;
    fr += "Le formulaire 330-61 devra être complété et apporté à Saint-Jean\\n\\n\\n\\n";`;
code = code.replace(target, replacement);

target = `    en += "Please read the documents attached to the email and return the following documents to me no later than:\\n";
    en += "- Void cheque \\n\\n\\n";
    en += "Form 330-61 must be completed and brought to Saint-Jean\\n\\n\\n\\n";`;
replacement = `    en += \`Please read the documents attached to the email and return the following documents to me no later than\${dateLimiteStr}:\\n\\n\`;
    en += elementsPlain;
    en += "Form 330-61 must be completed and brought to Saint-Jean\\n\\n\\n\\n";`;
code = code.replace(target, replacement);

// 4. getOffreEtudesSubventionneesEmailHtml
target = `    html += \`<p>Veuillez prendre connaissance des documents joints au courriel et me retourner les documents suivants au plus tard le:</p>\`;
    html += \`<ul style="margin-top: 0; margin-bottom: 15px; padding-left: 20px;"><li>Spécimen de chèque</li></ul>\`;
    html += \`<p>Le formulaire 330-61 devra être complété et apporté à Saint-Jean</p>\`;`;
replacement = `    const { dateLimiteStr, elementsHtmlList } = this.getElementsManquantsBlocks();
    html += \`<p>Veuillez prendre connaissance des documents joints au courriel et me retourner les documents suivants au plus tard le\${dateLimiteStr} :</p>\`;
    html += elementsHtmlList;
    html += \`<p>Le formulaire 330-61 devra être complété et apporté à Saint-Jean</p>\`;`;
code = code.replace(target, replacement);

target = `    html += \`<p>Please read the documents attached to the email and return the following documents to me no later than:</p>\`;
    html += \`<ul style="margin-top: 0; margin-bottom: 15px; padding-left: 20px;"><li>Void cheque</li></ul>\`;
    html += \`<p>Form 330-61 must be completed and brought to Saint-Jean</p>\`;`;
replacement = `    html += \`<p>Please read the documents attached to the email and return the following documents to me no later than\${dateLimiteStr}:</p>\`;
    html += elementsHtmlList;
    html += \`<p>Form 330-61 must be completed and brought to Saint-Jean</p>\`;`;
code = code.replace(target, replacement);

fs.writeFileSync('src/app.component.ts', code);
console.log('Patched email generation logic');
