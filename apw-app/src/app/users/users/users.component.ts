import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { UsersService } from './users.service';
import { AuthorizationService } from './../auth/authorization.service';
import { UsersSetStatusService } from './users-set-status.service';
import { IUserInfo } from './../../data';

export interface ISingleHighlighted {
  highlighted?: boolean;
}

export interface ITableUserInfo extends IUserInfo, ISingleHighlighted {}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: ITableUserInfo[];
  selectedUser: ITableUserInfo;
  navigationSubscription;
  resultsLength: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  highlight(element: any) {
    element.highlighted = !element.highlighted;
  }
  highlightDrop() {
    this.users.map(element => { if (element.highlighted) {element.highlighted  = false }; return element; })
  }
  
  displayedColumns: string[] = ['Status', 'Suspend', 'Activate', 'Stop', 'Role', 'UserName', 'EMail', 'ClientName'];

  constructor(
    private router: Router,
    private usersService: UsersService,
    private authorizationService: AuthorizationService,
    private usersSetStatusService: UsersSetStatusService
  ) { }

  menuItemEnabled(permissionKey: string): boolean {
    return this.authorizationService.getPermissions(permissionKey);
  }

  selectUser(user: ITableUserInfo) {
    this.selectedUser = user;
  }
  
  viewUsers(criteria: string, presetUID: string) {
    this.usersService.getUsers(criteria).subscribe(
      response => {
        this.users = response.body;
        this.resultsLength = this.users.length;
        console.dir(response.body);
      },
      error => {
        console.dir(error);
      }
    );
  }

  trySetStatus(user, status) {
    this.selectUser(user);
    this.usersSetStatusService.getClients(this.selectedUser.UserID, status).subscribe(
      response => { this.viewUsers('*', this.selectedUser.UserID); },
      error => { console.log(error); }
    );
  }

  ngOnInit() {
    this.viewUsers('*', null);
    this.router.onSameUrlNavigation = 'reload';
    this.navigationSubscription = this.router.events.subscribe(
      (e: any) => {
        if (e instanceof NavigationEnd) {
          this.viewUsers("*", null);
        }
      }
    );
  }

  ngOnDestroy(){
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
