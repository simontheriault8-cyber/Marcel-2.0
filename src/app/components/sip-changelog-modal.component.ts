import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SipChangelogService, SipChangeTab } from '../../services/sip-changelog.service';
import { JobDatabaseService } from '../../services/job-database.service';
import { TranslationService } from '../i18n';
import { SipChangeItem, formatSipDate, parseSipDate } from '../data/sip-changelog.data';

@Component({
  selector: 'app-sip-changelog-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (changelogService.isOpen()) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="i18n.t('reo.sipChangesTitle')"
        (click)="onBackdropClick($event)"
      >
        <div 
          class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
          (click)="$event.stopPropagation()"
        >
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-indigo-50/30">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-lg font-bold text-slate-800">
                    {{ i18n.t('reo.sipChangesTitle') }}
                  </h3>
                  @if (jobService.sipDate()) {
                    <span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                      SIP: {{ jobService.sipDate() }}
                    </span>
                  }
                </div>
                <p class="text-xs text-slate-500 mt-0.5">
                  {{ i18n.t('reo.sipChangesSubtitle') }}
                </p>
              </div>
            </div>

            <!-- Close Button -->
            <button
              type="button"
              (click)="changelogService.closeModal()"
              class="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              [attr.aria-label]="i18n.t('reo.sipChangesClose')"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Controls: Tabs & Search -->
          <div class="px-6 py-3 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <!-- Period Tabs -->
            <div class="inline-flex p-1 bg-slate-200/70 rounded-xl gap-1 shrink-0">
              <button
                type="button"
                (click)="changelogService.setTab('thisWeek')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                [class.bg-white]="changelogService.activeTab() === 'thisWeek'"
                [class.text-indigo-700]="changelogService.activeTab() === 'thisWeek'"
                [class.shadow-xs]="changelogService.activeTab() === 'thisWeek'"
                [class.text-slate-600]="changelogService.activeTab() !== 'thisWeek'"
                [class.hover:text-slate-800]="changelogService.activeTab() !== 'thisWeek'"
              >
                <span>{{ i18n.t('reo.sipChangesFilterThisWeek') }}</span>
                <span 
                  class="px-1.5 py-0.2 rounded-full text-[10px] font-black"
                  [class.bg-indigo-100]="changelogService.activeTab() === 'thisWeek'"
                  [class.text-indigo-800]="changelogService.activeTab() === 'thisWeek'"
                  [class.bg-slate-300]="changelogService.activeTab() !== 'thisWeek'"
                  [class.text-slate-700]="changelogService.activeTab() !== 'thisWeek'"
                >
                  {{ changelogService.thisWeekCount() }}
                </span>
              </button>

              <button
                type="button"
                (click)="changelogService.setTab('lastWeek')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                [class.bg-white]="changelogService.activeTab() === 'lastWeek'"
                [class.text-indigo-700]="changelogService.activeTab() === 'lastWeek'"
                [class.shadow-xs]="changelogService.activeTab() === 'lastWeek'"
                [class.text-slate-600]="changelogService.activeTab() !== 'lastWeek'"
                [class.hover:text-slate-800]="changelogService.activeTab() !== 'lastWeek'"
              >
                <span>{{ i18n.t('reo.sipChangesFilterLastWeek') }}</span>
                <span 
                  class="px-1.5 py-0.2 rounded-full text-[10px] font-black"
                  [class.bg-indigo-100]="changelogService.activeTab() === 'lastWeek'"
                  [class.text-indigo-800]="changelogService.activeTab() === 'lastWeek'"
                  [class.bg-slate-300]="changelogService.activeTab() !== 'lastWeek'"
                  [class.text-slate-700]="changelogService.activeTab() !== 'lastWeek'"
                >
                  {{ changelogService.lastWeekChanges().length }}
                </span>
              </button>

              <button
                type="button"
                (click)="changelogService.setTab('all')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                [class.bg-white]="changelogService.activeTab() === 'all'"
                [class.text-indigo-700]="changelogService.activeTab() === 'all'"
                [class.shadow-xs]="changelogService.activeTab() === 'all'"
                [class.text-slate-600]="changelogService.activeTab() !== 'all'"
                [class.hover:text-slate-800]="changelogService.activeTab() !== 'all'"
              >
                <span>{{ i18n.t('reo.sipChangesFilterAll') }}</span>
                <span 
                  class="px-1.5 py-0.2 rounded-full text-[10px] font-black"
                  [class.bg-indigo-100]="changelogService.activeTab() === 'all'"
                  [class.text-indigo-800]="changelogService.activeTab() === 'all'"
                  [class.bg-slate-300]="changelogService.activeTab() !== 'all'"
                  [class.text-slate-700]="changelogService.activeTab() !== 'all'"
                >
                  {{ changelogService.totalRecentCount() }}
                </span>
              </button>
            </div>

            <!-- Search Field -->
            <div class="relative w-full sm:w-64">
              <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                [value]="changelogService.searchQuery()"
                (input)="onSearchInput($event)"
                [placeholder]="i18n.t('reo.sipChangesSearchPlaceholder')"
                class="w-full pl-9 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder:text-slate-400"
              />
              @if (changelogService.searchQuery()) {
                <button
                  type="button"
                  (click)="changelogService.setSearchQuery('')"
                  class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              }
            </div>
          </div>

          <!-- Retention Banner Notice -->
          <div class="px-6 py-2 bg-indigo-50/50 border-b border-indigo-100/60 flex items-center justify-between text-xs text-indigo-900">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-600 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{{ i18n.t('reo.sipChangesRetentionNotice') }}</span>
            </div>
            @if (changelogService.olderExcludedCount() > 0) {
              <span class="text-[11px] font-medium text-slate-500 bg-white/80 px-2 py-0.5 rounded-md border border-indigo-100">
                {{ changelogService.olderExcludedCount() }} {{ i18n.currentLang() === 'fr' ? 'modifications antérieures purgées' : 'older changes purged' }}
              </span>
            }
          </div>

          <!-- Changes List Content -->
          <div class="p-6 overflow-y-auto flex-1 space-y-3 bg-slate-50/30">
            @if (changelogService.displayedChanges().length === 0) {
              <div class="py-12 text-center text-slate-500">
                <svg class="w-12 h-12 mx-auto text-slate-300 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                  <path d="M9 16l2 2 4-4"></path>
                </svg>
                <p class="text-sm font-semibold text-slate-600">
                  {{ i18n.t('reo.sipChangesEmpty') }}
                </p>
              </div>
            } @else {
              @for (item of changelogService.displayedChanges(); track item.id) {
                <div class="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div class="flex items-center gap-2.5 flex-wrap">
                      <!-- Date badge -->
                      <span class="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-semibold flex items-center gap-1">
                        <svg class="w-3 h-3 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {{ formatDisplayDate(item.date) }}
                      </span>

                      <!-- Trade Title -->
                      <span class="text-sm font-bold text-slate-800">
                        {{ item.tradeCode }} - {{ i18n.currentLang() === 'fr' ? item.tradeNameFr : item.tradeNameEn }}
                      </span>

                      <!-- Program badge -->
                      <span class="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                        {{ item.program }}
                      </span>
                    </div>

                    <!-- Change Type Badge -->
                    <div class="shrink-0">
                      @switch (item.type) {
                        @case ('opened') {
                          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            {{ i18n.t('reo.sipChangesTypeOpened') }}
                          </span>
                        }
                        @case ('closed') {
                          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            {{ i18n.t('reo.sipChangesTypeClosed') }}
                          </span>
                        }
                        @case ('traitement_only') {
                          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            {{ i18n.t('reo.sipChangesTypeTraitement') }}
                          </span>
                        }
                        @case ('waitlist') {
                          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                            {{ i18n.t('reo.sipChangesTypeWaitlist') }}
                          </span>
                        }
                      }
                    </div>
                  </div>

                  <!-- Details & Status Transition -->
                  <div class="pt-2.5 text-xs">
                    <div class="flex items-center gap-2 text-slate-500 mb-1">
                      <span class="font-medium text-slate-400">
                        {{ i18n.currentLang() === 'fr' ? 'Transition :' : 'Transition:' }}
                      </span>
                      <span class="line-through text-slate-400">
                        {{ i18n.currentLang() === 'fr' ? item.statusBeforeFr : item.statusBeforeEn }}
                      </span>
                      <svg class="w-3.5 h-3.5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                      <span class="font-semibold text-slate-700">
                        {{ i18n.currentLang() === 'fr' ? item.statusAfterFr : item.statusAfterEn }}
                      </span>
                    </div>

                    <!-- Notes / Description -->
                    <p class="text-slate-600 mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      {{ i18n.currentLang() === 'fr' ? item.notesFr : item.notesEn }}
                    </p>
                  </div>
                </div>
              }
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span class="text-xs text-slate-500">
              {{ i18n.t('reo.sipChangesCountBadge', { count: changelogService.totalRecentCount() }) }}
            </span>
            <button
              type="button"
              (click)="changelogService.closeModal()"
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              {{ i18n.t('reo.sipChangesClose') }}
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class SipChangelogModalComponent {
  changelogService = inject(SipChangelogService);
  jobService = inject(JobDatabaseService);
  i18n = inject(TranslationService);

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).getAttribute('role') === 'dialog') {
      this.changelogService.closeModal();
    }
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value || '';
    this.changelogService.setSearchQuery(val);
  }

  formatDisplayDate(dateStr: string): string {
    return formatSipDate(parseSipDate(dateStr));
  }
}
