import { Routes } from '@angular/router';
import { AgendaPatientComponent } from '../components/agenda-patient/agenda-patient.component';
import { ChatPatientComponent } from '../components/chat-patient/chat-patient.component';
import { CitasPatientComponent } from '../components/citas-patient/citas-patient.component';
import { HomeComponent } from '../components/home/home.component';
import { ProductsPatientComponent } from '../components/products-patient/products-patient.component';
import { ServiciosMedicosPatientComponent } from '../components/servicios-medicos-patient/servicios-medicos-patient.component';
import { PatientProfileComponent } from '../components/patient-profile/patient-profile.component';

export const PATIENTROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'agenda', component: AgendaPatientComponent },
  { path: 'citas', component: CitasPatientComponent },
  { path: 'products', component: ProductsPatientComponent },
  { path: 'servicios-medicos', component: ServiciosMedicosPatientComponent },
  { path: 'chat', component: ChatPatientComponent },
  { path: 'perfil', component: PatientProfileComponent },
];
