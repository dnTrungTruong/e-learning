import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BaseComponent } from './components/base/base.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { CourseService, UserService, SubjectService, AuthenticationService, QuizService, ReviewService, AnnouncementService, NotificationService, AttemptService, CertificateService } from './services/';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import {NgbRatingModule, NgbCollapseModule, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CardCourseComponent } from './components/card-course/card-course.component';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { TrimCourseNamePipe } from './pipes/trim/trim-course-name.pipe';
import { CourseListBysubjectComponent } from './components/course-list-bysubject/course-list-bysubject.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseMoocLearningComponent } from './components/course-mooc-learning/course-mooc-learning.component';
import { CourseMyEnrolledComponent } from './components/course-my-enrolled/course-my-enrolled.component';
import { CourseQuizComponent } from './components/course-quiz/course-quiz.component';
import { CourseQuizResultComponent } from './components/course-quiz-result/course-quiz-result.component';
import { CourseOnlineLearningComponent } from './components/course-online-learning/course-online-learning.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PipesModule } from './pipes/pipes.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { CourseQuizAttemptsComponent } from './components/course-quiz-attempts/course-quiz-attempts.component';
import { CertificateComponent } from './components/certificate/certificate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    CardCourseComponent,
    SearchComponent,
    FooterComponent,
    TrimCourseNamePipe,
    CourseListBysubjectComponent,
    CourseDetailsComponent,
    CourseMoocLearningComponent,
    CourseMyEnrolledComponent,
    CourseQuizComponent,
    CourseQuizResultComponent,
    CourseOnlineLearningComponent,
    CheckoutComponent,
    NotFoundComponent,
    PasswordRecoveryComponent,
    CourseQuizAttemptsComponent,
    CertificateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgbRatingModule,
    NgbCollapseModule,
    NgbAlertModule,
    NgbDropdownModule,
    FormsModule,
    CKEditorModule,
    PipesModule
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    SubjectService,
    CourseService,
    AuthenticationService, 
    QuizService, 
    ReviewService, 
    AnnouncementService, 
    NotificationService,
    AttemptService,
    CertificateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
