import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

    private readonly apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/asignaturas';
    }

    public getAsignaturas( order:number ,page:number,
                            limit: number, short: string,
                            idCarrera: number, idDia: number,
                            idSemestre: number, idTurno: number,
                            globalFilter: string): Observable<any> {

        return this.http.get<any>(this.apiUrl + '/page/' +page + '/' + limit + '/' +order + '/' +
                                                short + '/' + idCarrera + '/' + idDia + '/' +
                                                idSemestre + '/' + idTurno+ '?globalFilter=' + globalFilter);
    }


}
