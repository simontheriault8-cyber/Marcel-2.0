import { Injectable, signal, computed } from '@angular/core';
import { AppLang, TranslationParams } from './i18n.models';
import { UI_COMMON_FR, UI_COMMON_EN } from './dictionaries/ui-common.dict';
import { UI_TASKS_GD_FR, UI_TASKS_GD_EN } from './dictionaries/ui-tasks-gd.dict';
import { UI_REORIENTATION_PFOR_FR, UI_REORIENTATION_PFOR_EN } from './dictionaries/ui-reorientation-pfor.dict';
import { REGISTRY_NOTES_FR, REGISTRY_NOTES_EN, REJECTION_REASONS_LOG_NOTES } from './dictionaries/registry-notes.dict';
import { EMAILS_SUBJECTS_HEADERS_FR, EMAILS_SUBJECTS_HEADERS_EN } from './dictionaries/emails-subjects-headers.dict';
import { DATA_LABELS_FR, DATA_LABELS_EN } from './dictionaries/data-labels.dict';
import { JOBS_TITLES_FR, JOBS_TITLES_EN, JOBS_DICTIONARY } from './dictionaries/jobs.dict';
import { UNIVERSITY_DEGREES_FR, UNIVERSITY_DEGREES_EN } from './dictionaries/university-degrees.dict';

const STORAGE_KEY = 'marcel_app_lang';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  /**
   * Active application language signal ('fr' | 'en')
   * Persisted in localStorage under 'marcel_app_lang'.
   */
  readonly lang = signal<AppLang>(this.getInitialLanguage());

  currentLang(): AppLang {
    return this.lang();
  }

  readonly isFrench = computed(() => this.lang() === 'fr');
  readonly isEnglish = computed(() => this.lang() === 'en');

  isEn(): boolean {
    return this.lang() === 'en';
  }

  // Merged dictionaries per language
  private readonly dictionaries: Record<AppLang, Record<string, string>> = {
    fr: {
      ...UI_COMMON_FR,
      ...UI_TASKS_GD_FR,
      ...UI_REORIENTATION_PFOR_FR,
      ...REGISTRY_NOTES_FR,
      ...EMAILS_SUBJECTS_HEADERS_FR,
      ...DATA_LABELS_FR,
      ...JOBS_TITLES_FR,
      ...UNIVERSITY_DEGREES_FR,
    },
    en: {
      ...UI_COMMON_EN,
      ...UI_TASKS_GD_EN,
      ...UI_REORIENTATION_PFOR_EN,
      ...REGISTRY_NOTES_EN,
      ...EMAILS_SUBJECTS_HEADERS_EN,
      ...DATA_LABELS_EN,
      ...JOBS_TITLES_EN,
      ...UNIVERSITY_DEGREES_EN,
    },
  };

  /**
   * Returns the localized trade title according to active or specified language.
   */
  getJobTitle(jobOrId: string | { id: string; title?: string; titleEn?: string }, targetLang?: AppLang): string {
    const l = targetLang || this.lang();
    const id = typeof jobOrId === 'string' ? jobOrId.trim().padStart(5, '0') : jobOrId.id.trim().padStart(5, '0');
    const dictEntry = JOBS_DICTIONARY[id];
    if (l === 'en') {
      if (dictEntry && dictEntry.titleEn) return dictEntry.titleEn;
      if (typeof jobOrId !== 'string' && jobOrId.titleEn) return jobOrId.titleEn;
      if (typeof jobOrId !== 'string' && jobOrId.title) return jobOrId.title;
      return id;
    }
    if (dictEntry && dictEntry.titleFr) return dictEntry.titleFr;
    if (typeof jobOrId !== 'string' && jobOrId.title) return jobOrId.title;
    return id;
  }

  /**
   * Returns the formatted label for dropdowns:
   * EN: "<id> - <titleEn>"
   * FR: "<id> - <titleFr>"
   */
  getJobDisplayLabel(jobOrId: string | { id: string; title?: string; titleEn?: string }, targetLang?: AppLang): string {
    const id = typeof jobOrId === 'string' ? jobOrId.trim().padStart(5, '0') : jobOrId.id.trim().padStart(5, '0');
    const title = this.getJobTitle(jobOrId, targetLang);
    return `${id} - ${title}`;
  }

  private getInitialLanguage(): AppLang {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'fr') {
          return stored;
        }
      }
    } catch {
      // Fallback on error
    }
    return 'fr';
  }

  /**
   * Changes the active language and persists choice to localStorage.
   */
  setLang(newLang: AppLang): void {
    this.lang.set(newLang);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, newLang);
      }
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Toggles between French and English.
   */
  toggleLang(): void {
    const nextLang: AppLang = this.lang() === 'fr' ? 'en' : 'fr';
    this.setLang(nextLang);
  }

  /**
   * Translate a dictionary key in the currently active language.
   * Supports dynamic variable interpolation like {varName}.
   */
  t(key: string, params?: TranslationParams): string {
    const currentLang = this.lang();
    let text = this.dictionaries[currentLang]?.[key];

    // Fallback to French if missing in English
    if (text === undefined && currentLang !== 'fr') {
      text = this.dictionaries.fr?.[key];
    }

    // Fallback to key if missing everywhere
    if (text === undefined) {
      return key;
    }

    if (!params) {
      return text;
    }

    return this.interpolate(text, params);
  }

  /**
   * Translate a key explicitly in a given language.
   */
  tLang(key: string, targetLang: AppLang, params?: TranslationParams): string {
    let text = this.dictionaries[targetLang]?.[key];
    if (text === undefined && targetLang !== 'fr') {
      text = this.dictionaries.fr?.[key];
    }
    if (text === undefined) {
      return key;
    }
    return params ? this.interpolate(text, params) : text;
  }

  /**
   * Helper to select between a French and English value based on active language.
   * If in English mode but enValue is empty/null/undefined, gracefully falls back to frValue.
   */
  pick<T>(frValue: T, enValue?: T | null): T {
    if (this.lang() === 'en' && enValue !== undefined && enValue !== null && enValue !== '') {
      return enValue;
    }
    return frValue;
  }

  /**
   * Translate a rejection reason log note by reasonId.
   */
  tReasonLogNote(reasonId: string, fallbackFr?: string): string {
    const mapping = REJECTION_REASONS_LOG_NOTES[reasonId];
    if (mapping) {
      return this.lang() === 'en' ? mapping.en : mapping.fr;
    }
    if (fallbackFr) {
      return fallbackFr;
    }
    return reasonId;
  }

  /**
   * Translate a rejection reason log note with (fallbackFr, reasonId, fallbackEn) signature.
   */
  translateReasonLogNote(fallbackFr: string, reasonId?: string, fallbackEn?: string): string {
    if (this.lang() === 'en' && fallbackEn) {
      return fallbackEn;
    }
    if (reasonId && REJECTION_REASONS_LOG_NOTES[reasonId]) {
      return this.lang() === 'en' ? REJECTION_REASONS_LOG_NOTES[reasonId].en : REJECTION_REASONS_LOG_NOTES[reasonId].fr;
    }
    if (this.lang() === 'en' && fallbackFr) {
      for (const val of Object.values(REJECTION_REASONS_LOG_NOTES)) {
        if (val.fr === fallbackFr) {
          return val.en;
        }
      }
    }
    return fallbackFr;
  }

  /**
   * Combines French and English email sections according to the active language:
   * - In FR mode: "English message will follow." banner on top, then French block, then English block.
   * - In EN mode: "Un message en français suivra." banner on top, then English block, then French block.
   */
  combineBilingualEmail(frBlock: string, enBlock: string, isHtml = false): string {
    const isEn = this.lang() === 'en';

    if (isHtml) {
      const banner = isEn
        ? '<p><span style="background-color: yellow;">Un message en français suivra.</span></p>'
        : '<p><span style="background-color: yellow;">English message will follow.</span></p>';
      const separator = '<br><p>______________________________________________________________________________</p><br>';

      const firstBlock = isEn ? enBlock.trim() : frBlock.trim();
      const secondBlock = isEn ? frBlock.trim() : enBlock.trim();

      return `${banner}\n${firstBlock}\n${separator}\n${secondBlock}`;
    } else {
      const banner = isEn
        ? 'Un message en français suivra.\n\n'
        : 'English message will follow.\n\n';
      const separator = '\n\n______________________________________________________________________________\n\n';

      const firstBlock = isEn ? enBlock.trim() : frBlock.trim();
      const secondBlock = isEn ? frBlock.trim() : enBlock.trim();

      return `${banner}${firstBlock}${separator}${secondBlock}`;
    }
  }

  /**
   * Resolves a weekday name in the active language from a date string (YYYY-MM-DD or DD/MM/YYYY).
   */
  getJourSemaine(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const parts = dateStr.includes('-') ? dateStr.split('-') : dateStr.split('/');
      let d: Date;
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        } else {
          d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
        }
        const dayIdx = d.getDay();
        const daysFr = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return this.lang() === 'en' ? daysEn[dayIdx] : daysFr[dayIdx];
      }
    } catch {
      // Fallback
    }
    return '';
  }

  /**
   * Dynamic template variable interpolation: replaces {key} with params[key].
   */
  private interpolate(template: string, params: TranslationParams): string {
    return template.replace(/\{(\w+)\}/g, (match, paramName) => {
      const val = params[paramName];
      if (val === undefined || val === null) {
        return match;
      }
      return String(val);
    });
  }
}
