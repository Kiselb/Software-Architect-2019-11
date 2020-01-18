import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IClientParams, IClientResult } from '../../data';

const SERVER_URL: string = "http://localhost:3000/clients";

@Injectable({
  providedIn: 'root'
})
export class ClientsRegisterService {

  constructor(private httpClient: HttpClient) { }

  public addClient(params: IClientParams): Observable<HttpResponse<IClientResult>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.httpClient.post<IClientResult>(SERVER_URL, params, {headers: headers, reportProgress: false, observe: 'response'});
  }
}
