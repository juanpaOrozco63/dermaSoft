import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../domains/user';
// API
const API_NAME_CONTROLLER = '/login';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public httpClient: HttpClient) {}

  //Método Login
  public loginUser(user: User): Observable<any> {
    return this.httpClient.post(API_ENDPOINT, user);
  }

  //Logueado?
  public loggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  //Desloguearse
  public logOut(): void {
    localStorage.removeItem('usuario');
  }
}
