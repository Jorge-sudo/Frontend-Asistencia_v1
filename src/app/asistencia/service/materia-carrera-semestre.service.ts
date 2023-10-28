import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandMateriaCarreraSemestre } from '../api/command/commandMateriaCarreraSemestre';

@Injectable({
  providedIn: 'root'
})
export class MateriaCarreraSemestreService {

    private readonly apiUrl: string;
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/materiaCarreraSemestres/';
    }

    public getMateriaCarreraSemestres( order:number ,page:number,
                        limit: number, short: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'page/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short);
    }

    public getMateriaCarreraSemestresFilter( order:number ,page:number,
                              limit: number, short: string,
                              globalFilter: string ): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'page/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short + '?globalFilter=' + globalFilter);
    }

    public getMateriaCarreraSemestreBySigla(sigla: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'sigla/' + sigla);
    }

    public updateMateriaCarreraSemestreActivo(command: CommandMateriaCarreraSemestre) {
        return this.http.post<any>(this.apiUrl + 'activo', command, {headers: this.httpHeaders});
    }
}
