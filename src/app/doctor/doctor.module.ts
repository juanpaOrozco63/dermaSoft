import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCTORROUTES } from './routes/doctor.routes';
import { RouterModule } from '@angular/router';
import { DoctorPrincipalComponent } from './components/doctor-principal/doctor-principal.component';
import { HomeComponent } from './components/home/home.component';
import { PatientDoctorComponent } from './components/patient-doctor/patient-doctor.component';
import { AgendaDoctorComponent } from './components/agenda-doctor/agenda-doctor.component';
import { CitasDoctorComponent } from './components/citas-doctor/citas-doctor.component';
import { ReportesDoctorComponent } from './components/reportes-doctor/reportes-doctor.component';
import { FacturacionDoctorComponent } from './components/facturacion-doctor/facturacion-doctor.component';
import { SettingsDoctorComponent } from './components/settings-doctor/settings-doctor.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [DoctorPrincipalComponent, HomeComponent, PatientDoctorComponent, AgendaDoctorComponent, CitasDoctorComponent, ReportesDoctorComponent, FacturacionDoctorComponent, SettingsDoctorComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    RouterModule.forChild(DOCTORROUTES),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    BrowserAnimationsModule
  ],
  exports:[

  ]
})
export class DoctorModule { }
