import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineesListComponent } from './trainees-list.component';

describe('TraineesListComponent', () => {
  let component: TraineesListComponent;
  let fixture: ComponentFixture<TraineesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TraineesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
