import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CourseService} from '../../services/course.service';
import {CourseDetails} from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: CourseDetails;
  courseId: string;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    courseService.getCourseDetails(this.courseId)
      .subscribe((course: CourseDetails) => {
        if (!course) {
          //Will change to navigate to 404 page
          this.router.  navigate([""])

        }
        this.course = course;
        
      })
   }

  ngOnInit(): void {
  }

}
