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

  price = '';
  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 12];

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
    this.loadCoursesBySubject();
   }

  ngOnInit(): void {
    
  }

  sortBy(string) {
    if (string == "price-descending") {
      this.price = "descending";
    }
    if (string == "price-ascending") {
      this.price = "ascending";
    }
    // if (string == "rate-descending") {
    //   queryObject.price = "ascending";
    // }
    // if (string == "newest") {
    //   queryObject.createdAt = "ascending";
    // }
    this.loadCoursesBySubject();
  }

  loadCoursesBySubject() {
    this.courseService.searchCoursesBySubject(this.subject, this.page, this.pageSize, this.price)
      .subscribe(res => {
        if (res['data']) {
          this.coursesList= res['data']['courses'];
          this.count = res['data']['totalItems'];
        }
        else {
          this.coursesList = [];
          this.count = 0;
        }
        if (this.coursesList.length) {
          this.noResult = false;
        }
        else {
          this.noResult = true;
        }
    })
  }

  handlePageChange(event): void {
    this.page = event;
    this.loadCoursesBySubject();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.loadCoursesBySubject();
  }

  toSearchCoursesBySubjectPage(string) {
    this.subject = string;
    this.page = 1;
    this.loadCoursesBySubject();
    this.router.navigate([`/courses/${string}`]);
  }

  goToCourseDetails(courseId:string, courseType: string) {
    if (courseType == 'programing') {
      this.router.navigate([`/course/proraming/${courseId}`]);
    }
    else {
      this.router.navigate([`/course/${courseId}`]);
    }
  }
}
