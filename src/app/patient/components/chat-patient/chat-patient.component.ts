import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Doctor } from 'src/app/doctor/domains/doctor';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { EventoCambioChat } from 'src/app/shared/model/evento-cambio-chat.model';
import { UsuarioGenerico } from 'src/app/shared/model/usuario-generico.model';
import { Patient } from '../../domains/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-chat-patient',
  templateUrl: './chat-patient.component.html',
  styleUrls: ['./chat-patient.component.css'],
})
export class ChatPatientComponent implements OnInit {
  // Usuario fire
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  // Crear paciente
  public usuario: Patient;
  // Listado de doctores
  public doctores: Doctor[];
  // Usuario activo chat
  public usuarioActivoChat: UsuarioGenerico = null;
  constructor(
    private appointmentService: AppointmentService,
    private authFirebaseService: AuthFirebaseService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
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
            this.findAll();
          }
        });
      }
    });
  }
  //Método para traer todos los doctores
  findAll(): void {
    //Traer pacientes
    this.appointmentService
      .findDoctorsByPatientId(this.usuario.patientId)
      .subscribe(
        (data) => {
          //Asignamos la data al arreglo de doctores
          this.doctores = data;
          console.log(this.doctores);
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

  mapDoctorsToGeneric(): UsuarioGenerico[] {
    return this.doctores?.map((d: Doctor) => {
      const name = d.firstName + ' ' + d.lastName;
      return new UsuarioGenerico(d.doctorId, name, d.image);
    });
  }

  mapPatientToGeneric(): UsuarioGenerico {
    const name = this.usuario?.firstName + ' ' + this.usuario?.lastName;
    return new UsuarioGenerico(
      this.usuario?.patientId,
      name,
      this.usuario?.image
    );
  }
}
