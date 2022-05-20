import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { EventoCambioChat } from '../../model/evento-cambio-chat.model';
import { UsuarioGenerico } from '../../model/usuario-generico.model';
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
  constructor(private imageService: ImageService) {}

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
    return this.imageService.getImage(imgUser);
  }
}
