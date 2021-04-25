import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, UserService } from '../../services';
import { CourseDetails, User } from '../../models';
import { Router } from '@angular/router';
import { Lecture } from 'src/app/models/lecture.model';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-course-mooc-learning',
  templateUrl: './course-mooc-learning.component.html',
  styleUrls: ['./course-mooc-learning.component.css']
})
export class CourseMoocLearningComponent implements OnInit {

  course: CourseDetails;
  courseId: string;
  selectedLecture: Lecture;
  lectureUrl: string = "https://e-learning-10r825s36vuq028g5csk.s3-ap-southeast-1.amazonaws.com/course_videos/"
  player:any; 
  source:any; 

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    
    //Maybe need to authorize here (Or use AuthGuard)
    courseService.getCourseLearningDetails(this.courseId)
    .subscribe((course: CourseDetails) => {
      if (!course) {
        //Will change to navigate to 404 page
        this.router.navigate([""])
      }
      console.log(course);
      this.course = course;
      this.selectedLecture = course.sections[0].lectures[0];
      console.log(this.selectedLecture);
      this.source = this.elRef.nativeElement.querySelector('source');
      this.source.src = this.lectureUrl + this.selectedLecture?.course + '/' + this.selectedLecture?.url;
      this.player = this.elRef.nativeElement.querySelector('video');
      this.player.load();
      console.log(this.lectureUrl + this.selectedLecture?.course + '/' + this.selectedLecture?.url)
    })
   }

  ngOnInit(): void {
  }

  changeLecture(lecture:Lecture) {

    this.selectedLecture = lecture;
    this.source.src = this.lectureUrl + this.selectedLecture?.course + '/' + this.selectedLecture?.url;
    
    this.player.load();
  }
}
