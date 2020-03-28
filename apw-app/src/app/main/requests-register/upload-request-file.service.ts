import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';

//const SERVER_URL: string = "http://localhost:3000";
const SERVER_URL: string = "https://apw.legion.ru:8443";

@Injectable({
  providedIn: 'root'
})
export class UploadRequestFileService {

  private formData: FormData;

  constructor(private httpClient: HttpClient) { }

  public upload(data: FormData): Observable<any> {
    return this.httpClient.post<any>(`${SERVER_URL}/requests/upload`, data, { reportProgress: false, observe: 'response'});
  }
}
