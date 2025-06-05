// src/app/features/show-details/show-details.component.ts
import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { forkJoin } from "rxjs";
import { Show } from "../../models/show.model";
import { TvMazeService } from "../../core/services/tvmaze.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FALLBACK_IMAGE } from "../../shared/constants/common.constants";

@Component({
  selector: "app-show-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./show-details.component.html",
  styleUrls: ["./show-details.component.css"],
})
export class ShowDetailsComponent implements OnInit {
  readonly show = signal<Show | null>(null);
  readonly cast = signal<string[]>([]);
  readonly error = signal<string | null>(null);
  imageLoaded = false;
  fallbackImg = FALLBACK_IMAGE;

  constructor(
    private route: ActivatedRoute,
    private tvMaze: TvMazeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.error.set("Invalid show ID.");
      return;
    }

    const showId = Number(id);
    forkJoin({
      show: this.tvMaze.getShow(showId),
      cast: this.tvMaze.getCast(showId),
    }).subscribe({
      next: ({ show, cast }) => {
        this.show.set(show);
        this.cast.set(cast);
      },
      error: () => this.error.set("Failed to load show details."),
    });
  }

  /** Sanitizes HTML from API to avoid XSS risks */
  sanitizeSummary(summary: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(summary);
  }

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.fallbackImg;
    this.imageLoaded = true;
  }
}
