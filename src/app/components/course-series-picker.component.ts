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

      <!-- Input Search Container -->
      <div class="relative">
        <div
          class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 text-xs min-h-[34px]"
          id="course-series-input-wrapper"
        >
          <input
            #courseInput
            type="text"
            [value]="inputValue()"
            (input)="onInput($any($event.target).value)"
            (focus)="onFocus()"
            class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
            placeholder="Rechercher série ou date (ex: 339, 58, sept)..."
            id="course-series-search-input"
          />

          @if (selectedSession() || serie || dateDebut || searchQuery()) {
            <button
              type="button"
              (mousedown)="onClear($event)"
              class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
              title="Effacer la série"
              id="clear-course-series-btn"
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
            id="course-series-dropdown"
          >
            @let filtered = filteredSessions();
            @if (filtered.length === 0) {
              <div class="p-2 text-slate-400 text-center italic">Aucune série de cours trouvée</div>
            }
            @for (session of filtered; track session.id) {
              <button
                type="button"
                (mousedown)="selectSession(session)"
                class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                [class.bg-indigo-50]="isCurrentSession(session)"
                [id]="'course-session-item-' + session.id"
              >
                <div class="flex items-center gap-2 truncate">
                  <span
                    class="px-1.5 py-0.5 rounded font-mono font-bold text-[10.5px] shrink-0"
                    [class.bg-indigo-600]="isCurrentSession(session)"
                    [class.text-white]="isCurrentSession(session)"
                    [class.bg-slate-100]="!isCurrentSession(session)"
                    [class.text-slate-700]="!isCurrentSession(session)"
                  >
                    Série {{ session.serie }}
                  </span>
                  <span class="font-medium text-slate-800 truncate">
                    Du {{ session.dateDebut }} au {{ session.dateFin }}
                  </span>
                </div>

                @if (isCurrentSession(session)) {
                  <svg class="w-3.5 h-3.5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                }
              </button>
            }
          </div>
        }
      </div>

      <!-- Helper info for email dates -->
      @if (selectedSession() || (dateDebut && dateFin)) {
        <div class="mt-1 flex items-center justify-between text-[11px] text-slate-500 px-0.5">
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
  isTyping = signal<boolean>(false);

  allSessions: CourseSession[] = COURSE_SESSIONS_LIST;

  selectedSession = computed<CourseSession | null>(() => {
    const s = this.serie;
    const deb = this.dateDebut;
    const fin = this.dateFin;

    if (!deb && !fin && !s) return null;

    const exact = this.allSessions.find(
      (item) =>
        (!s || item.serie === s) &&
        (!deb || item.dateDebut.toLowerCase() === deb.toLowerCase()) &&
        (!fin || item.dateFin.toLowerCase() === fin.toLowerCase())
    );
    if (exact) return exact;

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

  getFormattedCourse(session: CourseSession): string {
    return `Série ${session.serie} (Du ${session.dateDebut} au ${session.dateFin})`;
  }

  inputValue = computed<string>(() => {
    if (this.isTyping()) {
      return this.searchQuery();
    }
    const sel = this.selectedSession();
    if (sel) {
      return this.getFormattedCourse(sel);
    }
    if (this.serie || (this.dateDebut && this.dateFin)) {
      const s = this.serie ? `Série ${this.serie} ` : '';
      return `${s}(Du ${this.dateDebut} au ${this.dateFin})`.trim();
    }
    return this.searchQuery();
  });

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
        full.includes(q) ||
        q.includes(sNum) ||
        q.includes(sDeb)
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
    return `${this.dateDebut} au ${this.dateFin}`;
  }

  onFocus() {
    this.isTyping.set(true);
    const sel = this.selectedSession();
    if (sel) {
      this.searchQuery.set(this.getFormattedCourse(sel));
    } else if (this.serie || (this.dateDebut && this.dateFin)) {
      const s = this.serie ? `Série ${this.serie} ` : '';
      this.searchQuery.set(`${s}(Du ${this.dateDebut} au ${this.dateFin})`.trim());
    } else {
      this.searchQuery.set('');
    }
    this.isOpen.set(true);
  }

  onInput(val: string) {
    this.isTyping.set(true);
    this.searchQuery.set(val);
    if (!this.isOpen()) {
      this.isOpen.set(true);
    }
  }

  selectSession(session: CourseSession) {
    this.courseSelected.emit(session);
    this.isTyping.set(false);
    this.searchQuery.set(this.getFormattedCourse(session));
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
      const sel = this.selectedSession();
      if (sel) {
        this.searchQuery.set(this.getFormattedCourse(sel));
      } else if (this.serie || (this.dateDebut && this.dateFin)) {
        const s = this.serie ? `Série ${this.serie} ` : '';
        this.searchQuery.set(`${s}(Du ${this.dateDebut} au ${this.dateFin})`.trim());
      } else {
        this.searchQuery.set('');
      }
    }
  }
}
