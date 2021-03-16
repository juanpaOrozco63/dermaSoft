import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../doctor/domains/doctor';
import { RegisterDoctor } from '../doctor/domains/registerDoctor';
import { Rol } from '../domains/rol';
import { RegisterPatient } from '../patient/domains/registerPatient';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  //Url del API
  private url: string = environment.apiUrl + '/api/v1/rol';

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
    return this.httpClient.get(this.url + '/findByEmail/' + email, {
      headers: headers,
    });
  }

  //Obtener usuario por id
  public findById(userId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/' + userId, { headers: headers });
  }
  //Actualizar
  public update(rol: Rol): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(this.url, rol, { headers: headers });
  }
  //Guardar admin
  public registerAdmin(rol: Rol): Observable<any> {
    let headers = this.createTokenHeaderR();
    return this.httpClient.post(this.url + '/registerAdmin', rol, {
      headers: headers,
    });
  }

  //Guardar admin
  public registerDoctor(rol: RegisterDoctor): Observable<any> {
    let headers = this.createTokenHeaderR();
    return this.httpClient.post(this.url + '/registerDoctor', rol, {
      headers: headers,
    });
  }

  //Guardar admin
  public registerPatient(rol: RegisterPatient): Observable<any> {
    let headers = this.createTokenHeaderR();
    return this.httpClient.post(this.url + '/registerPatient', rol, {
      headers: headers,
    });
  }
}
