import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// API
const API_NAME_CONTROLLER = '/report';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class JasperService {
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
    return this.httpClient.get(API_ENDPOINT + '/appointment/' + citaId, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
