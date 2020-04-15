import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from  '@angular/common/http';
import { IServiceRequestHeader } from '../../../data';
import { environment } from '../../../../environments/environment'

// https://blog.angular-university.io/rxjs-error-handling/

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private httpClient: HttpClient) { }

  public getRequests(criteria: string, sortOrder: string, sortType: string, page: number, pageSize: number, section: number): Observable<IServiceRequestHeader[]> {
    return this.httpClient.get<any>(`${environment.backendURL}/requests?section=${section}&criteria=${criteria}&sortorder=${sortOrder}&sorttype=${sortType}&page=${page}&pagesize=${pageSize}`, {observe: 'response'})
    .pipe(map(response => response.body["SR-HEADERS"]))
    .pipe(catchError(error => { return throwError(error); }));
  }
}
