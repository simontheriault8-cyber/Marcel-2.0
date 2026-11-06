import {
  Component,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JobDatabaseService } from '../../../services/job-database.service';
import { TranslationService } from '../../i18n';
import { JobEntry, MilitaryElement, isOfficerJobId } from '../../../services/jobs-data';
import {
  expandList,
  isBulletless,
  isConnector,
  isSubItem,
  cleanSubItem,
  isParenthetical,
  formatTextWithNotes,
  formatRequirementsFallback,
} from './admin-job-catalog.utils';

@Component({
  selector: 'app-admin-job-catalog',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex-1 flex flex-col min-h-0 w-full h-full bg-slate-100 overflow-hidden">
      <!-- DETAIL VIEW -->
      @if (selectedJob(); as job) {
        <div class="flex-1 flex flex-col min-h-0 bg-white overflow-hidden animate-fadeIn">
          <!-- Detail Navigation Header -->
          <div class="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
            <button
              type="button"
              (click)="selectedJob.set(null)"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>{{ i18n.t('admin.catalogBackToList') }}</span>
            </button>

            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                ID: {{ job.id }}
              </span>
              <span class="font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                {{ job.abbreviation }}
              </span>
            </div>
          </div>

          <!-- Detail Content Scroll Area -->
          <div class="flex-1 overflow-y-auto p-6 min-h-0 space-y-6">
            <!-- Job Title and Header Badges -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {{ i18n.isEn() ? (job.titleEn || job.title) : job.title }}
              </h2>

              <div class="mt-4 flex flex-wrap items-center gap-2">
                <!-- ID & Abbr -->
                <span class="bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold border border-indigo-200">
                  ID: {{ job.id }}
                </span>
                <span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                  {{ job.abbreviation }}
                </span>

                <!-- Category Badge -->
                @if (isOfficer(job.id)) {
                  <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold border border-purple-200">
                    {{ i18n.t('careerPortal.officer') }}
                  </span>
                } @else {
                  <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
                    {{ i18n.t('careerPortal.ncm') }}
                  </span>
                }

                <!-- Element Badge -->
                @if (job.element) {
                  <span
                    class="px-3 py-1 rounded-full text-xs font-bold border"
                    [class.bg-emerald-100]="job.element === 'Armée'"
                    [class.text-emerald-800]="job.element === 'Armée'"
                    [class.border-emerald-200]="job.element === 'Armée'"
                    [class.bg-sky-100]="job.element === 'Air'"
                    [class.text-sky-800]="job.element === 'Air'"
                    [class.border-sky-200]="job.element === 'Air'"
                    [class.bg-blue-900]="job.element === 'Marine'"
                    [class.text-white]="job.element === 'Marine'"
                    [class.border-blue-950]="job.element === 'Marine'"
                    [class.bg-purple-100]="job.element === 'CMP'"
                    [class.text-purple-800]="job.element === 'CMP'"
                    [class.border-purple-200]="job.element === 'CMP'"
                  >
                    {{ i18n.t('careerPortal.elementLabel') }}{{ job.element === 'CMP' ? i18n.t('careerPortal.cmpChoice') : job.element }}
                  </span>
                }

                <!-- Citizenship Badge -->
                @if (jobService.isJobRp(job.id)) {
                  <span class="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                    {{ i18n.t('careerPortal.permanentResident') }}
                  </span>
                } @else {
                  <span class="bg-amber-50 text-amber-900 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
                    {{ i18n.t('careerPortal.citizenOnly') }}
                  </span>
                }
              </div>

              <!-- Medical & SIP Specifications Bar -->
              <div class="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-700">
                <!-- Minimum Medical Standard -->
                @if (job.medicalStandard) {
                  <div>
                    <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {{ i18n.t('careerPortal.minMedicalProfile') }}
                    </span>
                    <div class="flex items-center gap-1.5 font-mono">
                      <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200 font-bold">V: {{ job.medicalStandard.v }}</span>
                      <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200 font-bold">CV: {{ job.medicalStandard.cv }}</span>
                      <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200 font-bold">H: {{ job.medicalStandard.h }}</span>
                      <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200 font-bold">G: {{ job.medicalStandard.g }}</span>
                      <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200 font-bold">O: {{ job.medicalStandard.o }}</span>
                      <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200 font-bold">A: {{ job.medicalStandard.a }}</span>
                    </div>
                  </div>
                }

                <!-- Initial Contract -->
                @if (job.contracts && job.contracts.length > 0) {
                  <div>
                    <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {{ i18n.t('careerPortal.initialContract') }}
                    </span>
                    <div class="flex items-center flex-wrap gap-1.5">
                      @for (c of job.contracts; track c.program) {
                        <span class="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                          {{ c.duration }} ({{ c.program }})
                        </span>
                      }
                    </div>
                  </div>
                }

                <!-- SIP Programs Status -->
                <div>
                  <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Statut SIP
                  </span>
                  <div class="flex items-center flex-wrap gap-1.5">
                    @let progs = jobService.getJobPrograms(job.id);
                    @for (progKey of getObjectKeys(progs); track progKey) {
                      <span
                        class="px-2 py-1 rounded-md font-bold text-[11px] border"
                        [class.bg-emerald-100]="progs[progKey] === 'o'"
                        [class.text-emerald-800]="progs[progKey] === 'o'"
                        [class.border-emerald-300]="progs[progKey] === 'o'"
                        [class.bg-amber-100]="progs[progKey] === 'limité'"
                        [class.text-amber-800]="progs[progKey] === 'limité'"
                        [class.border-amber-300]="progs[progKey] === 'limité'"
                        [class.bg-rose-100]="progs[progKey] === 'f'"
                        [class.text-rose-800]="progs[progKey] === 'f'"
                        [class.border-rose-300]="progs[progKey] === 'f'"
                      >
                        {{ progKey }}: {{ progs[progKey] === 'o' ? i18n.t('careerPortal.open') : progs[progKey] === 'limité' ? i18n.t('careerPortal.limited') : i18n.t('careerPortal.closed') }}
                      </span>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- Structured Table Details or Fallback -->
            @if (job.details && job.details.length > 0) {
              @for (detail of job.details; track $index) {
                <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                  <h3 class="text-base sm:text-lg font-bold text-indigo-950 uppercase tracking-wide border-b border-slate-200 pb-3 mb-4">
                    {{ detail.force }}
                  </h3>

                  <div class="overflow-x-auto rounded-xl border border-slate-200">
                    <table class="w-full text-xs sm:text-sm text-left border-collapse">
                      <thead class="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                        <tr>
                          <th class="p-3 w-1/4 border-r border-slate-200">{{ i18n.t('careerPortal.colCandidates') }}</th>
                          <th class="p-3 w-1/2 border-r border-slate-200">{{ i18n.t('careerPortal.colEducation') }}</th>
                          <th class="p-3 w-1/4">{{ i18n.t('careerPortal.colExperience') }}</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-200 text-slate-800">
                        @for (group of detail.candidateGroups; track $index) {
                          @for (req of group.requirements; track $index; let first = $first) {
                            <tr class="hover:bg-slate-50/80 transition-colors">
                              @if (first) {
                                <td [attr.rowspan]="group.requirements.length" class="p-3.5 border-r border-slate-200 font-semibold align-top bg-slate-50/60">
                                  <ul class="list-disc list-outside ml-4 space-y-1">
                                    @for (cand of expand(group.candidates); track $index) {
                                      <li
                                        [class.list-none]="isBulletless(cand)"
                                        [style.list-style-type]="isSubItem(cand) ? 'circle' : ''"
                                        [class.-ml-4]="isConnector(cand) || isParenthetical(cand)"
                                        [class.font-bold]="isConnector(cand)"
                                        [class.text-center]="isConnector(cand)"
                                        [class.ml-5]="isSubItem(cand)"
                                        [class.text-xs]="isParenthetical(cand)"
                                        [class.text-slate-500]="isParenthetical(cand)"
                                      >
                                        <span [innerHTML]="formatText(isSubItem(cand) ? cleanSubItem(cand) : cand)"></span>
                                      </li>
                                    }
                                  </ul>
                                </td>
                              }
                              <!-- Education -->
                              <td class="p-3.5 border-r border-slate-200 align-top">
                                <div class="flex gap-3">
                                  <div class="font-bold min-w-[70px] text-indigo-700">{{ req.level }}</div>
                                  <ul class="list-disc list-outside ml-4 space-y-1 flex-1">
                                    @for (edu of expand(req.education); track $index) {
                                      <li
                                        [class.list-none]="isBulletless(edu)"
                                        [style.list-style-type]="isSubItem(edu) ? 'circle' : ''"
                                        [class.-ml-4]="isConnector(edu)"
                                        [class.font-bold]="isConnector(edu)"
                                        [class.text-center]="isConnector(edu)"
                                        [class.ml-5]="isSubItem(edu)"
                                        [class.text-xs]="isParenthetical(edu)"
                                        [class.text-slate-500]="isParenthetical(edu)"
                                      >
                                        <span [innerHTML]="formatText(isSubItem(edu) ? cleanSubItem(edu) : edu)"></span>
                                      </li>
                                    }
                                  </ul>
                                </div>
                              </td>
                              <!-- Experience -->
                              <td class="p-3.5 align-top">
                                <ul class="list-disc list-outside ml-4 space-y-1">
                                  @for (exp of expand(req.experience); track $index) {
                                    <li
                                      [class.list-none]="isBulletless(exp)"
                                      [style.list-style-type]="isSubItem(exp) ? 'circle' : ''"
                                      [class.-ml-4]="isConnector(exp)"
                                      [class.font-bold]="isConnector(exp)"
                                      [class.text-center]="isConnector(exp)"
                                      [class.ml-5]="isSubItem(exp)"
                                      [class.text-xs]="isParenthetical(exp)"
                                      [class.text-slate-500]="isParenthetical(exp)"
                                    >
                                      <span [innerHTML]="formatText(isSubItem(exp) ? cleanSubItem(exp) : exp)"></span>
                                    </li>
                                  }
                                </ul>
                              </td>
                            </tr>
                          }
                        }
                      </tbody>
                    </table>
                  </div>

                  <!-- Footnotes / Notes Section -->
                  @if (detail.notes && detail.notes.length > 0) {
                    <div class="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      <p class="font-bold text-slate-800 mb-2 uppercase tracking-wider text-[11px]">
                        {{ i18n.t('careerPortal.notes') }}
                      </p>
                      <div class="space-y-2">
                        @for (note of detail.notes; track note) {
                          <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 leading-relaxed">
                            {{ note }}
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              }
            } @else {
              <!-- Fallback View -->
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div [innerHTML]="job.htmlContent || formatFallback(job.requirements)"></div>
              </div>
            }
          </div>
        </div>
      }

      <!-- LIST VIEW -->
      @else {
        <!-- Search and Filter Bar -->
        <div class="bg-white border-b border-slate-200 p-4 sm:p-5 flex flex-col gap-3 shrink-0 shadow-xs">
          <!-- Top Row: Search input and Stats -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="relative flex-1 max-w-xl">
              <input
                type="text"
                [value]="searchQuery()"
                (input)="onSearchInput($event)"
                [placeholder]="i18n.t('careerPortal.searchPlaceholder')"
                class="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              @if (searchQuery()) {
                <button
                  type="button"
                  (click)="searchQuery.set('')"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              }
            </div>

            <!-- Stats Badge -->
            <div class="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-600 font-semibold">
              <span class="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
                {{ filteredJobs().length }} / {{ allJobs().length }} {{ i18n.isEn() ? 'trades' : 'métiers' }}
              </span>
              <span class="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-[11px]">
                MR: {{ countNcm() }}
              </span>
              <span class="px-2.5 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-[11px]">
                Off: {{ countOfficers() }}
              </span>
            </div>
          </div>

          <!-- Bottom Row: Category & Element Filters -->
          <div class="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-xs">
            <!-- Category Filter -->
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                {{ i18n.t('admin.catalogFilterCategory') }}
              </span>
              <div class="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  type="button"
                  (click)="selectedCategory.set('ALL')"
                  class="px-2.5 py-1 rounded-md font-semibold text-[11px] transition-all cursor-pointer"
                  [class.bg-white]="selectedCategory() === 'ALL'"
                  [class.text-indigo-700]="selectedCategory() === 'ALL'"
                  [class.shadow-xs]="selectedCategory() === 'ALL'"
                  [class.text-slate-600]="selectedCategory() !== 'ALL'"
                >
                  {{ i18n.t('criteriaMatrix.filterAll') }} ({{ allJobs().length }})
                </button>
                <button
                  type="button"
                  (click)="selectedCategory.set('MR')"
                  class="px-2.5 py-1 rounded-md font-semibold text-[11px] transition-all cursor-pointer"
                  [class.bg-white]="selectedCategory() === 'MR'"
                  [class.text-blue-700]="selectedCategory() === 'MR'"
                  [class.shadow-xs]="selectedCategory() === 'MR'"
                  [class.text-slate-600]="selectedCategory() !== 'MR'"
                >
                  MR ({{ countNcm() }})
                </button>
                <button
                  type="button"
                  (click)="selectedCategory.set('OFFICER')"
                  class="px-2.5 py-1 rounded-md font-semibold text-[11px] transition-all cursor-pointer"
                  [class.bg-white]="selectedCategory() === 'OFFICER'"
                  [class.text-purple-700]="selectedCategory() === 'OFFICER'"
                  [class.shadow-xs]="selectedCategory() === 'OFFICER'"
                  [class.text-slate-600]="selectedCategory() !== 'OFFICER'"
                >
                  Officiers ({{ countOfficers() }})
                </button>
              </div>
            </div>

            <!-- Element Filter -->
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                {{ i18n.t('admin.catalogFilterElement') }}
              </span>
              <div class="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  type="button"
                  (click)="selectedElement.set('ALL')"
                  class="px-2 py-1 rounded-md font-semibold text-[11px] transition-all cursor-pointer"
                  [class.bg-white]="selectedElement() === 'ALL'"
                  [class.text-indigo-700]="selectedElement() === 'ALL'"
                  [class.shadow-xs]="selectedElement() === 'ALL'"
                  [class.text-slate-600]="selectedElement() !== 'ALL'"
                >
                  {{ i18n.t('criteriaMatrix.filterElementAll') }}
                </button>
                <button
                  type="button"
                  (click)="selectedElement.set('Armée')"
                  class="px-2 py-1 rounded-md font-semibold text-[11px] transition-all cursor-pointer"
                  [class.bg-white]="selectedElement() === 'Armée'"
                  [class.text-emerald-800]="selectedElement() === 'Armée'"
                  [class.shadow-xs]="selectedElement() === 'Armée'"
                  [class.text-slate-600]="selectedElement() !== 'Armée'"
                >
                  Armée
                </button>
                <button
                  type="button"
                  (click)="selectedElement.set('Air')"
                  class="px-2 py-1 rounded-md font-semibold text-[11px] transition-all cursor-pointer"
                  [class.bg-white]="selectedElement() === 'Air'"
                  [class.text-sky-800]="selectedElement() === 'Air'"
                  [class.shadow-xs]="selectedElement() === 'Air'"
                  [class.text-slate-600]="selectedElement() !== 'Air'"
                >
                  Air
                </button>
                <button
                  type="button"
                  (click)="selectedElement.set('Marine')"
                  class="px-2 py-1 rounded-md font-semibold text-[11px] transition-all cursor-pointer"
                  [class.bg-white]="selectedElement() === 'Marine'"
                  [class.text-blue-900]="selectedElement() === 'Marine'"
                  [class.shadow-xs]="selectedElement() === 'Marine'"
                  [class.text-slate-600]="selectedElement() !== 'Marine'"
                >
                  Marine
                </button>
                <button
                  type="button"
                  (click)="selectedElement.set('CMP')"
                  class="px-2 py-1 rounded-md font-semibold text-[11px] transition-all cursor-pointer"
                  [class.bg-white]="selectedElement() === 'CMP'"
                  [class.text-purple-800]="selectedElement() === 'CMP'"
                  [class.shadow-xs]="selectedElement() === 'CMP'"
                  [class.text-slate-600]="selectedElement() !== 'CMP'"
                >
                  CMP
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Job Cards Grid -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (job of filteredJobs(); track job.id) {
              <div
                (click)="selectedJob.set(job)"
                class="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <!-- Top Row: Code, Abbr, Category, Element -->
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="flex items-center gap-1.5">
                      <span class="font-mono text-xs font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                        {{ job.id }}
                      </span>
                      <span class="text-xs font-bold text-slate-500">
                        {{ job.abbreviation }}
                      </span>
                    </div>

                    <div class="flex items-center gap-1">
                      @if (isOfficer(job.id)) {
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          Off
                        </span>
                      } @else {
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          MR
                        </span>
                      }

                      @if (job.element) {
                        <span
                          class="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                          [class.bg-emerald-50]="job.element === 'Armée'"
                          [class.text-emerald-800]="job.element === 'Armée'"
                          [class.border-emerald-200]="job.element === 'Armée'"
                          [class.bg-sky-50]="job.element === 'Air'"
                          [class.text-sky-800]="job.element === 'Air'"
                          [class.border-sky-200]="job.element === 'Air'"
                          [class.bg-blue-900]="job.element === 'Marine'"
                          [class.text-white]="job.element === 'Marine'"
                          [class.border-blue-950]="job.element === 'Marine'"
                          [class.bg-purple-50]="job.element === 'CMP'"
                          [class.text-purple-800]="job.element === 'CMP'"
                          [class.border-purple-200]="job.element === 'CMP'"
                        >
                          {{ job.element }}
                        </span>
                      }
                    </div>
                  </div>

                  <!-- Job Title -->
                  <h3 class="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {{ i18n.isEn() ? (job.titleEn || job.title) : job.title }}
                  </h3>

                  <!-- Metadata Badges -->
                  <div class="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <!-- Citizenship -->
                    @if (jobService.isJobRp(job.id)) {
                      <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                        RP + CC
                      </span>
                    } @else {
                      <span class="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                        CC
                      </span>
                    }

                    <!-- Medical standard -->
                    @if (job.medicalStandard) {
                      <span class="px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200 font-mono text-[10px]">
                        V{{ job.medicalStandard.v }} CV{{ job.medicalStandard.cv }} H{{ job.medicalStandard.h }} G{{ job.medicalStandard.g }} O{{ job.medicalStandard.o }} A{{ job.medicalStandard.a }}
                      </span>
                    }
                  </div>

                  <!-- Requirements Preview -->
                  @if (job.requirements) {
                    <p class="mt-3 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {{ job.requirements }}
                    </p>
                  }
                </div>

                <!-- Footer: Open in Detail Arrow -->
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-800">
                  <span>{{ i18n.isEn() ? 'View details' : 'Consulter la fiche' }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            } @empty {
              <div class="col-span-full py-16 text-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm font-semibold text-slate-600">{{ i18n.t('careerPortal.noJobFound') }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ i18n.isEn() ? 'Try adjusting your search criteria' : 'Essayez d’ajuster vos critères de recherche' }}</p>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class AdminJobCatalogComponent {
  jobService = inject(JobDatabaseService);
  i18n = inject(TranslationService);
  private sanitizer = inject(DomSanitizer);

  searchQuery = signal<string>('');
  selectedCategory = signal<'ALL' | 'MR' | 'OFFICER'>('ALL');
  selectedElement = signal<'ALL' | MilitaryElement>('ALL');
  selectedJob = signal<JobEntry | null>(null);

  allJobs = signal<JobEntry[]>(this.jobService.getAllJobs());

  countNcm = computed(
    () => this.allJobs().filter((j) => !isOfficerJobId(j.id)).length
  );

  countOfficers = computed(
    () => this.allJobs().filter((j) => isOfficerJobId(j.id)).length
  );

  filteredJobs = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const cat = this.selectedCategory();
    const elem = this.selectedElement();
    const isEn = this.i18n.isEn();

    return this.allJobs().filter((job) => {
      // Category filter
      const isOff = isOfficerJobId(job.id);
      if (cat === 'MR' && isOff) return false;
      if (cat === 'OFFICER' && !isOff) return false;

      // Element filter
      if (elem !== 'ALL' && job.element !== elem) return false;

      // Text query
      if (q) {
        const title = (isEn ? (job.titleEn || job.title) : job.title).toLowerCase();
        const idMatch = job.id.toLowerCase().includes(q);
        const abbrMatch = job.abbreviation.toLowerCase().includes(q);
        const titleMatch = title.includes(q);
        const elemMatch = (job.element || '').toLowerCase().includes(q);
        const reqMatch = (job.requirements || '').toLowerCase().includes(q);

        if (!idMatch && !abbrMatch && !titleMatch && !elemMatch && !reqMatch) {
          return false;
        }
      }

      return true;
    });
  });

  isOfficer(jobId: string): boolean {
    return isOfficerJobId(jobId);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  formatText(text: string): SafeHtml {
    return formatTextWithNotes(text, this.sanitizer);
  }

  formatFallback(req: string | undefined): SafeHtml {
    return formatRequirementsFallback(req, this.sanitizer);
  }

  expand(items: string[] | undefined): string[] {
    return expandList(items);
  }

  isBulletless(item: string): boolean {
    return isBulletless(item);
  }

  isConnector(item: string): boolean {
    return isConnector(item);
  }

  isSubItem(item: string): boolean {
    return isSubItem(item);
  }

  cleanSubItem(item: string): string {
    return cleanSubItem(item);
  }

  isParenthetical(item: string): boolean {
    return isParenthetical(item);
  }
}
