const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const TODAY = new Date();
const TODAY_STR = `${String(TODAY.getDate()).padStart(2, '0')}-${String(TODAY.getMonth() + 1).padStart(2, '0')}-${TODAY.getFullYear()}`;

// 1. RoleSnapshot
code = code.replace(
  '  noteInviteMil?: string;',
  '  noteInviteMil?: string;\n  noteInviteMilTexte?: string;'
);

// 2. getSnapshot()
code = code.replace(
  '      noteInviteMil: this.noteInviteMil(),',
  '      noteInviteMil: this.noteInviteMil(),\n      noteInviteMilTexte: this.noteInviteMilTexte(),'
);

// 3. applySnapshot()
code = code.replace(
  '    this.noteInviteMil.set(snapshot.noteInviteMil || \'N/A\');',
  '    this.noteInviteMil.set(snapshot.noteInviteMil || \'N/A\');\n    this.noteInviteMilTexte.set(snapshot.noteInviteMilTexte || \'\');'
);

code = code.replace(
  '    this.noteDateCourrielConfirmation.set(snapshot.noteDateCourrielConfirmation || \'15-06-2026\');',
  `    this.noteDateCourrielConfirmation.set(snapshot.noteDateCourrielConfirmation || '${TODAY_STR}');`
);

// 4. resetState()
code = code.replace(
  '      noteInviteMil: \'N/A\',',
  '      noteInviteMil: \'N/A\',\n      noteInviteMilTexte: \'\','
);

code = code.replace(
  '      noteDateCourrielConfirmation: \'15-06-2026\',',
  `      noteDateCourrielConfirmation: '${TODAY_STR}',`
);

// 5. resetState() inside switchRole()
code = code.replace(
  '    this.noteInviteMil.set(\'N/A\');',
  '    this.noteInviteMil.set(\'N/A\');\n    this.noteInviteMilTexte.set(\'\');'
);

code = code.replace(
  '    this.noteDateCourrielConfirmation.set(\'15-06-2026\');',
  `    this.noteDateCourrielConfirmation.set('${TODAY_STR}');`
);

// 6. Signal declarations
code = code.replace(
  '  noteInviteMil = signal<string>(\'N/A\');',
  '  noteInviteMil = signal<string>(\'N/A\');\n  noteInviteMilTexte = signal<string>(\'\');'
);

code = code.replace(
  '  noteDateCourrielConfirmation = signal<string>(\'15-06-2026\');',
  `  noteDateCourrielConfirmation = signal<string>('${TODAY_STR}');`
);

// 7. svcMilAntOptions
code = code.replace(
  `  readonly svcMilAntOptions: string[] = [
    'N/A',
    'Force régulière',
    'Première réserve',
    'Cadets / Rangers',
    'Autre'
  ];`,
  `  readonly svcMilAntOptions: string[] = [
    'N/A',
    'Force régulière',
    'Première réserve',
    'Cadets / Rangers',
    'Armée étrangère'
  ];`
);

// 8. beneficiaireOptions (remove it)
code = code.replace(
  `  readonly beneficiaireOptions: string[] = [
    'À CONFIRMER',
    'Spécifié',
    'Formulaire complété',
    'Aucun changement'
  ];\n\n`,
  ''
);

// 9. Template changes: noteInviteMil input
const inviteMilTemplate = `                            <!-- Invité mil -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Invité mil :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteInviteMil()"
                                (change)="noteInviteMil.set($any($event.target).value)"
                              >
                                @for (opt of ouiNonOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>`;

const inviteMilReplacement = `                            <!-- Invité mil -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Invité mil :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteInviteMil()"
                                (change)="noteInviteMil.set($any($event.target).value)"
                              >
                                @for (opt of ouiNonOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                              @if (noteInviteMil() === 'oui') {
                                <input
                                  type="text"
                                  class="w-full p-2 mt-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                  placeholder="Préciser l'invité"
                                  [value]="noteInviteMilTexte()"
                                  (input)="noteInviteMilTexte.set($any($event.target).value)"
                                />
                              }
                            </div>`;

code = code.replace(inviteMilTemplate, inviteMilReplacement);

// 10. Template changes: noteBeneficiaire input
const beneficiaireTemplate = `                            <!-- Bénéficiaire -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Bénéficiaire :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="noteBeneficiaire()"
                                (change)="noteBeneficiaire.set($any($event.target).value)"
                              >
                                @for (opt of beneficiaireOptions; track opt) {
                                  <option [value]="opt">{{ opt }}</option>
                                }
                              </select>
                            </div>`;

const beneficiaireReplacement = `                            <!-- Bénéficiaire -->
                            <div>
                              <label class="block font-semibold text-slate-700 mb-1">Bénéficiaire :</label>
                              <input
                                type="text"
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800"
                                placeholder="Bénéficiaire"
                                [value]="noteBeneficiaire()"
                                (input)="noteBeneficiaire.set($any($event.target).value)"
                              />
                            </div>`;

code = code.replace(beneficiaireTemplate, beneficiaireReplacement);

// 11. getOfferFormattedNote()
code = code.replace(
  "    const inviteMil = this.noteInviteMil() || 'N/A';",
  "    const inviteMilOpt = this.noteInviteMil() || 'N/A';\n    const inviteMil = inviteMilOpt === 'oui' ? (this.noteInviteMilTexte() || 'À CONFIRMER') : inviteMilOpt;"
);

code = code.replace(
  "    const dateCourriel = this.noteDateCourrielConfirmation() || '15-06-2026';",
  `    const dateCourriel = this.noteDateCourrielConfirmation() || '${TODAY_STR}';`
);

fs.writeFileSync('src/app.component.ts', code);
console.log("Done");
