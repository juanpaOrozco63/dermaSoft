import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css'],
})
export class RestorePasswordComponent implements OnInit {
  public title: string = '¿Olvidó su contraseña?';
  //Forms
  formRestore: FormGroup;
  constructor(
    private authFirebaseService: AuthFirebaseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }
  // Método para crear formulario
  crearFormulario() {
    this.formRestore = this.fb.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9,-]+.[a-z]{2,3}$'),
          Validators.email,
        ],
      ],
    });
  }

  //
  async restore() {
    try {
      const correo = this.formRestore.get('correo').value;
      await this.authFirebaseService.resetPassword(correo);
      Swal.fire(
        'Email enviado a ' + correo,
        'Revisa tu bandeja de entrada para reestablecer la contraseña',
        'success'
      );
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  }
}
