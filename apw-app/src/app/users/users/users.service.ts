import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IUserInfo, IClientResult } from './../../data';
import {environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(criteria: string): Observable<HttpResponse<IUserInfo[]>> {
    return this.httpClient.get<IUserInfo[]>(`${environment.backendURL}/users?criteria=${criteria}`, {observe: 'response'});
  }
}
