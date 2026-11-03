import { Task, DocumentItem, RejectionReason } from "../../services/recruitment-data.service";
import { JobEntry } from "../../services/jobs-data";

export function isSubsidizedEducationJob(this: any, job: JobEntry): boolean {
    if (!job) return false;
    const title = (job.title || "").toUpperCase();
    const titleEn = (job.titleEn || "").toUpperCase();
    const programs = (job.contracts || []).map((c) => (c.program || "").toUpperCase()).join(" ");
    const subKeywords = [
      "PFOR", "PFS-MR", "PFOEP", "PFUMR", "PIES-MR", "PMEP", "ESNEM",
      "PFDM", "PFMD", "UTPNCM", "ROTP", "NOCP", "MMTP", "SUBVENTION"
    ];
    if (subKeywords.some((kw) => title.includes(kw) || titleEn.includes(kw) || programs.includes(kw))) return true;
    return false;
  }

export function isSubsidizedDoc(this: any, doc: DocumentItem): boolean {
    const name = doc.nameFr;
    return (
      name.includes("Lettre d'admission") ||
      name.includes("Plan de cours") ||
      name.includes("Formulaire d'études subventionnées")
    );
  }

export function isTaskBasedAdditionalDoc(this: any, doc: DocumentItem): boolean {
    const name = doc.nameFr;
    return (
      name.includes("Relevé") ||
      name.includes("Relevés") ||
      name.includes("libération") ||
      name.includes("service antérieur")
    );
  }

export function shouldShowAdditionalDoc(this: any, doc: DocumentItem): boolean {
    if (this.isSubsidizedDoc(doc)) return true;
    if (this.isTaskBasedAdditionalDoc(doc)) return true;

    // Pour un postulant PFOR, les documents professionnels spécifiques aux métiers
    // (permis d'exercice, membre en règle, etc.) ne s'appliquent pas car il s'agit d'un programme d'études universitaires.
    if (this.isPforDossier()) {
      return false;
    }

    const jobs = this.getDossierJobObjects();
    if (jobs.length === 0) return false;

    const docName = doc.nameFr;

    const cvJobIds = [
      "00152", "00155", "00335", "00372", "00378", "00406", "00190", "00194",
      "00195", "00198", "00204", "00374", "00153", "00191", "00349", "00390", "00398"
    ];
    const permitJobIds = [
      "00149", "00161", "00214", "00152", "00153", "00190", "00191", "00194",
      "00195", "00198", "00204", "00335", "00372", "00374", "00390", "00393", "00406"
    ];
    const goodStandingJobIds = [
      "00152", "00153", "00190", "00191", "00194", "00198", "00204", "00335",
      "00372", "00374", "00390", "00393"
    ];
    const specialtyJobIds = [
      "00152", "00191", "00372", "00390", "00393", "00164", "00349"
    ];
    const experienceJobIds = [
      "00137", "00155", "00189", "00203", "00208", "00211", "00166", "00398", "00390"
    ];

    const hasCvJob = jobs.some((j) => cvJobIds.includes(j.id));
    const hasPermitJob = jobs.some((j) => permitJobIds.includes(j.id));
    const hasGoodStandingJob = jobs.some((j) => goodStandingJobIds.includes(j.id));
    const hasSpecialtyJob = jobs.some((j) => specialtyJobIds.includes(j.id));
    const hasExpJob = jobs.some((j) => experienceJobIds.includes(j.id));

    if (docName.includes("Curriculum vitae")) return hasCvJob;
    if (docName.includes("Permis d'exercice")) return hasPermitJob;
    if (docName.includes("Lettre de membre en règle")) return hasGoodStandingJob;
    if (docName.includes("Certificat / Attestation de spécialité")) return hasSpecialtyJob;
    if (docName.includes("Preuve d'expérience spécifique")) return hasExpJob;

    return false;
  }

export function isAdditionalDocRequiredForJob(this: any, docNameFr: string, jobId: string): boolean {
    if (this.isPforDossier()) {
      return false;
    }

    const cvJobIds = [
      "00152", "00155", "00335", "00372", "00378", "00406", "00190", "00194",
      "00195", "00198", "00204", "00374", "00153", "00191", "00349", "00390", "00398"
    ];
    const permitJobIds = [
      "00149", "00161", "00214", "00152", "00153", "00190", "00191", "00194",
      "00195", "00198", "00204", "00335", "00372", "00374", "00390", "00393", "00406"
    ];
    const goodStandingJobIds = [
      "00152", "00153", "00190", "00191", "00194", "00198", "00204", "00335",
      "00372", "00374", "00390", "00393"
    ];
    const specialtyJobIds = [
      "00152", "00191", "00372", "00390", "00393", "00164", "00349"
    ];
    const experienceJobIds = [
      "00137", "00155", "00189", "00203", "00208", "00211", "00166", "00398", "00390"
    ];

    if (docNameFr.includes("Curriculum vitae")) return cvJobIds.includes(jobId);
    if (docNameFr.includes("Permis d'exercice")) return permitJobIds.includes(jobId);
    if (docNameFr.includes("Lettre de membre en règle")) return goodStandingJobIds.includes(jobId);
    if (docNameFr.includes("Certificat / Attestation de spécialité")) return specialtyJobIds.includes(jobId);
    if (docNameFr.includes("Preuve d'expérience spécifique")) return experienceJobIds.includes(jobId);

    return false;
  }

export function getJobSpecificDocText(this: any, jobId: string, docNameFr: string, isFrench: boolean): string {
    if (docNameFr.includes("Curriculum vitae")) {
      if (jobId === "00191") {
        return isFrench
          ? "Curriculum vitae remontant jusqu’à de cinq ans quant à l’expérience en tant que dentiste."
          : "Curriculum vitae going back up to five years regarding experience as a dentist.";
      }
      return isFrench
        ? "Curriculum vitae (CV) récent à jour."
        : "Recent up-to-date Curriculum Vitae (CV).";
    }

    if (docNameFr.includes("Permis d'exercice")) {
      if (jobId === "00149" || jobId === "00161" || jobId === "00214") {
        return isFrench
          ? "Détenir un permis de conduire provincial/territorial en règle."
          : "Hold a valid provincial/territorial driver’s license.";
      }
      if (jobId === "00152") {
        return isFrench
          ? "Fournir un permis ou inscription sans restriction (statut actif) délivré par l’autorité de réglementation provinciale ou territoriale OU une Lettre de conformité (« Good Standing ») émise par l’autorité de réglementation."
          : "Provide an unrestricted license or registration (active status) issued by the provincial or territorial regulatory authority OR a Letter of Good Standing issued by the regulatory authority.";
      }
      if (jobId === "00153") {
        return isFrench
          ? "Fournir soit un permis, une certification ou autorisation sans restriction d’exercer comme technologue en radiation médicale (en règle et en vigueur) provenant d’un organisme de réglementation provincial/territorial reconnu OU la certification d’une association professionnelle ayant conclu une entente réciproque avec l’Association canadienne des technologues en radiation médicale (ACTRM)."
          : "Provide either an unrestricted license, certification, or practice permit to practice as a medical radiation technologist (in good standing and active) from a recognized provincial/territorial regulatory body OR certification from a professional association with a reciprocal agreement with CAMRT.";
      }
      if (jobId === "00190") {
        return isFrench
          ? "Permis/licence d’exercice en règle (à titre actif) en tant que physiothérapeute émis par un organisme de réglementation provincial ou territorial."
          : "Valid (active) license/permit to practice as a physiotherapist issued by a provincial or territorial regulatory body.";
      }
      if (jobId === "00191") {
        return isFrench
          ? "Autorisation en règle et sans restriction d’exercer la Médecine dentaire de la part d’une autorité réglementaire d’une province/d’un territoire du Canada."
          : "Valid and unrestricted license/permit to practice Dentistry from a provincial/territorial regulatory authority in Canada.";
      }
      if (jobId === "00194") {
        return isFrench
          ? "Permis d’exercice de la pharmacie sans restriction en règle."
          : "Valid unrestricted license to practice pharmacy.";
      }
      if (jobId === "00195") {
        return isFrench
          ? "Permis d’exercice en règle (état actif) en soins infirmiers en tant qu’infirmier autorisé ou infirmier en pratique octroyé par un organisme de réglementation provincial ou territorial du Canada."
          : "Valid (active state) nursing practice license as a registered nurse or practical nurse issued by a provincial or territorial regulatory body in Canada.";
      }
      if (jobId === "00198") {
        return isFrench
          ? "Permis en règle et sans restriction (état actif) d’exercer comme travailleur social, délivré par une autorité / association réglementaire provinciale ou territoriale."
          : "Valid and unrestricted license/permit (active state) to practice as a social worker issued by a provincial or territorial regulatory authority/association.";
      }
      if (jobId === "00204") {
        return isFrench
          ? "Autorisé à pratiquer le droit dans une province canadienne ou un territoire canadien."
          : "Authorized to practice law in a Canadian province or territory.";
      }
      if (jobId === "00335") {
        return isFrench
          ? "Fournir une preuve de permis en règle pour agir en tant qu’assistant dentaire délivré par une autorité de réglementation canadienne provinciale ou territoriale."
          : "Provide proof of a valid registration/license as a dental assistant issued by a Canadian provincial or territorial regulatory authority.";
      }
      if (jobId === "00372") {
        return isFrench
          ? "Fournir une preuve de détention d’une autorisation en règle de travailler comme infirmier auxiliaire autorisé/immatriculé émise par un organisme de réglementation provincial ou territorial."
          : "Provide proof of holding a valid registration/license as a licensed/registered practical nurse issued by a provincial or territorial regulatory authority.";
      }
      if (jobId === "00374") {
        return isFrench
          ? "Certificat en règle du Conseil de certification des adjoints au médecin du Canada (CCAMC) et permis/licence en règle (en vigueur) d’exercer comme adjoint au médecin délivré(e) par une autorité réglementaire d’une province ou d’un territoire du Canada."
          : "Valid certification from the Physician Assistant Certification Council of Canada (PACCC) and a valid active license to practice as a physician assistant issued by a provincial or territorial regulatory authority of Canada.";
      }
      if (jobId === "00390") {
        return isFrench
          ? "Permis d’exercice valide et sans restriction pour pratiquer la médecine à titre de spécialiste (selon la spécialité) dans toute province ou tout territoire du Canada."
          : "Valid and unrestricted license to practice medicine as a specialist (according to the specialty) in any province or territory of Canada.";
      }
      if (jobId === "00393") {
        return isFrench
          ? "Détenir une Autorisation en règle et sans restriction d’exercer la Médecine en tant que médecin de famille dans une province ou un territoire du Canada."
          : "Hold a valid and unrestricted license to practice Family Medicine in a province or territory of Canada.";
      }
      if (jobId === "00406") {
        return isFrench
          ? "Fournir une preuve d'inscription actuelle ou en cours au permis ou privilèges hospitaliers de base ou certification en vigueur pour exercer à titre de paramédical(e), délivrés par un organisme de réglementation provincial ou territorial canadien."
          : "Provide proof of current registration/licensure or active base hospital standard privileges or certification to practice as a paramedic, issued by a Canadian provincial or territorial regulatory authority.";
      }
      return isFrench
        ? "Permis d'exercice ou licence professionnelle sans restriction."
        : "Unrestricted practice permit or professional license.";
    }

    if (docNameFr.includes("Lettre de membre en règle")) {
      if (jobId === "00190") {
        return isFrench
          ? "Lettre de l’organisme de réglementation du candidat attestant que ce dernier est « En règle »."
          : "Letter from the candidate's regulatory body confirming they are \"In good standing\".";
      }
      if (jobId === "00191") {
        return isFrench
          ? "Lettre de l’autorité réglementaire professionnelle attestant que le candidat est en règle."
          : "Letter from the professional regulatory authority confirming that the candidate is in good standing.";
      }
      if (jobId === "00204") {
        return isFrench
          ? "Être « membre en règle », en exercice ou non, du Barreau d'une province ou d’un territoire."
          : "Be a \"member in good standing\", practicing or non-practicing, of the Bar of a province or territory.";
      }
      if (jobId === "00374") {
        return isFrench
          ? "Lettre de l’autorité professionnelle réglementaire ou de son superviseur en clinique, selon le cas, attestant que le candidat est en règle."
          : "Letter from the professional regulatory authority or clinical supervisor, as applicable, confirming that the candidate is in good standing.";
      }
      if (jobId === "00390") {
        return isFrench
          ? "Attestation de bonne conduite professionnelle délivrée par l’organisme de réglementation provincial ou territorial du candidat."
          : "Certificate of professional good standing issued by the candidate’s provincial or territorial regulatory body.";
      }
      if (jobId === "00393") {
        return isFrench
          ? "Lettre des autorités de réglementation de la province/territoire du candidat attestant que ce dernier est « en règle »."
          : "Letter from the regulatory authorities of the candidate’s province/territory confirming that the candidate is in \"good standing\".";
      }
      return isFrench
        ? "Fournir une lettre de l'organisme de réglementation de la profession du candidat attestant que ce dernier est « en règle »."
        : "Provide a letter from the professional regulatory body confirming that the candidate is in good standing.";
    }

    if (docNameFr.includes("Certificat / Attestation de spécialité")) {
      if (jobId === "00152") {
        return isFrench
          ? "Fournir soit la certification de la Société canadienne de science de laboratoire médical (SCSLM) OU la certification de l'alliance canadienne des organismes de réglementation des professionnels de laboratoire médical (ACORPLM), incluant la réussite des examens du «TLM généraliste»."
          : "Provide either the certification from the Canadian Society for Medical Laboratory Science (CSMLS) OR the certification from the Canadian Alliance of Medical Laboratory Professionals Regulators (CAMLPR), including successfully passing the 'General MLT' exams.";
      }
      if (jobId === "00191") {
        return isFrench
          ? "Certificat du Bureau national d’examen dentaire du Canada (BNED)."
          : "Certificate from the National Dental Examining Board of Canada (NDEB).";
      }
      if (jobId === "00349") {
        return isFrench
          ? "Accrédité et reconnu comme un leader au sein d’une tradition de foi par l’autorité de gouvernance de cette même tradition de foi qui exerce une supervision au Canada, et tel que recommandé par le membre désigné du CIAMC. Avoir été endossé comme aumônier par le CIAMC. Avoir réussi une entrevue et jugé apte par un comité présidé par le D Svc Aum."
          : "Accredited and recognized as a faith group leader by the governing authority of that faith group which exercises supervision in Canada, and as recommended by the ICCDF. Be endorsed as a chaplain by the ICCDF. Successfully pass an interview and be deemed suitable by a committee chaired by the D Chap Svc.";
      }
      if (jobId === "00372") {
        return isFrench
          ? "Fournir une preuve de certification comme infirmier auxiliaire autorisé/immatriculé en soins peropératoires."
          : "Provide proof of certification as a licensed/registered practical nurse in perioperative care.";
      }
      if (jobId === "00390") {
        return isFrench
          ? "Achèvement d’une formation spécialisée dans un programme de résidence agréé par le Collège royal des médecins et chirurgiens du Canada, et Certification et titre de fellow du Collège royal des médecins et chirurgiens du Canada dans l’une des spécialités médicales requises."
          : "Completion of specialized training in a residency program accredited by the Royal College of Physicians and Surgeons of Canada, and Certification and fellowship designation from the Royal College of Physicians and Surgeons of Canada in one of the required specialties.";
      }
      if (jobId === "00393") {
        return isFrench
          ? "Certification en médecine familiale du Collège des médecins de famille du Canada."
          : "Certification in Family Medicine from the College of Family Physicians of Canada.";
      }
      return isFrench
        ? "Certificat ou attestation officielle de spécialité (BNED, CCAMC, Collège Royal, etc.)"
        : "Official specialty certificate or attestation (NDEB, CACMS, Royal College, etc.)";
    }

    if (docNameFr.includes("Preuve d'expérience spécifique")) {
      if (jobId === "00137") {
        return isFrench
          ? "Expérience dans un ou plusieurs des domaines suivants : photographie, photojournalisme, conception graphique ou multimédia."
          : "Experience in one or more of the following fields: photography, photojournalism, graphic design, or multimedia.";
      }
      if (jobId === "00155") {
        return isFrench
          ? "A travaillé en tant que technologue en électronique biomédicale pendant une période totale d’au moins six (6) mois au cours des deux (2) dernières années."
          : "Had worked as a biomedical electronics technologist for a total period of at least six (6) months within the last two (2) years.";
      }
      if (jobId === "00189") {
        return isFrench
          ? "Au moins trois mois d'expérience pertinente dans un ou plusieurs des domaines suivants : industrie de la construction, gestion des installations, services d'incendies, services de l'environnement, géomatique, gestion de projet, service militaire."
          : "At least three months of relevant experience in one or more of the following fields: construction industry, facility management, fire services, environmental services, geomatics, project management, military service.";
      }
      if (jobId === "00203") {
        return isFrench
          ? "Fournir une preuve d’au moins une (1) année d’expérience cumulative dans deux ou plusieurs des domaines suivants : communications, journalisme, commercialisation, affaires publiques, relations publiques, recherche sur l'opinion publique, médias numériques ou sociaux."
          : "Provide proof of at least one (1) year of cumulative experience in two or more of the following fields: communications, journalism, marketing, public affairs, public relations, public opinion research, digital or social media.";
      }
      if (jobId === "00208") {
        return isFrench
          ? "Au moins une ou plusieurs années de travail à temps plein dans un ou plusieurs des domaines suivants : sélection, recrutement (RH), recherche en sciences sociales, orientation scolaire/professionnelle."
          : "At least one or more years of full-time work in one or more of the following fields: selection, recruitment (HR), social science research, academic/career counseling.";
      }
      if (jobId === "00211") {
        return isFrench
          ? "Fournir une preuve d’au moins trois (3) ans cumulatifs d’expérience à temps plein dans l’un ou plusieurs des domaines suivants : élaboration d’un programme d’études, expert-conseil en éducation, conception de l’instruction, formation du personnel, enseignement/instruction, expert-conseil en instruction, développement de l’instruction."
          : "Provide proof of at least three (3) cumulative years of full-time experience in one or more of the following fields: curriculum development, education consultant, instructional design, staff training, teaching/instruction, instructional consultant, instructional development.";
      }
      if (jobId === "00166") {
        return isFrench
          ? "Fournir une preuve d’expérience comme musicien professionnel dans une variété d’ensembles et dans divers styles de musique, p. ex. à titre de musicien travaillant à son propre compte, ou à temps plein avec une orchestre, un ensemble ou un groupe de musique local."
          : "Provide proof of experience as a professional musician in a variety of ensembles and in various styles of music, e.g. as a self-employed musician, or full-time with a local orchestra, ensemble, or music group.";
      }
      if (jobId === "00390") {
        return isFrench
          ? "Pour toutes les spécialités (à l’exception de la psychiatrie et de la médecine physique et réadaptation) : Être employé à temps plein dans un poste clinique au sein d’un établissement de soins de santé civil."
          : "For all specialties, except psychiatry and physical medicine and rehabilitation (physiatry): Be employed full-time in a clinical position within a civilian healthcare facility.";
      }
      if (jobId === "00398") {
        return isFrench
          ? "Un minimum de deux années d’expérience cumulative en gestion à temps plein au cours des cinq dernières années dans un milieu de soins de santé."
          : "A minimum of two years of cumulative full-time management experience within the last five years in a healthcare setting.";
      }
      return isFrench
        ? "Preuve d'expérience spécifique (gestion, portfolio, accréditation)."
        : "Proof of specific experience (management, portfolio, accreditation).";
    }

    return isFrench ? docNameFr : docNameFr;
  }

export function getDisplayLabelForAdditionalDoc(this: any, doc: DocumentItem, reason: RejectionReason): string {
    const dossierJobs = this.getDossierJobObjects();
    if (dossierJobs.length > 0) {
      const matchingJobs = dossierJobs.filter((j) =>
        this.isAdditionalDocRequiredForJob(doc.nameFr, j.id)
      );
      if (matchingJobs.length > 0) {
        const texts = matchingJobs.map((j) =>
          this.getJobSpecificDocText(j.id, doc.nameFr, true)
        );
        const uniqueTexts = Array.from(new Set(texts));
        return uniqueTexts.join(" — ");
      }
    }
    return reason.labelFr;
  }

export function hasVisibleTaskBasedDocs(this: any, task: Task): boolean {
    if (!task || !task.documents) return false;
    return task.documents.some((d) => this.isTaskBasedAdditionalDoc(d) && this.shouldShowDoc(task, d));
  }

export function hasVisibleAdditionalDocs(this: any, task: Task): boolean {
    if (!task || !task.documents) return false;
    if (this.isPforDossier()) return false;
    const dossierJobs = this.getDossierJobObjects();
    if (dossierJobs.length === 0) return false;
    return dossierJobs.some((j) => this.hasJobAdditionalDocs(task, j));
  }

export function hasJobAdditionalDocs(this: any, task: Task, job: JobEntry): boolean {
    if (!task || !task.documents || !job) return false;
    if (this.isPforDossier()) return false;
    return task.documents.some(
      (d) =>
        !this.isSubsidizedDoc(d) &&
        !this.isTaskBasedAdditionalDoc(d) &&
        this.isAdditionalDocRequiredForJob(d.nameFr, job.id) &&
        this.shouldShowDoc(task, d)
    );
  }

export function hasVisibleSubsidizedDocs(this: any, task: Task): boolean {
    if (!task || !task.documents) return false;
    return task.documents.some((d) => this.isSubsidizedDoc(d) && this.shouldShowDoc(task, d));
  }

export function getDossierJobsSummaryTextFr(this: any): string {
    const jobs = this.getDossierJobObjects();
    if (jobs.length === 0) return "";
    return jobs.map((j) => `${j.title} (${j.id})`).join(", ");
  }

export function getDossierJobsSummaryTextEn(this: any): string {
    const jobs = this.getDossierJobObjects();
    if (jobs.length === 0) return "";
    return jobs.map((j) => `${j.titleEn || j.title} (${j.id})`).join(", ");
  }

