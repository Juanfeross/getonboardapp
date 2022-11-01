import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meta } from '@core/models';
import { BaseService } from '@core/services/base.service';
import { Job } from 'src/app/models/job.model';

@Injectable({ providedIn: 'root' })
export class JobsService extends BaseService<Job> {
  constructor(protected override http: HttpClient) {
    super(http, environment.getonbrdApiBaseUrl);
  }

  public search(
    data: string = '',
    meta: Meta = { page: 1, per_page: 12 }
  ) {
    
    let query: string = '?query';
    if (!!data && data.length > 0) {
      query = `${query}=${data}`;
    }
    if (meta.page > 0) {
      query = `${query}&page=${meta.page}`;
    }
    if (meta.per_page > 0) {
      query = `${query}&per_page=${meta.per_page}`;
    }
    query = query === '?' ? '' : query;

    // let query2: string = `?query=${data}&per_page=${meta.per_page}&page=${meta.page}`;
    return this.get(`/search/jobs${query}`);
  }
}
