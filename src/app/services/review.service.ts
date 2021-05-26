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

  public getReviewsForAdmin(params, courseId: string): Observable<any> {
    return this.http.get(`${this.reviewsUrl}/admin/${courseId}`, {params});
  }

  public postReview(review: any) {
    return this.http.post<any>(`${this.reviewsUrl}/`, review);
  }

  public postReply(reviewId: string, body: any) {
    return this.http.put<any>(`${this.reviewsUrl}/reply/${reviewId}`, body);
  }

  public deleteReview(reviewId: string) {
    return this.http.delete<any>(`${this.reviewsUrl}/${reviewId}`); 
  }
}
