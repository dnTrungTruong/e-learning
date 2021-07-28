import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Section} from '../models/section.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  sectionUrl = `${environment.apiUrl}/section`;

  constructor(
    private http: HttpClient
  ) { }

  public postNewSection(section: Section, index?: number): Observable<any> {
    const { _id, ...sectionWithoutID} = section;
    if (index && index > 0) {
      return this.http.post<any>(`${this.sectionUrl}/${index}`, sectionWithoutID);
    }
    else {
      return this.http.post<any>(`${this.sectionUrl}/`, sectionWithoutID);
    }
  }

  public editSection(section: Section): Observable<any> {
    const { _id, ...sectionWithoutID} = section;
    return this.http.put<any>(`${this.sectionUrl}/${_id}`, sectionWithoutID);
  }
  public deleteSection(section: Section): Observable<any> {
    return this.http.delete<any>(`${this.sectionUrl}/${section._id}`);
  }
}
