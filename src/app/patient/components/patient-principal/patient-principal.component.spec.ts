import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPrincipalComponent } from './patient-principal.component';

describe('PatientPrincipalComponent', () => {
  let component: PatientPrincipalComponent;
  let fixture: ComponentFixture<PatientPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
