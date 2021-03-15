import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../domains/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
 // Declaraciones de la clase
 public strTitle: String = 'Productos';
 // Arreglo de pacientes
 public products: Product[];
 // Paciente edit
 public patModal: Product;
  constructor(public productService:ProductService, public modal: NgbModal) { }

  ngOnInit(): void {
    this.findAll()
  }
  findAll(): void {
    // Método traer todos los pacientes
    this.productService.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de pacientes
        this.products = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  openCentrado(contenido, pat: Product) {
    //Asignamos el paciente especifico al paciente que se mostrara en el modal
    this.patModal = pat;
    //Mostramos el modal
    this.modal.open(contenido, { centered: true });
  }
  editar(): void {
    //Actualizamos el paciente
    this.productService.update(this.patModal).subscribe(
      (data) => {
        this.modal.dismissAll();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
