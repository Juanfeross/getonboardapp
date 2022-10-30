import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, MatIconModule],
  exports: [PaginationComponent],
})
export class PaginationModule {}
