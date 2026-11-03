export type AppLang = 'fr' | 'en';

export type TranslationParams = Record<string, string | number | boolean | null | undefined>;

export type TranslationDictionary = Record<string, string>;

export interface BilingualText {
  fr: string;
  en: string;
}

export interface RejectionReasonLogNote {
  fr: string;
  en: string;
}

export interface EmailSubjectPair {
  fr: string;
  en: string;
}
