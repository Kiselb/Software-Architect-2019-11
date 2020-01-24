import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { IUserParams } from 'src/app/data';
import { UserRegisterService } from './user-register.service';
import { ClientsService } from '../../main/clients/clients/clients.service';
import { IClientInfo } from '../../data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fgUsersParameters = new FormGroup({
    ctrlUserName: new FormControl(null, Validators.required),
    ctrlEMail: new FormControl(null, [Validators.email, Validators.required, Validators.min(7), Validators.max(32)]),
    ctrlPassword: new FormControl(null, [Validators.required, Validators.min(7)]),
    ctrlRoleId: new FormControl(),
    ctrlClientId: new FormControl(),
  });

  clients$: Observable<IClientInfo[]>;
  actionMessage: string = "";
  indicatorHidden: boolean = true;

  constructor(
    private userRegisterService: UserRegisterService,
    private clientsService: ClientsService,
    private router: Router
  ) { }

  trySave() {
    this.indicatorHidden = false;
    const userParams: IUserParams = {
      userName: this.fgUsersParameters.controls["ctrlUserName"].value,
      email: this.fgUsersParameters.controls["ctrlEMail"].value,
      password: this.fgUsersParameters.controls["ctrlPassword"].value,
      roleId: this.fgUsersParameters.controls["ctrlRoleId"].value,
      clientId: this.fgUsersParameters.controls["ctrlClientId"].value,
    };
    this.userRegisterService.addUser(userParams).subscribe(
      response => {
        this.fgUsersParameters.reset();
        this.actionMessage = "Пользователь успешно зарегистрирован в системе";
        setTimeout(() => this.indicatorHidden = true, 2000);
      },
      error => {
        this.actionMessage = error.message;
        setTimeout(() => this.indicatorHidden = true, 2000);
      }
    );
  }

  cancel() {
    this.router.navigate(['/users']);
  }

  ngOnInit() {
    this.clients$ = this.clientsService.getClients("");
  }

}
