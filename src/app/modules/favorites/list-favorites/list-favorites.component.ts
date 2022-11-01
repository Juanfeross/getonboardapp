import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/app/user.service';
import { JobsService } from 'src/app/services/api';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsComponent } from '../../jobs/job-details/job-details.component';
import { Job } from 'src/app/models/job.model';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrls: ['./list-favorites.component.scss']
})
export class ListFavoritesComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new Subject<boolean>();
  private subscription!: Subscription;
  private userSubscription!: Subscription;
  private user!: User;
  public jobs: IJob[] = [];

  constructor(private service: FavoritesService,
    private userAppService: UserService,
    private jobsService: JobsService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.userSubscription = this.userAppService.user$.subscribe((user) => {
      if (!!user.id) {
        this.user = user;
        this.getListJobs(user);
      }
    });

    this.subscription = this.jobsService.getBulkLoadSubject$().subscribe({
      next: resp => {
        if (resp) {
          this.jobs.forEach(job => {
            const jobObj = this.jobsService.getJobById(job.id);
            job.title = jobObj?.attributes.title ?? job.id;
          })
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  public getListJobs(user: User) {
    this.service.getFavorites(user).subscribe({
      next: resp => {
        resp.data.selectedJobs?.forEach(job => {
          const jobObj = this.jobsService.getJobById(job.jobId);
          const newJob: IJob = {
            id: job.jobId,
            title: jobObj?.attributes.title ?? job.jobId
          }
          this.jobs.push(newJob);
        })
      }
    })
  }

  public removeFromFavorites(job: IJob) {
    this.service.removeFromFavorites(this.user, job.id).subscribe({
      next: resp => {
        const indx = this.jobs.findIndex(pred => pred.id === job.id);
        this.jobs.splice(indx, 1);
      }
    });
  }

  public showJobDetailsDialog(job: IJob) {
    const jobObj = this.jobsService.getJobById(job.id);
    const dialogRef = this.matDialog.open(JobDetailsComponent, {
      data: jobObj,
      width: '700px',
      height: 'auto',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        if (!response) {
          return;
        }
      });
  }

}

interface IJob {
  id: string,
  title: string
}
