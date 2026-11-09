import { Injectable, computed, signal } from '@angular/core';
import {
  SipChangeItem,
  RAW_SIP_CHANGELOG,
  filterSipChangesByRetention,
  formatSipDate,
  parseSipDate,
} from '../app/data/sip-changelog.data';
import SIP_DATA from '../../SIP.json';

export type SipChangeTab = 'thisWeek' | 'lastWeek' | 'all';

@Injectable({
  providedIn: 'root',
})
export class SipChangelogService {
  // Modal visibility
  isOpen = signal<boolean>(false);

  // Active filter tab
  activeTab = signal<SipChangeTab>('thisWeek');

  // Search filter query
  searchQuery = signal<string>('');

  // Raw items (can be extended dynamically if needed)
  rawItems = signal<SipChangeItem[]>(RAW_SIP_CHANGELOG);

  // Reference date from SIP.json date (e.g. "27/10/2026")
  readonly referenceDateStr = SIP_DATA.date || '';

  // Filtered by 2-week retention rule
  retentionData = computed(() => {
    return filterSipChangesByRetention(this.rawItems(), this.referenceDateStr);
  });

  // Changes for this week (last 7 days)
  thisWeekChanges = computed(() => this.retentionData().thisWeek);

  // Changes for last week (8 to 14 days)
  lastWeekChanges = computed(() => this.retentionData().lastWeek);

  // All changes within the last 14 days
  allRecentChanges = computed(() => this.retentionData().allRecent);

  // Number of excluded changes older than 14 days
  olderExcludedCount = computed(() => this.retentionData().olderExcludedCount);

  // Total count of recent changes (displayed on button badge)
  totalRecentCount = computed(() => this.allRecentChanges().length);

  // Count of this week's changes
  thisWeekCount = computed(() => this.thisWeekChanges().length);

  // Filtered list displayed based on active tab and search query
  displayedChanges = computed(() => {
    const tab = this.activeTab();
    let baseList: SipChangeItem[];

    if (tab === 'thisWeek') {
      baseList = this.thisWeekChanges();
    } else if (tab === 'lastWeek') {
      baseList = this.lastWeekChanges();
    } else {
      baseList = this.allRecentChanges();
    }

    const q = this.searchQuery().trim().toLowerCase();
    if (!q) {
      return baseList;
    }

    return baseList.filter((item) => {
      const matchTrade =
        item.tradeCode.toLowerCase().includes(q) ||
        item.tradeNameFr.toLowerCase().includes(q) ||
        item.tradeNameEn.toLowerCase().includes(q);
      const matchProgram = item.program.toLowerCase().includes(q);
      const matchNotes =
        item.notesFr.toLowerCase().includes(q) ||
        item.notesEn.toLowerCase().includes(q);
      const matchDate =
        item.date.toLowerCase().includes(q) ||
        formatSipDate(parseSipDate(item.date)).includes(q);
      return matchTrade || matchProgram || matchNotes || matchDate;
    });
  });

  openModal(): void {
    this.isOpen.set(true);
  }

  closeModal(): void {
    this.isOpen.set(false);
  }

  setTab(tab: SipChangeTab): void {
    this.activeTab.set(tab);
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q);
  }
}
