import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { PatientAppointment } from 'src/app/domains/patientAppointment';
import { ImageService } from 'src/app/services/image.service';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/shared/model/rating.model';

@Component({
  selector: 'app-rating-citas',
  templateUrl: './rating-citas.component.html',
  styleUrls: ['./rating-citas.component.css'],
})
export class RatingCitasComponent implements OnInit {
  @Input()
  public cita: PatientAppointment;
  @Output()
  public passEntry: EventEmitter<any> = new EventEmitter();
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  description: string = '';
  constructor(
    private imageService: ImageService,
    private ratingService: RatingService,
    public modal: NgbModal
  ) {}

  ngOnInit(): void {
  }

  calificar() {
    const rating: Rating = {
      appointmentId: this.cita.appointmentId,
      ratingId: null,
      ratingValue: this.selectedValue,
      ratingDescription: this.description,
    };
    this.ratingService.save(rating).subscribe((data) => {
      this.passEntry.emit(data);
    });
  }

  countStar(star) {
    this.selectedValue = star;
  }

  obtenerImagen(imgUsr: string) {
    return this.imageService.getImage(imgUsr);
  }
}
