import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPagination, Meta } from '@core/models';
import { Job } from 'src/app/models/job.model';
import { JobsService } from 'src/app/services/api/jobs.service';
import { JobDetailsComponent } from '../job-details/job-details.component';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent implements OnInit {
  public jobs: Job[] = [];
  public pagination?: Meta;
  constructor(
    private jobsService: JobsService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getListJobs(1);
  }

  public getListJobs(page: number) {
    this.jobsService.search().subscribe((x) => {
      this.jobs = x.data;
      this.pagination = x.meta;
      console.log(x);
    });
  }

  public showJobDetailsDialog(job: Job) {
    const dialogRef = this._matDialog.open(JobDetailsComponent, {
      data: job,
      width: '700px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) {
        return;
      }

      console.log(response);
    });
  }
}
