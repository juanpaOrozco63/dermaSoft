import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterDoctor } from '../doctor/domains/registerDoctor';
import { Rol } from '../domains/rol';
import { RegisterPatient } from '../patient/domains/registerPatient';
// API
const API_NAME_CONTROLLER = '/rol';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class RolService {
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

  //Obtener usuario por email
  public findByEmail(email: string): Observable<any> {
    let headers = this.createTokenHeaderR();
    return this.httpClient.get(API_ENDPOINT + '/email/' + email, {
      headers: headers,
    });
  }

  //Obtener usuario por id
  public findById(userId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/' + userId, {
      headers: headers,
    });
  }
  //Actualizar
  public update(rol: Rol): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(API_ENDPOINT, rol, { headers: headers });
  }
  //Guardar admin
  public registerAdmin(rol: Rol): Observable<any> {
    let headers = this.createTokenHeaderR();
    return this.httpClient.post(API_ENDPOINT + '/admin', rol, {
      headers: headers,
    });
  }

  //Guardar admin
  public registerDoctor(rol: RegisterDoctor): Observable<any> {
    let headers = this.createTokenHeaderR();
    return this.httpClient.post(API_ENDPOINT + '/doctor', rol, {
      headers: headers,
    });
  }

  //Guardar admin
  public registerPatient(rol: RegisterPatient): Observable<any> {
    let headers = this.createTokenHeaderR();
    return this.httpClient.post(API_ENDPOINT + '/patient', rol, {
      headers: headers,
    });
  }
}
