import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, forkJoin, map, Observable, of, OperatorFunction, startWith, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Company } from 'src/app/models/company.model';
import { CategoryService } from 'src/app/services/api/category.service';
import { CompanyService } from 'src/app/services/api/company.service';
import { JobService } from '../services';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  public filtersFrom = new FormGroup({
    searchValue: new FormControl(''),
    category: new FormControl(''),
    company: new FormControl(''),
  });
  public categories: Category[] = [];
  public companies: Company[] = [];
  public tempCategories: Category[] = [];
  public tempCompanies: Company[] = [];
  private onDestroy$ = new Subject<boolean>();
  inputFormatter = (entity: Category) => entity ? entity.attributes.name : '';
  inputCompFormatter = (entity: Company) => entity ? entity.attributes.name : '';
  searching = false;
	searchFailed = false;

  constructor(
    private jobService: JobService,
    private categoryServices: CategoryService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.getDataFilters();
    this.changesFilters();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  onSearchClick() {
    this.filtersFrom.get('category')?.setValue('');
    this.filtersFrom.get('company')?.setValue('');
    this.jobService.findJobs(this.filtersFrom.get('searchValue')!.value!, 1);
  }

  onSelectCategory() {
    this.jobService.findJobsByCategory(this.filtersFrom.get('category')!.value as any as Category);
  }

  onSelectCompany() {
    this.jobService.findJobsByCompany(this.filtersFrom.get('company')!.value as any as Company);
  }

  private getDataFilters() {
    const subscribe = forkJoin([
      this.categoryServices.search(),
      this.companyService.search(),
    ]);
    subscribe.pipe(take(1)).subscribe(([category, company]) => {
      this.categories = category.data;
      this.tempCategories = category.data;
      this.companies = company.data;
      this.tempCompanies = company.data;
      this.filtersFrom.get('category')!.valueChanges.pipe(startWith(''))
    });
  }

  private changesFilters() {
    this.filtersFrom
      .get('category')
      ?.valueChanges.pipe(takeUntil(this.onDestroy$))
      .subscribe((entity) => {
        if ((entity as any).id) {
          return;
        }
        this.tempCategories = this.categories.filter(category =>
          category.attributes.name.toLowerCase().includes((entity ?? '').toLowerCase())
        );
      });
    this.filtersFrom
      .get('company')
      ?.valueChanges.pipe(takeUntil(this.onDestroy$))
      .subscribe((entity) => {
        if ((entity as any).id) {
          return;
        }
        this.tempCompanies = this.companies.filter(company =>
          company.attributes.name.toLowerCase().includes((entity ?? '').toLowerCase())
        );
      });
  }
}
