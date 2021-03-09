import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionDoctorComponent } from './facturacion-doctor.component';

describe('FacturacionDoctorComponent', () => {
  let component: FacturacionDoctorComponent;
  let fixture: ComponentFixture<FacturacionDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturacionDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
