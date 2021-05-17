import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Notification } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notificationActions:any = {
    POST_ANNOUNCEMENT: "posted an announcement",
    POST_REVIEW: "posted a review"
  }
  readonly notificationsUrl = `${environment.apiUrl}/notification`;

  constructor(
    private http: HttpClient
  ) { }

  public getNotifications(): Observable<Notification[]> {
    return this.http.get(`${this.notificationsUrl}`)
    .pipe(map(res => 
      res['data'] as Notification[]
    ))
  }

  public putChecked(notificationId: string) {
    return this.http.put<any>(`${this.notificationsUrl}/check/${notificationId}`, {});
  }
}
