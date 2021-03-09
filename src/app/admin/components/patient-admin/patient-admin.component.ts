import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/patient/domains/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-patient-admin',
  templateUrl: './patient-admin.component.html',
  styleUrls: ['./patient-admin.component.css'],
})
export class PatientAdminComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Pacientes';
  // Arreglo de pacientes
  public patients: Patient[];
  // Paciente edit
  public patModal: Patient;
  constructor(public patientService: PatientService, public modal: NgbModal) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.patientService.findAll().subscribe(
      (data) => {
        this.patients = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  openCentrado(contenido, pat: Patient) {
    this.patModal = pat;
    this.modal.open(contenido, { centered: true });
  }

  editar(): void {
    this.patientService.update(this.patModal).subscribe(
      (data) => {
        this.modal.dismissAll();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
