import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services';

interface Alert {
  type: string;
  message: string;
}



@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  email: string;
  secretCode: string;
  isValidFormSubmitted: boolean = null;
  isProcessing: boolean = false;
  responseMessage: string;
  passwordRecoveryForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
    secretCode: new FormControl('', Validators.required)
  });

  alerts: Alert[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    if (this.passwordRecoveryForm.invalid) {

    }
    this.email = this.route.snapshot.paramMap.get('email');
    this.secretCode = this.route.snapshot.paramMap.get('secretCode');
    console.log(this.email);
    console.log(this.secretCode);
    this.passwordRecoveryForm.patchValue({ email: this.email, secretCode: this.secretCode });
  }

  ngOnInit(): void {

  }

  public onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.passwordRecoveryForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    let body = {
      email: this.passwordRecoveryForm.get('email').value,
      password: this.passwordRecoveryForm.get('password').value,
      password2: this.passwordRecoveryForm.get('passwordConfirm').value,
      code: this.passwordRecoveryForm.get('secretCode').value
    };
    this.userService.resetPassword(body).subscribe(res => {
      if (res.message == "success") {
        this.alerts.push({
          type: "success",
          message: "Your password has been reset successfully. You will be redirect to login in 5 seconds."
        });
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 5000);
      }
      else {
        this.alerts.push({
          type: "danger",
          message: "Error!!!" + res.message
        });
      }
    })
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
