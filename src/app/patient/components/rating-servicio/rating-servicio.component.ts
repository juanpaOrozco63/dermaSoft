import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/services/image.service';
import { RatingService } from 'src/app/services/rating.service';
import { RatingDoctor } from 'src/app/shared/model/rating-doctor.model';

@Component({
  selector: 'app-rating-servicio',
  templateUrl: './rating-servicio.component.html',
  styleUrls: ['./rating-servicio.component.css'],
})
export class RatingServicioComponent implements OnInit {
  @Input()
  public doctorId: number;
  // Arreglo de ratings
  public ratings: RatingDoctor[];
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(
    public modal: NgbModal,
    private ratingService: RatingService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }
  //Método para traer todas las calificaciones
  findAll(): void {
    //Traer calificaciones
    this.ratingService.findByDoctorId(this.doctorId).subscribe(
      (data) => {
        //Asignamos la data al arreglo de calificaiones
        this.ratings = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  obtenerImagen(imgUsr: string) {
    return this.imageService.getImage(imgUsr);
  }
}
