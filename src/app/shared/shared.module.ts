import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SHAREDROUTES } from './routes/shared.routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

  

@NgModule({
  declarations: [FooterComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(SHAREDROUTES,{ useHash: true }),
    FormsModule,
    HttpClientModule
  ],
  exports:[
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ]
})
export class SharedModule {

 }
