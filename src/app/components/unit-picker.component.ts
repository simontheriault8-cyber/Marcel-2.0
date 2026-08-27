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

      <!-- Main Input / Trigger -->
      <div class="relative">
        <div
          class="w-full flex items-center gap-2 p-2 border rounded-lg text-xs bg-slate-50 transition-all cursor-pointer select-none"
          [class.border-blue-500]="isOpen()"
          [class.ring-2]="isOpen()"
          [class.ring-blue-100]="isOpen()"
          [class.bg-white]="isOpen() || selectedUnit()"
          [class.border-slate-300]="!isOpen()"
          (click)="toggleDropdown()"
          id="unit-picker-trigger-btn"
        >
          <!-- Building Icon -->
          <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" />
          </svg>
          
          <div class="flex-1 min-w-0 flex items-center gap-2 truncate">
            @if (selectedUnit()) {
              <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 flex-shrink-0">
                UIC {{ selectedUnit()!.uic }}
              </span>
              <span class="text-xs font-semibold text-slate-800 truncate">
                {{ selectedUnit()!.abbrevCFR }}
              </span>
            } @else {
              <span class="text-xs text-slate-400">
                Rechercher par UIC ou abréviation CFR...
              </span>
            }
          </div>

          <div class="flex items-center gap-1 flex-shrink-0">
            @if (selectedUnit()) {
              <button
                type="button"
                class="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                title="Effacer la sélection"
                (click)="onClear($event)"
                id="clear-unit-btn"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            }
            <svg class="w-4 h-4 text-slate-400 transition-transform duration-200" [class.rotate-180]="isOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Dropdown Panel -->
        @if (isOpen()) {
          <div
            class="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
            (click)="$event.stopPropagation()"
            id="unit-dropdown"
          >
            <!-- Search Bar -->
            <div class="p-2 border-b border-slate-100 bg-slate-50/75 flex items-center gap-2">
              <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                #searchInput
                type="text"
                class="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                placeholder="Rechercher UIC ou abréviation..."
                [value]="searchQuery()"
                (input)="onSearchChange($any($event.target).value)"
                (keydown.escape)="closeDropdown()"
                id="unit-search-input"
              />
              @if (searchQuery()) {
                <button
                  type="button"
                  class="text-slate-400 hover:text-slate-600 p-0.5"
                  (click)="clearSearch()"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              }
            </div>

            <!-- List Count and Helper Info -->
            <div class="px-3 py-1.5 bg-slate-100/70 border-b border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span>{{ filteredUnits().length }} unité(s)</span>
              <span>UIC • Abbrev CFR</span>
            </div>

            <!-- Options List -->
            <div class="max-h-64 overflow-y-auto divide-y divide-slate-100">
              @for (unit of filteredUnits(); track unit.id) {
                <button
                  type="button"
                  class="w-full text-left px-3 py-2 text-xs flex items-center justify-between gap-2 hover:bg-blue-50/80 transition-colors group cursor-pointer"
                  [class.bg-blue-50]="isCurrentUnit(unit)"
                  (click)="selectUnit(unit)"
                  [id]="'unit-item-' + unit.id"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span
                      class="px-2 py-0.5 rounded font-mono font-bold text-[11px] flex-shrink-0"
                      [class.bg-blue-600]="isCurrentUnit(unit)"
                      [class.text-white]="isCurrentUnit(unit)"
                      [class.bg-slate-100]="!isCurrentUnit(unit)"
                      [class.text-slate-800]="!isCurrentUnit(unit)"
                      [class.group-hover:bg-blue-100]="!isCurrentUnit(unit)"
                      [class.group-hover:text-blue-900]="!isCurrentUnit(unit)"
                    >
                      UIC {{ unit.uic }}
                    </span>
                    <div class="truncate">
                      <span class="font-medium text-slate-800">
                        {{ unit.abbrevCFR }}
                      </span>
                    </div>
                  </div>

                  @if (isCurrentUnit(unit)) {
                    <svg class="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  }
                </button>
              } @empty {
                <div class="p-6 text-center text-xs text-slate-500">
                  <p class="font-medium">Aucune unité ne correspond à « {{ searchQuery() }} »</p>
                </div>
              }
            </div>
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

  allUnits: UnitSession[] = UNITS_LIST;

  selectedUnit = computed<UnitSession | null>(() => {
    if (!this.selectedId) return null;
    return this.allUnits.find(u => u.id === this.selectedId) || null;
  });

  filteredUnits = computed<UnitSession[]>(() => {
    const q = this.normalizeStr(this.searchQuery().trim());
    if (!q) return this.allUnits;

    return this.allUnits.filter((unit) => {
      const uic = this.normalizeStr(unit.uic);
      const abbrev = this.normalizeStr(unit.abbrevCFR);
      return uic.includes(q) || abbrev.includes(q);
    });
  });

  private normalizeStr(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  isCurrentUnit(unit: UnitSession): boolean {
    return this.selectedId === unit.id;
  }

  toggleDropdown() {
    this.isOpen.update((v) => !v);
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  onSearchChange(val: string) {
    this.searchQuery.set(val);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  selectUnit(unit: UnitSession) {
    this.unitSelected.emit(unit);
    this.isOpen.set(false);
    this.searchQuery.set('');
  }

  onClear(event: Event) {
    event.stopPropagation();
    this.cleared.emit();
    this.searchQuery.set('');
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
