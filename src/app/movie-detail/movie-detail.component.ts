import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie.model';
import { Observable, of } from 'rxjs';
import { BudgetPipe } from '../budget.pipe';
import { DurationPipe } from '../duration.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, BudgetPipe, DurationPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly moviesService = inject(MoviesService);
  movie$!: Observable<Movie>;

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('movieId');

    /* If movieId was not provided by the router, we redirect user to the movies list page. */
    if (!movieId) {
      this.router.navigate(['/movies']);
      return;
    }

    this.movie$ = this.moviesService.getMovieById(movieId);
  }
}
