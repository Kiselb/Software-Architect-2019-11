import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';

import { IUserResult } from '../../data';

const SERVER_URL: string = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class UsersSetStatusService {

  constructor(private httpClient: HttpClient) { }

  public getClients(userId: string, status: number): Observable<IUserResult[]> {
    return this.httpClient.put<IUserResult[]>(`${SERVER_URL}/${userId}/status/`, {status: status});
  }
}
