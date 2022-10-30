import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerResponse } from '@core/models';

export abstract class BaseService<T> {
  constructor(protected http: HttpClient, protected apiRoot: string) {}

  public get(endPoint: string): Observable<ServerResponse<T[]>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.get<ServerResponse<T[]>>(apiUrl);
  }
}
