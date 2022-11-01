import { HttpClient } from '@angular/common/http';
import { ServerResponse } from '@core/models';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  constructor(protected http: HttpClient, protected apiRoot: string) {}

  public get(endPoint: string): Observable<ServerResponse<T[]>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.get<ServerResponse<T[]>>(apiUrl);
  }

  public post(endPoint: string, object: T): Observable<ServerResponse<T>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.post<ServerResponse<T>>(apiUrl, object);
  }

  public put(endPoint: string, object: T): Observable<ServerResponse<T>> {
    const apiUrl = `${this.apiRoot}${endPoint}`;
    return this.http.put<ServerResponse<T>>(apiUrl, object);
  }
}
