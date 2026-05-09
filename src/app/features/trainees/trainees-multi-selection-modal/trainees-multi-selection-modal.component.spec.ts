import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineesMultiSelectionModalComponent } from './trainees-multi-selection-modal.component';

describe('TraineesMultiSelectionModalComponent', () => {
  let component: TraineesMultiSelectionModalComponent;
  let fixture: ComponentFixture<TraineesMultiSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineesMultiSelectionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TraineesMultiSelectionModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
