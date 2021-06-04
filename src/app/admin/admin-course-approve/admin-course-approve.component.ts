import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services';
import { CourseDetails, Lecture } from '../../models';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin-course-approve',
  templateUrl: './admin-course-approve.component.html',
  styleUrls: ['./admin-course-approve.component.css']
})
export class AdminCourseApproveComponent implements OnInit {

  course: CourseDetails;
  courseId: string;
  lectureUrl: string = `${environment.apiUrl}/file/s3/`
  player:any; 
  source:any; 

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef
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

  getLectureVideoURL(lecture: Lecture) {
    if (this.course.type == 'mooc') {
      return this.lectureUrl + lecture.course + '/' + lecture.url;
    }
    return lecture.url;
  }

  setLectureVideoURL(lecture: Lecture) {
    this.source = this.elRef.nativeElement.querySelector('source');
    this.source.src = this.getLectureVideoURL(lecture);
    this.player = this.elRef.nativeElement.querySelector('video');
    this.player.load();
  }

  approveCourse() {
    this.courseService.approveCourse(this.courseId)
    .subscribe(res => {
      if (res.message == "success") {
        this.router.navigate(["admin/pending-courses"])
      }
      else {
        alert(res.message);
      }
    })
  }

  public goBack() {
    this.router.navigate(["admin/pending-courses"])
  }
}
