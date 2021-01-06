import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {CourseService} from '../../services/course.service';
import {Course} from '../../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyword:string;
  coursesList: Course[];

  constructor(private courseService: CourseService) {

  }

  ngOnInit(): void {
    this.courseService.keyword
    .subscribe((value) => {
      this.keyword=value;
      //In case user use url to enter this route
      if (this.keyword=="") {this.keyword="all";}
      this.courseService.searchCourses().subscribe((courses: Course[]) => {this.coursesList = courses;
      })
    })
  }
    

}
