import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { ImageService } from 'src/app/services/image.service';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-patient-doctor',
  templateUrl: './patient-doctor.component.html',
  styleUrls: ['./patient-doctor.component.css'],
})
export class PatientDoctorComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Mis pacientes';
  // Usuario
  public usuario: Doctor;
  public patients: any;
  // Usuario firebase
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  constructor(
    public doctorService: DoctorService,
    private imageService: ImageService,
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
  //Método para traer todos los pacientes
  findAll(): void {
    //Traer pacientes
    this.appointmentService
      .findPatientsByDoctorId(this.usuario.doctorId)
      .subscribe(
        (data) => {
          //Asignamos la data al arreglo de pacientes
          this.patients = data;
          console.log(this.patients);
        },
        (error) => {
          console.error(error);
        }
      );
  }
  obtenerImagen(imgUsr: string) {
    return this.imageService.getImage(imgUsr);
  }
}
