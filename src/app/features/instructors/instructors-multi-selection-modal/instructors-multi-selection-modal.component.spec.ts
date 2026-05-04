import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsMultiSelectionModalComponent } from './instructors-multi-selection-modal.component';

describe('InstructorsMultiSelectionModalComponent', () => {
  let component: InstructorsMultiSelectionModalComponent;
  let fixture: ComponentFixture<InstructorsMultiSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsMultiSelectionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorsMultiSelectionModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
