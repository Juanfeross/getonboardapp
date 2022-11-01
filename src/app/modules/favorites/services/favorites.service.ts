import { Injectable } from '@angular/core';
import { Meta, SearchingEntity } from '@core/models';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/api/user.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private searchingSubject$: BehaviorSubject<SearchingEntity<string>> = new BehaviorSubject<SearchingEntity<string>>(new SearchingEntity<string>());
  public pagination: Meta = {
    page: 1,
    per_page: 12,
    total_pages: 0,
  };
  private paginationSubject$: BehaviorSubject<Meta> = new BehaviorSubject<Meta>(this.pagination!);

  constructor(private userService: UserService) { }

  getFavorites(user: User) {
    return this.userService.jobs(`/user/${user.id}/job`);
  }
}
