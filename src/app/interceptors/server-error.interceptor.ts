import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, retry, tap, throwError} from 'rxjs';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      tap( (error: any) => {
         if (error.status === 401 ) {
           // refresh needed
           return 'refresh token requested'
         } else {
           return throwError(() => error)
         }
      })
    );
  }
}
