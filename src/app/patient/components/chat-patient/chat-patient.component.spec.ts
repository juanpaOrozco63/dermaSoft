import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPatientComponent } from './chat-patient.component';

describe('ChatPatientComponent', () => {
  let component: ChatPatientComponent;
  let fixture: ComponentFixture<ChatPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
