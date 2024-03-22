import { Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';

export const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:movieId', component: MovieDetailComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: '**', component: MovieListComponent },
];
