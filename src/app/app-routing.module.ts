import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./pages/view-jobs/view-jobs.module').then(
        (m) => m.ViewJobsModule
      ),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./pages/favorite-jobs/favorite-jobs.module').then(
        (m) => m.FavoriteJobsModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
