import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Generic } from 'src/app/util/generic';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string;
  public decodedToken: any;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

  constructor( private httpClient: HttpClient) {
    this.url = environment.controlAsistenciaApiUrl + '/api/auth';
    this.decodedToken = this.obtenerTokenDecodificado();
  }

  public login(user: any): Observable<any> {
    return this.httpClient.post(this.url + '/login', user, { headers: this.httpHeaders });
  }

  public completarIniciarSesión = (signInPayload: any): void => {
    Generic.localStorageSetItem('token', signInPayload);
    this.decodedToken = this.obtenerTokenDecodificado();
  }

  public verificarToken = (): Observable<any> => {
    return this.httpClient.get<any>(this.url + '/verificarToken');
  }

  public verificarContrasenia(loginRequest: any){
    return this.httpClient.post<any>(this.url + '/verificar/contrasenia', loginRequest, { headers: this.httpHeaders });
  }

  public getCiPersonaPorToken(): Observable<any> {
    return this.httpClient.post(this.url + '/login/ci', { headers: this.httpHeaders } );
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
    this.decodedToken = null;
  }
}
