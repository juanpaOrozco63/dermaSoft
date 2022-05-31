import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/domains/product';
import { InformacionDermaService } from 'src/app/services/informacion-derma.service';
import { ProductService } from 'src/app/services/product.service';
import { ModalVideoComponent } from 'src/app/shared/components/modal-video/modal-video.component';
import { InfoVideo } from 'src/app/shared/model/info-video.modal';
const ACTIVO: string = 'A';
@Component({
  selector: 'app-products-patient',
  templateUrl: './products-patient.component.html',
  styleUrls: ['./products-patient.component.css'],
})
export class ProductsPatientComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Productos';
  // Arreglo de pacientes
  public products: Product[];
  constructor(
    public productService: ProductService,
    private modal: NgbModal,
    private informacionDermaService: InformacionDermaService
  ) {}

  ngOnInit(): void {
    this.abrirModal();
    this.findAll();
  }
  findAll(): void {
    // Método traer todos los pacientes
    this.productService.findAll().subscribe(
      (data: Product[]) => {
        //Asignamos la data al arreglo de pacientes
        this.products = data.filter((p) => p.state === ACTIVO);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  abrirModal() {
    const modalRef = this.modal.open(ModalVideoComponent, {
      centered: true,
      windowClass: 'my-class',
    });
    const video: InfoVideo =
      this.informacionDermaService.getVideoPacienteProductos();
    modalRef.componentInstance.titulo = video.titulo;
    modalRef.componentInstance.urlVideo = video.url;
  }
}
