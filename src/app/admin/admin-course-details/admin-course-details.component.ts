import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, ReviewService } from '../../services';
import { CourseDetails, Review } from '../../models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-course-details',
  templateUrl: './admin-course-details.component.html',
  styleUrls: ['./admin-course-details.component.css']
})
export class AdminCourseDetailsComponent implements OnInit {

  @ViewChild('closeReviewDetailsModal') closeReviewDetailsModal: ElementRef

  private _success = new Subject<string>();

  course: CourseDetails;
  courseId: string;
  courseTagsForm: FormGroup = this.fb.group({
    course_tags: this.fb.array([this.fb.group({ tag: [''] })])
  });

  successMessage = '';
  hasReviews: Boolean = false;
  selectedReview: Review;

  reviewsList: Review[];
  searchKeyword = '';

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private courseService: CourseService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    console.log(this.courseTags);
  }

  get courseTags() {
    return this.courseTagsForm.get('course_tags') as FormArray;
  }


  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');



    this.courseService.getCourseLearningDetails(this.courseId)
      .subscribe((course: CourseDetails) => {
        if (!course) {
          return this.router.navigate(["/error/404"]);
        };
        this.course = course;
        if (course.tags.length) {
          this.courseTags.removeAt(0);
          for (let i = 0; i < course.tags.length; i++) {
            this.courseTags.push(this.fb.group({ tag: [course.tags[i]] }));
          }
        }
        else {

        }
      });

    this.loadReviews();


    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(10000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }



  addTag() {
    this.courseTags.push(this.fb.group({ tag: [''] }));
  }

  deleteTag(index) {
    this.courseTags.removeAt(index);
  }

  public goBack() {
    this.router.navigate(["admin/courses"])
  }

  public changeSelectedReview(review: Review) {
    this.selectedReview = review;
  }

  updateTags() {
    let tagsArray = [];
    for (let element of this.courseTags.value) {
      tagsArray.push(element.tag);
    }
    let body = {
      tags: tagsArray
    };
    this.courseService.putCourseTags(this.courseId, body).subscribe(res => {
      if (res.message == "success") {
        this._success.next(`${new Date()} - Tags successfully changed.`);
      }
      else {
        alert(res.message);
      }
    })
  }

  getRequestParams(keyword, page, pageSize): any {
    let params = {};

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

  loadReviews() {
    const params = this.getRequestParams(this.searchKeyword, this.page, this.pageSize);

    this.reviewService.getReviewsForAdmin(params, this.courseId)
      .subscribe(res => {
        if (res['data']) {

          this.hasReviews = true;
          this.reviewsList = res['data']['reviews'];
          this.count = res['data']['totalItems'];
        }
      })
  }

  handlePageChange(event): void {
    this.page = event;
    this.loadReviews();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.loadReviews();
  }

  public deleteReview(reviewId: string) {
    if (confirm(`Are you sure you want to delete this review?`)) {
      this.reviewService.deleteReview(reviewId).subscribe(res => {
        if (res.message == "success") {
          this._success.next(`${new Date()} - Review deleted.`);
          this.loadReviews();
        }
        else {
          alert(res.message);
        }
      })
    }
  }

  public disableCourse() {
    this.courseService.disableCourse(this.courseId).subscribe((res => {
      if (res.message == "success") {
        this.router.navigate(["admin/courses"])
      }
      else {
        alert(res.message);
      }
    }))
  }

  public enableCourse() {
    this.courseService.approveCourse(this.courseId).subscribe((res => {
      if (res.message == "success") {
        this.router.navigate(["admin/courses"])
      }
      else {
        alert(res.message);
      }
    }))
  }
}
