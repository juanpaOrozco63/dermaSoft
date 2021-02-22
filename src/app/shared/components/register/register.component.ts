import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/domains/city';
import { Eps } from 'src/app/domains/eps';
import { IdType } from 'src/app/domains/idType';
import { User } from 'src/app/domains/user';
import { Patient } from 'src/app/patient/domains/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { EpsService } from 'src/app/services/eps.service';
import { IdTypeService } from 'src/app/services/id-type.service';

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
  //Arreglo de cities
  public cities: City[];
  //Arreglo de eps
  public epsArray: Eps[];
  //Arreglo de tipos de identificación
  public idType: IdType[];
  constructor(private router: Router, private authService: AuthService, private patientService: PatientService, private cityService: CityService, private epsService: EpsService, private idTypeService: IdTypeService) { }

  ngOnInit(): void {
    //Inicializar objeto login JWT
    this.user = new User("", "");
    //Inicializar objeto patient
    this.patient = new Patient(null, null, '', null, null, '', null, null, null, null, '', '', null, 'N', new Date(), 'N', 0, 0);
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
    this.user.username = "admin";
    this.user.password = "password";
    //Petición token jwt para registro
    this.authService.loginUser(this.user).subscribe(
      data => {
        //Almacenar toker registro en localStorage
        localStorage.setItem('tokenR', data.token);
        //Método findAllCities
        this.findAllCities();
        //Método findAllEps
        this.findAllEps();
      }, err => {
        console.error(err.error.error);
      }
    );
  }

  //Método findAllCities
  public findAllCities(): void {
    this.cityService.findAll().subscribe(
      data => {
        this.cities = data;
        this.cities.sort(
          (a, b) => a.description.localeCompare(b.description)
        );
      }, err => {
        console.error(err);
      }
    );
  }

  //Método findAllEps
  public findAllEps(): void {
    this.epsService.findAll().subscribe(
      data => {
        this.epsArray = data;
        this.epsArray.sort(
          (a, b) => a.epsName.localeCompare(b.epsName)
        );
      }, err => {
        console.error(err);
      }
    );
  }

  //Método registrar paciente
  public registrarPaciente(): void {
    this.patientService.saveRegistro(this.patient).subscribe(
      data => {
        console.log('REGISTRADO');
        this.router.navigate(['/login']);
      }, err => {
        console.error(err);
      }
    );

  }

}
