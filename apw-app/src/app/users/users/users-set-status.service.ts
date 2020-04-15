import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';

import { IUserResult } from '../../data';
import {environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersSetStatusService {

  constructor(private httpClient: HttpClient) { }

  public getClients(userId: string, status: number): Observable<IUserResult[]> {
    return this.httpClient.put<IUserResult[]>(`${environment.backendURL}/users/${userId}/status/`, {status: status});
  }
}
