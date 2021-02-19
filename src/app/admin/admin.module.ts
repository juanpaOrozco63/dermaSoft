import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ADMINDROUTES } from './routes/admin.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ADMINDROUTES,{ useHash: true })

  ],
  exports:[
    
  ]
})
export class AdminModule { }
