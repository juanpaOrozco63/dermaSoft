import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAsideComponent } from './chat-aside.component';

describe('ChatAsideComponent', () => {
  let component: ChatAsideComponent;
  let fixture: ComponentFixture<ChatAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
