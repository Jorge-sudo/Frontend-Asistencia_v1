import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
      this.apiUrl = environment.controlAsistenciaApiUrl + '/api/dashboard';
  }

  public getDashboard(): any {
      return this.http.get<any>(this.apiUrl);
  }
}
