import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourseService, UserService } from '../../services';
import { CourseDetails, User } from '../../models';

@Component({
  selector: 'app-checkout-result',
  templateUrl: './checkout-result.component.html',
  styleUrls: ['./checkout-result.component.css']
})
export class CheckoutResultComponent implements OnInit {

  @ViewChild('closeProcessingModal') closeProcessingModal: ElementRef
  @ViewChild('proceedButton') proceedButton: ElementRef

  user: User = new User();
  courseId: string;
  course: CourseDetails;
  coursePrice: number;
  responseMessage: string;
  isProcessing: Boolean = true;
  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.courseService.getCourseDetails(this.courseId).subscribe((course: CourseDetails) => {
      this.proceedButton.nativeElement.click();

      if (!course) {
        return this.router.navigate(["/error/404"]);
      };
      this.course = course;
      this.coursePrice = course.price.valueOf();
      setTimeout(() => {
        this.userService.getUserInfoJWT()
          .subscribe((user: any) => {
            this.user.userdata = user;
            this.isProcessing = false;
            if (this.user.userdata.enrolledCourses.includes(this.courseId)) {
              this.responseMessage = "success";
              // close the processing after 2s and show result
              setTimeout(() => {
                // close the modal after 3s showing result message
                this.closeProcessingModal.nativeElement.click()
                return this.router.navigate([`course/learning/${this.course.type}/${this.courseId}`]);
              }, 4000);
            }
            else {
              this.responseMessage = "You haven't been enroll to course due to Failed Payment, Slow Processing, Error... Please try again";
              // close the processing after 2s and show result
              setTimeout(() => {
                // close the modal after 3s showing result message
                this.closeProcessingModal.nativeElement.click()
                return this.router.navigate([`course/${this.courseId}`]);
              }, 4000);
            }
          })
      }, 2500)

    })

  }

}
