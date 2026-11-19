import { EmailScenario } from '../../../services/email-scenarios.service';
import { getForcesHelpCentreUrl } from '../app-links.data';

export const SCENARIO_INADMISSIBILITE_PFOR_TROP_JEUNE: EmailScenario = {
  id: "inadmissibilite_pfor_trop_jeune",
  subjectFr: "Forces armées canadiennes/Canadian Armed Forces",
  subjectEn: "Canadian Armed Forces/Forces armées canadiennes",
  bodyHtml: `
      <div style="font-family: Calibri, sans-serif; font-size: 11pt; color: #000;">
        <p><span style="background-color: yellow;">English message will follow.</span></p>
        <p>Bonjour,</p>
        <p>Malheureusement, si vous recevez ce courriel c’est que votre dossier n’est pas admissible pour la présente campagne du <strong>Programme de Formation des Officiers de la Régulière (PFOR)</strong>. En effet, pour être admissible au Programme du Collège Royal Militaire, vous devez être âgé d’au moins 17 ans avant le 1er octobre de l’année d’enrôlement, dans votre situation, avant le 1er octobre 2027.</p>
        <p>Des options s’offrent tout de même à vous. Vous pouvez vous inscrire dans un programme collégial préuniversitaire dès l’an prochain et tenter votre chance de nouveau en septembre 2027 comme étudiant Senior lors de la campagne PFOR 28-29.</p>
        <p>Vous pourriez aussi vous enrôler dans la force de Première Réserve dès l’âge de 16 ans et demander une mutation entre élément (un transfert vers la Force Régulière) vers le PFOR lorsque vous aurez 17 ans. De cette façon, vous pourriez avoir un avant-goût de la vie dans les Forces Armées Canadiennes, mais aussi, en remplissant certaines conditions, votre 1ère année de programme collégial préuniversitaire pour être en partie remboursée par la Première Réserve.</p>
        <p>Si vous avez des questions, n’hésitez pas,</p>
        <p>Merci de votre intérêt envers les Forces Armées Canadiennes,</p>
        <p>Bonne journée,</p>
        <p>L’équipe de recrutement des Forces armées canadiennes<br>
        Centre de recrutement des Forces armées canadiennes Québec<br>
        Commandement du Personnel militaire / Forces armées canadiennes<br>
        <a href="${getForcesHelpCentreUrl(false)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Centre d’assistance | Forces armées canadiennes</a></p>

        <br><p>______________________________________________________________________________</p><br>

        <p>Hello,</p>
        <p>Unfortunately, if you are receiving this email, it means that your application is not eligible for the current <strong>Regular Officer Training Plan (ROTP)</strong> selection campaign. To be eligible for admission to the Royal Military College of Canada (RMC), applicants must be at least 17 years old before October 1 of the enrolment year. In your case, you would need to be 17 years old before October 1, 2027.</p>
        <p>However, you still have several options available to you. You may enroll in a pre-university college program next year and reapply in September 2027 as a senior student during the ROTP 2028-2029 selection campaign.</p>
        <p>You may also join the Primary Reserve as early as age 16 and subsequently apply for a Component Transfer (transfer to the Regular Force) through the ROTP once you turn 17. This would allow you to gain valuable experience in the Canadian Armed Forces while also potentially qualifying for partial reimbursement of your first year of pre-university college studies through the Primary Reserve, provided certain eligibility requirements are met.</p>
        <p>If you have any questions, please do not hesitate to contact us.</p>
        <p>Thank you for your interest in the Canadian Armed Forces.</p>
        <p>Have a great day,</p>
        <p>The Canadian Armed Forces Recruiting Team<br>
        Canadian Forces Recruiting Centre Quebec<br>
        Military Personnel Command / Canadian Armed Forces<br>
        <a href="${getForcesHelpCentreUrl(true)}" target="_blank" class="text-blue-600 hover:underline" style="color: #2563eb; text-decoration: underline;">Help Centre | Canadian Armed Forces</a></p>
      </div>
  `,
  bodyText: `English message will follow.

Bonjour,

Malheureusement, si vous recevez ce courriel c’est que votre dossier n’est pas admissible pour la présente campagne du Programme de Formation des Officiers de la Régulière (PFOR). En effet, pour être admissible au Programme du Collège Royal Militaire, vous devez être âgé d’au moins 17 ans avant le 1er octobre de l’année d’enrôlement, dans votre situation, avant le 1er octobre 2027.

Des options s’offrent tout de même à vous. Vous pouvez vous inscrire dans un programme collégial préuniversitaire dès l’an prochain et tenter votre chance de nouveau en septembre 2027 comme étudiant Senior lors de la campagne PFOR 28-29.

Vous pourriez aussi vous enrôler dans la force de Première Réserve dès l’âge de 16 ans et demander une mutation entre élément (un transfert vers la Force Régulière) vers le PFOR lorsque vous aurez 17 ans. De cette façon, vous pourriez avoir un avant-goût de la vie dans les Forces Armées Canadiennes, mais aussi, en remplissant certaines conditions, votre 1ère année de programme collégial préuniversitaire pour être en partie remboursée par la Première Réserve.

Si vous avez des questions, n’hésitez pas,

Merci de votre intérêt envers les Forces Armées Canadiennes,

Bonne journée,

L’équipe de recrutement des Forces armées canadiennes
Centre de recrutement des Forces armées canadiennes Québec
Commandement du Personnel militaire / Forces armées canadiennes
Centre d’assistance | Forces armées canadiennes (${getForcesHelpCentreUrl(false)})

______________________________________________________________________________

Hello,

Unfortunately, if you are receiving this email, it means that your application is not eligible for the current Regular Officer Training Plan (ROTP) selection campaign. To be eligible for admission to the Royal Military College of Canada (RMC), applicants must be at least 17 years old before October 1 of the enrolment year. In your case, you would need to be 17 years old before October 1, 2027.

However, you still have several options available to you. You may enroll in a pre-university college program next year and reapply in September 2027 as a senior student during the ROTP 2028-2029 selection campaign.

You may also join the Primary Reserve as early as age 16 and subsequently apply for a Component Transfer (transfer to the Regular Force) through the ROTP once you turn 17. This would allow you to gain valuable experience in the Canadian Armed Forces while also potentially qualifying for partial reimbursement of your first year of pre-university college studies through the Primary Reserve, provided certain eligibility requirements are met.

If you have any questions, please do not hesitate to contact us.

Thank you for your interest in the Canadian Armed Forces.

Have a great day,

The Canadian Armed Forces Recruiting Team
Canadian Forces Recruiting Centre Quebec
Military Personnel Command / Canadian Armed Forces
Help Centre | Canadian Armed Forces (${getForcesHelpCentreUrl(true)})`
};
