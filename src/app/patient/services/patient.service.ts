import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../domains/patient';
// API
const API_NAME_CONTROLLER = '/patient';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(public httpClient: HttpClient, private router: Router) {}

  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  //Obtener token jwt para registro
  createTokenRegister(): HttpHeaders {
    let token = localStorage.getItem('tokenR');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  public findAll(): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT, { headers: headers });
  }

  public findById(patientIdentification: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/' + patientIdentification, {
      headers: headers,
    });
  }

  public save(patient: Patient): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(API_ENDPOINT, patient, { headers: headers });
  }

  public update(patient: Patient): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(API_ENDPOINT, patient, { headers: headers });
  }

  public delete(patientIdentification: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(API_ENDPOINT + '/' + patientIdentification, {
      headers: headers,
    });
  }

  public findByEmail(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/email/' + email, {
      headers: headers,
    });
  }
  comprobarRegistrado(patient: Patient) {
    if (patient.verified === 'Y') {
      localStorage.setItem('datosCompletos', 'true');
    } else {
      localStorage.setItem('datosCompletos', 'false');
    }
  }
}
