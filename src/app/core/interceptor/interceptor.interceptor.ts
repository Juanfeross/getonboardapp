import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, ResponseData } from '@core/models';
import {
  catchError,
  finalize,
  lastValueFrom,
  Observable,
  throwError,
} from 'rxjs';
import { LoginService } from 'src/app/services/api/login.service';
import { JwtService } from 'src/app/services/app/jwt.service';
import { LoadingService } from 'src/app/services/app/loading.service';
import { SessionStorageService } from 'src/app/services/app/session-storage.service';

@Injectable()
export class InterceptorServices implements HttpInterceptor {
  constructor(
    private readonly jwt: JwtService,
    private loadingService: LoadingService,
    private sessionStorage: SessionStorageService,
    private loginService: LoginService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.ChangesLoading(true);

    if (req.url.includes('/refresh')) {
      return next.handle(req);
    }
    const hardcodedToken = this.sessionStorage.getItemString('accessToken');
    const expirationDate = this.jwt.getTokenExpirationDate(hardcodedToken);

    if (expirationDate !== null) {
      let dateToken = expirationDate.getTime();
      let now: Date = new Date();

      let res = Math.abs(dateToken.valueOf() - now.valueOf()) / 1000;
      let minutes = Math.floor(res / 60) % 60;

      if (minutes <= 1) {
        let headers = new HttpHeaders().append(
          'Authorization',
          `Bearer ${hardcodedToken}`
        );
        const refresh$ = this.loginService.refreshToken(
          '/auth/refresh',
          headers
        );
        lastValueFrom(refresh$).then(
          (result: ResponseData<Login>) => {
            this.sessionStorage.setItem('accessToken', result.data.accessToken);
          },
          (error) => {
            this.sessionStorage.clear();
          }
        );
      }
    }
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.sessionStorage.getItemString(
          'accessToken'
        )}`,
      },
    });

    return next.handle(req).pipe(
      finalize(() => this.loadingService.ChangesLoading(false)),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }
}
