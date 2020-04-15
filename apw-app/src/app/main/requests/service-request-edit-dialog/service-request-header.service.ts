import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from  '@angular/common/http';
import { IServiceRequestHeader } from '../../../data';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestHeaderService {

  constructor(private httpClient: HttpClient) { }

  public getRequests(serviceRequestId: string): Observable<IServiceRequestHeader> {
    return this.httpClient.get<any>(`${environment.backendURL}/requests/${serviceRequestId}`, {observe: 'response'})
    .pipe(map(response => response.body[0]))
    .pipe(catchError(error => { return throwError(error); }));
  }
}
