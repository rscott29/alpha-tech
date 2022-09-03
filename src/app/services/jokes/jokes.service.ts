import {Injectable} from '@angular/core';
import {map, Observable, shareReplay, Subject, switchMap, takeUntil, tap, timer} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {Joke, JokeResponse} from "./Joke";


const API_ENDPOINT = 'http://localhost:8080/api/v1/jokes';
const REFRESH_INTERVAL = 60000;
const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  private cache$!: Observable<Array<Joke>> | null;
  private reload$ = new Subject<void>();

  constructor(private httpClient: HttpClient) {
  }

  get jokes(): Observable<Joke[]> {
    if (!this.cache$) {
      const timer$ = timer(0, REFRESH_INTERVAL);

      this.cache$ = timer$.pipe(
        switchMap(_ => this.requestJokes()),
        takeUntil(this.reload$),
        shareReplay(CACHE_SIZE)
      )
    }
    return this.cache$;
  }

  forceReload() {
    this.reload$.next();
    this.cache$ = null;
  }

  private requestJokes(): Observable<Joke[]> {
    return this.httpClient.get<JokeResponse>(API_ENDPOINT).pipe(
      map((response) => response.jokes)
    );
  }
}
