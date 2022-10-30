import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FavoriteJobsRoutingModule } from './favorite-jobs-routing.module';
import { FavoriteJobsComponent } from './favorite-jobs.component';

@NgModule({
  declarations: [FavoriteJobsComponent],
  imports: [CommonModule, FavoriteJobsRoutingModule],
})
export class FavoriteJobsModule {}
