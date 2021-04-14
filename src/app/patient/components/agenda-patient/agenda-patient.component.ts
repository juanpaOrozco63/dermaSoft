import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientAppointment } from 'src/app/domains/patientAppointment';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../domains/patient';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-agenda-patient',
  templateUrl: './agenda-patient.component.html',
  styleUrls: ['./agenda-patient.component.css'],
})
export class AgendaPatientComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  // Usuario fire
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  // Crear paciente
  public usuario: Patient;
  // Objeto citas
  citas: any[];

    ngOnInit() {
      this.findUserFire();
      
  }

  //Traer usuario firebase
     findUserFire() {
      this.userF$.subscribe((data) => {
      if ( data) {
         this.patientService.findByEmail(data.email).subscribe((data) => {
          if (data) {
            this.usuario = data;
              this.traerDataCitas(this.usuario.patientId);
          }
        });
      }
    });
  }
  // Traer data desde spring
    traerDataCitas(patientId: number) {
     this.appointmentService.findByPatientId(patientId).subscribe(
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
      let x = new Date(cita.date)
      x.setHours(x.getHours()+1)
      this.events = [
        ...this.events,
        {
          title:cita.description,
          id: cita.description,
          start: new Date(cita.date),
          end:x,
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
    private patientService: PatientService
  ) {}

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

  addEvent(): void {
    // this.events = [
    //   ...this.events,
    //   {
    //     title: '',
    //     start: startOfDay(new Date()),
    //     end: endOfDay(new Date()),
    //     color: colors.red,
    //     draggable: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];
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
