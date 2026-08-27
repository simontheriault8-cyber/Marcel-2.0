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

code = code.replace(target, replacement);
fs.writeFileSync('src/app.component.ts', code);
