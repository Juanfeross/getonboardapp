import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meta } from '@core/models';
import { BaseService } from '@core/services/base.service';
import { Job } from 'src/app/models/job.model';
import { BehaviorSubject, debounceTime, delay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobsService extends BaseService<Job> {
  private bulkLoadSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  bulkJobs: Job[] = [];

  constructor(protected override http: HttpClient) {
    super(http, environment.getonbrdApiBaseUrl);
  }

  public getBulkLoadSubject$() {
    return this.bulkLoadSubject$;
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

  public async getForBulk() {
    // El api no permite cargar un job por id, por lo que genero un bulk para emular.
    let query: string = '?query';
    query = `${query}&page=1`;
    query = `${query}&per_page=100`;
    query = query === '?' ? '' : query;
    this.get(`/search/jobs${query}`).pipe(
      delay(2000)
    ).subscribe({
      next: resp => {
        // console.log('2000');
        resp.data.forEach(data => this.bulkJobs.push(data));
        this.bulkLoadSubject$.next(true);
      }
    });
    
    query = '?query';
    query = `${query}&page=2`;
    query = `${query}&per_page=100`;
    query = query === '?' ? '' : query;
    this.get(`/search/jobs${query}`).pipe(
      delay(3000)
    ).subscribe({
      next: resp => {
        // console.log('3000');
        resp.data.forEach(data => this.bulkJobs.push(data));
        this.bulkLoadSubject$.next(true);
      }
    });

    query = '?query';
    query = `${query}&page=3`;
    query = `${query}&per_page=100`;
    query = query === '?' ? '' : query;
    this.get(`/search/jobs${query}`).pipe(
      delay(7000)
    ).subscribe({
      next: resp => {
        // console.log('7000');
        resp.data.forEach(data => this.bulkJobs.push(data));
        this.bulkLoadSubject$.next(true);
      }
    });

    query = '?query';
    query = `${query}&page=4`;
    query = `${query}&per_page=100`;
    query = query === '?' ? '' : query;
    this.get(`/search/jobs${query}`).pipe(
      delay(8000)
    ).subscribe({
      next: resp => {
        // console.log('8000');
        resp.data.forEach(data => this.bulkJobs.push(data));
        this.bulkLoadSubject$.next(true);
      }
    });

    query = '?query';
    query = `${query}&page=5`;
    query = `${query}&per_page=100`;
    query = query === '?' ? '' : query;
    this.get(`/search/jobs${query}`).pipe(
      delay(9000)
    ).subscribe({
      next: resp => {
        // console.log('9000');
        resp.data.forEach(data => this.bulkJobs.push(data));
        this.bulkLoadSubject$.next(true);
      }
    });

    query = '?query';
    query = `${query}&page=6`;
    query = `${query}&per_page=100`;
    query = query === '?' ? '' : query;
    this.get(`/search/jobs${query}`).pipe(
      delay(10000)
    ).subscribe({
      next: resp => {
        // console.log('10000');
        resp.data.forEach(data => this.bulkJobs.push(data));
        this.bulkLoadSubject$.next(true);
      }
    });

    query = '?query';
    query = `${query}&page=7`;
    query = `${query}&per_page=100`;
    query = query === '?' ? '' : query;
    this.get(`/search/jobs${query}`).pipe(
      delay(11000)
    ).subscribe({
      next: resp => {
        // console.log('11000');
        resp.data.forEach(data => this.bulkJobs.push(data));
        this.bulkLoadSubject$.next(true);
      }
    });

    query = '?query';
    query = `${query}&page=8`;
    query = `${query}&per_page=100`;
    query = query === '?' ? '' : query;
    this.get(`/search/jobs${query}`).pipe(
      delay(4000)
    ).subscribe({
      next: resp => {
        // console.log('4000')
        resp.data.forEach(data => this.bulkJobs.push(data));
        this.bulkLoadSubject$.next(true);
      }
    });

    query = '?query';
    query = `${query}&page=9`;
    query = `${query}&per_page=100`;
    query = query === '?' ? '' : query;
    this.get(`/search/jobs${query}`)
    .pipe(
      delay(5000)
    ).subscribe({
      next: resp => {
        // console.log('5000')
        resp.data.forEach(data => this.bulkJobs.push(data));
        this.bulkLoadSubject$.next(true);
      }
    });

  }

  public getJobById(jobId: string) {
    return this.bulkJobs.find(job => job.id === jobId);
  }

  public searchByCategory(
    categortId: string = '',
    meta: Meta = { page: 1, per_page: 12 }
  ) {
    
    let query: string = '?';
    if (meta.per_page > 0) {
      query = `${query}per_page=${meta.per_page}`;
    }
    if (meta.page > 0) {
      query = `${query}&page=${meta.page}`;
    }
    query = query === '?' ? '' : query;

    // www.getonbrd.com/api/v0/categories/programming/jobs?per_page=1&page=1&expand=["company"]
    return this.get(`/categories/${categortId}/jobs${query}`);
  }

  public searchByCompany(
    companyId: string = '',
    meta: Meta = { page: 1, per_page: 12 }
  ) {
    
    let query: string = '?';
    if (meta.per_page > 0) {
      query = `${query}per_page=${meta.per_page}`;
    }
    if (meta.page > 0) {
      query = `${query}&page=${meta.page}`;
    }
    query = query === '?' ? '' : query;

    // www.getonbrd.com/api/v0/categories/programming/jobs?per_page=1&page=1&expand=["company"]
    return this.get(`/companies/${companyId}/jobs${query}`);
  }
}
