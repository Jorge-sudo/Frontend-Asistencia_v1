import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Generic } from 'src/app/util/generic';
import { Router } from '@angular/router';
import { UserWithToken } from '../api/UserWithToken';
import { CookieService } from 'ngx-cookie-service';

const USER_LOCAL_STORAGE_KEY = 'user_data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly url: string;
  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: false
  };

  constructor( private httpClient: HttpClient,
               private router: Router,
               private cookieService: CookieService) {
    this.url = environment.controlAsistenciaApiUrl + '/api/auth';
    this.loadUserFromLocalStorage();
  }

  public login(user: any): Observable<any> {
    return this.httpClient.post(this.url + '/login', user, this.httpHeaders).pipe(
      map((response: any) => {
        Generic.localStorageSetItem(USER_LOCAL_STORAGE_KEY, response);
        this.pushNewUser(response);
        this.redirectToDashboard();
      })
    );
  }


  private pushNewUser(response: any) {
    this.user.next(response);
  }

  private redirectToDashboard(): void {
    this.router.navigateByUrl('/');
  }

  public isValidUser = (): boolean => {
    const user_data = Generic.localStorageGetItem(USER_LOCAL_STORAGE_KEY);
    if (!user_data) {
      return false;
    }
    return true;
  }


  private loadUserFromLocalStorage(): void {
    const userFromLocal = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if(userFromLocal){
      this.pushNewUser(userFromLocal);
    }
  }

  public isAdmin = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this.user$.pipe(
        tap((user) => {
          if (user && user.role === 'ADMIN') {
            resolve(true);
          }
          resolve(false);
        }),
        catchError((error) => {
          reject(false);
          return error;
        })
      ).subscribe();
    });
  }

  public borrarSesión = (): void => {
    localStorage.clear();
    this.user.next(null);
    this.router.navigateByUrl('/auth/login');
    this.cookieService.delete('jwt_access_asistencia');
    this.cookieService.deleteAll();
  }

  public logoutSession(): Observable<any> {
    this.borrarSesión();
    return this.httpClient.post(this.url + '/logout', null, this.httpHeaders);
  }


}
