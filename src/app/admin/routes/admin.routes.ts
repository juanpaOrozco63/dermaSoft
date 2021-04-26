import { Routes } from '@angular/router';
import { DoctorAdminComponent } from '../components/doctor-admin/doctor-admin.component';
import { EntidadesAdminComponent } from '../components/entidades-admin/entidades-admin.component';
import { HomeComponent } from '../components/home/home.component';
import { IndexComponent } from '../components/index/index.component';
import { PatientAdminComponent } from '../components/patient-admin/patient-admin.component';
import { ProductsAdminComponent } from '../components/products-admin/products-admin.component';
import { SettingsAdminComponent } from '../components/settings-admin/settings-admin.component';
import { ProfileComponent } from '../components/profile/profile.component';

export const ADMINDROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'index', component: IndexComponent },
  { path: 'patient-admin', component: PatientAdminComponent },
  { path: 'doctor-admin', component: DoctorAdminComponent },
  { path: 'entidades-admin', component: EntidadesAdminComponent },
  { path: 'products-admin', component: ProductsAdminComponent },
  { path: 'settings-admin', component: SettingsAdminComponent },
  { path: 'profile', component: ProfileComponent },
];
