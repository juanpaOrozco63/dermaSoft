import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ChatService } from 'src/app/services/chat.service';
import { ImageService } from 'src/app/services/image.service';
import * as Stomp from 'stompjs';
import { MessageDto } from '../../model/message-dto.model';
import { UsuarioGenerico } from '../../model/usuario-generico.model';
const PREFIX_DOCTOR = 'D';
const PREFIX_PATIENT = 'P';
const CONNECTOR_CHARACTER = '&';
@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css'],
})
export class ChatContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public isDoctorUsuarioPrincipal: boolean;
  @Input()
  public usuarioPrincipal: UsuarioGenerico;
  @Input()
  public usuarioSecundario: UsuarioGenerico;
  @ViewChild('chat')
  private chatElement: ElementRef;
  channelName?: string;
  socket?: WebSocket;
  stompClient?: Stomp.Client;
  newMessage: string;
  messages?: Observable<MessageDto[]>;
  senderName?: string;
  constructor(
    private chatService: ChatService,
    private imageService: ImageService
  ) {}
  @HostListener('window:beforeunload', ['$event'])
  async onBeforeUnload(): Promise<void> {
    this.disconnectChat();
  }
  ngOnDestroy(): void {
    this.disconnectChat();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.usuarioSecundario?.previousValue !== undefined) {
      if (changes.usuarioSecundario?.previousValue == null) {
        this.connectChat();
      } else {
        this.disconnectChat();
        this.connectChat();
      }
    }
  }

  ngOnInit(): void {}
  buildChatName() {
    let id1: string = this.usuarioPrincipal.id.toString();
    let id2: string = this.usuarioSecundario.id.toString();
    if (this.isDoctorUsuarioPrincipal === true) {
      id1 = PREFIX_DOCTOR + id1;
      id2 = PREFIX_PATIENT + id2;
    } else {
      id1 = PREFIX_PATIENT + id1;
      id2 = PREFIX_DOCTOR + id2;
    }
    if (id1.localeCompare(id2) < 0) {
      this.channelName = id1 + CONNECTOR_CHARACTER + id2;
    } else {
      this.channelName = id2 + CONNECTOR_CHARACTER + id1;
    }
  }
  loadChat() {
    this.messages = this.chatService.findMessages(this.channelName);
    this.messages.subscribe((data) => {
      let mgs: MessageDto[] = data;
      mgs.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.messages = of(mgs);
    });
    console.log(this.messages);
  }
  disconnectChat() {
    for (const sub in this.stompClient?.subscriptions) {
      if (this.stompClient?.subscriptions.hasOwnProperty(sub)) {
        this.stompClient?.unsubscribe(sub);
      }
    }
    this.stompClient?.disconnect();
  }
  connectChat() {
    if (this.usuarioPrincipal && this.usuarioSecundario) {
      this.buildChatName();
      this.loadChat();
      console.log('connecting to chat...');
      this.socket = this.chatService.getWebSocket();
      this.stompClient = Stomp.over(this.socket);

      this.stompClient.connect({}, (frame) => {
        console.log('connected to: ' + frame);
        this.stompClient!.subscribe(
          '/topic/messages/' + this.channelName,
          (response) => {
            this.loadChat();
          }
        );
      });
    }
  }
  sendMsg() {
    if (this.newMessage !== '') {
      this.senderName = this.obtenerSenderName();
      const mensajito: MessageDto = {
        id: null,
        chatName: this.channelName,
        content: this.newMessage,
        senderId: this.senderName,
        validRegister: null,
      };
      this.stompClient!.send(
        '/app/chat/' + this.channelName,
        {},
        JSON.stringify(mensajito)
      );
      this.newMessage = '';
    }
  }
  obtenerImagen(imgUser: string): string {
    return this.imageService.getImage(imgUser);
  }
  obtenerSenderName(): string {
    return this.isDoctorUsuarioPrincipal
      ? PREFIX_DOCTOR + this.usuarioPrincipal.id
      : PREFIX_PATIENT + this.usuarioPrincipal.id;
  }
}
