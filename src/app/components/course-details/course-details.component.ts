import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, UserService } from '../../services';
import { CourseDetails, User } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: CourseDetails;
  courseId: string;
  isEnrolled: Boolean = false;

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    courseService.getCourseDetails(this.courseId)
      .subscribe((course: CourseDetails) => {
        if (!course) {
          //Will change to navigate to 404 page
          this.router.navigate([""])
        }
        this.userService.getUserInfoJWT()
        .subscribe((user: User) => {
          if (user) {
            if (user['createdCourses'].includes(this.courseId) || (user['enrolledCourses'].includes(this.courseId))) {
              this.isEnrolled = true;
            }
          }
        })
        
        this.course = course;

      })
  }

  ngOnInit(): void {
  }

  public goToCourseLearningPage() {
    this.router.navigate([`course/learning/${this.courseId}`])
  }

  public enrollCourse() {
    //Will go to checkout & payment page here
    //this.router.navigate(["learn/${this.courseId}"])
    if (!localStorage.getItem('user')) {
      //Will show sign in dialog
      return this.router.navigate(["login"])
    }
    this.userService.enrollCourse(this.courseId)
    .subscribe(res => {
      if (res.message == "success") {
        alert("Enroll sucessfully. Going to course learning page now.");
        return this.router.navigate([`course/learning/${this.courseId}`]);
      }
      else {
        alert(res.message);
      }
    })
  }
}
