import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingCoursesComponent } from './admin-pending-courses.component';

describe('AdminPendingCoursesComponent', () => {
  let component: AdminPendingCoursesComponent;
  let fixture: ComponentFixture<AdminPendingCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPendingCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
