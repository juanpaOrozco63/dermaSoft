import { Routes } from '@angular/router';
import { AdminPrincipalComponent } from 'src/app/admin/components/admin-principal/admin-principal.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { RestorePasswordComponent } from '../components/restore-password/restore-password.component';

export const SHAREDROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-principal', component: AdminPrincipalComponent },
  { path: 'restorePassword', component: RestorePasswordComponent }
];
