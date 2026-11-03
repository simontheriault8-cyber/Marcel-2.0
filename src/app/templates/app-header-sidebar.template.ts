export const APP_HEADER_SIDEBAR_TEMPLATE = `
    @if (!isAuthenticated()) {
      <div class="h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-4">
        <div class="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-slate-200">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-800 mb-2">{{ i18n.t('auth.restrictedAccess') }}</h2>
          <p class="text-sm text-slate-500 mb-6">{{ i18n.t('auth.enterPasswordDesc') }}</p>
          <form (submit)="checkPassword($event)">
            <div class="relative mb-4">
              <input [type]="showPassword() ? 'text' : 'password'" [ngModel]="passwordInput()" (ngModelChange)="passwordInput.set($event)" [ngModelOptions]="{standalone: true}" class="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-center text-lg tracking-widest transition-all pr-12" [placeholder]="i18n.t('auth.passwordPlaceholder')" />
              <button type="button" (click)="showPassword.set(!showPassword())" class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 focus:outline-none">
                @if (showPassword()) {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              </button>
            </div>
            @if (authError()) {
              <p class="text-red-500 text-sm mb-4 font-medium animate-pulse">{{ i18n.t('auth.invalidPassword') }}</p>
            }
            <button type="submit" class="w-full py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-md active:scale-95 flex justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ i18n.t('auth.unlock') }}
            </button>
          </form>
        </div>
      </div>
    } @else if (selectedRole() === 'none') {
      @if (showTutoMarcel()) {
        <app-tuto-marcel (close)="closeTutoMarcel()" />
      } @else {
        <div class="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-6 relative">
          <!-- Top Left: Tuto Marcel Button -->
          <div class="absolute top-6 left-6 z-10">
            <button
              (click)="openTutoMarcel()"
              class="flex items-center gap-2.5 px-4 py-2.5 bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 text-indigo-700 rounded-2xl shadow-sm hover:shadow-md transition-all font-bold text-sm cursor-pointer active:scale-95 group"
              [title]="i18n.t('roleSelect.tutoMarcelTitle')"
            >
              <div class="w-7 h-7 rounded-xl bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white text-indigo-700 flex items-center justify-center transition-colors shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span>{{ i18n.t('roleSelect.tutoMarcel') }}</span>
            </button>
          </div>

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
              [title]="i18n.t('lang.switchToFrench')"
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
              [title]="i18n.t('lang.switchToEnglish')"
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
                    >{{ i18n.t('roleSelect.marcelTitle') }}</span
                  >
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
              <!-- Left: Gestionnaire de dossier -->
              <div 
                (click)="selectRole('gestionnaire')"
                class="group bg-slate-50 hover:bg-indigo-50/70 border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center space-y-4"
              >
                <div class="w-14 h-14 rounded-2xl bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 class="text-xl font-extrabold text-slate-800 group-hover:text-indigo-900">{{ i18n.t('roleSelect.fileManager') }}</h3>
              </div>

              <!-- Right: Recruteur -->
              <div 
                (click)="selectRole('recruiter')"
                class="group bg-slate-50 hover:bg-indigo-50/70 border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center justify-center space-y-4"
              >
                <div class="w-14 h-14 rounded-2xl bg-white group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 class="text-xl font-extrabold text-slate-800 group-hover:text-indigo-900">{{ i18n.t('roleSelect.recruiter') }}</h3>
              </div>
            </div>

          </div>
        </div>
      }
    } @else {
    @if (showSignaturePage()) {
      <div class="h-screen w-full bg-slate-100 flex flex-col p-6 overflow-hidden select-none">
        <!-- Header -->
        <div class="max-w-5xl w-full mx-auto flex items-center justify-between mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 shrink-0">
          <div class="flex items-center gap-4">
            <button (click)="closeSignaturePage()" class="p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-600 border border-transparent hover:border-slate-200 cursor-pointer" [title]="i18n.t('header.back')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                {{ i18n.t('sigPage.title') }}
              </h1>
              <p class="text-xs text-slate-500 mt-0.5">{{ i18n.t('sigPage.subtitle') }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button (click)="resetSignatures()" class="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl transition-all text-sm font-semibold flex items-center gap-2 active:scale-95 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H17M4 9a8.001 8.001 0 0113.313-2.24L20 9" />
              </svg>
              {{ i18n.t('sigPage.resetActive') }}
            </button>
            <button (click)="saveSignatures()" class="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-sm font-semibold flex items-center gap-2 shadow-md active:scale-95 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ i18n.t('sigPage.saveAll') }}
            </button>
          </div>
        </div>

        <!-- Section Tabs Navigation -->
        <div class="max-w-5xl w-full mx-auto mb-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 w-full sm:w-auto">
            <button
              (click)="signatureSection.set('normal')"
              [class.bg-white]="signatureSection() === 'normal'"
              [class.text-indigo-700]="signatureSection() === 'normal'"
              [class.shadow-sm]="signatureSection() === 'normal'"
              [class.font-bold]="signatureSection() === 'normal'"
              [class.text-slate-600]="signatureSection() !== 'normal'"
              class="flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {{ i18n.t('sigPage.tabNormal') }}
            </button>
            <button
              (click)="signatureSection.set('ota')"
              [class.bg-white]="signatureSection() === 'ota'"
              [class.text-purple-700]="signatureSection() === 'ota'"
              [class.shadow-sm]="signatureSection() === 'ota'"
              [class.font-bold]="signatureSection() === 'ota'"
              [class.text-slate-600]="signatureSection() !== 'ota'"
              class="flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              {{ i18n.t('sigPage.tabOta') }}
            </button>
          </div>

          <!-- Scope Context Notice -->
          <div class="text-xs px-3 py-1.5 rounded-lg border flex items-center gap-2 font-medium"
            [class.bg-blue-50]="signatureSection() === 'normal'"
            [class.border-blue-200]="signatureSection() === 'normal'"
            [class.text-blue-800]="signatureSection() === 'normal'"
            [class.bg-purple-50]="signatureSection() === 'ota'"
            [class.border-purple-200]="signatureSection() === 'ota'"
            [class.text-purple-800]="signatureSection() === 'ota'"
          >
            <span class="inline-block w-2 h-2 rounded-full" [class.bg-blue-600]="signatureSection() === 'normal'" [class.bg-purple-600]="signatureSection() === 'ota'"></span>
            @if (signatureSection() === 'normal') {
              <span>{{ i18n.t('sigPage.scopeNormal') }}</span>
            } @else {
              <span>{{ i18n.t('sigPage.scopeOta') }}</span>
            }
          </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 pb-4">
          @if (signatureSection() === 'normal') {
            <!-- French signature card (Normal) -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
              <div class="flex items-center justify-between mb-3 shrink-0">
                <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                  <span class="bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">FR</span>
                  {{ i18n.t('sigPage.frTitleNormal') }}
                </h2>
                <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{{ i18n.t('sigPage.standardBadge') }}</span>
              </div>
              <p class="text-xs text-slate-500 mb-4 shrink-0">{{ i18n.t('sigPage.frDescNormal') }}</p>
              <textarea [(ngModel)]="sigFrTemp" class="w-full flex-1 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-slate-50/30" [placeholder]="i18n.t('sigPage.frPlaceholderNormal')"></textarea>
            </div>

            <!-- English signature card (Normal) -->
            <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
              <div class="flex items-center justify-between mb-3 shrink-0">
                <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                  <span class="bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">EN</span>
                  {{ i18n.t('sigPage.enTitleNormal') }}
                </h2>
                <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{{ i18n.t('sigPage.standardBadge') }}</span>
              </div>
              <p class="text-xs text-slate-500 mb-4 shrink-0">{{ i18n.t('sigPage.enDescNormal') }}</p>
              <textarea [(ngModel)]="sigEnTemp" class="w-full flex-1 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-slate-50/30" [placeholder]="i18n.t('sigPage.enPlaceholderNormal')"></textarea>
            </div>
          } @else {
            <!-- French signature card (OTA) -->
            <div class="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
              <div class="flex items-center justify-between mb-3 shrink-0">
                <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                  <span class="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">FR</span>
                  {{ i18n.t('sigPage.frTitleOta') }}
                </h2>
                <span class="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">{{ i18n.t('sigPage.otaBadge') }}</span>
              </div>
              <p class="text-xs text-slate-500 mb-4 shrink-0">{{ i18n.t('sigPage.frDescOta') }}</p>
              <textarea [(ngModel)]="sigOtaFrTemp" class="w-full flex-1 p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-purple-50/20" [placeholder]="i18n.t('sigPage.frPlaceholderOta')"></textarea>
            </div>

            <!-- English signature card (OTA) -->
            <div class="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
              <div class="flex items-center justify-between mb-3 shrink-0">
                <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                  <span class="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">EN</span>
                  {{ i18n.t('sigPage.enTitleOta') }}
                </h2>
                <span class="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">{{ i18n.t('sigPage.otaBadge') }}</span>
              </div>
              <p class="text-xs text-slate-500 mb-4 shrink-0">{{ i18n.t('sigPage.enDescOta') }}</p>
              <textarea [(ngModel)]="sigOtaEnTemp" class="w-full flex-1 p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-purple-50/20" [placeholder]="i18n.t('sigPage.enPlaceholderOta')"></textarea>
            </div>
          }
        </div>

        <!-- Toast message for Save feedback -->
        @if (showToast()) {
          <div class="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2.5 transition-all z-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm font-semibold">{{ i18n.t('sigPage.toastSaved') }}</span>
          </div>
        }
      </div>
    } @else {
      <!-- INTRO SCREEN -->
      @if (stage() === "intro" && selectedRole() === "recruiter") {
      <div
        class="h-screen w-full bg-slate-200 flex flex-col items-center justify-center p-4 relative"
      >
        <div class="absolute top-4 right-4 flex items-center gap-3 z-50">
          <!-- Job Search Button (Intro) -->
          <button
            (click)="toggleJobSearch()"
            class="bg-indigo-100 border border-indigo-200 text-indigo-800 hover:bg-indigo-200 h-10 w-10 rounded-full shadow-sm transition-all font-sans flex items-center justify-center text-sm font-black cursor-pointer active:scale-95"
            [title]="i18n.t('header.reoTooltip')"
          >
            {{ i18n.t('header.reo') }}
          </button>

          <!-- Switch Role Button (Intro Recruiter) -->
          <button
            (click)="switchRole()"
            class="bg-white border border-slate-300 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 h-10 px-4 rounded-xl shadow-sm transition-all font-sans flex items-center justify-center text-xs font-bold gap-2 cursor-pointer active:scale-95"
            [title]="i18n.t('header.switchRoleTitle')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <span>{{ i18n.t('header.switchRole') }}</span>
          </button>
        </div>

        <div
          class="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border border-white/50 relative z-0"
        >
          <div class="mb-8">
            <div
              class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">
              {{ i18n.t('intro.minorTitle') }}
            </h1>
            <p class="text-lg text-slate-600">{{ i18n.t('intro.minorQuestion') }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              (click)="startMinorCheck()"
              class="py-4 px-6 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition-colors shadow-lg active:scale-95 cursor-pointer"
            >
              {{ i18n.t('intro.yes') }}
            </button>
            <button
              (click)="onRecruiterMinorCheckNon()"
              class="py-4 px-6 bg-white text-slate-800 border-2 border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-sm active:scale-95 cursor-pointer"
            >
              {{ i18n.t('intro.no') }}
            </button>
          </div>
        </div>
      </div>
    } @else if (stage() === "recruiter-dossier-type" && selectedRole() === "recruiter") {
      <div
        class="h-screen w-full bg-slate-200 flex flex-col items-center justify-center p-4 relative"
      >
        <div class="absolute top-4 right-4 flex items-center gap-3 z-50">
          <button
            (click)="backToRecruiterMinorCheck()"
            class="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 h-10 px-4 rounded-xl shadow-sm transition-all font-sans flex items-center justify-center text-xs font-bold gap-2 cursor-pointer active:scale-95"
            [title]="i18n.t('header.backTitle')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{{ i18n.t('header.back') }}</span>
          </button>

          <!-- Switch Role Button -->
          <button
            (click)="switchRole()"
            class="bg-white border border-slate-300 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 h-10 px-4 rounded-xl shadow-sm transition-all font-sans flex items-center justify-center text-xs font-bold gap-2 cursor-pointer active:scale-95"
            [title]="i18n.t('header.switchRoleTitle')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <span>{{ i18n.t('header.switchRole') }}</span>
          </button>
        </div>

        <div
          class="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border border-white/50 relative z-0"
        >
          <div class="mb-8">
            <div
              class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">
              {{ i18n.t('intro.dossierTypeTitle') }}
            </h1>
            <p class="text-lg text-slate-600">{{ i18n.t('intro.recruiterDossierQuestion') }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              (click)="selectRecruiterDossierType('normal')"
              class="py-4 px-6 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition-colors shadow-lg active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-1"
            >
              <span>{{ i18n.t('intro.normal') }}</span>
            </button>
            <button
              (click)="selectRecruiterDossierType('pfor')"
              class="py-4 px-6 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-1"
            >
              <span>{{ i18n.t('intro.pfor') }}</span>
            </button>
          </div>
        </div>
      </div>
    } @else if (stage() === "intro" && selectedRole() === "gestionnaire") {
      <div
        class="h-screen w-full bg-slate-200 flex flex-col items-center justify-center p-4 relative"
      >
        <!-- Switch Role Button (Intro GD) -->
        <button
          (click)="switchRole()"
          class="absolute top-4 right-4 bg-white border border-slate-300 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 h-10 px-4 rounded-xl shadow-sm transition-all z-50 font-sans flex items-center justify-center text-xs font-bold gap-2 cursor-pointer active:scale-95"
          [title]="i18n.t('header.switchRoleTitle')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <span>{{ i18n.t('header.switchRole') }}</span>
        </button>

        <div
          class="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border border-white/50 relative z-0"
        >
          <div class="mb-8">
            <div
              class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">
              {{ i18n.t('intro.dossierTypeTitle') }}
            </h1>
            <p class="text-lg text-slate-600">{{ i18n.t('intro.gdDossierQuestion') }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button
              (click)="selectGdDossierType('Local')"
              class="py-4 px-6 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition-colors shadow-lg active:scale-95 cursor-pointer"
            >
              {{ i18n.t('intro.local') }}
            </button>
            <button
              (click)="selectGdDossierType('OTA')"
              class="py-4 px-6 bg-white text-slate-800 border-2 border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-sm active:scale-95 cursor-pointer"
            >
              {{ i18n.t('intro.ota') }}
            </button>
          </div>
        </div>
      </div>
    } @else {
      <!-- Main Container: Vertical layout now -->
      <div
        class="min-h-screen w-full bg-slate-200 text-slate-800 p-4 flex flex-col gap-4 font-sans relative"
      >
        <!-- TOP HEADER ROW -->
        <div class="flex items-stretch w-full shrink-0 gap-4">
          <!-- Role Title Panel (Top-Left 2x2 Pastilles) -->
          <div
            class="bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex flex-col justify-between items-center gap-2 flex-1 min-w-[320px]"
          >
            <h1
              class="text-xs font-black tracking-wider uppercase text-center border-b border-slate-100 pb-1.5 w-full px-1"
              [class.text-indigo-800]="selectedRole() === 'recruiter'"
              [class.text-amber-800]="selectedRole() === 'gestionnaire'"
            >
              {{ selectedRole() === 'recruiter' ? i18n.t('header.roleRecruiter') : i18n.t('header.roleFileManager', { type: (evaluationMedicaleType() === 'Dossier OTA' ? i18n.t('intro.ota') : i18n.t('intro.local')) }) }}
            </h1>

            <div class="grid grid-cols-2 gap-2 w-full flex-1">
              <!-- Top-Left: Reset -->
              <button
                (click)="restartApp()"
                class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer w-full h-full"
                [title]="i18n.t('header.resetTitle')"
              >
                <svg
                  class="h-3.5 w-3.5 shrink-0 text-slate-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>{{ i18n.t('header.reset') }}</span>
              </button>

              <!-- Top-Right: Réo / Enrôlement -->
              <button
                (click)="toggleJobSearch()"
                class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-xs font-bold border border-indigo-200 shadow-xs transition-all active:scale-95 cursor-pointer w-full h-full"
                [title]="selectedRole() === 'gestionnaire' ? i18n.t('header.enrolmentTooltip') : i18n.t('header.reoTooltip')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 shrink-0 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{{ selectedRole() === 'gestionnaire' ? i18n.t('header.enrolment') : i18n.t('header.reo') }}</span>
              </button>

              <!-- Bottom-Left: Signature -->
              <button
                (click)="toggleSignatureSettings()"
                class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer w-full h-full"
                [title]="i18n.t('header.signatureTooltip')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 shrink-0 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{{ i18n.t('header.signature') }}</span>
              </button>

              <!-- Bottom-Right: Banque de courriels Dropdown -->
              <div class="relative w-full h-full email-bank-dropdown-container">
                <button
                  (click)="toggleEmailBankDropdown($event)"
                  class="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer w-full h-full text-left"
                  [class.bg-indigo-600]="selectedEmailBankTemplate() !== ''"
                  [class.text-white]="selectedEmailBankTemplate() !== ''"
                  [class.border-indigo-700]="selectedEmailBankTemplate() !== ''"
                  [class.hover:bg-indigo-700]="selectedEmailBankTemplate() !== ''"
                  [class.bg-slate-100]="selectedEmailBankTemplate() === ''"
                  [class.text-slate-700]="selectedEmailBankTemplate() === ''"
                  [class.border-slate-200]="selectedEmailBankTemplate() === ''"
                  [class.hover:bg-slate-200]="selectedEmailBankTemplate() === ''"
                  [title]="i18n.t('header.emailBank')"
                >
                  <div class="flex items-center gap-1.5 min-w-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span class="truncate font-semibold">{{ i18n.t('header.emailBank') }}</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3 shrink-0 transition-transform duration-200"
                    [class.rotate-180]="isEmailBankDropdownOpen()"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                @if (isEmailBankDropdownOpen()) {
                  <div
                    class="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div class="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                      <span>{{ i18n.t('header.emailBank') }}</span>
                      @if (selectedEmailBankTemplate() !== '') {
                        <button
                          (click)="selectEmailBankTemplate('')"
                          class="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer text-[10px]"
                        >
                          {{ i18n.t('header.emailBankReset') }}
                        </button>
                      }
                    </div>

                    @if (selectedRole() === 'recruiter') {
                      <button
                        (click)="selectEmailBankTemplate('general_reminder')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'general_reminder'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'general_reminder'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'general_reminder'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.generalReminder') }}</span>
                        @if (selectedEmailBankTemplate() === 'general_reminder') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('verification_edo_vs_pfor')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'verification_edo_vs_pfor'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'verification_edo_vs_pfor'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'verification_edo_vs_pfor'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.verifEdoVsPfor') }}</span>
                        @if (selectedEmailBankTemplate() === 'verification_edo_vs_pfor') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('verification_depot_releves_cmr')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'verification_depot_releves_cmr'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'verification_depot_releves_cmr'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'verification_depot_releves_cmr'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.verifDepotRelevesCmr') }}</span>
                        @if (selectedEmailBankTemplate() === 'verification_depot_releves_cmr') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('inadmissibilite_age_57')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'inadmissibilite_age_57'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'inadmissibilite_age_57'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'inadmissibilite_age_57'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.inadmissibiliteAge57') }}</span>
                        @if (selectedEmailBankTemplate() === 'inadmissibilite_age_57') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('inadmissibilite_pr_3ans')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'inadmissibilite_pr_3ans'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'inadmissibilite_pr_3ans'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'inadmissibilite_pr_3ans'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.inadmissibilitePr3ans') }}</span>
                        @if (selectedEmailBankTemplate() === 'inadmissibilite_pr_3ans') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('inadmissibilite_non_citoyen_ni_pr')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'inadmissibilite_non_citoyen_ni_pr'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'inadmissibilite_non_citoyen_ni_pr'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'inadmissibilite_non_citoyen_ni_pr'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.inadmissibiliteNonCitoyen') }}</span>
                        @if (selectedEmailBankTemplate() === 'inadmissibilite_non_citoyen_ni_pr') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('inadmissibilite_scolarite')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'inadmissibilite_scolarite'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'inadmissibilite_scolarite'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'inadmissibilite_scolarite'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.inadmissibiliteScolarite') }}</span>
                        @if (selectedEmailBankTemplate() === 'inadmissibilite_scolarite') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>
                    } @else {
                      <button
                        (click)="selectEmailBankTemplate('tentative_offre_gd')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'tentative_offre_gd'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'tentative_offre_gd'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'tentative_offre_gd'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.tentativeOffreGd') }}</span>
                        @if (selectedEmailBankTemplate() === 'tentative_offre_gd') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('verification_dossier_cadet')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'verification_dossier_cadet'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'verification_dossier_cadet'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'verification_dossier_cadet'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.verifDossierCadet') }}</span>
                        @if (selectedEmailBankTemplate() === 'verification_dossier_cadet') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('bris_bail_entreposage')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'bris_bail_entreposage'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'bris_bail_entreposage'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'bris_bail_entreposage'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.brisBailEntreposage') }}</span>
                        @if (selectedEmailBankTemplate() === 'bris_bail_entreposage') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('demande_nav_tan')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'demande_nav_tan'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'demande_nav_tan'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'demande_nav_tan'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.demandeNavTan') }}</span>
                        @if (selectedEmailBankTemplate() === 'demande_nav_tan') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('demande_autorisation_cspn')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'demande_autorisation_cspn'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'demande_autorisation_cspn'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'demande_autorisation_cspn'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.demandeAutorisationCspn') }}</span>
                        @if (selectedEmailBankTemplate() === 'demande_autorisation_cspn') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('documents_conjoint_de_fait')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'documents_conjoint_de_fait'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'documents_conjoint_de_fait'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'documents_conjoint_de_fait'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.documentsConjointDeFait') }}</span>
                        @if (selectedEmailBankTemplate() === 'documents_conjoint_de_fait') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('demande_sdpm_conjoint_militaire')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.demandeSdpmConjointMil') }}</span>
                        @if (selectedEmailBankTemplate() === 'demande_sdpm_conjoint_militaire') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('test_esom_confirmation')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'test_esom_confirmation'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'test_esom_confirmation'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'test_esom_confirmation'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.testEsomConfirmation') }}</span>
                        @if (selectedEmailBankTemplate() === 'test_esom_confirmation') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>

                      <button
                        (click)="selectEmailBankTemplate('inapte_medical_omr')"
                        class="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        [class.bg-indigo-50/80]="selectedEmailBankTemplate() === 'inapte_medical_omr'"
                        [class.font-bold]="selectedEmailBankTemplate() === 'inapte_medical_omr'"
                        [class.text-indigo-900]="selectedEmailBankTemplate() === 'inapte_medical_omr'"
                      >
                        <span class="truncate">{{ i18n.t('emailBank.inapteMedicalOmr') }}</span>
                        @if (selectedEmailBankTemplate() === 'inapte_medical_omr') {
                          <svg class="h-4 w-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        }
                      </button>
                    }
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Panel: Métiers au dossier du postulant -->
          <div
            class="bg-white p-3 rounded-2xl shadow-md border border-slate-200 flex flex-col gap-2 flex-1 min-w-[320px]"
          >
            <div class="flex items-center justify-between border-b border-slate-100 pb-1.5 px-1">
              <h2 class="text-xs font-black tracking-wider text-slate-800 uppercase flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {{ i18n.t('dossierJobs.panelTitle') }}
              </h2>

              <div class="flex items-center gap-3">
                @if (selectedRole() === 'recruiter') {
                  @if (recruiterDossierType() === 'pfor') {
                    <span
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-300 text-indigo-900 text-[11px] font-black uppercase tracking-wider select-none shadow-2xs"
                      [title]="i18n.t('dossierJobs.pforCandidateTitle')"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{{ i18n.t('dossierJobs.pforCandidateBadge') }}</span>
                    </span>
                  }
                } @else {
                  <label
                    class="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-bold cursor-pointer transition-all select-none shadow-2xs"
                    [class.bg-indigo-50]="sharedState.isPostulantPfor()"
                    [class.border-indigo-300]="sharedState.isPostulantPfor()"
                    [class.text-indigo-900]="sharedState.isPostulantPfor()"
                    [class.bg-slate-50]="!sharedState.isPostulantPfor()"
                    [class.border-slate-200]="!sharedState.isPostulantPfor()"
                    [class.text-slate-600]="!sharedState.isPostulantPfor()"
                    [title]="i18n.t('dossierJobs.pforCandidateTitle')"
                  >
                    <input
                      type="checkbox"
                      [checked]="sharedState.isPostulantPfor()"
                      (change)="sharedState.isPostulantPfor.set(!sharedState.isPostulantPfor())"
                      class="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                    />
                    <span>{{ i18n.t('dossierJobs.pforCandidateBadge') }}</span>
                  </label>
                }

                <button
                  (click)="switchRole()"
                  class="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  [title]="i18n.t('header.switchRoleTitle')"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>{{ i18n.t('header.switchRole') }}</span>
                </button>
              </div>
            </div>

            <!-- 3 Columns for 3 Jobs -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <!-- Slot 1 -->
              <div class="relative flex flex-col gap-1 p-2 bg-slate-50/80 border border-slate-200 rounded-xl">
                <div class="flex items-center justify-between text-[11px] font-bold">
                  <span class="uppercase tracking-wider text-slate-500">{{ i18n.t('dossierJobs.choice1') }}</span>
                  @if (getDossierJob(1)) {
                    @let job1 = getDossierJob(1)!;
                    @let programs1 = jobService.getJobPrograms(job1.id);
                    <div class="flex flex-wrap gap-1 justify-end max-w-[70%]">
                      @for (prog of getObjectKeys(programs1); track prog) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold border"
                          [class.bg-emerald-100]="programs1[prog] === 'o'"
                          [class.text-emerald-800]="programs1[prog] === 'o'"
                          [class.border-emerald-200]="programs1[prog] === 'o'"
                          [class.bg-amber-100]="programs1[prog] === 'limité'"
                          [class.text-amber-800]="programs1[prog] === 'limité'"
                          [class.border-amber-200]="programs1[prog] === 'limité'"
                          [class.bg-rose-100]="programs1[prog] === 'f'"
                          [class.text-rose-800]="programs1[prog] === 'f'"
                          [class.border-rose-200]="programs1[prog] === 'f'"
                        >
                          {{ prog }}
                        </span>
                      }
                      @if (getObjectKeys(programs1).length === 0) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          N/A
                        </span>
                      }
                    </div>
                  }
                </div>

                <div class="relative">
                  <div
                    class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 text-xs min-h-[34px]"
                    [class.opacity-50]="isDossierFieldDisabled(1)"
                    [class.bg-slate-100]="isDossierFieldDisabled(1)"
                    [class.cursor-not-allowed]="isDossierFieldDisabled(1)"
                  >
                    <input
                      type="text"
                      [ngModel]="sharedState.searchDossierQuery1()"
                      (ngModelChange)="onDossierQueryChange(1, $event)"
                      (focus)="openDossierDropdown(1)"
                      (blur)="closeDossierDropdownDelayed(1)"
                      [disabled]="isDossierFieldDisabled(1)"
                      class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                      [class.cursor-not-allowed]="isDossierFieldDisabled(1)"
                      [placeholder]="i18n.t('dossierJobs.searchPlaceholder1')"
                    />
                    @if (sharedState.selectedDossierJobId1() && !isDossierFieldDisabled(1)) {
                      <button
                        (click)="clearDossierJob(1, $event)"
                        class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        [title]="i18n.t('dossierJobs.clearChoice1')"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    }
                  </div>

                  <!-- Dropdown List -->
                  @if (dossierDropdownOpen1() && !isDossierFieldDisabled(1)) {
                    <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                      @let filtered1 = getFilteredJobsForIndex(1);
                      @if (filtered1.length === 0) {
                        <div class="p-2 text-slate-400 text-center italic">{{ i18n.t('dossierJobs.noJobFound') }}</div>
                      }
                      @for (job of filtered1; track job.id) {
                        <button
                          type="button"
                          (mousedown)="selectDossierJob(1, job.id)"
                          class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        >
                          <span class="font-medium text-slate-800 truncate">{{ jobService.getJobDisplayLabel(job, i18n.currentLang()) }}</span>
                        </button>
                      }
                    </div>
                  }
                </div>

                <!-- Checkbox Ne rencontre pas les CE -->
                @if (getDossierJob(1)) {
                  <label class="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      [ngModel]="sharedState.dossierJobFailedCe1()"
                      (ngModelChange)="sharedState.dossierJobFailedCe1.set($event)"
                      class="h-3.5 w-3.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
                    />
                    <span [class.text-rose-700]="sharedState.dossierJobFailedCe1()" [class.font-bold]="sharedState.dossierJobFailedCe1()">
                      {{ i18n.t('dossierJobs.failedCe') }}
                    </span>
                  </label>
                }
              </div>

              <!-- Slot 2 -->
              <div class="relative flex flex-col gap-1 p-2 bg-slate-50/80 border border-slate-200 rounded-xl">
                <div class="flex items-center justify-between text-[11px] font-bold">
                  <span class="uppercase tracking-wider text-slate-500">{{ i18n.t('dossierJobs.choice2') }}</span>
                  @if (getDossierJob(2)) {
                    @let job2 = getDossierJob(2)!;
                    @let programs2 = jobService.getJobPrograms(job2.id);
                    <div class="flex flex-wrap gap-1 justify-end max-w-[70%]">
                      @for (prog of getObjectKeys(programs2); track prog) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold border"
                          [class.bg-emerald-100]="programs2[prog] === 'o'"
                          [class.text-emerald-800]="programs2[prog] === 'o'"
                          [class.border-emerald-200]="programs2[prog] === 'o'"
                          [class.bg-amber-100]="programs2[prog] === 'limité'"
                          [class.text-amber-800]="programs2[prog] === 'limité'"
                          [class.border-amber-200]="programs2[prog] === 'limité'"
                          [class.bg-rose-100]="programs2[prog] === 'f'"
                          [class.text-rose-800]="programs2[prog] === 'f'"
                          [class.border-rose-200]="programs2[prog] === 'f'"
                        >
                          {{ prog }}
                        </span>
                      }
                      @if (getObjectKeys(programs2).length === 0) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          N/A
                        </span>
                      }
                    </div>
                  }
                </div>

                <div class="relative">
                  <div
                    class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 text-xs min-h-[34px]"
                    [class.opacity-50]="isDossierFieldDisabled(2)"
                    [class.bg-slate-100]="isDossierFieldDisabled(2)"
                    [class.cursor-not-allowed]="isDossierFieldDisabled(2)"
                  >
                    <input
                      type="text"
                      [ngModel]="sharedState.searchDossierQuery2()"
                      (ngModelChange)="onDossierQueryChange(2, $event)"
                      (focus)="openDossierDropdown(2)"
                      (blur)="closeDossierDropdownDelayed(2)"
                      [disabled]="isDossierFieldDisabled(2)"
                      class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                      [class.cursor-not-allowed]="isDossierFieldDisabled(2)"
                      [placeholder]="i18n.t('dossierJobs.searchPlaceholder2')"
                    />
                    @if (sharedState.selectedDossierJobId2() && !isDossierFieldDisabled(2)) {
                      <button
                        (click)="clearDossierJob(2, $event)"
                        class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        [title]="i18n.t('dossierJobs.clearChoice2')"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    }
                  </div>

                  <!-- Dropdown List -->
                  @if (dossierDropdownOpen2() && !isDossierFieldDisabled(2)) {
                    <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                      @let filtered2 = getFilteredJobsForIndex(2);
                      @if (filtered2.length === 0) {
                        <div class="p-2 text-slate-400 text-center italic">{{ i18n.t('dossierJobs.noJobFound') }}</div>
                      }
                      @for (job of filtered2; track job.id) {
                        <button
                          type="button"
                          (mousedown)="selectDossierJob(2, job.id)"
                          class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        >
                          <span class="font-medium text-slate-800 truncate">{{ jobService.getJobDisplayLabel(job, i18n.currentLang()) }}</span>
                        </button>
                      }
                    </div>
                  }
                </div>

                <!-- Checkbox Ne rencontre pas les CE -->
                @if (getDossierJob(2)) {
                  <label class="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      [ngModel]="sharedState.dossierJobFailedCe2()"
                      (ngModelChange)="sharedState.dossierJobFailedCe2.set($event)"
                      class="h-3.5 w-3.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
                    />
                    <span [class.text-rose-700]="sharedState.dossierJobFailedCe2()" [class.font-bold]="sharedState.dossierJobFailedCe2()">
                      {{ i18n.t('dossierJobs.failedCe') }}
                    </span>
                  </label>
                }
              </div>

              <!-- Slot 3 -->
              <div class="relative flex flex-col gap-1 p-2 bg-slate-50/80 border border-slate-200 rounded-xl">
                <div class="flex items-center justify-between text-[11px] font-bold">
                  <span class="uppercase tracking-wider text-slate-500">{{ i18n.t('dossierJobs.choice3') }}</span>
                  @if (getDossierJob(3)) {
                    @let job3 = getDossierJob(3)!;
                    @let programs3 = jobService.getJobPrograms(job3.id);
                    <div class="flex flex-wrap gap-1 justify-end max-w-[70%]">
                      @for (prog of getObjectKeys(programs3); track prog) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold border"
                          [class.bg-emerald-100]="programs3[prog] === 'o'"
                          [class.text-emerald-800]="programs3[prog] === 'o'"
                          [class.border-emerald-200]="programs3[prog] === 'o'"
                          [class.bg-amber-100]="programs3[prog] === 'limité'"
                          [class.text-amber-800]="programs3[prog] === 'limité'"
                          [class.border-amber-200]="programs3[prog] === 'limité'"
                          [class.bg-rose-100]="programs3[prog] === 'f'"
                          [class.text-rose-800]="programs3[prog] === 'f'"
                          [class.border-rose-200]="programs3[prog] === 'f'"
                        >
                          {{ prog }}
                        </span>
                      }
                      @if (getObjectKeys(programs3).length === 0) {
                        <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          N/A
                        </span>
                      }
                    </div>
                  }
                </div>

                <div class="relative">
                  <div
                    class="flex items-center border border-slate-300 rounded-lg bg-white shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 text-xs min-h-[34px]"
                    [class.opacity-50]="isDossierFieldDisabled(3)"
                    [class.bg-slate-100]="isDossierFieldDisabled(3)"
                    [class.cursor-not-allowed]="isDossierFieldDisabled(3)"
                  >
                    <input
                      type="text"
                      [ngModel]="sharedState.searchDossierQuery3()"
                      (ngModelChange)="onDossierQueryChange(3, $event)"
                      (focus)="openDossierDropdown(3)"
                      (blur)="closeDossierDropdownDelayed(3)"
                      [disabled]="isDossierFieldDisabled(3)"
                      class="w-full px-2.5 py-1.5 text-xs outline-none bg-transparent font-medium text-slate-800"
                      [class.cursor-not-allowed]="isDossierFieldDisabled(3)"
                      [placeholder]="i18n.t('dossierJobs.searchPlaceholder3')"
                    />
                    @if (sharedState.selectedDossierJobId3() && !isDossierFieldDisabled(3)) {
                      <button
                        (click)="clearDossierJob(3, $event)"
                        class="p-1 px-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        [title]="i18n.t('dossierJobs.clearChoice3')"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    }
                  </div>

                  <!-- Dropdown List -->
                  @if (dossierDropdownOpen3() && !isDossierFieldDisabled(3)) {
                    <div class="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                      @let filtered3 = getFilteredJobsForIndex(3);
                      @if (filtered3.length === 0) {
                        <div class="p-2 text-slate-400 text-center italic">{{ i18n.t('dossierJobs.noJobFound') }}</div>
                      }
                      @for (job of filtered3; track job.id) {
                        <button
                          type="button"
                          (mousedown)="selectDossierJob(3, job.id)"
                          class="w-full text-left px-2.5 py-1.5 hover:bg-indigo-50 flex items-center justify-between gap-2 transition cursor-pointer"
                        >
                          <span class="font-medium text-slate-800 truncate">{{ jobService.getJobDisplayLabel(job, i18n.currentLang()) }}</span>
                        </button>
                      }
                    </div>
                  }
                </div>

                <!-- Checkbox Ne rencontre pas les CE -->
                @if (getDossierJob(3)) {
                  <label class="flex items-center gap-1.5 mt-0.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      [ngModel]="sharedState.dossierJobFailedCe3()"
                      (ngModelChange)="sharedState.dossierJobFailedCe3.set($event)"
                      class="h-3.5 w-3.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
                    />
                    <span [class.text-rose-700]="sharedState.dossierJobFailedCe3()" [class.font-bold]="sharedState.dossierJobFailedCe3()">
                      {{ i18n.t('dossierJobs.failedCe') }}
                    </span>
                  </label>
                }
              </div>
            </div>
          </div>

          <!-- Minor Check Banner (if active) -->
          @if (stage() === "minor-check") {
            <div
              class="bg-indigo-900 text-white p-3.5 rounded-2xl shadow-md flex justify-between items-center flex-1 self-center"
            >
              <div class="flex items-center gap-3">
                <span
                  class="bg-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
                  >{{ i18n.t('minorBanner.badge') }}</span
                >
                <span class="text-sm font-medium opacity-90"
                  >{{ i18n.t('minorBanner.text') }}</span
                >
              </div>

              <button
                (click)="startMainProgram()"
                class="px-4 py-2 bg-white text-indigo-900 rounded-lg text-sm font-bold shadow-sm transition-all hover:bg-indigo-50 active:scale-95 flex items-center gap-2 whitespace-nowrap ml-4 shrink-0 cursor-pointer"
              >
                <span>{{ i18n.t('minorBanner.proceed') }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          }
        </div>

        <!-- SPLIT COLUMN LAYOUT: Tasks sidebar (left) and Documents Workspace (right) -->
        <div class="flex gap-4 items-start w-full">
          <!-- Panel 1: Navigation (Tasks) -->
          <nav
            class="w-[340px] shrink-0 bg-white rounded-2xl shadow-xl flex flex-col border border-white/50 h-fit overflow-hidden"
          >
            <div class="p-3 bg-slate-50 border-b border-slate-200 flex-none flex items-center justify-between rounded-t-2xl">
              <h2
                class="font-bold text-slate-700 uppercase text-xs sm:text-sm tracking-wider flex items-center gap-2"
              >
                {{ selectedRole() === 'gestionnaire' ? i18n.t('tasks.sidebarTitleFileManager') : i18n.t('tasks.sidebarTitleRecruiter') }}
              </h2>
              <!-- Tout Conforme Button -->
              @if (selectedRole() !== 'gestionnaire') {
                <button
                  (click)="setAllCompliant()"
                  class="px-2 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 font-bold text-xs border active:scale-95 cursor-pointer"
                  [class.bg-emerald-600]="areAllDocsCompliant()"
                  [class.text-white]="areAllDocsCompliant()"
                  [class.border-emerald-700]="areAllDocsCompliant()"
                  [class.hover:bg-emerald-700]="areAllDocsCompliant()"
                  [class.bg-emerald-50]="!areAllDocsCompliant()"
                  [class.text-emerald-700]="!areAllDocsCompliant()"
                  [class.border-emerald-100]="!areAllDocsCompliant()"
                  [class.hover:bg-emerald-100]="!areAllDocsCompliant()"
                  [class.hover:border-emerald-200]="!areAllDocsCompliant()"
                  [title]="areAllDocsCompliant() ? i18n.t('tasks.allCompliantDisableTitle') : i18n.t('tasks.allCompliantEnableTitle')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{{ i18n.t('tasks.allCompliant') }}</span>
                </button>
              }
            </div>
            <div class="p-3 space-y-4">
              @for (group of groupedVisibleTasks().groups; track group.id) {
                <div class="space-y-1 bg-slate-100/70 p-2 rounded-xl border-2 border-slate-200/90 shadow-xs">
                  <!-- Collapsible Header -->
                  <div
                    (click)="toggleGroupCollapse(group.id)"
                    class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold tracking-wider text-slate-800 bg-slate-200/80 hover:bg-slate-300/80 transition-colors select-none border border-slate-300/70 cursor-pointer"
                  >
                    <span class="flex items-center gap-1.5 min-w-0">
                      @if (selectedRole() === 'gestionnaire') {
                        <span class="bg-indigo-900 text-white px-2 py-0.5 rounded text-[11px] font-extrabold tracking-wide shrink-0">{{ group.title }}</span>
                      } @else {
                        <span class="bg-slate-800 text-white px-2 py-0.5 rounded text-[11px] font-extrabold tracking-wide shrink-0">{{ i18n.t('tasks.groupPrefix') }}{{ group.title }}</span>
                      }
                      <span class="text-[11px] font-semibold text-slate-500 shrink-0">({{ group.tasks.length }})</span>
                      @if (isGroupCompliant(group)) {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-green-600 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      } @else if (hasGroupRejections(group)) {
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-red-600 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      }
                    </span>

                    <div class="flex items-center gap-2 shrink-0">
                      @if (selectedRole() !== 'gestionnaire') {
                        <button
                          type="button"
                          (click)="setGroupCompliant(group, $event)"
                          class="px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
                          [class.bg-emerald-600]="isGroupCompliant(group)"
                          [class.text-white]="isGroupCompliant(group)"
                          [class.border-emerald-700]="isGroupCompliant(group)"
                          [class.hover:bg-emerald-700]="isGroupCompliant(group)"
                          [class.bg-white]="!isGroupCompliant(group)"
                          [class.text-emerald-700]="!isGroupCompliant(group)"
                          [class.border-emerald-300]="!isGroupCompliant(group)"
                          [class.hover:bg-emerald-50]="!isGroupCompliant(group)"
                          [title]="isGroupCompliant(group) ? i18n.t('tasks.groupCompliantDisableTitle') : i18n.t('tasks.groupCompliantEnableTitle')"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3 shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>{{ i18n.t('tasks.groupCompliant') }}</span>
                        </button>
                      }

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 transition-transform duration-200 text-slate-600"
                        [class.rotate-180]="isGroupCollapsed(group.id)"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2.5"`;
