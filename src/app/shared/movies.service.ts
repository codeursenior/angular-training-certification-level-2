import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly httpClient = inject(HttpClient);

  getMovieList(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>('movies');
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this.httpClient.get<Movie>('movies/' + movieId);
  }
}
