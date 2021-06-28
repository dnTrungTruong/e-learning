import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  compilerUrl = `${environment.apiUrl}/compiler`;

  constructor(
    private http: HttpClient
  ) { }


  public getTemplate(params): Observable<any> {
    return this.http.get(`${this.compilerUrl}/get-template`, {params});
  }

  public submitCode(body:any): Observable<any> {
    return this.http.post<any>(`${this.compilerUrl}/run`, body);
  }
}
