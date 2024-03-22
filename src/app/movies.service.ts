import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  readonly #httpClient = inject(HttpClient);

  getMovieList(): Observable<Movie[]> {
    return this.#httpClient.get<Movie[]>('movies');
  }
}
