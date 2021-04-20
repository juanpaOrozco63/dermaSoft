import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PatientAppointment } from 'src/app/domains/patientAppointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Patient } from '../../domains/patient';
import { PatientService } from '../../services/patient.service';

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
  constructor(
    private modal: NgbModal,
    private appointmentService: AppointmentService,
    private authFirebaseService: AuthFirebaseService,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.findUserFire();
  }
  //Traer usuario firebase
  findUserFire() {
    this.userF$.subscribe((data) => {
      if (data) {
        this.patientService.findByEmail(data.email).subscribe((data) => {
          if (data) {
            this.usuario = data;
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
}
