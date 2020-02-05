import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IServiceRequestsTypeInfo } from '../../../data';

const SERVER_URL: string = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class RequestsTypesService {

  constructor(private httpClient: HttpClient) { }

  public getRequestsTypes(): Observable<IServiceRequestsTypeInfo[]> {
    return this.httpClient.get<IServiceRequestsTypeInfo[]>(`${SERVER_URL}/requests/types`, {observe: 'response'}).pipe(map(data => data.body));
  }
}
