import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../domains/doctor';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  //Url del API
  private url: string = environment.apiUrl + '/api/v1/doctor';

  constructor(public httpClient: HttpClient,public router:Router) {}

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
    return this.httpClient.get(this.url, { headers: headers }).pipe(
      catchError(e=>{
        Swal.fire('Error',`No hay doctores registrados`,'error');
        this.router.navigate(['/admin-principal/doctor-admin']);
         return throwError(e);
       })
    );
  }

  public findById(doctorIdentification: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/' + doctorIdentification, {
      headers: headers,
    }).pipe(
      catchError(e=>{
        Swal.fire('Error',`El doctor con número de identificación: ${doctorIdentification} no existe`,'error');
        this.router.navigate(['/admin-principal/doctor-admin']);
         return throwError(e);
       })
    );
  }

  public save(doctor: Doctor): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url, doctor, { headers: headers });
  }

  public update(doctor: Doctor): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(this.url, doctor, { headers: headers });
  }

  public delete(patientIdentification: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + '/' + patientIdentification, {
      headers: headers,
    });
  }
}
