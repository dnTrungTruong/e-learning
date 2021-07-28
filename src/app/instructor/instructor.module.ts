import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './components/instructor/instructor.component';
import { InstructorCoursesComponent } from './components/instructor-courses/instructor-courses.component';
import { InstructorCourseCreateComponent } from './components/instructor-course-create/instructor-course-create.component';
import { InstructorCourseManageComponent } from './components/instructor-course-manage/instructor-course-manage.component';

import { NgbDropdownModule, NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstructorHeaderComponent } from './components/instructor-header/instructor-header.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PipesModule } from '../pipes/pipes.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { InstructorCourseInformationsComponent } from './components/instructor-course-informations/instructor-course-informations.component';
import { InstructorCourseContentsComponent } from './components/instructor-course-contents/instructor-course-contents.component';
import { InstructorCourseAnnouncementsComponent } from './components/instructor-course-announcements/instructor-course-announcements.component';
import { InstructorQuizComponent } from './components/instructor-quiz/instructor-quiz.component';


@NgModule({
  declarations: [
    InstructorComponent, 
    InstructorCoursesComponent, 
    InstructorCourseCreateComponent, 
    InstructorCourseManageComponent, 
    InstructorHeaderComponent, 
    InstructorCourseInformationsComponent, 
    InstructorCourseContentsComponent, 
    InstructorCourseAnnouncementsComponent, InstructorQuizComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbAlertModule,
    NgbPopoverModule,
    CKEditorModule,
    PipesModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ]
})
export class InstructorModule { }
