import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CantidadCitasAno } from 'src/app/domains/cantidadCitasAno';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Doctor } from '../../domains/doctor';
import { DoctorService } from '../../services/doctor.service';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-reportes-doctor',
  templateUrl: './reportes-doctor.component.html',
  styleUrls: ['./reportes-doctor.component.css'],
})
export class ReportesDoctorComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SEPTIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: new Date().getFullYear().toString(),
    },
  ];
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  //--------------------------------------------------------------
  // Declaraciones de la clase
  public strTitle: String = 'Reportes';
  // Arreglo de cantidadCitas
  public cantCitasAnual: CantidadCitasAno[];
  // Usuario
  public usuario: Doctor;
  // Usuario firebase
  public userF$: Observable<any> = this.authFirebaseService.afAuth.user;
  constructor(
    public doctorService: DoctorService,
    private authFirebaseService: AuthFirebaseService,
    public appointmentService: AppointmentService
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
            this.findAll();
          }
        });
      }
    });
  }

  //Método para traer cantidad de citas por mes
  findAll(): void {
    //Traer pacientes
    this.appointmentService.reporteDoctor(this.usuario.doctorId).subscribe(
      (data) => {
        //Asignamos la data al arreglo de cantCitas
        this.cantCitasAnual = data;
        //console.log(this.cantCitasAnual)
        let array: number[] = [];
        this.cantCitasAnual.forEach((cita) => {
          array.push(cita.cantidadCitas);
        });

        this.barChartData[0].data = array;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
