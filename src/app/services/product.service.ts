import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../domains/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
//Url del API
private url: string = environment.apiUrl + '/api/v1/product';
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
  public findById(productID: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/' + productID, {
      headers: headers,
    });
  }
  public save(product: Product): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url, product, { headers: headers });
  }

  public update(product: Product): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(this.url, product, { headers: headers });
  }

  public delete(productID: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + '/' + productID, {
      headers: headers,
    });
  }
}
