import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Resource} from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  resourcesUrl = `${environment.apiUrl}/resource`;

  constructor(
    private http: HttpClient
  ) { }

  public postNewResource(resource: Resource): Observable<any> {
    const { _id, ...resourceWithoutID} = resource;
    return this.http.post<any>(`${this.resourcesUrl}/`, resourceWithoutID);
  }

  public editResource(resource: Resource): Observable<any> {
    const { _id, ...resourceWithoutID} = resource;
    return this.http.put<any>(`${this.resourcesUrl}/${_id}`, resourceWithoutID);
  }
  public deleteResource(resource: Resource): Observable<any> {
    return this.http.delete<any>(`${this.resourcesUrl}/${resource._id}`);
  }
}
