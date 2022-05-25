import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class RegistradoPacienteGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const completos: boolean = JSON.parse(
      localStorage.getItem('datosCompletos')
    );
    if (completos === null) {
      return true;
    }
    if (completos) {
      return true;
    } else {
      this.router.navigate(['/patient-principal/perfil']);
      Swal.fire(
        'Completar datos',
        'Para utilizar todos los servicios disponibles, debes completar tus datos personales',
        'warning'
      );
      return false;
    }
  }
}
