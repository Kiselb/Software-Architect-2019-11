import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router, NavigationEnd } from '@angular/router';

import { AuthorizationService } from '../../users/auth/authorization.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  navigationSubscription;

  searchClient = new FormControl('');
  searchRequest = new FormControl('');
  searchUser = new FormControl('');

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private authorizationService: AuthorizationService) { }

  test() {
    console.log("Requested");
    this.httpClient.get("http://localhost:3000", {observe: 'response'}).subscribe((data) => { console.log(data); });
  }

  menuItemEnabled(permissionKey: string): boolean {
    return this.authorizationService.getPermissions(permissionKey);
  }

  ngOnInit() {

  }

}
