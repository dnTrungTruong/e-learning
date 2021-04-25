import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services';
import { Quiz } from '../../models';
import { Router } from "@angular/router"

@Component({
  selector: 'app-course-quiz-result',
  templateUrl: './course-quiz-result.component.html',
  styleUrls: ['./course-quiz-result.component.css']
})
export class CourseQuizResultComponent implements OnInit {

  constructor(
    public quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.quizProgress = parseInt(localStorage.getItem('quizProgress'));
      this.quizService.quiz = JSON.parse(localStorage.getItem('quiz'));
      if (this.quizService.quizProgress == this.quizService.quiz.questions.length) {
        this.quizService.submitQuiz()
          .subscribe((quiz: Quiz) => {
            this.quizService.quiz.questions = quiz.questions;
            this.quizService.quiz.correctAnswers = quiz.correctAnswers;
            this.quizService.quiz.totalScore = quiz.totalScore;
            localStorage.setItem('seconds', "0");
            localStorage.setItem('quiz', "");
            localStorage.setItem('quizProgress', "0");
          })
      }
      else {
        this.router.navigate([`course/quiz/${this.quizService.quiz._id}`]);
      }
    }
    else {
      this.router.navigate(['']);
    }

  }

  restartQuiz() {
    localStorage.setItem('seconds', "0");
    localStorage.setItem('quiz', "");
    localStorage.setItem('quizProgress', "0");
    this.router.navigate([`course/quiz/${this.quizService.quiz._id}`]);
  }

  goToCoursePage() {
    this.router.navigate([`course/learning/${this.quizService.quiz.course}`]);
  }

}
