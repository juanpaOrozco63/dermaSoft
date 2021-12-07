import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../domains/product';
// API
const API_NAME_CONTROLLER = '/product';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT, {
      headers: headers,
    });
  }
  public findById(productID: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT + '/' + productID, {
      headers: headers,
    });
  }
  public save(product: Product): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(API_ENDPOINT, product, { headers: headers });
  }

  public update(product: Product): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(API_ENDPOINT, product, { headers: headers });
  }

  public delete(productID: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(API_ENDPOINT + '/' + productID, {
      headers: headers,
    });
  }
}
