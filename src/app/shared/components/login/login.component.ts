import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';
import { User } from 'src/app/domains/user';
import { PatientService } from 'src/app/patient/services/patient.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Welcome!';
  //Objeto Login JWT
  public user: User;
  //Login
  public strIdentification: string = '';
  public strPassword: string = '';

  constructor(private router: Router, private authService: AuthService, private adminService: AdminService, private patientService: PatientService) { }

  ngOnInit(): void {
    //Inicializar objeto login JWT
    this.user = new User("", "");
  }

  //Método login
  public ingresar(): void {
    //Asigna valores al objeto login JWT
    this.user.username = "admin";
    this.user.password = "password";
    //Petición token JWT
    this.authService.loginUser(this.user).subscribe(
      data => {
        localStorage.setItem("token", data.token);
        //Método login admin
        this.adminService.loginAdmin(this.strIdentification, this.strPassword).subscribe(
          data => {
            this.router.navigate(['/admin-principal']);
          }, err => {
            Swal.fire({
              title: 'Error!',
              text: `Number identification or password incorrect`,
              icon: 'error',
              confirmButtonText: 'Ok'
            })
            //Método login patient
            this.patientService.loginPaciente(this.strIdentification, this.strPassword).subscribe(
              data => {
                this.router.navigate(['/admin-principal']);
              }, err => {
              }
            );
          }
        );
      }, err => {
      }
    );
  }

}
