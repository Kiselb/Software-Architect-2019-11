import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IClientInfo, IClientResult } from '../../../data';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientUpdateService {

  constructor(private httpClient: HttpClient) { }

  public update(params: IClientInfo): Observable<IClientResult> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.put<IClientResult>(`${environment.backendURL}/clients/${params.ClientID}`, params, {headers});
  }
}
