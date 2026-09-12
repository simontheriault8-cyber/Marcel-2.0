const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const targetHTML = `                              <label class="block font-semibold text-slate-700 mb-1">Durée des études subventionnées :</label>
                              <input
                                type="text"
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all"
                                placeholder="ex: 3 ans"
                                [value]="offreDureeEtudesSubventionnees()"
                                (input)="offreDureeEtudesSubventionnees.set($any($event.target).value)"
                              />`;

const replacementHTML = `                              <label class="block font-semibold text-slate-700 mb-1">Durée des études subventionnées :</label>
                              <select
                                class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800"
                                [value]="offreDureeEtudesSubventionnees()"
                                (change)="offreDureeEtudesSubventionnees.set($any($event.target).value)"
                              >
                                <option value="">-- Sélectionner --</option>
                                <option value="1 an">1 an</option>
                                <option value="2 ans">2 ans</option>
                                <option value="3 ans">3 ans</option>
                                <option value="4 ans">4 ans</option>
                                <option value="5 ans">5 ans</option>
                              </select>`;

code = code.replace(targetHTML, replacementHTML);
fs.writeFileSync('src/app.component.ts', code);
console.log("HTML patched");
