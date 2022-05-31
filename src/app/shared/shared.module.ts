import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatAsideComponent } from './components/chat-aside/chat-aside.component';
import { ChatContentComponent } from './components/chat-content/chat-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterDoctorComponent } from './components/register-doctor/register-doctor.component';
import { RegisterComponent } from './components/register/register.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { SHAREDROUTES } from './routes/shared.routes';
import { ModalVideoComponent } from './components/modal-video/modal-video.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    RestorePasswordComponent,
    RegisterDoctorComponent,
    ChatContentComponent,
    ChatAsideComponent,
    ModalVideoComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(SHAREDROUTES, { useHash: true }),
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ChatAsideComponent,
    ChatContentComponent,
  ],
})
export class SharedModule {}
