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

    public getAsistenciasFindAllByDate( order:number ,page:number,
                        limit: number, short: string, dateSearch: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'page/date/' + page + '/' +
                                                limit + '/' + order + '/' +
                                                short + '/' + dateSearch);
    }

    public getAsistenciasFilter( order:number ,page:number,
                              limit: number, short: string,
                              globalFilter: string ): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'page/search/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short + '?globalFilter=' + globalFilter);
    }

}
