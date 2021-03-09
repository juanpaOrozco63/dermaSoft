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
  constructor(public doctorService: DoctorService, public modal: NgbModal) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.doctorService.findAll().subscribe(
      (data) => {
        this.doctors = data;
        console.log(this.doctors);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  openCentrado(contenido, doc: Doctor) {
    this.doctorModal = doc;
    this.modal.open(contenido, { centered: true });
  }

  editar() {
    console.log(this.doctorModal);
    this.doctorService.update(this.doctorModal).subscribe(
      (data) => {
        this.modal.dismissAll();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
