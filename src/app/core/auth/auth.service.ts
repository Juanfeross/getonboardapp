import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/app/user.service';
import { environment } from '@environment/environment';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) {}

  get authenticated$(): Observable<boolean> {
    return this._authenticated$.asObservable();
  }

  set accessToken(token: string) {
    sessionStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return sessionStorage.getItem('accessToken') ?? '';
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated$.value) {
      return throwError('User is already logged in.');
    }

    return this._httpClient
      .post(`${environment.ApiUrl}/auth/login`, credentials)
      .pipe(
        switchMap((response: any) => {
          console.log(response);
          // Store the access token in the session storage
          this.accessToken = response.data.accessToken;

          // Set the authenticated flag to true
          this._authenticated$.next(true);

          // Store the user on the user service
          this._userService.user = response.data.user;

          // Return a new observable with the response
          return of(response);
        })
      );
  }

  loginUsingToken(): Observable<any> {
    // Sign in using the token
    return this._httpClient
      .post(`${environment.ApiUrl}/auth/login`, {
        accessToken: this.accessToken,
      })
      .pipe(
        catchError(() => of(false)),
        switchMap((response: any) => {
          if (response.accessToken) {
            this.accessToken = response.accessToken;
          }

          // Set the authenticated flag to true
          this._authenticated$.next(true);

          // Store the user on the user service
          this._userService.user = response.user;

          // Return true
          return of(true);
        })
      );
  }

  registerUser(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post(`${environment.ApiUrl}/user/register`, user);
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    sessionStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this._authenticated$.next(false);

    this._userService.selectedJobs = [];
    // this._userService.user = {};

    // Return the observable
    return of(true);
  }

  check(): Observable<boolean> {
    console.log(this._authenticated$.value);
    // Check if the user is logged in
    if (this._authenticated$.value) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return this.loginUsingToken();
  }
}
