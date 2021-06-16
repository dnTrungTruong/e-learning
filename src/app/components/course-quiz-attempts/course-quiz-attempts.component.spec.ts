import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseQuizAttemptsComponent } from './course-quiz-attempts.component';

describe('CourseQuizAttemptsComponent', () => {
  let component: CourseQuizAttemptsComponent;
  let fixture: ComponentFixture<CourseQuizAttemptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseQuizAttemptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseQuizAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
