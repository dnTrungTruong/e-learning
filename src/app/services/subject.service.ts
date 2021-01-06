import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Subject} from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  subjectsUrl = `${environment.apiUrl}/subject`;

  constructor(
    private http: HttpClient
  ) { }

  public getSubjects(): Observable<Subject[]> {
    return this.http.get(this.subjectsUrl)
    .pipe(map(res => 
      res['data'] as Subject[]
    ))
  }
}
