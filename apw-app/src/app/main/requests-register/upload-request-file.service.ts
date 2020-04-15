import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadRequestFileService {

  private formData: FormData;

  constructor(private httpClient: HttpClient) { }

  public upload(data: FormData): Observable<any> {
    return this.httpClient.post<any>(`${environment.backendURL}/requests/upload`, data, { reportProgress: false, observe: 'response'});
  }
}
