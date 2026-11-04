import { Component, inject, signal, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../../services/admin-auth.service';
import { TranslationService } from '../../i18n';
import { MelComponent } from '../mel.component';

export type AdminTab = 'mel' | 'extensions';

export interface AdminTabItem {
  id: AdminTab;
  labelKey: string;
  descKey: string;
  iconName: 'mel' | 'extensions';
  badge?: string;
}

@Component({
  selector: 'app-admin-portal',
  standalone: true,
  imports: [CommonModule, MelComponent],
  template: `
    <div class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-6 select-none animate-fadeIn">
      
      <!-- AUTHENTICATION CARD (IF LOCKED) -->
      @if (!adminAuth.isAdminUnlocked()) {
        <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 flex flex-col gap-6 text-slate-800 animate-in fade-in zoom-in-95 duration-200">
          <!-- Icon Header -->
          <div class="flex flex-col items-center text-center gap-3">
            <div class="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 mb-2">
                <span class="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                {{ i18n.t('admin.statusLocked') }}
              </div>
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">{{ i18n.t('admin.authTitle') }}</h2>
              <p class="text-xs text-slate-500 mt-1.5 leading-relaxed">{{ i18n.t('admin.authSubtitle') }}</p>
            </div>
          </div>

          <!-- Password Form -->
          <form (submit)="onUnlockSubmit($event)" class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label for="admin-pwd-input" class="text-xs font-semibold uppercase tracking-wider text-slate-600">
                {{ i18n.t('admin.authPasswordLabel') }}
              </label>
              <div class="relative">
                <input
                  #adminPasswordInput
                  id="admin-pwd-input"
                  [type]="showPassword() ? 'text' : 'password'"
                  [value]="passwordInput()"
                  (input)="onPasswordInput($event)"
                  [placeholder]="i18n.t('admin.authPasswordPlaceholder')"
                  autocomplete="current-password"
                  class="w-full px-4 py-3 pr-11 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  [class.border-red-400]="errorMessage()"
                  [class.focus:border-red-500]="errorMessage()"
                  [class.border-slate-300]="!errorMessage()"
                  [class.focus:border-indigo-600]="!errorMessage()"
                />
                <button
                  type="button"
                  (click)="showPassword.set(!showPassword())"
                  class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-lg cursor-pointer"
                >
                  @if (showPassword()) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                </button>
              </div>

              <!-- Error -->
              @if (errorMessage()) {
                <div class="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ errorMessage() }}</span>
                </div>
              }
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="isLoading() || !passwordInput()"
              class="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-md transition-colors cursor-pointer"
            >
              @if (isLoading()) {
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              }
              {{ i18n.t('admin.authUnlock') }}
            </button>

            <!-- Cancel Button -->
            <button
              type="button"
              (click)="closePortal.emit()"
              class="w-full py-2.5 rounded-xl font-medium text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {{ i18n.t('admin.close') }}
            </button>
          </form>
        </div>
      }

      <!-- FULL ADMIN PORTAL (WHEN UNLOCKED) -->
      @else {
        <div class="w-full h-full max-w-7xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Top Header Bar -->
          <div class="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 shrink-0 border-b border-slate-800">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-lg font-bold tracking-tight text-white">{{ i18n.t('admin.portalTitle') }}</h1>
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {{ i18n.t('admin.statusUnlocked') }}
                  </span>
                </div>
                <p class="text-xs text-slate-400 mt-0.5">{{ i18n.t('admin.portalSubtitle') }}</p>
              </div>
            </div>

            <!-- Top Actions: Lock & Close -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="adminAuth.lock()"
                [title]="i18n.t('admin.authLockTooltip')"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 shadow-sm transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>{{ i18n.t('admin.authLock') }}</span>
              </button>

              <button
                type="button"
                (click)="closePortal.emit()"
                [title]="i18n.t('admin.closeTooltip')"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-sm transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{{ i18n.t('admin.close') }}</span>
              </button>
            </div>
          </div>

          <!-- Extensible Navigation Bar -->
          <div class="bg-slate-100 border-b border-slate-200 px-6 py-2 flex items-center gap-2 shrink-0 overflow-x-auto">
            @for (tab of tabs; track tab.id) {
              <button
                type="button"
                (click)="activeTab.set(tab.id)"
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                [class.bg-white]="activeTab() === tab.id"
                [class.text-indigo-700]="activeTab() === tab.id"
                [class.shadow-xs]="activeTab() === tab.id"
                [class.border]="activeTab() === tab.id"
                [class.border-slate-300]="activeTab() === tab.id"
                [class.text-slate-600]="activeTab() !== tab.id"
                [class.hover:text-slate-900]="activeTab() !== tab.id"
                [class.hover:bg-slate-200/60]="activeTab() !== tab.id"
              >
                @if (tab.iconName === 'mel') {
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                }
                <span>{{ i18n.t(tab.labelKey) }}</span>
                @if (tab.badge) {
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700">
                    {{ tab.badge }}
                  </span>
                }
              </button>
            }
          </div>

          <!-- Main Content Area -->
          <div class="flex-1 min-h-0 flex flex-col overflow-hidden bg-white">
            @if (activeTab() === 'mel') {
              <!-- MEL COMPONENT (MEDICAL EMPLOYMENT LIMITATIONS) -->
              <app-mel class="flex-1 flex flex-col min-h-0 w-full h-full" />
            } @else if (activeTab() === 'extensions') {
              <!-- EXTENSIBLE PLACEHOLDER FOR FUTURE MODULES -->
              <div class="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50 overflow-y-auto">
                <div class="w-16 h-16 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-slate-800">{{ i18n.t('admin.futureTitle') }}</h3>
                <p class="text-sm text-slate-500 max-w-lg mt-2 leading-relaxed">{{ i18n.t('admin.futureNotice') }}</p>
                <div class="mt-6 flex flex-wrap gap-2 justify-center">
                  <span class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                    + Configuration des tables
                  </span>
                  <span class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                    + Journaux d'audit
                  </span>
                  <span class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                    + Gestion des rôles
                  </span>
                </div>
              </div>
            }
          </div>

        </div>
      }
    </div>
  `
})
export class AdminPortalComponent implements AfterViewInit {
  adminAuth = inject(AdminAuthService);
  i18n = inject(TranslationService);

  @Output() closePortal = new EventEmitter<void>();
  @ViewChild('adminPasswordInput') passwordInputRef?: ElementRef<HTMLInputElement>;

  activeTab = signal<AdminTab>('mel');
  passwordInput = signal<string>('');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  // Extensible tabs architecture
  tabs: AdminTabItem[] = [
    {
      id: 'mel',
      labelKey: 'admin.tabMel',
      descKey: 'admin.tabMelDesc',
      iconName: 'mel'
    },
    {
      id: 'extensions',
      labelKey: 'admin.tabFuture',
      descKey: 'admin.tabFutureDesc',
      iconName: 'extensions',
      badge: 'Extensible'
    }
  ];

  ngAfterViewInit(): void {
    if (!this.adminAuth.isAdminUnlocked()) {
      setTimeout(() => {
        this.passwordInputRef?.nativeElement.focus();
      }, 100);
    }
  }

  onPasswordInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.passwordInput.set(target.value);
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  async onUnlockSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const val = this.passwordInput();
    if (!val || this.isLoading()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const success = await this.adminAuth.verifyPassword(val);
    this.isLoading.set(false);

    if (!success) {
      this.errorMessage.set(this.i18n.t('admin.authError'));
      this.passwordInputRef?.nativeElement.focus();
    }
  }
}
