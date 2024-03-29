import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiaService {

    private readonly apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.controlAsistenciaApiUrl + '/api/diasSemana';
    }

    public getDias(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
