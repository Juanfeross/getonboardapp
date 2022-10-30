import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerResponse } from '@core/models';
import { BaseService } from '@core/services/base.service';
import { Job } from 'src/app/models/job.model';

@Injectable({ providedIn: 'root' })
export class JobsService extends BaseService<Job> {
  constructor(protected override http: HttpClient) {
    super(http, environment.getonbrdApiBaseUrl);
  }

  public search(
    data: string = 'a',
    page: number = 1,
    per_page: number = 12
  ): Observable<ServerResponse<Job[]>> {
    let query: string = `?query=${data}&per_page=${per_page}&page=${page}`;
    return this.get(`/search/jobs${query}`);
  }
}
