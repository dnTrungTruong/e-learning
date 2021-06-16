import { Component, OnInit } from '@angular/core';
import { QuizService, AttemptService, CertificateService } from '../../services';
import { Attempt } from '../../models';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-course-quiz-attempts',
  templateUrl: './course-quiz-attempts.component.html',
  styleUrls: ['./course-quiz-attempts.component.css']
})
export class CourseQuizAttemptsComponent implements OnInit {

  quizId: string;
  courseId: string;
  attempt: Attempt;
  quizIndex: number;

  constructor(
    public quizService: QuizService,
    public attemptService: AttemptService,
    public certificateService: CertificateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    // this.quizService.getQuiz(this.quizId).subscribe((quiz: Quiz) => {
    //   if (!quiz) {
    //     return this.router.navigate(["/error/404"]);
    //   };
    //   // this.quizService.seconds = 0;
    //   // this.quizService.quizProgress = 0;
    //   this.quizService.quiz = quiz;

    // })

    this.attemptService.getAttemptByQuiz(this.quizId).subscribe((attempt: Attempt) => {
      console.log(attempt);
      if (attempt) {
        this.attempt = attempt;
        this.quizIndex = this.attempt.quizzes.findIndex((quizzes) => {
          return quizzes.quiz._id == this.quizId;
        });
      }
      else {
        this.attemptService.createAttempt(this.courseId).subscribe((attempt: Attempt) => {
          console.log(attempt);
          this.attempt = attempt;
          this.quizIndex = this.attempt.quizzes.findIndex((quizzes) => {
            return quizzes.quiz._id == this.quizId;
          });
        })
      }

      console.log(this.attempt);
      console.log(this.quizIndex);
    })
  }

  ngOnInit(): void {

  }

  public startQuiz() {
    if (this.attempt.quizzes[this.quizIndex].attempts.length > 1) {
      alert("You can only attempt a quiz 2 times.");
      return;
    }
    this.attemptService.putNewAttempt(this.attempt._id.toString(), this.quizId).subscribe(res => {
      if (res.message == "success") {
        this.router.navigate([`/course/${this.courseId}/quiz/${this.quizId}`]);
      }
      else {
        alert(res.message);
      }
    })
  }

  public displayQuizAllowedTime() {
    if (this.attempt) {
      return Math.floor(this.attempt.quizzes[this.quizIndex].quiz.limitTime.valueOf() / 3600) + ' hours '
        + Math.floor(this.attempt.quizzes[this.quizIndex].quiz.limitTime.valueOf() / 60) + ' minutes '
        + Math.floor(this.attempt.quizzes[this.quizIndex].quiz.limitTime.valueOf() % 60) + ' seconds';
    }
  }

  public goToCoursePage() {
    this.router.navigate([`course/learning/${this.attempt.course.type}/${this.attempt.course._id}`]);
  }

  isTimeOver(date: string) {
    if (new Date(date).getTime() <= new Date().getTime()) {
      return true;
    }
    else {
      return false;
    }
  }

  isExistQuizInProgress() {
    if (this.attempt) {
      if ((this.attempt.quizzes[this.quizIndex].attempts.length) > 0) {
        if (this.attempt.quizzes[this.quizIndex].attempts[this.attempt.quizzes[this.quizIndex].attempts.length -1].attemptSubmittedTime) {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
  }

  public formatDateTime(date: string) {
    let myMoment: moment.Moment = moment(date);
    let localTime = myMoment.utc().local().format('YYYY-MM-DD HH:mm:ss');
    let utcTime = myMoment.utc().format('YYYY-MM-DD HH:mm:ss');
    return localTime + ' (' + utcTime + ' UTC)';
  }

  public claimCertificate() {
    this.certificateService.createCertificate(this.courseId).subscribe(res => {
      if (res.message == "success") {
        console.log(res['data']['_id']);
        console.log(res['data']);
        let certId = res['data']['_id'];
        this.router.navigate([`/certificate/${certId}`]);
      }
      else {
        alert(res.message);
      }
    })
  }
}
