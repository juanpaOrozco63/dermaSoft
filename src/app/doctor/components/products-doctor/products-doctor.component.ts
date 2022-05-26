import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/domains/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
const INACTIVO: string = 'I';
const URL_PATTERN = /^(ftp|http|https):\/\/[^ "]+$/;
@Component({
  selector: 'app-products-doctor',
  templateUrl: './products-doctor.component.html',
  styleUrls: ['./products-doctor.component.css'],
})
export class ProductsDoctorComponent implements OnInit {
  //Forms
  formSugerirProducto: FormGroup;
  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formSugerirProducto = this.fb.group({
      nombre: [null, [Validators.required]],
      urlCompra: [null, [Validators.required, Validators.pattern(URL_PATTERN)]],
      descripcion: [null, [Validators.required]],
      urlImagen: [null, [Validators.required, Validators.pattern(URL_PATTERN)]],
    });
  }

  sugerirProducto() {
    const nombre: string = this.formSugerirProducto.get('nombre').value;
    const urlCompra: string = this.formSugerirProducto.get('urlCompra').value;
    const descripcion: string =
      this.formSugerirProducto.get('descripcion').value;
    const urlImagen: string = this.formSugerirProducto.get('urlImagen').value;
    const product: Product = new Product(
      descripcion,
      urlImagen,
      nombre,
      null,
      INACTIVO,
      urlCompra,
      new Date()
    );
    this.productService.save(product).subscribe(
      (data) => {
        this.formSugerirProducto.reset();
        this.formSugerirProducto.updateValueAndValidity();
        Swal.fire('Sugerido', 'Producto sugerido', 'success');
      },
      (err) => {
        Swal.fire('Error', 'Error al sugerir un nuevo registro', 'error');
      }
    );
  }
}
