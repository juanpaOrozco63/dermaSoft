import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ADMINDROUTES } from './routes/admin.routes';
import { AdminPrincipalComponent } from './components/admin-principal/admin-principal.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';



@NgModule({
  declarations: [AdminPrincipalComponent, HomeComponent, IndexComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(ADMINDROUTES,{ useHash: true })

  ],
  exports:[
    
  ]
})
export class AdminModule { }
