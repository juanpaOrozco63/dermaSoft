import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/doctor/domains/doctor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/doctor/services/doctor.service';
import Swal from 'sweetalert2';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/domains/rol';

@Component({
  selector: 'app-doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css'],
})
export class DoctorAdminComponent implements OnInit {
  pageActual: number = 1;

  // Declaraciones de la clase
  public strTitle: String = 'Doctores';
  public identificacion: number = null;
  // Arreglo de doctores
  public doctors: Doctor[];
  // Doctor edit
  public doctorModal: Doctor;
  // Rol edit
  public rolEdit: Rol;
  // Fecha parseada
  public fechaParseada: any;
  constructor(
    public doctorService: DoctorService,
    public modal: NgbModal,
    public rolService: RolService
  ) {}

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
        this.identificacion = null;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //Método para traer un doctor por su id
  findById(id: number): void {
    if (Boolean(id)) {
      this.doctorService.findById(id).subscribe((data) => {
        if (data) {
          this.doctors = [];
          this.doctors.push(data);
        } else {
          Swal.fire('Error', 'No se encontraron doctores', 'error');
        }
      });
    } else {
      this.findAll();
    }
  }

  //Abri el modal centrado
  openCentrado(contenido, doc: Doctor) {
    //Asignamos el doctor especifico al doctor del modal para modificar
    this.doctorModal = doc;
    //Parseamos la fecha de nacimiento
    if (this.doctorModal.birthday) {
      this.fechaParseada = this.doctorModal.birthday.toString().slice(0, 10);
    }

    //Abrir modal
    this.modal.open(contenido, { centered: true });
  }

  //Editar doctor
  editar() {
    //Asignamos el valor de la fecha al objeto paciente
    this.doctorModal.birthday = this.fechaParseada;
    //Actualizar doctor
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      title: 'Cargando',
      text: 'por favor espere',
      onOpen: () => {
        Swal.showLoading();
        this.doctorService.update(this.doctorModal).subscribe(
          (data) => {
            this.modal.dismissAll();
            Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              icon: 'success',
              title: 'Doctor',
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

  //Inactivar doctor
  inactivarD(doc: Doctor): void {
    this.rolEdit = new Rol('', '', '', '', 0, '', '', null);
    this.rolService.findById(doc.userId).subscribe((data) => {
      if (data) {
        this.rolEdit = data;
        this.rolEdit.state = 'I';
        this.rolService.update(this.rolEdit).subscribe(
          (data) => {
            Swal.fire('Doctor', `${data.email} ahora esta inactivo `, 'warning');
            this.findAll();
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
  }

  //Activar doctor
  activarD(doc: Doctor): void {
    this.rolEdit = new Rol('', '', '', '', 0, '', '', null);
    this.rolService.findById(doc.userId).subscribe((data) => {
      if (data) {
        this.rolEdit = data;
        this.rolEdit.state = 'A';
        this.rolService.update(this.rolEdit).subscribe(
          (data) => {
            Swal.fire('Doctor', `${data.email} ahora esta activo `, 'success');
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
