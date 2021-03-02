import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCTORROUTES } from './routes/doctor.routes';
import { RouterModule } from '@angular/router';
import { DoctorPrincipalComponent } from './components/doctor-principal/doctor-principal.component';



@NgModule({
  declarations: [DoctorPrincipalComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(DOCTORROUTES,{ useHash: true })

  ],
  exports:[
    
  ]
})
export class DoctorModule { }
