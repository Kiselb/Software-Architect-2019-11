import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IClientInfo, IClientResult } from '../../../data';

const SERVER_URL: string = "http://apw.legion.ru:8000"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ClientUpdateService {

  constructor(private httpClient: HttpClient) { }

  public update(params: IClientInfo): Observable<IClientResult> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.put<IClientResult>(`${SERVER_URL}/clients/${params.ClientID}`, params, {headers});
  }
}
