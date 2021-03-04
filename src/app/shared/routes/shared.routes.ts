import { Routes } from '@angular/router';
import { AdminPrincipalComponent } from 'src/app/admin/components/admin-principal/admin-principal.component';
import { DoctorPrincipalComponent } from 'src/app/doctor/components/doctor-principal/doctor-principal.component';
import { PatientPrincipalComponent } from 'src/app/patient/components/patient-principal/patient-principal.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { RestorePasswordComponent } from '../components/restore-password/restore-password.component';
import { HomeComponent } from '../../admin/components/home/home.component';
import { IndexComponent } from '../../admin/components/index/index.component';
import { ADMINDROUTES } from '../../admin/routes/admin.routes';

export const SHAREDROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-principal', component: AdminPrincipalComponent,
  children: 
    ADMINDROUTES
   },
  { path: 'patient-principal', component: PatientPrincipalComponent },
  { path: 'doctor-principal', component: DoctorPrincipalComponent },
  { path: 'restorePassword', component: RestorePasswordComponent },
 
];
