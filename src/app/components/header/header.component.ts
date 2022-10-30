import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private _matDialog: MatDialog) {}

  ngOnInit() {}

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
}
