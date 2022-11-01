import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFavoritesComponent } from './list-favorites/list-favorites.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationModule } from '@shared/pagination/pagination.module';



@NgModule({
  declarations: [
    ListFavoritesComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    PaginationModule,
    MatDialogModule,
  ],
  exports: [
    ListFavoritesComponent
  ]
})
export class FavoritesModule { }
