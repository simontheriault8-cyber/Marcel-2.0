import { Component, output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-gd-intro",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-screen w-full bg-slate-200 flex flex-col items-center justify-center p-4 relative">
      <!-- Switch Role Button (Intro GD) -->
      <button
        (click)="switchRole.emit()"
        class="absolute top-4 right-4 bg-white border border-slate-300 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 h-10 px-4 rounded-xl shadow-sm transition-all z-50 font-sans flex items-center justify-center text-xs font-bold gap-2 cursor-pointer active:scale-95"
        title="Revenir à la page de sélection de rôle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <span>Changer de rôle</span>
      </button>

      <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border border-white/50 relative z-0">
        <div class="mb-8">
          <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-slate-800 mb-2">Type de dossier</h1>
          <p class="text-lg text-slate-600">Le postulant est-il Local ou OTA ?</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            (click)="typeSelected.emit('Local')"
            class="py-4 px-6 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition-colors shadow-lg active:scale-95 cursor-pointer"
          >
            Local
          </button>
          <button
            (click)="typeSelected.emit('OTA')"
            class="py-4 px-6 bg-white text-slate-800 border-2 border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-sm active:scale-95 cursor-pointer"
          >
            OTA
          </button>
        </div>
      </div>
    </div>
  `
})
export class GdIntroComponent {
  typeSelected = output<'Local' | 'OTA'>();
  switchRole = output<void>();
}
