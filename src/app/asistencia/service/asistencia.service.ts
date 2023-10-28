import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

    private readonly apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/asistencias/';
    }

    public getAsistenciasFindAll( order:number ,page:number,
                                  limit: number, short: string,
                                  idCarrera: number, idSemestre: number,
                                  dateSearch: string, globalFilter: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'page/' + page + '/' +
                                                limit + '/' + order + '/' +
                                                short + '/' + idCarrera + '/' +
                                                idSemestre + '/' + dateSearch +
                                                '?globalFilter=' + globalFilter);
    }

}
