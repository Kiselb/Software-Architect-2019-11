import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from  '@angular/common/http';
import { IServiceRequestHeader } from '../../../data';

//const SERVER_URL: string = "http://localhost:3000";
const SERVER_URL: string = "https://apw.legion.ru:8443";

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestHeaderService {

  constructor(private httpClient: HttpClient) { }

  public getRequests(serviceRequestId: string): Observable<IServiceRequestHeader> {
    return this.httpClient.get<any>(`${SERVER_URL}/requests/${serviceRequestId}`, {observe: 'response'})
    .pipe(map(response => response.body))
    .pipe(map(body => JSON.parse(body[0].DATA)))
    .pipe(map(data => data["SR-HEADERS"][0]))
    .pipe(catchError(error => { return throwError(error); }));
  }
}
