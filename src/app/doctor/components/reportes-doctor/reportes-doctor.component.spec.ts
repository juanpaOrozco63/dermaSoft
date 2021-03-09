import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesDoctorComponent } from './reportes-doctor.component';

describe('ReportesDoctorComponent', () => {
  let component: ReportesDoctorComponent;
  let fixture: ComponentFixture<ReportesDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
