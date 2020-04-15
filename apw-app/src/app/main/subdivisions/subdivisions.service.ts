import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from  '@angular/common/http';
import { ISubdivisionInfo } from '../../data';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionsService {

  constructor(private httpClient: HttpClient) { }

  public getSubdivisions(criteria: string): Observable<ISubdivisionInfo[]> {
    return this.httpClient.get<ISubdivisionInfo[]>(`${environment.backendURL}/subdivisions?criteria=${criteria}`, {observe: 'response'}).pipe(map(data => data.body));
  }
}
