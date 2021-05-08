import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Review } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  readonly reviewsUrl = `${environment.apiUrl}/review`;

  constructor(
    private http: HttpClient
  ) { }

  public getReviews(courseId: string): Observable<Review[]> {
    return this.http.get(`${this.reviewsUrl}/${courseId}`)
    .pipe(map(res => 
      res['data'] as Review[]
    ))
  }

  public postReview(review: Review) {
    return this.http.post<any>(`${this.reviewsUrl}/`, review);
  }

  public postReply(reviewId: string, body: any) {
    return this.http.put<any>(`${this.reviewsUrl}/reply/${reviewId}`, body);
  }
}
