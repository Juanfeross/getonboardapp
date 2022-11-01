import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from '@core/models';
import { BaseService } from '@core/services/base.service';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { Register } from 'src/app/models/register.model';
import { SelectedJobRequest } from 'src/app/models/selected-job-request.model';
import { SelectedJob } from 'src/app/models/selected-job.model';
import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService<Register> {
  constructor(protected override http: HttpClient) {
    super(http, environment.ApiUrl);
  }

  public register(
    endPoint: string,
    object: Register
  ): Observable<ResponseData<User>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.post<ResponseData<User>>(apiUrl, object);
  }

  public jobs(endPoint: string): Observable<ResponseData<User>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.get<ResponseData<User>>(apiUrl);
  }

  public addJob(
    endPoint: string,
    object: SelectedJobRequest
  ): Observable<ResponseData<User>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.put<ResponseData<User>>(apiUrl, object);
  }

  public removeJob(
    endPoint: string,
    object: SelectedJobRequest
  ): Observable<ResponseData<User>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.put<ResponseData<User>>(apiUrl, object);
  }
}
