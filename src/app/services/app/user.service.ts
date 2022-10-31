import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { SelectedJob } from 'src/app/models/selected-job.model';
import { User } from 'src/app/models/user.model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
  private _selectedJobs: ReplaySubject<SelectedJob[]> = new ReplaySubject<
    SelectedJob[]
  >(1);

  constructor(private sessionStorage: SessionStorageService) {}

  set user(value: User) {
    this.sessionStorage.setItem('user', value);
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  public setUser(user: User) {
    this.sessionStorage.setItem('user', user);
    this._user.next(user);
  }

  set selectedJobs(value: SelectedJob[]) {
    this._selectedJobs.next(value);
  }

  get selectedJobs$(): Observable<SelectedJob[]> {
    return this._selectedJobs.asObservable();
  }
}
