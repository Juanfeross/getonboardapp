import { Component, OnInit } from '@angular/core';
import { IPagination, Meta } from '@core/models';
import { Job } from 'src/app/models/job.model';
import { JobsService } from 'src/app/services/api/jobs.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent implements OnInit {
  public jobs: Job[] = [];
  public pagination?: Meta;
  constructor(private jobsService: JobsService) {}

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
}
