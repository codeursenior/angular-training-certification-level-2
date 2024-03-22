import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DurationPipe } from './duration.pipe';
import { BudgetPipe } from './budget.pipe';
import { MoviesFacade } from './movies.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DurationPipe, BudgetPipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  readonly moviesFacade = inject(MoviesFacade);

  ngOnInit() {
    this.moviesFacade.loadMovieList();
  }
}
