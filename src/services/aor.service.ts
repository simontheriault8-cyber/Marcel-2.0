import { Injectable, computed, signal } from '@angular/core';
import {
  AOR_DEFINITIONS,
  AorDefinition,
  AorEmailFormattingRule,
  AorId,
  AorNoteFormattingRule,
} from '../app/models/aor.models';

const AOR_STORAGE_KEY = 'marcel_aor';
const VALID_AOR_IDS = new Set<string>(AOR_DEFINITIONS.map((a) => a.id));

@Injectable({
  providedIn: 'root',
})
export class AorService {
  readonly aorList: readonly AorDefinition[] = AOR_DEFINITIONS;

  selectedAor = signal<AorId | null>(this.loadInitialAor());

  currentAor = computed<AorDefinition | null>(() => {
    const id = this.selectedAor();
    if (!id) return null;
    return this.aorList.find((a) => a.id === id) ?? null;
  });

  private loadInitialAor(): AorId | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(AOR_STORAGE_KEY);
        if (saved && VALID_AOR_IDS.has(saved)) {
          return saved as AorId;
        }
      }
    } catch {
      // Ignore storage access errors
    }
    return null;
  }

  selectAor(aorId: AorId): void {
    this.selectedAor.set(aorId);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(AOR_STORAGE_KEY, aorId);
      }
    } catch {
      // Ignore storage access errors
    }
  }

  clearAor(): void {
    this.selectedAor.set(null);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(AOR_STORAGE_KEY);
      }
    } catch {
      // Ignore storage access errors
    }
  }

  getEmailFormatting(): AorEmailFormattingRule {
    return this.currentAor()?.emailFormatting ?? {};
  }

  getNoteFormatting(): AorNoteFormattingRule {
    return this.currentAor()?.noteFormatting ?? {};
  }

  /**
   * Extension hook for future per-AOR email wording customization.
   * Currently returns content unmodified as all AORs share identical output.
   */
  formatEmailForAor(
    content: string,
    _lang: 'fr' | 'en',
    _templateKey?: string
  ): string {
    const rules = this.getEmailFormatting();
    if (!content || Object.keys(rules).length === 0) {
      return content;
    }
    return content;
  }

  /**
   * Extension hook for future per-AOR registry note wording customization.
   * Currently returns note unmodified as all AORs share identical output.
   */
  formatRegistryNoteForAor(
    note: string,
    _lang: 'fr' | 'en',
    _noteKey?: string
  ): string {
    const rules = this.getNoteFormatting();
    if (!note || Object.keys(rules).length === 0) {
      return note;
    }
    return note;
  }
}
