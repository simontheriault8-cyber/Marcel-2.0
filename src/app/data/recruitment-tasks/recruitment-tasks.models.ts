export interface RejectionReason {
  id: string;
  labelFr: string;
  labelEn: string;
  instructionFr: string;
  instructionEn: string;
  logNoteFr: string;
  logNoteEn?: string;
  linkFr?: string;
  linkEn?: string;
  isConfirmation?: boolean;
  isAdditionalDoc?: boolean;
}

export interface DocumentItem {
  nameFr: string;
  nameEn: string;
  reasons: RejectionReason[];
}

export interface Task {
  nameFr: string;
  nameEn: string;
  section?: string;
  documents: DocumentItem[];
}
