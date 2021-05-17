import { Component, OnInit } from '@angular/core';
import {  UserService } from '../../services';
import { Course, User } from '../../models';
import {Router} from "@angular/router"

@Component({
  selector: 'app-course-my-enrolled',
  templateUrl: './course-my-enrolled.component.html',
  styleUrls: ['./course-my-enrolled.component.css']
})
export class CourseMyEnrolledComponent implements OnInit {

  moocCoursesList: Course[] = [];
  onlineCoursesList: Course[] = [];
  programingCoursesList: Course[] = [];
  noResult:boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    userService.getMyEnrolledCourses()
    .subscribe((courses: Course[]) => {
      if (courses.length) {
        this.noResult=false;
        for(let course of courses) {
          if (course.type === "mooc") {
            this.moocCoursesList.push(course);
          }
          if (course.type === "online") {
            this.onlineCoursesList.push(course);
          }
          if (course.type === "programing") {
            this.programingCoursesList.push(course);
          }
        }
      }
      else {
        this.noResult=true;
      }
    })
  }

  ngOnInit(): void {
  }
  
  public goToCourseLearningPage(courseId:string, courseType: string) {
    this.router.navigate([`course/learning/${courseType}/${courseId}`])
  }

}
