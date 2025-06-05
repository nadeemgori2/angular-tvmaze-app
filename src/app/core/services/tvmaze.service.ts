// src/app/core/services/tvmaze.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { CastMember, Show } from "../../models/show.model";

@Injectable({
  providedIn: "root",
})
export class TvMazeService {
  private readonly BASE_URL = "https://api.tvmaze.com";

  constructor(private http: HttpClient) {}

  private buildUrl(path: string): string {
    return `${this.BASE_URL}${path}`;
  }

  /** Search shows by query string */
  searchShows(query: string): Observable<Show[]> {
    return this.http
      .get<{ show: Show }[]>(this.buildUrl(`/search/shows?q=${query}`))
      .pipe(map((results) => results.map((result) => result.show)));
  }

  /** Fetch shows by paginated API */
  getShows(page: number): Observable<Show[]> {
    return this.http.get<Show[]>(this.buildUrl(`/shows?page=${page}`));
  }

  /** Fetch a single show by ID */
  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(this.buildUrl(`/shows/${id}`));
  }

  /** Fetch cast list for a show */
  getCast(id: number): Observable<string[]> {
    return this.http
      .get<CastMember[]>(this.buildUrl(`/shows/${id}/cast`))
      .pipe(map((cast) => cast.map((member) => member.person?.name)));
  }
}
