import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../components/facturacion-doctor/facturacion-doctor.model';
// API
const API_NAME_CONTROLLER = '/subscription';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class FacturacionService {
  // Metodos de pago
  private payments: PaymentMethod[];
  constructor(private httpClient: HttpClient) {
    this.llenarArregloMetodosPago();
  }
  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }
  // Llenar arreglo de metodos de pago
  llenarArregloMetodosPago() {
    this.payments = [
      {
        payId: 1,
        name: 'MASTER CARD',
      },
      {
        payId: 2,
        name: 'VISA',
      },
      {
        payId: 3,
        name: 'AMERICAN EXPRESS',
      },
      {
        payId: 4,
        name: 'PAYPAL',
      },
    ];
  }

  // Obtener datos arreglo de suscribciones
  findAllPayments(): PaymentMethod[] {
    return this.payments;
  }

  // Obtener datos arreglo de suscribciones
  findAllSubscriptions(): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(API_ENDPOINT, { headers: headers }).pipe(
      catchError((e) => {
        return throwError(e);
      })
    );
  }
}
