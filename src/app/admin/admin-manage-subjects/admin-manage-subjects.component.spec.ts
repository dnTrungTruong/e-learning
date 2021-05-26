import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageSubjectsComponent } from './admin-manage-subjects.component';

describe('AdminManageSubjectsComponent', () => {
  let component: AdminManageSubjectsComponent;
  let fixture: ComponentFixture<AdminManageSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
