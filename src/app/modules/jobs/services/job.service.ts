import { Injectable } from '@angular/core';
import { Meta, SearchingEntity } from '@core/models';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Company } from 'src/app/models/company.model';
import { Job } from 'src/app/models/job.model';
import { CategoryService, JobsService as JobsApiService } from 'src/app/services/api';

@Injectable({providedIn: 'root'})
export class JobService {
  private searchingSubject$: BehaviorSubject<SearchingEntity<Job>> = 
        new BehaviorSubject<SearchingEntity<Job>>(new SearchingEntity<Job>());
  public pagination: Meta = {
    page: 1,
    per_page: 12,
    total_pages: 0,
  };
  private paginationSubject$: BehaviorSubject<Meta> = new BehaviorSubject<Meta>(this.pagination!);
  private searchedString: string = '';
  private selectedCategory: Category | undefined;
  private selectedCompany: Company | undefined;

  constructor(private backend: JobsApiService) { }

  public getSearchingSubject() {
    return this.searchingSubject$;
  }

  public getPaginationSubject() {
    return this.paginationSubject$;
  }
  
  public findJobs(query: string, page?: number): void {
    this.selectedCategory = undefined;
    this.selectedCompany = undefined;
    this.searchedString = query;
    this.searchingSubject$.next(new SearchingEntity<Job>().init());
    
    let thePage: number = page!;
    if (!page) {
      thePage = this.pagination?.page!
    }

    this.backend.search(query, { page: thePage, per_page: 12 }).subscribe({
      next: (response) => {
        this.pagination = response.meta;
        this.paginationSubject$.next(this.pagination);
        this.searchingSubject$.next(new SearchingEntity<Job>().end(response.data));
      },
      error: (error: any) => {
        this.searchingSubject$.next(new SearchingEntity<Job>().end([]));
        alert(error);
      }
    });
  }

  public findJobsByCategory(category: Category, page?: number) {
    this.selectedCategory = category;
    this.selectedCompany = undefined;
    this.searchingSubject$.next(new SearchingEntity<Job>().init());
    
    let thePage: number = page!;
    if (!page) {
      thePage = this.pagination?.page!
    }

    this.backend.searchByCategory(category.id, { page: thePage, per_page: 12 }).subscribe({
      next: (response) => {
        this.pagination = response.meta;
        this.paginationSubject$.next(this.pagination);
        this.searchingSubject$.next(new SearchingEntity<Job>().end(response.data));
      },
      error: (error: any) => {
        this.searchingSubject$.next(new SearchingEntity<Job>().end([]));
        alert(error);
      }
    });
  }

  public findJobsByCompany(company: Company, page?: number) {
    this.selectedCompany = company;
    this.selectedCategory = undefined;
    this.searchingSubject$.next(new SearchingEntity<Job>().init());
    
    let thePage: number = page!;
    if (!page) {
      thePage = this.pagination?.page!
    }

    this.backend.searchByCompany(company.id, { page: thePage, per_page: 12 }).subscribe({
      next: (response) => {
        this.pagination = response.meta;
        this.paginationSubject$.next(this.pagination);
        this.searchingSubject$.next(new SearchingEntity<Job>().end(response.data));
      },
      error: (error: any) => {
        this.searchingSubject$.next(new SearchingEntity<Job>().end([]));
        alert(error);
      }
    });
  }

  public pageChange(page: number) {
    this.pagination!.page = page;
    if (this.selectedCategory) {
      this.findJobsByCategory(this.selectedCategory);
    } if (this.selectedCompany) {
      this.findJobsByCompany(this.selectedCompany);
    } else {
      this.findJobs(this.searchedString);
    }
  }
}
