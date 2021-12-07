import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// API
const API_NAME_CONTROLLER = '/city';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class CityService {
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
}
