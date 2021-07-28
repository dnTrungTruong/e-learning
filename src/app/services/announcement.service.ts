import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Announcement, Comment } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  readonly announcementsUrl = `${environment.apiUrl}/announcement`;

  constructor(
    private http: HttpClient
  ) { }

  public getAnnouncements(courseId: string): Observable<Announcement[]> {
    return this.http.get(`${this.announcementsUrl}/${courseId}`)
    .pipe(map(res => 
      res['data'] as Announcement[]
    ))
  }

  public postAnnouncement(body: any) {
    return this.http.post<any>(`${this.announcementsUrl}/`, body);
  }

  public editAnnouncement(body: any, announcementId) {
    return this.http.put<any>(`${this.announcementsUrl}/${announcementId}`, body);
  }

  public postComment(announcementId: string, body: any) {
    return this.http.post<any>(`${this.announcementsUrl}/comment/${announcementId}`, body);
  }

  public postReply(commentId: string, body: any) {
    return this.http.put<any>(`${this.announcementsUrl}/comment/reply/${commentId}`, body);
  }
}
