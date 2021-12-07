import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../domains/appointment';
// API
const API_NAME_CONTROLLER = '/appointment';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(public httpClient: HttpClient, public router: Router) {}
  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }
  public save(appointment: Appointment): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(API_ENDPOINT, appointment, {
      headers: headers,
    });
  }

  public findByDoctorId(doctorId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/doctor/' + doctorId, {
      headers: headers,
    });
  }

  public findPatientsByDoctorId(doctorId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/patient/doctor/' + doctorId, {
      headers: headers,
    });
  }

  public findByPatientId(patientId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/patient/' + patientId, {
      headers: headers,
    });
  }

  public finalizarCita(appointmentId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/finish/' + appointmentId, {
      headers: headers,
    });
  }

  public cerrarCita(appointmentId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/close/' + appointmentId, {
      headers: headers,
    });
  }

  public reporteDoctor(doctorId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/report/doctor/' + doctorId, {
      headers: headers,
    });
  }
}
