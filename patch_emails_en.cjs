const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

// 1. getOffreNormaleEmailPlain (English part)
let target = `    en += "Please send me the following items no later than  :\\n\\n";
    en += "1.	Void cheque \\n\\n\\n";
    en += "Then please review the documents attached to this email; form 330-61 must be completed and brought to Saint-Jean.\\n\\n\\n\\n";`;
let replacement = `    const { dateLimiteStr, elementsPlain } = this.getElementsManquantsBlocks();
    en += \`Please send me the following items no later than\${dateLimiteStr}:\\n\\n\`;
    en += elementsPlain;
    en += "Then please review the documents attached to this email; form 330-61 must be completed and brought to Saint-Jean.\\n\\n\\n\\n";`;
code = code.replace(target, replacement);

// 2. getOffreNormaleEmailHtml (English part)
target = `    html += \`<p>Please send me the following items no later than :</p>\`;
    html += \`<ol style="margin-top: 0; margin-bottom: 15px; padding-left: 20px;"><li>Void cheque</li></ol>\`;
    html += \`<p>Then please review the documents attached to this email; form 330-61 must be completed and brought to Saint-Jean.</p>\`;`;
replacement = `    const { dateLimiteStr: dls, elementsHtmlList } = this.getElementsManquantsBlocks();
    html += \`<p>Please send me the following items no later than\${dls}:</p>\`;
    html += elementsHtmlList;
    html += \`<p>Then please review the documents attached to this email; form 330-61 must be completed and brought to Saint-Jean.</p>\`;`;
code = code.replace(target, replacement);

// 3. getOffreEtudesSubventionneesEmailPlain (English part)
target = `    en += "Please read the documents attached to the email and return the following documents to me no later than:\\n";
    en += "-	Void cheque \\n\\n\\n";
    en += "Form 330-61 must be completed and brought to Saint-Jean\\n\\n\\n\\n";`;
replacement = `    en += \`Please read the documents attached to the email and return the following documents to me no later than\${this.getElementsManquantsBlocks().dateLimiteStr}:\\n\\n\`;
    en += this.getElementsManquantsBlocks().elementsPlain;
    en += "Form 330-61 must be completed and brought to Saint-Jean\\n\\n\\n\\n";`;
code = code.replace(target, replacement);

// 4. getOffreEtudesSubventionneesEmailHtml (English part)
target = `    html += \`<p>Please read the documents attached to the email and return the following documents to me no later than:</p>\`;
    html += \`<ul style="margin-top: 0; margin-bottom: 15px; padding-left: 20px;"><li>Void cheque</li></ul>\`;
    html += \`<p>Form 330-61 must be completed and brought to Saint-Jean</p>\`;`;
replacement = `    html += \`<p>Please read the documents attached to the email and return the following documents to me no later than\${this.getElementsManquantsBlocks().dateLimiteStr}:</p>\`;
    html += this.getElementsManquantsBlocks().elementsHtmlList;
    html += \`<p>Form 330-61 must be completed and brought to Saint-Jean</p>\`;`;
code = code.replace(target, replacement);

fs.writeFileSync('src/app.component.ts', code);
console.log('Patched English email generation logic');
