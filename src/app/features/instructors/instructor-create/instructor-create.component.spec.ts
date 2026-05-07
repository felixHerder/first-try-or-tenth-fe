import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCreateComponent } from './instructor-create.component';

describe('InstructorCreateComponent', () => {
  let component: InstructorCreateComponent;
  let fixture: ComponentFixture<InstructorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
