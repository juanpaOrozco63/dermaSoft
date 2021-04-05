import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientAppointment } from 'src/app/domains/patientAppointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-citas-doctor',
  templateUrl: './citas-doctor.component.html',
  styleUrls: ['./citas-doctor.component.css'],
})
export class CitasDoctorComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Mis pacientes';
  // Arreglo de patientAppointment
  public patientAppointments: PatientAppointment[];
  // Usuario
  public usuario: Doctor;
  // Usuario firebase
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  constructor(
    public doctorService: DoctorService,
    private authFirebaseService: AuthFirebaseService,
    public appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.findUserFire();
  }

  //Traer usuario firebase
  findUserFire(): void {
    this.userF$.subscribe((data) => {
      if (data) {
        this.doctorService.findByEmail(data.email).subscribe((data) => {
          this.usuario = data;
          this.findAll();
        });
      }
    });
  }

  //Método para traer todos los pacientes
  findAll(): void {
    //Traer pacientes
    this.appointmentService.findByDoctorId(this.usuario.doctorId).subscribe(
      (data) => {
        //Asignamos la data al arreglo de pacientes
        this.patientAppointments = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
