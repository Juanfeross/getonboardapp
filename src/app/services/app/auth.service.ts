import { Injectable } from '@angular/core';
import { Login } from '@core/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { JwtService } from './jwt.service';
import { SessionStorageService } from './session-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private sessionStorage: SessionStorageService,
    private userService: UserService,
    private jwt: JwtService
  ) {}

  get authenticated$(): Observable<boolean> {
    return this._authenticated$.asObservable();
  }

  public validateAuthentication() {
    const auth = this.sessionStorage.getItemString('accessToken');
    const user = this.sessionStorage.getItemJSON('user');
    const isAuthenticated = !this.jwt.getTokenExpired(auth);

    if (!isAuthenticated) {
      this.signOut();
    } else {
      this.userService.user = user;
    }
    this._authenticated$.next(isAuthenticated);
  }

  public signOut() {
    this.userService.user = <User>{};
    this.userService.selectedJobs = [];
    this.sessionStorage.clear();
    this._authenticated$.next(false);
  }

  public authenticate(login: Login) {
    this.sessionStorage.setItem('accessToken', login.accessToken);
    this._authenticated$.next(true);
  }
}
