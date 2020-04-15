import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { IUserParams, IUserResult } from '../../data';
import {environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private httpClient: HttpClient) { }

  public addUser(params: IUserParams): Observable<IUserResult> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.httpClient.post<IUserResult>(`${environment.backendURL}/users`, params, {headers: headers, reportProgress: false, observe: 'response'}).pipe(map(data => data.body));
  }
}
