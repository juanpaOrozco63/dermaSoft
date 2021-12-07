import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Eps } from '../domains/eps';
// API
const API_NAME_CONTROLLER = '/eps';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class EpsService {
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
  public findById(epsID: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/' + epsID, {
      headers: headers,
    });
  }
  public save(eps: Eps): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(API_ENDPOINT, eps, { headers: headers });
  }

  public update(eps: Eps): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(API_ENDPOINT, eps, { headers: headers });
  }

  public delete(epsID: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(API_ENDPOINT + '/' + epsID, {
      headers: headers,
    });
  }
}
