import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CommandDocenteAndSupervisorActivo } from '../api/command/commandDocenteAndSupervisorActivo';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

    private readonly apiUrl: string;
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/docentes';
    }

    public updateDocentePerfil(command: any) {
        return this.http.post<any>(this.apiUrl + '/perfil', command, {headers: this.httpHeaders});
    }

    public getDocentes( order:number ,page:number,
                        limit: number, short: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/page/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short);
    }

    public getDocenteByCi(ci: number): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/' + ci);
    }

    public getDocentesFilter( order:number ,page:number,
                              limit: number, short: string,
                              globalFilter: string ): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/page/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short + '?globalFilter=' + globalFilter);
    }

    public updateDocenteActivo(command: CommandDocenteAndSupervisorActivo) {
        return this.http.post<any>(this.apiUrl + '/activo', command, {headers: this.httpHeaders});
    }

    public saveDocente(command: any){
        return this.http.post<any>(this.apiUrl, command, {headers: this.httpHeaders});
    }


}
