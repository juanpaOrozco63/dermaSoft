import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';
import { User } from 'src/app/domains/user';
import { PatientService } from 'src/app/patient/services/patient.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = '¡Bienvenido!';
  //Objeto Login JWT
  public user: User;
  //Login
  public strIdentification: string = '';
  public strPassword: string = '';
  //Form
  formLogin:FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService,
    private patientService: PatientService,
    private rolService: RolService,
    private authFirebaseService: AuthFirebaseService,
    private fb:FormBuilder  ) {

    this.crearFormulario();
    this.cargarDataFormulario();
  }

  ngOnInit(): void {
    //Inicializar objeto login JWT
    this.user = new User('', '');
  }

  //Método para ingresar
  public ingresar(): void {
    //Asigna valores al objeto login JWT
    if (!this.formLogin.invalid) {  
      Swal.fire({
        allowOutsideClick:false,
        icon: 'info',
        title: 'Cargando',
        text:'por favor espere'
        })  
    this.user.username = 'admin';
    this.user.password = 'password';
    //Petición token JWT
    this.authService.loginUser(this.user).subscribe(
      (data) => {
        //Asignamos el token en el localStorage
        localStorage.setItem('token', data.token);
        //Buscamos el usuario por el numero de documento
        this.rolService.findById(this.strIdentification).subscribe((data) => {
          if (data) {
            //Login en firebase
            this.authFirebaseService
              .loginFirebase(data.email, this.strPassword)
              .then(
                
                (result) => {   
                  //Dirigimos a la respectiva pagina principal si el login es exitoso
                  if (data.role === 1) {  
                    Swal.fire({
                      allowOutsideClick:false,
                      icon: 'success',
                      title:'Bienvenido',
                      text:`${data.email}`                    
                      })                    
                    this.router.navigate(['/admin-principal/home']);
                  } else if (data.role === 2) {
                    Swal.fire({
                      allowOutsideClick:false,
                      icon: 'success',
                      title:'Bienvenido',
                      text:`${data.email}`                    
                      })       
                    this.router.navigate(['/doctor-principal']);
                  } else if (data.role === 3) {
                    Swal.fire({
                      allowOutsideClick:false,
                      icon: 'success',
                      title:'Bienvenido',
                      text:`${data.email}`                    
                      })       
                    this.router.navigate(['/patient-principal/home']);
                  }
                },
                (err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Inicio de sesión fallido',
                    text: 'Revisa tus datos',
                  });
                }
              )
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Inicio de sesión fallido',
                  text: 'Revisa tus datos',
                });
              });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Inicio de sesión fallido',
              text: 'Revisa tus datos',
            });
          }
        });
      },
      (err) => {
      }
    );
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Campos vacios',
      text: 'Complete los campos',
    });
  }
  } 
  // Método para crear formulario
  crearFormulario(){
    this.formLogin=this.fb.group({
      nIdentificacion:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  // Método para cargar data por defecto en el formulario
  cargarDataFormulario(){
    this.formLogin.reset({
      nIdentificacion:'',
      password:''
    });
    
  }
  // Método para obtener el valor del campo de nIdentificacion
  public get nIdentificacionNoValido() {
    return this.formLogin.get('nIdentificacion').invalid && this.formLogin.get('nIdentificacion').touched
   
   }
   // Método para obtener el valor del campo password
   public get passNoValido() {
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched
   
   }
}


