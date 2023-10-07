import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocenteLicenciaService {

    private readonly apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/docenteLicencias/';
    }

    public getDocenteLicenciasInactive( order:number ,page:number,
                        limit: number, short: string): Observable<any> {
                            
        return this.http.get<any>(this.apiUrl + 'page/inactive/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short);
    }

    public getDocenteLicenciasActive( order:number ,page:number,
                        limit: number, short: string): Observable<any> {

        return this.http.get<any>(this.apiUrl + 'page/active/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short);
    }

    public getDocenteLicenciasFilterGlobal( order:number ,page:number,
                              limit: number, short: string,
                              globalFilter: string ): Observable<any> {

        return this.http.get<any>(this.apiUrl + 'page/search/' +page + '/' +
                                                limit + '/' +order + '/' +
                                                short + '?globalFilter=' + globalFilter);
    }

}
