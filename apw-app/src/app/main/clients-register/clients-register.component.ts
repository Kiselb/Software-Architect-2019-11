import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';

import { IClientParams, IClientResult } from '../../data';
import { ClientsRegisterService } from './clients-register.service';

@Component({
  selector: 'app-clients-register',
  templateUrl: './clients-register.component.html',
  styleUrls: ['./clients-register.component.css']
})
export class ClientsRegisterComponent implements OnInit {

  fgClientsParameters = new FormGroup({
    ctrlClientName: new FormControl(null, Validators.required),
    ctrlContactName: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(255)]),
    ctrlEMail: new FormControl(null, [Validators.email, Validators.required, Validators.min(7), Validators.max(32)]),
    ctrlPhone: new FormControl(null, [Validators.required, Validators.min(7), Validators.max(32)]),
    ctrlAddress: new FormControl(null, [Validators.required, Validators.min(16), Validators.max(255)]),
  });

  actionMessage: string = "";
  indicatorHidden: boolean = true;

  constructor(private clientsRegister: ClientsRegisterService) { }

  trySave() {
    this.indicatorHidden = false;
    const clientParams: IClientParams = {
      clientName: this.fgClientsParameters.controls["ctrlClientName"].value,
      contactName: this.fgClientsParameters.controls["ctrlContactName"].value,
      email: this.fgClientsParameters.controls["ctrlEMail"].value,
      phone: this.fgClientsParameters.controls["ctrlPhone"].value,
      address: this.fgClientsParameters.controls["ctrlAddress"].value
    }
    this.clientsRegister.addClient(clientParams).subscribe(
      response => {
        this.fgClientsParameters.reset();
        this.actionMessage = "Клиент успешно зарегистрирован в системе";
        setTimeout(() => this.indicatorHidden = true, 2000);
      },
      error => {
        this.actionMessage = error.message;
        setTimeout(() => this.indicatorHidden = true, 2000);
      }
    )
  }

  ngOnInit() {
    const button = document.getElementById('addButton') as HTMLButtonElement;
  }

}
