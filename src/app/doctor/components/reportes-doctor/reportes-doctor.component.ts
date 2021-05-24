import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CantidadCitasAno } from 'src/app/domains/cantidadCitasAno';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-reportes-doctor',
  templateUrl: './reportes-doctor.component.html',
  styleUrls: ['./reportes-doctor.component.css'],
})
export class ReportesDoctorComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Reportes';
  // Arreglo de cantidadCitas
  public cantCitasAnual: CantidadCitasAno[];
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
          if (data) {
            this.usuario = data;
            this.findAll();
          }
        });
      }
    });
  }

  //Método para traer cantidad de citas por mes
  findAll(): void {
    //Traer pacientes
    this.appointmentService.reporteDoctor(this.usuario.doctorId).subscribe(
      (data) => {
        //Asignamos la data al arreglo de cantCitas
        this.cantCitasAnual = data;
        console.log(this.cantCitasAnual);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
