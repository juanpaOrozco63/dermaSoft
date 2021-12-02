import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';
import { Membresia, PaymentMethod, Subscription } from './facturacion-doctor.model';

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
  public purchase:Membresia=new Membresia();
  // Metodos de pago
  public payments:PaymentMethod[];
  // Membresias
  public subscriptions:Subscription[]
  constructor(
    public doctorService: DoctorService,
    private authFirebaseService: AuthFirebaseService,
    public appointmentService: AppointmentService
  ) {
    this.payments =[
      {
      payId:1,
      name:'MASTER CARD'
      },
      {
        payId:2,
        name:'VISA'
      },
      {
        payId:3,
        name:'AMERICAN EXPRESS'
      },
      {
        payId:4,
        name:'PAYPAL'
      }
    ]
    this.subscriptions = [
      {
        subscriptionId:1,
        name:'Bronce',
        price:1000000,
        description:'Dura 3 meses'
      },
      {
        subscriptionId:2,
        name:'Plata',
        price:2000000,
        description:'Dura 6 meses'
      },
      {
        subscriptionId:3,
        name:'Platino',
        price:3000000,
        description:'Dura 1 año'
      }
    ]
  }

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
