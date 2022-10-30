import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  constructor(
    public matDialogRef: MatDialogRef<JobDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job
  ) {
    console.log(data);
  }

  ngOnInit(): void {}

  addToFavorites(): void {}
}
