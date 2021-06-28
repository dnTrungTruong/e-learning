import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Attempt, Question } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {

  readonly attemptsUrl = `${environment.apiUrl}/attempt`;

  constructor(
    private http: HttpClient
  ) { }

  public getAttempt(courseId: string): Observable<Attempt> {
    return this.http.get(`${this.attemptsUrl}/${courseId}`)
    .pipe(map(res => 
      res['data'] as Attempt
    ))
  }

  public getAttemptByQuiz(quizId: string): Observable<Attempt> {
    return this.http.get(`${this.attemptsUrl}/attempt-by-quiz/${quizId}`)
    .pipe(map(res => 
      res['data'] as Attempt
    ))
  }

  public putNewAttempt(attemptId: string, quizId: string) {
    return this.http.put<any>(`${this.attemptsUrl}/${attemptId}`, {quiz: quizId});
    // .pipe(map(res => 
    //   res['data'] as Attempt
    // ))
  }

  public createAttempt(courseId: string) {
    return this.http.post<any>(`${this.attemptsUrl}/`, {course: courseId})
    .pipe(map(res => 
      res['data'] as Attempt
    ))
  }

  public updateUserAnswers(attemptId: string, quizId:string, questions: Question[]) {
    return this.http.put<any>(`${this.attemptsUrl}/update/${attemptId}`, {quiz: quizId, questions: questions});
  }

  public submitAttempt(attemptId: string, quizId:string,) { //questions: Question[]) {
    return this.http.put<any>(`${this.attemptsUrl}/submit/${attemptId}`, {quiz: quizId});//{quiz: quizId, questions: questions});
  }
}
