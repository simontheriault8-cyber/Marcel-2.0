import { Component, inject, signal, OnInit, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  SharedStateService,
  DEFAULT_SIG_FR,
  DEFAULT_SIG_EN,
  DEFAULT_SIG_OTA_FR,
  DEFAULT_SIG_OTA_EN,
} from "../../services/shared-state.service";

@Component({
  selector: "app-signature-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-screen w-full bg-slate-100 flex flex-col p-6 overflow-hidden select-none">
      <!-- Header -->
      <div class="max-w-5xl w-full mx-auto flex items-center justify-between mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 shrink-0">
        <div class="flex items-center gap-4">
          <button (click)="close.emit()" class="p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-600 border border-transparent hover:border-slate-200 cursor-pointer" title="Retour">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 class="text-xl font-bold text-slate-800 flex items-center gap-2">
              Gestion des signatures
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">Personnalisez vos signatures de courriel (Signature normale et Signature OTA).</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button (click)="resetSignatures()" class="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-xl transition-all text-sm font-semibold flex items-center gap-2 active:scale-95 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H17M4 9a8.001 8.001 0 0113.313-2.24L20 9" />
            </svg>
            Réinitialiser le bloc actif
          </button>
          <button (click)="saveSignatures()" class="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-sm font-semibold flex items-center gap-2 shadow-md active:scale-95 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Sauvegarder tout
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
            Bloc Signature Normale
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
            Bloc Signature OTA
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
            <span><strong>Utilisation :</strong> Partout (Volet Recruteur &amp; Dossiers locaux GD) sauf dans le volet GD pour les dossiers OTA.</span>
          } @else {
            <span><strong>Utilisation :</strong> Exclusivement dans le <strong>volet Gestionnaire de dossier (GD)</strong> pour les <strong>dossiers OTA</strong>.</span>
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
                Signature française (Normale)
              </h2>
              <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Standard</span>
            </div>
            <p class="text-xs text-slate-500 mb-4 shrink-0">Cette signature sera intégrée au bas de vos correspondances régulières rédigées en français.</p>
            <textarea [(ngModel)]="sigFrTemp" class="w-full flex-1 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-slate-50/30" placeholder="Ajoutez votre signature française normale..."></textarea>
          </div>

          <!-- English signature card (Normal) -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
            <div class="flex items-center justify-between mb-3 shrink-0">
              <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                <span class="bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">EN</span>
                Signature anglaise (Normale)
              </h2>
              <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Standard</span>
            </div>
            <p class="text-xs text-slate-500 mb-4 shrink-0">Cette signature sera intégrée au bas de vos correspondances régulières rédigées en anglais.</p>
            <textarea [(ngModel)]="sigEnTemp" class="w-full flex-1 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-slate-50/30" placeholder="Ajoutez votre signature anglaise normale..."></textarea>
          </div>
        } @else {
          <!-- French signature card (OTA) -->
          <div class="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
            <div class="flex items-center justify-between mb-3 shrink-0">
              <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                <span class="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">FR</span>
                Signature française (OTA)
              </h2>
              <span class="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">Dossiers OTA</span>
            </div>
            <p class="text-xs text-slate-500 mb-4 shrink-0">Cette signature sera intégrée au bas de vos correspondances pour les dossiers OTA dans le volet GD en français.</p>
            <textarea [(ngModel)]="sigOtaFrTemp" class="w-full flex-1 p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-purple-50/20" placeholder="Ajoutez votre signature française OTA..."></textarea>
          </div>

          <!-- English signature card (OTA) -->
          <div class="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm flex flex-col min-h-0">
            <div class="flex items-center justify-between mb-3 shrink-0">
              <h2 class="text-md font-bold text-slate-800 flex items-center gap-2">
                <span class="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider font-sans">EN</span>
                Signature anglaise (OTA)
              </h2>
              <span class="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">Dossiers OTA</span>
            </div>
            <p class="text-xs text-slate-500 mb-4 shrink-0">Cette signature sera intégrée au bas de vos correspondances pour les dossiers OTA dans le volet GD en anglais.</p>
            <textarea [(ngModel)]="sigOtaEnTemp" class="w-full flex-1 p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm font-mono overflow-y-auto resize-none leading-relaxed bg-purple-50/20" placeholder="Ajoutez votre signature anglaise OTA..."></textarea>
          </div>
        }
      </div>

      <!-- Toast message for Save feedback -->
      @if (showToast()) {
        <div class="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2.5 transition-all z-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm font-semibold">Signatures sauvegardées avec succès !</span>
        </div>
      }
    </div>
  `
})
export class SignatureModalComponent implements OnInit {
  private sharedState = inject(SharedStateService);

  close = output<void>();

  showToast = signal<boolean>(false);
  signatureSection = signal<'normal' | 'ota'>('normal');

  sigFrTemp = "";
  sigEnTemp = "";
  sigOtaFrTemp = "";
  sigOtaEnTemp = "";

  ngOnInit() {
    this.sigFrTemp = this.sharedState.customSignatureFr();
    this.sigEnTemp = this.sharedState.customSignatureEn();
    this.sigOtaFrTemp = this.sharedState.customSignatureOtaFr();
    this.sigOtaEnTemp = this.sharedState.customSignatureOtaEn();
  }

  saveSignatures() {
    this.sharedState.saveSignatures(
      this.sigFrTemp,
      this.sigEnTemp,
      this.sigOtaFrTemp,
      this.sigOtaEnTemp
    );
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }

  resetSignatures() {
    if (this.signatureSection() === 'normal') {
      this.sigFrTemp = DEFAULT_SIG_FR;
      this.sigEnTemp = DEFAULT_SIG_EN;
    } else {
      this.sigOtaFrTemp = DEFAULT_SIG_OTA_FR;
      this.sigOtaEnTemp = DEFAULT_SIG_OTA_EN;
    }
  }
}
