import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { SelectedJob } from 'src/app/models/selected-job.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User | undefined> = new ReplaySubject<
    User | undefined
  >(1);
  private _selectedJobs: ReplaySubject<SelectedJob[]> = new ReplaySubject<
    SelectedJob[]
  >(1);

  constructor() {}

  set user(value: User | undefined) {
    this._user.next(value);
  }

  get user$(): Observable<User | undefined> {
    return this._user.asObservable();
  }

  set selectedJobs(value: SelectedJob[]) {
    this._selectedJobs.next(value);
  }

  get selectedJobs$(): Observable<SelectedJob[]> {
    return this._selectedJobs.asObservable();
  }
}
