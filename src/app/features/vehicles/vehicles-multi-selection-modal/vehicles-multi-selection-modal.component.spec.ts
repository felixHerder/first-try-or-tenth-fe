import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesMultiSelectionModalComponent } from './vehicles-multi-selection-modal.component';

describe('VehiclesMultiSelectionModalComponent', () => {
  let component: VehiclesMultiSelectionModalComponent;
  let fixture: ComponentFixture<VehiclesMultiSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesMultiSelectionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesMultiSelectionModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
