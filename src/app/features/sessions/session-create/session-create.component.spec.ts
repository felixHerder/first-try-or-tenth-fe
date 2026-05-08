import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCreateComponent } from './session-create.component';

describe('SessionCreateComponent', () => {
  let component: SessionCreateComponent;
  let fixture: ComponentFixture<SessionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
