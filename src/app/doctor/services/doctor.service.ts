import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../domains/doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  //Url del API
  private url: string = environment.apiUrl + '/api/v1/doctor';

  constructor(public httpClient: HttpClient) {}

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
    return this.httpClient.get(this.url, { headers: headers });
  }

  public findById(patientIdentification: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/' + patientIdentification, {
      headers: headers,
    });
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
