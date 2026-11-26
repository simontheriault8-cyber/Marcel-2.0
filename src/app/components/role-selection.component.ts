import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AorService } from '../../services/aor.service';
import { TranslationService } from '../i18n';

export interface RoleSelectionEvent {
  role: 'recruiter' | 'gestionnaire';
  hqBordenRole?: 'pas' | 'customer-service';
}

@Component({
  selector: 'app-role-selection',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen w-full bg-slate-100 flex flex-col justify-between p-4 sm:p-6">
      <!-- Top Bar: Tuto Marcel (Left) + Switch AOR & Language Switcher (Right) -->
      <div class="w-full flex flex-wrap items-center justify-between gap-3 z-10">
        <button
          type="button"
          (click)="openTutoMarcel.emit()"
          class="flex items-center gap-2.5 px-4 py-2.5 bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 text-indigo-700 rounded-2xl shadow-sm hover:shadow-md transition-all font-bold text-sm cursor-pointer active:scale-95 group"
        >
          <div class="w-7 h-7 rounded-xl bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white text-indigo-700 flex items-center justify-center transition-colors shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span>{{ i18n.t('roleSelect.tutoMarcel') }}</span>
        </button>

        <div class="flex items-center gap-3 ml-auto">
          <button
            type="button"
            (click)="switchAor.emit()"
            class="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 rounded-2xl shadow-sm hover:shadow-md transition-all font-bold text-xs cursor-pointer active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ i18n.t('header.switchAor') }}</span>
            @if (currentAorLabel()) {
              <span class="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold text-[11px]">{{ currentAorLabel() }}</span>
            }
          </button>

          <div class="flex items-center bg-white border-2 border-slate-200 rounded-2xl p-1 shadow-sm">
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
        </div>
      </div>

      <!-- Center Card -->
      <div class="flex-1 flex items-center justify-center py-6">
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

          <h1 class="text-2xl font-extrabold text-slate-800 tracking-tight">{{ i18n.t('roleSelect.title') }}</h1>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            @if (aorService.selectedAor() === 'hq-borden') {
              <!-- Left: PAS -->
              <button
                type="button"
                (click)="roleSelected.emit({ role: 'recruiter', hqBordenRole: 'pas' })"
                class="w-full group bg-slate-50 hover:bg-indigo-50/70 border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center space-y-4 active:scale-95"
              >
                <div class="w-14 h-14 rounded-2xl bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 class="text-xl font-extrabold text-slate-800 group-hover:text-indigo-900">{{ i18n.t('roleSelect.pas') }}</h3>
              </button>

              <!-- Right: Équipe de service à la clientèle / Customer Service -->
              <button
                type="button"
                (click)="roleSelected.emit({ role: 'recruiter', hqBordenRole: 'customer-service' })"
                class="w-full group bg-slate-50 hover:bg-indigo-50/70 border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center space-y-4 active:scale-95"
              >
                <div class="w-14 h-14 rounded-2xl bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-extrabold text-slate-800 group-hover:text-indigo-900">{{ i18n.t('roleSelect.customerService') }}</h3>
              </button>
            } @else {
              <!-- Left: Gestionnaire de dossier -->
              <button
                type="button"
                (click)="roleSelected.emit({ role: 'gestionnaire' })"
                class="w-full group bg-slate-50 hover:bg-indigo-50/70 border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center space-y-4 active:scale-95"
              >
                <div class="w-14 h-14 rounded-2xl bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 class="text-xl font-extrabold text-slate-800 group-hover:text-indigo-900">{{ i18n.t('roleSelect.fileManager') }}</h3>
              </button>

              <!-- Right: Recruteur -->
              <button
                type="button"
                (click)="roleSelected.emit({ role: 'recruiter' })"
                class="w-full group bg-slate-50 hover:bg-indigo-50/70 border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center space-y-4 active:scale-95"
              >
                <div class="w-14 h-14 rounded-2xl bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 class="text-xl font-extrabold text-slate-800 group-hover:text-indigo-900">{{ i18n.t('roleSelect.recruiter') }}</h3>
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Bottom Bar: Admin Portal Button -->
      <div class="w-full flex items-center justify-start z-10">
        <button
          type="button"
          (click)="openAdminPortal.emit()"
          class="flex items-center gap-2.5 px-4 py-2.5 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-400 text-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-all font-bold text-sm cursor-pointer active:scale-95 group"
        >
          <div class="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-slate-800 group-hover:text-white text-slate-700 flex items-center justify-center transition-colors shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span>{{ i18n.t('admin.buttonLabel') }}</span>
          @if (!adminAuth.isAdminUnlocked()) {
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-amber-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-emerald-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
            </svg>
          }
        </button>
      </div>
    </div>
  `,
})
export class RoleSelectionComponent {
  public i18n = inject(TranslationService);
  public aorService = inject(AorService);
  public adminAuth = inject(AdminAuthService);

  @Output() roleSelected = new EventEmitter<RoleSelectionEvent>();
  @Output() switchAor = new EventEmitter<void>();
  @Output() openTutoMarcel = new EventEmitter<void>();
  @Output() openAdminPortal = new EventEmitter<void>();

  currentAorLabel = computed(() => {
    const aor = this.aorService.currentAor();
    return aor ? this.i18n.t(aor.labelKey) : '';
  });
}
