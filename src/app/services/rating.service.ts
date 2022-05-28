import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Rating } from '../shared/model/rating.model';
// API
const API_NAME_CONTROLLER = '/rating';
const API_ENDPOINT =
  environment.apiUrl + environment.contextPath + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(public httpClient: HttpClient) {}
  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  public findAll(): Observable<Rating[]> {
    let headers = this.createTokenHeader();
    return this.httpClient.get<Rating[]>(API_ENDPOINT, {
      headers: headers,
    });
  }

  public save(rating: Rating): Observable<Rating> {
    let headers = this.createTokenHeader();
    return this.httpClient.post<Rating>(API_ENDPOINT, rating, {
      headers: headers,
    });
  }

  public findByDoctorId(doctorId: number): Observable<Rating[]> {
    let headers = this.createTokenHeader();
    return this.httpClient.get<Rating[]>(`${API_ENDPOINT}/doctor/${doctorId}`, {
      headers: headers,
    });
  }
}
