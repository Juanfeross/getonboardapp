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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerNgForm') registerNgForm!: NgForm;
  registerForm!: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<RegisterComponent>,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
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

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.disable();

    const register = this.registerForm.value;

    this._authService.registerUser(this.registerForm.value).subscribe(
      (registerResponse) => {
        console.log(registerResponse);

        // Hay que corregir este subrscription dentro de subscription. Alguna idea?
        this._authService
          .loginUser({ email: register.email, password: register.password })
          .subscribe(
            (LoginResponse) => {
              console.log(LoginResponse);
              this.matDialogRef.close();
            },
            (error) => {
              console.log(error);
            }
          );
        this.matDialogRef.close();
      },
      (error) => {
        console.log(error);
        this.registerForm.enable();
        this.registerNgForm.resetForm();
      }
    );
  }
}
