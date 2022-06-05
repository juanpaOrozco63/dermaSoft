import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { Patient } from '../../domains/patient';
import { PatientService } from '../../services/patient.service';
const LONGITUD_MINIMA_NOMBRE = 3;
const LONGITUD_MAXIMA_NOMBRE = 50;
const LONGITUD_MINIMA_TELEFONO = 7;
const LONGITUD_MAXIMA_TELEFONO = 10;
const ALTURA_MINIMA = 20;
const ALTURA_MAXIMA = 250;
const PESO_MINIMO = 5;
const PESO_MAXIMO = 250;
const NUMBER_PATTERN = '^[0-9]+$';
const NAMES_PATTERN =
  '^[a-zA-ZÀ-ÿ\u00f1\u00d1_]+(\\s+[a-zA-ZÀ-ÿ\u00f1\u00d1_]+)*$';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
})
export class PatientProfileComponent implements OnInit {
  email: String;
  patient: Patient = new Patient(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
  //Forms
  formActualizar: FormGroup;
  // Fecha actual
  public fechaActual = new Date().toISOString().split('T')[0];
  constructor(
    private patientService: PatientService,
    private imageService: ImageService,
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('Email');
    this.findPatient(this.email);
    this.crearFormulario();
  }

  crearFormulario() {
    this.formActualizar = this.fb.group({
      correo: [this.email, [Validators.required]],
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_NOMBRE),
          Validators.maxLength(LONGITUD_MAXIMA_NOMBRE),
          Validators.pattern(NAMES_PATTERN),
        ],
      ],
      primerApellido: [
        null,
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_NOMBRE),
          Validators.maxLength(LONGITUD_MAXIMA_NOMBRE),
          Validators.pattern(NAMES_PATTERN),
        ],
      ],
      segundoApellido: [
        null,
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_NOMBRE),
          Validators.maxLength(LONGITUD_MAXIMA_NOMBRE),
          Validators.pattern(NAMES_PATTERN),
        ],
      ],
      fechaNacimiento: [null, [Validators.required]],
      telefono: [
        null,
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_TELEFONO),
          Validators.maxLength(LONGITUD_MAXIMA_TELEFONO),
          Validators.pattern(NUMBER_PATTERN),
        ],
      ],
      alto: [
        null,
        [
          Validators.required,
          Validators.min(ALTURA_MINIMA),
          Validators.max(ALTURA_MAXIMA),
        ],
      ],
      peso: [
        null,
        [
          Validators.required,
          Validators.min(PESO_MINIMO),
          Validators.max(PESO_MAXIMO),
        ],
      ],
    });
  }
  findPatient(email) {
    this.patientService.findByEmail(email).subscribe(async (data) => {
      this.patient = data;
      //
      this.formActualizar.get('nombre')?.setValue(this.patient.firstName);
      this.formActualizar
        .get('primerApellido')
        ?.setValue(this.patient.lastName);
      this.formActualizar
        .get('segundoApellido')
        ?.setValue(this.patient.lastName2);
      this.formActualizar
        .get('fechaNacimiento')
        ?.setValue(
          this.datepipe.transform(this.patient.birthdate, 'yyyy-MM-dd')
        );
      this.formActualizar.get('telefono')?.setValue(this.patient.phone);
      this.formActualizar.get('alto')?.setValue(this.patient.height);
      this.formActualizar.get('peso')?.setValue(this.patient.weight);
    });
  }

  actualizarPaciente() {
    this.patient.firstName = this.formActualizar.get('nombre')?.value;
    this.patient.lastName = this.formActualizar.get('primerApellido')?.value;
    this.patient.lastName2 = this.formActualizar.get('segundoApellido')?.value;
    let fechita = new Date(this.formActualizar.get('fechaNacimiento')?.value);
    let horas = fechita.setHours(fechita.getHours() + 5);
    this.patient.birthdate = fechita;
    this.patient.phone = this.formActualizar.get('telefono')?.value;
    this.patient.height = this.formActualizar.get('alto')?.value;
    this.patient.weight = this.formActualizar.get('peso')?.value;
    this.patientService.update(this.patient).subscribe(
      (data) => {
        this.patientService.comprobarRegistrado(data);
        Swal.fire(
          'Paciente',
          `${
            data.firstName + ' ' + data.lastName + ' ' + data.lastName2
          } fue actualizado`,
          'success'
        );
      },
      (err) => {
        Swal.fire('Paciente', `No se logro actualizar`, 'error');

        console.error(err);
      }
    );
  }

  obtenerImagen(imgUser: string): string {
    return this.imageService.getImage(imgUser);
  }
  isValidFieldDatosForm(field: string) {
    return (
      (this.formActualizar.get(field)?.dirty ||
        this.formActualizar.get(field)?.touched) &&
      this.formActualizar.get(field)?.invalid
    );
  }
}
