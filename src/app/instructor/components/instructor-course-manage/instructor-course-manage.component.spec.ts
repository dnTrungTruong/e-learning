import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseManageComponent } from './instructor-course-manage.component';

describe('InstructorCourseManageComponent', () => {
  let component: InstructorCourseManageComponent;
  let fixture: ComponentFixture<InstructorCourseManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCourseManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
