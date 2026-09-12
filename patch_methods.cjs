const fs = require('fs');
let code = fs.readFileSync('src/app.component.ts', 'utf8');

const targetToggle = `  toggleOffreEtudesSubventionnees() {
    const nextVal = !this.offreEtudesSubventionneesChecked();
    if (nextVal) {
      this.offreNormaleChecked.set(false);
      if (this.offreDateArriveeUnite() === '2026 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2025 au plus tard 16h00');
      }
    }
    this.offreEtudesSubventionneesChecked.set(nextVal);
  }`;

const replacementToggle = `  toggleOffreEtudesSubventionnees() {
    const nextVal = !this.offreEtudesSubventionneesChecked();
    if (nextVal) {
      this.offreNormaleChecked.set(false);
      if (this.offreDateArriveeUnite() === '2026 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2025 au plus tard 16h00');
      }
      
      const metierText = this.offreMetier();
      const match = metierText.match(/^(\\d{5})/);
      if (match) {
        const jobId = match[1];
        const job = this.jobService.getJobById(jobId);
        if (job && job.contracts) {
          const pfor = job.contracts.find(c => c.program.toUpperCase() === 'PFOR');
          if (pfor) {
            this.offreDureeContrat.set(pfor.duration);
          }
        }
      }
    }
    this.offreEtudesSubventionneesChecked.set(nextVal);
  }`;

code = code.replace(targetToggle, replacementToggle);

const targetSelect = `  selectOffreMetier(job: JobEntry) {
    const text = \`\${job.id} - \${job.title}\`;
    this.offreMetier.set(text);
    this.offreMetierSearchQuery.set(text);
    this.offreMetierDropdownOpen.set(false);

    // Automatic element selection
    const element = job.element || this.jobService.getJobElement(job.id);
    if (element && element !== 'CMP') {
      this.offreElement.set(element);
    } else if (element === 'CMP') {
      // For CMP, applicant chooses element: user will select manually
      this.offreElement.set('');
    }

    // Validate whether currently selected programme is still valid for this job category
    const validProgs = this.jobService.getProgramsForJobType(job.category || (this.jobService.isOfficerJob(job.id) ? 'officier' : 'mr'));
    if (this.offreProgrammeEnrolement() && !validProgs.includes(this.offreProgrammeEnrolement())) {
      this.offreProgrammeEnrolement.set('');
    }
  }`;

const replacementSelect = `  selectOffreMetier(job: JobEntry) {
    const text = \`\${job.id} - \${job.title}\`;
    this.offreMetier.set(text);
    this.offreMetierSearchQuery.set(text);
    this.offreMetierDropdownOpen.set(false);

    // Automatic element selection
    const element = job.element || this.jobService.getJobElement(job.id);
    if (element && element !== 'CMP') {
      this.offreElement.set(element);
    } else if (element === 'CMP') {
      // For CMP, applicant chooses element: user will select manually
      this.offreElement.set('');
    }

    // Validate whether currently selected programme is still valid for this job category
    const validProgs = this.jobService.getProgramsForJobType(job.category || (this.jobService.isOfficerJob(job.id) ? 'officier' : 'mr'));
    if (this.offreProgrammeEnrolement() && !validProgs.includes(this.offreProgrammeEnrolement())) {
      this.offreProgrammeEnrolement.set('');
    }
    
    // Auto-fill PFOR contract duration if Subsidized Studies is checked
    if (this.offreEtudesSubventionneesChecked() && job.contracts) {
      const pfor = job.contracts.find(c => c.program.toUpperCase() === 'PFOR');
      if (pfor) {
        this.offreDureeContrat.set(pfor.duration);
      }
    }
  }`;

code = code.replace(targetSelect, replacementSelect);

fs.writeFileSync('src/app.component.ts', code);
console.log("Methods patched");
