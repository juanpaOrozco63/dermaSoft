import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JasperService {
  //Url del API
  private url: string = environment.apiUrl + '/api/v1/reportes';
  constructor(public httpClient: HttpClient) {}

  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  // Generar reporte cita
  public generarReporteCita(citaId: number): Observable<Blob> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/generarReporteCita/' + citaId, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
