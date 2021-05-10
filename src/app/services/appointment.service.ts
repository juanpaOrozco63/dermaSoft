import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../domains/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  //Url del API
  private url: string = environment.apiUrl + '/api/v1/appointment';
  constructor(public httpClient: HttpClient, public router: Router) {}
  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }
  public save(appointment: Appointment): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url, appointment, { headers: headers });
  }

  public findByDoctorId(doctorId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/findByDoctor/' + doctorId, {
      headers: headers,
    });
  }

  public findByPatientId(patientId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/findByPatient/' + patientId, {
      headers: headers,
    });
  }

  public finalizarCita(appointmentId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/finalizarCita/' + appointmentId, {
      headers: headers,
    });
  }

  public cerrarCita(appointmentId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/cerrarCita/' + appointmentId, {
      headers: headers,
    });
  }
}
