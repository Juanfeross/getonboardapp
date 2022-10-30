import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationModule } from '@shared/pagination/pagination.module';
import { FiltersComponent } from './filters/filters.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ListJobsComponent } from './list-jobs/list-jobs.component';

@NgModule({
  declarations: [FiltersComponent, ListJobsComponent, JobDetailsComponent],
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
  exports: [FiltersComponent, ListJobsComponent],
})
export class JobsModule {}
