import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { SelectedJob } from 'src/app/models/selected-job.model';

@Injectable({
  providedIn: 'root',
})
export class SelectedJobService {
  constructor(protected _httpClient: HttpClient) {}

  public add(userId: number, selectedJobs: SelectedJob[]): Observable<any> {
    return this._httpClient.put(`${environment.ApiUrl}/user/${userId}/addjob`, {
      id: userId,
      selectedJobs: selectedJobs,
    });
  }

  public get(userId: number): Observable<any> {
    return this._httpClient.get(`${environment.ApiUrl}/user/${userId}/job`);
  }
}
