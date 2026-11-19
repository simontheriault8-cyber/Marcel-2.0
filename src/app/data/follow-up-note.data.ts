import { FollowUpNoteFieldDef, FollowUpNoteValues } from '../models/follow-up-note.models';

export const FOLLOW_UP_NOTE_FIELDS: FollowUpNoteFieldDef[] = [
  {
    id: 'iptad',
    labelKey: 'followUpNote.field.iptad',
    defaultOptionId: 'eligible',
    options: [
      { id: 'taskAssigned', labelKey: 'followUpNote.opt.iptad_taskAssigned' },
      { id: 'eligible', labelKey: 'followUpNote.opt.iptad_eligible' },
      { id: 'reassigned', labelKey: 'followUpNote.opt.iptad_reassigned' },
      { id: 'followUpToDo', labelKey: 'followUpNote.opt.iptad_followUpToDo' },
      { id: 'pending', labelKey: 'followUpNote.opt.iptad_pending' },
    ],
  },
  {
    id: 'seaf',
    labelKey: 'followUpNote.field.seaf',
    defaultOptionId: 'eligible',
    options: [
      { id: 'taskAssigned', labelKey: 'followUpNote.opt.seaf_taskAssigned' },
      { id: 'eligible', labelKey: 'followUpNote.opt.seaf_eligible' },
      { id: 'reassigned', labelKey: 'followUpNote.opt.seaf_reassigned' },
      { id: 'followUpToDo', labelKey: 'followUpNote.opt.seaf_followUpToDo' },
      { id: 'pending', labelKey: 'followUpNote.opt.seaf_pending' },
    ],
  },
  {
    id: 'eceEsomCspn',
    labelKey: 'followUpNote.field.eceEsomCspn',
    defaultOptionId: 'na',
    options: [
      { id: 'apptScheduled', labelKey: 'followUpNote.opt.ece_apptScheduled' },
      { id: 'eligible', labelKey: 'followUpNote.opt.ece_eligible' },
      { id: 'ineligible', labelKey: 'followUpNote.opt.ece_ineligible' },
      { id: 'followUp', labelKey: 'followUpNote.opt.ece_followUp' },
      { id: 'awaitingResult', labelKey: 'followUpNote.opt.ece_awaitingResult' },
      { id: 'dateSent', labelKey: 'followUpNote.opt.ece_dateSent' },
      { id: 'cspnPart1Done', labelKey: 'followUpNote.opt.ece_cspnPart1Done' },
      { id: 'cspnPart2Done', labelKey: 'followUpNote.opt.ece_cspnPart2Done' },
      { id: 'awaitingAirFactor', labelKey: 'followUpNote.opt.ece_awaitingAirFactor' },
      { id: 'toSchedule', labelKey: 'followUpNote.opt.ece_toSchedule' },
      { id: 'eceToDo', labelKey: 'followUpNote.opt.ece_eceToDo' },
      { id: 'esomToDo', labelKey: 'followUpNote.opt.ece_esomToDo' },
      { id: 'cspnPart1ToDo', labelKey: 'followUpNote.opt.ece_cspnPart1ToDo' },
      { id: 'cspnPart2ToDo', labelKey: 'followUpNote.opt.ece_cspnPart2ToDo' },
      { id: 'claimInProgress', labelKey: 'followUpNote.opt.ece_claimInProgress' },
      { id: 'na', labelKey: 'followUpNote.opt.ece_na' },
    ],
  },
  {
    id: 'cadet',
    labelKey: 'followUpNote.field.cadet',
    defaultOptionId: 'na',
    options: [
      { id: 'reqFortress', labelKey: 'followUpNote.opt.cadet_reqFortress' },
      { id: 'noNm', labelKey: 'followUpNote.opt.cadet_noNm' },
      { id: 'nmChangeRequested', labelKey: 'followUpNote.opt.cadet_nmChangeRequested' },
      { id: 'fileInCfrims', labelKey: 'followUpNote.opt.cadet_fileInCfrims' },
      { id: 'emailApplicant', labelKey: 'followUpNote.opt.cadet_emailApplicant' },
      { id: 'emailStJean', labelKey: 'followUpNote.opt.cadet_emailStJean' },
      { id: 'na', labelKey: 'followUpNote.opt.cadet_na' },
    ],
  },
  {
    id: 'dispense',
    labelKey: 'followUpNote.field.dispense',
    defaultOptionId: 'na',
    options: [
      { id: 'na', labelKey: 'followUpNote.opt.dispense_na' },
      { id: 'requested', labelKey: 'followUpNote.opt.dispense_requested' },
      { id: 'mccNotified', labelKey: 'followUpNote.opt.dispense_mccNotified' },
      { id: 'awaitingApproval', labelKey: 'followUpNote.opt.dispense_awaitingApproval' },
      { id: 'approved', labelKey: 'followUpNote.opt.dispense_approved' },
      { id: 'inProcessing', labelKey: 'followUpNote.opt.dispense_inProcessing' },
      { id: 'refused', labelKey: 'followUpNote.opt.dispense_refused' },
      { id: 'reenrolmentInitiated', labelKey: 'followUpNote.opt.dispense_reenrolmentInitiated' },
      { id: 'reenrolmentCompleted', labelKey: 'followUpNote.opt.dispense_reenrolmentCompleted' },
    ],
  },
  {
    id: 'serviceAnterieur',
    labelKey: 'followUpNote.field.serviceAnterieur',
    defaultOptionId: 'na',
    options: [
      { id: 'na', labelKey: 'followUpNote.opt.svc_na' },
      { id: 'mprrRequested', labelKey: 'followUpNote.opt.svc_mprrRequested' },
      { id: 'mprrCfrims', labelKey: 'followUpNote.opt.svc_mprrCfrims' },
      { id: 'vesaPermisRequested', labelKey: 'followUpNote.opt.svc_vesaPermisRequested' },
      { id: 'permisCfrims', labelKey: 'followUpNote.opt.svc_permisCfrims' },
      { id: 'vesaCfrims', labelKey: 'followUpNote.opt.svc_vesaCfrims' },
      { id: 'releaseDocCfrims', labelKey: 'followUpNote.opt.svc_releaseDocCfrims' },
    ],
  },
  {
    id: 'preEvalNira',
    labelKey: 'followUpNote.field.preEvalNira',
    defaultOptionId: 'na',
    options: [
      { id: 'required', labelKey: 'followUpNote.opt.preEval_required' },
      { id: 'notRequired', labelKey: 'followUpNote.opt.preEval_notRequired' },
      { id: 'na', labelKey: 'followUpNote.opt.preEval_na' },
      { id: 'niraToDo', labelKey: 'followUpNote.opt.preEval_niraToDo' },
      { id: 'niraCompleted', labelKey: 'followUpNote.opt.preEval_niraCompleted' },
      { id: 'noForeign', labelKey: 'followUpNote.opt.preEval_noForeign' },
    ],
  },
  {
    id: 'lienPa',
    labelKey: 'followUpNote.field.lienPa',
    defaultOptionId: 'na',
    options: [
      { id: 'na', labelKey: 'followUpNote.opt.pa_na' },
      { id: 'linkSent', labelKey: 'followUpNote.opt.pa_linkSent' },
      { id: 'awaitingEval', labelKey: 'followUpNote.opt.pa_awaitingEval' },
      { id: 'docsUploaded', labelKey: 'followUpNote.opt.pa_docsUploaded' },
      { id: 'eligible', labelKey: 'followUpNote.opt.pa_eligible' },
      { id: 'ineligibleReo', labelKey: 'followUpNote.opt.pa_ineligibleReo' },
      { id: 'followUp', labelKey: 'followUpNote.opt.pa_followUp' },
    ],
  },
  {
    id: 'entrevue',
    labelKey: 'followUpNote.field.entrevue',
    defaultOptionId: 'na',
    options: [
      { id: 'completedFit', labelKey: 'followUpNote.opt.entrevue_completedFit' },
      { id: 'completedUnfit', labelKey: 'followUpNote.opt.entrevue_completedUnfit' },
      { id: 'na', labelKey: 'followUpNote.opt.entrevue_na' },
      { id: 'apptOn', labelKey: 'followUpNote.opt.entrevue_apptOn', requiresDate: true },
      { id: 'taskAssigned', labelKey: 'followUpNote.opt.entrevue_taskAssigned' },
      { id: 'taskReassigned', labelKey: 'followUpNote.opt.entrevue_taskReassigned' },
      { id: 'pending', labelKey: 'followUpNote.opt.entrevue_pending' },
      { id: 'followUp', labelKey: 'followUpNote.opt.entrevue_followUp' },
      { id: 'updateToDo', labelKey: 'followUpNote.opt.entrevue_updateToDo' },
      { id: 'updateCompletedOn', labelKey: 'followUpNote.opt.entrevue_updateCompletedOn', requiresDate: true },
      { id: 'updateApptOn', labelKey: 'followUpNote.opt.entrevue_updateApptOn', requiresDate: true },
      { id: 'awaitingReo', labelKey: 'followUpNote.opt.entrevue_awaitingReo' },
      { id: 'awaitingPsps23', labelKey: 'followUpNote.opt.entrevue_awaitingPsps23' },
    ],
  },
  {
    id: 'medical',
    labelKey: 'followUpNote.field.medical',
    defaultOptionId: 'na',
    options: [
      { id: 'completedFit', labelKey: 'followUpNote.opt.med_completedFit' },
      { id: 'completedUnfit', labelKey: 'followUpNote.opt.med_completedUnfit' },
      { id: 'na', labelKey: 'followUpNote.opt.med_na' },
      { id: 'taskAssigned', labelKey: 'followUpNote.opt.med_taskAssigned' },
      { id: 'apptEmailOn', labelKey: 'followUpNote.opt.med_apptEmailOn', requiresDate: true },
      { id: 'taskReassigned', labelKey: 'followUpNote.opt.med_taskReassigned' },
      { id: 'awaitingMif', labelKey: 'followUpNote.opt.med_awaitingMif' },
      { id: 'followUpMif', labelKey: 'followUpNote.opt.med_followUpMif' },
      { id: 'awaitingRmo', labelKey: 'followUpNote.opt.med_awaitingRmo' },
      { id: 'updateToDo', labelKey: 'followUpNote.opt.med_updateToDo' },
      { id: 'updateCompletedOn', labelKey: 'followUpNote.opt.med_updateCompletedOn', requiresDate: true },
      { id: 'updateApptOn', labelKey: 'followUpNote.opt.med_updateApptOn', requiresDate: true },
      { id: 'awaitingReo', labelKey: 'followUpNote.opt.med_awaitingReo' },
      { id: 'apptPart1On', labelKey: 'followUpNote.opt.med_apptPart1On', requiresDate: true },
      { id: 'apptPart2On', labelKey: 'followUpNote.opt.med_apptPart2On', requiresDate: true },
      { id: 'apptPart1And2On', labelKey: 'followUpNote.opt.med_apptPart1And2On', requiresDate: true },
    ],
  },
  {
    id: 'psps',
    labelKey: 'followUpNote.field.psps',
    defaultOptionId: 'submittedStsp',
    options: [
      { id: 'submittedStsp', labelKey: 'followUpNote.opt.psps_submittedStsp' },
      { id: 'returnedStsp', labelKey: 'followUpNote.opt.psps_returnedStsp' },
      { id: 'awaitingReview', labelKey: 'followUpNote.opt.psps_awaitingReview' },
      { id: 'fingerprintsReq', labelKey: 'followUpNote.opt.psps_fingerprintsReq' },
      { id: 'inProcessing', labelKey: 'followUpNote.opt.psps_inProcessing' },
      { id: 'creditCfrims', labelKey: 'followUpNote.opt.psps_creditCfrims' },
      { id: 'vcjCfrims', labelKey: 'followUpNote.opt.psps_vcjCfrims' },
      { id: 'creditVcjCfrims', labelKey: 'followUpNote.opt.psps_creditVcjCfrims' },
      { id: 'awaitingCredit', labelKey: 'followUpNote.opt.psps_awaitingCredit' },
      { id: 'awaitingVcj', labelKey: 'followUpNote.opt.psps_awaitingVcj' },
      { id: 'reactivated', labelKey: 'followUpNote.opt.psps_reactivated' },
      { id: 'foreignCrc', labelKey: 'followUpNote.opt.psps_foreignCrc' },
      { id: 'followUpToDo', labelKey: 'followUpNote.opt.psps_followUpToDo' },
      { id: 'followUpDoneOn', labelKey: 'followUpNote.opt.psps_followUpDoneOn', requiresDate: true },
      { id: 'updateToDo', labelKey: 'followUpNote.opt.psps_updateToDo' },
      { id: 's33047Sent', labelKey: 'followUpNote.opt.psps_33047Sent' },
      { id: 'completedOn', labelKey: 'followUpNote.opt.psps_completedOn', requiresDate: true },
    ],
  },
  {
    id: 'gambit',
    labelKey: 'followUpNote.field.gambit',
    defaultOptionId: 'submitted',
    options: [
      { id: 'conclusiveFav', labelKey: 'followUpNote.opt.gambit_conclusiveFav' },
      { id: 'conclusiveUnfav', labelKey: 'followUpNote.opt.gambit_conclusiveUnfav' },
      { id: 'inconclusive', labelKey: 'followUpNote.opt.gambit_inconclusive' },
      { id: 'pending', labelKey: 'followUpNote.opt.gambit_pending' },
      { id: 'submitted', labelKey: 'followUpNote.opt.gambit_submitted' },
      { id: 'taskReassigned', labelKey: 'followUpNote.opt.gambit_taskReassigned' },
      { id: 'reftelMcc', labelKey: 'followUpNote.opt.gambit_reftelMcc' },
      { id: 'reftelCompletedOn', labelKey: 'followUpNote.opt.gambit_reftelCompletedOn', requiresDate: true },
    ],
  },
  {
    id: 'anxQ',
    labelKey: 'followUpNote.field.anxQ',
    defaultOptionId: 'toDo',
    options: [
      { id: 'sentMccOn', labelKey: 'followUpNote.opt.anxq_sentMccOn', requiresDate: true },
      { id: 'completed', labelKey: 'followUpNote.opt.anxq_completed' },
      { id: 'toDo', labelKey: 'followUpNote.opt.anxq_toDo' },
      { id: 'followUpMcc', labelKey: 'followUpNote.opt.anxq_followUpMcc' },
    ],
  },
  {
    id: 'plar',
    labelKey: 'followUpNote.field.plar',
    defaultOptionId: 'na',
    options: [
      { id: 'initiated', labelKey: 'followUpNote.opt.plar_initiated' },
      { id: 'na', labelKey: 'followUpNote.opt.plar_na' },
      { id: 'refused', labelKey: 'followUpNote.opt.plar_refused' },
      { id: 'approved', labelKey: 'followUpNote.opt.plar_approved' },
      { id: 'docsRequested', labelKey: 'followUpNote.opt.plar_docsRequested' },
      { id: 'followUpToDo', labelKey: 'followUpNote.opt.plar_followUpToDo' },
      { id: 'followUpDoneOn', labelKey: 'followUpNote.opt.plar_followUpDoneOn', requiresDate: true },
      { id: 'notifSentOn', labelKey: 'followUpNote.opt.plar_notifSentOn', requiresDate: true },
      { id: 'inProcessing', labelKey: 'followUpNote.opt.plar_inProcessing' },
    ],
  },
];

export function createDefaultFollowUpNoteValues(): FollowUpNoteValues {
  const defaults: FollowUpNoteValues = {};
  for (const field of FOLLOW_UP_NOTE_FIELDS) {
    defaults[field.id] = { optionId: field.defaultOptionId };
  }
  return defaults;
}

export function formatFollowUpNote(
  values: FollowUpNoteValues,
  otherText: string,
  translate: (key: string) => string
): string {
  const lines: string[] = [];

  for (const field of FOLLOW_UP_NOTE_FIELDS) {
    const sel = values[field.id];
    const optionId = sel?.optionId || field.defaultOptionId;
    const option =
      field.options.find((o) => o.id === optionId) ??
      field.options.find((o) => o.id === field.defaultOptionId);
    if (!option) continue;

    const fieldLabel = translate(field.labelKey);
    const optionLabel = translate(option.labelKey);
    const dateVal = sel?.date?.trim();

    if (option.requiresDate && dateVal) {
      lines.push(`${fieldLabel} : ${optionLabel} ${dateVal}`);
    } else {
      lines.push(`${fieldLabel} : ${optionLabel}`);
    }
  }

  const trimmedOther = otherText.trim();
  if (trimmedOther) {
    lines.push(`${translate('followUpNote.field.autre')} : ${trimmedOther}`);
  }

  return lines.join('\n');
}
