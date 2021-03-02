import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/domains/city';
import { Eps } from 'src/app/domains/eps';
import { IdType } from 'src/app/domains/idType';
import { User } from 'src/app/domains/user';
import { RegisterPatient } from 'src/app/patient/domains/registerPatient';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { EpsService } from 'src/app/services/eps.service';
import { IdTypeService } from 'src/app/services/id-type.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public title: string = 'Register';
  //Objeto Login JWT
  public user: User;
  //Objeto para registrar patient
  public rol: RegisterPatient;
  //Arreglo de cities
  public cities: City[];
  //Arreglo de eps
  public epsArray: Eps[];
  //Arreglo de tipos de identificación
  public idType: IdType[];
  constructor(
    private authService: AuthService,
    private cityService: CityService,
    private epsService: EpsService,
    private idTypeService: IdTypeService,
    private authFirebaseService: AuthFirebaseService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    //Inicializar objeto login JWT
    this.user = new User('', '');
    //Inicializar objeto rol
    this.rol = new RegisterPatient(null, null, null, 'Y', 3, 'A', null, new Date(), 0, 0);
    //Método token jwt para registro
    this.tokenRegistro();
    //FindAll typeId
    this.findAllIdType();
  }

  //FindAll tipos de identificación
  public findAllIdType(): void {
    this.idType = this.idTypeService.findAll();
  }

  //Método token jwt para registro
  public tokenRegistro(): void {
    //Asigna valores al objeto login JWT
    this.user.username = 'admin';
    this.user.password = 'password';
    //Petición token jwt para registro
    this.authService.loginUser(this.user).subscribe(
      (data) => {
        //Almacenar toker registro en localStorage
        localStorage.setItem('tokenR', data.token);
        //Método findAllCities
        this.findAllCities();
        //Método findAllEps
        this.findAllEps();
      },
      (err) => { }
    );
  }

  //Método findAllCities
  public findAllCities(): void {
    this.cityService.findAll().subscribe(
      (data) => {
        this.cities = data;
        this.cities.sort((a, b) => a.description.localeCompare(b.description));
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Método findAllEps
  public findAllEps(): void {
    this.epsService.findAll().subscribe(
      (data) => {
        this.epsArray = data;
        this.epsArray.sort((a, b) => a.epsName.localeCompare(b.epsName));
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Registro pacientes
  register(idTy: string, cityI: number, epsI: number) {
    //Guardamos la contraseña
    let pass = this.rol.password;
    //Asignacion de valores al objeto paciente
    this.rol.identificationType = idTy;
    this.rol.cityI = cityI;
    this.rol.epsI = epsI;
    //Registro en firebase
    this.authFirebaseService
      .registerFirebase(this.rol.email, this.rol.password)
      .then((result) => {
        //Asignamos la contrasela encriptada de firebase al paciente
        this.rol.password = result.user.uid;
        //Registro en la bd del paciente
        this.rolService.registerPatient(this.rol).subscribe(
          (data) => {
            //Inicializar objeto rol
            this.rol = new RegisterPatient(null, null, null, 'Y', 3, 'A', null, new Date(), 0, 0);
            Swal.fire(
              'Registro éxitoso',
              'Te has registrado con éxito, verifica tu email',
              'success'
            );
          },
          (err) => {
            //Se elimina usuario de firebase si el registro en la bd no fue exitoso
            this.authFirebaseService.delete().then();
            //Se vuelve a poner la contraseña anterior
            this.rol.password = pass;
            Swal.fire({
              icon: 'error',
              title: 'Registro fallido',
              text: 'Documento ya registrado',
            });
          }
        );
      })
      .catch((error) => {
        //Se vuelve a poner la contraseña anterior
        this.rol.password = pass;
        Swal.fire({
          icon: 'error',
          title: 'Registro fallido',
          text: error.message,
        });
      });
  }
}
