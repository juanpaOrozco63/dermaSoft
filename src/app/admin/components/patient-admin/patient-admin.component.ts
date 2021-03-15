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
  // Fecha parseada
  public fechaParseada: any;
  // Variables
  pageActual:number=1;

  constructor(public patientService: PatientService, public modal: NgbModal) {}

  ngOnInit(): void {
    this.findAll();
  }
  
  findAll(): void {
    // Método traer todos los pacientes
    this.patientService.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de pacientes
        this.patients = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  openCentrado(contenido, pat: Patient) {
    //Asignamos el paciente especifico al paciente que se mostrara en el modal
    this.patModal = pat;
    //Parseamos la fecha de nacimiento
    this.fechaParseada = this.patModal.birthdate.toString().slice(0, 10);
    //Mostramos el modal
    this.modal.open(contenido, { centered: true });
  }

  editar(): void {
    //Asignamos el valor de la fecha al objeto paciente
    this.patModal.birthdate = this.fechaParseada;
    //Actualizamos el paciente
    this.patientService.update(this.patModal).subscribe(
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
