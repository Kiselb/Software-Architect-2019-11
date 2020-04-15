import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsLetterService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub: any) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    console.log("Subscribe on Push Notifications");
    return this.http.post<any>(`${environment.backendURL}/subscribe`, sub, {headers: headers, reportProgress: false, observe: 'response'});
  }

  notifyPush(body: any) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    console.log("Push");
    return this.http.post<any>(`${environment.backendURL}/notifypush`, body, {headers: headers, reportProgress: false, observe: 'response'});
  }

  notifyEMail(body: any) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    console.log("Send E-Mail");
    return this.http.post<any>(`${environment.backendURL}/notifyemail`, body, {headers: headers, reportProgress: false, observe: 'response'});
  }
}
