import { Routes } from '@angular/router';
import { AgendaDoctorComponent } from '../components/agenda-doctor/agenda-doctor.component';
import { CitasDoctorComponent } from '../components/citas-doctor/citas-doctor.component';
import { FacturacionDoctorComponent } from '../components/facturacion-doctor/facturacion-doctor.component';
import { FinalizarCitaComponent } from '../components/finalizar-cita/finalizar-cita.component';
import { HomeComponent } from '../components/home/home.component';
import { PatientDoctorComponent } from '../components/patient-doctor/patient-doctor.component';
import { ReportesDoctorComponent } from '../components/reportes-doctor/reportes-doctor.component';
import { SettingsDoctorComponent } from '../components/settings-doctor/settings-doctor.component';
import { SubscriptionGuard } from '../guards/subscription.guard';

export const DOCTORROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'patient-doctor',
    component: PatientDoctorComponent,
    canActivate: [SubscriptionGuard],
  },
  {
    path: 'agenda-doctor',
    component: AgendaDoctorComponent,
    canActivate: [SubscriptionGuard],
  },
  {
    path: 'citas-doctor',
    component: CitasDoctorComponent,
    canActivate: [SubscriptionGuard],
  },
  {
    path: 'reportes-doctor',
    component: ReportesDoctorComponent,
    canActivate: [SubscriptionGuard],
  },
  { path: 'facturacion-doctor', component: FacturacionDoctorComponent },
  { path: 'settings-doctor', component: SettingsDoctorComponent },
  {
    path: 'finalizar-cita/:id',
    component: FinalizarCitaComponent,
    canActivate: [SubscriptionGuard],
  },
];
