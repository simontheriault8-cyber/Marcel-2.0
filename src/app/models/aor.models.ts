export type AorId = 'pacific' | 'pn' | 'neon' | 'son' | 'quebec' | 'atlantic' | 'hq-borden';

/**
 * Future-ready configuration for per-AOR differences in generated emails
 * (custom signatures, regional greetings/closings, office addresses, template replacements).
 */
export interface AorEmailFormattingRule {
  defaultSignatureFr?: string;
  defaultSignatureEn?: string;
  defaultSignatureOtaFr?: string;
  defaultSignatureOtaEn?: string;
  salutationFr?: string;
  salutationEn?: string;
  closingFr?: string;
  closingEn?: string;
  templateOverrides?: Record<string, { fr?: string; en?: string }>;
}

/**
 * Future-ready configuration for per-AOR differences in generated registry notes
 * (regional header prefixes, suffixes, terminology or section snippets).
 */
export interface AorNoteFormattingRule {
  headerPrefixFr?: string;
  headerPrefixEn?: string;
  footerSuffixFr?: string;
  footerSuffixEn?: string;
  noteSnippets?: Record<string, { fr?: string; en?: string }>;
}

export interface AorDefinition {
  id: AorId;
  labelKey: string;
  code: string;
  emailFormatting: AorEmailFormattingRule;
  noteFormatting: AorNoteFormattingRule;
}

export const AOR_DEFINITIONS: readonly AorDefinition[] = [
  {
    id: 'pacific',
    labelKey: 'aor.pacific',
    code: 'PAC',
    emailFormatting: {},
    noteFormatting: {},
  },
  {
    id: 'pn',
    labelKey: 'aor.pn',
    code: 'P&N',
    emailFormatting: {},
    noteFormatting: {},
  },
  {
    id: 'neon',
    labelKey: 'aor.neon',
    code: 'NEON',
    emailFormatting: {},
    noteFormatting: {},
  },
  {
    id: 'son',
    labelKey: 'aor.son',
    code: 'SON',
    emailFormatting: {},
    noteFormatting: {},
  },
  {
    id: 'quebec',
    labelKey: 'aor.quebec',
    code: 'QC',
    emailFormatting: {},
    noteFormatting: {},
  },
  {
    id: 'atlantic',
    labelKey: 'aor.atlantic',
    code: 'ATL',
    emailFormatting: {},
    noteFormatting: {},
  },
  {
    id: 'hq-borden',
    labelKey: 'aor.hqBorden',
    code: 'HQ/Borden',
    emailFormatting: {},
    noteFormatting: {},
  },
];
