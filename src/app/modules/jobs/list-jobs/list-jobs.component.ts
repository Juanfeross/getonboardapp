import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from '@core/confirmation/confirmation.service';
import { Meta } from '@core/models';
import { SearchingEntity } from '@core/models/searching-entity.model';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { SelectedJobRequest } from 'src/app/models/selected-job-request.model';
import { SelectedJob } from 'src/app/models/selected-job.model';
import { User } from 'src/app/models/user.model';
import { UserService as UserApiService } from 'src/app/services/api/user.service';
import { UserService as UserAppService } from 'src/app/services/app/user.service';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { JobService } from '../services';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
})
export class ListJobsComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new Subject<boolean>();

  public jobs: Job[] = [];
  public pagination: Meta = {
    page: 1,
    per_page: 12,
    total_pages: 0,
  };
  private user$!: Observable<User>;
  private selectedJobs$!: Observable<SelectedJob[]>;
  private jobs$!: Observable<SearchingEntity<Job>>;

  constructor(
    private userApiService: UserApiService,
    private jobService: JobService,
    private matDialog: MatDialog,
    private userAppService: UserAppService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userAppService.user$.pipe(
      takeUntil(this.onDestroy$)
      // filter((user) => !!user.id)
    );
    this.selectedJobs$ = this.userAppService.selectedJobs$.pipe(
      takeUntil(this.onDestroy$)
    );
    this.user$.subscribe((user) => {
      if (!!user.id) this.getJobs(user.id);
    });
    this.jobService.findJobs('');

    this.jobs$ = this.jobService
      .getSearchingSubject()
      .pipe(takeUntil(this.onDestroy$));

    combineLatest([this.jobs$, this.selectedJobs$]).subscribe(
      ([jobs, selectedJobs]) => {
        if (jobs.searching) {
          // this.spinner.show();
        } else {
          // this.spinner.hide();
          if (selectedJobs.length > 0) {
            this.jobs = jobs.entityList.reduce((jobs: Job[], job: any) => {
              const selected = selectedJobs.find(
                (selectedJob) => selectedJob.jobId === job.id
              );
              const selectedJob: Job = { ...job, selectedByUser: !!selected };
              jobs.push(selectedJob);
              return jobs;
            }, []);
          } else {
            this.jobs = jobs.entityList;
          }
        }
      }
    );

    this.jobService
      .getPaginationSubject()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (result) => {
          this.pagination = result;
        },
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  private getJobs(userId: number) {
    this.userApiService
      .jobs(`/user/${userId}/job`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((response) => {
        if (response.data.selectedJobs) {
          this.userAppService.selectedJobs = response.data.selectedJobs;
        }
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
    const dialogRef = this.matDialog.open(JobDetailsComponent, {
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
      });
  }

  public addToFavorites(job: Job) {
    this.user$.subscribe((user) => {
      if (!!!user.id) {
        this.notifyLoginRequired();
      } else {
        const selectedJob: SelectedJob = { id: 0, jobId: job.id };
        const selectedJobRequest: SelectedJobRequest = {
          id: user.id,
          selectedJobs: [selectedJob],
        };
        this.userApiService
          .addJob(`/user/${user.id}/addjob`, selectedJobRequest)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe((response) => {
            if (response.data.selectedJobs)
              this.userAppService.selectedJobs = response.data.selectedJobs;
          });
      }
    });
  }

  private notifyLoginRequired() {
    this.confirmationService.open({
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
