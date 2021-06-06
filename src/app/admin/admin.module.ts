import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminManageSubjectsComponent } from './admin-manage-subjects/admin-manage-subjects.component';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';
import { AdminManageCoursesComponent } from './admin-manage-courses/admin-manage-courses.component';
import { AdminPendingCoursesComponent } from './admin-pending-courses/admin-pending-courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';

import { NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminCourseDetailsComponent } from './admin-course-details/admin-course-details.component';
import { AdminCourseApproveComponent } from './admin-course-approve/admin-course-approve.component';
import { AdminManagePayoutComponent } from './admin-manage-payout/admin-manage-payout.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminComponent, 
    AdminDashboardComponent, 
    AdminHeaderComponent, 
    AdminSidebarComponent, 
    AdminManageSubjectsComponent, 
    AdminManageUsersComponent, 
    AdminManageCoursesComponent, 
    AdminPendingCoursesComponent, 
    AdminUserDetailsComponent, 
    AdminCourseDetailsComponent, 
    AdminCourseApproveComponent, 
    AdminManagePayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgxPaginationModule,
    NgbAlertModule,
    PipesModule
  ]
})
export class AdminModule { }
