import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-facturacion-doctor',
  templateUrl: './facturacion-doctor.component.html',
  styleUrls: ['./facturacion-doctor.component.css'],
})
export class FacturacionDoctorComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Facturacion';
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
          }
        });
      }
    });
  }
}
