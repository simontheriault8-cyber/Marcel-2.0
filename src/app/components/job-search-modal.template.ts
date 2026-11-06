export const JOB_SEARCH_MODAL_TEMPLATE = `
    <div
      #modalContainer
      class="fixed bg-white rounded-lg shadow-2xl border border-slate-300 flex flex-col overflow-hidden transition-all duration-75"
      [class.inset-0]="isFullScreen()"
      [class.z-50]="true"
      [style.left.px]="isFullScreen() ? 0 : position().x"
      [style.top.px]="isFullScreen() ? 0 : position().y"
      [style.width]="isFullScreen() ? '100%' : size().width + 'px'"
      [style.height]="isFullScreen() ? '100%' : size().height + 'px'"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="i18n.t('careerPortal.dialogAria')"
    >
      <!-- Header (Draggable) -->
      <div
        class="bg-slate-800 text-white p-3 flex justify-between items-center cursor-move select-none shrink-0"
        (mousedown)="startDrag($event)"
      >
        <div class="font-bold flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="bg-indigo-600 text-white text-[11px] font-black px-1.5 py-0.5 rounded tracking-wider leading-none">RÉO</span>
            <span class="hidden sm:inline">{{ i18n.t('careerPortal.title') }}</span>
          </div>

          <!-- Tabs -->
          <div
            class="hidden sm:flex bg-slate-900 rounded-lg p-1 gap-1"
            (mousedown)="$event.stopPropagation()"
          >
            @if (_showReorientationTab()) {
              <button
                (click)="setTab('reorientation')"
                class="px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
                [class.bg-slate-700]="activeTab() === 'reorientation'"
                [class.text-white]="activeTab() === 'reorientation'"
                [class.text-slate-400]="activeTab() !== 'reorientation'"
                [class.hover:text-white]="activeTab() !== 'reorientation'"
              >
                {{ i18n.t('careerPortal.tabReorientation') }}
              </button>
              <button
                (click)="setTab('pfor')"
                class="px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
                [class.bg-slate-700]="activeTab() === 'pfor'"
                [class.text-white]="activeTab() === 'pfor'"
                [class.text-slate-400]="activeTab() !== 'pfor'"
                [class.hover:text-white]="activeTab() !== 'pfor'"
              >
                {{ i18n.t('careerPortal.tabPfor') }}
              </button>
            }
          </div>
        </div>

        <div
          class="flex items-center gap-2"
          (mousedown)="$event.stopPropagation()"
        >
          <!-- Full Screen Toggle -->
          <button
            (click)="toggleFullScreen()"
            class="p-1 hover:bg-slate-700 rounded transition-colors"
            [attr.aria-label]="i18n.t('careerPortal.fullScreenToggle')"
          >
            <svg
              *ngIf="!isFullScreen()"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            <svg
              *ngIf="isFullScreen()"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M10 10V4m0 6H4m6 0L3 3m10 7V4m0 6h6m-6 0l7-7"
              />
            </svg>
          </button>

          <!-- Close Button -->
          <button
            (click)="close()"
            class="p-1 hover:bg-slate-700 rounded transition-colors text-slate-300 hover:text-white"
            [attr.aria-label]="i18n.t('careerPortal.close')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Tabs -->
      <div class="sm:hidden bg-slate-800 p-2 flex gap-1.5 shrink-0 flex-wrap">
        @if (_showReorientationTab()) {
          <button
            (click)="setTab('reorientation')"
            class="flex-1 min-w-[70px] px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
            [class.bg-slate-700]="activeTab() === 'reorientation'"
            [class.text-white]="activeTab() === 'reorientation'"
            [class.text-slate-400]="activeTab() !== 'reorientation'"
          >
            {{ i18n.t('careerPortal.tabReorientation') }}
          </button>
          <button
            (click)="setTab('pfor')"
            class="flex-1 min-w-[70px] px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
            [class.bg-slate-700]="activeTab() === 'pfor'"
            [class.text-white]="activeTab() === 'pfor'"
            [class.text-slate-400]="activeTab() !== 'pfor'"
          >
            {{ i18n.t('careerPortal.tabPfor') }}
          </button>
        }
      </div>

      <!-- Content -->
      <div
        class="flex-1 flex flex-col overflow-hidden relative bg-white min-h-0"
      >
        <!-- REORIENTATION TAB -->
        @if (_showReorientationTab()) {
          <app-reorientation
            [class.hidden]="activeTab() !== 'reorientation'"
            class="flex-1 flex flex-col min-h-0"
          ></app-reorientation>

          <!-- PFOR TAB -->
          <app-pfor
            [class.hidden]="activeTab() !== 'pfor'"
            class="flex-1 flex flex-col min-h-0"
          ></app-pfor>
        }

        <!-- Resize Handle (Bottom Right) -->
        <div
          class="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 flex items-end justify-end p-0.5"
          (mousedown)="startResize($event)"
          *ngIf="!isFullScreen()"
        >
          <div class="w-2 h-2 border-r-2 border-b-2 border-slate-400"></div>
        </div>
      </div>
    </div>
`;
