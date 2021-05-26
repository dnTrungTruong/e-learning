import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent} from './admin/admin.component'
import { AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component'
import { AdminManageSubjectsComponent} from './admin-manage-subjects/admin-manage-subjects.component'

import { AdminManageUsersComponent} from './admin-manage-users/admin-manage-users.component'
import { AdminUserDetailsComponent} from './admin-user-details/admin-user-details.component'

import { AdminManageCoursesComponent} from './admin-manage-courses/admin-manage-courses.component'
import { AdminPendingCoursesComponent} from './admin-pending-courses/admin-pending-courses.component'
import { AdminCourseDetailsComponent} from './admin-course-details/admin-course-details.component'
import { AdminCourseApproveComponent} from './admin-course-approve/admin-course-approve.component'
import { AdminManagePayoutComponent} from './admin-manage-payout/admin-manage-payout.component'


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: AdminDashboardComponent},
          { path: 'subjects', component: AdminManageSubjectsComponent},
          { path: 'users', component: AdminManageUsersComponent},
          { path: 'users/details/:userId', component: AdminUserDetailsComponent},
          { path: 'courses', component: AdminManageCoursesComponent},
          { path: 'courses/details/:courseId', component: AdminCourseDetailsComponent},
          { path: 'pending-courses', component: AdminPendingCoursesComponent},
          { path: 'pending-courses/approve/:courseId', component: AdminCourseApproveComponent},
          { path: 'payout', component: AdminManagePayoutComponent},
          
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
