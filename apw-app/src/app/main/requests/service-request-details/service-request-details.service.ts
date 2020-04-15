import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from  '@angular/common/http';
import { IServiceRequestDetailsRow } from '../../../data';
import { environment } from '../../../../environments/environment';

// https://blog.angular-university.io/rxjs-error-handling/

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestDetailsService {

  constructor(private httpClient: HttpClient) { }

  public getDetails(srid: string): Observable<IServiceRequestDetailsRow[]> {
    return this.httpClient.get<any>(`${environment.backendURL}/requests/${srid}/details`, {observe: 'response'})
    .pipe(map(response => response.body))
    .pipe(catchError(error => { return throwError(error); }));
  }

}
