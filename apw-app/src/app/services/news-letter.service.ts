import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

//const SERVER_URL: string = "http://localhost:3000";
const SERVER_URL: string = "https://apw.legion.ru:8443";

@Injectable({
  providedIn: 'root'
})
export class NewsLetterService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub: any) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    console.log("Subscribe on Push Notifications");
    return this.http.post<any>(`${SERVER_URL}/subscribe`, sub, {headers: headers, reportProgress: false, observe: 'response'});
  }

  notifyPush(body: any) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    console.log("Push");
    return this.http.post<any>(`${SERVER_URL}/notifypush`, body, {headers: headers, reportProgress: false, observe: 'response'});
  }

  notifyEMail(body: any) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    console.log("Send E-Mail");
    return this.http.post<any>(`${SERVER_URL}/notifyemail`, body, {headers: headers, reportProgress: false, observe: 'response'});
  }
}
