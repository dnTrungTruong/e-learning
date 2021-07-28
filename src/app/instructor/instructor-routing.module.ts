import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorCourseAnnouncementsComponent } from './components/instructor-course-announcements/instructor-course-announcements.component';
import { InstructorCourseCreateComponent } from './components/instructor-course-create/instructor-course-create.component';
import { InstructorCourseInformationsComponent } from './components/instructor-course-informations/instructor-course-informations.component';
import { InstructorCourseManageComponent } from './components/instructor-course-manage/instructor-course-manage.component';
import { InstructorCourseContentsComponent } from './components/instructor-course-contents/instructor-course-contents.component';
import { InstructorCoursesComponent } from './components/instructor-courses/instructor-courses.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { InstructorQuizComponent } from './components/instructor-quiz/instructor-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: InstructorCoursesComponent },
          { path: 'create', component: InstructorCourseCreateComponent },
          {
            path: 'manage/:courseId',
            component: InstructorCourseManageComponent,
            children: [
              { path: 'informations', component: InstructorCourseInformationsComponent},
              { path: 'contents', component: InstructorCourseContentsComponent},
              { path: 'announcements', component: InstructorCourseAnnouncementsComponent},
            ]
          },
          { path: 'manage/:courseId/quiz/:sectionId', component: InstructorQuizComponent },

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
