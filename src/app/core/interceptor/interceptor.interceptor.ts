import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoadingService } from 'src/app/services/app/loading.service';

@Injectable()
export class InterceptorServices implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.ChangesLoading(true);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return next.handle(req).pipe(
      finalize(() => this.loadingService.ChangesLoading(false)),
      // Handle errors
      catchError((error: HttpErrorResponse) => {
        // TODO: Add error handling logic here
        return throwError(error);
      })
    );
  }
}
