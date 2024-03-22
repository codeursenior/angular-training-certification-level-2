import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap, withLatestFrom } from 'rxjs';
import { Movie } from './movie.model';
import { MoviesService } from './movies.service';

type MovieState = {
  movieList: Movie[];
  titleSearched: string;
  releaseYearSearched: string;
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
    titleSearched: '',
    releaseYearSearched: '',
  });
  private readonly state$ = this.state.asObservable();

  /* Selectors */
  filteredMovieList$ = this.state$.pipe(
    map((state) => {
      const title = state.titleSearched.trim().toLowerCase();
      const releaseYear = state.releaseYearSearched.trim();

      if (!title && !releaseYear) {
        return this.state.value.movieList;
      }

      const result = this.state.value.movieList.filter((movie: Movie) => {
        console.log(new Date(movie.release_date).getFullYear().toString());
        console.log(releaseYear);

        return (
          movie.title.trim().toLowerCase().includes(title) &&
          new Date(movie.release_date).getFullYear() === +releaseYear
        );
      });

      console.log('RESULT', result);
      return result;
    })
  );

  isLoading$ = this.state$.pipe(map((state) => state.isLoading));

  /* Actions */
  updateFilterTitle(event: Event): void {
    const title = (event.target as HTMLInputElement).value;
    this.setFilterTitle(title);
  }

  updateFilterRealeaseYear(event: Event): void {
    const releaseYear = (event.target as HTMLInputElement).value;
    this.setFilterReleaseYear(releaseYear);
  }

  /* Reducers */
  private setMovieList(movieList: Movie[]) {
    this.state.next({ ...this.state.value, movieList, isLoading: false });
  }

  private setFilterTitle(titleSearched: string) {
    this.state.next({ ...this.state.value, titleSearched });
  }

  private setFilterReleaseYear(releaseYearSearched: string) {
    this.state.next({ ...this.state.value, releaseYearSearched });
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
