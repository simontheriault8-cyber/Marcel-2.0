import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../i18n';
import { FOLLOW_UP_NOTE_FIELDS } from '../../data/follow-up-note.data';
import { FollowUpNoteFieldId, FollowUpNoteValues } from '../../models/follow-up-note.models';
import { CalendarPickerComponent } from '../calendar-picker.component';

@Component({
  selector: 'app-follow-up-note-builder',
  standalone: true,
  imports: [CommonModule, CalendarPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-4 space-y-4 rounded-b-xl">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs text-indigo-900">
        <span>{{ i18n.t(subtitleKeyValue()) }}</span>
        <button
          type="button"
          (click)="resetAll.emit()"
          class="shrink-0 self-start sm:self-auto px-2.5 py-1 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-300 hover:border-rose-300 rounded-lg text-[11px] font-semibold transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          {{ i18n.t('followUpNote.resetBtn') }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        @for (field of fields; track field.id; let idx = $index) {
          @let selectedOptId = getSelectedOptionId(field.id, field.defaultOptionId);
          @let needsDate = optionRequiresDate(field.id, selectedOptId);
          @let isModified = selectedOptId !== field.defaultOptionId;
          <div
            class="p-2.5 rounded-xl border transition-all"
            [class.border-indigo-200]="isModified"
            [class.bg-indigo-50/30]="isModified"
            [class.border-slate-200]="!isModified"
            [class.bg-white]="!isModified"
          >
            <label class="block font-semibold text-slate-700 mb-1.5">
              {{ i18n.t(field.labelKey) }} :
            </label>
            <select
              class="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all cursor-pointer font-medium text-slate-800 shadow-xs"
              [value]="selectedOptId"
              (change)="onOptionChange(field.id, $any($event.target).value)"
            >
              @for (opt of field.options; track opt.id) {
                <option [value]="opt.id" [selected]="opt.id === selectedOptId">{{ i18n.t(opt.labelKey) }}</option>
              }
            </select>

            @if (needsDate) {
              <div class="mt-2 pt-2 border-t border-indigo-100/80">
                <app-calendar-picker
                  [label]="i18n.t('followUpNote.dateLabel')"
                  [value]="getSelectedDate(field.id)"
                  [placeholder]="i18n.t('common.selectDate')"
                  [align]="idx % 2 === 1 ? 'right' : 'left'"
                  (dateSelected)="onDateChange(field.id, $event)"
                  (cleared)="onDateChange(field.id, '')"
                ></app-calendar-picker>
              </div>
            }
          </div>
        }

        <div
          class="sm:col-span-2 p-2.5 rounded-xl border transition-all"
          [class.border-indigo-200]="!!otherTextValue().trim()"
          [class.bg-indigo-50/30]="!!otherTextValue().trim()"
          [class.border-slate-200]="!otherTextValue().trim()"
          [class.bg-white]="!otherTextValue().trim()"
        >
          <label class="block font-semibold text-slate-700 mb-1.5">
            {{ i18n.t('followUpNote.otherLabel') }}
          </label>
          <textarea
            rows="2"
            class="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white transition-all font-medium text-slate-800 shadow-xs resize-y"
            [placeholder]="i18n.t('followUpNote.otherPlaceholder')"
            [value]="otherTextValue()"
            (input)="otherTextChange.emit($any($event.target).value)"
          ></textarea>
        </div>
      </div>
    </div>
  `,
})
export class FollowUpNoteBuilderComponent {
  public i18n = inject(TranslationService);

  valuesState = signal<FollowUpNoteValues>({});
  otherTextValue = signal<string>('');
  subtitleKeyValue = signal<string>('followUpNote.desc');

  @Input() set values(val: FollowUpNoteValues | null | undefined) {
    this.valuesState.set(val ?? {});
  }

  @Input() set otherText(val: string | null | undefined) {
    this.otherTextValue.set(val ?? '');
  }

  @Input() set subtitleKey(val: string | null | undefined) {
    this.subtitleKeyValue.set(val || 'followUpNote.desc');
  }

  @Output() valuesChange = new EventEmitter<FollowUpNoteValues>();
  @Output() otherTextChange = new EventEmitter<string>();
  @Output() resetAll = new EventEmitter<void>();

  readonly fields = FOLLOW_UP_NOTE_FIELDS;

  getSelectedOptionId(fieldId: FollowUpNoteFieldId, defaultOptionId: string): string {
    return this.valuesState()[fieldId]?.optionId || defaultOptionId;
  }

  getSelectedDate(fieldId: FollowUpNoteFieldId): string {
    return this.valuesState()[fieldId]?.date ?? '';
  }

  optionRequiresDate(fieldId: FollowUpNoteFieldId, optionId: string): boolean {
    if (!optionId) return false;
    const field = this.fields.find((f) => f.id === fieldId);
    const opt = field?.options.find((o) => o.id === optionId);
    return !!opt?.requiresDate;
  }

  onOptionChange(fieldId: FollowUpNoteFieldId, optionId: string): void {
    const next: FollowUpNoteValues = { ...this.valuesState() };
    const keepDate = this.optionRequiresDate(fieldId, optionId) ? (next[fieldId]?.date ?? '') : '';
    next[fieldId] = keepDate ? { optionId, date: keepDate } : { optionId };
    this.valuesChange.emit(next);
  }

  onDateChange(fieldId: FollowUpNoteFieldId, date: string): void {
    const field = this.fields.find((f) => f.id === fieldId);
    const currentOptId = this.valuesState()[fieldId]?.optionId || field?.defaultOptionId;
    if (!currentOptId) return;
    const next: FollowUpNoteValues = {
      ...this.valuesState(),
      [fieldId]: date ? { optionId: currentOptId, date } : { optionId: currentOptId },
    };
    this.valuesChange.emit(next);
  }
}
