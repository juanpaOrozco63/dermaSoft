import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../domains/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css'],
})
export class ProductsAdminComponent implements OnInit {
  public nombre: string = null;
  // Declaraciones de la clase
  public strTitle: String = 'Productos';
  // Arreglo de pacientes
  public products: Product[];
  // Arreglo de productos filter
  public productsFilter: Product[];
  // Paciente edit
  public patModal: Product;
  constructor(public productService: ProductService, public modal: NgbModal) {}

  ngOnInit(): void {
    this.findAll();
  }
  findAll(): void {
    // Método traer todos los pacientes
    this.productService.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de pacientes
        this.products = data;
        this.productsFilter = data;
        this.nombre = null;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  findByNombre(nombre: string) {
    const arreglito = this.productsFilter.slice();
    this.products = arreglito;
    if (Boolean(nombre)) {
      this.products = arreglito.filter((product) =>
        product.name.toLowerCase().includes(nombre.toLowerCase())
      );
    }
  }
  crearP(): void {
    this.productService.save(this.patModal).subscribe(
      (data) => {
        this.findAll();
        Swal.fire('Creado', 'Producto creado', 'success');
        this.modal.dismissAll();
      },
      (err) => {
        Swal.fire('Error', 'Error al crear un nuevo registro', 'error');
      }
    );
  }
  openCentrado(contenido, pat: Product) {
    //Asignamos el paciente especifico al paciente que se mostrara en el modal
    this.patModal = pat;
    //Mostramos el modal
    this.modal.open(contenido, { centered: true });
  }

  openCrear(crear) {
    this.patModal = new Product('', '', '', 15, 'A', '', new Date());
    //Mostramos el modal
    this.modal.open(crear, { centered: true });
  }
  editar(): void {
    //Actualizamos el paciente
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      title: 'Cargando',
      text: 'por favor espere',
      onOpen: () => {
        Swal.showLoading();
        this.productService.update(this.patModal).subscribe(
          (data) => {
            this.modal.dismissAll();
            Swal.fire({
              allowOutsideClick: false,
              allowEscapeKey: false,
              icon: 'success',
              title: 'Producto',
              text: `${data.description} se edito satisfactoriamente`,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      },
    });
  }

  inactivarP(product: Product): void {
    //Inactivamos producto
    product.state = 'I';
    this.productService.update(product).subscribe(
      (data) => {
        Swal.fire(
          'Producto',
          `${data.description} ahora esta inactivo`,
          'warning'
        );
        this.findAll();
      },
      (err) => {
        Swal.fire('Error', 'Error', 'error');
      }
    );
  }
  activarP(product: Product): void {
    //Inactivamos producto
    product.state = 'A';
    this.productService.update(product).subscribe(
      (data) => {
        Swal.fire(
          'Producto',
          `${data.description} ahora esta activo`,
          'success'
        );
        this.findAll();
      },
      (err) => {
        Swal.fire('Error', 'Error', 'error');
      }
    );
  }
}
