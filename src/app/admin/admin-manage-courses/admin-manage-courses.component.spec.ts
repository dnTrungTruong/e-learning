import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageCoursesComponent } from './admin-manage-courses.component';

describe('AdminManageCoursesComponent', () => {
  let component: AdminManageCoursesComponent;
  let fixture: ComponentFixture<AdminManageCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
