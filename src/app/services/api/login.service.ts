import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from '@core/models';
import { BaseService } from '@core/services/base.service';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService extends BaseService<Login> {
  constructor(protected override http: HttpClient) {
    super(http, environment.ApiUrl);
  }

  public login(
    endPoint: string,
    object: Login
  ): Observable<ResponseData<Login>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.post<ResponseData<Login>>(apiUrl, object);
  }

  public refreshToken(
    endPoint: string,
    header?: HttpHeaders
  ): Observable<ResponseData<Login>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.get<ResponseData<Login>>(apiUrl, { headers: header });
  }
}
