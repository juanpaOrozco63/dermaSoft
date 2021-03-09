import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPatientComponent } from './citas-patient.component';

describe('CitasPatientComponent', () => {
  let component: CitasPatientComponent;
  let fixture: ComponentFixture<CitasPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
