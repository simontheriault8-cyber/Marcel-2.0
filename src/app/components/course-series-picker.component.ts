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
import { CourseSession, COURSE_SESSIONS_LIST } from '../data/course-sessions.data';

@Component({
  selector: 'app-course-series-picker',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full" id="course-series-picker-container">
      <label class="block font-semibold text-slate-700 mb-1 text-xs">
        Série du cours :
      </label>

      <!-- Main Input / Trigger -->
      <div class="relative">
        <div
          class="w-full flex items-center gap-2 p-2 border rounded-lg text-xs bg-slate-50 transition-all cursor-pointer select-none"
          [class.border-blue-500]="isOpen()"
          [class.ring-2]="isOpen()"
          [class.ring-blue-100]="isOpen()"
          [class.bg-white]="isOpen() || selectedSession()"
          [class.border-slate-300]="!isOpen()"
          (click)="toggleDropdown()"
          id="course-series-trigger-btn"
        >
          <!-- School Icon -->
          <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          
          <div class="flex-1 min-w-0 flex items-center gap-2 truncate">
            @if (selectedSession()) {
              <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 flex-shrink-0">
                Série {{ selectedSession()!.serie }}
              </span>
              <span class="text-xs font-semibold text-slate-800 truncate">
                Du {{ selectedSession()!.dateDebut }} au {{ selectedSession()!.dateFin }}
              </span>
            } @else if (customSerie || (customDebut && customFin)) {
              @if (customSerie) {
                <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-200 text-slate-800 border border-slate-300 flex-shrink-0">
                  Série {{ customSerie }}
                </span>
              }
              <span class="text-xs font-medium text-slate-700 truncate">
                Du {{ customDebut }} au {{ customFin }}
              </span>
            } @else {
              <span class="text-xs text-slate-400">
                Sélectionner ou rechercher une série de cours...
              </span>
            }
          </div>

          <div class="flex items-center gap-1 flex-shrink-0">
            @if (selectedSession() || customSerie || customDebut || customFin) {
              <button
                type="button"
                class="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                title="Effacer la sélection"
                (click)="onClear($event)"
                id="clear-course-series-btn"
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
            id="course-series-dropdown"
          >
            <!-- Search Bar in Dropdown -->
            <div class="p-2 border-b border-slate-100 bg-slate-50/75 flex items-center gap-2">
              <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                #searchInput
                type="text"
                class="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                placeholder="Rechercher par série ou date (ex: 339, 58, sept, janv, 2027)..."
                [value]="searchQuery()"
                (input)="onSearchChange($any($event.target).value)"
                (keydown.escape)="closeDropdown()"
                id="course-series-search-input"
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
              <span>{{ filteredSessions().length }} cours disponible(s)</span>
              <span>Série • Date début • Date fin</span>
            </div>

            <!-- Options List -->
            <div class="max-h-64 overflow-y-auto divide-y divide-slate-100">
              @for (session of filteredSessions(); track session.id) {
                <button
                  type="button"
                  class="w-full text-left px-3 py-2 text-xs flex items-center justify-between gap-2 hover:bg-blue-50/80 transition-colors group cursor-pointer"
                  [class.bg-blue-50]="isCurrentSession(session)"
                  (click)="selectSession(session)"
                  [id]="'course-session-item-' + session.id"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span
                      class="px-2 py-0.5 rounded font-mono font-bold text-[11px] flex-shrink-0"
                      [class.bg-blue-600]="isCurrentSession(session)"
                      [class.text-white]="isCurrentSession(session)"
                      [class.bg-slate-100]="!isCurrentSession(session)"
                      [class.text-slate-800]="!isCurrentSession(session)"
                      [class.group-hover:bg-blue-100]="!isCurrentSession(session)"
                      [class.group-hover:text-blue-900]="!isCurrentSession(session)"
                    >
                      Série {{ session.serie }}
                    </span>
                    <div class="truncate">
                      <span class="font-medium text-slate-800">
                        Du <strong class="text-slate-900">{{ session.dateDebut }}</strong> au <strong class="text-slate-900">{{ session.dateFin }}</strong>
                      </span>
                    </div>
                  </div>

                  @if (isCurrentSession(session)) {
                    <svg class="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  }
                </button>
              } @empty {
                <div class="p-6 text-center text-xs text-slate-500">
                  <svg class="w-6 h-6 text-slate-300 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="font-medium">Aucune série ne correspond à « {{ searchQuery() }} »</p>
                  <p class="text-[11px] text-slate-400 mt-0.5">Essayez de chercher un numéro de série ou un mois</p>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Preview text in email format -->
      @if (selectedSession() || (customDebut && customFin)) {
        <div class="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 px-0.5">
          <span>
            Dans le courriel :
            <span class="font-semibold text-slate-700">
              Vos dates de cours : Du {{ getEffectiveDates() }}
            </span>
          </span>
        </div>
      }
    </div>
  `,
})
export class CourseSeriesPickerComponent {
  private elementRef = inject(ElementRef);

  @Input() serie: string = '';
  @Input() dateDebut: string = '';
  @Input() dateFin: string = '';

  @Output() courseSelected = new EventEmitter<CourseSession>();
  @Output() cleared = new EventEmitter<void>();

  isOpen = signal<boolean>(false);
  searchQuery = signal<string>('');

  allSessions: CourseSession[] = COURSE_SESSIONS_LIST;

  selectedSession = computed<CourseSession | null>(() => {
    const s = this.serie;
    const deb = this.dateDebut;
    const fin = this.dateFin;

    if (!deb && !fin && !s) return null;

    // Match exact session if possible
    const exact = this.allSessions.find(
      (item) =>
        (!s || item.serie === s) &&
        (!deb || item.dateDebut.toLowerCase() === deb.toLowerCase()) &&
        (!fin || item.dateFin.toLowerCase() === fin.toLowerCase())
    );
    if (exact) return exact;

    // Match by dates
    if (deb && fin) {
      const byDates = this.allSessions.find(
        (item) =>
          item.dateDebut.toLowerCase() === deb.toLowerCase() &&
          item.dateFin.toLowerCase() === fin.toLowerCase()
      );
      if (byDates) return byDates;
    }

    return null;
  });

  get customSerie(): string { return this.serie; }
  get customDebut(): string { return this.dateDebut; }
  get customFin(): string { return this.dateFin; }

  filteredSessions = computed<CourseSession[]>(() => {
    const q = this.normalizeStr(this.searchQuery().trim());
    if (!q) return this.allSessions;

    return this.allSessions.filter((session) => {
      const sNum = this.normalizeStr(session.serie);
      const sDeb = this.normalizeStr(session.dateDebut);
      const sFin = this.normalizeStr(session.dateFin);
      const full = `serie ${sNum} du ${sDeb} au ${sFin}`;

      return (
        sNum.includes(q) ||
        sDeb.includes(q) ||
        sFin.includes(q) ||
        full.includes(q)
      );
    });
  });

  private normalizeStr(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  isCurrentSession(session: CourseSession): boolean {
    const sel = this.selectedSession();
    if (sel && sel.id === session.id) return true;
    if (
      this.serie === session.serie &&
      this.dateDebut.toLowerCase() === session.dateDebut.toLowerCase() &&
      this.dateFin.toLowerCase() === session.dateFin.toLowerCase()
    ) {
      return true;
    }
    return false;
  }

  getEffectiveDates(): string {
    const sel = this.selectedSession();
    if (sel) {
      return `${sel.dateDebut} au ${sel.dateFin}`;
    }
    return `${this.customDebut} au ${this.customFin}`;
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

  selectSession(session: CourseSession) {
    this.courseSelected.emit(session);
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
