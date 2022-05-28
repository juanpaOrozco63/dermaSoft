import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { ImageService } from 'src/app/services/image.service';
import { RatingService } from 'src/app/services/rating.service';
import { RatingDoctor } from 'src/app/shared/model/rating-doctor.model';
import { Rating } from 'src/app/shared/model/rating.model';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-ratings-doctor',
  templateUrl: './ratings-doctor.component.html',
  styleUrls: ['./ratings-doctor.component.css'],
})
export class RatingsDoctorComponent implements OnInit {
  // Arreglo de ratings
  public ratings: RatingDoctor[];
  // Usuario
  public usuario: Doctor;
  // Usuario firebase
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  //valoracion
  public valoracion = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  tipoCalificacion: any[] = [
    { id: 5, descripcion: 'Excelente', cantidad: 0 },
    { id: 4, descripcion: 'Buena', cantidad: 0 },
    { id: 3, descripcion: 'Regular', cantidad: 0 },
    { id: 2, descripcion: 'Mala', cantidad: 0 },
    { id: 1, descripcion: 'Terrible', cantidad: 0 },
  ];
  constructor(
    private doctorService: DoctorService,
    private authFirebaseService: AuthFirebaseService,
    private ratingService: RatingService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.findUserFire();
  }
  //Traer usuario firebase
  findUserFire(): void {
    this.userF$.subscribe((data) => {
      if (data) {
        this.doctorService.findByEmail(data.email).subscribe((data) => {
          if (data) {
            this.usuario = data;
            this.valoracion =
              this.usuario.reputation != null ? this.usuario.reputation : 0;
            this.doctorService.comprobarRegistrado(this.usuario);
            this.findAll();
          }
        });
      }
    });
  }

  //Método para traer todas las calificaciones
  findAll(): void {
    //Traer calificaciones
    this.ratingService.findByDoctorId(this.usuario.doctorId).subscribe(
      (data) => {
        //Asignamos la data al arreglo de calificaiones
        this.ratings = data;
        if (this.ratings.length > 0) {
          this.ratings.forEach((r) => this.upsert(r.ratingValue));
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  upsert(calificacion: number) {
    const i = this.tipoCalificacion.findIndex((tc) => tc.id === calificacion);
    if (i > -1) {
      let elemento = this.tipoCalificacion[i];
      elemento.cantidad += 1;
      this.tipoCalificacion[i] = elemento;
    }
  }
  obtenerImagen(imgUsr: string) {
    return this.imageService.getImage(imgUsr);
  }
}
