const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const target = `          if (isOta) {
            return t.nameFr === "Offre OTA";
          } else {
            return t.nameFr === "Offre normale" || t.nameFr.toLowerCase().includes("subventionn");
          }`;

const replacement = `          if (isOta) {
            return t.nameFr === "Offre OTA" || t.nameFr.toLowerCase().includes("subventionn");
          } else {
            return t.nameFr === "Offre normale" || t.nameFr.toLowerCase().includes("subventionn");
          }`;

code = code.replace(target, replacement);
fs.writeFileSync('src/app.component.ts', code);
console.log("Patched OTA filter");
