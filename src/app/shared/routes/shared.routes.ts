import { Routes } from '@angular/router';
import { AdminPrincipalComponent } from 'src/app/admin/components/admin-principal/admin-principal.component';
import { DoctorPrincipalComponent } from 'src/app/doctor/components/doctor-principal/doctor-principal.component';
import { PatientPrincipalComponent } from 'src/app/patient/components/patient-principal/patient-principal.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { RestorePasswordComponent } from '../components/restore-password/restore-password.component';
import { ADMINDROUTES } from '../../admin/routes/admin.routes';
import { PATIENTROUTES } from 'src/app/patient/routes/patient.routes';
import { RegisterDoctorComponent } from '../components/register-doctor/register-doctor.component';
import { DOCTORROUTES } from 'src/app/doctor/routes/doctor.routes';

export const SHAREDROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registerPatient', component: RegisterComponent },
  { path: 'registerDoctor', component: RegisterDoctorComponent },
  {
    path: 'admin-principal',
    component: AdminPrincipalComponent,
    children: ADMINDROUTES,
  },
  {
    path: 'patient-principal',
    component: PatientPrincipalComponent,
    children: PATIENTROUTES,
  },
  {
    path: 'doctor-principal',
    component: DoctorPrincipalComponent,
    children: DOCTORROUTES,
  },
  { path: 'restorePassword', component: RestorePasswordComponent },
];
