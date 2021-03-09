import { Routes } from '@angular/router';
import { AgendaDoctorComponent } from '../components/agenda-doctor/agenda-doctor.component';
import { CitasDoctorComponent } from '../components/citas-doctor/citas-doctor.component';
import { FacturacionDoctorComponent } from '../components/facturacion-doctor/facturacion-doctor.component';
import { HomeComponent } from '../components/home/home.component';
import { PatientDoctorComponent } from '../components/patient-doctor/patient-doctor.component';
import { ReportesDoctorComponent } from '../components/reportes-doctor/reportes-doctor.component';
import { SettingsDoctorComponent } from '../components/settings-doctor/settings-doctor.component';

export const DOCTORROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'patient-doctor', component: PatientDoctorComponent },
  { path: 'agenda-doctor', component: AgendaDoctorComponent },
  { path: 'citas-doctor', component: CitasDoctorComponent },
  { path: 'reportes-doctor', component: ReportesDoctorComponent },
  { path: 'facturacion-doctor', component: FacturacionDoctorComponent },
  { path: 'settings-doctor', component: SettingsDoctorComponent },
];
