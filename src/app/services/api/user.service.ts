import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from '@core/models';
import { BaseService } from '@core/services/base.service';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { Register } from 'src/app/models/register.model';
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
}
