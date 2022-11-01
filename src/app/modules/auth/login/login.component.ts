import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/api/login.service';
import { AuthService } from 'src/app/services/app/auth.service';
import { UserService } from 'src/app/services/app/user.service';

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
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
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
    this.loginService.login('/auth/login', this.loginForm.value).subscribe({
      next: (response) => {
        if (response.data && response.data.user) {
          this.authService.authenticate(response.data);
          this.userService.user = response.data.user;
        }
        this.matDialogRef.close();
      },
      error: () => {
        this.loginForm.enable();
        this.loginNgForm.resetForm();
      },
    });
  }
}
