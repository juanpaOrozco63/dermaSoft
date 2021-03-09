import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosMedicosPatientComponent } from './servicios-medicos-patient.component';

describe('ServiciosMedicosPatientComponent', () => {
  let component: ServiciosMedicosPatientComponent;
  let fixture: ComponentFixture<ServiciosMedicosPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosMedicosPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosMedicosPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
