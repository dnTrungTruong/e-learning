import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Lecture} from '../models/lecture.model';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  lecturesUrl = `${environment.apiUrl}/lecture`;

  constructor(
    private http: HttpClient
  ) { }

  public postNewLecture(lecture: Lecture, index?:number): Observable<any> {
    const { _id, ...lectureWithoutID} = lecture;
    if (index && index > 0 ){
      return this.http.post<any>(`${this.lecturesUrl}/${index}`, lectureWithoutID);
    }
    else {
      return this.http.post<any>(`${this.lecturesUrl}/`, lectureWithoutID);
    }
  }

  public editLecture(lecture: Lecture): Observable<any> {
    const { _id, ...lectureWithoutID} = lecture;
    return this.http.put<any>(`${this.lecturesUrl}/${_id}`, lectureWithoutID);
  }

  public deleteLecture(lectureId: string): Observable<any> {
    return this.http.delete<any>(`${this.lecturesUrl}/${lectureId}`);
  }
}
