const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const targetMethod = `  getUniteAffectationObj() {
    return this.unitesAffectation.find(u => u.id === this.offreUniteAffectation()) || this.unitesAffectation[0];
  }
`;

if (!code.includes('getUniteAffectationObj()')) {
  code = code.replace(
    '  getOfferFormattedNote(): string {',
    targetMethod + '\n  getOfferFormattedNote(): string {'
  );
}

// Replace in plain text
code = code.replace(
  /fr \+= "Unité d’affectation : 3613 – École de leadership et de recrues des Forces canadiennes, Saint-Jean-Sur-Richelieu\\n";/g,
  'fr += `Unité d’affectation :\\n${this.getUniteAffectationObj().adressePlain}\\n\\n`;'
);

// Replace in HTML
code = code.replace(
  /html \+= `<p><strong>Unité d’affectation :<\/strong> 3613 – École de leadership et de recrues des Forces canadiennes, Saint-Jean-Sur-Richelieu<br>`;/g,
  'html += `<p><strong>Unité d’affectation :</strong><br>${this.getUniteAffectationObj().adresseHtml}<br>`;'
);

fs.writeFileSync('src/app.component.ts', code);
console.log("Done updating email text");
