import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/domains/product';
import { Treatment } from 'src/app/domains/treatment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ProductService } from 'src/app/services/product.service';
import { TreatmentService } from 'src/app/services/treatment.service';
import { FinalizarCitaDTO } from '../../domains/finalizarCita';
import Swal from 'sweetalert2';
import { createHostListener } from '@angular/compiler/src/core';

@Component({
  selector: 'app-finalizar-cita',
  templateUrl: './finalizar-cita.component.html',
  styleUrls: ['./finalizar-cita.component.css'],
})
export class FinalizarCitaComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Finalizar cita';
  public idCita: any;
  // Objeto finalizar cita
  public finalizarCitaDTO: FinalizarCitaDTO;
  // Lista de productos
  public productos: Product[];
  // Tratamiento
  public treatment: Treatment;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private productService: ProductService,
    private treatmentService: TreatmentService
  ) {}

  ngOnInit(): void {
    this.idCita = this.route.snapshot.paramMap.get('id');
    this.treatment = new Treatment(
      null,
      1,
      0,
      'A',
      0,
      new Date(),
      this.idCita,
      0
    );
    this.buscarDetallesAppointment(this.idCita);
    this.findAllProducts();
  }

  buscarDetallesAppointment(appointmentId: number) {
    this.appointmentService.finalizarCita(appointmentId).subscribe(
      (data) => {
        this.finalizarCitaDTO = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  findAllProducts() {
    this.productService.findAll().subscribe(
      (data) => {
        if (data) {
          this.productos = data;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  agregarTratamiento() {
    this.treatmentService.save(this.treatment).subscribe(
      (data) => {
        Swal.fire({
          title: '¿Desea agregar más productos al tratamiento?',
          showDenyButton: true,
          allowOutsideClick: false,
          confirmButtonText: `SI`,
          denyButtonText: `NO`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Tratamiento agregado', '', 'success');
            this.treatment.productI = null;
            this.treatment.quantity = 0;
            this.treatment.description = null;
          } else if (result.isDenied) {
            console.log('Finalizar pdf');
            this.appointmentService
              .cerrarCita(this.idCita)
              .subscribe((data) => {
                this.router.navigate(['/doctor-principal/home']);
              });
          }
        });
      },
      (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: `No se han diligenciado bien los campos`,
          text: err.error.error,
        });
      }
    );
  }
}
