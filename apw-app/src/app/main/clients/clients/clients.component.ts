//https://medium.com/engineering-on-the-incline/reloading-current-route-on-click-angular-5-1a1bfc740ab2

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

import { ClientsService } from './clients.service';
import { IClientInfo, IClientResult } from '../../../data';
import { ClientUpdateService } from './client-update.service';
import { AuthorizationService } from './../../../users/auth/authorization.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: IClientInfo[];
  editMode: boolean = false;
  selectedClient: IClientInfo;
  actionMessage: string = "";
  indicatorHidden: boolean = true;
  navigationSubscription;

  fgClientsParameters = new FormGroup({
    ctrlContactName: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(255)]),
    ctrlEMail: new FormControl(null, [Validators.email, Validators.required, Validators.min(7), Validators.max(32)]),
    ctrlPhone: new FormControl(null, [Validators.required, Validators.min(7), Validators.max(32)]),
    ctrlAddress: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(255)]),
  });

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private clientUpdateService: ClientUpdateService,
    private authorizationService: AuthorizationService
  ) { }

  viewClients(criteria: string, presetUID: string) {
    this.selectedClient = null;
    this.editMode = false;
    this.clientsService.getClients(criteria).subscribe(
      data => {
        console.dir(data);
        this.clients = data;
        if (presetUID) {
          this.selectedClient = this.clients.find(client => client.ClientID === presetUID)
        }
        console.dir(this.clients);
      },
      error => {
        console.dir(error);
      }
    )
  }
  selectClient(client: IClientInfo) {
    this.selectedClient = client;
  }
  editClient(client: IClientInfo) {
    this.selectClient(client);
    this.editMode = true;
    this.fgClientsParameters.controls["ctrlContactName"].setValue(this.selectedClient.ContactName);
    this.fgClientsParameters.controls["ctrlEMail"].setValue(this.selectedClient.EMail);
    this.fgClientsParameters.controls["ctrlPhone"].setValue(this.selectedClient.Phone);
    this.fgClientsParameters.controls["ctrlAddress"].setValue(this.selectedClient.Address);
    return true;
  }
  trySave() {
    this.indicatorHidden = false;
    const data: IClientInfo = {
      ClientID: this.selectedClient.ClientID,
      ClientName: this.selectedClient.ClientName,
      ContactName: this.fgClientsParameters.controls["ctrlContactName"].value,
      EMail: this.fgClientsParameters.controls["ctrlEMail"].value,
      Phone: this.fgClientsParameters.controls["ctrlPhone"].value,
      Address: this.fgClientsParameters.controls["ctrlAddress"].value,
      StatusID: null,
      StatusName: null,
      StatusReason: null
    };
    this.clientUpdateService.update(data).subscribe(
      response => {
        console.dir(response);
        setTimeout(() => { this.indicatorHidden = true; this.editMode = false; }, 2000);
        this.viewClients('*', data.ClientID);
      },
      error => {
        this.actionMessage = error.message;
        setTimeout(() => this.indicatorHidden = true, 2000);
      }
    );
  }
  cancelEdit() {
    this.editMode = false;
  }
  menuItemEnabled(permissionKey: string): boolean {
    return this.authorizationService.getPermissions(permissionKey);
  }

  ngOnInit() {
    this.viewClients("*", null);
    this.router.onSameUrlNavigation = 'reload';
    this.navigationSubscription = this.router.events.subscribe(
      (e: any) => {
        if (e instanceof NavigationEnd) {
          this.viewClients("*", null);
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
