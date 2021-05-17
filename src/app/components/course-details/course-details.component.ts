import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, UserService, ReviewService, AuthenticationService } from '../../services';
import { CourseDetails, User, Review } from '../../models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isBuffer } from 'util';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  @ViewChild('closeReviewModal') closeReviewModal: ElementRef
  @ViewChild('closeReplyModal') closeReplyodal: ElementRef

  course: CourseDetails;
  reviewsList: Review[];
  courseId: string;
  isEnrolled: Boolean = false;
  isAuthor: Boolean = false;
  hasReviews: Boolean = false;
  hasMadeReview: Boolean = false;
  invalidContent: Boolean = false;
  reviewsListCount: number[] = [0, 0, 0, 0, 0, 0];
  fixedAvgRate: number;
  reviewForm: FormGroup;
  replyForm: FormGroup;
  userReviewRate = 5;
  selectedReview: Review;
  userFromLocal;


  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.userFromLocal= this.authenticationService.userValue;

    courseService.getCourseDetails(this.courseId)
      .subscribe((course: CourseDetails) => {
        if (!course) {
          //Will change to navigate to 404 page
          this.router.navigate([""])
        }
        if (this.userFromLocal) {
          this.userService.getUserInfoJWT()
            .subscribe((user: User) => {
              if (user) {
                if ((user['createdCourses'].includes(this.courseId)) || (user['enrolledCourses'].includes(this.courseId))) {
                  this.isEnrolled = true;
                }
                if (user['createdCourses'].includes(this.courseId)){
                  this.isAuthor = true;
                }
              }
            })
        }
        this.course = course;
        if (this.fixedAvgRate) this.fixedAvgRate = Math.round(course.avgRate.valueOf() * 1e0) / 1e0;
      });
      this.loadReviews();

    
  }

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      reviewContent: ['', Validators.required]
    });

    this.replyForm = this.formBuilder.group({
      replyContent: ['', Validators.required]
    });
  }


  get reviewFormControls() { return this.reviewForm.controls; }
  get replyFormControls() { return this.replyForm.controls; }

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      this.invalidContent = true;
      return;
    }
    let review = {};
    review['course'] = this.courseId;
    review['content'] = this.reviewFormControls.reviewContent.value;
    review['rate'] = this.userReviewRate;
    this.reviewService.postReview(review)
      .subscribe(res => {
        if (res.message == 'success') {
          this.loadReviews();
          this.closeReviewModal.nativeElement.click()
        }
        else {
          alert(res.message);
        }
      })
  }

  onSubmitReply(): void {
    if (this.replyForm.invalid) {
      this.invalidContent = true;
      return;
    }
    let body = {
      content: this.replyFormControls.replyContent.value,
      date: Date.now()
    };

    this.reviewService.postReply(this.selectedReview._id.toString(), body)
      .subscribe(res => {
        if (res.message == 'success') {
          this.loadReviews();
          this.closeReplyodal.nativeElement.click()
        }
        else {
          alert(res.message);
        }
      })
  }

  loadReviews() {
    this.reviewService.getReviews(this.courseId)
      .subscribe((reviews: Review[]) => {
        if (reviews.length) {
          this.hasReviews = true;
          this.reviewsList = reviews;
          for (let review of reviews) {
            if (this.userFromLocal) {
              if (review.user._id === this.userFromLocal.userdata._id) {
                this.hasMadeReview = true;
              }
            }
            this.reviewsListCount[review.rate.valueOf()]++;
            this.reviewsListCount[0]++;
          }
        }
      })
  }
  public goToCourseLearningPage() {
    this.router.navigate([`course/learning/${this.course.type}/${this.courseId}`])
  }

  public enrollCourse() {
    //Will go to checkout & payment page here
    //this.router.navigate(["learn/${this.courseId}"])
    if (!localStorage.getItem('user')) {
      //Will show sign in dialog
      return this.router.navigate(["login"])
    }
    this.userService.enrollCourse(this.courseId)
      .subscribe(res => {
        if (res.message == "success") {
          alert("Enroll sucessfully. Going to course learning page now.");
          return this.router.navigate([`course/learning/${this.course.type}/${this.courseId}`]);
        }
        else {
          alert(res.message);
        }
      })
  }

  public postReply(review:Review) {
    this.selectedReview = review;
  }

  public calculateTimeToCurrent(time) {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'seconds ago', 1], // 60
      [120, 'A minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes ago', 60], // 60*60, 60
      [7200, 'An hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours ago', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days ago', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'A week ago', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks ago', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'A month ago', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months ago', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'A year ago', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years ago', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'A century ago', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries ago', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      list_choice = 1;
  
    if (seconds === 0) {
      return 'just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      list_choice = 2;
    }
    var i = 0;
    var length = time_formats.length;
    var format;
    while (i < length) {
      format = time_formats[i++];
      if (seconds < format[0]) {
        if (typeof format[2] === 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1];
      }
    }
    return time;
  }
}
