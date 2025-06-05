// src/app/shared/components/show-list/show-list.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShowCardComponent } from "../show-card/show-card.component";
import { Show } from "../../../models/show.model";
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from "@angular/cdk/scrolling";

@Component({
  selector: "app-show-list",
  standalone: true,
  imports: [CommonModule, ShowCardComponent, ScrollingModule],
  templateUrl: "./show-list.component.html",
  styleUrls: ["./show-list.component.css"],
})
export class ShowListComponent implements AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  /** Accepts a signal of shows or a static array */
  @Input() signalShows?: () => Show[];
  @Input() arrayShows: Show[] = [];
  @Input() useVirtualScroll = false;

  /** Emits when bottom of list is reached */
  @Output() scrolledToBottom = new EventEmitter<void>();

  /** Returns current list to display */
  get list(): Show[] {
    return this.signalShows ? this.signalShows() : this.arrayShows;
  }

  ngAfterViewInit(): void {
    // If required for layout recalculation, keep this.
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }

  /** Helps Angular track list items efficiently */
  trackByShow = (_: number, show: Show) => show.id;

  /** Handle scroll events in virtual scroll */
  onScroll(): void {
    if (!this.viewport) return;
    const renderedRange = this.viewport.getRenderedRange();
    const total = this.viewport.getDataLength();

    // Trigger when we're near the bottom (e.g., within last 3 items)
    if (renderedRange.end >= total - 3) {
      this.scrolledToBottom.emit();
    }
  }
}
