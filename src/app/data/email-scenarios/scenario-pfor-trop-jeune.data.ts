import { EmailScenario } from '../../../services/email-scenarios.service';
import { getForcesHelpCentreUrl } from '../app-links.data';

export const SCENARIO_PFOR_TROP_JEUNE: EmailScenario = {
  id: "pfor_trop_jeune",
  subjectFr: "Mise à jour de l'exigence d'âge pour l'admission au Collège militaire royal du Canada (CMR) / Royal Military College of Canada (RMC) Admission Age Requirement Update",
  subjectEn: "Royal Military College of Canada (RMC) Admission Age Requirement Update / Mise à jour de l'exigence d'âge pour l'admission au Collège militaire royal du Canada (CMR)",
  bodyHtml: `
      <div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">
        <p><span style="background-color: yellow;">English message will follow.</span></p>
        <p>Bonjour,</p>
        <p>Vous recevez ce courriel parce que vous n’aurez pas atteint l’âge de 17 ans au 1er août 2027.</p>
        <p>Veuillez noter que la politique d’admission du <strong>Collège militaire royal du Canada (CMR)</strong> a été modifiée pour l’année d’admission 2027-2028. Dorénavant, les candidats admissibles devront avoir atteint l’âge de 17 ans au plus tard le 1er août de leur année d’enrôlement, soit le 1er août 2027 dans votre situation.</p>
        <p>Nous sommes conscients que ce changement peut avoir des répercussions sur certains candidats. Nous cherchons présentement des solutions et votre dossier continuera d’être traité de la même manière que ceux des autres candidats admissibles. Nous demeurons en attente d’une décision officielle quant aux mesures qui seront mises en place et nous vous informerons dès qu’une orientation définitive aura été communiquée.</p>
        <p>N’hésitez pas à communiquer avec nous si vous avez des questions.</p>
        <p>Cordialement,</p>
        <p>L’équipe de recrutement des Forces armées canadiennes<br>
        Centre de recrutement des Forces canadiennes Québec<br>
        Commandement du Personnel militaire / Forces armées canadiennes<br>
        <a href="${getForcesHelpCentreUrl(false)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Centre d’assistance | Forces armées canadiennes</a></p>

        <br><p>______________________________________________________________________________</p><br>

        <p>Hello,</p>
        <p>You are receiving this email because you will not have reached the age of 17 by August 1, 2027.</p>
        <p>Please note that the admission policy for the <strong>Royal Military College of Canada (RMC)</strong> has been revised for the 2027-2028 admission year. Going forward, eligible applicants must be at least 17 years of age no later than August 1 of their enrolment year. In your case, this means you must be 17 years old by <strong>August 1, 2027</strong>.</p>
        <p>We understand that this change may affect some applicants. We are currently exploring possible solutions, and your application will continue to be processed in the same manner as those of other eligible candidates. We are awaiting an official decision regarding any measures that may be implemented and will inform you as soon as definitive guidance has been provided.</p>
        <p>If you have any questions, please do not hesitate to contact us.</p>
        <p>Sincerely,</p>
        <p>The Canadian Armed Forces Recruiting Team<br>
        Canadian Forces Recruiting Centre Quebec<br>
        Military Personnel Command / Canadian Armed Forces<br>
        <a href="${getForcesHelpCentreUrl(true)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Help Centre | Canadian Armed Forces</a></p>
      </div>
  `,
  bodyText: `English message will follow.

Bonjour,

Vous recevez ce courriel parce que vous n’aurez pas atteint l’âge de 17 ans au 1er août 2027.

Veuillez noter que la politique d’admission du Collège militaire royal du Canada (CMR) a été modifiée pour l’année d’admission 2027-2028. Dorénavant, les candidats admissibles devront avoir atteint l’âge de 17 ans au plus tard le 1er août de leur année d’enrôlement, soit le 1er août 2027 dans votre situation.

Nous sommes conscients que ce changement peut avoir des répercussions sur certains candidats. Nous cherchons présentement des solutions et votre dossier continuera d’être traité de la même manière que ceux des autres candidats admissibles. Nous demeurons en attente d’une décision officielle quant aux mesures qui seront mises en place et nous vous informerons dès qu’une orientation définitive aura été communiquée.

N’hésitez pas à communiquer avec nous si vous avez des questions.

Cordialement,

L’équipe de recrutement des Forces armées canadiennes
Centre de recrutement des Forces canadiennes Québec
Commandement du Personnel militaire / Forces armées canadiennes
Centre d’assistance | Forces armées canadiennes (${getForcesHelpCentreUrl(false)})

______________________________________________________________________________

Hello,

You are receiving this email because you will not have reached the age of 17 by August 1, 2027.

Please note that the admission policy for the Royal Military College of Canada (RMC) has been revised for the 2027-2028 admission year. Going forward, eligible applicants must be at least 17 years of age no later than August 1 of their enrolment year. In your case, this means you must be 17 years old by August 1, 2027.

We understand that this change may affect some applicants. We are currently exploring possible solutions, and your application will continue to be processed in the same manner as those of other eligible candidates. We are awaiting an official decision regarding any measures that may be implemented and will inform you as soon as definitive guidance has been provided.

If you have any questions, please do not hesitate to contact us.

Sincerely,

The Canadian Armed Forces Recruiting Team
Canadian Forces Recruiting Centre Quebec
Military Personnel Command / Canadian Armed Forces
Help Centre | Canadian Armed Forces (${getForcesHelpCentreUrl(true)})`
};
