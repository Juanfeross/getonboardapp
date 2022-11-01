import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/register/register.component';
import { AuthService } from 'src/app/services/app/auth.service';
import { UserService } from 'src/app/services/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated$: Observable<boolean> | undefined;
  private subscription!: Subscription;
  userName: string = '';

  constructor(
    private _router: Router,
    private _matDialog: MatDialog,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this._authService.authenticated$;
    this.subscription = this._userService.user$.subscribe({
      next: resp => {
        const user = resp;
        this.userName = `${user.name} ${user.lastName}`;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    });
  }

  logout() {
    this._router.navigate(['']);
    this._authService.signOut();
  }

  public onToggleSidenav = () => {}
}
