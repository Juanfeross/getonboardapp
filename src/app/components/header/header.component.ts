import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/register/register.component';
import { AuthService } from 'src/app/services/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean> | undefined;

  constructor(
    private _router: Router,
    private _matDialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this._authService.authenticated$;
  }

  showLoginDialog() {
    const dialogRef = this._matDialog.open(LoginComponent, {
      width: '400px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) {
        return;
      }

      console.log(response);
    });
  }

  showRegisterDialog() {
    const dialogRef = this._matDialog.open(RegisterComponent, {
      width: '400px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) {
        return;
      }

      console.log(response);
    });
  }

  logout() {
    this._router.navigate(['']);
    this._authService.signOut();
  }
}
