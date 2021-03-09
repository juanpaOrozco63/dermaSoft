import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPatientComponent } from './products-patient.component';

describe('ProductsPatientComponent', () => {
  let component: ProductsPatientComponent;
  let fixture: ComponentFixture<ProductsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
