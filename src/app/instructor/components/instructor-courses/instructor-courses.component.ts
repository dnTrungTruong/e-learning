import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/'
import { Course } from '../../../models/'
import { element } from 'protractor';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.css']
})
export class InstructorCoursesComponent implements OnInit {

  createdCourses: Course[];
  noResult: Boolean = true;
  filteredCourses: Course[];
  constructor(
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.courseService.getMyCreatedCourses().subscribe((courses: Course[]) => {
      if (courses) {
        this.noResult = false;
        //Sort by key 'status' in reverse
        this.createdCourses = courses.sort(function (a, b) {
          var x = a['status']; var y = b['status'];
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        })
        this.filteredCourses = this.createdCourses;
      }
      else {
        this.createdCourses = [];
        this.noResult = true;
      }
    })
  }

  filterCourses(status:string) {
    if (status == 'all') {
      this.filteredCourses = this.createdCourses;
    }
    else 
    {
      this.filteredCourses = this.createdCourses.filter(element => element.status == status)
    }
  }

}