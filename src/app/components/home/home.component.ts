import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Subject, Course} from '../../models';
import {SubjectService} from '../../services/subject.service';
import {CourseService} from '../../services/course.service';
import {Router} from "@angular/router"
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  subjectsList: Subject[];
  coursesList: Course[];
  hotCoursesList: Course[];
  newCoursesList: Course[];
  randomCoursesList: Course[];
  personalDevelopmentCourses: Course[];
  

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
    autoplay: true,
  };
  isDragging: Boolean =  false;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private subjectService: SubjectService,
    private courseService: CourseService,
    private router: Router
    ) {
      subjectService.getSubjects()
      .subscribe((subjects: Subject[]) => {
        this.subjectsList = subjects;
      })
      courseService.getHotCourses()
      .subscribe((courses: Course[]) => {
        this.hotCoursesList = courses;
      })
      courseService.getNewCourses()
      .subscribe((courses: Course[]) => {
        this.newCoursesList = courses;
      })
      courseService.getRandomCourses()
      .subscribe((courses: Course[]) => {
        this.randomCoursesList = courses;
      })
      courseService.searchCoursesBySubject("Personal development", 1, 5)
      .subscribe(res => {
        if (res['data']) {
          this.personalDevelopmentCourses = res['data']['courses'];
        }
      })
    }
    
    toSearchCoursesBySubjectPage(string) {
    //this.courseService.changeKeyWord(string);
    this.router.navigate([`/courses/${string}`]);
  }

  goToCourseDetails(courseId:string, courseType: string) {
    if (courseType == 'programing') {
      this.router.navigate([`/course/programing/${courseId}`]);
    }
    else {
      this.router.navigate([`/course/${courseId}`]);
    }
  }
}
