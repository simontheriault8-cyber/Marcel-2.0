import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSession, UNITS_LIST } from '../data/units.data';

@Component({
  selector: 'app-unit-picker',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full" id="unit-picker-container">
      <label class="block font-semibold text-slate-700 mb-1 text-xs">
        Unité d'affectation :
      </label>

      <!-- Input Search Container -->
      <div class="relative">
        <div
          class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 text-xs min-h-[34px]"
          id="unit-picker-input-wrapper"
        >
          <input
            #unitInput
            type="text"
            [value]="inputValue()"
            (input)="onInput($any($event.target).value)"
            (focus)="onFocus()"
            class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
            placeholder="Rechercher unité (ex: 3229, St-Jean)..."
            id="unit-search-input"
          />

          @if (selectedUnit() || searchQuery()) {
            <button
              type="button"
              (mousedown)="onClear($event)"
              class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
              title="Effacer l'unité"
              id="clear-unit-btn"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          }
        </div>

        <!-- Dropdown List -->
        @if (isOpen()) {
          <div
            class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs"
            id="unit-dropdown"
          >
            @let filtered = filteredUnits();
            @if (filtered.length === 0) {
              <div class="p-2 text-slate-400 text-center italic">Aucune unité trouvée</div>
            }
            @for (unit of filtered; track unit.id) {
              <button
                type="button"
                (mousedown)="selectUnit(unit)"
                class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                [class.bg-indigo-50]="isCurrentUnit(unit)"
                [id]="'unit-item-' + unit.id"
              >
                <div class="flex items-center gap-2 truncate">
                  <span
                    class="px-1.5 py-0.5 rounded font-mono font-bold text-[10.5px] shrink-0"
                    [class.bg-indigo-600]="isCurrentUnit(unit)"
                    [class.text-white]="isCurrentUnit(unit)"
                    [class.bg-slate-100]="!isCurrentUnit(unit)"
                    [class.text-slate-700]="!isCurrentUnit(unit)"
                  >
                    UIC {{ unit.uic }}
                  </span>
                  <span class="font-medium text-slate-800 truncate">
                    {{ unit.abbrevCFR }}
                  </span>
                </div>

                @if (isCurrentUnit(unit)) {
                  <svg class="w-3.5 h-3.5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                }
              </button>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class UnitPickerComponent {
  private elementRef = inject(ElementRef);

  @Input() selectedId: string = '';

  @Output() unitSelected = new EventEmitter<UnitSession>();
  @Output() cleared = new EventEmitter<void>();

  isOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  isTyping = signal<boolean>(false);

  allUnits: UnitSession[] = UNITS_LIST;

  selectedUnit = computed<UnitSession | null>(() => {
    if (!this.selectedId) return null;
    return this.allUnits.find(u => u.id === this.selectedId || u.uic === this.selectedId) || null;
  });

  inputValue = computed<string>(() => {
    if (this.isTyping()) {
      return this.searchQuery();
    }
    const sel = this.selectedUnit();
    if (sel) {
      return `UIC ${sel.uic} - ${sel.abbrevCFR}`;
    }
    return this.searchQuery();
  });

  filteredUnits = computed<UnitSession[]>(() => {
    const q = this.normalizeStr(this.searchQuery().trim());
    if (!q) return this.allUnits;

    return this.allUnits.filter((unit) => {
      const uic = this.normalizeStr(unit.uic);
      const abbrev = this.normalizeStr(unit.abbrevCFR);
      const offName = this.normalizeStr(unit.officialName || '');
      const combined = `uic ${uic} - ${abbrev} ${offName}`;
      return (
        uic.includes(q) ||
        abbrev.includes(q) ||
        offName.includes(q) ||
        combined.includes(q) ||
        q.includes(uic) ||
        q.includes(abbrev)
      );
    });
  });

  private normalizeStr(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  isCurrentUnit(unit: UnitSession): boolean {
    const sel = this.selectedUnit();
    return sel ? sel.id === unit.id || sel.uic === unit.uic : false;
  }

  onFocus() {
    this.isTyping.set(true);
    const sel = this.selectedUnit();
    this.searchQuery.set(sel ? `UIC ${sel.uic} - ${sel.abbrevCFR}` : '');
    this.isOpen.set(true);
  }

  onInput(val: string) {
    this.isTyping.set(true);
    this.searchQuery.set(val);
    if (!this.isOpen()) {
      this.isOpen.set(true);
    }
  }

  selectUnit(unit: UnitSession) {
    this.unitSelected.emit(unit);
    this.isTyping.set(false);
    this.searchQuery.set(`UIC ${unit.uic} - ${unit.abbrevCFR}`);
    this.isOpen.set(false);
  }

  onClear(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.cleared.emit();
    this.isTyping.set(false);
    this.searchQuery.set('');
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.isTyping.set(false);
      const sel = this.selectedUnit();
      this.searchQuery.set(sel ? `UIC ${sel.uic} - ${sel.abbrevCFR}` : '');
    }
  }
}
