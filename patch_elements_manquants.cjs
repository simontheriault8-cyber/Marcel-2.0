const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

// 1. Interface
code = code.replace(
  '  offreDateArriveeUnite?: string;',
  '  offreDateArriveeUnite?: string;\n  offreElementsManquants?: string;\n  offreDateElementsManquants?: string;'
);

// 2. saveState
code = code.replace(
  '      offreDateArriveeUnite: this.offreDateArriveeUnite(),',
  '      offreDateArriveeUnite: this.offreDateArriveeUnite(),\n      offreElementsManquants: this.offreElementsManquants(),\n      offreDateElementsManquants: this.offreDateElementsManquants(),'
);

// 3. loadState
code = code.replace(
  '    this.offreDateArriveeUnite.set(snapshot.offreDateArriveeUnite || \'\');',
  '    this.offreDateArriveeUnite.set(snapshot.offreDateArriveeUnite || \'\');\n    this.offreElementsManquants.set(snapshot.offreElementsManquants || \'Spécimen de chèque\');\n    this.offreDateElementsManquants.set(snapshot.offreDateElementsManquants || \'\');'
);

// 4. Initial state fallback
code = code.replace(
  '      offreDateArriveeUnite: \'\',',
  '      offreDateArriveeUnite: \'\',\n      offreElementsManquants: \'Spécimen de chèque\',\n      offreDateElementsManquants: \'\','
);

// 5. resetDossier
code = code.replace(
  '    this.offreDateArriveeUnite.set(\'\');',
  '    this.offreDateArriveeUnite.set(\'\');\n    this.offreElementsManquants.set(\'Spécimen de chèque\');\n    this.offreDateElementsManquants.set(\'\');'
);

// 6. Signal definition
code = code.replace(
  '  offreDateArriveeUnite = signal<string>(\'\');',
  '  offreDateArriveeUnite = signal<string>(\'\');\n  offreElementsManquants = signal<string>(\'Spécimen de chèque\');\n  offreDateElementsManquants = signal<string>(\'\');'
);

// 7. Add UI below offreDateCoursFin
const targetUi = `                            </app-calendar-picker>
                            <p class="mt-1 text-[11px] text-slate-500">
                              (Optionnel)
                            </p>
                          </div>
                        </div>
                      </div>`;

const replacementUi = `                            </app-calendar-picker>
                            <p class="mt-1 text-[11px] text-slate-500">
                              (Optionnel)
                            </p>
                          </div>
                          <div class="col-span-1 md:col-span-2">
                            <hr class="my-4 border-t border-slate-200" />
                          </div>
                          <div>
                            <app-calendar-picker
                              label="Date limite (Éléments manquants) :"
                              [value]="offreDateElementsManquants()"
                              placeholder="Au plus tard le..."
                              (dateSelected)="offreDateElementsManquants.set($event)"
                              (cleared)="offreDateElementsManquants.set('')"
                            ></app-calendar-picker>
                            <p class="mt-1 text-[11px] text-slate-500">
                              Inséré après « au plus tard le... »
                            </p>
                          </div>
                          <div class="col-span-1 md:col-span-2">
                            <label class="block font-semibold text-slate-700 mb-1">Élément(s) manquant(s) :</label>
                            <textarea
                              rows="4"
                              class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all resize-y"
                              [value]="offreElementsManquants()"
                              (input)="offreElementsManquants.set($any($event.target).value)"
                              placeholder="Spécimen de chèque..."
                            ></textarea>
                            <p class="mt-1 text-[11px] text-slate-500">
                              Appuyez sur Entrée pour ajouter un nouvel élément. Le premier devrait toujours être "Spécimen de chèque".
                            </p>
                          </div>
                        </div>
                      </div>`;

code = code.replace(targetUi, replacementUi);

fs.writeFileSync('src/app.component.ts', code);
console.log('Patched properties and UI');
