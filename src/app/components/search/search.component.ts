import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {CourseService} from '../../services/course.service';
import {SubjectService} from '../../services/subject.service';
import {Course, Subject} from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyword:string;
  coursesList: Course[];
  subjectsList: Subject[];
  noResult:boolean = false;
  sortByList: string[] = ["Highest price","Lowest price", "Most reviewed", "Newest"];

  constructor(
    private courseService: CourseService,
    private subjectService: SubjectService,
    private router:Router
  ) {
    
  }

  toSearchCoursesBySubjectPage(string) {
    this.router.navigate([`/courses/${string}`]);
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
    this.courseService.searchCourses(queryObject).subscribe((courses: Course[]) => {
      this.coursesList = courses;
    })
  }

  ngOnInit(): void {

    this.subjectService.getSubjects()
    .subscribe((subjects: Subject[]) => {
      this.subjectsList = subjects;
    });
    this.courseService.keyword
    .subscribe((value) => {
      this.keyword=value;
      //In case user use url to enter this route
      if (this.keyword=="") { return this.router.navigate([""])}
      
    })

    this.courseService.searchCourses().subscribe((courses: Course[]) => {
      this.coursesList = courses;
      if (this.coursesList) {
        this.noResult=false;
      }
      else {
        this.noResult=true;
      }
    })
  }
    
  public goToCourseDetails(courseId: string) {
    this.router.navigate([`/course/${courseId}`]);
  }

}
