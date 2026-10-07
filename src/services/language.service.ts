import { Injectable, signal, computed } from "@angular/core";

export type AppLanguage = "fr" | "en";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private readonly storageKey = "marcel_app_language";

  // Default to French or saved user preference
  readonly currentLang = signal<AppLanguage>(this.getInitialLanguage());

  readonly isFrench = computed(() => this.currentLang() === "fr");
  readonly isEnglish = computed(() => this.currentLang() === "en");

  private getInitialLanguage(): AppLanguage {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved === "en" || saved === "fr") {
        return saved;
      }
    } catch {
      // Fallback if localStorage unavailable
    }
    return "fr";
  }

  setLanguage(lang: AppLanguage) {
    this.currentLang.set(lang);
    try {
      localStorage.setItem(this.storageKey, lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage errors
    }
  }

  toggleLanguage() {
    this.setLanguage(this.currentLang() === "fr" ? "en" : "fr");
  }

  /**
   * Helper to return French or English string based on active language
   */
  t(fr: string, en: string): string {
    return this.currentLang() === "en" ? en : fr;
  }
}
