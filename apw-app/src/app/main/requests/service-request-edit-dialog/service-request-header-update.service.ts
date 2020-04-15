import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { IServiceRequestHeader, IServiceRequestResult } from '../../../data';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestHeaderUpdateService {

  constructor(private httpClient: HttpClient) { }

  public setHeader(params: IServiceRequestHeader): Observable<IServiceRequestResult> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.put<IServiceRequestResult>(`${environment.backendURL}/requests/${params.ServiceRequestID}`, params, {headers});
  }

  public setStatus(params: IServiceRequestHeader): Observable<IServiceRequestResult> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.put<IServiceRequestResult>(`${environment.backendURL}/requests/${params.ServiceRequestID}/status`, params, {headers});
  }

}
