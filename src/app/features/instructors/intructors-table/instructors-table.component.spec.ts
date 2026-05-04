import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsTableComponent } from './instructors-table.component';

describe('InstructorsTableComponent', () => {
  let component: InstructorsTableComponent;
  let fixture: ComponentFixture<InstructorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorsTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
