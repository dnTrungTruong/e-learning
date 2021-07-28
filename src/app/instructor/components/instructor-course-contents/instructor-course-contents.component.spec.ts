import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseContentsComponent } from './instructor-course-contents.component';

describe('InstructorCourseContentsComponent', () => {
  let component: InstructorCourseContentsComponent;
  let fixture: ComponentFixture<InstructorCourseContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCourseContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
