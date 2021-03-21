import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Eps } from '../domains/eps';

@Injectable({
  providedIn: 'root'
})
export class EpsService {

  //Url del API
  private url: string = environment.apiUrl + '/api/v1/eps';

  constructor(public httpClient: HttpClient) { }

  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  //Obtener token jwt para registro
  createTokenHeaderR(): HttpHeaders {
    let token = localStorage.getItem('tokenR');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  public findAll(): Observable<any> {
    let headers = this.createTokenHeaderR();
    return this.httpClient.get(this.url, { headers: headers });
  }
  public findById(epsID: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/' + epsID, {
      headers: headers,
    });
  }
  public save(eps: Eps): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url, eps, { headers: headers });
  }

  public update(eps: Eps): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(this.url, eps, { headers: headers });
  }

  public delete(epsID: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + '/' + epsID, {
      headers: headers,
    });
  }
}
