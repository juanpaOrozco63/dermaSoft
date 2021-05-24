// Core
import { LOCALE_ID, NgModule } from '@angular/core';
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
// Modulo Shared
import { SharedModule } from './shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DatePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
