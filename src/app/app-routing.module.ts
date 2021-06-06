import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { CourseListBysubjectComponent } from './components/course-list-bysubject/course-list-bysubject.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseMoocLearningComponent } from './components/course-mooc-learning/course-mooc-learning.component';
import { AuthGuard } from './helpers';
import { CourseMyEnrolledComponent } from './components/course-my-enrolled/course-my-enrolled.component';
import { CourseQuizComponent } from './components/course-quiz/course-quiz.component';
import { CourseQuizResultComponent } from './components/course-quiz-result/course-quiz-result.component';
import { CourseOnlineLearningComponent } from './components/course-online-learning/course-online-learning.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { 
        path: '', 
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'password-recovery/:email/:secretCode',
        component: PasswordRecoveryComponent
      },
      {
        path: 'my-enrolled-courses',
        component: CourseMyEnrolledComponent
      },
      {
        path: 'courses/:subject',
        component: CourseListBysubjectComponent
      },
      {
        path: 'course/quiz/:quizId',
        component: CourseQuizComponent
      },
      {
        path: 'course/quiz-result',
        component: CourseQuizResultComponent
      },
      {
        path: 'course/:courseId',
        component: CourseDetailsComponent
      },
      {
        path: 'course/:courseId/checkout',
        component: CheckoutComponent
      },
      {
        path: 'course/learning/mooc/:courseId',
        component: CourseMoocLearningComponent
      },
      {
        path: 'course/learning/online/:courseId',
        component: CourseOnlineLearningComponent
      },
      {
        path: 'error/404', 
        component: NotFoundComponent
      },
      // {path: '**', redirectTo: '/error/404'}
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: '**', redirectTo: '/error/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
