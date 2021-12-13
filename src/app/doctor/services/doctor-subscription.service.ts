import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';
import { DoctorSubscription } from '../components/facturacion-doctor/facturacion-doctor.model';
// API
const API_NAME_CONTROLLER = '/doctor-subscription';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class DoctorSubscriptionService {
  public subActual: DoctorSubscription = null;
  constructor(private httpClient: HttpClient) {}
  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  // Obtener datos arreglo de suscribciones
  findByDoctorId(doctorId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient
      .get(API_ENDPOINT + '/doctor/' + doctorId, { headers: headers })
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  public save(doctorSubs: DoctorSubscription): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(API_ENDPOINT, doctorSubs, { headers: headers });
  }
}
