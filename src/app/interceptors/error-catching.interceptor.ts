import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import Swal from "sweetalert2";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        Swal.fire('Error', error.message, 'error');
        return throwError(error.message);
      })
    )
  }
}
