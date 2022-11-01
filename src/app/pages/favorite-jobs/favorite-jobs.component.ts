import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/app/user.service';

@Component({
  selector: 'app-favorite-jobs',
  templateUrl: './favorite-jobs.component.html',
  styleUrls: ['./favorite-jobs.component.scss'],
})
export class FavoriteJobsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
