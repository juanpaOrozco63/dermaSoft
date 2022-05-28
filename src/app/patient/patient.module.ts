import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SharedModule } from '../shared/shared.module';
import { AgendaPatientComponent } from './components/agenda-patient/agenda-patient.component';
import { ChatPatientComponent } from './components/chat-patient/chat-patient.component';
import { CitasPatientComponent } from './components/citas-patient/citas-patient.component';
import { HomeComponent } from './components/home/home.component';
import { PatientPrincipalComponent } from './components/patient-principal/patient-principal.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { ProductsPatientComponent } from './components/products-patient/products-patient.component';
import { ServiciosMedicosPatientComponent } from './components/servicios-medicos-patient/servicios-medicos-patient.component';
import { PATIENTROUTES } from './routes/patient.routes';
import { RatingCitasComponent } from './components/rating-citas/rating-citas.component';
import { RatingServicioComponent } from './components/rating-servicio/rating-servicio.component';

@NgModule({
  declarations: [
    PatientPrincipalComponent,
    HomeComponent,
    CitasPatientComponent,
    AgendaPatientComponent,
    ServiciosMedicosPatientComponent,
    ChatPatientComponent,
    ProductsPatientComponent,
    PatientProfileComponent,
    RatingCitasComponent,
    RatingServicioComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(PATIENTROUTES),
    FormsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [],
})
export class PatientModule {}
