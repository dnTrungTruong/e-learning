import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMoocLearningComponent } from './course-mooc-learning.component';

describe('CourseMoocLearningComponent', () => {
  let component: CourseMoocLearningComponent;
  let fixture: ComponentFixture<CourseMoocLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMoocLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMoocLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
