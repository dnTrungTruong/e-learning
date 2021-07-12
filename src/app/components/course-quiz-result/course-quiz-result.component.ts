import { Component, OnInit } from '@angular/core';
import { AttemptService, CertificateService } from '../../services';
import { Attempt } from '../../models';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-quiz-result',
  templateUrl: './course-quiz-result.component.html',
  styleUrls: ['./course-quiz-result.component.css']
})
export class CourseQuizResultComponent implements OnInit {

  quizId: string;
  courseId: string;
  attempt: Attempt;
  quizIndex: number;
  attemptNo: number;

  constructor(
    public attemptService: AttemptService,
    public certificateService: CertificateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.attemptService.getAttemptByQuiz(this.quizId).subscribe((attempt: Attempt) => {
      if (attempt) {
        this.attempt = attempt;
        this.quizIndex = this.attempt.quizzes.findIndex((quizzes) => {
          return quizzes.quiz._id == this.quizId;
        });
      }
      else {
        return this.router.navigate([`course/${this.courseId}/attempt-quiz/${this.quizId}`]);
      }
      this.attemptNo = this.attempt.quizzes[this.quizIndex].attempts.length - 1;
      if (this.attemptNo < 0) {
        return this.router.navigate([`course/${this.courseId}/attempt-quiz/${this.quizId}`]);
      }
      if (!this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptSubmittedTime) {
        if (new Date(this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptEndTime).getTime() <= new Date().getTime()) {
          this.attemptService.submitAttempt(this.attempt._id.toString(), this.quizId).subscribe(res => {
            if (res.message == "success") {
              this.attempt = res['data'];
            }
            else {
              alert(res.message);
            }
          })
        }
        else {
          return this.router.navigate([`course/${this.courseId}/quiz/${this.quizId}`]);
        }
      }

    })
  }

  restartQuiz() {
    this.router.navigate([`/course/${this.courseId}/attempt-quiz/${this.quizId}`]);
  }

  goToCoursePage() {
     this.router.navigate([`/course/learning/${this.attempt.course.type}/${this.attempt.course._id}`]);
  }

  public displayTimeElapsed() {
    if (this.attempt) {
      if (this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptSubmittedTime) {
        let seconds = Math.floor((new Date(this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptSubmittedTime).getTime() - new Date(this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptDate).getTime())/1000);
        return Math.floor(seconds / 3600) + ':' + Math.floor(seconds / 60) + ':' + Math.floor(seconds % 60);
      }
    }
    
    return "";
  }

  public claimCertificate() {
    this.certificateService.createCertificate(this.courseId).subscribe(res => {
      if (res.message == "success") {
        let certId = res['data']['_id'];
        this.router.navigate([`/certificate/${certId}`]);
      }
      else {
        alert(res.message);
      }
    })
  }
  
}
