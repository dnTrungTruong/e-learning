import { Component, OnInit } from '@angular/core';
import { QuizService, AttemptService } from '../../services';
import { Attempt, Quiz, Question } from '../../models';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-quiz',
  templateUrl: './course-quiz.component.html',
  styleUrls: ['./course-quiz.component.css']
})
export class CourseQuizComponent implements OnInit {

  courseName: string;
  quizId: string;
  courseId: string;
  attempt: Attempt;
  quizIndex: number;
  attemptNo: number;
  quizQuestions: Question[] = [];
  currentDate: Date;

  constructor(
    public quizService: QuizService,
    public attemptService: AttemptService,
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
      if (new Date(this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptEndTime).getTime() < Date.now()) {
        alert("The time to do this quiz attempt was over.");
        return this.router.navigate([`course/${this.courseId}/attempt-quiz/${this.quizId}`]);
      }

      if (this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptSubmittedTime) {
        alert("Sorry. This attempt has been submitted.");
        return this.router.navigate([`course/${this.courseId}/attempt-quiz/${this.quizId}`]);
      }

      this.quizQuestions = this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].questions;
      console.log(this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].questions);
      console.log(this.quizQuestions);

      this.quizService.quizProgress = 0;

      this.startTimer();
    })

  }

  ngOnDestroy() {
    if (this.quizService.timer) {
      clearInterval(this.quizService.timer);
    }
  }
  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.currentDate = new Date();
      //TODO: Check time to submit
      if (new Date(this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptEndTime).getTime() <= this.currentDate.getTime()) {
        if (!this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptSubmittedTime) {
          alert("The time to do this quiz attempt is over. You will now be redirect to result page.");
          this.router.navigate([`course/${this.courseId}/quiz-result/${this.quizId}`]);
        } else {
          alert("Sorry. This attempt has been submitted.");
          this.router.navigate([`course/${this.courseId}/quiz-result/${this.quizId}`]);
        }
      }
    }, 1000);
  }

  chooseQuestion(index) {
    this.quizService.quizProgress = index;
  }

  previousQuestion() {
    if (this.quizService.quizProgress > 0) {
      this.quizService.quizProgress--;
    }
  }

  nextQuestion() {
    if (this.quizService.quizProgress < this.quizQuestions.length - 1) {
      this.quizService.quizProgress++;
    }
  }

  chooseAnswer(index) {
    //Need to find a better way to implement this
    this.quizQuestions[this.quizService.quizProgress].userAnswer = this.quizQuestions[this.quizService.quizProgress].answers[index];
    this.attemptService.updateUserAnswers(this.attempt._id.toString(), this.quizId, this.quizQuestions).subscribe(res => {
      if (res.message != "success") {
        alert("Error!" + res.message);
      }
    })
    console.log(this.quizQuestions[this.quizService.quizProgress].userAnswer);
    // if (this.quizService.quizProgress === this.quizService.quiz.questions.length) {
    //   clearInterval(this.quizService.timer);
    //   this.router.navigate(['course/quiz-result']);
    // }
  }

  submitAnswers() {
    if(confirm(`Are you sure you want to submit your answer?`)) {
      this.attemptService.submitAttempt(this.attempt._id.toString(), this.quizId).subscribe(res => {
        if (res.message == "success") {
          console.log("Submitted");
          clearInterval(this.quizService.timer);
          this.router.navigate([`/course/${this.courseId}/quiz-result/${this.quizId}`]);
        }
        else {
          alert(res.message);
        }
      })
    }
  }

  public displayTimeleft() {
    if (this.attempt) {
      if (this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptEndTime && this.currentDate) {
        let totalSeconds = Math.floor((new Date(this.attempt.quizzes[this.quizIndex].attempts[this.attemptNo].attemptEndTime).getTime() - (this.currentDate.getTime())) / 1000);;
        let totalMinutes = Math.floor(totalSeconds / 60);
        let totalHours = Math.floor(totalMinutes / 60);
        let totalDays = Math.floor(totalHours / 24);

        let hours = totalHours - (totalDays * 24);
        let minutes = totalMinutes - (totalDays * 24 * 60) - (hours * 60);
        let seconds = totalSeconds - (totalDays * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        return hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();
      }
    }
    return "";

  }
}
