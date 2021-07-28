import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services';
import { CourseDetails } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-course-manage',
  templateUrl: './instructor-course-manage.component.html',
  styleUrls: ['./instructor-course-manage.component.css']
})
export class InstructorCourseManageComponent implements OnInit {

  course: CourseDetails;
  courseId: string;
  selectedComponent: string = 'informations';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.courseService.getCourseLearningDetails(this.courseId)
      .subscribe((course: CourseDetails) => {
        if (!course) {
          return this.router.navigate(["/error/404"]);
        };
        this.course = course;
      });
  }

  changeSelectedComponent(component:string) {
    if (component != this.selectedComponent) {
      if (this.course.status != 'approved') {
        if (component != 'announcements' ) {
          this.selectedComponent = component;
        }
      }
      else {
        this.selectedComponent = component;

      }
    }
  }

  submitCourse() {
    this.courseService.submitCourse(this.courseId).subscribe(res => {
      if (res.message == "success") {
        this.course.status = 'pending';
      }
      else {
        alert(res.message);
      }
    })
  }
}
