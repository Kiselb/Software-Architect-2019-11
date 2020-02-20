import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IClientInfo, IClientResult } from '../../../data';

const SERVER_URL: string = "http://localhost:3000"; //"http://apw.legion.ru:8000"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  public getClients(criteria: string): Observable<IClientInfo[]> {
    return this.httpClient.get<IClientInfo[]>(`${SERVER_URL}/clients?criteria=${criteria}`, {observe: 'response'}).pipe(map(data => data.body));
  }
}
