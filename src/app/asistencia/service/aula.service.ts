import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
      this.apiUrl = environment.controlAsistenciaApiUrl + '/api/aulas';
  }

  getAulaById(id:number) : Observable<any>{
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  getAulas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  saveAula(aula: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, aula);
  }
}
