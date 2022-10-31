import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewJobsComponent } from './view-jobs.component';
import { JobsModule } from 'src/app/modules/jobs/jobs.module';
import { ViewJobsRoutingModule } from './view-jobs-routing.module';

@NgModule({
  imports: [CommonModule, ViewJobsRoutingModule, JobsModule],

  declarations: [ViewJobsComponent],
})
export class ViewJobsModule {}
