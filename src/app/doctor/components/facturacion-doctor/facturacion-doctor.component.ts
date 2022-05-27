import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import Swal from 'sweetalert2';
import { Doctor } from '../../domains/doctor';
import { DoctorSubscriptionService } from '../../services/doctor-subscription.service';
import { DoctorService } from '../../services/doctor.service';
import { FacturacionService } from '../../services/facturacion.service';
import {
  DoctorSubscription,
  Membresia,
  PaymentMethod,
  Subscription,
} from './facturacion-doctor.model';
const MINIMO_CVV = 100;
const MAXIMO_CVV = 999;
const LONGITUD_MINIMA_TARJETA = 15;
const LONGITUD_MAXIMA_TARJETA = 16;
const PATRON_TARJETA = '^[0-9]+$';
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
  public subscriptions: Subscription[];
  // Declaracion de formulario
  doctorSubForm: FormGroup;
  // Membresia activa
  membActiva: boolean = false;
  // Subscripcion actual
  membActual: Subscription = null;
  subActual: DoctorSubscription = null;
  fechaSubFin: Date = new Date();
  public fechaActual = new Date().toISOString().split('T')[0];
  constructor(
    public doctorService: DoctorService,
    private authFirebaseService: AuthFirebaseService,
    public appointmentService: AppointmentService,
    private facturacionService: FacturacionService,
    private doctorSubService: DoctorSubscriptionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findAllPayments();
    this.findAllSubscriptions();
    this.findUserFire();
    this.crearFormularioSubscription();
  }
  buscarActiva() {
    this.subActual = JSON.parse(localStorage.getItem('subActual'));
    if (this.subActual !== null) {
      this.membActiva = true;
      this.membActual = this.findMembresiaPorId(this.subActual.subscriptionId);
      const duracion = this.membActual.duration;
      this.fechaSubFin = new Date(this.subActual.membershipDate);
      this.fechaSubFin.setMonth(this.fechaSubFin.getMonth() + duracion);
    }
  }
  crearFormularioSubscription() {
    this.doctorSubForm = this.formBuilder.group({
      membresiaId: [null, [Validators.required]],
      numeroTarjeta: [
        null,
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_TARJETA),
          Validators.maxLength(LONGITUD_MAXIMA_TARJETA),
          Validators.pattern(PATRON_TARJETA),
        ],
      ],
      tipoTarjeta: [null, [Validators.required]],
      fechaTarjeta: [null, [Validators.required]],
      cvvTarjeta: [
        null,
        [
          Validators.required,
          Validators.min(MINIMO_CVV),
          Validators.max(MAXIMO_CVV),
          Validators.pattern(PATRON_TARJETA),
        ],
      ],
    });
  }
  isValidFieldDatosForm(field: string) {
    return (
      (this.doctorSubForm.get(field)?.dirty ||
        this.doctorSubForm.get(field)?.touched) &&
      this.doctorSubForm.get(field)?.invalid
    );
  }
  findAllPayments() {
    this.payments = this.facturacionService.findAllPayments();
  }
  findAllSubscriptions() {
    this.facturacionService.findAllSubscriptions().subscribe((data) => {
      this.subscriptions = data;
      this.buscarActiva();
    });
  }
  //Traer usuario firebase
  findUserFire(): void {
    this.userF$.subscribe((data) => {
      if (data) {
        this.doctorService.findByEmail(data.email).subscribe((data) => {
          if (data) {
            this.usuario = data;
            this.doctorService.comprobarRegistrado(this.usuario);
          }
        });
      }
    });
  }

  findMembresiaByDoctorId(doctorId: number) {
    this.doctorSubService.findByDoctorId(doctorId).subscribe((data) => {
      const arraySubs: DoctorSubscription[] = data;
      arraySubs.forEach((sub) => {
        if (sub.state === 'A') {
          this.membActiva = true;
          this.subActual = sub;
          localStorage.setItem('subActual', JSON.stringify(sub));
        }
      });
      this.membActual = this.findMembresiaPorId(this.subActual.subscriptionId);
      const duracion = this.membActual.duration;
      this.fechaSubFin = new Date(this.subActual.membershipDate);
      this.fechaSubFin.setMonth(this.fechaSubFin.getMonth() + duracion);
    });
  }

  findMembresiaPorId(membresiaId: number): Subscription {
    let membresia: Subscription = null;
    this.subscriptions.forEach((sub) => {
      if (sub.subscriptionId === membresiaId) {
        membresia = sub;
      }
    });
    return membresia;
  }
  guardarMembresia() {
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      title: 'Cargando',
      text: 'por favor espere',
      onOpen: () => {
        Swal.showLoading();
        let doctorSub: DoctorSubscription = {
          doctorId: this.usuario.doctorId,
          doctorSubscriptionId: null,
          membershipDate: null,
          state: null,
          subscriptionId: this.doctorSubForm.controls.membresiaId.value,
        };

        this.doctorSubService.save(doctorSub).subscribe(
          (data) => {
            this.findMembresiaByDoctorId(this.usuario.doctorId);
            Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              icon: 'success',
              title: 'Se ha generado su pago exitosamente',
            });
          },
          (error) => {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              title: `No hemos podido generar el pago`,
              text: `Revise los datos`,
            });
          }
        );
      },
    });
  }
}
