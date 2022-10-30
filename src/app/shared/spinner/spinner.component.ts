import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/services/app/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
  public isViewSpinner = false;
  private onDestroy$ = new Subject<boolean>();
  constructor(private spinnerService: LoadingService) {}

  ngOnInit(): void {
    this.spinnerService.OnLoading.pipe(takeUntil(this.onDestroy$)).subscribe(
      (loading) => (this.isViewSpinner = loading)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
