import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IItemPagination, IPagination } from '@core/models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() pagination?: IPagination;
  @Output() actionPage = new EventEmitter<number>();

  public viewPage: IItemPagination[] = [];
  public selectPage: number = 1;

  constructor() {}

  ngOnInit(): void {
    if (this.pagination) {
      this.initPagination(1);
    }
  }

  public action(page?: string) {
    if (page !== '...') {
      if (this.pagination) {
        this.selectPage = +(page ?? 1);
      }

      this.initPagination(+(page ?? 1));
      this.actionPage.emit(+(page ?? 1));
    }
  }

  private initPagination(page: number) {
    this.viewPage = [];
    this.viewPage.push({ id: '1', text: '1' });
    this.validatePages(page);
    this.viewPage.push({
      id: `${this.pagination?.total_pages ?? 1}`,
      text: `${this.pagination?.total_pages ?? 1}`,
    });
  }
  private validatePages(page: number) {
    if (page > 2) {
      if (page > 3) {
        this.viewPage.push({
          id: `points`,
          text: `...`,
          tooltip: `Numeros entre ${page}`,
        });
      }
      this.viewPage.push({ id: `${page - 1}`, text: `${page - 1}` });
    }
    if (page !== 1 && page !== this.pagination?.total_pages) {
      this.viewPage.push({ id: `${page}`, text: `${page}` });
    }
    if (this.pagination && page < (this.pagination?.total_pages ?? 1) - 1) {
      this.viewPage.push({ id: `${page + 1}`, text: `${page + 1}` });
      this.viewPage.push({ id: `points`, text: `...` });
    }
  }
}
