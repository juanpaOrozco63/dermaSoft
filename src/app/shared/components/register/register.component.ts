import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/domains/user';
import { Patient } from 'src/app/patient/domains/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public title: string = 'Register';
  //Objeto Login JWT
  public user: User;
  //Objeto patient
  public patient: Patient;
  constructor(private router: Router, private authService: AuthService, private patientService: PatientService) { }

  ngOnInit(): void {
    //Inicializar objeto login JWT
    this.user = new User("", "");
    //Inicializar objeto patient
    this.patient = new Patient(null, null, '', null, null, '', null, null, null, null, '', '', null, null, new Date(), null, 0, 0);
  }

  //Método registrar paciente
  public registrarPaciente(): void {
    //Asigna valores al objeto login JWT
    this.user.username = "admin";
    this.user.password = "password";
    //Petición token jwt para registro
    this.authService.loginUser(this.user).subscribe(
      data => {
        localStorage.setItem('tokenR', data.token);
        //Método registrar paciente
        this.patientService.saveRegistro(this.patient).subscribe(
          data => {
            console.log('REGISTRADO');
            this.router.navigate(['/login']);
          }, err => {
            console.error(err.error.error);
          }
        );
      }, err => {
        console.error(err);
      }
    );
  }

}
