import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InformacionDermaService } from 'src/app/services/informacion-derma.service';
import { ModalVideoComponent } from 'src/app/shared/components/modal-video/modal-video.component';
import { InfoVideo } from 'src/app/shared/model/info-video.modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private modal: NgbModal,
    private informacionDermaService: InformacionDermaService
  ) {}

  ngOnInit(): void {
    this.abrirModal();
  }
  abrirModal() {
    const modalRef = this.modal.open(ModalVideoComponent, {
      centered: true,
      windowClass: 'my-class',
    });
    const video: InfoVideo =
      this.informacionDermaService.getVideoPrincipalPaciente();
    modalRef.componentInstance.titulo = video.titulo;
    modalRef.componentInstance.urlVideo = video.url;
  }
}
