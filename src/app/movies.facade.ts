import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';

type MovieState = {
  movieList: Movie[];
  searchedTitle: string;
  searchedReleaseYear: string;
  isLoading: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class MoviesFacade {
  private readonly moviesService = inject(MoviesService);
  private readonly initialState: MovieState = {
    movieList: [],
    isLoading: false,
    searchedTitle: '',
    searchedReleaseYear: '',
  };
  private readonly state = new BehaviorSubject<MovieState>(this.initialState);
  private readonly state$ = this.state.asObservable();

  /* Selectors */
  searchedMovieList$ = this.state$.pipe(
    map((state: MovieState) => {
      const title = state.searchedTitle.trim().toLowerCase();
      const releaseYear = +state.searchedReleaseYear.trim();

      /* When there isn't search criteria, we display the whole movie list. */
      if (!title && !releaseYear) {
        return state.movieList;
      }

      let searchedMovieList = state.movieList;

      if (title) {
        searchedMovieList = searchedMovieList.filter((movie) =>
          movie.title.trim().toLowerCase().includes(title)
        );
      }

      if (releaseYear) {
        searchedMovieList = searchedMovieList.filter(
          (movie) => new Date(movie.release_date).getFullYear() === releaseYear
        );
      }

      return searchedMovieList;
    })
  );

  /* Actions */
  updateSearchedTitle(event: Event): void {
    const title = (event.target as HTMLInputElement).value;
    this.setSearchedTitle(title);
  }

  updateSearchedRealeaseYear(event: Event): void {
    const releaseYear = (event.target as HTMLInputElement).value;
    this.setSearchedReleaseYear(releaseYear);
  }

  /* Reducers */
  private setMovieList(movieList: Movie[]) {
    this.state.next({ ...this.state.value, movieList, isLoading: false });
  }

  private setSearchedTitle(searchedTitle: string) {
    this.state.next({ ...this.state.value, searchedTitle });
  }

  private setSearchedReleaseYear(searchedReleaseYear: string) {
    this.state.next({ ...this.state.value, searchedReleaseYear });
  }

  private resetState() {
    this.state.next(this.initialState);
  }

  /* Side Effects */
  loadMovieList(): void {
    this.moviesService
      .getMovieList()
      .pipe(tap(() => this.resetState()))
      .subscribe((value) => this.setMovieList(value));
  }
}
