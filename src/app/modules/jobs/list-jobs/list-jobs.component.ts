import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from '@core/confirmation/confirmation.service';
import { IPagination, Meta } from '@core/models';
import { UserService } from 'src/app/services/app/user.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { User } from 'src/app/models/user.model';
import { SelectedJobService } from 'src/app/services/api/selected-job.service';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { JobService } from '../services';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new Subject<boolean>();
  private subscription!: Subscription;
  private paginationSub!: Subscription;

  public jobs: Job[] = [];
  public pagination?: Meta;
  private user?: User;
  constructor(
    private jobService: JobService,
    private _matDialog: MatDialog,
    private _selectedJobService: SelectedJobService,
    private _userService: UserService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.jobService.findJobs('');

    this.subscription = this.jobService.getSearchingSubject().subscribe({
      next: (result) => {
        if (result.searching) {
          // this.spinner.show();
        } else {
          // this.spinner.hide();
          this.jobs = result.entityList;
        }
      }
    });
    
    this.paginationSub = this.jobService.getPaginationSubject().subscribe({
      next: (result) => {
        this.pagination = result;
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
    this.subscription.unsubscribe();
  }

  private getUser() {
    this._userService.user$.subscribe((x) => {
      console.log(x);
      this.user = x;
    });
  }

  public getListJobs(page: number) {
    this.jobService.pageChange(page);
    // this.jobService.search('', { page: page, per_page: 12 })
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe((x) => {
    //     this.jobs = x.data;
    //     this.pagination = x.meta;
    //   });
  }

  public showJobDetailsDialog(job: Job) {
    const dialogRef = this._matDialog.open(JobDetailsComponent, {
      data: job,
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
        console.log(response);
      });
  }

  public addJobToUser(job: Job) {
    console.log(job, this.user);
    if (this.user) {
      this._selectedJobService
        .add(this.user.id, [{ id: 0, jobId: job.id }])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((x) => {
          console.log(x);
        });
    } else {
      this.notifyLoginRequired();
    }
  }

  private notifyLoginRequired() {
    this._confirmationService.open({
      title: '¿Tienes un usuario registrado?',
      message:
        '¡Es necesario ingresar con un usuario registrado para poder agregar las propuestas de trabajo a favoritos!',
      actions: {
        confirm: {
          show: true,
          label: 'Aceptar',
        },
      },
    });
  }
}
