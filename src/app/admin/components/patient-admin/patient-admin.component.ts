import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/patient/domains/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rol } from 'src/app/domains/rol';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-patient-admin',
  templateUrl: './patient-admin.component.html',
  styleUrls: ['./patient-admin.component.css'],
})
export class PatientAdminComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Pacientes';
  public identificacion: string = null;
  // Arreglo de pacientes
  public patients: Patient[];
  // Arreglo para filtrar pacientes
  public patientsFilter: Patient[];
  // Paciente edit
  public patModal: Patient;
  // Rol edit
  public rolEdit: Rol;
  // Fecha parseada
  public fechaParseada: any;
  // Variables
  pageActual: number = 1;

  constructor(
    public patientService: PatientService,
    public modal: NgbModal,
    public rolService: RolService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    // Método traer todos los pacientes
    this.patientService.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de pacientes
        this.patients = data;
        this.patientsFilter = data;
        this.identificacion = null;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  findByIdentificacion(identificacion: string) {
    const arreglito = this.patientsFilter.slice();
    this.patients = arreglito;
    if (Boolean(identificacion)) {
      this.patients = arreglito.filter((patient) =>
        patient.userId.includes(identificacion)
      );
    }
  }
  openCentrado(contenido, pat: Patient) {
    //Asignamos el paciente especifico al paciente que se mostrara en el modal
    this.patModal = pat;
    //Parseamos la fecha de nacimiento
    if (this.patModal.birthdate) {
      this.fechaParseada = this.patModal.birthdate.toString().slice(0, 10);
    }
    //Mostramos el modal
    this.modal.open(contenido, { centered: true });
  }

  editar(): void {
    //Asignamos el valor de la fecha al objeto paciente
    this.patModal.birthdate = this.fechaParseada;
    //Actualizamos el paciente
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      title: 'Cargando',
      text: 'por favor espere',
      onOpen: () => {
        Swal.showLoading();
        this.patientService.update(this.patModal).subscribe(
          (data) => {
            this.modal.dismissAll();
            Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              icon: 'success',
              title: 'Paciente',
              text: `${
                data.firstName + ' ' + data.lastName + ' ' + data.lastName2
              } se edito satisfactoriamente`,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      },
    });
  }

  //Formatear fecha para mostrar
  getFormattedDate(data) {
    let dd = new Date(data).getUTCDate().toString();
    let mm = new Date(data).getMonth().toString();
    let yy = new Date(data).getFullYear().toString();
    return new Date(Number(yy), Number(mm), Number(dd));
  }

  //Inactivar paciente
  inactivarP(pat: Patient): void {
    this.rolEdit = new Rol('', '', '', '', 0, '', '', null);
    this.rolService.findById(pat.userId).subscribe((data) => {
      if (data) {
        this.rolEdit = data;
        this.rolEdit.state = 'I';
        this.rolService.update(this.rolEdit).subscribe(
          (data) => {
            Swal.fire(
              'Paciente',
              `${data.email} ahora esta inactivo `,
              'warning'
            );
            this.findAll();
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
  }

  //Activar paciente
  activarP(pat: Patient): void {
    this.rolEdit = new Rol('', '', '', '', 0, '', '', null);
    this.rolService.findById(pat.userId).subscribe((data) => {
      if (data) {
        this.rolEdit = data;
        this.rolEdit.state = 'A';
        this.rolService.update(this.rolEdit).subscribe(
          (data) => {
            Swal.fire(
              'Paciente',
              `${data.email} ahora esta activado `,
              'success'
            );
            this.findAll();
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
  }
}
