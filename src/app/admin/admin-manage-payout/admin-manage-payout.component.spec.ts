import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagePayoutComponent } from './admin-manage-payout.component';

describe('AdminManagePayoutComponent', () => {
  let component: AdminManagePayoutComponent;
  let fixture: ComponentFixture<AdminManagePayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManagePayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagePayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
