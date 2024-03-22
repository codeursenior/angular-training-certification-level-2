import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MoviesFacade } from '../movies.facade';
import { DurationPipe } from '../duration.pipe';
import { BudgetPipe } from '../budget.pipe';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, DurationPipe, BudgetPipe, AsyncPipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit {
  readonly facade = inject(MoviesFacade);

  ngOnInit() {
    this.facade.loadMovieList();
  }
}
