import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';
import { User } from 'src/app/domains/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title: String = 'Login';
  //Objeto Login JWT
  public user: User;
  //Login
  public strIdentification: string = '';
  public strPassword: string = '';

  constructor(private router: Router, private authService: AuthService, private adminService: AdminService) { }

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
            console.error(err.error.error);
          }
        );
      }, err => {
        console.error(err);
      }
    );
  }

}
