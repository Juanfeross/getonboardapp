import { Component, OnInit } from '@angular/core';
import { Meta } from '@core/models';
import { FavoritesService } from '../services/favorites.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/app/user.service';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrls: ['./list-favorites.component.scss']
})
export class ListFavoritesComponent implements OnInit {
  user!: User;
  public jobs: string[] = [];

  constructor(private service: FavoritesService,
    private userAppService: UserService) { }

  ngOnInit(): void {
    this.userAppService.user$.subscribe((user) => {
      if (!!user.id) {
        console.log(user);
        
        this.user = user;
        this.getListJobs(user);
      }
    });

    // this.service.getFavorites();
  }

  public getListJobs(user: User) {
    this.service.getFavorites(user).subscribe({
      next: resp => {
        resp.data.selectedJobs?.forEach(job => {
          this.jobs.push(job.jobId);
        })
      }
    })
  }

}
