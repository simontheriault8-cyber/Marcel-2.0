const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const target = `                  } @else if (task.nameFr === "Offre OTA") {
                    <!-- Offre OTA empty panel placeholder -->
                    <div class="mb-6 p-8 text-center bg-white rounded-xl border border-slate-200 shadow-sm text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <p class="font-bold text-sm text-slate-700">Offre OTA</p>
                      <p class="text-xs text-slate-400 mt-1">Section sous construction pour le moment.</p>
                    </div>`;

code = code.replace(target, '');
fs.writeFileSync('src/app.component.ts', code);
console.log("Patched");
