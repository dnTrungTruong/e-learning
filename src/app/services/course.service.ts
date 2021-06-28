import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Course, CourseDetails} from '../models/course.model';

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

  public getCourses(): Observable<Course[]> {
    return this.http.get(this.coursesUrl)
    .pipe(map(res => 
      res['data'] as Course[]
    ))
  }

  public getAllCourses(params): Observable<any> {
    return this.http.get(`${this.coursesUrl}/all`, {params});
  }

  public getHotCourses(): Observable<Course[]> {
    return this.http.get(`${this.coursesUrl}/hot`)
    .pipe(map(res => 
      res['data'] as Course[]
    ))
  }

  public getNewCourses(): Observable<Course[]> {
    return this.http.get(`${this.coursesUrl}/new`)
    .pipe(map(res => 
      res['data'] as Course[]
    ))
  }

  public getRandomCourses(): Observable<Course[]> {
    return this.http.get(`${this.coursesUrl}/random`)
    .pipe(map(res => 
      res['data'] as Course[]
    ))
  }

  public getCourseDetails(courseId): Observable<CourseDetails> {
    return this.http.get(`${this.coursesUrl}/${courseId}`)
    .pipe(map(res => 
      res['data'] as CourseDetails
    ))
  }

  public getProgramingCourseDetails(courseId): Observable<CourseDetails> {
    return this.http.get(`${this.coursesUrl}/programing/${courseId}`)
    .pipe(map(res => 
      res['data'] as CourseDetails
    ))
  }

  public getCourseLearningDetails(courseId): Observable<CourseDetails> {
    return this.http.get(`${this.coursesUrl}/learning/${courseId}`)
    .pipe(map(res => 
      res['data'] as CourseDetails
    ))
  }

  public getProgramingCourseLearningDetails(courseId): Observable<CourseDetails> {
    return this.http.get(`${this.coursesUrl}/programing/learning/${courseId}`)
    .pipe(map(res => 
      res['data'] as CourseDetails
    ))
  }

  public getPendingCoursesCount(): Observable<number> {
    return this.http.get(`${this.coursesUrl}/count-pending-courses`)
    .pipe(map(res => 
      res['data'] as number
    ))
  }

  public searchCoursesBySubject(subject: string, page?: number, size?: number, price?: string): Observable<any> {
    let params = {};

    params[`subject`] = subject;

    if (page) {
      params[`page`] = page - 1;
    }

    if (size) {
      params[`size`] = size;
    }

    if (price) {
      params[`price`] = price;
    }
    return this.http.get(`${this.coursesUrl}/search/`, {params});
  }
  //public searchCourses(queryObject?: {[k:string]: string}): Observable<Course[]> {
  public searchCourses(page?: number, size?: number, price?: string): Observable<any> {
    // if (!queryObject) { 
    //   let tempObject: {[k:string]: string} = {}; 
    //   queryObject = tempObject;
    // }
    //   queryObject.keyword = this.searchKeyWord;
    // let query = new URLSearchParams(queryObject);

    let params = {};

    params[`keyword`] = this.searchKeyWord;

    if (page) {
      params[`page`] = page - 1;
    }

    if (size) {
      params[`size`] = size;
    }

    if (price) {
      params[`price`] = price;
    }

    return this.http.get(`${this.coursesUrl}/search/`, { params});
  }

  public approveCourse(courseId: string) {
    return this.http.put<any>(`${this.coursesUrl}/approve/${courseId}`, {});
  }

  public putCourseTags(courseId: string,body:any) {
    return this.http.put<any>(`${this.coursesUrl}/tags/${courseId}`, body);
  }
}
