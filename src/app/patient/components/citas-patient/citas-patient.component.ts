import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PatientAppointment } from 'src/app/domains/patientAppointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { JasperService } from 'src/app/services/jasper.service';
import { Patient } from '../../domains/patient';
import { PatientService } from '../../services/patient.service';
import Swal from 'sweetalert2';
import { RatingCitasComponent } from '../rating-citas/rating-citas.component';
import { ModalVideoComponent } from 'src/app/shared/components/modal-video/modal-video.component';
import { InfoVideo } from 'src/app/shared/model/info-video.modal';
import { InformacionDermaService } from 'src/app/services/informacion-derma.service';
declare var saveAs: any;

@Component({
  selector: 'app-citas-patient',
  templateUrl: './citas-patient.component.html',
  styleUrls: ['./citas-patient.component.css'],
})
export class CitasPatientComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Mis citas';
  // Usuario fire
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  // Crear paciente
  public usuario: Patient;
  // Objeto citas
  citas: PatientAppointment[];
  // Objeto cita modal
  citaModal: PatientAppointment = new PatientAppointment(
    new Date(),
    '',
    '',
    '',
    '',
    0,
    0,
    '',
    '',
    ''
  );
  constructor(
    private modal: NgbModal,
    private appointmentService: AppointmentService,
    private authFirebaseService: AuthFirebaseService,
    private patientService: PatientService,
    private jasperService: JasperService,
    private informacionDermaService: InformacionDermaService
  ) {}

  ngOnInit() {
    this.abrirModalInformativo();
    this.findUserFire();
  }
  //Traer usuario firebase
  findUserFire() {
    this.userF$.subscribe((data) => {
      if (data) {
        this.patientService.findByEmail(data.email).subscribe((data) => {
          if (data) {
            this.usuario = data;
            this.patientService.comprobarRegistrado(this.usuario);
            this.traerDataCitas(this.usuario.patientId);
          }
        });
      }
    });
  }
  // Traer data desde spring
  traerDataCitas(patientId: number) {
    this.appointmentService.findByPatientId(patientId).subscribe(
      (data) => {
        this.citas = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  //Abri el modal centrado
  openCentrado(contenido, patientAppointment: PatientAppointment) {
    this.citaModal = patientAppointment;
    //Abrir modal
    this.modal.open(contenido, { size: 'lg', centered: true });
  }
  //Generar pdf
  generarPdfCita(idCita: number) {
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      title: 'Generando reporte',
      text: 'por favor espere',
      timer: 5000,
      onOpen: () => {
        Swal.showLoading();
      },
    });
    this.jasperService.generarReporteCita(idCita).subscribe(
      (x) => {
        let w: any;
        w = window.navigator;
        const blob = new Blob([x], { type: 'application/pdf' });
        if (w && w.msSaveOrOpenBlob) {
          w.msSaveOrOpenBlob(blob);
          return;
        }
        const nombreArchivo = idCita;
        saveAs(blob, nombreArchivo);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  calificarCita(cita: PatientAppointment) {
    this.modal.dismissAll();
    const modalRef = this.modal.open(RatingCitasComponent, {
      centered: true,
    });
    modalRef.componentInstance.cita = cita;
    modalRef.componentInstance.passEntry.subscribe(() => {
      this.traerDataCitas(this.usuario.patientId);
      modalRef.close();
    });
  }

  abrirModalInformativo() {
    const modalRef = this.modal.open(ModalVideoComponent, {
      centered: true,
      windowClass: 'my-class',
    });
    const video: InfoVideo =
      this.informacionDermaService.getVideoPacienteCitas();
    modalRef.componentInstance.titulo = video.titulo;
    modalRef.componentInstance.urlVideo = video.url;
  }
}
