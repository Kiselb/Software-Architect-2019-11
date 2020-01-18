import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Observable } from 'rxjs';

import { IClientInfo, IClientResult } from '../../../data';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: IClientInfo[];

  constructor(private clientsService: ClientsService) { }

  viewClients(criteria: string) {
    this.clientsService.getClients(criteria).subscribe(
      response => {
        console.dir(response);
        this.clients = response.body;
        console.dir(this.clients);
      },
      error => {
        console.dir(error);
      }
    )
  }

  ngOnInit() {
    this.viewClients("*");
  }

}
