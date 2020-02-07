import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from  '@angular/common/http';
import { IServiceRequestDetailsRow } from '../../../data';

// https://blog.angular-university.io/rxjs-error-handling/

const SERVER_URL: string = "http://apw.legion.ru:8000"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestDetailsService {

  constructor(private httpClient: HttpClient) { }

  public getDetails(srid: string): Observable<IServiceRequestDetailsRow[]> {
    return this.httpClient.get<any>(`${SERVER_URL}/requests/${srid}/details`, {observe: 'response'})
    .pipe(map(response => response.body))
    .pipe(map(body => JSON.parse(body[0].DATA)))
    .pipe(catchError(error => { return throwError(error); }));
  }

}
