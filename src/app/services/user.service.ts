import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User, UserDetail, Course } from '../models/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  public getUserInfoJWT(): Observable<User> {
    return this.http.get(`${this.usersUrl}/userinfo-with-jwt/`)
    .pipe(map(res => 
      res['data'] as User
    ))
  }

  public getUsers(): Observable<UserDetail[]> {
    return this.http.get(`${this.usersUrl}/`)
    .pipe(map(res => 
      res['data'] as UserDetail[]
    ))
  }

  public getUsersWithPagination(params): Observable<any> {
    return this.http.get(`${this.usersUrl}/`, {params});
  }

  public getUserInfo(userId: string): Observable<UserDetail> {
    return this.http.get(`${this.usersUrl}/${userId}/`)
    .pipe(map(res => 
      res['data'] as UserDetail
    ))
  }

  public getMyEnrolledCourses(): Observable<Course[]> {
    return this.http.get(`${this.usersUrl}/my-enrolled-courses`)
    .pipe(map(res =>
      res['data'] as Course[]
    ))
  }

  public registerUser(regUser: any): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/register`, regUser);
  }

  public enrollCourse(courseId: string): Observable<any> {
    return this.http.put<any>(`${this.usersUrl}/enroll/${courseId}`, {});
  }

  public editUserInfoForAdmin(userId: string, body:any): Observable<any> {
    return this.http.put<any>(`${this.usersUrl}/edit-for-admin/${userId}`, body);
  }

  public resetPassword(body:any): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/password-reset/verify`, body);
  }
}
