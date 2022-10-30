import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin, map, startWith, Subject, take, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Company } from 'src/app/models/company.model';
import { CategoryService } from 'src/app/services/api/category.service';
import { CompanyService } from 'src/app/services/api/company.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  public filtersFrom = new FormGroup({
    category: new FormControl(''),
    company: new FormControl(''),
  });
  public categories: Category[] = [];
  public companies: Company[] = [];
  public tempCategories: Category[] = [];
  public tempCompanies: Company[] = [];
  private onDestroy$ = new Subject<boolean>();

  constructor(
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

  private getDataFilters() {
    const subscribe = forkJoin([
      this.categoryServices.search(),
      this.companyService.search(),
    ]);
    subscribe.pipe(take(1)).subscribe(([category, company]) => {
      console.log(category, company);
      this.categories = category.data;
      this.tempCategories = category.data;
      this.companies = company.data;
      this.tempCompanies = company.data;
    });
  }

  private changesFilters() {
    this.filtersFrom
      .get('category')
      ?.valueChanges.pipe(takeUntil(this.onDestroy$))
      .subscribe((x) => {
        this.tempCategories = this.categories.filter((c) =>
          c.attributes.name.toLowerCase().includes((x ?? '').toLowerCase())
        );
      });
    this.filtersFrom
      .get('company')
      ?.valueChanges.pipe(takeUntil(this.onDestroy$))
      .subscribe((x) => {
        this.tempCompanies = this.companies.filter((c) =>
          c.attributes.name.toLowerCase().includes((x ?? '').toLowerCase())
        );
      });
  }
}
