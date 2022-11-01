import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationService } from '@core/confirmation/confirmation.service';
import { ErrorResponse } from '@core/models/error-response.model';
import { filter, take } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { SelectedJob } from 'src/app/models/selected-job.model';
import { User } from 'src/app/models/user.model';
import { SelectedJobService } from 'src/app/services/api/selected-job.service';
import { UserService } from 'src/app/services/app/user.service';

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
    private _confirmationService: ConfirmationService,
    private _selectedJobService: SelectedJobService,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: Job
  ) {}

  ngOnInit(): void {
    this._userService.selectedJobs$
      .pipe(
        take(1),
        filter((selectedJobs) => selectedJobs.length > 0)
      )
      .subscribe((selectedJobs) => {
        this.alreadyAddedToFavorites =
          !!this.evaluateSelectedJobs(selectedJobs);
        this.selectedJobs = selectedJobs;
      });

    this._userService.user$
      .pipe(
        take(1),
        filter((user) => !!user.id)
      )
      .subscribe((user) => {
        console.log(user);
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
      this._selectedJobService.add(this.user.id, [selectedJob]).subscribe(
        (response) => {
          console.log(response);
          this._userService.selectedJobs = [...this.selectedJobs, selectedJob];
          this.alreadyAddedToFavorites = true;
        },
        (error: ErrorResponse) => {
          console.error(error);
          this._confirmationService.open({
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
    this._confirmationService.open({
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
