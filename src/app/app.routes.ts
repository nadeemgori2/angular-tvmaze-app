import { Routes } from "@angular/router";
import { ShowsComponent } from "./features/shows/shows.component";

export const routes: Routes = [
  {
    path: "",
    component: ShowsComponent,
    pathMatch: "full",
  },
  {
    path: "all-shows",
    loadComponent: () =>
      import("./features/all-shows/all-shows.component").then(
        (m) => m.AllShowsComponent
      ),
  },
  {
    path: "show/:id",
    loadComponent: () =>
      import("./features/show-details/show-details.component").then(
        (m) => m.ShowDetailsComponent
      ),
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];
