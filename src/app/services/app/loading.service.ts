import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private onLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public ChangesLoading(value: boolean) {
    this.onLoading.next(value);
  }

  get OnLoading() {
    return this.onLoading;
  }
}
