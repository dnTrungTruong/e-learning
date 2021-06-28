import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserProgress } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserProgressService {

  readonly userProgressesUrl = `${environment.apiUrl}/user-progress`;

  constructor(
    private http: HttpClient
  ) { }

  public getUserProgress(courseId: string): Observable<UserProgress> {
    return this.http.get(`${this.userProgressesUrl}/${courseId}`)
    .pipe(map(res => 
      res['data'] as UserProgress
    ))
  }

  public updateCurrentLesson(courseId: string, sectionId:string, lessonIndex:number): Observable<any> {
    return this.http.post<any>(`${this.userProgressesUrl}/update-current-lesson/${courseId}`,{section: sectionId, lessonIndex: lessonIndex})
  }
}
