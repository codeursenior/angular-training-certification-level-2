import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from './movies.service';
import { Movie } from './movie.model';
import { DurationPipe } from './duration.pipe';
import { BudgetPipe } from './budget.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DurationPipe, BudgetPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  readonly #moviesService = inject(MoviesService);
  movieList: Movie[] = [];

  ngOnInit() {
    this.#moviesService
      .getMovieList()
      .subscribe((value) => (this.movieList = value));
  }
}
