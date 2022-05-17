import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventoCambioChat } from '../../model/evento-cambio-chat.model';
import { UsuarioGenerico } from '../../model/usuario-generico.model';
const GENERIC_IMAGE = 'https://www.asf.com.mx/Imagenes/Login.png';
const URL_PATTERN = /^(ftp|http|https):\/\/[^ "]+$/;
@Component({
  selector: 'app-chat-aside',
  templateUrl: './chat-aside.component.html',
  styleUrls: ['./chat-aside.component.css'],
})
export class ChatAsideComponent implements OnInit {
  @Output()
  public actualizarChatUsuario: EventEmitter<EventoCambioChat> = new EventEmitter();
  @Input()
  public usuarios: UsuarioGenerico[];
  constructor() {}

  ngOnInit(): void {}

  obtenerListado(): UsuarioGenerico[] {
    return this.usuarios;
  }

  actualizarChat(usuarioCambio: UsuarioGenerico) {
    this.actualizarChatUsuario.emit({
      usuario: usuarioCambio,
    });
  }

  obtenerImagen(imgUser: string): string {
    return imgUser !== null && URL_PATTERN.test(imgUser)
      ? imgUser
      : GENERIC_IMAGE;
  }
}
