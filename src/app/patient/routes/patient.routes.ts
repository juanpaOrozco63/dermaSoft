import { Routes } from '@angular/router';
import { AgendaPatientComponent } from '../components/agenda-patient/agenda-patient.component';
import { ChatPatientComponent } from '../components/chat-patient/chat-patient.component';
import { CitasPatientComponent } from '../components/citas-patient/citas-patient.component';
import { HomeComponent } from '../components/home/home.component';
import { ProductsPatientComponent } from '../components/products-patient/products-patient.component';
import { ServiciosMedicosPatientComponent } from '../components/servicios-medicos-patient/servicios-medicos-patient.component';
import { PatientProfileComponent } from '../components/patient-profile/patient-profile.component';
import { RegistradoPacienteGuard } from '../guards/registrado-paciente.guard';


export const PATIENTROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [RegistradoPacienteGuard] },
  {
    path: 'agenda',
    component: AgendaPatientComponent,
    canActivate: [RegistradoPacienteGuard],
  },
  {
    path: 'citas',
    component: CitasPatientComponent,
    canActivate: [RegistradoPacienteGuard],
  },
  {
    path: 'products',
    component: ProductsPatientComponent,
    canActivate: [RegistradoPacienteGuard],
  },
  {
    path: 'servicios-medicos',
    component: ServiciosMedicosPatientComponent,
    canActivate: [RegistradoPacienteGuard],
  },
  {
    path: 'chat',
    component: ChatPatientComponent,
    canActivate: [RegistradoPacienteGuard],
  },
  { path: 'perfil', component: PatientProfileComponent },
];
