import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesAdminComponent } from './entidades-admin.component';

describe('EntidadesAdminComponent', () => {
  let component: EntidadesAdminComponent;
  let fixture: ComponentFixture<EntidadesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntidadesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
