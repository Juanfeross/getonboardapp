import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerResponse } from '@core/models';
import { BaseService } from '@core/services/base.service';
import { Company } from 'src/app/models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService extends BaseService<Company> {
  constructor(protected override http: HttpClient) {
    super(http, environment.getonbrdApiBaseUrl);
  }

  public search(page?: number): Observable<ServerResponse<Company[]>> {
    let query: string = '?';
    if (!!page && page > 0) {
      query = `${query}page=${page}`;
    }

    return this.get(`/companies${query}`);
  }
}
