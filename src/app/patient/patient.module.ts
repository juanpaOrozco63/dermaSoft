import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PATIENTROUTES } from './routes/patient.routes';
import { PatientPrincipalComponent } from './components/patient-principal/patient-principal.component';
import { HomeComponent } from './components/home/home.component';
import { CitasPatientComponent } from './components/citas-patient/citas-patient.component';
import { AgendaPatientComponent } from './components/agenda-patient/agenda-patient.component';
import { ServiciosMedicosPatientComponent } from './components/servicios-medicos-patient/servicios-medicos-patient.component';
import { ChatPatientComponent } from './components/chat-patient/chat-patient.component';
import { ProductsPatientComponent } from './components/products-patient/products-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PatientPrincipalComponent,
    HomeComponent,
    CitasPatientComponent,
    AgendaPatientComponent,
    ServiciosMedicosPatientComponent,
    ChatPatientComponent,
    ProductsPatientComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(PATIENTROUTES),
    FormsModule,
  ],
  exports: [],
})
export class PatientModule {}
