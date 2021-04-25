import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMyEnrolledComponent } from './course-my-enrolled.component';

describe('CourseMyEnrolledComponent', () => {
  let component: CourseMyEnrolledComponent;
  let fixture: ComponentFixture<CourseMyEnrolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMyEnrolledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMyEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
