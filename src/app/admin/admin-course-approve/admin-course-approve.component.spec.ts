import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseApproveComponent } from './admin-course-approve.component';

describe('AdminCourseApproveComponent', () => {
  let component: AdminCourseApproveComponent;
  let fixture: ComponentFixture<AdminCourseApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCourseApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
