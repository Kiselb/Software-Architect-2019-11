import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IUserInfo, IClientResult } from './../../data';

const SERVER_URL: string = "http://localhost:3000"; //"http://apw.legion.ru:8000"; //"http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(criteria: string): Observable<HttpResponse<IUserInfo[]>> {
    return this.httpClient.get<IUserInfo[]>(`${SERVER_URL}/users?criteria=${criteria}`, {observe: 'response'});
  }
}
