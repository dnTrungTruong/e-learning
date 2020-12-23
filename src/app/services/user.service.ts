import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  public registerUser(regUser: any): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/register`, regUser);
  }
}
