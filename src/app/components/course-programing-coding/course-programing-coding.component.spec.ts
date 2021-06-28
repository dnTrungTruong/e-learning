import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProgramingCodingComponent } from './course-programing-coding.component';

describe('CourseProgramingCodingComponent', () => {
  let component: CourseProgramingCodingComponent;
  let fixture: ComponentFixture<CourseProgramingCodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseProgramingCodingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProgramingCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
