import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private readonly apiUrl: string;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

  constructor(private http: HttpClient) {
      this.apiUrl = environment.controlAsistenciaApiUrl + '/api/materias';
  }

  public saveMateria(data: any) {
      return this.http.post<any>(this.apiUrl, data, {headers: this.httpHeaders});
  }

  public getBySiglaMateria(sigla: string) {
      return this.http.get<any>(this.apiUrl + '/' + sigla);
  }
}
