import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meta, ServerResponse } from '@core/models';
import { BaseService } from '@core/services/base.service';
import { Job } from 'src/app/models/job.model';

@Injectable({ providedIn: 'root' })
export class JobsService extends BaseService<Job> {
  constructor(protected override http: HttpClient) {
    super(http, environment.getonbrdApiBaseUrl);
  }

  public search(
    data: string = 'a',
    meta: Meta = { page: 1, per_page: 12 }
  ): Observable<ServerResponse<Job[]>> {
    let query: string = `?query=${data}&per_page=${meta.per_page}&page=${meta.page}`;
    return this.get(`/search/jobs${query}`);
  }
}
