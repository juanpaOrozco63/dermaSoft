import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Observable } from 'rxjs/internal/Observable';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Doctor } from '../../domains/doctor';
import { DoctorSubscriptionService } from '../../services/doctor-subscription.service';
import { DoctorService } from '../../services/doctor.service';
import { DoctorSubscription } from '../facturacion-doctor/facturacion-doctor.model';

@Component({
  selector: 'app-doctor-principal',
  templateUrl: './doctor-principal.component.html',
  styleUrls: ['./doctor-principal.component.css'],
})
export class DoctorPrincipalComponent implements OnInit {
  // Usuario firebase
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  //
  private usuario: Doctor = null;
  constructor(
    private route: Router,
    private doctorSubService: DoctorSubscriptionService,
    private authFirebaseService: AuthFirebaseService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.findUserFire();
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
    });
  }
  closeSession() {
    localStorage.setItem('Role', '');
    localStorage.setItem('Email', '');
    this.route.navigate(['/login']);
  }
  //Traer usuario firebase
  findUserFire(): void {
    this.userF$.subscribe((data) => {
      if (data) {
        this.doctorService.findByEmail(data.email).subscribe((data) => {
          if (data) {
            this.usuario = data;
            this.buscarMembresia();
          }
        });
      }
    });
  }

  buscarMembresia() {
    this.doctorSubService
      .findByDoctorId(this.usuario.doctorId)
      .subscribe((data) => {
        if (data.length > 0) {
          const arraySubs: DoctorSubscription[] = data;
          arraySubs.forEach((sub) => {
            if (sub.state === 'A') {
              localStorage.setItem('subActual', JSON.stringify(sub));
            }
          });
        } else {
          localStorage.removeItem('subActual');
        }
      });
  }
}
