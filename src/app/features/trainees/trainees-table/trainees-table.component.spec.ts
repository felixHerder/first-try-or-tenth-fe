import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineesTableComponent } from './trainees-table.component';

describe('TraineesTableComponent', () => {
  let component: TraineesTableComponent;
  let fixture: ComponentFixture<TraineesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TraineesTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
