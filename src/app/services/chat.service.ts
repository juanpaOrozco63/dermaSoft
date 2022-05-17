import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { MessageDto } from '../shared/model/message-dto.model';
// API
const API_NAME_CONTROLLER = '/chat';
const API_ENDPOINT = environment.chatApiUrl + API_NAME_CONTROLLER;
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public httpClient: HttpClient) {}
  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  public findMessages(chatName: string): Observable<MessageDto[]> {
    let headers = this.createTokenHeader();
    return this.httpClient.post<MessageDto[]>(
      `${API_ENDPOINT}/messages`,
      chatName,
      { headers: headers }
    );
  }

  public getWebSocket(): WebSocket {
    return new SockJS(API_ENDPOINT);
  }
}
