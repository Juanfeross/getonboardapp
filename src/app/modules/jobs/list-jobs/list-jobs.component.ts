import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from '@core/confirmation/confirmation.service';
import { IPagination, Meta } from '@core/models';
import { UserService } from 'src/app/services/app/user.service';
import { Subject, takeUntil } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { User } from 'src/app/models/user.model';
import { JobsService } from 'src/app/services/api/jobs.service';
import { SelectedJobService } from 'src/app/services/api/selected-job.service';
import { JobDetailsComponent } from '../job-details/job-details.component';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new Subject<boolean>();

  public jobs: Job[] = [];
  public pagination?: Meta;
  private user?: User;
  constructor(
    private jobsService: JobsService,
    private _matDialog: MatDialog,
    private _selectedJobService: SelectedJobService,
    private _userService: UserService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getListJobs(1);
    this.getUser();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  private getUser() {
    this._userService.user$.pipe(takeUntil(this.onDestroy$)).subscribe((x) => {
      console.log(x);
      this.user = x;
    });
  }

  public getListJobs(page: number) {
    this.jobsService
      .search()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((x) => {
        this.jobs = x.data;
        this.pagination = x.meta;
      });
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
    console.log(this.user);
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
