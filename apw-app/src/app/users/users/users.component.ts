import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

import { UsersService } from './users.service';
import { AuthorizationService } from './../auth/authorization.service';
import { UsersSetStatusService } from './users-set-status.service';
import { IUserInfo } from './../../data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IUserInfo[];
  selectedUser: IUserInfo;
  navigationSubscription;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private authorizationService: AuthorizationService,
    private usersSetStatusService: UsersSetStatusService
  ) { }

  menuItemEnabled(permissionKey: string): boolean {
    return this.authorizationService.getPermissions(permissionKey);
  }

  selectUser(user: IUserInfo) {
    this.selectedUser = user;
  }
  
  viewUsers(criteria: string, presetUID: string) {
    this.usersService.getUsers(criteria).subscribe(
      response => {
        this.users = response.body;
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
}
