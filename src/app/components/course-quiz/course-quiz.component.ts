import { Component, OnInit } from '@angular/core';
import { QuizService, CourseService } from '../../services';
import { CourseDetails, Quiz } from '../../models';
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


  constructor(
    public quizService: QuizService,
    public courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId');

    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.quizProgress = parseInt(localStorage.getItem('quizProgress'));
      this.quizService.quiz = JSON.parse(localStorage.getItem('quiz'));
      if (this.quizService.quizProgress === this.quizService.quiz.questions.length) {
        this.router.navigate(['course/quiz-result']);
      }
      else {
        this.startTimer();
      }
    }
    else {
      
      this.quizService.getQuiz(this.quizId)
        .subscribe((quiz: Quiz) => {
          if (!quiz) {
            return this.router.navigate(["/error/404"]);
          };
          this.quizService.seconds = 0;
          this.quizService.quizProgress = 0;
          this.quizService.quiz = quiz;
          this.courseService.getCourseDetails(quiz.course)
            .subscribe((courseDetails: CourseDetails) => {
              this.quizService.quiz.courseName = courseDetails.name;
              this.quizService.quiz.courseType = courseDetails.type;
            })
          this.startTimer();
        })
    }

  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  chooseAnswer(index) {
    //Need to find a better way to implement this
    this.quizService.quiz.questions[this.quizService.quizProgress].userAnswer = this.quizService.quiz.questions[this.quizService.quizProgress].answers[index];
    localStorage.setItem('quiz', JSON.stringify(this.quizService.quiz));
    this.quizService.quizProgress++;
    localStorage.setItem('quizProgress', this.quizService.quizProgress.toString());
    if (this.quizService.quizProgress === this.quizService.quiz.questions.length) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['course/quiz-result']);
    }
  }
}
