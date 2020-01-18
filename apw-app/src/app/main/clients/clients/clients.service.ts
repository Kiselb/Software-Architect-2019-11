import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IClientInfo, IClientResult } from '../../../data';

const SERVER_URL: string = "http://localhost:3000/clients";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  public getClients(criteria: string): Observable<HttpResponse<IClientInfo[]>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.httpClient.get<IClientInfo[]>(`${SERVER_URL}?criteria=${criteria}`, {observe: 'response'});
  }
}
