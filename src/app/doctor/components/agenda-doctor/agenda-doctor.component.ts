import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { AuthFirebaseService } from '../../../services/auth-firebase.service';
import { Observable, Subject } from 'rxjs';
import { Patient } from '../../../patient/domains/patient';
import { NgbModal, NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../../services/appointment.service';
import { PatientService } from '../../../patient/services/patient.service';
import { isSameDay, isSameMonth } from 'date-fns';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../domains/doctor';

@Component({
  selector: 'app-agenda-doctor',
  templateUrl: './agenda-doctor.component.html',
  styleUrls: ['./agenda-doctor.component.css'],
})
export class AgendaDoctorComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  // Usuario fire
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  // Crear paciente
  public usuario: Doctor;
  // Objeto citas
  citas: any[];
  //Traer usuario firebase
  findUserFire() {
    this.userF$.subscribe((data) => {
      if (data) {
        this.doctorService.findByEmail(data.email).subscribe((data) => {
          if (data) {
            this.usuario = data;
            this.traerDataCitas(this.usuario.doctorId);
          }
        });
      }
    });
  }
  // Traer data desde spring
  traerDataCitas(doctorId: number) {
    this.appointmentService.findByDoctorId(doctorId).subscribe(
      (data) => {
        this.citas = data;
        this.llenarAgenda();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // Llenar agenda
  llenarAgenda() {
    this.citas.forEach((cita) => {
      let y = new Date(cita.date);
      let x = new Date(cita.date);
      x.setHours(y.getHours() + 1);
      this.events = [
        ...this.events,
        {
          title: cita.description,
          id: cita.firstName + ' ' + cita.lastName,
          start: y,
          end: x,
        },
      ];
    });
  }
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Editar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Eliminar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  constructor(
    private modal: NgbModal,
    private appointmentService: AppointmentService,
    private authFirebaseService: AuthFirebaseService,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.findUserFire();
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'md' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
