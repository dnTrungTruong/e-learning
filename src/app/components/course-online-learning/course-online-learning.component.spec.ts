import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOnlineLearningComponent } from './course-online-learning.component';

describe('CourseOnlineLearningComponent', () => {
  let component: CourseOnlineLearningComponent;
  let fixture: ComponentFixture<CourseOnlineLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseOnlineLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOnlineLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
