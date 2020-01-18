//https://blog.angulartraining.com/http-interceptors-in-angular-61dcf80b6bdd
//https://dev.to/ibrahima92/better-http-request-with-interceptors-in-angular-8-and-beyond-fdn
//https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
  HttpParams
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JWTInterceptorService implements HttpInterceptor  {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const JWTToken = this.authService.getToken();
    if (!!JWTToken) {
      const authReq = req.clone({ setHeaders: { Authorization: `${JWTToken}` } });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
}}
