import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteJobsComponent } from './favorite-jobs.component';

const routes: Routes = [{ path: '', component: FavoriteJobsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteJobsRoutingModule {}
