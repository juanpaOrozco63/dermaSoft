import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';
import { FacturacionService } from '../../services/facturacion.service';
import {
  Membresia,
  PaymentMethod,
  Subscription
} from './facturacion-doctor.model';

@Component({
  selector: 'app-facturacion-doctor',
  templateUrl: './facturacion-doctor.component.html',
  styleUrls: ['./facturacion-doctor.component.css'],
})
export class FacturacionDoctorComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Membresía';
  // Usuario
  public usuario: Doctor;
  // Usuario firebase
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  // Membresía model
  public purchase: Membresia = new Membresia();
  // Metodos de pago
  public payments: PaymentMethod[];
  // Membresias
  public subscriptions: Observable<Subscription[]>;
  constructor(
    public doctorService: DoctorService,
    private authFirebaseService: AuthFirebaseService,
    public appointmentService: AppointmentService,
    private facturacionService: FacturacionService
  ) {}

  ngOnInit(): void {
    console.log(this.facturacionService.pruebita);

    this.findAllPayments();
    this.findAllSubscriptions();
    this.findUserFire();
  }
  findAllPayments() {
    this.payments = this.facturacionService.findAllPayments();
  }
  findAllSubscriptions() {
    this.subscriptions = this.facturacionService.findAllSubscriptions();
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
