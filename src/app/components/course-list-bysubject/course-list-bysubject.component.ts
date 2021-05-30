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
    let queryObject: {[k:string]: string} = {}; //Define a LooseObject that can accept fields with string as key and value
    queryObject.subject = this.subject;
    this.loadCoursesBySubject(queryObject);
   }

  ngOnInit(): void {
    
  }

  sortBy(string) {
    let queryObject: {[k:string]: string} = {}; //Define a LooseObject that can accept fields with string as key and value
    if (string == "price-descending") {
      queryObject.price = "descending";
    }
    if (string == "price-ascending") {
      queryObject.price = "ascending";
    }
    // if (string == "rate-descending") {
    //   queryObject.price = "ascending";
    // }
    // if (string == "newest") {
    //   queryObject.createdAt = "ascending";
    // }
    queryObject.subject = this.subject;
    this.loadCoursesBySubject(queryObject);
  }

  loadCoursesBySubject( queryObject: {[k:string]: string}) {
    console.log(queryObject);
    this.courseService.searchCoursesBySubject(queryObject)
      .subscribe((courses: Course[]) => {
        this.coursesList = courses;
        console.log(this.coursesList);
        if (this.coursesList) {
          this.noResult=false;
        }
        else {
          this.noResult=true;
        }
    })
  }

  toSearchCoursesBySubjectPage(string) {
    
    this.subject = string;
    let queryObject: {[k:string]: string} = {}; //Define a LooseObject that can accept fields with string as key and value
    queryObject.subject = this.subject;
    this.loadCoursesBySubject(queryObject);
    this.router.navigate([`/courses/${string}`]);
  }

}
