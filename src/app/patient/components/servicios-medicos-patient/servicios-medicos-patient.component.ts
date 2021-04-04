import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/doctor/domains/doctor';
import { DoctorService } from 'src/app/doctor/services/doctor.service';
import { Appointment } from 'src/app/domains/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Patient } from '../../domains/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-servicios-medicos-patient',
  templateUrl: './servicios-medicos-patient.component.html',
  styleUrls: ['./servicios-medicos-patient.component.css'],
})
export class ServiciosMedicosPatientComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Dermatólogos disponibles';
  // Arreglo de doctores
  public doctors: Doctor[];
  // Doctor edit
  public doctorModal: Doctor;
  // Cita modal
  public citaModal: Appointment;
  // Divison de arreglo entre 3
  public division: number;
  // Usuario firebase
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  // Usuario
  public usuario: Patient;
  constructor(
    public doctorService: DoctorService,
    public appointmentService: AppointmentService,
    public modal: NgbModal,
    private authFirebaseService: AuthFirebaseService,
    public patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.citaModal = new Appointment(
      0,
      null,
      null,
      1,
      null,
      'A',
      new Date(),
      0,
      0
    );
    this.findAll();
    this.findUserFire();
  }

  //Método para traer todos los doctores
  findAll(): void {
    //Traer doctores
    this.doctorService.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de doctores
        this.doctors = data;
        this.division = this.doctors.length / 3;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Traer usuario firebase
  findUserFire(): void {
    this.userF$.subscribe((data) => {
      if (data) {
        this.patientService.findByEmail(data.email).subscribe((data) => {
          this.usuario = data;
        });
      }
    });
  }
  //Abri el modal centrado
  openCentrado(contenido, doc: Doctor) {
    //Asignamos el doctor especifico al doctor del modal para que el paciente pueda pedir una cita
    this.doctorModal = doc;

    //Abrir modal
    this.modal.open(contenido, { centered: true });
  }

  //Guardar la cita
  guardarCita() {
    this.citaModal.doctorI = this.doctorModal.doctorId;
    this.citaModal.patientI = this.usuario.patientId;
    this.appointmentService.save(this.citaModal).subscribe(
      (data) => {
        console.log(data);

        this.modal.dismissAll();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
