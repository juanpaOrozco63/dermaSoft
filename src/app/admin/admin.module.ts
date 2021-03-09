import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ADMINDROUTES } from './routes/admin.routes';
import { AdminPrincipalComponent } from './components/admin-principal/admin-principal.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { PatientAdminComponent } from './components/patient-admin/patient-admin.component';
import { DoctorAdminComponent } from './components/doctor-admin/doctor-admin.component';
import { EntidadesAdminComponent } from './components/entidades-admin/entidades-admin.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { SettingsAdminComponent } from './components/settings-admin/settings-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AdminPrincipalComponent,
    HomeComponent,
    IndexComponent,
    PatientAdminComponent,
    DoctorAdminComponent,
    EntidadesAdminComponent,
    ProductsAdminComponent,
    SettingsAdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ADMINDROUTES),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class AdminModule {}
