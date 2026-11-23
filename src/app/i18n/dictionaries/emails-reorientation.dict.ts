import { TranslationDictionary } from '../i18n.models';

export const EMAILS_REORIENTATION_FR: TranslationDictionary = {
  // Banners
  'reoEmail.bannerFollowHtml':
    '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">English message will follow.</span></p>\n',
  'reoEmail.bannerFollowPlain': 'English message will follow.\n\n',

  // Greetings & Closings
  'reoEmail.greeting': 'Bonjour,',
  'reoEmail.warning30Days':
    'Si vous ne prenez aucune action, votre dossier sera désactivé automatiquement après 30 jours.',

  // Age 57+ Early Exit
  'reoEmail.age57.body1':
    'Suite à l’analyse de votre dossier de candidature, nous constatons que vous dépassez l’âge maximal d’admissibilité (56 ans) pour un enrôlement dans les Forces armées canadiennes (FAC). Toute personne ayant 57 ans ou plus est automatiquement inadmissible à un emploi dans les FAC.',
  'reoEmail.age57.body2': 'Votre dossier sera fermé.',
  'reoEmail.age57.thanks': 'Merci de votre intérêt à joindre les Forces armées canadiennes !',

  // PR < 3 years Early Exit
  'reoEmail.prUnder3.intro1':
    'Suite à l’analyse de votre dossier de candidature, nous constatons que vous êtes présentement inadmissible à un enrôlement dans les Forces armées canadiennes (FAC) sous le statut de résident permanent.',
  'reoEmail.prUnder3.intro2':
    'Pour être admissible à un enrôlement dans les FAC à titre de résident permanent, vous devez avoir accumulé au moins trois ans (1 095 jours) de présence physique au Canada.',
  'reoEmail.prUnder3.intro3':
    "Pour devenir admissible et pouvoir poser à nouveau votre candidature ou poursuivre votre processus à l'avenir, vous devez :",
  'reoEmail.prUnder3.opt1Bold': 'Soit obtenir la citoyenneté canadienne ;',
  'reoEmail.prUnder3.opt2Bold':
    "Soit fournir le résultat officiel du calculateur de présence physique d'Immigration, Réfugiés et Citoyenneté Canada (IRCC)",
  'reoEmail.prUnder3.opt2Rest':
    'prouvant que vous avez accumulé plus de trois ans (1 095 jours) sur le territoire canadien.',
  'reoEmail.prUnder3.closing1':
    "Puisque vous ne remplissez pas cette condition pour le moment, votre dossier de candidature actuel sera fermé. Dès que vous respecterez l'une de ces conditions, nous vous invitons à déposer une nouvelle candidature.",
  'reoEmail.prUnder3.closing2':
    'Nous vous remercions sincèrement de votre intérêt envers les Forces armées canadiennes.',

  // Merged Tasks Headers
  'reoEmail.tasks.sec1Title': '1. TÂCHES ET COMMUNICATIONS À CORRIGER SUR VOTRE PORTAIL :',
  'reoEmail.tasks.sec2Title': '2. STATUT DE VOS CHOIX DE MÉTIERS ACTUELS ET RÉORIENTATION REQUISE :',

  // Shared Occupation Status Labels
  'reoEmail.status.other': 'Voici le statut des autres métiers inscrits à votre dossier :',
  'reoEmail.status.current': 'Voici le statut des métiers actuellement inscrits à votre dossier :',
  'reoEmail.status.closedAdmission':
    'Nous avons déjà un nombre suffisant de candidatures pour combler toutes les positions restantes.',
  'reoEmail.status.closedAdmissionEdo':
    "Nous avons déjà un nombre suffisant de candidatures pour combler toutes les positions restantes pour ce métier dans le cadre du programme d'Entrée directe comme officier (EDO).",
  'reoEmail.status.closedPfor':
    "Il n'y a plus de postes disponibles pour ce métier dans le cadre du Programme de formation des officiers de la force régulière (PFOR).",
  'reoEmail.status.closedEdo':
    "Il n'y a plus de postes disponibles pour ce métier dans le cadre du programme d'Entrée directe comme officier (EDO).",
  'reoEmail.status.closedRegular': "Il n'y a plus de postes disponibles pour ce métier.",
  'reoEmail.status.noPr':
    "Pour diverses raisons, ce métier n'est pas accessible aux résidents permanents.",
  'reoEmail.status.eligibleOther':
    " : Admissible (réorientation lancée pour d'autres éléments du dossier).",

  // General Reorientation Intros
  'reoEmail.gen.tooOldIntro':
    "Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, vous dépassez l'âge maximal d'admissibilité pour vos choix de métiers.",
  'reoEmail.gen.merge.tooOldHtml':
    '<p class="mt-4">De plus, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>',
  'reoEmail.gen.merge.tooOldPlain':
    "De plus, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.",
  'reoEmail.gen.merge.cmrAdmittedHtml':
    '<p class="mt-4">Toutefois, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>',
  'reoEmail.gen.merge.cmrAdmittedPlain':
    "Toutefois, certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.",
  'reoEmail.gen.merge.cmrHtml':
    '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal)</strong>, nous constatons que certaines actions de votre part sont requises. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>',
  'reoEmail.gen.merge.cmrPlain':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal), nous constatons que certaines actions de votre part sont requises. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.",
  'reoEmail.gen.merge.civilHtml':
    '<p class="mt-4">Suite à l\'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Universités civiles)</strong>, nous constatons que certaines actions de votre part sont requises. Vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l\'objet d\'une <strong>réorientation pour vos choix de métiers</strong>.</p>',
  'reoEmail.gen.merge.civilPlain':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que certaines actions de votre part sont requises. Vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.",
  'reoEmail.gen.merge.regularHtml':
    "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature, nous constatons que certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. En effet, vous devez à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l'objet d'une <strong>réorientation pour vos choix de métiers</strong>.</p>",
  'reoEmail.gen.merge.regularPlain':
    "Suite à l'analyse de votre dossier de candidature, nous constatons que certaines actions de votre part sont requises pour nous permettre de poursuivre le traitement de votre demande. En effet, vous devez à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.",

  'reoEmail.gen.noJob.tooOld':
    "De plus, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.",
  'reoEmail.gen.noJob.cmrAdmitted':
    "Toutefois, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier admissible ne soit fait de votre part.",
  'reoEmail.gen.noJob.cmrHtml':
    "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.</p>",
  'reoEmail.gen.noJob.cmrPlain':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal), nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.",
  'reoEmail.gen.noJob.regular':
    "Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.",

  'reoEmail.gen.status.cmrAdmitted':
    "Toutefois, suite à l'analyse de vos choix de métiers actuels, nous constatons qu'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :",
  'reoEmail.gen.status.cmrHtml':
    "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :</p>",
  'reoEmail.gen.status.cmrPlain':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Collège militaire royal), nous constatons qu'une réorientation est nécessaire. Voici le statut des métiers actuellement inscrits à votre dossier :",
  'reoEmail.gen.status.civilHtml':
    "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR - Universités civiles)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :</p>",
  'reoEmail.gen.status.civilPlain':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR - Universités civiles), nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :",
  'reoEmail.gen.status.regular':
    "Suite à l'analyse de votre dossier de candidature, nous constatons que vous devez faire l'objet d'une réorientation. En effet, voici le statut des métiers actuellement inscrits à votre dossier :",
  'reoEmail.gen.status.emptyCmr':
    "Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles sous le PFOR ou requièrent un domaine d'études différent de votre admission au CMR.",
  'reoEmail.gen.status.emptyRegular':
    "Suite à l'analyse de votre dossier de candidature, nous constatons que vos choix de métiers actuels ne sont pas disponibles ou que vous n'y êtes pas admissible d'après nos critères.",

  // PFOR vers EDO (Reorientation & Program Change Only)
  'reoEmail.gen.merge.pforToEdoHtml':
    "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR)</strong>, nous constatons que certaines actions de votre part sont requises. Comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du PFOR et votre candidature doit être réorientée vers le programme d'<strong>Entrée directe comme officier (EDO)</strong> ou vers un autre métier admissible. Vous devez donc à la fois <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong> sur votre portail et faire l'objet d'une <strong>réorientation pour vos choix de métiers</strong>.</p>",
  'reoEmail.gen.merge.pforToEdoPlain':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR), nous constatons que certaines actions de votre part sont requises. Comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du PFOR et votre candidature doit être réorientée vers le programme d'Entrée directe comme officier (EDO) ou vers un autre métier admissible. Vous devez donc à la fois apporter des corrections aux tâches qui vous ont été réattribuées sur votre portail et faire l'objet d'une réorientation pour vos choix de métiers.",
  'reoEmail.gen.noJob.pforToEdoHtml':
    "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du PFOR et votre candidature doit être réorientée vers le programme d'<strong>Entrée directe comme officier (EDO)</strong> ou vers un autre métier admissible. De plus, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.</p>",
  'reoEmail.gen.noJob.pforToEdoPlain':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR), nous constatons que vous devez faire l'objet d'une réorientation. En effet, comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du PFOR et votre candidature doit être réorientée vers le programme d'Entrée directe comme officier (EDO) ou vers un autre métier admissible. De plus, aucun métier n'est actuellement sélectionné à votre dossier et le traitement de votre demande ne peut pas se poursuivre sans qu'un choix de métier ne soit fait de votre part.",
  'reoEmail.gen.status.pforToEdoHtml':
    "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR)</strong>, nous constatons que vous devez faire l'objet d'une réorientation. En effet, comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du PFOR et votre candidature doit être réorientée vers le programme d'<strong>Entrée directe comme officier (EDO)</strong> ou vers un autre métier admissible. Voici le statut des métiers actuellement inscrits à votre dossier :</p>",
  'reoEmail.gen.status.pforToEdoPlain':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR), nous constatons que vous devez faire l'objet d'une réorientation. En effet, comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du PFOR et votre candidature doit être réorientée vers le programme d'Entrée directe comme officier (EDO) ou vers un autre métier admissible. Voici le statut des métiers actuellement inscrits à votre dossier :",
  'reoEmail.gen.status.emptyPforToEdo':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR), comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du PFOR et votre candidature doit être réorientée vers le programme d'Entrée directe comme officier (EDO) ou vers un autre métier admissible. De plus, vos choix de métiers actuels ne sont pas disponibles ou vous n'y êtes pas admissible d'après nos critères.",
  'reoEmail.pforToEdoChange.sec2Title': "2. CHANGEMENT DE PROGRAMME D'ENRÔLEMENT (PFOR VERS EDO) :",
  'reoEmail.pforToEdoChange.mergeIntroHtml':
    "<p class=\"mt-4\">Suite à l'analyse de votre dossier de candidature pour le <strong>Programme de formation des officiers de la force régulière (PFOR)</strong>, nous constatons que certaines actions de votre part sont requises concernant vos tâches sur le portail. Vous devez donc <strong>apporter des corrections aux tâches qui vous ont été réattribuées</strong>. De plus, nous vous informons d'un changement à votre programme d'enrôlement tel qu'expliqué ci-dessous.</p>",
  'reoEmail.pforToEdoChange.mergeIntroPlain':
    "Suite à l'analyse de votre dossier de candidature pour le Programme de formation des officiers de la force régulière (PFOR), nous constatons que certaines actions de votre part sont requises concernant vos tâches sur le portail. Vous devez donc apporter des corrections aux tâches qui vous ont été réattribuées. De plus, nous vous informons d'un changement à votre programme d'enrôlement tel qu'expliqué ci-dessous.",
  'reoEmail.pforToEdoChange.bodySingleHtml':
    "<p class=\"mt-4\">Comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du <strong>Programme de formation des officiers de la force régulière (PFOR)</strong>. Toutefois, puisque votre choix de métier actuel répond déjà aux exigences d'admissibilité du programme d'<strong>Entrée directe comme officier (EDO)</strong>, aucune réorientation de métier n'est requise.</p>\n<p class=\"mt-3\">Votre dossier est donc simplement transféré du programme <strong>PFOR</strong> vers le programme <strong>EDO</strong> pour le métier suivant, et le traitement de votre candidature se poursuit en conséquence :</p>",
  'reoEmail.pforToEdoChange.bodySinglePlain':
    "Comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du Programme de formation des officiers de la force régulière (PFOR). Toutefois, puisque votre choix de métier actuel répond déjà aux exigences d'admissibilité du programme d'Entrée directe comme officier (EDO), aucune réorientation de métier n'est requise.\n\nVotre dossier est donc simplement transféré du programme PFOR vers le programme EDO pour le métier suivant, et le traitement de votre candidature se poursuit en conséquence :",
  'reoEmail.pforToEdoChange.bodyPluralHtml':
    "<p class=\"mt-4\">Comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du <strong>Programme de formation des officiers de la force régulière (PFOR)</strong>. Toutefois, puisque vos choix de métiers actuels répondent déjà aux exigences d'admissibilité du programme d'<strong>Entrée directe comme officier (EDO)</strong>, aucune réorientation de métier n'est requise.</p>\n<p class=\"mt-3\">Votre dossier est donc simplement transféré du programme <strong>PFOR</strong> vers le programme <strong>EDO</strong> pour les métiers suivants, et le traitement de votre candidature se poursuit en conséquence :</p>",
  'reoEmail.pforToEdoChange.bodyPluralPlain':
    "Comme vous avez déjà complété des études universitaires, vous ne pouvez pas intégrer les Forces armées canadiennes par l'entremise du Programme de formation des officiers de la force régulière (PFOR). Toutefois, puisque vos choix de métiers actuels répondent déjà aux exigences d'admissibilité du programme d'Entrée directe comme officier (EDO), aucune réorientation de métier n'est requise.\n\nVotre dossier est donc simplement transféré du programme PFOR vers le programme EDO pour les métiers suivants, et le traitement de votre candidature se poursuit en conséquence :",
  'reoEmail.pforToEdoChange.eligibleBadge':
    ' : Admissible sous le programme EDO (changement de programme PFOR vers EDO)',
  'reoEmail.pforToEdoChange.proofsIntroHtml':
    '<p class="mt-3 text-sm text-slate-700">De plus, pour la poursuite du traitement de votre dossier, veuillez également vous assurer de fournir les documents supplémentaires suivants sur votre portail :</p>',
  'reoEmail.pforToEdoChange.proofsIntroPlain':
    'De plus, pour la poursuite du traitement de votre dossier, veuillez également vous assurer de fournir les documents supplémentaires suivants sur votre portail :',
  'reoEmail.pforToEdoChange.mergeClosing':
    'Aucun choix de réorientation n’est requis de votre part : dès que vos tâches seront corrigées, le traitement de votre dossier se poursuivra sous le programme EDO.',
  'reoEmail.pforToEdoChange.closingWithAction':
    "Aucune réorientation n'est requise de votre part : dès que vos documents auront été déposés sur votre portail, le traitement de votre dossier se poursuivra normalement sous le programme d'Entrée directe comme officier (EDO). Nous vous remercions pour votre intérêt envers les Forces armées canadiennes.",
  'reoEmail.pforToEdoChange.closingNoAction':
    "Aucune démarche de réorientation n'est requise de votre part : le traitement de votre dossier se poursuit normalement sous le programme d'Entrée directe comme officier (EDO). Nous vous remercions pour votre intérêt envers les Forces armées canadiennes.",

  // Too Old Conclusion
  'reoEmail.gen.tooOldConclusionHeader': 'Conclusion :',
  'reoEmail.gen.tooOldConclusionText':
    "Étant donné votre âge actuel, aucun métier admissible n'est actuellement disponible pour votre candidature.",

  // General Lists
  'reoEmail.gen.list.ncm': 'Militaires du rang',
  'reoEmail.gen.list.ncmOpen': 'Militaires du rang (Ouverts)',
  'reoEmail.gen.list.ncmClosed': 'Militaires du rang (Fermés)',
  'reoEmail.gen.list.off': 'Officiers',
  'reoEmail.gen.list.offOpen': 'Officiers (Ouverts)',
  'reoEmail.gen.list.offClosed': 'Officiers (Fermés)',
  'reoEmail.gen.list.proofsHtml':
    'Vous devrez fournir ces documents/preuves supplémentaires si vous choisissez les métiers suivants :',
  'reoEmail.gen.list.proofsPlain': 'Documents supplémentaires requis :',
  'reoEmail.gen.list.forWord': 'Pour',
  'reoEmail.list.highlyCompetitiveBadge': 'Très Contingenté*',
  'reoEmail.gen.list.emptyPfor':
    "Aucun métier PFOR ouvert correspondant n'est disponible actuellement pour la sélection effectuée.",
  'reoEmail.gen.list.emptyRegular': 'Aucun métier correspondant disponible.',

  // Options
  'reoEmail.options.header': "Voici les options qui s'offrent à vous :",
  'reoEmail.options.chooseOtherTitle':
    'Choisir un autre métier parmi la liste des métiers admissibles',
  'reoEmail.options.chooseOtherTitleOpt2':
    'Option 2 : Choisir un autre métier parmi la liste des métiers admissibles',
  'reoEmail.options.chooseOtherTitleOpt3':
    'Option 3 : Choisir un autre métier parmi la liste des métiers admissibles',
  'reoEmail.options.chooseOtherDescRequired':
    "Vous devez réorienter votre candidature vers un choix de métier pour lequel vous êtes admissible afin de poursuivre le processus d'enrôlement. Pour ces métiers, l'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Veuillez consulter la liste ci-dessous.",
  'reoEmail.options.chooseOtherDescOptional':
    "Vous pouvez réorienter votre candidature vers d'autres choix de métiers admissibles dès maintenant. Pour ces métiers, l'admission est ouverte et le traitement de votre dossier se poursuivra immédiatement. Consultez la liste ci-dessous.",

  // Eligible Jobs Header & Pilot Notice
  'reoEmail.jobs.header': 'MÉTIERS ADMISSIBLES :',
  'reoEmail.pilot.title': 'Attention – Choix du métier de Pilote (00183) :',
  'reoEmail.pilot.body':
    'Le métier de Pilote étant fortement contingenté (nombre de places très limité), si vous choisissez ce métier, vous devez obligatoirement sélectionner un deuxième métier parmi la liste des métiers admissibles.',

  // Closed Jobs Notice in List
  'reoEmail.closedNote.title': 'Note importante concernant les métiers fermés :',
  'reoEmail.closedNote.htmlBody':
    'La liste ci-dessous inclut des métiers actuellement ouverts et fermés. Si vous choisissez un <span style="background-color: #fef08a; font-weight: bold;">métier ouvert</span>, nous pourrons poursuivre le traitement de votre demande d\'emploi immédiatement. Par contre, si vous choisissez un <span style="background-color: #fecaca; color: #991b1b; font-weight: bold;">métier fermé</span> (marqué en rouge), nous devrons fermer votre dossier et ce sera <span style="background-color: #fef08a; font-weight: bold;">votre entière responsabilité de nous rappeler vers la fin du mois de mars prochain</span> pour faire rouvrir votre dossier dans ce métier.',
  'reoEmail.closedNote.plainBody':
    "La liste ci-dessous inclut des métiers actuellement ouverts et fermés. Si vous choisissez un métier ouvert, nous pourrons poursuivre le traitement de votre demande d'emploi immédiatement. Par contre, si vous choisissez un métier fermé (marqué FERMÉ), nous devrons fermer votre dossier et ce sera votre entière responsabilité de nous rappeler vers la fin du mois de mars prochain pour faire rouvrir votre dossier dans ce métier.",

  // Conclusion / Next Steps
  'reoEmail.nextSteps.header': 'Prochaines étapes :',
  'reoEmail.nextSteps.intro':
    'En raison du volume élevé de candidatures, nous devons prioriser le traitement des dossiers dont toutes les tâches sont complétées. Nous vous invitons donc à :',
  'reoEmail.nextSteps.itemTasksPrefix': 'Vous rendre sur votre portail (',
  'reoEmail.nextSteps.itemTasksSuffix': ') afin de corriger sans délai les tâches indiquées ci-dessus ;',
  'reoEmail.nextSteps.itemPrPrefix': "Si ce n'est pas déjà fait, retourner sur votre portail (",
  'reoEmail.nextSteps.itemPrSuffix':
    ") afin d'y déposer les relevés de notes de votre pays d'origine (dans leur langue d'origine s'ils sont en français ou en anglais, ou accompagnés d'une traduction officielle au besoin) ;",
  'reoEmail.nextSteps.itemReply':
    'Répondre directement à ce courriel avec votre choix de réorientation ou vos nouveaux choix de métiers pour mettre à jour votre dossier.',
  'reoEmail.conclusion.prPrefix':
    "De plus, si ce n'est pas déjà fait, veuillez retourner sur votre portail (",
  'reoEmail.conclusion.prSuffix':
    ") afin d'y déposer les relevés de notes de votre pays d'origine. Ceux-ci doivent être rédigés en français ou en anglais, ou être accompagnés d'une traduction officielle au besoin.",
  'reoEmail.conclusion.thanks':
    'Nous vous remercions pour votre intérêt envers les Forces armées canadiennes. Veuillez nous faire part de votre décision en répondant directement à ce courriel afin de poursuivre ou de mettre à jour votre dossier.',
  'reoEmail.highlyCompetitiveNote.html':
    '<strong>* Très Contingenté :</strong> Ces métiers reçoivent une très grande quantité de candidatures à chaque année, et nous préférons que vous soyez préparés à un potentiel refus dû à la compétitivité de ces métiers.',
  'reoEmail.highlyCompetitiveNote.plain':
    '* Très Contingenté : Ces métiers reçoivent une très grande quantité de candidatures à chaque année, et nous préférons que vous soyez préparés à un potentiel refus dû à la compétitivité de ces métiers.',
};

export const EMAILS_REORIENTATION_EN: TranslationDictionary = {
  // Banners
  'reoEmail.bannerFollowHtml':
    '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">Un message en français suivra.</span></p>\n',
  'reoEmail.bannerFollowPlain': 'Un message en français suivra.\n\n',

  // Greetings & Closings
  'reoEmail.greeting': 'Hello,',
  'reoEmail.warning30Days':
    'If you take no action, your file will be automatically deactivated after 30 days.',

  // Age 57+ Early Exit
  'reoEmail.age57.body1':
    'Following the analysis of your application file, we have determined that you exceed the maximum eligibility age (56 years) for enrollment in the Canadian Armed Forces (CAF). Anyone aged 57 or older is automatically ineligible for employment in the CAF.',
  'reoEmail.age57.body2': 'Your file will be closed.',
  'reoEmail.age57.thanks': 'Thank you for your interest in joining the Canadian Armed Forces!',

  // PR < 3 years Early Exit
  'reoEmail.prUnder3.intro1':
    'Following the analysis of your application file, we regret to inform you that you are currently ineligible for enrolment in the Canadian Armed Forces (CAF) under permanent resident status.',
  'reoEmail.prUnder3.intro2':
    'To be eligible for enrolment in the CAF as a permanent resident, you must have accumulated at least three years (1,095 days) of physical presence in Canada.',
  'reoEmail.prUnder3.intro3':
    'In order to become eligible and be able to reapply or proceed with an application in the future, you must:',
  'reoEmail.prUnder3.opt1Bold': 'Either obtain Canadian citizenship;',
  'reoEmail.prUnder3.opt2Bold':
    'Or provide the official result from the Immigration, Refugees and Citizenship Canada (IRCC) physical presence calculator',
  'reoEmail.prUnder3.opt2Rest':
    'proving that you have accumulated more than three years (1,095 days) on Canadian territory.',
  'reoEmail.prUnder3.closing1':
    'Since you do not meet this condition at this time, your current application file will be closed. As soon as you satisfy one of these requirements, you are welcome to submit a new application.',
  'reoEmail.prUnder3.closing2': 'Thank you for your interest in the Canadian Armed Forces.',

  // Merged Tasks Headers
  'reoEmail.tasks.sec1Title': '1. TASKS AND COMMUNICATIONS TO CORRECT ON YOUR PORTAL:',
  'reoEmail.tasks.sec2Title':
    '2. STATUS OF YOUR CURRENT OCCUPATION CHOICES AND REQUIRED REORIENTATION:',

  // Shared Occupation Status Labels
  'reoEmail.status.other': 'Here is the status of the other occupations on your file:',
  'reoEmail.status.current': 'Here is the status of the occupations currently on your file:',
  'reoEmail.status.closedAdmission':
    'We already have a sufficient number of applications to fill all remaining positions.',
  'reoEmail.status.closedAdmissionEdo':
    'We already have a sufficient number of applications to fill all remaining positions for this occupation under the Direct Entry Officer (DEO) entry plan.',
  'reoEmail.status.closedPfor':
    'There are no longer positions available for this occupation under the Regular Officer Training Plan (ROTP).',
  'reoEmail.status.closedEdo':
    'There are no longer positions available for this occupation under the Direct Entry Officer (DEO) entry plan.',
  'reoEmail.status.closedRegular': 'There are no longer positions available for this occupation.',
  'reoEmail.status.noPr':
    'For various reasons, this occupation is not open to permanent residents.',
  'reoEmail.status.eligibleOther':
    ' : Eligible (reorientation initiated for other elements of the file).',

  // General Reorientation Intros
  'reoEmail.gen.tooOldIntro':
    'Following the analysis of your application file, we have determined that you must undergo a reorientation. Indeed, you exceed the maximum eligibility age for your selected occupations.',
  'reoEmail.gen.merge.tooOldHtml':
    '<p class="mt-4">In addition, actions are required on your part to proceed with processing your application. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>',
  'reoEmail.gen.merge.tooOldPlain':
    'In addition, actions are required on your part to proceed with processing your application. Specifically, you must correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.',
  'reoEmail.gen.merge.cmrAdmittedHtml':
    '<p class="mt-4">However, actions are required on your part to proceed with processing your application. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>',
  'reoEmail.gen.merge.cmrAdmittedPlain':
    'However, actions are required on your part to proceed with processing your application. Specifically, you must correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.',
  'reoEmail.gen.merge.cmrHtml':
    '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Royal Military College)</strong>, actions are required on your part. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>',
  'reoEmail.gen.merge.cmrPlain':
    'Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Royal Military College), actions are required on your part. Specifically, you must correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.',
  'reoEmail.gen.merge.civilHtml':
    '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (Civilian University ROTP)</strong>, actions are required on your part. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>',
  'reoEmail.gen.merge.civilPlain':
    'Following the analysis of your application file for the Regular Officer Training Plan (Civilian University ROTP), actions are required on your part. Specifically, you must correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.',
  'reoEmail.gen.merge.regularHtml':
    '<p class="mt-4">Following the analysis of your application file, we have determined that actions are required on your part to proceed with processing your application. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>',
  'reoEmail.gen.merge.regularPlain':
    'Following the analysis of your application file, we have determined that actions are required on your part to proceed with processing your application. Specifically, you must correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.',

  'reoEmail.gen.noJob.tooOld':
    'In addition, no occupation is currently selected in your file, and the processing of your application cannot continue without an eligible occupation choice from you.',
  'reoEmail.gen.noJob.cmrAdmitted':
    'However, no occupation is currently selected in your file, and the processing of your application cannot continue without an eligible occupation choice from you.',
  'reoEmail.gen.noJob.cmrHtml':
    '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Royal Military College)</strong>, we have determined that you must undergo a reorientation. Indeed, no occupation is currently selected in your file, and the processing of your application cannot continue without an occupation choice from you.</p>',
  'reoEmail.gen.noJob.cmrPlain':
    'Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Royal Military College), we have determined that you must undergo a reorientation. Indeed, no occupation is currently selected in your file, and the processing of your application cannot continue without an occupation choice from you.',
  'reoEmail.gen.noJob.regular':
    'Following the analysis of your application file, we have determined that you must undergo a reorientation. Indeed, no occupation is currently selected in your file, and the processing of your application cannot continue without an occupation choice from you.',

  'reoEmail.gen.status.cmrAdmitted':
    'However, following the review of your current occupation choices, a reorientation is required. Here is the current status of the occupations in your file:',
  'reoEmail.gen.status.cmrHtml':
    '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP - Royal Military College)</strong>, here is the current status of the occupations in your file:</p>',
  'reoEmail.gen.status.cmrPlain':
    'Following the analysis of your application file for the Regular Officer Training Plan (ROTP - Royal Military College), here is the current status of the occupations in your file:',
  'reoEmail.gen.status.civilHtml':
    '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (Civilian University ROTP)</strong>, here is the current status of the occupations in your file:</p>',
  'reoEmail.gen.status.civilPlain':
    'Following the analysis of your application file for the Regular Officer Training Plan (Civilian University ROTP), here is the current status of the occupations in your file:',
  'reoEmail.gen.status.regular':
    'Following the analysis of your application file, we have determined that you must undergo a reorientation. Here is the current status of the occupations in your file:',
  'reoEmail.gen.status.emptyCmr':
    'Following the analysis of your application file, your current occupational choices are unavailable under ROTP or require a field of study different from your RMC admission.',
  'reoEmail.gen.status.emptyRegular':
    'Following the analysis of your application file, we have determined that your current occupational choices are currently unavailable or you do not qualify for them based on our criteria.',

  // ROTP to DEO (Reorientation & Entry Plan Change Only)
  'reoEmail.gen.merge.pforToEdoHtml':
    '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP)</strong>, we have determined that actions are required on your part. Because you have already completed university studies, you cannot enter the Canadian Armed Forces through ROTP and your application must be redirected to the <strong>Direct Entry Officer (DEO)</strong> entry plan or another eligible occupation. Specifically, you must both <strong>correct the reassigned tasks</strong> on your portal and undergo a <strong>reorientation of your occupational choices</strong>.</p>',
  'reoEmail.gen.merge.pforToEdoPlain':
    'Following the analysis of your application file for the Regular Officer Training Plan (ROTP), we have determined that actions are required on your part. Because you have already completed university studies, you cannot enter the Canadian Armed Forces through ROTP and your application must be redirected to the Direct Entry Officer (DEO) entry plan or another eligible occupation. Specifically, you must both correct the reassigned tasks on your portal and undergo a reorientation of your occupational choices.',
  'reoEmail.gen.noJob.pforToEdoHtml':
    '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP)</strong>, we have determined that you must undergo a reorientation. Because you have already completed university studies, you cannot enter the Canadian Armed Forces through ROTP and your application must be redirected to the <strong>Direct Entry Officer (DEO)</strong> entry plan or another eligible occupation. In addition, no occupation is currently selected in your file, and the processing of your application cannot continue without an occupation choice from you.</p>',
  'reoEmail.gen.noJob.pforToEdoPlain':
    'Following the analysis of your application file for the Regular Officer Training Plan (ROTP), we have determined that you must undergo a reorientation. Because you have already completed university studies, you cannot enter the Canadian Armed Forces through ROTP and your application must be redirected to the Direct Entry Officer (DEO) entry plan or another eligible occupation. In addition, no occupation is currently selected in your file, and the processing of your application cannot continue without an occupation choice from you.',
  'reoEmail.gen.status.pforToEdoHtml':
    '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP)</strong>, we have determined that you must undergo a reorientation. Because you have already completed university studies, you cannot enter the Canadian Armed Forces through ROTP and your application must be redirected to the <strong>Direct Entry Officer (DEO)</strong> entry plan or another eligible occupation. Here is the current status of the occupations currently in your file:</p>',
  'reoEmail.gen.status.pforToEdoPlain':
    'Following the analysis of your application file for the Regular Officer Training Plan (ROTP), we have determined that you must undergo a reorientation. Because you have already completed university studies, you cannot enter the Canadian Armed Forces through ROTP and your application must be redirected to the Direct Entry Officer (DEO) entry plan or another eligible occupation. Here is the current status of the occupations currently in your file:',
  'reoEmail.gen.status.emptyPforToEdo':
    'Following the analysis of your application file for the Regular Officer Training Plan (ROTP), because you have already completed university studies, you cannot enter the Canadian Armed Forces through ROTP and your application must be redirected to the Direct Entry Officer (DEO) entry plan or another eligible occupation. In addition, your current occupational choices are currently unavailable or you do not qualify for them based on our criteria.',
  'reoEmail.pforToEdoChange.sec2Title': '2. ENTRY PLAN CHANGE (ROTP TO DEO):',
  'reoEmail.pforToEdoChange.mergeIntroHtml':
    '<p class="mt-4">Following the analysis of your application file for the <strong>Regular Officer Training Plan (ROTP)</strong>, we have determined that actions are required on your part regarding your portal tasks. Specifically, you must <strong>correct the reassigned tasks</strong> on your portal. In addition, please note the change to your entry plan as explained below.</p>',
  'reoEmail.pforToEdoChange.mergeIntroPlain':
    'Following the analysis of your application file for the Regular Officer Training Plan (ROTP), we have determined that actions are required on your part regarding your portal tasks. Specifically, you must correct the reassigned tasks on your portal. In addition, please note the change to your entry plan as explained below.',
  'reoEmail.pforToEdoChange.bodySingleHtml':
    '<p class="mt-4">Because you have already completed university studies, you cannot enter the Canadian Armed Forces through the <strong>Regular Officer Training Plan (ROTP)</strong>. However, since your current occupational choice already meets the eligibility requirements for the <strong>Direct Entry Officer (DEO)</strong> entry plan, no occupational reorientation is required.</p>\n<p class="mt-3">Your file is therefore simply being switched from <strong>ROTP</strong> to the <strong>DEO</strong> entry plan for the following occupation, and the processing of your application will continue accordingly:</p>',
  'reoEmail.pforToEdoChange.bodySinglePlain':
    'Because you have already completed university studies, you cannot enter the Canadian Armed Forces through the Regular Officer Training Plan (ROTP). However, since your current occupational choice already meets the eligibility requirements for the Direct Entry Officer (DEO) entry plan, no occupational reorientation is required.\n\nYour file is therefore simply being switched from ROTP to the DEO entry plan for the following occupation, and the processing of your application will continue accordingly:',
  'reoEmail.pforToEdoChange.bodyPluralHtml':
    '<p class="mt-4">Because you have already completed university studies, you cannot enter the Canadian Armed Forces through the <strong>Regular Officer Training Plan (ROTP)</strong>. However, since your current occupational choices already meet the eligibility requirements for the <strong>Direct Entry Officer (DEO)</strong> entry plan, no occupational reorientation is required.</p>\n<p class="mt-3">Your file is therefore simply being switched from <strong>ROTP</strong> to the <strong>DEO</strong> entry plan for the following occupations, and the processing of your application will continue accordingly:</p>',
  'reoEmail.pforToEdoChange.bodyPluralPlain':
    'Because you have already completed university studies, you cannot enter the Canadian Armed Forces through the Regular Officer Training Plan (ROTP). However, since your current occupational choices already meet the eligibility requirements for the Direct Entry Officer (DEO) entry plan, no occupational reorientation is required.\n\nYour file is therefore simply being switched from ROTP to the DEO entry plan for the following occupations, and the processing of your application will continue accordingly:',
  'reoEmail.pforToEdoChange.eligibleBadge':
    ' : Eligible under the DEO entry plan (entry plan change from ROTP to DEO)',
  'reoEmail.pforToEdoChange.proofsIntroHtml':
    '<p class="mt-3 text-sm text-slate-700">Additionally, to continue processing your application, please also ensure you provide the following additional documents on your portal:</p>',
  'reoEmail.pforToEdoChange.proofsIntroPlain':
    'Additionally, to continue processing your application, please also ensure you provide the following additional documents on your portal:',
  'reoEmail.pforToEdoChange.mergeClosing':
    'No reorientation choice is required from you: once your tasks are corrected, the processing of your file will continue under the DEO entry plan.',
  'reoEmail.pforToEdoChange.closingWithAction':
    'No reorientation is required from you: once your documents have been uploaded to your portal, the processing of your file will continue normally under the Direct Entry Officer (DEO) entry plan. Thank you for your interest in the Canadian Armed Forces.',
  'reoEmail.pforToEdoChange.closingNoAction':
    'No reorientation action is required from you: the processing of your file continues normally under the Direct Entry Officer (DEO) entry plan. Thank you for your interest in the Canadian Armed Forces.',

  // Too Old Conclusion
  'reoEmail.gen.tooOldConclusionHeader': 'Conclusion:',
  'reoEmail.gen.tooOldConclusionText':
    'Given your current age, no eligible occupation is currently available for your application.',

  // General Lists
  'reoEmail.gen.list.ncm': 'Non-Commissioned Members',
  'reoEmail.gen.list.ncmOpen': 'Non-Commissioned Members (Open)',
  'reoEmail.gen.list.ncmClosed': 'Non-Commissioned Members (Closed)',
  'reoEmail.gen.list.off': 'Officers',
  'reoEmail.gen.list.offOpen': 'Officers (Open)',
  'reoEmail.gen.list.offClosed': 'Officers (Closed)',
  'reoEmail.gen.list.proofsHtml':
    'You will need to provide these additional documents/proofs if you choose the following occupations:',
  'reoEmail.gen.list.proofsPlain': 'Additional documents required:',
  'reoEmail.gen.list.forWord': 'For',
  'reoEmail.list.highlyCompetitiveBadge': 'Highly Competitive*',
  'reoEmail.gen.list.emptyPfor':
    'No matching open ROTP occupations are currently available for the selected options.',
  'reoEmail.gen.list.emptyRegular': 'No matching occupations available.',

  // Options
  'reoEmail.options.header': 'Here are the options available to you:',
  'reoEmail.options.chooseOtherTitle':
    'Choose another occupation from the list of eligible occupations',
  'reoEmail.options.chooseOtherTitleOpt2':
    'Option 2: Choose another occupation from the list of eligible occupations',
  'reoEmail.options.chooseOtherTitleOpt3':
    'Option 3: Choose another occupation from the list of eligible occupations',
  'reoEmail.options.chooseOtherDescRequired':
    'You must redirect your application to an occupational choice for which you are eligible to continue the enrollment process. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.',
  'reoEmail.options.chooseOtherDescOptional':
    'You can redirect your application to other eligible occupational choices right now. For these occupations, admission is open and the processing of your application will continue immediately. Please consult the list below.',

  // Eligible Jobs Header & Pilot Notice
  'reoEmail.jobs.header': 'ELIGIBLE OCCUPATIONS:',
  'reoEmail.pilot.title': 'Notice – Choice of Pilot (00183):',
  'reoEmail.pilot.body':
    'Since the Pilot occupation is highly competitive (very limited vacancies), if you select this occupation, you must also select a second occupation from the list of eligible occupations.',

  // Closed Jobs Notice in List
  'reoEmail.closedNote.title': 'Important note regarding closed occupations:',
  'reoEmail.closedNote.htmlBody':
    'The list below includes occupations that are currently open and closed. If you choose an <span style="background-color: #fef08a; font-weight: bold;">open occupation</span>, we can continue processing your application immediately. However, if you choose a <span style="background-color: #fecaca; color: #991b1b; font-weight: bold;">closed occupation</span> (marked in red), we will have to close your file and it will be <span style="background-color: #fef08a; font-weight: bold;">your full responsibility to call us back near the end of next March</span> to reopen your file in that occupation.',
  'reoEmail.closedNote.plainBody':
    'The list below includes occupations that are currently open and closed. If you choose an open occupation, we can continue processing your application immediately. However, if you choose a closed occupation (marked CLOSED), we will have to close your file and it will be your full responsibility to call us back near the end of next March to reopen your file in that occupation.',

  // Conclusion / Next Steps
  'reoEmail.nextSteps.header': 'Next Steps:',
  'reoEmail.nextSteps.intro':
    'Due to a high volume of applications, we must prioritize files where all tasks are completed. We invite you to:',
  'reoEmail.nextSteps.itemTasksPrefix': 'Visit your portal (',
  'reoEmail.nextSteps.itemTasksSuffix': ') to correct without delay the tasks indicated above;',
  'reoEmail.nextSteps.itemPrPrefix': 'If not already done, return to your portal (',
  'reoEmail.nextSteps.itemPrSuffix':
    ') to upload the transcripts from your country of origin (in their original language if in English or French, or accompanied by an official translation if needed);',
  'reoEmail.nextSteps.itemReply':
    'Reply directly to this email with your reorientation choice or your new occupation choices to update your file.',
  'reoEmail.conclusion.prPrefix':
    'Additionally, if you have not already done so, please return to your portal (',
  'reoEmail.conclusion.prSuffix':
    ') to upload your transcripts from your country of origin. These must be in English or French, or accompanied by an official translation if necessary.',
  'reoEmail.conclusion.thanks':
    'Thank you for your interest in the Canadian Armed Forces. Please inform us of your decision by replying directly to this email in order to continue or update your file.',
  'reoEmail.highlyCompetitiveNote.html':
    '<strong>* Highly Competitive:</strong> These occupations receive a very large number of applications each year, and we prefer that you be prepared for a potential refusal due to the competitiveness of these occupations.',
  'reoEmail.highlyCompetitiveNote.plain':
    '* Highly Competitive: These occupations receive a very large number of applications each year, and we prefer that you be prepared for a potential refusal due to the competitiveness of these occupations.',
};
