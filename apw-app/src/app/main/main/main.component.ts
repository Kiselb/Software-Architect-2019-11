import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router, NavigationEnd } from '@angular/router';

import { AuthorizationService } from '../../users/auth/authorization.service';
import { UploadRequestFileService } from '../requests-register/upload-request-file.service';

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
    private authorizationService: AuthorizationService,
    private uploadRequestFileService: UploadRequestFileService
  ) { }

  test() {
    console.log("Requested");
    this.httpClient.get("http://localhost:3000", {observe: 'response'}).subscribe((data) => { console.log(data); });
  }

  menuItemEnabled(permissionKey: string): boolean {
    return this.authorizationService.getPermissions(permissionKey);
  }

  testJSON() {
    const data = {
      clientId: "BB4FE663-5E66-48FE-8503-606A2BB22A36",
      typeId: 2,
      subdivisionId: "4D2C8437-9BC9-4851-9A1B-1D712B524BCF",
      dueDate: "2020-04-22T08:00:00.000Z",
      remarks: "Test JSON",
      details: [
        {
          pal: null,
          barCode: "2200000000000",
          quantity: 100,
          name: "Крепление для кабель-канала FX05, белый"
        },
        {
          pal: null,
          barCode: "2200000000001",
          quantity: 100,
          name: "Крепление для кабель-канала FX05, серебро"
        }
      ]
    }
    this.uploadRequestFileService.register(data).subscribe();
  }

  ngOnInit() {

  }

}
