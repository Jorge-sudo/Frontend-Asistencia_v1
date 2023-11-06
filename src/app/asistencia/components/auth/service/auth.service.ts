import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Generic } from 'src/app/util/generic';
import { Router } from '@angular/router';
import { UserWithToken } from '../api/UserWithToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string;
  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));
  role: string = '';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

  constructor( private httpClient: HttpClient, private router: Router) {
    this.url = environment.controlAsistenciaApiUrl + '/api/auth';
  }

  public login(user: any): Observable<any> {
    return this.httpClient.post(this.url + '/login', user, { headers: this.httpHeaders }).pipe(
      map((response: any) => {
        this.role = response.role;
        Generic.localStorageSetItem('token', response.token);
        this.pushNewUser(response);
        this.redirectToDashboard();
      })
    );
  }

  private pushNewUser(response: any) {
    this.user.next(response);
    this.user$.subscribe(user => console.log(user));
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
    const token = Generic.localStorageGetItem('token');
    if (!token) {
      return null;
    }
    const parts = token.split('.');
    return JSON.parse(atob(parts[1]));
  }

  public borrarSesión = (): void => {
    localStorage.clear();
    this.user.next(null);
    this.router.navigateByUrl('/auth/login');
  }
}
