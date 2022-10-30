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
        Validators.minLength(6),
      ]),
    });
  }

  login(): void {
    console.log(this.loginForm.getRawValue());
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
