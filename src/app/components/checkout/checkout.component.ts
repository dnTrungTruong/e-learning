import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService, UserService, AuthenticationService } from '../../services';
import { CourseDetails } from '../../models';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('closeProcessingModal') closeProcessingModal: ElementRef

  isValidFormSubmitted: boolean = null;
  isProcessing: boolean = false;
  invalidDiscountCode: boolean = false;
  courseId: string;
  course: CourseDetails;
  responseMessage:string;
  userInformation = {
    name: '',
    mail: ''
  };
  userInformationForm = new FormGroup({
    payment: new FormControl('momo', Validators.required),
    name: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
    discountCode: new FormControl('')
  });

  constructor(
    private userService: UserService,
    private courseService: CourseService,

    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    //If user haven't logged in then navigate
    if (!localStorage.getItem('user')) {
      this.router.navigate(["login"])
    }
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.courseService.getCourseDetails(this.courseId).subscribe((course: CourseDetails) => {
      if (!course) {
        return this.router.navigate(["/error/404"]);
      };
      this.course = course;
    })
  }

  onFormSubmit() {

    // if (!localStorage.getItem('user')) {
    //   //Will show sign in dialog
    //   return this.router.navigate(["login"])
    // }
    // this.router.navigate([`course/${this.courseId}/checkout`]);

    this.isValidFormSubmitted = false;
    if (this.userInformationForm.invalid) {
      setTimeout(() => {
        // close the modal after 3s showing result message
        this.closeProcessingModal.nativeElement.click()
      }, 1000);
      this.closeProcessingModal.nativeElement.click()
      return;
    }
    this.isValidFormSubmitted = true;
    this.isProcessing = true;
    this.userService.enrollCourse(this.courseId)
      .subscribe(res => {
        this.responseMessage = res.message;
        setTimeout(() => {
          // close the processing after 2s and show result
          this.isProcessing = false;
          setTimeout(() => {
            // close the modal after 3s showing result message
            this.closeProcessingModal.nativeElement.click()

            if (res.message == "success") {
              return this.router.navigate([`course/learning/${this.course.type}/${this.courseId}`]);
            }
          }, 3000);
        }, 2000);

      })
    // let paymentMethod = this.userInformationForm.get('payment').value;
    // this.userInformation.name = this.userInformationForm.get('name').value;
    // this.userInformation.mail = this.userInformationForm.get('mail').value;
  }

  public changePaymentMethod(payment: string) {
    this.userInformationForm.patchValue({ payment: payment });
    this.isProcessing = false;
  }

  public applyDiscountCode() {
    console.log(this.userInformationForm.get('discountCode').value);
    this.userInformationForm.patchValue({ discountCode: '' });
    this.invalidDiscountCode = true;
  }
}
