const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

code = code.replace(/this\.noteBeneficiaire\.set\(snapshot\.noteBeneficiaire \|\| 'À CONFIRMER'\);/g, "this.noteBeneficiaire.set(snapshot.noteBeneficiaire || '');");
code = code.replace(/noteBeneficiaire: 'À CONFIRMER'/g, "noteBeneficiaire: ''");
code = code.replace(/this\.noteBeneficiaire\.set\('À CONFIRMER'\);/g, "this.noteBeneficiaire.set('');");
code = code.replace(/noteBeneficiaire = signal<string>\('À CONFIRMER'\);/g, "noteBeneficiaire = signal<string>('');");
code = code.replace(/const beneficiaire = this\.noteBeneficiaire\(\) \|\| 'À CONFIRMER';/g, "const beneficiaire = this.noteBeneficiaire();");

fs.writeFileSync('src/app.component.ts', code);
