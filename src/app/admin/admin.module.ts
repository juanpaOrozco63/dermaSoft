import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ADMINDROUTES } from './routes/admin.routes';
import { AdminPrincipalComponent } from './components/admin-principal/admin-principal.component';



@NgModule({
  declarations: [AdminPrincipalComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(ADMINDROUTES,{ useHash: true })

  ],
  exports:[
    
  ]
})
export class AdminModule { }
