import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DocenteAndSupervisorActivo } from '../api/command/DocenteAndSupervisorActivo';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
    private readonly apiUrl: string;
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/docentes/';
    }

    public getDocentes( order:number ,page:number,
                        limit: number, short: string): Observable<any> {

        return this.http.get<any>(this.apiUrl + 'page/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short);
    }

    public getDocentesFilter( order:number ,page:number,
                              limit: number, short: string,
                              globalFilter: string ): Observable<any> {

        return this.http.get<any>(this.apiUrl + 'page/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short + '?globalFilter=' + globalFilter);
    }

    public updateDocenteActivo(docente: DocenteAndSupervisorActivo) {
        return this.http.post<any>(this.apiUrl + 'activo', docente, {headers: this.httpHeaders});
    }


}
