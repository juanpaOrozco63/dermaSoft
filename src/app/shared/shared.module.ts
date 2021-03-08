import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SHAREDROUTES } from './routes/shared.routes';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';

  

@NgModule({
  declarations: [FooterComponent, LoginComponent, RegisterComponent, RestorePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(SHAREDROUTES,{ useHash: true }),
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FooterComponent,
    LoginComponent,
    RegisterComponent,
   
  ]
})
export class SharedModule {

 }
