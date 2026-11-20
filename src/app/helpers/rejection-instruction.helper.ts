import { RejectionReason } from '../../services/recruitment-data.service';
import { EMAILS_PFOR_FR, EMAILS_PFOR_EN } from '../i18n/dictionaries/emails-pfor.dict';

export function getRejectionInstructionText(
  context: any,
  reason: RejectionReason,
  lang: 'fr' | 'en'
): string {
  const baseInstruction =
    lang === 'fr'
      ? reason.instructionFr
      : reason.instructionEn || reason.instructionFr;

  const isRecruiter =
    !context?.selectedRole || context.selectedRole() === 'recruiter';
  const isPfor =
    typeof context?.isPforDossier === 'function' && context.isPforDossier();

  if (isRecruiter && isPfor && reason.id === 'relev_inexist') {
    const pforNote = context?.i18n?.tLang
      ? context.i18n.tLang('pforEmail.relevInexistPforNote', lang)
      : lang === 'fr'
        ? EMAILS_PFOR_FR['pforEmail.relevInexistPforNote']
        : EMAILS_PFOR_EN['pforEmail.relevInexistPforNote'];

    return `${baseInstruction}\n\n${pforNote}`;
  }

  return baseInstruction;
}
