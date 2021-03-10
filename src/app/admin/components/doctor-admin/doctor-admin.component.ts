import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/doctor/domains/doctor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css'],
})
export class DoctorAdminComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Doctores';
  // Arreglo de doctores
  public doctors: Doctor[];
  // Paciente edit
  public doctorModal: Doctor;
  // Fecha parseada
  public fechaParseada: any;
  constructor(public doctorService: DoctorService, public modal: NgbModal) {}

  ngOnInit(): void {
    this.findAll();
  }

  //Método para traer todos los doctores
  findAll(): void {
    //Traer doctores
    this.doctorService.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de doctores
        this.doctors = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Abri el modal centrado
  openCentrado(contenido, doc: Doctor) {
    //Asignamos el doctor especifico al doctor del modal para modificar
    this.doctorModal = doc;
    //Parseamos la fecha de nacimiento
    this.fechaParseada = this.doctorModal.birthday.toString().slice(0, 10);
    //Abrir modal
    this.modal.open(contenido, { centered: true });
  }

  //Editar doctor
  editar() {
    //Asignamos el valor de la fecha al objeto paciente
    this.doctorModal.birthday = this.fechaParseada;
    //Actualizar doctor
    this.doctorService.update(this.doctorModal).subscribe(
      (data) => {
        this.modal.dismissAll();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Formatear fecha para mostrar
  getFormattedDate(data) {
    let dd = new Date(data).getUTCDate().toString();
    let mm = new Date(data).getMonth().toString();
    let yy = new Date(data).getFullYear().toString();
    return new Date(Number(yy), Number(mm), Number(dd));
  }
}
