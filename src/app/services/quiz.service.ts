import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Quiz } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  readonly quizzesUrl = `${environment.apiUrl}/quiz`;
  courseName: string;
  // quiz: Quiz;
  seconds: number;
  timer;
  quizProgress: number;

  constructor(
    private http: HttpClient
  ) { }

  public getQuiz(quizId: string): Observable<Quiz> {
    return this.http.get(`${this.quizzesUrl}/${quizId}`)
    .pipe(map(res => 
      res['data'] as Quiz
    ))
  }

  public createQuiz(body: any) {
    return this.http.post<any>(`${this.quizzesUrl}/`, body);
  }

  public editQuiz(body: any, quizId:string) {
    return this.http.put<any>(`${this.quizzesUrl}/${quizId}`, body);
  }

  // public submitQuiz() {
  //   return this.http.post<any>(`${this.quizzesUrl}/submit/${this.quiz._id}`, {questions: this.quiz.questions})
  //   .pipe(map(res => 
  //     res['data'] as Quiz
  //   ))
  // }

  // public displayQuizLimitTime() {
  //   if (this.quiz) {
  //     return Math.floor(this.quiz.limitTime.valueOf() / 3600) + ' hours ' + Math.floor(this.quiz.limitTime.valueOf() / 60) + ' minutes ' + Math.floor(this.quiz.limitTime.valueOf() % 60) + ' seconds';

  //   }
  //   else {
  //     return;
  //   }
  //   //return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  // }
}
