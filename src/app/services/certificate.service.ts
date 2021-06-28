import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Certificate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  readonly certificatesUrl = `${environment.apiUrl}/certificate`;

  constructor(
    private http: HttpClient
  ) { }

  public getCertificate(certId: string): Observable<Certificate> {
    return this.http.get(`${this.certificatesUrl}/${certId}`)
    .pipe(map(res => 
      res['data'] as Certificate
    ))
  }

  public createCertificate(courseId: string) {
    return this.http.post<any>(`${this.certificatesUrl}/`, {course: courseId});
  }

  public createProgramingCertificate(courseId: string) {
    return this.http.post<any>(`${this.certificatesUrl}/programing`, {course: courseId});
  }
}
