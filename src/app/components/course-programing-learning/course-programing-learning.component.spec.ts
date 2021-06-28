import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProgramingLearningComponent } from './course-programing-learning.component';

describe('CourseProgramingLearningComponent', () => {
  let component: CourseProgramingLearningComponent;
  let fixture: ComponentFixture<CourseProgramingLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseProgramingLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProgramingLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
