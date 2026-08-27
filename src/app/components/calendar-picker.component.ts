import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  HostListener,
  ElementRef,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-calendar-picker",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full">
      @if (label) {
        <label class="block font-semibold text-slate-700 mb-1 text-xs">{{ label }}</label>
      }

      <div class="flex items-center gap-2">
        <!-- Date Display Box -->
        <div
          class="flex-1 min-h-[34px] px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-between text-xs transition-all"
          [class.bg-indigo-50]="!!value"
          [class.border-indigo-200]="!!value"
        >
          @if (value) {
            <div class="flex items-center gap-1.5 font-medium text-slate-800 truncate">
              <svg class="w-3.5 h-3.5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="truncate">{{ value }}</span>
            </div>
            <button
              type="button"
              (click)="onClear($event)"
              class="p-0.5 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
              title="Effacer la date"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          } @else {
            <span class="text-slate-400 italic">{{ placeholder || 'Aucune date sélectionnée' }}</span>
          }
        </div>

        <!-- Calendar Button -->
        <div class="relative shrink-0">
          <button
            type="button"
            (click)="toggleCalendar($event)"
            class="px-2.5 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-lg font-medium text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm active:scale-95"
            [title]="buttonText || 'Choisir une date dans le calendrier'"
          >
            <svg class="w-4 h-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ buttonText || 'Calendrier' }}</span>
          </button>

          <!-- Calendar Popup -->
          @if (isOpen()) {
            <div
              class="absolute z-[9999] p-3 bg-white border border-slate-300 rounded-xl shadow-2xl text-xs select-none w-[270px] min-w-[270px] h-[300px] min-h-[300px] flex flex-col justify-between transition-all"
              [class.right-0]="align === 'right'"
              [class.left-0]="align === 'left'"
              [class.bottom-full]="isOpenUpward()"
              [class.mb-2]="isOpenUpward()"
              [class.top-full]="!isOpenUpward()"
              [class.mt-2]="!isOpenUpward()"
              (click)="$event.stopPropagation()"
            >
              <!-- Month / Year Header -->
              <div class="flex items-center justify-between mb-2 h-7 shrink-0">
                <button
                  type="button"
                  (click)="prevMonth($event)"
                  class="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition cursor-pointer"
                  title="Mois précédent"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div class="flex items-center justify-center gap-1 font-bold text-slate-800 text-center min-w-[130px]">
                  <span>{{ monthsFrList[currentMonth()] }}</span>
                  <span>{{ currentYear() }}</span>
                </div>
                <button
                  type="button"
                  (click)="nextMonth($event)"
                  class="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition cursor-pointer"
                  title="Mois suivant"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- Days of Week Headers -->
              <div class="grid grid-cols-7 gap-1 text-center font-semibold text-[10px] text-slate-400 mb-1 shrink-0">
                @for (dayName of daysOfWeekShort; track dayName) {
                  <div>{{ dayName }}</div>
                }
              </div>

              <!-- Calendar Grid -->
              @let grid = calendarGrid();
              <div class="grid grid-cols-7 gap-1 text-center h-[168px] min-h-[168px] items-center shrink-0">
                @for (pad of grid.pads; track $index) {
                  <div class="h-6 w-6 mx-auto"></div>
                }
                @for (dayNum of grid.days; track dayNum) {
                  <button
                    type="button"
                    (click)="selectDate(dayNum, $event)"
                    class="h-6 w-6 mx-auto rounded-md flex items-center justify-center text-xs text-slate-700 hover:bg-indigo-600 hover:text-white transition cursor-pointer"
                    [class.bg-indigo-600]="isSelectedDay(dayNum)"
                    [class.text-white]="isSelectedDay(dayNum)"
                    [class.font-bold]="isSelectedDay(dayNum)"
                  >
                    {{ dayNum }}
                  </button>
                }
                @for (tpad of grid.trailPads; track $index) {
                  <div class="h-6 w-6 mx-auto"></div>
                }
              </div>

              <!-- Footer Actions -->
              <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] shrink-0">
                <button
                  type="button"
                  (click)="selectToday($event)"
                  class="text-indigo-600 hover:text-indigo-800 font-medium hover:underline cursor-pointer"
                >
                  Aujourd'hui
                </button>
                <div class="flex items-center gap-2">
                  @if (value) {
                    <button
                      type="button"
                      (click)="onClear($event)"
                      class="text-rose-500 hover:text-rose-700 hover:underline cursor-pointer"
                    >
                      Effacer
                    </button>
                  }
                  <button
                    type="button"
                    (click)="isOpen.set(false)"
                    class="text-slate-500 hover:text-slate-700 hover:underline cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      @if (helperText) {
        <p class="mt-1 text-[11px] text-slate-500" [innerHTML]="helperText"></p>
      }
    </div>
  `,
})
export class CalendarPickerComponent {
  private elementRef = inject(ElementRef);

  @Input() label: string = "";
  @Input() value: string = "";
  @Input() placeholder: string = "Sélectionner une date...";
  @Input() buttonText: string = "Calendrier";
  @Input() helperText: string = "";
  @Input() position: 'auto' | 'top' | 'bottom' = 'auto';
  @Input() align: 'right' | 'left' = 'right';

  @Output() dateSelected = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  isOpen = signal<boolean>(false);
  isOpenUpward = signal<boolean>(false);
  currentYear = signal<number>(2026);
  currentMonth = signal<number>(new Date().getMonth());

  monthsFrList = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  daysOfWeekShort = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

  calendarGrid = computed(() => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const padCount = (firstDay + 6) % 7;
    const pads = Array.from({ length: padCount }, (_, i) => i);
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const trailingCount = 42 - (padCount + totalDays);
    const trailPads = Array.from({ length: trailingCount }, (_, i) => i);
    return { pads, days, trailPads };
  });

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggleCalendar(event?: Event) {
    if (event) event.stopPropagation();
    if (!this.isOpen()) {
      if (this.value) {
        this.syncCalendarToValue();
      }
      this.calculatePosition();
    }
    this.isOpen.update((v) => !v);
  }

  private calculatePosition() {
    if (this.position === 'top') {
      this.isOpenUpward.set(true);
      return;
    }
    if (this.position === 'bottom') {
      this.isOpenUpward.set(false);
      return;
    }
    // Auto-detect based on screen and container boundaries
    try {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Height of calendar popup is ~300px
      // Open upward only if there is genuinely not enough space below in viewport (< 300px)
      // and significantly more space above (>= 300px)
      if (spaceBelow < 300 && spaceAbove >= 300 && spaceAbove > spaceBelow) {
        this.isOpenUpward.set(true);
      } else {
        this.isOpenUpward.set(false);
      }
    } catch {
      this.isOpenUpward.set(false);
    }
  }

  private syncCalendarToValue() {
    if (!this.value) return;

    // Check for DD-MM-YYYY format
    const ddmmyyyy = this.value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (ddmmyyyy) {
      const monthIdx = parseInt(ddmmyyyy[2], 10) - 1;
      const year = parseInt(ddmmyyyy[3], 10);
      if (monthIdx >= 0 && monthIdx <= 11) {
        this.currentMonth.set(monthIdx);
      }
      this.currentYear.set(year);
      return;
    }

    // Check for YYYY-MM-DD format
    const yyyymmdd = this.value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (yyyymmdd) {
      const year = parseInt(yyyymmdd[1], 10);
      const monthIdx = parseInt(yyyymmdd[2], 10) - 1;
      if (monthIdx >= 0 && monthIdx <= 11) {
        this.currentMonth.set(monthIdx);
      }
      this.currentYear.set(year);
      return;
    }

    const yearMatch = this.value.match(/\b(20\d\d)\b/);
    if (yearMatch) {
      this.currentYear.set(parseInt(yearMatch[1], 10));
    }
    for (let i = 0; i < this.monthsFrList.length; i++) {
      if (this.value.toLowerCase().includes(this.monthsFrList[i].toLowerCase())) {
        this.currentMonth.set(i);
        break;
      }
    }
  }

  prevMonth(event?: Event) {
    if (event) event.stopPropagation();
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.update((y) => y - 1);
    } else {
      this.currentMonth.update((m) => m - 1);
    }
  }

  nextMonth(event?: Event) {
    if (event) event.stopPropagation();
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.update((y) => y + 1);
    } else {
      this.currentMonth.update((m) => m + 1);
    }
  }

  isSelectedDay(dayNum: number): boolean {
    if (!this.value) return false;
    const monthName = this.monthsFrList[this.currentMonth()].toLowerCase();
    const year = this.currentYear();
    const target = `${dayNum} ${monthName} ${year}`;
    if (this.value.toLowerCase().includes(target)) return true;

    const dStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const mNum = this.currentMonth() + 1;
    const mStr = mNum < 10 ? `0${mNum}` : `${mNum}`;
    if (this.value.includes(`${dStr}-${mStr}-${year}`) || this.value.includes(`${dayNum}-${mNum}-${year}`)) {
      return true;
    }
    return false;
  }

  selectDate(day: number, event?: Event) {
    if (event) event.stopPropagation();
    const monthName = this.monthsFrList[this.currentMonth()].toLowerCase();
    const year = this.currentYear();
    const formatted = `${day} ${monthName} ${year}`;
    this.dateSelected.emit(formatted);
    this.isOpen.set(false);
  }

  selectToday(event?: Event) {
    if (event) event.stopPropagation();
    const today = new Date();
    const day = today.getDate();
    const monthName = this.monthsFrList[today.getMonth()].toLowerCase();
    const year = today.getFullYear();
    this.currentMonth.set(today.getMonth());
    this.currentYear.set(year);
    const formatted = `${day} ${monthName} ${year}`;
    this.dateSelected.emit(formatted);
    this.isOpen.set(false);
  }

  onClear(event?: Event) {
    if (event) event.stopPropagation();
    this.cleared.emit();
    this.isOpen.set(false);
  }
}
