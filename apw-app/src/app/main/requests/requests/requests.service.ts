import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from  '@angular/common/http';
import { IServiceRequestHeader } from '../../../data';

// https://blog.angular-university.io/rxjs-error-handling/

const SERVER_URL: string = "http://apw.legion.ru:8000"; //"http:/apw.legion.ru:8000"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private httpClient: HttpClient) { }

  public getRequests(criteria: string, sortOrder: string, sortType: string, page: number, pageSize: number, section: number): Observable<IServiceRequestHeader[]> {
    return this.httpClient.get<any>(`${SERVER_URL}/requests?section=${section}&criteria=${criteria}&sortorder=${sortOrder}&sorttype=${sortType}&page=${page}&pagesize=${pageSize}`, {observe: 'response'})
    .pipe(map(response => response.body))
    .pipe(map(body => JSON.parse(body[0].DATA)))
    .pipe(catchError(error => { return throwError(error); }));
  }
}
