import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TvMazeService } from "./tvmaze.service";
import { Show, CastMember } from "../../models/show.model";

describe("TvMazeService", () => {
  let service: TvMazeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TvMazeService],
    });
    service = TestBed.inject(TvMazeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should search shows", () => {
    const mockResponse = [{ show: { id: 1, name: "Test Show" } as Show }];
    service.searchShows("test").subscribe((shows) => {
      expect(shows.length).toBe(1);
      expect(shows[0].id).toBe(1);
    });
    const req = httpMock.expectOne(
      "https://api.tvmaze.com/search/shows?q=test"
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });

  it("should get shows by page", () => {
    const mockShows: Show[] = [{ id: 1, name: "Show 1" } as Show];
    service.getShows(2).subscribe((shows) => {
      expect(shows).toEqual(mockShows);
    });
    const req = httpMock.expectOne("https://api.tvmaze.com/shows?page=2");
    expect(req.request.method).toBe("GET");
    req.flush(mockShows);
  });

  it("should get a show by id", () => {
    const mockShow = { id: 5, name: "Show 5" } as Show;
    service.getShow(5).subscribe((show) => {
      expect(show).toEqual(mockShow);
    });
    const req = httpMock.expectOne("https://api.tvmaze.com/shows/5");
    expect(req.request.method).toBe("GET");
    req.flush(mockShow);
  });

  it("should get cast names for a show", () => {
    const mockCast: CastMember[] = [
      { person: { name: "Actor 1" } },
      { person: { name: "Actor 2" } },
    ] as CastMember[];
    service.getCast(10).subscribe((names) => {
      expect(names).toEqual(["Actor 1", "Actor 2"]);
    });
    const req = httpMock.expectOne("https://api.tvmaze.com/shows/10/cast");
    expect(req.request.method).toBe("GET");
    req.flush(mockCast);
  });
});
