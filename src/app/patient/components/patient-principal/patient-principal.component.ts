import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Observable } from 'rxjs/internal/Observable';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Patient } from '../../domains/patient';
import { PatientService } from '../../services/patient.service';
@Component({
  selector: 'app-patient-principal',
  templateUrl: './patient-principal.component.html',
  styleUrls: ['./patient-principal.component.css'],
})
export class PatientPrincipalComponent implements OnInit {
  // Usuario fire
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  // Crear paciente
  public usuario: Patient;
  constructor(
    private route: Router,
    private authFirebaseService: AuthFirebaseService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.findUserFire();
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
    });
  }
  //Traer usuario firebase
  findUserFire() {
    this.userF$.subscribe((data) => {
      if (data) {
        this.patientService.findByEmail(data.email).subscribe((data) => {
          if (data) {
            this.usuario = data;
            this.patientService.comprobarRegistrado(this.usuario);
          }
        });
      }
    });
  }
  closeSession() {
    localStorage.setItem('Role', '');
    this.route.navigate(['/login']);
  }
}
