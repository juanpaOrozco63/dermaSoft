// Core
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// Routes
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
// Modulo Admin
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
// Modulo Doctor
import { DoctorModule } from './doctor/doctor.module';
// Modulo Patient
import { PatientModule } from './patient/patient.module';
// MOdulo Shared
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AdminModule,
    SharedModule,
    PatientModule,
    DoctorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
