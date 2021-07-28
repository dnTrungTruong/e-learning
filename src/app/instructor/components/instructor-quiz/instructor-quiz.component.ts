import { Component, OnInit, } from '@angular/core';
import { QuizService, CourseService } from '../../../services';
import { CourseDetails, Quiz, Question } from '../../../models';
import { Router } from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { tick } from '@angular/core/testing';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-instructor-quiz',
  templateUrl: './instructor-quiz.component.html',
  styleUrls: ['./instructor-quiz.component.css']
})
export class InstructorQuizComponent implements OnInit {

  sectionId: string;
  courseId: string;
  courseDetails: CourseDetails;
  quiz: Quiz;
  isFinal: Boolean = false;
  isSubmitted: Boolean = false;
  currentQuestion: number = 0;
  question: string = "qqqq";
  disabled:Boolean = false;
  alerts: Alert[] = [];

  quizInformationForm = this.fb.group({
    name: new FormControl('', Validators.required),
    limitTime: new FormControl(120, [Validators.required, Validators.min(120), Validators.pattern(/\-?\d*\.?\d{1,2}/)]),
    isFinal: new FormControl(false, Validators.required),
    questions: this.fb.array([])
  });

  constructor(
    public quizService: QuizService,
    public courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.sectionId = this.route.snapshot.paramMap.get('sectionId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.courseService.getCourseLearningDetails(this.courseId).subscribe((course: CourseDetails) => {
      this.courseDetails = course;
      
      const sectionIndex = this.courseDetails.sections.findIndex((section) => {
        return section._id == this.sectionId;
      });
      if (sectionIndex == -1) {
        return this.router.navigate(['/error/404'])
      }

      let quizObj = this.courseDetails.sections[sectionIndex].quiz;

      if (quizObj) {
        this.quiz = <any>quizObj;
        this.isFinal = this.quiz.isFinal;
        this.quizInformationForm.patchValue({
          name: this.quiz.name,
          limitTime: this.quiz.limitTime,
          isFinal: this.quiz.isFinal
        });
        for (let question of this.quiz.questions) {
          let answerArr = [];
          for (let answer of question.answers) {
            answerArr.push(this.fb.group({ answer: [answer, Validators.required] }));
          }
          const questionNewForm = this.fb.group({
            question: new FormControl(question.question, Validators.required),
            correctAnswer: new FormControl(question.correctAnswer, Validators.required),
            answers: this.fb.array(answerArr)
          });
          this.questions.push(questionNewForm);
        }
        if ((this.courseDetails.status == 'approved' || this.courseDetails.status == 'pending') && this.courseDetails.type == 'mooc') {
          this.disabled = true;
          this.quizInformationForm.disable();
        }
      }
      else {

        const questionNewForm = this.fb.group({
          question: new FormControl('', Validators.required),
          correctAnswer: new FormControl('', Validators.required),
          answers: this.fb.array([
            this.fb.group({ answer: ['', Validators.required] }),
            this.fb.group({ answer: ['', Validators.required] }),
            this.fb.group({ answer: ['', Validators.required] }),
            this.fb.group({ answer: ['', Validators.required] })
          ])
        })
        this.questions.push(questionNewForm);
      }
    })

  }
  get name() { return this.quizInformationForm.get('name'); }
  get limitTime() { return this.quizInformationForm.get('limitTime'); }

  get questions() {
    return this.quizInformationForm.controls["questions"] as FormArray;
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
 
  addQuestion() {
    const questionNewForm = this.fb.group({
      question: new FormControl('qqqq', Validators.required),
      correctAnswer: new FormControl('a3', Validators.required),
      answers: this.fb.array([
        this.fb.group({ answer: ['', Validators.required] }),
        this.fb.group({ answer: ['', Validators.required] }),
        this.fb.group({ answer: ['', Validators.required] }),
        this.fb.group({ answer: ['', Validators.required] })
      ])
    });
    this.questions.push(questionNewForm);
  }

  deleteQuestion(questionIndex: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(questionIndex);
    }
    else {
      alert("Cannot delete the last question remain.")
    }
  }

  questionAnswers(questionIndex: number): FormArray {
    return this.questions
      .at(questionIndex)
      .get('answers') as FormArray;
  }

  changeCurrentQuestion(index: number) {
    if (index != this.currentQuestion) {
      this.currentQuestion = index;
    }
  }

  onChangeQuestion() {
  }

  changeCorrectAnswer(questionIndex: number, answerIndex: number) {
    this.questions.controls[questionIndex].patchValue({ correctAnswer: this.questionAnswers(questionIndex).controls[answerIndex].value['answer'] });
    console.log(this.questionAnswers(questionIndex).controls[answerIndex].value);
    console.log(this.questions.controls[questionIndex]);
  }

  addAnswer(questionIndex: number) {
    const answerNewForm = this.fb.group({ answer: ['', Validators.required] });
    this.questionAnswers(questionIndex).push(answerNewForm)
  }

  deleteAnswer(questionIndex: number, answerIndex: number) {
    this.questionAnswers(questionIndex).removeAt(answerIndex);
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log("submited");
    if (this.quizInformationForm.invalid) {
      console.log("invalid")
      return;
    }
    if (this.disabled) {
      return;
    }
    console.log("valid");
    if (this.quiz) {
      console.log("edit");
      let questionsArr = [];
      for (let question of this.questions.controls) {
        let answerArr = [];
        for (let answer of (question.get('answers') as FormArray).controls) {
          answerArr.push(answer.get('answer').value);
        }
        let questionObj = {
          question: question.get('question').value,
          correctAnswer: question.get('correctAnswer').value,
          answers: answerArr
        };
        questionsArr.push(questionObj);
      }
      let body = {
        course: this.courseId,
        section: this.sectionId,
        name: this.name.value,
        limitTime: this.limitTime.value,
        isFinal: this.isFinal,
        questions: questionsArr
      };
      this.quizService.editQuiz(body, this.quiz._id.toString()).subscribe(res => {
        if (res.message = "success") {
          this.alerts.push({ type: 'success', message: 'Quiz changes saved successfully'});
        }
        else {
          this.alerts.push({ type: 'danger', message: 'ERROR:' + res.message});
        }
      })
    }
    else {
      let questionsArr = [];
      for (let question of this.questions.controls) {
        let answerArr = [];
        for (let answer of (question.get('answers') as FormArray).controls) {
          answerArr.push(answer.get('answer').value);
        }
        let questionObj = {
          question: question.get('question').value,
          correctAnswer: question.get('correctAnswer').value,
          answers: answerArr
        };
        questionsArr.push(questionObj);
      }
      let body = {
        course: this.courseId,
        section: this.sectionId,
        name: this.name.value,
        limitTime: this.limitTime.value,
        isFinal: this.isFinal,
        questions: questionsArr
      };
      console.log(body);
      this.quizService.createQuiz(body).subscribe(res=> {
        if (res.mesage == "success") {
          this.alerts.push({ type: 'success', message: 'Quiz created successfully'});
        }
        else {
          this.alerts.push({ type: 'danger', message: 'ERROR:' + res.message});

        }
      })
    }
  }
}
