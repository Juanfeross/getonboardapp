import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobsService } from 'src/app/services/api/jobs.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent implements OnInit {
  public jobs: Job[] = [];
  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.jobsService.search().subscribe((x) => {
      this.jobs = x.data;
      console.log(x, this.jobs);
    });
  }
}
