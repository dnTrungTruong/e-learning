import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseInformationsComponent } from './instructor-course-informations.component';

describe('InstructorCourseInformationsComponent', () => {
  let component: InstructorCourseInformationsComponent;
  let fixture: ComponentFixture<InstructorCourseInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCourseInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
