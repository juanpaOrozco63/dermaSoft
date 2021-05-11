import { Component, OnInit } from '@angular/core';
import { EpsService } from '../../../services/eps.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Eps } from '../../../domains/eps';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entidades-admin',
  templateUrl: './entidades-admin.component.html',
  styleUrls: ['./entidades-admin.component.css'],
})
export class EntidadesAdminComponent implements OnInit {
  pageActual: number = 1;
  public id: number = null;
  public strTitle = 'Entidades';
  // Arreglo de eps
  public eps: Eps[];
  // Eps edit
  public epsModal: Eps;
  // Doctor edit
  constructor(public epsService: EpsService, public modal: NgbModal) {}

  ngOnInit(): void {
    this.findAll();
  }
  //Método para traer todos las eps
  findAll(): void {
    //Traer doctores
    this.epsService.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de eps
        this.eps = data;
        this.id = null;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //Método para traer un doctor por su id
  findById(id: number): void {
    if (Boolean(id)) {
      this.epsService.findById(id).subscribe((data) => {
        if (data) {
          this.eps = [];
          this.eps.push(data);
        } else {
          Swal.fire('Error', 'No se encontraron eps', 'error');
        }
      });
    } else {
      this.findAll();
    }
  }
  inactivarE(eps: Eps): void {
    //Inactivamos producto
    eps.state = 'I';
    this.epsService.update(eps).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Eps', `${data.epsName} ahora esta inactivo`, 'warning');
        this.findAll();
      },
      (err) => {
        Swal.fire('Error', 'Error', 'error');
      }
    );
  }
  activarE(eps: Eps): void {
    //Inactivamos producto
    eps.state = 'A';
    this.epsService.update(eps).subscribe(
      (data) => {
        Swal.fire('Eps', `${data.epsName} ahora esta activo`, 'success');
        this.findAll();
      },
      (err) => {
        Swal.fire('Error', 'Error', 'error');
      }
    );
  }
  //Abri el modal centrado
  openCentrado(contenido, eps: Eps) {
    //Asignamos el doctor especifico al doctor del modal para modificar
    this.epsModal = eps;

    this.modal.open(contenido, { centered: true });
  }
  editar(): void {
    //Actualizamos la eps
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      title: 'Cargando',
      text: 'por favor espere',
      onOpen: () => {
        Swal.showLoading();
        this.epsService.update(this.epsModal).subscribe(
          (data) => {
            this.modal.dismissAll();
            Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              icon: 'success',
              title: 'Eps',
              text: `${data.epsName} se edito satisfactoriamente`,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      },
    });
  }
}
