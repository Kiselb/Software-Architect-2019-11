import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from  '@angular/common/http';
import { ISubdivisionInfo } from '../../data';

const SERVER_URL: string = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SubdivisionsService {

  constructor(private httpClient: HttpClient) { }

  public getSubdivisions(criteria: string): Observable<ISubdivisionInfo[]> {
    return this.httpClient.get<ISubdivisionInfo[]>(`${SERVER_URL}/subdivisions?criteria=${criteria}`, {observe: 'response'}).pipe(map(data => data.body));
  }
}
