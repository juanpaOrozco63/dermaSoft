import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Treatment } from '../domains/treatment';
// API
const API_NAME_CONTROLLER = '/treatment';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  constructor(public httpClient: HttpClient) {}

  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  //Obtener token jwt para registro
  createTokenHeaderR(): HttpHeaders {
    let token = localStorage.getItem('tokenR');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  public findAll(): Observable<any> {
    let headers = this.createTokenHeaderR();
    return this.httpClient.get(API_ENDPOINT, { headers: headers });
  }
  public findById(treatmentId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/' + treatmentId, {
      headers: headers,
    });
  }
  public save(treatment: Treatment): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(API_ENDPOINT, treatment, { headers: headers });
  }

  public update(treatment: Treatment): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(API_ENDPOINT, treatment, { headers: headers });
  }

  public delete(treatmentId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(API_ENDPOINT + '/' + treatmentId, {
      headers: headers,
    });
  }
}
