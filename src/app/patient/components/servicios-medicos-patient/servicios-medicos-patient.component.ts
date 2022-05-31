import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/doctor/domains/doctor';
import { DoctorService } from 'src/app/doctor/services/doctor.service';
import { Appointment } from 'src/app/domains/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { ImageService } from 'src/app/services/image.service';
import { InformacionDermaService } from 'src/app/services/informacion-derma.service';
import { ModalVideoComponent } from 'src/app/shared/components/modal-video/modal-video.component';
import { InfoVideo } from 'src/app/shared/model/info-video.modal';
import Swal from 'sweetalert2';
import { Patient } from '../../domains/patient';
import { PatientService } from '../../services/patient.service';
import { RatingServicioComponent } from '../rating-servicio/rating-servicio.component';

@Component({
  selector: 'app-servicios-medicos-patient',
  templateUrl: './servicios-medicos-patient.component.html',
  styleUrls: ['./servicios-medicos-patient.component.css'],
})
export class ServiciosMedicosPatientComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Dermatólogos disponibles';
  // Arreglo de doctores
  public doctors: Doctor[];
  // Doctor edit
  public doctorModal: Doctor;
  // Cita modal
  public citaModal: Appointment;
  // Divison de arreglo entre 3
  public division: number;
  public arrayDiv: number[] = [];
  // Usuario firebase
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  // Usuario
  public usuario: Patient;
  // Fecha actual
  public fechaActual: any = new Date();
  constructor(
    public doctorService: DoctorService,
    public appointmentService: AppointmentService,
    private imageService: ImageService,
    public modal: NgbModal,
    private authFirebaseService: AuthFirebaseService,
    public patientService: PatientService,
    private informacionDermaService: InformacionDermaService
  ) {}

  ngOnInit(): void {
    this.abrirModalInformativo();
    this.fechaActual.setDate(new Date().getDate() + 1);
    this.fechaActual = this.fechaActual.toISOString().split('T')[0];
    this.asignarCitaModal();
    this.findAll();
    this.findUserFire();
  }
  asignarCitaModal() {
    this.citaModal = new Appointment(
      0,
      null,
      null,
      1,
      null,
      'A',
      new Date(),
      0,
      0
    );
  }
  //Método para traer todos los doctores
  findAll(): void {
    //Traer doctores
    this.doctorService.findAll().subscribe(
      (data: Doctor[]) => {
        //Asignamos la data al arreglo de doctores
        this.doctors = data
          .filter((d) => d.verified === 'Y')
          .map((d) => {
            if (!Boolean(d.reputation)) {
              d.reputation = 1;
            }
            return d;
          });
        this.division = this.doctors.length / 3;
        let numeroSlides = Math.ceil(this.division);
        let inicio = -1;
        //this.arrayDiv = this.crearArrayConNumerosHasta();
        for (let index = 0; index < numeroSlides; index++) {
          this.arrayDiv.push(inicio);

          inicio += 3;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Traer usuario firebase
  findUserFire(): void {
    this.userF$.subscribe((data) => {
      if (data) {
        this.patientService.findByEmail(data.email).subscribe((data) => {
          this.usuario = data;
          this.patientService.comprobarRegistrado(this.usuario);
        });
      }
    });
  }
  //Abri el modal centrado
  openCentrado(contenido, doc: Doctor) {
    //Asignamos el doctor especifico al doctor del modal para que el paciente pueda pedir una cita
    this.doctorModal = doc;
    this.asignarCitaModal();
    //Abrir modal
    this.modal.open(contenido, { centered: true });
  }

  //Guardar la cita
  guardarCita(hora: number) {
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      title: 'Cargando',
      text: 'por favor espere',
      onOpen: () => {
        Swal.showLoading();
        let fecha = new Date(this.citaModal.date);
        let horas = +hora + +5;
        fecha.setTime(fecha.getTime() + horas * 60 * 60 * 1000);
        this.citaModal.date = fecha;
        this.citaModal.doctorI = this.doctorModal.doctorId;
        this.citaModal.patientI = this.usuario.patientId;
        this.appointmentService.save(this.citaModal).subscribe(
          (data) => {
            Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              icon: 'success',
              title: 'Se ha generado su cita satisfactoriamente',
              text: `Motivo ${data.reason}`,
            });
            this.modal.dismissAll();
          },
          (error) => {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              title: `No hemos podido generar su cita`,
              text: `Complete los datos`,
            });
          }
        );
      },
    });
  }
  prueba(p: any) {
    console.log(p);
  }

  crearArrayConNumerosHasta(tope: number) {
    return Array.from({ length: tope }, (v, k) => k + 1);
  }
  obtenerImagen(imgUser: string): string {
    return this.imageService.getImage(imgUser);
  }

  validarCitaModal(): boolean {
    if (
      new Date(this.citaModal.date) >= new Date() &&
      this.citaModal.description?.length > 0 &&
      this.citaModal.reason?.length > 0
    ) {
      return true;
    }
    return false;
  }

  revisarCalificacion(doctorId: number) {
    const modalRef = this.modal.open(RatingServicioComponent, {
      centered: true,
    });
    modalRef.componentInstance.doctorId = doctorId;
  }
  abrirModalInformativo() {
    const modalRef = this.modal.open(ModalVideoComponent, {
      centered: true,
      windowClass: 'my-class',
    });
    const video: InfoVideo =
      this.informacionDermaService.getVideoPacienteServicios();
    modalRef.componentInstance.titulo = video.titulo;
    modalRef.componentInstance.urlVideo = video.url;
  }
}
