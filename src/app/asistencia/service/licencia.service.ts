import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
      this.apiUrl = environment.controlAsistenciaApiUrl + '/api/licencias';
  }

  saveLicencia(licencia: any): any {
    return this.http.post<any>(this.apiUrl, licencia);
}
}
