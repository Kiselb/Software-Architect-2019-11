import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IServiceRequestsTypeInfo } from '../../../data';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsTypesService {

  constructor(private httpClient: HttpClient) { }

  public getRequestsTypes(): Observable<IServiceRequestsTypeInfo[]> {
    return this.httpClient.get<IServiceRequestsTypeInfo[]>(`${environment.backendURL}/requests/types`, {observe: 'response'}).pipe(map(data => data.body));
  }
}
