import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Subject, Course} from '../../models';
import {SubjectService} from '../../services/subject.service';
import {CourseService} from '../../services/course.service';
import {Router} from "@angular/router"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  subjectsList: Subject[];
  coursesList: Course[];
  hotCoursesList: Course[];
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 }
      ];
    })
  );


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
      courseService.getAllCourse()
      .subscribe((courses: Course[]) => {
        this.coursesList = courses;
      })
    }
    
    toSearchCoursesBySubjectPage(string) {
    //this.courseService.changeKeyWord(string);
    this.router.navigate([`/courses/${string}`]);
  }

  goToCourseDetails(courseId) {
    this.router.navigate([`/course/${courseId}`]);
  }
}
