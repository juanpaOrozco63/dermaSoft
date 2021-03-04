import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { IndexComponent } from '../components/index/index.component';

export const ADMINDROUTES: Routes = [
  { path: 'admin-principal/**', pathMatch: 'full', redirectTo: 'admin-principal/home' },
  { path: '', redirectTo: 'admin-principal/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'index', component: IndexComponent }
  
  ];

