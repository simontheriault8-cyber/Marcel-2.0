import {
  Component,
  signal,
  inject,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedStateService } from "../../services/shared-state.service";
import { ReorientationComponent } from "./reorientation.component";
import { PforComponent } from "./pfor.component";
import { TranslationService } from "../i18n/translation.service";
import { JOB_SEARCH_MODAL_TEMPLATE } from "./job-search-modal.template";

type ModalTab = "reorientation" | "pfor";

@Component({
  selector: "app-job-search-modal",
  standalone: true,
  imports: [CommonModule, ReorientationComponent, PforComponent],
  template: JOB_SEARCH_MODAL_TEMPLATE,
  styles: [],
})
export class JobSearchModalComponent {
  sharedState = inject(SharedStateService);
  i18n = inject(TranslationService);

  @Output() closeModal = new EventEmitter<void>();
  @ViewChild(ReorientationComponent)
  reorientationComponent!: ReorientationComponent;

  activeTab = signal<ModalTab>("reorientation");
  _showReorientationTab = signal<boolean>(true);

  // Window Positioning & Fullscreen State
  position = signal({ x: 100, y: 100 });
  size = signal({ width: 1000, height: 800 });
  isFullScreen = signal(true);

  // Drag State
  private isDragging = false;
  private dragStart = { x: 0, y: 0 };
  private initialPos = { x: 0, y: 0 };

  // Resize State
  private isResizing = false;
  private resizeStart = { x: 0, y: 0 };
  private initialSize = { width: 0, height: 0 };

  @Input() set showReorientationTab(val: boolean) {
    this._showReorientationTab.set(val);
    if (!val && (this.activeTab() === "reorientation" || this.activeTab() === "pfor")) {
      this.activeTab.set("reorientation");
    }
  }

  constructor() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  setTab(tab: ModalTab) {
    this.activeTab.set(tab);
    if (tab === "pfor") {
      this.sharedState.isPostulantPfor.set(true);
    } else if (tab === "reorientation") {
      this.sharedState.isPostulantPfor.set(false);
    }
  }

  close() {
    this.closeModal.emit();
  }

  toggleFullScreen() {
    this.isFullScreen.update((v) => !v);
  }

  // --- Drag Logic ---
  startDrag(e: MouseEvent) {
    if (this.isFullScreen()) return;
    this.isDragging = true;
    this.dragStart = { x: e.clientX, y: e.clientY };
    this.initialPos = { ...this.position() };
    e.preventDefault();
  }

  // --- Resize Logic ---
  startResize(e: MouseEvent) {
    if (this.isFullScreen()) return;
    this.isResizing = true;
    this.resizeStart = { x: e.clientX, y: e.clientY };
    this.initialSize = { ...this.size() };
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      const dx = e.clientX - this.dragStart.x;
      const dy = e.clientY - this.dragStart.y;
      this.position.set({
        x: this.initialPos.x + dx,
        y: this.initialPos.y + dy,
      });
    } else if (this.isResizing) {
      const dx = e.clientX - this.resizeStart.x;
      const dy = e.clientY - this.resizeStart.y;
      this.size.set({
        width: Math.max(300, this.initialSize.width + dx),
        height: Math.max(200, this.initialSize.height + dy),
      });
    }
  }

  onMouseUp() {
    this.isDragging = false;
    this.isResizing = false;
  }
}
