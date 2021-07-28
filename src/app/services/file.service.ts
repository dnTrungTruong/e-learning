import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  filesUrl = `${environment.apiUrl}/file`;

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(image: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    
 
    formdata.append('image', image);
    
    const req = new HttpRequest('POST', `${this.filesUrl}/image`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  uploadFile(file: File, courseId: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    
 
    formdata.append('file', file);
    
    const req = new HttpRequest('POST', `${this.filesUrl}/s3/${courseId}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  getpresignedurls(logNamespace, fileType, courseId:string) {
    let getheaders = new HttpHeaders().set('Accept', 'application/json');
    let params = new HttpParams().set('fileName', logNamespace).set('fileType', fileType);
    return this.http.get<any>(`${this.filesUrl}/presignedurl/${courseId}`, { params: params, headers: getheaders });
  }
  
  uploadfileAWSS3(fileuploadurl, contenttype, file) { 
 
    const headers = new HttpHeaders({ 'Content-Type': contenttype });
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file,
      {
        headers: headers,
        reportProgress: true, 
      });
    return this.http.request(req);
  }
  
}
