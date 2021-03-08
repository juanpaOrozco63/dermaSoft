import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { IndexComponent } from '../components/index/index.component';

export const ADMINDROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'index', component: IndexComponent }
  
  ];

