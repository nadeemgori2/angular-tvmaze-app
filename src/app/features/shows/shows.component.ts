// src/app/features/shows/shows.component.ts
import { Component, OnInit, OnDestroy, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  Subscription,
  of,
} from "rxjs";
import { TvMazeService } from "../../core/services/tvmaze.service";
import { Show } from "../../models/show.model";
import { ShowListComponent } from "../../shared/components/show-list/show-list.component";

@Component({
  selector: "app-shows",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShowListComponent],
  templateUrl: "./shows.component.html",
  styleUrls: ["./shows.component.css"],
})
export class ShowsComponent implements OnInit, OnDestroy {
  readonly searchControl = new FormControl("");
  readonly shows = signal<Show[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal("");

  private sub!: Subscription;

  constructor(private tvMaze: TvMazeService) {}

  ngOnInit(): void {
    this.sub = this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query) => {
          this.isLoading.set(true);
          this.error.set("");
          if (!query) {
            this.shows.set([]);
            this.isLoading.set(false);
            return of([]); // Use of([]) for observable consistency
          }
          return this.tvMaze.searchShows(query);
        })
      )
      .subscribe({
        next: (results) => {
          this.shows.set(results);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set("Failed to search shows. Try again.");
          this.isLoading.set(false);
        },
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
