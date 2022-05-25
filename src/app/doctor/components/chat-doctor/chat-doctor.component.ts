import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Patient } from 'src/app/patient/domains/patient';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { EventoCambioChat } from 'src/app/shared/model/evento-cambio-chat.model';
import { UsuarioGenerico } from 'src/app/shared/model/usuario-generico.model';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-chat-doctor',
  templateUrl: './chat-doctor.component.html',
  styleUrls: ['./chat-doctor.component.css'],
})
export class ChatDoctorComponent implements OnInit {
  // Usuario fire
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  // Crear doctor
  public usuario: Doctor;
  // Listado de pacientes
  public pacientes: Patient[];
  // Usuario activo chat
  public usuarioActivoChat: UsuarioGenerico = null;
  constructor(
    private appointmentService: AppointmentService,
    private authFirebaseService: AuthFirebaseService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.findUserFire();
  }
  //Traer usuario firebase
  findUserFire() {
    this.userF$.subscribe((data) => {
      if (data) {
        this.doctorService.findByEmail(data.email).subscribe((data) => {
          if (data) {
            this.usuario = data;
            this.doctorService.comprobarRegistrado(this.usuario);
            this.findAll();
          }
        });
      }
    });
  }
  //Método para traer todos los pacientes
  findAll(): void {
    //Traer pacientes
    this.appointmentService
      .findPatientsByDoctorId(this.usuario.doctorId)
      .subscribe(
        (data) => {
          //Asignamos la data al arreglo de pacientes
          this.pacientes = data;
          console.log(this.pacientes);
        },
        (error) => {
          console.error(error);
        }
      );
  }
  actualizarChat(evento: EventoCambioChat) {
    if (evento.usuario != null) {
      if (this.usuarioActivoChat?.id != evento.usuario?.id)
        this.usuarioActivoChat = evento.usuario;
    }
  }

  mapPatientsToGeneric(): UsuarioGenerico[] {
    return this.pacientes?.map((p: Patient) => {
      const name = p.firstName + ' ' + p.lastName;
      return new UsuarioGenerico(p.patientId, name, p.image);
    });
  }

  mapDoctorToGeneric(): UsuarioGenerico {
    const name = this.usuario?.firstName + ' ' + this.usuario?.lastName;
    return new UsuarioGenerico(
      this.usuario?.doctorId,
      name,
      this.usuario?.image
    );
  }
}
