const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const target = `  getFilteredJobsForIndex(index: number): JobEntry[] {
    const query =
      index === 1
        ? this.sharedState.searchDossierQuery1()
        : index === 2
        ? this.sharedState.searchDossierQuery2()
        : this.sharedState.searchDossierQuery3();

    if (!query || query.trim() === "") {
      return this.jobService.getAllJobs();
    }
    return this.jobService.searchJobs(query);
  }`;

const replacement = `  getFilteredJobsForIndex(index: number): JobEntry[] {
    const query =
      index === 1
        ? this.sharedState.searchDossierQuery1()
        : index === 2
        ? this.sharedState.searchDossierQuery2()
        : this.sharedState.searchDossierQuery3();

    let jobs = (!query || query.trim() === "") 
      ? this.jobService.getAllJobs()
      : this.jobService.searchJobs(query);

    if (this.sharedState.isPostulantPfor()) {
      jobs = jobs.filter(j => j.category === 'officier');
    }

    return jobs;
  }`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/app.component.ts', code);
  console.log("Success getFilteredJobsForIndex");
} else {
  console.log("Target not found getFilteredJobsForIndex");
}

const target2 = `              <button
                (click)="switchRole()"
                class="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Revenir à la page de sélection de rôle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span>Changer de rôle</span>
              </button>
            </div>

            <!-- 3 Columns for 3 Jobs -->`;

const replacement2 = `              <div class="flex items-center gap-3">
                <label class="flex items-center gap-1.5 cursor-pointer text-[11px] font-bold text-slate-700 select-none">
                  <input
                    type="checkbox"
                    [checked]="sharedState.isPostulantPfor()"
                    (change)="sharedState.isPostulantPfor.set(!sharedState.isPostulantPfor())"
                    class="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span>Postulant PFOR</span>
                </label>
                <button
                  (click)="switchRole()"
                  class="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="Revenir à la page de sélection de rôle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>Changer de rôle</span>
                </button>
              </div>
            </div>

            <!-- 3 Columns for 3 Jobs -->`;

if (code.includes(target2)) {
  code = code.replace(target2, replacement2);
  fs.writeFileSync('src/app.component.ts', code);
  console.log("Success checkbox");
} else {
  console.log("Target not found checkbox");
}
