import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../services/'
import {Course} from '../../models/'

@Component({
  selector: 'app-admin-manage-courses',
  templateUrl: './admin-manage-courses.component.html',
  styleUrls: ['./admin-manage-courses.component.css']
})
export class AdminManageCoursesComponent implements OnInit {

  coursesList: Course[];
  searchKeyword = '';

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  getRequestParams(keyword, page, pageSize): any {
    let params = {};

    params[`status`] = "approved";
    if (keyword) {
      params[`keyword`] = keyword;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  public loadCourses() {
    const params = this.getRequestParams(this.searchKeyword, this.page, this.pageSize);

    this.courseService.getAllCourses(params)
    .subscribe(res => {
      if (res['data']) {
        this.coursesList= res['data']['courses'];
        this.count = res['data']['totalItems'];
      }
    })
  }

  handlePageChange(event): void {
    this.page = event;
    this.loadCourses();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.loadCourses();
  }
}
