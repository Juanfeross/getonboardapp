import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@core/auth/auth.service';
import { ConfirmationService } from '@core/confirmation/confirmation.service';
import { UserService } from '@core/user/user.service';
import { take } from 'rxjs';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  alreadyAddedToFavorites: boolean = false;

  constructor(
    public matDialogRef: MatDialogRef<JobDetailsComponent>,
    private _confirmationService: ConfirmationService,
    private _authService: AuthService,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: Job
  ) {}

  ngOnInit(): void {
    this._userService.user$.pipe(take(1)).subscribe((user) => {
      let favoriteJobs = user.favoriteJobs;
      this.alreadyAddedToFavorites = !!this.evaluateFavorites(favoriteJobs);
    });
  }

  addToFavorites(): void {
    this._authService.check().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        //no me gusta un subscribe dentro de otro. Validar fix
        this._userService.user$.pipe(take(1)).subscribe((user) => {
          let favoriteJobs = user.favoriteJobs;
          const alreadyAdded = this.evaluateFavorites(favoriteJobs);

          if (alreadyAdded) {
            this.notifyAlreadyAddedToFavorites();
          } else {
            favoriteJobs.push(this.data);
            const newUser = { ...user, favoriteJobs: favoriteJobs };
            this._userService.user = newUser;
          }
        });
      } else {
        this.notifyLoginRequired();
      }
    });
  }

  private evaluateFavorites(favoriteJobs: Job[]) {
    return favoriteJobs.find((favoriteJob) => favoriteJob.id === this.data.id);
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
