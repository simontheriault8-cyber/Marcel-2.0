const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const target = `    if (task.nameFr.includes("Offre normale")) {`;
const replacement = `    if (task.nameFr.includes("Offre normale") || task.nameFr === "Offre OTA") {`;

code = code.replace(target, replacement);
fs.writeFileSync('src/app.component.ts', code);
console.log("Patched selectTask");
