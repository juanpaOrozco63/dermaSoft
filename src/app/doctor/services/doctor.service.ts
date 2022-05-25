import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Doctor } from '../domains/doctor';
// API
const API_NAME_CONTROLLER = '/doctor';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(public httpClient: HttpClient, public router: Router) {}

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
    return this.httpClient.get(API_ENDPOINT, { headers: headers }).pipe(
      catchError((e) => {
        Swal.fire('Error', `No hay doctores registrados`, 'error');
        this.router.navigate(['/admin-principal/doctor-admin']);
        return throwError(e);
      })
    );
  }

  public findById(doctorIdentification: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient
      .get(API_ENDPOINT + '/' + doctorIdentification, {
        headers: headers,
      })
      .pipe(
        catchError((e) => {
          Swal.fire(
            'Error',
            `El doctor con número de identificación: ${doctorIdentification} no existe`,
            'error'
          );
          this.router.navigate(['/admin-principal/doctor-admin']);
          return throwError(e);
        })
      );
  }

  public save(doctor: Doctor): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(API_ENDPOINT, doctor, { headers: headers });
  }

  public update(doctor: Doctor): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(API_ENDPOINT, doctor, { headers: headers });
  }

  public delete(patientIdentification: string): Observable<any> {
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

  comprobarRegistrado(doctor: Doctor) {
    if (doctor.verified === 'Y') {
      localStorage.setItem('datosCompletos', 'true');
    } else {
      localStorage.setItem('datosCompletos', 'false');
    }
  }
}
