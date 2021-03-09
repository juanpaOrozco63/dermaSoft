import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDoctorComponent } from './agenda-doctor.component';

describe('AgendaDoctorComponent', () => {
  let component: AgendaDoctorComponent;
  let fixture: ComponentFixture<AgendaDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
