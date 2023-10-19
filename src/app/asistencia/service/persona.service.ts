import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
      this.apiUrl = environment.controlAsistenciaApiUrl + '/api';
  }

  saveImagePersona(archivo: File, ci: number): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("file", archivo);
    formData.append("ci", ci.toString());

    const req = new HttpRequest('POST', `${this.apiUrl}/imagePersona/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}
