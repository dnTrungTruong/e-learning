import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../services/course.service';
import {SubjectService} from '../../services/subject.service';
import {Course, Subject} from '../../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-list-bysubject',
  templateUrl: './course-list-bysubject.component.html',
  styleUrls: ['./course-list-bysubject.component.css']
})
export class CourseListBysubjectComponent implements OnInit {

  coursesList: Course[];
  subjectsList: Subject[];
  noResult:boolean = false;
  subject: string;

  constructor(
    private courseService: CourseService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    subjectService.getSubjects()
    .subscribe((subjects: Subject[]) => {
      this.subjectsList = subjects;
    })
    this.subject = this.route.snapshot.paramMap.get('subject');
    courseService.searchCoursesBySubject(this.subject)
      .subscribe((courses: Course[]) => {
        this.coursesList = courses;
    })
   }

  ngOnInit(): void {
    
  }

  toSearchCoursesBySubjectPage(string) {
    this.subject = string;
    this.courseService.searchCoursesBySubject(this.subject)
      .subscribe((courses: Course[]) => {
        this.coursesList = courses;
    })
    this.router.navigate([`/courses/${string}`]);
  }

}
