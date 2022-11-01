import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavoritesModule } from 'src/app/modules/favorites/favorites.module';

import { FavoriteJobsRoutingModule } from './favorite-jobs-routing.module';
import { FavoriteJobsComponent } from './favorite-jobs.component';

@NgModule({
  declarations: [FavoriteJobsComponent],
  imports: [CommonModule, FavoriteJobsRoutingModule, FavoritesModule],
})
export class FavoriteJobsModule {}
