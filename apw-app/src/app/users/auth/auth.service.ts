import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable, of } from 'rxjs'
import { tap, shareReplay, catchError } from 'rxjs/operators';
import * as moment from "moment";

import {environment } from '../../../environments/environment';

interface ILogin {
  name: string,
  password: string
}

interface IAuthResult {
  idToken: string,
  expiresIn: number,
  userName: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(name: string, password: string) {
    const login: ILogin = {"name": name, "password": password};

    return this.http
      .post<IAuthResult>(`${environment.backendURL}/login`, login)
      .pipe(tap<IAuthResult>(response => this.setSession(response, name)))
      .pipe(shareReplay())
      .pipe(catchError(error => of(error)));
  }

  logout() {
    localStorage.removeItem("apw_id_token");
    localStorage.removeItem("apw_expires_at");
  }

  private setSession(authResult: IAuthResult, name: string) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem("apw_user_name", authResult.userName);
    localStorage.setItem("apw_id_token", authResult.idToken);
    localStorage.setItem("apw_expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  isLoggedIn() {
    return !!localStorage.getItem("apw_id_token"); //moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    return moment(JSON.parse(localStorage.getItem("apw_expires_at")));
  }

  getToken() {
    return localStorage.getItem("apw_id_token");
  }

  getUserName() {
    return localStorage.getItem("apw_user_name");
  }
}
