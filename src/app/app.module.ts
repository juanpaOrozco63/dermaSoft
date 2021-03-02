// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
// Modulo Admin
import { AdminModule } from './admin/admin.module';
// Modulo Doctor
import { DoctorModule } from './doctor/doctor.module';
// Modulo Patient
import { PatientModule } from './patient/patient.module';
// MOdulo Shared
import { SharedModule } from './shared/shared.module';
// Routes
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AdminModule,
    SharedModule,
    PatientModule,
    DoctorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
