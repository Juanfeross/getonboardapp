import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/app/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  public isViewSpinner = false;
  constructor(private spinnerService: LoadingService) {}

  ngOnInit(): void {
    this.spinnerService.OnLoading.subscribe(
      (loading) => (this.isViewSpinner = loading)
    );
  }
}
