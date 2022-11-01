import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/api/login.service';
import { UserService as userApiService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/app/auth.service';
import { UserService as userAppService } from 'src/app/services/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerNgForm') registerNgForm!: NgForm;
  registerForm!: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<RegisterComponent>,
    private userAppService: userAppService,
    private userApiService: userApiService,
    private loginService: LoginService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
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

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.disable();

    const register = this.registerForm.value;

    this.userApiService.register('/user/register', register).subscribe(
      () => {
        this.loginService
          .login('/auth/login', {
            email: register.email,
            password: register.password,
          })
          .subscribe(
            (LoginResponse) => {
              if (LoginResponse.data && LoginResponse.data.user) {
                this.authService.authenticate(LoginResponse.data);
                this.userAppService.user = LoginResponse.data.user;
              }
              this.matDialogRef.close();
            },
            (error) => {
              this.openSnackBar(error.error.message);
            }
          );
        this.matDialogRef.close();
      },
      (error) => {
        this.openSnackBar(error.error.message);
        this.registerForm.enable();
        this.registerNgForm.resetForm();
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['red-snackbar'],
    });
  }
}
