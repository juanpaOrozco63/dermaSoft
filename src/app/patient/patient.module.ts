import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PATIENTROUTES } from './routes/patient.routes';
import { PatientPrincipalComponent } from './components/patient-principal/patient-principal.component';



@NgModule({
  declarations: [PatientPrincipalComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(PATIENTROUTES,{ useHash: true })

  ],
  exports:[
    
  ]
})
export class PatientModule { }
