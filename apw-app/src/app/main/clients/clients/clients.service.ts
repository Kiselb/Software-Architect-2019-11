import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IClientInfo, IClientResult } from '../../../data';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  public getClients(criteria: string): Observable<IClientInfo[]> {
    return this.httpClient.get<IClientInfo[]>(`${environment.backendURL}/clients?criteria=${criteria}`, {observe: 'response'}).pipe(map(data => data.body));
  }
}
