import { Injectable, inject } from "@angular/core";
import { JobDatabaseService } from "./job-database.service";
import { JobEntry } from "./jobs-data";
import { JOB_URLS } from "../app/data/job-urls.data";

@Injectable({
  providedIn: "root",
})
export class PforEmailService {
  private jobService = inject(JobDatabaseService);

  getPforJobLinkMarkup(jobId: string, isFrench: boolean, isHtml: boolean): string {
    const job = this.jobService.getJobById(jobId);
    const titleText = isFrench
      ? `${job?.title || 'Métier'} (${jobId})`
      : `${job?.titleEn || job?.title || 'Trade'} (${jobId})`;
    const customUrl = JOB_URLS[jobId];
    if (customUrl) {
      if (isHtml) {
        return `<a href="${customUrl}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">${titleText}</a>`;
      } else {
        return `${titleText} (${customUrl})`;
      }
    }
    if (job) {
      const fallbackUrl = isFrench ? 'https://forces.ca/fr/carrieres/' : 'https://forces.ca/en/careers/';
      if (isHtml) {
        return `<a href="${fallbackUrl}" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">${titleText}</a>`;
      } else {
        return `${titleText} (${fallbackUrl})`;
      }
    }
    return titleText;
  }

  getPforCaf101HighDemandWarningHtml(lang: 'fr' | 'en', dossierJobs: JobEntry[]): string {
    const highDemandJobs = dossierJobs.filter(
      (j) => j.id !== '00003' && this.jobService.isJobInGestionDesAttentes(j.id)
    );
    if (highDemandJobs.length === 0) return '';
    let html = '';
    if (lang === 'fr') {
      html += `<p>Sachez que parmi les métiers que vous avez sélectionnés, dans votre demande d'enrôlement, figurent les suivants :</p>`;
      html += `<ul style="margin-top: 5px; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
      for (const j of highDemandJobs) {
        html += `  <li style="margin-bottom: 5px;"><strong>${j.title} (${j.id})</strong></li>`;
      }
      html += `</ul>`;
      html += `<p>Nous souhaitons vous informer que ce ou ces métiers suscitent actuellement un très grand nombre de candidatures. Par conséquent, il est possible que votre dossier ne soit pas traité pour ces choix en raison de la forte concurrence et des dossiers déjà actuellement en traitement.</p>`;
      html += `<p>En tenant compte de cette situation, vous pouvez soit maintenir ce ou ces choix, soit consulter les autres possibilités offertes par les Collèges militaires du Canada en utilisant le lien suivant :<br>`;
      html += `<a href="https://www.cmrsj-rmcsj.forces.gc.ca/fe-fs/brochure/brochure-fra.asp#occu" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Liste des programmes admissibles par métier</a></p>`;
      html += `<p style="margin-bottom: 20px;">Nous vous invitons à nous faire part de votre décision dans les meilleurs délais afin de poursuivre le traitement de votre dossier.</p>`;
    } else {
      html += `<p>Please be aware that among the occupations you have selected in your enrolment application are the following:</p>`;
      html += `<ul style="margin-top: 5px; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
      for (const j of highDemandJobs) {
        html += `  <li style="margin-bottom: 5px;"><strong>${j.titleEn || j.title} (${j.id})</strong></li>`;
      }
      html += `</ul>`;
      html += `<p>We would like to inform you that this occupation / these occupations are currently receiving a very large number of applications. Consequently, it is possible that your file may not be processed for these choices due to strong competition and the files currently in processing.</p>`;
      html += `<p>Considering this situation, you may either maintain this choice / these choices or explore the other opportunities offered by the Canadian Military Colleges using the following link:<br>`;
      html += `<a href="https://www.cmrsj-rmcsj.forces.gc.ca/fe-fs/brochure/brochure-eng.asp#occu" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">List of Eligible Programs by Occupation</a></p>`;
      html += `<p style="margin-bottom: 20px;">We invite you to let us know your decision as soon as possible in order to continue processing your application.</p>`;
    }
    return html;
  }

  getPforCaf101HighDemandWarningPlain(lang: 'fr' | 'en', dossierJobs: JobEntry[]): string {
    const highDemandJobs = dossierJobs.filter(
      (j) => j.id !== '00003' && this.jobService.isJobInGestionDesAttentes(j.id)
    );
    if (highDemandJobs.length === 0) return '';
    let plain = '';
    if (lang === 'fr') {
      plain += `Sachez que parmi les métiers que vous avez sélectionnés, dans votre demande d'enrôlement, figurent les suivants :\n`;
      for (const j of highDemandJobs) {
        plain += `• ${j.title} (${j.id})\n`;
      }
      plain += `\nNous souhaitons vous informer que ce ou ces métiers suscitent actuellement un très grand nombre de candidatures. Par conséquent, il est possible que votre dossier ne soit pas traité pour ces choix en raison de la forte concurrence et des dossiers déjà actuellement en traitement.\n\n`;
      plain += `En tenant compte de cette situation, vous pouvez soit maintenir ce ou ces choix, soit consulter les autres possibilités offertes par les Collèges militaires du Canada en utilisant le lien suivant :\n`;
      plain += `Liste des programmes admissibles par métier (https://www.cmrsj-rmcsj.forces.gc.ca/fe-fs/brochure/brochure-fra.asp#occu)\n\n`;
      plain += `Nous vous invitons à nous faire part de votre décision dans les meilleurs délais afin de poursuivre le traitement de votre dossier.\n\n`;
    } else {
      plain += `Please be aware that among the occupations you have selected in your enrolment application are the following:\n`;
      for (const j of highDemandJobs) {
        plain += `• ${j.titleEn || j.title} (${j.id})\n`;
      }
      plain += `\nWe would like to inform you that this occupation / these occupations are currently receiving a very large number of applications. Consequently, it is possible that your file may not be processed for these choices due to strong competition and the files currently in processing.\n\n`;
      plain += `Considering this situation, you may either maintain this choice / these choices or explore the other opportunities offered by the Canadian Military Colleges using the following link:\n`;
      plain += `List of Eligible Programs by Occupation (https://www.cmrsj-rmcsj.forces.gc.ca/fe-fs/brochure/brochure-eng.asp#occu)\n\n`;
      plain += `We invite you to let us know your decision as soon as possible in order to continue processing your application.\n\n`;
    }
    return plain;
  }

  getCompliantPforEmailHtml(
    dossierJobs: JobEntry[],
    nonMandatoryTasksHtmlFr: string,
    nonMandatoryTasksHtmlEn: string,
    signatureHtmlFr: string,
    signatureHtmlEn: string
  ): string {
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;
    const filteredJobs = dossierJobs.filter((j) => j.id !== '00003');

    // --- FRENCH BLOCK ---
    html += `<p><span style="background-color: #FFFF00; font-weight: bold;">English message will follow.</span></p>`;
    html += `<p>Bonjour,</p>`;
    html += `<p>Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.<br>`;
    html += `Afin de pouvoir continuer votre processus, vous devrez <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">OBLIGATOIREMENT</span> :</p>`;

    html += `<p style="margin-bottom: 5px;"><strong>1- Vous informer :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    html += `  <li style="margin-bottom: 5px;">Regarder et comprendre le contenu de la présentation suivante : <a href="https://www.youtube.com/watch?v=UaCQUp-_ZUc" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Présentation Forces 101</a></li>`;
    if (filteredJobs.length > 0) {
      const jobLinksFr = filteredJobs.map((j) => this.getPforJobLinkMarkup(j.id, true, true)).join(', ');
      html += `  <li style="margin-bottom: 5px;">Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits : ${jobLinksFr}</li>`;
    } else {
      html += `  <li style="margin-bottom: 5px;">Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits <a href="https://forces.ca/fr/carrieres/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Carrières | Forces armées canadiennes</a></li>`;
    }
    html += `  <li style="margin-bottom: 5px;">Explorer la section <a href="https://www.cmrsj-rmcsj.forces.gc.ca/fe-fs/faq-faq/faq-faq-fra.asp" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Foire aux Questions</a> du site internet du Collège militaire royal de Saint-Jean</li>`;
    html += `  <li style="margin-bottom: 5px;">Explorer la <a href="https://www.youtube.com/@cmrsjrmcsj" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">chaîne Youtube</a> du Collège militaire royal de Saint-Jean</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 5px;"><strong>2- Vous assurer que toutes les tâches sur votre portail sont complétées :</strong></p>`;
    html += `<p style="margin-top: 0; margin-bottom: 15px;">Veuillez vous connecter à votre portail afin de vous assurer que toutes les tâches sont complétées : <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Lien vers le Portail d'enrôlement des Forces armées canadiennes</a></p>`;

    html += `<p style="margin-bottom: 5px;"><strong>3- Si vous êtes un athlète de haut-niveau, vous pouvez vous rendre sur les sites internets des équipes sportives :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    html += `  <li style="margin-bottom: 5px;">Équipes du CMR Saint-Jean, les Remparts : <a href="https://gorempartsgo.ca" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">gorempartsgo.ca</a></li>`;
    html += `  <li style="margin-bottom: 5px;">Équipes du CMR du Canada situé à Kingston, les Paladins: <a href="https://gopaladinsgo.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Royal Military College of Canada - Official Athletics Website</a></li>`;
    html += `</ul>`;

    html += `<p>Si vous êtes un athlète de haut-niveau, il est possible pour vous de communiquer avec l’une des équipes pour vous informer au sujet des différentes équipes et des sélections de ces équipes. Pour savoir avec laquelle des équipes communiquer, n’hésitez pas à poser la question au centre de recrutement qui traite votre dossier.</p>`;

    if (nonMandatoryTasksHtmlFr) {
      html += nonMandatoryTasksHtmlFr;
    }

    html += this.getPforCaf101HighDemandWarningHtml('fr', filteredJobs);

    html += `<p style="margin-bottom: 5px;"><span style="background-color: #00FF00; font-weight: bold;">Journée portes ouvertes et visites - Futurs étudiants - Collège militaire royal de Saint-Jean</span></p>`;
    html += `<p>Nous vous invitons à profiter de la <span style="background-color: #00FF00;">journée portes ouvertes du Collège militaire royal de Saint-Jean</span>, qui se tiendra le <span style="background-color: #00FF00; font-weight: bold;">31 octobre 2026 de 8 h 30 à 16 h</span>. <span style="background-color: #00FF00;">Aucune inscription n'est nécessaire</span>.<br>Venez découvrir le milieu de vie des aspirants de marine et élèves-officiers, visiter les installations du Collège et rencontrer les professeurs, les aspirants de marine et élèves-officiers ainsi que les recruteurs qui seront disponibles pour répondre à vos questions.<br>Des visites guidées d'environ 60 minutes sont offertes en continu tout au long de la journée, vous permettant d'arriver au moment qui vous convient le mieux.<br>Nous espérons avoir l'occasion de vous accueillir et de vous faire découvrir tout ce que le Collège militaire royal de Saint-Jean peut vous offrir dans le cadre de votre futur parcours académique et militaire.</p>`;

    html += `<p>Si vous ne prenez aucune action dans votre portail, votre dossier fermera automatiquement dans 30 jours.</p>`;
    html += `<p>` + signatureHtmlFr + `</p>`;
    html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;

    // --- ENGLISH BLOCK ---
    html += `<p>Hello,</p>`;
    html += `<p>Thank you very much for providing your documents and selecting your preferred occupation.<br>`;
    html += `In order to continue your application process, You will be <span style="background-color: #00FF00; font-weight: bold; padding: 0 4px;">REQUIRED</span> to:</p>`;

    html += `<p style="margin-bottom: 5px;"><strong>1- Inform yourself :</strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    html += `  <li style="margin-bottom: 5px;">Watch and understand the content of the following presentation: <a href="https://www.youtube.com/watch?v=nGGLc_Ynr-I" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Forces 101 Presentation</a></li>`;
    if (filteredJobs.length > 0) {
      const jobLinksEn = filteredJobs.map((j) => this.getPforJobLinkMarkup(j.id, false, true)).join(', ');
      html += `  <li style="margin-bottom: 5px;">Watch the video and review the description of the trade(s) you are registered for : ${jobLinksEn}</li>`;
    } else {
      html += `  <li style="margin-bottom: 5px;">Watch the video and review the description of the trade(s) you are registered for. <a href="https://forces.ca/en/careers/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Careers | Canadian Armed Forces</a></li>`;
    }
    html += `  <li style="margin-bottom: 5px;">Explore the <a href="https://www.cmrsj-rmcsj.forces.gc.ca/fe-fs/faq-faq/faq-faq-eng.asp" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Frequently Asked Questions</a> section of the Royal Military College Saint-Jean</li>`;
    html += `  <li style="margin-bottom: 5px;">Explore the <a href="https://www.youtube.com/@cmrsjrmcsj" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Youtube Channel</a> of the Royal Military College Saint-Jean</li>`;
    html += `</ul>`;

    html += `<p style="margin-bottom: 5px;"><strong>2- Ensure all tasks on your portal are completed:</strong></p>`;
    html += `<p style="margin-top: 0; margin-bottom: 15px;">Please log in to your portal to verify and ensure that all required tasks are completed: <a href="https://www.cafoap-pclfac.forces.gc.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Canadian Armed Forces Enrolment Portal link</a></p>`;

    html += `<p style="margin-bottom: 5px;"><strong>3- If you are a high-level athlete, you can visit the websites of sports teams: </strong></p>`;
    html += `<ul style="margin-top: 0; margin-bottom: 15px; list-style-type: disc; padding-left: 20px;">`;
    html += `  <li style="margin-bottom: 5px;">RMC Saint-Jean Sports teams Les Remparts: <a href="https://gorempartsgo.ca" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">gorempartsgo.ca</a></li>`;
    html += `  <li style="margin-bottom: 5px;">RMC of Canada located in Kingston Sports teams The Paladins: <a href="https://gopaladinsgo.ca/" target="_blank" style="color: #4f46e5; text-decoration: underline; font-weight: 500;">Royal Military College of Canada - Official Athletics Website</a></li>`;
    html += `</ul>`;

    html += `<p>If you are a high-performance athlete, you may contact one of the teams to learn more about the different teams and their selection processes. If you are unsure which team to contact, please do not hesitate to ask the recruiting centre handling your application.</p>`;

    if (nonMandatoryTasksHtmlEn) {
      html += nonMandatoryTasksHtmlEn;
    }

    html += this.getPforCaf101HighDemandWarningHtml('en', filteredJobs);

    html += `<p style="margin-bottom: 5px;"><span style="background-color: #00FF00; font-weight: bold;">Open House and Visits - Future Students - Royal Military College Saint-Jean</span></p>`;
    html += `<p>We invite you to take advantage of the <span style="background-color: #00FF00;">Royal Military College Saint-Jean Open House</span>, which will be held on <span style="background-color: #00FF00; font-weight: bold;">October 31, 2026, from 8:30 a.m. to 4:00 p.m.</span> <span style="background-color: #00FF00;">No registration is required</span>.<br>Come and discover the life of naval cadets and officer cadets, tour the College facilities, and meet professors, naval cadets and officer cadets, as well as recruiters who will be available to answer your questions.<br>Guided tours of approximately 60 minutes are offered continuously throughout the day, allowing you to arrive at whatever time suits you best.<br>We hope to have the opportunity to welcome you and show you everything that Royal Military College Saint-Jean has to offer as part of your future academic and military journey.</p>`;

    html += `<p>If no action is taken in your portal, your file will automatically close within 30 days.</p>`;
    html += `<p>` + signatureHtmlEn + `</p>`;
    html += `</div>`;
    return html;
  }

  getCompliantPforEmailPlain(
    dossierJobs: JobEntry[],
    nonMandatoryTasksFr: string,
    nonMandatoryTasksEn: string,
    signaturePlainFr: string,
    signaturePlainEn: string
  ): string {
    let plain = "";
    const filteredJobs = dossierJobs.filter((j) => j.id !== '00003');

    // --- FRENCH ---
    plain += `English message will follow.\n\n`;
    plain += `Bonjour,\n\n`;
    plain += `Merci beaucoup d’avoir fourni vos documents et fait votre choix de profession.\n`;
    plain += `Afin de pouvoir continuer votre processus, vous devrez OBLIGATOIREMENT :\n\n`;
    plain += `1- Vous informer :\n`;
    plain += `• Regarder et comprendre le contenu de la présentation suivante : Présentation Forces 101 (https://www.youtube.com/watch?v=UaCQUp-_ZUc)\n`;
    if (filteredJobs.length > 0) {
      const jobLinksFr = filteredJobs.map((j) => this.getPforJobLinkMarkup(j.id, true, false)).join(', ');
      plain += `• Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits : ${jobLinksFr}\n`;
    } else {
      plain += `• Regarder la vidéo et description du ou des métier/s pour lesquels vous êtes inscrits Carrières | Forces armées canadiennes (https://forces.ca/fr/carrieres/)\n`;
    }
    plain += `• Explorer la section Foire aux Questions du site internet du Collège militaire royal de Saint-Jean (https://www.cmrsj-rmcsj.forces.gc.ca/fe-fs/faq-faq/faq-faq-fra.asp)\n`;
    plain += `• Explorer la chaîne Youtube du Collège militaire royal de Saint-Jean (https://www.youtube.com/@cmrsjrmcsj)\n\n`;
    plain += `2- Vous assurer que toutes les tâches sur votre portail sont complétées :\n`;
    plain += `Veuillez vous connecter à votre portail afin de vous assurer que toutes les tâches sont complétées : Lien vers le Portail d'enrôlement des Forces armées canadiennes (https://www.cafoap-pclfac.forces.gc.ca/)\n\n`;
    plain += `3- Si vous êtes un athlète de haut-niveau, vous pouvez vous rendre sur les sites internets des équipes sportives :\n`;
    plain += `• Équipes du CMR Saint-Jean, les Remparts : gorempartsgo.ca (https://gorempartsgo.ca)\n`;
    plain += `• Équipes du CMR du Canada situé à Kingston, les Paladins: Royal Military College of Canada - Official Athletics Website (https://gopaladinsgo.ca/)\n\n`;
    plain += `Si vous êtes un athlète de haut-niveau, il est possible pour vous de communiquer avec l’une des équipes pour vous informer au sujet des différentes équipes et des sélections de ces équipes. Pour savoir avec laquelle des équipes communiquer, n’hésitez pas à poser la question au centre de recrutement qui traite votre dossier.\n\n`;

    if (nonMandatoryTasksFr) {
      plain += `${nonMandatoryTasksFr}\n\n`;
    }

    plain += this.getPforCaf101HighDemandWarningPlain('fr', filteredJobs);
    plain += `Journée portes ouvertes et visites - Futurs étudiants - Collège militaire royal de Saint-Jean\n`;
    plain += `Nous vous invitons à profiter de la journée portes ouvertes du Collège militaire royal de Saint-Jean, qui se tiendra le 31 octobre 2026 de 8 h 30 à 16 h. Aucune inscription n'est nécessaire.\nVenez découvrir le milieu de vie des aspirants de marine et élèves-officiers, visiter les installations du Collège et rencontrer les professeurs, les aspirants de marine et élèves-officiers ainsi que les recruteurs qui seront disponibles pour répondre à vos questions.\nDes visites guidées d'environ 60 minutes sont offertes en continu tout au long de la journée, vous permettant d'arriver au moment qui vous convient le mieux.\nNous espérons avoir l'occasion de vous accueillir et de vous faire découvrir tout ce que le Collège militaire royal de Saint-Jean peut vous offrir dans le cadre de votre futur parcours académique et militaire.\n\n`;
    plain += `Si vous ne prenez aucune action dans votre portail, votre dossier fermera automatiquement dans 30 jours.\n\n`;
    plain += signaturePlainFr;
    plain += `\n\n______________________________________________________________________________\n\n`;

    // --- ENGLISH ---
    plain += `Hello,\n\n`;
    plain += `Thank you very much for providing your documents and selecting your preferred occupation.\n`;
    plain += `In order to continue your application process, You will be REQUIRED to:\n\n`;
    plain += `1- Inform yourself :\n`;
    plain += `• Watch and understand the content of the following presentation: Forces 101 Presentation (https://www.youtube.com/watch?v=nGGLc_Ynr-I)\n`;
    if (filteredJobs.length > 0) {
      const jobLinksEn = filteredJobs.map((j) => this.getPforJobLinkMarkup(j.id, false, false)).join(', ');
      plain += `• Watch the video and review the description of the trade(s) you are registered for : ${jobLinksEn}\n`;
    } else {
      plain += `• Watch the video and review the description of the trade(s) you are registered for. Careers | Canadian Armed Forces (https://forces.ca/en/careers/)\n`;
    }
    plain += `• Explore the Frequently Asked Questions section of the Royal Military College Saint-Jean (https://www.cmrsj-rmcsj.forces.gc.ca/fe-fs/faq-faq/faq-faq-eng.asp)\n`;
    plain += `• Explore the Youtube Channel of the Royal Military College Saint-Jean (https://www.youtube.com/@cmrsjrmcsj)\n\n`;
    plain += `2- Ensure all tasks on your portal are completed:\n`;
    plain += `Please log in to your portal to verify and ensure that all required tasks are completed: Canadian Armed Forces Enrolment Portal link (https://www.cafoap-pclfac.forces.gc.ca/)\n\n`;
    plain += `3- If you are a high-level athlete, you can visit the websites of sports teams: \n`;
    plain += `• RMC Saint-Jean Sports teams Les Remparts: gorempartsgo.ca (https://gorempartsgo.ca)\n`;
    plain += `• RMC of Canada located in Kingston Sports teams The Paladins: Royal Military College of Canada - Official Athletics Website (https://gopaladinsgo.ca/)\n\n`;
    plain += `If you are a high-performance athlete, you may contact one of the teams to learn more about the different teams and their selection processes. If you are unsure which team to contact, please do not hesitate to ask the recruiting centre handling your application.\n\n`;

    if (nonMandatoryTasksEn) {
      plain += `${nonMandatoryTasksEn}\n\n`;
    }

    plain += this.getPforCaf101HighDemandWarningPlain('en', filteredJobs);
    plain += `Open House and Visits - Future Students - Royal Military College Saint-Jean\n`;
    plain += `We invite you to take advantage of the Royal Military College Saint-Jean Open House, which will be held on October 31, 2026, from 8:30 a.m. to 4:00 p.m. No registration is required.\nCome and discover the life of naval cadets and officer cadets, tour the College facilities, and meet professors, naval cadets and officer cadets, as well as recruiters who will be available to answer your questions.\nGuided tours of approximately 60 minutes are offered continuously throughout the day, allowing you to arrive at whatever time suits you best.\nWe hope to have the opportunity to welcome you and show you everything that Royal Military College Saint-Jean has to offer as part of your future academic and military journey.\n\n`;
    plain += `If no action is taken in your portal, your file will automatically close within 30 days.\n\n`;
    plain += signaturePlainEn;

    return plain;
  }

  getCompliantPforLienPaEmailHtml(signatureHtmlFr: string, signatureHtmlEn: string): string {
    let html = `<div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">`;

    // --- FRENCH BLOCK ---
    html += `<p><span style="background-color: #FFFF00; font-weight: bold;">English message will follow.</span></p>`;
    html += `<p>Bonjour,</p>`;
    html += `<p>Nous vous remercions de votre intérêt envers les Forces Armées Canadiennes (FAC). Dans votre demande, vous avez sélectionné le Programme de Formation des Officiers de la Régulière (PFOR).</p>`;
    html += `<p>Afin de poursuivre le traitement de votre demande, nous devons obtenir vos documents scolaires. <strong>Voici comment procéder pour nous les transmettre :</strong></p>`;

    html += `<ol style="list-style-type: decimal; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">`;
    html += `  <li style="margin-bottom: 10px;">Visitez le site web du Collège militaire royal du Canada (CMR) à l’adresse suivante :<br><a href="https://services.rmc.ca/apex/f?p=APPLICATIONS:LOGIN:0::::P1010_PASSWORD:363a11f2b0ebff75ce81e7555bdeaa8649377535ad84ec84f0660bf4af1a8477&cs=1j-Ipn31px0rKVtc1ZH6kM4wpMY0" target="_blank" style="color: #4f46e5; text-decoration: underline;">Admissions - Collège militaire royal du Canada (CMR) (rmc.ca)</a><br><br><strong>Remarque :</strong> Vous pourriez avoir à copier-coller le lien dans votre navigateur ou à changer de navigateur pour accéder au lien (ex. Firefox ou Chrome).</li>`;
    html += `  <li style="margin-bottom: 10px;">Vous devrez remplir le formulaire à l’aide de votre numéro de matricule que vous trouverez dans le volet latéral gauche de votre portail du postulant.</li>`;
    html += `  <li style="margin-bottom: 10px;">Vous devrez numériser vos relevés de notes officiels, y compris le verso (études secondaires et postsecondaires), puis les télécharger sur le site. (Même si vous l’avez déjà fait sur votre portail Forces.ca au début de votre processus de recrutement)</li>`;
    html += `</ol>`;

    html += `<p><strong>***Une personne ayant suivi ses études à l’extérieur du Canada, du Royaume-Uni, des États-Unis d’Amérique, de la France et/ou en possession d’un baccalauréat international doit obtenir une évaluation comparative des études par une tierce partie agréée. Les évaluations générales ne seront pas acceptées. Vous devrez ensuite télécharger les résultats de cette évaluation sur le portail du PFOR via le lien fourni ci-dessus. ***</strong></p>`;

    html += `<p>Une fois que les documents requis auront été reçus, votre dossier sera examiné par le Collège militaire royal du Canada (Kingston) pour les postulantes et postulants seniors, et par le CMR Saint-Jean pour les postulantes et postulants juniors. (Faites une capture d’écran de la page de confirmation que vos documents ont été déposés avec succès puis téléversez la sur votre portail du Postulant en ligne)</p>`;

    html += `<p>S’il est établi que vous satisfaisiez aux exigences minimales et que le Collège décide de traiter votre demande, le centre de recrutement pourra continuer le traitement de votre dossier et vous en serai informé par courriel ou en recevant des tâches supplémentaires sur votre portail.</p>`;

    html += `<p>Si vous avez des questions, n’hésitez pas à communiquer avec nous par courriel à <a href="mailto:PFOR_CRFC_Quebec@Forces.gc.ca" style="color: #4f46e5; text-decoration: underline;">PFOR_CRFC_Quebec@Forces.gc.ca</a>.</p>`;

    html += `<p>Nous vous remercions de votre intérêt à joindre les Forces armées canadiennes.</p>`;
    html += `<p>` + signatureHtmlFr + `</p>`;
    html += `<br><hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;"><br>`;

    // --- ENGLISH BLOCK ---
    html += `<p>Hello,</p>`;
    html += `<p>Thank you for your interest in the Canadian Armed Forces (CAF). In your application, you have selected the Regular Officer Training Plan (ROTP).</p>`;
    html += `<p>To continue processing your application, we need supporting academic documentation. <strong>Here's how to proceed to submit it:</strong></p>`;

    html += `<ol style="list-style-type: decimal; padding-left: 20px; margin-top: 10px; margin-bottom: 10px;">`;
    html += `  <li style="margin-bottom: 10px;">Visit the Royal Military College of Canada (RMC) website at the following link:<br><a href="https://services.rmc.ca/apex/f?p=APPLICATIONS:LOGIN:0::::P1010_PASSWORD:363a11f2b0ebff75ce81e7555bdeaa8649377535ad84ec84f0660bf4af1a8477&cs=1j-Ipn31px0rKVtc1ZH6kM4wpMY0" target="_blank" style="color: #4f46e5; text-decoration: underline;">Royal Military College of Canada (RMC)</a><br><br><strong>Note:</strong> You may need to copy and paste the link into your browser or change browsers to access the link (e.g., Firefox or Chrome).</li>`;
    html += `  <li style="margin-bottom: 10px;">You will need to fill in the form using your service number which you can find in the left sidebar of your applicant portal.</li>`;
    html += `  <li style="margin-bottom: 10px;">You will need to scan your official transcripts, including the back (secondary and post-secondary), and upload them to the site. (Even if you have already done so on your portal when you begin your online application)</li>`;
    html += `</ol>`;

    html += `<p><strong>***Applicants who studied outside Canada, United Kingdom, United States of America, France and/or who hold an International Baccalaureate must obtain a comparative educational assessment from an accredited third party. General evaluations will not be accepted. You must then upload the results of this evaluation to the ROTP portal via the link provided above. ***</strong></p>`;

    html += `<p>Once the required documents have been received, your file will be reviewed by the Royal Military College of Canada (Kingston) for senior applicants, and by CMR Saint-Jean for junior applicants. (Make sure you take a screenshot of the confirmation page for the deposit of your document and upload them on your online profile)</p>`;

    html += `<p>If it is determined that you meet the minimum requirements and the College decides to process your application, the recruitment centre will be able to continue processing your file, and you will be informed either by email or by receiving additional tasks on your portal.</p>`;

    html += `<p>For any questions, please feel free to contact us by email to: <a href="mailto:PFOR_CRFC_Quebec@Forces.gc.ca" style="color: #4f46e5; text-decoration: underline;">PFOR_CRFC_Quebec@Forces.gc.ca</a>.</p>`;

    html += `<p>Thank you for your interest in joining the Canadian Armed Forces.</p>`;
    html += `<p>` + signatureHtmlEn + `</p>`;
    html += `</div>`;
    return html;
  }

  getCompliantPforLienPaEmailPlain(signaturePlainFr: string, signaturePlainEn: string): string {
    let plain = "";

    // --- FRENCH ---
    plain += `English message will follow.\n\n`;
    plain += `Bonjour,\n\n`;
    plain += `Nous vous remercions de votre intérêt envers les Forces Armées Canadiennes (FAC). Dans votre demande, vous avez sélectionné le Programme de Formation des Officiers de la Régulière (PFOR).\n\n`;
    plain += `Afin de poursuivre le traitement de votre demande, nous devons obtenir vos documents scolaires. Voici comment procéder pour nous les transmettre :\n\n`;
    plain += `1. Visitez le site web du Collège militaire royal du Canada (CMR) à l’adresse suivante :\n`;
    plain += `Admissions - Collège militaire royal du Canada (CMR) (rmc.ca) (https://services.rmc.ca/apex/f?p=APPLICATIONS:LOGIN:0::::P1010_PASSWORD:363a11f2b0ebff75ce81e7555bdeaa8649377535ad84ec84f0660bf4af1a8477&cs=1j-Ipn31px0rKVtc1ZH6kM4wpMY0)\n\n`;
    plain += `Remarque : Vous pourriez avoir à copier-coller le lien dans votre navigateur ou à changer de navigateur pour accéder au lien (ex. Firefox ou Chrome).\n\n`;
    plain += `2. Vous devrez remplir le formulaire à l’aide de votre numéro de matricule que vous trouverez dans le volet latéral gauche de votre portail du postulant.\n\n`;
    plain += `3. Vous devrez numériser vos relevés de notes officiels, y compris le verso (études secondaires et postsecondaires), puis les télécharger sur le site. (Même si vous l’avez déjà fait sur votre portail Forces.ca au début de votre processus de recrutement)\n\n`;
    plain += `***Une personne ayant suivi ses études à l’extérieur du Canada, du Royaume-Uni, des États-Unis d’Amérique, de la France et/ou en possession d’un baccalauréat international doit obtenir une évaluation comparative des études par une tierce partie agréée. Les évaluations générales ne seront pas acceptées. Vous devrez ensuite télécharger les résultats de cette évaluation sur le portail du PFOR via le lien fourni ci-dessus. ***\n\n`;
    plain += `Une fois que les documents requis auront été reçus, votre dossier sera examiné par le Collège militaire royal du Canada (Kingston) pour les postulantes et postulants seniors, et par le CMR Saint-Jean pour les postulantes et postulants juniors. (Faites une capture d’écran de la page de confirmation que vos documents ont été déposés avec succès puis téléversez la sur votre portail du Postulant en ligne)\n\n`;
    plain += `S’il est établi que vous satisfaisiez aux exigences minimales et que le Collège décide de traiter votre demande, le centre de recrutement pourra continuer le traitement de votre dossier et vous en serai informé par courriel ou en recevant des tâches supplémentaires sur votre portail.\n\n`;
    plain += `Si vous avez des questions, n’hésitez pas à communiquer avec nous par courriel à PFOR_CRFC_Quebec@Forces.gc.ca.\n\n`;
    plain += `Nous vous remercions de votre intérêt à joindre les Forces armées canadiennes.\n\n`;
    plain += signaturePlainFr;
    plain += `\n\n______________________________________________________________________________\n\n`;

    // --- ENGLISH ---
    plain += `Hello,\n\n`;
    plain += `Thank you for your interest in the Canadian Armed Forces (CAF). In your application, you have selected the Regular Officer Training Plan (ROTP).\n\n`;
    plain += `To continue processing your application, we need supporting academic documentation. Here's how to proceed to submit it:\n\n`;
    plain += `1. Visit the Royal Military College of Canada (RMC) website at the following link:\n`;
    plain += `Royal Military College of Canada (RMC) (https://services.rmc.ca/apex/f?p=APPLICATIONS:LOGIN:0::::P1010_PASSWORD:363a11f2b0ebff75ce81e7555bdeaa8649377535ad84ec84f0660bf4af1a8477&cs=1j-Ipn31px0rKVtc1ZH6kM4wpMY0)\n\n`;
    plain += `Note: You may need to copy and paste the link into your browser or change browsers to access the link (e.g., Firefox or Chrome).\n\n`;
    plain += `2. You will need to fill in the form using your service number which you can find in the left sidebar of your applicant portal.\n\n`;
    plain += `3. You will need to scan your official transcripts, including the back (secondary and post-secondary), and upload them to the site. (Even if you have already done so on your portal when you begin your online application)\n\n`;
    plain += `***Applicants who studied outside Canada, United Kingdom, United States of America, France and/or who hold an International Baccalaureate must obtain a comparative educational assessment from an accredited third party. General evaluations will not be accepted. You must then upload the results of this evaluation to the ROTP portal via the link provided above. ***\n\n`;
    plain += `Once the required documents have been received, your file will be reviewed by the Royal Military College of Canada (Kingston) for senior applicants, and by CMR Saint-Jean for junior applicants. (Make sure you take a screenshot of the confirmation page for the deposit of your document and upload them on your online profile)\n\n`;
    plain += `If it is determined that you meet the minimum requirements and the College decides to process your application, the recruitment centre will be able to continue processing your file, and you will be informed either by email or by receiving additional tasks on your portal.\n\n`;
    plain += `For any questions, please feel free to contact us by email to: PFOR_CRFC_Quebec@Forces.gc.ca.\n\n`;
    plain += `Thank you for your interest in joining the Canadian Armed Forces.\n\n`;
    plain += signaturePlainEn;

    return plain;
  }

  getPforCompliantNoteClean(
    jobSlots: { index: number; job: JobEntry; failedCe: boolean }[],
    extraRejections: string
  ): string {
    let jobsText = "le métier XXX";
    if (jobSlots.length > 0) {
      const admissibleJobIds: string[] = [];
      for (const slot of jobSlots) {
        if (!slot.failedCe && !this.jobService.isJobClosed(slot.job.id)) {
          admissibleJobIds.push(slot.job.id);
        }
      }
      if (admissibleJobIds.length > 0) {
        const label = admissibleJobIds.length > 1 ? "les métiers" : "le métier";
        jobsText = `${label} ${admissibleJobIds.join(", ")}`;
      } else {
        const allJobIds = jobSlots.map(s => s.job.id);
        const label = allJobIds.length > 1 ? "les métiers" : "le métier";
        jobsText = `${label} ${allJobIds.join(", ")}`;
      }
    }

    let note = `Étape 1 (Terminée) - Courriel FAC101 PFOR et courriel contenant le lien PA envoyés pour ${jobsText}, Tag CCM pour suite du traitement : -Cpl Plourde (DML) - Sgt Fournier-Tremblay (DSE) - Sgt Larochelle (DQC), Sgt-Recruteur : Cpl Plourde (DML) – Sgt Plante (DRI) – Sgt David (DCI) – Sgt Fournier-Tremblay (DSE) – Sgt Richer (DQC)`;

    if (extraRejections) {
      note += `\n${extraRejections}`;
    }

    return note;
  }
}
