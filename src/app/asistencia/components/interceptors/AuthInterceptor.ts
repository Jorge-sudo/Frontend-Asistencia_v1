import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Error'+ error.status);
          localStorage.clear();
          this.router.navigate(['/auth/login']).then();
        } else if (error.status === 500) {
          console.log('Error'+ error.status);
        } /*else if(error.status === 404){
          console.log('Error'+ error.status);
          Swal.fire({
            title: 'No hay datos:',
            text: `Este campo estara vacio !`,
            confirmButtonColor: '#3085d6',
            icon: 'info'
          });
        } */
        return throwError(()=>{'Algo ha salido mal; por favor, inténtalo de nuevo más tarde.'});

      })
    );
  }


}

export const authInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
