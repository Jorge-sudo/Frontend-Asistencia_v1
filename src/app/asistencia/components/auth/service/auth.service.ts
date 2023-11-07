import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Generic } from 'src/app/util/generic';
import { Router } from '@angular/router';
import { UserWithToken } from '../api/UserWithToken';

const USER_LOCAL_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string;
  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

  constructor( private httpClient: HttpClient,
               private router: Router) {
    this.url = environment.controlAsistenciaApiUrl + '/api/auth';
    this.loadUserFromLocalStorage();
  }

  public login(user: any): Observable<any> {
    return this.httpClient.post(this.url + '/login', user, { headers: this.httpHeaders }).pipe(
      map((response: any) => {
        Generic.localStorageSetItem(USER_LOCAL_STORAGE_KEY, response.token);
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

  public isValidToken = (): boolean => {
    const token = this.obtenerTokenDecodificado();
    if (!token) {
      return false;
    }
    return true;
  }

  public obtenerTokenDecodificado = (): any => {
    const token = Generic.localStorageGetItem(USER_LOCAL_STORAGE_KEY);
    if (!token) {
      return null;
    }
    const parts = token.split('.');
    return JSON.parse(atob(parts[1]));
  }

  private loadUserFromLocalStorage(): void {
    const userFromLocal = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    console.log(userFromLocal);
    userFromLocal && this.pushNewUser(userFromLocal);
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
  }
}
