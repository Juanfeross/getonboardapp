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
import { LoginService } from '../api/login.service';
import { SessionStorageService } from './session-storage.service';
import { JwtService } from './jwt.service';
import { Login } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private sessionStorage: SessionStorageService,
    private jwt: JwtService
  ) {}

  get authenticated$(): Observable<boolean> {
    return this._authenticated$.asObservable();
  }

  public validateAuthentication() {
    const auth = this.sessionStorage.getItemString('accessToken');
    const isAuthenticated = !this.jwt.getTokenExpired(auth);
    this._authenticated$.next(isAuthenticated);
  }

  public signOut() {
    this.sessionStorage.clear();
    this._authenticated$.next(false);
  }

  public authenticate(login: Login) {
    this.sessionStorage.setItem('accessToken', login.accessToken);
    this._authenticated$.next(true);
  }
}
