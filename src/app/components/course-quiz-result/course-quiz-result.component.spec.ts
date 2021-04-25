import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseQuizResultComponent } from './course-quiz-result.component';

describe('CourseQuizResultComponent', () => {
  let component: CourseQuizResultComponent;
  let fixture: ComponentFixture<CourseQuizResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseQuizResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseQuizResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
