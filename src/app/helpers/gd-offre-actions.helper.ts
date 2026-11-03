import { JobEntry, RecruitmentCenter } from "../../services/jobs-data";
import { UnitSession } from "../data/units.data";
import { CourseSession } from "../data/course-sessions.data";
import { EmailScenario } from "../../services/email-scenarios.service";
import { getTodayDateString } from "../models/app-role-snapshot.models";

export function getEnfantYears(this: any): string[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear - 18; y <= currentYear; y++) {
      years.push(y.toString());
    }
    return years.reverse(); // Newest first
  }

export function onEnfantCountChange(this: any, count: string) {
    const num = parseInt(count, 10);
    if (!isNaN(num) && num >= 0 && num <= 20) {
      this.noteEnfantCount.set(count);
      const currentDetails = this.noteEnfantDetails();
      const newDetails = [];
      const years = this.getEnfantYears();
      const defaultYear = years.length > 0 ? years[0] : '';
      for (let i = 0; i < num; i++) {
        if (i < currentDetails.length) {
          newDetails.push(currentDetails[i]);
        } else {
          newDetails.push({ sex: 'M', year: defaultYear });
        }
      }
      this.noteEnfantDetails.set(newDetails);
    } else if (count === '') {
      this.noteEnfantCount.set('');
      this.noteEnfantDetails.set([]);
    }
    this.autoActivateOffreEmail();
  }

export function updateEnfantDetail(this: any, index: number, field: 'sex' | 'year', value: string) {
    const details = [...this.noteEnfantDetails()];
    if (details[index]) {
      details[index] = { ...details[index], [field]: value };
      this.noteEnfantDetails.set(details);
      this.autoActivateOffreEmail();
    }
  }

export function getUniteAffectationObj(this: any) {
    const target = this.offreUniteAffectation();
    const session = this.unitesAffectation.find(u => u.id === target || u.uic === target)
      || (target === 'st-jean' ? this.unitesAffectation.find(u => u.id === '3613' || u.uic === '3613') : null)
      || this.unitesAffectation.find(u => u.id === '3613')
      || this.unitesAffectation[0];
    if (!session) return { nom: 'N/A', adressePlain: '', adresseHtml: '', uic: '' };
    
    let displayNom = session.officialName;
    if (session.id === '3613' || session.uic === '3613' || target === 'st-jean') {
      displayNom = 'ÉCOLE DE LEADERSHIP ET DE RECRUES DES FORCES CANADIENNES';
    }

    return {
      nom: displayNom,
      adressePlain: session.addressPlain,
      adresseHtml: session.addressHtml,
      uic: session.uic || session.id
    };
  }

export function isUic3613Selected(this: any): boolean {
    const unitObj = this.getUniteAffectationObj();
    return unitObj.uic === '3613' || this.offreUniteAffectation() === '3613' || this.offreUniteAffectation() === 'st-jean';
  }

export function copyNoteToClipboard(this: any) {
    const note = this.getOfferFormattedNote();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(note);
    }
    this.copiedNoteNotification.set(true);
    setTimeout(() => this.copiedNoteNotification.set(false), 2000);
  }

export function onOffreHeurePostulantChange(this: any, val: string) {
    this.offreHeureArriveePostulant.set(val);
    try {
      localStorage.setItem('offre_heure_postulant', val);
    } catch {}
    this.autoActivateOffreEmail();
  }

export function onOffreHeureInvitesChange(this: any, val: string) {
    this.offreHeureArriveeInvites.set(val);
    try {
      localStorage.setItem('offre_heure_invites', val);
    } catch {}
    this.autoActivateOffreEmail();
  }

export function onNoteConjointTexteInput(this: any, val: string) {
    this.noteConjointTexte.set(val);
    this.autoActivateOffreEmail();
  }

export function onOffreLieuVilleChange(this: any, city: string) {
    this.offreLieuVille.set(city);
    const center = this.recruitmentCentersList.find(c => c.city === city);
    if (center) {
      this.offreLieuEnrolement.set(center.fullFr);
      if (this.evaluationMedicaleType() !== 'Dossier OTA') {
        try {
          localStorage.setItem('offre_lieu_ville', city);
          localStorage.setItem('offre_lieu_enrolement', center.fullFr);
        } catch {}
      }
    }
    this.autoActivateOffreEmail();
  }

export function getSelectedRecruitmentCenter(this: any): RecruitmentCenter {
    return this.recruitmentCentersList.find(c => c.city === this.offreLieuVille()) || this.recruitmentCentersList[0];
  }

export function getFilteredJobsForOffre(this: any): JobEntry[] {
    const query = this.offreMetierSearchQuery();
    if (!query || query.trim() === "") {
      return this.jobService.getAllJobs();
    }
    return this.jobService.searchJobs(query);
  }

export function selectOffreMetier(this: any, job: JobEntry) {
    const isEn = this.i18n ? this.i18n.currentLang() === 'en' : false;
    const title = isEn && job.titleEn ? job.titleEn : job.title;
    const text = `${job.id} - ${title}`;
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
    this.autoActivateOffreEmail();
  }

export function onOffreMetierQueryChange(this: any, val: string) {
    this.offreMetierSearchQuery.set(val);
    this.offreMetier.set(val);
    this.offreMetierDropdownOpen.set(true);

    const detectedElem = this.jobService.detectJobElement(val);
    if (detectedElem && detectedElem !== 'CMP') {
      this.offreElement.set(detectedElem);
    } else if (detectedElem === 'CMP') {
      this.offreElement.set('');
    }

    const detectedType = this.jobService.detectJobType(val);
    const validProgs = this.jobService.getProgramsForJobType(detectedType);
    if (this.offreProgrammeEnrolement() && !validProgs.includes(this.offreProgrammeEnrolement())) {
      this.offreProgrammeEnrolement.set('');
    }
    if (val && val.trim().length > 0) {
      this.autoActivateOffreEmail();
    }
  }

export function clearOffreMetier(this: any, event?: Event) {
    if (event) event.stopPropagation();
    this.offreMetier.set('');
    this.offreMetierSearchQuery.set('');
    this.offreElement.set('');
  }

export function closeOffreMetierDropdownDelayed(this: any) {
    setTimeout(() => {
      this.offreMetierDropdownOpen.set(false);
    }, 200);
  }

export function clearOtherGdEmails(this: any, except: 'premierContact' | 'medical1' | 'medical2' | 'medical1et2' | 'avisFermeture' | 'annexeQ' | 'offreNormale' | 'offreEtudes' | 'rappelCeremonie') {
    if (except !== 'premierContact') this.premierContactCourriel.set(false);
    if (except !== 'medical1') this.evaluationMedicalePartie1.set(false);
    if (except !== 'medical2') this.evaluationMedicalePartie2.set(false);
    if (except !== 'medical1et2') this.evaluationMedicalePartie1Et2.set(false);
    if (except !== 'avisFermeture') this.avisFermetureCourriel.set(false);
    if (except !== 'annexeQ') this.annexeQCourriel.set(false);
    if (except !== 'offreNormale') this.offreNormaleChecked.set(false);
    if (except !== 'offreEtudes') this.offreEtudesSubventionneesChecked.set(false);
    if (except !== 'rappelCeremonie') {
      this.rappelCeremonieChecked.set(false);
      this.rappelCeremonieRalliementChecked.set(false);
    }
  }

export function togglePremierContactCourriel(this: any) {
    const nextVal = !this.premierContactCourriel();
    if (nextVal) {
      this.clearOtherGdEmails('premierContact');
    }
    this.premierContactCourriel.set(nextVal);
  }

export function togglePremierContactTask(this: any, type: 'medical' | 'entrevue' | 'gambit' | 'psps' | 'selfie' | 'iptad' | 'seaf') {
    let nextVal = false;
    if (type === 'medical') {
      nextVal = !this.premierContactMedical();
      this.premierContactMedical.set(nextVal);
    } else if (type === 'entrevue') {
      nextVal = !this.premierContactEntrevue();
      this.premierContactEntrevue.set(nextVal);
    } else if (type === 'gambit') {
      nextVal = !this.premierContactGambit();
      this.premierContactGambit.set(nextVal);
    } else if (type === 'psps') {
      nextVal = !this.premierContactPsps();
      this.premierContactPsps.set(nextVal);
    } else if (type === 'selfie') {
      nextVal = !this.premierContactSelfie();
      this.premierContactSelfie.set(nextVal);
    } else if (type === 'iptad') {
      nextVal = !this.premierContactIptad();
      this.premierContactIptad.set(nextVal);
    } else if (type === 'seaf') {
      nextVal = !this.premierContactSeaf();
      this.premierContactSeaf.set(nextVal);
    }

    if (nextVal || this.premierContactMedical() || this.premierContactEntrevue() || this.premierContactGambit() || this.premierContactPsps() || this.premierContactSelfie() || this.premierContactIptad() || this.premierContactSeaf()) {
      this.clearOtherGdEmails('premierContact');
      this.premierContactCourriel.set(true);
    }
  }

export function toggleEvaluationMedicalePartie1(this: any) {
    const nextVal = !this.evaluationMedicalePartie1();
    if (nextVal) {
      this.clearOtherGdEmails('medical1');
    }
    this.evaluationMedicalePartie1.set(nextVal);
  }

export function toggleEvaluationMedicalePartie2(this: any) {
    const nextVal = !this.evaluationMedicalePartie2();
    if (nextVal) {
      this.clearOtherGdEmails('medical2');
    }
    this.evaluationMedicalePartie2.set(nextVal);
  }

export function toggleEvaluationMedicalePartie1Et2(this: any) {
    const nextVal = !this.evaluationMedicalePartie1Et2();
    if (nextVal) {
      this.clearOtherGdEmails('medical1et2');
    }
    this.evaluationMedicalePartie1Et2.set(nextVal);
  }

export function toggleAvisFermetureCourriel(this: any) {
    const nextVal = !this.avisFermetureCourriel();
    if (nextVal) {
      this.clearOtherGdEmails('avisFermeture');
    }
    this.avisFermetureCourriel.set(nextVal);
  }

export function onAvisFermetureDelaiChange(this: any, val: string) {
    this.avisFermetureDelaiJours.set(val);
    this.clearOtherGdEmails('avisFermeture');
    this.avisFermetureCourriel.set(true);
  }

export function onAvisFermetureDateChange(this: any, val: string) {
    this.avisFermetureDate.set(val);
    if (val) {
      this.clearOtherGdEmails('avisFermeture');
      this.avisFermetureCourriel.set(true);
    }
  }

export function toggleAvisFermetureTask(this: any, type: 'entrevue' | 'medicale' | 'gambit' | 'psps') {
    let nextVal = false;
    if (type === 'entrevue') {
      nextVal = !this.avisFermetureEntrevue();
      this.avisFermetureEntrevue.set(nextVal);
    } else if (type === 'medicale') {
      nextVal = !this.avisFermetureMedicale();
      this.avisFermetureMedicale.set(nextVal);
    } else if (type === 'gambit') {
      nextVal = !this.avisFermetureGambit();
      this.avisFermetureGambit.set(nextVal);
    } else if (type === 'psps') {
      nextVal = !this.avisFermeturePsps();
      this.avisFermeturePsps.set(nextVal);
    }

    if (nextVal || this.avisFermetureEntrevue() || this.avisFermetureMedicale() || this.avisFermetureGambit() || this.avisFermeturePsps()) {
      this.clearOtherGdEmails('avisFermeture');
      this.avisFermetureCourriel.set(true);
    }
  }

export function toggleAnnexeQCourriel(this: any) {
    const nextVal = !this.annexeQCourriel();
    if (nextVal) {
      this.clearOtherGdEmails('annexeQ');
    }
    this.annexeQCourriel.set(nextVal);
  }

export function onAnnexeQAlphaChange(this: any, val: string) {
    this.annexeQAlphaPostulant.set(val);
    if (val && val.trim().length > 0) {
      this.clearOtherGdEmails('annexeQ');
      this.annexeQCourriel.set(true);
    }
  }

export function onPforMatriculeChange(this: any, val: string) {
    this.pforMatricule.set(val);
  }

export function getFormattedPforMatricule(this: any): string {
    let raw = this.pforMatricule()?.trim() || '';
    if (raw) {
      if (raw.startsWith('(') && raw.endsWith(')')) {
        raw = raw.substring(1, raw.length - 1).trim();
      }
      return raw || '(xxxxxxxxx)';
    }
    return '(xxxxxxxxx)';
  }

export function autoActivateOffreEmail(this: any) {
    const isSub = this.selectedTask()?.nameFr.toLowerCase().includes('subventionn') || false;
    if (isSub) {
      if (!this.offreEtudesSubventionneesChecked()) {
        this.clearOtherGdEmails('offreEtudes');
        this.offreEtudesSubventionneesChecked.set(true);
        if (this.offreDateArriveeUnite() === '2026 au plus tard 16h00') {
          this.offreDateArriveeUnite.set('2025 au plus tard 16h00');
        }
      }
    } else {
      if (!this.offreNormaleChecked()) {
        this.clearOtherGdEmails('offreNormale');
        this.offreNormaleChecked.set(true);
        if (this.offreDateArriveeUnite() === '2025 au plus tard 16h00') {
          this.offreDateArriveeUnite.set('2026 au plus tard 16h00');
        }
      }
    }
  }

export function setOffreProgrammeEnrolement(this: any, val: string) {
    this.offreProgrammeEnrolement.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function setOffreElement(this: any, val: string) {
    this.offreElement.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function setOffreDureeContrat(this: any, val: string) {
    this.offreDureeContrat.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

export function setOffreEtudesSubventionnees(this: any, val: string) {
    this.offreEtudesSubventionnees.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

export function setOffreDureeEtudesSubventionnees(this: any, val: string) {
    this.offreDureeEtudesSubventionnees.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function setOffreDateEnrolement(this: any, val: string) {
    this.offreDateEnrolement.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function setOffreDateArriveeUnite(this: any, val: string) {
    this.offreDateArriveeUnite.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function setOffreUniteAffectation(this: any, val: string) {
    this.offreUniteAffectation.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function setOffreUniteAffectationObj(this: any, unit: UnitSession) {
    this.offreUniteAffectation.set(unit.id);
    this.autoActivateOffreEmail();
  }

export function setCourseSession(this: any, session: CourseSession) {
    this.offreSerieCours.set(session.serie);
    this.offreDateCoursDebut.set(session.dateDebut);
    this.offreDateCoursFin.set(session.dateFin);
    this.autoActivateOffreEmail();
  }

export function clearCourseSession(this: any) {
    this.offreSerieCours.set('');
    this.offreDateCoursDebut.set('');
    this.offreDateCoursFin.set('');
  }

export function setOffreDateCoursDebut(this: any, val: string) {
    this.offreDateCoursDebut.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function setOffreDateCoursFin(this: any, val: string) {
    this.offreDateCoursFin.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function setOffreDateElementsManquants(this: any, val: string) {
    this.offreDateElementsManquants.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function setOffreElementsManquants(this: any, val: string) {
    this.offreElementsManquants.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

export function setNoteStatutCivil(this: any, val: string) {
    this.noteStatutCivil.set(val);
    this.autoActivateOffreEmail();
  }

export function setNoteConjoint(this: any, val: string) {
    this.noteConjoint.set(val);
    this.autoActivateOffreEmail();
  }

export function setNotePlaqueImm(this: any, val: string) {
    this.notePlaqueImm.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

export function setNoteBrisBail(this: any, val: string) {
    this.noteBrisBail.set(val);
    this.autoActivateOffreEmail();
  }

export function setNoteEntreposage(this: any, val: string) {
    this.noteEntreposage.set(val);
    this.autoActivateOffreEmail();
  }

export function setNoteSermentDeclaration(this: any, val: string) {
    this.noteSermentDeclaration.set(val);
    this.autoActivateOffreEmail();
  }

export function setNoteInviteMil(this: any, val: string) {
    this.noteInviteMil.set(val);
    this.autoActivateOffreEmail();
  }

export function setNoteInviteMilTexte(this: any, val: string) {
    this.noteInviteMilTexte.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

export function setNoteSvcMilAnt(this: any, val: string) {
    this.noteSvcMilAnt.set(val);
    this.autoActivateOffreEmail();
  }

export function setNoteBeneficiaire(this: any, val: string) {
    this.noteBeneficiaire.set(val);
    if (val && val.trim().length > 0) this.autoActivateOffreEmail();
  }

export function setNoteDateCourrielConfirmation(this: any, val: string) {
    this.noteDateCourrielConfirmation.set(val);
    if (val) this.autoActivateOffreEmail();
  }

export function onRappelCeremonieDateSelected(this: any, date: string) {
    this.rappelCeremonieDate.set(date);
    if (date) {
      this.clearOtherGdEmails('rappelCeremonie');
      this.rappelCeremonieChecked.set(true);
    }
  }

export function onRappelCeremonieHeurePostulantChange(this: any, val: string) {
    this.rappelCeremonieHeurePostulant.set(val);
    try {
      localStorage.setItem('rappel_heure_postulant', val);
    } catch {}
    this.clearOtherGdEmails('rappelCeremonie');
    this.rappelCeremonieChecked.set(true);
  }

export function onRappelCeremonieHeureInvitesChange(this: any, val: string) {
    this.rappelCeremonieHeureInvites.set(val);
    try {
      localStorage.setItem('rappel_heure_invites', val);
    } catch {}
    this.clearOtherGdEmails('rappelCeremonie');
    this.rappelCeremonieChecked.set(true);
  }

export function onRappelCeremonieLieuChange(this: any, val: string) {
    this.rappelCeremonieLieu.set(val);
    this.clearOtherGdEmails('rappelCeremonie');
    this.rappelCeremonieChecked.set(true);
  }

export function toggleOffreNormale(this: any) {
    const nextVal = !this.offreNormaleChecked();
    if (nextVal) {
      this.clearOtherGdEmails('offreNormale');
      if (this.offreDateArriveeUnite() === '2025 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2026 au plus tard 16h00');
      }
    }
    this.offreNormaleChecked.set(nextVal);
  }

export function toggleOffreEtudesSubventionnees(this: any) {
    const nextVal = !this.offreEtudesSubventionneesChecked();
    if (nextVal) {
      this.clearOtherGdEmails('offreEtudes');
      if (this.offreDateArriveeUnite() === '2026 au plus tard 16h00') {
        this.offreDateArriveeUnite.set('2025 au plus tard 16h00');
      }
      
      const metierText = this.offreMetier();
      const match = metierText.match(/^(\d{5})/);
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
  }

export function toggleRappelCeremonie(this: any) {
    const nextVal = !this.rappelCeremonieChecked();
    if (nextVal) {
      this.clearOtherGdEmails('rappelCeremonie');
    } else {
      this.rappelCeremonieRalliementChecked.set(false);
    }
    this.rappelCeremonieChecked.set(nextVal);
  }

export function toggleRappelCeremonieRalliement(this: any) {
    const nextVal = !this.rappelCeremonieRalliementChecked();
    if (nextVal) {
      this.clearOtherGdEmails('rappelCeremonie');
      this.rappelCeremonieChecked.set(true);
    }
    this.rappelCeremonieRalliementChecked.set(nextVal);
  }

export function computeActiveEmailScenario(this: any): EmailScenario | null {
    if (this.selectedEmailBankTemplate() === "verification_edo_vs_pfor") {
      return this.emailScenariosService.getScenario("verification_edo_vs_pfor") || null;
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_age_57") {
      return this.emailScenariosService.getScenario("inadmissibilite_age_57") || null;
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_pr_3ans") {
      return this.emailScenariosService.getScenario("inadmissibilite_pr_3ans") || null;
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_non_citoyen_ni_pr") {
      return this.emailScenariosService.getScenario("inadmissibilite_non_citoyen_ni_pr") || null;
    }
    if (this.selectedEmailBankTemplate() === "inadmissibilite_scolarite") {
      return this.emailScenariosService.getScenario("inadmissibilite_scolarite") || null;
    }
    if (this.selectedEmailBankTemplate() === "verification_depot_releves_cmr") {
      return this.emailScenariosService.getScenario("verification_depot_releves_cmr") || null;
    }

    if (
      this.forceGeneralReminder() &&
      this.selectedRejectionKeys().size === 0
    ) {
      return this.emailScenariosService.getScenario("general_reminder") || null;
    }

    const keysArray = Array.from(this.selectedRejectionKeys()) as string[];

    // Trigger for "File Closed due to Basic Academic Criteria"
    const fileClosedAcademics = keysArray.some((k) =>
      k.includes("educ_non_admissible"),
    );
    if (fileClosedAcademics) {
      return (
        this.emailScenariosService.getScenario("educ_non_admissible") || null
      );
    }

    // Trigger for "Parental Consent Required"
    // Checks for 'naiss_parents' (Birth Cert) OR 'emp_nom_parent' (Now in Consent Task)
    const needsParentalConsent = keysArray.some(
      (k) => k.includes("naiss_parents") || k.includes("emp_nom_parent"),
    );

    if (needsParentalConsent) {
      return (
        this.emailScenariosService.getScenario("parental_consent_required") ||
        null
      );
    }

    return null;
  }

