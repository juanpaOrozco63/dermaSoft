import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ImageService } from 'src/app/services/image.service';
import { isThursday } from 'date-fns';
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
      nombre: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    });
  }

  findDoctor(email) {
    this.doctorService.findByEmail(email).subscribe(async (data) => {
      this.doctor = data;
      //
      this.formActualizar.get('nombre')?.setValue(this.doctor.firstName);
      this.formActualizar.get('primerApellido')?.setValue(this.doctor.lastName);
      this.formActualizar
        .get('segundoApellido')
        ?.setValue(this.doctor.lastName2);
      this.formActualizar
        .get('fechaNacimiento')
        ?.setValue(this.datepipe.transform(this.doctor.birthday, 'yyyy-MM-dd'));
      this.formActualizar.get('telefono')?.setValue(this.doctor.phone);
      this.formActualizar.get('precio')?.setValue(this.doctor.price);
    });
  }

  actualizarDoctor() {
    this.doctor.firstName = this.formActualizar.get('nombre')?.value;
    this.doctor.lastName = this.formActualizar.get('primerApellido')?.value;
    this.doctor.lastName2 = this.formActualizar.get('segundoApellido')?.value;
    let fechita = new Date(this.formActualizar.get('fechaNacimiento')?.value);
    let horas = fechita.setHours(fechita.getHours() + 5);
    this.doctor.birthday = fechita;
    this.doctor.phone = this.formActualizar.get('telefono')?.value;
    this.doctor.price = this.formActualizar.get('precio')?.value;
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
}
