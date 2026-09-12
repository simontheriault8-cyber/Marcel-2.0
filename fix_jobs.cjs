const fs = require('fs');
let code = fs.readFileSync('src/services/job-database.service.ts', 'utf8');

// First remove the multiple additions:
code = code.replace(/  getJobById\(jobId: string\): JobEntry \| undefined \{ \n    const paddedId = jobId\.padStart\(5, "0"\); \n    return this\.jobs\.find\(j => j\.id === paddedId\); \n  \}\n/g, '');

// Then add it correctly just once after isOfficerJob:
const target = `  isOfficerJob(jobId: string): boolean {
    return this.OFFICER_JOBS.has(jobId);
  }`;
const replacement = `  isOfficerJob(jobId: string): boolean {
    return this.OFFICER_JOBS.has(jobId);
  }

  getJobById(jobId: string): JobEntry | undefined {
    const paddedId = jobId.padStart(5, "0");
    return this.jobs.find(j => j.id === paddedId);
  }`;
code = code.replace(target, replacement);

fs.writeFileSync('src/services/job-database.service.ts', code);
console.log("Fixed");
