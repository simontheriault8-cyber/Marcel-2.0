export type FollowUpNoteFieldId =
  | 'iptad'
  | 'seaf'
  | 'eceEsomCspn'
  | 'cadet'
  | 'dispense'
  | 'serviceAnterieur'
  | 'preEvalNira'
  | 'lienPa'
  | 'entrevue'
  | 'medical'
  | 'psps'
  | 'gambit'
  | 'anxQ'
  | 'plar';

export interface FollowUpNoteOption {
  id: string;
  labelKey: string;
  requiresDate?: boolean;
}

export interface FollowUpNoteFieldDef {
  id: FollowUpNoteFieldId;
  labelKey: string;
  defaultOptionId: string;
  options: FollowUpNoteOption[];
}

export interface FollowUpNoteSelection {
  optionId: string;
  date?: string;
}

export type FollowUpNoteValues = Partial<Record<FollowUpNoteFieldId, FollowUpNoteSelection>>;
