import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocenteAndSupervisorActivo } from '../api/command/DocenteAndSupervisorActivo';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

    private readonly apiUrl: string;
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/supervisores';
    }

    public getSupervisores(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    public updateSupervisorActivo(supervisor: DocenteAndSupervisorActivo) {
        return this.http.post<any>(this.apiUrl + '/activo', supervisor, {headers: this.httpHeaders});
    }
}
