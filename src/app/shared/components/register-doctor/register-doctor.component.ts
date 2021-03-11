import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPatient } from '../../../patient/domains/registerPatient';
import Swal from 'sweetalert2';
import { User } from '../../../domains/user';
import { RolService } from '../../../services/rol.service';
import { AuthFirebaseService } from '../../../services/auth-firebase.service';
import { IdTypeService } from '../../../services/id-type.service';
import { EpsService } from '../../../services/eps.service';
import { CityService } from '../../../services/city.service';
import { AuthService } from '../../../services/auth.service';
import { IdType } from '../../../domains/idType';
import { Eps } from '../../../domains/eps';
import { City } from '../../../domains/city';
import { RegisterDoctor } from 'src/app/doctor/domains/registerDoctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css'],
})
export class RegisterDoctorComponent implements OnInit {
  public title: string = 'Registro Doctor';
  //Objeto Login JWT
  public user: User;
  //Objeto para registrar doctor
  public rol: RegisterDoctor;
  //Arreglo de cities
  public cities: City[];
  //Arreglo de tipos de identificación
  public idType: IdType[];
  //Forms
  formRegister: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cityService: CityService,
    private epsService: EpsService,
    private idTypeService: IdTypeService,
    private authFirebaseService: AuthFirebaseService,
    private rolService: RolService,
    private fb: FormBuilder
  ) {
    this.crearFormulario();
    this.cargarDataFormulario();
  }

  ngOnInit(): void {
    //Inicializar objeto login JWT
    this.user = new User('', '');
    //Inicializar objeto rol
    this.rol = new RegisterDoctor(
      null,
      null,
      null,
      'Y',
      2,
      'A',
      null,
      new Date(),
      0
    );
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
      },
      (err) => {}
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

  //Registro pacientes
  register(idTy: string, cityI: number) {
    //Guardamos la contraseña
    let pass = this.rol.password;
    //Asignacion de valores al objeto paciente
    this.rol.identificationType = idTy;
    this.rol.cityI = cityI;
    //Registro en firebase
    this.authFirebaseService
      .registerFirebase(this.rol.email, this.rol.password)
      .then((result) => {
        //Asignamos la contrasela encriptada de firebase al paciente
        this.rol.password = result.user.uid;
        //Registro en la bd del paciente
        this.rolService.registerDoctor(this.rol).subscribe(
          (data) => {
            //Inicializar objeto rol
            this.rol = new RegisterDoctor(
              null,
              null,
              null,
              'Y',
              2,
              'A',
              null,
              new Date(),
              0
            );
            Swal.fire(
              'Registro éxitoso',
              'Te has registrado con éxito, verifica tu email',
              'success'
            );
            this.router.navigate(['/login']);
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
  // Método para crear formulario
  crearFormulario() {
    this.formRegister = this.fb.group({
      nIdentificacion: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9,-]+.[a-z]{2,3}$'),
          Validators.email,
        ],
      ],
      tIdentificacion: [[Validators.required]],
      ciudad: [[Validators.required]],
      eps: [[Validators.required]],
    });
  }
  // Método para cargar data por defecto en el formulario
  cargarDataFormulario() {
    this.formRegister.reset({
      nIdentificacion: '',
      password: '',
      correo: '',
    });
  }
  // Método para obtener el valor del campo de nIdentificacion
  public get nIdentificacionNoValido() {
    return (
      this.formRegister.get('nIdentificacion').invalid &&
      this.formRegister.get('nIdentificacion').touched
    );
  }
  // Método para obtener el valor del campo password
  public get passNoValido() {
    return (
      this.formRegister.get('password').invalid &&
      this.formRegister.get('password').touched
    );
  }
  // Método para obtener el valor del campo correo
  public get correoNoValido() {
    return (
      this.formRegister.get('correo').invalid &&
      this.formRegister.get('correo').touched
    );
  }
  // Método para obtener el valor del campo tipo de identificación
  public get tIdentificacionNoValido() {
    return (
      this.formRegister.get('tIdentificacion').invalid &&
      this.formRegister.get('tIdentificacion').touched
    );
  }
  // Método para obtener el valor del campo de ciudad
  public get ciudadNoValido() {
    return (
      this.formRegister.get('ciudad').invalid &&
      this.formRegister.get('ciudad').touched
    );
  }
}
