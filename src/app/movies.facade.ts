import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Movie } from './movie.model';
import { MoviesService } from './movies.service';

type MovieState = {
  movieList: Movie[];
  isLoading: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class MoviesFacade {
  private readonly moviesService = inject(MoviesService);
  private readonly state = new BehaviorSubject<MovieState>({
    movieList: [],
    isLoading: false,
  });
  private readonly state$ = this.state.asObservable();

  /* Selectors */
  movieList$ = this.state$.pipe(map((state) => state.movieList));
  isLoading$ = this.state$.pipe(map((state) => state.isLoading));

  /* Reducers */
  private setMovieList(movieList: Movie[]) {
    this.state.next({ movieList, isLoading: false });
  }

  private startLoading() {
    this.state.next({ ...this.state.value, isLoading: true });
  }

  /* Side Effects */
  loadMovieList(): void {
    this.moviesService
      .getMovieList()
      .pipe(tap(() => this.startLoading))
      .subscribe((value) => this.setMovieList(value));
  }
}
