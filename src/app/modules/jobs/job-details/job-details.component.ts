import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationService } from '@core/confirmation/confirmation.service';
import { ErrorResponse } from '@core/models/error-response.model';
import { filter, take } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { SelectedJobRequest } from 'src/app/models/selected-job-request.model';
import { SelectedJob } from 'src/app/models/selected-job.model';
import { User } from 'src/app/models/user.model';
import { UserService as UserApiService } from 'src/app/services/api/user.service';
import { UserService as UserAppService } from 'src/app/services/app/user.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  alreadyAddedToFavorites: boolean = false;
  selectedJobs: SelectedJob[] = [];
  user: User | undefined;

  constructor(
    public matDialogRef: MatDialogRef<JobDetailsComponent>,
    private confirmationService: ConfirmationService,
    private userAppService: UserAppService,
    private userApiService: UserApiService,
    @Inject(MAT_DIALOG_DATA) public data: Job
  ) {}

  ngOnInit(): void {
    this.userAppService.selectedJobs$
      .pipe(
        take(1),
        filter((selectedJobs) => selectedJobs.length > 0)
      )
      .subscribe((selectedJobs) => {
        this.alreadyAddedToFavorites =
          !!this.evaluateSelectedJobs(selectedJobs);
        this.selectedJobs = selectedJobs;
      });

    this.userAppService.user$
      .pipe(
        take(1),
        filter((user) => !!user.id)
      )
      .subscribe((user) => {
        this.user = user;
      });
  }

  addToFavorites(): void {
    if (!this.user) {
      this.notifyLoginRequired();
      return;
    }

    const alreadyAdded = this.evaluateSelectedJobs(this.selectedJobs);

    if (alreadyAdded) {
      this.notifyAlreadyAddedToFavorites();
    } else {
      const selectedJob: SelectedJob = { id: 0, jobId: this.data.id };
      const selectedJobRequest: SelectedJobRequest = {
        id: this.user.id,
        selectedJobs: [selectedJob],
      };
      this.userApiService
        .addJob(`/user/${this.user.id}/addjob`, selectedJobRequest)
        .subscribe(
          (response) => {
            if (response.data.selectedJobs) {
              this.userAppService.selectedJobs = response.data.selectedJobs;
              this.alreadyAddedToFavorites = true;
            }
          },
          (error: ErrorResponse) => {
            console.error(error);
            this.confirmationService.open({
              title: `${error.error} - ${error.statusCode}`,
              message: error.message,
              actions: {
                confirm: {
                  show: true,
                  label: 'Aceptar',
                },
              },
            });
          }
        );
    }
  }

  private evaluateSelectedJobs(selectedJobs: SelectedJob[]) {
    return selectedJobs.find(
      (selectedJob) => selectedJob.jobId === this.data.id
    );
  }

  private notifyAlreadyAddedToFavorites() {
    this.confirmationService.open({
      title: '¡Atención!',
      message:
        'Esta propuesta de trabajo ya se agregó a favoritos previamente.',
      actions: {
        confirm: {
          show: true,
          label: 'Aceptar',
        },
      },
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
