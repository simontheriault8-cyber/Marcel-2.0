import { EmailScenario } from '../../../services/email-scenarios.service';
import { CMC_DEPOSIT_CONFIRMATION_URL, getForcesHelpCentreUrl } from '../app-links.data';

export const SCENARIO_VERIF_DEPOT_RELEVES_CMR: EmailScenario = {
  id: "verification_depot_releves_cmr",
  subjectFr: "Forces armées canadiennes/Canadian Armed Forces",
  subjectEn: "Canadian Armed Forces/Forces armées canadiennes",
  bodyHtml: `
      <div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">
        <p><span style="background-color: yellow;">English message will follow.</span></p>
        <p>Bonjour,</p>
        <p>Si vous recevez ce courriel, c’est que nous avons remarqué une possible anomalie dans la soumission de vos documents sur le Portail d’admission du Collège Militaire Royal.</p>
        <p>Votre dossier est dans l’un des scénarios suivants :</p>
        <ol style="margin-top: 5px; margin-bottom: 10px; padding-left: 20px;">
          <li style="margin-bottom: 8px;"><strong>Vous n’avez toujours pas téléversé vos relevés de notes sur le portail d’admission du CMR.</strong> C’est important de compléter votre profil d’admission le plus rapidement possible afin que nous puissions faire avancer votre dossier dans les prochains mois.</li>
          <li style="margin-bottom: 8px;"><strong>Vous vous êtes rendu sur le Portail d’admission, mais vous n’avez pas complété votre profil en entier.</strong> Vous avez quitté le portail sans avoir vu la page « confirmation d’application ».</li>
        </ol>
        <p>Voici un exemple de la page <a href="${CMC_DEPOSIT_CONFIRMATION_URL}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Confirmation d'application</a>.</p>
        <p>Si vous avez complété votre profil et avez vu la page « confirmation d’application », il est important de prendre une capture d’écran de cette page et de la téléverser sur votre profil de recrutement via la tâche « relevés de notes et diplômes ».</p>
        <p>Votre tâche « relevés de notes et diplômes » vous sera réattribuée pour que vous soyez en mesure de le faire.</p>
        <p>Finalement, si tout cela a déjà été fait, vous pouvez répondre directement à ce courriel, nous validerons que nous avons bel et bien la capture d’écran, et inscrirons la tâche comme complétée.</p>
        <p>Si vous avez des questions, n’hésitez pas.</p>
        <p>Cordialement,</p>
        <p>L’équipe de recrutement des Forces armées canadiennes<br>
        Centre de recrutement des Forces canadiennes Québec<br>
        Commandement du Personnel militaire / Forces armées canadiennes<br>
        <a href="${getForcesHelpCentreUrl(false)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Centre d’assistance | Forces armées canadiennes</a></p>
        
        <br><p>______________________________________________________________________________</p><br>

        <p>Hello,</p>
        <p>You are receiving this email because we have identified a possible issue with the submission of your documents through the Royal Military College of Canada (RMC) Admissions Portal.</p>
        <p>Your application may fall into one of the following situations:</p>
        <ol style="margin-top: 5px; margin-bottom: 10px; padding-left: 20px;">
          <li style="margin-bottom: 8px;"><strong>You have not yet uploaded your transcripts to the RMC Admissions Portal.</strong> Please complete your admissions profile as soon as possible so that we can continue processing your application in the coming months.</li>
          <li style="margin-bottom: 8px;"><strong>Your application may not have been fully submitted.</strong> If you exited the portal before reaching the “Application Confirmation” page, your application may not have been fully submitted.</li>
        </ol>
        <p>Here is an example page: <a href="${CMC_DEPOSIT_CONFIRMATION_URL}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Application Confirmation</a>.</p>
        <p>If you have completed your application and reached the “Application Confirmation” page, please take a screenshot of that page and upload it to your recruitment profile under the “Transcripts and Diplomas” task.</p>
        <p>This task will be reassigned to you so that you can upload the required screenshot.</p>
        <p>If you have already completed all of the steps above, simply reply to this email to let us know. We will verify that we have received your screenshot and mark the task as complete.</p>
        <p>If you have any questions or require assistance, please do not hesitate to contact us.</p>
        <p>Sincerely,</p>
        <p>The Canadian Armed Forces Recruiting Team<br>
        Canadian Forces Recruiting Centre Quebec<br>
        Military Personnel Command / Canadian Armed Forces<br>
        <a href="${getForcesHelpCentreUrl(true)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Help Centre | Canadian Armed Forces</a></p>
      </div>
  `,
  bodyText: `English message will follow.

Bonjour,

Si vous recevez ce courriel, c’est que nous avons remarqué une possible anomalie dans la soumission de vos documents sur le Portail d’admission du Collège Militaire Royal.

Votre dossier est dans l’un des scénarios suivants :

1. Vous n’avez toujours pas téléversé vos relevés de notes sur le portail d’admission du CMR. C’est important de compléter votre profil d’admission le plus rapidement possible afin que nous puissions faire avancer votre dossier dans les prochains mois.
2. Vous vous êtes rendu sur le Portail d’admission, mais vous n’avez pas complété votre profil en entier. Vous avez quitté le portail sans avoir vu la page « confirmation d’application ».

Voici un exemple de la page Confirmation d'application (${CMC_DEPOSIT_CONFIRMATION_URL}).

Si vous avez complété votre profil et avez vu la page « confirmation d’application », il est important de prendre une capture d’écran de cette page et de la téléverser sur votre profil de recrutement via la tâche « relevés de notes et diplômes ».

Votre tâche « relevés de notes et diplômes » vous sera réattribuée pour que vous soyez en mesure de le faire.

Finalement, si tout cela a déjà été fait, vous pouvez répondre directement à ce courriel, nous validerons que nous avons bel et bien la capture d’écran, et inscrirons la tâche comme complétée.

Si vous avez des questions, n’hésitez pas.

Cordialement,

L’équipe de recrutement des Forces armées canadiennes
Centre de recrutement des Forces canadiennes Québec
Commandement du Personnel militaire / Forces armées canadiennes
Centre d’assistance | Forces armées canadiennes (${getForcesHelpCentreUrl(false)})

______________________________________________________________________________

Hello,

You are receiving this email because we have identified a possible issue with the submission of your documents through the Royal Military College of Canada (RMC) Admissions Portal.

Your application may fall into one of the following situations:

1. You have not yet uploaded your transcripts to the RMC Admissions Portal. Please complete your admissions profile as soon as possible so that we can continue processing your application in the coming months.
2. Your application may not have been fully submitted. If you exited the portal before reaching the “Application Confirmation” page, your application may not have been fully submitted.

Here is an example page: Application Confirmation (${CMC_DEPOSIT_CONFIRMATION_URL}).

If you have completed your application and reached the “Application Confirmation” page, please take a screenshot of that page and upload it to your recruitment profile under the “Transcripts and Diplomas” task.

This task will be reassigned to you so that you can upload the required screenshot.

If you have already completed all of the steps above, simply reply to this email to let us know. We will verify that we have received your screenshot and mark the task as complete.

If you have any questions or require assistance, please do not hesitate to contact us.

Sincerely,

The Canadian Armed Forces Recruiting Team
Canadian Forces Recruiting Centre Quebec
Military Personnel Command / Canadian Armed Forces
Help Centre | Canadian Armed Forces (${getForcesHelpCentreUrl(true)})`
};
