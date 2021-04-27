import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Treatment } from '../domains/treatment';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  //Url del API
  private url: string = environment.apiUrl + '/api/v1/treatment';

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
    return this.httpClient.get(this.url, { headers: headers });
  }
  public findById(treatmentId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/' + treatmentId, {
      headers: headers,
    });
  }
  public save(treatment: Treatment): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url, treatment, { headers: headers });
  }

  public update(treatment: Treatment): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(this.url, treatment, { headers: headers });
  }

  public delete(treatmentId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + '/' + treatmentId, {
      headers: headers,
    });
  }
}
