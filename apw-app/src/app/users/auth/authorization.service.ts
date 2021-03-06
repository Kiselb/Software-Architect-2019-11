import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import { Observable, of } from 'rxjs'
import { tap, shareReplay, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import {environment } from '../../../environments/environment';

interface IPermission {
  PermissionID: string,
  PermissionDescription: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  authorize() {
    return this.httpClient
      .post<IPermission[]>(`${environment.backendURL}/authorization`, null)
      .pipe(tap<IPermission[]>(response => this.setPermissions(response)))
      .pipe(catchError(error => of(error)));
  }

  private setPermissions(permissions: IPermission[]) {
    localStorage.setItem("apw_permissions", JSON.stringify(permissions));
  }
  
  getPermissions(permissionKey: string): boolean {
    if (this.authService.isLoggedIn) {
      const permissions: IPermission[] = JSON.parse(localStorage.getItem("apw_permissions"));
      if (!permissions) return false;
      const permission: IPermission = permissions.find(permission => permission.PermissionID == permissionKey);
      if (!permission) return false;
      return true;
    }
    return false;
  }
}
