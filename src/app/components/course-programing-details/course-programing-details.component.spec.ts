import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProgramingDetailsComponent } from './course-programing-details.component';

describe('CourseProgramingDetailsComponent', () => {
  let component: CourseProgramingDetailsComponent;
  let fixture: ComponentFixture<CourseProgramingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseProgramingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProgramingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
