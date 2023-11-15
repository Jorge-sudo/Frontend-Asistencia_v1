import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandDocenteAndSupervisorActivo } from '../api/command/commandDocenteAndSupervisorActivo';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

    private readonly apiUrl: string;
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/supervisores';
    }

    public updateSupervisorPerfil(command: any){
        return this.http.post<any>(this.apiUrl + '/perfil', command, {headers: this.httpHeaders});
    }

    public getSupervisores(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    public getSupervisorByCi(ci: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/' + ci);
    }

    public updateSupervisorActivo(command: CommandDocenteAndSupervisorActivo) {
        return this.http.post<any>(this.apiUrl + '/activo', command, {headers: this.httpHeaders});
    }

    public saveSupervisor(command: any){
      return this.http.post<any>(this.apiUrl, command, {headers: this.httpHeaders});
    }
}
