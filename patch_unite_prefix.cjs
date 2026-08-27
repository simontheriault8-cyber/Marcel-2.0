const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

// Replace in plain text
code = code.split('fr += `Unité d’affectation :\\n${this.getUniteAffectationObj().adressePlain}\\n\\n`;').join('fr += `Unité d’affectation : BFC ${this.getUniteAffectationObj().nom}\\n${this.getUniteAffectationObj().adressePlain}\\n\\n`;');

// Replace in HTML
code = code.split('html += `<p><strong>Unité d’affectation :</strong><br>${this.getUniteAffectationObj().adresseHtml}<br>`;').join('html += `<p><strong>Unité d’affectation :</strong> BFC ${this.getUniteAffectationObj().nom}<br>${this.getUniteAffectationObj().adresseHtml}<br>`;');

fs.writeFileSync('src/app.component.ts', code);
console.log("Done updating email prefix");
