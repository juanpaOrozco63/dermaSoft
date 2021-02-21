import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../domains/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Url del API
  private url: string = environment.apiUrl + '/login';

  constructor(public httpClient: HttpClient) { }

  //Método Login
  public loginUser(user: User): Observable<any> {
    return this.httpClient.post(this.url, user);
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
