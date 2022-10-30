import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<LoginComponent>,
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
  }
}
