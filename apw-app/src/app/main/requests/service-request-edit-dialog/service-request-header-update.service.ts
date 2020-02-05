import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { IServiceRequestHeader, IServiceRequestResult } from '../../../data';

const SERVER_URL: string = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestHeaderUpdateService {

  constructor(private httpClient: HttpClient) { }

  public getRequests(params: IServiceRequestHeader): Observable<IServiceRequestResult> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.put<IServiceRequestResult>(`${SERVER_URL}/requests/${params.ServiceRequestID}`, params, {headers});
  }

}
