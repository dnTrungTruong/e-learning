import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Course} from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  coursesUrl = `${environment.apiUrl}/course`;
  private keyWord = new BehaviorSubject('');
  keyword= this.keyWord.asObservable();
  searchKeyWord: string;

  constructor(
    private http: HttpClient
  ) { this.keyword.subscribe(keyword => this.searchKeyWord=keyword) }
  
  changeKeyWord(string) {
    this.keyWord.next(string)
  }

  // public getSearchString(): string {
  //   return this.searchString;
  // }

  // public setSearchString(string): void {
  //   this.searchString = string;
  // }

  public getAllCourse(): Observable<Course[]> {
    return this.http.get(this.coursesUrl)
    .pipe(map(res => 
      res['data'] as Course[]
    ))
  }

  public getHotCourses(): Observable<Course[]> {
    return this.http.get(`${this.coursesUrl}/hot`)
    .pipe(map(res => 
      res['data'] as Course[]
    ))
  }

  public searchCourses(): Observable<Course[]> {
    return this.http.get(`${this.coursesUrl}/search/${this.searchKeyWord}`)
    .pipe(map(res => 
      res['data'] as Course[]
    ))
  }
}
