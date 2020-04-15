//https://medium.com/engineering-on-the-incline/reloading-current-route-on-click-angular-5-1a1bfc740ab2

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

import { ClientsService } from './clients.service';
import { IClientInfo, IClientResult } from '../../../data';
import { ClientUpdateService } from './client-update.service';
import { AuthorizationService } from './../../../users/auth/authorization.service';

export interface ISingleHighlighted {
  highlighted?: boolean;
}

export interface ITableClientInfo extends IClientInfo, ISingleHighlighted {}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: ITableClientInfo[];
  editMode: boolean = false;
  selectedClient: ITableClientInfo;
  actionMessage: string = "";
  indicatorHidden: boolean = true;
  navigationSubscription;
  resultsLength: number = 0;

  fgClientsParameters = new FormGroup({
    ctrlContactName: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(255)]),
    ctrlEMail: new FormControl(null, [Validators.email, Validators.required, Validators.min(7), Validators.max(32)]),
    ctrlPhone: new FormControl(null, [Validators.required, Validators.min(7), Validators.max(32)]),
    ctrlAddress: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(255)]),
  });

  highlight(element: any) {
    element.highlighted = !element.highlighted;
  }
  highlightDrop() {
    this.clients.map(element => { if (element.highlighted) {element.highlighted  = false }; return element; })
  }
  
displayedColumns: string[] = ['Status', 'ClientName', 'ContactName', 'EMail', 'Phone', 'Address'];

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private clientUpdateService: ClientUpdateService,
    private authorizationService: AuthorizationService
  ) {
    if (this.menuItemEnabled('8F33328C-8E6D-4B7C-AAA2-EA6FB6E6F3F5') && this.menuItemEnabled('EB200FE1-D0A3-4EE3-A818-2CFEAEBFD1BF')) {
      this.displayedColumns = ['Status', 'Open', 'ClientName', 'ContactName', 'EMail', 'Phone', 'Address'];
    }
   }

  viewClients(criteria: string, presetUID: string) {
    this.selectedClient = null;
    this.editMode = false;
    this.clientsService.getClients(criteria).subscribe(
      data => {
        console.dir(data);
        this.clients = data;
        this.resultsLength = this.clients.length;
        if (presetUID) {
          this.selectedClient = this.clients.find(client => client.ClientID === presetUID)
          this.selectedClient.highlighted = true;
        }
        console.dir(this.clients);
      },
      error => {
        console.dir(error);
      }
    )
  }
  selectClient(client: ITableClientInfo) {
    this.selectedClient = client;
  }
  editClient(client: ITableClientInfo) {
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
    const data: ITableClientInfo = {
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
        this.actionMessage = "";
        setTimeout(() => { this.indicatorHidden = true; this.editMode = false; this.viewClients('*', data.ClientID); }, 4000);
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
    this.actionMessage = "";
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
