import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@core/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { SelectedJobService } from 'src/app/services/api/selected-job.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginNgForm') loginNgForm!: NgForm;
  loginForm!: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<LoginComponent>,
    private _selectedJobs: SelectedJobService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginForm.disable();

    this._authService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        this.matDialogRef.close();
      },
      (error) => {
        console.log(error);
        this.loginForm.enable();
        this.loginNgForm.resetForm();
      }
    );
  }
}
