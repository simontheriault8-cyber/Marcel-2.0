import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AorService } from '../../services/aor.service';
import { TranslationService } from '../i18n';

@Component({
  selector: 'app-aor-selection',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-6 relative">
      <!-- Top Right: Language Switcher (FR | EN) -->
      <div class="absolute top-6 right-6 z-10 flex items-center bg-white border-2 border-slate-200 rounded-2xl p-1 shadow-sm">
        <button
          type="button"
          (click)="i18n.setLang('fr')"
          [class.bg-indigo-600]="i18n.lang() === 'fr'"
          [class.text-white]="i18n.lang() === 'fr'"
          [class.shadow-xs]="i18n.lang() === 'fr'"
          [class.font-black]="i18n.lang() === 'fr'"
          [class.text-slate-600]="i18n.lang() !== 'fr'"
          [class.hover:text-indigo-600]="i18n.lang() !== 'fr'"
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
        >
          FR
        </button>
        <button
          type="button"
          (click)="i18n.setLang('en')"
          [class.bg-indigo-600]="i18n.lang() === 'en'"
          [class.text-white]="i18n.lang() === 'en'"
          [class.shadow-xs]="i18n.lang() === 'en'"
          [class.font-black]="i18n.lang() === 'en'"
          [class.text-slate-600]="i18n.lang() !== 'en'"
          [class.hover:text-indigo-600]="i18n.lang() !== 'en'"
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
        >
          EN
        </button>
      </div>

      <div class="max-w-3xl w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-200 text-center space-y-8 animate-in fade-in zoom-in duration-200">
        <!-- MARCEL Title with Hover Animation -->
        <div class="flex justify-center w-full">
          <div
            class="group relative flex items-center justify-center overflow-hidden rounded-full bg-indigo-50 border-2 border-indigo-200/50 transition-all duration-500 hover:bg-white hover:border-indigo-300 hover:shadow-2xl shadow-lg h-16 w-72 sm:w-80 hover:w-full max-w-2xl cursor-default"
          >
            <div class="absolute flex w-full items-center justify-center px-4">
              <span
                class="font-black text-3xl sm:text-4xl tracking-wider text-indigo-700 transition-all duration-500 group-hover:-translate-y-16 group-hover:opacity-0 absolute drop-shadow-sm whitespace-nowrap"
              >
                {{ i18n.t('roleSelect.marcelTitle') }}
              </span>
              <span
                class="text-[10px] sm:text-[11px] md:text-xs leading-none uppercase tracking-wider font-semibold text-slate-500 text-center transition-all duration-500 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 absolute w-full px-3 whitespace-nowrap"
              >
                @if (i18n.lang() === 'en') {
                  <span class="font-black text-indigo-700">M</span>odule for
                  <span class="font-black text-indigo-700">A</span>nalysis and
                  <span class="font-black text-indigo-700">R</span>eorientation of
                  <span class="font-black text-indigo-700">C</span>andidates for
                  <span class="font-black text-indigo-700">E</span>nrolment for the
                  <span class="font-black text-indigo-700">L</span>azy
                } @else {
                  <span class="font-black text-indigo-700">M</span>odule
                  d'<span class="font-black text-indigo-700">A</span>nalyse et de
                  <span class="font-black text-indigo-700">R</span>éorientation
                  des
                  <span class="font-black text-indigo-700">C</span>andidats à l'<span class="font-black text-indigo-700">E</span>nrôlement pour les
                  <span class="font-black text-indigo-700">L</span>âches
                }
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h1
            class="text-2xl font-extrabold text-slate-800 tracking-tight"
          >
            {{ i18n.t('aorSelect.title') }}
          </h1>
          <p class="text-sm text-slate-500">
            {{ i18n.t('aorSelect.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          @for (aor of aorService.aorList; track aor.id) {
            <button
              type="button"
              (click)="aorService.selectAor(aor.id)"
              class="group bg-slate-50 hover:bg-indigo-50/70 border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center space-y-3 active:scale-95"
            >
              <div class="w-12 h-12 rounded-2xl bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="text-lg font-extrabold text-slate-800 group-hover:text-indigo-900">
                {{ i18n.t(aor.labelKey) }}
              </span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class AorSelectionComponent {
  public aorService = inject(AorService);
  public i18n = inject(TranslationService);
}
