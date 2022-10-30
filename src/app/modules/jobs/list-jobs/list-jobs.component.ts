import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent implements OnInit {
  public jobs: Job[] = [];
  constructor() {}

  ngOnInit(): void {}
}
