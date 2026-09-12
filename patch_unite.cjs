const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const UNITES_DATA = `
export interface UniteAffectation {
  id: string;
  nom: string;
  adresseHtml: string;
  adressePlain: string;
}

export const UNITES_AFFECTATION: UniteAffectation[] = [
  {
    id: "st-jean",
    nom: "St-Jean sur richelieu",
    adresseHtml: "ÉCOLE DE LEADERSHIP ET DE RECRUES DES FORCES CANADIENNES<br>CP 100 SUCC BUREAU-CHEF<br>RICHELAIN QC J0J 1R0",
    adressePlain: "ÉCOLE DE LEADERSHIP ET DE RECRUES DES FORCES CANADIENNES\\nCP 100 SUCC BUREAU-CHEF\\nRICHELAIN QC J0J 1R0"
  },
  {
    id: "valcartier",
    nom: "Valcartier",
    adresseHtml: "DETACHEMENT VALCARTIER QUARTIER GENERAL DE LA 2E DIVISION DU CANADA<br>CP 1000 SUCC FORCES<br>COURCELETTE QC G0A 4Z0",
    adressePlain: "DETACHEMENT VALCARTIER QUARTIER GENERAL DE LA 2E DIVISION DU CANADA\\nCP 1000 SUCC FORCES\\nCOURCELETTE QC G0A 4Z0"
  },
  {
    id: "borden",
    nom: "Borden",
    adresseHtml: "BASE DES FORCES CANADIENNES BORDEN<br>CP 1000 SUCC MAIN<br>BORDEN ON L0M 1C0",
    adressePlain: "BASE DES FORCES CANADIENNES BORDEN\\nCP 1000 SUCC MAIN\\nBORDEN ON L0M 1C0"
  },
  {
    id: "bagotville",
    nom: "Bagotville",
    adresseHtml: "BASE DES FORCES CANADIENNES BAGOTVILLE<br>CP 5000 SUCC BUREAU-CHEF<br>ALOUETTE QC G0V 1A0",
    adressePlain: "BASE DES FORCES CANADIENNES BAGOTVILLE\\nCP 5000 SUCC BUREAU-CHEF\\nALOUETTE QC G0V 1A0"
  },
  {
    id: "gagetown",
    nom: "Gagetown",
    adresseHtml: "BASE DE SOUTIEN DE LA 5E DIVISION DU CANADA GAGETOWN<br>CP 17000 SUCC FORCES<br>OROMOCTO NB E2V 4J5",
    adressePlain: "BASE DE SOUTIEN DE LA 5E DIVISION DU CANADA GAGETOWN\\nCP 17000 SUCC FORCES\\nOROMOCTO NB E2V 4J5"
  }
];
`;

if (!code.includes('export interface UniteAffectation')) {
  code = code.replace(
    'import { FormsModule } from "@angular/forms";',
    'import { FormsModule } from "@angular/forms";\n' + UNITES_DATA
  );
}

// Add state property to RoleSnapshot
code = code.replace(
  '  offreLieuVille?: string;',
  '  offreLieuVille?: string;\n  offreUniteAffectation?: string;'
);

// getSnapshot
code = code.replace(
  '      offreLieuVille: this.offreLieuVille(),',
  '      offreLieuVille: this.offreLieuVille(),\n      offreUniteAffectation: this.offreUniteAffectation(),'
);

// applySnapshot
code = code.replace(
  "    this.offreLieuVille.set(snapshot.offreLieuVille || 'Québec');",
  "    this.offreLieuVille.set(snapshot.offreLieuVille || 'Québec');\n    this.offreUniteAffectation.set(snapshot.offreUniteAffectation || 'st-jean');"
);

// resetState
code = code.replace(
  "      offreLieuVille: 'Québec',",
  "      offreLieuVille: 'Québec',\n      offreUniteAffectation: 'st-jean',"
);
code = code.replace(
  "    this.offreLieuVille.set('Québec');",
  "    this.offreLieuVille.set('Québec');\n    this.offreUniteAffectation.set('st-jean');"
);

// Declare signal
code = code.replace(
  "  offreLieuVille = signal<string>('Québec');",
  "  offreLieuVille = signal<string>('Québec');\n  offreUniteAffectation = signal<string>('st-jean');\n  readonly unitesAffectation = UNITES_AFFECTATION;"
);

// HTML Template
const oldHtml = `                          <div class="md:col-span-2">
                            <label class="block font-semibold text-slate-700 mb-1 text-xs">Lieu de l'enrôlement :</label>
                            <select
                              class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                              [value]="offreLieuVille()"
                              (change)="onOffreLieuVilleChange($any($event.target).value)"
                            >
                              @for (center of recruitmentCentersList; track center.city) {
                                <option [value]="center.city">{{ center.city }} : {{ center.name }}</option>
                              }
                            </select>
                          </div>`;
const newHtml = `                          <div class="md:col-span-2">
                            <label class="block font-semibold text-slate-700 mb-1 text-xs">Lieu de l'enrôlement :</label>
                            <select
                              class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                              [value]="offreLieuVille()"
                              (change)="onOffreLieuVilleChange($any($event.target).value)"
                            >
                              @for (center of recruitmentCentersList; track center.city) {
                                <option [value]="center.city">{{ center.city }} : {{ center.name }}</option>
                              }
                            </select>
                          </div>

                          <div class="md:col-span-2">
                            <label class="block font-semibold text-slate-700 mb-1 text-xs">Unité d'affectation :</label>
                            <select
                              class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                              [value]="offreUniteAffectation()"
                              (change)="offreUniteAffectation.set($any($event.target).value)"
                            >
                              @for (unite of unitesAffectation; track unite.id) {
                                <option [value]="unite.id">{{ unite.nom }}</option>
                              }
                            </select>
                          </div>`;

code = code.replace(oldHtml, newHtml);

fs.writeFileSync('src/app.component.ts', code);
console.log("Done adding UI and state");
