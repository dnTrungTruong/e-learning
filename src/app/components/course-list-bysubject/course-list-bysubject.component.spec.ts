import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListBysubjectComponent } from './course-list-bysubject.component';

describe('CourseListBysubjectComponent', () => {
  let component: CourseListBysubjectComponent;
  let fixture: ComponentFixture<CourseListBysubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListBysubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListBysubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
