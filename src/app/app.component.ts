import { Component, OnInit } from '@angular/core';
import { JobsService } from './services/api';
import { AuthService } from './services/app/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'getonboardapp';

  constructor(private _authService: AuthService,
    private _service: JobsService) {}

  ngOnInit() {
    this._authService.validateAuthentication();
    this._service.getForBulk();
  }
}
