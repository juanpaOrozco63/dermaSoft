import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaPatientComponent } from './agenda-patient.component';

describe('AgendaPatientComponent', () => {
  let component: AgendaPatientComponent;
  let fixture: ComponentFixture<AgendaPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
