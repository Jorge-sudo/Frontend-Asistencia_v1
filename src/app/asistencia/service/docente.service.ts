import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Docente } from '../api/Docente';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
    public result: any = {};
    public loading: boolean = true;
    docentes: Docente[] = [];
    private readonly apiUrl: string;
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' , } );

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/docentes/';
        this.getDocentes(0, 10, 'nombre');
    }

    public async getDocentes(page:number, limit: number, short: string): Promise<any> {
        this.http.get<any>(this.apiUrl + 'page/' + page + '/' + limit + '/' + short)
            .pipe(
                tap((result: any) => {
                    this.docentes = result.data.content;
                    console.log(result);
                }),
                catchError(error => {
                    console.log(error);
                    return throwError(() => new Error('Error al obtener los Docentes.'));
                }),
                finalize(() => {
                    this.loading = false;
                })
            ).subscribe();
    }


}
