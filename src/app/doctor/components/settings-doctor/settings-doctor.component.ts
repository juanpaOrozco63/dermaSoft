import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import Swal from 'sweetalert2';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';
const URL_PATTERN = /^(ftp|http|https):\/\/[^ "]+$/;
const LONGITUD_MINIMA_NOMBRE = 3;
const LONGITUD_MAXIMA_NOMBRE = 50;
const LONGITUD_MINIMA_DESCRIPCION = 10;
const LONGITUD_MAXIMA_DESCRIPCION = 150;
const LONGITUD_MINIMA_TELEFONO = 7;
const LONGITUD_MAXIMA_TELEFONO = 10;
const NUMBER_PATTERN = '^[0-9]+$';
const NAMES_PATTERN =
  '^[a-zA-ZÀ-ÿ\u00f1\u00d1_]+(\\s+[a-zA-ZÀ-ÿ\u00f1\u00d1_]+)*$';
const DESCRIPTION_PATTERN =
  '^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1_]+(\\s+[a-zA-ZÀ-ÿ0-9\u00f1\u00d1_]+)*$';
@Component({
  selector: 'app-settings-doctor',
  templateUrl: './settings-doctor.component.html',
  styleUrls: ['./settings-doctor.component.css'],
})
export class SettingsDoctorComponent implements OnInit {
  fechaMaxima: string;
  email: String;
  doctor: Doctor = new Doctor(
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
  constructor(
    private doctorService: DoctorService,
    private imageService: ImageService,
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.email = localStorage.getItem('Email');
    this.inicializarFechaMaximaNacimiento();
    this.findDoctor(this.email);
    this.crearFormulario();
  }
  inicializarFechaMaximaNacimiento() {
    let fechaM = new Date();
    fechaM.setFullYear(fechaM.getFullYear() - 18);
    this.fechaMaxima = fechaM.toISOString().split('T')[0];
  }
  crearFormulario() {
    this.formActualizar = this.fb.group({
      correo: [this.email, [Validators.required]],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_NOMBRE),
          Validators.maxLength(LONGITUD_MAXIMA_NOMBRE),
          Validators.pattern(NAMES_PATTERN),
        ],
      ],
      primerApellido: [
        '',
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_NOMBRE),
          Validators.maxLength(LONGITUD_MAXIMA_NOMBRE),
          Validators.pattern(NAMES_PATTERN),
        ],
      ],
      segundoApellido: [
        '',
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_NOMBRE),
          Validators.maxLength(LONGITUD_MAXIMA_NOMBRE),
          Validators.pattern(NAMES_PATTERN),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_DESCRIPCION),
          Validators.maxLength(LONGITUD_MAXIMA_DESCRIPCION),
          Validators.pattern(DESCRIPTION_PATTERN),
        ],
      ],
      fechaNacimiento: ['', [Validators.required]],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_TELEFONO),
          Validators.maxLength(LONGITUD_MAXIMA_TELEFONO),
          Validators.pattern(NUMBER_PATTERN),
        ],
      ],
      precio: ['', [Validators.required, Validators.pattern(NUMBER_PATTERN)]],
      facebookUrl: ['', [Validators.pattern(URL_PATTERN)]],
      instagramUrl: ['', [Validators.pattern(URL_PATTERN)]],
      twitterUrl: ['', [Validators.pattern(URL_PATTERN)]],
    });
  }

  findDoctor(email) {
    this.doctorService.findByEmail(email).subscribe(async (data) => {
      this.doctor = data;
      console.log(this.doctor);

      //
      this.formActualizar.get('nombre')?.setValue(this.doctor.firstName);
      this.formActualizar.get('primerApellido')?.setValue(this.doctor.lastName);
      this.formActualizar
        .get('segundoApellido')
        ?.setValue(this.doctor.lastName2);
      this.formActualizar.get('descripcion')?.setValue(this.doctor.description);
      this.formActualizar
        .get('fechaNacimiento')
        ?.setValue(this.datepipe.transform(this.doctor.birthday, 'yyyy-MM-dd'));
      this.formActualizar.get('telefono')?.setValue(this.doctor.phone);
      this.formActualizar.get('precio')?.setValue(this.doctor.price);
      this.formActualizar.get('facebookUrl')?.setValue(this.doctor.facebookUrl);
      this.formActualizar
        .get('instagramUrl')
        ?.setValue(this.doctor.instagramUrl);
      this.formActualizar.get('twitterUrl')?.setValue(this.doctor.twitterUrl);
    });
  }

  actualizarDoctor() {
    this.doctor.firstName = this.formActualizar.get('nombre')?.value;
    this.doctor.lastName = this.formActualizar.get('primerApellido')?.value;
    this.doctor.lastName2 = this.formActualizar.get('segundoApellido')?.value;
    this.doctor.description = this.formActualizar.get('descripcion')?.value;
    let fechita = new Date(this.formActualizar.get('fechaNacimiento')?.value);
    let horas = fechita.setHours(fechita.getHours() + 5);
    this.doctor.birthday = fechita;
    this.doctor.phone = this.formActualizar.get('telefono')?.value;
    this.doctor.price = this.formActualizar.get('precio')?.value;
    this.doctor.facebookUrl = this.formActualizar.get('facebookUrl')?.value;
    this.doctor.instagramUrl = this.formActualizar.get('instagramUrl')?.value;
    this.doctor.twitterUrl = this.formActualizar.get('twitterUrl')?.value;
    this.doctorService.update(this.doctor).subscribe(
      (data) => {
        this.doctorService.comprobarRegistrado(data);
        Swal.fire(
          'Doctor',
          `${
            data.firstName + ' ' + data.lastName + ' ' + data.lastName2
          } sus datos fueron actualizados con éxito`,
          'success'
        );
      },
      (err) => {
        Swal.fire('Doctor', `No se logro actualizar`, 'error');

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
