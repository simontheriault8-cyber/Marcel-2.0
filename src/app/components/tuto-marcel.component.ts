import { Component, computed, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

export interface TutoSection {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  category: "Demarrage" | "Volets" | "Outils" | "Aide";
}

@Component({
  selector: "app-tuto-marcel",
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-screen w-full bg-slate-100 flex flex-col overflow-hidden text-slate-800">
      <!-- HEADER TOP BAR -->
      <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs shrink-0 z-20">
        <div class="flex items-center gap-4">
          <button
            (click)="onClose()"
            class="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 flex items-center gap-2 text-sm font-bold active:scale-95 cursor-pointer"
            title="Revenir à la sélection de rôle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Retour</span>
          </button>

          <div class="h-6 w-px bg-slate-200"></div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-sm text-lg">
              M
            </div>
            <div>
              <h1 class="text-lg font-black text-slate-900 flex items-center gap-2 leading-none">
                Guide & Tutoriels MARCEL 2.0
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">Centre d'aide</span>
              </h1>
              <p class="text-xs text-slate-500 mt-1">Module d'Analyse et de Réorientation des Candidats à l'Enrôlement pour les Lâches</p>
            </div>
          </div>
        </div>

        <!-- SEARCH + OUTLOOK VIDEO SHORTCUT -->
        <div class="flex items-center gap-3">
          <button
            (click)="selectSection('outlook-config')"
            class="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span>Tuto Vidéo Outlook</span>
          </button>

          <div class="relative w-56 lg:w-72">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              placeholder="Rechercher un tutoriel, mot-clé..."
              class="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 absolute left-2.5 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </header>

      <!-- MAIN SPLIT VIEW (SIDEBAR NAV + CONTENT) -->
      <div class="flex-1 flex overflow-hidden">
        <!-- NAVIGATION SIDEBAR -->
        <aside class="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto p-4 space-y-6">
          @for (group of groupedSections(); track group.category) {
            <div>
              <h2 class="text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 mb-2">
                {{ group.category }}
              </h2>
              <div class="space-y-1">
                @for (sec of group.sections; track sec.id) {
                  <button
                    (click)="selectSection(sec.id)"
                    [class.bg-indigo-50]="selectedSection() === sec.id"
                    [class.text-indigo-700]="selectedSection() === sec.id"
                    [class.border-indigo-300]="selectedSection() === sec.id"
                    [class.font-bold]="selectedSection() === sec.id"
                    [class.text-slate-700]="selectedSection() !== sec.id"
                    [class.hover:bg-slate-50]="selectedSection() !== sec.id"
                    class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-transparent transition-all text-xs text-left cursor-pointer group"
                  >
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span class="text-base shrink-0">{{ sec.icon }}</span>
                      <span class="truncate">{{ sec.shortTitle }}</span>
                    </div>
                    @if (sec.badge) {
                      <span
                        [class]="sec.badgeColor || 'bg-slate-100 text-slate-600'"
                        class="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md shrink-0 tracking-wide"
                      >
                        {{ sec.badge }}
                      </span>
                    }
                  </button>
                }
              </div>
            </div>
          }

          <!-- BOTTOM QUICK TIP CARD -->
          <div class="mt-auto p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl">
            <div class="flex items-start gap-2.5">
              <span class="text-lg">💡</span>
              <div>
                <h4 class="text-xs font-bold text-indigo-900">Astuce de productivité</h4>
                <p class="text-[11px] text-indigo-700 mt-1 leading-relaxed">
                  Utilisez les boutons de copie rapide en un clic (Note de registre & Courriel) pour accélérer le traitement de vos dossiers.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <!-- MAIN ARTICLE / TUTORIAL CONTENT AREA -->
        <main class="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50">
          <div class="max-w-4xl mx-auto space-y-8">
            
            <!-- SECTION 1: VUE D'ENSEMBLE -->
            @if (selectedSection() === 'intro') {
              <div class="space-y-6">
                <!-- Hero banner -->
                <div class="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                  <div class="relative z-10 space-y-3">
                    <span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-indigo-200 uppercase tracking-wider inline-block">
                      Documentation officielle
                    </span>
                    <h2 class="text-3xl font-black tracking-tight">Bienvenue dans le guide de MARCEL 2.0</h2>
                    <p class="text-slate-200 text-sm max-w-2xl leading-relaxed">
                      MARCEL (Module d'Analyse et de Réorientation des Candidats à l'Enrôlement pour les Lâches) est l'outil centralisé conçu pour optimiser, standardiser et accélérer le traitement des dossiers de recrutement des Forces armées canadiennes.
                    </p>
                  </div>
                  <div class="absolute right-6 -bottom-6 text-indigo-500/20 text-9xl font-black pointer-events-none select-none">
                    2.0
                  </div>
                </div>

                <!-- 3 Key Pillars Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                    <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                      🎯
                    </div>
                    <h3 class="font-bold text-sm text-slate-800">Conformité Totale</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      Génère des notes de registre et courriels parfaitement conformes aux politiques de recrutement, aux directives PFOR et aux exigences des documents.
                    </p>
                  </div>

                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                    <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                      ⚡
                    </div>
                    <h3 class="font-bold text-sm text-slate-800">Gain de Temps Massif</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      Évalue en direct l'admissibilité académique et médicale, fusionne les motifs de rejet et génère en 1 clic vos communications complètes.
                    </p>
                  </div>

                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                    <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                      🌐
                    </div>
                    <h3 class="font-bold text-sm text-slate-800">Bilinguisme Intégré</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      Bascule instantanément entre le français et l'anglais pour tous les courriels, options de réorientation et modèles de communication.
                    </p>
                  </div>
                </div>

                <!-- Navigation Summary Table -->
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h3 class="font-extrabold text-slate-800 text-base flex items-center gap-2">
                    <span>🧭</span> Sommaire des Modules & Fonctionnalités
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button (click)="selectSection('outlook-config')" class="p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/50 text-left transition-all group cursor-pointer">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-xs text-red-700 flex items-center gap-1.5">
                          <span>🎬</span> Configuration Outlook
                        </span>
                        <span class="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">Indispensable</span>
                      </div>
                      <p class="text-[11px] text-slate-500 mt-1">Comment régler Outlook pour conserver la mise en forme des courriels.</p>
                    </button>

                    <button (click)="selectSection('volet-gd')" class="p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 text-left transition-all group cursor-pointer">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-xs text-amber-800 flex items-center gap-1.5">
                          <span>📁</span> Volet Gestionnaire de Dossier
                        </span>
                        <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Local & OTA</span>
                      </div>
                      <p class="text-[11px] text-slate-500 mt-1">Traitement des tâches GD, enrôlement, unités d'affectation et notes.</p>
                    </button>

                    <button (click)="selectSection('volet-recruteur')" class="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left transition-all group cursor-pointer">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-xs text-indigo-800 flex items-center gap-1.5">
                          <span>🎯</span> Volet Recruteur (Régulier)
                        </span>
                        <span class="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.5 rounded">Portail</span>
                      </div>
                      <p class="text-[11px] text-slate-500 mt-1">Mineur/Majeur, rejet de documents, fusion des motifs et triage médical.</p>
                    </button>

                    <button (click)="selectSection('volet-pfor')" class="p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-left transition-all group cursor-pointer">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-xs text-purple-800 flex items-center gap-1.5">
                          <span>🎓</span> Volet Recruteur (PFOR / CMR)
                        </span>
                        <span class="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">ROTP</span>
                      </div>
                      <p class="text-[11px] text-slate-500 mt-1">Admission CMR/Civil, motifs d'inadmissibilité et réorientation MR.</p>
                    </button>

                    <button (click)="selectSection('reo-metiers')" class="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-left transition-all group cursor-pointer">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-xs text-emerald-800 flex items-center gap-1.5">
                          <span>🧭</span> Panneau RÉO & Météo des Métiers
                        </span>
                        <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Critères</span>
                      </div>
                      <p class="text-[11px] text-slate-500 mt-1">Moteur d'évaluation scolarité provinciale, V/CV/H, tests ECE/ESOM.</p>
                    </button>

                    <button (click)="selectSection('signatures')" class="p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition-all group cursor-pointer">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                          <span>✍️</span> Gestion des Signatures
                        </span>
                        <span class="text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded">Config</span>
                      </div>
                      <p class="text-[11px] text-slate-500 mt-1">Personnalisation des blocs Normal et OTA (FR/EN) avec sauvegarde.</p>
                    </button>
                  </div>
                </div>
              </div>
            }

            <!-- SECTION 2: CONFIGURATION OUTLOOK & COLLAGE SOURCE (AVEC VIDÉO) -->
            @if (selectedSection() === 'outlook-config') {
              <div class="space-y-6">
                <div class="bg-red-900 text-white p-6 rounded-3xl shadow-lg space-y-2">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-300">
                    <span>🎬</span> Étape Préliminaire Essentielle
                  </div>
                  <h2 class="text-2xl font-black">Configuration d'Outlook : Conserver le format source</h2>
                  <p class="text-xs text-red-100 leading-relaxed max-w-2xl">
                    Pour que les courriels générés par MARCEL conservent fidèlement leur mise en page riche (tableaux, listes à puces, liens hypertextes, textes en gras et couleurs) lors du copier-coller dans Outlook, vous devez ajuster une préférence dans Outlook une seule fois.
                  </p>
                </div>

                <!-- Video Card -->
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h3 class="font-extrabold text-slate-900 text-base flex items-center gap-2">
                        <span class="text-red-600">▶️</span> Vidéo Explicative
                      </h3>
                      <p class="text-xs text-slate-500">Visionnez le tutoriel vidéo officiel pour configurer Outlook en 30 secondes.</p>
                    </div>

                    <a
                      href="https://youtu.be/F-9g3ImNPho"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                      <span>Ouvrir sur YouTube</span>
                    </a>
                  </div>

                  <!-- Embedded Video Player / Video Container -->
                  <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
                    <iframe
                      class="w-full h-full"
                      src="https://www.youtube-nocookie.com/embed/F-9g3ImNPho?rel=0"
                      title="Configuration du collage dans Outlook pour MARCEL"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>

                <!-- Step-by-Step Instructions -->
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h3 class="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <span>📋</span> Procédure détaillée pas-à-pas dans Microsoft Outlook
                  </h3>

                  <div class="space-y-3">
                    <div class="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div class="w-7 h-7 rounded-lg bg-red-100 text-red-700 font-black text-xs flex items-center justify-center shrink-0">1</div>
                      <div class="text-xs space-y-0.5">
                        <span class="font-bold text-slate-800">Ouvrir les Options Outlook :</span>
                        <p class="text-slate-600">Dans Microsoft Outlook, cliquez sur le menu <strong class="text-slate-900">Fichier</strong> (en haut à gauche), puis sélectionnez <strong class="text-slate-900">Options</strong>.</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div class="w-7 h-7 rounded-lg bg-red-100 text-red-700 font-black text-xs flex items-center justify-center shrink-0">2</div>
                      <div class="text-xs space-y-0.5">
                        <span class="font-bold text-slate-800">Accéder aux Options Avancées :</span>
                        <p class="text-slate-600">Dans la colonne de gauche de la fenêtre d'options, cliquez sur <strong class="text-slate-900">Options avancées</strong> (ou <em>Courrier</em> selon votre version).</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div class="w-7 h-7 rounded-lg bg-red-100 text-red-700 font-black text-xs flex items-center justify-center shrink-0">3</div>
                      <div class="text-xs space-y-0.5">
                        <span class="font-bold text-slate-800">Section « Couper, copier et coller » :</span>
                        <p class="text-slate-600">Faites défiler jusqu'à la section <strong class="text-slate-900">Couper, copier et coller</strong>.</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3.5 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div class="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">4</div>
                      <div class="text-xs space-y-0.5">
                        <span class="font-bold text-emerald-950">Régler le collage depuis d'autres programmes :</span>
                        <p class="text-emerald-800">
                          Pour l'option <strong class="text-emerald-950">« Collage depuis d'autres programmes »</strong>, sélectionnez dans le menu déroulant : <strong class="text-emerald-950 underline decoration-2">Conserver la mise en forme source</strong> (Keep Source Formatting).
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div class="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center shrink-0">5</div>
                      <div class="text-xs space-y-0.5">
                        <span class="font-bold text-slate-800">Valider :</span>
                        <p class="text-slate-600">Cliquez sur <strong class="text-slate-900">OK</strong> pour enregistrer. Vous n'aurez plus jamais besoin de refaire cette manipulation !</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Callout warning -->
                <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                  <span class="text-lg">⚠️</span>
                  <div class="text-xs text-amber-900 space-y-1">
                    <span class="font-bold">Pourquoi est-ce indispensable ?</span>
                    <p class="leading-relaxed">
                      Sans cette configuration, Outlook force souvent le collage en texte brut ou en fusion de mise en forme, ce qui brise la couleur des liens, l'indentation des listes de documents et l'alignement des tableaux récapitulatifs d'enrôlement.
                    </p>
                  </div>
                </div>
              </div>
            }

            <!-- SECTION 3: VOLET GESTIONNAIRE DE DOSSIER (GD) -->
            @if (selectedSection() === 'volet-gd') {
              <div class="space-y-6">
                <div class="bg-amber-900 text-white p-6 rounded-3xl shadow-lg space-y-2">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                    <span>📁</span> Rôle & Tâches
                  </div>
                  <h2 class="text-2xl font-black">Volet Gestionnaire de Dossier (GD)</h2>
                  <p class="text-xs text-amber-100 leading-relaxed max-w-2xl">
                    Le gestionnaire de dossier supervise la finalisation, les vérifications administratives, l'évaluation médicale, la convocation aux tests et la préparation de l'enrôlement.
                  </p>
                </div>

                <!-- Sub-features cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div class="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      Dossier Local vs Dossier OTA
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      MARCEL permet de basculer instantanément entre :
                    </p>
                    <ul class="text-xs text-slate-600 space-y-2">
                      <li class="flex items-start gap-2">
                        <span class="font-bold text-amber-600">•</span>
                        <span><strong class="text-slate-800">Dossier Local :</strong> Avec configuration du centre de recrutement (ex. CFRC Montréal, Québec, etc.) et choix de l'heure d'enrôlement.</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="font-bold text-purple-600">•</span>
                        <span><strong class="text-slate-800">Dossier OTA :</strong> Offre de Traitement Accéléré utilisant le bloc de signature et les processus spécifiques OTA.</span>
                      </li>
                    </ul>
                  </div>

                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div class="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                      Tâches GD & Convocations
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      Sélectionnez les tâches à effectuer (Offre d'emploi, convocation TAFC/TEST, relance de dossier, mise à jour des coordonnées). MARCEL prépare automatiquement :
                    </p>
                    <ul class="text-xs text-slate-600 space-y-1">
                      <li>• La note de suivi de registre formatée</li>
                      <li>• Le courriel officiel prêt à être envoyé</li>
                    </ul>
                  </div>
                </div>

                <!-- Enrolment Panel details -->
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 class="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <span>🪖</span> Panneau d'Enrôlement & Unités d'Affectation
                  </h3>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Dans le volet GD, le bouton <strong class="text-indigo-700">Enrôlement</strong> ouvre le gestionnaire complet d'affectation :
                  </p>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span class="font-bold text-slate-900 block mb-1">Unités préconfigurées :</span>
                      <p class="text-slate-600 text-[11px]">
                        St-Jean-sur-Richelieu (ELRFC), Valcartier (2e Div), Borden, Bagotville, Gagetown. L'adresse complète et les consignes sont insérées sans erreur.
                      </p>
                    </div>

                    <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span class="font-bold text-slate-900 block mb-1">Choix du cours et dates :</span>
                      <p class="text-slate-600 text-[11px]">
                        Sélectionnez la date d'enrôlement, la date de départ, et la série de cours avec calcul automatique des délais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- SECTION 4: VOLET RECRUTEUR REGULIER -->
            @if (selectedSection() === 'volet-recruteur') {
              <div class="space-y-6">
                <div class="bg-indigo-900 text-white p-6 rounded-3xl shadow-lg space-y-2">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
                    <span>🎯</span> Rôle & Tâches
                  </div>
                  <h2 class="text-2xl font-black">Volet Recruteur — Dossier Régulier</h2>
                  <p class="text-xs text-indigo-100 leading-relaxed max-w-2xl">
                    Le recruteur procède à la vérification initiale de l'identité, de l'âge, des antécédents, des relevés de notes et de l'admissibilité générale des postulants sur le portail de recrutement.
                  </p>
                </div>

                <!-- Workflow Steps -->
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                  <h3 class="font-extrabold text-slate-900 text-base">Flux de travail du Recruteur</h3>

                  <div class="space-y-4">
                    <!-- Step 1 -->
                    <div class="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div class="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">1</div>
                      <div class="text-xs space-y-1.5 flex-1">
                        <span class="font-bold text-slate-900 text-sm">Vérification Initiale (Mineur vs Majeur)</span>
                        <p class="text-slate-600 leading-relaxed">
                          À l'ouverture du volet Recruteur, vous indiquez si le postulant est mineur. Si <strong class="text-slate-800">Oui</strong>, MARCEL active immédiatement les contrôles spécifiques (formulaires de consentement parental DND, pièces requises pour mineurs).
                        </p>
                      </div>
                    </div>

                    <!-- Step 2 -->
                    <div class="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div class="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">2</div>
                      <div class="text-xs space-y-1.5 flex-1">
                        <span class="font-bold text-slate-900 text-sm">Traitement des Tâches du Portail & Rejets de documents</span>
                        <p class="text-slate-600 leading-relaxed">
                          Parcourez les catégories de documents (Identité, Citoyenneté, Scolarité, Formulaires). Si un document est non conforme, cochez le motif précis (ex. document expiré, recto manquant, relevé non officiel, signature manquante).
                        </p>
                        <div class="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 text-[11px] font-medium">
                          ✨ <strong>Fusion Intelligente :</strong> MARCEL fusionne tous les motifs de rejet en un seul courriel clair, structuré et personnalisé avec les liens et consignes officielles.
                        </div>
                      </div>
                    </div>

                    <!-- Step 3 -->
                    <div class="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div class="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">3</div>
                      <div class="text-xs space-y-1.5 flex-1">
                        <span class="font-bold text-slate-900 text-sm">Banque de Courriels & Scénarios Fréquents</span>
                        <p class="text-slate-600 leading-relaxed">
                          Accédez à la banque de modèles de courriels (Demande de documents complémentaires, relances, instructions spécifiques, transmission au centre médical).
                        </p>
                      </div>
                    </div>

                    <!-- Step 4 -->
                    <div class="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div class="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">4</div>
                      <div class="text-xs space-y-1.5 flex-1">
                        <span class="font-bold text-slate-900 text-sm">Triage Médical Préliminaire (MEL & Profil V/CV/H)</span>
                        <p class="text-slate-600 leading-relaxed">
                          Si le candidat présente des limitations ou des particularités médicales, activez le panneau médical pour filtrer immédiatement les métiers compatibles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- SECTION 5: VOLET RECRUTEUR PFOR / CMR -->
            @if (selectedSection() === 'volet-pfor') {
              <div class="space-y-6">
                <div class="bg-purple-900 text-white p-6 rounded-3xl shadow-lg space-y-2">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                    <span>🎓</span> Programme Spécialisé
                  </div>
                  <h2 class="text-2xl font-black">Volet Recruteur — Dossier PFOR (ROTP)</h2>
                  <p class="text-xs text-purple-100 leading-relaxed max-w-2xl">
                    Le Programme de formation des officiers de la force régulière (PFOR / ROTP) finance les études universitaires des futurs officiers au Collège militaire royal du Canada (CMR) ou en université civile.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                      CMR : Domaines d'Études
                    </h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      Sélectionnez les domaines d'études admis par le CMR :
                    </p>
                    <div class="flex flex-wrap gap-2 text-xs font-semibold">
                      <span class="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg">Arts</span>
                      <span class="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg">Sciences</span>
                      <span class="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg">Génie</span>
                    </div>
                    <p class="text-[11px] text-slate-500">
                      MARCEL croise automatiquement les domaines admis avec les métiers d'officier du PFOR pour déterminer l'admissibilité du candidat.
                    </p>
                  </div>

                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                      Volet Universités Civiles
                    </h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      Si le candidat choisit une université civile, MARCEL affiche les programmes admissibles par métier avec les liens vers la liste officielle des programmes universitaires.
                    </p>
                  </div>
                </div>

                <!-- Gestion des Inadmissibilités PFOR -->
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 class="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <span class="text-red-500">🛑</span> Gestion des Inadmissibilités & Réorientation MR
                  </h3>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Dans le panneau <strong>Inadmissible au PFOR</strong>, deux cas majeurs sont gérés :
                  </p>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div class="p-4 bg-red-50/70 rounded-2xl border border-red-200 space-y-2">
                      <span class="font-bold text-red-900 block">1. Admissibilité refusée par le CMR</span>
                      <p class="text-red-800 text-[11px] leading-relaxed">
                        Lorsque le CMR refuse le dossier académique, MARCEL génère le courriel d'explication officiel avec proposition de réorientation vers les métiers de Militaire du Rang (MR) ou PFOR civil.
                      </p>
                    </div>

                    <div class="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
                      <span class="font-bold text-amber-900 block">2. Critère minimal non rencontré</span>
                      <p class="text-amber-800 text-[11px] leading-relaxed">
                        Explique clairement les prérequis minimaux manquants (Diplôme d'études secondaires DES, cours d'Histoire de 4e secondaire, cours de langue d'enseignement de 5e secondaire, mathématiques de 4e secondaire avec au moins 70%).
                      </p>
                    </div>
                  </div>

                  <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                    <span class="font-bold text-slate-900 flex items-center gap-2">
                      <span>💡</span> Réorientation Automatique vers Militaire du Rang (MR)
                    </span>
                    <p class="text-slate-600 text-[11px] leading-relaxed">
                      Lorsque l'une de ces deux cases est cochée, le panneau des choix PFOR est masqué et le module <strong>Scolarité et Expérience</strong> s'ouvre pour permettre au recruteur d'évaluer et de proposer directement les métiers NCM admissibles au candidat.
                    </p>
                  </div>
                </div>
              </div>
            }

            <!-- SECTION 6: PANNEAU RÉO & MÉTIERS -->
            @if (selectedSection() === 'reo-metiers') {
              <div class="space-y-6">
                <div class="bg-emerald-900 text-white p-6 rounded-3xl shadow-lg space-y-2">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <span>🧭</span> Moteur d'Analyse
                  </div>
                  <h2 class="text-2xl font-black">Panneau de Réorientation (RÉO) & Météo des Métiers</h2>
                  <p class="text-xs text-emerald-100 leading-relaxed max-w-2xl">
                    Le panneau RÉO intègre la base de données complète des métiers des Forces armées canadiennes avec tous les critères d'admission académiques, physiques et opérationnels.
                  </p>
                </div>

                <!-- Features Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      Scolarité par Province & Matières
                    </h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      Sélectionnez la scolarité du candidat pour calculer automatiquement son admissibilité :
                    </p>
                    <ul class="text-xs text-slate-600 space-y-1">
                      <li>• <strong>Québec :</strong> DES, DEP, DEC technique / préuniversitaire, AEC, Math CST/TS/SN, Histoire sec 4, Physique, Chimie, etc.</li>
                      <li>• <strong>Autres provinces :</strong> Ontario (OSSD), Colombie-Britannique, Alberta, Nouveau-Brunswick.</li>
                      <li>• <strong>Universitaire :</strong> Baccalauréat, Maîtrise, Diplômes spécialisés.</li>
                    </ul>
                  </div>

                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      Profil Médical & Tests Obligatoires
                    </h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      Filtrage intelligent selon les capacités physiques et examens :
                    </p>
                    <ul class="text-xs text-slate-600 space-y-1">
                      <li>• <strong>Profil V/CV/H :</strong> Acuité Visuelle (V1 à V5), Vision des Couleurs (CV1 à CV3), Audition (H1 à H4).</li>
                      <li>• <strong>Tests spéciaux :</strong> ECE (00203 Technicien réseau), ESOM (00207), CEOPM (00214), CSPN (Pilote, OCA, etc.).</li>
                    </ul>
                  </div>
                </div>

                <!-- SIP Phase & Job Status -->
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 class="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <span>📊</span> Statut SIP & Disponibilité des Métiers
                  </h3>
                  <p class="text-xs text-slate-600 leading-relaxed">
                    Le Plan d'Admission et de Traitement (SIP) détermine si un métier est actuellement <strong>Ouvert</strong>, <strong>Fermé</strong> ou en <strong>Gestion des attentes</strong> (Situation 1, 2, 3).
                  </p>
                  <div class="p-4 bg-purple-50 border border-purple-200 rounded-2xl text-xs text-purple-900">
                    <span class="font-bold block mb-1">Gestion des Attentes :</span>
                    Pour les métiers contingentés ou à contingentement différé, MARCEL avertit immédiatement le recruteur et insère les mentions réglementaires nécessaires dans les communications.
                  </div>
                </div>
              </div>
            }

            <!-- SECTION 7: GESTION DES SIGNATURES -->
            @if (selectedSection() === 'signatures') {
              <div class="space-y-6">
                <div class="bg-slate-900 text-white p-6 rounded-3xl shadow-lg space-y-2">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>✍️</span> Personnalisation
                  </div>
                  <h2 class="text-2xl font-black">Gestion des Signatures & Préférences</h2>
                  <p class="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    Configurez vos blocs de signature personnalisés pour que tous les courriels générés portent automatiquement votre nom, grade, unité et coordonnées officielles.
                  </p>
                </div>

                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                  <h3 class="font-extrabold text-slate-900 text-base">Deux Blocs de Signature Distincts</h3>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-2">
                      <span class="font-bold text-blue-900 text-sm block">1. Bloc Signature Normale</span>
                      <p class="text-blue-800 text-xs leading-relaxed">
                        Utilisé pour tous les dossiers réguliers, les dossiers locaux de gestionnaire et les dossiers PFOR (en français et en anglais).
                      </p>
                    </div>

                    <div class="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-2">
                      <span class="font-bold text-purple-900 text-sm block">2. Bloc Signature OTA</span>
                      <p class="text-purple-800 text-xs leading-relaxed">
                        Utilisé exclusivement lorsque le mode <em>Dossier OTA</em> est sélectionné dans le volet Gestionnaire de dossier.
                      </p>
                    </div>
                  </div>

                  <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <span class="font-bold text-slate-900 flex items-center gap-2">
                      <span>💾</span> Sauvegarde Locale Automatique
                    </span>
                    <p class="text-slate-600 leading-relaxed">
                      Vos modifications sont sauvegardées en toute sécurité dans votre navigateur (mémoire locale). Elles restent actives à chaque ouverture de MARCEL, sans nécessiter de reconnexion.
                    </p>
                  </div>
                </div>
              </div>
            }

            <!-- SECTION 8: TRUCS & ASTUCES & FAQ -->
            @if (selectedSection() === 'astuces-faq') {
              <div class="space-y-6">
                <div class="bg-slate-800 text-white p-6 rounded-3xl shadow-lg space-y-2">
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>💡</span> Conseils Pratiques
                  </div>
                  <h2 class="text-2xl font-black">Trucs, Astuces & Questions Fréquentes</h2>
                  <p class="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    Maximisez votre efficacité quotidienne lors de l'évaluation et du suivi de vos dossiers de candidature.
                  </p>
                </div>

                <!-- FAQ Accordion / List -->
                <div class="space-y-3">
                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <h4 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span class="text-indigo-600 font-black">Q.</span> Comment copier la note de registre dans mon système ?
                    </h4>
                    <p class="text-xs text-slate-600 leading-relaxed pl-6">
                      Cliquez simplement sur le bouton <strong class="text-indigo-700">« Copier la note »</strong> situé en bas du panneau de prévisualisation. Le texte est immédiatement copié dans votre presse-papiers avec les retours à la ligne conformes.
                    </p>
                  </div>

                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <h4 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span class="text-indigo-600 font-black">Q.</span> Pourquoi mon courriel collé dans Outlook a-t-il perdu ses couleurs ?
                    </h4>
                    <p class="text-xs text-slate-600 leading-relaxed pl-6">
                      Consultez notre tutoriel <button (click)="selectSection('outlook-config')" class="text-indigo-600 font-bold underline cursor-pointer">Configuration Outlook</button>. Vous devez activer « Conserver la mise en forme source » dans les options de collage d'Outlook.
                    </p>
                  </div>

                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <h4 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span class="text-indigo-600 font-black">Q.</span> Comment réinitialiser un dossier sans recharger la page ?
                    </h4>
                    <p class="text-xs text-slate-600 leading-relaxed pl-6">
                      Cliquez sur le bouton <strong class="text-slate-800">« Réinitialiser »</strong> situé en haut à droite du panneau principal ou utilisez <strong class="text-indigo-700">« Changer de rôle »</strong> pour recommencer un nouveau flux propre.
                    </p>
                  </div>

                  <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <h4 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span class="text-indigo-600 font-black">Q.</span> Le postulant est bilingue ou anglophone, comment envoyer le courriel en anglais ?
                    </h4>
                    <p class="text-xs text-slate-600 leading-relaxed pl-6">
                      Basculez simplement l'onglet de langue de <strong class="text-indigo-700">FR</strong> vers <strong class="text-indigo-700">EN</strong> en haut de la boîte de courriel. MARCEL traduit dynamiquement l'intégralité du contenu, des motifs et de la signature.
                    </p>
                  </div>
                </div>
              </div>
            }

          </div>
        </main>
      </div>
    </div>
  `,
})
export class TutoMarcelComponent {
  close = output<void>();

  selectedSection = signal<string>("intro");
  searchQuery = signal<string>("");

  sections: TutoSection[] = [
    {
      id: "intro",
      title: "Vue d'ensemble & Introduction",
      shortTitle: "Vue d'ensemble",
      icon: "🌟",
      category: "Demarrage",
    },
    {
      id: "outlook-config",
      title: "Configuration Outlook (Collage source)",
      shortTitle: "Tuto Vidéo Outlook",
      icon: "🎬",
      badge: "Indispensable",
      badgeColor: "bg-red-100 text-red-700 border border-red-200",
      category: "Demarrage",
    },
    {
      id: "volet-gd",
      title: "Volet Gestionnaire de Dossier (GD)",
      shortTitle: "Gestionnaire de Dossier",
      icon: "📁",
      badge: "Local / OTA",
      badgeColor: "bg-amber-100 text-amber-800",
      category: "Volets",
    },
    {
      id: "volet-recruteur",
      title: "Volet Recruteur — Dossier Régulier",
      shortTitle: "Recruteur (Régulier)",
      icon: "🎯",
      badge: "Portail",
      badgeColor: "bg-indigo-100 text-indigo-800",
      category: "Volets",
    },
    {
      id: "volet-pfor",
      title: "Volet Recruteur — Dossier PFOR (ROTP)",
      shortTitle: "Recruteur (PFOR / CMR)",
      icon: "🎓",
      badge: "ROTP",
      badgeColor: "bg-purple-100 text-purple-800",
      category: "Volets",
    },
    {
      id: "reo-metiers",
      title: "Panneau RÉO & Météo des Métiers",
      shortTitle: "Panneau RÉO & Critères",
      icon: "🧭",
      badge: "Moteur",
      badgeColor: "bg-emerald-100 text-emerald-800",
      category: "Outils",
    },
    {
      id: "signatures",
      title: "Gestion des Signatures & Préférences",
      shortTitle: "Signatures & Préférences",
      icon: "✍️",
      category: "Outils",
    },
    {
      id: "astuces-faq",
      title: "Trucs, Astuces & Foire aux Questions",
      shortTitle: "Astuces & FAQ",
      icon: "💡",
      category: "Aide",
    },
  ];

  filteredSections = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.sections;
    return this.sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.shortTitle.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  });

  groupedSections = computed(() => {
    const list = this.filteredSections();
    const categories: ("Demarrage" | "Volets" | "Outils" | "Aide")[] = [
      "Demarrage",
      "Volets",
      "Outils",
      "Aide",
    ];

    return categories
      .map((cat) => ({
        category:
          cat === "Demarrage"
            ? "Démarrage & Configuration"
            : cat === "Volets"
            ? "Les Volets de Recrutement"
            : cat === "Outils"
            ? "Outils & Moteurs"
            : "Conseils & FAQ",
        sections: list.filter((s) => s.category === cat),
      }))
      .filter((g) => g.sections.length > 0);
  });

  selectSection(id: string) {
    this.selectedSection.set(id);
  }

  onClose() {
    this.close.emit();
  }
}
