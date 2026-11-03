import {
  Component,
  computed,
  inject,
  signal,
  ViewChild,
  effect,
  untracked,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {
  RecruitmentDataService,
  Task,
  DocumentItem,
  RejectionReason,
} from "./services/recruitment-data.service";
import {
  EmailScenariosService,
  EmailScenario,
} from "./services/email-scenarios.service";
import { JobSearchModalComponent } from "./app/components/job-search-modal.component";
import { CalendarPickerComponent } from "./app/components/calendar-picker.component";
import { CourseSeriesPickerComponent } from "./app/components/course-series-picker.component";
import { UnitPickerComponent } from "./app/components/unit-picker.component";
import { TutoMarcelComponent } from "./app/components/tuto-marcel.component";
import { UnitSession, UNITS_LIST } from "./app/data/units.data";
import { CourseSession } from "./app/data/course-sessions.data";
import { JOB_URLS } from "./app/data/job-urls.data";
import { SharedStateService, DEFAULT_SIG_FR, DEFAULT_SIG_EN, DEFAULT_SIG_OTA_FR, DEFAULT_SIG_OTA_EN } from "./services/shared-state.service";
import { JobDatabaseService } from "./services/job-database.service";
import { MelService } from "./services/mel.service";
import { ReorientationCriteriaService } from "./services/reorientation-criteria.service";
import { JobEntry, JobCategory, MilitaryElement, RecruitmentCenter, RECRUITMENT_CENTERS, ENROLMENT_HOURS } from "./services/jobs-data";
import { FormsModule } from "@angular/forms";

import { UniteAffectation, UNITES_AFFECTATION, AppStage, RoleSnapshot, getTodayDateString } from "./app/models/app-role-snapshot.models";
export type { UniteAffectation };
export { UNITES_AFFECTATION };
import * as GdContactMedicalGen from "./app/generators/gd-contact-medical.generator";
import * as RoleSnapshotHelper from "./app/helpers/role-snapshot.helper";
import * as DossierDocsHelper from "./app/helpers/dossier-additional-docs.helper";
import * as VerifNotesGen from "./app/generators/verification-notes.generator";
import * as CompliantEmailGen from "./app/generators/compliant-dossier-email.generator";
import * as OffreEnrolementGen from "./app/generators/offre-enrolement.generator";
import * as GdEmailBankGen from "./app/generators/gd-email-bank-ceremonie.generator";
import * as TaskRejectionsGen from "./app/generators/task-rejections-combined.generator";
import { APP_COMPONENT_TEMPLATE } from "./app/templates/app.template";
import * as TaskComplianceHelper from "./app/helpers/task-compliance-state.helper";
import * as GdOffreActionsHelper from "./app/helpers/gd-offre-actions.helper";
import { TranslationService } from "./app/i18n";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, JobSearchModalComponent, CalendarPickerComponent, CourseSeriesPickerComponent, UnitPickerComponent, TutoMarcelComponent, FormsModule],
  template: APP_COMPONENT_TEMPLATE,
  host: { '(document:click)': 'onDocumentClick($event)' },
  styles: [],
})
export class AppComponent implements OnInit {
  private dataService = inject(RecruitmentDataService);
  private emailScenariosService = inject(EmailScenariosService);
  private sanitizer = inject(DomSanitizer);
  public sharedState = inject(SharedStateService);
  public jobService = inject(JobDatabaseService);
  public melService = inject(MelService);
  public reorientationCriteria = inject(ReorientationCriteriaService);
  public i18n = inject(TranslationService);

  // Dossier Jobs Panel Dropdown States
  dossierDropdownOpen1 = signal<boolean>(false);
  dossierDropdownOpen2 = signal<boolean>(false);
  dossierDropdownOpen3 = signal<boolean>(false);

  // Premier Contact State
  premierContactSubPanelMode = signal<'courriel' | 'note'>('courriel');
  readonly premierContactIptadOptions: string[] = ['Complété', 'À faire', 'Attribué'];
  readonly premierContactSeafOptions: string[] = ['Complété', 'Attribué'];
  readonly premierContactEntrevueOptions: string[] = ['À faire', 'Complété', 'Attribué'];
  readonly premierContactMedicalOptions: string[] = ['À faire', 'Complété', 'Attribué'];
  readonly premierContactPspsOptions: string[] = ['À faire', 'Complété', 'Initié'];
  readonly premierContactGambitOptions: string[] = ['En attente (type 28)', 'En attente (dossier soumis)', 'Concluant favorable', 'Concluant défavorable', 'Non Concluant'];
  readonly premierContactAnxQOptions: string[] = ['À faire', 'Complété'];

  premierContactNoteIptad = signal<string>('Complété');
  premierContactNoteSeaf = signal<string>('Complété');
  premierContactNoteEntrevue = signal<string>('À faire');
  premierContactNoteMedical = signal<string>('À faire');
  premierContactNotePsps = signal<string>('À faire');
  premierContactNoteGambit = signal<string>('En attente (type 28)');
  premierContactNoteAnxQ = signal<string>('À faire');

  premierContactCourriel = signal<boolean>(false);
  premierContactMedical = signal<boolean>(false);
  premierContactEntrevue = signal<boolean>(false);
  premierContactGambit = signal<boolean>(false);
  premierContactPsps = signal<boolean>(false);
  premierContactSelfie = signal<boolean>(false);
  premierContactIptad = signal<boolean>(false);
  premierContactSeaf = signal<boolean>(false);

  // Avis de Fermeture State
  avisFermetureCourriel = signal<boolean>(false);
  avisFermetureDelaiJours = signal<string>('14');
  avisFermetureDate = signal<string>('');
  avisFermetureEntrevue = signal<boolean>(false);
  avisFermetureMedicale = signal<boolean>(false);
  avisFermetureGambit = signal<boolean>(false);
  avisFermeturePsps = signal<boolean>(false);

  // Annexe Q State
  annexeQCourriel = signal<boolean>(false);
  annexeQAlphaPostulant = signal<string>('');

  // PFOR State
  pforMatricule = signal<string>('');

  // Instructions Sgt Recruteur Checkboxes
  sgtPforInstructions = [
    {
      id: 'pfor_1',
      text: "S'assurer que la liste de Vérification A1 à A35 est bien rempli",
      textEn: "Ensure the Verification List A1 to A35 is properly filled out",
    },
    {
      id: 'pfor_2',
      text: 'Marquer la tâche "Planifier votre consultation CAF 101" comme complétée',
      textEn: 'Mark the task "Schedule your CAF 101 consultation" as completed',
    },
    {
      id: 'pfor_3',
      text: 'Réattribuer la tâche "4.5 - Autres exigences en matière de sécurité" pour le dépôt de la capture d\'écran de confirmation des documents déposés sur le PA',
      textEn: 'Reassign the task "4.5 - Other Security Requirements" for uploading the screenshot confirming documents submitted to the PA',
    },
    {
      id: 'pfor_4',
      text: 'Ajouter la note au registre du Postulant',
      textEn: 'Add the note to the Applicant register',
    },
    {
      id: 'pfor_5',
      text: 'Tag CCM et Recruteur BPR appropriés',
      textEn: 'Tag appropriate MCC and OPI Recruiter',
    },
    {
      id: 'pfor_6',
      text: 'Basculer vers la Gestion des admissions',
      textEn: 'Switch to Admissions Management',
    },
    {
      id: 'pfor_7',
      text: 'Envoyer les 2 courriels au Postulant : CAF 101 PFOR et Lien PA',
      textEn: 'Send the 2 emails to the Applicant: ROTP CAF 101 and PA Link',
    },
  ];

  sgtStandardInstructions = [
    {
      id: 'std_1',
      text: "S'assurer que la liste de vérification A1 à A35 est bien rempli.",
      textEn: "Ensure the verification list A1 to A35 is properly filled out.",
    },
    {
      id: 'std_2',
      text: "Attribuer la tâche : Planifiez votre séance d'information des FAC 101.",
      textEn: "Assign the task: Schedule your CAF 101 information session.",
    },
    {
      id: 'std_3',
      text: "Mettre le marqueur ‘’Dispense requise’’ ou ‘’ÉRA requise’’ au besoin, le Ltv Forest fera l’analyse.",
      textEn: "Add the tag ‘’Waiver required’’ or ‘’PLAR required’’ as needed; SLt Forest will perform the review.",
    },
    {
      id: 'std_4',
      text: "Ajouter la note au registre du postulant.",
      textEn: "Add the note to the applicant register.",
    },
    {
      id: 'std_5',
      text: "Basculer le postulant dans Traitement initial.",
      textEn: "Switch the applicant to Initial Processing.",
    },
    {
      id: 'std_6',
      text: "Envoyé le courriel au postulant contenant le lien vers le Form et le CAF 101.",
      textEn: "Send the email to the applicant containing the link to the Form and CAF 101.",
    },
  ];

  sgtCheckedInstructions = signal<Set<string>>(new Set<string>());

  toggleSgtInstruction(id: string) {
    this.sgtCheckedInstructions.update(set => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  isSgtInstructionChecked(id: string): boolean {
    return this.sgtCheckedInstructions().has(id);
  }

  resetSgtInstructions() {
    this.sgtCheckedInstructions.set(new Set<string>());
  }

  toggleAllSgtInstructions(items: { id: string; text: string }[]) {
    const allChecked = items.every(item => this.isSgtInstructionChecked(item.id));
    this.sgtCheckedInstructions.update(set => {
      const next = new Set(set);
      if (allChecked) {
        items.forEach(item => next.delete(item.id));
      } else {
        items.forEach(item => next.add(item.id));
      }
      return next;
    });
  }

  getCompletedSgtInstructionsCount(items: { id: string; text: string }[]): number {
    return items.filter(item => this.isSgtInstructionChecked(item.id)).length;
  }

  // Évaluation Médicale State
  evaluationMedicaleType = signal<'Dossier régulier' | 'Dossier OTA'>('Dossier régulier');
  evaluationMedicalePartie1 = signal<boolean>(false);
  evaluationMedicalePartie2 = signal<boolean>(false);
  evaluationMedicalePartie1Et2 = signal<boolean>(false);
  copiedMedicalKey = signal<string | null>(null);

  copyToClipboard(text: string, key: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    this.copiedMedicalKey.set(key);
    setTimeout(() => {
      if (this.copiedMedicalKey() === key) {
        this.copiedMedicalKey.set(null);
      }
    }, 2000);
  }

  getPremierContactSelectedTasks() { return GdContactMedicalGen.getPremierContactSelectedTasks.call(this); }
  getPremierContactSectionPlainFr() { return GdContactMedicalGen.getPremierContactSectionPlainFr.call(this); }
  getPremierContactSectionPlainEn() { return GdContactMedicalGen.getPremierContactSectionPlainEn.call(this); }
  getPremierContactEmailPlain() { return GdContactMedicalGen.getPremierContactEmailPlain.call(this); }
  getPremierContactSectionHtmlFr() { return GdContactMedicalGen.getPremierContactSectionHtmlFr.call(this); }
  getPremierContactSectionHtmlEn() { return GdContactMedicalGen.getPremierContactSectionHtmlEn.call(this); }
  getPremierContactEmailHtml() { return GdContactMedicalGen.getPremierContactEmailHtml.call(this); }
  getAvisFermetureSelectedTasksFr() { return GdContactMedicalGen.getAvisFermetureSelectedTasksFr.call(this); }
  getAvisFermetureSelectedTasksEn() { return GdContactMedicalGen.getAvisFermetureSelectedTasksEn.call(this); }
  isOffreOtaActive() { return GdContactMedicalGen.isOffreOtaActive.call(this); }
  getAnnexeQSectionPlainFr() { return GdContactMedicalGen.getAnnexeQSectionPlainFr.call(this); }
  getAnnexeQSectionPlainEn() { return GdContactMedicalGen.getAnnexeQSectionPlainEn.call(this); }
  getAnnexeQEmailPlain() { return GdContactMedicalGen.getAnnexeQEmailPlain.call(this); }
  getAnnexeQSectionHtmlFr() { return GdContactMedicalGen.getAnnexeQSectionHtmlFr.call(this); }
  getAnnexeQSectionHtmlEn() { return GdContactMedicalGen.getAnnexeQSectionHtmlEn.call(this); }
  getAnnexeQEmailHtml() { return GdContactMedicalGen.getAnnexeQEmailHtml.call(this); }
  translateDateToEn(dateStr: string) { return GdContactMedicalGen.translateDateToEn.call(this, dateStr); }
  getAvisFermetureSectionPlainFr() { return GdContactMedicalGen.getAvisFermetureSectionPlainFr.call(this); }
  getAvisFermetureSectionPlainEn() { return GdContactMedicalGen.getAvisFermetureSectionPlainEn.call(this); }
  getAvisFermetureEmailPlain() { return GdContactMedicalGen.getAvisFermetureEmailPlain.call(this); }
  getAvisFermetureSectionHtmlFr() { return GdContactMedicalGen.getAvisFermetureSectionHtmlFr.call(this); }
  getAvisFermetureSectionHtmlEn() { return GdContactMedicalGen.getAvisFermetureSectionHtmlEn.call(this); }
  getAvisFermetureEmailHtml() { return GdContactMedicalGen.getAvisFermetureEmailHtml.call(this); }
  getMedicalPartEn(part: string) { return GdContactMedicalGen.getMedicalPartEn.call(this, part); }
  getMedicalEmailBody(part: string) { return GdContactMedicalGen.getMedicalEmailBody.call(this, part); }
  getMedicalPartsInfo(): { labelFr: string; labelEn: string } | null { return GdContactMedicalGen.getMedicalPartsInfo.call(this); }
  getMedicalSectionHtmlFr(part: string) { return GdContactMedicalGen.getMedicalSectionHtmlFr.call(this, part); }
  getMedicalSectionHtmlEn(partEn: string) { return GdContactMedicalGen.getMedicalSectionHtmlEn.call(this, partEn); }
  getMedicalSectionPlainFr(part: string) { return GdContactMedicalGen.getMedicalSectionPlainFr.call(this, part); }
  getMedicalSectionPlainEn(partEn: string) { return GdContactMedicalGen.getMedicalSectionPlainEn.call(this, partEn); }
  getMedicalRegisterNoteCombined() { return GdContactMedicalGen.getMedicalRegisterNoteCombined.call(this); }
  getMedicalEmailPlain(part: string) { return GdContactMedicalGen.getMedicalEmailPlain.call(this, part); }
  getMedicalEmailHtml(part: string) { return GdContactMedicalGen.getMedicalEmailHtml.call(this, part); }
  getSafeMedicalEmailHtml(part: string) { return GdContactMedicalGen.getSafeMedicalEmailHtml.call(this, part); }
  getMedicalRegisterNote(part: string) { return GdContactMedicalGen.getMedicalRegisterNote.call(this, part); }
  // Auth & Role State
  isAuthenticated = signal<boolean>(false);
  passwordInput = signal<string>('');
  authError = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  selectedRole = signal<'none' | 'recruiter' | 'gestionnaire'>('none');
  private roleSnapshots: Partial<Record<'recruiter' | 'gestionnaire', RoleSnapshot>> = {};

  private createSnapshot() { return RoleSnapshotHelper.createSnapshot.call(this); }
  private applySnapshot(snapshot: RoleSnapshot) { return RoleSnapshotHelper.applySnapshot.call(this, snapshot); }
  private createFreshSnapshot(role: 'recruiter' | 'gestionnaire') { return RoleSnapshotHelper.createFreshSnapshot.call(this, role); }

  ngOnInit() {
    const isAuth = localStorage.getItem('marcel_auth');
    if (isAuth === 'true') {
      this.isAuthenticated.set(true);
    }
  }

  selectRole(role: 'recruiter' | 'gestionnaire') {
    const current = this.selectedRole();
    if (current === 'recruiter' || current === 'gestionnaire') {
      this.roleSnapshots[current] = this.createSnapshot();
    }

    this.selectedRole.set(role);
    localStorage.setItem('marcel_role', role);

    const existing = this.roleSnapshots[role];
    if (existing) {
      this.applySnapshot(existing);
    } else {
      this.applySnapshot(this.createFreshSnapshot(role));
    }

    if (role === 'gestionnaire') {
      this.stage.set('intro');
    }
  }

  switchRole() {
    const current = this.selectedRole();
    if (current === 'recruiter' || current === 'gestionnaire') {
      this.roleSnapshots[current] = this.createSnapshot();
    }
    this.selectedRole.set('none');
    localStorage.removeItem('marcel_role');
  }

  lockSession() {
    this.isAuthenticated.set(false);
    this.selectedRole.set('none');
    localStorage.removeItem('marcel_auth');
    localStorage.removeItem('marcel_role');
  }

  async checkPassword(event: Event) {
    event.preventDefault();
    const input = this.passwordInput();
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex === '4b65e209bce165f2be7ddc7a5347453f200afaca8c590dc411c3dc886bf02635') {
      this.isAuthenticated.set(true);
      this.authError.set(false);
      localStorage.setItem('marcel_auth', 'true');
    } else {
      this.authError.set(true);
    }
  }

  // App Stage Management
  stage = signal<AppStage>("intro");
  isUnderAge = signal<boolean>(false);
  recruiterDossierType = signal<'normal' | 'pfor'>('normal');

  // Tuto Marcel State
  showTutoMarcel = signal<boolean>(false);

  openTutoMarcel() {
    this.showTutoMarcel.set(true);
  }

  closeTutoMarcel() {
    this.showTutoMarcel.set(false);
    this.selectedRole.set('none');
  }

  // Signature Settings State
  showSignaturePage = signal<boolean>(false);
  showToast = signal<boolean>(false);
  signatureSection = signal<'normal' | 'ota'>('normal');
  sigFrTemp = "";
  sigEnTemp = "";
  sigOtaFrTemp = "";
  sigOtaEnTemp = "";

  get isOtaDossier(): boolean {
    return this.selectedRole() === 'gestionnaire' && this.evaluationMedicaleType() === 'Dossier OTA';
  }

  getSignatureFr(): string {
    return this.sharedState.getSignatureFr(this.isOtaDossier);
  }

  getSignatureEn(): string {
    return this.sharedState.getSignatureEn(this.isOtaDossier);
  }

  getHtmlSignatureFr(): string {
    return this.sharedState.getHtmlSignatureFr(this.isOtaDossier);
  }

  getHtmlSignatureEn(): string {
    return this.sharedState.getHtmlSignatureEn(this.isOtaDossier);
  }

  toggleSignatureSettings() {
    this.sigFrTemp = this.sharedState.customSignatureFr();
    this.sigEnTemp = this.sharedState.customSignatureEn();
    this.sigOtaFrTemp = this.sharedState.customSignatureOtaFr();
    this.sigOtaEnTemp = this.sharedState.customSignatureOtaEn();
    this.showSignaturePage.set(true);
  }

  closeSignaturePage() {
    this.showSignaturePage.set(false);
  }

  saveSignatures() {
    this.sharedState.saveSignatures(
      this.sigFrTemp,
      this.sigEnTemp,
      this.sigOtaFrTemp,
      this.sigOtaEnTemp
    );
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }

  resetSignatures() {
    if (this.signatureSection() === 'normal') {
      this.sigFrTemp = DEFAULT_SIG_FR;
      this.sigEnTemp = DEFAULT_SIG_EN;
    } else {
      this.sigOtaFrTemp = DEFAULT_SIG_OTA_FR;
      this.sigOtaEnTemp = DEFAULT_SIG_OTA_EN;
    }
  }

  // Job Search Modal State
  showJobSearch = signal(false);

  toggleJobSearch() {
    this.showJobSearch.update((v) => !v);
  }

  // Task Groups Definition & Expansion State
  collapsedGroups = signal<Set<string>>(new Set());

  toggleGroupCollapse(groupId: string) {
    this.collapsedGroups.update((set) => {
      const next = new Set(set);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }

  isGroupCollapsed(groupId: string): boolean {
    return this.collapsedGroups().has(groupId);
  }

  isGroupCompliant(group: { tasks: Task[] }) { return TaskComplianceHelper.isGroupCompliant.call(this, group); }
  setGroupCompliant(group: { tasks: Task[] }, event?: Event) { return TaskComplianceHelper.setGroupCompliant.call(this, group, event); }
  hasGroupRejections(group: { tasks: Task[] }) { return TaskComplianceHelper.hasGroupRejections.call(this, group); }
  getGroupForTask(task: Task) { return TaskComplianceHelper.getGroupForTask.call(this, task); }
  groupedVisibleTasks = computed(() => TaskComplianceHelper.computeGroupedVisibleTasks.call(this));
  // Signals
  private allTasks = signal<Task[]>(
    this.dataService.getTasks(
      this.selectedRole() === "gestionnaire" ? "gestionnaire" : "recruiter"
    )
  );

  selectedTask = signal<Task | null>(null);

  // Set of selected rejection IDs
  selectedRejectionKeys = signal<Set<string>>(new Set());

  // Set of tasks marked as not completed
  taskNotCompletedKeys = signal<Set<string>>(new Set());

  // Set of explicitly Compliant Documents (key: taskName::docName)
  compliantDocKeys = signal<Set<string>>(new Set());

  // UI States for copy feedback
  copiedEmail = signal(false);
  copiedEmailCaf101 = signal(false);
  copiedEmailLienPa = signal(false);
  copiedNote = signal(false);

  @ViewChild(JobSearchModalComponent) jobSearchModal!: JobSearchModalComponent;

  constructor() {
    // Keep SharedState isOtaDossier in sync
    effect(() => {
      const isOta = this.isOtaDossier;
      untracked(() => {
        this.sharedState.isOtaDossier.set(isOta);
      });
    });

    // No task selected initially, waiting for stage selection
    effect(() => {
      const note = this.generatedNote();
      const rawHtml = this.getCombinedRawHtmlString(true);
      const rawPlain = this.getCombinedPlainString(true);
      const hasReassigned =
        !this.allTasksCompliant() &&
        (this.hasSelectedRejections() || this.forceGeneralReminder());

      untracked(() => {
        this.sharedState.taskNote.set(note);
        this.sharedState.taskEmailHtmlFr.set(rawHtml);
        this.sharedState.taskEmailFr.set(rawPlain);
        this.sharedState.hasReassignedTasks.set(hasReassigned);
      });
    });

    effect(() => {
      const trigger = this.sharedState.recruiterResetTrigger();
      if (trigger > 0) {
        untracked(() => {
          this.restartApp(false);
        });
      }
    });
  }

  // --- DOSSIER JOBS METHODS ---

  getDossierJob(index: number) { return TaskComplianceHelper.getDossierJob.call(this, index); }
  isJobClosed(jobId: string) { return TaskComplianceHelper.isJobClosed.call(this, jobId); }
  getFilteredJobsForIndex(index: number) { return TaskComplianceHelper.getFilteredJobsForIndex.call(this, index); }
  getObjectKeys(obj: any) { return TaskComplianceHelper.getObjectKeys.call(this, obj); }
  isDossierFieldDisabled(index: number) { return TaskComplianceHelper.isDossierFieldDisabled.call(this, index); }
  selectDossierJob(index: number, jobId: string) { return TaskComplianceHelper.selectDossierJob.call(this, index, jobId); }
  clearDossierJob(index: number, event?: MouseEvent) { return TaskComplianceHelper.clearDossierJob.call(this, index, event); }
  onDossierQueryChange(index: number, val: string) { return TaskComplianceHelper.onDossierQueryChange.call(this, index, val); }
  openDossierDropdown(index: number) { return TaskComplianceHelper.openDossierDropdown.call(this, index); }
  closeDossierDropdownDelayed(index: number) { return TaskComplianceHelper.closeDossierDropdownDelayed.call(this, index); }
  restartApp(triggerShared: boolean = true) { return TaskComplianceHelper.restartApp.call(this, triggerShared); }
  isPforDossier() { return TaskComplianceHelper.isPforDossier.call(this); }

  areAllDocsCompliant = computed(() => {
    if (this.selectedRole() === "recruiter") {
      return this.allTasksCompliant();
    }
    const tasks = this.visibleTasks().filter((t) => !t.nameFr.includes("Documents Supplémentaires"));
    if (tasks.length === 0) return false;
    const currentCompliant = this.compliantDocKeys();
    for (const task of tasks) {
      for (const doc of task.documents) {
        if (!currentCompliant.has(this.getDocKey(task, doc))) {
          return false;
        }
      }
    }
    return true;
  });

  setAllCompliant() { return TaskComplianceHelper.setAllCompliant.call(this); }
  // Helper methods for Dossier Jobs and Additional Documents
  getDossierJobObjects(): JobEntry[] {
    const ids = [
      this.sharedState.selectedDossierJobId1(),
      this.sharedState.selectedDossierJobId2(),
      this.sharedState.selectedDossierJobId3(),
    ].filter((id) => !!id);

    const allJobs = this.jobService.getAllJobs();
    return ids
      .map((id) => allJobs.find((j) => j.id === id))
      .filter((j): j is JobEntry => !!j);
  }

  isSubsidizedEducationJob(job: JobEntry) { return DossierDocsHelper.isSubsidizedEducationJob.call(this, job); }
  isSubsidizedDoc(doc: DocumentItem) { return DossierDocsHelper.isSubsidizedDoc.call(this, doc); }
  isTaskBasedAdditionalDoc(doc: DocumentItem) { return DossierDocsHelper.isTaskBasedAdditionalDoc.call(this, doc); }
  shouldShowAdditionalDoc(doc: DocumentItem) { return DossierDocsHelper.shouldShowAdditionalDoc.call(this, doc); }
  isAdditionalDocRequiredForJob(docNameFr: string, jobId: string) { return DossierDocsHelper.isAdditionalDocRequiredForJob.call(this, docNameFr, jobId); }
  getJobSpecificDocText(jobId: string, docNameFr: string, isFrench: boolean) { return DossierDocsHelper.getJobSpecificDocText.call(this, jobId, docNameFr, isFrench); }
  getDisplayLabelForAdditionalDoc(doc: DocumentItem, reason: RejectionReason) { return DossierDocsHelper.getDisplayLabelForAdditionalDoc.call(this, doc, reason); }
  hasVisibleTaskBasedDocs(task: Task) { return DossierDocsHelper.hasVisibleTaskBasedDocs.call(this, task); }
  hasVisibleAdditionalDocs(task: Task) { return DossierDocsHelper.hasVisibleAdditionalDocs.call(this, task); }
  hasJobAdditionalDocs(task: Task, job: JobEntry) { return DossierDocsHelper.hasJobAdditionalDocs.call(this, task, job); }
  hasVisibleSubsidizedDocs(task: Task) { return DossierDocsHelper.hasVisibleSubsidizedDocs.call(this, task); }
  getDossierJobsSummaryTextFr() { return DossierDocsHelper.getDossierJobsSummaryTextFr.call(this); }
  getDossierJobsSummaryTextEn() { return DossierDocsHelper.getDossierJobsSummaryTextEn.call(this); }
  // Computed Tasks based on Stage
  visibleTasks = computed(() => {
    const currentStage = this.stage();
    const tasks = this.allTasks();

    if (currentStage === "intro" || currentStage === "recruiter-dossier-type") {
      return [];
    }

    if (currentStage === "minor-check") {
      // In Minor check, we only want Birth Certificate and Parental Consent tasks.
      // The "Partie H" is now inside "Consentement du parent", so we don't need the general App Form task here.
      return tasks.filter(
        (t) =>
          t.nameFr.includes("Certificat de naissance") ||
          t.nameFr.includes("Consentement du parent"),
      );
    }

    // GD Role: filter offer tasks based on Local vs OTA dossier type
    if (this.selectedRole() === "gestionnaire") {
      
      return tasks.filter((t) => {
        if (t.nameFr.includes("Consentement du parent")) return false;

        // Filter Offer tasks
        if (t.section === "Courriel d'offre" || t.nameFr.includes("Offre")) {
          return t.nameFr === "Offre normale" || t.nameFr.toLowerCase().includes("subventionn");
        }

        return true;
      });
    }

    // Main Stage: Exclude Parental Consent
    return tasks.filter((t) => {
      if (t.nameFr.includes("Consentement du parent")) return false;

      return true;
    });
  });

  // Action: User clicks "Oui" (Minor)
  startMinorCheck() {
    this.isUnderAge.set(true);
    this.stage.set("minor-check");
    const tasks = this.visibleTasks();
    if (tasks.length > 0) this.selectTask(tasks[0]);
  }

  // Recruiter actions for Minor Check -> Dossier Type flow
  onRecruiterMinorCheckNon() {
    this.isUnderAge.set(false);
    this.stage.set("recruiter-dossier-type");
  }

  backToRecruiterMinorCheck() {
    if (this.isUnderAge()) {
      this.stage.set("minor-check");
      const tasks = this.visibleTasks();
      if (tasks.length > 0) this.selectTask(tasks[0]);
    } else {
      this.stage.set("intro");
    }
  }

  selectRecruiterDossierType(type: 'normal' | 'pfor') {
    this.recruiterDossierType.set(type);
    if (type === 'pfor') {
      this.sharedState.isPostulantPfor.set(true);
    } else {
      this.sharedState.isPostulantPfor.set(false);
    }
    this.stage.set("main");
    const tasks = this.visibleTasks();
    if (tasks.length > 0) this.selectTask(tasks[0]);
  }

  // Action: User clicks "Non" (Adult) or finishes minor check
  startMainProgram() {
    if (this.selectedRole() === "recruiter") {
      this.stage.set("recruiter-dossier-type");
      return;
    }
    if (this.stage() === "intro") {
      this.isUnderAge.set(false);
    }
    this.stage.set("main");
    const tasks = this.visibleTasks();
    if (tasks.length > 0) this.selectTask(tasks[0]);
  }

  // Action: GD user chooses dossier type (Local or OTA)
  selectGdDossierType(type: 'Local' | 'OTA') {
    this.evaluationMedicaleType.set(type === 'OTA' ? 'Dossier OTA' : 'Dossier régulier');
    if (type === 'OTA') {
      const mtl = this.recruitmentCentersList.find(c => c.city === 'Montréal') || this.recruitmentCentersList[0];
      this.offreLieuVille.set('Montréal');
      this.offreLieuEnrolement.set(mtl.fullFr);
      this.offreHeureArriveePostulant.set('07h30');
      this.offreHeureArriveeInvites.set('09h40');
    } else {
      const savedVille = (typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_ville')) || 'Québec';
      const centerObj = this.recruitmentCentersList.find(c => c.city === savedVille) || this.recruitmentCentersList[0];
      this.offreLieuVille.set(savedVille);
      this.offreLieuEnrolement.set((typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_enrolement')) || centerObj.fullFr);
    }
    this.stage.set("main");
    const tasks = this.visibleTasks();
    if (tasks.length > 0) this.selectTask(tasks[0]);
  }

  // Check if the 4 specific minor documents are compliant
  isMinorCheckComplete = computed(() => {
    const keys = this.compliantDocKeys();

    // Convert to array explicitly typed as string[] to avoid TS inference issues
    const keysArray = Array.from(keys) as string[];

    // 1. Certificat de naissance (Check parents)
    const hasBirthCert = keysArray.some(
      (k) =>
        k.includes("Certificat de naissance") &&
        k.includes("::Certificat de naissance"),
    );

    // 2. Parent ID (Inside Consent task)
    const hasParentId = keysArray.some(
      (k) =>
        k.includes("Consentement du parent") &&
        k.includes("::Pièce d'identité du parent"),
    );

    // 3. Parent Selfie (Inside Consent task)
    const hasParentSelfie = keysArray.some(
      (k) =>
        k.includes("Consentement du parent") &&
        (k.includes("::Selfie du parent") || k.includes("::Égoportrait (Selfie) du parent")),
    );

    // 4. Formulaire demande Partie H (Inside Consent task now)
    const hasPartH = keysArray.some(
      (k) =>
        k.includes("Consentement du parent") &&
        k.includes("::Formulaire de demande d'emploi - Partie H"),
    );

    return hasBirthCert && hasParentId && hasParentSelfie && hasPartH;
  });

  // --- CORE LOGIC ---

  // Actions
  selectTask(task: Task) { return TaskComplianceHelper.selectTask.call(this, task); }
  toggleTaskNotCompleted(task: Task) { return TaskComplianceHelper.toggleTaskNotCompleted.call(this, task); }
  isTaskNotCompleted(task: Task) { return TaskComplianceHelper.isTaskNotCompleted.call(this, task); }
  toggleReason(task: Task, doc: DocumentItem, reason: RejectionReason) { return TaskComplianceHelper.toggleReason.call(this, task, doc, reason); }
  toggleJobReason(task: Task, job: JobEntry, doc: DocumentItem, reason: RejectionReason) { return TaskComplianceHelper.toggleJobReason.call(this, task, job, doc, reason); }
  hasAdditionalJobDocsRejections(task: Task) { return TaskComplianceHelper.hasAdditionalJobDocsRejections.call(this, task); }
  isAdditionalJobDocsCompliant(task?: Task) { return TaskComplianceHelper.isAdditionalJobDocsCompliant.call(this, task); }
  toggleAdditionalJobDocsCompliant(task: Task) { return TaskComplianceHelper.toggleAdditionalJobDocsCompliant.call(this, task); }
  toggleCompliant(task: Task, doc: DocumentItem) { return TaskComplianceHelper.toggleCompliant.call(this, task, doc); }
  private getReasonKey(doc: DocumentItem, reason: RejectionReason) { return TaskComplianceHelper.getReasonKey.call(this, doc, reason); }
  private getJobReasonKey(job: JobEntry, doc: DocumentItem, reason: RejectionReason) { return TaskComplianceHelper.getJobReasonKey.call(this, job, doc, reason); }
  private getDocKey(task: Task, doc: DocumentItem) { return TaskComplianceHelper.getDocKey.call(this, task, doc); }
  private setCompliantState(task: Task,
    doc: DocumentItem,
    isCompliant: boolean,) { return TaskComplianceHelper.setCompliantState.call(this, task, doc, isCompliant); }
  isJobReasonSelected(job: JobEntry, doc: DocumentItem, reason: RejectionReason) { return TaskComplianceHelper.isJobReasonSelected.call(this, job, doc, reason); }
  isReasonSelected(doc: DocumentItem, reason: RejectionReason) { return TaskComplianceHelper.isReasonSelected.call(this, doc, reason); }
  hasRejections(doc: DocumentItem) { return TaskComplianceHelper.hasRejections.call(this, doc); }
  hasConfirmationReasons(doc: DocumentItem) { return TaskComplianceHelper.hasConfirmationReasons.call(this, doc); }
  hasAdditionalDocReasons(doc: DocumentItem) { return TaskComplianceHelper.hasAdditionalDocReasons.call(this, doc); }
  hasNormalReasons(doc: DocumentItem) { return TaskComplianceHelper.hasNormalReasons.call(this, doc); }
  isCompliant(task: Task, doc: DocumentItem) { return TaskComplianceHelper.isCompliant.call(this, task, doc); }
  hasTaskRejections(task: Task) { return TaskComplianceHelper.hasTaskRejections.call(this, task); }
  isTaskCompliant(task: Task) { return TaskComplianceHelper.isTaskCompliant.call(this, task); }
  isRecruiterMandatoryTask(task: Task) { return TaskComplianceHelper.isRecruiterMandatoryTask.call(this, task); }
  allTasksCompliant = computed(() => TaskComplianceHelper.computeAllTasksCompliant.call(this));

  hasSelectedRejections = computed(() => {
    return this.selectedRejectionKeys().size > 0 || this.taskNotCompletedKeys().size > 0;
  });

  isPremierContactActive = computed(() => {
    return (
      this.selectedRole() === 'gestionnaire' &&
      this.premierContactCourriel()
    );
  });

  isAvisFermetureActive = computed(() => {
    return (
      this.selectedRole() === 'gestionnaire' &&
      this.avisFermetureCourriel()
    );
  });

  isAnnexeQActive = computed(() => {
    return (
      this.selectedRole() === 'gestionnaire' &&
      this.annexeQCourriel()
    );
  });

  isMedicalEvaluationActive = computed(() => {
    return (
      this.selectedRole() === 'gestionnaire' &&
      (this.evaluationMedicalePartie1() ||
        this.evaluationMedicalePartie2() ||
        this.evaluationMedicalePartie1Et2())
    );
  });

  hasAnyGdSelection = computed(() => {
    if (this.selectedRole() !== 'gestionnaire') return false;
    return (
      this.isPremierContactActive() ||
      (this.selectedTask()?.nameFr === 'Premier contact' && this.premierContactSubPanelMode() === 'note') ||
      (this.selectedTask()?.nameFr?.includes('Offre') && this.offreSubPanelMode() === 'note') ||
      this.isAvisFermetureActive() ||
      this.isAnnexeQActive() ||
      this.isMedicalEvaluationActive() ||
      this.offreNormaleChecked() ||
      this.offreEtudesSubventionneesChecked() ||
      this.rappelCeremonieChecked() ||
      this.hasSelectedRejections() ||
      this.forceGeneralReminder() ||
      this.selectedEmailBankTemplate() !== '' ||
      this.allTasksCompliant()
    );
  });

  // A document is "Active" if it is either Compliant OR has Rejections
  isDocActive(task: Task, doc: DocumentItem) { return TaskComplianceHelper.isDocActive.call(this, task, doc); }
  shouldShowDoc(task: Task, doc: DocumentItem) { return TaskComplianceHelper.shouldShowDoc.call(this, task, doc); }
  shouldShowReason(task: Task,
    doc: DocumentItem,
    reason: RejectionReason,) { return TaskComplianceHelper.shouldShowReason.call(this, task, doc, reason); }
  // Email Bank & Reminder State
  selectedEmailBankTemplate = signal<string>("");
  isEmailBankDropdownOpen = signal<boolean>(false);

  forceGeneralReminder = computed(() => this.selectedEmailBankTemplate() === "general_reminder");

  toggleEmailBankDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isEmailBankDropdownOpen.update((v) => !v);
  }

  selectEmailBankTemplate(templateId: string) {
    if (this.selectedEmailBankTemplate() === templateId) {
      this.selectedEmailBankTemplate.set("");
    } else {
      this.selectedEmailBankTemplate.set(templateId);
    }
    this.inapteMedicalAttemptedExport.set(false);
    this.isEmailBankDropdownOpen.set(false);
  }

  toggleGeneralReminder() {
    this.selectEmailBankTemplate("general_reminder");
  }

  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isEmailBankDropdownOpen() && !target.closest('.email-bank-dropdown-container')) {
      this.isEmailBankDropdownOpen.set(false);
    }
  }

  // Triage Medical State
  triageMedicalRequis = signal(false);

  toggleTriageMedical() {
    this.triageMedicalRequis.update((v) => !v);
  }

  // Offer Email State
  offreNormaleChecked = signal(false);
  offreEtudesSubventionneesChecked = signal(false);

  // Form fields for offer email
  readonly recruitmentCentersList: RecruitmentCenter[] = RECRUITMENT_CENTERS;
  
  // Rappel cérémonie d'assermentation state
  rappelCeremonieChecked = signal(false);
  rappelCeremonieRalliementChecked = signal(false);
  rappelCeremonieDate = signal<string>('');
  rappelCeremonieHeurePostulant = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('rappel_heure_postulant')) || '7h30');
  rappelCeremonieHeureInvites = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('rappel_heure_invites')) || '10h15');
  rappelCeremonieLieu = signal<string>('Québec');

  offreLieuVille = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_ville')) || 'Québec');
  offreUniteAffectation = signal<string>('3229');
  readonly unitesAffectation = UNITS_LIST;
  offreMetier = signal<string>('');
  offreMetierSearchQuery = signal<string>('');
  offreMetierDropdownOpen = signal<boolean>(false);
  offreProgrammeEnrolement = signal<string>('');
  offreElement = signal<string>('');
  offreDureeContrat = signal<string>('');
  offreEtudesSubventionnees = signal<string>('');
  offreDureeEtudesSubventionnees = signal<string>('');
  readonly enrolmentHoursList: string[] = ENROLMENT_HOURS;
  testEsomRecruitmentCenterCity = signal<string>('Québec');
  inapteMedicalGender = signal<'F' | 'M' | ''>('');
  inapteMedicalName = signal<string>('');
  inapteMedicalAlpha = signal<string>('');
  inapteMedicalAttemptedExport = signal<boolean>(false);

  setInapteMedicalGender(val: 'F' | 'M' | '') {
    this.inapteMedicalGender.set(val);
    if (this.inapteMedicalAttemptedExport() && val && this.inapteMedicalName().trim() && this.inapteMedicalAlpha().trim()) {
      this.inapteMedicalAttemptedExport.set(false);
    }
  }

  setInapteMedicalName(val: string) {
    this.inapteMedicalName.set(val);
    if (this.inapteMedicalAttemptedExport() && this.inapteMedicalGender() && val.trim() && this.inapteMedicalAlpha().trim()) {
      this.inapteMedicalAttemptedExport.set(false);
    }
  }

  setInapteMedicalAlpha(val: string) {
    this.inapteMedicalAlpha.set(val);
    if (this.inapteMedicalAttemptedExport() && this.inapteMedicalGender() && this.inapteMedicalName().trim() && val.trim()) {
      this.inapteMedicalAttemptedExport.set(false);
    }
  }

  getTestEsomCenter(): RecruitmentCenter {
    return this.recruitmentCentersList.find(c => c.city === this.testEsomRecruitmentCenterCity()) || this.recruitmentCentersList[0];
  }
  offreHeureArriveePostulant = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_postulant')) || '8h00');
  offreHeureArriveeInvites = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('offre_heure_invites')) || '10h00');
  offreDateEnrolement = signal<string>('');
  offreLieuEnrolement = signal<string>((typeof localStorage !== 'undefined' && localStorage.getItem('offre_lieu_enrolement')) || RECRUITMENT_CENTERS[0].fullFr);
  offreDateArriveeUnite = signal<string>('');
  offreElementsManquants = signal<string>('Spécimen de chèque');
  offreDateElementsManquants = signal<string>('');
  offreSerieCours = signal<string>('');
  offreDateCoursDebut = signal<string>('');
  offreDateCoursFin = signal<string>('');
  offreFormulairePpp = signal<boolean>(false);
  offreFormulairePcu = signal<boolean>(false);
  offreFormulaireCroixSouvenir = signal<boolean>(false);
  offreFormulaireBeneficiaire = signal<boolean>(false);

  toggleOffreFormulairePpp() {
    this.offreFormulairePpp.update(v => !v);
    this.autoActivateOffreEmail();
  }

  toggleOffreFormulairePcu() {
    this.offreFormulairePcu.update(v => !v);
    this.autoActivateOffreEmail();
  }

  toggleOffreFormulaireCroixSouvenir() {
    this.offreFormulaireCroixSouvenir.update(v => !v);
    this.autoActivateOffreEmail();
  }

  toggleOffreFormulaireBeneficiaire() {
    this.offreFormulaireBeneficiaire.update(v => !v);
    this.autoActivateOffreEmail();
  }

  hasAnyOffreFormulairesSupplementaires(): boolean {
    return this.offreFormulairePpp() ||
      this.offreFormulairePcu() ||
      this.offreFormulaireCroixSouvenir() ||
      this.offreFormulaireBeneficiaire();
  }

  getOffreFormulairesSupplementairesPlain(lang: 'fr' | 'en') { return OffreEnrolementGen.getOffreFormulairesSupplementairesPlain.call(this, lang); }
  getOffreFormulairesSupplementairesHtml(lang: 'fr' | 'en') { return OffreEnrolementGen.getOffreFormulairesSupplementairesHtml.call(this, lang); }
  // Sub-panel mode for Offer task
  offreSubPanelMode = signal<'courriel' | 'note'>('courriel');

  // Form fields for offer note
  noteStatutCivil = signal<string>('célibataire');
  noteConjoint = signal<string>('N/A');
  noteConjointTexte = signal<string>('');
  noteEnfantCount = signal<string>('0');
  noteEnfantDetails = signal<{ sex: string; year: string }[]>([]);
  notePlaqueImm = signal<string>('');
  noteBrisBail = signal<string>('N/A');
  noteEntreposage = signal<string>('N/A');
  noteSermentDeclaration = signal<string>('Serment');
  noteInviteMil = signal<string>('N/A');
  noteInviteMilTexte = signal<string>('');
  noteSvcMilAnt = signal<string>('N/A');
  noteBeneficiaire = signal<string>('');
  noteDateCourrielConfirmation = signal<string>('');
  copiedNoteNotification = signal<boolean>(false);

  getEffectiveNoteDateCourrielConfirmation(): string {
    const val = this.noteDateCourrielConfirmation();
    if (val && val.trim().length > 0) {
      return val;
    }
    return getTodayDateString();
  }

  readonly statutCivilOptions: string[] = [
    'célibataire',
    'marié(e)',
    'conjoint(e) de fait',
    'divorcé(e)',
    'séparé(e)',
    'veuf/veuve'
  ];

  readonly ouiNonOptions: string[] = [
    'N/A',
    'oui'
  ];

  readonly brisBailOptions: string[] = [
    'N/A',
    'Refus du post',
    'Accepté par le post'
  ];

  readonly entreposageOptions: string[] = [
    'N/A',
    'Refus du post',
    'Accepté par le post'
  ];

  readonly sermentDeclarationOptions: string[] = [
    'Serment',
    'Déclaration',
    'Serment RP',
    'Déclaration RP'
  ];

  readonly svcMilAntOptions: string[] = [
    'N/A',
    'Force régulière',
    'Première réserve',
    'Cadets / Rangers',
    'Armée étrangère'
  ];

  getStatutCivilLabel(opt: string): string {
    if (this.i18n.currentLang() !== 'en') return opt;
    const map: Record<string, string> = {
      'célibataire': this.i18n.t('offre.single'),
      'marié(e)': this.i18n.t('offre.married'),
      'conjoint(e) de fait': this.i18n.t('offre.commonLaw'),
      'divorcé(e)': this.i18n.t('offre.divorced'),
      'séparé(e)': this.i18n.t('offre.separated'),
      'veuf/veuve': this.i18n.t('offre.widowed'),
    };
    return map[opt] || opt;
  }

  getBrisBailLabel(opt: string): string {
    if (this.i18n.currentLang() !== 'en') return opt;
    const map: Record<string, string> = {
      'Refus du post': this.i18n.t('offre.refuseParPost'),
      'Accepté par le post': this.i18n.t('offre.accepteParPost'),
    };
    return map[opt] || opt;
  }

  getEntreposageLabel(opt: string): string {
    return this.getBrisBailLabel(opt);
  }

  getSermentDeclarationLabel(opt: string): string {
    if (this.i18n.currentLang() !== 'en') return opt;
    const map: Record<string, string> = {
      'Serment': this.i18n.t('offre.serment'),
      'Déclaration': this.i18n.t('offre.declaration'),
      'Serment RP': this.i18n.t('offre.sermentRp'),
      'Déclaration RP': this.i18n.t('offre.declarationRp'),
    };
    return map[opt] || opt;
  }

  getSvcMilAntLabel(opt: string): string {
    if (this.i18n.currentLang() !== 'en') return opt;
    const map: Record<string, string> = {
      'Force régulière': this.i18n.t('offre.forceReg'),
      'Première réserve': this.i18n.t('offre.premiereReserve'),
      'Cadets / Rangers': this.i18n.t('offre.cadetsRangers'),
      'Armée étrangère': this.i18n.t('offre.armeeEtrangere'),
    };
    return map[opt] || opt;
  }

  getOuiNonLabel(opt: string): string {
    if (this.i18n.currentLang() !== 'en') return opt;
    return opt === 'oui' ? 'yes' : opt;
  }

  // Helper to dynamically generate child age years
  getEnfantYears() { return GdOffreActionsHelper.getEnfantYears.call(this); }
  onEnfantCountChange(count: string) { return GdOffreActionsHelper.onEnfantCountChange.call(this, count); }
  updateEnfantDetail(index: number, field: 'sex' | 'year', value: string) { return GdOffreActionsHelper.updateEnfantDetail.call(this, index, field, value); }
  getUniteAffectationObj() { return GdOffreActionsHelper.getUniteAffectationObj.call(this); }
  isUic3613Selected() { return GdOffreActionsHelper.isUic3613Selected.call(this); }
  getOfferFormattedNote() { return OffreEnrolementGen.getOfferFormattedNote.call(this); }
  copyNoteToClipboard() { return GdOffreActionsHelper.copyNoteToClipboard.call(this); }
  onOffreHeurePostulantChange(val: string) { return GdOffreActionsHelper.onOffreHeurePostulantChange.call(this, val); }
  onOffreHeureInvitesChange(val: string) { return GdOffreActionsHelper.onOffreHeureInvitesChange.call(this, val); }
  onNoteConjointTexteInput(val: string) { return GdOffreActionsHelper.onNoteConjointTexteInput.call(this, val); }
  onOffreLieuVilleChange(city: string) { return GdOffreActionsHelper.onOffreLieuVilleChange.call(this, city); }
  getSelectedRecruitmentCenter() { return GdOffreActionsHelper.getSelectedRecruitmentCenter.call(this); }
  // Computed job type and available enrollment programs
  offreJobType = computed<JobCategory | null>(() => {
    return this.jobService.detectJobType(this.offreMetier());
  });

  availableOffreProgrammes = computed<string[]>(() => {
    return this.jobService.getProgramsForJobType(this.offreJobType());
  });

  offreDetectedElement = computed<MilitaryElement | null>(() => {
    return this.jobService.detectJobElement(this.offreMetier());
  });

  getFilteredJobsForOffre() { return GdOffreActionsHelper.getFilteredJobsForOffre.call(this); }
  selectOffreMetier(job: JobEntry) { return GdOffreActionsHelper.selectOffreMetier.call(this, job); }
  onOffreMetierQueryChange(val: string) { return GdOffreActionsHelper.onOffreMetierQueryChange.call(this, val); }
  clearOffreMetier(event?: Event) { return GdOffreActionsHelper.clearOffreMetier.call(this, event); }
  closeOffreMetierDropdownDelayed() { return GdOffreActionsHelper.closeOffreMetierDropdownDelayed.call(this); }
  clearOtherGdEmails(except: 'premierContact' | 'medical1' | 'medical2' | 'medical1et2' | 'avisFermeture' | 'annexeQ' | 'offreNormale' | 'offreEtudes' | 'rappelCeremonie') { return GdOffreActionsHelper.clearOtherGdEmails.call(this, except); }
  togglePremierContactCourriel() { return GdOffreActionsHelper.togglePremierContactCourriel.call(this); }
  togglePremierContactTask(type: 'medical' | 'entrevue' | 'gambit' | 'psps' | 'selfie' | 'iptad' | 'seaf') { return GdOffreActionsHelper.togglePremierContactTask.call(this, type); }
  toggleEvaluationMedicalePartie1() { return GdOffreActionsHelper.toggleEvaluationMedicalePartie1.call(this); }
  toggleEvaluationMedicalePartie2() { return GdOffreActionsHelper.toggleEvaluationMedicalePartie2.call(this); }
  toggleEvaluationMedicalePartie1Et2() { return GdOffreActionsHelper.toggleEvaluationMedicalePartie1Et2.call(this); }
  toggleAvisFermetureCourriel() { return GdOffreActionsHelper.toggleAvisFermetureCourriel.call(this); }
  onAvisFermetureDelaiChange(val: string) { return GdOffreActionsHelper.onAvisFermetureDelaiChange.call(this, val); }
  onAvisFermetureDateChange(val: string) { return GdOffreActionsHelper.onAvisFermetureDateChange.call(this, val); }
  toggleAvisFermetureTask(type: 'entrevue' | 'medicale' | 'gambit' | 'psps') { return GdOffreActionsHelper.toggleAvisFermetureTask.call(this, type); }
  toggleAnnexeQCourriel() { return GdOffreActionsHelper.toggleAnnexeQCourriel.call(this); }
  onAnnexeQAlphaChange(val: string) { return GdOffreActionsHelper.onAnnexeQAlphaChange.call(this, val); }
  onPforMatriculeChange(val: string) { return GdOffreActionsHelper.onPforMatriculeChange.call(this, val); }
  getFormattedPforMatricule() { return GdOffreActionsHelper.getFormattedPforMatricule.call(this); }
  autoActivateOffreEmail() { return GdOffreActionsHelper.autoActivateOffreEmail.call(this); }
  setOffreProgrammeEnrolement(val: string) { return GdOffreActionsHelper.setOffreProgrammeEnrolement.call(this, val); }
  setOffreElement(val: string) { return GdOffreActionsHelper.setOffreElement.call(this, val); }
  setOffreDureeContrat(val: string) { return GdOffreActionsHelper.setOffreDureeContrat.call(this, val); }
  setOffreEtudesSubventionnees(val: string) { return GdOffreActionsHelper.setOffreEtudesSubventionnees.call(this, val); }
  setOffreDureeEtudesSubventionnees(val: string) { return GdOffreActionsHelper.setOffreDureeEtudesSubventionnees.call(this, val); }
  setOffreDateEnrolement(val: string) { return GdOffreActionsHelper.setOffreDateEnrolement.call(this, val); }
  setOffreDateArriveeUnite(val: string) { return GdOffreActionsHelper.setOffreDateArriveeUnite.call(this, val); }
  setOffreUniteAffectation(val: string) { return GdOffreActionsHelper.setOffreUniteAffectation.call(this, val); }
  setOffreUniteAffectationObj(unit: UnitSession) { return GdOffreActionsHelper.setOffreUniteAffectationObj.call(this, unit); }
  setCourseSession(session: CourseSession) { return GdOffreActionsHelper.setCourseSession.call(this, session); }
  clearCourseSession() { return GdOffreActionsHelper.clearCourseSession.call(this); }
  setOffreDateCoursDebut(val: string) { return GdOffreActionsHelper.setOffreDateCoursDebut.call(this, val); }
  setOffreDateCoursFin(val: string) { return GdOffreActionsHelper.setOffreDateCoursFin.call(this, val); }
  setOffreDateElementsManquants(val: string) { return GdOffreActionsHelper.setOffreDateElementsManquants.call(this, val); }
  setOffreElementsManquants(val: string) { return GdOffreActionsHelper.setOffreElementsManquants.call(this, val); }
  setNoteStatutCivil(val: string) { return GdOffreActionsHelper.setNoteStatutCivil.call(this, val); }
  setNoteConjoint(val: string) { return GdOffreActionsHelper.setNoteConjoint.call(this, val); }
  setNotePlaqueImm(val: string) { return GdOffreActionsHelper.setNotePlaqueImm.call(this, val); }
  setNoteBrisBail(val: string) { return GdOffreActionsHelper.setNoteBrisBail.call(this, val); }
  setNoteEntreposage(val: string) { return GdOffreActionsHelper.setNoteEntreposage.call(this, val); }
  setNoteSermentDeclaration(val: string) { return GdOffreActionsHelper.setNoteSermentDeclaration.call(this, val); }
  setNoteInviteMil(val: string) { return GdOffreActionsHelper.setNoteInviteMil.call(this, val); }
  setNoteInviteMilTexte(val: string) { return GdOffreActionsHelper.setNoteInviteMilTexte.call(this, val); }
  setNoteSvcMilAnt(val: string) { return GdOffreActionsHelper.setNoteSvcMilAnt.call(this, val); }
  setNoteBeneficiaire(val: string) { return GdOffreActionsHelper.setNoteBeneficiaire.call(this, val); }
  setNoteDateCourrielConfirmation(val: string) { return GdOffreActionsHelper.setNoteDateCourrielConfirmation.call(this, val); }
  onRappelCeremonieDateSelected(date: string) { return GdOffreActionsHelper.onRappelCeremonieDateSelected.call(this, date); }
  onRappelCeremonieHeurePostulantChange(val: string) { return GdOffreActionsHelper.onRappelCeremonieHeurePostulantChange.call(this, val); }
  onRappelCeremonieHeureInvitesChange(val: string) { return GdOffreActionsHelper.onRappelCeremonieHeureInvitesChange.call(this, val); }
  onRappelCeremonieLieuChange(val: string) { return GdOffreActionsHelper.onRappelCeremonieLieuChange.call(this, val); }
  toggleOffreNormale() { return GdOffreActionsHelper.toggleOffreNormale.call(this); }
  toggleOffreEtudesSubventionnees() { return GdOffreActionsHelper.toggleOffreEtudesSubventionnees.call(this); }
  toggleRappelCeremonie() { return GdOffreActionsHelper.toggleRappelCeremonie.call(this); }
  toggleRappelCeremonieRalliement() { return GdOffreActionsHelper.toggleRappelCeremonieRalliement.call(this); }

  // Computed Content Generators

  // Helper to structure selected rejections by Task -> Items
  private getStructuredRejections() { return VerifNotesGen.getStructuredRejections.call(this); }
  getRejectionReasonsForCompliantNote() { return VerifNotesGen.getRejectionReasonsForCompliantNote.call(this); }
  getPforCompliantNoteClean() { return VerifNotesGen.getPforCompliantNoteClean.call(this); }
  getBigAceCompliantNoteClean() { return VerifNotesGen.getBigAceCompliantNoteClean.call(this); }
  getBigAceCompliantNote() { return VerifNotesGen.getBigAceCompliantNote.call(this); }
  getRejectionAndReminderNoteText() { return VerifNotesGen.getRejectionAndReminderNoteText.call(this); }
  generatedNote = computed(() => VerifNotesGen.computeGeneratedNote.call(this));

  displayedNote = computed(() => {
    if (this.sharedState.includeLinkedEmail() && this.sharedState.reoMergedNote()) {
      return this.sharedState.reoMergedNote();
    }
    return this.generatedNote();
  });

  getOffreDateEnrolementFull(lang: 'fr' | 'en' = 'fr') { return OffreEnrolementGen.getOffreDateEnrolementFull.call(this, lang); }
  getOffreDateArriveeUniteFull() { return OffreEnrolementGen.getOffreDateArriveeUniteFull.call(this); }
  getOffreDatesCoursFull() { return OffreEnrolementGen.getOffreDatesCoursFull.call(this); }
  getJourSemaineFr(dateStr: string) { return OffreEnrolementGen.getJourSemaineFr.call(this, dateStr); }
  getJourSemaineEn(dateStr: string) { return OffreEnrolementGen.getJourSemaineEn.call(this, dateStr); }

  cleanInstructionForText(instruction: string, indent: string = '        ') { return CompliantEmailGen.cleanInstructionForText.call(this, instruction, indent); }
  private getCompliantNonMandatoryTasksPlain(lang: 'fr' | 'en' = 'fr') { return CompliantEmailGen.getCompliantNonMandatoryTasksPlain.call(this, lang); }
  private getCompliantNonMandatoryTasksHtml(lang: 'fr' | 'en' = 'fr') { return CompliantEmailGen.getCompliantNonMandatoryTasksHtml.call(this, lang); }
  getCompliantEmailHtml() { return CompliantEmailGen.getCompliantEmailHtml.call(this); }
  getCompliantEmailPlain() { return CompliantEmailGen.getCompliantEmailPlain.call(this); }
  getPforJobLinkMarkup(jobId: string, isFrench: boolean, isHtml: boolean) { return CompliantEmailGen.getPforJobLinkMarkup.call(this, jobId, isFrench, isHtml); }
  getCompliantPforEmailHtml() { return CompliantEmailGen.getCompliantPforEmailHtml.call(this); }
  getPforCaf101HighDemandWarningHtml(lang: 'fr' | 'en') { return CompliantEmailGen.getPforCaf101HighDemandWarningHtml.call(this, lang); }
  getPforCaf101HighDemandWarningPlain(lang: 'fr' | 'en') { return CompliantEmailGen.getPforCaf101HighDemandWarningPlain.call(this, lang); }
  getCompliantPforEmailPlain() { return CompliantEmailGen.getCompliantPforEmailPlain.call(this); }
  getCompliantPforLienPaEmailHtml() { return CompliantEmailGen.getCompliantPforLienPaEmailHtml.call(this); }
  getCompliantPforLienPaEmailPlain() { return CompliantEmailGen.getCompliantPforLienPaEmailPlain.call(this); }
  private getElementsManquantsBlocks(lang: 'fr' | 'en' = 'fr') { return OffreEnrolementGen.getElementsManquantsBlocks.call(this, lang); }
  getOffreOtaSectionPlainFr() { return OffreEnrolementGen.getOffreOtaSectionPlainFr.call(this); }
  getOffreOtaSectionPlainEn() { return OffreEnrolementGen.getOffreOtaSectionPlainEn.call(this); }
  getOffreOtaEmailPlain() { return OffreEnrolementGen.getOffreOtaEmailPlain.call(this); }
  getOffreOtaSectionHtmlFr() { return OffreEnrolementGen.getOffreOtaSectionHtmlFr.call(this); }
  getOffreOtaSectionHtmlEn() { return OffreEnrolementGen.getOffreOtaSectionHtmlEn.call(this); }
  getOffreOtaEmailHtml() { return OffreEnrolementGen.getOffreOtaEmailHtml.call(this); }
  getOffreNormaleEmailPlain() { return OffreEnrolementGen.getOffreNormaleEmailPlain.call(this); }
  private isConjointDeFaitSelected() { return OffreEnrolementGen.isConjointDeFaitSelected.call(this); }
  getTeamsLinkPlainFr() { return OffreEnrolementGen.getTeamsLinkPlainFr.call(this); }
  getTeamsLinkPlainEn() { return OffreEnrolementGen.getTeamsLinkPlainEn.call(this); }
  getTeamsLinkHtmlFr() { return OffreEnrolementGen.getTeamsLinkHtmlFr.call(this); }
  getTeamsLinkHtmlEn() { return OffreEnrolementGen.getTeamsLinkHtmlEn.call(this); }
  getOffreLinksBlockPlain(lang: 'fr' | 'en') { return OffreEnrolementGen.getOffreLinksBlockPlain.call(this, lang); }
  getOffreLinksBlockHtml(lang: 'fr' | 'en') { return OffreEnrolementGen.getOffreLinksBlockHtml.call(this, lang); }
  getOffreEvenementsParticuliersPlainFr() { return OffreEnrolementGen.getOffreEvenementsParticuliersPlainFr.call(this); }
  getOffreEvenementsParticuliersPlainEn() { return OffreEnrolementGen.getOffreEvenementsParticuliersPlainEn.call(this); }
  getOffreEvenementsParticuliersHtmlFr() { return OffreEnrolementGen.getOffreEvenementsParticuliersHtmlFr.call(this); }
  getOffreEvenementsParticuliersHtmlEn() { return OffreEnrolementGen.getOffreEvenementsParticuliersHtmlEn.call(this); }
  getOffreNormaleEmailHtml() { return OffreEnrolementGen.getOffreNormaleEmailHtml.call(this); }
  getOffreEtudesSubventionneesEmailPlain() { return OffreEnrolementGen.getOffreEtudesSubventionneesEmailPlain.call(this); }
  getOffreEtudesSubventionneesEmailHtml() { return OffreEnrolementGen.getOffreEtudesSubventionneesEmailHtml.call(this); }
  private getRejectionPlainBodyFr() { return TaskRejectionsGen.getRejectionPlainBodyFr.call(this); }
  private getRejectionPlainBodyEn() { return TaskRejectionsGen.getRejectionPlainBodyEn.call(this); }
  getRappelCeremonieTeamsPlainFr() { return GdEmailBankGen.getRappelCeremonieTeamsPlainFr.call(this); }
  getRappelCeremonieTeamsPlainEn() { return GdEmailBankGen.getRappelCeremonieTeamsPlainEn.call(this); }
  getRappelCeremonieTeamsHtmlFr() { return GdEmailBankGen.getRappelCeremonieTeamsHtmlFr.call(this); }
  getRappelCeremonieTeamsHtmlEn() { return GdEmailBankGen.getRappelCeremonieTeamsHtmlEn.call(this); }
  getRappelCeremonieAddress() { return GdEmailBankGen.getRappelCeremonieAddress.call(this); }
  getRappelCeremonieSectionPlainFr() { return GdEmailBankGen.getRappelCeremonieSectionPlainFr.call(this); }
  getRappelCeremonieSectionPlainEn() { return GdEmailBankGen.getRappelCeremonieSectionPlainEn.call(this); }
  getRappelCeremonieSectionHtmlFr() { return GdEmailBankGen.getRappelCeremonieSectionHtmlFr.call(this); }
  getRappelCeremonieSectionHtmlEn() { return GdEmailBankGen.getRappelCeremonieSectionHtmlEn.call(this); }
  getRappelCeremonieEmailPlain() { return GdEmailBankGen.getRappelCeremonieEmailPlain.call(this); }
  getRappelCeremonieEmailHtml() { return GdEmailBankGen.getRappelCeremonieEmailHtml.call(this); }
  getTentativeOffreGdSectionPlainFr() { return GdEmailBankGen.getTentativeOffreGdSectionPlainFr.call(this); }
  getTentativeOffreGdSectionPlainEn() { return GdEmailBankGen.getTentativeOffreGdSectionPlainEn.call(this); }
  getTentativeOffreGdEmailPlain() { return GdEmailBankGen.getTentativeOffreGdEmailPlain.call(this); }
  getTentativeOffreGdSectionHtmlFr() { return GdEmailBankGen.getTentativeOffreGdSectionHtmlFr.call(this); }
  getTentativeOffreGdSectionHtmlEn() { return GdEmailBankGen.getTentativeOffreGdSectionHtmlEn.call(this); }
  getTentativeOffreGdEmailHtml() { return GdEmailBankGen.getTentativeOffreGdEmailHtml.call(this); }
  getVerificationCadetEmailPlain() { return GdEmailBankGen.getVerificationCadetEmailPlain.call(this); }
  getVerificationCadetEmailHtml() { return GdEmailBankGen.getVerificationCadetEmailHtml.call(this); }
  getBrisBailEntreposageSectionPlainFr() { return GdEmailBankGen.getBrisBailEntreposageSectionPlainFr.call(this); }
  getBrisBailEntreposageSectionPlainEn() { return GdEmailBankGen.getBrisBailEntreposageSectionPlainEn.call(this); }
  getBrisBailEntreposageEmailPlain() { return GdEmailBankGen.getBrisBailEntreposageEmailPlain.call(this); }
  getBrisBailEntreposageSectionHtmlFr() { return GdEmailBankGen.getBrisBailEntreposageSectionHtmlFr.call(this); }
  getBrisBailEntreposageSectionHtmlEn() { return GdEmailBankGen.getBrisBailEntreposageSectionHtmlEn.call(this); }
  getBrisBailEntreposageEmailHtml() { return GdEmailBankGen.getBrisBailEntreposageEmailHtml.call(this); }
  getDemandeNavTanEmailPlain() { return GdEmailBankGen.getDemandeNavTanEmailPlain.call(this); }
  getDemandeNavTanEmailHtml() { return GdEmailBankGen.getDemandeNavTanEmailHtml.call(this); }
  getDemandeAutorisationCspnEmailPlain() { return GdEmailBankGen.getDemandeAutorisationCspnEmailPlain.call(this); }
  getDemandeAutorisationCspnEmailHtml() { return GdEmailBankGen.getDemandeAutorisationCspnEmailHtml.call(this); }
  getDocumentsConjointDeFaitSectionPlainFr() { return GdEmailBankGen.getDocumentsConjointDeFaitSectionPlainFr.call(this); }
  getDocumentsConjointDeFaitSectionPlainEn() { return GdEmailBankGen.getDocumentsConjointDeFaitSectionPlainEn.call(this); }
  getDocumentsConjointDeFaitEmailPlain() { return GdEmailBankGen.getDocumentsConjointDeFaitEmailPlain.call(this); }
  getDocumentsConjointDeFaitSectionHtmlFr() { return GdEmailBankGen.getDocumentsConjointDeFaitSectionHtmlFr.call(this); }
  getDocumentsConjointDeFaitSectionHtmlEn() { return GdEmailBankGen.getDocumentsConjointDeFaitSectionHtmlEn.call(this); }
  getDocumentsConjointDeFaitEmailHtml() { return GdEmailBankGen.getDocumentsConjointDeFaitEmailHtml.call(this); }
  getDemandeSdpmConjointMilitaireEmailPlain() { return GdEmailBankGen.getDemandeSdpmConjointMilitaireEmailPlain.call(this); }
  getDemandeSdpmConjointMilitaireEmailHtml() { return GdEmailBankGen.getDemandeSdpmConjointMilitaireEmailHtml.call(this); }
  getTestEsomConfirmationEmailPlain() { return GdEmailBankGen.getTestEsomConfirmationEmailPlain.call(this); }
  getTestEsomConfirmationEmailHtml() { return GdEmailBankGen.getTestEsomConfirmationEmailHtml.call(this); }

  // Check if current selection triggers a specific Email Scenario
  activeEmailScenario = computed<EmailScenario | null>(() => GdOffreActionsHelper.computeActiveEmailScenario.call(this));
  getEmailSubject() { return GdEmailBankGen.getEmailSubject.call(this); }
  getCombinedPlainString(ignoreMerge: boolean = false) { return TaskRejectionsGen.getCombinedPlainString.call(this, ignoreMerge); }
  // Plain Text Version (for fallback)
  generatedEmailPlain = computed(() => {
    return this.getCombinedPlainString();
  });


  getCombinedRawHtmlString(ignoreMerge: boolean = false) { return TaskRejectionsGen.getCombinedRawHtmlString.call(this, ignoreMerge); }
  // HTML Version (for rich text display and Copy/Paste)
  generatedEmailHtml = computed((): SafeHtml => {
    const rawHtml = this.getCombinedRawHtmlString();
    return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
  });

  isPforCompliant = computed(() => {
    return this.selectedRole() === 'recruiter' && this.sharedState.isPostulantPfor() && this.allTasksCompliant();
  });

  generatedPforCaf101EmailHtml = computed((): SafeHtml => {
    return this.sanitizer.bypassSecurityTrustHtml(this.getCompliantPforEmailHtml());
  });

  generatedPforLienPaEmailHtml = computed((): SafeHtml => {
    return this.sanitizer.bypassSecurityTrustHtml(this.getCompliantPforLienPaEmailHtml());
  });

  getRejectionHtmlFr() { return TaskRejectionsGen.getRejectionHtmlFr.call(this); }
  getRejectionHtmlEn() { return TaskRejectionsGen.getRejectionHtmlEn.call(this); }
  exportToOutlook() { return TaskRejectionsGen.exportToOutlook.call(this); }
  exportToOutlookCaf101() { return TaskRejectionsGen.exportToOutlookCaf101.call(this); }
  exportToOutlookLienPa() { return TaskRejectionsGen.exportToOutlookLienPa.call(this); }
  copyNote() { return TaskRejectionsGen.copyNote.call(this); }
}