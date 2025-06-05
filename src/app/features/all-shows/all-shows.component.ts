// src/app/features/all-shows/all-shows.component.ts
import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TvMazeService } from "../../core/services/tvmaze.service";
import { Show } from "../../models/show.model";
import { ShowListComponent } from "../../shared/components/show-list/show-list.component";

@Component({
  selector: "app-all-shows",
  standalone: true,
  imports: [CommonModule, ShowListComponent],
  templateUrl: "./all-shows.component.html",
  styleUrls: ["./all-shows.component.css"],
})
export class AllShowsComponent {
  private currentPage = signal(0);
  readonly isLoading = signal(false);
  readonly errorMessage = signal("");
  readonly shows = signal<Show[]>([]);

  constructor(private tvMaze: TvMazeService) {
    this.loadNextPage();
  }

  /** Flag to indicate loading state */
  get loading(): boolean {
    return this.isLoading();
  }

  /** Error text shown on failure */
  get error(): string {
    return this.errorMessage();
  }

  /** Fetches the next page of shows from API */
  loadNextPage(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.errorMessage.set("");

    const nextPage = this.currentPage() + 1;
    this.tvMaze.getShows(nextPage).subscribe({
      next: (res: Show[]) => {
        this.shows.set([...this.shows(), ...res]);
        this.currentPage.set(nextPage);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set("Failed to load shows. Please try again.");
        this.isLoading.set(false);
      },
    });
  }
}
