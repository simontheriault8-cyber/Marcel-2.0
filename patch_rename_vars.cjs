const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

let target = `    const { dateLimiteStr, elementsPlain } = this.getElementsManquantsBlocks();
    en += \`Please send me the following items no later than\${dateLimiteStr}:\\n\\n\`;
    en += elementsPlain;`;
let replacement = `    const blocksEn = this.getElementsManquantsBlocks();
    en += \`Please send me the following items no later than\${blocksEn.dateLimiteStr}:\\n\\n\`;
    en += blocksEn.elementsPlain;`;
code = code.replace(target, replacement);

target = `    const { dateLimiteStr: dls, elementsHtmlList } = this.getElementsManquantsBlocks();
    html += \`<p>Please send me the following items no later than\${dls}:</p>\`;
    html += elementsHtmlList;`;
replacement = `    const blocksHtmlEn = this.getElementsManquantsBlocks();
    html += \`<p>Please send me the following items no later than\${blocksHtmlEn.dateLimiteStr}:</p>\`;
    html += blocksHtmlEn.elementsHtmlList;`;
code = code.replace(target, replacement);

fs.writeFileSync('src/app.component.ts', code);
console.log('Renamed variables');
