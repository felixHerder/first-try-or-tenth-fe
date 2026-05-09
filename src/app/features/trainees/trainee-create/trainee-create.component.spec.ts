import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeCreateComponent } from './trainee-create.component';

describe('TraineeCreateComponent', () => {
  let component: TraineeCreateComponent;
  let fixture: ComponentFixture<TraineeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TraineeCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
