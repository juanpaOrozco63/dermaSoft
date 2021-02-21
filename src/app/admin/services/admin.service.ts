import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //Url del API
  private url: string = environment.apiUrl + '/api/v1/admin/';

  constructor(public httpClient: HttpClient) { }

  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  //Método de login admin
  public loginAdmin(adminIdentification: string, password: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'loginAdmin/' + adminIdentification + '/' + password, { headers: headers });
  }
}
