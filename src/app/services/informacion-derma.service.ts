import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { InfoVideo } from '../shared/model/info-video.modal';

@Injectable({
  providedIn: 'root',
})
export class InformacionDermaService {
  private videoPrincipal: InfoVideo = {
    titulo: 'Deja tu piel en buenas manos',
    url: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fasocolderma%2Fvideos%2F457697818149033%2F&show_text=false&width=560&t=0',
  };
  private videoPrincipalPaciente: InfoVideo = {
    titulo: '¿A quién estás acudiendo?',
    url: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fasocolderma%2Fvideos%2F500097387407898%2F&show_text=false&width=560&t=0',
  };

  private videoPacienteProductos: InfoVideo = {
    titulo: 'La automedicación, un grave error',
    url: 'https://www.youtube-nocookie.com/embed/PvQi1kqtnro',
  };

  private videoPacienteServicios: InfoVideo = {
    titulo: 'Acude a un dermatólogo',
    url: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fasocolderma%2Fvideos%2F468645933722368%2F&show_text=false&width=560&t=0',
  };

  private videoPacienteCitas: InfoVideo = {
    titulo: 'Los dermatólogos mantienen actualizados',
    url: 'https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fasocolderma%2Fvideos%2F3036751093064346%2F&show_text=false&width=560&t=0',
  };
  private videoPacienteRegistro: InfoVideo = {
    titulo: '¿Por qué debes ir al dermatólogo?',
    url: 'https://www.youtube-nocookie.com/embed/qY0WpScnao8',
  };
  constructor() {}

  public getVideoPrincipal(): InfoVideo {
    return this.videoPrincipal;
  }
  public getVideoPrincipalPaciente(): InfoVideo {
    return this.videoPrincipalPaciente;
  }
  public getVideoPacienteProductos(): InfoVideo {
    return this.videoPacienteProductos;
  }
  public getVideoPacienteServicios(): InfoVideo {
    return this.videoPacienteServicios;
  }
  public getVideoPacienteCitas(): InfoVideo {
    return this.videoPacienteCitas;
  }
  public getVideoPacienteRegistro(): InfoVideo {
    return this.videoPacienteRegistro;
  }
}
