import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { SubjectService } from '../../services/subject.service';
import { Course, Subject } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyword: string;
  coursesList: Course[];
  subjectsList: Subject[];
  noResult: boolean = false;
  sortByList: string[] = ["Highest price", "Lowest price", "Most reviewed", "Newest"];
  
  price = '';
  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 12];

  constructor(
    private courseService: CourseService,
    private subjectService: SubjectService,
    private router: Router
  ) {

  }

  getRequestParams(searchTitle, page, pageSize): any {
    let params = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  toSearchCoursesBySubjectPage(string) {
    this.router.navigate([`/courses/${string}`]);
  }
  sortBy(string) {
    if (string == "price-descending") {
      this.price = "descending";
    }
    if (string == "price-ascending") {
      this.price = "ascending";
    }
    // if (string == "rate-descending") {
    //   this.review = "ascending";
    // }
    // if (string == "newest") {
    //   this.createdAt = "ascending";
    // }
    this.searchCourses();
  }

  ngOnInit(): void {

    this.subjectService.getSubjects()
      .subscribe((subjects: Subject[]) => {
        this.subjectsList = subjects;
      });
    this.searchCourses();

  }

  public searchCourses() {
    this.courseService.keyword
      .subscribe((value) => {
        this.keyword = value;
        console.log(value);
        //In case user use url to enter this route
        if (this.keyword == "") { return this.router.navigate([""]) }
        else {
          this.courseService.searchCourses(this.page, this.pageSize, this.price).subscribe(res => {
            if (res['data']) {
              this.coursesList= res['data']['courses'];
              this.count = res['data']['totalItems'];
            }
            else {
              this.coursesList = [];
              this.count = 0;
            }
            console.log(res['data']);
            if (this.coursesList.length) {
              this.noResult = false;
            }
            else {
              this.noResult = true;
            }
          })
        }
      })
  }
  
  handlePageChange(event): void {
    this.page = event;
    this.searchCourses();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.searchCourses();
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
